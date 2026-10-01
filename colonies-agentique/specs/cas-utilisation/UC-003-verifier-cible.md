---
id: UC-003
name: Vérifier une cible de reproduction
status: Implemented
context: SIM
actors: [Chercheur]
linkedRequirements: [FR-003, NFR-001, C-006]
entities: [ReproductionTarget, Verdict, Deviation, Scenario, ReferenceModel, RunManifest]
---

# UC-003 Vérifier une cible de reproduction

## Vue d'ensemble

- **Acteur principal :** Chercheur
- **But :** obtenir le verdict d'une cible de reproduction (`satisfied`, `unsatisfied` ou `inconclusive`), fondé sur des exécutions rejouables, pour décider de la porte de réplication.
- **Statut :** Implemented

## Préconditions

- La cible est définie dans une fiche de `projets/` et son extrait exécutable `targets/<projet>/T<projet>.<n>.json` existe.
- Pour une cible `frozen` ou `provisional`, le modèle de référence visé est implanté.

## Déclencheur

- Le chercheur lance la vérification d'une cible, ou de toutes les cibles d'un projet.

## Scénario nominal

1. Le chercheur lance `npm run reproduce -- <identifiant de cible>` (par exemple `T1.1`).
2. Le système charge la cible et affiche son état (`frozen`), son niveau d'accord et sa marge.
3. Le système vérifie que le nombre de répétitions prévu atteint le n requis par la marge.
4. Le système exécute les répétitions sur la liste de graines gelée, en régime confirmatoire (UC-001).
5. Le système calcule la statistique de la cible et applique sa règle de décision.
6. Le système écrit le verdict et les manifestes dans `data/results/<projet>/`.
7. Le système affiche l'issue, la valeur mesurée avec son erreur-type de Monte Carlo, et n.
8. Le système termine avec le code de sortie 0.

## Flots alternatifs

### A1. Cible bloquée
**Déclencheur :** à l'étape 2, l'état de la cible est `blocked`.
1. Le système affiche « Cible bloquée : <raison> (à faire) ».
2. Le système n'exécute aucune répétition et n'écrit aucun verdict.
3. Le système termine avec le code de sortie 0.

### A2. Cible provisoire
**Déclencheur :** à l'étape 2, l'état de la cible est `provisional`.
1. Le système exécute les répétitions en régime exploratoire.
2. Le système écrit un verdict marqué « sous réserve ».
3. Le système affiche l'issue suivie de « (sous réserve) ».
4. Le système termine avec le code de sortie 0.

### A3. Plan sous-puissant
**Déclencheur :** à l'étape 3, le nombre de répétitions prévu est inférieur au n requis par la marge.
1. Le système affiche « Plan refusé : n prévu = <n>, n requis = <requis> pour la marge <δ> ».
2. Le système n'exécute aucune répétition.
3. Le système termine avec un code de sortie non nul.

### A4. Issue indéterminée
**Déclencheur :** à l'étape 5, la règle de décision ne permet de conclure ni à l'accord ni au désaccord.
1. Le système ajoute des répétitions, jusqu'à `maxRepetitions`.
2. Le système reprend à l'étape 5.
3. Si `maxRepetitions` est atteint sans conclusion, l'issue est `inconclusive`.

### A5. Issue défavorable
**Déclencheur :** à l'étape 7, l'issue d'une cible `frozen` est `unsatisfied` ou `inconclusive`.
1. Le système affiche l'issue et les critères non remplis.
2. Le système termine avec un code de sortie non nul.

### A6. Toutes les cibles d'un projet
**Déclencheur :** à l'étape 1, l'argument est un identifiant de projet (par exemple `P1`).
1. Le système applique les étapes 2 à 7 à chaque cible du projet.
2. Le système affiche un tableau : cible, état, issue, n.
3. Le système termine avec un code de sortie non nul si au moins une cible `frozen` a une issue défavorable, 0 sinon.

## Postconditions

**Succès :**
- Chaque cible exécutée a un verdict et ses manifestes dans `data/results/<projet>/`.
- Le rapport compte comme satisfaites les seules cibles `frozen` à l'issue `satisfied`.

**Échec :**
- Un plan refusé n'écrit aucun fichier.

## Règles d'affaires

- **BR-008** : Une cible `blocked` n'est jamais exécutée ni comptée satisfaite.
- **BR-009** : Une cible `provisional` ne produit que des exécutions exploratoires et, au mieux, un verdict « sous réserve », jamais compté satisfait.
- **BR-010** : Un critère d'équivalence (TOST) dont le n prévu est inférieur au n requis est refusé avant toute exécution.
- **BR-011** : Une cible `frozen` s'exécute sur sa liste de graines gelée, sans ajustement de paramètre; un écart au protocole reçoit un identifiant `D-<projet>-<nnn>` du registre des déviations.
- **BR-012** : Les critères d'une même cible sont conjonctifs.
- **BR-013** : Le code de sortie est non nul seulement si une cible `frozen` a une issue `unsatisfied` ou `inconclusive`, ou si un plan est refusé.

## Exigences liées

FR-003 Vérifier une cible de reproduction · NFR-001 Déterminisme · C-006 Exécution confirmatoire

## Points soumis à la revue

Décision de rédaction : la règle BR-013 sur le code de sortie (les documents de recherche fixent les issues, pas les codes de sortie). La syntaxe `npm run reproduce -- <identifiant>` précise la commande nommée par [05](../../docs/05-spec-simulation.md) §9.1.

Le « comment » (TOST, garde de puissance, erreur-type de Monte Carlo, états des cibles) est dans [04-protocole-reproduction.md](../../docs/04-protocole-reproduction.md) et [05-spec-simulation.md](../../docs/05-spec-simulation.md) §9.2 et §9.3.
