// RK4 classique, en place, tampons alloués à la création (05 §4.3).
export type Derivative = (t: number, y: Float64Array, dy: Float64Array) => void
export interface Rk4 { step(f: Derivative, t: number, y: Float64Array, h: number): void }

export function createRk4(dimension: number): Rk4 {
  const k1 = new Float64Array(dimension), k2 = new Float64Array(dimension)
  const k3 = new Float64Array(dimension), k4 = new Float64Array(dimension)
  const tmp = new Float64Array(dimension)
  return {
    step(f, t, y, h) {
      f(t, y, k1)
      for (let i = 0; i < dimension; i++) tmp[i] = y[i]! + (h / 2) * k1[i]!
      f(t + h / 2, tmp, k2)
      for (let i = 0; i < dimension; i++) tmp[i] = y[i]! + (h / 2) * k2[i]!
      f(t + h / 2, tmp, k3)
      for (let i = 0; i < dimension; i++) tmp[i] = y[i]! + h * k3[i]!
      f(t + h, tmp, k4)
      for (let i = 0; i < dimension; i++) y[i] = y[i]! + (h / 6) * (k1[i]! + 2 * k2[i]! + 2 * k3[i]! + k4[i]!)
    },
  }
}
