// Erreurs-types de Monte Carlo des mesures de performance d'une étude de simulation ([Morris et al. 2019], tableau 6),
// et nombre de réplications requis (T0.12, T0.16).

/** Réplications pour qu'une proportion p ait une erreur-type de Monte Carlo es : p(1 − p)/es² (T0.12). */
export const nSim = (p: number, es: number) => Math.ceil(p * (1 - p) / es ** 2 - 1e-9)

/** Erreur-type d'une proportion estimée sur n réplications. */
export const esProportion = (p: number, n: number) => Math.sqrt(p * (1 - p) / n)

export interface Performance { biais: number; esEmpirique: number; eqm: number; couverture: number }

/**
 * Mesures de performance d'un estimateur sur n réplications (estimations θ̂ᵢ de la vraie valeur θ; `couvre[i]` : l'IC de la
 * réplication i contient θ) et leurs erreurs-types de Monte Carlo. Forme correcte pour l'ES empirique : EmpSE/√(2(n − 1)) (T0.16).
 */
export function performance(estimations: readonly number[], theta: number, couvre: readonly boolean[]): { valeur: Performance; es: Performance } {
  const n = estimations.length
  if (n < 2 || couvre.length !== n) throw new Error('performance : au moins 2 réplications, une couverture par réplication')
  const moyenne = estimations.reduce((a, b) => a + b, 0) / n
  const ss = estimations.reduce((a, e) => a + (e - moyenne) ** 2, 0)
  const esEmpirique = Math.sqrt(ss / (n - 1))
  const eqm = estimations.reduce((a, e) => a + (e - theta) ** 2, 0) / n
  const couverture = couvre.filter(Boolean).length / n
  return {
    valeur: { biais: moyenne - theta, esEmpirique, eqm, couverture },
    es: {
      biais: Math.sqrt(ss / (n * (n - 1))),
      esEmpirique: esEmpirique / Math.sqrt(2 * (n - 1)),
      eqm: Math.sqrt(estimations.reduce((a, e) => a + ((e - theta) ** 2 - eqm) ** 2, 0) / (n * (n - 1))),
      couverture: esProportion(couverture, n),
    },
  }
}
