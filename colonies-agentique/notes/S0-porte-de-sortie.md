# Porte de sortie de la phase 0 (S0) : fiche de décision

Fiche prévue par la [fiche S0](../projets/S0-socle.md) (§3.1, « Fiche de décision »). **Brouillon préparé le 2026-10-01; l'issue est décidée par le chercheur** (règle de décision de la porte : go, go conditionnel ou no-go). Dépôt à la rédaction : commit `da21433` et suivants (main); `npm run verify` sort à 0 (165 tests).

## Statut de chaque critère

| CS | Classe | Statut | Preuve | Registre |
|---|---|---|---|---|
| CS0.1 Le noyau calcule correctement | Bloquante | satisfait | T0.1, T0.3 à T0.6 et T0.21 passent (`tests/core/`, `tests/conformance.test.ts`); `tsc --noEmit` et `node --test` sortent à 0 | — |
| CS0.2 Le PRNG est identique partout | Bloquante | satisfait sous clause | T0.1 et T0.3 identiques sous Node, Chromium et WebKit ([rapport du spike](../spikes/phase0/rapport.md)); Firefox absent | D-0-002 |
| CS0.3 Le rejeu est exact | Bloquante | satisfait | T0.26 (`tests/determinism.test.ts`), T0.22 (`tests/core/journal-llm.test.ts`), traces dorées (`tests/traces-dorees.test.ts`) | — |
| CS0.4 Deux implantations s'accordent | Bloquante | satisfait | T0.4 à T0.7 contre `x_methodes_checks.py`; rapports de docking `s0-m1c-ssa-python` et `s0-m6-python-*` : `aligned` | — |
| CS0.5 Intégrateurs stochastiques et ordre maîtrisés | Bloquante | satisfait | T0.27 (`euler-maruyama.test.ts`), T0.28 (`ordre.test.ts`); docking T0.7 consigné (`data/docking/s0-m1c-edo-ssa.report.json`) | — |
| CS0.6 Bibliothèque statistique et plans sous-puissants | Bloquante | satisfait | T0.12 à T0.14 et T0.16 (`statistiques.test.ts`, `equivalence.test.ts`); refus d'un plan sous-puissant (UC-003 A3, UC-005 A2) | — |
| CS0.7 R et G justes sur cas jouets | Bloquante | satisfait | T0.29 à T0.32 (`metriques.test.ts`, `tests/cli/metrics.test.ts`); R jamais agrégé (UC-007 BR-037) | — |
| CS0.8 Formules d'évaluation pour P7 | Bloquante | satisfait | T0.8 à T0.11, T0.15 (`statistiques.test.ts`) | D-0-001 |
| CS0.9 Indicateurs de régime | Différée | différé | UC-009 rédigé, en revue; cas d'école et indicateurs non implantés; H0.2 attend le préenregistrement | — |
| CS0.10 Jeu de la typologie | Différée | satisfait (jeu de données) | `data/typologie.csv`, 21 entrées, au moins 3 par régime principal, validé à chaque `verify`; Y14 a pour source le cadre (source primaire à identifier) | — |
| CS0.11 Chaîne navigateur faisable | Bloquante | satisfait sur la cible A | contrôles (i) à (iv) et (vi) réussis sur A; cible B non mesurée | D-0-004 |
| CS0.12 Gabarit de page livré | Bloquante | partiellement satisfait | page-pilote par une commande, deux builds au même hachage, 0 violation axe-core; liste manuelle : 13 critères sur 16 ([liste](../evaluation/accessibilite-p1-v1-pont.md)) | D-0-005 |
| CS0.13 Matrice figée et amorcée | Bloquante | satisfait | `data/matrice.csv` (P1, P5, P8 pour les deux taxons ou asymétrie justifiée), validé à chaque `verify` | — |
| CS0.14 Préenregistrement et registre | Bloquante | partiellement satisfait | gabarits (`gabarits/`), registre avec D-0-001; [brouillon de préenregistrement](../preregistrements/S0.md); dépôt OSF non fait (D-15); aucune exécution confirmatoire à ce jour | — |
| CS0.15 Dépôt prêt pour une release | Différée | différé | attend D-02 (dépôt dédié) et D-08 (licences); E0.6 non fait | — |
| CS0.16 R_eff voit le bruit; leviers découplés | Différée | différé | E0.7 et E0.8 confirmatoires, après le dépôt OSF; estimateur de R_eff vérifié sur cas jouet (T0.29) | — |

## Issue proposée

**Go conditionnel**, sous réserve de l'acceptation par le chercheur des entrées de type « plan » du registre :

1. CS0.2 : clause limitée à Node, Chromium et WebKit (D-0-002); rattrapage de Firefox selon D-12.
2. CS0.11 : mesurer la cible B avant la première page publiée en artifact (D-0-004).
3. CS0.12 : écoute au lecteur d'écran, revue des flashs et orientation sur appareil avant la publication de la page-pilote (D-0-005).
4. CS0.14 : dépôt OSF du préenregistrement de S0 avant toute exécution confirmatoire de H0.1 à H0.5 (D-15). La fiche n'admet pas d'exécution confirmatoire antérieure : aucune n'a eu lieu.

Aucun échec de type « résultat » n'est inscrit. Les critères différés gardent leur échéance : CS0.9 et CS0.10 (page de typologie) avant la publication de cette page et avant la phase 3; CS0.15 avant la première release; CS0.16 avant P4 et P7.

## Décision du chercheur

Date : — · Issue : — · Conditions retenues : —
