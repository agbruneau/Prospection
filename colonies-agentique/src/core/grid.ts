// Grille 2D sur tampon typé (05 §4.6) : évaporation par facteur constant (calculé une fois, écrit en littéral au scénario
// compilé), remise à zéro sous un seuil, évaporation paresseuse équivalente, diffusion FTCS refusée si r > 1/4, dépôt et lecture
// bilinéaires, double tampon. ponytail: bords périodiques (tore) seulement; murs réfléchissants quand un modèle l'exigera.
import { invalide } from './scenario.ts'

/** Facteur d'évaporation par pas, exp(−ln 2 · dt / t½). À calculer sous Node et à écrire au scénario compilé (05 §4.8). */
export const facteurEvaporation = (dt: number, tDemi: number) => Math.exp(-Math.LN2 * dt / tDemi)
/** Nombre de diffusion r = DΔt/Δx²; le schéma explicite 2D exige r ≤ 1/4. */
export const nombreDeDiffusion = (D: number, dt: number, dx: number) => D * dt / dx ** 2

export interface OptionsGrille {
  nx: number
  ny: number
  facteur: number                   // facteur d'évaporation par pas (1 : aucune)
  seuil: number                     // valeur remise à zéro sous ce seuil
  r?: number                        // nombre de diffusion; absent : aucune diffusion
  paresseuse?: boolean              // évaporation à la lecture (horodatage par cellule), sans diffusion
}

export function createGrille(o: OptionsGrille) {
  if (!(Number.isInteger(o.nx) && Number.isInteger(o.ny) && o.nx > 0 && o.ny > 0)) throw invalide('grille', 'dimensions entières > 0')
  if (!(o.facteur > 0 && o.facteur <= 1)) throw invalide('grille.facteur', 'dans ]0, 1]')
  if (o.r !== undefined && !(o.r >= 0 && o.r <= 0.25)) throw invalide('grille.r', `diffusion explicite instable : r = ${o.r} > 1/4`)
  if (o.paresseuse && o.r) throw invalide('grille.paresseuse', 'incompatible avec la diffusion')
  const { nx, ny, facteur, seuil } = o
  let v = new Float64Array(nx * ny), w = new Float64Array(nx * ny)
  const stamp = o.paresseuse ? new Int32Array(nx * ny) : undefined
  let pas = 0
  const idx = (i: number, j: number) => ((j % ny + ny) % ny) * nx + ((i % nx + nx) % nx)
  const aJour = (k: number) => {   // paresseuse : mêmes multiplications que la version immédiate, donc mêmes arrondis
    if (!stamp) return
    let x = v[k]!
    for (let s = stamp[k]!; s < pas && x !== 0; s++) { x *= facteur; if (x < seuil) x = 0 }
    v[k] = x; stamp[k] = pas
  }
  const cellule = (i: number, j: number) => { const k = idx(i, j); aJour(k); return v[k]! }
  const ajouter = (i: number, j: number, q: number) => { const k = idx(i, j); aJour(k); v[k] = v[k]! + q }
  return {
    nx, ny,
    cellule,
    /** Dépôt bilinéaire d'une quantité q à la position (x, y), en unités de cellule (centre de la cellule (0, 0) en (0, 0)). */
    deposer(x: number, y: number, q: number) {
      const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j
      ajouter(i, j, q * (1 - fx) * (1 - fy)); ajouter(i + 1, j, q * fx * (1 - fy)); ajouter(i, j + 1, q * (1 - fx) * fy); ajouter(i + 1, j + 1, q * fx * fy)
    },
    /** Lecture bilinéaire à la position (x, y). */
    lire(x: number, y: number) {
      const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j
      return cellule(i, j) * (1 - fx) * (1 - fy) + cellule(i + 1, j) * fx * (1 - fy) + cellule(i, j + 1) * (1 - fx) * fy + cellule(i + 1, j + 1) * fx * fy
    },
    /** Un pas : diffusion FTCS (double tampon), puis évaporation et seuil. */
    avancer() {
      pas++
      if (stamp) return
      if (o.r) {
        const r = o.r
        for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
          const k = j * nx + i
          w[k] = v[k]! + r * (v[idx(i + 1, j)]! + v[idx(i - 1, j)]! + v[idx(i, j + 1)]! + v[idx(i, j - 1)]! - 4 * v[k]!)
        }
        const t = v; v = w; w = t
      }
      for (let k = 0; k < v.length; k++) { let x = v[k]! * facteur; if (x < seuil) x = 0; v[k] = x }
    },
    /** Tampons pour l'empreinte d'état (horodatages compris en mode paresseux). */
    buffers: (): ArrayBufferView[] => (stamp ? [v, stamp] : [v]),
  }
}

/** Décalages de voisinage : von Neumann (4 ou 6) ou Moore (8 ou 26), en 2D ou en 3D. */
export function voisinage(type: 'moore' | 'von-neumann', dimensions: 2 | 3): readonly (readonly number[])[] {
  const d: number[][] = []
  const plage = dimensions === 3 ? [-1, 0, 1] : [0]
  for (const z of plage) for (const y of [-1, 0, 1]) for (const x of [-1, 0, 1]) {
    const non0 = [x, y, z].filter(c => c !== 0).length
    if (non0 === 0 || (type === 'von-neumann' && non0 > 1)) continue
    d.push(dimensions === 3 ? [x, y, z] : [x, y])
  }
  return d
}
