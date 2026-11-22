# Arbitrage quantitatif final et analyse de robustesse (Phase 3)

- **Cibles agrégées :** [`notation-jury-1.md`](notation-jury-1.md) (`J1` — `jury-ingenierie`) et [`notation-jury-2.md`](notation-jury-2.md) (`J2` — `jury-strategie`), évaluant les `8` options révisées (`A'`, `A'+`, `B'`, `C'`, `D'`, `E'`, `F'`, `G'`) issues de [`propositions-A-B-revisees.md`](propositions-A-B-revisees.md), [`propositions-C-D-revisees.md`](propositions-C-D-revisees.md) et [`propositions-E-F-G-revisees.md`](propositions-E-F-G-revisees.md).
- **Script reproductible associé :** [`arbitrage_final.py`](arbitrage_final.py) (`Python 3.14.10`, bibliothèque standard uniquement, arithmétique décimale `Decimal` `ROUND_HALF_UP` et rationnelle `Fraction`, `exit code 0`).
- **Régime et discipline épistémique :** **Production**. Distinction stricte entre **`[Vérifié dans le corpus : fichier + Lxxx]`** (données Phase 1–2 de référence), **`[Vérifié par exécution]`** (tous les calculs et sorties d'`arbitrage_final.py`) et **`[Supposé]`** (les `80` cotes demi-points d'entrée attribuées par `J1` et `J2`, ainsi que les arbitrages éditoriaux qualitatifs). *(Aucune requête web effectuée.)*
- **Verdict global de robustesse :** **`robuste`** au niveau des **propositions distinctes** (`A > B' > C' > D'/G' > E' > F'`, avec correction définitive de l'inversion Phase 1 `C > B` vers `B' > C'` dans `8/8` lectures) ; **`fragile`** *(serré à `+0,0625` pt)* uniquement sur le **duel interne `A'` strict vs `A'+` intégré**, qui relève dès lors d'un arbitrage qualitatif d'architecture et de portefeuille plutôt que d'une séparation numérique nette.

---

## 1. Synthèse des résultats quantitatifs et comparaison avec la Phase 1

### 1.1 Accord inter-juges (`J1` vs `J2` sur `40` cellules et `8` scores `P1`) `[Vérifié par exécution]`

1. **Convergence très élevée malgré deux angles indépendants :** sur les `40` cellules (`8` options × `5` critères `M1–M5`), l'écart absolu moyen global est **`MAE = 0,2500` pt** (`RMSE = 0,4743` pt) avec un biais signé quasi nul (**`+0,0250` pt**). Exactement `25/40` cellules (`62,5 %`) sont identiques (`0,0`), `37/40` (`92,5 %`) diffèrent d'au plus `0,5` pt et `39/40` (`97,5 %`) d'au plus `1,0` pt.
2. **MAE par critère et par candidat :**
   - Par critère (`n = 8`) : `M2` (`0,1250`, `rho = +0,9940`), `M4` (`0,1250`, `rho = +0,9697`), `M1` (`0,3125`, `rho = +0,9756`), `M3` (`0,3125`, `rho = +0,9695`) et `M5` (`0,3750`, `rho = +0,9630`).
   - Par candidat (`n = 5`) : `A'+` (`0,1000`), `F'` (`0,1000`), `B'` (`0,2000`), `D'` (`0,2000`), `G'` (`0,2000`), `A'` (`0,3000`), `C'` (`0,3000`) et `E'` (`0,6000`).
3. **Unique cellule divergente (`|J1 - J2| ≥ 2,0`) :** **`(E', M1)`** (`J1 = 7,5`, `J2 = 5,5`, écart `J1 - J2 = +2,0` pts). Cette divergence reflète précisément la séparation des mandats aveugles : `J1` (ingénierie) valorise l'actualisation concrète de `5` registres techniques du corpus (`27 SIG-*`, `§ 49.8`, `10 QO`, `H1–H6`, `§ 17.5`), alors que `J2` (stratégie éditoriale) sanctionne l'absence de besoin d'un livre autonome face à un flux opérationnel continu.
4. **Corrélation et accord quadratique pondéré :**
   - Sur les `40` notes cellulaires : **Kappa pondéré quadratique `Kappa_w = +0,9201`** (algébriquement identique au coefficient de concordance de Lin `CCC = +0,9201`), `Pearson r = +0,9267` ($p < 10^{-6}$) et `Spearman rho = +0,9312`.
   - Sur les `8` scores pondérés `P1` : **`Spearman rho = +0,9701`** et `Pearson r = +0,9646` ($p = 0,000108$). Les deux divergences d'ordre entre `J1` et `J2` sont mineures : permutation `A'+` / `A'` en tête (`J1` préfère `A'+` `8,975 > 8,825`, `J2` préfère `A'` `9,125 > 8,850`) et ex æquo exact `C' = D'` (`7,875`) chez `J1` alors que `J2` place `C'` (`8,200`) devant `D'` (`7,700`).

### 1.2 Matrice consensus et stabilité du classement sous `P1–P7` `[Vérifié par exécution]`

| Rang `P1` | Option | Consensus `M1 / M2 / M3 / M4 / M5` | `P1` Équilibré (`25/25/25/15/10`) | `P2` Phase 1 (`25/30/20/15/10`) | `P3` Égaux (`20/20/20/20/20`) | `P4` Urgence (`20/20/35/15/10`) | `P5` Non-red. (`40/20/20/10/10`) | `P6` Sans `M4` (`M4=0%`) | `P7-J1` (`J1` seul) | `P7-J2` (`J2` seul) |
| :---: | --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | **`A'` (MVP strict)** | `9,00 / 9,00 / 8,50 / 9,50 / 9,25` | **8,98** (`1`) | **9,00** (`1`) | **9,05** (`1=`) | 8,93 (`2`) | 8,98 (`2`) | 8,88 (`2`) | 8,83 (`2`) | **9,13** (`1`) |
| **2** | **`A'+` (MVP enrichi)** | `9,50 / 7,50 / 9,25 / 9,00 / 10,00` | 8,91 (`2`) | 8,83 (`2`) | **9,05** (`1=`) | **8,99** (`1`) | **9,05** (`1`) | **8,90** (`1`) | **8,98** (`1`) | 8,85 (`2`) |
| **3** | **`B'` (`non-avis`)** | `8,00 / 7,00 / 9,50 / 8,25 / 8,75` | 8,24 (`3`) | 8,11 (`3`) | 8,30 (`3`) | 8,44 (`3`) | 8,20 (`3`) | 8,24 (`3`) | 8,18 (`3`) | 8,30 (`3`) |
| **4** | **`C'` (Public)** | `8,50 / 8,50 / 7,50 / 7,75 / 7,50` | 8,04 (`4`) | 8,09 (`4`) | 7,95 (`4`) | 7,94 (`4`) | 8,13 (`4`) | 8,09 (`4`) | 7,88 (`4=`) | 8,20 (`4`) |
| **5** | **`D'` (`TPRM/SaaS`)** | `7,25 / 8,00 / 8,00 / 8,00 / 7,75` | 7,79 (`5`) | 7,79 (`5`) | 7,80 (`5`) | 7,83 (`5`) | 7,68 (`6`) | 7,75 (`5`) | 7,88 (`4=`) | 7,70 (`5`) |
| **6** | **`G'` (`HOTL/relève`)** | `8,50 / 6,50 / 7,75 / 7,50 / 7,25` | 7,54 (`6`) | 7,48 (`6`) | 7,50 (`6`) | 7,56 (`6`) | 7,73 (`5`) | 7,54 (`6`) | 7,50 (`6`) | 7,58 (`6`) |
| **7** | **`E'` (Observatoire)** | `6,50 / 6,50 / 6,25 / 7,00 / 7,75` | 6,64 (`7`) | 6,65 (`7`) | 6,80 (`7`) | 6,61 (`7`) | 6,63 (`7`) | 6,57 (`7`) | 6,98 (`7`) | 6,30 (`7`) |
| **8** | **`F'` (Santé)** | `7,50 / 5,50 / 5,00 / 6,50 / 5,75` | 6,05 (`8`) | 6,08 (`8`) | 6,05 (`8`) | 5,90 (`8`) | 6,33 (`8`) | 5,97 (`8`) | 6,08 (`8`) | 6,03 (`8`) |

- **Invariance complète du podium inter-propositions (`8/8` lectures) :** La famille **`A`** (`A'` et `A'+`) occupe les `2` premières places dans **`8/8` scénarios** (y compris `P7-J1` et `P7-J2`), avec une avance minimale sur `B'` comprise entre **`+0,4875` pt** (`P4`) et **`+0,7750` pt** (`P5`). **`B'`** reste **3e dans `8/8` scénarios**, **`C'`** 4e (`4` ou `4=`) dans `8/8`, **`E'`** 7e dans `8/8` et **`F'`** 8e dans `8/8`. Seul le duo `D'`/`G'` permute une fois sous `P5` (`M1 = 40 %`, où `G'` `7,73` passe devant `D'` `7,68`).
- **Correction définitive du défaut `B` vs `C` de Phase 1 :** En Phase 1 (`sensibilite-matrice.md L27, L53` `[Vérifié dans le corpus]`), `C` (`8,28`) ne devançait `B` (`8,23`) que de `0,050` pt et cédait le 2e rang à `B` dans `3/6` scénarios de référence. Après suppression de la double pénalisation de `B'` (`A-B1`/`A-B2`) et recentrage de `C'` (`A-C1`), **`B'` devance `C'` dans `8/8` lectures (`+0,2000` pt sous `P1`)**, y compris sous les anciens poids `P2` (`8,11 > 8,09`, `+0,0250` pt).

### 1.3 Dé-corrélation `M2`/`M4` et rééquilibrage de la variance `[Vérifié par exécution]`

1. **Réduction de la colinéarité `M2–M4` :** Dans la Phase 1 (`sensibilite-matrice.md L139, L173` `[Vérifié dans le corpus]`), `C2` et `C4` affichaient la plus forte corrélation de la matrice avec **`r(C2, C4) = +0,8774`** ($R^2 = 76{,}99\,\%$, $p = 0{,}0216$, $\rho = +0{,}7143$). Sous la grille révisée `M1–M5` (`n = 8`, `df = 6`), **`r(M2, M4)` recule à `+0,7803`** ($R^2 = 60{,}88\,\%$, $t = +3{,}056$, $p = 0{,}0223$, $\rho = +0{,}7785$), soit `-0,0971` sur `r` et `-16,11` pp sur $R^2$ (`r = +0,8366` sur les `7` propositions distinctes hors `A'+`). En particulier, `B'` (`M2 = 7,00`, `M4 = 8,25`) et `C'` (`M2 = 8,50`, `M4 = 7,75`) démontrent une dissociation réelle entre hygiène `L+` et testabilité déterministe `G0`. Les corrélations les plus élevées de la matrice révisée se déplacent vers **`M4–M5`** (`r = +0,8988`), **`M3–M5`** (`+0,8578`) et **`M3–M4`** (`+0,8398`), traduisant le fait que les projets complets à fort effet de levier (`A'`, `A'+`, `B'`) sont aussi les mieux outillés sur 2027 et en `G0`, face à `E'` et `F'`.
2. **Disparition de la domination pro-code dans la variance :** En Phase 1 (`sensibilite-matrice.md L133-L135, L167` `[Vérifié dans le corpus]`), le bloc **`C2 + C4`** (`45 %` du poids nominal) déterminait **`55,3 %` de la variance** des scores (`C2 = 38,3 %` + `C4 = 17,0 %`), reléguant `C3` à `14,9 %`. Sous **`P1` (`25/25/25/15/10`)**, **`M2 + M4` tombent à `36,6 %`** de la variance (`M2 = 22,7 %` + `M4 = 14,0 %`, soit **`-18,7` pp**), tandis que **`M3` (Urgence 2027 & lectorat) devient le 1er déterminant de variance à `33,4 %`** (`+18,5` pp vs Phase 1), devant `M2` (`22,7 %`), `M1` (`18,7 %`), `M4` (`14,0 %`) et `M5` (`11,3 %`). Même sous les poids historiques `P2` (`25/30/20/15/10`), `M2 + M4` recule de `55,3 %` à **`43,1 %`**.

### 1.4 Seuils de bascule et comparaison directe `A'` strict vs `A'+` intégré `[Vérifié par exécution]`

- **Inviolabilité du lauréat face aux challengers externes (`A'`/`A'+` vs `B'`) :**
  - Pour que `B'` dépasse `A'` (`+0,7375` pt sous `P1`), aucune pondération de `M1`, `M2`, `M4` ou `M5` dans `[0 %, 100 %]` ne suffit : il faudrait porter **`w_M3 > 56,83 %`** (`79/139`, soit `+31,83` pp au-dessus de `25 %`), ou abaisser une des notes `M1/M2/M3(A')` de **`-2,950` pts** (ou `M2+M4` conjointement de `-1,844` pt chacun).
  - Pour que `B'` dépasse `A'+` (`+0,6750` pt), il faudrait **`w_M3 > 79,73 %`** (`59/74`, `+54,73` pp).
- **Stabilité accrue du duel `B'` vs `C'` (`+0,2000` pt) :** Contrairement aux `+1,86` pp de Phase 1, il faudrait désormais `w_M2 > 33,82 %` (`+8,82` pp), `w_M3 < 16,67 %` (`-8,33` pp) ou `w_M1 > 46,43 %` (`+21,43` pp) — ou `0,800` pt d'écart consensus sur `M1/M2/M3` — pour que `C'` repasse devant `B'`.
- **Quasi-égalité quantitative `A'` vs `A'+` (`+0,0625` pt sous `P1`) :**
  - `A'` domine sur **`M2`** (`9,00 vs 7,50`, `+0,3750` pt pondéré) et **`M4`** (`9,50 vs 9,00`, `+0,0750` pt), soit **`+0,4500` pt** pour la pureté `L+`, le bornage MVP et les vecteurs tiers.
  - `A'+` domine sur **`M1`** (`9,50 vs 9,00`, `-0,1250`), **`M3`** (`9,25 vs 8,50`, `-0,1875`) et **`M5`** (`10,00 vs 9,25`, `-0,0750`), soit **`+0,3875` pt** pour l'absorption des `24 PEX-*`, `B-10`, `Data Act` et `AMF` (`1er mai`).
  - **Seuils de renversement minimaux :** Un basculement `A'+ > A'` intervient dès **`±0,2500` pt consensus** sur `M1`, `M2` ou `M3` (soit un seul demi-point `0,5` modifié chez un seul juré), ou dès `w_M2 < 21,74 %` (`-3,26` pp), `w_M3 > 30,77 %` (`+5,77` pp), `w_M1 > 33,33 %` (`+8,33` pp) ou `w_M5 > 16,92 %` (`+6,92` pp). `A'` gagne dans `3` scénarios (`P1`, `P2`, `P7-J2`), `A'+` dans `4` (`P4`, `P5`, `P6`, `P7-J1`) et les deux font **ex æquo exact (`9,0500`) en `P3`**.
  - **Portée décisionnelle :** La note seule ne départage pas `A'` et `A'+`. Or, dans leurs avis motivés indépendants (`[Supposé]`), **tant `J1` ([`notation-jury-1.md`](notation-jury-1.md#L107-L113)) que `J2` ([`notation-jury-2.md`](notation-jury-2.md#L101-L109)) convergent vers le même arbitrage : retenir `A'` (MVP strict) comme socle obligatoire du Volume 8**, tout en décidant séparément si `B'`/`tprm-exit-kit/` forment un **Volume 9 Conformité `2027`** ou une greffe modulaire découplée de `G0`.

---

## 2. Verdict de robustesse motivé

**Verdict : `robuste` au niveau inter-propositions ; `fragile` uniquement entre les deux variantes internes `A'` et `A'+` (`+0,0625` pt).**

1. **Pourquoi le classement général est désormais `robuste` (progrès net vs verdict `fragile` de Phase 1) :**
   - Les `4` faiblesses qui rendaient la Phase 1 `fragile` sont résorbées : double jury aveugle à fort accord (`Kappa_w = +0,9201`, `MAE = 0,2500`), variance `M2+M4` réduite de `55,3 %` à `36,6 %` (avec `M3` en tête à `33,4 %`), `r(M2, M4)` abaissée de `+0,8774` à `+0,7803`, et disparition de l'inversion `2e/3e` (`B' > C'` invaincu dans `8/8` lectures).
   - Le choix de la proposition **A** comme lauréat du Volume 8 est inattaquable sous toutes les pondérations raisonnables (`w_M3` devrait dépasser `56,83 %` pour `A'` ou `79,73 %` pour `A'+` avant qu'un challenger externe n'atteigne le 1er rang).
2. **Pourquoi l'écart `A'` vs `A'+` reste `fragile` (et pourquoi ce constat est sain) :**
   - L'écart de `0,0625` pt est inférieur au pas élémentaire d'un seul juré (`0,5 pt × 0,25 / 2 = 0,0625` pt ; précisément, `0,5` pt sur un critère `25 %` d'un juré vaut `0,0625` pt pondéré). Les critères mesurant des objectifs légitimement antagonistes (`M2` sobriété/`L+` vs `M1/M3/M5` couverture `2027`), les deux variantes ne peuvent pas être hiérarchisées purement arithmétiquement : l'arbitrage `A'` vs `A'+` doit s'appuyer explicitement sur la stratégie de portefeuille (`Vol. 8` seul vs `Vol. 8 + Vol. 9 Conformité/TPRM`).

---

## 3. Sortie complète reproductible de `arbitrage_final.py`

Commande exécutée (`PowerShell`, UTF-8) : `python "C:\Github\Prospection\Prospection\recommandation-finale\arbitrage_final.py"` (`exit code 0` `[Vérifié par exécution]`).

```text
====================================================================================
0. EXTRACTION VERIFIEE (J1, J2) ET MATRICE CONSENSUS (MOYENNE J1/J2)
====================================================================================
Sources : notation-jury-1.md (J1) & notation-jury-2.md (J2) | 8 options x 5 critères = 40 cellules/jury
Contrôle J2 P1 indicatif (colonne publiee vs recalcul exact 3 dec.) : 8/8 concordances exactes.

Option | J1 (M1..M5)                 | J2 (M1..M5)                 | Consensus (M1..M5)              
------------------------------------------------------------------------------------------------------
A'     |  9.0  8.5  8.5  9.5  9.0   |  9.0  9.5  8.5  9.5  9.5   |  9.00  9.00  8.50  9.50  9.25
A'+    |  9.5  7.5  9.5  9.0 10.0   |  9.5  7.5  9.0  9.0 10.0   |  9.50  7.50  9.25  9.00 10.00
B'     |  8.0  7.0  9.5  8.0  8.5   |  8.0  7.0  9.5  8.5  9.0   |  8.00  7.00  9.50  8.25  8.75
C'     |  8.5  8.5  7.0  7.5  7.5   |  8.5  8.5  8.0  8.0  7.5   |  8.50  8.50  7.50  7.75  7.50
D'     |  7.5  8.0  8.0  8.0  8.0   |  7.0  8.0  8.0  8.0  7.5   |  7.25  8.00  8.00  8.00  7.75
E'     |  7.5  6.5  6.5  7.0  8.0   |  5.5  6.5  6.0  7.0  7.5   |  6.50  6.50  6.25  7.00  7.75
F'     |  7.5  5.5  5.0  6.5  6.0   |  7.5  5.5  5.0  6.5  5.5   |  7.50  5.50  5.00  6.50  5.75
G'     |  8.5  6.5  7.5  7.5  7.5   |  8.5  6.5  8.0  7.5  7.0   |  8.50  6.50  7.75  7.50  7.25

====================================================================================
1. ACCORD INTER-JUGES J1 VS J2 (40 CELLULES & SCORES P1)
====================================================================================
Synthese globale sur 40 cellules :
  - MAE global (|J1 - J2|)        = 0.2500 pt (arr. 0.25)
  - Biais moyen signe (J1 - J2)   = +0.0250 pt
  - RMSE                          = 0.4743 pt | Ecart max = 2.0 pt
  - Distribution |J1 - J2|        : 0,0=25/40 (62.5%), <=0,5=37/40 (92.5%), <=1,0=39/40 (97.5%), >=2,0=1/40

MAE par critere (sur 8 candidats) :
  - M1 (Non-redondance & angle mort     ) : MAE = 0.3125 | biais = +0.3125 | max = 2.0 | rho_rang = +0.9756
  - M2 (Faisabilité L+ & bornage (hors CI)) : MAE = 0.1250 | biais = -0.1250 | max = 1.0 | rho_rang = +0.9940
  - M3 (Impact, urgence 2027 & lectorat ) : MAE = 0.3125 | biais = -0.0625 | max = 1.0 | rho_rang = +0.9695
  - M4 (Vérifiabilité & preuve (neutre) ) : MAE = 0.1250 | biais = -0.1250 | max = 0.5 | rho_rang = +0.9697
  - M5 (Levier corpus & outils Vol. 7   ) : MAE = 0.3750 | biais = +0.1250 | max = 0.5 | rho_rang = +0.9630

MAE par candidat (sur 5 criteres) :
  - A'   : MAE = 0.3000 | biais = -0.3000 | max = 1.0
  - A'+  : MAE = 0.1000 | biais = +0.1000 | max = 0.5
  - B'   : MAE = 0.2000 | biais = -0.2000 | max = 0.5
  - C'   : MAE = 0.3000 | biais = -0.3000 | max = 1.0
  - D'   : MAE = 0.2000 | biais = +0.2000 | max = 0.5
  - E'   : MAE = 0.6000 | biais = +0.6000 | max = 2.0
  - F'   : MAE = 0.1000 | biais = +0.1000 | max = 0.5
  - G'   : MAE = 0.2000 | biais = +0.0000 | max = 0.5

Cellules avec |J1 - J2| >= 2,0 :
  - (E', M1) : J1=7.5, J2=5.5, J1-J2=+2.0 (|ecart|=2.0)

Correlations et accord quadratique pondere J1 vs J2 :
  - Sur 40 notes cellulaires : Pearson r = +0.9267 (t=+15.196, p=0.000000), Spearman rho = +0.9312
  - Accord quadratique pondere (40 cellules, echelle 0..10 pas 0,5) : Kappa_w = +0.9201 (Lin CCC = +0.9201)
  - Sur 8 scores P1 (25/25/25/15/10) : Spearman rho = +0.9701, Pearson r = +0.9646 (t=+8.963, p=0.000108)

====================================================================================
2. MATRICE CONSENSUS ET SCORES/RANGS SOUS 7 SCENARIOS (P1–P7)
====================================================================================
Scores detailles sous P1 (25/25/25/15/10) :
Rang Opt.     M1    M2    M3    M4    M5 | Cons.Exact  Arr.2d |   J1 P1   J2 P1   J1-J2
--------------------------------------------------------------------------------------------
1    A'     9.00  9.00  8.50  9.50  9.25 |     8.9750    8.98 |   8.825   9.125  -0.300
2    A'+    9.50  7.50  9.25  9.00 10.00 |     8.9125    8.91 |   8.975   8.850  +0.125
3    B'     8.00  7.00  9.50  8.25  8.75 |     8.2375    8.24 |   8.175   8.300  -0.125
4    C'     8.50  8.50  7.50  7.75  7.50 |     8.0375    8.04 |   7.875   8.200  -0.325
5    D'     7.25  8.00  8.00  8.00  7.75 |     7.7875    7.79 |   7.875   7.700  +0.175
6    G'     8.50  6.50  7.75  7.50  7.25 |     7.5375    7.54 |   7.500   7.575  -0.075
7    E'     6.50  6.50  6.25  7.00  7.75 |     6.6375    6.64 |   6.975   6.300  +0.675
8    F'     7.50  5.50  5.00  6.50  5.75 |     6.0500    6.05 |   6.075   6.025  +0.050

Tableau synthetique P1–P7 (scores arrondis 2 dec., ordres complets et marges exactes) :
[P1   ] Équilibré révisé (25/25/25/15/10)      | Poids: [25.0% / 25.0% / 25.0% / 15.0% / 10.0%]
        Ordre : A'(8.98) > A'+(8.91) > B'(8.24) > C'(8.04) > D'(7.79) > G'(7.54) > E'(6.64) > F'(6.05)
        Marges : 1er-2e = +0.0625 | min(A',A'+)-B' = +0.6750 | B'-C' = +0.2000
[P2   ] Poids Phase 1 (25/30/20/15/10)         | Poids: [25.0% / 30.0% / 20.0% / 15.0% / 10.0%]
        Ordre : A'(9.00) > A'+(8.83) > B'(8.11) > C'(8.09) > D'(7.79) > G'(7.48) > E'(6.65) > F'(6.08)
        Marges : 1er-2e = +0.1750 | min(A',A'+)-B' = +0.7125 | B'-C' = +0.0250
[P3   ] Poids égaux (20/20/20/20/20)           | Poids: [20.0% / 20.0% / 20.0% / 20.0% / 20.0%]
        Ordre : A'(9.05) = A'+(9.05) > B'(8.30) > C'(7.95) > D'(7.80) > G'(7.50) > E'(6.80) > F'(6.05)
        Marges : 1er-2e = +0.0000 | min(A',A'+)-B' = +0.7500 | B'-C' = +0.3500
[P4   ] Urgence 2027 (20/20/35/15/10)          | Poids: [20.0% / 20.0% / 35.0% / 15.0% / 10.0%]
        Ordre : A'+(8.99) > A'(8.93) > B'(8.44) > C'(7.94) > D'(7.83) > G'(7.56) > E'(6.61) > F'(5.90)
        Marges : 1er-2e = +0.0625 | min(A',A'+)-B' = +0.4875 | B'-C' = +0.5000
[P5   ] Non-redondance (40/20/20/10/10)        | Poids: [40.0% / 20.0% / 20.0% / 10.0% / 10.0%]
        Ordre : A'+(9.05) > A'(8.98) > B'(8.20) > C'(8.13) > G'(7.73) > D'(7.68) > E'(6.63) > F'(6.33)
        Marges : 1er-2e = +0.0750 | min(A',A'+)-B' = +0.7750 | B'-C' = +0.0750
[P6   ] Sans M4 renorm. depuis P1 (M4=0%)      | Poids: [29.4% / 29.4% / 29.4% / 0.0% / 11.8%]
        Ordre : A'+(8.90) > A'(8.88) > B'(8.24) > C'(8.09) > D'(7.75) > G'(7.54) > E'(6.57) > F'(5.97)
        Marges : 1er-2e = +0.0147 | min(A',A'+)-B' = +0.6471 | B'-C' = +0.1471
[P7-J1] Jury 1 seul sous P1 (25/25/25/15/10)   | Poids: [25.0% / 25.0% / 25.0% / 15.0% / 10.0%]
        Ordre : A'+(8.98) > A'(8.83) > B'(8.18) > C'(7.88) = D'(7.88) > G'(7.50) > E'(6.98) > F'(6.08)
        Marges : 1er-2e = +0.1500 | min(A',A'+)-B' = +0.6500 | B'-C' = +0.3000
[P7-J2] Jury 2 seul sous P1 (25/25/25/15/10)   | Poids: [25.0% / 25.0% / 25.0% / 15.0% / 10.0%]
        Ordre : A'(9.13) > A'+(8.85) > B'(8.30) > C'(8.20) > D'(7.70) > G'(7.58) > E'(6.30) > F'(6.03)
        Marges : 1er-2e = +0.2750 | min(A',A'+)-B' = +0.5500 | B'-C' = +0.1000

Synthese des rangs (1..8) a travers les 8 lectures P1–P7 :
Opt.  |     P1     P2     P3     P4     P5     P6  P7-J1  P7-J2
----------------------------------------------------------------
A'    |      1      1     1=      2      2      2      2      1
A'+   |      2      2     1=      1      1      1      1      2
B'    |      3      3      3      3      3      3      3      3
C'    |      4      4      4      4      4      4     4=      4
D'    |      5      5      5      5      6      5     4=      5
G'    |      6      6      6      6      5      6      6      6
E'    |      7      7      7      7      7      7      7      7
F'    |      8      8      8      8      8      8      8      8

====================================================================================
3. CORRELATIONS INTER-CRITERES M1–M5 ET DECOMPOSITION DE VARIANCE
====================================================================================

Decomposition de variance sous P1 (25/25/25/15/10) (n = 8, var(S) = 1.04896) :
  M1 (w=25%) : min=6.50, max=9.50, moy=8.094, std=0.981, w*std=0.2454, part_var= 18.7%
  M2 (w=25%) : min=5.50, max=9.00, moy=7.312, std=1.163, w*std=0.2908, part_var= 22.7%
  M3 (w=25%) : min=5.00, max=9.50, moy=7.719, std=1.503, w*std=0.3757, part_var= 33.4%
  M4 (w=15%) : min=6.50, max=9.50, moy=7.938, std=0.989, w*std=0.1483, part_var= 14.0%
  M5 (w=10%) : min=5.75, max=10.00, moy=8.000, std=1.316, w*std=0.1316, part_var= 11.3%
  -> Somme bloc (M2+M4) = 36.6% (vs Phase 1 : 55.3%)

Decomposition de variance sous P2 Phase 1 (25/30/20/15/10) (n = 8, var(S) = 1.00801) :
  M1 (w=25%) : min=6.50, max=9.50, moy=8.094, std=0.981, w*std=0.2454, part_var= 19.0%
  M2 (w=30%) : min=5.50, max=9.00, moy=7.312, std=1.163, w*std=0.3489, part_var= 28.8%
  M3 (w=20%) : min=5.00, max=9.50, moy=7.719, std=1.503, w*std=0.3005, part_var= 26.5%
  M4 (w=15%) : min=6.50, max=9.50, moy=7.938, std=0.989, w*std=0.1483, part_var= 14.3%
  M5 (w=10%) : min=5.75, max=10.00, moy=8.000, std=1.316, w*std=0.1316, part_var= 11.4%
  -> Somme bloc (M2+M4) = 43.1% (vs Phase 1 : 55.3%)

Correlations inter-criteres sur matrice consensus (n = 8, df = 6) :
  M4-M5 : r = +0.8988, R2 = 80.78%, t = +5.022, p = 0.0024, rho = +0.8743
  M3-M5 : r = +0.8578, R2 = 73.59%, t = +4.089, p = 0.0064, rho = +0.8024
  M3-M4 : r = +0.8398, R2 = 70.53%, t = +3.790, p = 0.0091, rho = +0.8810
  M2-M4 : r = +0.7803, R2 = 60.88%, t = +3.056, p = 0.0223, rho = +0.7785 <-- vs Phase 1 r(C2,C4)=+0.8774 (ecart -0.0971)
  M1-M4 : r = +0.7246, R2 = 52.50%, t = +2.575, p = 0.0420, rho = +0.6587
  M1-M3 : r = +0.6138, R2 = 37.67%, t = +1.904, p = 0.1055, rho = +0.5150
  M2-M5 : r = +0.5950, R2 = 35.40%, t = +1.813, p = 0.1197, rho = +0.5602
  M1-M5 : r = +0.5876, R2 = 34.52%, t = +1.779, p = 0.1256, rho = +0.4578
  M2-M3 : r = +0.5786, R2 = 33.48%, t = +1.738, p = 0.1329, rho = +0.4791
  M1-M2 : r = +0.4713, R2 = 22.21%, t = +1.309, p = 0.2385, rho = +0.4759
  [Controle n=7 propositions distinctes hors A'+] M2-M4 : r = +0.8366, t(df=5) = +3.414, p = 0.0190, rho = +0.8469

Structure de dominance de Pareto de A' et A'+ (consensus) :
  A'  vs A'+ [M1:-0.50, M2:+1.50, M3:-0.75, M4:+0.50, M5:-0.75] => non domine
  A'  vs B'  [M1:+1.00, M2:+2.00, M3:-1.00, M4:+1.25, M5:+0.50] => non domine
  A'  vs C'  [M1:+0.50, M2:+0.50, M3:+1.00, M4:+1.75, M5:+1.75] => PARETO-DOMINE par A'
  A'  vs D'  [M1:+1.75, M2:+1.00, M3:+0.50, M4:+1.50, M5:+1.50] => PARETO-DOMINE par A'
  A'  vs E'  [M1:+2.50, M2:+2.50, M3:+2.25, M4:+2.50, M5:+1.50] => PARETO-DOMINE par A'
  A'  vs F'  [M1:+1.50, M2:+3.50, M3:+3.50, M4:+3.00, M5:+3.50] => PARETO-DOMINE par A'
  A'  vs G'  [M1:+0.50, M2:+2.50, M3:+0.75, M4:+2.00, M5:+2.00] => PARETO-DOMINE par A'
  A'+ vs A'  [M1:+0.50, M2:-1.50, M3:+0.75, M4:-0.50, M5:+0.75] => non domine
  A'+ vs B'  [M1:+1.50, M2:+0.50, M3:-0.25, M4:+0.75, M5:+1.25] => non domine
  A'+ vs C'  [M1:+1.00, M2:-1.00, M3:+1.75, M4:+1.25, M5:+2.50] => non domine
  A'+ vs D'  [M1:+2.25, M2:-0.50, M3:+1.25, M4:+1.00, M5:+2.25] => non domine
  A'+ vs E'  [M1:+3.00, M2:+1.00, M3:+3.00, M4:+2.00, M5:+2.25] => PARETO-DOMINE par A'+
  A'+ vs F'  [M1:+2.00, M2:+2.00, M3:+4.25, M4:+2.50, M5:+4.25] => PARETO-DOMINE par A'+
  A'+ vs G'  [M1:+1.00, M2:+1.00, M3:+1.50, M4:+1.50, M5:+2.75] => PARETO-DOMINE par A'+

====================================================================================
4. SEUILS EXACTS (POIDS & POINTS) ET COMPARAISON A' VS A'+
====================================================================================
A. Seuils exacts en POINTS sur la matrice consensus (poids P1 = 25/25/25/15/10 constants) :

  [1er vs 2e (8 options — arbitrage interne A' vs A'+)] : A' (8.9750) - A'+ (8.9125) = +0.0625 pt
    - M1 (w=25%) : seuil = 0.2500 pt | A'->8.750 (possible) ou A'+->9.750 (possible)
    - M2 (w=25%) : seuil = 0.2500 pt | A'->8.750 (possible) ou A'+->7.750 (possible)
    - M3 (w=25%) : seuil = 0.2500 pt | A'->8.250 (possible) ou A'+->9.500 (possible)
    - M4 (w=15%) : seuil = 0.4167 pt | A'->9.083 (possible) ou A'+->9.417 (possible)
    - M5 (w=10%) : seuil = 0.6250 pt | A'->8.625 (possible) ou A'+->10.625 (> plafond 10)
    - Bloc (M2+M4, 40%) uniforme sur A' : -0.1562 pt chacun (M2->8.844, M4->9.344)

  [1er rang A' vs 1er challenger externe B'] : A' (8.9750) - B' (8.2375) = +0.7375 pt
    - M1 (w=25%) : seuil = 2.9500 pt | A'->6.050 (possible) ou B'->10.950 (> plafond 10)
    - M2 (w=25%) : seuil = 2.9500 pt | A'->6.050 (possible) ou B'->9.950 (possible)
    - M3 (w=25%) : seuil = 2.9500 pt | A'->5.550 (possible) ou B'->12.450 (> plafond 10)
    - M4 (w=15%) : seuil = 4.9167 pt | A'->4.583 (possible) ou B'->13.167 (> plafond 10)
    - M5 (w=10%) : seuil = 7.3750 pt | A'->1.875 (possible) ou B'->16.125 (> plafond 10)
    - Bloc (M2+M4, 40%) uniforme sur A' : -1.8438 pt chacun (M2->7.156, M4->7.656)

  [2e rang A'+ (ou 1er si A'+ retenu) vs challenger B'] : A'+ (8.9125) - B' (8.2375) = +0.6750 pt
    - M1 (w=25%) : seuil = 2.7000 pt | A'+->6.800 (possible) ou B'->10.700 (> plafond 10)
    - M2 (w=25%) : seuil = 2.7000 pt | A'+->4.800 (possible) ou B'->9.700 (possible)
    - M3 (w=25%) : seuil = 2.7000 pt | A'+->6.550 (possible) ou B'->12.200 (> plafond 10)
    - M4 (w=15%) : seuil = 4.5000 pt | A'+->4.500 (possible) ou B'->12.750 (> plafond 10)
    - M5 (w=10%) : seuil = 6.7500 pt | A'+->3.250 (possible) ou B'->15.500 (> plafond 10)
    - Bloc (M2+M4, 40%) uniforme sur A'+ : -1.6875 pt chacun (M2->5.812, M4->7.312)

  [3e vs 4e (2e vs 3e proposition distincte)] : B' (8.2375) - C' (8.0375) = +0.2000 pt
    - M1 (w=25%) : seuil = 0.8000 pt | B'->7.200 (possible) ou C'->9.300 (possible)
    - M2 (w=25%) : seuil = 0.8000 pt | B'->6.200 (possible) ou C'->9.300 (possible)
    - M3 (w=25%) : seuil = 0.8000 pt | B'->8.700 (possible) ou C'->8.300 (possible)
    - M4 (w=15%) : seuil = 1.3333 pt | B'->6.917 (possible) ou C'->9.083 (possible)
    - M5 (w=10%) : seuil = 2.0000 pt | B'->6.750 (possible) ou C'->9.500 (possible)
    - Bloc (M2+M4, 40%) uniforme sur B' : -0.5000 pt chacun (M2->6.500, M4->7.750)

B. Seuils exacts en POIDS depuis P1 (notes consensus constantes, renormalisation proportionnelle) :

  [1er vs 2e (8 options — arbitrage interne A' vs A'+)] :
    - M1 (base 25.0%) : seuil exact = 1/3 = 33.33% (+8.33 pp) => A'+ > A' si w >
    - M2 (base 25.0%) : seuil exact = 5/23 = 21.74% (-3.26 pp) => A'+ > A' si w <
    - M3 (base 25.0%) : seuil exact = 4/13 = 30.77% (+5.77 pp) => A'+ > A' si w >
    - M4 (base 15.0%) : seuil exact = 1/35 = 2.86% (-12.14 pp) => A'+ > A' si w <
    - M5 (base 10.0%) : seuil exact = 11/65 = 16.92% (+6.92 pp) => A'+ > A' si w >

  [1er rang A' vs 1er challenger externe B'] :
    - M1 (base 25.0%) : aucun seuil dans [0%, 100%] (hors [0, 1])
    - M2 (base 25.0%) : aucun seuil dans [0%, 100%] (hors [0, 1])
    - M3 (base 25.0%) : seuil exact = 79/139 = 56.83% (+31.83 pp) => B' > A' si w >
    - M4 (base 15.0%) : aucun seuil dans [0%, 100%] (hors [0, 1])
    - M5 (base 10.0%) : aucun seuil dans [0%, 100%] (hors [0, 1])

  [2e rang A'+ (ou 1er si A'+ retenu) vs challenger B'] :
    - M1 (base 25.0%) : aucun seuil dans [0%, 100%] (hors [0, 1])
    - M2 (base 25.0%) : aucun seuil dans [0%, 100%] (hors [0, 1])
    - M3 (base 25.0%) : seuil exact = 59/74 = 79.73% (+54.73 pp) => B' > A'+ si w >
    - M4 (base 15.0%) : aucun seuil dans [0%, 100%] (hors [0, 1])
    - M5 (base 10.0%) : aucun seuil dans [0%, 100%] (hors [0, 1])

  [3e vs 4e (2e vs 3e proposition distincte)] :
    - M1 (base 25.0%) : seuil exact = 13/28 = 46.43% (+21.43 pp) => C' > B' si w >
    - M2 (base 25.0%) : seuil exact = 23/68 = 33.82% (+8.82 pp) => C' > B' si w >
    - M3 (base 25.0%) : seuil exact = 1/6 = 16.67% (-8.33 pp) => C' > B' si w <
    - M4 (base 15.0%) : aucun seuil dans [0%, 100%] (hors [0, 1])
    - M5 (base 10.0%) : aucun seuil dans [0%, 100%] (hors [0, 1])

C. Comparaison directe critere par critere : A' (MVP strict) vs A'+ (MVP enrichi 2027) :
Crit. Poids P1 |  A' J1  A' J2 A' Cons | A'+ J1 A'+ J2 A'+ Cons | Delta(A'-A'+) Contrib. P1
------------------------------------------------------------------------------------------------------
M1         25% |    9.0    9.0    9.00 |    9.5    9.5     9.50 |         -0.50     -0.1250
M2         25% |    8.5    9.5    9.00 |    7.5    7.5     7.50 |         +1.50     +0.3750
M3         25% |    8.5    8.5    8.50 |    9.5    9.0     9.25 |         -0.75     -0.1875
M4         15% |    9.5    9.5    9.50 |    9.0    9.0     9.00 |         +0.50     +0.0750
M5         10% |    9.0    9.5    9.25 |   10.0   10.0    10.00 |         -0.75     -0.0750
------------------------------------------------------------------------------------------------------
Bilan P1 : avantage A' (M2+M4) = +0.4500 pt | avantage A'+ (M1+M3+M5) = +0.3875 pt | Solde net (A' - A'+) = +0.0625 pt

Victoires par scenario entre A' et A'+ :
  - P1    : A'=8.9750 vs A'+=8.9125 => vainqueur A'  (ecart +0.0625)
  - P2    : A'=9.0000 vs A'+=8.8250 => vainqueur A'  (ecart +0.1750)
  - P3    : A'=9.0500 vs A'+=9.0500 => vainqueur ex aequo (ecart +0.0000)
  - P4    : A'=8.9250 vs A'+=8.9875 => vainqueur A'+ (ecart -0.0625)
  - P5    : A'=8.9750 vs A'+=9.0500 => vainqueur A'+ (ecart -0.0750)
  - P6    : A'=8.8824 vs A'+=8.8971 => vainqueur A'+ (ecart -0.0147)
  - P7-J1 : A'=8.8250 vs A'+=8.9750 => vainqueur A'+ (ecart -0.1500)
  - P7-J2 : A'=9.1250 vs A'+=8.8500 => vainqueur A'  (ecart +0.2750)
```
