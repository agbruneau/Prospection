import assert from 'node:assert/strict'
import { test } from 'node:test'
import { performance, esProportion, nSim } from '../../src/analysis/mc-error.ts'
import { facteurNInteraction, facteurReechantillonnage, mdeMiller, nMiller, quantileNormal, seEffetPrincipal, seInteraction, seuilKS, uCritique, varianceDifference } from '../../src/analysis/power.ts'
import { createStream } from '../../src/core/random.ts'

const pres = (x: number, attendu: number, tol: number, nom: string) => assert.ok(Math.abs(x - attendu) <= tol, `${nom} : ${x} au lieu de ${attendu} ± ${tol}`)

test('UC-007 nominal : les quantiles de la loi normale retrouvent les valeurs de table à 1e-8', () => {
  pres(quantileNormal(0.975), 1.959963984540054, 1e-8, 'z 0,975')
  pres(quantileNormal(0.8), 0.8416212335729143, 1e-8, 'z 0,8')
  pres(quantileNormal(0.95), 1.6448536269514722, 1e-8, 'z 0,95')
  pres(quantileNormal(0.001), -3.090232306167813, 1e-8, 'z 0,001')
  assert.throws(() => quantileNormal(1))
})

test('UC-007 nominal : T0.8 l\'éq. 9 de Miller donne n = 969 pour ω² = 1/9, Δ = 0,03, α = 0,05, puissance 80 %', () => {
  assert.equal(Math.round(nMiller(1 / 9, 0.03)), 969)
  assert.equal(Math.ceil(nMiller(1 / 9, 0.03)), 969)
})

test('UC-007 nominal : T0.9 l\'éq. 10 de Miller donne un MDE de 13,27 % à K = 1 et 7,57 % à K = 10 (n = 198)', () => {
  pres(mdeMiller(198, 1, 1 / 9, 1 / 6, 1 / 6) * 100, 13.27, 0.01, 'K = 1')
  pres(mdeMiller(198, 10, 1 / 9, 1 / 6, 1 / 6) * 100, 7.57, 0.01, 'K = 10')
  // valeurs publiées tronquées : 13,2 et 7,5
  assert.deepEqual([Math.floor(mdeMiller(198, 1, 1 / 9, 1 / 6, 1 / 6) * 1000) / 10, Math.floor(mdeMiller(198, 10, 1 / 9, 1 / 6, 1 / 6) * 1000) / 10], [13.2, 7.5])
})

test('UC-007 nominal : T0.10 le facteur de rééchantillonnage vaut (1 + 2/K)/3 : 2/3, 1/2 et 4/9 à K = 2, 4, 6', () => {
  for (const [K, attendu] of [[1, 1], [2, 2 / 3], [4, 1 / 2], [6, 4 / 9]] as const) pres(facteurReechantillonnage(K, 1 / 12, 1 / 6), attendu, 1e-12, `K = ${K}`)
})

test('UC-007 nominal : T0.11 l\'exemple du §4.2 de Miller donne 1/12 en apparié (et non 1/9), 1/9 exigeant ρ = 1/3 (D-0-001)', () => {
  pres(varianceDifference(1 / 12, 1 / 12, 0), 1 / 6, 1e-15, 'non apparié')
  pres(varianceDifference(1 / 12, 1 / 12, 0.5), 1 / 12, 1e-15, 'apparié, ρ = 0,5')
  pres(varianceDifference(1 / 12, 1 / 12, 1 / 3), 1 / 9, 1e-15, 'ρ = 1/3')
})

test('UC-007 nominal : T0.15 l\'interaction d\'un plan 2 × 2 a deux fois l\'erreur-type d\'un effet principal; n × 16 si elle vaut la moitié, × 4 si elle l\'égale', () => {
  pres(seInteraction(1, 100) / seEffetPrincipal(1, 100), 2, 1e-12, 'rapport des ES')
  assert.equal(facteurNInteraction(0.5), 16)
  assert.equal(facteurNInteraction(1), 4)
})

test('UC-003 nominal : T0.12 n_sim = p(1 − p)/ES² donne 1 900 (couverture 95 %, ES 0,5 %) et 10 000 au pire cas; ES d\'une proportion 0,025 à n = 400', () => {
  assert.equal(nSim(0.95, 0.005), 1900)
  assert.equal(nSim(0.5, 0.005), 10000)
  pres(esProportion(0.5, 400), 0.025, 1e-15, 'ES')
})

test('UC-003 nominal : T0.16 les erreurs-types de Monte Carlo du biais, de l\'ES empirique, de l\'EQM et de la couverture suivent l\'écart-type observé à ±6 %', () => {
  const g = createStream(20261001n, 'noise'), n = 200, reps = 3000
  const mesures: number[][] = [[], [], [], []], formules: number[][] = [[], [], [], []]
  const cles = ['biais', 'esEmpirique', 'eqm', 'couverture'] as const
  for (let r = 0; r < reps; r++) {
    const e = Array.from({ length: n }, () => g.normal())
    const { valeur, es } = performance(e, 0, e.map(x => Math.abs(x) < 1))   // « couverture » arbitraire : P(|e| < 1)
    cles.forEach((k, i) => { mesures[i]!.push(valeur[k]); formules[i]!.push(es[k]) })
  }
  const moy = (v: number[]) => v.reduce((a, b) => a + b, 0) / v.length
  const et = (v: number[]) => { const m = moy(v); return Math.sqrt(v.reduce((a, x) => a + (x - m) ** 2, 0) / v.length) }
  cles.forEach((k, i) => { const rapport = moy(formules[i]!) / et(mesures[i]!); assert.ok(Math.abs(rapport - 1) < 0.06, `${k} : rapport ${rapport.toFixed(3)}`) })
  // Forme fausse EmpSE²/√(2(n − 1)) : elle s'écarte d'un facteur σ quand σ ≠ 1 (σ = 3).
  const esEmp: number[] = []
  for (let r = 0; r < 1000; r++) esEmp.push(performance(Array.from({ length: n }, () => 3 * g.normal()), 0, new Array(n).fill(true)).valeur.esEmpirique)
  const juste = moy(esEmp) / Math.sqrt(2 * (n - 1)), fausse = moy(esEmp) ** 2 / Math.sqrt(2 * (n - 1))
  assert.ok(Math.abs(juste / et(esEmp) - 1) < 0.06 && Math.abs(fausse / et(esEmp) - 3) < 0.3, `juste ${juste}, fausse ${fausse}, observé ${et(esEmp)}`)
})

test('UC-005 nominal : T0.14 seuils de docking d\'Axtell : K-S bilatéral à 5 % pour n = m = 40 vaut 0,3037; U critique de Mann-Whitney pour n = m = 10 vaut 23', () => {
  pres(seuilKS(40, 40), 0.3037, 0.001, 'K-S')
  assert.equal(uCritique(10, 10), 23)
  assert.equal(uCritique(5, 5), 2)   // table classique : U critique bilatéral à 5 % pour n = m = 5
})
