---
id: UC-001
name: Exécuter un scénario
status: Review
context: SIM
actors: [Chercheur]
linkedRequirements: [FR-001, NFR-001, NFR-009, C-001, C-002, C-006]
entities: [Scenario, ReferenceModel, RunManifest]
---

# UC-001 Exécuter un scénario

## Vue d'ensemble

- **Acteur principal :** Chercheur
- **But :** obtenir, pour un scénario et sa graine, des séries et un manifeste qui permettent de rejouer l'exécution au bit près.
- **Statut :** Review

## Préconditions

- Le fichier de scénario existe et désigne un modèle implanté (`ReferenceModel` ou `ChoreographyModel`).
- Le dossier de sortie est accessible en écriture.

## Déclencheur

- Le chercheur lance l'exécution d'un scénario en ligne de commande.

## Scénario nominal

1. Le chercheur lance `node src/cli/run.ts <fichier de scénario>`, avec `--out <dossier>` (par défaut `data/runs/`).
2. Le système compile le scénario et affiche son hachage et son régime.
3. Le système exécute le modèle jusqu'à l'horizon du scénario.
4. Le système écrit le fichier de séries et le manifeste dans le dossier de sortie.
5. Le système affiche le `runId`, le chemin du manifeste et l'empreinte d'état finale.
6. Le système termine avec le code de sortie 0.

## Flots alternatifs

### A1. Scénario invalide
**Déclencheur :** à l'étape 2, une règle de validation du scénario échoue.
1. Le système affiche « Scénario invalide : <champ> : <règle> ».
2. Le système n'écrit aucun fichier.
3. Le système termine avec un code de sortie non nul.

### A2. Paramètre à confirmer en régime confirmatoire
**Déclencheur :** à l'étape 2, le régime est `confirmatory` et un paramètre a le statut `to-confirm`.
1. Le système affiche « Exécution confirmatoire refusée : paramètre à confirmer : <nom> ».
2. Le système n'écrit aucun fichier.
3. Le système termine avec un code de sortie non nul.

### A3. Arbre de travail modifié en régime confirmatoire
**Déclencheur :** à l'étape 2, le régime est `confirmatory` et l'arbre de travail git contient des modifications non commitées.
1. Le système affiche « Exécution confirmatoire refusée : arbre de travail modifié ».
2. Le système n'écrit aucun fichier.
3. Le système termine avec un code de sortie non nul.

## Flots d'exception

### E1. État non numérique
**Déclencheur :** à l'étape 3, l'état du modèle contient une valeur `NaN`.
1. Le système arrête l'exécution.
2. Le système affiche « État invalide au pas <n> : <variable> ».
3. Le système n'écrit aucun manifeste.
4. Le système termine avec un code de sortie non nul.

## Postconditions

**Succès :**
- Le dossier de sortie contient le fichier de séries `<modèle>__<hash8>__s<graine>.series.csv` et le manifeste de l'exécution.
- Le manifeste contient tous les champs de son schéma, dont l'empreinte d'état au dernier instant échantillonné.

**Échec :**
- Aucun manifeste n'est écrit pour cette exécution.
- Les fichiers déjà présents dans le dossier de sortie sont inchangés.

## Règles d'affaires

- **BR-001** : Une exécution produit exactement un manifeste, qui liste chaque fichier de sortie avec son SHA-256.
- **BR-002** : Une exécution confirmatoire refuse tout paramètre au statut `to-confirm`.
- **BR-003** : Deux exécutions du même scénario, avec la même graine et sur le même commit, ont le même `runId`.
- **BR-004** : Une valeur manquante s'écrit comme une cellule vide, avec une entrée `missing` et sa cause; aucune sortie ne contient `NaN` ni l'infini.
- **BR-005** : Une exécution confirmatoire exige un arbre de travail sans modification non commitée.

## Exigences liées

FR-001 Exécuter un scénario · NFR-001 Déterminisme · NFR-009 Confidentialité · C-001 TypeScript · C-002 Aléa contrôlé · C-006 Exécution confirmatoire

## Points soumis à la revue

Décisions de rédaction, absentes des documents de recherche : le dossier de sortie par défaut `data/runs/`; la règle BR-005 (le manifeste de [05](../../docs/05-spec-simulation.md) §4.9 consigne l'état de l'arbre sans exiger qu'il soit propre).

Le « comment » (compilation, flux, empreintes, format CSV) est dans [05-spec-simulation.md](../../docs/05-spec-simulation.md) §4 et §8.
