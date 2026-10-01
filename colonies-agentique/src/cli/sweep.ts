// UC-004 Balayer des paramètres : npm run sweep -- sweeps/<nom>.json [--workers <k>] [--resume]
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ReferenceModel } from '../core/simulation.ts'
import { MODELES } from '../models/index.ts'
import { dejaFaits, ecrire, executerTaches, former, PlanInvalide, type PlanBalayage } from '../sweep/executor.ts'
import { gitCourant, moteurCourant, RACINE, type EtatGit } from './run.ts'

export interface OptionsBalayage { racine?: string; travailleurs?: number; reprise?: boolean; modeles?: ReadonlyMap<string, ReferenceModel>; git?: () => EtatGit; journal?: (l: string) => void }

/** Étapes 1 à 7; renvoie le code de sortie. */
export async function balayer(fichier: string, options: OptionsBalayage = {}): Promise<{ code: number; executees: number }> {
  const { racine = RACINE, travailleurs = 1, reprise = false, modeles = MODELES, git = gitCourant, journal = console.log } = options
  try {
    let plan: PlanBalayage
    try { plan = JSON.parse(fs.readFileSync(path.join(racine, fichier), 'utf8')) as PlanBalayage } catch (e) { throw new PlanInvalide(`Plan invalide : (fichier) : ${(e as Error).message}`) }
    const formes = former(plan, racine, modeles)
    const nom = path.basename(fichier, '.json'), dossier = path.join(racine, 'data', 'sweeps', nom)
    const faits = reprise ? dejaFaits(dossier, formes.hashBase, plan.observables.length) : []
    const deja = new Set(faits.map(r => `${r.point}/${r.rep}`))
    const aFaire = formes.taches.filter(t => !deja.has(`${t.point}/${t.rep}`))
    const debut = Date.now()
    const nouveaux = await executerTaches(aFaire, plan.observables, travailleurs, modeles)
    const { missing } = ecrire(dossier, plan, formes, [...faits, ...nouveaux], { workers: travailleurs, wallMs: Date.now() - debut, code: git(), engine: moteurCourant() })
    journal(`Balayage ${nom} : ${formes.points.length} points, ${formes.taches.length} exécutions (${aFaire.length} exécutées)`)
    if (missing.length) journal(`  ${missing.length} exécution(s) avec une observable sans valeur (voir sweep-manifest.json)`)
    journal(`Résultats : ${path.relative(racine, dossier).replaceAll('\\', '/')}/`)
    return { code: 0, executees: aFaire.length }
  } catch (e) {
    if (!(e instanceof PlanInvalide)) throw e
    journal(e.message)
    return { code: 1, executees: 0 }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  const i = args.indexOf('--workers'), travailleurs = i >= 0 ? Number(args.splice(i, 2)[1]) : 1
  const j = args.indexOf('--resume'), reprise = j >= 0
  if (reprise) args.splice(j, 1)
  if (args.length !== 1 || !(Number.isInteger(travailleurs) && travailleurs >= 1)) {
    console.error('Usage : npm run sweep -- sweeps/<nom>.json [--workers <k>] [--resume]')
    process.exit(2)
  }
  process.exit((await balayer(args[0]!, { travailleurs, reprise })).code)
}
