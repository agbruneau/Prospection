# Chapitre 21 — Observabilité distribuée de bout en bout avec OpenTelemetry GenAI

::: {.synthese-executive title="Synthèse exécutive — Chapitre 21"}

* **Enjeu stratégique** : Dans une architecture multi-agents asynchrone, la surveillance applicative classique (`APM`) devient aveugle : deux agents enfermés dans une boucle de reformulation stérile ou propageant une hallucination initiale renvoient exclusivement des codes `HTTP 200 OK` et des latences unitaires nominales jusqu'à l'épuisement des budgets ou la corruption d'un dossier métier. Sans observabilité sémantique distribuée, l'entreprise perd à la fois la maîtrise de ses délais de diagnostic (`MTTR`) et sa capacité de preuve réglementaire.
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Imposer les conventions ouvertes **`OpenTelemetry gen_ai.*`** et la propagation **`W3C Trace Context`** sur chaque saut (`Temporal`, `A2A v1.0`, `MCP`, passerelles `LLM`, mémoire) en proscrivant les SDK de traçage propriétaires captifs d'un cadriciel unique.
  2. *Structurante dès le jour 1* : Déployer une collecte à **double couloir (*Dual-Lane Telemetry*)** via `OpenTelemetry Collector`, séparant physiquement l'observabilité opérationnelle caviardée de tout renseignement personnel (`Loi 25`, `RGPD`) et une voûte forensique chiffrée par juridiction sous procédure de bris de glace.
  3. *Réversible par conception* : Le choix du moteur analytique et de visualisation en aval, découplé des agents producteurs par le protocole `OTLP`.
* **Indicateurs de gouvernance associés** : Continuité causale des traces inter-divisions (`Trace Continuity Ratio` \(\ge 99,5\,\%\)), délai moyen d'identification de cause racine (`MTTR` < 15 min), interception des boucles sémantiques (\(\le 3\) tours stériles) et zéro fuite PII dans les index de télémétrie.

:::

## 21.1 Pourquoi l'APM traditionnel échoue devant les systèmes multi-agents : l'illusion du `HTTP 200 OK`

Pendant quinze ans, l'ingénierie de la fiabilité (`SRE`) s'est appuyée sur les métriques d'infrastructure, les journaux structurés et les traces RPC mesurant la durée et le statut réseau. Dans un système déterministe, cette instrumentation suffit à localiser la panne : lorsqu'une base rejette une écriture ou qu'une API expire, une exception explicite remonte la pile d'appels, incrémente le taux d'erreur `5xx` et déclenche une alerte d'astreinte.

L'introduction de cellules probabilistes au cœur du *System of Action* brise ce contrat entre santé technique et justesse métier. En production agentique, **les défaillances les plus coûteuses ne lèvent aucune exception réseau**. Quatre phénomènes échappent aux sondes `APM` conventionnelles :

1. **La défaillance épistémique silencieuse (`OWASP ASI08`)** : Un extracteur interprète à contresens une clause d'avenant mal numérisée et transmet via `A2A v1.0` un objet JSON syntaxiquement valide à un agent aval. Les schémas passent au vert et les requêtes `HTTP` s'achèvent en `200 OK`, mais la mutation finale viole la politique commerciale.
2. **Le verrouillage actif de courtoisie (*Polite Semantic Livelock*)** : Lorsqu'un outil `MCP` retourne un résultat vide ou ambigu, l'agent reformule ses paramètres et sollicite un pair spécialiste qui lui renvoie une demande de précision, instaurant un dialogue circulaire poli. Le superviseur réseau observe une disponibilité de 100 %, tandis que la progression métier est nulle et que la consommation de jetons s'emballe.
3. **La non-localité temporelle des sagas durables** : Un flux orchestré par `Temporal` ou `Restate` s'exécute quelques secondes, dort quarante-huit heures dans l'attente d'une approbation `CIBA`, puis reprend sur un autre nœud. Les traceurs conçus pour des appels synchrones coupent la trace ou faussent les centiles de latence en confondant attente métier et lenteur technique.
4. **La balkanisation des boîtes noires multi-éditeurs** : Dès qu'un processus traverse un agent Python interne, `Salesforce Agentforce`, `ServiceNow` et `SAP S/4HANA`, les traceurs propres à chaque cadriciel fragmentent l'investigation en silos horodatés différemment sans clé de corrélation commune.

Pour restaurer une visibilité unifiée sans verrouillage fournisseur, l'industrie s'est alignée fin 2026 sur les conventions **`OpenTelemetry GenAI` (`gen_ai.*`)** de la `CNCF`, appuyées au niveau du plan de données par l'instrumentation native des passerelles comme `agentgateway`.

![Trace distribuée OpenTelemetry (gen_ai.*) de bout en bout et pipeline d'assainissement PII via OpenTelemetry Collector.](manuscrit/figures/fig-21-otel-genai-traces.svg)

L'observabilité agentique industrielle reconstruit ainsi l'**arbre causal complet** reliant intention initiale, chaîne de délégation `NHI`, cycles d'inférence, appels `MCP` et accès mémoire, tout en assainissant les charges utiles sensibles avant toute écriture dans un index partagé.

---

## 21.2 Conventions sémantiques `OpenTelemetry gen_ai.*` et continuité `W3C Trace Context`

Pour instrumenter de façon homogène une fabrique multi-agents en 2027, chaque transaction s'organise selon une hiérarchie canonique de cinq strates de *spans* corrélées par les en-têtes **`W3C Trace Context` (`traceparent`, `tracestate`)** et **`W3C Baggage`**.

### Les cinq strates de *spans* d'une transaction agentique

* **Strate 1 — Enveloppe de Saga durable (`saga.workflow.run`)** : Ouvert par le plan de contrôle déterministe dès l'événement déclencheur, ce *span* porte l'identifiant `saga.id`, le code processus (`business.process.code`) et le plafond d'autonomie (`L1`–`L4`). Lorsqu'une saga se met en veille prolongée (`awakeable` ou escalade `HOTL`), on clôt le segment actif et on relie le segment de reprise par un **`Span Link`** OpenTelemetry plutôt que de garder un *span* ouvert trois jours, préservant le graphe causal sans polluer les histogrammes de latence active.
* **Strate 2 — Saut de délégation horizontale (`invoke_agent` sur `A2A v1.0`)** : Chaque délégation vers un pair spécialiste génère un couple de *spans* `CLIENT` / `SERVER` capturant `gen_ai.agent.id`, la version de l'`Agent Card` et la chaîne d'identité non humaine (`security.nhi.spiffe_id`, `security.obo.actor`) issue de l'échange `RFC 8693`.
* **Strate 3 — Cycle d'inférence cognitive (`chat`)** : Ce *span* consigne le modèle demandé (`gen_ai.request.model`), le modèle réellement servi après routage ou repli (`gen_ai.response.model`), le motif d'arrêt et la ventilation exacte des jetons : entrée facturée plein tarif, lectures depuis le `KV-cache` de préfixe, jetons de raisonnement latent (*test-time compute*) et jetons de sortie.
* **Strate 4 — Invocation verticale d'outil (`execute_tool` sur `MCP`)** : En JSON-RPC 2.0, `MCP` réserve le champ `_meta` dans `params` pour véhiculer `traceparent` et `baggage` jusqu'au serveur `MCP`. Le *span* enregistre `gen_ai.tool.name`, `gen_ai.tool.call.id`, la clé d'idempotence et le statut d'exécution.
* **Strate 5 — Accès contextuel et mémoire (`memory.retrieve` / `memory.commit`)** : L'interrogation du graphe bi-temporel (`Graphiti`) ou de la couche sémantique (`Apache Ossie`) représente souvent le tiers de la latence d'un tour. Tracer le nombre d'entités extraites et l'horizon de validité temporelle distingue immédiatement une hallucination du modèle d'un défaut de récupération contextuelle.

| Espace d'attributs | Clé normalisée (`OpenTelemetry` / Extension) | Type | Obligatoire | Rôle opérationnel, sécuritaire et FinOps |
|---|---|---|---|---|
| **Opération & Modèle** | `gen_ai.operation.name` | `string` | Oui | Étape normalisée (`chat`, `invoke_agent`, `execute_tool`, `embeddings`) |
| **Opération & Modèle** | `gen_ai.provider.name` | `string` | Oui | Plateforme cible (`anthropic`, `openai`, `vertex_ai`, `vllm_internal`) |
| **Opération & Modèle** | `gen_ai.request.model` / `gen_ai.response.model` | `string` | Oui | Suivi des bascules de modèles (cascade `SLM`/`LLM` ou repli sur panne) |
| **Identité Agentique** | `gen_ai.agent.id` & `gen_ai.agent.version` | `string` | Oui | Lien exact avec le registre `SemVer+Intent` pour audit `BSIF E-23` |
| **Outillage `MCP`** | `gen_ai.tool.name` & `mcp.idempotency_key` | `string` | Si outil | Preuve de non-duplication d'effets de bord et fiabilité par serveur `MCP` |
| **Comptabilité Jetons** | `gen_ai.usage.input_tokens` / `output_tokens` | `int` | Oui | Base volumétrique brute à chaque appel d'inférence |
| **Comptabilité Avancée** | `gen_ai.usage.cache_read_input_tokens` | `int` | Oui | Mesure directe du taux de succès d'affinité du `KV-cache` |
| **Comptabilité Avancée** | `gen_ai.usage.reasoning_tokens` | `int` | Si applicable | Surveillance du calcul réflexif (*test-time compute*) |
| **Sécurité & `NHI`** | `security.nhi.spiffe_id` & `security.obo.actor` | `string` | Oui | Preuve non répudiable de la chaîne de délégation machine et humaine |
| **Gouvernance Saga** | `saga.id` & `finops.budget.remaining_cad` | `string`/`double` | Oui | Attribution *Cost-per-Outcome* et coupe-circuit budgétaire en ligne |

#### Extrait 21.1 — Instrumentation TypeScript d'un appel `MCP` propageant `W3C Trace Context` et `Baggage`

```typescript
import { context, propagation, SpanKind, SpanStatusCode, trace } from "@opentelemetry/api";

const tracer = trace.getTracer("boreal.agentic.fabric", "2027.1");

export interface McpToolInvocation {
  readonly serverUri: string;
  readonly toolName: string;
  readonly callId: string;
  readonly idempotencyKey: string;
  readonly sagaId: string;
  readonly actorSpiffeId: string;
  readonly remainingBudgetCad: number;
  readonly args: Record<string, unknown>;
}

export async function invokeInstrumentedMcpTool<TResult>(
  req: McpToolInvocation,
  transportSend: (uri: string, rpcPayload: unknown) => Promise<TResult>
): Promise<TResult> {
  const activeBaggage = propagation.getBaggage(context.active()) ?? propagation.createBaggage();
  const ctxWithBaggage = propagation.setBaggage(
    context.active(),
    activeBaggage
      .setEntry("saga.id", { value: req.sagaId })
      .setEntry("finops.remaining_cad", { value: req.remainingBudgetCad.toFixed(4) })
  );

  return context.with(ctxWithBaggage, () =>
    tracer.startActiveSpan(
      `execute_tool ${req.toolName}`,
      {
        kind: SpanKind.CLIENT,
        attributes: {
          "gen_ai.operation.name": "execute_tool",
          "gen_ai.tool.name": req.toolName,
          "gen_ai.tool.call.id": req.callId,
          "mcp.server.uri": req.serverUri,
          "mcp.idempotency_key": req.idempotencyKey,
          "saga.id": req.sagaId,
          "security.nhi.spiffe_id": req.actorSpiffeId,
        },
      },
      async (span) => {
        try {
          const carrier: Record<string, string> = {};
          propagation.inject(context.active(), carrier);

          const rpcPayload = {
            jsonrpc: "2.0",
            id: req.callId,
            method: "tools/call",
            params: {
              name: req.toolName,
              arguments: req.args,
              _meta: {
                traceparent: carrier["traceparent"],
                tracestate: carrier["tracestate"],
                baggage: carrier["baggage"],
              },
            },
          };

          const result = await transportSend(req.serverUri, rpcPayload);
          span.setStatus({ code: SpanStatusCode.OK });
          return result;
        } catch (err) {
          span.recordException(err as Error);
          span.setStatus({ code: SpanStatusCode.ERROR, message: (err as Error).message });
          throw err;
        } finally {
          span.end();
        }
      }
    )
  );
}
```

Notez que `req.args` et `result` ne sont délibérément pas copiés dans les attributs standards du *span* afin d'éviter la dissémination non contrôlée de données sensibles.

### Échantillonnage de queue cognitif (*Cognitive Tail-Based Sampling*)

À mesure que le volume dépasse plusieurs millions de *spans* par heure, conserver intégralement chaque trace consultative `L1` devient inutilement coûteux en stockage chaud. Toutefois, appliquer un échantillonnage aléatoire en tête (*Head-Based Sampling* classique à 5 % dès l'entrée) constitue une erreur grave en `AgentOps` : au moment où débute une saga, personne ne sait encore si elle s'achèvera nominalement en quatre secondes ou si elle dégénérera au septième tour en oscillation sémantique ou en rejet de politique `Cedar`.

L'architecture de collecte applique donc un **échantillonnage de décision différée en queue (*Tail-Based Sampling*)** qui maintient les *spans* d'un même `trace_id` en mémoire tampon jusqu'à la clôture du segment actif, puis applique quatre règles déterministes par ordre de priorité :

1. **Rétention à 100 % des transactions mutatives (`L2`, `L3`, `L4`)** : Toute saga susceptible d'altérer un *System of Record* ou soumise à `BSIF E-23` est intégralement conservée à des fins d'auditabilité réglementaire et de calcul exact du *Cost-per-Outcome*.
2. **Rétention à 100 % des anomalies techniques, sécuritaires et cognitives** : Toute trace comportant un statut d'erreur, un refus `Cedar`/`OPA`, une escalade `HOTL`, une coupure de la sentinelle anti-livelock ou un coût unitaire supérieur au 95e centile est systématiquement archivée.
3. **Échantillonnage stratifié (5 à 10 %) des interactions `L1` nominales** : Les simples requêtes documentaires en lecture seule réussies du premier coup sous le seuil de latence sont sous-échantillonnées pour l'index de traces, **seulement après** que le connecteur `spanmetrics` du collecteur en a extrait les compteurs exacts de jetons et de latence afin que la comptabilité FinOps demeure exacte au centime près.

---

## 21.3 Gouvernance de la confidentialité des traces : observer sans violer la `Loi 25` ni le `RGPD`

Pour diagnostiquer une erreur de raisonnement, l'ingénieur voudrait inspecter le contexte complet (`gen_ai.input.messages`) et la sortie brute (`gen_ai.output.messages`) ; or ces textes libres contiennent inévitablement des renseignements personnels, des secrets industriels ou des données financières. Les indexer en clair dans un outil central d'observabilité viole directement la **`Loi 25`** au Québec et le **`RGPD`** en Europe.

En entreprise réglementée, l'architecture de référence 2027 repose sur une **collecte à double couloir (*Dual-Lane Telemetry*)** exécutée par des instances régionales d'`OpenTelemetry Collector` :

1. **Le couloir opérationnel assaini (100 % du flux, rétention 13 mois)** : Destiné aux équipes `SRE` et `FinOps`, il conserve toutes les métadonnées causales, identités `NHI`, latences et jetons, mais **supprime les charges textuelles brutes et pseudonymise par `HMAC-SHA256`** tout identifiant client tout en filtrant les motifs PII résiduels (NAS, courriel, IBAN).
2. **Le couloir forensique sous scellés (« Bris de glace », erreurs et actes `L3`/`L4`, rétention 14 à 30 jours)** : Avant caviardage, un connecteur interne chiffre les charges complètes avec une clé `KMS` résidant dans la juridiction légale (Montréal ou Francfort). Leur lecture ponctuelle exige un mandat d'incident doublement approuvé et journalisé dans le SIEM.

#### Extrait 21.2 — Pipeline `OpenTelemetry Collector` avec masquage PII et routage souverain

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317

processors:
  batch:
    send_batch_size: 2048
    timeout: 2s

  transform/pseudonymize:
    trace_statements:
      - context: span
        statements:
          - set(attributes["customer.pseudo_id"], SHA256(Concat([attributes["customer.raw_id"], env("PII_PEPPER_2027")], ""))) where attributes["customer.raw_id"] != nil
          - delete_key(attributes, "customer.raw_id")

  redaction/strict_pii:
    allow_all_keys: true
    blocked_key_patterns:
      - "^gen_ai\\.(input|output)\\.messages$"
      - "^mcp\\.tool\\.(raw_arguments|raw_result)$"
    blocked_values:
      - "\\b\\d{3}[-\\s]?\\d{3}[-\\s]?\\d{3}\\b"                      # NAS Canadien
      - "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"             # Courriel
      - "\\b[A-Z]{2}\\d{2}[A-Z0-9]{4}\\d{7}([A-Z0-9]?){0,16}\\b"      # IBAN

connectors:
  forward/forensic_split: {}

exporters:
  otlp/observability_clean:
    endpoint: https://telemetry-core.internal.boreal.ca:4317
  awss3/forensic_vault_ca_qc:
    s3uploader:
      region: ca-central-1
      s3_bucket: boreal-forensic-traces-qc-encrypted
      server_side_encryption: aws:kms
      kms_key_id: arn:aws:kms:ca-central-1:112233445566:key/boreal-loi25-vault

service:
  pipelines:
    traces/ingest:
      receivers: [otlp]
      processors: [transform/pseudonymize]
      exporters: [forward/forensic_split]
    traces/clean_apm:
      receivers: [forward/forensic_split]
      processors: [redaction/strict_pii, batch]
      exporters: [otlp/observability_clean]
    traces/forensic_vault:
      receivers: [forward/forensic_split]
      processors: [batch]
      exporters: [awss3/forensic_vault_ca_qc]
```

::: {.encadre-sectoriel title="Conformité Loi 25 (Québec) & RGPD — Concilier explicabilité algorithmique et droit à l'effacement"}

L'**article 12.1 de la `Loi 25`** (comme l'article 22 du `RGPD`) impose à l'organisation qui prend une décision exclusivement automatisée de pouvoir communiquer à la personne concernée les renseignements utilisés ainsi que **les principaux facteurs et paramètres menant à la décision**, tout en respectant le principe de minimisation et d'effacement.

Le **chiffrement par enveloppe individualisée (*Crypto-Shredding*)** lève cette contradiction dans la voûte forensique : la *structure logique de la décision* (version de l'agent, règles `Cedar` évaluées, seuils appliqués, outils `MCP` invoqués — exempte de PII) est archivée à long terme, tandis que les *fragments personnels* sont chiffrés avec une clé propre au dossier client. Pendant le délai légal de révision, l'explication exacte est reconstructible en quelques secondes ; à l'échéance ou sur demande d'effacement, la révocation de la clé client rend les fragments irréversiblement illisibles sur le stockage immuable sans altérer les agrégats statistiques d'audit.

:::

---

## 21.4 SLI/SLO cognitifs et détection temps réel des *livelocks* sémantiques

Dans une fabrique multi-agents, surveiller uniquement le taux d'erreur HTTP `5xx` et la charge GPU ne renseigne nullement sur la qualité du travail accompli. Une équipe `AgentOps` pilote la production par cinq **indicateurs de niveau de service (`SLI`) cognitifs** extraits en continu des *spans* `OpenTelemetry` :

| Indicateur (`SLI` Agentique) | Définition sur les *spans* `OTel` | Cible `SLO` (`L3`) | Pathologie détectée | Action automatisée |
|---|---|---|---|---|
| **Continuité causale (`TCR`)** | Part des sagas sans *span* orphelin sur tous les sauts `A2A`/`MCP` | \(\ge 99,8\,\%\) | Connecteur muet ou perte d'en-tête sur courtier | Blocage du composant en `CI/CD` |
| **Efficacité d'outillage (`TER`)** | Ratio d'appels `execute_tool` valides et utiles par saga | \(\ge 92,0\,\%\) | Schéma JSON ambigu ou dérive d'API amont | Alerte propriétaire `MCP` + repli modèle |
| **Convergence de boucle** | Nombre p99 de tours cognitifs par résultat validé | \(\text{p99} \le 6\text{ tours}\) | *Polite Livelock* ou consigne contradictoire | Coupure immédiate par sentinelle en flux |
| **Amplification réflexive** | Ratio \(\text{reasoning\_tokens} / \text{output\_tokens}\) | \(\le 8,0\times\) | Sur-réflexion (*Overthinking*) sur entrée floue | Plafonnement dynamique `max_reasoning_tokens` |
| **Taux de désaveu `HOTL`** | Part des propositions corrigées ou rejetées par l'humain | \(< 4,0\,\%\) | Dérive sémantique silencieuse | Campagne de recalibrage \(\tau\)-bench |

### Mathématique de la détection des boucles sémantiques furtives

Attendre l'épuisement passif du plafond `maxRemainingHops` gaspille latence et budget. Or, une boucle sémantique ne répète jamais mot pour mot la même phrase : le modèle reformule légèrement la même intention d'appel. Pour l'intercepter dès le deuxième cycle stérile, un analyseur en flux projette l'intention normalisée de chaque étape sous forme d'un vecteur léger \(\mathbf{e}_t\) et évalue sur les \(m\) derniers pas le **score de stagnation sémantique** :

\[\mathcal{S}_{\text{loop}}(t) = \max_{1 \le j \le m} \cos\!\left(\mathbf{e}_t, \mathbf{e}_{t-j}\right) \cdot \mathbb{I}\!\left(\Delta \text{État}(t) = 0\right)\]

La similarité cosinus sur une fenêtre \(m=5\) capte aussi bien le bégaiement direct (\(j=1\)) que l'oscillation ping-pong entre deux agents (\(j=2\)), tandis que \(\mathbb{I}(\Delta \text{État}(t) = 0)\) garantit qu'on n'interrompt jamais un agent qui itère légitimement sur plusieurs lignes de commande distinctes puisque l'empreinte d'état métier évolue alors à chaque pas.

#### Extrait 21.3 — Sentinelle Python de détection temps réel de *livelock* sémantique

```python
from collections import deque
from dataclasses import dataclass, field
import numpy as np
from typing import Deque, Dict, Optional

@dataclass
class StepSignature:
    step_index: int
    intent_vector: np.ndarray        # Vecteur normalisé L2 (dim=384, SLM d'embedding local)
    state_hash_after: str            # Condensat SHA-256 des faits métiers acquis par la saga

@dataclass
class SagaLoopWindow:
    history: Deque[StepSignature] = field(default_factory=lambda: deque(maxlen=5))
    consecutive_stagnant_hits: int = 0

class SemanticLivelockDetector:
    def __init__(self, similarity_threshold: float = 0.94, max_stagnant_hits: int = 2) -> None:
        self.threshold = similarity_threshold
        self.max_hits = max_stagnant_hits
        self._sagas: Dict[str, SagaLoopWindow] = {}

    def evaluate_span_event(self, saga_id: str, current: StepSignature) -> Optional[str]:
        window = self._sagas.setdefault(saga_id, SagaLoopWindow())
        max_sim, matched_step = 0.0, None

        for past in window.history:
            if past.state_hash_after == current.state_hash_after:
                sim = float(np.dot(current.intent_vector, past.intent_vector))
                if sim > max_sim:
                    max_sim, matched_step = sim, past.step_index

        window.history.append(current)

        if max_sim >= self.threshold:
            window.consecutive_stagnant_hits += 1
            if window.consecutive_stagnant_hits >= self.max_hits:
                return f"LIVELOCK_ABORT: saga={saga_id} sim={max_sim:.3f} (pas {current.step_index}~{matched_step})"
        else:
            window.consecutive_stagnant_hits = 0
        return None
```

::: {.encadre-sectoriel title="Secteur Financier (BSIF E-23) & Industrie IT/OT — Horodatage synchronisé et intégrité forensique"}

Dans deux environnements critiques, un simple index de recherche ne confère pas une force probante suffisante aux traces :

* **Sous la ligne directrice `BSIF E-23` (1er mai 2027)**, l'institution financière doit démontrer aux inspecteurs que la piste d'audit reliant la version du modèle, l'évaluation `Cedar` et l'octroi `L3` est inaltérable. La pratique normative consiste à sceller toutes les cinq minutes un **arbre de Merkle** sur les lots de *spans* décisionnels et à en ancrer la racine signée dans un stockage WORM indépendant de l'équipe d'exploitation.
* **En milieu industriel `IT/OT`**, corréler une recommandation prédictive infonuagique avec l'historien de procédés d'usine exige une **synchronisation horaire stricte (`NTP` / `PTP IEEE 1588`)** et l'écriture du `trace_id` directement dans le journal transactionnel `MES`/`SCADA`.

:::

---

## 21.5 Application au fil rouge : observabilité unifiée chez Groupe Boréal

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Corréler quatre silos technologiques et abaisser le MTTR de 6,5 heures à 9 minutes"}

**Obstacle initial au lancement du pilote transversal (Janvier 2027)** :
Sur le flux de maintenance prédictive reliant **BSN** (`ServiceNow`), **BCA** (`IBM i` et `Guidewire`) et **BEL** (`SAP S/4HANA`), 3,2 % des sagas expiraient au bout de dix minutes sans erreur HTTP apparente. Chaque diagnostic mobilisait quatre équipes fouillant des journaux incompatibles pendant **6,5 heures** en moyenne.

**Architecture déployée (Février 2027)** :

1. **Propagation universelle** : Activation d'`OpenTelemetry gen_ai.*` sur `agentgateway`, `Temporal` et tous les serveurs `MCP` (y compris l'adaptateur `IBM i` via `_meta.traceparent`).
2. **Collecteurs souverains à double couloir** : Déploiement de grappes `OpenTelemetry Collector` à Montréal (`ca-central-1`, périmètre `Loi 25` / `BSIF`) et Francfort (`eu-central-1`, périmètre `RGPD`). Un audit d'injection confirme **0 fuite PII en clair** sur 1,4 million de *spans*.
3. **Résolution immédiate du bogue fantôme** : Dès le lendemain, la vue cascade révèle en **9 minutes** la cause des expirations : sur d'anciens avenants BCA antérieurs à 2019 comportant des caractères `EBCDIC` mal convertis, un serveur `MCP` renvoyait une chaîne tronquée sans erreur ; l'*Agent Garantie* et l'*Agent Extracteur* entraient alors dans un *Polite Livelock* de sept reformulations empêchant l'étape `SAP` de démarrer.

**Résultats mesurés à T2 2027** :

* **Continuité causale (`TCR`)** : **99,91 %** à travers les trois divisions.
* **`MTTR` cognitif moyen** : ramené de **6,5 heures à 9 minutes**.
* **Sentinelle anti-livelock** : **1 840 boucles interceptées dès le 2e tour** au premier trimestre, économisant **14 600 \$ CAD** d'inférence inutile et réduisant la pression sur le mainframe patrimonial aux heures de pointe.

:::

---

## 21.6 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-021 — Standardisation sur OpenTelemetry GenAI et collecte souveraine à double couloir PII"}

* **Statut** : Acceptée | **Périmètre** : Observabilité AgentOps (`L1`–`L4`) | **Révision** : Semestrielle
* **Contexte** : L'exploitation de flux multi-agents inter-progiciels souffre d'une cécité face aux pannes sémantiques et aux boucles actives, tandis que la journalisation brute des prompts expose l'organisation à des infractions `Loi 25` et `RGPD`.
* **Options évaluées** :
  1. *Traceurs propriétaires par cadriciel d'agents* : Incapables de relier `ServiceNow`, `Agentforce`, `Temporal` et `IBM i` ; fort risque de verrouillage. **Rejetée**.
  2. *Journalisation textuelle brute dans un SIEM central* : Coût prohibitif, absence de métriques natives sur les jetons et surexposition massive de PII. **Rejetée**.
  3. *Instrumentation `OpenTelemetry gen_ai.*` + `W3C Trace Context` avec collecteurs régionaux à double couloir* : Standard ouvert CNCF, séparation stricte entre télémétrie assainie et voûte forensique chiffrée par juridiction. **Retenue**.
* **Décision** : Tout orchestrateur, agent, passerelle IA et serveur `MCP` doit propager `traceparent`/`baggage` et émettre ses *spans* en `OTLP` selon `gen_ai.*`. Aucun message brut non caviardé ne rejoint l'index général ; l'accès aux charges forensiques exige une procédure de bris de glace journalisée sous clé régionale.
* **Conséquences** :
  * *Positives* : Vision causale unifiée, base exacte du *Cost-per-Outcome*, conformité `Loi 25` / `RGPD` / `BSIF E-23`, portabilité du backend analytique.
  * *Négatives / Coûts assumés* : Exploitation des collecteurs et seaux chiffrés régionaux, maintien des règles de masquage.
* **Condition de révision** : Révision semestrielle suivant les versions des conventions `OpenTelemetry GenAI`.

:::

### Liste de contrôle de mise en production — Chapitre 21

1. **Continuité `W3C` intégrale** : Les en-têtes `traceparent` et `baggage` traversent-ils sans coupure HTTP (`A2A`), JSON-RPC (`_meta` dans `MCP`), courtiers (`Kafka`/`Solace`) et moteurs durables ?
2. **Pauses longues liées par `Span Links`** : Les attentes asynchrones (`HOTL`, `CIBA`) utilisent-elles des `Span Links` afin de préserver les centiles de latence active ?
3. **Ventilation granulaire des jetons** : Chaque *span* d'inférence distingue-t-il entrée pleine, lectures `KV-cache`, jetons de raisonnement et jetons de sortie ?
4. **Généalogie `NHI` présente** : Les attributs `security.nhi.spiffe_id` et `security.obo.actor` sont-ils attachés à chaque *span* mutatif ?
5. **Zéro PII dans le couloir chaud** : Un test automatisé d'injection de motifs personnels (NAS, courriel, IBAN) confirme-t-il leur absence totale de l'index courant ?
6. **Voûte forensique souveraine** : Les charges complètes d'investigation résident-elles dans la juridiction légale requise sous chiffrement `KMS`, `TTL` court et double approbation ?
7. **Sentinelle anti-livelock active** : La détection en flux de stagnation d'état et de similarité d'intentions coupe-t-elle les boucles avant épuisement du budget ?
8. **Alertes `SLI`/`SLO` cognitifs** : L'exploitation surveille-t-elle l'efficacité d'outils `MCP`, l'amplification réflexive et le taux de rejet `HOTL` ?
