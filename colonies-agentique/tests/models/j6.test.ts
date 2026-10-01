import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { RACINE } from '../../src/cli/run.ts'
import { graineDeRepetition } from '../../src/core/random.ts'
import { enregistrer } from '../../src/core/recorder.ts'
import { compileScenario } from '../../src/core/scenario.ts'
import { preparer } from '../../src/models/index.ts'

const base = JSON.parse(fs.readFileSync(path.join(RACINE, 'scenarios/s0-j6-marcheurs/tore-32.json'), 'utf8'))
const couverture = (N: number, L: number, i: number) => {
  const s = compileScenario({ ...base, seed: graineDeRepetition(5n, i), parameters: { ...base.parameters, N: { ...base.parameters.N, value: N }, L: { ...base.parameters.L, value: L } } })
  return enregistrer(preparer(s).sim, s).colonnes.tempsCouverture!.at(-1)!
}

test('UC-001 nominal : J6 (marcheurs sans canal) couvre tout le tore, et plus de marcheurs couvrent plus vite sans accélération proportionnelle', () => {
  const moyenne = (N: number) => Array.from({ length: 100 }, (_, i) => couverture(N, 8, i)).reduce((a, b) => a + b, 0) / 100
  const [c1, c16] = [moyenne(1), moyenne(16)]
  assert.ok(c1 >= 63 && c16 >= 63 / 16, `${c1}, ${c16}`)   // au moins une case nouvelle par marcheur et par pas
  assert.ok(c16 < c1 && c1 / c16 < 16, `S(16) = ${c1 / c16}`)
})

test('UC-001 A1 : J6 refuse un nombre de marcheurs ou une taille de tore invalides', () => {
  assert.throws(() => couverture(0, 8, 0), /parameters\.N : entier ≥ 1/)
  assert.throws(() => couverture(1, 1, 0), /parameters\.L : entier ≥ 2/)
})
