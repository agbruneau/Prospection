// Enregistreur (05 §4.7) : exécute une simulation jusqu'à l'horizon, échantillonne, prend les empreintes d'état.
import { empreinte } from './fingerprint.ts'
import { invalide, type CompiledScenario } from './scenario.ts'
import type { Simulation } from './simulation.ts'

/** État non numérique (UC-001 E1); le message est celui qu'affiche la CLI. */
export class EtatInvalide extends Error {}

export interface Enregistrement {
  steps: number
  t: number[]
  colonnes: Record<string, (number | null)[]>
  fingerprints: { time: number; fnv1a64: string }[]
  missing: { quantity: string; cause: string }[]
  summary: Record<string, number>
}

function verifierEtat(tampons: readonly ArrayBufferView[], pas: number): void {
  for (const [i, b] of tampons.entries())
    if (b instanceof Float64Array || b instanceof Float32Array) {
      const j = b.findIndex(Number.isNaN)
      if (j >= 0) throw new EtatInvalide(`État invalide au pas ${pas} : tampon ${i}[${j}]`)
    }
}

// ponytail: un advance() = un pas dt (modèles à pas fixe). Les modèles à temps continu (SSA, DES) demanderont
// l'échantillonnage « dernier état avant l'instant » par le temps (05 §4.2), à ajouter avec le premier d'entre eux.
export function enregistrer(sim: Simulation, s: CompiledScenario): Enregistrement {
  const parEchantillon = Math.round(s.time.sampling / s.time.dt)
  const tolerance = s.time.dt * 1e-9
  const e: Enregistrement = { steps: 0, t: [], colonnes: Object.fromEntries(s.measures.map(m => [m, []])), fingerprints: [], missing: [], summary: {} }
  const manquants = new Map<string, { n: number; premier: number }>()

  const echantillonner = () => {
    verifierEtat(sim.buffers(), e.steps)
    const obs = sim.observe(), t = sim.time()
    e.t.push(t)
    for (const m of s.measures) {
      const v = obs[m]
      if (v === undefined) throw invalide('measures', `mesure non observée par le modèle : ${m}`)
      const fini = v !== null && Number.isFinite(v)
      e.colonnes[m]!.push(fini ? v : null)
      if (!fini) manquants.set(m, { n: (manquants.get(m)?.n ?? 0) + 1, premier: manquants.get(m)?.premier ?? t })
    }
    e.fingerprints.push({ time: t, fnv1a64: empreinte(sim.buffers()) })
  }

  let k = 0
  echantillonner()
  while (!sim.done()) {
    while (k < s.interventions.length && s.interventions[k]!.time <= sim.time() + tolerance) sim.apply(s.interventions[k++]!)
    sim.advance()
    e.steps++
    if (e.steps % parEchantillon === 0 || sim.done()) echantillonner()
  }

  for (const [m, { n, premier }] of manquants) e.missing.push({ quantity: m, cause: `valeur non définie ou non finie à ${n} instant(s), premier à t = ${premier}` })
  for (const m of s.measures) {
    const v = e.colonnes[m]!.findLast(x => x !== null)
    if (v != null) e.summary[`${m}.final`] = v
  }
  return e
}

/** Séries CSV (05 §8.1) : en-tête `t,<mesures>`, LF, cellule vide pour une valeur manquante. */
export function serieCsv(e: Enregistrement, mesures: readonly string[]): string {
  const lignes = [['t', ...mesures].join(',')]
  for (const [i, t] of e.t.entries()) lignes.push([String(t), ...mesures.map(m => { const v = e.colonnes[m]![i]; return v == null ? '' : String(v) })].join(','))
  return lignes.join('\n') + '\n'
}
