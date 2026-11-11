#!/usr/bin/env python3
"""Initialise les ouvertures des Parties II à VIII, les squelettes des Chapitres 2 à 25 et les Annexes A à C."""

from pathlib import Path

PARTS = [
    ("partie-02-pile-protocolaire", "PARTIE II — La Pile Protocolaire d'Interopérabilité Ouverte", "75 pages (p. 66–140)", "Chapitres 4 à 7"),
    ("partie-03-semantique-memoire", "PARTIE III — Interopérabilité Sémantique, Ontologies d'Entreprise et Mémoire Partagée", "55 pages (p. 141–195)", "Chapitres 8 à 10"),
    ("partie-04-orchestration-durabilite", "PARTIE IV — Patrons d'Orchestration, Exécution Durable et Intégrité Transactionnelle", "80 pages (p. 196–275)", "Chapitres 11 à 14"),
    ("partie-05-integration-si-it-ot", "PARTIE V — Intégration au SI Réel : Fédération Inter-Silos SaaS, Legacy et Convergence IT/OT", "60 pages (p. 276–335)", "Chapitres 15 à 17"),
    ("partie-06-identite-securite-zerotrust", "PARTIE VI — Identité Agentique, Sécurité Zero Trust et Résilience Cyber", "60 pages (p. 336–395)", "Chapitres 18 à 20"),
    ("partie-07-agentops-observabilite-finops", "PARTIE VII — Ingénierie de Production : AgentOps, Observabilité, Simulation et FinOps", "50 pages (p. 396–445)", "Chapitres 21 à 23"),
    ("partie-08-gouvernance-droit-organisation", "PARTIE VIII — Gouvernance, Droit, Modèle Opérationnel et Horizon Post-2027", "35 pages (p. 446–480)", "Chapitres 24 à 25"),
]

CHAPTERS = [
    # (folder, filename, num, title, pages, sections, boreal_step, sector, adr_title)
    ("partie-01-fondations", "ch02-decouplage-controle-autonomie.md", 2,
     "Le grand découplage architectural : Contrôle déterministe vs autonomie probabiliste", 16,
     ["2.1 Le paradoxe de la fiabilité composée dans les graphes multi-agents",
      "2.2 Séparation formelle entre plan de contrôle déterministe et boucle cognitive",
      "2.3 Frontières d'autonomie : matrice d'arbitrage API, RPA, BPMN/DMN et agent LLM",
      "2.4 Contrats d'entrée/sortie typés et bornes d'exécution (temps, jetons, profondeur)"],
     "Encapsulation des boucles d'investigation de pannes dans des machines à états déterministes chez Boréal Services Numériques",
     "Secteur Bancaire — Exigences de reproductibilité et d'explicabilité déterministe sous BSIF E-23",
     "ADR-002 — Interdiction du routage global de processus critiques par inférence LLM non bornée"),

    ("partie-01-fondations", "ch03-modele-maturite-antipatterns.md", 3,
     "Modèle de maturité de l'entreprise agentique (Niveaux 1 à 5) et antipatterns", 16,
     ["3.1 Grille d'évaluation en 5 stades (Ad hoc, Départemental, Gouverné, Orchestré, Fédéré B2B)",
      "3.2 Anatomie des antipatterns : Shadow Sprawl, God Agent, pavage de processus défaillants",
      "3.3 Méthode de diagnostic d'architecture patrimoniale (Brownfield Assessment)",
      "3.4 Trajectoire de migration incrémentale et jalons de gouvernance"],
     "Cartographie et rationalisation des 47 pilotes dispersés du Groupe Boréal vers une feuille de route N1 → N4",
     "Secteur Public — Maîtrise de l'IA fantôme et reddition de comptes algorithmique",
     "ADR-003 — Adoption d'un portail d'homologation gradué par niveau de maturité et d'exposition"),

    ("partie-02-pile-protocolaire", "ch04-gouvernance-anatomie-pile.md", 4,
     "Gouvernance des standards et anatomie de la pile interopérable", 15,
     ["4.1 Cartographie institutionnelle 2026–2027 : Linux Foundation AAIF, AGNTCY, W3C, IETF, FIDO, ASF",
      "4.2 Modèle de référence en 6 couches et règle de non-substituabilité outil vs pair",
      "4.3 Gestion du cycle de vie des spécifications ouvertes et stratégies anti-verrouillage"],
     "Définition des standards obligatoires d'interopérabilité de la Fabrique Agentique Boréal",
     "Éditeurs SaaS B2B — Stratégie d'ouverture protocolaire face aux écosystèmes hyperscalers",
     "ADR-004 — Alignement normatif sur la pile Linux Foundation AAIF (MCP + A2A v1.0)"),

    ("partie-02-pile-protocolaire", "ch05-connectivite-verticale-mcp-skills.md", 5,
     "Connectivité verticale : Outils, ressources, compétences et Web (MCP, Agent Skills, WebMCP)", 22,
     ["5.1 Architecture approfondie du Model Context Protocol (MCP) : Host, Client, Server et Streamable HTTP",
      "5.2 Ingénierie des primitives MCP en entreprise : Tools, Resources, Prompts, Sampling et Elicitation",
      "5.3 Conception d'outils orientés intention vs mappage REST 1:1 et gestion de la pagination",
      "5.4 Portabilité cognitive : Agent Skills, AGENTS.md, Open Responses et WebMCP"],
     "Industrialisation des serveurs MCP internes exposant SAP S/4HANA, Snowflake et ServiceNow chez Boréal",
     "Santé & Sciences de la vie — Exposition granulaire de dossiers cliniques FHIR via MCP audité",
     "ADR-005 — Standardisation de l'exposition d'outils métiers sur MCP Streamable HTTP orienté domaine"),

    ("partie-02-pile-protocolaire", "ch06-coordination-horizontale-a2a-agntcy.md", 6,
     "Coordination horizontale, découverte et réseau inter-agents (A2A v1.0, AGNTCY)", 22,
     ["6.1 Protocole A2A v1.0 (convergence ACP) : Agent Cards, tâches asynchrones et artefacts typés",
      "6.2 Découverte dynamique et modélisation des capacités avec AGNTCY OASF et Agent Directory",
      "6.3 Transport inter-agents sécurisé basse latence : SLIM et chiffrement MLS post-quantique",
      "6.4 Traversée des frontières organisationnelles et fédération multi-locataire (ANP)"],
     "Interconnexion horizontale A2A entre l'agent diagnostic BSN, l'agent garantie BCA et l'agent stock BEL",
     "Chaîne logistique mondiale — Fédération d'annuaires d'agents entre donneurs d'ordres et transporteurs",
     "ADR-006 — Utilisation d'A2A v1.0 et d'Agent Cards signées pour toute délégation inter-domaines"),

    ("partie-02-pile-protocolaire", "ch07-interfaces-multimodalite-commerce-ap2-x402.md", 7,
     "Interfaces humain-agent, multimodalité temps réel et protocoles transactionnels (AG-UI, A2UI, AP2, x402)", 16,
     ["7.1 Interfaces réactives pilotées par événements : AG-UI, deltas d'état et A2UI / MCP-UI",
      "7.2 Agents vocaux et visuels temps réel : pipelines WebRTC full-duplex et gestion du barge-in",
      "7.3 Commerce agentique : mandats vérifiables AP2 (FIDO / W3C VCs) et règlement HTTP x402"],
     "Déploiement du poste opérateur AG-UI/A2UI et de l'assistance vocale WebRTC mains libres en usine Boréal",
     "Commerce B2B & Fintech — Encadrement cryptographique des micro-paiements d'API et d'achats spot",
     "ADR-007 — Découplage déclaratif des interfaces génératives via AG-UI et A2UI"),

    ("partie-03-semantique-memoire", "ch08-context-engineering-echelle.md", 8,
     "Le mur du contexte d'entreprise : Ingénierie du contexte (Context Engineering) à grande échelle", 18,
     ["8.1 Limites du RAG vectoriel naïf : dérive d'interprétation, Context Rot et bruit inter-agents",
      "8.2 Assemblage dynamique, compression sélective et isolation du contexte lors des handoffs",
      "8.3 Recherche respectueuse des droits d'accès (ACL-aware retrieval) et traçabilité des sources"],
     "Refonte du pipeline de contexte technique et contractuel alimentant les agents de soutien BSN",
     "Cabinets juridiques & Assurance — Garantie d'étanchéité documentaire multi-dossiers",
     "ADR-008 — Passage de la transmission intégrale d'historique à des enveloppes de contexte minimales typées"),

    ("partie-03-semantique-memoire", "ch09-couches-semantiques-ontologies-ossie.md", 9,
     "Couches sémantiques normalisées et ontologies d'entreprise (Apache Ossie)", 20,
     ["9.1 Couche sémantique analytique vs Ontologie opérationnelle causale",
      "9.2 Standardisation inter-plateformes avec Apache Ossie (Open Semantic Interchange)",
      "9.3 Couplage GraphRAG, moteurs de contraintes neuro-symboliques et planification d'actions"],
     "Alignement des définitions « client actif », « équipement sous garantie » et « stock disponible » via Apache Ossie chez Boréal",
     "Commerce de détail omnicanal — Cohérence des règles de tarification et de marge entre BI et agents",
     "ADR-009 — Obligation de résolution sémantique via Apache Ossie avant toute agrégation ou écriture métier"),

    ("partie-03-semantique-memoire", "ch10-memoire-agentique-bitemporelle.md", 10,
     "Architectures de mémoire agentique distribuée et bi-temporelle", 17,
     ["10.1 Taxonomie opérationnelle : mémoire de session, épisodique, sémantique et procédurale",
      "10.2 Graphes de connaissances bi-temporels (Graphiti) vs mémoire auto-éditée de type OS (Letta)",
      "10.3 Concurrence d'écriture, cloisonnement multi-tenant, rétention légale et droit à l'effacement"],
     "Mise en place d'une mémoire épisodique bi-temporelle des interventions équipements sur le parc client Boréal",
     "Services financiers & Québec (Loi 25) — Purge vérifiable et gouvernance temporelle des profils clients",
     "ADR-010 — Architecture de mémoire hybride combinant graphe bi-temporel et état de session éphémère"),

    ("partie-04-orchestration-durabilite", "ch11-topologies-orchestration-choregraphie.md", 11,
     "Topologies d'orchestration et de chorégraphie multi-agents", 22,
     ["11.1 Patrons centralisés : Superviseur, Planificateur-Exécuteur-Critique et DAG dynamiques",
      "11.2 Patrons décentralisés : Tableau noir, enchères Contract Net, essaims (Swarms) et consensus",
      "11.3 Modèles hybrides BPMN/agentiques et matrice de sélection multicritère"],
     "Sélection des topologies par famille de cas d'usage au sein des trois divisions du Groupe Boréal",
     "Télécommunications — Coordination d'essaims de diagnostic réseau vs orchestration d'intervention terrain",
     "ADR-011 — Matrice normative de sélection entre orchestration hiérarchique et chorégraphie événementielle"),

    ("partie-04-orchestration-durabilite", "ch12-execution-durable-cycles-longs.md", 12,
     "Moteurs d'exécution durable et gestion des cycles de vie longue durée", 22,
     ["12.1 Principes de l'exécution durable : Event Sourcing déterministe, replay et awakeables",
      "12.2 Implémentations de référence : Temporal, Restate, Microsoft Agent Framework et Bedrock AgentCore",
      "12.3 Idempotence de bout en bout des outils et mise en veille scale-to-zero sur attente humaine"],
     "Implémentation sur Temporal du dossier d'indemnisation bris de machine s'étalant sur 14 jours chez BCA",
     "Assurance & Crédit hypothécaire — Résilience des processus multi-semaines soumis à pièces justificatives",
     "ADR-012 — Exécution obligatoire de tout flux agentique multi-étapes mutatif sur moteur durable"),

    ("partie-04-orchestration-durabilite", "ch13-maillage-evenementiel-saga-compensation.md", 13,
     "Maillage événementiel asynchrone et patron Saga à compensation", 20,
     ["13.1 Event-Driven Agentic Architecture (EDAA) sur Confluent Kafka, Solace Agent Mesh et NATS",
      "13.2 Pourquoi le verrouillage 2PC est impraticable : Sagas agentiques orchestrées et chorégraphiées",
      "13.3 Ingénierie des actions de compensation, écritures inverses et tampons d'actions irréversibles"],
     "Saga inter-divisions Boréal (Réservation pièce SAP + Mobilisation technicien ServiceNow + Franchise BCA) et rollback propre",
     "Transport aérien & Logistique — Replanification en cascade et compensations multi-partenaires",
     "ADR-013 — Contrat de compensation obligatoire pour chaque outil mutatif exposé sur le maillage"),

    ("partie-04-orchestration-durabilite", "ch14-passerelles-routage-hybride-kvcache.md", 14,
     "Plan de données AI-natif, passerelles et routage cognitif hybride", 16,
     ["14.1 Passerelles unifiées LLM / MCP / A2A : agentgateway et Agent Router (Envoy)",
      "14.2 Routage dynamique SLM + LLM de raisonnement et allocation du test-time compute",
      "14.3 Ordonnancement conscient du préfixe et partage de KV-cache entre tours d'outils sur Kubernetes"],
     "Déploiement d'agentgateway et réduction de 62 % de la latence médiane et du coût d'inférence chez Boréal",
     "Souveraineté infonuagique — Routage sélectif vers SLM locaux pour données classifiées",
     "ADR-014 — Point de passage unique via passerelle AI-native et routage cognitif à trois paliers"),

    ("partie-05-integration-si-it-ot", "ch15-federation-saas-orchestrateur-orchestrateurs.md", 15,
     "Fédération des jardins clos SaaS et problème de l'« Orchestrateur d'Orchestrateurs »", 22,
     ["15.1 Coexistence d'Agentforce, ServiceNow AI Agents, SAP Joule, Copilot Studio et Workday",
      "15.2 Principe de gravité des données (Data Gravity) et plans de contrôle agnostiques (MuleSoft Agent Fabric)",
      "15.3 Propagation d'identité fédérée et prévention des boucles circulaires inter-plateformes"],
     "Architecture de fédération entre Copilot Studio, Salesforce Agentforce, ServiceNow et SAP Joule chez Boréal",
     "Grands groupes multinationaux — Gouvernance multi-éditeurs après fusions-acquisitions",
     "ADR-015 — Ancrage des agents spécialistes selon la gravité des données et fédération par plan de contrôle neutre"),

    ("partie-05-integration-si-it-ot", "ch16-integration-legacy-cua-rpa-mainframe.md", 16,
     "Intégration Legacy sans API : Computer-Use Agents (CUA), RPA/APA et Mainframes", 18,
     ["16.1 Convergence RPA déterministe et APA cognitive : architecture UiPath Maestro",
      "16.2 Fiabilisation et confinement des Computer-Use Agents (CUA) sur écrans Citrix et terminaux 3270/5250",
      "16.3 Encapsulation progressive de transactions CICS/IMS, AS/400 et flux EDI X12 en serveurs MCP"],
     "Pont sécurisé vers le cœur IBM i (AS/400) de Boréal Capital & Assurances combinant connecteurs RPG et CUA supervisé",
     "Banques & Assureurs patrimoniaux — Stratégie de décommissionnement du screen-scraping fragile",
     "ADR-016 — Doctrine d'usage restreint des Computer-Use Agents en dernier recours sous double validation"),

    ("partie-05-integration-si-it-ot", "ch17-orchestration-cyber-physique-it-ot.md", 17,
     "Orchestration cyber-physique : Convergence IT/OT, OPC-UA et Jumeaux numériques", 20,
     ["17.1 Contraintes temps réel, sûreté fonctionnelle et segmentation réseau (modèle Purdue / IEC 62443)",
      "17.2 Exploration sémantique et diagnostic autonome sur OPC-UA, MQTT Sparkplug et historiens",
      "17.3 Validation pré-exécution obligatoire sur Jumeau numérique avant écriture vers automates PLC/SCADA"],
     "Orchestration de la maintenance prédictive et du rééquilibrage de ligne dans l'usine Boréal de Trois-Rivières",
     "Énergie, Mines & Manufacturier — Interdiction d'écriture directe LLM sur boucles d'asservissement",
     "ADR-017 — Architecture en sas par Jumeau numérique et validation déterministe pour toute consigne IT→OT"),

    ("partie-06-identite-securite-zerotrust", "ch18-identites-nhi-oauth-obo-zero-trust.md", 18,
     "Identités non humaines (NHI) de première classe et délégation cryptographique", 22,
     ["18.1 Impasse du badge humain emprunté et du compte de service statique face aux graphes dynamiques",
      "18.2 Identité cryptographique et provenance d'agent : SPIFFE/SPIRE et W3C DIDs / VCs",
      "18.3 Délégation multi-sauts OAuth 2.1 OBO, RFC 8693 (sub/act), atténuation de portée et CIBA"],
     "Refonte IAM sur Microsoft Entra ID et SPIRE pour tracer chaque chaîne Utilisateur → Orchestrateur → Agent chez Boréal",
     "Secteur Financier — Piste d'audit nominative exigée par BSIF E-23 et séparation des tâches (SoD)",
     "ADR-018 — Identité NHI unique par classe d'agent et échange de jetons RFC 8693 à portée atténuée à chaque saut"),

    ("partie-06-identite-securite-zerotrust", "ch19-menaces-owasp-asi-securite-mcp.md", 19,
     "Modélisation des menaces multi-agents (OWASP ASI01–ASI10) et sécurité MCP", 20,
     ["19.1 Analyse détaillée et arbres d'attaque du référentiel OWASP Top 10 for Agentic Applications (ASI01–ASI10)",
      "19.2 Vecteurs spécifiques MCP : Tool Description Poisoning, Rug-Pulls, Shadowing et Confused Deputy",
      "19.3 Propagation latérale trans-agent, empoisonnement de mémoire partagée et red-teaming automatisé"],
     "Exercice Red Team sur la Fabrique Boréal : neutralisation d'une injection indirecte via bordereau fournisseur PDF",
     "Défense & Infrastructures critiques — Contre-mesures face à la compromission de chaîne d'approvisionnement MCP",
     "ADR-019 — Modélisation de menaces ASI01–ASI10 obligatoire et épinglage cryptographique des schémas MCP"),

    ("partie-06-identite-securite-zerotrust", "ch20-sandboxing-politiques-opa-cedar-killswitch.md", 20,
     "Défense en profondeur : Sandboxing, garde-fous neuro-symboliques et coupe-circuits", 18,
     ["20.1 Isolation d'exécution : microVMs (Firecracker), OpenSandbox (AAIF) et bacs à sable WebAssembly (WASI)",
      "20.2 Évaluation continue PDP/PEP hors du LLM via OPA (Rego), Cedar et raisonnement automatisé",
      "20.3 Coupe-circuits (Kill Switches) SOC multi-nuages et révocation instantanée d'états et de jetons"],
     "Déploiement de politiques Cedar en ligne et d'un coupe-circuit centralisé testé trimestriellement chez Boréal",
     "Fournisseurs Cloud & SaaS — Isolation multi-locataire stricte du code généré à la volée",
     "ADR-020 — Découplage systématique des garde-fous déterministes (Cedar/OPA) et exécution en microVM isolée"),

    ("partie-07-agentops-observabilite-finops", "ch21-observabilite-opentelemetry-genai.md", 21,
     "Observabilité distribuée de bout en bout avec OpenTelemetry GenAI", 16,
     ["21.1 Conventions sémantiques OpenTelemetry (gen_ai.*) appliquées aux graphes multi-agents, MCP et A2A",
      "21.2 Corrélation traces techniques / trajectoires cognitives et détection des boucles ou dérives",
      "21.3 Protection des renseignements personnels (PII) dans la télémétrie et gouvernance d'opt-in"],
     "Instrumentation unifiée OpenTelemetry de tous les agents SaaS et sur mesure vers le socle d'observabilité Boréal",
     "Québec & Europe (Loi 25 / RGPD) — Journalisation explicable sans fuite de données personnelles dans les spans",
     "ADR-021 — Doctrine « Pas de trace OpenTelemetry gen_ai.*, pas de mise en production »"),

    ("partie-07-agentops-observabilite-finops", "ch22-adlc-cicd-simulation-taubench-chaos.md", 22,
     "Cycle de vie ADLC, CI/CD probabiliste, simulation (tau-bench) et ingénierie du chaos", 18,
     ["22.1 Agent Development Lifecycle (ADLC), Registre d'Agents d'Entreprise et SemVer + Intent",
      "22.2 Harnais de simulation multi-tours (OpenEnv, tau-bench, tau2, tau3) et exigence de constance pass^k",
      "22.3 Ingénierie du chaos agentique, déploiements Shadow/Canary et retour arrière automatique"],
     "Pipeline CI/CD AgentOps du Groupe Boréal : 1 200 scénarios simulés et validation pass^5 avant canary 5 %",
     "Service client à haut volume — Prévention des régressions de politique commerciale lors des changements de modèle",
     "ADR-022 — Portes d'homologation CI/CD fondées sur la métrique pass^k en environnement simulé et déploiement Canary"),

    ("partie-07-agentops-observabilite-finops", "ch23-finops-agentique-cost-per-outcome.md", 23,
     "FinOps agentique : Gouvernance économique et Cost-per-Outcome", 16,
     ["23.1 Anatomie de l'inflation des coûts multi-agents et plafonds budgétaires par transaction",
      "23.2 Attribution analytique temps réel (jetons, test-time compute, mémoire, outils externes)",
      "23.3 Pilotage par le Cost-per-Outcome, tarification interne (chargeback) et élagage du portefeuille"],
     "Élimination des dérapages de jetons et passage au pilotage par coût unitaire de billet résolu chez Boréal",
     "Éditeurs SaaS — Modèles de tarification hybrides orientés résultats face à la volatilité des coûts d'inférence",
     "ADR-023 — Enveloppe budgétaire maximale par saga et revue mensuelle de rentabilité Cost-per-Outcome"),

    ("partie-08-gouvernance-droit-organisation", "ch24-conformite-iso42001-euaiact-e23-loi25-b2b.md", 24,
     "Conformité réglementaire internationale et canadienne, et droit B2B inter-agents", 18,
     ["24.1 Système de management certifiable ISO/IEC 42001 et alignement NIST AI Agent Standards",
      "24.2 Calendrier 2026–2027 : EU AI Act (art. 50 et Annexe III déc. 2027), BSIF E-23 (1er mai 2027) et Loi 25",
      "24.3 Droit des contrats B2B conclus entre agents autonomes, responsabilité civile et anti-collusion"],
     "Dossier d'homologation croisée ISO/IEC 42001, BSIF E-23, Loi 25 et EU AI Act du Groupe Boréal et pilote d'achat B2B AP2",
     "Institutions financières canadiennes — Plan de mise en conformité pratique pour l'échéance BSIF E-23 du 1er mai 2027",
     "ADR-024 — Classification réglementaire dynamique fondée sur l'empreinte de déploiement (Deployment Footprint)"),

    ("partie-08-gouvernance-droit-organisation", "ch25-modele-operationnel-hotl-prospective.md", 25,
     "Modèle opérationnel cible, facteur humain (HOTL) et prospective 2028–2030", 17,
     ["25.1 Organisation Hub-and-Spoke : Centre d'Excellence Agentique, propriétaires métiers nommés et tandem RH-IT",
      "25.2 Ergonomie cognitive du Human-on-the-Loop (HOTL) et lutte contre la complaisance d'automatisation (ASI09)",
      "25.3 Horizon 2028–2030 : marchés B2B autonomes liquides, auto-conception vérifiée et Physical AI"],
     "Bilan à 12 mois de la Fabrique Agentique Boréal, nouvelle organisation des équipes et feuille de route 2028–2030",
     "Transformation des métiers — Requalification des coordonnateurs opérationnels en superviseurs de flotte agentique",
     "ADR-025 — Rattachement de chaque boucle agentique en production à un propriétaire métier nominatif responsable"),
]

ANNEXES = [
    ("annexe-a-patrons-adr-arbres-choix.md", "Annexe A — Patrons de décision architecturale (ADR) et arbres de choix", 8,
     ["A.1 Récapitulatif consolidé des 25 décisions d'architecture (ADR-001 à ADR-025)",
      "A.2 Arbre de décision : Protocole d'outil (MCP) vs Protocole de pair (A2A) vs Événement (Kafka/Solace)",
      "A.3 Arbre de décision : API directe vs Orchestration durable vs Boucle agentique vs CUA"]),
    ("annexe-b-checklists-homologation.md", "Annexe B — Listes de contrôle d'homologation pré-production (60 points)", 6,
     ["B.1 Grille Sécurité, Identité NHI et Zero Trust (15 points)",
      "B.2 Grille Résilience, Idempotence et Compensation Saga (15 points)",
      "B.3 Grille Observabilité OpenTelemetry, Qualité pass^k et FinOps (15 points)",
      "B.4 Grille Conformité ISO/IEC 42001, BSIF E-23, Loi 25 et EU AI Act (15 points)"]),
    ("annexe-c-glossaire-index-standards.md", "Annexe C — Glossaire normatif français-anglais et index des standards 2027", 6,
     ["C.1 Glossaire terminologique bilingue (Français canadien / Anglais technique)",
      "C.2 Répertoire synthétique des fondations, protocoles et cadres réglementaires 2027"]),
]


def main() -> None:
    root = Path("manuscrit")

    for folder, ptitle, budget, span in PARTS:
        pfile = root / folder / f"00-{folder[:9]}.md"
        content = (
            f"# {ptitle} {{.partie-titre}}\n\n"
            f"> **Budget éditorial** : {budget} • **{span}**\n\n"
            f"*Ouverture de partie structurée conformément au plan directeur du Compendium 2027.*\n"
        )
        pfile.write_text(content, encoding="utf-8")

    for folder, fname, num, title, pages, sections, boreal, sector, adr in CHAPTERS:
        cfile = root / folder / fname
        sec_md = "\n\n".join(
            f"## {s}\n\n*Section planifiée (cible chapitre : {pages} pages — format Hybride exigeant).*"
            for s in sections
        )
        content = f"""# Chapitre {num} — {title}

::: {{.synthese-executive title="Synthèse exécutive — Chapitre {num} (Cible : {pages} pages)"}}
* **Objectif architectural** : Couvrir de bout en bout la thématique *{title}*.
* **Budget éditorial** : {pages} pages imprimées (incluant schémas protocolaires, patrons d'implémentation, fil rouge et ADR).
:::

{sec_md}

::: {{.fil-rouge title="Fil rouge — Groupe Boréal : Étape du Chapitre {num}"}}
**Chantier prévu** : {boreal}.
:::

::: {{.encadre-sectoriel title="{sector}"}}
*Éclairage vertical planifié conformément à la charte éditoriale.*
:::

::: {{.adr title="{adr}"}}
**Statut** : Planifiée | **Portée** : Fabrique Agentique d'Entreprise | **Chapitre** : {num}
:::
"""
        cfile.write_text(content, encoding="utf-8")

    for fname, title, pages, sections in ANNEXES:
        afile = root / "annexes" / fname
        sec_md = "\n\n".join(f"## {s}\n\n*Contenu normatif planifié ({pages} pages au total pour l'annexe).*" for s in sections)
        content = f"# {title}\n\n{sec_md}\n"
        afile.write_text(content, encoding="utf-8")

    print(f"Squelettes initialisés : {len(PARTS)} parties, {len(CHAPTERS)} chapitres, {len(ANNEXES)} annexes.")


if __name__ == "__main__":
    main()
