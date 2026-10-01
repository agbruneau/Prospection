import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import type { RunManifest } from '../../src/core/manifest.ts'
import { rejouer } from '../../src/cli/replay.ts'
import { executer, RACINE } from '../../src/cli/run.ts'
import { dossierTemp, ecrireScenario, instantane, scenarioM1c } from './aide.ts'

/** Exécute M1c, puis rejoue le manifeste après `modifier`; renvoie code, lignes affichées et inchangé (BR-006). */
function rejeu(modifier: (m: RunManifest) => void = () => {}) {
  const d = dossierTemp()
  const { manifeste } = executer(ecrireScenario(d, scenarioM1c()), { sortie: d, git: () => ({ commit: 'abc', cleanTree: true }), journal: () => {} })
  const m = JSON.parse(fs.readFileSync(manifeste, 'utf8')) as RunManifest
  modifier(m)
  fs.writeFileSync(manifeste, JSON.stringify(m))
  const avant = instantane(d)
  const lignes: string[] = []
  const code = rejouer(manifeste, { journal: l => lignes.push(l) })
  return { code, lignes, inchange: JSON.stringify(instantane(d)) === JSON.stringify(avant), manifeste }
}

test('UC-002 nominal : le rejeu sur le même moteur annonce « Rejeu identique : k empreintes sur k » et la CLI sort à 0', () => {
  const r = rejeu()
  assert.deepEqual([r.code, r.lignes], [0, ['Rejeu identique : 3 empreintes sur 3']])
  const cli = spawnSync(process.execPath, ['src/cli/replay.ts', r.manifeste], { cwd: RACINE, encoding: 'utf8' })
  assert.equal(cli.status, 0, cli.stderr)
  assert.equal(cli.stdout.trim(), 'Rejeu identique : 3 empreintes sur 3')
})

test('UC-002 A1 : un autre moteur annonce les empreintes égales et l\'équivalence statistique seulement, code 0', () => {
  const r = rejeu(m => { m.engine.version = '0.0.0' })
  assert.deepEqual([r.code, r.lignes], [0, ['3 empreintes égales sur 3', 'Moteur différent : équivalence statistique seulement']])
})

test('UC-002 A2 : une empreinte différente sur le même moteur donne « Rejeu divergent au temps t », code non nul', () => {
  const r = rejeu(m => { m.fingerprints[1]!.fnv1a64 = '0000000000000000' })
  assert.deepEqual([r.code, r.lignes], [1, ['Rejeu divergent au temps 1']])
})

test('UC-002 A3 : un scénario modifié est signalé avec les deux hachages, sans exécution', () => {
  let consigne = ''
  const r = rejeu(m => { consigne = m.scenario.hash; (m.scenario.compiled.parameters.sigma as { value: number }).value = 9 })
  assert.equal(r.code, 1)
  assert.match(r.lignes[0]!, new RegExp(`^Scénario modifié : hachage [0-9a-f]{16} au lieu de ${consigne}$`))
})

test('UC-002 A4 : une exécution LLM renvoie à sa cassette, sans exécution', () => {
  const r = rejeu(m => { m.llmLog = { path: 'journal.jsonl.gz', sha256: 'x', calls: 1 } })
  assert.deepEqual([r.code, r.lignes], [1, ['Exécution LLM : rejouer avec sa cassette (UC-021)']])
})

test('UC-002 E1 : un manifeste illisible ou incomplet est refusé avec le champ manquant', () => {
  const r = rejeu(m => { delete (m as Partial<RunManifest>).runId })
  assert.deepEqual([r.code, r.lignes], [1, ['Manifeste invalide : runId']])
  const d = dossierTemp(), f = path.join(d, 'casse.json')
  fs.writeFileSync(f, '{ pas du json')
  const lignes: string[] = []
  assert.equal(rejouer(f, { journal: l => lignes.push(l) }), 1)
  assert.match(lignes[0]!, /^Manifeste invalide : \(fichier\)/)
})

test('UC-002 BR-006 : le rejeu ne crée ni ne modifie aucun fichier, quel que soit le flot', () => {
  for (const modifier of [() => {}, (m: RunManifest) => { m.engine.version = '0' }, (m: RunManifest) => { m.fingerprints[0]!.fnv1a64 = '0' }, (m: RunManifest) => { m.scenario.hash = '0' }])
    assert.ok(rejeu(modifier).inchange)
})

test('UC-002 BR-007 : l\'identité n\'est pas affirmée si la version du noyau diffère, même à empreintes égales', () => {
  const r = rejeu(m => { m.code.coreVersion = '0.0.0' })
  assert.deepEqual([r.code, r.lignes], [0, ['3 empreintes égales sur 3', 'Moteur différent : équivalence statistique seulement']])
})
