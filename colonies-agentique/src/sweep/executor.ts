// UC-004 Balayer des paramètres (05 §10, §8.2). Tâches (point, répétition) indépendantes, exécutées en ligne ou par
// worker_threads; le fil principal range les résultats par (point, répétition) avant d'écrire (BR-030).
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { Worker } from 'node:worker_threads'
import { icMoyenne } from '../analysis/bootstrap.ts'
import { erreurType, moyenne } from '../analysis/descriptif.ts'
import { fnv1a64Texte } from '../core/fingerprint.ts'
import { createStream, graineDeCellule, graineDeRepetition } from '../core/random.ts'
import { EtatInvalide, enregistrer } from '../core/recorder.ts'
import { compileScenario, jsonCanonique, ScenarioError } from '../core/scenario.ts'
import type { ReferenceModel } from '../core/simulation.ts'
import { MODELES, preparer } from '../models/index.ts'

export interface Observable { name: string; window?: readonly [number, number] }
export interface PlanBalayage {
  base: string                      // chemin du scénario de base, relatif à la racine
  axes: readonly { parameter: string; values: readonly number[] }[]
  repetitions: number
  observables: readonly Observable[]
  masterSeed: string
  pairing: 'by-repetition' | 'by-cell'
  carryState?: boolean
}
export interface Tache { point: number; rep: number; seed: string; scenario: Record<string, unknown> }
export interface Resultat { point: number; rep: number; valeurs: (number | null)[]; cause?: string }

export class PlanInvalide extends Error {}
const invalide = (champ: string, regle: string) => new PlanInvalide(`Plan invalide : ${champ} : ${regle}`)

/** Valide le plan (A1) et forme les tâches, dans l'ordre (point, répétition); chaque point est compilé et créé une fois. */
export function former(plan: PlanBalayage, racine: string, modeles: ReadonlyMap<string, ReferenceModel> = MODELES): { taches: Tache[]; points: number[][]; hashBase: string } {
  if (typeof plan.base !== 'string') throw invalide('base', 'chemin du scénario de base requis')
  let base: Record<string, any>
  try { base = JSON.parse(fs.readFileSync(path.join(racine, plan.base), 'utf8')) } catch (e) { throw invalide('base', `fichier illisible : ${(e as Error).message}`) }
  if (plan.carryState) throw invalide('carryState', 'hystérésis non prise en charge (UC-004, point de revue 3)')
  if (!Array.isArray(plan.axes) || plan.axes.length === 0) throw invalide('axes', 'au moins un axe')
  for (const [k, a] of plan.axes.entries()) {
    if (!(a.parameter in (base.parameters ?? {}))) throw invalide(`axes[${k}].parameter`, `paramètre inconnu du scénario : ${a.parameter}`)
    if (!Array.isArray(a.values) || a.values.length === 0 || !a.values.every((v: unknown) => typeof v === 'number' && Number.isFinite(v))) throw invalide(`axes[${k}].values`, 'liste non vide de nombres')
  }
  if (!Number.isInteger(plan.repetitions) || plan.repetitions < 1) throw invalide('repetitions', 'entier ≥ 1')
  if (!/^(0|[1-9]\d*)$/.test(plan.masterSeed ?? '') || BigInt(plan.masterSeed) >= 1n << 64n) throw invalide('masterSeed', 'entier décimal de 0 à 2^64 − 1')
  if (!['by-repetition', 'by-cell'].includes(plan.pairing)) throw invalide('pairing', 'by-repetition ou by-cell')
  const unites = modeles.get(base.model?.id)?.measureUnits ?? {}
  if (!Array.isArray(plan.observables) || plan.observables.length === 0) throw invalide('observables', 'au moins une observable')
  for (const [k, o] of plan.observables.entries()) {
    if (!(o.name in unites)) throw invalide(`observables[${k}].name`, `mesure inconnue du modèle : ${o.name}`)
    if (o.window && !(o.window.length === 2 && o.window[0] <= o.window[1])) throw invalide(`observables[${k}].window`, '[début, fin] avec début ≤ fin')
  }
  // Produit cartésien, dernier axe le plus rapide.
  const points: number[][] = plan.axes.reduce<number[][]>((acc, a) => acc.flatMap(p => a.values.map((v: number) => [...p, v])), [[]])
  const master = BigInt(plan.masterSeed)
  const mesures = [...new Set(plan.observables.map(o => o.name))]
  const scenarios = points.map((valeurs, p) => {
    const parametres = { ...base.parameters }
    plan.axes.forEach((a, k) => { parametres[a.parameter] = { ...parametres[a.parameter], value: valeurs[k] } })
    const s = { ...base, regime: 'exploratory', parameters: parametres, measures: mesures }   // BR-032
    try { preparer(compileScenario({ ...s, seed: '1' }), modeles) } catch (e) {
      if (e instanceof ScenarioError) throw invalide(`point ${p} (${valeurs.join(', ')})`, e.message)
      throw e
    }
    return s
  })
  const taches = scenarios.flatMap((s, point) => Array.from({ length: plan.repetitions }, (_, rep) => {
    const seed = plan.pairing === 'by-repetition' ? graineDeRepetition(master, rep) : graineDeCellule(master, point, rep)   // BR-031
    return { point, rep, seed, scenario: { ...s, seed } }
  }))
  return { taches, points, hashBase: fnv1a64Texte(jsonCanonique({ plan, base })) }
}

/** Exécute une tâche (UC-001) et en tire les observables : valeur finale, ou moyenne sur la fenêtre déclarée. */
export function executerTache(t: Tache, observables: readonly Observable[], modeles: ReadonlyMap<string, ReferenceModel> = MODELES): Resultat {
  try {
    const s = compileScenario(t.scenario)
    const e = enregistrer(preparer(s, modeles).sim, s)
    const valeurs = observables.map(o => {
      const serie = e.colonnes[o.name]!
      if (!o.window) return serie.at(-1) ?? null
      const dedans = serie.filter((v, i) => e.t[i]! >= o.window![0] && e.t[i]! <= o.window![1])
      return dedans.length === 0 || dedans.some(v => v === null) ? null : moyenne(dedans as number[])
    })
    const absentes = observables.filter((_, i) => valeurs[i] === null).map(o => o.name)
    return { point: t.point, rep: t.rep, valeurs, ...(absentes.length ? { cause: `valeur absente : ${absentes.join(', ')}` } : {}) }
  } catch (e) {
    if (!(e instanceof EtatInvalide)) throw e
    return { point: t.point, rep: t.rep, valeurs: observables.map(() => null), cause: e.message }   // A3
  }
}

/** Exécute les tâches avec k travailleurs (k = 1 : en ligne); l'ordre d'arrivée n'importe pas, le rang est la clé. */
export async function executerTaches(taches: readonly Tache[], observables: readonly Observable[], k: number, modeles: ReadonlyMap<string, ReferenceModel> = MODELES): Promise<Resultat[]> {
  if (k <= 1 || taches.length < 2) return taches.map(t => executerTache(t, observables, modeles))
  if (modeles !== MODELES) throw new Error('un registre de modèles particulier ne passe pas aux travailleurs : k = 1')
  const lots = Array.from({ length: k }, (_, w) => taches.filter((_, i) => i % k === w)).filter(l => l.length)
  const parties = await Promise.all(lots.map(lot => new Promise<Resultat[]>((ok, ko) => {
    const w = new Worker(new URL('./worker.ts', import.meta.url), { workerData: { taches: lot, observables } })
    w.once('message', ok); w.once('error', ko)
  })))
  return parties.flat()
}

const cle = (r: { point: number; rep: number }) => `${r.point}/${r.rep}`
const cellule = (x: number | null | undefined) => (x == null ? '' : String(x))
const sha256 = (s: string) => createHash('sha256').update(s).digest('hex')

/** Écrit results.csv, summary.csv et sweep-manifest.json, triés par (point, répétition) (étape 5, BR-030, BR-033). */
export function ecrire(dossier: string, plan: PlanBalayage, formes: ReturnType<typeof former>, resultats: readonly Resultat[], meta: Record<string, unknown>) {
  const { taches, points, hashBase } = formes
  const parCle = new Map(resultats.map(r => [cle(r), r]))
  const params = plan.axes.map(a => a.parameter), noms = plan.observables.map(o => o.window ? `${o.name}[${o.window[0]};${o.window[1]}]` : o.name)
  const lignes = [['point', 'rep', 'seed', ...params, ...noms].join(',')]
  for (const t of taches) lignes.push([t.point, t.rep, t.seed, ...points[t.point]!, ...parCle.get(cle(t))!.valeurs.map(cellule)].join(','))
  const results = lignes.join('\n') + '\n'
  const resume = [['point', ...params, 'observable', 'n', 'mean', 'sd', 'se', 'ci95_low', 'ci95_high'].join(',')]
  points.forEach((valeurs, p) => noms.forEach((nom, j) => {
    const v = taches.filter(t => t.point === p).map(t => parCle.get(cle(t))!.valeurs[j]).filter((x): x is number => x != null)
    const sd = erreurType(v) * Math.sqrt(v.length)
    const ic = v.length ? icMoyenne(v, createStream(BigInt(plan.masterSeed), `bootstrap/${p}/${nom}`)) : [NaN, NaN]
    resume.push([p, ...valeurs, nom, v.length, cellule(v.length ? moyenne(v) : null), cellule(v.length ? sd : null), cellule(v.length ? erreurType(v) : null), cellule(Number.isFinite(ic[0]!) ? ic[0] : null), cellule(Number.isFinite(ic[1]!) ? ic[1] : null)].join(','))
  }))
  const summary = resume.join('\n') + '\n'
  const missing = taches.map(t => parCle.get(cle(t))!).filter(r => r.cause).map(r => ({ point: r.point, rep: r.rep, cause: r.cause! }))
  fs.mkdirSync(dossier, { recursive: true })
  fs.writeFileSync(path.join(dossier, 'results.csv'), results)
  fs.writeFileSync(path.join(dossier, 'summary.csv'), summary)
  fs.writeFileSync(path.join(dossier, 'sweep-manifest.json'), JSON.stringify({
    schema: 1, plan, planHash: hashBase, points: points.length, runs: taches.length, ...meta, missing,
    files: { 'results.csv': sha256(results), 'summary.csv': sha256(summary) },
  }, null, 2) + '\n')
  return { missing }
}

/** Lignes déjà présentes d'un balayage interrompu, si le plan n'a pas changé (A2). */
export function dejaFaits(dossier: string, hashBase: string, nObservables: number): Resultat[] {
  const m = path.join(dossier, 'sweep-manifest.json'), r = path.join(dossier, 'results.csv')
  if (!fs.existsSync(m) || !fs.existsSync(r)) return []
  const precedent = JSON.parse(fs.readFileSync(m, 'utf8')) as { planHash?: string; missing?: { point: number; rep: number; cause: string }[] }
  if (precedent.planHash !== hashBase) return []
  const causes = new Map((precedent.missing ?? []).map(x => [cle(x), x.cause]))
  return fs.readFileSync(r, 'utf8').trim().split('\n').slice(1).map(l => {
    const c = l.split(','), v = c.slice(c.length - nObservables).map(x => (x === '' ? null : Number(x)))
    const r0 = { point: Number(c[0]), rep: Number(c[1]), valeurs: v }, cause = causes.get(cle(r0))
    return cause ? { ...r0, cause } : r0
  })
}
