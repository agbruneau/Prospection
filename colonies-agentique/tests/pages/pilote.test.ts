// Page-pilote (E-01) : la vraie définition sur le vrai résumé versionné de T1.1, pas sur une fixture.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import type { PageSummary } from '../../src/analysis/descriptif.ts'
import type { PageDefinition } from '../../src/browser/contrat.ts'
import { RACINE } from '../../src/cli/run.ts'
import { fnv1a64Texte } from '../../src/core/fingerprint.ts'
import { jsonCanonique } from '../../src/core/scenario.ts'
import { donnees, navigateur } from './aide.ts'

const ouvrir = navigateur()
const lire = <T>(f: string) => JSON.parse(fs.readFileSync(path.join(RACINE, f), 'utf8')) as T
const definition = lire<PageDefinition>('pages/p1-v1-pont.json')
const resume = lire<PageSummary>('data/results/P1/T1.1.summary.json')
const hachage = (f: string) => fnv1a64Texte(jsonCanonique(lire(f)))

test('UC-006 nominal : le résumé versionné de T1.1 porte sur la cible et les scénarios actuels (sinon : npm run reproduce, puis summarize)', () => {
  assert.equal(resume.targetHash, hachage('targets/P1/T1.1.json'))
  for (const c of resume.cells) assert.equal(c.scenarioHash, hachage(c.scenario), c.scenario)
})

test('UC-010 nominal : la page-pilote p1-v1-pont joue ses trois niveaux sur le résumé de T1.1, sans requête réseau ni erreur, et sans violation WCAG 2.2 AA détectée', async () => {
  const { page, requetes, erreurs } = await ouvrir(donnees(definition, resume), 'page.html', { reduit: true })   // lecture instantanée : la pause est couverte par gabarit.test.ts
  await page.addScriptTag({ path: path.join(RACINE, 'node_modules/axe-core/axe.min.js') })
  const violations = async () => page.evaluate(async () => (await (globalThis as any).axe.run((globalThis as any).document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } })).violations.map((v: any) => `${v.id} : ${v.nodes.length}`))
  const visible = (s: string) => page.locator(`section:not([hidden]) ${s}`).first()
  const niveau = (nom: string) => page.locator('nav').getByRole('button', { name: nom }).click()

  await page.getByRole('button', { name: 'Passer' }).click()
  await visible('.resultat .comparaison').waitFor({ timeout: 30_000 })
  assert.match(await visible('.distribution figcaption').innerText(), /n = 1000 sur N = 1000/)
  assert.deepEqual(await violations(), [])

  await niveau('Explorer')
  await page.locator('.etiquette-calcul', { hasText: '1000 sur 1000' }).waitFor({ timeout: 30_000 })
  assert.deepEqual(await violations(), [])

  await niveau('Vérifier')
  assert.match(await visible('dl').innerText(), /satisfied \(sous réserve\), n = 3000/)
  assert.equal(await page.locator('section:not([hidden]) .enonce[data-statut="reproduit"]').count(), 0)   // BR-025 : cible provisoire
  assert.deepEqual(await violations(), [])

  assert.deepEqual(requetes.filter(u => !u.endsWith('/page.html') && !/^(blob|data):/.test(u)), [])
  assert.deepEqual(erreurs, [])
})
