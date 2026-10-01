// Bootstrap à graine (UC-004 BR-033, UC-007 BR-040) : rééchantillonnages tirés d'un flux du noyau, donc reproductibles.
import type { Prng } from '../core/random.ts'
import { quantile } from './descriptif.ts'

/**
 * B rééchantillonnages avec remise de n unités; `statistique` reçoit les indices tirés. Pour un bootstrap apparié, la même liste
 * d'indices sert à tous les bras : l'unité rééchantillonnée est la graine (l'exécution).
 */
export function reechantillonner(n: number, B: number, flux: Prng, statistique: (indices: Int32Array) => number): number[] {
  if (!(n > 0 && B > 0)) throw new Error(`bootstrap : n = ${n}, B = ${B}`)
  const indices = new Int32Array(n), stats: number[] = []
  for (let b = 0; b < B; b++) {
    for (let i = 0; i < n; i++) indices[i] = flux.int(n)
    stats.push(statistique(indices))
  }
  return stats
}

/** IC par la méthode des percentiles, au niveau donné (0,95 par défaut). */
export const icPercentile = (stats: readonly number[], niveau = 0.95): [number, number] => [quantile(stats, (1 - niveau) / 2), quantile(stats, (1 + niveau) / 2)]

/** IC à 95 % de la moyenne d'un échantillon, par bootstrap percentile. */
export function icMoyenne(valeurs: readonly number[], flux: Prng, B = 1000): [number, number] {
  return icPercentile(reechantillonner(valeurs.length, B, flux, idx => { let s = 0; for (const i of idx) s += valeurs[i]!; return s / idx.length }))
}
