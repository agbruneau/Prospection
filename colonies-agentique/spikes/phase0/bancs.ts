// SPK10 : micro-bancs headless (médiane de 5) et durée estimée des balayages complets (charges de 05 §11).
// Les noyaux sont des gabarits de coût, pas les modèles publiés : ils comptent des opérations élémentaires du même type.
// Usage : node spikes/phase0/bancs.ts
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createStream } from '../../src/core/random.ts'
import { createDirectSsa } from '../../src/core/ssa.ts'
import { creerJouet } from './jouet.ts'

const ICI = path.dirname(fileURLToPath(import.meta.url))
const mediane = (v: number[]) => [...v].sort((a, b) => a - b)[Math.floor(v.length / 2)]!
/** Opérations par seconde, médiane de 5 essais de `f` (qui renvoie son nombre d'opérations). */
function debit(f: () => number): number {
  f()   // échauffement (compilation à la volée)
  return mediane(Array.from({ length: 5 }, () => { const t0 = performance.now(); const ops = f(); return ops / ((performance.now() - t0) / 1000) }))
}

// Treillis 3D de 200³ (type Khuong et al. 2016) : déplacements élémentaires vers l'un des 26 voisins, refusés si occupé.
function khuong(): number {
  const n = 200, grille = new Uint8Array(n * n * n), g = createStream(1n, 'agents'), agents = new Int32Array(500)
  const voisins: number[] = []
  for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) if (dx || dy || dz) voisins.push(dx * n * n + dy * n + dz)
  for (let i = 0; i < agents.length; i++) { agents[i] = (100 * n * n + 100 * n + 100) + i; grille[agents[i]!] = 1 }
  const moves = 2_000_000
  for (let k = 0; k < moves; k++) {
    const i = k % agents.length, cible = agents[i]! + voisins[g.int(26)]!
    if (cible > n * n && cible < n * n * (n - 1) && grille[cible] === 0) { grille[agents[i]!] = 0; grille[cible] = 1; agents[i] = cible }
  }
  return moves
}

// SSA direct sur M1c à N fini (8 réactions, N = 200, σ = 10), jusqu'à t = 40 : réactions par seconde.
function ssa(): number {
  const N = 200, x = new Int32Array([0, 0]), g = createStream(2n, 'agents')
  const s = createDirectSsa({
    nReactions: 8, nSpecies: 2, stoichiometry: new Int32Array([1, 0, 0, 1, -1, 0, 0, -1, 1, 0, 0, 1, -1, 0, 0, -1]),
    propensities(y, a) {
      const A = y[0]!, B = y[1]!, U = N - A - B
      a[0] = 3 * U; a[1] = 3 * U; a[2] = A / 3; a[3] = B / 3; a[4] = 3 * A * U / N; a[5] = 3 * B * U / N; a[6] = 10 * A * B / N; a[7] = 10 * A * B / N
    },
  }, g)
  let reactions = 0
  for (let r = 0; r < 20; r++) {
    x[0] = 0; x[1] = 0
    for (let t = 0; ;) { const e = s.step(x, t); if (e.reaction < 0 || e.t > 40) break; s.fire(x, e.reaction); t = e.t; reactions++ }
  }
  return reactions
}

// Voisinage en O(N²), 3D, N = 100 (type Couzin et al. 2002) : paires évaluées (distance et classement en trois zones).
function couzin(): number {
  const N = 100, p = new Float64Array(3 * N), g = createStream(3n, 'agents')
  for (let i = 0; i < 3 * N; i++) p[i] = g.uniform() * 50
  const zones = new Int32Array(3)
  const pas = 2000
  for (let k = 0; k < pas; k++)
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++) {
        const dx = p[3 * j]! - p[3 * i]!, dy = p[3 * j + 1]! - p[3 * i + 1]!, dz = p[3 * j + 2]! - p[3 * i + 2]!
        const d2 = dx * dx + dy * dy + dz * dz
        zones[d2 < 1 ? 0 : d2 < 36 ? 1 : 2]!++
      }
  return pas * N * N
}

// Grille de 480 × 270 (type Aswale et al. 2022) : évaporation linéaire de chaque cellule.
function grille(): number {
  const w = 480, h = 270, c = new Float64Array(w * h).fill(5), pas = 2000
  for (let k = 0; k < pas; k++) for (let i = 0; i < c.length; i++) { const v = c[i]! - 0.016; c[i] = v > 0 ? v : 0 }
  return pas * w * h
}
// ... et lectures bilinéaires de sondes (1 024 agents × 32 sondes par pas).
function sondes(): number {
  const w = 480, h = 270, c = new Float64Array(w * h), g = createStream(4n, 'agents')
  for (let i = 0; i < c.length; i++) c[i] = g.uniform()
  const lectures = 3_000_000
  let somme = 0
  for (let k = 0; k < lectures; k++) {
    const x = g.uniform() * (w - 1), y = g.uniform() * (h - 1), x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0, i = y0 * w + x0
    somme += c[i]! * (1 - fx) * (1 - fy) + c[i + 1]! * fx * (1 - fy) + c[i + w]! * (1 - fx) * fy + c[i + w + 1]! * fx * fy
  }
  return somme >= 0 ? lectures : 0
}

// Jouet de Vicsek (P9) : pas par seconde à N = 10⁴.
function vicsek(): number { const j = creerJouet(1e4, 5n); for (let k = 0; k < 50; k++) j.pas(); return 50 }

const coeurs = os.cpus().length, travailleurs = Math.max(1, coeurs - 1)
const debits = { khuong: debit(khuong), ssa: debit(ssa), couzin: debit(couzin), grille: debit(grille), sondes: debit(sondes), vicsek: debit(vicsek) }
// Charges de 05 §11. [I] : nombre de combinaisons quand la source ne le fixe pas (marqué « supposé »).
const h = (ops: number, par: number) => ops / par / 3600
const estimations = [
  { projet: 'P9', charge: 'Khuong et al. 2016 : 2,6×10¹¹ déplacements pour 96 h simulées, 10 simulations par durée de vie, 5 durées supposées', heures: h(2.6e11 * 10 * 5, debits.khuong * travailleurs) },
  { projet: 'P5', charge: 'SSA de M1c : N = 50 à 200, 200 runs par cellule, 20 cellules supposées (N × σ)', heures: h(debits.ssa > 0 ? (ssa() / 20) * 200 * 20 : 0, debits.ssa * travailleurs) },
  { projet: 'P6', charge: 'Couzin et al. 2002 : 1,5×10⁹ paires par combinaison, 100 combinaisons supposées', heures: h(1.5e9 * 100, debits.couzin * travailleurs) },
  { projet: 'P6', charge: 'Aswale et al. 2022 : 6,5×10⁹ mises à jour de grille et 1,6×10⁹ lectures par run, 20 runs par configuration, 10 configurations supposées', heures: h(6.5e9 * 200, debits.grille * travailleurs) + h(1.6e9 * 200, debits.sondes * travailleurs) },
  { projet: 'P9', charge: 'Vicsek et al. 1995 : N = 10⁴, 3 000 pas, 20 graines, 20 valeurs de η supposées', heures: h(3000 * 20 * 20, debits.vicsek * travailleurs) },
]
const resultat = { coeurs, travailleurs, debitsParSeconde: debits, estimations: estimations.map(e => ({ ...e, heures: Number(e.heures.toPrecision(3)), sousSeuil24h: e.heures <= 24 })) }
console.log(JSON.stringify(resultat, null, 2))
fs.mkdirSync(path.join(ICI, 'resultats'), { recursive: true })
fs.writeFileSync(path.join(ICI, 'resultats', 'bancs.json'), JSON.stringify(resultat, null, 2) + '\n')
