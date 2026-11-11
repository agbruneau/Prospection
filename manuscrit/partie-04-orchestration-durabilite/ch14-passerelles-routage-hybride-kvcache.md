# Chapitre 14 — Plan de données AI-natif, passerelles et routage cognitif hybride

::: {.synthese-executive title="Synthèse exécutive — Chapitre 14"}

* **Enjeu stratégique** : Laisser des agents autonomes appeler directement les API de modèles et les serveurs d'outils reproduit la dette sécuritaire et financière du *Shadow IT*. Les passerelles d'API classiques (conçues pour des requêtes HTTP courtes et homogènes) sont aveugles à la comptabilité en jetons, au multiplexage persistant `MCP` et à la mémoire des processeurs graphiques. L'industrialisation exige un **plan de données AI-natif unifié**.
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Placer une passerelle AI-native (`agentgateway` / `Envoy AI Gateway`) en coupure obligatoire de 100 % des flux vers les modèles (`Open Responses`), les outils (`MCP`) et les pairs (`A2A v1.0`), en bloquant au pare-feu toute sortie directe des conteneurs.
  2. *Structurante dès le jour 1* : Déployer un **routage cognitif hybride à trois paliers** (`SLM` spécialisés souverains, `LLM` généralistes, modèles *test-time compute*) couplé, sur grappe interne, à un ordonnancement Kubernetes conscient du préfixe `KV-cache`.
  3. *Réversible par conception* : Le portefeuille exact de modèles commerciaux ou ouverts derrière la passerelle, permutés à chaud sans modifier le code des agents.
* **Indicateurs de gouvernance associés** : Taux d'absorption par le palier `SLM` (*SLM Offload Ratio*, cible \(\ge 70\,\%\)), taux de réutilisation du cache de préfixe (`KV-Cache Hit Rate`, cible \(\ge 85\,\%\)), latence `TTFT p95`, et baisse du **coût complet par résultat métier (*Cost-per-Outcome*)**.

:::

## 14.1 Pourquoi les passerelles d'API classiques échouent : l'émergence d'`agentgateway`

Les passerelles d'API traditionnelles (`NGINX`, `Kong`, `Apigee`, `AWS API Gateway`) reposent sur quatre hypothèses : une requête HTTP dure quelques dizaines de millisecondes, deux appels à la même route ont un coût voisin, l'échange est sans état persistant, et l'autorisation se vérifie sur l'URL. Le trafic d'une flotte agentique en 2027 invalide simultanément ces quatre postulats :

1. **Asymétrie extrême du coût unitaire** : Deux requêtes `POST` de 1,5 Ko vers la même route d'inférence varient d'un facteur **1 à 9 000** entre un `SLM` renvoyant 40 jetons JSON (0,0002 \$ CAD) et un modèle *test-time compute* générant 32 000 jetons de réflexion interne (1,80 \$ CAD). Un quota en requêtes par seconde (`RPS`) laisse passer une dérive ruineuse à faible cadence tout en bloquant des travailleurs légitimes.
2. **Multiplexage bidirectionnel à état (`MCP` et `A2A v1.0`)** : `MCP` sur `Streamable HTTP` maintient des sessions longues où le serveur pousse des notifications et gère des annulations en vol ; un proxy REST classique coupe ces flux ou ignore les méthodes `JSON-RPC 2.0` internes.
3. **Autorisation intra-protocole par outil** : Ouvrir une session vers un serveur `MCP` `SAP` n'autorise pas tous ses outils. L'échange `OAuth 2.1 OBO` (`RFC 8693`) et la politique `Cedar`/`OPA` doivent s'appliquer sur l'attribut `params.name` de chaque appel `tools/call`.
4. **Hétérogénéité des API de modèles** : Sans normalisation via la spécification ouverte **`Open Responses`** de la Linux Foundation (`AAIF`), basculer d'un fournisseur infonuagique en panne vers une grappe `vLLM` brise la sérialisation des appels d'outils.

Pour combler ce vide ont émergé en 2026 des plans de données dédiés écrits en Rust ou sur base Envoy, incarnés par **`agentgateway`** (`AAIF`) et **`Envoy AI Gateway`**. En moins de 1,5 ms de latence propre, cette couche unifie l'identité `NHI`, les quotas en jetons et devises, la fédération `MCP`/`A2A`, le masquage PII et les traces `OpenTelemetry gen_ai.*`.

Sur le plan protocolaire, le multiplexeur `MCP` intégré à `agentgateway` résout trois problèmes d'exploitation critiques que rencontrent toutes les grandes organisations :

* **Agrégation et filtrage dynamique du catalogue d'outils** : Au lieu d'obliger un agent à maintenir huit connexions réseau vers huit serveurs `MCP` internes, la passerelle expose un point d'entrée virtuel unique, préfixe les identifiants d'outils pour prévenir toute collision de noms (`sap_`, `bca_`, `fsm_`) et filtre dynamiquement la réponse `tools/list` selon les portées `OAuth 2.1` de l'appelant — évitant du même coup la surcharge cognitive du modèle (*Tool Overload*) et la découverte d'outils hors mandat.
* **Continuité des sessions `Streamable HTTP` lors des déploiements** : La passerelle gère le drainage gracieux des flux `SSE` bidirectionnels et l'annulation propre des requêtes en vol (`notifications/cancelled`) sans interrompre les sagas actives lors d'une mise à jour d'un serveur d'outils en aval.
* **Traduction canonique `Open Responses`** : Les fragments de flux (*streaming chunks*), appels de fonctions parallèles et compteurs de jetons de raisonnement issus de modèles hétérogènes sont projetés dans un format événementiel unique, rendant la bascule inter-fournisseurs totalement invisible pour le code métier.
* **Instrumentation incorruptible `OpenTelemetry gen_ai.*` et éjection d'anomalies** : Contrairement à une télémétrie auto-déclarée par l'agent (qu'un bogue ou une compromission peut altérer), la passerelle injecte hors bande les attributs normalisés (`gen_ai.request.model`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`, `mcp.tool.name`, `boreal.saga.id`) et éjecte automatiquement pendant trente secondes tout point de terminaison aval dont le taux d'erreurs `HTTP 5xx` ou la dérive de `TTFT` franchit le seuil de coupe-circuit.

![Plan de données AI-natif : passerelle unifiée agentgateway, routage cognitif hybride à trois paliers et ordonnancement Kubernetes conscient du préfixe KV-cache.](manuscrit/figures/fig-14-agentgateway-kvcache.svg)

| Capacité d'infrastructure | Passerelle API classique (REST) | Proxy LLM 1re gén. (2024) | Plan de données AI-natif 2027 (`agentgateway`) |
|---|---|---|---|
| **Contrôle de débit** | Requêtes/seconde (`RPS`) ou octets | Jetons/minute (`TPM`) par clé statique | **Budget combiné** : `TPM` + plafond en devises par `sagaId` |
| **Support natif `MCP`** | Aucun (coupures SSE, opacité `JSON-RPC`) | Aucun (limité aux complétions LLM) | **Multiplexage `Streamable HTTP`**, RBAC et `OBO` par outil |
| **Support natif `A2A v1.0`** | Routage HTTP aveugle | Aucun | Exposition d'`Agent Cards`, validation `SPIFFE`, suivi de tâches |
| **Contrat d'inférence** | Couplage fort au SDK fournisseur | Traduction ad hoc fragile | Standard ouvert **`Open Responses`** (`AAIF`) |
| **Routage intelligent** | Chemin d'URL ou poids statique | Repli simple sur `HTTP 429`/`5xx` | **`Agent Router` multicritère** (`SLM`/`LLM`/TTC) + résidence légale |
| **Affinité GPU** | `Round-Robin` destructeur de cache | Hachage naïf par utilisateur | **Ordonnancement conscient du préfixe `KV-cache`** et `HBM` |
| **Observabilité** | Codes HTTP et latence brute | Journaux propriétaires | Traces **`OpenTelemetry gen_ai.*`** + caviardage PII en vol |

#### Extrait 14.1 — Configuration déclarative `agentgateway` unifiant `Open Responses`, `MCP` et `A2A`

```yaml
apiVersion: agentgateway.aaif.io/v1alpha2
kind: GatewayConfig
metadata:
  name: boreal-core-ai-dataplane
  namespace: ai-platform
spec:
  listeners:
    - name: internal-mtls-mesh
      bind: 0.0.0.0:8443
      tls:
        mode: MUTUAL_SPIFFE
        trustDomain: boreal.ca

  telemetry:
    openTelemetry:
      endpoint: grpc://otel-collector.observability.svc:4317
      semanticConventions: gen_ai_2027
      redactPiiBeforeExport: true

  tokenAndBudgetPolicies:
    - name: saga-finops-guardrail
      matchSpiffePrefix: spiffe://boreal.ca/ns/
      limits:
        tokensPerMinute: 450000
        maxCostPerSagaHeader: x-aigov-budget-remaining-cad
        hardCeilingPerRequestCad: 0.85
        maxReasoningTokensPerTurn: 6000
      onExceeded: REJECT_WITH_STRUCTURED_PROBLEM

  inferenceBackends:
    openResponsesContract: true
    pools:
      - name: tier1-sovereign-slm
        residencyZone: CA-QC
        endpointRef: k8s-inferencepool://bsn-gpu/qwen3-14b-boreal-ft
      - name: tier2-frontier-standard
        residencyZone: CA-CENTRAL
        providers:
          - name: primary-cloud-ca
            weight: 90
            timeoutMs: 12000
          - name: secondary-cloud-ca
            weight: 10
            failoverOn: [HTTP_429, HTTP_5XX, TTFT_EXCEEDED_2000MS]
      - name: tier3-reasoning-ttc
        residencyZone: CA-CENTRAL
        requireAutonomyHeaderIn: ["L3", "L4"]

  mcpFederation:
    virtualEndpoint: /mcp/v1
    upstreams:
      - prefix: sap_
        targetUri: https://mcp-sap-mm.bel.internal.boreal.ca/mcp
        authPolicy:
          tokenExchangeRfc8693:
            stsUri: https://login.boreal.ca/oauth2/v2.1/token
            toolScopes:
              sap_reserve_critical_spare_part: ["bel.inventory.reserve"]
              sap_release_spare_part_reservation: ["bel.inventory.compensate"]
      - prefix: bca_
        targetUri: https://mcp-warranty.bca.internal.boreal.ca/mcp
        cedarPolicySetRef: bca-bsif-e23-tool-guard

  a2aRoutes:
    - agentName: boreal-bca-warranty-adjudicator
      path: /a2a/bca/warranty
      upstream: https://warranty-agent.bca.svc.cluster.local:9443
      enforceHopDecrement: true
```

---

## 14.2 Ingénierie du routage cognitif hybride : l'arbitrage `SLM` ↔ `LLM` ↔ *Test-Time Compute*

Brancher chaque agent sur le modèle commercial le plus massif constitue un gaspillage architectural majeur : en production, **70 à 80 % des appels d'une saga exécutent des micro-tâches bornées** (extraire quatre champs structurés, convertir une alerte `OPC-UA` au format `Apache Ossie`, router une intention ou formater un appel `MCP` simple). Le module **`Agent Router`** répartit dynamiquement ce flux sur **trois paliers cognitifs** :

* **Palier 1 — `SLM` spécialisés (3B à 14B paramètres)** : Servis sur GPU internes (`vLLM`/`SGLang` en `FP8`, affinés par `LoRA` métier) avec décodage JSON contraint, ils traitent l'extraction, le triage et les outils unitaires en moins de 150 ms.
* **Palier 2 — `LLM` généralistes frontières (standard)** : Dédiés à la synthèse multi-documents, au dialogue client nuancé et à la coordination de 6 à 12 outils `MCP`.
* **Palier 3 — Modèles à *Test-Time Compute* réflexif** : Réservés aux 3 à 7 % de cas exigeant une planification sous contraintes contradictoires ou une contre-expertise critique (`BSIF E-23`), sous plafond strict de jetons de réflexion.

Pour toute requête \(q\) associée à un seuil de fiabilité exigé \(\theta\), le routeur choisit le palier minimal \(\tau^*(q)\) dont la probabilité de succès calibrée \(\hat{P}(q,\tau)\) franchit le seuil tout en respectant résidence et budget :

\[\tau^*(q) = \min\{\tau \in \{1,2,3\} : \hat{P}(q,\tau) \ge \theta\}\]

Cette sélection associe un **pré-routage prédictif** (classifieur neuronal léger sur CPU en < 3 ms) et une **escalade en cascade sur confiance calibrée** : si le `SLM` affiche une faible log-probabilité minimale ou échoue au validateur de schéma, la passerelle rejoue immédiatement l'appel sur le Palier 2 de façon transparente.

Deux subtilités d'ingénierie conditionnent la fiabilité réelle de ce routage hybride en production :

1. **Calibration statistique des scores de confiance** : Les probabilités brutes sorties par la couche *softmax* d'un modèle affiné sont fréquemment sur-confiantes. Avant mise en production, l'équipe `AgentOps` étalonne un facteur de mise à l'échelle thermique (*Temperature Scaling*) et des seuils de prédiction conforme (*Conformal Prediction*) sur un jeu de validation interne de type \(\tau\)-bench afin qu'un seuil nominal de `0,88` corresponde effectivement à un taux empirique d'exactitude supérieur à 98,5 %.
2. **Défense contre les attaques d'éponge budgétaire (*Routing Sponge Attacks*)** : Un attaquant externe soumettant des requêtes alambiquées sur un portail client pourrait chercher à forcer systématiquement l'escalade vers le Palier 3 *test-time compute* pour saturer le budget FinOps. C'est pourquoi le routeur restreint l'accès au Palier 3 aux seules identités `NHI` opérant sous un mandat interne `L3`/`L4` authentifié et plafonne strictement `maxReasoningTokensPerTurn` dans la passerelle.

| Caractéristique | Palier 1 : `SLM` Spécialisés (3B–14B) | Palier 2 : `LLM` Généralistes Standard | Palier 3 : *Test-Time Compute* |
|---|---|---|---|
| **Part cible du volume** | **70 à 78 %** des appels | **17 à 24 %** des appels | **3 à 7 %** des appels |
| **Latence `TTFT` (p95)** | 45 à 160 ms | 350 à 900 ms | 1,8 à 12 s |
| **Coût / M jetons mixtes** | ~0,03 à 0,08 \$ CAD (GPU interne) | ~1,20 à 4,00 \$ CAD | ~8,00 à 28,00 \$ CAD |
| **Cas d'usage types** | Extraction JSON, triage, `EDI`/`OT`, outil simple | Synthèse multi-sources, client, 6–12 outils `MCP` | Planification contradictoire, contre-audit `E-23` |
| **Règle d'escalade** | Complexité `> 0,42` ou confiance logprob `< 0,88` | Conflit inter-sources ou politique d'audit | Plafond haut — sinon escalade humaine `HOTL` |

#### Extrait 14.2 — Routeur cognitif multicritère avec épinglage de souveraineté et escalade calibrée

```python
from __future__ import annotations
from dataclasses import dataclass
from enum import IntEnum


class ModelTier(IntEnum):
    SLM_SOVEREIGN = 1
    LLM_STANDARD = 2
    LLM_REASONING_TTC = 3


@dataclass(frozen=True)
class RoutingContext:
    tool_count: int
    data_classification: str      # "PUBLIC" | "INTERNAL" | "LOI25_PII" | "OT_CONTROLLED"
    latency_sla_ms: int
    remaining_budget_cad: float
    autonomy_level: str
    complexity_score: float       # Score [0.0, 1.0] évalué en < 3 ms


@dataclass(frozen=True)
class RoutingDecision:
    tier: ModelTier
    pool_endpoint: str
    max_reasoning_tokens: int
    allow_cloud_egress: bool


class HybridCognitiveRouter:
    EST_COST = {ModelTier.SLM_SOVEREIGN: 0.0006, ModelTier.LLM_STANDARD: 0.014, ModelTier.LLM_REASONING_TTC: 0.11}

    def select_initial_tier(self, ctx: RoutingContext) -> RoutingDecision:
        # 1. Épinglage dur de souveraineté (Loi 25 non anonymisée ou secret industriel OT)
        if ctx.data_classification in {"LOI25_PII", "OT_CONTROLLED"} or ctx.latency_sla_ms <= 300:
            return RoutingDecision(ModelTier.SLM_SOVEREIGN, "tier1-sovereign-slm", 0, False)

        # 2. Arbitrage par complexité cognitive et surface d'outils
        if ctx.complexity_score < 0.42 and ctx.tool_count <= 4:
            target = ModelTier.SLM_SOVEREIGN
        elif ctx.complexity_score < 0.78 or ctx.autonomy_level in {"L0", "L1"}:
            target = ModelTier.LLM_STANDARD
        else:
            target = ModelTier.LLM_REASONING_TTC

        # 3. Garde-fou FinOps sur le budget résiduel de l'ActionEnvelope
        while target > ModelTier.SLM_SOVEREIGN and ctx.remaining_budget_cad < self.EST_COST[target]:
            target = ModelTier(target - 1)

        pools = {
            ModelTier.SLM_SOVEREIGN: ("tier1-sovereign-slm", 0, False),
            ModelTier.LLM_STANDARD: ("tier2-frontier-standard", 0, True),
            ModelTier.LLM_REASONING_TTC: ("tier3-reasoning-ttc", 4096, True),
        }
        pool, max_ttc, cloud_ok = pools[target]
        return RoutingDecision(target, pool, max_ttc, cloud_ok)

    def escalate_on_low_confidence(self, ctx: RoutingContext, min_prob: float, valid_json: bool) -> RoutingDecision | None:
        if valid_json and min_prob >= 0.88:
            return None
        if ctx.data_classification in {"LOI25_PII", "OT_CONTROLLED"}:
            return RoutingDecision(ModelTier.LLM_STANDARD, "tier2-onprem-70b-qc", 0, False)
        if ctx.remaining_budget_cad >= self.EST_COST[ModelTier.LLM_STANDARD]:
            return RoutingDecision(ModelTier.LLM_STANDARD, "tier2-frontier-standard", 0, True)
        return None
```

::: {.encadre-sectoriel title="Souveraineté infonuagique, Secteur Public & Défense — Routage étanche sous Loi 25 et données contrôlées"}

Pour les ministères, le réseau de la santé québécois soumis à la **Loi 25** et les industriels assujettis au Programme des marchandises contrôlées du Canada (`ITAR`), le risque d'exfiltration vers une API tierce bloque souvent les projets agentiques.

L'étiquetage au niveau d'`agentgateway` impose un **confinement matériel vérifiable** : toute requête marquée `LOI25_PII` ou `OT_CONTROLLED` se voit interdire toute route `allowCloudEgress: true` et demeure traitée à 100 % sur des paliers `SLM` (14B) et `LLM` ouverts (70B) hébergés dans des centres de données souverains au Québec, tandis que les charges publiques débordent vers le nuage élastique lors des pointes.

:::

---

## 14.3 Physique des boucles multi-tours et ordonnancement Kubernetes conscient du `KV-Cache`

Sur une grappe GPU interne, le trafic agentique obéit à une physique mémoire radicalement différente du clavardage humain. Lorsqu'un spécialiste enchaîne sept appels d'outils `MCP`, la consigne système, l'ontologie `Apache Ossie` et les schémas JSON d'outils (~9 000 jetons) se répètent à l'identique à chaque tour, suivis d'à peine ~300 jetons nouveaux : **près de 90 % du contexte forme un préfixe invariant**.

Or, un transformeur sépare la phase de ***Prefill*** (calcul matriciel lourd construisant les tenseurs `KV-cache`, qui dicte le `TTFT`) et la phase de ***Decode*** (lecture en mémoire `HBM3e`). Un service Kubernetes `Round-Robin` qui expédie chaque tour vers un pod `vLLM` différent force chaque GPU à recalculer tout le *Prefill* de 9 000+ jetons à chaque étape — gaspillant jusqu'à 80 % des `FLOPS` et triplant la latence.

En 2027, l'extension **`Gateway API Inference Extension`** (architectures `llm-d`, `SGLang RadixAttention`, `NVIDIA Dynamo`) confie le routage à un **Endpoint Picker (`EPP`)** qui indexe en temps réel les blocs de préfixes résidents en `HBM` sur chaque pod \(p\) et maximise un score équilibré :

\[S(r,p) = \alpha H_{\text{kv}}(r,p) - \beta Q(p) - \gamma U(p)\]

Où \(H_{\text{kv}}(r,p) \in [0,1]\) mesure la fraction des blocs de 64 jetons de la requête \(r\) déjà en cache sur le pod \(p\), \(Q(p)\) pénalise la file d'attente et \(U(p)\) la pression mémoire `HBM`. Tous les tours d'une même session convergent ainsi vers le pod au cache chaud sans créer de point chaud en cas de rafale.

Pour les déploiements à très haute densité, cette affinité de routage se combine en 2027 à deux optimisations matérielles majeures au sein des moteurs d'inférence distribués (`llm-d` et `Mooncake`) :

* **Désagrégation *Prefill / Decode*** : Les requêtes entrantes au préfixe inédit sont dirigées vers un sous-pool de GPU optimisé pour le calcul matriciel intensif (*Prefill Nodes*), qui transfère ensuite les blocs `KV` calculés en quelques millisecondes via `RDMA` (`RoCEv2` / `InfiniBand`) vers un sous-pool dédié à la génération auto-régressive (*Decode Nodes*), évitant qu'un long document de 40 000 jetons ne fasse bondir la gigue inter-jetons (`ITL`) des sessions actives voisines.
* **Débordement hiérarchique du cache (`Tiered KV Offloading`)** : Lorsqu'une saga agentique marque une pause de dix minutes en attendant la réponse d'un serveur `MCP` lent ou d'un jumeau numérique, les blocs `KV` éjectés de la mémoire `HBM3e` sont déversés en mémoire `DDR5` hôte ou sur un pool `NVMe` partagé ; au réveil de l'agent, recharger ces tenseurs par DMA demeure huit à douze fois plus rapide que de les recalculer.

#### Extrait 14.3 — Manifeste Kubernetes `Gateway API Inference Extension` conscient du préfixe `KV-Cache`

```yaml
apiVersion: inference.networking.x-k8s.io/v1alpha2
kind: InferencePool
metadata:
  name: qwen3-14b-boreal-ft
  namespace: bsn-gpu
spec:
  targetPortNumber: 8000
  selector:
    app: vllm-qwen3-14b-specialist
  extensionRef:
    name: boreal-kv-aware-epp
    failureMode: FailOpen
---
apiVersion: inference.networking.x-k8s.io/v1alpha2
kind: InferenceModel
metadata:
  name: boreal-telemetry-specialist-v4
  namespace: bsn-gpu
spec:
  modelName: boreal/qwen3-14b-maint-ft
  criticality: Critical
  poolRef:
    name: qwen3-14b-boreal-ft
---
apiVersion: config.inference.x-k8s.io/v1alpha1
kind: EndpointPickerConfig
metadata:
  name: boreal-kv-aware-epp
  namespace: bsn-gpu
spec:
  metricsRefreshIntervalMs: 50
  prefixCacheIndexing:
    blockSizeTokens: 64
    maxTrackedBlocksPerPod: 65536
  scoringWeights:
    prefixCacheHitWeight: 0.65
    queueDepthPenalty: 0.25
    kvMemoryPressurePenalty: 0.10
  saturationThresholds:
    maxWaitingRequestsPerPod: 18
    maxKvCacheUsagePercent: 91
```

::: {.encadre-sectoriel title="Télécommunications & Centres de contact — Soutenir 50 000 sessions vocales sous TTFT < 250 ms"}

Sur un canal d'assistance vocale `WebRTC`, dépasser **250 à 300 ms de `TTFT`** rompt la cadence conversationnelle et provoque des interruptions mutuelles avec le client. En figeant dans un ordre binaire invariant la consigne système et les schémas `MCP` (zéro horodatage dynamique placé en tête de prompt) et en épinglant ce préfixe en mémoire `HBM` sous priorité `criticality: Critical`, les opérateurs télécoms atteignent 94 % de succès de cache dès le premier tour et un `TTFT` médian de **115 ms**.

:::

---

## 14.4 Application au fil rouge : déploiement d'`agentgateway` chez Groupe Boréal

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Unification du plan de données AI-natif et réduction de 62 % du Cost-per-Outcome"}

**Constat initial (Fin T1 2027 — 42 000 exécutions/jour)** : Malgré le succès fonctionnel des sagas `Temporal`, trois goulets menacent la mise à l'échelle chez **Boréal Services Numériques (BSN)** : 94 % des appels visent des modèles frontières coûteux même pour décoder des trames `SAP`/`OPC-UA` ; sur la grappe montréalaise de **16 GPU `NVIDIA H200`**, le routage Kubernetes `Round-Robin` plafonne le taux de `KV-cache` à **19 %** (GPU saturés à 89 %, `TTFT p95` à **2,90 s**) ; et onze équipes conservent des clés d'API statiques en clair.

**Architecture déployée en six semaines (T2 2027)** :

1. **Mise en coupure `agentgateway` et verrouillage `Cilium`** : Déploiement actif-actif (Montréal / Toronto) de la configuration `Extrait 14.1` et blocage réseau de toute sortie directe vers les API d'IA publiques, éliminant techniquement les *Shadow Agents*.
2. **Routage cognitif à 3 paliers** : Deux `SLM` 14B affinés absorbent **73 % des appels**, **22 %** transitent vers le Palier 2 via `Open Responses`, et **5 %** seulement sollicitent le Palier 3 *test-time compute*.
3. **Affinité de préfixe `KV-cache`** : Activation de l'`EndpointPickerConfig` (`Extrait 14.3`) et retrait par linter CI/CD de tout horodatage dynamique en tête de consigne système.

**Résultats vérifiés sur 90 jours à volume doublé** :

* **Succès du `KV-cache` interne** : bond de **19 % à 88 %**, abaissant l'occupation des 16 GPU `H200` de 89 % à **41 %** (évitant 1,4 M\$ CAD d'investissement matériel immédiat).
* **Latence `TTFT p95` multi-tours** : baisse de **62 %** (de 2,90 s à **1,10 s** globalement, et **135 ms** sur le Palier 1 `SLM`).
* **Facture et *Cost-per-Outcome*** : réduction de **62 %** (de **0,38 \$ CAD à 0,14 \$ CAD** par incident résolu), à score \(\text{pass}^5\) quasi inchangé (97,8 % vs 98,0 %). De surcroît, lors d'une panne régionale de quarante-sept minutes chez le fournisseur infonuagique primaire en mai 2027, `agentgateway` a basculé en 800 millisecondes le trafic Palier 2 vers le fournisseur secondaire canadien et absorbé le surplus sur la grappe `H200` locale avec **zéro interruption de saga** visible côté métier.

:::

---

## 14.5 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-014 — Imposition d'agentgateway comme plan de données unique, routage hybride à 3 paliers et affinité de KV-cache"}

* **Statut** : Acceptée | **Périmètre** : Charges agentiques internes et fédérées | **Révision** : Semestrielle
* **Contexte** : L'accès direct des agents aux modèles et serveurs `MCP` provoque une dérive des coûts, empêche l'application uniforme de la `Loi 25` et dégrade les GPU internes par invalidation du `KV-cache`.
* **Options évaluées** :
  1. *SDK client riche dans chaque agent* : **Rejetée** — ingérable sur un parc polyglotte et SaaS hétérogène.
  2. *Passerelle REST existante étendue par scripts* : **Rejetée** — aveugle au multiplexage `MCP`, aux jetons et à l'état mémoire GPU.
  3. *Plan de données AI-natif (`agentgateway`) + `Gateway API Inference Extension`* : Coupure unique unifiant `Open Responses`, `MCP` et `A2A`, couplée à `Agent Router` et à l'ordonnanceur conscient du préfixe. **Retenue**.
* **Décision** : Tout flux vers un modèle, un serveur `MCP` ou un pair `A2A` inter-divisions transite obligatoirement par `agentgateway` sous `mTLS SPIFFE`, cible par défaut le Palier 1 `SLM`, et utilise un `Endpoint Picker` conscient du préfixe sur grappe GPU interne.
* **Conséquences** :
  * *Positives* : Éradication réseau des *Shadow Agents*, baisse de plus de 55 % du *Cost-per-Outcome*, bascule multi-fournisseurs instantanée, télémétrie `gen_ai.*` universelle.
  * *Négatives / Coûts assumés* : Criticité *Tier-0* de la passerelle exigeant une haute disponibilité multi-zones.
* **Condition de révision** : Réévaluation semestrielle des seuils cognitifs et des standards `AAIF`.

:::

### Liste de contrôle de mise en production — Chapitre 14

Avant d'aborder au **Chapitre 15** la fédération des plateformes SaaS patrimoniales, validez les huit points suivants :

1. **Étanchéité réseau** : Les politiques réseau interdisent-elles à tout conteneur d'appeler un modèle ou serveur `MCP` en contournant `agentgateway` ?
2. **Quotas en jetons et devises** : Le contrôle de débit combine-t-il `TPM`, plafond de jetons de raisonnement et budget résiduel `ActionEnvelope` plutôt que de simples `RPS` ?
3. **Autorisation `MCP` par outil** : La passerelle exige-t-elle un échange `OAuth 2.1 OBO` (`RFC 8693`) et un contrôle `Cedar` distinct sur chaque méthode `tools/call` ?
4. **Contrat `Open Responses`** : Les agents consomment-ils l'API d'inférence normalisée permettant de permuter un modèle à chaud sans recompilation ?
5. **Épinglage de souveraineté** : Les flux marqués `LOI25_PII` ou données contrôlées sont-ils routés sans exception vers des paliers hébergés dans la juridiction autorisée ?
6. **Escalade calibrée homologuée** : Les seuils d'escalade du Palier 1 (`SLM`) vers les Paliers 2 et 3 sont-ils validés sur banc \(\tau\)-bench sans régression \(\text{pass}^k\) ?
7. **Invariance des préfixes** : Un linter vérifie-t-il qu'aucune donnée volatile (horodatage, UUID) n'est injectée en tête de consigne système au détriment du `KV-cache` ?
8. **Ordonnancement GPU conscient du préfixe** : Les grappes internes utilisent-elles un `Endpoint Picker` pondérant présence de préfixe et pression `HBM` plutôt qu'un équilibrage `Round-Robin` ?
