// UC-006 Préparer les résumés d'une page : npm run summarize -- <T<k>.<n>>
// Lit le verdict et la liste des répétitions écrits par UC-003 (data/results/<projet>/), sans aucune simulation (BR-028),
// et écrit <id>.summary.json (05 §8.3). Aucune date dans le résumé : deux résumés des mêmes sorties sont identiques.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { erreurType, intervalle95, moyenne, rangTypique, type Cellule, type PageSummary } from '../analysis/descriptif.ts'
import { fnv1a64Texte } from '../core/fingerprint.ts'
import type { Verdict } from '../core/manifest.ts'
import { jsonCanonique } from '../core/scenario.ts'
import { projetDe, type ReproductionTarget } from './reproduce.ts'
import { RACINE, type EtatGit } from './run.ts'

export class ResumeImpossible extends Error {}

interface FichierVerdict {
  targetHash: string
  scenarios?: Record<string, string>
  regime: PageSummary['regime']
  code: EtatGit
  engine: PageSummary['provenance']['engine']
  coreVersion: string
  verdict: Verdict
}
interface Ligne { rep: number; seed: string; fnv1a64: string; valeurs: Record<string, string> }

const lireJson = (f: string) => JSON.parse(fs.readFileSync(f, 'utf8')) as unknown
const hachage = (f: string) => (fs.existsSync(f) ? fnv1a64Texte(jsonCanonique(lireJson(f))) : undefined)

/** Liste des répétitions (format long de UC-003) : lignes par scénario. */
function lireRuns(fichier: string): Map<string, Ligne[]> {
  const [entete, ...lignes] = fs.readFileSync(fichier, 'utf8').trim().split('\n').map(l => l.split(','))
  const mesures = entete!.slice(5)
  const parScenario = new Map<string, Ligne[]>()
  for (const [scenario, rep, seed, , fnv1a64, ...v] of lignes) {
    if (!parScenario.has(scenario!)) parScenario.set(scenario!, [])
    parScenario.get(scenario!)!.push({ rep: Number(rep), seed: seed!, fnv1a64: fnv1a64!, valeurs: Object.fromEntries(mesures.map((m, i) => [m, v[i] ?? ''])) })
  }
  return parScenario
}

export function resumer(id: string, racine = RACINE): { chemin: string; resume: PageSummary } {
  const projet = projetDe(id)
  const dossier = path.join(racine, 'data', 'results', projet ?? '-')
  const fichierVerdict = path.join(dossier, `${id}.verdict.json`), fichierRuns = path.join(dossier, `${id}.runs.csv`)
  if (!projet || !fs.existsSync(fichierVerdict) || !fs.existsSync(fichierRuns)) throw new ResumeImpossible(`Résumé impossible : cible ${id} non vérifiée`)   // A1
  const v = lireJson(fichierVerdict) as FichierVerdict

  // Étape 3 (A2) : la cible et chacun de ses scénarios sont ceux du verdict.
  const relCible = `targets/${projet}/${id}.json`
  const modifie = (quoi: string) => new ResumeImpossible(`Résumé impossible : ${quoi} modifié depuis le verdict de ${id}`)
  if (hachage(path.join(racine, relCible)) !== v.targetHash) throw modifie(relCible)
  const cible = lireJson(path.join(racine, relCible)) as ReproductionTarget
  // Une mesure par scénario : celle du premier critère qui le porte; ordre des cellules = ordre des critères.
  const mesureDe = new Map<string, string>()
  for (const k of cible.criteria ?? []) { const s = (k.scenario ?? cible.scenario)!; if (!mesureDe.has(s)) mesureDe.set(s, k.statistic.measure) }
  for (const s of mesureDe.keys()) if (hachage(path.join(racine, s)) !== v.scenarios?.[s]) throw modifie(s)

  // Étapes 4 et 5. BR-029 : N couvre toutes les répétitions; une valeur absente reste à son rang (null), jamais retirée.
  const runs = lireRuns(fichierRuns)
  const N = Math.max(cible.repetitions, ...[...runs.values()].flat().map(l => l.rep + 1))
  const toConfirm = new Set<string>()
  const cells = [...mesureDe].map(([scenario, mesure]): Cellule => {
    const source = lireJson(path.join(racine, scenario)) as Record<string, unknown>
    const parametres = source.parameters as Record<string, { value: number | string | boolean; status?: string }>
    for (const [k, p] of Object.entries(parametres)) if (p.status === 'to-confirm') toConfirm.add(k)
    const parRang = new Map((runs.get(scenario) ?? []).map(l => [l.rep, l]))
    const values = Array.from({ length: N }, (_, i) => { const x = parRang.get(i)?.valeurs[mesure]; return x ? Number(x) : null })
    const rangs = values.flatMap((x, i) => (x == null ? [] : [i])), presentes = rangs.map(i => values[i]!)
    if (presentes.length === 0) throw new ResumeImpossible(`Résumé impossible : aucune valeur de ${mesure} pour ${scenario}`)
    const typique = parRang.get(rangs[rangTypique(presentes)]!)!   // BR-027
    return {
      scenario, scenarioHash: v.scenarios![scenario]!, source, params: Object.fromEntries(Object.entries(parametres).map(([k, p]) => [k, p.value])),
      n: presentes.length, mean: moyenne(presentes), se: erreurType(presentes), interval95: intervalle95(presentes), values, missing: N - presentes.length,
      replay: { rep: typique.rep, seed: typique.seed, fnv1a64: typique.fnv1a64 },
    }
  })
  const resume: PageSummary = {
    schema: 1, target: id, targetHash: v.targetHash, regime: v.regime, state: cible.state, verdict: v.verdict, level: cible.level,
    ...(cible.margin ? { margin: { delta: cible.margin.delta, scale: cible.margin.scale } } : {}),
    provenance: { commit: v.code.commit, engine: v.engine, coreVersion: v.coreVersion, masterSeed: cible.seeds.master },
    preregisteredN: N, measure: [...mesureDe.values()][0]!, toConfirm: [...toConfirm], cells,
  }
  const chemin = path.join(dossier, `${id}.summary.json`)
  fs.writeFileSync(chemin, JSON.stringify(resume, null, 2) + '\n')
  return { chemin, resume }
}

/** Point d'entrée : renvoie le code de sortie (étapes 7 et 8; A1 et A2). */
export function resumerCible(id: string, options: { racine?: string; journal?: (ligne: string) => void } = {}): number {
  const { racine = RACINE, journal = console.log } = options
  try {
    const { chemin, resume } = resumer(id, racine)
    journal(`Résumé : ${path.relative(racine, chemin).replaceAll('\\', '/')} (N = ${resume.preregisteredN})`)
    for (const c of resume.cells) journal(`  ${c.scenario} : répétition typique ${c.replay.rep}, graine ${c.replay.seed}, valeur ${c.values[c.replay.rep]}`)
    return 0
  } catch (e) {
    if (!(e instanceof ResumeImpossible)) throw e
    journal(e.message)
    return 1
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  if (args.length !== 1) {
    console.error('Usage : npm run summarize -- <T<k>.<n>>')
    process.exit(2)
  }
  process.exit(resumerCible(args[0]!))
}
