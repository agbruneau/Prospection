// UC-005 Aligner par docking : npm run dock -- <id>. Plan : docking/<id>.json; rapport : data/docking/<id>.report.json.
// Niveaux (BR-035) : implementations (oracle indépendant, écart ≤ 3 ES combinées), relational (sens d'une relation déclarée,
// IC à 95 % de la différence excluant 0), distributional (TOST apparié par graine à la marge déclarée).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { requiredNTost, requiredNTostMoyenne, valeurParExecution, Z_95, Z_975, type Seuil } from '../analysis/equivalence.ts'
import { fnv1a64Texte } from '../core/fingerprint.ts'
import { graineDeRepetition } from '../core/random.ts'
import { EtatInvalide, enregistrer } from '../core/recorder.ts'
import { compileScenario, jsonCanonique, ScenarioError } from '../core/scenario.ts'
import type { ReferenceModel } from '../core/simulation.ts'
import { MODELES, preparer } from '../models/index.ts'
import { gitCourant, moteurCourant, RACINE, type EtatGit } from './run.ts'

type Niveau = 'implementations' | 'relational' | 'distributional'
export interface PlanDocking {
  id: string
  level: Niveau
  candidate: { scenario: string }
  reference: { oracle?: string; field?: string; scenario?: string; relation?: string }   // field : observable d'une cellule d'oracle à plusieurs grandeurs
  cells: readonly { id: string; parameters: Readonly<Record<string, number>> }[]
  observable: { name: string; threshold?: Seuil | readonly Seuil[] }
  relations?: readonly { from: string; to: string; expected: 'increasing' | 'decreasing' }[]
  margin?: { delta: number; scale: 'points' | 'absolute' }
  planning?: { p?: number; sd?: number }   // n requis au niveau distributional (A2)
  repetitions: number
  masterSeed: string
}
interface Estimation { estimate: number; se: number; n: number }

export class DockingInvalide extends Error {}
const invalide = (champ: string, regle: string) => new DockingInvalide(`Plan de docking invalide : ${champ} : ${regle}`)

function valider(plan: PlanDocking, id: string, racine: string) {
  const lire = (f: string, champ: string) => { try { return JSON.parse(fs.readFileSync(path.join(racine, f), 'utf8')) as Record<string, any> } catch (e) { throw invalide(champ, `fichier illisible : ${(e as Error).message}`) } }
  if (plan.id !== id) throw invalide('id', `« ${String(plan.id)} » au lieu de « ${id} »`)
  if (!['implementations', 'relational', 'distributional'].includes(plan.level)) throw invalide('level', 'implementations, relational ou distributional')
  if (!Number.isInteger(plan.repetitions) || plan.repetitions < 1) throw invalide('repetitions', 'entier ≥ 1')
  if (!/^(0|[1-9]\d*)$/.test(plan.masterSeed ?? '')) throw invalide('masterSeed', 'entier décimal')
  if (!Array.isArray(plan.cells) || plan.cells.length === 0) throw invalide('cells', 'au moins une cellule')
  const candidat = lire(plan.candidate?.scenario, 'candidate.scenario')
  const ids = new Set(plan.cells.map(c => c.id))
  for (const c of plan.cells) for (const k of Object.keys(c.parameters)) if (!(k in (candidat.parameters ?? {}))) throw invalide(`cells.${c.id}`, `paramètre inconnu du scénario candidat : ${k}`)
  if (!(plan.observable?.name in (MODELES.get(candidat.model?.id)?.measureUnits ?? {}))) throw invalide('observable', `mesure inconnue du modèle candidat : ${plan.observable?.name}`)
  let oracle: Record<string, Estimation> | undefined, reference: Record<string, any> | undefined
  if (plan.level === 'implementations') {
    if (!plan.reference?.oracle) throw invalide('reference.oracle', 'oracle requis au niveau implementations')
    const cellules = lire(plan.reference.oracle, 'reference.oracle').cells as Record<string, any>
    oracle = Object.fromEntries(Object.entries(cellules ?? {}).map(([c, v]) => [c, (plan.reference.field ? v?.[plan.reference.field] : v) as Estimation]))
    for (const c of ids) if (!oracle?.[c]) throw invalide('reference.oracle', `cellule absente de l'oracle : ${c}`)
  }
  if (plan.level === 'relational') {
    if (!plan.relations?.length) throw invalide('relations', 'au moins une relation au niveau relational')
    for (const r of plan.relations) if (!ids.has(r.from) || !ids.has(r.to) || !['increasing', 'decreasing'].includes(r.expected)) throw invalide('relations', `relation invalide : ${JSON.stringify(r)}`)
  }
  if (plan.level === 'distributional') {
    if (!plan.margin) throw invalide('margin', 'requise au niveau distributional')
    if (!plan.reference?.scenario) throw invalide('reference.scenario', 'modèle de référence requis au niveau distributional')
    reference = lire(plan.reference.scenario, 'reference.scenario')
    if (plan.planning?.p === undefined && plan.planning?.sd === undefined) throw invalide('planning', 'p (proportion) ou sd attendu, pour le n requis')
  }
  return { candidat, oracle, reference }
}

/** Valeurs par exécution d'un modèle sur une cellule, graines de la graine maîtresse (BR-034). */
function executer(base: Record<string, any>, cellule: PlanDocking['cells'][number], plan: PlanDocking, modeles: ReadonlyMap<string, ReferenceModel>): number[] {
  const parametres = { ...base.parameters }
  for (const [k, v] of Object.entries(cellule.parameters)) parametres[k] = { ...parametres[k], value: v }
  const critere = { quantity: plan.observable.name, statistic: { measure: plan.observable.name, threshold: plan.observable.threshold }, test: 'equal' as const, value: 0 }
  return Array.from({ length: plan.repetitions }, (_, i) => {
    const s = compileScenario({ ...base, regime: 'exploratory', parameters: parametres, measures: [plan.observable.name], seed: graineDeRepetition(BigInt(plan.masterSeed), i) })
    const x = enregistrer(preparer(s, modeles).sim, s).colonnes[plan.observable.name]!.at(-1)
    if (x == null) throw new EtatInvalide(`observable sans valeur : ${plan.observable.name}, cellule ${cellule.id}`)
    return valeurParExecution(critere, x)
  })
}
const estimer = (v: readonly number[], proportion: boolean): Estimation => {
  const n = v.length, m = v.reduce((a, b) => a + b, 0) / n
  const sd = n > 1 ? Math.sqrt(v.reduce((a, x) => a + (x - m) ** 2, 0) / (n - 1)) : 0
  return { estimate: m, se: proportion ? Math.sqrt(m * (1 - m) / n) : sd / Math.sqrt(n), n }
}

export interface OptionsDocking { racine?: string; modeles?: ReadonlyMap<string, ReferenceModel>; git?: () => EtatGit; journal?: (l: string) => void }

/** Étapes 1 à 8; renvoie le code de sortie. */
export function aligner(id: string, options: OptionsDocking = {}): number {
  const { racine = RACINE, modeles = MODELES, git = gitCourant, journal = console.log } = options
  try {
    const sortie = path.join(racine, 'data', 'docking', `${id}.report.json`)
    let plan: PlanDocking
    try { plan = JSON.parse(fs.readFileSync(path.join(racine, 'docking', `${id}.json`), 'utf8')) as PlanDocking } catch (e) { throw invalide('(fichier)', (e as Error).message) }
    const { candidat, oracle, reference } = valider(plan, id, racine)
    if (fs.existsSync(sortie) && (JSON.parse(fs.readFileSync(sortie, 'utf8')) as { outcome?: string }).outcome === 'not-aligned')
      throw new DockingInvalide(`Docking refusé : ${id} a déjà un rapport not-aligned; une nouvelle tentative porte un nouvel identifiant (BR-036)`)
    const proportion = plan.observable.threshold !== undefined
    const marge = plan.margin ? (plan.margin.scale === 'points' ? plan.margin.delta / 100 : plan.margin.delta) : undefined
    journal(`Docking ${id} : candidat ${plan.candidate.scenario}, référence ${plan.reference.oracle ?? plan.reference.scenario ?? plan.reference.relation ?? '—'}, niveau ${plan.level}${marge !== undefined ? `, marge ±${plan.margin!.delta} ${plan.margin!.scale}` : ''}`)
    if (plan.level === 'distributional') {   // A2
      const requis = plan.planning!.p !== undefined ? requiredNTost(plan.planning!.p, marge!) : requiredNTostMoyenne(plan.planning!.sd!, marge!)
      if (plan.repetitions < requis) {
        journal(`Plan refusé : n prévu = ${plan.repetitions}, n requis = ${requis} pour la marge ${marge}`)
        return 1
      }
    }

    // Étapes 3 et 4
    const runs = new Map(plan.cells.map(c => [c.id, executer(candidat, c, plan, modeles)]))
    const cand = new Map([...runs].map(([c, v]) => [c, estimer(v, proportion)]))
    const refRuns = reference ? new Map(plan.cells.map(c => [c.id, executer(reference, c, plan, modeles)])) : undefined
    const ref = oracle ? new Map(Object.entries(oracle)) : refRuns ? new Map([...refRuns].map(([c, v]) => [c, estimer(v, proportion)])) : undefined

    // Étape 5 (BR-035)
    const fmt = (x: number) => Number(x.toPrecision(4))
    let decisions: { sujet: string; ecart: number; critere: string; aligne: boolean }[]
    if (plan.level === 'implementations')
      decisions = plan.cells.map(c => {
        const a = cand.get(c.id)!, b = ref!.get(c.id)!, ecart = a.estimate - b.estimate, tol = 3 * Math.hypot(a.se, b.se)
        return { sujet: c.id, ecart, critere: `|écart| ≤ 3 ES combinées (${fmt(tol)})`, aligne: Math.abs(ecart) <= tol }
      })
    else if (plan.level === 'relational')
      decisions = plan.relations!.map(r => {
        const a = cand.get(r.from)!, b = cand.get(r.to)!, d = b.estimate - a.estimate, h = Z_975 * Math.hypot(a.se, b.se)
        const aligne = r.expected === 'increasing' ? d - h > 0 : d + h < 0
        return { sujet: `${r.from} → ${r.to} (${r.expected === 'increasing' ? 'croît' : 'décroît'})`, ecart: d, critere: `IC à 95 % [${fmt(d - h)} ; ${fmt(d + h)}] excluant 0 du bon côté`, aligne }
      })
    else
      decisions = plan.cells.map(c => {
        const d = runs.get(c.id)!.map((x, i) => x - refRuns!.get(c.id)![i]!), e = estimer(d, false), h = Z_95 * e.se
        return { sujet: c.id, ecart: e.estimate, critere: `IC à 90 % [${fmt(e.estimate - h)} ; ${fmt(e.estimate + h)}] dans ±${marge}`, aligne: e.estimate - h > -marge! && e.estimate + h < marge! }
      })
    const outcome = decisions.every(d => d.aligne) ? 'aligned' : 'not-aligned'

    // Étape 6
    const hachage = (f: string) => fnv1a64Texte(jsonCanonique(JSON.parse(fs.readFileSync(path.join(racine, f), 'utf8'))))
    fs.mkdirSync(path.dirname(sortie), { recursive: true })
    fs.writeFileSync(sortie, JSON.stringify({
      schema: 1, plan, scenarios: Object.fromEntries([plan.candidate.scenario, plan.reference.scenario].filter((x): x is string => !!x).map(f => [f, hachage(f)])),
      seeds: { master: plan.masterSeed, repetitions: plan.repetitions, pairing: 'by-repetition' },
      cells: plan.cells.map(c => ({ id: c.id, candidate: cand.get(c.id), reference: ref?.get(c.id) ?? null })),
      decisions, outcome, code: git(), engine: moteurCourant(),
    }, null, 2) + '\n')

    // Étapes 7 et 8, A3
    for (const d of decisions) journal(`  ${d.sujet} : écart ${fmt(d.ecart)}, ${d.critere} : ${d.aligne ? 'aligné' : 'non aligné'}`)
    if (outcome === 'not-aligned') {
      journal(`Docking non aligné : ${decisions.filter(d => !d.aligne).map(d => d.sujet).join(', ')}`)
      return 1
    }
    journal('Issue : aligned')
    return 0
  } catch (e) {
    if (!(e instanceof DockingInvalide || e instanceof ScenarioError || e instanceof EtatInvalide)) throw e
    journal(e.message)
    return 1
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  if (args.length !== 1) {
    console.error('Usage : npm run dock -- <id>')
    process.exit(2)
  }
  process.exit(aligner(args[0]!))
}
