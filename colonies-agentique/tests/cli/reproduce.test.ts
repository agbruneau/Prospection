import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import type { RunManifest, Verdict } from '../../src/core/manifest.ts'
import { graineDeRepetition } from '../../src/core/random.ts'
import { reproduire } from '../../src/cli/reproduce.ts'
import { dossierTemp, scenarioM1c } from './aide.ts'

// Dépôt jouet : scénarios M1c (EDO, déterministe) et M1c à N fini (SSA), cibles écrites par chaque test.
const p = (value: number) => ({ value, unit: '1', source: 'Seeley et al. 2012, SOM, Fig. S3', status: 'published' })
const ode = scenarioM1c({ time: { unit: 'cycle', dt: 0.01, horizon: 200, sampling: 200 }, measures: ['A', 'B'] })
const ssa = scenarioM1c({
  model: { id: 'p5-seeley-2012-ssa', version: '1', article: 'Seeley et al. 2012' }, time: { unit: 'cycle', dt: 40, horizon: 40, sampling: 40 },
  streams: ['agents'], parameters: { sigma: p(10), gamma: p(3), alpha: p(1 / 3), rho: p(3), N: p(50) }, initial: { A: 0, B: 0 }, measures: ['D'],
})
const egalA = (value: number) => ({ quantity: 'Ψ_A à t = 200', statistic: { measure: 'A' }, test: 'equal', value })
const decisionSsa = { quantity: 'P(|A − B|/N > 0,3)', statistic: { measure: 'D', threshold: { op: '>', value: 0.3 } } }

function cible(id: string, champs: Record<string, unknown>) {
  return {
    id, project: 'P5', state: 'frozen', frozenAt: 'abc123', source: 'Seeley et al. 2012', location: 'SOM, Fig. S3', level: 'identity',
    margin: { delta: 0.001, scale: 'points', justification: 'tolérance de T0.5' }, repetitions: 1, seeds: { master: '20261001', pairing: 'by-repetition' },
    rule: 'satisfaite si |Ψ_A − 0,8497| ≤ 0,001', gates: ['réplication'],
    reading: { equations: 'T', parameters: 'T', protocol: 'T', figure: 'T', dispersion: 'I' },
    scenario: 'scenarios/ode.json', criteria: [egalA(0.8497)], ...champs,
  }
}

/** Crée un dépôt jouet avec les cibles données; renvoie la racine et une fonction d'exécution. */
function depot(cibles: Record<string, unknown>[], git = { commit: 'abc123', cleanTree: true }) {
  const racine = dossierTemp()
  fs.mkdirSync(path.join(racine, 'scenarios'))
  fs.writeFileSync(path.join(racine, 'scenarios', 'ode.json'), JSON.stringify(ode))
  fs.writeFileSync(path.join(racine, 'scenarios', 'ssa.json'), JSON.stringify(ssa))
  fs.writeFileSync(path.join(racine, 'scenarios', 'ssa-s1.json'), JSON.stringify({ ...ssa, parameters: { ...ssa.parameters, sigma: p(1) } }))
  fs.mkdirSync(path.join(racine, 'targets', 'P5'), { recursive: true })
  for (const c of cibles) fs.writeFileSync(path.join(racine, 'targets', 'P5', `${c.id}.json`), JSON.stringify(c))
  const lancer = (argument: string) => {
    const lignes: string[] = []
    const code = reproduire(argument, { racine, git: () => git, journal: l => lignes.push(l) })
    return { code, lignes }
  }
  const resultats = path.join(racine, 'data', 'results', 'P5')
  const verdict = (id: string) => JSON.parse(fs.readFileSync(path.join(resultats, `${id}.verdict.json`), 'utf8')) as { verdict: Verdict; regime: string; runs: { seed: string }[] }
  const manifestes = (id: string) => fs.readdirSync(path.join(resultats, id)).map(f => JSON.parse(fs.readFileSync(path.join(resultats, id, f), 'utf8')) as RunManifest)
  return { racine, lancer, resultats, verdict, manifestes }
}

test('UC-003 nominal : une cible gelée affiche état, niveau et marge, écrit verdict et manifestes, affiche l\'issue avec ES et n, et sort à 0', () => {
  const d = depot([cible('T5.1', {})])
  const r = d.lancer('T5.1')
  assert.equal(r.code, 0, r.lignes.join('\n'))
  assert.equal(r.lignes[0], 'Cible T5.1 : frozen, identity, marge ±0.001 points')
  assert.match(r.lignes.join('\n'), /Ψ_A à t = 200 : satisfied, mesuré 0\.8497 ± 0 \(ES de Monte Carlo\)/)
  assert.equal(r.lignes.at(-1), 'Issue : satisfied, n = 1')
  const v = d.verdict('T5.1')
  assert.deepEqual([v.verdict.outcome, v.verdict.n, v.regime], ['satisfied', 1, 'confirmatory'])
  const [m] = d.manifestes('T5.1')
  assert.deepEqual([m!.regime, m!.model.target, m!.verdict?.outcome], ['confirmatory', 'T5.1', 'satisfied'])
})

test('UC-003 A1 : une cible bloquée affiche sa raison, n\'exécute rien, n\'écrit aucun verdict et sort à 0', () => {
  const d = depot([{ id: 'T5.2', project: 'P5', state: 'blocked', blockedReason: 'paramètres lus dans un résumé seulement' }])
  const r = d.lancer('T5.2')
  assert.deepEqual([r.code, r.lignes.at(-1)], [0, 'Cible bloquée : paramètres lus dans un résumé seulement (à faire)'])
  assert.equal(fs.existsSync(d.resultats), false)
})

test('UC-003 A2 : une cible provisoire s\'exécute en exploratoire et son verdict est marqué « sous réserve »', () => {
  const d = depot([cible('T5.3', { state: 'provisional', frozenAt: undefined })], { commit: 'abc123', cleanTree: false })
  const r = d.lancer('T5.3')
  assert.deepEqual([r.code, r.lignes.at(-1)], [0, 'Issue : satisfied (sous réserve), n = 1'])
  assert.deepEqual([d.verdict('T5.3').verdict.provisional, d.manifestes('T5.3')[0]!.regime], [true, 'exploratory'])
})

test('UC-003 A3 : un plan sous-puissant est refusé avec n prévu, n requis et marge, sans exécution ni fichier', () => {
  const d = depot([cible('T5.4', { level: 'distributional', scenario: 'scenarios/ssa.json', repetitions: 10, margin: { delta: 10, scale: 'points', justification: 'test' }, criteria: [{ ...decisionSsa, test: 'TOST', value: 0.95 }] })])
  const r = d.lancer('T5.4')
  assert.deepEqual([r.code, r.lignes.at(-1)], [1, 'Plan refusé : n prévu = 10, n requis = 82 pour la marge 0.1'])
  assert.equal(fs.existsSync(path.join(d.racine, 'data')), false)
})

test('UC-003 A4 : une issue indéterminée ajoute des répétitions jusqu\'à maxRepetitions, puis conclut ou reste indéterminée', () => {
  // σ = 1 < σ* : P ≈ 0,35 (T0.7), assez loin de 0 et de 1 pour qu'un petit n reste indéterminé
  const plage = (value: [number, number]) => ({ level: 'relational', scenario: 'scenarios/ssa-s1.json', repetitions: 20, maxRepetitions: 200, criteria: [{ ...decisionSsa, test: 'range', value }] })
  const d = depot([cible('T5.5', plage([0.2, 0.5])), cible('T5.6', plage([0.34, 0.36]))])
  const conclut = d.lancer('T5.5')
  assert.ok(conclut.lignes.includes('Issue indéterminée à n = 20 : extension jusqu\'à 200'), conclut.lignes.join('\n'))
  assert.deepEqual([conclut.code, d.verdict('T5.5').verdict.outcome, d.verdict('T5.5').verdict.n], [0, 'satisfied', 200])
  const reste = d.lancer('T5.6')
  assert.deepEqual([d.verdict('T5.6').verdict.outcome, d.verdict('T5.6').verdict.n], ['inconclusive', 200])
  assert.equal(reste.code, 1)
})

test('UC-003 A5 : une cible gelée non satisfaite affiche les critères non remplis et sort avec un code non nul', () => {
  const d = depot([cible('T5.7', { criteria: [egalA(0.5)] })])
  const r = d.lancer('T5.7')
  assert.deepEqual([r.code, r.lignes.at(-2), r.lignes.at(-1)], [1, 'Issue : unsatisfied, n = 1', 'Critère non rempli : Ψ_A à t = 200 (unsatisfied)'])
})

test('UC-003 A6 : un identifiant de projet vérifie chaque cible et affiche le tableau cible, état, issue, n', () => {
  const d = depot([cible('T5.1', {}), { id: 'T5.2', project: 'P5', state: 'blocked', blockedReason: 'à lire' }, cible('T5.10', { state: 'provisional', criteria: [egalA(0.5)] })])
  const r = d.lancer('P5')
  assert.equal(r.code, 0, r.lignes.join('\n'))
  assert.deepEqual(r.lignes.slice(-5), ['| Cible | État | Issue | n |', '|---|---|---|---|', '| T5.1 | frozen | satisfied | 1 |', '| T5.2 | blocked | à faire | 0 |', '| T5.10 | provisional | unsatisfied (sous réserve) | 1 |'])
  fs.writeFileSync(path.join(d.racine, 'targets', 'P5', 'T5.11.json'), JSON.stringify(cible('T5.11', { criteria: [egalA(0.5)] })))
  assert.equal(d.lancer('P5').code, 1)
})

test('UC-003 BR-008 : une cible bloquée n\'est jamais exécutée ni comptée satisfaite', () => {
  const d = depot([{ id: 'T5.2', project: 'P5', state: 'blocked', blockedReason: 'à lire' }])
  const r = d.lancer('P5')
  assert.ok(r.lignes.includes('| T5.2 | blocked | à faire | 0 |'))
  assert.equal(fs.existsSync(d.resultats), false)
})

test('UC-003 BR-009 : une cible provisoire ne produit que des exécutions exploratoires et un verdict « sous réserve », jamais compté satisfait', () => {
  const d = depot([cible('T5.3', { state: 'provisional' })])
  const r = d.lancer('P5')
  assert.ok(d.manifestes('T5.3').every(m => m.regime === 'exploratory'))
  assert.ok(r.lignes.includes('| T5.3 | provisional | satisfied (sous réserve) | 1 |'))
})

test('UC-003 BR-010 : un TOST dont le n prévu est inférieur au n requis est refusé avant toute exécution', () => {
  const tostSsa = (repetitions: number) => cible('T5.4', { level: 'distributional', scenario: 'scenarios/ssa.json', repetitions, margin: { delta: 10, scale: 'points', justification: 'test' }, criteria: [{ ...decisionSsa, test: 'TOST', value: 0.95 }] })
  assert.equal(depot([tostSsa(81)]).lancer('T5.4').code, 1)
  const d = depot([tostSsa(82)])
  const r = d.lancer('T5.4')
  assert.equal(r.code, 0, r.lignes.join('\n'))
  assert.equal(d.verdict('T5.4').verdict.n, 82)
})

test('UC-003 BR-011 : une cible gelée s\'exécute sur sa liste de graines gelée, sans ajustement, et cite ses déviations', () => {
  const d = depot([cible('T5.8', { scenario: 'scenarios/ssa.json', level: 'relational', repetitions: 5, criteria: [{ ...decisionSsa, test: 'range', value: [0, 1] }], deviations: ['D-5-001'] })])
  d.lancer('T5.8')
  const v = d.verdict('T5.8')
  assert.deepEqual(v.runs.map(r => r.seed), [0, 1, 2, 3, 4].map(i => graineDeRepetition(20261001n, i)))
  assert.deepEqual(v.verdict.deviations, ['D-5-001'])
  for (const m of d.manifestes('T5.8')) assert.deepEqual(m.scenario.compiled.parameters, ssa.parameters)
  const fautive = depot([cible('T5.9', { deviations: ['D5-1'] })]).lancer('T5.9')
  assert.deepEqual([fautive.code, fautive.lignes.at(-1)], [1, 'Cible invalide : deviations : identifiant invalide : D5-1 (D-<projet>-<nnn>)'])
})

test('UC-003 BR-012 : un critère non rempli suffit à rendre la cible non satisfaite', () => {
  const d = depot([cible('T5.1', { criteria: [egalA(0.8497), { quantity: 'Ψ_B à t = 200', statistic: { measure: 'B' }, test: 'equal', value: 0.5 }] })])
  const r = d.lancer('T5.1')
  assert.equal(d.verdict('T5.1').verdict.outcome, 'unsatisfied')
  assert.deepEqual(d.verdict('T5.1').verdict.criteria.map(c => c.outcome), ['satisfied', 'unsatisfied'])
  assert.equal(r.lignes.at(-1), 'Critère non rempli : Ψ_B à t = 200 (unsatisfied)')
})

test('UC-003 BR-013 : code non nul seulement pour une cible gelée défavorable ou un plan refusé', () => {
  const d = depot([
    cible('T5.1', {}), { id: 'T5.2', project: 'P5', state: 'blocked', blockedReason: 'à lire' },
    cible('T5.3', { state: 'provisional', criteria: [egalA(0.5)] }), cible('T5.7', { criteria: [egalA(0.5)] }),
  ])
  assert.deepEqual(['T5.1', 'T5.2', 'T5.3', 'T5.7'].map(id => d.lancer(id).code), [0, 0, 0, 1])
})
