# Audit méthodologique et analyse de sensibilité de la matrice d'évaluation (§ 2)

- **Cible auditée :** [`RECOMMANDATION-PROCHAIN-LIVRABLE.md`](../RECOMMANDATION-PROCHAIN-LIVRABLE.md) (§ 2, `L76-L101` : `6` candidats `A`–`F`, `5` critères pondérés `C1`–`C5`).
- **Script reproductible associé :** [`sensibilite.py`](sensibilite.py) (`Python 3.14.10`, bibliothèque standard uniquement, arithmétique décimale `Decimal` avec arrondi `ROUND_HALF_UP`).
- **Régime et distinction épistémique :** **Production**. Chaque constat distingue explicitement ce qui est **vérifié dans le corpus (`fichier + Lxxx`)**, **vérifié par exécution (`sensibilite.py`)** et **supposé** (aucune vérification web requise ni effectuée).
- **Verdict sur la robustesse du classement :** **`fragile`** *(1re place de `A` mathématiquement stable aux seuls jeux de poids sur les notes existantes, mais classement complet instable dès le 2e rang et méthode vulnérable aux biais de notation sans grille).*

---

## 1. Recalcul arithmétique des six scores d'origine

**Statut :** vérifié dans le corpus ([`RECOMMANDATION-PROCHAIN-LIVRABLE.md`](../RECOMMANDATION-PROCHAIN-LIVRABLE.md) `L78-L96`, [`audit-livrable-final.md`](../analyse-essaim/audit-livrable-final.md) `L69`) et vérifié par exécution (`sensibilite.py`).

Les pondérations déclarées à `L79-L83` sont `C1 = 25 %`, `C2 = 30 %`, `C3 = 20 %`, `C4 = 15 %`, `C5 = 10 %` (somme `= 100 %`). Le calcul exact en arithmétique décimale confirme intégralement les six scores et les rangs publiés au tableau `L85-L92` :

| Candidat | `C1` (25 %) | `C2` (30 %) | `C3` (20 %) | `C4` (15 %) | `C5` (10 %) | Somme exacte | Arrondi `ROUND_HALF_UP` | Publié (`L87-L92`) | Écart | Rang |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **A** | `9,5` | `9,5` | `8,8` | `10,0` | `9,5` | `9,435` | `9,44` | `9,44` | `0,00` | **1er** |
| **C** | `9,2` | `8,5` | `7,4` | `8,0` | `7,5` | `8,280` | `8,28` | `8,28` | `0,00` | **2e** |
| **B** | `8,5` | `6,8` | `9,5` | `8,3` | `9,2` | `8,230` | `8,23` | `8,23` | `0,00` | **3e** |
| **D** | `8,0` | `7,2` | `8,0` | `7,5` | `7,5` | `7,635` | `7,64` | `7,64` | `0,00` | **4e** |
| **E** | `6,5` | `8,0` | `7,0` | `8,5` | `7,5` | `7,450` | `7,45` | `7,45` | `0,00` | **5e** |
| **F** | `8,5` | `5,5` | `7,0` | `6,5` | `6,0` | `6,750` | `6,75` | `6,75` | `0,00` | **6e** |

**Constats arithmétiques :**
- **Zéro erreur de calcul :** l'écart entre le score exact (`9,435` pour `A`, `7,635` pour `D`) et l'affichage à deux décimales relève d'un arrondi standard (`ROUND_HALF_UP`), confirmant l'avance affichée de `+1,16` pt (`1,155` exact) de `A` sur `C` (`L96`). *(Note technique : en virgule flottante binaire IEEE-754 brute sans `Decimal`, `7.635` s'arrondirait à `7.63` par défaut de représentation ; le calcul exact en base 10 donne bien `7,64`.)*
- **Écart critique 2e vs 3e :** `C` ne devance `B` que de **`0,050` point** (`8,280` contre `8,230`), soit la moitié d'un dixième sur une échelle notée au dixième.

---

## 2. Analyse de sensibilité multi-scénarios et analyse de seuil

**Statut :** vérifié par exécution (`sensibilite.py`) sur les notes figées du corpus (`RECOMMANDATION-PROCHAIN-LIVRABLE.md L87-L92`).

### 2.1 Rangs et scores sous neuf jeux de poids

La convention appliquée lorsqu'un critère `k` est fixé à une nouvelle valeur est la **renormalisation proportionnelle** des autres poids selon leurs ratios d'origine (une variante en poids entiers `[S3-int]` est également vérifiée).

| Scénario | Poids `C1 / C2 / C3 / C4 / C5` (%) | `A` | `B` | `C` | `D` | `E` | `F` | Ordre complet | Marge `1er–2e` |
| --- | --- | :---: | :---: | :---: | :---: | :---: | :---: | --- | :---: |
| **`S1` Origine** | `25,0 / 30,0 / 20,0 / 15,0 / 10,0` | `9,44` | `8,23` | `8,28` | `7,64` | `7,45` | `6,75` | `A > C > B > D > E > F` | `+1,155` |
| **`S2` Poids égaux** | `20,0 / 20,0 / 20,0 / 20,0 / 20,0` | `9,46` | **`8,46`** | `8,12` | `7,64` | `7,50` | `6,70` | `A >` **`B > C`** `> D > E > F` | `+1,000` |
| **`S3` Urgence 2027 (`C3=35%`)** | `20,3 / 24,4 / 35,0 / 12,2 / 8,1` | `9,32` | **`8,47`** | `8,12` | `7,70` | `7,37` | `6,80` | `A >` **`B > C`** `> D > E > F` | `+0,848` |
| **`S4` Non-redondance (`C1=40%`)** | `40,0 / 24,0 / 16,0 / 12,0 / 8,0` | `9,45` | `8,28` | `8,46` | `7,71` | `7,26` | `7,10` | `A > C > B > D > E > F` | `+0,984` |
| **`S5` Faisabilité min. (`C2=15%`)** | `30,4 / 15,0 / 24,3 / 18,2 / 12,1` | `9,42` | **`8,54`** | `8,23` | `7,73` | `7,33` | `7,02` | `A >` **`B > C`** `> D > E > F` | `+0,885` |
| **`S6` Sans `C4` (`C4=0%`)** | `29,4 / 35,3 / 23,5 / 0,0 / 11,8` | `9,34` | `8,22` | `8,33` | `7,66` | `7,26` | `6,79` | `A > C > B > D > E > F` | `+1,006` |
| **`S7` Anti-biais code (`C2=15,C4=0,C3=35`)** | `35,7 / 15,0 / 35,0 / 0,0 / 14,3` | `9,26` | **`8,70`** | `8,22` | `7,81` | `7,04` | `7,17` | `A >` **`B > C`** `> D >` **`F > E`** | `+0,560` |
| **`S8` Noyau non technique (`C2=0,C4=0`)** | `45,5 / 0,0 / 36,4 / 0,0 / 18,2` | `9,25` | **`8,99`** | `8,24` | `7,91` | `6,86` | `7,50` | `A >` **`B > C`** `> D >` **`F > E`** | `+0,255` |
| **`S9` Stress-test (`C3=71%`)** | `9,1 / 10,9 / 71,0 / 5,4 / 3,6` | `9,03` | **`9,04`** | `7,72` | `7,87` | `7,16` | `6,91` | **`B > A`** `> D > C > E > F` | `+0,009` |

**Enseignements clés :**
1. **Stabilité arithmétique de la 1re place :** `A` reste 1er dans les **6 scénarios de référence (`S1` à `S6`)** et même dans les deux stress-tests `S7` (`+0,560`) et `S8` (`+0,255`, pourtant à poids nul sur `C2` et `C4`). Cette immobilité s'explique par la **dominance de Pareto stricte** de `A` sur `C`, `D`, `E` et `F` sur `5/5` critères, et sur `B` sur `4/5` critères (`C1 +1,0`, `C2 +2,7`, `C4 +1,7`, `C5 +0,3`, contre `C3 -0,7` seulement).
2. **Instabilité immédiate des rangs 2 et 3 (`C` vs `B`) :** dans **3 des 6 scénarios de référence (`S2`, `S3`, `S5`)**, **`B` détrône `C` et passe 2e** (avec une avance atteignant `+0,34` pt sous `S2` et `+0,35` pt sous `S3`). Le classement complet `A > C > B > D > E > F` n'est donc pas robuste aux choix de pondération.

### 2.2 Analyse de seuil : perte de la 1re place par `A` (et bascule 2e/3e)

Parce que la question « de combien `C2` doit baisser ou `C3` monter » admet une lecture sur les **poids** et une lecture sur les **notes**, les deux axes sont calculés exactement :

- **Sur les poids (notes d'origine constantes, renormalisation proportionnelle) :**
  - **Baisse du poids `w_C2` seul :** aucune baisse dans `[0 %, 100 %]` ne déloge `A`. Même à `w_C2 = 0 %`, `A` obtient `9,407` contre `8,843` pour `B` et `8,186` pour `C`.
  - **Hausse du poids `w_C3` seul :** `A` ne perd la 1re place (au profit de **`B`**) que lorsque `w_C3` dépasse **`70,60 %`** (`269/381`, soit **`+50,60` points de pourcentage** par rapport aux `20 %` initiaux).
  - **Seuil sur le 2e rang (`C` vs `B`) :** il suffit d'augmenter `w_C3` de **`+1,86` pp** (de `20,00 %` à `> 21,86 %`) ou de baisser `w_C2` de **`-2,12` pp** (de `30,00 %` à `< 27,88 %`) pour que `B` passe 2e devant `C`.
- **Sur les notes (poids d'origine `25/30/20/15/10 %` constants) :**
  - **Baisse de la note `C2(A)` seule :** elle doit chuter de **`-3,850` points** (de `9,50` sous `5,650/10`) pour être rejointe par `C` (`8,280`), ou de `-4,017` points (sous `5,483/10`) pour être rejointe par `B`.
  - **Hausse de la note `C3` d'un concurrent seule :** **impossible** dans la borne `[0, 10]`. Même portés au plafond `10,0/10`, `B` plafonne à `8,330` et `C` à `8,800` (il faudrait théoriquement `15,525/10` à `B` ou `13,175/10` à `C`).
  - **Baisse combinée du bloc `C2(A)` + `C4(A)` (`45 %` du poids) :** une baisse uniforme de **`-2,567` points** sur les deux critères (`C2` à `6,93`, `C4` à `7,43`) suffit pour que `C` rejoigne `A`.
  - **Seuil 2e vs 3e :** une baisse de `C2(C)` de `-0,167` pt ou une hausse de `C3(B)` de `+0,250` pt inverse `C` et `B`.

### 2.3 Sortie brute reproductible du script `sensibilite.py`

Commande exécutée (`PowerShell`, UTF-8) : `python "C:\Github\Prospection\Prospection\revue-propositions\sensibilite.py"` (`exit code 0`).

```text
==============================================================================
1. RECALCUL EXACT DES SCORES D'ORIGINE (POIDS 25/30/20/15/10 %)
==============================================================================
Cand.     C1    C2    C3    C4    C5 |   Exact  Arr.2d  Publié   Écart
------------------------------------------------------------------------------
A        9.5   9.5   8.8  10.0   9.5 |   9.435    9.44    9.44   +0.00
C        9.2   8.5   7.4   8.0   7.5 |   8.280    8.28    8.28   +0.00
B        8.5   6.8   9.5   8.3   9.2 |   8.230    8.23    8.23   +0.00
D        8.0   7.2   8.0   7.5   7.5 |   7.635    7.64    7.64   +0.00
E        6.5   8.0   7.0   8.5   7.5 |   7.450    7.45    7.45   +0.00
F        8.5   5.5   7.0   6.5   6.0 |   6.750    6.75    6.75   +0.00

Écart 1er vs 2e (A - C) : exact = 1.155 pt | publié = 1.16 pt
Écart 2e vs 3e (C - B) : exact = 0.050 pt (inférieur au bruit de 0,1 pt)

==============================================================================
2. SENSIBILITÉ DES SCORES ET DES RANGS (9 JEUX DE POIDS)
==============================================================================
[S1] Poids d'origine (25/30/20/15/10)           | Poids: [25.0% / 30.0% / 20.0% / 15.0% / 10.0%]
     Classement : A(9.44) > C(8.28) > B(8.23) > D(7.64) > E(7.45) > F(6.75) | Marge 1er-2e : +1.155
[S2] Poids égaux (20/20/20/20/20)               | Poids: [20.0% / 20.0% / 20.0% / 20.0% / 20.0%]
     Classement : A(9.46) > B(8.46) > C(8.12) > D(7.64) > E(7.50) > F(6.70) | Marge 1er-2e : +1.000
[S3] Urgence 2027 (C3=35%, renorm.)             | Poids: [20.3% / 24.4% / 35.0% / 12.2% / 8.1%]
     Classement : A(9.32) > B(8.47) > C(8.12) > D(7.70) > E(7.37) > F(6.80) | Marge 1er-2e : +0.848
[S4] Non-redondance (C1=40%, renorm.)           | Poids: [40.0% / 24.0% / 16.0% / 12.0% / 8.0%]
     Classement : A(9.45) > C(8.46) > B(8.28) > D(7.71) > E(7.26) > F(7.10) | Marge 1er-2e : +0.984
[S5] Faisabilité minimale (C2=15%, renorm.)     | Poids: [30.4% / 15.0% / 24.3% / 18.2% / 12.1%]
     Classement : A(9.42) > B(8.54) > C(8.23) > D(7.73) > E(7.33) > F(7.02) | Marge 1er-2e : +0.885
[S6] Sans C4 (C4=0%, renorm.)                   | Poids: [29.4% / 35.3% / 23.5% / 0.0% / 11.8%]
     Classement : A(9.34) > C(8.33) > B(8.22) > D(7.66) > E(7.26) > F(6.79) | Marge 1er-2e : +1.006
[S7] Anti-biais code (C2=15%, C4=0%, C3=35%)    | Poids: [35.7% / 15.0% / 35.0% / 0.0% / 14.3%]
     Classement : A(9.26) > B(8.70) > C(8.22) > D(7.81) > F(7.17) > E(7.04) | Marge 1er-2e : +0.560
[S8] Noyau non technique (C2=0%, C4=0%)         | Poids: [45.5% / 0.0% / 36.4% / 0.0% / 18.2%]
     Classement : A(9.25) > B(8.99) > C(8.24) > D(7.91) > F(7.50) > E(6.86) | Marge 1er-2e : +0.255
[S9] Stress-test C3=71% (bascule B > A)         | Poids: [9.1% / 10.9% / 71.0% / 5.4% / 3.6%]
     Classement : B(9.04) > A(9.03) > D(7.87) > C(7.72) > E(7.16) > F(6.91) | Marge 1er-2e : +0.009
[S3-int] Variante entière Urgence 2027 [20/25/35/10/10] => A(9.31) > B(8.48) > C(8.11) > D(7.70) > E(7.35) > F(6.78)

==============================================================================
3. ANALYSE DE SEUIL : PERTE DE LA 1re PLACE PAR A (ET BASCULE 2e/3e)
==============================================================================
A. Seuils sur les NOTES (poids d'origine 25/30/20/15/10 % constants) :
  - Baisse requise de la note C2(A) seule pour égaler C (8,280) : -3.850 pt (de 9,50 à 5.650/10)
  - Baisse requise de la note C2(A) seule pour égaler B (8,230) : -4.017 pt (de 9,50 à 5.483/10)
  - Hausse requise de la note C3(B) seule pour égaler A : +6.025 pt (exigerait 15.525/10 > plafond 10 ; à 10,0/10, B plafonne à 8.330)
  - Hausse requise de la note C3(C) seule pour égaler A : +5.775 pt (exigerait 13.175/10 > plafond 10 ; à 10,0/10, C plafonne à 8.800)
  - Baisse uniforme simultanée de C2(A) et C4(A) (45 % du poids) pour égaler C : -2.567 pt chacun (C2 -> 6.93, C4 -> 7.43)
  - Seuil 2e vs 3e : C perd la 2e place si C2(C) baisse de -0.167 pt OU si C3(B) monte de +0.250 pt.

B. Seuils sur les POIDS (notes d'origine constantes, renormalisation proportionnelle) :
  - Baisse du poids w_C2 seul (0 % à 100 %) : A vs B -> None, A vs C -> None (aucune baisse de w_C2 ne déloge A ; à w_C2=0%, A=9,407 > B=8,843)
  - Hausse du poids w_C3 seul pour que B égale A : w_C3 = 70.60% (+50.60 pp vs 20,00%) ; A vs C -> None
  - Bascule 2e/3e (B dépasse C) : dès w_C3 > 21.86% (+1.86 pp) OU w_C2 < 27.88% (-2.12 pp)

==============================================================================
4. CORRÉLATIONS INTER-CRITÈRES ET STRUCTURE DE DOMINANCE (n = 6)
==============================================================================
Statistiques descriptives et contribution à la variance du score :
  C1 (w=25%) : min=6.5, max=9.5, moy=8.37, std=1.06, w*std=0.265, part_var= 17.2%
  C2 (w=30%) : min=5.5, max=9.5, moy=7.58, std=1.40, w*std=0.420, part_var= 38.3%
  C3 (w=20%) : min=7.0, max=9.5, moy=7.95, std=1.02, w*std=0.205, part_var= 14.9%
  C4 (w=15%) : min=6.5, max=10.0, moy=8.13, std=1.16, w*std=0.174, part_var= 17.0%
  C5 (w=10%) : min=6.0, max=9.5, moy=7.87, std=1.29, w*std=0.129, part_var= 12.5%

Corrélations (Pearson r, R², t(df=4), p-value bilatérale, Spearman rho) :
  C2-C4 : r = +0.8774, R² = 76.99%, t = +3.658, p = 0.0216, rho = +0.7143 <-- PLUS FORTE CORRÉLATION
  C3-C5 : r = +0.8721, R² = 76.05%, t = +3.564, p = 0.0235, rho = +0.8317
  C4-C5 : r = +0.8633, R² = 74.53%, t = +3.421, p = 0.0268, rho = +0.8197
  C2-C5 : r = +0.6230, R² = 38.81%, t = +1.593, p = 0.1864, rho = +0.5768
  C3-C4 : r = +0.5205, R² = 27.09%, t = +1.219, p = 0.2898, rho = +0.3769
  C1-C3 : r = +0.4309, R² = 18.57%, t = +0.955, p = 0.3937, rho = +0.4265
  C1-C5 : r = +0.3347, R² = 11.20%, t = +0.710, p = 0.5167, rho = +0.4620
  C1-C2 : r = +0.2581, R² =  6.66%, t = +0.534, p = 0.6214, rho = +0.4638
  C1-C4 : r = +0.2203, R² =  4.85%, t = +0.452, p = 0.6749, rho = +0.2319
  C2-C3 : r = +0.2061, R² =  4.25%, t = +0.421, p = 0.6953, rho = +0.1739

Dominance de Pareto de A sur les autres candidats :
  A vs C [C1:+0.3, C2:+1.0, C3:+1.4, C4:+2.0, C5:+2.0] => PARETO-DOMINÉ par A
  A vs B [C1:+1.0, C2:+2.7, C3:-0.7, C4:+1.7, C5:+0.3] => non dominé (bat A sur C3)
  A vs D [C1:+1.5, C2:+2.3, C3:+0.8, C4:+2.5, C5:+2.0] => PARETO-DOMINÉ par A
  A vs E [C1:+3.0, C2:+1.5, C3:+1.8, C4:+1.5, C5:+2.0] => PARETO-DOMINÉ par A
  A vs F [C1:+1.0, C2:+4.0, C3:+1.8, C4:+3.5, C5:+3.5] => PARETO-DOMINÉ par A
```

---

## 3. Évaluation des quatre biais structurels

### 3.1 Même essaim auteur et juge (cumul des rôles de conception et de notation)
- **Vérifié dans le corpus :** [`4 - Plan Directeur.md`](../4%20-%20Plan%20Directeur.md) (`L33-L38`), [`5 - Memoire.md`](../5%20-%20Memoire.md) (`L1470`, `L1491`) et [`7 - Livre.md`](../7%20-%20Livre.md) (`L2001`, `L2017`) imposent tous une séparation stricte entre l'agent producteur/bâtisseur et l'agent oracle/auditeur (« aucun agent ne valide seul ses propres livrables »). Or, dans [`RECOMMANDATION-PROCHAIN-LIVRABLE.md`](../RECOMMANDATION-PROCHAIN-LIVRABLE.md) (`L7`, `L78-L170`), un agent unique (`@synthese`) a simultanément regroupé les 21 propositions des fiches en 6 candidats, arrêté la notation `C1–C5` et rédigé le cahier des charges complet du lauréat `A`. L'audit final ([`audit-livrable-final.md`](../analyse-essaim/audit-livrable-final.md) `L69`, `L76-L81`) a vérifié l'arithmétique et la conformité éditoriale, sans contre-notation indépendante des critères `C1–C5`. De plus, les 7 fiches amont émanent elles-mêmes d'agents logiciels qui ont tous (`7/7`) inclus au moins une trousse ou un harnais de code exécutable dans leurs propositions — dont `5/7` en Proposition 1 ([`fiche-1`](../analyse-essaim/fiche-1-compendium-2026.md) `L133`, [`fiche-2`](../analyse-essaim/fiche-2-cadre-reference.md) `L129`, [`fiche-3`](../analyse-essaim/fiche-3-compendium-2027.md) `L111`, [`fiche-6`](../analyse-essaim/fiche-6-livre-blanc.md) `L108`, [`fiche-7`](../analyse-essaim/fiche-7-livre-2027.md) `L97`).
- **Supposé :** que ce cumul auteur/juge ait engendré un biais de complaisance (*builder bias*) menant à attribuer à `A` la note parfaite `10,0/10` en `C4` et `9,5/10` sur `C1`, `C2`, `C5` avant toute réalisation ni exécution.

### 3.2 Bloc `C2 + C4 = 45 %` favorisant structurellement un livrable de code
- **Vérifié dans le corpus (`RECOMMANDATION-PROCHAIN-LIVRABLE.md L80-L82`) et par exécution (`sensibilite.py`) :** `C2` (`30 %`) récompense l'absence de `statut F` (`HTTP 403`/paywall) et de terrain humain, tandis que `C4` (`15 %`) récompense les « scripts exécutés ou preuves formelles ». Bien que leur poids nominal soit `45 %`, la décomposition exacte de la variance montre que **`C2 + C4` déterminent `55,3 %` de la variance réelle des scores finaux** (`38,3 %` pour `C2` avec `std = 1,40` + `17,0 %` pour `C4` avec `std = 1,16`), contre seulement `14,9 %` pour `C3` (urgence 2027) et `17,2 %` pour `C1` (non-redondance).
- **Asymétrie de pénalisation vérifiée :** en `C2`, les candidats réglementaires/audit (`B = 6,8`, `D = 7,2`, `F = 5,5`) sont lourdement pénalisés pour l'existence de sources `statut F` (`AMF HTTP 403`, `LégisQuébec HTTP 403`, `ISO/IEC 42001`), alors même que `5 - Memoire.md` (`L21`, `L33`) et `7 - Livre.md` (`L2030-L2104`) démontrent qu'un socle ouvert `L+` existe déjà (`BSIF E-23`, `B-10`, `Loi 25`, `Note AMF IA`, `EU AI Act`, `DORA`). Inversement, `A` reçoit `9,5/10` en `C2` et `10,0/10` en `C4` bien que `RECOMMANDATION-PROCHAIN-LIVRABLE.md` reconnaisse que les dépôts compagnons `Borealis-Bench/` sont absents localement (`L69`) et que plusieurs spécifications visées par `A` (`OTel GenAI`, `MCP SEP-3398`, `WIMSE`, `a2a-tck alpha`) sont instables en brouillon ou `Development` (`L167`).
- **Supposé :** si `A` avait été pénalisé en `C2`/`C4` pour l'ampleur de son implémentation multi-langages (`12` répertoires/modules nommés de `harness-core/` à `evalops-ci/`, Python/Rust/Go/Rego/Cedar à `L122-L129`) et la volatilité `< 30 j` de ces brouillons, et `B`/`C` notés sur leur périmètre `L+` fermé réel (`5 - Memoire.md L33`, `4 - Plan Directeur.md L5180-L5247`), l'avance de `A` se réduirait sensiblement.

### 3.3 Corrélation élevée `C2` / `C4` (double comptage partiel)
- **Vérifié par exécution (`sensibilite.py`) :** sur les 10 paires de critères (`n = 6`), **`C2` et `C4` affichent la plus forte corrélation linéaire de toute la matrice** :
  - `Pearson r(C2, C4) = +0,8774` ($R^2 = 76{,}99\,\%$, $t = +3,658$, $p = 0,0216 < 0,05$), `Spearman rho = +0,7143`.
  - Deux autres paires sont fortement corrélées (`C3–C5` : `r = +0,8721`, `p = 0,0235` ; `C4–C5` : `r = +0,8633`, `p = 0,0268`), tandis que `C1` reste presque orthogonal (`r <= 0,43`).
- **Diagnostic méthodologique :** en analyse multicritère (`MCDA`), deux critères devraient mesurer des dimensions conceptuellement indépendantes. Ici, `C2` (faisabilité 100 % agentique sur sources ouvertes sans terrain humain) et `C4` (vérifiabilité mécanique par code/JSON/tests) captent tous deux la **fermeture déterministe testable par machine**. Un livrable purement logiciel sur dépôts Git ouverts profite deux fois de la même propriété, alors que l'échantillon limité (`n = 6`) rend l'estimation de `r` sensible à chaque candidat (notamment aux extrêmes `A` et `F`).

### 3.4 Notes à une décimale sans grille de notation explicite (fausse précision)
- **Vérifié dans le corpus (`RECOMMANDATION-PROCHAIN-LIVRABLE.md L78-L92`) :** aucune grille d'ancrage (`rubric`) ne définit ce que valent `0`, `5` ou `10` sur `C1`–`C5`, ni ce qui sépare `9,2` de `9,5`, `7,4` de `8,0` ou `6,8` de `7,2`.
- **Effet direct sur le classement :** attribuer 30 notes au dixième près sans grille produit une **fausse précision** (résultats affichés à deux décimales). Concrètement, la séparation entre **`C` (`8,28`, 2e)** et **`B` (`8,23`, 3e)** repose sur `0,050` pt — un écart inférieur à l'incertitude minimale d'une notation subjective sans grille (une simple variation de `0,2` pt sur `C2(C)` ou `0,25` pt sur `C3(B)` inverse les rangs 2 et 3). De même, la note `C3 = 7,4` attribuée à `C` (pourtant confronté aux échéances d'`AMOPS` au `1er avril 2027` dans `4 - Plan Directeur.md L5199`, du Guide `MCN` de sept. 2026 à `L5189` et des orientations `AI Act` au `2 septembre 2027` à `L5205`) n'est justifiée par aucun barème temporel chiffré.

---

## 4. Grille de notation explicite proposée (ancrages `0 / 5 / 10`)

Pour corriger la fausse précision au dixième et le cumul de rôles lors d'un prochain arbitrage, les notes doivent être restreintes à des **demi-points (`0,5`) ou entiers (`1,0`)**, attribuées par au moins deux évaluateurs indépendants de l'auteur des cahiers des charges, selon les ancrages normatifs suivants (avec fusion ou dé-corrélation de `C2` et `C4` recommandée) :

| Critère | Ancrage **`0 / 10`** (Éliminatoire) | Ancrage **`5 / 10`** (Admissible sous réserves) | Ancrage **`10 / 10`** (Optimal vérifié) |
| --- | --- | --- | --- |
| **`C1` Non-redondance & comblement d'angle mort** | Réécrit un sujet déjà traité à saturation dans les Vols 1–7 sans apport neuf mesurable. | Comble un manque partiel ou consolide des éléments dispersés (`Vols 1–7`) avec peu de matière neuve. | Comble un angle mort explicitement déclaré dans le corpus (sans équivalent local) et résorbe une dette structurante multi-volumes. |
| **`C2` Faisabilité 100 % agentique (`L+` sans contournement)** | Exige des sources bloquées `statut F` (paywall/`HTTP 403`) comme fondement central ou un terrain humain réel. | Majorité des sources en `L+` ouvert, mais dépend de spécifications instables (`Development`/`alpha` `< 30 j`) ou exige un bornage strict contre le `statut F` / non-avis. | `100 %` des sources primaires déjà vérifiées en `L+` stables (`SHA-256`), zéro dépendance `statut F`, zéro terrain humain, périmètre réalisable en une itération d'essaim bornée. |
| **`C3` Valeur d'impact & urgence `2027`** | Aucune échéance datée en `2027` ni besoin opérationnel immédiat identifié. | Répond à une échéance `2027` indirecte ou à un horizon `2028+`, avec utilité modérée au T1–T4 `2027`. | Outillage immédiatement actionnable pour au moins deux échéances légales/techniques impératives de `2027` (`TLS` mars, `AMOPS` avr., `E-23`/`AMF` mai, `MCP` juill., `RIA` déc.) sur un goulot documenté. |
| **`C4` Vérifiabilité mécanique de bout en bout** | Prose pure sans registre structuré, ni schéma, ni test déterministe reproductible. | Registres JSON `SSOT`, liens et cohérence mécanique vérifiables (`G1`, `CA-16`), sans exécution logicielle complète de contrats métier. | Double preuve mécanique : garde documentaire complète (`G1–G5` + `CA-16` disjointe) **et** banc de tests/validateurs déterministes exécutables à `exit 0` sur des specs figées. |
| **`C5` Effet de levier sur les actifs existants** | Produit autonome isolé, sans raccordement aux `305 EXIG-*`, `52 CAP`, `75 PRR`, `67 ANC-*` ou `75 L+`. | Réutilise une fraction ciblée d'un seul volume (p. ex. `25` ancres `PD28` ou `10` clauses `EXIG-APP`) sans pont transversal. | Active et relie mécaniquement au moins quatre familles d'actifs du corpus (`EXIG-*`, `CAP-*`, `PRR-75`, `ANC-*`, `C01–C40`, `L+`) sans redondance. |

*(Échelons intermédiaires : `2,5` = présence partielle ou lacunaire ; `7,5` = critère largement satisfait avec une réserve bornée et documentée.)*

---

## 5. Verdict final sur la robustesse du classement

**Verdict : `fragile`.**

1. **Pourquoi le verdict n'est pas `renversé` :** sur les notes publiées dans [`RECOMMANDATION-PROCHAIN-LIVRABLE.md`](../RECOMMANDATION-PROCHAIN-LIVRABLE.md) (`L87-L92`), **`A` demeure 1er dans les `6` jeux de poids de référence (`S1`–`S6`)** et jusque dans les stress-tests `S7`–`S8` (`C2=0%, C4=0%`), car il domine `C, D, E, F` au sens de Pareto et ne cède à `B` que sur `C3`. Il faudrait que `w_C3` dépasse `70,60 %` (`+50,60` pp) ou que `C2(A)` baisse de `-3,85` pts pour déloger `A`.
2. **Pourquoi le verdict n'est pas `robuste` (justification de `fragile`) :**
   - **Inversion immédiate au rang 2–3 :** `B` passe devant `C` dans **`3/6` scénarios de référence (`S2` poids égaux, `S3` urgence 2027, `S5` faisabilité minimale)** dès `+1,86` pp sur `w_C3` ou `-2,12` pp sur `w_C2`, en raison d'un écart initial insignifiant (`0,050` pt).
   - **Fragilité méthodologique de l'avance de `A` :** `55,3 %` de la variance des scores repose sur le duo corrélé `C2 + C4` (`r = +0,8774`, $p = 0,0216$), et les notes plafonds de `A` (`9,5–10,0`) proviennent d'une auto-notation sans grille `0/5/10` qui pénalise les candidats réglementaires pour `statut F` sans pénaliser `A` pour l'instabilité de ses spécifications brouillon (`L167`) ni l'ampleur de ses `12` modules multi-langages (`L122-L129`).
3. **Condition de validation :** le choix de `A` comme lauréat reste défendable à condition de le soumettre à une **contre-notation indépendante sous la grille `0/5/10`** (Section 4) et de réduire le périmètre d'exécution de `A` aux composants ancrés sur des spécifications figées (voir l'audit de `@critique-a`).
