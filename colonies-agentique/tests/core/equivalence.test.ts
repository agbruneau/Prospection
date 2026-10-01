import assert from 'node:assert/strict'
import { test } from 'node:test'
import { conjonction, decider, quantileT, requiredNTost, requiredNTostMoyenne, type Criterion } from '../../src/analysis/equivalence.ts'

test('UC-003 BR-010 : T0.13 le n requis d\'un TOST retrouve les tables du protocole (proportions et d de Cohen)', () => {
  const table: [number, number, number][] = [[0.5, 0.05, 1713], [0.5, 0.10, 429], [0.5, 0.15, 191], [0.7, 0.05, 1439], [0.7, 0.10, 360], [0.7, 0.15, 160], [0.9, 0.05, 617], [0.9, 0.10, 155], [0.9, 0.15, 69]]
  for (const [p, d, n] of table) assert.equal(requiredNTost(p, d), n, `p = ${p}, δ = ${d}`)
  // Lakens 2017, tableau 1 : 70, 191, 429 à ±2 (approximation normale 68,5; 190,3; 428,2)
  for (const [d, n] of [[0.5, 70], [0.3, 191], [0.2, 429]] as const) assert.ok(Math.abs(requiredNTostMoyenne(1, d) - n) <= 2, `d = ${d}`)
  // X18 : p ≈ 0,755, ±2 points → ≈ 7 920 par bras; ±4 points → ≈ 1 980
  assert.ok(Math.abs(requiredNTost(0.755, 0.02) - 7920) <= 2 && Math.abs(requiredNTost(0.755, 0.04) - 1980) <= 2)
})

test('UC-003 nominal : les quantiles de Student par Cornish-Fisher retrouvent les tables à 1e-3', () => {
  for (const [p, df, t] of [[0.95, 10, 1.812461], [0.95, 29, 1.699127], [0.975, 10, 2.228139], [0.975, 99, 1.984217], [0.95, Infinity, 1.644854]] as const)
    assert.ok(Math.abs(quantileT(p, df) - t) < 1e-3, `t(${p}, ${df}) = ${quantileT(p, df)}`)
})

const tost = (value: number, delta: number): Criterion => ({ quantity: 'x', statistic: { measure: 'x' }, test: 'TOST', value, margin: { delta, scale: 'points', justification: 'test' } })
/** n valeurs de moyenne m et d'écart-type 1 exactement (±1 alternés). */
const echantillon = (m: number, n: number) => Array.from({ length: n }, (_, i) => m + (i % 2 ? 1 : -1) * Math.sqrt((n - 1) / n))

test('UC-003 nominal : le TOST suit les quatre issues du protocole (04 §5.4)', () => {
  assert.equal(decider(tost(0, 0.5), echantillon(0.02, 400)).outcome, 'satisfied')     // équivalent, non différent
  assert.equal(decider(tost(0, 0.5), echantillon(0.2, 400)).outcome, 'satisfied')      // différent mais sous la marge
  assert.equal(decider(tost(0, 0.5), echantillon(0.9, 400)).outcome, 'unsatisfied')    // différent, non équivalent
  assert.equal(decider(tost(0, 0.5), echantillon(0.05, 10)).outcome, 'inconclusive')   // indéterminé
})

test('UC-003 nominal : identité à tolérance, plage avec IC et proportion par seuil', () => {
  const egal: Criterion = { quantity: 'A', statistic: { measure: 'A' }, test: 'equal', value: 0.8497, margin: { delta: 0.001, scale: 'points', justification: 'T0.5' } }
  assert.equal(decider(egal, [0.84966]).outcome, 'satisfied')
  assert.equal(decider(egal, [0.8480]).outcome, 'unsatisfied')
  const plage: Criterion = { quantity: 'p', statistic: { measure: 'D', threshold: { op: '>', value: 0.3 } }, test: 'range', value: [0.5, 1] }
  assert.equal(decider(plage, Array(100).fill(1)).outcome, 'satisfied')
  assert.equal(decider(plage, Array(100).fill(0)).outcome, 'unsatisfied')
  assert.equal(decider(plage, [1, 0, 1, 0, 1, 1]).outcome, 'inconclusive')
})

test('UC-003 BR-012 : les critères d\'une cible sont conjonctifs', () => {
  assert.equal(conjonction(['satisfied', 'satisfied']), 'satisfied')
  assert.equal(conjonction(['satisfied', 'inconclusive']), 'inconclusive')
  assert.equal(conjonction(['inconclusive', 'unsatisfied', 'satisfied']), 'unsatisfied')
})
