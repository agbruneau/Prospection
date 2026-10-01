import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { after, test } from 'node:test'
import { lireCsv, verifierMatrice, verifierTypologie } from './verifier-matrice.ts'

const RACINE = path.resolve(import.meta.dirname, '..')
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'matrice-'))
after(() => fs.rmSync(temp, { recursive: true, force: true }))

/** Dépôt minimal : bibliographie et fiches réelles, matrice et typologie modifiées par le test. */
function depot(nom: string, matrice: (t: string) => string, typologie: (t: string) => string = t => t) {
  const r = path.join(temp, nom)
  for (const d of ['docs', 'projets', 'data']) fs.mkdirSync(path.join(r, d), { recursive: true })
  fs.copyFileSync(path.join(RACINE, 'docs', '11-bibliographie.md'), path.join(r, 'docs', '11-bibliographie.md'))
  for (const f of fs.readdirSync(path.join(RACINE, 'projets')).filter(n => n.endsWith('.md'))) fs.copyFileSync(path.join(RACINE, 'projets', f), path.join(r, 'projets', f))
  fs.writeFileSync(path.join(r, 'data', 'matrice.csv'), matrice(fs.readFileSync(path.join(RACINE, 'data', 'matrice.csv'), 'utf8')))
  fs.writeFileSync(path.join(r, 'data', 'typologie.csv'), typologie(fs.readFileSync(path.join(RACINE, 'data', 'typologie.csv'), 'utf8')))
  return r
}

test('UC-008 nominal : la matrice et le jeu de la typologie versionnés passent leurs validateurs (CS0.13, CS0.10)', () => {
  assert.deepEqual(verifierMatrice(RACINE), [])
  assert.deepEqual(verifierTypologie(RACINE), [])
  assert.ok(lireCsv(fs.readFileSync(path.join(RACINE, 'data', 'typologie.csv'), 'utf8')).length >= 20)
})

test('UC-008 A1 : le validateur de matrice signale étiquette absente, statut divergent, cible non définie, taxon vide et parité non justifiée', () => {
  const r = depot('matrice', t => t
    .replace('Seeley et al. 2012,vérifiée', 'Seeley et al. 2099,vérifiée')
    .replace('Sumpter et Pratt 2009,vérifiée', 'Sumpter et Pratt 2009,corrigée')
    .replace('T9.1,relationnel', 'T9.99,relationnel')
    .replace('M14,Mémoire partagée et recrutement par annonce,P2,abeille (ABC décrit par composants)', 'M14,Mémoire partagée et recrutement par annonce,P2,')
    .replace('asymétrie : ligne abeille à compléter par la fiche P9', 'M99'))
  const e = verifierMatrice(r).join('\n')
  for (const attendu of ['M01 : étiquette absente de la bibliographie : Seeley et al. 2099', 'M02 : statut de Sumpter et Pratt 2009 « corrigée » au lieu de « vérifiée »', 'M15 : cible T9.99 non définie', 'M14 : taxon_preset vide', 'M15 : parité ni ligne jumelle ni asymétrie justifiée'])
    assert.ok(e.includes(attendu), `${attendu}\n---\n${e}`)
})

test('UC-008 A1 : le validateur de la typologie signale une entrée sans justification, une étiquette inconnue, un « partiel » hors hybride et un régime principal sous 3 entrées', () => {
  const r = depot('typologie', t => t, t => t
    .replace(/(Y02,[^\n]*?,Garcia-Molina et Salem 1987,T,)[^,]+,/, '$1,')
    .replace('Nii 1986,T,le médium est partagé', 'Nii 2099,T,le médium est partagé')
    .replace('Y12,Annonce et auto-sélection,mécanisme,agentique,n/d,non,partiel,persistant,hybride', 'Y12,Annonce et auto-sélection,mécanisme,agentique,n/d,non,partiel,persistant,orchestration')
    .split('\n').filter(l => !l.startsWith('Y17,') && !l.startsWith('Y18,')).join('\n'))
  const e = verifierTypologie(r).join('\n')
  for (const attendu of ['Y02 : justification vide', 'Y10 : étiquette absente de la bibliographie : Nii 2099', 'Y12 : « partiel » admis pour un hybride seulement', '1 entrée(s) pour auto-organisation par signaux directs (3 au moins)', '19 entrées (20 au moins)'])
    assert.ok(e.includes(attendu), `${attendu}\n---\n${e}`)
})
