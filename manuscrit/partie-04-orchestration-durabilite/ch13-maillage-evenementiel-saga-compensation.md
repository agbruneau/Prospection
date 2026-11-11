# Chapitre 13 — Maillage événementiel asynchrone et patron Saga à compensation

::: {.synthese-executive title="Synthèse exécutive — Chapitre 13"}

* **Enjeu stratégique** : Au-delà de trois systèmes d'enregistrement traversés, relier des agents autonomes par des appels synchrones bloquants reproduit les fragilités critiques des architectures point-à-point : couplage temporel, tempêtes de réessais lors des ralentissements d'inférence et états métier incohérents lorsqu'une étape aval échoue après des écritures amont déjà commises. L'entreprise agentique repose sur un **maillage événementiel asynchrone (*Event-Driven Agentic Architecture*, EDAA)** couplé au **patron `Saga` à compensation**.
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Proscrire tout verrouillage transactionnel distribué (`Two-Phase Commit` / `XA`) à travers des agents cognitifs et adopter un socle bi-modal combinant routage dynamique basse latence (`Solace PubSub+`) et journal immuable rejouable (`Apache Kafka` / `Confluent`).
  2. *Structurante dès le jour 1* : Classifier chaque outil `MCP` mutatif et chaque délégation `A2A v1.0` en quatre catégories (*compensable*, *pivot*, *réessayable*, *irréversible externe*), imposer le patron `Transactional Outbox` et confiner toute émission externe derrière un tampon à fenêtre de grâce.
  3. *Réversible par conception* : Le choix des adaptateurs de capture de changements (`CDC`) ou des courtiers périphériques (`NATS JetStream`) en bordure d'usine, tant que l'enveloppe canonique `CloudEvents 1.0` est respectée.
* **Indicateurs de gouvernance associés** : Taux de convergence propre des sagas (*Clean Commit + Clean Rollback Rate* \(\ge 99,9\,\%\)), délai de compensation au 95e centile, taux de dérive en file `SagaDeadLetter` (\(< 0,05\,\%\)), et zéro émission irréversible externe avant validation du point pivot.

:::

## 13.1 De la requête-réponse bloquante à l'*Event-Driven Agentic Architecture* (`EDAA`)

Au **Chapitre 12**, nous avons montré comment un moteur d'exécution durable (`Temporal`, `Restate`) préserve l'avancement d'un flux individuel malgré les pannes ou les attentes humaines. Il reste toutefois à résoudre deux défis d'urbanisation globale : **propager en temps réel des milliers de faits opérationnels sans coupler chaque producteur à chaque consommateur**, et **rétablir l'intégrité métier lorsqu'une transaction inter-divisions doit être annulée à mi-parcours**.

Dans les premiers graphes multi-agents, les équipes privilégient souvent l'invocation synchrone : l'agent A appelle l'agent B en HTTP, qui attend un serveur `MCP` C sollicitant un progiciel D. À mesure que le nombre de maillons \(m\) croît, la disponibilité effective s'effondre selon le produit des disponibilités unitaires \(a_i\) :

\[A_{\text{sync}}(m) = \prod_{i=1}^{m} a_i \ll \min_{i} a_i\]

Lorsque chaque maillon dépend d'un moteur d'inférence à latence variable et d'un progiciel métier aux fenêtres de maintenance propres, cette topologie synchrone engendre trois pathologies majeures :

1. **Tempêtes de réessais (*Retry Storms*)** : Un quota `HTTP 429` ou une lenteur `SAP` bloque les appels amont ; des réessais non coordonnés multiplient la charge au moment précis où le service aval tente de se rétablir.
2. **Rigidité évolutive** : Greffer un *Agent Critique d'Audit* ou un indexeur mémoriel (`Graphiti`) sur un flux existant oblige à modifier et redéployer le code des agents producteurs.
3. **Inadéquation au monde physique** : Les capteurs `OPC-UA`, les avis `EDI X12` et les écritures comptables sont des flux continus de faits, non des appels de procédures distantes.

L'**Architecture Événementielle Agentique (`EDAA`)** inverse ce couplage : capteurs, progiciels et agents publient des **faits métiers immuables** sur un maillage gouverné ; les agents abonnés filtrent ces faits selon leurs mandats `NHI`, agissent localement et publient en retour leurs résultats ou signaux de compensation.

Deux variantes complémentaires de charge utile coexistent sur ce maillage et doivent être arbitrées délibérément :

* **L'événement de notification mince (*Thin Event*)**, qui signale uniquement qu'une transition d'état a eu lieu sur un identifiant métier et invite les consommateurs habilités à relire l'état frais via un serveur `MCP` en appliquant le contrôle d'accès à la source — patron obligatoire dès que l'événement touche des renseignements personnels soumis à la `Loi 25` ou des clauses tarifaires confidentielles.
* **Le transfert d'état porté par l'événement (*Event-Carried State Transfer*, ECST)**, où le message embarque directement la projection normalisée selon l'ontologie `Apache Ossie` nécessaire aux agents avals, éliminant ainsi les tempêtes de lectures synchrones (*Read Stampede*) vers l'`IBM i` ou `SAP S/4HANA` lorsqu'une dizaine de travailleurs analytiques réagissent au même fait industriel.

![Architecture Événementielle Agentique (EDAA) combinant Solace PubSub+, Confluent Kafka et le cycle aller-retour d'une Saga à compensation avec Transactional Outbox et tampon d'actions irréversibles.](manuscrit/figures/fig-13-edaa-saga-compensation.svg)

### Arbitrage des courtiers pour charges agentiques : `Kafka`, `Solace` et `NATS`

En 2027, trois familles de courtiers se partagent des rôles complémentaires — complétées au besoin par `AGNTCY SLIM` (chiffrement de bout en bout *Messaging Layer Security*) lorsque des essaims d'agents échangent sur des réseaux non fiables :

* **`Apache Kafka` / `Confluent` (journal immuable et rejeu temporel)** : Journal distribué en ajout seul (*append-only log*) partitionné par clé métier (`equipmentSerialNumber` ou `sagaId`), `Kafka` garantit l'ordre strict par partition et conserve l'historique sur des mois. Il alimente les pipelines de contexte (`Apache Flink`), fournit une piste d'audit chronologique opposable sous `BSIF E-23` et permet de rejouer un incident réel dans un bac à sable `OpenEnv` pour vérifier la non-régression d'un agent.
* **`Solace PubSub+` (maillage dynamique *Event Mesh* et passerelle `IT/OT`)** : Là où `Kafka` emploie des sujets plats, `Solace` route les messages selon des **hiérarchies arborescentes fines** (jusqu'à douze niveaux, ex. `boreal/bel/qc/mtl02/compressor/BOR-90441/vibration/critical`) évaluées avec jokers `*` et `>` directement par le courtier. Un spécialiste peut souscrire aux seules alertes critiques québécoises sans ingérer le flux nominal européen, avec traduction multiprotocole native (`MQTT Sparkplug`, `AMQP 1.0`, `REST`, `WebSockets`).
* **`NATS` + `JetStream` (périphérie industrielle et micro-coordination)** : Binaire léger offrant une latence sous la milliseconde, `NATS` excelle dans les usines sujettes aux coupures WAN et pour coordonner des travailleurs d'extraction `SLM` selon des patrons *scatter-gather* rapides.

| Dimension d'évaluation | `Apache Kafka` / `Confluent` | `Solace PubSub+` (Event Mesh) | `NATS` + `JetStream` |
|---|---|---|---|
| **Paradigme primaire** | Journal distribué immuable à rétention longue | Maillage orienté routage dynamique et filtrage fin | Messagerie ultra-légère de périphérie (*Edge*) |
| **Filtrage des sujets** | Sujets plats ; filtrage délégué aux consommateurs / `Flink` | Arborescence riche avec jokers évalués par le courtier | Hiérarchie par jetons (`.` / `*` / `>`) rapide en mémoire |
| **Protocoles natifs** | Binaire Kafka + `Kafka Connect` / passerelle REST | Multiprotocole natif : `MQTT`, `AMQP 1.0`, `JMS`, `REST`, `WSS` | Protocole NATS sobre, support `MQTT` et `WebSockets` |
| **Ordre et rejeu d'audit** | Ordre total par partition ; rejeu historique massif (`E-23`) | Files durables à acquittement fin ; rejeu borné au tampon | Flux `JetStream` répliqués pour fenêtres tactiques |
| **Latence p99 intra-zone** | 5 à 25 ms (optimisé débit séquentiel élevé) | 0,5 à 5 ms (commutation fine à faible gigue) | 0,15 à 2 ms (empreinte minimale inter-conteneurs) |
| **Rôle agentique optimal** | Journal canonique des sagas, audit, mémoire et analytique | Collecte `IT/OT`, fédération multi-nuages, routage sélectif | Usines déconnectables, essaims locaux de travailleurs `SLM` |

Chez Groupe Boréal, `Solace` capte et filtre à basse latence les signaux `OT` et applicatifs aux frontières, puis déverse via un pont certifié les événements qualifiés dans `Kafka` pour l'orchestration durable et l'audit réglementaire.

Une décision de conception déterminante sur ce pont concerne le **choix de la clé de partitionnement (`Partition Key`)** dans `Kafka`, car l'ordre total n'est garanti qu'au sein d'une même partition :

* Sur les sujets d'état d'actifs physiques ou contractuels (`bel.equipment.telemetry`, `bca.policy.lifecycle`), la clé de partitionnement doit être l'**identifiant canonique de la ressource métier** (`BOR-CMP-90441`), afin qu'une alerte de rétablissement ne puisse jamais être consommée avant l'alerte de panne qui l'a précédée de 200 millisecondes.
* Sur les sujets de coordination transactionnelle (`boreal.saga.commands`, `boreal.saga.compensations`), la clé de partitionnement est impérativement **`aigovsagaid`**, garantissant que tous les jalons aller et retour d'une même saga sont sérialisés dans leur ordre causal exact sans créer de goulot global entre deux sagas indépendantes.
* Enfin, lorsque des événements franchissent le périmètre de l'entreprise vers un fournisseur logistique externe, la charge utile est encapsulée dans un groupe chiffré **`AGNTCY SLIM`** (protocole IETF *Messaging Layer Security*, `RFC 9420`), assurant que même un courtier relais intermédiaire ne puisse lire le contenu métier en clair.

---

## 13.2 Ingénierie de l'événement agentique : `CloudEvents 1.0`, `Transactional Outbox` et anti-tempête

Un bus asynchrone sans discipline transactionnelle ne fait que déplacer le désordre. Trois mécanismes garantissent la fiabilité industrielle des échanges.

### 1. Éliminer la double écriture par le patron `Transactional Outbox` et le registre d'idempotence

Si un serveur `MCP` valide un `COMMIT` SQL de réservation de stock puis tente de publier `InventoryReserved` sur `Kafka`, un crash ou une coupure réseau entre ces deux opérations laisse un stock bloqué sans événement émis. En production, **aucun agent ni serveur `MCP` ne publie directement sur le courtier à côté d'une écriture en base**. La mutation métier et l'insertion dans la table `agent_outbox_events` s'exécutent dans la *même transaction ACID locale*. Plutôt qu'un scrutateur périodique SQL (*polling*) générateur de charge inutile, un connecteur *Change Data Capture* (`Debezium` lisant en continu le journal des transactions `WAL` PostgreSQL ou les journaux de réplication `SAP` / `IBM i`) extrait chaque ligne engagée en moins de 15 millisecondes et la publie sur le courtier avec garantie *au moins une fois* (*At-Least-Once*).

Côté consommateur, chaque travailleur ou serveur `MCP` maintient une table de déduplication transactionnelle indexée sur `aigovidempotencykey` conservant non seulement le statut d'exécution (`IN_PROGRESS`, `COMPLETED`), mais aussi l'empreinte de la réponse produite. Ainsi, lorsqu'un rééquilibrage de groupe de consommateurs `Kafka` rejoue un message déjà traité, l'agent restitue instantanément le résultat antérieur sans réinvoquer le modèle de langage ni doubler la réservation physique. Associé au registre de schémas (`Schema Registry`) imposant une compatibilité ascendante et descendante stricte (*Full Transitive Compatibility*), cet ensemble garantit qu'une saga en veille pendant dix jours survivra sans erreur de désérialisation au déploiement d'une nouvelle version d'agent.

### 2. Normaliser l'enveloppe avec `CloudEvents 1.0` et le patron *Claim-Check*

Tous les messages adoptent la norme **CNCF `CloudEvents 1.0`** enrichie des attributs de gouvernance agentique (`aigov*`). Pour les artefacts volumineux (liasses PDF, spectres vibratoires), l'émetteur applique le patron **Claim-Check** : le fichier chiffré réside dans un stockage objet immuable, et l'événement ne transporte que son URI accompagnée d'une empreinte `SHA-256` vérifiable.

#### Extrait 13.1 — Événement agentique normatif `CloudEvents 1.0` avec gouvernance et *Claim-Check*

```json
{
  "specversion": "1.0",
  "id": "evt-0195f3c8-8a14-7d20-9b41-6c02e4419a08",
  "source": "spiffe://boreal.ca/ns/bel-erp/sa/mcp-sap-inventory",
  "type": "ca.boreal.bel.inventory.part.reserved.v2",
  "subject": "equipment/BOR-CMP-90441/material/INJ-MOD-V12",
  "time": "2027-04-09T14:22:11.408Z",
  "datacontenttype": "application/json",
  "dataschema": "https://schemas.boreal.ca/ossie/v2/inventory-event.schema.json",
  "traceparent": "00-7d4e9a12b8c041559f0218a4c7103e21-89a1c402f1b30042-01",
  "aigovsagaid": "saga-inc-2027-119405",
  "aigovidempotencykey": "saga-inc-2027-119405:step-01:sap-reserve",
  "aigovautonomyceiling": "L3",
  "aigovhopremaining": 3,
  "aigovbudgetremainingcad": "1.05",
  "aigovinitiatingactor": "urn:boreal:iot:bsn-vibration-guardian-v4",
  "data": {
    "reservationDocumentNumber": "SAP-RES-4409812",
    "plantCode": "CA-QC-MIR-01",
    "materialCode": "INJ-MOD-V12",
    "reservedQuantity": 1,
    "unitValuationCad": 14800.00,
    "leaseExpiresAt": "2027-04-09T18:22:11Z",
    "compensationContract": {
      "classification": "COMPENSABLE",
      "mcpServer": "https://agentgateway.internal.boreal.ca/mcp/bel/sap-mm",
      "inverseToolName": "sap_release_spare_part_reservation",
      "correlationParameters": {
        "reservationDocumentNumber": "SAP-RES-4409812",
        "plantCode": "CA-QC-MIR-01"
      }
    },
    "diagnosticClaimCheck": {
      "artifactUri": "s3://boreal-telemetry/2027/04/09/fft-BOR-CMP-90441.parquet",
      "sha256Digest": "e3b0c44298fc1c149afbf4c8996fb924...495991b7852b855",
      "encryptionKeyRef": "kms://ca-central-1/boreal-ot-cmk"
    }
  }
}
```

### 3. Prévenir les tempêtes cognitives auto-entretenues (`OWASP ASI08`)

Dans un maillage d'événements, deux agents abonnés au même objet peuvent entrer en résonance infinie (l'un normalise une fiche, l'autre recalcule un score et republie l'événement). Trois verrous déterministes bloquent cette dérive : (a) la **décrémentation obligatoire de `aigovhopremaining`** à chaque réaction, routant en quarantaine passive tout message tombé à `0` ; (b) le **filtrage d'auto-causalité** ignorant toute mutation émise par la même identité `SPIFFE` ou hors du sous-schéma surveillé ; et (c) l'isolation après trois échecs vers une **file de lettres mortes sémantique (`.dlq`)** afin de ne jamais bloquer une partition `Kafka`.

::: {.encadre-sectoriel title="Transport aérien & Logistique — Sagas de réacheminement en perturbation majeure (IRROPS)"}

Lorsqu'un épisode de verglas ferme deux pistes d'un pivot aéroportuaire nord-américain (*Irregular Operations*, `IRROPS`), une compagnie aérienne et sa filiale cargo doivent recomposer en moins de vingt minutes des dizaines de rotations d'aéronefs, des équipages soumis aux limites légales de temps de service (`Transports Canada` / `FAR Part 117`) et des milliers d'expéditions pharmaceutiques sous chaîne du froid.

En 2027, les transporteurs de pointe remplacent les verrous centraux sur le `PSS` par un maillage `Solace PubSub+` (télémétrie avionique `ACARS` et portes en temps réel) couplé à `Kafka` et `Temporal` :

1. **Réservations spéculatives à bail court (*Soft-Hold Leases*)** : L'*Agent Fret Critique* bloque pour 15 minutes de la soute sur un vol partenaire `A2A` et un camion frigorifique sous douane pendant que l'*Agent Équipage* vérifie la légalité des pilotes de réserve.
2. **Compensation immédiate sur veto légal** : Si le contrôleur des temps de repos ou la douane refuse l'itinéraire au point pivot, la saga libère en moins de trois secondes la soute partenaire et le camion, éliminant la rétention fantôme de capacité qui paralysait autrefois tout le réseau.

:::

---

## 13.3 Théorie et pratique du patron `Saga` en environnement probabiliste

Dès qu'un processus modifie plusieurs *Systems of Record* autonomes (`SAP`, `ServiceNow`, `Guidewire`), **le protocole de validation à deux phases (`2PC` / `XA`) est impraticable** : les plateformes SaaS refusent les verrous externes et maintenir un verrou exclusif pendant dix secondes d'inférence — ou quatre heures d'attente `HOTL` — asphyxierait l'exploitation.

Le patron **`Saga`** (Garcia-Molina & Salem) remplace l'atomicité instantanée par une suite de transactions locales \(T_1, \dots, T_n\), validées immédiatement mais associées à des **compensations inverses** \(C_i\). Toute saga rigoureuse s'ordonne autour d'une unique **transaction pivot** \(T_p\) :

\[S = \langle T_1, \dots, T_{p-1}, T_p, T_{p+1}, \dots, T_n \rangle\]

Si une étape \(T_k\) (\(k \le p\)) échoue ou essuie un refus de politique, le coordinateur dépile les compensations en ordre inverse strict (`LIFO`) :

\[\text{Comp}(S, k) = \langle C_{k-1}, C_{k-2}, \dots, C_1 \rangle\]

Le tableau ci-dessous formalise l'ordre impératif des quatre classes d'effets de bord : d'abord les étapes **compensables**, puis l'unique **pivot** (point de non-retour décisionnel), suivi uniquement d'étapes **réessayables** garanties de converger, et enfin les **actions irréversibles externes** sous tampon.

| Classe d'effet de bord | Position obligatoire | Propriété formelle | Exemples concrets en entreprise | Exigence sur le serveur `MCP` / pair `A2A` |
|---|---|---|---|---|
| **1. Compensable** | **Avant le pivot** (\(T_1 \dots T_{p-1}\)) | Annulable proprement par une opération inverse \(C_i\) | Réservation temporaire `SAP`, blocage d'agenda technicien | Exposer l'outil inverse, un bail d'expiration (`TTL`) et l'idempotence |
| **2. Pivot** | **Bascule unique** (\(T_p\)) | Son succès scelle l'engagement ; son échec lance le rollback | Adjudication de garantie `BCA`, validation `CIBA`, mandat `AP2` | Atomicité stricte, contrôle complet des politiques `Cedar`/`OPA` |
| **3. Réessayable** | **Après le pivot** (\(T_{p+1} \dots T_n\)) | Aucun refus métier possible ; converge par réessai | Imputation analytique interne, mise à jour mémoire ou CRM | Idempotence absolue sur `stepIdempotencyKey` |
| **4. Irréversible** | **Terminale sous tampon** | Traverse la frontière physique ou juridique | Avis `EDI` externe, courriel client, consigne `MES`, virement | Passage obligatoire par un tampon à fenêtre de grâce |

### Contre-mesures face au déficit d'isolation (`ACD` sans `I`) entre sagas concurrentes

Contrairement à une transaction relationnelle `ACID`, une saga ne fournit que les garanties **`ACD`** : ses mutations intermédiaires deviennent immédiatement visibles aux autres agents avant même que le point pivot ne soit atteint. Sans précaution, deux sagas concurrentes agissant sur le même équipement ou le même plafond de crédit client s'exposent à trois anomalies classiques : **mises à jour perdues (*Lost Updates*)**, **lectures sales (*Dirty Reads*)** d'un état qui sera annulé trois secondes plus tard par un rollback, et **lectures non reproductibles**.

L'ingénierie des systèmes agentiques applique trois contre-mesures éprouvées au niveau des serveurs `MCP` :

1. **Verrous sémantiques explicites (*Semantic Locks*)** : Toute étape compensable \(T_i\) pose un indicateur visible d'état transitoire sur l'entité métier (`status = RESERVED_PENDING_SAGA`, assorti de `lockedBySagaId` et d'un `leaseExpiresAt`). Un second agent inspectant la même pièce critique voit immédiatement qu'un arbitrage est en cours et attend l'expiration du bail court ou sélectionne un dépôt alternatif au lieu d'écraser l'enregistrement.
2. **Opérations commutatives** : Privilégier chaque fois que possible des mutations additives ou soustractives (`debit_quota(delta)`) dont la compensation inverse reste valide quel que soit l'ordre d'intercalation d'autres sagas entre \(T_i\) et \(C_i\), plutôt que des écritures d'écrasement absolu (`set_balance(valeur)`).
3. **Réordonnancement pessimiste des risques** : Placer systématiquement juste avant le pivot les étapes présentant la plus forte probabilité de contention ou de rejet réglementaire, afin de minimiser la durée d'exposition des ressources verrouillées sémantiquement en amont.

### Compensation déterministe, compensation sémantique et orchestration hybride

La **compensation déterministe** invoque directement une API symétrique sans appel LLM (`release_reservation`) ; elle doit toujours être privilégiée. Toutefois, dans les processus longs (`T3`/`T4`), **l'état physique ou comptable peut évoluer entre \(T_i\) et \(C_i\)** : une pièce réservée a déjà quitté son rayon d'entrepôt (*picking* terminé), des frais contractuels de dédit s'appliquent, ou un taux de change a bougé. Lorsque l'API inverse signale une telle dérive (`STATE_DRIFTED`), le coordinateur exécute un **plan de remédiation sémantique pré-homologué** (émission d'un bon de réintégration magasin ou d'un avoir sous plafond financier), et bascule en `SagaDeadLetter` vers un superviseur `HOTL` si l'écart dépasse la tolérance.

Au-delà de trois acteurs ou sous régime réglementé (`BSIF E-23`), la chorégraphie pure sans coordinateur est proscrite au profit de **l'orchestration durable pilotée par événements** : le bus diffuse les faits découplés, tandis qu'un coordinateur explicite (`Temporal` / `Restate`) persiste chaque contrat inverse *avant* d'émettre l'action aller (*Write-Ahead Compensation Registration*).

#### Extrait 13.2 — Coordinateur TypeScript de `Saga` avec pile `LIFO` déterministe et sémantique

```typescript
export type StepKind = "COMPENSABLE" | "PIVOT" | "RETRIABLE";

export interface CompensationPlan {
  readonly stepName: string;
  readonly deterministicUndo: (idempotencyKey: string) => Promise<{
    status: "COMPENSATED" | "STATE_DRIFTED";
    driftReason?: string;
  }>;
  readonly semanticRemediation?: (
    driftReason: string,
    idempotencyKey: string
  ) => Promise<{ status: "REMEDIATED"; adjustmentCostCad: number }>;
}

export interface SagaStep<TResult> {
  readonly name: string;
  readonly kind: StepKind;
  readonly forwardAction: (idempotencyKey: string) => Promise<TResult>;
  readonly buildCompensation?: () => CompensationPlan;
}

export interface DurableSagaJournal {
  persistAhead(sagaId: string, plan: CompensationPlan): Promise<void>;
  recordEvent(sagaId: string, event: string, meta: Record<string, unknown>): Promise<void>;
  escalateDeadLetter(sagaId: string, stepName: string, error: string): Promise<void>;
}

export class AgenticSagaCoordinator {
  private readonly compensationStack: CompensationPlan[] = [];
  private pivotPassed = false;

  constructor(
    private readonly sagaId: string,
    private readonly maxDriftCad: number,
    private readonly journal: DurableSagaJournal
  ) {}

  public async executeStep<TResult>(step: SagaStep<TResult>): Promise<TResult> {
    if (this.pivotPassed && step.kind === "COMPENSABLE") {
      throw new Error(`Invariant violé [${this.sagaId}] : étape compensable interdite après pivot.`);
    }
    if (step.kind === "COMPENSABLE") {
      if (!step.buildCompensation) throw new Error(`Compensation manquante sur '${step.name}'.`);
      const plan = step.buildCompensation();
      // Enregistrement préalable sur disque AVANT l'appel réseau aller (couvre les timeouts ambigus)
      await this.journal.persistAhead(this.sagaId, plan);
      this.compensationStack.push(plan);
    }

    try {
      const res = await step.forwardAction(`${this.sagaId}:fwd:${step.name}`);
      if (step.kind === "PIVOT") this.pivotPassed = true;
      await this.journal.recordEvent(this.sagaId, "STEP_OK", { step: step.name, kind: step.kind });
      return res;
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      if (!this.pivotPassed) await this.unwindCompensations(reason);
      throw err;
    }
  }

  private async unwindCompensations(reason: string): Promise<void> {
    await this.journal.recordEvent(this.sagaId, "ROLLBACK_START", { reason });
    let driftCad = 0;

    while (this.compensationStack.length > 0) {
      const plan = this.compensationStack.pop()!;
      const undoKey = `${this.sagaId}:undo:${plan.stepName}`;
      try {
        const res = await plan.deterministicUndo(undoKey);
        if (res.status === "COMPENSATED") continue;

        if (!plan.semanticRemediation) throw new Error(`Dérive non couverte : ${res.driftReason}`);
        const sem = await plan.semanticRemediation(res.driftReason ?? "DRIFT", `${undoKey}:sem`);
        driftCad += sem.adjustmentCostCad;
        if (driftCad > this.maxDriftCad) {
          throw new Error(`Écart sémantique (${driftCad} CAD) supérieur au plafond (${this.maxDriftCad} CAD)`);
        }
      } catch (compErr) {
        const msg = compErr instanceof Error ? compErr.message : String(compErr);
        await this.journal.escalateDeadLetter(this.sagaId, plan.stepName, msg);
        throw compErr;
      }
    }
  }
}
```

---

## 13.4 Confinement des actions irréversibles : tampon à fenêtre de grâce et coupe-circuit

Aucune API ne permet de « rappeler » un courriel client déjà lu, un avis d'expédition `EDI X12 856` transmis à un transporteur routier, une consigne d'usinage envoyée à un `MES` ou un virement `AP2`/`x402`. Dans un système multi-agents où un méta-gouverneur d'audit ou une sonde de détection d'intrusion (`OWASP ASI01`/`ASI02`) fonctionne souvent en inspection parallèle asynchrone avec quelques secondes de décalage, émettre instantanément vers l'extérieur crée une vulnérabilité irrécupérable.

Toute architecture `L3`/`L4` interpose par conséquent un **Tampon à Fenêtre de Grâce (*Grace-Window Outbox Buffer*)** devant ses connecteurs de sortie externes. L'intention scellée est placée en rétention active pendant une durée calibrée sur la criticité métier (typiquement 60 à 300 secondes, ou jusqu'à réception d'une contresignature cryptographique de l'*Agent Critique* indépendant). Durant cette fenêtre, le tampon écoute en temps réel les événements d'annulation (`ca.boreal.saga.aborted`) et de révocation d'identité `SPIFFE` ; à l'échéance, il réévalue juste-à-temps la politique `Cedar`/`OPA` avant de sceller l'émission externe.

#### Extrait 13.3 — Tampon Python asynchrone à fenêtre de grâce pour sorties irréversibles

```python
from __future__ import annotations
import asyncio
from dataclasses import dataclass
from typing import Awaitable, Callable, Protocol


class PolicyGuard(Protocol):
    async def authorize_jit(self, saga_id: str, spiffe_id: str, action_type: str) -> bool: ...


class SealedEgressConnector(Protocol):
    async def send_external(self, idempotency_key: str, payload: dict) -> str: ...


@dataclass(frozen=True)
class StagedEgressAction:
    action_id: str
    saga_id: str
    spiffe_id: str
    action_type: str
    grace_seconds: int
    payload: dict


class IrreversibleOutboxBuffer:
    def __init__(self, guard: PolicyGuard, connector: SealedEgressConnector) -> None:
        self._guard = guard
        self._connector = connector
        self._aborts: dict[str, asyncio.Event] = {}

    def trigger_abort(self, saga_id: str) -> None:
        self._aborts.setdefault(saga_id, asyncio.Event()).set()

    async def stage_and_release(
        self,
        item: StagedEgressAction,
        audit: Callable[[str, str], Awaitable[None]],
    ) -> str | None:
        abort_ev = self._aborts.setdefault(item.saga_id, asyncio.Event())
        await audit(item.saga_id, f"STAGED:{item.action_id}")

        try:
            # Interrompt immédiatement si un signal de rollback ou coupe-circuit survient
            await asyncio.wait_for(abort_ev.wait(), timeout=float(item.grace_seconds))
            await audit(item.saga_id, f"PURGED_ON_ABORT:{item.action_id}")
            return None
        except asyncio.TimeoutError:
            if not await self._guard.authorize_jit(item.saga_id, item.spiffe_id, item.action_type):
                await audit(item.saga_id, f"BLOCKED_JIT_POLICY:{item.action_id}")
                return None
            key = f"{item.saga_id}:egress:{item.action_id}"
            ext_ref = await self._connector.send_external(key, item.payload)
            await audit(item.saga_id, f"DISPATCHED:{ext_ref}")
            return ext_ref
```

::: {.encadre-sectoriel title="Secteur Financier & Assurance — Contre-passation comptable immuable sous BSIF E-23"}

Dans une institution financière ou un assureur soumis aux normes IFRS 17 et à la ligne directrice **BSIF E-23 (1er mai 2027)**, compenser une étape comptable obéit à un interdit absolu : **aucune écriture inscrite au journal auxiliaire ou au grand livre ne peut être modifiée ni supprimée (`DELETE`)**.

Lorsqu'une saga d'indemnisation inscrit en \(T_1\) une provision technique de 8 500 \$ CAD dans `Guidewire` puis s'interrompt au pivot \(T_p\) suite à la détection d'un doublon contractuel, l'outil `MCP` de compensation \(C_1\) génère une **écriture de contre-passation miroir** horodatée, portant la référence `reversesEntryId` ainsi que l'identifiant du modèle et de la règle déclenchante — préservant une piste d'audit irréprochable devant le régulateur.

:::

---

## 13.5 Application au fil rouge : rollback inter-divisions chez Groupe Boréal

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Autopsie d'un rollback inter-divisions sur refus de conformité BCA"}

**Incident réel (`saga-inc-2027-119405`)** : Un mardi à 14 h 22, un groupe électrogène industriel installé chez un client aéronautique à Mirabel émet sur `MQTT Sparkplug` une alerte critique d'injection. Captée par `Solace PubSub+` et pontée vers `Confluent Kafka`, l'alerte instancie un workflow `Temporal` piloté par `AgenticSagaCoordinator`.

**Phase aller compensable (1,9 seconde)** :

1. **Étape \(T_1\) — Stocks BEL (`SAP S/4HANA`)** : Après enregistrement préalable de \(C_1\), l'*Agent Stocks* réserve l'unique module d'injection `INJ-MOD-V12` de l'Est canadien (**14 800 \$ CAD**, bail 4 h). La table `Transactional Outbox` valide `SAP-RES-4409812` et publie l'`Extrait 13.1`.
2. **Étape \(T_2\) — Terrain BSN (`ServiceNow FSM`)** : Blocage du créneau 17 h 00 d'un électromécanicien haute tension et d'un camion-atelier (`FSM-HOLD-88210`). Aucune confirmation client n'est émise avant franchissement du pivot.

**Refus au point pivot \(T_p\) chez Boréal Capital & Assurances (14 h 29)** :

* L'*Agent Garantie* BCA relève sur l'`IBM i` deux verrous bloquants : le coût (**14 800 \$ CAD**) dépasse le plafond `L3` (**5 000 \$ CAD** dans `Cedar`) et le client accuse un impayé litigieux de 94 jours suspendant la couverture gratuite.
* Sollicitée via escalade asynchrone `CIBA` / `A2UI`, la souscriptrice BCA refuse la prise en charge sous garantie et exige un bon de commande prépayé.

**Exécution automatique du rollback `LIFO` (3,8 secondes)** :

1. **Zéro fuite externe** : Le signal `ca.boreal.saga.aborted` interdit toute sortie du tampon ; aucune promesse erronée de gratuité n'a été envoyée au client.
2. **Compensation \(C_2\) (`ServiceNow FSM`)** : `fsm_cancel_slot_allocation("FSM-HOLD-88210")` libère en 640 ms le technicien et le camion-atelier, aussitôt réaffectés à une urgence à Laval.
3. **Compensation \(C_1\) (`SAP S/4HANA`)** : `sap_release_spare_part_reservation("SAP-RES-4409812")` remet immédiatement le module `INJ-MOD-V12` en stock disponible vendable.
4. **Rebond commercial** : L'événement de clôture déclenche dans `Salesforce Agentforce` la préparation d'une soumission d'intervention facturable transmise au directeur de compte en deux minutes.

**Bilan T2 2027 (18 400 sagas)** : **99,94 %** de convergence propre (commit ou rollback complet en **3,8 s médianes**, 7,4 s au 99e centile), zéro stock fantôme dans `SAP S/4HANA` contre une moyenne antérieure de 23 réservations bloquées par semaine, coût moyen d'orchestration d'un rollback inférieur à **0,002 \$ CAD** (aucun appel LLM durant le dépilement déterministe), et seulement **11 dossiers (0,06 %)** escaladés en `SagaDeadLetter` suite à des dérives physiques d'entrepôt résolues en moins de quinze minutes par les superviseurs logistiques.

:::

---

## 13.6 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-013 — Maillage événementiel hybride Kafka/Solace et patron Saga à compensation sans 2PC"}

* **Statut** : Acceptée | **Périmètre** : Fabrique Agentique Entreprise (BEL, BCA, BSN) | **Révision** : Annuelle
* **Contexte** : Les flux inter-divisions traversent des progiciels hétérogènes (`SAP`, `IBM i`, `Guidewire`, `ServiceNow`, `OT`) avec des étapes d'inférence ou d'approbation `HOTL` incompatibles avec tout verrouillage synchrone.
* **Options évaluées** :
  1. *Transactions distribuées (`2PC` / `XA`)* : **Rejetée** — indisponible sur les API SaaS et destructrice pour la disponibilité des bases centrales.
  2. *Chorégraphie pure sans coordinateur* : **Rejetée** — opacité de l'état global, risque de tempêtes d'événements (`ASI08`) et auditabilité insuffisante sous `BSIF E-23`.
  3. *Maillage hybride `Solace`/`Kafka` + Sagas orchestrées durablement* : `Solace` pour le filtrage temps réel `IT/OT`, `Kafka` (`CloudEvents 1.0` + `Outbox`) comme journal immuable, et coordinateur durable ordonné autour d'un point pivot avec tampon irréversible. **Retenue**.
* **Décision** : Toute mutation touchant au moins deux systèmes d'enregistrement s'exécute sous forme de `Saga` interdisant les étapes compensables après le pivot, persistant \(C_i\) avant \(T_i\) (*Write-Ahead*), utilisant `Transactional Outbox` et isolant les sorties externes derrière un tampon à fenêtre de grâce.
* **Conséquences** :
  * *Positives* : Découplage temporel fort, résilience aux pannes partielles, rejeu d'audit exact, élimination des réservations fantômes.
  * *Négatives / Coûts assumés* : Gestion explicite de la cohérence finale dans les interfaces `AG-UI` et développement systématique des outils inverses `MCP`.
* **Condition de révision** : Réexamen annuel selon l'évolution des standards d'événements de la Linux Foundation `AAIF`.

:::

### Liste de contrôle de mise en production — Chapitre 13

Avant d'homologuer un flux multi-agents asynchrone, vérifiez les huit garde-fous suivants :

1. **Ordre strict autour du pivot** : Toutes les étapes pouvant échouer pour cause métier précèdent-elles l'unique pivot \(T_p\), ne laissant après lui que des opérations réessayables idempotentes ?
2. **Enregistrement préalable (*Write-Ahead*)** : Le descripteur `CompensationPlan` est-il persisté sur disque durable *avant* l'appel réseau de l'action aller \(T_i\) ?
3. **Compensation déterministe prioritaire** : Les annulations \(C_i\) appellent-elles des API déterministes sans LLM, réservant les remédiations sémantiques bornées aux seules dérives d'état avérées ?
4. **Atomicité `Transactional Outbox`** : Les serveurs `MCP` passent-ils par une table d'envoi transactionnelle (`CDC`) éliminant toute double écriture non atomique ?
5. **Enveloppe `CloudEvents 1.0` et *Claim-Check*** : Les messages portent-ils `sagaId`, `idempotencyKey`, `hopRemaining` et `traceparent`, et les artefacts lourds transitent-ils par URI signée avec hachage `SHA-256` ?
6. **Baux d'expiration (`TTL`)** : Chaque réservation amont possède-t-elle un bail d'expiration autonome dans le *System of Record* en cas de retard prolongé du rollback ?
7. **Tampon sur sorties irréversibles** : Les connecteurs externes (`EDI`, courriel client, paiement, `MES`) vérifient-ils l'absence d'annulation et la politique `Cedar` juste avant émission ?
8. **Tests de chaos sur le rollback** : Tous les chemins \(C_k \dots C_1\) et l'escalade `SagaDeadLetter` sont-ils testés par injection automatique de pannes en CI/CD ?
