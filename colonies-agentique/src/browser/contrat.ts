// Contrat des données d'une page (07 §4; UC-010 à UC-012) : définition éditoriale + résumés et verdicts injectés au build.
// Aucun calcul de simulation ici : seulement des formes de données et leur validation.
import type { PageSummary } from '../analysis/descriptif.ts'

export type Niveau = 'voir' | 'explorer' | 'verifier'
export type Statut = 'reproduit' | 'publie' | 'simplifie' | 'hypothese' | 'analogie'
export const LIBELLES_STATUT: Record<Statut, string> = {
  reproduit: 'Résultat reproduit', publie: 'Résultat publié (non reproduit)', simplifie: 'Modèle simplifié',
  hypothese: "Hypothèse de l'auteur", analogie: 'Analogie',
}

export interface Enonce { texte: string; statut: Statut; cible?: string }
export interface LigneCarte { relation: string; ouCasse: string; statut: Statut; source: string }
export interface Etape {
  question: string
  variable: string                  // la seule variable que l'étape fait varier (BR-020)
  cellule: number                   // cellule du résumé jouée par l'étape
  prediction: { min: number; max: number; pas: number }
  conclusion: Enonce
  nePasConfondre: string
}
export interface ParametreExplorer { nom: string; etiquette: string; min: number; max: number; pas: number }
export interface PageDefinition {
  id: string
  titre: string                     // 2 à 4 mots
  public: 'grand public' | 'étudiants' | 'praticiens' | 'chercheurs'
  projet: string
  taxon: { latin: string; preset: string }
  duree: string
  niveaux: readonly Niveau[]
  cible: string                     // cible dont le résumé (UC-006) alimente la page
  mesure: { nom: string; etiquette: string; unite: string }
  graphe: { nom: string; etiquette: string; unite: string }
  rythmeMs: number                  // durée de lecture de l'exécution typique, par étape
  voir?: { etapes: readonly Etape[] }
  explorer?: {
    cellule: number
    repetitions: number
    parametres: readonly ParametreExplorer[]
    leurre?: { etiquette: string; unite: string; min: number; max: number; pas: number; revelation: string }
    defi: { texte: string; sens: '>=' | '<='; seuil: number }
    individus?: readonly { etiquette: string; regle: string }[]   // regle : texte avec {mesure} remplacé par la valeur observée
    gain?: { pRef: number; pMax: number; seuil: number }
  }
  carte: LigneCarte
  limites: string
}

export interface DonneesPage { definition: PageDefinition; resume: PageSummary; version: { coreVersion: string; commit: string } }

/** Erreurs de définition détectées au build (liste vide : définition acceptée). */
export function validerDefinition(d: PageDefinition, r: PageSummary): string[] {
  const e: string[] = []
  const mots = d.titre.trim().split(/\s+/).length
  if (mots < 2 || mots > 4) e.push(`titre : 2 à 4 mots (${mots})`)
  if (d.cible !== r.target) e.push(`cible : la page vise ${d.cible}, le résumé porte sur ${r.target}`)
  const cellule = (i: number, ou: string) => { if (!r.cells[i]) e.push(`${ou} : cellule ${i} absente du résumé`) }
  const etapes = d.voir?.etapes ?? []
  etapes.forEach((s, i) => {
    cellule(s.cellule, `voir.etapes[${i}]`)
    // BR-020 : d'une étape à la suivante, seule la variable déclarée change.
    const avant = r.cells[etapes[i - 1]?.cellule ?? -1]?.params, ici = r.cells[s.cellule]?.params
    if (avant && ici) {
      const changees = Object.keys(ici).filter(k => ici[k] !== avant[k])
      if (changees.length !== 1 || changees[0] !== s.variable) e.push(`voir.etapes[${i}] : une seule variable doit changer (${s.variable}); changent : ${changees.join(', ') || 'aucune'}`)
    }
    if (ici && !(s.variable in ici)) e.push(`voir.etapes[${i}] : variable inconnue du scénario : ${s.variable}`)
  })
  if (d.explorer) cellule(d.explorer.cellule, 'explorer')
  // BR-025 : « Résultat reproduit » exige une cible gelée au verdict satisfied.
  const reproduitPermis = r.state === 'frozen' && r.verdict.outcome === 'satisfied'
  const enonces: Enonce[] = [...etapes.map(s => s.conclusion), { texte: d.carte.relation, statut: d.carte.statut }]
  for (const x of enonces) if (x.statut === 'reproduit' && !reproduitPermis) e.push(`statut « Résultat reproduit » refusé : cible ${r.target} ${r.state}, verdict ${r.verdict.outcome}`)
  return e
}
