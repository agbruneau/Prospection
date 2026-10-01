import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createStream } from '../../src/core/random.ts'
import { enregistrer } from '../../src/core/recorder.ts'
import { compileScenario } from '../../src/core/scenario.ts'
import { createDirectSsa } from '../../src/core/ssa.ts'
import { preparer } from '../../src/cli/run.ts'

test('UC-001 nominal : T0.6 SSA direct, U→A seul, N = 200, γ = 0,5 : moyenne de A(t = 2) à moins de 3 ES de 126,42 sur 2 000 runs', () => {
  const N = 200, gamma = 0.5, fin = 2, runs = 2000
  const ssa = createDirectSsa({
    nReactions: 1, nSpecies: 1, stoichiometry: new Int32Array([1]),
    propensities: (x, a) => { a[0] = gamma * (N - x[0]!) },
  }, createStream(20261001n, 'agents'))
  const valeurs: number[] = []
  for (let r = 0; r < runs; r++) {
    const x = new Int32Array(1)
    let t = 0
    for (;;) {
      const s = ssa.step(x, t)
      if (s.reaction < 0 || s.t > fin) break
      ssa.fire(x, s.reaction)
      t = s.t
    }
    valeurs.push(x[0]!)
  }
  const moyenne = valeurs.reduce((a, b) => a + b, 0) / runs
  const es = Math.sqrt(valeurs.reduce((a, v) => a + (v - moyenne) ** 2, 0) / (runs - 1) / runs)
  const exact = N * (1 - Math.exp(-gamma * fin))
  assert.ok(Math.abs(moyenne - exact) < 3 * es, `${moyenne.toFixed(2)} ± ${es.toFixed(2)} contre ${exact.toFixed(2)}`)
})

test('UC-001 nominal : le SSA renvoie un état absorbant quand toutes les propensions sont nulles', () => {
  const ssa = createDirectSsa({ nReactions: 2, nSpecies: 1, stoichiometry: new Int32Array([1, -1]), propensities: (_x, a) => { a[0] = 0; a[1] = 0 } }, createStream(1n, 'agents'))
  assert.deepEqual(ssa.step(new Int32Array(1), 3), { t: Infinity, reaction: -1 })
})

/** P(|A − B|/N > 0,3 à t = 40) sur `runs` répétitions de M1c à N fini, avec son erreur-type. */
function probabiliteDecision(N: number, sigma: number, runs: number): { p: number; es: number } {
  const p = (value: number) => ({ value, unit: '1', source: 'Seeley et al. 2012, SOM, Fig. S3', status: 'published' })
  let succes = 0
  for (let r = 0; r < runs; r++) {
    const s = compileScenario({
      schema: 1, regime: 'exploratory', model: { id: 'p5-seeley-2012-ssa', version: '1', article: 'Seeley et al. 2012' },
      time: { unit: 'cycle', dt: 40, horizon: 40, sampling: 40 }, order: 'synchronous', seed: String(1000 * N + r), streams: ['agents'],
      parameters: { sigma: p(sigma), gamma: p(3), alpha: p(1 / 3), rho: p(3), N: p(N) }, initial: { A: 0, B: 0 }, measures: ['D'], interventions: [],
    })
    if (enregistrer(preparer(s).sim, s).colonnes.D!.at(-1)! > 0.3) succes++
  }
  const q = succes / runs
  return { p: q, es: Math.sqrt(q * (1 - q) / runs) }
}

test('UC-001 nominal : T0.7 docking EDO ↔ SSA de M1c : sous σ* la décision s\'efface quand N croît, au-delà elle tend vers 1, en accord avec l\'oracle Python', () => {
  const runs = 200
  const cellules = { s1N50: probabiliteDecision(50, 1, runs), s1N200: probabiliteDecision(200, 1, runs), s10N50: probabiliteDecision(50, 10, runs), s10N200: probabiliteDecision(200, 10, runs) }
  const { s1N50, s1N200, s10N50, s10N200 } = cellules
  // Relation : σ = 1 < σ* = 1,6875 → P décroît avec N (IC à 95 % de la différence excluant 0); σ = 10 → P proche de 1.
  assert.ok(s1N50.p - s1N200.p - 1.96 * Math.hypot(s1N50.es, s1N200.es) > 0, JSON.stringify(cellules))
  assert.ok(s10N50.p >= 0.85 && s10N200.p >= 0.97 && s10N200.p >= s10N50.p - 1.96 * s10N50.es, JSON.stringify(cellules))
  // Accord avec l'oracle (x_methodes_checks.py, 200 runs) : écart < 3 ES combinées
  const oracle = { s1N50: [0.445, 0.035], s1N200: [0.105, 0.022], s10N50: [0.950, 0.015], s10N200: [1.0, 0] } as const
  for (const [k, [p, es]] of Object.entries(oracle)) {
    const c = cellules[k as keyof typeof cellules]
    assert.ok(Math.abs(c.p - p) < 3 * Math.hypot(c.es, es) + 1e-9 || (es === 0 && c.p >= 0.98), `${k} : ${c.p} ± ${c.es.toFixed(3)} contre ${p} ± ${es}`)
  }
})
