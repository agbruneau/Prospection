// Modèle jouet du spike (protocole §1) : Vicsek, domaine périodique, listes de cellules, mise à jour synchrone.
// Même code sous Node et dans les navigateurs; bruit tiré du noyau (flux `noise`). Code de spike, hors du produit.
import { empreinte } from '../../src/core/fingerprint.ts'
import { createStream } from '../../src/core/random.ts'

export interface Jouet {
  readonly n: number
  readonly L: number
  readonly x: Float32Array
  readonly y: Float32Array
  readonly theta: Float32Array
  pas(): void
  empreinte(): string
  compteur(): number
}

export function creerJouet(n: number, graine: bigint, { rho = 4, r = 1, v = 0.03, eta = 0.5 } = {}): Jouet {
  const L = Math.sqrt(n / rho)
  const nc = Math.max(3, Math.floor(L / r))        // cellules par côté, de taille ≥ r
  const taille = L / nc
  const init = createStream(graine, 'environment'), bruit = createStream(graine, 'noise')
  const x = new Float32Array(n), y = new Float32Array(n), theta = new Float32Array(n)
  for (let i = 0; i < n; i++) { x[i] = init.uniform() * L; y[i] = init.uniform() * L; theta[i] = (2 * init.uniform() - 1) * Math.PI }
  const cos = new Float64Array(n), sin = new Float64Array(n), nouveau = new Float32Array(n)
  const cellule = new Int32Array(n), debut = new Int32Array(nc * nc + 1), curseur = new Int32Array(nc * nc), ordre = new Int32Array(n)
  const compte = new Int32Array(1)
  const demi = L / 2, r2 = r * r

  return {
    n, L, x, y, theta,
    pas() {
      debut.fill(0)
      for (let i = 0; i < n; i++) {
        const cx = Math.min(nc - 1, Math.floor(x[i]! / taille)), cy = Math.min(nc - 1, Math.floor(y[i]! / taille))
        const c = cx * nc + cy
        cellule[i] = c
        debut[c + 1] = debut[c + 1]! + 1
        cos[i] = Math.cos(theta[i]!)
        sin[i] = Math.sin(theta[i]!)
      }
      for (let c = 0; c < nc * nc; c++) { debut[c + 1] = debut[c + 1]! + debut[c]!; curseur[c] = debut[c]! }
      for (let i = 0; i < n; i++) { const c = cellule[i]!; ordre[curseur[c]!] = i; curseur[c] = curseur[c]! + 1 }
      for (let i = 0; i < n; i++) {
        const cx = Math.floor(cellule[i]! / nc), cy = cellule[i]! % nc
        let sx = 0, sy = 0
        for (let ox = -1; ox <= 1; ox++)
          for (let oy = -1; oy <= 1; oy++) {
            const c = ((cx + ox + nc) % nc) * nc + ((cy + oy + nc) % nc)
            for (let k = debut[c]!; k < debut[c + 1]!; k++) {
              const j = ordre[k]!
              let dx = x[j]! - x[i]!, dy = y[j]! - y[i]!
              if (dx > demi) dx -= L; else if (dx < -demi) dx += L
              if (dy > demi) dy -= L; else if (dy < -demi) dy += L
              if (dx * dx + dy * dy <= r2) { sx += cos[j]!; sy += sin[j]! }
            }
          }
        nouveau[i] = Math.atan2(sy, sx) + eta * (bruit.uniform() - 0.5)
      }
      for (let i = 0; i < n; i++) {
        theta[i] = nouveau[i]!
        let a = x[i]! + v * Math.cos(nouveau[i]!), b = y[i]! + v * Math.sin(nouveau[i]!)
        if (a >= L) a -= L; else if (a < 0) a += L
        if (b >= L) b -= L; else if (b < 0) b += L
        x[i] = a
        y[i] = b
      }
      compte[0] = compte[0]! + 1
    },
    empreinte: () => empreinte([x, y, theta, bruit.buffer(), compte]),
    compteur: () => compte[0]!,
  }
}

/** E0.5 : 10⁶ entrées par fonction, tirées du flux `measure`, et leurs sorties. */
export const FONCTIONS = ['exp', 'log', 'powEntier', 'powReel', 'sin', 'cos'] as const
export type Fonction = (typeof FONCTIONS)[number]
export function sortiesMath(f: Fonction, graine = 20261001n, n = 1_000_000): Float64Array {
  const g = createStream(graine, 'measure').derive(f), s = new Float64Array(n)
  for (let i = 0; i < n; i++) {
    const u = g.uniform()
    s[i] = f === 'exp' ? Math.exp(-50 + 100 * u)
      : f === 'log' ? Math.log(g.uniformOpen() * 1e6)
      : f === 'powEntier' ? Math.pow(0.5 + 1.5 * u, g.int(21) - 10)
      : f === 'powReel' ? Math.pow(g.uniformOpen() * 10, -5 + 10 * u)
      : f === 'sin' ? Math.sin(-100 + 200 * u)
      : Math.cos(-100 + 200 * u)
  }
  return s
}
/** Empreinte de chaque bloc de 1 000 sorties. */
export function empreintesBlocs(s: Float64Array, bloc = 1000): string[] {
  const e: string[] = []
  for (let k = 0; k < s.length; k += bloc) e.push(empreinte([s.subarray(k, k + bloc)]))
  return e
}
