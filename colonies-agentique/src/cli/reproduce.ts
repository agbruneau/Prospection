// UC-003 Vérifier une cible de reproduction : npm run reproduce -- <T<k>.<n> | P<k> | S0>
// Cible : targets/<projet>/<id>.json (05 §9.2). Résultats, dans data/results/<projet>/ : <id>.verdict.json et <id>.runs.csv
// (versionnés), <id>/<scénario>-rep-<i>.manifest.json (régénérables depuis scénario et graine, hors git).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { conjonction, decider, margeAbsolue, nRequis, valeurParExecution, type Criterion, type Decision, type Marge } from '../analysis/equivalence.ts'
import { fnv1a64Texte } from '../core/fingerprint.ts'
import { CORE_VERSION, type RunManifest, type Verdict } from '../core/manifest.ts'
import { graineDeRepetition } from '../core/random.ts'
import { EtatInvalide } from '../core/recorder.ts'
import { compileScenario, jsonCanonique, ScenarioError } from '../core/scenario.ts'
import type { ReferenceModel } from '../core/simulation.ts'
import { MODELES } from '../models/index.ts'
import { executerCompile, gitCourant, moteurCourant, RACINE, type EtatGit } from './run.ts'

export type Reading = 'T' | 'T*' | 'R' | 'M' | 'S' | 'I'
export interface ReproductionTarget {
  id: string                        // T<k>.<n>
  project: string                   // P<k> ou S0
  state: 'blocked' | 'provisional' | 'frozen'
  frozenAt?: string
  blockedReason?: string
  source: string
  location: string
  level: 'identity' | 'relational' | 'distributional'
  margin?: Marge                    // marge de la cible, héritée par les critères qui n'en déclarent pas
  repetitions: number
  maxRepetitions?: number
  seeds: { master: string; pairing: 'by-repetition' | 'by-cell' }
  rule: string
  gates: readonly string[]
  reading: Readonly<Record<'equations' | 'parameters' | 'protocol' | 'figure' | 'dispersion', Reading>>
  scenario?: string                 // chemin du scénario de base, relatif à la racine; requis sauf cible bloquée
  criteria?: readonly Criterion[]   // conjonctifs (BR-012); requis sauf cible bloquée
  deviations?: readonly string[]    // D-<projet>-<nnn> (BR-011)
}

export class CibleInvalide extends Error {}
const invalide = (champ: string, regle: string) => new CibleInvalide(`Cible invalide : ${champ} : ${regle}`)

export function validerCible(raw: unknown, id: string, projet: string): ReproductionTarget {
  const c = raw as ReproductionTarget
  if (typeof raw !== 'object' || raw === null) throw invalide('(racine)', 'objet JSON attendu')
  if (c.id !== id) throw invalide('id', `« ${String(c.id)} » au lieu de « ${id} »`)
  if (c.project !== projet) throw invalide('project', `« ${String(c.project)} » au lieu de « ${projet} »`)
  if (!['blocked', 'provisional', 'frozen'].includes(c.state)) throw invalide('state', 'blocked, provisional ou frozen')
  if (c.state === 'blocked') {
    if (!c.blockedReason) throw invalide('blockedReason', 'requis pour une cible bloquée')
    return c
  }
  if (c.state === 'frozen' && !c.frozenAt) throw invalide('frozenAt', 'commit de gel requis pour une cible gelée')
  if (!['identity', 'relational', 'distributional'].includes(c.level)) throw invalide('level', 'identity, relational ou distributional')
  if (!Number.isInteger(c.repetitions) || c.repetitions < 1) throw invalide('repetitions', 'entier ≥ 1')
  if (c.maxRepetitions !== undefined && (!Number.isInteger(c.maxRepetitions) || c.maxRepetitions < c.repetitions)) throw invalide('maxRepetitions', 'entier ≥ repetitions')
  if (!/^(0|[1-9]\d*)$/.test(c.seeds?.master ?? '') || BigInt(c.seeds.master) >= 1n << 64n) throw invalide('seeds.master', 'entier décimal de 0 à 2^64 − 1')
  if (!Array.isArray(c.criteria) || c.criteria.length === 0) throw invalide('criteria', 'liste non vide requise')
  if (c.criteria.some(k => typeof (k.scenario ?? c.scenario) !== 'string')) throw invalide('scenario', 'chemin requis pour la cible ou pour chaque critère')
  if (c.level === 'distributional' && !c.margin && c.criteria.some(k => !k.margin)) throw invalide('margin', 'requise pour une cible distributionnelle')
  for (const [k, cr] of c.criteria.entries()) {
    if (typeof cr.statistic?.measure !== 'string') throw invalide(`criteria[${k}].statistic.measure`, 'mesure requise')
    if (!['equal', 'TOST', 'range'].includes(cr.test)) throw invalide(`criteria[${k}].test`, `test non implanté : ${String(cr.test)}`)
    const plage = Array.isArray(cr.value) && cr.value.length === 2 && cr.value.every((v: unknown) => typeof v === 'number')
    if (cr.test === 'range' ? !plage : typeof cr.value !== 'number') throw invalide(`criteria[${k}].value`, cr.test === 'range' ? '[min, max] attendu' : 'nombre attendu')
  }
  for (const d of c.deviations ?? []) if (!/^D-\d+-\d{3}$/.test(d)) throw invalide('deviations', `identifiant invalide : ${d} (D-<projet>-<nnn>)`)
  return c
}

export interface OptionsReproduction {
  racine?: string
  modeles?: ReadonlyMap<string, ReferenceModel>
  git?: () => EtatGit
  journal?: (ligne: string) => void
}
export interface Ligne { cible: string; etat: string; issue: string; n: number; code: number }

const fmt = (x: number) => (Number.isFinite(x) ? Number(x.toPrecision(4)).toString() : '—')
const texteMarge = (m?: Marge) => (m ? `marge ±${m.delta} ${m.scale}` : 'sans marge')
const projetDe = (id: string) => { const k = id.match(/^T(\d+)\./)?.[1]; return k === undefined ? undefined : k === '0' ? 'S0' : `P${k}` }

/** Vérifie une cible (étapes 2 à 7); renvoie la ligne du tableau d'A6, dont le code de sortie (BR-013). */
export function verifierCible(id: string, options: OptionsReproduction = {}): Ligne {
  const { racine = RACINE, modeles = MODELES, git = gitCourant, journal = console.log } = options
  const projet = projetDe(id)
  if (!projet) throw new CibleInvalide(`Cible invalide : id : forme T<k>.<n> attendue (${id})`)
  const fichier = path.join(racine, 'targets', projet, `${id}.json`)
  let brut: unknown
  try { brut = JSON.parse(fs.readFileSync(fichier, 'utf8')) } catch (e) { throw new CibleInvalide(`Cible invalide : ${path.relative(racine, fichier)} : ${(e as Error).message}`) }
  const cible = validerCible(brut, id, projet)

  journal(`Cible ${id} : ${cible.state}, ${cible.level ?? '—'}, ${texteMarge(cible.margin)}`)
  if (cible.state === 'blocked') {
    journal(`Cible bloquée : ${cible.blockedReason} (à faire)`)   // A1, BR-008
    return { cible: id, etat: 'blocked', issue: 'à faire', n: 0, code: 0 }
  }
  const criteres = cible.criteria!.map(k => ({ ...k, margin: k.margin ?? cible.margin }) as Criterion)

  for (const k of criteres) {                                     // garde de puissance : A3, BR-010
    const requis = nRequis(k)
    if (cible.repetitions < requis) {
      journal(`Plan refusé : n prévu = ${cible.repetitions}, n requis = ${requis} pour la marge ${fmt(margeAbsolue(k))}`)
      return { cible: id, etat: cible.state, issue: 'plan refusé', n: 0, code: 1 }
    }
  }

  // Étape 4 : liste de graines gelée, scénarios tels quels (BR-011); régime confirmatoire seulement pour une cible gelée (BR-009).
  // Chaque scénario (condition) reçoit les mêmes graines : plan apparié par répétition (05 §7.4).
  const scenarioDe = (k: Criterion) => (k.scenario ?? cible.scenario)!
  const bases = new Map(criteres.map(k => [scenarioDe(k), JSON.parse(fs.readFileSync(path.join(racine, scenarioDe(k)), 'utf8')) as Record<string, unknown>]))
  for (const k of criteres)
    if (!(bases.get(scenarioDe(k))!.measures as string[] | undefined)?.includes(k.statistic.measure)) throw new CibleInvalide(`Cible invalide : criteria : mesure absente du scénario ${scenarioDe(k)} : ${k.statistic.measure}`)
  const regime = cible.state === 'frozen' ? 'confirmatory' : 'exploratory'
  const etatGit = git()
  const runs = new Map([...bases.keys()].map(c => [c, [] as RunManifest[]]))
  const executerJusqua = (n: number) => {
    for (const [chemin, base] of bases)
      for (let i = runs.get(chemin)!.length; i < n; i++) {
        const compile = compileScenario({ ...base, regime, seed: graineDeRepetition(BigInt(cible.seeds.master), i) })
        const { manifeste } = executerCompile(compile, etatGit, modeles)
        runs.get(chemin)!.push({ ...manifeste, model: { ...manifeste.model, target: id }, outputs: [] })
      }
  }
  const valeurs = (k: Criterion) => runs.get(scenarioDe(k))!.map(r => r.summary[`${k.statistic.measure}.final`]).filter((x): x is number => x !== undefined).map(x => valeurParExecution(k, x))
  const decider_ = () => criteres.map(k => decider(k, valeurs(k)))
  const total = () => [...runs.values()].reduce((a, r) => a + r.length, 0)

  executerJusqua(cible.repetitions)
  let decisions: Decision[] = decider_()
  if (conjonction(decisions.map(d => d.outcome)) === 'inconclusive' && (cible.maxRepetitions ?? 0) > cible.repetitions) {
    // A4. ponytail: un seul palier jusqu'à n_max; des paliers intermédiaires viendront avec le préenregistrement (04 §5.4).
    journal(`Issue indéterminée à n = ${cible.repetitions} : extension jusqu'à ${cible.maxRepetitions}`)
    executerJusqua(cible.maxRepetitions!)
    decisions = decider_()
  }

  const premier = decisions[0]!
  const verdict: Verdict = {
    id, outcome: conjonction(decisions.map(d => d.outcome)), provisional: cible.state === 'provisional',
    measured: premier.measured, ...(premier.ci90 ? { ci90: premier.ci90 } : {}), mcStandardError: premier.mcStandardError,
    n: total(), deviations: cible.deviations ?? [], criteria: decisions,
  }
  const manquants = criteres.map(k => ({ quantity: k.quantity, runs: runs.get(scenarioDe(k))!.length - valeurs(k).length })).filter(m => m.runs > 0)

  // Étape 6 : verdict et manifestes
  const dossier = path.join(racine, 'data', 'results', projet)
  const dossierRuns = path.join(dossier, id)
  fs.rmSync(dossierRuns, { recursive: true, force: true })      // sorties précédentes de cette cible seulement
  fs.mkdirSync(dossierRuns, { recursive: true })
  for (const [chemin, liste] of runs)
    for (const [i, r] of liste.entries())
      fs.writeFileSync(path.join(dossierRuns, `${path.basename(chemin, '.json')}-rep-${i}.manifest.json`), JSON.stringify({ ...r, verdict, deviations: verdict.deviations }) + '\n')
  fs.writeFileSync(path.join(dossier, `${id}.verdict.json`), JSON.stringify({ schema: 1, target: cible, targetHash: fnv1a64Texte(jsonCanonique(cible)), scenarios: Object.fromEntries([...bases].map(([c, b]) => [c, fnv1a64Texte(jsonCanonique(b))])), regime, code: etatGit, engine: moteurCourant(), coreVersion: CORE_VERSION, verdict, missing: manquants }, null, 2) + '\n')
  // Une ligne par répétition, valeur brute de chaque mesure visée (format long de 05 §8.2) : TOST et bootstrap après coup.
  const mesures = [...new Set(criteres.map(k => k.statistic.measure))]
  const lignes = [['scenario', 'rep', 'seed', 'runId', 'fnv1a64', ...mesures].join(',')]
  for (const [chemin, liste] of runs)
    for (const [i, r] of liste.entries())
      lignes.push([chemin, i, r.scenario.compiled.seed, r.runId, r.fingerprints.at(-1)!.fnv1a64, ...mesures.map(m => r.summary[`${m}.final`] ?? '')].join(','))
  fs.writeFileSync(path.join(dossier, `${id}.runs.csv`), lignes.join('\n') + '\n')

  // Étape 7, A2, A5
  for (const d of decisions) journal(`  ${d.quantity} : ${d.outcome}, mesuré ${fmt(d.measured)} ± ${fmt(d.mcStandardError)} (ES de Monte Carlo)`)
  for (const m of manquants) journal(`  ${m.quantity} : ${m.runs} exécution(s) sans valeur`)
  journal(`Issue : ${verdict.outcome}${verdict.provisional ? ' (sous réserve)' : ''}, n = ${verdict.n}`)
  const defavorable = cible.state === 'frozen' && verdict.outcome !== 'satisfied'
  if (defavorable) for (const d of decisions.filter(d => d.outcome !== 'satisfied')) journal(`Critère non rempli : ${d.quantity} (${d.outcome})`)
  return { cible: id, etat: cible.state, issue: verdict.outcome + (verdict.provisional ? ' (sous réserve)' : ''), n: verdict.n, code: defavorable ? 1 : 0 }
}

/** Point d'entrée : une cible, ou toutes les cibles d'un projet (A6); renvoie le code de sortie. */
export function reproduire(argument: string, options: OptionsReproduction = {}): number {
  const { racine = RACINE, journal = console.log } = options
  try {
    if (!/^[SP]\d+$/.test(argument)) return verifierCible(argument, options).code
    const dossier = path.join(racine, 'targets', argument)
    const ids = fs.existsSync(dossier) ? fs.readdirSync(dossier).filter(f => /^T\d+\.\d+\.json$/.test(f)).map(f => f.slice(0, -5)) : []
    ids.sort((a, b) => Number(a.split('.')[1]) - Number(b.split('.')[1]))
    const lignes = ids.map(id => verifierCible(id, options))
    journal('| Cible | État | Issue | n |')
    journal('|---|---|---|---|')
    for (const l of lignes) journal(`| ${l.cible} | ${l.etat} | ${l.issue} | ${l.n} |`)
    return lignes.some(l => l.code !== 0) ? 1 : 0
  } catch (e) {
    if (!(e instanceof CibleInvalide || e instanceof ScenarioError || e instanceof EtatInvalide)) throw e
    journal(e.message)
    return 1
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  if (args.length !== 1) {
    console.error('Usage : npm run reproduce -- <T<k>.<n> | P<k> | S0>')
    process.exit(2)
  }
  process.exit(reproduire(args[0]!))
}
