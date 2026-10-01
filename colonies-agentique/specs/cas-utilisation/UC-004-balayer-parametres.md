---
id: UC-004
name: Balayer des paramètres
status: Review
context: SIM
actors: [Chercheur]
linkedRequirements: [FR-004, NFR-001, C-006, C-007]
entities: [SweepPlan, Scenario, RunManifest]
---

# UC-004 Balayer des paramètres

## Vue d'ensemble

- **Acteur principal :** Chercheur
- **But :** exécuter un scénario sur le produit cartésien de valeurs de paramètres et de répétitions, et obtenir une ligne par exécution et un résumé par point, identiques quel que soit le nombre de travailleurs.
- **Statut :** Review

## Préconditions

- Le scénario de base se compile (UC-001).
- Le plan de balayage `sweeps/<nom>.json` existe.

## Déclencheur

- Le chercheur prépare un diagramme de phases, une analyse de sensibilité ou les données d'une expérience exploratoire.

## Scénario nominal

1. Le chercheur lance `npm run sweep -- sweeps/<nom>.json`, avec en option le nombre de travailleurs (`--workers <k>`, 1 par défaut).
2. Le système valide le plan : scénario de base, axes (paramètre et valeurs), répétitions, observables, graine maîtresse et pairage.
3. Le système forme les tâches : chaque couple (point, répétition), un point étant une combinaison de valeurs des axes, avec la graine que fixe le pairage (BR-031).
4. Le système exécute chaque tâche comme une exécution de UC-001, en régime exploratoire, avec k travailleurs.
5. Le système réordonne les résultats par (point, répétition) et écrit dans `data/sweeps/<nom>/` : `results.csv` (une ligne par exécution), `summary.csv` (une ligne par point) et `sweep-manifest.json`.
6. Le système affiche le nombre de points, le nombre d'exécutions et le chemin des résultats.
7. Le système termine avec le code de sortie 0.

## Flots alternatifs

### A1. Plan invalide
**Déclencheur :** à l'étape 2, un champ du plan manque ou viole sa règle (paramètre inconnu du scénario, valeur hors bornes, répétitions ≤ 0, observable inconnue du modèle, pairage inconnu).
1. Le système affiche « Plan invalide : <champ> : <règle> ».
2. Le système n'exécute aucune tâche et n'écrit aucun fichier.
3. Le système termine avec un code de sortie non nul.

### A2. Reprise d'un balayage interrompu
**Déclencheur :** à l'étape 1, le chercheur ajoute `--resume`.
1. Le système saute chaque tâche dont la ligne existe déjà dans `results.csv` avec le même hachage de scénario.
2. Le système exécute les autres tâches et reprend à l'étape 5.

### A3. Observable sans valeur
**Déclencheur :** à l'étape 4, une exécution ne produit pas de valeur pour une observable (état invalide ou mesure absente).
1. Le système écrit la ligne de l'exécution avec une cellule vide pour cette observable.
2. Le système consigne la tâche et la cause dans `missing` du manifeste de balayage.
3. Le système poursuit le balayage; le résumé du point compte n sans cette exécution.

## Postconditions

**Succès :**
- `results.csv` contient une ligne par tâche (point, répétition, graine, valeurs des axes, valeur brute de chaque observable).
- `summary.csv` contient par point : n, moyenne, écart-type, erreur-type de Monte Carlo et IC à 95 % par bootstrap, pour chaque observable.
- `sweep-manifest.json` contient le plan, le hachage du scénario de base, le nombre d'exécutions, le nombre de travailleurs, la durée et le SHA-256 de chaque fichier.

**Échec :**
- Un plan invalide n'écrit aucun fichier.

## Règles d'affaires

- **BR-030** : Le contenu de `results.csv` et de `summary.csv` ne dépend ni du nombre de travailleurs ni de l'ordre d'arrivée des résultats.
- **BR-031** : Avec le pairage `by-repetition`, la répétition i reçoit la même graine à tous les points (nombres aléatoires communs); avec `by-cell`, chaque couple (point, répétition) reçoit une graine propre.
- **BR-032** : Un balayage s'exécute toujours en régime exploratoire : il ne produit aucun verdict.
- **BR-033** : `results.csv` garde la valeur brute de chaque exécution, jamais seulement un agrégat; l'IC par bootstrap du résumé tire ses rééchantillonnages d'un flux à graine, et deux balayages identiques donnent le même `summary.csv`.

## Exigences liées

FR-004 Balayer des paramètres · NFR-001 Déterminisme · C-006 Exécution confirmatoire · C-007 Lieu du calcul

## Points soumis à la revue

Décisions de rédaction : (1) emplacements `sweeps/<nom>.json` pour les plans et `data/sweeps/<nom>/` pour les résultats (05 §8.2 nomme les fichiers, pas le dossier); (2) une observable est la valeur finale de la mesure, ou sa moyenne sur une fenêtre déclarée (05 §10.2); (3) l'hystérésis (`carryState`, 05 §10.3) n'est pas couverte : elle demande au modèle d'exporter son état, et viendra avec le premier projet qui l'exige (P6); un plan avec `carryState: true` est refusé (A1); (4) les travailleurs sont des `worker_threads`, et le test d'agrégation de 05 §9.6 (1, 2 et 4 travailleurs) vérifie BR-030.
