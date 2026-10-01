---
id: UC-011
name: Explorer un modèle
status: Review
context: PAGES
actors: [Lecteur]
linkedRequirements: [FR-011, FR-014, FR-017, NFR-003, NFR-005, C-004, C-007, C-008]
entities: [Page, Scenario, PageSummary, Statement, G]
---

# UC-011 Explorer un modèle

## Vue d'ensemble

- **Acteur principal :** Lecteur
- **But :** voir comment le comportement collectif change quand on règle un paramètre du modèle, et relier ce changement aux règles individuelles.
- **Statut :** Review

## Préconditions

- La page est publiée avec le niveau Explorer.

## Déclencheur

- Le lecteur choisit le niveau Explorer.

## Scénario nominal

1. Le lecteur choisit le niveau Explorer.
2. Le système affiche la scène, les graphes synchronisés, les paramètres que la fiche du projet déclare pour le niveau Explorer (chacun avec sa valeur et son unité) et un défi court.
3. Le lecteur règle un paramètre.
4. Le système applique la nouvelle valeur comme intervention datée en temps de simulation.
5. Le système relance l'exécution avec cette valeur.
6. Le système met à jour la scène, les graphes et la distribution, avec un compteur « n sur N » et l'étiquette « calcul navigateur, non confirmatoire ».
7. Le lecteur règle les paramètres jusqu'à remplir la condition du défi.
8. Le système signale que la condition du défi est remplie.

## Flots alternatifs

### A1. Suivre un individu
**Déclencheur :** à l'étape 6, le lecteur choisit « Suivre un individu ».
1. Le système met en évidence un individu et masque ce qui est hors de son rayon de perception.
2. Le système affiche la règle que l'individu applique, avec les quantités de l'instant.
3. Le lecteur choisit l'individu précédent ou suivant; le système met à jour la mise en évidence et la règle.

### A2. Curseur leurre
**Déclencheur :** à l'étape 3, le lecteur règle le paramètre leurre.
1. Le système relance l'exécution; le comportement collectif ne change pas.
2. Le système révèle que ce paramètre n'existe pas dans le modèle publié, avec l'étiquette *Modèle simplifié*.

### A3. Gain collectif indéfini
**Déclencheur :** à l'étape 6, l'écart P_max − P_ref est sous le seuil du plan de recherche.
1. Le système affiche « indéfini » à la place de G, avec la différence appariée Δ.

## Postconditions

**Succès :**
- Chaque résultat affiché porte le régime exploratoire.
- Chaque réglage du lecteur figure dans les interventions du manifeste de l'exécution affichée.

**Échec :**
- Sans objet : un réglage refusé laisse l'exécution affichée inchangée.

## Règles d'affaires

- **BR-021** : Un résultat calculé dans le navigateur porte le régime exploratoire et l'étiquette « calcul navigateur, non confirmatoire »; il n'est jamais présenté comme *Résultat reproduit*.
- **BR-022** : Quand G est indéfini, la page affiche « indéfini », jamais un nombre.
- **BR-023** : Toute action du lecteur sur le modèle est une intervention datée en temps de simulation, inscrite au manifeste, donc rejouable.
- **BR-024** : Le curseur leurre est révélé comme absent du modèle publié dès que le lecteur l'a utilisé.

Règles reprises : BR-017 (distribution toujours affichée), BR-019 (statut et régime).

## Exigences liées

FR-011 Explorer un modèle · FR-014 Suivre un individu · FR-017 Lire le statut épistémique · NFR-003 Accessibilité · NFR-005 Fluidité interactive · C-004 Pages statiques · C-007 Lieu du calcul · C-008 Charte et statuts

## Points soumis à la revue

Le seuil de P_max − P_ref vient du plan de recherche ([03](../../docs/03-plan-de-recherche.md)), encore [à confirmer]. « Modifier la règle » est un cas distinct (UC-014), pas encore rédigé. Le « comment » (worker, `compileScenario`, interdits de la couche navigateur) est dans [05](../../docs/05-spec-simulation.md) §14 et [07](../../docs/07-vulgarisation-evaluation.md) §4.5.
