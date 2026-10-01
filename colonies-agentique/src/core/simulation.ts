// Contrat commun des modèles (05 §5). Vit dans le noyau parce que l'enregistreur l'exécute.
import type { Prng } from './random.ts'
import type { CompiledScenario, Intervention } from './scenario.ts'

/** Observation : valeur par mesure; null = non définie à cet instant (cellule vide, entrée `missing`). */
export type Observation = Readonly<Record<string, number | null>>

export interface Simulation<O = Observation> {
  advance(): void                   // un pas, un événement, une réaction ou un cycle, selon le modèle
  time(): number
  done(): boolean
  observe(): O                      // lecture sans effet de bord
  buffers(): readonly ArrayBufferView[]   // état complet, flux compris, pour l'empreinte
  apply(i: Intervention): void      // intervention datée (mode Explorer)
}
export interface StreamFactory { stream(name: string): Prng }
export interface ReferenceModel<O = Observation> {
  readonly id: string
  /** Unités des mesures que le modèle sait observer; une mesure absente d'ici est refusée. */
  readonly measureUnits: Readonly<Record<string, string>>
  /** Lève ScenarioError (« Scénario invalide : … ») si le scénario ne convient pas au modèle. */
  create(s: CompiledScenario, f: StreamFactory): Simulation<O>
}
