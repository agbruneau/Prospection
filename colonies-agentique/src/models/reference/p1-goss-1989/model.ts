// Pont à deux branches de [Goss et al. 1989], éq. 1-3, version Monte Carlo de la fig. 2 (un module du pont).
// Fiche de reproduction : projets/reproduction/T1.1.md (ODD complet). Oracle : goss_run() de
// recherche/verifications-numeriques/p1_verif_recrutement.py, dont ce modèle reprend l'ordonnancement.
//
// Pas de 1 s. À chaque pas : (1) les fourmis parties il y a 20 s (courte) ou round(20r) s (longue) arrivent au point
// opposé et y déposent une unité; (2) à chaque point de choix j (0 : nid, 1 : nourriture), dans cet ordre, une fourmi
// arrive avec la probabilité Φ, choisit la courte avec p = (k + S_j)^n / ((k + S_j)^n + (k + L_j)^n), dépose une unité
// en j sur la branche choisie et part vers le point opposé. La courte n'est offerte qu'après `shortOpensAfter` passages.
// Mesure : part des passages de ]countFrom, countTo] faits sur la courte. L'oracle compte aussi un éventuel passage
// countTo + 1 tombé dans le dernier pas; ce modèle s'arrête à countTo.
import { invalide } from '../../../core/scenario.ts'
import type { ReferenceModel } from '../../../core/simulation.ts'

const PARAMETRES = ['phi', 'k', 'n', 'r', 'shortDelay', 'countFrom', 'countTo', 'shortOpensAfter'] as const
const ENTIERS: readonly string[] = ['countFrom', 'countTo', 'shortOpensAfter']

/** x^n; exposant entier écrit en multiplications (05 §7.1 : pas de Math.pow sur le chemin d'une comparaison). */
const puissance = (x: number, n: number) => {
  if (!Number.isInteger(n)) return Math.pow(x, n)
  let y = 1
  for (let i = 0; i < n; i++) y *= x
  return y
}

export const goss1989: ReferenceModel = {
  id: 'p1-goss-1989',
  measureUnits: {
    shortShare: 'fraction', crossings: 'passage',
    S0: 'unité de phéromone', S1: 'unité de phéromone', L0: 'unité de phéromone', L1: 'unité de phéromone',
    p0: 'probabilité', p1: 'probabilité',   // probabilité de choisir la courte au nid (0) et à la nourriture (1), éq. 3
  },
  shareMeasures: ['shortShare'],
  create(s, f) {
    const v: Record<string, number> = {}
    for (const nom of PARAMETRES) {
      const x = s.parameters[nom]?.value
      if (typeof x !== 'number') throw invalide(`parameters.${nom}`, 'nombre requis par le modèle')
      if (ENTIERS.includes(nom) && (!Number.isInteger(x) || x < 0)) throw invalide(`parameters.${nom}`, 'entier ≥ 0')
      v[nom] = x
    }
    const { phi, k, n, r, shortDelay, countFrom, countTo, shortOpensAfter } = v as Record<(typeof PARAMETRES)[number], number>
    const REGLABLES = ['phi', 'k', 'n']
    if (s.time.unit !== 's' || s.time.dt !== 1) throw invalide('time', 'pas de 1 s requis par le modèle')
    if (!(phi >= 0 && phi <= 1)) throw invalide('parameters.phi', 'probabilité d\'arrivée par seconde dans [0, 1]')
    if (!(k > 0 && n > 0 && r >= 1 && shortDelay >= 1)) throw invalide('parameters', 'k > 0, n > 0, r ≥ 1, shortDelay ≥ 1 s')
    if (!(countFrom < countTo)) throw invalide('parameters.countTo', 'countFrom < countTo')
    for (const [i, x] of s.interventions.entries())
      if (!REGLABLES.includes(x.type) || typeof x.value !== 'number' || !(x.type === 'phi' ? x.value >= 0 && x.value <= 1 : x.value > 0))
        throw invalide(`interventions[${i}]`, `type parmi ${REGLABLES.join(', ')}; Φ dans [0, 1], k et n > 0`)
    // Dans un pas, les deux points de choix ne lisent ni n'écrivent la même variable : l'ordre ne change que la
    // numérotation des passages aux bornes de fenêtre. Un seul ordre est donc offert (ODD de T1.1, élément 3).
    if (s.order !== 'sequential-fixed') throw invalide('order', 'sequential-fixed seulement (nid, puis nourriture)')

    const retard = [Math.round(shortDelay), Math.round(shortDelay * r)]   // [courte, longue] en pas [I : arrondi de 20r]
    const D = Math.max(retard[0]!, retard[1]!) + 1
    const pheromone = new Float64Array(4)     // [S_0, S_1, L_0, L_1] : branche × 2 + point
    const enRoute = new Int32Array(D * 4)     // tampon circulaire des arrivées : créneau × 4 + branche × 2 + point
    const compteurs = new Int32Array(2)       // [passages, passages sur la courte dans la fenêtre]
    const reglables = new Float64Array([phi, k, n])   // modifiables par intervention datée (niveau Explorer)
    const pCourte = (j: number) => {
      const a = puissance(reglables[1]! + pheromone[j]!, reglables[2]!), b = puissance(reglables[1]! + pheromone[2 + j]!, reglables[2]!)
      return a / (a + b)
    }
    const arrivees = f.stream('environment'), choix = f.stream('agents')
    const pas = Math.round(s.time.horizon / s.time.dt)
    let t = 0

    return {
      advance() {
        t++
        const creneau = (t % D) * 4
        for (let i = 0; i < 4; i++) { pheromone[i] = pheromone[i]! + enRoute[creneau + i]!; enRoute[creneau + i] = 0 }
        for (let j = 0; j < 2 && compteurs[0]! < countTo; j++) {
          if (!(arrivees.uniform() < reglables[0]!)) continue
          const passage = compteurs[0]! + 1
          compteurs[0] = passage
          let courte = false
          if (passage > shortOpensAfter) courte = choix.uniform() < pCourte(j)
          const branche = courte ? 0 : 1
          pheromone[branche * 2 + j] = pheromone[branche * 2 + j]! + 1
          const arrivee = ((t + retard[branche]!) % D) * 4 + branche * 2 + (1 - j)
          enRoute[arrivee] = enRoute[arrivee]! + 1
          if (courte && passage > countFrom) compteurs[1] = compteurs[1]! + 1
        }
      },
      time: () => t * s.time.dt,
      done: () => compteurs[0]! >= countTo || t >= pas,
      observe: () => {
        const ouverte = compteurs[0]! >= shortOpensAfter
        return {
          shortShare: compteurs[0]! >= countTo ? compteurs[1]! / (countTo - countFrom) : null, crossings: compteurs[0]!,
          S0: pheromone[0]!, S1: pheromone[1]!, L0: pheromone[2]!, L1: pheromone[3]!,
          p0: ouverte ? pCourte(0) : 0, p1: ouverte ? pCourte(1) : 0,
        }
      },
      buffers: () => [pheromone, enRoute, compteurs, reglables, arrivees.buffer(), choix.buffer()],
      apply(i) { reglables[REGLABLES.indexOf(i.type)] = i.value as number },
    }
  },
}
