import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { test } from 'node:test'
import type { Page } from 'playwright'
import { validerDefinition } from '../../src/browser/contrat.ts'
import { RACINE } from '../../src/cli/run.ts'
import { construirePage } from '../../outils/construire-pages.ts'
import { definitionFixture, donnees, navigateur, N, regler, resumeFixture } from './aide.ts'

const ouvrir = navigateur()
const resume = resumeFixture()
const texte = (page: Page, s: string) => page.locator(s).first().innerText()
const lancerEtape = async (page: Page, prediction = true) => {
  await page.getByRole('button', { name: prediction ? 'Lancer' : 'Passer' }).click()
  await page.locator('section:not([hidden]) .resultat .comparaison').waitFor()
}
const niveau = (page: Page, nom: string) => page.locator('nav').getByRole('button', { name: nom }).click()
const finExplorer = (page: Page) => page.locator('.etiquette-calcul', { hasText: `10 sur 10` }).waitFor()

test('UC-010 nominal : chaque étape propose une question, une prédiction, l’exécution typique, la distribution, la conclusion et finit sur la carte agentique', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  for (let i = 0; i < 3; i++) {
    assert.match(await texte(page, 'section:not([hidden]) h3'), new RegExp(`Étape ${i + 1} sur 3`))
    assert.match(await texte(page, 'section:not([hidden])'), /Variable de l’étape : r = /)
    await regler(page, '#prediction', 0.7)
    await lancerEtape(page)
    const resultat = await texte(page, 'section:not([hidden]) .resultat')
    assert.match(resultat, /Votre prédiction : 0,7/)
    assert.match(resultat, /Exécution typique : .* médiane : .* intervalle à 95 % des exécutions/)
    assert.match(resultat, /Ce que ça ne veut pas dire/)
    assert.equal(await page.locator('section:not([hidden]) .resultat .enonce').first().getAttribute('data-statut'), 'simplifie')
    if (i < 2) await page.getByRole('button', { name: 'Étape suivante' }).click()
  }
  assert.match(await texte(page, 'section:not([hidden]) .carte'), /Carte agentique[\s\S]*rétroaction positive/)
})

test('UC-010 A1 : une prédiction passée joue l’exécution typique et affiche le résultat sans comparaison', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await lancerEtape(page, false)
  const r = await texte(page, 'section:not([hidden]) .resultat')
  assert.match(r, /Prédiction passée/)
  assert.doesNotMatch(r, /Votre prédiction/)
  assert.match(r, /Ce que ça ne veut pas dire/)
})

test('UC-010 A2 : la pause suspend la lecture, qui reprend là où elle s’était arrêtée', async () => {
  const { page } = await ouvrir(donnees(definitionFixture({ rythmeMs: 4000 }), resume))
  await page.getByRole('button', { name: 'Lancer' }).click()
  const pause = page.getByRole('button', { name: 'Pause' })
  await pause.waitFor()
  await page.waitForTimeout(400)
  await pause.click()
  const lecture = page.getByRole('button', { name: 'Lecture' })
  const avant = Number(await lecture.getAttribute('data-progression'))
  await page.waitForTimeout(800)
  const pendant = Number(await lecture.getAttribute('data-progression'))
  assert.ok(avant > 0 && avant < 1 && Math.abs(pendant - avant) < 0.02, `${avant} puis ${pendant}`)
  await page.getByRole('button', { name: 'Lecture' }).click()
  await page.locator('section:not([hidden]) .resultat .comparaison').waitFor()
})

test('UC-010 BR-017 : aucune exécution n’est montrée sans sa distribution sur les N graines du résumé', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await lancerEtape(page)
  assert.match(await texte(page, 'section:not([hidden]) .distribution figcaption'), new RegExp(`n = ${N} sur N = ${N}`))
  await niveau(page, 'Explorer')
  await finExplorer(page)
  assert.equal(await page.locator('section:not([hidden]) .distribution').count(), 1)
  await niveau(page, 'Vérifier')
  assert.equal(await page.locator('section:not([hidden]) .distribution').count(), 3)
})

test('UC-010 BR-018 : l’exécution du niveau Voir est la répétition typique du résumé', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await lancerEtape(page)
  assert.equal(await page.locator('section:not([hidden]) .scene').getAttribute('data-graine'), resume.cells[0]!.replay.seed)
  const typique = resume.cells[0]!.values[resume.cells[0]!.replay.rep]!
  assert.match(await texte(page, 'section:not([hidden]) .comparaison'), new RegExp(`typique \\(annoncée comme telle\\) : ${typique.toLocaleString('fr-CA', { maximumFractionDigits: 3 }).replace(/\s/g, '\\s')}`))
})

test('UC-010 BR-019 : chaque énoncé et chaque figure porte un statut de la liste fermée et un régime, aux trois niveaux', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await lancerEtape(page)
  await niveau(page, 'Explorer'); await finExplorer(page)
  await niveau(page, 'Vérifier')
  const attributs = await page.$$eval('.enonce, figure', es => es.map(e => [e.getAttribute('data-statut'), e.getAttribute('data-regime')]))
  assert.ok(attributs.length >= 6)
  for (const [s, r] of attributs) {
    assert.ok(['reproduit', 'publie', 'simplifie', 'hypothese', 'analogie'].includes(s ?? ''), `statut ${s}`)
    assert.ok(['confirmatoire', 'exploratoire'].includes(r ?? ''), `régime ${r}`)
  }
})

test('UC-010 BR-020 : une définition dont deux étapes successives changent plus d’une variable est refusée au build', () => {
  const r = resumeFixture()
  r.cells[1]!.params = { ...r.cells[1]!.params, phi: 0.4 }
  const erreurs = validerDefinition(definitionFixture(), r)
  assert.ok(erreurs.some(e => /une seule variable doit changer \(r\); changent : .*phi/.test(e)), erreurs.join('\n'))
  assert.deepEqual(validerDefinition(definitionFixture(), resume), [])
})

test('UC-010 nominal : aucune requête réseau ni erreur de console, et aucune violation WCAG 2.2 AA détectée aux trois niveaux', async () => {
  const { page, requetes, erreurs } = await ouvrir(donnees(definitionFixture(), resume))
  await page.addScriptTag({ path: path.join(RACINE, 'node_modules/axe-core/axe.min.js') })
  const verifier = async () => page.evaluate(async () => (await (globalThis as any).axe.run((globalThis as any).document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } })).violations.map((v: any) => `${v.id} : ${v.nodes.length}`))
  await lancerEtape(page)
  assert.deepEqual(await verifier(), [])
  await niveau(page, 'Explorer'); await finExplorer(page)
  assert.deepEqual(await verifier(), [])
  await niveau(page, 'Vérifier')
  assert.deepEqual(await verifier(), [])
  assert.deepEqual(requetes.filter(u => !u.endsWith('/page.html') && !/^(blob|data):/.test(u)), [])   // TV0.12 : seule la page; blob: et data: restent locaux
  assert.deepEqual(erreurs, [])
})

test('UC-010 nominal : deux builds de la page donnent le même hachage (NFR-004)', async () => {
  const d = donnees(definitionFixture(), resume)
  const sha = async () => createHash('sha256').update(await construirePage(d)).digest('hex')
  assert.equal(await sha(), await sha())
})

test('UC-011 nominal : un réglage devient une intervention, relance N exécutions étiquetées et le défi se signale quand il est rempli', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await niveau(page, 'Explorer'); await finExplorer(page)
  assert.match(await texte(page, 'section:not([hidden])'), /Défi : trouver un réglage/)
  assert.match(await page.locator('output[for="param-k"]').innerText(), /20 unité de phéromone \(valeur à confirmer\)/)
  await regler(page, '#param-k', 1000)
  await page.locator('.defi', { hasText: 'Défi réussi' }).waitFor()
  assert.match(await texte(page, '.etiquette-calcul'), /calcul navigateur, non confirmatoire · 10 sur 10/)
})

test('UC-011 A1 : suivre un individu affiche sa règle avec les quantités de l’instant et passe à l’individu suivant', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await niveau(page, 'Explorer'); await finExplorer(page)
  await page.getByRole('button', { name: 'Suivre un individu' }).click()
  assert.match(await texte(page, '.individu'), /Vue de l’agent : fourmi au nid[\s\S]*Au nid : courte \d.*→ probabilité de prendre la courte 0,\d+/)
  await page.getByRole('button', { name: 'Individu suivant' }).click()
  assert.match(await texte(page, '.individu'), /fourmi à la nourriture[\s\S]*À la nourriture : courte/)
})

test('UC-011 A2 : le curseur leurre ne change rien et révèle qu’il est absent du modèle publié', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await niveau(page, 'Explorer'); await finExplorer(page)
  const avant = await texte(page, '.etiquette-calcul + figure figcaption')
  await regler(page, '#leurre', 9)
  await page.locator('.enonce', { hasText: 'n’existe pas dans le modèle publié' }).waitFor()
  await finExplorer(page)
  assert.equal(await texte(page, '.etiquette-calcul + figure figcaption'), avant)
  assert.equal(await page.locator('.enonce', { hasText: 'n’existe pas' }).getAttribute('data-statut'), 'simplifie')
})

test('UC-011 A3 : un gain collectif indéfini s’affiche « indéfini » avec la différence appariée Δ', async () => {
  const d = definitionFixture()
  d.explorer = { ...d.explorer!, gain: { pRef: 0.5, pMax: 0.52, seuil: 0.05 } }
  const { page } = await ouvrir(donnees(d, resume), 'gain.html')
  await niveau(page, 'Explorer'); await finExplorer(page)
  const g = await texte(page, '.enonce:has-text("Gain collectif")')
  assert.match(g, /Gain collectif G : indéfini · différence appariée Δ = -?\d/)
})

test('UC-011 BR-021 : un résultat calculé dans le navigateur est exploratoire et jamais présenté comme Résultat reproduit', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await niveau(page, 'Explorer'); await finExplorer(page)
  const enExplorer = await page.$$eval('section:not([hidden]) .enonce, section:not([hidden]) figure', es => es.map(e => [e.getAttribute('data-statut'), e.getAttribute('data-regime')]))
  for (const [s, r] of enExplorer) { assert.notEqual(s, 'reproduit'); assert.equal(r, 'exploratoire') }
})

test('UC-011 BR-022 : quand G est indéfini, aucun nombre ne le remplace', async () => {
  const d = definitionFixture()
  d.explorer = { ...d.explorer!, gain: { pRef: 0.5, pMax: 0.5, seuil: 0.05 } }
  const { page } = await ouvrir(donnees(d, resume), 'gain2.html')
  await niveau(page, 'Explorer'); await finExplorer(page)
  assert.doesNotMatch(await texte(page, '.enonce:has-text("Gain collectif")'), /G : -?\d/)
})

test('UC-011 BR-023 : chaque réglage figure dans les interventions du manifeste de l’exécution affichée', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await niveau(page, 'Explorer'); await finExplorer(page)
  await regler(page, '#param-n', 3)
  await page.locator('.manifeste', { hasText: '"type": "n"' }).waitFor({ state: 'attached' })
  const m = JSON.parse(await page.locator('section:not([hidden]) .manifeste').textContent() ?? '{}')
  assert.deepEqual(m.interventions, [{ time: 0, type: 'n', value: 3 }])
})

test('UC-011 BR-024 : le leurre est révélé dès son premier usage', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await niveau(page, 'Explorer'); await finExplorer(page)
  assert.equal(await page.locator('.enonce', { hasText: 'n’existe pas' }).count(), 0)
  await regler(page, '#leurre', 1)
  await page.locator('.enonce', { hasText: 'n’existe pas' }).waitFor()
})

test('UC-012 nominal : cible, niveau, marge, verdict, distribution, petits multiples, rejeu d’une cellule et comparaison au manifeste', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await niveau(page, 'Vérifier')
  const s = await texte(page, 'section:not([hidden])')
  for (const motif of [/Cible\s*T1\.1/, /Niveau d’accord visé\s*distributional/, /Marge\s*±5 points/, /Verdict\s*satisfied, n = 90/, /Déviations\s*D-1-001/, /graines : répétitions 0 à 29 de la graine maîtresse 20261001 · moteur node/])
    assert.match(s, motif)
  assert.equal(await page.locator('.cellule').count(), 3)
  await page.locator('[data-cellule="2"]').click()
  await page.locator('.verdict-rejeu').waitFor()
  assert.match(await texte(page, '.verdict-rejeu'), /Autre moteur : trajectoire non garantie identique, distributions équivalentes\. Empreinte finale égale/)
  assert.match(await texte(page, '.rejeu .manifeste'), new RegExp(resume.cells[2]!.replay.seed))
})

test('UC-012 A1 : une cible provisoire ou bloquée s’affiche « non reproduit » ou « bloqué », avec la raison', async () => {
  for (const [etat, issue, attendu] of [['provisional', 'satisfied', /non reproduit : cible provisoire/], ['blocked', 'inconclusive', /bloqué : fiche de reproduction à rédiger/], ['frozen', 'unsatisfied', /non reproduit : issue unsatisfied/]] as const) {
    const { page } = await ouvrir(donnees(definitionFixture(), resumeFixture(etat, issue)), `${etat}.html`)
    await niveau(page, 'Vérifier')
    assert.match(await texte(page, 'section:not([hidden]) .enonce'), attendu)
    assert.equal(await page.locator('section:not([hidden]) [data-statut="reproduit"]').count(), 0)
  }
})

test('UC-012 A2 : une valeur issue d’une source à confirmer porte la mention « valeur à confirmer »', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await niveau(page, 'Vérifier')
  assert.match(await texte(page, '.cellule h4'), /k = 20 unité de phéromone \(valeur à confirmer\)/)
})

test('UC-012 BR-025 : « Résultat reproduit » exige un verdict satisfied d’une cible gelée et porte la mention de réplication', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await niveau(page, 'Vérifier')
  assert.match(await texte(page, 'section:not([hidden]) [data-statut="reproduit"]'), /Résultat reproduit[\s\S]*Réplication d’un modèle publié, non validation empirique/)
  const d = definitionFixture({ carte: { ...definitionFixture().carte, statut: 'reproduit' } })
  assert.ok(validerDefinition(d, resumeFixture('provisional')).some(e => /Résultat reproduit » refusé/.test(e)))
})

test('UC-012 BR-026 : aucune valeur à confirmer ne s’affiche sans sa mention, à aucun niveau', async () => {
  const { page } = await ouvrir(donnees(definitionFixture(), resume))
  await niveau(page, 'Explorer'); await finExplorer(page)
  await niveau(page, 'Vérifier')
  const occurrences = await page.$$eval('output, .cellule h4', es => es.map(e => e.textContent ?? '').filter(t => /\bk = |unité de phéromone/.test(t)))
  assert.ok(occurrences.length > 0)
  for (const t of occurrences) assert.match(t, /valeur à confirmer/)
})
