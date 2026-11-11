# Chapitre 20 — Défense en profondeur : Sandboxing, garde-fous neuro-symboliques et coupe-circuits

::: {.synthese-executive title="Synthèse exécutive — Chapitre 20"}

* **Enjeu d'affaires et de risque** : Même doté d'une identité `NHI` irréprochable (Chapitre 18) et de schémas `MCP` épinglés (Chapitre 19), un modèle de langage demeure un moteur probabiliste faillible susceptible d'être trompé par une entrée inédite ou d'halluciner un paramètre destructeur. Toute architecture qui confie le dernier mot sécuritaire à une consigne dans le prompt système ou qui exécute du code généré par un agent dans un simple conteneur partagé s'expose à une compromission d'infrastructure (`ASI05`) ou à une dérive financière incontrôlée (`ASI08`/`ASI10`).
* **Décisions architecturales structurantes** :
  1. *Irréversible et non négociable* : Externaliser 100 % des invariants métiers et sécuritaires hors du modèle cognitif vers un **point de décision de politique déterministe (`PDP`)** basé sur **`Cedar`** ou **`OPA` (`Rego`)**, évalué en coupure obligatoire sur la passerelle `agentgateway` (`PEP`).
  2. *Structurante pour l'exécution de code et l'usage d'ordinateur (`CUA`)* : Bannir l'exécution sur noyau hôte partagé au profit de bacs à sable matériels éphémères (**microVMs `Firecracker`** ou modules **`WASI`**) orchestrés via le protocole standardisé **`OpenSandbox`** de la Linux Foundation `AAIF`, sans aucune sortie réseau par défaut.
  3. *Opérationnelle dès la mise en service* : Relier toute la flotte à un **coupe-circuit (`Kill Switch`) SOC multi-nuages** testé trimestriellement, capable de révoquer les identités, figer les sagas durables et détruire les bacs à sable actifs en moins de deux secondes.
* **Indicateurs de gouvernance associés** : Taux de couverture des outils mutatifs par règles formelles `Cedar`/`OPA` vérifiées par solveur SMT (cible : 100 %), latence d'évaluation `PDP` au 99e centile (\(< 2\text{ ms}\)), pourcentage de bacs à sable en politique `Default-Deny Egress` (100 %), et temps d'arrêt effectif mesuré en exercice *GameDay* (`MTTR-Stop` \(< 2,0\text{ s}\)).

:::

## 20.1 Isolation d'exécution : microVMs (`Firecracker`), `OpenSandbox` (`AAIF`) et bacs à sable WebAssembly (`WASI`)

Le principe directeur de ce vingtième chapitre tient en une maxime d'ingénierie cyber : **présumer la compromission cognitive du modèle (*Assume Cognitive Breach*)**. Lorsqu'un agent d'analyse financière écrit et exécute à la volée un script Python sur une feuille de calcul envoyée par un tiers, lorsqu'un agent d'ingénierie compile un correctif sur un dépôt code, ou lorsqu'un *Computer-Use Agent* (`CUA`) pilote un navigateur complet pour interagir avec un portail externe dépourvu d'API, vous exécutez par définition du **code non fiable généré dynamiquement sous l'influence d'entrées potentiellement hostiles (`OWASP ASI05`)**.

### Pourquoi le conteneur Linux standard (`Docker` / `runc`) ne suffit pas face à `ASI05`

Une erreur d'architecture encore très répandue consiste à croire qu'encapsuler l'interpréteur Python ou le navigateur de l'agent dans un conteneur Kubernetes ordinaire constitue un bac à sable suffisant. C'est méconnaître l'anatomie d'un conteneur OCI standard : les espaces de noms Linux (`namespaces`) et les groupes de contrôle (`cgroups`) restreignent la visibilité mais **partagent directement le même noyau Linux hôte** (plus de 30 millions de lignes de code C exposant plus de 300 appels système `syscalls`) avec tous les autres pods placés sur le même nœud de calcul.

Face à un attaquant qui pilote la génération de code de l'agent pour exploiter une vulnérabilité noyau fraîchement découverte (*kernel privilege escalation*), épuiser des descripteurs internes ou sonder le réseau local du cluster, la paroi d'un conteneur `runc` ordinaire cède régulièrement. En 2027, l'industrie segmente donc rigoureusement l'isolation d'exécution selon quatre primitives complémentaires fédérées par une couche protocolaire ouverte.

### Les quatre primitives d'isolation et le standard fédérateur `OpenSandbox` (`AAIF`)

1. **Noyaux d'espace utilisateur (`gVisor` / `runsc`)** : `gVisor` intercepte les appels système de l'application invitée dans un noyau de sécurité écrit en Go en espace utilisateur (*Sentry*), ne laissant passer vers le noyau hôte réel qu'une fraction restreinte de primitives. C'est un excellent compromis pour durcir des serveurs `MCP` existants sans pénalité mémoire lourde, au prix d'un surcoût sur les entrées/sorties disque intensives.
2. **Micro-machines virtuelles matérielles (`Firecracker` / `Cloud Hypervisor` sur `KVM`)** : Développé initialement pour l'informatique sans serveur multi-locataire hostile, `Firecracker` érige une **frontière de virtualisation matérielle complète (`Intel VT-x` / `AMD-V` / `ARM Virtualization Extensions`)** avec un moniteur de machine virtuelle minimaliste écrit en Rust (~50 000 lignes de code, sans émulation de périphériques patrimoniaux superflus). Chaque session d'exécution d'agent dispose de son propre noyau Linux invité dédié. Grâce à la restauration différentielle d'instantanés mémoire (*snapshot restore* avec chargement paresseux `uffd`), une microVM Python préchauffée comportant `pandas`, `polars` et `scipy` déjà chargés en RAM démarre en **8 à 15 millisecondes** — rendant l'isolation matérielle compatible avec le régime interactif !
3. **Bacs à sable à capacités WebAssembly (`WASI 0.2+` Component Model)** : Lorsqu'il s'agit d'exécuter un connecteur de transformation déterministe, un parseur documentaire ou un outil `MCP` léger ne nécessitant pas un système d'exploitation POSIX complet, `WebAssembly` offre une sécurité mathématique par construction : mémoire linéaire bornée, absence totale d'appels système implicites, et modèle de sécurité par **capacités explicites** (un module `WASI` ne voit ni l'horloge, ni le système de fichiers, ni une prise réseau à moins que l'hôte ne lui injecte explicitement la poignée correspondante), avec un démarrage inférieur à la milliseconde et une empreinte de quelques mégaoctets.
4. **La couche d'abstraction ouverte `OpenSandbox` (Linux Foundation `AAIF`)** : Versé à l'*Agentic AI Foundation* aux côtés de `MCP` et `A2A`, **`OpenSandbox`** résout le verrouillage fournisseur des environnements d'exécution d'agents en normalisant un *Sandbox Protocol* (API de cycle de vie `create`/`pause`/`snapshot`/`destroy` et API d'exécution de commandes et fichiers). Une équipe code son agent une seule fois contre le SDK `OpenSandbox` : le flux tourne sur conteneur local en développement et bascule sans modification sur un pool haute densité de microVMs `Firecracker` sur Kubernetes en production.

Surtout, `OpenSandbox` industrialise deux contrôles décisifs contre l'exfiltration de données : le **verrouillage réseau sortant par défaut (`Default-Deny Egress`)** et le **mandataire externe de justificatifs (*Credential Vault Proxy*)**. Plutôt que d'injecter un jeton OAuth ou une clé API dans une variable d'environnement à l'intérieur de la microVM (où le code généré par l'agent pourrait le lire par `os.environ` et l'exfiltrer stéganographiquement), la microVM ne possède aucune interface réseau routable ; elle communique uniquement par canal `vsock` avec un mandataire hôte qui inspecte la destination contre une liste blanche stricte et greffe l'en-tête `Authorization` *à l'extérieur* de la frontière de virtualisation.

| Dimension d'ingénierie | Conteneur OCI standard (`runc`) | Noyau utilisateur (`gVisor`) | MicroVM matérielle (`Firecracker`) | Composant `WebAssembly` (`WASI 0.2`) | **`OpenSandbox` (`AAIF` sur `Firecracker`)** |
|---|---|---|---|---|---|
| **Frontière de sécurité** | Noyau hôte partagé (`namespaces`/`seccomp`) | Interception `syscalls` en espace utilisateur | **Virtualisation CPU matérielle (`KVM`)** | **Mémoire linéaire & capacités `Wasm`** | **Matérielle `KVM` + `Vault Proxy` hors VM** |
| **Démarrage (froid / snapshot)** | 150 – 400 ms | 200 – 500 ms | 125 ms froid / **< 15 ms snapshot** | **0,2 – 2 ms** | **10 – 18 ms (pool préchauffé)** |
| **Surcoût mémoire par instance** | ~15 Mo | ~35 – 60 Mo | ~25 – 45 Mo (avec déduplication) | **1 – 5 Mo** | ~30 Mo actif / **0 Mo mis sur disque** |
| **Compatibilité écosystème** | 100 % Linux natif | ~97 % Linux (hors ioctl bas niveau) | **100 % Linux, binaires C/Python, CUA** | Langages compilables vers `wasm32-wasip2` | **100 % Linux + API unifiée multi-SDK** |
| **Protection secrets & egress** | Configuration CNI manuelle fragile | Configuration CNI externe | Réseau TAP à configurer soi-même | Aucune capacité réseau par défaut | **Natif : `Egress Deny` + injection externe** |
| **Cas d'usage nominal 2027** | Orchestrateurs internes déterministes | Serveurs `MCP` métiers internes | Exécution code Python/Bash arbitraire | Parseurs, validateurs et plugins ultra-rapides | **Standard d'entreprise pour code IA & `CUA`** |

#### Extrait 20.1 — Profil déclaratif `OpenSandbox` sans egress réseau et mandataire de secrets hors VM

```yaml
apiVersion: sandbox.aaif.org/v1
kind: SandboxTemplate
metadata:
  name: boreal-python-analyst-isolated
  namespace: boreal-agent-sandboxes
spec:
  runtimeClass: "firecracker-kvm-snapshot"
  baseSnapshotId: "snap-py312-polars-202702-signed"
  lifecycle:
    maxWallClockSeconds: 180
    idleSuspendAfterSeconds: 30
    destroyAndScrubMemoryOnExit: true
  resources:
    vcpuCount: 2
    memoryMiB: 512
    maxPids: 64
    ephemeralScratchMiB: 256
  filesystem:
    rootReadOnly: true
    writablePaths: ["/tmp/work"]
    blockHostMounts: true
  networkPolicy:
    ingress: "NONE"
    defaultEgress: "DENY_ALL"
    blockCloudMetadataIp: true          # Bloque matériellement 169.254.169.254 / fd00:ec2::254
    allowedVsockProxyRoutes:
      - name: "internal-snowflake-readonly-gateway"
        destinationHost: "agentgateway.internal.boreal.ca"
        destinationPort: 443
        allowedPathPrefix: "/mcp/bca-snowflake-analytics/"
        credentialInjection:
          mode: "HOST_SIDE_PROXY_INJECT" # Le secret n'entre jamais dans la RAM de la microVM
          tokenExchangeAudience: "mcp://gateway.boreal.ca/mcp/bca-snowflake-analytics"
          maxRequestsPerSession: 12
```

---

## 20.2 Évaluation continue PDP/PEP hors du LLM via OPA (`Rego`), `Cedar` et raisonnement automatisé

Si `OpenSandbox` confine *où et comment* s'exécute le code, encore faut-il décider avec une rigueur mathématique *quels appels d'outils `MCP` ou délégations `A2A`* l'agent a le droit d'émettre. L'enseignement le plus coûteux des incidents de 2024–2025 est sans appel : **on ne sécurise jamais un système probabiliste uniquement avec un second système probabiliste**.

Placer un « LLM juge » (*LLM Guardrail*) devant un agent principal réduit certes le bruit statistique, mais laisse subsister une probabilité jointe d'échec strictement positive face à une entrée adversariale soigneusement construite. Pour tout invariant d'affaires, réglementaire ou sécuritaire — un plafond d'engagement en dollars, une interdiction d'écriture à partir d'une session teintée par un document externe, une règle de séparation des tâches ou une restriction horaire —, la vérification doit être exécutée par un **moteur symbolique déterministe placé physiquement hors de portée du modèle de langage**.

![Architecture de défense en profondeur : garde-fous neuro-symboliques PEP/PDP hors du LLM, confinement OpenSandbox et coupe-circuit SOC.](manuscrit/figures/fig-20-defense-profondeur-pdp.svg)

### Architecture neuro-symbolique `PEP` / `PDP` en coupure obligatoire

Comme l'illustre la figure ci-dessus, l'architecture sépare le raisonnement neuronal (qui propose une intention d'action) et le contrôle symbolique (qui statue sur son admissibilité) :

1. **Le *Policy Enforcement Point* (`PEP` — `agentgateway`)** intercepte 100 % des requêtes JSON-RPC `MCP` (`tools/call`) et des messages `A2A` (`tasks/send`). Aucun serveur `MCP` d'entreprise n'accepte de trafic réseau direct contournant la passerelle (verrouillage `mTLS` mutuel). Le `PEP` valide le jeton `RFC 8693`, extrait le sujet humain (`sub`), l'agent immédiat (`act.sub`), l'étiquette de teinte de la session (`sessionTaint`) et désérialise les arguments typés de l'outil demandé.
2. **Le *Policy Decision Point* (`PDP` — `Cedar` ou `OPA`)** évalue en mémoire locale (bibliothèque embarquée en Rust/Go dans le `PEP` ou démon *sidecar* Unix) cette requête d'autorisation contre le référentiel de politiques signées de l'entreprise, en moins de **0,4 à 1,5 milliseconde**. Il retourne l'un des trois verdicts normatifs : `ALLOW` (transmission immédiate au serveur `MCP`), `DENY` (rejet sec avec trace d'audit SIEM) ou `STEP_UP_CIBA` (déclenchement automatique du flux d'approbation humaine hors bande décrit au Chapitre 18).

### Arbitrer entre `Open Policy Agent (Rego)` et `Cedar` : l'avantage décisif du raisonnement automatisé

Les deux moteurs ouverts dominants en 2027 possèdent chacun leur domaine d'excellence :

* **`OPA` (`Rego`)**, projet gradué de la CNCF dérivé de Datalog, brille par son expressivité universelle sur des documents JSON arbitrairement imbriqués : il demeure la référence pour valider des manifestes d'infrastructure Kubernetes, des configurations de déploiement CI/CD ou des graphes complexes de routage réseau.
* **`Cedar`** (langage de politiques ouvert conçu autour de la vérification formelle et adopté massivement pour la gouvernance des agents) apporte trois propriétés cruciales pour les systèmes d'autorisation transactionnels :
  1. **Terminaison bornée et performance sub-milliseconde** : `Cedar` interdit délibérément les boucles non bornées et la récursion générale, garantissant un temps d'évaluation prévisible en microsecondes.
  2. **Priorité inconditionnelle du refus (`forbid` overrides `permit`)** : Par défaut tout est interdit ; une action n'est autorisée que s'il existe au moins une clause `permit` applicable **et aucune clause `forbid` satisfaite**. Une équipe de sécurité centrale peut ainsi poser cinq règles `forbid` cardinales qu'aucune politique locale `permit` écrite par une division métier ne pourra jamais affaiblir par inadvertance.
  3. **Vérification mathématique par solveurs SMT (*Automated Reasoning*)** : Parce que la sémantique de `Cedar` se traduit intégralement en formules logiques décidables (logique du premier ordre sans quantificateurs sur théories SMT), le pipeline CI/CD peut prouver mathématiquement avant chaque mise en production — pour toute requête candidate \(q = (p, a, r, c)\) parmi l'infinité des entrées possibles — qu'une politique révisée \(P'\) respecte l'invariant de sécurité \(\text{Inv}(q)\) :

\[\forall q,\; \text{Cedar}(P', q) = 1 \implies \text{Inv}(q) = 1\]

#### Extrait 20.2 — Politique déterministe `Cedar` gouvernant les outils `MCP` financiers et logistiques

```cedar
// Politique d'entreprise Boréal — Gouvernance déterministe des appels d'outils MCP
// Évaluée par agentgateway avant toute invocation réseau du serveur MCP cible.

// 1. AUTORISATION NOMINALE L3 : Pré-autorisation de garantie par l'agent spécialiste BCA
permit (
  principal is Boreal::AgentIdentity,
  action == Boreal::McpTool::"bca_guidewire__preauthorize_warranty_claim",
  resource is Boreal::WarrantyContract
)
when {
  principal.blueprintId == "bp-bca-warranty-tier2" &&
  principal.attestationValid == true &&
  resource.division == "BCA" &&
  context.hasValidOboToken == true &&
  context.toolArgs.amountCad <= 5000 &&
  context.remainingSagaHops >= 1
};

// 2. AUTORISATION AVEC ESCALADE CIBA VALIDÉE : Dossiers dépassant le plafond autonome L3
permit (
  principal is Boreal::AgentIdentity,
  action == Boreal::McpTool::"bca_guidewire__preauthorize_warranty_claim",
  resource is Boreal::WarrantyContract
)
when {
  principal.blueprintId == "bp-bca-warranty-tier2" &&
  context.toolArgs.amountCad > 5000 &&
  context.toolArgs.amountCad <= 50000 &&
  context.cibaApprovalPresent == true &&
  context.cibaVerifiedTxHash == context.computedArgsHash
};

// 3. GARDE-FOU INCONDITIONNEL (FORBID #1) : Séparation des tâches (Cryptographic SoD)
// Aucun approbateur CIBA ni parrain d'agent ne peut autoriser un dossier qu'il a lui-même initié.
forbid (
  principal,
  action == Boreal::McpTool::"bca_guidewire__preauthorize_warranty_claim",
  resource
)
when {
  context.cibaApprovalPresent == true &&
  context.cibaApproverSub == context.initiatingHumanSub
};

// 4. GARDE-FOU INCONDITIONNEL (FORBID #2) : Confinement du suivi de teinte (Anti-ASI01 / ASI06)
// Une session ayant lu directement un contenu externe non décontaminé ne peut muter un tiers payé.
forbid (
  principal,
  action in [
    Boreal::McpTool::"bel_sap_ap__update_vendor_bank_account",
    Boreal::McpTool::"bel_sap_mm__override_delivery_address"
  ],
  resource
)
when {
  context.sessionTaint == "UNTRUSTED_EXTERNAL"
};

// 5. GARDE-FOU INCONDITIONNEL (FORBID #3) : Coupe-feu budgétaire et gel d'urgence SOC
forbid (principal, action, resource)
when {
  principal.killSwitchQuarantined == true ||
  context.sagaConsumedCostCad >= context.sagaMaxBudgetCad
};
```

Observez la puissance de la règle `FORBID #2` : même si un attaquant découvre demain matin une technique d'injection de prompt inédite qui contourne à 100 % la vigilance cognitive du LLM frontière, l'appel à `update_vendor_bank_account` se fracasse sur une évaluation booléenne déterministe `context.sessionTaint == "UNTRUSTED_EXTERNAL"` que le modèle n'a aucun moyen d'altérer.

---

## 20.3 Coupe-circuits (`Kill Switches`) SOC multi-nuages et révocation instantanée d'états et de jetons

La dernière ligne de défense en profondeur répond à la question que tout conseil d'administration et tout régulateur (`BSIF`, `EU AI Act` Article 14 sur le contrôle humain effectif) pose légitimement au CISO : *« Si une flotte d'agents entre en boucle divergente ou subit une compromission coordonnée un dimanche soir sur deux nuages distincts, en combien de secondes votre centre d'opérations de sécurité (`SOC`) peut-il l'arrêter net sans corrompre la comptabilité en cours ? »*

### Pourquoi la simple désactivation dans l'annuaire IAM échoue en cas d'urgence

Dans une architecture distribuée moderne, cocher « Désactiver le compte » dans l'annuaire d'identité souffre d'une inertie dangereuse de **cinq à soixante minutes** :

* Les jetons d'accès JWT déjà émis continuent d'être acceptés localement tant que leur `exp` n'est pas atteinte si les passerelles ne reçoivent pas de flux de révocation actif ;
* Les workflows durables en cours d'exécution dans `Temporal` ou `Restate` conservent leurs files de tâches actives et tentent frénétiquement des réessais automatiques ;
* Les bacs à sable `OpenSandbox` déjà démarrés poursuivent leurs calculs en mémoire vive.

Par ailleurs, un interrupteur unique « tout ou rien » qui couperait l'intégralité de l'IA de l'entreprise au moindre incident localisé paralyserait inutilement le support client et la logistique saine. Un **coupe-circuit (`Kill Switch`) industriel** s'articule donc en **quatre paliers gradués**, pilotés par le protocole standardisé de signalisation d'événements de sécurité en temps réel **`OpenID Shared Signals Framework` (`SSF` / `CAEP` — *Continuous Access Evaluation Profile*)**.

| Palier de coupe-circuit | Déclencheurs automatiques ou SOC | Actions atomiques coordonnées (Passerelle, STS, Runtime, Sandbox) | `MTTR-Stop` cible | Protocole de reprise contrôlée |
|---|---|---|---|---|
| **Palier 1 — Chirurgical (Saga unitaire)** | Dépassement budget/sauts d'une saga, boucle locale détectée (`ASI08`) | Invalidation du `sagaId` en cache `agentgateway`, signal `pause` sur le workflow `Temporal`, destruction du `Sandbox` associé. | **< 500 ms** | Inspection de l'historique d'événements par l'équipe AgentOps ; compensation Saga ou reprise corrigée. |
| **Palier 2 — Connecteur (Outil / Serveur `MCP`)** | Alerte *Rug-Pull* (`SHA-256`), erreurs `5xx` massives ou anomalie d'exfiltration sur un outil | Fermeture du disjoncteur sur la route `MCP` dans `agentgateway` ; mise en attente durable des sagas dépendantes sans perte d'état. | **< 1,0 s** | Revalidation `Sigstore` du serveur `MCP`, rotation des identifiants aval, réouverture progressive (*canary*). |
| **Palier 3 — Classe d'agent (*Blueprint*)** | Comportement déviant systémique (`ASI10`), vulnérabilité sur un prompt/modèle précis | Diffusion `CAEP` révoquant tous les jetons où `act.blueprint_id == X` ; retrait du `ClusterSPIFFEID` dans `SPIRE` ; gel forensique des sagas actives. | **< 2,0 s** | Rétrogradation vers la version N-1 signée du *Blueprint*, campagne Red Team de non-régression, approbation CISO. |
| **Palier 4 — Domaine / Régional (*Defcon*)** | Incident cyber majeur multi-systèmes ou compromission d'un cluster régional | Bascule globale de `agentgateway` en mode **Lecture Seule (`L1`)** ou coupure franche ; arrêt de tous les pools `OpenSandbox` de la zone. | **< 2,0 s** | Activation du plan de continuité métier manuel/déterministe ; audit forensique complet avant réarmement par paliers. |

Un détail d'ingénierie distingue une architecture mature d'un bricolage destructeur : sur les moteurs durables (`Temporal` / `Restate`), le coupe-circuit de Palier 3 exécute par défaut un **gel forensique (`Pause` / suspension de file de travailleurs)** plutôt qu'une suppression brutale (`Terminate`) des sagas déjà engagées à mi-chemin. Pourquoi ? Parce que figer l'état exact sur disque préserve intégralement la preuve médico-légale pour l'enquête du SOC et permet ensuite d'exécuter proprement les transactions de **compensation** des réservations déjà commises, évitant de laisser des stocks verrouillés ou des écritures comptables orphelines.

#### Extrait 20.3 — Orchestrateur Python automatisé de `Kill Switch` SOC multi-nuages

```python
# Playbook SOAR / SOC — Activation atomique du Coupe-Circuit Palier 3 (Gel d'un Blueprint d'agent)
from __future__ import annotations
import asyncio
import hashlib
import hmac
import json
import time
from dataclasses import dataclass


@dataclass(frozen=True)
class KillSwitchOrder:
    incident_id: str
    blueprint_id: str
    spiffe_id_uri: str
    temporal_task_queue: str
    initiated_by_soc_analyst: str
    reason: str


@dataclass(frozen=True)
class KillSwitchReceipt:
    incident_id: str
    elapsed_ms: float
    caep_broadcast_ok: bool
    gateway_quarantine_nodes: int
    spire_entry_evicted: bool
    temporal_queue_paused: bool
    sandboxes_terminated: int
    audit_hmac_sha256: str


async def execute_tier3_agent_killswitch(
    order: KillSwitchOrder,
    ssf_transmitter,
    gateway_control_plane,
    spire_server_client,
    temporal_admin_client,
    opensandbox_fleet_client,
    worm_audit_signing_key: bytes,
) -> KillSwitchReceipt:
    t0 = time.perf_counter()

    # Exécution parallèle stricte sur les 5 plans de contrôle (objectif global < 2 000 ms)
    async def broadcast_caep_revocation() -> bool:
        return await ssf_transmitter.publish_security_event(
            event_type=(
                "https://schemas.openid.net/secevent/caep/"
                "event-type/credential-change"
            ),
            subject={"format": "uri", "uri": order.spiffe_id_uri},
            reason_admin=f"[{order.incident_id}] {order.reason}",
        )

    async def quarantine_on_all_gateways() -> int:
        # Pousse instantanément principal.killSwitchQuarantined = true dans le cache Cedar mondial
        return await gateway_control_plane.quarantine_blueprint_globally(
            blueprint_id=order.blueprint_id, ttl_seconds=86400
        )

    async def revoke_spire_workload_identity() -> bool:
        return await spire_server_client.suspend_registration_by_spiffe_id(
            order.spiffe_id_uri
        )

    async def freeze_durable_workflows_forensically() -> bool:
        # Gèle la file d'activités sans détruire l'historique d'événements pour audit et compensation
        return await temporal_admin_client.pause_task_queue_dispatch(
            task_queue=order.temporal_task_queue,
            reason=f"SOC KillSwitch {order.incident_id}",
        )

    async def purge_active_microvms() -> int:
        return await opensandbox_fleet_client.terminate_by_label(
            label_selector=f"agent.boreal.ca/blueprint={order.blueprint_id}",
            scrub_memory=True,
        )

    async with asyncio.TaskGroup() as tg:
        t_caep = tg.create_task(broadcast_caep_revocation())
        t_gw = tg.create_task(quarantine_on_all_gateways())
        t_spire = tg.create_task(revoke_spire_workload_identity())
        t_temp = tg.create_task(freeze_durable_workflows_forensically())
        t_sbx = tg.create_task(purge_active_microvms())

    elapsed_ms = round((time.perf_counter() - t0) * 1000.0, 2)
    payload_for_worm = json.dumps(
        {
            "incident_id": order.incident_id,
            "blueprint_id": order.blueprint_id,
            "analyst": order.initiated_by_soc_analyst,
            "elapsed_ms": elapsed_ms,
            "timestamp_epoch": int(time.time()),
        },
        sort_keys=True,
    ).encode("utf-8")
    signature = hmac.new(worm_audit_signing_key, payload_for_worm, hashlib.sha256).hexdigest()

    return KillSwitchReceipt(
        incident_id=order.incident_id,
        elapsed_ms=elapsed_ms,
        caep_broadcast_ok=t_caep.result(),
        gateway_quarantine_nodes=t_gw.result(),
        spire_entry_evicted=t_spire.result(),
        temporal_queue_paused=t_temp.result(),
        sandboxes_terminated=t_sbx.result(),
        audit_hmac_sha256=signature,
    )
```

---

## 20.4 Application au fil rouge et éclairages sectoriels

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Déploiement du PDP Cedar vérifié formellement et exercice trimestriel GameDay du coupe-circuit SOC"}

**Défi opérationnel (T2 2027)** : À l'approche de l'ouverture généralisée de la Fabrique Agentique Boréal sur les trois divisions (**BSN**, **BCA** et **BEL**), le comité des risques du conseil d'administration exige deux garanties tangibles avant d'autoriser le passage à l'autonomie supervisée `L3` sur 15 000 événements quotidiens : (1) la preuve mathématique qu'aucune hallucination de modèle ne peut violer les plafonds de délégation financière ou la Loi 25 ; (2) la démonstration chronométrée qu'une dérive du type « boucle d'achat à 41 000 \$ CAD » vécue fin 2026 est désormais stoppée en moins de trois secondes.

**Architecture mise en production** :

1. **Référentiel unifié de 142 politiques `Cedar` vérifiées par SMT** : Toutes les passerelles `agentgateway` (déployées en actif-actif sur `Azure Canada Central` et dans les centres de données sur site de Montréal) embarquent le moteur Rust `Cedar`. À chaque demande de tirage Git modifiant une politique d'accès aux outils `MCP`, l'analyseur formel `cedar-spec-checker` vérifie 18 théorèmes d'invariance (dont la séparation des tâches `BCA`, le blocage d'écriture sous teinte externe et le plafond budgétaire par saga). Latence ajoutée mesurée en production : **0,62 ms au 99e centile**.
2. **Pool `OpenSandbox` sur `Firecracker` pour l'analytique et les `CUA`** : Les travailleurs d'analyse vibratoire Python de **BSN** et les agents d'automatisation d'écrans patrimoniaux de **BCA** sont migrés hors des conteneurs standards vers un pool préchauffé de microVMs `Firecracker` géré via `OpenSandbox`, avec `defaultEgress: DENY_ALL` et restauration de snapshot en **12 millisecondes**.
3. **Premier exercice trimestriel *Agentic Kill Switch GameDay* (Mai 2027)** : Sans prévenir l'équipe de garde du SOC, l'équipe Ingénierie du Chaos injecte un comportement de `Rogue Agent` (`ASI10` + `ASI08`) sur un clone de production de l'*Agent Réapprovisionnement* de **BEL**, programmé pour tenter 80 réservations inter-usines par minute et exfiltrer un journal vers une IP externe.

**Chronométrage officiel relevé lors du *GameDay*** :

* **\(t + 0,0\text{ s}\)** : Première tentative de connexion réseau sortante hors liste blanche bloquée net par le pare-feu `vsock` d'`OpenSandbox`.
* **\(t + 1,1\text{ s}\)** : Le détecteur de vélocité `OpenTelemetry` repère l'anomalie de cadence d'appels `MCP` et déclenche automatiquement l'ordre de coupe-circuit de Palier 3 (Extrait 20.3).
* **\(t + 2,4\text{ s}\) (`MTTR-Stop = 1,3 s` après détection)** : Les 14 instances `agentgateway` bloquent le *Blueprint*, le `ClusterSPIFFEID` est suspendu, 9 workflows `Temporal` en vol sont figés proprement en pause forensique, et 4 microVMs `Firecracker` actives sont détruites avec effacement mémoire.
* **Impact métier et financier constaté** : **0,00 \$ CAD de perte**, **0 écriture erronée dans `SAP S/4HANA`**, et reprise nominale sur la version saine précédente en **11 minutes** après compensation automatique des baux de réservation.

:::

::: {.encadre-sectoriel title="Fournisseurs Cloud & SaaS — Isolation multi-locataire stricte du code généré à la volée"}

Pour un éditeur `SaaS B2B` offrant à ses 22 000 entreprises clientes des agents capables d'exécuter des transformations de données personnalisées ou des scripts d'extension, une évasion de bac à sable ne compromet pas seulement l'éditeur : elle brise la **frontière sacrée entre locataires concurrents (*Cross-Tenant Breach*)**.

Trois mesures d'hygiène supplémentaires s'imposent en environnement multi-locataire hostile :

1. **Non-réutilisation inter-locataires des microVMs** : Un snapshot de base vierge peut être partagé en lecture seule (*Copy-on-Write*), mais dès qu'une instance `Firecracker` a reçu le moindre octet appartenant au Locataire A, elle n'est **jamais recyclée** pour le Locataire B ; elle est détruite et ses pages physiques mémoire sont remises à zéro par l'hyperviseur (`MADV_DONTNEED` / `mem_scrub`).
2. **Désactivation de l'hyperthreading (`SMT`) ou ordonnancement de cœur dédié (*Core Scheduling*)** sur les nœuds exécutant du code généré arbitraire, neutralisant les canaux auxiliaires micro-architecturaux de cache CPU (`L1TF`, `MDS`, variantes `Spectre`).
3. **Chiffrement éphémère par locataire des volumes de travail** : Tout espace temporaire `/tmp/work` monté dans la microVM utilise une clé symétrique volatile générée pour la seule durée de la tâche et purgée dès la terminaison du processus `Firecracker`.

:::

::: {.encadre-sectoriel title="Opérations Cyber-Physiques & Énergie — Modes de repli sûrs (Fail-Safe) lors de l'activation d'un coupe-circuit"}

Dans un centre de tri automatisé, une centrale hydroélectrique ou une usine chimique, déclencher un coupe-circuit informatique sans concevoir la physique sous-jacente peut s'avérer aussi dangereux que l'anomalie initiale. Si un agent d'optimisation énergétique pilotait des consignes de chauffage ou de débit et se voit soudainement figé en Palier 3, les équipements physiques ne doivent jamais rester bloqués sur une valeur transitoire instable.

L'architecture `IT/OT` impose une convention de **battement de cœur à bail court (*Dead-Man's Switch*)** côté automate programmable (`PLC` / `SCADA`) : toute consigne d'optimisation suggérée par le *System of Action* porte une validité bornée (par exemple 60 secondes). Dès que le coupe-circuit SOC fige l'agent et interrompt le renouvellement du bail validé par le jumeau numérique, l'automate industriel bascule automatiquement et sans à-coup vers sa **loi de commande nominale locale déterministe pré-programmée** (*Fallback Safe State*), garantissant la continuité physique de l'installation en totale autonomie vis-à-vis du réseau informatique.

:::

---

## 20.5 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-020 — Découplage systématique des garde-fous déterministes (Cedar/OPA) et exécution en microVM isolée"}

* **Statut** : Acceptée (Norme de sécurité d'exécution et de résilience)
* **Contexte** : Les modèles de langage demeurent probabilistes et vulnérables aux entrées adversariales inédites ; leur confier le respect des plafonds métiers ou exécuter le code qu'ils produisent dans des conteneurs à noyau partagé crée un risque inacceptable d'escalade système (`ASI05`) et de pertes opérationnelles rapides (`ASI08`/`ASI10`).
* **Options évaluées** :
  1. *Garde-fous purement neuronaux (modèles modérateurs en série) + conteneurs Docker standards* : Faible coût initial, mais aucune garantie formelle d'invariance et exposition directe du noyau Linux hôte aux évasions de code généré. **Rejetée**.
  2. *Validation humaine synchrone (`HITL`) sur 100 % des actions + machines virtuelles lourdes traditionnelles* : Détruit la vélocité métier, induit le biais d'approbation réflexe (`ASI09`) et génère 30 à 60 secondes de démarrage par tâche. **Rejetée**.
  3. *Architecture neuro-symbolique (`PEP` `agentgateway` + `PDP` `Cedar` vérifié par SMT), isolation `OpenSandbox` sur microVMs `Firecracker` / `WASI` sans egress, et coupe-circuit SOC à quatre paliers via `OpenID SSF/CAEP`* : **Retenue**.
* **Décision** : (a) Tout appel d'outil `MCP` mutatif ou délégation `A2A` est évalué hors du LLM par un `PDP` déterministe (`Cedar` ou `OPA`) dont les clauses `forbid` cardinales sont prouvées par raisonnement automatisé en CI/CD ; (b) toute exécution de code généré, d'analyse de fichiers tiers ou de session `CUA` s'effectue exclusivement dans un bac à sable éphémère à virtualisation matérielle (`Firecracker`) ou capacités `WASI` via `OpenSandbox`, en politique `DENY_ALL` sortante avec injection de secrets hors VM ; (c) chaque classe d'agent est raccordée au coupe-circuit SOC testé chaque trimestre lors d'un exercice *GameDay* chronométré (`MTTR-Stop < 2 s`).
* **Conséquences** :
  * *Positives* : Garanties mathématiques opposables aux régulateurs sur le respect des limites financières et de la SoD, immunité du cluster hôte face au code malveillant généré, capacité d'arrêt d'urgence quasi instantanée sans corruption transactionnelle.
  * *Négatives / Coûts assumés* : Nécessité de nœuds supportant la virtualisation imbriquée ou le métal nu (`KVM` `/dev/kvm`) pour `Firecracker`, et maintien de la gouvernance conjointe des schémas `Cedar` entre architectes métiers et SecOps.
* **Condition de révision** : Réévaluation annuelle selon l'évolution des performances du modèle de composants `WASI` et des spécifications `OpenSandbox` au sein de la Linux Foundation `AAIF`.

:::

### Liste de contrôle de mise en production — Chapitre 20

Pour clore cette Partie VI dédiée à l'identité, à la sécurité Zero Trust et à la résilience cyber, vérifiez ces huit ultimes exigences avant toute ouverture au trafic réel :

1. **Zéro invariant dans le prompt** : Toutes les limites financières, règles de séparation des tâches, plages horaires et restrictions de teinte sont-elles codées dans un `PDP` déterministe (`Cedar`/`OPA`) externe au LLM plutôt que dans les consignes textuelles de l'agent ?
2. **Passage obligé par le `PEP`** : L'architecture réseau (`mTLS` / politiques CNI) interdit-elle physiquement à un pod d'agent d'appeler un serveur `MCP` en contournant l'évaluation `PEP`/`PDP` de la passerelle `agentgateway` ?
3. **Preuve formelle CI/CD** : Les clauses `forbid` critiques des politiques `Cedar` sont-elles vérifiées automatiquement par solveur SMT à chaque déploiement afin de prouver l'absence de régression d'autorisation ?
4. **Virtualisation matérielle du code dynamique** : Toute exécution d'interpréteur (Python, Bash, JS) ou de navigateur `CUA` pilotée par un agent tourne-t-elle dans une microVM dédiée (`Firecracker`) ou un composant `WASI` détruit après usage, et jamais dans un conteneur partageant le noyau hôte ?
5. **Politique `Default-Deny Egress` et blocage métadonnées** : Les bacs à sable d'exécution bloquent-ils par défaut toute sortie Internet ainsi que l'adresse de métadonnées infonuagiques (`169.254.169.254`), limitant la communication au seul canal `vsock` contrôlé ?
6. **Secrets hors de la mémoire invitée** : Les jetons d'accès vers les services autorisés sont-ils injectés à l'extérieur de la microVM par un mandataire hôte (*Credential Vault Proxy*) afin que le code exécuté par l'agent ne puisse jamais lire le secret brut ?
7. **Coupe-circuit SOC à gel forensique** : Le playbook de coupe-circuit révoque-t-il simultanément les `SVID`/`JWT` (`CAEP`), les routes `agentgateway` et les microVMs tout en mettant les sagas `Temporal`/`Restate` en **pause conservatoire** pour préserver l'audit et les compensations ?
8. **Homologation trimestrielle *GameDay*** : Le temps d'arrêt effectif de bout en bout (`MTTR-Stop`) a-t-il été mesuré sous les **2 secondes** lors d'un test réel d'injection de panne/compromission au cours des 90 derniers jours ?
