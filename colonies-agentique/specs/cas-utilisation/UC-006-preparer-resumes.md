---
id: UC-006
name: Préparer les résumés d'une page
status: Implemented
context: SIM
actors: [Chercheur]
linkedRequirements: [FR-006, NFR-001, NFR-007, C-004, C-007]
entities: [PageSummary, ReproductionTarget, Verdict, Scenario]
---

# UC-006 Préparer les résumés d'une page

## Vue d'ensemble

- **Acteur principal :** Chercheur
- **But :** obtenir, pour une cible vérifiée, le résumé que lit une page (distribution sur N graines, exécution typique de chaque condition), sans aucun calcul dans le navigateur.
- **Statut :** Implemented

## Préconditions

- La cible a été vérifiée par UC-003 : son verdict et la liste de ses répétitions existent dans `data/results/<projet>/`.

## Déclencheur

- Le chercheur prépare les données d'une page avant de la construire.

## Scénario nominal

1. Le chercheur lance `npm run summarize -- <identifiant de cible>`.
2. Le système lit le verdict et la liste des répétitions de la cible.
3. Le système vérifie que la cible et ses scénarios n'ont pas changé depuis son verdict.
4. Pour chaque scénario de la cible, le système calcule, sur la mesure du premier critère qui porte ce scénario : n, la moyenne, l'erreur-type, l'intervalle à 95 % des valeurs, et conserve la valeur de chaque répétition.
5. Pour chaque scénario, le système choisit la répétition typique par la règle de la médiane, sur la statistique de choix de la mesure (BR-027).
6. Le système écrit le résumé `data/results/<projet>/<id>.summary.json`.
7. Le système affiche le chemin du résumé, N, et la graine typique de chaque scénario.
8. Le système termine avec le code de sortie 0.

## Flots alternatifs

### A1. Cible non vérifiée
**Déclencheur :** à l'étape 2, le verdict ou la liste des répétitions est absent.
1. Le système affiche « Résumé impossible : cible <id> non vérifiée ».
2. Le système n'écrit aucun fichier.
3. Le système termine avec un code de sortie non nul.

### A2. Cible ou scénario modifié depuis le verdict
**Déclencheur :** à l'étape 3, le hachage de la cible, ou celui d'un de ses scénarios, diffère de celui que consigne le verdict.
1. Le système affiche « Résumé impossible : <cible ou chemin du scénario> modifié depuis le verdict de <id> ».
2. Le système n'écrit aucun fichier.
3. Le système termine avec un code de sortie non nul.

## Postconditions

**Succès :**
- Le résumé contient, pour chaque scénario : le scénario source et son hachage, n, la moyenne, l'erreur-type, l'intervalle à 95 %, la valeur de chaque répétition, et la répétition typique avec sa graine, son empreinte finale et sa statistique de choix.
- Le résumé contient l'identifiant, le verdict, le régime et la provenance (commit, moteur, version du noyau) de la cible.

**Échec :**
- Aucun résumé n'est écrit.

## Règles d'affaires

- **BR-027** : La répétition typique d'un scénario est celle dont la statistique de choix est la plus proche de la médiane de cette statistique sur les répétitions du scénario; en cas d'égalité, celle de plus petit rang. La statistique de choix est la valeur de la mesure, sauf pour une mesure que le modèle déclare comme la part s d'une option parmi deux : c'est alors la part de l'option majoritaire, max(s, 1 − s). Une distribution bimodale aux deux extrémités a sa médiane dans le creux, et la valeur brute y choisirait l'issue rare.
- **BR-028** : Un résumé n'exécute aucune simulation : il ne lit que les sorties de UC-003, produites par le moteur headless.
- **BR-029** : Le N préenregistré d'un résumé est le nombre de répétitions de la cible; une répétition sans valeur est comptée dans N et listée comme manquante, jamais retirée en silence.

## Exigences liées

FR-006 Préparer les résumés d'une page · NFR-001 Déterminisme · NFR-007 Taille de page · C-004 Pages statiques · C-007 Lieu du calcul

## Points soumis à la revue

Décisions de rédaction : (1) la source du résumé est une cible vérifiée (UC-003); le diagramme faisait inclure UC-004 (balayage), non rédigé : je propose « UC-006 inclut UC-003 », et une source « balayage » ajoutée par synchronisation quand UC-004 sera rédigé; (2) l'intervalle à 95 % est celui des valeurs (percentiles 2,5 et 97,5), qui décrit la dispersion des exécutions, distinct de l'IC de la moyenne; (3) la mesure résumée est celle du premier critère qui porte le scénario; (4) la règle de la médiane reprend 05 §8.3, avec un départage par le rang ajouté ici. Modification du 2026-10-01, décidée par le chercheur (D-14) : la statistique de choix d'une part entre deux options est la part majoritaire (BR-027); avec la valeur brute, la page-pilote montrait à r = 1 un partage presque égal (0,514), l'issue de 6 % des exécutions.
