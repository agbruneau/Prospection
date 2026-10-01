// Vérifie la traçabilité du noyau de spécification (specs/) et tient le tableau de bord à jour.
//   node outils/verifier-specs.ts            contrôle; code de sortie 1 s'il reste une erreur
//   node outils/verifier-specs.ts --ecrire   régénère specs/tableau-de-bord.md, puis contrôle
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const STATUTS = ['Draft', 'Review', 'Approved', 'Implemented', 'Verified', 'Deployed']
const CONTEXTES = ['SIM', 'PAGES', 'LLM']
const SECTIONS = ['Préconditions', 'Déclencheur', 'Scénario nominal', 'Flots alternatifs', 'Postconditions', "Règles d'affaires", 'Exigences liées']
// Mots qui cachent une décision non prise (chapitre 4 du livre) : avertissement seulement.
const FLOUS = /\b(normalement|habituellement|généralement|rapidement|si possible|au besoin|le cas échéant|approprié\w*|adéquat\w*|devrait|devraient|etc\.)/gi

export type CasUtilisation = {
  id: string; fichier: string; meta: Record<string, string | string[]>
  etapes: number; flots: string[]; regles: string[]; references: string[]
}
export type Rapport = { erreurs: string[]; avertissements: string[]; tableau: string }

export function lireMeta(texte: string): Record<string, string | string[]> | null {
  const m = texte.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return null
  const meta: Record<string, string | string[]> = {}
  for (const ligne of m[1]!.split(/\r?\n/)) {
    const kv = ligne.match(/^(\w+):\s*(.*)$/)
    if (!kv) continue
    const v = kv[2]!.trim()
    meta[kv[1]!] = v.startsWith('[') ? v.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean) : v
  }
  return meta
}

const section = (texte: string, titre: string) =>
  (texte.split(/^## /m).find(s => s.startsWith(titre)) ?? '').slice(titre.length)

export function lireCas(texte: string, fichier: string): CasUtilisation {
  const meta = lireMeta(texte) ?? {}
  const nominal = section(texte, 'Scénario nominal')
  return {
    id: String(meta.id ?? ''), fichier, meta,
    etapes: (nominal.match(/^\d+\. /gm) ?? []).length,
    flots: [...texte.matchAll(/^### ([AE]\d+)\./gm)].map(m => m[1]!),
    regles: [...texte.matchAll(/^- \*\*(BR-\d{3})\*\*/gm)].map(m => m[1]!),
    references: [...new Set(texte.match(/\bBR-\d{3}\b/g) ?? [])],
  }
}

function lister(dir: string, filtre: (p: string) => boolean): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) return e.name === 'node_modules' || e.name.startsWith('.') ? [] : lister(p, filtre)
    return filtre(p) ? [p] : []
  })
}

export function analyser(racine: string): Rapport {
  const erreurs: string[] = []
  const avertissements: string[] = []
  const specs = path.join(racine, 'specs')
  const lire = (f: string) => fs.readFileSync(path.join(specs, f), 'utf8')

  // Catalogue des exigences
  const exigences = new Map<string, string>()
  for (const m of lire('catalogue-exigences.md').matchAll(/^\| (FR|NFR|C)-(\d{3}) \| ([^|]+)\|/gm)) {
    const id = `${m[1]}-${m[2]}`
    if (exigences.has(id)) erreurs.push(`catalogue : ${id} défini deux fois`)
    exigences.set(id, m[3]!.trim())
  }

  // Modèle d'entités : noms canoniques entre accents graves dans les titres ###
  const entites = new Set<string>()
  for (const m of lire('modele-entites.md').matchAll(/^### .*$/gm))
    for (const n of m[0].matchAll(/`([^`]+)`/g)) entites.add(n[1]!)

  // Diagramme : liste de contrôle des cas
  const diagramme = new Map<string, string>()
  for (const m of lire('cas-utilisation.puml').matchAll(/usecase "UC-(\d{3}) ([^"]+)"/g)) {
    const id = `UC-${m[1]}`
    if (diagramme.has(id)) erreurs.push(`diagramme : ${id} présent deux fois`)
    diagramme.set(id, m[2]!.trim())
  }

  // Cas d'utilisation rédigés
  const cas = new Map<string, CasUtilisation>()
  const definitions = new Map<string, string>()
  for (const f of lister(path.join(specs, 'cas-utilisation'), p => /UC-\d{3}-[^/\\]+\.md$/.test(p))) {
    const nom = path.basename(f)
    const texte = fs.readFileSync(f, 'utf8')
    const uc = lireCas(texte, nom)
    const e = (msg: string) => erreurs.push(`${nom} : ${msg}`)
    if (!uc.id) { e('métadonnées absentes ou sans id'); continue }
    if (!nom.startsWith(uc.id + '-')) e(`id ${uc.id} différent du nom de fichier`)
    if (cas.has(uc.id)) e(`${uc.id} rédigé deux fois`)
    cas.set(uc.id, uc)
    if (!diagramme.has(uc.id)) e(`${uc.id} absent du diagramme`)
    else if (diagramme.get(uc.id) !== uc.meta.name) e(`nom « ${uc.meta.name} » différent du diagramme « ${diagramme.get(uc.id)} »`)
    if (!STATUTS.includes(String(uc.meta.status))) e(`statut « ${uc.meta.status} » hors de ${STATUTS.join(', ')}`)
    if (!CONTEXTES.includes(String(uc.meta.context))) e(`contexte « ${uc.meta.context} » hors de ${CONTEXTES.join(', ')}`)
    const liees = Array.isArray(uc.meta.linkedRequirements) ? uc.meta.linkedRequirements : []
    for (const r of liees) if (!exigences.has(r)) e(`exigence ${r} absente du catalogue`)
    if (!liees.some(r => r.startsWith('FR-'))) e('aucune exigence fonctionnelle liée')
    for (const n of Array.isArray(uc.meta.entities) ? uc.meta.entities : [])
      if (!entites.has(n)) e(`entité ${n} absente du modèle d'entités`)
    for (const s of SECTIONS) if (!new RegExp(`^## ${s}`, 'm').test(texte)) e(`section « ${s} » absente`)
    if (uc.etapes === 0) e('scénario nominal sans étape numérotée')
    for (const m of texte.matchAll(/^### ([AE]\d+)\.[^\n]*\n\*\*Déclencheur :\*\*([^\n]*)/gm)) {
      // « à l'étape N » ou, pour un même traitement à plusieurs étapes, « à l'une des étapes N à M »
      const etape = m[2]!.match(/à l'(?:une des )?étapes? (\d+)(?: à (\d+))?/)
      if (!etape) e(`${m[1]} : déclencheur sans « à l'étape N »`)
      else for (const n of [etape[1], etape[2]].filter(Boolean).map(Number))
        if (n < 1 || n > uc.etapes) e(`${m[1]} : étape ${n} hors du scénario nominal (1 à ${uc.etapes})`)
    }
    const flotsAvecDeclencheur = [...texte.matchAll(/^### ([AE]\d+)\.[^\n]*\n\*\*Déclencheur :\*\*/gm)].map(m => m[1])
    for (const fl of uc.flots) if (!flotsAvecDeclencheur.includes(fl)) e(`${fl} : ligne « **Déclencheur :** » absente sous le titre`)
    const corps = new Set(section(texte, 'Exigences liées').match(/\b(?:FR|NFR|C)-\d{3}\b/g) ?? [])
    if ([...corps].sort().join() !== [...new Set(liees)].sort().join()) e('« Exigences liées » diffère de linkedRequirements')
    for (const br of uc.regles) {
      if (definitions.has(br)) e(`${br} déjà défini dans ${definitions.get(br)}`)
      definitions.set(br, nom)
    }
    const sansRevue = texte.split(/^## Points soumis à la revue/m)[0]!
    for (const m of sansRevue.matchAll(FLOUS)) avertissements.push(`${nom} : mot flou « ${m[1]} »`)
  }
  for (const uc of cas.values())
    for (const br of uc.references) if (!definitions.has(br)) erreurs.push(`${uc.fichier} : ${br} cité mais défini nulle part`)

  // Tests du produit (tests/, src/) : chaque mention d'un cas doit le désigner; sous tests/, chaque nom de test
  // commence par UC-###. Les tests de l'outillage (outils/) ne vérifient pas de cas d'utilisation.
  const couverture = new Map<string, { unit: boolean; e2e: boolean; items: Set<string> }>()
  const fichiersDeTest = ['tests', 'src'].flatMap(d => lister(path.join(racine, d), p => p.endsWith('.test.ts')))
  for (const f of fichiersDeTest) {
    const rel = path.relative(racine, f).split(path.sep).join('/')
    const texte = fs.readFileSync(f, 'utf8')
    const e2e = /^tests\/(pages|e2e)\//.test(rel)
    for (const m of texte.matchAll(/\bUC-(\d{3})\b(?: (nominal|[AE]\d+|BR-\d{3}))?/g)) {
      const id = `UC-${m[1]}`
      if (!diagramme.has(id)) { erreurs.push(`${rel} : ${id} inconnu`); continue }
      const c = couverture.get(id) ?? { unit: false, e2e: false, items: new Set<string>() }
      if (e2e) c.e2e = true; else c.unit = true
      if (m[2]) c.items.add(m[2])
      couverture.set(id, c)
    }
    if (rel.startsWith('tests/'))
      for (const m of texte.matchAll(/\b(?:test|it)\(\s*['"`]([^'"`]+)/g))
        if (!/^UC-\d{3} /.test(m[1]!)) erreurs.push(`${rel} : nom de test sans identifiant de cas : « ${m[1]} »`)
  }

  return { erreurs, avertissements, tableau: tableauDeBord(exigences, diagramme, cas, couverture) }
}

function tableauDeBord(exigences: Map<string, string>, diagramme: Map<string, string>, cas: Map<string, CasUtilisation>,
  couverture: Map<string, { unit: boolean; e2e: boolean; items: Set<string> }>): string {
  const fini = (s: unknown) => s === 'Verified' || s === 'Deployed'
  const code = (s: unknown) => ['Implemented', 'Verified', 'Deployed'].includes(String(s))
  const pct = (a: number, b: number) => b ? `${Math.round(100 * a / b)} %` : '—'
  const requis = (uc: CasUtilisation) => ['nominal', ...uc.flots, ...uc.regles]

  const fr = [...exigences.keys()].filter(k => k.startsWith('FR-'))
  const casDe = (r: string) => [...cas.values()].filter(uc => (uc.meta.linkedRequirements as string[] ?? []).includes(r))
  const frFini = fr.filter(r => casDe(r).length && casDe(r).every(uc => fini(uc.meta.status))).length
  const frCours = fr.filter(r => casDe(r).length).length - frFini
  const ucFini = [...cas.values()].filter(uc => fini(uc.meta.status)).length
  const ucCouverts = [...cas.values()].filter(uc => {
    const c = couverture.get(uc.id); return c && requis(uc).every(i => c.items.has(i))
  }).length

  const l = [
    '# Tableau de bord de la spécification', '',
    'Généré par `node outils/verifier-specs.ts --ecrire` : ne pas modifier à la main. Une exigence est terminée quand tous les cas qui la servent sont `Verified` ou `Deployed`; la couverture de spécification compte le scénario nominal, chaque flot (A, E) et chaque règle BR du cas, nommés par au moins un test (`UC-### nominal`, `UC-### A1`, `UC-### BR-###`). La régression se lit dans `npm run verify`.', '',
    '## Progression', '',
    '| Catégorie | Total | Terminées | En cours | Non commencées | Couverture |', '|---|---:|---:|---:|---:|---:|',
    `| Exigences fonctionnelles | ${fr.length} | ${frFini} | ${frCours} | ${fr.length - frFini - frCours} | ${pct(frFini, fr.length)} |`,
    `| Cas d'utilisation | ${diagramme.size} | ${ucFini} | ${cas.size - ucFini} | ${diagramme.size - cas.size} | ${pct(ucFini, diagramme.size)} |`,
    `| Cas à couverture de spécification complète | ${diagramme.size} | ${ucCouverts} | ${cas.size - ucCouverts} | ${diagramme.size - cas.size} | ${pct(ucCouverts, diagramme.size)} |`,
    '', '## Suivi par cas', '',
    '| Cas | Titre | FR liées | Statut | Code | Tests | E2E | Couverture de spécification | Intégrité |', '|---|---|---|---|:-:|:-:|:-:|---|---|',
  ]
  for (const [id, titre] of [...diagramme].sort()) {
    const uc = cas.get(id)
    if (!uc) { l.push(`| ${id} | ${titre} | — | non rédigé | ✕ | ✕ | — | — | Faible |`); continue }
    const c = couverture.get(id)
    const req = requis(uc)
    const k = req.filter(i => c?.items.has(i)).length
    const e2e = uc.meta.context === 'PAGES' ? (c?.e2e ? '✔' : '✕') : '—'
    const integrite = fini(uc.meta.status) && k === req.length ? 'Forte' : code(uc.meta.status) || c ? 'Partielle' : 'Faible'
    const frs = (uc.meta.linkedRequirements as string[]).filter(r => r.startsWith('FR-')).join(', ')
    l.push(`| [${id}](cas-utilisation/${uc.fichier}) | ${titre} | ${frs} | ${uc.meta.status} | ${code(uc.meta.status) ? '✔' : '✕'} | ${c?.unit ? '✔' : '✕'} | ${e2e} | ${k} sur ${req.length} | ${integrite} |`)
  }
  return l.join('\n') + '\n'
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const fichier = path.join(racine, 'specs', 'tableau-de-bord.md')
  let r = analyser(racine)
  if (process.argv.includes('--ecrire')) { fs.writeFileSync(fichier, r.tableau); r = analyser(racine) }
  if (!fs.existsSync(fichier) || fs.readFileSync(fichier, 'utf8').replace(/\r\n/g, '\n') !== r.tableau)
    r.erreurs.push('specs/tableau-de-bord.md périmé : lancer node outils/verifier-specs.ts --ecrire')
  r.avertissements.forEach(a => console.log('AVERT  ' + a))
  r.erreurs.forEach(e => console.log('ERREUR ' + e))
  console.log(`${r.erreurs.length} erreur(s), ${r.avertissements.length} avertissement(s)`)
  process.exit(r.erreurs.length ? 1 : 0)
}
