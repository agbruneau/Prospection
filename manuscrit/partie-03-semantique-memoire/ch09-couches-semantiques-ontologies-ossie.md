# Chapitre 9 — Couches sémantiques normalisées et ontologies d'entreprise (Apache Ossie)

::: {.synthese-executive title="Synthèse exécutive — Chapitre 9"}

* **Enjeu stratégique** : Standardiser les protocoles d'échange (`MCP`, `A2A v1.0`) garantit que deux agents échangent des messages syntaxiquement valides, mais nullement qu'ils désignent la même réalité métier. Lorsqu'un agent interroge directement des tables physiques (*Text-to-SQL* brut) ou traverse trois divisions dont chacune définit différemment un « client actif », une « garantie valide » ou un « stock disponible », l'entreprise automatise à haute cadence des contresens comptables, commerciaux et réglementaires (*Confident Confusion*).
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Interdire à tout agent de production d'émettre du SQL ad hoc contre des schémas physiques bruts ; imposer le passage exclusif par une **couche sémantique déclarative neutre normalisée sous Apache Ossie** (*Open Semantic Interchange*) versionnée sous Git.
  2. *Structurante dès le jour 1* : Coupler cette couche analytique de lecture (`Apache Ossie`) à une **ontologie opérationnelle causale** formalisant les identifiants maîtres inter-systèmes (`MDM`), les automates d'états légaux et les contrats de préconditions/effets des actions mutatives.
  3. *Réversible par conception* : Les moteurs d'exécution cibles vers lesquels le manifeste `Apache Ossie` est compilé (`Snowflake Semantic Views`, `dbt Semantic Layer`, `Cube`, moteurs BI ou serveurs `MCP`) ainsi que le substrat de stockage du graphe ontologique.
* **Indicateurs de gouvernance associés** : Taux de couverture des concepts partagés par des manifestes `Apache Ossie`, taux de rejet transactionnel aval pour violation d'invariant métier (cible < 0,5 %), écart nul entre les chiffres présentés aux comités exécutifs (BI) et ceux consommés par les agents, et délai de propagation d'une règle d'affaires modifiée.

:::

## 9.1 La faille de Babel des architectures agentiques : pourquoi la syntaxe et le *Text-to-SQL* échouent

Le constat dressé entre 2024 et 2026 par les directions des données (CDO) est sans appel : **brancher un grand modèle de langage directement sur le catalogue de schémas physiques d'un entrepôt d'entreprise ne produit pas un analyste autonome, mais un générateur stochastique de chiffres plausibles**.

Sur une base de démonstration comptant huit tables limpides (`customers`, `orders`), le *Text-to-SQL* dépasse 90 % de réussite. Dans un grand compte exploitant quarante ans d'héritage applicatif, la réalité physique compte 14 000 tables dispersées entre des modules `SAP S/4HANA` (`VBAK`, `MARD`, `ACDOCA`), des fichiers physiques hérités d'`IBM i (AS/400)` aux mnémoniques de six caractères (`CSTSTS`, `WRTYCD`, `BAL90D`) et des centaines d'objets personnalisés ajoutés dans `Salesforce` au fil de fusions-acquisitions (`Account_Tier_Legacy_2021__c`).

Laisser un agent improviser ses propres jointures et formules d'agrégation sur un tel patrimoine échoue pour quatre causes structurelles :

1. **L'opacité des exclusions métier implicites** : Une table transactionnelle mêle ventes réelles, écritures techniques de contre-passation, commandes internes d'essai et lignes annulées logiquement (`STAT_CD NOT IN ('90', '99')`). Aucune clé étrangère SQL ne documente ces filtres ; l'agent qui les omet fausse les agrégats de 8 à 25 %.
2. **Les pièges relationnels d'agrégation (*Fan Traps* et *Chasm Traps*)** : Joindre en une même requête `SELECT SUM(contract_value)` une table de contrats (`1`), une table d'équipements (`N`) et une table d'avenants (`M`) multiplie silencieusement la valeur du contrat par le nombre d'avenants. Le moteur SQL s'exécute sans erreur syntaxique, et l'agent défend ce faux résultat avec aplomb.
3. **La polysémie organisationnelle légitime (*Semantic Drift*)** : Deux divisions emploient le même terme pour désigner des concepts distincts. Pour l'équipe SaaS, un « client actif » s'est connecté dans les trente derniers jours ; pour la finance, c'est un cocontractant sans facture échue depuis plus de soixante jours ; pour le support, c'est un parc sous contrat d'assistance ouvert. Sans désambiguïsation formelle, un orchestrateur mélange ces acceptions à chaque délégation `A2A`.
4. **L'asymétrie entre observer et muter** : Un agrégat analytique ne suffit jamais à légitimer une action. Lire trois turbines en stock comptable n'indique pas si l'agent a le droit contractuel d'allouer la dernière pièce du stock tampon réservé à un client sous pénalité SLA.

La probabilité d'exactitude d'une décision agentique croisant \(k\) concepts métiers s'écrit formellement :

\[P(\text{Exact}) = P(\text{Syntaxe}) \cdot \prod_{j=1}^{k} P(\text{Sens}_j \mid \mathcal{O})\]

Les protocoles de la Partie II (`MCP`, schémas JSON stricts, `A2A v1.0`) portent \(P(\text{Syntaxe})\) au-delà de \(0{,}999\). Mais sans référentiel sémantique partagé \(\mathcal{O}\), si chaque concept présente une probabilité d'interprétation exacte de \(0{,}80\), croiser quatre concepts (`client`, `garantie`, `stock`, `priorité SLA`) abaisse la fiabilité globale à \(0{,}80^4 \approx 0{,}41\), soit près de trois décisions erronées sur cinq.

| Approche d'accès au sens métier | Exactitude analytique chiffrée | Maîtrise des actions mutatives | Portabilité (BI + Agents) | Risque majeur en exploitation |
|---|---|---|---|---|
| **Text-to-SQL direct sur tables brutes** | Faible (55–72 % sur ERP réels) | Nulle (aucun automate d'état) | Nulle (couplé au SGBD) | *Fan traps*, oubli d'annulations, hallucinations chiffrées |
| **Prompts locaux par agent (Documentation ad hoc)** | Moyenne mais divergente | Fragile (prose non vérifiée) | Nulle (enfermé par agent) | Écarts chroniques entre calculs agents et rapports BI |
| **GraphRAG documentaire pur (Extraction LLM)** | Faible sur agrégats numériques | Incomplète (graphe non typé) | Modérée | Triplets bruyants extraits sans contrôle d'invariants |
| **Couplage `Apache Ossie` + Ontologie causale** | **Déterministe (> 99 % compilé)** | **Forte (préconditions formelles)** | **Maximale (standard ASF)** | Effort initial de gouvernance inter-divisions |

---

## 9.2 Apache Ossie (*Open Semantic Interchange*) : l'unification déclarative de la couche analytique

Jusqu'en 2025, les entreprises cherchant à dépasser le *Text-to-SQL* souffraient d'une fragmentation sévère : leurs métriques étaient dupliquées dans les formats captifs de leurs outils de visualisation (`Tableau`, `Power BI`, `Looker`, `Omni`), de transformation (`dbt`), de cubes (`Cube`) et d'entrepôts (`Snowflake`, `Databricks`). Toute évolution d'une règle de marge ou de disponibilité imposait quatre réécritures manuelles, sans qu'aucun serveur `MCP` agentique n'en bénéficie nativement.

L'initiative **Open Semantic Interchange (OSI)** — fondée par les grands acteurs de l'infrastructure analytique puis confiée à l'Apache Software Foundation sous le nom d'**Apache Ossie** — a résolu cette impasse par une approche de compilation ouverte.

### Philosophie architecturale : un artefact portable de compilation, non un serveur captif
`Apache Ossie` n'ajoute pas une boîte noire propriétaire sur le chemin critique des requêtes : **c'est une spécification ouverte de manifeste sémantique en YAML**, jouant pour les métriques et dimensions le rôle que jouent `Protocol Buffers` ou `OpenAPI` pour les API.

À partir d'un dépôt Git unique gouverné par les propriétaires de domaines (*Data Product Owners*), un pipeline `CI/CD` compile le manifeste `Apache Ossie` simultanément vers :

* les vues sémantiques natives des entrepôts (`Snowflake Semantic Views`, `Databricks Unity Catalog Metric Views`) ;
* les moteurs analytiques et BI (`dbt`, `Cube`, tableaux de bord exécutifs) ;
* et **les serveurs `MCP` analytiques de la fabrique agentique**, exposant chaque indicateur certifié comme un outil paramétré sans génération libre de SQL.

Lorsqu'un directeur financier consulte son rapport mensuel et lorsqu'un agent `L3` statue à 3 h du matin sur une prise en charge urgente, **tous deux exécutent mathématiquement le même arbre relationnel compilé depuis le même fichier `Apache Ossie`**.

### Les cinq primitives normatives d'un manifeste `Apache Ossie`

1. **`datasets`** : Relient chaque entité logique métier (fait ou dimension nettoyée) à sa table ou vue source en déclarant ses clés primaires (`primary_key`).
2. **`fields`** : Déclarent les dimensions et attributs exposés (types stricts, expressions SQL normalisées, marqueurs temporels `dimension.is_time`), masquant les colonnes techniques internes.
3. **`metrics`** : Figent les formules quantitatives officielles (`SUM`, `COUNT DISTINCT`, ratios conditionnels). L'agent invoque `net_allocatable_atp_qty` ; il n'invente jamais sa propre soustraction des stocks bloqués.
4. **`relationships`** : Définissent le graphe orienté des jointures légales (`from_columns`, `to_columns`) et leur cardinalité afin d'interdire tout *Fan Trap* lors d'agrégations multi-tables.
5. **`ai_context`** : Présente à la racine comme sur chaque champ, métrique ou relation les **instructions normatives d'interprétation**, les **synonymes métiers par division** et les **exclusions explicites** prévenant les confusions sémantiques.

### Gouvernance du cycle de vie sémantique (`Semantic CI/CD`) et compatibilité ascendante

Un manifeste `Apache Ossie` partagé par vingt-cinq agents autonomes doit être gouverné avec la même rigueur contractuelle qu'une interface publique d'API. Modifier silencieusement le sens d'un booléen critique — par exemple abaisser le seuil d'arriéré toléré de `is_active_commercial_customer` de soixante à trente jours sans incrémenter la version majeure du modèle — modifie du jour au lendemain le comportement décisionnel de tous les agents consommateurs, ce qui constitue un changement matériel au sens de la ligne directrice **BSIF E-23**.

Les plateformes matures imposent donc un pipeline de **validation sémantique continue** comportant trois garde-fous automatisés à chaque demande de fusion Git :

* **Vérification statique d'intégrité référentielle et d'acyclicité** : Le validateur inspecte les expressions SQL, confirme l'existence des colonnes dans le catalogue de l'entrepôt cible et rejette tout cycle ambigu de jointures dans le bloc `relationships`.
* **Détection de rupture de contrat sémantique (*Semantic Breaking-Change Linter*)** : Renommer une métrique, altérer le type de retour d'un champ ou modifier la logique d'un prédicat sans mise à jour de version sémantique (`SemVer`) bloque le déploiement tant que les propriétaires des `Agent Cards` abonnées n'ont pas contresigné l'impact.
* **Tests d'assertion dorés (*Golden Metric Assertions*)** : Exécution sur un jeu de données figé de requêtes témoins vérifiant que chaque cible de compilation (`Snowflake`, `dbt`/`Cube` et serveur `MCP`) restitue exactement les mêmes valeurs décimales à \(10^{-6}\) près.

#### Extrait 9.1 — Manifeste sémantique complet `Apache Ossie` (`boreal_core_operations.ossie.yaml`)
Ce manifeste unifie chez Groupe Boréal la définition exacte d'un client commercial actif, d'une garantie valide et du stock net allouable à la promesse (`ATP`) :

```yaml
version: "1.0.0"
name: boreal_core_operations_semantic_model
description: "Modèle sémantique canonique inter-divisions du Groupe Boréal (BSN, BCA, BEL)."

ai_context:
  instructions: >
    Source unique de vérité analytique pour qualifier un client, vérifier l'admissibilité d'une garantie
    équipement et calculer la disponibilité nette de pièces (ATP). Ne jamais assimiler un compte d'essai
    télématique gratuit BSN à un client actif. Ne jamais promettre une pièce sur la base du stock physique
    brut SAP (labst_raw) : interroger exclusivement la métrique net_allocatable_atp_qty.
  synonyms: ["référentiel parc installé Boréal", "vérité client garantie stock"]

datasets:
  - name: enterprise_customer
    description: "Entité cliente maître réconciliée (MDM) entre Salesforce BSN, IBM i BCA et SAP BEL."
    source: boreal_gold.mdm.dim_enterprise_customer
    primary_key: [boreal_party_id]
    fields:
      - name: boreal_party_id
        datatype: String
        expression: { sql: boreal_party_id }
      - name: legal_entity_name
        datatype: String
        expression: { sql: legal_entity_name }
      - name: overdue_balance_over_60d_cad
        datatype: Decimal
        expression: { sql: ar_overdue_60d_amount_cad }
      - name: is_active_commercial_customer
        datatype: Boolean
        expression:
          sql: >
            (commercial_lifecycle_stage = 'SIGNED_CONTRACT_ACTIVE'
             AND is_free_telemetry_trial = FALSE
             AND COALESCE(ar_overdue_60d_amount_cad, 0) = 0
             AND legal_hold_flag = FALSE)
        ai_context:
          instructions: >
            Définition normative Groupe Boréal d'un « client actif ». Exclut les essais SaaS gratuits 90 jours,
            les dossiers en gel contentieux et tout arriéré comptable dépassant 60 jours.
          synonyms: ["client actif", "compte commercial en règle"]

  - name: equipment_warranty_contract
    description: "Contrats de garantie bris de machine synchronisés depuis BCA (IBM i / Guidewire)."
    source: boreal_gold.bca.fct_warranty_coverages
    primary_key: [warranty_contract_id, equipment_serial_number]
    fields:
      - name: warranty_contract_id
        datatype: String
        expression: { sql: warranty_contract_id }
      - name: boreal_party_id
        datatype: String
        expression: { sql: holder_boreal_party_id }
      - name: equipment_serial_number
        datatype: String
        expression: { sql: equipment_serial_number }
      - name: is_warranty_coverage_valid
        datatype: Boolean
        expression:
          sql: >
            (policy_status = 'IN_FORCE'
             AND CURRENT_DATE() BETWEEN effective_start_date AND effective_end_date
             AND telemetry_verified_hours <= contractual_hour_ceiling
             AND lease_delinquency_30d_flag = FALSE)
        ai_context:
          instructions: >
            Vrai uniquement si la police est en vigueur, le plafond d'heures moteur mesuré par télémétrie BSN
            est respecté et le contrat de crédit-bail BCA ne présente aucun impayé > 30 jours.
          synonyms: ["garantie valide", "couverture bris active"]
    metrics:
      - name: active_covered_units_count
        description: "Nombre d'équipements couverts par une garantie valide."
        datatype: Integer
        expression:
          sql: COUNT(DISTINCT CASE WHEN is_warranty_coverage_valid THEN equipment_serial_number END)

  - name: spare_part_plant_inventory
    description: "Position temps réel (CDC Kafka < 30s) des stocks de pièces dans SAP S/4HANA (BEL)."
    source: boreal_gold.bel.fct_sap_spare_inventory_rt
    primary_key: [material_code, plant_depot_code]
    fields:
      - name: material_code
        datatype: String
        expression: { sql: matnr_canonical }
      - name: plant_depot_code
        datatype: String
        expression: { sql: werks_depot_code }
      - name: safety_floor_qty
        datatype: Integer
        expression: { sql: contractual_safety_buffer_qty }
    metrics:
      - name: net_allocatable_atp_qty
        description: "Stock net disponible à la promesse (ATP) hors réservations fermes et tampon SLA."
        datatype: Integer
        expression:
          sql: >
            SUM(GREATEST(0,
              sap_labst_qty - committed_open_reservations_qty - contractual_safety_buffer_qty
            ))
        ai_context:
          instructions: >
            Seule métrique autorisée pour allouer automatiquement une pièce. Retranche du stock libre SAP
            (sap_labst_qty, déjà hors quarantaine qualité) les réservations ouvertes et le tampon contractuel.
          synonyms: ["stock disponible", "disponibilité nette ATP", "pièces allouables"]

relationships:
  - name: warranty_to_enterprise_customer
    description: "Relie chaque contrat de garantie d'équipement à l'entité juridique cliente maître."
    from: equipment_warranty_contract
    to: enterprise_customer
    cardinality: many_to_one
    from_columns: [boreal_party_id]
    to_columns: [boreal_party_id]
    ai_context:
      synonyms: ["titulaire de la garantie", "locataire assuré"]
```

---

## 9.3 De la lecture analytique à l'action sûre : l'ontologie opérationnelle causale

Un manifeste `Apache Ossie` tranche souverainement la **vérité descriptive et analytique** : tous les acteurs humains et logiciels s'accordent sur ce qui *est*. Toutefois, le *System of Action* d'une entreprise agentique ne se borne pas à lire des agrégats ; il **modifie l'état des systèmes transactionnels**.

Or, une couche analytique BI ne modélise ni la **légalité des transitions d'état**, ni la **causalité opérationnelle**. Lire `net_allocatable_atp_qty = 2` à Montréal-Est ne dit pas à l'orchestrateur :

1. Si l'ordre de travail courant se trouve bien à l'état `DIAGNOSIS_QUALIFIED` autorisant le passage vers `PARTS_COMMITTED` ;
2. Quelles **préconditions inter-divisions** doivent être réunies simultanément (client commercial actif au sens `Ossie`, compatibilité nomenclature `BOM` certifiée, plafond financier d'autonomie `L3` respecté) ;
3. Dans quel cas exceptionnel une règle métier autorise à puiser dans le tampon `safety_floor_qty` ;
4. Quel outil `MCP` inverse appeler en compensation si l'affectation terrain échoue ensuite.

Tel est le mandat de l'**ontologie opérationnelle causale**, second pilier de l'architecture duale représentée ci-dessous. Tandis qu'`Apache Ossie` gouverne les **noms et les métriques** (*Nouns & Metrics*), l'ontologie causale gouverne les **états, les invariants et les verbes cinétiques** (*States, Invariants & Kinetic Actions*).

![Architecture duale couplant la couche sémantique analytique Apache Ossie et l'ontologie opérationnelle causale au sein d'un pipeline neuro-symbolique.](manuscrit/figures/fig-09-apache-ossie-ontologie.svg)

| Concept canonique | Ambiguïtés historiques des silos | Vérité analytique (`Apache Ossie`) | Règle causale & d'action (Ontologie opérationnelle) |
|---|---|---|---|
| **Client (`EnterpriseCustomer`)** | Essai gratuit SaaS (BSN) vs locataire bail (BCA) vs acheteur pièces (BEL) | Booléen certifié `is_active_commercial_customer` sur clé `boreal_party_id` | **Invariant** : Toute mutation `L3` sans pré-paiement exige `is_active_commercial_customer == true` |
| **Garantie (`WarrantyCoverage`)** | Police active aux dates calendaires mais plafond d'heures moteur crevé | Booléen `is_warranty_coverage_valid` croisant dates, loyers et heures IoT | **Action `PreauthorizeClaim`** : Autorisée depuis `IN_FORCE` ; escalade `HOTL` si coût > 5 000 \$ CAD |
| **Stock (`SpareInventory`)** | Colonne brute `LABST` mêlant stock libre et tampon d'urgence `SLA 99,5 %` | Métrique `net_allocatable_atp_qty` isolant le tampon contractuel | **Action `AllocateReplacementPart`** : Accès à `safety_floor_qty` réservé au rang `PLATINUM_995` |

#### Extrait 9.2 — Contrat d'action cinétique et vérificateur déterministe de préconditions (TypeScript)
Plutôt que d'énoncer ces garde-fous critiques dans un prompt en prose sujet à l'oubli probabiliste, la plateforme les exécute dans un registre ontologique typé *avant* tout appel `MCP` :

```typescript
export type WorkOrderState =
  | "TRIAGE_PENDING" | "DIAGNOSIS_QUALIFIED" | "WARRANTY_AND_PARTS_COMMITTED" | "DISPATCHED" | "CLOSED";

export interface DomainSnapshot {
  readonly partyId: string;
  readonly isActiveCommercialCustomer: boolean; // Issu d'Apache Ossie
  readonly slaTier: "STANDARD" | "GOLD_990" | "PLATINUM_995";
  readonly isWarrantyValid: boolean;            // Issu d'Apache Ossie
  readonly estimatedRepairCostCad: number;
  readonly currentWorkOrderState: WorkOrderState;
  readonly netAllocatableAtpQty: number;        // Issu d'Apache Ossie
  readonly safetyFloorQty: number;
}

export type PreconditionVerdict =
  | { readonly status: "EXECUTABLE"; readonly nextState: WorkOrderState }
  | { readonly status: "REQUIRES_HOTL"; readonly reasonCode: string; readonly queue: string }
  | { readonly status: "ILLEGAL_ACTION"; readonly violatedInvariant: string };

export const AllocateWarrantyReplacementPart = {
  actionId: "boreal.ontology.action.AllocateWarrantyReplacementPart",
  mcpTool: "sap_reserve_critical_spare_part",
  compensationMcpTool: "sap_release_spare_part_reservation",
  allowedFrom: ["DIAGNOSIS_QUALIFIED"] as ReadonlyArray<WorkOrderState>,
  targetState: "WARRANTY_AND_PARTS_COMMITTED" as WorkOrderState,

  verify(snap: DomainSnapshot, reqQty: number, allowSafetyTap: boolean): PreconditionVerdict {
    if (!Number.isInteger(reqQty) || reqQty <= 0) {
      return { status: "ILLEGAL_ACTION", violatedInvariant: `Quantité demandée invalide (${reqQty}).` };
    }
    if (!AllocateWarrantyReplacementPart.allowedFrom.includes(snap.currentWorkOrderState)) {
      return { status: "ILLEGAL_ACTION", violatedInvariant: `État illégal : ${snap.currentWorkOrderState}.` };
    }
    if (!snap.isActiveCommercialCustomer) {
      return { status: "ILLEGAL_ACTION", violatedInvariant: `Tiers ${snap.partyId} inactif au sens Ossie.` };
    }
    if (snap.netAllocatableAtpQty < reqQty) {
      const canTapBuffer = allowSafetyTap && snap.slaTier === "PLATINUM_995" &&
        (snap.netAllocatableAtpQty + snap.safetyFloorQty >= reqQty);
      if (!canTapBuffer) {
        return { status: "ILLEGAL_ACTION", violatedInvariant: `Stock ATP insuffisant (${snap.netAllocatableAtpQty}).` };
      }
    }
    if (!snap.isWarrantyValid) {
      return { status: "REQUIRES_HOTL", reasonCode: "OUT_OF_WARRANTY_QUOTE_NEEDED", queue: "bsn-commercial-hotl" };
    }
    if (snap.estimatedRepairCostCad > 5000) {
      return { status: "REQUIRES_HOTL", reasonCode: "EXCEEDS_L3_CEILING_5000_CAD", queue: "bca-underwriting-hotl" };
    }
    return { status: "EXECUTABLE", nextState: AllocateWarrantyReplacementPart.targetState };
  }
};
```

Ce découplage neuro-symbolique sécurise l'automatisation : le modèle exploite sa souplesse linguistique pour qualifier un symptôme complexe, mais **il lui est structurellement impossible d'enfreindre une transition d'état, un seuil actuariel ou la sanctuarisation d'un stock tampon**. En exploitation haute concurrence, ce pré-contrôle sur vue analytique `Apache Ossie` (rafraîchie par `CDC` en moins de trente secondes) demeure en outre doublé d'une garde atomique `Compare-And-Set` dans le serveur `MCP` transactionnel afin d'arbitrer sans sur-allocation deux sagas parallèles qui viseraient simultanément la dernière pièce disponible (`ATP = 1`).

---

## 9.4 Résolution neuro-symbolique et *GraphRAG* ontologique avant planification

Comment l'orchestrateur relie-t-il une alerte textuelle imprécise (« *Usine Boisbriand – Compresseur ligne 3 en surchauffe* ») aux clés canoniques `boreal_party_id` et `matnr_canonical` ? Par un pipeline de **résolution neuro-symbolique pré-planification** (*Ontology-Grounded GraphRAG*).

Contrairement au *GraphRAG* documentaire naïf de 2024 qui demandait à un LLM d'extraire des triplets approximatifs depuis des PDF, le *GraphRAG* d'entreprise en 2027 projette les référentiels maîtres (`MDM`), les nomenclatures d'ingénierie (`BOM`) et les relations `Apache Ossie` dans un graphe typé gouverné. Avant toute génération de plan par le LLM orchestrateur, le médiateur exécute quatre étapes déterministes en moins de 80 ms :

1. **Résolution d'entités sans devinette (*Entity Linking*)** : Appariement lexical et vectoriel sur les alias de sites pour résoudre la mention brute vers l'URI unique `urn:boreal:asset:BOR-CMP-90441`. Si plusieurs actifs candidats subsistent, le médiateur suspend toute action mutative et requiert une désambiguïsation explicite.
2. **Expansion ontologique bornée à deux sauts** : Traversée des relations certifiées (Actif → Pièces compatibles `BOM` → Dépôts régionaux rattachés ; Actif → Contrat de garantie BCA).
3. **Hydratation chiffrée via `Apache Ossie`** : Exécution paramétrée des métriques et attributs certifiés sur les entités résolues.
4. **Élagage préalable de l'espace d'actions (*Action Space Pruning*)** : Évaluation des préconditions ontologiques afin de ne transmettre au LLM planificateur qu'un dossier d'état certifié assorti des seules actions légalement exécutables ou admissibles à l'escalade `HOTL`.

#### Extrait 9.3 — Résolveur neuro-symbolique pré-planification (`NeuroSymbolicPlanningResolver` en Python)
```python
from dataclasses import dataclass
from typing import Any, Protocol, Sequence

@dataclass(frozen=True)
class AssetNode:
    party_id: str; legal_name: str; sla_tier: str; serial: str
    valid_bom_parts: tuple[str, ...]; depots: tuple[str, ...]; wo_state: str

class OntologyGraph(Protocol):
    def resolve_asset(self, mention: str, device_hint: str | None) -> Sequence[AssetNode]: ...

class OssieClient(Protocol):
    def query(self, model: str, dims: Sequence[str], metrics: Sequence[str], filters: dict[str, Any]) -> list[dict]: ...

class NeuroSymbolicPlanningResolver:
    MODEL = "boreal_core_operations_semantic_model"

    def __init__(self, graph: OntologyGraph, ossie: OssieClient) -> None:
        self._graph, self._ossie = graph, ossie

    def prepare_planning_brief(
        self, site_mention: str, device_hint: str | None, part_code: str, est_cost_cad: float
    ) -> dict[str, Any]:
        matches = self._graph.resolve_asset(site_mention, device_hint)
        if len(matches) != 1:
            return {
                "status": "DISAMBIGUATION_REQUIRED",
                "candidates": [m.serial for m in matches],
                "admissible_actions": [],
            }

        asset = matches[0]
        if asset.wo_state != "DIAGNOSIS_QUALIFIED" or part_code not in asset.valid_bom_parts:
            reason = f"État {asset.wo_state} illégal." if asset.wo_state != "DIAGNOSIS_QUALIFIED" else f"Pièce {part_code} hors BOM."
            return {
                "status": "READY",
                "admissible_actions": [],
                "blocked": [{"action": "AllocateWarrantyReplacementPart", "reason": reason}],
            }

        cust = self._ossie.query(
            model=self.MODEL,
            dims=["enterprise_customer.is_active_commercial_customer",
                  "equipment_warranty_contract.is_warranty_coverage_valid"],
            metrics=[
                "equipment_warranty_contract.active_covered_units_count"
            ],
            filters={"enterprise_customer.boreal_party_id": asset.party_id,
                     "equipment_warranty_contract.equipment_serial_number": asset.serial},
        )
        inv = self._ossie.query(
            model=self.MODEL,
            dims=["spare_part_plant_inventory.plant_depot_code"],
            metrics=["spare_part_plant_inventory.net_allocatable_atp_qty"],
            filters={"spare_part_plant_inventory.material_code": part_code,
                     "spare_part_plant_inventory.plant_depot_code": list(asset.depots)},
        )

        c_fact = cust[0] if cust else {}
        active = bool(c_fact.get("is_active_commercial_customer", False))
        warranty = bool(c_fact.get("is_warranty_coverage_valid", False))
        atp = {r["plant_depot_code"]: int(r["net_allocatable_atp_qty"]) for r in inv}
        viable = [d for d, q in atp.items() if q >= 1]

        admissible, blocked = [], []
        if active and warranty and viable and est_cost_cad <= 5000.0:
            admissible.append({"action": "AllocateWarrantyReplacementPart", "mode": "L3_AUTO", "depot": viable[0]})
        elif active and viable:
            admissible.append({"action": "AllocateWarrantyReplacementPart", "mode": "HOTL_ESCALATION"})
        else:
            blocked.append({"action": "AllocateWarrantyReplacementPart", "reason": "Client inactif ou rupture ATP."})

        return {
            "status": "READY",
            "canonical_asset": {"party_id": asset.party_id, "serial": asset.serial, "wo_state": asset.wo_state},
            "ossie_facts": {"active_customer": active, "valid_warranty": warranty, "atp_by_depot": atp},
            "admissible_actions": admissible,
            "blocked": blocked,
        }
```

Au-delà de la sécurité transactionnelle, ce médiateur divise par trois la consommation de jetons de raisonnement (*thinking tokens*) du modèle planificateur, qui n'a plus à tâtonner par appels d'outils infructueux.

::: {.encadre-sectoriel title="Commerce Omnicanal & Distribution — Promesse de disponibilité (ATP), tarification unifiée et retours sans friction"}

Dans le commerce omnicanal et la distribution B2B, l'essor d'agents d'achat externes et d'agents internes d'après-vente expose brutalement toute divergence sémantique entre canaux :

1. **Stock comptable magasin vs promesse `ATP` (*Available-to-Promise*)** : Un ERP affiche 4 articles en succursale, mais 2 sont dans des paniers physiques en rayon, 1 est un modèle d'exposition abîmé et 1 attend son ramassage *Click & Collect*. Sans une métrique `Apache Ossie` intégrant une décote de surface de vente et les verrous de l'orchestrateur de commandes (`OMS`), l'agent promet un retrait express qui échoue en rupture client.
2. **Non-cumul promotionnel (*Promotion Stacking*)** : L'ontologie causale doit encoder formellement l'incompatibilité entre remises cadres B2B, démarques saisonnières et gestes de rétention avant toute émission d'offre ferme.
3. **Remboursements sans retour physique (*Returnless Refunds*)** : Lorsque le transport retour excède la valeur résiduelle d'un article défectueux, l'ontologie autorise un crédit immédiat sans étiquette retour, mais verrouille automatiquement cette transition dès que le score de récurrence d'incidents du compte ou du transporteur dépasse le seuil antifraude.

:::

::: {.encadre-sectoriel title="Secteur Santé & Sciences de la Vie — Terminologies normatives (HL7 FHIR, SNOMED CT) et interdiction de l'approximation vectorielle"}

Dans les réseaux hospitaliers, l'assurance santé et la pharmacovigilance, l'alignement sémantique s'appuie sur des ontologies cliniques internationales : ressources **`HL7 FHIR R5`**, nomenclature **`SNOMED CT`**, analyses **`LOINC`** et référentiels médicamenteux **`RxNorm` / Santé Canada**. Une règle absolue de sûreté médicale s'impose : **aucun agent de coordination des soins ou de pré-autorisation ne doit résoudre un terme clinique par simple proximité cosinus d'embeddings**. Dans un espace vectoriel dense, *« hyperkaliémie sévère »* et *« hypokaliémie sévère »* affichent une similarité supérieure à \(0{,}94\) tout en appelant des gestes opposés. Toute résolution agentique doit transiter par un serveur terminologique déterministe validant les hiérarchies `IS-A` de `SNOMED CT` et les profils `FHIR`.

:::

---

## 9.5 Application au fil rouge : l'alignement sémantique inter-divisions chez Groupe Boréal

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Réconcilier « client actif », « garantie valide » et « stock disponible » entre BSN, BCA et BEL"}

**L'alerte d'audit interne (Février 2027)** :
En élargissant les flux inter-divisions à 1 100 dossiers sur trois semaines, l'audit interne de Groupe Boréal a constaté que **19,4 % des sagas subissaient soit un rejet transactionnel tardif dans `SAP` ou l'`AS/400`, soit une perte financière sèche**. Trois schismes sémantiques en étaient la cause directe :

1. **Le faux « client actif » (37 400 \$ CAD de pièces expédiées à perte)** : Pour stimuler son adoption SaaS, **Boréal Services Numériques (BSN)** accordait 90 jours d'essai gratuit à des prospects industriels avec `Account.Status__c = 'Active'` dans `Salesforce`. L'orchestrateur assimilait ce champ local à un contrat commercial en vigueur et engageait des réservations prioritaires pour des prospects non facturables.
2. **La fausse « garantie valide » (Litiges inter-filiales)** : Sur l'`IBM i (AS/400)` de **Boréal Capital & Assurances (BCA)**, une police demeurait au statut `IN_FORCE` jusqu'à son échéance annuelle même lorsque le locataire avait dépassé de 1 200 heures son quota contractuel d'utilisation mesuré par la télémétrie BSN, ou accusait 45 jours d'impayé crédit-bail. L'agent BCA lisant la seule colonne `POLSTS` accordait indûment la gratuité.
3. **Le faux « stock disponible » (Pénalités SLA chez Boréal Équipements & Logistique — BEL)** : Un premier serveur `MCP` lisait directement la colonne physique `MARD.LABST` dans `SAP S/4HANA`. Par deux fois, un agent a alloué à un dépannage ordinaire la dernière turbine gardée en **tampon contractuel de sécurité** pour une aluminerie québécoise sous SLA 99,5 %.

**Remédiation déployée par le Bureau de Gouvernance Sémantique (Mars–Avril 2027)** :

* **Dépôt fédéré `boreal-semantic-contracts` sous Apache Ossie** : Un comité tripartite (propriétaire produit BSN, actuaire BCA, logistique BEL) a normalisé en trois semaines les 42 métriques et dimensions transversales du groupe (dont l'Extrait 9.1), compilées par `CI/CD` vers `Snowflake` et les serveurs `MCP` analytiques.
* **Médiation neuro-symbolique obligatoire (Extraits 9.2 et 9.3)** : Résolution préalable vers `boreal_party_id` et blocage déterministe de toute ponction sur un tampon de sécurité hors SLA `PLATINUM_995`.

**Résultats vérifiés au trimestre suivant (T2 2027)** :

* **Rejets transactionnels ou annulations aval** : abaissés de **19,4 % à 0,28 %**.
* **Expéditions ou prises en charge hors contrat** : ramenées à **0 \$ CAD** sur 18 500 dossiers consécutifs.
* **Concordance BI / Agents** : **100 % d'identité mathématique** entre les tableaux de bord exécutifs du siège de Montréal et les métriques lues en temps réel par les 24 agents spécialistes.

:::

---

## 9.6 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-009 — Adoption d'Apache Ossie pour la sémantique analytique et d'une ontologie causale versionnée pour les actions"}

* **Statut** : Acceptée | **Périmètre** : Données d'Entreprise & Fabrique Agentique | **Révision** : Annuelle
* **Contexte** : L'interrogation directe des schémas physiques (*Text-to-SQL* libre) et l'absence de définitions partagées entre divisions provoquent des erreurs d'agrégation (*Fan Traps*), des interprétations contradictoires des concepts pivots (client, couverture, stock) et des mutations violant des invariants métiers.
* **Options évaluées** :
  1. *Exemples SQL dans les prompts d'agents* : Documenter les tables dans chaque consigne. **Rejetée** — duplication ingérable, dérive face aux évolutions de schémas et risque élevé d'hallucination chiffrée.
  2. *Couche sémantique captive d'un outil BI unique* : Forcer tous les agents à passer par l'API propriétaire d'un éditeur BI. **Rejetée** — verrouillage critique, coût prohibitif à haute cadence machine et absence de modélisation des mutations.
  3. *Architecture duale ouverte : manifestes YAML Apache Ossie + ontologie opérationnelle causale* : Standardiser les métriques, relations et instructions `ai_context` sous `Apache Ossie` compilé vers l'entrepôt et les serveurs `MCP`, et lier chaque outil mutatif à un contrat formel d'état et de préconditions évalué avant planification. **Retenue**.
* **Décision** : (a) Le *Text-to-SQL* libre sur tables physiques est interdit en production pour tout agent `L1`–`L4` ; (b) tout concept partagé entre deux applications ou divisions doit figurer au référentiel Git `Apache Ossie` ; (c) tout outil `MCP` mutatif `L2`+ doit être adossé à une action ontologique déclarant ses états sources légaux, ses préconditions vérifiables sur `Ossie` et sa compensation.
* **Conséquences** :
  * *Positives* : Unité mathématique entre rapports BI et agents, indépendance vis-à-vis des moteurs analytiques, quasi-disparition des rejets aval et auditabilité formelle (`BSIF E-23`).
  * *Négatives / Coûts assumés* : Gouvernance inter-divisions (*Semantic Stewardship*), maintien des clés maîtres `MDM` et modélisation explicite des automates d'états.
* **Condition de révision** : Alignement annuel sur les versions majeures d'`Apache Ossie` (ASF) et de la Linux Foundation AAIF.

:::

### Liste de contrôle de mise en production — Chapitre 9

1. **Interdiction du *Text-to-SQL* brut** : Aucun agent de production ne détient-il d'accès permettant d'exécuter du SQL généré librement sur les tables physiques des ERP, CRM ou lacs bruts ?
2. **Manifestes `Apache Ossie` sous `CI/CD`** : Les concepts transversaux sont-ils définis en YAML `Apache Ossie`, validés par revue croisée métier et compilés automatiquement vers la BI et les serveurs `MCP` ?
3. **Richesse des blocs `ai_context`** : Chaque entité, métrique critique et relation documente-t-elle ses règles de désambiguïsation, ses synonymes par division et ses exclusions ?
4. **Immunité contre les *Fan Traps*** : Toutes les agrégations multi-tables reposent-elles exclusivement sur les `relationships` certifiées du manifeste sémantique ?
5. **Résolution `MDM` stricte** : Le médiateur pré-planification résout-il les mentions locales en URI maîtres uniques en exigeant une clarification dès qu'une ambiguïté subsiste ?
6. **Préconditions d'actions déterministes** : Chaque outil `MCP` mutatif possède-t-il un automate d'états légaux et un vérificateur exécuté *avant* appel transactionnel ?
7. **Routage typé vers `HOTL`** : Les dépassements de plafond ou hors-garantie produisent-ils un verdict structuré `REQUIRES_HOTL` vers la file compétente plutôt qu'une improvisation du modèle ?
8. **Tests de concordance BI / Agents** : Une suite automatisée vérifie-t-elle à chaque déploiement que les valeurs retournées aux agents égalent au centime près celles des rapports officiels ?
