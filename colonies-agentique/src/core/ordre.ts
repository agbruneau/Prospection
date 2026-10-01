// Commutateur d'ordre de mise à jour (05 §7.3) : l'ordre est un paramètre du modèle, déclaré au scénario.
import type { Prng } from './random.ts'
import type { UpdateOrder } from './scenario.ts'

/**
 * Indices des agents pour le pas courant. `synchronous` et `sequential-fixed` : indices croissants (en synchrone, le modèle
 * lit l'état du début de pas et écrit dans le tampon suivant); `sequential-random` : permutation tirée du flux `order`.
 */
export function ordreDuPas(ordre: UpdateOrder, indices: Int32Array, flux?: Prng): Int32Array {
  for (let i = 0; i < indices.length; i++) indices[i] = i
  if (ordre === 'sequential-random') {
    if (!flux) throw new Error('ordre sequential-random : flux `order` requis')
    flux.shuffle(indices)
  }
  return indices
}
