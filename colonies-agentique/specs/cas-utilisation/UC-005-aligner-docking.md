---
id: UC-005
name: Aligner par docking
status: Review
context: SIM
actors: [Chercheur]
linkedRequirements: [FR-005, NFR-001, C-005]
entities: [DockingReport, ReferenceModel, Scenario, RunManifest]
---

# UC-005 Aligner par docking

## Vue d'ensemble

- **Acteur principal :** Chercheur
- **But :** établir si un modèle candidat produit les mêmes résultats qu'une référence, au niveau d'accord déclaré, et consigner la décision (`aligned` ou `not-aligned`) dans un rapport de docking rejouable.
- **Statut :** Review

## Préconditions

- Le plan de docking `docking/<id>.json` existe et déclare, avant toute exécution : la référence, le candidat, les cellules (valeurs de paramètres), les observables, le niveau d'accord, la marge s'il y a lieu, les répétitions et la graine maîtresse.
- Les scénarios du candidat, et ceux de la référence quand elle est un modèle, se compilent (UC-001).

## Déclencheur

- Le chercheur aligne deux implantations d'un même modèle, ou un modèle stochastique sur la relation que prédit son modèle déterministe.

## Scénario nominal

1. Le chercheur lance `npm run dock -- <id>`.
2. Le système valide le plan et affiche la référence, le candidat, le niveau d'accord et la marge.
3. Le système exécute, pour chaque cellule, les répétitions du candidat (et de la référence quand elle est un modèle) avec les mêmes graines maîtresses, en régime exploratoire (UC-001).
4. Le système calcule, par cellule et par observable, l'estimation et son erreur-type de Monte Carlo.
5. Le système applique le critère du niveau d'accord (BR-035) à chaque cellule ou relation.
6. Le système écrit le rapport `data/docking/<id>.report.json`.
7. Le système affiche, par cellule ou relation, l'écart et la décision, puis l'issue globale `aligned`.
8. Le système termine avec le code de sortie 0.

## Flots alternatifs

### A1. Plan invalide
**Déclencheur :** à l'étape 2, un champ du plan manque ou viole sa règle (niveau inconnu, marge absente au niveau `distributional`, cellule ou observable inconnue, oracle illisible).
1. Le système affiche « Plan de docking invalide : <champ> : <règle> ».
2. Le système n'exécute rien et n'écrit aucun fichier.
3. Le système termine avec un code de sortie non nul.

### A2. Plan sous-puissant
**Déclencheur :** à l'étape 2, au niveau `distributional`, le nombre de répétitions est inférieur au n requis par la marge.
1. Le système affiche « Plan refusé : n prévu = <n>, n requis = <requis> pour la marge <δ> ».
2. Le système n'exécute rien et n'écrit aucun fichier.
3. Le système termine avec un code de sortie non nul.

### A3. Désaccord
**Déclencheur :** à l'étape 5, au moins une cellule ou une relation ne remplit pas le critère.
1. Le système écrit le rapport avec l'issue `not-aligned` et la liste des cellules ou relations en défaut.
2. Le système affiche « Docking non aligné : <cellules ou relations> ».
3. Le système termine avec un code de sortie non nul.

## Postconditions

**Succès :**
- Le rapport contient le plan, le hachage de chaque scénario, les graines, l'estimation et l'erreur-type de chaque cellule pour chaque modèle, la décision par cellule ou relation, l'issue, le commit et le moteur.

**Échec :**
- Un plan invalide ou sous-puissant n'écrit aucun fichier; un désaccord écrit un rapport `not-aligned`.

## Règles d'affaires

- **BR-034** : Les observables, le niveau d'accord, la marge et les cellules sont fixés dans le plan avant toute exécution; le candidat et la référence reçoivent les mêmes graines maîtresses, et l'analyse est appariée par graine quand les deux sont des modèles.
- **BR-035** : Critères par niveau : `implementations` (référence = oracle d'une implantation indépendante, estimation et erreur-type par cellule) : écart < 3 erreurs-types combinées; `relational` : chaque relation déclarée (sens de variation d'une observable entre deux cellules) a le signe attendu, avec un IC à 95 % de la différence qui exclut 0; `distributional` : TOST apparié sur chaque observable, à la marge déclarée.
- **BR-036** : Un rapport `not-aligned` laisse la couche chorégraphique fermée pour cette référence (C-005); il n'est jamais remplacé en silence : une nouvelle tentative porte un nouvel identifiant de plan.

## Exigences liées

FR-005 Aligner par docking · NFR-001 Déterminisme · C-005 Réplication avant extension

## Points soumis à la revue

Décisions de rédaction : (1) ce cas couvre les usages (b) deux implantations et (c) EDO contre SSA du protocole (04 §12.1), exigés par la phase 0 (CS0.4, CS0.5 : T0.4 à T0.7); l'usage (a), modèle chorégraphique commun contre référence, et sa précondition « cible de la référence satisfaite » s'ajouteront par synchronisation quand le modèle commun existera (P1); (2) au niveau `relational`, la relation est déclarée par le plan à partir de la référence (pour T0.7 : sous σ* = 1,6875, P(|A − B|/N > 0,3) décroît avec N; au-delà, elle croît vers 1), puisque l'EDO partie d'un état symétrique ne produit pas elle-même cette probabilité; (3) emplacements `docking/<id>.json` et `data/docking/<id>.report.json` (rapport versionné); (4) l'oracle est un fichier JSON de `data/oracles/` produit par le script Python indépendant (C-003).
