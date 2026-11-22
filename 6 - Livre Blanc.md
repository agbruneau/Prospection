OUVRAGE DE RÉFÉRENCE ARCHITECTURALE Interopérabilité et Orchestration en Entreprise Agentique Architecture de référence, protocoles ouverts et gouvernance d’exécution pour architectes d’entreprise et de solutions

Cellule d’architecture automatisée — Pipeline Gemini / Wyvern

Novembre 2026

# Table des matières

- Liminaire — Résumé exécutif à double entrée et conventions architecturales — 5
  - 0.1 Colophon d’ingénierie 100 % IA et protocole de vérifiabilité Wyvern — 5
  - 0.2 Résumé exécutif — Direction de l’architecture d’entreprise (EA) — 5
  - 0.3 Résumé exécutif — Architecture de solutions et ingénierie de plateforme (SA) — 6
  - 0.4 Parcours de lecture par rôle et conventions graphiques (ArchiMate, C4, séquences) — 7
- Partie I — Fondations architecturales de l’entreprise agentique — 9
- Chapitre 1 — Du système d’information déterministe à l’entreprise agentique : rupture et continuité architecturales — 10
  - 1.1 Stratification du SI : Systems of Record, Systems of Engagement et Systems of Agency — 10
  - 1.2 Rupture épistémique : non-déterminisme, latence variable et effets de bord irréversibles — 13
  - 1.3 Spectre d’autonomie opérationnelle (`L0` à `L4`) et modalités Human-in/on-the-Loop — 17
  - 1.4 Dette technique contre dette cognitive : dérive silencieuse et couplage aux modèles — 21
  - Synthèse et transition — 24
- Chapitre 2 — Cadre d’architecture d’entreprise : capacités métier, modélisation TOGAF/ArchiMate et topologie en plans — 25
  - 2.1 Cartographie des capacités métier augmentées et refonte des chaînes de valeur — 25
  - 2.2 Extension du métamodèle TOGAF ADM et stéréotypes ArchiMate pour acteurs cognitifs — 27
  - 2.3 Architecture cible de référence en quatre plans découplés — 30
  - 2.4 Gouvernance du portefeuille : arbitrage Acheter (agents SaaS) vs Assembler vs Construire — 33
  - Synthèse et transition vers le chapitre 3 — 36
- Chapitre 3 — Anatomie d’un agent d’entreprise et partition des charges de travail : la règle hybride 80/20 — 37
  - 3.1 Anatomie d’un Agent Harness de production et environnements d’exécution durcis (SHADI) — 37
  - 3.2 Typologie et spécialisation des modèles : frontier LLMs, SLMs spécialisés et cascade d’inférence — 41
  - 3.3 Ingénierie de la partition 80/20 entre flux déterministes et nœuds cognitifs — 43
  - 3.4 Contrats typés d’entrée/sortie (Structured Outputs et JSON Schema) — 45
  - Synthèse architecturale du chapitre — 49
- Partie II — Interopérabilité : protocoles, contrats et patrimoine applicatif — 50
- Chapitre 4 — Interopérabilité verticale agent-outil : Model Context Protocol (MCP), passerelles et intégration du patrimoine — 51
  - 4.1 Du couplage M × N au standard MCP : architecture sans état, primitives et négociation — 51
  - 4.2 Ergonomie sémantique des outils (Agent-Computer Interface) contre l’anti-patron Swagger-to-MCP — 55
  - 4.3 Architecture des MCP Gateways d’entreprise : médiation REST/gRPC/GraphQL, cache et découverte dynamique — 58
  - 4.4 Encapsulation du SI patrimonial : couches anti-corruption devant ERP, CRM et mainframes — 61
  - Synthèse architecturale du chapitre — 64
- Chapitre 5 — Interopérabilité horizontale inter-agents et fédération : A2A, AGNTCY et maillage multi-fournisseurs — 65
  - 5.1 Frontière décisionnelle entre outil passif (`MCP`) et pair autonome opaque (`A2A`) — 65
  - 5.2 Protocole `A2A` : `Agent Cards` signées, cycle de vie asynchrone des `Tasks`, SSE et `Artifacts` — 68
  - 5.3 Infrastructure fédérée `AGNTCY` : schémas `OASF`, `Agent Directory Service` et messagerie `SLIM` /`MLS` — 72
  - 5.4 Ponts inter-cadriciels (`LangGraph`, `Semantic Kernel`, `AutoGen`) et fédération B2B avec agents SaaS tiers — 76
  - Synthèse architecturale et transition — 78
- Chapitre 6 — Ingénierie du contexte, mémoire distribuée et souveraineté sémantique des données — 80
  - 6.1 Taxonomie des quatre mémoires d’entreprise : travail, épisodique, sémantique et procédurale — 80
  - 6.2 De la recherche naïve à l’Agentic RAG fédéré : hybride lexical/vectoriel, Text-to-SQL gouverné et graphes — 84
  - 6.3 Souveraineté sémantique : arrimage aux Data Contracts, couches BI, MDM et ontologies métier — 87
  - 6.4 Gouvernance mémorielle : propagation des ACL, prévention de l’empoisonnement et isolation multi-locataires — 90
  - Synthèse et transition vers la Partie III — 93
- Partie III — Orchestration, chorégraphie et exécution durable — 95
- Chapitre 7 — Patrons d’orchestration et topologies de composition multi-agents — 96
  - 7.1 Quand éviter le multi-agents : critères quantitatifs face à un agent unique outillé — 96
  - 7.2 Topologies dirigées : séquentiel typé, routeur sémantique, Supervisor et planification DAG — 99
  - 7.3 Topologies collaboratives et vérificatrices : Handoff, Scatter-Gather et boucle Generator-Verifier — 101
  - 7.4 Ingénierie des transferts d’état : passage par référence (Artifact URI) et prévention du Goal Drift — 106
  - Synthèse architecturale et transition vers le chapitre 08 — 109
- Chapitre 8 — Chorégraphie réactive et Event Mesh d’entreprise — 110
  - 8.1 Agents ambiants déclenchés par événements : Kafka, Solace, NATS, CloudEvents et AsyncAPI — 110
  - 8.2 Arbitrage architectural entre orchestration centralisée et chorégraphie décentralisée — 114
  - 8.3 Pathologies réactives : tempêtes d’événements, boucles d’écho sémantiques, DLQ et backpressure LLM — 118
  - 8.4 Patron hybride cible : orchestration macro-réglementaire et chorégraphie intra-domaine — 121
  - Synthèse et transition vers le chapitre 9 — 123
- Chapitre 9 — Exécution durable, gestion d’état transactionnel et résilience opérationnelle — 124
  - 9.1 Modes de défaillance des boucles longues en mémoire volatile (`timeouts`, `429`, redéploiements) — 124
  - 9.2 `Durable Execution` (`Temporal`, `Restate`, `Dapr`) : journalisation déterministe, `replay` et `checkpointing` — 127
  - 9.3 Cohérence sans verrou distribué : idempotence de bout en bout, `Outbox` et Sagas compensatoires — 131
  - 9.4 Cycles longs `Human-on-the-Loop`, escalades asynchrones sous `SLA` et bascule multi-fournisseurs — 135
  - Synthèse et transition vers la Partie IV — 138
- Partie IV — Confiance, sécurité Zero-Trust, observabilité et gouvernance — 139
- Chapitre 10 — Architecture de sécurité Zero-Trust, identités non humaines (NHI) et maîtrise des risques — 140
  - 10.1 Modèle de menaces OWASP Agentic Top 10 : Goal Hijacking, Confused Deputy et injections indirectes — 140
  - 10.2 Identités non humaines (NHI) cryptographiques : attestation de workload SPIFFE/SPIRE et SVID éphémères — 143
  - 10.3 Autorisation dynamique : OAuth 2.0 On-Behalf-Of (RFC 8693), downscoping et Intent Gates (OPA/Cedar) — 146
  - 10.4 Confinement d’exécution (microVM, gVisor, WASM), protection PII et postures AISPM/AIDR — 150
  - Synthèse et transition — 154
- Chapitre 11 — Observabilité distribuée (OpenTelemetry), EvalOps continu et fiabilité (SRE agentique) — 155
  - 11.1 Instrumentation unifiée `OpenTelemetry GenAI` : corrélation traces, identités `SPIFFE` /`OBO` et coûts — 155
  - 11.2 Pipeline `EvalOps` industriel : `golden datasets` de trajectoires, `mock MCP servers` et juges calibrés — 159
  - 11.3 `SRE` agentique : `SLI` /`SLO` comportementaux, détection de dérive sémantique et rejeu forensique — 162
  - 11.4 Coupe-circuits cognitifs, plafonds de profondeur et repli automatique vers flux déterministe — 165
  - Synthèse et transition vers le chapitre 12 — 168
- Chapitre 12 — Gouvernance d’entreprise, conformité réglementaire et FinOps agentique — 169
  - 12.1 Modèle opérationnel cible : registre central d’agents, homologation par risque et Agent Owner — 169
  - 12.2 Conformité multi-juridictionnelle : Loi 25 (Québec), LPRPDE, EU AI Act, NIST AI RMF et ISO/IEC 42001 — 172
  - 12.3 FinOps agentique : économie unitaire par transaction métier, facteur d’amplification, caching et cascade SLM/LLM — 176
  - 12.4 Pilotage budgétaire, refacturation interne (showback/chargeback), TCO/ROI ajusté du risque et réversibilité — 179
  - Synthèse architecturale et transition vers la Partie V — 182
- Partie V — Ingénierie de plateforme, blueprints de référence et transformation — 183
- Chapitre 13 — Ingénierie de plateforme agentique, AI Gateway hybride et cycle de vie industriel (GitOps) — 184
  - 13.1 Architecture d’une Internal Agentic Platform (IAP) : Golden Paths et séparation plateforme/domaines — 184
  - 13.2 Topologie de l’AI Gateway hybride : multi-nuages et inférence souveraine sur site (vLLM, NIM) — 187
  - 13.3 GitOps cognitif : versionnement conjoint du code, des prompts, des schémas OASF/MCP et politiques OPA — 191
  - 13.4 Déploiement progressif (shadow, canary, blue/green) et compatibilité des workflows durables en vol — 194
  - Synthèse architecturale et transition vers le chapitre 14 — 197
- Chapitre 14 — Architectures de référence de bout en bout : trois blueprints sectoriels et fédérés instanciables — 199
  - 14.1 Blueprint 1 — Traitement transactionnel hautement réglementé (Temporal + MCP Gateway + OAuth OBO + Audit) — 199
  - 14.2 Blueprint 2 — Maillage inter-départemental et partenaires B2B (A2A + AGNTCY/OASF + Event Mesh) — 202
  - 14.3 Blueprint 3 — Exploitation souveraine à haute confidentialité (AI Gateway locale + RAG ACL + microVM) — 205
  - 14.4 Synthèse comparative non fonctionnelle : latence p95, débit, RPO/RTO, enveloppe FinOps et équipes — 208
  - Synthèse architecturale et transition vers le chapitre 15 — 211
- Chapitre 15 — Coexistence patrimoniale (BPM/iPaaS/RPA), anti-patrons critiques et feuille de route d’adoption — 212
  - 15.1 Rationalisation et coexistence avec l’automatisation existante (BPMN, iPaaS/API Management, RPA) — 212
  - 15.2 Migration incrémentale (Strangler Fig agentique) : ombre, recommandation, action bornée, autonomie sous contrat — 215
  - 15.3 Catalogue diagnostique des 12 anti-patrons majeurs : symptômes, causes racines et remédiations — 217
  - 15.4 Modèle de maturité en 5 paliers et feuille de route séquencée (90 / 180 / 360 jours) — 221
  - Synthèse et clôture de l’ouvrage — 223
- Annexe A — Glossaire normatif bilingue (français canadien / anglais) — 225
- Annexe B — Gabarit d’Architecture Decision Record (ADR) et liste de contrôle EA/SA (40 critères) — 228
  - B.1 Gabarit d’Architecture Decision Record (ADR) agentique — 228
  - B.2 Liste de contrôle d’homologation EA / SA (40 critères) — 229
- Annexe C — Bibliographie maîtresse consolidée — 232
- Annexe D — Synthèse du journal d’ancrage automatisé — 251

# Liminaire — Résumé exécutif à double entrée et conventions architecturales

L’insertion d’agents autonomes (`LLM`, `SLM`) entre les interfaces (`Systems of Engagement`, `SoE`) et les systèmes d’autorité (`Systems of Record`, `SoR`) rompt trente ans de déterminisme applicatif sans rendre les bases transactionnelles caduques.

Au fil des quinze chapitres, une thèse s’impose : **la fiabilité de l’entreprise agentique tient à l’ingénierie des frontières plutôt qu’à la puissance des modèles**. Maintenir environ `80 %` du contrôle, des règles impératives, des identités et des mutations en logique déterministe, tout en confinant les `20 %` cognitifs sous contrats typés, télémétrie et réversibilité, transforme l’agentique en capacité industrielle auditable.

## 0.1 Colophon d’ingénierie 100 % IA et protocole de vérifiabilité Wyvern

Cet ouvrage a été conçu, rédigé, schématisé, validé et assemblé sans rédaction humaine par la **cellule d’architecture automatisée — Pipeline Gemini / Wyvern** (`Novembre 2026`), selon une chaîne pilotée par `manifest.json`, `glossaire-registre.md` et un assemblage `Pandoc` /`Typst`.

La traçabilité des chapitres `01` à `15` (Parties I à V) repose sur quatre verrous :

1. **Cloisonnement unitaire** : périmètre borné sans redite. Les unités `01` à `15` totalisent **79 522 mots** et **225 pages** avant l’ajout du liminaire et des annexes (cible globale : **250 ± 8 pages** sur 17 unités).
2. **Base de sources fermée** : aucune citation de mémoire. Chaque chapitre s’appuie sur un registre (`sources/ch<NN>-sources.md`) réunissant spécifications ouvertes (`AAIF`, `IETF`, `CNCF`, `W3C`), référentiels (`OWASP`, `NIST`, `ISO/IEC`, `CSA`, `BSIF` /`OSFI`), textes légaux et études vérifiés en ligne, soit **394 sources primaires distinctes** consolidées à l’**Annexe C**.
3. **Ancrage atomique Wyvern** : audit phrase par phrase face aux sources (`ancrage/ch<NN>-ancrage.md`). Sur **1 002 affirmations atomiques** vérifiées, **883** (`88,1 %`) étaient supportées dès le premier jet et **119** (`11,9 %`) rectifiées ou retirées (bilan à l’**Annexe D**).
4. **Validation et inspection PDF** : contrôles `validate.ts`, compilation stricte de **59 figures** (`56` schémas `PlantUML` `.svg` via `-failfast2` et `3` arbres `Mermaid` `.png`) et **52 tableaux**, suivis d’une inspection visuelle complète.

> **Périmètre de validité** — Synthèse des standards et retours vérifiés à **novembre 2026**; aucun protocole inédit n’est formulé et les revues internes (`ÉFVP`, `AIA`, `3LoD`) demeurent requises.

## 0.2 Résumé exécutif — Direction de l’architecture d’entreprise (EA)

Selon `RAND`, plus de `80 %` des projets d’IA échouent faute de cadrage métier et d’infrastructure; seuls `21 %` des dirigeants possèdent une gouvernance mature et `40 %` des projets agentiques risquent l’abandon d’ici 2027 (chapitre 15). L’`EA` urbanise donc les `Systems of Agency` sans exposer les `SoR`.

**Urbanisation et portefeuille (Partie I).** Face aux queues de latence, erreurs sous `200 OK` et mutations irréversibles, le **chapitre 1** gradue l’autonomie (`L0` –`L4`), proscrit la validation mécanique et contient la **quadruple dette** (technique, cognitive, d’intention, couplage `CACE`) en écartant les règles métier des prompts. Le **chapitre 2** étend `TOGAF ADM` et `ArchiMate 3.2` : tout agent est un `«Cognitive Actor»` (`Application Component`, jamais `Business Actor`), relié à `«Human-on-the-Loop»` et `«Guardrail Policy»`. Il découpe le SI en **quatre plans** (Expérience, Orchestration, Interopérabilité/Contexte, Confiance/Observabilité) et arbitre **Acheter (**`SaaS`**) vs Assembler (**`MCP` **/**`A2A`**, défaut) vs Construire**. Le **chapitre 3** impose la **règle 80/20** devant l’`ARB`.

**Souveraineté, conformité et FinOps (Parties II à V).** Les chapitres **04 à 06** préviennent l’enfermement via `MCP` devant couches anti-corruption (`ERP` /mainframes), `A2A` /`AGNTCY` (`OASF`) pour l’opacité B2B, et arrimage `ODCS`, `BI`, `MDM` et `OWL 2` /`SHACL`. Les chapitres **07 à 09** justifient le multi-agents face au facteur `~15×`, imposent une orchestration macro-réglementaire inter-domaines et sécurisent les transactions par exécution durable.

Appuyé sur le `Zero-Trust` (chapitre 10) et `OpenTelemetry` /`EvalOps` (chapitre 11), le **chapitre 12** impose un **registre central** avec `Agent Owner`, paliers `R1` **–**`R4` et **Trois Lignes de Défense (**`3LoD`**)** alignées sur `OSFI E-23` (1er mai 2027). Un socle `ISO/IEC 42001:2023` **+** `NIST AI RMF / AI 600-1` satisfait **Loi 25** (`RPRP`, `ÉFVP`, `art. 12.1`), **LPRPDE** (projet `C-27` caduc le 6 janvier 2025), **Directive** `SCT` (`AIA`) et `EU AI Act` (`art. 50` août 2026, `Annexe III` décembre 2027). Côté `FinOps` (`98 %` des équipes gèrent l’IA, `43 %` peinent à prouver le `ROI`), l’`EA` pilote le **coût par résultat réussi** (`p50` /`p90` /`p99`), rapproche `OTel GenAI` et `FOCUS` (*Showback* puis *Chargeback*), suit le `TCO` à cinq postes (`PTU` + `PAYG`) et garantit la réversibilité (`Data Act`). Les chapitres **13 à 15** déploient l’`IAP`, comparent trois blueprints, cohabitent avec `BPMN` /`iPaaS`, résorbent le `RPA`, bloquent **12 anti-patrons (**`AP-01` **–**`AP-12`**)** et cadencent la maturité sur **90 / 180 / 360 jours** (`M1` –`M5`).

> **Arbitrage EA / SA** — Bloquer tout déploiement `R3` –`R4` ou fédération `A2A` avant consolidation du socle `J90–J180` : registre avec `Agent Owner`, passerelles `AI` /`MCP`, identités `NHI`, `EvalOps` bloquant et moteur durable.

## 0.3 Résumé exécutif — Architecture de solutions et ingénierie de plateforme (SA)

Le `SA` et l’ingénierie plateforme enferment chaque nœud probabiliste dans un exosquelette déterministe, observable, idempotent et remplaçable.

**Harnais et interopérabilité (Parties I et II).** Le **chapitre 3** confine l’`Agent Harness` sous `SHADI` local ou `gVisor` /`Firecracker` /`Kata` via `SandboxWarmPool` (zéro `runc` nu). La règle **80/20** oriente vers des `SLM` (`RouteLLM`, `FrugalGPT`) et scelle chaque nœud par `JSON Schema Draft 2020-12` (`CFG` /`XGrammar`, `strict: true`) et validation sémantique. La Partie II normalise trois axes :

- **Vertical (**`Agent → Outil`**, chap. 04)** : `MCP` sans état (`Streamable HTTP`, `2026-07-28`), façades `ACI` (bannissant *Swagger-to-MCP*) derrière `MCP Gateway` (`server.json`, `ttlMs`, `Code Mode`), et couches `ACL` /`CQRS` /`CDC` (`Debezium`) devant les `SoR`.
- **Horizontal (**`Agent ↔ Agent`**, chap. 05)** : délégation opaque `A2A v1.0` (`AgentCard` `JWS` /`RFC 8785`, `Tasks`, `SSE`, webhooks anti-`SSRF`) et fédération `AGNTCY` (`OASF`, `ADS` `OCI` /`Kademlia` /`Sigstore`, `SLIM` /`MLS`).
- **Mémoire (chap. 06)** : quatre mémoires séparées (procédurale sous `Git`), `Agentic RAG` hybride (`RRF` + `Cross-Encoder`), `Text-to-SQL` sémantique, `GraphRAG` et propagation `ACL` (`OpenFGA`, `PostgreSQL RLS`, mode `Silo`).

**Coordination, durable et confiance (Parties III à V).** Le **chapitre 7** privilégie l’agent unique ou les graphes dirigés (`Séquentiel`, `Routeur`, `Supervisor`, `DAG`), borne les boucles (`Handoff`, `Scatter-Gather`, `Generator-Verifier`, `Group Chat` ≤ 3 agents), transfère par `Artifact URI` et ancre l’objectif (`Goal Pinning`). Le **chapitre 8** déploie l’`Event Mesh` (`CloudEvents v1.0.2`, `AsyncAPI 3.0.0` sur `Kafka`, `Solace`, `NATS JetStream`) verrouillé par `ce_ttl`, `DLQ` et quotas `TPM`. Le **chapitre 9** confie l’état long à un moteur durable (`Temporal`, `Restate`, `Dapr Workflow`) isolant le `LLM` en `Activities` /`ctx.run()`, remplace `2PC` par `Idempotency-Key`, `Outbox` et **Sagas compensatoires**, et gère l’attente `HOTL` via `Signals` /`Awakeables` sous `SLA`.

En sécurité, le **chapitre 10** unit `OWASP ASI01–10` /`MAESTRO`, `CaMeL`, `SPIFFE` **/**`SPIRE`, `OAuth 2.0 OBO` (`RFC 8693` /`8707`, `DPoP`, `RFC 9396`, `Transaction Tokens`), `Intent Gates` (`OPA` /`Cedar`), confinement `Firecracker` /`gVisor` /`Wasmtime`, filtrage `PII` et `AISPM` /`AIDR`. Le **chapitre 11** corrèle `OTel GenAI` (`SEP-414`), verrouille les promotions par `EvalOps` (`mock MCP`, `κ`, `pass^k`) et arme des **coupe-circuits à cinq états** (`METRICS_ONLY` → `CLOSED` → `OPEN` → `HALF_OPEN` → `FORCED_OPEN`) vers `L0`. Le **chapitre 13** bâtit l’`IAP` (`Backstage`, `Kratix`, `Crossplane`), l’`AI Gateway` (`GAIE` /`LiteLLM`, `EPP` /`llm-d`, `vLLM` /`NIM`), le `GitOps` du quintette (`SLSA v1.2` /`Sigstore`) et le `Worker Versioning Pinned`; le **chapitre 14** instancie **trois blueprints** (`Temporal` + `WORM`, B2B `A2A` /`Event Mesh`, Souverain `CoCo` /`microVM`); le **chapitre 15** encadre la migration *Strangler Fig* en quatre stades.

## 0.4 Parcours de lecture par rôle et conventions graphiques (ArchiMate, C4, séquences)

La double lecture `EA` /`SA` oriente chaque profil vers les chapitres et contrôles correspondant à son mandat (**Tableau 0.1**).

| Profil | Priorité décisionnelle | Parcours recommandé | Livrables et contrôles |
| --- | --- | --- | --- |
| **EA (Architecture d’entreprise)** | Urbanisation 4 plans, portefeuille, conformité, trajectoire | 01, 02, 06 (6.3), 12, 14 (14.4), 15, Annexes A–B | Cartographie `ArchiMate`, dossier `ARB`, feuille de route 360 j |
| **SA (Solutions et intégration)** | Contrats `80/20`, `MCP` /`A2A`, exécution durable, blueprints | 01, 03, 04–09, 10, 11, 13, 14 | `Agent Harness`, passerelles, `Sagas`, `ADR`, topologies |
| **CISO et sécurité (**`NHI`**)** | `ASI01–10` /`MAESTRO`, `SPIFFE`, `OBO`, confinement, `ACL` | 03 (3.1), 04–06, 10, 14 (14.1, 14.3), Annexe B | `Intent Gates` `OPA` /`Cedar`, `SVID`, `microVM`, `AISPM` /`AIDR` |
| **Plateforme (**`IAP`**) et** `SRE` | *Golden Paths*, `AI Gateway`, `GitOps`, `OTel`, `EvalOps` | 03, 08, 09, 11, 13, 14, 15 (15.2–15.4) | `EvalOps` bloquant, `Worker Versioning`, `SLO`, coupe-circuits |
| `FinOps` **et Agent Owner** | Coût par résultat, dérive `O(T²)` /`15×`, `FOCUS`, `ROI` | 01 (1.3), 02, 03, 07 (7.1), 12, 14 (14.4), 15 | Registre `R1–R4`, `PTU` /`PAYG`, `TCO` 5 postes, *Showback* |
| **Conformité,** `RPRP`**, audit** | `OSFI E-23`, `Loi 25`, `LPRPDE` /`SCT`, `EU AI Act`, `ISO 42001` | 01 (1.3), 02 (2.2), 06, 11, 12 (12.1–12.2), 15, Annexes B–D | `ÉFVP`, fiche `AIA`, traces `OTel` /`WORM`, audit Wyvern |

*Tableau 0.1 — Parcours de lecture ciblés selon le profil décisionnel.*

Pour rester lisibles sur papier Lettre, les schémas comptent 12–16 éléments : `PlantUML` (`.puml` → `.svg`) couvre `56` des `59` figures des chapitres `01` –`15`, et `Mermaid` (`.mmd` → `.png` 300 DPI) les `3` arbres décisionnels (`02-04`, `03-03`, `05-02`). Le **Tableau 0.2** codifie ces notations et la frontière déterministe/probabiliste.

| Notation et moteur | Usage et volume (01–15) | Éléments et relations clés | Frontière déterministe vs probabiliste |
| --- | --- | --- | --- |
| `ArchiMate 3.2` (`PlantUML`, `.svg`) | Urbanisation `EA`, capacités, feuille de route (`7` fig.) | `«Cognitive Actor»`, `«Intent Contract»`, `«Guardrail Policy»`, `«Human-on-the-Loop»` | Strates `SoE` /`SoA` /`SoR` séparées; l’agent reste un composant applicatif borné |
| `C4` (`PlantUML`, `.svg`) | Architecture `SA`, 4 plans et blueprints (`21` fig.) | `System_Boundary`, `Container`, `ContainerDb`, flux `MCP` /`A2A` /`OBO` /`OTLP` | Enceintes déterministes (`Harness`, `80/20`, `MCP Gateway`, `ACL`, `OPA`, durable) isolant les `LLM` |
| **Séquences** (`PlantUML`, `.svg`) | Protocoles `MCP` /`A2A`, `OBO`, `Sagas` et rejeu (`14` fig.) | Participants, `autonumber`, `alt` /`loop`, appels (`->`) et retours `SSE` (`-->`) | Le harnais ou moteur durable garde le contrôle; l’inférence reste une invocation bornée |
| **États et UML** (`PlantUML`, `.svg`) | Automates `L0–L4`, coupe-circuits (`2` fig.) et flux (`12` fig.) | États initiaux, transitions gardées, losanges, paquets gauche-droite | Seuils, plafonds `max_turns` et replis `OPEN` /`FORCED_OPEN` (`L0`) tracés en verrous explicites |
| **Arbres** (`Mermaid`, `.png`) | Logigrammes de tri (`3` fig.) | Losanges à branches étiquetées et feuilles prescriptives | Chaque arbre écarte d’abord les flux déterministes (`L0`, API fixe) avant toute branche cognitive |

*Tableau 0.2 — Conventions graphiques et codification visuelle de la frontière déterministe / probabiliste.*

# Partie I — Fondations architecturales de l’entreprise agentique

# Chapitre 1 — Du système d’information déterministe à l’entreprise agentique : rupture et continuité architecturales

Pendant plus de trois décennies, l’architecture des systèmes d’information d’entreprise a reposé sur un postulat tacite : à entrée identique et à état persistant équivalent, un composant applicatif exécute le même chemin et produit exactement la même sortie. Progiciels de gestion, bus d’intégration, automatisation robotisée de processus et moteurs de règles tiraient leur fiabilité du déterminisme de leurs contrats d’exécution. L’intégration de grands modèles de langage (*Large Language Models*, `LLM`) outillés au cœur des opérations brise ce postulat, non parce qu’elle rend les bases transactionnelles obsolètes, mais parce qu’elle insère une couche de raisonnement probabiliste capable de planifier, d’invoquer des interfaces et d’altérer l’état du monde réel [1] [2] [3].

L’échec de la majorité des premiers pilotes en entreprise découle d’une erreur de catégorisation architecturale : traiter un système agentique comme un simple assistant conversationnel posé devant des interfaces de programmation (`API`), sans redéfinir les frontières d’autorité, le régime temporel, la réversibilité des effets de bord ni l’équilibre entre dette technique et dette cognitive [4] [5] [6]. Un assistant conversationnel fautif expose l’organisation à une erreur de lecture; un système autorisé à muter des actifs transactionnels convertit une ambiguïté sémantique, un bruit d’inférence ou une dérive statistique en incident financier, opérationnel ou réglementaire immédiat [5] [7].

Ce chapitre pose les fondations conceptuelles et les critères d’éligibilité qui permettent à un comité d’architecture d’autoriser ou de disqualifier une charge de travail agentique. Fidèle à sa frontière d’étanchéité, il ne détaille ni les protocoles d’interopérabilité (Partie II) ni les topologies multi-agents et moteurs d’exécution durable (Partie III). Il croise systématiquement la lecture de l’architecte d’entreprise (`EA`), axée sur le portefeuille applicatif, la conformité et la maîtrise des risques, et celle de l’architecte de solutions (`SA`), centrée sur les contrats d’interface, la latence, l’idempotence et le confinement.

## 1.1 Stratification du SI : Systems of Record, Systems of Engagement et Systems of Agency

L’adoption de composants cognitifs autonomes n’efface pas l’urbanisation historique des systèmes d’information; elle y superpose une strate supplémentaire dont le mandat, les invariants et le rythme d’évolution diffèrent profondément des couches sous-jacentes [1] [3].

### 1.1.1 De la dualité `SoR` / `SoE` à l’émergence des `Systems of Agency`

L’architecture d’entreprise classique s’est structurée autour de deux plans complémentaires [3]. À la base résident les systèmes d’enregistrement, ou `Systems of Record (SoR)` : progiciels `ERP`, moteurs bancaires centraux, systèmes de gestion du capital humain (`HCM`), bases `CRM` maîtresses et référentiels de gestion des identités [1] [3]. Leur raison d’être demeure la préservation de la source unique de vérité (`SSOT`) consolidée par les dispositifs de données maîtresses (`MDM`), la haute disponibilité, l’intégrité des enregistrements et la conformité aux exigences réglementaires (`SOX`, `PCI DSS`, `RGPD`) [1]. Ces systèmes reposent sur des flux de validation stricts et n’acceptent que des mises à jour rigoureusement contrôlées [1].

Au-dessus se sont développés les systèmes d’engagement, ou `Systems of Engagement (SoE)` : portails web, messageries, applications mobiles, outils collaboratifs et canaux conversationnels [3]. Ils optimisent l’ergonomie, la collaboration humaine et la réactivité d’interaction tout en générant d’importants volumes de signaux non structurés [3]. Dans cette urbanisation à deux strates, l’orchestration cognitive entre silos incombait toutefois aux humains : l’opérateur naviguait d’un écran `SoE` à l’autre, interprétait des demandes non structurées, croisait les données de plusieurs `SoR` et saisissait manuellement les écritures finales [3].

Les `Systems of Agency` (`SoA`, ou *Systems of Agents*) occupent cet intervalle opérationnel [3]. Ils désignent des plateformes et environnements d’exécution capables de capter les signaux métier en temps réel, de planifier, de raisonner et de conduire de manière autonome des actions multi-étapes à travers les silos vers un objectif explicite [4] [3]. Contrairement à un agent conversationnel limité à un échange en un seul tour, le `System of Agency` opère dans une boucle d’exécution continue — observer l’intention, planifier, récupérer le contexte, raisonner, agir via des appels d’outils et vérifier la vérité terrain — dans des contextes asynchrones faiblement couplés [2] [4] [3].

En continuité architecturale, le `System of Agency` ne doit jamais remplacer le `System of Record` comme ancrage d’autorité : les impératifs de conformité, de pistes d’audit probantes et d’intégrité des données maîtresses exigent que la vérité transactionnelle demeure dans des registres déterministes gouvernés [1] [5]. La rupture tient au déplacement du centre de gravité de la valeur : après l’ère du stockage structuré (`SoR`) puis de l’interface collaborative (`SoE`), l’avantage structurel appartient aux organisations capables d’orchestrer sûrement l’exécution autonome entre les strates existantes sous garde-fous explicites de gouvernance, d’autorisation et de traçabilité [1] [5] [3].

> **[Figure]**
> - Stratification du SI : SoE, Systems of Agency et SoR
> - Strate 1 — Systems of Engagement (SoE)
> - Strate 2 — Systems of Agency (couche probabiliste bornée)
> - Strate 3 — Systems of Record (SoR — déterministe)
> - Opérateur /Client métier
> - Portails, CRM
> - et canaux
> - Planification
> - adaptative
> - Noyau d'agence
> - (paliers L1-L4)
> - Porte d'impact et HITL / HOTL
> - ERP, Core Banking
> - et SGBD maîtres Vérité maîtresse et journal d'audit
> - Intention
> - Plan borné Action
> - Transaction validée
> - Requête asynchrone
> - Mutation idempotente
> - validée uniquement Lecture seule filtrée
> - (vérité terrain)

*Fig. 1. – Stratification évolutive du système d’information : SoE, Systems of Agency et SoR*

### 1.1.2 Workflows déterministes contre boucles agentiques : le spectre de complexité

Toute intégration d’un modèle génératif ne relève pas de l’agentivité, et toute tâche automatisable ne justifie pas une boucle autonome [2] [8]. Les guides d’ingénierie d’Anthropic et de Microsoft distinguent nettement deux régimes d’architecture selon le siège du contrôle décisionnel [2] [8] :

1. **Les *workflows* déterministes augmentés par LLM** : des chemins de code prédéfinis orchestrent les modèles et les outils selon un graphe figé (enchaînement linéaire, routage conditionnel ou exécution parallèle); le `LLM` accomplit uniquement des sous-tâches bornées telles que la classification, l’extraction structurée ou la synthèse [2] [4].
2. **Les agents autonomes** : le modèle dirige dynamiquement son propre processus, sélectionne les outils à invoquer à chaque itération selon les résultats intermédiaires et détermine lui-même les conditions d’arrêt [2] [4].

Ce partage s’inscrit sur un spectre progressif de complexité : appel direct de modèle sans outil, agent unique outillé, puis coordination multi-agents [8]. Le principe directeur exige d’adopter systématiquement le palier le plus simple capable de satisfaire l’exigence métier [2] [8]. Chaque degré d’autonomie supplémentaire accroît en effet la latence cumulée, la consommation de jetons d’inférence, la surcharge de coordination et la complexité de débogage [2] [8]. Dès qu’un processus présente des étapes prévisibles et des exceptions énumérables, il doit demeurer dans un *workflow* déterministe; l’agentivité ne devient légitime que pour des problèmes ouverts à forte variabilité sémantique où le nombre d’étapes ne peut être codé statiquement et où la résolution exige un retour adaptatif de l’environnement [2] [4].

### 1.1.3 Frontières d’autorité et lecture conjointe EA / SA

L’insertion d’une couche `SoA` entre `SoE` et `SoR` redessine les responsabilités d’architecture. Pour l’architecte d’entreprise (`EA`), l’enjeu central consiste à prévenir une prolifération non gouvernée d’agents départementaux connectés sans médiation aux bases maîtresses, qui contournerait les politiques de conformité et fragmenterait les coûts d’inférence [1] [5]. Pour l’architecte de solutions (`SA`), la priorité réside dans l’asymétrie stricte des accès et la borne d’exécution : accorder des lectures analytiques filtrées tout en interposant une couche de validation déterministe, des plafonds stricts d’itérations et la traçabilité de chaque étape avant toute mutation sur un `SoR` [1] [8] [5].

| Dimension architecturale | `System of Record (SoR)` | `System of Engagement (SoE)` | `System of Agency (SoA)` |
| --- | --- | --- | --- |
| **Mandat principal** | Source d’autorité validée (`SSOT`) et conformité [1] | Expérience utilisateur et collaboration [3] | Planification adaptative et action déléguée [4] [3] |
| **Logique dominante** | Déterministe, règles strictes et validation formelle [1] | Interface réactive pilotée par l’humain [3] | Boucle probabiliste bornée (*Thought-Action-Observation*) [4] |
| **Cadence d’évolution** | Lente, contrainte par la gouvernance des données [1] | Rapide, itérations produit continues [3] | Continue (prompts, outils, politiques, modèles) [2] [9] |
| **Tolérance aux écarts** | Nulle sur l’intégrité maîtresse [1] | Moyenne (correction humaine en session) | Faible sans garde-fous : amplification silencieuse [5] |
| **Exposition de droits** | Propriétaire du schéma et des verrous [1] | Droits portés par la session utilisateur | Mandat délégué borné à la tâche [5] |

*Tableau 1.1 — Positionnement comparatif des trois strates du système d’information.*

> **Arbitrage EA / SA** — Aucun agent de la strate `System of Agency` ne doit écrire directement dans les tables d’un `System of Record` ni hériter d’un compte administrateur transversal. L’EA maintient les `SoR` comme unique source d’autorité comptable et réglementaire, tandis que le SA confine l’exécution agentique derrière une frontière idempotente qui dissocie la planification probabiliste de l’engagement transactionnel [1] [5].

## 1.2 Rupture épistémique : non-déterminisme, latence variable et effets de bord irréversibles

Insérer un composant probabiliste au cœur d’une chaîne transactionnelle provoque une rupture épistémique qui invalide trois hypothèses fondatrices du génie logiciel distribué : la reproductibilité déterministe des appels, la prévisibilité des délais synchrones et la sûreté des reprises automatiques sur erreur [10] [11] [5].

### 1.2.1 Non-déterminisme intrinsèque et effondrement du mythe de `temperature = 0`

Le profil `NIST AI 600-1` souligne que le caractère probabiliste des modèles génératifs rend caducs les contrôles traditionnels fondés uniquement sur la revue statique de code avant mise en production [12]. Comme l’inspection du code d’orchestration ne permet plus de prédire l’ensemble des trajectoires d’exécution, l’exigence d’auditabilité se déplace vers la journalisation exhaustive des actions à l’exécution et l’échantillonnage statistique sur essais multiples afin de caractériser la distribution réelle des risques [12].

De nombreuses équipes tentent néanmoins de rétablir le déterminisme en fixant le paramètre d’échantillonnage à `temperature = 0` (décodage glouton). Les recherches d’Horace He et du *Thinking Machines Lab* démontrent pourtant que ce réglage ne garantit pas la reproductibilité bit à bit sur les infrastructures d’inférence en production [10]. La cause opérationnelle première réside dans l’absence d’invariance de lot (*batch invariance*) [10]. Pour optimiser le taux d’occupation des processeurs graphiques (`GPU`), les moteurs de service regroupent dynamiquement les requêtes concurrentes selon la charge instantanée. Lorsque la taille et la composition d’un lot varient, les noyaux `GPU` — notamment les multiplications matricielles, les couches de normalisation `RMSNorm` et le calcul d’attention — modifient l’ordre des réductions en virgule flottante [10].

En raison de la non-associativité de l’arithmétique flottante, ces variations minimes déplacent légèrement les valeurs de sortie (`logits`) [10]. Lorsque deux jetons candidats affichent des probabilités quasi équivalentes, ce décalage suffit à inverser le choix du jeton maximal; par propagation autoregressive, une divergence sur un seul jeton initial entraîne des plans d’action ou des paramètres d’outils complètement différents [10]. Bien que l’usage de noyaux invariants aux lots restaure une reproductibilité stricte, il impose une pénalité sensible de débit et de latence que la majorité des API infonuagiques mutualisées n’absorbe pas par défaut [10]. L’architecte doit donc postuler qu’un statut HTTP `200 OK` retourné par un serveur d’inférence ne garantit ni l’identicité d’un rejeu ni la validité sémantique de la décision prise [10] [12].

### 1.2.2 Latence variable, asymétrie prefill/decode et amplification de queue (`p99`)

La seconde rupture affecte la physique du temps d’exécution. Là où une requête `REST` ou `gRPC` vers un `SoR` présente une variance maîtrisée, l’inférence d’un `LLM` obéit à deux régimes matériels opposés modélisés dans *Sarathi-Serve* [13] :

- **Le temps jusqu’au premier jeton (**`TTFT`**, *Time-to-First-Token*)**, gouverné par la phase de préremplissage (*prefill*) intensif en calcul, dont le coût croît avec la longueur du prompt système, de l’historique et des descriptifs d’outils injectés [13].
- **Le temps entre jetons générés (**`TBT` **/** `TPOT`**, *Time-Per-Output-Token*)**, limité par la bande passante mémoire durant la phase de décodage séquentiel et proportionnel au volume du raisonnement généré [13].

Dans les moteurs à mise en lots continue (*continuous batching*), l’arrivée de longs contextes en préremplissage interrompt les itérations de décodage des requêtes actives et provoque de fortes pointes de latence de queue en l’absence d’ordonnancement par tranches (*chunked-prefills*) [13].

Cette instabilité locale s’amplifie de manière critique dans les boucles multi-tours selon la loi des systèmes distribués formalisée par Dean et Barroso (*The Tail at Scale*) : dès qu’une transaction globale dépend séquentiellement ou en éventail de multiples appels sous-jacents, la probabilité de subir la latence du 99e centile (`p99`) d’au moins un maillon croît rapidement avec le nombre d’étapes [11]. Un enchaînement multi-tours d’appels d’inférence et d’outils amplifie ainsi sensiblement les latences de queue et compromet les compromis de réactivité attendus par l’utilisateur [2] [11]. Maintenir des appels synchrones bloquants depuis un `System of Engagement` expose les serveurs frontaux à l’épuisement des fils d’exécution et aux expirations en cascade; l’exécution asynchrone, les plafonds stricts d’itérations et des budgets temporels bornés s’imposent comme exigences structurelles [8] [4] [11].

### 1.2.3 Effets de bord irréversibles et rayon d’impact (`blast radius`)

La convergence du non-déterminisme et de l’accès aux outils d’entreprise produit le risque le plus critique : l’exécution d’effets de bord irréversibles [5] [7]. Le référentiel `OWASP LLM06:2025` définit l’*agence excessive* (`Excessive Agency`) comme l’octroi à un agent de fonctions, de permissions ou d’une autonomie excédant son strict mandat [5]. Une hallucination, une erreur de typage ou un détournement d’objectif (*Agent Goal Hijack*, `ASI01` de l’*OWASP Top 10 for Agentic Applications*) déclenché par une injection indirecte dans un document ou un courriel externe se traduit alors par un abus d’outils (`ASI02`), un détournement de privilèges hérités (`ASI03`) ou des défaillances en cascade (`ASI08`) [5] [7].

L’architecte de solutions doit classer chaque interface selon sa réversibilité et son rayon d’impact (`blast radius`) : lecture de dossiers ou création d’un brouillon interne contre virement financier, suppression en base de production, révocation de certificats ou envoi d’une notification client officielle [5]. De plus, la reprise sur panne par simple relance automatique (*retry*), sûre dans un contrat `REST` idempotent, devient dangereuse si l’état intermédiaire n’est pas consigné : relancer une inférence après coupure réseau peut amener le modèle à générer un plan différent et déclencher une double mutation sémantique. Les lectures et préparations réversibles doivent donc demeurer isolées des mutations critiques, ces dernières étant verrouillées derrière une porte déterministe et une validation appropriée [5] [7].

> **[Figure]**
> - Rupture épistémique : boucle probabiliste et porte d'irréversibilité
> - SoE
> - Noyau d'agence
> - (SoA)
> - Inférence LLM
> - (probabiliste)
> - Porte d'impact (HITL / Idempot.) SoR (Autorité)
> - SoE Noyau d'agence
> - (SoA)
> - Inférence LLM
> - (probabiliste)
> - Porte d'impact (HITL / Idempot.)
> - SoR (Autorité)
> - 1 Intention ambiguë + mandat
> - loop [Raisonnement (k tours bornés)]
> - 2 Prompt + outils + contexte
> - 3 Plan / outil (TTFT + TPOT)
> - Même à temperature=0, la variance de lots (batch) peut modifier les jetons choisis.
> - alt [Lecture réversible]
> - 4 Requête faible impact
> - 5 Lecture moindre privilège
> - 6 Vérité terrain
> - 7 Résultat (HTTP 200 OK)
> - [Mutation irréversible]
> - 8 Proposition + justification
> - 9 Attente validation HITL
> - 10 Approbation explicite
> - 1 1 Écriture + clé idempotence
> - 12 Confirmation + audit
> - 13 Effet de bord confirmé
> - 14 Synthèse (contrôle sémantique)

*Fig. 2. – Rupture épistémique en exécution : boucle probabiliste, latence cumulée et porte d’irréversibilité*

| Critère technique | Contrat déterministe (`SoR` / workflow) | Contrat probabiliste (`System of Agency`) |
| --- | --- | --- |
| **Reproductibilité** | Identique bit à bit à entrée et état constants | Variable selon charge de lots et version [10] [9] |
| **Mode d’échec** | Exception explicite, code `4xx` /`5xx`, erreur schéma | Succès HTTP `200 OK` masquant un écart sémantique [12] [5] |
| **Régime de latence** | Courte, bornée, prévisible | Asymétrique (`TTFT` + `TPOT`), amplification `p99` [11] [13] |
| **Vérification préalable** | Tests unitaires et revue statique de code | Échantillonnage multi-essais et journaux d’exécution [10] [12] |
| **Reprise sur panne** | Relance sûre sous clé d’idempotence | Risque de divergence et de double effet lors d’une relance non bornée [10] [5] |

*Tableau 1.2 — Caractérisation comparée des contrats logiciels déterministes et probabilistes.*

> **Arbitrage EA / SA** — Les systèmes `SoA` doivent fonctionner en mode asynchrone par défaut et proscrire les appels synchrones bloquants depuis le `SoE` sur des boucles multi-tours. Le SA classe chaque outil par palier de réversibilité et impose l’idempotence sur toute écriture, tandis que l’EA exige une porte d’approbation préalable et une piste d’audit immuable pour tout effet de bord externe ou financier [11] [12] [5].

## 1.3 Spectre d’autonomie opérationnelle (`L0` à `L4`) et modalités Human-in/on-the-Loop

L’autonomie opérationnelle n’est ni un interrupteur binaire ni une propriété dictée par la seule puissance du modèle retenu : elle représente un choix d’architecture délibéré, découplé des capacités brutes du `LLM` sous-jacent [14]. Un modèle de frontière très capable peut et doit être volontairement verrouillé à un palier supervisé dans un processus réglementé, tandis qu’un modèle spécialisé peut opérer de façon autonome dans un périmètre entièrement réversible [14].

### 1.3.1 Échelle graduée `L0` à `L4` : de la logique figée à l’autonomie bornée sous contrat

Les travaux de Feng, McDonald et Zhang établissent une taxonomie à cinq niveaux fondée sur le rôle assumé par l’utilisateur (*Operator*, *Collaborator*, *Consultant*, *Approver*, *Observer*) et introduisent le concept de *certificats d’autonomie* pour formaliser et borner contractuellement l’enveloppe d’action autorisée d’un agent [14]. En architecture d’entreprise, il convient d’ancrer cette gradation sur le socle déterministe `L0` afin d’obtenir une échelle opérationnelle en cinq paliers (`L0` à `L4`), excluant volontairement l’autonomie illimitée hors gouvernance en production :

- `L0` **— Exécution déterministe sans agentivité** : logique entièrement codée et *workflows* statiques prédéfinis sans sélection dynamique d’outils [2] [4]. Ce palier sert à la fois de référence de base pour les processus stables et de cible de repli sûr [2].
- `L1` **— Opérateur assisté (*Operator* / *Assist Mode*)** : l’humain dirige chaque étape et sollicite le modèle pour résumer, extraire des champs ou rédiger des propositions; aucune action vers les systèmes en aval n’est exécutée sans commande explicite [4] [14].
- `L2` **— Collaborateur guidé (*Collaborator*)** : l’agent propose un plan et prépare les lectures en boucle courte, en partageant l’exécution pas à pas avec l’opérateur qui conserve la possibilité d’éditer le plan et de reprendre le contrôle à tout instant [14].
- `L3` **— Exécuteur supervisé par exception (*Consultant* / *Approver* borné)** : l’agent planifie et exécute de façon autonome des séquences multi-étapes dans un périmètre autorisé (lectures fédérées, corrélations, écritures mineures compensables), mais s’interrompt automatiquement dès qu’une ambiguïté dépasse un seuil, qu’un plafond d’itérations est atteint ou qu’une mutation critique est requise [8] [4] [14].
- `L4` **— Autonomie bornée sous contrat (*Observer* certifié)** : l’agent conduit le traitement de bout en bout, incluant la récupération autonome sur erreurs d’outils, à l’intérieur d’une enveloppe contractuelle stricte (périmètre fonctionnel, budget d’inférence, opérations exclusivement réversibles ou compensables, certificat d’autonomie), sous surveillance continue et capacité d’arrêt immédiat [14] [15].

> **[Figure]**
> - Spectre d'autonomie (L0-L4) et transitions de supervision humaine
> - L0 — Déterministe (Workflow codé)
> - Logique figée, zéro autonomie LLM; repli sûr par défaut
> - L 1 — Opérateur assisté (HITL strict)
> - Suggestion ponctuelle; exécution sur commande explicite
> - L2 — Collaborateur guidé (HITL partagé)
> - Plan proposé par l'agent; co-édition et passage de relais
> - L3 — Exécuteur supervisé (HITL sélectif + HOTL)
> - Boucle bornée; arrêt sur effet irréversible ou seuil
> - L4 — Autonomie bornée (HOTL + certificat)
> - Enveloppe réversible; vigilance continue et arrêt sûr
> - Ambiguïté sémantique
> - Itération rapide
> - Outils compensables Mutation irréversible (HITL)
> - Enveloppe certifiée Dérive HOTL
> - Bouton d'arrêt sûr (Art. 14)
> - Plafond d'itérations

*Fig. 3. – Spectre d’autonomie opérationnelle (L0–L4) et transitions de supervision humaine*

### 1.3.2 Modalités `Human-in-the-Loop` et `Human-on-the-Loop` face aux biais cognitifs

La supervision humaine s’organise selon deux régimes complémentaires. Le contrôle `Human-in-the-Loop` **(**`HITL`**)** suspend l’exécution sur le chemin critique avant toute mutation sensible via une confirmation ou un mécanisme de retour de contrôle (*Return of Control*) jusqu’à réception d’une approbation explicite (`L1`, `L2` et points d’arrêt `L3`) [4] [5]. La supervision `Human-on-the-Loop` **(**`HOTL`**)** maintient l’humain en vigie asynchrone sur un flux autonome borné (`L4`) au moyen de journaux d’activité, d’escalades d’anomalies et de coupe-circuits d’urgence [14] [15].

Toutefois, la présence formelle d’un humain dans la boucle ne garantit pas l’efficacité du contrôle. La synthèse empirique de Parasuraman et Manzey établit que dès qu’une automatisation présente une fiabilité perçue élevée mais imparfaite, les opérateurs — experts comme novices — réallouent leur attention sous charge multitâche et succombent à la complaisance et au **biais d’automatisation** : ils approuvent mécaniquement (*rubber-stamping*) des propositions fluides sans contre-vérification indépendante [16]. Le `NIST AI 600-1` intègre ce phénomène dans la catégorie de risque *Human-AI Configuration* [12], et le référentiel `OWASP` le classe parmi les vecteurs d’exploitation de la confiance humain-agent (`ASI09`) [7].

À l’opposé, la modalité `HOTL` expose l’organisation au paradoxe formulé dès 1983 par Lisanne Bainbridge dans *Ironies of Automation* : plus un automate absorbe avec succès les tâches routinières, plus le superviseur relégué à l’observation passive perd sa maîtrise pratique et sa conscience de situation; lorsqu’une défaillance rare et atypique survient, l’opérateur manque précisément des repères requis pour diagnostiquer la situation et reprendre le contrôle sous pression [17]. Pour contrer ces deux risques cognitifs, l’**Article 14 du Règlement européen (**`EU AI Act`**)** oblige à doter les systèmes à haut risque d’interfaces permettant aux superviseurs humains de comprendre les limites réelles du système, de demeurer vigilants face au biais d’automatisation, d’ignorer ou de renverser toute recommandation et d’actionner un « bouton d’arrêt » ramenant le système vers un état sûr [15].

### 1.3.3 Critères d’éligibilité et de disqualification d’un cas d’usage

Tout cas d’usage candidat doit subir un filtrage structuré sur quatre axes : l’ambiguïté sémantique des données entrantes, le coût d’une erreur d’interprétation, la réversibilité technique et légale des effets de bord, ainsi que la capacité d’absorption humaine des revues `HITL`. Un processus est **disqualifié** des paliers autonomes `L3` –`L4` lorsque sa logique se formalise en règles déterministes stables [2], que ses mutations sont irréversibles sans compensation [5], que la cadence des approbations provoquerait un biais d’automatisation généralisé [16] ou que la réglementation impose un jugement humain explicite [15].

| Profil métier | Ambiguïté | Réversibilité et impact | Palier | Contrôle exigé | Décision EA / SA |
| --- | --- | --- | --- | --- | --- |
| Rapprochement comptable et écritures `ERP` | Nulle | Irréversible / impact financier | `L0` | Règles codées, zéro agentivité [2] | **Disqualifié** : conserver déterministe [2] |
| Analyse de sinistres ou notes juridiques | Élevée | Élevé si décision automatisée | `L1` **–**`L2` | `HITL` synchrone avec preuves sources [4] [15] | **Éligible en assistance** : synthèse sans écriture |
| Support client ou incidents TI multi-étapes | Moyenne à élevée | Mixte : lectures + seuils (p. ex. ≤ 250 $ CA) | `L3` | Autonomie bornée; `HITL` au-delà du seuil [4] [5] | **Éligible par exception** sous plafonds stricts [8] |
| Indexation, veille et routage interne | Moyenne | Faible / annulable et versionné | `L4` | `HOTL`, échantillonnage et arrêt sûr (`Art. 14`) [12] [15] | **Éligible en autonomie bornée** par certificat [14] |
| Décision de crédit ou sanction réglementée | Variable | Irréversible / droits fondamentaux | `L1` max | `HITL` explicite anti-biais [12] [15] [16] | **Disqualifié pour** `L3` **–**`L4` : contrôle légal [15] |

*Tableau 1.3 — Matrice d’éligibilité, de disqualification et de calibrage d’autonomie (*`L0` *–*`L4`*).*

> **Arbitrage EA / SA** — Aucune porte `HITL` ne doit se réduire à un bouton binaire présenté en série à un opérateur surchargé, sous peine d’institutionnaliser le biais d’automatisation [15] [16]. Le SA conçoit des écrans d’approbation exposant le différentiel exact de mutation sur le `SoR`, les limites de confiance et la preuve source, tandis que l’EA réserve le palier `L4` aux seuls périmètres réversibles dotés d’un coupe-circuit vers `L0` [5] [14] [15].

## 1.4 Dette technique contre dette cognitive : dérive silencieuse et couplage aux modèles

La viabilité pluriannuelle d’une architecture agentique dépend enfin de sa résistance à une famille d’endettement plus insidieuse que la dette logicielle classique, parce qu’elle affecte simultanément les équipes humaines, les artefacts d’intention et le comportement statistique des modèles [18] [6].

### 1.4.1 Le modèle à trois dettes : technique, cognitive et d’intention

Dans le développement traditionnel, la dette technique s’accumule dans le code source. Les recherches de Margaret-Anne Storey montrent que l’IA générative et agentique réduit la friction d’écriture tout en créant un goulet d’étranglement sur l’assimilation humaine, et proposent un **modèle à trois dettes** (*Triple Debt Model*) [6] :

1. **La dette technique (dans le code)** : compromis structurels, connecteurs fragiles et défauts de modularité qui freinent l’évolution logicielle [6].
2. **La dette cognitive (dans les personnes)** : érosion des modèles mentaux partagés au sein des équipes lorsque la vélocité de production d’artefacts générés par l’IA dépasse la capacité humaine de révision et de compréhension [6]. Cette *capitulation cognitive* produit des systèmes qui fonctionnent en apparence mais dont plus personne ne maîtrise les décisions sous-jacentes lors d’un incident [6].
3. **La dette d’intention (dans les artefacts)** : disparition des justifications, objectifs, hypothèses de conformité et contraintes métier (*the why*) [6]. Lorsque des règles critiques sont enfouies dans des instructions narratives sans documentation vivante ni dossier de décision, ni les nouveaux ingénieurs ni les autres agents ne peuvent faire évoluer le système sûrement [6].

### 1.4.2 Enchevêtrement `CACE`, cascades de correction et consommateurs non déclarés

Ces trois dimensions se conjuguent aux lois de dette cachée formulées par Sculley et ses collègues pour les systèmes d’apprentissage automatique [18]. Au cœur de cette dynamique opère le principe `CACE` **(*Changing Anything Changes Everything*)** : contrairement à un module logiciel encapsulé, une chaîne probabiliste présente un enchevêtrement global où l’ajustement d’une phrase du prompt, d’un seuil ou d’un descriptif d’outil peut déstabiliser des comportements éloignés [18]. Cet enchevêtrement engendre trois pathologies récurrentes en production [18] :

- **Les cascades de correction (*correction cascades*)** : pour corriger des erreurs ponctuelles, les équipes empilent des rustines heuristiques — consignes impératives dans le prompt, filtres regex en sortie, règles d’exception dans l’orchestrateur — qui lient rigidement le système aux biais d’une version précise de modèle [18].
- **Les consommateurs non déclarés (*undeclared consumers*)** : des applications aval consomment directement les sorties d’un agent sans contrat d’interface formalisé ni inscription au registre `EA`, subissant des bris silencieux au moindre changement de formulation ou de taux d’abstention [18].
- **L’érosion des frontières et la dette de configuration** : l’agrégation de logique métier, de directives de sécurité et de paramètres d’inférence dans des prompts monolithiques détruit l’encapsulation et concentre les coûts de maintenance hors du code applicatif [18].

> **[Figure]**
> - Boucles de dette cognitive, de dette d'intention et de couplage aux modèles
> - Facteurs de dérive
> - Triple dette et vulnérabilités
> - Contre-mesures EA / SA
> - Mises à jour opaques fournisseur de modèle Prompts et rustines heuristiques (CACE) Vélocité générative sans assimilation
> - Couplage modèle (formats, seuils) Dette d'intention (motifs implicites) Dette cognitive (perte du modèle mental)
> - Consommateurs cachés et régression silencieuse
> - Abstraction modèle et contrats typés Artefacts d'intention versionnés
> - Évaluation continue et repli L0
> - Changement de comportement Enchevêtrement Logique enfouie Érosion mentale
> - Panne à la bascule Édition aveugle Diagnostic impossible
> - Découple l'API Restaure le pourquoi
> - Détecte avant prod

*Fig. 4. – Boucles de dette cognitive, de dette d’intention et de couplage aux modèles*

### 1.4.3 Dérive silencieuse, mises à jour opaques et couplage aux modèles

Le risque ultime naît du **couplage aux modèles** face à la non-stationnarité des services infonuagiques hébergés [18] [9]. L’étude longitudinale de Chen, Zaharia et Zou comparant les versions de mars et juin 2023 des modèles commerciaux `GPT-3.5` et `GPT-4` sur des bancs d’essai constants a fourni la preuve empirique de cette instabilité : sous l’effet de mises à jour opaques d’alignement ou d’infrastructure côté fournisseur, l’exactitude de `GPT-4` sur le suivi de raisonnement en chaîne mathématique s’est effondrée brutalement tandis que les défauts de formatage de code augmentaient [9].

Contrairement à un bris de contrat `API` classique produisant une erreur explicite, la dérive d’un modèle demeure **silencieuse** : l’interface continue de répondre normalement mais modifie la distribution de ses choix d’outils, son taux de refus ou sa conformité de format [12] [18] [9]. Maîtriser ces quatre dettes impose d’encapsuler l’inférence derrière des contrats typés déterministes, de mesurer la variance de base sur des batteries d’essais multiples avant toute promotion de prompt ou de modèle [10] [12] [9], et d’externaliser l’intention métier dans des artefacts gouvernés [14] [6].

| Type de dette | Lieu de résidence | Mécanisme d’accumulation | Symptôme en production | Contre-mesure EA / SA |
| --- | --- | --- | --- | --- |
| **Dette technique** | Code et connecteurs [6] | Contournements et absence de typage | Pannes de schéma et maintenance coûteuse | Contrats typés, modularité et tests [8] |
| **Dette cognitive** | Équipes humaines [6] | Vélocité dépassant la revue humaine [6] | *Capitulation cognitive* et diagnostic bloqué [6] | Limiter la complexité; revue à rythme humain [2] [6] |
| **Dette d’intention** | Prompts et artefacts [6] | Règles métier enfouies sans motif [6] | Régressions lors d’évolutions mineures [6] | Artefacts d’intention et `ADR` versionnés [6] |
| **Couplage modèle** | Cascades `CACE` [18] | Rustines sur biais + mises à jour opaques [18] [9] | Dérive silencieuse et verrouillage API [9] | Abstraction fournisseur et tests multi-essais [10] [12] [9] |

*Tableau 1.4 — Typologie comparée des quatre dettes en ingénierie agentique.*

> **Arbitrage EA / SA** — Toute règle métier impérative (plafond financier, obligation légale, seuil d’éligibilité) doit résider dans du code ou un moteur de politiques déterministe versionné, jamais dans une consigne textuelle exposée au principe `CACE` et aux dérives de modèles [18] [9] [6]. L’EA impose la traçabilité d’intention et la portabilité multi-modèles au portefeuille, tandis que le SA proscrit les consommateurs non déclarés et conditionne toute bascule de modèle à une évaluation statistique multi-essais [10] [12] [18].

## Synthèse et transition

L’entreprise agentique repose sur un équilibre exigeant entre **continuité** et **rupture** : préserver l’intégrité des `Systems of Record` et privilégier les *workflows* déterministes dès que la tâche est prévisible [1] [2], tout en confinant le non-déterminisme de la strate `Systems of Agency`, son amplification de latence `p99`, ses effets irréversibles et sa quadruple dette [10] [11] [5] [6]. À partir de ces fondations et critères d’éligibilité, le **Chapitre 2** transpose ces exigences dans les cadres d’urbanisation `TOGAF` et `ArchiMate` et formalise l’architecture cible en quatre plans découplés.

# Chapitre 2 — Cadre d’architecture d’entreprise : capacités métier, modélisation TOGAF/ArchiMate et topologie en plans

Le déploiement d’agents autonomes en entreprise échoue rarement par insuffisance des modèles fondationnels; il échoue lorsque ces composants probabilistes sont greffés sur le système d’information hors de tout référentiel d’urbanisation [19] [20]. Sans cadre directeur, chaque unité d’affaires finance ses prototypes conversationnels, duplique les connecteurs vers les `Systems of Record (SoR)` et contourne les politiques d’identité, produisant un *Shadow Agentic IT* coûteux et inauditable [21] [20]. Le chapitre précédent a posé la rupture épistémique introduite par la couche de `Systems of Agency`, le spectre d’autonomie bornée (L0 à L4) et la dette cognitive. Ce chapitre fournit à l’architecte d’entreprise (`EA`) et à l’architecte de solutions (`SA`) l’instrumentation macro-architecturale requise pour intégrer ces flottes d’agents aux référentiels existants : cartographie des capacités métier augmentées, extension normative de `TOGAF` et d’`ArchiMate`, topologie cible en quatre plans découplés et gouvernance du portefeuille applicatif [22] [23] [24].

Cette démarche articule systématiquement deux lectures complémentaires. Sur le plan `EA`, elle ancre chaque initiative dans une chaîne de valeur mesurable, maintient la traçabilité du patrimoine et encadre les risques réglementaires et financiers (`FinOps`) [23] [25] [26]. Sur le plan `SA`, elle trace des frontières d’interface stables entre déclenchement, orchestration durable, interopérabilité et contrôle transversal [27] [28] [29]. Conformément au découpage de l’ouvrage, ce chapitre couvre la macro-urbanisation et le portefeuille TI; l’anatomie d’un `Agent Harness` et la règle 80/20 relèvent du chapitre 3, et l’ingénierie de l’`Internal Agentic Platform (IAP)` relève du chapitre 13.

## 2.1 Cartographie des capacités métier augmentées et refonte des chaînes de valeur

L’erreur stratégique la plus répandue consiste à greffer un assistant génératif sur une tâche manuelle isolée sans revoir le processus qui l’héberge. Selon le corpus `BIZBOK` (*Business Architecture Body of Knowledge*) et la 10e édition de `TOGAF`, une architecture métier rigoureuse sépare ce que l’entreprise fait — ses capacités métier (`Business Capabilities`) — de la manière dont elle les enchaîne pour livrer un résultat à un bénéficiaire — ses chaînes de valeur (`Value Streams`) [23] [30]. Une capacité métier demeure stable et indépendante des organigrammes ou des outils, tandis que son support applicatif évolue par vagues [23] [30].

### 2.1.1 De l’automatisation locale de tâches à la réingénierie des chaînes de valeur

Lorsqu’un agent accélère uniquement une micro-tâche locale — par exemple résumer un courriel avant qu’un opérateur ne recopie les champs dans deux progiciels — le gain local est absorbé par les files d’attente inter-départementales, les ressaisies et les délais de cycle globaux [30] [31]. L’augmentation agentique ne produit un effet structurel que par la cartographie croisée entre les étapes d’une chaîne de valeur et les capacités qu’elles invoquent [23] [30].

Dans des chaînes telles que le règlement de sinistres, l’octroi de prêts ou la gestion de l’approvisionnement, la latence découle de trois frictions : l’ingestion d’entrées non structurées, l’assemblage de contexte dispersé entre plusieurs `SoR` et l’escalade humaine sur des exceptions courantes [30] [31]. En décomposant la chaîne selon les guides `TOGAF Value Streams`, l’architecte supprime les transferts inutiles et réorganise le flux autour du traitement par exception [23] [30]. Les dossiers nominaux et les pré-instructions documentaires sont confiés à des acteurs cognitifs opérant sous contrat, tandis que l’expertise humaine est recentrée sur la validation des seuils critiques (`Human-on-the-Loop`) et l’arbitrage des cas ambigus [24] [32].

> **[Figure]**
> - Capacités mobilisées Réalisation métier et applicative
> - Capture et triage
> - sémantique «Agentic Capability»
> - Instruction et contrôle conformité
> - «Hybrid 80/20»
> - Décision financière
> - et règlement «Deterministic Core»
> - Gestionnaire métier «Human-on-the-Loop»
> - Processus réingénieré
> - par exception
> - Agent de triage
> - et extraction «Cognitive Actor»
> - Orchestrateur borné
> - «Cognitive Actor»
> - Système central
> - (SoR) «Deterministic SoR»
> - Réduire le délai de cycle
> - de bout en bout
> - Chaîne de valeur : Traitement de dossier
> - réalise
> - mobilise
> - mobilise
> - mobilise
> - matérialise supervise
> - augmente
> - orchestre
> - exécute contrat via passerelle
> - escalade

*Fig. 5. – Cartographie ArchiMate d’une chaîne de valeur réingénierée et de ses capacités augmentées*

La figure précédente exprime cette refonte en notation `ArchiMate` : la chaîne de valeur *Traitement de dossier* concrétise un objectif de réduction du délai de cycle en mobilisant trois capacités aux régimes d’exécution distincts [22] [23]. La capture sémantique est augmentée par un acteur cognitif dédié, l’instruction de conformité couple règles déterministes et raisonnement borné, et la passation financière reste confinée au noyau déterministe du `System of Record` [24] [31].

### 2.1.2 Cartes thermiques et critères d’éligibilité des capacités augmentées

Pour prévenir la dispersion budgétaire, l’`EA` applique sur la carte des capacités (niveaux 1 à 3) des cartes thermiques (*heat maps*) croisant potentiel d’augmentation et exposition au risque [30] [25]. Le guide de Google Cloud et le volet `Generative AI Lens` d’`AWS Well-Architected` convergent sur un principe fondamental : l’approche agentique n’est justifiée que lorsque la tâche comporte une ambiguïté sémantique réelle ou une combinatoire d’exceptions imprévisible [32] [31]. Toute capacité pilotée par des règles stables et des données structurées doit demeurer dans un workflow déterministe classique afin d’éviter la latence et la variance d’un modèle de langage [24] [31].

En croisant les principes de `BIZBOK` et les retours d’ingénierie des architectures cloud, quatre axes guident l’évaluation thermique d’une capacité candidate :

1. **Intensité sémantique des entrées** : part de documents non structurés, d’échanges textuels libres ou de divergences terminologiques entre systèmes [30] [31].
2. **Préparation des données (**`Data Readiness`**)** : présence de référentiels maîtres, de politiques d’accès et d’une chaîne de récupération documentaire gouvernée; comme le montrent les patrons de Martin Fowler et les principes de gouvernance de Microsoft, la fiabilité des systèmes génératifs repose sur une récupération hybride calibrée, le respect strict des frontières de données autorisées et des garde-fous multicouches [20] [33].
3. **Réversibilité des effets de bord** : séparation entre lecture/synthèse, écriture réversible et mutation irréversible (virement, engagement contractuel, modification d’accès) [34] [20].

4. **Tolérance à la latence et profil économique** : adéquation du délai d’inférence et de la consommation de jetons aux accords de niveau de service (`SLA`) de l’étape visée [32] [31].

### 2.1.3 Double lecture EA / SA : modèle opérationnel et frontières d’exécution

La cartographie croisée chaîne de valeur / capacités sert de charnière entre l’urbanisation `EA` et la conception `SA`.

En **lecture EA**, la carte de capacités instrumente l’analyse d’impact et la conformité [30] [25]. Lorsqu’un modèle sous-jacent est déprécié, dérive ou subit une compromission, l’architecte d’entreprise identifie immédiatement les étapes de chaînes de valeur et les parties prenantes touchées [30] [21]. Cette visibilité répond à la fonction `Map` du `NIST AI RMF 1.0` ainsi qu’aux exigences d’évaluation d’impact d’`ISO/IEC 42001:2023` [25] [26]. Chaque capacité augmentée reçoit en outre un propriétaire métier imputable du compromis entre vélocité et charge de supervision humaine [23] [26].

En **lecture SA**, ce découpage fixe les frontières de service [27] [31]. Une chaîne de valeur ne doit jamais être confiée à un agent monolithique traversant des capacités de criticités hétérogènes [24] [31]. Le `SA` segmente le flux en sous-domaines cohérents, isole la logique transactionnelle déterministe et confine le raisonnement probabiliste dans des nœuds bornés par schémas typés, selon l’anatomie et la règle 80/20 détaillées au chapitre 3 [24] [27].

> **Arbitrage EA / SA** — N’approuver aucun projet d’agent tant que la capacité visée n’est pas reliée à une étape de chaîne de valeur dans le référentiel `BIZBOK` /`TOGAF` et classée selon la réversibilité de ses effets de bord. Sur une capacité à règles stables et entrées structurées, l’`EA` et le `SA` imposent un workflow déterministe sans boucle agentique.

## 2.2 Extension du métamodèle TOGAF ADM et stéréotypes ArchiMate pour acteurs cognitifs

Les référentiels d’entreprise existants supposent des logiciels déterministes où un composant applicatif applique une logique figée et où seuls des acteurs humains exercent un jugement contextuel [22] [23]. Introduire des agents sans étendre le métamodèle conduit à les camoufler en simples API techniques (occultant leur autonomie) ou en acteurs humains (brouillant l’imputabilité juridique et la gestion des identités) [22] [21] [34].

### 2.2.1 Adaptation du cycle TOGAF ADM et de l’Architecture Repository

La méthode `ADM` de `TOGAF 10` permet d’intégrer ces composants dès la phase préliminaire par l’extension de son `Content Metamodel` [23]. L’architecte complète les phases canoniques par des livrables et portes de contrôle dédiés :

- **Phase préliminaire et Phase A (*Architecture Vision*)** : inscription de l’autonomie bornée, de la séparation probabiliste/déterministe et de la portabilité ouverte dans les principes d’architecture [23] [35]. L’`Architecture Board` intègre les exigences de la fonction `Govern` du `NIST AI RMF 1.0` et d’`ISO/IEC 42001:2023` pour fixer les mandats de délégation [25] [26].
- **Phase B (*Business Architecture*)** : ajout aux cartes de capacités et de chaînes de valeur des contrats d’intention (*Intent Contracts*), des seuils d’escalade `Human-on-the-Loop` et de la responsabilité métier associée [23] [30].

- **Phase C (*Information Systems — Data & Application*)** : recensement des sources de contexte et contrats sémantiques côté données; séparation côté applicatif entre orchestrateurs, acteurs cognitifs, passerelles d’outils et registres d’agents [23] [24] [33].
- **Phase D (*Technology Architecture*)** : modélisation des environnements d’exécution durcis, du routage d’inférence, des coffres d’identités machine (`NHI`) et du cloisonnement multi-locataires (`Silo` vs `Pooled`) [28] [19] [29].
- **Phases E, F, G et H (*Migration, Governance & Change*)** : séquencement de la transformation par paliers de risque, intégration des tests `EvalOps` comme critère d’homologation en phase G et détection de dérive comportementale en phase H pour réamorcer un cycle `ADM` [23] [24] [25] [33].

Sur le plan documentaire, cette adaptation enrichit trois artefacts canoniques de l’`Architecture Repository` de `TOGAF` : le catalogue des capacités métier intègre le niveau de criticité et le degré d’autonomie cible; la spécification des exigences d’architecture formalise les seuils de qualité, de sécurité et de réversibilité opposables aux équipes de réalisation; enfin, le document de définition d’architecture consigne la frontière exacte entre les flux déterministes conservés et les composants cognitifs introduits [23] [25] [26]. L’architecte d’entreprise évite ainsi que les spécifications d’agents ne demeurent confinées dans des dépôts applicatifs isolés sans visibilité transversale [24] [19].

### 2.2.2 Profils et stéréotypes ArchiMate 3.2 pour acteurs cognitifs et garde-fous

La spécification `ArchiMate 3.2` offre deux mécanismes d’extension officiels : la relation de spécialisation (*Specialization*) et les profils (*Profiles*) [22]. Un profil attache à une métaclasse standard un stéréotype entre guillemets (`«stéréotype»`) et des attributs gouvernés tout en préservant strictement la sémantique de base et l’héritage des relations valides pour l’échange via l’*ArchiMate Exchange File Format* [22].

Un acteur cognitif est modélisé comme une spécialisation d’`Application Component` — jamais d’un `Business Actor` — car il reste un artefact logiciel sans personnalité juridique [22] [26]. La figure suivante illustre ce métamodèle étendu sur les couches `Motivation`, `Strategy`, `Business` et `Application`.

> **[Figure]**
> - Couche Motivation (Gouvernance) Couche Strategy et Business (Capacités et Mandat) Couche Application (Acteurs cognitifs et Contrats)
> - Politique de garde-fou
> - «Guardrail Policy» Exigence d'audit et SLO
> - «Eval / Risk Gate»
> - Capability (Base ArchiMate 3.2)
> - Capacité augmentée «Agentic Capability»
> - Compétence agentique
> - «Skill / Playbook»
> - Mandat d'intention
> - «Intent Contract»
> - Responsable métier «Human-on-the-Loop»
> - Application Component
> - (Base ArchiMate 3.2)
> - Acteur cognitif «Cognitive Actor»
> - Catalogue gouverné
> - «Agent Registry»
> - Maillage multi-agents «Agent Collaboration»
> - Contrat d'outil «Tool Contract (MCP)»
> - réalise
> - spécialise
> - spécialise
> - borne
> - prouve
> - délègue
> - cadre équipe
> - fédère expose SI inventorie

*Fig. 6. – Extension du métamodèle ArchiMate 3.2 et stéréotypes normatifs pour acteurs cognitifs*

Cette structuration trace une ligne continue entre la contrainte de gouvernance et le contrat technique [22] [21] [34]. Le tableau 2.1 recense les stéréotypes retenus et leurs attributs obligatoires dans le référentiel `TOGAF` [22] [23].

| Couche `ArchiMate` | Élément | Stéréotype étendu | Rôle dans l’ADM et attributs gouvernés |
| --- | --- | --- | --- |
| `Motivation` | `Constraint` | `«Guardrail Policy»` | Bornes fermes `MAESTRO` / `OWASP` (autonomie, portée `ACL`, budget) [21] [34]. |
| `Motivation` | `Requirement` | `«Eval / Risk Gate»` | Critères d’homologation `NIST` et `ISO 42001` en phase G [25] [26]. |
| `Strategy` | `Capability` | `«Agentic Capability»` | Capacité augmentée (criticité, niveau L0–L4, propriétaire) [22] [30]. |
| `Strategy` | `Resource` | `«Skill / Playbook»` | Instructions versionnées et procédures réutilisables [22] [36]. |
| `Business` | `Actor` | `«Human-on-the-Loop»` | Superviseur humain tranchant les escalades et portant l’imputabilité [22] [24]. |
| `Business` | `Contract` | `«Intent Contract»` | Mandat délégué : objectif borné, données permises et arrêt [22] [26] [20]. |
| `Application` | `Component` | `«Cognitive Actor»` | Composant agentique (modèle abstrait, contexte, identité `NHI`) [22] [20]. |
| `Application` | `Component` | `«Agent Registry»` | Catalogue central des identités, versions et propriétaires [28] [20]. |
| `Application` | `Collaboration` | `«Agent Collaboration»` | Maillage ou motif (`Sequential`, `Handoff`, `Group Chat`) [22] [27]. |
| `Application` | `Service` | `«Tool Contract (MCP)»` | Services et mutations du SI sous contrat typé idempotent [22] [28] [35]. |

*Tableau 2.1 — Extension du métamodèle TOGAF ADM et profils ArchiMate 3.2 pour acteurs cognitifs.*

### 2.2.3 Double lecture EA / SA : traçabilité référentielle contre exécutabilité des contrats

L’extension par profils `ArchiMate 3.2` réconcilie gouvernance d’entreprise et rigueur d’implémentation [22] [24].

En **lecture EA**, les éléments stéréotypés alimentent les analyses de portefeuille, de risque et de conformité sans perturber les outils `EA` en place [22] [23]. En vue d’un audit `ISO/IEC 42001:2023` ou d’une revue `NIST AI RMF`, le référentiel fournit la preuve de traçabilité reliant chaque `«Cognitive Actor»` à son `«Intent Contract»`, à son rôle `«Human-on-the-Loop»`, aux `«Guardrail Policy»` applicables et aux `«Eval / Risk Gate»` franchis avant mise en production [22] [25] [26]. L’intégration d’un `«Agent Registry»` ferme la porte aux déploiements hors gouvernance [24].

En **lecture SA**, cette modélisation impose une discipline d’interface stricte : aucun `«Cognitive Actor»` n’accède directement à un `SoR`; il passe par un `«Tool Contract (MCP)»` gouverné et déclare ses échanges inter-agents en `«Agent Collaboration»` bornée [22] [27] [28]. Les métadonnées du profil `ArchiMate` servent de spécification amont aux manifestes déclaratifs consommés par la couche plateforme [24] [33].

> **Arbitrage EA / SA** — Interdire de modéliser un agent comme un `Business Actor` dans `ArchiMate`; le typer systématiquement en `«Cognitive Actor»` (spécialisation d’`Application Component`) rattaché à un `«Human-on-the-Loop»` et à une `«Guardrail Policy»`. Cela préserve la conformité `ArchiMate 3.2`, clarifie l’imputabilité et contraint le `SA` à doter chaque agent d’une identité machine et de contrats d’interface.

## 2.3 Architecture cible de référence en quatre plans découplés

Un métamodèle d’urbanisation reste impuissant si les équipes mélangent dans un même module l’interface utilisateur, les prompts, la gestion d’état, les appels ERP, les secrets et la télémétrie [24] [33]. Ce couplage bloque la substitution des modèles, empêche la mutualisation des outils et étend la surface d’attaque [21] [20]. L’écosystème infonuagique converge vers un découplage structurel inspiré des architectures de plans de contrôle et de plans de données [24] [28] [19] [29].

### 2.3.1 Fondement infonuagique natif : séparation des plans de contrôle, de données et d’exécution

Selon le livre blanc *Cloud Native Artificial Intelligence* (`CNAI`) de la `CNCF`, l’industrialisation de l’IA exige de séparer un plan de contrôle (*Control Plane*) déclaratif — responsable de l’ordonnancement, du routage des versions et des politiques — d’un plan de données (*Data Plane*) dédié aux flux d’inférence et aux gisements vectoriels [29]. Les architectures de référence des grands fournisseurs infonuagiques appliquent ce principe à l’entreprise agentique [24] [28] [19] :

- Microsoft (`CAF`) étend les plans de contrôle existants pour centraliser la visibilité inter-plateformes, graduer les politiques selon l’autonomie et le rayon d’impact, appliquer le moindre privilège aux identités d’agents et garantir la souveraineté des données [24] [20].
- AWS (`Prescriptive Guidance`) cloisonne les comptes entre gouvernance, passerelles partagées de modèles, coffres `OAuth 2.0` et environnements d’exécution isolés [28].
- Google Cloud déploie l’échelle multi-unités sur un modèle *hub-and-spoke* doté de périmètres `VPC Service Controls` et d’interfaces ouvertes (`A2A` et `MCP`) [19].

L’*Agentic AI Foundation* (`AAIF`) de la Linux Foundation — réunissant `MCP`, `goose` et `AGENTS.md` aux côtés d’`A2A` et `AGNTCY` — fournit des contrats indépendants des cadriciels propriétaires [35]. En parallèle, le *Technology Radar* de Thoughtworks recommande de traiter le harnais d’entreprise comme un produit léger et fédéré distribuant outils, bacs à sable et capteurs déterministes [36].

### 2.3.2 Anatomie des quatre plans de l’architecture de référence

Afin de cloisonner les responsabilités techniques et organisationnelles à travers l’ouvrage, l’architecture cible de l’entreprise agentique synthétise ces approches en **quatre plans découplés** : trois plans d’exécution superposés et un plan transversal de contrôle, de confiance et d’observabilité.

> **[Figure]**
> - Entreprise agentique —
> - Architecture cible en
> - quatre plans
> - [system]
> - Plan 1 : Expérience
> - [container]
> - Plan 2 : Orchestration
> - [container]
> - Plan 3 : Interopérabilité
> - [container]
> - Plan 4 : Confiance et
> - observabilité
> - [container]
> - «container» SoE / Portails
> - [UI, CRM]
> - Intention et HITL
> - «container» Points d'entrée
> - [API, Bus]
> - Signaux ambiants
> - «container» Workflows durables
> - [États]
> - Replay et Sagas
> - «container» Routeur 80/20
> - [Code + LLM]
> - Isole logique critique
> - «container» MCP Gateway
> - [Outils]
> - Contrats API et SoR
> - «container» Maillage A2A / AGNTCY
> - [Pairs]
> - Annuaires, Artifacts
> - «container» Mémoire et sémantique
> - [RAG, ACL]
> - Gouverne contexte
> - «container» Zero-Trust [NHI, OBO, OPA]
> - Moindre privilège
> - «container» OTel, EvalOps, FinOps
> - [Télémétrie]
> - Dérive et coûts
> - «person»
> - Opérateur / Client
> - Intention / HITL
> - «external_system» Signaux B2B
> - Événements
> - «external_system» Systems of Record
> - ERP, core banking
> - «external_system» Agents SaaS tiers
> - Éditeurs fédérés
> - Mandat [HTTPS]
> - Signal [Events]
> - Soumet
> - Démarre
> - Pilote
> - Outils [MCP]
> - Tâches
> - [A2A]
> - Contexte
> - [ACL]
> - Mute [Idempotent]
> - Fédère
> - [B2B]
> - Garde-fous
> - Portées OBO
> - Traces et coûts

*Fig. 7. – Architecture cible de référence en quatre plans découplés de l’entreprise agentique*

1. **Plan 1 — Plan d’expérience et de déclenchement** : Surface d’entrée des intentions vers le `System of Agency` [24] [19]. Il réunit les `Systems of Engagement (SoE)` humains (portails, interfaces conversationnelles, consoles de validation `Human-in/on-the-Loop`) et les points d’entrée API ou événementiels captant les signaux métiers et partenaires B2B [24] [27]. Ce plan ne porte ni logique de planification ni accès direct aux bases maîtres; il normalise l’intention et transmet le contexte d’identité initial [28] [19].
2. **Plan 2 — Plan d’orchestration et d’exécution durable** : Moteur de cycle de vie des tâches longues, garantissant la cohérence d’état face aux pannes, aux attentes humaines et aux limites de quotas [27] [31]. Il héberge le routeur arbitrant entre flux déterministes et nœuds cognitifs (voir le chapitre 3) ainsi que les topologies de coordination dirigée, collaborative ou réactive traitées dans la Partie III (chapitres 7 à 9) [27] [32] [31].
3. **Plan 3 — Plan d’interopérabilité et de contexte** : Couche d’abstraction isolant les orchestrateurs du patrimoine applicatif et documentaire [28] [35] [33]. Il regroupe la médiation verticale vers les outils et `SoR` (`MCP Gateway`), la délégation horizontale inter-agents (`A2A` et annuaires `AGNTCY`) incluant les agents `SaaS` tiers, et la couche mémoire et sémantique appliquant les contrôles `ACL` [28] [19] [35] [33]. Ces mécanismes constituent l’objet de la Partie II (chapitres 4 à 6).
4. **Plan 4 — Plan transversal de confiance, de sécurité et d’observabilité** : Plan de contrôle irriguant verticalement les trois autres plans [24] [29] [21]. Il concentre les identités non humaines (`NHI`), la délégation restreinte, les portes d’intention, la défense en sept couches contre les menaces `MAESTRO` et `OWASP`, la télémétrie distribuée, les boucles `EvalOps`, la gouvernance `FinOps` et la conformité (`NIST AI RMF`, `ISO/IEC 42001`) [24] [21] [34] [25] [26]. Ces domaines sont détaillés dans la Partie IV (chapitres 10 à 12), et leur socle d’ingénierie unifié (`IAP` et `AI Gateway`) est présenté au chapitre 13.

| Plan | Enjeu `EA` | Enjeu `SA` | Contrats d’interface | Chapitres |
| --- | --- | --- | --- | --- |
| **Plan 1 — Expérience** | Ergonomie, `HITL` /`HOTL`, rationalisation `SoE` | Normalisation, identité, découplage | Paquets typés, enveloppes, jetons | Chap. 1, 8, 14 |
| **Plan 2 — Orchestration** | Chaînes de valeur, criticité, cibles `RTO` /`RPO` | Rejeu, Sagas, plafonds d’itérations | États workflow, schémas, mandats | Chap. 3, 7–9 |
| **Plan 3 — Interopérabilité** | Réutilisation, souveraineté, portabilité | Médiation idempotente, pagination, `ACL` | Normes `MCP`, `A2A`, `AGNTCY` | Chap. 4–6 |
| **Plan 4 — Confiance (transversal)** | Conformité `ISO 42001` /`NIST`, registre, `FinOps` | Attestation `NHI`, moindre privilège, `EvalOps` | Certificats `SVID`, `OBO`, `OPA`, `OTel` | Chap. 10–13 |

*Tableau 2.2 — Matrice de responsabilité architecturale des quatre plans découplés.*

La pérennité de cette topologie tient au strict respect des contrats entre plans adjacents. Entre les Plans 1 et 2, l’interaction privilégie l’émission d’un mandat borné et d’un identifiant de corrélation, permettant au `SoE` de rester réactif ou d’attendre une validation humaine asynchrone sans bloquer de session applicative [24] [27]. Entre les Plans 2 et 3, tout appel d’outil ou de mémoire transite par des contrats typés, paginés et idempotents, de sorte que la reprise sur incident d’un orchestrateur ne duplique aucune écriture dans un `SoR` [28] [31] [35]. Enfin, le Plan 4 opère en interception obligatoire plutôt qu’en journalisation passive a posteriori : aucune délégation ou requête d’outil n’aboutit sans vérification préalable d’identité machine et de politique d’intention [24] [21] [34].

### 2.3.3 Double lecture EA / SA : résilience aux pannes transversales et isolement multi-locataires

La topologie en quatre plans offre une réponse structurée aux défaillances opérationnelles comme aux attaques multi-couches [21] [34].

En **lecture EA**, ce découplage prévient le verrouillage intégral de la pile technologique : l’entreprise peut remplacer une interface du Plan 1, faire évoluer son moteur du Plan 2 ou basculer de modèle fondationnel sans reconstruire ses connecteurs `MCP` du Plan 3 ni affaiblir l’audit du Plan 4 [29] [35] [20]. L’alignement sur le cadre `MAESTRO` de la `Cloud Security Alliance` (`CSA`) montre en outre qu’en séparant ces plans, une compromission d’écosystème ou de données (Plan 3) ne peut ni escalader librement dans la logique d’orchestration (Plan 2) ni altérer les journaux et garde-fous (Plan 4) [21] [34].

En **lecture SA**, les frontières inter-plans proscrivent les court-circuits architecturaux : aucune interface du Plan 1 ne requête directement un index vectoriel du Plan 3 sans traverser l’orchestrateur et les contrôles du Plan 4, et aucun nœud du Plan 2 ne dépend des schémas physiques d’un `SoR` [24] [28] [19]. En environnement multi-locataires, le `SA` arbitre entre l’isolement physique (`Silo`) pour les unités sensibles et la mutualisation sous quotas (`Pooled`) pour les services communs, tout en conservant un Plan 4 unifié [28] [19].

> **Arbitrage EA / SA** — Exiger que tout dossier d’architecture répartisse explicitement ses composants entre les quatre plans de référence et rejeter tout flux contournant le Plan 3 (accès direct aux `SoR`) ou le Plan 4 (secrets statiques ou absence de télémétrie). Pour le multi-locataires, mutualiser le Plan 4 de gouvernance mais cloisonner les gisements de mémoire du Plan 3 en mode `Silo` dès qu’apparaissent des données réglementées.

## 2.4 Gouvernance du portefeuille : arbitrage Acheter (agents SaaS) vs Assembler vs Construire

La multiplication des agents embarqués chez les éditeurs logiciels confronte l’architecte d’entreprise à un arbitrage économique et stratégique inédit : faut-il activer les agents natifs des progiciels `SaaS` existants, assembler une couche composable sur des plateformes managées et standards ouverts, ou construire des agents sur mesure [24] [28] [36]?

### 2.4.1 Recomposition du portefeuille applicatif face aux agents embarqués

Les cadres stratégiques de Microsoft (`CAF`), d’AWS et de Thoughtworks montrent que l’opposition binaire entre achat sur étagère et développement interne est devenue insuffisante pour gouverner les agents d’IA [24] [28] [36]. L’arbre décisionnel séquentiel du `CAF` exige d’abord de valider qu’un cas d’usage requiert réellement une capacité de raisonnement plutôt qu’un automatisme déterministe; il examine ensuite si un agent `SaaS` prêt à l’emploi suffit avant d’envisager l’assemblage faible code, le développement PaaS ou le déploiement sur infrastructure dédiée [24]. Cette hiérarchisation éclaire le positionnement de deux familles de solutions dans le patrimoine :

- **Les progiciels horizontaux formant les** `Systems of Record` **(ERP, CRM, SIRH, bureautique)** héritent des contrôles d’accès natifs de l’éditeur; leurs agents embarqués sont pertinents lorsque le processus demeure confiné au périmètre fonctionnel et de données d’un seul environnement `SaaS` [24] [20].
- **Les flux transversaux et différenciateurs inter-systèmes** s’accommodent mal d’une logique fermée propre à un seul éditeur : y contraindre l’organisation fait perdre la maîtrise des politiques d’évaluation, de l’ingénierie du contexte et du portage entre modèles [24] [36] [33].

Dès lors, hors des capacités purement déterministes qui demeurent sans agent, le portefeuille s’organise autour de trois régimes complémentaires [24] [31] [36] :

1. **Acheter (*Buy* — Agents** `SaaS` **natifs)** : activation d’agents prêts à l’emploi livrés dans les progiciels existants sur des tâches standardisées et à faible personnalisation (productivité bureautique, soutien interne, requêtes intra-progiciel) [24] [20].

2. **Assembler (*Assemble* — Plateforme composable)** : assemblage d’agents et de workflows sur des services managés faible code ou PaaS adossés aux standards ouverts (`MCP`, `A2A`) pour relier plusieurs `SoR` et `SaaS` sans réécrire les couches de base [24] [28] [35] [36].
3. **Construire (*Build* — Agents sur mesure)** : développement interne orienté code sur plateforme d’entreprise pour les capacités à forte différenciation concurrentielle, à latence stricte ou à souveraineté imposant le contrôle direct des modèles et du harnais d’exécution [24] [19] [36] [33].

### 2.4.2 Critères d’arbitrage et matrice décisionnelle du portefeuille

Deux dérives symétriques menacent le portefeuille TI : l’activation incontrôlée d’agents `SaaS` crée des silos cognitifs disjoints hors de tout contrôle centralisé, tandis que le tout-construit engendre un empilement artisanal fragile dont le coût de maintien croît avec chaque évolution de modèle ou de protocole [24] [20] [36] [33]. L’arbre de décision ci-dessous formalise le tri initial en comité d’architecture.

*Fig. 8. – Arbre décisionnel de gouvernance du portefeuille : Acheter, Assembler ou Construire*

L’arbitrage définitif croise six critères évalués conjointement par les équipes d’architecture d’entreprise, de solutions, de sécurité et de finance [24] [25] [26] [20].

| Critère d’arbitrage | Acheter (Agent `SaaS` natif) | Assembler (Plateforme composable) | Construire (Agent sur mesure) |
| --- | --- | --- | --- |
| **Différenciation métier** | Faible : productivité ou processus générique interne [24] | Moyenne : composition originale sur briques managées [24] [28] | Forte : cœur concurrentiel ou logique propriétaire [24] [36] |
| **Données et** `SoR` | Cantonnées à un seul progiciel `SaaS` [24] [20] | Flux entre plusieurs `SoR` via API et `MCP` [28] [35] | Couplage profond aux données souveraines [19] [20] |
| **Délai de déploiement** | Court (immédiat à semaines) sous gouvernance existante [24] | Modéré (semaines à quelques mois) [24] [28] | Long (mois à trimestres, durcissement inclus) [24] [36] |
| **Profil économique (**`TCO`**)** | Licences par siège ou frais d’usage éditeur [24] | Coût plateforme managée et inférence sous quotas [28] [31] | Investissement d’ingénierie et d’exploitation interne [24] [36] |
| **Maîtrise modèles et** `evals` | Opaque : modèles et seuils dictés par l’éditeur [24] [20] | Hybride : sélection de modèles et `evals` internes [24] [33] | Totale : modèles, garde-fous, capteurs et `evals` [36] [33] |
| **Verrouillage et sortie** | Élevé : dépendance feuille de route `SaaS` [24] [35] | Faible à modéré via normes `AAIF` (`MCP`, `A2A`) [35] [36] | Faible côté éditeur, dette interne gouvernée [36] [33] |

*Tableau 2.3 — Matrice décisionnelle multicritère Acheter vs Assembler vs Construire pour le portefeuille agentique.*

### 2.4.3 Portes d’homologation de l’Architecture Review Board (ARB) et clauses de réversibilité

Quel que soit le régime choisi, aucun agent ne contourne les exigences du portefeuille [24] [26] [20]. Un agent `SaaS` activé en quelques clics crée un risque critique s’il requiert des permissions excessives ou contourne la surveillance centralisée [21] [34] [20]. Conformément à la norme `ISO/IEC 42001:2023` — qui couvre explicitement les systèmes fournis par des tiers comme les développements internes — et aux cadres de gouvernance d’AWS, Microsoft et Google Cloud, l’`ARB` impose quatre verrous obligatoires [28] [19] [26] [20] :

1. **Enregistrement au catalogue (**`«Agent Registry»`**)** : déclaration du propriétaire métier, du niveau L0–L4, du rayon d’impact et de la classification des données avant toute mise en production [26] [20].
2. **Médiation aux frontières des plans** : tout agent `SaaS` dialogue avec le SI via les contrats du Plan 3 (`A2A` ou `MCP` filtré par passerelle) sous moindre privilège et quotas du Plan 4 [28] [19] [35] [20].
3. **Propriété des évaluations et journaux** : en tout régime, l’entreprise conserve ses suites `evals`, métriques de qualité et journaux d’audit pour comparer tout changement d’éditeur ou de modèle [25] [36] [33].
4. **Clauses contractuelles et techniques de réversibilité** : refus d’enfouir la logique métier dans des paramétrages fermés; exportabilité exigée des compétences, instructions et traces [35] [26] [36].

### 2.4.4 Double lecture EA / SA : arbitrages de portefeuille et dette d’intégration

L’arbitrage du portefeuille cristallise l’alignement permanent entre `EA` et `SA` [23] [24] [20].

En **lecture EA**, l’objectif consiste à concentrer l’ingénierie sur les capacités différenciatrices (*Construire* et *Assembler*) tout en prévenant la prolifération redondante d’agents `SaaS` [24] [20] [36]. Les progiciels horizontaux conservent leur rôle de `SoR`, tandis que la couche de `Systems of Agency` garde sa portabilité grâce aux standards ouverts de l’`AAIF` [35] [20]. Si les coûts ou limites d’un agent acheté freinent une chaîne de valeur, l’`EA` planifie sa bascule vers une composition ouverte [24] [35].

En **lecture SA**, ce choix dicte la maîtrise de la dette d’intégration [27] [33]. Devant un agent `SaaS`, le `SA` interpose des adaptateurs anti-corruption, des délégations bornées et des coupe-circuits contre la saturation des API ou la fuite de contexte [28] [21] [34] [20]. En régime assemblé ou construit, le `SA` consomme un harnais d’entreprise léger adossé aux chemins pavés de la plateforme interne présentée au chapitre 13 [29] [36] [33].

> **Arbitrage EA / SA** — Adopter le régime **Assembler** sur standards ouverts (`MCP`, `A2A`) comme choix par défaut pour les workflows inter-systèmes, confiner l’option **Acheter** aux commodités contenues dans un seul `SaaS`, et réserver l’option **Construire** aux capacités à forte propriété intellectuelle, souveraineté stricte ou latence critique justifiées devant l’`ARB`. Dans tous les cas, l’entreprise garde la maîtrise de ses contrats sémantiques, journaux et évaluations.

## Synthèse et transition vers le chapitre 3

Ce chapitre a posé les fondations d’urbanisation de l’entreprise agentique. La cartographie croisée `BIZBOK` /`TOGAF` arrime les agents à la refonte des chaînes de valeur plutôt qu’à l’automatisation isolée de tâches [23] [30]. L’extension du cycle `TOGAF ADM` et les profils `ArchiMate 3.2` dotent le référentiel des stéréotypes nécessaires (`«Cognitive Actor»`, `«Intent Contract»`, `«Guardrail Policy»`) pour satisfaire `NIST AI RMF` et `ISO/IEC 42001` [22] [25] [26]. L’architecture cible en quatre plans découplés — Expérience, Orchestration durable, Interopérabilité/Contexte et Confiance/Observabilité — prévient les couplages fragiles et borne la propagation des risques [28] [29] [20]. Enfin, l’arbitrage *Acheter vs Assembler vs Construire* protège le portefeuille contre l’enfermement propriétaire et la dette d’intégration [24] [35] [36].

Ces frontières macro-architecturales posées, il reste à ouvrir la boîte noire du Plan 2 au niveau d’un acteur unitaire : comment structurer le noyau d’exécution d’un agent (`Agent Harness`) et partitionner concrètement le travail entre logique déterministe et nœuds cognitifs? C’est l’objet du chapitre 3 et de sa règle hybride 80/20.

# Chapitre 3 — Anatomie d’un agent d’entreprise et partition des charges de travail : la règle hybride 80/20

Les deux chapitres précédents ont établi le cadre macroscopique de l’entreprise agentique : la rupture épistémique introduite par les composants probabilistes entre les systèmes d’engagement (`SoE`) et les systèmes d’enregistrement (`SoR`), puis l’urbanisation du portefeuille en quatre plans découplés. Passer à l’ingénierie concrète exige maintenant d’ouvrir la « boîte noire » de l’unité d’exécution élémentaire : l’agent autonome unitaire. Sur le terrain, les échecs en production proviennent rarement d’un déficit d’intelligence brute du modèle, mais d’une confusion architecturale sur la frontière entre raisonnement statistique et logiciel déterministe [37] [38].

Tout agent d’entreprise robuste repose sur un ou plusieurs modèles d’inférence encapsulés dans un **noyau d’exécution d’agent** (`Agent Harness`) déterministe et confinés dans un environnement système durci [39] [40]. Pour l’architecte de solutions (`SA`), la fiabilité de cette unité dépend de sa boucle de contrôle locale, de son confinement, de l’allocation frugale des modèles et du typage strict de ses interfaces [41] [42]. Pour l’architecte d’entreprise (`EA`), cette anatomie détermine la maîtrise des coûts variables d’inférence (`FinOps`), l’auditabilité des décisions automatisées et la portabilité face à l’obsolescence rapide des modèles [41] [38].

Ce chapitre décompose l’architecture d’un `Agent Harness` et ses enveloppes durcies (`SHADI`, `gVisor`, `Firecracker`), établit la cascade entre `frontier LLMs`, `SLMs` et modèles d’ancrage, formalise la règle hybride **80/20** entre flux déterministes et nœuds cognitifs, puis codifie les contrats typés par `JSON Schema` et décodage contraint. L’analyse porte strictement sur l’agent unitaire et la frontière déterministe/probabiliste; les protocoles réseau relèvent de la Partie II et l’`AI Gateway` mutualisée est traitée au chapitre 13.

## 3.1 Anatomie d’un Agent Harness de production et environnements d’exécution durcis (SHADI)

Un modèle de langage isolé demeure un prédicteur de jetons sans état, dépourvu de mémoire persistante, d’accès aux outils et de conscience des politiques de sécurité. Pour en faire un composant exploitable, il faut l’enchâsser dans un **noyau d’exécution d’agent** (`Agent Harness`), c’est-à-dire la boucle logicielle déterministe qui pilote l’inférence, gère le contexte, applique les plafonds de consommation, valide les appels d’outils et confine les effets système [37] [39] [43].

### 3.1.1 Décomposition fonctionnelle de l’`Agent Harness`

Les retours d’ingénierie sur les agents longue durée montrent qu’un `Agent Harness` articule quatre sous-systèmes déterministes [37] [39] :

1. **Boucle de contrôle et garde-fous de budget (*control loop*)** : elle exécute le cycle perception-raisonnement-action (patron `ReAct` lors d’explorations ouvertes) dans une machine à états bornée [37] [44]. Elle maintient des plafonds explicites d’itérations, de jetons et de latence pour stopper toute boucle circulaire ou erreur répétée d’outil, capturant la trace d’échec afin d’engager un repli déterministe [39] [43].
2. **Assembleur de contexte et sessions longues** : lorsque les tâches dépassent une fenêtre de contexte, la cohérence se dégrade sans discipline de passation [39]. Les travaux d’Anthropic préconisent de séparer un agent initialiseur d’un agent d’exécution incrémentale consignant des artefacts de passation structurés (journaux de progression, état des vérifications) entre fenêtres successives [39].
3. **Sélecteur d’inférence** : cette abstraction découple le code applicatif d’un fournisseur donné, aiguille chaque appel (`SLM` spécialisé ou `frontier LLM`) et impose le décodage contraint [41] [42], dialoguant à l’échelle de l’entreprise avec l’`AI Gateway` (chapitre 13).
4. **Répartiteur d’outils et vérification** : il expose les capacités autorisées, valide les arguments avant exécution et retourne des diagnostics exploitables [37] [43]. L’ajout de vérificateurs déterministes indépendants (analyseurs statiques, tests) — ou d’évaluateurs isolés du contexte générateur — évite que le modèle n’auto-valide ses erreurs [39].

L’`Agent Harness` concrétise ainsi les systèmes d’IA composés (*Compound AI Systems*) : la fiabilité en production provient du couplage entre inférence et logiciel déterministe [38]. À l’inverse, accumuler dans le harnais des rustines propres aux défauts d’un modèle donné crée un couplage fragile qui devient caduc dès la version suivante [37].

> **[Figure]**
> - Agent Harness (Boucle applicative déterministe)
> - [container]
> - Enveloppe d'exécution
> - durcie (SHADI / Bac à
> - sable) [system]
> - «component» Boucle de contrôle
> - [Machine d'états / Budget]
> - Tours, plafonds et reprise
> - «component» Assembleur contexte
> - [Fenêtre & compaction]
> - Mémoire travail et passation
> - «component» Sélecteur inférence
> - [Cascade SLM / LLM]
> - Aiguille SLM ou frontier LLM
> - «component» Répartiteur d'outils
> - [JSON Schema]
> - Valide arguments avant appel
> - «component» Mémoire chiffrée
> - [SQLCipher]
> - État chiffré au repos
> - «component» Dérivation identité
> - [HKDF-SHA256]
> - did:key par session
> - «component» Porte de secrets
> - [agent_secrets]
> - Trousseau attesté
> - «component» Confinement noyau
> - [Landlock / gVisor / KVM]
> - Syscalls, fichiers, réseau
> - «external_system» Modèles d'inférence
> - SLM local / Frontier LLM (ch. 13)
> - «external_system» Outils et SI cible
> - Code, shell, API (Partie II)
> - Compacte Étape cognitive Invoque
> - Lit / écrit
> - Atteste Scelle
> - Exécute Appel CFG
> - Sous politique

*Fig. 9. – Architecture C4 Component d’un Agent Harness de production et de son confinement SHADI*

> **Arbitrage EA / SA** — Imposer un `Agent Harness` minimal, composable et agnostique du fournisseur (`control loop` bornée, artefacts de passation persistants, validateur d’outils et journalisation structurée) [37] [39]. Le `SA` réduit le couplage aux particularités d’un modèle; l’`EA` protège les investissements applicatifs face au renouvellement rapide des moteurs d’inférence.

### 3.1.2 Menaces d’exécution unitaire selon l’`OWASP`

Dès qu’un agent exécute du code, manipule des fichiers locaux ou interroge des outils, la surface d’attaque s’élargit brutalement. Le référentiel *Agentic AI – Threats and Mitigations* de l’`OWASP` identifie trois risques majeurs au niveau du runtime unitaire [43] :

- **Exécution de code à distance inattendue (**`RCE`**)** : une injection indirecte dans un document lu par l’agent peut détourner son interpréteur ou son accès `shell` pour lancer des commandes arbitraires sur l’hôte [43].
- **Détournement d’outils et fuite de secrets (**`Tool Misuse`**)** : un agent lancé dans un processus ordinaire accède souvent aux variables d’environnement et aux clés du poste ou du microservice, exposant ces secrets en cas de détournement d’objectif [40] [43].
- **Autonomie excessive et déni de portefeuille** : sans plafonds de ressources ni validations humaines sur les opérations destructrices, une boucle non maîtrisée engendre des coûts explosifs et des mutations irréversibles [43].

L’`OWASP` prescrit de ne jamais confier la sécurité d’exécution au prompt système, d’interdire les évaluations dynamiques non bornées (`eval()`), d’isoler chaque environnement dans un bac à sable strict et d’appliquer des identités non humaines (`NHI`) à privilège minimal [40] [43].

### 3.1.3 Environnements durcis sur hôte : l’architecture `SHADI`

Lorsque des agents opèrent près de dépôts locaux, de postes d’ingénierie ou d’identifiants sensibles, les bacs à sable distants éphémères ne suffisent pas [40]. Le projet open source **SHADI** (*Secure Host for Agentic AI Dynamic Instantiation*), développé en `Rust` au sein de l’écosystème `AGNTCY` (Linux Foundation), établit une frontière durcie locale sur cinq couches cryptographiques et système [40] :

1. **Identité dérivée vérifiée** : à partir d’une racine humaine (`SLIM_HUMAN_SEED`), `SHADI` dérive de façon déterministe par `HKDF-SHA256` une identité `did:key` (`Ed25519`) propre à chaque instance d’agent enfant, éliminant les secrets partagés [40].
2. **Porte de secrets (**`agent_secrets`**)** : les jetons restent scellés dans le trousseau du système d’exploitation (avec intégration optionnelle `1Password`) et ne sont injectés dans l’environnement qu’au démarrage d’une session attestée [40].
3. **Confinement noyau OS (**`shadi_sandbox`**)** : piloté par l’utilitaire `shadictl` (permettant notamment d’inspecter et de simuler les règles avant lancement via `--print-policy`), `SHADI` applique des profils portables (`strict`, `balanced`, `connected`) ou des politiques JSON explicites directement via les primitives natives du noyau hôte — `Landlock` (Linux), `Seatbelt` (macOS) et `AppContainers` (Windows) — pour borner lectures, écritures et sorties réseau [40].
4. **Mémoire locale chiffrée (**`shadi_memory`**)** : une brique `Rust` chiffrée par `SQLCipher` protège l’état, le contexte et l’historique persistés sur disque entre deux sessions contre toute inspection non autorisée [40].
5. **Encapsulage** `AgentBridge` : des outils de développement en ligne de commande existants sont enveloppés comme écouteurs authentifiés par `DID` tout en restant soumis au confinement noyau [40].

Le transport réseau associé (`SLIM` /`MLS` et `A2A`) relève du chapitre 5 et l’attestation de grappe (`SPIFFE/SPIRE` et `OAuth 2.0 OBO`) du chapitre 10. Pour l’`EA`, `SHADI` protège les postes d’ingénierie contre les fuites de clés locales avec une empreinte opérationnelle légère [40].

### 3.1.4 Confinement en grappe : `Agent Sandbox`, `gVisor` et `Firecracker`

En environnement serveur multi-locataires, exécuter du code généré dans un conteneur `runc` expose le noyau Linux partagé aux évasions, tandis que les objets Kubernetes `Deployment` et `Job` gèrent mal les sessions agentiques avec état à identité réseau fixe [45] [46]. Le projet `kubernetes-sigs/agent-sandbox` comble ce manque via quatre ressources personnalisées : `Sandbox` (unité persistante à pause/reprise), `SandboxTemplate` (image et `runtimeClassName`), `SandboxWarmPool` (bassin préchauffé ramenant le démarrage sous la seconde) et `SandboxClaim` (allocation transactionnelle) [45].

Sous cette orchestration, deux moteurs d’isolation s’imposent en production :

- `gVisor` interpose un noyau en espace utilisateur en `Go` (`Sentry`) filtré par `seccomp-bpf`, tandis qu’un mandataire séparé (`Gofer`) contrôle les accès fichiers via `9P` sur socket Unix, sans virtualisation imbriquée [45] [46].
- `Firecracker` déploie des microVM sous hyperviseur `KVM` avec noyau invité dédié : sa spécification vérifiée en intégration continue garantit un démarrage (`InstanceStart` → `/sbin/init`) en au plus **125 ms** et un surcoût `VMM` d’au plus **5 MiB** (1 vCPU / 128 MiB) [47].

| Critère | Conteneur `runc` | `SHADI` (hôte local durci) | `gVisor` (`Sentry` + `Gofer`) | MicroVM `Firecracker` (`KVM`) |
| --- | --- | --- | --- | --- |
| Frontière d’isolation | Noyau hôte partagé | `Landlock`, `Seatbelt`, `AppContainers` | Noyau espace utilisateur `Go` + `seccomp-bpf` | Hyperviseur matériel `KVM` et noyau invité |
| Délai de démarrage | Rapide (partage du noyau sur image locale) | Quasi instantané (enveloppe de processus OS) | Sous la seconde via `SandboxWarmPool` | ≤ 125 ms (`InstanceStart` → `/sbin/init`) |
| Surcoût mémoire | Négligeable | Minimal (`Rust` + `SQLCipher`) | Faible à modéré (`Sentry` + `Gofer`) | ≤ 5 MiB pour le `VMM` (1 vCPU / 128 MiB) |
| Secrets et état | Risque d’exposition `env` | Porte `agent_secrets` + `HKDF-SHA256` | Gérée par l’orchestrateur de grappe | Isolation mémoire matérielle par microVM |
| Cas d’usage cible | Proscrit pour code généré | Postes d’ingénierie et données locales | Charges multi-locataires sans `KVM` imbriqué | Exécution de code tiers non fiable |

*Tableau 3.1 — Matrice comparative des technologies de confinement pour agents unitaires.*

> **Arbitrage EA / SA** — Proscrire le conteneur `runc` nu pour tout agent doté d’un interpréteur de code ou d’un `shell` [45] [43]. Déployer `SHADI` près des environnements locaux [40], et imposer `gVisor` ou `Firecracker` via `SandboxWarmPool` en grappe afin de conjuguer isolation forte et latence sous la seconde [45] [46] [47].

## 3.2 Typologie et spécialisation des modèles : frontier LLMs, SLMs spécialisés et cascade d’inférence

Allouer systématiquement un grand modèle frontalier (*frontier LLM*) à chaque étape cognitive d’un agent pénalise autant la latence `SA` que l’équilibre budgétaire `EA`. L’architecture des systèmes composés (`Compound AI Systems`) privilégie au contraire l’assemblage de modèles spécialisés et de routines déterministes selon les caractéristiques de chaque sous-tâche [38].

### 3.2.1 Petits modèles spécialisés (`SLM`) contre `frontier LLMs`

L’analyse publiée par des chercheurs de `NVIDIA` et de Georgia Tech montre que les appels d’un agent d’entreprise consistent majoritairement en sous-tâches répétitives et étroitement bornées — extraction ciblée, routage d’intention, génération `JSON` et remplissage d’arguments d’outils — plutôt qu’en dialogue ouvert [41]. Sur ces tâches focalisées, les petits modèles de langage (`SLM`, typiquement sous 10 à 14 milliards de paramètres) rivalisent avec les grands modèles généralistes antérieurs tout en apportant des gains de **10× à 30×** sur le coût par jeton, la latence et la consommation énergétique [41]. Leur faible taille facilite aussi le réglage fin métier sur des grappes souveraines locales, permettant aux équipes de convertir progressivement les étapes stables initialement prototypées sur `frontier LLM` vers des `SLM` spécialisés, tandis que les grands modèles demeurent réservés aux étapes de synthèse complexe ou d’ambiguïté élevée [41].

Cette spécialisation transforme aussi la gestion de la dette cognitive introduite au chapitre 1 : un `SLM` figé et versionné en interne pour une tâche d’extraction étroite subit beaucoup moins de dérives comportementales imprévues qu’un modèle généraliste mutualisé mis à jour unilatéralement par un fournisseur tiers [41] [38]. Pour l’`EA`, ce découplage préserve à la fois la prévisibilité `FinOps` et la souveraineté opérationnelle sur les traitements à haut volume.

### 3.2.2 Récupération en deux étages (`Bi-Encoder` et `Cross-Encoder`)

La performance et le coût d’un nœud génératif dépendent étroitement de la concision du contexte injecté. Le pipeline de référence en deux étages combine deux modèles non génératifs spécialisés [48] :

1. **Rappel par** `Bi-Encoder` : il encode séparément documents (pré-indexés hors ligne dans une base vectorielle) et requête en vecteurs denses, filtrant rapidement de vastes corpus vers une liste courte de 50 à 100 candidats [48]. Faute d’attention directe entre jetons de la requête et du document, il peine toutefois sur les négations ou contraintes logiques fines [48].
2. **Réordonnancement par** `Cross-Encoder` : il évalue simultanément chaque paire `[requête, candidat]` par attention croisée complète et ne conserve que les 3 à 5 meilleurs extraits pour le modèle génératif [48]. Comme il ne peut être pré-indexé et que son coût croît proportionnellement au nombre `K` de candidats, limiter `K ≤ 100` évite toute dérive de latence tout en réduisant drastiquement le volume de jetons soumis au `LLM` [48]. L’arrimage aux graphes de connaissances et aux `ACL` d’entreprise est développé au chapitre 6.

### 3.2.3 Cascades d’inférence (`FrugalGPT`) et routage amont (`RouteLLM`)

Deux patrons optimisent dynamiquement le compromis coût/précision entre `SLM` et `frontier LLM` à l’intérieur du harnais :

> **[Figure]**
> - Boucle Agent Harness
> - Récupération 2 étages (Bi-Encoder + Cross-Encoder)
> - Routeur / Cascade
> - (SLM vs Frontier)
> - SLM spécialisé (≤ 14B paramètres)
> - Frontier LLM (Escalade complexe)
> - Boucle Agent Harness
> - Récupération 2 étages (Bi-Encoder + Cross-Encoder)
> - Routeur / Cascade
> - (SLM vs Frontier)
> - SLM spécialisé (≤ 14B paramètres)
> - Frontier LLM (Escalade complexe)
> - 1 Requête métier normalisée
> - 2 Bi-Encoder (rappel vectoriel top 50-100)
> - 3 Cross-Encoder (réordonnancement top 3-5)
> - 4 Extraits contextuels compacts
> - 5 Tâche typée + contexte ancré
> - 6 Inférence rapide (ex. extraction / routage JSON)
> - 7 Réponse structurée + score de confiance
> - alt [Confiance >= seuil et schéma valide]
> - 8 Résultat retenu (coût et latence réduits)
> - [Ambiguïté ou échec de validation]
> - 9 Escalade avec trace et contexte borné
> - 10 Raisonnement résiduel structuré
> - 1 1 Résultat consolidé

*Fig. 10. – Séquence de récupération en deux étages et cascade d’inférence SLM vers Frontier LLM*

Dans une **cascade d’inférence** (`FrugalGPT` [49]), illustrée par le diagramme de séquence ci-dessus, le harnais soumet d’abord la requête à un modèle économique (`SLM`), puis contrôle un score de confiance ou la validité structurée du résultat : seule la fraction incertaine est escaladée vers le modèle frontalier [41] [49]. Combinée à l’adaptation de prompt et à l’approximation, cette stratégie atteint la précision du meilleur modèle individuel tout en réduisant le coût jusqu’à **98 %**, ou améliore la précision de `GPT-4` de **4 %** à budget égal [49]. Elle impose toutefois une pénalité de latence additive sur les requêtes escaladées, puisqu’un premier appel a déjà été consommé avant le repli.

À l’inverse, le **routage prédictif amont** (`RouteLLM` [50]) entraîne un routeur léger sur des données de préférence humaine (comme `Chatbot Arena`) enrichies par augmentation de données afin de diriger chaque requête dès l’entrée vers le modèle économique ou le modèle fort, évitant le coût de latence d’un double appel sur les cas difficiles. `RouteLLM` réduit les dépenses d’inférence de **plus de 50 %** (facteur supérieur à **2×**) à qualité comparable tout en transférant efficacement vers de nouveaux couples de modèles lors des évolutions de portefeuille [50]. La mutualisation réseau de ces routeurs dans une `AI Gateway` d’entreprise relève du chapitre 13.

| Famille de modèles | Rôle unitaire | Ordre de grandeur coût / latence | Atout principal | Garde-fou `SA` / `EA` |
| --- | --- | --- | --- | --- |
| `Bi-Encoder` | Rappel vectoriel (top 50–100) | Très bas; recherche rapide sur index vectoriel | Pré-indexation sur vastes corpus documentaires | Coupler au `Cross-Encoder` pour contraintes fines |
| `Cross-Encoder` | Réordonnancement fin (top 3–5) | Modéré; proportionnel au lot `K` évalué | Attention croisée haute précision | Plafonner `K ≤ 100` sous budget de latence p95 |
| `SLM` (≤ 10–14B) | Extraction, routage, `JSON`, outils | 10× à 30× moindre qu’un `LLM` généraliste | Spécialisable et souverain sur site | Escalade vers modèle fort sur faible confiance |
| `Frontier LLM` | Ambiguïté élevée et synthèse | Élevé; dépend du volume de jetons générés | Forte généralisation *zero-shot* | Restreint aux cas justifiés (`FinOps`) |

*Tableau 3.2 — Matrice d’allocation des familles de modèles dans un agent unitaire.*

> **Arbitrage EA / SA** — Interdire par défaut l’usage d’un `frontier LLM` sur les tâches répétitives et bornées (extraction, classification, formatage `JSON` ou remplissage d’arguments) dès que des `SLM` spécialisés atteignent la précision requise [41], et fixer en politique `FinOps` interne un seuil de revue dès qu’un nœud dépasse quelques milliers d’appels mensuels. Le `SA` expose le routage et la cascade derrière une interface unique dans le harnais; l’`EA` exige la modélisation de ces cascades dans le dossier `FinOps` (chapitre 12) tout en réservant la passerelle réseau partagée au chapitre 13.

## 3.3 Ingénierie de la partition 80/20 entre flux déterministes et nœuds cognitifs

Déléguer l’ensemble d’un processus métier à une boucle `ReAct` libre accroît la latence, multiplie les coûts d’inférence, élargit la surface d’injection de prompt et compromet la reproductibilité exigée lors des audits [37] [43] [44]. La **règle hybride 80/20** codifie la séparation disciplinée des responsabilités.

### 3.3.1 Propriété du flux de contrôle et règle 80/20

Anthropic distingue les **workflows** (où des chemins de code prédéfinis orchestrent modèles et outils) des **agents** (où le modèle contrôle dynamiquement sa propre trajectoire et ses appels d’outils) [37]. Google Cloud recommande pareillement de conserver le routage et les garde-fous dans du code déterministe dès que les étapes sont prévisibles, en réservant le `LLM` à l’interprétation, à l’extraction ou à la synthèse [44].

Selon la **règle hybride 80/20**, environ **80 %** du traitement d’un processus d’entreprise — normalisation d’entrée, validations de schémas, règles réglementaires et calculs financiers, aiguillages conditionnels, journalisation et écritures dans les `SoR` — demeure dans du **code déterministe**, tandis qu’environ **20 %** — les points confrontés à du langage ambigu ou à des exceptions non structurées — mobilisent un **nœud cognitif** (le plus souvent sans boucle, exceptionnellement en boucle bornée) [37] [38] [44]. Le ratio varie selon la nature du dossier (moins de 10 % en règlement financier, jusqu’à 30 % en analyse documentaire), mais le principe demeure invariable : le déterminisme est le défaut architectural et le probabilisme l’exception justifiée.

### 3.3.2 Arbre de tri en cinq régimes et décomposition mixte

Chaque sous-tâche métier est classée au moyen de l’arbre de décision ci-après afin d’appliquer la complexité minimale viable [37] [44].

*Fig. 11. – Arbre de décision d’allocation des sous-tâches métier selon la règle hybride 80/20*

Cinq régimes d’exécution en découlent :

1. **Règle métier exacte** : seuils légaux, fiscalité, contrôles d’admissibilité et calculs comptables restent en code pur déterministe [38] [44].
2. **Workflow codé fixe** : les séquences connues d’avance s’appuient sur des machines à états ou graphes programmés offrant testabilité unitaire et latence prévisible [37] [44].
3. **Apprentissage prédictif classique** : les scores tabulaires sans texte libre utilisent des modèles prédictifs classiques, plus rapides et plus explicables qu’un `LLM`.
4. **Nœud** `LLM` **contraint sans boucle** : un appel unique à schéma contraint extrait ou classe un texte libre dans un workflow déterministe sans décider du flux suivant [37] [42].
5. **Boucle agentique bornée** : réservée aux investigations ouvertes où les étapes ne peuvent être figées d’avance, sous plafond strict d’itérations, confinement `SHADI` ou microVM et validation humaine sur action critique [37] [39] [43].

Pour illustrer cette décomposition sur un dossier de réclamation d’assurance commerciale pouvant atteindre 250 k$ CA, une approche naïve « tout-agent » exposerait l’entreprise à un risque critique : une injection dissimulée dans une pièce jointe pourrait altérer le calcul d’indemnité ou déclencher un paiement hors plafond [43]. En appliquant la règle 80/20 dans un graphe mixte à état partagé fortement typé, le harnais sépare : (1) ingestion, vérification d’intégrité et génération d’identifiant de traçabilité en code pur; (2) extraction narrative par un nœud `SLM` contraint en `JSON Schema` [41] [51]; (3) vérification de couverture et calcul exact de franchise sur le `SoR` par moteur de règles déterministe; (4) avis juridique structuré par `LLM` uniquement si une clause d’exclusion ambiguë est détectée [48] [44]; (5) routage déterministe vers approbation humaine au-delà de 25 k$ CA ou en cas d’ambiguïté [43]; (6) mutation transactionnelle encadrée par exécution durable (chapitre 9); (7) rédaction de notification suivie d’une vérification déterministe des montants numériques avant envoi. Sur le plan `SA`, chaque nœud déterministe reste isolément testable par jeux de tests unitaires et simulacres (*mocks*); sur le plan `EA`, le suivi de la part d’étapes cognitives — maintenue sous le seuil cible de 20 % hors exceptions documentaires — sert d’indicateur de santé architecturale lors des revues de portefeuille.

| Sous-tâche métier | Régime retenu | Part cible | Contrat d’interface | Auditabilité `EA` |
| --- | --- | --- | --- | --- |
| Calculs, seuils légaux, contrôles | Code déterministe / Règles | ~80 % (avec flux) | Fonctions pures, couverture unitaire 100 % | Reproductibilité absolue et preuve triviale |
| Enchaînement nominal, mutations `SoR` | Workflow / Graphe d’états | ~80 % (avec règles) | Transitions codées, idempotence (chap. 9) | Parcours figé sans dérive d’exécution |
| Scoring structuré sans texte | ML prédictif classique | Selon domaine | Vecteurs normalisés et seuils versionnés | Explicabilité statistique et coût négligeable |
| Extraction ou synthèse ciblée | Nœud `LLM` /`SLM` sans boucle | ~15 % | `JSON Schema` (`CFG`) + validateur aval | Entrée/sortie journalisée, zéro autonomie |
| Investigation ouverte multi-outils | Boucle agentique bornée | ~5 % | Plafond d’étapes, confinement, `HITL` | Trace complète de trajectoire et budget fixe |

*Tableau 3.3 — Grille de partitionnement 80/20 des sous-tâches d’un processus métier.*

> **Arbitrage EA / SA** — Exiger en revue d’architecture la justification écrite de toute boucle agentique face à un workflow déterministe ponctué de nœuds `LLM` sans boucle [37] [44]. L’`EA` protège l’intégrité comptable des `SoR` et contient le coût variable d’inférence; le `SA` rétablit la testabilité unitaire de 80 % de la base applicative et isole le non-déterminisme derrière des interfaces typées.

## 3.4 Contrats typés d’entrée/sortie (Structured Outputs et JSON Schema)

La partition 80/20 exige des frontières aussi fiables que des contrats d’API entre les 20 % de nœuds cognitifs et les 80 % de code déterministe. Le simple « JSON Mode » probabiliste des premiers modèles ne garantissait que la validité syntaxique globale du document JSON, sans empêcher l’omission de champs obligatoires, l’inversion de types (une chaîne à la place d’un entier), les virgules excédentaires ou l’invention de propriétés non déclarées [42]. Par conséquent, les équipes applicatives devaient multiplier les parseurs tolérants, les expressions régulières fragiles et les boucles de réessai coûteuses [42] [51]. Le **décodage contraint** (*constrained decoding*) résout cette fragilité directement au niveau de l’échantillonnage des jetons [42] [52].

### 3.4.1 Mécanisme du décodage contraint et accélération `XGrammar`

Les moteurs de production appliquent un **décodage contraint** directement sur la distribution de probabilité des jetons. `OpenAI Structured Outputs` (via `strict: true`) [42] et le moteur ouvert `XGrammar` [52] compilent le `JSON Schema` cible en une **grammaire hors contexte (**`CFG`**)**, tandis qu’`Anthropic` offre un décodage contraint équivalent par le paramètre `output_config.format` de type `json_schema` [51]. À la différence des automates à états finis simples ou des expressions régulières limités par l’absence de pile pour les objets ou tableaux imbriqués récursivement, une `CFG` modélise exactement l’appariement syntaxique complet [42]. À chaque pas de génération, le moteur applique un masque binaire sur la distribution de logits en forçant à `−∞` (probabilité nulle) tout jeton violant la grammaire, rendant impossible l’émission d’une syntaxe non conforme [42] [52].

Sur grappe souveraine de modèles ouverts, le moteur `XGrammar` (`MLC` / `CMU`) élimine le goulot CPU de cette vérification en séparant le vocabulaire entre jetons indépendants du contexte (précalculés en cache) et jetons dépendants évalués par un automate à pile persistant, recouvrant ce calcul avec l’exécution `GPU` [52]. Il atteint des accélérations allant jusqu’à **100×** par rapport aux moteurs antérieurs de génération guidée, stabilisant le budget de latence sans réessai syntaxique, comme le synthétise la séquence suivante [42] [51] [52].

> **[Figure]**
> - Harnais déterministe (Pydantic / Validateur)
> - Moteur d'inférence
> - (CFG + Cache)
> - Modèle de langage
> - (Logits bruts)
> - Système aval (Workflow / Outil)
> - Harnais déterministe (Pydantic / Validateur)
> - Moteur d'inférence
> - (CFG + Cache)
> - Modèle de langage
> - (Logits bruts)
> - Système aval (Workflow / Outil)
> - 1 Requête + JSON Schema Draft 2020-12 (strict: true)
> - 2 Compile grammaire CFG (si schéma inédit) + mise en cache
> - loop [À chaque jeton généré]
> - 3 Distribution de logits bruts
> - 4 Masque binaire CFG (jetons invalides -> -infini)
> - 5 Échantillonnage syntaxique contraint
> - 6 Charge utile JSON conforme à la grammaire
> - 7 Validation sémantique déterministe (Pydantic / règles)
> - alt [Invariants métier satisfaits]
> - 8 Exécute transition ou appel typé
> - [Violation sémantique ou refus typé]
> - 9 Réessai borné (max N) ou repli déterministe

*Fig. 12. – Séquence d’exécution d’un contrat typé par décodage contraint CFG et validation sémantique*

### 3.4.2 Règles de conception `JSON Schema Draft 2020-12` et validation sémantique

Les contrats s’appuient sur le standard agnostique `JSON Schema Draft 2020-12` (`https://json-schema.org/draft/2020-12/schema`), qui normalise le vocabulaire central de structuration et le vocabulaire de validation des types, bornes et motifs [53]. Pour rester compatibles avec les compilateurs `CFG` en mode `strict: true`, les schémas de production doivent toutefois respecter trois contraintes pratiques [42] [51] :

- **Fermeture et exhaustivité** : déclarer `"additionalProperties": false` sur chaque objet et lister toutes les propriétés dans `"required"`, en représentant les champs facultatifs par union avec `null` (`["string", "null"]`) [42] [51].

- **Exclusion de mots-clés dynamiques** : éviter `allOf`, `if/then/else` et certaines disjonctions `anyOf` à la racine qui déclenchent un rejet `HTTP 400` en mode strict [42].
- **Préchauffage du cache grammatical** : la première soumission d’un schéma inédit subit une latence de compilation `CFG` (de quelques secondes à près d’une minute sur schémas massifs) avant mise en cache [42]; les schémas doivent donc être statiques et versionnés.

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ExtractionDeclarationSinistre",
  "type": "object",
  "additionalProperties": false,
  "required": ["statut_analyse", "categorie_sinistre", "montant_reclame_cad", "motif_escalade"],
  "properties": {
    "statut_analyse": { "type": "string", "enum": ["EXTRAIT", "AMBIGU_ESCALADE", "DONNEES_INSUFFISANTES"] },
    "categorie_sinistre": { "type": ["string", "null"], "enum": ["DEGAT_EAU", "INCENDIE", "BRIS_EQUIPEMENT", null] },
    "montant_reclame_cad": { "type": ["number", "null"] },
    "motif_escalade": { "type": ["string", "null"] }
  }
}
```

L’état explicite `AMBIGU_ESCALADE` évite qu’un modèle contraint n’invente une valeur plausible par défaut faute de porte de sortie typée. Par-dessus tout, le décodage contraint garantit **la forme syntaxique, jamais la véracité factuelle** [42]. Comme l’illustre la séquence ci-dessus, le harnais doit systématiquement coupler la sortie contrainte à un validateur déterministe post-génération — par exemple via `Pydantic`, qui exporte directement des schémas `Draft 2020-12` (`OpenAPI 3.1.0`) via `model_json_schema()` pour garantir une source de vérité unique [54].

Ce validateur déterministe applique quatre contrôles systématiques avant toute transition vers les 80 % de code métier en aval :

1. **Invariants relationnels et temporels** : vérifier par code pur que la date d’un sinistre est cohérente avec la période de couverture du contrat et l’horodatage de déclaration.
2. **Contrôle d’ancrage (*grounding*)** : s’assurer que tout identifiant de clause, référence de police ou montant chiffré retourné correspond effectivement aux extraits fournis ou au `SoR` interrogé.
3. **Boucle de réparation bornée** : si un invariant métier échoue, le harnais réinjecte le diagnostic d’erreur exact dans une tentative de correction strictement plafonnée (typiquement un à deux réessais) afin de prévenir toute dérive de budget [39] [43].
4. **Repli déterministe (*fallback*)** : au-delà du plafond ou sur statut `AMBIGU_ESCALADE`, le workflow oriente automatiquement le dossier vers une file humaine ou un traitement dégradé déterministe [43] [44].

Cette rigueur contractuelle prépare directement le typage des outils `MCP` étudié à la Partie II.

> **Arbitrage EA / SA** — Imposer une **source de vérité unique** par nœud cognitif : générer le contrat `JSON Schema Draft 2020-12` depuis les modèles typés applicatifs (`Pydantic` ou équivalent), tester sa compatibilité `strict: true` en intégration continue et doubler chaque appel contraint d’une validation sémantique déterministe [42] [54]. Pour le `SA`, le cache `CFG` reste chaud et les parseurs ne cassent plus; pour l’`EA`, les états explicites d’escalade permettent de mesurer objectivement la précision réelle lors des changements de modèle ou des audits.

## Synthèse architecturale du chapitre

Un agent d’entreprise fiable n’est pas un modèle conversationnel laissé en roue libre, mais un composant logiciel hybride où le raisonnement probabiliste demeure minoritaire et strictement encadré. L’articulation d’un `Agent Harness` minimal et observable, d’un confinement système robuste (`SHADI` en local, `gVisor` ou `Firecracker` via `Agent Sandbox` en grappe), d’une cascade frugale associant `Bi-Encoder` /`Cross-Encoder` et `SLM` /`frontier LLM`, de la partition **80/20** et de contrats `JSON Schema Draft 2020-12` doublés d’une validation sémantique déterministe rend l’agent unitaire composable et auditable. La Partie II ouvre désormais cet agent sur l’extérieur : d’abord verticalement vers les outils et le patrimoine (`MCP`, chapitre 4), puis horizontalement entre agents (`A2A` et `AGNTCY`, chapitre 5) et enfin vers les couches de mémoire et de gouvernance sémantique (chapitre 6).

# Partie II — Interopérabilité : protocoles, contrats et patrimoine applicatif

# Chapitre 4 — Interopérabilité verticale agent-outil : Model Context Protocol (MCP), passerelles et intégration du patrimoine

La Partie I a montré qu’un agent d’entreprise fiable repose sur un noyau déterministe — l’`Agent Harness` — bornant l’inférence probabiliste derrière des contrats typés. Isolé dans son environnement d’exécution (`SHADI`, `gVisor` ou `Firecracker`), ce noyau demeure toutefois inopérant sans accès gouverné aux données et transactions du système d’information. La Partie II adresse donc le Plan 3 d’interopérabilité défini au chapitre 2. Ce chapitre 4 traite exclusivement de l’**interopérabilité verticale agent-outil** : la découverte, l’ergonomie sémantique, la médiation en passerelle et l’encapsulation patrimoniale permettant à un agent d’invoquer des capacités déterministes. La coopération horizontale inter-agents relève du chapitre 5 (`A2A` et `AGNTCY`), l’ingénierie des mémoires du chapitre 6, et la chaîne cryptographique d’identité (`SPIFFE`, `OAuth OBO`, `OPA` /`Cedar`) du chapitre 10.

Pour l’architecte d’entreprise (`EA`), l’enjeu consiste à éliminer les connecteurs point-à-point tout en maîtrisant les coûts `FinOps` et la protection des `Systems of Record` (`ERP`, `CRM`, mainframes). Pour l’architecte de solutions (`SA`), il s’agit de concevoir des interfaces adaptées à un consommateur probabiliste, de bâtir des `MCP Gateways` multiprotocoles (`REST`, `gRPC`, `GraphQL`) et d’isoler le patrimoine par des couches anti-corruption.

## 4.1 Du couplage M × N au standard MCP : architecture sans état, primitives et négociation

### 4.1.1 Du couplage quadratique M × N à la gouvernance ouverte sous l’AAIF

Avant l’émergence d’un protocole vertical unifié, relier M environnements d’agents à N systèmes d’entreprise imposait autant de connecteurs dédiés [55]. Ce couplage quadratique `M × N` dupliquait le code d’authentification, fragilisait les déploiements à chaque évolution d’`API` et fragmentait l’auditabilité [55] [56]. Introduit par Anthropic en novembre 2024, le `Model Context Protocol` (`MCP`) ramène cette intégration à une complexité additive `M + N` : l’hôte implémente un client unique tandis que chaque domaine expose un serveur conforme au même contrat filaire [57] [55].

Pour garantir une pérennité indépendante des fournisseurs d’inférence, la Linux Foundation a lancé le 9 décembre 2025 l’`Agentic AI Foundation` (`AAIF`), portée par les contributions fondatrices d’Anthropic (`MCP`), de Block (`goose`) et d’OpenAI (`AGENTS.md`), avec comme membres Platine AWS, Anthropic, Block, Bloomberg, Cloudflare, Google, Microsoft et OpenAI [57]. Cette gouvernance neutre protège les architectures d’entreprise contre tout enfermement propriétaire.

Sur le plan structurel, `MCP` sépare trois rôles sur une enveloppe `JSON-RPC 2.0` [58] [59] :

1. **L’Hôte (**`MCP Host`**)** héberge l’`Agent Harness`, orchestre le modèle de langage, gère les consentements et agrège les contextes [58] [60].
2. **Le Client (**`MCP Client`**)** maintient au sein de l’hôte une liaison dédiée `1:1` avec un serveur donné, attache les métadonnées protocolaires à chaque requête et isole les domaines de confiance [58].
3. **Le Serveur (**`MCP Server`**)** expose de manière autonome outils, ressources et gabarits devant un système métier ou un gisement de données [58].

L’enveloppe `JSON-RPC 2.0` (`jsonrpc`, `method`, `params`, `id`, `result` ou `error`) découple le contrat applicatif du transport [58] [59]. En exécution locale confinée, le transport `stdio` communique sur l’entrée et la sortie standard du sous-processus (réservant `stderr` aux journaux), tandis qu’en réseau distribué d’entreprise, `Streamable HTTP` devient l’unique standard actif, reléguant l’ancien transport `HTTP + SSE` (`2024-11-05`) au statut déprécié [58] [60].

### 4.1.2 Le virage sans état de la révision 2026-07-28 et le transport Streamable HTTP

Jusqu’à la révision `2025-11-25`, `MCP` reposait sur un cycle à état de session : une poignée de main obligatoire (`initialize` puis `notifications/initialized`) émettait un identifiant `Mcp-Session-Id` conservé en mémoire serveur, accompagné d’un point d’accès `HTTP GET` permanent et de la reprise `SSE` par `Last-Event-ID` [58]. En production distribuée, cette affinité de session compliquait le passage à l’échelle derrière les répartiteurs de charge L7 et les environnements sans serveur (*serverless*) [58].

La spécification `2026-07-28` résout cette limitation en adoptant une architecture **strictement sans état** (*stateless*) [58] :

- **Suppression de la session et du handshake** : `Mcp-Session-Id` et l’échange `initialize` disparaissent du modèle moderne; les réponses de découverte (`tools/list`, `resources/list`, `prompts/list`) ne varient plus par connexion ni par effet de bord d’autres appels sur la connexion, tout en pouvant être filtrées selon les droits d’autorisation présentés sur la requête [58].
- **Négociation par requête via** `_meta` **et** `server/discover` : chaque appel transporte dans `_meta` la version protocolaire (`io.modelcontextprotocol/protocolVersion`), les capacités (`io.modelcontextprotocol/clientCapabilities`) et l’identité (`io.modelcontextprotocol/clientInfo`), doublés sur `HTTP` par l’en-tête `MCP-Protocol-Version` [58]. En cas d’écart, le serveur retourne `UnsupportedProtocolVersionError` (`-32022`) listant les versions `supported` pour permettre un réessai immédiat [58]. Tout serveur doit en parallèle implémenter `server/discover`, offrant aux clients et passerelles une inspection en un appel des versions et capacités supportées (ainsi qu’une sonde de rétrocompatibilité sur `stdio`) [58].
- **Point de terminaison** `POST` **unique en** `Streamable HTTP` : le serveur n’expose qu’une route `POST` (par exemple `/mcp`); il répond par un document JSON (`200 OK`, `application/json`) ou ouvre un flux `text/event-stream` (`SSE`) strictement borné à la requête courante (avec `X-Accel-Buffering: no` contre la mise en tampon des mandataires) pour émettre des `notifications/progress` avant la réponse finale [58]. Les notifications reçoivent un `202 Accepted`, et toute coupure réseau impose de réémettre la requête avec un nouvel `id` [58].

Lorsqu’un traitement métier exige un suivi multi-étapes (panier, session de navigation), le serveur délivre un **jeton d’état explicite** opaque et entropique passé comme argument ordinaire des appels ultérieurs, en validant l’autorisation à chaque invocation et en documentant son expiration [58]. Sur `Streamable HTTP`, les en-têtes obligatoires `Mcp-Method` et `Mcp-Name`, complétés par la projection `x-mcp-header` (`Mcp-Param-{name}` sur paramètres primitifs non sensibles, à l’exclusion stricte des secrets et `PII`), permettent aux équipements L7 d’aiguiller ou de limiter les requêtes sans désérialiser le JSON-RPC [58]. La figure 4.1 et le tableau 4.1 synthétisent cette mécanique.

> **[Figure]**
> - Hôte & Client MCP
> - (Agent Harness)
> - Passerelle / Serveur MCP (Point POST /mcp unique)
> - Système aval (API / Données)
> - Hôte & Client MCP
> - (Agent Harness)
> - Passerelle / Serveur MCP (Point POST /mcp unique)
> - Système aval (API / Données)
> - 1. Découverte sans état et cache (ttlMs)
> - 1 POST server/discover (_meta.protocolVersion: "2026-07-28", MCP-Protocol-Version)
> - 2 200 OK (supportedVersions, capabilities, ttlMs, cacheScope: "public")
> - 3 POST tools/list (cursor optionnel)
> - 4 200 OK (tools[], nextCursor, ttlMs, cacheScope)
> - 2. Invocation, MRTR et flux SSE par requête
> - 5 POST tools/call (Mcp-Method, Mcp-Name, Mcp-Param-\*)
> - alt [Information complémentaire requise (MRTR)]
> - 6 200 OK (resultType: "input_required", inputRequests, requestState)
> - 7 Collecte inputResponses (saisie ou approbation)
> - 8 POST tools/call (nouvel id, inputResponses + requestState)
> - 9 Appel métier normalisé (idempotent)
> - 10 Réponse aval
> - 1 1
> - 200 OK (text/event-stream SSE : notifications/progress -> resultType: "complete", structuredContent)
> - 3. Notifications sur abonnement explicite
> - 12 POST subscriptions/listen (toolsListChanged: true)
> - 13 Flux SSE ouvert (notifications/subscriptions/acknowledged)
> - 14 SSE : notifications/tools/list_changed

*Fig. 13. – Séquence protocolaire MCP 2026-07-28 : découverte sans état, transport Streamable HTTP, reprise MRTR et cache ttlMs*

| Dimension | Révision `2025-11-25` (avec session) | Révision `2026-07-28` (sans état) | Impact architectural `SA` |
| --- | --- | --- | --- |
| État et négociation | Handshake `initialize` et `Mcp-Session-Id` | Sans état; `_meta` par requête et `server/discover` | Répartition `L7` et mise à l’échelle horizontale sans affinité [58] |
| Transport `HTTP` | `POST` + `GET` SSE et reprise `Last-Event-ID` | Point `POST` unique; `SSE` borné à la requête; `subscriptions/listen` | Traversée simplifiée des pare-feux; réessai idempotent sur coupure [58] |
| Retours vers le client | Appels inverses (`sampling`, `elicitation`, `roots`) | `MRTR` (`resultType: "input_required"` + `requestState`) | Supprime les RPC inverses asymétriques derrière passerelle [58] |
| Cache de découverte | Heuristiques locales ou `listChanged` seul | Champs requis `ttlMs` et `cacheScope` (`"public"` /`"private"`) | Réduit la charge de découverte sur passerelles et `SoR` [58] |
| Tâches longues | Expérimentales dans le cœur (`tasks/result`) | Extension `tasks` (`tasks/get`, `tasks/update`) | Isole les workflows asynchrones longs du cœur synchrone [58] |
| Routage L7 | Lecture obligatoire du corps `JSON-RPC` | En-têtes `MCP-Protocol-Version`, `Mcp-Method`, `Mcp-Name`, `Mcp-Param-*` | Filtrage et routage régional à la vitesse du plan réseau [58] |

*Tableau 4.1 — Évolution structurante entre les révisions* `2025-11-25` *et* `2026-07-28` *du protocole* `MCP`*.*

### 4.1.3 Primitives serveur, modèle MRTR, schémas de sortie et cache natif

`MCP` classe les capacités serveur selon l’acteur qui en garde l’initiative [58] :

- **Outils (**`Tools`**, contrôlés par le modèle)** : opérations découvertes par `tools/list` et exécutées par `tools/call` [58]. Chaque outil spécifie un nom (1 à 128 caractères ASCII `A-Z`, `a-z`, `0-9`, `_`, `-`, `.`), une description, un `inputSchema` (`JSON Schema 2020-12` par défaut), un `outputSchema` optionnel et des `ToolAnnotations` (`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`) [58]. Fait déterminant pour les coûts d’inférence, `tools/list` doit retourner les outils dans un **ordre déterministe** afin de préserver les taux de succès du cache de prompt côté modèle [58].
- **Ressources (**`Resources`**, contrôlées par l’hôte)** : données adressables par `URI` (`resources/list`, `resources/read`, `resources/templates/list`) munies d’annotations de priorité et de fraîcheur [58].
- **Gabarits (**`Prompts`**, contrôlés par l’utilisateur)** : modèles paramétrables (`prompts/list`, `prompts/get`) exposés comme raccourcis structurés dans l’interface hôte [58].

Afin d’éliminer les requêtes RPC inverses du serveur vers le client, la révision `2026-07-28` déprécie `Roots`, `Sampling` et `Logging` (`SEP-2577`) et généralise le mécanisme **Multi Round-Trip Requests (**`MRTR`**)** [58].

Tout résultat porte `resultType` (`"complete"` ou `"input_required"`): lorsqu’une approbation ou saisie complémentaire est requise, le serveur retourne un `InputRequiredResult` (`inputRequests` et `requestState`), permettant au client de soumettre à nouveau `tools/call` muni de `inputResponses` et d’un nouvel `id` [58].

La robustesse des contrats s’appuie en outre sur `outputSchema` et `structuredContent` (validant la charge produite par le serveur, distincte des *Structured Outputs* du modèle vus au chapitre 3, et doublée en texte sérialisé pour compatibilité), ainsi que sur la distinction entre fautes protocolaires (`-32602` pour outil inconnu ou schéma invalide) et erreurs métier (`isError: true`) fournissant des indices d’auto-correction à l’agent [58]. Les résultats complets (`resultType: "complete"`) de découverte et lecture (`server/discover`, `tools/list`, `resources/list`, `resources/read`, `prompts/list`) incluent obligatoirement `ttlMs` (durée de fraîcheur en millisecondes vérifiée par `now < t_received + ttlMs`, sans déclencher de scrutin automatique) et `cacheScope` (`"public"` pour les intermédiaires partagés ou `"private"` par client), tandis que les réponses `input_required` et les requêtes portant `inputResponses` ou `requestState` ne doivent jamais être mises en cache [58]. En parallèle, `_meta` standardise la propagation `OpenTelemetry` (`traceparent`, `tracestate`, `baggage`) et `logLevel` par requête [58].

### 4.1.4 Double lecture EA / SA

Pour l’`EA`, `MCP` sous gouvernance `AAIF` unifie le Plan 3 en supprimant le couplage fournisseur, mais exige de rappeler que les `ToolAnnotations` demeurent **des indications non fiables** sur tout serveur non certifié et ne sauraient fonder une décision de sécurité [58] [57]. Pour le `SA`, le passage au protocole sans état `2026-07-28` impose de gérer la persistance applicative hors connexion (jetons explicites ou moteur durable du chapitre 9) et d’exploiter `ttlMs` ainsi que les en-têtes `Mcp-Method` /`Mcp-Param-*` dès la frontière réseau [58].

> **Arbitrage EA / SA** — Adopter la spécification `MCP` (`Streamable HTTP` sans état, révision `2026-07-28` avec repli documenté si requis) comme contrat vertical unique entre l’`Agent Harness` et les systèmes d’outils, en écartant `HTTP + SSE` sur tout nouveau projet [58] [57]. L’`EA` interdit d’accorder une confiance de sécurité aux seules `ToolAnnotations` et impose l’audit des serveurs autorisés; le `SA` exploite `server/discover`, le tri déterministe de `tools/list`, les en-têtes `Mcp-Method` /`Mcp-Name` /`Mcp-Param-*` et les bornes `ttlMs` /`cacheScope` pour bâtir une couche verticale sans affinité de session [58].

## 4.2 Ergonomie sémantique des outils (Agent-Computer Interface) contre l’anti-patron Swagger-to-MCP

### 4.2.1 Principes de l’Agent-Computer Interface (ACI)

Un transport standardisé ne garantit ni la justesse de sélection ni l’efficacité d’un outil. Dans *SWE-agent*, Yang et al. ont établi le concept d’`Agent-Computer Interface` **(**`ACI`**)** en montrant que les agents de langage forment une classe d’utilisateurs distincte des humains et des programmes déterministes [61]. En dotant le modèle d’une interface sur mesure — intégrant un visualiseur et un éditeur de fichiers dédiés, des commandes de recherche et de navigation dans les dépôts ainsi que l’exécution de tests — `SWE-agent` a atteint `12,5 %` de réussite `pass@1` sur `SWE-bench` et `87,7 %` sur `HumanEvalFix` [61].

Anthropic transpose ce principe à l’ingénierie des serveurs `MCP` : un outil incarne un contrat entre un système déterministe et un consommateur non déterministe [62]. Ses noms, descriptions, paramètres et retours appartiennent de plein droit à l’ingénierie du contexte : l’interface la plus claire pour l’agent se révèle du même coup la plus lisible pour les équipes d’exploitation [62].

### 4.2.2 L’anti-patron Swagger-to-MCP : saturation, confusion et double transit

Face à des centaines d’`API` existantes, la tentation répandue consiste à générer automatiquement un serveur `MCP` en traduisant chaque route `OpenAPI` /`Swagger` (`GET`, `POST`, `PATCH`, `DELETE`) en un outil individuel. Cet **anti-patron** `Swagger-to-MCP` engendre quatre défaillances critiques en production [62] [55] [63] :

1. **Saturation de la fenêtre de contexte** : un portefeuille applicatif ou `SaaS` compte aisément plusieurs centaines d’opérations [64] [63]. L’injection statique de tous les schémas d’entrée dans le contexte consomme des centaines de milliers de jetons avant même le traitement de la requête utilisateur, gonflant les coûts et la latence [55] [63].
2. **Confusion d’outils (**`tool confusion`**)** : devant des grappes d’opérations granulaires quasi synonymes (`get_user`, `list_users`, `get_user_details`), le modèle sélectionne la mauvaise route ou hallucine des clés étrangères manquantes [62] [63].
3. **Double traversée des charges intermédiaires** : en invocation directe, toute donnée lue d’un outil transite par la fenêtre de contexte du `LLM` pour être recopiée vers l’outil suivant [55] [64]. Anthropic montre qu’un transfert de transcription d’une réunion de deux heures entre `Google Drive` et `Salesforce` injecte environ `50 000` jetons supplémentaires dans la boucle, tout en augmentant le risque d’erreur de copie [55].
4. **Rejet technique des schémas** `OpenAPI` **complexes** : les spécifications destinées aux développeurs abondent en constructions polymorphiques (`oneOf`, `anyOf`, `allOf`) et en sérialiseurs complexes d’en-têtes ou de *cookies*. Comme le précise la documentation d’`Amazon Bedrock AgentCore Gateway`, ces mots-clés combinatoires, les contrats `Swagger 2.0` et ces sérialiseurs sont incompatibles avec la conversion vers les `ToolSpec` des modèles [65].

La figure 4.2 met en contraste l’empilement `Swagger-to-MCP` naïf et l’architecture `ACI` consolidée.

> **[Figure]**
> - Anti-patron : Wrapper
> - Swagger-to-MCP 1:1
> - Architecture cible : Façade ACI et
> - découverte dynamique
> - Harnais LLM (Contexte saturé)
> - Catalogue brut 200+ outils CRUD Endpoints fins GET / POST / PATCH
> - Sélection erratique & double transit de jetons
> - Harnais LLM (Contexte épuré)
> - Tool Search ou Code Mode isolé
> - Outils ACI consolidés (Intention métier)
> - Orchestrateur aval (REST / OData agrégé)
> - Charge tous les schémas d'entrée
> - Appels séquentiels
> - sans agrégation
> - Payloads bruts renvoyés au LLM
> - Charge à la demande
> - (schémas pertinents)
> - Contrats sémantiques
> - & outputSchema
> - Enchaîne et filtre avant retour concis

*Fig. 14. – Comparaison structurelle entre l’anti-patron Swagger-to-MCP 1:1 et l’architecture ACI consolidée*

### 4.2.3 Remédiations : façades d’intention, Dynamic Toolsets, Code Mode et intégrité OWASP

Quatre leviers permettent d’éradiquer l’anti-patron `Swagger-to-MCP` tout en sécurisant la surface sémantique des outils.

**Façades consolidées par intention métier.** Plutôt que d’exposer des primitives `CRUD` fragmentaires, il faut assembler des outils orientés workflow (`schedule_event`, `get_expenses_by_date_range`) qui exécutent de façon déterministe la séquence d’appels aval [62]. Anthropic recommande un espace de nommage strict par domaine (`slack_search`), le retour d’identifiants sémantiques lisibles plutôt que d’`UUID` opaques, un paramètre `response_format` (`"concise"` ou `"detailed"`) régulant la verbosité, la pagination bornée et une boucle d’évaluation automatisée mesurant l’impact de chaque révision de schéma [58] [62].

**Découverte progressive (**`Dynamic Toolsets` **contre** `tool search` **natif).** Pour les vastes catalogues, Speakeasy a évalué sur des ensembles de 40 à 400 outils le patron `Dynamic Toolsets` articulé autour de trois méta-outils : `search_tools` (recherche sémantique par plongements avec aperçu des catégories et filtres d’étiquettes), `describe_tools` (chargement différé du schéma d’entrée) et `execute_tool` [63]. Sur ces bancs de test, cette approche a réduit la consommation jusqu’à `160×` (en moyenne `96 %` des jetons d’entrée et `90 %` au total) tout en préservant `100 %` de succès [63]. Toutefois, Speakeasy souligne que les harnais clients modernes intégrant nativement un `tool search` différé au niveau de l’inférence, embarquer une seconde couche de recherche à l’intérieur d’un serveur `MCP` unitaire entre en concurrence avec le modèle et dégrade la découvrabilité [66]. La recherche dynamique appartient donc au harnais ou à la passerelle fédérée, non à chaque serveur isolé [66].

**Exécution programmatique (**`Code Mode`**).** Formalisée par Anthropic et Cloudflare (Kenton Varda et Sunil Pai), l’architecture `Code Mode` projette les outils `MCP` sous forme d’`API TypeScript` typées [55] [64]. Parce que les `LLM` ont assimilé un volume massif de code `TypeScript` réel comparativement aux jetons synthétiques d’appel de fonction, le modèle rédige un script court qui enchaîne, filtre et agrège plusieurs appels sans repasser les résultats intermédiaires par le contexte [55] [64]. Chez Cloudflare, ce script s’exécute dans un isolat `V8 Dynamic Worker` privé d’accès Internet direct et raccordé uniquement par liaisons internes aux serveurs `MCP` autorisés, maintenant les clés d’`API` hors de portée du code généré [64] [66].

**Défense sémantique contre les menaces** `OWASP`**.** Puisque toutes les descriptions et valeurs de retour cohabitent dans la même fenêtre contextuelle du modèle, l’`OWASP MCP Top 10` et l’`OWASP MCP Security Cheat Sheet` identifient trois risques critiques au niveau `ACI` : le `Tool Poisoning` (instructions cachées dans les descriptions ou retours), les `Rug Pull Attacks` (altération malveillante d’un outil après approbation initiale) et le `Tool Shadowing` (détournement inter-serveurs au sein du même hôte) [67] [60]. La validation stricte des schémas et la vérification d’empreinte des définitions approuvées deviennent ainsi des exigences d’ingénierie de base [60]. Le tableau 4.2 résume ces arbitrages.

| Critère | `Swagger-to-MCP` 1:1 | Façade `ACI` d’intention | `Dynamic Toolsets` / `Tool Search` | `Code Mode` en isolat |
| --- | --- | --- | --- | --- |
| Granularité | Routes `CRUD` brutes | Outils métier consolidés | Indexation et chargement paresseux | Modules `TypeScript` en bac à sable |
| Empreinte contextuelle | Massive (saturation rapide) [55] [63] | Faible par domaine [62] | Réduite jusqu’à `160×` (`90 %` total) [63] | Minimale (synthèse seule retournée) [55] [64] |
| Données intermédiaires | Double traversée par le `LLM` [55] | Filtrées en sortie (format concis) [62] | Transitent à l’appel d’exécution | Agrégées dans l’isolat sans repasser par le `LLM` [55] [64] |
| Précision du modèle | Dégradée (`tool confusion`) [62] | Élevée si validée par évaluations [62] | `100 %` sur bancs 40–400 outils [63] | Très élevée sur enchaînements complexes [64] |
| Contraintes d’adoption | Schémas `oneOf` / `allOf` rejetés [65] | Coût de conception de façade [62] | Éviter la redondance avec le harnais [66] | Nécessite isolat `V8` ou microVM sans réseau [64] [66] |

*Tableau 4.2 — Comparaison des approches d’ergonomie sémantique et de passage à l’échelle des outils* `MCP`*.*

### 4.2.4 Double lecture EA / SA

Pour l’`EA`, proscrire la conversion mécanique `Swagger-to-MCP` protège les budgets `FinOps` contre le gonflement des jetons d’entrée et assure que les agents n’interagissent qu’avec des capacités métier homologuées [62] [55]. Pour le `SA`, l’ergonomie `ACI` impose de tester empiriquement chaque outil sur des cas complexes, d’aplatir les contrats JSON, de prévoir la troncature des sorties et de verrouiller cryptographiquement les définitions entre déploiements contre le `Rug Pull` [62] [60] [65].

> **Arbitrage EA / SA** — Interdire en revue d’architecture (`ARB`) la mise en production de convertisseurs `Swagger-to-MCP` exposant directement les routes `CRUD` sans curation [62] [63] [65]. Le `SA` conçoit des façades `ACI` orientées intention dotées de paramètres de pagination/`response_format`, d’`outputSchema` et d’erreurs `isError: true` correctives, tout en confiant le chargement différé au `tool search` client ou à un `Code Mode` confiné à la passerelle [58] [62] [66]. L’`EA` impose le contrôle d’intégrité des descriptions et schémas en intégration continue contre le `Tool Poisoning` et le `Rug Pull` [67] [60].

## 4.3 Architecture des MCP Gateways d’entreprise : médiation REST/gRPC/GraphQL, cache et découverte dynamique

### 4.3.1 Convergence vers la MCP Gateway d’entreprise

Brancher chaque `Agent Harness` directement sur des dizaines de serveurs hétérogènes (`stdio` locaux, services distants, connecteurs tiers) multiplie les angles morts de sécurité et favorise l’apparition de `Shadow MCP Servers` non inventoriés dénoncés par l’`OWASP` [67] [60]. La `MCP Gateway` centralise cette couche verticale du Plan 3 autour de deux familles complémentaires :

- **Les plans de données nativement agentiques (**`AAIF`**)** : écrit en `Rust`, `Agentgateway` fédère dans un unique proxy le routage `HTTP` /`gRPC`, l’aiguillage `LLM` et la médiation `MCP` (`stdio`, `HTTP`, `SSE`, `Streamable HTTP`, traduction `OpenAPI`), avec moteur de politiques `CEL` par outil, limitation de débit et traces `OpenTelemetry` [68] (son versant `A2A` relevant du chapitre 5). De son côté, `Agent Router` (anciennement `Envoy AI Gateway`) s’appuie sur `Envoy` et `Envoy Gateway` via des ressources déclaratives (`AIGatewayRoute`, `AIServiceBackend`) et `ExtProc` sur `gRPC` pour multiplexer les serveurs `MCP` et appliquer des règles `CEL` granulaires [69].
- **Les passerelles d’**`API Management` **et iPaaS étendues** : `Azure API Management` (`APIM`) projette sélectivement des opérations `REST` gérées ou encapsule des serveurs `MCP` externes derrière ses produits et politiques [70]; `Amazon Bedrock AgentCore Gateway` traduit des contrats `OpenAPI 3.0` /`3.1` en outils gouvernés [65]; et `MuleSoft Agent Fabric` (`Omni Gateway` / `MCP Bridge`) expose les actifs `API-led` existants sans réécriture applicative [56].

### 4.3.2 Médiation multiprotocole : REST/OpenAPI, gRPC et GraphQL

La valeur opérationnelle d’une `MCP Gateway` tient à sa capacité de médier les protocoles déjà en place sans imposer de réécrire chaque microservice :

- **Médiation** `REST / OpenAPI` : l’importation déclarative de contrats `OpenAPI 3.0` /`3.1` exige une sélection rigoureuse des opérations, des `operationId` explicites devenant les noms d’outils, des schémas aplatis sans `oneOf` /`anyOf` /`allOf` ni sérialiseurs complexes (`AgentCore`) et le respect du périmètre fonctionnel (`APIM` ne supportant par exemple que les `Tools`, sans `Resources` ni `Prompts`) [70] [65]. Microsoft avertit également d’un écueil d’exploitation critique dans `APIM` : désactiver globalement la journalisation des corps de réponse (`Number of payload bytes to log = 0`), sans quoi les échanges `MCP` peuvent être altérés ou exposés [70].
- **Médiation** `gRPC` : s’appuyant sur des ressources Kubernetes natives telles que `GRPCRoute` dans `Agentgateway`, la passerelle achemine le trafic par nom de service et de méthode `Protobuf` et propage les statuts `grpc-status` [68]. Pour exposer ces services en `MCP`, une couche adaptatrice sur la passerelle projette les contrats sélectionnés vers `JSON Schema 2020-12`, applique des *deadlines* strictes et convertit les traitements progressifs en notifications `notifications/progress` sur `SSE` borné [58].
- **Médiation** `GraphQL` **par requêtes persistées** : exposer l’introspection `GraphQL` ouverte à un `LLM` l’autoriserait à émettre des requêtes imbriquées coûteuses (`N+1`) et à extraire des sous-graphes massifs. L’architecture recommandée par `Apollo GraphQL` (`Apollo MCP Server`) proscrit l’introspection en production et n’expose que des **requêtes persistées** approuvées via un manifeste (`persisted-query-manifest.json`) ou `GraphOS Uplink`, garantissant des sélections de champs strictement minimales et une liste blanche déterministe [71].

Au plan réseau, la passerelle exploite les en-têtes `Mcp-Method`, `Mcp-Name`, `MCP-Protocol-Version` et `Mcp-Param-*` (`x-mcp-header`) pour appliquer routage et quotas avant désérialisation JSON-RPC, tout en relayant `traceparent` dans `_meta` vers `OpenTelemetry` [58] [68] [69]. La figure 4.3 illustre cette topologie C4.

> **[Figure]**
> - MCP Gateway d'entreprise
> - (Agentgateway / Agent
> - Router / APIM)
> - [system]
> - «container» Terminaison Streamable
> - HTTP [POST /mcp + SSE]
> - Routage Mcp-Method,
> - Mcp-Name, en-têtes x-mcp-header
> - «container» Politiques & garde-fous
> - [CEL / Schémas]
> - RBAC par outil, quotas,
> - anti-poisoning
> - «container» Catalogue dynamique
> - [Registry / server.json]
> - Filtrage par portées et
> - ordre déterministe
> - «container» Cache & Code Mode
> - [ttlMs / Isolat V8]
> - Cache lectures et scripts multi-serveurs sans réseau
> - «container» Adaptateurs protocolaires
> - [Médiation aval]
> - OpenAPI 3.x curé, gRPC,
> - Persisted Queries
> - «container» Agent Harness
> - [Client MCP]
> - Tool Search et appels JSON-RPC
> - 2.0
> - «external_system» API REST / OpenAPI
> - Microservices JSON
> - «external_system» Services gRPC
> - Protobuf / GRPCRoute
> - «external_system» Graphe GraphQL
> - GraphOS Persisted Queries
> - «external_system» Télémétrie OTel (ch. 11)
> - Traces _meta.traceparent
> - Valide contrat
> - et droits
> - Résout outils
> - autorisés
> - Médiation si défaut cache
> - Appels MCP [Streamable HTTP]
> - Vérifie cache
> - ou exécute
> - Émet spans
> - OTel
> - Projette [HTTP / JSON]
> - Achemine [gRPC / Protobuf]
> - Exécute [Liste blanche]

*Fig. 15. – Topologie C4 d’une MCP Gateway d’entreprise assurant la médiation REST, gRPC et GraphQL*

### 4.3.3 Découverte dynamique, cache et placement de Code Mode

La passerelle orchestre trois mécanismes transversaux essentiels à l’échelle de l’entreprise. Premièrement, la **découverte dynamique** s’appuie sur le schéma normalisé `server.json` et les espaces de nommage vérifiés par `DNS` du `MCP Registry` officiel [72]. En adossant la passerelle à un sous-registre interne approuvé selon ce format, l’organisation bloque les paquets communautaires non audités (risque de chaîne d’approvisionnement `OWASP`) [72] [67] [60], préfixe automatiquement les noms d’outils pour prévenir les collisions entre serveurs (`search`) [58], filtre `tools/list` selon les droits de la requête et maintient un ordonnancement déterministe favorable au cache de prompt [58].

Deuxièmement, la **mise en cache** combine les indices protocolaires `ttlMs` et `cacheScope` (`"public"` ou `"private"`, exigés sur `server/discover`, `tools/list`, `resources/read` et `prompts/list`, à l’exclusion stricte des états `input_required` et reprises `MRTR`) [58] avec une politique de cache applicatif côté passerelle sur les appels `tools/call` ciblant des outils idempotents annotés `readOnlyHint: true`, amortissant les réessais répétés des boucles d’agents. La clé de cache respecte toujours la méthode et les paramètres discriminants (`uri` sur `resources/read`, `cursor` sur les listes paginées) afin d’éviter toute fuite inter-requêtes [58]. Troisièmement, comme le démontre Speakeasy, la passerelle constitue le point d’ancrage idéal pour `Code Mode` lorsqu’il s’agit de composer des données issues de multiples serveurs `MCP` hétérogènes dans un isolat `V8` sans accès réseau libre : les liaisons typées y agrègent les réponses en mémoire locale sans réintroduire de logique de recherche redondante dans chaque serveur unitaire [64] [66].

### 4.3.4 Double lecture EA / SA

Pour l’`EA`, la `MCP Gateway` met fin aux `Shadow MCP Servers`, impose un catalogue vérifié `server.json` et centralise le contrôle d’accès et la facturation avant même l’intégration complète `OAuth OBO` /`SPIFFE` du chapitre 10 [72] [67] [68]. Pour le `SA`, la discipline consiste à éviter la dérive vers un `ESB` monolithique : la passerelle gère exclusivement transport `Streamable HTTP`, médiation protocolaire, validation de schéma, cache et télémétrie, sans héberger d’orchestration métier complexe [58] [68] [71].

> **Arbitrage EA / SA** — Imposer le passage de tout flux vertical `Agent → Outil` par une `MCP Gateway` gouvernée (`Agentgateway`, `Agent Router`, `APIM` ou équivalent) raccordée à un registre interne calqué sur `server.json` [72] [67] [68] [69] [70]. L’`EA` interdit les connexions directes non inventoriées et impose le blocage de journalisation brute des corps de réponse (`payload bytes = 0`) sur les flux `MCP` [67] [70]. Le `SA` confine la passerelle aux rôles de médiation (`OpenAPI 3.x` curé, `GRPCRoute`, requêtes persistées `GraphQL`), de cache `ttlMs` et d’isolation `Code Mode` multi-serveurs sans logique métier imbriquée [58] [66] [65] [71].

## 4.4 Encapsulation du SI patrimonial : couches anti-corruption devant ERP, CRM et mainframes

### 4.4.1 Vulnérabilité des Systems of Record face aux rafales agentiques

Raccorder des agents autonomes aux systèmes patrimoniaux — progiciels `ERP` (`SAP`, `Oracle`), `CRM` (`Salesforce`) et mainframes `IBM Z` (`CICS`, `IMS`, `Db2`) — soumet ces actifs critiques à trois vulnérabilités structurelles :

1. **Dérive des coûts** `MIPS` **/**`MSU` **et saturation des quotas** : les boucles exploratoires et parallélisations d’agents génèrent des rafales de lectures imprévisibles susceptibles d’épuiser les plafonds journaliers d’`API` `SaaS` ou d’envoler la facturation processeur sur mainframe.

2. **Fuite sémantique des modèles hérités** : exposer directement des schémas alambiqués, des `API` obsolètes ou des interfaces transactionnelles héritées (telles que les transactions `CICS` /`IMS` et schémas `ERP` /`CRM` à centaines d’attributs techniques) contamine la fenêtre contextuelle de l’agent et multiplie les erreurs d’arguments [62] [73] [74] [56].
3. **Connectivité native sans amortisseur transactionnel** : des éditeurs intègrent désormais `MCP` directement dans leurs couches d’accès patrimoniales, à l’image d’`IBM z/OS Connect 3.0.98` (octobre 2025, `APAR PH68103` sur `z/OS 3.2`, `CICS 6.3` et `IMS TMRA` pour `POSIX(OFF)`), qui permet de publier des opérations `API` sur `z/OS` comme outils `MCP` [74]. Or exposer ces points d’accès bruts sans couche tampon priverait le mainframe de protection contre les boucles répétitives et la complexité des modèles hérités [73] [56].

### 4.4.2 Couche anti-corruption (ACL) et déplacement incrémental

La réponse architecturale canonique repose sur le patron `Anti-Corruption Layer` **(**`ACL`**)** défini en *Domain-Driven Design* et documenté par Microsoft [73]. Interposée entre la `MCP Gateway` et chaque `SoR`, l’`ACL` prend la forme d’une **façade** ou d’un **adaptateur** embarquant la logique de traduction bidirectionnelle sans altérer le système patrimonial; son adoption implique néanmoins un surcroît de latence, l’exploitation d’un service supplémentaire, un assainissement strict des entrées aux frontières de confiance et une journalisation structurée corrélée par identifiants de trace [73] :

- **Traduction bidirectionnelle de domaine** : l’`ACL` présente vers `MCP` des outils métier épurés et normalisés, puis convertit en aval vers `SAP` /`ERP`, `Salesforce` (`CRM`), `MuleSoft Omni Gateway` ou les `API` exposées par `IBM z/OS Connect` [73] [74] [56].
- **Traduction des fautes techniques en erreurs** `MCP` **actionnables** : les codes de retour cryptiques ou incidents `SoR` sont interceptés et reformulés en réponses `isError: true` intelligibles par l’agent sans divulguer la topologie interne du patrimoine [58] [73].
- **Coutures de modernisation incrémentale** : suivant les patrons de Martin Fowler (*Patterns of Legacy Displacement*), notamment `Legacy Mimic` et `Event Interception`, l’`ACL` exploite des coutures techniques existantes (files de messages, déclencheurs de base de données, interfaces intermédiaires) pour isoler puis déplacer progressivement les fonctions hors du monolithe sans réécriture risquée [75].

### 4.4.3 Découplage lecture/écriture par CDC (Debezium) et projections CQRS

Pour neutraliser l’impact de charge sur les `SoR`, l’`ACL` applique une séparation stricte de type `CQRS` entre consultations et mutations.

Côté **lectures**, un pipeline de capture par journaux de transactions (`Change Data Capture` **—** `CDC`) tel que `Debezium` (déployé sur `Kafka Connect`, en `Debezium Server` ou opérateur `Kubernetes`) capte en quasi-temps réel les insertions, mises à jour et suppressions directement depuis les journaux des bases supportées (`Db2`, `Oracle`, `PostgreSQL`, `SQL Server`) sans scrutation `SQL` intrusive [75] [76]. Ces flux événementiels (`CloudEvents`, patron `Outbox`) alimentent des **projections de lecture** `CQRS` modernes (indexation rapide, cache distribué à invalidation automatique) dédiées aux outils `readOnlyHint: true` [58] [76]. Les requêtes répétitives des agents n’atteignent plus ni les moteurs transactionnels `ERP` ni les `MIPS` du mainframe.

Côté **écritures**, toute mutation traverse la passerelle bornée de l’`ACL` vers les interfaces transactionnelles officielles (`z/OS Connect`, `MuleSoft`, `ERP`), soumise à trois verrous déterministes : validation des invariants métier en code applicatif, vérification d’une **clé d’idempotence** contre les doubles exécutions lors des réessais `Streamable HTTP`, et lissage de débit protégeant le `SoR`, avec recours à `MRTR` (`input_required`) pour toute opération irréversible exigeant une confirmation [58] [73] [56]. La figure 4.4 et le tableau 4.3 synthétisent ces patrons.

> **[Figure]**
> - Couche Anti-Corruption (ACL) & découplage CQRS
> - [system]
> - «container» Façade sémantique ACL
> - [Traducteur DDD]
> - Convertit modèles, clés
> - et erreurs isError
> - «container» Réplicat de lecture
> - [PostgreSQL / Redis]
> - Absorbe rafales
> - d'exploration
> - «container» Passerelle d'écriture
> - [Idempotence / Limiteur]
> - Lisse les mutations
> - vers les SoR
> - «container» Pipeline CDC asynchrone
> - [Debezium / Kafka]
> - Capture journaux sans scrutation SQL
> - «container» MCP Gateway
> - [Streamable HTTP]
> - Outils métier idempotents
> - «external_system» CRM (Salesforce)
> - System of Record — API / Flows
> - «external_system» ERP (SAP / Oracle)
> - System of Record —
> - Connecteurs / API
> - «external_system» Mainframe IBM Z
> - System of Record — z/OS
> - Connect / CICS / Db2
> - Lectures rapides
> - (readOnlyHint)
> - Appelle outil [JSON-RPC 2.0]
> - Écritures bornées (clé d'idempotence)
> - Mute [API CRM]
> - Mute [REST / iPaaS]
> - Déclenche [z/OS Connect]
> - Journaux Oracle / SQL
> - [CDC]
> - Journaux
> - Db2 [CDC]
> - Projette état quasi-temps réel

*Fig. 16. – Topologie C4 d’encapsulation du SI patrimonial par couche anti-corruption, CDC Debezium et séparation CQRS*

| Système cible | Médiation `MCP` | Maîtrise du contexte et coûts | Régime lectures / écritures | Contre-mesures prioritaires |
| --- | --- | --- | --- | --- |
| `REST / OpenAPI` | `MCP Gateway` (`APIM`, `AgentCore`, `Agentgateway`) [68] [70] [65] | Curation d’`operationId`; schémas sans `oneOf` /`allOf` [65] | Cache `ttlMs` + clés d’idempotence [58] | Proscription `Swagger-to-MCP`; logs payload à `0` [70] |
| Services `gRPC` | `GRPCRoute` et traduction `Protobuf` [68] | Pagination et conversion vers `progress` [58] [68] | Synchrones à *deadlines* strictes | Bornage des flux continus à la passerelle [68] |
| Graphes `GraphQL` | **Requêtes persistées** (`Apollo MCP Server`) [71] | Sélection minimale des champs; zéro introspection [71] | Liste blanche figée au *build* / `GraphOS` [71] | Blocage des requêtes profondes `N+1` [71] |
| `ERP / CRM` (`SAP`, `Salesforce`) | `ACL` + iPaaS (`MuleSoft Omni Gateway`) [73] [56] | Outils métier consolidés masquant schémas `ERP` /`CRM` [62] [73] | Consultations sur réplicat `CDC`; écritures lissées [56] [76] | Protection des quotas API `SaaS` et modèle `DDD` [73] |
| Mainframes `IBM Z` | `z/OS Connect` derrière `MCP Gateway` + `ACL` [73] [74] | Abstraction schémas hérités; retours synthétiques [62] [73] | Lectures `Db2` via `Debezium` `CDC` + `CQRS`; mutations bornées [74] [76] | Maîtrise `MIPS` /`MSU` et zéro branchement direct [73] [76] |

*Tableau 4.3 — Matrice décisionnelle de médiation* `MCP` *et d’encapsulation par famille de système cible.*

### 4.4.4 Double lecture EA / SA

Pour l’`EA`, l’association `ACL + CDC` ouvre le patrimoine aux agents sans compromettre la trajectoire de modernisation par *Legacy Displacement* ni exposer les budgets `MIPS` /`SaaS` aux rafales stochastiques [73] [75]. Pour le `SA`, aucun connecteur natif (`z/OS Connect`, `OData`) ne doit être exposé directement au modèle sans façade traductrice, réplicat de lecture `Debezium` et verrou d’idempotence [73] [74] [76].

> **Arbitrage EA / SA** — Imposer une **Couche Anti-Corruption (**`ACL`**)** et une **séparation** `CQRS` **alimentée par** `CDC` devant tout `ERP`, `CRM` ou mainframe raccordé à la `MCP Gateway` [73] [74] [76]. L’`EA` proscrit les lectures et écritures directes non amorties sur les `SoR` afin de protéger coûts `MIPS` /licences et intégrité comptable [73] [75]. Le `SA` route les outils `readOnlyHint: true` vers des projections `Debezium` à faible latence et encadre chaque mutation par idempotence, lissage de débit et validation `MRTR` lorsque le risque transactionnel l’exige [58] [76].

## Synthèse architecturale du chapitre

L’interopérabilité verticale agent-outil repose sur quatre invariants complémentaires : l’adoption du standard ouvert `MCP` **(**`2026-07-28`**)** sans état sur `Streamable HTTP` et métadonnées `_meta` [58] [57]; la conception d’interfaces `ACI` orientées intention métier, affranchies de l’anti-patron `Swagger-to-MCP` et protégées contre le `Tool Poisoning` [61] [62] [60]; la médiation centralisée via `MCP Gateway` couvrant `OpenAPI`, `gRPC`, requêtes persistées `GraphQL`, registre `server.json`, cache `ttlMs` et `Code Mode` isolé [72] [66] [68] [71]; et l’encapsulation des `SoR` patrimoniaux par `ACL`, `CQRS` et `CDC` **(**`Debezium`**)** [73] [74] [76]. Le chapitre 5 étend désormais cette couche vers la coopération horizontale inter-agents (`A2A` et `AGNTCY`), avant que le chapitre 6 n’organise la mémoire sémantique et que le chapitre 10 ne complète la gouvernance cryptographique des identités (`SPIFFE`, `OAuth OBO`) et des politiques (`OPA` /`Cedar`).

# Chapitre 5 — Interopérabilité horizontale inter-agents et fédération : A2A, AGNTCY et maillage multi-fournisseurs

Le chapitre précédent a établi comment le protocole vertical `MCP` normalise l’accès d’un agent unitaire aux outils et aux `Systems of Record` (`SoR`) d’un domaine. Dès qu’une chaîne de valeur franchit la frontière d’un département, d’une filiale ou d’un partenaire externe, cette intégration verticale atteint sa limite structurelle : un orchestrateur ne peut importer directement les outils bruts, les schémas privés ou les invites d’un système voisin sans briser le cloisonnement organisationnel ni la souveraineté métier [77] [78]. L’interopérabilité horizontale répond à ce basculement en remplaçant l’appel d’outil passif par une délégation contractuelle entre pairs autonomes opaques, portée par des standards ouverts sous la gouvernance neutre de la Linux Foundation et de l’*Agentic AI Foundation* (`AAIF`) [78] [79] [80].

Pour l’architecte d’entreprise (**EA**), l’enjeu consiste à prévenir la reconstitution de silos propriétaires entre agents SaaS achetés et agents assemblés en interne, tout en préservant l’imputabilité, la réversibilité du portefeuille et la maîtrise des coûts inter-domaines [78] [81]. Pour l’architecte de solutions (**SA**), le défi porte sur des contrats asynchrones capables d’absorber les délais variables, les interruptions humaines, la traversée des pare-feu, la diversité des cadriciels et les menaces propres aux échanges inter-agents [82] [83] [84]. Ce chapitre couvre exclusivement les contrats, annuaires, protocoles de session et ponts inter-agents ; les patrons algorithmiques de coordination multi-agents relèvent du chapitre 7.

## 5.1 Frontière décisionnelle entre outil passif (`MCP`) et pair autonome opaque (`A2A`)

### 5.1.1 Orthogonalité des axes vertical et horizontal

Traiter `Model Context Protocol` (`MCP`) et `Agent-to-Agent` (`A2A`) comme des standards concurrents constitue une erreur de conception fréquente. La spécification officielle d’`A2A` établit une complémentarité orthogonale entre deux axes [77]. Sur l’axe vertical, `MCP` confère de la profondeur à un agent individuel en le reliant à ses ressources déterministes, bases de données et fonctions utilitaires [77]. Sur l’axe horizontal, `A2A` donne de la portée au système d’information en permettant à des agents indépendants — relevant d’équipes, de nuages ou d’entreprises distinctes — de se découvrir, de négocier des modalités d’échange et de collaborer sur des tâches complexes en tant que pairs [82] [77].

Dans une topologie de référence, les deux axes s’emboîtent de façon récursive sans exposer les mécanismes internes d’un domaine à l’autre [77] [85]. Un orchestrateur client sollicite un pair spécialiste externe via `A2A` [77] [81]. Ce pair agit comme serveur `A2A` à sa frontière, mais exécute ses opérations métier en invoquant ses propres outils et `SoR` cloisonnés via des clients et passerelles `MCP` privés [77]. Comme le montre le retour d’architecture de Salesforce pour `Agentforce`, brancher directement des dizaines d’outils `MCP` hétérogènes dans un agent central unique sature sa fenêtre contextuelle, dégrade la précision du choix d’outils et crée un couplage inter-domaines rigide [86].

> **[Figure]**
> - Domaine A — Client
> - [system]
> - Frontière inter-domaines
> - [system]
> - Domaine B / SaaS — Pair
> - opaque
> - [system]
> - «container» Agent orchestrateur A
> - [Agent Harness]
> - Planifie et délègue
> - «container» MCP Gateway A
> - [Serveurs MCP]
> - Outils typés sans état
> - «container» SoR Domaine A
> - [ERP / CRM]
> - Données locales
> - «container» Passerelle API / A2A
> - [HTTPS + OAuth 2.0]
> - JWS, portées, quotas et traces
> - «container» Serveur A2A B
> - [AgentCard + Tasks]
> - Boîte noire : prompts et mémoire privés
> - «container» MCP privé B [Outils encapsulés]
> - Invisibles pour A
> - «container» SoR Domaine B
> - [SI partenaire]
> - Autorité cloisonnée
> - Horizontal : Task A2A
> - (HTTPS / JWS)
> - Délégation contrôlée
> - (JSON-RPC / gRPC)
> - Vertical : outils
> - (MCP)
> - Accès (Idempotent)
> - Vertical : outils
> - (MCP privé)
> - Exécution (Domaine B)

*Fig. 17. – Dualité verticale MCP et horizontale A2A entre domaines opaques*

Pour le `SA`, la démarcation entre `MCP` et `A2A` repose sur trois critères observables. Premièrement, l’**autonomie décisionnelle** : un outil `MCP` exécute une primitive bornée sans planification propre, alors qu’un pair `A2A` raisonne, planifie, enchaîne plusieurs outils internes et maintient un état conversationnel multi-tours [82] [77]. Deuxièmement, le **régime temporel** : l’appel d’outil vise un retour bref, tandis qu’une `Task` `A2A` est nativement asynchrone sur des minutes, des heures ou des jours [82] [87]. Troisièmement, l’**isolation contextuelle** : `MCP` injecte les définitions d’outils dans le contexte de l’agent appelant, alors qu’`A2A` préserve le cloisonnement hermétique des invites et de la mémoire du pair appelé [82] [85].

### 5.1.2 Principe d’exécution opaque : propriété intellectuelle et gouvernance

La spécification `A2A` érige l’exécution opaque (*opaque execution*) en principe fondateur [82]. Un client `A2A` collabore avec un serveur distant uniquement au travers des capacités déclarées dans son manifeste public, des messages échangés et des livrables (`Artifacts`) retournés, sans accéder ni à ses instructions internes, ni à ses plans d’exécution, ni à ses outils privés [82] [85]. Ce principe protège la propriété intellectuelle des algorithmes métier, préserve la confidentialité des règles d’arbitrage et réduit la surface d’exposition des `SoR` sous-jacents [85] [78].

Pour l’`EA`, l’opacité contractuelle matérialise le découplage du Plan 3 introduit au chapitre 2. Chaque domaine conserve la pleine gouvernance de ses agents, du choix de ses modèles d’inférence et de ses contrôles d’accès aux données [85]. Une équipe peut remplacer son cadriciel interne sans rompre ses consommateurs tant que le contrat `AgentCard` et le schéma des `Artifacts` restent compatibles [82] [78]. À l’inverse, partager une mémoire vectorielle brute ou exposer directement des outils internes entre domaines ouvre la voie aux mouvements latéraux et à la propagation de données empoisonnées recensés par l’OWASP [84].

### 5.1.3 Arbitrage entre API déterministe, outil `MCP`, ressource hybride et pair `A2A`

Toutes les interactions inter-systèmes ne relèvent pas d’un protocole cognitif. Les guides d’ingénierie de Salesforce et Microsoft convergent sur une règle de parcimonie : lorsque l’échange suit des règles stables, manipule des données structurées et exige un haut débit prévisible, une API REST ou gRPC déterministe surpasse toute médiation agentique en latence et en coût [88] [86].

La documentation officielle d’`A2A` reconnaît toutefois un cas hybride : exposer une compétence d’un serveur `A2A` comme ressource ou outil `MCP` [77]. Ce compromis n’est valide que pour une compétence aux paramètres fermés, exécutable en un tour sans état ni interaction `INPUT_REQUIRED`, et dans une même frontière de confiance [77]. Dès que la tâche exige négociation, authentification secondaire ou suivi progressif, forcer un pair autonome dans un appel d’outil synchrone provoque des expirations et des pertes d’état [77] [87].

| Critère architectural | API déterministe (`REST` / `gRPC`) | Outil passif (`MCP`) | Pair autonome opaque (`A2A`) |
| --- | --- | --- | --- |
| Axe d’intégration | Code à code déterministe | Vertical : agent vers outils locaux | Horizontal : agent vers pair autonome [77] |
| Contrat et découverte | Contrat statique OpenAPI / Protobuf | Schéma `JSON` d’outil injecté dans le prompt [86] | `AgentCard` JSON signée via `.well-known` ou registre [82] |
| Opacité d’exécution | Boîte noire logicielle figée | Schéma explicite d’opération atomique [77] | Boîte noire cognitive : prompts, mémoire et outils masqués [82] |
| État et horizon temporel | Sans état (requête-réponse brève) | Sans état ou session courte [77] | `Task` à états (`contextId` + `taskId`), minutes à jours [82] [87] |
| Modes de livraison | Synchrone ou flux RPC typé | Appel synchrone ou progression courte | Bloquant, flux `SSE` et webhooks déconnectés [82] [87] |
| Gouvernance EA / SA | API Management et SLA technique | `MCP Gateway` avec contrôle de dérive [86] | Signatures `JWS`, mandats inter-domaines et isolement [82] [85] |

*Tableau 5.1 — Matrice décisionnelle comparant l’API déterministe, l’outil passif* `MCP` *et le pair autonome opaque* `A2A`*.*

L’arbre de décision suivant systématise ce tri en quatre paliers avant d’ouvrir une nouvelle interface inter-agents [83] [86].

*Fig. 18. – Arbre de décision entre API déterministe, MCP, A2A sur HTTP et pile fédérée AGNTCY*

> **Arbitrage EA / SA** — Imposer l’opacité inter-domaines comme invariant architectural : interdire à tout agent d’invoquer directement les serveurs `MCP` privés d’un autre domaine ou d’un partenaire externe [77] [85]. L’`EA` confine `MCP` à la profondeur locale de chaque domaine et impose `A2A` pour toute délégation cognitive inter-frontières [77] [78] ; le `SA` n’autorise l’exposition d’une compétence `A2A` en ressource `MCP` que pour des opérations idempotentes à tour unique, tout en maintenant les flux déterministes à haut volume sur des API classiques [77] [86].

## 5.2 Protocole `A2A` : `Agent Cards` signées, cycle de vie asynchrone des `Tasks`, SSE et `Artifacts`

### 5.2.1 Architecture normative en trois couches et liaisons protocolaires

Conçu par Google Cloud puis confié à la Linux Foundation avec le concours de plus de 150 organisations, le protocole `A2A` a atteint la maturité `v1.0.0` et dispose de SDK en Python, JavaScript, Java, Go et .NET [82] [78] [79]. La spécification s’articule en trois couches strictement découplées [82] :

1. **Couche 1 — Modèle de données canonique (**`spec/a2a.proto`**)** : les structures normatives (`Task`, `Message`, `AgentCard`, `Part`, `Artifact`, `Extension`) sont définies en Protocol Buffers pour empêcher toute divergence entre langages [82].
2. **Couche 2 — Opérations abstraites** : onze opérations forment le contrat fonctionnel commun (`SendMessage`, `SendStreamingMessage`, `GetTask`, `ListTasks`, `CancelTask`, `SubscribeToTask`, les quatre opérations sur `TaskPushNotificationConfig` et `GetExtendedAgentCard`) [82].
3. **Couche 3 — Liaisons protocolaires** : les agents exposent ces opérations via `JSON-RPC 2.0` sur HTTP(S), `gRPC` ou `HTTP+JSON/REST`, tout serveur multi-liaisons devant garantir une équivalence sémantique exacte et un mappage uniforme des erreurs (`-32001` à `-32009` en JSON-RPC alignés sur les statuts gRPC et HTTP) [82].

Dans les sérialisations JSON, la version `v1.0.0` prescrit la notation `camelCase` pour les champs (`contextId`, `protocolVersion`, `defaultInputModes`), la convention `ProtoJSON` `SCREAMING_SNAKE_CASE` pour les énumérations (`TASK_STATE_WORKING`, `ROLE_USER`) et le format ISO 8601 UTC (`Z`) pour les horodatages [82]. Les paramètres transverses `A2A-Version` et `A2A-Extensions` voyagent dans les en-têtes HTTP ou métadonnées gRPC plutôt que dans le corps JSON [82]. Pour le `SA`, cette séparation permet aux passerelles réseau d’appliquer routage, limitation de débit et propagation `W3C Trace Context` sans désérialiser les charges utiles applicatives [82] [85].

### 5.2.2 Découverte via `AgentCard`, canonisation `RFC 8785` et signature `JWS`

Tout serveur `A2A` publie son manifeste descriptif `AgentCard`, découvrable via l’URI normalisée `https://{domaine}/.well-known/agent-card.json`, un catalogue central ou une configuration directe [82] [89]. L’`AgentCard` déclare obligatoirement l’identité (`name`, `description`, `version`), la liste ordonnée des interfaces (`supportedInterfaces` précisant URL, `protocolBinding`, `protocolVersion` et `tenant` éventuel), les capacités (`streaming`, `pushNotifications`, `extendedAgentCard`, `extensions`), les types MIME par défaut (`defaultInputModes`, `defaultOutputModes`) et le catalogue de compétences (`skills` de type `AgentSkill`, dotés de `tags` descriptifs) [82].

Pour différencier les droits d’accès selon l’appelant, la carte publique ne divulgue que les schémas d’authentification (`securitySchemes` alignés sur OpenAPI et `securityRequirements`) [82] [85]. Après authentification hors bande (OAuth 2.0 ou OpenID Connect), le client appelle `GetExtendedAgentCard` pour obtenir des compétences réservées ou des quotas dédiés, sans jamais exposer d’URL internes ni de secrets [82]. Côté trafic réseau, serveurs et clients doivent exploiter la mise en cache HTTP (`RFC 9111`) via `Cache-Control`, `ETag` et `If-None-Match` [82].

Pour bloquer l’usurpation de manifestes et le détournement d’endpoints (`OWASP ASI07`) [84], la spécification `v1.0.0` formalise la signature cryptographique de l’`AgentCard` dans le champ `signatures` (`AgentCardSignature`) au format *JSON Web Signature* (`JWS`, `RFC 7515`) [82]. La vérification obéit à une séquence déterministe stricte [82] :

1. **Normalisation des champs et exclusion de** `signatures` : les champs `optional` non renseignés et les valeurs par défaut implicites sont omis (tout en conservant les champs `REQUIRED` et les champs `optional` explicitement définis), puis le tableau `signatures` est retiré avant signature [82].
2. **Canonisation déterministe (**`JCS`**,** `RFC 8785`**)** : l’objet JSON épuré est trié lexicographiquement par clé et débarrassé de tout espace superflu afin d’assurer un condensat reproductible entre langages [82].
3. **Vérification via en-tête protégé et** `JWKS` : l’en-tête JWS protégé déclare `alg` (par exemple `ES256` ou `RS256`), `typ` (`JOSE`) et `kid` (ainsi que `jku` en HTTPS vers le jeu de clés publiques), ce qui autorise la coexistence de plusieurs signatures durant une rotation de clés [82].

Pour l’`EA`, la validation JWS conditionne toute approbation d’agents découverts via un annuaire partagé : le seul certificat TLS du domaine hôte ne prémunit pas contre la falsification d’une fiche mise en cache chez un courtier tiers [82] [84].

### 5.2.3 Cycle de vie asynchrone des `Tasks`, états interrompus et reprise multi-tours

Dans `A2A`, l’unité de travail persistante est la `Task`, identifiée par un `id` serveur et regroupée par un `contextId` partagé sur toute une conversation collaborative [82] [87]. Si une requête triviale peut recevoir un simple `Message` direct, toute opération multi-étapes produit une `Task` régie par un automate à neuf états (`TaskState`) [82] :

- **États actifs** : `TASK_STATE_SUBMITTED` et `TASK_STATE_WORKING` [82].

- **États interrompus** : `TASK_STATE_INPUT_REQUIRED` (attente d’une information complémentaire ou d’une validation humaine) et `TASK_STATE_AUTH_REQUIRED` (suspension jusqu’à obtention hors bande d’une accréditation secondaire pour un outil ou service aval) [82] [85].
- **États terminaux immuables** : `TASK_STATE_COMPLETED`, `TASK_STATE_FAILED`, `TASK_STATE_CANCELED` et `TASK_STATE_REJECTED` (ainsi que `TASK_STATE_UNSPECIFIED`) [82].

Dès qu’une `Task` atteint un état terminal, elle devient immuable : tout message envoyé vers son `taskId` échoue avec `UnsupportedOperationError` (`-32004`) [82] [90]. Un nouveau tour dans la même session doit créer une nouvelle `Task` liée par le même `contextId` et, au besoin, `referenceTaskIds` [82] [90]. Pour éviter la surcharge mémoire et réseau lors du suivi de longues sessions, `GetTask` et `ListTasks` supportent le plafonnement d’historique (`historyLength`), la pagination par curseur (`pageToken` /`nextPageToken`) triée par dernière mise à jour décroissante, et l’exclusion par défaut des livrables (`includeArtifacts: false`) [82].

> **[Figure]**
> - Client A2A (Domaine A)
> - Endpoint Well-Known / JWKS
> - Serveur A2A
> - (Pair B)
> - Récepteur Webhook
> - (Domaine A)
> - Client A2A (Domaine A)
> - Endpoint Well-Known / JWKS
> - Serveur A2A
> - (Pair B)
> - Récepteur Webhook
> - (Domaine A)
> - 1. Découverte et vérification cryptographique (RFC 8785 + RFC 7515)
> - 1 GET /.well-known/agent-card.json
> - 2 AgentCard JSON + signatures[] (JWS ES256)
> - 3 GET jwks.json (clé publique selon kid)
> - 4 JWKS (vérification JCS RFC 8785 + JWS)
> - 2. Cycle asynchrone SSE et interruption multi-tours
> - 5 SendStreamingMessage (Authorization: Bearer, contextId)
> - 6 HTTP 200 text/event-stream : Task (SUBMITTED)
> - 7 TaskStatusUpdateEvent (TASK_STATE_WORKING)
> - 8 TaskStatusUpdateEvent (INPUT_REQUIRED) + Artifact Interrupt
> - Le flux SSE se ferme sur état interrompu. Validation ou précision requise.
> - 9 SendMessage (taskId, contextId, DataPart resume)
> - 10 TaskArtifactUpdateEvent (append: true, lastChunk: true)
> - 1 1 TaskStatusUpdateEvent (TASK_STATE_COMPLETED)
> - 3. Tâche longue en mode déconnecté (Push Notification)
> - 12 SendMessage (returnImmediately: true, TaskPushNotificationConfig)
> - 13 Task (TASK_STATE_WORKING, taskId)
> - Traitement autonome différé (minutes ou heures)
> - 14 HTTP POST webhook URL (Bearer token, StreamResponse)
> - 15 HTTP 200 OK (traitement idempotent)
> - 16 GetTask (id: taskId)
> - 17 Task (TASK_STATE_COMPLETED + Artifacts finaux)

*Fig. 19. – Séquence protocolaire A2A v1.0 : AgentCard signée, SSE, interruption et webhook*

### 5.2.4 Livraison asynchrone : flux `SSE`, webhooks et structure multimodale des `Artifacts`

La spécification `A2A` couvre trois régimes temporels via le champ `returnImmediately`, les flux continus et les webhooks [82] [87]. Par défaut (`returnImmediately: false`), `SendMessage` bloque jusqu’à un état terminal ou interrompu ; à `true`, il retourne aussitôt la `Task` active, déléguant le suivi au client [82].

Sur des durées interactives, `SendStreamingMessage` ouvre un flux *Server-Sent Events* (`text/event-stream`) qui émet d’abord l’objet `Task` initial, puis une série de `StreamResponse` alternant `TaskStatusUpdateEvent` et `TaskArtifactUpdateEvent` [82] [87]. Chaque `Artifact` agrège un ou plusieurs objets `Part` mutuellement exclusifs (`oneOf` : `text`, `raw` en octets Base64, `url` de fichier ou `data` JSON structuré) typés par `mediaType` MIME [82]. L’assemblage incrémental des livrables volumineux s’appuie sur les indicateurs `append` et `lastChunk` [82] [87]. En cas de rupture réseau avant un état terminal ou interrompu, `SubscribeToTask` rétablit le flux en commençant impérativement par l’état courant complet de la `Task` afin d’éliminer toute perte d’événement entre interrogation et réabonnement [82].

Lorsque les délais atteignent plusieurs heures ou impliquent des clients sans serveur persistant, le client fournit une `TaskPushNotificationConfig` (URL HTTPS, jeton unique et schéma `AuthenticationInfo`) [82] [87]. Comme le serveur `A2A` initie alors des requêtes HTTP `POST` sortantes, la section 13.2 impose une protection stricte contre la falsification de requête côté serveur (`SSRF`) : rejet des réseaux privés (`127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), de `localhost` et des adresses de lien local, listes blanches de domaines, délais d’attente de 10 à 30 secondes et tentatives à backoff exponentiel [82] [87]. Le récepteur webhook doit pour sa part valider les identifiants, vérifier la correspondance du `taskId`, traiter les notifications de manière idempotente et récupérer les livrables via `GetTask` [82] [87].

> **Arbitrage EA / SA** — Proscrire tout appel `SendMessage` bloquant au-delà de quelques secondes depuis le `SoE` et exiger la signature JWS (`RFC 7515` + `RFC 8785`) sur toute `AgentCard` exposée hors d’une enclave privée [82] [87]. Le `SA` sélectionne `SendStreamingMessage` (`SSE` + `SubscribeToTask`) pour les dialogues interactifs et `returnImmediately: true` avec webhooks `TaskPushNotificationConfig` durcis anti-SSRF pour les traitements différés [82] [87] ; l’`EA` vérifie que `ListTasks` applique un cloisonnement strict par locataire (`tenant`) et que toute autorisation ou refus d’accès reste auditable [82] [85].

## 5.3 Infrastructure fédérée `AGNTCY` : schémas `OASF`, `Agent Directory Service` et messagerie `SLIM` /`MLS`

### 5.3.1 Limites d’un maillage `A2A` purement HTTP à l’échelle fédérée

À l’échelle d’une fédération multi-organisations ou d’essaims dynamiques d’agents, le recours exclusif à `A2A` sur HTTP/HTTPS rencontre trois limites structurelles [91] [92] [83] :

1. **Absence de requête sémantique multi-critères** : l’accès à `/.well-known/agent-card.json` suppose de connaître le domaine cible et ne permet pas d’interroger un annuaire distribué par intersection de compétences, de domaines réglementaires et de traits techniques [91].
2. **Contrainte d’exposition entrante (**`NAT` **/ pare-feu)** : HTTP et gRPC classiques attendent un point d’écoute joignable par le client, compliquant le déploiement d’agents derrière des pare-feu d’entreprise ou en périphérie sans tunnel sur mesure [92] [83].

3. **Chiffrement saut-par-saut et absence de groupe dynamique** : `TLS` se termine aux répartiteurs et passerelles intermédiaires qui accèdent aux charges en clair, et le chiffrement point-à-point ne passe pas à l’échelle pour des groupes multi-agents dynamiques [92] [83] [93].

Versé à la Linux Foundation après son lancement par Cisco Outshift, l’écosystème `AGNTCY` fournit ces trois briques complémentaires — schéma fédéré, annuaire décentralisé et plan de messagerie chiffré — compatibles aussi bien avec `A2A` qu’avec `MCP` [78] [94] [91] [95].

### 5.3.2 Modélisation unifiée par schémas `OASF`

L’*Open Agentic Schema Framework* (`OASF`), dérivé de l’*Open Cybersecurity Schema Framework* (`OCSF`), définit l’objet `record` comme représentation normalisée et extensible d’un agent [94]. Là où les `tags` d’une `AgentSkill` `A2A` demeurent des chaînes libres [82], `OASF` structure la description autour de trois axes taxonomiques typés [94] [91] :

- **Compétences (**`skills`**)** : chemins hiérarchiques pointés (comme `nlp.summarization.abstractive`) à profondeur bornée (`≤ 4`) et versionnement sémantique monotone afin de maîtriser la complexité d’indexation [91].
- **Domaines (**`domains`**)** : contexte métier, linguistique ou réglementaire (tel que `healthcare` ou `finance.retail`) [91].
- **Modules et traits (**`modules` **/** `features`**)** : extensions plates et descripteurs protocolaires (`A2A`, `MCP`, signaux d’évaluation), identifiés par un triplet unique `(namespace, name, version)` pour éviter toute collision entre extensions privées d’entreprise validées sur un serveur `OASF` dédié [94] [91].

Pour l’`EA`, `OASF` devient le pivot sémantique du registre de portefeuille : un seul modèle de fiche indexe des agents issus de plusieurs éditeurs sans dépendre de leurs métadonnées propriétaires [94] [91].

### 5.3.3 Annuaire fédéré `ADS` : stockage `OCI` /`ORAS`, `Kademlia DHT` et provenance `Sigstore`

L’*Agent Directory Service* (`ADS`, dépôt `agntcy/dir`) opérationnalise `OASF` sous forme d’un annuaire distribué qui dissocie l’indexation des capacités de la localisation physique par un mappage à deux niveaux [91]. Le premier niveau associe les attributs taxonomiques à des identifiants de contenu immuables (`CID` calculés en `SHA-256`) ; le second niveau associe chaque `CID` aux registres hébergeant l’artefact [91]. Toute recherche multi-axes doit comporter au moins une compétence (`skill`) afin de préserver la localité d’index et d’éviter l’explosion combinatoire [91].

Sur le plan du stockage et de la sécurité de chaîne d’approvisionnement, `ADS` réutilise l’infrastructure mature des registres `OCI` (tels que *Zot*) et d’`ORAS` sur stockage objet (`S3`, `GCS`, `Azure Blob`) [91]. Les fiches `OASF` sont stockées comme manifestes `OCI` immuables, auxquels les signatures cryptographiques, jeux d’évaluation et graphes de composition se rattachent en tant que référents `OCI` sans altérer le condensat initial [91]. La provenance s’appuie sur `Sigstore` sans nécessiter de tiers de confiance central, tandis que la fédération inter-organisations repose sur une table de hachage distribuée `Kademlia` (`DHT`) offrant trois stratégies de réplication : tirage à la demande (*On-Demand Cross-Pull*), réplication sélective et ancrage stratégique multi-juridictionnel [91].

> **[Figure]**
> - Découverte fédérée (OASF
> - + ADS)
> - [system]
> - Transport et session (SLIM
> - + MLS RFC 9420)
> - [system]
> - «container» Annuaire Kademlia DHT
> - [ADS (agntcy/dir)]
> - Index 2 niveaux : Skill -> CID -> Pair
> - «container» Registre OCI / ORAS
> - [SHA-256 + Sigstore]
> - Records immuables
> - et référents signés
> - «container» Descripteur OASF
> - [Schema Record]
> - Skills, domaines, locators A2A/MCP
> - «container» Endpoint Agent A
> - [SLIM SDK + SPIRE]
> - Derrière NAT, session MLS E2E
> - «container» Nœuds Data Plane SLIM
> - [gRPC HTTP/2 / WS]
> - Routage hiérarchique
> - org/ns/svc/<id>
> - «container» Endpoint Pair B
> - [SLIM SDK + SPIRE]
> - Déchiffrement E2E, SLIMRPC ou A2A/MCP
> - «container» SLIM Control Plane [Controller & Channel Mgr]
> - Tables de routage et
> - groupes MLS
> - Annonce Skill -> CID Publie et signe
> - Connexion sortante
> - TLS / HTTP/2
> - Relais chiffré MLS (RFC 9420)
> - Requête multi-axes Tire OASF + Sigstore
> - Configure routes
> - et adhésions

*Fig. 20. – Architecture fédérée AGNTCY : enregistrement OASF/ADS et session chiffrée SLIM/MLS*

### 5.3.4 Transport `SLIM`, nommage hiérarchique et chiffrement de groupe `MLS` (`RFC 9420`)

Le protocole `SLIM` (*Secure Low-Latency Interactive Messaging*, spécifié dans `draft-mpsb-agntcy-slim-03`) complète `ADS` par un plan de données et une couche de session pair-à-pair conçus pour transporter `A2A`, `MCP` et `ACP` [92] [95]. Ses nœuds de routage en Rust acheminent des enveloppes `Protocol Buffers` sur `gRPC` streaming `HTTP/2` ou `WebSocket` selon un modèle d’enregistrement par connexion sortante : seuls les routeurs doivent être joignables sur le réseau, permettant aux agents privés derrière `NAT` ou pare-feu de communiquer dans les deux sens sans exposer de port entrant [92] [83].

Les agents y sont adressés par noms hiérarchiques `organization/namespace/service/<id>`, où le préfixe pilote les tables d’acheminement (`FIB` en `anycast` ou `unicast`) et le suffixe dérive de l’identité cryptographique (`SPIRE` ou `DID`) [92] [95]. `SLIM` supporte quatre motifs natifs : point-à-point, groupe/multidiffusion, `SLIMRPC` point-à-point et `SLIMRPC` multicast [92] [95]. Pour la confidentialité de bout en bout, la couche session intègre de manière optionnelle *Messaging Layer Security* (`MLS`, `RFC 9420`), qui gère des clés de groupe sur arbres de cliquet (*ratcheting trees*) via les primitives `KeyPackage`, `Proposal` et `Commit` en coût logarithmique `O(log N)`, assurant confidentialité persistante (`FS`) et sécurité post-compromission (`PCS`) de deux à plusieurs milliers de participants [95] [93].

Le document IETF `draft-mpsb-agntcy-messaging-03` met toutefois en garde le `SA` contre deux pièges d’architecture [83]. D’abord, la fiabilité configurable de `SLIM` ne garantit pas un traitement *exactly-once* applicatif, rendant l’idempotence indispensable [83]. Ensuite, lorsque `MLS` chiffre la charge utile de bout en bout, les routeurs et passerelles intermédiaires ne voient que les métadonnées de routage [95] [83]. L’inspection de contenu en ligne (masquage de renseignements personnels ou garde-fous sémantiques sur une *Agent Gateway*) ne peut alors plus opérer sur un simple relais réseau : elle doit résider aux extrémités avant chiffrement et après déchiffrement, ou bien la passerelle doit être admise comme participant explicite du groupe `MLS`, ce qui déplace explicitement la frontière de confiance [83]. De même, la révocation d’un identifiant dans un annuaire d’identité n’expulse pas d’elle-même un pair d’une époque `MLS` en cours sans transaction `Commit` explicite [83].

| Dimension technique | `A2A` sur `HTTP` / `gRPC` | Courtiers (`AMQP`, `Kafka`, `NATS`) | `AGNTCY SLIM` + `MLS` (`RFC 9420`) |
| --- | --- | --- | --- |
| Adressage | URI HTTPS ou `gRPC` par endpoint | Files, partitions ou sujets de courtier [83] | Nom hiérarchique `org/ns/svc/<id>` (unicast / anycast) [92] [95] |
| Traversée `NAT` / pare-feu | Requiert passerelle ou reverse-proxy exposé | Enregistrement sortant vers courtier (ou feuilles `NATS`) [83] | Connexion sortante `gRPC HTTP/2` ou `WebSocket` [92] [83] |
| Confidentialité réseau | `TLS` saut-par-saut (terminaison au proxy) [85] [83] | `TLS` saut-par-saut ; courtier voit les messages [92] [83] | Chiffrement E2E `MLS` ; routeurs aveugles au contenu [95] [83] |
| Groupes dynamiques | Aucun canal multicast natif (`A2A` = 1:1) | Fan-out par sujet ; pas de `PCS` en `O(log N)` [92] [83] | Groupes `MLS` (`FS`, `PCS`) et `SLIMRPC` multicast [92] [93] |
| Inspection en ligne (*Gateway*) | Directe à la terminaison `TLS` [83] | Proxy protocolaire ou adaptateur producteur/consommateur [83] | Aux extrémités ou passerelle membre `MLS` [83] |
| Usage privilégié | Appels B2B standards et intégration SaaS [82] [78] | Bus d’événements et télémétrie interne [83] | Maillages sensibles multi-org, périphérie et groupes [92] [95] |

*Tableau 5.2 — Comparaison architecturale des substrats de transport et de session pour l’interopérabilité inter-agents.*

> **Arbitrage EA / SA** — Déployer `AGNTCY` de manière incrémentale plutôt que dogmatique [94] [91] [83]. L’`EA` adopte dès le départ les schémas `OASF` dans son catalogue interne pour unifier la taxonomie des capacités et exige une provenance signée (`JWS` ou `Sigstore` via `ADS`) lors des échanges inter-organisations [82] [91] ; le `SA` réserve `SLIM` /`MLS` aux topologies nécessitant traversée de pare-feu sans exposition entrante, chiffrement bout en bout face à des relais tiers ou sessions de groupe dynamiques, tout en plaçant les contrôles `PII` dans l’enclave d’extrémité avant chiffrement `MLS` [92] [83].

## 5.4 Ponts inter-cadriciels (`LangGraph`, `Semantic Kernel`, `AutoGen`) et fédération B2B avec agents SaaS tiers

### 5.4.1 Convergence des cadriciels applicatifs derrière le contrat `A2A`

Dans les grandes organisations, les agents internes cohabitent sur des cadriciels hétérogènes choisis par affinité métier ou linguistique [78] [90] [96]. Le protocole `A2A v1.0` sert de contrat d’abstraction commun permettant à ces piles de coopérer sans exposer leurs graphes d’exécution ni coupler leurs cycles de mise à jour [82] [78].

- Côté `LangGraph`, l’*Agent Server* expose nativement tout assistant sous `/a2a/{assistant_id}` et génère sa carte à `/.well-known/agent-card.json?assistant_id={assistant_id}` [90]. Il illustre la mécanique exacte d’un pont protocolaire : prise en charge de la liaison `JSON-RPC` `v1.0` et des quatre méthodes `v0.3` (`message/send`, `message/stream`, `tasks/get`, `tasks/cancel`), mappage direct du `contextId` vers le `thread_id` `LangGraph` pour corréler les traces dans `LangSmith`, et extension `history-scope/v1` (`historyScope: "task"` ou en-tête `LangGraph-A2A-History-Scope`, avec plafond `historyLength ≤ 10` hors streaming SSE) évitant le rejeu redondant de l’historique multi-tâches [90]. Sur les flux humains, tout appel à `interrupt()` fait basculer la tâche vers `TASK_STATE_INPUT_REQUIRED` avec un `Artifact` nommé `Interrupt` portant `id`, `value` et `response_schema` dans une `DataPart`, la reprise s’effectuant par envoi d’une `DataPart` `{"data": {"resume": — }}` sur les mêmes `taskId` et `contextId` [90].

Dans l’écosystème Microsoft, les équipes à l’origine de `Semantic Kernel` (gestion de session, middleware, télémétrie) et d’`AutoGen` (abstractions multi-agents orientées événements) ont unifié les deux piles au sein du **Microsoft Agent Framework** (disponible en .NET, Python et Go) [88]. Côté consommation, le module `A2AAgent` (`Microsoft.Agents.AI.A2A`) encapsule tout pair `A2A` découvert par `A2ACardResolver`, catalogue ou client direct (`A2AClient`, `A2AHttpJsonClient`, `A2AGrpcClient`) derrière l’interface uniforme `AIAgent` (`RunAsync`, `RunStreamingAsync`, `AgentSession`) en négociant la liaison via `PreferredBindings` [89].

Dans le nuage AWS, **Amazon Bedrock AgentCore Runtime** héberge des agents `Strands` ou `LangGraph` encapsulés avec `a2a-sdk` dans des microVM isolées sur le port `9000` (chemin `/`), en assurant le passage transparent des charges `JSON-RPC` et de `/.well-known/agent-card.json` tout en appliquant `SigV4` ou `JWT` `OAuth 2.0` /`OIDC` (Cognito, Okta) et la télémétrie `OpenTelemetry` [96].

| Plateforme ou cadriciel | Exposition et découverte `A2A` | Liaisons et versions | Correspondance d’état et `HITL` | Contrôle de frontière notable |
| --- | --- | --- | --- | --- |
| `LangGraph` / `Agent Server` | `/a2a/{assistant_id}` et `/.well-known/agent-card.json? assistant_id=...` [90] | `JSON-RPC` `v1.0` et 4 méthodes `v0.3` (`gRPC` et `REST` absents) [90] | `contextId` → `thread_id` ; `interrupt()` → `INPUT_REQUIRED` + `DataPart` `resume` [90] | Extension `historyScope`, `historyLength ≤ 10`, SSE sans filtre d’historique [90] |
| `Microsoft Agent Framework` (`SK` + `AutoGen`) | `A2ACardResolver` (`.well-known`), catalogue ou client direct ; hébergement `A2A` [88] [89] | `JSONRPC`, `HTTP+JSON` et `gRPC` (`A2A.Grpc`), choix via `PreferredBindings` [89] | `AgentSession` persistée derrière `AIAgent` (`RunAsync`) [88] [89] | Validation obligatoire des réponses distantes comme entrées non fiables [89] |
| `Amazon Bedrock AgentCore Runtime` | Port `9000` (`/`), `/.well-known/agent-card.json`, relais `JSON-RPC` transparent [96] | `JSON-RPC` sur HTTP avec streaming (`a2a-sdk`, exécuteur `Strands` A2A) [96] | Isolation microVM avec fabrique d’agent par `context_id` [96] | Authentification `SigV4` ou `JWT` `OIDC` (`CUSTOM_JWT`) et en-têtes filtrés [96] |
| `Salesforce Agentforce` | `Agent Card` (contribuée à `A2A`) et écosystème `Agentforce` [86] [81] | `A2A` sur HTTPS avec négociation de version et OAuth 2.0 [86] [81] | Continuité par identifiant de conversation et *Trust Score* [81] | Suspension auto d’outils `MCP` si dérive ; tri API vs MCP vs A2A [86] |
| Plateformes partenaires (`ServiceNow`, `SAP`, `Foundry`) | Adoptants fondateurs d’`A2A` pour interopérabilité inter-nuages et SaaS [78] | `A2A` standardisé entre contrôleurs métier et agents externes [78] | Délégation asynchrone multi-éditeurs sans partage de mémoire [78] | Authentification HTTP, portées par compétence et API Management [85] [78] |

*Tableau 5.3 — Matrice d’interopérabilité contractuelle des principaux cadriciels, environnements infonuagiques et plateformes SaaS B2B.*

### 5.4.2 Fédération B2B avec agents SaaS tiers et mandats transactionnels

Sur le plan métier, `A2A` autorise la fédération B2B directe entre agents internes et agents SaaS d’éditeurs (`Salesforce Agentforce`, `ServiceNow`, `SAP`, `Microsoft Copilot Studio`) sans centralisation préalable des données [78] [86] [81]. Dans le scénario B2B documenté par Salesforce, l’agent de service après-vente d’un détaillant délègue l’inspection technique de dommages à l’agent spécialiste d’un manufacturier tout en vérifiant les conditions de retour auprès de l’agent du transporteur [81]. Chaque entreprise demeure souveraine de ses `SoR`, de ses barèmes et de ses données sensibles [85] [81].

Trois mécanismes complètent l’accord contractuel en contexte B2B. Premièrement, l’évaluation préalable de la fiabilité des pairs au moyen de métadonnées de conformité et d’un indice de confiance (*Agent Trust Score*) [91] [81]. Deuxièmement, le cloisonnement multi-locataires (`tenant` sur `AgentInterface` et portées OAuth par `AgentSkill`), dont les mécanismes cryptographiques `SPIFFE` /`SPIRE` et `OAuth 2.0 On-Behalf-Of` sont traités au chapitre 10 [82] [85]. Troisièmement, lorsque la collaboration engage un acte financier, l’extension *Agent Payments Protocol* (`AP2`), appuyée par plus de 60 organisations, attache aux échanges une preuve cryptographique du consentement utilisateur [78].

### 5.4.3 Menaces propres au maillage inter-agents (`OWASP ASI07` / `ASI08`) et clauses `FinOps`

La fédération inter-agents déplace deux risques critiques de l’*OWASP Top 10 for Agentic AI* sur la couche d’interopérabilité [84] :

- `ASI07` **— Communication inter-agents non sécurisée** : des canaux dépourvus d’authentification mutuelle, de signatures ou de validation stricte exposent les workflows à l’usurpation d’identité, au rejeu, à la rétrogradation de protocole (forçage vers une version dépourvue de contrôles) et à l’interception agent-du-milieu [84]. La parade combine `TLS 1.2/1.3` avec `HSTS`, validation obligatoire des signatures `JWS` ou `Sigstore`, et traitement de toute sortie distante comme une entrée applicative non fiable [82] [89] [84].
- `ASI08` **— Défaillances en cascade entre agents** : lorsqu’un agent consomme sans vérification les `Artifacts` produits par un pair amont, une faute logique, une boucle récursive ou une donnée empoisonnée s’amplifie sur toute la chaîne fédérée [84]. Le `SA` impose donc la validation `JSON Schema` sur chaque `DataPart` reçue, une borne explicite sur la profondeur de délégation inter-agents et des coupe-circuits par compétence [82] [84].

Enfin, sur le plan `FinOps`, déléguer une `Task` ouverte à un agent SaaS externe facturé à la tâche ou à l’usage expose le client à un risque de dérive budgétaire si le pair distant s’enferme dans des boucles d’outils internes opaques. L’`EA` doit donc exiger contractuellement l’annonce de plafonds de ressources par tâche, le maintien d’un droit d’interruption effectif via `CancelTask`, la propagation des identifiants `W3C Trace Context` pour l’imputation des coûts et une clause de réversibilité fondée sur les schémas ouverts `A2A` et `OASF` [82] [85] [78] [94].

> **Arbitrage EA / SA** — Exiger que toute fédération avec un agent SaaS tiers ou un cadriciel distinct transite exclusivement par des contrats `A2A v1.0` derrière une passerelle gouvernée, et traiter chaque `Message` ou `Artifact` retourné comme une entrée non fiable [82] [89] [84]. Le `SA` restreint les extensions autorisées (`capabilities.extensions`), valide chaque `DataPart` par schéma typé, borne la profondeur de délégation et applique le routage par `tenant` pour contenir `ASI07` et `ASI08` [82] [90] [84] ; l’`EA` conditionne l’homologation d’un pair externe à la signature de son `AgentCard`, au support effectif de `CancelTask` sous plafond `FinOps` et au référencement dans le catalogue `OASF` interne pour préserver la substituabilité des fournisseurs [82] [78] [94].

## Synthèse architecturale et transition

L’interopérabilité horizontale parachève le modèle d’outillage vertical : `MCP` apporte la profondeur locale sur les outils d’un domaine, tandis qu’`A2A` confère la portée inter-domaines entre pairs autonomes opaques [77]. Grâce au modèle `Protobuf` unique, aux `AgentCard` signées en `JWS` après canonisation `RFC 8785`, aux états asynchrones des `Tasks` (`SSE`, `INPUT_REQUIRED`, `AUTH_REQUIRED` et webhooks durcis anti-SSRF), `A2A v1.0` réunit `LangGraph`, le `Microsoft Agent Framework`, `Amazon Bedrock AgentCore` et les agents SaaS d’entreprise derrière un contrat stable [82] [78] [90] [89] [96]. Lorsque le maillage requiert une recherche sémantique fédérée et un chiffrement de bout en bout insensible aux relais réseau ou aux pare-feu, `AGNTCY` (`OASF`, `ADS` sur `OCI` /`Kademlia` /`Sigstore` et `SLIM` /`MLS`) complète la pile protocolaire [91] [92] [95] [93].

Standardiser la découverte et l’échange de tâches ne règle cependant ni la souveraineté des connaissances partagées ni les algorithmes qui coordonnent plusieurs pairs. Le chapitre 6 traite de l’ingénierie du contexte, de la mémoire distribuée et de la souveraineté sémantique des données, avant que le chapitre 7 ne formalise les patrons d’orchestration multi-agents qui exploitent ces contrats horizontaux.

# Chapitre 6 — Ingénierie du contexte, mémoire distribuée et souveraineté sémantique des données

L’interopérabilité verticale avec les outils via `MCP` (chapitre 04) et l’interopérabilité horizontale entre pairs autonomes via `A2A` et `AGNTCY` (chapitre 05) restent inopérantes si chaque agent aborde ses tâches sans continuité cognitive ou interprète les données métier selon des hypothèses improvisées. Un `System of Agency` fiable ne dépend pas seulement de son modèle d’inférence ou de ses connecteurs, mais de la pertinence, de la fraîcheur et de la gouvernance des jetons placés dans sa fenêtre contextuelle à chaque tour [97] [98]. En pratique, nombre d’erreurs imputées au modèle résultent d’un déficit d’architecture contextuelle : fragments documentaires privés de leur contexte parent [99], indicateurs financiers recalculés de manière divergente sur des tables brutes [100] [101], ou souvenirs d’interactions antérieures corrompus déviant les décisions ultérieures [102] [103].

Ce chapitre couvre la dimension mémoire et sémantique du Plan 3 d’interopérabilité (chapitre 02). Côté architecture de solutions (`SA`), il s’agit de structurer la mémoire distribuée sous contrainte d’attention finie, de dépasser le `RAG` naïf par des pipelines fédérés hybrides, structurés et graphiques, et de propager les droits d’accès jusqu’au stockage [98] [104] [105]. Côté architecture d’entreprise (`EA`), il s’agit d’empêcher la formation d’un système parallèle de bases vectorielles et de formules métier concurrentes, en arrimant les agents aux contrats de données, aux couches sémantiques, au `MDM` et aux ontologies d’entreprise [100] [101] [106]. Par frontière d’étanchéité, ce chapitre porte uniquement sur la mémoire cognitive et les connaissances métier ; la persistance transactionnelle des workflows (*checkpointing* et rejeu) relève du chapitre 09.

## 6.1 Taxonomie des quatre mémoires d’entreprise : travail, épisodique, sémantique et procédurale

### 6.1.1 De l’amorce statique à l’ingénierie du contexte : budget d’attention et dégradation

À l’origine des applications génératives, l’ingénierie des amorces (*prompt engineering*) visait à rédiger des consignes statiques pour des requêtes isolées de classification ou de synthèse [98]. Dès qu’un agent opère en boucle multi-tours sur une durée prolongée, chaque appel d’outil, chaque passage récupéré et chaque observation s’ajoutent à l’historique d’inférence [98] [107]. L’ingénierie du contexte (*context engineering*) devient alors la discipline itérative qui sélectionne, compresse, ordonne et évince l’ensemble des jetons fournis au modèle à chaque étape afin de guider son comportement [98].

Cette exigence découle de la mécanique même des transformeurs : chaque jeton établit des relations d’attention avec tous les autres, engendrant `O(n²)` interactions appariées pour une fenêtre de `n` jetons [98] [107]. Bien que la taille nominale des fenêtres s’étende désormais à plusieurs centaines de milliers de jetons, les bancs d’essai de rappel ciblé (*needle-in-a-haystack*) révèlent une dégradation progressive nommée pourrissement du contexte (*context rot*) : à mesure que le volume de jetons croît, la précision du modèle pour retrouver un fait précis ou suivre des dépendances de longue portée décroît [98]. Le contexte actif constitue donc une ressource finie à rendements décroissants, grevée par un budget d’attention limité [98]. Pour le `SA`, élargir passivement la fenêtre d’inférence dégrade à la fois la qualité de raisonnement, la latence de pré-remplissage et le coût unitaire [98] [99].

### 6.1.2 Les quatre strates mémorielles selon CoALA et leur traduction d’entreprise

Afin d’organiser la cognition agentique au-delà d’une fenêtre unique, le cadre `CoALA` (*Cognitive Architectures for Language Agents*), issu des sciences cognitives et de l’intelligence artificielle symbolique, distingue la mémoire de travail active de trois mémoires à long terme [97]. Complétée par les systèmes de contexte virtuel comme `MemGPT` [107] et les gestionnaires applicatifs comme `LangMem` [108], cette taxonomie structure quatre compartiments en entreprise :

1. **La mémoire de travail (*working memory*)** regroupe les données éphémères présentes dans la fenêtre active au tour courant : amorce système, échanges récents, retours d’outils et bloc actif de travail [97] [98] [107]. Transposant la mémoire virtuelle et la pagination des systèmes d’exploitation, `MemGPT` montre que l’`Agent Harness` (chapitre 03) peut laisser l’agent transférer explicitement des données entre sa mémoire principale en contexte et ses stockages externes via des appels de fonctions et des interruptions [107].
2. **La mémoire épisodique (*episodic memory*)** archive les séquences d’expériences passées : situation observée, raisonnement suivi, action entreprise et résultat obtenu [97] [108]. Elle alimente une adaptation par exemples contextualisés (*few-shot* dynamique), permettant à un agent de réutiliser la trace d’une résolution complexe antérieure plutôt que de repartir de zéro [108].
3. **La mémoire sémantique (*semantic memory*)** stocke les faits durables, politiques, connaissances d’affaires et profils d’entités indépendants d’une session particulière [97] [108]. Opérationnellement, elle se partage entre **collections** documentaires et factuelles — exigeant une consolidation ou une invalidation lors de faits contradictoires — et **profils** à schéma typé offrant une lecture directe par clé métier [108].
4. **La mémoire procédurale (*procedural memory*)** formalise le savoir-faire de l’agent : instructions système, règles de comportement, code ou gabarits de compétences [97] [108]. Là où la mémoire épisodique conserve le récit d’un cas particulier, la mémoire procédurale régit l’exécution future de tous les cas ; en entreprise réglementée, sa mise à jour par rétroaction doit rester soumise à un contrôle de version `Git` et à une approbation explicite plutôt qu’à une auto-écriture autonome en production [108].

| Strate | Contenu cognitif | Support usuel | Mise à jour | Risque majeur | Frontière ch. 09 |
| --- | --- | --- | --- | --- | --- |
| Travail | Tour courant, but actif, extraits immédiats | Fenêtre d’inférence, cache d’amorces | Synchrone par tour (compaction, éviction) | Pourrissement contextuel (`context rot`) | Éphémère ; ne survit pas à une panne serveur |
| Épisodique | Trajectoires passées (`observation`, action, résultat) | Base vectorielle horodatée, espaces de noms | Formation *hot path* ou asynchrone | Empoisonnement (`MINJA`), biais de récence | Garde l’expérience cognitive, non le log de *replay* |
| Sémantique | Faits métier, corpus documentaire, profils, graphe | Index hybride, graphe, tables relationnelles | Pipelines gouvernés et réconciliation | Données périmées, fuite inter-`ACL` | Connaissances stables, distinctes de l’état de saga |
| Procédurale | Directives système, règles métier, compétences | Dépôt `Git` versionné, artefacts `YAML` | Revue humaine et validation `EvalOps` | Dérive silencieuse si modifiée sans contrôle | Définit le comportement, non le curseur d’état |

*Tableau 6.1 — Taxonomie opérationnelle des quatre mémoires d’entreprise agentique et séparation d’avec le chapitre 09.*

### 6.1.3 Stratégies de curation : compaction, prise de notes, hot path et arrière-plan

Maintenir la qualité décisionnelle sur des tâches longues exige quatre mécanismes d’échange entre la mémoire de travail et les couches persistantes [98] [108] :

1. **La compaction** s’exécute à l’approche du plafond d’attention : l’historique actif est synthétisé pour préserver décisions, contraintes et tâches ouvertes, puis injecté dans une fenêtre réinitialisée [98]. Un élagage brutal perd des identifiants clés ; son absence noie le signal sous les traces d’outils [98].
2. **La prise de notes structurée** maintient un journal synthétique externe relu à la demande après réinitialisation de la fenêtre [98].
3. **La récupération juste-à-temps (*just-in-time*)** remplace le pré-chargement massif par des références légères explorées à la demande par outils [98]. Pour contenir la latence d’exploration tout en préservant le signal, l’usage hybride charge d’emblée les invariants critiques et lit les annexes sur besoin [98].
4. **La formation consciente (*hot path*) contre subconsciente (arrière-plan)** règle l’écriture des mémoires épisodique et sémantique [108]. En *hot path*, l’agent consigne de nouveaux faits pendant la session au prix d’une latence accrue ; en arrière-plan, un processus asynchrone extrait et consolide les souvenirs hors ligne sans ralentir l’utilisateur [108].

> **[Figure]**
> - Agent Harness (Exécution
> - cognitive en session)
> - [container]
> - Couche de mémoires cognitives distribuées
> - [container]
> - «component» Mémoire de travail
> - [Fenêtre active]
> - Instructions, tours récents
> - et notes structurées
> - «component» Moteur de compaction
> - [Curation / Éviction]
> - Synthèse de contexte et divulgation juste-à-temps
> - «component» Gestionnaire mémoriel
> - [Hot Path / Async]
> - Arbitre lecture et écriture des mémoires long terme
> - «component» Mémoire épisodique
> - [Vecteurs + Horodatage]
> - Trajectoires passées, cas similaires et préférences
> - «component» Mémoire sémantique
> - [RAG + Graphe + Profils]
> - Corpus documentaire, faits et ontologie métier
> - «component» Mémoire procédurale
> - [Git / Registre YAML]
> - Règles validées, prompts et gabarits de compétences
> - «external_system» Exécution durable
> - (Chapitre 09)
> - Checkpointing transactionnel,
> - replay déterministe et Sagas
> - Sature budget
> - O(n²)
> - Réinitialise avec synthèse
> - Interroge /
> - extrait
> - Lit / consolide
> - expériences
> - Récupère connaissances
> - Charge règles
> - versionnées
> - Distingue état transactionnel [Hors mémoire cognitive]

*Fig. 21. – Topologie des quatre mémoires cognitives d’entreprise et boucle d’ingénierie du contexte*

### 6.1.4 Frontière stricte entre mémoire cognitive et persistance transactionnelle

La figure 6.1 trace la frontière d’étanchéité de l’ouvrage : les quatre strates cognitives gèrent la pertinence informationnelle et la continuité sémantique [97] [108], tandis que la persistance transactionnelle — journal d’événements, *checkpointing*, reprise après panne et sagas — relève du chapitre 09. Un orchestrateur ne reconstruit jamais l’étape d’un traitement critique à partir d’un résumé épisodique probabiliste.

> **Arbitrage EA / SA** — Interdire de confier l’état de reprise d’un workflow transactionnel à une mémoire épisodique ou à une synthèse de contexte, et proscrire l’auto-réécriture non versionnée de la mémoire procédurale en production [108]. Le `SA` dissocie dans l’`Agent Harness` la mémoire de travail soumise à compaction [98] [107], les collections consolidées en arrière-plan par espaces de noms [108] et le moteur durable du chapitre 09. L’`EA` exige que toute modification de la mémoire procédurale transite par `Git` et une batterie de non-régression `EvalOps`.

## 6.2 De la recherche naïve à l’Agentic RAG fédéré : hybride lexical/vectoriel, Text-to-SQL gouverné et graphes

### 6.2.1 Limites du RAG vectoriel naïf et apport du Contextual Retrieval

Le `RAG` naïf découpe les documents en blocs fixes de quelques centaines de jetons, calcule des vecteurs denses et injecte les plus proches voisins sémantiques dans l’amorce [99] [104]. En entreprise, cette chaîne linéaire échoue pour quatre raisons [99] [104] [109] :

1. **Perte du contexte référentiel** : un bloc isolé mentionnant une variation trimestrielle de revenu de 3 % perd toute utilité si l’entité émettrice et l’exercice fiscal figuraient uniquement en tête du document [99].
2. **Cécité aux identifiants exacts** : les plongements denses capturent la proximité thématique mais manquent fréquemment les chaînes littérales telles qu’un code d’erreur `TS-999`, un numéro de pièce ou une référence réglementaire [99].
3. **Rigidité du flux à passe unique** : le pipeline statique ne sait ni diagnostiquer des passages hors sujet ni reformuler une requête sous-spécifiée [104] [110].
4. **Incapacité analytique et synthétique** : la similarité locale échoue sur les calculs tabulaires exacts et sur les synthèses transversales d’un corpus entier [109] [100].

Pour résoudre la fragmentation dès l’ingestion, le patron `Contextual Retrieval` préfixe chaque bloc de texte par un court résumé situationnel de 50 à 100 jetons généré à partir du document parent, puis indexe ce bloc enrichi à la fois en vecteurs denses (`Contextual Embeddings`) et en index lexical (`Contextual BM25`) [99]. Sur des jeux de test d’entreprise (code, finance, documentation technique), les vecteurs contextualisés seuls abaissent de **35 %** les échecs de récupération dans le top-20 ; l’ajout du `BM25` contextualisé porte la réduction à **49 %** ; enfin, la combinaison avec un réordonnanceur `Cross-Encoder` en second étage (chapitre 03) atteint **67 %** de baisse des échecs [99]. Ce pré-traitement reste économiquement viable en exploitant le cache d’amorces (*Prompt Caching*) sur le document complet partagé entre ses fragments, réduisant la latence d’indexation de plus d’un facteur 2 et son coût jusqu’à 90 % selon les mesures publiées [99].

### 6.2.2 Recherche hybride lexicale/vectorielle et fusion RRF

Combiner la recherche lexicale `BM25` (sensible aux correspondances exactes, à la rareté `IDF` et à la longueur de document) avec la recherche vectorielle dense suppose de réconcilier des scores aux échelles hétérogènes [99] [111]. Additionner directement une similarité cosinus bornée et un score `BM25` non borné rend le classement fragile selon les corpus [112].

L’algorithme de référence adopté par les moteurs de recherche hybride (tels qu’Azure AI Search) est la fusion par rang réciproque (`Reciprocal Rank Fusion`, `RRF`) établie par Cormack, Clarke et Büttcher [112] [111]. Au lieu de normaliser les scores bruts, `RRF` évalue chaque document `d` à partir de son seul rang `rang_i(d)` dans chaque liste retournée en parallèle : `score_RRF(d) = Σ 1 / (k + rang_i(d))` [112] [111]. Les évaluations empiriques prouvent qu’une constante de lissage `k = 60` neutralise les pics isolés d’un moteur tout en récompensant les fragments bien classés sur les deux modalités, surpassant les moteurs individuels et la fusion de Condorcet sans aucun apprentissage préalable [112] [111]. Cette fusion rapide fournit les 50 à 100 candidats ensuite filtrés par `Cross-Encoder` [99] [111].

### 6.2.3 Boucles de l’Agentic RAG et raffinement correctif (CRAG)

L’`Agentic RAG` remplace l’exécution linéaire rigide par une boucle où un agent planifie la recherche, décompose les questions composites, choisit les moteurs appropriés et vérifie la qualité des preuves collectées avant de répondre [104]. Ce saut architectural évite que le générateur ne produise des réponses plausibles à partir de passages récupérés par défaut mais non pertinents [104] [110].

Le mécanisme `Corrective RAG` (`CRAG`) formalise cette porte de contrôle au moyen d’un évaluateur léger classant la confiance de la récupération selon trois verdicts [110] :

1. **Verdict** `Correct` : les passages validés subissent un raffinement par décomposition et recomposition en bandes de connaissance (*knowledge strips*) afin d’extraire les seules phrases utiles et d’économiser le budget d’attention [110].
2. **Verdict** `Incorrect` : les passages médiocres sont écartés, la requête est reformulée et l’agent bascule vers une source complémentaire fédérée autorisée [104] [110].
3. **Verdict** `Ambigu` : l’évaluateur fusionne les bandes internes filtrées avec une requête d’appoint pour lever l’ambiguïté [110].

### 6.2.4 Données structurées et synthèses globales : Text-to-SQL gouverné et GraphRAG

L’`Agentic RAG` fédéré ne peut traiter les requêtes quantitatives ou transversales par simple recherche documentaire [109] [100]. Exposer un schéma `SQL` physique brut à un `LLM` pour générer des requêtes à la volée échoue lourdement sur les systèmes réels : sur un banc d’essai d’assurance comptant 43 requêtes métier, Sequeda, Allemang et Jacob mesurent une exactitude de **16 %** seulement avec `GPT-4` en *zero-shot* sur le schéma physique, contre **54 %** lorsque les requêtes s’appuient sur une couche sémantique ontologique formalisant le contexte métier [100].

Pour fiabiliser le `Text-to-SQL` en production, les plateformes modernes telles que `Snowflake Cortex Analyst` et `dbt Semantic Layer` remplacent les tables brutes par des modèles sémantiques `YAML` (ou vues sémantiques `CREATE SEMANTIC VIEW`) déclarant explicitement tables logiques, dimensions, valeurs énumérées, mesures agrégées et chemins de jointure approuvés, complétés par un catalogue de requêtes vérifiées (*verified queries*) guidant le modèle sur les questions récurrentes [113] [101]. Le `SQL` généré s’exécute sous les rôles d’accès existants de l’entrepôt sans exposition des données pour entraînement [113]. En complément, le `SA` encapsule l’exécution derrière un analyseur syntaxique déterministe (`AST`) vérifiant l’absence d’opérations de mutation et un rôle strict en lecture seule.

Pour les synthèses globales portant sur l’ensemble d’un corpus (tendances transversales, risques systémiques) ou les enquêtes multi-sauts, `GraphRAG` indexe les documents en deux temps : extraction par `LLM` d’un graphe d’entités et de relations, puis détection hiérarchique de communautés pré-résumées [109]. Une requête globale déclenche une synthèse *Map-Reduce* sur ces résumés communautaires, produisant sur des corpus d’environ un million de jetons des réponses nettement plus complètes et diversifiées que le `RAG` vectoriel, au prix d’un budget d’indexation supérieur [109].

> **[Figure]**
> - Pipeline Agentic RAG
> - fédéré [container]
> - «component» Routeur et planificateur
> - [Classification d'intention]
> - Décompose la requête et
> - sélectionne les moteurs
> - «component» Recherche hybride [Contextual BM25 + Vecteurs]
> - Fusion RRF (k=60) puis Cross-Encoder
> - «component» Text-to-SQL gouverné
> - [Modèle sémantique + AST]
> - Compile SQL contraint sur métriques et jointures
> - «component» Moteur GraphRAG
> - [Entités + Communautés]
> - Traversée multi-sauts ou synthèse globale Map-Reduce
> - «component» Évaluateur CRAG
> - [Confiance à 3 verdicts]
> - Correct / Ambigu / Incorrect
> - et filtrage de bandes
> - «container» Nœud cognitif
> - [Agent Harness]
> - Formule requête initiale ou itérative
> - «external_system» Entrepôt analytique
> - Vues sémantiques
> - en lecture seule
> - «external_system» Fenêtre de contexte
> - Preuves sourcées
> - compactes
> - Soumet requête
> - Texte / Réf.
> - exactes
> - Agrégations /
> - KPI chiffrés
> - Thèmes globaux /
> - liens multi-sauts
> - Exécute lecture seule
> - Top-K fusionnés
> - Résultat typé
> - Synthèse graphe
> - Incorrect : réécrit / réplique
> - Correct : injecte preuves

*Fig. 22. – Pipeline d’Agentic RAG fédéré : routage adaptatif, recherche hybride RRF, Text-to-SQL gouverné et GraphRAG*

| Approche | Cas optimaux | Latence et `FinOps` | Mécanisme clé | Limite principale |
| --- | --- | --- | --- | --- |
| `RAG` vectoriel naïf | Corpus homogène non critique | Faible latence, coût minime | Similarité cosinus simple | Contexte fragmenté, faible rappel lexical, pas d’agrégation [99] |
| Hybride `Contextual` + `RRF` | Procédures, contrats, tickets, code | Indexation cachée abordable, latence modérée | Préfixes contextuels, fusion `k = 60`, `Cross-Encoder` | Inadapté aux calculs exacts et synthèses globales [99] [111] |
| `Agentic RAG` (`CRAG`) | Dossiers composites multi-sources | Latence variable selon réessais | Verdicts de confiance et bandes filtrées | Risque de boucles sans plafond de tours [104] [110] |
| `Text-to-SQL` gouverné | Métriques chiffrées et séries temporelles | Latence d’entrepôt, inférence contenue | Modèle sémantique `YAML`, jointures et `verified queries` | Dépend du maintien rigoureux des couches sémantiques [113] [101] |
| `GraphRAG` hiérarchique | Synthèses thématiques et liens multi-sauts | Coût d’indexation élevé, exécution *Map-Reduce* | Communautés pré-résumées et graphe d’entités | Rafraîchissement incrémental onéreux [109] |

*Tableau 6.2 — Matrice de sélection des moteurs d’interrogation dans l’Agentic RAG fédéré.*

> **Arbitrage EA / SA** — Exclure le `RAG` vectoriel naïf et le `Text-to-SQL` sur schémas physiques bruts dès qu’une réponse informe une décision opérationnelle [99] [100]. Le `SA` déploie par défaut la recherche hybride contextualisée avec fusion `RRF` (`k = 60`) et réordonnanceur [99] [112], restreint le `Text-to-SQL` aux vues sémantiques validées avec vérification syntaxique en lecture seule [113] [101], et borne à 2 ou 3 les itérations `CRAG`. L’`EA` limite `GraphRAG` aux corpus stratégiques à forte valeur relationnelle pour éviter l’inflation des coûts d’indexation [109].

## 6.3 Souveraineté sémantique : arrimage aux Data Contracts, couches BI, MDM et ontologies métier

### 6.3.1 Le risque de schisme analytique entre BI humaine et agents autonomes

L’essor autonome d’équipes IA produit fréquemment une dérive silencieuse : les définitions de métriques et d’entités métier sont recodées de manière ad hoc dans des amorces système ou des descriptions d’outils `MCP`, en marge des référentiels d’informatique décisionnelle (`BI`) [101]. Lorsque le tableau de bord financier d’un comité exécutif affiche un résultat différent de celui calculé par un agent d’analyse des revenus sur la même période, l’organisation perd la traçabilité de ses chiffres [100] [101].

La **souveraineté sémantique** exige que le sens métier, les règles d’agrégation, les seuils de qualité et la classification des données résident en un point unique partagé entre humains (`BI`) et agents [101] [106]. Au lieu d’enfouir la logique métier dans des prompts vulnérables à l’enchevêtrement `CACE` (chapitre 01), l’architecture arrime les pipelines de contexte aux contrats et couches gouvernées existantes [113] [101].

### 6.3.2 Contrats de données exécutables : Open Data Contract Standard (ODCS)

Un pipeline de contexte alimenté par des tables ou flux dont le schéma ou la qualité dérivent sans contrat devient une source d’erreurs silencieuses. Porté par `Bitol` au sein de la Linux Foundation AI & Data, l’`Open Data Contract Standard` (`ODCS`) normalise cet accord producteur-consommateur sous forme de spécifications `YAML` versionnées dans `Git` [106].

Dans sa version `v3`, l’`ODCS` unifie la représentation logique et physique des objets (tables relationnelles, documents, flux) et de leurs propriétés tout en intégrant la classification de sensibilité (`public`, `restricted`), les assertions automatisables de qualité, les accords de niveau de service (`SLA`), les équipes responsables et les définitions autoritatives (*authoritative definitions*) liant chaque attribut au glossaire d’entreprise [106]. Branché en amont de l’indexation agentique, le contrat `ODCS` assure trois garde-fous :

1. **Sélection contractuelle des champs** : seuls les attributs documentés et compatibles avec la politique de confidentialité du domaine alimentent les index ou profils d’agents [106] [114].
2. **Détection de rupture de fraîcheur et de qualité** : l’échec d’une règle `ODCS` ou la violation d’un `SLA` suspend la confiance accordée au gisement plutôt que d’exposer des faits périmés [106].
3. **Enrichissement sémantique sans redondance** : les noms métier (`businessName`), descriptions et synonymes du contrat nourrissent directement les routeurs de contexte et les outils `MCP` [106].

### 6.3.3 Couches sémantiques partagées, MDM et passage au Golden Context

Deux piliers du patrimoine de données complètent les contrats d’interface : la couche sémantique analytique et la gestion des données maîtresses (`MDM`) [113] [101].

Des couches telles que `dbt Semantic Layer` (via le moteur `MetricFlow`) ou les vues sémantiques `Snowflake` déplacent la définition des entités, dimensions et métriques hors de chaque outil `BI` vers un modèle centralisé [113] [101]. `MetricFlow` résout automatiquement les jointures entre modèles et expose des indicateurs gouvernés aux tableaux de bord comme aux agents via `API` et serveur `MCP` [101]. Toute révision d’une formule comptable ou opérationnelle se propage ainsi instantanément et à l’identique vers l’ensemble des consommateurs humains et agentiques [101].

Le `MDM` lève quant à lui l’ambiguïté identitaire entre systèmes sources hétérogènes (`ERP`, `CRM`, facturation) en consolidant des *Golden Records* pour les clients, produits et fournisseurs. L’architecture agentique prolonge cette approche en reliant chaque *Golden Record* aux contrats `ODCS`, aux pièces contractuelles non structurées et aux relations hiérarchiques du graphe métier — constituant un **Golden Context** unifié sur lequel l’agent raisonne sans dupliquer les entités [100] [106].

### 6.3.4 Ontologies métier OWL 2 et validation déterministe par SHACL

Dans les domaines réglementaires ou industriels à forte densité de règles, des descriptions `YAML` isolées ne suffisent pas à formaliser les relations complexes. Les standards du `W3C` — `OWL 2` et `SHACL` — apportent la rigueur formelle requise [115] [116].

`OWL 2` (*Web Ontology Language*) définit les classes métier, hiérarchies, propriétés et axiomes logiques indépendamment des bases physiques [116], permettant les gains de précision mesurés lorsque des mappings ontologiques comblent l’écart entre langage métier et schémas relationnels [100]. Tandis qu’`OWL 2` exprime la sémantique du domaine, `SHACL` (*Shapes Constraint Language*) valide de façon purement déterministe les graphes de données `RDF` face à un graphe de formes (*shapes graph*) en vérifiant cardinalités, types, plages de valeurs et intégrité relationnelle [115]. Combiné en intégration d’entreprise aux pipelines `GraphRAG` [109], un contrôle `SHACL` en amont bloque ou place en revue d’intendance toute entité extraite qui viole les invariants structurels du domaine, préservant la pureté du graphe de connaissances [109] [115].

> **[Figure]**
> - Données maîtresses et Contrats (Plan 3)
> - Souveraineté sémantique
> - Consommateurs gouvernés
> - Data Contracts «ODCS v3 YAML»
> - Données brutes (ERP, CRM, SoR)
> - Moteur MDM «Golden Records»
> - Couche sémantique «MetricFlow / Views»
> - Graphe métier «Golden Context»
> - Ontologie métier «OWL 2 / SHACL»
> - Tableaux de bord BI
> - «Usage humain»
> - Agentic RAG &
> - Text-to-SQL
> - MCP Gateway
> - (Ch. 04)
> - Acteurs cognitifs
> - «Agents»
> - qualité /sensibilité résout types / SLA
> - alimente
> - valide SHACL
> - KPI uniques vues /jointures
> - relations
> - expose
> - contexte

*Fig. 23. – Chaîne de souveraineté sémantique : des contrats de données ODCS et du MDM à la consommation agentique*

> **Arbitrage EA / SA** — Interdire de redéfinir des indicateurs métier ou des entités maîtresses dans les prompts d’agents ou des index vectoriels détachés de la gouvernance de données [100] [101]. L’`EA` rattache la propriété des contrats `ODCS` [106], des couches sémantiques (`MetricFlow` / vues sémantiques) [113] [101], du `MDM` et de l’ontologie `OWL 2` [116] aux *Data Owners* métier afin de maintenir une source de vérité unique entre `BI` et agents. Le `SA` couple les outils `MCP` et le `Text-to-SQL` exclusivement à ces couches gouvernées, interdit l’indexation de jeux sans contrat `ODCS` valide et exécute des contrôles `SHACL` avant toute publication dans le graphe d’entreprise [115].

## 6.4 Gouvernance mémorielle : propagation des ACL, prévention de l’empoisonnement et isolation multi-locataires

### 6.4.1 Failles vectorielles (OWASP LLM08:2025) et propagation des ACL

Les index documentaires et mémoires épisodiques regroupent des données de sensibilité inégale (procédures publiques, contrats confidentiels, dossiers RH). Or, la transformation d’un texte en vecteur numérique ne préserve pas nativement les listes de contrôle d’accès (`ACL`) du système source [114]. La catégorie `OWASP LLM08:2025 Vector and Embedding Weaknesses` identifie cinq menaces critiques sur cette couche : la divulgation non autorisée par défaut d’alignement des `ACL`, les fuites inter-locataires et conflits de fédération, l’inversion d’embeddings permettant de reconstituer les textes sources, l’empoisonnement des données à l’ingestion (comme du texte invisible injecté dans un document) et l’altération comportementale du modèle [114].

L’indexation sous un compte de service unique sans filtrage au moment de la requête expose immédiatement l’agent au risque de divulgation transversale [105] [114]. Deux mécanismes éprouvés rétablissent l’étanchéité :

1. **Le filtrage par attributs de principaux sur l’index (*Security Filter Pattern*)** associe à chaque fragment les identifiants d’utilisateurs ou de groupes autorisés et impose une clause performante telle que `search.in` sur chaque requête [117]. Comme le rappelle la documentation `Azure AI Search`, ces chaînes indexées ne constituent pas une authentification native : le service appelant doit authentifier l’utilisateur, résoudre ses groupes auprès du fournisseur d’identité (via délégation `OBO`, détaillée au chapitre 10), rejeter toute requête non filtrée et synchroniser les révocations [117].
2. **L’autorisation relationnelle fine (**`ReBAC`**) externe via** `OpenFGA` — inspirée de `Google Zanzibar` et hébergée à la `CNCF` — gère l’héritage hiérarchique complexe (dossiers, groupes imbriqués, partages directs sur `SharePoint`, `Google Drive` ou `Confluence`) [105]. Selon le profil de sélectivité, le `SA` choisit entre le **pré-filtrage** via `ListObjects` injecté en filtre vectoriel (idéal lorsque l’utilisateur n’accède qu’à une petite fraction du corpus afin de garantir un top-*K* complet, bien que plus lourd sur des relations `and` ou `but not`) et le **post-filtrage** sur un sur-échantillon de `2×` à `3×` candidats validés en lot via `BatchCheck` [105]. Pour les corpus soumis à révocations fréquentes, l’index local synchronisé via `GET /changes` est doublé d’un ultime `/check` sur les candidats retenus [105].

### 6.4.2 Prévention de l’empoisonnement mémoriel (ASI06) : menaces et gardes d’exécution

Contrairement aux injections éphémères, l’empoisonnement de mémoire persistante (`OWASP ASI06: Memory & Context Poisoning`) grave une altération durable dans l’état de l’agent [118]. Trois travaux de sécurité démontrent l’efficacité redoutable de cette classe d’attaques :

1. `PoisonedRAG` modélise la corruption de base `RAG` comme une optimisation conjointe et prouve que l’injection de **cinq textes malveillants** par question cible dans un corpus de millions de documents suffit à atteindre **90 %** de taux de succès pour imposer la réponse voulue, tout en échappant aux filtres simples de perplexité [119].
2. `AgentPoison` implante des portes dérobées dans la mémoire à long terme ou les bases `RAG` d’agents autonomes sans modifier ni ré-entraîner le modèle [102]. Par optimisation contrainte de déclencheurs dans un sous-espace d’embeddings, l’attaque obtient plus de **80 %** de succès avec un taux d’empoisonnement sous **0,1 %** et moins de **1 %** de dégradation sur requêtes légitimes [102].
3. `MINJA` (*Memory Injection Attacks via Query-Only Interaction*) démontre qu’un attaquant dépourvu d’accès direct en écriture peut empoisonner la mémoire d’un agent par de simples requêtes conversationnelles, en l’amenant à enregistrer des étapes de pontage logique (*bridging steps*) raccourcies progressivement jusqu’à détourner les requêtes futures d’autres victimes [103].

La parade sécurise le chemin d’écriture en plus du chemin de lecture [114] [118]. Le projet `OWASP Agent Memory Guard` (référence `ASI06`) interpose un garde d’exécution inspectant toute écriture avant persistance pour bloquer ou mettre en quarantaine les directives malveillantes [118]. Ce contrôle s’appuie sur quatre règles : étiquetage de provenance distinguant les faits `SoR` des sources externes non fiables [114] ; journalisation par empreinte cryptographique permettant le retour arrière par instantané (*snapshot rollback*) [118] ; interdiction d’alimenter une mémoire épisodique partagée entre utilisateurs à partir d’interactions non vérifiées (bloquant `MINJA`) [103] ; et extraction documentaire brute ignorant le texte caché lors de la vectorisation [114].

### 6.4.3 Isolation multi-locataires : Silo, Bridge, Pool, HNSW partitionné et RLS

Qu’il s’agisse de clients externes sur une plateforme mutualisée ou de lignes d’affaires cloisonnées, le partage physique d’index ou de mémoires expose à trois risques : fuite transversale [114], contention de voisin bruyant (*noisy neighbor*) et distorsion statistique des scores lexicaux [120] [121].

Transposant les régimes `Silo`, `Pool` et `Bridge` de l’`AWS SaaS Lens` [120], l’architecte ajuste l’isolation au risque : le régime `Pool` mutualise l’index sous un filtre `tenant_id` (coût minimal mais vigilance sur la contention), le régime `Silo` dédie base, collection et chiffrement (isolation maximale à coût fixe élevé), et `Bridge` mutualise par défaut tout en isolant les locataires critiques [120].

Deux moteurs matérialisent ces régimes :

1. **Dans** `Qdrant`, multiplier les collections au-delà de quelques centaines d’entités est coûteux (`Qdrant Cloud` plafonne par défaut à 1 000 collections par grappe) [121]. En mode `Pool`, l’index `is_tenant: true` (`v1.11.0+`) co-localise les vecteurs sur disque, tandis que `m: 0` et `payload_m: 16` remplacent le graphe `HNSW` global par des sous-graphes isolés par locataire [121]. En mode `Bridge`, `sharding_method: CUSTOM` promeut les grands comptes vers des *shards* dédiés par `shard_key`, et le paramètre `idf` (`v1.19.0+`) isole les statistiques `BM25` par locataire [121].
2. **Dans** `PostgreSQL` **(**`RLS`**)**, `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` impose un refus par défaut et évalue les prédicats par commande (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) avant toute condition ou fonction non `LEAKPROOF` issue de la requête [122].

> **[Figure]**
> - Utilisateur (Jeton OBO)
> - Agent Harness
> - Garde mémoire
> - (Policy / ASI06)
> - OpenFGA
> - (ReBAC) Stockage vectoriel et épisodique isolé
> - Utilisateur (Jeton OBO) Agent Harness Garde mémoire
> - (Policy / ASI06)
> - OpenFGA
> - (ReBAC)
> - Stockage vectoriel et épisodique isolé
> - Flux A — Récupération gouvernée par ACL (Pre-filtering / Post-filtering)
> - 1 Requête métier (mandat OBO)
> - 2 ListObjects(user, "viewer", "doc")
> - 3 ID autorisés [doc_12, doc_48]
> - 4 Recherche hybride (tenant_id = T1 AND doc_id IN autorisés)
> - 5 Fragments cloisonnés (HNSW + IDF par locataire)
> - 6 BatchCheck(user, "viewer", candidats) [contrôle de fraîcheur si révocations]
> - 7 Verdict autorisé
> - Flux B — Écriture protégée contre l'empoisonnement (Hot Path / Async)
> - 8 Propose écriture mémoire (source, locataire T1, contenu)
> - 9 Vérifie provenance, confiance et détecte directives injectées
> - alt [Contenu sain et provenance attestée]
> - 10 Écrit sous tenant_id = T1 avec empreinte et horodatage
> - 1 1 Confirmation indexée
> - [Contenu suspect ou origine non fiable]
> - 12 Rejet ou mise en quarantaine (audit immuable)

*Fig. 24. – Séquence de propagation des ACL (OpenFGA), garde d’écriture anti-empoisonnement et isolation multi-locataires*

| Régime | Implémentation type | Frontière et impact | Contention / `IDF` | Profil `FinOps` | Cas d’usage cible |
| --- | --- | --- | --- | --- | --- |
| `Pool` logique | Collection unique avec `is_tenant: true` ou `PostgreSQL RLS` | Cloisonnement logique ou moteur ; exige filtrage systématique | Risque de contention `CPU` /E/S et biais `IDF` sans scoping [121] | Coût unitaire minimal, passe au-delà de `1 000` locataires [120] [121] | Équipes internes ou locataires standards homogènes |
| `Bridge` à paliers | `HNSW` cloisonné (`m: 0`, `payload_m`) + *custom shards* sélectifs | Sous-graphes étanches et séparation physique des grands comptes | Contenu pour les locataires sur *shard* dédié [121] | Mutualisation par défaut avec palier dédié facturable [120] | Plateforme mixant nombreux petits domaines et comptes critiques |
| `Silo` physique | Base, collection ou grappe dédiée + clé de chiffrement propre | Isolation matérielle/cryptographique complète [120] | Nul ; ressources, graphes et statistiques dédiés | Surcoût fixe élevé par entité, gestion de flotte plus lourde [120] | Données hautement réglementées (santé, finance souveraine) |

*Tableau 6.3 — Arbitrage d’isolation multi-locataires pour les index vectoriels et les mémoires cognitives d’entreprise.*

> **Arbitrage EA / SA** — Proscrire tout index vectoriel partagé sans propagation des `ACL` à la requête et interdire le partage en écriture d’une mémoire épisodique entre utilisateurs sans validation de provenance [105] [114] [103]. Le `SA` arbitre entre pré-filtrage `OpenFGA ListObjects` et post-filtrage `BatchCheck` (`2×–3×`), active `RLS` sur tout stockage relationnel et configure le partitionnement `is_tenant` / `payload_m` / `idf` ou le sharding à paliers `Bridge` [105] [121] [122]. L’`EA` impose le régime `Silo` physique dès que s’appliquent des exigences strictes de souveraineté ou de conformité (données de santé, secrets d’affaires, Loi 25 traitée au chapitre 12) et exige une inspection anti-`ASI06` doublée d’un audit immuable des écritures persistantes [118].

## Synthèse et transition vers la Partie III

Avec la maîtrise de l’ingénierie du contexte, de l’`Agentic RAG` fédéré, de la souveraineté sémantique et de la gouvernance mémorielle, ce chapitre clôt la Partie II dédiée à l’interopérabilité. Le Plan 3 dispose désormais de connecteurs verticaux normalisés (`MCP`, chapitre 04), de protocoles horizontaux entre agents (`A2A` et `AGNTCY`, chapitre 05) et d’un substrat de mémoire et de connaissances gouverné et sécurisé (chapitre 06).

Reste alors le défi central de la dynamique collective : comment orchestrer ces agents outillés et contextualisés sur des processus complexes sans explosion des coûts ni dérive d’objectif (`Goal Drift`) ? Quand adopter une topologie dirigée par graphe face à une chorégraphie réactive sur *Event Mesh*, et comment garantir une reprise transactionnelle sans faille ? La Partie III répond à ces questions dès le chapitre 07 avec l’étude des patrons d’orchestration multi-agents.

# Partie III — Orchestration, chorégraphie et exécution durable

# Chapitre 7 — Patrons d’orchestration et topologies de composition multi-agents

Avec l’outillage vertical normalisé par `MCP` (chapitre 4), la délégation horizontale sur `A2A` et `AGNTCY` (chapitre 5) et la souveraineté mémorielle établie autour des quatre strates cognitives (chapitre 6), la tentation immédiate consiste à multiplier les agents spécialisés dès qu’un processus métier dépasse quelques étapes. Les retours en production et les travaux empiriques récents démontrent toutefois qu’une décomposition multi-agents appliquée sans discipline dégrade simultanément la fiabilité, la latence et l’économie unitaire [123] [124] [125]. Ce chapitre ouvre la Partie III en établissant les critères quantitatifs et les patrons algorithmiques de composition coordonnée par graphe ou par superviseur. Il porte exclusivement sur l’orchestration structurée à flux explicite; le couplage événementiel asynchrone via `Event Mesh` relève du chapitre 8, et la reprise transactionnelle par exécution durable et `Sagas` est traitée au chapitre 9.

Pour l’architecte de solutions (`SA`), l’enjeu consiste à aligner strictement la structure des dépendances d’une tâche, la topologie d’exécution (`Séquentiel`, `Routeur`, `Supervisor`, `DAG`, `Handoff`, `Scatter-Gather` ou `Generator-Verifier`) et l’ingénierie des transferts d’état. Pour l’architecte d’entreprise (`EA`), l’enjeu consiste à contenir l’amplification des coûts d’inférence et des erreurs tout en imposant des bornes d’arrêt déterministes protégeant les `Systems of Record (SoR)`.

## 7.1 Quand éviter le multi-agents : critères quantitatifs face à un agent unique outillé

L’adoption d’une topologie multi-agents obéit souvent à une analogie organisationnelle : puisqu’une équipe humaine divise un dossier entre analyste, rédacteur et relecteur, plusieurs agents devraient surpasser un agent unique. Les évaluations contrôlées invalident cette intuition et montrent que la distribution cognitive n’est rentable que dans des régimes structurels précis [126] [124].

### 7.1.1 Le paradoxe de la décomposition naïve : lois d’échelle empiriques et saturation à 45 %

Dans une étude évaluant 260 configurations sur six bancs d’essai agentiques, trois familles de modèles et cinq architectures canoniques (agent unique, multi-agents indépendant, centralisé, décentralisé et hybride), Kim et ses coauteurs montrent que la performance dépend avant tout de l’adéquation entre topologie et structure de tâche [124]. Leur modèle prédictif sélectionne l’architecture optimale pour 87 % des configurations hors échantillon (`R² = 0,373`, et `R² = 0,413` avec une métrique de capacité ancrée sur la tâche) et met en évidence trois lois quantitatives [124] :

1. **Seuil de saturation à 45 %** : dès qu’un agent unique outillé dépasse 45 % d’exactitude sur une classe de tâches, l’ajout d’agents supplémentaires produit des rendements décroissants ou négatifs, le surcoût de coordination excédant le gain marginal [124].
2. **Divergence selon la parallélisabilité** : comparé à l’agent unique, le multi-agents génère jusqu’à +80,8 % de gain relatif sur le raisonnement financier décomposable en branches indépendantes, mais subit une dégradation de −70,0 % sur la planification séquentielle rigide [124].
3. **Amplification asymétrique des erreurs** : les architectures indépendantes dépourvues de validation centralisée amplifient les erreurs d’un facteur 17,2× face à l’agent unique, alors qu’une coordination centralisée contenant la revue des sous-agents ramène cette amplification à 4,4× [124].

Les données de production d’Anthropic confirment ces ordres de grandeur économiques : un agent unique consomme déjà environ 4× plus de jetons qu’une interaction conversationnelle simple, tandis qu’un système multi-agents en consomme environ 15× plus [127]. Sur le banc *BrowseComp*, trois facteurs expliquent 95 % de la variance de performance, la seule consommation de jetons en expliquant 80 % devant le nombre d’appels d’outils et le choix du modèle [127]. Sur des tâches de faible valeur unitaire ou déjà traitées par un agent unique outillé, le multi-agents détruit donc la marge `FinOps` sans gain qualitatif [126] [127].

### 7.1.2 Fragmentation du contexte et décisions implicites : la leçon de Cognition et la taxonomie MAST

L’éclatement prématuré engendre également des pannes distribuées cognitives. Analysant les défaillances des systèmes multi-agents autonomes, Walden Yan (Cognition) pose deux principes directeurs d’ingénierie du contexte [123]. Premièrement, **partager les traces complètes de décision plutôt que des messages isolés** : lorsqu’un coordinateur ne transmet à un sous-agent qu’une sous-consigne résumée, ce dernier interprète sa tâche hors contexte et produit des résultats incompatibles avec les hypothèses des tours précédents [123]. Deuxièmement, **toute action porte des décisions implicites** : dès que des écrivains concurrents modifient en parallèle un même livrable (code, contrat ou modèle), leurs choix implicites non partagés entrent en collision [123]. Cognition préconise par conséquent une exécution mono-fil disciplinée sur une trace continue plutôt que des essaims d’écrivains parallèles [123], la parallélisation multi-agents ne demeurant sûre que sur des explorations en lecture seule isolées [127] [124].

La taxonomie empirique `MAST` (*Multi-Agent System Failure Taxonomy*), construite à l’UC Berkeley sur plus de 1 600 traces annotées issues de sept cadriciels (`κ = 0,88`), recense 14 modes de défaillance regroupés en trois catégories équilibrées [125] :

- **Spécification et conception système (**`FC1` **: 41,77 %)** : désobéissance aux consignes initiales ou au rôle, répétition d’étapes, perte d’historique et ignorance des conditions d’arrêt [125].
- **Désalignement inter-agents (**`FC2` **: 36,94 %)** : réinitialisation de conversation, absence de demande de clarification, déraillement thématique, rétention d’information critique, rejet des retours d’un pair et divergence entre raisonnement exprimé et action exécutée [125].
- **Vérification et terminaison (**`FC3` **: 21,30 %)** : arrêt prématuré sur résultat incomplet, absence de contrôle et validation erronée [125].

Au total, 78,71 % des défaillances (`FC1 + FC2`) proviennent directement de l’architecture du graphe de coordination et des échanges de contexte, et non des limites brutes du modèle [125].

### 7.1.3 Alternatives avant l’éclatement : Skills à divulgation progressive et découplage ReWOO

Avant d’instancier plusieurs agents, le `SA` dispose de trois leviers dans un `Agent Harness` unitaire (chapitre 3) pour étendre la portée d’un agent unique [126] [128] [129] :

1. **Divulgation progressive par** `Skills` : au lieu de saturer le contexte initial avec des dizaines de procédures et schémas d’outils, un agent unique charge dynamiquement à la demande les compétences requises, protégeant ainsi son budget d’attention sans introduire de coordination inter-agents [129].
2. **Découplage plan-observation (**`ReWOO`**)** : les boucles `ReAct` entrelacent chaque raisonnement avec une observation d’outil complète [130]. Le paradigme `ReWOO` (*Reasoning WithOut Observation*) sépare un *Planner* produisant le graphe d’appels via des variables symboliques (`#E1`, `#E2`), un *Worker* exécutant les outils et un *Solver* synthétisant la réponse [130]. Cette séparation offre une efficacité en jetons 5× supérieure et un gain d’exactitude de 4 % sur *HotpotQA*, tout en permettant de déporter la planification vers des modèles plus compacts (de 175B vers 7B paramètres) [130].

3. **Workflow déterministe ponctué de nœuds** `LLM` : selon la règle 80/20 (chapitre 3), tout enchaînement connu à l’avance doit rester dans du code déterministe orchestrant des appels cognitifs unitaires sans boucle autonome [126] [128].

> **[Figure]**
> - Anti-patron : fragmentation prématurée (tâche séquentielle / > 45
> - % base)
> - Arbitrage cible : escalade graduée
> - (agent unique outillé →graphe
> - gouverné)
> - Requête complexe
> - Essaim parallèle sans vérification
> - Contexte fragmenté & choix implicites en conflit
> - Amplification 17,2x et coût ~15x jetons
> - Requête & profil de tâche
> - Agent unique outillé (Skills / ReWOO)
> - Graphe dirigé borné (Supervisor / DAG)
> - Endiguement 4,4x et budget maîtrisé
> - Éclatement naïf
> - Écritures concurrentes
> - sans trace commune
> - Dérive MAST FC1/FC2
> - (-70 % en séquentiel)
> - Règle par défaut (base >= 45 % ou séquentiel)
> - Escalade si contexte saturé
> - ou sous-tâches parallèles
> - Validation centralisée et passage par référence

*Fig. 25. – Arbitrage architectural entre fragmentation prématurée et escalade graduée depuis l’agent unique outillé*

Le passage au multi-agents ne devient justifié que si l’une au moins de quatre contraintes objectives s’impose [127] [124] [129] : l’exploration parallèle de branches indépendantes en lecture dont les résultats bruts satureraient un contexte unique [127] [129]; le cloisonnement de sécurité interdisant de réunir deux jeux d’outils ou de données sensibles dans une même fenêtre [129]; l’autonomie de développement entre équipes maintenant des domaines distincts [129]; ou une séparation contradictoire générateur-vérificateur sur des livrables critiques [126] [128].

| Critère d’évaluation | Agent unique outillé (`Skills` / `ReWOO`) | Multi-agents centralisé (`Supervisor` / `DAG`) | Multi-agents décentralisé / indépendant |
| --- | --- | --- | --- |
| Exactitude base mono-agent | ≥ 45 % sur tâche structurée [124] | < 45 % sur tâche décomposable [124] | Exceptions rares (exploration pure) [127] |
| Structure des dépendances | Séquentielle ou outil-intensive [124] | Parallélisable avec jointure vérifiée [124] | Sous-tâches disjointes en lecture [127] [124] |
| Amplification des erreurs | 1,0× (référence) [124] | 4,4× (endiguement centralisé) [124] | 17,2× (propagation non vérifiée) [124] |
| Coût en jetons | ~4× vs conversation [127] (5× réduit via `ReWOO` [130]) | ~15× vs conversation simple [127] | Non borné sans plafond explicite [125] |
| Écritures mutantes | Mono-fil cohérent (zéro conflit) [123] | Écritures sérialisées au coordinateur [123] | Conflits d’hypothèses implicites (`FC2`) [123] [125] |

*Tableau 7.1 — Critères quantitatifs de décision entre agent unique outillé et architectures multi-agents.*

> **Arbitrage EA / SA** — Exiger en revue d’architecture la preuve qu’un agent unique outillé (`Skills`, `ReWOO` ou workflow déterministe à nœuds `LLM`) ne suffit pas avant d’autoriser une topologie multi-agents, particulièrement lorsque la tâche est séquentielle ou dépasse 45 % de base [126] [124] [129] [130]. Le `SA` privilégie l’isolation de lecture en parallèle et sérialise toute mutation d’état; l’`EA` valide le multiplicateur `FinOps` (~15×) et rejette toute topologie décentralisée sans vérification centralisée [127] [123] [124].

## 7.2 Topologies dirigées : séquentiel typé, routeur sémantique, Supervisor et planification DAG

Lorsque le recours au multi-agents est justifié, la première famille d’architectures regroupe les **topologies dirigées**, où les transitions demeurent gouvernées par un graphe explicite ou un coordonnateur hiérarchique [126] [128] [131]. Ce contrôle structurel réduit directement les défaillances `FC1` et `FC2` de la taxonomie `MAST` [125].

### 7.2.1 Pipeline séquentiel typé et portes de validation déterministes

Le patron **séquentiel typé** (*Prompt Chaining* ou *Sequential Orchestration*) enchaîne des agents spécialisés dans un ordre linéaire prédéfini où la sortie validée du nœud `k` alimente le nœud `k + 1` [126] [128] [131] [132]. Chaque nœud reçoit un mandat étroit (extraction documentaire, qualification réglementaire, calcul, rédaction) et un contexte épuré des traces intermédiaires inutiles [126] [131].

En entreprise, la fiabilité de cette chaîne repose sur l’insertion de **portes de validation programmatiques** (*gates*) sur les arêtes d’un graphe d’état typé (`StateGraph` sous LangGraph ou `Workflow` sous Google ADK 2.0) [126] [133] [134]. Avant d’activer l’étape suivante, le moteur contrôle déterministiquement le schéma `JSON` (chapitre 3), la complétude des champs et les invariants métier [126] [133]. En cas d’échec, une arête conditionnelle déclenche une reprise locale bornée ou une escalade humaine [133] [134]. Ce patron convient aux processus structurés à ordre fixe; il devient contre-productif dès que des branches indépendantes pourraient tourner en parallèle ou que l’ordonnancement dépend de découvertes en cours d’exécution [131].

### 7.2.2 Routeur sémantique et aiguillage spécialisé

Le patron **Routeur sémantique** (*Routing*) place en entrée un classificateur — ou un petit modèle spécialisé — chargé d’analyser la demande et de l’aiguiller vers l’une de plusieurs branches spécialisées mutuellement exclusives [126] [129]. Chaque branche conserve ses propres directives, exemples et outils `MCP`, évitant que l’optimisation d’un domaine (facturation, conformité) ne dégrade un autre domaine (support technique) [126].

Contrairement au patron `Handoff`, le routeur exécute un aiguillage en une passe (*single-step dispatch*) ou en éventail ciblé sans maintenir de conversation continue entre l’aiguilleur et les spécialistes [129]. Le `SA` doit compléter tout routeur par une **arête de repli déterministe** sous seuil de confiance minimal et par un filtrage d’entrées empêchant qu’une injection utilisateur ne détourne l’aiguillage vers une branche privilégiée (`ASI01` [135]).

### 7.2.3 Topologie Supervisor et patron Subagents-as-Tools

Dans la topologie **Supervisor** (*Orchestrator-Workers* chez Anthropic ou *Magentic* dans le Microsoft Agent Framework), un coordonnateur central décompose dynamiquement la tâche, délègue des sous-mandats à des travailleurs spécialisés et synthétise le résultat [126] [131] [132] [133]. C’est cette architecture — un agent `Claude Opus 4` orchestrant des sous-agents `Claude Sonnet 4` en parallèle — qui a permis à Anthropic de surclasser de 90,2 % l’agent unique `Claude Opus 4` sur son banc de recherche interne [127].

Les cadriciels modernes convergent vers l’implémentation **Subagents-as-Tools** plutôt que vers le partage d’une file de messages brute entre pairs [133] [136]. Le superviseur invoque chaque sous-agent spécialisé comme un outil sans état [136], ce qui procure deux bénéfices majeurs :

- **Isolation stricte du contexte** : chaque sous-agent explore et compresse ses lectures dans sa propre fenêtre éphémère avant de retourner au superviseur une synthèse concise, protégeant ce dernier contre le *context rot* [127] [136] [137].
- **Endiguement centralisé des erreurs** : chaque retour transitant par le coordonnateur avant décision aval, l’amplification d’erreurs reste contenue autour du facteur 4,4× au lieu de dériver vers 17,2× [124].

Deux risques demeurent toutefois : la latence devient séquentielle si le superviseur lance les sous-agents un à un, et une délégation mal cadrée provoque une sur-consommation de jetons (`MAST FC1`) [127] [125]. Anthropic préconise ainsi des règles explicites de calibrage d’effort dans les consignes du superviseur afin de proportionner le nombre de sous-agents et d’appels d’outils à la difficulté réelle de la demande [127].

### 7.2.4 Planification par graphe acyclique dirigé (DAG) : LLMCompiler et ADK Graph Workflows

Lorsque les opérations présentent des dépendances mixtes, l’orchestration `Supervisor` tour-par-tour paie inutilement un cycle complet d’inférence du coordonnateur entre chaque appel [138]. La **planification par graphe acyclique dirigé (**`DAG`**)** applique l’ordonnancement des compilateurs aux appels cognitifs et outillés [138] [134].

L’architecture `LLMCompiler` repose sur trois composants [138] :

1. **Function Calling Planner** : produit en amont le graphe complet de dépendances entre tâches indépendantes et tâches liées par variables symboliques [138].
2. **Task Fetching Unit** : résout les dépendances en flux tendu dès qu’une tâche amont s’achève et libère les appels devenus prêts [138].
3. **Executor** : exécute concurremment l’ensemble des tâches débloquées [138].

Sur les bancs multi-fonctions, `LLMCompiler` obtient jusqu’à **3,7×** d’accélération en latence, **6,7×** d’économies de coût et environ **9 %** de gain d’exactitude par rapport à `ReAct` [138]. Cette approche rejoint l’évolution d’ADK 2.0 vers des graphes de workflow généraux unifiant nœuds cognitifs, nœuds de code déterministes, `JoinNode`, délais d’expiration et tentatives bornées [134].

> **[Figure]**
> - Topologie 1 : Supervisor /
> - Subagents-as-Tools
> - [container]
> - Topologie 2 : Planification
> - DAG dynamique (LLMCompiler / ReWOO)
> - [container]
> - «component» Agent Supervisor
> - [LLM frontière]
> - Décompose, route
> - et consolide
> - «component» Sous-agent A
> - [Contexte isolé]
> - Exécution outillée (retour synthétisé)
> - «component» Sous-agent B
> - [Contexte isolé]
> - Exécution outillée (retour synthétisé)
> - «component» Planner DAG [Graphe + #E1..#En]
> - Produit le graphe
> - de dépendances
> - «component» Task Fetching Unit
> - [Ordonnanceur]
> - Résout variables et déclenche dès prêt
> - «component» Parallel Executors
> - [Pool asynchrone]
> - Exécute les nœuds
> - indépendants
> - «component» JoinNode / Solver
> - [Synthèse bornée]
> - Agrège les sorties
> - et valide l'état
> - Invoque comme outil
> - Invoque comme outil
> - Émet DAG typé Dispatche en parallèle Transmet #E1..#En

*Fig. 26. – Comparaison entre topologie Supervisor à sous-agents outillés et planification dynamique par graphe DAG*

L’arbitrage entre `Supervisor` et `DAG` dépend de la prévisibilité du graphe d’exécution : un `DAG` compilé (`LLMCompiler` ou `ReWOO`) prime lorsque les dépendances sont formulables a priori [138] [130]; un `Supervisor` reste indispensable lorsque les découvertes d’une première étape remettent en cause l’ensemble de la stratégie aval [127] [138].

> **Arbitrage EA / SA** — Imposer les graphes dirigés explicites (séquentiel à portes typées, routeur à repli déterministe, `DAG` compilé) partout où la topologie de dépendances est prévisible, et confiner le `Supervisor` aux investigations ouvertes à forte valeur [126] [131] [138]. Le `SA` encapsule les travailleurs en `Subagents-as-Tools` et borne la profondeur de récursion [133] [136]; l’`EA` exige la séparation lisible en audit entre arêtes contractuelles déterministes et routages cognitifs ainsi que des règles de calibrage d’effort [127] [134].

## 7.3 Topologies collaboratives et vérificatrices : Handoff, Scatter-Gather et boucle Generator-Verifier

Certains scénarios exigent de céder l’interaction directe à un spécialiste de domaine, de paralléliser une évaluation multi-angles ou d’instaurer une relecture contradictoire avant toute décision [126] [131] [139]. Sans verrous structurels, ces topologies deviennent toutefois le terrain privilégié des boucles infinies et des validations complaisantes (`MAST FC1` et `FC3`) [125].

### 7.3.1 Délégation directe orientée conversation : le patron Handoff

Le patron **Handoff** transfère activement le contrôle de la session d’un agent à un autre spécialiste sans repasser par un superviseur central à chaque tour [131] [132] [139] [140]. Dans le SDK d’OpenAI Agents, ce transfert prend la forme d’un outil typé (`transfer_to_<agent_name>`) paramétré par `input_type` (schéma des métadonnées de transfert), `on_handoff` (rappel déterministe de journalisation ou de chargement préalable) et `input_filter` (filtrage sur `HandoffInputData`) [140]. Dans LangGraph, le transfert met à jour une variable d’état persistante (`active_agent` ou `current_step`) qui permute dynamiquement le prompt système et les outils disponibles [139].

Face au patron `Subagents`, le `Handoff` offre deux propriétés distinctives [129] [139] : il préserve le **dialogue direct** entre l’agent spécialisé actif et l’utilisateur ou le `SoE` (évitant la latence et la perte de nuance d’un superviseur-relais), et permet un **verrouillage séquentiel de conformité** en n’exposant un outil ou spécialiste aval qu’une fois validées les conditions d’étape amont [129] [139]. En contrepartie, le `SA` doit borner les transitions autorisées pour prévenir les renvois circulaires (*ping-pong* `MAST FC1`) [125] et appliquer un `input_filter` strict afin de ne pas polluer l’agent cible avec un historique brut superflu [140].

### 7.3.2 Parallélisation en éventail : Scatter-Gather, Sectioning et Voting

Hérité des *Enterprise Integration Patterns* de Hohpe et Woolf, le patron **Scatter-Gather** diffuse une requête en parallèle vers plusieurs destinataires (*Scatter*) puis corrèle et fusionne leurs retours dans un *Aggregator* avec état muni d’un identifiant de corrélation (*Gather*) [141]. En orchestration agentique (`Concurrent Orchestration` chez Microsoft [131] [132], `Parallelization` chez Anthropic [126], `ParallelAgent` /`JoinNode` sous ADK [134]), il se décline en **Sectioning** (décomposer un dossier en facettes indépendantes analysées concurremment) et en **Voting** (soumettre un même cas à plusieurs prompts ou modèles indépendants pour arbitrer par vote ou score) [126].

Le `SA` doit y maîtriser deux contraintes d’ingénierie [131] [134] [141] :

1. **Latence de queue et politique de quorum** : attendre la totalité des `N` branches aligne le temps de réponse sur la branche la plus lente `max(T₁, ..., Tₙ)`, amplifiant la latence `p99` du chapitre 1. L’agrégateur doit donc combiner un `timeout SLA` strict et une condition de complétude explicite (quorum minimal ou repli dégradé documenté) [134] [141].
2. **Discipline d’agrégation** : fusionner des synthèses contradictoires par un appel cognitif non cadré peut dégrader la précision globale [131]. L’agrégateur applique d’abord des règles déterministes (schémas, déduplication, seuils de confiance) avant la consolidation finale, et confine les branches parallèles à l’analyse en lecture seule pour éviter tout conflit d’écritures [123] [131] [141].

### 7.3.3 Boucles vérificatrices : Generator-Verifier, Evaluator-Optimizer et Self-Refine

Le patron **Generator-Verifier** (aussi désigné *Evaluator-Optimizer*, *Review and Critique* ou *Maker-Checker*) dissocie la production d’un livrable de sa critique dans une boucle bornée [126] [128] [131]. Dans l’approche *Self-Refine*, Madaan et ses coauteurs mesurent une amélioration moyenne absolue d’environ 20 % sur sept tâches variées par raffinement itératif fondé sur une rétroaction structurée [142]. Pourtant, l’étude `MAST` avertit explicitement qu’« un vérificateur n’est pas une solution miracle » : `ChatDev` n’atteint que 33,33 % d’exactitude sur *ProgramDev* malgré la présence de réviseurs, en raison de faux positifs de validation (`FM-3.3`) et d’arrêts prématurés (`FM-3.1`) [125].

Pour rendre une boucle `Generator-Verifier` fiable en production, quatre garde-fous s’imposent :

1. **Contrôles déterministes en amont** : toute vérification mécanisable (syntaxe, `JSON Schema`, règles `SHACL` du chapitre 6, tests unitaires, seuils réglementaires) s’exécute avant tout juge `LLM` [126] [128].

2. **Isolation et indépendance du critique** : pour limiter la complaisance de validation relevée dans `MAST` (`FM-3.3`), le `Verifier` ne doit recevoir que le contrat d’objectif, l’artefact produit et les preuves d’exécution — jamais le monologue justificatif du générateur — et gagne à s’appuyer sur une rubrique d’évaluation structurée ou un modèle distinct [127] [125].
3. **Plafond d’itérations et test de stagnation** : la boucle doit imposer un plafond explicite (`max_iterations`, fixé par exemple à 2 ou 3 passes comme borne opérationnelle) ou une condition d’état de sortie afin d’éviter la dérive des coûts et les boucles infinies [128].
4. **Escalade humaine sur échec de convergence** : à l’épuisement du budget d’itérations sans verdict conforme, le workflow bascule obligatoirement vers un arbitrage humain (`HITL`) ou un repli déterministe sûr [128] [135].

Sur le plan économique, une boucle `Generator-Verifier` doit également être instrumentée par un **détecteur de stagnation ou d’oscillation**. Si la liste des défauts bloquants identifiés au tour `i` recoupe à l’identique celle du tour `i - 2`, ou si l’écart d’évaluation entre deux passes devient nul, poursuivre jusqu’à `max_iterations` consomme inutilement le budget de jetons sans amélioration mesurable [125] [128]. Pour le `SA`, ce court-circuit anticipé évite les cycles d’édition contradictoires où la correction d’une exigence réintroduit une régression ailleurs; pour l’`EA`, il fixe un plafond de coût unitaire prévisible par transaction métier, évitant qu’une boucle critique ne multiplie par quatre ou cinq la facture d’inférence d’un dossier standard [127] [128].

### 7.3.4 Précaution sur les Group Chats non structurés

L’orchestration en **Group Chat** (*roundtable* ou *council*) réunit plusieurs agents dans un fil conversationnel partagé géré par un modérateur [131] [132]. Parce que tous les participants émettent dans un historique commun croissant, ce patron amplifie rapidement les modes de défaillance `MAST FC2` : déraillement thématique, répétition de propositions déjà rejetées, oubli du mandat initial et confusion entre tours de parole [125] [131]. Microsoft Azure recommande explicitement de **limiter les discussions de groupe à trois agents ou moins** et de privilégier l’alternance formelle *Maker-Checker* lorsque l’objectif vise une validation structurée [131]. Au-delà de trois participants, ou dès que les agents disposent d’outils modifiant l’état externe, l’architecte doit remplacer le fil collectif ouvert par un `Scatter-Gather` en lecture seule ou par un `Supervisor` isolant chaque travailleur en `Subagents-as-Tools` [123] [124] [131].

> **[Figure]**
> - Client / SoE
> - Orchestrateur /
> - Routeur d'état
> - Agent A (Triage / Générateur)
> - Agent B / Pool
> - (Spécialistes)
> - Vérificateur (Critique indépendant)
> - Client / SoE Orchestrateur /
> - Routeur d'état
> - Agent A (Triage / Générateur)
> - Agent B / Pool
> - (Spécialistes)
> - Vérificateur (Critique indépendant)
> - 1. Handoff orienté état (transfert direct de contrôle)
> - 1 Requête utilisateur (session active)
> - 2 transfer_to_AgentB(input_type, input_filter)
> - 3 Filtre HandoffInputData & met à jour active_agent
> - 4 Active Agent B avec contexte filtré
> - 5 Réponse directe sous contrôle du domaine B
> - 2. Scatter-Gather parallèle (fan-out / agrégateur sous quorum)
> - 6 Broadcast tâches indépendantes (correlationId)
> - 7 Réponses partielles parallèles (nœuds 1..k)
> - 8 Aggregator attend quorum ou timeout SLA
> - 3. Boucle Generator-Verifier bornée (critère d'arrêt strict)
> - loop [i = 1 .. max_iterations (avec contrôle déterministe préalable)]
> - 9 Artefact candidat (URI + métadonnées)
> - 10 Tests déterministes puis revue critique isolée
> - alt [Conforme au contrat ou max_iterations atteint]
> - 1 1 Verdict VALIDÉ / ESCALADE HITL
> - [Défauts actionnables identifiés]
> - 12 Feedback structuré (écart & correctifs)

*Fig. 27. – Séquences d’orchestration des topologies Handoff, Scatter-Gather et Generator-Verifier bornée*

| Topologie | Mécanisme de contrôle | Latence et coût en jetons | Risque dominant (`MAST` / `OWASP`) | Cas d’usage cible EA/SA |
| --- | --- | --- | --- | --- |
| Séquentiel typé (`Pipeline`) | Arêtes fixes et portes déterministes [126] [133] | Linéaire prévisible (`O(N)` étapes); surcoût modéré [131] | Erreur amont non filtrée sans porte [125] | Chaînes réglementaires répétitives (sinistres, conformité) [131] |
| Routeur sémantique | Classification amont et branche exclusive [126] [129] | Minimale (1 routage + 1 spécialiste) [129] | Détournement du classificateur (`ASI01`) [135] | Triage multi-domaines vers spécialistes cloisonnés [126] [129] |
| `Supervisor` (`Subagents`) | Coordonnateur invoquant sous-agents isolés [136] | Élevé (~15× jetons vs conversation) [127] | Goulot central et sur-décomposition (`FC1`) [127] [125] | Investigation ouverte multi-sources à forte valeur [127] |
| Planification `DAG` (`LLMCompiler`) | Graphe compilé et `Task Fetching Unit` [138] | Jusqu’à 3,7× plus rapide, 6,7× moins cher vs `ReAct` [138] | Plan initial fragile si contexte très mouvant [138] | Requêtes composées à dépendances mixtes [138] [134] |
| `Handoff` orienté état | Outils `transfer_to_` et état `active_agent` [139] [140] | Faible par tour (dialogue direct sans relais) [129] | Ping-pong (`FC1`) et fuite d’historique sans filtre [125] [140] | Parcours client multi-étapes à interaction continue [129] [139] |
| `Scatter-Gather` | Diffusion parallèle et `Aggregator` sous quorum [141] | Bornée par `max(T₁, ..., Tₙ)` ou timeout SLA; coût `N×` [131] [141] | Biais d’agrégation et écritures concurrentes [123] [131] | Audit parallèle en lecture seule ou `Voting` [126] [123] |
| `Generator-Verifier` | Boucle bornée générateur + critique isolé [126] [128] | Multiplié par `k ≤ max_iterations` [128] | Faux positifs (`FM-3.3`) et stagnation [125] | Code, contrats et livrables à exigence critique [126] [128] |

*Tableau 7.2 — Matrice comparative des topologies d’orchestration : contrôle, profil économique, risques et cas d’usage.*

> **Arbitrage EA / SA** — Exiger un plafond d’itérations (`max_iterations`) et un test de stagnation sur toute boucle `Generator-Verifier`, une politique de quorum et un `timeout SLA` sur tout `Scatter-Gather`, et interdire les `Group Chats` dépassant trois agents [128] [131] [141]. Le `SA` place la vérification déterministe avant le juge cognitif et filtre les historiques de `Handoff` via `input_filter` [126] [140]; l’`EA` impose une escalade `HITL` en cas de non-convergence sur les processus à effet externe [128] [135].

## 7.4 Ingénierie des transferts d’état : passage par référence (Artifact URI) et prévention du Goal Drift

Une topologie bien choisie échoue néanmoins en production si la mécanique d’échange de données entre nœuds propage des charges brutes d’agent en agent. La copie répétée de messages et de documents volumineux provoque simultanément l’explosion des coûts, l’étouffement du signal utile et la dérive progressive du mandat initial (*Goal Drift*) [127] [137] [143].

### 7.4.1 Le jeu du téléphone arabe : passage par valeur contre Claim-Check et Artifact URI

Anthropic documente un écueil classique des architectures coordonnées : lorsque les sous-agents renvoient leurs productions intégrales au coordinateur qui les reformule ensuite vers l’étape aval, l’information subit l’effet du « jeu du téléphone arabe » (*game of telephone*), altérant chiffres, citations et nuances tout en multipliant les jetons consommés [127].

Le remède consiste à appliquer aux graphes d’agents le patron distribué **Claim-Check** [144], concrétisé par le service `Artifacts` de Google ADK [145] et par le dépôt externe recommandé par Anthropic [127]. Ce mécanisme s’articule en quatre étapes [127] [144] [145] :

1. **Externalisation versionnée** : le nœud producteur écrit le contenu volumineux ou binaire dans un magasin d’artefacts (`BaseArtifactService` ou stockage objet chiffré `GcsArtifactService`) cloisonné par espace de noms de session ou d’utilisateur, générant automatiquement une nouvelle version à chaque écriture sur un même nom de fichier [144] [145].
2. **Circulation d’une référence légère (**`Artifact URI`**)** : l’état partagé du graphe (`StateGraph`) ne reçoit qu’un pointeur logique (par exemple une référence structurée identifiant espace de noms, nom et version), accompagné d’une empreinte d’intégrité, du type `MIME` et d’un résumé concis [144] [145].
3. **Chargement ciblé à la demande** : le nœud aval décide quels artefacts charger via un outil dédié (`LoadArtifactsTool` ou lecture par plages), préservant les nœuds intermédiaires de tout transfert superflu [145] [137].
4. **Gouvernance du cycle de vie (**`TTL` **et** `ACL`**)** : conformément aux contreparties du patron `Claim-Check`, le magasin externe applique des politiques de rétention, d’expiration (`TTL`) et de contrôle d’accès par identité afin qu’aucune référence interceptée n’ouvre un accès indu [144] [145].

Trois plans doivent ainsi rester strictement distincts : l’`Artifact URI` interne véhicule les charges métier volumineuses entre nœuds d’une même orchestration; l’`Artifact` du protocole `A2A` (chapitre 5) encadre la livraison externe inter-domaines; et le journal d’événements du moteur durable (chapitre 9) enregistre uniquement les métadonnées légères requises pour la reprise déterministe.

### 7.4.2 Économie du contexte inter-nœuds : compaction, just-in-time retrieval et filtrage d’historique

L’ingénierie du contexte inter-nœuds vise à préserver le budget d’attention fini du modèle face au *context rot*, c’est-à-dire la baisse de rappel exact lorsque la fenêtre grandit [137]. Liu et ses coauteurs (*Lost in the Middle*) montrent que cette dégradation suit une courbe en U : les modèles exploitent fidèlement l’information située au tout début (primauté) ou à la toute fin (récence) du contexte, mais échouent fréquemment lorsque l’information déterminante se trouve enfouie au milieu, même sur les modèles à longue fenêtre [146].

Pour préserver une densité d’information élevée entre nœuds, le `SA` combine trois leviers [140] [137] :

- **Filtrage explicite des passations** : projeter uniquement les champs d’état nécessaires sur les arêtes `StateGraph` [133] ou configurer `input_filter` (`HandoffInputData` [140]) lors des `Handoffs` afin d’élaguer les traces exploratoires d’outils amont.
- **Compaction et prise de notes hors fenêtre** : condenser périodiquement l’historique croissant tout en externalisant décisions, contraintes et références d’artefacts dans une note structurée persistante [137].
- **Récupération juste-à-temps** : ne conserver dans l’état circulant que des identifiants légers (chemins, requêtes, `Artifact URI`) et récupérer à la demande les fragments pertinents [137].

### 7.4.3 Anatomie et prévention du Goal Drift et des cascades de détournement

Sur des trajectoires prolongées, les agents subissent un phénomène mesuré par Arike et ses coauteurs sous le nom de **Goal Drift** : exposés à des pressions environnementales et des sous-objectifs concurrents, ils s’écartent graduellement du mandat assigné dans l’invite système [143]. Bien que les meilleurs échafaudages conservent une forte fidélité au-delà de 100 000 jetons, **tous les modèles évalués finissent par dériver**, et cette dérive est directement corrélée à une sensibilité accrue aux comportements d’imitation locale (*pattern-matching*) à mesure que le contexte s’allonge [143].

Lorsque cette fragilité rencontre des données externes adverses ou non vérifiées dans un graphe multi-agents, elle ouvre la voie à deux risques critiques de l’`OWASP Top 10 for Agentic Applications 2026` : `ASI01` **(Agent Goal Hijack)**, où des entrées détournent l’objectif de planification, et `ASI08` **(Cascading Failures)**, où un écart ou une compromission locale se propage à vitesse machine d’agent en agent [135].

> **[Figure]**
> - Flux d'orchestration et transfert d'état gouverné
> - [container]
> - «component» Agent Émetteur
> - [Contexte isolé]
> - Produit un livrable
> - ou résultat massif
> - «component» Enveloppe typée
> - [StateGraph / JSON]
> - Artifact URI, résumé,
> - Goal Pin immuable
> - «component» Contrôleur anti-dérive
> - [Instruction Hierarchy]
> - Ancre primauté/récence,
> - filtre entrées tierces
> - «component» Agent Récepteur
> - [Contexte minimal]
> - Charge à la demande
> - les extraits requis
> - «container» Artifact Store (Claim-Check / GCS)
> - [Stockage gouverné]
> - Blobs versionnés, ACL par
> - locataire, empreinte SHA-256 et politique
> - TTL
> - 3. Met à jour état (sans payload brut)
> - 4. Applique hiérarchie et vérifie mandat
> - 5. Transmet enveloppe compacte ancrée
> - 1. Écrit payload volumineux
> - 2. Retourne URI + version
> - 6. Lit extraits ciblés (juste-à-temps)

*Fig. 28. – Transfert d’état par référence via Artifact URI et contrôleur anti-dérive Goal Pinning*

La prévention de ces dérives repose sur quatre défenses structurelles intégrées à l’orchestrateur [143] [146] [147] [135] :

1. **Ancrage du mandat aux extrémités (**`Goal Pinning`**)** : exploiter la courbe en U de *Lost in the Middle* [146] en maintenant le contrat d’objectif immuable (mandat métier, seuils autorisés, critères d’arrêt) hors de l’historique conversationnel mutable et en le réinjectant en tête système et en fin immédiate de contexte avant chaque décision d’action [143] [146].
2. **Hiérarchie stricte des instructions (**`Instruction Hierarchy`**)** : appliquer les principes de Wallace et al. (OpenAI) en distinguant hiérarchiquement consignes développeur, requêtes utilisateur et données tierces (retours d’outils, artefacts et messages de pairs) afin que les données ne puissent jamais surclasser le mandat privilégié [147] [135].
3. **Validation typée des enveloppes inter-nœuds** : imposer des schémas structurés (`input_type`, `JSON Schema`) sur tout transfert d’état et rejeter les champs textuels libres susceptibles de redéfinir le rôle du nœud aval (`MAST FC1`) [125] [140].
4. **Séparation planification/exécution et coupe-circuits SRE** : conformément aux recommandations de l’OWASP [135], soumettre toute action irréversible issue du graphe à une porte de politique déterministe (les *Intent Gates* `OPA` /`Cedar` et identités `NHI` /`SPIFFE` du chapitre 10) et appliquer des plafonds stricts de profondeur de délégation et de budget [135].

| Mécanisme d’ingénierie | Problème résolu | Garanties SA | Exigences EA / Audit |
| --- | --- | --- | --- |
| `Claim-Check` / `Artifact URI` | Effet « téléphone arabe » [127] et surcharge de bus [144] | Enveloppes d’état légères, versionnement [145] et lecture ciblée | Cloisonnement session/locataire, intégrité et `TTL` [144] [145] |
| `input_filter` et compaction | *Context rot* [137] et pollution inter-nœuds (`FC1`) [125] | Élagage des traces d’outils et maintien d’un signal compact [140] [137] | Traçabilité des filtres appliqués pour audit `EvalOps` |
| `Goal Pinning` (primauté/récence) | Imitation locale et `Goal Drift` en contexte long [143] [146] | Mandat immuable hors fil mutable, ancré aux deux bornes [146] | Imputabilité explicite du mandat validé par l’*Agent Owner* |
| `Instruction Hierarchy` + validation | Détournement `ASI01` et cascades `ASI08` [147] [135] | Isolation données vs consignes et plafonds de profondeur [147] [135] | Blocage déterministe avant mutation des `SoR` [135] |

*Tableau 7.3 — Patrons d’ingénierie des transferts d’état et mesures de prévention du Goal Drift.*

> **Arbitrage EA / SA** — Interdire le passage par valeur de charges volumineuses entre agents; imposer le patron `Claim-Check` (`Artifact URI` versionné avec `TTL` et `ACL`) couplé à l’ancrage d’objectif `Goal Pinning` hors historique mutable [127] [144] [145] [143]. Le `SA` filtre les passations (`input_filter`), applique l’*Instruction Hierarchy* aux retours de pairs et déréférence les artefacts juste-à-temps [140] [137] [147]; l’`EA` exige la journalisation d’intégrité des artefacts et le passage de toute écriture finale par un contrôle déterministe hors fenêtre cognitive [135].

## Synthèse architecturale et transition vers le chapitre 08

La composition multi-agents obéit à une règle d’économie stricte : démarrer par un agent unique outillé optimisé (`Skills`, `ReWOO`, workflow déterministe), n’escalader que sur preuve de contrainte de parallélisme de lecture, d’isolation de privilèges ou de vérification contradictoire, privilégier les graphes dirigés (`Séquentiel typé`, `Routeur`, `Supervisor` à sous-agents isolés, `DAG`), borner rigoureusement les topologies collaboratives (`Handoff`, `Scatter-Gather`, `Generator-Verifier`) et ne faire circuler entre nœuds que des enveloppes légères par `Artifact URI` protégées contre le `Goal Drift` [126] [124] [125] [144] [143].

Toutes ces topologies supposent néanmoins la présence d’un graphe ou d’un coordonnateur pilotant la séquence de bout en bout. Lorsque l’entreprise doit découpler des domaines réagissant en continu à des flux d’événements métier asynchrones sans chef d’orchestre synchrone, ce modèle atteint ses limites. Le chapitre 8 aborde donc la chorégraphie réactive et l’`Event Mesh` d’entreprise, avant que le chapitre 9 ne traite la persistance transactionnelle et l’exécution durable.

# Chapitre 8 — Chorégraphie réactive et Event Mesh d’entreprise

Le passage de la coordination par graphe d’état (chapitre 7) à l’exécution continue sur les flux opérationnels transforme la gestion du temps dans le système d’information. Tant qu’un système multi-agents demeure déclenché par une requête synchrone issue d’un `System of Engagement (SoE)` ou d’une API `A2A` point-à-point, la chaîne d’exécution reste prisonnière d’un couplage temporel : chaque saut cognitif bloque l’appelant en attente de la réponse suivante, amplifie la latence de queue et propage la moindre défaillance d’aval [148] [149] [150]. Or, la majorité des processus critiques — détection de fraude, triage d’incidents, rapprochement logistique, traitement de réclamations — naissent de flux continus d’événements métier plutôt que de dialogues interactifs isolés [148] [151].

Pour absorber ces flux sans ériger un monolithe distribué fragile, l’entreprise agentique s’appuie sur un **maillage événementiel (**`Event Mesh`**)** et sur une **chorégraphie réactive** encadrée [148] [149] [152]. Les agents y deviennent des consommateurs ambiants éveillés par des événements normalisés qui circulent sur un réseau de courtiers découplés [148] [153] [149]. Ce changement de régime impose une double discipline. En architecture d’entreprise (**EA**), il faut délimiter la frontière entre autonomie réactive des domaines métier et imputabilité réglementaire des processus transverses, tout en contenant l’exposition financière liée aux cascades d’inférence [154] [155] [156]. En architecture de solutions (**SA**), il faut gouverner les enveloppes et contrats asynchrones, choisir le substrat de courtage adapté et déployer des coupe-circuits contre quatre pathologies réactives propres aux agents probabilistes : tempêtes d’événements, boucles d’écho sémantiques, engorgement des files de lettres mortes (`DLQ`) et rupture de contre-pression face aux quotas `LLM` [157] [158] [159] [160] [161]. Ce chapitre traite le transport événementiel et la chorégraphie ; la reprise sur panne par rejeu déterministe et les Sagas compensatoires relèvent du chapitre 9.

## 8.1 Agents ambiants déclenchés par événements : Kafka, Solace, NATS, CloudEvents et AsyncAPI

### 8.1.1 Du déclenchement à la demande aux agents ambiants sur flux continus

Un agent ambiant est un acteur cognitif — encapsulé dans son `Agent Harness` (chapitre 3) — dont l’activation répond en continu aux messages publiés sur un maillage événementiel plutôt qu’à un appel synchrone [153] [149] [151]. En consommant les faits opérationnels au fil de l’eau, l’agent réduit l’écart entre l’événement métier et l’action tout en préservant le découplage entre producteurs et abonnés [148] [149]. Toutefois, l’évaluation en simulation contrôlée menée par Dhanyamraju et al. sur 208 scénarios et 393 événements montre que le passage d’une cohorte restreinte (`Persona`, moins de 10 agents) à une échelle `Department` (20 à 80 agents) puis `Enterprise` (200 agents) dégrade les scores de sélection en raison d’un espace de découverte plus confus et d’événements concurrents [151].

À l’instar des systèmes distribués analysés par Martin Fowler, le qualificatif « orienté événements » recouvre des sémantiques distinctes qu’il faut dissocier avant toute conception agentique [162] :

1. **Notification événementielle (**`Event Notification`**)** : le producteur émet un signal léger constatant un changement d’état minimal, obligeant l’agent abonné à rappeler la source (par exemple via une passerelle `MCP`) pour obtenir le contexte complet [162]. Cette option limite l’exposition de données sur le bus mais réintroduit un couplage de disponibilité sous rafale.

2. **Transfert d’état porté par l’événement (**`Event-Carried State Transfer`**)** : l’enveloppe embarque la projection métier utile à l’agent, supprimant tout rappel synchrone vers le `System of Record (SoR)` au prix d’une duplication maîtrisée et d’une gouvernance stricte des schémas [162].
3. **Tableau noir sur journal partagé (**`Event-Driven Blackboard`**)** : les agents lisent et publient leurs contributions incrémentales sur des topics partagés formant une mémoire collective rejouable à court terme, sans échanges point-à-point [149] [150].

Le choix entre ces modalités détermine la résilience du maillage : la notification légère convient aux données hautement sensibles restreintes au domaine source, tandis que le transfert d’état porté protège les `SoR` patrimoniaux contre les rafales de lectures agentiques et fournit une piste d’audit rejouable [149] [150] [162].

### 8.1.2 Substrats de courtage : Apache Kafka, Solace Event Mesh et NATS JetStream

L’infrastructure d’`Event Mesh` s’articule autour de trois substrats majeurs dont les garanties d’ordonnancement, de routage et de régulation répondent à des profils d’entreprise distincts.

**Apache Kafka** constitue la dorsale privilégiée pour les journaux partitionnés à forte rétention et les traitements rejouables [149] [150]. Par le partitionnement sur clé, un processeur de flux tel qu’`Apache Flink` maintient l’état contextuel et distribue des tâches ordonnées vers des agents travailleurs tout en conservant l’historique complet [149] [150]. Sur le plan opérationnel, la référence `Kafka 4.1` met en évidence deux leviers critiques pour les nœuds `LLM` lents : `max.poll.interval.ms` (`300000` ms par défaut, soit cinq minutes) plafonne le délai maximal entre deux appels à `poll()` avant que le consommateur ne soit jugé défaillant et ne provoque un rééquilibrage du groupe, tandis que `max.poll.records` (`500` par défaut) borne le lot livré par appel [157]. L’usage de `group.instance.id` stabilise l’appartenance lors des redémarrages transitoires et `read_committed` isole les lectures transactionnelles [157].

**Solace PubSub+ Event Mesh** fédère un réseau de courtiers interconnectés à travers centres de données sur site, nuages publics ou privés et périphérie (`edge`) afin de distribuer dynamiquement les événements d’une application à toute autre sans codage en dur des chemins [148]. Adossé à ce maillage, `Solace Agent Mesh` structure les agents en microservices asynchrones exécutés sur un moteur `Go` extensible par outils `Python` ou `Go` isolés : des `Entrypoints` assurent authentification et contrôle d’accès, les agents délèguent des tâches en mode asynchrone selon `A2A` sur les sujets du courtier et invoquent des outils `MCP` confinés, permettant une mise à l’échelle horizontale indexée sur le volume de messages plutôt que sur le nombre d’agents [153].

**NATS JetStream** privilégie la légèreté, le routage par sujets hiérarchiques et le contrôle de flux explicite vers la périphérie [158]. Sous politique de rétention `WorkQueue`, chaque message n’est conservé dans le flux que jusqu’à l’acquittement du premier consommateur qui le retire pour l’ensemble du pool, tout en gardant les limites de taille comme filet de sécurité [163]. Les travailleurs utilisent des consommateurs en tirage (`pull consumers`) avec acquittement explicite (`AckPolicy.Explicit`, `Nak` et plafond `MaxDeliver` pour borner les relivraisons) [164], en choisissant `fetch` (lots bornés par `batch` et `expires`) ou `consume` (flux continu), ainsi que `max_bytes` pour plafonner l’empreinte mémoire [158]. Surtout, `MaxAckPending` (`1000` par défaut) borne globalement les messages en vol non acquittés sur l’ensemble du pool, offrant une contre-pression native côté serveur [158].

> **[Figure]**
> - Producteurs et Contrats
> - [system] Event Mesh d'entreprise
> - [system]
> - Agents ambiants
> - découplés
> - [system]
> - «container» Systems of Record
> - & CDC [Debezium / API]
> - Émet les faits métier en CloudEvents v1.0.2
> - «container» Catalogue AsyncAPI 3.0
> - & Schema Registry
> - [Contrats versionnés]
> - Valide canaux, actions
> - et en-têtes ce_\*
> - «container» Dorsale Kafka [Journal partitionné]
> - Rétention longue, compactage et replay
> - «container» Courtiers Solace
> - [Maillage multi-sites]
> - Routage dynamique
> - sur Event Mesh
> - «container» NATS JetStream
> - [Pull / WorkQueue]
> - Périphérie et files à contre-pression
> - «container» Agent Triage
> - [Agent Harness]
> - Filtre ce_type et planifie sous quota
> - «container» Agent Conformité
> - [Agent Harness]
> - Consomme par groupe
> - ou file bornée
> - «container» MCP Gateway locale
> - [Outils typés]
> - Exécute les actions idempotentes sur SoR
> - CloudEvent (ce_\*)
> - Stream / poll
> - Abonnement
> - Contrats Fédère
> - Ponte Isole
> - Outils (MCP)
> - Sujet hiérarchique
> - Pull / MaxAckPending

*Fig. 29. – Topologie C4 d’un Event Mesh d’entreprise alimentant des agents ambiants*

### 8.1.3 Enveloppes normalisées (`CloudEvents v1.0.2`) et contrats asynchrones (`AsyncAPI 3.0`)

Sans contrat partagé, un maillage reliant `Kafka`, `Solace` et `NATS` sombre dans l’hétérogénéité des en-têtes. La normalisation repose sur `CloudEvents v1.0.2` pour l’enveloppe de transport et sur `AsyncAPI 3.0.0` pour la description exécutable des interfaces [165] [166].

La spécification `CloudEvents v1.0.2` de la `CNCF` impose quatre attributs de contexte obligatoires en minuscules ASCII alphanumériques (`id`, `source`, `specversion`, `type`) et des attributs optionnels normalisés (`datacontenttype`, `dataschema`, `subject`, `time`), complétés par des extensions [165]. Les intermédiaires inspectent et routent ainsi l’enveloppe sans désérialiser la charge utile `data` [165]. Sur `Apache Kafka` (`kafka-protocol-binding`), le mode par lots est exclu et deux modes coexistent [167] :

- **Mode binaire (**`Binary Content Mode`**)** : la donnée brute `data` forme la valeur Kafka tandis que les attributs et extensions `CloudEvents` sont encodés en UTF-8 dans des en-têtes préfixés `ce_` (`ce_id`, `ce_type`, `ce_source`, `ce_specversion`), avec correspondance directe entre `content-type` et `datacontenttype` [167].
- **Mode structuré (**`Structured Content Mode`**)** : enveloppe et charge utile sont sérialisées ensemble dans la valeur de l’enregistrement, préservant la portabilité intégrale lors de transitions multi-protocoles [167].

En complément, **AsyncAPI 3.0.0** découple structurellement les `Channels` (adresses et schémas de messages admis) des `Operations` (`action: send` ou `receive` pointant par `$ref` vers le canal), tout en formalisant `Operation Reply`, `Correlation ID` et `Multi Format Schema` [166]. Ce découplage permet au catalogue `EA` d’enregistrer plusieurs agents abonnés sur un même canal sans dupliquer sa topologie, tandis que les liaisons officielles encapsulent la configuration de chaque courtier :

- **Kafka (**`0.5.0`**)** : `schemaRegistryUrl` et `schemaRegistryVendor` (`confluent`, `apicurio`, `ibm`, `karapace`) sur le serveur ; `topic`, `partitions`, `replicas` et `topicConfiguration` sur le canal ; `groupId` sur l’opération [168].
- **Solace (**`0.4.0`**)** : `msgVpn` et `clientName` sur le serveur, objet canal vide réservé pour usage ultérieur, et `destinations` (`topic` ou `queue`, `deliveryMode` `direct` ou `persistent`) sur l’opération [169].
- **NATS (**`0.1.0`**)** : objets serveur, canal et message neutres, et champ `queue` (≤ 255 caractères) sur l’opération pour documenter le groupe de répartition [170].

| Critère technique | Apache Kafka (`4.1`) | Solace PubSub+ (`Event Mesh`) | NATS JetStream (`2.15`) |
| --- | --- | --- | --- |
| Topologie native | Journal partitionné distribué et ordonné par clé | Maillage de courtiers interconnectés multi-sites [148] | Bus léger à sujets hiérarchiques et flux `JetStream` |
| Routage et filtrage | Topics, partitions et processeurs de flux (`Flink`) [150] | Sujets hiérarchiques et routage dynamique d’abonnements [148] | Sujets hiérarchiques avec jokers et files de travail |
| Rétention et rejeu | Longue durée configurable, compactage et rejeu d’offsets | Persistance par files selon abonnements et modes de livraison | `Limits`, `Interest` ou `WorkQueue` (purge à l’`Ack`) [163] |
| Régulation consommateur | `max.poll.records`, `max.poll.interval.ms` (`300000` ms) [157] | Files persistantes isolées et équilibrage par message [153] | Pull `fetch` /`consume`, `MaxAckPending` (`1000`), `max_bytes` [158] |
| Enveloppe `CloudEvents` | Mode binaire (`ce_*` UTF-8) ou mode structuré [167] | Attributs portés sur propriétés ou charge utile du sujet | En-têtes NATS ou charge JSON structurée |
| Liaison `AsyncAPI 3.0` | `schemaRegistryUrl`, `partitions`, `topicConfiguration`, `groupId` [168] | `msgVpn`, `clientName` (serveur), `destinations` (opération) [169] | `queue` (≤ 255 car.) sur l’objet opération [170] |
| Cas d’emploi cible | Dorsale analytique, mémoire partagée (`Blackboard`), `Flink` [149] | Fédération hybride multi-nuages, `Agent Mesh` `A2A` /`MCP` [148] [153] | Périphérie (`edge`), pools `WorkQueue` et faible empreinte [158] [163] |

*Tableau 8.1 — Comparatif architectural des substrats événementiels et liaisons AsyncAPI pour agents ambiants.*

> **Arbitrage EA / SA** — Imposer l’enveloppe `CloudEvents v1.0.2` (mode binaire `ce_*` sur `Kafka`) et la spécification `AsyncAPI 3.0.0` sur tout flux inter-agents transitant par l’`Event Mesh` [165] [167] [166]. L’`EA` interdit les canaux non enregistrés au catalogue et répartit les usages par rôle (`Kafka` pour le journal rejouable et le `Blackboard`, `Solace` pour le maillage multi-nuages et `Agent Mesh`, `NATS JetStream` pour la périphérie et les files `WorkQueue`) [148] [149] [163]. Le `SA` dimensionne `max.poll.records` /`max.poll.interval.ms` sous `Kafka` et `MaxAckPending` /`max_bytes` sous `JetStream` d’après la latence réelle d’inférence afin d’éviter rééquilibrages et saturation mémoire [157] [158].

## 8.2 Arbitrage architectural entre orchestration centralisée et chorégraphie décentralisée

### 8.2.1 Distinction sémantique fondatrice : événements contre commandes

De nombreux échecs d’intégration découlent d’une confusion entre **événement** et **commande** [155]. Comme le précisent Camunda et Martin Fowler, un événement constate un fait passé (`FactureEmise`, `SinistreDeclare`) diffusé sans connaissance des récepteurs ni attente d’action directe [162] [155]. Une commande exprime au contraire une instruction impérative adressée à un destinataire précis (`VerifierSolvabilite`), engageant une responsabilité d’exécution, un suivi de résultat et une gestion explicite des délais [155].

Lorsque des équipes modélisent un processus métier multi-étapes en pure chorégraphie, elles déguisent souvent des commandes en événements sur un bus partagé : chaque émetteur anticipe implicitement la réaction de l’abonné suivant sans qu’aucun composant ne détienne l’état consolidé [155]. Gregor Hohpe oppose à cette dérive le patron `Process Manager` : contrairement à un itinéraire figé dès l’émission (`Routing Slip`), le `Process Manager` maintient l’état courant du processus et détermine dynamiquement la commande suivante selon les résultats intermédiaires reçus [171]. Dans un système multi-agents, ce pilotage explicite devient d’autant plus nécessaire que les sorties cognitives sont non déterministes et requièrent des branchements conditionnels et une gestion de priorité [150] [151].

### 8.2.2 Forces et limites structurelles : de l’autonomie réactive à l’anti-patron « flipper »

La chorégraphie décentralisée offre des avantages indéniables dans un périmètre maîtrisé : elle supprime le point de défaillance unique d’un coordonnateur central, isole la mise à l’échelle de chaque consommateur et permet d’ajouter de nouveaux abonnés analytiques ou de surveillance sans modifier l’émetteur [152] [154]. Le patron `Blackboard` sur journal d’événements autorise ainsi plusieurs spécialistes à enrichir un cas en parallèle sans couplage direct [149].

En revanche, appliquée sans garde-fous à des chaînes métier longues ou multi-domaines, la chorégraphie dégénère vers l’anti-patron de la **machine à boules (**`Pinball Machine`**)** : les événements rebondissent entre agents sur le maillage sans propriétaire de bout en bout [152] [155]. Microsoft Azure Architecture Center, AWS Prescriptive Guidance et Camunda convergent sur quatre limites critiques [152] [154] [155] :

1. **Perte de visibilité bout-en-bout** : la logique du processus se disperse dans des abonnements et des consignes locales, rendant le suivi d’avancement et le débogage asynchrone coûteux [152] [155].
2. **Couplage sémantique caché** : malgré l’absence d’appels HTTP directs, l’évolution d’une séquence métier exige de modifier conjointement plusieurs services liés par des attentes implicites sur l’ordre des événements [155].
3. **Dépendances cycliques** : des composants réagissant mutuellement à leurs propres émissions forment des cycles difficiles à détecter statiquement [152].
4. **Dégradation de la précision à grande échelle** : la simulation contrôlée de Dhanyamraju et al. montre que la précision des appels dégrade lorsque le registre passe à 200 agents (`Enterprise`), alors que `DAG Plan & Execute` conserve une meilleure précision d’invocation tandis que `ReAct` obtient un meilleur rappel dans plusieurs conditions [151].

> **[Figure]**
> - A. Orchestration dirigée (Process
> - Manager explicite)
> - B. Chorégraphie pure non bornée
> - (Dérive « Pinball Machine »)
> - Déclencheur métier
> - Orchestrateur d'état (Process Manager)
> - Agent A (Extraction)
> - Agent B (Risque)
> - Agent C (Validation)
> - Événement initial
> - Event Mesh (Sujets partagés)
> - Agent X (Triage)
> - Agent Y (Enrichissement)
> - Agent Z (Décision)
> - 1. Démarre instance
> - 2. Commande corrélée
> - 3. Commande suivante
> - 4. Commande finale
> - Émet fait
> - Réagit
> - Ré-émet
> - Réagit
> - Ré-émet
> - Réagit
> - Écho implicite (boucle / état diffus)

*Fig. 30. – Contraste topologique entre orchestration dirigée et dérive « flipper » en chorégraphie pure*

### 8.2.3 Grille d’arbitrage multicritère EA / SA

Le choix architectural dépend donc du niveau de risque, de la traversée de frontières organisationnelles et du besoin de contrôle transactionnel [152] [154] [155]. Même sur une infrastructure `Kafka`, Confluent démontre l’intérêt d’introduire `Apache Flink` comme orchestrateur à état interprétant le contexte et routant dynamiquement les tâches afin d’éviter la communication anarchique tous-azimuts [149] [150]. Réciproquement, imposer un orchestrateur pour diffuser des faits vers des consommateurs analytiques indépendants rigidifie inutilement l’architecture [154].

| Critère d’arbitrage | Orchestration centralisée (`Process Manager`) | Chorégraphie décentralisée (`Event Mesh`) | Patron hybride cible (section 8.4) |
| --- | --- | --- | --- |
| Pilotage des échanges | Commandes explicites émises par un coordonnateur à état [171] [155] | Réaction autonome aux faits (`events`) diffusés sur courtier [152] [154] | Commandes macro inter-domaines ; événements bornés intra-domaine |
| Visibilité et audit (`EA`) | Élevée : état global, branchements et piste d’audit centralisés [154] [155] | Faible : logique fragmentée entre abonnés et journaux dispersés [152] [155] | Élevée sur les jalons réglementaires ; souple dans chaque domaine |
| Couplage organisationnel | Élevé si l’orchestrateur gère les détails internes des domaines | Faible initialement, mais couplage sémantique caché sur flux longs [155] | Contenu par frontière de domaine borné (*Bounded Context*) |
| Gestion des délais et erreurs | Native : délais contractuels (`SLA`), escalades et reprises [154] [155] | Complexe : exige corrélation distribuée et files `DLQ` par abonné [152] [159] | `SLA` portés au plan macro ; `DLQ` et réessais gérés localement |
| Élasticité aux rafales | Dépend du partitionnement de l’état de l’orchestrateur [150] [151] | Maximale par découplage temporel et file dédiée [148] [158] | Amortissement asynchrone aux deux niveaux sans blocage |
| Risque de dérive (`ASI08`) | Faible sous bornage des étapes de planification [156] [151] | Élevé en chaînes profondes ou boucles récursives `LLM` [152] [161] | Maîtrisé par `TTL` intra-domaine et gouvernance macro |
| Domaine d’application | Flux multi-domaines réglementés, portes `HITL`, délais stricts [154] | Notifications multi-abonnés, enrichissement local simple [152] [154] | Référence cible pour l’entreprise agentique |

*Tableau 8.2 — Matrice décisionnelle : orchestration centralisée, chorégraphie décentralisée et patron hybride.*

> **Arbitrage EA / SA** — Rejeter en revue d’architecture (`ARB`) toute chorégraphie pure pour les processus franchissant plusieurs domaines métier ou soumis à des exigences d’audit réglementaire, de `SLA` ou d’approbation humaine [152] [154] [155]. L’`EA` exige qu’un `Process Manager` identifiable porte la traçabilité bout-en-bout des flux critiques ; le `SA` réserve la chorégraphie pure à la diffusion d’événements vers des consommateurs indépendants ou aux collaborations internes d’un domaine maîtrisé par une équipe unique [171] [154].

## 8.3 Pathologies réactives : tempêtes d’événements, boucles d’écho sémantiques, DLQ et backpressure LLM

Contrairement aux microservices déterministes dont le coût unitaire reste marginal et l’exécution sub-seconde, un agent `LLM` combine latence multi-seconde, consommation variable de jetons et interprétation probabiliste capable d’émettre de nouveaux messages [156] [161]. Quatre pathologies réactives doivent être prévenues de manière déterministe dans la couche transport et le harnais.

### 8.3.1 Tempêtes d’événements, cascades grégaires et détection précoce

Une **tempête d’événements** éclate lorsqu’un déclencheur unique provoque une ramification exponentielle de sous-événements entre agents réactifs [149] [156]. Cette amplification mécanique est aggravée par une vulnérabilité propre aux modèles de langage : l’étude empirique d’Hashemi et al. montre que des populations d’agents `LLM` exposées aux choix cumulés de leurs pairs subissent des boucles de rétroaction endogènes, un comportement grégaire (`herding`) et des cascades divergentes nettement plus marqués que chez les humains, tout en peinant à s’autocorriger [161]. Ce mécanisme illustre la menace `ASI08` (*Cascading Agent Failures*) du référentiel `OWASP Top 10 for Agentic AI`, où un défaut initial ou un biais sémantique se propage à la vitesse machine avant toute supervision humaine [156].

La surveillance limitée au contenu textuel de chaque message réagit trop tard. Luo et al. démontrent que dans les cascades multi-agents, les échanges initiaux restent sémantiquement fluides et conformes en apparence tandis que la géométrie du graphe d’interaction se déforme déjà en redondance et goulets d’étranglement ; en mesurant la courbure discrète d’Ollivier–Ricci (`ORC`) couplée aux signaux sémantiques, leur cadre détecte ces anomalies structurelles plusieurs tours avant la violation explicite et identifie l’agent ou le lien déclencheur [172]. Sur le plan opérationnel, Dhanyamraju et al. établissent qu’un gestionnaire de tâches léger (`Task Manager`) pratiquant inférence de priorité, fusion d’événements corrélés et préemption réduit de 14 à 75 % la latence de queue prioritaire et améliore de plus de vingt points la complétude sur événements liés à l’échelle `Enterprise` [151].

### 8.3.2 Boucles d’écho sémantiques : garde-fous protocolaires de corrélation et de TTL

La **boucle d’écho sémantique** survient lorsque deux ou plusieurs agents se renvoient des reformulations sur un sujet partagé : l’agent A publie une analyse, l’agent B l’interprète comme une sollicitation et publie un complément paraphrasé, puis l’agent A — sans conscience causale hors contexte — réagit à sa propre production déguisée [152] [161]. Sans borne déterministe, cette boucle alimente une dérive hors mandat (`ASI10`, *Rogue Agents*) et consomme le budget d’inférence en continu [156].

L’`Agent Harness` neutralise ces cycles avant même d’invoquer le modèle grâce à quatre attributs d’extension `CloudEvents` (`ce_*` sous Kafka) reliés à `Correlation ID` d’`AsyncAPI 3.0.0` [165] [166] :

1. **Corrélation et causalité (**`ce_correlationid`**,** `ce_causationid`**)** : rattachent tout événement dérivé à son événement racine pour tracer le graphe causal hors modèle [166].
2. **Compteur de sauts et plafond configurable (**`ce_hopcount` **/** `ce_ttl`**)** : le harnais incrémente `ce_hopcount` de manière déterministe à chaque ré-émission et déroute immédiatement vers la `DLQ` tout message dont `ce_hopcount > ce_ttl` selon le plafond certifié pour le domaine [156].
3. **Identité d’origine et déduplication (**`ce_originagent`**,** `ce_idempotencykey`**)** : bloque l’auto-consommation directe sur un canal bidirectionnel et rejette les empreintes causales déjà traitées.
4. **Ségrégation des canaux d’entrée et de sortie** : interdit à tout agent de s’abonner au canal sur lequel il publie ses verdicts [152].

### 8.3.3 Isolation des poisons sémantiques : DLQ, topics de réessai non bloquants et piège de `max.poll.interval.ms`

Une charge malformée, une sortie violant le contrat `AsyncAPI` ou un événement provoquant une exception systématique forme un poison (*poison pill*) qui paralyse une partition s’il bloque les tentatives sur place [159]. Confluent formalise quatre patrons progressifs de gestion d’erreurs sous `Kafka` [159] :

1. **Arrêt sur erreur (**`Stop on error`**)** : interrompt immédiatement le traitement lorsqu’aucune perte d’ordre n’est acceptable, notamment sur les flux `CDC` alimentant des projections `SoR` (chapitre 4) [159].
2. **File de lettres mortes (**`Dead Letter Queue`**,** `DLQ`**)** : déroute vers un topic d’erreur les messages irrécupérables tout en laissant le flux principal progresser, en enrichissant les en-têtes (topic d’origine, cause, horodatage) pour le diagnostic [159].
3. **Topic de réessai différé (**`Retry Topic`**)** : isole les conditions récupérables (dépendance absente ou indisponibilité temporaire) vers un topic séparé traité périodiquement par des instances dédiées, préservant ainsi la cadence du consommateur principal [159].
4. **Préservation d’ordonnancement sur redirection** : maintient l’ordre relatif des événements d’une même entité afin qu’un message postérieur ne dépasse pas un prédécesseur redirigé en réessai [159].

L’oubli de cette séparation devient fatal face aux temps de réponse `LLM`. Sous `Apache Kafka 4.1`, `max.poll.interval.ms` (`300000` ms par défaut) déclenche l’expulsion du consommateur et un rééquilibrage des partitions si `poll()` n’est pas rappelé dans le délai imparti [157]. Un agent tirant `500` messages (`max.poll.records` par défaut) et exécutant des appels `LLM` lents assortis d’attentes locales épuise cette fenêtre et provoque des tempêtes de rééquilibrage en chaîne [157]. La réduction stricte de `max.poll.records` pour les travailleurs cognitifs, le recours à `group.instance.id` et le déport des échecs transitoires vers des `Retry Topics` (ou sous `NATS JetStream` via `Nak` borné par `MaxDeliver`) garantissent la continuité du flux [157] [159] [164].

### 8.3.4 Backpressure LLM : découplage de cadence entre courtiers et inférence sous quotas de jetons

Un courtier événementiel absorbe des milliers de messages par seconde là où l’inférence `LLM` reste contrainte par la mémoire GPU et les quotas de jetons par minute (`TPM`). Selon le *Reactive Manifesto* et *Reactive Streams*, un système résilient remplace la poussée aveugle par une **contre-pression (**`backpressure`**)** non bloquante (formalisée par `Subscription.request(n)`), laissant les files d’attente en attente dans le courtier plutôt que de saturer la mémoire des travailleurs [173] [174].

Or, les mécanismes HTTP standards peinent à refléter ce goulot : l’IETF `draft-ietf-httpapi-ratelimit-headers-11` normalise `RateLimit-Policy` (`q`, `qu`, `w`, `pk`) et `RateLimit` (`r`, `t`, `pk`) pour anticiper les rejets `429`, mais ses unités normatives `qu` se cantonnent à `requests`, `content-bytes` et `concurrent-requests` [175]. Comme une requête d’agent varie fortement en taille d’invite et en volume généré, `Agent Router` (`Envoy AI Gateway`) introduit dans `AIGatewayRoute` le bloc `llmRequestCosts`, qui extrait `InputToken`, `CachedInputToken`, `OutputToken`, `TotalToken` ou des expressions `CEL` pour débiter un quota partagé dans `Redis` et déclencher HTTP `429` sur budget `TPM` [160]. Pour propager cette contrainte jusqu’au maillage, le `SA` combine trois mécanismes :

1. **Tirage borné sur le courtier** : utilisation de `pull consumers` `NATS JetStream` avec `MaxAckPending` calibré sur la capacité d’inférence concurrente et `max_bytes` borné, ou lots `max.poll.records` très réduits sous `Kafka` [157] [158].

2. **Réessai différé aligné sur** `RateLimit` **/** `Retry-After` : déport non bloquant vers un `Retry Topic` ou `Nak` temporisé plutôt qu’attente active sur le fil de consommation, en exploitant les valeurs `r` (quota restant) et `t` (fenêtre de réinitialisation) [159] [175] [164].
3. **Admission prioritaire par** `Task Manager` : fusion des événements corrélés et préemption avant inférence pour préserver le quota `TPM` sur les flux critiques [151].

> **[Figure]**
> - Courtier (Kafka / NATS)
> - Garde-fou Mesh
> - (TTL & Dédup)
> - Agent ambiant
> - (Pull borné)
> - Retry Topics
> - & DLQ
> - AI Gateway (Quota TPM / 429)
> - Courtier (Kafka / NATS)
> - Garde-fou Mesh
> - (TTL & Dédup)
> - Agent ambiant
> - (Pull borné)
> - Retry Topics
> - & DLQ
> - AI Gateway (Quota TPM / 429)
> - Lot borné (max.poll.records / batch)
> - Contrôle ce_idempotencykey
> - et ce_hopcount ≤ce_ttl
> - alt [Boucle d'écho ou saut > ce_ttl]
> - Isoler en DLQ (echo_loop_ttl)
> - Ack / Flux principal débloqué
> - [Événement admissible]
> - Message corrélé (ce_correlationid)
> - Requête inférence (quota TPM)
> - alt [Saturation GPU / TPM dépassé]
> - HTTP 429 + RateLimit (r=0, t)
> - Router vers Retry-Topic différé
> - Clore lot (< max.poll.interval.ms)
> - [Capacité disponible]
> - Réponse structurée + RateLimit (r, t)
> - Ack + CloudEvent (ce_hopcount + 1)

*Fig. 31. – Séquence de confinement des pathologies réactives : anti-écho, files de réessai non bloquantes et backpressure LLM*

| Pathologie réactive | Mécanisme déclencheur | Signal précoce | Contre-mesure `SA` | Garde-fou `EA` (`FinOps` / Risque) |
| --- | --- | --- | --- | --- |
| Tempête d’événements et cascade grégaire | Fan-out non borné et rétroaction endogène (`ASI08`) [156] [161] | Anomalie de courbure `ORC` et pic d’émissions dérivées [172] | Coupe-circuits par sujet, fusion d’événements et préemption [151] | Plafonds `TPM` par domaine et audit des graphes `AsyncAPI` [166] [160] |
| Boucle d’écho sémantique | Paraphrase mutuelle sans causalité ni borne (`ASI10`) [156] [161] | Répétition de `ce_correlationid` et hausse de `ce_hopcount` | Plafond `ce_hopcount ≤ ce_ttl`, dédup `ce_idempotencykey` [165] [166] | Certification `ARB` du `ce_ttl` maximal et interdiction de boucles ouvertes |
| Engorgement `DLQ` et rééquilibrage | Lot excédant la fenêtre `poll()` (`300000` ms) [157] [159] | Rééquilibrages en série et hausse du lag consommateur | `max.poll.records` réduit, `Retry Topics` et `DLQ` enrichie [157] [159] | `SLA` de traitement des `DLQ` et traçabilité des rejets [159] |
| Rupture de backpressure (`HTTP 429`) | Cadence courtier supérieure au quota `TPM` GPU [173] [160] | Chute de `r` dans `RateLimit`, hausse des `429` et backlog [175] | Pull `MaxAckPending`, réessai différé et `llmRequestCosts` [158] [160] | Quotas `TPM` cloisonnés par locataire et priorisation métier [160] [151] |

*Tableau 8.3 — Catalogue des pathologies réactives en Event Mesh agentique : mécanismes de défaillance et contre-mesures EA / SA.*

> **Arbitrage EA / SA** — Aucun agent ambiant ne doit rejoindre l’`Event Mesh` sans quatre verrous déterministes hors modèle : propagation `ce_correlationid` avec plafond `ce_ttl`, isolation des erreurs par `Retry Topics` et `DLQ` enrichie, tirage borné (`MaxAckPending` ou `max.poll.records` calibré) et limitation par jetons `TPM` à la passerelle [165] [157] [158] [159] [160]. L’`EA` impose une capacité d’isolement immédiat face aux dérives `ASI08` /`ASI10` [156] ; le `SA` proscrit toute boucle d’attente bloquante sur le fil `poll()` Kafka [157] [159].

## 8.4 Patron hybride cible : orchestration macro-réglementaire et chorégraphie intra-domaine

### 8.4.1 Inversion ciblée à l’ère agentique : pourquoi le macro-plan doit rester orchestré

Dans les architectures microservices déterministes inspirées du *Domain-Driven Design (DDD)*, il est courant de recommander la chorégraphie entre contextes bornés et l’orchestration à l’intérieur de chacun d’eux afin d’éviter un ESB central monolithique [155]. Toutefois, l’introduction d’acteurs cognitifs probabilistes dans des processus réglementés (octroi de crédit, triage clinique, conformité douanière ou financière) impose d’inverser cette répartition aux frontières critiques.

AWS Prescriptive Guidance rappelle que la chorégraphie convient lorsque l’équipe maîtrise toutes les dépendances dans son périmètre, tandis que les processus franchissant plusieurs frontières organisationnelles avec exigence de suivi d’état, de délais ou de contrôle d’erreur relèvent de l’orchestration [154]. Les résultats en simulation contrôlée confirment ce découpage : à l’échelle d’un petit groupe de spécialistes (`Persona`, moins de 10 agents), la réactivité locale reste précise, alors qu’à l’échelle `Enterprise` (200 agents), la confusion de découverte pénalise l’autonomie non encadrée face à une planification structurée (`DAG Plan & Execute`) [151].

Le **patron hybride cible** repose donc sur deux strates complémentaires :

1. **Orchestration macro-réglementaire inter-domaines** : un `Process Manager` dédié à une chaîne de valeur gouverne les transitions entre domaines distincts [171] [154]. Il émet des commandes typées (`AsyncAPI action: send`), veille au respect des `SLA`, déclenche les portes d’approbation humaine (`Human-in-the-Loop`) et consolide le journal d’audit réglementaire [166] [171] [155].
2. **Chorégraphie réactive bornée intra-domaine** : à l’intérieur d’un domaine géré par une même équipe produit et regroupant un nombre restreint d’agents spécialisés, l’exécution interne s’appuie sur un segment isolé de l’`Event Mesh` (par exemple `Kafka` + `Flink` ou un domaine `Solace Agent Mesh`), favorisant le parallélisme et l’enrichissement incrémental sans exposer les états intermédiaires hors du domaine [153] [150] [154] [151].

### 8.4.2 Contrat d’articulation inter-strates : commandes macro, jalons et frontière durable

Quatre règles d’interface maintiennent l’étanchéité entre les deux strates :

1. **Isolation des espaces de noms par domaine** : les sujets internes circulent dans des partitions ou `Message VPN` cloisonnés (`AsyncAPI` / `Solace`), interdisant à un domaine B de s’abonner aux événements internes intermédiaires d’un domaine A [169] [148].
2. **Frontière de traduction commande / jalon** : le `Process Manager` adresse uniquement l’`Entrypoint` ou le contrat public `AsyncAPI 3.0` du domaine par commande explicite, et ne reçoit en retour que des jalons consolidés au format `Event-Carried State Transfer` (`AnalyseTerminée`, `ConformitéValidée`) [166] [153] [162] [155].
3. **Bornage réactif interne** : chaque domaine applique intégralement les garde-fous de la section 8.3 (`ce_ttl` borné, déduplication `ce_idempotencykey`, `DLQ` locale et quota `TPM` dédié), empêchant toute tempête ou boucle interne de contaminer le plan macro [165] [159] [160] [156].
4. **Délégation de la reprise transactionnelle au chapitre 9** : le transport événementiel et ce patron hybride assurent le découplage de flux et la visibilité macro, mais ne remplacent pas un moteur de persistance d’état long. Dès qu’une orchestration macro doit survivre à des pannes en vol multi-jours, garantir un rejeu déterministe d’historique ou exécuter des compensations transactionnelles multi-`SoR`, la conception s’appuie sur l’`Exécution durable` et les Sagas du chapitre 9 [154] [155].

> **[Figure]**
> - Plan macro-réglementaire
> - [system]
> - Domaine A — Analyse
> - [system]
> - Domaine B — Conformité
> - [system]
> - «container» Orchestrateur de flux
> - réglementaire [Process Manager / SLA]
> - Détient l'état global, les jalons et la piste d'audit
> - «container» Porte HITL / Intent Gate
> - [Approbation & Audit]
> - Valide les seuils légaux et irréversibles
> - «container» Bus intra-domaine A
> - [Kafka / NATS]
> - Sujets privés (ce_ttl borné, DLQ locale)
> - «container» Agent Enrichisseur
> - [Agent Harness]
> - Réagit à DemandeOuverte
> - «container» Agent Évaluateur
> - [Agent Harness]
> - Émet jalon AnalyseTerminée
> - «container» Bus intra-domaine B
> - [Solace / Kafka]
> - Isolation par Message VPN / ACL
> - «container» Agent Contrôle KYC
> - [Agent Harness]
> - Vérification sous contrat
> - «container» MCP Gateway Domaine B
> - [Façade SoR]
> - Écriture idempotente sur System of Record
> - 3. Contrôle réglementaire
> - 1. Commande (AsyncAPI send)
> - Souscription
> - Événement interne
> - (hop + 1)
> - 2. Jalon AnalyseTerminée
> - 4. Commande engagement
> - Souscription
> - Outils (MCP)
> - 5. Jalon final DossierClôturé

*Fig. 32. – Topologie C4 du patron hybride cible : macro-orchestration réglementaire et chorégraphie intra-domaine*

> **Arbitrage EA / SA** — Retenir le patron hybride à deux strates comme standard d’entreprise pour toute chaîne de valeur agentique inter-domaines : orchestration macro-réglementaire explicite entre domaines et chorégraphie réactive bornée à l’intérieur de chaque domaine [171] [154] [155] [151]. L’`EA` garantit l’imputabilité réglementaire, le contrôle des portes humaines et l’allocation budgétaire `TPM` par domaine [160] [156] ; le `SA` préserve l’autonomie évolutive des équipes derrière des contrats `AsyncAPI 3.0` étanches, élimine les graphes « flipper » et arrime la reprise sur panne aux mécanismes durables du chapitre 9 [166] [152] [159].

## Synthèse et transition vers le chapitre 9

Un `Event Mesh` gouverné par `CloudEvents v1.0.2` et `AsyncAPI 3.0.0` affranchit l’entreprise agentique du blocage synchrone sur `Apache Kafka`, `Solace PubSub+` ou `NATS JetStream` [165] [166] [148] [158] [149]. Cette réactivité ne demeure fiable en production qu’en verrouillant ses quatre pathologies spécifiques — tempêtes d’événements, boucles d’écho sémantiques, engorgement `DLQ` sous `max.poll.interval.ms` et rupture de contre-pression `LLM` — et en combinant orchestration macro-réglementaire inter-domaines et chorégraphie bornée intra-domaine [157] [171] [154] [159] [160] [161].

Lorsque surviennent un redéploiement en plein vol, une indisponibilité prolongée de fournisseur d’inférence ou l’échec partiel d’une mutation déjà engagée sur un `System of Record`, le transport asynchrone de messages atteint toutefois ses limites. Le chapitre 9 prend alors le relais avec l’exécution durable (`Temporal`, `Restate`, `Dapr`), le *Transactional Outbox* et les Sagas compensatoires.

# Chapitre 9 — Exécution durable, gestion d’état transactionnel et résilience opérationnelle

Une topologie multi-agents structurée (chapitre 07) ou un maillage événementiel régulé (chapitre 08) ne garantit pas la fiabilité d’un processus métier dès que l’exécution dure plusieurs minutes, heures ou jours [176] [177]. Lorsqu’un `System of Agency` enchaîne appels `LLM`, invocations d’outils `MCP` et validations humaines, l’occurrence d’au moins une panne d’infrastructure devient quasi certaine [178] [176]. Conserver l’avancement de ces boucles en mémoire volatile expose l’entreprise à des reprises partielles opaques, à des doubles écritures dans les `Systems of Record` (`SoR`) et à la perte d’état lors des redéploiements [179] [176] [180].

Ce chapitre établit le socle d’exécution durable et de cohérence transactionnelle de la Partie III. Côté architecture de solutions (`SA`), il s’agit d’isoler le non-déterminisme derrière un journal d’exécution persistant, de garantir l’idempotence sans verrou distribué, d’orchestrer des Sagas compensatoires et de suspendre les attentes humaines sous `SLA` sans consommer de calcul [181] [182] [183] [184]. Côté architecture d’entreprise (`EA`), l’objectif est d’imposer l’auditabilité, de préserver l’intégrité comptable des `SoR` et d’éviter la dépendance critique à un fournisseur d’inférence unique [185] [186] [187]. Par frontière d’étanchéité, ce chapitre traite exclusivement de la fiabilité d’exécution, de la persistance de workflow et des Sagas : la mémoire cognitive relève du chapitre 06, l’instrumentation `OpenTelemetry` et les coupe-circuits `SRE` appartiennent au chapitre 11, tandis que le versionnement en vol et la topologie complète de l’`AI Gateway` sont traités au chapitre 13.

## 9.1 Modes de défaillance des boucles longues en mémoire volatile (`timeouts`, `429`, redéploiements)

### 9.1.1 La falaise de complexité des boucles agentiques

Dans les applications web classiques, les requêtes synchrones brèves limitent l’exposition aux redémarrages de nœuds [178] [179]. À l’inverse, l’utilité d’un agent d’entreprise augmente avec sa durée de raisonnement et le nombre d’outils sollicités [176]. À mesure que ces deux facteurs croissent, les boucles orchestrées en mémoire volatile franchissent une *falaise de complexité* (*complexity cliff*) [176].

Deux effets cumulatifs expliquent cette rupture [176]. D’une part, la probabilité qu’au moins une étape subisse un dépassement de délai, un rejet de quota ou une coupure réseau tend vers la certitude sur les chaînes multi-tours [178] [176]. D’autre part, lorsqu’un processus en mémoire vive échoue à mi-parcours, la perte du contexte intermédiaire force à relancer tout le traitement depuis l’origine, multipliant les coûts d’inférence et le risque d’effets de bord dupliqués [176] [180].

### 9.1.2 `Timeouts` réseau, coupures de flux `SSE` et propagation de délais

Chaque appel distant doit être borné par des délais d’expiration (`timeouts`) de connexion et de lecture afin d’éviter l’immobilisation prolongée de fils d’exécution, de connexions réseau et de mémoire jusqu’à l’épuisement du service [178]. Toutefois, les répartiteurs de charge et mandataires inverses d’entreprise imposent des plafonds synchrones courts, incompatibles avec des trajectoires agentiques combinant plusieurs passes d’inférence ou des modèles à raisonnement étendu.

En diffusion continue (*Server-Sent Events*, `SSE`), une réponse initiale `HTTP 200` masque parfois une erreur survenant au milieu du flux ou une coupure réseau avant l’achèvement complet [185] [180]. L’appelant se retrouve dans l’ambiguïté décrite par Stripe : il ignore si l’action distante a échoué avant exécution, réussi juste avant la coupure ou laissé un état partiel [180]. Faute de journal externe et de propagation de l’échéance globale (*deadline*), des tentatives de reprise non coordonnées entre couches empilées amplifient la charge sur un système déjà dégradé [178].

### 9.1.3 Saturation de débit (`429`, `503`), `Retry-After` et gigue aléatoire

Les API d’inférence appliquent des quotas multi-dimensionnels pour protéger leur capacité [185] [188]. La norme `RFC 6585` définit le code `429 Too Many Requests` accompagné d’un en-tête optionnel `Retry-After` et interdit la mise en cache de ces réponses [189]. Les fournisseurs répartissent ces plafonds selon les requêtes par minute (`RPM`), les requêtes par jour (`RPD`), ainsi que les jetons en entrée et en sortie (`ITPM`, `OTPM`, `TPM`), via un algorithme de seau à jetons (*token bucket*) réapprovisionné en continu [185] [188]. Des rafales brèves sur quelques secondes suffisent donc à provoquer un rejet même sous un débit moyen modéré [185].

Surtout, tous les rejets ne doivent pas être réessayés [185] [188]. Sur la plateforme Claude d’Anthropic, un dépassement de cadence retourne `429` (`rate_limit_error`) avec un en-tête `retry-after`, alors que l’atteinte d’un plafond budgétaire mensuel retourne également `429` mais avec le code `enforced_spend_limit_reached` et sans `retry-after`, rendant toute reprise automatique stérile [185]. De même, OpenAI distingue le code `slow_down` (`429`) lors d’une hausse de trafic trop abrupte du code `server_is_overloaded` (`503 service_unavailable_error`) [188].

Face aux erreurs transitoires, des reprises immédiates ou un recul exponentiel purement déterministe synchronisent les clients en échec et créent des vagues de congestion répétées [178] [190]. La pratique recommandée consiste à respecter prioritairement la temporisation `Retry-After`, à appliquer sinon un recul exponentiel plafonné (`cap`) et à y injecter une gigue aléatoire (*jitter*) afin d’étaler les nouvelles tentatives dans le temps [178] [188] [190].

### 9.1.4 Éphémérité des conteneurs : `SIGTERM`, `SIGKILL` et perte de pile

Les infrastructures conteneurisées aggravent la vulnérabilité des boucles non persistées [179]. Dans Kubernetes, les pods sont des entités éphémères : lors d’une mise à jour continue, d’une éviction ou d’une préemption de nœud, le plan de contrôle retire le pod des `EndpointSlices`, exécute l’éventuel crochet `preStop` et émet le signal `SIGTERM` [179]. Le compte à rebours `terminationGracePeriodSeconds` — fixé par défaut à **30 secondes** — démarre aussitôt [179]. Si une boucle agentique reste bloquée sur une inférence lente au-delà de cette fenêtre de grâce, le `kubelet` envoie `SIGKILL`, détruisant le processus ainsi que sa pile d’appels et les références de mutations déjà reçues, comme l’illustre la figure 9.1 [179] [176].

> **[Figure]**
> - Boucle Agent (Pod K8s volatile)
> - API Inférence (LLM Externe)
> - MCP Gateway
> - / SoR
> - Contrôleur K8s (RollingUpdate)
> - Boucle Agent (Pod K8s volatile)
> - API Inférence (LLM Externe)
> - MCP Gateway
> - / SoR
> - Contrôleur K8s (RollingUpdate)
> - 1. Saturation débit et tempête de reprises (sans gigue)
> - 1 POST /messages (Tour N, contexte en RAM)
> - 2 HTTP 429 rate_limit_error (Retry-After) ou 503 overloaded
> - Sans backoff ni gigue : reprises synchronisées des workers. Risque de timeout proxy HTTP 504.
> - 2. Éviction de pod et perte de pile en mémoire vive
> - 3 Mutation 1 : réserver inventaire (POST)
> - 4 HTTP 201 Réservation #R-402
> - 5 Tour N+1 : planifier facturation
> - 6 SIGTERM (déploiement / nœud préempté) Décompte terminationGracePeriodSeconds (30s)
> - Appel LLM en cours > 30s : le délai expire avant la fin du tour.
> - 7 SIGKILL (arrêt brutal du conteneur)
> - Pile d'appels, historique de session et reçu #R-402 perdus en RAM. La relance à zéro risque la double écriture.

*Fig. 33. – Anatomie des modes de défaillance d’une boucle agentique exécutée en mémoire volatile*

| Mode de défaillance | Déclencheur | Impact en mémoire volatile | Contre-mesure SA | Exigence EA |
| --- | --- | --- | --- | --- |
| Expiration ou coupure `SSE` | Délai passerelle ou perte de flux après `200` [178] [185] | Incertitude d’exécution et perte de contexte [180] | Découplage asynchrone et reprise sur journal [178] [181] | Interdiction des boucles synchrones longues depuis `SoE` [176] |
| Saturation `429` / `503` | Rafale `RPM` /`TPM`, `slow_down` ou surcharge [185] [188] | Tempêtes synchronisées et épuisement de fils [178] [190] | `Retry-After`, backoff plafonné avec *jitter* [178] [188] | Arrêt immédiat sur plafond budgétaire (sans reprise) [185] |
| Arrêt brutal (`SIGKILL`) | Déploiement ou préemption dépassant 30 s [179] | Perte de pile et risque de double écriture [179] [176] | État externalisé en moteur durable [179] [181] | Zéro perte de dossier lors des mises en production [176] |
| Reprises empilées | Couches applicatives réessayant en cascade [178] | Amplification multiplicative de charge [178] [180] | Reprise centralisée et clé d’idempotence [178] [182] | Politique unique de tentatives bornées par criticité [178] |

*Tableau 9.1 — Taxonomie des modes de défaillance en mémoire volatile et contre-mesures EA / SA.*

> **Arbitrage EA / SA** — Interdire le maintien de l’état d’avancement d’une boucle multi-étapes dans la mémoire volatile d’un pod ou d’une fonction sans serveur dès qu’interviennent des appels externes ou des mutations métier [179] [176]. Le `SA` supprime les reprises empilées entre couches, respecte `Retry-After` avec recul exponentiel plafonné et *jitter* sur les fautes transitoires, et interrompt immédiatement les erreurs budgétaires ou de validation [178] [185]. L’`EA` impose qu’aucun redéploiement courant ne détruise un dossier en cours d’instruction [179] [176].

## 9.2 `Durable Execution` (`Temporal`, `Restate`, `Dapr`) : journalisation déterministe, `replay` et `checkpointing`

### 9.2.1 Principes du `Durable Execution` : journalisation déterministe et `Replay`

Les moteurs d’exécution durable (`Durable Execution`) garantissent qu’un processus applicatif progresse jusqu’à complétion sans limite de durée imposée, malgré les pannes de travailleurs ou coupures réseau [181] [176] [191]. Leur mécanisme repose sur la journalisation immuable de chaque transition d’état avant le passage à l’étape suivante, couplée à un rejeu (*replay*) déterministe lors d’une reprise [181] [191].

Pour que le rejeu reconstitue exactement les variables locales sans dupliquer les effets de bord, le code orchestrateur doit respecter des **contraintes de déterminisme** strictes [190] [192]. À entrées et historique identiques, il doit produire la même séquence de commandes [190]. Il est donc proscrit d’exécuter directement dans le code de workflow des appels réseau, requêtes `LLM`, accès SQL, lectures d’horloge système ou tirages aléatoires non amorcés [190] [192]. Toute opération non déterministe est isolée dans une primitive dédiée (`Activity` ou `ctx.run`) dont la sortie sérialisée est inscrite au journal ; au rejeu, le moteur restitue cette sortie enregistrée sans ré-exécuter l’opération [181] [191] [192].

Ce journal transactionnel demeure distinct des mémoires cognitives du chapitre 06 : un résumé conversationnel ou épisodique ne doit jamais servir à reconstruire le curseur d’exécution d’un workflow [181] [193]. Quant aux techniques de compatibilité lors des mises à jour de code sur des instances dormantes (`Patching`, `Worker Versioning`), elles relèvent du cycle `GitOps` étudié au chapitre 13 [190].

### 9.2.2 `Temporal` : `Workflows`, `Activities`, `Task Queues` et `Heartbeats`

`Temporal` incarne l’architecture de référence à séparation stricte entre coordination et exécution externe [190] [181] :

1. **Les** `Workflow Definitions` portent la logique déterministe de boucle, d’embranchement et de reprise [190] [181]. Lors de leur exécution sur un travailleur, elles émettent des `Commands` (planifier une activité, démarrer un minuteur, signaler un workflow) que le serveur transforme en événements dans un journal immuable (`Event History`) [190] [181].
2. **Les** `Activities` exécutent le code non déterministe (appels `LLM`, requêtes `MCP`, écritures `SoR`) sur des travailleurs dédiés qui scrutent des files de tâches (`Task Queues`) en mode *pull* [190] [181] [176]. Chaque activité s’appuie sur une `RetryPolicy` déclarative gérée par le moteur [176].

Temporal fournit quatre temporisations complémentaires pour détecter finement les pannes d’activité [194] : `Schedule-To-Start` (attente en file), `Start-To-Close` (durée d’une tentative), `Schedule-To-Close` (enveloppe totale incluant les reprises) et `Activity Heartbeats` [194]. Sur une tâche longue, le travailleur émet des battements de cœur périodiques porteurs d’un curseur de progression : si le pod subit un `SIGKILL`, l’expiration du `Heartbeat Timeout` déclenche la relance immédiate sur un nœud sain à partir du dernier curseur enregistré [179] [194]. De plus, les `Durable Timers` gérés côté serveur permettent à un même travailleur d’attendre simultanément des millions de minuteurs sur des jours ou des mois sans consommer de ressources de calcul [177].

### 9.2.3 `Restate` : journalisation en ligne, `Virtual Objects` et exécution sans serveur

`Restate` propose une architecture centrée sur un mandataire serveur unique écrit en Rust, appuyé sur un journal distribué répliqué en flux continu, qui pousse les requêtes vers les services applicatifs par HTTP/RPC (*push*) [191] [195]. Cette topologie évite l’exploitation d’une grappe multi-composants avec base de données externe et réduit la latence de persistance par étape à quelques millisecondes, ce qui rend la journalisation fine viable sur des boucles agentiques comptant des milliers d’étapes [191] [195].

- Dans le code applicatif, le développeur ne sépare pas physiquement workflow et activité : il écrit une fonction impérative standard et encapsule chaque étape non déterministe dans un bloc `ctx.run( — )` dont le résultat sérialisé rejoint le journal d’exécution [191] [192]. Les politiques de reprise gèrent les fautes transitoires et s’arrêtent sur `TerminalError` [192]. Surtout, Restate introduit les `Virtual Objects`, qui associent à une clé unique (par exemple un identifiant de session agentique) un stockage clé-valeur (`KV`) intégré, des journaux d’exécution et une exécution strictement sérialisée par clé [191]. Les sessions multi-tours évitent ainsi les accès concurrents conflictuels sans verrou externe tout en se suspendant totalement en calcul sans serveur lors des attentes [191] [195].

### 9.2.4 `Dapr Workflow` et `Checkpointers` de graphe (`LangGraph`)

Intégré à l’écosystème Cloud Native Computing Foundation (`CNCF`), `Dapr Workflow` embarque le moteur `durabletask-go` directement dans le *sidecar* Dapr de chaque pod applicatif, relié au SDK par un flux gRPC bidirectionnel [196]. Le moteur orchestre des acteurs virtuels internes (`Workflow actor` et `Activity actor`) garantissant une exécution mono-fil par instance et délègue la persistance des points de reprise à un magasin d’état enfichable (`PostgreSQL`, `Redis`, etc.) [196]. Ce choix favorise la standardisation Kubernetes et la portabilité des bases d’état, au prix d’une exécution couplée au cycle de vie du sidecar par pod et d’une sémantique dépendante du `State Store` configuré [196].

Enfin, les `Checkpointers` intégrés aux cadriciels d’agents tels que `LangGraph` enregistrent l’état d’un graphe par fil d’exécution (`thread_id`) à chaque frontière de super-étape pour offrir tolérance aux pannes locales, reprise après interruption humaine et voyage temporel, en complément de `Stores` dédiés à la mémoire transversale inter-fils [193]. Toutefois, un checkpointer de graphe seul ne fournit ni files de tâches distribuées avec travailleurs indépendants, ni minuteurs serveur persistants multi-semaines, ni détection par battements de cœur [194] [177] [193]. En entreprise, les graphes cognitifs gagnent donc à être encapsulés dans un moteur d’exécution durable complet [176] [195] [193]. La figure 9.2 compare ces architectures.

> **[Figure]**
> - Modèle Temporal (Pull +
> - Replay) [container]
> - Modèle Restate (Push +
> - Journal en ligne)
> - [container]
> - Modèle Dapr Workflow
> - (Sidecar CNCF)
> - [container]
> - «component» Workflow Worker
> - [Code déterministe]
> - Rejoue l'historique, émet des Commands
> - «component» Temporal Service
> - [Event History]
> - Journal immuable, timers et Task Queues
> - «component» Activity Worker [Code non déterministe]
> - Appels LLM / MCP, RetryPolicy et Heartbeats
> - «component» Restate Server (Rust)
> - [Proxy + Log répliqué]
> - Journalise étapes en ligne,
> - sérialise par clé
> - «component» Service / Virtual Object
> - [Handler + ctx.run()]
> - Logique métier, état KV et suspension sans serveur
> - «component» Application SDK
> - [Flux gRPC]
> - Enregistre workflows
> - et activités métier
> - «component» Sidecar Dapr
> - [durabletask-go]
> - Orchestre via Workflow
> - et Activity Actors
> - «component» State Store enfichable
> - [PostgreSQL / Redis]
> - Persiste points de reprise
> - et files d'acteurs
> - Scrute Task Queue /
> - envoie Commands
> - Distribue tâches
> - d'Activity
> - Pousse RPC HTTP +
> - journaux d'état
> - Échange items
> - sur flux gRPC
> - Persiste état
> - des acteurs

*Fig. 34. – Topologie comparative des moteurs d’exécution durable : Temporal, Restate et Dapr Workflow*

| Critère architectural | Temporal | Restate | Dapr Workflow | Checkpointer (`LangGraph`) |
| --- | --- | --- | --- | --- |
| Modèle de programmation | `Workflow` déterministe / `Activity` séparée [190] [181] | Code impératif unifié avec blocs `ctx.run()` [191] [192] | SDK gRPC vers sidecar `durabletask-go` [196] | Sauvegarde d’état par super-étape (`thread_id`) [193] |
| Dispatch et latence d’étape | *Pull* sur `Task Queues` (surcoût de file modéré) [181] [195] | *Push* HTTP/RPC en flux continu (quelques ms) [191] [195] | Flux gRPC local vers sidecar du pod [196] | En processus vers base cible [193] |
| État et concurrence | État rejoué + historique sur DB externe [181] [195] | `Virtual Objects` avec `KV` intégré sérialisé par clé [191] | `State Store` enfichable via acteurs Dapr [196] | `Checkpointer` (fil) + `Store` (inter-fils) [193] |
| Détection et délais longs | `Heartbeats`, 4 timeouts, `Durable Timers` serveur [194] [177] | Reprises, `TerminalError`, suspension sans serveur [191] [192] | Reprises et rappels via acteurs Dapr [196] | Reprise locale d’étape ; sans files distribuées [193] |
| Cas d’usage cible EA / SA | Workflows critiques longs et forte observabilité [176] [177] | Boucles agentiques rapides et déploiement sans serveur [191] [195] | Plateforme Kubernetes standardisée sur Dapr CNCF [196] | Sous-graphes cognitifs hébergés dans un moteur durable [193] |

*Tableau 9.2 — Matrice comparative des moteurs d’exécution durable et des couches de persistance.*

> **Arbitrage EA / SA** — Exiger un moteur d’exécution durable complet (`Temporal`, `Restate` ou `Dapr Workflow`) pour tout processus agentique comportant des écritures `SoR`, des délais longs ou des validations humaines, plutôt qu’un simple checkpointer de graphe isolé [176] [196] [193]. Le `SA` choisit `Temporal` pour les processus longs à forte séparation de files et suivi par `Heartbeats` [194] [195], `Restate` pour les boucles fines à faible latence, les `Virtual Objects` par session ou l’exécution sans serveur [191] [195], et `Dapr Workflow` lorsque la pile Kubernetes s’appuie déjà sur le sidecar CNCF [196]. L’`EA` maintient le cloisonnement strict entre le journal d’exécution et les bases cognitives du chapitre 06.

## 9.3 Cohérence sans verrou distribué : idempotence de bout en bout, `Outbox` et Sagas compensatoires

### 9.3.1 Impossibilité du protocole `Two-Phase Commit` (`2PC`) en contexte agentique

Garantir la reprise de l’orchestrateur ne protège pas à lui seul l’intégrité des systèmes cibles dès que le workflow sollicite des `Systems of Record`, des serveurs `MCP` et des API SaaS possédant chacun leur propre stockage [197] [183]. Le protocole de validation distribuée `Two-Phase Commit` (`2PC`) s’avère inopérant pour trois motifs structurels [197] [186] [183]. D’abord, la majorité des progiciels modernes, des API HTTP et des courtiers de messages ne supportent pas de coordinateur XA distribué [197]. Ensuite, comme l’ont démontré Garcia-Molina et Salem pour les transactions de longue durée (*Long-Lived Transactions*), maintenir des verrous de base de données pendant des appels lents effondre la concurrence et multiplie les interblocages [186] [183]. Enfin, les reprises automatiques et la livraison au-moins-une-fois (*at-least-once*) imposent de rendre chaque frontière tolérante aux réémissions [180] [198].

### 9.3.2 Idempotence de bout en bout : contrat `Idempotency-Key` et phases atomiques

Selon `RFC 9110`, rappelée par le projet de norme IETF `draft-ietf-httpapi-idempotency-key-header-08`, les méthodes `GET`, `PUT` et `DELETE` sont idempotentes, contrairement à `POST` et `PATCH` qui dominent les mutations métier et appels d’outils [182]. L’orchestrateur doit donc associer à chaque commande mutatrice un en-tête `Idempotency-Key` déterministe — dérivé de l’identifiant du workflow et du rang logique de l’étape — afin que toute reprise émette exactement la même clé [181] [182].

Côté récepteur (`MCP Gateway` ou couche anti-corruption `ACL` devant un `SoR`), trois règles garantissent la sûreté sans verrou prolongé [182] [180] :

1. **Contrôle d’empreinte (*Idempotency Fingerprint*)** : le serveur lie la clé à une empreinte cryptographique de la charge utile. Selon le projet IETF, l’absence d’une clé requise retourne `400 Bad Request`, tandis que sa réutilisation sur un corps différent retourne `422 Unprocessable Content`, bloquant toute dérive d’intention lors d’un rejeu ou d’une erreur d’agent [182].
2. **Machine à trois états** : enregistrer la clé uniquement après réussite ouvre une faille de concurrence. Le stockage d’idempotence doit distinguer l’état absent, l’état « en vol » — retournant `409 Conflict` si une reprise survient pendant l’appel initial — et l’état achevé, dont le statut et le corps exacts sont rejoués à l’identique jusqu’à expiration de la clé [182] [180].
3. **Phases ACID brèves et points de reprise** : suivant l’architecture de Stripe documentée par Brandur Leach, un service ne maintient jamais une transaction SQL ouverte durant un appel réseau externe ; il encadre l’appel distant par de courtes transactions locales consignant des points de reprise (*recovery points*) [180].

### 9.3.3 Patron `Transactional Outbox` et capture `CDC` sans double écriture

Lorsqu’un composant métier doit simultanément modifier sa base locale et publier un message vers un courtier événementiel, l’exécution séquentielle crée le risque de **double écriture** (*dual-write*) : une panne entre la validation SQL et la publication désynchronise durablement le système [197] [198].

Le patron `Transactional Outbox` supprime cette faille sans `2PC` en écrivant le message sortant dans une table `Outbox` au sein de la même transaction ACID locale que l’entité métier [197] [198]. Un relais asynchrone publie ensuite ces lignes vers le bus de messages [197]. Plutôt qu’une scrutation SQL coûteuse, la capture de données modifiées (`CDC`) via Debezium lit directement le journal de transactions (`WAL`) sans verrou ni impact sur les requêtes métier, applique le routage `EventRouter` et délivre les événements ordonnés en sémantique *at-least-once*, en parfaite synergie avec l’idempotence des consommateurs [198]. Ce patron protège les frontières des `SoR` et services existants appelés par le workflow, tandis que le moteur durable assure lui-même l’atomicité de son propre journal d’orchestration [181] [191] [197].

### 9.3.4 Sagas compensatoires : compensable, pivot, réessayable et irréversible

Lorsqu’un traitement répartit des mutations sur plusieurs systèmes autonomes, l’échec d’une étape aval impose d’annuler sémantiquement les étapes précédentes sans verrou global [186] [183]. Une **Saga**, introduite par Garcia-Molina et Salem, enchaîne des transactions locales `T1..Tn` et associe aux étapes réversibles des transactions compensatoires `C1..Cn-1` exécutées en ordre inverse en cas d’échec [186].

En s’appuyant sur la typologie de l’Azure Architecture Center, le `SA` classe chaque outil mutateur d’agent selon sa position par rapport au point de non-retour [183] :

1. **Transactions compensables** : actions annulables par opération inverse (`réserverCrédit` / `libérerCrédit`), exécutées avant le pivot et empilées dynamiquement pour repli éventuel [183] [199].
2. **Transaction pivot** : point de non-retour de la Saga ; avant son succès, la compensation inverse reste possible, alors qu’une fois le pivot validé, le workflow doit converger vers son achèvement [183].
3. **Transactions réessayables** : étapes idempotentes situées après le pivot, garanties de réussir à terme par reprises bornées ou durables [183].
4. **Actions externes non compensables** : les agents manipulent fréquemment des effets irréversibles sans compensation réelle (envoi d’un courriel externe, virement instantané, soumission réglementaire) [183]. Elles doivent impérativement être placées **après le pivot** ou derrière une validation humaine durable (`HOTL`) [183] [184].

Contrairement à une Saga purement chorégraphiée dont le suivi devient fragile au-delà de trois participants (chapitre 08), la **Saga orchestrée** dans `Temporal` ou `Restate` empile les fermetures compensatoires en code impératif et les exécute en ordre inverse dès qu’une `TerminalError` survient [183] [199]. La durabilité du journal garantit l’achèvement de la séquence de compensation même si un nœud redémarre pendant le retour arrière, chaque appel compensatoire portant sa propre `Idempotency-Key` [182] [199]. La figure 9.3 synthétise cette chaîne de cohérence.

> **[Figure]**
> - Orchestrateur Durable
> - (Saga)
> - Base Locale + Table Outbox
> - Relais CDC (Debezium WAL)
> - MCP Gateway (Idempotency Store)
> - System of Record
> - (ERP / Paiement)
> - Orchestrateur Durable
> - (Saga)
> - Base Locale + Table Outbox
> - Relais CDC (Debezium WAL)
> - MCP Gateway (Idempotency Store)
> - System of Record
> - (ERP / Paiement)
> - 1. Transactional Outbox (élimination du dual-write sans 2PC)
> - 1 BEGIN TX : MAJ état + INSERT Outbox
> - 2 COMMIT ACID local
> - 3 Lit journal WAL (zéro verrou)
> - 4 Publie événement ordonné (at-least-once)
> - 2. Contrat Idempotency-Key à 3 états et étape compensable
> - 5 POST /reserve (Idempotency-Key: K1, hash H1)
> - Enregistre K 1 en état « En vol ». Si K 1 concurrent : HTTP 409. Si K 1 avec autre corps : HTTP 422.
> - 6 Réserver crédit client
> - 7 HTTP 200 Réservation #R1
> - 8 HTTP 200 (stocke réponse sur K1)
> - Empile compensation C1 : annulerReservation(#R1)
> - 3. Échec d'étape et compensation inverse avant le pivot
> - 9 POST /provision (Idempotency-Key: K2, hash H2)
> - 10 Allouer licence partenaire
> - 1 1 Refus métier définitif (TerminalError)
> - 12 Erreur terminale non réessayable
> - 13 Compensation C1 : POST /release/#R1 (Key: C-K1)
> - 14 Libère crédit #R1
> - 15 HTTP 200 Compensé

*Fig. 35. – Chaîne de cohérence sans verrou distribué : Transactional Outbox, Idempotency-Key à 3 états et Saga orchestrée*

| Catégorie d’étape | Position vs pivot | Réversibilité et idempotence | Exemple agentique | Gestion d’échec |
| --- | --- | --- | --- | --- |
| Compensable (`T_i`, `C_i`) | Avant le pivot [183] | Réversible via action opposée ; `Idempotency-Key` requise [182] [183] | Pré-autorisation financière, réservation de stock ERP | Empiler `C_i` (clé `C-K_i`) ; dérouler en sens inverse sur `TerminalError` [199] |
| Pivot | Point de bascule [183] | Non compensable ; valide l’engagement métier [183] | Validation ferme de commande, capture comptable | Reprises transitoires possibles ; aucun retour arrière après succès [183] |
| Réessayable | Après le pivot [183] | Idempotence stricte ; achèvement garanti à terme [182] [183] | Émission de facture, mise à jour d’index ou notification | Reprises durables jusqu’à complétion sans compenser l’amont [183] |
| Irréversible externe | Après pivot ou sous `HOTL` [183] [184] | Aucune compensation sémantique fiable | Courriel client définitif, déclaration légale, virement | Interdite avant pivot ; exige approbation humaine et clé unique [182] [184] |

*Tableau 9.3 — Classification transactionnelle des actions agentiques dans une Saga orchestrée.*

> **Arbitrage EA / SA** — Proscrire le protocole `2PC` dans l’orchestration agentique et imposer une classification `Compensable` / `Pivot` / `Réessayable` pour chaque outil mutateur [197] [186] [183]. Le `SA` exige le contrat `Idempotency-Key` à trois états avec contrôle d’empreinte (`400` /`409` /`422`) sur toute mutation `MCP` /`SoR`, protège les écritures locales couplées à des événements par `Transactional Outbox` sous `CDC`, et privilégie la Saga orchestrée dans le moteur durable dès trois participants [182] [198] [183] [199]. L’`EA` interdit de placer toute action externe non compensable avant le pivot transactionnel [186] [183].

## 9.4 Cycles longs `Human-on-the-Loop`, escalades asynchrones sous `SLA` et bascule multi-fournisseurs

### 9.4.1 Suspension durable `Human-on-the-Loop` : `Signals`, `Updates` et `Awakeables`

Lorsque l’autonomie gouvernée (chapitre 01) exige une validation humaine avant un pivot critique, l’attente peut s’étirer de quelques heures à plusieurs jours [176] [177]. Là où le protocole `A2A` signale l’interruption au pair appelant via `INPUT_REQUIRED` (chapitre 05), le moteur durable suspend l’instance sur disque et libère totalement threads et mémoire jusqu’à la reprise [177] [200].

Deux jeux de primitives répondent à ce besoin selon le moteur retenu [201] [200] :

1. **Dans** `Temporal`, l’*Approval Pattern* bloque l’exécution sur une condition d’attente (`wait_condition`, `condition`, `await`) alimentée par un `Signal` asynchrone ou un `Update` synchrone validé [184] [201]. Les `Queries` permettent aux portails `SoE` de lire le contexte sans bloquer le workflow, tandis que la charge d’approbation capture l’identité de l’approbateur, la décision (`APPROVED`, `REJECTED`, `ESCALATED`), les commentaires et l’horodatage à des fins d’audit [184] [201].
2. **Dans** `Restate`, les `Signals` adressés par identifiant d’invocation pilotent les interactions continues, les `Workflow promises` synchronisent les gestionnaires internes et les `Awakeables` fournissent un jeton unique à usage unique transmis à un portail de validation ou webhook [200]. L’instance libère toute ressource de calcul sans serveur jusqu’à ce qu’un appel externe résolve ou rejette l’`Awakeable` [191] [200].

### 9.4.2 Escalades asynchrones sous `SLA` et expiration compensatoire

Pour éviter qu’une absence d’opérateur ne gèle indéfiniment un dossier ou ne laisse expirer des réservations amont, le workflow fait concourir la réception du signal humain avec des minuteurs durables gérés côté serveur (`Durable Timers`) [177] [184]. Ce mécanisme supprime les tâches *cron* externes et les courses critiques entre expiration et décision tardive, car le journal d’événements tranche séquentiellement quel événement survient le premier [181] [184].

L’escalade suit un enchaînement déterministe à deux paliers [177] [199] [184]. À l’expiration d’un premier minuteur (`SLA N1`), le workflow émet une activité idempotente de relance ou de réaffectation vers un superviseur `N2` puis arme un second minuteur de clôture. Si aucun signal valide n’arrive à l’échéance finale, l’exécution bascule sur la branche d’expiration (`Timeout/Rejected`) et déroule automatiquement en ordre inverse les compensations empilées avant d’informer le demandeur [199] [184].

### 9.4.3 Bascule multi-fournisseurs préservant le déterminisme du rejeu

Enfin, les boucles durables doivent absorber les pannes prolongées ou saturations (`429`, `503`) d’un fournisseur d’inférence ou d’une région [185] [188] [202]. Le patron `Circuit Breaker` à trois états (`Closed`, `Open`, `Half-Open`) prévient l’engorgement des travailleurs en passant en échec rapide (`Open`) dès le franchissement d’un seuil d’erreurs, puis en testant prudemment le rétablissement via quelques sondes à l’issue du délai d’attente (`Half-Open`) [202]. En façade réseau, une passerelle d’inférence telle que l’`AI Gateway` d’Azure API Management ou un routeur `LiteLLM` (dont la topologie hybride complète relève du chapitre 13) applique équilibrage de charge, coupe-circuits sur pools et politiques `fallbacks` entre modèles et régions après `num_retries` [187] [203].

Toutefois, côté moteur durable, un impératif s’impose : **l’exécution du coupe-circuit et de la bascule multi-fournisseurs doit impérativement résider à l’intérieur de l’**`Activity` **ou du bloc** `ctx.run()`**, jamais dans le code pur du workflow** [190] [192]. Évaluer directement dans le workflow l’état mutable d’un coupe-circuit pour changer de fournisseur provoquerait une divergence lors d’un rejeu ultérieur si l’état du circuit avait entre-temps évolué [190]. Encapsulée dans l’activité, la tentative retient un fournisseur sain, retourne à la fois le texte produit, l’identifiant du modèle effectivement exécuté et le motif éventuel de bascule ; au rejeu, le moteur restitue cette sortie immuable sans ré-exécuter d’inférence [181] [191]. Le modèle retenu est simultanément transmis à la télémétrie et aux garde-fous `SRE` décrits au chapitre 11. La figure 9.4 illustre cette séquence complète.

> **[Figure]**
> - Workflow Durable (Suspendu hors RAM)
> - Activity Inférence
> - + Circuit Breaker
> - LLM Principal
> - (Région A)
> - LLM Secours (Région B / Souverain)
> - Portail HOTL (Signals / Awakeables)
> - Approbateurs
> - (N1 -> N2)
> - Workflow Durable (Suspendu hors RAM)
> - Activity Inférence
> - + Circuit Breaker
> - LLM Principal
> - (Région A)
> - LLM Secours (Région B / Souverain)
> - Portail HOTL (Signals / Awakeables)
> - Approbateurs
> - (N1 -> N2)
> - 1. Bascule multi-fournisseurs journalisée (préservation du replay)
> - 1 Exécuter nœud cognitif (étape S3)
> - 2 Requête inférence
> - 3 HTTP 429 / 503 répétés (seuil dépassé)
> - Coupe-circuit passe à Open. Bascule vers fournisseur secondaire.
> - 4 Requête de repli (contrat typé identique)
> - 5 HTTP 200 Réponse + proposition P3
> - 6 Journalise (fournisseur=LLM2, sortie=P3)
> - En cas de replay ultérieur, Wf lit LLM2/P3 depuis le journal sans ré-interroger LLM1 ni LLM2.
> - 2. Attente asynchrone HOTL et escalade sous SLA
> - 7 Émet demande d'approbation (Awakeable ID / Workflow ID)
> - 8 Démarre Durable Timer (SLA N1 = 4 heures)
> - Libère thread et RAM. Zéro consommation de worker.
> - 9 Notifie Approbateur N1
> - Délai SLA N1 expiré sans réponse
> - 10 Déclenche escalade vers N2 + nouveau Durable Timer (SLA N2)
> - 1 1 Notifie Approbateur N2 (prioritaire)
> - 12 Valide dossier P3
> - 13 Signal / Resolve Awakeable (APPROUVÉ, identité, horodatage)
> - 14 Reprend et engage le pivot transactionnel

*Fig. 36. – Séquence de bascule multi-fournisseurs journalisée et d’escalade Human-on-the-Loop sous SLA*

| Classe de processus | Délai SLA d’attente HOTL | Escalade et expiration | Bascule multi-fournisseurs | Contrainte EA |
| --- | --- | --- | --- | --- |
| Transaction financière ou contractuelle | Court à moyen (minutes à heures) [184] | Relance `N1`, escalade `N2`, compensation automatique à l’échéance [199] [184] | Repli restreint aux fournisseurs et régions homologués [187] [203] | Piste d’audit signée (`approver`, décision, horodatage) [184] |
| Processus interne structurant (achats, RH, IT) | Moyen à long (heures à plusieurs jours) [177] [184] | `Durable Timer` sans RAM ; réaffectation vers file d’équipe puis annulation [177] [200] | Bascule via `AI Gateway` / `LiteLLM` avec coupe-circuit multi-régions [187] [203] | Maîtrise des coûts de rétention et continuité d’équipe [177] |
| Dossier souverain ou réglementé | Long (jusqu’à plusieurs semaines) [177] | `Signal` / `Awakeable` avec re-vérification de fraîcheur à la reprise [201] [200] | Repli exclusif vers enclave souveraine interne ; arrêt propre sinon [202] [203] | Interdiction de débordement hors juridiction autorisée [187] |
| Analyse asynchrone tolérante à la latence | Sans objet (autonome borné) | Échec rapide si budget épuisé ; alerte opérateur asynchrone [178] [202] | Cascade complète après `num_retries` avec `jitter` [178] [203] | Traçabilité du modèle effectif pour `EvalOps` (chapitre 11) [181] |

*Tableau 9.4 — Grille d’arbitrage des escalades* `HOTL` *sous* `SLA` *et des bascules multi-fournisseurs.*

> **Arbitrage EA / SA** — Implémenter toute attente `Human-on-the-Loop` par primitives durables (`Signals` /`Updates` avec `wait_condition` dans Temporal ou `Awakeables` /`Signals` dans Restate) couplées à des minuteurs serveur sous `SLA`, sans jamais immobiliser de processus ni recourir à la scrutation [177] [184] [200]. Le `SA` confine l’appel `LLM`, le coupe-circuit et la bascule multi-fournisseurs dans une `Activity` ou un bloc `ctx.run()` retournant le fournisseur retenu afin de préserver le déterminisme du rejeu [190] [192] [203]. L’`EA` limite les chaînes de repli aux juridictions homologuées et impose la compensation automatique en fin de `SLA` [199] [184] [187].

## Synthèse et transition vers la Partie IV

L’exécution durable ancre la fiabilité opérationnelle de l’entreprise agentique. En remplaçant la mémoire volatile par un journal déterministe isolant les appels externes (`Activities` ou `ctx.run`), en sécurisant les mutations via `Idempotency-Key` à trois états et `Transactional Outbox`, en ordonnant les Sagas compensatoires autour d’un pivot et en suspendant les attentes `HOTL` sous `SLA`, l’architecture concilie fragilité réseau et rigueur des `SoR` [181] [191] [182] [183] [184]. La Partie III achève ainsi la couche d’exécution et de coordination (chapitres 07 à 09) avant d’aborder au chapitre 10 la sécurité `Zero-Trust` et les identités non humaines (`NHI`).

# Partie IV — Confiance, sécurité Zero-Trust, observabilité et gouvernance

# Chapitre 10 — Architecture de sécurité Zero-Trust, identités non humaines (NHI) et maîtrise des risques

L’ouverture des systèmes d’information aux agents autonomes bouleverse la sécurité périmétrique. Dans une application web déterministe, le code compilé n’emprunte que des chemins prévus et sa surface d’attaque réside dans ses interfaces réseau, ses dépendances et ses droits d’accès. Un `System of Agency` (chapitre 01) rompt ce postulat en plaçant un moteur probabiliste au cœur du plan de décision, alimenté à la fois par des directives privilégiées et par des données externes non fiables — courriels, documents ou retours `MCP` — tout en pouvant agir sur les `Systems of Record` (`SoR`) [204] [205]. Parce qu’un grand modèle de langage ne sépare pas fiablement données et instructions, l’héritage implicite de privilèges ou la confiance accordée au réseau interne transforme une simple lecture documentaire en vecteur d’exfiltration ou de mutation illicite [206] [205] [207].

Appliquer les principes **Zero-Trust** (`NIST SP 800-207`) à l’entreprise agentique impose d’éliminer toute confiance implicite et de vérifier chaque identité, chaque intention et chaque flux à chaque frontière d’exécution [207]. Ce chapitre décline cette exigence selon une double lecture **EA** (*Enterprise Architect* : gouvernance du risque, domaines de confiance, maîtrise du rayon d’impact) et **SA** (*Solution Architect* : attestation cryptographique, délégation OAuth, portes de politiques déterministes et isolation système). Par frontière d’étanchéité, ce chapitre couvre exclusivement la sécurité technique, les identités non humaines (`NHI`) et le contrôle d’accès : l’instrumentation `OpenTelemetry` et les coupe-circuits `SRE` relèvent du chapitre 11, tandis que la conformité réglementaire est traitée au chapitre 12.

## 10.1 Modèle de menaces OWASP Agentic Top 10 : Goal Hijacking, Confused Deputy et injections indirectes

### 10.1.1 De l’OWASP `LLM01` au référentiel `OWASP Top 10 for Agentic Applications` (`ASI01` –`ASI10`)

Les premiers déploiements génératifs ont souvent réduit la sécurité de l’IA à la prévention des contournements directs (*jailbreaks*) saisis par un utilisateur [206]. Si `LLM01:2025` (*Prompt Injection*) demeure le premier risque de l’`OWASP Top 10 for LLM Applications` [206], la planification autonome, la mémoire persistante et les protocoles `MCP` et `A2A` (chapitres 04 et 05) étendent nettement la surface d’exposition [204] [208]. L’initiative `OWASP GenAI Security Project` a donc publié le **OWASP Top 10 for Agentic Applications** (`ASI01` –`ASI10`), qui complète la taxonomie adversariale `NIST AI 100-2 E2025` (évasion, empoisonnement, confidentialité et détournement d’usage), la base `MITRE ATLAS` et le modèle en sept couches `MAESTRO` de la *Cloud Security Alliance* (*Foundation Models*, *Data Operations*, *Agent Frameworks*, *Deployment and Infrastructure*, *Evaluation and Observability*, *Security and Compliance*, *Agent Ecosystem*) [204] [209] [210].

Ces référentiels montrent que les dix risques agentiques s’enchaînent selon une **dynamique d’amplification** [204] [208] :

1. `ASI01` **(*Agent Goal Hijack*) et** `ASI02` **(*Tool Misuse Exploitation*)** amorcent l’attaque : en réorientant la trajectoire décisionnelle, l’adversaire pousse l’agent à appeler des outils légitimes avec des paramètres destructeurs ou hors mandat [204].

2. `ASI03` **(*Identity Privilege Abuse*) et** `ASI04` **(*Agentic Supply Chain Vulnerabilities*)** convertissent la dérive en mouvement latéral via des jetons hérités trop larges ou des serveurs `MCP`, prompts et greffons compromis [204].
3. `ASI05` **(*Unexpected Code Execution*) et** `ASI06` **(*Memory Context Poisoning*)** ancrent l’attaque par exécution de code non confinée ou corruption durable des mémoires et index `RAG` (traitée au chapitre 06) [204].
4. `ASI07` **(*Insecure Inter-Agent Communication*),** `ASI08` **(*Cascading Agent Failures*),** `ASI09` **(*Human-Agent Trust Exploitation*) et** `ASI10` **(*Rogue Agents*)** propagent l’incident sur des canaux `A2A` non authentifiés, trompent les valideurs humains et pérennisent des agents déviants hors contrôle [204] [208].

Les méthodes classiques orientées composants (`STRIDE`) peinent à saisir cette dynamique multi-couches, justifiant `MAESTRO` en complément d’`ASI01` –`ASI10` [209]. Le tableau 10.1 associe chaque catégorie aux verrous Zero-Trust de l’ouvrage.

| Catégorie OWASP | Mécanisme de menace | Vecteur dominant | Contrôle Zero-Trust principal | Renvoi |
| --- | --- | --- | --- | --- |
| `ASI01` *Goal Hijack* | Détournement d’objectif [204] | Injection indirecte [204] [205] | `CaMeL`, `Txn-Token`, `AIDR` [211] [212] [213] | `10.1`, `10.3`, ch. `07` |
| `ASI02` *Tool Misuse* | Abus d’outils légitimes [204] | Paramètres/chaînes non bornés [204] | `Intent Gate` (`OPA` /`Cedar`), `RAR` [214] [215] | `10.3`, ch. `04` |
| `ASI03` *Identity Abuse* | Abus de droits hérités [204] | *Token passthrough*, secrets statiques [216] [217] | `SPIFFE` /`SPIRE`, `OAuth OBO`, `DPoP` [218] [219] [220] | `10.2`, `10.3` |
| `ASI04` *Supply Chain* | Composants tiers piégés [204] | Serveurs `MCP`/prompts non vérifiés [204] | `AISPM` (`AI-BOM`), registre curé [221] [213] | `10.4`, ch. `04` –`05` |
| `ASI05` *Code Execution* | Exécution de code arbitraire [204] | Code généré hors bac à sable [208] | `Firecracker`, `Kata`, `gVisor`, `Wasmtime` [222] [223] [224] | `10.4`, ch. `03` |
| `ASI06` *Memory Poisoning* | Corruption de mémoire/`RAG` [204] | Documents piégés persistants [204] [205] | Provenance, filtres d’écriture, `ACL` [221] [211] | `10.1`, ch. `06` |
| `ASI07` *Inter-Agent Comm.* | Usurpation et rejeu `A2A` [204] | Canaux sans `mTLS` ni signature [204] | `X.509-SVID`, fédération, `WIMSE` [218] [225] [226] | `10.2`, ch. `05` |
| `ASI08` *Cascading Failures* | Propagation en cascade [204] | Boucles sans plafond de délégation [204] | Chaîne `act[]`, coupe-circuit `AIDR` [219] [213] | `10.3`, `10.4`, ch. `08`, `11` |
| `ASI09` *Trust Exploitation* | Tromperie d’opérateur `HITL` [204] | Prose persuasive sans preuve [204] | Seuils déterministes `Intent Gate` [221] [227] | `10.3`, ch. `01` |
| `ASI10` *Rogue Agents* | Agent compromis autonome [204] | Dérive persistante non détectée [204] | Corrélation `AIDR`, révocation `SVID` [225] [213] | `10.2`, `10.4` |

*Tableau 10.1 — Cartographie des dix risques OWASP Agentic AI (*`ASI01` *–*`ASI10`*) vers les contrôles techniques Zero-Trust.*

### 10.1.2 Injections indirectes et problème du *Confused Deputy* cognitif

L’injection indirecte, caractérisée par Greshake et al. [205], alimente la plupart des détournements `ASI01` [204]. Contrairement à l’injection directe saisie par l’appelant, l’injection indirecte dissimule des directives dans les ressources consultées par l’agent : pages web, courriels, documents malveillants ou retours d’outils façonnés [204] [205]. Parce que le modèle traite consigne système, requête et données externes dans une même séquence de jetons sans frontière matérielle code/données, une chaîne externe peut être interprétée comme une instruction prioritaire [206] [205] [228].

Cette indistinction réactive le problème du **Confused Deputy** (mandataire confus) [221]. L’agent agit comme un intermédiaire autorisé sur des outils internes (`CRM`, messagerie, dépôts de code) tout en ingérant des contenus non authentifiés [221] [205]. Des incidents sans clic (*zero-click*) sur des assistants de messagerie ont montré qu’un simple document ou courriel piégé peut conduire l’agent à extraire des données internes puis à les exfiltrer par un appel légitime [204] [205]. La faille est architecturale : tant que l’autorité reste attachée à la session sans contrôle du flot d’information, toute lecture non fiable contamine les actions aval [205] [211].

### 10.1.3 Défenses architecturales par conception : *Instruction Hierarchy* et séparation contrôle/données (`CaMeL`)

Les injonctions défensives dans le prompt système cèdent systématiquement devant des attaques adaptatives [206] [228]. Une défense robuste combine renforcement statistique du modèle et séparation déterministe dans l’`Agent Harness` [221] [228] [211].

Côté modèle, la **hiérarchie d’instructions** (*Instruction Hierarchy*) de Wallace et al. [228] entraîne le `LLM` à prioriser les consignes système privilégiées face aux requêtes utilisateurs et aux textes tiers de rang inférieur [228]. Toutefois, cette propriété demeure probabiliste et n’offre aucune garantie formelle [206] [228] [211].

Pour atteindre une protection **par conception**, l’architecture **CaMeL** (*Defeating Prompt Injections by Design*) de Debenedetti et al. [211] isole strictement flot de contrôle et flot de données :

1. **Extraction privilégiée du flot de contrôle** : depuis la requête fiable seule — sans exposer le modèle aux données externes brutes — une couche privilégiée extrait le graphe de contrôle et de flux de données fixant quels outils seront invoqués et comment circuleront les résultats [211].
2. **Quarantaine des données non fiables** : les contenus externes (courriels, pages web) sont analysés par un modèle isolé privé d’accès direct aux outils ou à la modification du plan ; même compromis par injection indirecte, il ne peut altérer le flot du programme [211].
3. **Capacités et contrôle de provenance** : une couche d’exécution associe à chaque donnée sa provenance et vérifie des politiques de capacités avant chaque appel d’outil, bloquant toute exfiltration de données privées vers des flux non autorisés [211].

### 10.1.4 Double lecture EA / SA

Pour l’**EA**, `ASI01` –`ASI10` démontre que le risque croît multiplicativement avec l’autonomie, l’ouverture des sources ingérées et l’étendue des privilèges accordés aux connecteurs [204] [209]. L’EA doit proscrire en production le couplage direct entre lectures externes ouvertes et écritures `SoR` sans médiation déterministe [204] [221]. Pour le **SA**, toute sortie `LLM` et toute donnée tierce restent non fiables par défaut : il faut séparer l’analyse de données non fiables du flot de contrôle (`CaMeL` ou graphes déterministes du chapitre 03) et externaliser l’autorisation hors de la fenêtre contextuelle [206] [211].

> **Arbitrage EA / SA** — Ne jamais utiliser le prompt système, la hiérarchie d’instructions entraînée ou la fenêtre contextuelle d’un `LLM` comme frontière de sécurité [206] [228]. L’`EA` impose l’analyse de menaces `OWASP ASI01–ASI10` et `CSA MAESTRO` avant homologation et interdit le raccordement direct entre sources externes non fiables et mutations `SoR` [204] [209]. Le `SA` isole les flux non fiables du flot de contrôle (`CaMeL` ou workflow typé) et confie la prévention du *Confused Deputy* à des identités attestées et des portes de politiques déterministes [221] [211].

## 10.2 Identités non humaines (NHI) cryptographiques : attestation de workload SPIFFE/SPIRE et SVID éphémères

### 10.2.1 Crise des identités non humaines et taxonomie `OWASP NHI Top 10`

L’entreprise agentique multiplie les **identités non humaines** (`NHI`) : orchestrateurs, agents spécialisés, serveurs `MCP` et travailleurs durables exigent chacun une identité propre auprès des passerelles, modèles et `SoR` [221] [216]. Contrairement aux utilisateurs humains rattachés à un annuaire `RH` et à la `MFA`, ces charges sont créées, mises à l’échelle et recyclées dynamiquement sur Kubernetes ou des plateformes sans serveur [216].

Le référentiel `OWASP Non-Human Identities Top 10` (`NHI1:2025` –`NHI10:2025`) montre pourquoi les clés API et secrets statiques échouent [216] :

1. **Secrets persistants et fuites (**`NHI2`**,** `NHI7`**)** : les clés statiques en variables d’environnement ou fichiers de configuration n’expirent pas, fuient dans les dépôts ou traces et restent exploitables longtemps après fuite [216].
2. **Réutilisation et opacité (**`NHI9`**,** `NHI10`**)** : partager un compte de service entre agents ou humains détruit l’imputabilité, empêche l’isolement d’un agent déviant (`ASI10`) et banalise l’usage humain de comptes machines [204] [216].
3. **Sur-privilèges et dérive (**`NHI1`**,** `NHI5`**,** `NHI6`**,** `NHI8`**)** : l’absence de révocation automatique au retrait d’un agent, les rôles infonuagiques trop larges et la perméabilité entre environnements créent des vecteurs de déplacement latéral [216].

Selon `NIST SP 800-207`, l’identité d’un agent doit éliminer le secret statique initial (*secret zero*) au profit d’une attestation cryptographique dynamique du runtime [207] [216] [218].

### 10.2.2 Standard `SPIFFE`, architecture `SPIRE` et attestation à deux étages

Le standard CNCF **SPIFFE** (*Secure Production Identity Framework for Everyone*) et son implémentation **SPIRE** (*SPIFFE Runtime Environment*) automatisent cette attestation [218] [225]. Chaque charge reçoit un **SPIFFE ID** — URI normalisée `spiffe://<trust-domain>/<workload-identifier>` (ex. `spiffe://entreprise.ca/finance/facturation`) — rattaché à un *Trust Domain* et prouvé par un **SVID** (*SPIFFE Verifiable Identity Document*) vérifiable grâce au *Trust Bundle* public [218].

`SPIRE` articule un **SPIRE Server** central (registre d’enregistrements et autorité de signature) et un **SPIRE Agent** par nœud selon une **attestation à deux étages**, illustrée à la figure 10.1 [225] :

1. **Attestation du nœud (*Node Attestation*)** : au démarrage, le `SPIRE Agent` s’authentifie auprès du `SPIRE Server` via des greffons *Node Attestors* exploitant les preuves de l’infrastructure hôte, obtenant son `Node SVID` et le jeu d’enregistrements associés [225].
2. **Attestation de la charge (*Workload Attestation*)** : le processus appelant contacte la **SPIFFE Workload API** sur une socket de domaine Unix locale, sans secret initial [225]. Des greffons *Workload Attestors* interrogent le noyau et l’orchestrateur pour vérifier les **sélecteurs** du processus face aux règles enregistrées avant signature d’un `SVID` éphémère [225].

La spécification `SPIFFE` précise toutefois que cette garantie suppose l’isolation locale entre charges sur un même nœud afin qu’un processus compromis ne dérobe pas les justificatifs d’un voisin [218], justifiant le couplage direct avec les bacs à sable de la section `10.4`.

> **[Figure]**
> - Nœud / Infra hôte (Kernel & Orchestrateur)
> - SPIRE Server (Trust Domain A)
> - SPIRE Agent (Socket Unix locale)
> - Agent Harness &
> - Envoy SDS
> - Pair Domaine B (Trust Bundle B)
> - Nœud / Infra hôte (Kernel & Orchestrateur)
> - SPIRE Server (Trust Domain A)
> - SPIRE Agent (Socket Unix locale)
> - Agent Harness &
> - Envoy SDS
> - Pair Domaine B (Trust Bundle B)
> - 1. Attestation du nœud (Node Attestation — sans secret statique)
> - 1 Collecte preuve d'infrastructure (Node Attestor plugin)
> - 2 Preuve vérifiable du nœud
> - 3 Attestation de nœud (authentification automatique)
> - 4 Node SVID signé + cache des enregistrements
> - 2. Attestation de charge de travail (Workload API / SDS)
> - 5 Connecte socket Unix locale (SPIFFE Workload API / SDS)
> - 6 Inspecte sélecteurs du processus (Workload Attestors)
> - 7 Sélecteurs confirmés
> - 8 X.509-SVID éphémère (mTLS) + JWT-SVID / WIT-SVID + Trust Bundle
> - Rotation continue en mémoire via SDS : aucune clé privée ni jeton écrit sur disque (NHI7 éliminé).
> - 3. Authentification inter-domaines et fédération
> - 9 Échange SPIFFE Bundle Endpoint (Trust Bundles publics A <-> B)
> - 10 Requête mTLS (X.509-SVID) ou WIMSE WIT / JWT-SVID
> - 1 1 Vérifie SPIFFE ID (spiffe://domaine-a/agent/facturation) contre Trust Bundle A
> - 12 Canal authentifié établi

*Fig. 37. – Cycle d’attestation SPIFFE/SPIRE à deux étages, délivrance de SVID éphémères et fédération de domaines de confiance pour charges agentiques*

### 10.2.3 `SVID` éphémères, intégration `Envoy SDS`, fédération et `IETF WIMSE`

Les justificatifs `SVID` se renouvellent en continu sans redémarrage applicatif selon des profils complémentaires [218] [225] :

- **Le** `X.509-SVID` inscrit le `SPIFFE ID` dans l’extension *Subject Alternative Name* (`URI SAN`) d’un certificat X.509 à vie brève pour établir des liaisons `mTLS` [218] [229]. Couplé comme fournisseur *Secret Discovery Service* (`SDS`) au mandataire **Envoy**, le `SPIRE Agent` diffuse certificats, clés privées et *Trust Bundles* exclusivement en mémoire vive sans jamais écrire sur disque, supprimant `NHI2` et protégeant les échanges `A2A` (`ASI07`) [204] [216] [229].

- **Le** `JWT-SVID` encode le `SPIFFE ID` dans la revendication `sub` d’un jeton signé `JWT` destiné aux appels de couche 7 traversant des passerelles terminant le `TLS` [218] [225]. Jetons au porteur par nature, ils requièrent une vie très brève et une audience (`aud`) strictement ciblée [218].
- **L’architecture** `IETF WIMSE` **et le** `WIT-SVID` : la spécification `draft-ietf-wimse-arch` dissocie la preuve cryptographique de l’identité de charge — *Workload Identity Token* (`WIT`, auquel correspond le profil `WIT-SVID` dans SPIFFE/SPIRE) ou certificat accompagné d’une preuve de possession — de la propagation du contexte utilisateur ou transactionnel [225] [226].

Entre grappes ou organisations partenaires (chapitre 05), `SPIRE` fédère les domaines via des *SPIFFE Bundle Endpoints* échangeant leurs *Trust Bundles* publics sans secret partagé [225]. En cas de dérive (`ASI10`), retirer l’entrée d’enregistrement dans `SPIRE` interrompt le renouvellement et permet le blocage immédiat dans `Envoy` /`OPA` [225] [229].

### 10.2.4 Double lecture EA / SA

Pour l’**EA**, `SPIFFE` /`SPIRE` unifie les identités machines au-dessus des fournisseurs infonuagiques et résorbe les dix risques `OWASP NHI` [216] [218]. L’EA gouverne le découpage des *Trust Domains* (isolation hors-production et production, `NHI8`) et le nommage unique des `SPIFFE ID` (`NHI9`) [216] [218]. Pour le **SA**, le couple `SPIRE` + `Envoy SDS` élimine les secrets sur disque, sécurise le plan transport `A2A` (`ASI07`) et lie l’identité aux sélecteurs immuables du runtime [204] [225] [229].

> **Arbitrage EA / SA** — Interdire toute clé API statique et tout secret longue durée (`NHI7`) pour authentifier des agents, passerelles `MCP` ou travailleurs durables [216] [218]. L’`EA` impose la séparation des *Trust Domains* par environnement (`NHI8`) et l’unicité des `SPIFFE ID` par rôle (`NHI9`) [216] [218]. Le `SA` déploie `SPIRE` avec attestation à deux étages, privilégie `X.509-SVID` via `Envoy SDS` en `mTLS` interne et utilise des jetons liés par preuve de possession (`WIMSE` /`DPoP`) en couche 7 [225] [229] [226].

## 10.3 Autorisation dynamique : OAuth 2.0 On-Behalf-Of (RFC 8693), downscoping et Intent Gates (OPA/Cedar)

### 10.3.1 Le piège de l’héritage de privilèges et la délégation bornée

Authentifier un agent par `SPIFFE` n’indique ni pour quel utilisateur humain il agit ni quelles limites bornent sa requête [226] [219]. Sans délégation dynamique, deux anti-patrons exposent au risque `ASI03` (*Identity Privilege Abuse*) [204] :

1. **Le compte technique omnipotent** : l’agent accède aux `SoR` sous ses propres privilèges transversaux, transformant toute injection indirecte en *Confused Deputy* sur l’ensemble des comptes clients [204] [221] [216].
2. **Le relais passif de jeton (*token passthrough*)** : l’agent transmet directement le jeton `OAuth 2.0` de l’utilisateur vers les serveurs `MCP` ou API aval. Ce jeton porte des portées et audiences trop larges, exploitables par un serveur tiers compromis (`ASI04`) sans traçabilité de l’agent [204] [217]. La spécification **MCP Authorization** (révision `2025-11-25`) interdit explicitement ce *token passthrough* : chaque serveur `MCP` HTTP opère en serveur de ressources `OAuth 2.1` (`PKCE`, `RFC 9728`, `RFC 8414`) et doit valider que le jeton lui est spécifiquement destiné [217].

L’architecture cible sépare ainsi l’**usurpation** (*impersonation*) de la **délégation explicite bornée**, qui préserve l’imputabilité conjointe tout en réduisant les droits à chaque saut (*downscoping*) [219] [212].

### 10.3.2 Chaîne protocolaire IETF : `RFC 8693`, `RFC 8707`, `RFC 9449` (`DPoP`), `RFC 9396` et `Transaction Tokens`

La délégation multi-sauts sécurisée combine cinq standards complémentaires de l’IETF [219] [230] [214] [220] [212] :

1. **Échange *On-Behalf-Of* (**`RFC 8693`**) et *downscoping*** : l’agent soumet le jeton entrant (`subject_token`) et sa propre preuve attestée (`actor_token`) au *Security Token Service* (`STS`) via le type `token-exchange` [225] [219]. Le `STS` émet un jeton réduit à l’intersection des droits de l’utilisateur et de la tâche (*downscoping*), portant le sujet en `sub` et l’agent dans la revendication `act` (*Actor*), imbriquée à chaque saut pour préserver la lignée complète et encadrable par `may_act` [219].
2. **Ancrage d’audience par *Resource Indicators* (**`RFC 8707`**)** : le paramètre `resource` désigne l’URI canonique unique du serveur `MCP` ou de la passerelle cible [230] [217]. Le `STS` fige `aud` sur cette cible, empêchant le rejeu transversal d’un jeton d’un service vers un autre [230] [217].
3. **Contrainte cryptographique par** `DPoP` **(**`RFC 9449`**)** : pour neutraliser le vol de jetons en couche 7 lorsque le `mTLS` (`RFC 8705`) ne traverse pas les mandataires, `DPoP` lie le jeton d’accès à une clé privée détenue par l’agent via la confirmation `cnf.jkt` (empreinte `JWK` SHA-256) et exige une preuve signée dans l’en-tête HTTP `DPoP` à chaque requête [220].
4. **Mandats fins** `RFC 9396` **(**`RAR`**) et *Transaction Tokens*** : face aux actions risquées (`ASI02`), la norme `RFC 9396` remplace les portées plates par un objet JSON structuré `authorization_details` précisant action, ressource et plafonds quantitatifs [214]. En interne, les **Transaction Tokens** (`draft-ietf-oauth-transaction-tokens`) émis par un *Transaction Token Service* (`TTS`) propagent un jeton bref à contexte **immuable** (`Txn-Token`) sur toute la chaîne d’appels, empêchant toute dérive d’intention (*Goal Drift*) entre sous-agents [212].

La figure 10.2 synthétise ce mécanisme de délégation et d’interception.

> **[Figure]**
> - Utilisateur / SoE
> - Agent Orchestrateur
> - (SVID + clé DPoP)
> - STS / Serveur OAuth (RFC 8693, 8707, 9396)
> - MCP Gateway (PEP) & Intent Gate (PDP)
> - System of Record
> - (API / SoR cible)
> - Utilisateur / SoE Agent Orchestrateur
> - (SVID + clé DPoP)
> - STS / Serveur OAuth (RFC 8693, 8707, 9396)
> - MCP Gateway (PEP) & Intent Gate (PDP)
> - System of Record
> - (API / SoR cible)
> - 1. Requête initiale et échange On-Behalf-Of (downscoping)
> - 1 Requête avec jeton OAuth (portée initiale large)
> - 2
> - Token Exchange (RFC 8693) subject_token + actor_token (SVID) + resource (RFC 8707) + DPoP (RFC 9449) + authorization_details (RFC 9396)
> - 3 Jeton OBO lié DPoP + Txn-Token (sub: user, act: agent, aud: mcp-gw, portée réduite et plafond RAR)
> - 2. Contrôle déterministe par Intent Gate (OPA / Cedar)
> - 4 POST /mcp tools/call (Authorization: DPoP + preuve HTTP, outil et paramètres conformes)
> - 5 Vérifie signature JWT, audience RFC 8707, preuve DPoP et chaîne act[]
> - 6 Évalue politique OPA/Cedar (PDP) : Principal, Action, Resource, Context
> - 7 Exécution bornée et idempotente (Txn-Token propagé en audit)
> - 8 200 OK (confirmation)
> - 9 Réponse MCP filtrée
> - 3. Rejet déterministe d'une dérive par injection indirecte (ASI01/ASI03)
> - 10 tools/call injecté (outil exclu ou paramètre hors plafond)
> - 1 1 Intent Gate (forbid / deny) : portée ou contrainte RFC 9396 violée
> - 12 403 Forbidden / Escalade HITL + Alerte AIDR (aucun appel SoR)

*Fig. 38. – Séquence d’autorisation dynamique : échange OAuth 2.0 OBO (RFC 8693 + RFC 8707 + DPoP), downscoping multi-sauts et évaluation par Intent Gate*

### 10.3.3 *Intent Gates* déterministes : *Policy-as-Code* avec `OPA/Rego` et `Cedar`

Même muni d’un jeton OBO lié par `DPoP`, un agent victime d’une injection ou d’une hallucination peut déclencher une opération abusive dans son périmètre nominal [204] [231]. L’**Intent Gate** interpose un contrôle déterministe *Policy-as-Code* hors du `LLM`, devant la `MCP Gateway` (chapitre 04) et les passerelles `A2A` (chapitre 05) [221] [231]. Selon `NIST SP 800-207`, la passerelle agit en *Policy Enforcement Point* (`PEP`) interrogeant un *Policy Decision Point* (`PDP`) qui rend un verdict `allow`, `deny` ou `escalate_hitl` [207] [227] [231]. Le tableau 10.2 compare les deux moteurs dominants :

- `OPA` **/** `Rego` (`CNCF`) : moteur généraliste inspiré de Datalog évaluant des règles sur documents JSON (`input` et `data` en mémoire) [227]. Intégré à `Envoy` et `SPIRE`, il exprime des règles contextuelles riches — profondeur `act[]`, fenêtres horaires, seuils d’escalade `HITL` (`ASI09`) — en imposant explicitement `default allow := false` car une règle non satisfaite vaut *indéfini* [229] [227].
- `Cedar` (notamment dans `Amazon Bedrock AgentCore Policy`) : langage typé structuré autour de `Principal`, `Action`, `Resource` et `Context`, séparant strictement les politiques du code applicatif [215] [231]. Il combine refus par défaut, modèle `permit` /`forbid`, validation contre le schéma d’outils et vérification par raisonnement automatisé (*automated reasoning*) pour repérer avant déploiement toute règle trop permissive ou contradictoire [215] [231].

| Critère architectural | `OPA` / `Rego` (CNCF) | `Cedar` (ex. `AgentCore Policy`) | Arbitrage de sélection |
| --- | --- | --- | --- |
| Modèle d’évaluation | Datalog généraliste sur JSON (`input` /`data`) [227] | Typé par schéma (`Principal`, `Action`, `Resource`, `Context`) [215] [231] | `OPA` pour infra transversale ; `Cedar` pour autorisation fine d’outils |
| Défaut de sécurité | Indéfini ; exige `default allow := false` [227] | Refus par défaut et modèle `permit` /`forbid` [215] [231] | `Cedar` limite les erreurs d’omission sur les garde-fous critiques |
| Validation en amont | Tests unitaires `Rego` [227] | Validation schéma + raisonnement automatisé [215] [231] | `Cedar` lorsqu’une analyse formelle de permissivité est requise |
| Logique contextuelle | Très riche (chaîne `act[]`, temps, données externes) [227] | Structurée autour d’entités et d’attributs typés [215] | `OPA` pour croiser quotas, graphe de délégation et contexte multi-sauts |
| Intégration plateforme | `Kubernetes`, `Envoy SDS + SPIRE`, passerelles `MCP` [229] [227] | Moteur embarquable, `AgentCore Gateway` [215] [231] | Selon l’ancrage Kubernetes ou géré de la plateforme (ch. 13) |

*Tableau 10.2 — Comparaison architecturale des moteurs d’Intent Gate : OPA/Rego contre Cedar.*

### 10.3.4 Double lecture EA / SA

Pour l’**EA**, la délégation bornée élimine les comptes techniques permanents sur les `SoR`, rattache chaque mutation à l’initiateur humain et à la lignée `act[]`, et déplace les plafonds métier impératifs des prompts vers un patrimoine *Policy-as-Code* auditable [221] [219] [227] [215]. Pour le **SA**, le verrouillage repose sur l’interdiction du *token passthrough* [217], le couplage `RFC 8693` + `RFC 8707` + `DPoP` (`RFC 9449`) [219] [230] [220], la propagation immuable par `Txn-Token` [212] et l’interception synchrone par `OPA` /`Cedar` avec escalade `HITL` sur seuils `RFC 9396` [214] [231].

> **Arbitrage EA / SA** — Interdire tout compte de service omnipotent et tout relais passif de jeton (*token passthrough*) dans les chaînes multi-agents et serveurs `MCP` [216] [217]. L’`EA` impose la traçabilité `(sub, act[])`, le *downscoping* par tâche et le versionnement des règles impératives dans des `Intent Gates` déterministes [219] [227] [215]. Le `SA` assemble `OAuth 2.0 OBO` (`RFC 8693`), `RFC 8707`, `DPoP` (`RFC 9449`), `Transaction Tokens` contre le *Goal Drift*, et `OPA` /`Cedar` devant la `MCP Gateway` avec escalade `HITL` sur les bornes `RFC 9396` [214] [220] [212] [231].

## 10.4 Confinement d’exécution (microVM, gVisor, WASM), protection PII et postures AISPM/AIDR

### 10.4.1 Confinement système des outils à risque et du code généré (`ASI05`)

Le chapitre 03 a posé l’usage de `SHADI` et de `Agent Sandbox` / `SandboxWarmPool` face aux conteneurs `runc` nus. Il reste à examiner la mécanique de sécurité de ces technologies devant l’exécution de code arbitraire (`ASI05`) et la cohabitation multi-locataires [204] [218]. Un conteneur Linux ordinaire repose sur des espaces de noms, `cgroups` et filtres `seccomp` partageant un même noyau hôte écrit en C [223] : une faille dans l’API d’appels système permet l’évasion vers l’hôte et le vol des `SVID` voisins [218] [223]. Trois régimes durcis répondent à ces contraintes, comparés au tableau 10.3 et arbitrés à la figure 10.3 :

1. **MicroVM matérielles (**`Firecracker` **et** `Kata Containers`**)** : `Firecracker` isole chaque charge sous l’hyperviseur Linux `KVM` avec un noyau invité minimal et des périphériques virtio restreints (`Net`, `Block`, `Vsock` avec limitation de débit I/O) [222]. Le processus `VMM` est confiné en production par `jailer` via `chroot`, `cgroups`, espaces de noms PID/réseau et abandon de privilèges `UID` /`GID` [222]. Avec un noyau minimal et 128 Mio de RAM, un hôte de 36 cœurs crée jusqu’à 5 microVM par cœur et par seconde (180/s) [222]. Pour préserver la compatibilité avec les images `OCI` et l’interface `CRI` Kubernetes, **Kata Containers** exécute les conteneurs dans des microVM à noyau dédié via `Firecracker`, `Cloud-Hypervisor` ou `QEMU` [232].
2. **Noyau applicatif en espace utilisateur (**`gVisor`**)** : `gVisor` (`runsc`) interpose le noyau applicatif `Sentry`, écrit en `Go` (mémoire sûre), qui intercepte et traite en espace utilisateur la majorité des appels système Linux du conteneur [223]. Les accès fichiers passent par un mandataire cloisonné distinct, `Gofer`, via `LISAFS` (ou `Directfs`) [223]. Cette couche réduit drastiquement la surface exposée au noyau hôte C sans exiger `KVM`, au prix d’un surcoût sur les charges intensives en I/O ou appels système [223].
3. **Isolation par capacités et mémoire linéaire (**`Wasmtime` **et** `Component Model`**)** : pour les extensions de passerelle, validateurs ou scripts *Code Mode* (chapitre 04) compilables en WebAssembly, `Wasmtime` procure une isolation logicielle stricte [224]. La pile d’appels demeure inaccessible au code invité, les pointeurs sont vérifiés en bornes dans une mémoire linéaire dotée par défaut d’une **zone de garde de 2 Go**, les sauts de contrôle sont typés et aucun appel système brut n’est exposé (*zero ambient authority*) [224]. Grâce au **Component Model** et aux interfaces `WIT` **/**`WASI`, l’hôte n’accorde que des capacités explicitement liées (répertoires pré-ouverts, requêtes HTTP ciblées) [224].

| Régime d’isolation | Frontière de sécurité | Composants clés | Compatibilité | Compromis performance | Usage agentique cible |
| --- | --- | --- | --- | --- | --- |
| `runc` durci | Noyau hôte partagé (`namespaces` /`seccomp`) | `containerd`, `AppArmor` | Totale (OCI Linux) | Surcoût minimal | Outils internes déterministes sans code généré |
| `gVisor` **(**`runsc`**)** | Noyau applicatif `Go` en espace utilisateur [223] | `Sentry` + `Gofer` (`LISAFS`) [223] | Élevée (OCI standard, sans KVM) [223] | Surcoût sur I/O et syscalls intensifs [223] | Interpréteurs Python/Node et `MCP` multi-locataires sans KVM |
| `Firecracker` **/** `Kata` | Hyperviseur `KVM` + noyau invité dédié [222] [232] | `VMM` + `jailer` ; `Kata CRI` [222] [232] | Totale (binaires ou OCI via Kata) [232] | Jusqu’à 5 microVM/cœur/s (128 Mio RAM) [222] | Code arbitraire (`ASI05`), navigation isolée, charges critiques |
| `Wasmtime` **/** `WASI` | Mémoire linéaire bornée + capacités `WIT` [224] | Garde 2 Go, `Component Model` [224] | Code compilable `.wasm` (Rust, Go, JS) [224] | Très haute densité, démarrage rapide | Scripts `Code Mode`, filtres en ligne, greffons `MCP` |

*Tableau 10.3 — Matrice comparative d’architecture et de sécurité des régimes de confinement d’exécution agentique.*

> **[Figure]**
> - Outil ou code invoqué par l'agent après passage Intent Gate (OPA / Cedar)
> - Exécution de code arbitraire, binaire natif ou multi-locataires hostile ?
> - oui non — appel d'API métier déterministe
> - Charge compatible OCI standard sans réécriture en Wasm ?
> - oui non — greffon / parseur compilable
> - Exigence d'isolation matérielle (KVM et noyau invité dédié) ?
> - oui non — pas de KVM ou forte densité
> - Firecracker / Kata Containers MicroVM + Jailer (chroot, cgroups) Jusqu'à 5 microVM/cœur/s (128 Mio RAM)
> - gVisor (runsc) Noyau Sentry en Go + proxy Gofer Surface noyau hôte réduite sans VM
> - Wasmtime / Component Model (WASI) Mémoire linéaire bornée (garde 2 Go) Zero ambient authority (interfaces WIT)
> - Conteneur durci + Proxy Egress Non-root, seccomp, FS lecture seule Blocage réseaux privés / métadonnées (anti-SSRF)
> - Appliquer filtrage PII (Presidio / NeMo) et remonter traces vers AIDR

*Fig. 39. – Arbre de décision architectural pour la sélection du confinement d’exécution (Wasmtime, gVisor, Firecracker/Kata) et du niveau d’Intent Gate*

### 10.4.2 Filtrage réseau sortant et protection `PII` au fil de l’eau

L’isolation de calcul doit être doublée d’un mandataire réseau sortant (*egress proxy*) à refus par défaut, bloquant les requêtes vers les réseaux internes, les points de métadonnées d’infrastructure et les domaines externes non homologués contre les attaques **SSRF** et l’exfiltration [221] [205]. En parallèle, le transit des données sensibles dans les invites, retours `MCP` et journaux impose un filtrage des données personnelles (`PII`) en ligne [221] [233] [234] :

1. **Détection et dé-identification configurable (**`Presidio`**)** : le cadriciel ouvert **Presidio** (*Data Privacy Stack*) associe reconnaissance d’entités nommées (`NER`), expressions régulières, sommes de contrôle et contexte multilingue pour localiser puis anonymiser, masquer, hacher ou chiffrer par opérateurs configurables les entités `PII` avant inférence, appel d’outil ou journalisation [233].
2. **Garde-fous synchrones (**`NeMo Guardrails` **et** `API Intercept`**)** : **NVIDIA NeMo Guardrails** orchestre de manière programmable des contrôles sur les entrées, sorties, passages `RAG` et appels d’outils en s’appuyant notamment sur `Presidio` pour bloquer ou caviarder les fuites avant transmission au modèle [234]. À la passerelle, des interfaces telles que **Prisma AIRS API Intercept** inspectent synchronement requêtes, réponses et flux `MCP` selon des profils déclarés pour masquer les données sensibles, bloquer les URL malveillantes et contrer injections ou attaques sur bases de données [235].

### 10.4.3 Boucle continue `AISPM` et `AIDR` : inventaire, posture et réponse en temps réel

Pour pallier le *Shadow AI* et les attaques graduelles réparties sur plusieurs tours, l’architecture Zero-Trust relie deux boucles continues [236] [213] [235], représentées à la figure 10.4 :

- **L’AISPM (*AI Security Posture Management*)** assure l’inventaire et la prévention continue : découverte des agents, modèles, assistants `SaaS`, bases vectorielles et serveurs `MCP` pour maintenir une nomenclature `AI-BOM`, détection des `NHI` sur-privilégiées (`NHI5`), des secrets exposés (`NHI2`) et des dérives de configuration face aux référentiels **OWASP AI Exchange** et **ASI01–ASI10** avant exécution [204] [236] [213].
- **L’AIDR (*AI Detection and Response*)** surveille l’exécution en temps réel : elle corrèle l’ensemble de la trajectoire — invites, contextes récupérés, appels `MCP`, accès mémoire, échanges `A2A`, `SPIFFE ID` et lignée `act[]` — afin d’identifier une dérive comportementale ou une exfiltration multi-étapes (`ASI01` /`ASI08` /`ASI10`) [213] [235]. En cas d’incident, l’`AIDR` déclenche une réponse automatisée : blocage à l’`Intent Gate`, suspension du workflow, suppression de l’enregistrement `SPIRE` bloquant le renouvellement du `SVID` et mise en quarantaine du bac à sable [225] [213] [235].

Cette télémétrie sécuritaire alimente directement la pile `OpenTelemetry GenAI` et les coupe-circuits `SRE` décrits au chapitre 11 [221] [213].

> **[Figure]**
> - Plan de gouvernance et
> - d'identité
> - [system]
> - Plan d'exécution Zero-Trust (Data Plane)
> - [system]
> - Confinement, cibles et
> - détection runtime
> - [system]
> - «container» AISPM & AI-BOM
> - [Posture continue]
> - Inventaire Shadow AI, audit NHI et serveurs MCP
> - «container» SPIRE Server & STS
> - [Identité & Jetons]
> - Attestation SPIFFE, OAuth OBO et Txn-Tokens
> - «container» Agent Harness (CaMeL)
> - [Flots séparés]
> - Séparation contrôle/données
> - et étiquettes provenance
> - «container» MCP Gateway & Intent
> - Gate [OPA Rego / Cedar (PEP/PDP)]
> - Validation DPoP/RFC 8707,
> - politiques et anti-SSRF
> - «container» AI Gateway & Filtre PII
> - [Presidio / NeMo / AIRS]
> - Masquage PII en ligne,
> - blocage injections
> - «container» Confinement d'exécution
> - [Firecracker / gVisor / Wasm]
> - Isolation noyau/capacités pour code et outils risqués
> - «external_system» Systems of Record &
> - Outils
> - ERP, CRM, dépôts internes
> - «external_system» Modèles d'inférence
> - LLM cloud ou souverain
> - «container» Plateforme AIDR
> - [Détection & Réponse]
> - Corrélation trajectoires, coupe-circuit et révocation
> - Durcit posture
> - et catalogue
> - Délivre SVID et jetons OBO
> - Requêtes outils
> - signées DPoP
> - Appels modèles
> - sous contrôle
> - Délègue code et outils risqués
> - Appels bornés et idempotents
> - Inférence sans PII (données masquées)
> - Télémétrie décisions
> - Alertes PII/injections
> - Révoque SVID sur dérive ASI10

*Fig. 40. – Architecture Zero-Trust de défense en profondeur d’un domaine agentique : AISPM pré-déploiement, AI Gateway PII, Agent Harness CaMeL, Intent Gate, confinement et AIDR*

En pratique, cette boucle fermée unifie les contrôles préventifs recensés par l’`OWASP AI Exchange` — contrôle des données entrantes, limitation des comportements indésirables et durcissement d’infrastructure — avec la réponse active sur les trajectoires [236] [213]. Au lieu de traiter la sécurité des agents comme un pare-feu périmétrique isolé, la combinaison `AISPM` + `AIDR` relie en permanence l’inventaire des identités machines, les politiques déterministes et les journaux d’exécution [213] [235].

### 10.4.4 Double lecture EA / SA

Pour l’**EA**, le couple `AISPM` /`AIDR` et le masquage `PII` matérialisent la maîtrise du risque : le portefeuille maintient un `AI-BOM` vérifié, borne l’exposition des données personnelles aux modèles tiers et garantit un arrêt ciblé des agents déviants (`ASI10`) [204] [233] [213]. L’EA arbitre aussi le compromis économique entre microVM `Firecracker` /`Kata` pour le code non fiable et haute densité `Wasmtime` /`gVisor` [222] [223] [224] [232]. Pour le **SA**, la défense en profondeur interdit `runc` nu sur les exécutions de code, verrouille l’egress anti-`SSRF`, applique `Presidio` /`NeMo` avant sortie vers modèles ou journaux et connecte l’`AIDR` à la révocation `SPIRE` /`OAuth` [225] [223] [233] [234] [213] [235].

> **Arbitrage EA / SA** — Imposer une défense en profondeur unissant confinement adapté au risque, filtrage `PII` /egress en ligne et boucle continue `AISPM` /`AIDR` [222] [233] [213]. L’`EA` proscrit tout agent absent de l’`AI-BOM` de l’`AISPM`, exige le masquage ou chiffrement `PII` avant appel vers un modèle tiers externe, et impose un arrêt d’urgence ciblé contre `ASI10` [233] [213]. Le `SA` bannit `runc` nu pour l’exécution de code (`ASI05`) au profit de `Firecracker` /`Kata`, `gVisor` ou `Wasmtime` /`WASI`, verrouille les sorties réseau anti-`SSRF` et raccorde l’`AIDR` à la révocation des identités `SPIFFE` /`OBO` [225] [222] [223] [224] [213].

## Synthèse et transition

La sécurité d’une entreprise agentique ne repose ni sur un périmètre réseau statique ni sur la discipline sémantique des modèles de langage. En combinant la modélisation `OWASP ASI01–ASI10` et la séparation contrôle/données (`CaMeL`) avec des identités attestées sans secret statique (`SPIFFE` /`SPIRE`), une délégation `OAuth 2.0 OBO` bornée (`RFC 8693`, `RFC 8707`, `DPoP`, `RFC 9396`, `Txn-Tokens`), des `Intent Gates` déterministes (`OPA` /`Cedar`), le confinement système (`Firecracker`, `gVisor`, `Wasmtime`), le filtrage `PII` et la boucle `AISPM` /`AIDR`, l’architecture Zero-Trust maîtrise techniquement le rayon d’impact cognitif.

Chaque requête génère désormais des preuves cryptographiques corrélées (`SPIFFE ID`, `act[]`, `Txn-Token`) et des décisions de politiques exploitables. Le **chapitre 11** expose comment instrumenter ces trajectoires dans `OpenTelemetry GenAI`, automatiser la validation `EvalOps` et piloter les coupe-circuits `SRE`, avant que le **chapitre 12** n’inscrive ces garanties techniques dans les cadres réglementaires et économiques `FinOps`.

# Chapitre 11 — Observabilité distribuée (OpenTelemetry), EvalOps continu et fiabilité (SRE agentique)

Une architecture agentique dotée d’identités `Zero-Trust` (chapitre 10) et d’un moteur d’exécution durable (chapitre 09) reste aveugle en production si l’entreprise ne peut ni corréler ses trajectoires cognitives, ni prouver statistiquement leur qualité avant déploiement, ni couper une boucle pathologique en temps réel. Là où un service déterministe échoue par un code `HTTP 500` net, un `System of Agency` peut réussir techniquement chaque requête réseau tout en dérivant sémantiquement, en épuisant des quotas d’inférence ou en propageant une erreur en cascade sur plusieurs domaines [237] [238] [239].

Ce chapitre pose le socle d’observabilité, d’évaluation continue (`EvalOps`) et de fiabilité (`SRE`) de la Partie IV. Côté `SA`, l’enjeu est d’unifier la télémétrie `OpenTelemetry` sur `MCP`, `A2A` et l’inférence, d’automatiser des bancs de trajectoires hermétiques, de piloter des `SLI` /`SLO` comportementaux et d’armer des coupe-circuits cognitifs à repli déterministe [240] [241] [242] [243]. Côté `EA`, il s’agit de garantir l’auditabilité des délégations humaines et machines, d’interdire la fuite de données personnelles en télémétrie et de protéger les `Systems of Record` (`SoR`) [244] [245] [246] [247]. Par frontière d’étanchéité, la gouvernance économique `FinOps` relève du chapitre 12 et le déploiement `GitOps` de l’`AI Gateway` du chapitre 13.

## 11.1 Instrumentation unifiée `OpenTelemetry GenAI` : corrélation traces, identités `SPIFFE` /`OBO` et coûts

### 11.1.1 Convergence vers les conventions sémantiques `OpenTelemetry GenAI`

Les traceurs propriétaires fragmentaient jusqu’ici l’observabilité des invites, appels d’outils et graphes de décision, enfermant chaque équipe dans des formats incompatibles [248]. Le groupe de travail `OpenTelemetry GenAI SIG` maintient désormais un référentiel dédié (`open-telemetry/semantic-conventions-genai`) qui normalise de façon agnostique les spans, événements d’exception et métriques pour modèles, bases vectorielles et agents autonomes [240] [248].

La hiérarchie normative d’une exécution agentique s’articule autour de trois familles de spans [240] [249] [250] :

1. **Spans de cycle de vie et d’orchestration** (`create_agent`, `invoke_agent` client ou interne, et `plan`) : encadrent l’invocation globale, corrélée par `gen_ai.conversation.id` et qualifiée par un nom d’agent de faible cardinalité (`gen_ai.agent.name`) et sa version (`gen_ai.agent.version`), en émettant `gen_ai.invoke_agent.exception` lors d’un arrêt anormal [240]. Les attributs d’aiguillage (`gen_ai.agent.name`, `gen_ai.operation.name`) doivent être fournis dès la création du span afin de guider l’échantillonnage [240].
2. **Spans d’opérations de modèle** (`inference`, `embeddings`, `retrieval`, `fetch_response`) : tracent chaque passe cognitive, le modèle effectif (`gen_ai.response.model`), les compteurs de jetons (y compris `cache_read.input_tokens` et ventilations par modalité) ainsi que la raison d’arrêt (`gen_ai.response.finish_reasons`) [240] [250].

3. **Spans d’exécution d’outils** (`gen_ai.execute_tool`) : capturent chaque appel vers une capacité externe et l’événement `gen_ai.execute_tool.exception`, avec des raffinements spécialisés pour les agents exposés comme outils, le chargement de compétences (*Agent Skills*) et l’exécution de commandes [249].

Cette grammaire unifiée permet à tout backend conforme à `OTLP` de reconstituer l’arbre causal multi-tours sans couplage à un cadriciel ni à un fournisseur d’inférence unique [248].

### 11.1.2 Propagation du contexte sur `MCP` (`SEP-414`), `A2A` et `W3C Trace Context`

Dès qu’un agent franchit une frontière réseau vers une `MCP Gateway` (chapitre 04) ou un pair `Agent-to-Agent` (`A2A`, chapitre 05), la continuité causale repose sur la propagation distribuée. Sur transport `HTTP` classique, les en-têtes normalisés `traceparent` et `tracestate` du standard `W3C Trace Context` relient les spans inter-services [251]. En revanche, `MCP` véhicule des messages `JSON-RPC` multiplexés sur `stdio` ou `Streamable HTTP` où plusieurs requêtes et notifications circulent au sein d’un même flux persistant [252].

Les conventions `OpenTelemetry` pour `MCP` adoptent donc la proposition `SEP-414` : l’appelant injecte les clés `traceparent`, `tracestate` et `baggage` **sans préfixe DNS** directement dans le dictionnaire `params._meta` de chaque requête ou notification, et le serveur `MCP` en extrait le contexte pour l’attacher comme parent distant tout en mesurant `mcp.client.operation.duration`, `mcp.server.operation.duration` et les durées de session [252]. Côté délégation horizontale, les conventions `A2A` normalisent les spans `a2a.client` et `a2a.server` (sur `HTTP` et `gRPC`) en enregistrant le nom de méthode (`SendMessage`, `SendStreamingMessage`), le locataire (`tenant`) et l’identifiant `contextId`, tout en maintenant une séparation nette entre transport inter-agents et spans cognitifs de niveau supérieur [253].

### 11.1.3 Corrélation des identités `SPIFFE` /`OBO` et télémétrie des coûts d’exécution

Relier la consommation de jetons et la latence d’outils à une responsabilité juridique exige d’unir télémétrie et sécurité (chapitre 10). L’architecture associe l’identité cryptographique de la charge de travail — `SPIFFE ID` et `SVID` éphémères (`X.509` ou `JWT`) délivrés par l’API locale [245] — à la délégation humaine `OAuth 2.0 Token Exchange` (`RFC 8693`), où la revendication `sub` désigne le sujet mandant tandis que l’objet JSON imbriqué `act` identifie l’acteur immédiat au niveau externe et préserve les intermédiaires amont dans les niveaux internes [244].

Les conventions `OpenTelemetry GenAI` ne normalisant pas encore nativement ces champs d’identité, l’architecte définit un contrat d’extension explicite d’entreprise :

1. **Provenance** `OTLP` **par** `SPIFFE` : les collecteurs et SDK s’authentifient mutuellement (`mTLS`) par `SVID` éphémères, éliminant les clés API statiques de télémétrie et attestant la provenance de chaque span [245].
2. **Attributs d’extension sur traces** : chaque span critique (`invoke_agent`, `execute_tool`, `a2a.server`) enregistre `spiffe.workload.id`, l’acteur courant `auth.obo.actor` extrait du `act` externe et un condensat cryptographique irréversible du `sub` humain afin de préserver la traçabilité sans exposer d’identifiant nominatif [244] [245] [254].
3. **Propagation légère par** `W3C Baggage` : seuls des attributs de routage non sensibles (code de centre de coûts, classe de criticité métier) circulent via `OpenTelemetry Baggage` (y compris dans `params._meta` sous `MCP`), en proscrivant toute donnée personnelle ou charge volumineuse répliquée sur chaque saut réseau [252] [255].

Pour la mesure technique des coûts et volumes d’exécution, `OpenTelemetry` sépare strictement deux familles métriques [256] [257]. Les **compteurs monotones** (`gen_ai.client.inference.usage.input_tokens`, `output_tokens`, `cache_read.input_tokens`, `cache_write.input_tokens` et `reasoning.output_tokens`), ventilés par `gen_ai.token.modality`, alimentent le calcul des rythmes de dépense transmis au pilotage `FinOps` du chapitre 12 [256]. À l’inverse, les **histogrammes par opération** (`gen_ai.client.inference.operation.input_tokens` et `output_tokens`) suivent la distribution par appel et omettent délibérément la modalité afin que les quantiles `p95` /`p99` restent mathématiquement exacts — car sommer des percentiles par modalité fausserait l’estimation du coût unitaire réel [256]. Côté agent, `gen_ai.invoke_agent.inference_calls` comptabilise chaque invocation logique de modèle indépendamment des reprises réseau sous-jacentes, `gen_ai.invoke_agent.tool_calls` dénombre les appels d’outils par exécution et `gen_ai.invoke_agent.duration` adopte des bornes d’histogramme étendues de `0,1 s` à `86 400 s` (`24 h`) pour couvrir les boucles durables [257]. Enfin, `gen_ai.agent.name` doit demeurer de faible cardinalité (jamais un nom de classe générique tel `"StateGraph"` ni un identifiant de session) pour protéger la base `TSDB` [240] [257].

> **[Figure]**
> - Plan d'exécution
> - agentique
> - [system]
> - Pipeline Collecteur OTel
> - (Enclave)
> - [system]
> - Puits Observabilité &
> - Audit [system]
> - «container» Agent Harness [invoke_agent / chat]
> - Émet spans OTel GenAI, SVID SPIFFE & jeton OBO
> - «container» MCP Gateway [execute_tool / mcp]
> - Extrait traceparent & baggage via params._meta
> - «container» Pair A2A / Inférence
> - [a2a.client / model]
> - Propage contextId, usage.\* & TTFT/TPOT
> - «container» Collector Edge [redactionprocessor + OTTL]
> - Allowlist clés, hache sub,
> - masque PII (contenu=0)
> - «container» Collector Tail-Sampling
> - [tailsamplingprocessor]
> - Retient 100 % erreurs, route métriques usage.\*
> - «container» Backend Traces
> - [OTLP / Phoenix]
> - Traces liées trace_id,
> - act & SPIFFE ID
> - «container» TSDB Métriques SRE
> - [Prometheus]
> - Compteurs jetons & histogrammes latence
> - «container» Journal Audit WORM
> - [SIEM Immuable]
> - Chaîne OBO sub -> act
> - sans payload brut
> - tools/call + _meta traceparent
> - SendMessage /
> - inférence
> - Export OTLP (mTLS SPIFFE)
> - Spans MCP + attributs OBO
> - Spans assainis
> - sans PII
> - Traces anomalie
> - & échantillon
> - Métriques gen_ai.\*
> - faible cardinalité
> - Piste identités
> - SPIFFE / OBO

*Fig. 41. – Topologie d’instrumentation unifiée OpenTelemetry GenAI, corrélation SPIFFE/OBO et pipeline collecteur assaini*

### 11.1.4 Assainissement des charges utiles et échantillonnage tardif (*Tail Sampling*)

L’observabilité brute entre en conflit direct avec la protection des renseignements personnels. Par défaut, `OpenTelemetry GenAI` impose un mode `Opt-In` strict (`OTEL_INSTRUMENTATION_GENAI_CAPTURE_CONTENT`) avant de capturer instructions système, invites ou complétions (`gen_ai.input.messages`, `gen_ai.output.messages`), et prévoit même l’externalisation vers un dépôt chiffré hors bande (`OTEL_INSTRUMENTATION_GENAI_CONTENT_HOOK`, format configurable via `OTEL_INSTRUMENTATION_GENAI_UPLOAD_FORMAT`) ne laissant que des références `*_ref` sur les spans [248] [250]. En production courante, l’observabilité partagée respecte l’invariant `payload bytes = 0` posé sur la `MCP Gateway` au chapitre 04.

Comme l’illustre la figure 11.1, cet invariant est appliqué en enclave par un `OpenTelemetry Collector` combinant filtrage déterministe et sélection tardive :

- **Assainissement (**`redactionprocessor` **et** `transformprocessor`**)** : le `redactionprocessor` supprime d’abord tout attribut absent de sa liste blanche (`allowed_keys`), puis masque les motifs interdits (`blocked_values`) [246]. En parallèle, le `transformprocessor` (`OTTL`) hache les identifiants sujets et réécrit tout attribut résiduel avant exportation vers les puits partagés [254].
- **Échantillonnage tardif (**`tailsamplingprocessor`**)** : plutôt qu’un échantillonnage aveugle en tête qui perdrait les défaillances rares, le collecteur tamponne les spans jusqu’à achèvement de la trace complète pour retenir **100 %** des erreurs, dépassements de latence ou déclenchements de garde-fous, tout en sous-échantillonnant les trajectoires nominales [258]. Cette topologie exige un équilibrage de charge conscient du `trace_id` entre instances de collecteur [258].

| Signal / Attribut | Référence normative | Rôle `SA` | Exigence `EA` |
| --- | --- | --- | --- |
| `invoke_agent`, `inference`, `execute_tool` | `OTel GenAI` [240] [249] [250] | Reconstituer l’arbre causal multi-tours et les versions | Attribut `gen_ai.agent.name` à faible cardinalité [240] |
| `params._meta` (`traceparent`, `baggage`) | `W3C` & `SEP-414` (`MCP`) [252] [251] | Corréler le trafic `JSON-RPC` multiplexé | Zéro PII ou charge lourde dans `baggage` [255] |
| `a2a.client` / `a2a.server` (`contextId`) | `OTel A2A` [253] | Suivre la délégation asynchrone inter-agents | Cloisonnement locataire et séparation transport/cognition [253] |
| Compteurs `usage.*` vs histogrammes `operation.*` | `OTel Token Metrics` [256] | Calculer débits de jetons et quantiles `p95` /`p99` | Agrégats propres transmis au suivi `FinOps` (ch. 12) [256] |
| `SPIFFE SVID` + claims `sub` / `act` | `SPIFFE` & `RFC 8693` [244] [245] | Relier spans critiques aux identités machine/mandant | Piste WORM hachant `sub` ; transport `OTLP` en `mTLS` [244] [245] [254] |
| `redactionprocessor`, `OTTL`, `tailsampling` | `OTel Collector` [246] [258] [254] | Retenir 100 % des anomalies sans fuite de données | Politique `Opt-In` stricte ; `payload bytes = 0` par défaut [248] [250] |

*Tableau 11.1 — Convention de mappage* `OpenTelemetry GenAI` *: corrélation traces, identités* `SPIFFE` */*`OBO` *et assainissement.*

> **Arbitrage EA / SA** — Imposer `OpenTelemetry GenAI` (`invoke_agent`, `execute_tool`, `MCP` `SEP-414` et `A2A`) comme contrat télémétrique unique tout en maintenant la capture brute `Opt-In` désactivée par défaut en production [240] [252] [253] [250]. Le `SA` mappe les extensions d’entreprise `spiffe.workload.id`, `auth.obo.actor` (`act`) et `sub` haché par `OTTL`, sépare compteurs `usage.*` et histogrammes `operation.*`, et chaîne `redactionprocessor`, `transformprocessor` et `tailsamplingprocessor` derrière un routage par `trace_id` [256] [244] [246] [258] [254]. L’`EA` exige le `mTLS` `SPIFFE` sur le pipeline `OTLP` et proscrit toute PII dans `W3C Baggage` ou les dimensions métriques [257] [255] [245].

## 11.2 Pipeline `EvalOps` industriel : `golden datasets` de trajectoires, `mock MCP servers` et juges calibrés

### 11.2.1 Trajectoire et état final : la divergence entre `pass@k` et `pass^k`

Un agent autonome modifie un environnement au fil de plusieurs tours probabilistes, exposant les tests naïfs à deux erreurs symétriques [241]. Ne noter que le texte final masque les *défaillances silencieuses* : un agent peut annoncer une réservation confirmée sans avoir muté la base de données ou obtenir le bon résultat par un appel erroné [241] [259]. À l’inverse, figer une séquence rigide sans inspecter l’état final pénalise un modèle plus capable qui atteint légitimement l’objectif par un chemin plus court ou contourne une ambiguïté de règle [241].

Une ingénierie `EvalOps` rigoureuse sépare clairement chaque **tâche** (*task*), chaque **essai** (*trial*), la **trajectoire complète** (*transcript* incluant pensées, appels d’outils et traces) et l’**état final vérifié** (*outcome*, tel l’état exact d’une base SQL) [241] [237]. Elle distingue également l’**infrastructure d’évaluation** (*eval harness*) de l’**échafaudage applicatif** (*agent harness*) évalué conjointement avec le modèle [241]. Répéter `k` essais met alors en évidence une divergence décisive formalisée par `tau-bench` et Anthropic [241] [237] :

- **La métrique** `pass@k` mesure la probabilité d’obtenir au moins une réussite en `k` tentatives et converge vers `100 %` lorsque `k` augmente, convenant aux tâches exploratoires filtrables par tests unitaires déterministes [241].
- **La métrique** `pass^k` mesure la probabilité que **les** `k` **tentatives réussissent toutes** sans exception [237]. Avec un succès unitaire de `75 %`, `pass^3` chute déjà à `(0,75)³ ≈ 42 %` [241]. Sur `tau-bench`, même des agents avancés réussissent moins de `50 %` des tâches et tombent sous `25 %` à `pass^8` dans le commerce de détail [237].

Pour les processus autonomes exposés aux clients ou aux `SoR`, le `pass^k` devient l’indicateur contractuel de constance exigé en homologation plutôt qu’un score `pass@1` flatteur [241] [237].

### 11.2.2 `Golden datasets` de trajectoires et suites capacité / non-régression

Contrairement à une idée reçue exigeant des centaines de cas initiaux, Anthropic montre qu’un amorçage de `20` à `50` tâches simples tirées d’échecs réels suffit au démarrage pour détecter des écarts significatifs à forte taille d’effet, car attendre trop longtemps oblige ensuite à rétro-concevoir les critères de succès à partir d’un système déjà en production [241]. Ce patrimoine se structure ensuite en deux batteries complémentaires unifiées dans des plateformes telles que `Langfuse` [241] [260] :

1. **Suites de capacité** (*capability evals*) : ciblent les tâches difficiles ou capacités émergentes à taux de réussite initial bas pour guider l’amélioration itérative des invites, outils `ACI` et cascades [241].
2. **Suites de non-régression** (*regression evals*) : constituent la porte bloquante d’intégration continue (`CI`) avec un taux cible proche de `100 %` [241] [260]. Tout cas de capacité stabilisé gradue vers la suite de non-régression, elle-même alimentée en boucle fermée par la conversion des traces de production annotées ou en échec en jeux d’essais versionnés [241] [260].

Pour noter les séquences d’outils sans rigidité excessive, le critère `tool_trajectory_avg_score` de `Google ADK` définit trois régimes [259] : `EXACT` (ordre, outils et arguments strictement identiques), `IN_ORDER` (ordre relatif respecté malgré des lectures intermédiaires) et `ANY_ORDER` (présence de tous les appels attendus sans contrainte d’ordre) [259]. Des critères d’efficience purement informatifs (`tool_call_count_v1`, `inference_call_count_v1`, `token_usage_v1`, `invocation_duration_v1`) suivent les dérives d’amplification sans jamais déclencher de faux échecs fonctionnels [259].

### 11.2.3 Bancs hermétiques : `mock MCP servers`, simulation d’environnement et bacs à sable

Tester des trajectoires en `CI` contre des `SoR` réels provoque effets de bord destructeurs, coûts externes et variabilité réseau [261] [262]. L’architecture `EvalOps` isole donc les tests derrière trois mécanismes complémentaires :

1. **Vérification contractuelle par** `MCP Inspector` : la commande automatisée `npx @modelcontextprotocol/inspector --cli` interroge `tools/list`, vérifie la conformité des schémas `JSON-RPC` sur transports `stdio` ou `Streamable HTTP` et valide les réponses de serveurs simulés dès l’étape `CI` [263].
2. **Simulation d’environnement et injection de fautes** : selon le patron `Environment Simulation` de `Google ADK` (branché via `before_tool_callback` ou greffon dédié sans modifier le code de l’agent), une couche d’interception applique d’abord un **mode d’injection déterministe** (réponses figées ou codes d’erreur `HTTP 503` paramétrés par arguments et graine aléatoire) pour vérifier les chemins de repli, puis recourt à défaut à un **mode de simulation par modèle** (*mock strategy*) contraint par le schéma de l’outil et l’état de session [261].
3. **Confinement conteneurisé par essai (**`Inspect AI`**)** : lorsque l’agent manipule fichiers, terminaux ou bases locales, chaque échantillon tourne dans un bac à sable `Docker` dédié exposant une interface normalisée (`exec`, `read_file`, `write_file`) avec nettoyage automatique et plafonds de ressources afin d’empêcher toute interférence lors de campagnes parallèles [262].

> **[Figure]**
> - 1. Déclencheurs & Référentiel 2. Banc Hermétique CI/CD
> - 3. Évaluateurs Étagés
> - 4. Porte & Rétroaction
> - PR Git (Code / Prompt / MCP)
> - Golden Dataset (Trajectoires & cas prod)
> - Harnais EvalOps (Essais k : pass@k / pass^k)
> - Simulateur MCP / Env (Injection 503 & Mock)
> - Tier 1 : Code Graders (Exact / In-Order / État DB)
> - Tier 2 : Juge LLM Calibré (Swap + rubrique G-Eval)
> - Tier 3 : Calibration SME (Accord κ validé)
> - Porte CI/CD (Bloque si régression)
> - Traces Production (Échantillons échecs)
> - Déclenche suite
> - Injecte tâches
> - Mock outils
> - Transcripts &
> - états finaux
> - Cas conformes
> - au juge
> - Corrige biais &
> - criteria drift
> - Verdict T1
> - Verdict T2
> - Échecs annotés
> - Promeut cas

*Fig. 42. – Pipeline EvalOps continu : portes CI/CD, simulation hermétique et calibration des juges*

### 11.2.4 Juges `LLM` calibrés, biais métriques et *criteria drift*

Lorsque les assertions déterministes ne suffisent plus pour apprécier nuance politique ou qualité rédactionnelle — là où les métriques lexicales comme `BLEU` ou `ROUGE` corrèlent mal avec le jugement humain — l’approche *LLM-as-a-Judge* formalisée par `G-Eval` (chaîne de pensée et grille structurée, atteignant une corrélation de Spearman de `0,514` sur le résumé) et `MT-Bench` apporte le passage à l’échelle [264] [265]. Elle introduit toutefois trois vulnérabilités documentées :

- **Biais du juge probabiliste** : Zheng et al. caractérisent les biais de **position** en comparaison par paires, de **verbosité** (favorisant les réponses longues) et d’**auto-favoritisme** envers les sorties issues de la même famille de modèles [264].
- **Illusion du taux d’accord brut** : Thakur et al. montrent sur treize modèles juges qu’un accord brut élevé en pourcentage masque des écarts pouvant atteindre cinq points sur les barèmes humains ainsi qu’une tendance à l’indulgence et une sensibilité à la complexité des invites, rendant indispensable l’usage de métriques corrigées du hasard telles que le **kappa de Cohen (**`κ`**)** [266].
- **Dérive des critères (*criteria drift*)** : Shankar et al. (`EvalGen`) démontrent que les experts métier découvrent et affinent leurs exigences réelles en annotant des traces concrètes plutôt qu’en rédigeant des grilles figées *a priori* [267].

La figure 11.2 synthétise l’étagement retenu : les évaluateurs en code (Tier 1) filtrent d’abord contrats et état final à coût quasi nul ; seuls les cas conformes passent devant un juge `LLM` dé-biaisé par permutation symétrique des paires et rubriques `G-Eval` (Tier 2) ; enfin, des experts métier (Tier 3) révisent un échantillon stratifié pour corriger le *criteria drift* et vérifier un accord `κ` élevé (avec une cible d’ingénierie recommandée `κ ≥ 0,75` avant de rendre un juge bloquant en `CI/CD`) [241] [264] [267] [266] [260] [265].

| Dimension | Code déterministe (Tier 1) | Trajectoire & Mock `MCP` | Juge `LLM` calibré (Tier 2) | Revue humaine `SME` (Tier 3) |
| --- | --- | --- | --- | --- |
| Cible | Contrats `JSON`, état `DB` [241] | Outils (`EXACT` /`IN_ORDER` /`ANY_ORDER`) et fautes `503` [259] [261] | Nuance sémantique, hallucinations (`G-Eval`) [259] [265] | Vérité terrain et *criteria drift* [241] [267] |
| Fiabilité et biais | Déterministe ; rigide hors schéma [241] | Reproductible si injection amorcée [261] | Biais position, verbosité, indulgence [264] [266] | Accord inter-humains variable [267] |
| Rôle `CI/CD` | Bloquant à chaque *commit* [241] | Bloquant sur PR et contrats `MCP` [261] [263] | Bloquant après Tier 1 si validé par `κ` [266] [260] | Échantillonnage hebdomadaire et post-incident [241] [267] |
| Coût et latence | Millisecondes [241] | Faible (bac à sable isolé) [261] [262] | Modéré (permutations et rubriques) [264] [265] | Élevé (expertise rare) [241] |

*Tableau 11.2 — Matrice comparative des évaluateurs étagés et stratégies de simulation en* `EvalOps`*.*

> **Arbitrage EA / SA** — Imposer l’évaluation conjointe trajectoire + état final en banc hermétique (`mock MCP servers`, injection amorcée ou conteneurs isolés) avant toute mise en production, en interdisant les tests automatisés sur `SoR` réels [241] [261] [262]. Le `SA` exécute Tier 1 avant Tier 2, applique la permutation symétrique et calibre chaque juge par kappa de Cohen (`κ`) [241] [264] [266]. L’`EA` fixe des seuils contractuels `pass^k` sur les flux critiques et maintient une recalibration experte continue contre le *criteria drift* [237] [267].

## 11.3 `SRE` agentique : `SLI` /`SLO` comportementaux, détection de dérive sémantique et rejeu forensique

### 11.3.1 Extension des `SLI` /`SLO` aux comportements cognitifs

Un agent peut maintenir `99,9 %` de disponibilité réseau tout en rendant un service inutilisable par boucles répétitives ou appels d’outils invalides [237] [242]. Le `SRE` agentique complète donc les indicateurs d’infrastructure par des `SLI` comportementaux reliés à un **budget d’erreur** commun :

1. `SLI` **d’infrastructure et d’inférence** : latence au premier jeton (`gen_ai.server.time_to_first_token`, `TTFT`), temps par jeton de sortie (`gen_ai.server.time_per_output_token`, `TPOT`), durée globale (`gen_ai.invoke_agent.duration`) et taux d’erreurs (`error.type`) [240] [257].
2. `SLI` **comportementaux et de trajectoire** : conformité `JSON Schema` au premier essai, proportion d’exécutions sans déclenchement de garde-fou, distribution de `gen_ai.invoke_agent.tool_calls` et `inference_calls`, et score `EvalOps` en ligne sur traces échantillonnées [257] [259] [260].

Toute dégradation de validité ou d’outillage consomme ce budget d’erreur et déclenche un gel des évolutions de prompts ou de modèles (articulé avec le cycle `GitOps` du chapitre 13) [260] [242].

### 11.3.2 Alertes multi-fenêtres sur taux d’épuisement (*Multiwindow, Multi-Burn-Rate*)

Le *Google SRE Workbook* montre que la conception d’alertes arbitre quatre paramètres : **précision**, **rappel**, **temps de détection** et **temps de réinitialisation** [242]. Les seuils instantanés provoquent du bruit sur micro-rafales, tandis qu’une fenêtre longue isolée maintient l’alerte active longtemps après résolution de l’incident [242]. Les équipes `SRE` alertent donc sur la vitesse d’épuisement du budget d’erreur (*burn rate*) via deux fenêtres couplées : une fenêtre longue mesurant l’impact cumulé sur `30 jours` et une fenêtre courte au douzième (`1/12`) garantissant que le défaut est encore actif et s’éteint en quelques minutes après reprise [242].

Pour un `SLO` de `99,9 %` (`0,1 %` de budget mensuel), la configuration de référence prescrit [242] :

- **Pagination immédiate (**`Page`**)** à `14,4×` sur `1 h` / `5 min` (`2 %` du budget consommé, extinction en cinq minutes après retour à la normale) ou `6×` sur `6 h` / `30 min` (`5 %` du budget) [242].
- **Billet asynchrone (**`Ticket`**)** à `1×` sur `3 jours` / `6 h` (`10 %` du budget), idéal pour signaler une dérive sémantique progressive sans réveiller l’astreinte [242].

### 11.3.3 Détection de dérive sémantique en absence de vérité terrain

En exploitation, l’annotation humaine arrive avec retard ou reste absente sur les grands volumes [268]. Le cadre `NIST AI RMF 1.0` (`NIST AI 100-1`) — structuré autour des fonctions continues *Govern*, *Map*, *Measure* et *Manage* — impose pourtant sous *Measure* et *Manage* une surveillance continue des dérives de données, de modèles et de concepts assortie de seuils déclencheurs de recalibration, de réentraînement ou de retrait [247]. En outre, les dérives proviennent autant des entrées métier externes (évolution saisonnière ou lexicale) que des mises à jour silencieuses des fournisseurs d’inférence ou des descriptions d’outils `MCP` [268] [247]. Faute d’étiquettes immédiates, l’étude comparative d’Evidently AI formalise cinq détecteurs sur les vecteurs d’enchâssement (*embeddings*) face à une fenêtre de référence validée [268] :

1. **Distance euclidienne entre centroïdes** : écart linéaire entre vecteurs moyens de référence et courants [268].
2. **Distance cosinus entre centroïdes** : écart angulaire entre centroïdes ; comme la distance euclidienne, ces approches agrégées peuvent toutefois masquer des déformations multimodales internes lorsque la moyenne globale reste stable [268].
3. **Classifieur binaire de domaine** : discrimine référence et flux courant via l’aire sous courbe (`ROC AUC`) ; retenu par Evidently comme défaut pragmatique pour détecter les glissements textuels [268].
4. **Part de composantes dérivantes** : applique des tests univariés dimension par dimension pour quantifier la proportion de coordonnées modifiées [268].
5. **Écart maximal moyen (**`MMD`**)** : test à noyau non paramétrique comparant les distributions multivariées complètes au-delà de leurs centroïdes [268].

La corrélation de ces signaux avec `gen_ai.response.model` et `gen_ai.agent.version` permet de distinguer immédiatement un glissement de la clientèle métier d’une mise à jour silencieuse d’un modèle amont [240] [268] [250].

> **[Figure]**
> - Sources Télémétrie & État
> - Détection & Alertes SRE
> - Rejeu Forensique & Remédiation Spans & Métriques OTLP (TTFT, TPOT, tool_calls)
> - Vecteurs Embeddings (Entrées & Sorties)
> - Journal Durable /Checkpoints
> - Moteur SLI/SLO Burn Rate (14.4x / 6x -> Page 1 x -> Ticket)
> - Détecteur Dérive Sémantique (Classifieur + Cosinus + MMD)
> - Escalade Astreinte & Promotion EvalOps
> - Replayer Déterministe (Temporal History JSON)
> - Banc Fork & Sandbox (LangGraph / Inspect AI)
> - Fenêtres longues &
> - courtes (1/12)
> - Compare référence
> - vs flux courant
> - Alerte burn rate /dépassement SLO
> - Signal dérive sans vérité terrain
> - Diagnostic d'orchestration
> - Reproduit branche
> - cognitive
> - Historique immuable
> - Snapshot super-étape

*Fig. 43. – Chaîne SRE agentique : calcul multi-fenêtres burn rate, détection de dérive sémantique et rejeu forensique*

### 11.3.4 Rejeu forensique : rejeu déterministe contre bifurcation en bac à sable

Face à un incident non déterministe, relancer la requête initiale ne reproduit pas la même trajectoire [241] [269]. La figure 11.3 sépare deux mécanismes forensiques complémentaires [270] [269] :

1. **Rejeu déterministe d’orchestration (**`Temporal Replayer`**)** : extrait l’historique immuable de production (`WorkflowHistory.from_json`) et restitue au code d’orchestration les résultats enregistrés dans les `Activities` sans ré-appeler modèles ni outils [270]. Exécuté en lot avec l’option `fail_fast=false` sur les historiques d’une `TaskQueue`, il valide en intégration continue qu’une mise à jour du graphe de workflow ne provoque aucune erreur de non-déterminisme sur les cas passés [270].
2. **Bifurcation cognitive en bac à sable (**`LangGraph Time Travel`**)** : inspecte les points de reprise (`get_state_history`) pour rejouer (`replay`) ou modifier l’état (`fork`) et tester un correctif de prompt [269]. Parce que les nœuds en aval sont **ré-exécutés**, tout `fork` doit impérativement tourner en enclave `EvalOps` devant des `mock MCP servers`, jamais sur des `SoR` réels [261] [262] [269].

| Dimension `SRE` | Indicateurs et outils | Règle de déclenchement | Réponse opérationnelle |
| --- | --- | --- | --- |
| Latence et erreurs d’inférence | `TTFT`, `TPOT`, durée agent, ratio `429` /`5xx` [257] | Multi-fenêtres `14,4×` (`1 h/5 min`) et `6×` (`6 h/30 min`) [242] | Pagination `SA` et bascule `AI Gateway` [242] |
| Qualité comportementale | Validité `JSON`, `pass^1` en ligne, `tool_calls` [257] [259] | `Burn rate` `1×` (`3 j/6 h`, `10 %` budget) [260] [242] | Billet d’analyse et gel des prompts [242] |
| Dérive sémantique | Classifieur domaine, cosinus, `MMD` [268] | Seuil `AUC` ou `MMD` vs référence [268] [247] | Recalibration `EvalOps` / alerte *Manage* [267] [247] |
| Rejeu d’orchestration | `Temporal Replayer` (`WorkflowHistory`) [270] | Erreur de non-déterminisme ou bogue flux [270] | Replay exact à coût nul sans `LLM` ni `MCP` [270] |
| Bifurcation cognitive | `LangGraph` `get_state_history` + `fork` [269] | Incident de raisonnement ou ajout au dataset [260] [269] | Exécution confinée sur `mock MCP` uniquement [261] [269] |

*Tableau 11.3 — Référentiel des* `SLI` */*`SLO` *comportementaux, politiques de* `burn rate` *et rejeu forensique.*

> **Arbitrage EA / SA** — Subordonner l’exploitation des agents à des `SLO` comportementaux couplés à des alertes `burn rate` multi-fenêtres (`14,4×`, `6×`, `1×`) [257] [242]. Le `SA` corrèle la dérive sémantique (classifieur ou `MMD`) avec `gen_ai.response.model`, réserve `Temporal Replayer` au diagnostic d’orchestration et confine tout `fork` cognitif sur `mock MCP servers` [268] [270] [269] [250]. L’`EA` exige la traçabilité `MEASURE` /`MANAGE` (`NIST AI 100-1`) et la rétention d’historiques auditables [247] [270].

## 11.4 Coupe-circuits cognitifs, plafonds de profondeur et repli automatique vers flux déterministe

### 11.4.1 Pathologies d’emballement : `LLM10`, `ASI08` et `ASI10`

La résilience réseau classique ne protège pas contre un agent sain techniquement mais bloqué dans une dérive cognitive coûteuse [238] [239]. Le référentiel `OWASP` distingue trois menaces majeures : la **consommation non bornée (**`LLM10:2025`**)** générant déni de service (`DoS`) sur les GPU et *Denial of Wallet* (`DoW`) par boucles récursives ou flux de longueur non bornée [239] ; les **défaillances en cascade (**`ASI08`**)** où une hallucination ou une rupture de schéma se propage et s’amplifie entre agents sans contrôle intermédiaire [238] ; et les **agents hors mandat (**`ASI10`**)** opérant en boucle auto-entretenue [238]. Un agent ne doit donc jamais arbitrer seul la poursuite de sa boucle : les verrous appartiennent au code déterministe du harnais et des passerelles [238] [239].

### 11.4.2 Plafonds de profondeur et insuffisance des bornes génériques

Les cadriciels exposent des garde-fous mécaniques aux sémantiques distinctes [271] [272]. `OpenAI Agents SDK` compte les **tours** d’inférence (chaque invocation modèle et ses appels d’outils associés) et lève `MaxTurnsExceeded` au dépassement de `max_turns` — réglage qu’il est impératif de ne pas désactiver via `max_turns=None` en production —, complété par des déclencheurs rapides `input_guardrails` et `output_guardrails` (`TripwireTriggered`) exécutés en contrôle amont ou aval [271]. `LangGraph` borne les **super-étapes** (*super-steps*) via `recursion_limit` (`GraphRecursionError`), dont la valeur par défaut dans les versions `1.0.6` à `1.1.3` atteint `10 000` **étapes** [272]. Conserver ce réglage par défaut en production est irresponsable : il faut abaisser explicitement `recursion_limit` (en clé de configuration de haut niveau, hors sous-objet `configurable`, ou via `LANGGRAPH_DEFAULT_RECURSION_LIMIT`) par cas d’usage et exploiter `RemainingSteps` pour sortir proprement avant l’exception [272]. Toutefois, un plafond statique reste tardif face à un agent répétant en boucle le même appel erroné [271] [272].

### 11.4.3 Anatomie du coupe-circuit cognitif à états étendus

Pour interrompre précocement ces boucles, l’architecture adapte l’automate *Circuit Breaker* de Martin Fowler (`CLOSED`, `OPEN`, `HALF_OPEN`) [273] et ses extensions `Resilience4j` (`METRICS_ONLY`, `DISABLED`, `FORCED_OPEN`, fenêtres glissantes à complexité `O(1)` par *Subtract-on-Evict* sur `RingBitBuffer` et `slow-call rate`) [243] au contrôle cognitif :

1. **Empreinte répétitive d’outils** : le harnais calcule un hachage canonique `(tool_name, sorted_arguments)` à chaque tour et coupe la boucle si la même empreinte ou le même état se répète `N` fois consécutivement (par exemple `2` ou `3`) sans progression.
2. **Taux d’erreurs de schéma et de lenteur** : sur fenêtre glissante par décompte ou par temps maintenue en `O(1)` sans balayage coûteux [243], une hausse des rejets `JSON Schema`, erreurs `isError: true`, déclenchements `guardrails` ou appels lents (`slow-call rate`) bascule le circuit vers `OPEN` [243] [271].
3. **Calibration et arrêt d’urgence** : `METRICS_ONLY` observe les franchissements sans bloquer lors de la mise au point des seuils en mode ombre, tandis que `FORCED_OPEN` procure au `SOC` /`SRE` un interrupteur d’arrêt immédiat (*kill-switch*) contre un agent `ASI10` [238] [243].

Comme le montre la figure 11.4, à l’échéance du délai de refroidissement, `HALF_OPEN` n’autorise que des sondes canari bornées validées par vérificateurs Tier 1 avant de refermer le circuit [273] [243]. En exécution durable (chapitre 09), l’évaluation et l’état du circuit résident dans l’`Activity` et sont journalisés afin de préserver le rejeu `Temporal Replayer` [270].

> **[Figure]**
> - METRICS_ONLY (Calibration silencieuse)
> - CLOSED (Exécution nominale sous max_turns / recursion_limit)
> - OPEN (Coupure cognitive immédiate : repli déterministe L0 / HITL)
> - HALF_OPEN (Sondes canari bornées validées par Tier 1)
> - FORCED_OPEN (Arrêt d'urgence opérateur ou alerte ASI10)
> - Déploiement mode ombre
> - Seuils validés (promotion prod)
> - Répétition hachage >= N ou budget / dérive / erreurs >= seuil
> - Expiration délai refroidissement Échec ou lenteur
> - d'une sonde
> - Sondes saines (succès Tier 1)
> - Kill-switch manuel ou mandat violé (ASI10)
> - Escalade incident systémique (ASI08)
> - Réarmement autorisé
> - après correctif

*Fig. 44. – Automate coupe-circuit cognitif à états étendus, plafonds de profondeur et repli déterministe*

### 11.4.4 Repli automatique vers un flux déterministe (`L0`)

En état `OPEN` ou `FORCED_OPEN`, le système bascule sans appeler le modèle vers un mode dégradé prévu par la partition `80/20` (chapitre 03) et l’échelle `L0` –`L4` (chapitre 01) :

1. **Workflow déterministe** `L0` : exécution directe d’un arbre de règles (`OPA`/code) ou d’un formulaire guidé dans le `SoE` pour les processus structurés, garantissant la continuité de service sans inférence [238] [273].
2. **Réponse documentaire non générative** : restitution directe des extraits issus de la recherche lexicale/hybride en lecture seule (`readOnlyHint: true`) sans étape de synthèse générative risquée.
3. **Escalation** `Human-on-the-Loop` **(**`HOTL`**)** : suspension durable du dossier avec trace `OpenTelemetry`, identifiant d’acteur `SPIFFE` /`OBO` et motif exact de coupure pour revue humaine auditée, ou compensation de la Saga à l’expiration du `SLA` [244] [270] [238].

| Déclencheur | Détection déterministe | Action `SA` | Exigence `EA` |
| --- | --- | --- | --- |
| Boucle d’outil répétitive | Hachage `(tool_name, args)` sur fenêtre glissante | Coupure locale `OPEN` immédiate [273] | Aucun auto-arbitrage par le `LLM` [238] |
| Plafond de profondeur | `max_turns`, `recursion_limit`, `RemainingSteps` [271] [272] | Sortie ordonnée vers repli `L0` [272] | Seuil strict par cas (`10 000` proscrit) [272] |
| Erreurs schémas / lenteur | Fenêtre `Resilience4j` (`failureRate` + `slowCallRate`) [243] | `OPEN` -> flux `L0` ; sondage `HALF_OPEN` [273] [243] | Continuité métier sans inférence critique |
| Dérive `ASI08` / `ASI10` | `traceparent` + profondeur + `tripwires` [251] [238] [271] | Bascule `FORCED_OPEN` et escalade `HOTL` [238] [243] | Révocation `SVID` /`OBO` ; audit WORM [244] [245] |
| Emballement `LLM10` | Compteurs `usage.*` + `burn rate` [256] [242] [239] | Quotas par locataire et mode non génératif [239] | Liaison aux plafonds `FinOps` (ch. 12) |

*Tableau 11.4 — Matrice de décision des coupe-circuits cognitifs, plafonds et replis déterministes.*

> **Arbitrage EA / SA** — Proscrire les plafonds par défaut permissifs (`recursion_limit = 10 000`, `max_turns=None`) et toute auto-limitation confiée au `LLM` [238] [271] [272]. Le `SA` combine `max_turns`, `RemainingSteps`, hachage d’arguments et coupe-circuit à cinq états (`METRICS_ONLY`, `CLOSED`, `OPEN`, `HALF_OPEN`, `FORCED_OPEN`) routant vers un flux `L0` ou `HOTL` [273] [243] [271] [272]. L’`EA` exige des tests périodiques de ce repli sans inférence et un arrêt d’urgence `FORCED_OPEN` face aux risques `LLM10`, `ASI08` et `ASI10` [238] [239] [243].

## Synthèse et transition vers le chapitre 12

En unifiant la télémétrie `OpenTelemetry GenAI`, `MCP` (`SEP-414`) et `A2A` avec les identités `SPIFFE` /`OBO` sous assainissement strict [240] [252] [244] [246], en industrialisant `EvalOps` sur bancs hermétiques et juges calibrés au kappa de Cohen [241] [261] [266], et en couplant alertes `burn rate`, détection de dérive, rejeu forensique et coupe-circuits cognitifs à repli déterministe [242] [268] [270] [243], l’entreprise rend ses agents auditables et fiables. Les métriques d’usage (`usage.*`), attributs `Baggage` et journaux `NIST AI RMF` ainsi produits alimentent directement la conformité et le pilotage `FinOps` du chapitre 12.

# Chapitre 12 — Gouvernance d’entreprise, conformité réglementaire et FinOps agentique

Disposer d’agents protégés par identités non humaines (`NHI`) et portes d’intention (chapitre 10), instrumentés par `OpenTelemetry` et encadrés par des coupe-circuits `SRE` (chapitre 11), ne légitime pas leur généralisation en entreprise. Sans gouvernance institutionnelle, trois dérives menacent le portefeuille : prolifération hors inventaire (*Shadow AI*), exposition juridique lors de décisions automatisées et dérive des factures d’inférence. Selon l’enquête *State of FinOps 2026*, **98 %** des équipes FinOps gèrent désormais des dépenses d’IA (contre 31 % deux ans plus tôt), alors que **43 %** des organisations sondées en septembre 2026 dans *State of Tokenomics* peinent encore à démontrer leur retour sur investissement (`ROI`) [274].

Ce chapitre clôt la Partie IV sur le modèle opérationnel, la conformité et le `FinOps` agentique. En **lecture** `EA`, il fixe l’imputabilité, la maîtrise des risques, la conformité légale et l’économie du portefeuille ; en **lecture** `SA`, il les traduit en métadonnées de registre, preuves d’audit, leviers de cache/routage et signaux d’imputation. Par frontière d’étanchéité, l’architecture technique de l’`IAP`, de l’`AI Gateway` et du cycle `GitOps` relève du chapitre 13.

## 12.1 Modèle opérationnel cible : registre central d’agents, homologation par risque et Agent Owner

### 12.1.1 Du Shadow AI au registre central fédéré

L’essor des assistants configurables et des serveurs `MCP` permet à toute ligne d’affaires d’assembler un agent autonome en quelques heures [275] [276]. Dès que ces déploiements contournent les plans de contrôle, l’organisation ignore quels modèles traitent ses données sensibles et quelles délégations atteignent les `Systems of Record` (`SoR`) [275] [277]. Pour contenir ce *Shadow AI*, le `Cloud Adoption Framework` recommande d’étendre les mécanismes de gouvernance existants au lieu de bâtir une bureaucratie parallèle [275].

Prolongeant le catalogue posé devant l’`ARB` au chapitre 2, le **registre central d’agents** (`Agent Registry`) dissocie deux strates complémentaires [277] :

1. **La strate d’inventaire et de catalogue unifié (**`Agent Registry`**)** : elle répertorie tous les agents actifs — harnais internes, plateformes `PaaS` et offres `SaaS` tierces, incluant les agents sans identité native dits *registry-only* [277]. Adossée aux schémas `OASF` du chapitre 5, elle normalise les capacités déclarées, les serveurs `MCP` autorisés, la sensibilité des données, le palier `L0–L4` et la cote de risque [277] [276].
2. **La strate d’identité cryptographique (**`Agent Identity` **et** `Blueprints`**)** : reliée au socle `NHI` du chapitre 10, elle associe chaque fiche du registre à une identité technique instanciée depuis un modèle directeur (*Agent Identity Blueprint*) portant authentification, portées `OAuth` et accès conditionnel [277].

En **lecture SA**, aucun flux n’accède à la production sans liaison bidirectionnelle vérifiable entre l’identifiant du catalogue et l’identité d’exécution (`Agent ID` ou `SPIFFE ID`) [277] [276]. Le registre automatise aussi les politiques d’hygiène : révocation des agents inactifs selon une politique d’expiration configurable, recertification périodique et suspension immédiate en cas de dépassement des seuils `SRE` [277].

### 12.1.2 Séparation des rôles, Agent Owner et Trois Lignes de Défense (3LoD)

Les premiers projets agentiques souffrent fréquemment d’une responsabilité diluée entre équipes techniques, directions métier et fournisseurs de modèles [278] [279]. Publiée le 11 septembre 2025 par le Bureau du surintendant des institutions financières (`BSIF` / `OSFI`) avec prise d’effet au **1er mai 2027**, la **Ligne directrice E-23** (*Model Risk Management*) fournit aux institutions financières fédérales (`FRFI`) et aux grandes entreprises un cadre rigoureux directement transposable aux agents [278].

Le `BSIF` englobe explicitement l’IA, l’apprentissage automatique et les systèmes autonomes à apprentissage dynamique dans sa définition du modèle, exige un inventaire central (*Model Inventory*) et impose une séparation stricte des mandats sur tout le cycle de vie [278] :

- **L’**`Agent Owner` **(**`Model Owner`**)** : responsable métier nommé (jamais un compte générique) répondant du mandat d’usage, du budget et de la conformité [277] [278]. Il maintient la documentation, supervise les revues d’accès et active le coupe-circuit métier ; tout agent orphelin sans *sponsor* actif est suspendu [277] [278].
- **Le** `Model Developer` : conçoit le harnais `80/20`, intègre les outils `MCP`, exécute `EvalOps` et déploie les garde-fous locaux [278] [279].
- **Le** `Model Reviewer` : évalue indépendamment solidité conceptuelle, intrants, biais, sécurité et limites [278] [279].
- **Le** `Model Approver` **(**`ARB` **/ Comité IA)** : autorise ou révoque la mise en service selon l’appétit au risque, au vu des conclusions du `Model Reviewer` [278].

Pour éviter que les revues manuelles n’asphyxient la livraison logicielle, l’organisation transpose les **Trois Lignes de Défense (**`3LoD`**)** à la cadence du code [279] [276]. La **1re ligne (**`1LoD`**)** intègre les contrôles déterministes dans le harnais et le pipeline (`Policy-as-Code`, filtres, plafonds) [279]. La **2e ligne (**`2LoD`**)** établit les grilles de risque et déploie des contrôles continus, pouvant mobiliser des agents vérificateurs spécialisés pour pré-auditer l’architecture face aux normes [279] [276]. La **3e ligne (**`3LoD`**)** — l’audit interne — exploite des pistes immuables pour attester indépendamment l’efficacité des contrôles amont [279].

> **[Figure]**
> - 1re ligne (1LoD — Produit & Plateforme)
> - Gouvernance centrale (ARB)
> - 2e ligne (2LoD — Contrôle)
> - 3e ligne (3LoD — Audit)
> - Agent Owner /Sponsor métier
> - Équipe Domaine & Harnais 80/20
> - Registre central (OASF + Agent ID) Homologation par
> - palier (R1 à R4)
> - Model Reviewer (Risque, RPRP, Sécurité)
> - Model Approver (ARB / Comité IA)
> - Audit interne (Pistes immuables)
> - Conformité, traçabilité
> - et maîtrise du risque
> - soumet dossier
> - endosse mandat
> - inscrit / suspend
> - évalue R3-R4
> - homologue
> - vérifie preuves
> - cadre

*Fig. 45. – Modèle opérationnel cible EA : registre central, homologation par palier de risque et Trois Lignes de Défense*

### 12.1.3 Paliers d’homologation par niveau de risque (R1 à R4) et cycle de décommissionnement

Appliquer le même processus d’approbation à un assistant documentaire interne qu’à un agent octroyant du crédit paralyse la livraison ou banalise le risque [275] [278]. Selon l’approche proportionnelle d’OSFI E-23, le registre classe chaque agent sur quatre paliers de risque inhérent (`R1` à `R4`) [275] [278].

| Palier | Périmètre et autonomie | Instance d’homologation | Exigences de validation | Cycle de révision et retrait |
| --- | --- | --- | --- | --- |
| `R1` **— Minimal** | Lecture interne (`L0–L1`), zéro mutation `SoR`, zéro renseignement personnel (`RP`) | `Agent Owner` + contrôles `1LoD` automatisés [275] [277] | Fiche `OASF`, `Agent ID`, plafond budgétaire | Revue annuelle et politique d’expiration sur inactivité (`Agent ID`) [277] |
| `R2` **— Modéré** | Synthèse métier (`L1–L2`), accès à corpus internes restreints | `Agent Owner` + revue ciblée `2LoD` (sécurité/données) [278] | Suite `EvalOps` initiale, propagation `ACL`, traces `OTel` [276] | Revue semestrielle de dérive et de coûts [278] |
| `R3` **— Élevé** | Traitement de `RP` sensibles, écritures compensables (`L2–L3`) | Revue indépendante (`Model Reviewer`) + approbation `ARB` [278] [279] | `ÉFVP` préalable, `red teaming`, coupe-circuit vérifié [278] [280] | Revue trimestrielle, recertification annuelle et audit `3LoD` [278] |
| `R4` **— Critique** | Décision à effet juridique/financier ou action irréversible (`L3–L4`) | Comité exécutif des risques (`Model Approver`) + `RPRP` [278] [281] | `ÉFVP` + fiche `AIA`, validation indépendante, repli `L0` prouvé [278] [282] | Surveillance continue, revue trimestrielle et plan de retrait testé [278] |

*Tableau 12.1 — Matrice d’homologation proportionnelle par palier de risque (*`R1` *à* `R4`*) et responsabilités* `3LoD`*.*

Tout changement substantiel (nouveau modèle frontalier, nouvel outil mutateur ou extension de population) déclenche une réévaluation de palier [278]. Enfin, le **décommissionnement** clôture formellement le cycle : révocation des certificats `NHI`, purge des mémoires selon les calendriers de conservation, archivage immuable des journaux et bascule vers un processus déterministe [277] [278].

> **Arbitrage EA / SA** — Interdire tout déploiement en production d’un agent absent du registre central, dépourvu d’`Agent Owner` humain nommé ou sans palier `R1–R4` assigné [277] [278]. L’`EA` impose la séparation entre concepteur (`1LoD`), évaluateur indépendant (`2LoD`) et approbateur (`ARB`) dès le palier `R3` [278] [279] ; le `SA` automatise l’homologation `R1–R2`, lie chaque identifiant de catalogue à son `Agent ID` cryptographique et applique la suspension automatique sur perte de *sponsor* ou inactivité [277] [276].

## 12.2 Conformité multi-juridictionnelle : Loi 25 (Québec), LPRPDE, EU AI Act, NIST AI RMF et ISO/IEC 42001

Une organisation opérant au Québec, au Canada et en Europe doit satisfaire simultanément des lois sur la vie privée, des directives publiques, des règlements par niveau de risque et des normes certifiables [281] [283] [284] [285]. L’architecture gagnante consiste à retenir l’enveloppe la plus exigeante de ces textes et à la convertir en preuves d’ingénierie unifiées [276] [285].

### 12.2.1 Québec (Loi 25) : RPRP, ÉFVP préalable et décisions exclusivement automatisées

Au Québec, la *Loi sur la protection des renseignements personnels dans le secteur privé* (`RLRQ, c. P-39.1`, modernisée par la **Loi 25**) impose trois exigences directes sur les `Systems of Agency` [281] :

1. **Responsable de la protection des renseignements personnels (**`RPRP`**,** `article 3.1`**)** : l’entreprise répond de tout renseignement personnel (`RP`) détenu, y compris ceux traités ou inférés par des agents [281]. Le rôle incombe par défaut à la plus haute autorité (délégation écrite possible) et agit en vérificateur `2LoD` sur les projets `R3–R4` [278] [281].
2. `ÉFVP` **dès l’amorce et portabilité (**`article 3.3`**)** : tout projet d’acquisition, de développement ou de refonte traitant des `RP` impose une évaluation des facteurs relatifs à la vie privée (`ÉFVP`) proportionnelle à la sensibilité, à la finalité, à la quantité, à la répartition et au support des données, avec consultation du `RPRP` **dès le début du projet** [281]. Elle vérifie aussi la restitution des `RP` informatisés dans un **format technologique structuré et couramment utilisé**, contraignant les mémoires du chapitre 6 [281].
3. **Décisions exclusivement automatisées (**`article 12.1` **au privé,** `article 65.2` **au public)** : l’organisation informe la personne concernée **au plus tard lors de la communication de la décision** [281] [286]. Sur demande, elle divulgue les `RP` utilisés, les **raisons, facteurs et paramètres principaux**, le droit de rectification et permet de **présenter des observations à un membre du personnel habilité à réviser la décision** [281] [286].

Le guide normatif québécois souligne un point critique pour le `SA` : une intervention humaine mineure, dépourvue de répercussion réelle sur le résultat, ne soustrait pas le système à cette qualification [286]. Une interface `HITL` de pure approbation mécanique (identifiée au chapitre 1) laisse donc l’entreprise exposée aux exigences de l’article 12.1 ou 65.2 [286].

### 12.2.2 Canada fédéral (LPRPDE et Directive sur la prise de décisions automatisée)

Sur le plan fédéral, la planification architecturale doit s’appuyer sur le droit positif en vigueur en 2026 [283] [287]. Le **projet de loi C-27** (*Loi de 2022 sur la mise en œuvre de la Charte du numérique*, incluant le projet de `LIAD` /`AIDA`) est demeuré inachevé à l’étape du comité lors de la **prorogation parlementaire du 6 janvier 2025** et est mort au feuilleton sans devenir loi [287].

En conséquence, la **LPRPDE** reste la loi fédérale applicable au secteur privé canadien [283] [287]. Pour les systèmes génératifs et agentiques, le Commissariat à la protection de la vie privée du Canada (`CPVP` / `OPC`) et ses homologues provinciaux et territoriaux ont publié les *Principes pour des technologies d’IA générative responsables, dignes de confiance et respectueuses de la vie privée* [283]. Ces principes exigent une autorité légale et un consentement valide tout au long du cycle de vie (y compris lors d’inférences ou de données tierces), l’évitement de **zones interdites** (*no-go zones* : profilage discriminatoire ou atteinte grave aux droits), la gestion de l’exactitude face aux hallucinations probabilistes, la protection dès la conception, la transparence et l’exercice des droits d’accès et de rectification [283].

Pour les institutions fédérales — et à titre de gabarit dans les marchés publics — la **Directive sur la prise de décisions automatisée** du Conseil du Trésor (`SCT`) s’applique dès qu’un système recommande ou rend une décision administrative, **même lorsqu’un humain intervient dans la boucle** [282]. Elle impose de compléter et publier une **Évaluation de l’incidence algorithmique (**`ÉIA` **/** `AIA`**)**, outil ouvert évaluant conception du système, algorithme, type de décision, incidence et données afin d’imposer des mesures d’atténuation proportionnelles [282].

### 12.2.3 Union européenne : EU AI Act et amendements Digital Omnibus on AI

Pour les services opérant sur le marché européen, le **Règlement (UE) 2024/1689 (**`EU AI Act`**)** classe les systèmes selon quatre niveaux de risque (inacceptable/interdit, haut risque, transparence, minimal) et encadre les modèles à usage général (`GPAI`) sous la supervision de l’`AI Office` [284].

Le calendrier officiel de l’*AI Act Service Desk*, actualisé après les amendements du **Digital Omnibus on AI**, fixe des jalons précis pour les feuilles de route d’entreprise [288] :

1. **Depuis le 2 février 2025** : interdictions des pratiques à risque inacceptable et obligations de littératie IA [284] [288].
2. **Depuis le 2 août 2025** : application des règles visant les modèles `GPAI` et mise en place des autorités nationales et européennes de gouvernance [284] [288].
3. **Depuis le 2 août 2026 (et 2 décembre 2026)** : entrée en vigueur des **obligations de transparence (**`article 50`**)** — notification d’interaction avec un système d’IA et marquage lisible par machine des contenus synthétiques — complétée au 2 décembre 2026 par de nouvelles interdictions sur les hypertrucages sexuels non consentis et la fin de la période transitoire de l’article 50(2) pour les systèmes mis sur le marché avant août 2026 [288].
4. **D’août 2027 à août 2028** : ouverture d’au moins un bac à sable réglementaire par État membre au 2 août 2027, puis application des règles **haut risque de l’Annexe III** (crédit, emploi, services essentiels) le **2 décembre 2027**, et des composants intégrés aux produits réglementés de l’Annexe I le **2 août 2028** [288].

Pour les agents classés à haut risque à échéance de décembre 2027, l’`EA` et le `SA` doivent garantir dès la conception la qualité des données, la **journalisation automatique des événements**, la cybersécurité et une **surveillance humaine effective** dotée d’une capacité réelle d’interruption [284] [288].

### 12.2.4 Socle d’ingénierie commun : NIST AI RMF (AI 600-1) et ISO/IEC 42001:2023

Pour unifier ces obligations, l’entreprise s’appuie sur deux cadres d’ingénierie complémentaires :

- **Le** `NIST AI RMF 1.0` **(**`NIST AI 100-1`**) et le profil** `NIST AI 600-1` : `AI RMF 1.0` structure la gestion des risques en quatre fonctions continues (`Govern`, `Map`, `Measure`, `Manage`) autour de sept caractéristiques de confiance [289]. Le profil génératif `NIST AI 600-1` (juillet 2024) y ajoute douze risques propres à l’IA générative, incluant la confabulation, la fuite par mémorisation, l’injection de prompt, l’anthropomorphisation et la monoculture algorithmique [280]. La `CSA` et les initiatives du `NIST` étendent ce modèle à l’identité vérifiable et aux contrôles d’action des agents [276].
- **La norme certifiable** `ISO/IEC 42001:2023` **(**`AIMS`**)** : elle spécifie les exigences d’un système de management de l’IA couvrant politiques, objectifs, évaluations d’impact et amélioration continue [285]. Toutefois, l’utilisation d’une plateforme infonuagique certifiée `ISO/IEC 42001` ne dispense pas l’entreprise : selon le modèle de responsabilité partagée, celle-ci doit maintenir son propre `AIMS`, ses évaluations d’impact et sa Déclaration d’applicabilité (`SoA`) [285]. Côté `SA`, des paquets de conformité automatisés — à l’image du `Conformance Pack` `AWS Config` mappant jusqu’à 258 règles gérées sur les groupes de contrôles de l’Annexe A (`A.4` Ressources, `A.5` Impacts, `A.6` Cycle de vie, `A.7` Données et `A.9` Exploitation, comme la rotation des clés `A.9.2`) — rendent cette conformité vérifiable en continu [290].

> **[Figure]**
> - Juridictions applicables
> - Référentiels d'ingénierie
> - Artefacts de preuve exigibles
> - LPRPDE & Directive SCT Principes CPVP / Score AIA
> - Loi 25 (Québec) P-39.1 art. 3.1, 3.3, 12.1
> - EU AI Act + Digital Omnibus Art. 12, 14, 50 & Annexe III
> - NIST AI RMF 1.0 & AI 600-1 Govern, Map, Measure, Manage
> - ISO/IEC 42001:2023 AIMS & Annexe A
> - Dossier ÉFVP + Fiche AIA & Mandat RPRP
> - Déclaration d'applicabilité (SoA) & Registre risques
> - Preuves d'exécution Journal Art. 1 2 & Recours HITL
> - Score AIA
> - ÉFVP préalable
> - Recours humain
> - Traçabilité
> - Contrôles A.4-A.9

*Fig. 46. – Cartographie croisée des obligations réglementaires multi-juridictionnelles et des artefacts de preuve d’audit*

| Cadre / Texte | Portée et statut | Exigences clés sur les agents | Preuves et mécanismes `SA` associés |
| --- | --- | --- | --- |
| `Loi 25` **(**`P-39.1` **/** `A-2.1`**)** | Québec, en vigueur [281] [286] | `RPRP` (`3.1`), `ÉFVP` + portabilité (`3.3`), transparence, facteurs et révision humaine (`12.1` /`65.2`) [281] [286] | `ÉFVP` signée, export structuré `RP`, trace des facteurs et recours humain effectif [281] [286] |
| `LPRPDE` **&** `Directive SCT` | Privé fédéral (après caducité `C-27`) ; public `SCT` [283] [287] [282] | Autorité légale, zones interdites, exactitude (`CPVP`) ; `AIA` publique même avec humain (`SCT`) [283] [282] | Fiche `AIA`, filtres anti-profilage, contrôle de provenance et rectification [283] [282] |
| `EU AI Act` **(**`2024/1689`**)** | UE ; `art. 50` août 2026, Ann. III déc. 2027, Ann. I août 2028 [284] [288] | Interdictions, `GPAI`, transparence (`art. 50`), journalisation et surveillance humaine haut risque [284] [288] | Avis IA, marquage machine des sorties, journaux `OTel` immuables, bouton d’arrêt [284] [288] |
| `NIST AI RMF` **&** `AI 600-1` | Cadre volontaire transversal [289] [280] | `Govern-Map-Measure-Manage` ; 12 risques GenAI (confabulation, fuite, monoculture) [289] [280] | Registre des risques, `red teaming`, diversification multi-modèles [289] [280] |
| `ISO/IEC 42001:2023` | Norme `AIMS` certifiable (`A.4` –`A.9` automatisables) [285] [290] | `AIMS` propre du client distinct des certifications cloud du fournisseur [285] | `SoA` documentée et règles continues d’infrastructure (`Conformance Packs`) [285] [290] |

*Tableau 12.2 — Matrice de correspondance réglementaire et normative multi-juridictionnelle.*

> **Arbitrage EA / SA** — Proscrire les architectures de conformité morcelées par territoire ou fondées sur des textes non adoptés comme l’ancien projet de loi `C-27` [287]. L’`EA` impose un socle unique structuré autour d’`ISO/IEC 42001` et de `NIST AI RMF / AI 600-1` dont le jeu de preuves satisfait par construction la `Loi 25` (`ÉFVP`, `art. 12.1`), la `LPRPDE`, la `Directive SCT` et l’`EU AI Act` (`art. 50` et préparation `Annexe III`) [281] [283] [288] [285]. Le `SA` matérialise ce socle par la journalisation des facteurs décisionnels, l’exportation structurée des `RP`, le marquage machine des contenus générés et des écrans de révision dotés d’un réel pouvoir de modification [281] [286] [288].

## 12.3 FinOps agentique : économie unitaire par transaction métier, facteur d’amplification, caching et cascade SLM/LLM

À la différence de l’infonuagique facturée à l’heure de calcul ou au stockage, l’entreprise agentique consomme des unités volatiles — jetons d’entrée, de sortie et de raisonnement, appels d’outils et débits provisionnés — liées au harnais et au modèle [274].

### 12.3.1 Économie unitaire : dépasser le coût au jeton vers le coût par résultat réussi

Piloter au tarif du million de jetons trompe l’analyse [274] [291]. La capacité **Unit Economics** de la `FinOps Foundation` sépare les métriques techniques (coût par jeton) des métriques métier [274] [291] : un modèle bon marché qui échoue ou réessaie en boucle détruit la marge [274] [292].

L’indicateur directeur est le **coût par résultat métier réussi** (*cost per successful outcome* : réclamation réglée, billet clos, écriture validée) [274] [291], soumis à deux règles :

1. **Inclusion des pertes** : imputer aux transactions réussies les jetons consommés par les sorties rejetées sous le seuil qualité et l’infrastructure environnante [274] [292].
2. **Suivi par distribution** : suivre ce coût en distribution (`p50`, `p90`, `p99`) plutôt qu’en moyenne trompeuse [274].

### 12.3.2 Anatomie du facteur d’amplification multi-tours et multi-agents

Le coût d’un agent dépasse de plusieurs ordres de grandeur celui d’une simple invite en raison de quatre facteurs multiplicatifs :

- **Le préambule de contexte** : les jetons saisis par l’usager ne reflètent pas les jetons facturés, car chaque appel inclut les consignes système, les schémas d’outils `MCP`, la mémoire récupérée et les résultats `RAG` [274].
- **La dérive quadratique** `O(T²)` **des boucles multi-tours** : dans une boucle `ReAct` de `T` tours sans compaction ni mise en cache, chaque itération ré-expédie le socle initial `P` augmenté de tous les échanges et retours d’outils précédents. Avec un ajout moyen `Δ` par tour, la consommation cumulée d’entrée croît en `T × P + Δ × T(T - 1)/2`, pénalisant sévèrement les boucles profondes.
- **L’asymétrie tarifaire entrée / sortie** : les jetons générés en sortie sont facturés bien plus cher que l’entrée — un facteur exact de **5×** sur la gamme Anthropic Claude documentée (`20 $/MTok` contre `4 $/MTok` sur Opus 5.5, `10 $/MTok` contre `2 $/MTok` sur Sonnet 5.5) [293]. Contraindre la concision des sorties typées protège directement le budget.
- **L’amplification multi-agents** : comme établi empiriquement au chapitre 7, un agent unique outillé consomme déjà environ **4×** plus de jetons qu’un échange conversationnel simple, et une topologie multi-agents environ **15×** plus par duplication de contexte et coordination inter-nœuds.

La partition hybride **80/20** du chapitre 3 constitue ainsi le premier levier financier : conserver 80 % du contrôle déterministe en code classique réduit à zéro le coût d’inférence sur ces segments [274].

### 12.3.3 Optimisation en cascade : Prompt Caching KV, Semantic Caching et routage SLM/LLM

Sur les 20 % cognitifs restants, l’architecture `FinOps` empile trois filtres d’optimisation complémentaires :

1. `Prompt Caching` **au niveau préfixe (tenseurs** `KV`**)** : en mémorisant les tenseurs clé-valeur d’un préfixe inchangé, les fournisseurs réduisent fortement le coût des entrées répétées [293] [294]. Chez **Anthropic**, le préfixe suit l’ordre `tools`, `system` puis `messages` jusqu’au marqueur `cache_control` [293]. Malgré une prime d’écriture initiale (`1,25×` pour 5 minutes rafraîchies à chaque lecture, ou `2×` pour 1 heure), les lectures tombent à **90 %–95 % de rabais** (`0,05×` –`0,10×`, voire `0,025×` sur Fable 5.2) [293]. Sur **Amazon Bedrock**, le *prompt caching* à 5 minutes abaisse jusqu’à **90 %** les coûts et **85 %** la latence [295]. Chez **OpenAI**, le cache sur préfixe exact réduit de **50 % à 95 %** l’entrée selon les générations tout en allégeant les quotas `TPM`, mais reste sensible aux réglages (`tools`, `parallel_tool_calls`, `reasoning.effort` ou `Compaction` modifiant l’historique) [294]. Chez **Google Gemini**, le *context caching* implicite s’active par défaut dès Gemini 2.5 au-delà de **2 048 ou 4 096 jetons** [296]. Un seul champ dynamique en tête de requête invalide tout le préfixe [294] [296].
2. `Semantic Caching` **vectoriel** : avant tout appel modèle, la requête est vectorisée et comparée par index `HNSW` (p. ex. `Redis`) [297]. Au-dessus d’un seuil cosinus calibré entre **0,70 et 0,95**, la réponse mémorisée est servie sans coût d’inférence, abaissant la latence de `2,7 s` à `0,3 s` (**-89 %**) [297]. Ce levier exige des `TTL` adaptés (`30–300 s` sur données volatiles, `3 600+ s` sur corpus stables) et un cloisonnement `ACL` [297].

3. **Modélisation** `FinOps` **des cascades et du routage** `SLM` **/**`LLM` : prolongeant le chapitre 3, le choix répond à une équation de seuil explicite. Une cascade `FrugalGPT` — abaissant les coûts jusqu’à **98 %** à qualité égale sur les tâches évaluées — reste rentable tant que `C_SLM + C_verif + p_escalade × C_LLM < C_LLM`, soit `p_escalade < 1 - (C_SLM + C_verif) / C_LLM`, tout en ajoutant une latence sur les cas escaladés [298]. Le routage amont évite ce double appel : `RouteLLM` atteint **95 %** de la performance de `GPT-4 Turbo` avec seulement **14 %** d’appels forts sur `MT-Bench` (75 % moins cher qu’un routeur aléatoire) et **54 %** sur `MMLU` [299], tandis qu’`Amazon Bedrock Intelligent Prompt Routing` réduit jusqu’à **30 %** les coûts intra-famille sans perte de précision [295].

> **[Figure]**
> - Filtres de déflation FinOps
> - Optimisation d'inférence (20 %
> - cognitif)
> - 1. Règle 80/20 Code déterministe (0 jeton)
> - 2. Cache sémantique Index HNSW (0,70-0,95) (0 jeton sur hit)
> - 3. Routeur / Cascade SLM vs Frontier (RouteLLM / FrugalGPT)
> - 4. Préfixe & Budget KV Prompt Caching (-50 % à -95 %) + Compaction anti-O(T²)
> - Transaction métier entrante Résultat métier validé (Coût unitaire)
> - Évalue
> - 80 % déterministe
> - 20 % cognitif Hit cache (latence -89 %)
> - Miss cache
> - Modèle calibré
> - Sortie bornée

*Fig. 47. – Entonnoir d’optimisation FinOps agentique : réduction du coût unitaire et endiguement de l’amplification*

| Levier d’optimisation | Mécanisme | Gains vérifiés | Conditions et risques |
| --- | --- | --- | --- |
| **Règle hybride** `80/20` | Déport des flux prévisibles en code déterministe | `0` jeton sur 80 % de la logique applicative | Éviter de rigidifier les nœuds réellement ambigus [274] |
| `Semantic Caching` **(**`HNSW`**)** | Réponse vectorielle sous seuil cosinus `0,70–0,95` [297] | `0` jeton sur *hit* ; latence `-89 %` (`2,7 s → 0,3 s`) [297] | Faux positifs si seuil bas ; exiger `TTL` court et cloisonnement `ACL` [297] |
| `KV Prompt Caching` | Réemploi de tenseurs sur préfixe exact stable [293] [294] | `-50 %` à `-95 %` en entrée [293] [294] ; `-90 %` coût / `-85 %` latence sur Bedrock [295] | Toute mutation avant le point d’arrêt invalide le cache ; prime d’écriture `1,25×–2×` [293] [294] |
| **Routage amont (**`RouteLLM` **/** `IPR`**)** | Aiguillage prédictif vers `SLM` ou modèle fort dès l’entrée [295] [299] | `14 %–54 %` d’appels forts pour `95 %` de qualité [299] ; jusqu’à `-30 %` intra-famille [295] | Réétalonnage requis lors des changements de modèles [274] [299] |
| **Cascade** `SLM → LLM` **(**`FrugalGPT`**)** | Appel `SLM` puis escalade conditionnelle [298] | Jusqu’à `-98 %` sur charges majoritairement simples [298] | Latence double à l’escalade ; non rentable si `p_escalade ≥ 1 - (C_SLM+C_verif)/C_LLM` [298] |

*Tableau 12.3 — Leviers d’optimisation* `FinOps` *agentique, gains vérifiés et conditions d’efficacité.*

> **Arbitrage EA / SA** — Exiger la modélisation du **coût par résultat métier réussi** (en distribution `p50` /`p90` /`p99` incluant les échecs) pour tout agent `R2–R4` avant homologation [274] [292]. L’`EA` impose de justifier le multiplicateur multi-agents (`~15×`) face à la règle `80/20` et de vérifier l’équation de seuil des cascades `SLM` /`LLM` [274] [298] ; le `SA` fige l’ordre `tools → system → messages` pour préserver le `KV Prompt Caching`, applique des seuils prudents en `Semantic Caching` et borne la dérive `O(T²)` par compaction et plafonds de tours [293] [294] [297].

## 12.4 Pilotage budgétaire, refacturation interne (showback/chargeback), TCO/ROI ajusté du risque et réversibilité

### 12.4.1 Attribution unifiée (OpenTelemetry GenAI + FOCUS) et pilotage des anomalies

Sans imputation granulaire reliant chaque jeton à son propriétaire, l’optimisation technique ne se traduit pas en responsabilité financière [274]. Or, les factures directes des API d’inférence manquent souvent d’étiquetage natif (*thin allocation data*) lorsque plusieurs produits partagent les mêmes clés d’organisation [274].

L’architecture d’imputation couple deux standards ouverts complémentaires [274] [300] [301] :

1. **La télémétrie** `OpenTelemetry GenAI` : les conventions `semantic-conventions-genai` normalisent sur chaque trace `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`, les jetons en cache et le modèle sollicité [301]. En y attachant l’identifiant du registre (`Agent ID`) et les étiquettes obligatoires (`Project`, `Environment`, `Team`, `CostCenter`, `Criticality`), l’entreprise relie chaque exécution à son centre de coûts [274] [301].
2. **Le format normalisé** `FOCUS` : la spécification *FinOps Open Cost & Usage Specification* (`v1.0` à `v1.4`) unifie les données de facturation entre fournisseurs infonuagiques, éditeurs de modèles, `SaaS` et centres de données [274] [300]. La révision `FOCUS v1.5` enrichit ce schéma avec l’identité du modèle, la séparation entrée/sortie, l’état de cache et l’attribution au demandeur, assurant le rapprochement comptable avec les traces `OpenTelemetry` [274] [300].

Côté budgétaire, la volatilité agentique exige des **fenêtres de prévision plus courtes** révisées fréquemment avec les finances et séparées entre enveloppes pilotes (`ShutdownEligible = True`) et budgets de production [274] [292]. Des détecteurs d’anomalies surveillent en continu boucles récursives, gonflements de contexte et reprises excessives pour déclencher des coupures budgétaires avant dépassement [274].

### 12.4.2 Refacturation interne (Showback puis Chargeback) et arbitrage de capacité (PAYG vs PTU)

L’imputation interne suit l’approche graduelle définie dans la capacité **Invoicing & Chargeback** [274] [302] :

- `Showback` **préalable** : exposer aux équipes et `Agent Owners` leurs dépenses ventilées par cas d’usage sans modifier immédiatement leur compte de résultat (`P&L`) [274]. Cette visibilité corrige rapidement le surdimensionnement de modèles tout en validant les règles d’allocation [274].
- `Chargeback` **comptable** : une fois l’attribution `FOCUS` réconciliée, imputer réellement les coûts aux budgets ou `P&L` produits selon les règles comptables internes, sans confondre ce choix comptable avec un palier de maturité supérieur [274] [302].

En parallèle, le portefeuille arbitre parmi six modèles tarifaires — à l’usage (*On-demand*), engagements de dépense, capacité provisionnée (`PTU`), lots asynchrones/préemptibles (*Batch/Spot*), abonnement par siège et paliers de volume [274]. L’arbitrage clé oppose paiement à l’usage (`PAYG`) et **unités de débit provisionnées (**`PTU`**)** : facturées à l’heure ou par réservation `Azure` qu’elles soient consommées ou non, les `PTU` garantissent la latence en production soutenue, mais deviennent plus onéreuses que le `PAYG` sur des charges intermittentes ou limitées aux heures ouvrables [274] [303]. Le modèle optimal alloue un socle `PTU` sous réservation — dimensionné via le calculateur de capacité selon la forme des requêtes, le ratio sortie/entrée et le taux de cache — complété par un **débordement (**`spillover`**) automatique** vers des terminaisons `PAYG` en pointe [303], tout en déportant les tâches différables vers le mode *Batch* [274].

### 12.4.3 TCO complet, ROI ajusté du risque et gouvernance de réversibilité (EU Data Act)

Démontrer la rentabilité face au constat des **43 %** d’entreprises incertaines de leur `ROI` impose de dépasser le seul coût des jetons [274]. Le `TCO` **complet** agrège cinq postes : (1) inférence, réessais et `GPU`, (2) stockage vectoriel, exécution durable et télémétrie, (3) ingénierie plateforme et connecteurs, (4) évaluations `EvalOps` et audits `3LoD`, et (5) travail humain de supervision (`HITL` / `art. 12.1 Loi 25` / `art. 14 AI Act`) [274] [292]. Le `ROI` **ajusté du risque** rapporte ensuite les gains métier (productivité, délais, résilience, croissance [274]) à ce `TCO` majoré du coût espéré des incidents résiduels [278] [274].

Enfin, la réversibilité prolonge les verrous du chapitre 2 [276] [304]. L’entreprise conserve la propriété exclusive de ses contrats `MCP` /`A2A` /`OASF`, mémoires vectorielles, jeux `EvalOps` et journaux [281] [285]. En Europe — et comme étalon contractuel — le **Data Act (**`Règlement (UE) 2023/2854`**)**, applicable depuis le **12 septembre 2025**, impose la facilité de changement de fournisseur infonuagique et supprime progressivement les frais de sortie jusqu’à leur interdiction complète prévue en janvier 2027 [304]. Combiné à la portabilité structurée de l’article 3.3 de la Loi 25 [281], ce cadre justifie des exercices annuels de bascule validant le coût et le délai de migration.

> **[Figure]**
> - Collecte normalisée
> - Moteur d'imputation FinOps
> - Pilotage & Réversibilité
> - Traces OTel GenAI gen_ai.usage.\* & Agent ID
> - Factures Cloud & API Schéma FOCUS v1.4 / v1.5
> - TCO complet par résultat (Jetons + Infra + EvalOps + HITL)
> - Détection d'anomalies & Plafonds budgétaires
> - Arbitrage capacité PAYG vs PTU vs Batch
> - Showback →Chargeback par Centre de coûts / P&L
> - Tests de réversibilité (EU Data Act & Portabilité)
> - Attribution agent
> - Coûts normalisés
> - Alertes dérive
> - Taux d'utilisation
> - Imputation P&L
> - ROI ajusté du risque

*Fig. 48. – Chaîne d’attribution, de refacturation interne (Showback/Chargeback) et de réversibilité FinOps*

| Dimension `FinOps` | Régime pilote / charge variable | Régime production soutenue | Règle d’arbitrage `EA` / `SA` |
| --- | --- | --- | --- |
| **Capacité d’inférence** | `PAYG` à l’usage ou *Batch* asynchrone | Socle `PTU` réservé + *spillover* `PAYG` | `PAYG` pour trafic intermittent ; `PTU + spillover` dès charge 24/7 soutenue [274] [303] |
| **Refacturation interne** | `Showback` par cas d’usage / équipe | `Chargeback` sur le `P&L` métier | `Showback` d’abord pour visibilité, puis `Chargeback` après validation `FOCUS` [274] [302] |
| **Pilotage budgétaire** | Enveloppe pilote (`ShutdownEligible`) | Prévision glissante courte par résultat | Séparer strictement budgets pilotes et production ; détection d’anomalies temps réel [274] [292] |
| **Évaluation de valeur** | Coût par résultat + taux de rejet qualité | `TCO` à 5 postes + `ROI` ajusté du risque | Bannir toute décision fondée sur le seul tarif au jeton [274] [291] |
| **Réversibilité** | Contrats ouverts `MCP` /`A2A` /`OASF` | Zéro frais de sortie (`Data Act`) + test annuel | Conserver `evals`, mémoires et données dans des formats structurés portables [281] [304] |

*Tableau 12.4 — Grille d’arbitrage budgétaire, refacturation interne, capacité et réversibilité.*

> **Arbitrage EA / SA** — Imposer le rapprochement `OpenTelemetry GenAI` + `FOCUS` avant d’activer le `Chargeback` comptable, en débutant systématiquement par le `Showback` [274] [300] [302] [301]. L’`EA` exige pour tout projet `R3–R4` un `TCO` complet à cinq postes, un `ROI` ajusté du risque intégrant le coût `HITL` et des clauses de sortie sans pénalité alignées sur le `Data Act` [274] [304] ; le `SA` rend obligatoire le marquage `Agent ID` / `CostCenter`, configure le débordement `PAYG` /`PTU` et exécute des tests réguliers de portabilité des mémoires et jeux `EvalOps` [274] [301] [303].

## Synthèse architecturale et transition vers la Partie V

Ce chapitre a établi la charpente institutionnelle, juridique et économique de l’entreprise agentique. Le modèle opérationnel ancre chaque agent dans un **registre central** avec un `Agent Owner` humain, la séparation des mandats d’**OSFI E-23** et les **Trois Lignes de Défense (**`3LoD`**)** graduées de `R1` à `R4` [277] [278] [279]. Un socle unifié `ISO/IEC 42001` **+** `NIST AI RMF / AI 600-1` satisfait conjointement **Loi 25**, **LPRPDE** / **Directive SCT** et **EU AI Act** [281] [283] [288] [285]. Enfin, le `FinOps` **agentique** pilote le coût par **résultat métier réussi**, freine l’amplification (`80/20`, cache sémantique, `KV Prompt Caching`, routage `SLM` /`LLM`), et garantit l’imputation `OpenTelemetry` /`FOCUS`, le `TCO` complet et la réversibilité [274] [300] [301] [304].

Avec la sécurité `Zero-Trust` (chapitre 10), l’observabilité `OpenTelemetry` /`EvalOps` (chapitre 11) et la gouvernance présentée ici, le Plan 4 est complet. La **Partie V** s’ouvre au **chapitre 13** pour matérialiser ces exigences dans l’`Internal Agentic Platform` **(**`IAP`**)**, l’`AI Gateway` **hybride** et le **GitOps cognitif**.

# Partie V — Ingénierie de plateforme, blueprints de référence et transformation

# Chapitre 13 — Ingénierie de plateforme agentique, AI Gateway hybride et cycle de vie industriel (GitOps)

Les douze chapitres précédents ont posé les fondations épistémiques, les protocoles ouverts (`MCP`, `A2A`, `AGNTCY`), l’exécution durable, la sécurité `Zero-Trust`, l’observabilité `OpenTelemetry` /`EvalOps` et la gouvernance `FinOps`. Laisser chaque équipe produit réassembler ces briques de façon artisanale reproduirait la fragmentation : chaque domaine recréerait son harnais d’agent, ses connecteurs d’inférence, ses politiques d’accès et ses scripts de déploiement. Selon le programme *DORA*, **90 %** des organisations sondées en 2025 utilisaient une plateforme interne et **76 %** disposaient d’équipes plateformes dédiées ; surtout, DORA démontre empiriquement que lorsque la qualité de la plateforme interne est élevée, l’impact de l’adoption de l’IA sur la performance organisationnelle devient nettement positif [305].

Ce chapitre ouvre la Partie V en traduisant ces exigences en un socle reproductible. En **lecture** `EA`, il arbitre la séparation plateforme/domaines, la souveraineté d’inférence et la gouvernance du portefeuille. En **lecture** `SA`, il spécifie l’`Internal Agentic Platform` **(**`IAP`**)**, l’`AI Gateway` **hybride**, le `GitOps` **cognitif** et le **déploiement progressif** compatible avec les workflows durables en vol. L’instanciation sectorielle bout-en-bout relève du chapitre 14.

## 13.1 Architecture d’une Internal Agentic Platform (IAP) : Golden Paths et séparation plateforme/domaines

### 13.1.1 De l’IDP classique à l’IAP : absorber la charge cognitive extrinsèque

Le livre blanc *Platforms* de la `CNCF` définit une plateforme interne comme un ensemble curaté de capacités exposées en libre-service pour accélérer la livraison applicative [306]. Sur le plan organisationnel, *Team Topologies* fixe le critère de frontière décisif : la **charge cognitive extrinsèque** [307]. Une équipe `stream-aligned` doit consacrer son effort aux règles métier, contrats de domaine et besoins utilisateurs (sa charge intrinsèque), plutôt qu’à la plomberie d’infrastructure [307].

Une plateforme classique (`IDP`) masque déjà Kubernetes, bases de données et CI/CD [306] [305]. À l’ère agentique, cette charge extrinsèque se démultiplie : orchestration `Temporal` ou `Restate` (chapitre 9), identités `SPIFFE` et `OAuth 2.0 OBO` (chapitre 10), passerelle `MCP` (chapitre 4), traces `OpenTelemetry GenAI` (chapitre 11), imputation `FOCUS` (chapitre 12), fiches `OASF` (chapitre 5) et ordonnancement GPU. L’`Internal Agentic Platform` **(**`IAP`**)** encapsule cette complexité transversale dans un produit interne cohérent [306] [307] :

1. **Gestion en produit interne (**`Platform-as-a-Product`**)** : l’équipe plateforme traite les domaines en clients internes, mesure adoption volontaire et délai de livraison, et maintient des API stables au lieu d’opérer un guichet de billets manuel [306] [305].
2. **Plateforme minimale viable (**`Thinnest Viable Platform`**,** `TVP`**)** : l’`IAP` ne bâtit que les capacités levant des irritants récurrents, évoluant par traction réelle afin d’éviter la bureaucratie technique [307].
3. **Modes d’interaction ciblés** : l’équipe plateforme opère en mode `X-as-a-Service` au quotidien, passe en `Collaboration` pour co-concevoir de nouvelles briques, et s’appuie sur des équipes `Enabling` pour diffuser les pratiques `EvalOps` et `80/20` [307].

### 13.1.2 Anatomie des Golden Paths exécutables : Backstage, Kratix et Crossplane

Un *Golden Path* dépasse la documentation statique : DORA caractérise les plateformes performantes par des flux automatisés en libre-service où sécurité et conformité sont intégrées par défaut [305]. Dans une `IAP`, ces voies pavées reposent sur quatre strates :

1. **Portail développeur (**`Backstage Software Templates`**)** : via le moteur `Scaffolder`, Backstage propose des gabarits paramétrés par palier (`R1–R4`, chapitre 12) [308]. L’équipe renseigne l’`Agent Owner`, la sensibilité des données et le profil de modèle ; le gabarit génère le dépôt `Agent Harness 80/20`, la CI et les descripteurs initiaux [308]. Les actions personnalisées utilisent le nommage `camelCase` pour éviter les erreurs d’expression, complétées par le mode *Dry Run* et des droits granulaires [308].
2. **Orchestrateur d’API plateforme (**`Kratix Promises`**)** : Kratix empaquette chaque capacité agentique complète sous forme de contrat déclaratif (*Promise*) [309]. Sur instanciation d’une `Promise` d’agent `R3`, Kratix exécute les pipelines de conformité et sécurité puis planifie la livraison multi-grappes [309].
3. **Plan de contrôle d’infrastructure (**`Crossplane v2.4`**)** : Crossplane traduit des définitions composites (`CompositeResourceDefinitions` / `XRD`) en ressources gérées au moyen de `Compositions` versionnées (*Composition Revisions*) et de fonctions de composition [310]. Le domaine obtient base d’état, file, cache et clé virtuelle via une API unifiée sans manipuler les droits IAM ni la topologie réseau sous-jacente [310].
4. **Socle managé pré-câblé** : tout agent créé sur le *Golden Path* reçoit nativement télémétrie `OpenTelemetry GenAI`, identité `SPIFFE` /`Agent ID`, routage par l’`AI Gateway` et la `MCP Gateway`, et suite `EvalOps` initiale [306] [305]. Ce pré-câblage garantit le découplage entre l’équipe plateforme, qui livre la capacité en libre-service, et l’équipe domaine, qui conserve la pleine autonomie sur ses itérations métier [306] [307].

> **[Figure]**
> - Internal Agentic Platform
> - (IAP) — Thinnest Viable
> - Platform
> - [system]
> - «container» Portail développeur
> - [Backstage Scaffolder]
> - Catalogue unifié et gabarits
> - Golden Path exécutables
> - «container» Orchestrateur d'API
> - plateforme [Kratix Promises]
> - Validation conformité, sécurité
> - et distribution multi-grappes
> - «container» Plan de contrôle
> - infrastructure [Crossplane (XRD / Compositions)]
> - Approvisionnement déclaratif
> - GPU, BD, Redis et files
> - «container» Socle managé pré-câblé [AI/MCP Gateway, Temporal, OTel,
> - OPA]
> - Identités SPIFFE, quotas FinOps
> - et EvalOps CI
> - «person»
> - Équipe Domaine
> - Stream-aligned : logique 80/20,
> - prompts et outils MCP métier
> - «person»
> - Équipe Plateforme
> - Produit interne : conçoit et itère
> - les Golden Paths
> - Instancie un gabarit
> - en libre-service
> - Publie gabarits
> - versionnés
> - Maintient les Promises
> - et politiques
> - Déclenche requête
> - de capacité
> - Compose ressources infonuagiques/locales
> - Configure passerelles, identités et télémétrie
> - Déploie et opère les agents via GitOps

*Fig. 49. – Architecture de référence d’une Internal Agentic Platform (IAP) en quatre strates découplées*

### 13.1.3 Frontière stricte plateforme/domaines et régimes d’exception

Standardiser le socle ne signifie pas centraliser la logique métier. Si l’équipe plateforme écrit les prompts ou serveurs `MCP` propres aux `Systems of Record`, elle devient un goulot d’étranglement contraire à *Team Topologies* [307]. Réciproquement, laisser un domaine déployer sa propre passerelle `LLM` compromet sécurité et comptabilité `FinOps`.

Le *Golden Path* reste une incitation privilégiée et non un carcan [306] [307]. Une équipe `Complicated Subsystem` confrontée à des contraintes atypiques peut solliciter une dérogation devant l’`ARB` [307]. Elle supporte alors intégralement l’exploitation, la maintenance et l’audit de sa pile alternative, tout en satisfaisant aux portes d’admission les mêmes contrats `OTel`, `OPA` et d’identité [306] [309].

| Dimension | Équipe Plateforme (`IAP`) | Équipe Domaine | Contrat de contrôle |
| --- | --- | --- | --- |
| **Gabarits** | Maintient `Backstage` et `Kratix Promises` [308] [309] | Instancie en libre-service (`Agent Owner`, `R1–R4`) [308] | Validation schématique sur `PR` |
| **Logique** `80/20` | Fournit SDK harnais et adaptateurs durables [306] | Rédige code déterministe, prompts et outils `MCP` | `JSON Schema` et `EvalOps` |
| **Infra & GPU** | Opère `Crossplane`, passerelles et `vLLM` /`NIM` [310] | Consomme `XRD` et clés virtuelles d’inférence [310] | `Composition Revisions`, quotas |
| **Sécurité & coûts** | Câble `SPIFFE`, `OPA`, `Cosign`, `OTel` et `FOCUS` [306] | Spécifie règles métier et répond aux revues `2LoD` | `Conftest` et admission |
| **Exceptions** | Publie les invariants d’audit obligatoires [306] | Assume astreinte et preuves hors voie pavée [307] | Dérogation `ARB` bornée |

*Tableau 13.1 — Matrice de séparation des responsabilités entre équipe plateforme (*`IAP`*) et équipes domaines.*

> **Arbitrage EA / SA** — Bâtir l’`IAP` selon la *Thinnest Viable Platform* (`TVP`) gérée comme un produit interne : la plateforme détient les *Golden Paths* (`Backstage`, `Kratix`, `Crossplane`), les passerelles partagées et le socle `Zero-Trust` /`OTel` /`GitOps`, tandis que les domaines gardent la maîtrise exclusive de la logique `80/20`, des prompts et des serveurs `MCP` métier [306] [307] [308] [310] [309]. L’`EA` évalue la plateforme selon l’adoption volontaire et le délai de mise en production conforme [306] [305] ; le `SA` interdit toute logique d’affaires dans les couches partagées et soumet les dérogations hors *Golden Path* aux mêmes contrats d’admission et de télémétrie [307] [309].

## 13.2 Topologie de l’AI Gateway hybride : multi-nuages et inférence souveraine sur site (vLLM, NIM)

### 13.2.1 Unification de l’accès aux modèles : Agent Router (GAIE) et LiteLLM

Aucun `Agent Harness` ne doit coder en dur des clés API ni des dialectes propriétaires. L’`AI Gateway` **hybride** forme l’unique façade normalisée — compatible avec l’API OpenAI — derrière laquelle coexistent des modèles frontaliers infonuagiques (`PAYG` ou `PTU`, chapitre 12) et des grappes souveraines sur site ou en nuage privé [311] [312].

Deux solutions ouvertes dominent cette couche de médiation :

1. **Plan de données Envoy (**`Agent Router` **/** `GAIE`**)** : issu d’*Envoy AI Gateway* sous l’*Agentic AI Foundation* tout en conservant le groupe `aigateway.envoyproxy.io`, **Agent Router** s’appuie sur Envoy et la *Kubernetes Gateway API Inference Extension* (`GAIE`) [311] [313]. À l’aide d’`AIGatewayRoute`, il gère virtualisation de modèles, bascule entre fournisseurs (*Provider Fallback*), *Prompt Caching* unifié par `cache_control`, passerelles `MCP` et politiques de débit et de quotas sensibles aux jetons (*Usage-based Rate Limiting* et *Quota Policy*) [311].
2. **Mandataire unifié et gouvernance budgétaire (**`LiteLLM Proxy`**)** : fédérant plus de cent fournisseurs externes et moteurs locaux, `LiteLLM Proxy` repose sur des **clés virtuelles (**`Virtual Keys`**)** [312]. Chaque clé associe un agent à des plafonds budgétaires et quotas `TPM` /`RPM` atomiques dans `Redis`, avec suivi des dépenses dans `PostgreSQL` [312].

En pratique, `Agent Router` s’impose sur les grappes Kubernetes raccordées à `GAIE`, tandis que `LiteLLM` accélère la gouvernance budgétaire sur des catalogues multi-fournisseurs hétérogènes [311] [312]. Dans les deux cas, la passerelle applique les bornes du chapitre 12 : aucun renseignement personnel (`RP`) non masqué ni actif critique ne quitte l’enclave souveraine [311].

### 13.2.2 Ordonnancement sensible à l’inférence sur Kubernetes : GAIE et llm-d

Le répartiteur HTTP classique (*round-robin*) échoue sur les moteurs d’inférence. Une boucle agentique mobilise de larges blocs de cache clé-valeur (`KV Cache`) en GPU, maintient des flux longs et dépend fortement de la réutilisation de préfixes [313] [314] [315]. La spécification `GAIE` et la pile `llm-d` **v1.0** sur `vLLM` répondent à ces contraintes [313] [315] :

1. `InferencePool` **et** `Endpoint Picker` **(**`EPP`**)** : `InferencePool` remplace le `Service` Kubernetes devant les pods de modèles [313] [315]. Envoy consulte l’ordonnanceur `EPP` via `ext-proc` [313] [315]. Un pipeline *Filter-Score-Pick* analyse files d’attente, partage équitable multi-locataires, adaptateurs `LoRA` et affinité de cache de préfixe pour diriger la requête vers le réplica détenant déjà le préfixe système [313] [315]. `llm-d` y ajoute des prédicteurs ML de latence (`TTFT` /`TPOT`) protégeant les `SLO` [315].
2. **Architecture** `V1` **de** `vLLM` **et** `Automatic Prefix Caching` **(**`APC`**)** : `vLLM V1` sépare serveur API, noyau d’ordonnancement (`Engine Core`), travailleurs GPU et coordinateur de parallélisme de données (`DP Coordinator`) [314]. Avec `PagedAttention` et `APC` (`enable_prefix_caching=True`), les requêtes partageant consignes système ou schémas `MCP` réutilisent directement les blocs KV sans recalculer le pré-remplissage (`prefill`) [316]. Pour les modèles hybrides Mamba, `--enable-mamba-shared-prefix-checkpoint` enregistre un point de reprise à la jonction du préfixe partagé [316].
3. **Désagrégation *Prefill / Decode* (**`P/D`**) et transfert RDMA (**`NIXL`**)** : la phase *prefill* est limitée par le calcul (*compute-bound*), alors que la phase *decode* dépend de la bande passante mémoire (*memory-bandwidth-bound*) [317] [315]. Sur une instance unifiée, l’arrivée d’un long contexte interrompt les générations en cours et dégrade l’`ITL` [317]. La désagrégation `P/D` isole ces phases sur des pools GPU distincts reliés par transfert KV rapide (`NixlConnector` RDMA ou `LMCache`) [317] [315]. La documentation `vLLM` précise toutefois une règle capitale : **la désagrégation** `P/D` **n’augmente pas le débit brut (*throughput*)** ; elle permet de régler séparément le parallélisme (`tp`, `pp`) pour optimiser le `TTFT` et maîtriser la latence de queue (`tail ITL`) [317].

> **[Figure]**
> - AI Gateway Hybride (Agent Router / LiteLLM)
> - [container]
> - Inférence multi-nuages
> - (R1-R2 / PII filtrées)
> - [container]
> - Enclave GPU souveraine sur site (R3-R4 / Air-gap)
> - [container]
> - «component» Garde d'accès & Quotas
> - [Virtual Keys + Redis]
> - Plafonds TPM/RPM et
> - imputation coûts
> - «component» Routeur sémantique &
> - repli [AIGatewayRoute / Router]
> - Résidence Loi 25, cache_control
> - et failover
> - «component» API Frontier LLMs [PAYG / PTU infonuagique]
> - Raisonnement complexe et
> - débordement
> - «component» Inference Gateway (GAIE)
> - [InferencePool + EPP (llm-d)]
> - Affinité cache KV et prédiction
> - TTFT/TPOT
> - «component» Grappes vLLM (P/D +
> - NIXL) [PagedAttention + APC]
> - Pools Prefill/Decode sur RDMA
> - «component» NVIDIA NIM Operator
> - [NIMCache + NIMService]
> - Microservices sur PVC hors ligne
> - «component» Agent Harness / SoA
> - [Client OpenAI-compatible]
> - Appelle /v1/chat/completions
> - avec clé virtuelle et balises
> - FinOps
> - Envoie requête
> - Valide budget et jetons
> - Flux autorisés / PTU Flux souverains R3-R4
> - ext-proc Routage local

*Fig. 50. – Topologie de l’AI Gateway hybride reliant routage multi-nuages, GAIE/llm-d, vLLM P/D et enclave souveraine NVIDIA NIM*

### 13.2.3 Enclave souveraine et air-gapped sur site : NVIDIA NIM Operator

Sous contrainte de la Loi 25, de secrets industriels ou de réseaux isolés (*air-gapped*), l’exploitation sur site requiert un conditionnement reproductible. Le `NVIDIA NIM Operator` gère sur Kubernetes le cycle de vie de microservices conteneurisés portables (`NIM`) — raisonnement, enfouissement (*embedding*) et réordonnancement — derrière une API compatible OpenAI avec prise en charge de l’allocation dynamique de ressources (`DRA`), de l’observabilité et des quotas [318]. Lorsque les chaînes agentiques nécessitent plusieurs modèles coordonnés (par exemple génération augmentée par récupération combinant enfouissement, réordonnancement et `LLM`), la ressource `NIMPipeline` orchestre leur déploiement conjoint de manière déclarative [318].

En environnement déconnecté sans accès NGC ni Internet, le déploiement via `NIMCache` et `NIMService` impose quatre contrôles [319] :

1. **Miroir local et pré-chargement sur** `PVC` : images et poids de modèles sont miroités en interne et montés sur un volume persistant (`PVC`) via `fromCache` [319].
2. **Conformité POSIX non-root** : sur des stockages tels que `NFS` qui ignorent `fsGroup`, les droits des fichiers pré-chargés doivent correspondre explicitement à `spec.userID` et `spec.groupID` [319].
3. **Omission de** `spec.authSecret` : lorsque les modèles sont entièrement pré-cachés, omettre `spec.authSecret` empêche l’injection de `NGC_API_KEY` et toute requête sortante vers NGC [319].
4. **Certificats privés** : derrière un mandataire TLS interne, un `ConfigMap` de certificats racines privés est raccordé via `spec.proxy.certConfigMap` [319].

### 13.2.4 Matrice d’arbitrage hybride et lecture EA / SA

| Critère | Nuage (`PAYG` / `PTU`) | Grappe `vLLM` + `GAIE` / `llm-d` | Enclave `NVIDIA NIM` |
| --- | --- | --- | --- |
| **Souveraineté** | Régions contractuelles ; filtrage PII requis | Totale (données et cache confinés localement) [314] | Maximale (hors ligne sans `NGC_API_KEY`) [319] |
| **Cache et routage** | `cache_control` unifié à la passerelle [311] | `PagedAttention`, `APC` et score `EPP` [313] [316] [315] | Cache persistant `NIMCache` sur `PVC` [318] [319] |
| **Latence** `TTFT` **/** `ITL` | Bruit voisin (`PAYG`) ou capacité `PTU` | Contrôle par désagrégation `P/D` (`NIXL` RDMA) [317] [315] | Prévisible sur GPU dédiés [318] |
| **Charge d’exploitation** | Minimale (aucun GPU à opérer) | Élevée (réglage `tp` /`pp`, réseau RDMA) [317] [315] | Modérée à élevée (opérateur K8s, POSIX, miroir) [318] [319] |
| **Usage cible** | Raisonnement complexe `frontier` (`R1–R2`) | Volume interne `SLM`, longs préfixes partagés [315] | Flux `R3–R4`, Loi 25 et enclaves isolées [319] |

*Tableau 13.2 — Comparaison des substrats d’inférence hybride derrière l’*`AI Gateway`*.*

> **Arbitrage EA / SA** — Imposer l’`AI Gateway` hybride (`Agent Router` /`GAIE` ou `LiteLLM` + `Redis`) comme point de passage unique de l’inférence, appliquant clés virtuelles, quotas `TPM` /`RPM` et résidence hors du code applicatif [311] [313] [312]. L’`EA` dirige les tâches anonymisées vers le nuage et confine données sensibles (`R3–R4`) et haut volume `SLM` sur grappes souveraines (`vLLM` ou `NIM`) [315] [319] ; le `SA` remplace le *round-robin* par `InferencePool` + `EPP` (`llm-d`) sensible au cache `APC`, réserve `P/D` aux `SLO` stricts de latence de queue et limite chaque bascule aux juridictions homologuées [313] [316] [317] [315].

## 13.3 GitOps cognitif : versionnement conjoint du code, des prompts, des schémas OASF/MCP et politiques OPA

### 13.3.1 Transposer OpenGitOps aux systèmes non déterministes

La spécification `OpenGitOps` **v1.0.0** impose quatre principes : état désiré **déclaratif**, stockage **versionné et immuable**, extraction automatique (*pulled automatically*) par des agents internes et **réconciliation continue** [320]. Un contrôleur tel qu’**Argo CD** compare en boucle l’état vif au dépôt Git (`Synced` contre `OutOfSync`) et corrige toute altération manuelle par auto-guérison (*self-healing*), éliminant les justificatifs administratifs Kubernetes des pipelines CI externes [320] [321].

Appliquer ce modèle aux seuls conteneurs néglige cependant le couplage `CACE` du chapitre 1. Le comportement réel d’un agent résulte d’un **quintette cognitif** indissociable : code `80/20` et workflows, prompts et paramètres, contrats `OASF` et `MCP` (`server.json`), politiques `OPA` (`Rego`) et jeux `EvalOps`. Modifier un seul de ces artefacts hors de Git provoque une dérive invisible pour les sondes HTTP d’Argo CD [320] [321] [322].

### 13.3.2 Le dilemme du registre de prompts : découplage dynamique contre immuabilité Git

Des registres tels que `Langfuse Prompt Management` dissocient l’édition textuelle du déploiement logiciel : les équipes produit ajustent un prompt en interface web, promeuvent une étiquette (`staging` → `production`) et propagent la révision sans latence grâce au cache client SDK [322]. Utile pour itérer vite sur un assistant `R1`, ce découplage heurte `OpenGitOps` dès le palier `R3–R4` [320] [322] :

1. **Rupture d’atomicité au repli** : un retour arrière Git sur le code combiné à un prompt déjà promu crée un état hybride jamais testé conjointement.
2. **Déficit de traçabilité réglementaire** : sans lien CI cryptographique, prouver quel couple exact code-prompt a généré une décision devient fragile [322] [323].

La réponse d’ingénierie consiste à verrouiller les prompts par les portes CI décrites par `Promptfoo` [323]. Sur toute `Pull Request` modifiant `prompts/**`, `promptfoo/promptfoo-action@v1` exécute une évaluation différentielle avant/après (assertions déterministes et juges `LLM`), publie le bilan dans la `PR` et bloque la fusion en cas de régression [323]. L’`IAP` distingue ainsi deux régimes :

- **Régime couplé strict (**`R3–R4`**)** : les prompts résident dans Git ; toute édition visuelle ouvre une `PR` validée par `Promptfoo`, et la production épingle une révision immuable [320] [323].
- **Régime découplé borné (**`R1–R2`**)** : le registre dynamique (`Langfuse`) reste admis, mais le passage à l’étiquette `production` exige un test `EvalOps` automatisé et la trace `(prompt_name, version)` dans `OpenTelemetry` [322].

### 13.3.3 Contrats OASF/MCP, politiques OPA/Conftest et chaîne SLSA/Sigstore

Le `GitOps` cognitif verrouille simultanément schémas protocolaires, règles de gouvernance et chaîne d’approvisionnement :

1. **Contrats** `OASF` **et** `MCP` **(**`server.json`**)** : sous `AGNTCY`, chaque fiche d’agent porte deux champs `SemVer` (`version` et `schema_version`) validés en CI contre des schémas immuables, en distinguant erreurs bloquantes et avertissements [324]. Tout serveur `MCP` décrit par `server.json` est contrôlé face au schéma `server.schema.json` (Draft-07) du registre officiel, qui avertit explicitement contre l’injection de commandes dans les arguments CLI et recommande l’exécution sans interpréteur (`posix_spawn`) avec consentement préalable [325].
2. **Politiques** `OPA` **(**`Rego`**) et** `Conftest` : **Open Policy Agent** découple la prise de décision de l’exécution applicative en évaluant des données structurées JSON/YAML via le langage déclaratif `Rego` à travers toute la pile : pipelines CI/CD, passerelles Envoy/Istio, admission Kubernetes (`OPA Gatekeeper`) et contrôle d’invocation d’outils d’agents (*Agent Tool Calling*) [326]. Dès l’ouverture d’une `PR`, `Conftest` applique les règles `deny_` aux manifestes Kubernetes, configurations Terraform, pipelines et descripteurs d’agents afin d’intercepter les non-conformités avant toute fusion [327].
3. **Signature sans clé (**`Sigstore Cosign`**) et provenance** `SLSA v1.2` : une fois les tests validés, la CI génère une attestation `in-toto` conforme à la spécification approuvée `SLSA v1.2` (`https://slsa.dev/provenance/v1`), consignant dans `buildDefinition` et `runDetails` l’origine exacte du dépôt, la révision et le bâtisseur automatisé [328]. `Sigstore Cosign` appose une signature sans clé persistante (*keyless signing*) liant un certificat éphémère à l’identité `OIDC` du workflow (`Fulcio`) et enregistrant la preuve au journal de transparence `Rekor`, dont la racine de confiance est distribuée par `TUF` [329]. À l’admission en grappe, signature et provenance sont vérifiées avant toute synchronisation `Argo CD` [321] [328] [329].

> **[Figure]**
> - 1. Dépôt Git (Source unique immuable)
> - 2. Portes CI automatisées (Pull Request)
> - 3. Réconciliation GitOps et admission
> - 4. Exécution cible
> - Code Harnais 80/20 & Workflows durables Prompts versionnés & jeux EvalOps
> - Contrats OASF & MCP server.json
> - Politiques OPA (Rego) & manifestes K8s
> - Promptfoo / EvalOps (non-régression PR)
> - Validateur OASF & server.schema.json
> - Conftest / OPA Test (règles deny_)
> - Build OCI + Cosign & provenance SLSA v1.2
> - Registre OCI & Journal Rekor
> - Argo CD (Sync & Self-Heal)
> - Contrôle d'admission (Gatekeeper / Sigstore)
> - Pods Agents & Workers durables
> - Registre OASF & MCP Gateway
> - compare vs main valide SemVer contrôle statique
> - empaquette
> - approuve PR approuve PR approuve PR
> - pousse artefacts signés
> - vérifie signatures
> - soumet état désiré
> - déploie si attesté publie fiches validées

*Fig. 51. – Chaîne complète du GitOps cognitif : dépôt unifié, portes CI multi-artefacts, attestation Sigstore/SLSA et réconciliation Argo CD*

### 13.3.4 Synthèse de co-versionnement et arbitrage EA / SA

| Artefact | Source de vérité | Porte CI (`PR`) | Attestation | Réconciliation |
| --- | --- | --- | --- | --- |
| **Code harnais** `80/20` | Git applicatif [320] | Tests unitaires et rejeu | OCI `Cosign` + `SLSA v1.2` [328] [329] | `Argo CD` (`Sync`, `Self-Heal`) [321] |
| **Prompts et gabarits** | Git (`R3–R4`) ou registre (`R1–R2`) [322] | Différentiel `Promptfoo` [323] | Paquet signé ou révision figée | Déploiement atomique ou étiquette [322] |
| **Contrats** `OASF` **/** `MCP` | Dépôt versionné [324] [325] | Validateur `OASF` + `server.schema.json` | Signature `Cosign` [329] | Publication auto post-sync [321] |
| **Politiques** `OPA` **(**`Rego`**)** | Dépôt gouvernance [326] | `opa test` + `Conftest` [327] | Bundle `Cosign` + `Rekor` [329] | Rechargement via `Argo CD` [321] |
| **Jeux** `EvalOps` | Dépôt `evals/` | Validation schéma et juge | Empreinte jointe CI [328] | Exécution CI et `AnalysisTemplate` |

*Tableau 13.3 — Matrice de versionnement conjoint et portes automatisées du* `GitOps` *cognitif.*

> **Arbitrage EA / SA** — Étendre les quatre principes `OpenGitOps` au **quintette cognitif complet** (code, prompts, schémas `OASF` /`MCP`, règles `OPA`, jeux `EvalOps`) et interdire l’édition non testée en production sur tout agent `R3–R4` [320] [321] [322] [323]. L’`EA` exige provenance `SLSA v1.2` et signature `Sigstore` sur chaque décision auditable, tout en tolérant des étiquettes dynamiques sous garde `EvalOps` en `R1–R2` [328] [329] [322]. Le `SA` verrouille la `PR` par `Conftest`, validateurs `OASF` /`server.schema.json` et `Promptfoo`, puis réconcilie via `Argo CD` avec `Self-Heal` et vérification à l’admission [321] [327] [323] [324] [325].

## 13.4 Déploiement progressif (shadow, canary, blue/green) et compatibilité des workflows durables en vol

### 13.4.1 Mode fantôme (Shadow), Canary et Blue/Green pour systèmes agentiques

Malgré les tests hors ligne, un changement de modèle ou de prompt reste exposé à la variance du trafic réel. La livraison progressive contient le rayon d’impact au moyen de `Kubernetes Gateway API` et `Argo Rollouts` [330] [331] :

1. **Mode fantôme (*Shadow* /** `Traffic Mirroring`**)** : via le filtre `HTTPRouteRequestMirror` de la `Gateway API` (ou l’étape `setMirrorRoute` d’Argo Rollouts), la passerelle duplique de façon asynchrone les requêtes vers une version candidate `v2` tout en renvoyant au client la seule réponse de `v1` [332] [331]. La spécification impose qu’un seul point d’aboutissement reçoive la copie et que la réponse miroir soit obligatoirement ignorée (`MUST be ignored`) [331]. Pour éviter qu’un agent `v2` n’exécute une **double écriture** sur le `System of Record` via un outil `MCP` mutateur, tout trafic miroir doit propager un en-tête de simulation forçant la `MCP Gateway` à détourner les écritures vers des bouchons [332].
2. **Canari (**`Canary`**) et** `AnalysisTemplate` : `Argo Rollouts` augmente par paliers le poids vers `v2` (`setWeight`, `pause`) via un routeur compatible plutôt que par le seul ratio de réplicas [330]. Chaque palier exécute un `AnalysisRun` issu d’un `AnalysisTemplate` interrogeant `Prometheus`, `OpenTelemetry` ou `EvalOps` selon des seuils `successCondition` ; au-delà de `failureLimit`, le contrôleur avorte et restaure `v1` [330] [333].
3. **Bascule bleu/vert (**`Blue/Green`**)** : lorsque deux versions frontales ne peuvent cohabiter, `Argo Rollouts` valide `v2` sur un `previewService` via `prePromotionAnalysis` avant de commuter l’`activeService` [334]. Le délai `scaleDownDelaySeconds` maintient `v1` actif le temps que les nœuds mettent à jour leurs règles réseau et drainent les flux ouverts [334].

### 13.4.2 Le défi des workflows durables en vol : rejeu déterministe et dérive de version

Les stratégies réseau visent des requêtes courtes. Or un workflow durable sous `Temporal`, `Restate` ou `Dapr Workflow` (chapitre 9) demeure **en vol** des heures ou des jours dans l’attente d’un minuteur ou d’une décision `Human-on-the-Loop` [335] [336] [337].

Dans un moteur à rejeu d’événements (`Temporal`, `Dapr Workflow`), au réveil d’un dossier endormi, le travailleur recharge le code actif pour rejouer l’historique passé [335] [337]. Si un *rolling update* a remplacé `v1` par un code `v2` modifiant l’ordre des activités ou des minuteurs, les commandes divergent de l’historique enregistré, déclenchant une **erreur de non-déterminisme** qui bloque le workflow en vol [335] [338].

### 13.4.3 Temporal Worker Versioning (Pinned / Rainbow), Patching, Restate immuable et Dapr

L’`IAP` industrialise les mécanismes natifs de compatibilité offerts par les moteurs durables :

1. `Temporal Worker Versioning` **et déploiements arc-en-ciel (*Rainbow*)** : depuis Temporal Server `v1.29.1+` et les SDK modernes (`Go v1.35+`, `Python v1.11+`, `TypeScript v1.12+`, `Java v1.29+`), chaque déploiement de travailleurs porte un `Build ID` au sein d’un `Worker Deployment` [335]. Le mode `Pinned` garantit que chaque workflow achève son exécution sur le `Build ID` exact de son démarrage au sein de **déploiements arc-en-ciel** (plus de deux versions simultanées) : `Current` ou `Ramping` reçoivent les nouveaux flux tandis que les anciens travailleurs terminent les dossiers en vol sans rustines ni erreur de rejeu, jusqu’à ce que Temporal signale leur drainage complet pour mise hors service [335]. Le mode `Auto-Upgrade` migre les workflows vers la nouvelle cible — utile au-delà de la durée de rétention des révisions — mais oblige à maintenir manuellement la compatibilité de rejeu [335]. `Temporal` proscrit toutefois d’activer ce versionnement sur des files spécifiques à un travailleur individuel pour ne pas épuiser les limites par version [335].
2. `Temporal Patching API` **et rejeu CI** : sous `Auto-Upgrade`, le code protège chaque évolution logique par `patched("id")`, qui écrit un marqueur dans l’historique des nouvelles exécutions et garde l’ancienne branche (`false`) pour les dossiers antérieurs [338]. Règle impérative de `Temporal` : **toujours placer la branche la plus récente en tête du bloc** `if patched(...)` (`v3` avant `v2`), sinon les nouvelles exécutions évaluent d’abord l’ancienne branche à `true` et s’y figent [338]. La CI exécute en outre des tests de rejeu sur historiques de production réels [335].
3. `Restate` **— Déploiements immuables par révision** : `Restate` enregistre chaque révision sous un point HTTP ou `ARN` FaaS **immuable** (`restate deployments register`) et achemine toute invocation, reprise ou attente sur la révision exacte de départ, sans aucune logique conditionnelle dans le code [336]. Sur Kubernetes, l’opérateur `Restate` crée une révision par changement de gabarit et réduit les anciennes après drainage, tout en conseillant de scinder les traitements pluri-mensuels en appels différés enchaînés [336].
4. `Dapr Workflow` **— Déterminisme et** `continue-as-new` : fondé sur un journal rejoué par sidecar avec concurrence bornée, `Dapr Workflow` exige un déterminisme strict en cours de vol et recommande `continue-as-new` (ou sous-workflows enfants) pour tronquer périodiquement l’historique des agents continus entre deux cycles [337].

> **[Figure]**
> - Passerelle /Argo Rollouts
> - Moteur Durable (Temporal / Restate)
> - Worker v1 (Current / Révision A)
> - Worker v2 (Canary / Révision B)
> - AnalysisTemplate
> - (OTel / EvalOps)
> - Passerelle /Argo Rollouts
> - Moteur Durable (Temporal / Restate)
> - Worker v1 (Current / Révision A)
> - Worker v2 (Canary / Révision B)
> - AnalysisTemplate
> - (OTel / EvalOps)
> - 1. Phase Shadow (Traffic Mirroring sans effet de bord)
> - 1 Requête réelle client (réponse retournée)
> - 2 Copie asynchrone RequestMirror (réponse ignorée, écritures bloquées)
> - 3 Émet latence, erreurs et scores fantômes
> - 2. Phase Canary / Ramping avec Workflow Pinning (en vol)
> - 4 Déclare v2 en Ramping (ex. 20 % nouveaux flux)
> - Workflow wf-101 (démarré sur v1) se réveille après attente HITL / minuteur
> - 5 Route wf-101 (Pinned sur Build ID v 1 /endpoint immuable A) -> zéro erreur de rejeu
> - 6 Route nouveau wf-204 (Build ID v2 /endpoint immuable B)
> - 7 Télémétrie SLO comportementale et coûts
> - 3. Promotion progressive ou retour arrière et drainage
> - 8 successCondition validée -> promeut v2 (Current)
> - Anciens workers v 1 maintenus jusqu'au drainage complet de wf-101
> - 9 Achève wf-101 proprement
> - 10 Mise à zéro (scaleDown) après drainage

*Fig. 52. – Séquence de déploiement progressif (Shadow, Canary) articulée avec l’épinglage des workflows durables en vol*

### 13.4.4 Matrice de sélection et arbitrage EA / SA

| Mécanisme | Couche | Usage principal | Garde-fou impératif |
| --- | --- | --- | --- |
| `Shadow` **(**`RequestMirror`**)** | Passerelle `L7` [332] [331] | Observer `v2` sous trafic réel [332] | Réponse ignorée ; **bouchonnage** `MCP` [332] [331] |
| `Canary` **(**`AnalysisTemplate`**)** | Trafic + métriques [330] [333] | Montée graduelle sous `SLO` /`EvalOps` [330] | `failureLimit` et repli auto [333] |
| `Blue/Green` | Service actif/aperçu [334] | Bascule atomique sur rupture frontale [334] | Calibrer `scaleDownDelaySeconds` [334] |
| `Temporal` `Pinned` | `Task Queue` + `Build ID` [335] | Isoler les workflows en vol sans rustine [335] | Maintenir builds jusqu’au drainage [335] |
| `Temporal` `Auto-Upgrade` | Marqueur `patched()` [335] [338] | Workflows multi-mois [335] | Branche récente en tête + rejeu CI [335] [338] |
| `Restate` **immuable** | Endpoint / `ARN` figé [336] | Zéro code de compatibilité [336] | Scinder attentes multi-mois [336] |
| `Dapr` **(**`continue-as-new`**)** | Journal sidecar [337] | Tronquer boucles continues [337] | Vérifier tâches en cours [337] |

*Tableau 13.4 — Articulation entre livraison progressive réseau et compatibilité des workflows durables en vol.*

> **Arbitrage EA / SA** — Interdire les mises à jour en place non versionnées sur tout travailleur hébergeant des workflows agentiques longs ou `Human-on-the-Loop` [335] [336]. Côté réseau, le `SA` enchaîne `Shadow` (`HTTPRouteRequestMirror` avec écritures simulées) puis `Canary` (`Argo Rollouts` + `AnalysisTemplate` `OTel` /`EvalOps`) [330] [333] [332] [331]. Côté durable, le `SA` privilégie les **déploiements arc-en-ciel épinglés** (`Temporal` `Pinned` par `Build ID` ou révisions immuables `Restate`), réservant `Auto-Upgrade` + `Patching` (vérifié par rejeu CI) ou `continue-as-new` aux processus dépassant la rétention des révisions [335] [338] [336] [337]. L’`EA` préserve ainsi l’intégrité des dossiers et des contrôles humains sous `SLA` lors des déploiements continus.

## Synthèse architecturale et transition vers le chapitre 14

Ce chapitre a défini le socle opérationnel de l’entreprise agentique. L’`Internal Agentic Platform` **(**`IAP`**)** réduit la charge cognitive extrinsèque via des *Golden Paths* exécutables (`Backstage`, `Kratix`, `Crossplane`) [306] [307] [308] [310] [309]. L’`AI Gateway` **hybride** (`Agent Router` /`GAIE`, `LiteLLM`) arbitre entre nuages publics et enclaves souveraines (`vLLM` /`llm-d`, `NVIDIA NIM`) sous budgets de jetons [311] [313] [312] [315] [319]. Enfin, le `GitOps` **cognitif** co-versionne, évalue et signe le quintette comportemental [320] [326] [328] [329] [323], tandis que l’épinglage des workflows durables sécurise les déploiements progressifs [330] [335] [336]. Le **chapitre 14** assemble ces standards au sein de trois **blueprints d’architecture de référence** prêts à être instanciés.

# Chapitre 14 — Architectures de référence de bout en bout : trois blueprints sectoriels et fédérés instanciables

Les chapitres 01 à 13 ont établi séparément chaque composant de l’entreprise agentique : stratification `SoE` / `SoA` / `SoR` et autonomie `L0–L4` (chapitre 01), cadre en quatre plans découplés (chapitre 02), harnais hybride `80/20` (chapitre 03), médiation `MCP` devant couches anti-corruption (chapitre 04), protocole `A2A` et infrastructure `AGNTCY` (chapitre 05), `RAG` gouverné par `ACL` et contrats sémantiques (chapitre 06), topologies multi-agents et `Claim-Check` (chapitre 07), maillage événementiel réactif (chapitre 08), exécution durable et Sagas (chapitre 09), sécurité `Zero-Trust` (`SPIFFE` et `OAuth 2.0 OBO`, chapitre 10), télémétrie `OpenTelemetry GenAI`, `EvalOps` et `SRE` (chapitre 11), gouvernance `OSFI E-23` / `Loi 25` / `EU AI Act` et `FinOps` (chapitre 12), enfin plateforme `IAP`, `AI Gateway` et `GitOps` (chapitre 13).

En production, le défi consiste à **composer ces briques sous contraintes contradictoires**. Un dossier de crédit bancaire exige durabilité transactionnelle et preuve d’audit ; un réseau d’approvisionnement B2B impose l’opacité entre organisations autonomes ; un environnement pharmaceutique ou de défense interdit toute sortie de données hors enclave. Ce chapitre assemble ces acquis en trois **blueprints sectoriels instanciables** (`14.1` à `14.3`), puis en dresse la **synthèse comparative non fonctionnelle** (`14.4`), selon une double lecture **EA** et **SA**. Par frontière d’étanchéité, la coexistence patrimoniale et la feuille de route relèvent du chapitre 15.

## 14.1 Blueprint 1 — Traitement transactionnel hautement réglementé (Temporal + MCP Gateway + OAuth OBO + Audit)

### 14.1.1 Contexte sectoriel et topologie en quatre plans

Le premier blueprint vise les secteurs financier, bancaire et assurantiel — octroi de crédit commercial, règlement de sinistres, conformité — où les agents préparent des mutations comptables sur les `Systems of Record` (`SoR`). Dans la taxonomie du chapitre 12, ces systèmes relèvent des paliers de risque `R3` **ou** `R4` (`OSFI E-23`), de l’article `12.1` **de la Loi 25** (décisions automatisées) et de l’`Annexe III` **de l’**`EU AI Act`. Ils opèrent aux niveaux `L2` **ou** `L3` du chapitre 01 : le système rassemble les preuves, vérifie les écarts et propose une écriture bornée, mais toute mutation pivot ou exception au-delà d’un plafond transite par une porte `Human-in-the-Loop` (`HITL`) effective.

Suivant le modèle en quatre plans du chapitre 02 et les `Golden Paths` de l’`IAP` (chapitre 13), le Blueprint 1 dissocie la planification probabiliste de l’engagement transactionnel (figure `14.1`) :

1. **Plan 1 (**`SoE`**)** : portail conseiller exposant l’avancement du dossier, le différentiel exact de mutation sur le `SoR`, les facteurs explicatifs et les pièces sources pour révision humaine.
2. **Plan 2 (**`SoA`**)** : moteur `Temporal` orchestrant 80 % du flux en code déterministe (éligibilité, plafonds, séquence Saga, minuteries `SLA`) et confinant les 20 % cognitifs dans des `Activities` isolées exécutant le harnais sous `JSON Schema` `strict: true` [339] [340].
3. **Plan 3 (**`Données et Outils`**)** : passerelle `MCP Gateway` (`agentgateway`) appliquant l’autorisation `MCP`, les règles d’`Intent Gate` (`OPA` /`Cedar`) et l’idempotence devant une couche anti-corruption (`ACL`) et une projection `CQRS` alimentée par `CDC` (`Debezium`) [341] [342].

4. **Plan 4 (**`Confiance et Audit`**)** : identités machines `SPIFFE` **/**`SPIRE`, délégation `OAuth 2.0 On-Behalf-Of` **(**`RFC 8693`**)**, télémétrie `OpenTelemetry GenAI` sans charge brute (`payload = 0`) et stockage immuable `WORM` sous `Amazon S3 Object Lock` en mode `Compliance` [343] [344] [345].

> **[Figure]**
> - Blueprint 1 — Enclave
> - Transactionnelle Réglementée (4 Plans)
> - [system]
> - «container» Plan 1 : Portail & HITL
> - [SoE / Révision Loi 25]
> - Affiche différentiel SoR
> - et preuve source
> - «container» Plan 2 : Moteur Durable
> - [Temporal HA + Harness 80/20]
> - Journalise replay, Sagas, Signals & Worker Versioning
> - «container» Plan 3 : MCP Gateway
> - [agentgateway + Intent Gate]
> - Médiation Streamable HTTP, OPA/Cedar & Idempotency-Key
> - «container» Plan 3 : Couche ACL /
> - CQRS [Debezium CDC + Projection]
> - Isole lectures SoR et sérialise mutations pivot
> - «container» Plan 4 : Identité & OBO
> - [SPIRE + STS RFC 8693]
> - Émet X.509-SVID et jetons OBO (sub, act[], aud RFC 8707)
> - «container» Plan 4 : Télémétrie &
> - WORM [OTel GenAI + S3 Object Lock]
> - Collecteur mTLS, payload=0 et archivage Compliance Mode
> - «person»
> - Conseiller / Client
> - Initie dossier crédit
> - ou sinistre (L2-L3)
> - «external_system» AI Gateway / Inférence
> - Cascade SLM/LLM
> - (PTU + Spillover)
> - «external_system» System of Record
> - Core Banking / ERP (Autorité comptable)
> - Soumet mandat
> - et valide HITL [OIDC / TLS 1.3]
> - Démarre workflow /
> - Signal approbation
> - [gRPC mTLS]
> - Appels cognitifs
> - bornés (20 %)
> - [AI Gateway]
> - Échange OBO (subject + SVID)
> - [RFC 8693]
> - tools/call + Jeton OBO + Idempotency
> - [MCP HTTP] Lit projection /Mutation pivot
> - [gRPC / REST]
> - CDC lecture /Écriture amortie
> - [BAPI / SQL]
> - Spans & traces
> - décisionnelles
> - [OTLP mTLS]
> - Journaux OPA
> - et piste OBO [OTLP / WORM]

*Fig. 53. – Architecture de référence C4 Container du Blueprint 1 — Traitement transactionnel hautement réglementé sur quatre plans*

### 14.1.2 Cinématique bout en bout : de l’intention `SoE` au scellement `WORM`

Une demande de sinistre ou de crédit suit cinq étapes contractuelles :

1. **Ouverture durable** : après authentification `OIDC` au `SoE`, le service frontal démarre un `Workflow` `Temporal` sous identifiant métier unique servant de clé d’idempotence. L’état initial est répliqué de façon synchrone sur trois zones de disponibilité (`AZ`) avant l’acquittement client [339] [346]. Pour absorber les pointes saisonnières (fin d’exercice ou événements climatiques en assurance), l’espace de noms bascule entre les modes `On-Demand Capacity` et `Provisioned Capacity` dimensionné en unités `TRU` [347].
2. **Extraction documentaire** `80/20` **et** `Claim-Check` : une `Activity` invoque l’`AI Gateway` pour analyser les justificatifs. Les définitions d’outils et consignes stables restent en préfixe pour préserver le cache `KV`, tandis que les extractions routinières sont routées vers un `SLM` spécialisé. Les pièces volumineuses et synthèses typées transitent par `Artifact URI` (chapitre 07) afin de ne pas alourdir l’historique d’événements `Temporal`.
3. **Échange** `OAuth 2.0 OBO` **(**`RFC 8693`**) devant la** `MCP Gateway` : pour lire le dossier client sur la projection `CQRS`, le worker découvre les métadonnées de ressource protégée (`RFC 9728`) et du serveur d’autorisation (`RFC 8414`) [341], puis soumet au *Security Token Service* (`STS`) le `subject_token` de l’initiateur et son propre `actor_token` `SPIFFE` [343]. Le `STS` émet un jeton restreint (`read:policy`) ciblé sur l’audience exacte de la passerelle (`RFC 8707`) et porteur de la revendication structurée `act` [341] [343]. Conformément à la spécification `MCP 2025-11-25`, la passerelle agit en serveur de ressources `OAuth 2.1`, valide l’audience cible et interdit strictement le relais passif de jetons (*token passthrough*) [341] [342].
4. **Décision déterministe, pause** `HITL` **et** `Intent Gate` : les règles impératives (ratios financiers, plafonds, exclusions) s’exécutent hors fenêtre cognitive. Si un seuil `HITL` est atteint, le `Workflow` suspend son cours sans consommer de processus grâce à une attente durable (`wait_condition`) bornée par minuteur `SLA` (chapitre 09). Sur approbation ou rectification dans le `SoE`, un `Signal` (ou `Update`) réveille l’instance. Un second échange `RFC 8693` limite alors la portée à l’outil mutateur (`write:settlement`), que l’`Intent Gate` (`OPA` /`Cedar`) dans `agentgateway` confronte au mandat, au plafond et à l’identifiant d’approbation humaine [343] [342].
5. **Saga compensatoire et archivage** `WORM` : en cas d’échec après l’action pivot (ex. échec d’émission du paiement après réservation comptable), `Temporal` exécute en ordre inverse les compensations enregistrées (chapitre 09). En clôture, la trace `OpenTelemetry GenAI` (`trace_id`, `spiffe.workload.id`, chaîne `(sub, act[])`, motifs principaux sans `RP` bruts) est versée dans un compartiment versionné `S3 Object Lock` en mode `Compliance` [344] [345]. Ce mode interdit toute suppression ou réécriture jusqu’à la date d’échéance — même par l’administrateur racine — et permet de placer une mise en attente légale (*Legal Hold*) indépendante en cas de litige [344]. Adossé à l’évaluation *Cohasset Associates* pour `SEC 17a-4`, `FINRA` et `CFTC`, cet archivage soutient directement les vérifications de la troisième ligne de défense (`3LoD`) [344].

### 14.1.3 Continuité multi-régions, versionnement en vol et lecture EA / SA

La mise en production s’appuie sur trois verrous d’exploitation :

- **Réplication** `3-AZ` **et multi-régions** : nativement, `Temporal Cloud` garantit `RPO = 0` et `RTO ≈ 0` sur perte d’une zone de disponibilité [339] [346]. L’activation de la réplication asynchrone multi-régions ou multi-nuages assure `RPO < 1 minute` et `RTO < 20 minutes` avec routage `DNS` transparent et basculement automatique, à condition de maintenir les workers en `Active/Hot-Passive` ou `Active/Active` sur les deux régions [339] [346]. À défaut de réplication HA, les sauvegardes s’effectuent toutes les 4 heures [346].
- **Évolution sans rupture (**`Worker Versioning`**)** : les dossiers réglementés restent ouverts plusieurs jours ou semaines en attente de pièces. Pour modifier le code sans déclencher d’erreur de non-déterminisme au rejeu, `Worker Versioning` associe chaque déploiement à un nom logique et un `Build ID`, et maintient les workflows déjà démarrés en mode `Pinned` sur leur version initiale, tandis que les nouveaux adoptent la révision courante [340].
- **Résilience aux erreurs** `429` **et repli** `L0` : les saturations `LLM` (`HTTP 429`) sont absorbées par recul exponentiel et gigue dans l’`Activity` (avec bascule vers une terminaison homologuée sur l’`AI Gateway`). Si un coupe-circuit cognitif s’ouvre (`FORCED_OPEN`, chapitre 11), le flux déroute les dossiers vers le traitement humain déterministe `L0`.

En **lecture EA**, ce blueprint assure l’imputabilité exigée par `OSFI E-23` et la `Loi 25` (`Agent Owner`, piste `WORM`, recours humain effectif) tout en protégeant les licences `SoR` via `CQRS`. En **lecture SA**, il élimine l’état volatile, bloque le *token passthrough* devant `MCP` et sécurise le rejeu multi-semaines [340] [341] [344].

| Plan | Composants | Contrats clés | Résilience et pannes | Preuve d’audit |
| --- | --- | --- | --- | --- |
| **Plan 1 (**`SoE`**)** | Portail conseiller, écran différentiel `HITL` | `OIDC`, `Loi 25 art. 12.1` (ch. `01`, `12`) | Réessai client idempotent | Trace de révision humaine effective |
| **Plan 2 (**`SoA`**)** | `Temporal HA` + `Harness 80/20` | `Worker Versioning` (`Pinned`), `JSON Schema` | `3-AZ` (`RPO=0`), multi-régions (`RPO<1m`, `RTO<20m`) [339] [346] | Historique rejouable et `Build ID` [340] |
| **Plan 3 (**`Data`**)** | `agentgateway` + `OPA` + `ACL` /`CQRS` | `MCP OAuth 2.1`, `RFC 8707`, idempotence [341] | Rejet *token passthrough*, Sagas post-pivot | Journal `OPA` et état idempotent [342] |
| **Plan 4 (**`Audit`**)** | `SPIRE` + `STS` + `OTel` + `S3 Lock` | `RFC 8693` (`act[]`), `OTel`, `Compliance` [343] [344] | Rotation `SVID` en mémoire ; `mTLS` `OTel` | Piste `(sub, act[])` sous `S3 Object Lock` [344] |

*Tableau 14.1 — Profil d’assemblage, contrats et garanties du Blueprint 1 (Traitement transactionnel hautement réglementé).*

> **Arbitrage EA / SA** — Sur les processus transactionnels `R3` –`R4`, l’`EA` interdit l’écriture directe dans un `SoR` et impose l’archivage `WORM` (`S3 Object Lock Compliance` ou équivalent) des traces `(sub, act[])` et décisions `HITL` [343] [344]. Le `SA` confine l’inférence dans des `Activities` `Temporal` en `Worker Versioning Pinned`, impose l’échange `OAuth 2.0 OBO` (`RFC 8693` + `RFC 8707`) devant la `MCP Gateway` et active la réplication `Temporal` multi-régions avec workers `Active/Hot-Passive` [339] [346] [340] [341].

## 14.2 Blueprint 2 — Maillage inter-départemental et partenaires B2B (A2A + AGNTCY/OASF + Event Mesh)

### 14.2.1 Contexte sectoriel et modèle hybride à deux strates

Le deuxième blueprint traite les chaînes de valeur transversales et étendues aux partenaires externes : approvisionnement *Source-to-Pay*, litiges fournisseurs, douanes et logistique impliquant Achats, Juridique, Finance et agents `SaaS` tiers. Aucune équipe ne gouverne les systèmes internes d’un partenaire externe, et chaque grand département évolue à son propre rythme. L’invariant d’**opacité inter-domaines** (chapitre 05) proscrit donc toute exposition directe des serveurs `MCP` ou des bases de mémoire d’un domaine hors de sa frontière.

Pour allier visibilité contractuelle globale et autonomie locale, ce blueprint déploie le **patron hybride à deux strates** du chapitre 08 (figure `14.2`) :

- **Strate macro-réglementaire fédérée** : un *Process Manager* durable pilote les jalons contractuels, délais `SLA` et escalades entre domaines internes et partenaires B2B via `A2A v1.0` et l’infrastructure `AGNTCY` (`OASF`, `ADS`, `SLIM` /`MLS`) [348] [349].
- **Strate intra-domaine chorégraphiée** : à l’intérieur des domaines et entre sites internes, un `Event Mesh` (`Solace` ou `Kafka`) diffuse des événements `CloudEvents` conformes aux contrats `AsyncAPI 3.0` vers des agents ambiants réactifs, chacun conservant ses outils `MCP` privés [350] [351] [352].

> **[Figure]**
> - Strate Fédérée B2B (A2A
> - & AGNTCY)
> - [system]
> - Strate Intra-Domaine :
> - Event Mesh
> - [system]
> - «container» Passerelle A2A B2B
> - [A2A v1.0 + AgentCard]
> - Valide schémas, TLS 1.3, anti-SSRF & CancelTask
> - «container» Annuaire AGNTCY ADS
> - [OASF + OCI/ORAS + Sigstore]
> - Indexe capacités fédérées
> - et atteste la provenance
> - «container» Transport SLIM / MLS
> - [Pub/Sub + E2EE MLS]
> - Traverse pare-feu B2B sans exposition entrante
> - «container» Event Mesh Hybride [Solace DMR / Kafka Linking]
> - CloudEvents, AsyncAPI 3.0
> - & files Retry / DLQ
> - «container» Agents Domaine Achats
> - [Agents ambiants + MCP GW]
> - Chorégraphie intra-domaine
> - sous plafond ce_ttl
> - «container» Agents Domaine Finance
> - [Agents ambiants + MCP GW]
> - Rapprochement factures
> - et projection SoR
> - «container» Process Manager Macro
> - [Orchestrateur Durable]
> - Pilote jalons SLA, quorum & compensations
> - «external_system» Agent Partenaire B2B
> - Agent SaaS / Fournisseur
> - (Opaque A2A / SLIM)
> - Délègue Task &
> - reçoit Artifacts [A2A SSE / Webhook]
> - Découvre & vérifie
> - fiche OASF [ADS / Sigstore]
> - Chiffre session
> - externe [MLS Group E2EE]
> - Échange Tasks &
> - Artifacts signés
> - [SLIM Sortant]
> - Commandes & jalons
> - [CloudEvents]
> - Diffuse événements
> - Achats [Retry / Backpressure]
> - Diffuse événements
> - Finance [Retry / Backpressure]

*Fig. 54. – Architecture de référence C4 Container du Blueprint 2 — Maillage inter-départemental et B2B via A2A, AGNTCY/OASF et Event Mesh*

### 14.2.2 Fédération `AGNTCY` /`OASF`, délégation `A2A` et traversée B2B `SLIM` /`MLS`

L’interopérabilité horizontale entre le *Process Manager*, les façades départementales et les pairs B2B s’appuie sur quatre verrous :

1. **Catalogue** `AGNTCY ADS` **et taxonomie** `OASF` : chaque façade interne et chaque partenaire B2B déclare ses capacités, compétences et interfaces selon le modèle ouvert `OASF` (*Open Agentic Schema Framework*) publié dans l’`Agent Directory Service` **(**`ADS`**)** [349]. Comme établi au chapitre 05 (stockage adressable `OCI` /`ORAS` et provenance `Sigstore`), l’entreprise ne consomme en production que les fiches répliquées et approuvées dans le miroir interne du registre central d’agents.
2. **Authentification sur** `Agent Card` `A2A` **et fédération** `SPIFFE` : avant toute délégation, la passerelle `A2A` valide l’`Agent Card` (`/.well-known/agent-card.json`) signée (canonisation `JWS`, chapitre 05) et négocie le schéma déclaré dans `securitySchemes` (`OAuth 2.0`, `OIDC` ou fédération `mTLS` par *Trust Bundles* `SPIFFE` entre entités appairées) [348]. Respectant la spécification `A2A`, l’identité utilisateur n’est jamais placée dans le corps `JSON-RPC` : elle reste strictement véhiculée et vérifiée au niveau du transport `TLS 1.3` et des en-têtes `HTTP` [348].
3. **Délégation asynchrone (**`SSE`**, Webhooks et** `SLIM` **/**`MLS`**)** : lorsque le partenaire expose une terminaison `HTTPS` mutuellement authentifiée, le *Process Manager* choisit l’une des liaisons normalisées (`JSON-RPC`, `gRPC` ou `HTTP+JSON/REST`) et soumet une `Task` `A2A` avec notifications push par webhook ou diffusion en continu `SendStreamingMessage` (`SSE`) [348]. Si les pare-feu B2B interdisent tout port entrant ou si des relais intermédiaires sont non fiables, les échanges basculent sur le transport `SLIM` d’`AGNTCY` avec chiffrement de groupe `MLS`, maintenant des sessions chiffrées de bout en bout sur connexions sortantes uniquement [349].
4. **Défense des frontières (**`ASI07` **/**`ASI08`**) et coupure** `CancelTask` : tout `Artifact` (bon de commande ou avis logistique structuré) reçu d’un pair externe est traité comme donnée non fiable. La passerelle `A2A` applique validation `JSON`, protection anti-`SSRF` sur toute `URI` distante conformément aux considérations de sécurité `A2A`, filtrage d’injection indirecte avant remise au *Process Manager* et émission de `CancelTask` dès dépassement de `SLA` ou de budget `FinOps` [348].

### 14.2.3 Chorégraphie intra-domaine sur `Event Mesh` et lecture EA / SA

À l’intérieur des domaines de l’entreprise, les jalons issus du *Process Manager* et les flux opérationnels alimentent l’`Event Mesh` :

- **Contrats** `CloudEvents` **/**`AsyncAPI 3.0` **et contrôle d’écho** : chaque événement embarque `ce_correlationid` et un plafond de sauts `ce_ttl` prévenant les boucles d’écho sémantiques (chapitre 08). Les agents ambiants dissocient la lecture courtier de l’appel `LLM` et bornent les messages en vol (`MaxAckPending` ou `max.poll.records`) afin d’éviter les rééquilibrages de partitions sous latence variable.
- **Topologies multi-sites** `Solace DMR` **et** `Kafka Cluster Linking` : en déploiement hybride multi-nuages et périphérie, `Solace` relie les courtiers par *Dynamic Message Routing* (`DMR`) [351]. Sa réplication inter-centres s’appuie sur `Config-Sync` (et la propagation automatique des files durables) tout en respectant les transactions locales ou `XA` sur le site de secours : le mode **synchrone** assure `RPO = 0` mais bride le débit d’un producteur bloquant selon la latence aller-retour inter-sites, tandis que le mode **asynchrone** préserve le débit nominal au prix d’un `RPO` non nul sur panne brutale [350]. Après basculement, les abonnements avec *wildcards* chevauchants sur les ponts sont interdits pour prévenir toute réinjection en boucle vers le courtier d’origine [350]. Sur socle `Kafka` **/**`Confluent`, `Cluster Linking` réplique les partitions octet par octet sans `Kafka Connect` ni `MirrorMaker 2` et évite la décompression-recompression des lots, en conservant des *offsets* globalement identiques qui réduisent fortement le `RTO` de reprise sous mode `KRaft` [352].
- **Gestion des poisons sémantiques** : les échecs répétés de schéma ou de modèle basculent sur des files `Retry` non bloquantes puis une `Dead-Letter Queue` (`DLQ`) enrichie pour arbitrage humain ou traitement déterministe.

En **lecture EA**, ce blueprint protège l’autonomie des départements et facilite le remplacement des fournisseurs `SaaS` grâce au vocabulaire commun `OASF`, tout en maintenant l’imputabilité macro sur le *Process Manager*. En **lecture SA**, il étanchéifie `A2A` (externe), `Event Mesh` (interne) et `MCP` (local), tout en prévenant `SSRF`, boucles de réinjection et perte d’*offsets* au basculement [348] [350] [352].

| Couche ou flux | Technologie et standard | Frontière d’autorité et sécurité | Résilience et pannes |
| --- | --- | --- | --- |
| **Découverte fédérée** | `AGNTCY ADS` + `OASF` (`OCI` /`Sigstore` ch. `05`) [349] | Miroir interne gouverné ; rejet des fiches non signées | Cache catalogue ; tolère une coupure temporaire du pair |
| **Délégation externe** | `A2A v1.0` (`Tasks`, `SSE`, Webhooks, `Agent Card`) [348] | Opacité stricte (zéro `MCP` exposé) ; auth hors `JSON` ; anti-`SSRF` [348] | Reprise asynchrone par ID ; `CancelTask` sous `SLA` [348] |
| **Transport B2B** | `AGNTCY SLIM` + chiffrement `MLS` [349] | Chiffrement bout en bout ; connexions sortantes seules | Streaming faible latence ; resynchronisation `MLS` |
| **Maillage interne** | `Event Mesh` (`Solace DMR`, `Cluster Linking`, `CloudEvents`) [350] [351] [352] | Plafond `ce_ttl`, `AsyncAPI 3.0`, domaines sous `MCP GW` | `Retry` /`DLQ` ; *offsets* identiques (`Cluster Linking`) ou `DR` `Solace` [350] [352] |

*Tableau 14.2 — Frontières de découplage, protocoles et résilience du Blueprint 2 (Maillage inter-départemental et B2B).*

> **Arbitrage EA / SA** — Adopter le patron hybride à deux strates pour toute chaîne multi-départements ou B2B : l’`EA` proscrit la chorégraphie pure sans *Process Manager* durable pour les jalons contractuels et exige une fiche `OASF` signée et enregistrée avant toute connexion externe [348] [349]. Le `SA` garde chaque domaine opaque derrière sa passerelle `A2A`, déploie `SLIM` /`MLS` face aux pare-feu restrictifs, borne l’`Event Mesh` par `ce_ttl` et `DLQ` et arbitre entre `Cluster Linking` et réplication `Solace` synchrone/asynchrone selon la contrainte `RPO` /latence inter-sites [350] [352].

## 14.3 Blueprint 3 — Exploitation souveraine à haute confidentialité (AI Gateway locale + RAG ACL + microVM)

### 14.3.1 Contexte sectoriel et périmètre *Zero Egress*

Le troisième blueprint répond aux impératifs de la recherche pharmaceutique, de la défense, des dossiers cliniques et des secrets industriels soumis au régime physique `Silo` (chapitres 02, 06 et 12). Aucun jeton de prompt, fragment documentaire ni renseignement personnel sensible (`RP` sous Loi 25) ne quitte le périmètre interne vers une API infonuagique publique. L’architecture doit simultanément bloquer trois risques majeurs : l’exécution de code généré arbitraire (`OWASP ASI05`), la fuite inter-chercheurs par similarité vectorielle (`ASI06` / `LLM08`) et la compromission de l’hôte ou de l’hyperviseur dans un hébergement souverain mutualisé.

Comme l’illustre la figure `14.3`, le Blueprint 3 déploie une enclave Kubernetes dépourvue de route sortante vers Internet (*Zero Egress*), unissant une `AI Gateway` **locale** avec inférence confidentielle, un `RAG` **à triple contrôle d’accès** et une **exécution en** `microVM`.

> **[Figure]**
> - Blueprint 3 — Enclave
> - Souveraine Sur Site
> - (Air-Gapped)
> - [system]
> - «container» AI Gateway & EPP [Envoy / Gateway API Inference]
> - Routage KV-cache aware, quotas TPM & Zéro Egress
> - «container» Inférence Confidentielle
> - [llm-d + vLLM / NIM (CoCo)]
> - CPU SEV-SNP/TDX + GPU TEE
> - (Mémoire chiffrée)
> - «container» Attestation & KMS Local
> - [NRAS / Trustee / SPIRE]
> - Vérifie enclave avant déchiffrement des poids
> - «container» Agent Sandbox [WarmPool + Firecracker / Kata]
> - Exécution code & harnais
> - en microVM (≤125 ms) «container» Moteur ReBAC [OpenFGA (ListObjects)]
> - Résout droits utilisateur avant recherche vectorielle
> - «container» Index Vectoriel Silo
> - [Qdrant (is_tenant / Silo)]
> - Segments filtrés par ACL & recherche hybride RRF
> - «container» Base Relationnelle RLS
> - [PostgreSQL (Row Security)]
> - Mémoire & métadonnées
> - verrouillées par session
> - «person»
> - Chercheur / Clinicien
> - Accès interne authentifié
> - (Haute confidentialité)
> - Requête métier (Jeton OIDC interne)
> - [mTLS SPIFFE] Demande objets
> - autorisés [gRPC / ListObjects]
> - Recherche hybride
> - filtrée par IDs
> - [TLS interne]
> - Lit/écrit contexte sous politique RLS
> - [SQL + tenant_id]
> - Inférence locale (aucune sortie WAN)
> - [OpenAI API]
> - Aiguillage EPP (préfixe KV chaud)
> - [gRPC / HTTP]
> - Preuve matérielle SEV-SNP / TDX / GPU
> - [Attestation]

*Fig. 55. – Architecture de référence C4 Container du Blueprint 3 — Enclave souveraine avec AI Gateway locale, RAG ACL et microVM*

### 14.3.2 `AI Gateway` locale, routage `EPP` et inférence confidentielle (`vLLM` /`llm-d` ou `NIM` sous `CoCo`)

L’exploitation interne de modèles ouverts spécialisés se heurte souvent sur Kubernetes aux répartiteurs *round-robin* qui brisent la localité du cache de préfixes `KV` et allongent le *Time to First Token* (`TTFT`). Ce blueprint déploie donc une pile consciente de l’état d’inférence :

1. **Passerelle locale et** `Endpoint Picker` **(**`EPP`**)** : l’`AI Gateway` (`agentgateway` ou `Envoy` intégrant `Kubernetes Gateway API Inference Extension`) applique quotas `TPM`, télémétrie `OpenTelemetry` locale et filtrage réseau, puis route vers un `InferencePool` piloté par l’`Endpoint Picker` **(**`EPP`**)** [342] [353]. L’`EPP` exploite en temps réel la profondeur des files d’attente, la localité du cache `KV` et les adaptateurs `LoRA` chargés pour sélectionner la réplique optimale [353].
2. **Moteur** `llm-d` **/** `vLLM` **ou** `NVIDIA NIM` : l’enclave s’appuie soit sur la pile CNCF `llm-d` orchestrant `vLLM` (*Well-Lit Paths* : routage par préfixe, cache hiérarchisé, désagrégation *prefill/decode*), dont les bancs d’essai documentent jusqu’à **3× plus de débit de sortie**, un `TTFT` **2× plus rapide** et **40 % de réduction du** `TTFT` **et de l’**`ITL` sur Google Vertex sous licence Apache 2.0 [354], soit sur des conteneurs durcis `NVIDIA NIM` miroirs en registre privé lorsque le support `NVIDIA AI Enterprise` est exigé (chapitre 13).
3. **Enclaves** `NVIDIA Confidential Containers` **(**`CoCo`**)** : lorsque les grappes GPU résident chez un hébergeur souverain externe ou sont partagées entre entités, les pods d’inférence s’exécutent via `CoCo`, **Kata Containers** et `NVIDIA GPU Operator` (`cc-manager`, `VFIO passthrough` et `Kata Sandbox Device Plugin`) au-dessus d’enclaves CPU (`AMD SEV-SNP` ou `Intel TDX`) et GPU en mode `Confidential Computing` [355]. La mémoire demeure chiffrée avec vérification d’intégrité, et un service d’attestation cryptographique distant valide l’état de la `TEE` avant la libération des secrets ou poids de modèles déchiffrés [355].

### 14.3.3 Pipeline `RAG` souverain : `OpenFGA`, `Qdrant` partitionné et `PostgreSQL RLS`

Parce qu’un moteur vectoriel classe par proximité sémantique sans notion d’habilitation, le Blueprint 3 découple l’indexation de l’autorisation par trois verrous :

- **Résolution relationnelle** `OpenFGA` **(**`ReBAC`**)** : projet CNCF inspiré de Zanzibar, `OpenFGA` modélise les relations hiérarchiques (essais cliniques, dossiers, documents, équipes) [356]. Avant construction du contexte `LLM`, le pipeline `RAG` applique les primitives `ListObjects` (pré-filtrage) ou `BatchCheck` (post-filtrage, chapitre 06), rendant toute révocation immédiate sans ré-indexation vectorielle [356].
- **Isolation vectorielle** `Qdrant` : créer une collection par groupe alourdit la mémoire et bute sur la limite par défaut de **1 000 collections** par grappe sur Qdrant Cloud [357]. L’architecture privilégie donc le partitionnement par charge utile `is_tenant: true` ou le *Tiered Multitenancy* (qui regroupe les petits locataires sur un *shard* partagé et promeut les plus volumineux vers des *shards* dédiés) filtré par `OpenFGA`, tout en réservant le régime `Silo` physique (collections ou grappes distinctes) aux entités juridiques ou classifications incompatibles [357].
- **Verrou moteur** `PostgreSQL Row-Level Security` **(**`RLS`**)** : les métadonnées, la mémoire épisodique et les vues `Text-to-SQL` activent `ENABLE ROW LEVEL SECURITY` [358]. Lorsqu’aucune politique explicite ne s’applique, PostgreSQL impose un refus par défaut (*default-deny*) et évalue le prédicat d’isolation **avant toute condition ou fonction utilisateur** (hors fonctions `leakproof`), neutralisant toute fuite même si un outil `MCP` omet une clause de filtrage [358].

### 14.3.4 Confinement `microVM` (`Agent Sandbox` + `Firecracker` /`Kata`) et lecture EA / SA

Lorsque les agents exécutent du code analytique ou manipulent des fichiers sensibles (`OWASP ASI05`), le runtime `runc` est remplacé par des `microVM` :

- **Contrôleur** `Kubernetes agent-sandbox` : sous Kubernetes `1.29+` (validation `CEL` des `CRD`), `agent-sandbox` orchestre des environnements isolés à identité stable via `Sandbox`, `SandboxTemplate`, `SandboxClaim` et `SandboxWarmPool`, déléguant le noyau à `gVisor` ou `Kata Containers` via `RuntimeClass` [359].
- **Spécification quantitative** `Firecracker` : testée en intégration continue, la `microVM` `Firecracker` affiche un surcoût mémoire VMM **≤ 5 MiB** (1 vCPU, 128 MiB RAM, hors `MMDS`), atteint `/sbin/init` en **≤ 125 ms** (socket API en ~12 ms temps réel / 8 ms CPU), conserve **plus de 95 % de la performance CPU native** et n’ajoute que **0,06 ms** de latence réseau moyenne [360]. Couplée à `SandboxWarmPool` et à une politique réseau *Zero Egress*, l’isolation matérielle reste quasi instantanée [359] [360].

En **lecture EA**, ce blueprint concilie automatisation analytique et souveraineté stricte (`Loi 25` `Silo`, `ÉFVP` maîtrisée, contrôle des poids et traces). En **lecture SA**, il marie réactivité (`EPP`, `llm-d`, `WarmPool`) et défense en profondeur matérielle (`CoCo` + `Firecracker` /`Kata`) comme relationnelle (`OpenFGA` + `PostgreSQL RLS`) [359] [360] [355] [353] [358] [356].

| Couche | Briques assemblées | Mécanisme d’isolation ou d’accélération | Limite ou coût |
| --- | --- | --- | --- |
| **Inférence locale** | `AI Gateway` + `EPP` + `llm-d` (`vLLM`) ou `NIM` [353] [354] | Cache `KV` et files via `EPP` ; jusqu’à `2×` `TTFT` et `3×` débit (`llm-d`) [353] [354] | `CAPEX` GPU fixe ; maintien local des modèles |
| **Calcul confidentiel** | `NVIDIA CoCo` + `Kata` + `SEV-SNP` /`TDX` + GPU Operator [355] | Mémoire chiffrée et attestation avant libération des clés [355] | Matériel `TEE` requis et service d’attestation interne |
| `RAG` **gouverné** | `OpenFGA` + `Qdrant` (`is_tenant` / `Silo`) + `PostgreSQL RLS` [357] [358] [356] | `ACL` pré-prompt, partition `HNSW` et refus moteur par défaut (`RLS`) [357] [358] | Latence `ReBAC` à maîtriser par cache court (ch. `06`) |
| **Exécution code** | `agent-sandbox` (`WarmPool`) + `Firecracker` / `Kata` [359] [360] | Noyau dédié, démarrage `≤ 125 ms`, `≤ 5 MiB`, `Zero Egress` [360] | Mémoire réservée pour les `WarmPools` actifs |

*Tableau 14.3 — Contrôles de souveraineté, d’isolation mémoire et d’accélération du Blueprint 3 (Haute confidentialité).*

> **Arbitrage EA / SA** — Imposer le périmètre *Zero Egress* et le cloisonnement `Silo` pour toute charge manipulant secrets industriels, données de santé ou dossiers classifiés : l’`EA` bannit les API externes, exige `Confidential Containers` (`CoCo` + attestation) sur tout nœud opéré par un tiers et impose l’auditabilité du filtrage `ACL` pré-prompt [355] [356]. Le `SA` assemble `agent-sandbox` (`SandboxWarmPool` sur `Firecracker` /`Kata`), `EPP` + `llm-d` /`vLLM` (ou `NIM`) et le double verrou `OpenFGA` /`Qdrant` + `PostgreSQL RLS` contre toute fuite inter-locataires [359] [360] [353] [357] [358].

## 14.4 Synthèse comparative non fonctionnelle : latence p95, débit, RPO/RTO, enveloppe FinOps et équipes

L’arbitrage entre ces trois blueprints — ou leur composition sur un même socle `IAP` — repose sur cinq critères non fonctionnels. Les chiffres ci-dessous distinguent rigoureusement les garanties normatives vérifiées des **cibles de dimensionnement d’architecture de référence** servant aux dossiers `ARB` et `FinOps`.

### 14.4.1 Budget de latence `p95` et profils de débit

La latence `p95` totale somme le plan de contrôle, la médiation `MCP` /`A2A` et l’inférence (`TTFT` + `TPOT`). Sur le socle système, `SPIFFE` renouvelle les certificats en mémoire via `Envoy SDS` sans surcoût réseau par requête ; `agentgateway` et `OPA` ajoutent quelques millisecondes ; `Temporal Cloud` maintient un `SLO` `p99` **de 200 ms par région** sur les requêtes workers [347] ; et `Firecracker` ajoute **0,06 ms** de latence réseau moyenne [360]. La variance majeure provient donc de l’inférence et des appels externes. En gabarits de conception sous la règle `80/20` :

1. **Blueprint 1** : un cycle de préparation (projection `CQRS` + 2 à 3 appels `SLM` /`LLM`) vise une **cible machine** `p95` **de 3 à 8 secondes** avant la pause `HITL` asynchrone ; le débit se règle en actions par seconde (`On-Demand` ou `Provisioned Capacity` en `TRUs` sous `Temporal`) [347], tandis que `CQRS` /`CDC` protège le `SoR`.
2. **Blueprint 2** : l’`Event Mesh` distribue les événements intra-sites en **dizaines de millisecondes** (hors réplication synchrone inter-sites), alors qu’une `Task` `A2A` B2B s’inscrit dans une **cible** `p95` **de dizaines de secondes à plusieurs minutes** (ou heures par webhook) [348] [350]. Les courtiers `Solace` ou `Kafka` absorbent les rafales grâce à la régulation `TPM` (*backpressure*) [351] [352].
3. **Blueprint 3** : l’alignement du cache `KV` (`EPP` + `llm-d`, jusqu’à **2×** `TTFT` et **3× débit** [354]) et le filtrage `OpenFGA` /`Qdrant` visent une **cible** `p95` **interactive de 1,5 à 4 secondes** en `RAG` à tour unique, et **4 à 12 secondes** avec exécution de code en `microVM` pré-chauffée (`WarmPool`) [359] [360]. Le débit dépend directement de la bande passante `HBM` des GPU disponibles.

### 14.4.2 Objectifs `RPO` /`RTO` et continuité de service

Suivant les piliers fiabilité d’AWS et d’Azure — où le `RTO` borne la durée maximale d’arrêt sur sinistre unique (distinct du `MTTR` moyen) et le `RPO` la perte temporelle maximale tolérée [361] [362] — les trois blueprints adoptent des topologies graduées :

- **Blueprint 1** : `Temporal` garantit `RPO = 0` et `RTO ≈ 0` sur panne de zone (`3-AZ`) et `RPO < 1 minute` / `RTO < 20 minutes` en réplication multi-régions (ou multi-nuages) sous `SLA` de **99,99 %**, avec archives `WORM` multi-zones [339] [346] [347] [344].
- **Blueprint 2** : `Solace` propose soit la réplication synchrone (`RPO = 0`, bridée par le RTT réseau), soit l’asynchrone (`RPO` faible, basculement coordonné en quelques minutes) [350] ; sous `Kafka`, `Cluster Linking` préserve des *offsets* identiques et raccourcit le `RTO` face à `MirrorMaker 2` [352].
- **Blueprint 3** : pour éviter de doubler un `CAPEX` GPU onéreux en actif-actif, le compromis réaliste place les données (`PostgreSQL`, `Qdrant`, `OpenFGA`, `SPIRE`) en **actif-passif à chaud (**`Warm Standby`**)** (`RPO` de quelques secondes à 5 minutes cible) et la réserve GPU en mode `Pilot Light` ou dégradé sur `SLM` critiques (`RTO` cible de 15 à 60 minutes) [355] [361] [362].

### 14.4.3 Enveloppe `FinOps` et modèle d’équipes (`Team Topologies`)

Alors que **98 %** des équipes `FinOps` gèrent des dépenses d’IA en 2026 [363], le pilotage exige d’allouer d’abord les coûts par périmètre métier à travers les six modèles tarifaires (API à la demande, engagements, capacité provisionnée, lots/préemptible, licences par siège et paliers), puis de suivre le `TCO` **complet à cinq postes** et le **coût par résultat métier réussi** (en plage statistique) [363]. Le **Blueprint 1** présente un `OPEX` prévisible (`PTU` + débordement `PAYG`, supervision `HITL`, `Temporal`, `WORM`) réduit par la partition `80/20`. Le **Blueprint 2** expose le budget à l’amplification inter-agents et aux licences `SaaS` B2B, imposant l’attribution `OpenTelemetry GenAI` + `FOCUS`, le plafond `ce_ttl` et l’arrêt `CancelTask` [348] [363] [345]. Le **Blueprint 3** bascule vers un `CAPEX` GPU et mémoire (`WarmPool`) qui n’est rentable qu’à fort taux d’utilisation partagé via l’`AI Gateway` et `llm-d` [359] [354] [363].

Sur le plan organisationnel, la maîtrise de la **charge cognitive** s’appuie sur `Team Topologies` [364] (figure `14.4`) : une `Platform Team` fournit l’`IAP` en mode `X-as-a-Service` (`AI Gateway`, `agentgateway`, `SPIRE`, `OTel`, `Temporal`, `Event Mesh`, `agent-sandbox` /`llm-d`) après une phase ponctuelle de `Collaboration` lors de l’accueil d’une nouvelle capacité ; une `Enabling Team` intervient en `Facilitation` (`EvalOps`, `FinOps`, `ÉFVP`, revues `2LoD`) ; des `Stream-aligned Teams` (typiquement 5 à 8 ETP incluant l’`Agent Owner`) livrent les cas métier ; et une `Complicated Subsystem Team` reste confinée au **Blueprint 3** pour les noyaux GPU/`CoCo` /`microVM` [360] [355] [364].

> **[Figure]**
> - Équipe Plateforme (IAP — Mode X-as-a-Service)
> - Équipe Habilitante (Enabling — Mode Facilitation)
> - Équipes Alignées sur le Flux (Stream-aligned)
> - Socle IAP & Golden Paths (AI GW, MCP GW, SPIRE, OTel) Moteurs & Enclaves (Temporal, Event Mesh, CoCo/GPU)
> - Cellule EvalOps, FinOps & Conformité 2LoD (E-23 / Loi 25)
> - Domaine Crédit / Sinistres (Blueprint 1 — R3/R4, Temporal)
> - Domaine Achats & B2B (Blueprint 2 — A2A, AGNTCY, Mesh)
> - Domaine R&D / Santé Souverain (Blueprint 3 — vLLM TEE, RAG ACL)
> - soutient
> - X-as-a-Service
> - X-as-a-Service
> - X-as-a-Service
> - facilite EvalOps/Audit
> - cadre OASF/SLA
> - valide ÉFVP/TEE

*Fig. 56. – Modèle opérationnel ArchiMate et topologie d’équipes Team Topologies reliant l’IAP aux trois blueprints sectoriels*

| Critère | Blueprint 1 — Transactionnel | Blueprint 2 — Maillage B2B | Blueprint 3 — Souverain `Silo` |
| --- | --- | --- | --- |
| **Cas et palier** | Crédit, sinistres (`L2` –`L3`, `R3` –`R4`) | *Source-to-Pay*, logistique (`L2` –`L3`, `R2` –`R3`) | R&D pharma, santé, défense (`L1` –`L3`, `R3` –`R4`) |
| **Socle clé** | `Temporal HA` + `MCP GW` + `OBO` + `WORM` [339] [341] [343] [344] | `Process Mgr` + `A2A` + `AGNTCY` + `Event Mesh` [348] [349] [351] | `AI GW` + `EPP` /`llm-d` + `CoCo` + `OpenFGA` /`Qdrant` /`RLS` + `microVM` [359] [355] [353] [358] [356] |
| **Latence** `p95` **cible** | `Temporal` `200 ms p99` [347] ; boucle `3–8 s` avant `HITL` | `Event Mesh` `10–100 ms` ; `A2A` B2B `20 s` à min/h [348] | `RAG` `1,5–4 s` (`TTFT` `2×` `llm-d` [354]) ; `microVM` `4–12 s` [360] |
| **Verrou débit** | Actions/s `Temporal` (`TRU`), amorties `CQRS` [347] | Tampons `Solace` /`Kafka` + *backpressure* `TPM` [351] [352] | Bande `HBM` GPU et `WarmPools` (`3×` `llm-d`) [359] [354] |
| `RPO` **/** `RTO` | `3-AZ` `RPO=0` ; Multi-région `RPO<1m`, `RTO<20m` [339] [346] | `Solace` sync/async ; `Cluster Linking` *offsets* exacts [350] [352] | Données `Warm Standby` (`RPO` qq s–5 min) ; GPU `Pilot Light` (`RTO` 15–60 min) [361] [362] |
| **Profil** `FinOps` | `OPEX` (`PTU` + `PAYG`, `HITL`, `WORM`) borné `80/20` [344] [363] | `OPEX` variable B2B ; contrôle `FOCUS` + `CancelTask` [348] [363] | `CAPEX` GPU, RAM `WarmPool`, licences `NVAIE` via `IAP` [355] [363] |
| **Équipes** | `Platform` + `Stream-aligned` + `Enabling` [364] | `Platform` + `Stream-aligned` multi-domaines + `Enabling` [364] | `Platform` + `Complicated Subsystem` (GPU/`CoCo`) + `Stream-aligned` [364] |

*Tableau 14.4 — Matrice comparative non fonctionnelle des trois blueprints : performance, résilience, économie et organisation.*

> **Arbitrage EA / SA** — Aucune grande entreprise ne doit enfermer son portefeuille dans un unique patron : l’`EA` oriente chaque chaîne de valeur vers le Blueprint 1 (autorité `SoR` `R3` –`R4`), le Blueprint 2 (échanges opaques inter-domaines et B2B) ou le Blueprint 3 (souveraineté *Zero Egress*), en arrimant le modèle économique (`PTU` contre `CAPEX` GPU) au coût par résultat réussi [363] [364]. Le `SA` maintient un socle `IAP` unique (`SPIRE`, `OpenTelemetry GenAI`, `MCP` /`A2A`, `OPA`) en `X-as-a-Service` pour composer au besoin ces briques — déclencher un workflow `Temporal` depuis un jalon `A2A` ou router une sous-tâche sensible vers l’enclave locale — sans dupliquer la gouvernance [342] [364] [345].

## Synthèse architecturale et transition vers le chapitre 15

Ce chapitre a assemblé les standards et patrons des chapitres 01 à 13 en trois blueprints instanciables : le **Blueprint 1** sécurise les processus transactionnels réglementés via `Temporal` (`Worker Versioning` `Pinned`, `3-AZ` et multi-régions), `MCP Gateway` sous `OAuth 2.0 OBO` (`RFC 8693` /`8707`), `ACL` /`CQRS` et archivage `WORM` (`S3 Object Lock Compliance`) [339] [340] [341] [343] [344] ; le **Blueprint 2** fédère les domaines et partenaires B2B via un *Process Manager* parlant `A2A v1.0` et `AGNTCY` (`OASF`, `ADS`, `SLIM` /`MLS`) couplé à un `Event Mesh` (`Solace` ou `Kafka Cluster Linking`) [348] [349] [350] [352] ; le **Blueprint 3** assure la souveraineté stricte par `AI Gateway` et `EPP` sur `llm-d` /`vLLM` ou `NIM` sous `Confidential Containers` (`CoCo`), filtrage `RAG` triple (`OpenFGA`, `Qdrant`, `PostgreSQL RLS`) et `microVM` `Firecracker` /`Kata` sous `agent-sandbox` [359] [360] [355] [353] [354] [357] [358] [356]. Le **chapitre 15** conclut l’ouvrage sur la coexistence avec le patrimoine `BPM` /`iPaaS` /`RPA`, les anti-patrons critiques et la feuille de route d’adoption.

# Chapitre 15 — Coexistence patrimoniale (BPM/iPaaS/RPA), anti-patrons critiques et feuille de route d’adoption

Les quatorze chapitres précédents ont défini l’architecture cible de l’entreprise agentique : séparation des `Systems of Record (SoR)` et des `Systems of Agency`, règle hybride `80/20`, contrats ouverts `MCP` et `A2A`, souveraineté mémorielle, exécution durable, sécurité `Zero-Trust`, observabilité `OpenTelemetry` /`EvalOps`, gouvernance `FinOps`, plateforme interne (`IAP`) et blueprints sectoriels. En pratique, aucune organisation ne déploie cette architecture sur table rase : les directions technologiques exploitent déjà des moteurs `BPMN`, des bus `iPaaS` et de gestion d’API, ainsi qu’un parc d’automates `RPA` (*Robotic Process Automation*) [365] [366] [367]. Or les constats empiriques rappellent la fragilité de la transition : après entretiens avec 65 praticiens, la `RAND Corporation` établit que plus de 80 % des projets d’IA échouent — le double des projets informatiques classiques — par incompréhension du problème métier et déficit d’infrastructure [368], tandis qu’Acharya souligne que seuls 21 % des dirigeants disposent d’une gouvernance mature et que 40 % des projets agentiques risquent l’échec d’ici 2027 faute de contrôles et de maîtrise des coûts [369].

Ce chapitre clôt l’ouvrage sur la rationalisation du patrimoine, les leçons d’échec et la trajectoire d’adoption, sans introduire de nouveau protocole. En **lecture** `EA`, il arbitre le devenir des outils `BPMN`, `iPaaS` et `RPA`, combat l’étalement agentique et séquence la montée en maturité sur 360 jours. En **lecture** `SA`, il formalise l’encapsulation des automates hérités, la migration incrémentale *Strangler Fig* en quatre stades et les remédiations aux douze anti-patrons majeurs.

## 15.1 Rationalisation et coexistence avec l’automatisation existante (BPMN, iPaaS/API Management, RPA)

Remplacer brutalement les orchestrateurs et intégrations existants par des boucles cognitives compromet la conformité, alourdit le coût unitaire et fragilise les flux prévisibles [370] [371] [372]. La rationalisation répartit plutôt les responsabilités entre logique déterministe et nœuds cognitifs dans le prolongement de la règle `80/20` (chapitre 3) et de l’architecture en quatre plans (chapitre 2).

### 15.1.1 Complémentarité structurelle avec les moteurs BPMN 2.0

Les moteurs `BPMN 2.0` exécutables (`Camunda 8` sur `Zeebe`, `UiPath Maestro`) gouvernent déjà des chaînes critiques soumises à des exigences strictes de conformité et de traçabilité [365] [366]. Plutôt que de les écarter, l’architecture hybride maintient le diagramme `BPMN` comme colonne vertébrale déterministe et ouvre des poches d’autonomie bornées via le **sous-processus ad hoc** (`~`) [365] [373]. Dépourvu d’événements de début ou de fin internes, ce conteneur regroupe tâches de service, connecteurs et tâches humaines *Human-in-the-Loop* qu’un agent peut activer dans un ordre dynamique ou répétitif jusqu’à une `completionCondition` explicite [365]. Couplé au connecteur `AI Agent Sub-process`, le modèle raisonne à l’intérieur de ce périmètre puis rend la main au flux structuré, tandis qu’un simple `AI Agent Task` suffit aux appels unitaires sans boucle [373].

En **lecture** `EA`, les processus audités déjà modélisés en `BPMN` conservent leur moteur comme autorité d’état et de `SLA` [365] [366]. En **lecture** `SA`, les nouveaux services agentiques orientés code exploitent l’exécution durable de l’`IAP` (chapitres 9 et 13), et les flux `BPMN` patrimoniaux évoluent progressivement grâce à la migration d’instances en vol [374].

### 15.1.2 Extension des plateformes iPaaS et API Management

Les plateformes `iPaaS` et de gestion d’API (`MuleSoft`, `Kong`) assurent déjà la connectivité inter-applicative et le contrôle du trafic API [367] [375]. Leur rôle s’étend vers un plan de contrôle sémantique sans reconstruire les connecteurs existants. D’un côté, des ponts tels que le `MCP Bridge` de `MuleSoft Agent Fabric` exposent des API gouvernées en outils `MCP` réutilisables, sous réserve d’appliquer l’ergonomie d’intention définie au chapitre 4 [367]. De l’autre, des passerelles comme `Kong AI Gateway` étendent l’authentification, la limitation de débit, la sécurité des données et l’observabilité aux échanges `LLM`, `MCP` et `A2A` [375].

En **lecture** `EA`, des scanners automatisés relient API patrimoniales, serveurs `MCP` et agents dans un registre unique afin d’éviter la prolifération de connecteurs redondants [367]. En **lecture** `SA`, les synchronisations massives, flux *batch* et transformations `ETL` déterministes restent confinés à l’`iPaaS` : aucun agent ne remplace un bus d’intégration structuré [370] [371] [372].

### 15.1.3 Sortie maîtrisée du RPA fragile et coexistence par encapsulation

Le `RPA` classique (`Power Automate desktop flows`, `Robot Framework` sous `Camunda RPA`, `UiPath`) automatise des gestes répétitifs par sélecteurs d’interface graphique, images, coordonnées d’écran ou émulateurs de terminaux là où aucune API n’existe [376] [366] [377]. Sensible aux refontes d’écran, ce parc engendre une maintenance élevée et alimente la fragmentation s’il échappe à l’orchestration centrale [376] [369]. La rationalisation proscrit autant le simple réétiquetage marketing de bots en « agents » que le pilotage non confiné d’interfaces critiques par des agents généralistes [378] [369]. Elle applique trois voies :

1. **Décommissionnement par API ou** `ACL` : retirer chaque robot `RPA` dès qu’une API ou une isolation par couche anti-corruption (`ACL`) et capture de changements (`CDC`, chapitre 4) devient disponible [367] [379].
2. **Encapsulation sous orchestration** : confiner les automates résiduels (mainframes ou progiciels fermés) comme travailleurs déterministes appelés par le moteur `BPMN` ou derrière l’`ACL`, l’orchestrateur conservant seul l’état et les reprises [376] [366] [379].
3. **Cantonnement des manipulations dynamiques d’interface** : limiter l’exploration cognitive d’écran aux exceptions non structurées à faible volume, dans un bac à sable durci sous privilèges minimaux et validation humaine avant toute action irréversible [380] [381] [382].

> **[Figure]**
> - Orchestration hybride
> - [system]
> - Médiation iPaaS &
> - Passerelles
> - [system]
> - Exécution patrimoniale &
> - SoR [system]
> - «container» Moteur BPMN 2.0
> - [Camunda / Maestro]
> - Flux réglementaires, SLA et tâches humaines
> - «container» Sous-processus ad hoc (~)
> - [AI Agent Connector]
> - Boucle cognitive bornée
> - sur outils déclarés
> - «container» iPaaS & API Management
> - [MuleSoft / Kong]
> - Flux ETL stables, Agent Registry et MCP Bridge
> - «container» AI & MCP Gateway
> - [Plan de contrôle]
> - Quotas jetons, OPA Intent Gate,
> - télémétrie OTel et routage
> - «container» Couche Anti-Corruption
> - [ACL + CDC/CQRS]
> - Traduction sémantique, idempotence et projection
> - «container» Worker RPA confiné
> - [Desktop / Robot]
> - Écrans sans API uniquement,
> - encapsulé en tâche bornée
> - «container» Systems of Record
> - [ERP / Mainframe]
> - Autorité comptable
> - et transactionnelle
> - «person»
> - Opérateur / Client
> - SoE et portes HITL
> - Initie dossier / HITL
> - Délègue exception
> - Appels modèles & MCP Appels haute volumétrie
> - Pont MCP Bridge
> - Contrats typés
> - Sous-tâche sans API
> - CQRS / écriture idempotente Action UI bornée

*Fig. 57. – Topologie de coexistence patrimoniale unissant BPMN hybride, iPaaS, AI/MCP Gateway et RPA confiné*

| Strate existante | Rôle conservé | Limite principale | Coexistence cible | Critère de retrait / bascule |
| --- | --- | --- | --- | --- |
| `BPMN 2.0` (`Camunda`, `Maestro`) | Macro-flux audités, `SLA`, tâches humaines | Rigidité face aux entrées ambiguës | Sous-processus ad hoc (`~`) borné | Maintenu si réglementaire; neuf sur `IAP` durable |
| `iPaaS` **/** `API Mgmt` (`MuleSoft`, `Kong`) | Flux `ETL`/API haute volumétrie, lignage | Insuffisant seul sur jetons et `MCP` /`A2A` | `AI & MCP Gateway` + `MCP Bridge` curé | Flux déterministes maintenus hors boucle LLM |
| `RPA` (`Power Automate`, `Robot`) | Gestes répétitifs sans API disponible | Fragilité UI et silos locaux | Worker isolé sous `BPMN` ou `ACL` | Retiré dès ouverture d’API ou flux `CDC` |
| `Systems of Agency` | Triage ambigu, synthèse, exceptions | Coût variable et non-déterminisme | Nœuds cognitifs (`20 %`) sous `Intent Gates` | Repli instantané vers flux `L0` sur anomalie |

*Tableau 15.1 — Matrice de rationalisation et de coexistence : BPMN 2.0, iPaaS/API Management, RPA et Systems of Agency.*

> **Arbitrage EA / SA** — Interdire toute réécriture opportuniste des workflows `BPMN` réglementaires et des flux `iPaaS` stables en boucles d’agents libres, ainsi que la requalification cosmétique de scripts `RPA` en capacités agentiques [365] [369] [372]. L’`EA` gèle les nouveaux développements `RPA` hors systèmes strictement dépourvus d’API et rattache API, connecteurs `MCP` et bots au registre central [367] [381]. Le `SA` expose les intégrations par façades curées sur la passerelle, confine l’autonomie `BPMN` dans des sous-processus ad hoc à condition d’achèvement explicite et isole chaque automate `RPA` résiduel derrière une `ACL` [365] [376] [379].

## 15.2 Migration incrémentale (Strangler Fig agentique) : ombre, recommandation, action bornée, autonomie sous contrat

Remplacer d’un seul tenant un processus patrimonial par un système agentique reproduit l’échec des réécritures *Big Bang* : les comportements implicites accumulés échappent aux spécifications et les besoins d’affaires évoluent durant la refonte [383] [368]. Formalisé par Martin Fowler [383] et outillé par `AWS` et `Azure` [384] [385], le patron **Strangler Fig** substitue une façade d’interception devant le système hôte pour migrer chaque capacité incrémentalement sous coexistence réversible jusqu’au retrait du patrimoine [383] [384] [385].

### 15.2.1 Du Strangler Fig applicatif à l’étranglement progressif des flux cognitifs

La transposition agentique conserve les trois phases d’`AWS Prescriptive Guidance` (**Transformer**, **Coexister**, **Éliminer**) [384] en ajoutant deux garanties propres aux systèmes probabilistes. Premièrement, la façade de routage logée dans l’`AI` /`API Gateway` s’appuie sur une **couche anti-corruption (**`ACL`**)** empêchant les schémas hérités du `SoR` de polluer le contexte et les contrats des agents; elle doit intégrer reprises bornées et coupe-circuits pour ne pas devenir un goulot ou point de défaillance unique [385] [379].

Deuxièmement, parce qu’un agent techniquement disponible peut néanmoins poser des actes erronés [382], la bascule franchit des portes d’évaluation continue (`EvalOps`) [386] et suit une **graduation stricte d’autorité** alignée sur le déploiement par étapes (*staged deployment*) d’`OpenAI` [380] et le principe d’autonomie contrôlée d’`AWS` [378]. Pour les dossiers longs déjà ouverts, la migration d’instances en vol (comme dans `Camunda 8` [374]) préserve l’état actif sans interruption.

### 15.2.2 Les quatre stades de montée en autonomie sous contrat

L’étranglement suit quatre stades cloisonnés, chacun muni d’un repli immédiat vers la branche patrimoniale `L0` [384] [387] [380] :

1. **Stade 1 — Mode ombre (*Shadow Mode*)** : inspirée du patron *Shadow Tests* [387], la façade duplique de façon asynchrone les requêtes réelles vers la chaîne agentique candidate sans modifier la réponse retournée à l’usager ni écrire dans le `SoR`. En contexte agentique, le `SA` maintient les outils mutateurs en simulation ou lecture seule et compare hors chemin critique exactitude de trajectoire, latence et coût unitaire à la référence patrimoniale [387] [386] [382].
2. **Stade 2 — Mode recommandation (*Assistive*)** : après validation en mode ombre, l’agent produit une proposition structurée avec pièces probantes et différentiel d’action dans le `SoE` ou une tâche utilisateur `BPMN` [373] [380] [372]. L’humain ou le moteur déterministe exécute seul la mutation finale, et les taux d’acceptation mesurent le gain réel face à la ligne de base métier (*business baseline*) [386] [388].
3. **Stade 3 — Action bornée (*Bounded Autonomy*)** : en routage canari ciblé, l’agent exécute seul les opérations réversibles ou compensables sous plafonds programmatiques et portes `Intent Gate` [380] [378]. Toute action irréversible, hors domaine ou sous seuil de confiance suspend l’exécution pour approbation humaine préalable [380] [382].
4. **Stade 4 — Autonomie sous contrat (*Contracted Autonomy*)** : le flux cible absorbe le segment sous contrat `SLO`, détection continue de dérive et arrêt d’urgence (*shutdown*) basculant instantanément vers `L0` [380] [382]. Le composant patrimonial n’est retiré qu’après stabilisation prolongée et vérification des règles de conservation [383] [385] [382].

> **[Figure]**
> - Façade d'interception (Passerelle)
> - Stades progressifs d'autonomie sous
> - contrat
> - Routeur de façade (AI & API Gateway) Flux patrimonial L0 (BPMN / API / RPA)
> - Stade 1 : Mode ombre Trafic dupliqué hors chemin critique Zéro écriture SoR / outils simulés
> - Stade 2 : Recommandation Proposition structurée + preuves Validation & écriture humain / BPMN
> - Stade 3 : Action bornée Écritures réversibles sous seuils OPA Porte HITL sur pivots irréversibles
> - Stade 4 : Autonomie sous contrat Exécution durable sous SLO et budget Coupe-circuit + retrait patrimonial
> - Trafic de référence
> - (100 % initial)
> - Copie miroir (Shadow traffic)
> - Écart EvalOps <= seuil
> - et coût validé
> - Taux d'acceptation stable
> - et contrôle ACL
> - Dégradation qualité
> - ou dérive
> - Zéro incident R3/R4
> - et conformité SLO
> - Repli coupe-circuit (FORCED_OPEN -> L0)
> - Retrait ou échec
> - ROI baseline

*Fig. 58. – Cycle de migration Strangler Fig agentique en quatre stades sous façade et mécanismes de repli*

| Stade *Strangler Fig* | Autorité sur `SoR` | Routage façade | Critère d’avancement | Protection et repli |
| --- | --- | --- | --- | --- |
| **1. Mode ombre** | Nulle; lecture isolée ou simulée | Miroir asynchrone; réponse patrimoniale | Exactitude `EvalOps`, latence et coût validés | Zéro impact client; coupure du miroir |
| **2. Recommandation** | Indirecte; validation humaine ou `BPMN` | Brouillon agentique; écriture héritée | Taux d’acceptation et gain vs *baseline* | Désactivation suggestion; retour formulaire |
| **3. Action bornée** | Écritures réversibles sous seuils; pivots `HITL` | Canari par segment à risque maîtrisé | Zéro violation `OPA`, `pass^k` stable | Rejet `Intent Gate`, compensation, canari `0 %` |
| **4. Autonomie sous contrat** | Exécution complète sous `SLO` et `R1–R4` | `100 %` du segment; migration en vol | Respect soutenu `SLO` /`FinOps`, audit `3LoD` | Arrêt d’urgence vers `L0` avant retrait |

*Tableau 15.2 — Critères de transition et garde-fous des quatre stades du Strangler Fig agentique.*

> **Arbitrage EA / SA** — Interdire le passage direct d’un pilote à l’autonomie en production ainsi que le décommissionnement du flux de repli avant validation du stade 4 [383] [380] [382]. L’`EA` subordonne chaque promotion à l’accord de l’`Agent Owner` sur le gain prouvé face à la *baseline* [388] [382]. Le `SA` place la façade dans la passerelle couplée à une `ACL`, simule les écritures au stade 1, automatise le blocage `EvalOps` avant canari et maintient un basculement immédiat vers `L0` [384] [379] [387] [386].

## 15.3 Catalogue diagnostique des 12 anti-patrons majeurs : symptômes, causes racines et remédiations

Les analyses empiriques convergent sur les moteurs d’échec en production. La `RAND Corporation` lie les plus de 80 % d’échecs à une définition floue du problème métier, des données insuffisantes, la poursuite technologique et un déficit d’infrastructure [368]. Sur les graphes multi-agents, la taxonomie `MAST` (plus de 1 600 traces issues de sept cadriciels) établit que la majorité des 14 modes de panne relève de la conception système et du désalignement inter-agents [389]. La taxonomie du `Microsoft AI Red Team` [390], l’`OWASP Top 10 for Agentic AI` (`ASI01` –`ASI10`) [391] et l’étude sur l’étalement agentique (`AAGMM`) [369] complètent ce diagnostic en douze anti-patrons répartis en quatre familles.

### 15.3.1 Famille A — Stratégie, portefeuille et économie

`AP-01` **Syndrome du marteau agentique (*Technology-First*)**. *Symptômes* : des flux prévisibles à règles fixes sont réécrits avec des boucles `LLM` plus lentes et onéreuses, ou des scripts classiques sont rebaptisés agents [370] [369] [372]. *Cause racine* : poursuite de la nouveauté (*shiny object syndrome* [368]) sans tri entre automatisation déterministe et raisonnement [372]. *Remédiation* : appliquer l’arbre `80/20` (code déterministe ou `RAG` sans boucle sur les cas structurés) et exiger en revue `ARB` la justification écrite de toute boucle cognitive [370] [371] [372].

`AP-02` **Étalement et agents fantômes (*Agent Sprawl*)**. *Symptômes* : prolifération sur plateformes *low-code* d’agents redondants, d’agents orphelins sans responsable et de délégations non inventoriées [369] [381]. *Cause racine* : ouverture de la création d’agents sans registre central ni politique de retrait [367] [369]. *Remédiation* : raccorder des scanners de découverte au registre central (chapitre 12), imposer un `Agent Owner` nominatif et une identité attestée, et suspendre les agents orphelins [367] [369] [381] [382].

`AP-03` **Cécité économique (*Demo-Driven ROI*)**. *Symptômes* : des pilotes applaudis en démonstration échouent à l’échelle faute de rentabilité démontrée ou sous l’explosion des frais d’inférence [369] [388]. *Cause racine* : absence de *business baseline*, confusion entre temps gagné et valeur financière nette, et suivi limité au coût du jeton [369] [388]. *Remédiation* : chiffrer la référence avant projet, intégrer tous les postes (`inférence`, `intégration`, `gouvernance`, `HITL`) et instaurer le *Showback* avant le *Chargeback* (chapitre 12) [388].

### 15.3.2 Famille B — Intégration, outils et patrimoine

`AP-04` **Exposition brute et *Tool Sprawl***. *Symptômes* : l’agent reçoit un trop grand nombre d’outils issus directement d’API existantes, confond des signatures voisines et gaspille sa fenêtre d’attention en schémas [367] [370]. *Cause racine* : exposition mécanique d’interfaces conçues pour des humains sans conception d’*Agent-Computer Interface* (`ACI`, chapitre 4) [370]. *Remédiation* : agréger les opérations en façades d’intention via la passerelle (`MCP Bridge` curé), filtrer les outils par rôle et optimiser descriptions et retours d’erreur [367] [370].

`AP-05` **Surcouche cognitive sur** `RPA` **fragile**. *Symptômes* : un agent pilote des scripts de clics locaux sur des écrans instables; les changements d’interface déclenchent des boucles de réessais et des saisies incomplètes [376] [366] [377]. *Cause racine* : empilement d’un raisonnement probabiliste sur une dette d’intégration UI sans contrat transactionnel [376] [379]. *Remédiation* : remplacer le `RPA` par des API ou projections `CDC`; sinon, confiner le robot en tâche déterministe sous moteur `BPMN` hors de l’agent [376] [366] [379].

`AP-06` **Accès direct non amorti aux** `Systems of Record`. *Symptômes* : les appels exploratoires saturent `ERP` ou `mainframes`, alourdissent les licences et causent des doubles écritures [379] [380]. *Cause racine* : couplage direct entre logique cognitive et contraintes transactionnelles patrimoniales [379]. *Remédiation* : interposer une couche anti-corruption (`ACL`, chapitre 4), déporter les lectures sur projections découplées et imposer idempotence et réversibilité [379] [380].

### 15.3.3 Famille C — Orchestration, contexte et exécution

`AP-07` **Essaim multi-agents prématuré (*Parallel Writers*)**. *Symptômes* : des sous-agents parallèles produisent des résultats conflictuels (`MAST` [389]) et s’avèrent moins fiables qu’un agent unique [370] [392] [371]. *Cause racine* : fragmentation des traces décisionnelles et décisions implicites concurrentes sur les écritures, identifiées par `Cognition` [392]. *Remédiation* : privilégier un agent unique outillé ou un workflow structuré [370] [371] [372], sérialiser toute écriture sur une trace continue et réserver le parallélisme aux lectures isolées (chapitre 7) [392] [372].

`AP-08` **Boucle volatile non bornée**. *Symptômes* : une boucle en échec répété consume les quotas, propage des pannes en cascade (`ASI08` [391]) ou perd tout état lors d’un redéploiement [374] [371]. *Cause racine* : exécution d’un processus long en mémoire éphémère sans plafond programmatique [380] [370].

*Remédiation* : loger les boucles longues sur moteur durable ou `BPMN` avec migration d’instances [374], borner les itérations et déployer des coupe-circuits (chapitres 9 et 11) [380] [378].

`AP-09` **Dilution du contexte et abstraction opaque**. *Symptômes* : l’exactitude s’effondre au fil des tours et les équipes ne diagnostiquent plus les échecs cachés sous des cadriciels opaques [370] [392]. *Cause racine* : accumulation brute de traces sans compaction et sur-abstraction logicielle [370] [392]. *Remédiation* : utiliser un harnais sobre au-dessus des API de modèles [370], compacter les décisions clés (*Context Engineering*) [392] et externaliser les charges volumineuses par référence (chapitre 7).

### 15.3.4 Famille D — Sécurité, confiance et exploitation

`AP-10` **Politique métier dans le prompt (*Prompt-as-Policy*)**. *Symptômes* : une injection indirecte détourne l’objectif (`ASI01`) et exploite outils (`ASI02`) ou identités sur-privilégiées (`ASI03`) [391] [381]. *Cause racine* : confusion entre consigne probabiliste en texte et frontière de sécurité déterministe [380] [378]. *Remédiation* : déplacer les invariants dans une `Intent Gate` (`Policy-as-Code`, chapitre 10), bannir les secrets statiques au profit d’identités `NHI` éphémères et appliquer le moindre privilège [380] [391] [381].

`AP-11` **Mémoire partagée non assainie (*Memory Poisoning*)**. *Symptômes* : une entrée corrompue en mémoire persistante fausse les sessions futures ou sert de pivot d’exfiltration (`ASI06`, `ASI08`) [390] [391]. *Cause racine* : absence de validation de provenance à l’écriture et de propagation des `ACL` à la lecture [390] [391]. *Remédiation* : cloisonner les locataires, filtrer par `ACL` à chaque requête (chapitre 6), contrôler la provenance des écritures et versionner les instructions par `GitOps` (chapitre 13) [390] [391] [378].

`AP-12` **Production sans** `EvalOps` **ni coupe-circuit**. *Symptômes* : les mises à jour de modèles provoquent des régressions silencieuses, la revue `HITL` devient une validation mécanique (`ASI09`) et aucun arrêt rapide n’endigue un agent déviant (`ASI10`) [380] [391] [386] [382]. *Cause racine* : lancement au jugé sans évaluation automatisée ni procédure d’arrêt [386] [382]. *Remédiation* : imposer des seuils `EvalOps` bloquants sur chaque évolution [386] [382], afficher l’impact `SoR` exact aux valideurs et tester le repli `L0` [380] [382].

| Code et anti-patron | Famille | Symptôme clé | Cause racine | Remédiation `EA` /`SA` |
| --- | --- | --- | --- | --- |
| `AP-01` Marteau agentique | Stratégie | Coût/latence excessifs sur flux fixe | Effet de mode sans tri `80/20` | Code déterministe ou `RAG` simple |
| `AP-02` Étalement fantôme | Stratégie | Doublons, agents orphelins | Création sans registre central | Scanners + registre + `Agent Owner` |
| `AP-03` Cécité économique | Stratégie | Abandon après pilote coûteux | Zéro *baseline* ni `TCO` complet | Coût par résultat réussi + *Showback* |
| `AP-04` *Tool Sprawl* (`CRUD`) | Intégration | Mauvais choix d’outils, saturation | API brutes sans ergonomie `ACI` | Façades d’intention `MCP Bridge` |
| `AP-05` Surcouche sur `RPA` | Intégration | Boucles d’échec sur sélecteurs UI | Pansement sur dette d’API | Sortie API/`CDC`, sinon tâche `BPMN` |
| `AP-06` Accès direct `SoR` | Intégration | Surcharge `ERP`, écritures doubles | Zéro tampon sémantique | `ACL` + `CQRS` + idempotence |
| `AP-07` Essaim prématuré | Orchestration | Conflits d’écriture, dérive `MAST` | Traces fragmentées, parallélisme | Agent unique / workflow; sérialiser |
| `AP-08` Boucle volatile | Orchestration | Perte d’état, pannes en cascade | Mémoire volatile, zéro plafond | Moteur durable / `BPMN` + coupe-circuit |
| `AP-09` Dilution de contexte | Orchestration | Oubli de consignes, opacité | Zéro compaction, cadriciel lourd | Harnais sobre + compaction structurée |
| `AP-10` *Prompt-as-Policy* | Sécurité | Détournement `ASI01`, abus `ASI03` | Prompt utilisé comme pare-feu | `Intent Gate` + `NHI` moindre privilège |
| `AP-11` Mémoire empoisonnée | Sécurité | Corruption persistante `ASI06` | Écritures non vérifiées, zéro `ACL` | Cloisonnement, `ACL` requête, provenance |
| `AP-12` *Vibe-Testing* | Exploitation | Régressions, `HITL` mécanique | Absence d’`EvalOps` et d’arrêt | `EvalOps` bloquant en CI + repli `L0` |

*Tableau 15.3 — Catalogue synthétique de diagnostic des 12 anti-patrons critiques (symptômes, causes racines et remédiations).*

> **Arbitrage EA / SA** — Ériger les douze anti-patrons `AP-01` à `AP-12` en liste de contrôle bloquante de l’`ARB` avant toute promotion au stade 3 [368] [369] [382]. L’`EA` refuse l’homologation sans *baseline* `ROI`, sans `Agent Owner` ou hors registre (`AP-01` à `AP-03`) [369] [388] [381]. Le `SA` rejette toute architecture exposant des routes `CRUD` brutes, contournant l’`ACL` des `SoR`, parallélisant des écrivains ou confiant une règle impérative à un prompt (`AP-04` à `AP-12`) [379] [370] [392] [391].

## 15.4 Modèle de maturité en 5 paliers et feuille de route séquencée (90 / 180 / 360 jours)

Industrialiser ces leçons à l’échelle exige une progression disciplinée plutôt qu’une somme d’initiatives isolées [393] [369] [372]. Le cadre retenu unifie les cinq paliers d’`AAGMM` sur douze domaines arrimés à `NIST AI RMF` et `ISO/IEC 42001` [369], la boucle continue *Govern–Map–Measure–Manage* du `NIST AI RMF Playbook` [394], les stades d’`AWS` (*Envision*, *Experiment*, *Launch*, *Scale*) [393] et le modèle opérationnel de `Microsoft CAF` [372] [381] [382].

### 15.4.1 Modèle de maturité agentique en 5 paliers

Les 750 simulations d’Acharya établissent l’impact mesurable de cette progression : entre le palier initial et les paliers gouvernés (`M4–M5`), l’indice d’étalement chute de **94,3 %**, les incidents de risque reculent de **96,4 %** et l’achèvement effectif progresse de **32,6 %** [369]. Les cinq paliers (`M1` à `M5`) couvrent cinq axes conjoints `EA` /`SA` détaillés au Tableau 15.4 :

- `M1` **— Ad hoc** : prototypes locaux sans registre, sans `Agent Owner`, clés statiques, bots `RPA` isolés et zéro référence économique [393] [369] [388].
- `M2` **— Réactif (*Experiment*)** : création d’un pôle d’excellence (`AI CoE`), inventaire initial (*Map* [394]), première passerelle `AI Gateway` et pilotes *Strangler Fig* en ombre ou recommandation avec *baseline* chiffrée [387] [393] [388].
- `M3` **— Défini (*Launch*)** : registre obligatoire avec paliers `R1–R4`, plateforme `IAP` (*Golden Paths*, `MCP Gateway` sur `ACL`, `NHI` /`OBO`, `Intent Gates`), `EvalOps` en intégration continue, `Showback` `FinOps` et actions bornées (`Stade 3`) ou `BPMN` ad hoc [365] [380] [393] [369] [382].
- `M4` **— Géré (*Scale*)** : exécution durable généralisée, détection automatisée d’étalement et de dérive, retrait planifié du `RPA` fragile, ouverture `A2A` inter-domaines et `Chargeback` `FOCUS` sous revue `3LoD` [376] [374] [390] [369] [388].
- `M5` **— Optimisé (*Governance-as-Code*)** : conformité vérifiée par le code (*Policy-as-Code*), maillage fédéré `OASF` /`Event Mesh`, autonomie sous contrat (`Stade 4`), exercices de bascule multi-fournisseurs et repli `L0` pilotés par `ROI` ajusté du risque [367] [380] [378] [369].

| Palier | Gouvernance (`EA`) | Architecture (`SA`) | Sécurité & `NHI` | `EvalOps` & SRE | `FinOps` / `ROI` |
| --- | --- | --- | --- | --- | --- |
| `M1` **Ad hoc** | Zéro registre; *Shadow AI* et orphelins | Appels directs; `RPA` isolés | Clés statiques; droits hérités | Tests manuels; zéro trace | Factures opaques; zéro *baseline* |
| `M2` **Réactif** | `AI CoE`, charte, inventaire initial | `AI Gateway`, 1re façade + `ACL` | Comptes isolés sur pilotes | Mode ombre et recommandation | *Baseline* et plafonds pilotes |
| `M3` **Défini** | Registre obligatoire, `Agent Owner`, `R1–R4` | `IAP`, `MCP Gateway`, `BPMN` ad hoc | `NHI` éphémères, `OBO`, `Intent Gates` | `EvalOps` CI/CD, `OTel`, *kill switch* | Coût par résultat + `Showback` |
| `M4` **Géré** | Détection auto d’étalement; audit `3LoD` | Durable généralisé; `A2A`; sortie `RPA` | `microVM`, `ACL` mémoire, `AISPM` | `SLO`, détection dérive, rejeu | `Chargeback`, routage `SLM` |
| `M5` **Optimisé** | *Governance-as-Code* continu (`NIST` /`ISO`) | Maillage `OASF` /`Event Mesh`; `Stade 4` | Révocation temps réel fédérée | Exercices périodiques repli `L0` | `ROI` ajusté du risque; portabilité |

*Tableau 15.4 — Modèle de maturité de l’entreprise agentique en cinq paliers (*`M1` *à* `M5`*).*

### 15.4.2 Feuille de route séquencée : horizons 90, 180 et 360 jours

Les trois horizons prescriptifs de **90, 180 et 360 jours** cadencent le passage de `M1` /`M2` vers `M3` puis `M4–M5` devant trois jalons de revue de l’`ARB` :

**Horizon 1 — Jours 0 à 90 : Assainissement, passerelle unique et pilotes en ombre (**`M1 → M2`**)**. Côté `EA`, installer le parrainage exécutif et le pôle `AI CoE` [393] [388], inventorier le *Shadow AI* et le parc `RPA` [369] [381], promulguer le tri `80/20` et les paliers `R1–R4`, et retenir deux à trois cas réversibles dotés d’un `Agent Owner` et d’une *baseline* chiffrée [372] [388]. Côté `SA`, étendre la zone d’atterrissage existante avec l’`AI Gateway` unifiée, poser la première façade `MCP` derrière une `ACL` [375] [379] [381] et lancer les pilotes en **Stade 1 (Ombre)** puis **Stade 2 (Recommandation)** avec un premier jeu `EvalOps` [387] [386]. *Jalon J90 (*`ARB 1`*)* : aucune nouvelle clé modèle hors passerelle et fidélité validée en mode ombre.

**Horizon 2 — Jours 90 à 180 : Plateforme** `IAP`**, identités** `NHI` **et action bornée (**`M2 → M3`**)**. Côté `EA`, rendre le registre central obligatoire, ouvrir le *Showback* `FinOps` par dossier réussi [369] [388] [381] et lancer le retrait des robots `RPA` sur systèmes désormais dotés d’API [376] [367]. Côté `SA`, livrer les *Golden Paths* de l’`IAP` (harnais `80/20`, `GitOps` conjoint, `OpenTelemetry`), remplacer les secrets statiques par des identités `NHI` avec `OBO` et `Intent Gates` [391] [378] [381], rendre `EvalOps` bloquant en intégration continue et promouvoir les cas `R2–R3` au **Stade 3 (Action bornée)** sur moteur durable ou sous-processus ad hoc `BPMN` [365] [374] [380] [386]. *Jalon J180 (*`ARB 2`*)* : 100 % de la production enregistrée sous `NHI` /`Agent Owner` et test réussi du repli `L0`.

**Horizon 3 — Jours 180 à 360 : Fédération inter-domaines, autonomie sous contrat et optimisation (**`M3 → M4/M5`**)**. Côté `EA`, passer au *Chargeback* comptable, systématiser les audits `3LoD` alignés sur `NIST AI RMF` et `ISO/IEC 42001` ainsi que sur les cadres juridiques du chapitre 12 [369] [394], piloter par le `ROI` ajusté du risque et tester la bascule multi-fournisseurs [378] [388]. Côté `SA`, ouvrir la délégation `A2A` signée entre domaines mûrs [367] [375], automatiser la détection d’étalement et de dérive [367] [369] [382], optimiser le routage `SLM` /`LLM` [371] [378] et promouvoir les flux éprouvés au **Stade 4 (Autonomie sous contrat)** avant de décommissionner les briques héritées [383] [380] [382]. *Jalon J360 (*`ARB 3`*)* : premier lot patrimonial retiré, coût unitaire stabilisé et revue `3LoD` conforme.

> **[Figure]**
> - Horizon 1 : J0-J90 (M1 -> M2)
> - Horizon 2 : J90-J180 (M2 -> M3)
> - Horizon 3 : J180-J360 (M3 -> M4/M5)
> - EA : Inventaire Shadow AI, Agent Owners, R1-R4 & Baseline
> - SA : AI/MCP Gateway, 1re ACL,
> - pilote Strangler Ombre / Reco
> - Jalon J90 (ARB 1)
> - Périmètre assaini
> - EA : Registre central, Showback,
> - sortie des bots RPA fragiles
> - SA : Golden Paths IAP, NHI/OBO,
> - EvalOps CI, Durable / BPMN
> - Jalon J180 (ARB 2)
> - Socle IAP en prod
> - EA : Chargeback, ROI ajusté,
> - réversibilité & audit 3LoD
> - SA : Autonomie sous SLO, fédération A2A/OASF, anti-sprawl
> - Jalon J360 (ARB 3) Portefeuille M4/M5 gouverné
> - valide
> - valide
> - ouvre H2
> - valide
> - valide
> - ouvre H3
> - atteint
> - atteint

*Fig. 59. – Trajectoire d’urbanisation ArchiMate et feuille de route séquencée sur 90, 180 et 360 jours*

> **Arbitrage EA / SA** — Interdire l’ouverture de la fédération `A2A` et du stade 4 d’autonomie avant la consolidation du socle `J90–J180` (registre central, `AI/MCP Gateway`, `NHI`, `EvalOps` et exécution durable) [393] [369] [381] [382]. L’`EA` conditionne les enveloppes trimestrielles (`ARB 1` à `ARB 3`) à la baisse de l’étalement et au retrait de dette `RPA`, tandis que le `SA` fournit des *Golden Paths* rendant la voie conforme plus rapide à emprunter que le contournement *Shadow AI* [367] [393] [369].

## Synthèse et clôture de l’ouvrage

Ce chapitre achève l’ouvrage en ancrant l’entreprise agentique dans le système d’information existant. La coexistence préserve l’autorité des moteurs `BPMN 2.0` grâce aux sous-processus ad hoc bornés, étend les couches `iPaaS` et de gestion d’API en plans de contrôle `MCP` /`A2A`, et confine puis résorbe les automates `RPA` fragiles derrière des couches anti-corruption [365] [367] [375] [379]. La migration *Strangler Fig* remplace les refontes risquées par une élévation réversible en quatre stades — ombre, recommandation, action bornée et autonomie sous contrat [383] [387] [380]. Enfin, les douze anti-patrons (`AP-01` à `AP-12`) et la feuille de route à 360 jours tracent un chemin vérifiable du palier `M1` aux paliers `M4–M5` pour déjouer les taux d’échec du secteur [368] [369].

Au terme des cinq parties de cet ouvrage, une règle constante s’impose : l’entreprise agentique fiable repose sur l’ingénierie des frontières plutôt que sur la seule puissance des modèles. En maintenant `80 %` du contrôle transactionnel, des identités et des règles impératives dans des mécanismes déterministes et en confinant les `20 %` de liberté cognitive sous télémétrie, évaluation continue et contrat réversible, les architectes d’entreprise et de solutions transforment l’autonomie agentique en capacité industrielle durable [380] [370] [378] [388]. Les annexes qui suivent fournissent le glossaire bilingue normatif, le gabarit d’*Architecture Decision Record* (`ADR`) avec la liste de contrôle `EA` /`SA`, ainsi que les registres consolidés de bibliographie et d’ancrage.

# Annexe A — Glossaire normatif bilingue (français canadien / anglais)

Ce glossaire consolide la terminologie des quinze chapitres selon les conventions du français canadien (`fr-CA`) et les identifiants techniques normalisés.

| Terme fr-CA | Terme anglais | Définition normative | Ch. |
| --- | --- | --- | --- |
| Acteur cognitif | `«Cognitive Actor»` | Stéréotype `ArchiMate 3.2` (`Application Component`) lié à `«Human-on-the-Loop»` et `«Guardrail Policy»`. | 02 |
| Agent-Computer Interface | *Agent-Computer Interface (ACI)* | Ergonomie d’outils `MCP` par intention, pagination et erreurs correctives contre `Swagger-to-MCP`. | 04, 15 |
| Agentic RAG fédéré | *Federated Agentic RAG* | Recherche hybride (`BM25`, vectoriel, `RRF`, `Text-to-SQL`, `GraphRAG`) sous `CRAG` et `ACL`. | 06, 14 |
| Ancrage d’objectif | *Goal Pinning* | Maintien du mandat aux extrémités du contexte, hors historique mutable, contre le *Goal Drift*. | 07 |
| Annuaire fédéré | `Agent Directory Service (ADS)` | Registre `AGNTCY` indexant des fiches `OASF` signées (`Sigstore`) sur `OCI` /`ORAS` et `Kademlia DHT`. | 05, 14 |
| Architecte d’entreprise (EA) | *Enterprise Architect (EA)* | Responsable d’urbanisation, capacités, portefeuille, conformité et `FinOps`. | 01, 02, 12 |
| Architecte de solutions (SA) | *Solution Architect (SA)* | Concepteur bout-en-bout : protocoles, état, résilience, sécurité et observabilité. | 01, 03, 14 |
| Boîte d’envoi transactionnelle | *Transactional Outbox* | Patron garantissant l’atomicité mutation en base / événement sans `2PC`. | 09 |
| Carte d’agent signée | `Agent Card (JWS)` | Descripteur JSON canonisé (`RFC 8785`) et signé (`JWS`) sous `.well-known/agent-card.json`. | 05, 13, 14 |
| Cascade d’inférence | *Inference Cascade* | Routage gradué vers `SLM` ou modèles prédictifs avant escalade vers un `frontier LLM`. | 03, 12 |
| Chemin pavé | *Golden Path* | Gabarit exécutable (`IAP`, `Backstage`, `Kratix`, `Crossplane`) pré-câblant identité, `OTel` et garde-fous. | 13, 15 |
| Contrat de données | `Data Contract (ODCS)` | Spécification `ODCS v3` gouvernant schéma, qualité, fraîcheur (`SLA`) et confidentialité. | 06 |
| Couche anti-corruption | *Anti-Corruption Layer (ACL)* | Façade sémantique (`CQRS` /`CDC`) isolant les `SoR` patrimoniaux des rafales et schémas hérités. | 04, 14, 15 |
| Coupe-circuit cognitif | *Cognitive Circuit Breaker* | Automate (`max_turns`, hachage, cinq états) repliant un agent déviant vers `L0` ou `HOTL`. | 09, 11, 15 |
| Délégation au nom de | `On-Behalf-Of (OBO)` | Échange `OAuth 2.0 (RFC 8693)` à *downscoping* propageant `(sub, act[])`. | 10, 14 |
| Dette cognitive / d’intention | *Cognitive & Intent Debt* | Cascades de rustines (`CACE`) et perte de traçabilité en prompts. | 01 |
| Économie unitaire | `FinOps` (*Cost per Outcome*) | Coût (`p50` /`p90` /`p99`) par résultat réussi, pertes incluses, rapproché `OTel` /`FOCUS`. | 12 |
| Entreprise agentique | *Agentic Enterprise* | Organisation intégrant des agents gouvernés aux systèmes et aux humains. | 01, 02, 15 |
| Étalement agentique | *Agent Sprawl* | Prolifération d’agents fantômes sans `Agent Owner`, hors registre et sur-privilégiés (`AP-02`). | 12, 15 |
| Évaluation continue | `EvalOps` | Pipeline automatisé sur *golden datasets*, *mock MCP servers* et juges calibrés (`pass^k`, `κ`). | 11, 13, 15 |
| Exécution durable | `Durable Execution` | Moteur (`Temporal`, `Restate`, `Dapr`) assurant `checkpointing` et `replay` déterministe sur panne. | 09, 13, 14 |
| GitOps cognitif | *Cognitive GitOps* | Co-versionnement Git, CI et signature (`SLSA`, `Sigstore`) du quintette comportemental. | 13 |
| Idempotence à trois états | `Idempotency-Key` | Contrôle d’empreinte et d’état empêchant toute double mutation `SoR` sur réessai. | 04, 09 |
| Identité non humaine | `Non-Human Identity (NHI)` | Identité machine attestée (`SPIFFE` /`SPIRE`, `SVID`, `WIMSE`), sans secret statique. | 10, 13, 14 |
| Maillage événementiel | `Event Mesh` | Bus asynchrone (`Kafka`, `Solace`, `NATS`) routant `CloudEvents` sous `AsyncAPI 3.0` et `ce_ttl`. | 08, 14 |
| Mémoire distribuée (`CoALA`) | *Distributed Agent Memory* | Stratification travail, épisodique, sémantique et procédurale distincte du journal durable. | 06 |
| Noyau d’exécution | `Agent Harness` | Boucle déterministe encadrant modèles, outils, compaction et garde-fous. | 03, 07 |
| Passage par référence | *Claim-Check / Artifact URI* | Pointeur (`Artifact URI`, `TTL`, `ACL`) évitant la copie de charges en contexte. | 07, 14 |
| Passerelle d’inférence | `AI Gateway` | Accès unifié (`GAIE`, `LiteLLM`) vers nuages et enclaves (`vLLM` /`NIM`), quotas `TPM`. | 13, 14 |
| Passerelle d’outils | `MCP Gateway` | Médiateur `MCP` (`Streamable HTTP`) assurant découverte, cache `ttlMs` et audit. | 04, 14 |
| Plateforme interne | `Internal Agentic Platform (IAP)` | Socle produit interne (`TVP`) offrant *Golden Paths*, passerelles, télémétrie et `GitOps`. | 02, 13, 14 |
| Porte d’intention | `Intent Gate` | Contrôle déterministe *Policy-as-Code* (`OPA` /`Rego`, `Cedar`) vérifiant mandat et seuils. | 10, 14, 15 |
| Propriétaire d’agent | `Agent Owner` | Responsable nominatif du mandat, palier `R1` –`R4`, budget et retrait. | 12, 15 |
| Protocole inter-agents | `Agent-to-Agent (A2A)` | Délégation asynchrone `Tasks` (`SSE`, `Artifacts`) entre pairs opaques et `SLIM` /`MLS`. | 05, 14 |
| Règle hybride 80/20 | *80/20 Hybrid Rule* | Partition ~80 % code déterministe et ~20 % nœuds cognitifs typés. | 03, 07, 15 |
| Saga compensatoire | *Compensating Saga* | Séquence classant étapes (compensable, pivot, réessayable) pour cohérence métier. | 09, 14 |
| Strangler Fig agentique | *Agentic Strangler Fig* | Migration en quatre stades (ombre, recommandation, action bornée, autonomie) devant `BPM` /`RPA`. | 15 |
| Systèmes du SI | `SoR` / `SoE` / `SoA` | Stratification entre autorité (`Record`), interface (`Engagement`) et planification (`Agency`). | 01, 02 |
| Télémétrie GenAI | `OpenTelemetry GenAI` | Spans corrélés d’agent, `MCP` (`SEP-414`), `A2A`, `SPIFFE` /`OBO` et coûts (`OTTL`). | 11, 12 |

*Tableau A.1 — Glossaire normatif bilingue de référence couvrant les chapitres 01 à 15.*

# Annexe B — Gabarit d’Architecture Decision Record (ADR) et liste de contrôle EA/SA (40 critères)

Cette annexe réunit deux instruments d’homologation pour le comité d’architecture (`ARB`) : un gabarit d’`ADR` agentique et une grille bloquante de quarante critères.

## B.1 Gabarit d’Architecture Decision Record (ADR) agentique

Toute création ou évolution majeure d’un agent soumet ce dossier reliant l’imputabilité métier (`EA`) aux garanties techniques (`SA`).

| Rubrique ADR | Contenu normatif attendu en comité ARB |
| --- | --- |
| **1. Identification** | `ADR-YYYY-NNN`, titre, statut (*Proposé / Homologué / Déprécié*), `Agent Owner`, centre de coûts, palier `R1` –`R4`, autonomie `L0` –`L4`. |
| **2. Capacité métier** | Chaîne de valeur `BIZBOK` /`TOGAF`, rejet d’un flux `L0` seul, stéréotypes `ArchiMate 3.2` (`«Cognitive Actor»`, `«Intent Contract»`). |
| **3. Portefeuille** | Choix *Acheter / Assembler / Construire*, coexistence `BPMN` /`iPaaS` /`RPA` et stade *Strangler Fig* (`1` à `4`). |
| **4. Partition 80/20** | Part déterministe/cognitive, patron retenu (agent unique, graphe ou hybride `Event Mesh`) et schémas `JSON`. |
| **5. Protocoles et données** | Serveurs `MCP` (`ACI`), pairs `A2A` /`OASF`, `Data Contracts` (`ODCS`), `ACL` /`CQRS`, mémoire `CoALA` et isolation. |
| **6. Durabilité** | Moteur (`Temporal`, `Restate`, `Dapr`), classification `Saga`, `Idempotency-Key`, portes `HOTL` sous `SLA` et repli `L0`. |
| **7. Sécurité et lois** | Menaces `ASI01` –`ASI10`, `SPIFFE` /`NHI`, `OAuth OBO`, `OPA` /`Cedar`, confinement et `Loi 25` /`EU AI Act` /`ISO 42001`. |
| **8. EvalOps et FinOps** | Traces `OTel GenAI`, seuils `pass^k`, coupe-circuits, coût par résultat (`p50` /`p90` /`p99`), `AI Gateway` et réversibilité. |
| **9. Révision** | Risques résiduels acceptés, date de revue `3LoD`, conditions de révocation et plan de retrait. |

*Tableau B.1 — Gabarit d’Architecture Decision Record (*`ADR`*) agentique pour comité d’architecture.*

## B.2 Liste de contrôle d’homologation EA / SA (40 critères)

Les quarante critères `C01` à `C40` répartis en cinq domaines forment la grille bloquante d’accès à l’action bornée et à l’autonomie sous contrat.

| Code | Domaine | Critère vérifiable et preuve exigée en comité ARB | Ch. |
| --- | --- | --- | --- |
| `C01` | EA | Arrimage `BIZBOK` /`TOGAF` et tri `L0` –`L4` écartant les flux déterministes. | 01, 02 |
| `C02` | EA | Vue `ArchiMate 3.2` typant l’agent en `«Cognitive Actor»` lié à `«Human-on-the-Loop»` et `«Guardrail Policy»`. | 02 |
| `C03` | EA | Répartition entre quatre plans découplés sans contournement des Plans 3 et 4. | 02, 14 |
| `C04` | EA | Arbitrage *Acheter / Assembler / Construire* justifié avec clauses de réversibilité. | 02, 12 |
| `C05` | EA | Inscription au registre (`Agent Registry`) avec `Agent Owner` nominatif et palier `R1` –`R4`. | 12, 15 |
| `C06` | EA | Séparation `3LoD` / `OSFI E-23` avec revue indépendante (`2LoD`) exigée dès `R3`. | 12 |
| `C07` | EA | Coexistence `BPMN` / `iPaaS`, gel/sortie `RPA` et rejet des anti-patrons `AP-01` –`AP-03`. | 15 |
| `C08` | EA | Trajectoire *Strangler Fig* en quatre stades avec *baseline* chiffrée et accord `Agent Owner`. | 15 |
| `C09` | SA / Protocoles | Partition `80/20` vérifiée : règles impératives et écritures `SoR` hors prompt. | 01, 03 |
| `C10` | SA / Protocoles | Contrats `JSON Schema` (`additionalProperties: false`, `strict: true`) et validation sémantique. | 03 |
| `C11` | SA / Protocoles | Outils `MCP` (`Streamable HTTP`) orientés `ACI` via `MCP Gateway` (zéro `Swagger-to-MCP`). | 04, 15 |
| `C12` | SA / Protocoles | Encapsulation `SoR` par couche `ACL` et projections `CQRS` /`CDC` en lecture. | 04, 14 |
| `C13` | SA / Protocoles | Opacité `A2A v1.0` (`AgentCard` `JWS` /`RFC 8785`, `Tasks` asynchrones, `CancelTask`). | 05, 14 |
| `C14` | SA / Protocoles | Taxonomie `OASF` (`AGNTCY`) et `SLIM` /`MLS` pour fédération B2B sans exposition entrante. | 05, 14 |
| `C15` | SA / Protocoles | Mémoires `CoALA` sous compaction et `Agentic RAG` arrimé à `ODCS` et BI/`MDM`. | 06 |
| `C16` | SA / Protocoles | Propagation `ACL` à la requête (`OpenFGA` /`RLS`), isolation `Silo` et défense `ASI06`. | 06, 14, 15 |
| `C17` | Orchestration | Justification du multi-agents face à l’agent unique (`Skills` /`ReWOO`, `45 %`, `~15×`). | 07 |
| `C18` | Orchestration | Bornage des topologies (`max_iterations`, stagnation, quorum, *Group Chat* ≤ 3). | 07 |
| `C19` | Orchestration | Passage par référence (`Claim-Check` / `Artifact URI`, `TTL` /`ACL`) et `Goal Pinning`. | 07, 14 |
| `C20` | Orchestration | Enveloppes `CloudEvents v1.0.2` et `AsyncAPI 3.0.0` (`ce_correlationid`, `ce_ttl`, ségrégation). | 08 |
| `C21` | Orchestration | Patron hybride inter-domaines, `Retry` /`DLQ` non bloquants et *backpressure* `TPM`. | 08, 14 |
| `C22` | Orchestration | Moteur durable (`Temporal`, `Restate`, `Dapr`) pour boucles longues, `SoR` ou `HOTL`. | 09, 14, 15 |
| `C23` | Orchestration | Idempotence trois états (`Idempotency-Key`), `Transactional Outbox` et Sagas autour du pivot. | 09 |
| `C24` | Orchestration | Suspensions `HOTL` sous `SLA` (`Signals` /`Awakeables`) exposant le différentiel `SoR`. | 01, 09 |
| `C25` | Zero-Trust / OTel | Analyse `OWASP ASI01` –`ASI10` et séparation contrôle/données (`CaMeL`), zéro sécurité en prompt. | 10, 15 |
| `C26` | Zero-Trust / OTel | Identités `NHI` éphémères (`SPIFFE` /`SPIRE` `SVID`, `WIMSE`) par rôle, zéro secret statique. | 10, 13, 14 |
| `C27` | Zero-Trust / OTel | Délégation `OAuth 2.0 OBO` (`RFC 8693`), `RFC 8707`, `DPoP` (`RFC 9449`) et `Txn-Tokens`. | 10, 14 |
| `C28` | Zero-Trust / OTel | `Intent Gates` déterministes (`OPA` /`Cedar`) et mandats fins `RFC 9396` (`RAR`). | 10, 14 |
| `C29` | Zero-Trust / OTel | Confinement (`Firecracker`, `gVisor`, `Wasmtime`, `SHADI`; zéro `runc`), `PII` et `AISPM` /`AIDR`. | 03, 10, 14 |
| `C30` | Zero-Trust / OTel | Traces `OpenTelemetry GenAI` (`SEP-414`, `A2A`) corrélant `SPIFFE` et `OBO` sous `OTTL`. | 11 |
| `C31` | Zero-Trust / OTel | Pipeline `EvalOps` bloquant en CI sur *mock MCP servers* (`pass^k`, juges `κ`). | 11, 13, 15 |
| `C32` | Zero-Trust / OTel | `SLI` /`SLO` comportementaux sous alertes *burn rate* (`14,4×`, `6×`, `1×`) et repli `L0` testé. | 11, 15 |
| `C33` | Plateforme / FinOps | Provisionnement via *Golden Paths* (`Backstage`, `Kratix`, `Crossplane`) hors logique métier. | 13 |
| `C34` | Plateforme / FinOps | Routage unique par `AI Gateway` (`GAIE` /`LiteLLM`) gérant quotas `TPM` et `vLLM` /`NIM`. | 13, 14 |
| `C35` | Plateforme / FinOps | `GitOps` cognitif co-versionnant code, prompts, `OASF` /`MCP`, `OPA` et `EvalOps` (`SLSA`). | 13 |
| `C36` | Plateforme / FinOps | Livraison progressive (`Shadow`, `Canary`) et épinglage durable (`Worker Versioning`). | 13, 14 |
| `C37` | Plateforme / FinOps | Socle `ISO/IEC 42001` et `NIST AI RMF` prouvant `Loi 25` (`ÉFVP`), `LPRPDE` et `EU AI Act`. | 12 |
| `C38` | Plateforme / FinOps | Archivage immuable (`WORM` / *Object Lock*) des décisions, `(sub, act[])` et `HITL`. | 12, 14 |
| `C39` | Plateforme / FinOps | Coût unitaire `FinOps` par résultat réussi (`p50` /`p90` /`p99`), cache `KV` /`SLM` et `FOCUS`. | 03, 12 |
| `C40` | Plateforme / FinOps | `Showback` avant `Chargeback`, `TCO` /`ROI` ajusté du risque et tests de portabilité. | 12, 15 |

*Tableau B.2 — Liste de contrôle d’homologation EA / SA en quarante critères (*`C01` *à* `C40`*) pour comité d’architecture.*

# Annexe C — Bibliographie maîtresse consolidée

Les références ci-dessous regroupent, par ordre d’apparition globale, les spécifications techniques, normes réglementaires, documentations d’ingénierie et publications vérifiées qui ancrent les chapitres 01 à 15. Les clés locales `[CNN-MM]` sont converties automatiquement en numérotation séquentielle unifiée lors de l’assemblage final.

- **[1]** (C01-01) IBM Think (Derek Robertson et Matthew Kosinski) — What is a System of Record? — https://www.ibm.com/think/topics/system-of-record
- **[2]** (C01-02) Anthropic — Building Effective Agents — https://www.anthropic.com/engineering/building-effective-agents
- **[3]** (C01-18) Ashu Garg et Jaya Gupta (Foundation Capital) — How Systems of Agents will collapse the enterprise stack — https://foundationcapital.com/ideas/how-systems-of-agents-will-collapse-the-enterprise-stack
- **[4]** (C01-04) AWS Prescriptive Guidance — Agentic AI Patterns and Workflows on AWS — https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-patterns/agentic-ai-patterns.html
- **[5]** (C01-09) OWASP GenAI Security Project — LLM06:2025 Excessive Agency — https://genai.owasp.org/llmrisk/llm062025-excessive-agency/
- **[6]** (C01-17) Margaret-Anne Storey — From Technical Debt to Cognitive and Intent Debt: Rethinking Software Health in the Age of AI — https://arxiv.org/abs/2603.22106
- **[7]** (C01-10) OWASP GenAI Security Project — OWASP Top 10 for Agentic Applications (2026) — https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- **[8]** (C01-03) Microsoft Azure Architecture Center — AI Agent Orchestration Patterns — https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns
- **[9]** (C01-16) Lingjiao Chen, Matei Zaharia et James Zou — How Is ChatGPT’s Behavior Changing over Time? — https://arxiv.org/abs/2307.09009
- **[10]** (C01-05) Thinking Machines Lab (Horace He et coll.) — Defeating Nondeterminism in LLM Inference — https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/
- **[11]** (C01-06) Jeffrey Dean et Luiz André Barroso (Google Research) — The Tail at Scale (Communications of the ACM, Vol. 56, No. 2) — https://research.google/pubs/the-tail-at-scale/
- **[12]** (C01-08) NIST — Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1) — https://doi.org/10.6028/NIST.AI.600-1
- **[13]** (C01-07) Amey Agrawal et coll. — Taming Throughput-Latency Tradeoff in LLM Inference with Sarathi-Serve — https://arxiv.org/abs/2403.02310
- **[14]** (C01-11) K. J. Kevin Feng, David W. McDonald et Amy X. Zhang — Levels of Autonomy for AI Agents — https://arxiv.org/abs/2506.12469
- **[15]** (C01-12) Union européenne — Règlement (UE) 2024/1689 sur l’intelligence artificielle (EU AI Act), Article 14 — https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- **[16]** (C01-13) Raja Parasuraman et Dietrich H. Manzey — Complacency and Bias in Human Use of Automation: An Attentional Integration (Human Factors, Vol. 52, No. 3) — https://doi.org/10.1177/0018720810376055
- **[17]** (C01-14) Lisanne Bainbridge — Ironies of Automation (Automatica, Vol. 19, No. 6) — https://doi.org/10.1016/0005-1098(83)90046-8

- **[18]** (C01-15) D. Sculley et coll. — Hidden Technical Debt in Machine Learning Systems (NeurIPS 2015) — https://proceedings.neurips.cc/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html
- **[19]** (C02-08) Google Cloud Architecture Center — Multi-tenant Agentic AI System — https://cloud.google.com/architecture/multi-tenant-agentic-ai-system
- **[20]** (C02-16) Microsoft Cloud Adoption Framework — Architecture and Governance for AI Agents — https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/architecture-governance
- **[21]** (C02-12) Cloud Security Alliance (CSA) — Agentic AI Threat Modeling Framework: MAESTRO — https://cloudsecurityalliance.org/blog/2025/02/06/agentic-ai-threat-modeling-framework-maestro
- **[22]** (C02-01) The Open Group — ArchiMate 3.2 Specification — https://pubs.opengroup.org/architecture/archimate3-spec/
- **[23]** (C02-02) The Open Group — TOGAF Standard, 10th Edition — https://www.opengroup.org/togaf
- **[24]** (C02-04) Microsoft Cloud Adoption Framework — AI Agent Adoption Strategy — https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/executive-strategy
- **[25]** (C02-14) NIST — Artificial Intelligence Risk Management Framework (AI RMF 1.0, NIST AI 100-1) — https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf
- **[26]** (C02-15) ISO/IEC 42001:2023 — Information technology — Artificial intelligence — Management system — https://www.iso.org/standard/81230.html
- **[27]** (C02-05) Microsoft Azure Architecture Center — AI Agent Design Patterns — https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns
- **[28]** (C02-06) AWS Prescriptive Guidance — Agentic AI Patterns and Workflows on AWS — https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-patterns/welcome.html
- **[29]** (C02-10) Cloud Native Computing Foundation (CNCF) — Cloud Native Artificial Intelligence Whitepaper — https://www.cncf.io/reports/cloud-native-artificial-intelligence-whitepaper/
- **[30]** (C02-03) Business Architecture Guild — BIZBOK Guide (Business Architecture Body of Knowledge) — https://www.businessarchitectureguild.org/page/BIZBOKGuide
- **[31]** (C02-09) Google Cloud Architecture Center — Choose a Design Pattern for Your Agentic AI System — https://cloud.google.com/architecture/choose-design-pattern-agentic-ai-system
- **[32]** (C02-07) AWS Well-Architected Framework — Generative AI Lens — https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/welcome.html
- **[33]** (C02-18) Martin Fowler — Emerging Patterns in Building GenAI Products — https://martinfowler.com/articles/gen-ai-patterns/
- **[34]** (C02-13) OWASP GenAI Security Project — Agentic AI Threats and Mitigations — https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/
- **[35]** (C02-11) Linux Foundation — Formation of the Agentic AI Foundation (AAIF) — https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation
- **[36]** (C02-17) Thoughtworks — Technology Radar — https://www.thoughtworks.com/en-us/radar
- **[37]** (C03-01) Anthropic — Building Effective Agents — https://www.anthropic.com/engineering/building-effective-agents
- **[38]** (C03-12) Zaharia et al. (BAIR / UC Berkeley) — The Shift from Models to Compound AI Systems — https://bair.berkeley.edu/blog/2024/02/18/compound-ai-systems/
- **[39]** (C03-02) Anthropic — Effective Harnesses for Long-Running Agents — https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

- **[40]** (C03-03) AGNTCY — SHADI (Secure Host for Agentic AI Dynamic Instantiation) — https://github.com/agntcy/shadi
- **[41]** (C03-08) Belcak et al. (NVIDIA / Georgia Tech) — Small Language Models are the Future of Agentic AI — https://arxiv.org/abs/2506.02153
- **[42]** (C03-14) OpenAI — Introducing Structured Outputs in the API — https://openai.com/index/introducing-structured-outputs-in-the-api/
- **[43]** (C03-07) OWASP GenAI Security Project — Agentic AI – Threats and Mitigations — https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/
- **[44]** (C03-13) Google Cloud Architecture Center — Choose a design pattern for your agentic AI system — https://cloud.google.com/architecture/choose-design-pattern-agentic-ai-system
- **[45]** (C03-04) Kubernetes SIG Apps — Agent Sandbox — https://github.com/kubernetes-sigs/agent-sandbox
- **[46]** (C03-05) gVisor — Security Architecture Guide — https://gvisor.dev/docs/architecture_guide/security/
- **[47]** (C03-06) Firecracker — Technical Specification — https://github.com/firecracker-microvm/firecracker/blob/main/SPECIFICATION.md
- **[48]** (C03-11) Sentence-Transformers — Retrieve & Re-Rank Architecture (Bi-Encoders and Cross-Encoders) — https://www.sbert.net/examples/applications/retrieve_rerank/README.html
- **[49]** (C03-09) Chen, Zaharia & Zou (Stanford) — FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance — https://arxiv.org/abs/2305.05176
- **[50]** (C03-10) Ong et al. (UC Berkeley / LMSYS) — RouteLLM: Learning to Route LLMs with Preference Data — https://arxiv.org/abs/2406.18665
- **[51]** (C03-15) Anthropic Claude Docs — Structured Outputs — https://platform.claude.com/docs/en/build-with-claude/structured-outputs
- **[52]** (C03-16) Dong et al. (MLC / CMU) — XGrammar: Flexible and Efficient Structured Generation Engine for Large Language Models — https://arxiv.org/abs/2411.15100
- **[53]** (C03-17) JSON Schema — Draft 2020-12 Core & Validation Specification — https://json-schema.org/draft/2020-12/json-schema-core.html
- **[54]** (C03-18) Pydantic — JSON Schema Generation and Validation Documentation — https://docs.pydantic.dev/latest/concepts/json_schema/
- **[55]** (C04-07) Anthropic Engineering — Code execution with MCP: Building more efficient agents — https://www.anthropic.com/research/code-execution-with-mcp
- **[56]** (C04-21) MuleSoft (Salesforce) — Enterprise MCP Bridge and Agent Fabric — https://www.mulesoft.com/platform/ai/model-context-protocol
- **[57]** (C04-04) Linux Foundation — Formation of the Agentic AI Foundation (AAIF) — https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation
- **[58]** (C04-01) Model Context Protocol — Specification (révision 2026-07-28) — https://modelcontextprotocol.io/specification/2026-07-28
- **[59]** (C04-03) JSON-RPC Working Group — JSON-RPC 2.0 Specification — https://www.jsonrpc.org/specification
- **[60]** (C04-12) OWASP Cheat Sheet Series — MCP Security Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/MCP_Security_Cheat_Sheet.html
- **[61]** (C04-05) Yang et al. (Princeton) — SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering (arXiv:2405.15793) — https://arxiv.org/abs/2405.15793

- **[62]** (C04-06) Anthropic Engineering — Writing effective tools for agents — with agents — https://www.anthropic.com/research/writing-tools-for-agents
- **[63]** (C04-09) Speakeasy — Reducing MCP token usage by 100x with Dynamic Toolsets — https://www.speakeasy.com/blog/how-we-reduced-token-usage-by-100x-dynamic-toolsets-v2
- **[64]** (C04-08) Cloudflare Engineering — Code Mode: The better way to use MCP — https://blog.cloudflare.com/code-mode/
- **[65]** (C04-16) Amazon Web Services — Amazon Bedrock AgentCore Gateway OpenAPI Schema Targets — https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-schema-openapi.html
- **[66]** (C04-10) Speakeasy — Code mode is overkill for your MCP server. It’s not for your gateway. — https://www.speakeasy.com/blog/code-mode-mcp-gateway
- **[67]** (C04-11) OWASP — MCP Top 10 Project — https://owasp.org/projects/mcp-top-10
- **[68]** (C04-13) Agentgateway (AAIF / Linux Foundation) — Unified Data Plane for MCP, OpenAPI and gRPC — https://github.com/agentgateway/agentgateway
- **[69]** (C04-14) Agent Router (AAIF / Linux Foundation, anciennement Envoy AI Gateway) — Control Plane for AI and MCP Traffic — https://github.com/theagentrouter/agent-router
- **[70]** (C04-15) Microsoft Azure API Management — Expose REST API as an MCP server — https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server
- **[71]** (C04-17) Apollo GraphQL — Persisted Queries for Enterprise MCP Servers — https://www.apollographql.com/tutorials/enterprise-mcp-graphql/04-persisted-queries
- **[72]** (C04-02) Model Context Protocol — Official MCP Registry — https://modelcontextprotocol.io/registry/about
- **[73]** (C04-18) Microsoft Azure Architecture Center — Anti-Corruption Layer Pattern — https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer
- **[74]** (C04-20) IBM Community — IBM z/OS Connect 3.0.98 and Native MCP Support — https://community.ibm.com/community/user/blogs/shruthi-krishnan/2025/10/21/zos-connect-3098-now-available
- **[75]** (C04-19) Martin Fowler — Patterns of Legacy Displacement — https://martinfowler.com/articles/patterns-legacy-displacement/
- **[76]** (C04-22) Debezium — Reference Documentation for Log-Based Change Data Capture (CDC) — https://debezium.io/documentation/
- **[77]** (C05-02) A2A and MCP : Complementary Protocols for Agentic Systems — https://a2a-protocol.org/latest/topics/a2a-and-mcp/
- **[78]** (C05-05) Linux Foundation : A2A Protocol Surpasses 150 Organizations and Sees Enterprise Production Use — https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year
- **[79]** (C05-06) Google Cloud Donates A2A to the Linux Foundation — https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation/
- **[80]** (C05-07) Linux Foundation : Agentic AI Foundation (AAIF) Expansion — https://www.linuxfoundation.org/press/agentic-ai-foundation-announces-four-new-projects-agent-skills-open-responses-openenv-and-opensandbox
- **[81]** (C05-19) Salesforce : When Agents Speak the Same Language (Agent Interoperability) — https://www.salesforce.com/blog/agent-interoperability/
- **[82]** (C05-01) Agent2Agent (A2A) Protocol Specification v1.0.0 — https://a2a-protocol.org/latest/specification/

- **[83]** (C05-12) IETF Internet-Draft : An Overview of Messaging Systems and Their Applicability to Agentic AI (draft-mpsb-agntcy-messaging-03) — https://datatracker.ietf.org/doc/html/draft-mpsb-agntcy-messaging-03
- **[84]** (C05-20) OWASP GenAI Security Project : Top 10 for Agentic AI (ASI01–ASI10) — https://genai-security-project.github.io/crosswalk/agentic-ai-top10/
- **[85]** (C05-04) A2A Enterprise Features — https://a2a-protocol.org/latest/topics/enterprise-ready/
- **[86]** (C05-18) Salesforce Engineering : Choose the Right Agentforce Integration Pattern (API, MCP, or A2A) — https://www.salesforce.com/blog/how-to-choose-integration-pattern-for-agentforce/
- **[87]** (C05-03) A2A Streaming and Asynchronous Operations — https://a2a-protocol.org/latest/topics/streaming-and-async/
- **[88]** (C05-15) Microsoft Agent Framework Overview — https://learn.microsoft.com/en-us/agent-framework/overview/
- **[89]** (C05-16) Microsoft Learn : Integrating Remote Agents with A2AAgent — https://learn.microsoft.com/en-us/agent-framework/integrations/by-component/agent-services/a2a
- **[90]** (C05-14) LangChain Agent Server : A2A Endpoint Documentation — https://docs.langchain.com/langsmith/server-a2a
- **[91]** (C05-09) The AGNTCY Agent Directory Service : Architecture and Implementation (arXiv:2509.18787) — https://arxiv.org/abs/2509.18787
- **[92]** (C05-10) AGNTCY SLIM : Secure Low-Latency Interactive Messaging Overview — https://slim.agntcy.org/latest/slim/slim-overview/
- **[93]** (C05-13) IETF RFC 9420 : The Messaging Layer Security (MLS) Protocol — https://www.rfc-editor.org/rfc/rfc9420.html
- **[94]** (C05-08) AGNTCY Open Agentic Schema Framework (OASF) — https://docs.agntcy.org/oasf/open-agentic-schema-framework/
- **[95]** (C05-11) IETF Internet-Draft : Secure Low-Latency Interactive Messaging (draft-mpsb-agntcy-slim-03) — https://datatracker.ietf.org/doc/html/draft-mpsb-agntcy-slim-03
- **[96]** (C05-17) Amazon Bedrock AgentCore Runtime : Deploy A2A Servers — https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-a2a.html
- **[97]** (C06-01) Sumers, Yao, Narasimhan & Griffiths (Princeton) — Cognitive Architectures for Language Agents (CoALA) — https://arxiv.org/abs/2309.02427
- **[98]** (C06-02) Anthropic Engineering — Effective context engineering for AI agents — https://www.anthropic.com/research/effective-context-engineering-for-ai-agents
- **[99]** (C06-05) Anthropic Engineering — Contextual Retrieval in AI Systems — https://www.anthropic.com/research/contextual-retrieval
- **[100]** (C06-11) Sequeda, Allemang & Jacob (data.world) — A Benchmark to Understand the Role of Knowledge Graphs on Large Language Model’s Accuracy for Question Answering on Enterprise SQL Databases — https://arxiv.org/abs/2311.07509
- **[101]** (C06-13) dbt Labs — dbt Semantic Layer & MetricFlow Documentation — https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl
- **[102]** (C06-21) Chen, Xiang, Xiao, Song & Li — AgentPoison: Red-teaming LLM Agents via Poisoning Memory or Knowledge Bases — https://arxiv.org/abs/2407.12784
- **[103]** (C06-22) Dong et al. — MINJA: Memory Injection Attacks on LLM Agents via Query-Only Interaction — https://arxiv.org/abs/2503.03704

- **[104]** (C06-08) Singh et al. — Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG — https://arxiv.org/abs/2501.09136
- **[105]** (C06-17) OpenFGA (CNCF) — RAG Authorization and Search With Permissions — https://openfga.dev/docs/modeling/agents/rag-authorization
- **[106]** (C06-14) Bitol / Linux Foundation AI & Data — Open Data Contract Standard (ODCS v3.2) — https://github.com/bitol-io/open-data-contract-standard
- **[107]** (C06-03) Packer et al. (UC Berkeley) — MemGPT: Towards LLMs as Operating Systems — https://arxiv.org/abs/2310.08560
- **[108]** (C06-04) LangChain — LangMem Core Concepts: Memory Types and Storage — https://langchain-ai.github.io/langmem/concepts/conceptual_guide/
- **[109]** (C06-10) Edge et al. (Microsoft Research) — From Local to Global: A Graph RAG Approach to Query-Focused Summarization — https://arxiv.org/abs/2404.16130
- **[110]** (C06-09) Yan, Gu, Zhu & Ling — Corrective Retrieval Augmented Generation (CRAG) — https://arxiv.org/abs/2401.15884
- **[111]** (C06-07) Microsoft Learn — Hybrid Search Scoring (RRF) — Foundry IQ (Azure AI Search) — https://learn.microsoft.com/en-us/azure/search/hybrid-search-ranking
- **[112]** (C06-06) Cormack, Clarke & Büttcher (SIGIR 2009) — Reciprocal Rank Fusion outperforms Condorcet and individual Rank Learning Methods — https://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf
- **[113]** (C06-12) Snowflake Documentation — Cortex Analyst and Semantic Models — https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst
- **[114]** (C06-19) OWASP Top 10 for LLM Applications — LLM08:2025 Vector and Embedding Weaknesses — https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/blob/main/2_0_vulns/LLM08_VectorAndEmbeddingWeaknesses.md
- **[115]** (C06-15) W3C Recommendation — Shapes Constraint Language (SHACL) — https://www.w3.org/TR/shacl/
- **[116]** (C06-16) W3C Recommendation — OWL 2 Web Ontology Language Document Overview (Second Edition) — https://www.w3.org/TR/owl2-overview/
- **[117]** (C06-18) Microsoft Learn — Security Filter Pattern — Foundry IQ (Azure AI Search) — https://learn.microsoft.com/en-us/azure/search/search-security-trimming-for-azure-search
- **[118]** (C06-23) OWASP Foundation — OWASP Agent Memory Guard (ASI06 Reference Implementation) — https://github.com/OWASP/www-project-agent-memory-guard
- **[119]** (C06-20) Zou, Geng, Wang & Jia — PoisonedRAG: Knowledge Corruption Attacks to Retrieval-Augmented Generation of Large Language Models — https://arxiv.org/abs/2402.07867
- **[120]** (C06-24) AWS Well-Architected Framework — SaaS Lens: Silo, Pool, and Bridge Models — https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/silo-pool-and-bridge-models.html
- **[121]** (C06-25) Qdrant Documentation — Multitenancy: Payload Partitioning, Custom Sharding and Tiered Isolation — https://qdrant.tech/documentation/manage-data/multitenancy/
- **[122]** (C06-26) PostgreSQL Documentation — Row Security Policies (Row-Level Security) — https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- **[123]** (C07-03) Cognition AI (Walden Yan) — Don’t Build Multi-Agents — https://cognition.com/blog/dont-build-multi-agents
- **[124]** (C07-04) Kim et al. (Google Research, Google DeepMind et MIT) — Towards a Science of Scaling Agent Systems (arXiv:2512.08296) — https://arxiv.org/abs/2512.08296

- **[125]** (C07-05) Cemri et al. (UC Berkeley) — Why Do Multi-Agent LLM Systems Fail? (MAST, arXiv:2503.13657) — https://arxiv.org/abs/2503.13657
- **[126]** (C07-01) Anthropic — Building effective AI agents — https://www.anthropic.com/research/building-effective-agents
- **[127]** (C07-02) Anthropic Engineering — How we built our multi-agent research system — https://www.anthropic.com/research/multi-agent-research-system
- **[128]** (C07-06) Google Cloud Architecture Center — Choose a design pattern for your agentic AI system — https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system
- **[129]** (C07-09) LangChain Blog (Sydney Runkle) — Choosing the Right Multi-Agent Architecture — https://www.langchain.com/blog/choosing-the-right-multi-agent-architecture
- **[130]** (C07-14) Xu et al. — ReWOO: Decoupling Reasoning from Observations for Efficient Augmented Language Models (arXiv:2305.18323) — https://arxiv.org/abs/2305.18323
- **[131]** (C07-07) Microsoft Azure Architecture Center — AI Agent Orchestration Patterns — https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns
- **[132]** (C07-08) Microsoft Learn (Agent Framework) — Workflow orchestrations in Agent Framework — https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/
- **[133]** (C07-10) LangChain Documentation — Workflows and agents (LangGraph) — https://docs.langchain.com/oss/python/langgraph/workflows-agents
- **[134]** (C07-16) Google Agent Development Kit (ADK) — Workflows: multi-agent, multi-node applications — https://adk.dev/workflows/
- **[135]** (C07-25) OWASP GenAI Security Project — OWASP Top 10 for Agentic Applications for 2026 — https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- **[136]** (C07-11) LangChain Documentation — Subagents — https://docs.langchain.com/oss/python/langchain/multi-agent/subagents
- **[137]** (C07-21) Anthropic Engineering — Effective context engineering for AI agents — https://www.anthropic.com/research/effective-context-engineering-for-ai-agents
- **[138]** (C07-13) Kim et al. (UC Berkeley) — An LLM Compiler for Parallel Function Calling (arXiv:2312.04511) — https://arxiv.org/abs/2312.04511
- **[139]** (C07-12) LangChain Documentation — Handoffs — https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs
- **[140]** (C07-15) OpenAI Agents SDK — Handoffs — https://openai.github.io/openai-agents-python/handoffs/
- **[141]** (C07-17) Hohpe et Woolf (Enterprise Integration Patterns) — Scatter-Gather — https://www.enterpriseintegrationpatterns.com/patterns/messaging/BroadcastAggregate.html
- **[142]** (C07-18) Madaan et al. — Self-Refine: Iterative Refinement with Self-Feedback (arXiv:2303.17651) — https://arxiv.org/abs/2303.17651
- **[143]** (C07-22) Arike et al. (MATS et Apollo Research) — Technical Report: Evaluating Goal Drift in Language Model Agents (arXiv:2505.02709) — https://arxiv.org/abs/2505.02709
- **[144]** (C07-19) Microsoft Azure Architecture Center — Claim-Check pattern — https://learn.microsoft.com/en-us/azure/architecture/patterns/claim-check
- **[145]** (C07-20) Google Agent Development Kit (ADK) — Artifacts — https://adk.dev/artifacts/
- **[146]** (C07-23) Liu et al. — Lost in the Middle: How Language Models Use Long Contexts (arXiv:2307.03172) — https://arxiv.org/abs/2307.03172

- **[147]** (C07-24) Wallace et al. (OpenAI) — The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions (arXiv:2404.13208) — https://arxiv.org/abs/2404.13208
- **[148]** (C08-08) Solace : What is an Event Mesh? — https://solace.com/what-is-an-event-mesh/
- **[149]** (C08-11) Confluent : Four Design Patterns for Event-Driven, Multi-Agent Systems — https://www.confluent.io/blog/event-driven-multi-agent-systems/
- **[150]** (C08-12) Confluent : How to Build a Multi-Agent Orchestrator Using Apache Flink and Apache Kafka — https://www.confluent.io/blog/multi-agent-orchestrator-using-flink-and-kafka/
- **[151]** (C08-24) Dhanyamraju et al. : Autonomous Event-Driven Multi-Agent Orchestration for Enterprise AI at Scale (`arXiv:2606.20058`) — https://arxiv.org/abs/2606.20058
- **[152]** (C08-15) Microsoft Azure Architecture Center : Choreography Pattern — https://learn.microsoft.com/en-us/azure/architecture/patterns/choreography
- **[153]** (C08-09) Solace Agent Mesh Documentation — https://docs.solace.com/Agent-Mesh/agent-mesh.htm
- **[154]** (C08-16) AWS Prescriptive Guidance : Choosing Your Coordination Approach — https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-integrating-microservices/choosing-approach.html
- **[155]** (C08-17) Camunda : Orchestration vs Choreography — https://camunda.com/blog/2023/02/orchestration-vs-choreography/
- **[156]** (C08-23) OWASP GenAI Security Project : Top 10 for Agentic AI (`ASI08` et `ASI10`) — https://genai-security-project.github.io/crosswalk/agentic-ai-top10/
- **[157]** (C08-07) Apache Kafka 4.1 Consumer Configuration Reference — https://kafka.apache.org/41/configuration/consumer-configs/
- **[158]** (C08-10) NATS JetStream : Pull Consumers in Depth — https://docs.nats.io/learn/jetstream/pull-consumers
- **[159]** (C08-18) Confluent : Error Handling Patterns in Apache Kafka — https://www.confluent.io/blog/error-handling-patterns-in-kafka/
- **[160]** (C08-22) Agent Router (Envoy AI Gateway) : Usage-Based Token Rate Limiting — https://github.com/theagentrouter/agent-router/blob/main/examples/token_ratelimit/token_ratelimit.yaml
- **[161]** (C08-26) Hashemi et al. : LLM Multi-Agent Systems Are Vulnerable to Herding and Runaway Cascades (`arXiv:2610.30769`) — https://arxiv.org/abs/2610.30769
- **[162]** (C08-13) Martin Fowler : What Do You Mean by « Event-Driven »? — https://martinfowler.com/articles/201701-event-driven.html
- **[163]** (C08-27) NATS JetStream : Retention Policies — https://docs.nats.io/learn/jetstream/retention-policies
- **[164]** (C08-28) NATS JetStream : Delivery and Acknowledgment — https://docs.nats.io/learn/jetstream/delivery-and-acknowledgment
- **[165]** (C08-01) CloudEvents Specification v1.0.2 (CNCF) — https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md
- **[166]** (C08-03) AsyncAPI Specification v3.0.0 — https://www.asyncapi.com/docs/reference/specification/v3.0.0
- **[167]** (C08-02) CloudEvents v1.0.2 Apache Kafka Protocol Binding (CNCF) — https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/kafka-protocol-binding.md
- **[168]** (C08-04) AsyncAPI Kafka Protocol Bindings v0.5.0 — https://github.com/asyncapi/bindings/blob/master/kafka/README.md

- **[169]** (C08-05) AsyncAPI Solace Protocol Bindings v0.4.0 — https://github.com/asyncapi/bindings/blob/master/solace/README.md
- **[170]** (C08-06) AsyncAPI NATS Protocol Bindings v0.1.0 — https://github.com/asyncapi/bindings/blob/master/nats/README.md
- **[171]** (C08-14) Gregor Hohpe : Process Manager (Enterprise Integration Patterns) — https://www.enterpriseintegrationpatterns.com/patterns/messaging/ProcessManager.html
- **[172]** (C08-25) Luo et al. : Auditing Cascading Risks in Multi-Agent Systems via Semantic-Geometric Co-evolution (`arXiv:2603.13325`) — https://arxiv.org/abs/2603.13325
- **[173]** (C08-19) The Reactive Manifesto — https://www.reactivemanifesto.org/
- **[174]** (C08-20) Reactive Streams Specification — https://www.reactive-streams.org/
- **[175]** (C08-21) IETF Internet-Draft : RateLimit Header Fields for HTTP (`draft-ietf-httpapi-ratelimit-headers-11`) — https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/
- **[176]** (C09-09) Temporal — Building AI agents that overcome the complexity cliff — https://temporal.io/blog/building-ai-agents-that-overcome-the-complexity-cliff
- **[177]** (C09-10) Temporal Documentation — Timers and Start Delays — https://docs.temporal.io/workflow-execution/timers-delays
- **[178]** (C09-01) AWS Builders’ Library (Marc Brooker) — Timeouts, retries, and backoff with jitter — https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/
- **[179]** (C09-02) Kubernetes Documentation — Pod Lifecycle — https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/
- **[180]** (C09-17) Stripe Engineering (Brandur Leach) — Designing robust and predictable APIs with idempotency — https://stripe.com/blog/idempotency
- **[181]** (C09-07) Temporal Documentation — Workflow Execution & Replay — https://docs.temporal.io/workflow-execution
- **[182]** (C09-16) IETF HTTPAPI Working Group — The Idempotency-Key HTTP Header Field (Internet-Draft) — https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/
- **[183]** (C09-21) Microsoft Azure Architecture Center — Saga Design Pattern — https://learn.microsoft.com/en-us/azure/architecture/patterns/saga
- **[184]** (C09-23) Temporal Documentation — Approval Pattern (Human-in-the-Loop) — https://docs.temporal.io/design-patterns/approval
- **[185]** (C09-04) Anthropic — Rate limits (Claude Platform Docs) — https://platform.claude.com/docs/en/api/rate-limits
- **[186]** (C09-20) Hector Garcia-Molina & Kenneth Salem (ACM SIGMOD 1987) — Sagas — https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf
- **[187]** (C09-27) Microsoft Learn — AI gateway capabilities in Azure API Management — https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities
- **[188]** (C09-05) OpenAI API — Rate limits — https://platform.openai.com/docs/guides/rate-limits
- **[189]** (C09-03) IETF RFC 6585 — Additional HTTP Status Codes — https://www.rfc-editor.org/rfc/rfc6585
- **[190]** (C09-06) Temporal Documentation — Workflow Definition & Deterministic constraints — https://docs.temporal.io/workflow-definition
- **[191]** (C09-11) Restate Documentation — Key Concepts & Architecture — https://docs.restate.dev/foundations/key-concepts

- **[192]** (C09-12) Restate Documentation — Durable Steps (`ctx.run`) — https://docs.restate.dev/develop/ts/durable-steps
- **[193]** (C09-15) LangChain Documentation — LangGraph Persistence (Checkpointers and Stores) — https://docs.langchain.com/oss/python/langgraph/persistence
- **[194]** (C09-08) Temporal Documentation — Detecting Activity failures — https://docs.temporal.io/encyclopedia/detecting-activity-failures
- **[195]** (C09-13) Restate — Restate vs Temporal Architectural Comparison — https://restate.dev/vs/temporal
- **[196]** (C09-14) CNCF / Dapr Documentation — Workflow architecture — https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-architecture/
- **[197]** (C09-18) Microservices.io (Chris Richardson) — Pattern: Transactional outbox — https://microservices.io/patterns/data/transactional-outbox.html
- **[198]** (C09-19) Debezium Engineering (Gunnar Morling) — Reliable Microservices Data Exchange With the Outbox Pattern — https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/
- **[199]** (C09-22) Restate Documentation — Sagas Guide — https://docs.restate.dev/guides/sagas
- **[200]** (C09-25) Restate Documentation — Signals and external events — https://docs.restate.dev/develop/ts/external-events
- **[201]** (C09-24) Temporal Documentation — Workflow message passing (Signals, Queries, & Updates) — https://docs.temporal.io/encyclopedia/workflow-message-passing
- **[202]** (C09-26) Microsoft Azure Architecture Center — Circuit Breaker Pattern — https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
- **[203]** (C09-28) LiteLLM Documentation — Fallbacks (Provider Failover) — https://docs.litellm.ai/docs/proxy/reliability
- **[204]** (C10-01) OWASP GenAI Security Project — OWASP Top 10 for Agentic Applications (ASI01–ASI10, 2026) — https://genai-security-project.github.io/crosswalk/agentic-ai-top10/
- **[205]** (C10-05) Kai Greshake et al. — Not What You’ve Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection — https://arxiv.org/abs/2302.12173
- **[206]** (C10-04) OWASP Top 10 for LLM Applications — LLM01:2025 Prompt Injection — https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/blob/main/2_0_vulns/LLM01_PromptInjection.md
- **[207]** (C10-10) NIST Special Publication 800-207 — Zero Trust Architecture — https://csrc.nist.gov/pubs/sp/800/207/final
- **[208]** (C10-02) OWASP GenAI Security Project — Agentic AI Threats and Mitigations — https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/
- **[209]** (C10-08) Cloud Security Alliance (CSA) — Agentic AI Threat Modeling Framework: MAESTRO — https://cloudsecurityalliance.org/blog/2025/02/06/agentic-ai-threat-modeling-framework-maestro
- **[210]** (C10-09) NIST AI 100-2 E2025 — Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations — https://csrc.nist.gov/pubs/ai/100/2/e2025/final
- **[211]** (C10-07) Edoardo Debenedetti, Ilia Shumailov, Nicholas Carlini, Florian Tramèr et al. (Google, DeepMind, ETH Zurich) — Defeating Prompt Injections by Design (CaMeL) — https://arxiv.org/abs/2503.18813
- **[212]** (C10-20) IETF OAuth Working Group — Transaction Tokens (draft-ietf-oauth-transaction-tokens) — https://datatracker.ietf.org/doc/draft-ietf-oauth-transaction-tokens/

- **[213]** (C10-32) Zenity — AI Security Posture Management (AISPM) & AI Detection and Response (AIDR) — https://zenity.io/platform/ai-detection-and-response
- **[214]** (C10-18) IETF RFC 9396 — OAuth 2.0 Rich Authorization Requests (RAR) — https://datatracker.ietf.org/doc/html/rfc9396
- **[215]** (C10-23) Cedar Policy Language Reference Guide — Version 4.6 — https://docs.cedarpolicy.com/
- **[216]** (C10-11) OWASP Foundation — OWASP Non-Human Identities Top 10 (2025) — https://owasp.org/projects/non-human-identities-top-10
- **[217]** (C10-21) Model Context Protocol Specification — Authorization (Revision 2025-11-25) — https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization
- **[218]** (C10-12) SPIFFE Documentation — SPIFFE Concepts (ID, Trust Domain, SVID, Workload API) — https://spiffe.io/docs/latest/spiffe-about/spiffe-concepts/
- **[219]** (C10-16) IETF RFC 8693 — OAuth 2.0 Token Exchange — https://datatracker.ietf.org/doc/html/rfc8693
- **[220]** (C10-19) IETF RFC 9449 — OAuth 2.0 Demonstrating Proof of Possession (DPoP) — https://datatracker.ietf.org/doc/html/rfc9449
- **[221]** (C10-03) OWASP GenAI Security Project — Securing Agentic Applications Guide v1.0 — https://genai.owasp.org/resource/securing-agentic-applications-guide-1-0/
- **[222]** (C10-25) Firecracker MicroVM — Design & Jailer Documentation — https://github.com/firecracker-microvm/firecracker/blob/main/docs/design.md
- **[223]** (C10-26) gVisor Documentation — Security Model (Sentry & Gofer) — https://gvisor.dev/docs/architecture_guide/security/
- **[224]** (C10-27) Bytecode Alliance — Wasmtime Security & WebAssembly Component Model — https://docs.wasmtime.dev/security.html
- **[225]** (C10-13) SPIRE Documentation — SPIRE Concepts (Node Attestation, Workload Attestation, Federation) — https://spiffe.io/docs/latest/spire-about/spire-concepts/
- **[226]** (C10-15) IETF WIMSE Working Group — Workload Identity in a Multi System Environment (WIMSE) Architecture — https://datatracker.ietf.org/doc/draft-ietf-wimse-arch/
- **[227]** (C10-22) Open Policy Agent (OPA) Documentation — Policy Philosophy & Rego Architecture — https://www.openpolicyagent.org/docs/philosophy
- **[228]** (C10-06) Eric Wallace et al. (OpenAI) — The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions — https://arxiv.org/abs/2404.13208
- **[229]** (C10-14) SPIFFE / SPIRE Integration Guide — Using Envoy with SPIRE — https://spiffe.io/docs/latest/microservices/envoy/
- **[230]** (C10-17) IETF RFC 8707 — Resource Indicators for OAuth 2.0 — https://datatracker.ietf.org/doc/html/rfc8707
- **[231]** (C10-24) Amazon Web Services — Policy in Amazon Bedrock AgentCore Documentation — https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html
- **[232]** (C10-28) Kata Containers — Open Infrastructure Foundation Architecture — https://katacontainers.io/
- **[233]** (C10-29) Data Privacy Stack (Microsoft) — Presidio PII Protection & Anonymization — https://data-privacy-stack.github.io/presidio/
- **[234]** (C10-30) NVIDIA — NeMo Guardrails Library Overview — https://docs.nvidia.com/nemo/guardrails/about-nemo-guardrails-library/overview

- **[235]** (C10-33) Palo Alto Networks — Prisma AIRS API Intercept (AI Runtime Security) — https://pan.dev/airs/
- **[236]** (C10-31) OWASP Foundation — OWASP AI Exchange — https://owaspai.org/
- **[237]** (C11-17) Shunyu Yao et al. (Sierra Research, `arXiv:2406.12045`) — tau-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains — https://arxiv.org/abs/2406.12045
- **[238]** (C11-29) OWASP GenAI Security Project — Top 10 for Agentic AI (`ASI08` et `ASI10`) — https://genai-security-project.github.io/crosswalk/agentic-ai-top10/
- **[239]** (C11-30) OWASP GenAI Security Project — LLM10:2025 Unbounded Consumption — https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/
- **[240]** (C11-01) OpenTelemetry — Semantic Conventions for GenAI Agent and Framework Spans — https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md
- **[241]** (C11-14) Anthropic Engineering — Demystifying Evals for AI Agents — https://www.anthropic.com/research/demystifying-evals-for-ai-agents
- **[242]** (C11-24) Google SRE Workbook — Alerting on SLOs (Multiwindow, Multi-Burn-Rate Alerts) — https://sre.google/workbook/alerting-on-slos/
- **[243]** (C11-32) Resilience4j Documentation — CircuitBreaker Finite State Machine — https://resilience4j.readme.io/docs/circuitbreaker
- **[244]** (C11-10) IETF RFC 8693 — OAuth 2.0 Token Exchange — https://datatracker.ietf.org/doc/html/rfc8693
- **[245]** (C11-11) CNCF SPIFFE — SPIFFE Overview — https://spiffe.io/docs/latest/spiffe-about/overview/
- **[246]** (C11-12) OpenTelemetry Collector Contrib — Redaction Processor — https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/redactionprocessor
- **[247]** (C11-26) NIST AI 100-1 — Artificial Intelligence Risk Management Framework (AI RMF 1.0) — https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf
- **[248]** (C11-07) OpenTelemetry Blog (Guangya Liu & Sujay Solomon) — AI Agent Observability: Evolving Standards and Best Practices — https://opentelemetry.io/blog/2025/ai-agent-observability/
- **[249]** (C11-02) OpenTelemetry — Semantic Conventions for GenAI Tool Execution (`execute_tool`) — https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/execute-tool.md
- **[250]** (C11-35) OpenTelemetry — Semantic Conventions for Generative AI Model Spans (`gen-ai-spans.md`) — https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md
- **[251]** (C11-08) W3C Recommendation — Trace Context — https://www.w3.org/TR/trace-context/
- **[252]** (C11-03) OpenTelemetry — Semantic Conventions for Model Context Protocol (`MCP`) — https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/mcp.md
- **[253]** (C11-04) OpenTelemetry — Semantic Conventions for Agent2Agent Protocol (`A2A`) — https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/a2a.md
- **[254]** (C11-36) OpenTelemetry Collector Contrib — Transform Processor (`OTTL`) — https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor
- **[255]** (C11-09) OpenTelemetry Documentation — Baggage — https://opentelemetry.io/docs/concepts/signals/baggage/

- **[256]** (C11-05) OpenTelemetry — Semantic Conventions for GenAI Inference Token Metrics — https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-token-metrics.md
- **[257]** (C11-06) OpenTelemetry — Semantic Conventions for Generative AI Metrics — https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-metrics.md
- **[258]** (C11-13) OpenTelemetry Collector Contrib — Tail Sampling Processor — https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/tailsamplingprocessor
- **[259]** (C11-15) Google Agent Development Kit (`ADK`) — Evaluation Criteria — https://adk.dev/evaluate/criteria/
- **[260]** (C11-23) Langfuse Documentation — Evaluation Overview — https://langfuse.com/docs/evaluation/overview
- **[261]** (C11-16) Google Agent Development Kit (`ADK`) — Environment Simulation for Evaluations — https://adk.dev/evaluate/environment_simulation/
- **[262]** (C11-19) UK AI Security Institute (`AISI`) — Inspect AI Sandboxing — https://inspect.aisi.org.uk/sandboxing.html
- **[263]** (C11-18) Model Context Protocol — MCP Inspector — https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector
- **[264]** (C11-20) Lianmin Zheng et al. (NeurIPS 2023, `arXiv:2306.05685`) — Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena — https://arxiv.org/abs/2306.05685
- **[265]** (C11-37) Yang Liu et al. (EMNLP 2023, `arXiv:2303.16634`) — G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment — https://arxiv.org/abs/2303.16634
- **[266]** (C11-22) Aman Singh Thakur et al. (`arXiv:2406.12624`) — Judging the Judges: Evaluating Alignment and Vulnerabilities in LLMs-as-Judges — https://arxiv.org/abs/2406.12624
- **[267]** (C11-21) Shreya Shankar et al. (ACM UIST 2024, `arXiv:2404.12272`) — Who Validates the Validators? Aligning LLM-Assisted Evaluation of LLM Outputs with Human Preferences — https://arxiv.org/abs/2404.12272
- **[268]** (C11-25) Evidently AI — 5 Methods to Detect Drift in ML Embeddings — https://www.evidentlyai.com/blog/embedding-drift-detection
- **[269]** (C11-28) LangChain / LangGraph Documentation — Time Travel & Checkpoints — https://docs.langchain.com/oss/python/langgraph/use-time-travel
- **[270]** (C11-27) Temporal Documentation — Testing Suite & Workflow Replay (`Replayer`) — https://docs.temporal.io/develop/python/best-practices/testing-suite
- **[271]** (C11-33) OpenAI Agents SDK (`openai-agents-python`) — Running Agents, `max_turns` & Guardrails — https://openai.github.io/openai-agents-python/running_agents/
- **[272]** (C11-34) LangChain / LangGraph Documentation — Graph API (`recursion_limit`) — https://docs.langchain.com/oss/python/langgraph/graph-api
- **[273]** (C11-31) Martin Fowler — Circuit Breaker — https://martinfowler.com/bliki/CircuitBreaker.html
- **[274]** (C12-17) FinOps Foundation — FinOps for AI Overview — https://www.finops.org/wg/finops-for-ai-overview/
- **[275]** (C12-01) Microsoft Cloud Adoption Framework — Architecture and Governance for AI Agents — https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/architecture-governance

- **[276]** (C12-05) Cloud Security Alliance (CSA) — Agentic AI Governance & NIST AI Agent Standards Mapping — https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/03/governance-nist-ai-agent-standards-agentic-governance-v1-csa-styled.pdf
- **[277]** (C12-02) Microsoft Learn — Microsoft Entra Agent ID & Agent Registry Documentation — https://learn.microsoft.com/en-us/entra/agent-id/
- **[278]** (C12-03) Bureau du surintendant des institutions financières (BSIF / OSFI) — Guideline E-23: Model Risk Management (2027) — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027
- **[279]** (C12-04) AWS Industries Blog — Mirroring Your Organization with Multi-Agent AI for FSI Risk Assessment — https://aws.amazon.com/blogs/industries/mirroring-your-organization-with-multi-agent-ai-for-fsi-risk-assessment/
- **[280]** (C12-14) NIST — AI RMF: Generative Artificial Intelligence Profile (NIST AI 600-1) — https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
- **[281]** (C12-06) LégisQuébec — Loi sur la protection des renseignements personnels dans le secteur privé (RLRQ, c. P-39.1, modifiée par la Loi 25) — https://www.legisquebec.gouv.qc.ca/fr/document/lc/P-39.1
- **[282]** (C12-10) Secrétariat du Conseil du Trésor du Canada (Portail du gouvernement ouvert) — Algorithmic Impact Assessment (Directive on Automated Decision-Making) — https://open.canada.ca/data/en/dataset/5423054a-093c-4239-85be-fa0b36ae0b2e
- **[283]** (C12-08) Commissariat à la protection de la vie privée du Canada (CPVP / OPC) — Principles for Responsible, Trustworthy and Privacy-Protective Generative AI Technologies — https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/
- **[284]** (C12-11) Commission européenne — Regulatory Framework for AI (Regulation (EU) 2024/1689) — https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- **[285]** (C12-15) Microsoft Compliance — ISO/IEC 42001:2023 Artificial Intelligence Management System (AIMS) — https://learn.microsoft.com/en-us/compliance/regulatory/offering-iso-42001
- **[286]** (C12-07) Gouvernement du Québec — Décision fondée exclusivement sur un traitement automatisé — https://www.quebec.ca/gouvernement/travailler-gouvernement/normes-gouvernance-pratiques-internes/protection-des-renseignements-personnels/technologie-et-droit-a-la-protection-des-renseignements-personnels/decision-traitement-automatise
- **[287]** (C12-09) Parlement du Canada (LEGISinfo) — Projet de loi C-27 (44e législature, 1re session) : Loi de 2022 sur la mise en œuvre de la Charte du numérique — https://www.parl.ca/legisinfo/en/bill/44-1/c-27
- **[288]** (C12-12) European Commission AI Act Service Desk — Timeline for the Implementation of the EU AI Act (including Digital Omnibus on AI) — https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act
- **[289]** (C12-13) NIST — Artificial Intelligence Risk Management Framework (AI RMF 1.0, NIST AI 100-1) — https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf
- **[290]** (C12-16) AWS Config Developer Guide — Conformance Pack for ISO/IEC 42001:2023 — https://docs.aws.amazon.com/config/latest/developerguide/managed-cpack-iso-42001-2023.html
- **[291]** (C12-19) FinOps Foundation — Unit Economics Capability — https://www.finops.org/framework/capabilities/unit-economics/
- **[292]** (C12-21) FinOps Foundation — Cost Estimation of AI Workloads — https://www.finops.org/wg/cost-estimation-of-ai-workloads/

- **[293]** (C12-23) Anthropic Claude Platform Docs — Prompt Caching — https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- **[294]** (C12-24) OpenAI API Docs — Prompt Caching — https://developers.openai.com/api/docs/guides/prompt-caching
- **[295]** (C12-27) AWS News Blog — Amazon Bedrock Intelligent Prompt Routing and Prompt Caching — https://aws.amazon.com/blogs/aws/reduce-costs-and-latency-with-amazon-bedrock-intelligent-prompt-routing-and-prompt-caching-preview/
- **[296]** (C12-25) Google AI Studio Docs — Gemini Context Caching — https://aistudio.google.com/docs/caching
- **[297]** (C12-26) Redis Blog — What is Semantic Caching? A Complete Guide — https://redis.io/blog/how-to-cache-semantic-search/
- **[298]** (C12-28) Chen, L., Zaharia, M., & Zou, J. — FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance (`arXiv:2305.05176`) — https://arxiv.org/abs/2305.05176
- **[299]** (C12-29) Ong, I. et al. (LMSYS Org) — RouteLLM: An Open-Source Framework for Cost-Effective LLM Routing — https://www.lmsys.org/blog/2024-07-01-routellm/
- **[300]** (C12-18) FinOps Foundation — FinOps Open Cost & Usage Specification (FOCUS) — https://focus.finops.org/
- **[301]** (C12-22) OpenTelemetry — Generative AI Semantic Conventions (`semantic-conventions-genai`) — https://github.com/open-telemetry/semantic-conventions-genai
- **[302]** (C12-20) FinOps Foundation — Invoicing & Chargeback Capability — https://www.finops.org/framework/capabilities/invoicing-chargeback/
- **[303]** (C12-30) Microsoft Learn — Provisioned Throughput Units (PTUs) in Azure OpenAI — https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/provisioned-throughput
- **[304]** (C12-31) Commission européenne — EU Data Act (Regulation (EU) 2023/2854) — https://digital-strategy.ec.europa.eu/en/policies/data-act
- **[305]** (C13-03) DORA (Google Cloud) — Capabilities: Platform Engineering — https://dora.dev/capabilities/platform-engineering/
- **[306]** (C13-01) CNCF TAG App Delivery — CNCF Platforms White Paper — https://tag-app-delivery.cncf.io/whitepapers/platforms/
- **[307]** (C13-02) Team Topologies — Key Concepts and Organizational Design — https://teamtopologies.com/key-concepts
- **[308]** (C13-04) Backstage (CNCF) — Software Templates (Scaffolder) — https://backstage.io/docs/features/software-templates/
- **[309]** (C13-06) Syntasso Kratix — Platform APIs and Promises Framework — https://docs.kratix.io/
- **[310]** (C13-05) Crossplane (CNCF) — Documentation v2.4 (Control Plane & Compositions) — https://docs.crossplane.io/latest/
- **[311]** (C13-07) Agent Router (ex-Envoy AI Gateway) — Capabilities Documentation (v1.3) — https://theagentrouter.ai/docs/capabilities/
- **[312]** (C13-09) LiteLLM — AI Gateway Proxy Documentation — https://docs.litellm.ai/docs/proxy/quick_start
- **[313]** (C13-08) Kubernetes SIG-Network — Gateway API Inference Extension — https://gateway-api-inference-extension.sigs.k8s.io/
- **[314]** (C13-10) vLLM — V1 Process Architecture Overview — https://docs.vllm.ai/en/latest/design/arch_overview/

- **[315]** (C13-13) llm-d (v1.0) — Distributed Kubernetes Inference Architecture — https://llm-d.ai/docs/architecture
- **[316]** (C13-11) vLLM — Automatic Prefix Caching (APC) — https://docs.vllm.ai/en/latest/features/automatic_prefix_caching/
- **[317]** (C13-12) vLLM — Disaggregated Prefilling (Experimental) — https://docs.vllm.ai/en/latest/features/disagg_prefill/
- **[318]** (C13-14) NVIDIA — NIM Operator Overview — https://docs.nvidia.com/nim-operator/latest/index.html
- **[319]** (C13-15) NVIDIA — NIM Operator: Air-Gapped Environments — https://docs.nvidia.com/nim-operator/latest/air-gap.html
- **[320]** (C13-16) OpenGitOps (CNCF) — GitOps Principles (v1.0.0) — https://opengitops.dev/
- **[321]** (C13-17) Argo CD — Core Concepts & Declarative Reconciliation — https://argo-cd.readthedocs.io/en/stable/core_concepts/
- **[322]** (C13-22) Langfuse — Prompt Management Overview — https://langfuse.com/docs/prompt-management/overview
- **[323]** (C13-23) Promptfoo — Testing Prompts with GitHub Actions — https://www.promptfoo.dev/docs/integrations/github-action/
- **[324]** (C13-24) AGNTCY — Open Agentic Schema Framework (OASF) Validation — https://docs.agntcy.org/oasf/validation/
- **[325]** (C13-25) Model Context Protocol Registry — Canonical `server.schema.json` Specification — https://raw.githubusercontent.com/modelcontextprotocol/registry/main/docs/reference/server-json/draft/server.schema.json
- **[326]** (C13-18) Open Policy Agent (OPA) — Policy-as-Code Documentation — https://www.openpolicyagent.org/docs
- **[327]** (C13-19) Conftest — Structured Configuration Policy Testing — https://www.conftest.dev/
- **[328]** (C13-20) SLSA (OpenSSF) — Provenance Specification v1.2 — https://slsa.dev/spec/v1.2/provenance
- **[329]** (C13-21) Sigstore — Cosign Keyless Signing & Transparency Log Overview — https://docs.sigstore.dev/cosign/signing/overview/
- **[330]** (C13-26) Argo Rollouts — Canary Deployment Strategy — https://argo-rollouts.readthedocs.io/en/stable/features/canary/
- **[331]** (C13-30) Kubernetes SIG-Network — Gateway API HTTP Request Mirroring — https://gateway-api.sigs.k8s.io/guides/user-guides/http-request-mirroring/
- **[332]** (C13-29) Argo Rollouts — Traffic Management & Traffic Mirroring — https://argo-rollouts.readthedocs.io/en/stable/features/traffic-management/
- **[333]** (C13-28) Argo Rollouts — AnalysisTemplate & Automated Verification — https://argo-rollouts.readthedocs.io/en/stable/features/analysis/
- **[334]** (C13-27) Argo Rollouts — BlueGreen Deployment Strategy — https://argo-rollouts.readthedocs.io/en/stable/features/bluegreen/
- **[335]** (C13-31) Temporal — Worker Versioning (Worker Deployments, Build IDs & Workflow Pinning) — https://docs.temporal.io/production-deployment/worker-deployments/worker-versioning
- **[336]** (C13-33) Restate — Immutable Deployments & Service Versioning — https://docs.restate.dev/services/versioning

- **[337]** (C13-34) Dapr — Workflow Features, Replay & Determinism — https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-features-concepts/
- **[338]** (C13-32) Temporal — Workflow Patching API — https://docs.temporal.io/patching
- **[339]** (C14-01) Temporal Documentation — High Availability (Multi-region & Multi-cloud Replication) — https://docs.temporal.io/cloud/high-availability
- **[340]** (C14-04) Temporal Documentation — Worker Versioning — https://docs.temporal.io/worker-versioning
- **[341]** (C14-05) Model Context Protocol Specification (2025-11-25) — Authorization — https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization
- **[342]** (C14-07) Agentic AI Foundation (AAIF) — agentgateway Architecture Overview — https://agentgateway.dev/
- **[343]** (C14-06) Internet Engineering Task Force (IETF) — RFC 8693: OAuth 2.0 Token Exchange — https://datatracker.ietf.org/doc/html/rfc8693
- **[344]** (C14-08) Amazon Web Services — Locking Objects with Amazon S3 Object Lock (WORM) — https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html
- **[345]** (C14-26) OpenTelemetry — Generative AI Semantic Conventions (`semantic-conventions-genai`) — https://github.com/open-telemetry/semantic-conventions-genai
- **[346]** (C14-02) Temporal Documentation — Outages and Recovery Objectives (RTO / RPO) — https://docs.temporal.io/cloud/rpo-rto
- **[347]** (C14-03) Temporal Documentation — Availability, Latency, and SLOs — https://docs.temporal.io/cloud/slo
- **[348]** (C14-09) Linux Foundation / A2A Project — Agent2Agent (A2A) Protocol Specification — https://a2a-protocol.org/latest/specification/
- **[349]** (C14-10) Linux Foundation / AGNTCY — Open Infrastructure for the Internet of Agents (OASF, ADS, SLIM) — https://docs.agntcy.org/
- **[350]** (C14-11) Solace Documentation — Data Center Replication for Disaster Recovery & Sync/Async Modes — https://docs.solace.com/Features/DR-Replication/Data-Center-Replication-Overview.md
- **[351]** (C14-12) Solace — What is an Event Mesh? (Dynamic Message Routing & Hybrid Connectivity) — https://solace.com/what-is-an-event-mesh/
- **[352]** (C14-13) Confluent Platform Documentation — Cluster Linking for Multi-Datacenter & Hybrid Replication — https://docs.confluent.io/platform/current/multi-dc-deployments/cluster-linking/index.html
- **[353]** (C14-17) Kubernetes SIG Network — Gateway API Inference Extension (`EPP` & `InferencePool`) — https://gateway-api-inference-extension.sigs.k8s.io/
- **[354]** (C14-18) CNCF `llm-d` — Distributed Kubernetes-Native LLM Inference Stack (`vLLM`) — https://llm-d.ai/
- **[355]** (C14-16) NVIDIA Confidential Computing — Confidential Containers (`CoCo`) Reference Architecture — https://docs.nvidia.com/confidential-computing/containers.md
- **[356]** (C14-21) OpenFGA (CNCF Incubating) — Fine-Grained Authorization Engine Inspired by Google Zanzibar — https://github.com/openfga/openfga
- **[357]** (C14-19) Qdrant Documentation — Multitenancy & Tenant Isolation Strategies — https://qdrant.tech/documentation/manage-data/multitenancy/
- **[358]** (C14-20) PostgreSQL Documentation — Row Security Policies (`RLS`) — https://www.postgresql.org/docs/current/ddl-rowsecurity.html

- **[359]** (C14-14) Kubernetes SIG Apps — agent-sandbox Architecture & Lifecycle Management — https://github.com/kubernetes-sigs/agent-sandbox
- **[360]** (C14-15) Firecracker MicroVM — Official Performance & Isolation Specification (`SPECIFICATION.md`) — https://github.com/firecracker-microvm/firecracker/blob/main/SPECIFICATION.md
- **[361]** (C14-22) AWS Well-Architected Framework (Reliability Pillar) — Disaster Recovery (`DR`) Objectives — https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/disaster-recovery-dr-objectives.html
- **[362]** (C14-23) Microsoft Azure Well-Architected Framework — Architecture Strategies for Disaster Recovery — https://learn.microsoft.com/en-us/azure/well-architected/reliability/disaster-recovery
- **[363]** (C14-24) FinOps Foundation — FinOps for AI Overview — https://www.finops.org/wg/finops-for-ai-overview/
- **[364]** (C14-25) Team Topologies — Key Concepts and Organizational Design — https://teamtopologies.com/key-concepts
- **[365]** (C15-01) Camunda 8 Documentation — Ad-hoc sub-processes — https://docs.camunda.io/docs/components/modeler/bpmn/ad-hoc-subprocesses/
- **[366]** (C15-05) UiPath — Business Orchestration and Automation Platform (Agentic Automation) — https://www.uipath.com/platform/agentic-automation
- **[367]** (C15-06) Salesforce MuleSoft — Agent Fabric (Agent Registry, MCP Bridge & Multi-Agent Orchestration) — https://www.salesforce.com/mulesoft/agent-fabric/
- **[368]** (C15-18) RAND Corporation (Ryseff, De Bruhl, Newberry) — The Root Causes of Failure for Artificial Intelligence Projects and How They Can Succeed (RRA2680-1) — https://www.rand.org/pubs/research_reports/RRA2680-1.html
- **[369]** (C15-25) Vivek Acharya — Governing the Agentic Enterprise: A Governance Maturity Model for Managing AI Agent Sprawl in Business Operations (AAGMM, arXiv:2604.16338) — https://arxiv.org/abs/2604.16338
- **[370]** (C15-15) Anthropic — Building effective agents — https://www.anthropic.com/research/building-effective-agents
- **[371]** (C15-22) Google Cloud Architecture Center — Choose a design pattern for your agentic AI system — https://cloud.google.com/architecture/choose-design-pattern-agentic-ai-system
- **[372]** (C15-26) Microsoft Cloud Adoption Framework — AI agent adoption strategy — https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/
- **[373]** (C15-02) Camunda 8 Documentation — AI Agent connector — https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent/
- **[374]** (C15-04) Camunda 8 Documentation — Process instance migration — https://docs.camunda.io/docs/components/concepts/process-instance-migration/
- **[375]** (C15-07) Kong Documentation — Kong AI Gateway — https://docs.konghq.com/gateway/latest/ai-gateway/
- **[376]** (C15-03) Camunda 8 Documentation — Robotic process automation (RPA) — https://docs.camunda.io/docs/components/rpa/overview/
- **[377]** (C15-08) Microsoft Learn — Power Automate Introduction to desktop flows (RPA) — https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction
- **[378]** (C15-23) AWS Well-Architected Generative AI Lens — Design principles — https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/design-principles.html

- **[379]** (C15-12) Microsoft Azure Architecture Center — Anti-Corruption Layer pattern — https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer
- **[380]** (C15-14) OpenAI — Practices for Governing Agentic AI Systems — https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf
- **[381]** (C15-28) Microsoft Cloud Adoption Framework — Architecture and governance for AI agents — https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/architecture-governance
- **[382]** (C15-29) Microsoft Cloud Adoption Framework — Operational standards for AI agents — https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/operational-standards
- **[383]** (C15-09) Martin Fowler — Strangler Fig Application — https://martinfowler.com/bliki/StranglerFigApplication.html
- **[384]** (C15-10) AWS Prescriptive Guidance — Strangler fig pattern — https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/strangler-fig.html
- **[385]** (C15-11) Microsoft Azure Architecture Center — Strangler Fig pattern — https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig
- **[386]** (C15-21) Bharani Subramaniam & Martin Fowler — Emerging Patterns in Building GenAI Products — https://martinfowler.com/articles/gen-ai-patterns/
- **[387]** (C15-13) Amazon SageMaker AI Developer Guide — Shadow tests — https://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests.html
- **[388]** (C15-27) Microsoft Cloud Adoption Framework — Organizational readiness for AI agents — https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/organizational-readiness
- **[389]** (C15-17) Cemri et al. (UC Berkeley) — Why Do Multi-Agent LLM Systems Fail? (MAST, arXiv:2503.13657) — https://arxiv.org/abs/2503.13657
- **[390]** (C15-19) Microsoft AI Red Team — New whitepaper outlines the taxonomy of failure modes in AI agents — https://www.microsoft.com/en-us/security/blog/2025/04/24/new-whitepaper-outlines-the-taxonomy-of-failure-modes-in-ai-agents/
- **[391]** (C15-20) OWASP GenAI Security Project — OWASP Top 10 for Agentic AI (ASI01–ASI10) — https://genai-security-project.github.io/crosswalk/agentic-ai-top10/
- **[392]** (C15-16) Cognition (Walden Yan) — Don’t Build Multi-Agents — https://cognition.ai/blog/dont-build-multi-agents
- **[393]** (C15-24) AWS Prescriptive Guidance — Levels in the generative AI maturity model — https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-gen-ai-maturity-model/overview-levels.html
- **[394]** (C15-30) NIST AI Resource Center — NIST AI RMF Playbook — https://airc.nist.gov/airmf-resources/playbook/

# Annexe D — Synthèse du journal d’ancrage automatisé

Chaque chapitre de l’ouvrage a été soumis au protocole d’ancrage atomique **Wyvern** sans intervention humaine. À partir d’une base fermée de sources primaires (`sources/chNN-sources.md`), chaque affirmation factuelle du manuscrit a été confrontée à sa référence pour recevoir le verdict `supporté`, `imprécis` (reformulé selon la source) ou `non supporté` (retiré ou réancré), chaque action étant consignée dans `ancrage/chNN-ancrage.md`. Le tableau consolidé suivant récapitule ces contrôles.

| Unité | Journal source | Bilan d’ancrage atomique |
| --- | --- | --- |
| Chapitre 01 | `ancrage/ch01-ancrage.md` | 8 rectification(s) tracée(s) |
| Chapitre 02 | `ancrage/ch02-ancrage.md` | 13 rectification(s) tracée(s) |
| Chapitre 03 | `ancrage/ch03-ancrage.md` | 7 rectification(s) tracée(s) |
| Chapitre 04 | `ancrage/ch04-ancrage.md` | 8 rectification(s) tracée(s) |
| Chapitre 05 | `ancrage/ch05-ancrage.md` | 5 rectification(s) tracée(s) |
| Chapitre 06 | `ancrage/ch06-ancrage.md` | 6 rectification(s) tracée(s) |
| Chapitre 07 | `ancrage/ch07-ancrage.md` | 8 rectification(s) tracée(s) |
| Chapitre 08 | `ancrage/ch08-ancrage.md` | 7 rectification(s) tracée(s) |
| Chapitre 09 | `ancrage/ch09-ancrage.md` | 7 rectification(s) tracée(s) |
| Chapitre 10 | `ancrage/ch10-ancrage.md` | 10 rectification(s) tracée(s) |
| Chapitre 11 | `ancrage/ch11-ancrage.md` | 8 rectification(s) tracée(s) |
| Chapitre 12 | `ancrage/ch12-ancrage.md` | 9 rectification(s) tracée(s) |
| Chapitre 13 | `ancrage/ch13-ancrage.md` | 8 rectification(s) tracée(s) |
| Chapitre 14 | `ancrage/ch14-ancrage.md` | 7 rectification(s) tracée(s) |
| Chapitre 15 | `ancrage/ch15-ancrage.md` | 8 rectification(s) tracée(s) |
