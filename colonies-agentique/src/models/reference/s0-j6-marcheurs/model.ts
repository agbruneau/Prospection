// Jouet J6 de la fiche S0 (§4.2) : N marcheurs aléatoires indépendants, sans canal, sur un tore L × L, partis de la même case.
// Référence nulle de G (T0.36) : temps de couverture C_N (pas jusqu'à ce que toutes les cases aient été visitées).
// Ordre sans effet : les marcheurs n'interagissent pas.
import { invalide } from '../../../core/scenario.ts'
import type { ReferenceModel } from '../../../core/simulation.ts'

const PAS: readonly (readonly [number, number])[] = [[1, 0], [-1, 0], [0, 1], [0, -1]]   // voisinage de von Neumann

export const j6Marcheurs: ReferenceModel = {
  id: 's0-j6-marcheurs',
  measureUnits: { couverture: 'fraction', tempsCouverture: 'pas' },
  create(s, f) {
    const N = s.parameters.N?.value, L = s.parameters.L?.value
    if (typeof N !== 'number' || !Number.isInteger(N) || N < 1) throw invalide('parameters.N', 'entier ≥ 1')
    if (typeof L !== 'number' || !Number.isInteger(L) || L < 2) throw invalide('parameters.L', 'entier ≥ 2')
    if (s.interventions.length) throw invalide('interventions', 'non prises en charge par ce modèle')
    const agents = f.stream('agents'), pas = Math.round(s.time.horizon / s.time.dt)
    const x = new Int32Array(N), y = new Int32Array(N), visite = new Uint8Array(L * L), etat = new Float64Array(2)   // [pas, cases visitées]
    visite[0] = 1; etat[1] = 1
    return {
      advance() {
        for (let i = 0; i < N; i++) {
          const [dx, dy] = PAS[agents.int(4)]!
          x[i] = (x[i]! + dx + L) % L; y[i] = (y[i]! + dy + L) % L
          const k = y[i]! * L + x[i]!
          if (!visite[k]) { visite[k] = 1; etat[1] = etat[1]! + 1 }
        }
        etat[0] = etat[0]! + 1
      },
      time: () => etat[0]! * s.time.dt,
      done: () => etat[1] === L * L || etat[0]! >= pas,
      observe: () => ({ couverture: etat[1]! / (L * L), tempsCouverture: etat[1] === L * L ? etat[0]! : null }),
      buffers: () => [x, y, visite, etat, agents.buffer()],
      apply() {},
    }
  },
}
