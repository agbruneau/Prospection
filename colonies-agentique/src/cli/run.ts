// UC-001 Exécuter un scénario : node src/cli/run.ts <fichier de scénario> [--out <dossier>]
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CORE_VERSION, runIdDe, type RunManifest } from '../core/manifest.ts'
import { createStream } from '../core/random.ts'
import { EtatInvalide, enregistrer, serieCsv } from '../core/recorder.ts'
import { compileScenario, invalide, ScenarioError, type CompiledScenario } from '../core/scenario.ts'
import type { ReferenceModel } from '../core/simulation.ts'
import { MODELES, trouverModele } from '../models/index.ts'

export const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export interface EtatGit { commit: string; cleanTree: boolean }
export interface OptionsExecution {
  sortie?: string
  modeles?: ReadonlyMap<string, ReferenceModel>
  git?: () => EtatGit
  journal?: (ligne: string) => void
}

/** Commit courant et propreté de l'arbre du programme (fichiers suivis seulement). */
export function gitCourant(): EtatGit {
  try {
    const git = (...a: string[]) => execFileSync('git', a, { cwd: RACINE, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    return { commit: git('rev-parse', 'HEAD'), cleanTree: git('status', '--porcelain', '--untracked-files=no', '--', '.') === '' }
  } catch {
    return { commit: 'inconnu', cleanTree: false }
  }
}

export const moteurCourant = (): RunManifest['engine'] => ({ kind: 'node', version: process.versions.node, platform: process.platform, arch: process.arch })

const hex = (mots: Uint32Array) => Array.from(mots, x => x.toString(16).padStart(8, '0')).join('')

/** Résout le modèle, contrôle les mesures et crée la simulation avec ses flux déclarés. */
export function preparer(compile: CompiledScenario, modeles = MODELES) {
  const modele = trouverModele(compile.model.id, modeles)
  for (const m of compile.measures) if (!(m in modele.measureUnits)) throw invalide('measures', `mesure inconnue du modèle : ${m}`)
  const flux = new Map(compile.streams.map(n => [n, createStream(BigInt(compile.seed), n)]))
  const etatsInitiaux = [...flux].map(([name, g]) => ({ name, initialState: hex(g.state()) }))
  const sim = modele.create(compile, {
    stream(n) {
      const g = flux.get(n)
      if (!g) throw invalide('streams', `flux non déclaré : ${n}`)
      return g
    },
  })
  return { modele, sim, etatsInitiaux }
}

function lireJson(fichier: string, quoi: string): unknown {
  try {
    return JSON.parse(fs.readFileSync(fichier, 'utf8'))
  } catch (e) {
    throw invalide(quoi, `fichier illisible : ${(e as Error).message}`)
  }
}

function versionTypescript(): string {
  try {
    return (JSON.parse(fs.readFileSync(path.join(RACINE, 'node_modules/typescript/package.json'), 'utf8')) as { version: string }).version
  } catch {
    return 'absent'
  }
}

/** Exécute un scénario compilé en mémoire (UC-001 étapes 3 à 5, A3, E1); n'écrit rien. */
export function executerCompile(compile: CompiledScenario, etatGit: EtatGit, modeles = MODELES) {
  const { modele, sim, etatsInitiaux } = preparer(compile, modeles)
  if (compile.regime === 'confirmatory' && !etatGit.cleanTree) throw new ScenarioError('Exécution confirmatoire refusée : arbre de travail modifié')

  const debut = new Date()
  const e = enregistrer(sim, compile)
  const fin = new Date()

  const base = `${compile.model.id}__${compile.hash.slice(0, 8)}__s${compile.seed}`
  const csv = serieCsv(e, compile.measures)
  const manifeste: RunManifest = {
    schema: 1,
    runId: runIdDe(compile.hash, compile.seed, etatGit.commit),
    regime: compile.regime,
    model: { ...compile.model },
    code: { commit: etatGit.commit, cleanTree: etatGit.cleanTree, coreVersion: CORE_VERSION, node: process.version, typescript: versionTypescript(), dependencies: {} },
    scenario: { hash: compile.hash, compiled: compile },
    prng: { algorithm: 'xoshiro128**', seeding: 'splitmix64', masterSeed: compile.seed, streams: etatsInitiaux },
    time: { unit: compile.time.unit, dt: compile.time.dt, horizon: compile.time.horizon, order: compile.order, steps: e.steps },
    interventions: compile.interventions,
    engine: moteurCourant(),
    timestamps: { start: debut.toISOString(), end: fin.toISOString(), wallMs: fin.getTime() - debut.getTime() },
    outputs: [{
      file: `${base}.series.csv`, format: 'csv', sha256: createHash('sha256').update(csv).digest('hex'), rows: e.t.length,
      columns: [{ name: 't', unit: compile.time.unit }, ...compile.measures.map(m => ({ name: m, unit: modele.measureUnits[m]! }))],
    }],
    fingerprints: e.fingerprints,
    summary: e.summary,
    missing: e.missing,
    deviations: [],
    license: 'CC-BY-4.0', // proposée par 08 (DC2), en attente de la décision du chercheur
  }
  return { manifeste, csv, base }
}

/** Exécute un fichier de scénario; lève ScenarioError (A1 à A3) ou EtatInvalide (E1) sans rien écrire. */
export function executer(fichier: string, options: OptionsExecution = {}) {
  const { sortie = 'data/runs', modeles = MODELES, git = gitCourant, journal = console.log } = options
  const compile = compileScenario(lireJson(fichier, '(fichier)'))
  journal(`Scénario ${compile.hash} (${compile.regime})`)
  const { manifeste, csv, base } = executerCompile(compile, git(), modeles)

  fs.mkdirSync(sortie, { recursive: true })
  fs.writeFileSync(path.join(sortie, `${base}.series.csv`), csv)
  const chemin = path.join(sortie, `${base}.manifest.json`)
  fs.writeFileSync(chemin, JSON.stringify(manifeste, null, 2) + '\n')
  const empreinteFinale = manifeste.fingerprints.at(-1)!.fnv1a64
  journal(`runId : ${manifeste.runId}`)
  journal(`Manifeste : ${chemin}`)
  journal(`Empreinte finale : ${empreinteFinale}`)
  return { runId: manifeste.runId, manifeste: chemin, empreinte: empreinteFinale }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  const i = args.indexOf('--out')
  const sortie = i >= 0 ? args.splice(i, 2)[1] : undefined
  if (args.length !== 1 || (i >= 0 && !sortie)) {
    console.error('Usage : node src/cli/run.ts <fichier de scénario> [--out <dossier>]')
    process.exit(2)
  }
  try {
    executer(args[0]!, sortie ? { sortie } : {})
  } catch (e) {
    if (!(e instanceof ScenarioError || e instanceof EtatInvalide)) throw e
    console.error(e.message)
    process.exit(1)
  }
}
