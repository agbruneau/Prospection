# Suivi de la feuille de route

Tableau de suivi prévu par la [feuille de route](../docs/09-feuille-de-route.md) (jalons et portes). Tenu à la main : on le met à jour dans le commit qui change l'état d'une tâche. L'avancement des cas d'utilisation n'est pas recopié ici; il est généré dans le [tableau de bord de la spécification](../specs/tableau-de-bord.md).

**États :** *Fait* (preuve citée) · *En cours* · *À faire* · *Bloqué* (cause citée) · *Décision* (le chercheur tranche).
**Dernière mise à jour :** 2026-10-01. Le décompte de l'effort commence le lundi 2026-10-05 (conventions de 09); le travail fait avant cette date n'entre pas dans le cumul.

## 1. Décisions du chercheur, par échéance

| ID | Décision | Échéance | Porte | État |
|---|---|---|---|---|
| D-01 | Collecte anticipée de Haiku 4.5 pour P7, ou perte déclarée du point historique | avant 2026-10-15 | GF1 | Décision |
| D-02 | Dépôt dédié et identité des auteurs (DC1, DC3 : nom, ORCID, affiliation), `CITATION.cff` | semaine 1 | GF2 | Décision |
| D-03 | Comité d'éthique : instance et contact (DC6) | semaine 1 | GF3 | Décision |
| D-04 | Revue des tests de UC-001, UC-002, UC-003 et UC-008, puis passage à `Verified` | avant la porte de sortie | GF4 | Décision |
| D-05 | Gel de la fiche T1.1 : statut de k, choix de protocole [I], tolérance ou TOST, graine confirmatoire ([fiche](../projets/reproduction/T1.1.md), section « Points à trancher ») | avant l'exécution confirmatoire de T1.1 | porte A de P1 | Décision |
| D-06 | Points de revue du code de la phase 0 : unité de temps sans dimension (M1c utilise `cycle`), format exécutable des cibles, variante `-<variante>` des identifiants de modèle, échelle `points` | prochain incrément | GF4 | Décision |
| D-07 | P_max et ε des métriques ([03](../docs/03-plan-de-recherche.md)) | avant le lot B | GF4 | Décision |
| D-08 | Licences (DC2; défaut : code MIT, textes et données CC BY 4.0) | première release | GF2 | Décision |
| D-09 | Soumission ou non de la typologie à Blue Sky Ideas (DC9) | avant 2026-11-12 | GF15 | Décision |
| D-10 | Enveloppe d'API de P7; budget égal K = 4 ou 7,45; disponibilité de R (modèles mixtes) | avant le harnais de P7 | GF11, GF12 | Décision |
| D-12 | Décisions D1 à D5 du spike : **rendues le 2026-10-01** (approuvées telles que proposées). Reste : voie de rattrapage pour Firefox ([rapport](../spikes/phase0/rapport.md), section 5) | avant la clause de CS0.2 | GF4 | Décision |
| D-13 | UC-006 (résumés de page) : **approuvé le 2026-10-01**, puis implanté; page-pilote construite | — | GF4 | Fait |
| D-14 | Points de revue de la page-pilote ([définition](../pages/p1-v1-pont.json)) : (1) titre « Le pont à mémoire » (« Le pont qui se souvient » de la fiche P1 dépasse 4 mots); (2) encart « Ce que fait vraiment la reine » omis : à faire valider (fiche P1, Explorer); (3) étapes 4 et 5 du parcours Voir absentes (T1.2 et V4 non faites). Tranché le 2026-10-01 : répétition typique sur la part majoritaire max(s, 1 − s) (UC-006, BR-027 modifiée) | avant publication | GF4 | Décision |
| D-15 | Déposer sur OSF le [préenregistrement de S0](../preregistrements/S0.md) (H0.1 à H0.5) après avoir tranché sa section 12 (graines, seuils, niveaux) : condition de CS0.14 | avant toute exécution confirmatoire de S0 | GF4 | Décision |
| D-11 | Supprimer les fichiers parasites non suivis : `projets/zz-test-temp.md`, `recherche/verifications/*.v1-precedent.md` | dès que possible | — | Décision |

## 2. Phase 0 : tâches du socle S0 (lots de la [fiche S0](../projets/S0-socle.md))

| ID | Lot | Tâche | Cibles ou critères | État | Preuve ou cause |
|---|---|---|---|---|---|
| C-01 | C | Générateur, flux nommés, empreinte d'état | T0.1, T0.3 | Fait | `tests/core/random.test.ts` |
| C-02 | C | Scénario, manifeste, exécution et rejeu | UC-001, UC-002, T0.26 | Fait | `src/cli/run.ts`, `replay.ts`; `tests/cli/`, `tests/determinism.test.ts` |
| C-03 | C | RK4 et M1c en EDO | T0.4, T0.5 | Fait | `tests/core/rk4.test.ts` |
| C-04 | C | SSA direct et M1c à N fini | T0.6, T0.7 | Fait | `tests/core/ssa.test.ts`; cellule σ = 1, N = 50 à 2,0 ES de l'oracle |
| C-05 | C | Conformité (motifs interdits, imports) | T0.21 | Fait | `tests/conformance.test.ts` |
| C-06 | C | Harnais de cibles, garde de puissance | UC-003, T0.13 (n requis) | Fait | `src/cli/reproduce.ts`, `tests/cli/reproduce.test.ts` |
| C-07 | C | Chaîne de vérification | UC-008 | Fait | `npm run verify` sort à 0 |
| C-08 | C | Euler–Maruyama et modèle d’Ornstein–Uhlenbeck (p5-pais-2013-ou) | T0.27 | Fait | `tests/core/euler-maruyama.test.ts` (dt et dt/2) |
| C-09 | C | Commutateur d'ordre, contrôle positif | T0.28 | Fait | `src/core/ordre.ts`, jouet J4 `s0-j4-copie`; `tests/core/ordre.test.ts` : consensus 0 sur 1 000 en synchrone, 1 sur 1 000 en séquentiel aléatoire |
| C-10 | C | Bibliothèque statistique : n_sim, K-S, ES de Monte Carlo | T0.12 à T0.14, T0.16 | Fait | `src/analysis/mc-error.ts`, `power.ts`; `tests/core/statistiques.test.ts`; U critique de Mann-Whitney (23) recalculé exactement, non plus repris d'une table |
| C-11 | C | Formules d'évaluation pour P7 | T0.8 à T0.11, T0.15 | Fait | `src/analysis/power.ts`; `tests/core/statistiques.test.ts`; T0.11 épingle 1/12 (D-0-001 à inscrire au registre, G-01) |
| C-12 | C | Schéma du journal LLM | T0.22 | Fait | `src/policies/llm-log.ts`; `tests/core/journal-llm.test.ts` |
| C-13 | C | Grille et événements discrets (tests propres au moteur, 05 §9.6) | — | Fait | `src/core/events.ts`, `grid.ts`; `tests/core/events.test.ts`, `grid.test.ts` (Poisson : déjà dans `random.test.ts`) |
| C-14 | C | Traces dorées (05 §9.4) | — | Fait | `tests/traces-dorees.test.ts`, `tests/__snapshots__/traces-dorees.json` (Node v24.19.0, win32, x64) |
| C-15 | C | Balayages, agrégation indépendante du nombre de travailleurs | UC-004 (Implemented), SPK11 | Fait | `npm run sweep`, `src/sweep/`; `tests/cli/sweep.test.ts` (1, 2 et 4 travailleurs : mêmes SHA-256); balayage de bifurcation de M1c `sweeps/s0-m1c-bifurcation.json` |
| C-17 | C | Docking du socle | UC-005 (Implemented); T0.7; CS0.4, CS0.5 | Fait | `npm run dock`; rapports `data/docking/s0-m1c-edo-ssa.report.json` (relationnel) et `s0-m1c-ssa-python.report.json` (TypeScript contre Python) : `aligned` |
| C-16 | C | Deux implémentations des modèles du socle | CS0.4 (T0.4 à T0.7) | Fait | TypeScript et `x_methodes_checks.py` concordent |
| D-SP | D | Spike navigateur | SPK1 à SPK12; décisions D1 à D5 | En cours | [rapport](../spikes/phase0/rapport.md) : porte 0 réussie sur Node, Chromium et WebKit; D1 à D5 rendues; restent Firefox (ne démarre pas sur le poste) et la cible B |
| H-01 | H | Dépôt jetable, webhook Zenodo, DOI de version et de concept | E0.6, CS0.15 | Bloqué | attend D-02 |
| B-01 | B | Métriques R et G | T0.29 à T0.32, T0.36; E0.2, E0.7, E0.8; UC-007 (Implemented) | En cours | `npm run metrics`, `src/analysis/metrics.ts`; T0.29 à T0.32 passent (`tests/core/metriques.test.ts`, `tests/cli/metrics.test.ts`); restent T0.36 (non bloquante) et E0.2, E0.7, E0.8 (confirmatoires : préenregistrement OSF d'abord, CS0.14) |
| A-01 | A | Typologie : cas d'école, indicateurs, jeu de données, page | T0.33, T0.34; E0.1; CS0.9, CS0.10 | En cours | jeu de données `data/typologie.csv` (21 entrées, validé à l'étape 4 de `verify` : CS0.10); restent les cas d'école CE1 à CE6 et CE2p, les indicateurs C_* (cas d'utilisation à rédiger), E0.1 (confirmatoire) et la page de typologie |
| E-01 | E | Gabarit de page et page-pilote | UC-006, UC-010 à UC-012 (Implemented); CS0.12 | En cours | `src/browser/`, `src/cli/summarize.ts`, `tests/pages/` (axe-core : 0 violation); page-pilote `pages/p1-v1-pont.json` sur le résumé de T1.1 (`tests/pages/pilote.test.ts`); restent la liste manuelle d'accessibilité de 07 §8 et D-14 |
| F-01 | F | Matrice concept × espèce × modèle | CS0.13 | Fait | `data/matrice.csv` (17 lignes : P1, P5, P8 pour les deux taxons ou asymétrie justifiée), `outils/verifier-matrice.ts` à l'étape 4 de `verify` |
| G-01 | G | Gabarits, registre des déviations, préenregistrement | CS0.14 | En cours | `gabarits/` (extraits de 04, test de synchronisation), `registre/deviations-S0.md` (D-0-001, D-0-002), brouillon `preregistrements/S0.md` (H0.1 à H0.5); reste le dépôt OSF horodaté (D-15) |
| I-01 | I | Porte de sortie de la phase 0 | `notes/S0-porte-de-sortie.md`; CS0.1 à CS0.16 | À faire | dernière tâche du lot |

## 3. Phase 1 : travaux commencés

| ID | Projet | Tâche | État | Preuve ou cause |
|---|---|---|---|---|
| P1-01 | P1 | Fiche de reproduction T1.1 | En cours | [brouillon](../projets/reproduction/T1.1.md); gel : D-05 |
| P1-02 | P1 | Modèle p1-goss-1989 et scénarios de la fig. 2a-c | Fait | accord avec l'oracle Python à moins de 3 ES (`tests/models/goss.test.ts`) |
| P1-03 | P1 | Pilote exploratoire de T1.1 | Fait | satisfaite sous réserve, 15 cellules sur 15, commit 7c70759 (modèle version 2) ([verdict](../data/results/P1/T1.1.verdict.json)) |
| P1-04 | P1 | Fiche de reproduction T1.2 (courte tardive, même modèle) | À faire | — |
| P1-05 | P1 | Modèle à sept compartiments de Seeley et al. 1991 et fiche T1.4 | À faire | oracle présent dans `p1_verif_recrutement.py` |
| P1-06 | P1 | Cibles T1.3, T1.5 à T1.9 | Bloqué | causes dans `targets/P1/` (`npm run reproduce -- P1`) |

## 4. Jalons (09, section 4.1)

Un jalon est atteint quand son critère est vrai; un écart de plus de 15 % sur le cumul déclenche la revue de l'ordre de coupe (R204).

| Jalon | Cumul prévu (sem.-pers.) | Date indicative | Cumul réel | Écart | Décision |
|---|---|---|---|---|---|
| JF1 | 1,0 | 2026-10-09 | — | — | à risque : rapport du spike remis et D1 à D5 rendues; E0.6 attend D-02 |
| JF2 | 12,0 | 2026-12-25 | — | — | — |
| JF3 | 40,5 | 2027-07-16 | — | — | — |
| JF4 | 47,5 | 2027-09-03 | — | — | — |
| JF5 | 67,5 | 2028-01-21 | — | — | — |
| JF6 | 87,5 | 2028-06-09 | — | — | — |
| JF7 | 108,5 | 2028-11-03 | — | — | — |
| JF8 | 137,5 | 2029-05-25 | — | — | — |
| JF9 | 158,5 à 166,0 | 2029-10-19 à 2029-12-07 | — | — | — |
| JF10 | 181,5 à 189,0 | 2030-03-29 à 2030-05-17 | — | — | — |
| JF11 | 200,5 à 208,0 | 2030-08-09 à 2030-09-27 | — | — | — |
| JF12 | 215,5 à 223,0 | 2030-11-22 à 2031-01-10 | — | — | — |
| JF13 | 229,5 à 239,0 | 2031-02-28 à 2031-05-02 | — | — | — |
| JF14 | 252,5 à 262,0 | 2031-08-08 à 2031-10-10 | — | — | — |

## 5. Prochaines tâches recommandées

1. D-01 (GF1), puis D-02 et D-03 : elles conditionnent JF1 et la semaine 1.
2. D-14 (points de revue de la page-pilote), puis la liste manuelle d'accessibilité de 07 §8 (E-01).
3. C-08 et C-09 (Euler–Maruyama, ordre), puis C-10 : fin du lot C bloquant.
4. P1-04 dès que D-05 est tranchée : T1.2 n'exige que sa fiche.
