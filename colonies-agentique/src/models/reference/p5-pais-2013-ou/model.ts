// Éq. 3 de [Pais et al. 2013] : dx = (a + b x) dt + c dW (Ornstein–Uhlenbeck si a = 0 et b < 0; DDM si b = 0).
// Banc d'essai d'Euler–Maruyama du socle (05 §3.1; fiche S0, T0.27); EDS d'Itô à bruit additif, flux `noise`.
import { createEulerMaruyama } from '../../../core/euler-maruyama.ts'
import { invalide } from '../../../core/scenario.ts'
import type { ReferenceModel } from '../../../core/simulation.ts'

export const pais2013Ou: ReferenceModel = {
  id: 'p5-pais-2013-ou',
  measureUnits: { x: '1' },
  create(s, f) {
    const p = new Float64Array(3)
    for (const [i, nom] of (['a', 'b', 'c'] as const).entries()) {
      const v = s.parameters[nom]?.value
      if (typeof v !== 'number') throw invalide(`parameters.${nom}`, 'nombre requis par le modèle')
      p[i] = v
    }
    const x0 = (s.initial as Record<string, unknown>).x
    if (typeof x0 !== 'number') throw invalide('initial', '{ x } numérique')
    if (s.interventions.length) throw invalide('interventions', 'non prises en charge par ce modèle')
    const y = new Float64Array([x0])
    const em = createEulerMaruyama(1)
    const bruit = f.stream('noise')
    const h = s.time.dt, pas = Math.round(s.time.horizon / h)
    let n = 0
    const derive = (_t: number, x: Float64Array, dx: Float64Array) => { dx[0] = p[0]! + p[1]! * x[0]! }
    const diffusion = (_t: number, _x: Float64Array, g: Float64Array) => { g[0] = p[2]! }
    return {
      advance() { em.step(derive, diffusion, n * h, y, h, bruit); n++ },
      time: () => n * h,
      done: () => n >= pas,
      observe: () => ({ x: y[0]! }),
      buffers: () => [y, p, bruit.buffer()],
      apply() {},
    }
  },
}
