// M6 : étalon fourmi du socle (fiche S0 §4.1), réponse de quorum de [Sumpter et Pratt 2009], §3b et éq. 4.1.
// Chaque individu non engagé découvre une option avec la probabilité lectureR · r par pas (lectureR = 2 : « r par option »,
// lecture du dossier; 1 : « r pour l'une des deux options »; [à confirmer]), l'une ou l'autre avec probabilité 1/2, puis s'y
// engage avec P_i(x) = p_i [a + (m − a) x^k / (T^k + x^k)], x = engagés à cette option. Ordre (05 §7.3) : `synchronous` lit les
// comptes du début de pas; `sequential-random` et `sequential-fixed` lisent les comptes courants.
import { ordreDuPas } from '../../../core/ordre.ts'
import { invalide } from '../../../core/scenario.ts'
import type { ReferenceModel } from '../../../core/simulation.ts'

const PARAMETRES = ['n', 'r', 'lectureR', 'px', 'py', 'T', 'a', 'm', 'k'] as const
/** x^k pour k entier (multiplications : identique entre moteurs, 05 §7.1); Math.pow sinon. */
const puissance = (x: number, k: number) => { if (!Number.isInteger(k)) return Math.pow(x, k); let y = 1; for (let i = 0; i < k; i++) y *= x; return y }

export const m6Quorum: ReferenceModel = {
  id: 's0-m6-quorum',
  measureUnits: { fractionX: 'fraction', duree: 'pas', engages: 'individu' },
  create(s, f) {
    const v: Record<string, number> = {}
    for (const nom of PARAMETRES) {
      const x = s.parameters[nom]?.value
      if (typeof x !== 'number') throw invalide(`parameters.${nom}`, 'nombre requis par le modèle')
      v[nom] = x
    }
    const { n, r, lectureR, px, py, T, a, m, k } = v as Record<(typeof PARAMETRES)[number], number>
    if (!(Number.isInteger(n) && n > 0)) throw invalide('parameters.n', 'entier > 0')
    if (!(lectureR === 1 || lectureR === 2) || !(lectureR * r >= 0 && lectureR * r <= 1)) throw invalide('parameters.lectureR', '1 ou 2, avec lectureR · r dans [0, 1]')
    if (s.interventions.length) throw invalide('interventions', 'non prises en charge par ce modèle')
    const agents = f.stream('agents'), flux = s.order === 'sequential-random' ? f.stream('order') : undefined
    const etat = new Int32Array(n)                  // 0 non engagé, 1 engagé à X, 2 engagé à Y
    const comptes = new Float64Array([0, 0, 0])     // pas, engagés à X, engagés à Y
    const indices = new Int32Array(n), pas = Math.round(s.time.horizon / s.time.dt)
    const P = (x: number, p: number) => p * (a + (m - a) * puissance(x, k) / (puissance(T, k) + puissance(x, k)))
    const libres = () => n - comptes[1]! - comptes[2]!
    return {
      advance() {
        const x0 = comptes[1]!, y0 = comptes[2]!
        ordreDuPas(s.order, indices, flux)
        const candidats = Array.from(indices).filter(i => etat[i] === 0)   // non engagés au début du pas : une chance chacun
        for (const i of candidats) {
          if (!(agents.uniform() < lectureR * r)) continue
          const versX = agents.uniform() < 0.5
          const x = s.order === 'synchronous' ? (versX ? x0 : y0) : comptes[versX ? 1 : 2]!
          if (agents.uniform() < P(x, versX ? px : py)) { const j = versX ? 1 : 2; etat[i] = j; comptes[j] = comptes[j]! + 1 }
        }
        comptes[0] = comptes[0]! + 1
      },
      time: () => comptes[0]! * s.time.dt,
      done: () => libres() === 0 || comptes[0]! >= pas,
      observe: () => ({ fractionX: comptes[1]! / n, duree: libres() === 0 ? comptes[0]! : null, engages: n - libres() }),
      buffers: () => (flux ? [etat, comptes, agents.buffer(), flux.buffer()] : [etat, comptes, agents.buffer()]),
      apply() {},
    }
  },
}
