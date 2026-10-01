// node --test outils/verifier-specs.test.ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { analyser, lireMeta } from './verifier-specs.ts'

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('les métadonnées se lisent, listes comprises', () => {
  const meta = lireMeta('---\nid: UC-001\nactors: [Chercheur, Pipeline CI]\n---\n# x')
  assert.deepEqual(meta, { id: 'UC-001', actors: ['Chercheur', 'Pipeline CI'] })
})

test('le noyau de spécification du dépôt passe sans erreur', () => {
  assert.deepEqual(analyser(racine).erreurs, [])
})

test('une copie cassée produit chaque erreur attendue', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'specs-'))
  fs.cpSync(path.join(racine, 'specs'), path.join(tmp, 'specs'), { recursive: true })
  const f = path.join(tmp, 'specs', 'cas-utilisation', 'UC-001-executer-scenario.md')
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8')
    .replace('FR-001, NFR-001', 'FR-999, NFR-001')        // exigence inconnue
    .replace('entities: [Scenario,', 'entities: [Inconnue,') // entité inconnue
    .replace("à l'étape 2, une règle", "à l'étape 42, une règle") // étape hors scénario
    .replace('- **BR-005**', '- **BR-001**'))                // règle définie deux fois
  fs.mkdirSync(path.join(tmp, 'tests'))
  fs.writeFileSync(path.join(tmp, 'tests', 'x.test.ts'), "test('sans identifiant', () => {})\n// UC-777 nominal\n")
  const { erreurs } = analyser(tmp)
  for (const attendu of ['FR-999 absente', 'entité Inconnue', 'étape 42 hors', 'BR-001 déjà défini', 'UC-777 inconnu', 'nom de test sans identifiant'])
    assert.ok(erreurs.some(e => e.includes(attendu)), `erreur attendue : ${attendu}\nobtenues : ${erreurs.join('\n')}`)
  fs.rmSync(tmp, { recursive: true, force: true })
})

test('la couverture de spécification compte nominal, flots et règles nommés par les tests', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'specs-'))
  fs.cpSync(path.join(racine, 'specs'), path.join(tmp, 'specs'), { recursive: true })
  fs.mkdirSync(path.join(tmp, 'tests'))
  fs.writeFileSync(path.join(tmp, 'tests', 'run.test.ts'),
    "test('UC-002 nominal : rejeu identique', () => {})\ntest('UC-002 A2 : rejeu divergent', () => {})\n")
  const ligne = analyser(tmp).tableau.split('\n').find(l => l.includes('[UC-002]'))
  assert.match(ligne ?? '', /\| ✔ \| — \| 2 sur 8 \| Partielle \|/)
  fs.rmSync(tmp, { recursive: true, force: true })
})
