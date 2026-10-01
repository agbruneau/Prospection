import assert from 'node:assert/strict'
import { test } from 'node:test'
import { condorcet, condorcetCorrele, decomposition, entropie, gainApparie, information, rAdr, rEff, rNom, rPers, rPort } from '../../src/analysis/metrics.ts'
import { createStream } from '../../src/core/random.ts'

const pres = (x: number, attendu: number, tol: number, nom: string) => assert.ok(Math.abs(x - attendu) <= tol, `${nom} : ${x} au lieu de ${attendu} ± ${tol}`)
const H2 = (p: number) => -(p * Math.log2(p) + (1 - p) * Math.log2(1 - p))
const esDepuisIc = (ic: readonly [number, number]) => (ic[1] - ic[0]) / (2 * 1.959964)

test('UC-007 nominal : T0.29 (a) R_eff d\'un canal binaire symétrique vaut 1 − H₂(p) : 0,531 à p = 0,1 et 0,278 à p = 0,2, à 0,02 près sur 10⁴ échantillons', () => {
  const g = createStream(20261001n, 'channel')
  for (const [p, attendu] of [[0.1, 0.531], [0.2, 0.278]] as const) {
    pres(1 - H2(p), attendu, 5e-4, `1 − H₂(${p})`)
    const valeurs: number[] = []
    for (let r = 0; r < 100; r++) {
      const w = Array.from({ length: 10_000 }, () => g.int(2)), m = w.map(x => (g.uniform() < p ? 1 - x : x))
      const v = rEff(m, w, g, 5).valeur
      assert.ok(v >= 0 && v <= 1, `R_eff hors de [0, 1] : ${v}`)
      valeurs.push(v)
    }
    pres(valeurs.reduce((a, b) => a + b, 0) / valeurs.length, 1 - H2(p), 0.02, `R_eff, p = ${p}`)
  }
})

test('UC-007 nominal : T0.29 (a) sous indépendance, le plug-in surestime I de 0,035 bit (|M| = |W| = 8, N = 1 000) et la permutation ramène ce biais à ≈ 0', () => {
  const g = createStream(7n, 'channel')
  let brut = 0, corrige = 0
  for (let r = 0; r < 40; r++) {
    const w = Array.from({ length: 1000 }, () => g.int(8)), m = Array.from({ length: 1000 }, () => g.int(8))
    const e = rEff(m, w, g, 20), h = entropie(w)
    brut += e.brut * h / 40; corrige += e.valeur * h / 40
  }
  pres(brut, (7 * 7) / (2 * 1000 * Math.LN2), 0.006, 'biais plug-in (bit)')
  pres(corrige, 0, 0.005, 'biais corrigé (bit)')
  pres(information([0, 1, 0, 1], [0, 1, 0, 1]), 1, 1e-12, 'I d\'un canal parfait')
})

test('UC-007 nominal : T0.29 (b) à (d) R_nom = 3 bits pour 8 symboles; demi-vies 1 et 68,97 pas, 0,15 pas lu en évaporation; R_port et R_adr par construction', () => {
  assert.equal(rNom(8), 3)
  pres(rPers({ persistance: 0.5 }), 1, 0.05, 'p = 0,5')
  pres(rPers({ persistance: 0.99 }), 68.97, 68.97 * 0.05, 'p = 0,99')
  pres(rPers({ evaporation: 0.99 }), 0.15, 0.15 * 0.05, '0,99 lu en évaporation')
  pres(rPers({ taux: 0.1 }), Math.LN2 / 0.1, 1e-12, 'taux continu')
  pres(rPort([1, 9, 9], 10), (1 / 9 + 2) / 3, 1e-12, 'R_port')
  assert.equal(rAdr([true, false, false]), 1 / 3)
})

/** 10⁴ exécutions : 9 agents indépendants de précision p; ind = part d'agents justes, vote = majorité juste. */
function votes(p: number, graine: bigint) {
  const g = createStream(graine, 'agents'), ind: number[] = [], vote: number[] = []
  for (let r = 0; r < 10_000; r++) {
    let justes = 0
    for (let a = 0; a < 9; a++) if (g.uniform() < p) justes++
    ind.push(justes / 9); vote.push(justes >= 5 ? 1 : 0)
  }
  return { ind, vote }
}

test('UC-007 nominal : T0.30 agrégation seule : P_vote = 0,7334 et G_agg = 0,3336 à p = 0,6; 0,9012 et 0,6706 à p = 0,7; Ĝ à moins de 3 ES; G_com = 0; additivité à 1e-12', () => {
  for (const [p, pVote, gAgg] of [[0.6, 0.7334, 0.3336], [0.7, 0.9012, 0.6706]] as const) {
    pres(condorcet(9, p), pVote, 1e-4, `P_vote, p = ${p}`)
    pres((condorcet(9, p) - p) / (1 - p), gAgg, 1e-4, `G_agg, p = ${p}`)
    const { ind, vote } = votes(p, BigInt(Math.round(p * 10)))
    const r = gainApparie(vote, ind, 1, 0.1, createStream(1n, 'bootstrap'))
    assert.equal(typeof r.G, 'number')
    assert.ok(Math.abs((r.G as number) - gAgg) < 3 * esDepuisIc(r.icG!), `Ĝ_agg = ${r.G} contre ${gAgg} (IC ${r.icG})`)
    const com = gainApparie(vote, vote, 1, 0.1, createStream(2n, 'bootstrap'))   // collectif sans canal : P_a = P_vote
    assert.ok(com.icDelta[0] <= 0 && com.icDelta[1] >= 0)
    const d = decomposition(r.Pa, r.Pa, r.Pk, 1)
    assert.ok(Math.abs(d.Gind - (d.Gagg + d.Gcom)) < 1e-12)
    assert.equal(d.Gcom, 0)
  }
})

test('UC-007 nominal : T0.31 (a) erreurs corrélées (bêta-binomial, N = 9, p = 0,6) : P_vote 0,6322, 0,6038 et 0,6 pour ρ = 0,3, 0,7 et 1', () => {
  for (const [rho, pVote, gAgg] of [[0.3, 0.6322, 0.0804], [0.7, 0.6038, 0.0096], [1, 0.6, 0]] as const) {
    pres(condorcetCorrele(9, 0.6, rho), pVote, 1e-4, `P_vote, ρ = ${rho}`)
    pres((condorcetCorrele(9, 0.6, rho) - 0.6) / 0.4, gAgg, 1e-4, `G_agg, ρ = ${rho}`)
  }
  pres(condorcetCorrele(9, 0.6, 1e-4), condorcet(9, 0.6), 1e-3, 'ρ → 0 : indépendance')
})

test('UC-007 nominal : T0.31 (b) et (c) à budget égal (s = 0,3, 9 essais) G_fort = 0 alors que G_ind = 0,942; un vote ne réussit jamais quand tous les agents échouent (précision ≤ 1 − β)', () => {
  pres(1 - 0.7 ** 9, 0.9596, 1e-4, 'P(au moins un succès en 9 essais)')
  const g = createStream(31n, 'agents'), a: number[] = [], fort: number[] = [], ind: number[] = []
  let violations = 0, tousEchouent = 0, voteJuste = 0
  for (let r = 0; r < 10_000; r++) {
    const essais = Array.from({ length: 9 }, () => g.uniform() < 0.3)
    a.push(essais.some(Boolean) ? 1 : 0)                                    // 9 agents, un essai chacun, « au moins un succès »
    fort.push(Array.from({ length: 9 }, () => g.uniform() < 0.3).some(Boolean) ? 1 : 0)   // un agent, 9 essais
    ind.push(essais[0] ? 1 : 0)                                             // un agent, un essai
    const justes = essais.filter(Boolean).length, vote = justes >= 5
    if (justes === 0) tousEchouent++
    if (vote) voteJuste++
    if (vote && justes === 0) violations++
  }
  const gFort = gainApparie(a, fort, 1, 0.02, createStream(3n, 'bootstrap'))
  assert.ok(gFort.icDelta[0] <= 0 && gFort.icDelta[1] >= 0, `Δ_fort ${gFort.delta} IC ${gFort.icDelta}`)
  const gInd = gainApparie(a, ind, 1, 0.1, createStream(4n, 'bootstrap'))
  assert.ok(Math.abs((gInd.G as number) - 0.942) < 3 * esDepuisIc(gInd.icG!), `G_ind ${gInd.G}`)
  assert.equal(violations, 0)
  assert.ok(voteJuste / 10_000 <= 1 - tousEchouent / 10_000)
})

test('UC-007 BR-038 : T0.32 G « non défini » quand P_max = P_k, « borne invalide » quand P_max < P_k, jamais NaN ni infini; Δ toujours avec IC; bootstrap apparié', () => {
  const f = () => createStream(5n, 'bootstrap')
  const unes = new Array(200).fill(1), a = Array.from({ length: 200 }, (_, i) => (i % 3 ? 1 : 0))
  const plafond = gainApparie(a, unes, 1, 0.1, f())
  assert.deepEqual([plafond.G, plafond.raison], ['non défini', 'l\'IC à 95 % de P_max − P_k contient 0'])
  const borne = gainApparie(a, unes, 0.8, 0.1, f())
  assert.equal(borne.G, 'borne invalide')
  for (const r of [plafond, borne]) assert.ok(Number.isFinite(r.delta) && r.icDelta.every(Number.isFinite))
  const ref = Array.from({ length: 200 }, (_, i) => (i % 2) * 0.5), decale = ref.map(x => x + 0.1)
  const apparie = gainApparie(decale, ref, 1, 0.1, f())
  pres(apparie.icDelta[1] - apparie.icDelta[0], 0, 1e-12, 'IC de Δ d\'un décalage constant (apparié)')
  assert.deepEqual(gainApparie(decale, ref, 1, 0.1, f()), apparie)
  const proche = gainApparie(a, Array.from({ length: 200 }, (_, i) => (i % 20 ? 1 : 0)), 1, 0.1, f())
  assert.deepEqual([proche.G, proche.raison?.startsWith('P_max − P_k = ')], ['non défini', true])   // P_max − P_k = 0,05 < ε
})
