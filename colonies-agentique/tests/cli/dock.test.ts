import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { aligner } from '../../src/cli/dock.ts'
import { RACINE } from '../../src/cli/run.ts'
import { dossierTemp } from './aide.ts'

// Dépôt jouet : M1c en EDO (déterministe) et à N fini (SSA), plans écrits par chaque test.
const ode = JSON.parse(fs.readFileSync(path.join(RACINE, 'scenarios/p5-seeley-2012/m1c-sigma10.json'), 'utf8'))
const ssa = JSON.parse(fs.readFileSync(path.join(RACINE, 'scenarios/p5-seeley-2012/m1c-ssa.json'), 'utf8'))
const CELLULES = [{ id: 's1', parameters: { sigma: 1 } }, { id: 's10', parameters: { sigma: 10 } }]
const ORACLE = { cells: { s1: { estimate: 0.4585, se: 0.0002 }, s10: { estimate: 0.8497, se: 0.0002 } } }

function depot(plan: Record<string, unknown>, oracle: unknown = ORACLE) {
  const racine = dossierTemp()
  for (const d of ['scenarios', 'docking', 'data/oracles']) fs.mkdirSync(path.join(racine, d), { recursive: true })
  fs.writeFileSync(path.join(racine, 'scenarios', 'ode.json'), JSON.stringify({ ...ode, time: { ...ode.time, horizon: 200, sampling: 200 } }))
  fs.writeFileSync(path.join(racine, 'scenarios', 'ssa.json'), JSON.stringify(ssa))
  fs.writeFileSync(path.join(racine, 'data', 'oracles', 'oracle.json'), JSON.stringify(oracle))
  fs.writeFileSync(path.join(racine, 'docking', `${plan.id}.json`), JSON.stringify(plan))
  const rapport = path.join(racine, 'data', 'docking', `${plan.id}.report.json`)
  const lancer = () => { const lignes: string[] = []; return { code: aligner(plan.id as string, { racine, journal: l => lignes.push(l), git: () => ({ commit: 'abc123', cleanTree: true }) }), lignes } }
  return { racine, rapport, lancer, lire: () => JSON.parse(fs.readFileSync(rapport, 'utf8')) }
}
const implantations = (modifs: Record<string, unknown> = {}) => ({ id: 'impl', level: 'implementations', candidate: { scenario: 'scenarios/ode.json' }, reference: { oracle: 'data/oracles/oracle.json' }, cells: CELLULES, observable: { name: 'A' }, repetitions: 1, masterSeed: '20261001', ...modifs })

test('UC-005 nominal : un docking d\'implantations compare chaque cellule à l\'oracle, écrit le rapport, affiche écarts et issue aligned, et sort à 0', () => {
  const d = depot(implantations())
  const r = d.lancer()
  assert.equal(r.code, 0, r.lignes.join('\n'))
  assert.match(r.lignes[0]!, /^Docking impl : candidat scenarios\/ode\.json, référence data\/oracles\/oracle\.json, niveau implementations$/)
  assert.match(r.lignes[1]!, /^  s1 : écart .*, \|écart\| ≤ 3 ES combinées .* : aligné$/)
  assert.equal(r.lignes.at(-1), 'Issue : aligned')
  const rapport = d.lire()
  assert.deepEqual([rapport.outcome, rapport.code.commit, rapport.seeds.master, rapport.cells.length], ['aligned', 'abc123', '20261001', 2])
  assert.ok(rapport.scenarios['scenarios/ode.json'])
})

test('UC-005 A1 : un plan invalide est refusé avec le champ et la règle, sans exécution ni fichier', () => {
  for (const [modifs, attendu] of [
    [{ level: 'approximatif' }, /level : implementations, relational ou distributional/],
    [{ cells: [{ id: 's1', parameters: { zeta: 1 } }] }, /cells\.s1 : paramètre inconnu du scénario candidat : zeta/],
    [{ cells: [{ id: 's5', parameters: { sigma: 5 } }] }, /reference\.oracle : cellule absente de l'oracle : s5/],
    [{ observable: { name: 'Z' } }, /observable : mesure inconnue du modèle candidat : Z/],
    [{ level: 'distributional', reference: { scenario: 'scenarios/ode.json' } }, /margin : requise au niveau distributional/],
    [{ level: 'relational' }, /relations : au moins une relation/],
  ] as const) {
    const d = depot(implantations(modifs))
    const r = d.lancer()
    assert.equal(r.code, 1)
    assert.match(r.lignes.join('\n'), new RegExp(`Plan de docking invalide : ${attendu.source}`))
    assert.ok(!fs.existsSync(d.rapport))
  }
})

test('UC-005 A2 : un docking distributionnel sous-puissant est refusé avec n prévu, n requis et marge, sans exécution ni fichier', () => {
  const d = depot({ ...implantations(), id: 'dist', level: 'distributional', candidate: { scenario: 'scenarios/ssa.json' }, reference: { scenario: 'scenarios/ssa.json' }, observable: { name: 'D', threshold: { op: '>', value: 0.3 } }, margin: { delta: 5, scale: 'points' }, planning: { p: 0.5 }, repetitions: 10 })
  const r = d.lancer()
  assert.equal(r.code, 1)
  assert.equal(r.lignes.at(-1), 'Plan refusé : n prévu = 10, n requis = 1713 pour la marge 0.05')
  assert.ok(!fs.existsSync(d.rapport))
})

test('UC-005 A3 et BR-036 : un désaccord écrit un rapport not-aligned, nomme les cellules en défaut et sort non nul; il n\'est jamais remplacé en silence', () => {
  const d = depot(implantations(), { cells: { s1: { estimate: 0.4585, se: 0.0002 }, s10: { estimate: 0.5, se: 0.0002 } } })
  const r = d.lancer()
  assert.equal(r.code, 1)
  assert.equal(r.lignes.at(-1), 'Docking non aligné : s10')
  assert.equal(d.lire().outcome, 'not-aligned')
  const encore = d.lancer()
  assert.deepEqual([encore.code, encore.lignes], [1, ['Docking refusé : impl a déjà un rapport not-aligned; une nouvelle tentative porte un nouvel identifiant (BR-036)']])
})

test('UC-005 BR-034 : candidat et référence reçoivent les mêmes graines; l\'analyse appariée d\'un modèle contre lui-même donne un écart nul', () => {
  const d = depot({ ...implantations(), id: 'apparie', level: 'distributional', candidate: { scenario: 'scenarios/ssa.json' }, reference: { scenario: 'scenarios/ssa.json' }, cells: [{ id: 'n50', parameters: { N: 50 } }], observable: { name: 'D' }, margin: { delta: 0.05, scale: 'absolute' }, planning: { sd: 0.1 }, repetitions: 70 })
  const r = d.lancer()
  assert.equal(r.code, 0, r.lignes.join('\n'))
  assert.match(r.lignes[1]!, /n50 : écart 0, IC à 90 % \[0 ; 0\] dans ±0\.05 : aligné/)
})

test('UC-005 BR-035 : au niveau relational, chaque relation déclarée a le signe attendu avec un IC à 95 % qui exclut 0 (T0.7)', () => {
  const plan = JSON.parse(fs.readFileSync(path.join(RACINE, 'docking', 's0-m1c-edo-ssa.json'), 'utf8'))
  const d = depot({ ...plan, candidate: { scenario: 'scenarios/ssa.json' } })
  const r = d.lancer()
  assert.equal(r.code, 0, r.lignes.join('\n'))
  assert.match(r.lignes[1]!, /s1N50 → s1N200 \(décroît\) : écart -0\.\d+, IC à 95 % \[-0\.\d+ ; -0\.\d+\] .* : aligné/)
  const inverse = depot({ ...plan, id: 'inverse', candidate: { scenario: 'scenarios/ssa.json' }, relations: [{ from: 's1N50', to: 's1N200', expected: 'increasing' }] })
  assert.equal(inverse.lancer().code, 1)
})
