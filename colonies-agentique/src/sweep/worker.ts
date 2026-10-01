// Travailleur d'un balayage (UC-004) : exécute son lot de tâches et renvoie les résultats, sans ordre imposé.
import { parentPort, workerData } from 'node:worker_threads'
import { executerTache, type Observable, type Tache } from './executor.ts'

const { taches, observables } = workerData as { taches: Tache[]; observables: Observable[] }
parentPort!.postMessage(taches.map(t => executerTache(t, observables)))
