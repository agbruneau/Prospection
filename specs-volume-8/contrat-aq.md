# Contrat d'assurance qualité 100 % agentique — Volume 8 (v1.0)

Ce contrat définit le protocole de contrôle indépendant auquel sont soumis l'intégralité du manuel *Ingénierie exécutable de l'entreprise agentique* (*Manuel de spécifications testables, harnais 80/20, médiation MCP/A2A, délégation bornée, politiques OPA hors modèle, sémantique d'effet Saga et suite EvalOps vérifiable (non-avis)* ; auteur : **André-Guy Bruneau, M.Sc IT** ; date de gel des faits : **2 décembre 2026** / `2026-12-02` ; parution visée : **janvier 2027**) et son dépôt logiciel compagnon `8 - Trousse/`. Les licences applicables sont **CC BY 4.0** pour le manuel (`6,14 × 9,21 po`) et ses `9` figures (`Fig-00` à `Fig-08`), et **MIT** pour `8 - Trousse/` et l'outillage d'assurance qualité.

**Principe d'étanchéité cardinal.** L'assurance qualité repose sur une double séparation étanche :
1. **Étanchéité logicielle (`G0`)** : aucun agent ayant implémenté le code de `8 - Trousse/` (`batisseur-code`) ne rédige les tests oracles, les vecteurs négatifs ni les assertions de conformité (`auteur-tests-oracle`), et réciproquement ; `4` suites de vecteurs officiels tiers brisent l'auto-validation corrélée intra-essaim.
2. **Étanchéité éditoriale (`G1`–`G5`)** : aucun agent ayant rédigé une unité narrative, généré une figure ou assemblé une bibliographie n'est autorisé à auditer, recollationner, critiquer ou noter son propre livrable.

**Ordre chronologique d'exécution.** Les barrières sont numérotées par nature, non par séquence temporelle. L'ordre imposé est strictement :
`G0` → `G1` → `G2` → `G3` passe 1 (`seed=20270801`) → `G4` (`gauntlet-loop` avec rejeu obligatoire `G0` + `G1` + `G2` différentiel) → `G5` lissage transversal (avec rejeu obligatoire `G0` + `G1` + `G2` différentiel) → `G3` passe 2 à froid sur le texte et le code finaux (`seed=20270802`, `0` chevauchement, `≥ 57/60` avant correction et `60/60` après) → `G5` régénération déterministe des Annexes `A`–`B`, rendu triple (`MD`/`HTML`/`PDF Typst 6,14 × 9,21 po`) et inspection visuelle de `100 %` des pages. La passe 2 de `G3` mesure ainsi la fiabilité résiduelle réelle du manuel et du code effectivement publiés.

---

## 1. Vue d'ensemble des six barrières (`G0` à `G5`) et couverture `CA-01` à `CA-20`

| Barrière | Rôle d'agent / Outil | Entrées inspectées | Critères couverts | Condition de sortie bloquante |
|---|---|---|---|---|
| **`G0` — Banc logiciel hermétique et contre-épreuves tierces** | Script `outils/execute_g0.py` + paire isolée `auteur-tests-oracle` ≠ `batisseur-code` (`invoke_subagent`) | `8 - Trousse/` (`harness-proto/`, `authz-pqc-audit/`, `policy-saga/`, `evalops-prr/`, `policies_opa/`, `schemas/`, `vectors/`, `tests/`), `requirements.lock` | `CA-19` *(et alimente `CA-07`, `CA-20`)* | Code de retour `0` (`exit 0`) : `100 %` des tests `pytest`, `4` suites tiers, `default allow := false` + `opa test --coverage 100 %` sur vecteurs négatifs, `SPDX MIT` sain ; export de `aq/rapports-g0.json` |
| **`G1` — Garde déterministe sans modèle** | Script `outils/verifie_manuscrit.py --strict` | Fichiers Markdown (`00-liminaire` + `ch01`..`ch04` + `Annexes A–B`), `manifest.json`, `registre/*.json`, `recherche/`, `sources/ch00..ch04-sources.md`, figures, `8 - Trousse/` | `CA-01` à `CA-11`, `CA-17`, `CA-20` (`CA-G0-SYNC`) | Code de retour `0` (`0` erreur) sur l'ensemble des contrôles de la section 2.1, incluant concordance octet par octet et `SHA-256` de chaque extrait `≤ 40` L |
| **`G2` — Ancrage atomique Wyvern** | `5` agents `auditeur-wyvern` (contexte neuf, `1` par unité narrative `00` et `ch01`–`ch04`) | `00 - Liminaire.md`, `Chapitre 01..04.md`, `sources/ch00..ch04-sources.md`, textes intégraux `recherche/corpus_l_plus/*.txt` | `CA-10`, `CA-12` | `100 %` des affirmations atomiques au verdict `supporté` après rectification ou retrait consigné dans `ancrage/ch00..ch04-ancrage.md` (journal intégral reproduit en **Annexe A**) |
| **`G3` — Double recollation stratifiée à l'aveugle** | Deux agents `recollateur` distincts et neufs (`echantillon_aq.py`) | Deux échantillons stratifiés disjoints de `60` énoncés (`4` strates × `15`, `≥ 8` par unité narrative) face aux `.txt` `L+` et à `aq/rapports-g0.json` | `CA-07`, `CA-13`, `CA-14` | Passe 1 (`seed=20270801`) ramenée à `60/60` (`100 %`) ; passe 2 à froid (`seed=20270802`, `0` chevauchement, texte et code finaux) `≥ 57/60` (`95 %`) avant correction et `60/60` après |
| **`G4` — Critique éditoriale à l'aveugle (`gauntlet-loop`)** | Paires `batisseur` / `critique` en contextes isolés (`invoke_subagent`, jamais `swarm`) | Unité narrative anonymisée vs extrait étalon français anonymisé de `3 - Compendium 2027.md` (ordre `A`/`B` alterné) | `CA-15` *(suivi rejeu `G0` + `G1` + `G2` diff)* | Victoire A/B à l'aveugle, gains marginaux sur `2` tours consécutifs ou plafond budgétaire atteint, suivi obligatoirement d'un rejeu `G0` + `G1` + `G2` différentiel sur les passages retouchés |
| **`G5` — Lissage transversal, annexes et inspection visuelle** | Agent `lisseur-editorial` neuf + `genere_annexes.py` + `assemble_livre.py` + agent d'inspection visuelle | Manuscrit complet assemblé (`38 000` mots ± 8 %), `4` registres JSON SSOT, **Annexes `A`–`B`**, sorties `.md`, `.html` et `.pdf` (`Typst 6,14 × 9,21 po`) | `CA-16`, `CA-17`, `CA-18` *(avec rejeu `G0` + `G1` + `G2` diff après lissage)* | `0` redite inter-unités, `0` divergence SSOT, `100 %` des pages du `.pdf` inspectées visuellement sans défaut de rendu ni lien brisé |

### Table de couverture explicite des vingt critères d'acceptation (`CA-01` à `CA-20`)

| Critère | Objet du contrôle | Barrière(s) | Critère | Objet du contrôle | Barrière(s) |
|---|---|---|---|---|---|
| `CA-01` | Budgets de mots (`38 000` total ± 8 %, `7` unités) | `G1` | `CA-11` | Couverture `L+` (`RQ1`–`RQ6`, specs Git/RFC/NIST) | `G1`, `G2` |
| `CA-02` | Liste noire lexicale adaptée (`[S]..[L+]` bannis, `EXIG-*`/`PRR` permis) | `G1` | `CA-12` | Ancrage atomique Wyvern (`100 %` `supporté`, journal Annexe A) | `G2` |
| `CA-03` | Anti-auto-plagiat `12-grammes` face aux `7` volumes du dépôt | `G1` | `CA-13` | Recollation Passe 1 (`seed=20270801`, `4 × 15`, `≥ 8`/unité, `60/60`) | `G3` |
| `CA-04` | Conformité structurelle (`QD`, sous-sections, encadrés, légendes) | `G1` | `CA-14` | Recollation Passe 2 à froid (`seed=20270802`, `0` chevauchement, `≥ 57/60` → `60/60`) | `G3` |
| `CA-05` | Plafonds tabulaires (`1` lim., `≤ 3`/ch.) et puces (`≤ 25 %`) | `G1` | `CA-15` | Boucle critique `gauntlet-loop` A/B à l'aveugle + rejeu `G0`+`G1`+`G2` diff | `G4` |
| `CA-06` | Zéro symbole dollar non échappé (`\$` et `\(...\)` / `\[...\]`) | `G1`, `G5` | `CA-16` | Lissage transversal (`lisseur-editorial` neuf) + rejeu `G0`+`G1`+`G2` diff | `G5` |
| `CA-07` | Concordance des `4` registres JSON SSOT et registres hérités | `G1`, `G3` | `CA-17` | Régénération déterministe des **Annexes `A` et `B`** | `G1`, `G5` |
| `CA-08` | Compilation stricte `9/9` figures (`Fig-00`–`Fig-08`, `≤ 14` nœuds) | `G1` | `CA-18` | Compilation triple `.md`/`.html`/`.pdf` et inspection `100 %` des pages | `G5` |
| `CA-09` | Traçabilité `SHA-256` de `100 %` des textes ouverts `L+` | `G1` | `CA-19` | Validation logicielle `G0` (`exit 0`, `OPA`, `4` vecteurs tiers, `SPDX MIT`) | `G0` |
| `CA-10` | Respect strict `AO-01` (`0` `statut F`, `0 % METADATA_ONLY`) et `AO-02` | `G1`, `G2` | `CA-20` | Synchronisation `CA-G0-SYNC` des extraits `≤ 40` L par `SHA-256` | `G1` |

---

## 2. Spécification détaillée des contrôles

### 2.0 Barrière `G0` — Banc logiciel hermétique et contre-épreuves tierces (`CA-19`)

Le script `outils/execute_g0.py` exécute la suite logicielle complète de `8 - Trousse/` en environnement `Python 3.12+` portable Windows/Linux (sans `Rust`, `Go`, `Firecracker`/KVM, `PostgreSQL RLS`, `OpenFGA`, ni `Nginx`/`Envoy` live) et échoue au premier défaut :

1. **Séparation en double aveugle `auteur-tests-oracle` ≠ `batisseur-code`** :
   - L'agent `auteur-tests-oracle` produit en premier lieu les schémas `JSON Schema Draft 2020-12` (`strict: true`), les assertions `pytest` positives et négatives, les cas de test `.rego` et l'importation des `4` suites de vecteurs tiers ; ses fichiers d'oracle sont scellés par empreinte `SHA-256`.
   - L'agent `batisseur-code` implémente les `4` modules Python (`harness-proto/` / `harness_proto`, `authz-pqc-audit/` / `authz_pqc_audit`, `policy-saga/` / `policy_saga`, `evalops-prr/` / `evalops_prr`) et les paquets `.rego` sans jamais modifier les fichiers d'oracle ni assouplir les assertions.
2. **Moteur unique de politiques hors modèle (`OPA / Rego`, `Cedar` exclu de `G0`)** :
   - Contrôle syntaxique bloquant imposant `default allow := false` (ou `default decision := "deny"`) en tête de chaque paquet `.rego` sous `8 - Trousse/policies_opa/`.
   - Exécution de `opa test --coverage` exigeant `100 %` de couverture sur vecteurs négatifs, entrées incomplètes et charges utiles mal typées (Règle de deux `EXIG-SEC-06`, propagation de contamination multi-agents `CaMeL`, escalades `HITL`, chaînes `act[]`).
3. **Intégration obligatoire de `4` suites de vecteurs officiels tiers** :
   - **`RFC 8785` (`JCS`)** : vecteurs officiels des Appendices A/B et de la suite `cyberphone/json-canonicalization` (sérialisation ECMAScript des nombres IEEE-754 et tri lexicographique UTF-16).
   - **`NIST FIPS 204 / 205` (`ACVP`)** : échantillons officiels `prompt.json` / `expectedResults.json` (`ML-DSA-*-FIPS204` et `SLH-DSA-*-FIPS205` issus de `usnistgov/ACVP-Server`).
   - **`a2aproject/a2a-tck`** : vecteurs de compatibilité épinglés (mention explicite de l'étiquette `1.0.0.alpha3` relevée au gel).
   - **`OWASP SRC-055` (`L+`)** : cas issus de `https://genai-security-project.github.io/crosswalk/agentic-ai-top10/` (en excluant `genai.owasp.org`, consigné `HTTP 403` `statut F` conformément à `AO-01`).
4. **Couverture fonctionnelle et conformité `MIT`** :
   - Validation `pytest` à `exit 0` sur : harnais `80/20` à `8` étapes (`AMBIGU_ESCALADE`), épinglage `JCS SHA-256` `MCP 2026-07-28` + `HeaderMismatch` + adaptateurs `SEP-2596`/`SEP-3398`, `AgentCard A2A v1.0.1` (`JWS RFC 7515`), `OAuth 2.0 OBO RFC 8693/8707` + `DPoP RFC 9449` + rejet *token passthrough* + `SSF/CAEP` + `CIBA I-JSON/JCS` (`EXIG-SEC-25`), calcul exact en octets Python `HTTP 431` comparant `O(sauts)` vs *Transaction Tokens* `O(1)` (`draft-ietf-oauth-transaction-tokens-11`) tous deux signés `ML-DSA-65/87` (`RFC 9964`), mappage `OTel v1.41.0 ↔ semantic-conventions-genai` (`85` attr. `Development` dont `cache_write`) + filtre PII bilingue `FR/EN`, chaîne `JCS`/`SCITT RFC 9943`/`SLH-DSA FIPS 205`/`FOCUS v1.4`, profils de confinement déclaratifs sans KVM (`network: none`, blocage `IMDS`), arithmétique `Decimal` vs `IEEE-754`, Saga `idem-v1` + `Transactional Outbox` + `EXIG-ORC-28` + `10` scénarios déterministes de fautes (`EXIG-ORC-20`), banc hermétique `EvalOps pass^k`, borne supérieure de Wilson à `95 % < p` exigeant `≥ 3/p` essais indépendants sans échec (`EXIG-EVA-03`), relations métamorphiques sans oracle et validateurs des `24 [BLOQUANT] PRR` + `2027-B001` + `5 SBB` + `C01–C40`.
   - Vérification du fichier `8 - Trousse/requirements.lock` épinglé `SHA-256` et audit automatisé `SPDX` confirmant l'absence de dépendance `GPL`/`AGPL` incompatible avec `MIT`.
   - Production déterministe de `aq/rapports-g0.json` (verdicts, compteurs, empreintes `SHA-256` des extraits exposés au manuel).

### 2.1 Barrière `G1` — Vérificateur mécanique sans modèle (`verifie_manuscrit.py`)

Le script `outils/verifie_manuscrit.py --strict` s'exécute sans appel de modèle et bloque immédiatement la chaîne si l'une des règles suivantes échoue :

1. **Calibrage (`CA-01`)** : compte de mots de chaque unité (hors front matter `YAML`, blocs de code clôturés validés séparément, commentaires HTML et `URL`) dans sa plage `[min_words, max_words]` de `manifest.json` : `00-liminaire` `3 500` (`3 220–3 780`), `ch01` `8 000` (`7 360–8 640`), `ch02` `8 500` (`7 820–9 180`), `ch03` `8 000` (`7 360–8 640`), `ch04` `7 000` (`6 440–7 560`), `annexe-a` `1 500` (`1 380–1 620`), `annexe-b` `1 500` (`1 380–1 620`), et total dans `[34 960, 41 040]` (`38 000 ± 8 %`, dont `35 000` narratifs et `3 000` annexes).
2. **Propreté lexicale (`CA-02`)** : aucune correspondance aux expressions régulières de `forbidden_prose_regexes` hors blocs de code synchronisés ou citations documentées. Les identifiants techniques de spécification (`EXIG-*`, `CAP-*`, `ADR-*`, `POR-*`, `PRR`, `C01–C40`, `SBB`) sont explicitement autorisés dans ce manuel d'ingénierie, tandis que les marqueurs bruts d'audit (`[S]`, `[D]`, `[A]`, `[M]`, `[N]`, `[L+]`), classifications internes non définies (`Classe`, `Stade`, `Palier`), codes hors périmètre `A'` (`ANC-*`, `INI-*`, `PEX-*`, `SIG-*`, `DIV-*`) et formules creuses restent strictement bannis.
3. **Anti-auto-plagiat (`CA-03`)** : extraction des `12-grammes` normalisés du manuscrit (hors citations `≤ 40` mots entre guillemets français `« … » [n]` et hors extraits de code validés par `CA-G0-SYNC`) comparée aux `7` ouvrages consolidés du dépôt (`1 - Compendium 2026.md` à `7 - Livre.md`) ; toute collision échoue avec fichier et numéro de ligne.
4. **Conformité structurelle (`CA-04`, `CA-05`)** : présence de `*Question directrice :*`, des `22` sous-sections prescrites (`0.1`–`0.6` au liminaire, `1.1`–`4.4` dans les chapitres), des encadrés prescrits (`> **Cinq critères permanents d'évaluation et de preuve exécutable**` au liminaire et `> **Trois invariants exécutables — Chapitre X**` en clôture des chapitres `01`–`04`), légendes `*Figure N — ...*` et `*Tableau X.Y — ...*`, exactement `1` tableau au liminaire, au plus `3` tableaux par chapitre et au plus `25 %` de lignes de listes à puces par unité.
5. **Sûreté typographique (`CA-06`)** : aucun caractère dollar (`\$`) non échappé dans aucun fichier `.md` ; toute formule écrite uniquement en `\(...\)` ou `\[...\]` ; aucune occurrence d'une date de gel erronée de fin décembre 2026 autre que `2026-12-02` (`2 décembre 2026`).
6. **Concordance des registres (`CA-07`)** : toute date, valeur chiffrée, entrée taxonomique ou exigence figurant dans `registre/specifications-lplus.json`, `registre/matrice-exig-prr-c40.json`, `registre/concordance-taxonomies.json`, `aq/rapports-g0.json`, `registre/ancres-chronologiques.json`, `registre/faits-empiriques.json` ou `registre/glossaire-termes.json` y est reproduite à l'identique.
7. **Intégrité documentaire, cryptographique et iconographique (`CA-08` à `CA-11`)** : existence et condensat `SHA-256` valide de `100 %` des sources `L+` dans `recherche/manifeste-sources-sha256.json`, `0 %` de `METADATA_ONLY`, `0` référence vers `statut F` ou vers un volume `1`–`7` non réancré, `0` renvoi `[n]` orphelin dans `sources/ch00..ch04-sources.md`, couverture minimale `RQ1`–`RQ6` et compilation sans erreur des `9` figures (`Fig-00` à `Fig-08`, `≤ 14` nœuds).
8. **Annexes régénérées (`CA-17`)** : le contenu des **Annexes `A` et `B`** est identique octet pour octet à la sortie de `genere_annexes.py`.
9. **Synchronisation code ↔ manuel `CA-G0-SYNC` (`CA-20`)** : levée du masquage aveugle `_mask_fenced_code_preserving_lines` (`verifie_manuscrit.py` `L117-L137`, `8` appels `L154, L350, L494, L583, L731, L862, L908, L1184`) pour inspecter chaque bloc de code clôturé du manuscrit : longueur `≤ 40` lignes, ancre de provenance valide pointant vers `8 - Trousse/`, concordance **octet pour octet** avec le fichier source réel et empreinte `SHA-256` conforme à `aq/rapports-g0.json` (`0` bloc écrit à la main).

### 2.2 Barrière `G2` — Protocole d'ancrage atomique Wyvern (`CA-10`, `CA-12`)

Pour chacune des `5` unités narratives (`00-liminaire` et `ch01`–`ch04`), un agent `auditeur-wyvern` neuf reçoit exclusivement l'unité, sa base fermée `sources/ch00..ch04-sources.md` et l'accès en lecture aux textes intégraux `recherche/corpus_l_plus/*.txt` (ainsi qu'à `aq/rapports-g0.json` pour les assertions de banc exécutées en `G0`) :

1. Segmentation paragraphe par paragraphe et décomposition en **affirmations atomiques vérifiables** (une seule proposition factuelle, chiffrée, protocolaire, juridique ou résultat de test `G0` par entrée).
2. Vérification en deux temps : contre le résumé vérifié de `sources/chNN-sources.md`, puis directement dans le texte intégral `L+` (`.txt`) ou le journal `aq/rapports-g0.json` en cas d'ambiguïté. Tout fait repéré initialement dans les volumes `1`–`7` du dépôt est remonté jusqu'à la source primaire `L+` qu'il cite ; à défaut, il est classé `non supporté` (`AO-02`).
3. Attribution d'un verdict strict :
   - `supporté` : correspondance exacte de sens, de version, de périmètre (`DC-P12` hors modèle) et d'ordre de grandeur ;
   - `imprécis` : nuance, condition expérimentale, stade (`Development`/`Draft`) ou juridiction omise → reformulation immédiate calquée sur la source ;
   - `non supporté` : affirmation absente de la source citée ou appuyée sur une source `statut F` → suppression pure et simple, ou réattribution vers une autre source `L+` vérifiée de la base fermée.
4. Production obligatoire du journal `ancrage/ch00..ch04-ancrage.md`, dont le **journal intégral des vérifications et rectifications est publié mécaniquement en Annexe A**.
5. **Mode différentiel (`G4`, `G5`)** : toute retouche opérée lors de `G4` ou du lissage `G5` soumet l'ensemble des paragraphes présents au `git diff` à une passe `G2` différentielle complète, suivie du rejeu de `G0` et `G1`.

### 2.3 Barrière `G3` — Double recollation stratifiée à l'aveugle (`CA-07`, `CA-13`, `CA-14`)

Le script déterministe `outils/echantillon_aq.py` tire **60 affirmations sourcées** à travers l'ensemble des `5` unités narratives (`00-liminaire` et `ch01`–`ch04`), avec **au moins `8` items par unité narrative** et une répartition exacte en **4 strates de 15 items** :

- `15` affirmations **empiriques** (mesures de dérive `40,58 %`, résidu `5/15 trifecta`, bancs `pass^k`, tailles de trames et latences mesurées en `L+`) ;
- `15` énoncés **réglementaires ou juridiques** (`BSIF E-23`, `Loi 25` / `LQ-2021-C25`, `QC-AMF-NOTE-2026`, `EU AI Act`, portée `non-avis` `AO-05` et exclusion `statut F`) ;
- `15` énoncés de **spécifications techniques datées** (`MCP 2026-07-28`, `SEP-2596/3398`, `A2A v1.0.1`, `RFC 8693/8785/9449/9943/9964`, `Transaction Tokens -11`, `FIPS 204/205`, `OTel v1.41.0 ↔ semantic-conventions-genai`, `OPA / Rego`, `FOCUS v1.4`) ;
- `15` **assertions CI `G0`** (résultats vérifiés de `execute_g0.py` dans `aq/rapports-g0.json` : couverture négative `OPA`, `4` vecteurs tiers, `10` scénarios Saga `EXIG-ORC-20`, bornes Wilson `≥ 3/p` `EXIG-EVA-03`, `24 [BLOQUANT] PRR`, `C01–C40`, `5 SBB`, `HTTP 431` `O(sauts)` vs `O(1)`).

Les points de vigilance probatoire listés au § 7 de `prd.md` sont inclus d'office dans la passe 1 lorsqu'ils figurent dans le manuscrit. Deux passes sont conduites par deux agents neufs distincts via `invoke_subagent` :

1. **Passe 1 (`seed=20270801`)**, après `G2` : recollation mot à mot par l'agent `recollateur-1` face aux fichiers `.txt` bruts `L+` et à `aq/rapports-g0.json` ; tout écart est rectifié dans le manuscrit (et dans `8 - Trousse/` si une assertion CI diverge) et revérifié jusqu'à `60 / 60` (`100 %`).
2. **Passe 2 à froid (`seed=20270802`, `0` chevauchement de `claim_loc` ni de `paragraph_loc` avec la passe 1)**, exécutée **sur le texte final et le code final** après `G4` et le lissage `G5` : l'agent `recollateur-2` vérifie la fiabilité résiduelle réelle du manuel et du dépôt compagnon. Si le score avant correction est `< 57 / 60` (`95 %`), les unités fautives retournent en barrière `G2` complète (et en `G0` si une assertion logicielle échoue), puis un nouveau tirage disjoint est effectué à graine incrémentée (`20270803`, `20270804`, …) ; toute divergence détectée à `≥ 57/60` est corrigée et recontrôlée jusqu'à `60 / 60` (`100 %`).

### 2.4 Barrière `G4` — Boucle critique de tenue éditoriale (`gauntlet-loop`, `CA-15`)

Pour garantir que ce manuel technique concis atteigne une clarté architecturale de premier plan sans sacrifier l'exactitude logicielle :

1. **Étanchéité** : invocation par `invoke_subagent` (jamais sur tableau partagé `swarm`) d'un agent `critique` neuf à chaque tour, ignorant tout des consignes de génération et de l'identité de l'extrait évalué.
2. **Barre nommée, récupérable et comparable** : extraits en français de longueur équivalente, exempts de codes bruts d'audit, tirés des passages étalons déclarés dans `manifest.json` (`3 - Compendium 2027.md`, sections `0.1`–`0.2` et `48.4`, `48.8`). Aucun texte en anglais n'entre dans la comparaison afin de préserver l'aveugle.
3. **Verdict binaire forcé** : présentation anonymisée `Texte A` / `Texte B` (ordre inversé à chaque tour), sans note sur 10. Le critique désigne le gagnant sur la précision décisionnelle, la clarté de la séparation hors modèle, le rythme de lecture et la rigueur épistémique, puis énonce **un seul écart majeur actionnable**.
4. **Garde-fou d'intégrité logicielle et factuelle** : toute réécriture effectuée par le bâtisseur durant `G4` repasse obligatoirement par **`G0` (`execute_g0.py`) + `G1` (`verifie_manuscrit.py --strict`, notamment `CA-G0-SYNC` et `CA-06`) + `G2` différentiel** afin qu'aucune amélioration stylistique ne brise la concordance `SHA-256` avec `8 - Trousse/`, n'introduise un symbole dollar non échappé ou n'ajoute d'affirmation non sourcée.
5. **Arrêt et traçabilité** : arrêt par unité sur victoire A/B, gains marginaux sur `2` tours consécutifs ou atteinte du plafond budgétaire global fixé au lancement (par défaut `15 %` du budget de la session) ; consignation complète dans `aq/gauntlet-log.md`.

### 2.5 Barrière `G5` — Lissage transversal, annexes déterministes et inspection visuelle (`CA-16` à `CA-18`)

1. **Lissage transversal (`CA-16`)** : un agent `lisseur-editorial` neuf parcourt le liminaire et les `4` chapitres dans l'ordre continu de lecture pour harmoniser les transitions inter-unités, unifier la terminologie et purger toute explication dupliquée en violation des contrats `owned_concepts` de `manifest.json`. Ses modifications se limitent aux transitions et aux redites ; son `git diff` repasse obligatoirement par **`G0` + `G1` + `G2` différentiel** avant le déclenchement de la passe 2 de `G3`.
2. **Régénération des annexes (`CA-17`)** : après clôture de `G3` passe 2, exécution automatique de `outils/genere_annexes.py` depuis les `4` registres JSON SSOT (`registre/specifications-lplus.json`, `registre/matrice-exig-prr-c40.json`, `registre/concordance-taxonomies.json`, `aq/rapports-g0.json`), `ancrage/` et `aq/`, produisant les **Annexes A et B** (`3 000` mots ± 8 %, zéro édition manuelle).
3. **Rendu triple et inspection visuelle `100 %` (`CA-18`)** : compilation via `outils/assemble_livre.py --all` du Markdown consolidé (`8 - Livre.md`), du HTML autonome (`8 - Livre 2027.html` via `Pandoc -f markdown-tex_math_dollars+tex_math_single_backslash --embed-resources`) et du PDF imprimable (`8 - Livre.pdf` via `Typst`, gabarit `6,14 × 9,21 po`, corps `10,6 pt`, blocs de code `≤ 40` L stylés `raw(block: true)`). Le PDF est converti en captures page par page et **inspecté visuellement à `100 %`** par un agent dédié dans `aq/rapport-lissage-et-visuel.md` (`0` débordement de tableau ou de bloc de code, `0` veuve/orpheline critique, `0` caractère cassé, `0` lien brisé, `0` formule `\(...\)` ou montant `\$` altéré), suivi d'une validation finale bloquante `execute_g0.py` + `verifie_manuscrit.py --strict --check-deliverables`.
