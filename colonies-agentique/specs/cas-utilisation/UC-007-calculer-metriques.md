---
id: UC-007
name: Calculer les métriques R et G
status: Review
context: SIM
actors: [Chercheur]
linkedRequirements: [FR-007, NFR-001, C-007]
entities: [R, G, RunManifest]
---

# UC-007 Calculer les métriques R et G

## Vue d'ensemble

- **Acteur principal :** Chercheur
- **But :** obtenir, sur des exécutions appariées, le gain collectif G avec sa différence appariée Δ et leurs intervalles, et le vecteur R du canal, sans jamais réduire R à un nombre ni chiffrer un G non défini.
- **Statut :** Review

## Préconditions

- Les scores par exécution existent, au format long (`rep`, `seed`, `arm`, `score`), pour le bras évalué et chaque référence déclarée (06 §4.2).
- Pour R, le journal d'événements du canal existe (06 §2.1).
- Le plan de métriques `metrics/<id>.json` déclare, avant le calcul : le bras évalué, les références (`ind`, et selon le cas `vote`, `fort`, `regles`), P_max, le seuil ε d'affichage de G, le nombre de rééchantillonnages et la graine du bootstrap.

## Déclencheur

- Le chercheur compare une architecture de coordination à ses références.

## Scénario nominal

1. Le chercheur lance `npm run metrics -- <id>`.
2. Le système valide le plan et vérifie que les exécutions de chaque bras sont appariées (mêmes graines, une exécution par graine et par bras).
3. Le système calcule, pour chaque référence k, P_k, la différence appariée Δ_k = P_a − P_k et son IC à 95 % par bootstrap apparié sur les exécutions.
4. Le système calcule G_k = Δ_k / (P_max − P_k) et son IC, si G_k est défini (BR-038).
5. Si la référence `vote` est déclarée, le système calcule Δ_agg, Δ_com, G_agg et G_com (06 §4.3).
6. Si le journal est fourni, le système calcule les cinq composantes de R : R_nom, R_eff (plug-in corrigé par permutation, IC par bootstrap sur les exécutions), R_pers, R_port et R_adr.
7. Le système écrit le rapport `data/metrics/<id>.metrics.json`.
8. Le système affiche Δ_k avec son IC pour chaque référence, puis G_k ou « non défini », puis les composantes de R.
9. Le système termine avec le code de sortie 0.

## Flots alternatifs

### A1. G non défini
**Déclencheur :** à l'étape 4, l'IC à 95 % de P_max − P_k contient 0, ou P_max − P_k est inférieur à ε.
1. Le système consigne G_k « non défini » avec sa raison, sans valeur numérique.
2. Le système rapporte Δ_k et son IC.
3. Le système reprend à l'étape 5.

### A2. Borne invalide
**Déclencheur :** à l'étape 4, P_k dépasse P_max.
1. Le système consigne G_k « borne invalide » et rapporte Δ_k et son IC.
2. Le système reprend à l'étape 5.

### A3. Sans référence de vote
**Déclencheur :** à l'étape 5, aucune référence `vote` n'est déclarée.
1. Le système consigne G_agg « non défini » et Δ_com = Δ_ind (06 §4.3).

### A4. Sans journal
**Déclencheur :** à l'étape 6, aucun journal n'est fourni.
1. Le système consigne R « non calculé : journal absent » et reprend à l'étape 7.

### E1. Exécutions non appariées
**Déclencheur :** à l'étape 2, une graine manque dans un bras ou y figure deux fois.
1. Le système affiche « Métriques impossibles : bras <bras>, graine <graine> <absente ou en double> ».
2. Le système n'écrit aucun fichier.
3. Le système termine avec un code de sortie non nul.

## Postconditions

**Succès :**
- Le rapport contient, pour chaque référence : P_k, Δ_k et son IC, G_k et son IC ou son motif d'absence; G_agg et G_com s'ils sont définis; les cinq composantes de R avec leurs IC quand elles s'estiment; le nombre d'exécutions, les graines, le nombre de rééchantillonnages et le plan.

**Échec :**
- Des exécutions non appariées n'écrivent aucun fichier.

## Règles d'affaires

- **BR-037** : R est rapporté comme un vecteur de cinq composantes; aucune fonction ne l'agrège en un scalaire.
- **BR-038** : G_k n'est chiffré que si l'IC à 95 % de P_max − P_k exclut 0 et que P_max − P_k ≥ ε; sinon il vaut « non défini » (ou « borne invalide » si P_k > P_max), jamais NaN ni infini. Δ_k et son IC sont toujours rapportés.
- **BR-039** : La décomposition partage le dénominateur P_max − P_ind : G_ind = G_agg + G_com exactement.
- **BR-040** : L'unité statistique est l'exécution; les IC viennent d'un bootstrap apparié sur les graines, dont les rééchantillonnages sont tirés d'un flux à graine : deux calculs identiques donnent le même rapport.

## Exigences liées

FR-007 Calculer les métriques R et G · NFR-001 Déterminisme · C-007 Lieu du calcul

## Points soumis à la revue

Décisions de rédaction : (1) P_max et ε sont déclarés par le plan de chaque comparaison (06 §4.1 : « déclarée par scénario »), sans valeur par défaut; la décision D-07 fixera ceux du plan de recherche; (2) les indicateurs de régime C_* (06 §2) ne sont pas dans ce cas : ils lisent le journal des cas d'école et viendront avec eux (lot A, CS0.9, différé); (3) R_nom est déclaré par le plan (alphabet ou plafond), non estimé; R_pers s'estime par la demi-vie déclarée ou ajustée; (4) le contrôle d'implantation « précision du vote ≤ 1 − β » (06 §4.5, T0.31) est vérifié quand la référence `vote` et les issues individuelles sont fournies; (5) emplacements `metrics/<id>.json` et `data/metrics/<id>.metrics.json`.
