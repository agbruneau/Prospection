// Recompte les dispositions de l'audit de la v3 : node outils/compter-dispositions.ts
// Source : docs/annexes/audit/constats-*.md (une ligne « Disposition » par entrée).
// Contrôles : chaque entrée (constat ou ajout) a exactement une disposition au vocabulaire fermé; le tableau
// de docs/01-audit-v3.md (ligne <!-- compter-dispositions: ... -->) concorde avec le recompte.
// Code de sortie 1 s'il reste une erreur.
import fs from 'node:fs'
import path from 'node:path'

const racine = path.resolve(import.meta.dirname, '..')
const dirAudit = path.join(racine, 'docs', 'annexes', 'audit')
const VERDICTS = ['Accepté', 'Modifié', 'Rejeté', 'Hors portée', 'Non traité']
const GRAVITES = ['critique', 'majeur', 'mineur']
const erreurs: string[] = []

type Entree = { id: string; fichier: string; genre: 'constat' | 'ajout'; gravite: string; verdict: string; marqueur: string; points: number[] }
const entrees: Entree[] = []

for (const f of fs.readdirSync(dirAudit).filter(n => /^constats-.*\.md$/.test(n)).sort()) {
  let cur: Omit<Entree, 'verdict' | 'marqueur' | 'points'> & { vu: boolean } | null = null
  const fermer = () => { if (cur && !cur.vu) erreurs.push(`${f} : ${cur.id} sans disposition`) }
  for (const l of fs.readFileSync(path.join(dirAudit, f), 'utf8').split(/\r?\n/)) {
    let m: RegExpMatchArray | null
    if ((m = l.match(/^### (\S+) · (critique|majeur|mineur)(?: |$)/))) { fermer(); cur = { id: m[1], fichier: f, genre: 'constat', gravite: m[2], vu: false } }
    else if ((m = l.match(/^### (\S+) · ajout/))) { fermer(); cur = { id: m[1], fichier: f, genre: 'ajout', gravite: 'ajout', vu: false } }
    else if (l.startsWith('### ')) { fermer(); cur = null; erreurs.push(`${f} : entrée non reconnue « ${l} »`) }
    else if (l.startsWith('**Disposition.**')) {
      const texte = l.slice('**Disposition.**'.length).replace(/ — Traité dans :.*$/, '').trim()
      const verdict = texte.split(' —')[0]
      if (!cur) { erreurs.push(`${f} : disposition hors entrée`); continue }
      if (cur.vu) erreurs.push(`${f} : ${cur.id} a plusieurs dispositions`)
      if (!VERDICTS.includes(verdict)) erreurs.push(`${f} : ${cur.id} verdict inconnu « ${verdict} »`)
      cur.vu = true
      const marqueur = /(?:^|[ .;(])Écarts? ?:/.test(texte) ? 'Écart' : /(?:^|[ .;(])Adaptations? ?:/.test(texte) ? 'Adaptation' : ''
      const points = [...l.matchAll(/§2\.4[^;)]*/g)].flatMap(x => [...(x[0].match(/points? ([\d, et]+)/)?.[1].match(/\d+/g) ?? [])].map(Number))
      entrees.push({ id: cur.id, fichier: cur.fichier, genre: cur.genre, gravite: cur.gravite, verdict, marqueur, points })
    }
  }
  fermer()
}

const compte = (xs: Entree[], cle: (e: Entree) => string) => {
  const t: Record<string, number> = {}
  for (const e of xs) t[cle(e)] = (t[cle(e)] ?? 0) + 1
  return t
}
const ligne = (nom: string, xs: Entree[]) => {
  const t = compte(xs, e => e.verdict)
  return `| ${nom} | ${VERDICTS.map(v => t[v] ?? 0).join(' | ')} | ${xs.length} |`
}
const entete = (premiere: string) => `| ${premiere} | ${VERDICTS.join(' | ')} | Total |\n|---|${VERDICTS.map(() => '---:').join('|')}|---:|`

console.log('Par fichier\n' + entete('Fichier'))
for (const f of [...new Set(entrees.map(e => e.fichier))]) console.log(ligne(f, entrees.filter(e => e.fichier === f)))
console.log(ligne('**Total**', entrees))
console.log('\nPar genre et gravité\n' + entete('Entrées'))
for (const g of ['constat', 'ajout']) console.log(ligne(g === 'constat' ? 'constats' : 'ajouts', entrees.filter(e => e.genre === g)))
for (const g of GRAVITES) console.log(ligne(`constats ${g}s`, entrees.filter(e => e.gravite === g)))
const marq = compte(entrees.filter(e => e.verdict === 'Modifié'), e => e.marqueur || 'aucun')
console.log(`\nModifié selon le marqueur : Écart ${marq['Écart'] ?? 0}, Adaptation ${marq['Adaptation'] ?? 0}, aucun ${marq['aucun'] ?? 0}`)
console.log('Marqueur sur un autre verdict : ' + entrees.filter(e => e.verdict !== 'Modifié' && e.marqueur).length)

console.log('\nCorrections du cadre (§2.4) : angles distincts par point')
const points = new Map<number, Entree[]>()
for (const e of entrees) for (const p of e.points) points.set(p, [...(points.get(p) ?? []), e])
for (const p of [...points.keys()].sort((a, b) => a - b)) {
  const es = points.get(p)!
  console.log(`point ${p} : ${new Set(es.map(e => e.fichier)).size} angle(s) : ${[...new Set(es.map(e => e.id))].join(', ')}`)
}

// Concordance avec le document de synthèse
const doc = path.join(racine, 'docs', '01-audit-v3.md')
const attendu = Object.fromEntries(VERDICTS.map(v => [v, entrees.filter(e => e.verdict === v).length]))
const cible = `<!-- compter-dispositions: ${VERDICTS.map(v => `${v}=${attendu[v]}`).join(' ')} total=${entrees.length} -->`
if (!fs.existsSync(doc)) erreurs.push('docs/01-audit-v3.md absent')
else if (!fs.readFileSync(doc, 'utf8').includes(cible)) erreurs.push(`docs/01-audit-v3.md : ligne attendue absente : ${cible}`)

console.log(`\n${entrees.length} entrées, ${erreurs.length} erreur(s)`)
erreurs.forEach(e => console.log('ERREUR ' + e))
process.exit(erreurs.length ? 1 : 0)
