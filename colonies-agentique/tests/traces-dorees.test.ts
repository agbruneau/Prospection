// Traces dorées (05 §9.4) : empreintes d'état aux pas 100 et 1 000, cinq graines, pour chaque modèle implanté.
// Valides pour la version de Node épinglée (.node-version) et la plateforme où elles ont été écrites; ailleurs, le test saute.
// Régénération (commit dédié, avec sa raison) : TRACES_DOREES=ecrire node --test tests/traces-dorees.test.ts
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { RACINE } from '../src/cli/run.ts'
import { enregistrer } from '../src/core/recorder.ts'
import { compileScenario } from '../src/core/scenario.ts'
import { preparer } from '../src/models/index.ts'

const FICHIER = path.join(RACINE, 'tests', '__snapshots__', 'traces-dorees.json')
const GRAINES = ['1', '2', '3', '20261001', '18446744073709551615']
const lire = (f: string) => JSON.parse(fs.readFileSync(path.join(RACINE, f), 'utf8')) as Record<string, any>
const p = (value: number) => ({ value, unit: '1', source: 'Seeley et al. 2012, SOM, Fig. S3', status: 'published' })

// Un scénario par modèle, chacun d'au moins 1 000 pas, échantillonné tous les 100 pas.
const goss = lire('scenarios/p1-goss-1989/fig2c-r2.json')
const m6 = lire('scenarios/s0-m6-quorum/m6-sequentiel.json')
const SCENARIOS: Record<string, Record<string, unknown>> = {
  'p1-goss-1989': { ...goss, time: { ...goss.time, horizon: 1000, sampling: 100 }, parameters: { ...goss.parameters, countTo: { ...goss.parameters.countTo, value: 100_000 } } },
  'p5-seeley-2012': { ...lire('scenarios/p5-seeley-2012/m1c-sigma10.json'), time: { unit: 'cycle', dt: 0.01, horizon: 10, sampling: 1 } },
  'p5-seeley-2012-ssa': {
    schema: 1, regime: 'exploratory', model: { id: 'p5-seeley-2012-ssa', version: '1', article: 'Seeley et al. 2012' }, time: { unit: 'cycle', dt: 0.04, horizon: 40, sampling: 4 },
    order: 'synchronous', seed: '1', streams: ['agents'], parameters: { sigma: p(10), gamma: p(3), alpha: p(1 / 3), rho: p(3), N: p(50) }, initial: { A: 0, B: 0 }, measures: ['D'], interventions: [],
  },
  'p5-pais-2013-ou': {
    schema: 1, regime: 'exploratory', model: { id: 'p5-pais-2013-ou', version: '1', article: 'Pais et al. 2013' }, time: { unit: 'cycle', dt: 0.01, horizon: 10, sampling: 1 },
    order: 'synchronous', seed: '1', streams: ['noise'], parameters: { a: p(0), b: p(-1), c: p(0.5) }, initial: { x: 1 }, measures: ['x'], interventions: [],
  },
  's0-m6-quorum': {   // r = 0,001 : la colonie n'est pas toute engagée avant le pas 1 000
    ...m6, time: { ...m6.time, horizon: 1000, sampling: 100 }, parameters: { ...m6.parameters, r: { ...m6.parameters.r, value: 0.001 } },
  },
  's0-j4-copie': {
    schema: 1, regime: 'exploratory', model: { id: 's0-j4-copie', version: '1', article: 'Huberman et Glance 1993' }, time: { unit: 'cycle', dt: 1, horizon: 1000, sampling: 100 },
    order: 'sequential-random', seed: '1', streams: ['order'], parameters: {}, initial: { x0: 0, x1: 1 }, measures: ['consensus'], interventions: [],
  },
}

function traces() {
  return Object.fromEntries(Object.entries(SCENARIOS).map(([id, base]) => [id, Object.fromEntries(GRAINES.map(seed => {
    const s = compileScenario({ ...base, seed })
    const f = enregistrer(preparer(s).sim, s).fingerprints   // un échantillon tous les 100 pas : indices 1 et 10
    return [seed, { 100: f[1]!.fnv1a64, 1000: f[10]!.fnv1a64 }]
  }))]))
}

test('UC-002 nominal : traces dorées : empreintes aux pas 100 et 1 000 de chaque modèle, cinq graines, inchangées sur la plateforme épinglée', t => {
  const plateforme = { node: process.version, platform: process.platform, arch: process.arch }
  if (process.env.TRACES_DOREES === 'ecrire') {
    fs.mkdirSync(path.dirname(FICHIER), { recursive: true })
    fs.writeFileSync(FICHIER, JSON.stringify({ ...plateforme, traces: traces() }, null, 2) + '\n')
    return
  }
  const ref = JSON.parse(fs.readFileSync(FICHIER, 'utf8')) as typeof plateforme & { traces: unknown }
  const epinglee = fs.readFileSync(path.join(RACINE, '.node-version'), 'utf8').trim()
  if (ref.node !== process.version || ref.node !== epinglee || ref.platform !== process.platform || ref.arch !== process.arch) {
    t.skip(`traces écrites sous Node ${ref.node} (${ref.platform}, ${ref.arch}); ici Node ${process.version} (${process.platform}, ${process.arch}), épinglé ${epinglee}`)
    return
  }
  assert.deepEqual(traces(), ref.traces)
})
