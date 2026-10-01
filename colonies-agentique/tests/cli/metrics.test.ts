import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { calculer } from '../../src/cli/metrics.ts'
import { createStream } from '../../src/core/random.ts'
import { dossierTemp } from './aide.ts'

// Données jouets : 9 agents indépendants de précision 0,6 (J1); bras a = vote (collectif sans canal); canal binaire symétrique (J2).
function donnees(n = 2000) {
  const g = createStream(20261001n, 'agents'), runs = ['seed,arm,score'], indiv = ['seed,agent,success'], journal = ['seed,W,M,readers,addressed']
  for (let s = 0; s < n; s++) {
    const essais = Array.from({ length: 9 }, () => g.uniform() < 0.6), justes = essais.filter(Boolean).length
    runs.push(`${s},a,${justes >= 5 ? 1 : 0}`, `${s},vote,${justes >= 5 ? 1 : 0}`, `${s},ind,${justes / 9}`, `${s},fort,${essais[0] ? 1 : 0}`)
    essais.forEach((e, k) => indiv.push(`${s},${k},${e ? 1 : 0}`))
    for (let m = 0; m < 5; m++) { const w = g.int(2); journal.push(`${s},${w},${g.uniform() < 0.1 ? 1 - w : w},${m % 2 ? 9 : 1},${m === 0 ? 1 : 0}`) }
  }
  return { runs: runs.join('\n') + '\n', indiv: indiv.join('\n') + '\n', journal: journal.join('\n') + '\n' }
}
const D = donnees()
const PLAN = { id: 'essai', runs: 'data/runs.csv', arm: 'a', references: ['ind', 'vote', 'fort'], pMax: 1, epsilon: 0.1, bootstrap: { B: 300, seed: '7' }, journal: 'data/journal.csv', channel: { alphabet: 2, N: 10, persistence: { persistance: 0.99 } }, individuals: 'data/indiv.csv' }

function depot(plan: Record<string, unknown> = PLAN, runs = D.runs) {
  const racine = dossierTemp()
  for (const d of ['metrics', 'data']) fs.mkdirSync(path.join(racine, d))
  fs.writeFileSync(path.join(racine, 'data', 'runs.csv'), runs)
  fs.writeFileSync(path.join(racine, 'data', 'indiv.csv'), D.indiv)
  fs.writeFileSync(path.join(racine, 'data', 'journal.csv'), D.journal)
  fs.writeFileSync(path.join(racine, 'metrics', 'essai.json'), JSON.stringify(plan))
  const rapport = path.join(racine, 'data', 'metrics', 'essai.metrics.json')
  const lancer = () => { const lignes: string[] = []; return { code: calculer('essai', { racine, journal: l => lignes.push(l) }), lignes } }
  return { rapport, lancer, lire: () => JSON.parse(fs.readFileSync(rapport, 'utf8')) }
}

test('UC-007 nominal : les métriques donnent Δ avec IC et G par référence, la décomposition, R par composantes, écrivent le rapport et sortent à 0', () => {
  const d = depot()
  const r = d.lancer()
  assert.equal(r.code, 0, r.lignes.join('\n'))
  assert.equal(r.lignes[0], 'Métriques essai : bras a, 2000 exécutions appariées, P_max = 1, ε = 0.1')
  assert.match(r.lignes[1]!, /^  ind : P_ind = 0\.\d+, Δ = 0\.1\d+ \[0\.\d+ ; 0\.\d+\], G = 0\.3\d+ \[/)
  assert.match(r.lignes.join('\n'), /  R : R_nom = 1 bits; R_eff = 0\.5\d+ \[/)
  assert.match(r.lignes.join('\n'), /contrôle 1 − β : β = .*, 0 violation\(s\)/)
  assert.equal(r.lignes.at(-1), 'Rapport : data/metrics/essai.metrics.json')
  const rapport = d.lire()
  assert.deepEqual(Object.keys(rapport.gains), ['ind', 'vote', 'fort'])
  assert.equal(rapport.n, 2000)
})

test('UC-007 A1 : G non défini quand l\'IC de P_max − P_k contient 0, sans valeur numérique, Δ toujours rapporté', () => {
  const runs = D.runs.split('\n').map(l => (l.includes(',ind,') ? l.replace(/,ind,.*$/, ',ind,1') : l)).join('\n')
  const d = depot(PLAN, runs)
  const r = d.lancer()
  assert.equal(r.code, 0)
  assert.match(r.lignes[1]!, /ind : P_ind = 1, Δ = -0\.\d+ \[.*\], G = non défini \(l'IC à 95 % de P_max − P_k contient 0\)/)
  assert.equal(d.lire().gains.ind.G, 'non défini')
})

test('UC-007 A2 : G vaut « borne invalide » quand P_k dépasse P_max, et Δ reste rapporté', () => {
  const d = depot({ ...PLAN, pMax: 0.5 })
  const r = d.lancer()
  assert.match(r.lignes[1]!, /G = borne invalide/)
  assert.ok(Number.isFinite(d.lire().gains.ind.delta))
})

test('UC-007 A3 : sans référence de vote, G_agg est non défini et Δ_com = Δ_ind', () => {
  const d = depot({ ...PLAN, references: ['ind', 'fort'], individuals: undefined })
  const r = d.lancer()
  assert.equal(r.code, 0)
  const rapport = d.lire()
  assert.equal(rapport.decomposition.Gagg, 'non défini')
  assert.equal(rapport.decomposition.deltaCom, rapport.gains.ind.delta)
})

test('UC-007 A4 : sans journal, R est consigné « non calculé : journal absent »', () => {
  const d = depot({ ...PLAN, journal: undefined })
  const r = d.lancer()
  assert.ok(r.lignes.includes('  R non calculé : journal absent'))
  assert.deepEqual(d.lire().R, { calcule: false, raison: 'journal absent' })
})

test('UC-007 E1 : une graine absente ou en double dans un bras refuse le calcul, sans fichier, avec un code non nul', () => {
  const sansGraine = D.runs.split('\n').filter(l => l !== '5,fort,1' && l !== '5,fort,0').join('\n')
  const a = depot(PLAN, sansGraine)
  assert.deepEqual(a.lancer(), { code: 1, lignes: ['Métriques impossibles : bras fort, graine 5 absente'] })
  assert.ok(!fs.existsSync(a.rapport))
  const b = depot(PLAN, D.runs + '3,ind,0.5\n')
  assert.deepEqual(b.lancer(), { code: 1, lignes: ['Métriques impossibles : bras ind, graine 3 en double'] })
})

test('UC-007 BR-037 : R est rapporté comme cinq composantes, sans agrégat scalaire', () => {
  const d = depot()
  d.lancer()
  assert.deepEqual(Object.keys(d.lire().R), ['R_nom', 'R_eff', 'R_pers', 'R_port', 'R_adr'])
})

test('UC-007 BR-038 : Δ_k et son IC figurent pour chaque référence, que G soit chiffré ou non', () => {
  const d = depot({ ...PLAN, epsilon: 0.5 })   // P_max − P_ind ≈ 0,4 < ε : G non défini partout où P_k ≥ 0,5
  d.lancer()
  for (const g of Object.values(d.lire().gains) as { delta: number; icDelta: number[]; G: unknown }[]) {
    assert.ok(Number.isFinite(g.delta) && g.icDelta.length === 2)
    assert.ok(typeof g.G === 'string' || Number.isFinite(g.G as number))
  }
})

test('UC-007 BR-039 : la décomposition partage le dénominateur P_max − P_ind : G_ind = G_agg + G_com', () => {
  const d = depot()
  d.lancer()
  const r = d.lire()
  assert.ok(Math.abs(r.gains.ind.G - (r.decomposition.Gagg + r.decomposition.Gcom)) < 1e-12)
})

test('UC-007 BR-040 : deux calculs identiques donnent le même rapport (bootstrap à graine, unité = exécution)', () => {
  const d = depot()
  d.lancer()
  const premier = fs.readFileSync(d.rapport, 'utf8')
  d.lancer()
  assert.equal(fs.readFileSync(d.rapport, 'utf8'), premier)
})
