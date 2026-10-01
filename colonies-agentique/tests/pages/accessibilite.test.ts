// Liste d'accessibilité de 07 §8 sur la page-pilote : les critères mesurables (TV0.1 à TV0.7). Le lecteur d'écran et la revue
// des flashs restent manuels (evaluation/accessibilite-p1-v1-pont.md).
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import type { Page } from 'playwright'
import type { PageSummary } from '../../src/analysis/descriptif.ts'
import type { PageDefinition } from '../../src/browser/contrat.ts'
import { RACINE } from '../../src/cli/run.ts'
import { donnees, navigateur } from './aide.ts'

const ouvrir = navigateur()
const lire = <T>(f: string) => JSON.parse(fs.readFileSync(path.join(RACINE, f), 'utf8')) as T
const pilote = () => donnees(lire<PageDefinition>('pages/p1-v1-pont.json'), lire<PageSummary>('data/results/P1/T1.1.summary.json'))
const niveau = (page: Page, nom: string) => page.locator('nav').getByRole('button', { name: nom }).click()

/** Rapport de contraste WCAG entre deux couleurs #rrggbb (seuil sRGB 0,04045). */
function contraste(a: string, b: string): number {
  const L = (h: string) => {
    const [r, g, bl] = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    return 0.2126 * r! + 0.7152 * g! + 0.0722 * bl!
  }
  const [x, y] = [L(a), L(b)].sort((p, q) => q - p)
  return (x! + 0.05) / (y! + 0.05)
}

test('UC-010 nominal : TV0.1 les couleurs d\'identité et le trait des composants ont au moins 3:1 sur #FFFFFF et sur #121212', () => {
  const styles = fs.readFileSync(path.join(RACINE, 'outils', 'construire-pages.ts'), 'utf8')
  const jeton = (nom: string) => styles.match(new RegExp(`--${nom}:(#[0-9A-Fa-f]{6})`))![1]!
  for (const nom of ['fourmi', 'abeille', 'agent', 'trait'])
    for (const fond of ['#FFFFFF', '#121212']) assert.ok(contraste(jeton(nom), fond) >= 3, `${nom} ${jeton(nom)} sur ${fond} : ${contraste(jeton(nom), fond).toFixed(2)}`)
})

test('UC-010 nominal : TV0.2 aucun texte n\'est écrit dans une couleur d\'identité (le contraste du texte est contrôlé par axe-core)', async () => {
  const { page } = await ouvrir(pilote(), 'page.html', { reduit: true })
  await page.getByRole('button', { name: 'Passer' }).click()
  await page.locator('section:not([hidden]) .resultat .comparaison').waitFor()
  const couleurs = await page.$$eval('body *', (es: any[]) => { const g = (globalThis as any).getComputedStyle; return [...new Set(es.filter(e => e.innerText?.trim() && g(e).display !== 'none').map(e => g(e).color))] })
  for (const c of ['rgb(213, 94, 0)', 'rgb(0, 114, 178)', 'rgb(204, 121, 167)']) assert.ok(!couleurs.includes(c), `texte en couleur d'identité : ${c}`)
})

test('UC-010 nominal : TV0.4 à 320 × 256 px CSS, aucun niveau ne défile horizontalement et aucune commande ne disparaît', async () => {
  const { page } = await ouvrir(pilote(), 'page.html', { reduit: true })
  await page.setViewportSize({ width: 320, height: 256 })
  const debordement = () => page.evaluate(() => { const d = (globalThis as any).document.documentElement; return d.scrollWidth - d.clientWidth })
  assert.ok(await debordement() <= 0, `Voir : ${await debordement()} px`)
  await niveau(page, 'Explorer'); await page.locator('.etiquette-calcul', { hasText: '1000 sur 1000' }).waitFor({ timeout: 30_000 })
  assert.ok(await debordement() <= 0, `Explorer : ${await debordement()} px`)
  await niveau(page, 'Vérifier')
  assert.ok(await debordement() <= 0, `Vérifier : ${await debordement()} px`)
  const cachees = await page.$$eval('section:not([hidden]) button, section:not([hidden]) input', es => es.filter(e => e.getBoundingClientRect().width === 0).length)
  assert.equal(cachees, 0)
})

test('UC-010 nominal : TV0.5 chaque commande mesure au moins 24 × 24 px CSS (liens en ligne du texte : exception de 2.5.8)', async () => {
  const { page } = await ouvrir(pilote(), 'page.html', { reduit: true })
  for (const n of ['Voir', 'Explorer', 'Vérifier']) {
    await niveau(page, n)
    const petites = await page.$$eval('button:not([hidden]), input, select', es => es.filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.width < 24 || r.height < 24) }).map(e => e.outerHTML.slice(0, 80)))
    assert.deepEqual(petites, [], n)
  }
})

test('UC-010 A2 : TV0.6 un mouvement de plus de 5 s offre une pause; en mouvement réduit, aucune animation automatique', async () => {
  const anime = await ouvrir(pilote())   // rythmeMs = 8 000
  await anime.page.getByRole('button', { name: 'Passer' }).click()
  await anime.page.getByRole('button', { name: 'Pause' }).waitFor()
  const reduit = await ouvrir(pilote(), 'reduit.html', { reduit: true })
  await reduit.page.getByRole('button', { name: 'Passer' }).click()
  await reduit.page.locator('section:not([hidden]) .resultat .comparaison').waitFor({ timeout: 5_000 })
  assert.equal(await reduit.page.getByRole('button', { name: 'Pause' }).count(), 0)
})

test('UC-010 nominal : TV0.7 toutes les fonctions au clavier seul, focus visible et non masqué', async () => {
  const { page } = await ouvrir(pilote(), 'page.html', { reduit: true })
  const vus: string[] = []
  for (let i = 0; i < 30; i++) {   // un tour complet de l'ordre de tabulation, jusqu'au retour au document
    await page.keyboard.press('Tab')
    const f = await page.evaluate(() => {
      const document = (globalThis as any).document, getComputedStyle = (globalThis as any).getComputedStyle
      const e = document.activeElement
      if (e === document.body) return null
      e.scrollIntoView({ block: 'nearest' })
      const r = e.getBoundingClientRect(), centre = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)
      return { nom: e.id || e.textContent?.trim() || e.tagName, contour: getComputedStyle(e).outlineStyle, visible: !!centre && (centre === e || e.contains(centre)) }
    })
    if (!f) break
    vus.push(f.nom)
    assert.notEqual(f.contour, 'none', `focus invisible sur ${f.nom}`)
    assert.ok(f.visible, `focus masqué sur ${f.nom}`)
  }
  for (const attendu of ['Voir', 'Explorer', 'Vérifier', 'prediction', 'Lancer', 'Passer']) assert.ok(vus.includes(attendu), `${attendu} absent de l'ordre de tabulation : ${vus.join(', ')}`)
  await page.focus('#prediction')
  const avant = Number(await page.inputValue('#prediction'))
  await page.keyboard.press('ArrowRight')
  assert.equal(Number(await page.inputValue('#prediction')), avant + 0.05)
  await page.getByRole('button', { name: 'Passer' }).focus()
  await page.keyboard.press('Enter')
  await page.locator('section:not([hidden]) .resultat .comparaison').waitFor()
  await page.locator('nav').getByRole('button', { name: 'Explorer' }).focus()
  await page.keyboard.press('Space')
  assert.equal(await page.locator('section:not([hidden]) h2').innerText(), 'Explorer')
  await page.getByRole('button', { name: 'Suivre un individu' }).focus()
  await page.keyboard.press('Enter')
  await page.locator('.individu h3').waitFor()
  await page.locator('nav').getByRole('button', { name: 'Voir' }).focus()
  await page.keyboard.press('Enter')
  await page.getByRole('button', { name: 'Étape suivante' }).focus()
  await page.keyboard.press('Enter')
  assert.equal(await page.evaluate(() => (globalThis as any).document.activeElement?.textContent), 'Étape 2 sur 3', 'le focus passe au titre de l’étape suivante')
})

test('UC-011 nominal : TV0.7 les messages d\'état passent par role="status" sans déplacer le focus', async () => {
  const { page } = await ouvrir(pilote(), 'page.html', { reduit: true })
  await page.getByRole('button', { name: 'Passer' }).focus()
  await page.keyboard.press('Enter')
  await page.locator('section:not([hidden]) .resultat .comparaison').waitFor()
  assert.equal(await page.locator('[role="status"]').innerText(), 'Résultat affiché.')
  assert.equal(await page.evaluate(() => (globalThis as any).document.activeElement?.textContent), 'Passer')
})
