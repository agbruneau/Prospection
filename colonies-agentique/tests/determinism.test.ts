import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createStream } from '../src/core/random.ts'
import { enregistrer } from '../src/core/recorder.ts'
import { compileScenario } from '../src/core/scenario.ts'
import type { ReferenceModel } from '../src/core/simulation.ts'
import { preparer } from '../src/cli/run.ts'

// Marcheurs aléatoires jouets : consomment deux flux à chaque pas, pour que l'empreinte dépende de l'aléa.
const marcheurs: ReferenceModel = {
  id: 'jouet-marcheurs',
  measureUnits: { x0: '1' },
  create(s, f) {
    const agents = f.stream('agents'), bruit = f.stream('noise')
    const x = new Float64Array(20)
    let n = 0
    return {
      advance() { for (let i = 0; i < x.length; i++) x[i] = x[i]! + agents.normal() + 0.1 * bruit.uniform(); n++ },
      time: () => n,
      done: () => n >= s.time.horizon,
      observe: () => ({ x0: x[0]! }),
      buffers: () => [x, agents.buffer(), bruit.buffer()],
      apply() {},
    }
  },
}
const modeles = new Map([[marcheurs.id, marcheurs]])

function empreintes(seed: string): Map<number, string> {
  const s = compileScenario({
    schema: 1, regime: 'exploratory', model: { id: 'jouet-marcheurs', version: '1', article: 'Morris et al. 2019' },
    time: { unit: 'cycle', dt: 1, horizon: 1000, sampling: 100 }, order: 'synchronous', seed, streams: ['agents', 'noise'],
    parameters: {}, initial: {}, measures: ['x0'], interventions: [],
  })
  return new Map(enregistrer(preparer(s, modeles).sim, s).fingerprints.map(e => [e.time, e.fnv1a64]))
}

test('UC-002 nominal : T0.26 deux exécutions donnent les mêmes empreintes à t = 100 et t = 1 000 pour cinq graines', () => {
  const vues = new Set<string>()
  for (const seed of ['1', '2', '3', '20261001', '18446744073709551615']) {
    const a = empreintes(seed), b = empreintes(seed)
    for (const t of [100, 1000]) {
      assert.equal(a.get(t), b.get(t), `graine ${seed}, t = ${t}`)
      vues.add(a.get(t)!)
    }
  }
  assert.equal(vues.size, 10, 'graines ou instants différents doivent donner des empreintes différentes')
})

test('UC-002 nominal : T0.26 ajouter ou consommer un flux n\'altère pas les tirages des autres', () => {
  const tirages = (g: ReturnType<typeof createStream>) => Array.from({ length: 5 }, () => g.u32())
  const seul = tirages(createStream(9n, 'agents'))
  const autre = createStream(9n, 'noise')
  tirages(autre)
  assert.deepEqual(tirages(createStream(9n, 'agents')), seul)
  assert.notDeepEqual(tirages(createStream(9n, 'noise')), seul)

  const parent = createStream(9n, 'agents')
  const a = tirages(parent.derive('a'))
  tirages(parent.derive('b'))
  tirages(parent)
  assert.deepEqual(tirages(parent.derive('a')), a)
})
