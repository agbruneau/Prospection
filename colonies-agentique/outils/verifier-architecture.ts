// Vérifie la matrice de traçabilité de docs/02-architecture-programme.md : node outils/verifier-architecture.ts
// Contrôles : chaque cible T définie dans une fiche figure une fois, et une seule, dans la matrice; aucune cible en trop;
// chaque état appartient au vocabulaire de la légende; le tableau « Bilan par état » concorde avec la matrice.
// Code de sortie 1 s'il reste une erreur.
import fs from 'node:fs'
import path from 'node:path'

const racine = path.resolve(import.meta.dirname, '..')
const fichesDir = path.join(racine, 'projets')
const doc = fs.readFileSync(path.join(racine, 'docs', '02-architecture-programme.md'), 'utf8')
const erreurs: string[] = []
const ETATS = ['prête', 'provisoire', 'bloquée', 'garde-fou', 'différée', 'transférée', 'sans']

// 1. Cibles définies par les fiches : première cellule d'une ligne de tableau (T<p>.<n>, avec ou sans gras).
const definies = new Set<string>()
for (const n of fs.readdirSync(fichesDir).filter(f => /^(S0|P\d)-.*\.md$/.test(f))) {
  const prefixe = n.startsWith('S0') ? '0' : n.slice(1, 2)
  const re = new RegExp(String.raw`^\|\s*\**\s*T` + prefixe + String.raw`\.(\d+)\b`)
  for (const ligne of fs.readFileSync(path.join(fichesDir, n), 'utf8').split('\n')) {
    const m = ligne.match(re)
    if (m) definies.add(`T${prefixe}.${m[1]}`)
  }
  if (prefixe === '0') for (const k of [23, 24, 25]) definies.add(`T0.${k}`) // ligne groupée « T0.23 à T0.25 »
}

// 2. Lignes de la matrice : de « ### Matrice par projet » à « ### Bilan par état ».
const debut = doc.indexOf('### Matrice par projet')
const fin = doc.indexOf('### Bilan par état')
if (debut < 0 || fin < debut) erreurs.push('sections « Matrice par projet » et « Bilan par état » introuvables ou dans le désordre')
const lignes = doc.slice(debut, fin).split('\n').filter(l => /^\|\s*T\d+\.\d+(?: à T\d+\.\d+)?\s*\|/.test(l))
const vues = new Map<string, string>()
for (const l of lignes) {
  const cellules = l.split('|').slice(1, -1).map(c => c.trim())
  const etat = (cellules[cellules.length - 1] ?? '').split(/[ (;,]/)[0]!
  if (cellules.length !== 7) erreurs.push(`${cellules[0]} : ${cellules.length} colonnes au lieu de 7`)
  if (!ETATS.includes(etat)) erreurs.push(`${cellules[0]} : état « ${etat} » hors vocabulaire`)
  // Une ligne peut regrouper une plage « T0.23 à T0.25 » (numéros réservés par la fiche S0).
  const plage = (cellules[0] ?? '').match(/^(T\d+)\.(\d+)(?: à T\d+\.(\d+))?$/)
  if (!plage) { erreurs.push(`${cellules[0]} : identifiant illisible`); continue }
  const [, tete, de, a] = plage
  for (let k = Number(de); k <= Number(a ?? de); k++) {
    const id = `${tete}.${k}`
    if (vues.has(id)) erreurs.push(`${id} : présente deux fois dans la matrice`)
    vues.set(id, etat)
  }
}
for (const id of definies) if (!vues.has(id)) erreurs.push(`${id} : définie dans une fiche, absente de la matrice`)
for (const id of vues.keys()) if (!definies.has(id)) erreurs.push(`${id} : dans la matrice, définie dans aucune fiche`)

// 3. Bilan par état : les totaux du tableau doivent égaler ceux de la matrice.
const bilan = doc.slice(fin).split('\n').find(l => l.startsWith('| **Total**'))
if (bilan) {
  const total = bilan.split('|').slice(1, -1).map(c => Number(c.replace(/\*/g, '').trim()))
  const calcule = [...vues.values()].reduce<Record<string, number>>((a, e) => ((a[e] = (a[e] ?? 0) + 1), a), {})
  const attendu = [calcule['prête'] ?? 0, calcule['provisoire'] ?? 0, calcule['bloquée'] ?? 0]
  if (total[1] !== attendu[0] || total[2] !== attendu[1] || total[3] !== attendu[2] || total[5] !== vues.size)
    erreurs.push(`bilan par état (${total.slice(1).join(', ')}) différent de la matrice (${attendu.join(', ')}, total ${vues.size})`)
} else erreurs.push('ligne « Total » du bilan par état introuvable')

console.log(`${definies.size} cibles définies dans les fiches, ${vues.size} identifiants dans la matrice`)
erreurs.forEach(e => console.log('ERREUR ' + e))
console.log(`${erreurs.length} erreur(s)`)
process.exit(erreurs.length ? 1 : 0)
