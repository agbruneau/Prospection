// Vérifie la cohérence de la documentation : node outils/verifier-docs.ts
// Contrôles : liens relatifs, ancres, étiquettes de citation, identifiants H/T/E, gabarit des fiches.
// Code de sortie 1 s'il reste une erreur. Les avertissements n'échouent pas.
import fs from 'node:fs'
import path from 'node:path'

const racine = path.resolve(import.meta.dirname, '..')
const erreurs: string[] = []
const avertissements: string[] = []

function lister(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) return e.name === '.git' || e.name === 'node_modules' ? [] : lister(p)
    return e.name.endsWith('.md') ? [p] : []
  })
}
const rel = (p: string) => path.relative(racine, p).split(path.sep).join('/')
const tous = lister(racine)
const lire = (p: string) => fs.readFileSync(p, 'utf8')
// Code (blocs et spans) retiré avant analyse : il contient des crochets et des chemins qui ne sont pas des liens.
const sansCode = (t: string) => t.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')

// Ancres au format GitHub : minuscules, ponctuation retirée, espaces → tirets.
const slug = (t: string) => t.trim().toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s/g, '-')
const ancres = new Map<string, Set<string>>()
for (const f of tous) {
  const s = new Set<string>()
  for (const m of sansCode(lire(f)).matchAll(/^#{1,6}\s+(.+?)\s*#*$/gm)) s.add(slug(m[1]!.replace(/[*_`]/g, '')))
  ancres.set(f, s)
}

// 1. Liens relatifs et ancres
for (const f of tous) {
  for (const m of sansCode(lire(f)).matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const cible = m[1]!
    if (/^(https?:|mailto:)/.test(cible)) continue
    const [chemin, ancre] = cible.split('#')
    const abs = chemin ? path.resolve(path.dirname(f), decodeURIComponent(chemin)) : f
    if (!fs.existsSync(abs)) { erreurs.push(`${rel(f)} : lien cassé → ${cible}`); continue }
    if (ancre && abs.endsWith('.md') && !ancres.get(abs)?.has(ancre.toLowerCase()))
      avertissements.push(`${rel(f)} : ancre introuvable → ${cible}`)
  }
}

// 2. Étiquettes de citation [Nom année] (docs/ hors annexes, projets/, README) ↔ bibliographie
const biblio = path.join(racine, 'docs', '11-bibliographie.md')
const etiquettes = new Set<string>()
if (fs.existsSync(biblio)) {
  for (const m of lire(biblio).matchAll(/^\|\s*\*\*(.+?)\*\*\s*\|/gm)) etiquettes.add(m[1]!.trim())
  const base = (l: string) => l.replace(/(\d{4})[a-f]$/, '$1')
  const connues = new Set([...etiquettes, ...[...etiquettes].map(base)])
  // Un crochet peut grouper plusieurs citations ([A 2001; B 2002]) et porter un statut de lecture
  // ([T, A 2001], [A 2001, T*], [I, d'après A 2001]) : chaque année doit terminer une étiquette connue.
  const citationOk = (morceau: string) => {
    const annees = [...morceau.matchAll(/\b(?:1[5-9]|20)\d\d[a-f]?\b/g)]
    return annees.length > 0 && annees.every(a => {
      const avant = morceau.slice(0, a.index! + a[0].length)
      return [...connues].some(l => avant.endsWith(l) && (avant.length === l.length || /[\s,«(;'’]/.test(avant[avant.length - l.length - 1] ?? '')))
    })
  }
  const manquantes = new Map<string, string[]>()
  for (const f of tous) {
    const r = rel(f)
    if (r === 'docs/11-bibliographie.md' || r.startsWith('docs/annexes/') || r.startsWith('recherche/')) continue
    for (const m of sansCode(lire(f)).matchAll(/\[([^\[\]\n]{2,200}?(?:1[5-9]|20)\d\d[a-f]?[^\[\]\n]{0,12})\](?![(\[])/g)) {
      for (const morceau of m[1]!.split(';').map(s => s.trim()).filter(s => /\b(?:1[5-9]|20)\d\d/.test(s)))
        if (!citationOk(morceau)) manquantes.set(morceau, [...(manquantes.get(morceau) ?? []), r])
    }
  }
  for (const [l, fs_] of manquantes) erreurs.push(`étiquette absente de la bibliographie : [${l}] (${[...new Set(fs_)].join(', ')})`)
} else erreurs.push('docs/11-bibliographie.md manquant')

// 3. Identifiants H/T/E : tout identifiant cité dans docs/ doit être défini dans la fiche de son projet
const fichesDir = path.join(racine, 'projets')
const fiches = fs.existsSync(fichesDir) ? fs.readdirSync(fichesDir).filter(n => /^P\d|^S0/.test(n)) : []
const definis = new Set<string>()
for (const n of fiches)
  for (const m of lire(path.join(fichesDir, n)).matchAll(/\b([HTE]\d\.\d+[a-z]?)\b/g)) definis.add(m[1]!)
for (const f of tous.filter(p => /\/docs\/0[2-9]|\/docs\/10|README/.test(p.split(path.sep).join('/')))) {
  for (const m of sansCode(lire(f)).matchAll(/\b([HTE]\d\.\d+[a-z]?)\b/g))
    if (!definis.has(m[1]!)) erreurs.push(`${rel(f)} : identifiant ${m[1]} non défini dans une fiche`)
}

// 4. Gabarit des fiches : 13 sections numérotées, dans l'ordre
for (const n of fiches) {
  const nums = [...lire(path.join(fichesDir, n)).matchAll(/^##\s+(\d+)\.\s/gm)].map(m => Number(m[1]))
  const attendu = Array.from({ length: 13 }, (_, i) => i + 1)
  if (nums.join() !== attendu.join()) erreurs.push(`projets/${n} : sections numérotées ${nums.join(',') || '(aucune)'} au lieu de 1 à 13`)
}
if (!fiches.length) erreurs.push('aucune fiche de projet trouvée')

// 5. Documents attendus
for (const d of ['docs/00-cadre.md', 'docs/01-audit-v3.md', 'docs/02-architecture-programme.md', 'docs/03-plan-de-recherche.md',
  'docs/04-protocole-reproduction.md', 'docs/05-spec-simulation.md', 'docs/06-metriques-et-typologie.md',
  'docs/07-vulgarisation-evaluation.md', 'docs/08-science-ouverte-ethique.md', 'docs/09-feuille-de-route.md',
  'docs/10-glossaire.md', 'docs/11-bibliographie.md', 'README.md'])
  if (!fs.existsSync(path.join(racine, d))) erreurs.push(`document attendu absent : ${d}`)

// 6. Dispositions d'audit : aucune entrée laissée « à renseigner »
for (const f of tous.filter(p => /constats-.*\.md$/.test(p))) {
  const n = (lire(f).match(/_à renseigner_/g) ?? []).length
  if (n) erreurs.push(`${rel(f)} : ${n} disposition(s) non renseignée(s)`)
}

console.log(`${tous.length} fichiers .md, ${etiquettes.size} étiquettes, ${definis.size} identifiants H/T/E, ${fiches.length} fiches`)
avertissements.forEach(a => console.log('AVERT  ' + a))
erreurs.forEach(e => console.log('ERREUR ' + e))
console.log(`${erreurs.length} erreur(s), ${avertissements.length} avertissement(s)`)
process.exit(erreurs.length ? 1 : 0)
