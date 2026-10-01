// Gain collectif G (06-metriques-et-typologie) : G = (P_a − P_ref) / (P_max − P_ref), toujours rapporté avec Δ = P_a − P_ref.
// G est indéfini quand P_max − P_ref est sous le seuil du plan de recherche [à confirmer] : jamais un nombre (UC-011, BR-022).

export interface Gain { G: number | null; delta: number }

export function gainCollectif(pA: number, pRef: number, pMax: number, seuil: number): Gain {
  const delta = pA - pRef
  return { G: pMax - pRef < seuil ? null : delta / (pMax - pRef), delta }
}
