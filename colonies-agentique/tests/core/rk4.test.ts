import assert from 'node:assert/strict'
import { test } from 'node:test'
import { enregistrer } from '../../src/core/recorder.ts'
import { compileScenario } from '../../src/core/scenario.ts'
import { seeley2012 } from '../../src/models/reference/p5-seeley-2012/model.ts'

const p = (value: number) => ({ value, unit: '1', source: 'Seeley et al. 2012, SOM, Fig. S3', status: 'published' })

/** État final (A, B) de M1c intégré par RK4 au pas h jusqu'à T. */
function m1c(sigma: number, T: number, h: number, A: number, B: number): [number, number] {
  const s = compileScenario({
    schema: 1, regime: 'exploratory', model: { id: 'p5-seeley-2012', version: '1', article: 'Seeley et al. 2012' },
    time: { unit: 'cycle', dt: h, horizon: T, sampling: T }, order: 'synchronous', seed: '1', streams: [],
    parameters: { sigma: p(sigma), gamma: p(3), alpha: p(1 / 3), rho: p(3) }, initial: { A, B }, measures: ['A', 'B'], interventions: [],
  })
  const e = enregistrer(seeley2012.create(s, { stream: () => { throw new Error('aucun flux') } }), s)
  return [e.colonnes.A!.at(-1)!, e.colonnes.B!.at(-1)!]
}

test('UC-001 nominal : T0.4 l\'ordre de RK4 sur M1c donne un rapport d\'erreurs dans [12 ; 20]', () => {
  const ref = m1c(10, 4, 4 / 64000, 0.01, 0.0101)
  const erreur = (n: number) => { const y = m1c(10, 4, 4 / n, 0.01, 0.0101); return Math.max(Math.abs(y[0] - ref[0]), Math.abs(y[1] - ref[1])) }
  const rapports = [40, 80, 160].map(n => erreur(n) / erreur(2 * n))
  for (const r of rapports) assert.ok(r >= 12 && r <= 20, `rapport ${r.toFixed(1)} hors de [12 ; 20]`)
})

test('UC-001 nominal : T0.5 M1c atteint (0,8497 ; 0,0392) à σ = 10 et (0,4585 ; 0,4585) à σ = 1, à ±1e-3', () => {
  const [a, b] = m1c(10, 200, 0.01, 0.0101, 0.01)
  assert.ok(Math.abs(a - 0.8497) < 1e-3 && Math.abs(b - 0.0392) < 1e-3, `(${a}, ${b})`)
  const [c, d] = m1c(1, 200, 0.01, 0.0101, 0.01)
  assert.ok(Math.abs(c - 0.4585) < 1e-3 && Math.abs(d - 0.4585) < 1e-3, `(${c}, ${d})`)
})
