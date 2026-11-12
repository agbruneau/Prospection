# Chapitre 25 — Modèle opérationnel cible, facteur humain (HOTL) et prospective 2028–2030

::: {.synthese-executive title="Synthèse exécutive — Chapitre 25"}

* **Enjeu stratégique** : Superposer un maillage technique transversal (`MCP`, `A2A`, moteurs durables) sur une organisation restée en silos produit soit un goulot d'étranglement centralisé, soit une anarchie d'agents orphelins dont plus personne ne maîtrise ni les coûts ni la dérive métier. Parallèlement, lorsque la fiabilité autonome approche les 90 %, la complaisance cognitive des superviseurs humains (`OWASP ASI09`) transforme la validation humaine de papier en passoire opérationnelle si le poste de travail n'est pas instrumenté scientifiquement.
* **Décisions organisationnelles et architecturales structurantes** :
  1. *Irréversible culturellement* : Déployer un modèle opérationnel **Hub-and-Spoke** articulant un Centre d'Excellence Agentique frugal (plateforme, sécurité, ontologies, FinOps) avec des cellules métiers fédérées où chaque boucle active relève d'un **propriétaire métier nominatif (*Named Business Owner*)** et d'une gouvernance conjointe **RH–IT**.
  2. *Structurante dès la mise en service* : Rebâtir la supervision *Human-on-the-Loop* (`HOTL`) autour de vues différentielles exemptes de prose persuasive, d'un plafond d'arbitrages par quart et de **tests canaris continus d'attention humaine**.
  3. *Préparatoire sans regret (2028–2030)* : Fonder les investissements 2027 sur l'agilité cryptographique, des politiques formelles hors prompts et des moniteurs déterministes afin d'accueillir demain les marchés B2B liquides, l'auto-conception vérifiée et la *Physical AI* sans refonte du socle.
* **Indicateurs de gouvernance** : Agents actifs dotés d'un *Named Business Owner* valide dans le SIRH (100 %), taux d'interception des tests canaris `HOTL` (\(\ge 92\,\%\)), taux de requalification interne des coordonnateurs impactés, et ratio de création de valeur nette sur *Cost-per-Outcome*.

:::

## 25.1 Organisation Hub-and-Spoke : Centre d'Excellence Agentique, propriétaires métiers nommés et tandem RH-IT

L'échec du passage à l'échelle des programmes agentiques découle rarement d'une défaillance protocolaire : il provient presque toujours d'un modèle opérationnel enfermé dans l'un de deux extrêmes dysfonctionnels.

Le premier écueil est le **laboratoire IA monolithique centralisé**. Pour contenir les risques, la direction confie la construction de tous les agents à une cellule centrale éloignée des opérations d'usine, de souscription ou de logistique. En deux trimestres, la file d'attente dépasse neuf mois ; l'équipe centrale maîtrise mal les cas limites de `SAP` ou `Guidewire`, et les directions métiers contournent le blocage en achetant clandestinement des agents SaaS non gouvernés.

L'écueil symétrique est le **laissez-faire décentralisé (*Citizen Agent Sprawl*)**. Chaque unité d'affaires assemble librement ses propres agents sans socle partagé d'identité, d'ontologie ni de FinOps. Cinq départements recodent cinq connecteurs incompatibles vers le même référentiel client et, lors d'un incident critique, l'auteur initial du prompt a changé de poste depuis des mois sans successeur désigné.

### Un *Hub* régalien et outilleur, des *Spokes* métiers imputables

La topologie cible qui s'impose en 2027 repose sur le modèle fédéré **Hub-and-Spoke** : **centraliser sans compromis les invariants d'infrastructure, de sécurité et de sémantique commune ; fédérer au plus près des lignes d'affaires la logique de domaine, le budget d'usage et la supervision opérationnelle**.

![Modèle opérationnel cible Hub-and-Spoke : Centre d'Excellence Agentique, tandem RH-IT, cellules métiers fédérées et supervision HOTL.](manuscrit/figures/fig-25-modele-hub-spoke-coe.svg)

1. **Le *Hub* — Centre d'Excellence Agentique (`Agentic CoE`)** : Équipe resserrée de douze à vingt-cinq spécialistes (pour un groupe de 10 000 à 20 000 personnes), le *Hub* ne code pas la logique métier des divisions. Il livre des **chemins pavés (*Golden Paths*)** clés en main : exploitation du runtime durable (`Temporal` / `Restate`), administration d'`agentgateway` et du registre `OASF`/`AIMS`, gouvernance ontologique (`Apache Ossie`), harnais d'évaluation CI/CD \(\text{pass}^k\), politiques globales `Cedar`/`OPA` et pilotage **FinOps IA** (capacités GPU/API, routage `SLM`/`LLM`, refacturation interne au *Cost-per-Outcome*).
2. **Les *Spokes* — Cellules métiers fédérées** : Logée dans chaque division, la cellule réunit experts métiers, ingénieurs d'intégration `MCP`/orchestration, curateur d'ontologie locale et superviseurs `HOTL`. En s'appuyant sur les gabarits certifiés du *Hub*, un *Spoke* livre un agent spécialiste homologué en quelques semaines. Sur le volet économique, la relation *Hub–Spoke* évolue en six mois d'une simple visibilité des coûts (*Showback*) vers une **refacturation analytique directe (*Chargeback*)** : le *Hub* absorbe le coût fixe du socle mutualisé, tandis que chaque *Spoke* paie mensuellement ses exécutions réelles au *Cost-per-Outcome*, créant une incitation naturelle des métiers à privilégier les `SLM` spécialisés plutôt que d'invoquer inutilement des modèles frontières coûteux.

### L'institution du *Named Business Owner* et du tandem RH–IT

Pour éradiquer les « agents zombies », une règle cardinale s'applique : **aucune identité `NHI` d'agent de niveau `L2`, `L3` ou `L4` ne demeure active sans rattachement à un propriétaire métier nominatif (*Named Business Owner*) en exercice**. Ce cadre métier — et non l'administrateur technique — porte quatre responsabilités indivisibles : le budget d'exécution sur son compte de résultat (`P&L`), la cosignature des seuils d'escalade `HOTL`, la revue trimestrielle d'exactitude métier et l'obligation d'actionner le coupe-circuit (*Kill-Switch*) dès qu'une règle commerciale devient caduque.

Cette discipline consacre l'émergence du **tandem stratégique RH–IT**, qui synchronise désormais quatre processus autrefois séparés :

* **Couplage direct SIRH – Registre d'agents** : Lorsqu'un *Named Business Owner* quitte son poste ou change de rôle dans `Workday`, un webhook ouvre un délai de soixante-douze heures pour transférer la tutelle à son successeur ; sans signature, le plan de contrôle rétrograde automatiquement ses agents de `L3` vers `L2` (validation humaine systématique) et gèle leurs signatures externes.
* **Design conjoint des postes hybrides** : Avant d'automatiser les tâches répétitives d'une équipe, le tandem RH–IT redessine le rôle humain cible afin d'enrichir le travail analytique et d'éviter un poste résiduel fragmenté.
* **Arbitrage capacitaire unifié** : Les comités budgétaires évaluent sur une grille commune recrutement humain, impartition et budget d'inférence agentique rapportés au résultat métier.
* **Certification de littératie IA** : Conformément à l'article 4 de l'`EU AI Act`, aucun superviseur `HOTL` ne reçoit ses droits d'approbation `CIBA` sans validation pratique d'un parcours sur les biais d'automatisation et la lecture critique de preuves.

| Activité du cycle de vie agentique | `Hub` — CoE Plateforme | CISO, Juridique & Risques | Cellule FinOps IA | Direction RH | *Named Business Owner* | Ingénierie *Spoke* |
|---|---|---|---|---|---|---|
| **Socle (`agentgateway`, runtime durable)** | **R / A** | C | C | I | I | C |
| **Ontologie `Ossie` & contrats `A2A`** | **A** | I | I | I | C | **R** |
| **Spécialiste métier & serveurs `MCP`** | C | C | I | I | **A** | **R** |
| **Qualification `Footprint` & dossier `E-23`** | C | **A** | I | I | C | **R** |
| **Plafonds financiers & seuils `HOTL`** | I | C | C | C | **A / R** | C |
| **Quotas jetons & suivi *Cost-per-Outcome*** | C | I | **R** | I | **A** | C |
| **Postes hybrides, requalification & social** | I | C | I | **A / R** | **R** | I |
| **Coupe-circuit d'urgence (*Kill-Switch*)** | **R** | **A / R** | C | I | **A / R** | C |

*(Légende RACI : **R** = Réalisateur, **A** = Approbateur imputable, **C** = Consulté, **I** = Informé.)*

#### Extrait 25.1 — Charte d'investiture exécutable d'un *Named Business Owner* (`ownership-charter.yaml`)

Synchronisé chaque jour avec le SIRH, cet acte relie formellement la flotte active à son dirigeant métier imputable :

```yaml
apiVersion: governance.boreal.ca/v2027.1
kind: NamedBusinessOwnerCharter
metadata:
  charterId: "OWN-BEL-2027-008"
  effectiveDate: "2027-04-01"
  reviewCadenceDays: 90
subjectAgentFleet:
  sagaOrAgentIds: ["boreal-bel-spot-procurement", "boreal-bel-sap-inventory"]
  autonomyGranted: "L3"
accountableExecutive:
  employeeWorkdayId: "EMP-CA-004192"
  fullName: "Marc-Antoine Lavoie"
  roleTitle: "VP Chaîne d'Approvisionnement (BEL)"
  costCenterCode: "CC-4100-LOG-MFG"
  backupDelegateWorkdayId: "EMP-CA-006811"
operationalMandateAndCaps:
  monthlyInferenceAndInfraCapCad: 18500
  maxSingleTransactionCommitmentCad: 15000
  mandatoryBusinessKpis:
    minOrderAccuracyRate: 0.992
    minHotlCanaryCatchRate: 0.92
orphanedAgentPolicy:
  hrStatusTrigger: ["TERMINATED", "LEAVE_EXTENDED", "ROLE_CHANGED"]
  gracePeriodHours: 72
  automaticFallbackAction: "DOWNGRADE_TO_L2_HITL_AND_FREEZE_AP2_SIGNING"
```

---

## 25.2 Ergonomie cognitive du Human-on-the-Loop (HOTL) et lutte contre la complaisance d'automatisation (ASI09)

L'escalade vers un opérateur humain en mode *Human-on-the-Loop* (`HOTL`) constitue le dernier rempart face aux cas ambigus et aux exigences légales (`EU AI Act` art. 14, `Loi 25` art. 12.1, `BSIF E-23`). Or, le référentiel **OWASP Top 10 for Agentic Applications (`ASI09` — *Human-Agent Trust Exploitation*)** met en évidence un paradoxe critique confirmé par l'ergonomie aéronautique : **plus l'automatisation est fiable au quotidien, plus la vigilance réelle du superviseur humain se dégrade rapidement**.

### Pourquoi le contrôle humain classique échoue devant un agent génératif

Deux facteurs cognitifs désarment l'approbateur :

1. **La chute de vigilance sur signaux rares (*Mackworth Decrement*)** : Face à un flux dont 95 % des propositions pré-instruites sont justes, le cerveau cesse rapidement d'inspecter les pièces justificatives ; le temps médian d'examen tombe sous cinq secondes (*rubber-stamping*).
2. **Le biais de fluidité persuasive** : Même lorsqu'il hallucine ou subit une injection adverse, un `LLM` rédige sa recommandation dans un style posé, structuré et convaincant qui endort l'esprit critique.

### Quatre lois d'ingénierie d'un poste `HOTL` résilient

Pour maintenir un filet humain véritablement effectif et opposable aux régulateurs, la console `A2UI` et le routeur d'escalade appliquent quatre principes stricts :

* **Loi 1 — Vue différentielle contradictoire (*Contrastive Evidence UI*)** : Bannir tout paragraphe élogieux rédigé par l'agent demandeur. L'écran oppose côte à côte les valeurs brutes liées aux systèmes sources, la règle exacte ayant motivé l'escalade, **une contre-hypothèse critique (*Devil's Advocate*)** produite par un agent indépendant, et l'impact irréversible chiffré.
* **Loi 2 — Fonction de forçage cognitif (*Cognitive Forcing Function*)** : Sur les dossiers matériels, remplacer le bouton unique « Approuver » par la saisie active d'un paramètre vérifié dans la pièce source (franchise retenue, code d'exclusion) avant de débloquer l'authentification `CIBA`.
* **Loi 3 — Plafonnement mathématique de la charge cognitive** : L'attention soutenue se budgète comme une ressource critique. Le plafond \(N_{\text{max}}^{\text{quart}}\) d'arbitrages complexes par quart de durée nette \(T_{\text{effectif}}\) s'écrit :

\[N_{\text{max}}^{\text{quart}} = \left\lfloor \frac{T_{\text{effectif}} \cdot \eta_{\text{vig}}}{t_{\text{analyse}}^{\text{min}}} \right\rfloor\]

Pour \(T_{\text{effectif}} = 360\text{ min}\), un coefficient de maintien de vigilance \(\eta_{\text{vig}} = 0{,}65\) et un examen sérieux incompressible \(t_{\text{analyse}}^{\text{min}} = 7\text{ min}\), la charge maximale s'établit à **33 dossiers complexes par quart**. Au-delà, le système met les sagas non urgentes en file durable plutôt que d'encourager l'expédition bâclée.

* **Loi 4 — Injection continue de tests canaris d'attention (*Canary Escalations*)** : La plateforme insère aléatoirement (3 à 5 % du volume) des dossiers synthétiques plausibles contenant une anomalie subtile connue d'avance (garantie échue la veille, numéro de série discordant) afin de mesurer objectivement l'étanchéité réelle du contrôle humain. Si l'interface `A2UI` les présente à l'identique d'un dossier réel (*aveugle* côté opérateur), leur enveloppe `Temporal` porte un scellé `dryRunCanary` bloqué sur `agentgateway` afin qu'une approbation accidentelle ne déclenche jamais d'écriture ni de virement effectif dans un *System of Record*.

#### Extrait 25.2 — Protocole anti-complaisance cognitive `HOTL` par tests canaris (`ASI09` / TypeScript)

Évalué sur une fenêtre glissante minimale de cinq canaris pour écarter le bruit de début de quart, ce capteur pilote l'ergonomie d'une file d'attente : en cas d'érosion d'attention, il durcit automatiquement la friction d'interface et ralentit le flux entrant.

```typescript
export interface HotlReviewSample {
  readonly isSyntheticCanary: boolean;
  readonly expectedCanaryAction?: "REJECT" | "MODIFY";
  readonly humanDecision: "APPROVE" | "REJECT" | "MODIFY";
  readonly dwellSeconds: number;
  readonly evidenceLinksOpened: number;
  readonly minExpectedDwellSeconds: number;
}

export interface HotlQueueStatus {
  readonly canaryCatchRate: number;
  readonly suspectedRubberStampRate: number;
  readonly state: "HEALTHY" | "DRIFT_WARNING" | "ASI09_MITIGATION_ACTIVE";
  readonly actions: ReadonlyArray<string>;
}

export function assessHotlQueueVigilance(
  samples: ReadonlyArray<HotlReviewSample>,
  minCanarySampleSize: number = 5
): HotlQueueStatus {
  const canaries = samples.filter((s) => s.isSyntheticCanary);
  const caught = canaries.filter(
    (c) => c.humanDecision === c.expectedCanaryAction || c.humanDecision === "REJECT"
  );
  const hasStatQuorum = canaries.length >= minCanarySampleSize;
  const canaryCatchRate = canaries.length > 0 ? caught.length / canaries.length : 1.0;

  const liveApprovals = samples.filter(
    (s) => !s.isSyntheticCanary && s.humanDecision === "APPROVE"
  );
  const hastyApprovals = liveApprovals.filter(
    (s) => s.dwellSeconds < s.minExpectedDwellSeconds && s.evidenceLinksOpened === 0
  );
  const suspectedRubberStampRate =
    liveApprovals.length > 0 ? hastyApprovals.length / liveApprovals.length : 0.0;

  if ((hasStatQuorum && canaryCatchRate < 0.85) || suspectedRubberStampRate > 0.15) {
    return {
      canaryCatchRate,
      suspectedRubberStampRate,
      state: "ASI09_MITIGATION_ACTIVE",
      actions: [
        "FORCE_ACTIVE_PARAMETER_ENTRY_UI",
        "THROTTLE_L3_ESCALATION_RATE_25_PCT",
        "ALERT_OPERATIONS_LEAD_FOR_SHIFT_RELIEF"
      ]
    };
  }
  if ((hasStatQuorum && canaryCatchRate < 0.92) || suspectedRubberStampRate > 0.08) {
    return {
      canaryCatchRate,
      suspectedRubberStampRate,
      state: "DRIFT_WARNING",
      actions: ["EMPHASIZE_CONTRASTIVE_DEVIL_ADVOCATE_PANEL"]
    };
  }
  return { canaryCatchRate, suspectedRubberStampRate, state: "HEALTHY", actions: [] };
}
```

::: {.encadre-sectoriel title="Relations de travail, conduite du changement et requalification — Du coordonnateur au superviseur de flotte"}

Réussir la transformation des métiers administratifs de coordination en contexte syndiqué ou conventionné au Canada et en Europe repose sur trois engagements sociaux explicites :

1. **Finalité non disciplinaire garantie par entente** : Les métriques d'interception des tests canaris sont agrégées par file pour calibrer l'ergonomie et la formation ; une charte cosignée interdit leur usage pour sanctionner individuellement un salarié.
2. **Parcours certifiant de 120 heures** : Les anciens coordonnateurs — détenteurs de la mémoire concrète des exceptions clients et des écrans patrimoniaux — constituent le meilleur vivier interne pour devenir **Superviseurs d'Exceptions `HOTL`**, **Curateurs d'Ontologies Métier** et **Analystes Qualité AgentOps**.
3. **Simulateur de relève pour les juniors** : Pour éviter que l'automatisation des cas simples ne prive les nouvelles recrues d'apprentissage terrain, un jumeau de rejeu soumet aux analystes juniors des dossiers historiques réels à instruire avant confrontation avec les vétérans.

:::

---

## 25.3 Horizon 2028–2030 : marchés B2B autonomes liquides, auto-conception vérifiée et Physical AI

Clôturons notre parcours architectural en distinguant rigoureusement les trajectoires plausibles de la période **2028–2030** des verrous scientifiques, normatifs et physiques encore non résolus fin 2026–2027.

### Trois frontières post-2027 et leurs verrous fondamentaux

1. **Marchés B2B autonomes liquides (2028–2029)** : Au-delà des relations bilatérales pré-contractualisées du Chapitre 24, la généralisation des identifiants d'entités juridiques vérifiables (**`vLEI`** de la `GLEIF`) et des annuaires `AGNTCY` ouvrira des bourses sectorielles instantanées (fret spot, flexibilité électrique industrielle, capacité GPU). *Verrou critique* : l'instauration de coupe-circuits systémiques de place de marché capables d'enrayer des krachs éclairs (*Agentic Flash Crashes*) provoqués par des milliers d'agents réagissant en millisecondes au même choc externe.
2. **Auto-conception agentique sous preuve formelle (2029–2030)** : Des méta-architectes synthétisant à la volée de nouveaux sous-agents et adaptateurs protocolaires. *Verrou scientifique dur* : tant que la validation demeure purement statistique, l'auto-modification en production restera bannie des secteurs critiques (`BSIF E-23`, santé, énergie). Son adoption exigera une synthèse **neuro-symbolique vérifiée** où chaque graphe généré est accompagné d'une preuve formelle vérifiable par machine (`Lean 4`, `TLA+`, solveurs `SMT` sur politiques `Cedar`) attestant la terminaison et l'inviolabilité des invariants.
3. ***Physical AI* incarnée et identités `NHI` post-quantiques (2028–2030)** : L'intégration entre orchestrateurs d'entreprise (`A2A`/`MCP`) et modèles **Vision-Langage-Action (`VLA`)** pilotant robots mobiles et cellules d'assemblage se heurte au verrou de la certification déterministe de sûreté machine (`IEC 61508` / `ISO 13849`). Parallèlement, la conservation septennale des journaux `WORM` et mandats `AP2` contre la menace *Harvest Now, Decrypt/Forge Later* impose d'amorcer la migration des signatures vers des suites composites hybrides post-quantiques (`ECDSA P-256 + ML-DSA-65` selon **`NIST FIPS 204`**) : comme chaque signature `ML-DSA-65` occupe 3 309 octets (~4,5 Ko en `Base64url`), on l'applique immédiatement aux scellés `WORM` et mandats externes `AP2`, tout en conservant des jetons par référence sur les sauts `RFC 8693` internes afin de ne pas saturer les tampons d'en-têtes `HTTP` de 8 Ko.

| Horizon 2028–2030 | Hypothèse plausible | Verrou non résolu fin 2026–2027 | Décision « sans regret » dès 2027 |
|---|---|---|---|
| **Marchés B2B liquides** | Enchères spot inter-agents via `vLEI` et règlement séquestré instantané | Coupe-circuits anti-*flash crash* et fiscalité transfrontalière temps réel | Adopter `A2A v1.0`, les mandats `AP2` et préparer l'identité `vLEI` |
| **Auto-conception vérifiée** | Synthèse dynamique de sous-graphes prouvés formellement avant déploiement | Passage à l'échelle des preuves automatiques (`Lean 4` / `TLA+`) sur SI complexes | Externaliser dès maintenant toute politique critique hors prompt dans `Cedar` |
| ***Physical AI* (`VLA`)** | Jonction directe entre sagas métiers et robotique industrielle polyvalente | Certification `IEC 61508` de contrôleurs neuronaux continus | Interposer des jumeaux numériques et une enveloppe matérielle de sûreté |
| **`NHI` post-quantiques** | Signatures hybrides `ML-DSA` sur `SPIFFE`, `OBO` et archives `WORM` | Taille des en-têtes HTTP post-quantiques et maturité `HSM` | Garantir l'agilité cryptographique dans `agentgateway` et les journaux |

#### Extrait 25.3 — Invariant formel `Cedar` préparant l'auto-conception vérifiée et l'agilité post-quantique (horizon 2028–2030)

Exprimer dès 2027 les interdits structurels dans un langage décidable analysable par solveur `SMT` (tel que `Cedar Automated Reasoning`) garantit que même lorsqu'un futur méta-agent proposera dynamiquement un sous-graphe en 2029, il ne pourra mathématiquement ni s'auto-octroyer des privilèges, ni signer avec un algorithme cryptographique déprécié :

```cedar
// Invariant 1 : Interdiction absolue d'auto-élévation ou d'homologation sans preuve formelle
forbid (
  principal is Boreal::Agent,
  action == Boreal::Action::"RegisterDynamicSubAgent",
  resource is Boreal::AgentRegistry
)
unless {
  context.smtProofVerified == true &&
  principal.delegatedScopes.containsAll(context.proposedScopes) &&
  resource.namedBusinessOwnerStatus == "ACTIVE_WORKDAY"
};

// Invariant 2 : Agilité cryptographique — rejet des signatures non hybrides post-quantiques sur WORM
forbid (
  principal is Boreal::Agent,
  action == Boreal::Action::"SealLongTermAuditRecord",
  resource is Boreal::WormVault
)
unless {
  ["ES256_MLDSA65_HYBRID", "MLDSA87_FIPS204"].contains(context.signatureSuite)
};
```

::: {.encadre-sectoriel title="Industrie Manufacturière & Robotique (Physical AI) — L'architecture Simplex pour l'usine 2029"}

Pour faire coopérer demain un modèle robotique `VLA` adaptatif avec des opérateurs humains sous norme `IEC 61508 SIL 3`, le patron de référence est l'**architecture Simplex matériellement isolée** : le modèle neuronal propose des trajectoires optimales, mais un **moniteur cinématique déterministe formellement prouvé**, logé sur un microcontrôleur temps réel distinct, audite chaque commande. Dès que l'état projeté s'approche de la frontière de collision ou de surcouple, le moniteur coupe le canal neuronal et passe la main à un contrôleur de repli certifié mettant la cellule en arrêt sûr — exacte réplique cyber-physique du découplage plan de contrôle / cellule autonome de ce compendium.

:::

---

## 25.4 Application au fil rouge : bilan à 12 mois de la Fabrique Agentique Boréal et réorganisation des métiers

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Bilan chiffré à 12 mois (T4 2026 – T4 2027) et transformation des métiers"}

**Point de départ (T4 2026)** : 47 prototypes dispersés dont 19 *Shadow Agents*, une boucle incontrôlée de onze heures sur erreur `HTTP 429` ayant coûté **41 000 \$ CAD**, des comptes de service sur-privilégiés menaçant `Loi 25` et `BSIF E-23`, et **46 heures** de coordination manuelle entre `ServiceNow` (BSN), `IBM i (AS/400)` (BCA) et `SAP S/4HANA` (BEL).

**Bilan audité à 12 mois (Décembre 2027)** :

1. **Gouvernance *Hub-and-Spoke* en régime établi** : Un Centre d'Excellence central de **16 spécialistes** à Montréal soutient les trois *Spokes* divisionnaires exploitant **28 agents spécialistes réutilisables et 11 sagas transversales**, couverts à 100 % par neuf *Named Business Owners* investis (Extrait 25.1). Aucun *Shadow Agent* résiduel.
2. **Performance opérationnelle, conformité et `HOTL`** : Délai médian de résolution ramené de 46 heures à **11 minutes** (**88,6 %** en autonomie `L3`, **11,4 %** en escalade `HOTL`). Homologation réussie sans réserve majeure sous `BSIF E-23` (1er mai 2027), `Loi 25` (art. 12.1) et `EU AI Act` (art. 50). Taux d'interception des tests canaris maintenu à **95,2 %** sur l'année.
3. **Bilan financier vérifié** : Coût complet annuel d'exploitation (plateforme, `SLM` internes traitant 79 % des volumes et `LLM` frontières sur les 21 % complexes) établi à **1,94 M\$ CAD** (*Cost-per-Outcome* moyen pondéré tous processus de **0,41 \$ CAD**, dont **0,19 \$ CAD** sur la maintenance prédictive), générant **16,74 M\$ CAD** de gains bruts et bris évités — soit **14,80 M\$ CAD** de valeur nette créée et un **ROI net de 7,6 fois la mise dès le premier exercice**.
4. **Transition sociale sans licenciement** : Sur les 42 coordonnateurs autrefois absorbés par la ressaisie inter-systèmes, **zéro suppression sèche d'emploi** : après 120 heures de formation certifiante RH–IT, 24 sont devenus *Superviseurs d'Exceptions HOTL*, 11 *Curateurs d'Ontologies et Analystes Qualité* dans les *Spokes*, et 7 conseillers grands comptes.
5. **Feuille de route 2028–2030 approuvée par le conseil d'administration** : Fort de ce socle rentable et auditable, Boréal a voté trois chantiers pluriannuels prudents : l'adoption de l'identité vérifiable `vLEI` fin 2028 pour étendre les achats `AP2` de BEL au fret routier nord-américain, la migration hybride post-quantique `ML-DSA` des archives septennales de BCA, et un premier banc d'essai *Simplex* de chariots robotisés `VLA` dans l'entrepôt de Montréal-Est.

:::

---

## 25.5 Décision d'architecture normative, transition vers l'entreprise étendue et points de contrôle

La décision `ADR-025` parachève la gouvernance organisationnelle interne avant le passage aux frontières inter-entreprises et à la méta-ingénierie.

::: {.adr title="ADR-025 — Modèle Hub-and-Spoke, propriétaire métier nominatif et vigilance HOTL instrumentée"}

* **Statut** : Acceptée | **Périmètre** : Entreprise & Ressources Humaines | **Révision** : Annuelle
* **Contexte** : Une fabrique multi-agents techniquement saine dérive rapidement si nul cadre métier n'est imputable de ses résultats, si les mouvements RH créent des boucles orphelines, ou si la complaisance cognitive vide le contrôle humain de sa substance (`OWASP ASI09`).
* **Options évaluées** :
  1. *Propriété exclusivement IT* : **Rejetée** — la DSI ne détient ni le budget d'affaires ni la légitimité d'arbitrage métier.
  2. *Décentralisation intégrale dans les métiers* : **Rejetée** — fragmentation ontologique et non-conformité `ISO/IEC 42001` / `BSIF E-23`.
  3. *Fédération Hub-and-Spoke avec charte obligatoire de Named Business Owner couplée au SIRH et protocole Canari continu sur les files HOTL*. **Retenue**.
* **Décision** : (a) Séparer le *Hub* régalien (socle, sécurité, ontologies, FinOps) des *Spokes* métiers ; (b) exiger pour tout agent `L2`–`L4` un *Named Business Owner* actif avec rétrogradation automatique sous 72 heures en cas de vacance SIRH ; (c) imposer sur toute file `HOTL` une vue différentielle, un plafond cognitif par quart et un taux d'interception canari \(\ge 92\,\%\) à finalité non disciplinaire.
* **Conséquences** : Imputabilité économique et réglementaire permanente et preuve empirique d'effectivité du contrôle humain, en contrepartie d'une intégration SIRH–Registre et d'un investissement soutenu en requalification interne.

:::

### Transition vers les Parties IX et X — Du périmètre interne maîtrisé à l'écosystème fédéré et auto-améliorant

Au terme des huit premières parties de ce compendium, le périmètre interne de l'organisation dispose d'un socle complet et auditable : exécution durable (`Temporal`, `Restate`), interopérabilité bi-couche (`MCP` et `A2A v1.0`), alignement ontologique (`Apache Ossie`), délégation cryptographique Zero Trust (`SPIFFE`, `OAuth 2.1 OBO`), maîtrise économique au *Cost-per-Outcome*, conformité croisée (`ISO/IEC 42001`, `BSIF E-23`, `Loi 25`, `EU AI Act`) et vigilance humaine scientifiquement instrumentée (`HOTL`).

Or, dès que cette fabrique interne atteint son régime nominal, deux chantiers d'expansion décisifs s'ouvrent devant l'architecte d'entreprise. Le premier (**Partie IX, Chapitres 26 à 28**) consiste à franchir les frontières de confiance légale, de juridiction infonuagique et de connectivité permanente : interconnecter ses agents à ceux de centaines de partenaires commerciaux B2B via les espaces de données régulés (`Dataspace` `EDC` / `ODRL` et identité `vLEI`) sans jamais divulguer ses prix de réserve ni ses marges internes, verrouiller sa souveraineté cognitive face aux lois extraterritoriales grâce aux enclaves matérielles GPU `TEE` et à la reprise après sinistre cognitif (`Cognitive DR`), puis opérer en totale coupure réseau sur sites industriels distants ou robotisés (`CRDT`, pont `ROS 2` sous enveloppe matérielle `Simplex`).

Le second chantier (**Partie X, Chapitres 29 à 31**) retourne la puissance de cette fabrique gouvernée vers le système d'information lui-même : décapsuler sans risque les cœurs patrimoniaux `RPG`/`COBOL` par une usine logicielle à séparation des devoirs (`Agentic SDLC`), protéger automatiquement les contrats de données et les `SLO` d'exploitation (`Agentic DataOps` et `SRE` autonome), et comprimer trimestre après trimestre les coûts d'inférence par compilation déclarative et distillation continue `LLM → SLM`.

### Liste de contrôle de mise en production — Chapitre 25

1. **Partage *Hub-and-Spoke*** : La matrice RACI entre le Centre d'Excellence central et les cellules métiers fédérées est-elle formalisée et appliquée sans chevauchement ?
2. **Couverture *Named Business Owner*** : Chaque boucle active possède-t-elle un propriétaire métier nominatif portant son budget FinOps, ses SLI d'exactitude et son droit d'arrêt ?
3. **Protection anti-orphelinat SIRH** : Tout départ ou changement de poste dans le SIRH déclenche-t-il le transfert de tutelle sous 72 heures ou le repli automatique de l'agent en `L2` ?
4. **Ergonomie différentielle `HOTL`** : Les consoles d'arbitrage affichent-elles les pièces sources et une contre-hypothèse critique plutôt qu'un texte persuasif généré par l'agent demandeur ?
5. **Budget d'attention humaine** : Le volume d'escalades complexes par superviseur et par quart respecte-t-il un plafond cognitif explicite évitant l'approbation réflexe ?
6. **Tests canaris anti-`ASI09`** : Un flux continu d'escalades synthétiques canaris vérifie-t-il l'attention effective des files `HOTL` dans un cadre transparent et non punitif ?
7. **Pacte de requalification et relève** : Le tandem RH–IT opère-t-il les parcours certifiants pour les coordonnateurs reconvertis ainsi que le simulateur d'entraînement des juniors ?
8. **Préparation sans regret 2028–2030** : L'agilité cryptographique, l'externalisation des règles dans `Cedar`/`OPA` et l'isolation matérielle `IT/OT` préparent-elles le socle aux évolutions post-2027 ?
