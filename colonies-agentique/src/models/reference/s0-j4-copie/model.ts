// Jouet J4 de la fiche S0 (§4.2) : deux agents qui adoptent chacun l'état de l'autre. Contrôle positif de l'ordre de mise à jour
// (T0.28) : en synchrone, oscillation de période 2 sans consensus; en séquentiel, consensus dès le premier pas.
import { ordreDuPas } from '../../../core/ordre.ts'
import { invalide } from '../../../core/scenario.ts'
import type { ReferenceModel } from '../../../core/simulation.ts'

export const j4Copie: ReferenceModel = {
  id: 's0-j4-copie',
  measureUnits: { x0: '1', x1: '1', consensus: '1' },
  create(s, f) {
    const init = s.initial as Record<string, unknown>
    if (typeof init.x0 !== 'number' || typeof init.x1 !== 'number') throw invalide('initial', '{ x0, x1 } numériques')
    if (s.interventions.length) throw invalide('interventions', 'non prises en charge par ce modèle')
    const etat = new Float64Array([init.x0, init.x1]), suivant = new Float64Array(2), indices = new Int32Array(2)
    const flux = s.order === 'sequential-random' ? f.stream('order') : undefined
    const pas = Math.round(s.time.horizon / s.time.dt)
    let n = 0
    return {
      advance() {
        ordreDuPas(s.order, indices, flux)
        if (s.order === 'synchronous') {   // lecture de l'état du début de pas, écriture dans le tampon suivant, puis échange
          for (const i of indices) suivant[i] = etat[1 - i]!
          etat.set(suivant)
        } else for (const i of indices) etat[i] = etat[1 - i]!
        n++
      },
      time: () => n * s.time.dt,
      done: () => n >= pas,
      observe: () => ({ x0: etat[0]!, x1: etat[1]!, consensus: etat[0] === etat[1] ? 1 : 0 }),
      buffers: () => (flux ? [etat, flux.buffer()] : [etat]),
      apply() {},
    }
  },
}
