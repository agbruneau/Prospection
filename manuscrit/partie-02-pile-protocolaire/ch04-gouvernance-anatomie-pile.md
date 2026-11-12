# Chapitre 4 — Gouvernance des standards et anatomie de la pile interopérable

::: {.synthese-executive title="Synthèse exécutive — Chapitre 4"}

* **Enjeu stratégique** : Entre 2024 et 2025, la prolifération de cadriciels d'agents captifs et de connecteurs sur mesure a imposé aux entreprises une taxe d'intégration quadratique (\(N \times M\)) tout en recréant un verrouillage fournisseur aigu. En 2027, l'adoption d'une pile protocolaire gouvernée par des fondations neutres conditionne toute mise à l'échelle inter-divisions rentable et auditable.
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Standardiser les contrats « sur le fil » autour du socle **Linux Foundation AAIF** (`MCP` en vertical, `A2A v1.0` en horizontal, `agentgateway` en coupure réseau) et d'ontologies métiers canoniques (`Apache Ossie`).
  2. *Structurante dès le cadrage* : Appliquer sans dérogation la **loi de non-substituabilité** entre un outil déterministe (`MCP`) et un pair autonome (`A2A`), afin de préserver les délais réseau, la chaîne d'identité et le périmètre réglementaire (`BSIF E-23`, `EU AI Act`).
  3. *Réversible par conception* : Le choix du moteur de modèle (abstrait derrière `Open Responses` et `Agent Router`), du bac à sable (`OpenSandbox`) ou du studio interne d'un éditeur SaaS.
* **Indicateurs de gouvernance associés** : Taux de conformité protocolaire en production (cible \(\ge 95\,\%\)), délai médian de raccordement d'un domaine métier (*Onboarding Lead Time*), temps de bascule inter-modèles (*Model Swap MTTR* \(< 4\text{ h}\)) et nombre de connecteurs hors norme maintenus en dette technique.

:::

## 4.1 Cartographie institutionnelle 2026–2027 : de la balkanisation des SDK à la gouvernance neutre

Toute rupture informatique traverse une phase cambrienne d'interfaces propriétaires avant de converger vers un jeu restreint de protocoles gérés en terrain neutre. Les réseaux des années 1980 opposaient SNA, DECnet et IPX jusqu'à l'adoption de TCP/IP sous l'IETF ; les conteneurs des années 2010 opposaient Swarm et Mesos avant l'unification autour de la CNCF. L'informatique agentique a parcouru ce cycle à vitesse triple entre 2024 et fin 2026.

Durant la première vague d'outillage, nombre d'équipes ont confondu **code source ouvert (*open source*)** et **gouvernance ouverte (*open governance*)**. Bâtir son *System of Action* sur une bibliothèque sous licence MIT contrôlée à 95 % par un éditeur unique exposait à des ruptures d'API trimestrielles, à des optimisations asymétriques favorisant le nuage du créateur et à une inflation combinatoire des ponts d'intégration. Pour \(N\) environnements hôtes et \(M\) systèmes cibles soumis à un facteur annuel de dérive \(\delta\), le passage aux protocoles canoniques transforme l'équation économique :

\[C_{\text{propriétaire}} = (1 + \delta) \cdot (N \times M) \quad \longrightarrow \quad C_{\text{ouvert}} = N + M\]

Dans un groupe exploitant \(N = 12\) environnements d'agents et \(M = 45\) systèmes métiers avec un taux annuel de rupture d'API propriétaires \(\delta = 0,35\), passer de \(540\) intégrations point-à-point (soit \(1,35 \times 540 \approx 729\) maintenances correctives annuelles) à \(57\) adaptateurs normalisés réduit d'un ordre de grandeur la surface d'attaque et la dette d'entretien.

![Cartographie institutionnelle 2026–2027 et alignement sur le modèle de référence en 6 couches.](manuscrit/figures/fig-04-gouvernance-aaif.svg)

### La consolidation autour de la Linux Foundation : AAIF et AGNTCY

Le basculement s'est opéré à partir de décembre 2025 et tout au long de 2026 avec la création de l'**Agentic AI Foundation (`AAIF`)** au sein de la Linux Foundation. Réunissant Anthropic, OpenAI, Google, Block, Microsoft, AWS, Solo.io, Hugging Face, Alibaba et Cloudflare sous une gouvernance tripartite neutre, l'`AAIF` a notamment scellé la fusion entre **Agent2Agent (`A2A`)** de Google et l'**Agent Communication Protocol (`ACP`)** d'IBM BeeAI au sein de **`A2A v1.0`**. Le tableau ci-dessous dresse l'inventaire technique des **dix projets fondateurs** de l'`AAIF`.

| Projet AAIF | Origine initiale | Couche | Rôle normatif en architecture d'entreprise | Statut 2026–2027 |
|---|---|---|---|---|
| **1. `MCP`** (*Model Context Protocol*) | Anthropic | C3 (Vertical) | Protocole JSON-RPC 2.0 sur `Streamable HTTP` normalisant outils, ressources, prompts, échantillonnage et élicitation. | Standard universel en production |
| **2. `A2A`** (*Agent2Agent v1.0*) | Google + IBM (`ACP`) | C5 (Horizontal) | Délégation asynchrone d'objectifs entre agents pairs opaques via `Agent Cards`, tâches durables et artefacts typés. | Standard de production (`v1.0`) |
| **3. `AGENTS.md`** | OpenAI / Communauté | C4 (Contexte) | Convention Markdown fixant à la racine d'un dépôt les invariants d'architecture, tests et frontières de sécurité. | Standard généralisé d'ingénierie |
| **4. `Goose`** | Block | C1 (Hôte) | Hôte et cadriciel agentique modulaire de référence conçu nativement autour de `MCP`. | Production stable (référence `MCP`) |
| **5. `Agent Router`** | Communauté AAIF | C2 (Routage) | Routage dynamique des requêtes entre `SLM` économiques, `LLM` de raisonnement et agents spécialisés selon coût/latence. | Déployé en passerelle / maillage |
| **6. `agentgateway`** | Solo.io | C2 (Plan données) | Proxy AI-native (Rust) assurant l'authentification `OAuth 2.1 OBO`, les politiques `Cedar`/`OPA` et les traces `MCP`/`A2A`/`LLM`. | Brique critique de production |
| **7. `Agent Skills`** | Anthropic | C4 (Savoirs) | Empaquetage procédural portable (`SKILL.md`, `scripts/`, `references/`) chargé par divulgation progressive. | Standard de portabilité métier |
| **8. `Open Responses`** | OpenAI / Communauté | C4 (Inférence) | Spécification multi-fournisseurs unifiant appels de modèles, blocs de raisonnement, flux d'événements et outils distants. | Socle anti-verrouillage modèle |
| **9. `OpenEnv`** | Hugging Face | C1 (Évaluation) | Environnement conteneurisé standardisé pour l'évaluation reproductible, la simulation et le RL d'agents. | Standard CI/CD d'homologation |
| **10. `OpenSandbox`** | Alibaba | C1 (Isolation) | Runtime de confinement sécurisé (microVM, gVisor, WASM) pour exécuter du code généré ou des scripts d'outils. | Obligatoire pour code dynamique |

Cinq autorités complémentaires ferment les angles morts du modèle :

* **Linux Foundation `AGNTCY`** fournit la taxonomie formelle de compétences **`OASF`** (*Open Agentic Schema Framework*), l'annuaire fédéré **`Agent Directory`** (registres `OCI` et DHT) et le transport temps réel **`SLIM`** (*Secure Low-Latency Interactive Messaging*).
* **Apache Software Foundation (`Apache Ossie`)** gouverne les ontologies métiers et schémas JSON canoniques afin que deux agents échangeant le champ `net_exposure` partagent exactement la même définition comptable.
* **L'`IETF`** normalise la chaîne de confiance réseau : **`OAuth 2.1`**, échange **`RFC 8693`** (*On-Behalf-Of*), preuve **`RFC 9449`** (*DPoP*), chiffrement de groupe post-quantique **`RFC 9420`** (`MLS` sous `SLIM`) et identité multi-environnements **`WIMSE`**.
* **Le `W3C`** encadre **`DID`** / **`Verifiable Credentials 2.0`** ainsi que **`WebMCP`** (*Web Machine Learning Community Group*), exposant les fonctions JavaScript d'une application web active aux agents du navigateur.
* **L'alliance `FIDO`** ancre **`AP2`** (*Agent Payments Protocol*) dans des mandats vérifiables signés par clé biométrique (*passkey*), complété par **`x402`** (`HTTP 402`) pour les micro-règlements programmatiques.

Cette répartition institutionnelle résout un paradoxe central : aucune fondation unique ne saurait simultanément exceller en cryptographie bas niveau (`IETF`), en standards du navigateur (`W3C`), en ontologies métiers (`ASF`) et en outillage d'exécution d'agents (`AAIF`). L'interopérabilité réelle en 2027 naît précisément de l'articulation propre de ces juridictions techniques complémentaires, où chaque couche délègue la sécurité ou le transport au standard spécialisé éprouvé au lieu de réinventer une pile monolithique.

> [!IMPORTANT]
> **Rigueur épistémique 2026–2027** : Distinguez dans vos architectures les briques parvenues à maturité industrielle générale fin 2026 (`MCP` `Streamable HTTP`, `A2A v1.0`, `OAuth 2.1 OBO`, `AGENTS.md`, `Agent Skills`, `agentgateway`) des standards déployés par paliers encadrés en 2027 (`WebMCP` selon le parc de navigateurs gérés, fédérations `AGNTCY` inter-entreprises et règlements `AP2`/`x402` soumis aux homologations bancaires).

---

## 4.2 Modèle de référence en 6 couches et loi de non-substituabilité outil vs pair

En décomposant selon une lecture ascendante d'inspiration OSI les strates d'infrastructure et de transport sous-jacentes à la vue fonctionnelle de l'Ouverture, ce **modèle protocolaire de référence en six couches (`C1` à `C6`)** garantit l'indépendance de substitution : remplacer un moteur de Couche 1 ou un routeur de Couche 2 laisse intacts les contrats fonctionnels des Couches 3 à 6. Contrairement au modèle OSI classique conçu dans les années 1980 pour acheminer des octets sans interprétation sémantique entre terminaux passifs, la pile agentique doit encapsuler simultanément le **sens métier**, l'**intention déléguée**, l'**identité atténuée** et le **budget économique** à travers des composants non déterministes :

1. **Couche 1 — Isolation, évaluation et hôtes (`OpenSandbox`, `OpenEnv`, `Goose`, moteurs durables)** : Fournit le substrat physique et temporel fiable — exécution durable à journalisation déterministe (`Temporal`, `Restate`), confinement microVM/WASM pour tout code non fiable, bancs d'homologation reproductibles et télémétrie `OpenTelemetry`.
2. **Couche 2 — Plan de données IA, routage et identité (`agentgateway`, `Agent Router`, `SLIM`/`MLS`, `OAuth 2.1 OBO`)** : Assure l'acheminement chiffré post-quantique, la vérification des identités non humaines (`NHI` via `SPIFFE`/`WIMSE`), l'atténuation stricte des portées à chaque saut, l'arbitrage coût/latence inter-modèles et l'évaluation des politiques `Cedar` ou `OPA`.
3. **Couche 3 — Connectivité verticale (`MCP` sur `Streamable HTTP`)** : Normalise l'invocation déterministe et typée des fonctions métiers, la lecture de ressources adressables par URI et les demandes contrôlées d'échantillonnage ou d'élicitation.
4. **Couche 4 — Sémantique et portabilité cognitive (`Apache Ossie`, `Agent Skills`, `AGENTS.md`, `Open Responses`)** : Découple le sens des entités d'affaires, le savoir-faire procédural de l'organisation et le contrat d'appel d'inférence vis-à-vis des poids propriétaires d'un modèle particulier.
5. **Couche 5 — Coordination horizontale (`A2A v1.0`, `AGNTCY OASF` & `Agent Directory`, `ANP`)** : Orchestre la découverte dynamique des capacités publiées, la négociation de modalités et le cycle de vie asynchrone de tâches déléguées entre pairs autonomes opaques, y compris au-delà des frontières de l'entreprise.
6. **Couche 6 — Interaction humaine et commerce (`AG-UI`, `A2UI`, `WebRTC`, `WebMCP`, `AP2`, `x402`)** : Gouverne la synchronisation d'état bidirectionnelle avec les opérateurs humains, le rendu d'interfaces génératives déclaratives sans injection de code, les flux vocaux temps réel et la signature cryptographique de mandats financiers.

### La loi de non-substituabilité : pourquoi un outil `MCP` n'est pas un pair `A2A`

Parce que `MCP` et `A2A v1.0` utilisent tous deux JSON-RPC 2.0 sur HTTP, certaines équipes tentent de tout réduire à un seul protocole. Cette confusion engendre deux antipatterns critiques :

* **Antipattern 1 — Le « Pair déguisé en Outil » (*Agent-as-a-Tool* sur `MCP`)** : Dissimuler un agent autonome multi-tours derrière un appel `tools/call` `MCP` provoque des expirations `HTTP 504` en cascade, masque la consommation récursive de jetons et brise la gestion des états asynchrones (`working`, `input-required`) lorsqu'une approbation humaine différée est requise.
* **Antipattern 2 — Le « Microservice déguisé en Agent » (*CRUD-as-an-Agent* sur `A2A`)** : Envelopper un calcul fiscal ou une requête SQL déterministe dans un serveur `A2A` doté d'un LLM ajoute 1 à 3 secondes de latence, introduit un risque d'hallucination inutile et soumet un composant ordinaire aux obligations réglementaires du risque de modèle (`BSIF E-23`).

| Critère d'architecture | Connectivité verticale — `MCP` (Couche 3) | Coordination horizontale — `A2A v1.0` (Couche 5) |
|---|---|---|
| **Nature de la cible** | Capacité déterministe typée (*boîte de verre* : API, base, calcul) | Pair autonome opaque (*boîte noire* dotée de raisonnement et mémoire propres) |
| **Contrat publié** | Schémas stricts (`inputSchema` / `outputSchema`) par primitive | `Agent Card` (`/.well-known/agent-card.json`) orientée compétences (`skills`) |
| **Régime temporel** | Millisecondes à quelques secondes (appel atomique borné) | Secondes à plusieurs jours via machine à états (`submitted`, `working`, `completed`) |
| **Couplage cognitif** | L'appelant prescrit *quelle* fonction exécuter avec ses arguments exacts | L'appelant formule *quel* objectif atteindre ; le pair planifie le *comment* |
| **Frontière d'identité** | Accès délégué à une ressource technique du domaine | Traversée de frontière organisationnelle avec échange `OAuth 2.1 OBO` (`RFC 8693`) |
| **Profil FinOps & Risque** | Coût fixe marginal ; hors inventaire des modèles autonomes | Coût d'inférence variable plafonné (`ActionEnvelope`) ; gouvernance `BSIF E-23` |

::: {.encadre-sectoriel title="Éditeurs SaaS B2B — Stratégie d'ouverture protocolaire face aux écosystèmes hyperscalers"}

Pour un éditeur SaaS B2B, refuser les standards ouverts par crainte d'être réduit à une base passive conduit en 2027 à l'éviction lors des renouvellements grands comptes. Les éditeurs performants structurent leur ouverture sur deux niveaux complémentaires :

1. **Commoditiser positivement l'accès transactionnel via `MCP` distant** : Exposez vos opérations unitaires validées sur `Streamable HTTP` + `OAuth 2.1`. Vous éradiquez le *screen-scraping* fragile et préservez l'intégrité de vos règles métiers.
2. **Monétiser votre intelligence différenciante via `A2A v1.0`** : Conservez vos modèles sectoriels et heuristiques propriétaires derrière une façade d'agent spécialiste `A2A` facturée au résultat (*Outcome-based pricing*). Les orchestrateurs clients vous délèguent des missions à haute valeur sans jamais extraire votre propriété intellectuelle interne.

:::

---

## 4.3 Cycle de vie des spécifications ouvertes et stratégies anti-verrouillage

Les standards agentiques évoluent sur un rythme semestriel soutenu : `MCP` négocie des révisions calendaires via l'en-tête `MCP-Protocol-Version`, tandis qu'`A2A` suit un versionnement sémantique (`v1.0`). Pour parer aux dérives *Embrace, Extend, Lock-in* — où un éditeur injecte des extensions propriétaires rendant ses composants captifs —, l'architecture d'entreprise combine **validation déclarative en passerelle** et **abstraction du plan d'inférence**.

#### Extrait 4.1 — Matrice déclarative de conformité protocolaire (`boreal-protocol-policy.yaml`)

```yaml
apiVersion: architecture.boreal.ca/v2027
kind: ProtocolGovernancePolicy
metadata:
  name: boreal-aaif-baseline-2027
  owner: coe-architecture-agentique@boreal.ca
spec:
  enforcementMode: block_non_compliant_in_prod
  verticalConnectivity:
    protocol: mcp
    allowedProtocolVersions: ["2025-06-18", "2026-03-01"]
    deprecatedGracePeriodDays: 90
    transports:
      remoteProductionAllowed: ["streamable-http"]
      forbidden: ["legacy-http-sse", "stdio"] # stdio réservé à OpenSandbox local
    toolDesignConstraints:
      maxToolsPerServer: 15
      requireOutputSchema: true
      requireIdempotencyKeyOnMutatingTools: true
  horizontalCoordination:
    protocol: a2a
    minVersion: "1.0.0"
    requireSignedAgentCard: true
    canonicalPayloadRegistry: "https://schemas.boreal.ca/ossie/v2/"
  securityAndIdentity:
    forbidStaticApiKeys: true
    requiredDelegationFlow: "urn:ietf:params:oauth:grant-type:token-exchange"
    requireDpopSenderConstraint: true
  vendorExtensionsPolicy:
    permittedNamespace: "_meta.vendor"
    requireGracefulDegradationWhenStripped: true
```

Lors des tests d'homologation dans `OpenEnv`, le pipeline CI/CD purge systématiquement `_meta.vendor` : tout composant qui échoue sans ses métadonnées propriétaires se voit refuser le déploiement. De surcroît, cette gouvernance protège la chaîne d'approvisionnement logicielle contre les mutations furtives de contrat (*rug pulls* de schémas distants) : chaque manifeste d'outils `MCP` et chaque `Agent Card A2A` approuvés voient leur empreinte `SHA-256` scellée dans le registre interne de la passerelle. Si un éditeur SaaS modifie silencieusement la description d'un outil ou élargit ses paramètres lors d'une mise à jour nocturne, `agentgateway` détecte la divergence d'empreinte et met la route en quarantaine avant qu'un agent interne n'interprète ce nouveau schéma non audité.

Sur le plan cognitif, coder directement contre le SDK exclusif d'un laboratoire d'IA — ou pire, lui confier l'hébergement de l'état de session — interdit tout basculement d'urgence lors d'une panne infonuagique ou d'une révision tarifaire brutale. Standardiser les appels sur **`Open Responses`** derrière **`Agent Router`** avec `storeStateRemotely: false` garantit que l'historique décisionnel demeure sous le contrôle exclusif de votre moteur durable interne. Une précaution supplémentaire s'impose toutefois face aux modèles à raisonnement : leurs traces latentes chiffrées (*Encrypted Reasoning Items*) sont cryptographiquement liées au fournisseur émetteur et ne peuvent être rejouées vers un modèle concurrent à mi-conversation ; le moteur durable ne doit donc persister d'un tour à l'autre que les faits structurés et résultats d'outils canoniques.

#### Extrait 4.2 — Port d'abstraction anti-verrouillage TypeScript sur `Open Responses`

```typescript
export interface InferenceRoutingPolicy {
  readonly capabilityProfile: "fast-triage-slm" | "domain-specialist" | "deep-reasoning";
  readonly dataResidencyZone: "CA-QC-LAW25" | "EU-GDPR" | "US-EAST";
  readonly maxCostCadPerCall: number;
}

export interface OpenResponseRequest {
  readonly specVersion: "open-responses/1.0";
  readonly instructions: string;
  readonly input: ReadonlyArray<{
    readonly type: "message" | "item_reference";
    readonly role?: "user" | "system" | "developer";
    readonly content?: string;
  }>;
  readonly mcpServers?: ReadonlyArray<{
    readonly serverLabel: string;
    readonly serverUrl: string;
    readonly allowedTools: ReadonlyArray<string>;
  }>;
  readonly textFormatSchema?: Record<string, unknown>;
  readonly storeStateRemotely: false; // Rétention d'état externe strictement interdite
}

export interface OpenResponseResult<T> {
  readonly responseId: string;
  readonly servedByModelId: string;
  readonly parsedOutput: T;
  readonly billedCostCad: number;
}

export class BorealVendorNeutralModelClient {
  constructor(
    private readonly routerUrl: string,
    private readonly obtainDpopArtifacts: (
      htm: string,
      htu: string
    ) => Promise<{ accessToken: string; dpopProof: string }>
  ) {}

  async invokeStructured<T>(
    request: OpenResponseRequest,
    routing: InferenceRoutingPolicy,
    signal?: AbortSignal
  ): Promise<OpenResponseResult<T>> {
    const endpoint = `${this.routerUrl}/v1/responses`;
    const { accessToken, dpopProof } = await this.obtainDpopArtifacts("POST", endpoint);
    const res = await fetch(endpoint, {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `DPoP ${accessToken}`,
        "DPoP": dpopProof,
        "X-Agent-Router-Profile": routing.capabilityProfile,
        "X-Agent-Residency-Zone": routing.dataResidencyZone,
        "X-Agent-Max-Cost-CAD": routing.maxCostCadPerCall.toFixed(4)
      },
      body: JSON.stringify(request)
    });
    if (!res.ok) throw new Error(`Échec Agent Router (${res.status})`);
    return (await res.json()) as OpenResponseResult<T>;
  }
}
```

::: {.encadre-sectoriel title="Secteur Public & Infrastructures Critiques — Clauses de réversibilité dans les marchés publics (Loi 25, EU AI Act)"}

Pour les organismes publics québécois, canadiens et européens soumis à la `Loi 25`, au `RGPD` et à l'article 25 de l'`EU AI Act` (échéance haut risque de décembre 2027), la réversibilité protocolaire constitue une exigence de souveraineté opérationnelle. Les cahiers d'appel d'offres 2027 imposent quatre clauses techniques :

1. **Ouverture native sans surtaxe** : Exposition obligatoire des capacités via `MCP` (`AAIF`) et `A2A v1.0`, sans frais discriminatoires par appel externe.
2. **Propriété et exportabilité cognitive** : Restitution intégrale des procédures métiers au format ouvert `Agent Skills` (`SKILL.md`) et schémas JSON standardisés.
3. **Absence d'état captif** : Interdiction de subordonner l'exécution à un historique décisionnel enfermé dans un nuage propriétaire non réplicable.
4. **Preuve contractuelle de substitution** : Démonstration annuelle sur banc `OpenEnv` d'un changement de modèle sous-jacent en moins de 48 heures sans régression critique.

:::

---

## 4.4 Application au fil rouge : charte d'interopérabilité du Groupe Boréal

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Rationalisation des 47 initiatives vers le socle normatif AAIF"}

**État initial (Janvier 2027)** : L'audit des 47 initiatives dispersées entre **BEL**, **BCA** et **BSN** révèle **11 cadriciels d'agents incompatibles**, des connecteurs `SAP` et `Snowflake` réécrits trois fois, et deux pilotes captifs de l'API d'état hébergée d'un fournisseur américain — bloquant le repli vers une région canadienne conforme à la `Loi 25` pour BCA.

**Urbanisation en trois anneaux (8 semaines)** :
Plutôt que d'imposer un langage unique aux équipes TypeScript (BSN), Python (BCA) et Java/ABAP (BEL), l'architecture impose l'uniformité des protocoles sur le fil :

* **Anneau 1 (Socle obligatoire)** : `MCP` (`Streamable HTTP`) en vertical ; `A2A v1.0` + `AGNTCY OASF` en horizontal ; `Apache Ossie` (`schemas.boreal.ca/ossie/v2`) pour les 18 objets métiers canoniques ; `Open Responses` via `Agent Router` et `agentgateway` ; `OpenSandbox` pour tout script.
* **Anneau 2 (Toléré sous passerelle \(\le 6\) mois)** : Conservation des agents natifs `Salesforce Agentforce` et `Copilot Studio` dans leur périmètre local, à condition de communiquer exclusivement via des façades `A2A v1.0` et `MCP` filtrées par `agentgateway`.
* **Anneau 3 (Banni immédiatement)** : Clés d'API statiques, `MCP stdio` distant, génération OpenAPI brute (> 15 outils) et `storeStateRemotely: true`.

**Résultats mesurés à T2 2027** :

* **Rationalisation** : Extinction de 8 des 11 cadriciels redondants au profit d'un catalogue partagé de serveurs `MCP` et d'`Agent Cards`.
* **Vélocité** : Raccordement d'un nouvel agent à deux *Systems of Record* ramené de **9 semaines à 6 jours ouvrables**.
* **Réversibilité prouvée (`BSIF E-23`)** : Bascule réelle de l'agent garantie BCA vers un modèle souverain hébergé à Montréal en **2 h 15**, avec un écart de précision de 0,7 % sous `OpenEnv` et zéro modification du code métier.

:::

---

## 4.5 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-004 — Alignement normatif sur la pile Linux Foundation AAIF et gouvernance anti-verrouillage"}

* **Statut** : Acceptée | **Périmètre** : Entreprise (Développements internes et acquisitions SaaS) | **Révision** : Semestrielle
* **Contexte** : La dispersion des SDK propriétaires et des états d'inférence hébergés démultiplie les coûts d'intégration (\(N \times M\)) et crée un verrouillage incompatible avec les exigences `BSIF E-23`, `Loi 25` et `EU AI Act`.
* **Options évaluées** :
  1. *Autonomie totale par produit* : **Rejetée** — silos inter-divisions, duplication des connecteurs et failles d'identité.
  2. *Framework logiciel unique imposé* : **Rejetée** — incompatible avec les agents natifs des progiciels SaaS (`SAP`, `Salesforce`, `ServiceNow`) et la diversité des piles internes.
  3. *Standardisation des protocoles sur le fil (Socle AAIF + AGNTCY + IETF + Ossie)* : Liberté d'implémentation interne sous réserve du respect strict des contrats protocolaires ouverts vérifiés en passerelle. **Retenue**.
* **Décision** : Adopter le modèle en 6 couches fondé sur `MCP` (`Streamable HTTP`), `A2A v1.0`, `AGNTCY OASF`, `Apache Ossie`, `Open Responses` (`storeStateRemotely: false`), `agentgateway` (`OAuth 2.1 OBO` + `DPoP`) et `OpenSandbox`/`OpenEnv`. Confiner toute extension éditeur sous `_meta.vendor` avec dégradation gracieuse vérifiée en CI/CD.
* **Conséquences** :
  * *Positives* : Complexité réduite à \(N + M\), substitution de modèle en moins de 4 heures, clauses d'achat opposables aux éditeurs.
  * *Négatives / Coûts assumés* : Gouvernance continue du registre ontologique `Apache Ossie` et exploitation des pipelines de conformité `OpenEnv`.
* **Condition de révision** : Semestrielle, suivant les publications techniques de l'`AAIF`, de l'`IETF` (`WIMSE`) et du `W3C` (`WebMCP`).

:::

### Liste de contrôle de mise en production — Chapitre 4

Avant d'implémenter la connectivité verticale au **Chapitre 5**, vérifiez les huit critères suivants :

1. **Loi de non-substituabilité** : Aucun agent multi-tours lent n'est-il dissimulé derrière un outil `MCP`, et aucun service déterministe simple n'est-il inutilement exposé en pair `A2A` ?
2. **Validation de version en coupure** : La passerelle contrôle-t-elle `MCP-Protocol-Version` et les `Agent Cards A2A v1.0` signées en rejetant les transports obsolètes ?
3. **Zéro état captif** : Tous les appels cognitifs transitent-ils par `Open Responses` avec refus du stockage d'état distant chez le fournisseur LLM ?
4. **Purge des extensions propriétaires** : Vos bancs `OpenEnv` valident-ils le fonctionnement nominal des flux après suppression automatique de `_meta.vendor` ?
5. **Schémas métiers canoniques** : Les charges inter-divisions pointent-elles vers le registre versionné `Apache Ossie` ?
6. **Confinement systématique** : Toute exécution de script dynamique passe-t-elle par `OpenSandbox` sans accès réseau libre ?
7. **Clauses contractuelles SaaS** : Vos contrats d'édition exigent-ils `MCP` (`Streamable HTTP` + `OAuth 2.1`) et `A2A v1.0` sans surcoût d'accès ?
8. **Exercice de réversibilité** : Un test chronométré de changement de modèle (*Model Swap Drill*) a-t-il été réussi ce trimestre sur un flux critique ?
