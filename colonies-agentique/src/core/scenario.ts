// Scénario (05 §4.8) : validation, hachage du JSON canonique. Règles observables : UC-001 A1, A2, BR-002.
import { fnv1a64Texte } from './fingerprint.ts'

export type TimeUnit = 's' | 'min' | 'h' | 'cycle' | 'evaluation'
export type UpdateOrder = 'synchronous' | 'sequential-random' | 'sequential-fixed'
export type Regime = 'confirmatory' | 'exploratory'
export interface ParameterSource {
  value: number | string | boolean
  unit: string
  source: string                    // étiquette de bibliographie et emplacement
  status: 'published' | 'estimated' | 'to-confirm'
}
export interface Intervention { time: number; type: string; value: number | string }
export interface Scenario {
  schema: 1
  regime: Regime
  model: { id: string; version: string; article: string }
  time: { unit: TimeUnit; dt: number; horizon: number; sampling: number; eventTolerance?: number }
  order: UpdateOrder
  seed: string
  streams: readonly string[]
  parameters: Readonly<Record<string, ParameterSource>>
  initial: Readonly<Record<string, unknown>>
  measures: readonly string[]
  interventions: readonly Intervention[]
  preset?: { repetitions: number; replaySeed: string }
  displayTimeScale?: number
}
export interface CompiledScenario extends Scenario {
  constants: Readonly<Record<string, number>>
  hash: string
}

/** Refus de compilation ou d'exécution; le message est celui qu'affiche la CLI. */
export class ScenarioError extends Error {}

export const invalide = (champ: string, regle: string) => new ScenarioError(`Scénario invalide : ${champ} : ${regle}`)

const CHAMPS = ['schema', 'regime', 'model', 'time', 'order', 'seed', 'streams', 'parameters', 'initial', 'measures', 'interventions', 'preset', 'displayTimeScale']
const UNITES: readonly string[] = ['s', 'min', 'h', 'cycle', 'evaluation']
const ORDRES: readonly string[] = ['synchronous', 'sequential-random', 'sequential-fixed']
const STATUTS: readonly string[] = ['published', 'estimated', 'to-confirm']
const FLUX = /^(environment|agents|order|channel|policy|noise|measure|agents:[a-z][\w-]*)$/
const NOM = /^[A-Za-z_][\w.-]*$/            // nom de mesure : sert d'en-tête CSV sans guillemets
const GRAINE = /^(0|[1-9]\d*)$/

const estObjet = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x)
const chaine = (x: unknown) => typeof x === 'string' && x.length > 0
const positif = (x: unknown): x is number => typeof x === 'number' && Number.isFinite(x) && x > 0
const graineValide = (x: unknown) => typeof x === 'string' && GRAINE.test(x) && BigInt(x) < 1n << 64n
/** x est un multiple entier de dt, à l'arrondi près. */
export const multiple = (x: number, dt: number) => Math.abs(x / dt - Math.round(x / dt)) < 1e-9 * Math.max(1, x / dt)

/** JSON canonique : clés triées, nombres au format ECMAScript le plus court. */
export function jsonCanonique(x: unknown): string {
  if (Array.isArray(x)) return `[${x.map(jsonCanonique).join(',')}]`
  if (estObjet(x)) return `{${Object.keys(x).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).filter(k => x[k] !== undefined).map(k => `${JSON.stringify(k)}:${jsonCanonique(x[k])}`).join(',')}}`
  return JSON.stringify(x)
}

export function compileScenario(raw: unknown): CompiledScenario {
  if (!estObjet(raw)) throw invalide('(racine)', 'objet JSON attendu')
  for (const k of Object.keys(raw)) if (!CHAMPS.includes(k)) throw invalide(k, 'champ inconnu')
  if (raw.schema !== 1) throw invalide('schema', 'doit valoir 1')
  if (raw.regime !== 'confirmatory' && raw.regime !== 'exploratory') throw invalide('regime', '« confirmatory » ou « exploratory »')

  const m = raw.model
  if (!estObjet(m)) throw invalide('model', 'objet attendu')
  for (const k of ['id', 'version', 'article']) if (!chaine(m[k])) throw invalide(`model.${k}`, 'chaîne non vide requise')

  const t = raw.time
  if (!estObjet(t)) throw invalide('time', 'objet attendu')
  if (!UNITES.includes(t.unit as string)) throw invalide('time.unit', `parmi ${UNITES.join(', ')}`)
  if (!positif(t.dt)) throw invalide('time.dt', 'nombre > 0')
  if (!positif(t.horizon) || !multiple(t.horizon, t.dt)) throw invalide('time.horizon', 'nombre > 0, multiple de dt')
  if (!positif(t.sampling) || !multiple(t.sampling, t.dt) || t.sampling > t.horizon) throw invalide('time.sampling', 'nombre > 0, multiple de dt, au plus l\'horizon')
  if (t.eventTolerance !== undefined && !positif(t.eventTolerance)) throw invalide('time.eventTolerance', 'nombre > 0')

  if (!ORDRES.includes(raw.order as string)) throw invalide('order', `parmi ${ORDRES.join(', ')}`)
  if (!graineValide(raw.seed)) throw invalide('seed', 'entier décimal de 0 à 2^64 − 1, en chaîne')

  const flux = raw.streams
  if (!Array.isArray(flux)) throw invalide('streams', 'liste attendue')
  for (const f of flux) if (typeof f !== 'string' || !FLUX.test(f)) throw invalide('streams', `flux inconnu : ${String(f)}`)
  if (new Set(flux).size !== flux.length) throw invalide('streams', 'flux déclaré deux fois')

  const p = raw.parameters
  if (!estObjet(p)) throw invalide('parameters', 'objet attendu')
  for (const [nom, v] of Object.entries(p)) {
    if (!estObjet(v)) throw invalide(`parameters.${nom}`, 'objet attendu')
    const ok = (typeof v.value === 'number' && Number.isFinite(v.value)) || typeof v.value === 'string' || typeof v.value === 'boolean'
    if (!ok) throw invalide(`parameters.${nom}.value`, 'nombre fini, chaîne ou booléen')
    if (typeof v.unit !== 'string') throw invalide(`parameters.${nom}.unit`, 'chaîne requise')
    if (!chaine(v.source)) throw invalide(`parameters.${nom}.source`, 'étiquette et emplacement requis')
    if (!STATUTS.includes(v.status as string)) throw invalide(`parameters.${nom}.status`, `parmi ${STATUTS.join(', ')}`)
  }

  if (!estObjet(raw.initial)) throw invalide('initial', 'objet attendu')
  const mesures = raw.measures
  if (!Array.isArray(mesures) || mesures.length === 0) throw invalide('measures', 'liste non vide attendue')
  for (const x of mesures) if (typeof x !== 'string' || !NOM.test(x) || x === 't') throw invalide('measures', `nom invalide : ${String(x)}`)
  if (new Set(mesures).size !== mesures.length) throw invalide('measures', 'mesure déclarée deux fois')

  const iv = raw.interventions
  if (!Array.isArray(iv)) throw invalide('interventions', 'liste attendue')
  let precedent = 0
  for (const [k, i] of iv.entries()) {
    if (!estObjet(i) || typeof i.time !== 'number' || !chaine(i.type) || !(typeof i.value === 'number' || typeof i.value === 'string'))
      throw invalide(`interventions[${k}]`, '{ time, type, value } attendu')
    if (!(i.time >= precedent && i.time <= t.horizon)) throw invalide(`interventions[${k}].time`, 'triées par temps, dans l\'horizon')
    precedent = i.time
  }

  if (raw.preset !== undefined) {
    const pr = raw.preset
    if (!estObjet(pr) || !Number.isInteger(pr.repetitions) || (pr.repetitions as number) < 1 || !graineValide(pr.replaySeed))
      throw invalide('preset', '{ repetitions ≥ 1, replaySeed décimale } attendu')
  }
  if (raw.displayTimeScale !== undefined && !positif(raw.displayTimeScale)) throw invalide('displayTimeScale', 'nombre > 0')

  // Règle BR-002 (C-006) : vérifiée après la forme, pour que A1 prime sur A2.
  if (raw.regime === 'confirmatory')
    for (const [nom, v] of Object.entries(p))
      if ((v as ParameterSource).status === 'to-confirm') throw new ScenarioError(`Exécution confirmatoire refusée : paramètre à confirmer : ${nom}`)

  const scenario = raw as unknown as Scenario
  // ponytail: aucune constante dérivée tant qu'aucun modèle n'en demande (évaporation de grille, 05 §4.6).
  return { ...scenario, constants: {}, hash: fnv1a64Texte(jsonCanonique(scenario)) }
}

/** Retire les champs de sortie d'un scénario compilé, pour le recompiler (rejeu). */
export function source(c: Record<string, unknown>): Record<string, unknown> {
  const { constants: _c, hash: _h, ...reste } = c
  return reste
}
