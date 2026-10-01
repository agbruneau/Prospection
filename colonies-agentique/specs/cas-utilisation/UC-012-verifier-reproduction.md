---
id: UC-012
name: Vérifier une reproduction
status: Review
context: PAGES
actors: [Lecteur]
linkedRequirements: [FR-012, FR-017, NFR-001, NFR-003, C-008]
entities: [Page, Statement, ReproductionTarget, Verdict, Deviation, RunManifest, PageSummary]
---

# UC-012 Vérifier une reproduction

## Vue d'ensemble

- **Acteur principal :** Lecteur
- **But :** juger la solidité d'un résultat affiché à partir de sa cible, de son verdict, de sa distribution et du manifeste d'une exécution rejouée.
- **Statut :** Review

## Préconditions

- La page est publiée avec le niveau Vérifier, ses résumés précalculés et les verdicts des cibles qu'elle affiche.

## Déclencheur

- Le lecteur choisit le niveau Vérifier.

## Scénario nominal

1. Le lecteur choisit le niveau Vérifier.
2. Le système affiche, pour chaque résultat confirmatoire : l'identifiant de la cible avec le lien vers sa fiche, le niveau d'accord visé, la marge, le verdict et les déviations.
3. Le système affiche la distribution complète sur N graines, avec la plage de graines et la version du moteur.
4. Le système affiche le balayage de paramètres en petits multiples.
5. Le lecteur ouvre une cellule du balayage.
6. Le système rejoue l'exécution de cette cellule et affiche son manifeste : version du moteur, graine, empreinte.
7. Le système compare l'empreinte finale à celle du manifeste et affiche « identique » ou « autre moteur : trajectoire non garantie identique, distributions équivalentes ».

## Flots alternatifs

### A1. Cible non reproduite ou bloquée
**Déclencheur :** à l'étape 2, le verdict d'une cible n'est pas `satisfied`, ou la cible est `blocked`.
1. Le système affiche « non reproduit » ou « bloqué », avec la raison, à la place de *Résultat reproduit*.

### A2. Valeur à confirmer
**Déclencheur :** à l'étape 2, une valeur affichée vient d'une source marquée « à confirmer » dans son dossier.
1. Le système affiche la valeur avec la mention « valeur à confirmer ».

## Postconditions

**Succès :**
- Le lecteur a vu, pour chaque résultat confirmatoire, la cible, le verdict, la distribution et le manifeste d'une exécution rejouée.
- Aucun résultat n'est présenté comme reproduit sans verdict `satisfied`.

**Échec :**
- Sans objet : une cellule qui ne se rejoue pas affiche « rejeu impossible » et sa raison.

## Règles d'affaires

- **BR-025** : L'étiquette *Résultat reproduit* exige une cible au verdict `satisfied`; elle porte la mention « réplication d'un modèle publié, non validation empirique ».
- **BR-026** : Une valeur issue d'une source marquée « à confirmer » ne s'affiche jamais sans cette mention.

Règles reprises : BR-007 (identité de rejeu seulement sur le même moteur), BR-017 (distribution toujours affichée), BR-019 (statut et régime).

## Exigences liées

FR-012 Vérifier une reproduction · FR-017 Lire le statut épistémique · NFR-001 Déterminisme · NFR-003 Accessibilité · C-008 Charte et statuts

## Points soumis à la revue

Le panneau « multivers » de [07](../../docs/07-vulgarisation-evaluation.md) §4.6 (parcours des balayages précalculés) n'est pas spécifié ici; il deviendra un flot alternatif ou un cas distinct quand une page en aura besoin. L'export des données est le cas UC-015, pas encore rédigé.
