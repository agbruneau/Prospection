// Aides partagées des tests de CLI : scénario M1c court, dossiers temporaires, modèle factice.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { after } from 'node:test'
import type { ReferenceModel } from '../../src/core/simulation.ts'
import { MODELES } from '../../src/models/index.ts'

const p = (value: number, status = 'published') => ({ value, unit: '1', source: 'Seeley et al. 2012, SOM, Fig. S3', status })

export function scenarioM1c(modifs: Record<string, unknown> = {}) {
  return {
    schema: 1, regime: 'exploratory', model: { id: 'p5-seeley-2012', version: '1', article: 'Seeley et al. 2012' },
    time: { unit: 'cycle', dt: 0.01, horizon: 2, sampling: 1 }, order: 'synchronous', seed: '20261001', streams: [],
    parameters: { sigma: p(10), gamma: p(3), alpha: p(1 / 3), rho: p(3) },
    initial: { A: 0.0101, B: 0.01 }, measures: ['A', 'B', 'U'], interventions: [],
    ...modifs,
  }
}
export const parametreAConfirmer = () => ({ ...scenarioM1c().parameters, sigma: p(10, 'to-confirm') })

/** Dossier temporaire supprimé à la fin du fichier de test. */
export function dossierTemp(): string {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'colonies-'))
  after(() => fs.rmSync(d, { recursive: true, force: true }))
  return d
}

export function ecrireScenario(dossier: string, s: unknown, nom = 'scenario.json'): string {
  const f = path.join(dossier, nom)
  fs.writeFileSync(f, JSON.stringify(s))
  return f
}

/** Instantané (nom, taille, date) des fichiers d'un dossier, pour vérifier qu'il reste inchangé. */
export const instantane = (d: string) =>
  fs.readdirSync(d).sort((a, b) => (a < b ? -1 : 1)).map(f => { const s = fs.statSync(path.join(d, f)); return `${f}:${s.size}:${s.mtimeMs}` })

/** Registre avec un modèle factice dont l'observation et l'état sont pilotés par le test. */
export function registreFactice(etat: (pas: number) => number, mesure: (pas: number) => number | null): ReadonlyMap<string, ReferenceModel> {
  const factice: ReferenceModel = {
    id: 'factice',
    measureUnits: { x: '1' },
    create(s) {
      let n = 0
      const y = new Float64Array(1)
      return {
        advance() { n++; y[0] = etat(n) },
        time: () => n * s.time.dt,
        done: () => n >= Math.round(s.time.horizon / s.time.dt),
        observe: () => ({ x: mesure(n) }),
        buffers: () => [y],
        apply() {},
      }
    },
  }
  return new Map([...MODELES, ['factice', factice]])
}
export const scenarioFactice = (modifs: Record<string, unknown> = {}) =>
  scenarioM1c({ model: { id: 'factice', version: '1', article: 'Seeley et al. 2012' }, time: { unit: 'cycle', dt: 1, horizon: 5, sampling: 1 }, parameters: {}, initial: {}, measures: ['x'], ...modifs })
