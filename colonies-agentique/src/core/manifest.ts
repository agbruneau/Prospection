// Manifeste d'exécution (05 §4.9). Contrat de forme seulement; l'assemblage vit dans cli/ (horloge murale, git).
import { fnv1a64Texte } from './fingerprint.ts'
import type { CompiledScenario, Intervention, Regime, TimeUnit, UpdateOrder } from './scenario.ts'

/** Version du noyau : entre dans le manifeste et conditionne l'identité de rejeu (BR-007). */
export const CORE_VERSION = '0.1.0'

export interface Verdict {
  id: string
  outcome: 'satisfied' | 'unsatisfied' | 'inconclusive'
  provisional: boolean
  measured: number
  ci90?: readonly [number, number]
  mcStandardError: number
  n: number
  deviations: readonly string[]
}

export interface RunManifest {
  schema: 1
  runId: string
  regime: Regime
  model: { id: string; version: string; article: string; target?: string }
  code: { commit: string; cleanTree: boolean; coreVersion: string; node: string; typescript: string; dependencies: Record<string, string> }
  scenario: { hash: string; compiled: CompiledScenario }
  prng: { algorithm: 'xoshiro128**'; seeding: 'splitmix64'; masterSeed: string; streams: { name: string; initialState: string }[] }
  time: { unit: TimeUnit; dt: number; horizon: number; order: UpdateOrder; steps: number }
  interventions: readonly Intervention[]
  engine: { kind: 'node' | 'browser' | 'worker'; version: string; platform: string; arch: string }
  timestamps: { start: string; end: string; wallMs: number }
  outputs: { file: string; format: 'csv' | 'json'; sha256: string; rows: number; columns: { name: string; unit: string }[] }[]
  fingerprints: { time: number; fnv1a64: string }[]
  summary: Record<string, number>
  missing: { quantity: string; cause: string }[]
  verdict?: Verdict
  deviations: readonly string[]
  llmLog?: { path: string; sha256: string; calls: number }
  license: string
}

/** runId = empreinte de (hachage du scénario, graine, commit) : BR-003. */
export const runIdDe = (hash: string, seed: string, commit: string) => fnv1a64Texte(`${hash}|${seed}|${commit}`)

export class ManifesteInvalide extends Error {}

const REQUIS = [
  'schema', 'runId', 'regime', 'model.id', 'code.commit', 'code.coreVersion', 'scenario.hash', 'scenario.compiled',
  'prng.masterSeed', 'time.steps', 'engine.kind', 'engine.version', 'engine.platform', 'engine.arch', 'outputs', 'fingerprints',
]

/** Vérifie la présence des champs dont dépend le rejeu (UC-002 E1). */
export function validerManifeste(raw: unknown): RunManifest {
  for (const champ of REQUIS) {
    let v: unknown = raw
    for (const k of champ.split('.')) v = typeof v === 'object' && v !== null ? (v as Record<string, unknown>)[k] : undefined
    if (v === undefined || v === null) throw new ManifesteInvalide(`Manifeste invalide : ${champ}`)
  }
  const m = raw as RunManifest
  if (m.schema !== 1) throw new ManifesteInvalide('Manifeste invalide : schema')
  if (!Array.isArray(m.fingerprints) || m.fingerprints.length === 0) throw new ManifesteInvalide('Manifeste invalide : fingerprints')
  return m
}
