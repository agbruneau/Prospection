import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { graineDeRepetition } from '../../src/core/random.ts'
import { enregistrer } from '../../src/core/recorder.ts'
import { compileScenario } from '../../src/core/scenario.ts'
import { preparer, RACINE } from '../../src/cli/run.ts'

const lire = (f: string) => JSON.parse(fs.readFileSync(path.join(RACINE, f), 'utf8')) as Record<string, any>
const SCENARIOS = { '1.0': 'scenarios/p1-goss-1989/fig2a-r1.json', '1.4': 'scenarios/p1-goss-1989/fig2b-r1_4.json', '2.0': 'scenarios/p1-goss-1989/fig2c-r2.json' } as const

/** Parts du trafic sur la courte de `runs` exécutions du scénario, modifié par `modifs`. */
function parts(fichier: string, runs: number, maitre: bigint, modifs: (s: Record<string, any>) => void = () => {}): number[] {
  const base = lire(fichier)
  modifs(base)
  return Array.from({ length: runs }, (_, i) => {
    const s = compileScenario({ ...base, seed: graineDeRepetition(maitre, i) })
    return enregistrer(preparer(s).sim, s).colonnes.shortShare!.at(-1)!
  })
}
const classes = (v: number[]) => {
  const c = [0, 0, 0, 0, 0]
  for (const x of v) c[Math.min(Math.floor(x * 5), 4)]!++
  return c.map(k => k / v.length)
}

test('UC-001 nominal : T1.1 le modèle p1-goss-1989 concorde avec l\'oracle Python à moins de 3 ES par classe (porte A de P1)', () => {
  const oracle = lire('data/oracles/p1-goss-1989.json')
  for (const [r, fichier] of Object.entries(SCENARIOS)) {
    const n = 3000, ici = classes(parts(fichier, n, 99n))
    for (const [k, p] of (oracle.classes[r] as number[]).entries()) {
      const es = Math.hypot(Math.sqrt(p * (1 - p) / oracle.runs), Math.sqrt(ici[k]! * (1 - ici[k]!) / n))
      assert.ok(Math.abs(ici[k]! - p) < 3 * es, `r = ${r}, classe ${k} : ${ici[k]} contre ${p} (3 ES = ${(3 * es).toFixed(4)})`)
    }
  }
})

test('UC-001 nominal : T1.2 une branche courte ajoutée après le 1 000e passage n\'est pas adoptée (prédiction 2 de Goss et al. 1989)', () => {
  const v = parts(SCENARIOS['2.0'], 200, 5n, s => {
    s.parameters.shortOpensAfter.value = 1000
    s.parameters.countFrom.value = 1500
    s.parameters.countTo.value = 2000
    s.time.horizon = s.time.sampling = 6000
  })
  assert.ok(classes(v)[0]! >= 0.95, `${classes(v)[0]} dans la classe 0-20 %`)
})

test('UC-001 nominal : sans phéromone utile (k immense), le choix est au hasard et la part de la courte vaut 0,5', () => {
  const v = parts(SCENARIOS['1.0'], 200, 3n, s => { s.parameters.k.value = 1e9 })
  const m = v.reduce((a, b) => a + b, 0) / v.length
  const es = Math.sqrt(v.reduce((a, x) => a + (x - m) ** 2, 0) / (v.length - 1) / v.length)
  assert.ok(Math.abs(m - 0.5) < 3 * es, `${m} ± ${es}`)
})

test('UC-001 A1 : p1-goss-1989 refuse un pas autre que 1 s et une probabilité d\'arrivée hors de [0, 1]', () => {
  const base = lire(SCENARIOS['1.0'])
  const essai = (s: Record<string, any>) => () => preparer(compileScenario(s))
  assert.throws(essai({ ...base, time: { unit: 's', dt: 2, horizon: 3000, sampling: 3000 } }), { message: 'Scénario invalide : time : pas de 1 s requis par le modèle' })
  assert.throws(essai({ ...base, parameters: { ...base.parameters, phi: { ...base.parameters.phi, value: 1.5 } } }), /parameters\.phi/)
})
