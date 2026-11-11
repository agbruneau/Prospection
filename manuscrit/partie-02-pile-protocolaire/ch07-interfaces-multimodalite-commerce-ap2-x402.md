# Chapitre 7 — Interfaces humain-agent, multimodalité temps réel et protocoles transactionnels (AG-UI, A2UI, AP2, x402)

::: {.synthese-executive title="Synthèse exécutive — Chapitre 7"}

* **Enjeu d'affaires et de risque** : Une fabrique agentique bien orchestrée en arrière-plan (`MCP` + `A2A v1.0`) échoue sur le **dernier kilomètre** si elle restitue ses arbitrages dans une boîte de clavardage textuelle, si elle contraint un technicien ganté en atelier bruyant à taper sur un écran, ou si elle confie une carte bancaire partagée à un modèle probabiliste pour payer un fournisseur externe. L'interface humaine et le règlement financier concentrent le risque de complaisance cognitive (`OWASP ASI09`) et de fraude transactionnelle.
* **Décisions architecturales structurantes** :
  1. *Irréversible côté sécurité client* : Interdire aux agents d'émettre du code `HTML` ou `JavaScript` exécutable vers le navigateur ; imposer le protocole événementiel **`AG-UI`** couplé aux descripteurs déclaratifs **`A2UI`** rendus par un catalogue local de composants natifs homologués.
  2. *Structurante pour le terrain industriel* : Déployer **`WebRTC`** en *full-duplex* (`UDP`/`SRTP`) plutôt que des flux TCP pour toute assistance vocale et visuelle temps réel, avec interruption (*barge-in*) sous **200 ms** et troncature exacte du contexte serveur.
  3. *Inviolable pour l'autonomie financière* : Proscrire les moyens de paiement statiques partagés au profit de mandats vérifiables **`AP2`** (*Intent Mandate* et *Cart Mandate* au format **W3C VC 2.0** signés via **FIDO2 / WebAuthn**) et du règlement programmable **`HTTP 402` (`x402`)**.
* **Indicateurs de gouvernance associés** : Délai médian d'arbitrage humain éclairé en `HOTL` (< 30 s), latence voix-à-voix P95 (< 450 ms) et *barge-in* (< 200 ms), et **100 % des paiements agentiques couverts par une preuve tripartite (`AP2` + `Cedar` + reçu `x402`/ERP)**.

:::

## 7.1 Interfaces réactives pilotées par événements : AG-UI, deltas d'état et A2UI / MCP-UI

Pendant la vague initiale des copilotes, le flux continu de texte Markdown s'est imposé par défaut comme interface universelle. En production d'entreprise en 2027 — souscription d'assurance, tour de contrôle logistique, supervision `HOTL` —, le mur de prose constitue un **anti-patron ergonomique et sécuritaire** : parcourir quarante lignes générées pour repérer une anomalie tarifaire épuise l'opérateur, encourage l'approbation réflexe (`OWASP ASI09`) et empêche la co-édition structurée d'un dossier métier.

L'architecture moderne découple **le transport bidirectionnel d'événements et d'état (`AG-UI`)** de **la spécification déclarative des vues (`A2UI` et `MCP-UI`)**.

### AG-UI (*Agent-User Interaction Protocol*) : synchronisation d'état par JSON Patch

Initié autour de CopilotKit en 2025 puis adopté largement par les moteurs d'orchestration (`LangGraph`, `Microsoft Agent Framework`, `CrewAI`, `Mastra`), **`AG-UI`** normalise la liaison entre le runtime agentique et le client frontal sur `SSE` ou `WebSockets` autour de quatre familles d'événements :

1. **Cycle d'exécution** (`RUN_STARTED`, `STEP_STARTED`, `STEP_FINISHED`, `RUN_FINISHED`, `RUN_ERROR`), exposant l'avancement exact de la saga sans divulguer de chaîne de pensée interne sensible.
2. **Flux de messages** (`TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT`, `TEXT_MESSAGE_END`) corrélés par `messageId`.
3. **Appels d'outils visibles et frontaux** (`TOOL_CALL_START`, `TOOL_CALL_ARGS`, `TOOL_CALL_END`), permettant aussi d'invoquer une action locale du poste client (comme une invite matérielle `WebAuthn`).
4. **État partagé par différentiels (`STATE_SNAPSHOT` et `STATE_DELTA`)** : après une photographie initiale, l'agent n'émet plus que des patchs atomiques **JSON Patch (`RFC 6902`)** (`replace`, `add`, `remove`). Symétriquement, toute modification de champ par l'opérateur remonte en différentiel typé vers l'agent : humain et machine collaborent directement sur le même modèle d'état.

### A2UI et MCP-UI : interfaces génératives sans exécution de code arbitraire

Pour permettre à l'agent de composer dynamiquement l'écran adapté au contexte sans introduire de faille `XSS` ni d'exfiltration de session, deux standards coopèrent :

* **`MCP-UI`** : lorsqu'un serveur `MCP` tiers fournit une visualisation spécialisée absente du *Design System* interne, `MCP-UI` l'isole dans une **`iframe` sandboxée sans origine partagée**, limitée à un canal de messages filtrés.
* **`A2UI` (*Agent-to-User Interface*)** : porté par Google fin 2025 pour les interfaces critiques natives, `A2UI` applique une règle stricte : **des données, jamais du code**. L'agent transmet une **liste plate d'adjacence JSON** référençant uniquement des composants abstraits liés par `JSON Pointer` à l'état `AG-UI`. Le client instancie ses propres composants homologués (React, Angular, Flutter), garantissant charte graphique, accessibilité `WCAG` et immunité totale contre l'injection de script.

Deux subtilités d'ingénierie expliquent le choix de cette structure en production :

* **Avantage du graphe plat d'adjacence pour le streaming** : un arbre JSON profondément imbriqué est invalide tant que toutes ses accolades fermantes n'ont pas été reçues. À l'inverse, la liste plate d'objets composants d'`A2UI` permet au poste client de rendre progressivement le squelette de la carte dès les cinquante premières millisecondes, puis d'hydrater chaque sous-composant à mesure que les jetons arrivent.
* **Prévention des conflits d'édition concurrents (`RFC 6902 test`)** : lorsque l'humain et l'agent modifient simultanément le même dossier, un `STATE_DELTA` réseau retardé risquerait d'écraser la saisie manuelle de l'opérateur. En incluant systématiquement une opération atomique `{"op": "test", "path": "/_revision", "value": 14}` en tête de chaque lot `JSON Patch`, le magasin d'état rejette proprement toute mutation obsolète et force une réconciliation explicite.

| Paradigme d'interface | Sécurité client (`XSS` / `ASI01`) | Accessibilité & Cohérence UI | Co-édition d'état | Usage cible en entreprise (2027) |
|---|---|---|---|---|
| **Clavardage Markdown brut** | Moyenne (liens/images forgés) | Faible sur dossiers métiers denses | Nulle | Recherche documentaire simple (`L0`/`L1`) |
| **Génération `HTML`/`JS` libre** | **Critique (Inacceptable)** | Aléatoire | Fragile | **Proscrit en production** |
| **`MCP-UI` (`iframe` isolée)** | Élevée sous `sandbox` strict | Propre à l'éditeur tiers | Par pont d'événements | Widgets externes spécialisés (CAO, cartes) |
| **`AG-UI` + Catalogue `A2UI`** | **Maximale (Zéro code reçu)** | **Native (*Design System* interne)** | **Bidirectionnelle (`RFC 6902`)** | **Postes opérateurs, consoles `HOTL`, mobile** |

#### Extrait 7.1 — Flux `AG-UI` (`STATE_DELTA`) et descripteur déclaratif `A2UI` pour une escalade `HOTL`

```json
// 1. Événement AG-UI : mise à jour différentielle de l'état partagé (JSON Patch RFC 6902)
{
  "type": "STATE_DELTA",
  "threadId": "thr-hotl-bca-88412",
  "runId": "run-99201",
  "delta": [
    { "op": "replace", "path": "/claim/status", "value": "AWAITING_UNDERWRITER_HOTL" },
    { "op": "replace", "path": "/claim/estimatedCostCad", "value": 6420.00 },
    { "op": "add", "path": "/escalationReasons/0", "value": "Dépassement du plafond L3 (5 000 $ CAD)" }
  ]
}

// 2. Événement A2UI : liste plate d'adjacence instanciée par le catalogue React homologué
{
  "type": "CUSTOM",
  "name": "a2ui.surfaceUpdate",
  "value": {
    "surfaceId": "hotl-decision-panel",
    "catalogId": "https://ui.internal.boreal.ca/catalogs/bca-underwriting-v2.json",
    "rootComponentId": "card-root",
    "components": [
      {
        "id": "card-root",
        "component": "BorealEscalationCard",
        "props": { "severity": "warning", "title": "Escalade HOTL — Compresseur BOR-CMP-90441" },
        "children": ["diff-evidence", "cap-adjuster", "fido-action-bar"]
      },
      {
        "id": "diff-evidence",
        "component": "ContradictionDiffTable",
        "dataBinding": { "rowsPath": "/evidenceComparison", "ceilingPath": "/policy/l3CeilingCad" }
      },
      {
        "id": "cap-adjuster",
        "component": "CurrencyBoundInput",
        "props": { "label": "Plafond approuvé (CAD)", "min": 0, "max": 15000 },
        "twoWayBinding": "/claim/approvedCapCad"
      },
      {
        "id": "fido-action-bar",
        "component": "WebAuthnMandateBar",
        "props": { "approveActionId": "SIGN_AP2_CART", "requireHardwarePasskey": true }
      }
    ]
  }
}
```

---

## 7.2 Agents vocaux et visuels temps réel : pipelines WebRTC full-duplex et gestion du barge-in

En usine d'usinage, en entrepôt frigorifique ou lors d'une intervention sur turbine, le technicien porte des gants isolants, tient un outil de mesure et travaille sous 85 dB(A) de bruit mécanique. L'écran tactile devient impraticable : **l'audio mains libres et le flux caméra temps réel deviennent le canal primaire du *System of Action***.

### Supériorité industrielle de WebRTC sur WebSockets / TCP

Transporter de la voix interactive sur `WebSockets` (`TCP`) échoue dès qu'un opérateur se déplace entre deux bornes Wi-Fi 6E ou 5G privée : une perte radio de 2 % bloque la file d'attente `TCP` (*Head-of-Line Blocking*), figeant l'audio pendant près d'une seconde avant de déverser une rafale incompréhensible.

Une architecture terrain de production s'appuie donc sur **`WebRTC` *full-duplex*** terminé sur une passerelle média de périphérie (*Edge SFU*) :

* **Audio `Opus` sur `UDP` / `SRTP`** (trames de 20 ms avec correction d'erreur *In-Band FEC*) absorbant la gigue radio sans interruption ;
* **Piste vidéo sobre (1 à 2 trames/s à la demande)** suffisante pour lire une plaque signalétique ou inspecter un bornier sans saturer les GPU ;
* **`SCTP DataChannel` couplé** synchronisant simultanément l'affichage `AG-UI`/`A2UI` sur une tablette posée à proximité.

### Budget de latence et réconciliation sur *barge-in*

La fluidité conversationnelle exige un délai total entre la fin sémantique du tour humain et le premier échantillon sonore de réponse inférieur à **450 millisecondes** :

\[L_{\text{voix}} = L_{\text{net}} + L_{\text{VAD/EOU}} + L_{\text{inf}} + L_{\text{audio}} \le 450\text{ ms}\]

Dans cette décomposition budgétaire, \(L_{\text{net}}\) couvre le transport aller-retour `UDP/SRTP`, \(L_{\text{VAD/EOU}}\) la détection de fin de tour, \(L_{\text{inf}}\) le temps au premier jeton du modèle et \(L_{\text{audio}}\) la synthèse vocale. Si les modèles **Speech-to-Speech (`S2S`)** natifs abaissent ce délai vers 280 ms, les **pipelines cascadés streaming** (`VAD` neuronale + `STT` + `SLM` + `TTS` basse latence, ~390 ms) restent privilégiés en environnement industriel réglementé : leur étape texte intermédiaire permet un filtrage déterministe du vocabulaire de sûreté et produit une transcription d'audit exacte.

L'invariant critique demeure le ***barge-in*** : lorsque le technicien coupe la parole à l'agent (« *Stop, la vanne est grippée !* »), le détecteur vocal filtrant les bruits d'impact mécanique doit purger le tampon audio client en **moins de 180 ms**, interrompre la synthèse serveur via `DataChannel` et **tronquer l'historique conversationnel de l'agent au mot exact réellement entendu**, évitant tout décalage dangereux sur les consignes non prononcées.

En complément du *barge-in*, le déploiement industriel exige de soigner la **détection sémantique de fin de tour (*Semantic End-of-Utterance*, `EOU`)** et la traversée réseau :

* **Éviter les coupures prématurées sur hésitation technique** : un détecteur acoustique naïf déclenchant la réponse après 350 ms de silence coupe systématiquement la parole à un technicien qui lit un manomètre (« *La pression d'huile affiche... quarante-deux virgule... huit bars* »). L'adjonction d'un micro-modèle syntaxique `EOU` léger (< 150 millions de paramètres, latence de 12 ms sur CPU) évalue si l'énoncé en cours est grammaticalement achevé avant d'autoriser l'agent à prendre la parole, réduisant de 70 % les collisions vocales.
* **Relais `TURN` d'entreprise sur port 443** : sur les réseaux d'usine segmentés où l'`UDP` direct est parfois filtré entre zones, le déploiement de serveurs `TURN` internes dédiés avec repli `DTLS/SRTP` garantit un établissement d'appel `ICE` en moins de 300 ms sans acheminer le flux média par un nuage public tiers.

::: {.encadre-sectoriel title="Terrain Industriel & Conformité — Transparence multimodale (EU AI Act Art. 50) et biométrie vocale (Loi 25)"}

Les interfaces vocales et visuelles activent deux exigences légales strictes en 2027 :

1. **`EU AI Act` (Articles 50 et 5)** : l'article 50 (actif depuis août 2026) impose d'informer clairement l'utilisateur dès l'ouverture d'un canal vocal synthétique. Surtout, l'**article 5(1)(f)** interdit formellement les systèmes inférant les émotions des employés sur le lieu de travail (hors sûreté médicale/fatigue critique) : tout module d'analyse émotionnelle de la voix doit être banni.
2. **Biométrie sous la `Loi 25` et la `LCCJTI` au Québec** : identifier un employé par empreinte vocale (*voiceprint*) sur `WebRTC` constitue une base biométrique exigeant consentement exprès, `EFVP` et **déclaration à la `CAI` 60 jours avant déploiement**. Imposez plutôt l'authentification matérielle par badge `FIDO2`/`NFC`.

:::

---

## 7.3 Commerce agentique : mandats vérifiables AP2 (FIDO / W3C VCs) et règlement HTTP x402

De nombreux workflows agentiques débouchent sur un **engagement financier** : achat unitaire d'une donnée douanière ou météo haute précision, réservation de fret spot ou commande d'une pièce critique.

![Architecture convergente du dernier kilomètre : interfaces réactives AG-UI / A2UI et WebRTC d'un côté, chaîne d'autorisation AP2 et règlement HTTP x402 de l'autre.](manuscrit/figures/fig-07-agui-webrtc-ap2-x402.svg)

Confier le numéro d'une carte d'entreprise partagée à un agent viole la non-répudiation : en cas d'hallucination ou d'injection indirecte, aucune preuve cryptographique ne relie le décaissement à une intention approuvée. Deux protocoles complémentaires ferment cette brèche : **`AP2`** pour l'**autorisation vérifiable** et **`x402`** pour le **règlement HTTP machine-à-machine**.

### AP2 (*Agent Payments Protocol*) : Intent Mandate et Cart Mandate

Porté par Google avec Mastercard, PayPal, American Express, Adyen et Coinbase en alignement avec les standards **W3C Verifiable Credentials 2.0** et **FIDO Alliance (`WebAuthn`)**, **`AP2`** est agnostique au rail final (cartes tokenisées, virement instantané ou actif régulé) et définit deux preuves signées matériellement (`FIDO2` Passkey ou `HSM`) :

1. **`Cart Mandate` (*Human-Present* / validation `HOTL`)** : l'approbateur signe via `WebAuthn` le **hachage `SHA-256` exact du panier** (articles, quantités, montant, devise et `DID` marchand), rendant impossible toute altération ultérieure par l'agent.
2. **`Intent Mandate` (*Human-not-Present* autonome `L3`/`L4`)** : délégation préalable à contraintes déterministes (plafond unitaire et journalier, catégories `UNSPSC`, liste blanche de `DID` marchands et expiration `TTL`) permettant aux agents d'acheter sans attente humaine dans un cadre mathématiquement borné.

Cette architecture résout la question juridique autrefois insoluble de l'**attribution de responsabilité en cas de litige (*Dispute & Chargeback Evidence*)** : lors d'une contestation, l'acquéreur bancaire inspecte la chaîne cryptographique reliant l'`Intent Mandate` signé par l'entreprise cliente et l'offre signée par l'agent marchand. Si la transaction respecte intégralement les bornes signées du mandat, l'acheteur ne peut répudier la dépense au prétexte d'une « erreur de son IA » ; inversement, si un règlement a été exécuté au-delà du plafond ou hors des `DID` marchands autorisés, la faute est mathématiquement établie côté passerelle ou facilitateur fautif.

### Règlement programmable x402 (`HTTP 402 Payment Required`)

Longtemps inutilisé, le code standard **`HTTP 402`** est activé par le protocole ouvert **`x402`** (fondation x402 initiée par Coinbase et Cloudflare, intégré comme extension d'`AP2`). Il permet à un agent de payer à la requête une API externe ou un serveur `MCP` marchand distant sur `Streamable HTTP` **sans ouverture manuelle de compte ni abonnement préalable** : (1) appel initial ; (2) réponse `402 Payment Required` + en-tête `PAYMENT-REQUIRED` chiffrant le tarif exact, l'actif et le bénéficiaire ; (3) vérification déterministe par `Cedar` sur `agentgateway` que l'offre respecte l'`Intent Mandate AP2` actif ; (4) réémission avec `PAYMENT-SIGNATURE` ; (5) compensation via facilitateur agréé et réponse `200 OK` munie du reçu immuable `PAYMENT-RESPONSE`.

| Rail transactionnel | Friction d'ouverture | Contrôle granulaire par panier | Délai & Frais | Cas d'usage cible (2027) |
|---|---|---|---|---|
| **Carte virtuelle partagée** | Faible | Nul (plafond global aveugle) | Temps réel ; 1,5–2,9 % | **Déconseillé pour agents autonomes** |
| **Bon de commande `EDI` / ERP** | Très lourde (semaines) | Élevé (rapprochement 3-voies) | Jours (ACH / virement) | Contrats cadres récurrents (> 10 000 \$ CAD) |
| **`AP2` sur rails bancaires / cartes** | Modérée | **Maximal (`Cart`/`Intent Mandate` `FIDO2`)** | Secondes ; gestion litiges | **Achats spot B2B d'équipements et fret** |
| **`AP2` + `HTTP x402`** | **Nulle (zéro compte préalable)** | **Maximal (Mandat `AP2` + coupe-circuit)** | **< 250 ms ; < 0,001 \$** | **Micro-paiements d'API et données à l'acte** |

#### Extrait 7.2 — `Intent Mandate` et `Cart Mandate` `AP2` (`W3C VC 2.0` + assertion `FIDO2`)

```json
{
  "@context": ["https://www.w3.org/ns/credentials/v2", "https://schemas.agentpayments.org/ap2/v1"],
  "id": "urn:uuid:ap2-intent-boreal-bel-2027-0391",
  "type": ["VerifiableCredential", "AP2IntentMandate"],
  "issuer": "did:wba:boreal.ca:treasury:procurement-authority",
  "validFrom": "2027-03-01T00:00:00Z",
  "validUntil": "2027-03-31T23:59:59Z",
  "credentialSubject": {
    "delegatedAgent": "spiffe://boreal.ca/ns/bel/sa/spot-procurement-orchestrator",
    "mandateClass": "HUMAN_NOT_PRESENT_BOUNDED",
    "constraints": {
      "currency": "CAD",
      "maxSingleTransactionAmount": "2500.00",
      "maxDailyCumulativeAmount": "7500.00",
      "allowedUnspscCategories": ["78101800", "81141601"],
      "allowedMerchantDids": [
        "did:wba:b2b-agents.acier-laurentides.ca:sales:rfq-responder",
        "did:wba:api.customs-tariffs-na.ca:x402:gateway"
      ]
    },
    "cartMandateBindingTemplate": {
      "requiredDigestAlgorithm": "SHA-256",
      "exampleLockedCartDigest": "sha256:4e91b8c02d77a6f3198c0012e4b77a91d2f33018a6c554b190e82d3f11a04c92"
    }
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "ecdsa-rdfc-2019",
    "verificationMethod": "did:wba:boreal.ca:treasury:procurement-authority#fido2-hsm-key-04",
    "proofPurpose": "assertionMethod",
    "fido2AuthenticatorData": "SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2MFAAAAAQ...",
    "proofValue": "z3FXQjecWufY46kLp2mN8qR9vT1xW"
  }
}
```

#### Extrait 7.3 — Séquence `HTTP 402` (`x402`) couplée à la vérification du mandat `AP2`

```http
### 1. Requête initiale de l'agent vers un service externe de décisions tarifaires douanières
POST /v2/hs-classification/ruling-lookup HTTP/1.1
Host: api.customs-tariffs-na.ca
Content-Type: application/json

{"componentSpec": "Rotor haute pression Inconel 718", "originCountry": "US", "destCountry": "CA"}

### 2. Défi tarifaire retourné par le serveur marchand (0,04 USD à l'acte)
HTTP/1.1 402 Payment Required
Content-Type: application/problem+json
PAYMENT-REQUIRED: eyJ4NDAyVmVyc2lvbiI6Miwic2NoZW1lIjoiZXhhY3QiLCJhbW91bnQiOiI0MDAwMCIsImFzc2V0IjoidXNkYyIsIm1lcmNoYW50RGlkIjoiZGlkOndiYTphcGkuY3VzdG9tcy10YXJpZmZzLW5hLmNhOng0MDI6Z2F0ZXdheSJ9

{"title": "Paiement x402 requis", "amount": "0.04 USD", "expiresAt": "2027-03-14T14:25:00Z"}

### 3. Relance par agentgateway après contrôle Cedar de l'Intent Mandate AP2 et signature HSM
POST /v2/hs-classification/ruling-lookup HTTP/1.1
Host: api.customs-tariffs-na.ca
Content-Type: application/json
Idempotency-Key: x402-saga-088412-step-ruling
PAYMENT-SIGNATURE: eyJ4NDAyVmVyc2lvbiI6MiwiYXAyTWFuZGF0ZVJlZiI6InVybjp1dWlkOmFwMi1pbnRlbnQtYm9yZWFsLWJlbC0yMDI3LTAzOTEiLCJub25jZSI6IjhmMmExMWM0Iiwic2lnbmF0dXJlIjoiMHhhOTc0Li4uIn0=

{"componentSpec": "Rotor haute pression Inconel 718", "originCountry": "US", "destCountry": "CA"}

### 4. Règlement atomique via facilitateur agréé, réponse métier et reçu comptable immuable
HTTP/1.1 200 OK
Content-Type: application/json
PAYMENT-RESPONSE: eyJzZXR0bGVkIjp0cnVlLCJ0eEhhc2giOiIweDRmOGIyYzE5Li4uIiwic2V0dGxlZEF0IjoiMjAyNy0wMy0xNFQxNDoyMzowNloifQ==

{"hsCode": "8414.90.41.00", "mfnDutyRate": 0.0, "usmcaEligible": true, "rulingRef": "CBSA-2026-8812"}
```

::: {.encadre-sectoriel title="Commerce B2B & Fintech — Encadrement cryptographique des micro-paiements d'API et d'achats spot"}

L'homologation d'`AP2` et de `x402` par une direction financière exige trois verrous en passerelle sortante :

1. **Ségrégation des clés et criblage LCB-FT (*KYT*)** : aucun conteneur d'agent ne détient de clé de signature financière. Seul le module trésorerie d'`agentgateway` signe `PAYMENT-SIGNATURE`, après filtrage temps réel des listes de sanctions (`OFAC`, `CANAFE`/`SCRS`, `UE`) et validation d'un facilitateur institutionnel agréé.
2. **Disjoncteur de vélocité horaire** : indépendamment des mandats individuels, un coupe-circuit déterministe bloque toute signature si le flux agrégé de la flotte dépasse un plafond horaire anormal (ex. 500 \$ CAD/h sur les API externes), stoppant net toute boucle de drainage.
3. **Imputation ERP automatisée** : chaque `PAYMENT-RESPONSE` est corrélé au `sagaId` `OpenTelemetry` et déversé quotidiennement dans le grand livre `SAP S/4HANA` avec sa preuve `AP2` opposable aux auditeurs externes.

:::

---

## 7.4 Application au fil rouge : poste opérateur multimodal et achats spot chez Groupe Boréal

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Poste opérateur AG-UI/A2UI, guidage vocal WebRTC en usine et achats spot AP2/x402"}

**Frictions résiduelles (Début 2027)** :
En usine **BEL**, les techniciens devaient ôter leurs gants toutes les six minutes pour chercher un couple de serrage sur tablette sous 84 dB(A), tandis que les souscripteurs **BCA** perdaient 14 minutes par escalade `HOTL` à relire des synthèses textuelles. Côté achats, émettre un bon de commande `SAP` pour une requête douanière à 0,04 \$ USD ou un coursier urgent coûtait plus cher en frais administratifs que le service lui-même.

**Architecture déployée (T2 2027)** :

1. **Postes `AG-UI` + `A2UI` chez BCA et BSN** : déploiement d'un catalogue de 16 composants React certifiés (Extrait 7.1). Sur escalade > 5 000 \$ CAD, le souscripteur examine le tableau différentiel des clauses `AS/400`, ajuste le plafond en `RFC 6902` et signe le `Cart Mandate AP2` avec sa clé matérielle `YubiKey FIDO2`.
2. **Guidage mains libres `WebRTC` dans les 4 usines BEL** : casques ostéophoniques antibruit (`Opus` + caméra lunettes 1,5 fps) connectés au pipeline cascadé `SLM` local, avec badgeage `FIDO2/NFC` sans aucune biométrie vocale (`Loi 25`) et annonce conforme à l'article 50 de l'`EU AI Act`.
3. **Règlements `AP2` + `x402`** : un `Intent Mandate AP2` mensuel borné (Extrait 7.2) autorise l'orchestrateur BEL à régler à l'acte les vérifications tarifaires via `x402` (Extrait 7.3) et les affrètements express sous 2 500 \$ CAD.

**Résultats mesurés en production** :

* **Temps médian de décision `HOTL` chez BCA** : abaissé de **14 minutes à 22 secondes**, avec **+19 % de détection des exclusions subtiles**.
* **Assistance vocale atelier (84 dB)** : latence P95 à **390 ms**, *barge-in* à **165 ms**, et **-27 % sur le temps de remise en route** des broches d'usinage.
* **Transactions autonomes** : **1 420 micro-paiements `x402` et 64 affrètements `AP2`** au T2 2027 avec **zéro anomalie de réconciliation `SAP`**.

:::

---

## 7.5 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-007 — Découplage déclaratif des interfaces génératives via AG-UI et A2UI"}

* **Statut** : Acceptée | **Périmètre** : Interfaces Humaines, Terminaux Terrain & Paiements Agentiques | **Révision** : Semestrielle
* **Contexte** : L'exposition directe des agents aux utilisateurs et aux réseaux de paiement introduit des risques élevés d'injection côté client (`XSS`), de complaisance d'approbation (`OWASP ASI09`), de coupures audio sur Wi-Fi industriel et d'engagements financiers non répudiables mal bornés.
* **Options évaluées** :
  1. *Clavardage Markdown + cartes d'entreprise partagées* : **Rejetée** — lenteur cognitive en `HOTL` et absence de preuve cryptographique par panier.
  2. *Génération libre de `HTML`/`JavaScript` par LLM* : **Rejetée** — risque critique d'exécution de code arbitraire dans le navigateur.
  3. *Pile normalisée `AG-UI` + `A2UI`, `WebRTC` terrain et mandats `AP2` / `x402`* : **Retenue** — séparation stricte code/données, synchronisation `RFC 6902`, résilience `UDP` et autorisation matérielle `FIDO2`/`W3C VC`.
* **Décision** :
  1. Toute interface applicative agentique utilise **`AG-UI`** (`STATE_DELTA` `RFC 6902`) et **`A2UI`** sur catalogue local homologué (ou `iframe` isolée **`MCP-UI`** pour les outils tiers).
  2. Tout canal vocal/visuel temps réel emprunte **`WebRTC` (`SRTP` + `DataChannel`)** avec troncature de contexte sur *barge-in* (< 200 ms), sans biométrie vocale ni inférence émotionnelle.
  3. Tout décaissement initié par agent requiert un **`Intent` ou `Cart Mandate AP2` (`W3C VC`)** signé matériellement (`FIDO2`/HSM), validé par `Cedar` et réglé en passerelle via rails agréés ou **`HTTP x402`**.
* **Conséquences** :
  * *Positives* : Immunité aux `XSS` génératifs, revues `HOTL` rapides et éclairées, utilisabilité mains libres en atelier et auditabilité financière complète.
  * *Négatives / Coûts assumés* : Gouvernance du catalogue `A2UI`, infrastructure relais `WebRTC` et raccordement à un facilitateur `AP2`/`x402`.
* **Condition de révision** : Unification éventuelle `A2UI`/`MCP-UI` sous l'AAIF ou ouverture des API agentiques sur le rail canadien `RTR`.

:::

### Liste de contrôle de mise en production — Chapitre 7

Avant d'ouvrir une interface agentique ou d'autoriser une transaction autonome — et avant d'aborder l'ingénierie du contexte et la mémoire en **Partie III** —, vérifiez ces huit exigences :

1. **Catalogue UI fermé** : Le client rejette-t-il tout `HTML`/`JavaScript` libre généré pour n'afficher que des composants du catalogue local `A2UI` (ou une `iframe` `MCP-UI` sans `allow-same-origin`) ?
2. **Validation serveur des deltas `AG-UI`** : Les patchs `RFC 6902` entrants sont-ils revalidés contre les règles métiers serveur avant mutation de l'état partagé ?
3. **Affichage différentiel `HOTL`** : Les vues d'escalade mettent-elles en relief les preuves contradictoires plutôt qu'un texte uniforme propice au *rubber-stamping* (`OWASP ASI09`) ?
4. **Troncature exacte sur *barge-in* `WebRTC`** : Une interruption vocale coupe-t-elle l'audio en moins de 200 ms tout en alignant la mémoire serveur sur le dernier mot réellement entendu ?
5. **Conformité `Loi 25` et `EU AI Act`** : L'annonce d'interaction IA est-elle explicite, sans collecte d'empreinte vocale biométrique ni détection d'émotions des employés ?
6. **Signature matérielle `AP2`** : Chaque `Cart Mandate` et `Intent Mandate` est-il signé hors du conteneur agentique par clé `FIDO2`/`WebAuthn` ou `HSM` ?
7. **Coupe-circuit et criblage sur `x402`** : La passerelle vérifie-t-elle la liste blanche des bénéficiaires, la clé d'idempotence et le plafond horaire global avant d'émettre `PAYMENT-SIGNATURE` ?
8. **Traçabilité comptable ERP** : Chaque reçu `PAYMENT-RESPONSE` est-il lié au `sagaId` `OpenTelemetry` et archivé automatiquement avec le mandat `AP2` dans l'ERP financier ?
