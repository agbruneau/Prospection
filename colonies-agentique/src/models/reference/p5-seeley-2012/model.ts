// M1c, équations moyennes de [Seeley et al. 2012] (SOM), banc d'essai du socle (05 §3.1; dossier p5-quorum) :
//   dΨA/dt = γ ΨU − ΨA (α − ρ ΨU + σ ΨB),  dΨB/dt = γ ΨU − ΨB (α − ρ ΨU + σ ΨA),  ΨU = 1 − ΨA − ΨB.
// EDO intégrée par RK4 à pas fixe h = dt. Oracle Python : recherche/verifications-numeriques/x_methodes_checks.py.
import { createRk4 } from '../../../core/rk4.ts'
import { invalide } from '../../../core/scenario.ts'
import type { ReferenceModel } from '../../../core/simulation.ts'

const PARAMETRES = ['sigma', 'gamma', 'alpha', 'rho'] as const

export const seeley2012: ReferenceModel = {
  id: 'p5-seeley-2012',
  measureUnits: { A: 'fraction', B: 'fraction', U: 'fraction' },
  create(s) {
    const p = new Float64Array(PARAMETRES.length)
    for (const [i, nom] of PARAMETRES.entries()) {
      const v = s.parameters[nom]?.value
      if (typeof v !== 'number') throw invalide(`parameters.${nom}`, 'nombre requis par le modèle')
      p[i] = v
    }
    const { A, B } = s.initial as Record<string, unknown>
    if (typeof A !== 'number' || typeof B !== 'number' || A < 0 || B < 0 || A + B > 1) throw invalide('initial', '{ A, B } avec A, B ≥ 0 et A + B ≤ 1')
    for (const [k, i] of s.interventions.entries())
      if (!PARAMETRES.includes(i.type as never) || typeof i.value !== 'number') throw invalide(`interventions[${k}]`, `type parmi ${PARAMETRES.join(', ')}, valeur numérique`)

    const y = new Float64Array([A, B])
    const rk4 = createRk4(2)
    const h = s.time.dt, pas = Math.round(s.time.horizon / h)
    let n = 0
    const f = (_t: number, x: Float64Array, dx: Float64Array) => {
      const [sigma, gamma, alpha, rho] = p as unknown as [number, number, number, number]
      const a = x[0]!, b = x[1]!, u = 1 - a - b
      dx[0] = gamma * u - a * (alpha - rho * u + sigma * b)
      dx[1] = gamma * u - b * (alpha - rho * u + sigma * a)
    }
    return {
      advance() { rk4.step(f, n * h, y, h); n++ },
      time: () => n * h,
      done: () => n >= pas,
      observe: () => ({ A: y[0]!, B: y[1]!, U: 1 - y[0]! - y[1]! }),
      buffers: () => [y, p],
      apply(i) { p[PARAMETRES.indexOf(i.type as never)] = i.value as number },
    }
  },
}
