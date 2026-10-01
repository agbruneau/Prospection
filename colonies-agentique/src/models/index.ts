// Registre des modèles implantés : un identifiant de scénario désigne une entrée d'ici.
import { createStream } from '../core/random.ts'
import { invalide, type CompiledScenario } from '../core/scenario.ts'
import type { ReferenceModel } from '../core/simulation.ts'
import { goss1989 } from './reference/p1-goss-1989/model.ts'
import { pais2013Ou } from './reference/p5-pais-2013-ou/model.ts'
import { seeley2012 } from './reference/p5-seeley-2012/model.ts'
import { seeley2012Ssa } from './reference/p5-seeley-2012/ssa.ts'
import { j4Copie } from './reference/s0-j4-copie/model.ts'
import { j6Marcheurs } from './reference/s0-j6-marcheurs/model.ts'
import { m6Quorum } from './reference/s0-m6-quorum/model.ts'

export const MODELES: ReadonlyMap<string, ReferenceModel> = new Map([goss1989, pais2013Ou, seeley2012, seeley2012Ssa, j4Copie, j6Marcheurs, m6Quorum].map(m => [m.id, m]))

export function trouverModele(id: string, modeles = MODELES): ReferenceModel {
  const m = modeles.get(id)
  if (!m) throw invalide('model.id', `modèle non implanté : ${id}`)
  return m
}

const hex = (mots: Uint32Array) => Array.from(mots, x => x.toString(16).padStart(8, '0')).join('')

/** Résout le modèle, contrôle les mesures et crée la simulation avec ses flux déclarés (Node et navigateur). */
export function preparer(compile: CompiledScenario, modeles = MODELES) {
  const modele = trouverModele(compile.model.id, modeles)
  for (const m of compile.measures) if (!(m in modele.measureUnits)) throw invalide('measures', `mesure inconnue du modèle : ${m}`)
  const flux = new Map(compile.streams.map(n => [n, createStream(BigInt(compile.seed), n)]))
  const etatsInitiaux = [...flux].map(([name, g]) => ({ name, initialState: hex(g.state()) }))
  const sim = modele.create(compile, {
    stream(n) {
      const g = flux.get(n)
      if (!g) throw invalide('streams', `flux non déclaré : ${n}`)
      return g
    },
  })
  return { modele, sim, etatsInitiaux }
}
