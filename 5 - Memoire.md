MÉMOIRE D’ARCHITECTURE V2.0 — LIVRE BLANC AE / AS

# Interopérabilité et Orchestration en Entreprise Agentique

Architecture de référence, patrons de solutions et trajectoire 2026-2035 — Mémoire sous forme de livre blanc à l’intention des architectes d’entreprise et des architectes de solutions

PRODUCTION AUTONOME IA — USAGE CONSULTATIF AE / AS (DC-P01) Référentiel technique et architectural produit et vérifié exclusivement par agents d’IA à des fins de consultation par les architectes d’entreprise et de solutions; ne constitue ni un avis juridique ni une homologation humaine. Licence : CC BY 4.0 (textes, figures et registres) · MIT (code, scripts et outils) — voir `Memoire/LICENSE`.

Mémoire d’architecture AE / AS — Version 2.0 (état de référence au 19 novembre 2026)

# Liminaire — À propos de ce mémoire

> **État de référence :** **19 novembre 2026** (édition **v2.0** intégrant le décloisonnement de `2026/documents/Note AMF IA.pdf`, le socle `CRE-IA-2026-01` v1.2, l’extension normative `CRE-IA-2027` **v2.0** et l’observatoire `veille_signaux.py`). Mémoire d’architecture sous forme de livre blanc conjoint AE / AS pour le secteur financier réglementé au Canada fédéral et au Québec (horizon **2026–2035**).

> **Statut de production et licence (**`DC-P01`**) :** Référentiel technique et architectural produit et vérifié exclusivement par agents d’IA à des fins de consultation par les architectes d’entreprise et de solutions ; ne constitue ni un avis juridique ni une homologation humaine. Textes, registres et figures sous licence **CC BY 4.0** ; scripts, outils, filtres et tests sous licence **MIT** (`Memoire/LICENSE` et `LICENSE` à la racine du dépôt).

> **Périmètre démontré et dossier falsifiable :** L’appareil probatoire exécutable et réglementaire du dépôt (`Borealis-Bench/`, `Borealis-Bench/feds-ema/`, monographies `Monographies/A1`, `A3` et `A4`, `CRE-IA-2026-01` v1.2 à `305 EXIG`, `Note AMF IA` et `5` profils financiers) porte exclusivement sur les **services financiers réglementés (Canada fédéral, Québec et obligations transfrontalières UE)** et sur le **génie logiciel de contrôle déterministe hors modèle** ; toute mention hors finance (`2027/`, industrie/IT-OT, santé, énergie, mines, télécoms, logistique, secteur public non financier) est explicitement balisée comme extrapolation illustrative. La proposition architecturale falsifiable unifiée, ses critères de réfutation et sa limite épistémique assumée (évaluation exclusivement artificielle FEDS, aucune validation terrain humaine) sont exposés dans `Memoire/demonstration-falsifiable-ae-as.md`.

## Statut, périmètre des quatre volumes et fermeture de `DIV-02`

Ce mémoire (édition **v2.0**, format aéré `115–125` **pages**, `DC-P09`, complété des **Annexes E et F**) opère la soudure vérifiée et la compression (~21:1 en pages) d’un corpus fermé de **quatre volumes totalisant 2 541 pages**, complétés par `2026/documents/Note AMF IA.pdf` (`49` p.), l’extension `CRE-IA-2027` **v2.0** (`2026/documents/CRE-IA-2027-v2.0.pdf`, `+12` évolutions 2027 : `MCP` 2026/2027, `OTel gen_ai.*`, `WIMSE`/`OAuth 2.1`, badges CI *Borealis-Bench*, `veille_signaux.py`) et `141` chapitres / `27` annexes (licence duale **CC BY 4.0** / **MIT**, `Memoire/LICENSE`) :

1. `C26` **— *Compendium 2026*** (`2026/documents/Compendium.pdf`, **673 p.**, 50 ch., annexes `B`, `I`, `N`, gel au 27 juill. 2026, revalidations jusqu’au 29 oct. 2026 et actualisation `Annexe N` au 1er nov. 2026) : socle analytique des protocoles, du mandat, de `OO1–OO4` `[S]`, de la matrice `0/15` `[S]` et de la sémantique d’effet ;
2. `CAD26` **— *Cadre de référence 2026*** (`2026/documents/Cadre de Référence.pdf`, `CRE-IA-2026-01` v1.2, **351 p.**, 15 ch., annexes `A–H`, 28 oct. / 19 nov. 2026) complété par `2026/documents/Note AMF IA.pdf` (`CRE-IA-2026-01-QC`, **49 p.**, **41 attentes** `AMF-G/R/C/V/P` et **12** `EXIG-AMF-01..12`) : **norme interne** établissant `12 PRIN-*` et `305 EXIG-*` **en vigueur** (`255 DOIT`, `34 NE DOIT PAS`, `16 DEVRAIT`) ;
3. `C27` **— *Compendium 2027*** (`2027/CompendiumMaster.pdf`, **1 117 p.**, 50 ch., annexes `A–H`, 14 nov. / 19 nov. 2026) : somme mixte d’exposés sourcés (`1 033` sources + lot ouvert `H1-juridique-ouvert.json`) et de 31 volets applicatifs (`31 ADR`, `75` points `PRR`) ;

4. `PD28` **— *Plan directeur 2028-2035*** (`2028-2035/PlanDirecteurMaster.pdf`, **400 p.**, `M-1` à `M-26`, annexes `A–H`, 16 nov. / 19 nov. 2026) : cible capacitaire et trajectoire `DAPP` appuyée sur `98` textes primaires `L+`, `67` ancres chronologiques (`ANC-112..121` incluses), `35` DOI *Open Access* évalués par les pairs (`Annexe H.9`) et la calibration artificielle FEDS/EMA (`DC-P12`).

Lors de la rédaction de `PD28`, l’absence du dossier `2026/` avait créé la lacune `DIV-02` (`corpus_2026_absent`), laissant les propositions sectorielles sans lien `EXIG-*` et contraignant `PD28 Annexe E.1` à reconstituer par déduction les couches de `CAD26`. L’inspection sur pièce referme intégralement cet écart (`Memoire/Master/registre/concordances.json`, `Annexe A`) : le pivot à cinq couches et trois volets est raccordé aux **six vraies couches de** `CAD26 § 5.2` (modèles et bacs à sable en *Couche 3*, mémoires épisodique/sémantique et graphes en *Couche 5*, *Systèmes d’enregistrement* en *Couche 6*), les `52 CAP` sont reliées aux `305 EXIG-*` **v1.2** (intégrant les **12** `EXIG-AMF-01..12` issues des **41 attentes** de `2026/documents/Note AMF IA.pdf` et `6` ajouts PQC/ACVM/RTR/EN 18286), et les `24 PEX` des cinq profils financiers se ventilent en `13` **spécialisations** et `11` **comblements** de lacunes de 2026.

## Textes `statut F`, hygiène probatoire et démarcation sectorielle

Aucune obligation `[N]` ne repose sur un texte demeuré au `statut F` (téléchargements HTTPS `AMF` bloqués `HTTP 403` hors `2026/documents/Note AMF IA.pdf` et `C26 Annexe N.3`, codifications `LégisQuébec`, `T-03`, `T-24`/`N-08`, `R-11`, `FDX`, `ACORD`, `CSIO`, `ISO/IEC 42001`, `ISO/IEC 42105`, `TOGAF`, `UIT-T F.748.93`, ainsi que les lots de remédiation non déposés `P1-B2` à `P1-B4` et `P3-L2` de `C27`). Le cas fictif *Groupe Boréal Inc.* (`C27 § 0.5`) est exclu comme sans valeur probante, les seuils d’ingénierie sans source primaire (`< 10 s` `[S]`, `< 15 min` `[S]`, `2 min` `[S]`, `≤ 15` outils `[S]`, `72 h` `[S]`, `≥ 85 %` `[S]`, `Shadow Mirroring` `30 jours` `[S]`, `pass^5 ≥ 99 %` `[S]`) portent obligatoirement `[S]`, et chacune des **25 ancres visant les administrations publiques du secteur gouvernemental** (`AMOPS`, *Directive sur la prise de décisions automatisée* des ministères fédéraux, `EO 14412`, `OMB M-26-15`, documents `MCN` Québec et réexamens publics européens) est séparée dans son bloc des règles régissant les **institutions financières privées**.

## Lexique des marques épistémiques et normatives

- **Marques d’énoncé :** `[D]` date officielle adoptée ; `[A]` jalon annoncé révocable ; `[C: scénarios; SIG-nnn]` conjecture sous scénarios `DAPP` sans probabilité (`A`, `B`, `C`) et signal `SIG-*` (obligatoire sur `2031–2035` hors `[D]`/`[A]`) ; `[E: EXIG-…]` / `[E: PRIN-…]` norme `CAD26` ; `[P: ID]` capacité, principe, décision, `PEX`, initiative ou porte `PD28`.
- **Lettres des grilles :** `[N]` texte `L+` lu ou norme formelle ; `[M]` étude évaluée par les pairs ; `[É]` documentation technique ou prépublication non arbitrée ; `[S]` synthèse ou construction d’auteur co-appuyée.

## Part produite par essaim d’agents et recollation (`CA-16`)

Sous le cahier des charges (`Memoire/prd.md`, dont les critères d’acceptation automatisés `CA-01` à `CA-16` sont vérifiés par `Memoire/Master/outils/verifie.py`) de l’auteur humain, ce mémoire, ses registres JSON, ses figures SVG et sa chaîne Pandoc `3.14` / Lua / Typst `0.15.1` ont été produits par un **essaim d’agents spécialisés à rôles séparés** : cadrage primaire (`lec-c26`, `lec-cad26`, `lec-c27`, `lec-pd28`, `auteur-prd`, `verif-prd`), outillage TDD (`outilleur`, `verif-socle`), registres `DIV-02` et extraction (`registraire-div02`, `extracteur-corpus`, `verif-registres`), rédaction et schémas (`redac-p1`, `redac-p2a`, `redac-p2b`, `redac-p3`, `redac-p4`, `illustrateur-svg`, `redac-synthese`), puis relecture de fond indépendante (`auditeur-fond`, critère `CA-15`) et recollation à l’aveugle (`recollateur-ca16`, critère `CA-16`) au Lot V, suivies d’un audit intégral de conformité sur pièces (`Memoire/audit.md`).

Le script `Memoire/Master/outils/echantillon.py` (`seed=20262035`) tire **40 énoncés critiques** (`10` par volume) recollationnés mot à mot sur les quatre PDF originaux : après la passe initiale du Lot V (`31 / 40`, `77,5 %` avant correction) et la remédiation d’audit, le retirage intégral a mesuré `39 / 40` **conformes (**`97,5 %`**,** `1` **écart de seuil en** `Ch. 3` **l. 15)** en Passe 1, rectifié et contre-vérifié à `40 / 40` **(**`100,0 %`**)** en Passe 2.

| Paramètre du protocole (`CA-16`) | Valeur enregistrée |
| --- | --- |
| Graine déterministe et script | `seed=20262035` (`Memoire/Master/outils/echantillon.py`) |
| Échantillon stratifié sur les 4 PDF | **40 énoncés** (`10 C26` + `10 CAD26` + `10 C27` + `10 PD28`) |
| Preuves pièce par pièce | `Memoire/Master/lots/echantillon-ca16.json` et `Memoire/Master/lots/recollation-ca16.md` |
| Conformité **avant correction** (Passe 1) | `97,5 %` (`39 / 40` conformes ; `1` écart identifié à l’aveugle sur `CA16-33` ; Lot V initial : `31 / 40`, `77,5 %`) |
| Conformité **après correction** (Passe 2) | `100,0 %` (`40 / 40` conformes vérifiés sur les 4 PDF originaux après rectification) |

# Table des matières

  - Liminaire — À propos de ce mémoire — 2
  - Synthèse exécutive — Dix thèses, deux rôles et une trajectoire AE / AS — 6
- Partie I — Le problème architectural et l’ossature commune — 9
  - Chapitre 1 — Constat empirique, thèse centrale et économie de la preuve — 10
  - Chapitre 2 — Architecture de référence unifiée, noyau possédé et réconciliation des modèles (DIV-02) — 15
- Partie II — Concevoir le tissu conjonctif et l’exécution : le chantier de l’architecte de solutions — 24
  - Chapitre 3 — Couche protocolaire (MCP, A2A, événements), passerelle à neuf contrôles et anti-verrouillage — 25
  - Chapitre 4 — Sémantique métier, compilation du contexte, mémoire CoALA et encapsulation patrimoniale/OT — 33
  - Chapitre 5 — Orchestration hybride (OO1–OO4, 8 patrons), exécution durable, sagas et sémantique d’effet — 39
  - Chapitre 6 — Autonomie graduée, classes de décision, supervision humaine et liaison cryptographique — 47
- Partie III — Bâtir la fabrique de confiance et l’exploitation : le socle partagé AE / AS — 54
  - Chapitre 7 — Fabrique de confiance : NHI, 2e saut, défense anti-injection et transition PKI / post-quantique — 55
  - Chapitre 8 — Observabilité à double couloir PII, journal d’audit JCS, évaluation E1–E3 et FinOps CPO — 63
  - Chapitre 9 — Plan d’inférence, six substrats d’état, confidentialité matérielle, résilience et réseaux B2B — 68
- Partie IV — Gouverner, conformer et cadencer la trajectoire : le chantier de l’architecte d’entreprise — 73
  - Chapitre 10 — Conformité dès la conception (Canada, Québec, UE) et déclinaison des cinq profils financiers — 74
  - Chapitre 11 — Modèle opérationnel à trois lignes, usine logicielle interne et approvisionnement réversible — 80
  - Chapitre 12 — Homologation unifiée et trajectoire adaptative (90 jours → 18 mois → Paliers P1–P3) sous signaux — 85
- Annexes — Instruments de travail de l’architecte — 92
  - Annexe A — Tables de concordance 2026-2035 et pont CAP/PEX vers EXIG-\* — 93
  - Annexe B — Catalogue de poche des décisions d’architecture AE / AS — 98
  - Annexe C — Grille unifiée d’homologation avant mise en production — 101
  - Annexe D — Guide d’orientation vers les 2 541 pages sources et bibliographie maîtresse — 105
  - Annexe E — Glossaire des sigles, acronymes et repères (`385` entrées) — 108
  - Annexe F — Bibliographie primaire sélective (`70` normes, lois et études) — 121

# Synthèse exécutive — Dix thèses, deux rôles et une trajectoire AE / AS

Ce mémoire (**v2.0**) consolide les **2 541 pages** des quatre volumes du dépôt (`C26`, `CAD26`, `C27`, `PD28`, complétés par `Note AMF IA.pdf`, 49 p., l’extension `CRE-IA-2027` **v2.0** et l’observatoire `veille_signaux.py`, état au **19 novembre 2026**) pour les **AE** et **AS** du secteur financier réglementé au Canada et au Québec (`Annexes A–F`).

## 1. Thèse centrale et contrat de lecture croisé AE / AS

Sur l’horizon **2026–2035**, **le contrôle déterministe et la capacité de preuve précèdent toute extension d’autonomie** P : PRI-001 P : PRI-002 E : PRIN-08 E : EXIG-ORC-01. Les protocoles ouverts (`MCP`, `A2A`, `CloudEvents`) règlent l’échange (`Q-A` : *qui parle* `[S]`), non l’imputabilité (`Q-E` : *qui en répond* `[S]`), où `C26 ch. 42` relève `0/15` **lien natif** `[S]` avec les règles financières. Les suites commerciales restant *ouvertes sur le fil mais fermées sur le plan de contrôle* (`C27 ch. 26`), l’institution doit **posséder son noyau de contrôle** et **confiner le modèle dans des machines à états durables (**`OO3`**/**`OO4` `[S]`**)**.

Chaque chapitre scelle un **contrat opérationnel croisé** :

- **L’`AE`** arbitre les `52` **capacités (`CAP-001` à `CAP-052`)**, les trois lignes de maîtrise, les plafonds `D1–D8 × Stades 0–4 × Classes 1–6`, les blocs neutres (`ABB`), `EXIG-APP-07..16`, le coût par résultat conforme (`CPO`) et les `15` **portes** `POR` sous `27` **signaux** `SIG`.
- **L’`AS`** conçoit et homologue les solutions substituables (`SBB`), la passerelle `PEP` à neuf contrôles, le contexte compilé, `CoALA`, les adaptateurs `EBCDIC`/`COMP-3` décimaux, les sagas et `EXIG-ORC-28`, `JCS SHA-256`/`CIBA`, `SPIFFE`/`RFC 8693`/`DPoP`, `CaMeL`, `PKI 47 j`/`ML-DSA`/`SCITT`, le double couloir `OpenTelemetry` et `E1–E3` (`pass^k`).

## 2. Les dix thèses structurantes (`T1` à `T10`)

1. `T1` **— Sobriété empirique et preuve (**`Ch. 1`**).** Malgré `19,2 %` d’usage d’IA au Canada (`40,4 %` en finance `SIG-017`), nulle étude arbitrée ne mesure `MCP` ou `A2A` en production : `68 %` des cas `MAP` ont `≤ 10` étapes (`16/20` sur flux fixes), `Nubank` (`KDD 2026`) opère cinq agents simples sans `MCP` ni `A2A`, dix étapes à 94 % tombent à `53,9 %` (Lusser), `MAST` (`C27 § 21.1`, `1 642` traces `v3` sur sept cadriciels open source sur bancs d’essai) relève `41–86,7 %` d’échecs (`44,2 / 32,4 / 23,5 %` en `v3` vs `41,77 / 36,94 / 21,30 %` en `v2`) et `METR Time Horizon v1.1 (Claude Mythos Preview)` chute de `~17,4 h` (`50 %`) à `~3,1 h` (`80 %`). Arbre : règle `N0` → flux déterministe → agent unique → multiagent sur gain mesuré E : EXIG-ORC-01 E : EXIG-ORC-02.
2. `T2` **— Architecture unifiée et `DIV-02` (`Ch. 2`, `Annexe A`).** Le pivot à **cinq couches (`C1–C5`) et trois volets (`Plans A–C`)** s’aligne sur les **six vraies couches de** `CAD26 § 5.2`, reliant les `52 CAP` aux `305 EXIG-*` **v1.2** (`12 EXIG-AMF` de `Note AMF IA.pdf`, `41` attentes, `+6` PQC/ACVM/RTR/EN 18286), prolongés par `CRE-IA-2027` **v2.0** (`+12` évolutions `MCP`, `OTel gen_ai.*`, `WIMSE`/`OAuth 2.1`, CI *Borealis-Bench* et `veille_signaux.py`). Chaque `ABB` se sépare de ses `SBB` révisés chaque trimestre (`CAD26 § 5.4`) E : EXIG-ARC-20 E : EXIG-GOV-18, sans `SQL` direct (`ADR-001`) E : EXIG-ARC-17.
3. `T3` **— Protocoles épinglés et passerelle** `PEP` **(**`Ch. 3`**).** Outils (`MCP 2026-07-28` sans état, `≤ 15` outils `[S]` `SHA-256`, migration **28 juillet 2027** D E : EXIG-MCP-22, veille `SEP-3398` **30 mars 2027** A), pairs (`A2A v1.0.1`, cartes `JWS`/`JCS`) et événements (`CloudEvents 1.0` / `AsyncAPI 3.0`, `xagentmaxhops = 4` sans renseignements personnels, `RP`, ou `PII` dans les standards techniques E : EXIG-EVT-05 E : EXIG-EVT-06) sont non substituables P : PRI-003. Face aux `102` fiches NVD citant « Model Context Protocol » (tiers, `C27 § 49.7`), tout flux franchit le catalogue E : EXIG-INT-17 et la **passerelle** `PEP` **à neuf contrôles** P : CAP-022 E : EXIG-ARC-01 E : EXIG-IAM-17.
4. `T4` **— Sémantique,** `CoALA` **et patrimoine (**`Ch. 4`**).** Le détecteur d’intention plafonnant à `27,9 %` (prépublication simulée) et `> 97 %` des jetons étant relus, les règles passent par une couche sémantique déterministe P : DEC-003 E : EXIG-INT-02, le contexte `KV-cache` filtre les `ACL` en amont sous le mandant (`ADR-008`) E : EXIG-ARC-16, et les **quatre mémoires** `CoALA` restent isolées sans écriture partagée E : EXIG-ARC-23 E : EXIG-ARC-25 sous bi-temporalité et purge `Loi 25 art. 23` E : EXIG-CON-10. Le patrimoine impose `EBCDIC`/`COMP-3` `Decimal` exact P : CAP-024, extinction sous **12 mois** des `CUA` P : INI-015 et jumeau numérique devant `OPC UA` P : CAP-028.
5. `T5` **— Enveloppe `OO3/OO4`, sagas et canal dédié (`Ch. 5`).** Sous `C26 § 29.4.1` `[S]`, `OO3`/`OO4` `[S]` s’imposent parmi **huit patrons plus une variante** (`≤ 2` sauts E : EXIG-ORC-04, `≤ 3` tours évaluateur E : EXIG-ORC-05, dix antipatrons E : EXIG-ORC-29). Le moteur durable journalise l’inférence E : EXIG-ORC-12, dérive `hex(SHA-256(JCS(["idem-v1", task_id, step_id])))` E : EXIG-ORC-21, revalide au réveil E : EXIG-AUT-17 et câble des **Sagas à point pivot** (`2` échecs → escalade E : EXIG-ORC-18) avec **canal de compensation dédié** isolé de l’arrêt (`< 10 s` `[S]` `POR-003` ; `15 min` `CAD26`) E : EXIG-ORC-17 E : EXIG-ORC-28.
6. `T6` **— Autonomie et `JCS SHA-256`/`CIBA` (`Ch. 6`).** Le croisement `D1–D8 × Stades 0–4 × Classes 1–6 × N0–N4 × P0–P3` exclut `Stade 4` en `D2` (`Stades 2–3`) et `D6` (`Stade 3` interne en `M-12`), interdit `NX`/`Classe 6` et tout `P3` solitaire E : EXIG-AUT-03 E : EXIG-AUT-09 E : EXIG-GOV-17, et plafonne à `N2` sous la règle d’or E : EXIG-AUT-07. `OpenID Connect CIBA` + `FIDO2` + `RFC 9396` lient le jeton (`≤ 15 min`, deux signataires en élevée) à `h = SHA-256(JCS(...))` P : CAP-002 E : EXIG-AUT-12 E : EXIG-AUT-15, séparent `PC3` `[S]` de `Loi 25 art. 12.1` (`≥ 1 an` E : EXIG-CON-09) et imposent vue différentielle, témoins (`POR-014`), quota manuel `> 70 %` P : INI-043 et repli `< 60 s` P : POR-015.
7. `T7` **— Confiance zéro,** `CaMeL` **et** `PKI 47 j` **/** `PQC` **(**`Ch. 7`**).** Sans norme `KYA` (`0/9` `[S]`), l’agent reçoit un `SPIFFE SVID` sans secret fixe E : EXIG-IAM-03 E : EXIG-IAM-05 et franchit le 2e saut via `RFC 8693`, `RFC 8707`, `RFC 9396`, `DPoP`/`mTLS` (`RFC 9700`) et `SSF`/`CAEP` (`≤ 15 min`) P : CAP-036 E : EXIG-IAM-08 E : EXIG-IAM-14. Sur entrée non fiable, la règle de deux retire envois et `P3` E : EXIG-SEC-06, avec `CaMeL` (`77 %` vs `84 %` E : EXIG-SEC-07) et microVM/`WASI` E : EXIG-SEC-08. Face à `TLS` **100 j** (**15 mars 2027** D `ANC-023`), **47 j** (**15 mars 2029** D `ANC-030`) et `NIST IR 8547`, l’AS déploie `ACME`, `TLS 1.3` hybride (`RFC 10024`), tampons `≥ 32 Ko`, `ML-DSA` par `kid` (`HTTP 431`) et `SCITT` (`RFC 9943`) en `SLH-DSA` (`FIPS 205`) P : CAP-040 P : POR-007.
8. `T8` **— Double couloir `RP`, audit `JCS`, substrats et `CPO` (`Ch. 8–9`).** Le collecteur `OpenTelemetry v1.41.0` (`85` attributs `Development` au registre `v1.44.0`) sépare métadonnées sans contenu E : EXIG-OBS-07 et diagnostic `≤ 14 jours` E : EXIG-OBS-08 de l’**audit à cinq éléments** `RFC 8785` ancré par heure et gardé `≥ 24 mois` E : EXIG-OBS-11 E : EXIG-OBS-12 E : EXIG-OBS-13. `E1–E3` (`≥ 50` scénarios `× 3` en `pass^k` E : EXIG-EVA-02 E : EXIG-EVA-03, `≥ 100` `[S]` en `PRR O-04`) et le `CPO` (`FOCUS 1.4`, lots `-50 %`, `POR-016`, `BSIF B-15` portée 3 fin 2028 D `ANC-106`) cadrent cinq horloges `[S]`, **six substrats** (`[S]`, `TEE.fail` `< 1 000 $ US`, `HYOK` `RTT ≤ 35 ms` conseillé), continuité bimodèle (`< 15 min` `[S]`, `72 h` `[S]`, `POR-006`) et B2B `P3` (`vLEI`, `ODRL 2.2`, Diplomate/Évaluateur, `POR-013`).
9. `T9` **— Conformité et cinq profils financiers (**`Ch. 10`**).** Une preuve unique E : EXIG-CON-18 couvre `Loi 25`, l’avis consultatif `ACVM 11-348` (`2024-12-05`, `SIG-105`), le **1er mai 2027** D (`BSIF E-23` `ANC-103` et `AMF IA` Mars/Avril 2026 en `C26 Annexe N.3`), l’`EU AI Act` (`art. 50` 2026 D `ANC-001`, Annexe III **2 décembre 2027** D `ANC-007`) et le **30 juin 2033** D (`ANC-109..111`), déclinée en `24 PEX` **(**`13 + 11`**)** : *Loi sur les services bancaires axés sur les consommateurs* (`LSAC`, `art. 171`), `art. 416` et `pacs.008` ; `OCRI 3400` et `OEO 3241` ; purge génétique `L.C. 2017, ch. 3` et PQC `20–40 ans` ; formulaires auto (*Loi sur les assureurs* `art. 71`) et `≥ 3` assureurs (`LDPSF art. 38`) ; étiquette d’entité immuable et contrats `BSIF B-10`.
10. `T10` **— Trois lignes, usine, homologation et `DAPP` (`Ch. 11–12`, `Annexes B–C`).** Un seul `A` E : EXIG-GOV-04, le registre à sept états (`6 / 12 mois`, préavis `≥ 60 jours`), la scission `Oracle` / `Bâtisseur` (`ADR-029`, mutation `≥ 85 %` `[S]`, `Shadow Mirroring` `30 jours` `[S]`, `WAP`/`ODCS v3`, zéro interpréteur libre, distillation `pass^5 ≥ 99 %` `[S]`), `EXIG-APP-07..16` et l’`Annexe C` (`305 EXIG-*` v1.2 + `75 PRR` dont `24` bloquants + `10` interdits `EXIG-GOV-17`) parent les sept modes d’échec (`M-26`).

## 3. Les six décisions conjointes AE ↔ AS

| Décision conjointe | Arbitrage `AE` | Spécification `AS` |
| --- | --- | --- |
| **1. Sobriété et topologie** | Seuil risque/valeur (`PRI-002`) face à `N0` (`CPO`) | Gain (`pass^k`) face à l’agent unique (`≤ 2` sauts) |
| **2. Noyau possédé vs** `SaaS` | Noyau (`PRI-015`), `EXIG-ARC-21` et `EXIG-APP-07..16` | Passerelle `PEP` (9 contrôles), `SHA-256` et `ABB → SBB` |
| **3. Sémantique et patrimoine** | Vocabulaire (`DEC-003`), `Loi 25` et fin `CUA` (12 mois) | Contexte (`KV-cache`, `ACL`), `CoALA` et `COMP-3` `Decimal` |
| **4. Autonomie et effets** | `D1–D8 × Classes 1–6`, `EXIG-GOV-17` et `art. 12.1` | État durable, idempotence `JCS`, Saga + `EXIG-ORC-28`, `CIBA` |
| **5. Fabrique de confiance** | `NHI` sans clé fixe, arrêt `< 10 s` `[S]` et feuille PQC `G7` | `SPIFFE` + `RFC 8693` + `DPoP`, `EXIG-SEC-06` + `CaMeL`, `kid`/`SCITT` |
| **6. Exploitation et portes** | `15 POR`, *showback* (*affichage*) → *chargeback* (*refacturation*), `27 SIG` sous 30 jours | `OTel` (`≤ 14 j`), audit `JCS` (`≥ 24 mois`), `E1–E3` et `< 60 s` |

## 4. Noyau possédé (`42 CAP` vs `10`) et trajectoire `90 j → 18 mois → P1–P3`

Le portefeuille oppose `42` **capacités invariantes sans regret** formant le **noyau possédé** (registre `CAP-047`, `NHI`/jetons `CAP-035, 036`, politiques/arrêt `CAP-037, 039`, passerelles `CAP-022, 029`, durable/sagas `CAP-007..011`, sémantique/mémoire `CAP-015..021`, télémétrie/audit/`E1–E3`/`CPO` `CAP-042..046, 049`) et `10` **capacités conditionnelles** (`CAP-004, 006, 013, 014, 025, 027, 028, 033, 034, 041`) activées sur `SIG-*` sous `A`, `B` et `C`.

- **Rampe** `90 j → 18 mois` **(**`J1–J3` **→ Niveau 3 /** `Stade 2`**) :** **90 j** (`J1`, `N0–N1` : inventaire 5 j ouvrables, zéro clé fixe, passerelle modèles, ÉFVP, arrêt) ; **9 mois** (`J2` : `PEP`, `JCS`/`CIBA`, `TLS 100 j` **15 mars 2027** D `ANC-023`, `BSIF E-23` **(**`ANC-103`**) et** `AMF IA` **(**`C26 Annexe N.3`**) au 1er mai 2027** D, `MCP 2026-07-28` **28 juillet 2027** D E : EXIG-MCP-22) ; **18 mois** (`J3` : `RIA Annexe III` **2 décembre 2027** D `ANC-007`, sagas, `E1–E3`).
- **Palier 1 (`2028–2029`, `14 s.r. + 1 cond.` `INI`, `POR-001..004` → `Stade 2`) :** six substrats (`POR-002`), *showback* `CPO`, fin des rétrofacturations (**1er octobre 2028** D `ANC-105`), `BSIF B-15` portée 3 (`fin 2028` D `ANC-106`), `TLS 1.3` hybride et `TLS 47 j` (**15 mars 2029** D `ANC-030`).
- **Palier 2 (`2030–2032`, `9 s.r. + 7 cond.` `INI`, `POR-005..009` → `Stade 3`) :** sémantique, bi-temporalité, repli bimodèle (`POR-006`), API ouvertes (`POR-008`), *chargeback* et `POR-007` (`ML-DSA` `kid`, `SCITT`) sur le repère financier `G7` `2030–2032` A (`ANC-040`, distinct des échéances propres aux administrations publiques) C : A, B, C ; SIG-009.
- **Palier 3 (`2033–2035`, `4 s.r. + 6 cond.` `INI`, `POR-011..014` → `Stade 3` / `Stade 4` sélectif hors `D2` `2–3` et `D6` `3` interne `M-12`) :** post-**30 juin 2033** D (`ANC-109..111`, `POR-012`), mandats `vLEI` (`POR-013`) et PQC financier `G7` **2035** A (`ANC-043`) C : A, B, C ; SIG-009, SIG-108, sous `INI-051, 052`, `POR-015` (`< 60 s`) et `POR-016`.

# Partie I — Le problème architectural et l’ossature commune

Chapitre 1 — Constat empirique, thèse centrale et économie de la preuve

Chapitre 2 — Architecture de référence unifiée, noyau possédé et réconciliation des modèles (DIV-02)

## Chapitre 1 — Constat empirique, thèse centrale et économie de la preuve

> **Ancrage corpus (état de référence : 17 novembre 2026) :** `[C26 ch. 1, 7, 35, 42, 43, 49, 50, Annexe B, Annexe N]` · `[CAD26 ch. 1, 2, 4 | PRIN-08, ch. 7 | EXIG-ORC-01, EXIG-ORC-02, ch. 8, 10 | EXIG-EVA-02, EXIG-EVA-03, EXIG-FIN-01, Annexe H]` · `[C27 § 0.2, § 0.5, ch. 1–4, 16, 17, 21, 34, 40, 42, 47, 48–50, Annexe E, Annexe F, Annexe G]` · `[PD28 M-1, M-2, M-6 à M-8 | PRI-001, PRI-002, CAP-007, CAP-043, CAP-045, SIG-001, SIG-013, SIG-017, ANC-045, ANC-046]`.

*Question directrice : Que sait-on réellement de la production agentique fin 2026, et comment bâtir une architecture durable sans céder aux effets d’annonce ni aux bancs d’essai saturés ?*

**Thèse du chapitre :** Fin 2026, aucune étude évaluée par les pairs ne documente les protocoles d’outils ou d’agents à grande échelle en production `[M]`. La majorité des déploiements exécutent au plus dix étapes sous supervision humaine `[M]`. De plus, les protocoles d’échange n’offrent aucun arrimage natif aux lois applicables `[N]`. Sur l’horizon 2026–2035, le contrôle déterministe et la capacité de preuve précèdent donc toute extension d’autonomie P : PRI-001 P : PRI-002 P : CAP-007 E : PRIN-08 E : EXIG-ORC-01 E : EXIG-ORC-02.

### 1.1 Adoption mesurée fin 2026 et règle « soutien n’est pas production »

L’architecte d’entreprise (AE) et l’architecte de solutions (AS) séparent l’usage général de l’IA, le déploiement effectif d’agents et le discours fournisseur. Au deuxième trimestre de 2026, Statistique Canada mesure 19,2 % d’utilisateurs d’IA sur douze mois parmi les entreprises canadiennes. Ce taux atteint 27,8 % chez les organisations de 100 employés et plus, et 40,4 % en finance et assurances. À titre indicatif non directement comparable, Eurostat relève ~8 % dans les PME et 20,0 % dans l’Union européenne en 2025 (≥ 10 salariés ; `C27 ch. 4 § 4.1`, `ch. 50 § 50.4` ; `PD28 M-2 § 2.2`, `M-7 § 7.5`, `SIG-017`). Au troisième trimestre, les intentions atteignent 25,2 % (37,5 % dans les grandes entreprises). La Banque du Canada confirme toutefois la rareté des mises en production (`PD28 M-2 § 2.2`).

Aucun office statistique n’isole encore les agents fin 2026. Statistique Canada lancera TechStat dès 2027 A (`ANC-045`). La stratégie *« L’IA pour tous »* vise 60 % d’adoption IA d’ici 2034 A (`PD28 M-7 § 7.5`, `ANC-046`). Au Québec, le recensement de 432 initiatives d’IA dans les ministères et organismes des administrations publiques n’isole pas les agents. Il ne mesure aucun effet en service et ne s’extrapole pas aux institutions privées (`C27 ch. 42 § 42.1, § 42.5`).

Sur le terrain, l’étude `MAP` (*Measuring Agents in Production*, 20 cas et 306 réponses dont 86 systèmes déployés) montre des systèmes bornés. Ainsi, 68 % exécutent au plus dix étapes avant intervention humaine et 16 cas sur 20 (80 %) suivent des flux prédéfinis. Par ailleurs, 70 % emploient des modèles standards sans réentraînement et 74 % reposent sur l’évaluation humaine (`C27 ch. 4 § 4.2`, `ch. 42 § 42.1` ; `PD28 M-2 § 2.2`, `SIG-013`). Ni les 789 sources de `C27 ch. 1–47` ni la revue rapide du 13 novembre 2026 sur Consensus ne recensent d’étude arbitrée mesurant `MCP` ou `A2A` en production (`C27 ch. 42 § 42.6`, `ch. 48 § 48.1–48.3`). Cette revue couvre 10 requêtes et 123 notices, dont 83 retenues et lues sur résumé seulement (31 évaluées par les pairs, 52 prépublications). L’unique cas évalué par les pairs à grande échelle sur trafic réel (`Nubank`, `KDD 2026`) orchestre cinq agents ReAct simples sur graphes déterministes. Il progresse en libre-service mais reste inférieur aux experts humains. Il exige aussi une réingénierie d’invites lors de la migration `GPT-4.1 → GPT-5` et n’utilise ni `MCP`, ni `A2A`, ni multiagent autonome (`C27 ch. 42 § 42.1–42.2`).

D’où la règle de `C26 ch. 7 § 7.6` et `ch. 35 § 35.0` : *« soutien » n’est pas « production »*. Les communiqués d’institutions canadiennes (`TD` `S-014, S-015`, `RBC` `S-016, S-017`, `Scotiabank` `S-018`, `Manuvie` `S-019`, `CIBC` `S-028`, `BMO` `S-045`, `Sun Life` `S-046`) documentent des intentions ou des volumes auto-déclarés. Il en va de même pour les rapports annuels 2025 (`Desjardins` `S-021`, `Intact` `S-029`) ou l’absence documentée (`Banque Nationale`, `C26 § 35.8.3, § 35.9`, `Annexe B`). Aucun de ces documents ne décrit une architecture d’exécution ni des métriques vérifiées de production.

### 1.2 Défaillances systémiques, loi de Lusser, bancs saturés et marché

Selon la loi de Lusser, sans validation déterministe intermédiaire, dix étapes consécutives fiables chacune à 94 % tombent à 𝑅 = 0,94^{10} ≈ 53,9 % (`C27 § 0.2`, `ch. 17 § 17.8`, `ch. 21 § 21.1`). Sur 10 000 dépôts SEC, l’exactitude d’extraction plafonne à 0,758 par document (`C27 ch. 42 § 42.3`). La résolution autonome d’incidents TI plafonne entre 10 % et 25 % (`§ 42.4`). Selon Kim et coll., l’ajout d’agents varie de `-70 %` sur tâches séquentielles couplées à `+80,8 %` sur sous-tâches parallélisables (`C27 ch. 16 § 16.7`, `ch. 48 § 48.4`).

La taxonomie `MAST` (Cemri et al., 1 642 traces en `v3` sur sept cadriciels open source, 41 % à 86,7 % d’échecs) prouve que la défaillance est d’abord architecturale. Elle regroupe quatorze modes en trois familles (`C27 ch. 21 § 21.1–21.4` ; `CAD26 § 7.9` ; `PD28 M-6 § 6.2`). La spécification et la conception système comptent pour `44,2 %` en `v3` (`41,77 %` en `v2`). Le désalignement inter-agents pèse `32,4 %` en `v3` (`36,94 %` en `v2`), et la vérification/terminaison `23,5 %` (`21,30 %` en `v2`). L’audit de 168 bancs publics relève en outre des défauts critiques dans plus de 25 % des tâches (`C27 ch. 48 § 48.5`). Après saturation du seuil de 16 h, `METR` a gelé sa série le 8 septembre 2026. `METR Time Horizon v1.1 (Claude Mythos Preview)` atteint ~17,4 h à 50 % de réussite (IC : 8,5 à 55 h, génie logiciel/ML/cyber). Toutefois, cet horizon chute à ~3,1 h à 80 % de constance, soit un écart de 5 à 6 fois (`C27 ch. 49 § 49.2` ; `PD28 M-2 § 2.1.2`, `M-6 § 6.1–6.2`, `SIG-013`).

Les estimations de marché exigent le même tri (`C27 ch. 50 § 50.1–50.5` ; `PD28 M-7 § 7.1`). En 2025, un écart de 1 à 58 (1,5 à 88 G$ US) confond six périmètres emboîtés. Le recalibrage sur treize séries non indépendantes donne 8 à 17 G$ US en 2027 et 25 à 55 G$ US en 2030 (`C27 § 50.2`). Les agents pèsent 1,1 % des dépenses mondiales en IA et 21 % des organisations ont une gouvernance dédiée (`C27 § 50.4`). Au Canada, 30,0 % des grandes entreprises citent cybersécurité et confidentialité comme premier frein (`PD28 M-2 § 2.2`). Enfin, Gartner projette (communiqué du 26 mai 2026 sans méthode publiée) l’abandon ou la rétrogradation de 40 % des projets autonomes d’ici fin 2027 A (`CAD26 § 2.1, § 8.1` ; `C27 § 4.3`).

### 1.3 Thèse centrale, fractures du corpus et économie de la preuve

Ce mémoire condense (~21:1 en v1.2) un corpus fermé de 2 541 pages (complété par `Note AMF IA`, 49 p., 141 chapitres, 27 annexes). Il résorbe cinq fractures : volume et redondances, lacune `DIV-02`, prolifération des couches et échelles, asymétrie probatoire et coupure AE / AS.

| Volume | Mesure et gel | Statut | Apports majeurs | Limites héritées |
| --- | --- | --- | --- | --- |
| `C26` | 673 p., 50 ch., Ann. B, I, N (27 juill., reval. 29 oct., 1er nov. 2026) | Analytique | `LCIM` `[S]`, `Q-A..Q-E` `[S]`, 2e saut, `OO1–OO4` `[S]`, `0/15` `[S]`, `Z1–Z5` & `PC1–PC5` `[S]`, effets `ch. 48` | Constructions d’auteur à 0 entrée au socle (`ch. 41, 43, 47, 48` `[S]`) |
| `CAD26` | 351 p. (+ `Note AMF IA` 49 p.), 15 ch., Ann. A–H (28 oct. / 19 nov. 2026) | Normatif (`305 EXIG-*` v1.2) | `12 PRIN`, 6 couches `§ 5.2`, `ABB`/`SBB`, `CoALA`, 8 patrons, `N0–N4`, `JCS`/`CIBA`, `CaMeL`, `EXIG-AMF-01..12` | Textes HTTPS AMF bloqués (`statut F`) compensés par `Note AMF IA` ; horizon 2030 |
| `C27` | 1 117 p., 50 ch., Ann. A–H (14 / 19 nov. 2026) | Mixte (`59,6 %` / `34,9 %` [`34,87 %`]) | `1 033` sources, `COMP-3`, `OPC UA`, durable/Saga, double couloir `RP`, `CPO`, `31 ADR`, `75` PRR (`24` bloquants) | 31 volets à `0` source ; `255/473` lignes `[S]` (`53,9 %`) ; cas fictif *Groupe Boréal* exclu ; `16 ADR` généralisées |
| `PD28` | 400 p., `M-1..26`, Ann. A–H (16 / 19 nov. 2026) | Cible AE et `DAPP` | `67` ancres (`98` textes `L+`), `15 PRI`, `52 CAP` (`42` inv., `10` cond.), `12 DEC`, `24 PEX`, `43 INI`, `15 POR`, `27 SIG` | Lacune `DIV-02` close par concordances typées (`DC-P07`) ; zéro patron d’implémentation AS |

> **[Figure]**
> - Cartographie du corpus (2 541 p. + Note AMF IA) et fermeture DIV-02 Soudure vérifiée au 19 nov. 2026 des quatre volumes vers le mémoire AE / AS v2.0
> - C26 · Compendium 2026 (673 p.)
> - 50 ch. · Ann. B, I, N (1er nov. 2026)
> - LCIM [S], Q-A..Q-E [S], 2e saut
> - OO1–OO4 [S], PQC, ch. 48 [S]
> - Matrice 0/15 & Z1–Z5 [S]
> - CAD26 · CRE-IA v1.2 (351 p. + AMF 49 p.)
> - 15 ch. · Ann. A–H + Note AMF IA
> - 12 PRIN · 6 vraies couches § 5.2
> - 305 EXIG-\* (255+34+16, +12 AMF)
> - 10 interdictions GOV-17 (46 ND)
> - C27 · Compendium 2027 (1 117 p.)
> - 50 ch. · Ann. A–H (1 033 sources)
> - 31 ADR · 75 PRR (24 bloquants)
> - COMP-3, Saga, CoALA, Double PII
> - FinOps CPO & cas fictif exclu
> - PD28 · Plan directeur 28–35 (400 p.)
> - 26 ch. (M-1..M-26) · 98 textes L+
> - 67 ancres · 15 PRI · 12 DEC
> - 52 CAP (42 inv. + 10 cond.)
> - 24 PEX · 43 INI · 15 POR · 27 SIG
> - Socle consolidé : 2 541 p. + Note AMF (49 p.) · 141 ch. · 27 annexes
> - 1. Fermeture DIV-02 (DC-P07)
> - 52 CAP ↔ 305 EXIG-\* v1.2
> - 24 PEX (13 spéc. + 11 lacunes)
> - 5 couches + 3 volets ↔ 6 CAD26
> - Liens typés : directe / ext. / lacune
> - 2. Économie de la preuve
> - [N] Droit L+ · [M] Études revues
> - [É] Specs tech. · [S] Construits
> - [D] adopté · [A] annoncé · [C]
> - Cas fictif exclu · statut F borné
> - Mémoire AE / AS v2.0 — 115–125 p. (Ch. 1–12 & Annexes A–F)
> - Architecte d’entreprise (AE)
> - 52 CAP, noyau possédé, 5 profils
> - 15 POR, 27 SIG, 3 lignes & APP
> - Architecte de solutions (AS)
> - PEP 9 contrôles, CoALA, Saga OO3
> - JCS/CIBA, SPIFFE/PQC, double PII

*Fig. 1. – Cartographie des 2 541 pages du corpus (+ Note AMF IA), hiérarchie de la preuve et fermeture structurelle de la lacune DIV-02.*

Sur l’horizon 2026–2035, les protocoles ouverts (`MCP`, `A2A`) règlent l’échange syntaxique (`Q-A` : *qui parle* `[S]`). À l’inverse, le droit exige l’imputabilité et la preuve d’instance (`Q-E` : *qui en répond* `[S]`). Or `C26 ch. 42` constate `0/15` lien natif `[S]` entre protocoles et exigences financières selon trois vides (`§ 42.3.1`). Le *vide de socle* initial sur l’AMF a été documenté le 31 octobre 2026 en `Annexe N.3`, sans lien protocolaire. Le *vide de texte* porte sur la norme bancaire ouverte (*Loi sur les services bancaires axés sur les consommateurs*, `LSAC`). Enfin, le *vide de protocole* subsiste face à `BSIF E-23`, à l’article 12.1 de la Loi 25 et à `ACVM 11-348`.

Quatre régimes de preuve gouvernent le mémoire. Le niveau `[N]` couvre les textes `L+` lus (`98` en `PD28 Annexe H`) et le socle `CAD26` v1.2 de `305 EXIG-*` (`255 DOIT`, `34 NE DOIT PAS`, `16 DEVRAIT`, intégrant les `12 EXIG-AMF`). Le niveau `[M]` désigne les mesures évaluées par les pairs, `[É]` les spécifications techniques ou prépublications, et `[S]` les constructions d’auteur co-appuyées (`C26` et les 31 volets de `C27`). Le cas fictif *Groupe Boréal Inc.* (`C27 § 0.5`) est exclu comme sans valeur probante. Toute cible sans source primaire (`< 10 s` `[S]`, `< 15 min` `[S]`, `≤ 15` outils `[S]`, `72 h` `[S]`, `≥ 85 %` `[S]`, `30 j` `[S]`, `pass^5 ≥ 99 %` `[S]`) porte obligatoirement `[S]`.

### 1.4 Sobriété agentique, hypothèses H1–H6 et parcours adaptatifs DAPP

L’AE et l’AS appliquent l’arbre de sobriété (`C26 § 43.2.3`, statut « C » hors socle, `[S]` ; `C27 Annexe F.3` `[S]`) P : PRI-001 P : PRI-002 E : PRIN-08 E : EXIG-ORC-01 E : EXIG-ORC-02. Ils privilégient d’abord la règle déterministe (`N0`), puis le flux déterministe à étapes cognitives bornées. Ils n’ouvrent l’agent unique outillé (patron 8) qu’en cas d’entrées non structurées. Enfin, le multiagent homologué (`≤ 2` sauts) exige un gain mesuré (`pass^k`) et un avantage en coût complet par résultat conforme (`CPO`) face au repère non agentique P : CAP-043 P : CAP-045 E : EXIG-EVA-02 E : EXIG-FIN-01.

Les hypothèses `H1–H6` (`C27 § 4.5` réévaluées en `PD28 M-2 § 2.2`) confortent ce cadre avant `BSIF E-23` au 1er mai 2027 D. Les hypothèses `H1` (grandes entreprises), `H2` (agents bornés supervisés) et `H3` (primauté de l’architecture) sont confirmées. Il en va de même pour `H4` (`MCP`/`A2A` acquis sur le fil ; `WIMSE`, `DAWN` et `OpenTelemetry` en chantier). Par ailleurs, `H5` (plans de contrôle multiples) se renforce et `H6` (tri valeur/risque) est en cours.

Au-delà de 2030, la méthode `DAPP` (Haasnoot et al., `PD28 M-1 § 1.4`, `M-8`) gouverne l’incertitude jusqu’en 2035 sans probabilité chiffrée. Elle mobilise `27` signaux (`SIG-001..017`, `SIG-101..110`) et `15` portes (`POR-001..009`, `POR-011..016`) sur trois scénarios C : A, B, C ; SIG-001, SIG-013. Le **Scénario A (*Socle étendu*)** mise sur une convergence ouverte. Le **Scénario B (*Archipel*)** décrit des silos propriétaires fermés sur le contrôle. Le **Scénario C (*Blocs*)** suppose une fragmentation exigeant la souveraineté stricte des substrats et des clés jusqu’en 2035 C : C ; SIG-002, SIG-016.

Contrat opérationnel croisé — Architecte d’entreprise (AE) | Architecte de solutions (AS)

Décisions AE

1. Imposer la sobriété (« le contrôle précède l’autonomie ») P : PRI-001 P : PRI-002 E : PRIN-08 E : EXIG-ORC-01 et refuser tout financement agentique là où `N0` suffit.
2. Exiger `[N]/[M]/[É]/[S]` dans chaque dossier : écarter les prévisions de marché au profit du seul `CPO` P : CAP-045 E : EXIG-FIN-01.
3. Piloter selon `DAPP` sur `A`, `B` et `C` sans probabilité, en finançant d’abord les 42 capacités invariantes sans regret.

Spécifications AS

1. Appliquer l’arbre (`C27 Annexe F.3` `[S]`) E : EXIG-ORC-01 E : EXIG-ORC-02 : code/*Decision Model and Notation* (`DMN`, `N0`) → flux déterministe → agent unique → multiagent sur gain `pass^k` P : CAP-043.
2. Contrer Lusser (0,94^{10} ≈ 53,9 %) et les 14 modes `MAST` par schémas JSON, invariants hors modèle et points de contrôle persistés P : CAP-007.
3. Qualifier chaque agent sur un banc interne versionné de `≥ 50` scénarios incluant cas limites et injections E : EXIG-EVA-02 (`≥ 100` `[S]` dans `C27 PRR O-04`).

### 1.5 Grille de décision

| Décision | Option par défaut | Quand s’en écarter | Preuve |
| --- | --- | --- | --- |
| Agent autonome vs flux programmé | Automatisation déterministe ou flux codé à étapes bornées (`N0` / patron 1) | Entrées non structurées rendant le codage exhaustif impraticable, sous enveloppe déterministe E : EXIG-ORC-01 | `[M]` `MAP` (`68 %` `≤ 10` étapes, `16/20` flux fixes) ; `CAD26` `PRIN-08` |
| Agent unique outillé vs multiagent | Agent unique doté d’outils d’intention métier et de contexte compilé (patron 8) | Gain net mesuré sur banc interne ou séparation stricte de domaines de sécurité E : EXIG-ORC-02 | `[M]` `MAST` (`1 642` traces) ; `C27` § 16.7 (`-70 %` à `+80,8 %`), § 48.4 |
| Qualification avant mise en production | Simulation isolée (`≥ 3` essais E : EXIG-EVA-03) mesurant la constance `pass^k` (`0,95` à `0,99` `[S]` selon criticité, `C27 ADR-022` / `PRR F-15`) | Tâche consultative sans écriture (`Classe 1` / `N1`), soumise aux tests d’ancrage documentaire | `[M]` `[S]` `C27` § 48.5 (`> 25 %` bancs viciés), § 49.2 (`METR`) ; `CAD26` `EXIG-EVA-03` |
| Justification économique d’un projet | Coût complet par résultat conforme non rouvert (`CPO`) comparé à la base non agentique E : EXIG-FIN-01 | Jamais en production ; les prévisions macroéconomiques ne fondent aucun dossier d’affaires | `[É]` `C27` § 40.5, § 50.2 (`13` séries non indépendantes) ; `PD28` `CAP-045` |
| Appui d’une prescription architecturale | Exigence normative (`CAD26`), texte primaire `L+` ou mesure évaluée par les pairs | Patron issu d’un volet `C27` ou d’un cadre `C26`, uniquement étiqueté `[S]` et co-appuyé | `[S]` `PD28` M-1 § 1.3 ; `C26` Annexe B ; `C27` Annexe E.1 |
| Planification pluriannuelle (2027–2035) | Parcours adaptatifs `DAPP` sans probabilité (`A`, `B`, `C`) gouvernés par signaux `SIG-*` | Échéances adoptées à date ferme D, exécutées par rétroplanning calendaire strict | `[M]` Haasnoot et al. (`DAPP`, `PD28` M-1 § 1.4, M-8 § 8.1) |

### 1.6 Limites et renvois

Les PDF primaires de l’AMF bloqués en HTTPS (`T-01`, `T-02`, `T-13..15`), les codifications LégisQuébec et les lots non déposés `P1-B2` à `P1-B4` et `P3-L2` restent au `statut F`. Ils ne fondent aucune obligation `[N]` nouvelle. Toutefois, `2026/documents/Note AMF IA.pdf` (`CRE-IA-2026-01-QC`, 41 attentes et `12 EXIG-AMF`, recoupée avec `C26 Annexe N.3`) est intégrée au socle `CAD26` v1.2 (`305 EXIG-*`). En outre, `C27` et `PD28` n’ont pas subi de relecture humaine intégrale. Les dissonances internes des volets — telle `ADR-009` adoptant `Apache Ossie` `0.1.1` en incubation sans moteur (`C27` p. 250 face à l’Extrait 12.1 p. 240 en `"1.0.0"`) — sont neutralisées (Annexe B). Renvois : `C26 ch. 1, 7, 35, 42, 43, 49, 50, Ann. B, N` ; `CAD26 ch. 1, 2, 4, 7, 8, 10, Ann. H` ; `C27 § 0.2, 0.5, ch. 1–4, 16, 17, 21, 34, 40, 42, 47, 48–50, Ann. E, F, G` ; `PD28 M-1, M-2, M-6 à M-8` ; Annexes A à F.

## Chapitre 2 — Architecture de référence unifiée, noyau possédé et réconciliation des modèles (DIV-02)

> **Ancrage corpus (état de référence : 17 novembre 2026) :** `[CAD26 Sommaire exécutif, ch. 4 | PRIN-01..12, ch. 5 § 5.1–5.5, Tableau 12 | EXIG-ARC-01..25, ch. 11 | EXIG-GOV-07, EXIG-GOV-08, EXIG-GOV-16, EXIG-GOV-17, EXIG-GOV-18, ch. 12 | EXIG-CON-02, EXIG-CON-06, ch. 13, 14, Annexes A, D, H]` · `[C26 ch. 7 § 7.5, ch. 41 § 41.1, ch. 42–44]` · `[C27 § 0.1, § 0.4, ch. 1, 20, 23, 26, 27, 43, Annexe F]` · `[PD28 M-2 § 2.4, M-9 à M-13 | PRI-001..015, CAP-001..052, DEC-001..012, PEX-041, Annexe E]`.

*Question directrice : Quelle ossature architecturale unique permet à l’AE et à l’AS de parler le même langage entre le cadre normatif 2026, le compendium 2027 et la cible 2035 ?*

**Thèse du chapitre :** Les cadriciels d’agents rompent leur compatibilité en moins de douze mois `[M]`, et les suites commerciales demeurent fermées sur le plan de contrôle `[É]`. La confrontation sur pièce des quatre volumes ferme `DIV-02`. Elle raccorde les six couches normatives de 2026 aux cinquante-deux capacités cibles de 2028–2035 `[N]`. L’institution réglementée doit posséder son noyau de contrôle et fédérer les silos selon la gravité des données. Elle sépare chaque bloc d’architecture neutre (`ABB`) de ses solutions substituables (`SBB`) P : PRI-001 P : PRI-015 P : DEC-007 E : EXIG-ARC-01 E : EXIG-ARC-17 E : EXIG-ARC-19 E : EXIG-ARC-20 E : EXIG-ARC-21.

### 2.1 Réconciliation sur pièce des quatre découpages et fermeture de DIV-02

Les quatre volumes juxtaposent quatre découpages : six couches et deux piliers (`C27 § 0.1`), six couches et cinq points de contrôle (`C26 ch. 43`), six couches et trois plans transversaux (`CAD26 § 5.2–5.3`), puis cinq couches et trois volets (`PD28 M-9`). Faute d’accès au dossier `2026/`, `PD28 Annexe E.1` avait reconstitué par déduction les couches de `CAD26`. Elle avait aussi marqué les vingt-quatre `PEX` du statut provisoire `corpus_2026_absent` (`DIV-02`). L’inspection sur pièce de `CAD26` (`CRE-IA-2026-01` v1.2, pp. 37–43) résorbe cet écart.

Sur l’horizon 2026–2035, le mémoire retient le pivot de `PD28 M-9` : **cinq couches horizontales (`C1` à `C5`) et trois volets de contrôle (`Plan A`, `Plan B`, `Plan C`)**. Ce pivot dérive de `C27 ch. 23 § 23.1`, palliant l’absence de pilier registre en `C27 § 0.1`. Confronté à `CAD26 § 5.2`, il rétablit les **six vraies couches normatives de 2026** et rectifie trois suppositions de `PD28 Annexe E.1` :

1. **Couche 1 — Canaux et déclencheurs** (`CAD26` p. 37) : interfaces et déclencheurs authentifiant le mandant et ouvrant la trace, zéro logique ni invite E : EXIG-ARC-03 E : EXIG-ARC-04 (`C1 interaction`, Couche 5 de `C27 § 0.1`).
2. **Couche 2 — Orchestration et état** (`CAD26` pp. 37–38) : moteur durable, routeur sans octroi de droit, `A2A` et mémoire de travail E : EXIG-ARC-05 E : EXIG-ARC-06 E : EXIG-ARC-07, distincts de la boucle d’agent en Couche 3 (réunis sous `C2`).
3. **Couche 3 — Agents et exécution cognitive** (`CAD26` pp. 38–39) : boucle d’agent, mémoire procédurale, **passerelle de modèles** (alias sous `EXIG-ARC-09`, `DEVRAIT`) et **bac à sable de code** E : EXIG-ARC-08 E : EXIG-ARC-09 E : EXIG-ARC-10 E : EXIG-ARC-24. *Rectification 1* : modèles et confinement siègent en Couche 3 de `CAD26` (non en Couche 6 supposée), soit `C5 modeles`.

4. **Couche 4 — Médiation et connectivité** (`CAD26` pp. 39–40) : passerelle d’agents (`PEP`), catalogue d’entreprise et bus d’événements E : EXIG-ARC-01 E : EXIG-ARC-11 E : EXIG-ARC-12 E : EXIG-ARC-13.
5. **Couche 5 — Outils et données** (`CAD26` pp. 40–41) : serveurs `MCP`, adaptateurs `OpenAPI` (`EXIG-ARC-15`, `DEVRAIT`), index, graphes et mémoires épisodique et sémantique E : EXIG-ARC-15 E : EXIG-ARC-16 E : EXIG-ARC-22 E : EXIG-ARC-23 E : EXIG-ARC-25. *Rectification 2* : nulle Couche 3 « Connaissance » dans `CAD26` ; `C3 contexte-connaissance` couvre Couches 2, 3 et 5.
6. **Couche 6 — Systèmes d’enregistrement** (`CAD26` p. 41) : cœurs bancaires, assurantiels, ERP et CRM gardant intégrité métier et référence de trace (`EXIG-ARC-18`, `DEVRAIT`) E : EXIG-ARC-14 E : EXIG-ARC-17 E : EXIG-ARC-18. *Rectification 3* : l’enregistrement siège en Couche 6 (non C5), encapsulé sous `C4 acces`.

Les trois plans transversaux s’alignent terme à terme entre `PD28 M-9 § 9.2` et `CAD26 § 5.3` (p. 42). L’Annexe A relie ainsi les `52/52` capacités aux `305/305` **exigences** `CAD26` **v1.2** (`255 DOIT`, `34 NE DOIT PAS`, `16 DEVRAIT`, intégrant `12 EXIG-AMF` et `6` ajouts PQC/ACVM/RTR/EN 18286). Chaque lien porte un type explicite (`couverture_directe`, `ancrage_extension` ou `comble_lacune_2026`). Les `24/24` `PEX` se ventilent en `13` **spécialisations** et `11` **comblements** de lacunes de 2026 (`LSAC` art. 171, muraille art. 416, `ISO 20022 pacs.008` du *Real-Time Rail* `RTR`, `OCRI 3400/3241`, `NI 31-103`, `L.C. 2017, ch. 3`, post-quantique vie/rentes, `LDPSF` et `BSIF B-15`).

> **[Figure]**
> - Architecture unifiée (5 couches + 3 volets) ↔ 6 couches CAD26 § 5.2 Résorption DIV-02 et frontière noyau de contrôle possédé / suites SaaS
> - Pivot PD28 (5 couches) DIV 6 vraies couches CAD26 § 5.2
> - C1 · Interaction CAP-001..006
> - Canaux, CIBA, Loi 25
> - C2 · Agents & orch. CAP-007..014
> - OO3/OO4 [S], Saga, A2A
> - C3 · Contexte & conn. CAP-015..021
> - ACL, sémantique, CoALA
> - C4 · Accès & outils CAP-022..028
> - PEP, MCP, COMP-3, OT
> - C5 · Modèles CAP-029..034
> - Routage, MicroVM, 6 sub.
> - 1. Canaux & déclencheurs
> - Zéro logique · ARC-03..04
> - 2. Orchestration & état
> - Durable, A2A, mém. trav.
> - 3. Agents & exéc. cognit.
> - Agents, modèles, MicroVM
> - 4. Médiation & connect.
> - PEP, catalogue, bus EVT
> - 5. Outils & données
> - MCP, index, mém. ép./sém.
> - 6. Syst. d’enregistrement
> - Cœurs via API · ARC-17
> - Noyau de contrôle possédé — 42 CAP invariantes (Plans A, B, C)
> - Plan A · Identité
> - NHI SPIFFE, RFC 8693
> - PDP hors modèle, PQC
> - Plan B · Obs./FinOps
> - Double couloir, JCS
> - Éval. E1–E3 & CPO
> - Plan C · Gouvernance
> - Registre 7 états, E-23
> - 3 lignes & clauses APP
> - Frontière SaaS & SBB remplaçables (EXIG-ARC-21) :
> - Mono-silo sous PEP, NHI propre, export OTel, arrêt propre (max N2)
> - DIV-02 : Modèles en C3 CAD26 (non C6) · C3 Contexte → C2/C3/C5 · C6 Enreg.

*Fig. 2. – Architecture de référence unifiée à 5 couches et 3 volets de contrôle, raccordement exact aux 6 couches de CAD26 § 5.2 (fermeture DIV-02) et délimitation du noyau possédé face aux suites SaaS.*

| Pivot (`PD28 M-9` / `C27 § 23.1`) | `CAD26 § 5.2–5.3` (6 couches + 3 plans) | `C26 ch. 43` | `C27 § 0.1` (6 couches + 2 piliers) | Rattachement `CAP` / `EXIG-*` |
| --- | --- | --- | --- | --- |
| **C1.** `interaction` | Couche 1 : Canaux et déclencheurs | Nulle couche UI (`Tab. 43.1` `[S]`) ; `Z2 → PC3` `[S]` en C3 | C5 Interaction humain-agent | `CAP-001..006` (`4` inv., `2` cond.) ; `EXIG-ARC-03, 04, EXIG-AUT-09, 12..16, 19..23` |
| **C2.** `agents-orchestration` | Couche 2 : Orchestration et état + volet Agents (C3) | C3 Orchestration (`OO1–OO4, PC1–PC3, Z2` `[S]`), C1 `A2A` | C4 durable + C3 horizontale | `CAP-007..014` (`6` inv., `2` cond.) ; `EXIG-ARC-02, 05..07, 13, EXIG-INT-04, 05, 11, 22, EXIG-ORC-01..30, EXIG-A2A-01..15, EXIG-EVT-01..10, EXIG-AUT-17` |
| **C3.** `contexte-connaissance` | Travail (C2), procédurale (C3), Couche 5 : Outils et données | Nulle couche dédiée (`Tab. 43.1` `[S]`) ; `ch. 2, Z5, PC4` `[S]` | C2 Sémantique, contexte, mémoire | `CAP-015..021` (`7` inv.) ; `EXIG-ARC-16, 22..25, EXIG-INT-01, 02, 12..16, 19` |
| **C4.** `acces` | C4 Médiation et connectivité, C5 Outils et données, C6 Systèmes d’enregistrement | C4 Maillage (`ch. 37`), C1 `MCP`, `Z4` `[S]` | C1 IT/OT + C3 fédération | `CAP-022..028` (`4` inv., `3` cond.) ; `EXIG-ARC-01, 11, 12, 14, 15, 17, 18, 21, EXIG-INT-03, 06, 07, EXIG-MCP-01..22` |
| **C5.** `modeles` | Couche 3 : Agents et exécution cognitive (modèles, confinement) | Nulle couche modèles/bacs (`Tab. 43.1` `[S]`) ; `PC5/Z5` `[S]` en C4 | Socle silicium, confinement, inférence | `CAP-029..034` (`4` inv., `2` cond.) ; `EXIG-ARC-08..10, EXIG-SEC-08..17` |
| **Plan A.** `controle-identite-securite` | Plan transversal A : Identité et sécurité | C2 Identité/registre (fabrique) + C4 Maillage (`PC5, Z5` `[S]`) | Pilier gauche *Zero Trust*, `NHI` | `CAP-035..041` (`6` inv., `1` cond.) ; `EXIG-IAM-01..21, EXIG-SEC-01..07, 18..26, EXIG-AUT-03, 08, 10, 11, EXIG-INT-21` |
| **Plan B.** `controle-observabilite-finops` | Plan transversal B : Observabilité, évaluation et FinOps | C5 Exploitation — `AgentOps` (`ch. 38–40` ; `Z1, Z3/PC4` `[S]`) | Pilier droit *AgentOps*, *FinOps* | `CAP-042..046` (`5` inv.) ; `EXIG-OBS-01..13, EXIG-EVA-01..06, EXIG-FIN-01..10` |
| **Plan C.** `controle-gouvernance-registre` | Plan transversal C : Gouvernance et registre | C6 Gouvernance (`ch. 25–30`), C2 registre, `ch. 41` `[S]` | C6 gouvernance/B2B, deux piliers | `CAP-047..052` (`6` inv.) ; `EXIG-ARC-19, 20, EXIG-AUT-01, 02, 04..07, 18, EXIG-INT-08..10, 17, 18, 20, 23, EXIG-GOV-01..20, EXIG-CON-01..26, EXIG-APP-01..17` |

*Note méthodologique (*`Annexe A.1` *vs* `A.3`*) —* Ce tableau et `Annexe A.1` ventilent sans doublon les `305 EXIG-*` v1.2 par ancrage architectural `CAD26 § 5.2–5.3`. L’`Annexe A.3` les rattache aux capacités `CAP-001..052` (`42` inv., `10` cond. ; `5` lacunes `2026` sans `EXIG-*` direct : `CAP-025, 028, 033, 046, 052`).

### 2.2 Effectivité du plan de contrôle, points PC1–PC5 et harmonisation des échelles

Un plan de contrôle ne gouverne effectivement que sous trois conditions (`C27 ch. 23 § 23.2` ; `CAD26` Décision 2) E : EXIG-ARC-01 E : EXIG-GOV-07 E : EXIG-GOV-08 E : EXIG-OBS-11 E : EXIG-OBS-12. Il exige un **chemin réseau obligé** (`PEP`), un **registre central faisant seul autorité** (zéro justificatif sans fiche active) et une **preuve immuable** émise hors de portée du modèle.

Ce cadre dissipe les quatre acceptions de *(agentic) control plane* (`C26 ch. 7 § 7.5`) et sépare **fabrique d’identité** et **fabrique d’agents** (`C26 ch. 41 § 41.1`, `ch. 43`). Il distingue aussi la sauvegarde d’état de **cinq points de contrôle obligatoires** (`PC1–PC5`, construit `[S]` en `C26 § 43.3` Tableau 43.2, opposables sans passeport d’agent). `PC1` couvre la décision et la notification horodatée (`Loi 25 art. 12.1`). `PC2` scelle la trace d’instance (`Z1` `[S]`) et `PC3` impose l’arrêt humain sur effets défaisables (`Z2` `[S]`). `PC4` sépare adaptation éphémère et évolution persistante (`Z3` `[S]`, `ACVM 11-348`, `BSIF E-23`). Enfin, `PC5` assure le confinement local (`Z5` `[S]`), `Z4` `[S]` restant une frontière d’abstraction (`§ 43.6`).

L’Annexe A.2 unifie les échelles de maturité et d’autonomie (`PD28 M-12` ; `CAD26 ch. 8, 14` ; `C27 § 0.4, § 43.1` ; `C26 ch. 1, 14, 22`, `0` modèle de maturité au socle en `§ 43.5`) P : PRI-006 :

- **Maturité par domaine (**`D1–D8`**, au critère le plus faible)** : pont analytique `[S]` croisant `5/7` niveaux `LCIM` (`C26 Tableau 7.1`) et les `3` approches `ISO 11354-1 FEI` (*Intégrée*, *Unifiée*, *Fédérée*, `C26 § 1.2.1`) — `Stade 0` (*Sans agents*, `N0`, FEI *Intégrée*) → `Stade 1` (*Pilotes isolés*, 90 j, `N0–N1`) → `Stade 2` (*Usage encadré*, Niveaux 2–3 *Défini* de `CAD26`, sémantique / FEI *Unifiée* `[S]`, seuil minimal réglementé) → `Stade 3` (*Orchestration en production*, Niveau 4 *Géré*, pragmatique / FEI *Unifiée* `[S]`, cible majoritaire) → `Stade 4` (*Inter-organisations*, Niveau 5 *Optimisé*, dynamique / FEI *Fédérée* `[S]`, sélectif en Palier 3 sur 2033–2035 C : A, C ; SIG-007 et exclu en `D2` `Stades 2–3` comme en `D6`, coté `Stade 3` interne en `PD28 M-12` malgré `3–4` en `M-15`/`M-18`).
- **Autonomie par acte** : hors classe (`N0` / `L0` / `OO3` pur `[S]`), `Classe 1` (*Lire*, `N1` sur `P0–P1`), `Classe 2` (*Agir réversible*, `N3` borné ou `N2` sur `P2`), `Classe 3` (*Agir matériel*, `N2` par défaut, `JCS SHA-256`, `PC3` `[S]`), `Classe 4` (*Irréversible critique*, `P3` jamais seul même en `N4`, `CIBA` + `FIDO2` `≤ 15 min`), `Classe 5` (*Visant une personne*, plafonnée `N2` sous `EXIG-CON-02` et règle d’or `EXIG-AUT-07`, `OO3/OO4` `[S]`, `Q-E` `[S]`), et `Classe 6` (*Hors mandat*, `NX` interdit sans dérogation E : EXIG-AUT-03 E : EXIG-GOV-17).

### 2.3 Noyau de contrôle possédé, gravité des données et séparation des systèmes

Les cadriciels d’agents périment en moins de douze mois (`C27 ch. 20`). De plus, les suites commerciales restent **« ouvertes sur le fil et fermées sur le plan de contrôle »** (`C27 § 26.9, § 27.1–27.4` ; `CAD26 § 2.4, § 13.1`). Elles enferment identité, politiques, mémoire, traces et facturation sans traiter un agent tiers à égalité avec un agent natif.

Le portefeuille (`PD28 M-10–M-11`) ancre donc `42` **capacités invariantes sans regret** dans un **noyau de contrôle possédé** P : PRI-015 P : DEC-007 E : PRIN-09 E : EXIG-ARC-19. Ce noyau couvre registre (`CAP-047`), identités `SPIFFE` et jetons (`CAP-035, 036`), politiques et arrêt (`CAP-037, 039`), passerelles (`CAP-022, 029`), double couloir et audit (`CAP-042, 049`), et contrats (`CAP-015, 018`). Il s’accompagne de `10` **capacités conditionnelles** (`CAP-004, 006, 013, 014, 025, 027, 028, 033, 034, 041`) activées sur signaux jusqu’en 2035 C : A, B, C ; SIG-002, SIG-016.

La frontière progicielle suit la **gravité des données** P : CAP-013 P : DEC-007 E : EXIG-ARC-21. Une tâche mono-silo peut rester dans l’agent SaaS sous les contrôles cumulatifs de `EXIG-ARC-21` : fiche au registre, transit `PEP` vers l’externe, clauses `EXIG-APP-05, 06, 08, 13`, schémas épinglés `EXIG-INT-02`, arrêt propre (`OAuth`/`CAEP`) testé chaque trimestre (`EXIG-SEC-26`) et plafond `N2` sans approbation `P3` équivalente à `EXIG-AUT-12`. Dès deux silos traversés, l’orchestration remonte dans le moteur durable possédé. Elle propage mandant, trace et budget dans chaque appel descendant E : EXIG-ARC-02, avec étiquette immuable d’entité juridique sur actifs et mémoire P : CAP-021 P : PEX-041 E : EXIG-CON-06. Le *System of Action* reste séparé des *Systems of Record* (`ADR-001`, `C27 § 1.8`) E : EXIG-ARC-14 E : EXIG-ARC-17 E : EXIG-ARC-18. Tout `SQL` direct est proscrit : chaque écriture passe par une interface validant intégrité, idempotence et trace (`EXIG-ARC-18`, `DEVRAIT`).

### 2.4 Blocs ABB → SBB substituables (2026), arbitrage des principes et ArchiMate

À l’homologation, chaque solution documente ses **blocs d’architecture (**`ABB`**)** et **de solution (**`SBB`**)** exposant les standards retenus E : EXIG-ARC-20 E : EXIG-ARC-21. L’AE les révise chaque trimestre avec le catalogue protocolaire (`CAD26 § 5.4`, p. 44 ; `Tableau 12`) E : EXIG-GOV-18. Outre passerelle et plans transversaux, s’imposent moteur durable sur écriture (`EXIG-ARC-05`), passerelle de modèles (`EXIG-ARC-08`) et bac à sable (`EXIG-ARC-10`). Un `SBB` partiel exige un `SBB` complémentaire ou une dérogation écrite (`≤ 6` mois, ou `≤ 90` j en classe faible), renouvelable une fois E : EXIG-GOV-16.

Correspondance `ABB → SBB` (exemples non limitatifs, état au 28 oct.–14 nov. 2026) :

| Couche / Plan (`CAD26` ↔ Pivot) | `ABB` (bloc neutre) | Capacités exigées | Exemples de `SBB` substituables (état au 28 oct.–14 nov. 2026) |
| --- | --- | --- | --- |
| **1. Canaux et déclencheurs** (`C1`) | Interface d’interaction/approbation ; déclencheurs | Authentifier, ouvrir la trace, montrer l’action exacte, zéro invite | Portails internes déclaratifs, `webhooks` et planificateurs |
| **2. Orchestration et état** (`C2`) | Moteur durable, routeur et magasin d’état | Persistance par transition, reprise, attente d’approbation, Saga | `Temporal`, `Restate`, `AWS Step Functions`, `LangGraph` (persistance externe), `Microsoft Agent Framework`, `Google ADK` |
| **3. Agents et exécution cognitive** (`C2/C5`) | Exécution d’agent ; passerelle modèles ; bac à sable | Boucle `MCP`/`A2A`/`OTel` ; routage, cache, quotas ; réseau fermé | `Strands Agents`, `OpenAI Agents SDK` (+ `SBB` `A2A`/`OTel`) ; `Agent Router`, `agentgateway`, `Kong AI Gateway` ; `Firecracker`, `gVisor`, `Kata Containers`, `WASI` |
| **4. Médiation et connectivité** (`C4`) | Passerelle `PEP`, catalogue privé, bus d’événements | Coupure `MCP`/`A2A`, empreintes `SHA-256`, `CloudEvents`/`AsyncAPI` | `agentgateway`, `IBM ContextForge`, `Azure API Management` (+ `A2A`), `MuleSoft Agent Fabric`, `Apache Kafka` |
| **5. Outils et données** (`C3/C4`) | Serveurs `MCP`, adaptateurs, index et graphes | Intention métier, filtrage `ACL` mandant, bi-temporalité | Adaptateurs `MCP`/`OpenAPI`, `Graphiti`, `Zep`, index hybrides cités |
| **6. Systèmes d’enregistrement** (`C4`) | Progiciels et cœurs métiers existants | Contrôles métier intacts, écriture corrélée et décimal exact | Aucun nouveau `SBB` central : adaptateurs validants uniquement |
| **Plan A — Identité et sécurité** | Identité `NHI`, autorisation, `PDP`, coffre, `CIBA` | Jetons `RFC 8693`, politiques hors modèle, secrets en aval | `SPIFFE` / `SPIRE`, `Microsoft Entra Agent ID`, `OPA`, `Cedar` ; coffre et approbation signée à l’homologation |
| **Plan B — Observabilité et FinOps** | Collecteur `OTel`, banc `E1–E3`, audit, quotas | Double couloir sans renseignements personnels (`RP`, ou `PII` dans les standards techniques), audit `JCS` ancré/h, `CPO` | `OpenTelemetry Collector` (caviardage) ; voûte d’audit et quotas désignés à l’homologation |
| **Plan C & SaaS encadrés** | Registre d’agents ; suites à agents intégrés | Cycle à 7 états, coupe-circuit ; contrôles `EXIG-ARC-21` | `ServiceNow AI Control Tower`, `Microsoft Agent 365` ; `Copilot Studio`, `Salesforce Agentforce` sous `PEP` |

En cas de tension (`CAD26 § 4.3`, `Tableau 10` p. 33, dont `84 % → 77 %` sous `CaMeL` en classe élevée), l’arbitrage suit un ordre strict : **droit applicable → 10 interdits** `EXIG-GOV-17` **→** `DOIT` **sur** `DEVRAIT` **→ principes de protection (**`PRIN-03..07, 10, 12`**) → principes d’architecture (**`PRIN-01, 02, 08, 09, 11`**)**. L’Annexe B croise `15 PRI`, `12 PRIN`, `10` décisions `CAD26` et `31 ADR` de `C27` (`8` **maintenues**, `7` **à réviser**, `16` **généralisées en** `12 DEC`).

La modélisation `ArchiMate` (`C26 ch. 44`, construit `[S]` sur *ArchiMate 4* `C260` du 27 avril 2026 compatible `3.2`) emploie `Specialization`, `<<…>>` et `Profiles` (`§ 44.1.1, § 44.1.9`). Elle impose quatre règles : agent actif distinct de son substrat ; humain imputable sans `Flow` direct entre proposeur et approbateur (`§ 44.1.7`) ; décomposition de la mémoire, du contexte et de l’objet sémantique (`§ 44.1.8`) ; zéro `Requirement` **réglementaire orphelin** (`C26 § 44.6`). Un modèle statique n’atteste jamais l’exécution d’instance (`§ 44.9`).

Contrat opérationnel croisé — Architecte d’entreprise (AE) | Architecte de solutions (AS)

Décisions AE

1. Adopter le pivot à 5 couches et 3 volets raccordé aux 6 vraies couches de `CAD26 § 5.2` et sanctuariser le noyau possédé (`42 CAP` invariantes) P : PRI-001 P : PRI-015 P : DEC-007 E : EXIG-ARC-19.
2. Gouverner par gravité des données : confiner tout agent SaaS à son silo sous `EXIG-ARC-21` et rapatrier toute orchestration inter-silos P : CAP-013 E : EXIG-ARC-21.
3. Appliquer `CAD26 § 4.3` (`EXIG-GOV-17` en tête), réviser trimestriellement `ABB → SBB` (`CAD26 § 5.4`) E : EXIG-ARC-20 E : EXIG-GOV-18 et proscrire tout `Requirement` réglementaire orphelin (`C26 § 44.6`).

Spécifications AS

1. Couvrir 100 % des capacités de chaque `ABB` requis par des `SBB` conformes aux standards (ou `SBB` complémentaire) et bannir toute logique ou invite en Couche 1 E : EXIG-ARC-03 E : EXIG-ARC-20 E : EXIG-ARC-21.
2. Isoler le *System of Action* des *Systems of Record* (`ADR-001`) : zéro `SQL` direct ; écriture via interfaces validant règles métier, idempotence et trace (`EXIG-ARC-18`, `DEVRAIT`) E : EXIG-ARC-14 E : EXIG-ARC-17 E : EXIG-ARC-18.
3. Propager mandant, trace et budget dans chaque appel descendant E : EXIG-ARC-02, et attacher l’étiquette immuable d’entité juridique à chaque actif et mémoire P : CAP-021 P : DEC-007 P : PEX-041 E : EXIG-CON-06.

### 2.5 Grille de décision

| Décision | Option par défaut | Quand s’en écarter | Preuve |
| --- | --- | --- | --- |
| Plan de contrôle face aux suites métiers | Noyau possédé en propre (registre, identité, politiques, passerelles, traces) fédérant les silos P : PRI-015 | Tâche strictement mono-silo sans accès transversal, sous contrôles compensatoires E : EXIG-ARC-21 | `[É]` `C27` § 26.9, § 27.2–27.4 ; `CAD26` § 5.4, § 13.1 |
| Écriture dans un système d’enregistrement | Passage exclusif par interfaces applicatives ou adaptateurs validant règles métier et idempotence E : EXIG-ARC-17 | Jamais en écriture directe en base (`ADR-001` maintenue, intégrité des livres) | `[N]` `BSIF` B-13 / E-23 (`ANC-103`) ; `CAD26` `PRIN-05`, `EXIG-ARC-14` |
| Logique ou invite dans les canaux | Interdiction stricte : la Couche 1 authentifie le mandant, ouvre la trace et affiche l’action E : EXIG-ARC-03 | Jamais en production ; l’orchestration et les invites vivent en Couches 2 et 3 de `CAD26` | `[É]` `[S]` `CAD26` § 5.2 (p. 37) ; `PD28` `CAP-001` |
| `SBB` à couverture partielle | Adjonction obligatoire d’un bloc complémentaire couvrant les contrôles manquants avant homologation E : EXIG-ARC-20 | Dérogation écrite bornée (`≤ 6` mois, ou `≤ 90` j en classe faible) avec compensations E : EXIG-GOV-16 | `[É]` `CAD26` § 5.4 Tableau 12 (pp. 44–45) |
| Échange inter-organisations et enclaves | Interfaces modulaires réservées sans déploiement immédiat (`10` capacités conditionnelles `P1–P3`, dont `9` en `P2–P3`) | Franchissement avéré des signaux correspondants (`SIG-002, 007, 016, 103`) | `[S]` `PD28` M-11 § 11.3 (`42` inv. vs `10` cond.) |
| Arbitrage simplicité vs sûreté / vie privée | Primauté du droit, des 10 interdits E : EXIG-GOV-17 puis des principes de protection (`PRIN-03..07, 10, 12`) | Jamais contre la loi ni `EXIG-GOV-17` ; décision consignée en comité | `[N]` `Loi 25` ; `CAD26` § 4.3 Tableau 10 (p. 33) |

### 2.6 Limites et renvois

`TOGAF` et `ISO/IEC 42001` restent au `statut F` (aucun `[N]`). *ArchiMate 4* (`C260`) n’a été vérifiée en `C26 § 44.1.1, § 44.1.9` (`§ 44.0.4`) que sur extraits du 29 octobre 2026 ; ses stéréotypes et `PC1–PC5` (`C26 ch. 43`) demeurent `[S]`. Quatre coquilles internes de `CAD26` v1.1 sont rectifiées :

`EXIG-APP-18` p. 32, `EXIG-APP-12` au lieu d’`EXIG-APP-17` p. 233, `EXIG-MEM-01` au lieu d’`EXIG-ARC-22` pp. 258/342, et `EXIG-ARC-02` au lieu d’`EXIG-ARC-21` (pp. 195–257). L’interdiction des frais de transfert du *Data Act* européen au 12 janvier 2027 D (`ANC-003`) vise l’UE. Renvois : `CAD26 Sommaire, ch. 4, 5, 11–14, Ann. A, B, D, H` ; `C26 ch. 7, 41–44` ; `C27 § 0.1, 0.4, ch. 1, 20, 23, 26, 27, 43, Ann. F` ; `PD28 M-2, M-9 à M-13, Ann. E` ; Annexes A à F.

# Partie II — Concevoir le tissu conjonctif et l’exécution : le chantier de l’architecte de solutions

Chapitre 3 — Couche protocolaire (MCP, A2A, événements), passerelle à neuf contrôles et anti-verrouillage

Chapitre 4 — Sémantique métier, compilation du contexte, mémoire CoALA et encapsulation patrimoniale/OT

Chapitre 5 — Orchestration hybride (OO1–OO4, 8 patrons), exécution durable, sagas et sémantique d’effet

Chapitre 6 — Autonomie graduée, classes de décision, supervision humaine et liaison cryptographique

## Chapitre 3 — Couche protocolaire (MCP, A2A, événements), passerelle à neuf contrôles et anti-verrouillage

> **Ancrage corpus (état de référence : 17 novembre 2026) :** `[C26 ch. 7–11, 37, 42, Ann. B, Ann. N.2]` · `[CAD26 ch. 6, § 8.1 Tab. 28, § 9.4 Fig. 18, § 11.7, Ann. H.2 & H.4 | PRIN-01, PRIN-02 | EXIG-ARC-01, 11, 21, EXIG-INT-01..23, EXIG-MCP-01..22, EXIG-A2A-01..15, EXIG-EVT-01..10, EXIG-AUT-08..14, EXIG-IAM-17..19, EXIG-SEC-03..06, EXIG-GOV-18..20]` · `[C27 ch. 5–11, 19, 24, 26–27, § 49.7 | ADR-004..007, ADR-019 | PRR S-06..08, R-04, R-05, R-09]` · `[PD28 M-4, M-11, M-13 | PRI-003, PRI-015 | CAP-001, 006, 011..013, 022, 023, 026, 027 | DEC-001, 002, 007 | ANC-024..029, ANC-104 | SIG-004, 005, 008]`.

*Question directrice : Comment connecter agents, outils et bus événementiels sur des standards ouverts sans confondre connectivité syntaxique et gouvernance sécurisée ?*

**Thèse du chapitre :** La convergence de 2026 sur `MCP`, `A2A` et `CloudEvents` résout l’échange syntaxique, mais ne fonde aucune gouvernance sécurisée. Le corpus relève `102` fiches `NVD` mentionnant « Model Context Protocol » en quatre mois (serveurs tiers, sous réserves méthodologiques) `[É]`. Il note aussi l’absence d’expiration et de révocation natives des cartes `A2A 1.0`, et `0/15` lien documenté `[S]` avec cinq cadres financiers canadiens (`C26 ch. 42`). La sûreté n’étant pas composable sur le fil, l’entreprise applique la non-substituabilité protocolaire P : PRI-003 et réserve l’approbation au catalogue interne E : EXIG-INT-17. Elle impose une passerelle bidirectionnelle à neuf contrôles en échec fermé P : CAP-022 E : EXIG-ARC-01 E : EXIG-IAM-17 et confine les suites commerciales derrière des adaptateurs réversibles P : DEC-001 P : DEC-002 P : DEC-007.

### 3.1 Loi de non-substituabilité et pile protocolaire épinglée

L’erreur fréquente des pilotes consiste à confondre l’invocation d’une fonction déterministe et la délégation à un pair autonome. Le corpus tranche par le contrôle de l’appelant et l’opacité de l’exécutant (`CAD26 § 6.2–6.4` ; `C27 § 6.6, § 11.12` `[S]`, `ADR-001`). Un agent pair doté d’état propre ne se déguise pas en outil CRUD (`EXIG-INT-05`, `DEVRAIT`), et une API transactionnelle ne s’invoque pas par dialogue libre P : PRI-003 E : PRIN-01 E : PRIN-02 E : EXIG-INT-04 E : EXIG-INT-05 E : EXIG-INT-10. Trois plans non substituables structurent la Couche `C4` (`acces`).

**Intégration verticale agent-outil (**`MCP` **révision** `2026-07-28`**).** L’accès synchrone aux outils et données internes s’appuie sur `MCP` épinglé à `2026-07-28` sur `Streamable HTTP` (`CAD26 § 6.5` ; `C27 ch. 5` ; *« HTTP diffusable à point unique »* en `C26 § 8.1.3`). Sans état au transport, le serveur se route derrière un répartiteur standard. Le transport `stdio` reste confiné au poste local sans secret de production E : EXIG-MCP-01 E : EXIG-MCP-08. Contre la saturation du miroir REST `1:1`, l’architecte consolide `≤ 15` outils `[S]` d’intention métier par serveur (`C27 § 5.11`, `ADR-005`). Il mesure la précision dès l’alerte d’orchestrateur `> 15` outils avant tout découpage multiagent P : CAP-023 E : EXIG-MCP-06 E : EXIG-ORC-09.

L’autorisation devient obligatoire sur chaque serveur, sans relais de jeton (*token passthrough*) ni secret en en-tête, avec concordance entre en-têtes HTTP et corps `JSON-RPC` E : EXIG-MCP-09 E : EXIG-MCP-11 E : EXIG-MCP-15 E : EXIG-MCP-18. Annotations (`readOnlyHint`, `destructiveHint`), schémas, URL et icônes sont tenus pour non fiables. Chaque outil est épinglé par empreinte `SHA-256` contre le *rug-pull* P : CAP-023 E : EXIG-MCP-14 E : EXIG-MCP-19 E : EXIG-MCP-20 E : EXIG-AUT-08. L’*elicitation* ne recueille ni secret ni approbation E : EXIG-MCP-21. Les extensions `Beta` au 1er novembre 2026 — `Tasks` (`SEP-3392` du 29 oct. 2026, sans remplacer un moteur durable selon `CAD26 § 6.5` et `C26 § 48.2`), `Skills` et `Server Cards` — restent désactivées hors liste blanche E : EXIG-MCP-04. Côté calendrier (`CAD26 Annexe H.2` ; `C26 Annexe N.2`), la migration intégrale vers `2026-07-28` échoit le **28 juillet 2027** D E : EXIG-MCP-22. `SEP-3398` (27 oct. 2026) fixe la révision suivante au **30 mars 2027** A (à confirmer, `C26 [AN-5]`). Enfin, `SEP-2596` (3 juin 2026) ouvre le retrait de `HTTP+SSE` dès mars 2027 (préavis 12 mois, `≥ 90 jours` sur faille active), puis de `Roots`, `Sampling` et `DCR` en septembre 2027 sous la borne du 22 août 2027 A (`ANC-026`, `SIG-005`).

**Délégation horizontale inter-agents (**`A2A` **version** `1.0`**).** Entre domaines ou organisations vers un pair opaque, la référence demeure `A2A v1.0.1` du 28 mai 2026 (`1.0.0` du 12 mars 2026 ayant absorbé `ACP` ; `v1.1.0-rc` du 29 oct. 2026 non publiée, `CAD26 Annexe H.2`). Hébergé par l’`AAIF` au stade `Growth` (août 2026, `C26 S-002`), le projet compte **neuf sièges** au comité technique depuis l’entrée de Bloomberg le 20 octobre 2026 (`CAD26 Annexe H.4` n° 1).

Or l’inspection de `A2A 1.0` (`C26 S-047..S-058`) montre que la signature `JWS` canonisée `RFC 8785` (`JCS`) de l’*Agent Card* est facultative (`S-050`). Le protocole ne prévoit ni expiration ou statut natifs (`S-049`, `S-051`), ni révocation (`S-052`, `S-056`), ni gouvernance de clés dans `SECURITY.md` (`S-054`). Le cadre impose donc vérification `JWS`/`JCS` systématique, inscription au catalogue à cache borné, rejet des champs hors norme et garde anti-`SSRF` sur les notifications poussées P : CAP-012 P : DEC-001 E : EXIG-A2A-01 E : EXIG-A2A-02 E : EXIG-A2A-03 E : EXIG-A2A-04 E : EXIG-A2A-05 E : EXIG-A2A-06 E : EXIG-A2A-12. La suite `a2a-tck` étant en `1.0.0.alpha3` (20 oct. 2026), seuls ses tests stables sur deux versions bloquent la `CI` E : EXIG-A2A-14 E : EXIG-INT-19 E : EXIG-GOV-19.

**Dorsale événementielle (**`CloudEvents 1.0` **et** `AsyncAPI 3.0`**).** Le découplage multi-consommateurs emploie `CloudEvents` (`1.0.2`) et `AsyncAPI` (`3.1.0`) au catalogue (`CAD26 § 6.7` ; `C27 ch. 19` ; `EXIG-EVT-01`, `DEVRAIT`) P : CAP-011 E : EXIG-EVT-01 E : EXIG-EVT-02 E : EXIG-EVT-03 E : EXIG-EVT-04. L’enveloppe exclut tout `RP` en attribut E : EXIG-EVT-05 et porte un compteur anti-boucle obligatoire (`xagentmaxhops = 4`, `CAD26 § 6.7`, `C27 § 19.9` `[S]`) P : CAP-012 E : EXIG-EVT-06. Identité cryptographique, déduplication aval, clé de partition et rejeu isolé complètent le contrat E : EXIG-EVT-07 E : EXIG-EVT-08 E : EXIG-EVT-09 E : EXIG-EVT-10.

### 3.2 Asymétrie réglementaire (`0/15`), surface NVD et registre interne à quatre opérations

La compatibilité de transport ne crée aucune confiance (`C26 ch. 11`). Du 1er juillet au 27 octobre 2026, la `NVD` compte `102` **fiches citant « Model Context Protocol »** (`13` de score `≥ 9,0`), sous trois réserves (`C27 § 49.7`, `ADR-019`). La requête omet le sigle `MCP` seul et inclut des non-serveurs ; le pic de septembre (`56` fiches) peut refléter une campagne d’audit ; enfin, ces failles touchent des serveurs tiers plutôt que la spécification. De plus, la moitié des connecteurs publics sont mutables ou sans valeur (`C27 § 8.8`). Le registre officiel `MCP` (`v1.8.7`, 30 oct. 2026) reste en préversion sans serveurs privés (`CAD26 Annexe H.2`).

Surtout, la matrice `C26 ch. 42` (`Tableau 42.1` `[S]`) croise `MCP`, `A2A v1.0` et `AP2` avec cinq cadres canadiens (`BSIF E-23`, `AMF IA`, `ACVM 11-348`, `Loi 25 art. 12.1`, accès bancaire ouvert). Elle relève `0/15` **lien documenté** `[S]` (`4` absences en source, `11` au socle). Les protocoles traitent `Q-A` (*qui parle* `[S]`), tandis que le droit exige `Q-E` (*qui en répond*, `C26 ch. 14` `[S]`). Cinq **zones de compensation (`Z1` à `Z5`, `[S]`)** comblent l’écart : `Z1` trace d’instance ; `Z2` arrêt humain suspensif ; `Z3` blocage d’auto-modification ; `Z4` abstraction bancaire ouverte (`ANC-104`, `C26 S-033`) P : CAP-026 ; `Z5` filtrage par le maillage.

La découverte sépare quatre opérations (`C27 § 8.1` ; `CAD26 § 6.8`) : *trouver*, *décrire*, *authentifier* et **approuver**. Cette quatrième opération relève du seul **registre et catalogue interne** P : CAP-047 E : EXIG-INT-17 E : EXIG-GOV-08. Ce catalogue est révisé chaque trimestre, ou sous 15 jours ouvrables en cas de version incompatible, dépréciation, retrait accéléré ou correctif de sécurité E : EXIG-GOV-18. Il classe chaque protocole sous cinq statuts avec **60 jours** de coexistence minimale E : EXIG-INT-14 E : EXIG-GOV-19 E : EXIG-GOV-20. Le statut `Adopter` exige six critères cumulatifs : spécification publique versionnée avec politique de dépréciation, gouvernance neutre ou multipartite, statut final ou stable, au moins deux implémentations indépendantes ou une suite de tests `CI`, modèle de sécurité compatible avec le chapitre 9, et licence ouverte sans redevance. Les quatre autres statuts cadrent les pilotes bornés (`Évaluer`), la veille sans données réelles (`Surveiller`), l’adaptateur à retrait planifié (`Contenir`) et l’arrêt immédiat (`Suspendu`). Aucun brouillon n’est assimilé à une norme : au 1er novembre 2026, la proposition n° 57 sur `AGNTCY` reste sans décision (`CAD26 Annexe H.2`), et le transfert `AP2` / `Verifiable Intent` vers *FIDO Alliance* annoncé le 28 avril 2026 demeure non matérialisé (`C26 S-090, S-091`) E : EXIG-INT-09 E : EXIG-INT-20 E : EXIG-INT-21.

### 3.3 Passerelle d’agents bidirectionnelle (`PEP`) à neuf contrôles ordonnés

Tout appel `MCP`, délégation `A2A` et action `P2`/`P3` franchissent une **passerelle d’agents** (`PEP` bidirectionnel en échec fermé, `CAD26 § 9.4 Figure 18` ; `C26 ch. 37` ; `C27 ch. 24`) P : CAP-022 E : EXIG-ARC-01 E : EXIG-ARC-11 E : EXIG-IAM-17 E : EXIG-IAM-18, hors fonction locale `P0`/`P1` de même domaine au catalogue.

> **[Figure]**
> - Passerelle d’agents (PEP) à 9 contrôles et séparation protocolaire Chemin obligé en échec fermé (EXIG-IAM-17..18), règle de deux et retrait SEC-06
> - Cellule appelante
> - SPIFFE SVID + sub/act
> - Modèle sans clés (IAM-06)
> - Catalogue interne
> - 4e op. : approuver
> - SHA-256 & paliers P0–P3
> - PDP & Approbation
> - Politique hors modèle
> - h=SHA-256(JCS) · <10 s [S]
> - Passerelle d’agents — PEP bidirectionnel en échec fermé (EXIG-IAM-17)
> - ALLER · Contrôles 1 à 7 avant relais
> - (1) AuthN SVID/mTLS & débit (2) Catalogue & SHA-256
> - (3) AuthZ & paliers P0–P3 (4) Schéma & anti-injection
> - (5) Jeton h = SHA-256(JCS) (6) Quotas & budget tâche
> - (7) Échange RFC 8693 aud. unique · zéro relais de jeton (EXIG-IAM-12)
> - + Pré-audit d’intention écrit AVANT relais P2/P3 (EXIG-OBS-11)
> - RETOUR · Contrôles 8 et 9 avant remise au contexte
> - (8) Masquage RP/PII & retrait déterministe EXIG-SEC-06
> - (9) Span OpenTelemetry & issue au journal d’audit JCS
> - MCP 2026-07-28
> - HTTP sans état · ≤ 15 [S]
> - Prod ≤ juill. 27 · SEP-3398
> - A2A 1.0 (1.0.1)
> - AAIF · Tâches opaques
> - Agent Card JWS/JCS
> - CloudEvents 1.0
> - AsyncAPI · maxhops = 4
> - Zéro RP · EXIG-EVT-07
> - Règle de deux (EXIG-SEC-04) & retrait anti-exfiltration (EXIG-SEC-06)
> - [A] Entrée non fiable (web, courriel, tiers) + [B] Accès privé/sensible
> - → Action PEP immédiate : retrait outils d’envoi (même P0) et tout P3
> - Marquage propagé sur toute la session · non dérogeable (GOV-17)

*Fig. 3. – Passerelle d’agents bidirectionnelle (PEP) à neuf contrôles ordonnés en échec fermé, séparation des flux MCP, A2A et CloudEvents/AsyncAPI, règle de deux et retrait déterministe EXIG-SEC-06.*

Les **neuf contrôles ordonnés** s’appliquent sans exception :

1. **Authentification et débit (aller, 1) :** validation du *SPIFFE Verifiable Identity Document* (`SVID`) sur `TLS` mutuel (`mTLS`), du jeton délégué à preuve de possession (`cnf`) et limitation de cadence E : EXIG-IAM-01 E : EXIG-IAM-03 E : EXIG-IAM-14.
2. **Catalogue et empreinte (aller, 2) :** statut `Adopter`/`Évaluer`, version et condensat `SHA-256` épinglé E : EXIG-INT-17 E : EXIG-MCP-20.
3. **Autorisation hors modèle (aller, 3) :** intersection déterministe des droits, niveau `N1–N4` et palier `P0–P3` P : CAP-037 E : EXIG-IAM-21 E : EXIG-AUT-10.
4. **Garde-fous d’entrée (aller, 4) :** schéma `I-JSON`, en-têtes `MCP`, balisage et détection d’injection — qui ne suffit jamais comme seul contrôle et exige un banc bilingue français/anglais E : EXIG-MCP-15 E : EXIG-SEC-03 E : EXIG-SEC-05.

5. **Jeton d’approbation lié (aller, 5) :** jeton signé `≤ 15 min` (`jti` unique) lié à `h = SHA-256(JCS(...))` — exigé hors bande (appareil et session distincts) sur tout `P3` E : EXIG-AUT-09 et via `CIBA` sans UI (`EXIG-AUT-14`, `DEVRAIT`), le même appareil restant admis en `N2` sur `P2` (`CAD26 Tableau 28`, p. 119) E : EXIG-AUT-11 E : EXIG-AUT-12 E : EXIG-AUT-14.
6. **Quotas et budget (aller, 6) :** budget financier, jetons et profondeur de sauts E : EXIG-FIN-04 E : EXIG-ORC-26.
7. **Injection aval et pré-audit (aller, 7) :** échange `RFC 8693` à audience unique (`RFC 8707`) injectant les secrets hors du *modèle sans clés* (`EXIG-IAM-19`, `DEVRAIT`), et écriture d’audit d’intention *avant* relais `P2`/`P3` P : CAP-036 E : EXIG-IAM-11 E : EXIG-IAM-19 E : EXIG-SEC-14 E : EXIG-OBS-11.
8. **Filtrage retour et règle de deux (retour, 8) :** masquage des secrets et `RP`, balisage non fiable et **retrait déterministe des outils d’envoi et** `P3` pour la session dès exposition combinée à du contenu non fiable et à des actifs sensibles P : CAP-038 E : EXIG-SEC-04 E : EXIG-SEC-06.
9. **Télémétrie et audit chaîné (retour, 9) :** segment `OpenTelemetry` sans contenu brut et scellement de l’issue, incluant les requêtes à allers-retours multiples (*Multi Round-Trip Requests*, `MRTR`, `SEP-2322`), `Tasks` `> 5 s` (`CAD26 § 6.5`) et tâches `A2A` (`C27 § 6.3`) P : CAP-042 E : EXIG-OBS-01 E : EXIG-OBS-07.

Correspondance non prescriptive `ABB → SBB` (état au 28 oct.–14 nov. 2026) :

| Fonction (`C4`) | Bloc neutre (`ABB`) | Exemples de `SBB` substituables (état au 28 oct.–14 nov. 2026) |
| --- | --- | --- |
| Coupure `PEP` | Passerelle d’agents bidirectionnelle | agentgateway, Envoy AI Gateway, Kong AI Gateway, IBM ContextForge |
| Décision `PDP` | Moteur de politiques hors modèle | Open Policy Agent (OPA), Cedar |
| Flux asynchrones | Courtier `CloudEvents 1.0` / `AsyncAPI 3.0` | Apache Kafka, Solace PubSub+, Apache Pulsar |

#### 3.3.1 Budget de latence cumulé des neuf contrôles `PEP` et contrat schématique AS (`[S]`)

L’empilement des neuf contrôles en échec fermé introduit un surcoût de latence que l’AS doit budgéter dès la conception (`[S]`, cibles d’ingénierie à étalonner sur banc interne avant `POR-003`). Le tableau ci-dessous ventile l’enveloppe synchrone aller-retour hors temps d’inférence du modèle (`~400–2 500 ms`) et hors attente humaine `CIBA` :

| Étape de la traversée `PEP` | Contrôle exécuté | Budget cible `p50` (`[S]`) | Budget cible `p95` (`[S]`) | Levier de maîtrise AS |
| --- | --- | --- | --- | --- |
| **Contrôles 1–2 (aller)** | `mTLS`/`SVID`, cache catalogue & `SHA-256` | `3 ms` | `8 ms` | Cache local `JWKS` + condensats en mémoire |
| **Contrôles 3–4 (aller)** | Décision `PDP`, validation `I-JSON` & garde anti-injection | `6 ms` | `18 ms` | Règles compilées + filtre lexical avant classifieur |
| **Contrôles 5–6 (aller)** | Vérification `jti`/`h = SHA-256(JCS)` & quotas tâche | `4 ms` | `12 ms` | Magasin atomique régional (`jti` en mémoire) |
| **Contrôle 7 + pré-audit** | Échange `RFC 8693` + `DPoP` & écriture `EXIG-OBS-11` | `14 ms` | `38 ms` | Cache jeton `aud` court + journalisation asynchrone sur `P0`/`P1`, synchrone sur `P2`/`P3` |
| **Contrôles 8–9 (retour)** | Masquage `RP`, retrait `EXIG-SEC-06`, span `OTel` & issue `JCS` | `8 ms` | `22 ms` | Automate déterministe + pipeline `OTel` hors chemin critique |
| **Cumul synchrone** `PEP` **(**`P2`**/**`P3`**)** | **9 contrôles + pré-audit bloquant (hors LLM / CIBA)** | `~35 ms` | `~98 ms` | **Surcoût** `< 5 %` **face à un appel modèle (étalonné ci-dessous)** |

**Étalonnage exécutable *Borealis-Bench* (**`W3.1`**, licence MIT — évaluation artificielle FEDS).** Le banc reproductible `Borealis-Bench/` (`gateway-go` + `crypto-rust`, `results/SYNTHESE-BENCH.md`) valide ce budget par deux campagnes locales :

- **Campagne 1 (**`campagne1_pep_latence.json`**) :** sur `2 000` requêtes en processus Go traversant les `9` contrôles en échec fermé, la latence cumulée s’établit à `p50 = 52,85 µs`, `p95 = 202,83 µs` et `p99 = 234,06 µs` (max `255,94 µs`, `C6` filtre `CaMeL` à `64,01 µs` moy.). Bout en bout sur `1 000` requêtes HTTP/TCP locales, la latence reste à `p50 = 59,09 µs`, `p95 = 1,01 ms` et `p99 = 3,52 ms`, très en deçà du budget cible (`~35 ms` `p50`). Le coupe-circuit `POR-003` (`10` exercices concurrents) coupe les mutations en `0,050 ms` **max** (cible `< 10 s` `[S]`), avec `0` fuite et `10/10` compensations préservées.
- **Campagne 3 (**`campagne3_mcp_a2a_interop.json`**) :** trois adaptateurs ouverts (`LangGraph`, `AutoGen`, `CrewAI`) réussissent `9/9` **(**`100 %`**)** scénarios `MCP JSON-RPC 2.0` + `A2A v1.0` (`18,92–90,55 ms`), et l’audit CI (`ci-audit-108-blocs/registre-108-blocs.json`) classe `100 %` des `108` blocs `C27` (`90` `[Exécuté en CI]`, `18` `[Schéma conceptuel]`) et `8` contrats `CAD26` Annexe C (`6`/`2`). L’extension `CRE-IA-2027` **v2.0** (`exigences-v2.json`) consacre ce harnais CI `MCP`/`A2A`, la bascule `SEP-3398`/`SEP-2596` (2027) et le resserrement calibré `≤ 10–12` outils `[S]` en `L3/L4`.

Contrat schématique neutre d’épinglage d’outil `MCP` et d’enveloppe d’appel `PEP` (`EXIG-MCP-20`, `EXIG-IAM-17`, sans dépendance fournisseur) :

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "mcp_version": "2026-07-28",
  "tool_id": "finance.ledger.post_entry",
  "tool_version": "2.4.0",
  "definition_digest": "sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
  "catalogue_status": "Adopter",
  "palier_effet": "P2",
  "idempotent_verified": true,
  "pep_envelope": {
    "spiffe_svid": "spiffe://corp.example/ns/fin/sa/agent-compta",
    "delegated_sub": "pseudonyme:rprp-88412",
    "audience": "https://mcp-ledger.internal/v2",
    "idempotency_key": "sha256-jcs-idem-v1",
    "rule_of_two_tainted": false
  }
}
```

### 3.4 Confinement anti-verrouillage multi-plateformes et interfaces périphériques

Les suites d’entreprise (`C27 ch. 26–27` ; `CAD26 § 13.1`) demeurent **« ouvertes sur le fil et fermées sur le plan de contrôle »**. Elles enferment identités, politiques, traces et facturation dans leur silo. L’AE préserve donc le noyau possédé et cantonne tout agent SaaS sous les **contrôles compensatoires de** `EXIG-ARC-21` *(corrigeant la coquille* `EXIG-ARC-02` *de* `CAD26` *pp. 195–257)*. Ce régime exige transit par la passerelle vers tout autre domaine, identité dédiée, exportation `OpenTelemetry`, arrêt propre testé chaque trimestre et plafond `N2` sans approbation équivalente à `JCS` P : PRI-015 P : CAP-013 P : DEC-007 E : EXIG-ARC-19 E : EXIG-ARC-21.

En Couche `C1`, `AG-UI` reste confiné aux pilotes derrière adaptateur (`Évaluer`). En production, un flux `SSE` structuré projette des états typés sur un **catalogue fermé de composants pré-homologués**, sans `HTML` ni `JavaScript` libre (`C27 ch. 7, 10`) P : CAP-001 P : DEC-002 E : EXIG-ARC-03. Sur le web ouvert (`C27 ch. 9`), `97 %` des `llms.txt` ne reçoivent aucune requête (Ahrefs) et `WebMCP` demeure expérimental. `Web Bot Auth` n’atteste ni intention ni délégant, ce qui exige un canal chiffré mutuel sans privilège implicite P : CAP-006 E : EXIG-A2A-09. Les groupes IETF `DAWN` (`ANC-025, 027, 028` A) et `AGENTPROTO` (`ANC-024, 029` A, 2027–2028) guident la veille (`SIG-004`, `SIG-008`) vers d’éventuels connecteurs fédérés vers 2033 C : A, C ; SIG-004, SIG-008 P : CAP-027.

Contrat opérationnel croisé — Architecte d’entreprise (AE) | Architecte de solutions (AS)

Décisions AE

1. Tenir le catalogue trimestriel à cinq statuts (`Adopter` à `Suspendu`), proscrire l’assimilation d’un brouillon à une norme et exiger `60 jours` de coexistence E : EXIG-INT-09 E : EXIG-INT-14 E : EXIG-GOV-18 E : EXIG-GOV-19.
2. Imposer registre interne et passerelle `PEP` sur tout flux `MCP`/`A2A`, avec migration `MCP` avant le **28 juillet 2027** D sous veille du **30 mars 2027** A (`SIG-005`) P : PRI-003 P : CAP-022 E : EXIG-ARC-01 E : EXIG-INT-17 E : EXIG-MCP-22.
3. Confiner les agents SaaS sous contrôles compensatoires trimestriels et isoler interfaces et annuaires derrière adaptateurs réversibles P : PRI-015 P : CAP-013 P : DEC-001 P : DEC-002 P : DEC-007 E : EXIG-ARC-21.

Spécifications AS

1. Exécuter en échec fermé les **neuf contrôles** de la passerelle `PEP` (`CAD26 Figure 18`), zéro relais de jeton, injection aval (`EXIG-IAM-19`, `DEVRAIT`), pré-audit et retrait `P3`/sortie sous règle de deux E : EXIG-IAM-12 E : EXIG-IAM-17 E : EXIG-IAM-18 E : EXIG-IAM-19 E : EXIG-SEC-06 E : EXIG-OBS-11.
2. Déployer `MCP 2026-07-28` sans état (`Streamable HTTP`), `≤ 15` outils `[S]` épinglés `SHA-256` (`ADR-005` ; alerte `> 15` sous `EXIG-ORC-09`), annotations non fiables P : CAP-023 E : EXIG-MCP-01 E : EXIG-MCP-06 E : EXIG-MCP-11 E : EXIG-MCP-14 E : EXIG-MCP-20 E : EXIG-ORC-09.
3. Vérifier `JWS`/`JCS` et le cache catalogue des cartes `A2A v1.0.1`, et imposer `xagentmaxhops = 4` sans `RP` sur `CloudEvents 1.0` / `AsyncAPI 3.0` P : CAP-011 P : CAP-012 E : EXIG-A2A-02 E : EXIG-A2A-03 E : EXIG-EVT-05 E : EXIG-EVT-06.

### 3.5 Grille de décision

| Décision | Option par défaut | Quand s’en écarter | Preuve |
| --- | --- | --- | --- |
| Accès vertical aux outils et données métiers | `MCP 2026-07-28` sans état sur `Streamable HTTP` derrière passerelle `PEP`, `≤ 15` outils `[S]` d’intention métier E : EXIG-MCP-01 E : EXIG-MCP-06 | Fonction locale `P0`/`P1` dans la même unité de déploiement et le même domaine, inscrite au catalogue E : EXIG-IAM-17 | `[É]` `[S]` `CAD26` § 6.5 ; `C27` ch. 5 (`ADR-005` `[S]`) |
| Délégation horizontale entre agents distincts | `A2A 1.0` (`1.0.1`) avec cartes signées `JWS`/`JCS` vérifiées, inscrites au catalogue interne et tâches corrélées P : DEC-001 E : EXIG-A2A-01 E : EXIG-A2A-03 | Sous-agents internes à un même processus durable sans franchissement de domaine ni d’équipe (`CAD26` § 7.2) | `[É]` `CAD26` § 6.6 ; `C26` `S-002, S-047..S-058` |
| Découplage événementiel inter-domaines | Appel synchrone ou tâche durable par défaut ; `CloudEvents 1.0` + `AsyncAPI 3.0` borné par `xagentmaxhops = 4` si multi-consommateurs P : CAP-011 | Jamais sans enveloppe validée, compteur anti-boucle E : EXIG-EVT-06 ni Saga sur effets multisystèmes E : EXIG-ORC-08 | `[É]` `[S]` `CAD26` § 6.7 ; `C27` § 19.7–19.9 (`[S]`) |
| Approbation des outils et pairs externes | Catalogue interne unique épinglant versions, condensats `SHA-256` et paliers `P0–P3` après revue sécurité E : EXIG-INT-17 E : EXIG-MCP-20 | Jamais : ni registre public en préversion ni annotations déclarées par un serveur ne font foi E : EXIG-AUT-08 | `[É]` `C27` § 8.8, § 49.7 (`102` fiches `NVD` tiers, avec réserves) |
| Rendu d’interfaces dynamiques vers l’humain | Flux `SSE` typé projeté sur catalogue fermé de composants pré-homologués, zéro code exécutable généré P : CAP-001 P : DEC-002 | Pilote interne isolé sans données réelles évaluant un protocole émergent derrière adaptateur (`Évaluer`) E : EXIG-GOV-18 | `[É]` `C27` § 7.1, § 10.9 ; `CAD26` `EXIG-ARC-03` |
| Annuaires fédérés ou paiement agentique en incubation | Statut `Surveiller` hors production ou `Évaluer` derrière adaptateur réversible sans couplage du noyau E : EXIG-GOV-20 | Passage à `Adopter` après ratification stable, gouvernance multipartite vérifiée et conformité mature E : EXIG-GOV-19 | `[É]` `C26` Ann. N.2 (`S-091`) ; `CAD26` `EXIG-INT-20, EXIG-INT-21` |

### 3.6 Limites et renvois

- **Preuves de production et constructions (**`[S]`**).** Fin 2026, nulle étude évaluée par les pairs ne mesure `MCP` ou `A2A` à grande échelle en production (`C27 § 42.6, § 48.3`). Les grilles `Q-A..Q-E`, `AgentMesh` (`C26 ch. 14, 37`), la matrice `0/15` et les zones `Z1–Z5` (`C26 § 42.0–42.1, § 42.3–42.4`) restent des constructions d’auteur (`[S]`) co-appuyées par `CAD26`.
- **Textes** `statut F` **et jalons ouverts.** `FDX v6.0` et `UIT-T F.748.93` demeurent au `statut F` (aucun `[N]`). L’état `alpha3` de `a2a-tck`, `SEP-3398` (30 mars 2027, réserve `C26 [AN-5]`) et la date du « 4 août » en `CAD26 Annexe H.4` n° 2 imposent une veille trimestrielle.
- **Renvois aux 4 PDF :** `C26` ch. 7–11, 37, 42, Ann. B, Ann. N.2 ; `CAD26` ch. 6, § 8.1 (Tab. 28), § 9.4 (Fig. 18), § 11.7, Ann. H.2/H.4 ; `C27` ch. 5–11, 19, 24, 26–27, § 49.7 ; `PD28` `M-4`, `M-11`, `M-13`.

## Chapitre 4 — Sémantique métier, compilation du contexte, mémoire CoALA et encapsulation patrimoniale/OT

> **Ancrage corpus (état de référence : 17 novembre 2026) :** `[C26 ch. 2, 5, 34, 43 (PC4 [S])]` · `[CAD26 § 5.2 (C5–C6), § 5.5 Fig. 4 & Tab. 13 | PRIN-02, 05, 11 | EXIG-INT-02, 12..14, EXIG-ARC-02, 14..18, 22..25, EXIG-AUT-08, EXIG-SEC-03, 04, EXIG-FIN-07, EXIG-CON-06, 10, EXIG-GOV-15, 16]` · `[C27 § 3.3, ch. 12–15, 25, 28 | ADR-001, ADR-008..010, ADR-016, ADR-017 | PRR S-12, R-01, R-12, R-13, R-14, G-09, G-10, F-13]` · `[PD28 M-4 § 4.5, M-10, M-13 | PRI-008, PRI-010 | CAP-015..021, 024, 025, 028 | DEC-003, 004, 008, 010 | PEX-001, 004, 015, 041 | INI-011, 015, 029 | POR-004, 005, 008 | SIG-103, 106, 109, 110]`.

*Question directrice : Comment alimenter les agents en contexte fiable, gouverner leur mémoire dans la durée et raccorder les systèmes patrimoniaux exacts sans corruption sémantique ni fuite de confidentialité ?*

**Thèse du chapitre :** La validité syntaxique d’un schéma `JSON` n’empêche jamais une erreur sémantique silencieuse. Le meilleur détecteur d’écart d’intention plafonne à `27,9 %` sur exécutions simulées sans vrai modèle en prépublication `[É]`, un seul distracteur dégrade le rappel sur dix-huit modèles et les ontologies en incubation restent immatures fin 2026 (`C27 ch. 12–13`). L’institution doit gouverner définitions et formules dans une couche sémantique déterministe neutre P : PRI-008 P : DEC-003 E : EXIG-INT-02. Elle compile le contexte avec filtrage `ACL` amont sans compte de service P : CAP-017 E : EXIG-ARC-16 et cloisonne les quatre mémoires `CoALA` sous bi-temporalité et purge vérifiable P : CAP-019 P : DEC-004 E : EXIG-ARC-22 E : EXIG-ARC-23 E : EXIG-ARC-25 E : EXIG-CON-10. Enfin, elle protège le patrimoine transactionnel (et, à la marge, les équipements périphériques) derrière une couche anticorruption en `Decimal` exact P : CAP-024 P : CAP-028 P : DEC-008 E : EXIG-ARC-14 E : EXIG-ARC-17.

### 4.1 Erreurs sémantiques silencieuses, tension `ADR-009` et données prêtes (`ACL` amont)

Au-delà des registres de schémas (`C26 § 2.2–2.4`), deux agents partageant un schéma valide peuvent calculer différemment un ratio prudentiel ou une règle d’admissibilité sans lever d’exception (`C27 § 3.3, § 12.1`). Le chapitre 12 de `C27` distingue trois paliers. D’abord, la **couche sémantique analytique déterministe**, centralisant indicateurs et agrégations sans `SQL` libre par le modèle, est mature et rentable. Ensuite, les ontologies formelles et graphes métiers se réservent aux domaines réglementés à fort enjeu (convenance, cloisonnement de groupe, médiation `ISO 20022`). Enfin, la détection automatique d’écart d’intention reste expérimentale : elle plafonne à `27,9 %` **de précision** sur `600` exécutions simulées sans vrai LLM en prépublication (`C27 § 12.6`).

Une dissonance interne du corpus doit ici être tranchée ouvertement. En `C27 § 12.13` (p. 250), l’`ADR-009` (`[S]`, reprise dans `PRR G-09`) écarte la branche `0.3.0.dev0` (impropre à la production, `§ 12.4`) et retient `Apache Ossie` `0.1.1` (format en incubation sans moteur depuis juin 2026). Or l’Extrait 12.1 (p. 240) affiche une version `"1.0.0"` inexistante.

Aussi `PD28 M-13` généralise-t-il `ADR-009` dans `DEC-003`. L’institution exige un référentiel sémantique déclaratif versionné comme du code, indépendant du moteur analytique, avec médiation canonique et `60 jours` de coexistence (`SIG-110`) P : PRI-008 P : CAP-015 P : CAP-016 P : DEC-003 E : EXIG-INT-02 E : EXIG-INT-13 E : EXIG-INT-14.

En amont, des « données prêtes pour les agents » (`C27 ch. 15`) exigent quatre garanties cumulatives. D’abord, chaque champ, unité et règle de calcul relève d’un propriétaire identifié E : EXIG-INT-12 E : EXIG-INT-19. Ensuite, un sas *Write-Audit-Publish* valide fraîcheur et intégrité statistique avant exposition, au-delà d’un simple `ttlMs` (`C27 § 15.2`, `PRR F-13`) P : CAP-020 P : DEC-010 P : POR-005. Troisièmement, le **filtrage** `ACL` **pré-récupération** s’exécute sous l’identité du mandant propagée dans chaque appel (`ADR-008` maintenue) E : EXIG-ARC-02 E : EXIG-ARC-16. Ses droits forment un plafond strict **sans repli silencieux vers un compte de service**, vérifié par tests actifs sur chaque serveur `MCP` d’entrepôt (`C27 § 15.3–15.4`). Quatrièmement, chaque actif reçoit dès l’ingestion son étiquette immuable d’entité juridique, de finalité consentie et de prohibition inter-filiales P : PRI-010 P : CAP-021 P : PEX-041 E : EXIG-CON-06.

### 4.2 Compilation déterministe du contexte et gouvernance des compétences

Les fenêtres d’**un million de jetons** (mars 2026) n’abolissent ni le pourrissement du contexte (*context rot*), ni la perte au milieu (*lost in the middle*), ni le coût marginal. Un seul distracteur dégrade la performance sur dix-huit modèles (`CAD26 § 5.5`), et plus de `97 %` des jetons facturés d’un flux séquentiel proviennent d’entrées relues (`C27 ch. 40`). L’architecte emploie donc un **compilateur déterministe de contexte** (`ADR-008`) P : CAP-017 :

1. **Stratification fixe pour le** `KV-cache` **:** préfixe invariant en tête (consignes, politiques, schémas épinglés) maximisant la réutilisation du cache, suivi des seules preuves filtrées `ACL` E : EXIG-FIN-07.
2. **Borne de jetons et compaction :** plafond inscrit à la fiche, résumé structuré au-delà et interdiction de l’historique brut comme mémoire longue E : EXIG-ARC-22.
3. **Passage par référence sur** `A2A` **:** jeton de référence vérifiable et sous-contexte minimal plutôt que copie de charges lourdes E : EXIG-ORC-23.

Selon des prépublications non évaluées par les pairs (`SkillsBench` sur `87` tâches et études `AGENTS.md`, `C27 § 13.3–13.4`), le format `Agent Skills` (transféré à l’`AAIF` le 22 oct. 2026) améliore la réussite lorsqu’il est **rédigé et revu par des humains**. À l’inverse, l’autogénération dégrade la qualité, tandis qu’`AGENTS.md` gonfle les jetons sans gain prouvé hors programmation. Toute compétence procédurale est donc versionnée, signée et qualifiée en `CI` P : CAP-018 E : EXIG-INT-15 E : EXIG-INT-16.

### 4.3 Séparation des quatre mémoires `CoALA`, bi-temporalité et oubli sélectif

Selon `CAD26 § 5.5` (`Figure 4`, `Tableau 13`), la mémoire longue est gouvernée **comme une base de données soumise à la Loi 25, jamais comme un cache**. Elle reste **désactivée par défaut** sans besoin inter-sessions prouvé (`C27 ch. 14`) P : DEC-004 E : PRIN-11. Lorsqu’elle est ouverte, les **quatre mémoires** `CoALA` demeurent isolées :

> **[Figure]**
> - Compilation du contexte, 4 mémoires CoALA et couche anticorruption Préfixe KV-cache, filtrage ACL (ARC-16), cloisonnement (ARC-25) et COMP-3
> - Compilateur déterministe de contexte (CAP-017, EXIG-ARC-22)
> - 1. Tête fixe KV-cache : Invites signées & schémas stables (EXIG-FIN-07)
> - 2. Filtrage ACL amont : Droits mandant stricts, zéro compte service (ARC-16)
> - 3. Couche sémantique : Métriques versionnées (DEC-003), zéro SQL libre
> - 4. État borné & réf. : Compaction au seuil · passage par réf. A2A (ORC-23)
> - 4 mémoires CoALA isolées — zéro partage en écriture (EXIG-ARC-25)
> - Travail (CAD26 C2)
> - État hors processus chiffré
> - EXIG-ARC-05, EXIG-ORC-11
> - Procédurale (CAD26 C3)
> - Agent Skills signés (code)
> - Zéro auto-modif. (PC4 [S])
> - Épisodique (CAD26 C5)
> - Résumés typés + TTL
> - Bi-temp. & Loi 25 art. 23
> - Sémantique (CAD26 C5)
> - Index & graphes métier
> - ACL lecture · non fiable
> - Couche anticorruption patrimoniale, CUA borné et sas OT (DEC-008)
> - Adaptateur MCP patrimonial (CAP-024)
> - EBCDIC (CP037/1147) ↔ UTF-8
> - COMP-3 → Decimal exact
> - Zéro flottant IEEE 754
> - Trames COBOL / EDI & lissage
> - CUA interne (CAP-025) & LSAC
> - CUA ≤ 12 m (INI-015) + caviardage • Grattage externe interdit (PEX-001)
> - Sas périphérique OT (CAP-028)
> - Lecture historien / jumeau seul • Zéro écriture OPC UA directe

*Fig. 4. – Architecture des quatre mémoires CoALA, pipeline déterministe de compilation du contexte (KV-cache, ACL amont) et couche anticorruption patrimoniale (EBCDIC/COMP-3 Decimal exact) et périphérique OT.*

- **Mémoire de travail (`CAD26` C2) :** état et sous-objectifs persistés hors processus à chaque transition dans un magasin chiffré E : EXIG-ARC-05 E : EXIG-ARC-06 E : EXIG-ORC-11.
- **Mémoire épisodique (`CAD26` C5) :** résumés structurés horodatés (zéro transcription brute), isolés **par locataire, mandant et serveur** `MCP`, avec expiration par entrée E : EXIG-ARC-22 E : EXIG-ARC-23.
- **Mémoire sémantique (`CAD26` C5) :** index hybrides et graphes métiers filtrés `ACL` en lecture et expirant avec la source E : EXIG-ARC-16 E : EXIG-ARC-23.
- **Mémoire procédurale (`CAD26` C3) :** invites système et `Agent Skills` signés sans aucune modification autonome en production (`PC4` `[S]`) P : CAP-018 E : EXIG-ARC-24.

Contre l’empoisonnement mémoriel (`OWASP ASI06`, `C26 S-069` ; `C27 § 14.5`), **aucun magasin de mémoire longue n’est partagé en écriture** entre agents ou serveurs `MCP` E : EXIG-ARC-25. Chaque écriture épisodique valide un schéma excluant le texte brut externe et propage l’étiquette « contenu non fiable ». Tout souvenir relu demeure incapable d’autoriser seul une action sensible E : EXIG-SEC-03 E : EXIG-SEC-04. Enfin, un **graphe bi-temporel** dissocie validité métier (`valid_from` / `valid_to`) et ingestion système. Il reconstitue l’état exact connu lors d’une décision sous `BSIF E-23`, tout en assurant la **destruction ou l’anonymisation sélective vérifiable** exigée par l’**article 23 de la Loi 25** (`C27 § 14.6`) sans briser les index adjacents P : CAP-019 P : DEC-004 P : POR-005 E : EXIG-CON-10.

### 4.4 Couche anticorruption patrimoniale (`COMP-3`, `CUA`) et frontière périphérique (`OT`)

L’accès aux grands livres bancaires et moteurs actuariels interdit `SQL` direct et virgule flottante approximative (`C27 ch. 25` ; `ADR-001, ADR-016`). Le cœur transactionnel reste protégé derrière des serveurs `MCP` **anticorruption** lissant les rafales pour préserver quotas `MIPS`, files et verrous centraux P : CAP-024 P : DEC-008 P : INI-011 E : EXIG-ARC-14 E : EXIG-ARC-17. Hors modèle, ces adaptateurs exécutent trois conversions déterministes. Ils assurent le transcodage exact `EBCDIC` (`CP037` ou `CP1147`) ↔ `UTF-8`. Ils convertissent sans perte les décimaux condensés `Packed Decimal` **(**`COMP-3`**)** vers `Decimal` **exact** ou entiers d’unités mineures, **excluant** `IEEE 754` P : CAP-024 P : PEX-015 E : EXIG-AUT-08. Ils alignent enfin les trames fixes (`COMMAREA`, *copybooks* `COBOL`/`RPG`) et `EDI X12`/`EDIFACT`, avec clé d’idempotence vérifiée en cible et référence de trace (`EXIG-ARC-18`, `DEVRAIT`) E : EXIG-ARC-18.

Les *Computer-Use Agents* (`CUA`, `C27 § 25.8` `[S]`, `PRR R-12`) sont voués à l’extinction. À l’externe, le grattage d’écran réutilisant l’authentifiant client tombe sous `LSAC art. 171` (`SIG-103`) P : PEX-001. À l’interne (`3270`/`5250`), seule une **dérogation temporaire** est admise sous caviardage des `RP` avant capture, zones interdites, double assertion visuelle et **extinction sous 12 mois** vers `MCP` (zéro dérogation à `POR-008`) P : CAP-025 P : DEC-008 P : INI-015 P : POR-004 P : POR-008 E : EXIG-GOV-15 E : EXIG-GOV-16.

**Frontière périphérique** `OT` **(hors cœur financier).** Cette capacité reste marginale dans le secteur bancaire et assurantiel (`C27 ch. 28`, `ADR-017`, prototypes sans essai réel). Elle vise uniquement la télématique d’indemnisation, les succursales physiques ou les filiales d’actifs industriels. `CAP-028` cantonne tout pont `MCP` devant `OPC UA` (`IEC 62541`, serveur `v2.0.2`), `AAS` ou `MQTT Sparkplug` à trois verrous : lecture seule sur réplica isolé (`IEC 62443`), zéro écriture ni réessai vers un automate (`PLC`/`SCADA`), et validation sur jumeau déterministe plus approbation hors bande (`SIG-109`) P : CAP-028 P : INI-029 E : EXIG-AUT-09 E : EXIG-AUT-11 E : EXIG-ORC-27.

Exemples non limitatifs `ABB → SBB` des Couches `C3` et `C4` (état au 28 oct.–14 nov. 2026) :

| Domaine | Bloc neutre (`ABB`) | Exemples de `SBB` substituables (état au 28 oct.–14 nov. 2026) |
| --- | --- | --- |
| Mémoire longue | Graphe bi-temporel isolé par locataire | Letta, Graphiti (Zep), PostgreSQL + pgvector partitionné |
| Recherche filtrée | Index hybride à filtrage `ACL` amont | OpenSearch, Qdrant, Milvus (identité propagée du mandant) |
| Patrimoine central | Adaptateur `EBCDIC` / `COMP-3` vers `MCP` | Passerelles internes Decimal exact devant CICS, IMS ou IBM i |

Contrat opérationnel croisé — Architecte d’entreprise (AE) | Architecte de solutions (AS)

Décisions AE

1. Gouverner indicateurs et règles métiers comme du code dans une couche sémantique neutre sans couplage à une ontologie en incubation (`SIG-110`) P : PRI-008 P : CAP-015 P : DEC-003 E : EXIG-INT-02.
2. Désactiver par défaut la mémoire inter-sessions ; exiger bi-temporalité (`BSIF E-23`) et purge sélective vérifiable (`Loi 25 art. 23`) avant ouverture P : CAP-019 P : DEC-004 P : POR-005 E : EXIG-CON-10.
3. Proscrire le grattage externe et borner tout `CUA` interne par un budget d’extinction à **12 mois** P : CAP-025 P : DEC-008 P : PEX-001 P : INI-015 P : POR-004 E : EXIG-GOV-16.

Spécifications AS

1. Compiler le contexte en strates fixes (`KV-cache`), filtrer les `ACL` en amont sans compte de service, borner les jetons et passer par référence sur `A2A` P : CAP-017 E : EXIG-ARC-16 E : EXIG-ARC-22 E : EXIG-FIN-07 E : EXIG-ORC-23.
2. Cloisonner les quatre mémoires `CoALA` (zéro écriture partagée), valider les schémas anti-`ASI06` et signer les `Agent Skills` rédigés par humains P : CAP-018 E : EXIG-ARC-23 E : EXIG-ARC-24 E : EXIG-ARC-25 E : EXIG-SEC-04.
3. Exécuter hors modèle transcodage `EBCDIC`, décimaux `COMP-3` en `Decimal` exact et trames `COBOL`/`EDI`, et interposer réplica isolé plus jumeau numérique devant `OPC UA` P : CAP-024 P : CAP-028 E : EXIG-ARC-14 E : EXIG-ARC-17 E : EXIG-AUT-08 E : EXIG-AUT-11.

### 4.5 Grille de décision

| Décision | Option par défaut | Quand s’en écarter | Preuve |
| --- | --- | --- | --- |
| Calcul de ratios financiers, actuariels ou d’admissibilité | Résolution déterministe via couche sémantique versionnée exposée par outil borné, zéro `SQL` libre P : CAP-015 P : DEC-003 | Exploration hors production dans un bac à sable analytique sur données synthétiques | `[É]` `C27` § 12.1–12.6 (prépublication simulée à `27,9 %`) ; `CAD26` `EXIG-INT-02` |
| Contrôle d’accès lors de la récupération documentaire | Filtrage `ACL` pré-récupération sous l’identité du mandant, zéro repli vers compte de service E : EXIG-ARC-16 | Corpus intégralement public classé `P0` sans renseignement personnel ni secret d’affaires | `[N]` `[É]` `Loi 25` ; `CAD26` `EXIG-ARC-16` ; `C27` § 15.3 (`ADR-008`) |
| Persistance d’une mémoire longue entre sessions | Mémoire inter-sessions désactivée ; état limité à la tâche durable en cours P : DEC-004 | Besoin longitudinal prouvé, sous schéma validé, isolation locataire/mandant, bi-temporalité et purge E : EXIG-ARC-23 E : EXIG-CON-10 | `[N]` `[É]` `Loi 25` art. 23 ; `CAD26` § 5.5 (`CoALA`) |
| Évolution de la mémoire procédurale (`Agent Skills`, invites) | Paquets rédigés par humains, versionnés, signés et qualifiés en intégration continue P : CAP-018 E : EXIG-ARC-24 | Jamais d’auto-modification en production ni d’autogénération non revue (`PC4` `[S]`, dégradation mesurée) | `[É]` `[S]` `C27` § 13.3–13.4 (prépublications) ; `C26` ch. 43 (`PC4` `[S]`) |
| Raccordement d’un système central patrimonial sans API REST | Serveur `MCP` anticorruption (`EBCDIC`, `COMP-3` en `Decimal` exact, lissage de charge) P : CAP-024 | Harnais `CUA` dérogatoire sous caviardage des `RP`, double assertion visuelle et extinction à `12 mois` P : INI-015 | `[É]` `[S]` `C27` § 25.4–25.8 (`[S]`) ; `CAD26` `EXIG-AUT-08` |
| Interaction avec capteurs ou automates industriels (`OT`) | Lecture seule sur réplica isolé ; jumeau numérique déterministe et approbation humaine avant consigne P : CAP-028 | Jamais d’écriture directe ni de réessai automatique d’un modèle vers un automate (`ADR-017`) | `[S]` `C27` § 28.4–28.5 (réserve prototypes) |

### 4.6 Limites et renvois

- **Coquille `CAD26`, dissonance `ADR-009` et cas fictif exclu.** `CAD26` (pp. 258, 342) porte la coquille `EXIG-MEM-01` au lieu d’`EXIG-ARC-22` (p. 47). `ADR-009` (épinglant en `C27` p. 250 `Apache Ossie` `0.1.1` en incubation sans moteur, face à l’Extrait 12.1 p. 240 en `"1.0.0"` et à `0.3.0.dev0` impropre à la production en `§ 12.4`, et reprise en `PRR G-09`) est généralisée par `DEC-003`. Les chiffres fictifs du *Groupe Boréal Inc.* (`C27 § 14.10, 25.10, 28.10`) sont exclus comme sans valeur probante.
- **Textes `statut F` et réserve `OT`.** `FDX`, `ACORD` et `CSIO` restent au `statut F` (`PD28 M-4 § 4.5`, aucun `[N]`), et les ponts `MCP`/`OPC UA` (`ADR-017`) n’ont pas d’essai indépendant sur équipement réel.
- **Renvois aux 4 PDF :** `C26` ch. 2, 5, 34, 43 (`PC4` `[S]`) ; `CAD26` § 5.2 (C5–C6), § 5.5 ; `C27` § 3.3, ch. 12–15, 25, 28 ; `PD28` `M-4` § 4.5, `M-10`, `M-13`.

## Chapitre 5 — Orchestration hybride (OO1–OO4, 8 patrons), exécution durable, sagas et sémantique d’effet

> **Ancrage corpus (état de référence : 17 novembre 2026) :** `[C26 ch. 1 (§ 1.5.2, § 1.6.2.2), ch. 22, ch. 29 (§ 29.4.1), ch. 31, ch. 48]` · `[CAD26 ch. 5 (§ 5.2), ch. 7 | EXIG-ORC-01 à EXIG-ORC-30 | PRIN-05, PRIN-08, PRIN-12]` · `[C27 ch. 16 à ch. 21 | ADR-002, ADR-011, ADR-012, ADR-013 | PRR R-02, R-03, R-04, R-06, R-07, R-08, R-10, R-11, R-15, O-06, S-04, S-14]` · `[PD28 M-9, M-10, M-13 | PRI-002, PRI-009 | CAP-007 à CAP-011 | DEC-005 | POR-003, POR-006 | SIG-013, SIG-014, SIG-104]`.

*Question directrice : Comment confiner le raisonnement probabiliste dans une enveloppe déterministe qui garantit la reprise sur panne, la compensation métier et l’intégrité des effets sur le monde réel ?*

**Thèse du chapitre :** Les évaluations empiriques montrent que les topologies multiagents ouvertes multiplient les pannes sans gain moyen sur les tâches séquentielles couplées (`[M]`). Un moteur durable garantit la reprise du programme, mais jamais l’unicité de ses effets externes (`[É]`). En milieu réglementé, l’inférence doit être confinée dans des machines à états déterministes (`OO3` ou `OO4`) choisies parmi huit patrons homologués à profondeur bornée P : PRI-002 P : CAP-007 P : CAP-010 E : EXIG-ORC-01 E : EXIG-ORC-02 E : EXIG-ORC-04. Chaque mutation exige une clé d’idempotence dérivée de l’étape durable et une revalidation au réveil. Sur plusieurs systèmes, elle impose une Saga à point pivot dotée d’un canal de compensation dédié isolé du coupe-circuit P : PRI-009 P : CAP-008 P : CAP-009 P : DEC-005 E : EXIG-ORC-12 E : EXIG-ORC-17 E : EXIG-ORC-21 E : EXIG-ORC-28.

### 5.1 Du continuum OO1–OO4 au test de bascule réglementaire : localiser la main qui commande

Opposer flux programmé rigide et nuée d’agents autonomes fausse le problème architectural (`C26 ch. 22 § 22.1`). Un agent peut appeler un sous-flux déterministe ou une table *Decision Model and Notation* (`DMN`) ; une machine à états peut invoquer un agent comme activité bornée. Les régimes se séparent non par la capacité du modèle, mais par deux axes de contrôle : *qui détient la représentation explicite du processus*, et *qui commande l’ordre des transitions*.

La taxonomie `OO1–OO4` de l’`Agentic Process Management` (`APM`, `C26 ch. 22 § 22.1`, prépublications `S-034` du 12 avril 2026 et `S-035` du 30 juin 2026) croise ces deux axes (5e colonne : transposition normative ajoutée par le mémoire aux quatre colonnes de `C26 Tableau 22.1`) :

| Option (`C26 Tableau 22.1`) | Connaissance du processus | Commandement de l’enchaînement | Lisibilité avant exécution (`[S]`) | Usage admissible *(ajout du mémoire)* |
| --- | --- | --- | --- | --- |
| `OO1` — Agentique agnostique au processus | Aucun composant explicite | Les agents (émergence) | Nulle (observable après coup dans les traces) | Exploratoire hors production uniquement |
| `OO2` — Agentique consciente d’un cadre | Les agents (invite ou contexte) | Les agents (planificateur) | Descriptive sans force exécutoire | Lecture interne consultative (`Classe 1` / `N1`) |
| `OO3` — Processus invoquant des agents agnostiques | Le cadre déterministe seul | Le cadre d’orchestration | Enchaînement complet auditable | Régime par défaut des flux audités (`Classes 2–5`) |
| `OO4` — Explicite d’agents conscients du processus | Le cadre et les agents | Le cadre d’orchestration | Enchaînement complet + contexte d’étape | Flux complexes exigeant arbitrage local éclairé |

Sur ce continuum exposé à la dérive, `C26 ch. 22` établit **une seule discontinuité structurante : la bascule** `OO2 → OO3`. En `OO1`–`OO2`, le processus reste une consigne textuelle tributaire du modèle et vulnérable aux entrées ambiguës ou injections. En `OO3`–`OO4`, le moteur déterministe reprend l’enchaînement : l’agent raisonne dans sa cellule sans négocier la transition P : PRI-002 P : CAP-007 E : EXIG-ARC-07.

`C26 ch. 29` (`§ 29.4`, `§ 29.4.1`) relie cette coupure au droit canadien. Sous l’article 12.1 de la Loi 25, `BSIF E-23` (1er mai 2027 D, `ANC-103`) et la ligne directrice `AMF IA` (1er mai 2027 D, `C26 Annexe N.3`), l’exploitant répond seul du résultat sans pouvoir invoquer l’émergence ni le fournisseur. Le test de `C26 § 29.4.1` (`[S]`) pose **trois conditions cumulatives** :

1. **Un texte opposable en nomme le résultat** : octroi, refus, communication ou écriture imposés envers une personne ou un livre réglementé (obligation en « doit » sous l’article 12.1, étendue aux attentes prudentielles `E-23` et `AMF IA`).
2. **Une trace est exigible par un tiers** : client, régulateur ou tribunal peut réclamer le chemin ayant produit l’issue (`PC2`), imposant la reproductibilité.
3. **L’écart n’est pas réparable par simple reprise** : rejouer la tâche n’efface pas le dommage financier ou juridique (`C26 ch. 31`).

Dès ces trois conditions réunies, `OO1` et `OO2` cèdent obligatoirement à `OO3` ou `OO4`, au coût assumé d’expliciter le processus P : PRI-002 P : CAP-007 E : EXIG-ORC-01.

### 5.2 Catalogue fermé des topologies autorisées (8 patrons + 1 variante) et proscription des antipatrons

Les mesures de `C27 ch. 16` (`§ 16.7`, Kim et coll.), `ch. 21` (`§ 21.1`) et `ch. 48` (`§ 48.4`) réfutent le réflexe multiagent. Sur six bancs, le gain face à un agent unique varie de `+80,8 %` (sous-tâches parallélisables) à `-70,0 %` (tâches séquentielles couplées), soit `-0,3 %` en moyenne. Cet écart s’efface à calcul égal sur les modèles frontières récents. La loi de Lusser pénalise les chaînes non vérifiées (0,94^{10} ≈ 53,9 %). De même, la taxonomie `MAST` (`C27 § 21.1` : `1 642` traces en `v3`, `14` modes, `41 %` à `86,7 %` d’échecs) répartit les pannes entre conception (`44,2 %` en `v3` ; `41,77 %` en `v2`), désalignement (`32,4 %` ; `36,94 %`) et vérification (`23,5 %` ; `21,30 %`).

`CAD26 ch. 7` (`§ 7.2`, Tableau 24) et `PD28` (`CAP-010`, `ADR-002`, `ADR-011`) limitent donc la conception à **huit patrons autorisés et une variante encadrée**, inscrits au registre P : CAP-010 E : EXIG-ORC-03 :

1. **Flux déterministe à étapes agentiques (défaut)** : graphe déterministe invoquant des cellules typées validées par schéma à chaque sortie E : EXIG-ORC-01 E : EXIG-ORC-24.
2. **Chaîne séquentielle** : pipeline linéaire de transformations typées sous délais bornés par maillon.
3. **Routage et transfert (**`handoff`**)** : aiguillage vers une liste fermée de spécialistes sans historique brut ni boucle libre, par contexte structuré et références E : EXIG-ORC-23.
4. **Parallélisation** : sectionnement ou vote (jusqu’à `-90 %` de délai en recherche complexe au prix d’une multiplication linéaire des jetons, `CAD26 p. 101`), sous concurrence bornée, **écrivain unique** et attente de tout garde-fou parallèle E : EXIG-ORC-07.
5. **Orchestrateur et exécutants** : planification plafonnée à **deux niveaux de délégation** (deux sauts / trois agents maximum, voire un seul saut inter-organisations, `CAD26 p. 101`), bloquée au-delà via `RFC 8693` E : EXIG-ORC-04 (`PRR R-04`, `PRR S-04`).
6. **Évaluateur-optimiseur** : contrôles déterministes exécutés *d’abord*, critique à famille ou invite distincte, et arrêt à `≤ 3` **itérations** avec escalade humaine E : EXIG-ORC-05.
7. **Chorégraphie événementielle** : domaines faiblement couplés à fort volume, sous propriétaire nommé, contrats `CloudEvents 1.0` / `AsyncAPI 3.0` sans renseignement personnel en attribut, `xagentmaxhops = 4` (`CAD26 § 6.7`, `C27 § 19.9` `[S]`) et Saga sur écritures multisystèmes P : CAP-011 P : CAP-012 E : EXIG-ORC-08 E : EXIG-EVT-06.

8. **Agent unique outillé (base obligatoire)** : étalon préalable au multiagent ; l’AS corrige d’abord la surcharge d’outils (alerte `> 15` sous `EXIG-ORC-09`, cible `≤ 15` outils `[S]` d’`ADR-005`) et ne découpe sur gain mesuré que selon les **frontières de contexte et de sécurité** (`DEVRAIT`) E : EXIG-ORC-02 E : EXIG-ORC-09 E : EXIG-ORC-10.

- **Variante — Clavardage de groupe et débat** : `≤ 3` **agents participants** plus un gestionnaire hors décompte, plafond de tours et clôture explicite E : EXIG-ORC-06, contre les maillages libres et *Mind Viruses* (Papadopoulos et coll., août 2026, `CAD26 p. 101`).

Symétriquement, `CAD26 § 7.9` (Tableau 26) interdit **dix antipatrons** E : EXIG-ORC-29. Sont proscrits : le multiagent sans gain mesuré, les rôles génériques, le flux connu laissé au modèle (ou inconnu figé), l’état mutable concurrent et la latence multisaut ignorée. Sont aussi bannis : l’historique brut injecté, l’état en mémoire vive, le maillage libre, les écritures sans idempotence ni compensation et le vérificateur complaisant. Chaque agent réapplique son filtrage de sécurité E : EXIG-ORC-25.

### 5.3 Exécution durable vs sémantique d’effet : reprise du programme, idempotence et revalidation au réveil

Sur les tâches longues, l’état est persisté hors processus à chaque transition P : CAP-008 E : EXIG-ARC-05 E : EXIG-ORC-11. Or `C27 ch. 18` et `C26 ch. 48` rappellent qu’**un moteur durable garantit la reprise du programme, jamais l’unicité de ses effets externes**. Par le *problème des deux généraux* (`C26 § 1.5.2, § 48.1`), le traitement *exactement-une-fois* requiert une livraison *au-moins-une-fois* vers un **outil cible idempotent**. En `MCP 2026-07-28`, un réessai après coupure reçoit d’ailleurs un nouvel identifiant JSON-RPC (`C27 § 18.1`). `C26 Tableau 48.1` (`[S]`) distingue ainsi **Lecture** (coût et fraîcheur), **Écriture** (doublon destructeur sans déduplication cible, `C26 § 48.2`) et **Engagement** (acte irréversible hors défaite locale).

Deux mécanismes sectoriels montrent l’absence de couture native (`C26 § 48.5`, `C27 § 18.3`). En HTTP, `draft-ietf-httpapi-idempotency-key-header` (`Idempotency-Key`) — expiré en `-07` le 18 avril 2026 (`C26 § 48.5`) puis repris en `-08` le 22 octobre 2026 (`C27 ch. 18`) — spécifie `409`, `422` et `400` sans être RFC. En paiement, l’`UETR` (`UUID` v4 `RFC 4122` / `RFC 9562`), obligatoire sur `ISO 20022` `pacs.008`, `pacs.009` et `pacs.004`, trace le règlement interbancaire. Toutefois, il ne **relie pas le message à l’appel d’outil de l’agent** (`C26 § 48.5`, degré 3 sur `MCP`, `A2A`, `AP2`).

L’AS ferme cet écart par quatre verrous durables P : CAP-008 P : CAP-009 P : DEC-005 :

1. **Appel LLM journalisé comme effet de bord (𝑆_𝑘 = 𝑓(𝐻_𝑘)).** Le code d’orchestration reste déterministe (sans réseau, horloge ni aléa directs). Inférences et outils sont isolés en activités journalisées et relus au rejeu sans réinterroger le modèle E : EXIG-ORC-11 E : EXIG-ORC-12 (`PRR R-02`). Le magasin est chiffré par dossier (effacement Loi 25), compacté (*Continue-As-New*) et versionné (`Build IDs`) avec tests de migration d’état (`DEVRAIT`) E : EXIG-ARC-06 E : EXIG-ORC-13 E : EXIG-ORC-14.
2. **Clé d’idempotence dérivée de l’opération racine durable.** Jamais produite par le modèle ni par concaténation, la clé suit `RFC 8785` : `cle = hex(SHA-256(JCS(["idem-v1", task_id, step_id])))` (racine aléatoire `UUIDv4`, chemin d’étape et itération), transite via `Idempotency-Key` ou champ contractuel, et est dédupliquée atomiquement par la cible E : EXIG-ORC-21 E : EXIG-ORC-22 (`PRR R-03`) ; sinon, l’outil bascule en `P3` sans réessai automatique E : EXIG-AUT-08.
3. **Revalidation au réveil (**`awakeable` **/ écart *Time-of-Check to Time-of-Use*,** `TOCTOU`**) et minuteries parallèles.** La veille libère le calcul (`C27 § 18.6`). Sur un octroi hypothécaire ou sinistre étalé sur des semaines sous `BSIF E-23`, chaque pièce suit sa minuterie durable de péremption (taux, revenu, sanctions, `C27 § 18.12` `[S]`). Au réveil avant décaissement, un validateur hors agent revérifie les droits actifs du signataire et relit l’état frais du système maître (statut, gel antifraude, plafond) P : CAP-008 E : EXIG-AUT-17 (`PRR R-08`).

4. **Classification des fautes, repli testé et façade cognitive.** Les erreurs définitives (politique, schéma, mandat révoqué) sont séparées des pannes transitoires sous disjoncteur et repli testé — modèle homologué ou file humaine sous droits du mandant E : EXIG-ORC-27 (`PRR R-11`). Les cadriciels cognitifs (cycle 12–18 mois, `C27 ch. 20`) prouvent reprise et audit sur banc avant catalogage E : EXIG-ORC-30.

| Bloc neutre (`ABB`) | Fonction exigée | Exemples de `SBB` substituables (état au 28 oct.–14 nov. 2026) | Vigilance d’ingénierie (`C27 ch. 18–20`, `CAD26 § 7.10`) |
| --- | --- | --- | --- |
| **Moteur durable (cycles longs)** | Journal rejoué, minuteries longues, versionnage en vol | `Temporal` | Borner `maximumAttempts` (illimité par défaut) ; tests de rejeu CI |
| **Micro-orchestration durable** | Objets virtuels sérialisés, `awakeables` sans serveur | `Restate`, `DBOS`, `Durable Functions`, `AWS Step Functions` | Évaluer l’adhérence infonuagique ou le plafond `PostgreSQL` (`DBOS`) |
| **Graphe cognitif intra-activité** | Cellule agentique bornée appelée dans une étape durable | `LangGraph`, `Microsoft Agent Framework`, `Google ADK`, `AutoGen`, `CrewAI` | Persistance mémoire vive proscrite ; isoler derrière façade (cycle 12–18 mois) |
| **Courtier de chorégraphie** | Enveloppes `CloudEvents` / `AsyncAPI`, rejeu isolé | `Apache Kafka`, `Solace PubSub+`, `Apache Pulsar` | Déduplication obligatoire sur le système d’enregistrement aval |

### 5.4 Patron Saga à point pivot, tampon d’irréversibilité et canal de compensation dédié

Sans transaction `ACID` inter-progiciels, toute mutation touchant plusieurs systèmes d’enregistrement suit obligatoirement une **Saga** (Garcia-Molina et Salem, 1987 ; `SagaLLM`, `C27 § 18.4` ; `C26 § 48.3` ; `CAD26 § 7.5`) P : PRI-009 P : CAP-009 P : DEC-005 E : EXIG-ORC-15 (`PRR R-06`).

> **[Figure]**
> - Enveloppe durable OO3/OO4 [S], point pivot Saga & canal EXIG-ORC-28 Confinement déterministe, idempotence JCS et compensation isolée du coupe-circuit
> - Enveloppe durable OO3 / OO4 [S] — État hors processus (EXIG-ORC-11..13)
> - OO1/OO2 [S] exclus (C26 § 29.4.1) · Clé SHA-256(JCS) côté cible (ORC-21..22)
> - 1. Réversible (P2)
> - Sceller C1 journal
> - Cellule bornée + K1
> - 2. Réversible (P2)
> - Sceller C2 journal
> - ≤ 2 sauts / ≤ 3 itér.
> - Veille (PC3 [S])
> - Attente hors proc.
> - Revalid. (CAP-008)
> - Journal Saga ajout seul (ORC-16)
> - Compensations [C1, C2] scellées
> - AVANT l’exécution de T1 et T2
> - Paramètres résolus et h(JCS)
> - → Alimente le canal EXIG-ORC-28
> - PIVOT
> - Engagement post-pivot (P3 / Cl. 4)
> - Acte irréversible (pacs.008)
> - Après validations & CIBA lié
> - Tampon de grâce si applicable
> - Zéro annulation automatique
> - Canal de compensation dédié (EXIG-ORC-28) — reste OUVERT sous arrêt
> - Identité propre orchestrateur (≠ NHI agent) · budget réservé isolé
> - Limité aux seuls outils de compensation C2 → C1 inscrits au journal
> - Idempotence vérifiée (EXIG-ORC-17) · tests injection de fautes en CI
> - Coupe-circuit (< 10 s [S], POR-003)
> - Bloque le NHI de l’agent
> - Stoppe tout appel vers l’avant
> - Exercice trim. ≤ 15 min (SEC-26)
> - File humaine prioritaire (ORC-18)
> - Escalade après 2 échecs
> - de compensation Saga
> - Audit JCS & reprise manuelle

*Fig. 5. – Enveloppe d’orchestration durable OO3/OO4 autour de cellules agentiques bornées, séquence Saga à journal préalable, point pivot d’irréversibilité et canal de compensation dédié isolé du coupe-circuit.*

L’ordonnancement s’articule autour d’un **point pivot** (`C27 § 18.7`) :

- **Avant le pivot (étapes compensables)** : avant d’exécuter chaque action 𝑇_𝑖, l’orchestrateur consigne dans un **journal de compensation en ajout seul** l’outil inverse 𝐶_𝑖 et ses arguments résolus E : EXIG-ORC-16. Aucun modèle ne sachant improviser une annulation sûre (`C26 § 48.3`), la compensation est fournie par le propriétaire de l’outil au catalogue, **idempotente**, et annule *sémantiquement* l’effet par écriture comptable inverse de 𝐶_{𝑘−1} à 𝐶_1 après réessais bornés à temporisation exponentielle et gigue E : EXIG-ORC-17 E : EXIG-ORC-27 (`PRR R-10`). **Après deux échecs d’une compensation**, le dossier bascule en file humaine prioritaire E : EXIG-ORC-18. Les états intermédiaires étant visibles hors isolation `ACID`, des réservations sémantiques et des tests d’injection de fautes en CI sont requis avant `POR-003` P : POR-003 E : EXIG-ORC-19 E : EXIG-ORC-20 (`PRR R-15`).

- **Au pivot et en aval** : l’acte irréversible (`P3` / `Classe 4`) est retardé par pré-engagement (*réserver avant capture*, *Write-Audit-Publish*, tampon d’annulation `pacs.008` P : PEX-004, `PRR R-07`), franchi uniquement sous approbation hors bande journalisée, puis suivi des seules étapes réessayables idempotentes.

Enfin, `CAD26 § 7.8` résout par le couplage de `EXIG-ORC-17` et `EXIG-ORC-28` le conflit entre arrêt d’urgence et intégrité comptable. Chaque tâche porte des plafonds d’étapes, d’appels, de jetons, de coût et de durée E : EXIG-ORC-26. Elle dispose aussi d’un coupe-circuit exercé chaque trimestre (`< 10 s` `[S]` côté passerelle sous `POR-003` et `PRR S-14`, contre `15 min` global en `CAD26`) P : POR-003 P : POR-006 E : EXIG-IAM-20 E : EXIG-ORC-28 E : EXIG-SEC-26. L’arrêt agit **vers l’avant** : il bloque toute nouvelle étape de l’agent, tout en laissant ouvert un **canal de compensation dédié**. Ce canal opère sous une **identité non humaine propre à l’orchestrateur**, distincte de l’identité révoquée de l’agent. La passerelle le restreint aux seuls outils compensatoires inscrits au journal (`EXIG-ORC-16`) sur une **réserve budgétaire hors enveloppe**. Il résiste ainsi au coupe-circuit, au plafond de sauts et à l’échéance du mandat — sauf suspension motivée et journalisée visant l’orchestrateur lui-même E : EXIG-ORC-17 E : EXIG-ORC-26 E : EXIG-ORC-28.

Contrat schématique AS d’enveloppe `CloudEvents 1.0` et d’entrée de journal Saga avec canal de compensation dédié (`EXIG-EVT-06`, `EXIG-ORC-16`, `EXIG-ORC-21`, `EXIG-ORC-28`) :

```
{
  "specversion": "1.0",
  "id": "evt-7c9e6679-7425-40de-944b-e07fc1f90ae7",
  "source": "spiffe://corp.example/ns/orch/sa/saga-engine",
  "type": "ca.fin.saga.step.sealed.v1",
  "time": "2026-11-19T14:20:00Z",
  "xagentmaxhops": 4,
  "data": {
    "task_id": "550e8400-e29b-41d4-a716-446655440000",
    "step_id": "T2-reserve-funds",
    "idempotency_key": "hex(SHA-256(JCS([\"idem-v1\", task_id, step_id])))",
    "pivot_reached": false,
    "compensation": {
      "channel_identity": "spiffe://corp.example/ns/orch/sa/saga-compensator",
      "tool_id": "finance.ledger.release_hold",
      "max_attempts": 2,
      "escalation_queue": "ops.human.priority.saga"
    }
  }
}
```

Contrat opérationnel croisé — Architecte d’entreprise (AE) | Architecte de solutions (AS)

Décisions AE

1. **Imposer `OO3`/`OO4` :** Interdire `OO1`, `OO2` et les dix antipatrons dès que le test à trois conditions de `C26 § 29.4.1` (`[S]`) est vérifié P : PRI-002 P : CAP-007 E : EXIG-ORC-01 E : EXIG-ORC-29.
2. **Borner les topologies :** Exiger un gain mesuré face à l’agent unique avant tout multiagent ; limiter la délégation à `≤ 2` niveaux et l’évaluateur à `≤ 3` tours P : CAP-010 E : EXIG-ORC-02 E : EXIG-ORC-04 E : EXIG-ORC-05.
3. **Exiger la preuve trimestrielle :** Subordonner `POR-003` et `POR-006` à l’injection de fautes Saga et au test trimestriel du coupe-circuit validant le canal dédié P : PRI-009 P : POR-003 P : POR-006 E : EXIG-ORC-20 E : EXIG-ORC-28.

Spécifications AS

1. **Journaliser hors processus :** Exécuter sur moteur durable chiffré, enregistrer chaque appel LLM comme effet de bord non rejoué et revalider droits et état au réveil d’un `awakeable` P : CAP-008 P : DEC-005 E : EXIG-ARC-05 E : EXIG-ORC-11 E : EXIG-ORC-12 E : EXIG-ORC-13 E : EXIG-AUT-17.
2. **Dédupliquer de bout en bout :** Calculer hors modèle `cle = hex(SHA-256(JCS(["idem-v1", task_id, step_id])))` (`RFC 8785`, `UUIDv4`), transmettre `Idempotency-Key` et contrôler sa déduplication atomique côté cible P : CAP-009 E : EXIG-ORC-21 E : EXIG-ORC-22.
3. **Câbler Saga et canal dédié :** Tenir le journal en ajout seul avant action, isoler le canal de compensation sous identité et réserve propres à l’orchestrateur, et escalader après `2` échecs E : EXIG-ORC-15 E : EXIG-ORC-16 E : EXIG-ORC-17 E : EXIG-ORC-18 E : EXIG-ORC-26 E : EXIG-ORC-28.

### 5.5 Grille de décision

| Décision | Option par défaut | Quand s’en écarter | Preuve |
| --- | --- | --- | --- |
| Régime d’orchestration d’un processus audité | Machine à états déterministe invoquant des cellules agentiques typées (`OO3` ou `OO4`, patron 1) P : PRI-002 | Sous-tâches inconnues d’avance à risque faible, sous patron orchestrateur-exécutants à `≤ 2` niveaux E : EXIG-ORC-04 | `[M]` `MAST` (`C27` § 21.1) ; `[S]` `C26` § 22.1, § 29.4.1 |
| Passage de l’agent unique au multiagent | Agent unique doté de `≤ 15` outils `[S]` (`ADR-005`, alerte dès `> 15` sous `EXIG-ORC-09`) et contexte compilé (patron 8) E : EXIG-ORC-02 E : EXIG-ORC-09 | Gain mesuré sur le jeu interne ou séparation stricte de domaines de sécurité (`DEVRAIT`) E : EXIG-ORC-10 | `[M]` `C27` § 16.7 (`-70 %` à `+80,8 %`), § 48.4 ; `[S]` `ADR-005` |
| Persistance d’état et appels au modèle | Moteur durable externe persistant chaque transition et journalisant chaque inférence comme effet de bord E : EXIG-ORC-11 E : EXIG-ORC-12 | Requête consultative synchrone en un tour sans écriture ni attente (`Classe 1` / `N1`) | `[É]` `CAD26` § 7.4 ; `C27` ch. 18 (`DEC-005`) |
| Non-duplication des écritures à la reprise | Clé d’idempotence `JCS` dérivée de l’étape durable (`Idempotency-Key`) et dédupliquée par la cible E : EXIG-ORC-21 E : EXIG-ORC-22 | Jamais : tout outil mutatif sans déduplication vérifiée est classé `P3` E : EXIG-AUT-08 | `[M]` Deux généraux (`C26` § 1.5.2, § 48.1) ; `[É]` `RFC 8785` |
| Mutations sur plusieurs systèmes centraux | Patron Saga à point pivot, journal préalable en ajout seul et escalade après `2` échecs E : EXIG-ORC-15 E : EXIG-ORC-16 E : EXIG-ORC-18 | Écriture atomique dans un seul système d’enregistrement doté d’une transaction locale | `[É]` `CAD26` § 7.5 ; `C27` § 18.4 ; `PD28` `CAP-009` |
| Sagas en vol lors d’un coupe-circuit | Blocage vers l’avant de l’agent et compensations via canal dédié sous identité d’orchestrateur E : EXIG-ORC-17 E : EXIG-ORC-28 | Suspension motivée et journalisée de l’orchestrateur lui-même si celui-ci est compromis | `[S]` `CAD26` `PRIN-12`, § 7.8 ; `[N]` `BSIF` E-23 (`ANC-103`) |

### 5.6 Limites et renvois au corpus

- **Prépublications et constructions** `[S]` **:** le manifeste `APM` (`S-034`), la classification `OO1–OO4` (`S-035`) et `SagaLLM` (`C27 ch. 18`) sont des prépublications non révisées par les pairs ; le test à trois conditions (`C26 § 29.4.1`), le Tableau 48.1 (*Lecture / Écriture / Engagement*) et le canal de compensation dédié (`CAD26 § 7.8`) relèvent de constructions d’auteur (`[S]`).
- **Brouillons et sources secondaires :** `draft-ietf-httpapi-idempotency-key-header` (expiré en `-07` le 18 avril 2026, repris en `-08` le 22 octobre 2026) n’est pas une RFC ; Garcia-Molina et Salem (1987) est cité via `SagaLLM`, l’article *Nexus* (2026) est non exploité, et aucun banc indépendant ne compare les moteurs durables sous charge agentique.
- **Angles morts de degré 3 (**`C26 § 48.2–48.5`**) :** ni `MCP`, ni `A2A`, ni `AP2` ne déclarent l’idempotence d’un outil ni ne relient nativement un appel d’agent à un `UETR` `ISO 20022` ; le consensus inter-organisations sous fautes byzantines reste hors périmètre protocolaire (traité par rapprochement tripartite au Chapitre 9).
- **Renvois aux 4 PDF :** `C26` ch. 1 (§ 1.5.2, § 1.6.2.2), ch. 22 (pp. 254–268), ch. 29 (§ 29.4 pp. 337–339), ch. 48 (pp. 544–551) ; `CAD26` ch. 7 (pp. 98–118) ; `C27` ch. 16–21 (pp. 313–455) ; `PD28` M-9, M-10 (`CAP-007..011`) et M-13 (`DEC-005`).

## Chapitre 6 — Autonomie graduée, classes de décision, supervision humaine et liaison cryptographique

> **Ancrage corpus (état de référence : 17 novembre 2026) :** `[C26 ch. 14 (§ 14.4), ch. 17 (§ 17.4–17.5), ch. 27, ch. 29 (§ 29.4.1), ch. 31 (§ 31.1), ch. 43 (§ 43.3–43.5), Annexe N]` · `[CAD26 ch. 8 | EXIG-AUT-01 à EXIG-AUT-23 | PRIN-04, PRIN-05, PRIN-10 | ch. 11 (EXIG-GOV-17), ch. 12 (EXIG-CON-01 à EXIG-CON-09), ch. 14]` · `[C27 § 0.4, ch. 22, ch. 30 (§ 30.4, § 30.9 [S]), ch. 38, ch. 41 | ADR-003, ADR-018, ADR-025 | PRR S-09, S-10, G-03, G-04, G-06, G-11, G-12]` · `[PD28 M-7, M-12, M-24, M-26 | PRI-006, PRI-007 | CAP-002, CAP-003, CAP-048 | INI-043 | POR-009, POR-014, POR-015 | SIG-017, SIG-101, SIG-105, SIG-106]`.

*Question directrice : Jusqu’où déléguer l’action par domaine et par acte, et comment garantir techniquement que la supervision humaine ne devienne ni un rituel d’interface ni une approbation machinale ?*

- **Thèse du chapitre :** L’autonomie d’un agent ne découle jamais de la capacité brute du modèle. Une approbation exigée à tout propos dégénère en clic machinal inopérant en sûreté comme en droit (`[M]`, `[N]`). La délégation se gouverne par la matrice croisant huit domaines (`D1–D8`), six classes de décision et le couple `N0–N4 × P0–P3`. Elle interdit sans dérogation l’autonomie non bornée (`NX`) et toute exécution solitaire d’un acte irréversible (`P3`) P : PRI-006 P : CAP-048 E : EXIG-AUT-03 E : EXIG-AUT-07 E : EXIG-AUT-09 E : EXIG-GOV-17. Chaque acte sensible exige une approbation hors bande (`OpenID Connect CIBA`, `FIDO2`) scellée au condensat `h = SHA-256(JCS( — ))` retenu à la passerelle. Elle sépare le point d’arrêt préventif (`PC3`) de la révision légale a posteriori et instrumente la vigilance P : PRI-007 P : CAP-002 P : CAP-003 E : EXIG-AUT-12 E : EXIG-AUT-19 E : EXIG-AUT-21 E : EXIG-AUT-23.

### 6.1 Gouvernance matricielle de l’autonomie : domaines D1–D8, stades 0–4 et classes de décision 1–6

Exiger un humain devant chaque pas annule le gain tout en usant le réviseur. À l’inverse, laisser un agent décaisser ou refuser seul engage l’institution sans décideur identifiable (`C27 ch. 22`, `C26 § 31.1.3`). La littérature (Feng et coll., 2025 ; IMDA v1.5, mai 2026 ; *Least-Agency* OWASP) établit que **l’autonomie est un choix de conception par acte et configuration, indépendant du modèle** (`C27 § 22.2`, `CAD26 § 8.1`). Dans `MAP`, `68 %` des agents restent d’ailleurs bornés à dix étapes (`C27 § 22.7`). Entre *dans la boucle*, *sur la boucle*, *hors de la boucle* et *aux commandes* (UE 2019, `C27 § 22.1`), comme entre *copilote* et *autonomie transactionnelle* (`C26 § 31.1.3, Tableau 31.1`, statut « C » `[É]` sur *Moffatt v. Air Canada*, 2024, `650,88 $ CA`), la position **aux commandes** ne se délègue jamais.

Deux échelles raccordées en Annexe A cadrent ce choix (`PD28 M-12`, `CAD26 ch. 8, ch. 12, ch. 14`, `ADR-003`). Côté AE, **huit domaines (`D1–D8`, `[S]` de `PD28 § 12.2`)** structurent le portefeuille : `D1` *Distribution et relation client*, `D2` *Conseil, vente et convenance*, `D3` *Souscription et tarification*, `D4` *Contrats et comptes*, `D5` *Règlement et sinistres*, `D6` *Conformité, LBC et risques*, `D7` *Trésorerie, investissement et réassurance*, `D8` *Opérations TI et cyberrésilience*. Chacun progresse sur **cinq stades (`Stades 0–4`)** au rythme de son maillon faible (`PD28 § 12.3`). Le `Stade 2` (Niveaux 2–3 `CAD26 ch. 14`) ouvre la production réglementée, tandis que le `Stade 3` (Niveau 4 `CAD26`) suffit à la majorité. En 2035, **le `Stade 4` inter-organisations demeure proscrit en `D2` et** `D6` (représentant inscrit et secret `CANAFE`). `PD28 M-12` (p. 170) plafonne ainsi `D2` aux `Stades 2–3`, `D6` au `Stade 3` interne uniquement et `D7` au `Stade 3` (malgré une divergence avec `M-15` et `M-18`) C : A, B, C ; SIG-101, SIG-105.

Par acte, la table aligne `Classes 1–6` (`PD28 § 12.4`), `N0–N4 × P0–P3 × 3 classes de risque` (`CAD26 ch. 8, ch. 12`), `L0–L4` (`C27 § 0.4`) et `OO1–OO4` **/** `Q-A..Q-E` `[S]` (`C26`) :

| Classe de décision (`PD28 M-12`) | `CAD26` (`N0–N4` × `P0–P3` × Classe de risque) | `C27` (`L0–L4`) | `C26` (`OO1–OO4`, construits `[S]`) | Contrôle obligatoire |
| --- | --- | --- | --- | --- |
| **Hors classe agentique** (flux fixe) | `N0` Automatisation déterministe | `L0` déterministe | `OO3` pur / code | Tests logiciels classiques et revue de code |
| `Classe 1` — Lire et analyser | `N1` Consultatif sur `P0` et `P1`, toutes classes | `L1` lecture filtrée | `OO1`/`OO2` lecture, `Q-A`/`Q-D` `[S]` | Filtrage `ACL` amont et télémétrie sans contenu |
| `Classe 2` — Agir réversible borné | `N3` sous domaine nominal (*Operational Design Domain*, `ODD`, faible/modérée) ou `N2` (élevée) sur `P2` | `L3` borné / `L2` | `OO3`/`OO4` sous enveloppe | Clé d’idempotence, compensation Saga, revue échantillonnée (`5 %` modérée, `1 %` faible) |
| `Classe 3` — Agir matériel coûteux | `N2` par défaut (`N3` sous seuil homologué) sur `P2` **> seuil** | `L2` (`L3` restreint) | `OO3`/`OO4` arrêt `PC3` `[S]` | Approbation signée `JCS SHA-256` (à chaque action en classe élevée) |
| `Classe 4` — Agir irréversible critique | Outil `P3` : **jamais exécuté seul** (même `N4`) | `L2` strict hors bande | `OO3`/`OO4` irréversible (`§ 31.1`) | `CIBA` + `FIDO2` lié à `h` (`≤ 15 min`), tampon pré-engagement, **2 approbateurs** en élevée |
| `Classe 5` — Décision visant personne | **Classe élevée** plafonnée `N2` (`EXIG-CON-02`) | `L2`/`L3` `art. 12.1` | `OO3`/`OO4` (`§ 29.4.1` `[S]`), `Q-E` `[S]` | Avis contemporain, facteurs explicables, réexamen humain, dossier `≥ 1 an` |
| `Classe 6` — Hors mandat (cadre/journaux) | `NX` **INTERDIT** sans dérogation (`EXIG-AUT-03`, `EXIG-GOV-17`) | Exclu de `L0–L4` | Violation `PC4` / `Z3` `[S]` | Blocage déterministe hors modèle (`CAP-037`) et coupe-circuit immédiat (`CAP-039`) |

Cinq règles régissent cette table P : PRI-006 P : CAP-048 (`PRR G-03`, `PRR G-04`, `PRR S-09`) :

1. **Interdictions non dérogeables (**`EXIG-GOV-17`**)** : aucune dérogation n’autorise `NX` **(**`Classe 6`**)**, le dépassement du plafond de classe, un `P3` **(**`Classe 4`**)** sans humain hors bande, ni le franchissement de `N2` sous la règle d’or E : EXIG-AUT-01 E : EXIG-AUT-02 E : EXIG-AUT-03 E : EXIG-AUT-09 E : EXIG-CON-02 E : EXIG-GOV-17.
2. **Permissions effectives et règle d’or (**`≤ N2`**)** : le classement suit les accès réels E : EXIG-AUT-06. Cumuler impact élevé, faible réversibilité et détection lente (tout critère non étalonné étant réputé atteint) **plafonne à** `N2`, quels que soient les scores d’essai E : EXIG-AUT-07.
3. **Paliers** `P0–P3` **au catalogue** : les indices `MCP` (`readOnlyHint`, `destructiveHint`) étant non fiables, le palier est fixé en revue sécurité, avec montants `P2`/`P3` en décimal exact ou entiers d’unités mineures E : EXIG-AUT-08 E : EXIG-MCP-14.
4. **Union la plus stricte par appel** : la passerelle prend le maximum entre `classe × palier`, maillon le plus restrictif (*High-Water Mark*), seuils métier et **règle de deux** E : EXIG-AUT-10 E : EXIG-SEC-04.
5. **Domaine nominal d’exploitation (**`ODD`**) et agents ambiants** : `N3` et `N4` (`N4` réservé à la **classe faible** par le comité) exigent un `ODD` borné, réévalué sur changement, et la **réautorisation périodique** des agents ambiants (`C27 § 22.3`) E : EXIG-AUT-04 E : EXIG-AUT-05 E : EXIG-AUT-18.

### 6.2 Architecture de l’approbation hors bande et liaison cryptographique aux paramètres (JCS SHA-256 et CIBA)

Contre le *délégué confus* (`OWASP ASI02`) et l’injection post-validation, la passerelle rejette en mode fermé tout « oui » conversationnel, résumé d’agent, confirmation locale (`IETF WIMSE AIMS`), *elicitation* `MCP` ou jeton émis pour d’autres arguments, tâche ou agent E : EXIG-AUT-11 E : EXIG-AUT-13 E : EXIG-MCP-21.

> **[Figure]**
> - Matrice d’autonomie (Classes 1–6 × N0–N4) & circuit JCS / CIBA Gouvernance par acte (NX interdit), jeton lié EXIG-AUT-09..13 et CIBA
> - Plafonds D1–D8 : D1/D4/D8 (St. 3/4) · D2 Conseil [St. 2–3, St. 4 proscrit]
> - D3 (2–3) · D5 Sinistres (refus=hum.) · D6 [St. 3 int. M-12] · D7 (St. 3)
> - Classe (PD28) CAD26 / C27 Contrôle obligatoire de conception
> - Cl. 1 · Lire N1 · P0–P1 · L1 ACL amont mandant (ARC-16)
> - Cl. 2 · Révers. N3/N2 · P2 · L3 Idempotence + Saga + revue 5 %/1 %
> - Cl. 3 · Matériel N2/N3 · P2>s. · L2 Durable, revalid. réveil, JCS
> - Cl. 4 · Irrévers. P3 · L2 + CIBA CIBA/FIDO2 lié h (≤ 15 min), 2 sig.
> - Cl. 5 · Pers. Plaf. N2 (CON-02) Loi 25 art. 12.1 + dossier ≥ 1 an
> - Cl. 6 · Hors m. NX INTERDIT Interdit GOV-17 (AUT-03) + arrêt
> - Circuit hors bande : h = SHA-256(JCS({outil, version, digest, agent, args}))
> - 1. Agent / Orchestrateur
> - Émet appel P3 ou P2 > seuil
> - Zéro accès au jeton (IAM-06)
> - « Oui » en chat rejeté (AUT-13)
> - 2. Passerelle PEP (fermé)
> - Valide I-JSON (RFC 7493)
> - Calcule condensat h (JCS)
> - Vérifie jti unique & recalcule h
> - 3. Canal CIBA & Approbateur
> - Appareil/session distincts
> - Vue hors LLM (ASI09)
> - FIDO2 + RAR (exp ≤ 15 min)
> - 4. Système cible & Audit
> - Octets exacts canonisés
> - Clé d’idempotence vérifiée
> - Preuve h + jti scellée JCS
> - Anti-complaisance : plafond/quart (AUT-20) · témoins (POR-014) · repli < 60 s

*Fig. 6. – Matrice d’autonomie unifiée (D1–D8 × Classes 1–6 × N0–N4 / P0–P3, interdiction NX/Classe 6) et séquence d’approbation hors bande liée au condensat JCS SHA-256 via CIBA et FIDO2.*

Le circuit hors bande (`CAD26 § 8.5` Figure 16, `C27 ch. 30 § 30.4, § 30.9` `[S]`, `ADR-018`) scelle la signature aux octets exacts de l’appel P : CAP-002 (`PRR S-10`) :

1. **Filtrage `I-JSON` et condensat `JCS`.** Après persistance durable E : EXIG-AUT-17, la passerelle rejette tout JSON hors `I-JSON` **(`RFC 7493`** : clés dupliquées, flottants inexacts, chaînes invalides), canonise selon `RFC 8785` **(`JCS`)** et calcule : `h = SHA-256(JCS({outil, version, definition_digest, agent_id, task_id, arguments}))` où `arguments` inclut la clé d’idempotence et, sur ressource mutable `P3`, les valeurs résolues ou l’`ETag` vérifié à l’exécution E : EXIG-AUT-12.
2. **Canal hors bande (**`OpenID Connect CIBA` **+** `FIDO2` **+** `RFC 9396`**).** Le service d’approbation dépose la requête en **boîte persistante** E : EXIG-AUT-16 et notifie un approbateur formé E : EXIG-AUT-15 sur appareil distinct via `OpenID Connect CIBA`, détails `RFC 9396` (`authorization_details`, `EXIG-AUT-14`, `DEVRAIT`) et `FIDO2` **/** `WebAuthn` E : EXIG-AUT-09 E : EXIG-AUT-14.
3. **Jeton retenu à la passerelle (**`≤ 15 min`**,** `jti` **atomique).** Le jeton lie `{émetteur, audience=passerelle, h, approbateur_pseudonyme, rôle, task_id, agent_id, exp ≤ 15 min, jti}`, **reste à la passerelle hors modèle** E : EXIG-IAM-06, consomme un `jti` atomique (fermé si indisponible E : EXIG-AUT-11), revérifie `h` et relaie la forme canonique.
4. **Réessais, sagas et double approbateur.** Sous `≤ 15 min`, le jeton couvre les réessais idempotents de même `h` ; au-delà, l’état est vérifié par clé d’idempotence avant nouvelle signature. L’approbation d’une étape Saga couvre sa compensation déclarée jusqu’à clôture. En **classe élevée sur** `P3`, **deux approbateurs distincts** signent le même `h` ; toute édition recalcule `h` sous co-approbateur indépendant E : EXIG-AUT-12 E : EXIG-AUT-15.

Contrat schématique AS d’objet `authorization_details` (`RFC 9396` / `OpenID Connect CIBA`) scellant le condensat `JCS` (`EXIG-AUT-12`, `EXIG-AUT-14`) :

```
{
  "type": "ca.fin.p3_approval",
  "binding_alg": "SHA-256-JCS-RFC8785",
  "payload_digest_h": "sha256:4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
  "tool": "payments.rtr.submit_pacs008",
  "tool_version": "1.2.0",
  "agent_id": "spiffe://corp.example/ns/pay/sa/agent-rtr",
  "task_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount_decimal": "12500.00",
  "currency": "CAD",
  "jti": "jti-9a7f1c2e-single-use",
  "exp_seconds": 900,
  "required_approvers": 2,
  "authenticator": "FIDO2-WebAuthn-out-of-band"
}
```

### 6.3 Point d’arrêt préventif (PC3) contre révision humaine a posteriori (Loi 25 art. 12.1)

Il ne faut jamais confondre **point d’arrêt préventif** (`PC3` / `HITL` avant action risquée) et **révision humaine a posteriori** (`C26 ch. 27 § 27.2–27.4, ch. 43` `PC1`–`PC3` ; `CAD26 § 8.8, § 12.2` ; `C27 § 38.4`). L’article 12.1 de la Loi 25 (en vigueur le 22 septembre 2023 D) régit toute décision fondée *exclusivement* sur un traitement automatisé de renseignements personnels (`Classe 5`). Il ouvre trois droits P : CAP-003 E : EXIG-AUT-22 E : EXIG-CON-07 (`PRR G-06`) : un **avis d’office** au plus tard lors de la décision (`PC1`), l’accès aux renseignements utilisés et aux **raisons, facteurs et paramètres principaux** (`PC2`), ainsi que le droit de soumettre des observations à un **personnel habilité à réviser effectivement la décision** E : EXIG-AUT-23. Entrées, versions et facteurs sont archivés **au moins un an** dans un **dossier de décision chiffré** distinct des traces E : EXIG-CON-09. Cette architecture s’aligne sur `BSIF E-23` (1er mai 2027 D, `ANC-103`) et `RIA` art. 14 (2 décembre 2027 D, `ANC-007`).

Une validation nominale, pressée par la cadence ou sans pouvoir réel d’infirmation n’écarte pas l’article 12.1 et expose à une requalification devant la `CAI` (`SIG-106`) E : EXIG-CON-08. À titre comparatif — limité aux **ministères et organismes publics gouvernementaux** et non applicable au secteur financier privé —, la *Directive sur la prise de décisions automatisée* du Conseil du Trésor fédéral et le guide 2026 du MCN englobent l’automatisation partielle et proscrivent la supervision symbolique (`C27 § 22.6, § 38.2, § 38.5`).

### 6.4 Ergonomie anti-complaisance (ASI09), mesure de vigilance et préservation de la relève

Un jeton `CIBA` reste vain sous clic réflexe (`OWASP ASI09`, `C26 § 17.5`, `CAD26 § 8.7`). `C27 ch. 22` (`§ 22.5`) et `ch. 41` (`§ 41.2`) chiffrent ce biais : `93 %` d’acceptation sur un agent de programmation et `17 %` d’actions excessives manquées par un classifieur. Sous conseil erroné, les erreurs bondissent de `+26 %` (`6 %` à `11 %` de réponses justes inversées, Goddard et coll.), le tandem humain-IA tombant sous le meilleur des deux seul. L’érosion de la relève s’y ajoute : `-20 %` d’emploi chez les développeurs de 22–25 ans depuis 2024 (*Stanford HAI 2026*), et `18 %` d’entreprises freinant l’embauche à trois ans (`SAP 2026-22` Banque du Canada, `PD28 M-26 § 26.3`, `SIG-017`).

Quatre contrôles parent cette dérive P : PRI-007 P : CAP-002 (`PRR G-11`, `PRR G-12`) :

1. **Écran différentiel hors modèle** : généré depuis les arguments `I-JSON` (cible, montant, écart avant/après, contradictions, jamais un résumé d’agent), avec avis préalable de l’expert sur enjeux élevés P : DEC-002 E : EXIG-ARC-03 E : EXIG-AUT-19.
2. **Charge bornée** : filtrage déterministe en `Classe 2` réservant la file aux exceptions et `P3` (`~0,8 %` des appels mesurés, `C27 § 22.7`), plafond par quart, rotation et absence de cadence pénalisant le refus E : EXIG-AUT-20.
3. **Métrologie et dossiers témoins** : suivi du temps médian d’examen, des approbations sans retouche, des infirmations et de l’interception de **dossiers témoins à défaut connu**, conditionnant `POR-009` et `POR-014` P : POR-009 P : POR-014 E : EXIG-AUT-21.
4. **Quotas formateurs et rétrogradations distinctes** : quota manuel de bout en bout dès `> 70 %` d’automatisation P : INI-043, **bascule automatique** `< 60 s` vers `N2` sur bris opérationnel P : POR-015, distincte en `CAD26` de l’abaissement d’un niveau après `3` mois hors `SLO` (`EXIG-EVA-06`) et du passage à *suspendu* après `> 30` jours de vacance d’un rôle `A` ou en revue trimestrielle E : EXIG-EVA-06 E : EXIG-GOV-09 E : EXIG-GOV-13.

Contrat opérationnel croisé — Architecte d’entreprise (AE) | Architecte de solutions (AS)

Décisions AE

1. **Verrouiller** `Domaine × Classe` **:** Plafonner `D1–D8 × Classes 1–6`, exclure `Stade 4` en `D2`/`D6` et sanctionner `EXIG-GOV-17` (`NX`, `P3` seul, règle d’or `≤ N2`) P : PRI-006 P : CAP-048 E : EXIG-AUT-03 E : EXIG-AUT-07 E : EXIG-AUT-09 E : EXIG-CON-02 E : EXIG-GOV-17.
2. **Garantir** `art. 12.1` **:** Dissocier `PC3` de l’avis d’office, de l’explication des facteurs et de la révision effective ; bannir l’approbation nominale P : CAP-003 E : EXIG-AUT-22 E : EXIG-AUT-23 E : EXIG-CON-07 E : EXIG-CON-08.
3. **Protéger jugement et relève :** Borner les files, auditer les cas témoins (`POR-014`), maintenir le quota manuel (`> 70 %`) et armer la bascule `< 60 s` (`POR-015`) P : PRI-007 P : INI-043 P : POR-014 P : POR-015 E : EXIG-AUT-20 E : EXIG-AUT-21.

Spécifications AS

1. **Union stricte :** Qualifier `P0–P3` au catalogue (indices `MCP` ignorés, décimal exact) et évaluer par appel seuils et règle de deux E : EXIG-AUT-08 E : EXIG-AUT-10 E : EXIG-MCP-14 E : EXIG-SEC-04.
2. **Circuit `JCS SHA-256` + `CIBA`/`FIDO2` :** Filtrer `I-JSON` (`RFC 7493`), hacher `h = SHA-256(JCS(...))` (`RFC 8785`), notifier hors bande (`CIBA` et `RFC 9396`, `DEVRAIT`, + `FIDO2`), retenir le jeton (`≤ 15 min`, `jti` atomique) à la passerelle hors modèle et doubler les signataires sur `P3` élevé P : CAP-002 E : EXIG-AUT-11 E : EXIG-AUT-12 E : EXIG-AUT-14 E : EXIG-AUT-15 E : EXIG-IAM-06.
3. **Écran et archive :** Générer la vue différentielle hors modèle, injecter les témoins et conserver `≥ 1 an` le dossier chiffré `art. 12.1` E : EXIG-AUT-19 E : EXIG-AUT-21 E : EXIG-CON-09.

### 6.5 Grille de décision

| Décision | Option par défaut | Quand s’en écarter | Preuve |
| --- | --- | --- | --- |
| Niveau d’autonomie initial | Minimum suffisant (`N1` ou `N2`) sous plafond de classe, permissions effectives et règle d’or (`≤ N2`) E : EXIG-AUT-01 E : EXIG-AUT-06 E : EXIG-AUT-07 | `N3` sur `P2` compensable sous `ODD` ; `N4` réservé à la classe faible par le comité E : EXIG-AUT-04 | `[N]` `RIA` art. 14 (`ANC-007`) ; `[É]` `IMDA` v1.5 ; `CAD26` Tableau 28 |
| Acte critique ou irréversible (`Classe 4` / `P3`) | Approbation hors bande (`CIBA` + `FIDO2`) liée à `SHA-256(JCS)` à chaque appel ; 2 signataires en élevée E : EXIG-AUT-09 E : EXIG-AUT-12 E : EXIG-AUT-15 | Jamais en exécution initiale (E : EXIG-GOV-17) ; compensation Saga pré-approuvée selon journal | `[É]` `OWASP` `ASI02` ; `CAD26` § 8.5 (`RFC 7493`, `RFC 8785`, `RFC 9396`) |
| Accord humain dans le fil de l’agent | Rejet fermé par la passerelle : ni « oui » conversationnel ni résumé d’agent ne valent approbation E : EXIG-AUT-11 E : EXIG-AUT-13 | Jamais sur `P2` validé et `P3` ; seul le jeton du service d’approbation fait foi | `[É]` `IETF WIMSE AIMS` ; `CAD26` Figure 16, `EXIG-MCP-21` |
| Décision visant une personne (`Classe 5`) | Plafond `N2` avec réviseur humain compétent, ou avis d’office, facteurs explicables et réexamen (`art. 12.1`), dossier `≥ 1 an` E : EXIG-CON-02 E : EXIG-CON-07 E : EXIG-CON-09 | Jamais par validation nominale ou cadence excessive (requalification `SIG-106`) E : EXIG-CON-08 | `[N]` `Loi 25` art. 12.1 (`C26` `S-025`, `S-135`) ; `BSIF` E-23 (`ANC-103`) |
| Anti-complaisance (`ASI09`) et relève | Vue différentielle hors modèle, plafond par quart, témoins et quota manuel dès `> 70 %` d’automatisation P : INI-043 E : EXIG-AUT-19 E : EXIG-AUT-20 E : EXIG-AUT-21 | Actes `Classe 2` sous seuil dotés de compensation automatique éprouvée et audités | `[M]` Goddard et coll. (`+26 %`) ; `C27` § 22.5, § 41.2 ; `Stanford HAI 2026` |
| Dérive qualité ou vacance du parrain | Bascule automatique `< 60 s` vers `N2` P : POR-015 ; baisse d’un niveau après `3` mois hors `SLO` et suspension après `> 30` jours de vacance ou en revue trimestrielle E : EXIG-EVA-06 E : EXIG-GOV-09 E : EXIG-GOV-13 | Jamais de maintien tacite en `N3`/`N4` ; réouverture signée par 1re et 2e lignes | `[N]` `BSIF` E-23 (`ANC-103`) ; `[É]` `CAD26` `EXIG-EVA-06`, `GOV-09`, `GOV-13` ; `[S]` `POR-015` |

### 6.6 Limites et renvois au corpus

- **Questions juridiques ouvertes au 1er novembre 2026 :** la portée de « exclusivement automatisé » (`Loi 25 art. 12.1`) sur une chaîne multiagent reste une question ouverte de degré 3 (zéro occurrence dans le rapport quinquennal `CAI` de mai 2026 ni dans ses actualités au 29 octobre 2026, `C26 Annexe N.3 p. 669`, `SIG-106`), de même que son applicabilité aux entités fédérales (`C26 § 27.3`).
- **Textes non déposés (« statut F » au corpus), limites empiriques et divergence interne** `PD28` **:** l’extraction automatisée sur `LégisQuébec` a été bloquée en amont (les appuis `[N]` proviennent des textes officiels sanctionnés `L+` et de `C26`/`CAD26`) ; `ISO/IEC 42105` n’a pas été consultée (`C27 ch. 22`) ; aucune mesure indépendante ne quantifie la fatigue d’approbation en institution financière (`93 %` et `17 %` provenant d’un seul éditeur). Enfin, `PD28` comporte une divergence interne entre `M-12` (p. 170 : `D6` au `Stade 3` interne uniquement et `D7` au `Stade 3`) et `M-15` (p. 200) ainsi que `M-18` (`§ 18.4` p. 237, `Fig. 5` p. 242), qui cotent `D6` et `D7` aux `Stades 3–4` sur des fonctions techniques sans données clients ; le mémoire retient le plafond prudent de `M-12`.
- **Constructions d’auteur (**`[S]`**) :** la grille `D1–D8 × Stades 0–4`, les `Classes 1–6` (`PD28 M-12`), la règle d’or `EXIG-AUT-07` et le profil `CIBA` + `RFC 9396` + `h = SHA-256(JCS(...))` (`≤ 15 min`, `CAD26 § 8.5`) sont des synthèses propres au corpus adossées à des standards ouverts.
- **Renvois aux 4 PDF :** `C26` ch. 14 (§ 14.4), ch. 17 (§ 17.4–17.5), ch. 27, ch. 31 (§ 31.1), ch. 43 (§ 43.3–43.5), Annexe N.3 (pp. 668–670) ; `CAD26` ch. 8 (pp. 118–136), ch. 11 (`EXIG-GOV-17`, p. 201), ch. 12 (§ 12.2) ; `C27` § 0.4, ch. 22 (pp. 456–467), ch. 30 (§ 30.4, § 30.9 [S]), ch. 38 (§ 38.4), ch. 41 (§ 41.2) ; `PD28` M-12 (pp. 167–176), M-24 et M-26 (§ 26.3).

# Partie III — Bâtir la fabrique de confiance et l’exploitation : le socle partagé AE / AS

Chapitre 7 — Fabrique de confiance : NHI, 2e saut, défense anti-injection et transition PKI / post-quantique

Chapitre 8 — Observabilité à double couloir PII, journal d’audit JCS, évaluation E1–E3 et FinOps CPO

Chapitre 9 — Plan d’inférence, six substrats d’état, confidentialité matérielle, résilience et réseaux B2B

## Chapitre 7 — Fabrique de confiance : NHI, 2e saut, défense anti-injection et transition PKI / post-quantique

> **Ancrage corpus (état de référence : 17 novembre 2026) :** `[C26 ch. 14, 16–21, Ann. N]` · `[CAD26 ch. 9, Ann. H | EXIG-IAM-01..21, EXIG-SEC-01..26 | PRIN-03, PRIN-07]` · `[C27 ch. 29–32, 49 | ADR-018..020]` · `[PD28 M-5 | PRI-004, PRI-005, PRI-012 | CAP-030, CAP-035..040 | DEC-009, DEC-012 | POR-003, POR-007, POR-011]`.

*Question directrice : Comment bâtir une chaîne d’identité, de délégation, de confinement et de preuve cryptographique qui survive aux injections d’invite, aux attaques multi-sauts, aux certificats de 47 jours et à l’échéance post-quantique ?*

**Thèse du chapitre :** En novembre 2026, aucun standard n’offre de passeport d’agent complet (`0/15` réponses pleines à `Q-A..Q-E` `[S]` et `0/9` propositions `KYA` ratifiées). L’institution réglementée bâtit donc sa fabrique interne à confiance zéro P : PRI-004 P : PRI-005 E : EXIG-IAM-01. Elle impose des identités non humaines courtes sans secret statique E : EXIG-IAM-03 E : EXIG-IAM-05 et des jetons atténués liés à l’expéditeur contre la rupture du deuxième saut P : CAP-036 E : EXIG-IAM-08 E : EXIG-IAM-14. Elle couple retrait déterministe des outils sortants, isolation de flux et microVM fermées P : CAP-030 P : CAP-038 E : EXIG-SEC-06 E : EXIG-SEC-07 E : EXIG-SEC-08. Enfin, son agilité cryptographique devance les certificats de 47 jours et l’amplification post-quantique P : PRI-012 P : CAP-040 P : POR-007.

### 7.1 Diagnostic identitaire (`Q-A` à `Q-E`, `KYA`) et identités non humaines (`NHI`)

La sécurité périmétrique cède devant un agent qui lit du texte non fiable, mute des systèmes et délègue. `C26 ch. 14` évalue les mécanismes existants sur cinq questions (`[S]`) : `Q-A` (*qui es-tu ?*), `Q-B` (*qui t’a créé ?*), `Q-C` (*pour qui agis-tu ?*), `Q-D` (*que peux-tu faire ?*) et `Q-E` (*qui en répond ?*). Sur quinze cases croisant cartes `A2A`, annuaires commerciaux et registres gouvernés (tel `CSA Agent Registry`, 27 mars 2026), la grille relève `0/15` **réponses pleines**. Elle recense `0` « répond », `1` « ne répond pas », `7` « partiellement » et `7` cases muettes de degré 3 (`C26 § 14.2`, pp. 165, 485).

Trois vides normatifs l’expliquent. D’abord, le **passeport d’agent unifié** reste absent des normes (`C26 ch. 16`) : `SCIM Core Schema § 4` ignore les agents (`S-074`), `W3C VC 2.1` (`S-126`, actualisé le 22 oct. 2026 en `C26 Annexe N.2`, p. 663) et `DID v1.1` (`S-128`) manquent de profil agentique, et `IETF WIMSE` compte huit brouillons pour **zéro RFC** (`C26 Annexe N.2`, p. 663). Ensuite, les **neuf chantiers** `KYA` **de six organisations** (`W3C`, `OpenID Foundation`, `DIF`, `IETF`, `NIST`, `Akamai`) affichent `0/9` **textes ratifiés** (`C26 § 18.1`, Tableau 18.1, sous `S-096`), la charte `AIIM` excluant la normalisation mondiale (`S-094`). Enfin, la révocation sélective en cascade reste au degré 3 (`C26 § 20.6`, brouillons `draft-chen-oauth-agent-revocation-01` et `draft-sweeney-wimse-credential-delegation-02`).

L’institution gouverne donc l’**identité non humaine (**`NHI`**)** dans son noyau possédé P : PRI-004 P : CAP-035 E : PRIN-03 E : EXIG-IAM-01 E : EXIG-IAM-02. Toute confiance implicite est bannie (`EXIG-IAM-01`) au profit d’une autorisation explicite par requête (`EXIG-IAM-02`). Chaque agent reçoit une identité propre rattachée dans le système RH à un parrain actif et isolée entre mandants, locataires ou environnements (`ADR-025`, `OWASP NHI8, NHI9`) E : EXIG-IAM-03. Emprunter un compte humain est interdit sans dérogation (`EXIG-IAM-09`, `EXIG-GOV-17`) et échoue en pratique. En effet, `S-103` (Vol. III `F-57`, `C26 § 20.9` p. 234) montre son incompatibilité avec l’élévation juste-à-temps (`PIM`) et le laissez-passer temporaire (`TAP`) en arrière-plan continu.

L’identité repose sur un justificatif court lié à l’instance : certificat `SPIFFE` `X.509-SVID` (préféré au `JWT-SVID` rejouable ; durée bornée sous `EXIG-IAM-15`, `DEVRAIT`) ou fédération `OIDC` infonuagique E : EXIG-IAM-04 E : EXIG-IAM-15. Deux verrous parent les fuites (`OWASP NHI2, NHI7`) : **zéro secret statique** dans le code, les invites ou l’environnement E : EXIG-IAM-05, et **justificatifs hors de portée du modèle**, injectés au transport par la passerelle (`EXIG-IAM-19`, `DEVRAIT`) hors contexte et traces E : EXIG-IAM-06 E : EXIG-IAM-19. Au retrait, l’identifiant n’est jamais réattribué (`C27 § 29.2`) et la révocation préserve l’identité dédiée aux compensations Saga E : EXIG-IAM-07 E : EXIG-ORC-28.

### 7.2 Rupture au deuxième saut (`RFC 8693 § 4.1`), délégation atténuée et révocation

Relayer le jeton d’une personne (`Q-C`) transforme l’agent aval en **délégué confus** (*confused deputy*, `C26 S-070`, `OWASP ASI03`). Même l’échange `OAuth 2.0` (`RFC 8693`) bute sur le **problème du deuxième saut** (`C26 § 17.6`, `S-093`) : selon `RFC 8693 § 4.1`, la revendication `act` (*actor*) est purement informative pour le contrôle d’accès et ne réduit aucun privilège, laissant la cible aval incapable de vérifier seule l’atténuation des droits ou l’émetteur immédiat.

> **[Figure]**
> - Chaîne multi-sauts, choc PKI / ML-DSA et double couloir d’audit RFC 8693 + DPoP/mTLS, parades HTTP 431 (kid, SCITT) et OTel vs audit JCS
> - 1. Délégation atténuée ≤ 2 sauts (EXIG-IAM-08..16, CAEP ≤ 15 min)
> - 1. Mandant humain
> - Session auth. · sub initial
> - Anti-détournement PIM
> - 2. Agent A (Saut 1)
> - SPIFFE SVID + RFC 8693 #1
> - aud=B + DPoP / mTLS
> - 3. Agent B (Saut 2 max)
> - sub gardé + act empilé
> - Portées ⊆ #1 + RAR
> - 4. Cible via PEP
> - Vérifie aud & preuve cnf
> - Prof. ≤ 2 · zéro relais
> - 2a. Choc PKI 47 j & ML-DSA
> - TLS : 100 j → 47 j (2029)
> - ML-DSA : 3,3–4,6 Ko (72×)
> - 3 sauts = 20 à 35 Ko
> - Rejet HTTP 431 (8–16 Ko)
> - PQC G7 : 2030–2035 [A]
> - 2b. Parades P1–P2 (CAP-040)
> - (1) Clés par réf. kid / JWKS
> - & passerelles ≥ 32 Ko
> - (2) Transaction Tokens & COSE
> - (3) TLS 1.3 hybride + ACME
> - (4) Merkle SCITT · SLH-DSA
> - 3a. OTel Couloir 1 · Opérationnel
> - v1.41.0 épinglé · zéro contenu brut (OBS-07) · SHA-256 poivré
> - 3b. Couloir 2 · Débogage / forensique
> - « Bris de glace » double accord · purge ≤ 14 j (OBS-08) · art. 12.1 ≥ 1 an
> - 3c. Journal d’audit probatoire JCS
> - 5 champs RFC 8785 avant relais P2/P3 · ancré/h · ≥ 24 m (RPRP)

*Fig. 7. – Chaîne de confiance multi-sauts, parades au choc PKI / ML-DSA et double couloir d’audit (pseudonymisation sous table séparée du responsable de la protection des renseignements personnels, RPRP).*

Sans attendre les brouillons `IETF` ouverts (`WIMSE`, `OAuth 2.1 draft -17` expirant le 4 mai 2027, `ID-JAG -06`, `Identity Chaining -17`, `spiffe-client-auth -02`, `CAD26 Annexe H.2`, `SIG-003`) — encadrés en `CRE-IA-2027` **v2.0** derrière adaptateurs réversibles, parades `CBOR-COSE` `O(1)` anti-`HTTP 431` et bail local `fail-closed` `TTL ≤ 5 s` — l’AS impose cinq verrous par saut (`ADR-018`) P : CAP-036 :

1. **Échange systématique et zéro relais.** Chaque saut exécute `RFC 8693` en gardant le mandant dans `sub` (pseudonymisé sous table séparée du responsable de la protection des renseignements personnels, `RPRP`, Ch. 8) et l’identité `NHI` dans `act` E : EXIG-IAM-08 ; usurpation E : EXIG-IAM-09 et relais de jeton E : EXIG-IAM-12 E : EXIG-MCP-11 sont interdits sans dérogation E : EXIG-GOV-17. Hors session humaine, l’agent utilise *client credentials* à portées par outil E : EXIG-IAM-16.
2. **Intersection monotone bornée.** Les droits se restreignent à mandant ∩ agent sur **deux sauts maximum** E : EXIG-IAM-10 E : EXIG-ORC-04.
3. **Audience unique et détails typés.** `RFC 8707` fixe un destinataire unique E : EXIG-IAM-11 et `Rich Authorization Requests` (`RFC 9396`) porte plafond, compte et condensat `h`.
4. **Possession cryptographique.** Contre le vol de jetons au porteur (`C26 ch. 19`, `S-067` (Vol. III `F-21`)), `RFC 9700` E : EXIG-IAM-13 lie le jeton (`cnf`) par **TLS mutuel (`mTLS`, `RFC 8705`)** ou *Demonstrating Proof of Possession* (**`DPoP`,** `RFC 9449`) E : EXIG-IAM-14.
5. **Révocation continue et coupe-circuit `< 10 s` `[S]`.** Les flux *Shared Signals Framework* (`SSF`) et *Continuous Access Evaluation Profile* (`CAEP`) visent le plafond global `≤ 15 min` de `CAD26` E : EXIG-IAM-20 E : EXIG-SEC-26, tandis que le **coupe-circuit passerelle** suspend agent, gabarit ou outil en `< 10 s` `[S]` (`PRR S-14` / `POR-003`), testé chaque trimestre avec panne simulée d’une passerelle P : CAP-039 P : POR-003.

### 7.3 Défense anti-injection (`OWASP ASI`, règle de deux, `CaMeL`) et microVM à quatre verrous

Faute de frontière native entre instructions et données (`NIST AI 100-2 E2025`, `NCSC`), tout agent modéré ou élevé subit une modélisation des menaces. Celle-ci s’appuie sur `OWASP Top 10 for Agentic Applications 2026` **(**`ASI01–ASI10`**)**, `OWASP MCP Top 10` (bêta) et `MITRE ATLAS` (`v2026.10` : 16 tactiques, 129 techniques ; revue semestrielle) E : EXIG-SEC-01 E : EXIG-SEC-02 E : EXIG-GOV-12. Hors consigne directe du mandant et configuration épinglée, tout contenu est présumé non fiable E : EXIG-SEC-03. Si le démarquage (*spotlighting*) abaisse l’attaque de `> 50 %` à `< 2 %` sur banc (`CAD26 p. 157`), les filtres cèdent sous reformulation multilingue. **La détection seule est donc interdite** et testée en français et en anglais en CI E : EXIG-SEC-05 E : EXIG-SEC-24.

La défense applique hors modèle la **règle de deux par session composée** P : PRI-005 P : CAP-037 P : CAP-038 P : DEC-009 E : PRIN-07 E : EXIG-IAM-21 E : EXIG-SEC-04. Sur toute la session (tâche racine, `A2A`, reprises durables, événements), un magasin cohérent suit trois états : `(A)` entrée non fiable lue, `(B)` accès sensible (`P1` sensible ou `P2`), et `(C)` mutation ou sortie externe (`P2`, `P3`, tiers ou pair). Dès `(A)` actif, la passerelle opère le **retrait déterministe non dérogeable des capacités d’exfiltration**. Les outils d’envoi externe (même `P0`) et les outils `P3` disparaissent pour la session, hors redémarrage vierge ou approbation hors bande liée à `h` E : EXIG-SEC-06 E : EXIG-AUT-12 E : EXIG-GOV-17.

Contrat schématique AS de politique déclarative hors modèle (`PDP`) appliquant la règle de deux et la délégation bornée (`EXIG-SEC-04`, `EXIG-SEC-06`, `EXIG-IAM-10`) :

```
policy_id: pol-pep-rule-of-two-v1
enforcement: fail_closed
invariants:
  max_delegation_hops: 2        # EXIG-IAM-10 / EXIG-ORC-04 (RFC 8693)
  require_sender_constraint: true # RFC 9449 DPoP ou RFC 8705 mTLS
rules:
  - id: deny_exfil_when_tainted
    when:
      session.has_untrusted_input: true   # Etat (A)
      session.has_private_access: true    # Etat (B)
      tool.category_in: [outbound_egress, palier_P3]
    action: DENY_AND_REVOKE_CAPABILITY    # EXIG-SEC-06 (GOV-17 ND)
    override_only_with: out_of_band_ciba_jcs_token
```

En risque élevé, `CAD26 Tableau 39` (`§ 9.6`, pp. 158–159) recense **six patrons anti-injection** (Beurer-Kellner et al., 2025). Les trois premiers sont le **sélecteur d’actions**, **plan puis exécution** (sans confinement d’arguments) et le **map-reduce de modèles**. Les trois suivants sont le **double modèle** (planificateur privilégié et lecteur en quarantaine), **code puis exécution** (étendu par `CaMeL` au suivi formel contrôle/données) et la **minimisation du contexte**. `EXIG-SEC-07` exige au moins un patron confinant aussi les données E : EXIG-SEC-07. Sur *AgentDojo*, `CaMeL` livre `77 %` **de réussite sûre contre** `84 %` **sans défense**, recul de 7 points assumé (`CAD26 Tableau 10`, p. 33). Dans le banc reproductible `Borealis-Bench/` (Campagne 2, `campagne2_camel_injection.json`, `240` payloads), le filtre `C6` atteint `95,83 %` **de rappel** (`115/120`, `5` FN concentrés sur `data_exfiltration_trifecta` à `66,67 %`), `0,00 %` **de faux positifs** (`F1 = 97,87 %`, `p50 = 86,28 µs`), confirmant la nécessité du retrait déterministe `EXIG-SEC-06`. Or *Can CaMeLs Talk?* (`C27 § 49.6`, pp. 1038–1040 ; `C26 S-150`) prouve que **cette isolation ne se compose pas** en texte libre inter-agents. La passerelle propage donc la contamination et ré-évalue chaque arête E : EXIG-IAM-21.

Tout code généré ou fichier tiers (`ASI05`) tourne hors orchestrateur dans un **bac à sable éphémère** (microVM, noyau dédié ou `WASI`) à latence mesurée (`EXIG-SEC-11`, `DEVRAIT`) P : CAP-030 E : EXIG-ARC-10 E : EXIG-SEC-08 E : EXIG-SEC-09 E : EXIG-SEC-11. Quatre verrous s’appliquent : réseau sortant fermé et blocage `IMDS` E : EXIG-SEC-12 E : EXIG-SEC-13 ; zéro secret local E : EXIG-SEC-14 ; trois délais d’expiration et quotas E : EXIG-SEC-15 ; journal immuable externe et analyse statique préalable E : EXIG-SEC-16 E : EXIG-SEC-17. Devant les `102` fiches `NVD` `"Model Context Protocol"` de juil.–oct. 2026 (`C27 § 49.7`, p. 1040 `[É]`, serveurs tiers sous trois réserves méthodologiques), chaque serveur `MCP` est cloisonné, signé, inventorié et soumis à une équipe rouge annuelle E : EXIG-SEC-18 E : EXIG-SEC-19 E : EXIG-SEC-20 E : EXIG-SEC-21 E : EXIG-SEC-23 E : EXIG-SEC-25.

### 7.4 PKI à 47 jours, horloge post-quantique (`NIST IR 8547`) et parades au choc `HTTP 431`

De 2027 à 2035 (A `ANC-043`, `PD28 M-5`), la cryptographie affronte deux chocs désormais intégrés au socle unifié `CAD26` v1.2 (`EXIG-SEC-27`, `EXIG-SEC-28`) et à `PD28 M-5` P : PRI-012 P : CAP-040 P : DEC-012 P : POR-007. D’abord, le `CA/Browser Forum Ballot SC-081v3` ramène les certificats TLS publics à **100 jours le 15 mars 2027** D (`ANC-023`) puis **47 jours le 15 mars 2029** D (`ANC-030`, validation domaine à 10 jours). Cette échéance impose `ACME` et `SPIFFE` automatisés à 100 % (`SIG-012`).

Ensuite, le risque quantique unit **collecte pour déchiffrement différé** sur flux à secret long (20–40 ans) et **ruine probatoire** vers 2035 C : A, B, C ; SIG-009, SIG-010 des archives en `ECDSA`/`Ed25519`. Le socle est fixé : `FIPS 203` **(**`ML-KEM`**)**, `FIPS 204` **(**`ML-DSA`**)**, `FIPS 205` **(**`SLH-DSA`**)** et `NIST IR 8547` **final du 27 octobre 2026** (dépréciation après **2030**, interdiction après **2035** A, `C26 Annexe N.2` p. 664). Trois RFC 2026 le complètent (`PD28 § 5.2.2`) : `RFC 9964` (`ML-DSA` `JOSE`/`COSE`), `RFC 10024` (`TLS 1.3` `X25519MLKEM768`) et `RFC 10073` (`X.509` composites, 6 nov. 2026). L’AE distingue calendriers gouvernementaux et secteur financier privé :

| Portée juridique | Référentiels et ancres | Échéances vérifiées au 17 novembre 2026 | Effet pour une institution financière privée |
| --- | --- | --- | --- |
| **Administrations publiques fédérales canadiennes** *(secteur public)* | Stratégie `AMOPS` du Conseil du Trésor (`2025-10-09`) | Plans ministériels `2027-04-01` D (`ANC-032`), inventaire `2028-04-01` D (`ANC-034`), systèmes prioritaires fin `2031` D (`ANC-039`), reste fin `2035` D (`ANC-041`). | Lie l’administration fédérale seule ; repère d’état de l’art. |
| **Administrations civiles fédérales américaines** *(secteur public)* | `EO 14412` et `OMB M-26-15` (juin 2026) | Pilote fin `2027` D (`ANC-033`), `TLS 1.3` `2030-01-02` D (`ANC-035`), clés PQC et achats `FAR` fin `2030` D (`ANC-036`), signatures fin `2031` D (`ANC-038`), fin `2035` D (`ANC-042`). | Vise l’État américain, mais `FAR` fin 2030 entraîne l’offre infonuagique. |
| **Institutions financières privées** *(banques, patrimoine, assurances)* | `BSIF B-13 § 3.2.2`, `G7 Cyber Expert Group` (janv. 2026), `NIS CG` UE | Veille prudentielle (`SIG-009`) ; repères `G7` sur systèmes critiques en `2030–2032` A (`ANC-040`) et achèvement en `2035` A (`ANC-043`) (UE `NIS CG` : `ANC-031` fin `2026` A, `ANC-037` fin `2030` A pour administrations publiques et infrastructures critiques `SRI 2`, `ANC-044` fin `2035` A). | Cible de la trajectoire rétrograde (`POR-007` en `P2`, `POR-011` en `P3`). |

Côté AS, remplacer `ECDSA` (64 o) par `ML-DSA` cause un **choc d’amplification** (`PD28 § 5.4.1`). `ML-DSA-65` pèse **3 309 octets** (clé **1 952 o**) et `ML-DSA-87` **4 627 octets** (clé **2 592 o**), soit **50 à 72×**. Sur trois sauts par valeur (`Authorization` + `DPoP`), les en-têtes HTTP grimpent de `< 2 Ko` à `20–35 Ko`, provoquant des erreurs `HTTP 431` sur les passerelles à `8–16 Ko` (`SIG-011`). Quatre parades s’imposent : clés par `kid` **/ cache** `JWKS` ; *Transaction Tokens* courts ou `COSE` **(`RFC 9964`)** ; tampons d’en-têtes à `≥ 32 Ko` et `TLS 1.3` **hybride (`RFC 10024`)** dès `P1` (`2028–2029`), avant les signatures en `P2` (`2030–2032` A `ANC-040`). Enfin, un **scellement quotidien en arbre de Merkle `SCITT` (`RFC 9943`, `SHA-384`/`SHA-512`)** signé `SLH-DSA` **(`FIPS 205`)** protège les archives avant 2030 (`POR-007`). La **Campagne 4 de** `Borealis-Bench/` (`campagne4_mldsa_http431.json`, `crypto-rust` face à Nginx `8 KiB` et Envoy `8/60 KiB`) confirme le rejet `HTTP 431` **dès le saut 1** en `jwt_embedded_jwk` (`8 364 o` en `ML-DSA-65`, `11 259 o` en `ML-DSA-87`) et dès le saut `2–3` sur Envoy `60 KiB` en chaîne `x5c`. Le passage par `kid` sauve le saut `1` mais cède au saut `2` sous `8 KiB`; seuls les *Transaction Tokens* `CBOR-COSE` maintiennent une taille **constante** `O(1)` (`4 609 o` / `6 367 o`, `0 %` **de** `431`), tandis que `SCITT + SLH-DSA-128s` amortit le sceau à `0,786 o/evt` sur `10 000` événements (`10,8 ms`).

Correspondance `ABB → SBB` de la fabrique de confiance (état au 28 oct.–14 nov. 2026) :

| Fonction | ABB (bloc neutre) | SBB substituables (état au 28 oct.–14 nov. 2026) |
| --- | --- | --- |
| Identités `NHI` courtes | Identité cryptographique de charge (`SPIFFE` / fédération `OIDC`) | `SPIRE` (`X.509-SVID`), `OIDC` infonuagique ; annuaires encadrés (Microsoft Entra Agent ID sous réserve du gabarit partagé `EXIG-IAM-04` et sans secret client `EXIG-IAM-05`, CyberArk, Okta) |
| Politiques hors modèle | Point de décision déclaratif (`PDP` en coupure `PEP`) | Open Policy Agent (`OPA`), Cedar ; coffres à rotation (HashiCorp Vault) |
| Confinement de code | MicroVM matérielle, noyau dédié ou `WASI` fermé | Firecracker, Kata Containers, gVisor, moteurs `WASI` (OpenSandbox en évaluation) |
| Provenance et tests CI | Signature sous racines *The Update Framework* (`TUF`) et bancs d’attaque | Sigstore / Cosign (`TUF`, `CycloneDX 1.7`), Promptfoo, PyRIT, Garak |

Contrat opérationnel croisé — Architecte d’entreprise (AE) | Architecte de solutions (AS)

Décisions AE

1. Imposer des identités cryptographiques de charge dédiées et parrainées sans secret statique P : PRI-004 P : CAP-035 E : EXIG-IAM-03 E : EXIG-IAM-04 E : EXIG-IAM-05 ainsi qu’un coupe-circuit exercé chaque trimestre (`≤ 15 min` global sous `CAD26`, `< 10 s` `[S]` côté passerelle sous `POR-003`) P : CAP-039 P : POR-003 E : EXIG-IAM-20 E : EXIG-SEC-26.
2. Accepter le coût d’utilité de la sécurité par conception en classe élevée (`77 %` contre `84 %`) en rendant obligatoires la règle de deux, le retrait déterministe des outils sortants et un patron confinant les données P : PRI-005 P : CAP-038 E : EXIG-SEC-04 E : EXIG-SEC-06 E : EXIG-SEC-07 E : EXIG-GOV-17.
3. Cadencer la transition cryptographique P : PRI-012 P : CAP-040 P : POR-007 sur l’échéance `TLS` à 47 jours du 15 mars 2029 D (`ANC-030`) et le calendrier financier du `G7` (`2030–2032` A `ANC-040`, puis `2035` A `ANC-043`, `SIG-009`), en les distinguant des obligations propres aux administrations publiques.

Spécifications AS

1. Émettre des identités cryptographiques courtes de charge (`X.509-SVID` `SPIFFE` ou fédération `OIDC`) hors modèle E : EXIG-IAM-04 E : EXIG-IAM-06 et enchaîner `RFC 8693` à audience unique (`RFC 8707`), `RFC 9396`, `DPoP`/`mTLS` sous `RFC 9700` et révocation `SSF`/`CAEP` (`≤ 15 min`) E : EXIG-IAM-08 E : EXIG-IAM-10 E : EXIG-IAM-11 E : EXIG-IAM-13 E : EXIG-IAM-14 E : EXIG-IAM-20.
2. Propager le marquage de contamination inter-agents face à la non-composition de `CaMeL`, ré-évaluer les politiques à chaque arête E : EXIG-IAM-21, et isoler le code en microVM ou `WASI` sous quatre verrous (réseau/`IMDS` fermés, zéro secret, délais à trois niveaux, journal externe et porte statique) P : DEC-009 E : EXIG-SEC-08 E : EXIG-SEC-12 E : EXIG-SEC-13 E : EXIG-SEC-14 E : EXIG-SEC-15 E : EXIG-SEC-16 E : EXIG-SEC-17.
3. Parer les erreurs `HTTP 431` dès `P1` : tampons passerelles `≥ 32 Ko`, clés `ML-DSA` par `kid`/JWKS, *Transaction Tokens* / `COSE` (`RFC 9964`), `TLS 1.3` hybride (`RFC 10024`), `ACME` intégral et scellement `SCITT` (`RFC 9943`) signé `SLH-DSA` (`FIPS 205`) P : DEC-012.

### 7.5 Grille de décision

| Décision | Option par défaut | Quand s’en écarter | Preuve |
| --- | --- | --- | --- |
| Authentification des agents et justificatifs | Identité `NHI` dédiée, attestations courtes de charge (`SPIFFE` `SVID` / `OIDC`) sans secret client et hors modèle E : EXIG-IAM-03 E : EXIG-IAM-04 E : EXIG-IAM-05 E : EXIG-IAM-06 | Cohorte transitoire (90 j) en lecture seule `P0`/`P1` avec secret propre en coffre sous dérogation E : EXIG-GOV-16 | `[N]` `BSIF` B-13 ; `[É]` `CAD26` § 9.2 ; `C26` `S-103` (Vol. III `F-57`) |
| Propagation des droits sur plusieurs sauts | Échange `RFC 8693` par saut, audience unique `RFC 8707`, possession `DPoP`/`mTLS` (`≤ 2` sauts) E : EXIG-IAM-08 E : EXIG-IAM-10 E : EXIG-IAM-11 E : EXIG-IAM-14 | Jamais de relais direct de jeton ni d’usurpation humaine (interdictions absolues E : EXIG-GOV-17) | `[N]` `RFC 8693` § 4.1 (`C26` `S-093`), `RFC 9700` ; `CAD26` § 9.3 |
| Session ayant lu un contenu non fiable | Marquage propagé, retrait déterministe des envois et `P3`, patron confinant les données (`CaMeL`) en classe élevée E : EXIG-SEC-04 E : EXIG-SEC-06 E : EXIG-SEC-07 | Action sortante ou `P3` uniquement après approbation humaine hors bande liée au condensat `h` E : EXIG-AUT-12 | `[M]` Debenedetti et coll. (`77 %` vs `84 %`) ; *Can CaMeLs Talk?* (`C27` § 49.6) |
| Exécution de code généré ou fichiers tiers | Bac à sable éphémère par microVM ou `WASI` sans réseau, `IMDS` bloqué et zéro secret E : EXIG-SEC-08 E : EXIG-SEC-12 E : EXIG-SEC-13 E : EXIG-SEC-14 | Jamais dans l’orchestrateur ni en conteneur standard partageant le noyau hôte | `[É]` `OWASP` `ASI05` ; `CAD26` § 9.7 ; `PD28` `DEC-009` |
| Flux et jetons face au post-quantique | `TLS 1.3` hybride (`RFC 10024`) dès `P1`, tampons `≥ 32 Ko`, clés par `kid`/JWKS et *Transaction Tokens* P : CAP-040 | Bascule complète des signatures (`RFC 9964`, `RFC 10073`) au Palier 2 (`2030–2032` A `ANC-040`) | `[N]` `FIPS 203/204`, `NIST IR 8547` final, `RFC 9964/10024/10073` |
| Valeur probante décennale des mandats | Arbre de Merkle `SCITT` (`SHA-384`/`SHA-512`) scellé quotidiennement en `SLH-DSA` (`FIPS 205`) avant 2030 P : DEC-012 P : POR-007 | Traces techniques éphémères de débogage conservées moins de douze mois | `[N]` `FIPS 205`, `RFC 9943` ; `PD28` M-5 § 5.4 (`POR-007`) |

### 7.6 Limites et renvois

**Limites et réserves.** La grille `Q-A..Q-E` (`C26 ch. 14`) et le passeport virtuel (`C26 ch. 16`) sont des constructions d’auteur (`[S]`). Au 17 novembre 2026, `OAuth 2.1` (`draft-17`), les huit documents `IETF WIMSE` et les brouillons de révocation en cascade demeurent non ratifiés (`CAD26 Annexe H.2`, `C26 Annexe N.2`). Les mesures *AgentDojo* (`77 %` vs `84 %`) et *Agent Security Bench* (`84,30 %`, `CAD26 p. 159`) proviennent de bancs expérimentaux et non de parcs en production. Enfin, l’absence d’exigence post-quantique dans `CAD26` v1.1 (`Annexe H.5`, p. 341) est compensée ici par `PD28 M-5` et `NIST IR 8547` final.

**Renvois aux volumes sources :** `C26` ch. 14 (§ 14.1–14.4 pp. 161–167), ch. 16 (pp. 181–190), ch. 17 § 17.6 (pp. 198–202), ch. 18 (§ 18.1 pp. 204–206), ch. 19–21 (`S-103` / Vol. III `F-57` p. 234, `PQC` ch. 21 pp. 238–253), Ann. N.2 (pp. 662–668) ; `CAD26` ch. 9 (`EXIG-IAM-01..21`, `EXIG-SEC-01..28` pp. 138–171), Tableau 10 (p. 33), Ann. H.2/H.5 ; `C27` ch. 29–32 (`ADR-018..020` pp. 581–675), ch. 49 (§ 49.5–49.7 pp. 1036–1041) ; `PD28` `M-5` (pp. 72–83), `CAP-030`, `CAP-035..040`, `DEC-009`, `DEC-012`, `POR-003`, `POR-007`, `POR-011`, `SIG-003`, `SIG-009..012`.

## Chapitre 8 — Observabilité à double couloir PII, journal d’audit JCS, évaluation E1–E3 et FinOps CPO

> **Ancrage corpus (état de référence : 17 novembre 2026) :** `[C26 ch. 38–40, Ann. N]` · `[CAD26 ch. 10, Ann. H | EXIG-OBS-01..13, EXIG-EVA-01..06, EXIG-FIN-01..10 | PRIN-06, PRIN-08]` · `[C27 ch. 33–34, 40 | ADR-021..023]` · `[PD28 M-7, M-24 | PRI-013, PRI-014 | CAP-042..046, CAP-049 | DEC-010, DEC-011 | POR-002..004, POR-009, POR-015, POR-016]`.

*Question directrice : Comment voir, prouver, qualifier et facturer le comportement d’un parc d’agents en production sans fuite de renseignements personnels ni cécité économique ?*

**Thèse du chapitre :** Les sondes d’exploitation classiques restent au vert lorsqu’un agent hallucine, dérive ou exécute une action erronée. Gouverner un parc exige quatre disciplines articulées P : PRI-013 P : PRI-014 E : PRIN-06 E : PRIN-08. D’abord, la télémétrie `OpenTelemetry` épinglée à double couloir interdit tout contenu en production et purge la voûte forensique sous 14 jours P : CAP-042 E : EXIG-OBS-01 E : EXIG-OBS-07 E : EXIG-OBS-08. Ensuite, un journal d’audit distinct canonise cinq éléments en `RFC 8785`, ancrés chaque heure hors domaine et gardés au moins 24 mois P : CAP-049 E : EXIG-OBS-11 E : EXIG-OBS-12 E : EXIG-OBS-13. Par ailleurs, la qualification `E1–E3` mesure la constance `pass^k`, couplée au repli automatique `< 60 s` P : CAP-043 P : CAP-044 P : POR-015 et à la baisse d’autonomie après trois mois hors cible E : EXIG-EVA-03 E : EXIG-EVA-06. Enfin, l’économie se pilote au coût complet par résultat conforme (`CPO`) jusqu’à la refacturation interne P : CAP-045 P : DEC-011 P : POR-016 E : EXIG-FIN-01 E : EXIG-FIN-09.

### 8.1 Télémétrie `OpenTelemetry GenAI` épinglée et collecte souveraine à double couloir PII

L’observabilité applicative (`APM`) mesure la disponibilité mais ignore la rectitude métier. Un `HTTP 200 OK` couvre aussi bien un acte valide qu’une boucle coûteuse ou détournée (`C26 ch. 38`). Malgré la convergence vers `OpenTelemetry`, son socle reste instable au 1er novembre 2026 (`CAD26 Annexe H.2` p. 336, `C26 Annexe N.2` p. 663). `semantic-conventions-genai` n’a **aucune version étiquetée** (`S-121`). Son registre (`v1.44.0`, 31 oct. 2026) compte `85` **attributs** `gen_ai.*` **tous en statut** `Development`, exposés aux renommages et dépourvus de champs de mandat (`C26 § 38.5`, `S-138`).

Pour isoler le code (`ADR-021`, `SIG-006`), l’AS **épingle** `OpenTelemetry v1.41.0` **derrière une table de correspondance au collecteur** P : CAP-042 E : EXIG-OBS-01 ; `CRE-IA-2027` **v2.0** (`exigences-v2.json`) verrouille cette isolation des `85` attributs `gen_ai.*` (`Development`), impose `60 jours` de transition sur passage `Stable`, porte la rétention chaude cible d’audit à `45 j` `[S]` (banque/assurance) et généralise les badges CI *Borealis-Bench* (`DC-P11`). `W3C Trace Context` traverse `MCP`, `A2A` et `CloudEvents` E : EXIG-OBS-02 sans `RP` en `Baggage` E : EXIG-OBS-10. La **jointure trace ↔ mandat** porte le `Tableau 41` (`CAD26` p. 173 : `ca.entreprise.cost_center`, `task_id`, `autonomy_level`, `approval.jti`, `a2a.*`, `content_ref`) E : EXIG-OBS-03 E : EXIG-OBS-04 E : EXIG-OBS-05 E : EXIG-OBS-06 E : EXIG-OBS-08, tandis que clé d’idempotence, risque et approbateur résident au journal d’audit E : EXIG-OBS-12.

Sous `Loi 25`, la collecte applique l’**architecture souveraine à double couloir PII** (volets `3a–3b`, Fig. 7, Ch. 7 ; `CAD26 Tableau 10` p. 33, `§ 10.2`, `C27 ch. 33`, `POR-002`) :

1. **Couloir opérationnel (zéro contenu).** Sur `100 %` du trafic, il ne capte que les métadonnées (durées, jetons lus/écrits/cachés, versions, verdicts, coûts) et pseudonymise les identifiants en `SHA-256` poivré (rétention indicative `13 mois` `[S]`, `C27 § 33.10`). **Tout contenu brut d’invite, réponse ou argument y est interdit**, avec caviardage en sortie E : EXIG-OBS-07 E : EXIG-OBS-09.
2. **Couloir forensique scellé (« bris de glace »).** Sur incident ou débogage motivé, la session est chiffrée hors traces générales sous double accord. Là où `C27 § 33.10` évoquait `14–30 jours` `[S]`, la norme impose une **purge au plus tard sous** `14 jours`, hors gel légal E : EXIG-OBS-08 E : EXIG-CON-23.

### 8.2 Séparation des trois magasins et journal d’audit chaîné `RFC 8785` (`≥ 24 mois`)

Une trace d’observabilité ne vaut jamais preuve opposable. L’architecture sépare physiquement et administrativement **trois magasins** (volet `3c`, Fig. 7, Ch. 7) :

| Magasin réglementé | Rôle et périmètre d’écriture | Contenu et protection cryptographique | Conservation minimale |
| --- | --- | --- | --- |
| **1. Traces opérationnelles et voûte forensique** (`CAD26 § 10.2`) | Diagnostic continu (`100 %` métadonnées) et enquête ponctuelle. | Spans `OTel v1.41.0` sans contenu (`SHA-256` poivré) E : EXIG-OBS-07 ; voûte isolée sous double accord E : EXIG-OBS-08. | `13 mois` `[S]` (métadonnées) ; `≤ 14 jours` (forensique hors gel). |
| **2. Journal d’audit probatoire chaîné** (`CAD26 § 10.3`, non dérogeable `EXIG-GOV-17`) | Preuve exhaustive écrite **avant relais** de tout `P2`/`P3` en **échec fermé**. | **5 éléments** canonisés `RFC 8785` **(**`JCS`**)**, signés, chaînés (`precedent_sha256`) et **ancrés chaque heure hors domaine** E : EXIG-OBS-11 E : EXIG-OBS-12. | `≥ 24 mois` (`5 ans` bancaire ouvert, `7 ans` plaintes et Organisme canadien de réglementation des investissements, `OCRI`, art. 3803) E : EXIG-OBS-13. |
| **3. Dossier de décision individuelle** (`Loi 25 art. 12.1`, `CAD26 pp. 179–180`) | Droits d’explication, de vérification et de révision humaine. | Magasin chiffré séparé (lié par empreinte) gardant entrées, sorties d’outils et facteurs principaux E : EXIG-CON-09. | `≥ 1 an` après la décision (`Loi 25` art. 12.1). |

Le **journal d’audit probatoire** (`EXIG-OBS-11..13`, non dérogeable `EXIG-GOV-17`, `CAP-049`) exclut tout échantillonnage. S’il est injoignable, la passerelle bloque tout appel `P2`/`P3` (`EXIG-AUT-11`). Chaque entrée réunit **cinq éléments** E : EXIG-OBS-12. Elle scelle le mandant (pseudonyme vers table séparée), l’agent (`id`, `spiffe://`, version, `SHA-256` d’invite) et l’action (outil, version, `definition_sha256`, `arguments_sha256` salé/HMAC, issue). Elle y joint le modèle servi (`gen_ai.response.model`), l’autorité (`jti`, `h`, risque, autonomie, politique), `trace_id`, `a2a_task_id`, `cle_idempotence`, la séquence monotone et `precedent_sha256`.

Canonisée en `RFC 8785` **(**`JCS`**)** et signée hors portée des agents, chaque chaîne publie **chaque heure un point de contrôle hors du domaine d’administration de l’audit**. Cet ancrage recourt à un témoin externe, un arbre `RFC 9162` / `SCITT` ou un stockage `WORM` tiers E : EXIG-OBS-12. Vérifiée **chaque jour** et gardée **au moins** `24 mois` (`5` ou `7 ans` sous `PEX-002` / `PEX-013`, au-delà des 6 mois de `RIA art. 26(6)`), la chaîne s’anonymise en fin de garde par suppression de l’entrée dans la table des pseudonymes du `RPRP`, sans altérer le journal chaîné E : EXIG-OBS-13.

### 8.3 Évaluation continue `E1–E3`, constance `pass^k` et rétrogradation sur dérive SLO

En exploitation, un agent subit **trois dérives** (`C26 § 39.2`, pp. 454–456 : outil, modèle et autonomie ; la mémoire restant un front ouvert en `§ 39.2.4`). `C26 ch. 40` (`Tableau 40.2`, pp. 466–467) les suit par quatre grandeurs `AgentOps` (`[S]`). Contre l’auto-évaluation complaisante (`C27 § 34.3`), le cycle déploie **trois étages (**`E1–E3`**)** (`CAD26 § 10.4`, `C27 ch. 34` `ADR-022`, `DEC-010`) P : CAP-043 P : CAP-044 :

- **Étage** `E1` **— Intégration continue (à chaque modification).** Contrôle déterministe sans LLM des contrats JSON/`MCP`, politiques, non-régression et injection de fautes sur outils et compensations Saga E : EXIG-EVA-01 E : EXIG-ORC-20.
- **Étage `E2` — Simulation pré-production et `pass^k`.** Avant promotion ou changement (`EXIG-GOV-12`), un jeu versionné d’**au moins `50` scénarios** sous `CAD26` E : EXIG-EVA-02 (`≥ 100` sous `PRR O-04` `[S]` de `C27 Annexe G`) tourne sans effet réel. Chaque cas est **joué `≥ 3` fois** avec attaques bilingues E : EXIG-EVA-03 E : EXIG-SEC-24. Au lieu de `pass@k`, l’institution exige la **constance** `pass^k` (𝑘 ≥ 3 minimal, 𝑘 ≥ 5 critique en `C27 § 34.9`), suivie d’un déploiement canari.
- **Étage** `E3` **— Échantillonnage continu sous juge calibré.** Évaluation régulière des exécutions réelles sur la conformité métier E : EXIG-EVA-04 par un juge d’une autre famille, **ré-étalonné sur annotations humaines** contre les biais de verbosité et d’auto-préférence E : EXIG-EVA-05.

Deux horizons gouvernent les droits. En exploitation cible (`PD28`), l’épuisement du budget d’erreur déclenche un repli automatique `< 60 s` vers `N2` ou le flux déterministe P : POR-015. En norme `CAD26`, deux mois hors cible ouvrent une revue, et **trois mois consécutifs hors** `SLO` **imposent l’abaissement d’un niveau d’autonomie et la saisine du comité** E : EXIG-EVA-06.

### 8.4 Gouvernance économique `FinOps` : du jeton trompeur au coût par résultat conforme (`CPO`)

Piloter par le tarif facial du million de jetons aveugle le budget (`C26 ch. 40`, `C27 ch. 40`). Sur un cas d’extraction séquentielle de dépôts `SEC` (`C27 § 40.1, Fig. 52`), **plus de** `97 %` **des jetons facturés viennent de la relecture du contexte**. De son côté, Anthropic (*Hadfield et coll.*, juin 2025) rapporte environ `4×` **plus de jetons** qu’un clavardage pour un agent outillé et `15×` en multiagent (`C26 § 40.5–40.6`, statut « C » ; `CAD26 § 7.1` `[É]`). Si `FOCUS 1.4` (`1.5` annoncée fin 2026, `CAD26 Annexe H.2` p. 338) normalise la facturation, elle ignore la validité métier de l’issue.

Sans avancer de budget fictif, l’AE et l’AS retiennent le **coût complet par résultat conforme (**`CPO`**, *Cost-per-Outcome*)** (`ADR-023`, `PD28 § 24.4`) P : PRI-014 P : CAP-045 P : DEC-011 E : EXIG-FIN-01 E : EXIG-FIN-10 :

CPO = (𝐶_{inférence} + 𝐶_{outils et crédits SaaS} + 𝐶_{infra et audit} + 𝐶_{échecs et reprises} + 𝐶_{supervision humaine}) / 𝑁_{dossiers conformes terminés et non rouverts}

Chaque flux date ses hypothèses tarifaires E : EXIG-FIN-02, convertit les crédits SaaS en devises réelles E : EXIG-FIN-03 et compare son `CPO` à la base non agentique. Cinq verrous brident l’exécution : plafond par tâche vérifié à chaque tour E : EXIG-FIN-04, et quotas mensuels par agent à coupe-circuit gradué (alerte `80 %`, repli ou arrêt à `100 %` hors compensations `EXIG-ORC-17, 28`) E : EXIG-FIN-05. S’y ajoutent le plus petit modèle qualifié en `E2` E : EXIG-FIN-06, les préfixes canoniques `KV-cache` E : EXIG-FIN-07 et le déport des lots différables à `-50 %` (`DEVRAIT`) E : EXIG-FIN-08.

Sur la trajectoire (`DEC-011`), l’affichage transparent (*showback*, `P1`, `POR-004`) précède la **refacturation interne (*chargeback*)** au parrain E : EXIG-FIN-09 en `P2` (`POR-009`). **Tout flux au** `CPO` **déficitaire deux trimestres de suite est déclassé ou reconçu** (`POR-016`, `INI-052`) P : POR-004 P : POR-009 P : POR-016. Le collecteur agrège aussi `kWh` et intensité carbone pour `BSIF B-15` **portée 3** dès 2028 D (`ANC-106`) face au signal `1 700 TWh` en 2035 C : B, C ; SIG-016 P : CAP-046.

Correspondance `ABB → SBB` de l’observabilité, de l’évaluation et du `FinOps` (état au 28 oct.–14 nov. 2026) :

| Domaine d’exploitation | ABB (bloc neutre d’architecture) | SBB substituables (état au 28 oct.–14 nov. 2026) |
| --- | --- | --- |
| Collecte et caviardage PII | Collecteur `OpenTelemetry` épinglé et passerelle de pseudonymisation | OpenTelemetry Collector (`v1.41.0` épinglée), Microsoft Presidio (caviardage sortie) |
| Visualisation traces et `E1–E3` | Plateforme de traces agentiques et harnais d’évaluation `pass^k` | Arize Phoenix, Langfuse, Braintrust, Promptfoo ; agrégateurs APM (Datadog, Dynatrace, Splunk) |
| Comptabilité `FinOps` et coûts | Normalisateur de facturation ouverte et suivi par étiquettes | Export `FOCUS 1.4` natif des fournisseurs infonuagiques, passerelles à compteurs (LiteLLM, Portkey, Helicone) |

Contrat opérationnel croisé — Architecte d’entreprise (AE) | Architecte de solutions (AS)

Décisions AE

1. Séparer physiquement et administrativement les trois magasins : télémétrie sans contenu (`≤ 14 jours` en voûte forensique) P : CAP-042 E : EXIG-OBS-07 E : EXIG-OBS-08, journal d’audit inaltérable (`≥ 24 mois`, non dérogeable) P : CAP-049 E : EXIG-OBS-11 E : EXIG-OBS-13 E : EXIG-GOV-17 et dossier `Loi 25 art. 12.1` (`≥ 1 an`) E : EXIG-CON-09.
2. Lier l’autonomie aux `SLO` vérifiés en `E1–E3` (`pass^k`) P : CAP-043 P : CAP-044, en dissociant le repli automatique `< 60 s` sur budget d’erreur P : POR-015 de l’abaissement d’un niveau après trois mois hors cible E : EXIG-EVA-06.
3. Piloter au `CPO` P : PRI-014 P : CAP-045 P : DEC-011 E : EXIG-FIN-01 : affichage transparent en `P1` P : POR-004, refacturation interne et carbone `BSIF B-15` portée 3 en `P2` P : CAP-046 P : POR-009, déclassement après deux trimestres déficitaires P : POR-016.

Spécifications AS

1. Épingler le collecteur `OpenTelemetry v1.41.0` derrière une table de correspondance l’isolant des `85` attributs `gen_ai.*` `Development` du registre `v1.44.0` (`SIG-006`) E : EXIG-OBS-01, propager `W3C Trace Context` sans renseignement personnel (`RP`) en `Baggage` E : EXIG-OBS-02 E : EXIG-OBS-10 et injecter les attributs `Tableau 41` trace ↔ mandat E : EXIG-OBS-03 E : EXIG-OBS-05 E : EXIG-OBS-06.
2. Écrire avant relais `P2`/`P3` (échec fermé) l’audit à cinq éléments canonisé `RFC 8785`, chaîné `SHA-256`, ancré **chaque heure** hors domaine, vérifié chaque jour et anonymisé via la table séparée du `RPRP` E : EXIG-OBS-11 E : EXIG-OBS-12 E : EXIG-OBS-13.
3. Exécuter en CI/CD `E1` et `E2` (`≥ 50` scénarios `CAD26`, `≥ 100` sous `PRR O-04` `[S]`, `× 3` en `pass^k`) P : DEC-010 E : EXIG-EVA-02 E : EXIG-EVA-03, étalonner le juge `E3` E : EXIG-EVA-05, optimiser `KV-cache` et lots `-50 %` (`DEVRAIT`), et armer les disjoncteurs sur `FOCUS 1.4` et crédits SaaS convertis E : EXIG-FIN-03 E : EXIG-FIN-04 E : EXIG-FIN-05 E : EXIG-FIN-07 E : EXIG-FIN-08.

### 8.5 Grille de décision

| Décision | Option par défaut | Quand s’en écarter | Preuve |
| --- | --- | --- | --- |
| Contenu des invites et réponses dans la télémétrie courante | Zéro contenu brut en production ; métadonnées et empreintes `SHA-256` poivrées uniquement E : EXIG-OBS-07 | Diagnostic motivé en coffre forensique isolé sous double accord, purgé au plus tard sous `14 jours` E : EXIG-OBS-08 | `[N]` `Loi 25` (art. 3.5, 12) ; `CAD26` Tableau 10 (p. 33), § 10.2 |
| Preuve d’imputabilité des actions mutatives et sensibles | Journal d’audit séparé à 5 éléments canonisé `RFC 8785`, écrit avant relais en échec fermé, ancré chaque heure à l’externe et gardé `≥ 24 mois` E : EXIG-OBS-11 E : EXIG-OBS-12 E : EXIG-OBS-13 | Jamais pour `P2`/`P3` (non dérogeable E : EXIG-GOV-17) ; rétention portée à `5` ou `7 ans` selon le régime financier P : PEX-002 P : PEX-013 | `[N]` `RIA` art. 12 & 26(6) (`ANC-007`), `OCRI` art. 3803 (courtiers : dossiers 7 ans, Ch. 10) ; `[É]` `CAD26` § 10.3 |
| Instabilité des conventions `OpenTelemetry GenAI` | Épinglage du collecteur `v1.41.0` derrière une table de correspondance face au registre `v1.44.0` E : EXIG-OBS-01 | Adoption directe uniquement après passage officiel des attributs agentiques au statut `Stable` (`SIG-006`) | `[É]` `CAD26` Ann. H.2, `C26` Ann. N.2 (`85` attr. `Development`) ; `S-121` |
| Qualification pré-production d’un agent métier (`E2`) | Constance multi-essais `pass^k` sur `≥ 50` scénarios versionnés (`≥ 100` pour `PRR O-04` `[S]`) exécutés `≥ 3` fois en isolation E : EXIG-EVA-02 E : EXIG-EVA-03 | Jamais de mise en production sur un essai unique ou sur la métrique permissive `pass@k` | `[M]` `C27` ch. 34 § 34.9, ch. 48 § 48.5 ; `[S]` `PRR O-04` ; `PD28` `CAP-043` |
| Unité de pilotage économique et protection budgétaire | Coût complet par résultat conforme non rouvert (`CPO`) assorti de disjoncteurs par tâche et par mois E : EXIG-FIN-01 E : EXIG-FIN-04 E : EXIG-FIN-05 | Jamais de pilotage au seul prix facial du million de jetons (`> 97 %` de relecture sur cas `SEC` ; repère *Hadfield et coll.* `4×` / `15×`, statut « C ») | `[M]` `C27` § 40.1 (Fig. 52 p. 787) ; `[É]` *Hadfield et coll.* (juin 2025, statut « C » en `C26` § 40.5) ; `PD28` `DEC-011` |
| Imputation des coûts d’exploitation aux domaines métiers | Affichage transparent (*showback*) en `P1` puis refacturation interne (*chargeback*) et déclassement après 2 trimestres déficitaires en `P2` P : DEC-011 P : POR-016 | Expérimentations hors production couvertes par une enveloppe d’innovation bornée dans le temps | `[S]` `C27` § 40.2, § 40.10 ; `PD28` M-24 § 24.4, `POR-009` |

### 8.6 Limites et renvois

**Limites et réserves.** Les quatre grandeurs `AgentOps` de `C26 ch. 40` (`Tableau 40.2`, pp. 466–467) relèvent de constructions d’auteur (`[S]`). `C26 ch. 39` (`§ 39.2`, p. 462) analyse trois dérives et laisse la mémoire persistante en front ouvert (`§ 39.2.4`). Les chiffrages fictifs du *Groupe Boréal Inc.* (`C27 § 33.10, 34.12, 40.10`) sont exclus comme preuves. La garde de `13 mois` des métadonnées reste indicative (`[S]`), et `CAD26 EXIG-OBS-08` (`≤ 14 jours`) prime sur `14–30 jours` `[S]` (`C27 § 33.10`). Enfin, les facteurs d’émissions de portée 3 par inférence demeurent partiellement opaques en 2026 (`SIG-109`).

**Renvois aux volumes sources :** `C26` ch. 38 (pp. 442–451, `S-120..124, S-138`), ch. 39 (pp. 451–462), ch. 40 (`Tableau 40.2` pp. 466–467, Anthropic `4×`/`15×` pp. 462–472), Ann. N.2 (pp. 662–668) ; `CAD26` ch. 10 (pp. 171–187, Tableau 41 p. 174, `EXIG-OBS-01..13`, `EXIG-EVA-01..06`, `EXIG-FIN-01..10`), Tableau 10 (p. 33), Ann. H.2 (pp. 336, 338) ; `C27` ch. 33 (pp. 676–700, `ADR-021`), ch. 34 (`pass^k` pp. 701–723, `ADR-022`), ch. 40 (`CPO` pp. 794–816, `ADR-023`), Ann. G (`PRR O-04` p. 1100) ; `PD28` `M-7` (pp. 94–103), `M-24` (pp. 301–309), `CAP-042..046`, `CAP-049`, `DEC-010`, `DEC-011`, `POR-002..004`, `POR-009`, `POR-015`, `POR-016`, `SIG-006`, `SIG-015`, `SIG-016`.

## Chapitre 9 — Plan d’inférence, six substrats d’état, confidentialité matérielle, résilience et réseaux B2B

> **Ancrage corpus (état de référence : 17 novembre 2026) :** `[C26 ch. 47, 50]` · `[CAD26 ch. 5, 6, 9, 11–13 | EXIG-ARC-08, EXIG-ARC-09, EXIG-INT-22, EXIG-SEC-10, EXIG-SEC-20, EXIG-CON-05, EXIG-APP-10..14]` · `[C27 ch. 37, 44–46 | ADR-014, ADR-026..028]` · `[PD28 M-11, M-13 | PRI-011 | CAP-014, CAP-027..029, CAP-031..033, CAP-041 | DEC-006, DEC-008, DEC-012 | POR-002, POR-006, POR-013]`.

*Question directrice : Où résident réellement les six états d’un agent, comment en assurer la continuité cognitive et la souveraineté juridictionnelle, et comment encadrer les interactions B2B fédérées ?*

**Thèse du chapitre :** Souveraineté, résilience et ouverture inter-entreprises se jouent dans le plan d’inférence, les substrats d’état et les frontières B2B P : PRI-011. L’institution interpose une passerelle de modèles (alias logique `DEVRAIT`) dissociant routage à trois paliers, affinité `KV-cache` et cinq horloges de versionnage P : CAP-029 P : DEC-006 E : EXIG-ARC-08 E : EXIG-ARC-09. Elle chiffre sous clés maîtrisées chacun des six substrats d’état sans confondre résidence physique et contrôle juridictionnel. Elle intègre ainsi les limites des enclaves matérielles et la continuité cognitive bimodèle P : CAP-031 P : CAP-032 P : CAP-033 P : POR-002 P : POR-006 E : EXIG-CON-05 E : EXIG-APP-11. Enfin, elle subordonne tout échange B2B au Palier 3 à `vLEI`, à la scission Diplomate / Évaluateur et au rapprochement à trois voies avant règlement P : CAP-014 P : CAP-027 P : CAP-041 P : DEC-012 P : POR-013 E : EXIG-INT-22.

### 9.1 Plan de données d’inférence, séparation modèle / réplique et cinq horloges de versionnage

Dans les six couches de `CAD26 § 5.2`, la **passerelle de modèles** siège en Couche 3 (*Agents et exécution cognitive*) : tout appel d’inférence la traverse E : EXIG-ARC-08, désigné par **alias logique** (`DEVRAIT`) et jamais par identifiant fournisseur en dur (`ADR-014`) P : CAP-029 P : DEC-006 E : EXIG-ARC-09. Le plan de données (`C27 ch. 44 § 44.1–44.5`, pp. 866–871) sépare deux décisions orthogonales :

1. **Choix du modèle (routage à trois paliers).** Le trafic se partage entre petit modèle frugal sur tâches bornées qualifiées en `E2`, modèle frontière par défaut sur intention complexe, et calcul accru à l’inférence sur arbitrage ardu (`EXIG-FIN-06`). `C27 § 44.3` (pp. 868–869, échelle à trois paliers posée en cible `[S]`) rappelle toutefois que les routeurs automatiques restent sensibles aux reformulations et fragiles sur requêtes difficiles, excluant tout routage non qualifié en `E2`.
2. **Choix de la réplique (affinité `KV-cache`).** Sur parc dédié, un rond-robin détruit la localité des préfixes d’invites et d’outils. Un ordonnanceur conscient du cache pondère charge des files GPU et préfixes chauds en VRAM pour abaisser délai du premier jeton (`TTFT`), coût de relecture et empreinte énergétique (`C27 § 44.4–44.5`, `EXIG-FIN-07`).

Alors qu’un condensat binaire suffit à promouvoir un logiciel classique (`C26 § 47.10`), un agent suit **cinq horloges de versionnage asynchrones** (`C26 ch. 47 § 47.8`, p. 542 `[S]`) :

| Horloge | Composant | Angle mort (`C26 ch. 47`) | Parade AE / AS |
| --- | --- | --- | --- |
| **1. Modèle** | Millésime réel servi (`gen_ai.response.model`) | Mutation silencieuse derrière un alias fournisseur (`§ 47.10`). | Tracer le millésime en audit (`EXIG-OBS-12`), préavis écrit (`EXIG-APP-13`) et rejeu `E2` (`EXIG-GOV-12`). |
| **2. Invites** | Consignes système et gabarits | Modification déclarative hors compilation (`§ 47.7`). | Gestion comme du code et condensat `SHA-256` inscrit en audit (`EXIG-ARC-24`, `EXIG-OBS-12`). |
| **3. Outils** | Schémas et serveurs `MCP` | Retournement après approbation (*rug-pull*, `§ 47.4`). | Épinglage cryptographique au catalogue interne (`EXIG-MCP-20`, `EXIG-SEC-18`). |
| **4. Politiques** | Règles `PDP` et plafonds | Décalage entre code promu et règles actives (`§ 47.8`). | Politiques versionnées hors modèle (`CAP-037`) et version tracée en audit (`EXIG-OBS-12`). |
| **5. Harnais** | Cadriciel (compaction, ordre des règles) | Cinquième horloge hors socle (`§ 47.8.1`), altérant le comportement à invite constante. | Épinglage strict dans l’image immuable et qualification `E2`. |

Deux conséquences s’imposent à l’AS. D’abord, `CycloneDX 1.7` et `SPDX 3.0` (`EXIG-SEC-20`, requis par le *Cyber Resilience Act* au 11 décembre 2027 D `ANC-008`) inventorient modèles et bibliothèques. Toutefois, ils **n’incluent aucun champ pour les invites ni les politiques** (`C26 Tableau 47.3` p. 538), et les extensions déclaratives JSON manquent de révocation (`C26 § 47.7`, degré 3). Ensuite, **un retour arrière (*rollback*) d’artefact ne restaure ni la mémoire accumulée, ni les délégations actives**, ni les effets externes déjà commis (`C26 § 47.11`, pp. 543–544).

### 9.2 Souveraineté juridictionnelle, six substrats d’état, `TEE` / `HYOK` et continuité cognitive

Selon `C27 ch. 37` (`§ 37.1`, p. 743), **la résidence physique des données n’équivaut jamais au contrôle juridictionnel**. Héberger à Montréal ou Toronto chez un opérateur soumis à une loi extraterritoriale (*CLOUD Act*) n’offre aucune immunité. Aucun schéma européen `EUCS` unifié n’est adopté mi-2026 hors qualifications nationales tel *SecNumCloud* (`C27 § 37.5`). Sous `Loi 25 art. 17`, l’institution qualifie l’exploitant et maîtrise les clés E : EXIG-CON-05 E : EXIG-APP-11 sur les **six substrats d’état** (`C27 § 46.1` `[S]`, `ADR-027`) P : PRI-011 P : CAP-032 P : POR-002 :

| Substrat (`C27 § 46.1` `[S]`) | Contenu | Risque dominant | Contrôle cible (`POR-002`) |
| --- | --- | --- | --- |
| **1. Modèle et configuration** | Poids, adaptateurs, invites, catalogue | Fuite de propriété intellectuelle ou altération. | Artefacts signés, registre interne et repli à poids ouverts (`CAP-031`). |
| **2. Contexte volatil d’inférence** | Fenêtre active, `KV-cache` GPU, sorties d’outils | Exposition en clair sur GPU mutualisés ; rétention fournisseur. | Clause zéro rétention / zéro entraînement (`EXIG-APP-10`), enclave `TEE` sélective (`CAP-033`). |
| **3. Mémoire longue persistante** | Épisodes, index vectoriels, graphes bi-temporels | Profilage massif et entrave au droit à l’oubli. | Isolation par entité/mandant (`EXIG-ARC-23`), clés souveraines et purge `Loi 25`. |
| **4. État d’exécution durable** | Points de contrôle, attentes (`awakeable`), journaux Saga | Sérialisation accidentelle de paramètres sensibles ou jetons. | Magasin externe chiffré au repos (`EXIG-ORC-11`, `EXIG-ORC-13`) et zéro jeton stocké (`EXIG-IAM-06`). |
| **5. Traces et journaux d’audit** | Métadonnées `OTel`, voûte forensique, audit `JCS` | Injonction étrangère ou altération interne des preuves. | Double couloir PII (`≤ 14 j`), audit `JCS` et ancrage horaire externe (`EXIG-OBS-07..13`). |
| **6. Secrets et clés** | Clés racines de gestionnaire de clés (*Key Management Service*, `KMS`) / module matériel de sécurité (*Hardware Security Module*, `HSM`), autorités `SPIFFE` | Perte immédiate de souveraineté sur compromission. | Garde exclusive par l’institution (`HYOK` / `HSM`) pour déchiquetage instantané. |

Sur accélérateurs mutualisés — en sus de `CAD26 EXIG-SEC-10` (`IOMMU` et remise à zéro mémoire) —, les **enclaves matérielles (**`TEE`**) CPU/GPU** (`C27 § 46.2, 46.10`) restent conditionnelles aux scénarios `B` et `C` sous `SIG-016` P : CAP-033 P : INI-027. Deux réserves s’imposent (`C27 § 46.2–46.3, 46.10`). D’abord, l’attaque `TEE.fail` sur bus `DDR5` **coûterait moins de** `1 000 $ US` **selon les auteurs** (page non recoupée, `C27 § 46.2`) pour extraire des clés CPU et relayer des attestations GPU, sans dispenser de sécurité physique. Ensuite, le séquestre externe de clés (`HYOK`) garantit une révocation immédiate (`POR-002`) sous `RTT ≤ 35 ms` **conseillé**, sans portabilité native des chiffrés.

En **continuité cognitive (*Cognitive DR*)**, basculer d’API prend quelques secondes, mais réaligner invites, outils et seuils sur une autre famille exige des semaines à froid (`C27 § 46.4`). Tout flux critique (`Classes 3 à 5`) pré-qualifie donc en `E2` un **second profil indépendant à poids ouverts exercé chaque trimestre** P : CAP-031 P : DEC-006 P : POR-006 E : EXIG-APP-14. Les seuils de reprise `< 15 min` `[S]` (`C27 § 46.11`) et d’autonomie déconnectée `72 h` `[S]` (`C27 § 46.17`) restent des **cibles de conception sans appui empirique (**`[S]`**)**. Hors réseau (sinistres terrain, `PEX-031`), l’agent opère en *Local-First* sur **quotas en séquestre** réconciliés par `CRDT` (`C27 § 46.5, 46.14`). À la marge du cœur financier, si un groupe expose un équipement physique ou télématique (`CAP-028`, `ADR-028`), toute commande (`ROS 2`/`DDS`) franchit un **arbitre matériel déterministe** `Simplex` (`ISO 10218-1:2025` / `IEC 61508`) sous mises à jour signées `TUF`, sans certifier le contrôleur neuronal P : CAP-028 P : DEC-008.

### 9.3 Réseaux B2B fédérés conditionnels (`P3`) : `vLEI`, `Dataspace`, Diplomate / Évaluateur et rapprochement 3 voies

L’échange inter-organisations (`Stade 4`) reste proscrit en conseil (`D2`, `Stades 2–3`) et sur les enquêtes de conformité (`D6`, `Stade 3` interne en `PD28 M-12` p. 171, hors inventaires techniques de `M-18`). Ailleurs, il demeure conditionnel au Palier 3 (`2033–2035` C : A, C ; SIG-007, SIG-110) sous quatre verrous (`C27 ch. 45`, `ADR-026`) P : CAP-014 P : CAP-027 P : CAP-041 P : DEC-012 P : POR-013 :

1. **Identité légale vérifiable (**`vLEI`**).** Tout agent tiers présente ses justificatifs `GLEIF vLEI` et de rôle organisationnel officiel (*Official Organizational Role*, `OOR`, `SIG-007`) liés à la personne morale et aux plafonds de son mandat (`CAP-041`).
2. **Connecteurs `Dataspace` et `ODRL 2.2`.** Les flux B2B (co-assurance, réassurance, portée 3) traversent des connecteurs exécutant `ODRL 2.2` (`CAP-027`), qui gouverne l’usage sans empêcher techniquement la copie post-livraison hors salle blanche (`C27 § 45.2, 45.5`).
3. **Scission** `Diplomate / Évaluateur` **et anti-collusion.** Le **Diplomate** externe ne détient aucun secret ; l’**Évaluateur** interne vérifie les offres contre tables de réserve, marges et fraude sous rondes bornées (`C27 § 45.4`, `CAP-014`), avec surveillance statistique de la **collusion algorithmique** (`C27 § 45.6`).

4. **Rapprochement à trois voies avant règlement (**`AP2` **/** `x402`**).** Tout mandat de paiement (`AP2` — transfert FIDO non matérialisé au 1er nov. 2026 `C26 S-091` — ou `x402`) est classé `P3` E : EXIG-INT-22 sous **rapprochement déterministe à trois voies** hors modèle (contrat signé, preuve d’exécution, facture conforme, `C27 § 45.7`, `POR-013`).

Correspondance `ABB → SBB` de l’inférence, des substrats et du B2B (état au 28 oct.–14 nov. 2026) :

| Domaine | ABB (bloc neutre) | SBB substituables (état au 28 oct.–14 nov. 2026) |
| --- | --- | --- |
| Passerelle et ordonnancement d’inférence | Médiateur d’alias à 3 paliers et affinité `KV-cache` | agentgateway, Envoy AI Gateway, LiteLLM, Portkey, Bifrost ; `Gateway API Inference Extension` (`EPP`) et `llm-d` sur vLLM, SGLang, TensorRT-LLM (RouteLLM avec réserve) |
| Confidentialité matérielle et clés | Enclaves matérielles CPU/GPU attestées et séquestre externe | `Intel TDX`, `AMD SEV-SNP`, `NVIDIA Confidential Computing` ; `HSM` internes et `HYOK` (`RTT ≤ 35 ms` conseillé) |
| Échange B2B fédéré | Identité légale et connecteur d’espace de données | `GLEIF vLEI` (`KERI`/`ACDC`), Eclipse Dataspace Components (`EDC`) + `ODRL 2.2` |

Contrat opérationnel croisé — Architecte d’entreprise (AE) | Architecte de solutions (AS)

Décisions AE

1. Imposer la matrice juridictionnelle des six substrats d’état (`[S]`) en séparant résidence physique et contrôle juridictionnel extraterritorial P : PRI-011 P : CAP-032 P : POR-002 E : EXIG-CON-05 E : EXIG-APP-11.
2. Exiger sur les flux critiques (`Classes 3 à 5`) une continuité cognitive bimodèle incluant un profil indépendant à poids ouverts testé chaque trimestre P : CAP-031 P : DEC-006 P : POR-006 E : EXIG-APP-14, et réserver les enclaves `TEE` sur signal `SIG-016` P : CAP-033.
3. Subordonner tout `Stade 4` B2B en `P3` (`2033–2035` C : A, C ; SIG-007, SIG-110) à `vLEI`, à la scission Diplomate / Évaluateur, à l’anti-collusion et au rapprochement tripartite avant paiement P : CAP-014 P : CAP-027 P : CAP-041 P : DEC-012 P : POR-013 E : EXIG-INT-22.

Spécifications AS

1. Opérer tout modèle derrière la passerelle par alias logique (`DEVRAIT`) E : EXIG-ARC-08 E : EXIG-ARC-09, dissocier routage prudent à 3 paliers et affinité `KV-cache`, et gouverner les cinq horloges (`C26 § 47.8`) au-delà de `CycloneDX 1.7` / `SPDX 3.0` E : EXIG-SEC-20.
2. Chiffrer les substrats sous clés souveraines (`HYOK` avec `RTT ≤ 35 ms` conseillé), intégrer le risque physique `TEE.fail` (qui coûterait moins de `1 000 $ US` selon les auteurs), et encadrer le mode déconnecté par quotas en séquestre `CRDT` et arbitre `Simplex` (cibles sans appui empirique : RTO `< 15 min` `[S]` et autonomie `72 h` `[S]`) P : CAP-028 P : DEC-008.
3. Cloisonner réseau et mémoire entre Diplomate externe et Évaluateur interne, attacher `ODRL 2.2` aux connecteurs `Dataspace`, et bloquer tout règlement `AP2`/`x402` (`P3`) derrière un rapprochement déterministe à trois voies.

### 9.4 Grille de décision

| Décision | Option par défaut | Quand s’en écarter | Preuve |
| --- | --- | --- | --- |
| Invocation des modèles et répliques | Passerelle unique et alias logiques (`DEVRAIT`), routage à 3 paliers et affinité `KV-cache` P : CAP-029 P : DEC-006 E : EXIG-ARC-08 E : EXIG-ARC-09 | Jamais d’appel direct vers une API externe hors bac d’essai local sans données réelles | `[M]` `C27` ch. 44 § 44.3–44.5 ; `CAD26` § 5.2 |
| Souveraineté des états d’un agent | Matrice juridictionnelle et clés maîtrisées par l’institution sur les six substrats P : CAP-032 P : POR-002 E : EXIG-CON-05 | Données strictement publiques `P0` sans renseignement personnel ni secret d’affaires | `[N]` `Loi 25` art. 17 (`EXIG-APP-11`) ; `C27` § 37.1, § 46.1 `[S]` |
| Enclaves d’inférence confidentielle (`TEE`) | Activation sélective (`SIG-016`) pour secrets critiques sur accélérateurs mutualisés P : CAP-033 | Grappe dédiée sous contrôle physique complet, ou latence `HYOK` excédant le seuil conseillé de `35 ms` `RTT` | `[M]` `[É]` Attaque `TEE.fail` (coûterait `< 1 000 $ US` selon les auteurs, `C27` § 46.2–46.3) |
| Continuité face à la défaillance d’un modèle | Second profil indépendant à poids ouverts pré-qualifié en `E2` et exercé chaque trimestre P : CAP-031 P : POR-006 | Assistants internes non critiques `Classe 1` tolérant une suspension temporaire | `[N]` `BSIF` E-21 / B-10 ; `CAD26` `EXIG-APP-14` |
| Résilience terrain hors réseau et actionneurs | Quotas en séquestre bornés (`CRDT`) et arbitre matériel déterministe `Simplex` P : CAP-028 P : DEC-008 | Actes irréversibles ou refus `Classe 4`, retenus jusqu’au retour du canal humain | `[S]` `C27` § 46.4–46.8, § 46.11, § 46.17 (`< 15 min` `[S]`, `72 h` `[S]`) |
| Transaction inter-entreprises (`Stade 4`) | Identité `vLEI`, scission Diplomate / Évaluateur, anti-collusion et rapprochement 3 voies avant `P3` P : CAP-014 P : CAP-041 P : DEC-012 P : POR-013 E : EXIG-INT-22 | Proscrit en conseil (`D2`) et sur les enquêtes/décisions de conformité (`D6`, `Stade 3` interne en `PD28 M-12`) | `[M]` Collusion (`C27` § 45.6) ; `C26` `S-091` |

### 9.5 Limites et renvois

**Limites et réserves.** Les cinq horloges (`C26 § 47.8`, dont la cinquième sans socle primaire en `§ 47.8.1`) et les six substrats (`C27 § 46.1`) sont des constructions d’auteur (`[S]`). Tout chiffrage fictif du *Groupe Boréal Inc.* (`C27 § 46.17`) est exclu comme preuve, et les seuils `< 15 min` `[S]` et `72 h` `[S]` demeurent des cibles de conception non mesurées, tout comme les prototypes OT (`C27 § 28.5`). Au 17 novembre 2026, ni `EUCS` (`C27 § 37.5`) ni le transfert d’`AP2` (`C26 S-091`) ne sont aboutis.

**Renvois aux volumes sources :** `C26` ch. 47 (pp. 534–544 ; § 47.2.1, § 47.7–47.11), ch. 50 (`S-091` p. 585) ; `CAD26` § 5.2–5.3 (`EXIG-ARC-08, 09`), `EXIG-INT-22`, `EXIG-SEC-10, 20`, `EXIG-CON-05`, `EXIG-APP-10..14` ; `C27` ch. 37 (pp. 747–754), ch. 44 (`ADR-014` pp. 874–893), ch. 45 (`ADR-026` pp. 894–915), ch. 46 (`ADR-027, 028` pp. 916–949) ; `PD28` `M-11`, `M-13`, `PRI-011`, `CAP-014`, `CAP-027..029`, `CAP-031..033`, `CAP-041`, `DEC-006`, `DEC-008`, `DEC-012`, `POR-002`, `POR-006`, `POR-013`, `SIG-007`, `SIG-009`, `SIG-015`, `SIG-016`, `SIG-103`, `SIG-109`, `SIG-110`.

# Partie IV — Gouverner, conformer et cadencer la trajectoire : le chantier de l’architecte d’entreprise

Chapitre 10 — Conformité dès la conception (Canada, Québec, UE) et déclinaison des cinq profils financiers

Chapitre 11 — Modèle opérationnel à trois lignes, usine logicielle interne et approvisionnement réversible

Chapitre 12 — Homologation unifiée et trajectoire adaptative (90 jours → 18 mois → Paliers P1–P3) sous signaux

## Chapitre 10 — Conformité dès la conception (Canada, Québec, UE) et déclinaison des cinq profils financiers

> **Ancrage corpus (état de référence : 17 novembre 2026) :** `[C26 ch. 25–36, Annexe N]` · `[CAD26 ch. 12, Annexe H.3 | EXIG-CON-01..26]` · `[C27 ch. 35–38 | ADR-024]` · `[PD28 M-3, M-14–M-18, Annexe D | PEX-001..044, CAP-021, CAP-049]`.

*Question directrice : Comment traduire l’empilement juridique canadien, québécois et européen en contrôles d’architecture concrets sans traiter les quatre sous-secteurs financiers comme une banque généralisée ?*

**Thèse du chapitre :** Sans loi fédérale canadienne générale sur l’IA fin 2026, les textes adoptés au Québec, au Canada et en Europe régissent la preuve, l’imputabilité humaine et les effets, jamais l’autonomie intrinsèque P : PRI-010 P : CAP-049. L’institution opère une base de preuves unique et une évaluation d’impact unifiée sur la règle la plus stricte E : EXIG-CON-18 E : EXIG-CON-25 E : EXIG-CON-26, puis ferme `DIV-02` par vingt-quatre verrous (`PEX-001` à `PEX-044` : **13 spécialisations** de `CAD26`, **11 comblements** de 2026).

### 10.1 Empilement normatif 2026-2033 : une base de preuves unique contre les silos

Au 17 novembre 2026, la mort de `C-27` (6 janvier 2025) et l’attente de deuxième lecture de `C-36` (`C26 § 26.3`, p. 312) confirment `PD28 M-3` : le droit positif régit la traçabilité et le répondant humain. Contre les silos réglementaires, `CAD26 ch. 12` prescrit le classement par risque et juridiction E : EXIG-CON-01 E : EXIG-CON-03. Il impose aussi une évaluation d’impact unifiée E : EXIG-CON-26 et un index probatoire unique multi-autorités E : EXIG-CON-18 P : CAP-049.

Au Québec, la *Loi 25* (`L.Q. 2021, c. 25`, `L+` ; `RLRQ, c. P-39.1` au `statut F` en `PD28`) impose quatre verrous (`C26 ch. 27`, `CAD26 ch. 12`). Premièrement, l’ÉFVP préalable s’applique dès la conception (`art. 3.3`) E : EXIG-CON-04. Deuxièmement, tout transfert hors Québec exige une ÉFVP sur le droit étranger et une entente écrite, sans interdiction géographique absolue (`art. 17`) E : EXIG-CON-05. Troisièmement, toute décision exclusivement automatisée (`art. 12.1`, `Classe 5`) requiert avis contemporain, facteurs principaux, droit d’observation, révision par un employé habilité et dossier gardé `≥ 1 an` E : EXIG-CON-07 E : EXIG-CON-08 E : EXIG-CON-09. Quatrièmement, purge ou anonymisation (`art. 23`) E : EXIG-CON-10 et gestion des incidents (`art. 3.5`) s’appliquent au délai le plus strict E : EXIG-CON-23 E : EXIG-CON-24 E : EXIG-CON-25.

La convergence prudentielle canadienne culmine le **1er mai 2027** D. Au fédéral, `BSIF E-23` révisée (11 sept. 2025, vigueur le 1er mai 2027 D `ANC-103`) étend le risque de modèle aux systèmes génératifs et tiers E : EXIG-CON-12. Ses douze énoncés au conditionnel (*should*, `C26 ch. 25`) couvrent inventaire, autonomie, cycle de vie, validation indépendante et dérive. Ils s’articulent avec le *Bulletin BSIF* (juill. 2026, `SIG-101`), les *Sound Practices* du CSF (oct. 2026), `B-10`, `B-13`, `E-21` et `BSIF B-15` (**portée 3** dès **2028** D `ANC-106`, `SIG-109`). Au Québec, la ligne directrice `AMF` sur l’IA s’applique le **1er mai 2027** D (`ANC-112`) E : EXIG-CON-11. Son instruction est décloisonnée dans `2026/documents/Note AMF IA.pdf` (`CRE-IA-2026-01-QC`, 49 p., recoupée avec `C26 Annexe N` `§ N.3`). Ce profil traduit les **41 attentes (`AMF-G`: 12, `R`: 6, `C`: 5, `V`: 9, `P`: 9)** du texte AMF (17 p., « Mars/Avril 2026 ») en **12 exigences `EXIG-AMF-01` à** `EXIG-AMF-12` (10 au 1er mai 2027 `ANC-112`, puis `EXIG-AMF-09/10` à `ANC-113`). Ces exigences intègrent désormais `CAD26` v1.2 (**305** `EXIG-*` : `287` v1.1 + `12 EXIG-AMF` + `6` ajouts PQC/ACVM/RTR/EN 18286 ; `255 DOIT`, `34 NE DOIT PAS`, `16 DEVRAIT`), levant les **9 reports** d’`Annexe H.3` (`SIG-102`). S’ajoutent l’avis `ACVM 11-348` (`2024-12-05`, `ANC-121`, `SIG-105`) et `NI 31-103` : coût quotidien (1er janv. 2026 D `ANC-101`), distributeurs principaux (`ANC-102`, `ANC-107`) et fin des rétrofacturations le **1er octobre 2028** D `ANC-105`.

En Europe, l’`EU AI Act` (`(UE) 2024/1689` modifié par `(UE) 2026/1744`) s’applique dès utilisation des sorties dans l’Union (`art. 2(1)(c)`) E : EXIG-CON-13. Il bloque les pratiques interdites E : EXIG-CON-14 et prévient la requalification en fournisseur (`art. 25`) E : EXIG-CON-15 E : EXIG-APP-15. L’**article 50** (divulgation E : EXIG-CON-19 et marquage synthétique E : EXIG-CON-20) s’applique les **2 août** et **2 décembre 2026** D `ANC-001` (GPAI le 2 août 2027 D `ANC-004`). L’**Annexe III** (crédit `5 b`, vie et maladie `5 c`) E : EXIG-CON-16 bascule le **2 décembre 2027** D `ANC-007` avec `EN 18286:2026` (`SMQ`, `art. 17`, `(UE) 2026/2274` au `JOUE` le 14 oct. 2026). Les réexamens (`ANC-009, 011` D en 2028 ; `ANC-019..021` D en 2031–2033) ne visent que les administrations publiques européennes (`SIG-001, SIG-002`). Enfin, la **temporisation fédérale du 30 juin 2033** D (`ANC-109..111`, `SIG-108`) encadre le renouvellement des lois sur les banques, les assurances et la fiducie.

| Échéance | Texte (institutions financières privées) | Contrôle d’architecture | Appui |
| --- | --- | --- | --- |
| En vigueur / veille consultative | `Loi 25` (`L.Q. 2021, c. 25`) ; `L.Q. 2023, c. 5` (assureurs privés exclus) ; `NI 31-103` (`2026-01-01` D `ANC-101`) ; `ACVM 11-348` (`2024-12-05`, `SIG-105`) | ÉFVP, hors Québec motivé, révision humaine (`≥ 1 an`), consentement santé tiers, calcul `Decimal`, convenance | `CAD26 EXIG-CON-04..10` · `PD28 PEX-011, 015, 022` |
| `2 août` / `2 déc. 2026` D | `EU AI Act` `(UE) 2026/1744` `art. 50` (`ANC-001`) | Divulgation d’interaction et marquage des sorties utilisées dans l’UE | `CAD26 EXIG-CON-13, 19, 20` · `C26 Annexe N` |
| `1er mai 2027` D | `BSIF E-23` (`ANC-103`) ; `AMF IA` (Mars/Avril 2026, `C26 Annexe N.3`) | Inventaire, cote d’autonomie, 2e ligne ; `287 EXIG-*` v1.1 (`9` reports AMF en suspens) | `CAD26 EXIG-CON-11, 12, Annexe H.3` · `C26 Annexe N` |
| `2 déc. 2027` D | `EU AI Act` Annexe III `5 b / 5 c` (`ANC-007`) + `EN 18286:2026` | `SMQ` harmonisé, biais et audit `≥ 24 mois` sur crédit et assurance-vie UE | `CAD26 EXIG-CON-15, 16, EXIG-OBS-13` |
| `Oct.` / `fin 2028` D | `NI 31-103` rétrofacturations (`ANC-105`) ; `BSIF B-15` portée 3 (`ANC-106`) | Retrait des barèmes interdits ; mesure carbone d’inférence par entité | `PD28 PEX-014, 035, 044, CAP-046` |
| `30 juin 2033` D | Temporisation *Banques*, *Assurances*, *Fiducie* (`ANC-109..111`) | Cloisonnements inter-entités externalisés en politiques déclaratives (`SIG-108`) | `PD28 M-3, M-18, INI-042` |

### 10.2 Fermeture de `DIV-02` et déclinaison des cinq profils financiers (`24 PEX`)

Faute de `CAD26` sur disque lors de `PD28`, l’Annexe D marquait ses vingt-quatre propositions (`PEX-001` à `PEX-044`) `corpus_2026_absent` (`DIV-02`). Leur raccordement dans `concordances.json` (`Annexe A.4`) établit **13 spécialisations** de `CAD26` et **11 comblements** de lacunes de 2026 (`CAD26 Annexe H.5`).

**1. Banque et coopératives (**`PEX-001` **à** `PEX-005`**,** `PD28 M-14` **: 2 spécialisations, 3 comblements).** `PEX-001` interdit le grattage d’écran par identifiant client (`LSAC`, `L.C. 2026, ch. 3, art.`

`224`, `art. 171`). Il vérifie aussi le certificat au registre de la Banque du Canada (`BdC`, `ANC-104` A, disponibilité `≥ 99,5 %`, `SIG-103`) E : EXIG-IAM-01 E : EXIG-IAM-09 E : EXIG-IAM-17. `PEX-003` applique hors modèle la muraille bancassurance (*Loi sur les banques* `art. 416`, `DORS/92-330 art. 7.1(2), 8(1), 9`), bloquant promotion interdite et transfert de données clients E : EXIG-IAM-21 E : EXIG-CON-06 E : EXIG-CON-11. `PEX-004` classe tout virement sur le Rail en temps réel (`RTR` `ISO 20022` `pacs.008`, `C26 ch. 33`, `SIG-104`) en `Classe 4` / `P3`, sous calcul décimal exact et approbation liée à `h = SHA-256(JCS)` E : EXIG-INT-22 E : EXIG-AUT-09 E : EXIG-AUT-12 E : EXIG-ORC-21. En spécialisation, `PEX-002` conserve **5 ans** les consentements ouverts et **7 ans** les plaintes E : EXIG-CON-06 E : EXIG-CON-10 E : EXIG-OBS-13. Enfin, `PEX-005` impose les livres au Canada (`art. 238–239`), l’alerte `< 100 $ CA` et le délai de plainte de **56 jours** sans terme interne « ombudsman » E : EXIG-CON-05 E : EXIG-CON-19 E : EXIG-OBS-13.

**2. Patrimoine et valeurs mobilières (**`PEX-011` **à** `PEX-015`**,** `PD28 M-15` **: 1 spécialisation, 4 comblements).** Quatre propositions complètent `CAD26` face à `NI 31-103` et aux règles `OCRI`. `PEX-011` rattache la convenance (`OCRI 3400`, `1103(2)`, `ACVM 11-348`) à un représentant inscrit et exclut `D2` du `Stade 4` E : EXIG-GOV-01 E : EXIG-AUT-22 E : EXIG-CON-09 E : EXIG-CON-21. `PEX-012` arme la double barrière des comptes sans conseils (`OEO`, `OCRI 3240–3241` : zéro recommandation et rejet des ordres clients automatisés) E : EXIG-ARC-12 E : EXIG-IAM-21 E : EXIG-CON-11. `PEX-014` écarte conflits d’intérêts et rétrofacturations interdites le **1er octobre 2028** D `ANC-105` E : EXIG-IAM-21 E : EXIG-EVA-02 E : EXIG-CON-26. `PEX-015` délègue le calcul quotidien des frais de fonds (`ANC-101` D) à un outil `Decimal` exact E : EXIG-INT-02 E : EXIG-INT-12 E : EXIG-ARC-17. Enfin, `PEX-013` spécialise la pré-approbation superviseur, l’anti-*AI washing* (`OCRI 3600/3602/3640`) et l’archive **7 ans** (`OCRI 3803`) E : EXIG-CON-19 E : EXIG-CON-20 E : EXIG-CON-22 E : EXIG-OBS-13.

**3. Assurance de personnes (**`PEX-021` **à** `PEX-025`**,** `PD28 M-16` **: 3 spécialisations, 2 comblements).** `PEX-021` applique l’interdiction pénale fédérale (`L.C. 2017, ch. 3`) en purgeant avant mémoire ou inférence tout test génétique ADN/ARN/chromosomes sans consentement écrit licite E : EXIG-ARC-23 E : EXIG-CON-06 E : EXIG-CON-10. `PEX-025` assure la conservation bi-temporelle et post-quantique sur **20 à 40 ans** des contrats vie/rentes au-delà de **2035** A `ANC-043` (`SIG-009`) E : EXIG-OBS-12 E : EXIG-OBS-13 E : EXIG-CON-05 E : EXIG-CON-10. En spécialisation, `PEX-022` vérifie le consentement temporisé envers le réseau sociosanitaire (`L.Q. 2023, c. 5`) E : EXIG-CON-04 E : EXIG-CON-06 E : EXIG-OBS-12. `PEX-023` exige un examen humain habilité avant tout refus vie/invalidité/maladie grave (`art. 12.1`, `RIA Annexe III 5 c` au 2 décembre 2027 D `ANC-007`) E : EXIG-AUT-07 E : EXIG-AUT-09 E : EXIG-AUT-22 E : EXIG-AUT-23 E : EXIG-CON-07. Enfin, `PEX-024` étend homologation et collecte d’audit aux agents des `MGA` (*Managing General Agents*) E : EXIG-GOV-07 E : EXIG-SEC-22 E : EXIG-APP-13.

**4. Assurance de dommages (**`PEX-031` **à** `PEX-035`**,** `PD28 M-17` **: 3 spécialisations, 2 comblements).** `PEX-033` prouve la comparaison d’au moins **3 assureurs hors groupe** en courtage (`LDPSF`, `art. 38`) E : EXIG-OBS-11 E : EXIG-OBS-12 E : EXIG-CON-21. `PEX-035` impose la validation 2e ligne des modèles de catastrophe (`BSIF B-9`) et la portée 3 (`B-15`, `ANC-106` D) E : EXIG-CON-11 E : EXIG-CON-12 E : EXIG-EVA-03. En spécialisation, `PEX-031` exige l’élasticité catastrophique annuelle (`E-21`) et un expert certifié sur tout refus contesté E : EXIG-ORC-27 E : EXIG-AUT-09 E : EXIG-AUT-23 E : EXIG-CON-07. `PEX-032` restreint l’automobile québécoise aux formulaires approuvés sans texte libre E : EXIG-ARC-24 E : EXIG-CON-22 E : EXIG-IAM-21. Enfin, `PEX-034` impose des identités `NHI` révocables par courtier (`B-10`) et la décontamination des photos E : EXIG-IAM-03 E : EXIG-IAM-07 E : EXIG-SEC-03 E : EXIG-SEC-04 E : EXIG-SEC-06.

### 10.3 Groupe financier diversifié : mutualiser le plan technique, jamais les données

En groupe réunissant banque, patrimoine et assurances (`PEX-041` à `PEX-044`, `PD28 M-18`, **4 spécialisations**), `PRI-010` et `DEC-007` imposent le maillon le plus strict. Ils ne mutualisent que le **socle technique** (passerelles, politiques, outillage ; E : EXIG-ARC-02 ne propageant que mandant, trace et budget), jamais contextes, mémoires ni données clients E : EXIG-ARC-19 E : EXIG-ARC-25. Quatre verrous l’assurent P : CAP-021 P : PEX-041. `PEX-041` attache une étiquette immuable d’entité juridique appliquant hors modèle la muraille banque-assurance E : EXIG-CON-06 E : EXIG-ARC-16 E : EXIG-ARC-25 E : EXIG-IAM-21. `PEX-042` exige un jeton cryptographique de consentement exprès distinct avant toute délégation inter-filiales (`Loi 25`) E : EXIG-IAM-08 E : EXIG-IAM-10 E : EXIG-CON-06. `PEX-043` encadre le socle par contrats `BSIF B-10`, audits par filiale et plans de sortie E : EXIG-GOV-05 E : EXIG-APP-01 E : EXIG-APP-13 E : EXIG-APP-14. Enfin, `PEX-044` désagrège par entité les livres canadiens, les inventaires `E-23`/`AMF` et la portée 3 `B-15` E : EXIG-GOV-07 E : EXIG-CON-05 E : EXIG-CON-11 E : EXIG-CON-12 E : EXIG-CON-25.

| Profil (`PD28`) | `PEX` | Bilan `DIV-02` | Verrous déterministes distinctifs |
| --- | --- | --- | --- |
| **Banque** (`M-14`) | `PEX-001..005` | `2` spéc. · `3` lacunes | Zéro grattage `LSAC art. 171` + `BdC` (`ANC-104` A) ; muraille `art. 416` / `DORS/92-330` ; `P3` + `h` sur `pacs.008` `RTR` ; archives `5`/`7 ans` (`56 j`) |
| **Patrimoine** (`M-15`) | `PEX-011..015` | `1` spéc. · `4` lacunes | Convenance humaine `OCRI 3400` (`D2` hors `Stade 4`) ; double barrière `OEO 3241` ; fin rétrofacturations (`2028-10-01` D `ANC-105`) ; frais `Decimal` ; `7 ans` |
| **Assurance personnes** (`M-16`) | `PEX-021..025` | `3` spéc. · `2` lacunes | Purge pénale ADN/ARN (`L.C. 2017, ch. 3`) ; consentement santé (`L.Q. 2023, c. 5`) ; refus humain + `art. 12.1` + `RIA 5 c` ; `MGA` ; PQC `20–40 ans` |
| **Assurance dommages** (`M-17`) | `PEX-031..035` | `3` spéc. · `2` lacunes | Élasticité cat. + refus expert certifié ; formulaires auto (`Loi sur les assureurs art. 71`) ; `≥ 3` assureurs (`LDPSF art. 38`) ; `NHI` courtiers + sas photo ; `B-9`/`B-15` |
| **Groupe diversifié** (`M-18`) | `PEX-041..044` | `4` spéc. · `0` lacune (`13+11=24`) | Étiquette d’entité immuable ; jeton consentement inter-filiales ; contrats `B-10` ; désagrégation livres, `E-23`/`AMF` et `B-15` |

Contrat opérationnel croisé — Architecte d’entreprise (AE) | Architecte de solutions (AS)

Décisions AE

1. Imposer une base de preuves unique E : EXIG-CON-18 et une évaluation d’impact unifiée E : EXIG-CON-26 calées sur le 1er mai 2027 D (`BSIF E-23` `ANC-103`, `AMF IA` `C26 Annexe N.3`) et le 2 décembre 2027 D (`RIA Annexe III` `ANC-007`), tout en suivant les 9 reports `AMF IA` (`+12 EXIG-AMF`) P : CAP-049.
2. Inscrire au registre les 24 verrous `PEX-001` à `PEX-044`, plafonner le conseil (`D2`, `Stades 2–3`) et la conformité (`D6`, `Stade 3` interne en `PD28 M-12`), et exiger en groupe diversifié des contrats `BSIF B-10` et des inventaires désagrégés par filiale P : PEX-043 P : PEX-044.
3. Préparer la temporisation fédérale du 30 juin 2033 D (`ANC-109..111`, `SIG-108`) en externalisant les murailles statutaires dans des politiques déclaratives P : INI-042.

Spécifications AS

1. Propager de façon immuable dans chaque jeton, index, mémoire et appel d’outil l’identifiant d’entité mandante, le consentement horodaté et les étiquettes d’exclusion P : CAP-021 P : PEX-041 P : PEX-042 E : EXIG-CON-06.
2. Coder hors modèle les coupe-feux sectoriels : purge génétique préalable P : PEX-021, double blocage `OEO 3241` P : PEX-012, muraille `art. 416` / `DORS/92-330` P : PEX-003, clauses automobiles homologuées P : PEX-032, verrou `P3` lié à `h` sur `pacs.008` P : PEX-004 et examen humain des refus P : PEX-023 P : PEX-031.
3. Automatiser divulgation E : EXIG-CON-19, marquage synthétique E : EXIG-CON-20, revue juridique E : EXIG-CON-22 et rétentions différenciées (`≥ 1 an` `art. 12.1`, `≥ 24 mois` audit, `5 ans`, `7 ans`, multidécennal PQC).

### 10.4 Grille de décision

| Décision | Option par défaut | Quand s’en écarter | Preuve |
| --- | --- | --- | --- |
| Architecture de conformité multi-juridictions | Base de preuves unique et évaluation d’impact unifiée sur la règle la plus stricte E : EXIG-CON-18 E : EXIG-CON-25 E : EXIG-CON-26 | Jamais de registres parallèles dissociés par régulateur (`Loi 25`, `E-23`, `AMF IA`, `RIA`) | `[N]` `BSIF E-23` (`ANC-103`), `Loi 25`, `RIA` (`ANC-007`) ; `CAD26 ch. 12` |
| Mutualisation agentique dans un groupe financier | Partage du seul plan technique sous contrat `B-10`, étiquette d’entité immuable et données cloisonnées P : PEX-041 P : PEX-043 P : PEX-044 | Délégation inter-filiales sur seul jeton cryptographique de consentement exprès distinct P : PEX-042 | `[N]` *Loi sur les banques* `art. 416`, `Loi 25`, `BSIF B-10` / `B-15` (`ANC-106`) |
| Traitement documentaire médical en assurance de personnes | Caviardage déterministe préalable à toute mémoire ou inférence des tests génétiques sans consentement licite P : PEX-021 | Jamais : infraction pénale fédérale excluant toute purge a posteriori | `[N]` `L.C. 2017, ch. 3` ; `PD28 M-16` |
| Déploiement d’un agent sur un canal sans conseils (`OEO`) | Double blocage hors modèle de toute recommandation et de tout ordre client automatisé P : PEX-012 | Bascule vers un parcours de conseil rattaché à un représentant inscrit P : PEX-011 | `[N]` `OCRI 3241` et `3400`, `NI 31-103` ; `PD28 M-15` |
| Préparation d’un virement irrévocable `ISO 20022` (`pacs.008`) | Retenue `Classe 4` / `P3`, calcul `Decimal` exact et approbation hors bande liée à `h` P : PEX-004 | Jamais d’exécution autonome sans validation humaine liée au montant et au bénéficiaire E : EXIG-AUT-09 E : EXIG-AUT-12 | `[N]` `DORS/2026-133` ; `CAD26 EXIG-INT-22` ; `C26 ch. 33` |
| Clauses automobiles réglementées ou conclusions juridiques | Sélection déterministe de formulaires approuvés P : PEX-032 et relecture humaine obligatoire E : EXIG-CON-22 | Brouillon d’analyse interne non transmis au client | `[N]` *Loi sur les assureurs* (Québec, `art. 71`) ; `CAD26 ch. 12` |

### 10.5 Limites et renvois

Aucune prescription légale primaire (critère `CA-12`) ne repose sur un texte au `statut F`. Demeurent ainsi bornés les téléchargements HTTPS sur `lautorite.qc.ca` (`T-01`, `T-02`, `T-13` à `T-15`, version AMF de `NI 31-103`, en `HTTP 403`), les lots `P1-B2` à `P1-B4` et `P3-L2`, les codifications `RLRQ` (compensées en `L+` par `L.Q. 2021, c. 25`, `L.Q. 2023, c. 5`, `L.Q. 2018, c. 23`) et les normes sous licence (`FDX v6.0`, `ACORD`, `CSIO`, `ISO/IEC 42001`, `ISO/IEC 42105`). Le décloisonnement de `2026/documents/Note AMF IA.pdf` (`CRE-IA-2026-01-QC`, `41` attentes et `12 EXIG-AMF` intégrées en v1.2 à `305 EXIG-*`, `ANC-112`, `ANC-113`), la veille `AMF IA` (`SIG-102`), le `RTR` (`SIG-104`) et les décrets `LSAC` (`SIG-103`) restent à revalider avant production, sans tenir lieu d’avis juridique. Renvois : `2026/documents/Note AMF IA.pdf` (49 p.), `C26` ch. 25–36 (pp. 300–424), `Annexe N` (pp. 661–673), `CAD26` ch. 12 (pp. 205–233), `Annexe H.3` (pp. 346–347), `C27` ch. 35–38 (pp. 725–782), `PD28` `M-3` (pp. 42–58), `M-14–M-18` (pp. 188–252), `Annexe D` (pp. 362–366) et `Annexe A.4`.

**Évaluation artificielle FEDS sur les cinq profils (**`DC-P12`**).** Exécuté mécaniquement sur le socle `CRE-IA v1.2` (`305 EXIG-*`), les `52 CAP`, les `15 POR` et les `41` attentes AMF (`12 EXIG-AMF`), le banc reproductible `Borealis-Bench/feds-ema/scenarios_sectoriels.py` (**évaluation exclusivement artificielle FEDS, aucune étude de cas humaine**) mesure une charge de conformité normalisée allant du simple au double : `49,59 / 100` (`43,4` p-s, `47/52 CAP`, `0` `PRR` bloquant) en gestion de patrimoine (`L2`), `64,23 / 100` en assurance de dommages (`64,3` p-s), `68,36 / 100` en banque (`66,7` p-s), `70,19 / 100` en assurance de personnes (`68,5` p-s) et `95,78 / 100` (`86,1` p-s, `52/52 CAP`, `4` `PEX` directes + `20` supervisées) en groupe diversifié (`L4`), pour une moyenne de `69,63 / 100` (adéquation algorithmique moyenne `81,10 / 100`, `0` cycle `CAP`, `0/24` `PEX` absente, `2` angles morts résiduels/profil : `9/41` attentes AMF dépendant des `12 EXIG-AMF` et `5/15` fuites `data_exfiltration_trifecta` sous `CaMeL` seul).

## Chapitre 11 — Modèle opérationnel à trois lignes, usine logicielle interne et approvisionnement réversible

> **Ancrage corpus (état de référence : 17 novembre 2026) :** `[C26 ch. 24, ch. 36, ch. 39, ch. 41, ch. 47]` · `[CAD26 ch. 11, ch. 13 | PRIN-10, EXIG-GOV-01..20, EXIG-APP-01..17]` · `[C27 ch. 39, ch. 41, ch. 47 | ADR-003, ADR-025, ADR-029..031]` · `[PD28 M-24, M-26 | CAP-020, CAP-034, CAP-047..052, DEC-010]`.

*Question directrice : Quelle organisation humaine, quelle chaîne de fabrication logicielle interne et quelles clauses contractuelles empêchent l’érosion de la supervision, le verrouillage fournisseur et les agents fantômes ?*

**Thèse du chapitre :** Dans l’entreprise agentique, la ressource rare demeure le jugement humain qualifié P : PRI-007 P : CAP-048. Pour prévenir agents fantômes, auto-approbation et enfermement contractuel, l’institution déploie un modèle en étoile à trois lignes avec registre à sept états et un seul imputable `A` par décision E : EXIG-GOV-03 E : EXIG-GOV-04 E : EXIG-GOV-07. Elle lui associe une usine logicielle séparant Oracle et Bâtisseur sans interpréteur libre (*shell*) P : CAP-052 P : DEC-010, ainsi que dix clauses contractuelles de réversibilité E : EXIG-APP-07 E : EXIG-APP-16 E : EXIG-APP-17.

### 11.1 Modèle en étoile à trois lignes, registre à sept états et relève humaine

`C26 ch. 41` (`Tableau 41.1` `[S]`) distingue la **fabrique d’agents** (`F1`, dispositif organisationnel et CI/CD) des trois autres sens du mot : fabrique d’identité (`F2`), titre commercial (`F3`) et patron logiciel `factory` (`F4`). L’attention des valideurs ne croissant pas avec le volume (`C27 ch. 41`), `CAD26 ch. 11` et `C27 ch. 39` instaurent un **modèle en étoile (*Hub-and-Spoke*) à trois lignes** E : EXIG-GOV-01 E : EXIG-GOV-05 P : CAP-050 :

- **Première ligne scindée (plateforme et métiers).** La plateforme centrale opère le socle obligatoire E : EXIG-GOV-05 (passerelles, registre, catalogue, évaluation, coupe-circuit) et livre des gabarits conformes par construction (`SPIFFE`, trace sans contenu, budgets) rendant la voie gouvernée plus rapide que le contournement E : EXIG-GOV-06 (`DEVRAIT`). Chaque agent reçoit en domaine un **parrain métier nominatif** relié aux ressources humaines (`ADR-025`) et un **responsable technique** E : EXIG-GOV-01.
- **Deuxième ligne indépendante.** Risque de modèle (`BSIF E-23`), conformité, sécurité et RPRP valident la cote de risque, instruisent les dérogations et détiennent un droit de suspension.
- **Troisième ligne.** L’audit interne accède en lecture seule autonome aux registres, bancs scellés et journaux d’audit P : CAP-050.

Le comité d’architecture et des risques agentiques E : EXIG-GOV-02 applique deux invariants RACI : **un seul rôle** `A` **(imputable) par décision** avec suppléant E : EXIG-GOV-04, et l’**interdiction de cumuler construction et homologation** E : EXIG-GOV-03. Le registre compte **sept états** (`proposé` → `en conception` → `en construction` → `pilote` → `production` → `suspendu` → `retiré`) E : EXIG-GOV-07 P : CAP-047. Aucun justificatif n’est émis sans fiche approuvée E : EXIG-GOV-08 E : EXIG-GOV-17. Les agents fantômes repérés via journaux réseau, OAuth et SaaS sont régularisés sous cinq jours ouvrables ou désactivés E : EXIG-GOV-10 E : EXIG-GOV-16. Le parrain atteste l’agent tous les **12 mois** (**6 mois** en classe élevée), avec suspension trimestrielle des orphelins E : EXIG-GOV-13. Onze déclencheurs (quinze cas) imposent une réévaluation E : EXIG-GOV-12 E : EXIG-GOV-18 E : EXIG-GOV-19 E : EXIG-GOV-20, et le retrait exige un **préavis** `≥ 60 jours` E : EXIG-GOV-14. Les dérogations écrites restent bornées à **6 mois** renouvelables une fois (**90 jours** par l’AE en classe faible), hors E : EXIG-GOV-17 E : EXIG-GOV-15 E : EXIG-GOV-16. Enfin, contre l’**atrophie de la relève junior** (`~20 %` chez les 22–25 ans, `PD28 M-26`, `SIG-017`), des quotas de dossiers formateurs préservent la révision `Loi 25 art. 12.1` et la reprise manuelle P : CAP-048.

| Instance ou rôle | Ligne | Responsabilité exclusive (`RACI` à un seul `A`) | Contrôle système associé |
| --- | --- | --- | --- |
| Parrain métier nommé (`RH`) | 1re (métier) | Imputable `A` de la finalité, du budget `CPO` et de l’attestation `6 / 12 mois` | Suspension trimestrielle automatique si poste vacant E : EXIG-GOV-13 |
| Équipe plateforme centrale | 1re (socle) | Exploitation des passerelles, du registre à 7 états et des gabarits conformes (`DEVRAIT`) | Rejet réseau hors registre E : EXIG-GOV-05 E : EXIG-GOV-06 E : EXIG-GOV-08 |
| Risque modèle, séc., RPRP | 2e ligne | Validation indépendante (`E-23`, ÉFVP), plafonds d’autonomie et coupe-circuit | Séparation stricte construction / homologation E : EXIG-GOV-03 |
| Audit interne | 3e ligne | Vérification périodique de bout en bout des preuves, dérogations et signaux | Accès autonome lecture seule aux journaux et bancs P : CAP-050 |

### 11.2 Usine logicielle interne : Oracle vs Bâtisseur, `WAP`, `SRE` et distillation

L’usage d’agents en développement, modernisation ou exploitation (`C27 ch. 47`, `C26 ch. 47`, `BSIF B-13 § 2.5.2`) obéit à une règle unique (`ADR-029` à `ADR-031`, sous la réserve empirique de `C27 § 47.1`). **L’agent qui produit un artefact ne définit jamais son oracle d’acceptation et ne publie jamais seul en production** P : CAP-052. Quatre chantiers d’ingénierie en découlent :

1. **Code et modernisation patrimoniale.** Les dépôts et permissions séparent techniquement l’agent **Oracle** (invariants et jeux d’essai) et l’agent **Bâtisseur**, sous porte d’analyse statique du code généré et intégrité d’artefacts E : EXIG-SEC-17 E : EXIG-SEC-18 et revue humaine. Le code existant est exposé par graphes syntaxiques et sémantiques (`AST` et `SCIP`, *SCIP Code Intelligence Protocol*) ; les tests générés (~50 % de faux positifs à filtrer) sont qualifiés par un score de **mutation** `≥ 85 %` `[S]`, puis toute réécriture patrimoniale subit un `Shadow Mirroring` **de** `30 jours` `[S]` à zéro écart décimal (cibles de conception sans appui empirique) avant bascule P : POR-008.
2. **Exploitation des flux de données (*DataOps*).** Les pipelines analytiques appliquent des contrats formels `ODCS v3` selon le patron `Write-Audit-Publish` **(**`WAP`**)** : écriture sur branche isolée, contrôle automatique d’intégrité et de dérive, et mise en quarantaine immédiate de tout lot hors bornes avant qu’un agent ou index ne puisse le lire E : EXIG-INT-12 E : EXIG-INT-19 P : CAP-020 P : DEC-010 P : POR-005.
3. **Exploitation** `SRE` **sans interpréteur libre.** Les journaux bruts contenant des chaînes propices à l’injection indirecte (`C27 ch. 47`), le diagnostic s’effectue en lecture seule sur flux assainis et la remédiation n’exécute que des procédures pré-signées et bornées, avec **interdiction absolue de tout interpréteur de commandes libre (*shell*) en production** (`ADR-030`) P : DEC-010.
4. **Distillation `LLM → SLM` sous sas de purge des `RP`.** Conditionnée aux signaux économiques ou énergétiques (`SIG-015`, `SIG-016`, `ADR-031`) P : CAP-034 P : INI-028, la distillation vers de petits modèles spécialisés traverse un **sas irréversible de purge des renseignements personnels (`RP`)** validé par jetons témoins (*canaris* d’extraction, `Loi 25` E : EXIG-CON-10), une porte de parité `pass^5 ≥ 99 %` `[S]` (cible sans appui empirique) et une sentinelle continue de dérive.

### 11.3 Approvisionnement réversible et dix clauses contractuelles (`EXIG-APP-07..16`)

Face aux plateformes commerciales fermées sur leur plan de contrôle, `CAD26 ch. 13` impose une grille éliminatoire conservée au registre et rejouée à chaque renouvellement E : EXIG-APP-17 P : CAP-051. Elle exige le chiffrage du coût de sortie E : EXIG-APP-01, le refus des extensions verrouillantes E : EXIG-APP-02 et les preuves `MCP`/`A2A` E : EXIG-APP-03. Elle impose aussi des mesures sur les cas de l’acheteur E : EXIG-APP-04, l’export ouvert des traces et coûts E : EXIG-APP-05 et la maîtrise des identités et de l’arrêt E : EXIG-APP-06. Tout contrat intègre ensuite les **dix clauses** `EXIG-APP-07` **à** `EXIG-APP-16` P : INI-014, vérifiées par un exercice annuel d’extraction P : POR-016 :

| Exigence | Objet contractuel obligatoire (`CAD26 § 13.3`) | Risque paré / ancrage |
| --- | --- | --- |
| `EXIG-APP-07` | Interopérabilité `MCP`/`A2A` et portabilité sans frais des cartes, schémas et définitions | Enfermement syntaxique |
| `EXIG-APP-08` | Prise en charge de la délégation d’identité sans secret statique partagé | Délégué confus et clés fixes |
| `EXIG-APP-09` | Export sans surcoût des traces `OpenTelemetry`, coûts `FOCUS` et facteurs d’explicabilité | Opacité `art. 12.1` / `E-23` |
| `EXIG-APP-10` | Usage limité au mandat ; **interdiction d’entraîner ou d’ajuster** sur données, invites ou traces | Fuite de patrimoine cognitif |
| `EXIG-APP-11` | Lieux de résidence garantis, encadrement `Loi 25 art. 17` et divulgation des lois étrangères | Accès extraterritorial |
| `EXIG-APP-12` | Notification d’incident alignée sur le délai réglementaire le plus strict (`BSIF`, `Loi 25`, `RIA`) | Retard de déclaration E : EXIG-CON-25 |
| `EXIG-APP-13` | Droit d’audit (`BSIF B-10`), `SBOM` et **préavis écrit** avant retrait ou modification d’un modèle | Rupture silencieuse de modèle |
| `EXIG-APP-14` | Plan de sortie assisté sans pénalité prohibée (`Data Act` D `ANC-003`), formats ouverts, destruction attestée | Coût de sortie prohibitif (`POR-016`) |
| `EXIG-APP-15` | Accord écrit au sens de l’**article** `25(4)` **du** `RIA` **européen** répartissant rôles et assistance | Requalification en fournisseur E : EXIG-CON-15 |
| `EXIG-APP-16` | Révocation immédiate des `NHI` et arrêt d’urgence actionnables directement par l’institution | Perte du coupe-circuit |

Contrat opérationnel croisé — Architecte d’entreprise (AE) | Architecte de solutions (AS)

Décisions AE

1. Instaurer le modèle en étoile à trois lignes E : EXIG-GOV-01 E : EXIG-GOV-05 P : CAP-050 : un seul `A` nommé par décision E : EXIG-GOV-04, séparation construction / validation E : EXIG-GOV-03, attestation parrain `6 / 12 mois` E : EXIG-GOV-13, quotas formateurs pour la relève junior P : CAP-048 et retrait sous préavis `≥ 60 jours` E : EXIG-GOV-14.
2. Rendre éliminatoires la grille préalable E : EXIG-APP-01 E : EXIG-APP-17 et les dix clauses `EXIG-APP-07` à `EXIG-APP-16` P : INI-014, vérifiées par un essai annuel de sortie P : POR-016.
3. Subordonner toute distillation interne aux signaux économiques ou énergétiques (`SIG-015`, `SIG-016`) C : tous ; SIG-015, SIG-016 et à un sas certifié de purge des `RP` P : CAP-034 P : INI-028.

Spécifications AS

1. Publier des gabarits d’agents conformes par construction E : EXIG-GOV-06 (`DEVRAIT`) raccordés au registre à sept états, au blocage réseau des agents non inscrits E : EXIG-GOV-08 E : EXIG-GOV-10 et aux onze déclencheurs (quinze cas) de réévaluation E : EXIG-GOV-12.
2. Cloisonner dans la chaîne CI/CD les droits de l’agent Oracle et de l’agent Bâtisseur (`ADR-029`, index `AST`/`SCIP`) P : CAP-052, déployer `Write-Audit-Publish` sous contrats `ODCS v3` P : CAP-020 et proscrire tout interpréteur libre en exploitation `SRE` P : DEC-010.
3. Exiger en modernisation et distillation un score de mutation `≥ 85 %` `[S]`, un `Shadow Mirroring` de `30 jours` `[S]` sans écart décimal P : POR-008 et une constance `pass^5 ≥ 99 %` `[S]` après sas de purge des `RP` à jetons témoins.

### 11.4 Grille de décision

| Décision | Option par défaut | Quand s’en écarter | Preuve |
| --- | --- | --- | --- |
| Organisation entre plateforme centrale et domaines métiers | Modèle en étoile à trois lignes, un seul `A` nommé et séparation stricte construction / homologation E : EXIG-GOV-03 E : EXIG-GOV-04 E : EXIG-GOV-05 | Jamais sur la séparation des fonctions ni sur l’inscription au registre avec parrain actif E : EXIG-GOV-17 | `[N]` `BSIF E-23` (`ANC-103`), `B-13 § 2.5.2` ; `CAD26 ch. 11` |
| Agent dont le parrain quitte son poste ou omet l’attestation périodique | Passage automatique à `suspendu` lors de la revue trimestrielle et révocation des justificatifs E : EXIG-GOV-13 | Réaffectation formelle au registre vers un suppléant habilité avant l’échéance de 6 ou 12 mois | `[É]` `CAD26 § 11.5, EXIG-IAM-07` ; `PD28 POR-015` |
| Usage d’agents de génération de code et de refonte patrimoniale | Séparation technique des dépôts Oracle (tests) et Bâtisseur (code), revue humaine et parité en miroir (`ADR-029`) P : CAP-052 | Jamais d’auto-approbation de demande de tirage ni d’écriture du bâtisseur dans les jeux d’essai | `[N]` `BSIF B-13 § 2.5.2` ; `C27 ch. 47` (`≥ 85 %` `[S]`, `30 jours` `[S]`) |
| Remédiation assistée par agent (`SRE`) sur incident de production | Lecture seule sur journaux assainis et exécution exclusive de procédures pré-signées sans interpréteur libre P : DEC-010 | Jamais d’interpréteur ouvert en production ; toute action hors catalogue bascule à l’astreinte humaine | `[M]` `[É]` `[S]` Injection par les journaux (`C27 § 47.6`) ; `ADR-030` |
| Contractualisation d’une plateforme ou d’un logiciel-service agentique | Grille préalable et insertion des dix clauses `EXIG-APP-07` à `EXIG-APP-16` (non-entraînement, export, arrêt, sortie) E : EXIG-APP-17 | Dérogation écrite (`≤ 6 mois`) sur un critère technique mineur compensé à la passerelle, jamais sur l’arrêt E : EXIG-GOV-17 | `[N]` `BSIF B-10`, `Loi 25 art. 17`, `RIA art. 25(4)`, `Data Act` (`ANC-003`) |
| Distillation interne de grands modèles vers de petits modèles spécialisés | Option conditionnelle activée sur signal `SIG-015` ou `SIG-016` derrière un sas irréversible de purge des `RP` P : INI-028 | Flux répétitif à fort volume dégradant le `CPO` sur deux trimestres (`pass^5 ≥ 99 %` `[S]`) | `[S]` `C27 § 47.8, § 47.20` ; `PD28 CAP-034`, `ADR-031` |

### 11.5 Limites et renvois

Trois réserves méthodologiques encadrent ce chapitre. Premièrement, les seuils de `C27 ch. 47` — mutation `≥ 85 %`, `Shadow Mirroring` de `30 jours` et `pass^5 ≥ 99 %` — sont des **cibles sans appui empirique (**`[S]`**)**, tout chiffrage fictif du *Groupe Boréal Inc.* (`C27 § 0.5`) étant exclu. Deuxièmement, trois séries de coquilles de `CAD26` v1.1 sont corrigées : `EXIG-APP-18` fantôme p. 32, `EXIG-APP-12` au lieu d’`EXIG-APP-17` p. 233, et `EXIG-ARC-02` au lieu d’`EXIG-ARC-21` pp. 195–257. Troisièmement, les gains du développement assisté restent sensibles à la dette de revue humaine (`C27 § 47.1`). Renvois : `C26` ch. 24 (pp. 277–300), ch. 36 (pp. 415–424), ch. 39 (pp. 451–462), ch. 41 (pp. 472–479), ch. 47 (pp. 534–544), `CAD26` ch. 11 (pp. 190–205), ch. 13 (pp. 233–242), `C27` ch. 39 (pp. 783–792), ch. 41 (pp. 817–839), ch. 47 (pp. 950–995), `PD28` `M-24` (pp. 301–309), `M-26` (pp. 322–327) et `Annexes B–C`.

## Chapitre 12 — Homologation unifiée et trajectoire adaptative (90 jours → 18 mois → Paliers P1–P3) sous signaux

> **Ancrage corpus (état de référence : 17 novembre 2026) :** `[C26 ch. 46, ch. 50]` · `[CAD26 ch. 14, ch. 15, Annexe A | EXIG-GOV-16..20]` · `[C27 ch. 43, Annexe F, Annexe G]` · `[PD28 M-19–M-26 | INI-001..029, INI-041..054, POR-001..009, POR-011..016, SIG-001..017, SIG-101..110]`.

*Question directrice : Comment franchir le cap immédiat des 90 jours à 18 mois tout en orchestrant une trajectoire adaptative 2028–2035 gouvernée par preuves, portes et signaux de bascule ?*

**Thèse du chapitre :** Une feuille de route agentique échoue soit par précipitation sans preuves, soit par lourdeur incitant au contournement P : PRI-001 P : PRI-006. Ce chapitre soude trois instruments complémentaires. Premièrement, la porte d’homologation (`Annexe C`) unifie les `305 EXIG-*` (`CAD26 Annexe A` v1.2), les dix interdits `EXIG-GOV-17` et les 75 points `PRR` (`C27 Annexe G`). Deuxièmement, la continuité **90 jours → 18 mois** (`Niveau 3` / `Stade 2`) débouche sur les **paliers `DAPP` (`P1`–`P3`, 43 initiatives, 15 portes `POR`)**. Troisièmement, **27 signaux** `SIG` imposent une décision sous 30 jours pour parer les sept échecs de `PD28 M-26` P : INI-051 P : INI-052 P : POR-015 P : POR-016.

### 12.1 Porte unique d’homologation : fusionner `CAD26 Annexe A` et la grille `PRR`

Séparer `CAD26 Annexe A` et la grille `PRR` (`C27 Annexe G`) dupliquerait l’instruction d’homologation. Générée depuis `homologation.json`, l’`Annexe C` les fusionne en **sept domaines** (`A.2` Gouvernance et registre à `A.8` Données, vie privée et conformité) et **41 rubriques**. Cette grille aligne **305** `EXIG-*`, **15 portes** `POR` et **75 points** `PRR` (`G.1` sécurité/`NHI`, `G.2` résilience/sagas, `G.3` observabilité/`FinOps`, `G.4` gouvernance/droit, `G.5` fédération/souveraineté/usine). Les 75 points `PRR` se ventilent en **24** `[BLOQUANT]` en `N3`/`N4` [`L3`/`L4`] recalibrés `W1.3`, **26** `Conditionnel` et **25** `Élevée`/`Moyenne`.

Deux invariants gouvernent cette porte (`CAD26 ch. 11, Annexe A`). D’abord, chaque contrôle s’exige dès l’exercice effectif de la capacité sur **preuves système vérifiables** au manifeste CI/CD, jamais sur auto-déclaration. Ce manifeste YAML (`C27 Annexe F.4`, sans champ fictif) porte le plafond d’autonomie, le parrain, le budget `CPO`, le seuil `pass^k` et le coupe-circuit. Ensuite, nulle dérogation (`≤ 6 mois` renouvelable une fois, ou `≤ 90 jours` par l’AE en classe faible) ne franchit les **dix interdictions sans dérogation** (`CAD26 p. 200` E : EXIG-GOV-17) :

1. autonomie `NX` (E : EXIG-AUT-03) ;
2. action `P3` sans approbation humaine hors bande E : EXIG-AUT-09 ;
3. usurpation d’identité au lieu de délégation (`CAD26 § 9.3` E : EXIG-IAM-09) ;
4. relais d’un jeton reçu E : EXIG-IAM-12 ;
5. agent sans fiche complète ni parrain nommé, hormis la fiche minimale d’un existant inventorié E : EXIG-GOV-16 ;
6. dépassement du plafond d’autonomie de la classe E : EXIG-CON-02 ;
7. autorisation au-delà de `N2` sous les seuils de la règle d’or E : EXIG-AUT-07 ;
8. exposition simultanée à du contenu non fiable, des systèmes sensibles ou données privées et un canal d’envoi sans retrait E : EXIG-SEC-06 ;
9. exploitation sans journal d’audit E : EXIG-OBS-11 ;
10. manquement légal ou réglementaire (`CAD26 Annexe A`).

### 12.2 De la rampe `90 jours → 18 mois` aux trois paliers adaptatifs `DAPP` (`2028–2035`)

> **[Figure]**
> - Trajectoire adaptative 2026–2035 : paliers P1–P3, 15 POR & jalons Franchissement sur preuves (27 SIG) · séparation privé vs secteur public
> - 2026 ’27 2028 ’29 2030 ’31 2032 ’33 2034 2035
> - Paliers
> - DAPP
> - (43 INI)
> - 15 portes
> - POR &
> - 27 SIG
> - Secteur
> - financier
> - privé &
> - PKI TLS
> - Secteur
> - public
> - (adm.
> - pub.)
> - 90 j–18 m
> - J1 → J3
> - PEP, MCP
> - P1 Fonder
> - Stade 2
> - 14 s.r.+15
> - P2 Étendre
> - Stade 3
> - 9 s.r.+7 c.
> - P3 Élargir
> - St. 3/4\*
> - 4 s.r.+6 c.
> - J1 → J3
> - 90 j, 18 m
> - POR-001..004
> - NHI, <10 s [S]
> - POR-005..009
> - PQC 007, 99,5 %
> - POR-011..014
> - PQC, vLEI 3 v.
> - Continu P1–P3 : POR-015 repli < 60 s · POR-016 CPO & SIG ≤ 30 j
> - [D] 2027-05-01 BSIF E-23 (ANC-103) · AMF IA (ANC-112)
> - [D] 2027-03-15 TLS 100 j
> - [D] 2027-12-02 RIA Ann. III (UE)
> - [D] oct. 2028 NI 31-103 · fin 2028 B-15
> - [D] 2029-03-15 TLS 47 j
> - [A] 2030–2035 PQC G7 fin. (NIST)
> - [D] 2033-06-30 Lois fin.
> - [D] 2027–28 AMOPS & EO 14412 (ANC-033, adm. pub.)
> - [D] 2027–33 Réexamens UE (adm. pub.)
> - [D] 2030–35 OMB M-26-15 & SCT (adm. pub.)
> - [D] Adopté · [A] Annoncé · (adm. pub.) Secteur public seul · \*Stade 4 exclu D2/D6.

*Fig. 8. – Frise chronologique et trajectoire adaptative 2026–2035 : rampe tactique 90 jours à 18 mois, paliers DAPP P1 à P3 (43 initiatives), 15 portes POR sur preuve système, 27 signaux SIG et séparation entre institutions financières privées et administrations publiques.*

La rampe immédiate (`CAD26 ch. 14–15`, `C26 ch. 46`) et les parcours adaptatifs dynamiques (`DAPP`, Haasnoot et al., `PD28 M-19–M-24`) se soudent autour du `Stade 2` (*Usage encadré*). Ce palier équivaut au **Niveau 3 « Défini »** sur les cinq dimensions de `CAD26 Tableau 55`.

**Rampe tactique** `0 → 18 mois` **(**`Jalons J1 à J3`**).** Les **90 premiers jours** (`~13 semaines (~65 jours ouvrables)`, *Fondations*, plafond `N0–N1`, jalon `J1`) posent le socle. Ils installent le comité et le RPRP, inventorient les existants et agents fantômes (fiche minimale et parrain sous cinq jours ouvrables sinon arrêt E : EXIG-GOV-16), suppriment les clés partagées, déploient la passerelle de modèles et le traçage sans contenu, lancent l’ÉFVP (`Loi 25 art. 3.3`) et testent le coupe-circuit. Les **mois 3 à 9** (*Plateforme*, jalon `J2`) ouvrent `N2` et les premiers `N3` intra-domaine faible ou modéré. Ils déploient la passerelle d’agents (`P0–P3`), le canal de compensation et `JCS`/`CIBA` face aux butées 2027 : TLS **100 jours au 15 mars 2027** D `ANC-023`, veille `MCP SEP-3398` du **30 mars 2027** A, convergence au **1er mai 2027** D de `BSIF E-23` (`ANC-103`) et d’`AMF IA` (`C26 Annexe N.3`), et migration `MCP 2026-07-28` au plus tard le **28 juillet 2027** D E : EXIG-MCP-22. Les **mois 9 à 18** (*Industrialisation*, `N3` interdomaines via passerelle) franchissent `J2a` (1er novembre 2027) avant l’**Annexe III du** `RIA` **le 2 décembre 2027** D `ANC-007`. Ils industrialisent `E1–E3`, les sagas et les bacs à sable matériels pour atteindre à 18 mois (`J3`) le **Niveau 3 (« Défini »)**. `CAD26 § 14.3` précise qu’`ISO/IEC 42001` (`J5`) ne couvre que la dimension Gouvernance et non les quatre dimensions techniques.

**Portefeuille** `DAPP` `2028–2035` **C : tous ; SIG-009, SIG-108 (**`43 INI` **=** `29` **sans regret +** `14` **conditionnelles ;** `15 POR`**).** Au-delà de 18 mois, `PD28` structure **43 initiatives** (`INI-001` à `INI-029` et `INI-041` à `INI-054`) et **15 portes sur preuves** (`POR-001` à `POR-009` et `POR-011` à `POR-016`), avec zéro avancement au seul calendrier :

- **Palier 1 (`2028–2029`, sortie `Stade 2`) : `14` sans regret (`INI-001` à `INI-014`) + `1` conditionnelle (`INI-015`).** Il consolide registre et rejet réseau (`INI-001`), `NHI`/`RFC 8693` (`INI-002`), passerelle/épinglage (`INI-003`), politiques/coupe-circuit (`INI-004`), double couloir `OpenTelemetry` (`INI-005`), six substrats (`INI-006`) et inférence/bacs à sable (`INI-007`). Il y adjoint sagas durables (`INI-008`), postes `JCS`/`CIBA` et `art. 12.1` (`INI-009`), contexte compilé (`INI-010`), adaptateurs `Decimal` (`INI-011`), bancs `pass^k` (`INI-012`), empreinte/`CPO` (`INI-013`) et clauses `EXIG-APP` (`INI-014`), tandis qu’`INI-015` confine puis éteint sous douze mois les `CUA` (`[B, C]`). S’y calent la fin des rétrofacturations `NI 31-103` (`2028-10-01` D `ANC-105`), la portée 3 `BSIF B-15` (`fin 2028` D `ANC-106`) et **TLS 47 jours au 15 mars 2029** D `ANC-030`. Quatre portes le valident : `POR-001` (inventaire/`NHI` 100 %), `POR-002` (six substrats/révocation clé/zéro `RP`), `POR-003` (2e ligne et arrêt `< 10 s` `[S]` de `PRR S-14` vs `15 min` `CAD26` E : EXIG-IAM-20 E : EXIG-SEC-26) et `POR-004` (*showback* `CPO` et sortie).
- **Palier 2 (`2030–2032`, sortie `Stade 3`) : `9` sans regret (`INI-016` à `INI-024`) + `7` conditionnelles (`INI-025` à `INI-029`, `INI-053`, `INI-054`).** Le socle ouvre couche sémantique (`INI-016`), mémoire bi-temporelle/`WAP` (`INI-017`), topologies bornées (`INI-018`), PQC hybride (`INI-019`), continuité bimodèle à poids ouverts (`INI-020`), partage financier ouvert (`INI-021`), *chargeback*/budgets d’erreur (`INI-022`), suivi carbone (`INI-023`) et modernisation en miroir (`INI-024`). Les sept options couvrent fédération par gravité (`INI-025`), vocal temps réel (`INI-026`), enclaves `TEE` (`INI-027`), distillation sous sas (`INI-028`), sas déconnecté (`INI-029`), sortie fournisseur critique (`INI-053`) et bascule accélérée PQC/réglementaire (`INI-054`). Ce palier se cale sur la fenêtre financière `G7` PQC `2030–2032` A `ANC-040` (`PD28 M-5`). Les butées `2030–2031` D (`ANC-035, ANC-036, ANC-038, ANC-039`) d’`OMB M-26-15`, `EO 14412` et `AMOPS` visent uniquement les administrations publiques. Cinq portes le clôturent : `POR-005` (sémantique/WAP), `POR-006` (anti-boucle/bascule bimodèle), `POR-007` (`ACME` 47 j, jetons PQC par `kid`, archives 5/7 ans), `POR-008` (API ouvertes `≥ 99,5 %`/zéro CUA, `30 j` `[S]` en miroir) et `POR-009` (*chargeback*, portée 3, reprise manuelle).
- **Palier 3 (`2033–2035`, `Stade 3` et `Stade 4` sélectif hors `D2` et `D6` interne `M-12`) : `4` sans regret (`INI-041` à `INI-044`) + `6` conditionnelles (`INI-045` à `INI-050`).** Il s’inscrit après la **temporisation fédérale du 30 juin 2033** D `ANC-109, ANC-110, ANC-111` et vers l’horizon financier `G7` PQC **2035** A `ANC-043` (`PD28 M-22`, distinct des échéances `2035` D `ANC-041, ANC-042` propres aux administrations publiques) C : A, B, C ; SIG-009, SIG-108. Le socle achève le PQC natif (`INI-041`), la conformité post-2033 (`INI-042`), l’élargissement sélectif `Classes 3 et 5` (`INI-043`) et l’extinction transitoire (`INI-044`). Les six options portent sur les canaux externes (`INI-045`), les cellules Diplomate/Évaluateur (`INI-046`), `vLEI` (`INI-047`), les espaces de données (`INI-048`), la souveraineté `SLM+TEE` (`INI-049`) et la résilience territoriale (`INI-050`). Quatre portes le valident : `POR-011` (PQC natif 100 %), `POR-012` (conformité post-2033 et zéro fuite inter-filiales), `POR-013` (`Stade 4` sous `vLEI` et rapprochement tripartite) et `POR-014` (constance 4 trimestres et reprise manuelle).
- **Continu (`P1–P3`) : `2` sans regret transversales (`INI-051`, `INI-052` ; total sans regret `14 + 9 + 4 + 2 = 29`) et `2` portes permanentes (`POR-015`, `POR-016`).** `INI-051` pilote les délais `DAPP` et `INI-052` l’arbitrage trimestriel. `POR-015` garantit la rétrogradation automatique en `< 60 secondes`, avec réouverture sous double signature 1re/2e lignes. `POR-016` impose la revue `CPO`, le déclassement après deux trimestres déficitaires et l’essai annuel de sortie et de repli bimodèle.

| Segment | Horizon | Initiatives (`29` s.r. + `14` cond. = `43`) | Portes / jalons exigibles | Cible de sortie |
| --- | --- | --- | --- | --- |
| **Rampe tactique** | `90 j → 18 mois` | Existants inventoriés `EXIG-GOV-16`, `MCP 2026-07-28`, `E-23`/`AMF IA`, `RIA Ann. III` | Jalons `J1` (90 j), `J2` (9 m), `J2a`/`J3` (18 m) | Niveau 3 « Défini » (`CAD26`) |
| **Palier 1 (**`P1`**)** | `2028–2029` | `14` s.r. (`INI-001` à `014`) + `1` cond. (`INI-015` `CUA`) | `POR-001` à `POR-004` (`POR-002` 6 substrats, `POR-003` `< 10 s` `[S]` vs `15 min` `CAD26`) | `Stade 2` généralisé |
| **Palier 2 (**`P2`**)** | `2030–2032` A | `9` s.r. (`INI-016` à `024`) + `7` cond. (`INI-025` à `029`, `053`, `054`) (`ANC-040`) | `POR-005` à `POR-009` (`POR-007` PQC, `POR-008` API `≥ 99,5 %`) | `Stade 3` maîtrisé |
| **Palier 3 (**`P3`**)** | `2033–2035` D / A | `4` s.r. (`INI-041` à `044`) + `6` cond. (`INI-045` à `050`) (`ANC-109`, `ANC-043`) | `POR-011` à `POR-014` (`POR-012` post-2033, `POR-013` `vLEI` 3 voies) | `Stade 3` / `Stade 4` sélectif |
| **Continu** | `P1–P3` | `2` transversales sans regret (`INI-051`, `INI-052`) | `POR-015` (`< 60 s`) et `POR-016` (`CPO` / sortie) | Réversibilité permanente |

### 12.3 Les `27` signaux `SIG` et les parades aux sept modes d’échec endogènes (`M-26`)

Sous revalidation primaire à fenêtre de 30 jours (`C26 ch. 50`, `CAD26 EXIG-GOV-18, EXIG-GOV-20`), `PD28 M-25` suit **27 signaux** opérés par l’observatoire `2028-2035/Master/outils/veille_signaux.py` (HTTPS ouvert sans contournement `403`, couplé à `verifie.py --audit-fraicheur` et `--horodater` sur `derniere_verification_veille`, jalons `2027-05-01`, `2027-08-02`, `2027-12-02`, `2028-10-01` et `2029-03-15`, consacrés dans `CRE-IA-2027` **v2.0**) en quatre familles :

- **10 signaux réglementaires :** `SIG-001` Annexe III `RIA`, `SIG-002` `DORA`, `SIG-101` bulletin `BSIF`, `SIG-102` `AMF IA`, `SIG-103` `LSAC`, `SIG-105` `ACVM`/`OCRI`, `SIG-106` jurisprudence `Loi 25 art. 12.1`, `SIG-107` `LPRPDE`, `SIG-108` temporisation du 30 juin 2033 D `ANC-109` et `SIG-109` `BSIF B-15`.
- **8 signaux normatifs et rails :** `SIG-003` RFC `WIMSE`/`Transaction Tokens`, `SIG-004` `DAWN`/`AGENTPROTO`, `SIG-005` `MCP`, `SIG-006` `OpenTelemetry gen_ai.*` `Stable`, `SIG-007` `vLEI` paiements, `SIG-008` `SC 42`, `SIG-104` `RTR` `pacs.008` et `SIG-110` `FDX`/`ACORD`/`CSIO`.
- **4 signaux post-quantiques et PKI :** `SIG-009` reprise prudentielle `G7` PQC, `SIG-010` bascule `SLH-DSA`, `SIG-011` `FIPS 140-3` sur `RFC 9964/10024/10073` et `SIG-012` incidents TLS `100 j`/`47 j`.

- **5 signaux sur capacités, économie, énergie et relève :** `SIG-013` banc `> 95 %` sur `> 2 h`, `SIG-014` échecs multiagents, `SIG-015` dérive `CPO`, `SIG-016` tension électrique vers `1 700 TWh` en 2035 C : B, C ; SIG-016 et `SIG-017` érosion junior.

Ce système pare les **sept modes d’échec endogènes** de `PD28 M-26` :

1. *Sur-ingénierie suscitant des agents fantômes* → couloir rapide réservé à la `Classe 1` sans écriture par gabarits E : EXIG-GOV-06 (`DEVRAIT`, sans exemption de catégorie) et rejet hors passerelle P : CAP-022 P : CAP-047.
2. *Saturation de la 2e ligne* `E-23` → proportionnalité par classe et qualification automatisée P : CAP-043.
3. *Atrophie des juniors (*`-20 %`*) et approbation réflexe* (`SIG-106`, `SIG-017`) → quotas formateurs, cas témoins et gel d’autonomie.
4. *Choc tarifaire et enfermement* (`SIG-015`) → bascule bimodèle annuelle P : CAP-031 et `POR-016`.
5. *Collision* `PKI 47 j` */* `ML-DSA` *(*`HTTP 431`*)* (`SIG-011`, `SIG-012`) → gel d’ouverture externe en `P2` sans `ACME` et référence `kid` P : POR-007.
6. *Fuite intra-groupe* (`SIG-108`) → rejet hors modèle sans entité mandante, consentement exprès et contrat `B-10`.
7. *Veille décorative et coûts irrécupérables* → **décision budgétaire sous 30 jours après franchissement d’un seuil** `SIG-*`, auditée chaque année par la 3e ligne avec veto de la 2e ligne.

**Calibration artificielle FEDS des cinq seuils** `[S]` **et modélisation EMA (**`DC-P12`**).** En **évaluation exclusivement artificielle FEDS** (`DC-P12`, aucune étude de cas humaine), le banc reproductible `Borealis-Bench/feds-ema/` (`seed = 20261119`, ancré sur *Borealis-Bench*) calibre les cinq seuils `[S]` (`4 000` tirages Monte Carlo/seuil) : `POR-003 < 10 s` `[S]` confirmé avec garde-fou (`p99 = 3 732,68 ms`, conformité `99,95 %`, bail local fail-closed `TTL <= 5 s` contre partition `11 034,19 ms`) ; `<= 15` outils/agent `[S]` ajusté par autonomie (`63,85 %` conformes au risque `<= 2 %` → `<= 15` en `L1/L2`, resserrer à `<= 10–12` en `L3/L4`) ; escalade CIBA/HITL `< 60 s` `[S]` dissociée (`< 5 s` technique `96,78 %` + `60 s` SLA alerte / `120–180 s` TTL fail-closed, bout-en-bout `p95 = 66,72 s`) ; rétention chaude `30 j` `[S]` portée en cible à `45 j` banque/assurance (`97,17 %` nom. vs `89,10 %` panne sévère, surcoût `SCITT + SLH-DSA` de `22,48 Mo` / `3 M` événements) ; et `pass^5 >= 99 %` `[S]` dissocié par couche (plan de contrôle `99,921 %` et multicouche `99,812 %` vs `CaMeL` isolé `78,79 %` → `>= 99 %` plan de contrôle / `L3/L4`, `>= 95 %` génératif `L1/L2`). En modélisation EMA (`3 000` réplications LHS), le **parcours** `B` **(*Archipel cible*)** domine en décision robuste (`92,53 %` de satisfaction conjointe, `95,70 %` des futurs gagnés, minimax regret `p95 = 0,000`), avec bascule conditionnelle vers `CAP-027/033/034/041` (`C`) au seuil empirique `X34 >= 0,386`.

Contrat opérationnel croisé — Architecte d’entreprise (AE) | Architecte de solutions (AS)

Décisions AE

1. Exécuter dès le jour 1 la rampe des 90 premiers jours (`N0–N1`, inventaire, `NHI`, passerelle modèles, coupe-circuit) vers le Niveau 3 / `Stade 2` à 18 mois. Réserver la transition aux seuls existants inventoriés E : EXIG-GOV-16 et traiter la `Classe 1` sans écriture par gabarits pré-homologués sans dérogation de catégorie (`CAD26 p. 33`).
2. Piloter la trajectoire 2028–2035 C : A, B, C ; SIG-009, SIG-108 par la preuve aux 15 portes `POR-001` à `POR-009` et `POR-011` à `POR-016` : 29 initiatives sans regret en socle et 14 conditionnelles déclenchées par les 27 signaux `SIG`.
3. Imposer une décision budgétaire sous 30 jours après tout franchissement d’un seuil `SIG-*` P : INI-051 P : INI-052, auditée annuellement par la 3e ligne sous droit de suspension de la 2e ligne.

Spécifications AS

1. Intégrer au pipeline CI/CD le manifeste d’homologation exécutable (`C27 Annexe F.4`) et la grille unifiée `Annexe C` (`305 EXIG-*` v1.2 + `75 PRR` dont `24` `[BLOQUANT]` en `N3`/`N4`), en verrouillant les dix interdictions non dérogeables E : EXIG-GOV-17.
2. Produire les preuves système des portes : arrêt coupe-circuit `< 10 s` `[S]` (`PRR S-14`, vs `15 min` `CAD26` E : EXIG-IAM-20 E : EXIG-SEC-26) et reprise de saga P : POR-003, rétrogradation automatique d’autonomie en `< 60 secondes` sur budget d’erreur P : POR-015, renouvellement `ACME` à 47 jours et scellement post-quantique P : POR-007.
3. Exécuter chaque année en conditions réelles la bascule vers le modèle indépendant à poids ouverts P : POR-006, l’extraction contractuelle hors fournisseur P : POR-016 et la reprise manuelle complète sans agent P : POR-009 P : POR-014.

### 12.4 Grille de décision

| Décision | Option par défaut | Quand s’en écarter | Preuve |
| --- | --- | --- | --- |
| Cadencement du contrôle durant la transition initiale | Régime transitoire réservé aux seuls existants inventoriés E : EXIG-GOV-16, gabarits pré-homologués pour la `Classe 1` sans écriture et rejet réseau hors passerelle P : CAP-022 | Aucune dérogation par catégorie entière (`CAD26 p. 33`) ; zéro tolérance sur les dix interdictions absolues E : EXIG-GOV-17 | `[N]` `[É]` `[S]` `BSIF E-23` (`ANC-103`) ; `CAD26 § 11.5–11.6, § 15.2` ; `PD28 M-26` |
| Passage d’un domaine d’affaires d’un palier au suivant | Franchissement constaté sur preuves système des portes `POR-*` par les 1re et 2e lignes selon le critère le plus faible | Jamais par simple échéance calendaire ; un domaine en retard demeure plafonné à son stade courant | `[N]` `[É]` `[S]` `BSIF E-23` ; `CAD26 ch. 14–15` ; `PD28 M-20–M-24` |
| Engagement des 14 initiatives conditionnelles (`CUA`, `TEE`, B2B, distillation) | Maintien en option différée avec réservation d’interfaces ouvertes tant que le signal `SIG-*` associé n’est pas franchi P : INI-051 | Ouverture anticipée d’un pilote borné si le délai incompressible de préparation d’une butée réglementaire approche | `[M]` Haasnoot et al. (`DAPP`, `PD28 M-23`) |
| Franchissement d’un seuil au registre des 27 signaux `SIG-*` | Instruction obligatoire en comité sous 30 jours avec réallocation tracée et droit de suspension de porte par la 2e ligne | Révision extraordinaire sous 15 jours ouvrables sur version incompatible, dépréciation, retrait accéléré ou correctif de sécurité E : EXIG-GOV-18 | `[S]` `CAD26 § 11.7` ; `PD28 M-25, M-26` |
| Portée reconnue à une certification externe `ISO/IEC 42001` | Revue externe de la seule dimension Gouvernance au jalon de maturité élevé (`CAD26 § 14.3`) | Ne dispense jamais de prouver les quatre dimensions techniques ni la conformité `Loi 25`, `E-23` et `RIA` | `[É]` `CAD26 § 12.5, § 14.3` ; `C27 § 35.4` |
| Maintien sur longue période de la capacité de continuité métier | Exercice annuel documenté de reprise manuelle sans agent, de bascule bimodèle et de sortie fournisseur (`POR-009, POR-014, POR-016`) | Jamais supprimé sur les filières critiques : condition de survie des mandats supervisés sur exception | `[N]` `[É]` `[S]` `BSIF E-21`, Banque du Canada `SAP 2026-22` ; `PD28 M-24, M-26` |

### 12.5 Limites et renvois

Quatre limites encadrent cette trajectoire. Premièrement, l’échelle `Stades 0–4` (`C27 § 43.1`, `PD28 M-12`) et les trois paliers demeurent analytiques sans étalonnage longitudinal bancaire. Aucun scénario `A`, `B` ou `C` ne reçoit de probabilité. Deuxièmement, `ISO/IEC 42001` reste au `statut F` (`CA-12`), la numérotation de `PD28` saute volontairement de `POR-009` à `POR-011` et d’`INI-029` à `INI-041` (`CA-05`), et `PD28 M-26` diverge entre « six modes » en prose (`§ 26.1`, p. 316) et `7` lignes au `Tableau 26.5` (`§ 26.5`, p. 319). Troisièmement, `AMOPS`, `EO 14412` et `OMB M-26-15` visent les seules administrations publiques et ne touchent les institutions financières privées que par effet fournisseur ou reprise prudentielle (`SIG-009`). Quatrièmement, conformément à `DC-P01`, l’ensemble de la chaîne demeure produit et vérifié par agents d’IA sans homologation humaine ; la clôture probatoire s’appuie sur l’`Annexe C` et la recollation `CA-16`. Renvois : `C26` ch. 46 (pp. 527–533), ch. 50 (pp. 576–585), `CAD26` ch. 14–15 (pp. 242–257), `Annexe A` (pp. 259–264), `C27` ch. 43 (pp. 854–872), `Annexes F–G` (pp. 1103–1114), `PD28` `M-19–M-26` (pp. 254–327) et `Annexes A–F` (présent mémoire).

# Annexes — Instruments de travail de l’architecte

Annexe A — Tables de concordance 2026-2035 et pont CAP/PEX vers EXIG-\*

Annexe B — Catalogue de poche des décisions d’architecture AE / AS

Annexe C — Grille unifiée d’homologation avant mise en production

Annexe D — Guide d’orientation vers les 2 541 pages sources et bibliographie maîtresse

Annexe E — Glossaire des sigles, acronymes et repères (`385` entrées)

Annexe F — Bibliographie primaire sélective (`70` normes, lois et études)

## Annexe A — Tables de concordance 2026-2035 et pont CAP/PEX vers EXIG-\*

Générée automatiquement depuis `registre/concordances.json` (synthèse tabulaire `justification_tableau` ; analyses complètes `justification_detaillee` intégralement préservées dans le registre JSON et consultables dans `Memoire/Presentation.html`). Socle unifié CRE-IA-2026-01 v1.2 (exigences.json) : 305 EXIG-\* (287 v1.1 + 12 EXIG-AMF issues de 2026/documents/Note AMF IA.pdf, CRE-IA-2026-01-QC, 41 attentes AMF-G/R/C/V/P + 6 PQC/ACVM/RTR/EN 18286 ; 255 DOIT, 34 NE DOIT PAS, 16 DEVRAIT).

### A.1 Passage entre les quatre découpages architecturaux (DIV-02 résorbée)

| Modèle pivot (5 couches + 3 volets) | CAD26 § 5.2–5.3 (6 vraies couches + 3 plans) | Écart DIV-02 corrigé | C26 ch. 43 | C27 § 0.1 | Rattachement CAP / EXIG |
| --- | --- | --- | --- | --- | --- |
| C1. interaction (canaux, approbation, transparence) | Couche 1 : Canaux et déclencheurs (zéro logique agent) | Intitulé exact CAD26 § 5.2 | Nulle couche UI (Tab. 43.1 [S]) ; Z2 → PC3 [S] en C3 | C5 Interaction humain-agent (§ 0.1) | CAP-001..006 ; EXIG-ARC-03, 04, EXIG-AUT-09, 12..16, 19..23 |
| C2. agents-orchestration (durable, sagas, A2A) | Couche 2 : Orchestration et état + volet Agents (C3) | Sépare Orchestration (C2) et Agents (C3) | C3 Orchestration (OO1–OO4, PC1–PC3, Z2 [S]), C1 A2A | C4 durable + C3 horizontale | CAP-007..014 ; EXIG-ARC-02, 05..07, 13, EXIG-INT-04, 05, 11, 22, EXIG-ORC-01..30, EXIG-A2A-01..15, EXIG-EVT-01..10, EXIG-AUT-17 |
| C3. contexte-connaissance (sémantique, mémoire CoALA) | Travail (C2), procédurale (C3), Couche 5 : Outils et données | Nulle C3 Connaissance (placée en C5) | Nulle couche dédiée (Tab. 43.1 [S]) ; ch. 2, Z5, PC4 [S] | C2 Sémantique, contexte, mémoire | CAP-015..021 ; EXIG-ARC-16, 22..25, EXIG-INT-01, 02, 12..16, 19 |
| C4. acces (passerelle PEP, patrimoine, OT) | C4 Médiation et connectivité, C5 Outils et données, C6 Systèmes d’enregistrement | C4 Médiation, C5 Outils, C6 Enregistrement | C4 Maillage (ch. 37), C1 MCP, Z4 [S] | C1 IT/OT + C3 fédération | CAP-022..028 ; EXIG-ARC-01, 11, 12, 14, 15, 17, 18, 21, EXIG-INT-03, 06, 07, EXIG-MCP-01..22 |
| C5. modeles (inférence, substrats, bacs) | Couche 3 : Agents et exécution cognitive (passerelle modèles, confinement) | Modèles et bacs en C3, non C6 | Nulle couche modèles/bacs (Tab. 43.1 [S]) ; PC5/Z5 [S] en C4 | Socle silicium, confinement, inférence | CAP-029..034 ; EXIG-ARC-08..10, EXIG-SEC-08..17 |
| Plan A. controle-identite-securite | Plan transversal A : Identité et sécurité (ch. 9) | Aligné sur CAD26 § 5.3 | C2 Identité/registre (fabrique) + C4 Maillage (PC5, Z5 [S]) | Pilier gauche Zero Trust, NHI | CAP-035..041 ; EXIG-IAM-01..21, EXIG-SEC-01..07, 18..28, EXIG-AUT-03, 08, 10, 11, EXIG-INT-21 |
| Plan B. controle-observabilite-finops | Plan transversal B : Observabilité, évaluation et FinOps (ch. 10) | Aligné sur CAD26 § 5.3 | C5 Exploitation — AgentOps (ch. 38–40 ; Z1, Z3/PC4 [S]) | Pilier droit AgentOps, FinOps | CAP-042..046 ; EXIG-OBS-01..13, EXIG-EVA-01..06, EXIG-FIN-01..10 |
| Plan C. controle-gouvernance-registre | Plan transversal C : Gouvernance et registre (ch. 11–13) | Aligné (volet dédié vs C27) | C6 Gouvernance (ch. 25–30), C2 registre, ch. 41 [S] | C6 gouvernance/B2B, deux piliers | CAP-047..052 ; EXIG-ARC-19..20, EXIG-AUT-01..07, 18, EXIG-INT-08..10, 17..23, GOV-01..20, CON-01..30, AMF-01..12, APP-01..17 |

**Note méthodologique —** A.1 ventile les 305 EXIG-\* v1.2 par ancrage CAD26 § 5.2–5.3 ; A.3 les rattache aux 52 CAP typées DC-P07 (couverture_directe, ancrage_extension, comble_lacune_2026), dont CAP-040 rattachée aux EXIG PQC (SEC-27/28), 4 extensions explicites (CAP-014, 027, 031, 034) et 5 lacunes 2026 (CAP-025, 028, 033, 046, 052).

### A.2 Concordance des échelles de maturité et des grilles d’autonomie

**Note méthodologique —** Pont analytique [S] : 0 modèle de maturité en C26 § 43.5 ; LCIM retient 5/7 niveaux (Tab. 7.1) et ISO 11354-1 FEI 3 approches (Intégrée, Unifiée, Fédérée, § 1.2.1).

| Stade (PD28 / C27) | Maturité 5×5 (CAD26 ch. 14) | LCIM / ISO 11354 FEI (C26) | Règle d’usage |
| --- | --- | --- | --- |
| Stade 0 : Sans agents [S] | Niveau 1 Initial (pré-agentique) | Technique/Syntaxique ; FEI Intégrée [S] | Référence N0 avant toute agentification |
| Stade 1 : Pilotes isolés [S] | Niveau 1 Initial → 2 Reproductible | Syntaxique ; FEI Intégrée/Unifiée [S] | Transitoire 90 j (plafond N0–N1, POR-001) |
| Stade 2 : Usage encadré [S] | Niveau 2 Reproductible → 3 Défini | Sémantique (Tab. 7.1) ; FEI Unifiée [S] | Seuil minimal production réglementée (POR-001..004) |
| Stade 3 : Orchestration prod. [S] | Niveau 4 Géré par mesures | Pragmatique (Tab. 7.1) ; FEI Unifiée [S] | Cible suffisante majorité D1–D8 (sortie P2) |
| Stade 4 : Inter-organisations [S] | Niveau 5 Optimisé fédéré | Dynamique (Tab. 7.1) ; FEI Fédérée [S] | Sélectif P3 (POR-013) ; proscrit D2, D6 = Stade 3 interne (M-12 vs 3–4 M-15/M-18) |

| Classe d’acte (PD28) | Niveau × Palier (CAD26 ch. 8) | C27 (L0–L4) | C26 (OO / Q) | Contrôle obligatoire |
| --- | --- | --- | --- | --- |
| Hors classe (flux fixe) | N0 Déterministe sans choix modèle | L0 déterministe | OO3 pur / code [S] | Tests logiciels et revue de code |
| Classe 1 : Lire et analyser | N1 Consultatif outils P0–P1 | L1 lecture filtrée | OO1/OO2, Q-A/Q-D [S] | Filtrage ACL amont, télémétrie sans contenu |
| Classe 2 : Réversible borné | N3 sous ODD (faible/modérée) ou N2, P2 | L3 borné / L2 | OO3/OO4 sous cadre [S] | Idempotence, compensation Saga, échantillonnage |
| Classe 3 : Matériel coûteux | N2 par défaut (N3 sous seuil), P2 | L2 (L3 restreint) | OO3/OO4, arrêt PC3 [S] | Approbation JCS SHA-256 par action élevée |
| Classe 4 : Irréversible critique | Outil P3 jamais seul (même N4) | L2 hors bande | OO3/OO4 (§ 31.1) [S] | CIBA + FIDO2 lié à h (≤ 15 min) |
| Classe 5 : Décision visant personne | Classe élevée plafonnée N2 (EXIG-CON-02) | L2/L3 art. 12.1 | OO3/OO4 (§ 29.4.1), Q-E [S] | Avis, facteurs, réexamen humain, dossier 1 an |
| Classe 6 : Hors mandat | NX interdit sans dérogation (EXIG-AUT-03, GOV-17) | Exclu L0–L4 | Violation PC4 / Z3 [S] | Blocage hors modèle et coupe-circuit immédiat |

### A.3 Pont condensé des 52 capacités cibles vers les exigences CAD26

| Capacité | Intitulé condensé | Type | Exigences CAD26 (`EXIG-*`) | Justification |
| --- | --- | --- | --- | --- |
| CAP-001 | Interfaces sur catalogues déclaratifs | Directe | EXIG-ARC-03, EXIG-MCP-04, EXIG-MCP-19 | Canaux sans logique agent ni script |
| CAP-002 | Supervision liée aux paramètres | Directe | EXIG-AUT-09, EXIG-AUT-12, EXIG-AUT-13, EXIG-AUT-14, EXIG-AUT-15, EXIG-AUT-16, EXIG-AUT-19, EXIG-AUT-20, EXIG-AUT-21 | JCS hors bande, écran fidèle, témoins |
| CAP-003 | Transparence client et révision | Directe | EXIG-AUT-22, EXIG-AUT-23, EXIG-CON-07, EXIG-CON-08, EXIG-CON-21, EXIG-AMF-12 | Avis, facteurs explicables, recours art. 12.1 et AMF-12 |
| CAP-004 | Interaction vocale et multimodale | Directe | EXIG-ARC-04, EXIG-CON-19 | Trace à l’entrée et divulgation |
| CAP-005 | Contrôle communications externes | Directe | EXIG-CON-20, EXIG-CON-22, EXIG-CON-28 | Marquage, revue juridique et anti-AI washing ACVM |
| CAP-006 | Encadrement agents externes entrants | Extension | EXIG-A2A-09, EXIG-IAM-01 | Extension agents entrants sur ancrage A2A-09/IAM-01 |
| CAP-007 | Enveloppe déterministe d’agents | Directe | EXIG-ARC-02, EXIG-ARC-07, EXIG-ORC-01, EXIG-ORC-03, EXIG-ORC-24, EXIG-ORC-26, EXIG-ORC-29 | Séquencement maître, mandant/trace/plafonds |
| CAP-008 | Exécution durable et revalidation | Directe | EXIG-ARC-05, EXIG-ARC-06, EXIG-ORC-11, EXIG-ORC-12, EXIG-ORC-13, EXIG-ORC-14, EXIG-ORC-27, EXIG-AUT-17 | Persistance chiffrée, réessais bornés, réveil |
| CAP-009 | Idempotence, sagas et tampon | Directe | EXIG-ORC-15, EXIG-ORC-16, EXIG-ORC-17, EXIG-ORC-18, EXIG-ORC-19, EXIG-ORC-21, EXIG-ORC-22, EXIG-CON-29 | Clé JCS SHA-256, sagas et tampon RTR ISO 20022 |
| CAP-010 | Topologies multiagents homologuées | Directe | EXIG-ORC-02, EXIG-ORC-04, EXIG-ORC-05, EXIG-ORC-06, EXIG-ORC-07, EXIG-ORC-09, EXIG-ORC-10 | Gain mesuré, deux sauts, boucles bornées |
| CAP-011 | Dorsale événementielle et rejeu | Directe | EXIG-ARC-13, EXIG-INT-11, EXIG-EVT-01, EXIG-EVT-02, EXIG-EVT-03, EXIG-EVT-04, EXIG-EVT-05, EXIG-EVT-07, EXIG-EVT-08, EXIG-EVT-09, EXIG-EVT-10 | CloudEvents, AsyncAPI, zéro renseignement personnel (RP) |
| CAP-012 | Délégation A2A et anti-boucle | Directe | EXIG-INT-04, EXIG-INT-05, EXIG-A2A-01, EXIG-A2A-02, EXIG-A2A-05, EXIG-A2A-07, EXIG-A2A-13, EXIG-A2A-15, EXIG-EVT-06, EXIG-ORC-08 | A2A 1.0 corrélé et compteur sauts |
| CAP-013 | Fédération multi-plateformes par gravité | Extension | EXIG-ARC-19, EXIG-ARC-20, EXIG-ARC-21, EXIG-A2A-06 | Extension gravité multi-plateformes sur ABB-SBB |
| CAP-014 | Négociation diplomate et évaluateur | Extension | EXIG-A2A-10, EXIG-A2A-12, EXIG-INT-22, EXIG-ORC-25 | Extension diplomate/tripartite sur ancrage A2A/INT-22 |
| CAP-015 | Couche sémantique et contrats | Directe | EXIG-INT-01, EXIG-INT-02 | Indicateurs gouvernés sans requêtes brutes |
| CAP-016 | Médiation vers standards sectoriels | Extension | EXIG-INT-13, EXIG-INT-14 | Extension médiation sectorielle sur SemVer 60 j |
| CAP-017 | Compilation contexte et ACL amont | Directe | EXIG-ARC-16, EXIG-ARC-22, EXIG-ORC-23 | Filtrage mandant, contexte minimal structuré |
| CAP-018 | Bibliothèque signée de compétences | Directe | EXIG-ARC-24, EXIG-INT-15, EXIG-INT-16 | Mémoire procédurale épinglée gérée comme code |
| CAP-019 | Mémoire bi-temporelle et oubli | Directe | EXIG-ARC-23, EXIG-ARC-25, EXIG-CON-10, EXIG-AMF-10 | Magasins isolés, bi-temporalité, purge Loi 25 |
| CAP-020 | Contrats données et quarantaine | Directe | EXIG-INT-12, EXIG-INT-19 | Contrat validé et détection ruptures |
| CAP-021 | Cloisonnement entité, consentement, loi | Directe | EXIG-CON-04, EXIG-CON-06, EXIG-CON-14 | ÉFVP, finalité par entité, interdits RIA |
| CAP-022 | Passerelle unifiée de médiation | Directe | EXIG-ARC-01, EXIG-ARC-11, EXIG-ARC-12, EXIG-MCP-01, EXIG-MCP-08, EXIG-MCP-09, EXIG-MCP-17, EXIG-MCP-22, EXIG-IAM-17, EXIG-IAM-19, EXIG-SEC-21 | Coupure PEP, domaines MCP isolés, HMAC |
| CAP-023 | Outils d’intention et épinglage | Directe | EXIG-ARC-15, EXIG-MCP-02, EXIG-MCP-03, EXIG-MCP-05, EXIG-MCP-06, EXIG-MCP-07, EXIG-MCP-14, EXIG-MCP-15, EXIG-MCP-16, EXIG-MCP-18, EXIG-MCP-20, EXIG-MCP-21 | Zéro CRUD brut, empreintes SHA-256 |
| CAP-024 | Encapsulation patrimoniale décimale exacte | Directe | EXIG-ARC-14, EXIG-ARC-17, EXIG-ARC-18 | API métier validantes, décimal exact, trace |
| CAP-025 | Sas dérogatoire et extinction CUA | Lacune 2026 | — (lacune 2026) | Lacune CAD26 automates écran (retrait 12 mois) |
| CAP-026 | Passerelles de partage financier ouvert | Extension | EXIG-INT-06, EXIG-INT-07, EXIG-MCP-10, EXIG-MCP-12, EXIG-MCP-13 | Extension partage ouvert sur consentement/portées |
| CAP-027 | Connecteurs d’espaces fédérés | Extension | EXIG-INT-03, EXIG-A2A-08, EXIG-A2A-11 | Extension espaces fédérés sur ancrage INT-03/A2A |
| CAP-028 | Sas OT et continuité déconnectée | Lacune 2026 | — (lacune 2026) | Lacune CAD26 sas OT et quotas 72 h [S] |
| CAP-029 | Plan d’inférence, routage et cache | Directe | EXIG-ARC-08, EXIG-ARC-09, EXIG-FIN-06, EXIG-FIN-07 | Alias logique et préfixe cache |
| CAP-030 | Bac à sable sans réseau | Directe | EXIG-ARC-10, EXIG-SEC-08, EXIG-SEC-09, EXIG-SEC-10, EXIG-SEC-11, EXIG-SEC-12, EXIG-SEC-13, EXIG-SEC-14, EXIG-SEC-15, EXIG-SEC-16, EXIG-SEC-17 | MicroVM fermée, IOMMU GPU, validation code |
| CAP-031 | Continuité bimodèle poids ouverts | Extension | EXIG-SEC-22, EXIG-APP-14 | Extension bimodèle poids ouverts sur SEC-22/APP-14 |
| CAP-032 | Cloisonnement des six substrats | Directe | EXIG-CON-05, EXIG-APP-11 | Lieux cartographiés et clés souveraines |
| CAP-033 | Inférence en enclave attestée | Lacune 2026 | — (lacune 2026) | Lacune CAD26 enclaves matérielles attestées |
| CAP-034 | Consignes compilées et distillation | Extension | EXIG-ARC-24, EXIG-CON-10 | Extension distillation/sas anti-RP [S] sur ARC-24 |
| CAP-035 | Identités NHI parrainées courtes | Directe | EXIG-IAM-02, EXIG-IAM-03, EXIG-IAM-04, EXIG-IAM-05, EXIG-IAM-06, EXIG-IAM-07, EXIG-IAM-16 | NHI distincte, zéro secret statique |
| CAP-036 | Délégation atténuée et possession | Directe | EXIG-IAM-08, EXIG-IAM-09, EXIG-IAM-10, EXIG-IAM-11, EXIG-IAM-12, EXIG-IAM-13, EXIG-IAM-14, EXIG-IAM-15, EXIG-MCP-11 | RFC 8693, DPoP/mTLS, zéro relais |
| CAP-037 | Politiques déterministes hors modèle | Directe | EXIG-IAM-18, EXIG-IAM-21, EXIG-AUT-03, EXIG-AUT-08, EXIG-AUT-10, EXIG-AUT-11 | Politiques en code, échec fermé |
| CAP-038 | Décontamination et défense anti-injection | Directe | EXIG-SEC-01, EXIG-SEC-02, EXIG-SEC-03, EXIG-SEC-04, EXIG-SEC-05, EXIG-SEC-06, EXIG-SEC-07, EXIG-SEC-23, EXIG-SEC-24, EXIG-SEC-25 | Règle de deux, retrait, banc bilingue |
| CAP-039 | Coupe-circuit et révocation rapide | Directe | EXIG-IAM-20, EXIG-ORC-28, EXIG-SEC-18, EXIG-SEC-20, EXIG-SEC-26, EXIG-APP-06, EXIG-APP-16 | Arrêt < 10 s [S] (15 min CAD26), SBOM |
| CAP-040 | Agilité crypto et post-quantique | Directe | EXIG-SEC-19, EXIG-OBS-12, EXIG-SEC-27, EXIG-SEC-28 | Couverture directe PQC NIST IR 8547 (SEC-27/28) |
| CAP-041 | Identité légale et mandats externes | Extension | EXIG-A2A-03, EXIG-A2A-04, EXIG-INT-21 | Extension identité légale sur cartes signées A2A |
| CAP-042 | Télémétrie à double couloir | Directe | EXIG-OBS-01, EXIG-OBS-02, EXIG-OBS-03, EXIG-OBS-04, EXIG-OBS-05, EXIG-OBS-06, EXIG-OBS-07, EXIG-OBS-08, EXIG-OBS-09, EXIG-OBS-10 | OTel épinglé sans contenu, débogage ≤ 14 j |
| CAP-043 | Qualification multi-essais et chaos | Directe | EXIG-EVA-01, EXIG-EVA-02, EXIG-EVA-03, EXIG-ORC-20, EXIG-ORC-30, EXIG-A2A-14 | Bancs E1–E2 pass^k et fautes |
| CAP-044 | Surveillance continue et budgets SLO | Directe | EXIG-EVA-04, EXIG-EVA-05, EXIG-EVA-06, EXIG-AUT-05 | Échantillonnage E3, juge étalonné, repli |
| CAP-045 | Pilotage au coût par résultat | Directe | EXIG-FIN-01, EXIG-FIN-02, EXIG-FIN-03, EXIG-FIN-04, EXIG-FIN-05, EXIG-FIN-06, EXIG-FIN-08, EXIG-FIN-09, EXIG-FIN-10, EXIG-APP-05 | CPO FOCUS, lots −50 %, petit modèle |
| CAP-046 | Comptabilisation énergétique et carbone | Lacune 2026 | — (lacune 2026) | Lacune CAD26 carbone ; portée 3 B-15 |
| CAP-047 | Registre central et blocage | Directe | EXIG-GOV-05, EXIG-GOV-06, EXIG-GOV-07, EXIG-GOV-08, EXIG-GOV-09, EXIG-GOV-10, EXIG-GOV-11, EXIG-GOV-14, EXIG-GOV-15, EXIG-GOV-16, EXIG-INT-08, EXIG-INT-09, EXIG-INT-10, EXIG-INT-17, EXIG-INT-18, EXIG-INT-20, EXIG-INT-23, EXIG-AMF-06 | 7 états, catalogue et dérogations bornées |
| CAP-048 | Gouvernance d’autonomie et relève | Directe | EXIG-AUT-01, EXIG-AUT-02, EXIG-AUT-04, EXIG-AUT-06, EXIG-AUT-07, EXIG-AUT-18, EXIG-CON-02, EXIG-CON-09, EXIG-GOV-01, EXIG-GOV-13, EXIG-AMF-07 | Plafonds classes, dossier 1 an, relève |
| CAP-049 | Empreinte juridictionnelle et preuves | Directe | EXIG-OBS-11, EXIG-OBS-13, EXIG-CON-01, EXIG-CON-03, EXIG-CON-11, EXIG-CON-12, EXIG-CON-13, EXIG-CON-15, EXIG-CON-16, EXIG-CON-17, EXIG-CON-18, EXIG-CON-23, EXIG-CON-24, EXIG-CON-25, EXIG-CON-26, EXIG-CON-27, EXIG-CON-30, EXIG-AMF-05, EXIG-AMF-08, EXIG-AMF-11 | Preuves uniques, ACVM, EN 18286 et profil AMF |
| CAP-050 | Validation indépendante 2e/3e lignes | Directe | EXIG-GOV-02, EXIG-GOV-03, EXIG-GOV-04, EXIG-GOV-12, EXIG-GOV-17, EXIG-GOV-18, EXIG-GOV-19, EXIG-GOV-20, EXIG-AMF-01, EXIG-AMF-02, EXIG-AMF-03, EXIG-AMF-04, EXIG-AMF-09 | Séparation rôles, E-23 et gouvernance conseil AMF |
| CAP-051 | Gouvernance tiers et sortie | Directe | EXIG-APP-01, EXIG-APP-02, EXIG-APP-03, EXIG-APP-04, EXIG-APP-07, EXIG-APP-08, EXIG-APP-09, EXIG-APP-10, EXIG-APP-12, EXIG-APP-13, EXIG-APP-15, EXIG-APP-17 | Grille éliminatoire, dix clauses, sortie |
| CAP-052 | Ingénierie assistée ségrégée | Lacune 2026 | — (lacune 2026) | Lacune CAD26 usine ; zéro interpréteur libre |

### A.4 Raccordement des 24 propositions d’exigence sectorielles (`PEX`)

| PEX | Profil | Type rattachement | Exigences CAD26 (`EXIG-*`) | Synthèse (CRE-IA v1.2) |
| --- | --- | --- | --- | --- |
| PEX-001 | Banque | Lacune 2026 | EXIG-IAM-01, EXIG-IAM-09, EXIG-IAM-17 | Lacune LSAC art. 171 anti-grattage et registre BdC |
| PEX-002 | Banque | Extension | EXIG-CON-06, EXIG-CON-10, EXIG-OBS-13 | Extension consentement exprès 5 ans et plaintes 7 ans |
| PEX-003 | Banque | Lacune 2026 | EXIG-IAM-21, EXIG-CON-06, EXIG-CON-11 | Lacune muraille bancassurance art. 416 Loi banques |
| PEX-004 | Banque | Directe | EXIG-CON-29, EXIG-INT-22, EXIG-AUT-09, EXIG-AUT-12, EXIG-ORC-21 | Directe EXIG-CON-29 : tampon RTR ISO 20022 pacs.008 |
| PEX-005 | Banque | Extension | EXIG-CON-05, EXIG-CON-19, EXIG-OBS-13 | Extension livres Canada art. 239 et plaintes 56 j |
| PEX-011 | Patrimoine | Directe | EXIG-CON-27, EXIG-GOV-01, EXIG-AUT-22, EXIG-CON-09, EXIG-CON-21 | Directe EXIG-CON-27 : convenance ACVM 11-348 / OCRI |
| PEX-012 | Patrimoine | Lacune 2026 | EXIG-ARC-12, EXIG-IAM-21, EXIG-CON-11 | Lacune double barrière sans conseils OEO OCRI 3241 |
| PEX-013 | Patrimoine | Directe | EXIG-CON-28, EXIG-CON-19, EXIG-CON-20, EXIG-CON-22, EXIG-OBS-13 | Directe EXIG-CON-28 : anti-AI washing et archive 7 ans |
| PEX-014 | Patrimoine | Extension | EXIG-CON-27, EXIG-IAM-21, EXIG-EVA-02, EXIG-CON-26 | Extension conflits NI 31-103, fin rétrofacturations 2028 |
| PEX-015 | Patrimoine | Lacune 2026 | EXIG-INT-02, EXIG-INT-12, EXIG-ARC-17 | Lacune calcul décimal quotidien frais NI 31-103 |
| PEX-021 | Assurance personnes | Lacune 2026 | EXIG-ARC-23, EXIG-CON-06, EXIG-CON-10 | Lacune purge pénale tests génétiques L.C. 2017 |
| PEX-022 | Assurance personnes | Extension | EXIG-CON-04, EXIG-CON-06, EXIG-OBS-12 | Extension consentement limité réseau santé québécois |
| PEX-023 | Assurance personnes | Directe | EXIG-AUT-07, EXIG-AUT-09, EXIG-AUT-22, EXIG-AUT-23, EXIG-CON-07, EXIG-AMF-12 | Directe EXIG-CON-07 / AMF-12 : refus vital art. 12.1 |
| PEX-024 | Assurance personnes | Extension | EXIG-GOV-07, EXIG-SEC-22, EXIG-APP-13, EXIG-AMF-06 | Extension sociétés mandataires et répertoire AMF-06 |
| PEX-025 | Assurance personnes | Directe | EXIG-SEC-27, EXIG-SEC-28, EXIG-OBS-12, EXIG-OBS-13, EXIG-CON-05, EXIG-CON-10 | Directe EXIG-SEC-27/28 : agilité PQC vie et rentes |
| PEX-031 | Assurance dommages | Extension | EXIG-ORC-27, EXIG-AUT-09, EXIG-AUT-23, EXIG-CON-07, EXIG-AMF-12 | Extension élasticité B-9/E-21 et refus humain AMF-12 |
| PEX-032 | Assurance dommages | Extension | EXIG-ARC-24, EXIG-CON-22, EXIG-IAM-21 | Extension assemblage déterministe formulaires auto AMF |
| PEX-033 | Assurance dommages | Lacune 2026 | EXIG-OBS-11, EXIG-OBS-12, EXIG-CON-21, EXIG-AMF-11 | Lacune neutralité ≥ 3 assureurs hors groupe (LDPSF) |
| PEX-034 | Assurance dommages | Extension | EXIG-IAM-03, EXIG-IAM-07, EXIG-SEC-03, EXIG-SEC-04, EXIG-SEC-06 | Extension NHI courtiers B-10, décontamination multimodale |
| PEX-035 | Assurance dommages | Lacune 2026 | EXIG-CON-11, EXIG-CON-12, EXIG-AMF-05, EXIG-EVA-03 | Lacune modèles catastrophe B-9 et émissions B-15 |
| PEX-041 | Groupe diversifié | Extension | EXIG-CON-06, EXIG-ARC-16, EXIG-ARC-25, EXIG-IAM-21 | Extension étiquette entité immuable, muraille groupe |
| PEX-042 | Groupe diversifié | Extension | EXIG-IAM-08, EXIG-IAM-10, EXIG-CON-06 | Extension jeton consentement exprès inter-filiales |
| PEX-043 | Groupe diversifié | Extension | EXIG-GOV-05, EXIG-APP-01, EXIG-APP-13, EXIG-APP-14, EXIG-AMF-01 | Extension ententes intra-groupe B-10 et AMF-01 |
| PEX-044 | Groupe diversifié | Extension | EXIG-GOV-07, EXIG-CON-05, EXIG-CON-11, EXIG-CON-12, EXIG-CON-25, EXIG-AMF-05, EXIG-AMF-08 | Extension livres, E-23, AMF-05/08 et portée 3 B-15 |

## Annexe B — Catalogue de poche des décisions d’architecture AE / AS

Générée automatiquement depuis `registre/decisions.json`.

### B.1 Correspondance principes PRIN, dix décisions CAD26 et principes PRI

| Principe PD28 (`PRI`) | Principes CAD26 (`PRIN`) | Décision structurante CAD26 | Règle directrice |
| --- | --- | --- | --- |
| PRI-001 | PRIN-04, PRIN-10 | Décision 2 : Rien ne contourne les points d’application | Registre, NHI, politiques et trace précèdent toute autonomie |
| PRI-002 | PRIN-08 | Décision 3 : La simplicité d’abord | Machine à états déterministe autour des cellules probabilistes |
| PRI-003 | PRIN-01, PRIN-02 | Décision 1 : Deux protocoles pivots, versions épinglées | Séparation stricte entre outil MCP vertical et pair A2A |
| PRI-004 | PRIN-03 | Décision 5 : Une identité propre à chaque agent, des droits délégués et de courte durée | Identité NHI distincte et jetons RFC 8693 atténués |
| PRI-005 | PRIN-07 | Décision 6 : Présomption d’injection | Politiques hors modèle, règle de deux et retrait d’exfiltration |
| PRI-006 | PRIN-04, PRIN-12 | Décision 4 : Une échelle d’autonomie unique | Autonomie méritée par domaine × classe et rétrogradation immédiate |
| PRI-007 | PRIN-05, PRIN-10 | Décision 9 : Une personne nommée répond de chaque agent | Supervision liée à h, anti-complaisance et recours client effectif |
| PRI-008 | PRIN-02, PRIN-09, PRIN-11 | Décision 10 : Conformité dès la conception | Sémantique versionnée, ACL amont et mémoire longue parcimonieuse |
| PRI-009 | PRIN-05, PRIN-12 | Décision 7 : Réversibilité par conception | Exécution durable, idempotence, Saga et canal de compensation dédié |
| PRI-010 | PRIN-03, PRIN-10 | Décision 10 : Conformité dès la conception | Cloisonnement étanche par personne morale, consentement et loi |
| PRI-011 | PRIN-09, PRIN-11, PRIN-12 | Décision 10 : Conformité dès la conception | Maîtrise juridictionnelle des six substrats et continuité bimodèle |
| PRI-012 | PRIN-03, PRIN-06 | Décision 5 : Une identité propre à chaque agent, des droits délégués et de courte durée | Certificats courts automatisés et transition post-quantique sans couture |
| PRI-013 | PRIN-06 | Décision 8 : On ne gouverne que ce qu’on voit | Corrélation OpenTelemetry sans renseignements personnels (RP) et voûte scellée |
| PRI-014 | PRIN-06, PRIN-08 | Décision 8 : On ne gouverne que ce qu’on voit | Modèle minimal suffisant, suivi carbone et pilotage au CPO |
| PRI-015 | PRIN-01, PRIN-09 | Décision 2 : Rien ne contourne les points d’application | Noyau de contrôle possédé, gravité des données et sortie |

### B.2 Sort des 31 ADR de 2027, rattachement aux 12 DEC et propriétaire

| ADR | Verdict | DEC cible | Rôle | Appui sourcé | Réserve ou condition |
| --- | --- | --- | --- | --- | --- |
| ADR-001 | Maintenue | — | AE↔AS | C27 § 1.4, 25.2 ; EXIG-ARC-17 | Invariant : zéro écriture SQL directe (PRI-002) |
| ADR-002 | Maintenue | — | AS | C27 § 17.1, 17.6 ; EXIG-ORC-01 | Séquencement maître déterministe maintenu (suivi SIG-013) |
| ADR-003 | Maintenue | — | AE | C27 § 8.7, 43.1 ; EXIG-GOV-08 | Recalée sur Stades 0–4 et Classe 1 (SIG-008) |
| ADR-004 | À réviser sur signal | — | AE | C27 § 11.2, 27.5 ; EXIG-INT-06 | Réviser selon gouvernance AAIF/IETF (SIG-004, SIG-008) |
| ADR-005 | À réviser sur signal | — | AS | C27 § 5.2, 13.3 ; EXIG-MCP-06 | Réviser sur MCP SEP-3398 et web (SIG-005, SIG-103) |
| ADR-006 | Généralisée | DEC-001 | AS | C27 § 6.4, 49.5 ; EXIG-A2A-03 | Retrait couplage incubation, agilité PQC (SIG-004, SIG-009) |
| ADR-007 | Généralisée | DEC-002 | AS | C27 § 7.1, 10.6 ; EXIG-ARC-03 | Neutralisée sur catalogues déclaratifs fermés (SIG-004, SIG-102) |
| ADR-008 | Maintenue | — | AS | C27 § 13.5, 15.3 ; EXIG-ARC-16 | Invariant : ACL amont sans repli service (PRI-008) |
| ADR-009 | Généralisée | DEC-003 | AE↔AS | C27 § 12.1, 12.2, 12.4 (p. 250) ; EXIG-INT-02 | Épingle l’ontologie 0.1.1 sans moteur en excluant 0.3.0.dev0 (p. 250), en dissonance avec l’Extrait 12.1 en 1.0.0 ; couplage rejeté par DEC-003 (SIG-110) |
| ADR-010 | Généralisée | DEC-004 | AS | C27 § 14.5, 31.6 ; EXIG-ARC-23 | Neutralisée : bi-temporalité et purge Loi 25 (SIG-106) |
| ADR-011 | Maintenue | — | AS | C27 § 16.6, 21.5 ; EXIG-ORC-02 | Invariant : zéro graphe cyclique libre (suivi SIG-014) |
| ADR-012 | Généralisée | DEC-005 | AS | C27 § 18.2, 18.5 ; EXIG-ORC-11 | Moteur durable neutre et revalidation réveil (SIG-014) |
| ADR-013 | Généralisée | DEC-005 | AS | C27 § 18.4, 19.7 ; EXIG-ORC-15 | Courtier neutre, Saga pivot et canal dédié (SIG-104) |
| ADR-014 | Généralisée | DEC-006 | AS | C27 § 44.3, 44.5 ; EXIG-ARC-08 | Passerelle modèles neutre, 3 paliers, KV-cache (SIG-015) |
| ADR-015 | Généralisée | DEC-007 | AE | C27 § 26.9, 27.4 ; EXIG-ARC-21 | Noyau possédé et étiquette d’entité groupe (SIG-108) |
| ADR-016 | Généralisée | DEC-008 | AE↔AS | C27 § 25.1, 25.4 ; EXIG-ARC-14 | Décimal exact et extinction CUA 12 mois (SIG-103) |
| ADR-017 | Maintenue | — | AS | C27 § 28.4, 28.5 ; EXIG-AUT-09 | Réserve § 28.5 : prototypes sans terrain (SIG-109) |
| ADR-018 | À réviser sur signal | — | AS | C27 § 29.4, 30.2 ; EXIG-IAM-08 | Réviser sur profils RFC WIMSE/PQC (SIG-003, SIG-011) |
| ADR-019 | Généralisée | DEC-009 | AS | C27 § 31.4, 49.7 ; EXIG-MCP-20 | Épinglage SHA-256 neutre et règle de deux (SIG-101) |
| ADR-020 | Généralisée | DEC-009 | AS | C27 § 30.6, 32.3 ; EXIG-SEC-08 | Politiques hors modèle neutres et microVM fermée (SIG-101) |
| ADR-021 | À réviser sur signal | — | AS | C27 § 33.2, 33.4 ; EXIG-OBS-01 | Réviser au passage Stable de gen_ai.\* (SIG-006) |
| ADR-022 | Généralisée | DEC-010 | AS | C27 § 34.2, 48.5 ; EXIG-EVA-03 | Qualification pass^k sur bancs internes audités (SIG-013) |
| ADR-023 | Généralisée | DEC-011 | AE | C27 § 40.2, 40.5 ; EXIG-FIN-01 | Séquencée : affichage P1 puis refacturation P2 (SIG-015) |
| ADR-024 | À réviser sur signal | — | AE | C27 § 35.1, 38.4 ; EXIG-CON-11 | Réviser sur RIA, AMF IA, fédéral (SIG-001, SIG-102) |
| ADR-025 | Maintenue | — | AE | C27 § 39.3, 41.4 ; EXIG-GOV-01 | Étoile, parrain RH et anti-complaisance (SIG-017, SIG-106) |
| ADR-026 | Généralisée | DEC-012 | AE↔AS | C27 § 45.3, 45.7 ; EXIG-INT-22 | vLEI, Diplomate/Évaluateur et scellement PQC (SIG-007, SIG-009) |
| ADR-027 | À réviser sur signal | — | AE↔AS | C27 § 37.1, 46.1 ; EXIG-CON-05 | 6 substrats, repli [S] ; réviser TEE (SIG-016) |
| ADR-028 | Généralisée | DEC-008 | AS | C27 § 46.5, 46.8 ; EXIG-ORC-27 | Quotas déconnectés CRDT [S] et moniteur Simplex (SIG-109) |
| ADR-029 | Maintenue | — | AS | C27 § 47.1, 47.4 ; EXIG-GOV-03 | Réserve § 47.1 : gains contrastés, cibles [S] |
| ADR-030 | Généralisée | DEC-010 | AS | C27 § 15.1, 47.6 ; EXIG-SEC-17 | Quarantaine WAP amont et zéro interpréteur libre (SIG-109) |
| ADR-031 | À réviser sur signal | — | AE↔AS | C27 § 47.7, 47.8 ; EXIG-CON-10 | Distillation sous sas anti-RP [S] selon CPO (SIG-015) |

### B.3 Synthèse des 12 DEC neutralisées et gabarit décisionnel minimal

| DEC | Intitulé | Rôle | Exigences rattachées |
| --- | --- | --- | --- |
| DEC-001 | Contrat neutre de délégation, annuaire signé et PQC | AS | EXIG-A2A-01, EXIG-A2A-03, EXIG-IAM-08, EXIG-SEC-19 |
| DEC-002 | Interfaces génératives sur catalogue déclaratif sans code libre | AS | EXIG-ARC-03, EXIG-MCP-04, EXIG-MCP-19, EXIG-AUT-19 |
| DEC-003 | Couche sémantique gouvernée neutre et médiation sectorielle | AE↔AS | EXIG-INT-02, EXIG-INT-12, EXIG-ARC-14, EXIG-ARC-15 |
| DEC-004 | Parcimonie mémorielle, bi-temporalité auditable et purge Loi 25 | AE↔AS | EXIG-ARC-22, EXIG-ARC-23, EXIG-ARC-25, EXIG-CON-10 |
| DEC-005 | Exécution durable neutre, Saga pivot et sobriété événementielle | AS | EXIG-ORC-11, EXIG-ORC-15, EXIG-ORC-21, EXIG-ORC-28 |
| DEC-006 | Plan d’inférence neutre, routage frugal et continuité bimodèle | AE↔AS | EXIG-ARC-08, EXIG-ARC-09, EXIG-FIN-06, EXIG-ORC-27 |
| DEC-007 | Fédération par noyau possédé et cloisonnement inter-entités | AE | EXIG-ARC-01, EXIG-ARC-19, EXIG-ARC-21, EXIG-CON-11 |
| DEC-008 | Adaptateurs décimaux exacts, extinction CUA et quotas déconnectés | AE↔AS | EXIG-ARC-14, EXIG-ARC-17, EXIG-AUT-08, EXIG-ORC-27 |
| DEC-009 | Politiques hors modèle, bac à sable fermé, épinglage | AS | EXIG-IAM-21, EXIG-MCP-20, EXIG-SEC-06, EXIG-SEC-08 |
| DEC-010 | Qualification multi-essais, quarantaine amont et SRE sans interpréteur libre | AS | EXIG-EVA-02, EXIG-EVA-03, EXIG-ORC-20, EXIG-SEC-17 |
| DEC-011 | Pilotage séquencé au coût par résultat conforme | AE | EXIG-FIN-01, EXIG-FIN-04, EXIG-FIN-09, EXIG-FIN-10 |
| DEC-012 | Continuité post-quantique des mandats et fédération B2B vérifiable | AE↔AS | EXIG-INT-22, EXIG-OBS-12, EXIG-OBS-13, EXIG-APP-14 |

```
id: DEC-NNN  # Fiche exécutable sans produit ni seuil fictif (dérivée C27 Ann. F.4)
proprietaire: AE | AS | AE-AS
abb_cible: <bloc neutre>  # SBB substituable consigné séparément avec date
exigences_cad26: [EXIG-XXX-NN]
portes_et_signaux: {porte: POR-NNN, signal_revision: SIG-NNN}
preuve_ci: <test E1/E2 ou invariant passerelle vérifiable>
```

## Annexe C — Grille unifiée d’homologation avant mise en production

Générée automatiquement depuis `registre/homologation.json` (fusion `CAD26 Annexe A` × `75 PRR C27` × `15 POR PD28`).

### C.1 Contrôles unifiés par domaine (A.2 à A.8)

**Légende et raccordements —** Chaque code PRR suivi d’un astérisque (\*) est [BLOQUANT] sans dérogation en autonomie L3/L4 (24/75 en C27 Annexe G recalibrée W1.3 ; 26 Conditionnel ; 25 Élevée/Moyenne). La grille couvre l’ensemble des 305 exigences de CRE-IA-2026-01 v1.2 (287 socle + 12 EXIG-AMF + 6 PQC/ACVM/RTR/EN 18286). La colonne Statut recense les 46 exigences DOIT / NE DOIT PAS non dérogeables de CAD26 Annexe A, réconciliées à zéro écart avec les 10 interdictions EXIG-GOV-17 (C.2), hors 16 recommandations DEVRAIT isolées dans exigences_devrait et hors EXIG-GOV-16.

| Rubrique | Contrôle d’homologation | Exigences (`EXIG-*`) | Codes `PRR` | Statut (`GOV-17` / `L3-L4`) | Preuve système | Portes |
| --- | --- | --- | --- | --- | --- | --- |
| A.2.1 | Fiche registre et parrain actif | EXIG-GOV-01, EXIG-GOV-05, EXIG-GOV-06, EXIG-GOV-07, EXIG-GOV-08, EXIG-GOV-09, EXIG-GOV-10, EXIG-GOV-11, EXIG-GOV-13, EXIG-GOV-14 | G-01\* | GOV-17 ND (9/10 ; hors DEVRAIT : GOV-06) · [BLOQUANT] (1/1) | Fiche signée, lien RH, rejet réseau | POR-001, POR-015 |
| A.2.2 | Séparation des fonctions et RACI | EXIG-GOV-02, EXIG-GOV-03, EXIG-GOV-04 | S-15\*, F-11 | GOV-17 ND : GOV-02, GOV-04 · Mixte (1/2 [BLOQUANT]) | Protection dépôt, charte un seul A | POR-003, POR-015 |
| A.2.3 | Classe de risque et plafonds | EXIG-CON-01, EXIG-CON-02, EXIG-AUT-01, EXIG-AUT-02, EXIG-AUT-03, EXIG-AUT-06, EXIG-AUT-07 | G-03\*, G-04 | GOV-17 ND : CON-02, AUT-01, AUT-02, AUT-03, AUT-07 · Mixte (1/2 [BLOQUANT]) | Cote E-23 validée, blocage technique NX | POR-001, POR-014 |
| A.2.4 | Domaine ODD et sobriété topologique | EXIG-AUT-04, EXIG-AUT-05, EXIG-ORC-01, EXIG-ORC-02, EXIG-ORC-03 | G-02 | Standard | Contrat ODD borné, gain multiagent mesuré | POR-003, POR-006 |
| A.2.5 | Réévaluation, dérogations et catalogue | EXIG-GOV-12, EXIG-GOV-15, EXIG-GOV-16, EXIG-GOV-17, EXIG-GOV-18, EXIG-GOV-19, EXIG-GOV-20, EXIG-CON-03 | O-03 | GOV-17 ND : GOV-15 (méta-règle GOV-17 ; GOV-16 transitoire) | Manifeste SemVer, dérogations bornées et revues | POR-001, POR-015 |
| A.2.6 | Qualification SaaS et prérequis achat | EXIG-ARC-21, EXIG-APP-01, EXIG-APP-02, EXIG-APP-03, EXIG-APP-04, EXIG-APP-05, EXIG-APP-06 | R-12 | Standard | Régime SaaS (erratum ARC-02 → ARC-21), arrêt propre | POR-004, POR-008 |
| A.3.1 | Sémantique et contrats du catalogue | EXIG-INT-01, EXIG-INT-02, EXIG-INT-03, EXIG-INT-04, EXIG-INT-05, EXIG-INT-06, EXIG-INT-07, EXIG-INT-08, EXIG-INT-09, EXIG-INT-10, EXIG-INT-11 | G-09, F-13 | DEVRAIT : INT-05, INT-11 | Schémas versionnés (G-09 écarté par DEC-003), sas WAP | POR-005 |
| A.3.2 | Épinglage, coexistence et paiements tiers | EXIG-INT-12, EXIG-INT-13, EXIG-INT-14, EXIG-INT-15, EXIG-INT-16, EXIG-INT-17, EXIG-INT-18, EXIG-INT-19, EXIG-INT-20, EXIG-INT-21, EXIG-INT-22, EXIG-INT-23 | G-13, F-01, F-03 | Standard | Verrouillage SHA-256 et rapprochement tripartite | POR-001, POR-013 |
| A.3.3 | Serveurs MCP sans état sécurisés | EXIG-MCP-01, EXIG-MCP-02, EXIG-MCP-03, EXIG-MCP-04, EXIG-MCP-08, EXIG-MCP-09, EXIG-MCP-10, EXIG-MCP-12, EXIG-MCP-13, EXIG-MCP-22 | R-09 | Standard | Transport HTTP sans état, sessions bornées | POR-001, POR-008 |
| A.3.4 | Intention métier et hygiène MCP | EXIG-MCP-05, EXIG-MCP-06, EXIG-MCP-07, EXIG-MCP-14, EXIG-MCP-15, EXIG-MCP-16, EXIG-MCP-17, EXIG-MCP-18, EXIG-MCP-19, EXIG-MCP-20, EXIG-MCP-21 | S-07 | DEVRAIT : MCP-05 | Empreintes signées, alerte substitution schéma | POR-001 |
| A.3.5 | Cartes signées et tâches A2A | EXIG-A2A-01, EXIG-A2A-02, EXIG-A2A-03, EXIG-A2A-04, EXIG-A2A-05, EXIG-A2A-06, EXIG-A2A-07, EXIG-A2A-08, EXIG-A2A-09, EXIG-A2A-10, EXIG-A2A-11, EXIG-A2A-12, EXIG-A2A-13, EXIG-A2A-14, EXIG-A2A-15 | S-13, F-02, G-14 | DEVRAIT : A2A-15 | Vérification JWS, mTLS, isolation diplomate externe | POR-006, POR-013 |
| A.3.6 | Bus CloudEvents et anti-boucle | EXIG-EVT-01, EXIG-EVT-02, EXIG-EVT-03, EXIG-EVT-04, EXIG-EVT-05, EXIG-EVT-06, EXIG-EVT-07, EXIG-EVT-08, EXIG-EVT-09, EXIG-EVT-10 | R-04, R-05 | DEVRAIT : EVT-01 | Arrêt compteur sauts et rejeu isolé | POR-006 |
| A.4.1 | Couches et interfaces métier validantes | EXIG-ARC-02, EXIG-ARC-03, EXIG-ARC-04, EXIG-ARC-07, EXIG-ARC-13, EXIG-ARC-14, EXIG-ARC-15, EXIG-ARC-16, EXIG-ARC-17, EXIG-ARC-18, EXIG-ARC-19, EXIG-ARC-20 | R-01\*, R-13, F-12 | DEVRAIT : ARC-15, ARC-18 · Mixte (1/3 [BLOQUANT]) | Zéro SQL, miroir [S], sas OT | POR-004, POR-008 |
| A.4.2 | Exécution durable et reprise d’état | EXIG-ARC-05, EXIG-ARC-06, EXIG-ORC-11, EXIG-ORC-12, EXIG-ORC-13, EXIG-ORC-14 | R-02, O-08 | DEVRAIT : ORC-14 | Reprise panne, retour arrière 2 min [S] (O-08) | POR-003 |
| A.4.3 | Clés d’idempotence et pré-engagement | EXIG-ORC-21, EXIG-ORC-22 | R-03\*, R-07\* | [BLOQUANT] (2/2) | Double envoi dédupliqué et tampon actif | POR-003 |
| A.4.4 | Sagas, compensations et injection fautes | EXIG-ORC-15, EXIG-ORC-16, EXIG-ORC-17, EXIG-ORC-18, EXIG-ORC-19, EXIG-ORC-20 | R-06\*, R-15 | Mixte (1/2 [BLOQUANT]) | Journal préalable, chaos sans écriture orpheline | POR-003 |
| A.4.5 | Gouvernance des patrons multiagents | EXIG-ORC-04, EXIG-ORC-05, EXIG-ORC-06, EXIG-ORC-07, EXIG-ORC-08, EXIG-ORC-09, EXIG-ORC-10, EXIG-ORC-23, EXIG-ORC-24, EXIG-ORC-25, EXIG-ORC-29, EXIG-ORC-30 | O-06 | DEVRAIT : ORC-10 | Blocage troisième saut, coupure boucle sémantique | POR-006 |
| A.4.6 | Plafonds, repli bimodèle et coupe-circuit | EXIG-ORC-26, EXIG-ORC-27, EXIG-ORC-28, EXIG-IAM-20, EXIG-SEC-26 | S-14\*, R-10, R-11, F-07, F-08, F-09 | Mixte (1/6 [BLOQUANT]) | Arrêt < 10 s [S] (15 min CAD26), canal dédié | POR-003, POR-006, POR-015 |
| A.5.1 | Paliers d’outils et union stricte | EXIG-AUT-08, EXIG-AUT-10, EXIG-AUT-11 | S-09\* | [BLOQUANT] (1/1) | Évaluation déterministe hors modèle mode fermé | POR-001, POR-003 |
| A.5.2 | Approbation hors bande liée P3 | EXIG-AUT-09, EXIG-AUT-12, EXIG-AUT-13, EXIG-AUT-14 | S-10 | GOV-17 ND (3/4 ; hors DEVRAIT : AUT-14) | Jeton CIBA/FIDO2 lié au condensat JCS | POR-003 |
| A.5.3 | Ergonomie fidèle et vigilance humaine | EXIG-AUT-15, EXIG-AUT-16, EXIG-AUT-19, EXIG-AUT-20, EXIG-AUT-21 | G-11, G-12 | Standard | Écran I-JSON différentiel et dossiers témoins | POR-009, POR-014 |
| A.5.4 | Agents ambiants et persistance pré-effet | EXIG-AUT-17, EXIG-AUT-18 | R-08 | Standard | Revalidation au réveil, réautorisation périodique | POR-015 |
| A.5.5 | Décisions automatisées Loi 25 | EXIG-AUT-22, EXIG-AUT-23, EXIG-CON-07, EXIG-CON-08, EXIG-CON-09 | G-06\* | GOV-17 ND (5/5) · [BLOQUANT] (1/1) | Avis, facteurs explicables, dossier 1 an | POR-002, POR-014 |
| A.6.1 | Identité NHI sans secret statique | EXIG-IAM-01, EXIG-IAM-02, EXIG-IAM-03, EXIG-IAM-04, EXIG-IAM-05, EXIG-IAM-06, EXIG-IAM-07 | S-01\* | [BLOQUANT] (1/1) | Attestation SPIFFE SVID, zéro clé statique | POR-001, POR-011 |
| A.6.2 | Échange RFC 8693 sans relais | EXIG-IAM-08, EXIG-IAM-09, EXIG-IAM-10, EXIG-IAM-11, EXIG-IAM-12, EXIG-MCP-11 | S-03\*, S-04 | GOV-17 ND : IAM-08, IAM-09, IAM-12, MCP-11 · Mixte (1/2 [BLOQUANT]) | Jeton audience unique, rejet tout relais | POR-001, POR-011 |
| A.6.3 | Profil OAuth et liaison expéditeur | EXIG-IAM-13, EXIG-IAM-14, EXIG-IAM-15, EXIG-IAM-16 | S-05 | DEVRAIT : IAM-15 | Jeton court DPoP/mTLS, renouvellement 47 j | POR-007, POR-011 |
| A.6.4 | Coupure passerelles d’agents et modèles | EXIG-ARC-01, EXIG-ARC-08, EXIG-ARC-09, EXIG-ARC-11, EXIG-ARC-12, EXIG-IAM-17, EXIG-IAM-18, EXIG-IAM-19, EXIG-IAM-21 | S-06\*, F-14\* | DEVRAIT : ARC-09, IAM-19 · [BLOQUANT] (2/2) | Blocage réseau hors passerelle, zéro interpréteur | POR-001, POR-012 |
| A.6.5 | Règle de deux anti-exfiltration | EXIG-SEC-01, EXIG-SEC-02, EXIG-SEC-03, EXIG-SEC-04, EXIG-SEC-05, EXIG-SEC-06, EXIG-SEC-07 | S-08\* | GOV-17 ND : SEC-06 · [BLOQUANT] (1/1) | Retrait déterministe outils sortants et P3 | POR-003 |
| A.6.6 | Bac à sable réseau fermé | EXIG-ARC-10, EXIG-SEC-08, EXIG-SEC-09, EXIG-SEC-10, EXIG-SEC-11, EXIG-SEC-12, EXIG-SEC-13, EXIG-SEC-14, EXIG-SEC-15, EXIG-SEC-16, EXIG-SEC-17 | S-11\* | DEVRAIT : SEC-11 · [BLOQUANT] (1/1) | Sortie réseau/IMDS bloquée, isolation IOMMU/microVM | POR-003 |
| A.6.7 | Provenance signée et tests adverses | EXIG-SEC-18, EXIG-SEC-19, EXIG-SEC-20, EXIG-SEC-21, EXIG-SEC-22, EXIG-SEC-23, EXIG-SEC-24, EXIG-SEC-25 | S-02, F-10 | Standard | Signatures artefacts vérifiées, suite attaques CI | POR-003, POR-007 |
| A.6.8 | Agilité cryptographique et transition post-quantique (NIST IR 8547) | EXIG-SEC-27, EXIG-SEC-28 | S-14 | Standard | Inventaire crypto, TLS ≤ 47 j, signatures PQC/rescellement ≤ 5 ans, en-têtes ≤ 8 Ko | POR-002, POR-007 |
| A.7.1 | Traces OpenTelemetry épinglées au collecteur | EXIG-OBS-01, EXIG-OBS-02, EXIG-OBS-03, EXIG-OBS-04, EXIG-OBS-05, EXIG-OBS-06 | O-01 | Standard | Trace causale complète normalisée au collecteur | POR-002 |
| A.7.2 | Double couloir RP (PII) sans contenu | EXIG-OBS-07, EXIG-OBS-08, EXIG-OBS-09, EXIG-OBS-10 | O-02\*, F-15 | Mixte (1/2 [BLOQUANT]) | Zéro renseignement personnel (RP) index général, canaris [S] | POR-002 |
| A.7.3 | Journal d’audit JCS chaîné ancré | EXIG-OBS-11, EXIG-OBS-12, EXIG-OBS-13 | G-15\* | GOV-17 ND : OBS-11 · [BLOQUANT] (1/1) | Audit 5 éléments, ancrage horaire, PQC | POR-002, POR-007, POR-011 |
| A.7.4 | Évaluation E1–E3 pass^k et dérive | EXIG-EVA-01, EXIG-EVA-02, EXIG-EVA-03, EXIG-EVA-04, EXIG-EVA-05, EXIG-EVA-06 | O-04, O-05, O-07, O-14 | Standard | CI pass^k (≥ 50 EXIG-EVA-02 vs ≥ 100 PRR O-04 [S]) | POR-003, POR-014, POR-015 |
| A.7.5 | Enveloppes FinOps, CPO et carbone | EXIG-FIN-01, EXIG-FIN-02, EXIG-FIN-03, EXIG-FIN-04, EXIG-FIN-05, EXIG-FIN-06, EXIG-FIN-07, EXIG-FIN-08, EXIG-FIN-09, EXIG-FIN-10 | O-09\*, O-10, O-11, O-12, O-13 | DEVRAIT : FIN-08 · Mixte (1/5 [BLOQUANT]) | Disjoncteur coût, tableau CPO, portée 3 | POR-004, POR-009, POR-016 |
| A.8.1 | ÉFVP préalable et finalités vérifiées | EXIG-CON-04, EXIG-CON-06 | G-05\* | GOV-17 ND (2/2) · [BLOQUANT] (1/1) | Dossier ÉFVP signé, consentement par entité | POR-002, POR-012 |
| A.8.2 | Six substrats d’état et clés | EXIG-CON-05 | F-04\*, F-05, F-06 | GOV-17 ND (1/1) · Mixte (1/3 [BLOQUANT]) | Matrice 6 substrats [S], clés souveraines, enclave | POR-002 |
| A.8.3 | Isolation CoALA et effacement vérifiable | EXIG-ARC-22, EXIG-ARC-23, EXIG-ARC-24, EXIG-ARC-25, EXIG-CON-10 | S-12, R-14\*, G-10\* | Mixte (2/3 [BLOQUANT]) | Étanchéité multilocataire et preuve de purge | POR-005 |
| A.8.4 | Conformité multi-régimes E-23, AMF, RIA | EXIG-CON-11, EXIG-CON-12, EXIG-CON-13, EXIG-CON-14, EXIG-CON-15, EXIG-CON-16, EXIG-CON-17, EXIG-CON-18, EXIG-CON-21 | G-08 | GOV-17 ND (9/9) | Base de preuves unique, dossier RIA | POR-002, POR-012 |
| A.8.5 | Transparence, incidents et impact unifié | EXIG-CON-19, EXIG-CON-20, EXIG-CON-22, EXIG-CON-23, EXIG-CON-24, EXIG-CON-25, EXIG-CON-26 | G-07\* | GOV-17 ND : CON-19, CON-20, CON-22 (art. 50 RIA ; légal CON-24..26 § A.1.3) · [BLOQUANT] (1/1) | Divulgation active, impact unifié, gel preuves | POR-002 |
| A.8.6 | Dix clauses contractuelles et sortie | EXIG-APP-07, EXIG-APP-08, EXIG-APP-09, EXIG-APP-10, EXIG-APP-11, EXIG-APP-12, EXIG-APP-13, EXIG-APP-14, EXIG-APP-15, EXIG-APP-16, EXIG-APP-17 | O-15 | Standard | Grille fournisseur signée, essai annuel d’extraction | POR-004, POR-016 |
| A.8.7 | Secteurs financiers ACVM 11-348, RTR ISO 20022, EN 18286 et AMF | EXIG-CON-27, EXIG-CON-28, EXIG-CON-29, EXIG-CON-30, EXIG-AMF-01, EXIG-AMF-02, EXIG-AMF-03, EXIG-AMF-04, EXIG-AMF-05, EXIG-AMF-06, EXIG-AMF-07, EXIG-AMF-08, EXIG-AMF-09, EXIG-AMF-10, EXIG-AMF-11, EXIG-AMF-12 | G-15 | Standard | Dossiers ACVM 7 ans, tampon RTR pacs.008, SMQ EN 18286 et répertoire AMF | POR-004, POR-009 |

### C.2 Dix interdictions sans dérogation (`EXIG-GOV-17`) et protocole d’exception

Dérogation écrite bornée à ≤ 6 mois (renouvelable 1 fois ; ≤ 90 j en classe faible par l’AE) sous mesures compensatoires ; zéro dérogation sur les 10 interdictions EXIG-GOV-17.

1. **Autonomie non bornée de niveau NX interdite en tout temps** (EXIG-AUT-03).
2. **Exécution d’une action P3 sans approbation humaine hors bande liée** (EXIG-AUT-09, EXIG-AUT-12, EXIG-AUT-13).
3. **Usurpation par un agent de l’identité de son mandant humain** (EXIG-IAM-08, EXIG-IAM-09).
4. **Relais direct d’un jeton entrant vers un serveur ou pair aval** (EXIG-IAM-12, EXIG-MCP-11).
5. **Exploitation sans fiche complète au registre ou parrain nommé (hors cohorte transitoire EXIG-GOV-16)** (EXIG-GOV-01, EXIG-GOV-02, EXIG-GOV-04, EXIG-GOV-05, EXIG-GOV-07, EXIG-GOV-08, EXIG-GOV-09, EXIG-GOV-10, EXIG-GOV-11, EXIG-GOV-13, EXIG-GOV-14, EXIG-GOV-15).
6. **Dépassement du plafond d’autonomie fixé par la classe de risque** (EXIG-AUT-01, EXIG-AUT-02, EXIG-CON-02).
7. **Autorisation au-delà de N2 d’un agent atteignant les seuils de la règle d’or** (EXIG-AUT-07).
8. **Exposition à la triade létale sans retrait déterministe des outils sortants** (EXIG-SEC-06).
9. **Exploitation d’un agent sans journal d’audit distinct, chaîné et ancré** (EXIG-OBS-11).
10. **Manquement à une obligation légale ou réglementaire applicable (dont Loi 25 art. 12.1 et part légale CON-10, 24..26 § A.1.3)** (EXIG-AUT-22, EXIG-AUT-23, EXIG-CON-04, EXIG-CON-05, EXIG-CON-06, EXIG-CON-07, EXIG-CON-08, EXIG-CON-09, EXIG-CON-11, EXIG-CON-12, EXIG-CON-13, EXIG-CON-14, EXIG-CON-15, EXIG-CON-16, EXIG-CON-17, EXIG-CON-18, EXIG-CON-19, EXIG-CON-20, EXIG-CON-21, EXIG-CON-22).

## Annexe D — Guide d’orientation vers les 2 541 pages sources et bibliographie maîtresse

Cette annexe relie les douze chapitres du mémoire aux **2 541 pages** des quatre PDF du dépôt complétés par le profil québécois `2026/documents/Note AMF IA.pdf` (`49` p., état au **19 novembre 2026**), propose les parcours par rôle et consigne les bibliographies maîtresses ainsi que les limites héritées. Le glossaire unifié (`Annexe E`) et la bibliographie primaire sélective (`Annexe F`) complètent ce guide.

### D.1 Gel, actualisation et bibliographies maîtresses des quatre volumes

| Volume et fichier | Structure et dates de gel | Bibliographie maîtresse |
| --- | --- | --- |
| `C26` — `2026/documents/Compendium.pdf` (**673 p.**) | 5 livres, 50 ch., 3 annexes · Gel **27 juill. 2026** (revalidations jusqu’au **29 oct. 2026**), `Annexe N` **au 1er nov. 2026** (pp. 661–673) | `Annexe B` (pp. 586–593 : **159 entrées** `S-001..S-159`) et `Annexe I` (pp. 594–660 : **999 notices** ; Vol. II–III sans biblio structurée en `Ann. I.2`) |
| `CAD26` — `2026/documents/Cadre de Référence.pdf` (**351 p.**) | `CRE-IA-2026-01` v1.2, 15 ch., Ann. `A–H` · Gel **28 oct. 2026**, `Annexe H` **et v1.2** (`305 EXIG-*` : `287` v1.1 + `12 EXIG-AMF` + `6` ajouts) | **496 références** : `Annexe G` (pp. 313–339 : **474 entrées**, soit `[1..473]` + `[496]`) et `Annexe H` (`[474]..[495]`, pp. 339–351) ; registre `exigences.json` et `Ann. D` |
| **Profil québécois** `AMF IA` — `2026/documents/Note AMF IA.pdf` (**49 p.**) | `CRE-IA-2026-01-QC` v1.0 (**31 oct. 2026**, actualisation **11 nov. 2026**, Ann. H) · Décloisonne la *Ligne directrice sur l’utilisation de l’IA* (`AMF`, 17 p., prise d’effet **1er mai 2027** D `ANC-112`) | **41 attentes** en 5 familles (`AMF-G` : 12, `AMF-R` : 6, `AMF-C` : 5, `AMF-V` : 9, `AMF-P` : 9) traduites en **12 exigences** `EXIG-AMF-01..12` (`Borealis-Bench/collecte-ouverte/extract-note-amf-ia.json`) |
| `C27` — `2027/CompendiumMaster.pdf` (**1 117 p.**) | Ouverture, 10 parties, 50 ch., 31 volets, Ann. `A–H` · Gel **14 nov. 2026**, lots ouverts **19 nov. 2026** (`31 ADR`, `75` `PRR`) | `Annexe E` (pp. 1097–1102 : sources primaires, `H1-juridique-ouvert.json`, `H2-mlr-prisma.json`) et refonte MLR PRISMA-ScR/Garousi en `ch. 48 § 48.12` (`160` textes intégraux OA, `33,75 %` arbitrés, `0,0 %` résumés, `24` DOI ajoutés) |
| `PD28` — `2028-2035/PlanDirecteurMaster.pdf` (**400 p.**) | 6 parties, `M-1` à `M-26`, Ann. `A–H` · Gel **16 nov. 2026**, complété **19 nov. 2026** (`52 CAP`, `24 PEX`, `43 INI`, `15 POR`, `27 SIG`) | `Annexe H` (pp. 390–400 : **98 textes** `L+` adossant `67` **ancres** dont `ANC-112..121` et `25` administrations publiques, complétés par `35` **DOI *Open Access* évalués par les pairs** en `H.9` et le banc FEDS/EMA `Borealis-Bench/feds-ema/` `DC-P12`) |

### D.2 Table d’orientation (`Ch. 1–12` → quatre PDF)

| Chapitre | `C26` | `CAD26` | `C27` | `PD28` |
| --- | --- | --- | --- | --- |
| **Ch. 1** — Preuve & thèse | ch. 1, 7, 35, 42, 43, 49–50, Ann. B, N | ch. 1, 2, 4, 7, 8, 10, Ann. H | § 0.2, 0.5, ch. 1–4, 16, 17, 21, 40, 42, 48–50, Ann. E, F.3 | M-1, M-2, M-6 à M-8 |
| **Ch. 2** — Modèles & `DIV-02` | ch. 7, 41–44 | Sommaire, ch. 4, 5, 11, 13, 14, Ann. A, D, H | § 0.1, 0.4, ch. 1, 20, 23, 26, 27, 43, Ann. F | M-2, M-9 à M-13, Ann. E |
| **Ch. 3** — Protocoles & `PEP` | ch. 7–11, 37, 42, Ann. N.2 | ch. 6, § 9.4 (Fig. 18), § 11.7, Ann. H.2, H.4 | ch. 5–11, 19, 24, 26, 27, § 49.7 | M-4, M-11, M-13 |
| **Ch. 4** — Contexte & `CoALA` | ch. 2, 5, 34, 43 (`PC4` `[S]`) | § 5.2 (C5–C6), § 5.5 (Fig. 4, Tab. 13), ch. 12 | § 3.3, ch. 12–15, 25, 28 | M-4 (§ 4.5), M-10, M-13 |
| **Ch. 5** — Durable & sagas | § 1.5.2, ch. 22, 29, 31, 48 | § 5.2, ch. 7 (Tab. 24 & 26) | ch. 16–21 | M-9, M-10, M-13 |
| **Ch. 6** — Autonomie & `CIBA` | ch. 14, 17, 27, 29, 31, 43, Ann. N.3 | ch. 8 (Fig. 16), ch. 11, § 12.2, ch. 14 | § 0.4, ch. 22, § 30.4/30.9, ch. 38, 41 | M-7, M-12, M-24, M-26 |
| **Ch. 7** — Confiance & `PQC` | ch. 14, 16–21, Ann. N.2 | ch. 9 (Tab. 39), Tab. 10, Ann. H.2, H.5 | ch. 29–32, § 49.5–49.7 | M-5 (§ 5.1–5.5) |
| **Ch. 8** — `OTel`, audit & `CPO` | ch. 38–40, Ann. N.2 | ch. 10, Tab. 10, Ann. H.2 | ch. 33, 34, 40 | M-7, M-24 (§ 24.4) |
| **Ch. 9** — Substrats & B2B | ch. 47, 50 | § 5.2–5.3, ch. 6, 9, 11–13 | ch. 37, 44–46 | M-11, M-13 |
| **Ch. 10** — Droit & `24 PEX` | ch. 25–36, Ann. N.3 | ch. 12, Ann. H.3, H.5 | ch. 35–38 | M-3, M-14 à M-18, Ann. D |
| **Ch. 11** — 3 lignes & usine | ch. 24, 36, 39, 41, 47 | ch. 11, 13 | ch. 27, 37, 39, 41, 47 | M-11, M-20–M-24, M-26 |
| **Ch. 12** — Portes & `DAPP` | ch. 46, 50 | ch. 14, 15, Ann. A | ch. 43, Ann. F.4, Ann. G | M-19 à M-26 |

### D.3 Parcours de lecture par rôle

- `AE` **:** Synthèse → Ch. 1–2 → Ch. 6 (§ 6.1, 6.3) → Ch. 10–12 → Annexes A, B, C, E, F.
- `AS` **:** Synthèse → Ch. 2 (§ 2.4) → Ch. 3–9 → Annexes A.3, B.2, C.1, E, F.
- **Sécurité /** `IAM` **:** Ch. 3 (§ 3.2–3.3) → Ch. 6 (§ 6.2) → Ch. 7 → Ch. 9 (§ 9.2–9.3) → Annexe C (`A.5–A.6`, `PRR S-*` / `C27 Ann. G.1`) → Annexes E–F.
- `SRE` **/** `AgentOps` **:** Ch. 5 (§ 5.3–5.4) → Ch. 8 → Ch. 9 (§ 9.1–9.2) → Ch. 11 (§ 11.2) → Annexe C (`A.4, A.7`, `PRR R-*, O-*` / `C27 Ann. G.2–G.3`) → Annexes E–F.
- **Conformité / Audit :** À propos → Ch. 1 (§ 1.3) → Ch. 6 (§ 6.3–6.4) → Ch. 8 (§ 8.2) → Ch. 10–12 → Annexes A.4, C, D.4, E–F.

### D.4 Bilan honnête des limites héritées

1. **Textes** `statut F` **(aucune obligation** `[N]` **nouvelle) :** téléchargements HTTPS automatisés sur `lautorite.qc.ca` bloqués par `HTTP 403` sans contournement (`T-01`, `T-02`, `T-13..15`, `T-25`, `N-03` — compensés pour la *Ligne directrice AMF IA* par le décloisonnement de `2026/documents/Note AMF IA.pdf`, `CRE-IA-2026-01-QC`, `41` attentes et `12 EXIG-AMF`, recoupé avec `C26 Annexe N.3`), codifications **LégisQuébec** (`RLRQ c. P-39.1`, `A-32.1`, `D-9.2`, `R-22.1`, compensées par les lois `L+`), page `T-03` du Conseil du Trésor (visant les seules administrations publiques fédérales), notes `T-24`/`N-08` (`OCRI`) et `R-11` (`OICV`), normes sous licence (`FDX v6.0`, `ACORD`, `CSIO`, `ISO/IEC 42001`, `ISO/IEC 42105`, `TOGAF`, `UIT-T F.748.93`), ainsi que les **lots de remédiation non déposés** `P1-B2` **à** `P1-B4` **et** `P3-L2` (`C27`, groupant pièces `AMF`, `SCT`, `Loi 25` et rapports d’éditeurs).
2. **Intégration** `CRE-IA-2026-01` **v1.2 et retraits :** les `12 EXIG-AMF-01..12` issues des `41` **attentes** de `2026/documents/Note AMF IA.pdf` (`CRE-IA-2026-01-QC`, anciens `9` reports de `CAD26 Annexe H.3`) ainsi que `6` ajouts (PQC, `ACVM 11-348`, `RTR`, `EN 18286:2026`) sont désormais intégrés au socle unifié `305 EXIG-*` **v1.2** (`255 DOIT`, `34 NE DOIT PAS`, `16 DEVRAIT` ; avec rectification des coquilles internes v1.1 : fantôme `EXIG-APP-18` p. 32, renvoi `EXIG-APP-12` au lieu d’`EXIG-APP-17` sous `EXIG-APP-16` p. 233, fantôme `EXIG-MEM-01` au lieu d’`EXIG-ARC-22` pp. 258 et 342, et renvois `EXIG-ARC-02` au lieu d’`EXIG-ARC-21` aux pp. 195 [×2], 196, 229, 252 et 257). Dans `C26 § 50.4`, **six annexes et l’avant-propos ont été retirés** le 2 sept. 2026 (`Q-A..Q-E`, `AgentMesh`, `AgentOps`, `PC1–PC5` et `ch. 41, 43, 47, 48` restant `[S]`). Dans `PD28`, `M-12` (p. 171) plafonne `D6` au `Stade 3` interne et `D7` au `Stade 3`, en dissonance avec `M-15` (p. 203) et `M-18` (§ 18.4, Fig. 5 p. 245) qui les cotent aux `Stades 3–4`.
3. **Absence de relecture humaine intégrale :** dans `C27` (note interne `74/100` établie sur `1 018` sources avant clôture à `1 033`, 31 volets à `0` source, cas fictif *Groupe Boréal Inc.* exclu), **aucune des dix parties n’a fait l’objet d’une relecture humaine** (ni les 193 ajouts du 14 nov. d’un second audit) ; dans `PD28`, les `26` **chapitres et** `8` **annexes** n’ont pas été relus intégralement par une personne physique.

## Annexe E — Glossaire des sigles, acronymes et repères (`385` entrées)

Ce glossaire recense par ordre alphabétique les **385 sigles, acronymes, notations normatives et abréviations** employés dans le présent mémoire (`Ch. 1–12` et `Annexes A–F`), sans prescription de produit commercial (`CA-08`). Les textes demeurés au `statut F` et les cadres propres aux administrations publiques y sont explicitement qualifiés.

| Sigle | Développement | Rôle et ancrage dans le mémoire |
| --- | --- | --- |
| `A2A` | *Agent2Agent Protocol* (Linux Foundation, `v1.0.1`) | Protocole ouvert d’échange pair-à-pair entre agents via cartes signées (`Ch. 3`, `EXIG-A2A-*`) |
| `AAIF` | *Agentic AI Foundation* (Linux Foundation) | Gouvernance ouverte hébergeant les feuilles de route `MCP` et l’identité d’agents (`Ch. 3`) |
| `AAS` | *Asset Administration Shell* | Enveloppe normalisée de jumeau numérique industriel à la frontière `OT` (`Ch. 4`, `CAP-028`) |
| `ABB` | *Architecture Building Block* | Bloc d’architecture neutre et durable, découplé des `SBB` substituables (`Ch. 2`, `EXIG-ARC-20`) |
| `ACDC` | *Authentic Chained Data Container* | Conteneur cryptographique chaîné adossé à `KERI` pour la provenance vérifiable (`Ch. 9`) |
| `ACFC` | Agence de la consommation en matière financière du Canada | Autorité fédérale de protection des consommateurs financiers (`Ch. 10`, `PEX-004`) |
| `ACID` | *Atomicity, Consistency, Isolation, Durability* | Propriétés transactionnelles des systèmes d’enregistrement, remplacées en distribué par les sagas (`Ch. 5`) |
| `ACL` | *Access Control List* | Liste de contrôle d’accès filtrée en amont du `KV-cache` sous identité mandante (`Ch. 4`, `EXIG-ARC-16`) |
| `ACME` | *Automatic Certificate Management Environment* (`RFC 8555`) | Protocole d’automatisation du renouvellement `TLS` face aux plafonds `100 j` / `47 j` (`Ch. 7`, `POR-007`) |
| `ACORD` | *Association for Cooperative Operations Research and Development* | Normes sectorielles d’assurance (`statut F` sous licence dans ce corpus ; `Ch. 10`, `SIG-110`) |
| `ACP` | *Agent Communication Protocol* | Protocole d’échange agentique fusionné vers `A2A` (`Ch. 3`) |
| `ACVM` | Autorités canadiennes en valeurs mobilières | Regroupement des régulateurs provinciaux des marchés de capitaux (`Avis 11-348`, `NI 31-103`, `Ch. 10`) |
| `ADK` | *Agent Development Kit* | Trousse logicielle d’assemblage d’agents, confinée derrière les contrats `ABB` (`Ch. 2`) |
| `ADR` | *Architecture Decision Record* | Décision d’architecture tracée (`31` décisions `C27` consolidées en `Annexe B`) |
| `AE` | Architecte d’entreprise | Rôle responsable du portefeuille `52 CAP`, des `15 POR`, des `27 SIG` et de la gouvernance (`Ch. 1–12`) |
| `AG-UI` | *Agent-User Interaction Protocol* | Protocole de flux d’interface utilisateur entre un agent et un poste humain (`Ch. 3`, `Ch. 6`) |
| `AGENTPROTO` | *IETF AI Agent Protocols Working Group* | Groupe de travail `IETF` sur les protocoles agentiques surveillé sous `SIG-004` (`Ch. 3`, `Ch. 12`) |
| `AGNTCY` | *AGNTCY Collective* | Initiative ouverte d’interopérabilité multiagents, non retenue comme norme (`Ch. 3`) |
| `AICA` | Association internationale des contrôleurs d’assurance (`IAIS`) | Instance internationale publiant le document d’application IA en assurance (`Ch. 10`) |
| `AIE` | Agence internationale de l’énergie (`IEA`) | Source primaire des projections électriques mondiales des centres de données (`Ch. 8`, `SIG-016`) |
| `AIIM` | *AI Incident Management* | Gestion structurée des incidents liés aux systèmes d’IA (`Ch. 8`, `Ch. 11`) |
| `AIMS` | *Agent Identity Management System* (`IETF WIMSE`) | Architecture d’identité des charges agentiques en cours de normalisation (`Ch. 7`, `SIG-003`) |
| `AMF` | Autorité des marchés financiers (Québec) | Régulateur financier québécois (*Ligne directrice IA* au 1er mai 2027 D ; portail Web en `statut F`) |
| `AMF-C` | Famille *Conception et développement* (`Note AMF IA`) | Cinq attentes de la *Note AMF IA* intégrées dans `CRE-IA-2026-01` v1.2 (`Ch. 10`, `Annexe D`) |
| `AMF-G` | Famille *Gouvernance* (`Note AMF IA`) | Douze attentes de gouvernance IA de la *Note AMF IA* (`Ch. 10`, `Annexe D`) |
| `AMF-P` | Famille *Protection des consommateurs* (`Note AMF IA`) | Neuf attentes de transparence et d’équité client de la *Note AMF IA* (`Ch. 10`, `Annexe D`) |
| `AMF-R` | Famille *Gestion des risques* (`Note AMF IA`) | Six attentes de gestion du risque de modèle et tiers de la *Note AMF IA* (`Ch. 10`, `Annexe D`) |
| `AMF-V` | Famille *Validation et surveillance* (`Note AMF IA`) | Neuf attentes de validation indépendante et suivi continu de la *Note AMF IA* (`Ch. 10`, `Annexe D`) |
| `AMOPS` | *Architecture, Modernization, Operations and Security* (SCT Canada) | Feuille de route PQC visant uniquement les administrations publiques fédérales (`Ch. 7`, `Ch. 12`) |
| `ANC` | Ancre chronologique (`PD28`) | Repère daté vérifié (`67` ancres `ANC-*`, dont `25` propres aux administrations publiques ; `Ch. 12`) |
| `AP2` | *Agent Payments Protocol* | Proposition de protocole de paiement agentique non retenue en norme obligatoire (`Ch. 3`, `Ch. 9`) |
| `API` | *Application Programming Interface* | Interface applicative structurée, exigée en remplacement du grattage `CUA` (`Ch. 4`, `POR-008`) |
| `APM` | *Agentic Process Management* | Discipline de gouvernance des processus intégrant des agents sous enveloppes `OO1–OO4` `[S]` (`Ch. 5`) |
| `AS` | Architecte de solutions | Rôle responsable des `SBB`, de la passerelle `PEP`, des sagas, de `CIBA` et des bancs `E1–E3` (`Ch. 1–12`) |
| `ASI` | *OWASP Top 10 for Agentic Applications* (`ASI01–ASI10`) | Taxonomie `OWASP` des dix risques majeurs propres aux applications agentiques (`Ch. 7`) |
| `AST` | *Abstract Syntax Tree* | Arbre syntaxique abstrait utilisé par `CaMeL` pour isoler flux de contrôle et données (`Ch. 7`) |
| `ATLAS` | *MITRE Adversarial Threat Landscape for AI Systems* | Base de tactiques et techniques adverses ciblant les systèmes d’IA (`Ch. 7`, `Ch. 8`) |
| `B2B` | *Business-to-Business* | Échanges inter-entreprises encadrés par `vLEI`, `ODRL 2.2` et cellules Diplomate/Évaluateur (`Ch. 9`) |
| `BMO` | Banque de Montréal | Exemple d’institution financière citée dans l’analyse de marché canadienne (`Ch. 1`) |
| `BSIF` | Bureau du surintendant des institutions financières (`OSFI`) | Régulateur prudentiel fédéral canadien (`E-23`, `B-10`, `B-13`, `B-15`, `E-21`, `B-9` ; `Ch. 10`) |
| `C1` | Couche 1 *Interaction et exposition* (`PD28`) | Couche pivot des canaux humains, postes de supervision et points d’entrée externes (`Ch. 2`, `Annexe A`) |
| `C2` | Couche 2 *Orchestration et autonomie* (`PD28`) | Couche pivot des moteurs durables, sagas, topologies et plafonds d’action (`Ch. 2`, `Ch. 5`) |
| `C26` | *Compendium 2026* (`2026/documents/Compendium.pdf`, `673` p.) | Premier volume du corpus : socle analytique des protocoles, `OO1–OO4` `[S]` et matrice `0/15` `[S]` |
| `C27` | *Compendium 2027* (`2027/CompendiumMaster.pdf`, `1 117` p.) | Troisième volume du corpus : `50` chapitres sourcés, `31 ADR` et `75` points `PRR` |
| `C3` | Couche 3 *Sémantique, contexte et mémoire* (`PD28`) | Couche pivot reliant glossaire métier, contexte compilé et mémoires `CoALA` (`Ch. 2`, `Ch. 4`) |
| `C4` | Couche 4 *Outils, données et patrimoine* (`PD28`) | Couche pivot des passerelles `MCP`, adaptateurs `EBCDIC`/`COMP-3` et systèmes maîtres (`Ch. 2`, `Ch. 4`) |
| `C5` | Couche 5 *Inférence et substrats* (`PD28`) | Couche pivot de la passerelle de modèles, des six substrats et des bacs à sable (`Ch. 2`, `Ch. 9`) |
| `C6` | Couche 6 *Systèmes d’enregistrement* (`CAD26 § 5.2`) | Sixième vraie couche de `CAD26` isolant les systèmes maîtres de tout `SQL` direct (`Ch. 2`, `Annexe A`) |
| `CA` | Critère d’acceptation (`CA-01` à `CA-16`) | Batterie de `16` contrôles mécanisés exécutés par `verifie.py` (`À propos`, `Ch. 12`) |
| `CA/B` | *Certification Authority / Browser Forum* | Forum fixant la durée maximale des certificats `TLS` (`100 j` en 2027, `47 j` en 2029 ; `Ch. 7`) |
| `CAD26` | *Cadre de référence 2026* (`CRE-IA-2026-01` v1.2, `351` p.) | Norme interne de référence établissant `12 PRIN-*` et `305 EXIG-*` (`À propos`, `Annexe A`) |
| `CAEP` | *Continuous Access Evaluation Protocol* (`OpenID SSF`) | Protocole de révocation continue de session et de jeton en `<= 15 min` (`Ch. 7`, `EXIG-IAM-20`) |
| `CAI` | Commission d’accès à l’information du Québec | Autorité de surveillance de la `Loi 25` et de l’`art. 12.1` (`Ch. 6`, `Ch. 10`) |
| `CaMeL` | *CApabilities for MachinE Learning* (Debenedetti et al.) | Patron de séparation flux de contrôle / flux de données contre l’injection de consigne (`Ch. 7`, `EXIG-SEC-07`) |
| `CANAFE` | Centre d’analyse des opérations et déclarations financières | Unité canadienne du renseignement financier encadrant `LRPCFAT` (`Ch. 10`, `PEX-004`) |
| `CAP` | Capacité d’entreprise (`PD28`, `52` entrées `CAP-001..052`) | Brique capacitaire cible reliée aux `305 EXIG-*` dans l’`Annexe A` (`Ch. 2`, `Ch. 12`) |
| `CC BY` | *Creative Commons Attribution 4.0 International* | Licence des textes, registres et figures du mémoire (`DC-P01`, `Memoire/LICENSE`) |
| `CCCS` | Centre canadien pour la cybersécurité | Organisme fédéral publiant les avis PQC pour les administrations publiques (`Ch. 7`, `Annexe F`) |
| `CCRRA` | Conseil canadien des responsables de la réglementation d’assurance | Instance interprovinciale publiant la directive de traitement équitable des clients (`Ch. 10`) |
| `CI/CD` | *Continuous Integration / Continuous Delivery* | Chaîne d’intégration portant les bancs `E1–E3` et le manifeste d’homologation YAML (`Ch. 8`, `Ch. 12`) |
| `CIBA` | *Client-Initiated Backchannel Authentication* (`OpenID Connect`) | Authentification humaine hors bande liant l’approbation `P3` au condensé `JCS SHA-256` (`Ch. 6`) |
| `CIBC` | Banque Canadienne Impériale de Commerce | Exemple d’institution financière mentionné dans l’état des lieux canadien (`Ch. 1`) |
| `CoALA` | *Cognitive Architectures for Language Agents* (Sumers et al.) | Taxonomie séparant mémoire de travail, épisodique, sémantique et procédurale (`Ch. 4`) |
| `COBOL` | *Common Business-Oriented Language* | Langage historique des grands systèmes bancaires accédés via adaptateurs stricts (`Ch. 4`, `CAP-024`) |
| `COMMAREA` | *Communication Area* (moniteur transactionnel) | Zone mémoire fixe des transactions patrimoniales encadrée par schémas typés (`Ch. 4`) |
| `COMP-3` | *Computational-3* (décimal condensé `BCD`) | Format numérique mainframe converti en type `Decimal` exact sans flottant binaire (`Ch. 4`, `CAP-024`) |
| `COSE` | *CBOR Object Signing and Encryption* (`RFC 9052`) | Format binaire de signature utilisé notamment par `SCITT` (`RFC 9943`) (`Ch. 7`) |
| `CP037` | *Code Page 037* (`EBCDIC` Amérique du Nord) | Page de code mainframe à transcodage contrôlé vers `UTF-8` (`Ch. 4`) |
| `CP1147` | *Code Page 1147* (`EBCDIC` France/Québec avec euro) | Page de code francophone à convertir sans perte de diacritiques (`Ch. 4`) |
| `CPO` | *Cost-per-Outcome* (coût complet par résultat conforme) | Indicateur `FinOps` rapportant le coût total au résultat métier validé (`Ch. 8`, `POR-016`) |
| `CPU` | *Central Processing Unit* | Processeur généraliste évalué face aux accélérateurs pour les `SLM` (`Ch. 9`) |
| `CRA` | *Cyber Resilience Act* (`Règlement (UE) 2024/2847`) | Règlement européen de cybersécurité des produits numériques (`Ch. 10`, `Annexe F`) |
| `CRDT` | *Conflict-free Replicated Data Type* | Structure répliquée sans conflit écartée pour les soldes financiers stricts (`Ch. 4`, `Ch. 5`) |
| `CRE-IA` | Cadre de référence d’entreprise pour l’IA (`CRE-IA-2026-01`) | Cote normative de `CAD26` v1.2 et du profil québécois `CRE-IA-2026-01-QC` (`À propos`) |
| `CRM` | *Customer Relationship Management* | Système de gestion de la relation client protégé contre l’écriture directe non médiée (`Ch. 4`) |
| `CRUD` | *Create, Read, Update, Delete* | Opérations de base classifiées en `P0–P3` selon leur réversibilité et leur impact (`Ch. 3`, `Ch. 6`) |
| `CSA` | *Cloud Security Alliance* | Organisme publiant des cadres de sécurité infonuagique et agentique (`Ch. 7`) |
| `CSF` | *Cybersecurity Framework* (`NIST`) | Cadre de gestion des risques de cybersécurité utilisé comme repère transversal (`Ch. 7`) |
| `CSIO` | Centre d’étude de la pratique d’assurance (`Centre for Study of Insurance Operations`) | Normes canadiennes d’assurance de dommages (`statut F` sous licence ; `Ch. 10`, `SIG-110`) |
| `CUA` | *Computer-Use Agent* | Agent pilotant une interface graphique, confiné sous dérogation et éteint sous `12 mois` (`Ch. 4`, `INI-015`) |
| `D1` | Domaine `D1` *Distribution et service client* (`PD28 M-12`) | Premier des huit domaines métier de la matrice d’autonomie (`Ch. 6`) |
| `D2` | Domaine `D2` *Octroi de crédit et tarification* (`PD28 M-12`) | Domaine plafonné aux `Stades 2–3`, exclu du `Stade 4` (`Ch. 6`, `Ch. 12`) |
| `D3` | Domaine `D3` *Paiements et trésorerie* (`PD28 M-12`) | Domaine des flux financiers irréversibles `P3` et rails `RTR` `pacs.008` (`Ch. 6`, `Ch. 10`) |
| `D4` | Domaine `D4` *Indemnisation et sinistres* (`PD28 M-12`) | Domaine d’assurance soumis aux exigences `AMF`, `CCRRA` et `Loi 25 art. 12.1` (`Ch. 6`, `Ch. 10`) |
| `D5` | Domaine `D5` *Gestion de patrimoine et marchés* (`PD28 M-12`) | Domaine soumis à `NI 31-103`, `OCRI` et `ACVM 11-348` (`Ch. 6`, `Ch. 10`) |
| `D6` | Domaine `D6` *Conformité, fraude et lutte antiblanchiment* (`PD28 M-12`) | Domaine plafonné au `Stade 3` interne en `M-12` (`Ch. 6`, `Ch. 12`) |
| `D7` | Domaine `D7` *Ingénierie logicielle et exploitation TI* (`PD28 M-12`) | Domaine de l’usine logicielle `Oracle`/`Bâtisseur` (`Ch. 11`, `Annexe D`) |
| `D8` | Domaine `D8` *Fonctions de soutien et finance interne* (`PD28 M-12`) | Domaine de soutien interne servant de rampe aux premiers cas encadrés (`Ch. 6`) |
| `DAPP` | *Dynamic Adaptive Policy Pathways* (Haasnoot et al.) | Méthode de trajectoire adaptative par paliers `P1–P3`, `15 POR` et `27 SIG` (`Ch. 12`) |
| `DAWN` | *IETF Discovery, Authorization, and Workflows for Networked Agents* | Groupe `IETF` sur la découverte et l’autorisation d’agents (`Ch. 3`, `SIG-004`) |
| `DC-P01` | Décision de programme `DC-P01` | Mention obligatoire de production et vérification 100 % IA à fin de consultation `AE`/`AS` (`À propos`) |
| `DC-P07` | Décision de programme `DC-P07` | Typage explicite des rattachements `DIV-02` et double justification (`Ch. 2`, `Annexe A`) |
| `DC-P09` | Décision de programme `DC-P09` | Cible éditoriale aérée v1.2 de `115–125` pages avec polices `>= 7,0 pt` (`À propos`, `verifie.py`) |
| `DCR` | *Dynamic Client Registration* (`RFC 7591`) | Enregistrement dynamique de client `OAuth`, encadré par politique de registre (`Ch. 3`, `Ch. 7`) |
| `DDR5` | *Double Data Rate 5* | Mémoire vive serveur influençant la latence d’inférence et les attaques matérielles (`Ch. 9`) |
| `DDS` | *Data Distribution Service* | Bus temps réel utilisé par `ROS 2` à la frontière périphérique `OT` (`Ch. 9`) |
| `DEC` | Décision d’architecture stratégique (`PD28`, `12` entrées `DEC-001..012`) | Arbitrage directeur du plan 2028–2035 consolidé en `Annexe B` (`Ch. 2`, `Ch. 11`) |
| `DEVRAIT` | Niveau normatif *recommandation* (`CAD26`, `16` exigences) | Exigence recommandée distincte des obligations `DOIT` et des interdits `NE DOIT PAS` (`Annexe C`) |
| `DID` | *Decentralized Identifier* (`W3C v1.1`) | Identifiant décentralisé vérifiable envisagé pour la fédération B2B (`Ch. 9`, `Annexe F`) |
| `DIF` | *Decentralized Identity Foundation* | Consortium technique d’identité décentralisée suivi en veille (`Ch. 9`) |
| `DIV-02` | Divergence `DIV-02` (*corpus 2026 absent dans* `PD28`) | Écart de raccordement entre `CAD26` et `PD28`, refermé sur pièce en `Annexe A` (`À propos`, `Ch. 2`) |
| `DMN` | *Decision Model and Notation* (`OMG`) | Notation déterministe de tables de décision exécutées hors modèle probabiliste (`Ch. 4`, `Ch. 5`) |
| `DOI` | *Digital Object Identifier* | Identifiant pérenne de publication scientifique recensé en `Annexe F` (`Annexe F`) |
| `DOIT` | Niveau normatif *obligation* (`CAD26`, `255` exigences v1.2) | Exigence impérative soumise à preuve système à la porte d’homologation (`Annexe C`) |
| `DORA` | *Digital Operational Resilience Act* (`Règlement (UE) 2022/2554`) | Règlement européen sur la résilience opérationnelle numérique financière (`Ch. 10`, `SIG-002`) |
| `DORS` | Décrets, ordonnances et règlements statutaires (Canada) | Cote des règlements fédéraux canadiens (`DORS/92-330`, `DORS/2021-181`, `DORS/2026-133` ; `Ch. 10`) |
| `DPoP` | *Demonstrating Proof-of-Possession* (`RFC 9449`) | Liaison cryptographique du jeton `OAuth` à la clé du client contre le rejeu (`Ch. 7`, `EXIG-IAM-14`) |
| `DR` | *Disaster Recovery* (reprise après sinistre) | Plan de continuité et de reprise manuelle vérifié annuellement (`Ch. 9`, `POR-009`) |
| `E1` | Niveau d’évaluation `E1` *Tests unitaires et déterministes* | Premier niveau du harnais `E1–E3` bloquant la fusion en `CI/CD` (`Ch. 8`, `EXIG-EVA-02`) |
| `E2` | Niveau d’évaluation `E2` *Scénarios multi-essais* `pass^k` | Banc d’évaluation comportementale (`>= 50` scénarios `x 3` ; `Ch. 8`, `EXIG-EVA-03`) |
| `E3` | Niveau d’évaluation `E3` *Équipe rouge et dérive en production* | Tests adverses continus et détection de dérive post-déploiement (`Ch. 8`, `EXIG-EVA-05`) |
| `EBCDIC` | *Extended Binary Coded Decimal Interchange Code* | Encodage historique mainframe converti explicitement à la frontière d’adaptateur (`Ch. 4`, `CAP-024`) |
| `ECDSA` | *Elliptic Curve Digital Signature Algorithm* | Signature classique à remplacer graduellement par `ML-DSA`/`SLH-DSA` en trajectoire PQC (`Ch. 7`) |
| `EDC` | *Eclipse Dataspace Components* | Connecteur ouvert d’espace de données fédéré gouverné par `ODRL 2.2` (`Ch. 9`, `CAP-027`) |
| `EDI` | *Electronic Data Interchange* | Échange de données informatisé sectoriel (`X12`, `EDIFACT`, `CSIO` ; `Ch. 4`, `Ch. 10`) |
| `EDIFACT` | *EDI for Administration, Commerce and Transport* | Standard d’échange structuré encadré par adaptateurs typés (`Ch. 4`) |
| `ÉFVP` | Évaluation des facteurs relatifs à la vie privée | Obligation préalable de la `Loi 25 art. 3.3` avant tout transfert ou traitement à risque (`Ch. 10`, `Ch. 12`) |
| `EN` | Norme européenne (`CEN/CENELEC`, ex. `EN 18286:2026`) | Norme harmonisée de soutien au `RIA` intégrée au socle `CAD26` v1.2 (`Ch. 10`, `Annexe F`) |
| `EO` | *Executive Order* (États-Unis, ex. `EO 14412`) | Décret exécutif américain visant les seules administrations publiques fédérales (`Ch. 7`, `Ch. 12`) |
| `EPP` | *Endpoint Protection Platform* | Protection des postes et serveurs complétée par l’isolation microVM des agents (`Ch. 7`) |
| `ERP` | *Enterprise Resource Planning* | Progiciel de gestion intégré appartenant aux systèmes d’enregistrement (`C6`) (`Ch. 4`) |
| `ES256` | *ECDSA using P-256 and SHA-256* (`JOSE`) | Algorithme classique de `CAD26 Annexe H.5` à doubler en hybride PQC (`Ch. 7`) |
| `EU` | *European Union* (Union européenne, `UE`) | Juridiction d’application du `RIA`, de `DORA`, du `CRA` et du `Data Act` (`Ch. 10`) |
| `EUCS` | *European Cybersecurity Certification Scheme for Cloud Services* | Schéma européen de certification infonuagique suivi comme repère de souveraineté (`Ch. 9`) |
| `EXIG` | Exigence normative (`CAD26` v1.2, `305` entrées `EXIG-*`) | Prescriptions impératives ou recommandées couvrant `12` familles techniques et réglementaires (`Annexe A`, `Annexe C`) |
| `F1` | Porte `F1` (*Fondation des registres*) | Jalon interne de vérification des registres JSON et annexes générées (`verifie.py`) |
| `FAR` | *False Acceptance Rate* | Taux de fausse acceptation mesuré sur les garde-fous et classifieurs (`Ch. 8`) |
| `FDX` | *Financial Data Exchange* (`v6.0`) | Norme de partage bancaire ouvert (`statut F` sous licence dans ce corpus ; `Ch. 10`, `SIG-110`) |
| `FEI` | *Federated Enterprise Identity* | Fédérations d’identité inter-organisations pour échanges agentiques (`Ch. 7`, `Ch. 9`) |
| `FIBO` | *Financial Industry Business Ontology* (`EDM Council`) | Ontologie ouverte du domaine financier servant de socle sémantique `C3` (`Ch. 4`, `Annexe F`) |
| `FIDO` | *Fast IDentity Online* | Alliance normalisant l’authentification forte résistante à l’hameçonnage (`Ch. 6`) |
| `FIDO2` | *FIDO2 / WebAuthn* | Authentification matérielle couplée à `CIBA` pour signer les approbations `P3` (`Ch. 6`, `EXIG-AUT-15`) |
| `FinOps` | *Financial Operations* (gouvernance économique infonuagique et IA) | Discipline pilotant le `CPO`, l’attribution `FOCUS 1.4` et les budgets d’erreur (`Ch. 8`) |
| `FIPS` | *Federal Information Processing Standards* (`NIST`) | Normes cryptographiques fédérales américaines (`FIPS 140-3`, `203`, `204`, `205` ; `Ch. 7`) |
| `FOCUS` | *FinOps Open Cost and Usage Specification* (`v1.4`) | Schéma ouvert de facturation et d’allocation des coûts d’inférence (`Ch. 8`, `CAP-049`) |
| `G7` | Groupe des Sept (`G7 Cyber Expert Group`) | Source de la feuille de route coordonnée PQC du secteur financier (`2030–2032` A, `2035` A ; `Ch. 7`, `Ch. 12`) |
| `GFM` | *GitHub Flavored Markdown* | Dialecte Markdown des manuscrits source compilés par Pandoc et Typst (`assemble.py`) |
| `GLEIF` | *Global Legal Entity Identifier Foundation* | Fondation gérant l’écosystème `LEI` et `vLEI` pour les mandats B2B (`Ch. 9`, `Annexe F`) |
| `GOV-17` | Dix interdictions sans dérogation (`EXIG-GOV-17`) | Noyau dur absolu ne tolérant aucune dérogation à l’homologation (`Ch. 12`, `Annexe C`) |
| `GPAI` | *General-Purpose AI* (`RIA` chap. V) | Modèles d’IA à usage général encadrés par le règlement européen (`Ch. 10`) |
| `GPU` | *Graphics Processing Unit* | Accélérateur d’inférence dimensionné selon latence, souveraineté et empreinte énergétique (`Ch. 8`, `Ch. 9`) |
| `HAI` | *Stanford Institute for Human-Centered AI* | Éditeur de l’*AI Index Report 2026* cité sur l’économie et les compétences (`Ch. 1`, `Annexe F`) |
| `HITL` | *Human-in-the-Loop* | Supervision humaine synchrone obligatoire sur les actions `P3` (`Ch. 6`, `EXIG-AUT-09`) |
| `HMAC` | *Hash-based Message Authentication Code* | Code d’authentification à clé secrète, écarté au profit de `SHA-256(JCS)` pour l’idempotence (`Ch. 5`) |
| `HSM` | *Hardware Security Module* | Module matériel sécurisé protégeant les clés de signature et de chiffrement (`Ch. 7`, `Ch. 9`) |
| `HTML` | *HyperText Markup Language* | Format de la présentation interactive autonome `Memoire/Presentation.html` (`WCAG 2.1 AA`) |
| `HTTP` | *Hypertext Transfer Protocol* | Protocole de transport exposant le risque `HTTP 431` sous jetons `ML-DSA` volumineux (`Ch. 7`, `POR-007`) |
| `HTTPS` | *HTTP Secure* | Transport chiffré `TLS 1.3` à rotation automatisée (`ACME` `100 j` puis `47 j` ; `Ch. 7`) |
| `HYOK` | *Hold Your Own Key* | Maîtrise exclusive des clés de chiffrement chez l’institution (`RTT <= 35 ms` conseillé ; `Ch. 9`) |
| `IA` | Intelligence artificielle | Champ technologique encadré par le corpus `2026–2035` (`À propos`, `Ch. 1–12`) |
| `IAM` | *Identity and Access Management* | Gestion des identités humaines et non humaines (`NHI`) et de la délégation (`Ch. 7`, `EXIG-IAM-*`) |
| `IBM` | *International Business Machines* | Écosystème mainframe historique cité pour `EBCDIC`/`COMP-3` et `3270` (`Ch. 4`) |
| `IC` | Intervalle de confiance | Borne statistique exigée pour interpréter les bancs d’évaluation `pass^k` (`Ch. 8`) |
| `ID` | Identifiant | Clé canonique tracée dans les registres JSON et le journal d’audit (`Ch. 8`) |
| `ID-JAG` | *Identity Assertion JWT Authorization Grant* (`IETF OAuth draft`) | Brouillon `IETF` d’échange d’assertion d’identité surveillé sans dépendance anticipée (`Ch. 7`) |
| `IEC` | *International Electrotechnical Commission* | Organisme co-éditeur de `IEC 62443`, `IEC 62541` et `ISO/IEC` (`Ch. 4`, `Ch. 10`) |
| `IEEE` | *Institute of Electrical and Electronics Engineers* | Société savante éditrice de conférences sécurité (`IEEE SaTML 2026` pour `CaMeL` ; `Annexe F`) |
| `IETF` | *Internet Engineering Task Force* | Organisme normalisant `OAuth 2.0`, `RFC 8693/8785/9396/9449/9943/10024`, `WIMSE`, `DAWN` (`Ch. 3`, `Ch. 7`) |
| `IMDA` | *Infocomm Media Development Authority* (Singapour) | Autorité publiant le *Model AI Governance Framework for Agentic AI v1.5* (`Ch. 6`, `Ch. 10`) |
| `IMDS` | *Instance Metadata Service* | Service de métadonnées infonuagiques protégé contre l’exfiltration `SSRF` (`Ch. 7`) |
| `INI` | Initiative du portefeuille `DAPP` (`PD28`, `43` entrées `INI-*`) | Chantier de mise en œuvre (`29` sans regret + `14` conditionnelles ; `Ch. 12`) |
| `IOMMU` | *Input-Output Memory Management Unit* | Isolation matérielle d’accès mémoire utilisée par les bacs à sable microVM (`Ch. 7`, `Ch. 9`) |
| `IR` | *Interagency Report* (`NIST`, ex. `NIST IR 8547`) | Rapport de transition vers la cryptographie post-quantique (`Ch. 7`, `Annexe F`) |
| `ISDE` | Innovation, Sciences et Développement économique Canada | Ministère fédéral publiant la stratégie nationale canadienne en IA (`Ch. 1`, `Annexe F`) |
| `ISO` | *International Organization for Standardization* | Organisme normalisant `ISO 20022` et les séries `ISO/IEC 42001/42105` (`statut F` ; `Ch. 10`, `Ch. 12`) |
| `IT/OT` | *Information Technology / Operational Technology* | Frontière de séparation stricte entre systèmes d’information et automates industriels (`Ch. 4`, `Ch. 9`) |
| `J1` | Jalon `J1` (*90 jours — Fondations*) | Fin de la première étape tactique (`N0–N1`, inventaire, `NHI`, coupe-circuit ; `Ch. 12`) |
| `J2` | Jalon `J2` (*9 mois — Plateforme*) | Mise en service `PEP`, `JCS`/`CIBA` et convergence `BSIF E-23` / `AMF IA` (`Ch. 12`) |
| `J2a` | Jalon `J2a` (*1er novembre 2027*) | Jalon préparatoire avant l’entrée en vigueur de l’Annexe III du `RIA` (`Ch. 12`) |
| `J3` | Jalon `J3` (*18 mois — Industrialisation*) | Atteinte du Niveau 3 « Défini » (`CAD26`) et `Stade 2` (*Usage encadré*) (`Ch. 12`) |
| `J5` | Jalon `J5` (*Maturité élevée / revue externe*) | Jalon où `ISO/IEC 42001` (`statut F`) n’atteste que la dimension Gouvernance (`Ch. 12`) |
| `JCS` | *JSON Canonicalization Scheme* (`RFC 8785`) | Sérialisation déterministe pour l’idempotence, `CIBA` et le scellement d’audit (`Ch. 5`, `Ch. 6`, `Ch. 8`) |
| `JOSE` | *JSON Object Signing and Encryption* (`IETF`) | Famille de spécifications `JWS`/`JWKS` en migration vers `ML-DSA` (`Ch. 7`) |
| `JOUE` | Journal officiel de l’Union européenne | Organe de publication officiel du `RIA`, de `DORA`, du `CRA` et du `Data Act` (`Ch. 10`) |
| `JSON` | *JavaScript Object Notation* (`RFC 8259`) | Format structuré des registres, contrats `AS`, cartes `A2A` et schémas `MCP` (`Ch. 3`, `Ch. 5`) |
| `JSON-RPC` | *JSON Remote Procedure Call* (`v2.0`) | Protocole d’appel de procédure distante sous-jacent à `MCP` et `A2A` (`Ch. 3`) |
| `JTC 1` | *ISO/IEC Joint Technical Committee 1* (`SC 42`) | Comité technique conjoint normalisant l’IA (`statut F` / `R`, veille `SIG-008` ; `Ch. 12`) |
| `JWKS` | *JSON Web Key Set* (`RFC 7517`) | Jeu de clés publiques référencé par `kid` pour éviter le gonflement d’en-têtes `HTTP 431` (`Ch. 7`) |
| `JWS` | *JSON Web Signature* (`RFC 7515`) | Signature des cartes `A2A`, jetons d’autorisation et reçus d’approbation (`Ch. 3`, `Ch. 6`) |
| `JWT` | *JSON Web Token* (`RFC 7519`) | Jeton compact signé, à durée courte et lié par `DPoP` ou `mTLS` (`Ch. 7`) |
| `JWT-SVID` | *JWT SPIFFE Verifiable Identity Document* | Identité cryptographique de charge agentique émise par `SPIFFE` (`Ch. 7`, `EXIG-IAM-03`) |
| `KDD` | *ACM SIGKDD Conference on Knowledge Discovery and Data Mining* | Conférence publiant le retour d’expérience production `Nubank` (`KDD 2026`, `Ch. 1`) |
| `KERI` | *Key Event Receipt Infrastructure* | Infrastructure de journal d’événements de clés sous-tendant `vLEI` et `ACDC` (`Ch. 9`) |
| `kid` | *Key Identifier* (`JOSE`) | Référence de clé publique remplaçant les certificats embarqués pour parer `HTTP 431` (`Ch. 7`, `POR-007`) |
| `KMS` | *Key Management Service* | Service centralisé de gestion et révocation rapide des clés cryptographiques (`Ch. 7`, `Ch. 9`) |
| `KV` | *Key-Value* (`KV-cache`) | Cache d’états d’attention d’inférence devant respecter l’isolation stricte des `ACL` (`Ch. 4`, `Ch. 9`) |
| `KYA` | *Know Your Agent* | Concept de passeport d’agent sans norme opposable unique (`0/9` `[S]` ; `Ch. 7`) |
| `KYC` | *Know Your Client* | Obligations de connaissance du client encadrées en valeurs mobilières (`NI 31-103`, `OCRI` ; `Ch. 10`) |
| `L+` | Statut probatoire *texte primaire lu en brut UTF-8* | Source officielle ou scientifique vérifiée intégralement ou par passages (`98` textes `PD28` ; `À propos`) |
| `L0` | Niveau d’autonomie `L0` (*Absence d’autonomie*, `C27`) | Équivalent `N0` : exécution purement déterministe sans modèle (`Ch. 2`, `Ch. 6`) |
| `L1` | Niveau d’autonomie `L1` (*Assistance*) | Équivalent `N1` : lecture, synthèse et proposition sans effet externe (`Ch. 2`, `Ch. 6`) |
| `L2` | Niveau d’autonomie `L2` (*Exécution supervisée*) | Équivalent `N2` : actions réversibles bornées ou préparations validées (`Ch. 2`, `Ch. 6`) |
| `L3` | Niveau d’autonomie `L3` (*Autonomie conditionnelle bornée*) | Équivalent `N3` : exécution autonome intra-domaine sous `24 PRR [BLOQUANT]` (`Ch. 6`, `Ch. 12`) |
| `L4` | Niveau d’autonomie `L4` (*Autonomie élevée supervisée sur exception*) | Équivalent `N4` : réservé aux cas sélectifs post-portes `POR-013`, exclu en `D2`/`D6` (`Ch. 6`, `Ch. 12`) |
| `LBC` | Lutte contre le blanchiment de capitaux (`LAB`/`LRPCFAT`) | Domaine de conformité `D6` soumis à `CANAFE` et au maintien de la supervision humaine (`Ch. 10`) |
| `LCCJTI` | Loi concernant le cadre juridique des technologies de l’information | Loi québécoise (`L.Q. 2001, c. 32`) régissant l’intégrité documentaire et la signature (`Ch. 10`, `Annexe F`) |
| `LCIM` | *Levels of Conceptual Interoperability Model* | Modèle de niveaux d’interopérabilité technique, syntaxique, sémantique et pragmatique (`Ch. 2`, `Ch. 4`) |
| `LDPSF` | Loi sur la distribution de produits et services financiers (Québec) | Loi québécoise imposant notamment la comparaison d’au moins `3` assureurs (`art. 38` ; `Ch. 10`) |
| `LEI` | *Legal Entity Identifier* (`ISO 17442`) | Identifiant international d’entité juridique prolongé en identité vérifiable par `vLEI` (`Ch. 9`) |
| `LLM` | *Large Language Model* | Grand modèle de langage probabiliste confiné dans une enveloppe déterministe (`Ch. 1–12`) |
| `LPRPDE` | Loi sur la protection des renseignements personnels et les documents électroniques | Loi fédérale canadienne (`L.C. 2000, ch. 5`) suivie sous `SIG-107` (`Ch. 10`, `Ch. 12`) |
| `LRPCFAT` | Loi sur le recyclage des produits de la criminalité et le financement des activités terroristes | Loi fédérale (`L.C. 2000, ch. 17`) régissant la conformité `CANAFE` (`Ch. 10`, `Annexe F`) |
| `LSAC` | Loi sur les services bancaires axés sur les consommateurs | Loi fédérale canadienne (`L.C. 2026, ch. 3`, `art. 171`) encadrant le système bancaire ouvert (`Ch. 4`, `Ch. 10`) |
| `LUCE` | Loi uniforme sur le commerce électronique (`CHLC`/`ULCC`) | Loi modèle canadienne (`art. 21`) sur les agents électroniques et erreurs de saisie (`Ch. 10`, `Annexe F`) |
| `MAP` | *Measuring Agents in Production* (Pan et al., `arXiv:2512.04123`) | Étude empirique montrant `68 %` de cas à `<= 10` étapes et `16/20` sur flux fixes (`Ch. 1`, `Annexe F`) |
| `MAST` | *Multi-Agent System Failure Taxonomy* (Cemri et al., NeurIPS 2025) | Taxonomie de `14` modes d’échec (`41–86,7 %` d’échecs sur `1 642` traces `v3` ; `Ch. 1`, `Ch. 5`) |
| `MCN` | Ministère de la Cybersécurité et du Numérique (Québec) | Ministère publiant des guides visant uniquement les administrations publiques du Québec (`Ch. 6`, `Ch. 10`) |
| `MCP` | *Model Context Protocol* (révision `2026-07-28`) | Protocole ouvert modèle-outils épinglé en `SHA-256`, migration au 28 juill. 2027 D (`Ch. 3`, `EXIG-MCP-*`) |
| `METR` | *Model Evaluation & Threat Research* | Organisme mesurant l’horizon temporel `v1.1` des agents (`~17,4 h` à `50 %` vs `~3,1 h` à `80 %` ; `Ch. 1`) |
| `MGA` | *Managing General Agent* (agent général en assurance) | Intermédiaire d’assurance soumis aux exigences `B-10`, `LDPSF` et `AMF` (`Ch. 10`) |
| `MIPS` | *Million Instructions Per Second* | Unité historique de capacité mainframe influant sur le coût des appels patrimoniaux (`Ch. 4`) |
| `MIT` | *Massachusetts Institute of Technology License* | Licence logicielle permissive des scripts, outils, filtres et tests du mémoire (`DC-P01`, `LICENSE`) |
| `MITRE` | *MITRE Corporation* | Organisme maintenant `ATLAS` et les cadres d’évaluation des menaces (`Ch. 7`) |
| `ML` | *Machine Learning* (apprentissage automatique) | Modèles statistiques soumis à `BSIF E-23` au même titre que les agents `LLM` (`Ch. 10`) |
| `ML-DSA` | *Module-Lattice-Based Digital Signature Algorithm* (`FIPS 204`) | Signature post-quantique (`ML-DSA-65`, `ML-DSA-87`) exigeant `kid` face à `HTTP 431` (`Ch. 7`) |
| `ML-KEM` | *Module-Lattice-Based Key-Encapsulation Mechanism* (`FIPS 203`) | Encapsulation de clés post-quantique couplée à `X25519` en `TLS 1.3` hybride (`Ch. 7`) |
| `MLR` | *Multivocal Literature Review* | Revue structurée combinant littérature arbitrée et littérature grise normée (`Ch. 1`) |
| `MQTT` | *Message Queuing Telemetry Transport* (`Sparkplug`) | Protocole de télémétrie `OT` confiné en lecture seule derrière jumeau numérique (`Ch. 4`, `CAP-028`) |
| `MRTR` | *Mean Time to Restore / Recover* | Temps moyen de rétablissement mesuré dans les exercices de résilience (`Ch. 8`, `Ch. 9`) |
| `mTLS` | *Mutual Transport Layer Security* (`RFC 8705`) | Authentification mutuelle par certificat liant les jetons et liaisons inter-services (`Ch. 7`) |
| `N0` | Niveau d’autonomie `N0` (*Déterministe sans modèle*, `CAD26`) | Règle d’affaires ou automatisation déterministe prioritaire avant tout agent (`Ch. 1`, `EXIG-ORC-01`) |
| `N1` | Niveau d’autonomie `N1` (*Lecture / assistance*, `CAD26`) | Plafond de la rampe des 90 premiers jours (`J1`) sans écriture (`Ch. 6`, `Ch. 12`) |
| `N2` | Niveau d’autonomie `N2` (*Proposition / action réversible*, `CAD26`) | Plafond par défaut lorsque la règle d’or `EXIG-AUT-07` n’est pas satisfaite (`Ch. 6`, `Ch. 12`) |
| `N3` | Niveau d’autonomie `N3` (*Exécution bornée*, `CAD26`) | Autonomie encadrée soumise aux `24` points `PRR [BLOQUANT]` (`Ch. 6`, `Ch. 12`) |
| `N4` | Niveau d’autonomie `N4` (*Supervision sur exception*, `CAD26`) | Autonomie maximale sélective, interdite en `D2` et `D6` interne (`Ch. 6`, `Ch. 12`) |
| `NCSC` | *National Cyber Security Centre* (Royaume-Uni) | Organisme publiant des recommandations sur l’injection de consigne et la PQC (`Ch. 7`) |
| `ND` | Non dérogeable (`EXIG-GOV-17`) | Interdiction absolue ne pouvant recevoir aucune dispense à l’homologation (`Annexe C`) |
| `NHI` | *Non-Human Identity* (identité non humaine) | Identité cryptographique dédiée de chaque agent, sans secret statique (`Ch. 7`, `CAP-035`) |
| `NHI2` | *OWASP NHI2 — Secret Leakage* | Risque de fuite de secret statique paré par `SPIFFE SVID` éphémères (`Ch. 7`) |
| `NHI7` | *OWASP NHI7 — Long-Lived Secrets* | Risque des secrets durables paré par rotation courte et `CAEP` (`Ch. 7`) |
| `NHI8` | *OWASP NHI8 — Environment Isolation* | Risque de mélange d’environnements paré par cloisonnement réseau et `SVID` (`Ch. 7`) |
| `NHI9` | *OWASP NHI9 — NHI Reuse* | Risque de réutilisation d’identité entre agents, interdit par `EXIG-IAM-03` (`Ch. 7`) |
| `NI` | *National Instrument* (`ACVM`, ex. `NI 31-103`) | Règlement pancanadien des valeurs mobilières (fin des rétrofacturations 2028-10-01 D ; `Ch. 10`) |
| `NIS` | *Network and Information Security* (`NIS 2` / `SRI 2`, `Directive (UE) 2022/2555`) | Directive européenne de cybersécurité et groupe de coopération PQC (`Ch. 7`, `Ch. 10`) |
| `NIST` | *National Institute of Standards and Technology* | Organisme américain publiant `AI RMF`, `AI 100-2`, `FIPS 203–205` et `IR 8547` (`Ch. 7`, `Annexe F`) |
| `NVD` | *National Vulnerability Database* (`NIST`) | Base publique de vulnérabilités citant `102` fiches tierces « Model Context Protocol » (`Ch. 3`, `Ch. 7`) |
| `NX` | Niveau `NX` (*Autonomie illimitée*, `CAD26`) | Niveau strictement interdit sans dérogation (`EXIG-AUT-03`, `EXIG-GOV-17` ; `Ch. 6`, `Ch. 12`) |
| `OAuth` | *Open Authorization* (`OAuth 2.0`, `RFC 6749` / `RFC 9700`) | Cadre de délégation d’autorisation complété par `RFC 8693`, `8707`, `9396`, `9449` (`Ch. 7`) |
| `OCDE` | Organisation de coopération et de développement économiques | Organisation citée sur les indicateurs IA (rapports sous péage en `statut F` ; `Ch. 1`) |
| `OCRA` | Organismes canadiens de réglementation en assurance (`CISRO`) | Co-éditeur avec le `CCRRA` de la directive sur le traitement équitable des clients (`Ch. 10`) |
| `OCRI` | Organisme canadien de réglementation des investissements (`CIRO`) | Autorégulateur des courtiers en placement (`Règles 3400`, `OEO 3241` ; notes `T-24`/`N-08` en `statut F`) |
| `ODCS` | *Open Data Contract Standard* (`v3`) | Contrat de données exécutable couplé au patron `WAP` dans l’usine de données (`Ch. 4`, `Ch. 11`) |
| `ODD` | *Operational Design Domain* | Domaine opérationnel de validité bornant où un agent peut agir sans dégradation (`Ch. 6`, `Ch. 8`) |
| `ODRL` | *Open Digital Rights Language* (`W3C v2.2`) | Langage formel de politiques d’usage des données dans les espaces fédérés B2B (`Ch. 9`, `CAP-027`) |
| `OEO` | *Order-Execution-Only* (`OCRI 3241`) | Régime de courtage sans conseil interdisant les recommandations automatisées déguisées (`Ch. 10`, `PEX-012`) |
| `OICV` | Organisation internationale des commissions de valeurs (`IOSCO`) | Instance internationale de valeurs mobilières (rapport `R-11` en `statut F` ; `Ch. 10`) |
| `OIDC` | *OpenID Connect* | Couche d’identité au-dessus d’`OAuth 2.0`, base de `CIBA` (`Ch. 6`, `Ch. 7`) |
| `OMB` | *Office of Management and Budget* (États-Unis, `M-26-15`) | Mémorandum PQC visant uniquement les administrations publiques américaines (`Ch. 7`, `Ch. 12`) |
| `OO1` | Patron `OO1` *Agent seul sans enveloppe durable* (`C26` `[S]`) | Niveau minimal écarté pour les traitements financiers critiques (`Ch. 5`) |
| `OO2` | Patron `OO2` *Orchestration pilotée par le modèle* (`C26` `[S]`) | Routage non déterministe réservé aux explorations à faible risque (`Ch. 5`) |
| `OO3` | Patron `OO3` *Enveloppe déterministe appelant un modèle* (`C26` `[S]`) | Patron par défaut des flux financiers critiques (`Ch. 1`, `Ch. 5`) |
| `OO4` | Patron `OO4` *Enveloppe durable à sagas et compensation* (`C26` `[S]`) | Patron cible des opérations longues multi-étapes à effets `P2`/`P3` (`Ch. 5`) |
| `OOR` | *Out-of-Range / Out-of-Role* | Écart hors domaine ou hors rôle déclenchant l’arrêt ou la rétrogradation (`Ch. 6`) |
| `OPC UA` | *Open Platform Communications Unified Architecture* (`IEC 62541`) | Protocole industriel cantonné à la frontière périphérique `OT` en lecture seule (`Ch. 4`, `CAP-028`) |
| `OT` | *Operational Technology* | Systèmes physiques et automates situés hors cœur transactionnel financier (`Ch. 4`, `Ch. 9`) |
| `OTel` | *OpenTelemetry* (`v1.41.0` / conventions `gen_ai.* v1.44.0`) | Standard de télémétrie structurant le double couloir métadonnées / audit (`Ch. 8`, `CAP-042`) |
| `OWASP` | *Open Worldwide Application Security Project* | Source des taxonomies `ASI 2026` et `NHI Top 10` (`Ch. 7`, `Annexe F`) |
| `P0` | Classe d’effet `P0` *Lecture seule publique ou interne non sensible* | Action sans mutation ni exposition de `RP` (`Ch. 3`, `Ch. 6`) |
| `P1` | Palier `P1` (`2028–2029`) ou classe d’effet `P1` (*Lecture sensible / brouillon*) | Premier palier `DAPP` (`14+1 INI`, `POR-001..004`) ou effet local réversible (`Ch. 6`, `Ch. 12`) |
| `P2` | Palier `P2` (`2030–2032`) ou classe d’effet `P2` (*Écriture réversible bornée*) | Deuxième palier `DAPP` (`9+7 INI`, `POR-005..009`) ou écriture compensable par saga (`Ch. 5`, `Ch. 12`) |
| `P3` | Palier `P3` (`2033–2035`) ou classe d’effet `P3` (*Effet irréversible / engageant*) | Troisième palier `DAPP` (`4+6 INI`) ou action exigeant `CIBA`/`FIDO2` hors bande (`Ch. 6`, `Ch. 12`) |
| `pacs.008` | *Payment Clearing and Settlement 008* (`ISO 20022`) | Message de virement client du rail temps réel `RTR` (`Ch. 10`, `SIG-104`) |
| `PAS` | *Policy Administration System* | Système maître d’administration des polices d’assurance (`Ch. 4`, `Ch. 10`) |
| `pass^k` | Probabilité de succès sur `k` exécutions indépendantes | Métrique de fiabilité répétée exigée en `E2` et en distillation (`pass^5 >= 99 %` `[S]` ; `Ch. 8`, `Ch. 11`) |
| `PC1` | Point de contrôle `PC1` *Intention et mandat* (`C26` `[S]`) | Premier point de contrôle analytique de la chaîne de responsabilité (`Ch. 2`, `Annexe D`) |
| `PC2` | Point de contrôle `PC2` *Contexte et données* (`C26` `[S]`) | Deuxième point de contrôle vérifiant provenance et `ACL` (`Ch. 4`) |
| `PC3` | Point de contrôle `PC3` *Approbation humaine* (`C26` `[S]`) | Point d’approbation préalable distinct du droit a posteriori `Loi 25 art. 12.1` (`Ch. 6`) |
| `PC4` | Point de contrôle `PC4` *Mémoire et état* (`C26` `[S]`) | Point de contrôle de persistance, bi-temporalité et purge (`Ch. 4`) |
| `PC5` | Point de contrôle `PC5` *Effet et preuve d’audit* (`C26` `[S]`) | Dernier point de contrôle liant exécution externe et journal immuable (`Ch. 5`, `Ch. 8`) |
| `PD28` | *Plan directeur 2028-2035* (`2028-2035/PlanDirecteurMaster.pdf`, `400` p.) | Quatrième volume du corpus : `52 CAP`, `24 PEX`, `43 INI`, `15 POR`, `27 SIG`, `98` textes `L+` |
| `PDF` | *Portable Document Format* | Format de publication des quatre volumes sources et de `MemoireMaster.pdf` (`À propos`) |
| `PDP` | *Policy Decision Point* | Moteur déterministe évaluant les politiques d’autorisation, la règle de deux et les plafonds (`Ch. 3`, `Ch. 7`) |
| `PEP` | *Policy Enforcement Point* (passerelle d’agents à `9` contrôles) | Point d’application obligatoire en échec fermé sur tout appel `MCP`, `A2A` et `P2`/`P3` (`Ch. 3`, `CAP-022`) |
| `PEX` | Proposition d’extension sectorielle (`PD28`, `24` entrées `PEX-001..024`) | Spécialisations (`13`) et comblements (`11`) propres aux cinq profils financiers (`Ch. 10`, `Annexe A`) |
| `PII` | *Personally Identifiable Information* | Équivalent anglais de `RP` (renseignements personnels), interdit dans les métadonnées `OTel` et bus (`Ch. 3`, `Ch. 8`) |
| `PIM` | *Privileged Identity Management* | Élévation juste-à-temps des privilèges d’administration et de déploiement (`Ch. 7`) |
| `PKI` | *Public Key Infrastructure* | Infrastructure à clés publiques soumise à `ACME` (`100 j` / `47 j`) et à la transition PQC (`Ch. 7`, `POR-007`) |
| `PLC` | *Programmable Logic Controller* | Automate industriel interdit d’écriture directe ou de réessai depuis un agent (`Ch. 4`, `CAP-028`) |
| `PME` | Petite et moyenne entreprise | Catégorie d’entreprises comparée dans les enquêtes d’adoption IA (`Ch. 1`) |
| `POR` | Porte d’homologation de trajectoire (`PD28`, `15` entrées `POR-001..009`, `011..016`) | Porte sur preuves système conditionnant le passage entre paliers `DAPP` (`Ch. 12`, `Annexe C`) |
| `PQC` | *Post-Quantum Cryptography* | Cryptographie résistante au quantique (`FIPS 203–205`, hybride `P2`, natif `P3` ; `Ch. 7`, `Ch. 12`) |
| `PRD` | *Product Requirements Document* (`Memoire/prd.md`) | Cahier des charges fixant les objectifs et critères `CA-01` à `CA-16` (`À propos`) |
| `PRI` | Principe directeur (`PD28`, `15` entrées `PRI-001..015`) | Principes d’architecture d’entreprise consolidés en `Annexe B` (`Ch. 2`) |
| `PRIN` | Principe normatif (`CAD26`, `12` entrées `PRIN-01..12`) | Principes fondateurs de `CRE-IA-2026-01` reliés aux `PRI-*` (`Ch. 2`, `Annexe B`) |
| `PRR` | *Production Readiness Review* (`C27 Annexe G`, `75` points) | Grille de mise en production (`24 [BLOQUANT]` en `N3`/`N4`, `26` conditionnels, `25` élevés/moyens ; `Annexe C`) |
| `Q-A` | Question `Q-A` *Qui parle ?* (`C26` `[S]`) | Couche protocolaire d’échange couverte par `MCP`/`A2A`, insuffisante pour l’imputabilité (`Synthèse`, `Ch. 3`) |
| `Q-B` | Question `Q-B` *Sur quelles données ?* (`C26` `[S]`) | Couche de contexte, sémantique et permissions d’accès (`Ch. 4`) |
| `Q-C` | Question `Q-C` *Selon quel flux ?* (`C26` `[S]`) | Couche d’orchestration durable et de bornage des boucles (`Ch. 5`) |
| `Q-D` | Question `Q-D` *Sous quel contrôle ?* (`C26` `[S]`) | Couche de sécurité, identité `NHI` et approbation `CIBA` (`Ch. 6`, `Ch. 7`) |
| `Q-E` | Question `Q-E` *Qui en répond ?* (`C26` `[S]`) | Couche d’imputabilité réglementaire où `C26 ch. 42` relève `0/15` lien natif `[S]` (`Synthèse`, `Ch. 1`) |
| `RACI` | *Responsible, Accountable, Consulted, Informed* | Matrice imposant un seul `A` nommé par agent (`EXIG-GOV-04` ; `Ch. 11`) |
| `RAG` | *Retrieval-Augmented Generation* | Génération augmentée par récupération soumise au filtrage `ACL` avant indexation/contexte (`Ch. 4`) |
| `RBC` | Banque Royale du Canada | Exemple d’institution financière mentionné dans l’analyse sectorielle (`Ch. 1`) |
| `REST` | *Representational State Transfer* | Style d’API `HTTP` exposé derrière la passerelle et les adaptateurs patrimoniaux (`Ch. 3`, `Ch. 4`) |
| `RFC` | *Request for Comments* (`IETF`) | Spécifications Internet normatives (`RFC 7493`, `8693`, `8705`, `8707`, `8785`, `9396`, `9449`, `9562`, `9700`, `9943`, `9964`, `10024`, `10073`) |
| `RH` | Ressources humaines | Fonction concernée par le plafonnement des décisions automatisées et la relève junior (`Ch. 10`, `Ch. 11`) |
| `RIA` | Règlement sur l’intelligence artificielle (`EU AI Act`, `(UE) 2024/1689` & `2026/1744`) | Cadre européen à haut risque (Annexe III au 2 déc. 2027 D `ANC-007` ; `Ch. 10`, `Ch. 12`) |
| `RLRQ` | Recueil des lois et des règlements du Québec | Codifications administratives LégisQuébec demeurées en `statut F`, compensées par les lois `L+` (`Annexe D`) |
| `ROS` | *Robot Operating System* (`ROS 2`) | Cadriciel robotique isolé derrière contrôleur déterministe `Simplex` à la marge `OT` (`Ch. 9`) |
| `RP` | Renseignements personnels (équivalent `PII`) | Données protégées par la `Loi 25` et `LPRPDE`, interdites en télémétrie brute et bus d’événements (`Ch. 3`, `Ch. 8`) |
| `RPG` | *Report Program Generator* | Langage patrimonial sur systèmes *midrange* (`5250`) isolé derrière adaptateurs typés (`Ch. 4`) |
| `RPRP` | Responsable de la protection des renseignements personnels (`Loi 25`) | Rôle légal québécois installé dès les `90` premiers jours (`J1`) pour superviser ÉFVP et `art. 12.1` (`Ch. 10`, `Ch. 12`) |
| `RTO` | *Recovery Time Objective* | Objectif maximal de délai de reprise mesuré sur les filières critiques (`Ch. 9`) |
| `RTR` | *Real-Time Rail* (Paiements Canada) | Rail canadien de paiements temps réel `ISO 20022` (`pacs.008`) suivi sous `SIG-104` (`Ch. 10`) |
| `RTT` | *Round-Trip Time* | Temps d’aller-retour réseau contraignant `HYOK` (`<= 35 ms` conseillé) et le budget `PEP` (`Ch. 3`, `Ch. 9`) |
| `SaaS` | *Software as a Service* | Logiciel fourni en nuage encadré par `EXIG-ARC-21` et clauses de sortie `EXIG-APP-07..16` (`Ch. 2`, `Ch. 11`) |
| `SAP` | *Staff Analytical Paper* (`Banque du Canada SAP 2026-22`) | Étude analytique du personnel de la Banque du Canada sur l’IA et le marché du travail (`Ch. 1`, `Ch. 12`) |
| `SBB` | *Solution Building Block* | Implémentation concrète substituable d’un `ABB`, révisée chaque trimestre (`Ch. 2`, `EXIG-ARC-20`) |
| `SBOM` | *Software Bill of Materials* (`CycloneDX` / `SPDX`) | Nomenclature logicielle et IA (`AIBOM`) exigée à l’approvisionnement et en `CI/CD` (`Ch. 7`, `Ch. 11`) |
| `SC 42` | *ISO/IEC JTC 1/SC 42* | Sous-comité international de normalisation IA surveillé sous `SIG-008` (`statut F` / `R` ; `Ch. 12`) |
| `SCADA` | *Supervisory Control and Data Acquisition* | Système de contrôle industriel interdit d’écriture directe depuis un agent (`Ch. 4`, `CAP-028`) |
| `SCIM` | *System for Cross-domain Identity Management* (`RFC 7643`) | Schéma d’approvisionnement d’identités ne couvrant pas nativement le passeport d’agent (`Ch. 7`) |
| `SCIP` | *Semantic Code Intelligence Protocol* | Protocole d’indexation sémantique de code utilisé dans l’usine logicielle (`Ch. 11`) |
| `SCITT` | *Supply Chain Integrity, Transparency, and Trust* (`RFC 9943`) | Architecture `IETF` de journaux de transparence et reçus scellés (`Ch. 7`, `Ch. 8`, `POR-007`) |
| `SCT` | Secrétariat du Conseil du Trésor du Canada | Organisme édictant `AMOPS` et la *Directive sur la prise de décisions automatisée* pour les seules administrations publiques (`Ch. 6`, `Ch. 12`) |
| `SDK` | *Software Development Kit* | Trousse de développement encapsulée pour prévenir le verrouillage fournisseur (`Ch. 2`, `Ch. 3`) |
| `SEP` | *Specification Enhancement Proposal* (`MCP`) | Proposition d’évolution `MCP` suivie en veille (`SEP-2322`, `2596`, `3392`, `3398` ; `Ch. 3`, `Ch. 12`) |
| `SEV-SNP` | *Secure Encrypted Virtualization — Secure Nested Paging* | Isolation mémoire confidentielle évaluée avec prudence face à `TEE.fail` (`Ch. 9`) |
| `SHA-256` | *Secure Hash Algorithm 256-bit* (`FIPS 180-4`) | Condensé cryptographique d’épinglage `MCP`, d’idempotence `JCS` et d’approbation `CIBA` (`Ch. 3`, `Ch. 5`, `Ch. 6`) |
| `SHA-384` | *Secure Hash Algorithm 384-bit* | Fonction de hachage employée dans les suites cryptographiques renforcées (`Ch. 7`) |
| `SHA-512` | *Secure Hash Algorithm 512-bit* | Fonction de hachage utilisée pour le scellement à longue conservation (`Ch. 7`) |
| `SIG` | Signal de bascule `DAPP` (`PD28`, `27` entrées `SIG-001..017`, `SIG-101..110`) | Indicateur déclenchant une décision budgétaire sous `30 jours` (`Ch. 12`) |
| `SLH-DSA` | *Stateless Hash-Based Digital Signature Algorithm* (`FIPS 205`) | Signature post-quantique fondée sur le hachage pour les archives `5/7 ans` et `SCITT` (`Ch. 7`, `SIG-010`) |
| `SLM` | *Small Language Model* | Petit modèle spécialisé distillé sous sas (`pass^5 >= 99 %` `[S]` ; `Ch. 9`, `Ch. 11`, `INI-028`) |
| `SLO` | *Service Level Objective* | Objectif de niveau de service couplé aux budgets d’erreur et à la rétrogradation `< 60 s` (`Ch. 8`, `POR-015`) |
| `SMQ` | Système de management de la qualité (`RIA art. 17`, `EN 18286:2026`) | Dispositif qualité exigé pour les systèmes d’IA à haut risque (`Ch. 10`, `Ch. 11`) |
| `SPDX` | *Software Package Data Exchange* (`v3.0`) | Standard ouvert de nomenclature logicielle et de profil IA (`Ch. 11`) |
| `SPICE` | *IETF Secure Patterns for Internet CrEdentials* | Groupe `IETF` normalisant `SD-CWT` pour les justificatifs sélectifs (`Ch. 7`, `Annexe F`) |
| `SPIFFE` | *Secure Production Identity Framework for Everyone* | Standard d’identité cryptographique éphémère (`SVID`) des charges agentiques (`Ch. 7`, `EXIG-IAM-03`) |
| `SQL` | *Structured Query Language* | Langage de requête interdit en accès direct depuis un agent vers les systèmes d’enregistrement (`Ch. 2`, `ADR-001`) |
| `SRE` | *Site Reliability Engineering* | Ingénierie de fiabilité pilotant budgets d’erreur, coupe-circuit et continuité bimodèle (`Ch. 8`, `Annexe D`) |
| `SRI` | Directive *Sécurité des réseaux et de l’information* (`SRI 2` / `NIS 2`) | Directive européenne de cybersécurité (`Directive (UE) 2022/2555` ; `Ch. 10`) |
| `SSE` | *Server-Sent Events* | Flux unidirectionnel remplacé par *Streamable HTTP* dans `MCP 2026-07-28` (`Ch. 3`) |
| `SSF` | *Shared Signals Framework* (`OpenID`) | Cadre d’échange de signaux de sécurité transportant `CAEP` (`Ch. 7`) |
| `SSRF` | *Server-Side Request Forgery* | Attaque par rebond réseau bloquée au `PEP` et sur `IMDS` (`Ch. 3`, `Ch. 7`) |
| `SVG` | *Scalable Vector Graphics* | Format vectoriel des huit figures architecturales (`fig-01` à `fig-08`, rendues `>= 7,0 pt` ; `verifie.py`) |
| `SVID` | *SPIFFE Verifiable Identity Document* | Certificat ou jeton court prouvant l’identité d’une charge agentique (`Ch. 7`, `CAP-035`) |
| `T1–T10` | Dix thèses structurantes du mémoire | Synthèse doctrinale de la *Synthèse exécutive* reliant les `12` chapitres (`Synthèse`) |
| `TAP` | *Trusted Agent Protocol* | Proposition protocolaire observée sans statut de norme obligatoire (`Ch. 3`) |
| `TD` | Banque Toronto-Dominion | Exemple d’institution financière mentionné dans l’analyse de marché (`Ch. 1`) |
| `TDD` | *Test-Driven Development* | Développement piloté par les tests appliqué à la chaîne d’outillage `verifie.py` (`À propos`) |
| `TDX` | *Trust Domain Extensions* | Enclave matérielle d’exécution confidentielle soumise aux limites `TEE.fail` (`Ch. 9`) |
| `TEE` | *Trusted Execution Environment* | Environnement d’exécution de confiance optionnel (`INI-027`), non substituable aux contrôles `PEP` (`Ch. 9`) |
| `TFUE` | Traité sur le fonctionnement de l’Union européenne (`art. 101`) | Base juridique européenne de concurrence encadrant les agents de tarification (`Ch. 10`, `Annexe F`) |
| `TI` | Technologies de l’information | Domaine technologique gouverné par `BSIF B-13` et les trois lignes de maîtrise (`Ch. 10`, `Ch. 11`) |
| `TLS` | *Transport Layer Security* (`v1.3`, hybride `RFC 10024`) | Protocole de transport chiffré soumis aux échéances `100 j` (2027) et `47 j` (2029) (`Ch. 7`) |
| `TOCTOU` | *Time-of-Check to Time-of-Use* | Faille entre vérification et exécution parée par le scellement `h = SHA-256(JCS)` (`Ch. 6`) |
| `TOGAF` | *The Open Group Architecture Framework* | Cadre d’architecture d’entreprise distinguant `ABB` et `SBB` (`statut F` sous licence ; `Ch. 2`) |
| `TTFT` | *Time to First Token* | Latence d’émission du premier jeton suivie dans le budget de performance (`Ch. 3`, `Ch. 9`) |
| `TUF` | *The Update Framework* | Cadre de sécurisation de la chaîne de mise à jour logicielle et des artefacts (`Ch. 7`) |
| `UA` | *User Agent* / *Unified Architecture* | Agent utilisateur ou composant d’architecture unifiée selon le contexte protocolaire (`Ch. 3`, `Ch. 4`) |
| `UE` | Union européenne | Juridiction d’application du `RIA`, de `DORA`, du `CRA`, de `SRI 2` et du `Data Act` (`Ch. 10`) |
| `UETR` | *Unique End-to-End Transaction Reference* (`UUID v4`) | Référence unique de bout en bout des paiements `ISO 20022` (`Ch. 10`) |
| `UI` | *User Interface* | Interface utilisateur, distinguée des API structurées dans la sortie `CUA` (`Ch. 4`) |
| `UIT-T` | Union internationale des télécommunications — Normalisation | Éditeur de `F.748.93` (corps réservé membres TIES en `statut F` ; `Ch. 3`, `Annexe F`) |
| `URL` | *Uniform Resource Locator* | Adresse de ressource vérifiée dans les ancres primaires et la bibliographie (`Annexe F`) |
| `US` | États-Unis (`USD` / `$ US`) | Juridiction d’origine de `NIST`, `EO 14412` et `OMB M-26-15` (ces deux derniers visant les seules administrations publiques) |
| `UTF-8` | *Unicode Transformation Format — 8-bit* | Encodage canonique des manuscrits, registres JSON et textes `L+`, garanti à zéro `U+FFFD` (`verifie.py`) |
| `UUID` | *Universally Unique Identifier* (`RFC 9562`, `v7`) | Identifiant horodaté utilisé pour corréler traces, sagas et entrées d’audit (`Ch. 5`, `Ch. 8`) |
| `VC` | *Verifiable Credential* (`W3C v2.0`) | Justificatif cryptographique vérifiable utilisé dans les mandats inter-entreprises (`Ch. 9`, `Annexe F`) |
| `vLEI` | *verifiable Legal Entity Identifier* (`GLEIF`) | Identité cryptographique d’entreprise exigée pour les mandats B2B `Stade 4` (`Ch. 9`, `POR-013`) |
| `VRAM` | *Video Random Access Memory* | Mémoire vidéo des accélérateurs dimensionnant le débit d’inférence et le `KV-cache` (`Ch. 9`) |
| `W3C` | *World Wide Web Consortium* | Organisme normalisant `VC v2.0`, `DID v1.1`, `ODRL 2.2` et `WCAG 2.1` (`Ch. 9`, `Annexe F`) |
| `WAP` | *Write-Audit-Publish* | Patron de mise en quarantaine, validation et publication atomique des données et mémoires (`Ch. 4`, `POR-005`) |
| `WASI` | *WebAssembly System Interface* (`Preview 2`) | Bac à sable portable à capacités minimales pour exécuter les outils d’agents (`Ch. 7`, `EXIG-SEC-08`) |
| `WCAG` | *Web Content Accessibility Guidelines* (`W3C 2.1 AA`) | Norme d’accessibilité vérifiée à zéro erreur sur `Memoire/Presentation.html` (`Ch. 12`) |
| `WIMSE` | *IETF Workload Identity in Multi System Environments* | Groupe `IETF` normalisant l’identité de charge et les jetons de transaction (`Ch. 7`, `SIG-003`) |
| `WORM` | *Write Once, Read Many* | Stockage immuable protégeant le journal d’audit `JCS` sur `>= 24 mois` (`5/7 ans`) (`Ch. 8`, `EXIG-OBS-11`) |
| `X12` | *ASC X12* (`EDI`) | Standard nord-américain d’échange électronique encadré par adaptateurs typés (`Ch. 4`) |
| `X25519` | Courbe elliptique `Curve25519` (`RFC 7748`) | Échange de clés classique combiné à `ML-KEM-768` en `TLS 1.3` hybride (`Ch. 7`) |
| `YAML` | *YAML Ain’t Markup Language* | Format déclaratif des manifestes d’homologation `CI/CD` (`C27 Ann. F.4`) et politiques `PDP` (`Ch. 7`, `Ch. 12`) |
| `Z1` | Zone `Z1` *Interaction périphérique* (`C26` `[S]`) | Première zone de confiance exposée aux entrées externes non fiables (`Ch. 2`, `Ch. 7`) |
| `Z2` | Zone `Z2` *Orchestration et passerelle* (`C26` `[S]`) | Zone de médiation portant le `PEP`, le `PDP` et le moteur durable (`Ch. 2`, `Ch. 3`) |
| `Z3` | Zone `Z3` *Connaissance et mémoire* (`C26` `[S]`) | Zone cloisonnée des mémoires `CoALA` et de la couche sémantique (`Ch. 2`, `Ch. 4`) |
| `Z4` | Zone `Z4` *Systèmes d’enregistrement* (`C26` `[S]`) | Zone critique des grands livres et bases maîtres sans accès direct du modèle (`Ch. 2`, `Ch. 4`) |
| `Z5` | Zone `Z5` *Audit immuable et contrôle indépendant* (`C26` `[S]`) | Zone `WORM` hors d’atteinte des agents, couplée à `PC5` (`Ch. 2`, `Ch. 8`) |
| `[A]` | Marque épistémique *jalon annoncé révocable* | Date publiée par un organisme mais non codifiée en loi (`À propos`, `Ch. 12`) |
| `[C: …]` | Marque épistémique *conjecture* `DAPP` *sous scénarios et signal* `SIG` | Obligatoire pour tout énoncé prospectif `2031–2035` hors `[D]`/`[A]` (`À propos`, `CA-06`) |
| `[D]` | Marque épistémique *date officielle adoptée* | Échéance fixée par loi, règlement ou scrutin normatif adopté (`À propos`, `Ch. 12`) |
| `[E: …]` | Marque normative *renvoi* `CAD26` | Pointeur direct vers une exigence `EXIG-*` ou un principe `PRIN-*` (`À propos`) |
| `[É]` | Lettre de preuve *documentation technique ou prépublication* | Source d’ingénierie ou prépublication non évaluée par les pairs (`À propos`) |
| `[M]` | Lettre de preuve *étude évaluée par les pairs* | Article scientifique arbitré (`NeurIPS`, `IEEE SaTML`, `KDD`, `SIGMOD`, `GEC`) (`À propos`) |
| `[N]` | Lettre de preuve *texte primaire* `L+` *ou norme formelle* | Loi, règlement, ligne directrice `L+` ou standard ouvert adopté (interdit sur `statut F` ; `CA-12`) |
| `[P: …]` | Marque de portefeuille *renvoi* `PD28` | Pointeur vers une capacité `CAP`, extension `PEX`, initiative `INI`, porte `POR`, principe `PRI` ou décision `DEC` (`À propos`) |
| `[S]` | Lettre de preuve *synthèse ou seuil d’ingénierie d’auteur* | Construction analytique ou seuil sans source primaire indépendante (`À propos`, `CA-09`) |

## Annexe F — Bibliographie primaire sélective (`70` normes, lois et études)

Cette bibliographie rassemble **70 sources primaires** — lois, règlements, lignes directrices prudentielles, normes techniques ouvertes (`IETF`, `NIST`, `W3C`, `Linux Foundation`, `CA/B Forum`, `OpenTelemetry`, `GLEIF`, `OWASP`) et études scientifiques avec `DOI` ou identifiant `arXiv` — qui fondent les douze chapitres du mémoire. Chaque entrée indique son statut probatoire vérifié dans le corpus (`L+` texte lu en brut `UTF-8`, `[M]` étude arbitrée, `[É]` prépublication ou spécification technique, `statut F` source fermée ou sous licence sans obligation `[N]` nouvelle). Les cadres propres aux administrations publiques y sont isolés des règles visant les institutions financières privées.

### F.1 Législation et régulation financière — Canada et Québec (`22` sources)

| Réf. | Source primaire | Statut | Portée & lien / identifiant |
| --- | --- | --- | --- |
| `REF-01` | Parlement du Canada, *Loi sur les banques* (`L.C. 1991, ch. 46`), temporisation `art. 21` au 30 juin 2033 D (`ANC-109`) | `[N]` `L+` | Gouvernance bancaire fédérale, `art. 416` (`https://laws-lois.justice.gc.ca/fra/lois/b-1.01/`) |
| `REF-02` | Parlement du Canada, *Loi sur les sociétés d’assurances* (`L.C. 1991, ch. 47`), temporisation au 30 juin 2033 D (`ANC-110`) | `[N]` `L+` | Assureurs fédéraux (`https://laws-lois.justice.gc.ca/fra/lois/I-11.8/`) |
| `REF-03` | Parlement du Canada, *Loi sur les sociétés de fiducie et de prêt* (`L.C. 1991, ch. 45`), temporisation au 30 juin 2033 D (`ANC-111`) | `[N]` `L+` | Fiducies fédérales (`https://laws-lois.justice.gc.ca/fra/lois/T-19.8/`) |
| `REF-04` | Parlement du Canada, *Loi sur les services bancaires axés sur les consommateurs* (`LSAC`, `L.C. 2026, ch. 3, art. 224`) | `[N]` `L+` | Système bancaire ouvert, interdiction du grattage d’écran (`art. 171`, `SIG-103`) |
| `REF-05` | Ministère des Finances du Canada, *Projet de Règlement sur les services bancaires axés sur les consommateurs* (27 juin 2026, `ANC-104`) | `[N]` `L+` | *Gazette du Canada*, Partie I (`https://gazette.gc.ca/rp-pr/p1/2026/2026-06-27/html/reg3-fra.html`) |
| `REF-06` | Gouverneur en conseil, *Règlement sur le commerce de l’assurance (banques)* (`DORS/92-330`) et *Protection des consommateurs* (`DORS/2021-181`) | `[N]` `L+` | Cloisonnement banque-assurance et vente liée (`Ch. 10`, `PEX-001..005`) |
| `REF-07` | Parlement du Canada, *Loi sur la non-discrimination génétique* (`L.C. 2017, ch. 3`) et *Renvoi* (`2020 CSC 17`, `[2020] 2 R.C.S. 283`) | `[N]` `L+` | Interdiction et purge des données génétiques en assurance de personnes (`Ch. 10`) |
| `REF-08` | Parlement du Canada, *LPRPDE* (`L.C. 2000, ch. 5`), *LRPCFAT* (`L.C. 2000, ch. 17`) et *Loi sur la concurrence* (`L.R.C. (1985), ch. C-34, art. 45, 90.1`) | `[N]` `L+` | Protection fédérale des `RP`, conformité `CANAFE` et prévention de collusion (`Ch. 10`) |
| `REF-09` | `BSIF`, *Ligne directrice E-23 — Gestion du risque de modélisation* (11 sept. 2025, entrée en vigueur 1er mai 2027 D `ANC-103`) | `[N]` `L+` | Gouvernance de bout en bout des modèles et agents (`https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027`) |
| `REF-10` | `BSIF`, *Lignes directrices B-10* (tiers, 2023), *B-13* (risque technologique/cyber, 2022), *E-21* (résilience, 2024) et *B-9* (séismes, 2013) | `[N]` `L+` | Contrats tiers, cybersécurité, continuité manuelle et risques catastrophiques (`Ch. 10`, `Ch. 11`) |
| `REF-11` | `BSIF`, *Ligne directrice B-15 — Gestion des risques climatiques* (maj 8 janv. 2026 ; portée 3 fin 2028 D `ANC-106`) | `[N]` `L+` | Empreinte carbone et divulgation climatique (`https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/climate-risk-management`) |
| `REF-12` | `BSIF`, *Generative and Agentic Artificial Intelligence: Implications for Technology, Cyber Security, and Operational Resilience* (13 juill. 2026) | `[N]` `L+` | Analyse prudentielle canadienne dédiée aux systèmes agentiques (`Ch. 10`, `SIG-101`) |
| `REF-13` | Parlement du Québec, *Loi modernisant des dispositions législatives en matière de protection des renseignements personnels* (`Loi 25`, `L.Q. 2021, c. 25`, `ANC-114`) | `[N]` `L+` | `RPRP`, ÉFVP (`art. 3.3`), décision automatisée (`art. 12.1`), purge (`art. 23`) (`https://www.publicationsduquebec.gouv.qc.ca/fileadmin/Fichiers_client/lois_et_reglements/LoisAnnuelles/fr/2021/2021C25F.PDF`) |
| `REF-14` | Parlement du Québec, *Loi sur les renseignements de santé et de services sociaux* (`L.Q. 2023, c. 5`, `ANC-119`) et *Loi visant l’encadrement du secteur financier* (`L.Q. 2018, c. 23`, `ANC-120`) | `[N]` `L+` | Renseignements de santé, *Loi sur les assureurs* (`art. 71`) et `LDPSF` (`art. 38`) (`Ch. 10`) |
| `REF-15` | Parlement du Québec, *LCCJTI* (`L.Q. 2001, c. 32`) et `CHLC`/`ULCC`, *Loi uniforme sur le commerce électronique* (`LUCE`, `art. 21`, 1999) | `[N]` `L+` | Intégrité des documents technologiques et contrats par agents électroniques (`Ch. 10`) |
| `REF-16` | Commission d’accès à l’information du Québec (`CAI`), *Rapport quinquennal 2026* (mai 2026, `ANC-116`) et guide *Loi 25* (`ANC-115`) | `[N]` `L+` | Interprétation `art. 12.1` et transparence algorithmique (`https://www.cai.gouv.qc.ca/uploads/pdfs/CAI_RQ_2026.pdf`) |
| `REF-17` | Profil québécois `AMF IA` (`2026/documents/Note AMF IA.pdf`, `CRE-IA-2026-01-QC`, 11 nov. 2026, prise d’effet 1er mai 2027 D `ANC-112`) | `[N]` `L+` | Décloisonnement interne de `41` attentes (`AMF-G/R/C/V/P`) et `12 EXIG-AMF` (`Ch. 10`, `Annexe D`) |
| `REF-18` | `ACVM`, *Avis 11-348 du personnel et de consultation : Systèmes d’IA dans les marchés des capitaux* (5 déc. 2024, `ANC-121`) | `[N]` `L+` | Transparence, gouvernance et conflits d’intérêts en valeurs mobilières (`Ch. 10`, `SIG-105`) |
| `REF-19` | `ACVM`, *Règlement 31-103* (`NI 31-103`, maj janv. / oct. 2026 ; fin des rétrofacturations 1er oct. 2028 D `ANC-105`) | `[N]` `L+` | Obligations d’inscription, coûts totaux et réforme des rétrofacturations (`Ch. 10`, `Ch. 12`) |
| `REF-20` | `OCRI` (`CIRO`), *Investment Dealer and Partially Consolidated Rules* (11 août 2026 : `Règle 3400` convenance, `OEO 3241`) | `[N]` `L+` | Séparation conseil / courtage sans conseil (`Ch. 10`, `PEX-012`) |
| `REF-21` | `CCRRA` et `OCRA`, *Directive — Conduite des activités d’assurance et traitement équitable des clients* (2017) et *Plan 2026–2029* (`ANC-108`) | `[N]` `L+` | Équité client en tarification et règlement de sinistres (`https://www.ccir-ccrra.org/Documents/View/4044`) |
| `REF-22` | `SCT Canada` (*Guide Directive prise de décisions automatisée*, 15 sept. 2026) et `MCN Québec` (*Guide IA agentique*, 15 sept. 2026, `ANC-118`) | `[N]` `L+` | Cadres visant uniquement les **administrations publiques** fédérales et québécoises (`Ch. 6`, `Ch. 12`) |

### F.2 Réglementation européenne et internationale (`10` sources)

| Réf. | Source primaire | Statut | Portée & lien / identifiant |
| --- | --- | --- | --- |
| `REF-23` | Union européenne, *Règlement (UE) 2024/1689 sur l’intelligence artificielle* (`RIA` / `EU AI Act`, 12 juill. 2024, `ANC-004`) | `[N]` `L+` | Systèmes à haut risque, `art. 17` (`SMQ`), `art. 50` (`https://publications.europa.eu/resource/celex/32024R1689`) |
| `REF-24` | Union européenne, *Règlement (UE) 2026/1744* (8 juill. 2026) modifiant `(UE) 2024/1689` — Annexe III au 2 déc. 2027 D (`ANC-001, 007`) | `[N]` `L+` | Calendrier révisé du `RIA` (`https://publications.europa.eu/resource/celex/32026R1744`) |
| `REF-25` | `CEN/CENELEC`, *EN 18286:2026 — Quality Management System for AI Act Compliance* (2026) | `[N]` `L+` | Norme européenne de `SMQ` intégrée à `CAD26` v1.2 (`Ch. 10`, `Ch. 11`) |
| `REF-26` | Union européenne, *Règlement (UE) 2022/2554* (`DORA`, 27 déc. 2022, `ANC-009` réexamen administrations publiques européennes) | `[N]` `L+` | Résilience opérationnelle numérique financière (`https://publications.europa.eu/resource/celex/32022R2554`) |
| `REF-27` | Union européenne, *Règlement (UE) 2024/2847* (*Cyber Resilience Act*, `CRA`, `ANC-008`) et *Directive (UE) 2022/2555* (`SRI 2` / `NIS 2`, `ANC-006` réexamen administrations publiques européennes) | `[N]` `L+` | Exigences logicielles `SBOM` et cybersécurité (`https://publications.europa.eu/resource/celex/32024R2847`) |
| `REF-28` | Union européenne, *Règlement (UE) 2023/2854* (*Data Act*, `ANC-003`) et *Directive (UE) 2024/2853* (produits défectueux, `ANC-002`) | `[N]` `L+` | Portabilité nuage et responsabilité logicielle (`https://publications.europa.eu/resource/celex/32023R2854`) |
| `REF-29` | `AICA` (`IAIS`), *Application Paper on the Supervision of Artificial Intelligence* (2 juill. 2025) | `[N]` `L+` | Principes internationaux de supervision IA en assurance (`Ch. 10`) |
| `REF-30` | `IMDA` (Singapour), *Model AI Governance Framework for Agentic AI v1.5* (5 juin 2026) | `[N]` `L+` | Cadre de référence international sur les bornes d’autonomie agentique (`Ch. 6`, `Ch. 10`) |
| `REF-31` | `NIST`, *Artificial Intelligence Risk Management Framework* (`AI RMF 1.0`, `NIST AI 100-1`, 2023) et *Adversarial ML Taxonomy* (`NIST AI 100-2`) | `[N]` `L+` | Gestion des risques IA et menaces adverses (`https://doi.org/10.6028/NIST.AI.100-1`) |
| `REF-32` | Union européenne, *TFUE art. 101* (2016) et États-Unis, *Sherman Antitrust Act* (`15 U.S.C. § 1`) | `[N]` `L+` | Prévention de la collusion algorithmique entre agents tarifaires (`Ch. 10`) |

### F.3 Protocoles agentiques, identité, observabilité et données (`17` sources)

| Réf. | Source primaire | Statut | Portée & lien / identifiant |
| --- | --- | --- | --- |
| `REF-33` | Projet `Model Context Protocol`, *MCP Specification — Revision 2026-07-28* et *Roadmap / AAIF* (`ANC-026`, migration 28 juill. 2027 D) | `[N]` `L+` | Standard modèle-outils sans état, `SEP-3398` (`https://modelcontextprotocol.io/development/roadmap.md`) |
| `REF-34` | Linux Foundation / Projet `A2A`, *Agent2Agent (A2A) Protocol Specification v1.0.0 / v1.0.1* (2026) | `[N]` `L+` | Interopérabilité pair-à-pair par cartes d’agents signées `JWS` (`Ch. 3`, `EXIG-A2A-*`) |
| `REF-35` | `CNCF` *CloudEvents Specification v1.0.2* et *AsyncAPI Specification v3.0 / v3.1* | `[N]` `L+` | Enveloppe d’événements asynchrones, `xagentmaxhops = 4` sans `RP` (`Ch. 3`, `Ch. 5`) |
| `REF-36` | `IETF`, *RFC 8785 — JSON Canonicalization Scheme (JCS)* (juin 2020) et *RFC 7493 — I-JSON* | `[N]` `L+` | Sérialisation déterministe pour idempotence, `CIBA` et audit (`https://www.rfc-editor.org/rfc/rfc8785`) |
| `REF-37` | `IETF`, *RFC 8693 — OAuth 2.0 Token Exchange* (2020) et *RFC 8707 — Resource Indicators* (2020) | `[N]` `L+` | Délégation contrôlée et atténuation de portée sur 2e saut (`https://www.rfc-editor.org/rfc/rfc8693`) |
| `REF-38` | `IETF`, *RFC 9396 — OAuth 2.0 Rich Authorization Requests (RAR)* (2023) | `[N]` `L+` | Liaison fine d’objet `authorization_details` et condensé `JCS` (`https://www.rfc-editor.org/rfc/rfc9396`) |
| `REF-39` | `IETF`, *RFC 9449 — OAuth 2.0 DPoP*, *RFC 8705 — mTLS* et *RFC 9700 — OAuth 2.0 Security Best Current Practice* | `[N]` `L+` | Liaison cryptographique des jetons contre le rejeu (`https://www.rfc-editor.org/rfc/rfc9449`) |
| `REF-40` | `IETF`, *RFC 9562 — Universally Unique IDentifiers (UUID v7)* (2024) | `[N]` `L+` | Corrélation horodatée des traces, sagas et journaux (`https://www.rfc-editor.org/rfc/rfc9562`) |
| `REF-41` | `OpenID Foundation`, *OpenID Connect CIBA Core 1.0*, *Shared Signals Framework (SSF)* / *CAEP* et `FIDO Alliance` *FIDO2/WebAuthn* | `[N]` `L+` | Approbation humaine hors bande `P3` et révocation continue `<= 15 min` (`Ch. 6`, `Ch. 7`) |
| `REF-42` | `CNCF`, *SPIFFE (Secure Production Identity Framework for Everyone)* — *SVID* (`X.509` / `JWT-SVID`) | `[N]` `L+` | Identité cryptographique éphémère sans secret statique (`Ch. 7`, `CAP-035`) |
| `REF-43` | `IETF`, *WIMSE WG* (`draft-ietf-wimse-aims-01`), *SPICE WG*, *DAWN WG* (`ANC-025`) et *AGENTPROTO WG* (`ANC-024`, oct.–nov. 2026) | `[É]` `L+` | Travaux `IETF` surveillés sans dépendance anticipée (`https://datatracker.ietf.org/group/dawn/about/`) |
| `REF-44` | `OpenTelemetry`, *Semantic Conventions for Generative AI Systems* (`v1.41.0` / registre `v1.44.0`, `gen_ai.*`, `SIG-006`) | `[É]` `L+` | Télémétrie sans contenu et corrélation double couloir (`Ch. 8`, `CAP-042`) |
| `REF-45` | `W3C`, *Verifiable Credentials Data Model v2.0* (15 mai 2025), *DID v1.1* (2026) et *ODRL 2.2* | `[N]` `L+` | Justificatifs vérifiables et politiques d’usage d’espaces de données (`https://www.w3.org/TR/vc-data-model-2.0/`) |
| `REF-46` | `GLEIF`, *Agentic AI in Payments: Establishing Interoperable Trust and Control v1.0* (13 août 2026, `vLEI`) | `[É]` `L+` | Mandats d’entreprise vérifiables `vLEI` pour `Stade 4` B2B (`Ch. 9`, `POR-013`) |
| `REF-47` | Paiements Canada, *Real-Time Rail ISO 20022 Message Specification Companion v1.4* (30 mai 2025, `pacs.008`, `SIG-104`) | `[N]` `L+` | Messages de paiements temps réel canadiens (`Ch. 10`) |
| `REF-48` | `EDM Council`, *Financial Industry Business Ontology (FIBO)*, `FinOps Foundation` *FOCUS v1.4*, *CycloneDX v1.7* et *SPDX v3.0* | `[N]` `L+` | Ontologie financière `C3`, allocation `CPO` et `SBOM`/`AIBOM` (`Ch. 4`, `Ch. 8`, `Ch. 11`) |
| `REF-49` | `IEC 62541` (*OPC UA*) et `IEC 62443` (cybersécurité industrielle) | `[É]` | Repères de cloisonnement en lecture seule à la frontière périphérique `OT` (`Ch. 4`, `CAP-028`) |

### F.4 Cryptographie post-quantique, `PKI` et sécurité agentique (`10` sources)

| Réf. | Source primaire | Statut | Portée & lien / identifiant |
| --- | --- | --- | --- |
| `REF-50` | `NIST`, *FIPS 203 (ML-KEM)*, *FIPS 204 (ML-DSA)* et *FIPS 205 (SLH-DSA)* (13 août 2024) | `[N]` `L+` | Primitives post-quantiques normalisées (`https://doi.org/10.6028/NIST.FIPS.203`, `204`, `205`) |
| `REF-51` | `NIST`, *NIST IR 8547 (IPD) — Transition to Post-Quantum Cryptography Standards* (12 nov. 2024) | `[N]` `L+` | Repère technique de dépréciation classique et transition PQC (`https://doi.org/10.6028/NIST.IR.8547.ipd`) |
| `REF-52` | `G7 Cyber Expert Group`, *Statement on Advancing a Coordinated Roadmap for the Transition to PQC in the Financial Sector* (janv. 2026, `ANC-040, 043`) | `[N]` `L+` | Repères financiers `2030–2032` A et `2035` A (`https://assets.publishing.service.gov.uk/media/6966149d8d599f4c09e1ffab/G7-CEG-Quantum-Roadmap.pdf`) |
| `REF-53` | `CA/Browser Forum`, *TLS Baseline Requirements v2.3.1 (Ballot SC-081v3)* (11 avr. 2025 ; `100 j` 15 mars 2027 D `ANC-023`, `47 j` 15 mars 2029 D `ANC-030`) | `[N]` `L+` | Automatisation `ACME` obligatoire (`https://raw.githubusercontent.com/cabforum/servercert/main/docs/BR.md`) |
| `REF-54` | `IETF`, *RFC 9943 — SCITT Architecture* (22 oct. 2026) | `[N]` `L+` | Journaux de transparence et reçus scellés `COSE`/`SLH-DSA` (`https://www.rfc-editor.org/rfc/rfc9943`) |
| `REF-55` | `IETF`, *RFC 9964*, *RFC 10024* (`TLS 1.3` hybride `X25519MLKEM768`) et *RFC 10073* (mai–nov. 2026, `SIG-011`) | `[N]` `L+` | Profils `IETF` post-quantiques pour transport et signatures (`Ch. 7`, `Ch. 12`) |
| `REF-56` | Commission européenne / `NIS Cooperation Group`, *Coordinated PQC Implementation Roadmap* (11 juin 2025, `ANC-031, 037, 044`) | `[N]` `L+` | Coordination européenne PQC (`https://ec.europa.eu/newsroom/dae/redirection/document/117507`) |
| `REF-57` | `SCT Canada` (`AMOPS` / `ITSP.40.062`, `ANC-032, 039, 041`), *Executive Order 14412* (`ANC-036`) et `OMB M-26-15` (`ANC-035, 042`, juin 2026) | `[N]` `L+` | Échéances PQC visant uniquement les **administrations publiques** canadiennes et américaines (`Ch. 7`, `Ch. 12`) |
| `REF-58` | `OWASP`, *Top 10 for Agentic Applications (ASI 2026)* et *Non-Human Identities (NHI) Top 10* | `[É]` | Taxonomies de menaces `ASI01–ASI10` et `NHI2/7/8/9` (`Ch. 7`) |
| `REF-59` | `MITRE`, *ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems)* et `NIST` *RFI AI Agent Security* (`doc. 2026-00206`, janv. 2026) | `[É]` `L+` | Scénarios d’équipe rouge `E3` et menaces d’agents (`Ch. 7`, `Ch. 8`) |

### F.5 Études scientifiques arbitrées, travaux empiriques et repères `statut F` (`11` sources)

| Réf. | Source primaire | Statut | Portée & lien / `DOI` |
| --- | --- | --- | --- |
| `REF-60` | Garcia-Molina, H. & Salem, K. (1987), *Sagas*, *ACM SIGMOD Record* 16(3), pp. 249–259 | `[M]` `L+` | Fondement formel des transactions compensables (`https://doi.org/10.1145/38714.38742`) |
| `REF-61` | Haasnoot, M., Kwakkel, J. H., Walker, W. E. & ter Maat, J. (2013), *Dynamic adaptive policy pathways*, *Global Environmental Change* 23(2), pp. 485–498 ; Marchau et al. (2019), *DMDU*, Springer OA | `[M]` `L+` | Méthode `DAPP` des paliers `P1–P3` et signaux `SIG` (`https://doi.org/10.1016/j.gloenvcha.2012.12.006` ; `https://doi.org/10.1007/978-3-030-05252-2`) |
| `REF-62` | Goddard, K., Roudsari, A. & Wyatt, J. C. (2012), *Automation bias: a systematic review*, *JAMIA* 19(1), pp. 121–127 | `[M]` | Biais d’automatisation justifiant cas témoins et vue différentielle (`https://doi.org/10.1136/amiajnl-2011-000089`) |
| `REF-63` | Sumers, T. R., Yao, S., Narasimhan, K. & Griffiths, T. L. (2024), *Cognitive Architectures for Language Agents (CoALA)*, *TMLR* | `[M]` | Taxonomie des quatre mémoires isolées (`arXiv:2309.02427`, `Ch. 4`) |
| `REF-64` | Cemri, M., Pan, M. Z., Yang, S. et al. (2025), *Why Do Multi-Agent LLM Systems Fail? (MAST)*, *NeurIPS 2025* (`1 642` traces `v3`, `41–86,7 %` d’échecs) | `[M]` `L+` | Taxonomie de `14` modes d’échec multiagents (`arXiv:2503.13657`, `Ch. 1`, `Ch. 5`) |
| `REF-65` | Debenedetti, E., Shumailov, I., Carlini, N. et al. (2026), *Defeating Prompt Injections by Design (CaMeL)*, *IEEE SaTML 2026* ; Peters-Gill et al., *Can CaMeLs Talk?* | `[M]` / `[É]` | Séparation contrôle/données (`77 %` vs `84 %`) et limite de non-composition (`arXiv:2503.18813`, `Ch. 7`) |
| `REF-66` | Pan, M. et al. (2025–2026), *Measuring Agents in Production (MAP)* (`68 %` à `<= 10` étapes, `16/20` sur flux fixes) ; *Nubank* (`KDD 2026`), *Customer Support AI Agents at 100M-User Scale* | `[M]` / `[É]` `L+` | Sobriété empirique des déploiements réels (`arXiv:2512.04123`, `Ch. 1`) |
| `REF-67` | Beurer-Kellner, L. & Fischer, M. (2025), *MCP Security Notification: Tool Poisoning Attacks* ; *TEE.fail* (`< 1 000 $ US`, `C27 ch. 44`) | `[É]` | Empoisonnement d’outils `MCP` et attaques matérielles sur enclaves (`Ch. 3`, `Ch. 7`, `Ch. 9`) |
| `REF-68` | `METR` (8 sept. 2026), *Time Horizons v1.1* (`~17,4 h` à `50 %` vs `~3,1 h` à `80 %`) ; `Stanford HAI` (2026), *AI Index Report — Ch. 4* ; `AIE` (avr. 2025), *Energy and AI* | `[É]` `L+` | Limites de fiabilité longue, économie et charge électrique `SIG-016` (`Ch. 1`, `Ch. 8`) |
| `REF-69` | Statistique Canada (*11-621-m2026010-fra*, juin 2026 ; *11-621-m2026013-fra*, oct. 2026), Banque du Canada (*SAP 2026-22*, 2 juin 2026) et `ISDE Canada` (*Stratégie nationale IA*, juin 2026, `ANC-046`) | `[N]` `L+` | Adoption canadienne (`19,2 %` ; `40,4 %` finance), emploi et productivité (`https://www150.statcan.gc.ca/n1/pub/11-621-m/11-621-m2026010-fra.htm`) |
| `REF-70` | **Sources repérées demeurées au** `statut F` **(aucune obligation nouvelle) :** portail `lautorite.qc.ca` (`T-01`, `T-02`, `T-13..15`, `T-25`, `N-03`), codifications LégisQuébec (`T-04`, `T-28`, `T-29`, `N-02`), page directe `T-03` (administrations publiques), notes `OCRI` (`T-24`, `N-08`), `OICV` (`R-11`), normes sous licence (`FDX`, `ACORD`, `CSIO`, `ISO/IEC 42001`, `ISO/IEC 42105`, `TOGAF`, `UIT-T F.748.93`) et lots non déposés `C27` (`P1-B2..B4`, `P3-L2`) | `statut F` | Conservées honnêtement hors lecture sans contournement `HTTP 403` ni péage (`CA-12`, `Annexe D.4`) |
