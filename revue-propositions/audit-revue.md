# Audit indépendant — Revue des propositions (`Phase 1`)

*Vérificateur : `@verif-revue` · Dépôt : `C:\Github\Prospection\Prospection` (`main`) · Date : `2026-11-22`*

## Verdict global et état des fichiers

**Feu vert (`4 / 4` fichiers validés)** après corrections effectuées exclusivement par leurs auteurs respectifs (`#44`, `#47`, `#48`). Aucun fichier tiers ni aucun document source (`RECOMMANDATION-PROCHAIN-LIVRABLE.md`, `analyse-essaim\*`, `README.md`, `1–7`, `C:\Github\Agentique`) n'a été modifié par `@verif-revue`.

| Fichier | Auteur | `#seq` suivi | Verdict de l'auteur | Contrôles effectués | Verdict `@verif-revue` |
| --- | --- | --- | --- | --- | --- |
| `commentaire-candidat-A.md` (`160` L) | `@critique-a` | `#42` → `#45` → **`#48`** | `Validée avec réserves` (`9,44 → 8,27`) | `22` contrôles du tableau + `Select-String` + recompte `outils` (`13` fichiers) + recalculs pondérés | **`VALIDÉ`** |
| `commentaire-candidats-B-C-D.md` (`165` L) | `@critique-bcd` | `#41` → `#46` → **`#47`** | `B` `À reformuler` (`8,46`), `C` `Validée avec réserves` (`8,37`), `D` `À reformuler` (`7,83`) | `25+` contrôles corpus + `Select-String` (`Vol. 6`, `B-10`, `PD28`) + `3` recalculs pondérés | **`VALIDÉ`** |
| `commentaire-candidats-E-F-et-couverture.md` (`142` L) | `@critique-ef` | `#39` → `#43` → **`#44`** | `E` `À reformuler` (`6,86`/`7,79`), `F` `Validée avec réserves` (`7,10`), `G [Supposé]` (`7,79`) | `14+` contrôles corpus (`C26..Vol.7`, `fiche-1..7`, `Agentique`) + `search_web` (`FHIR CC0`) + `5` recalculs | **`VALIDÉ`** |
| `sensibilite-matrice.md` (`207` L) + `sensibilite.py` (`367` L) | `@methodo` | **`#40`** | Matrice `fragile` (rangs `2–6`) ; `A` robuste sous poids courants | Exécution `sensibilite.py` (`exit 0`) + script indépendant `Decimal`/Student-t + `12` contrôles corpus | **`VALIDÉ`** |

> **Conformité épistémique :** Dans les 4 dossiers finaux, les citations de lignes/dépôts `[vérifié dans le corpus]`, vérifications externes `[vérifié web]`, sorties de scripts `[vérifié par exécution]` et réévaluations/estimations `[supposé]` sont explicitement distinguées. Aucune estimation `[supposé]` n'est présentée comme un fait vérifié.

---

## 1. Contrôle de `commentaire-candidat-A.md` (`#48`)

### Corrections exigées en `#45` et vérifiées en `#48`

1. **`NIST IR 8547` (`L58`) :** corrigé avec exactitude — `Final (27 oct. 2026)` dans `1 - Compendium 2026.md L12917`, `2 - Cadre de Référence.md L4706, L4714, L8777` et `3 - Compendium 2027.md L26694, L27067`, contre `IPD (nov. 2024)` résiduel dans `4 - Plan Directeur.md L1120, L5858`.
2. **Décomptes sur disque de `C:\Github\Agentique\7 - Livre 2027\outils` (`L79, L106, L110–L118, L138, L148`) :** rétablis aux valeurs mesurées (`13` fichiers, `6 588` L = `5 297` L outils + `1 291` L `pytest`, dont `collecte_mlr_ouverte.py` `911`, `compile_figures.py` `650`, `echantillon_aq.py` `421`, `genere_annexes.py` `632`). Contrôle `Select-String` sur `revue-propositions\*.md` : `0` occurrence résiduelle des anciens chiffres (`6 529 / 5 238 / 870 / 629 / 426 / 630`).

### Échantillon de contrôles sur pièce (`10+`)

| # | Affirmation contrôlée | Pièce vérifiée | Statut |
| :---: | --- | --- | --- |
| 1 | Recalcul pondéré initial (`9,44`) et révisé (`8,27`) de A | `9,5×0,25 + 9,5×0,30 + 8,8×0,20 + 10,0×0,15 + 9,5×0,10 = 9,435 → 9,44` ; `9,0×0,25 + 7,5×0,30 + 8,2×0,20 + 8,5×0,15 + 8,5×0,10 = 8,265 → 8,27` | `[Vérifié par calcul]` |
| 2 | Identifiants prospectifs ou chaînes GitHub absents du corpus (`L66–L70`) | `Select-String` : `CycloneDX/specification`, `spdx/spdx-3-model`, `NVD API 2.0`, `EUR-Lex Cellar`, `OTel v1.44+`, `PRR-75`, `PRR-24-BLOQUANT` = `0` occ. verbatim ; `saga-compensator` = `1` occ. (`5 - Memoire.md L842`) | `[Vérifié dans le corpus]` |
| 3 | Protocoles & RFC présents (`L54–L57`, `L59`) | `RFC 9943/9964/10024/10073`, `arXiv` (`2503.18813`, `2610.05640`, `2609.14119`, `2503.13657`, `2606.02646`, `2503.11951`), `10.1145/3143561` (`1 - Compendium 2026.md L10854`), `OpenSandbox` (`3 - Compendium 2027.md L2317`), `A2A 1.0.1` (`L28102`) | `[Vérifié dans le corpus]` |
| 4 | Scission `OTel v1.41.0` / `v1.44.0` (`L56, L69`) | `2 - Cadre de Référence.md L8675–L8685` confirme le déplacement de `gen_ai.*` vers `semantic-conventions-genai` | `[Vérifié dans le corpus]` |
| 5 | `C.5/C.6` déjà testés en CI JSON/JCS (`L80, L144`) | `2 - Cadre de Référence.md L7000–L7025` (`C.1–C.8`, `idem-v1`, `C.5/C.6` vérifiés en CI) | `[Vérifié dans le corpus]` |
| 6 | Démonstration négative `AIBOM` (`L80, L144`) | `1 - Compendium 2026.md L10760–L10865` (`CycloneDX 1.7 / ECMA-424`, `SPDX 3.0`, `RFC 9334`, 5e pièce absente) | `[Vérifié dans le corpus]` |
| 7 | `verifie_manuscrit.py` (`L115, L147`) | `C:\Github\Agentique\7 - Livre 2027\outils\verifie_manuscrit.py L74` (`_mask_fenced_code_preserving_lines`, `983` L) et `specs\prd.md` (`CA-01..CA-18`) | `[Vérifié dans le corpus]` |
| 8 | Charte éditoriale `6,14 × 9,21 po` et `3 173` pages (`L96`) | `Agentique\7 - Livre 2027\specs\charte-editoriale.md L3, L89` + `outils\gabarit-livre.typ L74–L75` + `README.md L5–L25` | `[Vérifié dans le corpus]` |
| 9 | `EXIG-ORC-20` (`10` cas), `124/134`, `MLR-0129` | `2 - Cadre de Référence.md L3138–L3160` et `3 - Compendium 2027.md L28238–L28285` | `[Vérifié dans le corpus]` |
| 10 | Séparation `supposé` vs `vérifié` (`L79, L145, L149`) | Estimation MVP (`~8,8` `C2`, `~8,85–9,0` total) et multiplicateur `2 à 3` explicitement balisés `[supposé]` ; existence des dépôts/API classée `[vérifié web]` | `[Vérifié sur le texte]` |

---

## 2. Contrôle de `commentaire-candidats-B-C-D.md` (`#47`)

### Corrections exigées en `#46` et vérifiées en `#47`

1. **Source exacte de `AO-05` (`L16, L55`) :** rattachée explicitement à `C:\Github\Agentique\7 - Livre 2027\specs\prd.md L59` en appui de `7 - Livre.md L138` (`0` occ. d'`AO-05` dans `7 - Livre.md`).
2. **Décompte `BSIF B-10` (`L132`) :** distinction exacte entre occurrences et lignes dans les 5 volumes (`0` en `CAD26`, `13` occ./`13` L en `C27`, `89` occ./`85` L en `PD28`, `17` occ./`16` L en `Memoire`, `29` occ./`28` L en `Vol. 7`).

### Échantillon de contrôles sur pièce (`10+`)

| # | Affirmation contrôlée | Pièce vérifiée | Statut |
| :---: | --- | --- | --- |
| 1 | Recalculs pondérés `B`, `C`, `D` (`L16–L18`) | `B = 8,4550 → 8,46` ; `C = 8,3700 → 8,37` ; `D = 7,8300 → 7,83` (écart vs initial `+0,23 / +0,09 / +0,19`) | `[Vérifié par calcul]` |
| 2 | `3e ligne d'audit interne` (`L32`) | `5 - Memoire.md L1478` (`2` L descriptives), `L1487` (`1` rangée tableau), `L1660`, `L2026` ; `4 - Plan Directeur.md L4822` (`POR-005..009, 011..014`) | `[Vérifié dans le corpus]` |
| 3 | Saturation 2e ligne au `1er mai 2027` (`L33`) | `4 - Plan Directeur.md L5093–L5095` (`M-26 § 26.2`) ; `7 - Livre.md L1482, L1551` (`Classe 1`, `CAP-043`) | `[Vérifié dans le corpus]` |
| 4 | Compensation `L+` `Note AMF IA` & `LégisQuébec` (`L35–L36`) | `1 - Compendium 2026.md L12939–L12945` (`49` p., `41` attentes), `4 - Plan Directeur.md L5201` (`ANC-112`), `7 - Livre.md L1373, L2092, L2112, L2124` | `[Vérifié dans le corpus]` |
| 5 | `EN 18286:2026` (`EXIG-CON-30`) déjà en `L+` (`L37`) | `2 - Cadre de Référence.md L6157–L6163` et `5 - Memoire.md L2463` (`REF-25`) | `[Vérifié dans le corpus]` |
| 6 | Angles morts `CAD26 v1.2` (`L38`) & cas témoins (`L39`) | `2 - Cadre de Référence.md L6630–L6923, L8711–L8751` (`Tableaux 58–60, 63`) ; `7 - Livre.md L1500–L1562` | `[Vérifié dans le corpus]` |
| 7 | `25` ancres `administrations` (`PD28`) (`C`) | `4 - Plan Directeur.md L5179–L5247` : `25` occurrences (`2` en `2025–2026`, `4` `[D]` en `2027`, `19` en `2028–2035`) | `[Vérifié dans le corpus]` |
| 8 | Lacunes `C` : `ch. 41` `0` `S-nnn`, `23` `F` Vol. 7, `432` QC, `AMOPS`/`RIA` | `1 - Compendium 2026.md L9565–L9582` ; `7 - Livre.md L2085–L2131` ; `3 - Compendium 2027.md L22100–L22210` ; `2 - Cadre de Référence.md L5810–L5870` | `[Vérifié dans le corpus]` |
| 9 | Candidat D : `EXIG-APP-01..17`, `NHI3`, `POR-016` (`L127–L129`) | `2 - Cadre de Référence.md L6299–L6479, L3896` ; `4 - Plan Directeur.md L4831, L5367` ; `3 - Compendium 2027.md L14075–L14133` | `[Vérifié dans le corpus]` |
| 10 | `Vol. 6` (`0` PQC mais clauses `SaaS` présentes, `L130`) + séparation `[Supposé]` | `Select-String` `6 - Livre Blanc.md` : `0` occ. `PQC/ML-DSA`, mais réversibilité `SaaS` aux `L756–L763, L1713, L3941–L3977, L5010, L5371` ; réévaluations marquées `[Supposé]` | `[Vérifié dans le corpus]` |

---

## 3. Contrôle de `commentaire-candidats-E-F-et-couverture.md` (`#44`)

### Corrections exigées en `#43` et vérifiées en `#44`

1. **Candidat F — score initial (`L20, L56`) :** corrigé de `6,76` à **`6,75`** (conforme à `RECOMMANDATION L92` : `8,0×0,25 + 6,2×0,30 + 6,0×0,20 + 6,6×0,15 + 7,0×0,10 = 6,75`).
2. **`collecte_mlr_ouverte.py` (`L28, L39, L74`) :** corrigé de `870` à **`911`** lignes (`Agentique\7 - Livre 2027\outils\collecte_mlr_ouverte.py`).
3. **Statut du blocage juridique `E` (`L21`) :** distinction nette entre les exigences légales d'interdiction de décision entièrement automatisée / consentement explicite (`Loi 25` / `RGPD art. 22`, présentées en `L+`) et le blocage opérationnel sur `statut F` (`SNOMED CT` / `LOINC` / `D-16..D-18` / données cliniques réelles).
4. **Détails `50` vs `I.2` & `23` lignes `§ 49.8` (`L58, L60, L68, L78, L134`) :** précisions alignées sur `1 - Compendium 2026.md` (`50/123` enregistrements temporaires et `30 j` à `L11470–L11495` vs `999` dans l'annexe `I.2` à `L11698–L11720`, et `0` occ. d'`I.2` en `L9565–L9582`), et `3 - Compendium 2027.md L26965–L27000` (`23` lignes au `§ 49.8`).

### Échantillon de contrôles sur pièce (`10+`)

| # | Affirmation contrôlée | Pièce vérifiée | Statut |
| :---: | --- | --- | --- |
| 1 | Recalculs pondérés `E` (initial/hybride/observatoire), `F` (initial/révisé), `G` (`L20, L37, L56, L130`) | `E_init = 7,445 → 7,45` ; `E_hyb = 6,855 → 6,86` ; `E_obs = 7,79` ; `F_init = 6,75` ; `F_rev = 7,10` ; `G = 7,785 → 7,79` | `[Vérifié par calcul]` |
| 2 | `HL7 FHIR` sous licence ouverte `CC0 1.0` | Spécification officielle `HL7 FHIR` publiée dans le domaine public sous `CC0 1.0` | `[Vérifié web]` |
| 3 | Présence `HL7 FHIR` et `MDR 2017/745` dans le corpus | `1 - Compendium 2026.md L10545–L10560, L12500–L12515` ; `3 - Compendium 2027.md L2424–L2440, L6448–L6460, L10678–L10695` | `[Vérifié dans le corpus]` |
| 4 | Protocole MLR `2027` (`7` API, `RQ1–RQ6`) & `collecte_mlr_ouverte.py` (`911` L) | `Agentique\7 - Livre 2027\specs\protocole-mlr-2027.json L1–L156` et `outils\collecte_mlr_ouverte.py` (`911` L) | `[Vérifié dans le corpus]` |
| 5 | Limite des `102` extraits `Vol. 3`, `H1–H6`, `10 QO`, `23` lignes `§ 49.8` | `3 - Compendium 2027.md L26390–L26505, L26965–L27000` et `fiche-3-compendium-2027.md` | `[Vérifié dans le corpus]` |
| 6 | Lacunes `1 - Compendium 2026.md` (`F-92/52/97/98/96`, `50/123` temp., `999` vs `0`) | `1 - Compendium 2026.md L9210–L9260, L10955–L10975, L11470–L11495, L11698–L11720` | `[Vérifié dans le corpus]` |
| 7 | `27` signaux `SIG-*` et grilles d'auto-évaluation (`PD28`) | `4 - Plan Directeur.md L5570–L5605` | `[Vérifié dans le corpus]` |
| 8 | Tableau complet des `21` propositions (`F1-P1` à `F7-P3`, `L90–L112`) | `analyse-essaim\fiche-1-compendium-2026.md` … `fiche-7-livre-2027.md` (Section 5 de chaque fiche) | `[Vérifié dans le corpus]` |
| 9 | `5` publics orphelins de `fiche-7` (donneurs d'ordres, citoyens/PME, juniors `-20 %`, etc.) | `analyse-essaim\fiche-7-livre-2027.md L74–L79` et `7 - Livre.md L1490–L1566` (`Loi 25 art. 12.1`, juniors `-20 %`) | `[Vérifié dans le corpus]` |
| 10 | Séparation `supposé` vs `vérifié` | Candidat G (`7,79`), scores révisés `E`/`F` et seuils d'arbitrage explicitement balisés `[Supposé]` | `[Vérifié sur le texte]` |

---

## 4. Contrôle de `sensibilite-matrice.md` + `sensibilite.py` (`#40`)

*Note mineure non bloquante signalée pour mémoire :* dans `sensibilite.py L5`, la docstring indique « `huit jeux` », alors que `build_scenarios()` (`L245`) et `sensibilite-matrice.md L35` exécutent bien `9` jeux (`S1`–`S9`) plus l'interpolation `S3-int`. `sensibilite-matrice.md` ne comporte aucune erreur.

### Échantillon de contrôles (`10+`, incluant réexécution et recalcul indépendant)

| # | Élément contrôlé | Résultat vérifié | Statut |
| :---: | --- | --- | --- |
| 1 | Réexécution complète de `sensibilite.py` | `python sensibilite.py` → `exit code 0` ; sortie `stdout` identique caractère pour caractère à `sensibilite-matrice.md L74–L156` | `[Vérifié par exécution]` |
| 2 | Recalcul indépendant `Decimal` des `6` scores initiaux et `10` scénarios (`S1–S9`, `S3-int`) | `A=9,44 (9,435)`, `C=8,28`, `B=8,23`, `D=7,64 (7,635)`, `E=7,45`, `F=6,75` ; inversions `B > C` dès `S2` (`w_C3=30%`), `B=8,47 > C=8,08` sous `S5` | `[Vérifié par exécution]` |
| 3 | Corrélation et `p`-value exacte `(C2, C4)` | `r(C2, C4) = +0,87743`, `t` de Student (`df = 4`) → `p_exact = 0,021614` (`< 0,05`) | `[Vérifié par exécution]` |
| 4 | Décomposition de variance de l'écart pondéré par critère | `C1 17,2 %`, `C2 38,3 %`, `C3 14,9 %`, `C4 17,0 %`, `C5 12,5 %` (`C2+C4 = 55,3 %`) | `[Vérifié par exécution]` |
| 5 | Seuil analytique d'inversion `B = A` sur `w_C3` | `w_C3 = 70,60 %` (écart brut `B - A = +0,7` en `C3`) | `[Vérifié par exécution]` |
| 6 | Matrice, échelle et spécifications de `RECOMMANDATION` | `RECOMMANDATION-PROCHAIN-LIVRABLE.md L76–L101, L122–L129, L167` | `[Vérifié dans le corpus]` |
| 7 | Biais corrélé de mesure `audit-livrable-final.md` | `analyse-essaim\audit-livrable-final.md L69, L76–L81` (auto-attribution et lecture partielle) | `[Vérifié dans le corpus]` |
| 8 | Ancres `4 - Plan Directeur.md` (`0` relecture humaine, `25` `administrations`) | `4 - Plan Directeur.md L33–L38, L5180–L5247` (`ANC-003 L5196`, `ANC-023 L5197`, `L5189, L5199, L5205`) | `[Vérifié dans le corpus]` |
| 9 | Ancres `5 - Memoire.md` (`FEDS`, `statut F`, `Oracle/Bâtisseur`) | `5 - Memoire.md L21, L33, L1470, L1491` | `[Vérifié dans le corpus]` |
| 10 | Ancres `7 - Livre.md` et couverture `fiche-1..7` | `7 - Livre.md L2001, L2017, L2030–L2104` ; `fiche-1..7` (`L97, L108, L111, L129, L133`) ; critique `0/5/10` et fragilité nettement séparées des sorties calculées | `[Vérifié dans le corpus]` |

---

## 5. Contrôle final — `REVUE-PROPOSITIONS.md` (`Phase 2`)

**Verdict final : `Contrôle final réussi`** (`#50` → corrections `#51` → recontrôle validé sur la version `#52`, `85` lignes ≤ `250`).

### Intégrité du dépôt (`git`) et respect des bornes éditoriales

- **`git -C C:\Github\Prospection\Prospection diff --name-only` :** sortie **vide (`0` fichier suivi modifié)** `[Vérifié par exécution]`.
- **`git -C C:\Github\Prospection\Prospection status --porcelain` :** uniquement `?? REVUE-PROPOSITIONS.md` et `?? revue-propositions/` — aucune modification de `RECOMMANDATION-PROCHAIN-LIVRABLE.md`, `analyse-essaim\*`, `README.md` ni des sept volumes `1 - Compendium 2026.md` … `7 - Livre.md`.
- **Structure & langue :** `85` lignes (plafond `250`), `6` sections conformes (`§ 1` en `3` phrases, `§ 2` tableau `A–F`, `§ 3` robustesse, `§ 4` `21` propositions + `G`, `§ 5` amendements `P0–P2` + outillage `Agentique`, `§ 6` `5` questions fermées), rédigé en français canadien avec séparation explicite `[Vérifié dans le corpus]`, `[Vérifié par exécution]`, `[Vérifié web]` et `[Supposé]`.

### Corrections exigées en `#51` et vérifiées appliquées en `#52`

1. **`L72` (`EXIG-EVA-03`) :** inversion mathématique « `taux d'échec ≥ 3/p` » corrigée en `≥ 3/p essais indépendants sans échec pour un taux d'échec maximal p (EXIG-EVA-03)` (conforme à `2 - Cadre de Référence.md L5041` et `commentaire-candidat-A.md L33, L157`).
2. **`L24` (Candidat F, `Amendement clé`) :** formulation ambiguë « `aligner C2/C4 (6,5/7,5) sur C` » clarifiée en `réviser F à C2=6,5 / C4=7,5 / C3=6,5 (cohérence de chaîne avec C)` (`commentaire-candidats-E-F-et-couverture.md L79`).
3. **`L23` (`C27 L26446`) :** plage corrigée en `C27 L26447-L26480` pour les compteurs `3/9 API statut F` et `230/453 METADATA_ONLY`.
4. **`L49` (`IT-OT`) :** attribution exacte dissociée entre `ADR-017` (`IEC 62443` / `OPC UA` `C27 ch. 28`, `PD28 L5551`) et `ADR-028` (`Simplex` `C27 ch. 46`, `PD28 L5562`), tous deux rattachés à `PD28 CAP-028`.

### Contrôles de cohérence et sur pièces (`18` vérifications)

| # | Zone de `REVUE-PROPOSITIONS.md` | Élément vérifié contre les 4 dossiers validés & le corpus | Statut |
| :---: | --- | --- | --- |
| 1 | En-tête (`L3–L5`) | `3 173` pages (`README.md`/`0 - PDF-MD\README.md L5`), `66 466` L (`7` vol.) + `25` L `README.md` = `66 491` L vérifiées sur disque ; `#seq 40, 44, 47, 48, 49` exacts | `[Vérifié dans le corpus]` + `[Vérifié par exécution]` |
| 2 | Verdict global § 1 (`L11`, 3 phrases) | `A > C > B > D > E > F`, `C - B = 0,050`, bascule `B > C` (`S2, S3, S5`, `8,46 > 8,37`), `A` `9,44 → 8,27` (`MVP ~8,85–9,0`), `0` `Borealis-Bench/`, `Vol. 6 L1041`, `Vol. 2 L1360`, `Vol. 3 L28458`, `10` écarts/réserves exacts | `[Vérifié dans le corpus]` |
| 3 | Ligne **A** § 2 (`L19`) | `Validée avec réserves`, `9,44 → 8,27`, `10/22` écarts (`commentaire-candidat-A.md L14–L38`), `4` modules Python + `1` moteur `OPA`/`Cedar` + `4` ch., `≤ 40` L/extrait, `execute_g0.py` | Cohérent (`#48`) |
| 4 | Ligne **B** § 2 (`L20`) | `À reformuler`, `8,23 → 8,46 (3e → 2e)`, `C3 = 9,5`, `PD28 L5093`, `Memoire L1487`, `7 - Livre.md L138` / `AO-05` (`prd.md L59`), `ISO 42001` (`38` mesures, `statut F`), `EN 18286:2026`, `C2 : 6,8 → 7,8` | Cohérent (`#47`) |
| 5 | Ligne **C** § 2 (`L21`) | `Validée avec réserves`, `8,28 → 8,37 (2e → 3e)`, `EF-06` (`25` ancres `PD28 L5179–L5247`), `C3 : 7,4 → 8,1` (`AMOPS 1er avr.`, `RIA 2 août`, `432` QC `C27 L22105`), `C1 : 9,2 → 8,6`, `L60` vs `ANC-005`, **Vol. 9** | Cohérent (`#47`) |
| 6 | Ligne **D** § 2 (`L22`) | `À reformuler`, `7,64 → 7,83 (4e)`, `Data Act 12 janv.`, `TLS 100 j`, `NHI3` (`CAD26 L3896`), `POR-016` (`PD28 L4831`), `BSIF B-10` absent `CAD26`, `Vol. 6 L763, L3941–L3977`, `C27 L14133`, `tprm-exit-kit/` | Cohérent (`#47`) |
| 7 | Ligne **E** § 2 (`L23`) | `À reformuler`, `7,45 → 6,86 (hyb.) / 7,79 (obs.)`, `27 SIG-*`, `23` L `C27 § 49.8`, `10 QO`, `H1–H6`, `collecte_mlr_ouverte.py` (`911` L), `C26 L12859`, `§ 17.5 L4248`, `3/9 API` & `230/453` (`C27 L26447–L26480`) | Cohérent (`#44`) |
| 8 | Ligne **F** § 2 (`L24`) | `Validée avec réserves`, `6,75 → 7,10`, `CA-P17 (PD28 L21)`, `L.Q. 2023 c. 5` / `Loi 25` / `L.C. 2017 ch. 3`, `MLR-0129`, `HL7 FHIR CC0 1.0`, `AI Act Annexe I 2 août 2028`, révision `F` `C2=6,5 / C4=7,5 / C3=6,5` | Cohérent (`#44`) |
| 9 | Matrice § 3 (`L36–L37`) | Sommes exactes (`9,435`, `8,280`, `8,230`, `7,635`), bascules `S2 (8,46>8,12)`, `S3 (8,47>8,12)`, `S5 (8,54>8,23)` et `F > E` (`S7–S8`), `A` 1er en `6/6` scénarios | Cohérent (`#40`) |
| 10 | Seuils & corrélations § 3 (`L38–L39`) | `w_C2=0%` (`9,407 > 8,843`), `w_C3 > 70,60%` (`S9` `71%`), `-3,850`, `-2,567`, `+1,86 pp`/`-2,12 pp`, `-0,167`/`+0,250`, `C2+C4 = 55,3%` variance, `r(C2,C4)=+0,8774` ($R^2=76,99\%$, $p=0,0216$, `Spearman +0,7143`), grille `0/5/10` | Cohérent (`#40`) |
| 11 | Couverture `21` prop. § 4 (`L47`) | Partition `5 + 6 + 5 + 2 + 2 + 1 = 21` conforme au tableau `commentaire-candidats-E-F-et-couverture.md L90–L112` | Cohérent (`#44`) |
| 12 | Pertes & angles morts § 4 (`L49–L52`) | `ADR-017`/`ADR-028` (`CAP-028`), `24 PEX-*`, `§ 17.5`, `κ`, `EXIG-AMF-11`, `TLA+/Alloy`, `5` angles morts transversaux | Cohérent (`#44`) |
| 13 | Candidat **G** § 4 (`L53`) | `C1 9,0 / C2 7,2 / C3 7,8 / C4 6,8 / C5 8,0 = 7,79/10` (`[Supposé]`), 4e public orphelin (`fiche-7 L78`, `7 - Livre.md L1510–L1544`), `RQ6`, `D1–D3`, `DC-P12` | Cohérent (`#44`) |
| 14 | Amendements `P0` MVP § 5 (`L59, L71`) | `4` modules `Python 3.12+` + `1` moteur (`OPA`/`Cedar`) + `4` ch. (`~30 000–40 000` mots, `~120–150` p.), format `6,14×9,21 po` (`≤ 40` L) et dépôt compagnon `8 - Trousse/` `MIT` | Cohérent (`#48`) |
| 15 | Table `outils` `Agentique` § 5 (`L60–L69`) | `13` fichiers, `6 588` L vérifiées sur disque (`190`, `650+203`, `911+209`, `582+369`, `559+122`, `421`, `632`, `983+757`), `_mask_fenced_code_preserving_lines L74`, `CA-G0-SYNC`, `execute_g0.py` | Cohérent (`#48`) |
| 16 | Amendements `P1–P2` § 5 (`L72–L75`) | Vecteurs tiers, 4 glissements `§ 3.2` (dont `≥ 3/p essais indépendants` pour `p` max sous `EXIG-EVA-03`), `AO-05` (`prd.md L59` / `Vol. 7 L138`), options `D`/`B`/`PEX`, gel `MIT` & `SEP-3398` | Cohérent (`#48`) |
| 17 | Décisions § 6 (`L79–L85`) | `5` questions fermées (`≤ 5`), reflétant exactement les arbitrages ouverts par les 4 dossiers | Conforme (`#34`) |
| 18 | Discipline épistémique (`L5`, global) | Aucune estimation `[Supposé]` (`8,27`, `8,46`, `8,37`, `7,83`, `6,86`, `7,79`, `7,10`, `G`) présentée comme fait vérifié | `[Vérifié sur le texte]` |
