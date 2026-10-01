import assert from 'node:assert/strict'
import { test } from 'node:test'
import { graineDeRepetition } from '../../src/core/random.ts'
import { enregistrer } from '../../src/core/recorder.ts'
import { compileScenario } from '../../src/core/scenario.ts'
import { preparer } from '../../src/models/index.ts'

// Jouet J4 : deux agents copient chacun l'état de l'autre, états initiaux (0, 1); 10 pas.
const executer = (order: string, seed: string) => {
  const s = compileScenario({
    schema: 1, regime: 'exploratory', model: { id: 's0-j4-copie', version: '1', article: 'Huberman et Glance 1993' },
    time: { unit: 'cycle', dt: 1, horizon: 10, sampling: 1 }, order, seed, streams: order === 'sequential-random' ? ['order'] : [],
    parameters: {}, initial: { x0: 0, x1: 1 }, measures: ['x0', 'x1', 'consensus'], interventions: [],
  })
  return enregistrer(preparer(s).sim, s).colonnes
}

test('UC-001 nominal : T0.28 contrôle positif de l\'ordre : en synchrone, oscillation de période 2 et jamais de consensus; en séquentiel aléatoire, consensus au premier pas (1 000 exécutions)', () => {
  let consensusSynchrone = 0, consensusSequentiel = 0
  const valeursAtteintes = new Set<number>()
  for (let i = 0; i < 1000; i++) {
    const graine = graineDeRepetition(20261001n, i)
    const sync = executer('synchronous', graine)
    if (sync.consensus!.some(c => c === 1)) consensusSynchrone++
    assert.deepEqual(sync.x0, [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0])   // période 2
    const seq = executer('sequential-random', graine)
    if (seq.consensus![1] === 1 && seq.consensus!.slice(1).every(c => c === 1)) consensusSequentiel++
    valeursAtteintes.add(seq.x0![1]!)
  }
  assert.equal(consensusSynchrone / 1000, 0)
  assert.equal(consensusSequentiel / 1000, 1)
  assert.deepEqual([...valeursAtteintes].sort(), [0, 1], 'la permutation vient du flux `order` : les deux consensus apparaissent')
  assert.deepEqual(executer('sequential-fixed', '1').x0!.slice(0, 3), [0, 1, 1])
})

test('UC-001 A1 : l\'ordre séquentiel aléatoire exige le flux `order` déclaré au scénario', () => {
  assert.throws(() => {
    const s = compileScenario({
      schema: 1, regime: 'exploratory', model: { id: 's0-j4-copie', version: '1', article: 'Huberman et Glance 1993' },
      time: { unit: 'cycle', dt: 1, horizon: 2, sampling: 1 }, order: 'sequential-random', seed: '1', streams: [],
      parameters: {}, initial: { x0: 0, x1: 1 }, measures: ['consensus'], interventions: [],
    })
    preparer(s)
  }, /flux non déclaré : order/)
})
