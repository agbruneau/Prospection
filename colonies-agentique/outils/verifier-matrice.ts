// Validateur de la matrice concept × espèce × modèle (fiche S0 §4.5, CS0.13) et du jeu de la typologie (§8.1, CS0.10).
// Appelé par verifier-docs.ts (étape 4 de npm run verify); renvoie la liste des erreurs.
import fs from 'node:fs'
import path from 'node:path'

/** CSV au sens de la RFC 4180 (guillemets doublés), première ligne = en-tête. */
export function lireCsv(texte: string): Record<string, string>[] {
  const lignes: string[][] = []
  let champ = '', ligne: string[] = [], guillemets = false
  for (let i = 0; i < texte.length; i++) {
    const c = texte[i]!
    if (guillemets) {
      if (c === '"' && texte[i + 1] === '"') { champ += '"'; i++ } else if (c === '"') guillemets = false; else champ += c
    } else if (c === '"') guillemets = true
    else if (c === ',') { ligne.push(champ); champ = '' }
    else if (c === '\n' || c === '\r') { if (c === '\r' && texte[i + 1] === '\n') i++; ligne.push(champ); champ = ''; if (ligne.some(x => x !== '')) lignes.push(ligne); ligne = [] }
    else champ += c
  }
  if (champ !== '' || ligne.length) { ligne.push(champ); lignes.push(ligne) }
  const [entete, ...corps] = lignes
  return corps.map(l => Object.fromEntries(entete!.map((k, i) => [k, (l[i] ?? '').trim()])))
}

/** Statut de chaque étiquette de la bibliographie (colonne 3 de docs/11-bibliographie.md). */
export function bibliographie(racine: string): Map<string, string> {
  const t = fs.readFileSync(path.join(racine, 'docs', '11-bibliographie.md'), 'utf8')
  return new Map([...t.matchAll(/^\|\s*\*\*(.+?)\*\*\s*\|[^|]*\|\s*([^|]+?)\s*\|/gm)].map(m => [m[1]!.trim(), m[2]!.trim()]))
}

/** Identifiants H, T et E définis dans les fiches de projet. */
export function identifiantsDefinis(racine: string): Set<string> {
  const d = new Set<string>(), dossier = path.join(racine, 'projets')
  for (const n of fs.readdirSync(dossier).filter(n => /^P\d|^S0/.test(n)))
    for (const m of fs.readFileSync(path.join(dossier, n), 'utf8').matchAll(/\b([HTE]\d\.\d+[a-z]?)\b/g)) d.add(m[1]!)
  return d
}

const NIVEAUX = ['déterministe', 'relationnel', 'distributionnel']
const ETATS = ['brouillon', 'gelée', 'satisfaite', 'non satisfaite', 'non concluante', 'bloquée']
const COLONNES_MATRICE = ['id', 'concept', 'projet', 'taxon_preset', 'canal', 'type_modele', 'source', 'statut_biblio', 'lecture', 'cible', 'niveau', 'etat', 'parite']

export function verifierMatrice(racine: string): string[] {
  const e: string[] = [], f = path.join(racine, 'data', 'matrice.csv')
  if (!fs.existsSync(f)) return ['data/matrice.csv absent']
  const texte = fs.readFileSync(f, 'utf8'), entete = texte.split(/\r?\n/, 1)[0]!.split(',')
  if (entete.join() !== COLONNES_MATRICE.join()) e.push(`data/matrice.csv : colonnes ${entete.join(',')} au lieu de ${COLONNES_MATRICE.join(',')}`)
  const biblio = bibliographie(racine), definis = identifiantsDefinis(racine), lignes = lireCsv(texte), ids = new Set(lignes.map(l => l.id))
  for (const l of lignes) {
    const ou = `data/matrice.csv, ${l.id || '(sans id)'}`
    for (const c of ['id', 'concept', 'projet', 'taxon_preset', 'canal', 'type_modele', 'source', 'lecture'] as const) if (!l[c]) e.push(`${ou} : ${c} vide`)
    if (!/^(P[1-9]|S0)$/.test(l.projet ?? '')) e.push(`${ou} : projet ${l.projet}`)
    const sources = (l.source ?? '').split(';').map(s => s.trim()).filter(Boolean), statuts = (l.statut_biblio ?? '').split(';').map(s => s.trim())
    if (sources.length !== statuts.length) e.push(`${ou} : ${sources.length} source(s) pour ${statuts.length} statut(s)`)
    sources.forEach((s, i) => {
      if (!biblio.has(s)) e.push(`${ou} : étiquette absente de la bibliographie : ${s}`)
      else if (statuts[i] !== biblio.get(s)) e.push(`${ou} : statut de ${s} « ${statuts[i]} » au lieu de « ${biblio.get(s)} »`)
    })
    for (const t of (l.cible ?? '').match(/\b[HTE]\d\.\d+[a-z]?\b/g) ?? []) if (!definis.has(t)) e.push(`${ou} : cible ${t} non définie dans une fiche`)
    if (!NIVEAUX.includes(l.niveau ?? '')) e.push(`${ou} : niveau « ${l.niveau} »`)
    if (!ETATS.includes(l.etat ?? '')) e.push(`${ou} : état « ${l.etat} »`)
    if (!(ids.has(l.parite ?? '') && l.parite !== l.id) && !/^asymétrie : .{10,}/.test(l.parite ?? '')) e.push(`${ou} : parité ni ligne jumelle ni asymétrie justifiée`)
  }
  if (ids.size !== lignes.length) e.push('data/matrice.csv : identifiants en double')
  return e
}

const COLONNES_TYPOLOGIE = ['id', 'entree', 'type_entree', 'domaine', 'taxon', 'a1_plan_global', 'a2_controle_central', 'a3_medium', 'regime', 'granularite_memoire', 'forme_oubli', 'source', 'lecture', 'justification', 'reserve', 'statut_epistemique']
const REGIMES_PRINCIPAUX = ['orchestration', 'chorégraphie spécifiée', 'auto-organisation stigmergique', 'auto-organisation par signaux directs']
const REGIMES = [...REGIMES_PRINCIPAUX, 'hybride', 'hors régime', 'n/d']

/** Jeu de la typologie (CS0.10) : au moins 20 entrées, 3 par régime principal, chaque entrée sourcée et justifiée. */
export function verifierTypologie(racine: string): string[] {
  const e: string[] = [], f = path.join(racine, 'data', 'typologie.csv')
  if (!fs.existsSync(f)) return ['data/typologie.csv absent']
  const texte = fs.readFileSync(f, 'utf8'), entete = texte.split(/\r?\n/, 1)[0]!.split(',')
  if (entete.join() !== COLONNES_TYPOLOGIE.join()) e.push(`data/typologie.csv : colonnes ${entete.join(',')} au lieu de ${COLONNES_TYPOLOGIE.join(',')}`)
  const biblio = bibliographie(racine), lignes = lireCsv(texte)
  if (lignes.length < 20) e.push(`data/typologie.csv : ${lignes.length} entrées (20 au moins)`)
  for (const r of REGIMES_PRINCIPAUX) { const n = lignes.filter(l => l.regime === r).length; if (n < 3) e.push(`data/typologie.csv : ${n} entrée(s) pour ${r} (3 au moins)`) }
  for (const l of lignes) {
    const ou = `data/typologie.csv, ${l.id || '(sans id)'}`
    for (const c of ['id', 'entree', 'a1_plan_global', 'a2_controle_central', 'a3_medium', 'source', 'lecture', 'justification'] as const) if (!l[c]) e.push(`${ou} : ${c} vide`)
    if (!['système', 'mécanisme', 'protocole', 'norme', "cas d'école"].includes(l.type_entree ?? '')) e.push(`${ou} : type_entree « ${l.type_entree} »`)
    if (!['biologie', 'logiciel', 'agentique'].includes(l.domaine ?? '')) e.push(`${ou} : domaine « ${l.domaine} »`)
    if (!['oui', 'non', 'non explicite', 'n/d'].includes(l.a1_plan_global ?? '')) e.push(`${ou} : a1_plan_global « ${l.a1_plan_global} »`)
    if (!['oui', 'non', 'partiel', 'n/d'].includes(l.a2_controle_central ?? '')) e.push(`${ou} : a2_controle_central « ${l.a2_controle_central} »`)
    if (l.a2_controle_central === 'partiel' && l.regime !== 'hybride') e.push(`${ou} : « partiel » admis pour un hybride seulement`)
    if (!REGIMES.includes(l.regime ?? '')) e.push(`${ou} : régime « ${l.regime} »`)
    if (!['reproduit', 'publie', 'simplifie', 'hypothese', 'analogie'].includes(l.statut_epistemique ?? '')) e.push(`${ou} : statut « ${l.statut_epistemique} »`)
    for (const s of (l.source ?? '').split(';').map(x => x.trim()).filter(Boolean)) if (s !== 'cadre' && !biblio.has(s)) e.push(`${ou} : étiquette absente de la bibliographie : ${s}`)
  }
  return e
}
