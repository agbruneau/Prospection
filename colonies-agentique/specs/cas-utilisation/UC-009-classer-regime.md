---
id: UC-009
name: Classer le régime de coordination
status: Review
context: SIM
actors: [Chercheur]
linkedRequirements: [FR-009, NFR-001, C-007]
entities: [RegimeReport, RunManifest]
---

# UC-009 Classer le régime de coordination

## Vue d'ensemble

- **Acteur principal :** Chercheur
- **But :** obtenir, pour un cas d'école exécuté sur N graines, les six indicateurs de régime lus dans le journal d'événements, avec leurs intervalles, et le régime que leur assigne la règle de classement, pour placer le cas dans la typologie et mettre les indicateurs à l'épreuve (H0.2).
- **Statut :** Review

## Préconditions

- Le plan `regimes/<id>.json` existe et déclare, avant toute exécution : le cas d'école (CE1 à CE6, CE2p), la taille du collectif, l'architecture déclarée (détenteur d'un plan, artefact global G externe ou non), la durée caractéristique de la tâche T_tâche, les répétitions et la graine maîtresse.

## Déclencheur

- Le chercheur valide les indicateurs sur un cas d'école, ou classe un système dont il a le journal.

## Scénario nominal

1. Le chercheur lance `npm run regime -- <id>`.
2. Le système valide le plan et affiche le cas, la taille et l'architecture déclarée.
3. Le système exécute les répétitions du cas, en régime exploratoire, et enregistre le journal d'événements de chacune (décisions, messages adressés, écritures et lectures de trace; 06 §2.1).
4. Le système calcule, pour chaque exécution, C_ctrl, C_spec (e, χ), C_med, C_stig, C_mem et C_amp (06 §2.2).
5. Le système calcule, pour chaque indicateur, l'estimation sur les exécutions et son IC à 95 % (BR-042).
6. Le système applique la règle de classement de 06 §1.4 à l'architecture déclarée et aux estimations (BR-041).
7. Le système écrit le rapport `data/regimes/<id>.regime.json`.
8. Le système affiche chaque indicateur avec son IC, puis le régime.
9. Le système termine avec le code de sortie 0.

## Flots alternatifs

### A1. Plan invalide
**Déclencheur :** à l'étape 2, un champ du plan manque ou viole sa règle (cas inconnu, taille hors des bornes du cas, T_tâche ≤ 0, répétitions ≤ 0).
1. Le système affiche « Plan de régime invalide : <champ> : <règle> ».
2. Le système n'exécute rien et n'écrit aucun fichier.
3. Le système termine avec un code de sortie non nul.

### A2. Indicateur non défini
**Déclencheur :** à l'étape 4, un indicateur n'a pas d'objet dans le cas (χ sans artefact G externe; C_amp sans proposition individuelle identifiable; C_stig sans occasion d'agir ni trace).
1. Le système consigne l'indicateur « non défini » avec sa raison, sans valeur numérique.
2. Le système reprend à l'étape 5 pour les autres indicateurs.

### A3. Classement non tranché
**Déclencheur :** à l'étape 6, aucune règle ne s'applique, ou le cas relève d'un hybride ou d'un cas limite.
1. Le système consigne le régime « hybride » ou « non classé », avec les règles remplies et celles qui ne le sont pas.
2. Le système reprend à l'étape 7.

## Postconditions

**Succès :**
- Le rapport contient le plan, le hachage du cas, les graines, la valeur de chaque indicateur par exécution, les estimations et leurs IC, les règles remplies et le régime, le commit et le moteur.

**Échec :**
- Un plan invalide n'écrit aucun fichier.

## Règles d'affaires

- **BR-041** : Le plan global (A1) se lit dans l'architecture déclarée, jamais dans le journal seul; C_ctrl ne classe jamais seul : un rôle-pivot de chorégraphie atteint le C_ctrl d'un orchestrateur, et seul C_spec les sépare (CE2p).
- **BR-042** : L'unité statistique est l'exécution; les IC viennent d'un bootstrap sur les exécutions, à graine : deux classements identiques donnent le même rapport.
- **BR-043** : C_stig se mesure par intervention, avec des graines communes (trace présente contre trace effacée), jamais par simple corrélation.
- **BR-044** : χ est la fraction de traces conformes à l'artefact G : pour une saga, une trace conforme est T₁…Tₙ ou T₁…Tⱼ Cⱼ…C₁ avec 0 ≤ j < n (T0.33); pour une chorégraphie BPMN, l'initiateur de chaque activité a participé à l'activité précédente (T0.34).
- **BR-045** : Un hybride ou un cas limite est rapporté avec ses indicateurs, sans classement forcé dans un régime principal.

## Exigences liées

FR-009 Classer un régime de coordination · NFR-001 Déterminisme · C-007 Lieu du calcul

## Points soumis à la revue

Décisions de rédaction : (1) une nouvelle exigence FR-009 porte ce cas : FR-007 ne couvre que R et G, et UC-007 a exclu les indicateurs (point 2 de sa revue); (2) les cas d'école sont des jouets sans LLM, implantés dans le noyau des modèles (`src/models/`), avec un journal d'événements; le modèle chorégraphique commun reste hors de S0 (fiche S0 §9); (3) les seuils de la règle de classement (0,5) sont les propositions [I] de 06 §1.4, que H0.2 met à l'épreuve; leur valeur confirmatoire se fixe au préenregistrement (D-15); (4) la borne j < n des sagas est [à confirmer] dans la source (scan illisible, fiche S0 T0.33) : le moniteur l'applique telle qu'écrite; (5) emplacements `regimes/<id>.json` et `data/regimes/<id>.regime.json`.
