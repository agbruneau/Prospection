// Worker de simulation des pages (D2 : créé depuis une URL blob:). Tout calcul passe par le noyau et les modèles.
import { CORE_VERSION } from '../core/manifest.ts'
import { enregistrer } from '../core/recorder.ts'
import { compileScenario, type Intervention } from '../core/scenario.ts'
import { preparer } from '../models/index.ts'

export interface Demande {
  id: number
  scenario: Record<string, unknown>
  graines: readonly string[]
  interventions: readonly Intervention[]
  echantillonnage?: number          // intervalle d'échantillonnage pour l'animation (ne change pas la dynamique)
  mesures: readonly string[]        // mesures dont on veut la série (première graine) et la valeur finale (toutes)
}
export interface Execution {
  graine: string
  scenarioHash: string
  interventions: readonly Intervention[]
  t: number[]
  series: Record<string, (number | null)[]>
  finales: Record<string, number | null>
  empreinte: string
  pas: number
}

interface Portee { postMessage(m: unknown): void; onmessage: ((e: MessageEvent<Demande>) => void) | null }
const portee = self as unknown as Portee

function executer(d: Demande, graine: string): Execution {
  const brut = { ...d.scenario, seed: graine, regime: 'exploratory', interventions: d.interventions, measures: d.mesures } as Record<string, unknown>
  if (d.echantillonnage) brut.time = { ...(d.scenario.time as object), sampling: d.echantillonnage }
  const compile = compileScenario(brut)
  const e = enregistrer(preparer(compile).sim, compile)
  return {
    graine, scenarioHash: compile.hash, interventions: compile.interventions, t: e.t, series: e.colonnes, pas: e.steps,
    finales: Object.fromEntries(d.mesures.map(m => [m, e.colonnes[m]!.at(-1) ?? null])), empreinte: e.fingerprints.at(-1)!.fnv1a64,
  }
}

portee.onmessage = ({ data: d }) => {
  try {
    for (const [i, g] of d.graines.entries()) portee.postMessage({ id: d.id, i, execution: executer(d, g), coreVersion: CORE_VERSION })
    portee.postMessage({ id: d.id, fin: true })
  } catch (e) {
    portee.postMessage({ id: d.id, erreur: (e as Error).message })
  }
}
