// UC-008 Vérifier le dépôt : `npm run verify`. Étapes 2 à 6 dans l'ordre; arrêt à la première en échec (A1).
// Aucune étape n'écrit de fichier versionné (BR-014); les réplications lourdes en sont exclues (BR-016).
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export interface Etape { numero: number; nom: string; commande: string }

const tsc = path.join('node_modules', '.bin', 'tsc')
export const ETAPES: readonly Etape[] = [
  { numero: 2, nom: 'types (configuration Node)', commande: `${tsc} --noEmit -p tsconfig.json` },
  { numero: 2, nom: 'types (configuration navigateur)', commande: `${tsc} --noEmit -p tsconfig.browser.json` },
  { numero: 3, nom: 'tests du noyau, de déterminisme et de conformité', commande: 'npm test --silent' },
  { numero: 4, nom: 'documentation', commande: 'node outils/verifier-docs.ts' },
  { numero: 5, nom: 'cibles des fiches et targets/', commande: 'node outils/verifier-cibles.ts' },
  { numero: 6, nom: 'traçabilité de la spécification', commande: 'node outils/verifier-specs.ts' },
]

/** Exécute les étapes; renvoie le code de sortie (0 si toutes réussissent). */
export function executerEtapes(etapes: readonly Etape[], lancer: (commande: string) => number, journal = console.log): number {
  for (const e of etapes) {
    const code = lancer(e.commande)
    journal(`${code === 0 ? '✔' : '✘'} étape ${e.numero} : ${e.nom}`)
    if (code !== 0) {
      journal(`Échec à l'étape ${e.numero} (${e.commande}) : étapes suivantes non exécutées`)
      return code
    }
  }
  journal('Vérification réussie')
  return 0
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  process.exit(executerEtapes(ETAPES, c => spawnSync(c, { cwd: racine, shell: true, stdio: 'inherit' }).status ?? 1))
}
