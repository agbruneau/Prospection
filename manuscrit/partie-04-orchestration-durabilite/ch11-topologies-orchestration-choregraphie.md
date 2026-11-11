# Chapitre 11 — Topologies d'orchestration et de chorégraphie multi-agents

::: {.synthese-executive title="Synthèse exécutive — Chapitre 11"}

* **Enjeu stratégique** : Multiplier des agents spécialisés sans gouverner la géométrie de leurs interactions remplace la rigidité des anciens silos par le chaos computationnel. Une topologie mal choisie fait exploser la facture de jetons selon une loi quadratique, dilue la responsabilité réglementaire et multiplie les défaillances silencieuses en cascade (`OWASP ASI08`).
* **Décisions architecturales structurantes** :
  1. *Irréversible à l'échelle de l'entreprise* : Adopter un **modèle cellulaire fédéré** combinant une **chorégraphie événementielle** entre domaines d'affaires autonomes (`Kafka`, `Solace`) et une **orchestration déterministe** stricte à l'intérieur de chaque domaine métier.
  2. *Normative dès la conception* : Interdire tout graphe cyclique libre (« débat ouvert entre pairs ») en production et restreindre les équipes aux **six topologies canoniques homologuées**, chacune assortie de bornes dures de sauts, de budget et de temps.
  3. *Réversible par configuration* : L'affectation d'un modèle fondationnel ou d'un agent spécialiste particulier derrière un rôle topologique (exécuteur, critique, soumissionnaire), grâce au découplage par `A2A v1.0` et `Apache Ossie`.
* **Indicateurs de gouvernance associés** : Facteur d'amplification de jetons par transaction métier (*Token Amplification Factor*), nombre moyen et 99e centile de sauts inter-agents par saga, taux de convergence au premier passage des boucles critiques, et latence du chemin critique bout-en-bout.

:::

## 11.1 Orchestration centralisée vs chorégraphie décentralisée : loi d'échelle et entropie cognitive

Dès lors qu'une organisation dépasse le stade de l'agent isolé pour faire coopérer cinq, vingt ou cent agents spécialisés à travers ses lignes d'affaires, l'architecte retrouve — amplifié par la nature probabiliste des modèles de langage — le dilemme fondateur des systèmes distribués : faut-il confier la conduite du flux à un chef d'orchestre central (**orchestration**) ou laisser chaque acteur réagir de manière autonome aux faits publiés sur un bus d'événements (**chorégraphie**) ?

Entre 2024 et 2025, la majorité des cadriciels multi-agents expérimentaux ont éludé cette question en popularisant une métaphore trompeuse : celle de la « salle de réunion virtuelle » où plusieurs agents dotés de personnalités distinctes conversent librement dans un fil de discussion partagé jusqu'à dégager un consensus. Séduisante sur une démonstration de laboratoire à trois tours, cette approche échoue systématiquement en production industrielle pour trois raisons mathématiques et économiques mesurables.

### L'explosion quadratique des communications et la dilution attentionnelle

Considérons un ensemble de \(n\) agents coopérant sur un dossier complexe. Dans un maillage conversationnel non contraint où chaque agent peut interpeller n'importe quel pair et reçoit l'historique complet des échanges précédents, le nombre de canaux d'interaction potentiels croît selon :

\[C(n) = \frac{n(n - 1)}{2} \in O(n^2)\]

Plus grave encore que le nombre de messages est la **croissance quadratique de la consommation de jetons d'entrée**. Si chaque tour \(t \in \{1, \dots, T\}\) ajoute en moyenne \(L\) jetons au tampon conversationnel partagé, le volume cumulé de jetons facturés et traités par les mécanismes d'attention au bout de \(T\) tours atteint :

\[V_{\text{jetons}}(T) = \sum_{t=1}^{T} (L_0 + t \cdot L) = T \cdot L_0 + \frac{T(T + 1)}{2} L\]

où \(L_0\) désigne l'empreinte initiale des consignes système et des schémas d'outils. Au-delà de huit à dix échanges croisés, trois dégradations simultanées frappent le système :

1. **Érosion du rapport signal/bruit (*Context Rot*)** : Les hypothèses intermédiaires erronées émises au tour 2 demeurent présentes dans la fenêtre de contexte au tour 9 et continuent d'influencer les poids d'attention des agents aval, même après avoir été réfutées.
2. **Contagion des rationalisations (`OWASP ASI08`)** : Lorsqu'un agent amont formule une déduction inexacte avec un ton assertif, les agents pairs tendent statistiquement à s'aligner sur cette prémisse par biais de sycophantie inter-modèles plutôt que de la contredire.
3. **Destruction de l'efficacité du `KV-cache`** : Lorsque chaque agent possède un préfixe système différent mais réingère dans le désordre les interventions des autres participants, les moteurs d'inférence ne peuvent plus réutiliser efficacement les préfixes mis en cache, multipliant simultanément le coût financier et le temps d'attente du premier jeton (*Time-to-First-Token*).

### La dualité architecturale : gouverner localement, fédérer globalement

Pour échapper aussi bien à l'anarchie du maillage libre qu'à la fragilité d'un orchestrateur monolithique omniscient qui tenterait de régenter toute l'entreprise, l'urbanisation agentique de 2027 applique le principe de **dualité échelle-couplage** hérité du *Domain-Driven Design* (DDD) :

* **À l'intérieur d'un contexte borné (*Bounded Context*) — Primauté de l'orchestration déterministe** : Lorsqu'un processus appartient à un domaine métier unique soumis à une responsabilité claire (par exemple l'instruction d'une réclamation d'assurance chez BCA ou le diagnostic complet d'une alerte machine chez BSN), un coordinateur explicite pilote les étapes, détient l'état d'avancement, applique les délais de garde et agrège les preuves. La visibilité opérationnelle y est immédiate : un seul identifiant d'exécution résume exactement où en est le dossier.
* **Entre domaines d'affaires distincts — Primauté de la chorégraphie événementielle** : Lorsque la clôture d'un diagnostic technique chez BSN doit déclencher à la fois une mise à jour du risque client dans le CRM, un réajustement des prévisions de pièces dans l'ERP industriel et une écriture analytique de provision financière, aucun orchestrateur central ne doit coupler ces trois divisions. Le domaine source publie un événement métier immuable et sémantiquement typé (`EquipmentFailureDiagnosed.v2`, conforme à `Apache Ossie`) sur le courtier d'entreprise (`Kafka` ou `Solace`), et chaque domaine abonné déclenche en toute autonomie son propre micro-orchestrateur interne.

Le tableau ci-dessous formalise les compromis d'ingénierie entre ces trois régimes macroscopiques.

| Critère d'urbanisation | Orchestration monolithique globale | Chorégraphie pure intégrale | Architecture cellulaire fédérée (Standard 2027) |
|---|---|---|---|
| **Autorité de flux** | Un seul moteur central pilote toutes les divisions | Aucun point central ; réactions par chaînes d'événements | Chorégraphie inter-domaines + orchestration intra-domaine |
| **Couplage organisationnel** | Très fort : chaque changement local touche le flux maître | Très faible : ajout d'abonnés sans modifier l'émetteur | Optimal : contrats d'événements stables aux frontières |
| **Visibilité d'un processus** | Native dans la console du moteur central | Difficile : le flux émerge implicitement des journaux | Reconstruite par corrélation `OpenTelemetry` (`traceparent`) |
| **Gestion des échecs globaux** | Blocs `try/catch` et compensation pilotée | Événements compensatoires en cascade complexes à tester | Sagas locales orchestrées + événements d'annulation typés |
| **Rayon d'impact d'une panne** | Critique (point de défaillance unique logique) | Confiné par file d'attente et mémoire tampon du courtier | Isolé par cellule métier avec découplage temporel |
| **Conformité réglementaire** | Lourde (tout le graphe hérite de la cote maximale) | Audit laborieux des chaînes causales émergentes | Cloisonnement net du périmètre `BSIF E-23` / `EU AI Act` |

---

## 11.2 Anatomie comparative des six topologies canoniques multi-agents en 2027

Une fois les frontières de domaines tracées, comment structurer concrètement la collaboration des agents *à l'intérieur* d'une cellule orchestrée ou d'un sous-réseau coopératif ? L'expérience industrielle accumulée fin 2026 montre que la quasi-totalité des cas d'usage de production se ramène à **six topologies canoniques**, illustrées à la figure ci-dessous. Toute architecture candidate devrait justifier explicitement laquelle de ces six structures elle instancie — ou comment elle les compose hiérarchiquement.

![Comparaison architecturale des six topologies multi-agents de production en 2027.](manuscrit/figures/fig-11-topologies-mas.svg)

### 1. Topologie à superviseur hiérarchique (*Hierarchical Supervisor / Router*)

Dans cette configuration en étoile (ou en arbre à deux niveaux lorsque des superviseurs de domaine chapeautent eux-mêmes des travailleurs spécialisés), un nœud coordinateur reçoit l'intention entrante, sélectionne un ou plusieurs agents spécialistes à partir de leurs `Agent Cards A2A v1.0`, leur transmet un sous-mandat ciblé et consolide leurs réponses structurées.

* **Forces d'ingénierie** : La complexité communicationnelle reste linéaire en \(O(k)\) pour \(k\) spécialistes sollicités. Les agents feuilles s'ignorent mutuellement, ce qui garantit qu'une compromission ou une dérive d'un spécialiste ne contamine pas latéralement le contexte des autres.
* **Piège majeur en production — Le syndrome du « superviseur entonnoir » (*Context Funnel*)** : Si un agent spécialiste d'extraction retourne un document JSON de 40 000 jetons au superviseur afin que celui-ci le retransmette à un second spécialiste, le superviseur paie deux fois la taxe de sérialisation/génération LLM et risque de tronquer ou d'altérer des identifiants critiques au passage.
* **Remède architectural obligatoire** : Appliquer systématiquement le patron **Passage par référence (*Claim-Check Pattern*)**. Le spécialiste n° 1 dépose l'artefact volumineux dans un magasin d'objets chiffré à bail court et ne retourne au superviseur qu'un résumé de 150 jetons accompagné d'un pointeur URI signé (`a2a://artifacts/sha256-...`), que le superviseur transmet tel quel au spécialiste n° 2.

### 2. Topologie Planificateur–Exécuteur–Critique bornée (*Bounded Planner–Executor–Critic*)

Inspirée des architectures de contrôle en boucle fermée et de la revue par les pairs, cette topologie sépare trois rôles cognitifs asymétriques : le **Planificateur** structure la démarche, l'**Exécuteur** génère l'artefact ou prépare la transaction via ses outils `MCP`, et le **Critique** évalue le résultat face aux pièces justificatives, aux invariants métiers et aux politiques de conformité avant d'autoriser la sortie ou d'exiger une révision ciblée.

* **Invariant d'indépendance épistémique** : Faire jouer l'Exécuteur et le Critique par le même modèle fondationnel (avec deux consignes système différentes) ne corrige qu'une fraction marginale des erreurs, car le modèle partage les mêmes angles morts paramétriques et valide ses propres hallucinations avec une confiance élevée. En production 2027, **le Critique doit combiner des vérificateurs déterministes (schémas JSON, moteurs `Cedar`/`OPA`, solveurs arithmétiques) et un modèle évaluateur issu d'une famille d'entraînement distincte** de celle de l'Exécuteur.
* **Condition d'arrêt stricte** : La boucle de rétroaction est bornée par une constante dure \(N_{\max} \in \{2, 3\}\) et par un détecteur de convergence. Si l'écart sémantique entre deux révisions successives stagne ou si le plafond \(N_{\max}\) est atteint sans feu vert du Critique, l'exécution n'échoue pas silencieusement : elle bascule de manière déterministe en escalade `HOTL` avec le journal exact des objections du Critique.

### 3. Graphe orienté acyclique dynamique typé (*Dynamic Typed DAG / Plan-then-Execute*)

Contrairement à une boucle *ReAct* où l'agent improvise chaque prochain pas après avoir observé le pas précédent — enchaînant séquentiellement dix appels LLM coûteux —, le patron *Plan-then-Execute* scinde l'exécution en deux temps distincts :

1. **Phase de compilation cognitive** : Un modèle de raisonnement analyse la requête une seule fois et émet un graphe orienté acyclique (`DAG`) déclaratif dont chaque nœud référence une compétence `OASF`/`A2A` ou un outil `MCP` répertorié, avec liaison explicite des entrées/sorties typées.
2. **Phase de validation et d'ordonnancement déterministe** : Avant toute exécution, le moteur de plateforme vérifie hors LLM que le graphe est strictement acyclique (algorithme de tri topologique de Kahn), que tous les schémas `Apache Ossie` connectés sont compatibles, que l'identité appelante détient les portées requises et que le coût estimé cumulé des nœuds respecte le budget de l'`ActionEnvelope`. Il exécute ensuite en parallèle maximal (*Fan-out / Fan-in*) toutes les branches indépendantes.

Sur les processus de collecte multi-sources, d'audit de conformité ou d'enrichissement client 360°, cette topologie divise couramment la latence bout-en-bout par un facteur 3 à 5 et réduit de 60 % la facture de jetons en supprimant les appels de routage intermédiaires. Si un nœud échoue sur une surprise métier imprévisible, le moteur invoque une **replanification locale de sous-graphe** limitée aux seuls nœuds aval affectés.

### 4. Topologie à tableau noir partagé (*Shared Blackboard*)

Issue des premiers systèmes experts acoustiques (Hearsay-II) et réinventée en 2026–2027 sur des magasins d'état transactionnels rapides, l'architecture à tableau noir inverse le couplage : aucun orchestrateur ne connaît à l'avance l'ordre dans lequel les spécialistes doivent intervenir. Le dossier est matérialisé sous forme d'un **espace mémoire structuré et versionné** comportant les observations brutes, les hypothèses actives assorties d'intervalles de confiance, les pistes réfutées et un prédicat formel de résolution.

Des agents spécialistes indépendants observent les mutations du tableau noir. Dès qu'un fait relevant de sa compétence apparaît (par exemple l'ajout d'une anomalie BGP ou d'une signature spectrale haute fréquence), le spécialiste compétent lit l'état courant, exécute ses investigations `MCP` et publie une transaction atomique d'enrichissement protégée par un contrôle de concurrence optimiste (*Compare-And-Swap* sur numéro de révision `ETag`). Un contrôleur léger évalue après chaque mutation si le prédicat d'arrêt (confiance \(\ge 0,92\) sur une cause racine corroborée, ou épuisement du budget temporel) est satisfait. C'est la topologie reine du diagnostic d'incidents cyber-physiques, de la réponse aux incidents de sécurité (`SOC`) et des opérations réseau complexes.

### 5. Réseau contractuel à enchères internes (*Contract Net Protocol — CNP*)

Lorsque plusieurs agents, fournisseurs internes ou passerelles externes peuvent accomplir une même tâche mais avec des profils de coût, de charge instantanée, de localisation géographique ou de qualité variables en temps réel, un routage statique devient sous-optimal. Formalisé à l'origine par Reid Smith puis standardisé par la FIPA avant d'être transposé sur `A2A v1.0` et `AGNTCY SLIM`, le protocole *Contract Net* institue un micro-marché interne en quatre phases :

1. **Annonce (`Call for Proposals` / `TaskAnnouncement`)** : L'adjudicateur diffuse aux candidats qualifiés le cahier des charges typé (objectif, contraintes de résidence des données, échéance maximale, plafond budgétaire).
2. **Soumission (`Bid`)** : Chaque agent candidat interroge sa propre file d'attente, ses stocks locaux ou le coût courant de son modèle sous-jacent, puis soumet une offre chiffrée engageante (ou un refus explicite `Refuse` s'il est saturé).
3. **Adjudication déterministe (`Evaluation & Award`)** : Un algorithme déterministe (jamais un prompt subjectif sensible à l'auto-promotion!) classe les offres valides selon une fonction d'utilité pondérée et attribue le mandat exclusif au lauréat via un jeton `TaskAward` borné dans le temps.
4. **Exécution et reddition (`Result / Penalty`)** : L'écart entre la promesse de la soumission (latence, exactitude) et la performance réelle met à jour le score de réputation historique de l'agent dans le registre de plateforme, empêchant structurellement tout agent mal calibré de « sur-promettre » pour remporter les enchères.

### 6. Topologie hybride BPMN 2.0 / DMN + sous-graphes agentiques bornés

Dans les secteurs hautement réglementés (banque sous `BSIF E-23`, assurance, santé, aéronautique, secteur public), le flux directeur d'un dossier ne peut en aucun cas dépendre de l'interprétation d'un modèle de langage : la séquence légale des notifications, les délais de rétractation, les contrôles anti-blanchiment (`KYC`/`AML`) et les seuils de délégation de signature doivent être prouvables mathématiquement.

L'architecture hybride conserve un moteur de processus métier normatif (**ISO/IEC 19510 BPMN 2.0** couplé aux tables de règles **OMG DMN**, exécuté sur des plateformes telles que `Camunda 8 / Zeebe`, `UiPath Maestro` ou `IBM BAMOE`) comme **épine dorsale maîtresse**. À l'intérieur de ce graphe déterministe, seules les étapes nécessitant réellement une synthèse documentaire non structurée, un rapprochement sémantique flou ou une négociation assistée sont déléguées à une `Service Task` encapsulant un sous-graphe agentique borné (typiquement une cellule Planificateur–Exécuteur–Critique). Dès que la cellule retourne sa recommandation structurée, une porte déterministe DMN reprend immédiatement la main pour valider les seuils d'affaires avant toute écriture dans le système d'enregistrement.

### Matrice multicritère de sélection topologique

Le tableau ci-dessous fournit aux architectes d'entreprise la grille de décision comparative entre ces six topologies sur les sept critères d'homologation industrielle.

| Topologie multi-agents | Latence bout-en-bout | Multiplicateur coût jetons | Déterminisme du parcours | Tolérance aux pannes partielles | Auditabilité prudentielle | Risque dominant (`OWASP ASI`) | Cas d'usage de référence |
|---|---|---|---|---|---|---|---|
| **1. Superviseur hiérarchique** | Moyenne (séquentielle ou semi-parallèle) | Faible à modéré (\(1,3\times\) à \(2,0\times\)) | Moyen-élevé (étoile contrôlée) | Bonne (réessai ou repli par feuille) | Élevée si `Claim-Check` actif | `ASI01` / Surcharge du nœud racine | Triage omnicanal, assistance employé multi-applications |
| **2. Planificateur–Exécuteur–Critique** | Moyenne à haute (\(1\) à \(3\) cycles) | Modéré à élevé (\(2,2\times\) à \(3,8\times\)) | Moyen (boucle bornée par \(N_{\max}\)) | Élevée (auto-correction sémantique) | Très élevée (journal des objections) | Collusion de biais si même famille LLM | Souscription complexe, génération de code/SQL, analyse légale |
| **3. DAG dynamique typé** | **Très faible** (parallélisme maximal) | **Très faible** (\(1,1\times\) à \(1,5\times\)) | Élevé une fois le DAG compilé | Moyenne (recompilation locale sur échec) | Très élevée (graphe figé avant action) | Mauvaise décomposition initiale | Vue 360° client, audit multi-systèmes, due diligence |
| **4. Tableau noir partagé** | Variable (convergence opportuniste) | Modéré à élevé selon nombre d'experts | Faible sur l'ordre, strict sur l'arrêt | **Excellente** (experts découplés) | Bonne via journal des révisions `ETag` | `ASI06` Empoisonnement d'état partagé | Diagnostic racine (`RCA`) télécoms, cyber `SOC`, maintenance `OT` |
| **5. Enchères *Contract Net*** | Moyenne (+1 aller-retour d'enchère) | Modéré (annonces légères JSON) | Élevé (adjudication algébrique) | **Excellente** (routage hors nœuds saturés) | Élevée (traces d'offres et scores) | Sur-promesse d'agent mal calibré | Allocation logistique multi-dépôts, approvisionnement B2B, routage GPU |
| **6. Hybride BPMN/DMN + Cellule** | Calibrée par SLA métier | Minimal (IA confinée aux nœuds flous) | **Maximal** (ISO 19510 + DMN) | Très élevée (compensations natives BPMN) | **Maximale** (`BSIF E-23`, `FDA`, `ISO`) | Friction d'évolution si mal découpé | Octroi crédit, indemnisation assurance, dossiers réglementés |

---

## 11.3 Implémentation de référence des trois patrons d'ingénierie critiques

Passons des principes aux implémentations concrètes telles qu'elles s'écrivent dans un socle de plateforme en 2027. Les trois extraits qui suivent couvrent les mécanismes où les erreurs d'implémentation coûtent le plus cher en production : le bornage strict d'une boucle réflexive Exécuteur–Critique, l'adjudication mathématique d'une enchère *Contract Net* et l'insertion sécurisée d'une cellule cognitive dans un flux BPMN/DMN.

### Extrait 11.1 — Cellule Planificateur–Exécuteur–Critique bornée à hétérogénéité de modèles obligatoire

Cet orchestrateur TypeScript impose par construction quatre garde-fous absents des cadriciels naïfs : il vérifie au démarrage que l'Exécuteur et le Critique appartiennent à deux familles de fournisseurs distinctes, comptabilise chaque centime consommé sur le budget de l'`ActionEnvelope`, détecte la stagnation des critiques d'un tour sur l'autre par empreinte normalisée, et bascule proprement en escalade `HOTL` plutôt que de livrer une sortie non homologuée.

```typescript
import { createHash } from "node:crypto";

export interface ModelEndpointDescriptor {
  readonly providerFamily: "anthropic" | "openai" | "google" | "mistral" | "meta-local";
  readonly modelId: string;
  readonly gatewayRoute: string;
}

export interface CriticVerdict {
  readonly approved: boolean;
  readonly severityScore: number; // 0.0 (conforme) à 1.0 (blocage critique)
  readonly violatedInvariants: ReadonlyArray<string>;
  readonly actionableFeedback: string;
  readonly tokenCostCad: number;
}

export interface ExecutionAttempt<TOutput> {
  readonly draft: TOutput;
  readonly evidenceUris: ReadonlyArray<string>;
  readonly tokenCostCad: number;
}

export type BoundedCellOutcome<TOutput> =
  | { readonly status: "APPROVED"; readonly output: TOutput; readonly iterations: number; readonly totalCostCad: number }
  | { readonly status: "ESCALATE_HOTL"; readonly lastDraft: TOutput; readonly reason: string; readonly auditTrail: ReadonlyArray<CriticVerdict> };

export class BoundedPECOrchestrator<TInput, TOutput> {
  private readonly maxIterations: number;

  constructor(
    private readonly executorModel: ModelEndpointDescriptor,
    private readonly criticModel: ModelEndpointDescriptor,
    private readonly executeStep: (input: TInput, feedback: string | null) => Promise<ExecutionAttempt<TOutput>>,
    private readonly evaluateStep: (input: TInput, attempt: ExecutionAttempt<TOutput>) => Promise<CriticVerdict>,
    private readonly deterministicPolicyCheck: (draft: TOutput) => ReadonlyArray<string>,
    options: { maxIterations?: number } = {}
  ) {
    if (executorModel.providerFamily === criticModel.providerFamily) {
      throw new Error(
        `Violation ADR-011 : L'Exécuteur (${executorModel.modelId}) et le Critique ` +
        `(${criticModel.modelId}) doivent appartenir à des familles de modèles distinctes.`
      );
    }
    this.maxIterations = Math.min(Math.max(options.maxIterations ?? 3, 1), 4);
  }

  public async runBoundedCell(
    input: TInput,
    maxBudgetCad: number
  ): Promise<BoundedCellOutcome<TOutput>> {
    let spentCad = 0;
    let priorFeedback: string | null = null;
    const seenViolationHashes = new Set<string>();
    const auditTrail: CriticVerdict[] = [];
    let latestAttempt: ExecutionAttempt<TOutput> | null = null;

    for (let iteration = 1; iteration <= this.maxIterations; iteration++) {
      latestAttempt = await this.executeStep(input, priorFeedback);
      spentCad += latestAttempt.tokenCostCad;

      if (spentCad > maxBudgetCad) {
        return {
          status: "ESCALATE_HOTL",
          lastDraft: latestAttempt.draft,
          reason: `Plafond budgétaire cellule dépassé (${spentCad.toFixed(3)} / ${maxBudgetCad.toFixed(3)} CAD)`,
          auditTrail,
        };
      }

      // 1. Garde déterministe rapide (gratuit et infaillible) avant d'appeler le Critique LLM
      const hardViolations = this.deterministicPolicyCheck(latestAttempt.draft);
      if (hardViolations.length > 0) {
        priorFeedback = `Violations déterministes bloquantes : ${hardViolations.join(" | ")}`;
        continue;
      }

      // 2. Évaluation sémantique indépendante par le Critique hétérogène
      const verdict = await this.evaluateStep(input, latestAttempt);
      spentCad += verdict.tokenCostCad;
      auditTrail.push(verdict);

      if (verdict.approved && verdict.violatedInvariants.length === 0) {
        return {
          status: "APPROVED",
          output: latestAttempt.draft,
          iterations: iteration,
          totalCostCad: spentCad,
        };
      }

      // 3. Détection de stagnation : si l'Exécuteur reproduit exactement les mêmes fautes, inutile de boucler
      const violationSignature = createHash("sha256")
        .update([...verdict.violatedInvariants].sort().join("::"))
        .digest("hex");

      if (seenViolationHashes.has(violationSignature)) {
        return {
          status: "ESCALATE_HOTL",
          lastDraft: latestAttempt.draft,
          reason: `Stagnation cognitive détectée à l'itération ${iteration} sur les mêmes invariants`,
          auditTrail,
        };
      }

      seenViolationHashes.add(violationSignature);
      priorFeedback = verdict.actionableFeedback;
    }

    return {
      status: "ESCALATE_HOTL",
      lastDraft: latestAttempt!.draft,
      reason: `Convergence non atteinte après le plafond dur de ${this.maxIterations} itérations`,
      auditTrail,
    };
  }
}
```

### Extrait 11.2 — Adjudicateur typé d'enchères internes *Contract Net Protocol* (`CNP`) sur `A2A v1.0`

Dans ce deuxième patron, un coordinateur logistique sollicite simultanément plusieurs agents de centres de distribution ou transporteurs homologués. Notez que le choix du soumissionnaire gagnant repose sur une **fonction de score multicritère normalisée et pondérée par le score de fiabilité historique vérifié par la plateforme** (`historicalPassK`), neutralisant toute tentative d'un agent tiers de gonfler artificiellement sa confiance déclarée.

```typescript
export interface TaskAnnouncement {
  readonly cfpId: string;
  readonly capabilityOasfUri: string;
  readonly requiredJurisdiction: "CA-QC" | "CA-ON" | "US-EAST" | "EU-DE";
  readonly maxAcceptableLatencyMs: number;
  readonly reservePriceCad: number;
  readonly bidSubmissionWindowMs: number;
  readonly payloadSchemaRef: string;
}

export interface AgentBid {
  readonly cfpId: string;
  readonly bidderAgentId: string;
  readonly bidderSpiffeId: string;
  readonly jurisdiction: "CA-QC" | "CA-ON" | "US-EAST" | "EU-DE";
  readonly quotedCostCad: number;
  readonly guaranteedP95LatencyMs: number;
  readonly selfReportedConfidence: number; // 0..1 (pondéré avec prudence!)
  readonly capacityHoldUntilIso: string;
}

export interface PlatformReputationRecord {
  readonly verifiedPassKScore: number;     // Mesuré par télémétrie réelle (0..1)
  readonly slaComplianceRate30d: number;   // Taux de respect des délais promis (0..1)
}

export interface TaskAward {
  readonly awardId: string;
  readonly cfpId: string;
  readonly winningBidderAgentId: string;
  readonly agreedMaxCostCad: number;
  readonly leaseExpiresAtIso: string;
  readonly utilityScore: number;
  readonly runnerUpAgentId: string | null;
}

export function adjudicateContractNetBids(
  announcement: TaskAnnouncement,
  bids: ReadonlyArray<AgentBid>,
  reputationLedger: ReadonlyMap<string, PlatformReputationRecord>
): TaskAward | null {
  // 1. Filtrage éliminatoire strict (contraintes réglementaires, plafond FinOps et SLA)
  const eligibleBids = bids.filter((bid) => {
    const rep = reputationLedger.get(bid.bidderAgentId);
    if (!rep || rep.verifiedPassKScore < 0.80) return false;
    if (bid.jurisdiction !== announcement.requiredJurisdiction) return false;
    if (bid.quotedCostCad <= 0 || bid.quotedCostCad > announcement.reservePriceCad) return false;
    if (bid.guaranteedP95LatencyMs > announcement.maxAcceptableLatencyMs) return false;
    return true;
  });

  if (eligibleBids.length === 0) {
    return null;
  }

  // 2. Évaluation déterministe : 45 % Fiabilité prouvée, 35 % Économie, 20 % Vélocité
  const scored = eligibleBids.map((bid) => {
    const rep = reputationLedger.get(bid.bidderAgentId)!;
    const costEfficiency = 1 - bid.quotedCostCad / announcement.reservePriceCad;
    const speedEfficiency = 1 - bid.guaranteedP95LatencyMs / announcement.maxAcceptableLatencyMs;
    const calibratedReliability =
      0.85 * (rep.verifiedPassKScore * rep.slaComplianceRate30d) +
      0.15 * Math.min(Math.max(bid.selfReportedConfidence, 0), 1);

    const utilityScore =
      0.45 * calibratedReliability +
      0.35 * costEfficiency +
      0.20 * speedEfficiency;

    return { bid, utilityScore };
  });

  scored.sort((a, b) => b.utilityScore - a.utilityScore);

  const winner = scored[0];
  const runnerUp = scored.length > 1 ? scored[1].bid.bidderAgentId : null;

  return {
    awardId: `award-${announcement.cfpId}-${Date.now()}`,
    cfpId: announcement.cfpId,
    winningBidderAgentId: winner.bid.bidderAgentId,
    agreedMaxCostCad: winner.bid.quotedCostCad,
    leaseExpiresAtIso: winner.bid.capacityHoldUntilIso,
    utilityScore: Number(winner.utilityScore.toFixed(4)),
    runnerUpAgentId: runnerUp,
  };
}
```

### Extrait 11.3 — Encapsulation d'une cellule cognitive dans un processus réglementé BPMN 2.0 / DMN

Ce fragment BPMN 2.0 exécutable (compatible avec le moteur distribué `Camunda 8 / Zeebe`) montre comment l'entreprise insère une délégation `A2A` bornée entre deux barrières déterministes : une table de décision DMN amont vérifiant la recevabilité contractuelle, un minuteur d'expiration attaché en frontière (`boundaryEvent`) de la tâche agentique afin qu'aucune lenteur d'inférence ne bloque indéfiniment le dossier, et une passerelle exclusive (`exclusiveGateway`) aval routant vers l'enregistrement automatique ou vers un souscripteur humain.

```xml
<bpmn:process id="bca-claim-adjudication-v3" name="Instruction Sinistre Sous Contrôle BSIF E-23" isExecutable="true">

  <!-- 1. Filtre déterministe amont : Table DMN d'admissibilité contractuelle de base -->
  <bpmn:businessRuleTask id="Task_PreCheckDMN" name="Vérifier Franchise et Statut Police (DMN)">
    <bpmn:extensionElements>
      <zeebe:calledDecision decisionId="dmn-policy-eligibility-v4" resultVariable="preCheck" />
    </bpmn:extensionElements>
  </bpmn:businessRuleTask>

  <!-- 2. Cellule cognitive bornée invoquée via connecteur A2A gouverné -->
  <bpmn:serviceTask id="Task_AgenticTechnicalReview" name="Cellule A2A : Analyse Rapport Expertise &amp; Clauses">
    <bpmn:extensionElements>
      <zeebe:taskDefinition type="io.boreal.a2a.bounded-pec-worker:v2" retries="2" />
      <zeebe:taskHeaders>
        <zeebe:header key="targetAgentCard"
          value="https://gateway.boreal.ca/a2a/bca/claims-pec" />
        <zeebe:header key="maxIterations" value="3" />
        <zeebe:header key="maxBudgetCad" value="1.85" />
        <zeebe:header key="requiredOboScope" value="bca.claims.analyze_technical_report" />
      </zeebe:taskHeaders>
    </bpmn:extensionElements>
  </bpmn:serviceTask>

  <!-- Barrière temporelle déterministe : interruption propre si la cellule dépasse 90 secondes -->
  <bpmn:boundaryEvent id="Timer_AgentSlaBreach" attachedToRef="Task_AgenticTechnicalReview" cancelActivity="true">
    <bpmn:timerEventDefinition>
      <bpmn:timeDuration xsi:type="bpmn:tFormalExpression">PT90S</bpmn:timeDuration>
    </bpmn:timerEventDefinition>
  </bpmn:boundaryEvent>

  <!-- 3. Table DMN aval de gouvernance HOTL (aucun commit direct sur la seule foi du LLM) -->
  <bpmn:businessRuleTask id="Task_PostGateDMN" name="Statuer Autorisation Décaissement vs Escalade HOTL (DMN)">
    <bpmn:extensionElements>
      <zeebe:calledDecision decisionId="dmn-e23-disbursement-gate" resultVariable="gateDecision" />
    </bpmn:extensionElements>
  </bpmn:businessRuleTask>

  <bpmn:exclusiveGateway id="Gw_RouteAuthorization" name="Décision Porte DMN" default="Flow_ToHumanUnderwriter" />

  <bpmn:sequenceFlow id="Flow_1" sourceRef="Task_PreCheckDMN" targetRef="Task_AgenticTechnicalReview" />
  <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_AgenticTechnicalReview" targetRef="Task_PostGateDMN" />
  <bpmn:sequenceFlow id="Flow_TimeoutFallback" sourceRef="Timer_AgentSlaBreach" targetRef="Task_HumanUnderwriterReview" />
  <bpmn:sequenceFlow id="Flow_AutoCommit" sourceRef="Gw_RouteAuthorization" targetRef="Task_CommitGuidewire">
    <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">
      = gateDecision.allowStraightThrough = true and agentResult.status = "APPROVED" and claimAmountCad &lt;= 10000
    </bpmn:conditionExpression>
  </bpmn:sequenceFlow>
  <bpmn:sequenceFlow id="Flow_ToHumanUnderwriter" sourceRef="Gw_RouteAuthorization" targetRef="Task_HumanUnderwriterReview" />

</bpmn:process>
```

---

## 11.4 Gouvernance anti-dérive des graphes multi-agents : coupe-circuits topologiques et anti-patrons

Même lorsqu'une équipe choisit initialement une topologie saine, la maintenance continue des consignes système, l'ajout de nouveaux agents spécialistes dans l'annuaire `OASF` et l'évolution silencieuse des poids des modèles fondationnels introduisent des pathologies structurelles en production. L'ingénierie `AgentOps` de 2027 traite la topologie d'exécution comme une surface d'attaque et de dérive financière à part entière, surveillée en temps réel au niveau de la passerelle `agentgateway` et du collecteur `OpenTelemetry`.

### Quatre mécanismes déterministes de confinement topologique

Pour garantir la terminaison en temps fini et à coût borné de n'importe quel graphe multi-agents, quatre garde-fous d'infrastructure doivent s'appliquer indépendamment du raisonnement des agents :

1. **Décrémentation atomique du compteur de sauts (`maxRemainingHops`)** : À l'image du champ `TTL` d'un paquet IPv4, chaque délégation horizontale `A2A v1.0` décrémente d'une unité l'entier `maxRemainingHops` transporté dans l'en-tête signé de l'`ActionEnvelope`. Lorsqu'un orchestrateur délègue en parallèle à trois spécialistes (*Fan-out*), il divise ou plafonne également le sous-budget alloué à chaque branche \(B_i\) :

\[B_i \le \alpha_i \cdot B_{\text{rest}}, \quad \sum_{i=1}^{k} \alpha_i \le 1 - \varepsilon\]

où \(\varepsilon\) réserve le budget nécessaire à l'étape finale d'agrégation. Tout appel entrant dont le compteur vaut zéro est rejeté en `HTTP 429 Too Many Hops` par la passerelle avant même d'invoquer un GPU.

2. **Détection de cycles sémantiques par graphe d'appels en session (`Call-Graph Cycle Detection`)** : Un compteur de sauts protège contre l'infini mais n'empêche pas deux agents `A` et `B` de gaspiller six sauts en se renvoyant mutuellement la balle (`A -> B -> A -> B`). La passerelle maintient dans le contexte de trace `OpenTelemetry` la liste ordonnée des couples `(targetAgentId, skillId, canonicalInputHash)` déjà traversés par la saga. Toute réinvocation identique sans mutation intermédiaire de l'état externe déclenche un court-circuit immédiat.

3. **Isolement strict des fenêtres de contexte (*Context Firewalling*)** : Contrairement aux cadriciels de première génération qui transmettaient l'intégralité du fil de discussion amont à chaque sous-agent, une délégation `A2A` de production n'envoie au spécialiste aval **que l'objet JSON validé par son `inputSchema`**. Cette hygiène réduit de 70 % la consommation de jetons, maximise le taux de succès du `KV-cache` du spécialiste et bloque la propagation latérale d'injections de prompt cachées dans les étapes antérieures (`OWASP ASI01`).

4. **Dégradation gracieuse par routage de secours pré-câblé (*Topology Fallback*)** : Lorsqu'un nœud non critique d'un DAG dynamique ou un soumissionnaire *Contract Net* expire, le moteur d'orchestration ne doit pas faire échouer toute la saga si une réponse partielle qualifiée suffit au métier, ni laisser un LLM improviser une stratégie de sauvetage chaotique. Chaque arc du graphe déclare sa politique d'échec : `FAIL_FAST`, `SUBSTITUTE_RUNNER_UP` (bascule vers le second de l'enchère) ou `DEGRADE_WITH_FLAG` (poursuite avec marquage explicite d'incertitude abaissant le plafond d'autonomie de `L3` à `L2`).

### Catalogue des anti-patrons topologiques observés en production

Le tableau ci-dessous synthétise les cinq pathologies topologiques les plus coûteuses recensées lors des audits d'architecture fin 2026, leurs signatures exactes dans les traces `OpenTelemetry gen_ai.*` et leurs correctifs normatifs.

| Anti-patron topologique | Description du dysfonctionnement | Signature télémétrique (`OpenTelemetry`) | Correctif architectural normatif |
|---|---|---|---|
| **Le Comité bavard (*Chatty Council*)** | Quatre à six agents débattent en boucle ouverte sur un tampon commun sans rôle d'arbitre déterministe | Ratio jetons générés / jetons utiles \(> 12:1\) ; variance extrême de durée (P99 \(> 8\times\) P50) | Remplacer par un **DAG typé** (collecte) suivi d'une cellule **Exécuteur–Critique** bornée à \(N_{\max} = 2\) |
| **Le Superviseur entonnoir (*Context Funnel*)** | Le superviseur central recopie en génération LLM de gros tableaux ou documents d'un agent feuille à un autre | Spans du superviseur représentant \(> 65\,\%\) du coût total et dégradations d'exactitude sur les codes SKU/ID | Imposer le patron **Claim-Check** : transfert d'URI d'artefacts immuables hors bande cognitive |
| **Le Ping-pong de politesse (`A2A` *Loop*)** | Deux agents autonomes se remercient ou se redemandent mutuellement confirmation de clôture d'une tâche | Alternance périodique `agent.A <-> agent.B` avec charge utile quasi vide avant épuisement du `TTL` | Protocole d'état fini `A2A` strict (`COMPLETED` terminal non réentrant) + détection de cycle sur `traceId` |
| **La Critique incestueuse (*Echo Critic*)** | L'agent critique utilise le même modèle et le même contexte RAG bruité que l'agent exécuteur | Taux d'approbation au tour 1 \(> 99\,\%\) mais taux de défauts découverts après coup inchangé | Imposer deux familles de modèles distinctes (`ADR-011`) + exécuter les gardes déterministes `Cedar` en amont |
| **L'Orchestrateur dieu (*God Workflow*)** | Un seul graphe central encode les règles internes de cinq départements et trente serveurs `MCP` | Déploiements bloqués par coordination inter-équipes ; rayon d'impact total à chaque changement de schéma | Scinder selon les *Bounded Contexts* : **chorégraphie événementielle** inter-divisions + micro-workflows locaux |

---

## 11.5 Application au fil rouge et éclairages sectoriels

L'erreur la plus tentante pour un Centre d'Excellence nouvellement créé consiste à décréter une topologie unique pour toute l'entreprise — par exemple imposer un superviseur hiérarchique partout par souci d'uniformité. Au sein du **Groupe Boréal Inc.**, la diversité radicale des contraintes opérationnelles, physiques et réglementaires entre ses trois divisions a conduit l'équipe d'architecture à instituer une **sélection topologique différenciée**, articulée autour d'un bus chorégraphique commun.

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Sélection topologique différenciée sur les trois divisions (BSN, BEL, BCA)"}

**Problème initial (Début T1 2027)** : Lors du cadrage de la Fabrique Agentique Boréal, trois équipes pilotes proposaient des architectures incompatibles. Chez **BSN**, une équipe avait prototypé un « essaim conversationnel » à cinq agents pour diagnostiquer les pannes complexes de compresseurs, mais chaque incident consommait en moyenne **84 000 jetons** et durait 4 minutes avec 11 % de contradictions non résolues. Chez **BEL**, un routeur statique affectait toujours les commandes urgentes de pièces au dépôt le plus proche géographiquement, ignorant les engorgements de préparation ou les grèves de transporteurs locaux. Chez **BCA**, la direction de la conformité refusait catégoriquement qu'un orchestrateur LLM libre pilote l'instruction d'un dossier soumis à la ligne directrice **BSIF E-23**.

**Architecture topologique retenue par division et reliée par chorégraphie inter-divisions** :

1. **Boréal Services Numériques (BSN) — Combinaison Tableau noir (diagnostic multi-signaux) + DAG typé (enrichissement client)** :
   * Lorsqu'une machine industrielle remonte une alerte composite ambiguë (vibrations + surchauffe huile + chutes de pression intermittentes), un **Tableau noir transactionnel** (hébergé sur Redis Enterprise / PostgreSQL avec verrouillage `ETag`) agrège en parallèle les observations de trois travailleurs spécialisés (`SLM` vibratoire, `SLM` thermodynamique, historique des interventions `ServiceNow`). Dès que le prédicat de corroboration franchit \(0,92\) de confiance (en moyenne en **3,4 secondes**), le diagnostic figé est publié sur `Kafka` (`EquipmentFailureDiagnosed.v2`).
   * Pour la préparation du dossier de soutien client dans `Salesforce Agentforce`, BSN utilise un **DAG dynamique typé** compilant en parallèle la lecture télémétrique, l'état contractuel et les billets ouverts, réduisant la latence d'affichage conseiller de **19 secondes à 2,1 secondes**.

2. **Boréal Équipements & Logistique (BEL) — Protocole d'enchères internes *Contract Net* (`CNP`) sous garde jumeau numérique** :
   * Réagissant par **chorégraphie** à l'événement `EquipmentFailureDiagnosed.v2`, le coordinateur logistique de BEL lance un appel d'offres `CNP` d'une fenêtre de **800 millisecondes** auprès des agents représentants les neuf centres logistiques nord-américains et trois transporteurs express raccordés.
   * Chaque agent de dépôt calcule sa soumission réelle à partir du stock `SAP S/4HANA` libre, de la charge instantanée des quais d'expédition et de l'empreinte carbone/coût du transport. L'adjudicateur (Extrait 11.2) attribue la réservation au dépôt optimal — souvent Québec ou Mississauga plutôt que Montréal-Est saturé — générant une baisse de **23 % des coûts de fret d'urgence** et un respect SLA porté à **98,7 %**.

3. **Boréal Capital & Assurances (BCA) — Épine dorsale hybride BPMN 2.0 / DMN encapsulant une cellule Planificateur–Exécuteur–Critique** :
   * Pour toute instruction de garantie ou de sinistre bris de machine, BCA impose un flux directeur déterministe `Camunda 8 / Zeebe` (Extrait 11.3). Les vérifications de police en vigueur sur l'`IBM i (AS/400)` et le calcul des plafonds de franchise sont exécutés à 100 % par des tables **DMN** sans aucun appel LLM.
   * Seule l'analyse croisée du rapport technique de panne et des clauses particulières d'exclusion est confiée à une cellule **Planificateur–Exécuteur–Critique** limitée à \(N_{\max} = 2\) tours (Exécuteur sur `Claude` / Critique indépendant sur `Gemini` hébergés en région canadienne conformément à la `Loi 25`). Cette isolation topologique a permis aux auditeurs internes de valider formellement la conformité **BSIF E-23** trois mois avant l'échéance du **1er mai 2027**.

**Bilan consolidé à 90 jours** : Suppression totale des boucles infinies inter-agents (**0 incident** contre 3 par mois en phase prototype), réduction de **68 % du facteur d'amplification de jetons** chez BSN (de 84 000 à 26 500 jetons sur les cas complexes), et traçabilité `OpenTelemetry` unifiée de l'alerte capteur jusqu'à la comptabilisation financière.

:::

Au-delà du cas industriel et financier de Groupe Boréal, deux secteurs illustrent avec une acuité particulière comment les contraintes physiques du temps réel ou de la preuve réglementaire dictent la géométrie du graphe multi-agents.

::: {.encadre-sectoriel title="Secteur des Télécommunications — Auto-cicatrisation des réseaux 5G Standalone (TM Forum Niveau 4) par Tableau noir et hiérarchie régionale"}

Les opérateurs de télécommunications engagés en 2027 vers le **Niveau 4 des Réseaux Autonomes du TM Forum** (*Zero-Touch Network & Service Management*) font face à un défi d'échelle hors norme : une tempête météorologique ou une coupure de fibre optique génère en quelques secondes **50 000 alarmes corrélées** à travers le réseau d'accès radio (`Open RAN`), le transport optique et le cœur `5G Standalone` multi-fournisseurs.

Une orchestration centralisée unique s'effondrerait sous la latence et le volume de télémétrie. Les architectures déployées en production chez les grands opérateurs combinent donc **deux topologies complémentaires** :

1. **À l'échelle de la grappe régionale MEC (*Multi-access Edge Computing*) — Topologie Tableau noir haute vitesse** : Des agents spécialisés par couche réseau (radio RF, routage IP/MPLS, tranches réseau *Network Slicing* B2B) alimentent un tableau noir d'incident local pour isoler en moins de **5 secondes** le défaut physique racine au milieu de milliers d'alarmes symptômes.
2. **À l'échelle nationale du NOC (*Network Operations Center*) — Superviseur hiérarchique borné à deux niveaux** : Lorsque la remédiation locale exige de réallouer du spectre ou de rerouter du trafic inter-régional affectant des SLA entreprises critiques, le superviseur régional soumet un plan d'action chiffré au contrôleur déterministe national (vérificateur de politiques `SON` / jumeau de topologie réseau) avant application sur les contrôleurs `SMO` (*Service Management and Orchestration*). Tout contournement direct entre deux agents de cellules radio voisines sans passage par les gardes de stabilité est bloqué matériellement afin d'éviter les oscillations catastrophiques de charge (*flapping*).

:::

::: {.encadre-sectoriel title="Industrie Pharmaceutique & Sciences de la Vie (GxP) — Homologation GAMP 5 par encapsulation BPMN/DMN de cellules critiques"}

Dans la fabrication biopharmaceutique soumise aux bonnes pratiques **GxP**, au guide **ISPE GAMP 5 (2e édition)** et à la réglementation **FDA 21 CFR Part 11** (signatures électroniques et intégrité des données ALCOA+), la libération d'un lot de vaccins ou de principes actifs exige l'examen minutieux des dossiers de lot (*Batch Records*) et l'investigation de tout écart de procédé (*Deviation Management*).

Déployer un graphe libre d'agents autonomes pour statuer sur un écart de stérilisation rendrait le système informatique **non validable** lors d'une inspection réglementaire. En revanche, la **topologie hybride BPMN/DMN + Cellule Critique** s'impose en 2027 comme le patron de référence pour accélérer de 60 % la préparation des dossiers qualité sans compromettre la conformité :

* Le workflow **BPMN 2.0 validé** impose la séquence immuable des contrôles, l'horodatage infalsifiable et le recueil de la signature électronique nominative de la Personne Qualifiée (*Qualified Person*, `QP` — régime strict `L2` sur la décision finale de libération).
* À l'intérieur d'une étape circonscrite d'*Investigation documentaire*, une cellule **Exécuteur–Critique** compare l'écart observé à dix ans d'historiques `CAPA` (*Corrective and Preventive Actions*), vérifie chaque citation par rapport au PDF original indexé par empreinte SHA-256 et produit un projet de rapport structuré dont le Critique indépendant certifie l'absence d'affirmation non sourcée avant présentation à la `QP`.

:::

---

## 11.6 Décision d'architecture normative et liste de contrôle

Pour ancrer durablement ces principes dans la gouvernance technologique de l'organisation, le comité d'architecture formalise les règles de conception topologique dans la fiche de décision normative `ADR-011`.

::: {.adr title="ADR-011 — Standardisation des topologies multi-agents et interdiction des graphes cycliques non bornés"}

* **Statut** : Acceptée | **Périmètre** : Ensemble des systèmes multi-agents (`L1` à `L4`) | **Révision** : Semestrielle
* **Contexte** : Les équipes produits assemblent des flottes d'agents spécialisés via `A2A v1.0` et divers cadriciels applicatifs. Sans contraintes structurelles sur la topologie des graphes d'interaction, l'organisation s'expose à des explosions quadratiques de consommation de jetons, à des boucles mutuelles entre pairs, à la dégradation du `KV-cache` et à l'impossibilité de démontrer le déterminisme des contrôles devant les régulateurs (`BSIF E-23`, `Loi 25`, `EU AI Act`).
* **Options évaluées** :
  1. *Liberté totale laissée aux cadriciels d'équipes (maillage conversationnel ouvert)* : **Rejetée** — imprévisibilité financière majeure, vulnérabilité maximale aux défaillances en cascade (`OWASP ASI08`) et piste d'audit illisible.
  2. *Imposition d'une topologie unique (Superviseur hiérarchique partout)* : **Rejetée** — crée des goulots d'étranglement artificiels sur les diagnostics parallèles, interdit l'optimisation économique par enchères logistiques et ne suffit pas aux exigences formelles BPMN des processus financiers réglementés.
  3. *Catalogue fermé de six topologies homologuées sous architecture cellulaire fédérée* : Chorégraphie événementielle typée entre domaines métiers + choix explicite et documenté parmi les six topologies canoniques à l'intérieur de chaque domaine, avec garde-fous déterministes obligatoires. **Retenue**.
* **Décision** :
  1. Toute intégration inter-domaines privilégie la **chorégraphie par événements métiers immuables** conformes aux schémas `Apache Ossie`, réservant l'orchestration directe aux frontières d'un même contexte borné ou d'une saga contractuellement définie.
  2. Les graphes cycliques libres sont **interdits en production**. Seules les boucles de rétroaction de type *Planificateur–Exécuteur–Critique* sont autorisées, sous réserve d'un plafond dur \(N_{\max} \le 3\), d'un détecteur de stagnation et de l'emploi obligatoire de **deux familles de modèles distinctes** entre l'Exécuteur et le Critique.
  3. Tout transfert de données volumineuses (\(> 2\,000\) jetons) entre agents via un superviseur doit emprunter le patron **Passage par référence (*Claim-Check*)** plutôt que la régénération textuelle.
  4. Les processus assujettis à une cotation de matérialité élevée (`BSIF E-23`, GxP, octroi financier) doivent adopter la **topologie hybride n° 6 (épine dorsale BPMN 2.0 / DMN)**.
* **Conséquences** :
  * *Positives* : Prévisibilité mathématique du coût maximal par transaction, parallélisme maîtrisé, conformité prudentielle native et élimination par construction des tempêtes d'appels inter-agents.
  * *Négatives / Coûts assumés* : Obligation de maintenir un magasin d'artefacts éphémères pour le patron *Claim-Check*, double approvisionnement de fournisseurs LLM pour l'hétérogénéité Exécuteur/Critique, et revue d'architecture préalable à l'enregistrement de tout nouveau graphe orchestrateur.
* **Condition de révision** : Réévaluation semestrielle des seuils de latence et des poids d'utilité `CNP` à la lumière des métriques `OpenTelemetry` de production.

:::

### Liste de contrôle de mise en production — Chapitre 11

Avant d'homologuer un système multi-agents et d'aborder au **Chapitre 12** le choix du moteur d'exécution durable qui en persistera l'état, passez chaque architecture au crible des huit vérifications suivantes :

1. **Frontières DDD respectées** : Le graphe évite-t-il de coupler les bases internes de plusieurs divisions dans un « orchestrateur dieu », au profit d'événements métiers typés aux frontières organisationnelles ?
2. **Rattachement explicite au catalogue topologique** : Le dossier d'architecture justifie-t-il formellement laquelle des six topologies canoniques est employée au regard des contraintes de latence, de budget et d'auditabilité ?
3. **Acyclicité prouvée ou bornage strict** : Si le graphe est un DAG dynamique, un tri topologique déterministe rejette-t-il tout cycle avant exécution ? S'il comporte une boucle Critique, la constante \(N_{\max} \le 3\) et l'arrêt sur stagnation sont-ils codés en dur hors du prompt ?
4. **Indépendance épistémique du Critique** : Dans toute cellule *Exécuteur–Critique* de niveau `L2` à `L4`, le modèle critique provient-il d'une famille de modèles distincte de celle du modèle producteur, précédé des contrôles déterministes gratuits ?
5. **Hygiène contextuelle et *Claim-Check*** : Chaque sous-agent reçoit-il uniquement son schéma d'entrée minimal (*Context Firewalling*), et les charges utiles volumineuses transitent-elles par pointeur URI signé sans traverser la fenêtre de génération du superviseur ?
6. **Coupe-circuits anti-boucle en passerelle** : La passerelle décrémente-t-elle `maxRemainingHops` à chaque saut `A2A` et bloque-t-elle les cycles `(agent, skill, inputHash)` répétés au sein d'une même trace `OpenTelemetry` ?
7. **Adjudication déterministe des enchères** : Si le protocole *Contract Net* est utilisé, le classement des offres repose-t-il sur une fonction algébrique pondérée par la réputation mesurée de plateforme plutôt que sur l'auto-évaluation déclarative des agents ?
8. **Politique de dégradation par branche** : Chaque délégation parallèle ou séquentielle définit-elle explicitement son comportement déterministe en cas d'expiration (`FAIL_FAST`, `SUBSTITUTE_RUNNER_UP`, `DEGRADE_WITH_FLAG` ou escalade `HOTL`) ?
