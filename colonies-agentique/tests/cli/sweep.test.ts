import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { balayer } from '../../src/cli/sweep.ts'
import { graineDeRepetition } from '../../src/core/random.ts'
import { dossierTemp, registreFactice, scenarioFactice, scenarioM1c } from './aide.ts'

// Dépôt jouet : M1c à N fini (SSA, stochastique) balayé en σ et en N.
const p = (value: number) => ({ value, unit: '1', source: 'Seeley et al. 2012, SOM, Fig. S3', status: 'published' })
const ssa = scenarioM1c({
  model: { id: 'p5-seeley-2012-ssa', version: '1', article: 'Seeley et al. 2012' }, time: { unit: 'cycle', dt: 10, horizon: 10, sampling: 10 },
  streams: ['agents'], parameters: { sigma: p(10), gamma: p(3), alpha: p(1 / 3), rho: p(3), N: p(50) }, initial: { A: 0, B: 0 }, measures: ['D'],
})
const PLAN = { base: 'scenarios/ssa.json', axes: [{ parameter: 'sigma', values: [1, 10] }, { parameter: 'N', values: [20, 40] }], repetitions: 4, observables: [{ name: 'D' }, { name: 'A' }], masterSeed: '20261001', pairing: 'by-repetition' }

function depot(plan: Record<string, unknown> = PLAN, base: unknown = ssa) {
  const racine = dossierTemp()
  for (const d of ['scenarios', 'sweeps']) fs.mkdirSync(path.join(racine, d))
  fs.writeFileSync(path.join(racine, 'scenarios', 'ssa.json'), JSON.stringify(base))
  fs.writeFileSync(path.join(racine, 'sweeps', 'essai.json'), JSON.stringify(plan))
  const sortie = path.join(racine, 'data', 'sweeps', 'essai')
  const lire = (f: string) => fs.readFileSync(path.join(sortie, f), 'utf8')
  const lancer = async (o: Parameters<typeof balayer>[1] = {}) => { const lignes: string[] = []; const r = await balayer('sweeps/essai.json', { racine, journal: l => lignes.push(l), git: () => ({ commit: 'abc123', cleanTree: true }), ...o }); return { ...r, lignes } }
  const lignes = () => lire('results.csv').trim().split('\n').map(l => l.split(','))
  return { racine, sortie, lire, lancer, lignes }
}
const sha = (s: string) => createHash('sha256').update(s).digest('hex')

test('UC-004 nominal : le balayage écrit une ligne par exécution, un résumé par point et le manifeste, affiche points et exécutions, et sort à 0', async () => {
  const d = depot()
  const r = await d.lancer()
  assert.equal(r.code, 0, r.lignes.join('\n'))
  assert.deepEqual(r.lignes, ['Balayage essai : 4 points, 16 exécutions (16 exécutées)', 'Résultats : data/sweeps/essai/'])
  const l = d.lignes()
  assert.deepEqual(l[0], ['point', 'rep', 'seed', 'sigma', 'N', 'D', 'A'])
  assert.equal(l.length, 1 + 16)
  assert.deepEqual(l.slice(1, 6).map(c => [c[0], c[1], c[3], c[4]]), [['0', '0', '1', '20'], ['0', '1', '1', '20'], ['0', '2', '1', '20'], ['0', '3', '1', '20'], ['1', '0', '1', '40']])
  const resume = d.lire('summary.csv').trim().split('\n')
  assert.equal(resume[0], 'point,sigma,N,observable,n,mean,sd,se,ci95_low,ci95_high')
  assert.equal(resume.length, 1 + 4 * 2)
  const m = JSON.parse(d.lire('sweep-manifest.json'))
  assert.deepEqual([m.points, m.runs, m.workers, m.code.commit], [4, 16, 1, 'abc123'])
  assert.equal(m.files['results.csv'], sha(d.lire('results.csv')))
})

test('UC-004 BR-030 : results.csv et summary.csv sont identiques avec 1, 2 et 4 travailleurs', async () => {
  const empreintes: string[] = []
  for (const k of [1, 2, 4]) {
    const d = depot()
    assert.equal((await d.lancer({ travailleurs: k })).code, 0)
    empreintes.push(sha(d.lire('results.csv')) + sha(d.lire('summary.csv')))
  }
  assert.equal(new Set(empreintes).size, 1)
})

test('UC-004 BR-031 : en by-repetition la répétition i a la même graine à tous les points; en by-cell chaque couple a sa graine', async () => {
  const d = depot()
  await d.lancer()
  const graines = d.lignes().slice(1).map(c => ({ point: c[0], rep: Number(c[1]), seed: c[2] }))
  for (const g of graines) assert.equal(g.seed, graineDeRepetition(20261001n, g.rep))
  const c = depot({ ...PLAN, pairing: 'by-cell' })
  await c.lancer()
  const seeds = c.lignes().slice(1).map(l => l[2])
  assert.equal(new Set(seeds).size, seeds.length)
})

test('UC-004 BR-032 : un balayage s\'exécute en régime exploratoire, même depuis un scénario de base confirmatoire', async () => {
  const d = depot(PLAN, { ...ssa, regime: 'confirmatory', parameters: { ...ssa.parameters, sigma: { ...ssa.parameters.sigma, status: 'to-confirm' } } })
  const r = await d.lancer()
  assert.equal(r.code, 0, r.lignes.join('\n'))   // un paramètre à confirmer serait refusé en confirmatoire (C-006)
})

test('UC-004 BR-033 : results.csv garde la valeur brute de chaque exécution, et le résumé en est tiré (moyenne et IC par bootstrap à graine)', async () => {
  const d = depot()
  await d.lancer()
  const l = d.lignes().slice(1), point0 = l.filter(c => c[0] === '0').map(c => Number(c[5]))
  assert.equal(point0.length, 4)
  const ligne = d.lire('summary.csv').trim().split('\n').find(x => x.startsWith('0,1,20,D,'))!.split(',')
  assert.equal(Number(ligne[5]), point0.reduce((a, b) => a + b, 0) / 4)
  assert.ok(Number(ligne[8]) <= Number(ligne[5]) && Number(ligne[5]) <= Number(ligne[9]))
})

test('UC-004 A1 : un plan invalide est refusé avec le champ et la règle, sans exécution ni fichier', async () => {
  for (const [modif, attendu] of [
    [{ axes: [{ parameter: 'zeta', values: [1] }] }, 'Plan invalide : axes[0].parameter : paramètre inconnu du scénario : zeta'],
    [{ repetitions: 0 }, 'Plan invalide : repetitions : entier ≥ 1'],
    [{ observables: [{ name: 'Z' }] }, 'Plan invalide : observables[0].name : mesure inconnue du modèle : Z'],
    [{ pairing: 'aleatoire' }, 'Plan invalide : pairing : by-repetition ou by-cell'],
    [{ carryState: true }, 'Plan invalide : carryState : hystérésis non prise en charge (UC-004, point de revue 3)'],
  ] as const) {
    const d = depot({ ...PLAN, ...modif })
    const r = await d.lancer()
    assert.deepEqual([r.code, r.lignes], [1, [attendu]])
    assert.ok(!fs.existsSync(d.sortie))
  }
  const borne = depot({ ...PLAN, axes: [{ parameter: 'N', values: [-5] }] })
  const r = await borne.lancer()
  assert.equal(r.code, 1)
  assert.match(r.lignes[0]!, /^Plan invalide : point 0 \(-5\) : Scénario invalide/)
})

test('UC-004 A2 : la reprise saute les exécutions déjà écrites et redonne les mêmes fichiers', async () => {
  const d = depot()
  await d.lancer()
  const complet = d.lire('results.csv'), resume = d.lire('summary.csv')
  fs.writeFileSync(path.join(d.sortie, 'results.csv'), complet.trim().split('\n').slice(0, 1 + 10).join('\n') + '\n')   // interruption après 10 exécutions
  const r = await d.lancer({ reprise: true })
  assert.equal(r.executees, 6)
  assert.equal(d.lire('results.csv'), complet)
  assert.equal(d.lire('summary.csv'), resume)
})

test('UC-004 A3 : une observable sans valeur laisse une cellule vide, sa cause au manifeste, et le balayage continue', async () => {
  const racine = dossierTemp()
  for (const dd of ['scenarios', 'sweeps']) fs.mkdirSync(path.join(racine, dd))
  fs.writeFileSync(path.join(racine, 'scenarios', 'f.json'), JSON.stringify(scenarioFactice({ parameters: { k: p(1) } })))
  fs.writeFileSync(path.join(racine, 'sweeps', 'f.json'), JSON.stringify({ ...PLAN, base: 'scenarios/f.json', axes: [{ parameter: 'k', values: [1, 2] }], repetitions: 2, observables: [{ name: 'x' }] }))
  const modeles = registreFactice(n => n, n => (n >= 5 ? null : n))   // la mesure finale n'est pas définie
  const lignes: string[] = []
  const r = await balayer('sweeps/f.json', { racine, modeles, journal: l => lignes.push(l) })
  assert.equal(r.code, 0, lignes.join('\n'))
  const dossier = path.join(racine, 'data', 'sweeps', 'f')
  const results = fs.readFileSync(path.join(dossier, 'results.csv'), 'utf8').trim().split('\n').slice(1)
  assert.ok(results.every(l => l.endsWith(',')), results.join('\n'))
  const m = JSON.parse(fs.readFileSync(path.join(dossier, 'sweep-manifest.json'), 'utf8'))
  assert.equal(m.missing.length, 4)
  assert.match(m.missing[0].cause, /valeur absente : x/)
  assert.match(lignes.join('\n'), /4 exécution\(s\) avec une observable sans valeur/)
})
