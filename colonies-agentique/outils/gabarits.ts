// Gabarits copiables (fiche S0, livrable 7; CS0.14) : extraits des blocs du protocole de reproduction, source unique.
// `node outils/gabarits.ts --ecrire` les écrit dans gabarits/; sans option, signale tout écart (contrôlé par les tests).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
/** Fichier de gabarits/ → titre de la section de 04 qui contient le bloc. */
export const GABARITS: Readonly<Record<string, string>> = {
  'fiche-de-reproduction.md': '### 3.2 Gabarit (à copier pour chaque cible)',
  'odd.md': '### 10.2 Gabarit',
  'preenregistrement.md': '### 11.3 Gabarit de préenregistrement',
}

/** Contenu attendu de chaque gabarit : le premier bloc ```markdown qui suit le titre de section. */
export function attendus(racine = RACINE): Map<string, string> {
  const protocole = fs.readFileSync(path.join(racine, 'docs', '04-protocole-reproduction.md'), 'utf8').replace(/\r\n/g, '\n')
  return new Map(Object.entries(GABARITS).map(([fichier, titre]) => {
    const debut = protocole.indexOf(titre)
    const bloc = debut < 0 ? null : protocole.slice(debut).match(/```markdown\n([\s\S]*?)```/)
    if (!bloc) throw new Error(`gabarit introuvable dans 04 : ${titre}`)
    return [fichier, `<!-- Extrait de docs/04-protocole-reproduction.md (« ${titre.replace(/^#+\s*/, '')} ») par outils/gabarits.ts; ne pas modifier ici. -->\n${bloc[1]}`]
  }))
}

/** Écarts entre gabarits/ et le protocole (liste vide : à jour). */
export function ecarts(racine = RACINE): string[] {
  return [...attendus(racine)].filter(([f, contenu]) => {
    const p = path.join(racine, 'gabarits', f)
    return !fs.existsSync(p) || fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n') !== contenu
  }).map(([f]) => `gabarits/${f} diffère du protocole : node outils/gabarits.ts --ecrire`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--ecrire')) {
    fs.mkdirSync(path.join(RACINE, 'gabarits'), { recursive: true })
    for (const [f, contenu] of attendus()) fs.writeFileSync(path.join(RACINE, 'gabarits', f), contenu)
  }
  const e = ecarts()
  e.forEach(x => console.log('ERREUR ' + x))
  process.exit(e.length ? 1 : 0)
}
