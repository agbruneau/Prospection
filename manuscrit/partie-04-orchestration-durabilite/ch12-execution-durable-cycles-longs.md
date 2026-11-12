# Chapitre 12 — Moteurs d'exécution durable et gestion des cycles de vie longue durée

::: {.synthese-executive title="Synthèse exécutive — Chapitre 12"}

* **Enjeu stratégique** : Un processus d'entreprise réel ne s'achève pas en trois secondes dans l'onglet d'un navigateur ; il traverse des pannes d'API externes, des redéploiements d'infrastructure, des analyses d'experts tiers et des délais légaux ou humains de plusieurs jours. Exécuter des agents autonomes dans de simples conteneurs en mémoire vive condamne l'organisation à un dilemme inacceptable : perdre les dossiers en vol au moindre redémarrage ou réexécuter aveuglément des appels LLM coûteux et des mutations métiers déjà commises.
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Extraire intégralement la gestion d'état de progression, les temporisateurs, les politiques de réessai et l'attente d'approbation hors des cadriciels de prompts pour les ancrer dans un **moteur d'exécution durable à journal d'événements immuable**.
  2. *Structurante dès le cadrage plateforme* : Adopter une **architecture bi-vitesse** distinguant le moteur de sagas longues multi-semaines hautement auditables (`Temporal`) et le moteur léger à faible latence pour la micro-orchestration haute cadence et le sans-serveur (`Restate` ou `Durable Task`), ou assumer consciemment l'adhérence à un runtime infonuagique intégré (`Bedrock AgentCore`).
  3. *Impérative pour la sécurité et la conformité* : Imposer le chiffrement côté client des charges utiles journalisées (*Crypto-Shredding* compatible `Loi 25` / `RGPD`) ainsi qu'une **étape systématique de revalidation du monde et des droits** après toute mise en veille prolongée.
* **Indicateurs de gouvernance associés** : Taux de survie sans intervention aux redémarrages d'infrastructure (cible : 100 %), taux de double exécution d'effets de bord (cible : 0 %), consommation CPU/RAM des instances en attente d'approbation humaine (`scale-to-zero`), et zéro erreur de non-déterminisme (`NonDeterminismError`) lors des mises en production continues.

:::

## 12.1 Anatomie de la défaillance volatile et fondements formels de l'exécution durable

Examinons le comportement d'un agent d'instruction financière codé selon les habitudes classiques d'une application web `Node.js` ou `Python FastAPI` en mémoire vive. L'agent reçoit une déclaration de sinistre complexe : (1) il invoque un modèle multimodal de raisonnement pour analyser quarante pages de rapport métallurgique (durée : 22 secondes, coût : 0,48 \$ CAD) ; (2) il appelle un outil `MCP` qui crée une réserve financière provisoire dans le progiciel comptable ; (3) il envoie une demande de validation asynchrone `CIBA` au souscripteur principal ; (4) dès réception de la réponse quarante-huit heures plus tard, il déclenche l'ordre de règlement.

Dans une architecture applicative ordinaire, quatre défaillances banales transforment cette séquence linéaire en impasse opérationnelle :

1. **Éviction de conteneur ou déploiement continu (`Rolling Update`)** : Trois heures après l'envoi de la notification au souscripteur, le cluster Kubernetes recycle le pod applicatif pour appliquer un correctif de sécurité Linux. La pile d'appels en mémoire vive (`await waitForApproval()`) est détruite instantanément ; lorsque le souscripteur clique sur « Approuver » le lendemain matin, plus aucun processus ne l'attend.
2. **Le piège des points de sauvegarde naïfs (*State Checkpointing* de cadriciel LLM)** : Pour pallier la volatilité mémoire, plusieurs bibliothèques d'agents sérialisent périodiquement l'état du graphe conversationnel dans une table PostgreSQL à la fin de chaque nœud. Mais que se passe-t-il si le conteneur plante *exactement* après que le serveur `MCP` a débité la réserve dans l'ERP, mais *avant* que l'acquittement réseau n'atteigne la bibliothèque d'agent pour écrire son point de sauvegarde ? Au redémarrage, l'agent relit le dernier point connu, réinvoque le LLM (payant une seconde fois 0,48 \$ CAD et obtenant potentiellement un montant légèrement différent) et réexécute l'écriture comptable.
3. **Gaspillage massif de ressources en attente passive** : Maintenir des processus, des coroutines lourdes ou des connexions WebSocket ouvertes pendant des heures dans l'attente d'un humain ou d'un partenaire B2B immobilise inutilement de la mémoire vive et sature les tables de descripteurs réseau.
4. **Collision de versions sur les dossiers à cycle long** : Un dossier d'indemnisation ou d'octroi hypothécaire vit couramment de quatorze à soixante jours, tandis que l'équipe d'ingénierie livre trois nouvelles versions du flux par semaine. Sans mécanisme formel de versionnage d'historique en vol, modifier l'ordre de deux étapes corrompt la désérialisation de tous les dossiers ouverts sous la version précédente.

### Le modèle mathématique de l'exécution durable journalisée (*Journaled Deterministic Replay*)

L'exécution durable résout simultanément ces quatre problèmes en inversant la relation entre le code et la base de données. Au lieu de demander au développeur de découper manuellement sa logique métier en une myriade de tables d'états et de files de messages disparates, le moteur scinde l'application en **deux plans régis par des lois opposées**, comme l'illustre la figure ci-dessous.

![Mécanisme d'exécution durable par journalisation immuable, barrière d'effets de bord et reprise sur crash sans double exécution.](manuscrit/figures/fig-12-execution-durable-replay.svg)

Formellement, l'exécution d'un workflow est modélisée comme une machine à états déterministe pure \(f\) opérant sur un **journal d'événements immuable en ajout seul** (*Append-Only Event Log*) \(H_k = \langle e_1, e_2, \dots, e_k \rangle\) persisté avec consensus transactionnel :

\[S_k = f(H_k) = f(\langle e_1, e_2, \dots, e_k \rangle)\]

Cette équation simple impose une **barrière d'effets de bord stricte** (*Side-Effect Boundary*) entre deux types de composants :

* **Le code d'orchestration (`Workflow` dans `Temporal`, gestionnaire déterministe dans `Restate` ou `Durable Task`)** : Il s'écrit comme du code impératif séquentiel ordinaire (`if/else`, boucles bornées, `Promise.all`, `try/catch`), mais **ne peut exécuter aucune entrée/sortie réseau directe, lire l'horloge système `Date.now()`, ni générer de nombre aléatoire `Math.random()`**. Sa seule interaction avec le monde extérieur consiste à émettre des commandes vers le moteur durable.
* **Les unités d'effets de bord (`Activities` dans `Temporal`, blocs `ctx.run` dans `Restate`)** : C'est exclusivement de ce côté de la barrière que résident le non-déterminisme et les mutations externes — appels d'inférence LLM probabilistes (`Open Responses`), invocations d'outils `MCP`, délégations `A2A v1.0` et lectures de politiques dynamiques.

Lorsqu'une activité d'inférence LLM s'achève au pas \(i\), le moteur durable persiste atomiquement sa charge utile de retour \(r_i\) dans l'événement \(e_i\) du journal. Si le travailleur applicatif meurt brutalement au pas \(k > i\) — ou s'il a été volontairement évincé de la mémoire vive pendant neuf jours d'attente humaine (*Scale-to-Zero*) —, n'importe quel nouveau travailleur sain peut reconstruire l'état exact \(S_k\) en **rejouant** (*Replay*) le code du workflow depuis la première ligne :

1. Lorsque le rejeu rencontre `await executeActivity(extractClaim)` au pas \(i \le k\), l'intercepteur du SDK inspecte le journal local \(H_k\), constate que l'événement `ActivityTaskCompleted` correspondant existe déjà, et **retourne instantanément en mémoire (en quelques microsecondes) la valeur \(r_i\) enregistrée à l'époque**, sans jamais franchir le réseau ni rappeler le LLM.
2. Dès que le pointeur d'exécution atteint la frontière \(k + 1\) non encore inscrite au journal, le processus reprend naturellement son exécution réelle exactement là où il s'était interrompu.

### La double clé de l'exactement-une-fois de bout en bout (*End-to-End Effectively-Once*)

Une subtilité d'ingénierie critique sépare ici les architectes chevronnés des débutants : le journal du moteur durable garantit qu'une activité *complétée et journalisée* ne sera jamais réexécutée lors d'un rejeu ultérieur, mais **pendant l'exécution initiale d'une activité**, une coupure réseau entre le serveur `MCP` aval et le travailleur d'activité entraîne légitimement une sémantique *au-moins-une-fois* (*At-Least-Once*) pilotée par la politique de réessai de l'activité.

Pour obtenir une garantie **exactement-une-fois de bout en bout** sur une écriture financière ou logistique, il suffit de combiner la numérotation déterministe du journal durable avec l'idempotence protocolaire du serveur `MCP` établie en Partie II :

\[K_{\text{idemp}} = \text{HMAC-SHA256}\!\left(K_{\text{dom}}, \; \text{WfId} \;\|\; \text{Epoch} \;\|\; \text{SeqId}\right)\]

Parce que l'identifiant `WfId` (`WorkflowId`) et le numéro de séquence `SeqId` de l'étape dans le journal restent strictement invariants à travers toutes les tentatives de réessai d'une même activité (tout en différant d'une étape légitime suivante dans une boucle), le système d'enregistrement cible (`SAP S/4HANA`, `Guidewire`, `Stripe`) déduplique infailliblement tout doublon réseau transitoire.

---

## 12.2 Panorama architectural comparé des moteurs d'exécution durable en 2027

À l'horizon 2027, l'écosystème de l'exécution durable pour systèmes agentiques s'est structuré autour de **quatre plateformes majeures** aux philosophies architecturales distinctes, cartographiées à la figure ci-dessous : deux moteurs ouverts portables sur toute infrastructure (`Temporal` et `Restate`) et deux piles étroitement intégrées aux grands écosystèmes infonuagiques (`Microsoft Agent Framework` sur `Durable Task` et `Amazon Bedrock AgentCore`).

![Positionnement architectural comparé de Temporal, Restate, Microsoft Agent Framework (Durable Task) et Amazon Bedrock AgentCore.](manuscrit/figures/fig-12-comparatif-runtimes.svg)

### 1. `Temporal` et `Temporal Nexus` : la référence des sagas critiques multi-semaines

Issu des travaux fondateurs menés chez AWS et Uber puis publié sous licence ouverte MIT, `Temporal` domine en 2027 l'orchestration des processus critiques de longue durée (`T3` et `T4`) dans la banque, l'assurance, le commerce mondial et l'industrie. Son architecture repose sur un découplage complet par interrogation active (*Long-Polling Pull Model*) : les travailleurs applicatifs (*Workers*) hébergés dans les réseaux sécurisés de chaque division ouvrent des connexions sortantes gRPC/mTLS vers des files de tâches nommées (`Task Queues`) sans exposer aucun port entrant.

Deux capacités distinguent particulièrement `Temporal` dans une grande entreprise multi-divisions :

* **Fédération inter-domaines par `Temporal Nexus`** : Au lieu de partager un cluster géant unique où une équipe pourrait lire les journaux d'une autre, `Nexus` permet à un workflow de la division BSN d'invoquer une opération durable exposée par l'espace de noms isolé de la division financière BCA via un contrat RPC typé, avec propagation automatique des annulations, des délais d'expiration et de l'identité sans exposer les détails d'implémentation internes de BCA.
* **Outillage industriel de cycle de vie long** : Primitives riches de requêtes synchrones (`Queries`), de mutations validées en vol (`Updates`), de migration de version sans coupure (`Workflow Versioning / Worker Build IDs`) et de chiffrement transparent de bout en bout par `Payload Codec` client (le serveur `Temporal` Cloud ou auto-hébergé ne voit jamais passer en clair un nom d'assuré ou le texte d'un prompt).

### 2. `Restate` : le moteur léger en Rust pour la micro-orchestration haute cadence et le sans-serveur

Conçu par les créateurs originaux d'`Apache Flink`, `Restate` aborde l'exécution durable sous l'angle de la légèreté opérationnelle et de la basse latence (`T2` et `T3`). Écrit intégralement en Rust autour d'un journal distribué intégré (*Bifrost*, sans dépendance obligatoire à une lourde base Cassandra ou PostgreSQL externe), `Restate` se déploie comme un binaire unique agissant comme un proxy inverse intelligent devant les services d'agents.

Ses trois abstractions couvrent avec élégance les besoins spécifiques des flottes d'agents :

1. **`Services` durables** : Handlers RPC où chaque appel d'outil ou de LLM encapsulé dans `ctx.run(...)` est journalisé en 1 à 4 millisecondes.
2. **`Virtual Objects` adressables par clé** : Acteurs virtuels à état clé-valeur persistant garanti sans course critique (*Single-Writer per Key*). Idéal pour associer un agent jumeau à chaque numéro de série de machine (`BOR-CMP-90441`) ou à chaque panier client en sérialisant proprement les événements concurrents.
3. **Modèle *Push* HTTP/2 natif sans serveur** : Contrairement aux travailleurs permanents en boucle d'écoute, `Restate` pousse les invocations en HTTP/2 (avec streaming bidirectionnel) vers des fonctions `AWS Lambda`, `Cloud Run`, `Knative` ou des pods Kubernetes standard. Lorsqu'un agent appelle `ctx.awakeable()` pour attendre un webhook `A2A` ou une réponse humaine, `Restate` suspend immédiatement la requête HTTP, ramenant la facture de calcul de la fonction à zéro absolu jusqu'à la réception du callback.

### 3. `Microsoft Agent Framework` (`Durable Task Framework` / Azure & Dapr)

Fruit de la convergence stratégique opérée par Microsoft entre `AutoGen` (exploration multi-agents) et `Semantic Kernel` (socle d'entreprise), le **`Microsoft Agent Framework`** s'appuie en production sur le moteur éprouvé **`Durable Task Framework`** (exécutable sur `Azure Durable Functions`, le planificateur géré `Durable Task Scheduler` ou de manière portable sur Kubernetes via `Dapr Workflow`).

Sa valeur différenciante réside dans l'unification entre **état conversationnel d'agent** (*Durable Agent Threads*) et **orchestration déterministe de processus** en `.NET` (C#) et `Python`, couplée nativement à la délégation d'identité `Microsoft Entra ID On-Behalf-Of` et à l'interopérabilité directe avec les agents frontaux `Microsoft Copilot Studio`.

### 4. `Amazon Bedrock AgentCore` : sessions microVM persistantes et pile gérée AWS

Pour les organisations fortement ancrées sur AWS qui souhaitent exécuter des graphes d'agents arbitraires (`LangGraph`, `Strands Agents`, `CrewAI`, code Python/TypeScript sur mesure) sans gérer elles-mêmes d'infrastructure d'exécution ou de bacs à sable d'outils, **`Amazon Bedrock AgentCore`** fournit un runtime sans serveur d'un genre différent : chaque session d'agent s'exécute dans une **microVM dédiée matériellement isolée** pouvant maintenir son état mémoire, son système de fichiers local et ses processus d'arrière-plan pendant plusieurs heures d'activité continue, complétée par `AgentCore Gateway` (exposition `MCP` sécurisée), `AgentCore Identity` et `AgentCore Memory`. Pour les sagas réglementaires s'étalant sur plusieurs semaines (`T4`), l'architecture AWS recommandée associe `AWS Step Functions` comme colonne vertébrale macroscopique invoquant des sessions `Bedrock AgentCore` pour les phases de raisonnement intensif.

### Matrices d'évaluation et d'urbanisation

| Dimension d'ingénierie | `Temporal` (+ `Nexus`) | `Restate` | `Microsoft Agent Framework` (`Durable Task`) | `Amazon Bedrock AgentCore` |
|---|---|---|---|---|
| **Modèle de transport vers l'agent** | *Pull* gRPC sortant par Workers sur `Task Queues` | *Push* HTTP/2 / gRPC (compatible FaaS sans serveur) | *Trigger* Azure Functions ou *Sidecar* `Dapr` | Runtime géré AWS par session microVM isolée |
| **Latence de journalisation par pas** | 8 à 25 ms (persistance SQL / Cassandra multi-AZ) | **1 à 5 ms** (journal Rust `Bifrost` intégré) | 10 à 35 ms selon backend de stockage (`Scheduler` / Azure Storage) | Faible intra-session ; dépend de `Step Functions` en T4 |
| **Horizon maximal de cycle de vie** | **Mois à années** (`Continue-As-New` natif) | Minutes à semaines (`Workflows` + `Awakeables`) | Heures à semaines (`Durable Orchestrations`) | Sessions actives multi-heures ; multi-semaines via `Step Functions` |
| **État par entité (Acteur virtuel)** | Simulé par Workflow-par-Entité | **Natif** (*Virtual Objects* K/V verrouillés par clé) | Natif (*Durable Entities* / *Agent Threads*) | Session isolée + service `AgentCore Memory` |
| **Fédération inter-équipes sécurisée** | **Excellente** (`Temporal Nexus` inter-namespaces) | Bonne via contrats de services HTTP/IDL | Bonne via passerelles Azure API / `A2A` | Contrôlée par politiques `AWS IAM` inter-comptes |
| **Chiffrement client bout-en-bout** | **Natif** (`Payload Codec` AES-GCM zéro connaissance) | Supporté par intercepteurs de sérialisation SDK | Chiffrement Azure Key Vault / stockage | Chiffrement `AWS KMS` géré côté cloud |
| **Portabilité & Coût de sortie** | **Maximale** (Open Source MIT + Cloud géré multi-régions) | **Très élevée** (Binaire unique BSL/Open + Cloud) | Moyenne-haute (Code portable via `Dapr`, optimal sur Azure) | **Faible** (Fort couplage aux primitives `AWS` natives) |

| Profil de charge et contrainte métier | Runtime principal recommandé | Justification architecturale déterminante | Vigilance opérationnelle majeure |
|---|---|---|---|
| **Saga réglementée multi-jours/semaines (`T4`, Banque `BSIF E-23`, Assurance)** | **`Temporal`** | Piste d'audit immuable sur longue période, chiffrement `Payload Codec`, versionnage fin en vol et isolation `Nexus` | Dimensionner le compactage `Continue-As-New` au-delà de 10 000 événements |
| **Micro-orchestration d'agents `A2A`/`MCP` haute fréquence ou Serverless (`T2`/`T3`)** | **`Restate`** | Latence sub-5 ms imperceptible, mise à l'échelle à zéro instantanée sur FaaS et verrouillage par clé d'équipement | Encadrer strictement le déterminisme autour des appels `ctx.run` |
| **Système d'information centré `.NET`, `Entra ID` et `Copilot Studio`** | **`Microsoft Agent Framework` (`Durable Task`)** | Continuité directe entre conversation Teams, délégation `OBO` Entra et workflows C#/Python | Préférer le `Durable Task Scheduler` dédié aux files de stockage génériques à fort débit |
| **Agent analytique lourd exécutant du code Python/outils dans un environnement tout-AWS** | **`Amazon Bedrock AgentCore`** (+ `Step Functions` si T4) | Isolation matérielle microVM clé en main évitant de bâtir sa propre flotte de bacs à sable | Encapsuler la logique métier derrière des interfaces propres pour limiter le verrouillage AWS |

---

## 12.3 Patrons de code de production : workflows durables, `awakeables` et revalidation au réveil

#### Extrait 12.1 — Workflow `Temporal` de production avec versionnage en vol et approbation `CIBA` multi-jours

Ce workflow n'importe aucun module réseau ni SDK LLM : il orchestre des proxys d'activités typés, utilise `patched()` pour introduire sans coupure une règle mineure pendant que des milliers de sinistres dorment en base (tandis qu'une refonte majeure de topologie utilisera le *Worker Deployment Versioning* en mode `PINNED` afin de laisser les instances en vol s'achever sur leur révision d'origine), gère l'attente de quatorze jours avec relance au troisième jour et exécute sa compensation dans une portée `CancellationScope.nonCancellable` afin qu'une annulation externe du dossier n'empêche jamais la libération comptable.

```typescript
import {
  proxyActivities,
  defineSignal,
  defineQuery,
  setHandler,
  condition,
  patched,
  CancellationScope,
  ApplicationFailure,
} from "@temporalio/workflow";
import type * as activities from "./claimActivities";

// Configuration différenciée des délais et réessais selon la nature des activités
const {
  extractMetallurgicalReportLlm,
  evaluatePolicyCoverageMcp,
  placeProvisionalReserveMcp,
  releaseProvisionalReserveMcp,
  dispatchCibaApprovalRequest,
  executeFinalSettlementMcp,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: "2 minutes",
  heartbeatTimeout: "20 seconds",
  retry: {
    initialInterval: "2 seconds",
    backoffCoefficient: 2.0,
    maximumInterval: "1 minute",
    maximumAttempts: 4,
    nonRetryableErrorTypes: ["PolicyViolationError", "SchemaValidationError", "UnauthorizedMandateError"],
  },
});

const { revalidateWorldStateAfterWakeup } = proxyActivities<typeof activities>({
  startToCloseTimeout: "30 seconds",
  retry: { maximumAttempts: 3 },
});

export interface CibaDecisionPayload {
  readonly approved: boolean;
  readonly underwriterSubjectId: string;
  readonly signedAssertionJwt: string;
  readonly comment: string;
  readonly decidedAtIso: string;
}

export const cibaApprovalSignal = defineSignal<[CibaDecisionPayload]>(
  "bca.ciba.underwriterDecision"
);
export const claimStatusQuery = defineQuery<{ stage: string; reservedCad: number }>("bca.claim.currentStatus");

export interface ClaimWorkflowInput {
  readonly claimId: string;
  readonly policyNumber: string;
  readonly equipmentSerial: string;
  readonly reportArtifactUri: string;
  readonly initiatingBrokerId: string;
}

export async function adjudicateMachineryBreakdownClaimWorkflow(
  input: ClaimWorkflowInput
): Promise<{ outcome: "SETTLED" | "REJECTED" | "EXPIRED_ESCALATED"; finalAmountCad: number }> {
  let stage = "INITIALIZING";
  let reservedCad = 0;
  let cibaDecision: CibaDecisionPayload | null = null;

  setHandler(claimStatusQuery, () => ({ stage, reservedCad }));
  setHandler(cibaApprovalSignal, (payload) => {
    if (cibaDecision === null) {
      cibaDecision = payload;
    }
  });

  // Étape 1 : Extraction structurée du rapport d'expertise (LLM non déterministe journalisé)
  stage = "EXTRACTING_EVIDENCE";
  const extraction = await extractMetallurgicalReportLlm({
    claimId: input.claimId,
    reportArtifactUri: input.reportArtifactUri,
  });

  // Étape 2 : Vérification de couverture contractuelle via MCP (IBM i / Guidewire)
  stage = "CHECKING_COVERAGE";
  const coverage = await evaluatePolicyCoverageMcp({
    policyNumber: input.policyNumber,
    equipmentSerial: input.equipmentSerial,
    failureRootCauseCode: extraction.rootCauseCode,
    claimedAmountCad: extraction.estimatedRepairCostCad,
  });

  if (!coverage.isEligible) {
    stage = "REJECTED_BY_POLICY";
    return { outcome: "REJECTED", finalAmountCad: 0 };
  }

  // Étape 3 : Constitution d'une provision comptable compensable
  stage = "RESERVING_PROVISION";
  const reservation = await placeProvisionalReserveMcp({
    claimId: input.claimId,
    amountCad: coverage.netPayableCad,
  });
  reservedCad = coverage.netPayableCad;

  try {
    // Seuil HOTL : Au-delà de 15 000 $ CAD, approbation CIBA asynchrone obligatoire (BSIF E-23)
    if (coverage.netPayableCad > 15_000) {
      stage = "AWAITING_UNDERWRITER_CIBA";
      await dispatchCibaApprovalRequest({
        claimId: input.claimId,
        amountCad: coverage.netPayableCad,
        evidenceSummaryUri: extraction.summaryClaimCheckUri,
        escalationTier: "SENIOR_UNDERWRITER",
      });

      // Attente initiale de 3 jours calendaires (0 CPU consommé en mémoire!)
      const answeredWithin3Days = await condition(() => cibaDecision !== null, "3 days");
      if (!answeredWithin3Days) {
        await dispatchCibaApprovalRequest({
          claimId: input.claimId,
          amountCad: coverage.netPayableCad,
          evidenceSummaryUri: extraction.summaryClaimCheckUri,
          escalationTier: "CLAIMS_DIRECTOR_BACKUP",
        });
        // Fenêtre résiduelle de 11 jours (total 14 jours)
        const answeredWithin14Days = await condition(() => cibaDecision !== null, "11 days");
        if (!answeredWithin14Days) {
          await releaseProvisionalReserveMcp({ reservationId: reservation.reservationId });
          reservedCad = 0;
          stage = "EXPIRED_SLA";
          return { outcome: "EXPIRED_ESCALATED", finalAmountCad: 0 };
        }
      }

      if (!cibaDecision!.approved) {
        await releaseProvisionalReserveMcp({ reservationId: reservation.reservationId });
        reservedCad = 0;
        stage = "REJECTED_BY_UNDERWRITER";
        return { outcome: "REJECTED", finalAmountCad: 0 };
      }

      // Évolution sécurisée en vol (déployée sans casser les dossiers déjà démarrés!)
      if (patched("bca-2027-04-post-hibernation-guard")) {
        stage = "REVALIDATING_AFTER_WAKEUP";
        const driftCheck = await revalidateWorldStateAfterWakeup({
          claimId: input.claimId,
          policyNumber: input.policyNumber,
          approverSubjectId: cibaDecision!.underwriterSubjectId,
          signedAssertionJwt: cibaDecision!.signedAssertionJwt,
          expectedNetPayableCad: coverage.netPayableCad,
        });

        if (!driftCheck.canProceed) {
          throw ApplicationFailure.nonRetryable(
            `Dérive post-réveil bloquante : ${driftCheck.blockingReason}`,
            "PostHibernationDriftError"
          );
        }
      }
    }

    // Étape 4 : Décaissement définitif idempotent
    stage = "EXECUTING_SETTLEMENT";
    await executeFinalSettlementMcp({
      claimId: input.claimId,
      reservationId: reservation.reservationId,
      finalAmountCad: coverage.netPayableCad,
    });

    stage = "SETTLED";
    return { outcome: "SETTLED", finalAmountCad: coverage.netPayableCad };
  } catch (err) {
    // Portée non annulable : garantit la libération comptable même si le workflow lui-même est annulé
    if (reservedCad > 0) {
      await CancellationScope.nonCancellable(async () => {
        await releaseProvisionalReserveMcp({ reservationId: reservation.reservationId });
      });
      reservedCad = 0;
    }
    throw err;
  }
}
```

#### Extrait 12.2 — Activités `Temporal` idempotentes avec clé déterministe et battement de cœur (`Heartbeat`)

Du côté non déterministe de la barrière, l'activité dérive sa clé d'idempotence à partir des métadonnées immuables du contexte `Temporal` (`workflowId` + `activityId`), émet un battement de cœur périodique toutes les huit secondes pendant l'appel d'inférence afin de détecter sous vingt secondes un nœud GPU figé, et distingue les erreurs métiers définitives des pannes réseau réessayables.

```typescript
import { Context, ApplicationFailure } from "@temporalio/activity";
import { createHmac } from "node:crypto";

export function deriveDeterministicIdempotencyKey(domainSalt: string): string {
  const info = Context.current().info;
  return createHmac("sha256", domainSalt)
    .update(
      [info.workflowNamespace, info.workflowExecution.workflowId, info.activityId].join(":")
    )
    .digest("hex");
}

export async function extractMetallurgicalReportLlm(params: {
  claimId: string;
  reportArtifactUri: string;
}): Promise<{
  rootCauseCode: string;
  estimatedRepairCostCad: number;
  summaryClaimCheckUri: string;
}> {
  const ctx = Context.current();
  const hb = setInterval(
    () => ctx.heartbeat({ phase: "awaiting_structured_output", claimId: params.claimId }),
    8_000
  );
  try {
    const response = await fetch("https://agentgateway.internal.boreal.ca/v1/responses", {
      method: "POST",
      signal: ctx.cancellationSignal,
      headers: {
        "Content-Type": "application/json",
        "X-Idempotency-Key": deriveDeterministicIdempotencyKey("bca-llm-extract"),
      },
      body: JSON.stringify({
        model: "boreal-ca-reasoning-tier1",
        input_artifact_uri: params.reportArtifactUri,
        response_format: { type: "json_schema", schema_ref: "ossie://bca/metallurgical-finding.v2" },
      }),
    });

    if (response.status === 422 || response.status === 403) {
      const body = await response.text();
      throw ApplicationFailure.nonRetryable(body, "SchemaValidationError");
    }
    if (!response.ok) {
      throw new Error(`Erreur transitoire passerelle LLM : HTTP ${response.status}`);
    }

    return (await response.json()) as {
      rootCauseCode: string;
      estimatedRepairCostCad: number;
      summaryClaimCheckUri: string;
    };
  } finally {
    clearInterval(hb);
  }
}

export async function placeProvisionalReserveMcp(params: {
  claimId: string;
  amountCad: number;
}): Promise<{ reservationId: string }> {
  const idempotencyKey = deriveDeterministicIdempotencyKey("bca-guidewire-reserve");
  const mcpReply = await invokeBorealMcpTool<{ reservationId: string }>(
    "mcp://bca-guidewire-ledger/reserve_claim_provision",
    {
      idempotencyKey,
      claimId: params.claimId,
      amountCad: params.amountCad,
      currency: "CAD",
    }
  );
  return mcpReply;
}

declare function invokeBorealMcpTool<T>(uri: string, args: Record<string, unknown>): Promise<T>;
```

#### Extrait 12.3 — Micro-orchestration sans serveur sous `Restate` avec *Virtual Object*, `ctx.run` et `awakeable`

Pour les flux opérationnels rapides (`T2`/`T3`) où déployer un travailleur permanent par file serait disproportionné, cet extrait `Restate` illustre comment un **Objet Virtuel** indexé par le numéro de série d'un compresseur sérialise automatiquement les alertes concurrentes, journalise en quelques millisecondes l'appel d'un `SLM` via `ctx.run`, puis libère instantanément la fonction sans serveur grâce à `ctx.awakeable` jusqu'au retour du diagnostic terrain `A2A`.

```typescript
import * as restate from "@restatedev/restate-sdk";

interface TelemetryAlert {
  readonly alertId: string;
  readonly harmonicPeakHz: number;
  readonly bearingTempCelsius: number;
}

interface FieldBenchCallback {
  readonly confirmedWearLevel: "NOMINAL" | "DEGRADED" | "CRITICAL";
  readonly inspectorSpiffeId: string;
}

export const equipmentTriageObject = restate.object({
  name: "bsn.equipmentTriage",
  handlers: {
    handleAnomaly: async (ctx: restate.ObjectContext, alert: TelemetryAlert) => {
      const serialNumber = ctx.key; // Verrouillage exclusif garanti par numéro de série

      const activeIncident = await ctx.get<string>("activeIncidentId");
      if (activeIncident) {
        return { status: "DEDUPLICATED", incidentId: activeIncident };
      }

      ctx.set("activeIncidentId", alert.alertId);
      try {
        // 1. Bloc journalisé : exécuté une seule fois même si le conteneur redémarre ensuite
        const triage = await ctx.run("slm-spectral-classification", async () => {
          const res = await fetch("https://agentgateway.internal.boreal.ca/v1/slm/classify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ serialNumber, ...alert }),
          });
          if (!res.ok) throw new Error(`Échec SLM HTTP ${res.status}`);
          return (await res.json()) as { confidence: number; suspectComponent: string };
        });

        // 2. Si le doute persiste, création d'un Awakeable durable et mise en veille à 0 CPU
        if (triage.confidence < 0.90) {
          const { id: awakeableId, promise } = ctx.awakeable<FieldBenchCallback>();

          await ctx.run("delegate-a2a-deep-bench", async () => {
            await fetch("https://gateway.boreal.ca/a2a/bsn/acoustic-specialist", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                serialNumber,
                suspectComponent: triage.suspectComponent,
                callbackAwakeableId: awakeableId,
              }),
            });
          });

          // Suspension sur disque ; le bloc finally libère le verrou même en cas de TimeoutError
          const benchVerdict = await promise.orTimeout({ minutes: 45 });
          return { status: "RESOLVED_AFTER_AWAKEABLE", verdict: benchVerdict.confirmedWearLevel };
        }

        return { status: "RESOLVED_FAST_PATH", component: triage.suspectComponent };
      } finally {
        ctx.clear("activeIncidentId");
      }
    },
  },
});
```

#### Extrait 12.4 — Garde obligatoire de revalidation d'état et de mandat après réveil longue durée

Comme introduit au Chapitre 1, lorsqu'une saga se réveille après neuf jours d'attente d'un expert ou d'un souscripteur, **supposer que le monde extérieur et les habilitations de sécurité sont restés figés constitue une vulnérabilité critique** (*Time-of-Check to Time-of-Use*, `TOCTOU`). La fonction d'activité ci-dessous concrétise la garde post-hibernation appelée dans l'Extrait 12.1 : elle vérifie cryptographiquement le jeton d'approbation `CIBA`, interroge en temps réel `Microsoft Entra ID` / le moteur `Cedar` pour confirmer que le souscripteur détient *toujours* son mandat au jour du décaissement, et contrôle sur le système maître que la police d'assurance n'a pas été suspendue ou frappée d'un gel antifraude pendant le sommeil du workflow.

```typescript
export interface PostHibernationCheckInput {
  readonly claimId: string;
  readonly policyNumber: string;
  readonly approverSubjectId: string;
  readonly signedAssertionJwt: string;
  readonly expectedNetPayableCad: number;
}

export interface PostHibernationCheckResult {
  readonly canProceed: boolean;
  readonly blockingReason: string | null;
  readonly refreshedOboToken?: string;
}

export async function revalidateWorldStateAfterWakeup(
  input: PostHibernationCheckInput
): Promise<PostHibernationCheckResult> {
  // 1. Vérifier la signature CIBA et l'habilitation active de l'approbateur AU MOMENT DU RÉVEIL
  const iamCheck = await verifyActiveMandateAndExchangeObo({
    subjectId: input.approverSubjectId,
    cibaJwt: input.signedAssertionJwt,
    targetScope: "bca.claims.settle_high_value",
    amountCad: input.expectedNetPayableCad,
  });

  if (!iamCheck.active || !iamCheck.delegatedToken) {
    return {
      canProceed: false,
      blockingReason: `Mandat approbateur révoqué, expiré ou hors plafond (${iamCheck.reason})`,
    };
  }

  // 2. Relire l'état frais du System of Record (détection de dérive TOCTOU pendant le sommeil)
  const livePolicy = await fetchLivePolicySnapshotMcp(input.policyNumber);

  if (livePolicy.status !== "ACTIVE_IN_FORCE") {
    return {
      canProceed: false,
      blockingReason: `Statut police modifié durant la mise en veille : ${livePolicy.status}`,
    };
  }
  if (livePolicy.fraudFreezeFlag) {
    return {
      canProceed: false,
      blockingReason: "Gel conformité / antifraude activé sur le dossier depuis l'instruction initiale",
    };
  }
  if (livePolicy.remainingAnnualAggregateCad < input.expectedNetPayableCad) {
    return {
      canProceed: false,
      blockingReason:
        `Plafond annuel résiduel insuffisant (${livePolicy.remainingAnnualAggregateCad} CAD ` +
        `disponibles pour ${input.expectedNetPayableCad} CAD requis — sinistre concurrent réglé entre-temps)`,
    };
  }

  return {
    canProceed: true,
    blockingReason: null,
    refreshedOboToken: iamCheck.delegatedToken,
  };
}

declare function verifyActiveMandateAndExchangeObo(args: Record<string, unknown>): Promise<{
  active: boolean;
  reason?: string;
  delegatedToken?: string;
}>;
declare function fetchLivePolicySnapshotMcp(policyNumber: string): Promise<{
  status: string;
  fraudFreezeFlag: boolean;
  remainingAnnualAggregateCad: number;
}>;
```

Le troisième contrôle métier (`remainingAnnualAggregateCad`) pare un cas limite classique : pendant que le sinistre `A` attendait neuf jours la signature d'un expert, un sinistre `B` plus rapide sur la même police a pu consommer le plafond annuel de couverture ; sans cette revalidation explicite au réveil, l'agent décaisserait en sur-indemnisation contractuelle.

---

## 12.4 Ingénierie opérationnelle des cycles longs : évolution, compactage et confidentialité du journal

Déployer un moteur d'exécution durable sur des dizaines de milliers de sagas simultanées exige de maîtriser trois disciplines d'exploitation critiques.

### 1. Prévenir les erreurs de non-déterminisme (`Replay Testing` en CI/CD)

Puisque le moteur reconstruit la mémoire en rejouant le code actuel sur les événements passés, modifier imprudemment un fichier de workflow en supprimant un appel d'activité ou en inversant l'ordre de deux promesses brise la correspondance entre le code et les journaux des instances en cours : le runtime lève immédiatement une exception protectrice (`NonDeterminismError`) et gèle la progression du dossier jusqu'au déploiement d'un correctif.

Deux règles éliminent ce risque en ingénierie `AgentOps` :

* Toute modification structurelle d'un workflow actif utilise soit les **barrières de version explicites** (`patched("id-changement")` dans l'Extrait 12.1), soit l'**affectation d'exécution par version de build** (*Worker Versioning / Build IDs*), qui route les anciens dossiers vers les travailleurs de la version `v2.3` jusqu'à leur extinction naturelle tout en aiguillant les nouveaux dossiers vers `v2.4`.
* Le pipeline CI/CD intègre systématiquement une étape de **test de rejeu automatisé (`WorkflowReplayer`)** qui télécharge un échantillon d'historiques JSON réels (chiffrés ou synthétiques) des trente derniers jours et vérifie en quelques secondes que la nouvelle branche Git les rejoue sans aucune divergence.

### 2. Compactage d'historique (`Continue-As-New`) et hygiène d'état

Un journal d'événements n'est pas conçu pour grossir indéfiniment : dans `Temporal`, par exemple, une instance unique plafonne autour de 51 200 événements ou 50 Mo d'historique sérialisé. Un agent jumeau permanent qui surveille une turbine industrielle vingt-quatre heures sur vingt-quatre ne doit donc pas boucler dans une boucle `while (true)` infinie au sein de la même exécution.

Tous les \(M\) événements (typiquement \(M = 1\,000\) transitions ou une fois par période de vingt-quatre heures), le workflow invoque de manière atomique la primitive **`Continue-As-New`** : le moteur clôt proprement le journal courant pour archivage froid et instancie immédiatement une exécution fraîche partageant le même `WorkflowId`, à laquelle il transmet **uniquement l'objet d'état canonique distillé** (par exemple 4 Ko de compteurs, pointeurs vers le graphe bi-temporel `Graphiti` et baux actifs), purgeant ainsi à la fois la dette de rejeu technique et la dérive d'accumulation contextuelle.

### 3. Immuabilité du journal vs droit à l'oubli (`Loi 25` et `RGPD`) : le patron *Crypto-Shredding*

Une contradiction juridique apparente surgit dès que des données personnelles transitent par un moteur durable : le moteur exige un journal **immuable** pour le rejeu, tandis que la **Loi 25** au Québec et l'article 17 du **RGPD** européen imposent la capacité de supprimer ou d'anonymiser les renseignements personnels d'un individu sur demande légitime ou à l'échéance de rétention.

La solution architecturale normative repose sur deux mécanismes conjoints :

1. **Zéro renseignement personnel brut dans les arguments d'orchestration** : Le workflow ne manipule que des identifiants pseudonymisés (`subjectRef: "SUBJ-88412"`) et des pointeurs `Claim-Check` vers le coffre documentaire gouverné.
2. **Chiffrement par enveloppe et effacement cryptographique (*Crypto-Shredding*)** : Un `Payload Codec` client chiffre chaque charge utile d'événement en `AES-256-GCM` à l'aide d'une clé de données dérivée par client/dossier logée dans le KMS souverain de l'entreprise. En cas d'exercice du droit à l'effacement après clôture légale du dossier, la destruction irréversible de la clé spécifique rend instantanément les octets archivés dans les journaux historiques mathématiquement indéchiffrables, conciliant intégrité de la chaîne d'audit et conformité vie privée.

---

## 12.5 Application au fil rouge et éclairages sectoriels

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Dossier d'indemnisation bris de machine sur 14 jours chez BCA"}

**Processus ciblé** : Instruction de bout en bout d'un sinistre majeur d'assurance bris de machine (**185 000 \$ CAD**) à la suite de la rupture de l'arbre principal d'une presse d'emboutissage chez un équipementier automobile ontarien assuré par **Boréal Capital & Assurances (BCA)**.

**Situation antérieure et échec du premier prototype (Fin 2026)** :
Un tel dossier s'étale en moyenne sur **14 jours calendaires** car il dépend d'un rapport métallurgique externe, de vérifications sur les contrats patrimoniaux `IBM i (AS/400)`, d'une contre-expertise tarifaire des pièces avec **Boréal Équipements & Logistique (BEL)** et de la signature formelle d'un souscripteur principal habilité au-delà de 100 000 \$ CAD. Un premier prototype construit à l'automne 2026 sur un graphe d'agents Python à points de sauvegarde simples avait connu deux incidents rédhibitoires en recette : lors d'une mise à jour du conteneur au Jour 4, trois dossiers de test avaient réexécuté leur étape de réservation comptable sur l'environnement `Guidewire` pré-production, et l'absence de revalidation au réveil avait laissé passer un décaissement simulé sur une police résiliée entre-temps.

**Architecture durable déployée en production (T1–T2 2027 — Architecture bi-vitesse BCA / BSN)** :
L'équipe plateforme du Groupe Boréal déploie un cluster **`Temporal`** régional canadien (Montréal / Toronto en réplication synchrone, `Payload Codec` chiffré via clés KMS canadiennes pour conformité **Loi 25**) réservé aux sagas `T3`/`T4`, tandis que **`Restate`** assure en frontal chez **Boréal Services Numériques (BSN)** la déduplication milliseconde des rafales télématiques (Extrait 12.3) :

1. **Jour 1 (00 h 00 — 00 h 04)** : À la réception de la déclaration et des photos préliminaires, `Temporal` démarre le workflow `bca-claim-2027-009412` (Extrait 12.1). L'extraction initiale, la lecture contractuelle encapsulée sur l'`IBM i` et l'inscription d'une provision prudente idempotente de **185 000 \$ CAD** s'exécutent en **3 minutes et 40 secondes**.
2. **Jours 1 à 9 (Hibernation à coût nul et résilience aux déploiements)** : Le dossier exigeant l'analyse du laboratoire métallurgique indépendant, le workflow enregistre une attente durable. Pendant ces **9 jours**, l'instance consomme **0 millicœur CPU et 0 Mo de RAM** sur les travailleurs Kubernetes. Au **Jour 5**, l'équipe BCA déploie deux mises à jour logicielles majeures (dont l'ajout de la garde `patched("bca-2027-04-post-hibernation-guard")`) et subit un redémarrage planifié de nœuds infonuagiques : aucun des **1 420 dossiers de sinistres actifs** en sommeil n'est perturbé.
3. **Jour 10 (Réception rapport, Cellule Critique et Escalade `CIBA`)** : Le webhook signé du laboratoire dépose le rapport PDF dans le coffre et réveille le workflow. La cellule *Exécuteur–Critique* de BCA (Chapitre 11) identifie un facteur d'usure normale réduisant l'indemnité nette admissible à **162 400 \$ CAD** et transmet une demande d'approbation `CIBA` enrichie d'un comparatif visuel `A2UI` au souscripteur principal.
4. **Jour 13 et Jour 14 (Relance, Revalidation `TOCTOU` et Règlement)** : Après une relance automatique au Jour 13, le souscripteur signe cryptographiquement sa validation le Jour 14 à 09 h 12. La garde post-hibernation (Extrait 12.4) confirme en **420 millisecondes** que le mandat du souscripteur est actif dans `Entra ID`, que la police est en règle et que le plafond annuel résiduel couvre les 162 400 \$ CAD, puis ajuste la provision et émet le virement définitif.

**Résultats homologués devant le comité des risques (`BSIF E-23`)** :

* **Zéro doublon transactionnel** et **100 % de survie** sur 18 déploiements applicatifs réalisés en heures ouvrables.
* **Temps de cycle médian des sinistres lourds ramené de 29 jours à 13,5 jours** (dont 96 % du temps correspond strictement aux délais physiques externes de laboratoire et de réparation).
* **Piste d'audit déterministe exportable en un clic** reconstituant chaque entrée, version de modèle, clé d'idempotence et jeton d'approbation `CIBA` du Jour 1 au Jour 14.

:::

::: {.encadre-sectoriel title="Assurance & Crédit Hypothécaire — Orchestrer des dossiers de 30 à 90 jours entre expiration de pièces, blocage de taux et BSIF E-23"}

L'octroi d'un prêt hypothécaire résidentiel ou commercial au Canada s'étale typiquement entre **30 et 90 jours** entre la pré-qualification initiale, la levée des conditions d'inspection, l'évaluation agréée du bien immobilier, la vérification des avis de cotisation fiscale et le décaissement chez le notaire.

Dans un tel horizon temporel, **chaque preuve documentaire possède sa propre date de péremption réglementaire** : un blocage de taux d'intérêt expire à 90 jours, une attestation d'emploi à 30 jours, et une cote de bureau de crédit peut se dégrader si l'emprunteur contracte un prêt automobile deux semaines avant la signature notariale. Les institutions financières canadiennes soumises à la ligne directrice **BSIF E-23** modélisent donc chaque dossier hypothécaire comme un **workflow durable maître entouré de minuteries parallèles de validité documentaire** :

* Tant que les pièces arrivent au fil de l'eau, des travailleurs d'extraction (`SLM` / `LLM` documentaires) vérifient la cohérence croisée des revenus et immobilisent zéro ressource entre deux envois du courtier.
* Si l'acte notarié est repoussé au Jour 42, une minuterie durable invalide automatiquement l'attestation d'emploi échue, abaisse le statut d'avancement du dossier et déclenche de façon autonome une demande ciblée de talon de paie récent via le portail courtier `A2UI`.
* Quarante-huit heures avant le décaissement final des fonds en fidéicommis, une garde obligatoire de revalidation pré-clôture réinterroge les listes de sanctions (`CANAFE` / `FINTRAC`) et recalcule les ratios d'amortissement (`ABD`/`ATD`) sur la version exacte de la politique de crédit en vigueur.

:::

::: {.encadre-sectoriel title="Santé & Recherche Clinique — Parcours longitudinaux multi-mois, immuabilité du journal et effacement cryptographique (Loi 25 / RGPD)"}

Dans l'orchestration des parcours de soins oncologiques ou le suivi d'essais cliniques multicentriques de Phase III s'étendant sur **6 à 24 mois**, des agents spécialisés assistent désormais les coordonnateurs de recherche pour planifier les examens d'imagerie aux fenêtres protocolaires exactes (`J+28`, `J+84`, `J+168`), détecter précocement les effets indésirables déclarés par le patient et préparer les formulaires de pharmacovigilance.

Ce domaine cumule deux contraintes extrêmes : une **tolérance zéro à la perte d'échéance** (manquer une fenêtre biologique invalide le point de mesure statistique de l'essai) et une **protection absolue des renseignements de santé** (`Loi sur les renseignements de santé et de services sociaux` et `Loi 25` au Québec, `RGPD` en Europe, `HIPAA` aux États-Unis). L'architecture durable déployée dans les réseaux hospitaliers universitaires repose sur :

1. Des moteurs durables auto-hébergés sur infrastructure souveraine certifiée santé, utilisant `Continue-As-New` à chaque cycle thérapeutique mensuel.
2. Une séparation stricte par jeton d'anonymisation : le journal durable ne contient que le code d'inclusion clinique (`TRIAL-ONC-4419`) et les horodatages protocolaires, tandis que tout retrait de consentement d'un participant déclenche simultanément l'annulation immédiate et prouvable de toutes les minuteries futures du workflow et le *Crypto-Shredding* des charges utiles transitoires hors dossier médical légal.

:::

---

## 12.6 Décision d'architecture normative et liste de contrôle

::: {.adr title="ADR-012 — Architecture bi-vitesse d'exécution durable (Temporal + Restate) et revalidation obligatoire post-hibernation"}

* **Statut** : Acceptée | **Périmètre** : Tous les flux agentiques asynchrones ou mutatifs (`L2` à `L4`, régimes `T2` à `T4`) | **Révision** : Annuelle
* **Contexte** : L'exécution d'agents multi-étapes dans des processus applicatifs sans état ou via de simples points de sauvegarde de bibliothèques conversationnelles provoque des pertes de contexte lors des redéploiements Kubernetes, des doubles appels d'inférence coûteux, des écritures dupliquées dans les progiciels centraux et des failles `TOCTOU` après attente d'approbation humaine.
* **Options évaluées** :
  1. *Points de sauvegarde ad hoc par cadriciel Python/TS sur PostgreSQL* : **Rejetée** — ne résout ni l'idempotence atomique des effets de bord en vol, ni les minuteries distribuées à l'échelle, ni le versionnage sécurisé de code sur les dossiers de longue durée.
  2. *Tout centraliser sur un runtime propriétaire d'hyperscaler unique* : **Rejetée comme standard global** — coût de sortie élevé et incompatibilité avec les exigences de portabilité hybride Canada / Europe et d'ateliers industriels sur site.
  3. *Socle d'exécution durable ouvert à deux vitesses (`Temporal` pour les sagas métiers `T3`/`T4` + `Restate` pour la micro-orchestration haute cadence `T2`/`T3`)* : **Retenue** (avec dérogation encadrée vers `Durable Task` pour les charges exclusivement internes `.NET`/Azure).
* **Décision** :
  1. Tout flux agentique dépassant 30 secondes, enchaînant plus d'une mutation externe ou comportant une attente asynchrone (`CIBA`, webhook `A2A`) doit s'exécuter sur un moteur durable homologué : **`Temporal`** (fédéré par `Temporal Nexus` entre divisions) pour les processus critiques et multi-jours ; **`Restate`** pour les objets virtuels par équipement et l'orchestration légère sans serveur.
  2. Tout appel LLM, `MCP` ou `A2A` réside obligatoirement du côté activité (`Activity` / `ctx.run`) et transmet une clé d'idempotence dérivée par HMAC du couple `(workflowId, stepSequenceId)`.
  3. Toutes les charges utiles persistées dans les journaux durables sont chiffrées côté client (`AES-256-GCM`) sans exposition de données personnelles brutes (`Loi 25` / `RGPD`).
  4. Toute sortie de mise en veille supérieure à **15 minutes** doit impérativement exécuter une activité dédiée de **revalidation du mandat IAM et de l'état frais du *System of Record*** avant de commettre une mutation aval.
* **Conséquences** :
  * *Positives* : Résilience totale aux pannes matérielles et aux déploiements continus, coût CPU nul pendant les attentes humaines de plusieurs semaines, élimination des doubles facturations d'inférence et piste d'audit irréfutable (`BSIF E-23`).
  * *Négatives / Coûts assumés* : Apprentissage par les développeurs des règles strictes de déterminisme du code workflow, mise en place obligatoire des tests `WorkflowReplayer` en CI/CD et exploitation du service de clés KMS pour le `Payload Codec`.
* **Condition de révision** : Réévaluation annuelle selon la convergence d'interopérabilité des standards `CloudEvents` et des moteurs durables sans serveur.

:::

### Liste de contrôle de mise en production — Chapitre 12

Avant d'étendre vos workflows durables à des transactions multi-systèmes compensables par chorégraphie au **Chapitre 13**, validez systématiquement ces huit critères d'exploitation :

1. **Pureté déterministe vérifiée** : Les fichiers de définition de workflows sont-ils exempts de tout appel réseau direct, lecture d'horloge système non interceptée, génération aléatoire ou dépendance globale mutable ?
2. **Tests de rejeu en intégration continue** : Le pipeline CI/CD bloque-t-il automatiquement toute demande de fusion (`Pull Request`) qui provoque une `NonDeterminismError` sur le corpus d'historiques récents de production ?
3. **Clés d'idempotence de bout en bout** : Chaque activité mutative (`MCP` ou `A2A`) dérive-t-elle sa clé d'idempotence de l'identifiant d'exécution et du numéro de séquence du journal plutôt que d'un `UUIDv4` aléatoire régénéré à chaque réessai ?
4. **Classification explicite des exceptions** : Les erreurs définitives (rejet de politique `Cedar`, schéma invalide, autorisation refusée) sont-elles marquées comme non réessayables (`nonRetryable`) afin d'éviter des boucles inutiles de réessai ?
5. **Mise en veille réelle (`Scale-to-Zero`)** : Les attentes d'approbation humaine `CIBA` ou de partenaires externes utilisent-elles exclusivement des signaux durables et `awakeables` sans bloquer de fil d'exécution (`sleep` système ou scrutation active interdits) ?
6. **Garde de revalidation post-hibernation (`TOCTOU`)** : Tout réveil après une suspension supérieure à 15 minutes revérifie-t-il l'habilitation active de l'approbateur et l'état courant des entités métiers avant d'exécuter l'action finale ?
7. **Compactage `Continue-As-New` planifié** : Les workflows à durée de vie longue ou récurrente purgent-ils périodiquement leur historique d'événements en ne transférant qu'un résumé d'état borné ?
8. **Chiffrement client et *Crypto-Shredding*** : Un `Payload Codec` chiffre-t-il les entrées/sorties journalisées avec des clés sous contrôle de l'entreprise, et aucun renseignement personnel direct n'apparaît-il en clair dans les identifiants de workflows ou métadonnées de recherche ?
