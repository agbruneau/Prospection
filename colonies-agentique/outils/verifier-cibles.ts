// UC-008 étape 5 : correspondance entre les cibles T des fiches et les fichiers targets/<projet>/T<k>.<n>.json (05 §9.2) :
// bijection, puis concordance du niveau, de n et de la marge avec la ligne du tableau de la fiche (04 §3.1, règle 7).
// Un projet est contrôlé dès que son dossier targets/<projet>/ existe (ouverture de sa phase).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

interface Cible { id?: unknown; project?: unknown; state?: string; level?: string; repetitions?: number; margin?: { delta: number } }

const NIVEAUX: [RegExp, string][] = [[/distributionnel/i, 'distributional'], [/relationnel/i, 'relational'], [/identit/i, 'identity']]
const cellules = (ligne: string) => ligne.split('|').slice(1, -1).map(c => c.trim())

/** Lignes des tableaux de la fiche, indexées par identifiant T, avec l'en-tête de leur tableau. */
function lignesDeFiche(texte: string, k: string): Map<string, Record<string, string>> {
  const lignes = texte.split(/\r?\n/), resultat = new Map<string, Record<string, string>>()
  let entete: string[] = []
  for (const [i, l] of lignes.entries()) {
    if (/^\|/.test(l) && /^\|\s*:?-{3}/.test(lignes[i + 1] ?? '')) entete = cellules(l)
    const id = l.match(new RegExp(`^\\|\\s*\\**(T${k}\\.\\d+)\\b`))?.[1]
    if (id) resultat.set(id, Object.fromEntries(cellules(l).map((c, j) => [entete[j] ?? `${j}`, c])))
  }
  return resultat
}
const colonne = (ligne: Record<string, string>, re: RegExp) => Object.entries(ligne).find(([h]) => re.test(h))?.[1]

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
    const definies = lignesDeFiche(fs.readFileSync(path.join(racine, 'projets', fiche), 'utf8'), p.slice(1))
    const fichiers = new Set<string>()
    for (const f of fs.readdirSync(path.join(dossier, p)).filter(f => f.endsWith('.json'))) {
      const id = f.slice(0, -'.json'.length), ici = `targets/${p}/${f}`
      fichiers.add(id)
      cibles++
      let cible: Cible
      try { cible = JSON.parse(fs.readFileSync(path.join(dossier, p, f), 'utf8')) } catch { erreurs.push(`${ici} : JSON illisible`); continue }
      if (cible.id !== id) erreurs.push(`${ici} : id « ${String(cible.id)} » au lieu de « ${id} »`)
      if (cible.project !== p) erreurs.push(`${ici} : project « ${String(cible.project)} » au lieu de « ${p} »`)
      const ligne = definies.get(id)
      if (!ligne) { erreurs.push(`${ici} : cible absente de la fiche ${fiche}`); continue }
      if (cible.state === 'blocked') continue
      const niveau = colonne(ligne, /^Niveau/)
      const attendu = NIVEAUX.find(([re]) => re.test(niveau ?? ''))?.[1]
      if (attendu !== cible.level) erreurs.push(`${ici} : niveau « ${String(cible.level)} », la fiche dit « ${niveau ?? '—'} »`)
      const n = Number(colonne(ligne, /^Rép/)?.replace(/[\s  ]/g, '').match(/\d+/)?.[0])
      if (n !== cible.repetitions) erreurs.push(`${ici} : repetitions ${String(cible.repetitions)}, la fiche dit ${Number.isNaN(n) ? '—' : n}`)
      const marge = colonne(ligne, /marge/i) ?? ''
      if (cible.margin && !marge.includes(`±${String(cible.margin.delta).replace('.', ',')}`))
        erreurs.push(`${ici} : marge ±${cible.margin.delta} absente de la fiche (« ${marge} »)`)
    }
    for (const id of definies.keys()) if (!fichiers.has(id)) erreurs.push(`${fiche} : ${id} sans fichier targets/${p}/${id}.json`)
  }
  return { erreurs, projets: projets.length, cibles }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { erreurs, projets, cibles } = analyserCibles(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'))
  for (const e of erreurs) console.log(`ERREUR ${e}`)
  console.log(`${projets} projet(s) ouvert(s), ${cibles} cible(s)\n${erreurs.length} erreur(s)`)
  process.exit(erreurs.length ? 1 : 0)
}
