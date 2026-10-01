import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import type { RunManifest } from '../../src/core/manifest.ts'
import { executer, RACINE } from '../../src/cli/run.ts'
import { dossierTemp, ecrireScenario, instantane, parametreAConfirmer, registreFactice, scenarioFactice, scenarioM1c } from './aide.ts'

const propre = () => ({ commit: 'abc123', cleanTree: true })
const modifie = () => ({ commit: 'abc123', cleanTree: false })
const silence = () => {}
const lireManifeste = (f: string) => JSON.parse(fs.readFileSync(f, 'utf8')) as RunManifest
const CHAMPS: (keyof RunManifest)[] = ['schema', 'runId', 'regime', 'model', 'code', 'scenario', 'prng', 'time', 'interventions', 'engine', 'timestamps', 'outputs', 'fingerprints', 'summary', 'missing', 'deviations', 'license']

test('UC-001 nominal : la CLI écrit séries et manifeste, affiche hachage, régime, runId, manifeste et empreinte, et sort à 0', () => {
  const d = dossierTemp(), sortie = path.join(d, 'runs')
  const r = spawnSync(process.execPath, ['src/cli/run.ts', ecrireScenario(d, scenarioM1c()), '--out', sortie], { cwd: RACINE, encoding: 'utf8' })
  assert.equal(r.status, 0, r.stderr)
  assert.match(r.stdout, /^Scénario [0-9a-f]{16} \(exploratory\)$/m)
  assert.match(r.stdout, /^runId : [0-9a-f]{16}$/m)
  assert.match(r.stdout, /^Empreinte finale : [0-9a-f]{16}$/m)
  const fichiers = fs.readdirSync(sortie)
  const csv = fichiers.find(f => /^p5-seeley-2012__[0-9a-f]{8}__s20261001\.series\.csv$/.test(f))
  assert.ok(csv, fichiers.join(', '))
  const manifeste = lireManifeste(path.join(sortie, fichiers.find(f => f.endsWith('.manifest.json'))!))
  for (const c of CHAMPS) assert.ok(manifeste[c] !== undefined, `champ ${c} absent`)
  assert.match(r.stdout, /^Manifeste : .*\.manifest\.json$/m)
  assert.equal(manifeste.fingerprints.at(-1)!.time, 2)
  assert.match(r.stdout, new RegExp(`^Empreinte finale : ${manifeste.fingerprints.at(-1)!.fnv1a64}$`, 'm'))
  assert.equal(fs.readFileSync(path.join(sortie, csv), 'utf8').split('\n')[0], 't,A,B,U')
})

test('UC-001 A1 : un scénario invalide est refusé avec son champ et sa règle, sans écrire ni modifier de fichier', () => {
  const d = dossierTemp(), sortie = path.join(d, 'runs')
  fs.mkdirSync(sortie)
  fs.writeFileSync(path.join(sortie, 'existant.txt'), 'ne pas toucher')
  const avant = instantane(sortie)
  const f = ecrireScenario(d, scenarioM1c({ time: { unit: 'cycle', dt: 0, horizon: 2, sampling: 1 } }))
  assert.throws(() => executer(f, { sortie, git: propre, journal: silence }), { message: 'Scénario invalide : time.dt : nombre > 0' })
  const r = spawnSync(process.execPath, ['src/cli/run.ts', f, '--out', sortie], { cwd: RACINE, encoding: 'utf8' })
  assert.notEqual(r.status, 0)
  assert.match(r.stderr, /Scénario invalide : time\.dt : nombre > 0/)
  assert.deepEqual(instantane(sortie), avant)
})

test('UC-001 A2 : une exécution confirmatoire avec un paramètre à confirmer est refusée sans fichier', () => {
  const d = dossierTemp(), sortie = path.join(d, 'runs')
  const f = ecrireScenario(d, scenarioM1c({ regime: 'confirmatory', parameters: parametreAConfirmer() }))
  assert.throws(() => executer(f, { sortie, git: propre, journal: silence }), { message: 'Exécution confirmatoire refusée : paramètre à confirmer : sigma' })
  assert.equal(fs.existsSync(sortie), false)
})

test('UC-001 A3 : une exécution confirmatoire sur un arbre modifié est refusée sans fichier', () => {
  const d = dossierTemp(), sortie = path.join(d, 'runs')
  const f = ecrireScenario(d, scenarioM1c({ regime: 'confirmatory' }))
  assert.throws(() => executer(f, { sortie, git: modifie, journal: silence }), { message: 'Exécution confirmatoire refusée : arbre de travail modifié' })
  assert.equal(fs.existsSync(sortie), false)
})

test('UC-001 E1 : un état NaN arrête l\'exécution avec le pas et la variable, sans manifeste', () => {
  const d = dossierTemp(), sortie = path.join(d, 'runs')
  const modeles = registreFactice(n => (n >= 3 ? NaN : n), () => 1)
  const f = ecrireScenario(d, scenarioFactice())
  assert.throws(() => executer(f, { sortie, modeles, git: propre, journal: silence }), { message: 'État invalide au pas 3 : tampon 0[0]' })
  assert.equal(fs.existsSync(sortie), false)
})

test('UC-001 BR-001 : une exécution produit exactement un manifeste qui liste chaque sortie avec son SHA-256', () => {
  const d = dossierTemp(), sortie = path.join(d, 'runs')
  const { manifeste } = executer(ecrireScenario(d, scenarioM1c()), { sortie, git: propre, journal: silence })
  assert.equal(fs.readdirSync(sortie).filter(f => f.endsWith('.manifest.json')).length, 1)
  const m = lireManifeste(manifeste)
  const autres = fs.readdirSync(sortie).filter(f => !f.endsWith('.manifest.json'))
  assert.deepEqual(m.outputs.map(o => o.file).sort(), autres.sort())
  for (const o of m.outputs) assert.equal(o.sha256, createHash('sha256').update(fs.readFileSync(path.join(sortie, o.file))).digest('hex'))
})

test('UC-001 BR-002 : le régime confirmatoire refuse le statut to-confirm, le régime exploratoire l\'accepte', () => {
  const d = dossierTemp()
  const parameters = parametreAConfirmer()
  assert.throws(() => executer(ecrireScenario(d, scenarioM1c({ regime: 'confirmatory', parameters })), { sortie: path.join(d, 'c'), git: propre, journal: silence }), /paramètre à confirmer : sigma/)
  assert.doesNotThrow(() => executer(ecrireScenario(d, scenarioM1c({ parameters })), { sortie: path.join(d, 'e'), git: propre, journal: silence }))
})

test('UC-001 BR-003 : même scénario, même graine et même commit donnent le même runId', () => {
  const d = dossierTemp(), f = ecrireScenario(d, scenarioM1c())
  const un = executer(f, { sortie: path.join(d, 'a'), git: propre, journal: silence })
  const deux = executer(f, { sortie: path.join(d, 'b'), git: propre, journal: silence })
  assert.equal(un.runId, deux.runId)
  assert.equal(un.empreinte, deux.empreinte)
  assert.notEqual(executer(f, { sortie: path.join(d, 'c'), git: () => ({ commit: 'autre', cleanTree: true }), journal: silence }).runId, un.runId)
  assert.notEqual(executer(ecrireScenario(d, scenarioM1c({ seed: '7' }), 's7.json'), { sortie: path.join(d, 'd'), git: propre, journal: silence }).runId, un.runId)
})

test('UC-001 BR-004 : une valeur manquante est une cellule vide avec une entrée missing, jamais NaN ni l\'infini', () => {
  const d = dossierTemp(), sortie = path.join(d, 'runs')
  const modeles = registreFactice(n => n, n => (n === 2 ? null : n === 4 ? Infinity : n === 3 ? NaN : n))
  const { manifeste } = executer(ecrireScenario(d, scenarioFactice()), { sortie, modeles, git: propre, journal: silence })
  const m = lireManifeste(manifeste)
  const csv = fs.readFileSync(path.join(sortie, m.outputs[0]!.file), 'utf8')
  assert.equal(csv, 't,x\n0,0\n1,1\n2,\n3,\n4,\n5,5\n')
  assert.doesNotMatch(csv, /NaN|Infinity/)
  assert.deepEqual(m.missing, [{ quantity: 'x', cause: 'valeur non définie ou non finie à 3 instant(s), premier à t = 2' }])
})

test('UC-001 BR-005 : une exécution confirmatoire exige un arbre propre et s\'exécute quand il l\'est', () => {
  const d = dossierTemp(), f = ecrireScenario(d, scenarioM1c({ regime: 'confirmatory' }))
  assert.throws(() => executer(f, { sortie: path.join(d, 'a'), git: modifie, journal: silence }), /arbre de travail modifié/)
  const { manifeste } = executer(f, { sortie: path.join(d, 'b'), git: propre, journal: silence })
  const m = lireManifeste(manifeste)
  assert.equal(m.regime, 'confirmatory')
  assert.equal(m.code.cleanTree, true)
})
