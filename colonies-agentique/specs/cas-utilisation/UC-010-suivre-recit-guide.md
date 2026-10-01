---
id: UC-010
name: Suivre un récit guidé
status: Review
context: PAGES
actors: [Lecteur]
linkedRequirements: [FR-010, FR-017, NFR-003, NFR-009, C-004, C-008]
entities: [Page, PageSummary, Statement]
---

# UC-010 Suivre un récit guidé

## Vue d'ensemble

- **Acteur principal :** Lecteur
- **But :** comprendre un mécanisme en prédisant le résultat d'une exécution, puis en le comparant à l'exécution typique et à sa distribution sur N graines.
- **Statut :** Review

## Préconditions

- La page est publiée avec le niveau Voir et ses résumés précalculés (`PageSummary`).

## Déclencheur

- Le lecteur ouvre la page au niveau Voir.

## Scénario nominal

1. Le lecteur ouvre la page au niveau Voir.
2. Le système affiche la première étape : une question, la variable que l'étape fait varier et le champ de prédiction.
3. Le lecteur saisit sa prédiction.
4. Le lecteur choisit « Lancer ».
5. Le système joue l'exécution typique, annoncée comme telle, au rythme de l'étape.
6. Le système affiche le résultat à côté de la prédiction, avec la distribution compacte sur N graines : exécution typique, médiane, intervalle.
7. Le système affiche la conclusion de l'étape, avec son statut épistémique, et l'encadré « Ce que ça ne veut pas dire ».
8. Le lecteur choisit « Étape suivante »; les étapes 2 à 7 se répètent jusqu'à la dernière étape du récit.
9. Le système affiche la ligne de carte agentique de la page.

## Flots alternatifs

### A1. Prédiction passée
**Déclencheur :** à l'étape 3, le lecteur choisit « Passer ».
1. Le système joue l'exécution typique, comme à l'étape 5.
2. Le système affiche le résultat et la distribution, sans comparaison à une prédiction.
3. Le récit reprend à l'étape 7.

### A2. Pause
**Déclencheur :** à l'étape 5, le lecteur choisit « Pause ».
1. Le système suspend l'animation.
2. Le lecteur choisit « Lecture »; le récit reprend à l'étape 5, là où il s'était arrêté.

## Postconditions

**Succès :**
- Chaque étape vue a montré une prédiction ou un passage, le résultat de l'exécution typique et sa distribution.
- Aucune donnée sur le lecteur n'est transmise ni conservée.

**Échec :**
- Sans objet : le récit s'interrompt seulement si le lecteur quitte la page.

## Règles d'affaires

- **BR-017** : Aucune exécution n'est montrée sans sa distribution sur N graines, au moins sous forme compacte; N est le N préenregistré du résumé.
- **BR-018** : L'exécution du niveau Voir est l'exécution typique : sa graine est la `replaySeed` du résumé, choisie une fois avant publication par la règle consignée.
- **BR-019** : Chaque énoncé et chaque figure porte un statut épistémique de la liste fermée du cadre et un régime, dans les attributs `data-statut` et `data-regime`.
- **BR-020** : Une étape du récit fait varier une seule variable.

## Exigences liées

FR-010 Suivre un récit guidé · FR-017 Lire le statut épistémique · NFR-003 Accessibilité · NFR-009 Confidentialité · C-004 Pages statiques · C-008 Charte et statuts

## Points soumis à la revue

La liste fermée des statuts comprend, depuis la révision 4.1 du [cadre](../../docs/00-cadre.md), *Résultat publié (non reproduit)*; [07](../../docs/07-vulgarisation-evaluation.md) §5 en donne la forme d'affichage. Le « comment » (zones Z0 à Z10, rythme, accessibilité) est dans 07 §4 et §8.
