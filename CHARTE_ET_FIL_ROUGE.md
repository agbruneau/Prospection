# Charte Éditoriale et Dossier Fil Rouge — Compendium 2027

Ce document fixe les règles d'écriture, la structure canonique des chapitres et le dossier d'architecture de l'entreprise fil rouge suivie à travers les **500 pages** (Ouverture, 8 parties, 25 chapitres et 3 annexes) du compendium **« Interopérabilité et Orchestration en Entreprise Agentique »**.

---

## 1. Positionnement et structure canonique d'un chapitre (Format « Hybride exigeant »)

Chaque chapitre est calibré entre **15 et 22 pages imprimées** (format Royal 170 × 240 mm, corps 10 pt) et obéit à une progression invariante destinée à servir simultanément les décideurs technologiques (CIO, CTO, CISO, CDO) et les bâtisseurs (architectes d'entreprise, ingénieurs principaux, responsables AgentOps) :

1. **Synthèse exécutive (`::: {.synthese-executive}`)** *(~1 à 1,5 page en tête de chapitre)* :
   * L'enjeu d'affaires et de risque en trois constats directs.
   * Les décisions architecturales irréversibles vs réversibles que la direction doit arbitrer.
   * Les indicateurs de performance et de gouvernance associés au chapitre.
2. **Corps architectural et ingénierie approfondie** *(~10 à 14 pages)* :
   * Fondements formels, modèles de référence et figures vectorielles (`.svg`).
   * Spécifications protocolaires réelles (`MCP` JSON-RPC 2.0, `A2A v1.0` Agent Cards, `OAuth 2.1 OBO` / `RFC 8693`, conventions `OpenTelemetry gen_ai.*`, politiques `Cedar`/`OPA`, etc.).
   * Patrons de code ou de configuration représentatifs (TypeScript, Python, YAML, Rego/Cedar) illustrant les cas limites de production (idempotence, concurrence, repli, sécurité).
   * Tableaux comparatifs multicritères (latence, coût, auditabilité, maturité, verrouillage).
3. **Fil rouge — Transformation du Groupe Boréal (`::: {.fil-rouge}`)** *(~2 à 3 pages)* :
   * Application concrète et cumulative des concepts du chapitre au système d'information réel du **Groupe Boréal Inc.** (état initial, obstacles rencontrés, architecture déployée, métriques avant/après).
4. **Encadrés sectoriels spécialisés (`::: {.encadre-sectoriel}`)** *(1 à 3 encadrés par chapitre, ~1,5 à 2,5 pages)* :
   * Éclairages ciblés sur des contraintes verticales fortes : institutions financières fédérales (`BSIF E-23`), industrie manufacturière et énergétique (`IT/OT`, `OPC-UA`, sûreté physique), éditeurs `SaaS B2B` multi-locataires, santé ou secteur public (`Loi 25`, `EU AI Act`).
5. **Décision d'architecture normative (`::: {.adr}`)** *(~1 page)* :
   * Une fiche **Architecture Decision Record (`ADR-0XX`)** complète par chapitre (Contexte, Options évaluées, Décision retenue, Conséquences positives/négatives et Conditions de révision).
6. **Points de contrôle de mise en production** *(~0,5 à 1 page)* :
   * Liste resserrée de vérifications concrètes avant homologation en production.

---

## 2. Normes linguistiques et typographiques

* **Langue** : Français canadien soutenu, précis et direct, sans remplissage ni formules passe-partout.
* **Terminologie technique** : Les acronymes normatifs, noms de protocoles, primitives logicielles et identifiants de code restent en anglais dans des blocs ou balises de code (`MCP`, `A2A`, `Agent Card`, `Streamable HTTP`, `On-Behalf-Of`, `KV-cache`, `Human-on-the-Loop`, `Cost-per-Outcome`). Les concepts généraux disposent de leur équivalent français naturel (infonuagique, bac à sable, coupe-circuit, courtier d'événements, passerelle, jumeau numérique).
* **Rigueur épistémique** : Toute affirmation distingue les standards et produits **vérifiés en production fin 2026** des **projections ou échéances réglementaires 2027** (`BSIF E-23` au 1er mai 2027, `EU AI Act` Annexe III en décembre 2027).
* **Monnaie et formules** : Les montants monétaires en prose échappent systématiquement le symbole dollar (`\$`) et Pandoc compile avec l'extension `-tex_math_dollars` pour éviter toute collision typographique; les expressions mathématiques utilisent la notation délimitée standard ou Unicode propre.

---

## 3. Dossier d'Architecture de l'Entreprise Fil Rouge : **Groupe Boréal Inc.**

Afin d'ancrer les 25 chapitres dans la complexité réelle d'une grande organisation patrimoniale et multi-juridictionnelle (*brownfield*), le compendium suit la transformation de **Groupe Boréal Inc.** entre le dernier trimestre 2026 et la fin de l'exercice 2027.

### 3.1 Profil corporatif et empreinte géographique
* **Raison sociale (fictive)** : Groupe Boréal Synergie Inc.
* **Siège social** : Montréal (Québec, Canada).
* **Effectif et taille** : 14 500 employés, chiffre d'affaires consolidé de 6,8 G\$ CAD.
* **Juridictions d'opération** :
  * *Canada* (Québec, Ontario, Alberta) — soumis à la **Loi 25** au Québec et, pour sa filiale financière, à la supervision fédérale du **BSIF (OSFI)** dont la ligne directrice **E-23** révisée entre en vigueur le **1er mai 2027**.
  * *États-Unis* (côte Est et Midwest) — soumis aux cadres sectoriels américains et aligné sur le **NIST AI RMF**.
  * *Union européenne* (France, Allemagne, Benelux) — soumis au **RGPD** et à l'**EU AI Act** (obligations de transparence de l'article 50 actives depuis août 2026; échéance haut risque de décembre 2027).

### 3.2 Les trois divisions opérationnelles ( terrains d'application complémentaires )

| Division | Activité métier | Patrimoine applicatif et industriel (*Systems of Record*) | Enjeux agentiques majeurs dans le compendium |
|---|---|---|---|
| **1. Boréal Équipements & Logistique (BEL)** | Conception, usinage et distribution d'équipements électromécaniques lourds (4 usines, 9 centres logistiques) | `SAP S/4HANA` (+ `SAP Joule`), `Siemens Opcenter` MES, automates `OPC-UA` / `MQTT`, jumeaux numériques d'atelier, courtiers `Kafka` et `Solace`, flux `EDI X12` | Convergence `IT/OT`, sûreté physique par jumeau numérique, sagas logistiques à compensation, négociation d'approvisionnement B2B (`A2A` + `AP2`/`x402`) |
| **2. Boréal Capital & Assurances (BCA)** | Crédit-bail d'équipements industriels, financement structuré et assurance bris de machine (entité réglementée BSIF) | Cœur central patrimonial `IBM i (AS/400)` sans API REST moderne, `Guidewire`, `Workday`, `Microsoft Entra ID`, lac de données `Snowflake` | Conformité stricte `BSIF E-23` et `Loi 25`, exécution durable multi-jours (`Temporal`), automatisation d'écrans sans API (`CUA` + `UiPath Maestro`), délégation `OAuth 2.1 OBO` et approbation `CIBA` |
| **3. Boréal Services Numériques (BSN)** | Plateforme SaaS B2B de télématique, maintenance prédictive et soutien technique 24/7 pour 22 000 clients industriels | `Salesforce Sales/Service Cloud` (`Agentforce`), `ServiceNow ITSM/FSM`, `Microsoft Copilot Studio` (Teams), cluster Kubernetes GPU/inférence hybride | Fédération des jardins clos SaaS (`MuleSoft Agent Fabric`, `agentgateway`), serveurs `MCP`, interfaces `AG-UI`/`A2UI` et support vocal temps réel `WebRTC`, `OpenTelemetry` et FinOps *Cost-per-Outcome* |

### 3.3 Situation de départ au Chapitre 1 (Diagnostic T4 2026)
* **47 initiatives agentiques recensées** lors d'un audit interne d'urgence (dont 19 non déclarées à la sécurité — *Shadow Agents*).
* **Silos incompatibles** : un incident télématique détecté chez BSN crée un billet `ServiceNow`, mais l'agent `ServiceNow` ne peut ni vérifier la couverture de garantie sur l'`AS/400` de BCA, ni réserver une pièce de rechange dans `SAP S/4HANA` (BEL), ni notifier le directeur de compte dans `Salesforce Agentforce` sans intervention manuelle de trois coordonnateurs humains.
* **Incidents déclencheurs** :
  1. Un agent prototype d'achat a bouclé pendant 11 heures un dimanche suite à une erreur HTTP 429 mal gérée, consommant 41 000 \$ CAD de jetons d'un modèle de raisonnement frontière.
  2. Un assistant interne utilisait un jeton de compte de service partagé disposant d'un accès en lecture élargi à des dossiers RH, soulevant une non-conformité potentielle à la `Loi 25` et aux exigences `BSIF E-23`.
* **Mandat 2027 de l'équipe d'architecture** : concevoir et déployer la **Fabrique Agentique Boréal** (*Boréal Agentic Fabric*), fil conducteur technique des Chapitres 1 à 25.

---

## 4. Conventions des blocs sémantiques Markdown (Filtre `compendium.lua`)

Dans les fichiers `manuscrit/**/*.md`, utiliser les conteneurs clôturés Pandoc suivants pour déclencher la mise en forme native en PDF (Typst) et en HTML5 :

```markdown
::: {.synthese-executive title="Synthèse exécutive — Chapitre X"}
Contenu destiné aux CIO, CTO, CISO et dirigeants métiers...
:::

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Titre de l'étape"}
Récit d'architecture, métriques et résolution concrète chez Groupe Boréal...
:::

::: {.encadre-sectoriel title="Secteur Financier — Titre précis"}
Éclairage vertical spécialisé (Finance, Industrie IT/OT, SaaS B2B, Santé/Public)...
:::

::: {.adr title="ADR-001 — Titre de la décision architecturale"}
**Statut** : Acceptée | **Périmètre** : Entreprise | **Révision** : Semestrielle
...
:::
```
Les alertes GitHub standard (`> [!NOTE]`, `> [!IMPORTANT]`, `> [!TIP]`, `> [!WARNING]`, `> [!CAUTION]`) sont également prises en charge par le pipeline.
