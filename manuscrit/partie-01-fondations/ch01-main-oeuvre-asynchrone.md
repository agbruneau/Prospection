# Chapitre 1 — De l'assistance conversationnelle à la main-d'œuvre d'exécution asynchrone

::: {.synthese-executive title="Synthèse exécutive — Chapitre 1"}
* **Enjeu stratégique** : Les assistants conversationnels synchrones (génération 2023–2024) plafonnent à des gains de productivité individuelle marginaux de 5 à 12 %, car ils laissent à l'employé humain la charge intégrale de coordonner les applications, de vérifier les règles d'affaires et d'exécuter les saisies inter-systèmes. Franchir un palier de transformation exige de passer à une **main-d'œuvre numérique d'exécution asynchrone** intégrée aux flux d'événements de l'entreprise.
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Superposer une strate explicite de **System of Action** au-dessus des *Systems of Record* existants (ERP, CRM, cœurs patrimoniaux) plutôt que d'enfouir une logique d'orchestration propriétaire à l'intérieur d'un seul progiciel.
  2. *Structurante dès le jour 1* : Imposer la séparation fonctionnelle en cinq archétypes d'acteurs (interface, spécialiste de domaine, travailleur de tâche, orchestrateur, méta-gouverneur) et interdire le modèle du « super-agent » universel.
  3. *Réversible par conception* : Le choix des modèles fondationnels (`LLM` frontières ou `SLM` spécialisés) derrière chaque agent, à condition d'isoler leurs contrats par `MCP` (outils) et `A2A v1.0` (pairs).
* **Indicateurs de gouvernance associés** : Délai de traversée de bout en bout (*Lead Time* processus), taux de résolution autonome sans reprise manuelle (*Straight-Through Agentic Processing*), taux d'escalade pertinente en *Human-on-the-Loop* (`HOTL`), et **coût complet par résultat métier validé (*Cost-per-Outcome*)**.
:::

## 1.1 Anatomie évolutive (2023–2027) : pourquoi le paradigme du copilote plafonne en entreprise

L'histoire industrielle de l'informatique d'entreprise montre qu'une technologie de rupture commence systématiquement par imiter le média qu'elle remplace avant de trouver sa forme native. Les premières bases de données relationnelles furent d'abord utilisées comme des fichiers séquentiels indexés ; les premières applications web reproduisaient des formulaires papier statiques. De la même manière, entre 2023 et 2025, l'adoption initiale des grands modèles de langage s'est presque exclusivement coulée dans le moule du **clavardage synchrone** : une boîte de dialogue latérale greffée aux outils bureautiques, aux portails intranet ou aux consoles de service client.

Ce modèle du copilote conversationnel a permis d'acculturer rapidement des millions de travailleurs du savoir, mais il s'est heurté dès 2025 à un plafond structurel de création de valeur que les directions financières ont fini par documenter : **accélérer la rédaction d'un courriel ou la synthèse d'une note interne ne réduit pas le temps de cycle d'un processus métier qui passe 92 % de sa durée en files d'attente inter-départementales, en vérifications de conformité et en rapprochements de données entre quatre progiciels incompatibles**.

Pour comprendre les exigences architecturales de 2027, il faut analyser avec précision les limites techniques qui ont conduit le marché à travers trois générations successives d'architectures.

![Basculement architectural de la Génération 1 (copilote synchrone centré interface) vers la Génération 3 (maillage d'exécution asynchrone gouverné).](manuscrit/figures/fig-01-evolution-acteurs.svg)

### Génération 1 (2023–2024) : Le copilote synchrone et le syndrome du « presse-papiers humain »

Dans une architecture de première génération, l'interaction obéit à une boucle requête-réponse bloquante initiée par un utilisateur devant son écran. Le système combine une consigne système (*system prompt*), l'historique immédiat de la session et quelques fragments textuels extraits d'une base vectorielle par similarité cosinus (RAG naïf).

Trois propriétés condamnent cette architecture dès qu'on tente de l'appliquer à des opérations critiques :

1. **Couplage temporel à l'attention humaine** : Rien ne se produit tant qu'un employé n'ouvre pas la fenêtre de dialogue, et l'exécution s'interrompt dès qu'il ferme son navigateur. Or, la vie opérationnelle d'une entreprise est gouvernée par des événements asynchrones — rupture de stock à 2 h du matin, alerte de capteur industriel, expiration d'un délai contractuel, réception d'un avis de règlement EDI — qui exigent une prise en charge immédiate sans présence humaine préalable.
2. **Cécité transactionnelle et intégration par copier-coller** : Limité à la lecture documentaire pour éviter les erreurs d'écriture, le copilote délègue à l'opérateur humain la traduction de sa recommandation textuelle en transactions dans `SAP`, `Salesforce` ou `ServiceNow`. L'humain sert de convertisseur manuel entre du texte non structuré et des formulaires structurés, réintroduisant délais, erreurs de saisie et fatigue cognitive.
3. **Amnésie d'état et absence de redevabilité** : Chaque conversation repart d'une feuille quasi blanche. Aucune machine à états ne garantit que deux employés posant le même problème à deux heures d'intervalle appliqueront la même politique d'entreprise.

### Génération 2 (2025) : L'agent monolithique outillé et le mur de complexité

La deuxième génération a doté le modèle de langage de capacités d'appel de fonctions (*tool calling*) et d'une boucle autonome de type *ReAct* (*Reason + Act*). Un agent unique recevait un objectif, observait le résultat d'un premier appel d'API, puis décidait du prochain appel jusqu'à complétion supposée. Parallèlement, les grands éditeurs SaaS ont lancé leurs premiers agents natifs à l'intérieur de leurs frontières applicatives respectives.

En production, cette approche monolithique s'est brisée sur quatre murs d'ingénierie :

* **Dégradation cognitive par surcharge d'outils (*Tool Overload*)** : Dès qu'un agent unique se voit exposer plus de quinze à vingt-cinq définitions d'outils hétérogènes aux schémas JSON complexes, la précision de sélection d'outil et de remplissage des paramètres chute fortement, tandis que la consommation de jetons de contexte explose à chaque tour de boucle.
* **Fragilité en mémoire vive volatile** : Exécutée dans un processus applicatif ordinaire (conteneur HTTP ou fonction sans serveur à durée de vie limitée), une boucle agentique qui échoue au huitième tour à cause d'une expiration réseau (`HTTP 504`) perd son fil d'exécution ou, en cas de réessai aveugle, réexécute des actions non idempotentes déjà commises aux tours précédents.
* **Sur-privilégiation systémique** : Pour qu'un seul agent puisse traiter un dossier de bout en bout, les équipes lui accordaient l'union de toutes les permissions nécessaires à l'ensemble des étapes (lecture CRM + écriture ERP + envoi de courriel externe), créant un rayon d'explosion maximal en cas d'injection de prompt (`OWASP ASI03`).
* **Enfermement en silos éditeurs** : Un agent construit dans le studio d'un éditeur CRM excellait sur ses objets natifs, mais devenait aveugle dès que la résolution exigeait d'inspecter un automate d'usine ou un système central d'assurance externe.

### Génération 3 (2026–2027) : La main-d'œuvre multi-agents asynchrone, durable et fédérée

L'architecture de troisième génération, objet de ce compendium, abandonne l'illusion du modèle omniscient au profit des principes éprouvés des systèmes distribués critiques adaptés au raisonnement probabiliste. Le travail est réparti entre des **agents étroitement spécialisés** coordonnés par des **protocoles ouverts** (`MCP` vers les outils, `A2A v1.0` entre pairs), soutenus par un **moteur d'exécution durable** qui persiste chaque transition d'état, et supervisés par l'humain **sur exception quantifiée** (*Human-on-the-Loop*, `HOTL`).

Le tableau ci-dessous formalise les différences d'ingénierie entre ces trois générations.

| Dimension technique | Gén. 1 : Copilote RAG (2023–2024) | Gén. 2 : Agent monolithique (2025) | Gén. 3 : Fabrique multi-agents (2026–2027) |
|---|---|---|---|
| **Déclencheur primaire** | Requête humaine interactive | Requête humaine ou tâche planifiée simple | Événement métier (`Kafka`/`Solace`), alerte `OT`, webhook, délégation `A2A` ou intention humaine |
| **Portée d'exécution** | Tour par tour, quelques secondes | Boucle unique en mémoire (secondes à minutes) | Asynchrone durable : secondes, heures ou semaines avec mise en veille (`scale-to-zero`) |
| **Topologie cognitive** | 1 modèle généraliste + index vectoriel | 1 grand modèle + 20 à 50 outils en vrac | Flotte spécialisée : routage hybride `SLM` + `LLM` de raisonnement (< 12 outils cohérents par agent) |
| **Gestion des pannes** | Message d'erreur affiché à l'utilisateur | Perte d'état ou doublons d'effets de bord | Journalisation déterministe (`Temporal`/`Restate`), clés d'idempotence et compensation `Saga` |
| **Interopérabilité** | Copier-coller manuel par l'opérateur | Adaptateurs propriétaires par cadriciel | Bi-couche normalisée AAIF : `MCP` (vertical) + `A2A v1.0` / `AGNTCY` (horizontal) |
| **Identité et accès** | Session interactive de l'utilisateur | Clé d'API statique ou compte de service global | Identité `NHI` (`SPIFFE`/`DID`) + délégation `OAuth 2.1 OBO` (`RFC 8693`) à portée atténuée |
| **Rôle de l'humain** | Exécuteur et validateur à 100 % | Approbateur `HITL` fréquent (goulot) | Superviseur `HOTL` sur seuil de risque (`CIBA`) et propriétaire métier de la politique |
| **Unité de pilotage FinOps** | Licence mensuelle par siège (*per-seat*) | Facture brute de jetons d'API | **Coût complet par résultat métier validé (*Cost-per-Outcome*)** plafonné par saga |

---

## 1.2 Taxonomie fonctionnelle des acteurs numériques en entreprise

Une erreur récurrente lors du cadrage d'un programme agentique consiste à traiter tous les agents comme des entités architecturalement identiques ne différant que par leur consigne système. En réalité, tout comme une architecture de microservices distingue les passerelles d'entrée, les services métiers transactionnels, les travailleurs asynchrones et les contrôleurs de sécurité, une entreprise agentique mature repose sur **cinq archétypes fonctionnels distincts**. Chacun possède des contraintes propres de latence, de choix de modèle, de droits d'identité et de protocoles.

### 1. Agents d'interface et de médiation (*Experience & Triage Agents*)
Positionnés à la périphérie directe des canaux humains (portails web réactifs via `AG-UI` et `A2UI`, clients collaboratifs d'entreprise, lignes vocales temps réel sur `WebRTC`), ces agents ont pour unique mission de capter l'intention, de désambiguïser la demande avec courtoisie, de maintenir la fluidité conversationnelle (souvent sous les 500 millisecondes de *Time-to-First-Token*) et de restituer l'état d'avancement.
* **Invariant architectural strict** : Un agent d'interface est directement exposé aux entrées non fiables des utilisateurs externes ou internes ; à ce titre, **il ne détient jamais de connecteur direct d'écriture vers un système d'enregistrement**. Il émet exclusivement des intentions structurées vers le plan d'orchestration ou invoque des pairs via `A2A` après filtrage de sécurité.

### 2. Agents spécialistes de domaine (*Domain Specialist Agents*)
Ce sont les piliers métiers de l'entreprise agentique : *Agent Conformité Garantie*, *Agent Planification Stocks SAP*, *Agent Diagnostic Vibratoire*, *Agent Rapprochement Comptable*. Conformément au principe de **gravité des données**, chaque spécialiste réside au plus près du domaine métier qu'il maîtrise, s'appuie sur l'ontologie de ce domaine (`Apache Ossie`) et ne manipule qu'un ensemble resserré de cinq à douze outils `MCP` hautement cohérents.
* **Invariant architectural strict** : Un spécialiste de domaine publie ses capacités sur l'annuaire interne via une `Agent Card A2A v1.0` versionnée et exige, à chaque invocation, un jeton `OAuth 2.1` dont la portée correspond exactement à l'opération demandée. Il ignore tout des interfaces graphiques finales et des autres divisions non pertinentes à son mandat.

### 3. Agents de tâche et d'extraction (*Task & Micro-Execution Workers*)
Souvent invisibles de l'extérieur, ces travailleurs éphémères accomplissent des opérations cognitives atomiques à fort volume : extraire les clauses pénales d'un contrat PDF complexe, normaliser une nomenclature d'ingénierie mal formatée, classifier la sévérité d'un journal d'erreur ou traduire une alerte technique.
* **Invariant architectural strict** : Sans état persistant entre deux appels (*stateless*), ils sont exécutés par défaut sur des **petits modèles de langage spécialisés (`SLM`)** hébergés à faible coût (voire localement pour des raisons de confidentialité), réservant l'escalade vers un modèle frontière aux seuls cas où leur score de confiance calibré tombe sous un seuil prédéfini.

### 4. Agents orchestrateurs et planificateurs (*Orchestrator & Planner Agents*)
Lorsqu'un objectif transversal ne peut être résolu par une séquence figée connue d'avance — par exemple réorganiser un plan d'approvisionnement suite à la fermeture soudaine d'un port maritime —, un agent planificateur décompose le problème en graphe de sous-tâches, sélectionne les agents spécialistes appropriés via le registre `OASF`/`A2A`, synthétise leurs retours partiels et adapte le plan face aux imprévus.
* **Invariant architectural strict** : L'orchestrateur cognitif propose et révise le plan, mais **l'exécution du graphe, les délais d'attente, le suivi budgétaire et la persistance d'état sont gouvernés par un moteur d'exécution durable déterministe** (`Temporal`, `Restate`, `Microsoft Agent Framework`). L'orchestrateur n'appelle pas directement les bases de données sous-jacentes : il délègue aux spécialistes.

### 5. Méta-gouverneurs et agents critiques (*Policy, Critic & Audit Agents*)
Placés en coupure ou en observation parallèle sur les flux sensibles (`L3` et `L4`), ces acteurs évaluent les plans et les sorties produits par d'autres agents avant engagement irréversible : vérification de cohérence factuelle par rapport aux pièces sources (détection d'hallucination), contrôle du respect du mandat commercial, détection de tentatives de manipulation sociale visant un approbateur humain (`OWASP ASI09`).
* **Invariant architectural strict** : Un agent critique ne remplace jamais une règle déterministe programmable en `Cedar` ou `OPA` (comme un plafond monétaire de 10 000 \$ CAD, qui doit toujours être vérifié par du code déterministe infaillible) ; il complète ces règles déterministes sur les dimensions sémantiques nuancées qui échappent aux expressions booléennes classiques, et utilise un modèle issu d'une famille distincte de celle de l'agent évalué pour éviter les angles morts corrélés.

| Archétype d'acteur | Profil de modèle cible | Protocoles principaux | Niveau d'autonomie | Risque principal à confiner |
|---|---|---|---|---|
| **1. Interface & Médiation** | Modèle rapide multimodal / temps réel | Entrée : `AG-UI`, `A2UI`, `WebRTC` ; Sortie : `A2A` | `L1` (aucune écriture directe) | Injection de prompt directe (`ASI01`), fuite de contexte en sortie |
| **2. Spécialiste de domaine** | `SLM` affiné domaine ou `LLM` intermédiaire | Entrée : `A2A v1.0` ; Sortie : `MCP` (5–12 outils) | `L2` à `L3` borné | Abus d'outils (`ASI02`), empoisonnement de serveur `MCP` (`ASI04`) |
| **3. Travailleur de tâche** | `SLM` compact haute cadence (lot / flux) | Appel interne RPC / file `Kafka` + schéma JSON strict | `L0` / `L1` sans état | Dérive silencieuse de qualité d'extraction sur nouveaux formats |
| **4. Orchestrateur cognitif** | `LLM` de raisonnement (*test-time compute*) | Entrée : Événement / `A2A` ; Sortie : `A2A` sous runtime durable | `L3` à `L4` encadré | Boucles coûteuses, défaillances en cascade (`ASI08`), escalade privilèges |
| **5. Méta-gouverneur / Critique** | Modèle indépendant + moteur `Cedar`/`OPA` | Inspection en ligne passerelle (`agentgateway`) / `HOTL` | Droit de veto et d'escalade | Faux négatifs par collusion de biais avec le modèle producteur |

::: {.encadre-sectoriel title="Secteur Financier — Qualification des archétypes sous la ligne directrice BSIF E-23 (1er mai 2027)"}
Pour les banques, assureurs et sociétés de fiducie sous réglementation fédérale canadienne, l'entrée en vigueur le **1er mai 2027** de la ligne directrice **E-23 révisée du BSIF (Gestion du risque de modèle)** transforme directement cette taxonomie architecturale en outil de conformité prudentielle.

Dans un système monolithique où un seul « super-agent » interagit avec le client, évalue le risque de crédit et déclenche la mise en place contractuelle, **l'intégralité du composant hérite de la cote de matérialité maximale**, imposant une validation indépendante lourde à chaque modification mineure du prompt d'accueil. À l'inverse, découper l'architecture selon les cinq archétypes permet :
1. **D'isoler la matérialité du risque de modèle** : l'*Agent d'interface* (`L1`) et le *Travailleur d'extraction documentaire* reçoivent une cote de risque modérée avec un cycle d'évolution agile, tandis que l'*Agent spécialiste d'octroi ou d'indemnisation* (`L2`/`L3`) fait l'objet d'une gouvernance E-23 complète (documentation des hypothèses, tests de stabilité \(\text{pass}^k\), surveillance de dérive).
2. **D'appliquer nativement la séparation des tâches (*Segregation of Duties*, SoD)** : en associant des identités `NHI` distinctes à l'agent qui propose un règlement et au méta-gouverneur (ou superviseur humain `HOTL`) qui l'autorise, l'institution prouve cryptographiquement qu'aucun composant probabiliste unique ne peut simultanément instruire et décaisser un dossier.
:::

---

## 1.3 Du *UI-First* au *System of Action* : refonder la stratigraphie du système d'information

Pendant deux décennies, l'urbanisation des systèmes d'information d'entreprise s'est appuyée sur la stratification popularisée par Gartner : à la base, les **Systems of Record** (ERP, grand livre comptable, SIRH, référentiels maîtres) garants de l'intégrité transactionnelle ACID ; au milieu, les **Systems of Differentiation** hébergeant les processus propres à l'entreprise ; au sommet, les **Systems of Engagement** (portails web, applications mobiles, outils collaboratifs) optimisés pour l'interaction humaine.

Dans cette architecture dite *UI-First*, chaque système d'enregistrement a été pensé autour de l'hypothèse implicite qu'un être humain dûment authentifié cliquerait sur une suite d'écrans pour accomplir une transaction. Même lorsque des API REST furent ajoutées, elles reflétaient bien souvent la structure granulaire des écrans (vingt appels `GET` et `PATCH` successifs sur des tables normalisées pour modifier une commande complexe).

En 2027, l'avènement de l'entreprise agentique insère une nouvelle strate horizontale décisive entre les systèmes d'engagement et les systèmes d'enregistrement : le **System of Action** (ou fabrique d'exécution agentique).

![Superposition du System of Action (Fabrique Agentique Boréal) sur les Systems of Record des trois divisions opérationnelles.](manuscrit/figures/fig-01-system-of-action.svg)

Pour que cette superposition demeure saine, évolutive et auditable sur dix ans, l'architecte d'entreprise doit faire respecter **trois lois d'ingénierie fondamentales**.

### Loi 1 : Inviolabilité des invariants des *Systems of Record*
Un agent ne doit jamais contourner la couche de validation métier d'un système d'enregistrement en écrivant directement dans ses tables relationnelles sous-jacentes. Si `SAP S/4HANA` ou `Guidewire` impose treize contrôles d'intégrité comptable et fiscale lors de l'émission d'un avoir, le serveur `MCP` exposant cette capacité doit invoquer l'API transactionnelle officielle (BAPI, OData métier ou service de domaine) afin que les invariants déterministes du progiciel s'appliquent intégralement. Le *System of Action* orchestre et décide *quoi* demander ; le *System of Record* demeure le gardien ultime de la cohérence interne de son registre.

### Loi 2 : Orthogonalité stricte entre `MCP` (vertical) et `A2A` (horizontal)
L'une des confusions architecturales les plus fréquentes en début de projet consiste à exposer un agent autonome complexe comme un simple « outil `MCP` » d'un autre agent, ou inversement à envelopper une simple requête SQL dans un serveur `A2A`. La règle de séparation issue de la pile **Linux Foundation AAIF** est pourtant sans équivoque :

* **Utiliser `MCP` (*Model Context Protocol*) pour la connectivité verticale déterministe ou semi-structurée** : lorsqu'un agent a besoin d'invoquer une fonction typée, de lire une ressource documentaire ou d'exécuter une action bornée à comportement prévisible (rechercher un contrat, réserver une pièce en stock, calculer un tarif). Le serveur `MCP` ne négocie pas d'objectif ouvert ; il exécute une primitive documentée.
* **Utiliser `A2A v1.0` (*Agent2Agent Protocol*) pour la délégation horizontale d'objectifs entre pairs autonomes** : lorsqu'un agent confie un sous-problème nécessitant lui-même du raisonnement multi-étapes, une gestion d'état asynchrone potentiellement longue, une négociation de modalités ou le franchissement d'une frontière organisationnelle et de sécurité (par exemple demander à la division financière d'instruire une exception de garantie complexe).

### Loi 3 : Tout appel mutatif circule dans une enveloppe d'action idempotente et budgétée
Dans un graphe multi-agents distribué soumis aux coupures réseau, aux expirations de jetons et aux réessais des moteurs durables, envoyer une commande nue telle que `{"action": "reserve_part", "sku": "COMP-882", "qty": 1}` est une faute professionnelle grave. Chaque délégation `A2A` ou invocation d'outil `MCP` à effet de bord doit transporter des métadonnées explicites d'idempotence, de traçabilité `OpenTelemetry`, de chaîne d'identité et de budget économique.

Les trois extraits normatifs suivants illustrent concrètement comment ces lois se traduisent dans le code et les contrats protocolaires d'une architecture de production en 2027.

#### Extrait 1.1 — Descripteur de capacités horizontal (`A2A v1.0 Agent Card`)
Exposé sur le point de terminaison standardisé `/.well-known/agent-card.json` (et indexé dans l'annuaire interne compatible `OASF`), ce descripteur permet à un orchestrateur de découvrir dynamiquement l'*Agent Spécialiste Garantie* de la division financière sans couplage fort à son implémentation interne :

```json
{
  "protocolVersion": "1.0",
  "name": "boreal-bca-warranty-adjudicator",
  "displayName": "Agent Spécialiste Garantie & Couverture Bris (BCA)",
  "version": "2.4.1",
  "description": "Évalue l'admissibilité contractuelle, les franchises et les plafonds de couverture pour les équipements industriels sous contrat Boréal Capital & Assurances.",
  "url": "https://agentgateway.internal.boreal.ca/a2a/bca/warranty",
  "provider": {
    "organization": "Boréal Capital & Assurances (Division réglementée BSIF)",
    "ownerEmail": "coe-risques-modeles@boreal.ca"
  },
  "capabilities": {
    "streaming": true,
    "pushNotifications": true,
    "stateTransitionHistory": true
  },
  "securitySchemes": {
    "borealOboAuth": {
      "type": "oauth2",
      "flows": {
        "urn:ietf:params:oauth:grant-type:token-exchange": {
          "tokenUrl": "https://login.boreal.ca/oauth2/v2.1/token",
          "scopes": {
            "bca.warranty.evaluate": "Évaluer une couverture sans engager de décaissement",
            "bca.warranty.preauthorize": "Pré-autoriser une prise en charge sous plafond L3 (<= 5000 CAD)"
          }
        }
      }
    }
  },
  "security": [{ "borealOboAuth": ["bca.warranty.evaluate"] }],
  "defaultInputModes": ["application/json"],
  "defaultOutputModes": ["application/json"],
  "skills": [
    {
      "id": "adjudicate-equipment-failure-coverage",
      "name": "Instruction d'admissibilité de garantie sur alerte télématique",
      "description": "Croise le numéro de série, le code défaut télématique et les avenants actifs sur IBM i / Guidewire afin de statuer sur la couverture et la franchise applicable.",
      "tags": ["warranty", "bsif-e23-tier2", "equipment", "adjudication"],
      "inputSchema": "https://schemas.boreal.ca/ossie/v2/warranty-claim.json",
      "outputSchema": "https://schemas.boreal.ca/ossie/v2/warranty-decision.json"
    }
  ]
}
```

Remarquez trois détails essentiels pour un architecte et un CISO : l'URL ne pointe pas vers un pod applicatif direct mais vers la passerelle centralisée `agentgateway` ; le schéma de sécurité exige explicitement un échange de jeton `RFC 8693` à portée fine ; et les schémas d'entrée/sortie font référence au référentiel sémantique partagé (`ossie/v2`) de l'entreprise.

#### Extrait 1.2 — Contrat d'outil vertical (`MCP` JSON-RPC 2.0 orienté intention métier)
À l'étage inférieur, lorsque l'*Agent Spécialiste Logistique* doit réserver une pièce critique dans `SAP S/4HANA`, le serveur `MCP` n'expose surtout pas les trente tables internes du module `MM`/`SD`. Il expose un outil métier atomique, idempotent et doté d'un contrat de compensation explicite :

```json
{
  "jsonrpc": "2.0",
  "id": "req-99412",
  "method": "tools/call",
  "params": {
    "name": "sap_reserve_critical_spare_part",
    "arguments": {
      "idempotencyKey": "saga-inc-2027-088412-step-reserve",
      "equipmentSerialNumber": "BOR-CMP-90441",
      "materialCode": "ROTOR-KIT-HX9",
      "quantity": 1,
      "destinationPlantOrDepot": "CA-QC-MTL-02",
      "requiredByTimestamp": "2027-03-15T18:00:00Z",
      "workOrderReference": "SN-WO-773190",
      "ttlHoldMinutes": 240
    },
    "_meta": {
      "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
      "compensationTool": "sap_release_spare_part_reservation"
    }
  }
}
```

Si le serveur `MCP` reçoit deux fois ce message suite à un basculement réseau du moteur d'orchestration, la clé `idempotencyKey` garantit que `SAP S/4HANA` retournera la réservation existante sans décrémenter une seconde fois le stock disponible. De plus, le paramètre `ttlHoldMinutes` implémente un bail temporel (*lease*) : si la saga globale échoue et que même la compensation est retardée, le verrouillage de stock expire proprement au bout de quatre heures.

#### Extrait 1.3 — Enveloppe TypeScript normative d'exécution bornée (`ActionEnvelope`)
Pour industrialiser ces garanties dans les équipes logicielles internes, la plateforme fournit un contrat typé obligatoire enveloppant toute tâche déléguée dans le *System of Action* :

```typescript
export type AutonomyLevel = "L0" | "L1" | "L2" | "L3" | "L4";

export interface DelegationHop {
  readonly actorSpiffeId: string;       // ex: spiffe://boreal.ca/ns/bsn/sa/orchestrator-maint
  readonly delegatedScope: string[];    // Portées OAuth 2.1 effectivement retenues à ce saut
  readonly issuedAtIso: string;
}

export interface ExecutionBudget {
  readonly maxTotalCostCad: number;     // Plafond dur FinOps pour la saga (ex: 1.50 $ CAD)
  readonly consumedCostCad: number;     // Coût cumulé mesuré en temps réel
  readonly maxRemainingHops: number;    // Protection déterministe anti-boucle inter-agents (TTL)
  readonly deadlineEpochMs: number;     // Échéance SLA au-delà de laquelle l'action est abandonnée
}

export interface CompensationDescriptor {
  readonly requiredOnAbort: boolean;
  readonly mcpServerUri?: string;
  readonly toolName?: string;
  readonly correlationKey: string;
}

export interface ActionEnvelope<TPayload> {
  readonly envelopeVersion: "2027.1";
  readonly sagaId: string;
  readonly stepIdempotencyKey: string;
  readonly autonomyCeiling: AutonomyLevel;
  readonly initiatingSubjectId: string; // Employé, client ou source télématique certifiée
  readonly delegationChain: ReadonlyArray<DelegationHop>;
  readonly budget: ExecutionBudget;
  readonly telemetry: {
    readonly traceId: string;
    readonly parentSpanId: string;
    readonly businessProcessCode: string;
  };
  readonly compensation: CompensationDescriptor;
  readonly payload: TPayload;
}
```

Ce simple contrat de quarante lignes élimine par construction trois causes majeures d'incidents en production : `maxRemainingHops` interdit structurellement toute boucle infinie de délégation entre pairs ; `maxTotalCostCad` permet à la passerelle d'interrompre immédiatement une exécution déviante avant dépassement budgétaire ; et `delegationChain` conserve la généalogie complète exigée par les auditeurs de sécurité.

::: {.encadre-sectoriel title="Industrie Manufacturière & Énergie (IT/OT) — Quand le System of Action rencontre la physique"}
Dans une banque ou un éditeur logiciel, une erreur non détectée d'un agent `L3` se solde au pire par une écriture comptable à contre-passer ou un billet mal routé. Dans une usine d'assemblage, une raffinerie ou un poste électrique connecté en `OPC-UA`, une consigne erronée envoyée au mauvais moment peut endommager une broche d'usinage de 400 000 \$ CAD ou mettre en danger la sécurité physique d'un technicien.

L'architecture du *System of Action* en environnement cyber-physique applique donc une **frontière d'asymétrie stricte entre lecture et écriture OT** :
* En **lecture et diagnostic (`L1`)**, des agents spécialistes interrogent en continu les serveurs `OPC-UA`, les courtiers `MQTT Sparkplug` et les historiens de procédés pour corréler dérives thermiques, spectres vibratoires et ordres de fabrication `MES`.
* En **action corrective (`L2`/`L3`)**, aucun agent LLM n'est jamais autorisé à écrire directement un registre d'automate programmable (`PLC`). Le *System of Action* soumet obligatoirement la modification proposée (par exemple réduire la cadence d'une ligne de 12 % en attendant un remplacement de roulement) à un **jumeau numérique déterministe** qui valide les contraintes cinématiques et thermiques, puis transmet la consigne sous forme de recette pré-homologuée au système `SCADA`/`MES` avec confirmation opérateur locale si la zone est occupée.
:::

::: {.encadre-sectoriel title="Éditeurs SaaS B2B — Concevoir un produit « Agent-Ready » en 2027"}
Pour les éditeurs logiciels B2B, l'émergence du *System of Action* chez leurs grands comptes transforme radicalement les critères d'achat. En 2027, une application SaaS qui n'offre qu'une interface web humaine et une API REST granulaire mal documentée est perçue comme un silo coûteux à intégrer (forçant le client à recourir à des *Computer-Use Agents* fragiles).

Une plateforme SaaS B2B moderne expose désormais **trois surfaces citoyennes de première classe** sur le même noyau métier :
1. Une interface graphique humaine enrichie de flux réactifs `AG-UI` / `A2UI`.
2. Un **serveur `MCP` distant officiel** (sur `Streamable HTTP`, protégé par `OAuth 2.1` avec découverte dynamique de métadonnées), exposant des outils métiers idempotents à forte valeur sémantique plutôt que de simples opérations CRUD.
3. Une **façade `A2A v1.0`** permettant aux orchestrateurs des entreprises clientes de déléguer directement des tâches spécialisées à l'agent natif de l'éditeur, avec facturation transparente à l'usage ou au résultat.
:::

---

## 1.4 Anatomie du cycle d'exécution asynchrone : régimes temporels et bascule *Human-on-the-Loop*

Passer d'un assistant synchrone à une main-d'œuvre d'exécution oblige l'architecte à concevoir explicitement la gestion du **temps**. Alors qu'une requête HTTP classique vit entre 50 millisecondes et 30 secondes, les processus d'entreprise s'étalent sur quatre ordres de grandeur temporels qui ne peuvent partager ni les mêmes protocoles de transport, ni les mêmes mécanismes de persistance.

| Régime temporel | Horizon de durée | Exemples types en entreprise | Transport et infrastructure d'état requis |
|---|---|---|---|
| **T1 — Temps réel interactif** | 150 ms à 2 s | Guidage vocal technicien (`WebRTC`), autocomplétion contextuelle, filtrage sécurité en ligne | Flux persistants (`WebRTC`, WebSockets, `AG-UI` SSE), `SLM` à faible latence, affinité stricte de `KV-cache` |
| **T2 — Opérationnel court** | 2 s à 3 min | Triage enrichi d'incident, vérification multi-sources d'un dossier client complet | `MCP` sur `Streamable HTTP`, délégation `A2A` avec streaming d'état intermédiaire |
| **T3 — Asynchrone tactique** | 3 min à 24 h | Réapprovisionnement inter-dépôts, analyse de conformité d'un appel d'offres de 400 pages | Courtiers `Kafka`/`Solace`, webhooks `A2A` signés, moteur durable (`Restate` / `Temporal`) |
| **T4 — Longue durée (Saga)** | 1 jour à plusieurs semaines | Instruction de sinistre assurance, intégration fournisseur B2B, litige commercial complexe | Exécution durable avec mise en veille sur disque (`awakeables`), approbation asynchrone `CIBA`, revalidation d'état au réveil |

Un point de vigilance crucial concerne le régime **T4** : lorsqu'un workflow agentique se réveille après soixante-douze heures d'attente d'une signature client ou d'une expertise externe, **le monde a changé autour de lui**. Le stock vérifié trois jours plus tôt a pu être consommé, la politique tarifaire a pu évoluer, ou les droits de l'employé initiateur ont pu être révoqués suite à un changement de poste. Toute reprise après suspension longue (`resume`) doit par conséquent exécuter une **étape explicite de revalidation des préconditions critiques et des jetons d'autorisation** avant de poursuivre son graphe d'actions.

### L'équation mathématique du *Human-on-the-Loop* (`HOTL`)

Face aux risques des systèmes autonomes, la réaction instinctive de nombreux comités de conformité consiste à imposer une validation humaine préalable (*Human-in-the-Loop*, `HITL` de niveau `L2`) devant chaque écriture applicative. À l'échelle d'une entreprise traitant 15 000 événements opérationnels par jour, cette stratégie échoue doublement :

1. **Engorgement de la file d'attente** : Si une tâche automatisée prend 12 secondes à la flotte d'agents mais attend 14 heures dans la boîte de réception d'un gestionnaire débordé, le gain de vélocité métier est quasi nul.
2. **Paradoxe de la complaisance cognitive (`OWASP ASI09`)** : Les études en facteurs humains démontrent qu'un opérateur contraint d'approuver 200 propositions quotidiennes dont 98 % sont correctes et rédigées dans un style persuasif développe en quelques semaines une habitude d'approbation réflexe (*rubber-stamping* en moins de trois secondes par dossier). L'organisation cumule alors la lenteur du processus manuel et l'absence réelle de filet de sécurité sur les 2 % de cas critiques.

La maturité opérationnelle en 2027 repose donc sur le passage délibéré au **Human-on-the-Loop (`HOTL`, niveau `L3`)** gouverné par une fonction de score de risque déterministe et sémantique :

\[\text{Escalade}_{\text{HOTL}}(x) = \mathbb{I}\!\left( \text{Impact}(x) > S_{\text{fin}} \;\lor\; \text{Incertitude}(x) > S_{\text{inc}} \;\lor\; \text{AlertePolitique}(x) = 1 \right)\]

Concrètement, les 85 à 92 % de transactions courantes qui respectent simultanément les seuils financiers (\(S_{\text{fin}}\)), une cohérence inter-sources élevée (\(S_{\text{inc}}\) bas) et zéro alerte des règles `Cedar`/`OPA` s'exécutent sans interruption en `L3` sous télémétrie complète. Seuls les 8 à 15 % de dossiers atypiques, ambigus ou à fort enjeu financier sont routés vers un superviseur humain reposé, à qui l'interface `A2UI` présente non pas un roman généré par LLM, mais **le différentiel exact des preuves contradictoires qui ont déclenché l'escalade**.

---

## 1.5 Application au fil rouge : premier flux transversal chez Groupe Boréal

Voyons comment ces principes transforment concrètement le processus le plus douloureux identifié lors de l'audit initial du **Groupe Boréal Inc.**

::: {.fil-rouge title="Fil rouge — Groupe Boréal : De 46 heures de silos manuels à 18 minutes d'exécution fédérée"}
**Processus ciblé** : Prise en charge prédictive d'une anomalie critique sur un compresseur industriel haute pression installé chez un client manufacturier québécois sous contrat de disponibilité garantie 99,5 %.

**Pourquoi l'existant échouait (T4 2026 — 46 heures en moyenne)** :
1. La plateforme télématique de **Boréal Services Numériques (BSN)** détectait une harmonique vibratoire anormale sur un roulement et ouvrait automatiquement un billet dans `ServiceNow`.
2. Un agent local `ServiceNow` résumait l'alerte, mais s'arrêtait là : impossible pour lui de savoir si le contrat de crédit-bail et d'assurance bris géré sur l'`IBM i (AS/400)` de **Boréal Capital & Assurances (BCA)** couvrait le remplacement préventif sans franchise, ni si le kit rotor `ROTOR-KIT-HX9` était disponible au dépôt de Montréal dans le `SAP S/4HANA` de **Boréal Équipements & Logistique (BEL)**.
3. Trois coordonnateurs humains s'échangeaient des courriels internes et des captures d'écran pendant près de deux jours, période durant laquelle 14 % des compresseurs subissaient une casse complète coûtant six fois plus cher en indemnisation et pénalités SLA.

**Architecture cible déployée (Premier lot de la Fabrique Agentique Boréal — T1 2027)** :
L'équipe d'architecture refuse de construire un « méga-agent » ayant accès à `ServiceNow`, à l'`AS/400` et à `SAP`. Elle superpose un flux durable **Temporal** (`System of Action`) orchestrant quatre acteurs spécialisés strictement cloisonnés :
1. **Déclenchement événementiel (Régime T3)** : L'alerte vibratoire qualifiée est publiée sur le bus `Kafka` avec le schéma normalisé de l'équipement. Le moteur `Temporal` instancie une saga identifiée `saga-inc-2027-088412` dotée d'une enveloppe `ActionEnvelope` plafonnée à **1,20 \$ CAD** de budget d'inférence et 4 sauts maximum.
2. **Qualification technique (`SLM` Travailleur BSN)** : Un travailleur d'analyse spectrale (`SLM` spécialisé hébergé sur le cluster interne) confirme la signature d'usure de roulement (confiance 0,96, coût 0,004 \$ CAD) et identifie la nomenclature de rechange requise.
3. **Délégation horizontale en parallèle (`A2A v1.0`)** : Le workflow `Temporal` invoque simultanément via `agentgateway` deux spécialistes de domaine :
   * L'*Agent Spécialiste Garantie* de **BCA** (Extrait 1.1), qui consulte les contrats répliqués et encapsulés sous contrôle `BSIF E-23`, confirme une couverture intégrale jusqu'à 4 500 \$ CAD et émet un jeton de pré-autorisation signé.
   * L'*Agent Spécialiste Stocks* de **BEL**, qui invoque l'outil `MCP` idempotent `sap_reserve_critical_spare_part` (Extrait 1.2) pour bloquer pendant 4 heures l'exemplaire disponible au dépôt de Montréal-Est.
4. **Affectation terrain et notification client** : Une fois les deux réponses positives journalisées dans `Temporal`, l'*Agent Planification Terrain* (`ServiceNow FSM`) réserve le créneau du lendemain matin d'un technicien certifié haute pression, tandis qu'une notification `A2A` informe `Salesforce Agentforce` afin que le directeur de compte dispose du contexte complet si le client l'appelle.
5. **Gouvernance `HOTL` sur exception** : Si le coût estimé de l'intervention dépasse **5 000 \$ CAD** ou si le contrat comporte une clause d'exclusion ambiguë (8,4 % des dossiers observés), le moteur `Cedar` bloque l'engagement automatique, `Temporal` suspend la saga sans consommer de CPU, et une demande d'approbation asynchrone `CIBA` / `A2UI` est poussée au souscripteur BCA compétent.

**Résultats mesurés sur les 60 premiers jours de production pilote** :
* **Délai médian de bout en bout (hors cas d'escalade `HOTL`)** : **11 minutes** (18 minutes au 95e centile), contre 46 heures auparavant.
* **Coût complet d'inférence et d'infrastructure d'orchestration** : **0,38 \$ CAD par incident résolu** (contre plus de 65 \$ CAD de temps administratif interne de ressaisie).
* **Taux de casses machines évitées avant panne franche** : hausse de **+31 points**, avec piste d'audit complète `OpenTelemetry` et séparation cryptographique des privilèges entre les trois divisions.
:::

---

## 1.6 Décision d'architecture normative et points de contrôle

Conformément à la discipline éditoriale de ce compendium, nous clôturons ce premier chapitre par la fiche de décision d'architecture fondatrice que tout comité d'architecture d'entreprise devrait adopter formellement avant d'autoriser le déploiement d'agents mutatifs, suivie de la liste de contrôle d'homologation associée.

::: {.adr title="ADR-001 — Superposition d'un System of Action découplé et séparation stricte MCP / A2A"}
* **Statut** : Acceptée (Norme fondatrice d'entreprise)
* **Contexte** : L'organisation exploite de multiples systèmes d'enregistrement hétérogènes (SaaS multi-éditeurs, bases patrimoniales, systèmes industriels) et fait face à une multiplication d'initiatives agentiques locales incapables de coopérer sans recréer des couplages point-à-point fragiles et sur-privilégiés.
* **Options évaluées** :
  1. *Centralisation dans un progiciel unique* : Forcer tous les agents métiers dans le studio d'un seul éditeur SaaS (CRM ou ITSM). **Rejetée** — verrouillage fournisseur critique, latence et coûts prohibitifs hors du domaine natif, inadaptation aux systèmes patrimoniaux et `IT/OT`.
  2. *Maillage libre d'agents généralistes* : Laisser des agents autonomes dotés de larges bouquets d'API s'appeler librement en langage naturel. **Rejetée** — fiabilité composée insuffisante, dérives budgétaires, impossibilité d'audit réglementaire (`BSIF E-23`, `Loi 25`, `EU AI Act`).
  3. *Architecture stratifiée à System of Action fédéré* : Maintenir les agents spécialistes près de la gravité de leurs données respectives, imposer `MCP` pour l'accès vertical aux outils/ressources, imposer `A2A v1.0` pour la délégation horizontale inter-domaines via une passerelle contrôlée, et ancrer les flux multi-étapes dans un moteur d'exécution durable. **Retenue**.
* **Décision** : Tout système agentique de niveau `L2`, `L3` ou `L4` doit s'inscrire dans la strate *System of Action* en respectant : (a) la spécialisation en cinq archétypes fonctionnels ; (b) l'interdiction absolue d'écriture directe en base contournant la logique métier des *Systems of Record* ; (c) l'usage exclusif de `MCP` (vertical) et `A2A v1.0` (horizontal) avec transport obligatoire d'une `ActionEnvelope` idempotente et budgétée.
* **Conséquences** :
  * *Positives* : Indépendance envers les fournisseurs de modèles, confinement strict du rayon d'impact sécurité par domaine, auditabilité native de bout en bout, réutilisation des serveurs `MCP` et des spécialistes `A2A` à travers toute l'entreprise.
  * *Négatives / Coûts assumés* : Investissement initial de plateforme (passerelle AI-native, runtime durable, registre d'agents) et discipline de conception des schémas d'outils idempotents.
* **Condition de révision** : Réévaluation annuelle lors des mises à jour majeures des spécifications de la Linux Foundation AAIF.
:::

### Liste de contrôle de mise en production — Chapitre 1

Avant de passer à la conception détaillée des plans de contrôle déterministes au **Chapitre 2**, vérifiez que votre programme répond sans ambiguïté aux huit exigences suivantes :

1. **Qualification du niveau d'autonomie** : Chaque cas d'usage candidat est-il formellement classé sur l'échelle `L0` à `L4`, en appliquant la règle du maillon le plus élevé (*High-Water Mark*) sur l'ensemble de la chaîne ?
2. **Séparation des archétypes** : Aucun agent directement exposé à des entrées utilisateurs non fiables (`Interface`) ne possède-t-il de connecteur direct d'écriture vers un système d'enregistrement ?
3. **Granularité cognitive bornée** : Chaque agent spécialiste de domaine manipule-t-il un ensemble cohérent de moins de douze outils `MCP` orientés intention métier plutôt qu'un catalogue brut d'endpoints CRUD ?
4. **Orthogonalité protocolaire** : La frontière entre appel d'outil déterministe (`MCP`) et délégation d'objectif à un pair autonome (`A2A v1.0`) est-elle respectée sans détournement ?
5. **Idempotence et baux temporels** : Tout outil mutatif exige-t-il une clé d'idempotence déterministe et prévoit-il une opération de compensation ou un bail d'expiration (`TTL`) ?
6. **Plafonds d'enveloppe** : Chaque exécution transporte-t-elle un plafond dur de sauts (`maxRemainingHops`), une échéance temporelle et un budget maximal en devises ?
7. **Calibrage `HOTL`** : Les seuils d'escalade vers un superviseur humain reposent-ils sur des critères explicites de risque afin d'éviter simultanément l'engorgement opérationnel et la complaisance d'approbation (`OWASP ASI09`) ?
8. **Propriétaire nominatif** : Chaque agent spécialiste et chaque flux orchestré possèdent-ils un responsable métier et technique clairement identifié dans le registre d'entreprise ?
