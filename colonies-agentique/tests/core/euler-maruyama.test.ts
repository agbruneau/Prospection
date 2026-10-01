import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createEulerMaruyama } from '../../src/core/euler-maruyama.ts'
import { createStream, graineDeRepetition } from '../../src/core/random.ts'
import { enregistrer } from '../../src/core/recorder.ts'
import { compileScenario } from '../../src/core/scenario.ts'
import { preparer } from '../../src/cli/run.ts'

// T0.27 (fiche S0) : dx = b x dt + c dW, b = −θ = −1, c = 0,5 [I]; x₀ = 1 [I]; 2 000 trajectoires [à confirmer].
const B = -1, C = 0.5, X0 = 1, RUNS = 2000
const p = (value: number) => ({ value, unit: '1', source: 'Pais et al. 2013, éq. 3 (a = 0); valeurs de T0.27, fiche S0', status: 'estimated' })

/** Valeurs de x aux instants demandés, sur RUNS trajectoires au pas dt. */
function trajectoires(dt: number, instants: readonly number[]): number[][] {
  const horizon = instants.at(-1)!
  const sorties = instants.map(() => [] as number[])
  for (let r = 0; r < RUNS; r++) {
    const s = compileScenario({
      schema: 1, regime: 'exploratory', model: { id: 'p5-pais-2013-ou', version: '1', article: 'Pais et al. 2013' },
      time: { unit: 'cycle', dt, horizon, sampling: instants[0]! }, order: 'synchronous', seed: graineDeRepetition(27n, r), streams: ['noise'],
      parameters: { a: p(0), b: p(B), c: p(C) }, initial: { x: X0 }, measures: ['x'], interventions: [],
    })
    const e = enregistrer(preparer(s).sim, s)
    instants.forEach((t, k) => sorties[k]!.push(e.colonnes.x![e.t.findIndex(u => Math.abs(u - t) < dt / 2)]!))
  }
  return sorties
}
const moments = (v: number[]) => {
  const n = v.length, m = v.reduce((a, b) => a + b, 0) / n
  const s2 = v.reduce((a, x) => a + (x - m) ** 2, 0) / (n - 1)
  return { m, s2, esM: Math.sqrt(s2 / n), esS2: s2 * Math.sqrt(2 / (n - 1)) }
}

test('UC-001 nominal : T0.27 Euler–Maruyama sur Ornstein–Uhlenbeck : moyenne, variance à t = 1 et variance stationnaire à moins de 3 ES, à dt et à dt/2', () => {
  for (const dt of [0.01, 0.005]) {
    const [a1, a10] = trajectoires(dt, [1, 10])
    const t1 = moments(a1!), stat = moments(a10!)
    const moyenne = X0 * Math.exp(B), variance = C * C * (Math.exp(2 * B) - 1) / (2 * B), stationnaire = C * C / (2 * -B)
    assert.ok(Math.abs(t1.m - moyenne) < 3 * t1.esM, `dt = ${dt} : moyenne ${t1.m} contre ${moyenne}`)
    assert.ok(Math.abs(t1.s2 - variance) < 3 * t1.esS2, `dt = ${dt} : variance ${t1.s2} contre ${variance}`)
    assert.ok(Math.abs(stat.s2 - stationnaire) < 3 * stat.esS2, `dt = ${dt} : variance stationnaire ${stat.s2} contre ${stationnaire}`)
  }
})

test('UC-001 nominal : Euler–Maruyama sans bruit se réduit à Euler explicite, et son bruit vient du seul flux fourni', () => {
  const em = createEulerMaruyama(1), y = new Float64Array([1])
  em.step((_t, x, dx) => { dx[0] = -x[0]! }, (_t, _x, g) => { g[0] = 0 }, 0, y, 0.1, createStream(1n, 'noise'))
  assert.equal(y[0], 0.9)
  const a = new Float64Array([0]), b = new Float64Array([0])
  em.step(() => {}, (_t, _x, g) => { g[0] = 1 }, 0, a, 1, createStream(5n, 'noise'))
  em.step(() => {}, (_t, _x, g) => { g[0] = 1 }, 0, b, 1, createStream(5n, 'noise'))
  assert.equal(a[0], b[0])
})
