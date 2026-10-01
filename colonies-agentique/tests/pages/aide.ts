// Aides des tests de pages : résumé fabriqué à partir de vraies exécutions du modèle de Goss (petit N),
// définition de page, construction, service HTTP local et navigateur (Chrome installé, sans affichage).
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { after, before } from 'node:test'
import { chromium, type Browser, type Page } from 'playwright'
import { intervalle95, moyenne, erreurType, rangTypique } from '../../src/analysis/descriptif.ts'
import type { DonneesPage, PageDefinition, Resume } from '../../src/browser/contrat.ts'
import { CORE_VERSION } from '../../src/core/manifest.ts'
import { graineDeRepetition } from '../../src/core/random.ts'
import { enregistrer } from '../../src/core/recorder.ts'
import { compileScenario } from '../../src/core/scenario.ts'
import { preparer } from '../../src/models/index.ts'
import { construirePage } from '../../outils/construire-pages.ts'
import { RACINE } from '../../src/cli/run.ts'

export const N = 30
const SCENARIOS = ['fig2a-r1', 'fig2b-r1_4', 'fig2c-r2'].map(n => `scenarios/p1-goss-1989/${n}.json`)
const lire = (f: string) => JSON.parse(fs.readFileSync(path.join(RACINE, f), 'utf8')) as Record<string, any>

/** Résumé au format de UC-006, calculé ici à partir de N exécutions par scénario. */
export function resumeFixture(etat: Resume['state'] = 'frozen', issue: Resume['verdict']['outcome'] = 'satisfied'): Resume {
  const cells = SCENARIOS.map(chemin => {
    const source = lire(chemin)
    const runs = Array.from({ length: N }, (_, i) => {
      const s = compileScenario({ ...source, seed: graineDeRepetition(20261001n, i) })
      const e = enregistrer(preparer(s).sim, s)
      return { valeur: e.colonnes.shortShare!.at(-1)!, empreinte: e.fingerprints.at(-1)!.fnv1a64, graine: s.seed, hash: s.hash }
    })
    const values = runs.map(r => r.valeur), rep = rangTypique(values)
    return {
      scenario: chemin, scenarioHash: runs[0]!.hash, source, n: N, mean: moyenne(values), se: erreurType(values), interval95: intervalle95(values), values, missing: 0,
      params: Object.fromEntries(Object.entries(source.parameters as Record<string, { value: number }>).map(([k, p]) => [k, p.value])),
      replay: { rep, seed: runs[rep]!.graine, fnv1a64: runs[rep]!.empreinte },
    }
  })
  return {
    schema: 1, target: 'T1.1', targetHash: '0'.repeat(16), regime: etat === 'frozen' ? 'confirmatory' : 'exploratory', state: etat, level: 'distributional',
    margin: { delta: 5, scale: 'points' }, ...(etat === 'blocked' ? { blockedReason: 'fiche de reproduction à rédiger' } : {}),
    verdict: { id: 'T1.1', outcome: issue, provisional: etat === 'provisional', measured: cells[0]!.mean, mcStandardError: 0.01, n: 3 * N, deviations: ['D-1-001'], criteria: [] },
    provenance: { commit: 'abc1234', engine: { kind: 'node', version: process.versions.node, platform: process.platform, arch: process.arch }, coreVersion: CORE_VERSION, masterSeed: '20261001' },
    preregisteredN: N, measure: 'shortShare', toConfirm: ['k'], cells,
  }
}

export function definitionFixture(modifs: Partial<PageDefinition> = {}): PageDefinition {
  const conclusion = { texte: 'Plus la branche longue est longue, plus la courte attire de trafic.', statut: 'simplifie' as const }
  return {
    id: 'essai-pont', titre: 'Le pont à mémoire', public: 'étudiants', projet: 'P1', taxon: { latin: 'Linepithema humile', preset: 'pont-Goss' }, duree: '10 min',
    niveaux: ['voir', 'explorer', 'verifier'], cible: 'T1.1', rythmeMs: 600,
    mesure: { nom: 'shortShare', etiquette: 'part du trafic sur la courte', unite: 'fraction' },
    graphe: { nom: 'p0', etiquette: 'probabilité de prendre la courte au nid', unite: 'probabilité' },
    voir: { etapes: [0, 1, 2].map(cellule => ({ question: 'Quelle part du trafic passera par la branche courte ?', variable: 'r', cellule, prediction: { min: 0, max: 1, pas: 0.05 }, conclusion, nePasConfondre: 'La fourmi ne mesure pas la longueur des branches.' })) },
    explorer: {
      cellule: 2, repetitions: 10,
      parametres: [{ nom: 'k', etiquette: 'Attrait d’une branche sans phéromone (k)', min: 1, max: 1000, pas: 1 }, { nom: 'n', etiquette: 'Non-linéarité du choix (n)', min: 1, max: 4, pas: 1 }],
      leurre: { etiquette: 'Autorité de la reine sur le choix', unite: 'sans unité', min: 0, max: 10, pas: 1, revelation: 'Ce réglage n’existe pas dans le modèle publié : la reine ne règle pas le choix d’une branche.' },
      defi: { texte: 'trouver un réglage où la courte ne prend pas plus de 60 % du trafic', sens: '<=', seuil: 0.6 },
      individus: [{ etiquette: 'fourmi au nid', regle: 'Au nid : courte {S0}, longue {L0} → probabilité de prendre la courte {p0}' }, { etiquette: 'fourmi à la nourriture', regle: 'À la nourriture : courte {S1}, longue {L1} → probabilité {p1}' }],
    },
    carte: { relation: 'rétroaction positive proportionnelle au succès', ouCasse: 'la piste persiste sans émetteur', statut: 'analogie', source: 'Goss et al. 1989' },
    limites: 'Un module du pont; arrivées de Bernoulli; aucune évaporation.',
    ...modifs,
  }
}

export const donnees = (definition = definitionFixture(), resume = resumeFixture()): DonneesPage => ({ definition, resume, version: { coreVersion: CORE_VERSION, commit: 'abc1234def' } })

/** Navigateur partagé par le fichier de test, et ouverture d'une page construite. */
export function navigateur() {
  let b: Browser
  const dossier = fs.mkdtempSync(path.join(os.tmpdir(), 'pages-'))
  let serveur: http.Server, base = ''
  before(async () => {
    b = await chromium.launch({ channel: 'chrome' })
    serveur = http.createServer((req, res) => {
      const f = path.join(dossier, path.basename(decodeURIComponent((req.url ?? '/').split('?')[0]!)))
      if (!fs.existsSync(f)) { res.writeHead(404).end(); return }
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(fs.readFileSync(f))
    })
    await new Promise<void>(ok => serveur.listen(0, '127.0.0.1', ok))
    base = `http://127.0.0.1:${(serveur.address() as { port: number }).port}/`
  })
  after(async () => { await b.close(); serveur.close(); fs.rmSync(dossier, { recursive: true, force: true }) })
  return async (d: DonneesPage, nom = 'page.html', options: { reduit?: boolean } = {}): Promise<{ page: Page; requetes: string[]; erreurs: string[] }> => {
    fs.writeFileSync(path.join(dossier, nom), await construirePage(d))
    const contexte = await b.newContext({ reducedMotion: options.reduit ? 'reduce' : 'no-preference' })
    const page = await contexte.newPage(), requetes: string[] = [], erreurs: string[] = []
    page.on('request', r => requetes.push(r.url()))
    page.on('pageerror', e => erreurs.push(e.message))
    page.on('console', m => { if (m.type() === 'error') erreurs.push(m.text()) })
    await page.goto(base + nom)
    await page.waitForSelector('body[data-pret="oui"]')
    return { page, requetes, erreurs }
  }
}

/** Règle un curseur natif comme le ferait le lecteur (input puis change). */
export const regler = (page: Page, selecteur: string, valeur: number) =>
  page.$eval(selecteur, (e, v) => { const i = e as unknown as { value: string; dispatchEvent(x: Event): boolean }; i.value = String(v); i.dispatchEvent(new Event('input', { bubbles: true })); i.dispatchEvent(new Event('change', { bubbles: true })) }, valeur)
