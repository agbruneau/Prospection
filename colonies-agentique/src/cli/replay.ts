// UC-002 Rejouer une exécution : node src/cli/replay.ts <manifeste>. N'écrit aucun fichier (BR-006).
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { CORE_VERSION, ManifesteInvalide, validerManifeste, type RunManifest } from '../core/manifest.ts'
import { EtatInvalide, enregistrer } from '../core/recorder.ts'
import { compileScenario, ScenarioError, source } from '../core/scenario.ts'
import type { ReferenceModel } from '../core/simulation.ts'
import { MODELES } from '../models/index.ts'
import { moteurCourant, preparer } from './run.ts'

export interface OptionsRejeu {
  modeles?: ReadonlyMap<string, ReferenceModel>
  moteur?: () => RunManifest['engine']
  journal?: (ligne: string) => void
}

/** Rejoue un manifeste; renvoie le code de sortie. */
export function rejouer(fichier: string, options: OptionsRejeu = {}): number {
  const { modeles = MODELES, moteur = moteurCourant, journal = console.log } = options
  let m: RunManifest
  try {
    m = validerManifeste(JSON.parse(fs.readFileSync(fichier, 'utf8')))
  } catch (e) {
    journal(e instanceof ManifesteInvalide ? e.message : `Manifeste invalide : (fichier) ${(e as Error).message}`)
    return 1
  }
  if (m.llmLog) {
    journal('Exécution LLM : rejouer avec sa cassette (UC-021)')
    return 1
  }
  try {
    const compile = compileScenario(source(m.scenario.compiled as unknown as Record<string, unknown>))
    if (compile.hash !== m.scenario.hash) {
      journal(`Scénario modifié : hachage ${compile.hash} au lieu de ${m.scenario.hash}`)
      return 1
    }
    const calculees = new Map(enregistrer(preparer(compile, modeles).sim, compile).fingerprints.map(f => [f.time, f.fnv1a64]))
    const ici = moteur()
    // BR-007 : identité affirmée seulement sur le même moteur, la même version, la même plateforme et le même noyau.
    const memeMoteur = (['kind', 'version', 'platform', 'arch'] as const).every(k => ici[k] === m.engine[k]) && m.code.coreVersion === CORE_VERSION
    const k = m.fingerprints.length
    const egales = m.fingerprints.filter(f => calculees.get(f.time) === f.fnv1a64).length
    if (!memeMoteur) {
      journal(`${egales} empreintes égales sur ${k}`)
      journal('Moteur différent : équivalence statistique seulement')
      return 0
    }
    const divergente = m.fingerprints.find(f => calculees.get(f.time) !== f.fnv1a64)
    if (divergente) {
      journal(`Rejeu divergent au temps ${divergente.time}`)
      return 1
    }
    journal(`Rejeu identique : ${k} empreintes sur ${k}`)
    return 0
  } catch (e) {
    if (!(e instanceof ScenarioError || e instanceof EtatInvalide)) throw e
    journal(e.message)
    return 1
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  if (args.length !== 1) {
    console.error('Usage : node src/cli/replay.ts <manifeste>')
    process.exit(2)
  }
  process.exit(rejouer(args[0]!))
}
