# Chapitre 23 — FinOps agentique : Gouvernance économique et Cost-per-Outcome

::: {.synthese-executive title="Synthèse exécutive — Chapitre 23"}

* **Enjeu stratégique** : Alors que le tarif catalogue au million de jetons diminue chaque année, la facture réelle des systèmes agentiques en entreprise dérape fréquemment à la hausse sous l'effet multiplicateur des boucles inter-agents, du calcul réflexif (*test-time compute*), de la réinjection répétée de schémas `MCP` et des crédits d'action facturés par les éditeurs SaaS. Piloter un programme par sa facture mensuelle globale d'API revient à constater le dépassement trente jours trop tard sans distinguer les agents créateurs de marge des agents déficitaires.
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Ériger le **coût complet par résultat métier validé (*Cost-per-Outcome*, `CPO`)** en unité cardinale de gouvernance économique, en amortissant le coût des sagas avortées, des compensations et du temps humain `HOTL` sur les seuls dossiers résolus avec succès.
  2. *Structurante dès le jour 1* : Implanter un **disjoncteur budgétaire progressif en temps réel** dans `agentgateway` et l'`ActionEnvelope`, dégradant dynamiquement un flux vers un `SLM` économique avant d'interrompre proprement toute saga atteignant son plafond monétaire.
  3. *Réversible par conception* : La répartition du trafic entre modèles frontières infonuagiques et `SLM` spécialisés, réarbitrée chaque trimestre selon le couple coût/constance \(\text{pass}^5\).
* **Indicateurs de gouvernance associés** : *Cost-per-Outcome* net par processus vs coût humain de référence, taux de lecture du `KV-cache` de préfixe (\(\ge 75\,\%\)), part des appels absorbés par des `SLM` (\(\ge 70\,\%\)) et taux trimestriel de rationalisation du portefeuille.

:::

## 23.1 Le mirage du prix au million de jetons et l'iceberg économique des systèmes multi-agents

Lorsqu'une direction financière budgète une initiative agentique avec la grille linéaire des copilotes de 2024 — nombre de requêtes multiplié par mille jetons —, **elle sous-estime le coût réel de production d'un facteur 8 à 25**.

Cet écart provient de la dynamique multiplicative d'une saga autonome `L3`/`L4`. Un seul événement métier déclenchant un orchestrateur qui sollicite trois spécialistes `A2A`, exécutant chacun quatre cycles *ReAct* avec huit outils `MCP` et du raisonnement étendu (*test-time compute*), engendre quinze à trente inférences successives. À chaque tour, l'historique accumulé et les schémas JSON des outils sont rechargés en entrée. Si l'ordonnancement casse l'affinité du `KV-cache` ou si une API tierce provoque des réessais, la dépense unitaire s'envole silencieusement.

![Architecture du moteur FinOps agentique : agrégation temps réel des coûts complets, disjoncteur par saga et attribution du Cost-per-Outcome.](manuscrit/figures/fig-23-finops-cost-per-outcome.svg)

Une gouvernance `FinOps` rigoureuse décompose systématiquement les **sept postes de coûts directs et cachés** d'une transaction agentique :

| Poste de coût complet | Mécanisme d'inflation caché en production | Part typique (non optimisé) | Levier architectural d'optimisation (Standard 2027) |
|---|---|---|---|
| **1. Jetons d'entrée répétés (prompts & schémas `MCP`)** | Réinjection à chaque tour de dizaines de schémas JSON verbeux sans affinité de cache | 28 % – 38 % | Préfixes statiques canoniques + affinité `KV-cache` (-75 à -90 %) + < 12 outils actifs |
| **2. Jetons de raisonnement (*Test-Time Compute*)** | Génération de 4 000 à 12 000 jetons internes invisibles (tarif sortie) sur des cas simples | 20 % – 35 % | Triage préalable par `SLM` + plafond `max_reasoning_tokens` par classe de tâche |
| **3. Bavardage inter-agents (`A2A`)** | Prose narrative entre pairs au lieu de structures JSON compactes `Apache Ossie` | 8 % – 14 % | Sorties structurées strictes (`Open Responses`) sans politesse machine-à-machine |
| **4. Crédits d'action SaaS & API tierces** | Débit unitaire par appel d'agent éditeur, même lors de réessais ou lectures vides | 10 % – 20 % | Cache de lecture à `TTL` court sur la passerelle + déduplication par clé d'idempotence |
| **5. Mémoire bi-temporelle & État durable** | Extraction d'entités par LLM à chaque écriture `Graphiti` et transitions `Temporal` | 5 % – 9 % | Extraction déportée sur `SLM` quantifié en lot asynchrone ; indexation sélective |
| **6. Sagas avortées, boucles et compensations** | Dossiers brûlant 90 % de leur budget avant d'échouer sans résultat métier | 6 % – 15 % | Sentinelle anti-livelock (Chapitre 21) + contrôle déterministe précoce des préconditions |
| **7. Coût cognitif humain (`HOTL`)** | Temps d'examen d'un expert qualifié sur des escalades mal ciblées | Souvent omis (majeur en TCO) | Calibrage des seuils `Cedar` et vue `A2UI` focalisée sur le différentiel de preuves |

### Démonstration arithmétique sur une saga type de dix étapes

Pour saisir l'ampleur de l'effet de levier architectural, comparons deux implémentations d'une même saga d'instruction de dossier exécutant dix étapes cognitives :

* **Architecture naïve (Génération 2 non optimisée)** : Chaque étape appelle un modèle frontière (entrée à 3,00 \$ CAD / M jetons, sortie et raisonnement à 15,00 \$ CAD / M jetons) en rechargeant 18 000 jetons de contexte et de catalogues d'outils non cachés, génère 2 500 jetons de raisonnement latent et 600 jetons de prose, et subit 18 % de sagas avortées ou reprises manuellement. Le coût direct d'une exécution atteint environ **1,01 \$ CAD**, et grimpe à **1,46 \$ CAD par résultat validé** une fois amortis les échecs et la surcharge d'escalade `HOTL`. Sur 50 000 dossiers mensuels, la dépense annuelle atteint **876 000 \$ CAD**.
* **Architecture `AgentOps` gouvernée (Standard 2027)** : Huit des dix étapes (qualification, extraction, formatage `MCP`, synthèse) sont exécutées par un `SLM` spécialisé à 0,12 \$ CAD / M jetons ; les deux seules étapes d'arbitrage complexe sollicitent le modèle frontière avec un préfixe ordonné obtenant 85 % de lectures `KV-cache` (remise de 80 % sur l'entrée) et un budget de raisonnement plafonné à 1 024 jetons ; le taux de réussite du premier coup franchit 96 %. Le coût complet amorti chute alors à **0,13 \$ CAD par résultat validé** — soit **78 000 \$ CAD par an** pour le même volume métier, divisant la facture par plus de onze tout en accélérant le temps de réponse médian de 64 %.

---

## 23.2 Modélisation formelle et attribution analytique du *Cost-per-Outcome* (`CPO`)

Présenter au comité exécutif une facture mensuelle brute de *« 420 millions de jetons pour 18 400 \$ CAD »* ne permet jamais de savoir si la plateforme crée de la richesse ou subventionne du gaspillage. Le **FinOps agentique** ancre le pilotage dans une unité d'œuvre métier auditable : le **Cost-per-Outcome net (`CPO`)**.

Un *résultat métier validé* n'est ni un message affiché, ni la fin technique d'un workflow sans exception : c'est **l'accomplissement vérifié et durable de l'objectif d'affaires** (garantie instruite non contestée sous 72 h, intervention préventive confirmée, facture rapprochée et comptabilisée). Afin d'interdire tout biais qui masquerait le coût des échecs, l'équation normative du `CPO` net sur l'ensemble \(\mathcal{S}\) de toutes les sagas exécutées sur la période (réussies, échouées ou compensées) s'établit ainsi :

\[\text{CPO}_{\text{net}} = \frac{\sum_{s \in \mathcal{S}} \left( C_{\text{inf}}(s) + C_{\text{mcp}}(s) + C_{\text{mem}}(s) + C_{\text{hotl}}(s) \right)}{N_{\text{validés}} - N_{\text{annulés}}}\]

où \(C_{\text{inf}}(s)\) cumule le coût exact des *spans* d'inférence (tarif plein hors cache, tarif réduit lecture `KV-cache`, tarif sortie couvrant génération et raisonnement), \(C_{\text{mcp}}(s)\) additionne les crédits d'outils tiers et bacs à sable `OpenSandbox`, \(C_{\text{mem}}(s)\) intègre les opérations mémoire et durables, et \(C_{\text{hotl}}(s)\) valorise le temps réel de revue humaine au taux horaire chargé de l'approbateur. Au dénominateur, toute décision annulée ou reprise manuellement sous 72 heures (\(N_{\text{annulés}}\)) est déduite.

Cette équation aligne immédiatement l'ingénierie et la finance : **hausser la constance \(\text{pass}^5\) (Chapitre 22) ou couper les boucles dès le deuxième tour (Chapitre 21) réduit mécaniquement le `CPO` net**.

#### Extrait 23.1 — Requête SQL analytique d'attribution du *Cost-per-Outcome* sur les *spans* `OpenTelemetry`

Exécutée toutes les heures dans l'entrepôt analytique alimenté par le flux `OTel` assaini, cette requête réconcilie les coûts techniques complets avec les événements métiers validés :

```sql
WITH span_costs AS (
    SELECT
        s.attributes['saga.id']::STRING                        AS saga_id,
        s.attributes['business.process.code']::STRING          AS process_code,
        COALESCE(s.attributes['gen_ai.usage.input_tokens']::INT, 0)
          - COALESCE(s.attributes['gen_ai.usage.cache_read_input_tokens']::INT, 0) AS uncached_in_tokens,
        COALESCE(s.attributes['gen_ai.usage.cache_read_input_tokens']::INT, 0)     AS cached_in_tokens,
        COALESCE(s.attributes['gen_ai.usage.output_tokens']::INT, 0)
          + COALESCE(s.attributes['gen_ai.usage.reasoning_tokens']::INT, 0)        AS billable_out_tokens,
        COALESCE(s.attributes['mcp.external_api_cost_cad']::DOUBLE, 0.0)           AS mcp_api_cost_cad,
        COALESCE(s.attributes['hotl.review_seconds']::DOUBLE, 0.0) * (84.0 / 3600) AS hotl_labor_cost_cad,
        p.uncached_in_per_1m_cad,
        p.cached_in_per_1m_cad,
        p.output_per_1m_cad
    FROM otel_clean.genai_spans s
    LEFT JOIN finops.model_pricing_catalog p
        ON s.attributes['gen_ai.response.model']::STRING = p.model_id
       AND s.start_time BETWEEN p.effective_from AND p.effective_to
    WHERE s.start_time >= DATEADD('day', -30, CURRENT_TIMESTAMP())
),
saga_full_cost AS (
    SELECT
        saga_id,
        ANY_VALUE(process_code) AS process_code,
        SUM(
            (uncached_in_tokens / 1e6) * COALESCE(uncached_in_per_1m_cad, 0)
          + (cached_in_tokens   / 1e6) * COALESCE(cached_in_per_1m_cad, 0)
          + (billable_out_tokens / 1e6) * COALESCE(output_per_1m_cad, 0)
          + mcp_api_cost_cad
          + hotl_labor_cost_cad
        ) AS total_saga_cost_cad
    FROM span_costs
    GROUP BY saga_id
)
SELECT
    c.process_code,
    COUNT(c.saga_id)                                                       AS total_sagas_launched,
    COUNT_IF(o.outcome_status = 'VALIDATED' AND NOT o.reopened_within_72h) AS net_validated_outcomes,
    ROUND(SUM(c.total_saga_cost_cad), 2)                                   AS total_spend_cad,
    ROUND(
        SUM(c.total_saga_cost_cad)
        / NULLIF(COUNT_IF(o.outcome_status = 'VALIDATED' AND NOT o.reopened_within_72h), 0),
        4
    )                                                                      AS net_cost_per_outcome_cad
FROM saga_full_cost c
LEFT JOIN business_events.saga_outcomes o
    ON c.saga_id = o.saga_id
GROUP BY c.process_code
ORDER BY total_spend_cad DESC;
```

::: {.encadre-sectoriel title="Tarification des Éditeurs SaaS en 2027 — Déjouer les pièges des crédits d'action et de l'Outcome-Based Pricing"}

En 2026–2027, la compression du nombre de sièges humains (*per-seat*) a poussé les grands éditeurs SaaS B2B vers des modèles hybrides combinant **portefeuilles de crédits d'action prépayés** et **tarification au résultat (*Outcome-Based Pricing*)**. Lors des négociations contractuelles, quatre garde-fous s'imposent :

1. **Gratuité contractuelle des erreurs et vérifications d'idempotence** : Aucun crédit ne doit être débité lorsqu'un appel `A2A` ou `MCP` échoue (`HTTP 429`/`5xx`), renvoie un résultat vide ou rejoue une clé d'idempotence déjà exécutée.
2. **Définition bilatérale auditable de l'« Outcome »** : Exclure toute métrique complaisante comptabilisant un abandon client comme une résolution ; ancrer la facturation sur un statut transactionnel vérifié sans réouverture sous 72 heures.
3. **Zéro surtaxe IA sur l'accès aux données du client (*Zero AI-Tax on Data Access*)** : Garantir que l'interrogation des tables métiers du client via des serveurs `MCP` par des agents externes ne subisse pas un tarif dissuasif visant à imposer l'agent propriétaire de l'éditeur.
4. **Plafonds programmables sans majoration punitive** : Exiger des alertes API temps réel à 80 % et 95 % de l'enveloppe raccordées au moteur FinOps interne.

:::

---

## 23.3 Disjoncteurs budgétaires temps réel et quatre leviers d'optimisation structurelle

Pour rendre physiquement impossible toute récidive d'un emballement financier nocturne, la gouvernance descend dans le **plan de données synchrone** (`agentgateway`) via un **disjoncteur budgétaire progressif par saga**.

Chaque `ActionEnvelope` porte un plafond `maxTotalCostCad` proportionné à l'enjeu métier (p. ex. 1,20 \$ CAD pour une maintenance prédictive standard). À chaque traversée de la passerelle, un compteur atomique cumule la dépense de la saga et applique trois régimes gradués :

* **Zone nominale (`< 70 %` du plafond)** : Routage vers les modèles nominaux du manifeste `SemVer + Intent`.
* **Zone d'économie forcée (`70 % à 95 %`)** : Plutôt que de tuer brutalement une saga presque achevée, la passerelle bascule dynamiquement l'appel vers le **`SLM` de repli économique** et bride `max_reasoning_tokens` afin de conclure proprement la synthèse.
* **Zone de coupure franche (`≥ 100 %`)** : Rejet immédiat `FINOPS_BUDGET_EXHAUSTED`, déclenchant dans `Temporal` les compensations requises et la mise en file d'examen humain.

#### Extrait 23.2 — Middleware TypeScript de disjoncteur budgétaire progressif sur `agentgateway`

```typescript
export interface BudgetStateStore {
  incrementAndGetCost(sagaId: string, deltaCostCad: number, ttlSeconds: number): Promise<number>;
}

export interface GatewayRoutingDecision {
  readonly action: "ALLOW_NOMINAL" | "DOWNGRADE_TO_SLM" | "ABORT_BUDGET_EXCEEDED";
  readonly effectiveModel: string;
  readonly effectiveMaxReasoningTokens: number;
  readonly remainingBudgetCad: number;
}

export async function enforceSagaBudgetPolicy(
  sagaId: string,
  maxBudgetCad: number,
  requestedModel: string,
  fallbackSlmModel: string,
  requestedReasoningTokens: number,
  lastStepCostCad: number,
  store: BudgetStateStore
): Promise<GatewayRoutingDecision> {
  const consumedCad = await store.incrementAndGetCost(sagaId, lastStepCostCad, 86_400);
  const ratio = consumedCad / maxBudgetCad;
  const remaining = Math.max(0, maxBudgetCad - consumedCad);

  if (ratio >= 1.0) {
    return {
      action: "ABORT_BUDGET_EXCEEDED",
      effectiveModel: "none",
      effectiveMaxReasoningTokens: 0,
      remainingBudgetCad: 0,
    };
  }
  if (ratio >= 0.70) {
    return {
      action: "DOWNGRADE_TO_SLM",
      effectiveModel: fallbackSlmModel,
      effectiveMaxReasoningTokens: Math.min(requestedReasoningTokens, 256),
      remainingBudgetCad: remaining,
    };
  }
  return {
    action: "ALLOW_NOMINAL",
    effectiveModel: requestedModel,
    effectiveMaxReasoningTokens: requestedReasoningTokens,
    remainingBudgetCad: remaining,
  };
}
```

En complément de ce disjoncteur, quatre leviers d'architecture réduisent structurellement de 50 à 75 % le numérateur du `CPO` à constance \(\text{pass}^5\) égale :

1. **Affinité stricte du `KV-cache` de préfixe** : Les moteurs d'inférence accordent 75 à 90 % de remise sur les préfixes déjà en mémoire GPU, à condition de bannir tout horodatage ou `UUID` dynamique en tête de consigne système. Figer la constitution statique et les schémas d'outils triés en début de contexte, combiné à un routage par affinité d'agent, porte le taux de lecture cache au-delà de 80 %.
2. **Cascade asymétrique `SLM` \(\rightarrow\) `LLM` frontière** : Confier 75 % des étapes atomiques (triage, extraction JSON, formatage `MCP`) à des `SLM` de 7 à 14 milliards de paramètres affinés sur les traces d'or validées au Chapitre 22, pour un vingtième du coût d'un modèle frontière.
3. **Diète des schémas `MCP`** : Limiter chaque spécialiste à moins de douze outils cohérents plutôt que de recharger quarante définitions JSON verbeuses à chaque tour.
4. **Inférence par lot différé (*Batch API*) sur les régimes `T3`/`T4`** : Diviser par deux le tarif fournisseur sur les analyses documentaires dont l'échéance opérationnelle tolère quelques heures.

### Arbitrage économique : API infonuagiques managées vs grappes GPU internes (`SLM`)

Une question récurrente des comités d'investissement porte sur l'opportunité d'héberger soi-même ses modèles sur des serveurs accélérateurs dédiés plutôt que de consommer des API facturées au jeton. En 2027, la réponse FinOps n'est jamais monolithique : elle obéit à une **architecture d'écrêtage hybride (*Base-Load Internal SLM + Cloud Frontier Bursting*)**.

Pour les grands modèles frontières généralistes à obsolescence trimestrielle, l'auto-hébergement est presque toujours perdant hors contraintes régaliennes absolues : la sous-utilisation nocturne des grappes coûte plus cher que la marge de l'opérateur infonuagique. En revanche, dès qu'un ensemble de travailleurs et spécialistes `SLM` (7B à 32B paramètres servis via `vLLM` ou `SGLang` avec lots continus) génère un **taux d'occupation GPU soutenu supérieur à 48 % sur 24 heures** — facilement atteint en lissant les pointes diurnes par des tâches analytiques asynchrones `T3`/`T4` la nuit —, le coût marginal interne au million de jetons tombe 60 à 75 % sous les tarifs publics tout en garantissant une résidence locale stricte des données sensibles. La passerelle `agentgateway` absorbe alors le ruban de base sur la capacité réservée interne et ne déborde vers les API infonuagiques payantes à l'usage (*Cloud Bursting*) que lors des pics de charge inhabituels ou pour les 20 % de raisonnements frontières complexes.

::: {.encadre-sectoriel title="Industrie & Logistique à Faible Marge — Protéger la marge unitaire lors des tempêtes opérationnelles"}

Dans la distribution industrielle ou le transport, la marge nette d'une commande courante dépasse rarement 5 % (parfois moins de 8 \$ CAD). Lors d'un blizzard ou d'un blocage portuaire déclenchant simultanément la replanification de 12 000 expéditions, laisser chaque saga activer son raisonnement maximal absorberait toute la marge des commandes sauvées.

La règle FinOps industrielle indexe donc dynamiquement le plafond de l'enveloppe sur la marge contributive (`maxTotalCostCad = min(PlafondAbsolu, 0,08 * MargeCommande)`), traitant les flux courants par heuristiques `L0` + `SLM` sobres et réservant l'orchestration cognitive profonde aux équipements critiques sous pénalités SLA majeures.

:::

---

## 23.4 Refacturation interne (*Chargeback*) et rationalisation trimestrielle du portefeuille

Financer toute l'inférence sur le budget central des TI encourage la prolifération d'agents gadgets. Basculer d'une transparence informative (*Showback*) vers une **refacturation interne réelle (*Chargeback*)** aux centres de coûts métiers responsabilise immédiatement les divisions.

#### Extrait 23.3 — Politique déclarative de refacturation interne (*Chargeback*) multi-divisions

```yaml
apiVersion: finops.boreal.ca/v1
kind: InternalChargebackPolicy
metadata:
  fiscalYear: 2027
  currency: CAD
  billingCadence: monthly
spec:
  directVariableAttribution:
    correlationKey: "saga.id"
    passThroughAtActualCost:
      - "otel.gen_ai.inference_spend"
      - "otel.mcp.external_saas_credits"
  sharedPlatformAllocation:
    monthlyFixedPoolCad: 28500.00
    allocationFormula: "70% pro-rata sagas + 30% pro-rata jetons totaux"
  businessUnits:
    - divisionId: BEL
      costCenter: "CC-4100-LOG-MFG"
      monthlySoftAlertCad: 18000.00
      monthlyHardCapCad: 24000.00
      overCapBehavior: "restrict-l1-assistants-preserve-l3-production"
    - divisionId: BCA
      costCenter: "CC-2200-FIN-INS"
      monthlySoftAlertCad: 22000.00
      monthlyHardCapCad: 30000.00
      overCapBehavior: "require-vp-ciba-override"
    - divisionId: BSN
      costCenter: "CC-3300-SAAS-OPS"
      monthlySoftAlertCad: 32000.00
      monthlyHardCapCad: 42000.00
      overCapBehavior: "enforce-slm-tier-on-standard-tenants"
```

Chaque trimestre, le comité conjoint (`CTO`, `CFO`, métiers) arbitre le registre d'agents selon quatre décisions normatives :

| Profil observé sur 90 jours | Constance \(\text{pass}^5\) | `CPO` vs Référence (Humain / `L0`) | Décision obligatoire du comité de portefeuille |
|---|---|---|---|
| **1. Champion stratégique** | \(\ge 0,95\) | Gain net \(> 3\times\) et forte chute du délai de cycle | **Industrialiser & Étendre** : déploiement multi-pays et durcissement des contrats `MCP` |
| **2. Efficace mais dispendieux** | \(\ge 0,95\) | Valeur prouvée mais coût LLM élevé à grand volume | **Distiller (`LLM` \(\rightarrow\) `SLM`)** : affiner un `SLM` interne sur les traces d'or (-85 % de coût) |
| **3. Sur-ingénierie cognitive** | \(\ge 0,92\) | Arbre de décision fixe payé au tarif d'un agent `L3` | **Rétrograder en `L0` déterministe** : convertir en workflow `Temporal` / SQL pur |
| **4. Zombie ou Destructeur de marge** | \(< 0,85\) ou usage marginal | `CPO` complet supérieur au processus initial (`HOTL` inclus) | **Décommissionner sous 15 jours** : révoquer l'identité `NHI` et libérer le budget |

Convertir en simple code déterministe `L0` un agent dont les trajectoires se sont avérées totalement répétitives constitue non pas un désaveu, mais une victoire majeure d'ingénierie FinOps.

---

## 23.5 Application au fil rouge : gouvernance économique chez Groupe Boréal

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Zéro récidive de l'incident à 41 200 CAD et baisse de 61 % du coût par dossier"}

**Point de départ (Automne 2026)** :
Groupe Boréal dépensait **74 000 \$ CAD/mois** sur 47 initiatives disparates sans indicateur de valeur et venait de subir la boucle incontrôlée à **41 200 \$ CAD** un dimanche chez **BEL**. Le mandat exécutif exigeait **-55 %** de coût d'inférence par dossier traité.

**Transformation FinOps sur T1–T2 2027** :

1. **Bouclier par saga** : Activation universelle du disjoncteur `enforceSagaBudgetPolicy` sur `agentgateway`. Lors d'une panne dominicale réelle de la passerelle `EDI X12` d'un transporteur en février, 42 sagas logistiques basculent en `SLM` à **0,84 \$ CAD** puis se mettent proprement en pause à **1,20 \$ CAD** : facture totale de l'incident contenue à **50,40 \$ CAD** contre 41 200 \$ CAD quatre mois plus tôt.
2. **Cache et distillation `SLM`** : La normalisation des préfixes système hisse le taux de lecture `KV-cache` de 19 % à **84,6 %**, tandis que deux `SLM` de 14 milliards de paramètres hébergés chez **BSN** absorbent **76 % des appels d'inférence** du groupe sans dégrader le score \(\text{pass}^5\).
3. **Rationalisation du portefeuille** : La première revue `Chargeback` de mars 2027 conduit à **décommissionner 7 agents « zombies »** déficitaires, à **rétrograder 4 pseudo-agents en workflows déterministes `Temporal L0`** (coût divisé par 400), et à réallouer l'enveloppe dégagée vers l'extension européenne de la plateforme télématique.

**Bilan audité à fin T2 2027** :

* **Baisse du coût moyen d'inférence et d'orchestration par dossier validé** : **-61,4 %** (dépassant la cible exécutive de -55 % fixée dans le mandat annuel).
* ***Cost-per-Outcome* net du flux de maintenance prédictive** : abaissé de **0,38 \$ CAD** lors du pilote initial à **0,19 \$ CAD** tout compris (`HOTL` et échecs amortis), pour 3 400 \$ CAD de casse matérielle et de pénalités contractuelles évitées en moyenne par intervention.
* **Variance budgétaire mensuelle** : stabilisée sous **±3,5 %**, transformant l'intelligence artificielle d'un centre de coûts imprévisible en une ligne industrielle à marge unitaire gouvernée.

:::

---

## 23.6 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-023 — Pilotage FinOps par le Cost-per-Outcome, disjoncteurs par saga et refacturation interne"}

* **Statut** : Acceptée (Norme financière et technique d'entreprise)
* **Contexte** : L'autonomie multi-agents expose l'entreprise à une forte variance des coûts unitaires (boucles, *test-time compute*, crédits SaaS) que les plafonds mensuels globaux ne détectent qu'après sinistre, sans corrélation avec la valeur créée.
* **Options évaluées** :
  1. *Quotas mensuels globaux par clé d'API* : Paralyse toute une division en fin de mois lorsqu'un seul agent dérive. **Rejetée**.
  2. *Sélection systématique du modèle le moins cher au million de jetons* : Dégrade \(\text{pass}^5\), multiplie réessais et escalades `HOTL`, et renchérit paradoxalement le coût complet par résultat. **Rejetée**.
  3. *Gouvernance par le Cost-per-Outcome net (`CPO`), disjoncteur progressif par saga sur `agentgateway` et Chargeback trimestriel* : Protège chaque transaction en temps réel et aligne l'architecture sur la marge métier vérifiée. **Retenue**.
* **Décision** : Tout flux `L2`–`L4` doit définir un événement formel de résultat validé, imposer un plafond `maxTotalCostCad` dans son `ActionEnvelope` contrôlé par disjoncteur progressif, refacturer ses coûts complets (échecs et `HOTL` inclus) à sa division métier et subir un arbitrage trimestriel de portefeuille.
* **Conséquences** :
  * *Positives* : Risque d'emballement financier nul, élimination naturelle des cas d'usage sans ROI, autofinancement du socle par les gains unitaires prouvés.
  * *Négatives / Coûts assumés* : Instrumentation des événements de clôture métier dans les *Systems of Record* et mise à jour continue du barème multi-modèles.
* **Condition de révision** : Révision trimestrielle des barèmes fournisseurs et des seuils de distillation `SLM`.

:::

### Liste de contrôle de mise en production — Chapitre 23

1. **Événement métier joint** : Un événement transactionnel vérifiable alimente-t-il automatiquement le dénominateur net du *Cost-per-Outcome* (hors réouvertures sous 72 h) ?
2. **Amortissement intégral** : Le numérateur du `CPO` inclut-il honnêtement les sagas échouées, les compensations, les crédits d'outils tiers et le temps humain `HOTL` ?
3. **Disjoncteur progressif actif** : Chaque saga porte-t-elle un plafond `maxTotalCostCad` appliqué en ligne par `agentgateway` avec repli `SLM` à 70 % et arrêt propre à 100 % ?
4. **Affinité `KV-cache` vérifiée** : Les préfixes système sont-ils exempts de champs dynamiques afin de garantir plus de 75 % de lectures en cache ?
5. **Plafond de raisonnement borné** : Le paramètre `max_reasoning_tokens` est-il calibré par tâche plutôt que laissé sans limite ?
6. **Cascade `SLM` prioritaire** : Les tâches atomiques d'extraction et de triage sont-elles servies par des `SLM` qualifiés en \(\text{pass}^5\) ?
7. **Protection contre la double taxation SaaS** : Les connecteurs d'agents tiers excluent-ils le débit de crédits sur erreurs techniques et doublons d'idempotence ?
8. **Rattachement `Chargeback` et arbitrage** : Chaque agent possède-t-il un centre de coûts métier imputable et une revue trimestrielle planifiée ?
