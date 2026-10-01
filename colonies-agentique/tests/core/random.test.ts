import assert from 'node:assert/strict'
import { test } from 'node:test'
import { empreinte, fnv1a64Texte } from '../../src/core/fingerprint.ts'
import { createStream, LAMBDA_MAX, splitMix64, xoshiro128 } from '../../src/core/random.ts'

test('UC-001 nominal : T0.1 xoshiro128** depuis l\'état [1, 2, 3, 4] donne les dix sorties de référence', () => {
  const g = xoshiro128(new Uint32Array([1, 2, 3, 4]))
  assert.deepEqual(Array.from({ length: 10 }, () => g.u32()),
    [11520, 0, 5927040, 70819200, 2031721883, 1637235492, 1287239034, 3734860849, 3729100597, 4258142804])
})

test('UC-001 nominal : T0.3 SplitMix64 de graine 1477776061723855037 donne les trois sorties de référence', () => {
  const s = splitMix64(1477776061723855037n)
  assert.deepEqual([s(), s(), s()], [1985237415132408290n, 2979275885539914483n, 13511426838097143398n])
})

test('UC-001 nominal : FNV-1a 64 retrouve les vecteurs publiés et ne dépend que des octets', () => {
  assert.equal(fnv1a64Texte(''), 'cbf29ce484222325')
  assert.equal(fnv1a64Texte('a'), 'af63dc4c8601ec8c')
  assert.equal(fnv1a64Texte('foobar'), '85944171f73967e8')
  assert.equal(empreinte([new Uint8Array([0x61]), new Uint8Array(0)]), 'af63dc4c8601ec8c')
})

test('UC-001 nominal : les distributions restent dans leur support et l\'état nul est refusé', () => {
  const g = createStream(42n, 'measure')
  for (let i = 0; i < 1e4; i++) {
    const u = g.uniform(), o = g.uniformOpen(), k = g.int(7)
    assert.ok(u >= 0 && u < 1 && o > 0 && o < 1 && Number.isInteger(k) && k >= 0 && k < 7)
  }
  assert.throws(() => xoshiro128(new Uint32Array(4)))
  const a = Int32Array.from({ length: 50 }, (_, i) => i)
  g.shuffle(a)
  assert.deepEqual([...a].sort((x, y) => x - y), Array.from({ length: 50 }, (_, i) => i))
})

test('UC-001 nominal : poisson suit sa loi (khi-deux) pour λ ∈ {0,169; 0,807} et refuse λ > λ_max', () => {
  for (const lambda of [0.169, 0.807]) {
    const g = createStream(7n, 'environment'), n = 1e5, classes = 4
    const obs = new Array<number>(classes).fill(0)
    for (let i = 0; i < n; i++) obs[Math.min(g.poisson(lambda), classes - 1)]!++
    let pmf = Math.exp(-lambda), reste = 1, chi2 = 0
    for (let k = 0; k < classes; k++) {
      const p = k === classes - 1 ? reste : pmf
      chi2 += (obs[k]! - n * p) ** 2 / (n * p)
      reste -= pmf
      pmf *= lambda / (k + 1)
    }
    assert.ok(chi2 < 16.27, `λ = ${lambda} : khi-deux ${chi2.toFixed(2)} ≥ 16,27 (3 ddl, α = 0,001)`)
  }
  assert.throws(() => createStream(1n, 'noise').poisson(LAMBDA_MAX + 1), /hors de/)
})
