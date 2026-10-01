// Euler–Maruyama (Itô, bruit diagonal), en place, tampons alloués à la création (05 §4.3) :
//   y_{n+1} = y_n + f(t, y_n) h + g(t, y_n) · √h · Z,  Z ~ N(0, 1) indépendants par composante (flux `noise`).
import type { Prng } from './random.ts'
import type { Derivative } from './rk4.ts'

export type NoiseCoefficient = (t: number, y: Float64Array, g: Float64Array) => void
export interface EulerMaruyama {
  step(drift: Derivative, noise: NoiseCoefficient, t: number, y: Float64Array, h: number, rng: Prng): void
}

export function createEulerMaruyama(dimension: number): EulerMaruyama {
  const f = new Float64Array(dimension), g = new Float64Array(dimension)
  return {
    step(drift, noise, t, y, h, rng) {
      drift(t, y, f)
      noise(t, y, g)
      const racine = Math.sqrt(h)
      for (let i = 0; i < dimension; i++) y[i] = y[i]! + f[i]! * h + g[i]! * racine * rng.normal()
    },
  }
}
