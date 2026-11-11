# Annexe A — Patrons de décision architecturale (ADR) et arbres de choix

Cette première annexe rassemble les outils d'arbitrage quotidien destinés aux comités d'architecture d'entreprise et aux ingénieurs principaux : le registre synoptique des **vingt-cinq décisions d'architecture (`ADR-001` à `ADR-025`)** établies à travers les huit parties du compendium, deux arbres de décision formels permettant de trancher rapidement les choix de protocoles et d'autonomie, ainsi qu'un gabarit standardisé de fiche ADR adapté aux systèmes probabilistes.

## A.1 Récapitulatif consolidé des 25 décisions d'architecture (`ADR-001` à `ADR-025`)

Chaque chapitre de cet ouvrage formalise un invariant architectural non négociable pour le passage à l'échelle. Le tableau ci-dessous constitue l'index maître que le Centre d'Excellence Agentique peut adopter comme socle de gouvernance interne.

| Code | Chap. | Intitulé normatif de la décision | Invariant technique imposé |
|---|---|---|---|
| **ADR-001** | 1 | Superposition d'un *System of Action* découplé et séparation `MCP` / `A2A` | Zéro écriture SQL directe contournant les *Systems of Record* ; `ActionEnvelope` obligatoire |
| **ADR-002** | 2 | Interdiction du routage global de processus critiques par LLM non borné | Le séquencement maître réside dans du code ou une machine à états déterministe |
| **ADR-003** | 3 | Portail d'homologation gradué selon la maturité (N1–N5) et l'autonomie (`L0`–`L4`) | Recensement obligatoire et blocage réseau des *Shadow Agents* non enregistrés |
| **ADR-004** | 4 | Alignement normatif sur la pile ouverte Linux Foundation `AAIF` | Priorité aux standards neutres (`MCP`, `A2A v1.0`, `Agent Skills`, `Open Responses`) |
| **ADR-005** | 5 | Exposition d'outils métiers sur `MCP Streamable HTTP` orienté intention | Maximum 12 outils cohérents par agent spécialiste ; refus du mappage CRUD 1:1 |
| **ADR-006** | 6 | Délégation inter-domaines exclusivement par `A2A v1.0` et `Agent Cards` signées | Découverte dynamique `OASF` et transport chiffré `SLIM`/MLS entre domaines distincts |
| **ADR-007** | 7 | Découplage déclaratif des interfaces via `AG-UI` et `A2UI` | Aucun code HTML/JS arbitraire généré par LLM exécuté sans catalogue déclaratif borné |
| **ADR-008** | 8 | Transmission d'enveloppes de contexte minimales typées lors des *handoffs* | Filtrage `ACL-aware` obligatoire et interdiction de relayer l'historique brut intégral |
| **ADR-009** | 9 | Résolution sémantique préalable via `Apache Ossie` et ontologie métier | Toute métrique ou règle d'éligibilité passe par la couche sémantique normalisée |
| **ADR-010** | 10 | Mémoire hybride alliant graphe bi-temporel (`Graphiti`) et état de session | Double horodatage `valid_from`/`valid_to` et capacité de purge vérifiable (`Loi 25`) |
| **ADR-011** | 11 | Matrice formelle de choix entre orchestration centrale et chorégraphie | Interdiction des essaims conversationnels libres sur des flux soumis à audit |
| **ADR-012** | 12 | Exécution de tout flux mutatif multi-étapes sur moteur durable (`Temporal`/`Restate`) | Journalisation déterministe, clés d'idempotence et revalidation au réveil (`awakeable`) |
| **ADR-013** | 13 | Contrat de compensation `Saga` obligatoire pour chaque outil mutatif | Toute mutation possède son inverse compensatoire ou un tampon à fenêtre de grâce |
| **ADR-014** | 14 | Point de passage unique via `agentgateway` et routage cognitif à 3 paliers | Orientation par défaut sur `SLM` spécialisé ; affinité de préfixe `KV-cache` active |
| **ADR-015** | 15 | Ancrage selon la gravité des données et fédération par plan de contrôle neutre | Les agents SaaS opèrent sur leurs objets natifs et coopèrent via en-tête anti-boucle |
| **ADR-016** | 16 | Usage restreint des *Computer-Use Agents* (`CUA`) en dernier recours supervisé | Vérification visuelle pré/post-action et migration programmée vers connecteur `MCP` |
| **ADR-017** | 17 | Sas obligatoire par Jumeau numérique avant toute consigne `IT` → `OT` | Aucune écriture directe d'un modèle probabiliste vers un automate `PLC`/`SCADA` |
| **ADR-018** | 18 | Identité `NHI` dédiée (`SPIFFE`/`DID`) et échange `RFC 8693 OBO` à chaque saut | Atténuation stricte de portée (`sub`/`act`) et approbation `CIBA` sur seuil critique |
| **ADR-019** | 19 | Couverture `OWASP ASI01–ASI10` et épinglage cryptographique des serveurs `MCP` | Signature SHA-256/Sigstore des schémas d'outils contre les attaques *Rug-Pull* |
| **ADR-020** | 20 | Garde-fous déterministes hors LLM (`Cedar`/`OPA`) et isolation microVM/`OpenSandbox` | Exécution de code sans egress réseau implicite et coupe-circuit SOC testé |
| **ADR-021** | 21 | Doctrine « Pas de télémétrie `OpenTelemetry gen_ai.*`, pas de déploiement » | Traces distribuées obligatoires avec caviardage PII en amont de l'export |
| **ADR-022** | 22 | Portes CI/CD fondées sur la constance \(\text{pass}^k\) simulée et déploiement Canary | Homologation sur bancs de type \(\tau\)-bench et injection de pannes avant trafic réel |
| **ADR-023** | 23 | Plafond budgétaire par saga et pilotage économique au *Cost-per-Outcome* | Disjoncteur financier temps réel et décommissionnement des agents à ROI négatif |
| **ADR-024** | 24 | Classification légale dynamique fondée sur l'empreinte de déploiement | Alignement croisé `ISO/IEC 42001`, `BSIF E-23` (mai 2027), `Loi 25` et `EU AI Act` |
| **ADR-025** | 25 | Propriétaire métier nominatif (*Named Business Owner*) par boucle agentique | Responsabilité humaine explicite et contrôle anti-complaisance cognitive `HOTL` |

---

## A.2 Arbre de décision : sélection du protocole d'interopérabilité

Lors de la conception d'un nouveau service ou flux métier, la question la plus fréquente soumise aux architectes consiste à choisir entre `MCP`, `A2A v1.0`, un courtier d'événements (`Kafka` / `Solace`), `AG-UI`/`A2UI` ou un *Computer-Use Agent* (`CUA`). L'arbre ci-dessous formalise la séquence exacte de questions discriminantes.

![Arbre de décision normatif pour le choix du protocole d'interopérabilité selon la nature du destinataire et le couplage requis.](manuscrit/figures/fig-a1-arbre-protocoles.svg)

### Cas limites et règles de désambiguïsation

1. **Quand un système externe expose déjà un agent propriétaire (ex. `Salesforce Agentforce` ou `SAP Joule`)** : Ne l'encapsulez pas derrière un faux outil `MCP` synchrone si la tâche peut durer plus de quelques secondes ou déclencher des sous-étapes autonomes. Utilisez **`A2A v1.0`** afin de préserver la sémantique d'état asynchrone (`working`, `input-required`, `completed`), la négociation de sécurité et le suivi de trace distribuée.
2. **Quand plusieurs consommateurs indépendants doivent réagir au même fait métier** : Même entre agents autonomes, évitez d'enchaîner cinq appels point-à-point `A2A` séquentiels lorsqu'un fait métier (telle la clôture d'une intervention ou une alerte machine) intéresse simultanément la facturation, l'analytique, le CRM et la maintenance. Publiez un événement typé sur **`Kafka` ou `Solace`** conforme au référentiel `Apache Ossie`, et laissez chaque domaine abonné décider s'il instancie localement une saga.
3. **Quand une transaction engage une dépense auprès d'un tiers externe** : `A2A` assure le dialogue de négociation, mais ne constitue pas une preuve d'autorisation financière. Couplez obligatoirement l'échange à un mandat cryptographique vérifiable **`AP2`** (plafond, devise, catégorie marchande, expiration) et, pour les API facturées à la requête, au règlement **`x402`** via une trésorerie pré-provisionnée et plafonnée.

---

## A.3 Arbre de décision : arbitrage entre code déterministe, workflow et boucle agentique

Le gaspillage architectural numéro un observé en 2025–2026 consiste à invoquer un grand modèle de langage coûteux et lent pour exécuter une logique conditionnelle parfaitement déterministe. À l'opposé, coder en dur mille embranchements `if/else` pour traiter des courriels litigieux multilingues crée une dette de maintenance insurmontable. L'arbre suivant impose la **doctrine de parcimonie cognitive** : utiliser le niveau d'inférence minimal strictement requis par l'entropie réelle du problème.

![Arbre de décision normatif arbitrant entre service déterministe L0, workflow enrichi par SLM, automatisation HITL L2 et orchestration multi-agents L3/L4.](manuscrit/figures/fig-a2-arbre-autonomie.svg)

---

## A.4 Gabarit normatif de fiche ADR pour système agentique

Contrairement à une fiche ADR logicielle classique, toute décision touchant un composant agentique doit documenter explicitement son plafond d'autonomie, son enveloppe économique et son mécanisme de repli déterministe. Le gabarit YAML/Markdown suivant est conçu pour être versionné directement aux côtés du code dans le dépôt du projet :

```yaml
adr_id: "ADR-XXXX"
title: "Intitulé court et prescriptif de la décision"
status: "Proposed | Accepted | Deprecated | Superseded"
date: "2027-01-15"
owners:
  architecture_lead: "prenom.nom@entreprise.ca"
  named_business_owner: "prenom.nom@entreprise.ca"
risk_and_autonomy:
  autonomy_ceiling: "L0 | L1 | L2 | L3 | L4"
  regulatory_footprint:
    bsif_e23_materiality: "Low | Moderate | High"
    quebec_law25_automated_decision: false
    eu_ai_act_tier: "Minimal | Transparency_Art50 | HighRisk_AnnexIII"
  owasp_asi_threats_mitigated: ["ASI01", "ASI02", "ASI03", "ASI08"]
technical_invariants:
  vertical_protocol: "MCP Streamable HTTP (pinned SHA-256)"
  horizontal_protocol: "A2A v1.0 via agentgateway"
  durable_runtime: "Temporal | Restate | None (stateless L1)"
  compensation_strategy: "Saga inverse tool | Time-bound lease | Pre-commit buffer"
  max_cost_per_outcome_cad: 0.75
  minimum_eval_gate: "pass^5 >= 0.96 on domain simulation suite"
fallback_and_killswitch:
  degraded_mode: "Route vers file manuelle ServiceNow si indisponibilité ou dérive"
  soc_killswitch_id: "ks-domain-workflow-04"
review_trigger: "Révision semestrielle ou changement majeur de modèle/outil"
```

L'adoption systématique de ce descripteur permet au pipeline CI/CD (`Chapitre 22`) de bloquer automatiquement tout déploiement dont le plafond financier, le coupe-circuit SOC ou le propriétaire métier nominatif n'auraient pas été renseignés et signés.
