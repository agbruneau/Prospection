import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { RACINE } from '../../src/cli/run.ts'
import { graineDeRepetition } from '../../src/core/random.ts'
import { enregistrer } from '../../src/core/recorder.ts'
import { compileScenario } from '../../src/core/scenario.ts'
import { preparer } from '../../src/models/index.ts'

const base = JSON.parse(fs.readFileSync(path.join(RACINE, 'scenarios/s0-m6-quorum/m6-sequentiel.json'), 'utf8'))
const executer = (modifs: Record<string, unknown> = {}, i = 0) => {
  const s = compileScenario({ ...base, seed: graineDeRepetition(20261001n, i), ...modifs })
  return enregistrer(preparer(s).sim, s)
}

test('UC-001 nominal : M6 (Sumpter et Pratt 2009) engage les 40 individus et rapporte la fraction vers X et la durée, dans les deux ordres', () => {
  for (const ordre of [{ order: 'sequential-random', streams: ['agents', 'order'] }, { order: 'synchronous', streams: ['agents'] }]) {
    let x = 0
    for (let i = 0; i < 200; i++) {
      const e = executer(ordre, i)
      const fx = e.colonnes.fractionX!.at(-1)!, t = e.colonnes.duree!.at(-1)!
      assert.ok(fx >= 0 && fx <= 1 && Number.isInteger(fx * 40), `fraction ${fx}`)
      assert.ok(t > 0 && t < 5000, `durée ${t}`)
      x += fx
    }
    // la colonie préfère l'option de meilleure qualité (p_x = 1 > p_y = 0,5) : environ 3 sur 4 vers X à k = 1 (dossier, X17 : 76 %)
    assert.ok(x / 200 > 0.65 && x / 200 < 0.85, `${ordre.order} : ${x / 200}`)
  }
})

test('UC-001 nominal : M6 est déterministe à graine égale et la durée reste non définie tant qu\'un individu est libre', () => {
  assert.deepEqual(executer({}, 3).fingerprints, executer({}, 3).fingerprints)
  const court = executer({ time: { ...base.time, horizon: 5, sampling: 5 } })
  assert.equal(court.colonnes.duree!.at(-1), null)
  assert.match(court.missing[0]!.quantity, /duree/)
})

test('UC-001 A1 : M6 refuse une lecture de r autre que 1 ou 2, ou une probabilité de découverte hors de [0, 1]', () => {
  const p = (v: number) => ({ ...base.parameters.lectureR, value: v })
  assert.throws(() => executer({ parameters: { ...base.parameters, lectureR: p(3) } }), /parameters\.lectureR : 1 ou 2/)
  assert.throws(() => executer({ parameters: { ...base.parameters, r: { ...base.parameters.r, value: 0.6 } } }), /parameters\.lectureR/)
})
