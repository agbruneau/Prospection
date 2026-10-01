// M1c à N fini (dossier x-methodes, X7) : huit réactions de [Seeley et al. 2012] simulées par SSA direct.
//   U→A, U→B (γ U); A→U, B→U (α A, α B); U+A→2A, U+B→2B (ρ A U/N, ρ B U/N);
//   A+B→U+B (σ A B/N, A inhibé par B), A+B→A+U (σ A B/N, B inhibé par A).
// Le temps continu vit dans l'état; advance() exécute les réactions de ]t, t + dt] et garde la réaction suivante en attente.
// Oracle : sec_ssa() de recherche/verifications-numeriques/x_methodes_checks.py (qui applique aussi la réaction qui franchit T).
import { invalide } from '../../../core/scenario.ts'
import type { ReferenceModel } from '../../../core/simulation.ts'
import { createDirectSsa, type ReactionSystem } from '../../../core/ssa.ts'

const PARAMETRES = ['sigma', 'gamma', 'alpha', 'rho', 'N'] as const

export const seeley2012Ssa: ReferenceModel = {
  id: 'p5-seeley-2012-ssa',
  measureUnits: { A: 'fraction', B: 'fraction', U: 'fraction', D: 'fraction' },
  create(s, f) {
    const p = new Float64Array(PARAMETRES.length)
    for (const [i, nom] of PARAMETRES.entries()) {
      const v = s.parameters[nom]?.value
      if (typeof v !== 'number') throw invalide(`parameters.${nom}`, 'nombre requis par le modèle')
      p[i] = v
    }
    const N = p[4]!
    if (!Number.isInteger(N) || N < 1) throw invalide('parameters.N', 'entier ≥ 1')
    const { A, B } = s.initial as Record<string, unknown>
    if (!Number.isInteger(A) || !Number.isInteger(B) || (A as number) < 0 || (B as number) < 0 || (A as number) + (B as number) > N)
      throw invalide('initial', '{ A, B } entiers ≥ 0, A + B ≤ N')
    if (s.interventions.length) throw invalide('interventions', 'non prises en charge par ce modèle')

    const x = new Int32Array([A as number, B as number])
    const systeme: ReactionSystem = {
      nReactions: 8,
      nSpecies: 2,
      stoichiometry: new Int32Array([1, 0, 0, 1, -1, 0, 0, -1, 1, 0, 0, 1, -1, 0, 0, -1]),
      propensities(y, a) {
        const [sigma, gamma, alpha, rho] = p as unknown as [number, number, number, number]
        const nA = y[0]!, nB = y[1]!, nU = N - nA - nB
        a[0] = gamma * nU; a[1] = gamma * nU
        a[2] = alpha * nA; a[3] = alpha * nB
        a[4] = rho * nA * nU / N; a[5] = rho * nB * nU / N
        a[6] = sigma * nA * nB / N; a[7] = sigma * nA * nB / N
      },
    }
    const rng = f.stream('agents')
    const ssa = createDirectSsa(systeme, rng)
    const h = s.time.dt, pas = Math.round(s.time.horizon / h)
    const temps = new Float64Array([0, -1])      // [temps courant, temps de la réaction en attente (−1 : aucune)]
    const attente = new Int32Array([-2])          // −2 : aucune réaction tirée; −1 : état absorbant
    let n = 0
    return {
      advance() {
        const fin = (n + 1) * h
        for (;;) {
          if (attente[0] === -2) { const r = ssa.step(x, temps[0]!); temps[1] = r.t; attente[0] = r.reaction }
          if (attente[0] === -1 || temps[1]! > fin) break
          ssa.fire(x, attente[0]!)
          temps[0] = temps[1]!
          temps[1] = -1
          attente[0] = -2
        }
        n++
      },
      time: () => n * h,
      done: () => n >= pas,
      observe: () => ({ A: x[0]! / N, B: x[1]! / N, U: (N - x[0]! - x[1]!) / N, D: Math.abs(x[0]! - x[1]!) / N }),
      buffers: () => [x, temps, attente, rng.buffer()],
      apply() {},
    }
  },
}
