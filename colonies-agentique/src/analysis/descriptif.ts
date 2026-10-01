// Statistiques descriptives partagées par les résumés (UC-006) et les pages : une seule implantation (05 §14).
import type { Verdict } from '../core/manifest.ts'

export const moyenne = (v: readonly number[]) => v.reduce((a, b) => a + b, 0) / v.length

/** Quantile empirique par interpolation linéaire (type 7 de Hyndman et Fan). */
export function quantile(v: readonly number[], q: number): number {
  const s = [...v].sort((a, b) => a - b)
  if (s.length === 0) return NaN
  const h = (s.length - 1) * q, b = Math.floor(h)
  return s[b]! + (h - b) * ((s[b + 1] ?? s[b]!) - s[b]!)
}

export const mediane = (v: readonly number[]) => quantile(v, 0.5)

export function erreurType(v: readonly number[]): number {
  if (v.length < 2) return 0
  const m = moyenne(v)
  return Math.sqrt(v.reduce((a, x) => a + (x - m) ** 2, 0) / (v.length - 1) / v.length)
}

/** Intervalle à 95 % des valeurs (percentiles 2,5 et 97,5) : dispersion des exécutions, pas IC de la moyenne. */
export const intervalle95 = (v: readonly number[]): [number, number] => [quantile(v, 0.025), quantile(v, 0.975)]

/** Rang de la valeur la plus proche de la médiane; le plus petit rang en cas d'égalité (UC-006, BR-027). */
export function rangTypique(v: readonly number[]): number {
  const m = mediane(v)
  let meilleur = 0
  for (let i = 1; i < v.length; i++) if (Math.abs(v[i]! - m) < Math.abs(v[meilleur]! - m)) meilleur = i
  return meilleur
}

/** Résumé d'une cible (UC-006; 05 §8.3; entité PageSummary) : écrit par cli/summarize.ts, lu par les pages. */
export interface Cellule {
  scenario: string
  scenarioHash: string
  source: Record<string, unknown>   // scénario de base, pour rejouer
  params: Record<string, number | string | boolean>
  n: number
  mean: number
  se: number
  interval95: [number, number]
  values: (number | null)[]        // une valeur par répétition, à son rang; null : répétition sans valeur (BR-029)
  missing: number                   // répétitions sans valeur, comptées dans N
  replay: { rep: number; seed: string; fnv1a64: string }
}
export interface PageSummary {
  schema: 1
  target: string
  targetHash: string
  regime: 'confirmatory' | 'exploratory'
  state: 'blocked' | 'provisional' | 'frozen'
  verdict: Verdict
  level: string
  margin?: { delta: number; scale: string }
  blockedReason?: string
  provenance: { commit: string; engine: { kind: string; version: string; platform: string; arch: string }; coreVersion: string; masterSeed: string }
  preregisteredN: number
  measure: string
  toConfirm: readonly string[]      // paramètres au statut to-confirm dans les scénarios (BR-026)
  cells: Cellule[]
}
