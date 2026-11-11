# Ouverture — Architecture et Gouvernance du Tissu Conjonctif Agentique en 2027

::: {.synthese-executive title="Portée exécutive de l'Ouverture (Cadrage du Compendium — 600 pages)"}
* **Constat fondamental** : En 2027, la performance d'une entreprise agentique ne dépend plus de la supériorité intrinsèque d'un grand modèle de langage pris isolément, mais de la robustesse du **tissu conjonctif** qui relie ses agents spécialisés, ses progiciels patrimoniaux, ses partenaires B2B, ses équipements physiques et ses superviseurs humains.
* **Thèse architecturale** : Industrialiser l'autonomie exige de conjuguer deux disciplines complémentaires — une **interopérabilité ouverte en six couches** (transport, outils, coordination entre pairs, interfaces, sémantique métier, transactions) et une **orchestration hybride** qui ancre des cellules de raisonnement probabiliste à l'intérieur de plans de contrôle déterministes, souverains et durables.
* **Usage de l'ouvrage** : Cette ouverture établit l'architecture de référence globale du compendium, fournit six parcours de lecture ciblés par fonction dirigeante ou technique, normalise l'échelle des niveaux d'autonomie (`L0` à `L4`) et pose le dossier initial de l'entreprise fil rouge (**Groupe Boréal Inc.**) suivie tout au long des 31 chapitres.
:::

## 0.1 Pourquoi ce compendium en 2027 : la fin des silos d'assistants et l'impératif du tissu conjonctif

Entre 2023 et 2025, la première vague d'adoption de l'intelligence artificielle générative en entreprise s'est organisée autour d'une figure dominante : l'assistant conversationnel synchrone. Qu'il prenne la forme d'un clavardoir interne branché sur une base documentaire par génération augmentée de récupération (*Retrieval-Augmented Generation*, RAG) ou d'un copilote intégré à une suite bureautique, ce dispositif conservait une propriété architecturale rassurante : **l'être humain demeurait l'unique bus d'intégration du système d'information**. Lorsqu'un copilote résumait un contrat, suggérait une requête SQL ou rédigeait un avis d'incident, un opérateur humain lisait la proposition à l'écran, en validait implicitement la cohérence métier, puis copiait ou saisissait lui-même la décision dans l'ERP, le CRM ou le système de gestion des services TI.

Au cours de l'année 2026, ce centre de gravité a basculé. Poussées par la recherche de gains de productivité mesurables sur des processus de bout en bout, les organisations ont franchi la frontière séparant la génération de texte de l'**exécution autonome d'actions**. Les systèmes déployés à l'horizon 2027 planifient des séquences multi-étapes, invoquent des outils externes, délèguent des sous-mandats à d'autres agents spécialisés, maintiennent un état sur plusieurs jours et écrivent directement dans des systèmes d'enregistrement (*Systems of Record*).

Or, le passage à l'échelle de ces premiers déploiements a révélé une fracture brutale entre la facilité apparente d'un prototype de laboratoire et les exigences d'ingénierie d'un système distribué d'entreprise. Trois phénomènes convergents expliquent pourquoi **l'interopérabilité** et **l'orchestration** constituent désormais la préoccupation cardinale des architectes et des directions technologiques :

1. **La prolifération d'îlots agentiques incompatibles (*Agent Sprawl*)**. Chaque grand éditeur de progiciels d'entreprise a doté sa plateforme de son propre moteur d'agents — `Salesforce Agentforce` autour de la relation client, `ServiceNow AI Agents` pour les flux opérationnels et TI, `SAP Joule` au cœur des ressources d'entreprise et de la chaîne d'approvisionnement, `Microsoft Copilot Studio` dans l'environnement collaboratif, `Workday Illuminate` pour le capital humain — tandis que les équipes d'ingénierie internes bâtissaient en parallèle des agents sur mesure sur des cadriciels variés. Sans couche d'interopérabilité normalisée, l'entreprise remplace simplement ses anciens silos applicatifs par des silos cognitifs bavards, incapables de se transmettre un contexte fiable, une identité vérifiable ou une transaction compensable.
2. **La consolidation historique des standards ouverts**. Ce qui n'était fin 2024 qu'une mosaïque de propositions propriétaires concurrentes s'est structuré, à compter de décembre 2025 et tout au long de 2026, sous une gouvernance neutre principalement hébergée par l'**Agentic AI Foundation (AAIF)** de la Linux Foundation (fédérant plus de 300 organisations membres fin 2026), en synergie avec le projet **AGNTCY**, l'Apache Software Foundation, le W3C, l'IETF et la FIDO Alliance. L'industrie dispose désormais d'une séparation architecturale claire entre la connectivité verticale aux outils et données (`Model Context Protocol`, `MCP`), la coordination horizontale entre agents pairs (`Agent2Agent`, `A2A v1.0`, dans lequel s'est fondu `ACP`), le partage sémantique métier (`Apache Ossie`), le plan de données (`agentgateway`) et l'autorisation transactionnelle (`AP2`, `x402`).
3. **L'entrée en vigueur simultanée d'exigences réglementaires et fiduciaires strictes**. L'année 2027 ferme définitivement la parenthèse de tolérance expérimentale. Au Canada, la ligne directrice **E-23 révisée du Bureau du surintendant des institutions financières (BSIF / OSFI)** sur la gestion du risque de modèle entre en vigueur le **1er mai 2027**, assujettissant explicitement les systèmes d'IA générative et agentique à un inventaire exhaustif, à une cotation de matérialité et à une validation rigoureuse du cycle de vie. Au Québec, le régime pleinement actif de la **Loi 25** encadre sévèrement les décisions exclusivement automatisées (article 12.1), les évaluations des facteurs relatifs à la vie privée (ÉFVP) et les transferts transfrontaliers de renseignements personnels, sous peine de sanctions atteignant 25 M\$ CAD ou 4 % du chiffre d'affaires mondial. En Europe, après l'activation des obligations de transparence de l'article 50 en août 2026, l'**EU AI Act** converge vers l'échéance de **décembre 2027** pour les systèmes à haut risque, tandis que la norme **ISO/IEC 42001** s'impose comme référentiel certifiable de gouvernance dans les appels d'offres B2B.

Ce compendium de 600 pages part d'un postulat d'ingénierie sans concession : **les modèles fondationnels sont devenus des composants interchangeables à obsolescence rapide, tandis que l'architecture d'interopérabilité, d'orchestration, de sémantique et de sécurité forme l'infrastructure pérenne de l'entreprise agentique**.

![Architecture de référence à 6 couches et 2 piliers transversaux de l'entreprise agentique en 2027.](manuscrit/figures/fig-00-pile-2027.svg)

La figure ci-dessus synthétise le modèle de référence qui charpente les dix parties de cet ouvrage. Plutôt que de traiter un agent comme une boîte magique autosuffisante, cette architecture décompose le système en **six couches horizontales composables** traversées de haut en bas par **deux colonnes vertébrales non négociables** : à gauche, le contrôle d'identité non humaine (`NHI`) et la sécurité Zero Trust ; à droite, l'observabilité distribuée (`OpenTelemetry gen_ai.*`), le génie logiciel probabiliste (`AgentOps`) et la gouvernance économique (`FinOps`).

---

## 0.2 L'équation économique et opérationnelle de 2027 : la poursuite et le péril du contrôle

Les analyses convergentes publiées par les grands cabinets d'évaluation technologique à l'aube de 2027 — résumées par la formule de Forrester qualifiant 2027 d'ère de *« la poursuite et du péril du contrôle »* (*The Pursuit and Peril of Control*) et par les mises en garde de Gartner sur la dérive des coûts variables — mettent en évidence un paradoxe majeur : plus les agents individuels gagnent en spécialisation et en autonomie locale, plus le système global devient vulnérable au désordre de coordination.

Trois écueils structurels menacent tout programme d'entreprise qui aborde l'orchestration multi-agents avec les habitudes du développement web traditionnel ou des premiers prototypes LLM :

* **L'effondrement de la fiabilité par composition probabiliste**. Si un agent autonome réussit une étape complexe avec une exactitude remarquable de 94 %, une chaîne séquentielle non encadrée de dix délégations successives voit sa probabilité de succès sans erreur tomber à \(0,94^{10} \approx 53,9\,\%\). Pire encore, contrairement à un microservice classique qui échoue bruyamment par une exception HTTP 500, un maillon LLM défaillant produit fréquemment une rationalisation plausible qui contamine silencieusement les agents aval (`OWASP ASI08` — *Cascading Failures*). La fiabilité d'entreprise exige par conséquent d'extraire le routage critique, les invariants d'affaires et la gestion d'état hors du prompt, pour les confier à une épine dorsale déterministe et durable.
* **L'impasse de l'interopérabilité purement syntaxique**. Normaliser le format d'échange par JSON-RPC (`MCP`) ou par descripteurs de tâches (`A2A`) résout le problème du *tuyau*, nullement celui du *sens*. Lorsqu'un agent commercial interroge un agent financier sur le « taux d'attrition trimestriel » ou l'« exposition nette d'un client », l'absence d'une couche sémantique partagée (`Apache Ossie`) et d'une ontologie causale d'entreprise engendre des décisions incohérentes mais syntaxiquement valides. L'interopérabilité réelle est indissociable de l'ingénierie du contexte (*Context Engineering*) et de la gouvernance mémorielle.
* **L'asymétrie économique et sécuritaire des boucles autonomes**. Une requête humaine mal formulée coûte quelques centimes ; une boucle de réessai mutuelle entre deux agents mal orchestrés consommant du calcul d'inférence réflexif (*test-time compute*) pendant une fin de semaine peut engloutir des dizaines de milliers de dollars et saturer les quotas d'API d'un système ERP critique. De même, confier à un agent les privilèges complets de l'utilisateur qui l'invoque transforme la moindre injection de prompt indirecte cachée dans un courriel ou un document externe en brèche d'exfiltration massive.

Le tableau suivant récapitule les sept ruptures architecturales qui séparent les pratiques héritées des prototypes 2024–2025 des standards de production 2027 détaillés dans ce compendium.

| Axe d'architecture | Pratique prototype héritée (2024–2025) | Standard de production d'entreprise (2027) | Parties de référence |
|---|---|---|---|
| **Modèle d'interaction** | Clavardage synchrone déclenché et validé manuellement par l'utilisateur | Exécution asynchrone pilotée par événements, supervisée en *Human-on-the-Loop* (`HOTL`) | Parties I & IV |
| **Intégration aux outils et pairs** | Connecteurs REST ad hoc codés en dur par cadriciel, prompts collés | Pile ouverte bi-couche : `MCP` + `Agent Skills` (vertical) et `A2A v1.0` + `AGNTCY` (horizontal) | Partie II |
| **Contexte et mémoire** | RAG vectoriel plat sur documents bruts ; historique de conversation tronqué | *Context Engineering*, sémantique `Apache Ossie`, ontologies et graphes bi-temporels (`Graphiti`) | Partie III |
| **Contrôle de flux et état** | Le LLM décide seul de l'enchaînement en mémoire vive volatile | Épine dorsale durable (`Temporal`, `Restate`), maillage `Kafka`/`Solace` et compensations `Saga` | Partie IV |
| **Patrimoine SaaS, Legacy et OT** | Agents captifs d'un seul éditeur ; systèmes sans API et ateliers ignorés | Gravité des données, plan de contrôle fédéré, `CUA` confinés et sas `OPC-UA` / Jumeau numérique | Parties V, IX & X |
| **Identité et sécurité** | Clés d'API statiques partagées ou jeton brut de l'utilisateur humain | Identités `NHI` (`SPIFFE`/`DID`), `OAuth 2.1 OBO` (`RFC 8693`), `OpenSandbox` et politiques `Cedar`/`OPA` | Parties VI & IX |
| **Opérations, coûts et conformité** | Journaux texte locaux, tests manuels sur 10 exemples, budget infonuagique global | Traces `OpenTelemetry gen_ai.*`, simulation \(\tau\)-bench (\(\text{pass}^k\)), *Cost-per-Outcome*, `ISO 42001` / `E-23` | Parties VII, VIII & X |

---

## 0.3 Parcours de lecture opérationnels par rôle

Un ouvrage de 600 pages couvrant aussi bien la négociation cryptographique de jetons `RFC 8693` que la modélisation ontologique, les espaces de données B2B ou la distillation de modèles ne se lit pas nécessairement de manière linéaire du premier au dernier chapitre. Bien que l'ordre des dix parties suive une progression logique ascendante — des fondations conceptuelles jusqu'à l'écosystème fédéré et l'auto-amélioration gouvernée —, six parcours prioritaires ont été conçus pour répondre aux mandats immédiats des décideurs et spécialistes.

### 1. Parcours CTO / CIO (Direction technologique et stratégie de plateforme)
* **Question directrice** : *Comment éviter la balkanisation de notre SI en dix plateformes d'agents concurrentes tout en maîtrisant la souveraineté, le TCO et la vélocité de livraison ?*
* **Séquence prioritaire** : **Chapitres 1, 2 et 3** (vision cible, découplage contrôle/autonomie, modèle de maturité N1–N5) → **Chapitre 4** (gouvernance AAIF et stratégie anti-verrouillage) → **Chapitre 14** (passerelles AI-natives et routage hybride `SLM`/`LLM`) → **Chapitre 15** (fédération des jardins clos SaaS) → **Chapitres 23 et 25** (FinOps *Cost-per-Outcome* et modèle *Hub-and-Spoke*) → **Chapitres 27, 29 et 31** (souveraineté / `Cognitive DR`, usine `Agentic SDLC` et distillation `LLM → SLM`).
* **Livrables directement réutilisables** : Grille d'audit de maturité, politique d'allocation budgétaire par résultat métier et fiches `ADR-001`, `ADR-004`, `ADR-015`, `ADR-023`, `ADR-027` et `ADR-031`.

### 2. Parcours Architecte d'entreprise et Architecte de solutions principales
* **Question directrice** : *Quels patrons de communication, de gestion d'état et d'intégrité transactionnelle garantissent la résilience de flux multi-agents traversant des systèmes hétérogènes et des frontières B2B ?*
* **Séquence prioritaire** : Lecture intégrale des **Parties I, II, IV, V et IX** (**Chapitres 1 à 7**, **11 à 17** et **26 à 28**), complétée par les **Chapitres 9 et 29** (`Apache Ossie`, modernisation *Strangler Fig*) et l'**Annexe A** (arbres de décision architecturale).
* **Point d'attention particulier** : Les **Chapitres 12, 13, 26 et 28** sur l'articulation entre moteurs d'exécution durable (`Temporal`, `Restate`), sagas événementielles, maillages B2B `EDC` et cellules `Edge` déconnectées à synchronisation `CRDT`.

### 3. Parcours CISO, Architecte IAM et Responsable Cybersécurité
* **Question directrice** : *Comment gouverner des milliers d'identités non humaines dynamiques, prévenir l'empoisonnement d'outils `MCP`, protéger les secrets B2B et conserver un coupe-circuit instantané ?*
* **Séquence prioritaire** : **Chapitre 2** (bornes déterministes) → **Chapitres 5 et 6** (`MCP`, `A2A` et `SLIM`/MLS) → lecture approfondie de la **Partie VI complète (Chapitres 18, 19 et 20)** → **Chapitres 26 et 27** (*Clean Rooms*, `vLEI`, enclaves GPU `TEE` et clés `HYOK`) → **Annexe B.1 et B.5**.
* **Livrables directement réutilisables** : Architecture d'échange de jetons `OAuth 2.1 OBO` à portée atténuée, matrice de couverture `OWASP ASI01–ASI10`, politique d'épinglage cryptographique des serveurs `MCP` et patron d'isolation en microVM / enclave `TEE`.

### 4. Parcours Responsable Plateforme, SRE Agentique et Ingénieur AgentOps
* **Question directrice** : *Comment instrumenter, tester avant déploiement, simuler sous chaos, réparer et distiller en continu des systèmes dont le comportement n'est pas déterministe ?*
* **Séquence prioritaire** : **Chapitres 12 et 14** (runtimes durables, `agentgateway`, ordonnancement `KV-cache`) → **Chapitre 20** (`OpenSandbox`, politiques en ligne) → **Partie VII complète (Chapitres 21, 22 et 23)** → **Chapitres 28, 30 et 31** (flottes `Edge` `TUF`, `SRE` autonome et volant de distillation `Multi-LoRA`) → **Annexe B.2 et B.3**.
* **Livrables directement réutilisables** : Schéma de télémétrie `gen_ai.*`, pipeline CI/CD `ADLC` intégrant `OpenEnv` et \(\tau\)-bench, matrice de rayon d'impact `SRE` sous `Cedar` et porte de promotion \(\text{pass}^5\) de distillation.

### 5. Parcours CDO, Architecte de Données et Ingénieur Contexte / Sémantique
* **Question directrice** : *Comment transformer nos entrepôts, graphes documentaires et couches BI en un modèle du monde cohérent, auto-protégé et non contradictoire pour tous nos agents ?*
* **Séquence prioritaire** : **Chapitre 1** (*Systems of Record* vs *Systems of Action*) → **Partie III complète (Chapitres 8, 9 et 10)** → **Chapitres 26 et 27** (`Dataspace` `ODRL` et résidence juridictionnelle) → **Chapitres 30 et 31** (*Data Contracts* `Write-Audit-Publish` et curation des jeux d'or exempts de `PII`).

### 6. Parcours Direction Juridique, Conformité, Risques et Audit Interne
* **Question directrice** : *Comment démontrer la conformité de nos agents devant le BSIF, la Commission d'accès à l'information du Québec ou les régulateurs européens, et encadrer juridiquement les actes posés par nos agents ?*
* **Séquence prioritaire** : **Ouverture (Section 0.4)** → **Chapitre 3** (gouvernance de l'IA fantôme) → **Chapitre 7** (mandats vérifiables `AP2`) → **Chapitre 18** (traçabilité nominative) → **Partie VIII complète (Chapitres 24 et 25)** → **Chapitres 26 et 27** (`vLEI`, droit de la concurrence B2B, conflits `CLOUD Act` / `Loi 25` / `E-23`) → **Annexe B.4**.

---

## 0.4 Conventions architecturales, échelle d'autonomie et rigueur épistémique

Pour éviter le flou terminologique qui mine nombre de comités d'architecture — où le même mot « agent » désigne tantôt un simple classifieur de texte, tantôt un système autonome habilité à passer des commandes fournisseurs —, tout le compendium applique une échelle normative unique en **cinq niveaux d'autonomie opérationnelle (`L0` à `L4`)**. Contrairement aux taxonomies purement cognitives, cette échelle est définie par les **droits de mutation sur le système d'information**, le **régime de supervision humaine** et les **contrôles d'infrastructure exigés**.

| Niveau | Désignation normative | Droits sur les *Systems of Record* | Régime de supervision humaine | Exigences minimales d'orchestration et d'identité |
|---|---|---|---|---|
| **L0** | **Exécution déterministe pure** (API, règle DMN, robot RPA fixe) | Lecture/écriture strictement codées d'avance, zéro inférence | Aucune en exécution nominale (audit classique) | Compte de charge de travail (`Workload Identity`), journalisation standard |
| **L1** | **Assistance consultative** (Copilote synchrone, RAG analytique) | **Lecture seule** (filtrée par les droits `ACL` de l'utilisateur) | **Humain exécuteur** : l'humain lit et saisit toute action | Jeton délégué en lecture seule, masquage PII, télémétrie de base |
| **L2** | **Automatisation sous approbation préalable** (*Human-in-the-Loop*, `HITL`) | **Préparation d'écriture** (brouillon de transaction en tampon) | **Approbation synchrone ou asynchrone explicite** avant commit | État durable (`awakeable`), identité `NHI` + `OBO`, protection anti-biais `ASI09` |
| **L3** | **Autonomie bornée sous supervision par exception** (*Human-on-the-Loop*, `HOTL`) | **Écriture directe dans une enveloppe bornée** (seuils, périmètre, quotas) | **Escalade sur seuil de risque (`CIBA`)** et audit continu | Moteur durable, patron `Saga` compensable, PDP `Cedar`/`OPA` en ligne, coupe-circuit |
| **L4** | **Orchestration inter-agents et B2B fédérée** | **Négociation et exécution multi-domaines ou inter-entreprises** | **Gouvernance par politique et mandats cryptographiques** | `A2A v1.0` signé, mandats vérifiables `AP2`, attestation `SPIFFE`/`DID`, traces non répudiables |

::: {.important title="Règle d'attribution du niveau d'autonomie dans une chaîne multi-agents"}
Lorsqu'un orchestrateur coordonne plusieurs agents spécialistes, **le niveau d'exigence sécuritaire et réglementaire de la chaîne entière est dicté par le maillon possédant l'empreinte d'action la plus élevée** (*High-Water Mark Rule*). Un agent de niveau `L1` qui transmet une synthèse non assainie à un agent de niveau `L3` fait partie intégrante du périmètre de sécurité `L3` au regard du risque de détournement d'objectif (`OWASP ASI01`) et de la conformité réglementaire (`BSIF E-23`, `EU AI Act`).
:::

### Critères d'évaluation technologique utilisés dans l'ouvrage

Chaque fois que le compendium compare des protocoles, des moteurs d'orchestration ou des architectures de mémoire (Parties II à X), l'analyse s'appuie sur cinq critères explicites plutôt que sur la popularité médiatique d'un outil :

1. **Gouvernance et neutralité fournisseur** : La spécification appartient-elle à une fondation ouverte multi-acteurs (Linux Foundation AAIF, ASF, IETF, W3C, FIDO) ou dépend-elle de la feuille de route commerciale d'un éditeur unique ?
2. **Déterminisme des frontières et auditabilité** : Peut-on reconstruire après coup, devant un auditeur interne ou un régulateur externe, l'état exact, l'identité délégante, la version de politique et les entrées qui ont conduit à une mutation ?
3. **Tolérance aux pannes et sémantique de reprise** : Que se passe-t-il concrètement si un nœud de calcul disparaît ou si une API externe expire à la septième étape d'un processus de dix étapes ?
4. **Coût marginal en latence et en jetons** : Quel est le multiplicateur d'appels LLM, la surcharge de sérialisation et l'impact sur la réutilisation du `KV-cache` lorsque le volume passe de dix requêtes par jour à dix mille par heure ?
5. **Coût de sortie (*Exit Cost*)** : Quel effort d'ingénierie faut-il fournir pour remplacer le modèle sous-jacent, changer de fournisseur infonuagique ou substituer un agent spécialiste sans réécrire le plan d'orchestration ?

### Discipline épistémique : faits vérifiés vs projections 2027

Rédiger un compendium de référence pour 2027 impose de distinguer sans ambiguïté ce qui fonctionne déjà à l'échelle industrielle de ce qui émerge. Dans l'ensemble des chapitres :

* Les **protocoles, fondations, cadres de sécurité et produits** présentés comme socles d'architecture (`MCP`, `A2A v1.0`, les dix projets initiaux de l'`AAIF`, la pile `AGNTCY`, `Apache Ossie`, `OpenTelemetry gen_ai.*`, `OWASP ASI01–ASI10`, la famille \(\tau\)-bench, `Temporal`, `Restate`, `Microsoft Agent Framework`, `Bedrock AgentCore`, `MuleSoft Agent Fabric`, `UiPath Maestro`) correspondent à des **réalités techniques vérifiées et documentées fin 2026**.
* Les **échéances juridiques** (`BSIF E-23` au 1er mai 2027, `EU AI Act` Annexe III en décembre 2027, obligations actives de la `Loi 25` et de l'article 50 européen) reposent sur les textes officiels en vigueur ; le texte signale systématiquement les zones où des guides d'application sectoriels demeurent attendus.
* Les **pratiques d'avant-garde** — au premier rang desquelles la contractualisation B2B entièrement autonome d'entreprise à entreprise via `AP2` et `x402` ou l'auto-assemblage dynamique d'essaims sans topologie pré-approuvée — sont explicitement balisées comme des **frontières émergentes**, accompagnées des verrous juridiques et prudentiels qui en limitent encore le déploiement généralisé.

---

## 0.5 Dossier initial du fil rouge : Groupe Boréal Inc.

Les concepts d'interopérabilité et d'orchestration ne révèlent leur véritable difficulté qu'au contact d'un système d'information patrimonial (*brownfield*), forgé par des décennies d'acquisitions, de dettes techniques et d'obligations légales hétérogènes. Pour éviter l'écueil des exemples jouets limités à trois fonctions Python idéalisées, les 31 chapitres de ce compendium suivent la transformation d'une entreprise de référence réaliste : **Groupe Boréal Synergie Inc. (« Groupe Boréal »)**.

::: {.fil-rouge title="Fil rouge — Dossier d'architecture initial du Groupe Boréal (T4 2026)"}
**Profil général** : Conglomérat industriel, financier et numérique dont le siège social est établi à Montréal (Québec), comptant **14 500 employés** et générant un chiffre d'affaires annuel de **6,8 G\$ CAD** en Amérique du Nord et en Union européenne.

**Structure en trois divisions opérationnelles** :
1. **Boréal Équipements & Logistique (BEL — 3,6 G\$ CAD)** : Fabrication d'équipements électromécaniques lourds (4 usines au Québec, en Ontario et en Allemagne) et distribution de pièces (9 centres logistiques). Socle technique : `SAP S/4HANA` (avec `SAP Joule`), exécution manufacturière `Siemens Opcenter`, automates d'atelier exposés en `OPC-UA` et `MQTT`, courtiers d'événements `Confluent Kafka` et `Solace PubSub+`, partenaires logistiques raccordés en `EDI X12`.
2. **Boréal Capital & Assurances (BCA — 1,9 G\$ CAD)** : Financement d'équipements, crédit-bail commercial et assurance bris de machine. Filiale assujettie à la supervision fédérale canadienne du **BSIF (ligne directrice E-23 applicable au 1er mai 2027)** et traitant des renseignements personnels soumis à la **Loi 25**. Socle technique : système central de contrats et d'indemnisation sur **`IBM i (AS/400)`** dépourvu d'API REST modernes, `Guidewire`, `Workday`, entrepôt analytique `Snowflake` et annuaire `Microsoft Entra ID`.
3. **Boréal Services Numériques (BSN — 1,3 G\$ CAD)** : Plateforme infonuagique B2B de télématique industrielle et de maintenance prédictive reliant 180 000 machines déployées chez 22 000 entreprises clientes au Canada, aux États-Unis et en Europe (soumise à l'**EU AI Act** pour ses modules prédictifs et d'assistance). Socle technique : `Salesforce Sales/Service Cloud` (`Agentforce`), `ServiceNow ITSM/FSM`, `Microsoft Copilot Studio` dans Teams, et grappe Kubernetes interne hébergeant des services analytiques et des modèles ouverts.

**L'état de crise à l'automne 2026 (Point zéro du Compendium)** :
Un audit conjoint Architecture–Sécurité diligenté après deux incidents majeurs recense **47 initiatives agentiques disparates** à travers les trois divisions, dont 19 déployées hors de tout contrôle TI (*Shadow Agents*) :
* *Incident financier* : Un agent expérimental de rapprochement d'achats chez BEL est entré dans une boucle de réessai mutuelle avec un extracteur documentaire suite à un changement de format de facture fournisseur, consommant **41 200 \$ CAD** d'inférence de modèle de raisonnement en onze heures avant détection manuelle le lundi matin.
* *Incident de conformité* : Un assistant de pré-qualification de dossiers chez BCA s'exécutait au moyen d'un compte de service statique possédant des privilèges de lecture sur des tables de sinistres hors périmètre, sans journalisation de l'employé donneur d'ordre — une lacune incompatible avec la piste d'audit exigée par la `Loi 25` et par l'échéance `BSIF E-23`.
* *Paralysie opérationnelle inter-silos* : Lorsqu'une sonde télématique BSN détecte une dérive vibratoire critique sur un compresseur industriel sous contrat, quatre agents locaux existent déjà (diagnostic BSN, billetterie `ServiceNow`, contrat BCA, stock `SAP`), mais **aucun ne peut coopérer avec les autres**. Trois coordonnateurs humains passent en moyenne **46 heures** à recopier des numéros de série entre quatre écrans pour valider la garantie, réserver la pièce et dépêcher un technicien certifié.

**Le mandat 2027** : Le comité exécutif confie à l'architecte en chef la conception de la **Fabrique Agentique Boréal** (*Boréal Agentic Fabric*), avec trois objectifs chiffrés à douze mois : ramener le délai de bout en bout d'une intervention prédictive sous **25 minutes** en autonomie supervisée `L3`, réduire de **55 %** le coût d'inférence par dossier traité, et réussir l'homologation réglementaire croisée `BSIF E-23` / `Loi 25` / `ISO/IEC 42001` avant le deuxième trimestre 2027.
:::

Chaque chapitre de ce compendium prendra appui sur une brique précise de ce chantier pour illustrer, schémas et contrats de code à l'appui, comment transformer un archipel de prototypes fragiles en une architecture d'entreprise interopérable, résiliente et gouvernée.

---

## 0.6 Cartographie synthétique des standards, protocoles et cadres de référence 2027

L'un des obstacles majeurs rencontrés par les équipes d'architecture en 2026–2027 tient à la densité acronymique d'un écosystème qui s'est structuré à grande vitesse. Pour offrir dès cette ouverture une boussole stable, le tableau de référence ci-dessous positionne les **dix-huit standards techniques, cadres de sécurité et régimes réglementaires** qui traversent le compendium, en précisant leur organisme de gouvernance neutre, leur rôle exact dans la pile à six couches et les chapitres où leur implémentation est détaillée.

| Standard / Cadre | Organisme de tutelle (fin 2026) | Couche principale | Fonction architecturale exacte | Chapitres clés |
|---|---|---|---|---|
| **`MCP`** (*Model Context Protocol*) | Linux Foundation (`AAIF`) | Couche 1 (Vertical) | Protocole JSON-RPC 2.0 normalisant l'accès des modèles et agents aux outils, ressources documentaires et invites métiers | Chap. 1, 5, 19, 28, 29 |
| **`Agent Skills` & `AGENTS.md`** | Linux Foundation (`AAIF`) | Couche 1 (Vertical) | Formats ouverts d'empaquetage modulaire de compétences exécutables et de consignes contextuelles de dépôt | Chap. 4, 5, 22, 29 |
| **`Open Responses`** | Linux Foundation (`AAIF`) | Couche 1 (Inférence) | Spécification d'API partagée normalisant les sorties structurées et événements d'inférence entre fournisseurs de modèles | Chap. 4, 5, 14, 27 |
| **`WebMCP`** | Écosystème Web / W3C CG | Couche 1 (Web) | Exposition native d'outils et de contexte structuré par les applications web directement au navigateur et aux agents | Chap. 5, 16 |
| **`agentgateway` & `Agent Router`** | Linux Foundation (`AAIF`) | Couche 1 (Plan de données) | Passerelles AI-natives unifiant le routage multi-LLM, le multiplexage `MCP`, le proxy `A2A` et les politiques de débit | Chap. 4, 14, 20, 27, 31 |
| **`Apache Ossie`** (*OSI*) | Apache Software Foundation | Couche 2 (Sémantique) | Standard ouvert d'échange sémantique unifiant définitions de métriques, dimensions et relations ontologiques | Chap. 8, 9, 15, 30 |
| **`A2A v1.0`** (*Agent2Agent*, incl. `ACP`) | Linux Foundation (`AAIF`) | Couche 3 (Horizontal) | Protocole pair-à-pair de découverte (`Agent Cards`), délégation asynchrone de tâches et partage d'artefacts inter-agents | Chap. 1, 4, 6, 15, 26 |
| **`AGNTCY` (`OASF`, `SLIM`, *Directory*)** | Linux Foundation | Couche 3 (Réseau) | Schéma descriptif universel de capacités (`OASF`), annuaire fédéré et messagerie basse latence chiffrée MLS (`SLIM`) | Chap. 4, 6, 26 |
| **`AG-UI` & `A2UI` / `MCP-UI`** | Communautés Open Source | Couche 5 (Interface) | Flux bidirectionnel d'événements d'état agentique (`AG-UI`) et génération déclarative sécurisée de composants UI (`A2UI`) | Chap. 7, 25 |
| **`OPC-UA` & `MQTT Sparkplug`** | OPC Foundation / Eclipse | Couche 1 & 4 (`IT/OT`) | Protocoles industriels normalisés permettant l'exploration sémantique et la télémétrie temps réel des équipements d'usine | Chap. 1, 17, 28 |
| **`OAuth 2.1 OBO`, `RFC 8693` & `CIBA`** | IETF / OpenID Foundation | Transversal (Identité) | Échange de jetons délégués à portée atténuée (`sub`/`act`) et authentification hors bande asynchrone pour actions critiques | Chap. 18, 20, 30 |
| **`SPIFFE / SPIRE` & `W3C DIDs / VCs`** | CNCF (LF) / W3C | Transversal (Identité) | Attestation cryptographique d'identité machine (`NHI`) et justificatifs vérifiables de provenance ou de mandat | Chap. 7, 18, 26, 28 |
| **`OWASP ASI01–ASI10`** | Fondation OWASP | Transversal (Sécurité) | Taxonomie de référence des dix risques critiques propres aux applications agentiques autonomes et multi-agents | Chap. 19, 20, 25, 31 |
| **`OpenSandbox` & `OpenEnv`** | Linux Foundation (`AAIF`) | Sécurité & `AgentOps` | Exécution isolée sécurisée du code/outils (`OpenSandbox`) et environnements standardisés d'évaluation/RL (`OpenEnv`) | Chap. 20, 22, 29 |
| **`OpenTelemetry (gen_ai.*)`** | CNCF (Linux Foundation) | Transversal (`AgentOps`) | Conventions sémantiques neutres pour tracer de bout en bout appels de modèles, jetons, outils `MCP` et graphes `A2A` | Chap. 21, 23, 30, 31 |
| **`AP2` & `x402`** | FIDO Alliance / LF (`x402`) | Couche 6 (Commerce) | Mandats cryptographiques d'intention et de panier (`AP2`) couplés au règlement financier natif sur code HTTP 402 (`x402`) | Chap. 7, 24, 26 |
| **`ISO/IEC 42001` & `NIST AI RMF`** | ISO/IEC / NIST | Couche 6 (Gouvernance) | Système de management de l'IA certifiable en amélioration continue (PDCA) et référentiels de maîtrise des risques d'agents | Chap. 24, 25 |
| **`EU AI Act`, `BSIF E-23` & `Loi 25`** | UE / BSIF Canada / Québec | Couche 6 (Réglementaire) | Obligations légales contraignantes de transparence, gestion du risque de modèle (1er mai 2027), ÉFVP et supervision humaine | Chap. 1, 24, 27, 31 |

### Articulation logique des dix parties du compendium

La progression des chapitres qui suivent obéit à un principe d'ingénierie simple : **on ne peut orchestrer durablement que ce qui est sémantiquement et protocolairement interopérable, et on ne peut mettre en production à grande échelle que ce qui est cryptographiquement identifié, observable, souverain et économiquement borné**.

* Les **Parties I à III (Chapitres 1 à 10)** construisent le *modèle anatomique, protocolaire et sémantique* : elles définissent les acteurs, découplent le contrôle déterministe de l'inférence probabiliste, déploient la pile ouverte `MCP` / `A2A` / `AGNTCY` / `AG-UI` et résolvent l'alignement du sens métier via `Apache Ossie` et la mémoire bi-temporelle.
* Les **Parties IV et V (Chapitres 11 à 17)** bâtissent le *moteur d'exécution et d'intégration au réel* : topologies d'orchestration et de chorégraphie, exécution durable multi-jours (`Temporal`, `Restate`), sagas événementielles à compensation (`Kafka`, `Solace`), passerelles AI-natives à routage `SLM`/`LLM`, puis fédération concrète des suites SaaS (`Agentforce`, `ServiceNow`, `SAP Joule`, `Copilot Studio`), des écrans patrimoniaux sans API (`CUA`) et des ateliers industriels (`OPC-UA`, jumeaux numériques).
* Les **Parties VI à VIII (Chapitres 18 à 25)** verrouillent *l'exploitabilité industrielle, sécuritaire, financière et juridique* : identités non humaines Zero Trust, défense active contre `OWASP ASI01–ASI10`, observabilité `OpenTelemetry`, homologation par simulation \(\tau\)-bench et ingénierie du chaos, FinOps orienté *Cost-per-Outcome*, conformité réglementaire 2027 et modèle organisationnel du Centre d'Excellence Agentique.
* Les **Parties IX et X (Chapitres 26 à 31)** projettent l'architecture *au-delà des frontières de l'entreprise puis vers la méta-ingénierie continue* : maillages B2B inter-entreprises (`Dataspace` `EDC` / `ODRL`, `vLEI`, *Clean Rooms*), souveraineté cognitive et `Cognitive DR`, cellules `Edge` déconnectées et robotique `ROS 2` sous architecture `Simplex`, puis usine logicielle `Agentic SDLC` de modernisation patrimoniale, `Agentic DataOps`/`SRE` et volant d'inertie de distillation `LLM → SLM`.

Ouvrons maintenant la **Partie I** pour établir les fondations architecturales de cette main-d'œuvre numérique d'exécution asynchrone.
