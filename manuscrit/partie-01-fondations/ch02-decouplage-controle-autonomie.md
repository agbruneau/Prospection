# Chapitre 2 — Le grand découplage architectural : Contrôle déterministe vs autonomie probabiliste

::: {.synthese-executive title="Synthèse exécutive — Chapitre 2"}

* **Enjeu stratégique** : Confier le séquencement global d'un processus critique à la boucle libre d'un grand modèle de langage condamne le système à l'instabilité opérationnelle. Même avec une précision unitaire de 95 % par micro-décision, une chaîne non encadrée de quinze étapes plafonne à \(0,95^{15} \approx 46,3\,\%\) de succès au premier passage, tout en exposant l'organisation à des dérives financières imprévisibles et à une non-conformité réglementaire.
* **Décisions architecturales structurantes** :
  1. *Irréversible et fondatrice* : Séparer physiquement le **plan de contrôle déterministe** (machine à états durable, règles `DMN`/`Cedar`, gestion des transactions et compensations `Saga`) des **cellules cognitives probabilistes** (interprétation sémantique, diagnostic multi-signaux).
  2. *Structurante dès la conception* : Encapsuler chaque appel cognitif entre une garde d'entrée déterministe (schéma, masquage de données personnelles, budget de jetons et de latence) et une garde de sortie vérifiant les invariants métiers avant toute mutation d'un *System of Record*.
  3. *Réversible et modulaire* : Le choix interne du modèle (`SLM` spécialisé ou `LLM` de raisonnement) à l'intérieur d'une cellule bornée, remplaçable sans modifier le graphe d'orchestration parent.
* **Indicateurs de gouvernance associés** : Constance multi-essais \(\text{pass}^5\) sur banc d'homologation, taux d'interception des gardes d'invariants (*Invariant Rejection Rate*), ratio d'activation du repli déterministe (*Fallback Rate*), et latence/coût au 99e centile (\(P_{99}\)).

:::

## 2.1 Le paradoxe de la fiabilité composée dans les graphes multi-agents

L'écart brutal observé entre les démonstrations interactives de 2024–2025 et l'exploitation industrielle à haut volume obéit à la **loi de Lusser** (formulée dès 1952 en ingénierie aérospatiale) : la fiabilité d'un système composé de maillons en série égale le produit des fiabilités élémentaires de chacun d'eux. Un prototype qui résout un cas huit fois sur dix impressionne en réunion ; transposé sans filet déterministe sur dix mille événements quotidiens, il engendre deux mille incidents opérationnels par jour et sature les équipes de reprise manuelle.

### De l'exactitude ponctuelle (\(\text{pass}@1\)) à la constance industrielle (\(\text{pass}^k\))

Les classements académiques privilégient historiquement la métrique \(\text{pass}@k\) : la probabilité qu'au moins un essai sur \(k\) tentatives produise le bon résultat. Ce critère convient lorsqu'un compilateur ou un développeur filtre gratuitement les propositions erronées. Dans l'exécution transactionnelle d'entreprise — instruire un sinistre, modifier un approvisionnement ou reconfigurer un équipement —, l'exigence s'inverse : le système doit appliquer fidèlement la politique d'affaires *à chacune des \(k\) exécutions successives* d'un dossier identique. Formalisée par la métrique \(\text{pass}^k\) issue des bancs d'évaluation d'agents transactionnels (\(\tau\text{-bench}\)), la borne de Lusser appliquée à \(n\) décisions probabilistes supposées indépendantes de précision moyenne \(p\) suit une décroissance exponentielle sévère :

\[R_{\text{seq}}(n) = \prod_{i=1}^{n} p_i \approx p^n, \quad \text{pass}^k(n) = p^{nk}\]

Les ordres de grandeur invalident toute longue chaîne cognitive non segmentée :

* Avec une précision élémentaire de \(p = 0,95\), un flux linéaire de \(n = 12\) étapes libres chute à \(0,95^{12} \approx 54,0\,\%\) par passage (\(\text{pass}@1\)), et sa reproductibilité réglementaire sur cinq contrôles successifs (\(\text{pass}^5\)) s'effondre à \(0,95^{60} \approx 4,6\,\%\).
* Même à \(p = 0,99\) avec un modèle frontière coûteux, un dossier complexe de \(n = 30\) étapes plafonne à \(0,99^{30} \approx 74,0\,\%\) au premier essai et tombe à \(0,99^{150} \approx 22,1\,\%\) en constance \(\text{pass}^5\), loin des engagements SLA de \(99,5\,\%\) exigés en production.

### Dérive sémantique cumulative et piège économique de l'auto-correction libre

En pratique, la dégradation réelle est encore plus rapide que la borne de Lusser, car les erreurs successives ne sont pas indépendantes (\(P(\text{err}_{i+1} \mid \text{err}_i) \gg 1 - p\)). Dans une boucle agentique ouverte, chaque sortie intermédiaire contamine la fenêtre de contexte suivante (`OWASP ASI08 — Cascading Failures`) :

1. **Ancrage sur hallucination précoce** : Une mauvaise interprétation contractuelle au tour 3 biaise toutes les requêtes suivantes ; le modèle rationalise son erreur initiale avec une assurance croissante.
2. **Inflation quadratique des réessais** : Laisser un agent « réfléchir librement » après une erreur d'API empile les traces d'exception dans l'historique transmis à chaque tour, multipliant par vingt la consommation de jetons sans corriger la cause racine.
3. **Queue lourde de latence (\(P_{99}\))** : Les boucles ouvertes produisent des temps de réponse erratiques incompatibles avec les régimes opérationnels courts.

L'extrait Python suivant démontre comment le découplage hybride — ramener le processus sur une épine dorsale déterministe et réduire le raisonnement à \(m \ll n\) cellules bornées dotées de gardes déterministes et de repli — hisse la fiabilité au-delà de \(99,3\,\%\).

#### Extrait 2.1 — Modèle quantitatif de fiabilité composée et de gain d'encapsulation hybride

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class FlowProfile:
    name: str
    probabilistic_cells: int          # m cellules cognitives sur N étapes totales
    raw_accuracy: float               # Précision brute d'un essai modèle (p)
    guard_detection_rate: float       # Part d'erreurs captées par garde déterministe
    max_verified_retries: int         # Réessais bornés autorisés après interception
    safe_fallback_rate: float         # Succès sûr du circuit de repli (règle / HOTL)


def cell_reliability(cfg: FlowProfile) -> float:
    caught_err = (1.0 - cfg.raw_accuracy) * cfg.guard_detection_rate
    direct_ok = cfg.raw_accuracy * sum(
        caught_err**i for i in range(cfg.max_verified_retries + 1)
    )
    fallback_ok = (caught_err ** (cfg.max_verified_retries + 1)) * cfg.safe_fallback_rate
    return direct_ok + fallback_ok


def evaluate_flow(cfg: FlowProfile, k: int = 5) -> dict[str, float]:
    r_cell = cell_reliability(cfg)
    pass_1 = r_cell ** cfg.probabilistic_cells
    return {
        "cell_rel": round(r_cell, 5),
        "e2e_pass_1": round(pass_1, 4),
        "e2e_pass_k": round(pass_1**k, 4),
    }


if __name__ == "__main__":
    free_chain = FlowProfile("Chaîne LLM libre (15 sauts)", 15, 0.95, 0.0, 0, 0.0)
    hybrid = FlowProfile("Épine déterministe + 3 cellules bornées", 3, 0.95, 0.96, 1, 0.995)
    print(free_chain.name, evaluate_flow(free_chain))
    # {'cell_rel': 0.95, 'e2e_pass_1': 0.4633, 'e2e_pass_k': 0.0213}
    print(hybrid.name, evaluate_flow(hybrid))
    # {'cell_rel': 0.99789, 'e2e_pass_1': 0.9937, 'e2e_pass_k': 0.9688}
```

La loi d'ingénierie est directe : **on n'industrialise pas un système critique en pariant sur \(p = 0,9999\), mais en réduisant l'exposant \(m\) des transitions probabilistes et en filtrant déterministement leurs sorties**.

---

## 2.2 Séparation formelle entre plan de contrôle déterministe et boucle cognitive

L'architecture de référence en 2027 repose sur le patron **Deterministic Backbone, Bounded Probabilistic Cells**. Cette topologie inverse la hiérarchie des premiers cadriciels autonomes : ce n'est plus le modèle qui gouverne le cycle de vie et appelle du code ; **c'est une machine à états déterministe et durable qui pilote le processus et invoque ponctuellement une cellule cognitive confinée comme coprocesseur sémantique**.

![Architecture d'encapsulation hybride : épine dorsale déterministe gouvernant des cellules cognitives bornées avec gardes d'entrée/sortie et repli.](manuscrit/figures/fig-02-decouplage-hybride.svg)

Cette séparation repose sur quatre organes distincts :

1. **L'épine dorsale d'état durable (*Deterministic State Backbone*)** : Exécutée sur `Temporal`, `Restate` ou un moteur `BPMN 2.0`/`DMN`, elle détient le monopole de l'ordre légal des étapes, de la journalisation rejouable (*Event Sourcing*), des clés d'idempotence, des compensations `Saga` et des budgets. Aucune injection de prompt ne peut sauter un contrôle compilé dans le graphe déterministe.
2. **La garde d'entrée (*Input Guardrail*)** : Avant toute inférence, elle valide le schéma amont, masque les renseignements personnels superflus (`Loi 25`, `RGPD`), filtre les motifs d'injection indirecte (`OWASP ASI01`) et assemble le moindre contexte suffisant.
3. **La cellule cognitive bornée (*Bounded Probabilistic Cell*)** : Le modèle (`SLM` ou `LLM`) analyse les signaux ambigus ou non structurés. Ses outils `MCP` internes sont **strictement restreints à la lecture et à la simulation (*dry-run*)**. Un compteur externe arrête impérativement la réflexion à \(K_{\max}\) tours.
4. **La garde de sortie et le disjoncteur (*Output Guardrail & Fallback*)** : La proposition franchit un décodage contraint (`Structured Outputs`), puis une vérification déterministe d'invariants (`Cedar`/`OPA`, existence des références citées, seuil de confiance calibrée \(\tau\)). Ce n'est qu'après ce feu vert que l'épine dorsale exécute la mutation idempotente. En cas de rejet ou d'expiration (`Timeout`, `HTTP 429`), le disjoncteur route proprement le dossier vers une règle statique sûre ou une file `HOTL`.

#### Extrait 2.2 — Machine à états déterministe (`Temporal` TypeScript) encapsulant une cellule cognitive

```typescript
import { proxyActivities, ApplicationFailure } from "@temporalio/workflow";

export interface AlertWorkflowInput {
  readonly sagaId: string;
  readonly assetSerial: string;
  readonly criticalSla: boolean;
  readonly sensorDigest: string;
  readonly redactedNotes: string;
}

export interface DiagnosticProposal {
  readonly rootCauseCode: "BEARING_WEAR" | "VALVE_CAVITATION" | "SENSOR_DRIFT" | "UNKNOWN";
  readonly calibratedConfidence: number;
  readonly recommendedPartSku: string | null;
  readonly estimatedRepairCostCad: number;
  readonly citedHashes: ReadonlyArray<string>;
}

interface DeterministicActivities {
  checkContractDmn(assetSerial: string): Promise<{ covered: boolean; capCad: number }>;
  verifyInvariantsCedar(
    proposal: DiagnosticProposal,
    capCad: number,
    validHashes: ReadonlyArray<string>
  ): Promise<{ allowed: boolean; reason?: string }>;
  reservePartIdempotentMcp(sagaId: string, sku: string): Promise<{ reservationId: string }>;
  triggerDeterministicFallback(sagaId: string, reason: string): Promise<{ ticketId: string }>;
}

interface CognitiveCellActivities {
  runBoundedDiagnosticCell(args: {
    assetSerial: string;
    sensorDigest: string;
    notes: string;
    maxIterations: number;
    maxReasoningTokens: number;
  }): Promise<{ proposal: DiagnosticProposal; validHashes: string[] }>;
}

const det = proxyActivities<DeterministicActivities>({
  startToCloseTimeout: "5 seconds",
  retry: { maximumAttempts: 3 },
});

const cog = proxyActivities<CognitiveCellActivities>({
  startToCloseTimeout: "8 seconds",
  retry: {
    maximumAttempts: 2,
    nonRetryableErrorTypes: ["PromptInjectionError", "BudgetExhaustedError"],
  },
});

export async function resolveEquipmentAlertWorkflow(
  input: AlertWorkflowInput
): Promise<{ status: "AUTO_RESOLVED" | "FALLBACK_ESCALATED"; refId: string }> {
  // S1-S2 : Admissibilité contractuelle 100 % déterministe (DMN)
  const contract = await det.checkContractDmn(input.assetSerial);
  if (!contract.covered) {
    const fb = await det.triggerDeterministicFallback(input.sagaId, "CONTRACT_EXCLUDED");
    return { status: "FALLBACK_ESCALATED", refId: fb.ticketId };
  }

  // S3 : Cellule cognitive confinée (outils MCP lecture seule, K_max = 5, SLA 8 s)
  let proposal: DiagnosticProposal;
  let validHashes: string[];
  try {
    const out = await cog.runBoundedDiagnosticCell({
      assetSerial: input.assetSerial,
      sensorDigest: input.sensorDigest,
      notes: input.redactedNotes,
      maxIterations: 5,
      maxReasoningTokens: 2048,
    });
    proposal = out.proposal;
    validHashes = out.validHashes;
  } catch (err) {
    const code = err instanceof Error ? `CELL_ABORT:${err.message}` : "CELL_ABORT";
    const fb = await det.triggerDeterministicFallback(input.sagaId, code);
    return { status: "FALLBACK_ESCALATED", refId: fb.ticketId };
  }

  // Garde de sortie déterministe : confiance calibrée + politique Cedar + ancrage SHA-256
  const tau = input.criticalSla ? 0.90 : 0.82;
  if (proposal.calibratedConfidence < tau || proposal.rootCauseCode === "UNKNOWN") {
    const fb = await det.triggerDeterministicFallback(input.sagaId, "BELOW_CONFIDENCE_FLOOR");
    return { status: "FALLBACK_ESCALATED", refId: fb.ticketId };
  }

  const guard = await det.verifyInvariantsCedar(proposal, contract.capCad, validHashes);
  if (!guard.allowed) {
    const fb = await det.triggerDeterministicFallback(
      input.sagaId,
      `INVARIANT_REJECTED:${guard.reason ?? "POLICY"}`
    );
    return { status: "FALLBACK_ESCALATED", refId: fb.ticketId };
  }

  // S4 : Mutation transactionnelle idempotente exécutée hors du modèle
  if (!proposal.recommendedPartSku) {
    throw ApplicationFailure.nonRetryable("SKU manquant malgré validation garde.");
  }
  const res = await det.reservePartIdempotentMcp(input.sagaId, proposal.recommendedPartSku);
  return { status: "AUTO_RESOLVED", refId: res.reservationId };
}
```

::: {.encadre-sectoriel title="Secteur Bancaire et Assurances — Exigences de reproductibilité et d'explicabilité déterministe sous BSIF E-23"}

Pour les institutions financières fédérales soumises à la ligne directrice **BSIF E-23 révisée** (en vigueur le **1er mai 2027**) et les assureurs assujettis à l'**Annexe III de l'EU AI Act** (décembre 2027), le découplage hybride trace une **frontière d'imputation décisionnelle** vérifiable par les équipes de gestion du risque de modèle :

1. **Extraction sourcée (Cellule cognitive)** : Le modèle structure les faits issus de constats ou d'états financiers hétérogènes en attachant à chaque attribut la coordonnée exacte et l'empreinte du passage source.
2. **Adjudication 100 % déterministe (`DMN` / Moteur actuariel)** : Les calculs de ratios prudentiels, de franchises, d'exclusions légales et d'octroi demeurent codés dans des tables déterministes versionnées. Deux dossiers aux faits extraits identiques produisent avec une probabilité de \(1,000\) la même décision tarifaire et le même motif réglementaire opposable.

:::

---

## 2.3 Frontières d'autonomie : matrice d'arbitrage API, RPA, BPMN/DMN et agent LLM

L'ingénierie mature proscrit le réflexe du « tout-agent ». Utiliser un modèle génératif pour additionner des lignes de facture ou router un code postal multiplie la latence par cent et le coût marginal par dix mille tout en introduisant un risque d'erreur arithmétique ; inversement, maintenir dix mille expressions régulières pour interpréter des litiges techniques multilingues crée une dette fragile. Le tableau ci-dessous établit les frontières d'allocation normatives.

| Critère d'arbitrage | API / Microservice | `RPA` vs `CUA` encadré | `BPMN 2.0` & Règles `DMN` | Travailleur `SLM` (Tâche) | Cellule `LLM` bornée |
|---|---|---|---|---|---|
| **Entrées types** | JSON, Protobuf, EDI typé | Écrans patrimoniaux sans API | Attributs structurés, événements | Texte libre, PDF, journaux bruités | Signaux multi-sources ambigus |
| **Mécanisme** | Algorithme compilé exact | Sélecteurs UI (`RPA`) / Vision (`CUA`) | Machine à états & tables booléennes | Extraction mono-tour contrainte | Investigation bornée (`K <= 6`) |
| **Latence \(P_{95}\)** | 5 à 80 ms | 2–15 s (`RPA`) ; 8–45 s (`CUA`) | 10 à 150 ms | 120 à 600 ms | 1,5 à 9,0 s |
| **Coût unitaire** | \(< 0,0001\) \$ CAD | \(0,005\text{–}0,08\) \$ CAD | \(< 0,0005\) \$ CAD | \(0,0005\text{–}0,005\) \$ CAD | \(0,02\text{–}0,35\) \$ CAD |
| **Constance \(\text{pass}^5\)** | \(100\,\%\) | \(92\text{–}98\,\%\) | \(100\,\%\) | \(94\text{–}99\,\%\) | \(82\text{–}96\,\%\) brut (\(> 99\,\%\) gardé) |
| **Auditabilité** | Immédiate (tests unitaires) | Moyenne (captures vidéo/journaux) | Maximale (tables lisibles métier) | Modérée (jeu étalon doré) | Forte uniquement sous garde |
| **Rôle cible** | Calculs, CRUD, mutations SI | Pont transitoire `AS/400` / client lourd | Épine dorsale, barèmes et seuils | Triage massif, normalisation | Diagnostic complexe, exceptions |

Trois invariants gouvernent leurs combinaisons :

* **Zéro arithmétique probabiliste** : Tout calcul monétaire, fiscal, calendaire ou physique s'exécute exclusivement en code déterministe ou `DMN`.
* **Confinement des agents graphiques (`CUA`)** : Lorsqu'un système patrimonial sans API exige une interaction par écran, le `CUA` est encapsulé derrière un serveur `MCP` exposant une opération atomique encadrée d'assertions visuelles déterministes à chaque écran critique.
* **Chaînage `SLM` \(\rightarrow\) `DMN` par défaut** : Dans la majorité des dossiers administratifs, un `SLM` d'extraction alimentant une table `DMN` remplace avantageusement une boucle `ReAct` coûteuse.

::: {.encadre-sectoriel title="Chaînes d'Approvisionnement et Réseaux Critiques — Continuité déterministe en cas de défaillance d'inférence"}

Un centre de distribution national, un répartiteur électrique ou une logistique hospitalière ne peut tolérer qu'une panne régionale d'API GPU immobilise ses opérations physiques. L'architecture hybride impose un exercice trimestriel de **Débranchement Cognitif (*Cognitive Blackout Drill*)** : l'accès aux services d'inférence est coupé sur une fraction canari du trafic. En moins de 500 millisecondes, le disjoncteur de l'épine dorsale bascule sur ses **règles heuristiques statiques de secours** (réapprovisionnement min/max standard `SAP` et routage déterministe vers les files opérateurs). L'organisation cède temporairement l'optimisation fine de l'agent mais préserve 100 % de sa continuité vitale.

:::

---

## 2.4 Contrats d'entrée/sortie typés et bornes d'exécution (temps, jetons, profondeur)

Passer du *Prompt Engineering* artisanal au *Contract Engineering* industriel exige d'imposer quatre verrous physiques à l'extérieur du modèle :

1. **Décodage contraint et énumérations fermées** : La sortie obéit à un automate grammatical strict (`JSON Schema Draft 2020-12`, `additionalProperties: false`), limitant les codes d'action à un ensemble `enum` fini comprenant explicitement une valeur d'abstention (`UNKNOWN`).
2. **Preuves d'ancrage par empreinte (`SHA-256`)** : Chaque affirmation factuelle cite l'identifiant du fragment injecté et son préfixe d'empreinte cryptographique, vérifié en \(\mathcal{O}(1)\) par la garde de sortie pour neutraliser les citations hallucinées.
3. **Plafond explicite sur les jetons de raisonnement latent** : Avec les modèles à calcul adaptatif au moment de l'inférence (*reasoning models*), borner les seuls jetons visibles laisse le modèle dépenser 20 000 jetons de réflexion cachée sur un cas ambigu. Le harnais plafonne donc séparément `max_output_tokens` et `max_reasoning_tokens`.
4. **Échéance temporelle monotonique et confiance calibrée hors prompt** : Avant chaque tour \(k + 1 \le K_{\max}\), le harnais vérifie qu'il reste assez de millisecondes avant l'échéance SLA pour forcer une synthèse propre. Surtout, l'attribut `calibratedConfidence` ne repose jamais sur une auto-évaluation verbalisée par le modèle (systématiquement sur-confiante lors d'une hallucination) : le harnais le calcule en post-traitement par étalonnage de température (*Temperature Scaling* ou prédiction conforme) sur les `logprobs` des jetons d'énumération `rootCauseCode`, étalonné contre un jeu de validation hors échantillon.

| Classe de cellule | Profil de modèle | Tours lecture (\(K_{\max}\)) | Plafond jetons réflexion | Latence \(P_{99}\) max | Budget unitaire | Repli sur dépassement |
|---|---|---|---|---|---|---|
| **C1 — Extraction atomique** | `SLM` 3B–14B | \(0\) (mono-passe) | \(0\) (désactivé) | \(600\text{ ms}\) | \(0,003\) \$ CAD | Modèle secondaire ou file saisie |
| **C2 — Diagnostic opérationnel** | `SLM` domaine / `LLM` rapide | \(3\) à \(5\) | \(\le 2\,048\) | \(8,0\text{ s}\) | \(0,08\) \$ CAD | Synthèse partielle + escalade `HOTL` |
| **C3 — Adjudication complexe** | `LLM` de raisonnement | \(4\) à \(6\) | \(\le 6\,144\) | \(25,0\text{ s}\) | \(0,35\) \$ CAD | Gel sans écriture + dossier `CIBA` |
| **C4 — Méta-gouverneur critique** | Famille `LLM` distincte | \(0\) à \(2\) | \(\le 1\,536\) | \(3,5\text{ s}\) | \(0,05\) \$ CAD | *Fail-Closed* (blocage préventif `L3`) |

#### Extrait 2.3 — Schéma JSON normatif de sortie bornée avec ancrage factuel (`Draft 2020-12`)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.boreal.ca/fabric/v2/diagnostic-output.json",
  "title": "BoundedDiagnosticCellOutput",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "schemaVersion",
    "rootCauseCode",
    "calibratedConfidence",
    "uncertaintyFlags",
    "recommendedPartSku",
    "estimatedRepairCostCad",
    "evidenceCitations",
    "rationale"
  ],
  "properties": {
    "schemaVersion": { "const": "2.1.0" },
    "rootCauseCode": {
      "type": "string",
      "enum": ["BEARING_WEAR", "VALVE_CAVITATION", "THERMAL_OVERLOAD", "SENSOR_DRIFT", "UNKNOWN"]
    },
    "calibratedConfidence": { "type": "number", "minimum": 0.0, "maximum": 1.0 },
    "uncertaintyFlags": {
      "type": "array",
      "maxItems": 4,
      "items": {
        "type": "string",
        "enum": ["CONFLICTING_SENSORS", "MISSING_LOG", "OUT_OF_DISTRIBUTION", "AMBIGUOUS_CLAUSE"]
      }
    },
    "recommendedPartSku": {
      "type": ["string", "null"],
      "pattern": "^[A-Z0-9]{3,8}-[A-Z0-9]{2,8}-[A-Z0-9]{2,6}$"
    },
    "estimatedRepairCostCad": { "type": "number", "minimum": 0.0, "maximum": 50000.0 },
    "evidenceCitations": {
      "type": "array",
      "minItems": 1,
      "maxItems": 6,
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["chunkId", "sha256Prefix16"],
        "properties": {
          "chunkId": { "type": "string", "minLength": 4, "maxLength": 64 },
          "sha256Prefix16": { "type": "string", "pattern": "^[a-f0-9]{16}$" }
        }
      }
    },
    "rationale": { "type": "string", "minLength": 20, "maxLength": 500 }
  }
}
```

---

## 2.5 Application au fil rouge : encapsulation déterministe chez Boréal Services Numériques et BCA

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Encapsulation des boucles d'investigation de pannes chez BSN et d'adjudication chez BCA"}

**Situation initiale dégradée (T4 2026)** :
En parallèle de l'incident déclencheur à 41 000 \$ CAD provoqué par un prototype d'achat ayant bouclé pendant onze heures un dimanche sur une erreur `HTTP 429` non gérée, **Boréal Services Numériques (BSN)** exploitait un agent d'investigation de pannes télématiques codé en boucle `ReAct` ouverte exposant dix-neuf outils `ServiceNow`, `Snowflake` et `Salesforce`. Trois pathologies bloquaient son passage à l'échelle :

1. *Inconstance décisionnelle* : Rejouée cinq fois sur une même dérive de pression, la boucle concluait trois fois à une usure mécanique, une fois à un bruit capteur et modifiait une fois sans droit la priorité SLA du billet (\(\text{pass}^5 = 61\,\%\)).
2. *Tempêtes de requêtes* : Au moindre ralentissement `Snowflake`, l'agent relançait jusqu'à quatorze requêtes SQL redondantes, poussant la latence \(P_{99}\) à **142 s** et le coût moyen à **1,85 \$ CAD** par alerte.
3. *Veto réglementaire BCA* : La direction des risques de **Boréal Capital & Assurances (BCA)** interdisait toute connexion aux polices bris de machine avant l'échéance **BSIF E-23 du 1er mai 2027**, faute de frontière prouvable entre diagnostic probabiliste et calcul contractuel de franchise.

**Architecture déployée (Février 2027)** :
L'équipe remplace la boucle ouverte par le workflow `Temporal` de l'Extrait 2.2 :

* **Chez BSN** : L'épine dorsale assemble en amont les séries temporelles agrégées et purge les notes terrain des identifiants employés (`Loi 25`). La cellule de classe **C2** n'accède plus qu'à **4 outils `MCP` en lecture seule**, sous plafond \(K_{\max} = 5\) tours, 2 048 jetons de raisonnement et 8,0 s, avec sortie conforme au schéma `BoundedDiagnosticCellOutput`.
* **Chez BCA** : Le code de panne validé est transmis à un moteur déterministe `DMN` + `Cedar` qui calcule exactement la couverture, le plafond annuel et la franchise selon les règles `Guidewire` / `IBM i`.
* **Repli sûr** : Sur les 3,1 % d'alertes hors distribution (`OUT_OF_DISTRIBUTION`) ou sous le seuil \(\tau = 0,90\), le disjoncteur ouvre un dossier `AG-UI` à l'ingénieur niveau 2 sans écriture ERP risquée.

**Résultats vérifiés sur 18 400 alertes (45 jours)** :
Stabilité \(\text{pass}^5\) portée de **61,0 % à 99,2 %** (homologation interne BSIF E-23 obtenue), latence \(P_{99}\) réduite de **142 s à 9,4 s**, et coût moyen d'inférence abaissé de **1,85 \$ CAD à 0,06 \$ CAD** (-96,7 %).

:::

---

## 2.6 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-002 — Interdiction du routage global de processus critiques par inférence LLM non bornée"}

* **Statut** : Acceptée | **Périmètre** : Fabrique Agentique d'Entreprise (`L2` à `L4`) | **Révision** : Semestrielle
* **Contexte** : Les boucles agentiques pilotant librement des séquences d'outils mutatifs subissent une chute exponentielle de fiabilité composée (\(p^n\)), des défaillances en cascade (`OWASP ASI08`), des dérives financières sur erreurs transitoires et une incompatibilité directe avec l'auditabilité exigée par `BSIF E-23`, la `Loi 25` et l'`EU AI Act`.
* **Options évaluées** :
  1. *Boucle LLM autonome de bout en bout avec prompt durci* : **Rejetée** — une consigne textuelle n'offre aucune garantie déterministe sur les invariants, la latence \(P_{99}\) ou les budgets.
  2. *Exclusion totale des modèles génératifs des flux métiers* : **Rejetée** — maintient des délais manuels de 48 heures sur les pièces et signaux non structurés.
  3. *Épine dorsale déterministe durable encapsulant des cellules cognitives bornées* : Exécuter les transitions d'état, les calculs `DMN`/`Cedar` et les mutations `MCP` idempotentes hors du modèle ; restreindre le LLM à des cellules en lecture seule validées par gardes d'entrée/sortie et circuit de repli. **Retenue**.
* **Décision** : Aucun flux critique ne confie son aiguillage global ni l'exécution directe d'écritures irréversibles à une boucle probabiliste ouverte. Toute cellule cognitive en production impose : (a) compteur externe \(K_{\max}\), délai strict et plafond de jetons de raisonnement ; (b) schéma JSON fermé incluant une option d'abstention (`UNKNOWN`) et des empreintes d'ancrage ; (c) garde déterministe d'invariants avant mutation par l'épine dorsale ; (d) repli déterministe testé trimestriellement.
* **Conséquences** :
  * *Positives* : Constance \(\text{pass}^5 > 99\,\%\), maîtrise stricte des coûts et SLA, auditabilité réglementaire native et continuité d'activité en cas de panne d'inférence.
  * *Négatives / Coûts assumés* : Modélisation explicite préalable des machines à états durables, des tables `DMN` et des contrats JSON.
* **Condition de révision** : Réétalonnage semestriel des plafonds \(K_{\max}\) et des seuils \(\tau\) sur preuves statistiques issues des bancs \(\text{pass}^k\).

:::

### Liste de contrôle de mise en production — Chapitre 2

Avant d'autoriser le déploiement d'un flux hybride en production, validez ces huit exigences :

1. **Homologation en constance \(\text{pass}^5\)** : Le flux complet a-t-il franchi un banc d'au moins cent cas réels et contradictoires mesuré en reproductibilité \(\text{pass}^5\) plutôt qu'en simple \(\text{pass}@1\) ?
2. **Monopole déterministe des mutations et calculs** : Les règles tarifaires, seuils financiers, clés d'idempotence et appels `MCP` mutatifs s'exécutent-ils intégralement dans l'épine dorsale hors du modèle ?
3. **Isolation lecture seule en réflexion** : Les outils exposés à l'intérieur d'une cellule cognitive sont-ils strictement dépourvus d'effets de bord irréversibles ?
4. **Quadruple plafond physique** : Le harnais applique-t-il des limites dures sur \(K_{\max}\), les jetons d'entrée/sortie, les jetons de raisonnement caché et l'échéance temporelle monotonique ?
5. **Droit explicite à l'abstention** : Le schéma JSON fermé (`additionalProperties: false`) comporte-t-il un statut `UNKNOWN` et des drapeaux d'incertitude évitant les fabrications forcées ?
6. **Contrôle cryptographique des citations** : La garde de sortie vérifie-t-elle algorithmiquement que chaque empreinte de preuve citée appartient au contexte injecté ?
7. **Test de débranchement cognitif** : Le basculement en moins de 500 ms vers le mode dégradé heuristique ou `HOTL` a-t-il été prouvé sous injection d'erreurs `HTTP 429` et `HTTP 504` ?
8. **Opposabilité réglementaire** : Pouvez-vous isoler devant un auditeur `BSIF E-23` ou `Loi 25` la table `DMN` ou la politique `Cedar` exacte ayant autorisé chaque transaction ?
