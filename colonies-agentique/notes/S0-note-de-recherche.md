# Note de recherche S0 : socle méthodologique (brouillon)

Livrable 1 de la [fiche S0](../projets/S0-socle.md) (§10). **Brouillon du 2026-10-01** : les méthodes et les vérifications sont rapportées; les hypothèses H0.1 à H0.5 sont confirmatoires et ne sont **pas exécutées** (préenregistrement OSF d'abord, [brouillon](../preregistrements/S0.md), décision D-15). Tout résultat ci-dessous est étiqueté *exploratoire* ou *vérification de code*. La relecture contre la liste de contrôle du document de science ouverte reste à faire.

## 1. Objet

Le socle fournit aux projets P1 à P9 : un noyau de simulation déterministe (PRNG à graine, intégrateurs, SSA, événements, grille, enregistreur, manifeste), un harnais de reproduction (cibles, verdicts, garde de puissance), une bibliothèque statistique, les métriques R et G, la typologie de coordination et le gabarit de page. Spécification du comportement : [specs/](../specs/README.md) (UC-001 à UC-008, UC-010 à UC-012 implantés; UC-009 en revue).

## 2. ADEMP

| | Vérifications de code (T0.n) | Dockings du socle | Hypothèses H0.1 à H0.5 |
|---|---|---|---|
| **A**ims | le noyau et les formules redonnent les valeurs de référence | deux implantations, ou EDO et SSA, s'accordent au niveau déclaré | voir le [préenregistrement](../preregistrements/S0.md) |
| **D**ata-generating mechanisms | cas exacts ou jouets (J1 à J6; M1c; OU) | M1c (EDO, SSA), M6 | idem |
| **E**stimands | valeurs publiées ou analytiques | probabilité de décision (T0.7), fraction vers X et durée (M6) | idem |
| **M**ethods | identité à tolérance; écart < 3 ES de Monte Carlo | niveaux `implementations` et `relational` de UC-005 | idem |
| **P**erformance measures | ES de Monte Carlo (T0.16) | écart et 3 ES combinées; IC à 95 % d'une différence | idem |

## 3. ODD résumé

ODD des trois familles : fiche S0 §4.4 (M1c, M6, cas d'école). Implantés à ce jour : M1c en EDO (RK4) et à N fini (SSA direct); OU (Euler–Maruyama); M6 (`s0-m6-quorum`, ordre synchrone ou séquentiel aléatoire, lecture de r déclarée et à confirmer); jouets J4 (`s0-j4-copie`) et J6 (`s0-j6-marcheurs`). Les cas d'école CE1 à CE6 et CE2p attendent UC-009.

## 4. Résultats

### 4.1 Vérifications de code (bloquantes)

T0.1, T0.3 à T0.16, T0.21, T0.22 et T0.26 à T0.32 passent (`npm run verify`). Recoupement Python indépendant de T0.4 à T0.7 (`x_methodes_checks.py`) et de T0.27 à T0.32 (`s0_socle_checks.py`). La valeur critique du U de Mann-Whitney (n = m = 10, bilatéral à 5 %), citée de table par la fiche (T0.14), est recalculée exactement : 23.

### 4.2 Dockings (exploratoires, consignés)

| Rapport | Niveau | Issue |
|---|---|---|
| `s0-m1c-edo-ssa` (T0.7) | relationnel : sous σ* = 1,6875, P(\|A − B\|/N > 0,3) décroît de N = 50 à N = 200; au-delà, elle croît vers 1 | aligned |
| `s0-m1c-ssa-python` (T0.7) | implantations : 4 cellules à moins de 3 ES combinées de l'oracle Python | aligned |
| `s0-m6-python-*` (4 rapports) | implantations : fraction vers X et durée, k ∈ {1 ; 9}, deux ordres | aligned |

### 4.3 Pilotes exploratoires

- **Ordre de mise à jour sur M6** (pilote de H0.1, *exploratoire*; 1 000 exécutions par cellule, graine maîtresse 20261001, lecture « r par option ») : k = 1 : fraction vers X 75,5 % (séquentiel aléatoire) contre 75,4 % (synchrone), écart de 0,10 point pour 3 ES = 1,82; durée 276,9 contre 276,5 pas, écart de 0,4 pour 3 ES = 9,2. k = 9 : 82,1 % contre 82,1 % (écart 0,06 point; 3 ES = 1,99); 323,0 contre 325,6 pas (écart −2,6; 3 ES = 10,1). Comme le pilote du dossier (X17), aucun écart n'atteint 3 ES. La durée reste plus longue que la valeur publiée (253,7 et 307,8 pas), comme dans le dossier (D-5-001 du protocole, lecture de r à confirmer).
- **Référence nulle de G** (T0.36, non bloquante) : sur un tore 32 × 32, S(N) = E[C₁]/E[C_N] vaut 2,0; 3,9; 7,9; 15,2; 27,1; 44,5; 64,1; 87,4 pour N = 2 à 256; la pente de S(N)/N contre log₂ N vaut −0,082 (IC à 95 % [−0,083 ; −0,079]). S(N)/N n'est pas strictement décroissant aux petits N (S(2)/2 = 1,012), ce que le critère de la fiche devra préciser.
- **Bifurcation de M1c** : balayage de σ de 0,25 à 10 (`sweeps/s0-m1c-bifurcation.json`) : Ψ_A ≈ Ψ_B jusqu'à σ = 1,625, séparation lente à 1,75 (ralentissement critique près de σ*), puis nette.
- **E0.3, sensibilité de M1c** (k = 4, D-0-003; `data/sensibilite/e03-m1c.json`) : les deux premiers rangs diffèrent selon la méthode (OFAT : α, γ; Morris, r = 10 : ρ, α; Sobol' total : σ, ρ). Au nominal proche de σ*, l'étendue OFAT est presque la même pour les quatre paramètres (0,59 à 0,64) : l'OFAT n'y hiérarchise rien. Les interactions sont fortes (somme des indices totaux 1,52, des indices de premier ordre 0,68). Coût : 40, 50 et 6 000 exécutions. Lecture : la règle « OFAT pour lire un mécanisme, méthode globale pour attribuer la variance » est confortée; Morris à r = 10 ne suffit pas à retrouver les deux premiers rangs de Sobol'.

### 4.4 Hypothèses confirmatoires

H0.1 à H0.5 : non exécutées (préenregistrement d'abord). H0.2 attend aussi les cas d'école (UC-009).

## 5. Écarts au registre

[Registre de S0](../registre/deviations-S0.md) : D-0-001 (exemple de Miller 2024), D-0-002 (Firefox), D-0-003 (E0.3 à k = 4), D-0-004 (cible B non mesurée), D-0-005 (liste manuelle d'accessibilité incomplète).

## 6. Limites

- Réplication de modèles, non validation empirique : aucun résultat de S0 ne porte sur des colonies réelles.
- Identité binaire garantie seulement à moteur, version et plateforme égaux (N1); entre moteurs, équivalence statistique (N2); les fonctions `exp`, `log`, `sin` et `cos` diffèrent entre Node et Chrome, et `pow` aussi sous WebKit (E0.5).
- Valeurs à confirmer reprises des dossiers : lecture de r et sens du « ± » (M6), borne j des sagas (T0.33), seuils des indicateurs de régime, P_max et ε (D-07).
- Firefox non testé (D-0-002); hébergement en artifact non mesuré (D-0-004).

## 7. Reproduire

`npm run verify` (vérifications); `npm run dock -- <id>` (rapports de `data/docking/`); `npm run sweep -- sweeps/<nom>.json` (balayages de `data/sweeps/`); `python recherche/verifications-numeriques/s0_socle_checks.py`, `s0_m6_oracle.py` et `s0_e03_sensibilite.py` (recoupements et E0.3).
