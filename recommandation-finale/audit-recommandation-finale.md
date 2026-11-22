# Audit indépendant de la Phase 3 (`verif-final`)

- **Régime et langue :** **Production** · Français canadien (termes techniques et identifiants en anglais).
- **Mandat :** Vérification indépendante à l'aveugle en deux passes de [`recommandation-finale/`](file:///C:/Github/Prospection/Prospection/recommandation-finale/) et de [`RECOMMANDATION-FINALE.md`](file:///C:/Github/Prospection/Prospection/RECOMMANDATION-FINALE.md).
- **Discipline épistémique :** **`[Vérifié dans le corpus : fichier + Lxxx]`**, **`[Vérifié par exécution]`**, **`[Vérifié web]`** et **`[Supposé]`** (aucun `[Supposé]` présenté comme vérifié).

---

## Audit amont — Passe 1 (`6/6` dossiers validés à `0` écart)

- **Statut Passe 1 :** **`VALIDÉ — 0 écart résiduel sur les 6 dossiers`** après un cycle ciblé de corrections factuelles (`#71–#74` → `#75–#78`).
- **Intégrité du dépôt amont (`[Vérifié par exécution]`) :** `git -C C:\Github\Prospection\Prospection diff --name-only` retourne une sortie vide (aucun des fichiers existants — `README.md`, `1 - Compendium 2026.md` à `7 - Livre.md`, `RECOMMANDATION-PROCHAIN-LIVRABLE.md`, `REVUE-PROPOSITIONS.md`, `analyse-essaim\*`, `revue-propositions\*` — n'a été modifié).

### 1. Contrôle sur pièces des trois dossiers de révision (`≥ 10` contrôles par dossier)

#### 1.1 `propositions-A-B-revisees.md` (`191` L, `@rev-ab`) — **Validé**
- **Corrections Phase 2 vérifiées :** resserrement **MVP `A'`** à `4` modules `Python 3.12+` (`harness-proto/`, `authz-pqc-audit/`, `policy-saga/`, `evalops-prr/`), retrait `Rust`/`Go`/`Firecracker`/`PostgreSQL`/`OpenFGA` de `G0`, séparation manuel `6,14×9,21 po` (`≤ 40` L/extrait) / dépôt `MIT` `8 - Trousse/`, arbitrage argumenté `OPA / Rego` vs `Cedar`, plan complet des `13` fichiers de `Agentique\7 - Livre 2027\outils` + `CA-02` + `CA-G0-SYNC` + `4e` strate `echantillon_aq.py` + `execute_g0.py`, `4` suites de vecteurs tiers, correction des `4` glissements `§ 3.2` + doublon `AIBOM`, qualification `non-avis` (`AO-05`), politique de gel/`lockfile` `SHA-256`/`SPDX` et adaptateurs `SEP-3398`/`A2A`/`GenAI` ; spécification complète du delta **`A'+`** (`tprm-exit-kit/`, `CAD26 v1.2`, `JCS/SCITT/RPRP`, `EXIG-AMF-11`, `24 PEX-*`) ; refonte **`B'`** (`A-B1` à `A-B4`, `EN 18286:2026` au lieu d'`ISO/IEC 42001`). Zéro note chiffrée.
- **Échantillon de contrôles sur pièces (`15` contrôles vérifiés exacts) :**
  1. `6 - Livre Blanc.md L1034-L1057` (`L1041` unique bloc JSON Schema `Draft 2020-12`, `strict: true`) `[Vérifié dans le corpus : 6 - Livre Blanc.md L1034-L1057]`.
  2. `6 - Livre Blanc.md L3242-L3253` & `L4187-L4224` (`OPA` sur `55` lignes `OPA|Rego` / `54` `OPA` vs `29` `Cedar`, défaut *indéfini* exigeant `default allow := false` à `L3248`) `[Vérifié dans le corpus : 6 - Livre Blanc.md L3242-L3253]` + `[Vérifié par exécution]`.
  3. `2 - Cadre de Référence.md L1360-L1361` (`5 SBB`) et `L7009, L7012` (`idem-v1` + `C.1–C.8` déjà audités en CI) `[Vérifié dans le corpus : 2 - Cadre de Référence.md L1360-L1361, L7009, L7012]`.
  4. `2 - Cadre de Référence.md L5041` (`EXIG-EVA-03` : `≥ 3/p` essais indépendants sans échec) `[Vérifié dans le corpus : 2 - Cadre de Référence.md L5041]`.
  5. `2 - Cadre de Référence.md L8674, L8678, L8680` (`a2a-tck 1.0.0.alpha3`, *Transaction Tokens -11*, `OTel v1.41.0` ↔ `semantic-conventions-genai` `85` attributs `Development` avec `cache_write`) `[Vérifié dans le corpus : 2 - Cadre de Référence.md L8674-L8680]`.
  6. `1 - Compendium 2026.md L10786-L10802` (Tableau 47.3 `AIBOM` négatif établi ; `RFC 9334` *Informational*) et `L9162, L12939` (`lacune 21`, réserve AMF) `[Vérifié dans le corpus : 1 - Compendium 2026.md L9162, L10786-L10802, L12939]`.
  7. `3 - Compendium 2027.md L4000` (`40,58 %` dérive silencieuse `MCP`), `L26887-L26901` (`ML-DSA HTTP 431`), `L28420-L28558` (`24 [BLOQUANT] PRR`, `Cedar F-03`) `[Vérifié dans le corpus : 3 - Compendium 2027.md L4000, L26887-L26901, L28420-L28558]`.
  8. `4 - Plan Directeur.md L390, L1087-L1104` (`RFC 9964` et banc `HTTP 431`), `L5093-L5095` (goulot 2e ligne `E-23`), `L5200-L5208` (`ANC-103/112/007`), `L5421-L5475` (`24` identifiants uniques `PEX-001..044`), `L5801` (`QC-AMF-NOTE-2026`) `[Vérifié dans le corpus : 4 - Plan Directeur.md L390, L1087-L1104, L5093-L5095, L5200-L5208, L5421-L5475, L5801]`.
  9. `2 - Cadre de Référence.md L6157-L6163, L6189, L6253, L8685, L8711-L8713, L8751` (`EN 18286:2026`, `EXIG-AMF-03`, `EXIG-AMF-11`, `v1.2 Tableaux 58–60 & 63`) `[Vérifié dans le corpus : 2 - Cadre de Référence.md L6157-L6163, L6189, L6253, L8685, L8711-L8713, L8751]`.
  10. `5 - Memoire.md L1127, L1195, L1211-L1216, L1258, L1487` (résidu `CaMeL`, `85` attr. `gen_ai.*`, `JCS/SCITT`, `3e` ligne `1` rangée) `[Vérifié dans le corpus : 5 - Memoire.md L1127, L1195, L1211-L1216, L1258, L1487]`.
  11. `7 - Livre.md L138, L788, L1524-L1534, L2084-L2124` (`AO-05`, `Decimal`, couloir rapide / témoins, `SRC-055` `L+` vs `genai.owasp.org`/`AMF`/`LégisQuébec` `403` `statut F`) `[Vérifié dans le corpus : 7 - Livre.md L138, L788, L1524-L1534, L2084-L2124]`.
  12. `C:\Github\Agentique\7 - Livre 2027\specs\prd.md L59` (`AO-05`), `charte-editoriale.md L89` (`14` nœuds), `manifest.json L30-L57` (`forbidden_prose_regexes`) `[Vérifié dans le corpus : prd.md L59 ; charte-editoriale.md L89 ; manifest.json L30-L57]`.
  13. `C:\Github\Agentique\7 - Livre 2027\outils` (`13` fichiers, **`7 897` L** dans l'arbre de travail non commité sur base `2f129b4` = `6 185` L d'outils + `1 712` L de tests, vs `12` fichiers / `6 001` L dans `2f129b4` pur et `6 588` L en Phase 1 ; `_mask_fenced_code_preserving_lines` `L117-L137` avec `8` appels en `verifie_manuscrit.py` `L154, L350, L494, L583, L731, L862, L908, L1184` + `echantillon_aq.py L232` ; `_check_ca02_unit L491-L520`, `CA-04/05 L575-L819`, `assemble_livre.py L25-L30`, `gabarit-livre.typ L74-L81, L324-L330`) `[Vérifié par exécution]`.
  14. Assertions `[Vérifié web]` (`OPA` & `cedarpy` sous `Apache 2.0`, `cyberphone/json-canonicalization`, `usnistgov/ACVP-Server`) `[Vérifié web]`.
  15. Correctif Passe 1 `#72` → `#77` appliqué sur `L61-L72, L171, L174, L184` (distinction `2f129b4` pur vs arbre de travail `7 897` L et `8` appels de masquage) `[Vérifié dans le corpus : propositions-A-B-revisees.md L61-L72, L171-L184]`.

#### 1.2 `propositions-C-D-revisees.md` (`165` L, `@rev-cd`) — **Validé**
- **Corrections Phase 2 vérifiées :** `C'` recentrée en profil différentiel public (`~120–150` p., `A-C1` à `A-C4`) avec module exécutable `G0` (`eia-schema/`, `amops-registry/`, `CA-EF06`), séparation `2 août 2027` vs `ANC-005` `2 sept. 2027`, exclusion des `9` autres provinces ; `D'` refondée en trousse technique `100 %` ouverte `L+` à `5` artefacts exécutables (`tableau54-rfp/`, `por016-export-validator/`, `nhi3-third-party-registry/`, `pki-pqc-vendor-calc/`, `bcp-exit-gamedays/`), correction de `RECOMMANDATION L70` sur `Vol. 6` et du biais `L101` contre `fiche-7 Prop. 3`, raccordement `BSIF B-10`, dualité tome autonome vs module `tprm-exit-kit/` de `A'+`. Zéro note chiffrée.
- **Échantillon de contrôles sur pièces (`12` contrôles vérifiés exacts) :**
  1. `4 - Plan Directeur.md L249` (`EF-06`) et `L5179-L5247` (`67` lignes `ANC-*`, dont exactement **`25`** à colonne `Cible = administrations`, `+ ANC-037` en description sous cible `tous` ; ventilation exacte `2` en 2025–2026, `4` `[D]` en 2027, `19` en 2028–2035) `[Vérifié dans le corpus : 4 - Plan Directeur.md L249, L5179-L5247]` + `[Vérifié par exécution]`.
  2. `4 - Plan Directeur.md L717` & `2 - Cadre de Référence.md L5856` (bacs à sable `EU AI Act` `2 août 2027` `[D]`) vs `PD28 L5205` (`ANC-005` `2 sept. 2027`) `[Vérifié dans le corpus : 4 - Plan Directeur.md L717, L5205 ; 2 - Cadre de Référence.md L5856]`.
  3. `3 - Compendium 2027.md L22103-L22128, L22199` (`432` initiatives QC sur `157` organismes en 2026, parcours MCN en `3` étapes / repli manuel) `[Vérifié dans le corpus : 3 - Compendium 2027.md L22103-L22128, L22199]`.
  4. `2 - Cadre de Référence.md L5816-L5817` (`Directive SCT` / `CAN-09`, `ÉIA` `65` risques + `41` atténuations, niveaux `I–IV`) et `5 - Memoire.md L984` (automatisation partielle) `[Vérifié dans le corpus : 2 - Cadre de Référence.md L5816-L5817 ; 5 - Memoire.md L984]`.
  5. `6 - Livre Blanc.md L756-L763, L1713, L3941-L3977, L5010, L5371` (réversibilité `SaaS` et `EU Data Act` bien présents, contredisant `RECOMMANDATION L70`, tandis que `PQC/ML-DSA/B-10/EXIG-APP` comptent `0` occurrence) `[Vérifié dans le corpus : 6 - Livre Blanc.md L756-L763, L3941-L3977]` + `[Vérifié par exécution]`.
  6. `2 - Cadre de Référence.md L6459-L6479` (`Tableau 54` : `8` critères `20/15/15/15/15/10/5/5 %`, `7` éliminatoires, `L6369` rédaction par affaires juridiques, `EXIG-APP-15` `L6443`) `[Vérifié dans le corpus : 2 - Cadre de Référence.md L6369, L6443, L6459-L6479]`.
  7. `2 - Cadre de Référence.md L3896` (`NHI3` *aucun inventaire des octrois accordés à des tiers n'est encore exigé*) et `0` occ. `B-10` dans `CAD26` vs `PD28` (`89` occ./`85` L), `C27` (`13` occ.), `Memoire` (`17` occ./`16` L), `Vol. 7` (`29` occ./`28` L) `[Vérifié dans le corpus : 2 - Cadre de Référence.md L3896]` + `[Vérifié par exécution]`.
  8. `3 - Compendium 2027.md L14057-L14133` (silence `Data Act` sur prompts/mémoires/traces `L14059`, `0` essai réel de fédération/migration `L14133`) `[Vérifié dans le corpus : 3 - Compendium 2027.md L14057-L14133]`.
  9. `analyse-essaim/fiche-7-livre-2027.md L77, L107-L110` (`3e` public `TPRM/BCP`, exclusion contrats privés et rédaction juridique) `[Vérifié dans le corpus : fiche-7-livre-2027.md L77, L107-L110]`.
  10. `4 - Plan Directeur.md L5196-L5197, L5223` (`ANC-003` `12 janv. 2027`, `ANC-023` `15 mars 2027` `100 j`, `ANC-030` `15 mars 2029` `47 j`) et `L4831, L5367` (`POR-016`) `[Vérifié dans le corpus : 4 - Plan Directeur.md L4831, L5196-L5197, L5223, L5367]`.
  11. `2 - Cadre de Référence.md L4706-L4722, L6325, L6355` (`ML-DSA-65/87`, `OTel GenAI Development`, `FOCUS 1.4`, `W3C Trace Context`) `[Vérifié dans le corpus : 2 - Cadre de Référence.md L4706-L4722, L6325, L6355]`.
  12. `Agentique\7 - Livre 2027\outils` (`L12, L70-L77` : exact pour son horodatage `17:23:49` à `7 883` L dans l'arbre de travail juste avant l'ajout de `+14` L dans `Agentique` à `17:24:37-38` portant le disque à `7 897` L — écart temporel neutre signalé pour alignement dans `RECOMMANDATION-FINALE.md`) `[Vérifié par exécution]`.

#### 1.3 `propositions-E-F-G-revisees.md` (`164` L, `@rev-efg`) — **Validé après correctif Passe 1**
- **Corrections Phase 2 vérifiées :** scission totale de `E'` hors maintenance d'archives (`§ I.2`, `NIST IR 8547 Final`), structuration sur `collecte_mlr_ouverte.py` (`911` L) + `protocole-mlr-2027.json` (`RQ1–RQ6`), transparence `3/9` API `statut F` et `230/453 METADATA_ONLY`, dualité livre vs service compagnon ; rectification du motif `L101` sur `F'` (ventilation strates `a/b/c`) ; formalisation complète de **`G'`** (4e public `fiche-7 L78`, revue `§ 17.5` via `RQ6`, `D1–D3`, `sentinel-injector/`, borne `DC-P12`) ; table exhaustive `21/21` propositions (`F1-P1` à `F7-P3`) + `10` volets orphelins/angles morts (dont `IT-OT`/`F6-P3`, `TLA+`, `κ`, `24 PEX-*`, `llm-d`, `vLEI/AP2/x402`, `9` autres provinces). Zéro note chiffrée.
- **Échantillon de contrôles sur pièces (`14` contrôles vérifiés exacts) :**
  1. `1 - Compendium 2026.md L11703-L11713, L12855-L12859` (`999` notices `§ I.1`, `0` adresse Vol. II–III en `§ I.2`, règle `L12859`) et `L12917, L12969-L12985` (`NIST IR 8547`, `13` blocs `§ N.4`) `[Vérifié dans le corpus : 1 - Compendium 2026.md L11703-L11713, L12855-L12859, L12917, L12969-L12985]`.
  2. `4 - Plan Directeur.md L1141, L3102, L5858`, `5 - Memoire.md L2499` (`REF-51`), `7 - Livre.md L981, L983, L1651, L1949, L2080` (`SRC-051`) — résidus `IR 8547 IPD` exacts `[Vérifié dans le corpus : PD28 L1141, L5858 ; Memoire L2499 ; 7 - Livre.md L981, L983, L2080]`.
  3. `Agentique\7 - Livre 2027\outils\collecte_mlr_ouverte.py` (`911` L, `L40-L68, L118-L125, L200-L239, L261-L303, L306-L389, L407-L463, L466-L521, L539-L649`) + `protocole-mlr-2027.json` (`156` L, `7` API `L20-L28`, `RQ6 L147-L154`) `[Vérifié par exécution]` + `[Vérifié dans le corpus]`.
  4. `4 - Plan Directeur.md L5571-L5601` (`27 SIG-*`), `3 - Compendium 2027.md L26973-L26995` (`23` lignes `§ 49.8`), `L26391-L26409` (`H1–H6`, `10 QO`), `L28242` (`10` sources non relues sur `134`), `1 - Compendium 2026.md L11472-L11478` (`< 30` j, `50` entrées = `28 + 22` sur `123`) `[Vérifié dans le corpus]`.
  5. `3 - Compendium 2027.md L26447-L26480` (`MLR W3.2` : `582` notices, `3/9` API `statut F`, `230/453` `50,77 %` `METADATA_ONLY`, `223` OA, `160` incluses, `κ = 0,7935`) `[Vérifié dans le corpus : 3 - Compendium 2027.md L26447-L26480]`.
  6. `4 - Plan Directeur.md L21, L74, L567-L569, L5182, L5217, L5758-L5790, L5882-L5892` (`CA-P17`, `L.Q. 2023 c. 5`, `L.C. 2017 ch. 3`, `ANC-010` `2 août 2028`, `0` norme médicale en `statut F`) `[Vérifié dans le corpus : 4 - Plan Directeur.md L21, L567-L569, L5182, L5217, L5758-L5790, L5882-L5892]`.
  7. `7 - Livre.md L128, L2090, L2109, L2114, L2118` (`0` étude clinique `MCP/A2A`, `eur-lex` `NON_CATALOG`, `PMC` échecs), `C27 L26498, L28281` (`MLR-0129`) et `1 - Compendium 2026.md L12508` (`MDR 2017/745`) `[Vérifié dans le corpus]`.
  8. `[Vérifié web]` sur `HL7 FHIR CC0 1.0`, `ISO 13485:2016` (~`CHF 196` sur registres nationaux), `IEC 62304` (`CHF 380` sur IEC Webstore) `[Vérifié web]`.
  9. `1 - Compendium 2026.md L4248-L4266` (`§ 17.5` tamponnage & paradoxe de l'explicabilité) et `7 - Livre.md L1510-L1544` (`-20 %`, `Fig-20`, `Tableau 11.1`, `D1–D3`) `[Vérifié dans le corpus]`.
  10. `analyse-essaim/fiche-1` à `fiche-7` (`21/21` propositions `F1-P1` à `F7-P3` vérifiées contre les sections 5) `[Vérifié dans le corpus]`.
  11. `1 - Compendium 2026.md L9239` (`F-92`), `L9421` (`8` plateformes SaaS obs. + `404`), `L10964` (`F-96`), `L12892` (`AP2→FIDO`) `[Vérifié dans le corpus]`.
  12. `3 - Compendium 2027.md L15170-L15210` (`ADR-017`), `L24787-L24812` (`ADR-028`), `L22799-L22812` (`llm-d`), `L23415-L23453` (`vLEI`/`ODRL`) et `PD28 L2559-L2572, L5551, L5562` (`CAP-046`) `[Vérifié dans le corpus]`.
  13. `2 - Cadre de Référence.md L6527` (`κ`), `PD28 L5591` (`SIG-017`), `5 - Memoire.md L700, L2515` (`OT`, `REF-62 Goddard`) `[Vérifié dans le corpus]`.
  14. **Correctifs Passe 1 `#71` → `#78` appliqués :** (i) `L100` : faux renvoi `7 - Livre.md L63` remplacé par **`7 - Livre.md L896`** (`AL-Ali et al.`, `SRC-073`, simulateur numérique non validé sur opérateurs humains réels selon `fiche-7 L63, L71`) ; (ii) `L121, L125, L148` : anciens noms `telemetry-audit/` et `evalops-ci/` remplacés par **`authz-pqc-audit/`** et **`evalops-prr/`** ; (iii) `L71, L73, L106-L107` : alignés sur `7 897` L / `verifie_manuscrit.py` `1 694` L (`FACT-JUNIOR-DEV-CONTRACTION` à `L1274`) `[Vérifié par exécution]`.

---

### 2. Audit des deux jurys indépendants (`notation-jury-1.md` & `notation-jury-2.md`)

- **Grille `M1–M5` et multiples stricts de `0,5` (`[Vérifié par exécution]`) :** `40/40` notes de `J1` et `40/40` notes de `J2` sont des multiples stricts de `0,5` dans `[0,0 ; 10,0]`. `8/8` indices indicatifs `P1` de `J2` concordent exactement à `3` décimales avec le recalcul rationnel.
- **Justifications cellulaires (`[Vérifié par exécution]`) :** `40/40` cellules justifiées en `1–2` phrases dans `J1` (`0` divergence avec le tableau récapitulatif) et `40/40` cellules justifiées en `1–2` phrases dans `J2` (`0` divergence avec le tableau récapitulatif).
- **Contrôle anti-copie et indépendance aveugle (`[Vérifié par exécution]`) :**
  - `15/40` cellules (`37,5 %`) diffèrent entre `J1` et `J2`, dont `(E', M1)` à `2,0` pts d'écart (`J1 = 7,5` vs `J2 = 5,5`).
  - Seuls `5` `12`-grammes sont communs entre `J1` et `J2` — uniquement deux séquences énumératives tirées des fiches (`27 sig 23 lignes 49 8 10 qo h1 h6 10 sources non relues c27` et `l q 2023 c 5 loi 25 l c 2017 ch 3`), confirmant une rédaction indépendante sous angles distincts (ingénierie/CI vs stratégie éditoriale/portefeuille).
- **Correctifs Passe 1 appliqués sans toucher aux notes (`#73` → `#76`, `#74` → `#75`) :**
  - `notation-jury-1.md` (`125` L, `@jury-ingenierie`) : `L12` précisée sur « arbre de travail non commité sur base `2f129b4` », `L98` rectifiée sur `ψ >= 0,75` (`SRC-073`, `7 - Livre.md L896`, `fiche-7 L63, L71`), `L101` rectifiée de `L1270` à `L1274` (`verifie_manuscrit.py`).
  - `notation-jury-2.md` (`119` L, `@jury-strategie`) : `L106` rectifiée de `57` à **`69` occurrences (`56` `OPA` + `13` `Rego` sur `55` lignes) contre `29` occurrences/lignes `Cedar`** dans `6 - Livre Blanc.md`.

---

### 3. Contrôle d'exécution et recalcul indépendant (`arbitrage_final.py` & `arbitrage-matrice-finale.md`)

- **Réexécution post-correctifs (`[Vérifié par exécution]`) :** `python "C:\Github\Prospection\Prospection\recommandation-finale\arbitrage_final.py"` se termine avec **`exit code 0`** (`Python 3.14.10`) et produit une sortie `stdout` **identique au caractère près** au bloc `text` consigné dans `arbitrage-matrice-finale.md` (`L74-L315`).
- **Recalcul indépendant complet (`[Vérifié par exécution]`) :** Un script Python indépendant (hors `arbitrage_final.py`) confirme l'exactitude intégrale des grandeurs clés :
  - Accord inter-juges (`40` cellules) : `MAE = 0,2500` pt, biais `+0,0250` pt, `RMSE = 0,4743` pt, `Pearson r = +0,9267`, `Kappa_w = Lin CCC = +0,9201` ; `Spearman rho = +0,9701` sur les `8` scores `P1`.
  - Scores consensus `P1` (`25/25/25/15/10`) : `A' (8,9750) > A'+ (8,9125) > B' (8,2375) > C' (8,0375) > D' (7,7875) > G' (7,5375) > E' (6,6375) > F' (6,0500)` ; invariants `P1–P7` (`8/8` lectures) confirmés : famille `A` `1re–2e`, `B' 3e` (`> C'` dans `8/8`), `C' 4e` (`4` ou `4=`), `E' 7e`, `F' 8e`.
  - Dé-corrélation & variance : `r(M2, M4) = +0,7803` (`R² = 60,88 %`, vs `+0,8774` en Phase 1 `sensibilite-matrice.md L139, L173`) ; sous `P1`, parts de variance `M1 18,7 %`, `M2 22,7 %`, `M3 33,4 %`, `M4 14,0 %`, `M5 11,3 %` (`M2+M4 = 36,6 %` vs `55,3 %` en Phase 1 `sensibilite-matrice.md L133-L135, L167`).
  - Duel `A'` vs `A'+` : écart `+0,0625` pt sous `P1` (`+0,4500` `A'` sur `M2+M4` vs `+0,3875` `A'+` sur `M1+M3+M5`) ; seuil de bascule `B' > A'` à `w_M3 > 56,83 %`.

---

### 4. Contrôle de discipline épistémique (`6/6` dossiers)

- Les quatre marqueurs (`[Vérifié dans le corpus : fichier + Lxxx]`, `[Vérifié par exécution]`, `[Vérifié web]`, `[Supposé]`) sont strictement distingués dans les `6` documents (`propositions-A-B-revisees.md` `60` balises, `propositions-C-D-revisees.md` `49`, `propositions-E-F-G-revisees.md` `49`, `notation-jury-1.md` `59`, `notation-jury-2.md` `120`, `arbitrage-matrice-finale.md` `12`). Aucune cote, projection de charge ni recommandation stratégique n'est présentée comme fait vérifié.

---

## Contrôle final (Passe 2)

- **Cible auditée :** [`RECOMMANDATION-FINALE.md`](file:///C:/Github/Prospection/Prospection/RECOMMANDATION-FINALE.md) (`@redac-final`, soumission `#80`).
- **Verdict Passe 2 :** **`VALIDÉ — 0 écart (contrôle final réussi)`**.

### 1. Contrôles mécaniques et structurels (`[Vérifié par exécution]`)

1. **Longueur du document :** **`143` lignes** (`32 466` octets), strictement conforme au plafond `≤ 350` lignes.
2. **Intégrité des fichiers antérieurs :** `git -C C:\Github\Prospection\Prospection diff --name-only` retourne une **sortie vide** (`0` fichier modifié parmi `README.md`, `1 - Compendium 2026.md` à `7 - Livre.md`, `RECOMMANDATION-PROCHAIN-LIVRABLE.md`, `REVUE-PROPOSITIONS.md`, `analyse-essaim\*` et `revue-propositions\*`).
3. **Architecture en `6` sections requises :** présence vérifiée des sections `## 1.` à `## 6.` (`L8`, `L24`, `L46`, `L69`, `L114`, `L129`), avec exactement **`3` paramètres optionnels réversibles** (`≤ 3` exigés, `L122-L125`).
4. **Intégrité des hyperliens Markdown :** `25/25` liens vérifiés (`0` lien brisé, `0` ancre `#Lxxx` hors bornes).
5. **Discipline épistémique :** `45` balises explicites (`22` `[Supposé]`, `10` `[Vérifié par exécution]`, `9` `[Vérifié dans le corpus]`, `5` `[Vérifié web]`, dont `1` combinée) ; aucune note `M1–M5`, pondération ni décision éditoriale présentée comme vérifiée.

### 2. Contrôles sur pièces et cohérence croisée (`25` contrôles exécutés, `0` divergence)

1. **Concordance des `8` lignes du tableau comparatif § 2 (`L28-L35`) avec `arbitrage_final.py` :** `8/8` correspondances exactes pour les cotes `M1..M5` consensus, les scores `J1 P1` / `J2 P1` (`3` déc.), les scores consensus `P1` (`2` et `4` déc.) et les rangs sous `P1–P7` (`A'` `1` `3×`/`2` `4×`/`1=` `P3`, `A'+` `1` `4×`/`2` `3×`/`1=` `P3`, `B'` `3` `8/8`, `C'` `4` `7×`/`4=` `P7-J1`, `D'` `5` `6×`/`4=`/`6`, `G'` `6` `7×`/`5`, `E'` `7` `8/8`, `F'` `8` `8/8`).
2. **Concordance des `8` lectures `P1–P7` § 3 (`L57-L63`) avec `arbitrage-matrice-finale.md` & `arbitrage_final.py` :** ordres complets, arrondis à `2` décimales et marges exactes (`+0,0625`, `+0,1750`, `+0,0000`, `+0,0625`, `+0,0750`, `+0,0147`, `+0,1500`/`+0,2750` ; `min(A',A'+)–B'` et `B'–C'`) tous concordants.
3. **Accord inter-juges & variance § 3 (`L50-L53`) :** `MAE 0,2500`, `RMSE 0,4743`, biais `+0,0250`, `25/40` (`62,5 %`), `37/40` (`92,5 %`), `39/40` (`97,5 %`), `(E', M1)` (`7,5` vs `5,5`), `Kappa_w = Lin CCC = +0,9201`, `Pearson r = +0,9267`, `Spearman rho = +0,9701` (`P1`), `r(M2, M4) = +0,7803` (`R² = 60,88 %`, vs `+0,8774` en Phase 1 `sensibilite-matrice.md L139`), part `M2+M4` `36,6 %` vs `55,3 %` (`sensibilite-matrice.md L133-L135`), `M3` `33,4 %` (`+18,5` pp) vérifiés exacts.
4. **Seuils de bascule § 3 (`L65`) :** `w_M3 > 56,83 %` (`B' > A'`), `w_M3 > 79,73 %` (`B' > A'+`), `w_M2 > 33,82 %` / `w_M3 < 16,67 %` / `w_M1 > 46,43 %` (`C' > B'`), `±0,2500` pt sur `M1/M2/M3` ou `w_M2 < 21,74 %` / `w_M3 > 30,77 %` / `w_M1 > 33,33 %` / `w_M5 > 16,92 %` (`A'` vs `A'+`) vérifiés exacts contre `arbitrage_final.py`.
5. **Arbitrages `A'` vs `A'+` et `OPA / Rego` vs `Cedar` § 1 (`L10-L14`) :** cohérence stricte avec `notation-jury-1.md L107-L125`, `notation-jury-2.md L101-L109`, `arbitrage-matrice-finale.md L54` et `6 - Livre Blanc.md L3242-L3253, L4187-L4224` (`69` occ. `OPA`/`Rego` sur `55` lignes vs `29` `Cedar`).
6. **Disposition des volets orphelins § 2 (`L37-L42`) :** couverture complète de `IT-OT`/`F6-P3` (`C27 L15190, L24793, L28325, L28336`), `§ I.2` (`C26 L12859`) & errata `PQC NIST IR 8547` (`PD28 L1141, L3102, L5858` ; `Memoire L2499 REF-51` ; `Vol. 7 L983, L1651, L1949, L2080 SRC-051`), `TLA+/Alloy`/`F-92`/`F-96` (`C26 L9239, L10964`), `κ` (`CAD26 L6527`), `EXIG-AMF-11` (`CAD26 L6253`), `24 PEX-*` (`PD28 L5421-L5475`), `HOTL`/`§ 17.5`, `llm-d`, `CAP-046`/`B-15`, `vLEI/AP2/x402`, `COBOL/DSPy/CRDT` et `9` autres provinces/`3` territoires (`propositions-E-F-G-revisees.md L112-L164`).
7. **Cahier des charges Volume 8 § 4.1 (`L71-L85`) :** identité, séparation manuel `CC BY 4.0` (`6,14×9,21 po`, `10,6 pt`, `≤ 14` nœuds, extraits `≤ 40` L) / dépôt `8 - Trousse/` `MIT` (`4` modules `Python 3.12+` : `harness-proto/`, `authz-pqc-audit/`, `policy-saga/`, `evalops-prr/`, + `OPA/Rego`, sans KVM/SGBD/`Rust`/`Go`), `4` fix `§ 3.2` et suppression du doublon `AIBOM` (`C26 L10786`) tous vérifiés conformes.
8. **Plan de réutilisation `Agentique\7 - Livre 2027\outils` § 4.2 (`L87-L99`) :** exactitude arithmétique et documentaire des `13` fichiers (`7 897` L = `6 185` + `1 712` dans l'arbre courant vs `12` / `6 001` L `2f129b4` pur, `6 588` L Phase 1 et `7 883` L intermédiaire `C-D L12`), des adaptations `CA-02`, `CA-G0-SYNC` (`L117-L137`, `8` appels), `4e` strate `G0`, `genere_annexes.py` et création unique `execute_g0.py`.
9. **Sources `L+`, `4` vecteurs tiers, `G0–G5`, `AO-05` et gel/`lockfile` § 4.3 (`L101-L110`) :** tous présents et cohérents avec `prd.md L59`, `7 - Livre.md L138, L2084, L2110` et `propositions-A-B-revisees.md L83-L94`.
10. **Traçabilité `REVUE-PROPOSITIONS.md` § 6 (`L129-L143`) :** `64/64` renvois `Lxxx` internes vérifiés dans les bornes et cohérents avec les dossiers révisés et `REVUE-PROPOSITIONS.md` (`§ 1` à `§ 6`, amendements `P0–P2`, `A'–G'`, `21` propositions et `5` questions ramenées à `3` paramètres réversibles).
