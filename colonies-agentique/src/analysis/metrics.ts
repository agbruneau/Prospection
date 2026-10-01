// Métriques R et G (06 §3 et §4; UC-007). R est un vecteur de cinq composantes, jamais un scalaire (BR-037).
// G n'est chiffré que si l'IC de P_max − P_k exclut 0 et que P_max − P_k ≥ ε; Δ est toujours rapporté (BR-038).
import type { Prng } from '../core/random.ts'
import { icPercentile, reechantillonner } from './bootstrap.ts'

// ---------- R ----------
const log2 = (x: number) => Math.log(x) / Math.LN2

/** R_nom : capacité nominale d'un alphabet de taille donnée, en bits. */
export const rNom = (alphabet: number) => log2(alphabet)

/** Entropie plug-in d'un échantillon de symboles, en bits. */
export function entropie(w: readonly (number | string)[]): number {
  const c = new Map<number | string, number>()
  for (const x of w) c.set(x, (c.get(x) ?? 0) + 1)
  let h = 0
  for (const n of c.values()) { const p = n / w.length; h -= p * log2(p) }
  return h
}

/** Information mutuelle plug-in I(M ; W), en bits. */
export function information(m: readonly (number | string)[], w: readonly (number | string)[]): number {
  const conj = m.map((x, i) => `${x}\u0000${w[i]}`)
  return entropie(m) + entropie(w) - entropie(conj)
}

/**
 * R_eff = I(M ; W)/H(W), I estimé par plug-in corrigé par permutation : on soustrait la moyenne de Î sur W permuté
 * (biais sous indépendance ≈ (|M| − 1)(|W| − 1)/(2N ln 2)). Les permutations viennent du flux fourni.
 */
export function rEff(m: readonly (number | string)[], w: readonly (number | string)[], flux: Prng, permutations = 20): { brut: number; biais: number; valeur: number } {
  if (m.length !== w.length || m.length === 0) throw new Error('R_eff : messages et états de même longueur, non vides')
  const hW = entropie(w)
  if (hW === 0) throw new Error('R_eff : H(W) nulle, état caché constant')
  const brut = information(m, w), idx = new Int32Array(w.length)
  let biais = 0
  for (let k = 0; k < permutations; k++) {
    for (let i = 0; i < idx.length; i++) idx[i] = i
    flux.shuffle(idx)
    biais += information(m, Array.from(idx, i => w[i]!))
  }
  biais /= permutations
  return { brut: brut / hW, biais: biais / hW, valeur: (brut - biais) / hW }
}

/** R_pers : demi-vie d'un signal, selon la convention déclarée (06 §2.2, convention de ρ de [Dorigo et al. 1996]). */
export function rPers(p: { persistance: number } | { evaporation: number } | { taux: number } | { ttl: number }): number {
  if ('ttl' in p) return p.ttl
  if ('taux' in p) return Math.LN2 / p.taux
  const persistance = 'persistance' in p ? p.persistance : 1 - p.evaporation
  if (!(persistance > 0 && persistance < 1)) throw new Error(`R_pers : persistance dans ]0, 1[ (${persistance})`)
  return Math.LN2 / -Math.log(persistance)
}

/** R_port : fraction moyenne des autres agents qui peuvent percevoir un signal à son émission. */
export const rPort = (lecteurs: readonly number[], N: number) => lecteurs.reduce((a, r) => a + r / (N - 1), 0) / lecteurs.length
/** R_adr : fraction des messages dont l'émetteur désigne le destinataire. */
export const rAdr = (adresses: readonly boolean[]) => adresses.filter(Boolean).length / adresses.length

// ---------- G ----------
const choisir = (n: number, k: number) => { let c = 1; for (let i = 1; i <= k; i++) c = c * (n - k + i) / i; return c }

/** Précision d'un vote majoritaire strict de n agents indépendants de précision p (n impair; [Condorcet 1785]). */
export function condorcet(n: number, p: number): number {
  let s = 0
  for (let k = (n + 1) / 2; k <= n; k++) s += choisir(n, k) * p ** k * (1 - p) ** (n - k)
  return s
}
const lnBeta = (a: number, b: number) => lnGamma(a) + lnGamma(b) - lnGamma(a + b)
function lnGamma(x: number): number {   // Lanczos, g = 7
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lnGamma(1 - x)
  x -= 1
  let a = c[0]!
  const t = x + 7.5
  for (let i = 1; i < 9; i++) a += c[i]! / (x + i)
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a)
}
/** Vote majoritaire sous erreurs corrélées : modèle bêta-binomial, corrélation intra-classe ρ ([Boland 1989], [Dietrich 2008]). */
export function condorcetCorrele(n: number, p: number, rho: number): number {
  if (rho >= 1) return p
  if (rho <= 0) return condorcet(n, p)
  const a = p * (1 - rho) / rho, b = (1 - p) * (1 - rho) / rho
  let s = 0
  for (let k = (n + 1) / 2; k <= n; k++) s += choisir(n, k) * Math.exp(lnBeta(k + a, n - k + b) - lnBeta(a, b))
  return s
}

export type ValeurG = number | 'non défini' | 'borne invalide'
export interface ResultatGain { Pk: number; Pa: number; delta: number; icDelta: [number, number]; G: ValeurG; icG?: [number, number]; raison?: string }

/**
 * Δ_k = P_a − P_k et G_k = Δ_k/(P_max − P_k), sur des scores appariés par graine (même rang = même graine), IC à 95 % par
 * bootstrap apparié (BR-040). G « non défini » si l'IC de P_max − P_k contient 0 ou si P_max − P_k < ε; « borne invalide »
 * si P_k > P_max (BR-038).
 */
export function gainApparie(a: readonly number[], ref: readonly number[], pMax: number, epsilon: number, flux: Prng, B = 1000): ResultatGain {
  if (a.length !== ref.length || a.length === 0) throw new Error('G : scores appariés de même longueur, non vides')
  const moy = (v: readonly number[], idx?: Int32Array) => { let s = 0; if (idx) for (const i of idx) s += v[i]!; else for (const x of v) s += x; return s / (idx?.length ?? v.length) }
  const Pa = moy(a), Pk = moy(ref), delta = Pa - Pk
  const deltas: number[] = [], pks: number[] = [], gs: number[] = []
  reechantillonner(a.length, B, flux, idx => {
    const pa = moy(a, idx), pk = moy(ref, idx)
    deltas.push(pa - pk); pks.push(pk)
    if (pMax - pk > 0) gs.push((pa - pk) / (pMax - pk))
    return 0
  })
  const base = { Pk, Pa, delta, icDelta: icPercentile(deltas) }
  if (Pk > pMax) return { ...base, G: 'borne invalide', raison: `P_k = ${Pk} > P_max = ${pMax}` }
  const [, pkHaut] = icPercentile(pks)
  if (pMax - pkHaut <= 0) return { ...base, G: 'non défini', raison: 'l\'IC à 95 % de P_max − P_k contient 0' }
  if (pMax - Pk < epsilon) return { ...base, G: 'non défini', raison: `P_max − P_k = ${pMax - Pk} < ε = ${epsilon}` }
  return { ...base, G: delta / (pMax - Pk), icG: icPercentile(gs) }
}

/** Décomposition agrégation / communication à dénominateur commun P_max − P_ind (06 §4.3; BR-039). */
export function decomposition(Pa: number, Pvote: number, Pind: number, pMax: number) {
  const d = pMax - Pind
  return { deltaAgg: Pvote - Pind, deltaCom: Pa - Pvote, Gagg: (Pvote - Pind) / d, Gcom: (Pa - Pvote) / d, Gind: (Pa - Pind) / d }
}
