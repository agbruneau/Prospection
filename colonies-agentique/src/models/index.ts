// Registre des modèles implantés : un identifiant de scénario désigne une entrée d'ici.
import { invalide } from '../core/scenario.ts'
import type { ReferenceModel } from '../core/simulation.ts'
import { goss1989 } from './reference/p1-goss-1989/model.ts'
import { pais2013Ou } from './reference/p5-pais-2013-ou/model.ts'
import { seeley2012 } from './reference/p5-seeley-2012/model.ts'
import { seeley2012Ssa } from './reference/p5-seeley-2012/ssa.ts'

export const MODELES: ReadonlyMap<string, ReferenceModel> = new Map([goss1989, pais2013Ou, seeley2012, seeley2012Ssa].map(m => [m.id, m]))

export function trouverModele(id: string, modeles = MODELES): ReferenceModel {
  const m = modeles.get(id)
  if (!m) throw invalide('model.id', `modèle non implanté : ${id}`)
  return m
}
