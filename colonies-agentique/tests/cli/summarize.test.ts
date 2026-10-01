import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { erreurType, intervalle95, moyenne, type PageSummary } from '../../src/analysis/descriptif.ts'
import { reproduire } from '../../src/cli/reproduce.ts'
import { RACINE } from '../../src/cli/run.ts'
import { resumerCible } from '../../src/cli/summarize.ts'
import { dossierTemp, scenarioM1c } from './aide.ts'

// Dépôt jouet : cible provisoire sur deux scénarios SSA (mesure D brute), vérifiée par UC-003, puis résumée;
// T5.2 : pont de Goss (shortShare, part d'une branche parmi deux, déclarée par le modèle).
const p = (value: number, status = 'published') => ({ value, unit: '1', source: 'Seeley et al. 2012, SOM, Fig. S3', status })
const ssa = scenarioM1c({
  model: { id: 'p5-seeley-2012-ssa', version: '1', article: 'Seeley et al. 2012' }, time: { unit: 'cycle', dt: 40, horizon: 40, sampling: 40 },
  streams: ['agents'], parameters: { sigma: p(10, 'to-confirm'), gamma: p(3), alpha: p(1 / 3), rho: p(3), N: p(50) }, initial: { A: 0, B: 0 }, measures: ['D'],
})
const critere = (scenario: string) => ({ quantity: `D (${scenario})`, statistic: { measure: 'D' }, test: 'range', value: [0, 1], scenario })
const CIBLE = {
  id: 'T5.1', project: 'P5', state: 'provisional', source: 'Seeley et al. 2012', location: 'SOM, Fig. S3', level: 'relational',
  repetitions: 8, seeds: { master: '20261001', pairing: 'by-repetition' }, rule: 'D dans [0, 1]', gates: ['réplication'],
  reading: { equations: 'T', parameters: 'T', protocol: 'T', figure: 'T', dispersion: 'I' },
  criteria: [critere('scenarios/ssa-s1.json'), critere('scenarios/ssa.json'), { ...critere('scenarios/ssa.json'), quantity: 'second critère, même scénario' }],
}
const GOSS = { ...CIBLE, id: 'T5.2', rule: 'part dans [0, 1]', criteria: [{ quantity: 'part sur la courte', statistic: { measure: 'shortShare' }, test: 'range', value: [0, 1], scenario: 'scenarios/goss.json' }] }

function depot({ verifier = true, cible = CIBLE } = {}) {
  const racine = dossierTemp()
  fs.mkdirSync(path.join(racine, 'scenarios'))
  fs.writeFileSync(path.join(racine, 'scenarios', 'ssa.json'), JSON.stringify(ssa))
  fs.writeFileSync(path.join(racine, 'scenarios', 'ssa-s1.json'), JSON.stringify({ ...ssa, parameters: { ...ssa.parameters, sigma: p(1) } }))
  fs.copyFileSync(path.join(RACINE, 'scenarios/p1-goss-1989/fig2a-r1.json'), path.join(racine, 'scenarios', 'goss.json'))
  fs.mkdirSync(path.join(racine, 'targets', 'P5'), { recursive: true })
  fs.writeFileSync(path.join(racine, 'targets', 'P5', `${cible.id}.json`), JSON.stringify(cible))
  if (verifier) assert.equal(reproduire(cible.id, { racine, git: () => ({ commit: 'abc123', cleanTree: true }), journal: () => {} }), 0)
  const resultats = path.join(racine, 'data', 'results', 'P5')
  const csv = path.join(resultats, `${cible.id}.runs.csv`), sortie = path.join(resultats, `${cible.id}.summary.json`)
  const lancer = () => { const lignes: string[] = []; return { code: resumerCible(cible.id, { racine, journal: l => lignes.push(l) }), lignes } }
  const resume = () => JSON.parse(fs.readFileSync(sortie, 'utf8')) as PageSummary
  const runs = () => fs.readFileSync(csv, 'utf8').trim().split('\n').slice(1).map(l => l.split(','))
  /** Remplace la colonne de la mesure des lignes d'un scénario (undefined : ligne retirée). */
  const ecrireValeurs = (scenario: string, valeurs: (string | undefined)[]) => {
    let i = 0
    const lignes = fs.readFileSync(csv, 'utf8').trim().split('\n').flatMap(l => {
      const c = l.split(',')
      if (c[0] !== scenario) return [l]
      const v = valeurs[i++]
      return v === undefined ? [] : [[...c.slice(0, 5), v].join(',')]
    })
    fs.writeFileSync(csv, lignes.join('\n') + '\n')
  }
  return { racine, resultats, sortie, lancer, resume, runs, ecrireValeurs }
}

test('UC-006 nominal : le résumé d’une cible vérifiée donne par scénario n, moyenne, erreur-type, intervalle à 95 % et valeurs, la répétition typique, la provenance, et sort à 0', () => {
  const d = depot()
  const r = d.lancer()
  assert.equal(r.code, 0, r.lignes.join('\n'))
  const s = d.resume()
  assert.deepEqual([s.schema, s.target, s.state, s.regime, s.level, s.preregisteredN, s.measure, s.verdict.id], [1, 'T5.1', 'provisional', 'exploratory', 'relational', 8, 'D', 'T5.1'])
  assert.deepEqual(s.provenance, { commit: 'abc123', engine: s.provenance.engine, coreVersion: s.provenance.coreVersion, masterSeed: '20261001' })
  assert.equal(s.provenance.engine.kind, 'node')
  assert.deepEqual(s.toConfirm, ['sigma'])
  // Une cellule par scénario, dans l'ordre des critères; le second critère sur ssa.json n'en ajoute pas.
  assert.deepEqual(s.cells.map(c => c.scenario), ['scenarios/ssa-s1.json', 'scenarios/ssa.json'])
  const runs = d.runs()
  for (const c of s.cells) {
    const lignes = runs.filter(l => l[0] === c.scenario), valeurs = lignes.map(l => Number(l[5]))
    assert.deepEqual(c.values, valeurs)
    assert.deepEqual([c.n, c.missing, c.mean, c.se, c.interval95], [8, 0, moyenne(valeurs), erreurType(valeurs), intervalle95(valeurs)])
    assert.deepEqual(c.replay, { rep: c.replay.rep, seed: lignes[c.replay.rep]![2], fnv1a64: lignes[c.replay.rep]![4], statistic: 'value' })
    assert.deepEqual(c.source, JSON.parse(fs.readFileSync(path.join(d.racine, c.scenario), 'utf8')))
    assert.equal(c.params.sigma, c.scenario.endsWith('s1.json') ? 1 : 10)
  }
  assert.deepEqual(r.lignes, ['Résumé : data/results/P5/T5.1.summary.json (N = 8)', ...s.cells.map(c => `  ${c.scenario} : répétition typique ${c.replay.rep}, graine ${c.replay.seed}, valeur ${c.values[c.replay.rep]}`)])
  const avant = fs.readFileSync(d.sortie, 'utf8')
  d.lancer()
  assert.equal(fs.readFileSync(d.sortie, 'utf8'), avant, 'deux résumés des mêmes sorties sont identiques')
})

test('UC-006 A1 : sans verdict ou sans liste des répétitions, le résumé est refusé, sans fichier, avec un code non nul', () => {
  const sansVerdict = depot({ verifier: false })
  assert.deepEqual(sansVerdict.lancer(), { code: 1, lignes: ['Résumé impossible : cible T5.1 non vérifiée'] })
  assert.ok(!fs.existsSync(sansVerdict.sortie))
  const sansRuns = depot()
  fs.rmSync(path.join(sansRuns.resultats, 'T5.1.runs.csv'))
  assert.deepEqual(sansRuns.lancer(), { code: 1, lignes: ['Résumé impossible : cible T5.1 non vérifiée'] })
  assert.ok(!fs.existsSync(sansRuns.sortie))
})

test('UC-006 A2 : une cible ou un scénario modifié depuis le verdict est refusé, sans fichier, avec un code non nul', () => {
  const d = depot()
  const fichierCible = path.join(d.racine, 'targets', 'P5', 'T5.1.json')
  fs.writeFileSync(fichierCible, JSON.stringify({ ...CIBLE, rule: 'règle modifiée' }))
  assert.deepEqual(d.lancer(), { code: 1, lignes: ['Résumé impossible : targets/P5/T5.1.json modifié depuis le verdict de T5.1'] })
  fs.writeFileSync(fichierCible, JSON.stringify(CIBLE, null, 2))   // même contenu, autre mise en forme : inchangé
  fs.writeFileSync(path.join(d.racine, 'scenarios', 'ssa.json'), JSON.stringify({ ...ssa, time: { ...ssa.time, horizon: 80 } }))
  assert.deepEqual(d.lancer(), { code: 1, lignes: ['Résumé impossible : scenarios/ssa.json modifié depuis le verdict de T5.1'] })
  assert.ok(!fs.existsSync(d.sortie))
})

test('UC-006 BR-027 : la répétition typique est la plus proche de la médiane, et la plus petite par rang en cas d’égalité', () => {
  const d = depot()
  // médiane 0,5; les rangs 2, 3, 6 et 7 sont tous à 0,125 de la médiane (valeurs dyadiques : égalité exacte).
  d.ecrireValeurs('scenarios/ssa.json', ['0.75', '0.125', '0.625', '0.375', '0.875', '0.25', '0.375', '0.625'])
  assert.equal(d.lancer().code, 0)
  const c = d.resume().cells[1]!
  assert.equal(c.replay.rep, 2)
  assert.equal(c.replay.seed, d.runs().filter(l => l[0] === 'scenarios/ssa.json')[2]![2])
})

test('UC-006 BR-027 : pour une part entre deux options déclarée par le modèle, la répétition typique se choisit sur la part majoritaire max(s, 1 − s)', () => {
  const d = depot({ cible: GOSS })
  // Parts majoritaires 0,5; 0,875; 0,875; 0,75; 0,75; 0,5625; 0,9375; 0,9375 : médiane 0,8125, rangs 1 à 4 à égalité.
  // Sur la valeur brute, la typique serait le rang 0 (0,5, au creux de la distribution).
  d.ecrireValeurs('scenarios/goss.json', ['0.5', '0.125', '0.875', '0.75', '0.25', '0.5625', '0.9375', '0.0625'])
  assert.equal(d.lancer().code, 0)
  assert.deepEqual([d.resume().cells[0]!.replay.rep, d.resume().cells[0]!.replay.statistic], [1, 'majority-share'])
})

test('UC-006 BR-028 : le résumé n’exécute aucune simulation : il reprend les valeurs de la liste des répétitions', () => {
  const d = depot()
  // Valeurs impossibles pour le modèle (D ∈ [0, 1]) : seule une lecture du fichier peut les produire.
  const lues = ['41', '42', '43', '44', '45', '46', '47', '48']
  d.ecrireValeurs('scenarios/ssa-s1.json', lues)
  assert.equal(d.lancer().code, 0)
  assert.deepEqual(d.resume().cells[0]!.values, lues.map(Number))
})

test('UC-006 BR-029 : une répétition sans valeur reste comptée dans N et listée comme manquante, jamais retirée', () => {
  const d = depot()
  const v = d.runs().filter(l => l[0] === 'scenarios/ssa.json').map(l => l[5])
  d.ecrireValeurs('scenarios/ssa.json', [...v.slice(0, 3), '', ...v.slice(4, 7), undefined])   // rang 3 vide, rang 7 absent
  assert.equal(d.lancer().code, 0)
  const s = d.resume(), c = s.cells[1]!
  assert.equal(s.preregisteredN, 8)
  assert.equal(c.values.length, 8)
  assert.deepEqual([c.values[3], c.values[7], c.n, c.missing], [null, null, 6, 2])
  assert.notEqual(c.values[c.replay.rep], null)
})
