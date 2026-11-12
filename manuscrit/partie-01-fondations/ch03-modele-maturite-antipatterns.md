# Chapitre 3 — Modèle de maturité de l'entreprise agentique (Niveaux 1 à 5) et antipatterns

::: {.synthese-executive title="Synthèse exécutive — Chapitre 3"}

* **Enjeu stratégique** : En 2027, la plupart des grandes entreprises ne manquent pas d'initiatives en intelligence artificielle ; elles étouffent sous une prolifération non gouvernée de prototypes locaux (*Shadow Agent Sprawl*) incapables de franchir le mur de la sécurité, de l'idempotence et de l'auditabilité. Tenter de sauter directement du stade exploratoire (`N1`) au maillage autonome multi-domaines (`N4`) sans ériger le socle industriel intermédiaire (`N3`) conduit systématiquement à des incidents majeurs et à un blocage par la conformité.
* **Décisions architecturales structurantes** :
  1. *Irréversible à l'échelle du groupe* : Instituer quatre portes d'homologation bloquantes (*Stage-Gates* `G1` à `G4`) appliquées par des politiques exécutables en CI/CD plutôt que par de simples revues documentaires.
  2. *Structurante dès le cadrage* : Exiger un diagnostic formel d'aptitude patrimoniale (*Brownfield Assessment*) sur chaque système d'enregistrement avant d'autoriser la moindre écriture agentique.
  3. *Réversible et pragmatique* : Assigner un **niveau de maturité cible différencié par processus** — plafonner délibérément un flux interne à `N2` ou `N3` lorsque la fédération inter-entreprises `N5` n'offre aucun gain économique net.
* **Indicateurs de gouvernance associés** : Couverture exhaustive du registre d'actifs agentiques (cible : 100 %, zéro agent fantôme mutatif), score composite de maturité par division, taux de mutualisation des serveurs `MCP` homologués, et économies annuelles issues du décommissionnement d'antipatterns.

:::

## 3.1 Grille d'évaluation en 5 stades (Ad hoc, Départemental, Gouverné, Orchestré, Fédéré B2B)

Les référentiels classiques de maturité analytique ou *MLOps* évaluent la qualité des lacs de données et la dérive statistique de modèles prédictifs passifs. Ils restent aveugles au risque propre de l'entreprise agentique : **un agent détient des identités déléguées, invoque des outils transactionnels et modifie directement l'état des systèmes d'enregistrement**. Une organisation peut exceller en science des données prédictive tout en stagnant au niveau `N1` de maturité agentique si ses prototypes partagent des clés API statiques, ignorent les fenêtres de traitement par lots de son ERP et s'exécutent sans persistance durable ni mécanisme de compensation transactionnelle.

Le modèle de référence 2027 structure la progression sur **cinq paliers (`N1` à `N5`)** évalués à travers **six dimensions orthogonales**.

![Modèle de maturité de l'entreprise agentique (N1 à N5) et portes de gouvernance bloquantes.](manuscrit/figures/fig-03-maturite-trajectoire.svg)

### Définition opérationnelle des cinq niveaux

* **Niveau 1 — Ad hoc & Exploratoire (*Shadow & Individual Productivity*)** : Assistants conversationnels synchrones et scripts isolés utilisant des sessions personnelles ou des clés API partagées. L'employé humain sert de presse-papiers entre applications. Zéro inventaire central, zéro télémétrie `OpenTelemetry`, risque maximal d'exfiltration de données (`Loi 25`) et impact nul sur les délais de traversée inter-systèmes.
* **Niveau 2 — Départemental Outillé (*Siloed SaaS & Local Tooling*)** : Agents déployés dans le studio fermé d'un éditeur SaaS unique ou connectés à de premiers serveurs `MCP` locaux. L'état réside en mémoire volatile, les comptes de service demeurent sur-privilégiés, et une approbation humaine systématique (`HITL` à 100 %) transfère le goulot d'étranglement vers les gestionnaires.
* **Niveau 3 — Gouverné, Durable & Auditable (*Enterprise Production Foundation*)** : **Point d'inflexion obligatoire de toute production critique.** Exécution sur épine dorsale déterministe durable (`Temporal`, `Restate`), identité non humaine (`NHI` `SPIFFE`) avec échange de jetons `OAuth 2.1 On-Behalf-Of`, passage forcé par `agentgateway` sous politiques `Cedar`/`OPA`, outils `MCP` idempotents, supervision `HOTL` sur score de risque et tests automatisés \(\text{pass}^5\).
* **Niveau 4 — Orchestré Multi-Domaines (*Cross-Silo Agentic Fabric*)** : Maillage transversal reliant ventes, finance, ateliers `IT/OT`, logistique et systèmes patrimoniaux via `A2A v1.0` et une ontologie partagée. Sagas multi-jours à compensation distribuée et routage économique dynamique `SLM`/`LLM` piloté au *Cost-per-Outcome*.
* **Niveau 5 — Écosystème Fédéré B2B (*Inter-Enterprise Network*)** : Délégation directe entre flottes agentiques d'entreprises partenaires (fournisseurs, transporteurs, assureurs) via annuaires `AGNTCY`/`OASF`, fédération `mTLS`/`DID` en `DMZ`, protocoles transactionnels vérifiables (`AP2`, `x402`) et coupe-circuits inter-organisations.

> [!IMPORTANT]
> **Principe du juste niveau cible** : Le palier `N5` n'est pas l'aboutissement obligatoire de chaque initiative. Pour 85 % des flux internes d'une entreprise, les paliers **N3** (intra-domaine) et **N4** (transversal interne) constituent l'optimum de rentabilité et de sécurité. En outre, le niveau effectif d'un système est dicté par son **maillon le plus faible** : un graphe multi-agents sophistiqué (`N4`) utilisant une clé API statique (`N1`) demeure classé `N1`.

| Dimension d'audit | N1 — Ad hoc | N2 — Départemental | N3 — Gouverné (Socle) | N4 — Orchestré SI | N5 — Fédéré B2B |
|---|---|---|---|---|---|
| **1. Architecture & État** | Clavardage synchrone sans état | Boucle `ReAct` locale en mémoire vive | Épine durable (`Temporal`/`Restate`) + cellules bornées | Sagas compensées multi-SI (`IT/OT`, ERP, CRM) | Sagas inter-firmes sous SLA contractuels |
| **2. Interopérabilité** | Copier-coller manuel humain | Adaptateurs éditeur / `MCP` isolés | Catalogue interne de serveurs `MCP` idempotents | Bi-couche AAIF : `MCP` vertical + `A2A v1.0` horizontal | Découverte `AGNTCY`/`OASF` + mandats `AP2`/`x402` |
| **3. Identité & Sécurité** | Session perso ou clé API en clair | Compte de service statique large | Identité `NHI` (`SPIFFE`) + `OAuth 2.1 OBO` + `Cedar` | Atténuation des portées à chaque saut `A2A` | Fédération `mTLS`/`DID`, `DMZ` et coupe-circuits croisés |
| **4. Qualité & Traces** | Aucune trace structurée | Journaux applicatifs locaux épars | Traces `OpenTelemetry gen_ai.*` + banc CI/CD \(\text{pass}^5\) | Évaluation continue + méta-gouverneurs indépendants | Journaux d'audit signés opposables entre tiers |
| **5. Supervision humaine** | Exécuteur intégral (`L0`/`L1`) | Approbateur `HITL` à 100 % (`L2`) | Superviseur `HOTL` sur seuil via `CIBA`/`A2UI` (`L3`) | Gouvernance des politiques et arbitrage d'exceptions | Définition des mandats et plafonds B2B |
| **6. Pilotage FinOps** | Abonnements individuels dispersés | Facture brute mensuelle de jetons | Quotas durs par enveloppe et imputation analytique | Pilotage **Cost-per-Outcome** et routage `SLM`/`LLM` | Règlement automatisé à la transaction B2B |

---

## 3.2 Anatomie des antipatterns : Shadow Sprawl, God Agent, pavage de processus défaillants

L'audit des programmes en difficulté entre 2025 et 2027 montre que les échecs industriels découlent presque toujours de **sept antipatterns structurels** identifiables par télémétrie :

1. **Shadow Agent Sprawl (Prolifération d'agents fantômes)** : Automatisations assemblées dans des outils no-code avec les jetons OAuth personnels d'employés. Invisibles du SOC, elles exposent des données régies par la `Loi 25` vers des API non homologuées et se rompent silencieusement au départ du collaborateur.
2. **The God Agent (L'agent omniscient monolithique)** : Un agent unique cumulant un prompt de dix mille mots et quarante outils disparates (finance, stock, support). Il combine effondrement de précision cognitive, explosion de jetons de contexte et violation de la séparation des tâches (`Segregation of Duties`) sous `BSIF E-23`.
3. **Paving the Cow Path (Pavage du chaos bureaucratique)** : Déployer un premier agent pour rédiger un courriel PDF récapitulatif qu'un second agent du service voisin réextrait par reconnaissance optique vers l'ERP — numérisant à prix d'or une friction obsolète qu'un appel structuré `MCP` ou un événement `Kafka` élimine à 100 % de fiabilité.
4. **Agent-Washing & LLM-for-Everything (Vernis agentique)** : Rebaptiser « agent » une tâche planifiée ordinaire ou remplacer une requête SQL exacte et un barème tarifaire par une inférence probabiliste coûteuse et faillible.
5. **Chatty Mesh (Maillage bavard non borné)** : Deux agents pairs échangeant en langage naturel sans schéma `A2A` ni plafond `maxRemainingHops`, s'enfermant dans des boucles de reformulation polie jusqu'à épuisement budgétaire.
6. **Adapter Spaghetti (Spaghetti de connecteurs dédiés)** : Coder des connecteurs `SAP` ou `ServiceNow` spécifiques dans trente dépôts projets au lieu de mutualiser un serveur `MCP` officiel par domaine métier.
7. **HITL Theater (Théâtre de validation humaine)** : Submerger un opérateur de centaines d'approbations routinières validées par réflexe en deux secondes (`OWASP ASI09`), cumulant lenteur administrative et absence réelle de contrôle sur les cas critiques.

| Antipattern | Symptôme télémétrique | Risque majeur (`OWASP` / Légal) | Remédiation architecturale |
|---|---|---|---|
| **Shadow Sprawl** | Flux DNS/TLS vers API LLM hors passerelle ; jetons perso actifs la nuit | `ASI03` (Abus d'identité), infraction `Loi 25` / `RGPD` | Proxy sortant obligatoire + amnistie `G1` + identités `NHI` |
| **God Agent** | \(> 12\) outils exposés ; prompt \(> 4\,000\) jetons ; \(\text{pass}^5 < 70\,\%\) | `ASI02` (Abus d'outils), échec séparation des tâches `E-23` | Découpage en spécialistes de domaine (`A2A`) à périmètre `MCP` étroit |
| **Paving Cow Path** | Un agent génère du texte/PDF aussitôt parsé par un autre agent interne | Gaspillage FinOps massif, perte d'intégrité sémantique | Contrat d'événement typé (`AsyncAPI`) ou invocation `MCP` directe |
| **LLM-for-Everything** | Coût \(> 0,05\) \$ CAD pour un calcul ou routage déterministe | Erreurs arithmétiques, latence \(100\times\) injustifiée | Remplacement immédiat par table `DMN` ou microservice API |
| **Chatty Mesh** | Plus de 4 sauts inter-agents par tâche ; échanges non typés | `ASI08` (Cascade), destruction du budget de jetons | `ActionEnvelope` (`maxRemainingHops`) + schémas JSON `A2A` |
| **Adapter Spaghetti** | Plus de 2 connecteurs distincts maintenus vers le même progiciel | Dette \(M \times N\), règles d'idempotence incohérentes | Serveur `MCP` unique par domaine derrière `agentgateway` |
| **HITL Theater** | Temps médian de revue \(< 4\text{ s}\) ; approbation \(> 99,2\,\%\) | `ASI09` (Complaisance humaine), goulot d'étranglement | Bascule `HOTL` sur score de risque + gardes déterministes `Cedar` |

::: {.encadre-sectoriel title="Secteur Public et Parapublic — Maîtrise de l'IA fantôme, Loi 25 et reddition de comptes algorithmique"}

Dans les ministères, réseaux de santé et organismes publics, le *Shadow Agent Sprawl* entache directement la légalité des actes administratifs. Au Québec, la **Loi 25** (évaluation des facteurs relatifs à la vie privée — `ÉFVP` — préalable à tout transfert hors juridiction, et article 12.1 imposant d'informer le citoyen de toute décision fondée exclusivement sur un traitement automatisé ainsi que des paramètres déterminants) impose trois verrous dès la **Porte G1/G2** :

1. **Registre opposable exhaustif** : Interdiction stricte de tout agent non inventorié manipulant un dossier d'usager, de prestation ou de marché public.
2. **Souveraineté réseau** : Filtrage par `agentgateway` bloquant tout envoi de renseignements personnels non anonymisés hors des régions infonuagiques souveraines homologuées.
3. **Traçabilité des paramètres décisionnels** : Journalisation immuable des règles déterministes (`DMN`) et pièces sources permettant de motiver formellement toute décision contestée.

:::

---

## 3.3 Méthode de diagnostic d'architecture patrimoniale (*Brownfield Assessment*)

Connecter une flotte d'agents asynchrones directement sur un patrimoine applicatif vieux de vingt ans (*brownfield*) sans diagnostic préalable provoque la saturation des pools de connexions historiques ou la création d'écritures corrompues lors des réessais. Avant toute ouverture en écriture (`L2+`), chaque *System of Record* est évalué de \(0\) à \(100\) selon **cinq critères pondérés** :

1. **Transactionalité et idempotence (\(c_1\), poids \(0,25\))** : API métier atomique à clé d'idempotence native vs CRUD bas niveau ou terminal `5250`/`3270`.
2. **Propagation d'identité granulaire (\(c_{\text{sec}}\), poids \(0,25\))** : Support de jetons délégués nominatifs (`OAuth 2.1 OBO`) vs compte technique global aveugle.
3. **Fraîcheur et sémantique d'état (\(c_3\), poids \(0,20\))** : Flux événementiel temps réel (`CDC`) vs lots nocturnes gelant les soldes.
4. **Primitives de compensation (\(c_4\), poids \(0,15\))** : Existence d'opérations d'annulation ou d'avoir pour participer à une `Saga`.
5. **Fidélité du bac à sable (\(c_5\), poids \(0,15\))** : Capacité à exécuter les bancs \(\text{pass}^5\) hors production.

Une clause éliminatoire sur la sécurité (\(\tau_{\text{min}} = 60\)) empêche toute compensation d'une faille d'auditabilité par la richesse fonctionnelle :

\[S_{\text{ready}} = \left(\sum_{d=1}^{5} w_d c_d\right) \mathbb{I}(c_{\text{sec}} \ge \tau_{\text{min}})\]

Si \(S_{\text{ready}} < 50\) (ou \(c_{\text{sec}} < 60\)), le système reste **bloqué en lecture seule (`L1`)** jusqu'à interposition d'une façade `MCP` gérant en externe un registre ACID d'idempotence, un limiteur de concurrence (*Bulkhead*) et une piste d'audit nominative. Ce cloisonnement de concurrence protège notamment les tables de verrous pessimistes (`SAP ENQUEUE` ou sous-systèmes interactifs `QINTER` sur `IBM i`) contre les rafales synchronisées de réessais agentiques qui paralysent en quelques secondes un cœur transactionnel dimensionné pour le rythme de frappe humain. Entre \(50\) et \(75\), l'écriture bornée est permise sous quotas stricts et recul exponentiel temporisé (*full jitter*) ; à \(75\) et plus, le système est qualifié natif `N3`/`N4`.

#### Extrait 3.1 — Manifeste YAML d'évaluation patrimoniale (*Brownfield Readiness Manifest*)

```yaml
apiVersion: fabric.boreal.ca/v1alpha2
kind: SystemOfRecordAssessment
metadata:
  systemId: bca-core-ibmi-contracts
  division: "Boréal Capital & Assurances (BCA)"
  regulatoryRegimes: ["BSIF-E23", "QC-LOI-25"]
spec:
  legacyProfile:
    protocol: "TN5250 / RPG-ILE Stored Procedures"
    nightlyBatchFreezeUtc: "03:00-04:15"
    maxSafeConcurrencyRps: 15
  readinessScores:
    transactionalIdempotency: 40
    identityPropagationSec: 70
    semanticFreshness: 65
    compensationPrimitives: 55
    sandboxFidelity: 60
  remediationFacade:
    mcpServer: "mcp-bca-ibmi-warranty-facade"
    externalIdempotencyLedger: "PostgreSQL ACID (TTL 7d)"
    bulkheadMaxConcurrentCalls: 8
    batchFreezePolicy: "PAUSE_IN_TEMPORAL_UNTIL_0416_UTC"
  verdict:
    computedScore: 57.75
    autonomyCeiling: "L3_PREAUTH_UNDER_5000_CAD"
    directTableWriteForbidden: true
```

#### Extrait 3.2 — Moteur Python d'audit de portefeuille et de triage des antipatterns

```python
from dataclasses import dataclass
from typing import Literal

Action = Literal["PROMOTE", "REMEDIATE", "QUARANTINE_L1", "DECOMMISSION"]


@dataclass(frozen=True)
class Initiative:
    id: str
    mutates_sor: bool
    has_nhi: bool
    shared_api_key: bool
    tool_count: int
    idempotent_tools: bool
    durable_backbone: bool
    pass5: float | None
    trivial_deterministic_rule: bool
    unapproved_pii: bool


def triage_initiative(item: Initiative) -> tuple[str, Action, list[str]]:
    alerts: list[str] = []
    if item.trivial_deterministic_rule:
        return ("N1", "DECOMMISSION", ["ANTIPATTERN:LLM_FOR_EVERYTHING"])

    if item.unapproved_pii or item.shared_api_key:
        alerts.append("BLOCKER_G1:SHADOW_AI_OR_SHARED_SECRET")
        if item.mutates_sor:
            return ("N1", "QUARANTINE_L1", alerts)

    if item.tool_count > 12:
        alerts.append(f"ANTIPATTERN:GOD_AGENT({item.tool_count}_TOOLS)")
    if item.mutates_sor and (not item.idempotent_tools or not item.has_nhi):
        alerts.append("BLOCKER_G2:MISSING_NHI_OR_IDEMPOTENCY")
        return ("N1", "QUARANTINE_L1", alerts)

    if not item.durable_backbone or item.pass5 is None or item.pass5 < 0.95:
        alerts.append("GAP_G3:NEEDS_DURABLE_RUNTIME_AND_PASS5")
        return ("N2", "REMEDIATE", alerts)

    return ("N2", "REMEDIATE", alerts) if alerts else ("N3_READY", "PROMOTE", ["OK"])
```

---

## 3.4 Trajectoire de migration incrémentale et jalons de gouvernance

Pour assainir l'existant sans pousser les métiers vers la clandestinité par un moratoire aveugle, la migration s'exécute en **quatre vagues trimestrielles articulées autour des portes `G1` à `G4`**, en offrant des briques mutualisées plus rapides à adopter que le développement sauvage :

1. **Vague 1 (Semaines 1–6) — Porte `G1` (Visibilité & Confinement)** : Amnistie déclarative de 30 jours couplée au routage obligatoire du trafic LLM sortant vers la passerelle d'observation. À J+45, révocation des clés personnelles et mise en quarantaine lecture seule (`QUARANTINE_L1`) des initiatives mutatives non conformes.
2. **Vague 2 (Mois 2–4) — Porte `G2` (Socle `N3` & Façades `MCP`)** : Livraison par l'équipe plateforme des premiers serveurs `MCP` d'entreprise (ERP, CRM, ITSM, façades patrimoniales) intégrant `OAuth 2.1 OBO`, registres d'idempotence et disjoncteurs *Bulkhead*. Passage obligatoire sur épine dorsale durable.
3. **Vague 3 (Mois 5–8) — Porte `G3` (Maillage `N4` & Bascule `HOTL`)** : Publication des `Agent Cards A2A v1.0`, validation CI/CD \(\text{pass}^5 \ge 0,95\), exécution fantôme comparée aux décisions humaines pendant quinze jours puis ouverture du mode `HOTL` piloté au *Cost-per-Outcome*.
4. **Vague 4 (Mois 9–12+) — Porte `G4` (Fédération B2B `N5` ciblée)** : Ouverture sélective en `DMZ` `mTLS` vers les partenaires stratégiques sous mandats plafonnés et coupe-circuits bilatéraux.

La condition sine qua non d'adhésion des équipes logicielles à ces quatre portes réside dans l'ingénierie d'un **chemin pavé (*Golden Path*)** : le portail interne développeur ne se contente pas d'édicter des interdits ; il génère en quelques minutes un squelette de service pré-câblé incluant l'identité `SPIFFE`, le client `agentgateway`, l'instrumentation `OpenTelemetry gen_ai.*`, l'enveloppe `ActionEnvelope` et le harnais de test CI/CD \(\text{pass}^5\). Lorsque la conformité `N3` devient techniquement l'option de moindre effort, l'incitation au contournement clandestin disparaît d'elle-même. En exploitation, cette homologation demeure révocable en temps réel : si la télémétrie continue relève un recul du taux d'acceptation des gardes ou une alerte `OWASP ASI`, la passerelle applique une **rétrogradation dynamique d'autonomie** abaissant instantanément le plafond de `L3` (`HOTL`) vers `L2` (`HITL`) ou `L1` sans redéploiement applicatif.

#### Extrait 3.3 — Politique déterministe `Cedar` automatisant la Porte `G2` dans le pipeline CI/CD

```cedar
permit (
    principal is Fabric::CiPipeline,
    action == Fabric::Action::"PromoteToProd",
    resource is Fabric::AgentRelease
)
when {
    resource.inRegistry == true &&
    resource.toolCount <= 12 &&
    (
        resource.autonomyLevel == "L1" ||
        (
            resource.hasSpiffeId == true &&
            resource.usesDurableBackbone == true &&
            resource.mutativeToolsIdempotent == true &&
            resource.sorReadinessScore >= 50 &&
            resource.pass5Permille >= 950
        )
    )
};

forbid (
    principal,
    action == Fabric::Action::"PromoteToProd",
    resource is Fabric::AgentRelease
)
when {
    resource.usesSharedApiKey == true ||
    (resource.touchesPii == true && resource.efvpApproved == false)
};
```

::: {.encadre-sectoriel title="Groupes Industriels et Croissance Externe (M&A) — Intégrer des filiales hétérogènes par fédération N4 plutôt que par refonte ERP"}

Lors d'acquisitions industrielles successives, harmoniser `SAP S/4HANA` à la maison mère avec `NetSuite` ou un ERP spécialisé dans les filiales acquises réclame classiquement trois à cinq ans de migration lourde. L'architecture de niveau **N4** offre une voie d'intégration post-fusion en huit semaines : le système de la nouvelle filiale est encapsulé derrière un serveur `MCP` dédié et un *Agent Spécialiste de Filiale* exposant les contrats canoniques `A2A v1.0` du groupe (disponibilité stock, commande interne, garantie). Les synergies opérationnelles inter-sociétés sont captées dès le premier trimestre sous gouvernance `N3`/`N4`, sans attendre l'unification comptable pluriannuelle.

:::

---

## 3.5 Application au fil rouge : rationalisation des 47 pilotes dispersés du Groupe Boréal

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Cartographie et rationalisation des 47 pilotes dispersés vers une feuille de route N1 à N4"}

**Diagnostic initial (Décembre 2026)** :
En activant la **Porte `G1`** (amnistie déclarative de trois semaines et inspection DNS/TLS sortante) sur le périmètre des 14 500 employés et 6,8 G\$ CAD d'activité du **Groupe Boréal Inc.**, l'équipe d'architecture recense **47 initiatives dites agentiques** réparties entre **Boréal Équipements & Logistique (`BEL`, 14)**, **Boréal Capital & Assurances (`BCA`, 11)**, **Boréal Services Numériques (`BSN`, 18)** et les fonctions centrales (4), dont **19 *Shadow Agents*** non déclarés. La maturité effective du groupe plafonne à **N1,4**.

**Verdict du triage architectural (Janvier 2027)** :
L'application systématique du diagnostic *Brownfield* (Extrait 3.1) et de l'algorithme de triage (Extrait 3.2) produit quatre décisions entérinées par la direction générale :

1. **14 initiatives décommissionnées (`DECOMMISSION` — 30 %)** : Neuf cas d'*Agent-Washing* (barèmes de remises et routages postaux recodés en tables `DMN` en trois jours pour un coût d'exécution divisé par 4 000) et cinq assistants non conformes, dont l'assistant RH lisant des dossiers `Loi 25` via un compte partagé.
2. **11 initiatives confinées en lecture seule (`QUARANTINE_L1` — 23 %)** : Dont le prototype d'achat responsable des 41 000 \$ CAD engloutis en onze heures de boucle `HTTP 429` et trois agents écrivant sans garde vers l'`IBM i` de BCA (\(S_{\text{ready}} = 38/100\) avant façade).
3. **15 initiatives consolidées (`REMEDIATE` — 32 %)** : Dix-huit connecteurs redondants sont fusionnés en **9 serveurs `MCP` officiels** derrière `agentgateway` (élevant notamment l'`IBM i` de BCA à \(S_{\text{ready}} = 57,75\) grâce au registre externe d'idempotence et au *Bulkhead* limité à 8 appels simultanés). Deux *God Agents* de soutien (31 et 28 outils) sont scindés en spécialistes bornés (\(\le 9\) outils).
4. **7 flux phares promus vers `N3` \(\rightarrow\) `N4` (`PROMOTE` — 15 %)** : Concentration de 80 % des investissements 2027 sur sept sagas à fort rendement prouvé, incluant la maintenance prédictive inter-divisions (Chapitre 1) et le diagnostic borné sous contrôle `BSIF E-23` (Chapitre 2).

**Impact vérifié à T+90 jours (Fin T1 2027)** :
Économie récurrente de **620 000 \$ CAD/an** en licences redondantes et fuites de jetons ; **100 % des agents actifs** munis d'identités `SPIFFE` nominatives ; pré-audit interne `BSIF E-23` validé avant l'échéance du 1er mai 2027 ; progression de l'indice groupe de **N1,4 à N3,1**, prête pour le déploiement protocolaire de la **Partie II**.

:::

---

## 3.6 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-003 — Adoption d'un portail d'homologation gradué par niveau de maturité et d'exposition"}

* **Statut** : Acceptée | **Périmètre** : Groupe Boréal (Toutes divisions et filiales) | **Révision** : Semestrielle
* **Contexte** : La dispersion de 47 initiatives non gouvernées exposait le groupe à des infractions `Loi 25` et `BSIF E-23`, à une dette \(M \times N\) de connecteurs et à des dérives FinOps, tandis qu'un comité bureaucratique uniforme pour de simples essais `L1` encouragerait la clandestinité.
* **Options évaluées** :
  1. *Autonomie départementale sans registre central* : **Rejetée** — perpétue le *Shadow Sprawl* et interdit toute fédération `A2A` sûre.
  2. *Validation manuelle mensuelle identique de `L0` à `L4`* : **Rejetée** — goulot d'étranglement paralysant l'expérimentation saine.
  3. *Portail d'homologation gradué par portes automatisées (`G1`–`G4`)* : Enregistrement léger automatisé en 24 h pour les bacs à sable lecture seule (`L1` hors données sensibles), et vérification bloquante en CI/CD (`Cedar`) dès qu'un agent requiert des mutations (`L2+`), l'accès à des données réglementées ou un maillage inter-domaines (`N3`/`N4`). **Retenue**.
* **Décision** : Tout actif agentique est inscrit au registre dès `G1`. Aucune promotion en production de niveau `L2` ou supérieur n'est permise sans passage automatisé de la **Porte `G2`** attestant : (a) identité `NHI` dédiée sans secret partagé ; (b) score *Brownfield* \(S_{\text{ready}} \ge 50\) sur chaque système muté ; (c) au plus douze outils `MCP` tous idempotents ; (d) épine dorsale durable et score \(\text{pass}^5 \ge 0,95\).
* **Conséquences** :
  * *Positives* : Éradication de l'IA fantôme mutative, mutualisation industrielle des serveurs `MCP`, conformité continue vérifiable par audit externe.
  * *Négatives / Coûts assumés* : Maintien d'un registre actif, de gabarits `MCP` clés en main et d'un harnais d'évaluation CI/CD dédié.
* **Condition de révision** : Réévaluation semestrielle des pondérations *Brownfield* à mesure de la modernisation du patrimoine applicatif.

:::

### Liste de contrôle de mise en production — Chapitre 3

Avant d'aborder en **Partie II** l'ingénierie détaillée des protocoles d'interopérabilité (`MCP`, `A2A`, `OASF`), confirmez la maîtrise de ces huit jalons :

1. **Couverture réseau `Porte G1`** : L'inspection DNS/TLS sortante atteste-t-elle que 100 % du trafic d'inférence passe par la passerelle d'entreprise et correspond à un agent recensé ?
2. **Suppression des secrets statiques** : Les clés d'API personnelles et comptes génériques découverts lors de l'inventaire ont-ils tous été remplacés par des identités `NHI` dédiées ?
3. **Élimination du vernis agentique** : Les cas d'usage purement déterministes ont-ils été réorientés vers des tables `DMN` ou des API classiques ?
4. **Scission des *God Agents*** : Chaque agent respecte-t-il le plafond de douze outils cohérents et le principe de séparation des tâches réglementaire ?
5. **Score *Brownfield* homologué** : Chaque *System of Record* ciblé en écriture possède-t-il un manifeste d'aptitude documentant son idempotence, ses fenêtres de gel nocturne et sa capacité maximale ?
6. **Consolidation en façades `MCP`** : Les adaptateurs dupliqués ont-ils été remplacés par un serveur `MCP` officiel par domaine muni d'un disjoncteur *Bulkhead* ?
7. **Plafonnement sobre de la cible** : Le palier visé (`N2`, `N3`, `N4` ou `N5`) est-il justifié par la valeur métier réelle sans sur-ingénierie `N5` inutile ?
8. **Verrouillage `Cedar`/`OPA` en CI/CD** : La **Porte `G2`** bloque-t-elle techniquement toute mise en production dépourvue d'`ÉFVP` `Loi 25` ou d'attestation \(\text{pass}^5 \ge 0,95\) ?
