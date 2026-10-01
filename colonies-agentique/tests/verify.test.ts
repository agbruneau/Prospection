import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { ETAPES, executerEtapes } from '../outils/verify.ts'
import { analyser } from '../outils/verifier-specs.ts'
import { RACINE } from '../src/cli/run.ts'

test('UC-008 nominal : les étapes 2 à 6 s\'exécutent dans l\'ordre, chacune affichée, et la chaîne sort à 0', () => {
  const lancees: string[] = [], lignes: string[] = []
  assert.equal(executerEtapes(ETAPES, c => { lancees.push(c); return 0 }, l => lignes.push(l)), 0)
  assert.deepEqual(lancees, ETAPES.map(e => e.commande))
  assert.deepEqual(ETAPES.map(e => e.numero), [2, 2, 3, 4, 5, 6])
  assert.match(ETAPES.map(e => e.commande).join('\n'), /tsconfig\.json[\s\S]*tsconfig\.browser\.json[\s\S]*npm test[\s\S]*verifier-docs[\s\S]*verifier-cibles[\s\S]*verifier-specs/)
  assert.equal(lignes.filter(l => l.startsWith('✔')).length, ETAPES.length)
})

test('UC-008 A1 : une étape en échec est affichée, les suivantes ne s\'exécutent pas et le code est non nul', () => {
  const lancees: string[] = [], lignes: string[] = []
  const code = executerEtapes(ETAPES, c => { lancees.push(c); return c.includes('verifier-docs') ? 1 : 0 }, l => lignes.push(l))
  assert.notEqual(code, 0)
  assert.equal(lancees.at(-1), 'node outils/verifier-docs.ts')
  assert.equal(lancees.length, 4)
  assert.ok(lignes.includes('✘ étape 4 : documentation'))
})

test('UC-008 BR-014 : les contrôles de la chaîne ne créent ni ne modifient aucun fichier versionné', () => {
  assert.ok(ETAPES.every(e => !/--ecrire|--write|>\s/.test(e.commande)))
  const etat = () => execFileSync('git', ['status', '--porcelain', '--', '.'], { cwd: RACINE, encoding: 'utf8' })
  const avant = etat()
  for (const outil of ['verifier-docs', 'verifier-cibles', 'verifier-specs']) spawnSync(process.execPath, [`outils/${outil}.ts`], { cwd: RACINE })
  assert.equal(etat(), avant)
})

test('UC-008 BR-015 : chaque test sous tests/ commence par l\'identifiant de son cas d\'utilisation', () => {
  assert.deepEqual(analyser(RACINE).erreurs.filter(e => e.includes('nom de test')), [])
})

test('UC-008 BR-016 : les réplications lourdes restent hors de la chaîne de vérification', () => {
  const tout = ETAPES.map(e => e.commande).join('\n')
  const scripts = (JSON.parse(fs.readFileSync(path.join(RACINE, 'package.json'), 'utf8')) as { scripts: Record<string, string> }).scripts
  assert.doesNotMatch(`${tout}\n${scripts.test}\n${scripts.verify}`, /reproduce|tests\/reproduction/)
})
