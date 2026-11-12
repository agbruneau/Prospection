# Chapitre 24 — Conformité réglementaire internationale et canadienne, et droit B2B inter-agents

::: {.synthese-executive title="Synthèse exécutive — Chapitre 24"}

* **Enjeu stratégique** : Trois ruptures convergent en 2027 et referment l'ère d'immunité réglementaire des prototypes d'IA : l'application progressive de l'`EU AI Act` (août 2026 puis décembre 2027), l'entrée en vigueur le **1er mai 2027** de la ligne directrice `BSIF E-23` au Canada conjuguée à la `Loi 25` au Québec, et la formation autonome de contrats B2B entre agents logiciels. Traiter ces obligations par des comités documentaires manuels paralyse les livraisons tout en exposant l'entreprise à des sanctions pécuniaires et à des engagements commerciaux involontaires.
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Déployer un **Système de Management de l'IA (`AIMS`) unique conforme à `ISO/IEC 42001`** comme dorsale centrale, puis projeter ses contrôles vers chaque juridiction (`BSIF E-23`, `Loi 25`, `EU AI Act`, `NIST AI RMF`).
  2. *Structurante dès la conception* : Qualifier le niveau d'exigence légale selon **l'empreinte de déploiement (*Deployment Footprint*)** complète de la saga, vérifiée automatiquement en porte CI/CD.
  3. *Structurante pour le commerce externe* : Subordonner tout agent négociateur B2B à un accord-cadre bilatéral préalable et à un **mandat cryptographique borné (`AP2`)** opposable aux tiers.
* **Indicateurs de gouvernance** : Couverture du registre `AIMS` (100 % des identités `NHI` actives), délai de génération d'un dossier d'audit opposable (cible : moins de 4 heures), couverture explicative `Loi 25` art. 12.1 (100 %), et zéro dépassement de plafond sur les mandats `AP2`.

:::

## 24.1 Système de management certifiable ISO/IEC 42001 et alignement NIST AI Agent Standards

Entre 2023 et 2025, la conformité IA se limitait souvent à une charte déclarative et à un tableur rempli une seule fois avant la mise en ligne d'un assistant. Sur une fabrique multi-agents de troisième génération, cette approche s'effondre immédiatement : les consignes évoluent chaque quinzaine, le routage alterne dynamiquement entre `SLM` locaux et `LLM` frontières, et l'ajout d'un seul outil `MCP` mutatif modifie le risque juridique de toute une chaîne. Une revue statique rédigée six mois plus tôt perd toute valeur probatoire devant un régulateur.

L'industrialisation de 2027 consiste à substituer à l'audit ponctuel un **Système de Management de l'IA (`AIMS`) certifiable selon `ISO/IEC 42001:2023`**, directement câblé dans le plan de contrôle logiciel. Bâtie sur la structure harmonisée commune à `ISO/IEC 27001`, cette norme permet de mutualiser près de 40 % du socle de cybersécurité existant (audits internes, revues de direction, actions correctives), tout en ajoutant trente-huit contrôles normatifs dans son **Annexe A** dédiés à l'évaluation d'impact sociétal et individuel (`A.5`), au cycle de vie probabiliste (`A.6`), à la lignée des données (`A.7`), à l'information des parties concernées (`A.8`) et à la gouvernance des fournisseurs tiers (`A.10`).

### Du cycle PDCA d'ISO/IEC 42001 et des travaux du NIST au code exécutable

Pour éviter toute dérive bureaucratique, l'architecte arrime `ISO/IEC 42001` au **NIST AI Risk Management Framework (`AI RMF 1.0` : *Govern, Map, Measure, Manage*)** ainsi qu'aux livrables 2026–2027 de l'**AI Agent Standards Initiative du NIST** centrés sur trois piliers : l'évaluation reproductible des agents outillés, l'attribution cryptographique des délégations et le confinement déterministe des effets de bord.

Les quatre phases PDCA d'`ISO/IEC 42001` s'incarnent alors dans des composants techniques vérifiables :

* **Planifier (*Plan* — Clauses 4 à 6)** : Le registre `OASF` matérialise l'inventaire obligatoire (`A.4.2`). Aucun certificat `SPIFFE` n'est émis sans finalité métier déclarée, étude d'impact et seuils d'appétit au risque.
* **Déployer (*Do* — Clauses 7–8)** : Les contrôles de l'Annexe A s'exécutent dans les portes CI/CD (signature des serveurs `MCP`, bancs adversariaux) et dans les politiques `Cedar` ou `OPA` évaluées en ligne par `agentgateway`.
* **Évaluer (*Check* — Clause 9)** : Les traces normalisées `OpenTelemetry gen_ai.*` et les campagnes périodiques de stabilité multi-essais \(\text{pass}^k\) alimentent en continu les tableaux de conformité et la validation indépendante.
* **Corriger (*Act* — Clause 10)** : Toute dérive ou violation déclenche une remédiation tracée, du repli automatique `L3` vers `L2` jusqu'à la révocation instantanée des jetons `OAuth 2.1` par coupe-circuit (*Kill-Switch*).

Un point d'attention particulier sous le contrôle `A.10` d'`ISO/IEC 42001` concerne la **chaîne d'approvisionnement agentique (*AI Supply Chain*)**. Lorsqu'un orchestrateur interne invoque un serveur `MCP` fourni par un éditeur tiers ou délègue une sous-tâche `A2A` à l'agent d'un partenaire infonuagique, le périmètre de responsabilité du système de management s'étend à cette frontière externe. L'entreprise doit exiger une nomenclature logicielle et cognitive signée (`AI-SBOM` référençant la famille de modèle, la politique de rétention zéro des invites et les sous-traitants ultérieurs) avant d'inscrire le connecteur au catalogue autorisé.

![Gouvernance réglementaire croisée : boucle AIMS ISO/IEC 42001, qualification dynamique par empreinte de déploiement et encadrement B2B AP2.](manuscrit/figures/fig-24-conformite-empreinte.svg)

### La règle cardinale de l'empreinte de déploiement (*Deployment Footprint*)

Attribuer une cote de risque fixe à un modèle de langage constitue une erreur architecturale majeure. **Un modèle n'a pas de statut légal suffisant hors contexte** : un même `SLM` de 8 milliards de paramètres présente un risque minimal lorsqu'il résume un manuel public, relève de la `Loi 25` s'il traite le dossier d'un client québécois, bascule sous `BSIF E-23` s'il pré-autorise une indemnité d'assurance, et tombe sous l'Annexe III de l'`EU AI Act` s'il filtre des candidatures à Paris.

La classe réglementaire d'une saga \(S\) composée d'acteurs \(a \in S\) obéit donc à la règle du maillon le plus critique (*High-Water Mark*) évaluée sur son **empreinte de déploiement** :

\[\mathcal{C}_{\text{reg}}(S) = \max_{a \in S} \Phi\bigl(M_a, \mathcal{T}_a, \mathcal{D}_a, \mathcal{J}_a, L_a\bigr)\]

Ici, \(M_a\) désigne le modèle utilisé, \(\mathcal{T}_a\) la nature des outils `MCP` connectés (lecture vs écriture financière ou physique), \(\mathcal{D}_a\) la sensibilité des données, \(\mathcal{J}_a\) les juridictions d'établissement et d'impact, et \(L_a \in \{\text{L0}, \dots, \text{L4}\}\) le plafond d'autonomie sans approbation humaine préalable.

#### Extrait 24.1 — Fiche automatisée d'empreinte réglementaire évaluée en CI/CD (`deployment-footprint.yaml`)

Versionné dans le dépôt Git de chaque agent, ce manifeste est vérifié par `OPA` à chaque fusion : tout ajout d'outil mutatif ou d'extension géographique bloque le déploiement tant que les approbations requises manquent au registre `AIMS`, et rehausse automatiquement le seuil de constance \(\text{pass}^5\) de `0,95` (socle général du Chapitre 22) à `0,97` dès que le flux relève du palier matériel `BSIF E-23`.

```yaml
apiVersion: aims.boreal.ca/v2027.1
kind: AgentDeploymentFootprint
metadata:
  agentId: "boreal-bca-warranty-adjudicator"
  version: "2.4.1"
  aimsRegistryRef: "AIMS-REC-2027-019"
  namedBusinessOwner: "vp-souscription-bca@boreal.ca"
footprintVector:
  businessDomain: "insurance_warranty_adjudication"
  autonomyCeiling: "L3" # Autonome <= 5 000 CAD, sinon escalade HOTL
  jurisdictionsImpacted: ["CA-FED-OSFI", "CA-QC", "EU-FR"]
  dataSensitivity:
    containsPersonalData: true
    crossBorderInferenceAllowed: false
    inferenceResidencyRegion: "ca-central-montreal"
  connectedMcpTools:
    - uri: "mcp://bca-core/contracts.read"
      mutative: false
    - uri: "mcp://bca-core/warranty.preauthorize"
      mutative: true
      maxFinancialImpactCad: 5000
derivedComplianceProfile:
  iso42001ImpactTier: "HIGH"
  osfiE23ModelRiskTier: "TIER_2_MATERIAL"
  quebecLaw25Art12_1Applicable: true
  euAiActClassification: "TRANSPARENCY_ART50_ONLY"
mandatoryGates:
  requireSignedEfvp: true
  requireIndependentE23ValidationSignoff: true
  minPassPower5StabilityScore: 0.97
  wormDecisionLogRetentionYears: 7
```

---

## 24.2 Calendrier 2026–2027 : EU AI Act (art. 50 et Annexe III déc. 2027), BSIF E-23 (1er mai 2027) et Loi 25

Exploiter une fabrique transatlantique ou pancanadienne n'implique nullement de fragmenter son code en trois silos régionaux : il s'agit d'aligner l'architecture sur le plus petit dénominateur fort satisfaisant simultanément les échéances 2026–2027.

### 1. Union européenne : `EU AI Act` entre transparence active (août 2026) et haut risque (décembre 2027)

Le `Règlement (UE) 2024/1689` s'applique de façon extraterritoriale dès que les sorties d'un agent sont utilisées dans l'Union. Après l'interdiction des pratiques inacceptables et l'obligation de littératie IA (`art. 4`, février 2025) puis les règles `GPAI` (août 2025), deux jalons gouvernent les systèmes agentiques en 2026–2027 :

* **Août 2026 (`Article 50` — Transparence)** : Tout agent d'interface (`AG-UI`, voix `WebRTC`, courriel autonome) doit informer clairement la personne physique qu'elle interagit avec une IA, et les contenus synthétiques produits doivent comporter un marquage lisible par machine (métadonnées signées `C2PA`).
* **Fenêtre août 2026 – décembre 2027 (`Annexe III` — Haut risque)** : Les agents opérant dans l'emploi, l'octroi de crédit aux particuliers, l'assurance vie/santé ou les infrastructures critiques relèvent des articles 8 à 15. Suivant l'ajustement réglementaire européen arrimant la pleine exigibilité sectorielle à la disponibilité des normes harmonisées `CEN-CENELEC` jusqu'en **décembre 2027**, quatre briques logicielles doivent être livrées : gestion itérative des risques (`Art. 9`), dossier technique généré depuis le code (`Art. 11` / `Annexe IV`), **journalisation automatique sur toute la durée de vie (`Art. 12`)** et **contrôle humain effectif muni d'un bouton d'arrêt (`Art. 14`)**. Par ailleurs, l'**article 25** impose une vigilance cardinale aux entreprises utilisatrices (*deployers*) : si une organisation modifie substantiellement la finalité d'un agent acheté sur étagère en lui greffant de nouveaux outils `MCP` dans un domaine de l'`Annexe III`, elle requalifie son rôle juridique en **fournisseur (*provider*)** et endosse l'intégralité des obligations de marquage et d'évaluation de conformité.

### 2. Canada fédéral : Ligne directrice `BSIF E-23` révisée (1er mai 2027)

Pour les banques, assureurs fédéraux et sociétés de fiducie supervisés par le `BSIF` (`OSFI`), l'échéance du **1er mai 2027** étend la gestion du risque de modèle à tout système analytique, génératif ou agentique éclairant une décision d'affaires ou financière. Trois obligations structurent le design :

1. **Proportionnalité par matérialité et autonomie** : Un graphe autonome `L3` reçoit une cote de risque intrinsèque supérieure à un copilote `L1`, déclenchant des contrôles et une fréquence de revue accrus.
2. **Validation indépendante (2e ligne)** : Toute mise en service ou modification substantielle d'un agent matériel requiert l'audit d'une équipe indépendante des bâtisseurs vérifiant les hypothèses, les bornes déterministes et la stabilité stochastique.
3. **Surveillance continue et risque tiers** : L'institution demeure pleinement imputable des modèles et serveurs `MCP` externes ; elle doit surveiller la dérive en continu et maintenir un plan de repli testé.

### 3. Québec : `Loi 25` (`Article 12.1`, minimisation et `ÉFVP`)

Pleinement exécutoire et assortie de sanctions administratives atteignant **10 M\$ CAD ou 2 % du chiffre d'affaires mondial** (**25 M\$ CAD ou 4 %** au pénal, art. 90.12 et 91 `LPRPSP`), la `Loi 25` impose deux contraintes directes sur les architectures agentiques :

* **Décisions exclusivement automatisées (`Article 12.1`)** : Lorsqu'un agent `L3`/`L4` tranche seul une décision produisant des effets juridiques ou significatifs sur une personne physique à partir de ses renseignements personnels, l'organisation doit l'en informer au plus tard lors de la décision et lui communiquer sur demande : les renseignements utilisés, **les raisons ainsi que les principaux facteurs et paramètres** ayant mené au résultat, et son droit de faire rectifier ses données et de **présenter ses observations à un employé habilité à réviser la décision**. Une approbation humaine réflexe de trois secondes (*rubber-stamping*) ne désactive nullement cet article devant la Commission d'accès à l'information (`CAI`).
* **`ÉFVP` et transferts hors Québec (`Articles 3.3 et 17`)** : Tout système agentique traitant des renseignements personnels requiert une Évaluation des facteurs relatifs à la vie privée dès sa conception, ainsi qu'avant tout envoi de contexte vers une région d'inférence située hors du Québec.

| Dimension | `ISO/IEC 42001` | `NIST AI RMF` & Agent Init. | `EU AI Act` (UE) | `BSIF E-23` (Canada) | `Loi 25` (Québec) |
|---|---|---|---|---|---|
| **Statut 2026–2027** | Norme `AIMS` certifiable volontaire | Référentiel volontaire & standards d'agents | Loi : Art. 50 (août 2026) ; Annexe III (déc. 2027) | Opposable le **1er mai 2027** | Loi en vigueur (`CAI`) |
| **Déclencheur** | Périmètre `AIMS` déclaré | Tout système ou agent IA exploité | Sortie utilisée dans l'UE / domaines sensibles | Modèle ou agent éclairant une décision financière | Traitement ou décision sur PII (résidents QC) |
| **Inventaire** | Registre `A.4.2` & études d'impact `A.5` | Cartographie acteurs & flux (*Map*) | Dossier `Annexe IV` & base UE | Inventaire global incluant tiers et *Shadow AI* | Registre PII & `ÉFVP` dès la conception |
| **Explicabilité** | Transparence parties prenantes (`A.8`) | Benchmarks `pass^k` & lignée (*Measure*) | Journaux `Art. 12` & marquage `Art. 50` | Limites conceptuelles & suivi de dérive | Divulgation des **facteurs et paramètres** (`Art. 12.1`) |
| **Contrôle humain** | Selon matrice de risque (`A.9`) | Seuils bornés & coupe-circuits (*Manage*) | Supervision anti-biais & arrêt (`Art. 14`) | Séparation des tâches & plan de contingence | Droit d'observations devant un **réviseur habilité** |
| **Preuve Fabrique** | GitOps `AIMS` + `footprint.yaml` | CI/CD `pass^k` + `SPIFFE` / `OBO` | `OTel gen_ai.*` + `C2PA` + `HOTL` | Signoff 2e ligne + `agentgateway` | Jeton JSON `WORM` + résidence `ca-central` |

#### Extrait 24.2 — Journal de preuve opposable conforme à l'article 12.1 de la `Loi 25` et à l'article 12 de l'`EU AI Act`

Pour éviter toute rationalisation post-hoc fallacieuse d'un `LLM`, l'architecture sépare l'extraction factuelle de la règle finale évaluée par `Cedar`, puis scelle en stockage immuable (`WORM`) la fiche exacte des facteurs déterminants :

```json
{
  "decisionId": "DEC-QC-2027-0094821",
  "timestampIso": "2027-06-18T14:22:09.412Z",
  "exclusivelyAutomated": true,
  "applicableRegimes": ["CA-QC-LOI25-ART12.1", "CA-FED-OSFI-E23-TIER2"],
  "subjectRef": "SUBJ-SHA256-8f91c2a044e8b712",
  "agentLineage": {
    "sagaId": "saga-claim-2027-44109",
    "specialistAgent": "boreal-bca-microlease-adjuster@2.1.0",
    "modelRegion": "ca-central-montreal",
    "policyEngine": "cedar-bca-rules@2027.05.1"
  },
  "personalDataInputsUsed": [
    { "field": "payment_delinquency_days_12m", "value": 47, "source": "BCA-IBMi-Ledger" },
    { "field": "requested_extension_cad", "value": 4200, "source": "Portal-AGUI" }
  ],
  "principalFactorsAndParameters": [
    {
      "factorCode": "RULE_DELINQ_THRESHOLD",
      "parameterRule": "payment_delinquency_days_12m <= 30 requis en approbation autonome L3",
      "observedValue": 47,
      "impact": "DETERMINING_REJECTION_FACTOR"
    }
  ],
  "outcome": "DECLINED_AUTO_ELIGIBLE_FOR_HUMAN_REVIEW",
  "citizenRights": {
    "noticeSentIso": "2027-06-18T14:22:10.105Z",
    "humanReviewUri": "https://portail.boreal.ca/recours-humain/DEC-QC-2027-0094821",
    "assignedQueue": "bca-quebec-underwriters-hotl",
    "slaBusinessHours": 16
  },
  "wormSignatureJws": "eyJhbGciOiJFUzI1NiIsImtpZCI6ImJvcmVhbCJ9..MEYCIQ..."
}
```

::: {.encadre-sectoriel title="Institutions financières canadiennes — Plan de mise en conformité pratique pour l'échéance BSIF E-23 du 1er mai 2027"}

Réussir le jalon du **1er mai 2027** sans geler les projets exige quatre actions coordonnées entre l'architecture et l'équipe de risque de modèle (`MRM`) :

1. **Résorption des *Shadow Agents*** : Corréler les journaux réseau, `Entra ID` et passerelles API pour rapatrier 100 % des assistants et agents SaaS (`Copilot`, `Agentforce`, `ServiceNow`) dans l'inventaire officiel E-23.
2. **Triage franc de matérialité** : Séparer architecturalement les agents de lecture/synthèse (`Tier 3`, homologation allégée sous 5 jours) des agents instruisant octroi, tarification ou indemnisation (`Tier 1/2`), afin de préserver la capacité de validation de 2e ligne.
3. **Validation stochastique outillée** : Exiger un score \(\text{pass}^5 \ge 0{,}97\) sur un jeu d'or gelé de 300 dossiers historiques et 100 cas adversariaux, doublé de la preuve que les plafonds financiers sont exécutés hors modèle par `Cedar` ou `OPA`.
4. **Avenants fournisseurs tiers et rejouabilité septennale** : Imposer un préavis contractuel de 30 jours avant tout retrait d'un modèle épinglé et tester semestriellement le basculement vers un modèle de repli. Comme les points de contrôle infonuagiques sont dépréciés tous les 12 à 18 mois alors que l'inspection `BSIF E-23` porte sur sept ans, le protocole d'audit ne réexécute jamais un ancien `LLM` : il rejoue de façon déterministe dans `Cedar` le triplet archivé en `WORM` (faits structurés extraits, condensat du paquet de règles et certificat d'homologation `SemVer + Intent`), démontrant mathématiquement la conformité de la décision historique.

:::

---

## 24.3 Droit des contrats B2B conclus entre agents autonomes, responsabilité civile et anti-collusion

L'interconnexion d'entreprises via `A2A v1.0` et le protocole **`AP2` (*Agent Payments Protocol*)** ouvre en 2027 un chantier juridique décisif : la conclusion directe d'achats B2B entre l'agent acheteur d'un client industriel et l'agent commercial d'un fournisseur.

### Imputabilité directe, mandat apparent et erreur inexcusable

Ni le `Code civil du Québec` (`C.c.Q.`), ni la *Common Law* canadienne ou américaine ne confèrent de personnalité juridique à un agent logiciel. Toutefois, la *Loi concernant le cadre juridique des technologies de l'information* (`LCCJTI`), la *Loi uniforme sur le commerce électronique* (`LUCE`, art. 21) et l'*Uniform Electronic Transactions Act* (`UETA`, art. 14) valident pleinement les contrats formés par l'interaction d'« agents électroniques » sans relecture humaine acte par acte. **Tout engagement émis par votre agent B2B engage donc directement votre personne morale.**

Sur le plan opérationnel, l'architecture `AP2` dissocie strictement la **formation de l'engagement commercial** du **déblocage effectif des fonds** : le mandat signé autorise la réservation contractuelle du lot chez le fournisseur, mais l'ordre de règlement financier demeure subordonné à un rapprochement tripartite déterministe (*3-Way Match* croisant bon de commande signé, avis d'expédition `EDI`/télématique et réception physique confirmée dans l'`ERP`), neutralisant ainsi le risque de décaissement irréversible sur une livraison fictive.

Si un agent acheteur mal borné commande par hallucination d'unité 5 000 bobines d'acier au lieu de 50 auprès d'un fournisseur de bonne foi, l'entreprise peut difficilement plaider la nullité : en droit civil (`art. 1400 C.c.Q.`) comme en *Common Law*, **l'erreur inexcusable née d'une négligence de paramétrage ne vicie pas le consentement**, et l'exposition publique de l'agent crée l'apparence d'un pouvoir d'achat valide (analogue au mandat apparent de l'`art. 2163 C.c.Q.`).

Parallèlement, en vertu de la **Loi sur la concurrence du Canada** (art. 45 et 90.1), du *Sherman Act* et de l'article 101 du `TFUE`, deux périls anticoncurrentiels guettent les enchères inter-agents : l'alignement tarifaire tacite entre agents partageant les mêmes heuristiques de prix, et la divulgation accidentelle des tarifs confidentiels d'un concurrent dans un prompt de négociation (*violation NDA et collusion Hub-and-Spoke*).

Enfin, en cas de dommage causé à un cocontractant par une action fautive d'orchestration (double prélèvement, annulation intempestive d'un créneau logistique critique), la répartition de responsabilité entre l'entreprise déployante, l'intégrateur système et le fournisseur du modèle fondationnel ne se présume jamais en votre faveur : les conditions générales des fournisseurs d'API plafonnent systématiquement leur responsabilité indirecte. Il appartient donc à l'entreprise déployante d'articuler son plafond contractuel externe avec une police d'assurance cyber et erreurs professionnelles explicitement étendue aux actes d'agents autonomes (`Agentic E&O Coverage`), laquelle exige en retour la présence vérifiable des verrous techniques résumés ci-dessous.

| Risque juridique B2B autonome | Qualification légale | Défaillance technique type | Parade contractuelle (`MSA`) | Garde-fou déterministe |
|---|---|---|---|---|
| **Dépassement de pouvoir** | Mandat apparent (`art. 2163 C.c.Q.`) | Commande excédant la délégation interne | Inopposabilité au-delà du jeton `AP2` présenté | Mandat `AP2` signé `HSM` vérifié avant accord |
| **Hallucination prix / unité** | Erreur inexcusable (`art. 1400 C.c.Q.`) | Confusion tonne/kg ou clause qualité omise | Seul l'objet JSON typé fait foi + rétractation 30 min | Schéma JSON strict + blocage si écart prix \(> 12\,\%\) |
| **Répudiation d'accord** | Défaut d'intégrité (`LCCJTI` / `UETA`) | Contestation de l'offre finale acceptée | Valeur probante reconnue des reçus cosignés | Canonisation `RFC 8785` + double signature `WORM` |
| **Collusion ou fuite `NDA`** | Entente illicite (`Loi sur la concurrence`) | Fuite du prix d'un rival dans la contre-offre | Isolation contractuelle et interdiction d'alignement | Mémoire cloisonnée par enchère + filtre DLP sortant |
| **Injection adverse B2B** | Dol (`art. 1401 C.c.Q.`) | Prompt caché dans un catalogue distant | Résolution de plein droit pour manœuvre déloyale | Désinfection des entrées + signataire `AP2` séparé |

#### Extrait 24.3 — Clause-cadre contractuelle B2B et garde-fou technique anti-collusion (`AP2` / TypeScript)

L'encadrement repose sur l'alliance d'une stipulation expresse dans l'accord-cadre électronique et d'un vérificateur déterministe isolé du `LLM` :

```typescript
/* CLAUSE-CADRE NORMATIVE (AVENANT B2B COMMERCE AGENTIQUE - ART. 4) :
 * "Seule une charge utile JSON conforme au schéma AP2-Order-v1, revêtue des signatures
 * JWS valides des deux Parties et comprise dans les plafonds numériques du jeton AP2
 * Mandate préalablement notifié, forme un engagement valide. Tout échange textuel libre
 * demeure dépourvu d'effet juridique. Toute transaction affichant un écart unitaire > 12 %
 * à l'indice de référence peut être résolue sans frais dans les 30 minutes suivant scellement."
 */
export interface Ap2SignedMandate {
  readonly allowedSkus: ReadonlyArray<string>;
  readonly maxUnitPriceCad: Record<string, number>;
  readonly maxTotalCommitCad: number;
  readonly expiresAtEpochMs: number;
}

export interface ProposedB2bOrder {
  readonly sku: string;
  readonly quantity: number;
  readonly agreedUnitPriceCad: number;
  readonly benchmarkUnitCad: number;
  readonly outboundMessage: string;
  readonly confidentialCompetitorTokens: ReadonlyArray<string>;
}

export function verifyB2bAgentCommitment(
  mandate: Ap2SignedMandate,
  order: ProposedB2bOrder,
  nowEpochMs: number
): { readonly approved: boolean; readonly reason?: string } {
  if (nowEpochMs >= mandate.expiresAtEpochMs) {
    return { approved: false, reason: "AP2_MANDATE_EXPIRED" };
  }
  const skuCap = mandate.maxUnitPriceCad[order.sku];
  const totalCad = order.quantity * order.agreedUnitPriceCad;
  if (
    !mandate.allowedSkus.includes(order.sku) ||
    order.quantity <= 0 ||
    skuCap === undefined ||
    order.agreedUnitPriceCad > skuCap ||
    totalCad > mandate.maxTotalCommitCad
  ) {
    return { approved: false, reason: "MANDATE_BOUNDARY_EXCEEDED" };
  }
  if (
    order.benchmarkUnitCad <= 0 ||
    Math.abs(order.agreedUnitPriceCad - order.benchmarkUnitCad) / order.benchmarkUnitCad > 0.12
  ) {
    return { approved: false, reason: "MANIFEST_PRICE_ANOMALY_HOLD_FOR_HOTL" };
  }
  const msgLower = order.outboundMessage.toLowerCase();
  for (const token of order.confidentialCompetitorTokens) {
    if (token.length > 2 && msgLower.includes(token.toLowerCase())) {
      return { approved: false, reason: "ANTITRUST_AND_NDA_DISCLOSURE_BLOCKED" };
    }
  }
  return { approved: true };
}
```

::: {.encadre-sectoriel title="Secteur Public, Santé et Assurance de personnes — Souveraineté documentaire et Loi 25"}

Dans les organismes publics québécois, le réseau de la santé (`LRSSS`) et l'assurance de personnes, deux interdits s'ajoutent : **zéro opacité algorithmique sur l'admissibilité d'un citoyen ou patient** et **résidence souveraine stricte des dossiers sensibles**. Le patron de référence place une passerelle locale de pseudonymisation réversible en amont de l'orchestrateur (remplaçant NAM, NAS et identité civile par des jetons éphémères gardés au Québec), impose l'inférence sur modèles hébergés localement, et interdit tout refus en mode `L3` autonome — l'agent ne produit qu'un projet d'analyse sourcé (`L2`) soumis à la signature d'un agent public ou clinicien imputable.

:::

---

## 24.4 Application au fil rouge : homologation croisée et premier pilote d'achat B2B chez Groupe Boréal

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Un référentiel AIMS unique pour quatre régimes légaux et premier contrat autonome AP2"}

**Blocage initial (T1 2027)** : Trois équipes de conformité (Europe pour l'`EU AI Act`, filiale financière BCA pour `BSIF E-23`, et siège montréalais pour la `Loi 25`) exigeaient chacune des formulaires Word distincts, portant le délai d'homologation d'une version d'agent à **9,5 semaines**.

**Solution déployée (T2–T3 2027)** :

1. **Dorsale GitOps `ISO/IEC 42001`** : Adoption du manifeste unique `deployment-footprint.yaml` (Extrait 24.1) contrôlé par `OPA`. Les rapports \(\text{pass}^5\), politiques `Cedar` et traces `OpenTelemetry` génèrent automatiquement la liasse d'audit.
2. **Succès `BSIF E-23` et `Loi 25` chez BCA** : Classification des 14 agents financiers (3 en Tier 2 matériel, 11 en Tier 3 interne) et archivage systématique du jeton d'explicabilité `WORM` (Extrait 24.2) sur chaque décision de crédit-bail PME québécoise. Lors de la revue préparatoire `BSIF E-23` fin avril 2027, BCA a extrait en **2 h 15** la preuve complète de 18 400 décisions, obtenant un feu vert sans réserve avant le 1er mai 2027.
3. **Pilote d'achat B2B `AP2` chez BEL** : Signature d'un avenant électronique avec six fournisseurs nord-américains de fixations haute résistance. L'*Agent Réapprovisionnement Spot* négocie de nuit via `A2A v1.0` sous mandat `AP2` plafonné à **15 000 \$ CAD**, protégé par `verifyB2bAgentCommitment` (Extrait 24.3).

**Résultats audités sur 4 mois** : Délai d'homologation réduit à **18 minutes** (`Tier 3`) et **4 jours** (`Tier 2`) ; **312 commandes B2B autonomes** conclues sans litige, **2 erreurs d'unités bloquées préventivement**, gain tarifaire moyen de **3,8 %** et cycle d'achat spot ramené de 5 jours à **22 minutes**.

:::

---

## 24.5 Décision d'architecture normative et points de contrôle

La fiche `ADR-024` fixe les conditions impératives d'homologation juridique et contractuelle de toute boucle agentique au sein de l'entreprise.

::: {.adr title="ADR-024 — Qualification réglementaire dynamique par empreinte de déploiement et mandats B2B bornés"}

* **Statut** : Acceptée | **Périmètre** : Fabrique Agentique Groupe | **Révision** : Semestrielle
* **Contexte** : L'exploitation d'agents au Canada, au Québec, aux États-Unis et dans l'Union européenne cumule les exigences `BSIF E-23`, `Loi 25` et `EU AI Act`, tout en exposant la société au risque de mandat apparent lors de transactions B2B autonomes.
* **Options évaluées** :
  1. *Comités manuels par juridiction* : **Rejetée** — lenteur rédhibitoire (9 semaines) et dérive documentaire.
  2. *Alignement uniforme de tous les agents sur le régime haut risque maximal* : **Rejetée** — paralysie disproportionnée des cas internes sans risque.
  3. *AIMS unique `ISO/IEC 42001` piloté par manifeste `Deployment Footprint` en CI/CD et mandats `AP2` signés `HSM`*. **Retenue**.
* **Décision** : (a) Tout agent déclare un `deployment-footprint.yaml` bloquant en CI/CD évalué selon le maillon le plus critique ; (b) toute décision 100 % automatisée sur renseignements personnels produit un jeton d'explicabilité `WORM` avec voie de révision humaine effective ; (c) tout achat B2B inter-agents exige un avenant-cadre signé, un jeton `AP2` borné et un filtre déterministe anti-collusion.
* **Conséquences** : Auditabilité réglementaire en moins de 4 heures et confinement juridique strict des engagements externes, au prix du maintien continu des règles `OPA`, d'un archivage `WORM` septennal et de l'enrôlement contractuel préalable des fournisseurs.

:::

### Liste de contrôle de mise en production — Chapitre 24

1. **Registre `AIMS` complet** : Chaque identité `NHI` active pointe-t-elle vers une entrée `ISO/IEC 42001` valide et un manifeste `deployment-footprint.yaml` vérifié en CI/CD ?
2. **Règle du maillon critique** : La saga multi-agents hérite-t-elle automatiquement du régime réglementaire le plus strict parmi l'ensemble des outils et données sollicités ?
3. **Homologation `BSIF E-23`** : Les agents matériels disposent-ils d'une validation indépendante de 2e ligne, d'un score \(\text{pass}^k\) documenté et d'un plan de repli tiers ?
4. **Explicabilité `Loi 25` (art. 12.1)** : Toute décision exclusivement automatisée sur renseignements personnels génère-t-elle l'avis obligatoire, les facteurs déterministes exacts et un recours humain effectif ?
5. **Résidence et `ÉFVP`** : Une `ÉFVP` signée couvre-t-elle chaque flux personnel, avec blocage technique de toute inférence hors des régions autorisées ?
6. **Obligations `EU AI Act`** : La divulgation IA (`Art. 50`), le marquage synthétique `C2PA` et les journaux automatiques (`Art. 12` / `Art. 14`) sont-ils actifs pour les utilisateurs européens ?
7. **Mandat B2B `AP2` opposable** : Tout agent négociateur externe est-il encadré par un avenant bilatéral et un jeton `AP2` signé bornant montants, `SKU` et validité ?
8. **Anti-collusion et preuve `WORM`** : Les sessions d'enchères sont-elles isolées, filtrées contre toute fuite de prix concurrents et scellées après canonisation `RFC 8785` ?
