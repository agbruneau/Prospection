# Chapitre 6 — Coordination horizontale, découverte et réseau inter-agents (A2A v1.0, AGNTCY)

::: {.synthese-executive title="Synthèse exécutive — Chapitre 6"}

* **Enjeu stratégique** : Tant qu'un agent opère seul au-dessus de ses outils `MCP` (Chapitre 5), l'entreprise n'automatise que des silos locaux. Or, les processus à forte valeur — instruire une garantie complexe, rerouter un flux logistique international, qualifier un risque de crédit — traversent plusieurs divisions et partenaires externes qui refusent légitimement d'exposer leurs bases de données, leurs consignes système ou leurs modèles internes. Sans protocole horizontal normalisé, l'organisation multiplie les adaptateurs fragiles, les boucles infinies inter-agents et les risques d'usurpation de capacités (`OWASP ASI07`).
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Proscrire l'encapsulation d'agents autonomes à cycles longs derrière de simples outils `MCP` synchrones ; imposer **`A2A v1.0`** (*Agent2Agent Protocol*, issu de la fusion avec `ACP` sous gouvernance Linux Foundation) pour toute délégation d'objectif entre pairs opaques.
  2. *Structurante dès le passage à l'échelle (> 15 agents)* : Remplacer les listes statiques d'URL par un catalogue fédéré modélisé en **`AGNTCY OASF`** (*Open Agentic Schema Framework*), où chaque fiche et chaque `Agent Card` sont signées cryptographiquement (`JWS` / `Sigstore`).
  3. *Progressive selon la criticité réseau* : Conserver `HTTPS + SSE + Webhooks` pour les flux courants, mais activer le bus **`AGNTCY SLIM`** couplé au chiffrement de groupe **`IETF MLS` (`RFC 9420`)** hybride post-quantique pour les cellules collaboratives temps réel, les sites industriels isolés et les échanges B2B sensibles.
* **Indicateurs de gouvernance associés** : Délai d'intégration d'un nouvel agent spécialiste au maillage (cible : < 48 h sans redéployer les orchestrateurs), part des tâches longues traitées sans sondage actif (*zero-polling ratio* > 95 %), temps de révocation cryptographique `MLS`, et zéro délégation inter-domaines sans signature `Agent Card` valide.

:::

## 6.1 Protocole A2A v1.0 (convergence ACP) : Agent Cards, tâches asynchrones et artefacts typés

Si `MCP` résout l'accès **vertical** d'un agent à ses outils déterministes et à ses ressources, interconnecter cinquante domaines métiers sur ce seul protocole reproduirait l'erreur historique consistant à coupler des applications externes directement aux procédures stockées d'un ERP tiers. Un outil et un agent pair obéissent en effet à deux contrats fondamentalement distincts :

* Un **outil (`MCP`)** est une primitive **transparente et subordonnée** : l'appelant connaît sa signature exacte, lui fournit tous les arguments requis et attend une exécution bornée sans négociation de périmètre.
* Un **agent pair (`A2A`)** est un **collaborateur opaque et autonome** : il protège sa mémoire interne, son modèle, ses politiques locales et ses outils privés. On lui délègue une *intention métier*, qu'il peut exécuter sur plusieurs heures, rejeter pour motif de conformité ou suspendre afin d'exiger une pièce justificative manquante.

### De la fragmentation initiale à la convergence industrielle A2A v1.0

Au printemps 2025, deux standards complémentaires ont émergé simultanément : **`A2A` (*Agent2Agent*)**, initié par Google et cinquante partenaires autour de JSON-RPC 2.0, des `Agent Cards` et de la gestion formelle des tâches longues inter-entreprises ; et **`ACP` (*Agent Communication Protocol*)**, porté par IBM Research (BeeAI) auprès de la Linux Foundation avec une approche RESTful native, un streaming multipart léger et une découverte optimisée pour la micro-orchestration locale.

Fin 2025, les deux initiatives ont fusionné sous la gouvernance neutre de la **Linux Foundation** (en cohérence avec l'AAIF). La spécification **`A2A v1.0`**, stabilisée en 2026 et généralisée en production en 2027, réunit les forces des deux approches :

1. **Modèle sémantique unique à liaisons multiples (*Multi-Transport Binding*)** : un même domaine objet se projette officiellement sur `JSON-RPC 2.0` sur HTTPS (profil universel), `HTTP+JSON/REST` idiomatique (héritage direct d'`ACP` facilitant l'inspection par les passerelles API) et `gRPC` haute performance.
2. **Distinction entre `Message` immédiat et `Task` durable** : héritage d'`ACP`, une interaction simple résolue en un tour sous deux secondes n'exige pas d'instancier un état lourd ; dès qu'un traitement implique asynchronisme, réessais ou validation tierce, l'échange est promu en objet `Task` versionné.
3. **Conteneurs multimodaux typés (`Part` et `Artifact`)** : abandon du texte brut ambigu au profit d'unités structurées (`TextPart`, `DataPart` soumis à JSON Schema, `FilePart` par URI présignée bornée dans le temps).

| Critère d'ingénierie | Sous-agent en outil `MCP` (Anti-patron) | `ACP` historique (Pré-fusion 2025) | `A2A v1.0` — Streaming SSE (Régime T2) | `A2A v1.0` — Push Webhook + Durable (Régimes T3–T4) |
|---|---|---|---|---|
| **Opacité et sécurité** | Faible : fuite d'indices internes dans le contexte parent | Bonne : isolation des runtimes locaux | Élevée : `Agent Card` signée + `OAuth 2.1 OBO` | Maximale : zéro connexion entrante maintenue pendant l'attente |
| **Négociation multi-tours** | Absente (texte d'erreur libre ambigu) | Sessions REST locales | Native via état `input-required` et `contextId` | Native via `input-required` / `auth-required` réveillant un `awakeable` |
| **Horizon temporel** | 1 s à 60 s (*timeouts* d'outils) | Secondes à minutes | 2 s à 3 min (flux HTTP/2 SSE actif) | **Minutes à plusieurs semaines** (mise en veille complète) |
| **Livraison de sortie** | Bloc JSON/texte unique final | Flux MIME multipart | Incrémentale (`TaskArtifactUpdateEvent`) | `Artifact` immuable notifié par webhook signé `JWS` |
| **Usage recommandé** | Proscrit pour un vrai pair autonome | Migré vers liaison REST `A2A v1.0` | Coopération interactive reliée à `AG-UI` | Sagas inter-divisions, conformité et logistique B2B |

### Sécurité de l'Agent Card et neutralisation du *Capability Spoofing*

Toute interaction `A2A v1.0` commence par la lecture de l'**`Agent Card`** (`/.well-known/agent-card.json`). Au-delà de la structure présentée au Chapitre 1, deux mécanismes normatifs de `v1.0` verrouillent l'exposition en production :

* **Carte publique minimale et carte étendue authentifiée (`supportsAuthenticatedExtendedCard: true`)** : l'URL publique anonyme ne révèle que l'identité de routage et les schémas d'authentification. L'appelant doit présenter un jeton valide sur `agent/authenticatedExtendedCard` pour découvrir les compétences fines autorisées pour son profil de locataire (*tenant*).
* **Signature cryptographique canonique (`signatures` JWS `RFC 7515`)** : pour contrer l'usurpation de capacités (`OWASP ASI07`) où un conteneur compromis annoncerait frauduleusement des compétences financières afin d'intercepter des dossiers, la carte canonisée (`RFC 8785` JCS) est signée par l'autorité de plateforme. La passerelle `agentgateway` bloque tout routage vers une carte non certifiée.

### Machine à états d'une tâche A2A v1.0 et exécution sans attente active

Lors d'un appel `message/send` ou `message/stream`, `A2A v1.0` distingue le **`contextId`** (identifiant logique de dossier reliant plusieurs échanges successifs) et le **`taskId`** (unité atomique régie par une machine à états déterministe).

![Cycle de vie complet d'une tâche asynchrone A2A v1.0 : découverte, négociation multi-tours, streaming SSE et notifications push signées.](manuscrit/figures/fig-06-a2a-cycle-tache.svg)

Les huit états normatifs de `TaskState` dictent le comportement exact de l'orchestrateur appelant :

| État `TaskState` | Catégorie | Signification protocolaire | Action requise côté orchestrateur appelant |
|---|---|---|---|
| `submitted` | Intermédiaire | Tâche authentifiée, validée et mise en file persistante. | Journaliser le `taskId` ; conserver la même clé d'idempotence en cas de réessai. |
| `working` | Intermédiaire | Inférence spécialiste et appels `MCP` internes en cours. | Consommer le flux SSE (T2) ou suspendre le workflow en attente du webhook (T3–T4). |
| `input-required` | Suspension | Donnée métier complémentaire requise pour trancher. | Extraire le schéma demandé, collecter la preuve et rappeler `message/send` sur le **même `taskId`**. |
| `auth-required` | Suspension | Consentement hors bande (`CIBA`) ou jeton tiers requis. | Acquérir le jeton d'élévation puis relancer la tâche suspendue. |
| `completed` | **Terminal** | Succès ; objets `Artifact` immuables joints et typés. | Valider l'`outputSchema`, enregistrer l'artefact et passer à l'étape suivante. |
| `failed` | **Terminal** | Échec non récupérable localement malgré les réessais internes. | Déclencher immédiatement la séquence de compensation de la saga parente. |
| `canceled` | **Terminal** | Annulation confirmée après requête `tasks/cancel`. | Vérifier la libération des verrous temporaires chez le pair. |
| `rejected` | **Terminal** | Refus avant tout effet de bord (politique `Cedar`, quota). | Basculer vers un pair alternatif de l'annuaire sans compensation requise. |

Deux mécanismes complémentaires d'`A2A v1.0` garantissent la résilience sur les réseaux d'entreprise imparfaits :

* **Reconnexion sans perte de flux (`tasks/resubscribe`)** : en régime `T2` (2 secondes à 3 minutes), lorsqu'une connexion `SSE` est interrompue par le redémarrage d'un pod répartiteur de charge ou un basculement Wi-Fi, l'appelant invoque `tasks/resubscribe` avec le `taskId` et le dernier identifiant d'événement reçu. Le serveur rejoue les transitions d'état manquées depuis son tampon d'événements sans relancer l'inférence sous-jacente.
* **Assemblage incrémental d'artefacts (`append` et `lastChunk`)** : lorsqu'un spécialiste produit un rapport d'audit structuré ou un lot de données volumineux, il émet une séquence de `TaskArtifactUpdateEvent` partageant le même `artifactId` avec `append: true` jusqu'au fragment final marqué `lastChunk: true`. L'orchestrateur peut ainsi inspecter en continu la sortie (par exemple détecter précocement une violation de politique) et émettre immédiatement `tasks/cancel` pour couper les frais d'inférence inutiles.

#### Extrait 6.1 — Séquence JSON-RPC 2.0 `A2A v1.0` : soumission asynchrone, suspension `input-required` et artefact typé

```json
[{
  "_step": "1. POST https://agentgateway.internal.boreal.ca/a2a/bca/warranty",
  "jsonrpc": "2.0",
  "id": "rpc-req-4401",
  "method": "message/send",
  "params": {
    "message": {
      "messageId": "msg-901a-77c2",
      "contextId": "ctx-incident-comp-90441",
      "role": "user",
      "parts": [{
        "kind": "data",
        "mimeType": "application/json",
        "data": {
          "equipmentSerial": "BOR-CMP-90441",
          "faultSignatureCode": "VIB-BEARING-OUTER-RACE-H3",
          "estimatedRepairCad": 3850.00,
          "preventiveReplacement": true
        }
      }],
      "metadata": {
        "borealActionEnvelope": {
          "sagaId": "saga-inc-2027-088412",
          "stepIdempotencyKey": "idem-bca-adj-088412-v1",
          "maxRemainingHops": 3,
          "maxBudgetCad": 0.45,
          "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-88a12b33c901d4e2-01"
        }
      }
    },
    "configuration": {
      "acceptedOutputModes": ["application/json", "application/pdf"],
      "blocking": false,
      "pushNotificationConfig": {
        "id": "push-cfg-temporal-088412",
        "url": "https://callbacks.internal.boreal.ca/a2a/v1/webhook",
        "token": "awk-tok-9f8e7d6c5b4a3210",
        "authentication": { "schemes": ["Bearer", "X-A2A-Signature-JWS"] }
      }
    }
  }
},
{
  "_step": "2. Webhook poussé par BCA 9 s plus tard (Transition -> input-required)",
  "kind": "status-update",
  "taskId": "tsk-bca-772019",
  "contextId": "ctx-incident-comp-90441",
  "final": false,
  "status": {
    "state": "input-required",
    "timestamp": "2027-03-14T14:22:19.410Z",
    "message": {
      "messageId": "msg-bca-req-calib",
      "role": "agent",
      "parts": [{
        "kind": "data",
        "mimeType": "application/json",
        "data": {
          "missingField": "lastLubricationComplianceHash",
          "policyClause": "BCA-IND-2026-ART14.2"
        }
      }]
    }
  }
},
{
  "_step": "3. Webhook final après réponse automatique de BSN (completed + Artifact)",
  "kind": "artifact-update",
  "taskId": "tsk-bca-772019",
  "contextId": "ctx-incident-comp-90441",
  "append": false,
  "lastChunk": true,
  "artifact": {
    "artifactId": "art-warranty-auth-99102",
    "name": "warranty-preauthorization-decision",
    "parts": [
      {
        "kind": "data",
        "mimeType": "application/json",
        "data": {
          "decision": "APPROVED_ZERO_DEDUCTIBLE",
          "authorizedCapCad": 4500.00,
          "authorizationCode": "BCA-PREAUTH-2027-551902",
          "validUntilIso": "2027-03-21T14:22:35Z"
        }
      },
      {
        "kind": "file",
        "file": {
          "name": "certificat-couverture-551902.pdf",
          "mimeType": "application/pdf",
          "uri": "https://vault.boreal.ca/artifacts/cert-551902.pdf?sig=8b7a"
        }
      }
    ]
  }
}]
```

> [!WARNING]
> **Protection anti-SSRF et anti-*DNS Rebinding* des webhooks `A2A v1.0`** : Honorer sans filtrage n'importe quelle URL dans `pushNotificationConfig.url` expose le sous-réseau du spécialiste à une attaque *Server-Side Request Forgery* (`SSRF`). L'émetteur doit restreindre les domaines de rappel à la liste blanche liée à l'identité `SPIFFE`/`DID` de l'appelant, acheminer les rappels par un proxy sortant dédié isolé du réseau interne, vérifier dans le *dialer* socket effectif (après résolution DNS unique épinglée, afin de parer tout contournement *DNS Rebinding* à `TTL = 0`) l'absence d'adresses privées (`RFC 1918`) ou de métadonnées infonuagiques (`169.254.169.254`), et signer chaque envoi par un en-tête `JWS` horodaté muni d'un `nonce` anti-rejeu.

---

## 6.2 Découverte dynamique et modélisation des capacités avec AGNTCY OASF et Agent Directory

Si `A2A v1.0` normalise le dialogue avec un pair connu, il ne suffit pas dès qu'un groupe exploite des dizaines d'agents répartis entre filiales et partenaires : **comment découvrir dynamiquement le spécialiste optimal sans coder en dur une multitude d'URL ni injecter cent descriptions textuelles dans le prompt d'un orchestrateur ?** Confier la sélection d'agents au seul jugement sémantique d'un LLM sur de la prose libre gonfle la facture de jetons et ouvre la porte au *SEO d'Agent Card* malveillant.

Le collectif **`AGNTCY`** — initié par Cisco (Outshift), LangChain, Galileo et Glean puis hébergé sous la **Linux Foundation** — résout cet enjeu par le couple **`OASF`** et **`Agent Directory`**.

### L'Open Agentic Schema Framework (`OASF`) : taxonomie déterministe et provenance OCI

**`OASF`** fournit un schéma déclaratif versionné qui encadre tout le cycle de vie d'un agent autour de quatre volets :

1. **Taxonomie hiérarchique contrôlée (`skills` et `domains`)** : remplace les synonymes flous par des identifiants normalisés (`supply_chain/trade_compliance/hs_tariff_classification`) extensibles par espace de noms privé (`x-boreal/*`), ramenant la présélection à une requête d'index exacte en moins d'une milliseconde.
2. **Locators multi-protocoles (`locators`)** : relie dans une fiche unique la référence d'artefact conteneur, l'URL de l'`Agent Card A2A v1.0` et l'identifiant de routage temps réel `SLIM`.
3. **Modules d'évaluation et de conformité (`modules`)** : attache les métriques mesurées en CI/CD (`ADLC`, Chapitre 22) — stabilité \(\text{pass}^k\), latence P95, coût médian — ainsi que la juridiction d'hébergement et la classification `BSIF E-23` ou `EU AI Act`.
4. **Signature `Sigstore` sur registre `OCI`** : chaque manifeste `OASF` est publié comme artefact **OCI (*Open Container Initiative*)** et signé via **Cosign / Sigstore** dans un journal de transparence vérifiable.

### Routage distribué par Agent Directory (DHT Kademlia)

Pour fédérer plusieurs entités sans créer un registre central vulnérable, **`AGNTCY Agent Directory`** dissocie stockage et indexation : chaque division conserve ses manifestes complets sur son registre OCI local, mais annonce les empreintes cryptographiques (`SHA-256`) de ses compétences sur une **table de hachage distribuée (`DHT`) Kademlia**. Après résolution en \(\mathcal{O}(\log M)\) sauts et vérification des signatures, le routeur du plan de contrôle évalue chaque candidat \(a\) selon un score déterministe :

\[\text{Score}(a) = \mathbb{I}_{\text{pol}}(a) \cdot \left( w_s S_{\text{sem}}(a) + w_r \text{pass}^k(a) - w_c \hat{C}(a) - w_l \hat{L}_{95}(a) \right)\]

Ici, \(\mathbb{I}_{\text{pol}}(a) \in \{0, 1\}\) représente le filtre éliminatoire `Cedar`/`OPA` (résidence des données, plafond d'autonomie), \(S_{\text{sem}}(a)\) la compatibilité des schémas JSON, \(\text{pass}^k(a)\) la fiabilité certifiée, et \(\hat{C}(a), \hat{L}_{95}(a)\) le coût et la latence P95 normalisés.

En exploitation réelle, cette découverte distribuée s'accompagne d'une **gouvernance stricte du cache et de la révocation**. Les passerelles `agentgateway` conservent localement les résolutions `OASF` fréquentes avec un bail court (`TTL` de 60 à 300 secondes) afin de ne pas solliciter la `DHT` à chaque micro-transaction. Toutefois, si la surveillance `OpenTelemetry` (Chapitre 21) détecte en production une dérive soudaine du taux d'erreur ou une compromission d'un serveur sous-jacent, le centre d'opérations AgentOps publie un avis de révocation signé (*Revocation Record*) sur le canal prioritaire de l'`Agent Directory` : en moins de cinq secondes, \(\mathbb{I}_{\text{pol}}(a)\) passe à zéro sur l'ensemble des passerelles du groupe, isolant chirurgicalement l'agent fautif et basculant le trafic vers le candidat de rang 2 sans interrompre les sagas en cours.

#### Extrait 6.2 — Manifeste de capacité `AGNTCY OASF` signé et relié à `A2A v1.0`

```yaml
oasfVersion: "1.0.0"
name: "ca.boreal.bel.customs-harmonized-classifier"
version: "3.1.0"
description: >-
  Spécialiste de classification tarifaire douanière (SH/HS Code) et calcul d'origine
  préférentielle ACEUM/USMCA pour équipements électromécaniques industriels.
authors:
  - "Conformité Douanière & Ingénierie BEL <agentops-bel@boreal.ca>"
createdAt: "2027-02-18T09:30:00Z"

skills:
  - id: "supply_chain/trade_compliance/hs_tariff_classification"
    proficiency: "expert"
  - id: "supply_chain/trade_compliance/usmca_origin_determination"
    proficiency: "expert"

domains:
  - "industrial_manufacturing/heavy_machinery"
  - "cross_border_logistics/north_america_eu"

locators:
  - type: "a2a-agent-card"
    url: "https://gateway.boreal.ca/a2a/bel/customs/agent-card.json"
    digest:
      "sha256:9f44c8e12a08b7d6513e88c247ab19d05c63fe41856f01e23c9914d07b3a2e1c"
  - type: "slim-endpoint"
    uri: "slim://ca.boreal/supply-chain/customs-classifier"

modules:
  - name: "agntcy.oasf.evaluation.metrics"
    data:
      benchmarkSuite: "boreal-customs-eval-2027-q1"
      passHat3Score: 0.984
      p95LatencyMs: 2450
      medianCostPerTaskCad: 0.06

  - name: "agntcy.oasf.governance.compliance"
    data:
      autonomyCeiling: "L3"
      dataResidencyRegions: ["ca-central-1"]
      piiHandling: "PROHIBITED"
      regulatoryClassifications:
        osfiE23Materiality: "NON_APPLICABLE"
        euAiActCategory: "LIMITED_RISK"
      requiredOAuthScopes: ["bel.customs.classify"]

  - name: "agntcy.oasf.security.provenance"
    data:
      ociArtifactRef: "registry.internal.boreal.ca/oasf/bel-customs:3.1.0"
      sigstoreRekorLogIndex: 148920331
      signerIdentity: "spiffe://boreal.ca/ns/cicd/sa/adlc-release-signer"
```

---

## 6.3 Transport inter-agents sécurisé basse latence : SLIM et chiffrement MLS post-quantique

Si `HTTPS` suffit aux flux administratifs point-à-point classiques, trois contraintes opérationnelles mettent en échec le modèle requête-réponse HTTP traditionnel dans les architectures multi-agents denses :

1. **Sessions collaboratives multipartistes** : faire délibérer ou enchérir simultanément cinq agents (diagnostic, stock, douane, transporteur, assureur) sous 150 ms via \(N(N-1)\) webhooks HTTP génère une amplification quadratique ingérable.
2. **Traversée de pare-feux `IT/OT` et PME** : recevoir des appels HTTP entrants exige d'ouvrir des ports dans les zones industrielles (`Purdue Level 3`) — une pratique proscrite en sûreté cyber-physique.
3. **Rupture du chiffrement sur les courtiers intermédiaires** : avec `TLS` classique terminé sur chaque proxy ou courtier cloud mutualisé, l'infrastructure intermédiaire accède en clair aux offres commerciales et aux secrets industriels.

La couche réseau d'`AGNTCY` lève ces trois verrous en associant le transport **`SLIM`** au chiffrement de groupe **`IETF MLS` (`RFC 9420`)**.

### SLIM (*Secure Low-Latency Interactive Messaging*) sur QUIC et HTTP/2

Implémenté en Rust pour offrir une latence déterministe, **`SLIM`** remplace le routage IP/port par un **adressage sémantique hiérarchique** (`organisation/namespace/classe-agent/instance-id`) inspiré des réseaux orientés information (`ICN`). Chaque nœud maintient uniquement une **connexion sortante persistante** sur **`QUIC` (`UDP/443`)** ou `HTTP/2 gRPC` vers le relais le plus proche :

* **Zéro port entrant exposé** : un agent d'usine initie le canal sortant et reçoit les tâches `A2A v1.0` encapsulées sans jamais exposer d'adresse IP entrante.
* **Absence de blocage en tête de file (*Head-of-Line Blocking*)** : sous `QUIC`, la perte d'un paquet lors du transfert d'un lourd schéma CAO ne retarde aucunement les trames de contrôle urgentes multiplexées sur la même session.
* **Modes unifiés** : *request-reply*, streaming de jetons et canaux *pub/sub* multicast cohabitent sur la même primitive.

![Architecture de la pile réseau AGNTCY : découverte fédérée OASF / Agent Directory et transport SLIM chiffré de bout en bout par MLS post-quantique.](manuscrit/figures/fig-06-agntcy-slim-mls.svg)

### Confidentialité de groupe post-quantique avec IETF MLS (`RFC 9420`)

Au-dessus du routage `SLIM`, le protocole **`Messaging Layer Security` (`RFC 9420`)** chiffre les charges utiles de bout en bout entre les agents membres d'une session, rendant les relais intermédiaires totalement aveugles au contenu.

Grâce à sa structure d'arbre binaire à cliquet asymétrique **`TreeKEM`**, chaque participant occupe une feuille liée à son identité (`SPIFFE SVID` ou `DID`). Lorsqu'un agent externe rejoint une négociation puis la quitte après quatre minutes, l'opération `Commit` renouvelle le secret d'époque le long du chemin vers la racine en seulement \(\mathcal{O}(\log N)\) opérations cryptographiques, garantissant la **confidentialité persistante (*Forward Secrecy*)** et la **sécurité post-compromission (*Post-Compromise Security*)**.

En 2027, afin de parer dès aujourd'hui les collectes passives de type *Harvest Now, Decrypt Later* sur les secrets industriels transitant par Internet, les sessions `SLIM/MLS` inter-organisations imposent la suite hybride post-quantique **`X25519MLKEM768`** (combinant courbe elliptique `X25519` et encapsulation **`ML-KEM-768` `NIST FIPS 203`**) assortie de signatures **`ML-DSA` (`FIPS 204`)**.

Sur le plan des performances et de l'ergonomie développeur, deux enseignements de déploiement méritent d'être soulignés :

* **Surcoût post-quantique négligeable face aux temps d'inférence** : si un `KeyPackage` hybride `X25519MLKEM768` ajoute environ 1,2 kilooctet à la poignée de main initiale du groupe `MLS`, l'opération d'encapsulation/décapsulation s'exécute en moins de **0,4 milliseconde** sur un processeur serveur standard, suivie d'un chiffrement symétrique matériel `AES-256-GCM` à débit filaire. Ce coût est imperceptible devant une inférence de modèle de 300 à 2 000 millisecondes.
* **Pontage transparent `A2A-over-SLIM` par *sidecar* et arbitrage des collisions d'époques** : les équipes métiers n'ont pas à réécrire leurs agents pour tirer parti de `SLIM`. L'agent spécialiste expose localement sur `127.0.0.1` son serveur `A2A v1.0` standard, tandis qu'un démon local `SLIM` gère l'attestation `SPIFFE`, l'arbre `MLS` et l'encapsulation JSON-RPC ou gRPC sur `QUIC` au sein de **salles d'exécution éphémères (*Ephemeral Execution Rooms*)** détruites sitôt la saga clôturée. Conformément à la `RFC 9420`, le relais `SLIM` ordonne linéairement les trames `Commit` concurrentes (sans accéder au clair) pour prévenir toute bifurcation d'époque (*epoch fork*), et évince automatiquement les feuilles silencieuses (*dead leaves*) qui retarderaient le renouvellement post-compromission (`PCS`).

#### Extrait 6.3 — Configuration d'un nœud passerelle `SLIM` sous `MLS` hybride post-quantique

```yaml
# slim-node-gateway.yaml — Nœud relais/client AGNTCY SLIM durci (Production 2027)
node:
  id: "boreal-bel-mtl-slim-01"
  organization: "ca.boreal"
  namespace: "supply-chain"

transport:
  primaryProtocol: "quic"
  fallbackProtocol: "http2-grpc"
  upstreamRelays:
    - endpoint: "quic://slim-mesh.boreal.ca:443"
      alpn: ["slim-v1"]
      keepAliveIntervalMs: 15000
      maxConcurrentStreams: 512

identity:
  provider: "spiffe-workload-api"
  socketPath: "unix:///run/spire/sockets/agent.sock"
  expectedTrustDomain: "boreal.ca"
  federatedExternalTrust:
    enabled: true
    allowedDidMethods: ["did:wba"]
    policyEngineEndpoint: "http://127.0.0.1:8181/v1/data/boreal/slim/admission"

mlsSecurity:
  enabled: true
  mandatoryForExternalPeers: true
  cipherSuite: "MLS_256_X25519MLKEM768_AES256GCM_SHA384_MLDSA65"
  keyRotationPolicy:
    maxEpochDurationSeconds: 900
    maxMessagesPerEpoch: 5000
    rotateImmediatelyOnMemberLeave: true
  keyPackageLifetimeHours: 24

a2aBridge:
  exposeLocalAgents:
    - localAgentName: "bel-spot-procurement-orchestrator"
      slimRoute: "ca.boreal/supply-chain/procurement-orchestrator"
      upstreamA2aUrl: "http://127.0.0.1:9080/a2a/v1"
```

---

## 6.4 Traversée des frontières organisationnelles et fédération multi-locataire (ANP)

À l'intérieur de l'entreprise, `SPIRE` et `Microsoft Entra ID` procurent une racine de confiance unifiée. Mais lorsqu'un agent achats doit consulter en temps réel les agents de vingt fournisseurs externes indépendants, aucune direction sécurité n'acceptera de fédérer son annuaire interne avec la planète entière. C'est le rôle d'**`ANP` (*Agent Network Protocol*)** sur l'Internet ouvert des agents.

### Identités Web décentralisées (`did:wba`) et DMZ Agentique

Évitant l'écueil des registres spéculatifs complexes, `ANP` s'appuie sur la méthode **`did:wba` (*Web-Based Agent DID*)** conforme **W3C DID Core** :

1. **Ancrage DNS/TLS natif** : l'identifiant `did:wba:b2b-agents.acier-laurentides.ca:sales:rfq-responder` se résout par HTTPS vers `https://b2b-agents.acier-laurentides.ca/sales/rfq-responder/did.json`, liant cryptographiquement les clés publiques de l'agent à la propriété du domaine Web de l'entreprise et à son attestation légale vérifiable (**vLEI / GLEIF**).
2. **Négociation de méta-protocole** : avant d'ouvrir la tâche `A2A v1.0`, l'en-tête `ANP` accorde la version des schémas métiers partagés (ex. `UN/CEFACT` ou `DCSA`) et les plafonds de cadence.

| Standard | Fonction dans la pile | Périmètre cible | Identité native | Maturité (2027) |
|---|---|---|---|---|
| **`A2A v1.0`** *(+ fusion `ACP`)* | Délégation d'objectifs, états `Task`, artefacts et webhooks | Intra-entreprise & B2B structuré | `OAuth 2.1 OBO`, `mTLS` ou `DID` | **Standard industriel majeur** (LF / AAIF) |
| **`AGNTCY OASF` + `Directory`** | Taxonomie des compétences, provenance `OCI` et index `DHT` | Flottes > 15 agents & consortiums | `Sigstore` / `SPIFFE` / `DID` | **Production mature** (Linux Foundation) |
| **`AGNTCY SLIM` + `MLS`** | Messagerie `QUIC` sans port entrant & chiffrement E2E post-quantique | Essaims temps réel, sites `IT/OT`, salles B2B | Feuilles `TreeKEM` (`SPIFFE` / `did:wba`) | **Production haute sécurité** (`RFC 9420`) |
| **`ANP` (`did:wba`)** | Identité décentralisée sur DNS/TLS et découverte Web ouverte | Écosystèmes B2B multi-fournisseurs | `W3C DID` (`did:wba`) + `vLEI` | **Déploiement B2B encadré par DMZ** |

En production, aucun agent interne n'est exposé directement au réseau externe : toute interaction `ANP`/`A2A` franchit une **DMZ Agentique** (*B2B Agentic Edge Gateway*) qui vérifie le `did:wba` et le `vLEI`, rejette tout champ de texte libre non borné pour bloquer l'injection indirecte (`OWASP ASI01`), applique des quotas stricts par partenaire (*tenant isolation*) et marque le contexte interne avec `external_partner_origin = true`. De même, la passerelle réécrit les en-têtes de télémétrie distribuée (`W3C Trace Context` `traceparent` / `tracestate`) : elle maintient une table de corrélation locale avec l'identifiant de trace externe pour faciliter le diagnostic conjoint d'incidents B2B, mais nettoie tout attribut interne susceptible de révéler aux tiers la topologie des microservices ou les noms des modèles utilisés en interne.

#### Extrait 6.4 — Document d'identité `ANP` (`did:wba`) et politique `Cedar` d'admission DMZ

```json
{
  "_endpoint": "GET https://b2b-agents.acier-laurentides.ca/sales/rfq-responder/did.json",
  "@context": ["https://www.w3.org/ns/did/v1", "https://w3id.org/security/suites/jws-2020/v1"],
  "id": "did:wba:b2b-agents.acier-laurentides.ca:sales:rfq-responder",
  "verificationMethod": [{
    "id": "did:wba:b2b-agents.acier-laurentides.ca:sales:rfq-responder#key-auth-1",
    "type": "JsonWebKey2020",
    "controller": "did:wba:b2b-agents.acier-laurentides.ca:sales:rfq-responder",
    "publicKeyJwk": { "kty": "OKP", "crv": "Ed25519", "x": "11qYAYKxCrfVS_7TyWQHOg7hcvPapiMlrwIaaPcHURo" }
  }],
  "authentication": ["did:wba:b2b-agents.acier-laurentides.ca:sales:rfq-responder#key-auth-1"],
  "service": [
    {
      "id": "#a2a",
      "type": "A2AAgentEndpoint",
      "serviceEndpoint": "https://b2b-agents.acier-laurentides.ca/a2a/v1/rfq-responder"
    },
    {
      "id": "#vlei",
      "type": "LegalEntityVerifiableCredential",
      "serviceEndpoint": "https://b2b-agents.acier-laurentides.ca/vc/gleif-vlei.vc.json"
    }
  ]
}
```

```cedar
// Politique Cedar exécutée en coupure sur la DMZ Agentique du Groupe Boréal
permit (
  principal is ExternalAgent,
  action == Action::"a2a:SubmitTaskResponse",
  resource is BorealProcurementSession
)
when {
  principal.didMethod == "did:wba" &&
  principal.hasValidGleifVlei == true &&
  principal.erpVendorStatus == "APPROVED_ACTIVE" &&
  resource.invitedSuppliers.contains(principal.did) &&
  context.payloadMimeType == "application/json" &&
  context.schemaValidationPassed == true &&
  context.containsFreeformInstructions == false
};

forbid (principal is ExternalAgent, action, resource)
when {
  [
    "INTERNAL_CONFIDENTIAL",
    "BSIF_REGULATED",
    "PII_LOI25"
  ].contains(resource.dataClassification)
};
```

::: {.encadre-sectoriel title="Chaîne logistique mondiale — Fédération d'annuaires d'agents entre donneurs d'ordres et transporteurs"}

Lors d'une fermeture portuaire imprévue ou d'un arrêt d'écluse sur la Voie maritime du Saint-Laurent, les messages `EDI X12` / `EDIFACT` traditionnels montrent leur limite : conçus pour exécuter des contrats cadres figés, ils ne savent pas négocier à la volée un reroutage multimodal conditionnel.

En 2027, les chargeurs et transitaires combinent `OASF`, `ANP` et `SLIM/MLS` sur trois temps : (1) sélection dans un `Agent Directory` fédéré des transporteurs disposant des certifications requises (`corridor:rotterdam-montreal`, `hazmat:class-9`) sans exposer leurs tarifs ; (2) ouverture de canaux `A2A v1.0` isolés sous chiffrement `MLS` post-quantique garantissant qu'aucun courtier cloud ni concurrent ne puisse lire les cotations spot ; (3) échange de connaissements électroniques (*eBL*) sous forme d'`Artifact` typés conformes aux schémas `DCSA`, compressant le reroutage complet de **38 heures à 14 minutes**.

:::

::: {.encadre-sectoriel title="Secteur Financier & Assurances — Muraille de Chine informationnelle inter-filiales sous BSIF E-23 et Loi 25"}

Dans un groupe détenant à la fois des filiales commerciales et une institution financière supervisée, l'interopérabilité agentique ne doit jamais violer les **murailles de Chine (*Information Barriers*)**. La **Loi 25** québécoise interdit le partage interne de renseignements personnels hors de la finalité consentie, tandis que la ligne directrice **BSIF E-23** (1er mai 2027) impose une frontière stricte d'auditabilité autour des modèles de risque.

`A2A v1.0` matérialise ici le patron d'**adjudication à divulgation minimale** : interrogé par la filiale industrielle, l'agent de la filiale d'assurance n'expose jamais le dossier financier ni l'historique de sinistralité ; son `outputSchema` ne renvoie qu'un verdict signé (`APPROVED` / `ESCALATE`), le plafond couvert en dollars et un jeton d'autorisation opaque. La donnée sensible demeure confinée dans son enclave réglementaire tout en automatisant le processus transversal.

:::

---

## 6.5 Application au fil rouge : interconnexion horizontale chez Groupe Boréal

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Maillage horizontal A2A v1.0 et SLIM entre BSN, BCA et BEL"}

**Impasse initiale (Fin T4 2026)** :
Une fois leurs premiers serveurs `MCP` bâtis localement, les équipes de **BSN**, **BCA** et **BEL** avaient tenté de relier leurs agents par des webhooks REST ad hoc. Résultat : deux semaines d'adaptation à chaque nouveau flux, des doublons de réservation lorsque l'`IBM i (AS/400)` de BCA mettait 95 secondes à analyser un avenant complexe, et un refus catégorique de la sécurité industrielle d'ouvrir des ports HTTPS entrants vers les quatre usines BEL.

**Architecture déployée (T1–T2 2027)** :

1. **Catalogue `AGNTCY OASF` et `Agent Cards` certifiées** : les 18 agents spécialistes du groupe sont publiés en artefacts OCI signés `Cosign` (Extrait 6.2). `agentgateway` vérifie chaque signature `JWS` avant routage — bloquant en 4 ms un faux agent injecté lors d'un test d'intrusion *Red Team*.
2. **Boucle `input-required` auto-résolue entre BCA et BSN** : dans 22 % des dossiers de maintenance préventive, l'*Agent Garantie* BCA réclame la preuve de lubrification des six derniers mois via l'état `input-required` (Extrait 6.1). `Temporal` capte le webhook signé, récupère automatiquement l'empreinte certifiée auprès du spécialiste télémétrie BSN et relance le même `taskId` sans intervention humaine.
3. **Tunnels sortants `SLIM + MLS` en usine et DMZ `ANP` fournisseurs** : les usines BEL maintiennent uniquement une liaison sortante `QUIC` (`SLIM`) chiffrée en `MLS` `X25519MLKEM768`. En parallèle, la DMZ Agentique connecte via `did:wba` 25 fournisseurs nord-américains pré-qualifiés (Extrait 6.4) pour les demandes de prix d'urgence en JSON strict.

**Résultats mesurés à 90 jours** :

* **Intégration d'un nouvel agent spécialiste au maillage** : réduite de **6 semaines à 1,5 jour**.
* **Dossiers incomplets (`input-required`) résolus sans humain** : **89 % traités en moins de 6 secondes** (contre 19 heures de courriels internes auparavant).
* **Consultation spot de 3 fournisseurs externes** : ramenée de **28 heures à 4 minutes 10 secondes**, avec **zéro port entrant ouvert** sur les périmètres d'usine.

:::

---

## 6.6 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-006 — Utilisation d'A2A v1.0 et d'Agent Cards signées pour toute délégation inter-domaines"}

* **Statut** : Acceptée | **Périmètre** : Fabrique Agentique d'Entreprise & DMZ B2B | **Révision** : Semestrielle
* **Contexte** : Coordonner des agents autonomes répartis entre divisions réglementées, usines `IT/OT` et partenaires externes exige un protocole horizontal respectant l'opacité interne des pairs, les cycles longs et la traversée sécurisée des frontières réseau sans dépendance à un éditeur unique.
* **Options évaluées** :
  1. *Agents exposés comme outils `MCP` distants* : **Rejetée** — bloque les contextes sur les cycles longs et prive l'architecture de machine à états asynchrone (`input-required`, webhooks).
  2. *Bus propriétaire mono-éditeur SaaS* : **Rejetée** — verrouillage contractuel critique et inadaptation aux systèmes patrimoniaux et industriels.
  3. *Standardisation `A2A v1.0` + `AGNTCY OASF / Directory` + `SLIM/MLS` ciblé* : **Retenue** — gouvernance ouverte Linux Foundation, gestion native du streaming et du push asynchrone, découverte signée et chiffrement post-quantique.
* **Décision** :
  1. Toute délégation inter-domaines ou B2B emprunte **`A2A v1.0`** munie d'une `ActionEnvelope` (`sagaId`, clé d'idempotence, budget, `maxRemainingHops`).
  2. Chaque `Agent Card` porte une signature `JWS` validée en passerelle et correspond à un manifeste **`OASF`** signé dans l'`Agent Directory`.
  3. Toute tâche dont la durée P95 dépasse **60 secondes** utilise obligatoirement le mode non bloquant à webhooks `Push` signés reliés au moteur durable.
  4. Les flux vers les sites `IT/OT` et les sessions multipartistes B2B passent par **`SLIM`** sous chiffrement **`IETF MLS` (`X25519MLKEM768`)** et traversent la **DMZ Agentique** (`ANP` `did:wba` + `Cedar`).
* **Conséquences** :
  * *Positives* : Découplage complet des équipes, remplacement sans interruption des modèles sous-jacents, résilience aux coupures longues et confidentialité post-quantique de bout en bout.
  * *Négatives / Coûts assumés* : Exploitation de la chaîne de signature `Sigstore`/JWS, gouvernance des schémas JSON inter-domaines et maintien des relais `SLIM` en DMZ.
* **Condition de révision** : Publication d'une révision majeure d'`A2A` ou convergence normative W3C/AAIF sur l'identité d'agents B2B.

:::

### Liste de contrôle de mise en production — Chapitre 6

Avant d'homologuer une interconnexion horizontale inter-domaines ou B2B, vérifiez les huit points suivants :

1. **Authenticité de l'`Agent Card`** : Le fichier `/.well-known/agent-card.json` comporte-t-il une signature `JWS` canonique vérifiée en coupure et restreint-il ses compétences sensibles à `authenticatedExtendedCard` ?
2. **Provenance `OASF` certifiée** : Le manifeste `AGNTCY OASF` est-il signé dans le registre OCI via `Sigstore`/`Cosign` avec des métriques \(\text{pass}^k\), coût et latence P95 à jour ?
3. **Zéro attente active sur tâches longues** : Toute délégation de plus de 60 secondes utilise-t-elle des notifications `pushNotificationConfig` réveillant un état durable plutôt qu'une boucle de sondage `tasks/get` ?
4. **Durcissement anti-SSRF des webhooks** : Les URL de rappel sont-elles restreintes par liste blanche d'identité, protégées contre les IP internes privées et munies d'un `nonce` horodaté signé ?
5. **Schémas JSON fermés** : Les `DataPart` et `Artifact` imposent-ils `additionalProperties: false` et le rejet de prose d'instruction libre sur les flux externes (`OWASP ASI01`) ?
6. **Compteur de sauts déterministe** : La passerelle décrémente-t-elle `maxRemainingHops` à chaque appel `A2A v1.0` jusqu'au rejet automatique à zéro ?
7. **Chiffrement `MLS` post-quantique** : Les sessions de groupe `SLIM` ou traversant un courtier tiers activent-elles `X25519MLKEM768` avec rotation immédiate des clés au départ d'un membre ?
8. **Terminaison en DMZ Agentique (`ANP`)** : Les agents externes `did:wba` sont-ils authentifiés avec attestation d'entité légale (`vLEI`/ERP), isolés par quotas dédiés et privés de tout accès aux données réglementées ?
