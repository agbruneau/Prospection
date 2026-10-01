// SPK11 : balayage jouet (4 valeurs de η × 8 répétitions, N = 400, 200 pas) avec 1, 2 et 4 worker_threads.
// Le fil principal réordonne par (point, répétition) avant d'écrire : results.csv ne dépend ni du nombre de
// travailleurs ni de l'ordre d'arrivée (05 §10.1). Usage : node spikes/phase0/balayage.ts
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { isMainThread, parentPort, Worker } from 'node:worker_threads'
import { graineDeRepetition } from '../../src/core/random.ts'
import { creerJouet } from './jouet.ts'

interface Tache { point: number; eta: number; rep: number; graine: string }
interface Ligne extends Tache { ordre: number; empreinte: string }

function executer(t: Tache): Ligne {
  const j = creerJouet(400, BigInt(t.graine), { eta: t.eta })
  for (let k = 0; k < 200; k++) j.pas()
  let sx = 0, sy = 0
  for (let i = 0; i < j.n; i++) { sx += Math.cos(j.theta[i]!); sy += Math.sin(j.theta[i]!) }
  return { ...t, ordre: Math.hypot(sx, sy) / j.n, empreinte: j.empreinte() }
}

if (!isMainThread) {
  parentPort!.on('message', (t: Tache) => parentPort!.postMessage(executer(t)))
} else {
  const ETAS = [0.1, 0.5, 1, 2], REPS = 8, MAITRE = 20261001n
  // Pairage by-repetition : même graine pour une répétition donnée dans tous les points.
  const taches: Tache[] = ETAS.flatMap((eta, point) => Array.from({ length: REPS }, (_, rep) => ({ point, eta, rep, graine: graineDeRepetition(MAITRE, rep) })))

  async function balayer(nTravailleurs: number) {
    const t0 = performance.now(), lignes: Ligne[] = [], file = [...taches]
    const pool = Array.from({ length: nTravailleurs }, () => new Worker(fileURLToPath(import.meta.url)))
    await Promise.all(pool.map(w => new Promise<void>(fin => {
      const suivante = () => { const t = file.shift(); if (!t) { w.terminate(); fin(); return } w.postMessage(t) }
      w.on('message', (l: Ligne) => { lignes.push(l); suivante() })
      suivante()
    })))
    lignes.sort((a, b) => a.point - b.point || a.rep - b.rep)
    const csv = ['point,rep,seed,eta,ordre,empreinte', ...lignes.map(l => [l.point, l.rep, l.graine, l.eta, l.ordre, l.empreinte].join(','))].join('\n') + '\n'
    return { travailleurs: nTravailleurs, sha256: createHash('sha256').update(csv).digest('hex'), secondes: (performance.now() - t0) / 1000, runsParSeconde: taches.length / ((performance.now() - t0) / 1000) }
  }
  const resultats = []
  for (const n of [1, 2, 4]) resultats.push(await balayer(n))
  const sortie = { taches: taches.length, identiques: new Set(resultats.map(r => r.sha256)).size === 1, resultats }
  console.log(JSON.stringify(sortie, null, 2))
  const ici = path.dirname(fileURLToPath(import.meta.url))
  fs.mkdirSync(path.join(ici, 'resultats'), { recursive: true })
  fs.writeFileSync(path.join(ici, 'resultats', 'balayage.json'), JSON.stringify(sortie, null, 2) + '\n')
}
