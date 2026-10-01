// UC-008 étape 5 : correspondance entre les cibles T des fiches et les fichiers targets/<projet>/T<k>.<n>.json (05 §9.2).
// Un projet est contrôlé dès que son dossier targets/<projet>/ existe (ouverture de sa phase).
// ponytail: bijection et identité seulement; la comparaison du niveau, de n et de la marge s'ajoute avec le premier
// fichier de cible (UC-003), quand le format JSON sera fixé par un cas réel.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export function analyserCibles(racine: string): { erreurs: string[]; projets: number; cibles: number } {
  const erreurs: string[] = []
  const dossier = path.join(racine, 'targets')
  if (!fs.existsSync(dossier)) return { erreurs, projets: 0, cibles: 0 }
  const projets = fs.readdirSync(dossier, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
  let cibles = 0
  for (const p of projets) {
    if (!/^[SP]\d+$/.test(p)) { erreurs.push(`targets/${p} : nom de projet invalide`); continue }
    const fiche = fs.readdirSync(path.join(racine, 'projets')).find(f => f.startsWith(`${p}-`) && f.endsWith('.md'))
    if (!fiche) { erreurs.push(`targets/${p} : aucune fiche projets/${p}-*.md`); continue }
    const k = p.slice(1)
    const definies = new Set([...fs.readFileSync(path.join(racine, 'projets', fiche), 'utf8').matchAll(new RegExp(`^\\|\\s*\\**(T${k}\\.\\d+)\\b`, 'gm'))].map(m => m[1]!))
    const fichiers = new Set<string>()
    for (const f of fs.readdirSync(path.join(dossier, p)).filter(f => f.endsWith('.json'))) {
      const id = f.slice(0, -'.json'.length)
      fichiers.add(id)
      cibles++
      let cible: { id?: unknown; project?: unknown }
      try { cible = JSON.parse(fs.readFileSync(path.join(dossier, p, f), 'utf8')) } catch { erreurs.push(`targets/${p}/${f} : JSON illisible`); continue }
      if (cible.id !== id) erreurs.push(`targets/${p}/${f} : id « ${String(cible.id)} » au lieu de « ${id} »`)
      if (cible.project !== p) erreurs.push(`targets/${p}/${f} : project « ${String(cible.project)} » au lieu de « ${p} »`)
      if (!definies.has(id)) erreurs.push(`targets/${p}/${f} : cible absente de la fiche ${fiche}`)
    }
    for (const id of definies) if (!fichiers.has(id)) erreurs.push(`${fiche} : ${id} sans fichier targets/${p}/${id}.json`)
  }
  return { erreurs, projets: projets.length, cibles }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { erreurs, projets, cibles } = analyserCibles(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'))
  for (const e of erreurs) console.log(`ERREUR ${e}`)
  console.log(`${projets} projet(s) ouvert(s), ${cibles} cible(s)\n${erreurs.length} erreur(s)`)
  process.exit(erreurs.length ? 1 : 0)
}
