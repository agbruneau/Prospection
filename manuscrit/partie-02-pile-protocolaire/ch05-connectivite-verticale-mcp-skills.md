# Chapitre 5 — Connectivité verticale : Outils, ressources, compétences et Web (MCP, Agent Skills, WebMCP)

::: {.synthese-executive title="Synthèse exécutive — Chapitre 5"}

* **Enjeu stratégique** : Un modèle de langage demeure aveugle et impuissant tant qu'il n'est pas raccordé aux systèmes d'enregistrement, aux procédures internes et aux interfaces métiers. Or, convertir mécaniquement des API REST existantes en outils d'agents abaisse la précision sous les 45 %, gonfle la facture de jetons et expose à des écritures partielles non compensées.
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Imposer **`MCP` sur `Streamable HTTP`** derrière `agentgateway` comme unique standard vertical serveur, en bannissant les transports hérités et les clés statiques au profit d'`OAuth 2.1 OBO`.
  2. *Structurante dès la conception* : Proscrire le mappage `OpenAPI -> MCP` 1:1 au profit de **façades orientées intention métier** (5 à 12 outils par spécialiste), dotées d'un `outputSchema`, de clés d'idempotence et d'erreurs cognitives auto-correctrices.
  3. *Réversible et modulaire* : Empaqueter le savoir-faire procédural dans **`Agent Skills`** (`SKILL.md` à divulgation progressive) et instrumenter les portails web internes avec **`WebMCP`** pour éviter 80 à 90 % du recours coûteux aux agents de capture d'écran (*CUA*).
* **Indicateurs de gouvernance associés** : Empreinte de schémas d'outils par session (\(< 2\,000\) jetons), précision d'appel au premier essai (\(\text{pass}^5 \ge 95\,\%\)), latence verticale `MCP` P95 et couverture d'idempotence des outils mutatifs.

:::

## 5.1 Architecture approfondie du Model Context Protocol (`MCP`) : Host, Client, Gateway et `Streamable HTTP`

Créé fin 2024 par Anthropic puis confié fin 2025 à la **Linux Foundation AAIF**, le **Model Context Protocol (`MCP`)** constitue le « port USB-C » universel de la connectivité verticale en entreprise. Il découple durablement l'environnement qui exécute le raisonnement de l'infrastructure qui expose `SAP`, `Snowflake`, `ServiceNow` ou `HL7 FHIR`.

En production, l'architecture dépasse le face-à-face élémentaire client-serveur et repose sur **quatre rôles strictement cloisonnés** (illustrés à la figure ci-dessous) :

1. **L'Hôte Agentique (`MCP Host`)** : L'application englobante (worker `Temporal`, hôte `Goose`, IDE ou poste opérateur) qui gouverne la boucle cognitive, agrège les catalogues autorisés et arbitre toute sollicitation sensible venue d'un serveur.
2. **Le Connecteur Client (`MCP Client`)** : Instancié dans l'hôte selon une **cardinalité stricte 1:1** par serveur cible. Deux serveurs `MCP` distincts disposent de deux clients isolés en mémoire : aucune donnée ou notification ne traverse d'un canal à l'autre sans médiation explicite de l'hôte.
3. **Le Plan de Données IA (`agentgateway`)** : Coupure réseau obligatoire inspectant les trames JSON-RPC 2.0, validant `OAuth 2.1` + `DPoP`, exécutant l'échange *On-Behalf-Of* (`RFC 8693`), filtrant les outils selon `Cedar` et émettant les traces `OpenTelemetry` (`gen_ai.*`). Conformément au profil d'autorisation `MCP`, le serveur aval agit strictement en *OAuth Resource Server* publiant ses métadonnées sur `/.well-known/oauth-protected-resource` (`RFC 9728`) et refuse tout *Token Passthrough* : un jeton dont l'audience (`aud`) ne désigne pas explicitement ce serveur `MCP` est rejeté, éliminant le risque d'acceptation de jeton détourné (*Confused Deputy*).
4. **Le Serveur de Domaine (`MCP Server`)** : Façade sans planification autonome qui traduit des intentions d'affaires bornées en transactions sur le *System of Record* sous-jacent.

![Architecture d'entreprise du Model Context Protocol (MCP) sur Streamable HTTP, articulée avec Agent Skills, Open Responses et WebMCP.](manuscrit/figures/fig-05-architecture-mcp.svg)

### Pourquoi `Streamable HTTP` a supplanté les transports de première génération

Le transport sous-jacent détermine la mise à l'échelle horizontale et la gouvernance réseau :

* **Confinement de `stdio`** : Exécuté en sous-processus local via `stdin`/`stdout`, `stdio` convient au poste développeur ou à l'intérieur d'une microVM **`OpenSandbox`**, mais demeure **interdit sur le réseau d'entreprise**, faute de coupure d'authentification centralisée et de gestion des secrets.
* **Obsolescence du double canal `HTTP + SSE` (2024)** : L'obligation historique de maintenir un flux `GET /sse` couplé à `POST /messages` cassait l'équilibrage sans affinité (*sticky sessions*), saturait les pare-feu et interdisait le *scale-to-zero*.
* **Standard `Streamable HTTP` (2025–2027)** : Tout transite par un point unique (`POST /mcp`). Un appel court renvoie directement `application/json` et libère la prise réseau ; une exécution longue nécessitant `notifications/progress` ou `elicitation/create` promeut la réponse en `text/event-stream` (`SSE`) avec reprise via `Last-Event-ID`.

> [!TIP]
> **Déployer `Streamable HTTP` sans état (*Stateless*) sur Kubernetes** : Opérez vos serveurs `MCP` sans dépendre d'un `Mcp-Session-Id` ancré en RAM d'un pod précis, tout en validant `MCP-Protocol-Version` à chaque appel. En déportant l'idempotence dans `Redis`/`Valkey` et l'identité dans le jeton `OAuth 2.1` par requête, le parc passe de 2 à 50 pods sans interruption.

#### Extrait 5.1 — Cycle de vie protocolaire `MCP` sur `Streamable HTTP` et sortie structurée (`structuredContent`)

L'échange suivant illustre la négociation d'initialisation complète entre un travailleur Boréal et un serveur `MCP` d'inventaire à travers `agentgateway`, suivie d'une invocation d'outil exploitant la validation de sortie typée (`outputSchema` / `structuredContent`) :

```http
POST /mcp/bel-inventory HTTP/1.1
Host: agentgateway.internal.boreal.ca
Authorization: DPoP eyJhbGciOiJFUzI1NiIsInR5cCI6ImF0K2p3dCJ9...
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2In0...
MCP-Protocol-Version: 2025-06-18
Content-Type: application/json
Accept: application/json, text/event-stream

{
  "jsonrpc": "2.0",
  "id": "init-01",
  "method": "initialize",
  "params": {
    "protocolVersion": "2025-06-18",
    "capabilities": {
      "roots": { "listChanged": false },
      "sampling": {},
      "elicitation": { "form": {}, "url": {} }
    },
    "clientInfo": {
      "name": "boreal-temporal-maint-worker",
      "version": "3.2.0"
    }
  }
}
```

Après réception de la réponse `InitializeResult` du serveur (déclarant `capabilities.tools`) et émission de la notification `notifications/initialized`, le client invoque un outil dont le résultat transporte simultanément un résumé lisible et un objet JSON strictement validé (`structuredContent`) :

```json
{
  "jsonrpc": "2.0",
  "id": "call-408",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "1 kit ROTOR-KIT-HX9 disponible immédiatement au dépôt CA-QC-MTL-02 (allée B14)."
      }
    ],
    "structuredContent": {
      "materialCode": "ROTOR-KIT-HX9",
      "plantCode": "CA-QC-MTL-02",
      "availableUnrestrictedQty": 1,
      "unitOfMeasure": "EA",
      "estimatedPickReadyMinutes": 25,
      "schemaRef": "https://schemas.boreal.ca/ossie/v2/stock-availability.json"
    },
    "isError": false
  }
}
```

L'apport de `structuredContent` (adossé au `Tool.outputSchema` publié lors de `tools/list`) est décisif en ingénierie de production : le moteur d'orchestration aval ou le composant graphique `A2UI` consomme directement les champs typés sans jamais dépendre d'une analyse textuelle fragile.

---

## 5.2 Ingénierie des six primitives `MCP` en entreprise : au-delà du simple appel de fonction

Réduire `MCP` à `tools/call` prive l'architecture des cinq autres primitives conçues pour maîtriser le contexte, l'identité et l'interactivité :

* **`Tools` (Actions pilotées par le modèle)** : Recherches paramétrées ou mutations accompagnées d'annotations (`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`). **Règle de sécurité** : ces annotations restent de simples *indices* non fiables face à un serveur tiers ; seule la politique `Cedar` sur `agentgateway` autorise l'exécution. En outre, la passerelle neutralise les attaques par mutation différée (*Rug-Pull* `OWASP ASI04`) en bloquant toute notification `notifications/tools/list_changed` dont l'empreinte `SHA-256` de schéma n'a pas été préalablement scellée au registre d'homologation.
* **`Resources` et `resource_link` (Contexte adressable par URI)** : Entités exposées sous URI canonique (`boreal://bca/contracts/CTR-9921`) avec abonnement optionnel (`resources/subscribe`). Plutôt que d'injecter un rapport de 180 Ko dans `tools/call`, l'outil retourne un pointeur léger **`resource_link`** (URI, MIME, taille) lu par `resources/read` uniquement si nécessaire.
* **`Prompts` (Gabarits métiers versionnés)** : Procédures d'investigation paramétrées maintenues par l'équipe propriétaire du progiciel afin d'uniformiser les pratiques d'analyse.
* **`Roots` (Périmètres déclaratifs client)** : Racines d'espaces ou compartiments (`file:///workspace/bel`, `s3://boreal-audit/`) auxquels l'hôte restreint explicitement le serveur.
* **`Sampling` (`sampling/createMessage` — Inférence inversée sans clé serveur)** : Permet à un serveur `MCP` de solliciter une synthèse cognitive auprès de l'hôte sans détenir de clé d'API LLM. Pour contrer l'injection indirecte (`OWASP ASI01`), l'hôte exécute tout `sampling` dans un contexte isolé sans outils mutatifs et sous plafond strict `maxTokens`.
* **`Elicitation` (`elicitation/create` — Collecte et consentement à mi-parcours)** : Suspend l'appel lorsqu'une donnée manque ou qu'un accord formel est requis, selon deux modes :
  1. **Mode Formulaire (`form`)** : Schéma JSON plat (`requestedSchema`) rendu nativement par l'hôte (`accept`, `decline`, `cancel`).
  2. **Mode URL (`url`)** : Redirection hors-bande sécurisée, **obligatoire** pour tout secret, consentement `OAuth` tiers, signature clinique ou validation financière ne devant jamais transiter par le contexte du LLM.

| Primitive `MCP` | Direction de contrôle | Usage optimal en entreprise | Vecteur de menace principal | Garde-fou obligatoire en production |
|---|---|---|---|---|
| **`Tools`** | Serveur expose / Modèle invoque | Recherches métier agrégées, actions transactionnelles idempotentes | Abus d'outil (`ASI02`), description empoisonnée (`ASI04`) | Empreinte `SHA-256` du schéma + politique `Cedar` par outil sur `agentgateway` |
| **`Resources`** | Serveur expose / App sélectionne | Lecture adressable par URI de contrats, schémas, journaux | Exfiltration massive ou saturation de contexte | Usage systématique de `resource_link` pour toute charge \(> 8\text{ Ko}\) |
| **`Prompts`** | Serveur expose / Hôte déclenche | Procédures d'analyse standardisées par domaine | Dérive ou altération non revue d'un gabarit | Revue de code Git et signature des versions du serveur `MCP` |
| **`Roots`** | Client déclare au serveur | Cloisonnement de répertoires ou de projets autorisés | Traversée de chemin (*path traversal*) côté serveur | Vérification canonique stricte côté serveur (`realpath` / préfixe URI) |
| **`Sampling`** | Serveur sollicite / Hôte exécute | Synthèse ou classification locale demandée par un connecteur | Détournement de quota FinOps, injection de prompt inverse | Exécution sur `SLM` isolé sans outils, quota dur de jetons par appel |
| **`Elicitation`** | Serveur sollicite / Humain valide | Collecte d'un paramètre manquant ou consentement sensible | Hameçonnage interne (*phishing*) via formulaire trompeur | Mode `url` exigé sur domaine certifié pour tout secret ou approbation critique |

::: {.encadre-sectoriel title="Santé & Sciences de la vie — Exposition granulaire de dossiers cliniques HL7 FHIR R4 via MCP audité (Loi 25, HIPAA)"}

Dans un centre hospitalier universitaire ou un réseau intégré de soins au Québec et en Amérique du Nord, connecter un agent d'aide à la préparation de consultation directement sur l'entrepôt clinique complet d'un dossier santé électronique (DSE) violerait simultanément le principe de nécessité minimale de la **Loi 25** (et de `HIPAA`) ainsi que la sécurité des patients.

L'architecture de référence déployée en 2027 encapsule le serveur **`HL7 FHIR R4`** derrière un serveur `MCP` clinique spécialisé appliquant quatre verrous :

1. **Jeton `SMART-on-FHIR` échangé en `OAuth 2.1 OBO`** : Le serveur `MCP` n'utilise aucun compte de service global ; il reçoit un jeton restreint au praticien actif et à l'identifiant exact du patient pris en charge (`launch/patient`, portées `patient/Observation.rs`, `patient/MedicationRequest.rs`).
2. **Projection clinique déterministe et pseudonymisation** : Les outils `MCP` (`fhir_get_active_medications_summary`, `fhir_list_recent_lab_trends`) purgent à la source les identifiants administratifs directs inutiles au raisonnement médical (numéro d'assurance maladie, adresse postale, téléphone) et retournent des structures `structuredContent` normalisées en codes `LOINC` et `SNOMED CT`.
3. **Pointeurs `resource_link` sur l'imagerie et les comptes rendus longs** : Les notes opératoires volumineuses sont retournées sous forme de liens URI `fhir://DocumentReference/...` lus à la demande avec journalisation unitaire dans la piste d'audit médico-légale (`FHIR AuditEvent`).
4. **Validation médicale hors-bande par `Elicitation` en mode URL** : Aucun agent ne crée directement d'ordonnance active ; il prépare un brouillon (`status: draft`) et déclenche une élicitation URL ouvrant le module certifié de prescription électronique du DSE pour signature biométrique du clinicien.

:::

---

## 5.3 Conception d'outils orientés intention métier vs antipattern REST 1:1 et pagination

L'erreur d'ingénierie la plus coûteuse observée lors des premiers déploiements `MCP` en 2025–2026 porte un nom précis : **la génération automatique d'outils `MCP` à partir de spécifications `OpenAPI` / `Swagger` existantes**. En pointant un utilitaire de conversion sur un progiciel comptant 90 routes REST conçues pour une interface web classique, une équipe croit livrer un serveur `MCP` « en un après-midi ». En réalité, elle fabrique un système inutilisable en production, comme l'illustre la figure ci-dessous.

![Comparaison architecturale : mappage naïf 1:1 CRUD REST vers MCP face à la conception orientée intention métier agrégée.](manuscrit/figures/fig-05-antipattern-rest-mcp.svg)

L'effondrement mathématique d'un mappage CRUD 1:1 s'explique par deux phénomènes conjugués. Premièrement, chaque définition d'outil injectée dans la session consomme \(t_i\) jetons d'instructions et de schémas JSON répétés à **chaque tour** \(k \in \{1, \dots, K\}\) de la boucle de raisonnement. Le surcoût fixe de contexte d'une seule tâche s'écrit :

\[T_{\text{schémas}}(N_{\text{outils}}, K) = K \cdot \sum_{i=1}^{N_{\text{outils}}} t_i\]

Avec \(N_{\text{outils}} = 85\) endpoints moyens (\(t_i \approx 290\) jetons) et une transaction qui exige \(K = 6\) appels séquentiels pour reconstituer une jointure métier, l'agent brûle **147 900 jetons** uniquement pour relire le catalogue d'outils avant même de compter les données retournées. Deuxièmement, si la probabilité que le modèle choisisse le bon endpoint granulaire et paramètre sans erreur ses clés étrangères internes à chaque étape vaut \(p = 0,85\), la fiabilité d'une séquence de \(K = 6\) appels tombe à \(p^6 \approx 0,377\) (37,7 %) — bien en deçà du seuil d'exploitation industrielle.

| Dimension d'ingénierie | Antipattern : Mappage CRUD REST 1:1 | Patron cible : Outils `MCP` orientés intention métier |
|---|---|---|
| **Granularité du catalogue** | 40 à 150 endpoints calqués sur les tables physiques | **5 à 12 outils cohésifs** alignés sur les actes métiers du domaine |
| **Empreinte de contexte / tour** | 12 000 à 35 000 jetons de schémas JSON bruyants | **800 à 1 800 jetons** nets hautement discriminants |
| **Exécution des jointures** | Probabiliste : le LLM enchaîne 5 `GET` et croise en mémoire | **Déterministe** : jointure compilée en TypeScript/Go dans le serveur `MCP` |
| **Intégrité des mutations** | Écritures partielles orphelines en cas d'échec à l'étape \(k\) | **Atomique et idempotente** (`idempotencyKey` + bail `TTL` ou compensation) |
| **Couplage au progiciel** | Fuite directe des colonnes internes SQL/ERP dans les prompts | Encapsulation propre via les types canoniques `Apache Ossie` |
| **Volume des réponses** | Tableaux JSON bruts non bornés saturant le contexte | **Pagination par curseur opaque** + projection des seuls attributs utiles |
| **Traitement des erreurs** | Codes HTTP 400/500 ou traces techniques provoquant des boucles | **Erreurs cognitives structurées** (`recoveryGuidance`) guidant l'auto-correction |

### Pagination sémantique, budgets d'octets et erreurs cognitives exploitables

Concevoir un serveur `MCP` industriel repose sur deux disciplines complémentaires :

1. **Pagination par curseur signé et plafond de cardinalité** : Un outil de recherche limite sa réponse à 15–20 entrées condensées (\(\le 16\text{ Ko}\)) et retourne un `nextCursor` opaque accompagné de `totalMatched`. Si ce total excède plusieurs centaines de lignes, le message invite l'agent à resserrer ses filtres métiers plutôt que de paginer en boucle.
2. **Séparation entre faute protocolaire JSON-RPC et rejet métier `isError: true`** : Une erreur JSON-RPC (`-32603`) signale une avarie technique. Un refus fonctionnel (rupture locale, révision d'article obsolète, clôture comptable) retourne un `result` marqué **`isError: true`** doté d'une directive **`recoveryGuidance`** explicite permettant l'auto-correction dès le tour suivant.

#### Extrait 5.2 — Serveur `MCP` TypeScript orienté domaine avec pagination et erreurs cognitives auto-correctrices

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "boreal-bel-spare-parts-mcp",
  version: "2.1.0"
});

const SearchStockInput = z.object({
  equipmentSerialNumber: z.string().describe("Numéro de série équipement (ex: BOR-CMP-90441)"),
  failureSymptomCode: z.string().optional().describe("Code défaut télématique normalisé"),
  preferredRegion: z.enum(["CA-QC", "CA-ON", "US-NE", "EU-FR"]),
  pageSize: z.number().int().min(1).max(20).default(10),
  cursor: z.string().optional().describe("Curseur opaque issu d'un appel précédent")
});

const SearchStockOutput = z.object({
  compatibleParts: z.array(z.object({
    materialCode: z.string(),
    descriptionFr: z.string(),
    plantCode: z.string(),
    availableQty: z.number(),
    leadTimeHours: z.number()
  })),
  pagination: z.object({
    totalMatched: z.number(),
    returnedCount: z.number(),
    nextCursor: z.string().nullable()
  })
});

server.registerTool(
  "bel_find_compatible_spare_stock",
  {
    title: "Recherche de pièces compatibles disponibles par équipement",
    description:
      "Résout la nomenclature exacte d'un équipement par son numéro de série et retourne les stocks disponibles dans la région cible. Utiliser avant toute réservation.",
    inputSchema: SearchStockInput.shape,
    outputSchema: SearchStockOutput.shape,
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false
    }
  },
  async (args, extra) => {
    const equipment = await sapCatalogRepo.lookupSerial(args.equipmentSerialNumber);

    // Erreur cognitive exploitable : guide immédiatement l'agent sans boucle aveugle
    if (!equipment) {
      const candidates = await sapCatalogRepo.fuzzyMatchSerial(args.equipmentSerialNumber, 3);
      return {
        isError: true,
        content: [{
          type: "text",
          text: JSON.stringify({
            errorCode: "EQUIPMENT_SERIAL_NOT_FOUND",
            retryable: true,
            providedSerial: args.equipmentSerialNumber,
            closestValidSerials: candidates,
            recoveryGuidance:
              "Le numéro de série fourni est introuvable dans SAP S/4HANA. Vérifiez le préfixe divisionnaire (ex: BOR-CMP-) parmi closestValidSerials ou interrogez le contrat client avant de réessayer."
          })
        }]
      };
    }

    const page = await sapInventoryService.queryCompatibleStock({
      bomId: equipment.activeBomId,
      symptomCode: args.failureSymptomCode,
      region: args.preferredRegion,
      limit: args.pageSize,
      cursor: args.cursor,
      traceId: extra?._meta?.traceparent as string | undefined
    });

    const payload = {
      compatibleParts: page.items,
      pagination: {
        totalMatched: page.totalCount,
        returnedCount: page.items.length,
        nextCursor: page.nextCursor ?? null
      }
    };

    return {
      isError: false,
      structuredContent: payload,
      content: [{
        type: "text",
        text: `${page.items.length}/${page.totalCount} pièce(s) compatible(s) trouvée(s) en zone ${args.preferredRegion}.`
      }]
    };
  }
);
```

::: {.encadre-sectoriel title="Industrie Manufacturière & Énergie (IT/OT) — Serveurs MCP en lecture seule sur OPC-UA et historiens d'usine"}

Pour raccorder des agents de diagnostic industriel aux ateliers de fabrication sans jamais menacer l'intégrité des automates programmables (`PLC`), les ingénieurs `IT/OT` placent un serveur `MCP` d'observation dans la **zone démilitarisée industrielle (IDMZ, niveau 3.5 du modèle Purdue)** :

* Le serveur `MCP` interroge un réplica de l'historien de procédés (`OSIsoft PI` / `AVEVA`, `InfluxDB`) et une passerelle `OPC-UA` configurée matériellement et cryptographiquement en **lecture seule**.
* Au lieu d'exposer des millions de points bruts à 100 Hz qui feraient exploser la fenêtre de contexte, les outils `MCP` calculent localement en Rust ou Python les descripteurs physiques pertinents (valeur efficace `RMS`, kurtosis vibratoire, dérive thermique sur 30 minutes, corrélation avec les changements d'outil `MES`) et ne renvoient au modèle que le vecteur d'anomalie condensé.

:::

---

## 5.4 Portabilité cognitive et frontière navigateur : `Agent Skills`, `AGENTS.md`, `Open Responses` et `WebMCP`

Fournir d'excellents outils `MCP` sans formaliser la doctrine d'emploi revient à livrer un bloc opératoire sans protocole clinique ; inversement, figer toutes les procédures de l'entreprise dans un prompt système permanent de 35 000 jetons ruine le budget FinOps et dilue l'attention. La pile `AAIF` et `W3C` résout cette tension par trois standards cognitifs et une interface navigateur.

### 1. `Agent Skills` : divulgation progressive en trois paliers

Un paquet **`Agent Skills`** (`AAIF`) est un répertoire versionné et portable centré sur **`SKILL.md`**, accompagné optionnellement de `scripts/` et `references/`, chargé en trois paliers :

* **Palier 1 — Découverte au repos (~60–90 jetons)** : Seul le frontmatter YAML (`name`, `description` des conditions d'activation) est préchargé, permettant d'indexer 25 compétences métiers sous les 2 000 jetons.
* **Palier 2 — Activation ciblée** : Lorsque la mission correspond, l'hôte injecte le corps procédural de `SKILL.md` (\(< 2\,500\) jetons) dictant l'enchaînement des outils `MCP` et les seuils de contrôle.
* **Palier 3 — Références à la demande et scripts confinés** : Les barèmes détaillés restent dans `references/`, tandis que les calculs déterministes de `scripts/` s'exécutent dans **`OpenSandbox`** hors fenêtre de contexte.

En appui, **`AGENTS.md`** encode à la racine de chaque dépôt les invariants permanents de l'espace de travail, et **`Open Responses`** monte dynamiquement les serveurs `MCP` requis avec une liste blanche stricte (`allowedTools`).

#### Extrait 5.3 — Paquet portable `Agent Skills` (`SKILL.md`) et montage filtré sous `Open Responses`

```markdown
---
name: boreal-sap-stock-discrepancy-triage
description: Diagnostique et résout un écart entre le stock théorique SAP S/4HANA et le comptage physique dépôt chez BEL. Activer lors d'une alerte d'inventaire négatif, d'un écart de préparation WMS ou avant d'autoriser un ajustement de stock L2/L3.
metadata:
  owner: coe-supply-chain@boreal.ca
  version: "1.4.0"
  compliance: ["SOX-INV-04"]
---

# Procédure normalisée — Triage d'écart de stock (BEL)

1. **Vérification des mouvements en transit** : Appeler `bel_find_compatible_spare_stock` puis `sap_list_pending_goods_movements` sur les 48 dernières heures avant de conclure à une perte sèche.
2. **Rapprochement statistique** : Exécuter dans `OpenSandbox` le script `scripts/reconcile_wms_sap_delta.py` sur l'export JSON retourné.
3. **Règle financière SOX** :
   - Écart absolu <= 750 $ CAD et cause identifiée (erreur d'emplacement interne) : préparer la régularisation via `sap_propose_inventory_adjustment`.
   - Écart > 750 $ CAD ou numéro de série réglementé : consulter `references/sox-escalation-matrix.md` et déclencher une approbation superviseur `HOTL`.
```

Lorsqu'un worker active cette compétence via `Open Responses`, il restreint immédiatement la surface d'outils `MCP` exposée au modèle :

```json
{
  "specVersion": "open-responses/1.0",
  "storeStateRemotely": false,
  "instructions": "Applique strictement la compétence activée boreal-sap-stock-discrepancy-triage.",
  "mcpServers": [
    {
      "serverLabel": "sap-bel-inventory",
      "serverUrl": "https://agentgateway.internal.boreal.ca/mcp/bel-inventory",
      "allowedTools": [
        "bel_find_compatible_spare_stock",
        "sap_list_pending_goods_movements",
        "sap_propose_inventory_adjustment"
      ]
    }
  ],
  "input": [
    {
      "type": "message",
      "role": "user",
      "content": "Alerte WMS dépôt CA-QC-MTL-02 : 0 unité physique trouvée en B14 pour ROTOR-KIT-HX9 alors que SAP affiche 1 EA (valeur 1 840 $ CAD)."
    }
  ]
}
```

### 2. `WebMCP` (W3C) : transformer l'application web active en serveur d'outils côté client

Piloter une application web interne moderne via un *Computer-Use Agent* (`CUA`) par captures d'écran souffre d'une latence élevée (15–40 s), d'un surcoût visuel et d'une fragilité chronique aux refontes CSS. Incubée au **W3C Web Machine Learning Community Group**, la spécification **`WebMCP`** permet à la page active d'exposer localement des outils JavaScript typés au navigateur. Exécutés dans l'onglet de l'opérateur, ces outils héritent de sa session authentifiée, pilotent l'état UI en direct et se désinscrivent automatiquement via `AbortSignal` au changement de vue, sous isolation stricte d'origine (`Permissions-Policy: tools=(self)`).

| Standard vertical | Lieu d'exécution | Ce qu'il normalise | Coût en contexte | Cas d'emploi privilégié |
|---|---|---|---|---|
| **`MCP` Serveur** | Backend distant (`Streamable HTTP`) | Accès transactionnel aux API, bases et systèmes (`Tools`, `Resources`) | ~150–250 jetons par outil exposé | Workflow asynchrone sans humain ou accès inter-systèmes sécurisé |
| **`Agent Skills`** | Hôte agentique + `OpenSandbox` | Savoir-faire procédural métier et scripts déterministes associés | ~70 jetons au repos ; ~1 800 actif | Standardiser une méthode métier complexe de façon portable |
| **`AGENTS.md`** | Racine du dépôt / espace de travail | Invariants locaux, commandes de vérification, frontières interdites | ~300–800 jetons fixes par espace | Guider les agents d'ingénierie, de données et d'audit documentaire |
| **`WebMCP`** | Onglet actif du navigateur client (`W3C`) | Fonctions UI typées et formulaires annotés dans la session humaine | Exposés uniquement sur la vue active | Co-navigation rapide humain-agent sans scraping DOM ni `CUA` |

#### Extrait 5.4 — Instrumentation hybride `WebMCP` (API impérative `registerTool` + formulaire déclaratif)

Dans la console web des répartiteurs de **Boréal Services Numériques**, quelques dizaines de lignes suffisent pour rendre l'écran de planification terrain nativement pilotable par l'assistant navigateur de l'opérateur :

```typescript
// Enregistrement impératif lié au montage/démontage du composant de carte terrain
export function mountDispatchMapWebMcpTools(dispatchStore: DispatchViewStore): () => void {
  const controller = new AbortController();
  const modelCtx =
    (navigator as unknown as { modelContext?: ModelContextContainer }).modelContext ??
    (document as unknown as { modelContext?: ModelContextContainer }).modelContext;

  if (!modelCtx?.registerTool) {
    return () => {};
  }

  modelCtx.registerTool(
    {
      name: "bsn_filter_nearby_certified_technicians",
      description:
        "Filtre en direct sur la carte opérateur les techniciens certifiés haute pression disponibles dans un rayon donné autour du site client actif.",
      inputSchema: {
        type: "object",
        properties: {
          maxRadiusKm: { type: "number", minimum: 5, maximum: 250 },
          requiredCertification: { type: "string", enum: ["HP-COMP-L2", "ELEC-HV", "CRYO"] },
          availableWithinHours: { type: "number", minimum: 1, maximum: 72 }
        },
        required: ["maxRadiusKm", "requiredCertification"],
        additionalProperties: false
      },
      execute: async (input: Record<string, unknown>) => {
        const matches = await dispatchStore.applyMapFilter(input);
        return {
          content: [{
            type: "text",
            text: `${matches.length} technicien(s) affiché(s) sur la carte (plus proche : ${matches[0]?.etaMinutes ?? "N/A"} min).`
          }]
        };
      }
    },
    { signal: controller.signal } // Désinscription automatique dès fermeture de la vue
  );

  return () => controller.abort();
}
```

Pour les écrans de saisie simples, `WebMCP` propose également une syntaxe HTML purement déclarative ne requérant aucun code JavaScript supplémentaire (avec `toolautosubmit="false"` afin que l'opérateur conserve le clic final de validation visuelle) :

```html
<form id="sla-credit-note" action="/api/bsn/credits" method="post"
      toolname="bsn_prepare_sla_credit_draft"
      tooldescription="Pré-remplit une demande d'avoir commercial après un dépassement SLA vérifié"
      toolautosubmit="false">
  <input type="text" name="ticketId" toolparamdescription="Identifiant du billet ServiceNow (ex: INC009412)" required />
  <input type="number" name="creditAmountCad" min="0" max="2500" step="0.01"
         toolparamdescription="Montant proposé en dollars canadiens selon barème contractuel" required />
  <textarea name="justification" toolparamdescription="Synthèse factuelle de l'écart SLA mesuré" required></textarea>
  <button type="submit">Valider et soumettre l'avoir</button>
</form>
```

---

## 5.5 Application au fil rouge : usine de connectivité verticale chez Groupe Boréal

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Industrialisation des serveurs MCP SAP S/4HANA, Snowflake et ServiceNow"}

**Problème rencontré début 2027** : Lors des premiers essais d'intégration chez **BEL** et **BSN**, un prestataire avait généré automatiquement un serveur `MCP` exposant 112 opérations OData brutes de `SAP S/4HANA`, tandis qu'une équipe analytique de **BCA** laissait un agent exécuter du SQL généré à la volée sur `Snowflake` avec un compte de service partagé. Résultat : 29 000 jetons consommés par tour, un taux de réussite \(\text{pass}^5\) plafonnant à **54 %** sur les réservations complexes, et un veto immédiat du CISO face au risque d'injection SQL sémantique et d'accès transversal aux tables clients soumises à la `Loi 25`.

**Architecture verticale mise en production (T1–T2 2027)** :
L'équipe plateforme remplace ces prototypes par **trois serveurs `MCP` orientés domaine** en `Streamable HTTP` sans état derrière `agentgateway`, complétés par un registre Git interne de compétences et l'instrumentation `WebMCP` :

1. **Serveur `MCP` `SAP S/4HANA` (BEL — 8 outils métiers)** : Encapsule la vérification de nomenclature, la réservation idempotente à bail temporel (`ttlHoldMinutes`) et la proposition d'ajustement d'inventaire via les BAPI officielles, avec erreurs cognitives auto-correctrices (Extrait 5.2).
2. **Serveur `MCP` `Snowflake & Contrats` (BCA — 6 outils + `Resources` URI)** : Interdiction totale du SQL libre généré par LLM. Exposition exclusive de vues paramétrées gouvernées sous `OAuth 2.1 OBO`, masquage dynamique des champs nominatifs (`Loi 25`), pagination par curseur (max 15 lignes) et renvoi de pointeurs `resource_link` pour les annexes PDF.
3. **Serveur `MCP` `ServiceNow ITSM/FSM` (BSN — 7 outils + `Prompts` + `Elicitation` URL)** : Gestion du cycle de vie des billets télématiques, affectation de techniciens et déclenchement d'élicitations URL sécurisées dès qu'un geste commercial excède le plafond automatique.
4. **Catalogue de 14 paquets `Agent Skills` et `WebMCP` sur le portail BSN** : Formalisation des procédures d'audit de stock et de garantie en `SKILL.md` portables, et ajout de 9 outils `WebMCP` sur la console web des répartiteurs BSN (éliminant un projet coûteux d'automatisation par capture d'écran).

**Gains mesurés en production après 90 jours** :

* **Réduction de l'empreinte de contexte** : **-94,3 %** sur les schémas et métadonnées par tour (de 29 000 à 1 650 jetons) et **-78 %** sur le volume total de jetons consommés par tâche verticale complète.
* **Fiabilité d'exécution (\(\text{pass}^5\) sous `OpenEnv`)** : bond de **54 % à 96,8 %** grâce aux outils d'intention agrégés, aux sorties `structuredContent` et aux messages `recoveryGuidance`.
* **Performance du poste répartiteur (`WebMCP`)** : préparation d'un dossier d'affectation complexe ramenée de 38 secondes (prototype `CUA` visuel) à **1,4 seconde**, avec validation finale humaine garantie (`toolautosubmit="false"`).
* **Conformité sécurité** : **100 % des appels tracés nominalement** par employé ou saga initiatrice via `OAuth 2.1 OBO` + `DPoP` sur `agentgateway`, zéro secret applicatif stocké dans les agents.

:::

---

## 5.6 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-005 — Standardisation de l'exposition d'outils métiers sur MCP Streamable HTTP orienté domaine, Agent Skills et WebMCP"}

* **Statut** : Acceptée | **Périmètre** : Tous les connecteurs systèmes, compétences métiers et portails web internes | **Révision** : Semestrielle
* **Contexte** : L'exposition brute d'API REST granulaires ou de requêtes SQL libres aux modèles de langage entraîne une inflation critique des coûts de jetons, une chute de fiabilité multi-étapes, un couplage fort aux schémas physiques des progiciels et des vulnérabilités majeures d'autorisation. Parallèlement, l'usage d'agents de capture d'écran (`CUA`) sur nos propres applications web internes génère une latence et une fragilité évitables.
* **Options évaluées** :
  1. *Convertisseurs automatiques OpenAPI-vers-MCP sur les API existantes* : **Rejetée** — surcharge cognitive (> 50 outils), jointures probabilistes fragiles, absence d'idempotence native.
  2. *Bibliothèques d'outils codées en dur dans chaque cadriciel d'agent* : **Rejetée** — aucune réutilisation entre Python, TypeScript et studios SaaS ; gouvernance de sécurité dispersée.
  3. *Façades `MCP` orientées domaine sur `Streamable HTTP` + paquets `Agent Skills` + `WebMCP` pour le Web interne* : **Retenue**.
* **Décision** :
  1. Tout accès vertical serveur s'effectue via un serveur `MCP` en `Streamable HTTP` (mode sans état privilégié) derrière `agentgateway`, authentifié en `OAuth 2.1 OBO` et limité à **15 outils maximum par serveur** orientés intention métier.
  2. Chaque outil mutatif exige une clé d'idempotence explicite ; chaque outil déclare un `outputSchema` retournant `structuredContent` et produit des erreurs métier auto-correctrices (`isError: true` + `recoveryGuidance`). Les charges volumineuses (\(> 8\text{ Ko}\)) transitent par `resource_link`.
  3. Les procédures opérationnelles transversales sont externalisées dans des paquets `Agent Skills` (`SKILL.md` à divulgation progressive) dont les scripts s'exécutent sous `OpenSandbox`.
  4. Toute nouvelle vue d'application web interne fréquemment assistée par agent doit exposer ses actions via `WebMCP` plutôt que de recourir à un `CUA` par capture d'écran (réservé aux systèmes patrimoniaux fermés traités au Chapitre 16).
* **Conséquences** :
  * *Positives* : Précision d'appel supérieure à 95 %, économie massive de jetons, sécurité par moindre privilège et portabilité totale des compétences métiers.
  * *Négatives / Coûts assumés* : Travail explicite de conception produit (*Tool Product Management*) pour façonner les façades `MCP` de domaine plutôt que de générer des connecteurs bruts.
* **Condition de révision** : Semestrielle, suivant l'évolution des spécifications `MCP` (`AAIF`) et l'avancement du standard `WebMCP` au sein du `W3C`.

:::

### Liste de contrôle de mise en production — Chapitre 5

Avant d'aborder au **Chapitre 6** la coordination horizontale entre agents autonomes via `A2A v1.0` et `AGNTCY`, assurez-vous que chaque connecteur vertical satisfait aux huit vérifications suivantes :

1. **Conformité `Streamable HTTP` et identité** : Le serveur `MCP` fonctionne-t-il sur `Streamable HTTP` derrière `agentgateway` avec vérification de `MCP-Protocol-Version` et jeton `OAuth 2.1 OBO` (zéro transport `stdio` sur le réseau, zéro clé d'API partagée) ?
2. **Sobriété et cohésion du catalogue** : Le serveur expose-t-il au plus 12 à 15 outils façonnés autour d'intentions métiers complètes, sans conversion brute 1:1 de tables CRUD ?
3. **Validation entrante/sortante et idempotence** : Chaque outil valide-t-il strictement son `inputSchema`, publie-t-il son `outputSchema` (`structuredContent`), et exige-t-il une `idempotencyKey` sur toute opération à effet de bord ?
4. **Protection de la fenêtre de contexte** : Toutes les recherches implémentent-elles une pagination par curseur bornée, et les documents de plus de 8 Ko sont-ils retournés sous forme de pointeurs `resource_link` ?
5. **Erreurs cognitives exploitables** : Les rejets fonctionnels retournent-ils `isError: true` accompagné d'un champ `recoveryGuidance` précis permettant au modèle de se corriger sans boucler ?
6. **Confinement de `Sampling` et d'`Elicitation`** : Les demandes `sampling/createMessage` sont-elles isolées sans outils sur un quota strict, et toute collecte de secret ou d'approbation sensible impose-t-elle le mode URL hors-bande d'`elicitation/create` ?
7. **Divulgation progressive des compétences** : Les procédures complexes sont-elles structurées en paquets `Agent Skills` (`SKILL.md` concis + `scripts/` confinés dans `OpenSandbox`) plutôt qu'empilées dans une consigne système monolithique ?
8. **Priorité `WebMCP` sur le Web interne** : Avez-vous vérifié qu'aucune automatisation fragile par capture d'écran n'est commandée sur un portail web interne pouvant exposer proprement ses actions via `WebMCP` (`toolautosubmit="false"` pour les mutations sensibles) ?
