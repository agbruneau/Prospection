// SSA, méthode directe [Gillespie 2007], éq. 10a,b (05 §4.4) :
// τ = (1/a₀) ln(1/r₁); j = plus petit indice tel que Σ_{j' ≤ j} a_j' > r₂ a₀.
import type { Prng } from './random.ts'

export interface ReactionSystem {
  readonly nReactions: number
  readonly nSpecies: number
  readonly stoichiometry: Int32Array          // nReactions × nSpecies
  propensities(x: Int32Array, a: Float64Array): void
}
export interface Ssa {
  /** Prochaine réaction (temps absolu, indice) sans modifier x; reaction = −1 et t infini si a₀ = 0 (état absorbant). */
  step(x: Int32Array, t: number): { t: number; reaction: number }
  /** Applique la stœchiométrie de la réaction à x. */
  fire(x: Int32Array, reaction: number): void
}

export function createDirectSsa(system: ReactionSystem, rng: Prng): Ssa {
  const a = new Float64Array(system.nReactions)
  const { nReactions, nSpecies, stoichiometry } = system
  return {
    step(x, t) {
      system.propensities(x, a)
      let a0 = 0
      for (let j = 0; j < nReactions; j++) a0 += a[j]!
      if (!(a0 > 0)) return { t: Infinity, reaction: -1 }
      const tau = Math.log(1 / rng.uniformOpen()) / a0
      const seuil = rng.uniformOpen() * a0
      let j = 0, cumul = a[0]!
      while (cumul <= seuil && j < nReactions - 1) cumul += a[++j]!
      while (a[j] === 0 && j > 0) j-- // arrondi de la somme : jamais une réaction de propension nulle
      return { t: t + tau, reaction: j }
    },
    fire(x, j) {
      for (let s = 0; s < nSpecies; s++) x[s] = x[s]! + stoichiometry[j * nSpecies + s]!
    },
  }
}
