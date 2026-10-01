// Équivalence et règles de décision des cibles (04 §4 et §5; 05 §9.2-9.3).
// ponytail: α = 0,05 et puissance 80 % seulement (constantes); IC de Wald pour les proportions (04 §5.1 laisse la méthode à la fiche).

export const Z_95 = 1.6448536269514722
export const Z_975 = 1.959963984540054
const Z_90 = 1.2815515655446004
const K_TOST = (Z_95 + Z_90) ** 2            // 8,564 (04 §5.3)

/** Quantile de Student par développement de Cornish-Fisher (erreur < 1e-4 dès 5 degrés de liberté). */
export function quantileT(p: 0.95 | 0.975, df: number): number {
  const z = p === 0.95 ? Z_95 : Z_975
  if (!Number.isFinite(df)) return z
  if (!(df >= 5)) throw new Error(`quantileT : ${df} degrés de liberté (5 au moins)`)
  const z2 = z * z, v = df
  return z + (z2 * z + z) / (4 * v) + (5 * z2 ** 2 * z + 16 * z2 * z + 3 * z) / (96 * v ** 2)
    + (3 * z2 ** 3 * z + 19 * z2 ** 2 * z + 17 * z2 * z - 15 * z) / (384 * v ** 3)
    + (79 * z2 ** 4 * z + 776 * z2 ** 3 * z + 1482 * z2 ** 2 * z - 1920 * z2 * z - 945 * z) / (92160 * v ** 4)
}

/** n par bras d'un TOST sur proportions : 2p(1 − p)(z₀,₉₅ + z₀,₉₀)²/δ² (04 §5.3). */
export const requiredNTost = (p: number, delta: number) => Math.ceil(2 * p * (1 - p) * K_TOST / delta ** 2)
/** n par groupe d'un TOST sur moyennes, écart-type σ : 2σ²(z₀,₉₅ + z₀,₉₀)²/δ². */
export const requiredNTostMoyenne = (sd: number, delta: number) => Math.ceil(2 * sd ** 2 * K_TOST / delta ** 2)

export type Issue = 'satisfied' | 'unsatisfied' | 'inconclusive'
export type Test = 'equal' | 'TOST' | 'order' | 'range' | 'fit'
export interface Marge { delta: number; scale: 'points' | 'relative' | 'log10' | 'standardized'; justification: string }

/** Critère exécutable d'une cible : statistique par exécution, puis test contre la valeur publiée. */
export interface Criterion {
  quantity: string
  /** Valeur finale de la mesure par exécution; avec `threshold`, indicatrice → proportion. */
  statistic: { measure: string; threshold?: { op: '>' | '>=' | '<' | '<='; value: number } }
  test: Test
  value: number | readonly [number, number]
  margin?: Marge
  dispersion?: { kind: 'sd' | 'se' | 'ci' | 'unknown'; value: number }
  publishedN?: number
}
export interface Decision { quantity: string; outcome: Issue; measured: number; mcStandardError: number; ci90?: readonly [number, number]; n: number }

const estProportion = (c: Criterion) => c.statistic.threshold !== undefined

/** Marge absolue, dans l'unité de la statistique : « points » = points de pourcentage pour une proportion. */
export function margeAbsolue(c: Criterion): number {
  const m = c.margin
  if (!m) throw new Error(`${c.quantity} : marge requise`)
  if (m.scale === 'points') return estProportion(c) ? m.delta / 100 : m.delta
  if (m.scale === 'relative') return m.delta * Math.abs(c.value as number)
  if (m.scale === 'standardized' && c.dispersion?.kind === 'sd') return m.delta * c.dispersion.value
  throw new Error(`${c.quantity} : échelle de marge non implantée (${m.scale})`)
}

/** n requis par la marge (garde de puissance, BR-010); 0 si le test n'est pas un TOST. */
export function nRequis(c: Criterion): number {
  if (c.test !== 'TOST') return 0
  const delta = margeAbsolue(c)
  if (estProportion(c)) return requiredNTost(c.value as number, delta)
  if (c.dispersion?.kind !== 'sd') throw new Error(`${c.quantity} : un TOST sur une moyenne exige l'écart-type publié (dispersion sd)`)
  return requiredNTostMoyenne(c.dispersion.value, delta)
}

export const valeurParExecution = (c: Criterion, x: number): number => {
  const t = c.statistic.threshold
  if (!t) return x
  return (t.op === '>' ? x > t.value : t.op === '>=' ? x >= t.value : t.op === '<' ? x < t.value : x <= t.value) ? 1 : 0
}

/** Applique le test du critère aux valeurs par exécution (04 §5.4 pour le TOST). */
export function decider(c: Criterion, valeurs: readonly number[]): Decision {
  const n = valeurs.length
  if (n === 0) return { quantity: c.quantity, outcome: 'inconclusive', measured: NaN, mcStandardError: NaN, n }
  const m = valeurs.reduce((a, b) => a + b, 0) / n
  const sd = n > 1 ? Math.sqrt(valeurs.reduce((a, v) => a + (v - m) ** 2, 0) / (n - 1)) : 0
  const es = estProportion(c) ? Math.sqrt(m * (1 - m) / n) : sd / Math.sqrt(n)
  const base = { quantity: c.quantity, measured: m, mcStandardError: es, n }

  if (c.test === 'equal') {
    const tol = margeAbsolue(c)
    return { ...base, outcome: Math.abs(m - (c.value as number)) <= tol ? 'satisfied' : 'unsatisfied' }
  }
  if (c.test === 'TOST') {
    const delta = margeAbsolue(c), d = m - (c.value as number)
    // Source à n et dispersion connus : Welch (Satterthwaite); sinon valeur publiée traitée comme constante (04 §5.5).
    const esSource = c.publishedN && c.dispersion?.kind === 'sd' ? c.dispersion.value / Math.sqrt(c.publishedN) : c.dispersion?.kind === 'se' ? c.dispersion.value : 0
    const esD = Math.hypot(es, esSource)
    const df = estProportion(c) ? Infinity : esSource > 0 && c.publishedN
      ? esD ** 4 / (es ** 4 / (n - 1) + esSource ** 4 / (c.publishedN - 1))
      : n - 1
    const ci90 = [d - quantileT(0.95, df) * esD, d + quantileT(0.95, df) * esD] as const
    const t975 = quantileT(0.975, df)
    const equivalent = ci90[0] > -delta && ci90[1] < delta
    const different = d - t975 * esD > 0 || d + t975 * esD < 0
    return { ...base, ci90, outcome: equivalent ? 'satisfied' : different ? 'unsatisfied' : 'inconclusive' }
  }
  if (c.test === 'range') {
    const [lo, hi] = c.value as readonly [number, number]
    const t975 = estProportion(c) || es === 0 ? Z_975 : quantileT(0.975, n - 1)
    const bas = m - t975 * es, haut = m + t975 * es
    return { ...base, outcome: bas >= lo && haut <= hi ? 'satisfied' : haut < lo || bas > hi ? 'unsatisfied' : 'inconclusive' }
  }
  throw new Error(`${c.quantity} : test non implanté (${c.test})`)
}

/** Conjonction des critères d'une cible (BR-012) : un critère non satisfait suffit; sinon un indéterminé suffit. */
export const conjonction = (issues: readonly Issue[]): Issue =>
  issues.includes('unsatisfied') ? 'unsatisfied' : issues.includes('inconclusive') ? 'inconclusive' : 'satisfied'
