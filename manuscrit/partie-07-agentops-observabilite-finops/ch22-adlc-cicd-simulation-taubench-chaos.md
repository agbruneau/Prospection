# Chapitre 22 — Cycle de vie ADLC, CI/CD probabiliste, simulation (τ-bench) et ingénierie du chaos

::: {.synthese-executive title="Synthèse exécutive — Chapitre 22"}

* **Enjeu stratégique** : Transposer les pipelines d'intégration continue du logiciel déterministe (`assert f(x) == y`) ou les bancs d'essai statiques à tour unique du `MLOps` expose un programme agentique à des régressions sévères en production. Un agent affichant 92 % de réussite sur des questions isolées échoue fréquemment une fois sur deux lors d'un dialogue réel de huit tours mêlant ambiguïté humaine, mutations d'état et lenteurs d'API.
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Adopter un cycle de vie agentique (**`ADLC`**) fondé sur un **registre d'agents immuable** versionné en **`SemVer + Intent`**, où toute modification de prompt, de paquet `Agent Skills`, de schéma `MCP`, de poids de modèle ou de politique `Cedar` produit un artefact formellement qualifié.
  2. *Structurante dès le jour 1* : Remplacer les métriques complaisantes (\(\text{pass}@k\) ou juges LLM superficiels) par des arènes multi-tours normalisées (**`OpenEnv`**, famille **\(\tau\)-bench**) vérifiant l'état final exact des bases simulées et exigeant une **constance opérationnelle \(\text{pass}^k\)** stricte (\(\text{pass}^5 \ge 0,95\) sur les parcours critiques).
  3. *Réversible par conception* : Le calibrage des paliers de déploiement progressif (*Shadow Mode*, *Canary* 5 % → 25 % → 100 %) et la composition des personas adversariels injectés dans la suite de chaos.
* **Indicateurs de gouvernance associés** : Score de constance \(\text{pass}^5\) par domaine critique, survie sans corruption d'état sous chaos protocolaire (`Chaos Survival Rate` = 100 %), temps de retour arrière automatisé (`Rollback Time` < 30 s) et conversion systématique des incidents réels en tests permanents.

:::

## 22.1 Du `SDLC` déterministe à l'`ADLC` : gouverner six vitesses de changement par `SemVer + Intent`

Dans le génie logiciel classique (`SDLC`), le comportement d'un service dépend exclusivement de son binaire compilé et de sa configuration déclarative. Le `MLOps` de première génération y a ajouté la dérive statistique des poids d'un modèle prédictif, mais l'évaluation restait confinée à une inférence atomique sans état ni effet de bord (`entrée X → score Y`).

Un système multi-agents d'entreprise opère dans un espace de mutation beaucoup plus large. Le comportement observable d'un spécialiste `L3` résulte de l'interaction de **six couches évoluant à des cadences distinctes** : le code d'orchestration, le point de contrôle exact du modèle (`LLM` ou `SLM`), la consigne système et les directives de dépôt (`AGENTS.md`), les compétences modulaires embarquées (`Agent Skills`), les schémas JSON des serveurs `MCP` distants invoqués, et les politiques déterministes `Cedar`/`OPA` bornant son enveloppe d'action.

L'erreur cardinale des déploiements immatures de 2025 consistait à éditer une consigne système à chaud en base le mardi, pendant qu'une équipe partenaire modifiait un schéma `MCP` le mercredi et qu'un fournisseur mettait à jour son modèle hébergé le jeudi — sans qu'aucun pipeline `CI/CD` ne revalide l'ensemble. Le cycle **`ADLC` (*Agentic Development Lifecycle*)** traite au contraire l'agent complet comme une **unité de livraison composite et immuable**, gouvernée par le versionnage **`SemVer + Intent`**.

![Pipeline CI/CD probabiliste du cycle de vie ADLC : du registre SemVer+Intent au déploiement Canary sous contrôle pass^5 et chaos.](manuscrit/figures/fig-22-adlc-cicd-taubench.svg)

Dans la notation `MAJEUR.MINEUR.CORRECTIF+intent.<empreinte>`, les trois segments numériques reflètent la compatibilité contractuelle de l'`Agent Card A2A v1.0`, tandis que le suffixe d'intention scelle cryptographiquement toutes les dépendances cognitives et protocolaires.

| Couche modifiée de l'artefact | Exemple concret de changement | Impact `SemVer + Intent` | Suites de qualification `CI/CD` obligatoires |
|---|---|---|---|
| **1. Contrat `A2A` externe** | Rupture sur `outputSchema` d'une compétence publiée | Incrément **MAJEUR** (`3.0.0`) | Contrats consommateurs, suite complète \(\tau\)-bench (\(\text{pass}^5\)), chaos complet, Canary long |
| **2. Modèle (`LLM` / `SLM`)** | Nouvelle révision de poids ou ajustement du budget de raisonnement | Incrément **MINEUR** + nouvel `intent` | Suite complète \(\tau\)-bench (\(\text{pass}^5\)), étalonnage coût/latence, *Shadow Mode* 24 h |
| **3. `Agent Skills` & schémas `MCP`** | Ajout d'un 9e outil `MCP` ou refonte d'un module `Agent Skill` | Incrément **MINEUR** (`2.5.0`) | Tests anti-*Tool Overload*, simulation multi-tours, chaos sur le nouvel outil |
| **4. Consigne système & `AGENTS.md`** | Clarification d'une règle de priorité documentaire | Incrément **CORRECTIF** + nouvel `intent` | Suite ciblée \(\tau\)-bench (\(\text{pass}^5\) cas d'or) + contrôle anti-injection |
| **5. Politiques `Cedar` / `OPA`** | Abaissement du seuil `HOTL` de 5 000 \$ CAD à 3 500 \$ CAD | Révision liée au manifeste | Preuve formelle déterministe (100 % cas limites) + simulation escalade `CIBA` |
| **6. Code d'infrastructure pur** | Optimisation du sérialiseur OTLP hors graphe et hors prompts | Incrément **CORRECTIF** (`2.4.2`) | Tests unitaires/intégration déterministes + test de fumée |

#### Extrait 22.1 — Manifeste normatif du Registre d'Agents d'Entreprise (`SemVer + Intent`)

Signé par le pipeline `CI` avant publication dans l'annuaire interne compatible `AGNTCY` / `OASF`, ce manifeste interdit tout écart entre l'arène de test et la production :

```yaml
apiVersion: agentops.boreal.ca/v1
kind: AgentReleaseManifest
metadata:
  agentId: boreal-bca-warranty-adjudicator
  version: "2.4.0+intent.9f3a81c"
  division: BCA
  autonomyLevel: L3
  regulatoryClassification:
    bsifE23MaterialityTier: Tier-2-High
    quebecLoi25AutomatedDecision: true
    ownerTeam: coe-garanties-bca@boreal.ca
spec:
  a2aCardDigest:
    "sha256:d0ad65640398d3fdab95fa3c7b6719e1fe574f9f0d94ef071c9d08d9a7770867"
  cognitivePinning:
    # Point de contrôle daté fixe (alias flottant interdit)
    primaryModel: "claude-sonnet-4-6-20261114"
    fallbackSlm: "oci://registry.boreal.ca/slm/qwen3-14b-warranty:3.1.0"
    fallbackSlmDigest:
      "sha256:2bcf2ed0dcfe35c6aca8780afe3d7e9940f39a341e79cff8d402c0f59ddf4b6a"
    temperature: 0.0
    maxReasoningTokens: 2048
    systemPromptDigest:
      "sha256:c8728ba34fbba31aa8a4cc64ad8626bd25dbb5316437f4c59f508c9f5df55c68"
  packagedSkills:
  - name: "as400-endorsement-clause-parser"
    version: "1.3.2"
    digest:
      "sha256:8cb8d13abb2adc37dd0d12b8085270d0fa24e20928ac7cadf30693346fdefdf8"
  pinnedMcpDependencies:
  - serverUri: "https://mcp.bca.internal.boreal.ca/as400-contracts"
    schemaVersion: "2027.02"
    allowedTools:
      - "get_master_lease_contract"
      - "list_active_warranty_endorsements"
      - "issue_provisional_coverage_token"
  policyBundle:
    engine: cedar
    bundleVersion: "bca-warranty-pdp-v4.8"
    digest:
      "sha256:a20a4166692c30cc694a9fe543e4a314eef7a05a4021efd3cb127415e300f95c"
  homologationGates:
    benchmarkSuite: "boreal-taubench-bca-warranty-v5"
    requiredPassPower5Critical: 0.95
    requiredPassPower5Global: 0.88
    requiredChaosSurvivalRate: 1.00
    maxP95CostPerOutcomeCad: 0.45
```

La directive `cognitivePinning` impose une règle cardinale : **aucun agent `L2` à `L4` ne peut référencer un alias flottant tel que `latest`** ; l'identifiant daté exact du modèle (ou le condensat `SHA-256` des poids d'un `SLM` interne) est figé dans le manifeste.

---

## 22.2 Simulation multi-tours (`OpenEnv` et famille \(\tau\)-bench) : pourquoi \(\text{pass}^k\) détrône \(\text{pass}@k\)

Évaluer un agent sur cinquante paires statiques « question / réponse » notées par similarité textuelle ou par un « LLM juge » indulgent crée un faux sentiment de sécurité. En exploitation réelle, un agent échoue rarement au premier tour : il trébuche au quatrième tour quand l'interlocuteur se ravise, au cinquième lorsqu'un retour d'outil `MCP` est ambigu, ou au sixième lorsqu'il oublie une restriction contractuelle lue au début de l'échange.

Deux standards complémentaires structurent désormais l'évaluation pré-déploiement en 2027 :

1. **Les environnements d'évaluation normalisés (`OpenEnv`, Linux Foundation `AAIF`)** : `OpenEnv` encapsule de façon reproductible un jumeau transactionnel léger doté d'un état initial de base de données (contrats, stocks, billets), de serveurs `MCP` simulés déterministes et de sondes d'invariants métiers.
2. **La famille des bancs d'essai interactifs \(\tau\)-bench, \(\tau^2\)-bench et \(\tau^3\)-bench** : Le harnais confronte l'agent à un **simulateur d'utilisateur ou de pair piloté par objectif**, capable de varier ses formulations et de distiller ses informations au fil du dialogue. Surtout, le verdict ne repose pas sur l'élégance du texte généré, mais sur l'**égalité déterministe entre l'état final de la base de données après la conversation et l'état cible unique dicté par les règles d'affaires**.

### L'impératif mathématique de la constance \(\text{pass}^k\)

L'apport décisif de \(\tau\)-bench à l'`AgentOps` tient au renversement de la métrique de succès. En synthèse de code assistée, la recherche utilisait volontiers **\(\text{pass}@k\)** : la probabilité qu'au moins **un** essai parmi \(k\) générations résolve le problème. Ce critère vaut lorsqu'un compilateur filtre gratuitement dix essais avant de n'en retenir qu'un.

En opérations d'entreprise autonomes, la contrainte est exactement inverse : l'agent n'a pas cinq essais face à un client ou devant un règlement financier ; **il doit réussir invariablement chacun des \(k\) dossiers analogues malgré la variabilité naturelle des dialogues**. C'est ce que quantifie **\(\text{pass}^k\)** (*pass-power-k*). Sur \(n\) exécutions indépendantes d'un scénario ayant produit \(c\) succès, les deux métriques divergent radicalement :

\[\text{pass}@k = 1 - \frac{\binom{n - c}{k}}{\binom{n}{k}}, \qquad \text{pass}^k = \frac{\binom{c}{k}}{\binom{n}{k}} \approx \left(\frac{c}{n}\right)^k\]

L'impact opérationnel est immédiat : un agent affichant une précision unitaire honorable de \(p = 0,80\) obtient un flatteur \(\text{pass}@5 = 1 - 0,20^5 = 99,97\,\%\), mais sa constance opérationnelle \(\text{pass}^5 = 0,80^5\) s'effondre à **32,77 %** — soit au moins une faute métier dans deux tiers des séries de cinq dossiers! Exiger \(\text{pass}^5 \ge 0,95\) sur les parcours critiques impose une fiabilité unitaire minimale de \(0,95^{1/5} \approx 98,98\,\%\), qui ne peut être atteinte qu'en déportant calculs et garde-fous dans des outils `MCP` déterministes et des règles `Cedar`. Sur le plan statistique, lorsque l'on exécute exactement \(n = k = 5\) trajectoires par scénario, l'estimateur combinatoire sans biais \(\binom{c}{5}/\binom{5}{5}\) est binaire (\(\{0, 1\}\)) à l'échelle d'un cas isolé : la porte de promotion évalue donc la moyenne \(\overline{\text{pass}^5}\) sur un corpus minimal de \(M \ge 100\) scénarios par domaine en vérifiant la borne inférieure de l'intervalle de confiance de Wilson à 95 %, tout en imposant zéro violation de politique sur chaque scénario critique.

### Étalonnage des simulateurs et prévention du biais d'auto-complaisance

Construire une arène `OpenEnv` crédible exige une hygiène méthodologique stricte sur le modèle qui anime l'utilisateur simulé et sur les éventuels évaluateurs sémantiques auxiliaires. Trois pièges méthodologiques faussent fréquemment les bancs d'essai internes mal conçus :

* **La collusion de famille de modèles (*Self-Preference & Blind-Spot Sharing*)** : Lorsque l'utilisateur simulé (ou un juge de conformité rédactionnelle) utilise exactement la même famille de poids que l'agent évalué, tous deux partagent des implicites syntaxiques et des angles morts corrélés, gonflant artificiellement le score \(\text{pass}^5\) de 6 à 11 points par rapport au trafic humain réel. La norme d'architecture impose donc une **hétérogénéité croisée** : l'agent testé fait face à des personas animés par une famille de modèles distincte et diversifiée.
* **La dérive vers des dialogues trop coopératifs** : Par défaut, les modèles alignés par apprentissage par renforcement produisent des utilisateurs simulés courtois, structurés et patients. Pour refléter la rugosité du terrain, la distribution des personas `OpenEnv` est stratifiée à partir des grappes observées dans les traces anonymisées (messages elliptiques de trois mots, fautes de frappe sur les références d'équipement, impatience explicite dès le quatrième tour).
* **La primauté absolue de l'assertion déterministe sur le juge sémantique** : Au moins 80 % de la décision de passage de porte repose sur l'inspection programmatique exacte de l'état final des tables simulées, des événements `Kafka` émis et des journaux `Cedar`. Les rubriques évaluées par modèle critique indépendant (20 % restants) se cantonnent aux propriétés non relationnelles : absence de divulgation d'instructions internes, clarté de l'explication fournie au client (`Loi 25`) et justesse du résumé transmis à un superviseur `HOTL`.

| Référentiel / Métrique | Topologie d'interaction simulée | Mode de vérification du verdict | Angle mort corrigé | Usage cible dans le pipeline `ADLC` |
|---|---|---|---|---|
| **Évaluation Tour unique** | Question isolée → Réponse statique | Similarité lexicale ou juge LLM | Aucun suivi d'état ni d'outil | Filtrage rapide des extracteurs `L0`/`L1` |
| **\(\tau\)-bench (Classique)** | Agent outillé (`MCP`) \(\leftrightarrow\) Utilisateur simulé ; seul l'agent mute la base | Assertion exacte sur l'état final de la base + politique | Détecte l'oubli de règles sur 5 à 15 tours | Porte `CI` standard de tout spécialiste `L2`/`L3` |
| **\(\tau^2\)-bench (*Dual-Control*)** | L'agent **et** l'utilisateur agissent simultanément sur l'état partagé | Convergence de l'état couplé (monde client + SI) | Débusque les conflits quand le client agit en parallèle | Dépannage technique interactif, support `IT/OT` |
| **\(\tau^3\)-bench / Arènes fédérées** | Graphe multi-agents `A2A` complet sous horizons longs et bruit | État distribué multi-domaines + budget/sécurité | Révèle les pannes en cascade (`ASI08`) inter-divisions | Homologation des sagas transversales `L3`/`L4` |
| **Seuil \(\text{pass}^5\) vs \(\text{pass}@1\)** | \(k=5\) trajectoires stochastiques par scénario (personas variés) | Exigence de 5/5 convergences sans violation | Écarte les agents « brillants mais erratiques » | Critère bloquant de mise en production |

::: {.encadre-sectoriel title="Service Client à Haut Volume (Télécoms, Commerce, SaaS) — Survivre au Dual-Control et à l'incohérence humaine"}

Dans un centre de contact traitant 80 000 interactions par jour, les agents échouent principalement parce que **l'interlocuteur humain modifie lui-même l'état du monde et change d'intention en cours de dialogue** — le paradigme exact de **\(\tau^2\)-bench**.

Pendant qu'un agent diagnostique une passerelle optique, l'abonné débranche un câble sans le mentionner, refuse une option au tour 4, exige la résiliation au tour 6, puis accepte un technicien au tour 9 en changeant d'adresse. La suite `OpenEnv` d'un service client à fort volume doit donc tester systématiquement quatre archétypes synthétiques :

1. **L'interlocuteur fragmentaire**, qui tait les informations clés tant que l'agent ne pose pas les questions de diagnostic.
2. **L'acteur *Dual-Control***, qui modifie un paramètre local ou un panier dans un autre canal, invalidant les lectures effectuées trois tours plus tôt.
3. **L'indécis contradictoire**, qui inverse sa demande après une pré-réservation — vérifiant que l'agent déclenche bien l'outil de compensation avant d'engager la nouvelle action.
4. **Le négociateur persuasif hors politique**, qui invoque une urgence émotionnelle crédible pour tenter d'obtenir un geste commercial dépassant le plafond `L3`.

:::

---

## 22.3 Ingénierie du chaos agentique : éprouver la résilience face au désordre réel

Franchir \(\text{pass}^5 \ge 0,95\) sur des serveurs simulés répondant en 40 millisecondes ne suffit pas. L'incident initial du Groupe Boréal (41 000 \$ CAD engloutis en onze heures un dimanche chez BEL sur une erreur `HTTP 429` mal gérée) démontre que **la sûreté industrielle d'un agent se juge à son comportement lorsque son environnement se dégrade**.

L'**ingénierie du chaos agentique** injecte dans le pipeline `CI/CD` cinq classes de perturbations reproductibles sur les flux `MCP` et `A2A` :

1. **Chaos de débit et de transport (`HTTP 429`, `503`, coupures SSE)** : Vérifier que l'agent respecte `Retry-After`, n'invente jamais une confirmation fictive lorsque l'outil échoue (*Hallucinated Tool Success*), et bascule proprement vers le repli ou la mise en veille.
2. **Chaos de latence asymétrique** : Injecter un délai de 14 secondes sur un serveur `MCP` patrimonial pour prouver que les clés d'idempotence bloquent toute double écriture en cas de relance d'activité `Temporal`.
3. **Chaos de dérive sémantique et de troncature** : Retourner un JSON valide mais partiel (`null` inattendu, devise non convertie) afin de vérifier que l'agent déclenche une escalade `HOTL` plutôt que d'inventer une valeur.
4. **Chaos de préconditions périmées** : Simuler l'épuisement de la dernière pièce entre lecture et réservation pour valider l'exécution exacte des compensations `Saga`.
5. **Chaos adversariel (`OWASP ASI01` / `ASI04`)** : Insérer dans les textes retournés par un outil documentaire une injection indirecte tentant de provoquer un appel d'outil non autorisé.

#### Extrait 22.2 — Harnais Python d'évaluation multi-tours `OpenEnv` calculant \(\text{pass}^5\) sous chaos `MCP`

```python
from dataclasses import dataclass
import math
import random
from typing import Callable, Dict, Sequence

@dataclass
class ScenarioSpec:
    scenario_id: str
    critical: bool
    initial_db_snapshot: Dict[str, object]
    expected_final_db_state: Dict[str, object]
    user_goal_prompt: str

class McpChaosProxy:
    """Proxy OpenEnv injectant des fautes protocolaires reproductibles par graine."""
    def __init__(self, real_router: Callable, seed: int, rate_429: float = 0.15) -> None:
        self._router = real_router
        self._rng = random.Random(seed)
        self._rate_429 = rate_429
        self.mutating_keys_seen: Dict[str, int] = {}

    async def call_tool(self, tool_name: str, args: Dict[str, object]) -> Dict[str, object]:
        idem_key = str(args.get("idempotencyKey", ""))
        if idem_key:
            self.mutating_keys_seen[idem_key] = self.mutating_keys_seen.get(idem_key, 0) + 1
        if self._rng.random() < self._rate_429:
            raise RuntimeError("HTTP_429_RATE_LIMITED: Retry-After=2")
        return await self._router(tool_name, args)

async def evaluate_suite_pass_power_k(
    suite: Sequence[ScenarioSpec],
    run_episode_fn: Callable,
    n_trials: int = 5,
    k: int = 5,
) -> Dict[str, object]:
    if n_trials < k:
        raise ValueError("n_trials doit être supérieur ou égal à k")
    crit_scores, all_scores, policy_violations = [], [], 0

    for scenario in suite:
        successes = 0
        for trial in range(n_trials):
            world_db = copy_deep_snapshot(scenario.initial_db_snapshot)
            chaos_proxy = McpChaosProxy(real_router=bind_db_tools(world_db), seed=1000 + trial)

            report = await run_episode_fn(
                goal=scenario.user_goal_prompt,
                persona_variant=trial,
                mcp_gateway=chaos_proxy,
                max_turns=12,
            )

            db_matches = (world_db == scenario.expected_final_db_state)
            safe_exec = (report.cedar_denials == 0 and not report.uncompensated_side_effects)
            if not safe_exec:
                policy_violations += 1
            if db_matches and safe_exec:
                successes += 1

        score_k = math.comb(successes, k) / math.comb(n_trials, k)
        all_scores.append(score_k)
        if scenario.critical:
            crit_scores.append(score_k)

    mean_crit = sum(crit_scores) / max(len(crit_scores), 1)
    mean_global = sum(all_scores) / max(len(all_scores), 1)
    return {
        "pass_power_k_critical": round(mean_crit, 4),
        "pass_power_k_global": round(mean_global, 4),
        "policy_violations": policy_violations,
        "gate_passed": (mean_crit >= 0.95 and mean_global >= 0.88 and policy_violations == 0),
    }
```

La moindre violation de politique `Cedar` ou un effet de bord non compensé (`policy_violations > 0`) bloque immédiatement la promotion du manifeste candidat, indépendamment du score moyen.

Un enseignement récurrent des campagnes de chaos concerne les **actions physiquement non compensables** : contrairement à une réservation de stock interne que l'on libère par une transaction inverse, un courriel juridique déjà expédié à un client externe ou un télégramme `EDI` transmis à un douanier ne se « dé-envoie » pas si la dernière étape de la saga échoue dix secondes plus tard. Lorsque le proxy de chaos provoque une panne tardive à l'étape finale d'une saga multi-divisions, le harnais vérifie que les connecteurs externes irréversibles respectent le patron de **boîte d'envoi différée (*Transactional Outbox Buffer*)** : l'outil `MCP` enregistre l'intention d'envoi en tampon mais n'émet physiquement la communication vers l'extérieur qu'après validation du *commit* complet de la saga par l'orchestrateur durable (ou expiration d'une fenêtre de rétractation `HOTL` de quatre-vingt-dix secondes).

::: {.encadre-sectoriel title="Secteur Financier (BSIF E-23 au 1er mai 2027) — Industrialiser la validation indépendante des modèles"}

Sous la ligne directrice **`BSIF E-23`**, la deuxième ligne de défense (gestion indépendante du risque de modèle) ne peut plus mettre six semaines à valider manuellement des agents mis à jour deux fois par mois.

Le couple `SemVer + Intent` + `OpenEnv` permet d'instituer une **homologation continue gouvernée** :

1. L'équipe indépendante des risques maintient son propre **référentiel scellé de scénarios \(\tau\)-bench et de chaos**, inaccessible en écriture aux équipes de développement afin d'exclure tout sur-ajustement aux tests.
2. Toute révision mineure demeurant dans l'enveloppe architecturale approuvée (`Cedar` intact, même niveau d'autonomie) qui franchit 100 % des portes \(\text{pass}^5\) et de survie au chaos sur ce banc scellé reçoit en vingt minutes un certificat d'homologation numérique archivé avec le manifeste, réservant les comités humains aux changements majeurs.

:::

---

## 22.4 Déploiement progressif : *Shadow Mode*, *Canary* épinglé par saga et boucle fermée

Même validée en simulation, une nouvelle version `SemVer + Intent` traverse deux filets progressifs en production orchestrés par `agentgateway` et `Temporal` :

1. **Le mode fantôme (*Shadow Mode* sans effet de bord)** : La passerelle duplique en asynchrone 10 à 20 % du trafic réel vers la version candidate. Tous les outils `MCP` de lecture interrogent les données réelles, mais **tous les outils `MCP` mutatifs sont interceptés par un bouchon sans écriture (*Dry-Run Sink*)**. Un comparateur mesure pendant 24 heures la concordance des décisions, la latence et l'écart de coût par rapport à la version active avant d'exposer le moindre client.
2. **Le déploiement *Canary* épinglé par saga (*Saga-Pinned Canary*)** : On ne change jamais la version d'un agent au milieu d'une conversation ou d'une saga multi-tours en cours. Le routeur oriente 5 % des *nouvelles* sagas vers le candidat et épingle cette version dans l'état durable de la saga jusqu'à sa clôture. Si un `SLO` `OpenTelemetry` dérive, le contrôleur rebascule en moins de 30 secondes 100 % des nouvelles sagas sur la version stable.

#### Extrait 22.3 — Politique déclarative de déploiement *Canary* et de retour en arrière automatique (*rollback*)

```yaml
apiVersion: agentops.boreal.ca/v1
kind: ProgressiveRolloutPolicy
metadata:
  targetAgent: boreal-bca-warranty-adjudicator
  candidateVersion: "2.4.0+intent.9f3a81c"
  baselineVersion: "2.3.4+intent.41b02e8"
spec:
  routingStrategy:
    stickinessKey: "saga.id"                  # Épinglage strict de version sur toute la vie de la saga
    shadowStage:
      enabled: true
      trafficMirrorPercent: 15
      duration: 24h
      mutatingMcpMode: "dry-run-intercept"
      minDecisionConcordance: 0.98
    canarySteps:
      - weightPercent: 5
        bakeDuration: 2h
        minCompletedSagas: 80
      - weightPercent: 25
        bakeDuration: 6h
        minCompletedSagas: 400
      - weightPercent: 100
        bakeDuration: 0h
  automatedRollbackTriggers:
    evaluationInterval: 30s
    conditions:
      - metric: "otel.gen_ai.livelock_abort_rate"
        operator: ">"
        threshold: 0.002                      # > 0,2 % de boucles sémantiques -> Rollback immédiat
      - metric: "otel.cedar.policy_denial_rate_delta"
        operator: ">"
        threshold: 0.005                      # Hausse > +0,5 pt de rejets Cedar
      - metric: "otel.hotl.escalation_rate_relative_increase"
        operator: ">"
        threshold: 0.35                       # Hausse relative > +35 % d'escalades HOTL
      - metric: "finops.p95_cost_per_saga_cad"
        operator: ">"
        threshold: 0.55
  postIncidentAutomation:
    exportFailedTracesToOpenEnvQueue: true    # Boucle fermée : trace d'échec -> futur test tau-bench
```

La directive finale referme la boucle avec le Chapitre 21 : chaque désaveu `HOTL` ou rollback Canary extrait automatiquement la trace anonymisée pour enrichir la suite permanente \(\tau\)-bench.

---

## 22.5 Application au fil rouge : le filet à 1 200 scénarios du Groupe Boréal

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Comment le critère pass^5 a bloqué une régression invisible au pass@1"}

**Dispositif industriel en place (Mars 2027)** :
Le Centre d'Excellence Agentique exploite une arène `OpenEnv` comptant **1 200 scénarios multi-tours** issus des dossiers historiques et traces anonymisées : 450 scénarios garantie/crédit-bail **BCA** (dont 120 critiques `BSIF E-23`), 400 scénarios logistiques **BEL** et 350 scénarios télématiques **BSN**. Chaque candidature exécute **6 000 conversations simulées** (\(k=5\)) en 14 minutes pour un coût de 38 \$ CAD grâce à des personas `SLM` calibrés.

**L'interception critique en pré-production (Semaine 11 de 2027)** :
Une équipe soumet la révision `2.5.0+intent.c092d1b` de l'*Agent Garantie BCA* adoptant une nouvelle révision de modèle 25 % moins coûteuse. Au premier essai (\(\text{pass}@1\)), le score global semble progresser à **93,8 %** (contre 93,1 % en production).

Pourtant, **le pipeline `ADLC` bloque net la promotion à l'étape Chaos + \(\tau\)-bench** :

* Sur le segment critique des *« Compresseurs opérés hors plage thermique avec avenant nordique »*, la constance **\(\text{pass}^5\) plonge de 96,4 % à 68,2 %** dès que le proxy de chaos injecte 6 secondes de latence ou un `HTTP 429` sur le serveur `MCP` télématique.
* L'analyse révèle que le nouveau modèle, cherchant à abréger sa chaîne d'actions face à un outil lent, présumait une fois sur douze que l'absence de relevé valait conformité et pré-autorisait indûment 4 200 \$ CAD sur des contrats exclus.

**Correction structurelle et bilan (T2 2027)** :
En déplaçant la vérification de présence du relevé télématique hors de l'invite vers une règle déterministe `Cedar` bloquante, la version `2.5.1+intent.f441a9e` remonte à **\(\text{pass}^5 = 98,1\,\%\)** et **100 % de survie au chaos**, puis valide 24 heures de *Shadow Mode* à 99,4 % de concordance. Cet incident de pré-production est archivé comme cas d'école interne illustrant pourquoi une métrique moyenne à essai unique masque les queues de distribution dangereuses. Sur l'ensemble du semestre, Groupe Boréal cadence **18 mises en production hebdomadaires** avec **0 incident P1**, et obtient le quitus d'audit `BSIF E-23` trois semaines avant l'échéance légale du 1er mai 2027.

:::

---

## 22.6 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-022 — Cycle ADLC gouverné par SemVer+Intent, portes de constance pass^5 et déploiement Canary"}

* **Statut** : Acceptée | **Périmètre** : Qualité ADLC & CI/CD (`L2`–`L4`) | **Révision** : Semestrielle
* **Contexte** : Les modifications non coordonnées de prompts, modèles ou schémas `MCP` ainsi que les tests superficiels à tour unique exposent l'entreprise à des régressions silencieuses lors de dialogues multi-tours soumis aux aléas réseau et humains.
* **Options évaluées** :
  1. *Édition des prompts à chaud hors pipeline CI/CD* : Traçabilité nulle et non-conformité frontale à `BSIF E-23` et `ISO/IEC 42001`. **Rejetée**.
  2. *Tests unitaires classiques complétés par 50 questions statiques en \(\text{pass}@1\)* : Aveugle à l'inconstance stochastique, aux dérives multi-tours et aux pannes sous `HTTP 429`. **Rejetée**.
  3. *Pipeline `ADLC` sur registre immuable `SemVer+Intent`, simulation d'état `OpenEnv` / \(\tau\)-bench en \(\text{pass}^5\), chaos protocolaire et déploiement Shadow/Canary* : Concilie vélocité hebdomadaire et sûreté démontrable. **Retenue**.
* **Décision** : Toute livraison `L2`–`L4` requiert un manifeste signé `SemVer + Intent` figeant modèles, prompts, `Agent Skills`, contrats `MCP` et politiques `Cedar`. La promotion exige \(\text{pass}^5 \ge 0,95\) sur le corpus critique, 100 % de survie au chaos, un *Shadow Mode* sans mutation pour tout changement de modèle et un *Canary* épinglé par `saga.id` à rollback automatisé.
* **Conséquences** :
  * *Positives* : Suppression des régressions furtives de modèles, capitalisation d'un patrimoine de tests métiers reproductibles, homologation réglementaire fluide.
  * *Négatives / Coûts assumés* : Budget de calcul des simulations multi-tours en `CI` et maintenance des bouchons d'état `OpenEnv`.
* **Condition de révision** : Révision annuelle des seuils \(\text{pass}^k\) selon la criticité métier.

:::

### Liste de contrôle de mise en production — Chapitre 22

1. **Épinglage `SemVer + Intent` complet** : Le manifeste fige-t-il l'identifiant daté du modèle (zéro alias `latest`), les condensats `SHA-256` des prompts et `Agent Skills`, les schémas `MCP` et le paquet `Cedar` ?
2. **Assertion sur l'état final** : La suite `OpenEnv` / \(\tau\)-bench valide-t-elle l'état exact des tables simulées plutôt que la seule apparence textuelle de la réponse ?
3. **Porte bloquante \(\text{pass}^5\)** : Chaque scénario critique réussit-il de façon constante sur cinq trajectoires stochastiques distinctes (\(\text{pass}^5 \ge 0,95\)) ?
4. **Personas *Dual-Control* et contradictoires** : La simulation éprouve-t-elle les revirements d'intention et les actions concurrentes de l'utilisateur (\(\tau^2\)-bench) ?
5. **Résilience au chaos protocolaire et sécuritaire** : L'agent maintient-il l'idempotence, la compensation `Saga` et le refus d'halluciner sous `HTTP 429`/`503`, latence extrême et injections indirectes ?
6. **Étanchéité du *Shadow Mode*** : En mode fantôme sur trafic réel, 100 % des appels `MCP` mutatifs sont-ils bloqués par un intercepteur sans écriture en production ?
7. **Affinité de version par saga en *Canary*** : Une saga démarrée sur une révision conserve-t-elle cette même révision jusqu'à sa clôture ?
8. **Conversion automatique d'incident en test** : Chaque rollback Canary ou désaveu `HOTL` alimente-t-il systématiquement le corpus permanent de non-régression ?
