# Chapitre 15 — Fédération des jardins clos SaaS et problème de l'« Orchestrateur d'Orchestrateurs »

::: {.synthese-executive title="Synthèse exécutive — Chapitre 15"}

* **Enjeu stratégique** : En 2027, chaque grand éditeur infonuagique (`Microsoft`, `Salesforce`, `ServiceNow`, `SAP`, `Workday`) commercialise des agents performants sur ses données natives, mais revendique simultanément le plan d'orchestration maître de toute l'entreprise. Céder à l'hégémonie d'un seul studio SaaS sur les processus transverses provoque un triple écueil : dégradation sémantique hors du domaine natif, rupture de la chaîne d'identité nominative et **empilement tarifaire (*tax-stacking*)** où une seule transaction paie des crédits d'actions dans trois suites successives.
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Interdire qu'un progiciel vertical détienne le plan d'orchestration inter-domaines ; confiner chaque studio SaaS au rôle d'**agent spécialiste de domaine** ancré sur sa propre gravité des données.
  2. *Structurante dès le jour 1* : Imposer la propagation d'identité de bout en bout (`OAuth 2.1 On-Behalf-Of` / `RFC 8693` depuis `Microsoft Entra ID` jusqu'à `SAP Cloud Identity Services` et `Salesforce`) et bannir tout compte technique partagé.
  3. *Réversible par conception* : Le choix de l'outillage de courtage iPaaS (`MuleSoft Agent Fabric` ou adaptateurs maison) derrière `agentgateway`, tant que les échanges horizontaux respectent `A2A v1.0` et les schémas canoniques internes.
* **Indicateurs de gouvernance associés** : Indice de localité gravitationnelle (\(\ge 85\,\%\) des appels d'outils exécutés par le spécialiste résident), multiplicateur de crédits SaaS (*SaaS Credit Multiplier* \(\le 1{,}25\)), traçabilité nominative dans les journaux cibles (`100 %`), et boucles circulaires inter-plateformes (`0` en production).

:::

## 15.1 Coexistence d'`Agentforce`, `ServiceNow AI Agents`, `SAP Joule`, `Copilot Studio` et `Workday` : anatomie d'une collision

Entre 2025 et 2027, la stratégie produit des grands éditeurs SaaS a basculé de l'assistance locale vers la conquête du plan de contrôle global. Tous ont lancé des studios multi-agents présentés comme le « système nerveux central » de l'organisation. Prise isolément lors d'une démonstration commerciale, l'idée séduit : pourquoi ne pas laisser l'agent où travaille déjà l'employé piloter directement les API des applications voisines ?

Projetée sur la topologie réelle d'un groupe exploitant cinq suites majeures, cette promesse déclenche une collision frontale. Lorsque les ventes déploient `Salesforce Agentforce`, que l'exploitation IT généralise `ServiceNow AI Agents`, que la finance active `SAP Joule` sur `S/4HANA`, que les ressources humaines protègent les dossiers salariés dans `Workday Illuminate` et que la bureautique déploie `Microsoft Copilot Studio` dans `Teams`, l'organisation n'obtient pas une architecture unifiée : elle hérite de **cinq jardins clos cognitifs concurrents** cherchant chacun à ravaler les quatre autres au rang de simples tables passives.

![Architecture de fédération inter-SaaS gouvernée par gravité des données, propagation d'identité Entra ID ↔ SAP CIS et plan d'arbitrage neutre.](manuscrit/figures/fig-15-federation-saas-fabric.svg)

### Forces natives et angles morts structurels des cinq écosystèmes

1. **`Microsoft Copilot Studio` (`M365` / `Azure AI Foundry`)** : Sa force décisive réside dans l'ubiquité du canal collaboratif (`Teams`, `Outlook`, `Microsoft Graph`) et son couplage natif avec `Microsoft Entra ID`. Il excelle comme **agent d'interface et de médiation (`Archétype 1`)**. En revanche, encoder dans des flux `Copilot Studio` la logique transactionnelle d'un calcul de marge `SAP` ou d'un règlement d'assurance recrée une couche métier fantôme fragile, découplée des règles de validation des *Systems of Record*.
2. **`Salesforce Agentforce` (`Atlas Reasoning Engine` + `Data Cloud`)** : Adossé au graphe client CRM, `Agentforce` brille sur la qualification d'opportunités, les remises commerciales et la rétention. Hors du CRM, deux frictions apparaissent : la fédération *Zero-Copy* subit des latences incompatibles avec le verrouillage transactionnel de stocks, et la facturation en *Flex Credits* par action pénalise lourdement tout flux où `Agentforce` attend passivement le retour d'opérations logistiques tierces.
3. **`ServiceNow AI Agents` (`Now Platform`)** : Adossé à la `CMDB` et aux flux `ITSM`/`CSM`/`FSM`, `ServiceNow` s'impose naturellement sur le triage d'incidents et la coordination d'équipes terrain. Cette légitimité s'arrête toutefois aux frontières des invariants comptables d'un ERP ou des contraintes temps réel d'une usine (`OT`), dont `ServiceNow` ne détient ni l'ontologie fine ni l'intégrité ACID.
4. **`SAP Joule` et `Joule Studio` (`SAP BTP` / `S/4HANA`)** : Ancré dans le `SAP Knowledge Graph` reliant commandes, postes budgétaires et nomenclatures aux services `RAP` et `BAPI`, `Joule` est irremplaçable pour exécuter une mutation financière ou logistique respectant des centaines de contrôles fiscaux. À l'inverse, il constitue un canal généraliste peu ergonomique hors processus ERP, et toute intégration entrante mal gouvernée expose l'entreprise à de lourdes régularisations de licences d'accès indirect (*SAP Digital Access*).
5. **`Workday Illuminate`** : Gardien du dossier maître des employés, des habilitations et de la paie, `Workday` impose un cloisonnement strict. Au titre de la `Loi 25` et du `RGPD`, extraire des fiches RH vers la mémoire d'un orchestrateur tiers est proscrit : seul le spécialiste interne `Workday` doit évaluer l'admissibilité et ne retourner qu'un verdict booléen minimisé.

| Plateforme SaaS | Gravité des données native | Rôle optimal dans la Fabrique | Angle mort hors domaine | Surface d'ouverture (2027) | Piège économique et contractuel |
|---|---|---|---|---|---|
| **Microsoft Copilot Studio** | Bureautique `M365`, courriels, réunions, graphe collaboratif | **Archétype 1** : Interface employé et capture d'intention | Aucune maîtrise des invariants ERP, CRM ou assurances | Client/Serveur `MCP`, `A2A`, `Entra Agent ID` | Consommation rapide de *Copilot Credits* sur boucles longues |
| **Salesforce Agentforce** | Comptes, pipeline commercial, contrats, `Data Cloud` | **Archétype 2** : Spécialiste Revenu et Relation Client | Coût et latence élevés sur sagas logistiques ou industrielles | Façade `A2A v1.0`, outils `MCP` via `MuleSoft` | Taxation unitaire par action même sur appels externes simples |
| **ServiceNow AI Agents** | Incidents, `CMDB`, catalogue IT, techniciens `FSM` | **Archétype 2** : Spécialiste Support IT et Opérations Terrain | Sémantique financière, fiscale et industrielle absente | `AI Agent Fabric` (`A2A` + `MCP`) | Licences *Enterprise* indexées au volume d'orchestrations |
| **SAP Joule (`S/4HANA`)** | Grand livre `FI/CO`, stocks `MM/SD`, achats, production | **Archétype 2** : Spécialiste ERP, Finance et Approvisionnement | Ergonomie transverse limitée hors processus `SAP` | Compétences `A2A` sur `BTP`, serveurs `MCP` `RAP`/`OData` | Requalification en documents *Digital Access* + unités `BTP AI` |
| **Workday Illuminate** | Capital humain, paie, habilitations, organigramme | **Archétype 2** : Spécialiste RH à divulgation minimale | Fermé par conception aux flux commerciaux et industriels | Passerelle `A2A` restreinte et outils `MCP` bornés | Contraintes strictes de résidence et confidentialité PII |

---

## 15.2 Gravité des données (*Data Gravity*) et plans de contrôle neutres (`MuleSoft Agent Fabric`, `agentgateway`, `Temporal`)

Comment désigner qui orchestre quoi sans guerre politique entre directions métiers ni maillage quadratique de \(\frac{N(N-1)}{2}\) intégrations point-à-point ? La réponse repose sur le principe de **gravité des données appliqué au raisonnement agentique**.

En architecture agentique, déplacer des données brutes hors de leur progiciel maître vers un orchestrateur externe détruit trois propriétés vitales : la **gravité ontologique** (les règles implicites codées dans `SAP` ou `Salesforce`), la **gravité sécuritaire** (les permissions fines par ligne et par champ) et la **gravité transactionnelle** (la fraîcheur d'un stock). Pour toute tâche \(t\) sollicitant les domaines \(D_1, \dots, D_m\), on évalue le score d'affinité gravitationnelle envers \(D_k\) par :

\[G(t, D_k) = \alpha\, \mu_k(t) + \beta\, \rho_k(t) + \gamma\, \pi_k(t)\]

où \(\mu_k(t)\) mesure la fraction des écritures ciblant \(D_k\), \(\rho_k(t)\) la part des invariants métiers critiques portés par \(D_k\), et \(\pi_k(t)\) l'indice de confidentialité réglementaire interdisant l'exportation des attributs hors de \(D_k\) (\(\alpha + \beta + \gamma = 1\)). Trois règles d'arbitrage déterministes en découlent :

1. **Localité intra-domaine (\(G(t, D_k) \ge 0{,}85\), écriture mono-silo)** : Lorsqu'une tâche opère quasi intégralement dans un seul domaine (ex. requalifier des opportunités et éditer un devis standard dans `Salesforce`), le studio natif (`Agentforce`) l'orchestre localement sans détour externe inutile.
2. **Enrichissement ponctuel en lecture (\(G(t, D_k) \ge 0{,}75\), zéro écriture externe)** : Si un agent `ServiceNow` doit simplement lire un statut de livraison `SAP`, il émet une lecture via `agentgateway` vers le serveur `MCP` `SAP` sans transférer l'orchestration.
3. **Élévation au plan de contrôle neutre (Mutations sur \(\ge 2\) *Systems of Record* ou saga longue)** : Dès qu'un processus modifie au moins deux silos, exige des compensations transactionnelles ou engage une supervision réglementaire (`BSIF E-23`), **aucun studio SaaS n'est autorisé à être l'orchestrateur maître**. La coordination remonte dans le plan neutre de l'entreprise.

### Arbitrage entre les trois topologies de coordination inter-SaaS

| Critère d'ingénierie | Approche A : Studio SaaS élu « Maître » (ex. tout dans `ServiceNow`) | Approche B : Courtier iPaaS Agentique pur (`MuleSoft Agent Fabric` seul) | Approche C (Référence) : Plan Neutre Hybride (`Temporal` + `agentgateway` + iPaaS) |
|---|---|---|---|
| **Indépendance stratégique** | Faible : verrouillage fort des graphes et des tarifs | Moyenne : excellente connectivité, adhérence au fournisseur iPaaS | **Élevée** : état durable et règles de sécurité détenus en propre |
| **Sagas longues & Compensation** | Limitée (expirations de session ou coût de maintien) | Bonne sur flux courts ; moins native sur sagas de plusieurs semaines | **Optimale** : journalisation déterministe, mise en veille gratuite et `Saga` |
| **Connectivité certifiée ERP/CRM** | Asymétrique envers les éditeurs concurrents | **Excellente** : connecteurs certifiés `SAP`, `Salesforce`, `Workday` | **Excellente** : réutilise les adaptateurs certifiés iPaaS comme transport |
| **Maîtrise du *Tax-Stacking*** | Mauvaise : le studio maître taxe chaque étape déléguée | Modérée : facturation aux flux/messages gérés | **Optimale** : zéro crédit SaaS brûlé durant l'attente `HOTL` ou l'orchestration |
| **Sécurité temps réel unifiée** | Hétérogène selon les studios | Politiques API classiques + annuaire | **Unifiée** : inspection `MCP`/`A2A`, `Cedar` et anti-boucle dans `agentgateway` |

L'architecture de référence (**Approche C**) conjugue trois briques complémentaires sans confondre plan d'état et plan de transport : **`Temporal`** gouverne l'état durable et les compensations des sagas multi-silos ; **`agentgateway`** agit comme *Policy Enforcement Point* universel (`SPIFFE`, `Cedar`, `OpenTelemetry`) ; et **`MuleSoft Agent Fabric`** (lorsque déjà présent dans le patrimoine iPaaS) est cantonné à son rôle optimal de courtage certifié (*Agent Registry*, *Agent Broker* et connecteurs homologués `SAP`/`Salesforce`/`Workday` avec lissage des quotas `HTTP 429`), exposés sous contrats canoniques `Apache Ossie` sans jamais détenir la logique d'état maîtresse.

| Scénario opérationnel type | Domaines sollicités | Orchestrateur élu | Justification architecturale |
|---|---|---|---|
| Génération d'avenant tarifaire commercial standard | `Salesforce` (95 %), lecture `M365` (5 %) | Local : `Agentforce` | Gravité CRM dominante (\(G = 0{,}95\)), mutation mono-silo |
| Qualification d'alerte IT et redémarrage infonuagique | `ServiceNow` (90 %), logs (10 %) | Local : `ServiceNow AI Agents` | Gravité `CMDB`/`ITSM` native en boucle fermée |
| Régularisation comptable mensuelle `GR/IR` | `SAP S/4HANA` (100 %) | Local : `SAP Joule` | Invariants `FI/CO` exclusifs, zéro exposition externe |
| Retour marchandise : SAV + avoir `SAP` + technicien + note CRM | `ServiceNow` + `SAP` + `Salesforce` | **Plan Neutre (`Temporal`)** | Mutations coordonnées sur 3 silos avec compensation atomique |
| Vérification d'habilitation électrique avant intervention | `ServiceNow` → `Workday` | Délégation `A2A` via `agentgateway` | Confidentialité `Loi 25` (\(\pi = 1\)) : réponse `AUTHORIZED/DENIED` sans PII |

#### Extrait 15.1 — Contrat `A2A v1.0` inter-SaaS normalisé (`ServiceNow` → Plan Neutre → `SAP Joule`)

Ce message JSON-RPC `A2A v1.0` illustre comment une demande d'allocation de pièce de rechange traverse le plan neutre sans exposer aucun champ propriétaire de l'éditeur source :

```json
{
  "jsonrpc": "2.0",
  "id": "a2a-fed-2027-774109",
  "method": "message/send",
  "params": {
    "configuration": {
      "acceptedOutputModes": ["application/json"],
      "blocking": false,
      "pushNotificationConfig": {
        "url": "https://gateway.boreal.ca/callbacks/temporal/saga-88412",
        "authentication": { "schemes": ["Bearer-SPIFFE-SVID"] }
      }
    },
    "message": {
      "role": "user",
      "messageId": "msg-sn-to-sap-0041",
      "contextId": "saga-boreal-rma-2027-88412",
      "parts": [
        {
          "kind": "data",
          "mimeType": "application/vnd.boreal.ossie.spare-allocation.v2+json",
          "data": {
            "idempotencyKey": "saga-88412-sap-alloc-01",
            "canonicalCustomerUri": "urn:boreal:party:cust-ca-qc-10948",
            "serviceOrderRef": "FSM-2027-992014",
            "materialSku": "STATOR-HV-440",
            "quantity": 1,
            "requestedPlant": "CA01-TRV",
            "maxAutoApproveAmountCad": 3500.00
          }
        }
      ],
      "metadata": {
        "x-a2a-origin-platform": "servicenow-prod-ca",
        "x-a2a-target-platform": "sap-joule-s4-prod",
        "x-a2a-hop-vector": "v1:copilot-m365->temporal-core->servicenow-fsm",
        "x-finops-remaining-budget-cad": 0.85,
        "traceparent": "00-9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d-1122334455667788-01"
      }
    }
  }
}
```

### Résolution d'identités maîtres (`MDM`), contre-pression asymétrique et compensation inter-silos

Au-delà de l'enveloppe protocolaire `A2A v1.0`, l'opérabilité quotidienne du plan neutre repose sur le traitement explicite de trois frictions structurelles souvent occultées lors des preuves de concept :

* **Désalignement des clés d'entités maîtres (*Cross-SaaS Master Data Drift*)** : Un même client industriel porte simultanément un identifiant `0018Z00002xK9a` dans `Salesforce`, un numéro de partenaire `BP-1004982` dans `SAP S/4HANA` et un enregistrement société `a8f39c11` dans `ServiceNow`. Si un agent `ServiceNow` transmet son identifiant interne brut à `SAP Joule`, la délégation échoue ou déclenche une recherche floue par nom commercial sujette aux homonymies désastreuses (facturer la filiale américaine d'un groupe au lieu de sa filiale canadienne). La couche de médiation (`MuleSoft Agent Fabric` adossée au graphe de référence `Apache Ossie`) résout systématiquement l'URI canonique (`urn:boreal:party:cust-ca-qc-10948`) vers la clé primaire exacte du silo destinataire avant même que le modèle cible ne soit sollicité.
* **Asymétrie sévère des quotas d'API (`HTTP 429` et *Governor Limits*)** : Alors qu'un cluster Kubernetes interne encaisse aisément 2 000 requêtes par seconde, les tenants SaaS appliquent des plafonds stricts et hétérogènes (*Salesforce Concurrent API Limits*, *ServiceNow Semaphore Pools*, *Workday Tenant Rate Limits*). Lors d'une reprise d'activité ou d'un incident majeur touchant 800 équipements connectés simultanément, laisser un orchestrateur déverser 800 délégations parallèles sature les sémaphores `ServiceNow` et paralyse l'interface web des opérateurs humains. Le plan neutre place donc devant chaque connecteur SaaS une **file à seau percé (*Token Bucket*) par priorité métier**, garantissant qu'au moins 40 % de la capacité d'API du tenant demeure sanctuarisée en tout temps pour le trafic interactif humain.
* **Compensation sémantique dans les sagas multi-SaaS** : Aucun protocole de validation à deux phases (`2PC` / `XA`) n'existe ni ne doit exister entre `Salesforce`, `ServiceNow` et `SAP`. Lorsqu'une saga en trois étapes réserve d'abord une pièce dans `SAP` (Étape 1 réussie), affecte un technicien dans `ServiceNow` (Étape 2 réussie), puis échoue sur la mise à jour contractuelle dans `Salesforce` à cause d'un blocage de crédit client (Étape 3 rejetée), l'orchestration `Temporal` déroule automatiquement les **actions compensatoires inverses** déclarées dans le registre (`annuler affectation FSM` puis `libérer réservation MM` via `sap_release_spare_part_reservation`), ramenant l'ensemble des jardins clos à une cohérence globale éventuelle vérifiée.
* **Gouvernance du versionnement asynchrone des éditeurs SaaS (*Release Wave Isolation*)** : Contrairement aux microservices internes dont l'entreprise maîtrise le calendrier de déploiement, `Salesforce` (trois versions majeures annuelles), `ServiceNow` (cycles semestriels *Washington/Xanadu/Yokohama/Zurich*) et `Workday` mettent à jour leurs moteurs d'agents selon leur propre calendrier imposé. En publiant dans l'annuaire fédéré `OASF` des `Agent Cards` internes versionnées sémantiquement (`v2.1`, `v2.2`) derrière `MuleSoft Agent Fabric`, l'équipe plateforme teste en bac à sable chaque vague de mise à jour éditeur sur une batterie d'évaluations de régression avant de basculer le routage du plan neutre, isolant ainsi totalement les autres divisions des changements de comportement d'un studio tiers.

---

## 15.3 Propagation d'identité fédérée (`Entra ID` → `SAP CIS` / `Salesforce`) et prévention des boucles circulaires

Deux défaillances techniques ruinent en production les architectures multi-SaaS : l'usage de comptes techniques génériques qui écrasent l'identité humaine, et l'emballement circulaire d'agents réagissant aux webhooks des plateformes voisines.

### Propagation nominative de bout en bout : éliminer le compte d'intégration partagé

Connecter un agent `Copilot Studio` ou `ServiceNow` à `SAP S/4HANA` via un compte statique unique (`SVC_AI_INTEGRATION`) constitue en 2027 un motif de blocage immédiat :

1. **Escalade de privilèges (*Confused Deputy*)** : Un vendeur limité au Québec pourrait demander à l'agent de modifier un compte européen sous l'autorité élargie du compte de service.
2. **Perte d'imputabilité (`BSIF E-23`, `SOX`, `Loi 25`)** : Dans les tables comptables `SAP` (`BKPF`, `CDHDR`), toutes les écritures portent la signature de `SVC_AI_INTEGRATION`, rendant indémontrable la séparation des tâches (*Segregation of Duties*).
3. **Exposition majeure en audit de licences ERP** : Multiplexer des milliers d'employés derrière un compte technique unique sans traçabilité d'utilisateur nommé (*Named User*) déclenche des redressements sévères au titre de l'accès indirect.

La solution consiste à chaîner **`OAuth 2.1 On-Behalf-Of (OBO)` (`RFC 8693`)** depuis `Microsoft Entra ID` jusqu'aux systèmes d'autorisation internes de chaque SaaS, incluant **`SAP Cloud Identity Services (CIS)`** pour la *Principal Propagation* vers le noyau `ABAP` :

* Vers **`Salesforce Agentforce`**, l'échange `RFC 8693` produit un jeton mappé par `FederationIdentifier` sur le profil exact de l'employé, restreint à la portée minimale de la tâche (`sf:agent:quote_read`).
* Vers **`SAP Joule` / `S/4HANA`**, `agentgateway` échange le jeton `Entra ID` auprès de `SAP CIS` en présentant dans `actor_token` le `JWT-SVID` cryptographique signé par `SPIRE` de l'agent appelant, puis `SAP Cloud Connector` convertit l'assertion en certificat court `X.509` vers `S/4HANA`. La transaction s'exécute sous le véritable `SY-UNAME` de l'employé (ex. `MTREMBLAY`), respectant ses objets d'autorisation `M_BEST_WRK` tout en journalisant l'acteur agentique vérifié.
* **Révocation synchrone inter-SaaS (`CAE` / `Shared Signals Framework`)** : Lorsqu'un changement de poste ou une fin d'emploi est enregistré dans `Workday`, un signal `OpenID SSF` (*CAEP / RISC*) est émis vers `Entra ID` et `agentgateway`. Toute saga asynchrone de longue durée (`Régime T4`) initiée trois jours plus tôt par ce collaborateur voit son renouvellement `OBO` immédiatement refusé lors de son réveil, empêchant toute écriture posthume dans `SAP` ou `Salesforce` et routant proprement le dossier en cours vers le gestionnaire hiérarchique successeur.

#### Extrait 15.2 — Courtier TypeScript d'échange `RFC 8693` (`Entra ID` → `SAP CIS` avec *Principal Propagation*)

```typescript
export interface FederatedTokenResult {
  readonly accessToken: string;
  readonly expiresAtEpochSec: number;
  readonly resolvedHumanPrincipal: string;
  readonly grantedScopes: ReadonlyArray<string>;
}

export class CrossSaasOboBroker {
  constructor(
    private readonly entraTokenEndpoint: string,
    private readonly sapCisTokenEndpoint: string,
    private readonly gatewayClientAssertionJwt: () => Promise<string>
  ) {}

  public async exchangeEntraToSapCis(
    incomingSubjectJwt: string,
    callerAgentJwtSvid: string,
    requiredSapScopes: ReadonlyArray<string>
  ): Promise<FederatedTokenResult> {
    // 1. Échange OBO sur STS Entra ID vers l'audience fédérée SAP CIS
    const entraBody = new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      requested_token_use: "on_behalf_of",
      client_assertion_type:
        "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_assertion: await this.gatewayClientAssertionJwt(),
      subject_token: incomingSubjectJwt,
      subject_token_type: "urn:ietf:params:oauth:token-type:access_token",
      audience: "api://boreal-sap-cis-federation",
      scope: "openid profile email sap.principal.propagate"
    });

    const entraRes = await fetch(this.entraTokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: entraBody.toString()
    });
    if (!entraRes.ok) {
      throw new Error("OBO_ENTRA_REJECTED:" + String(entraRes.status));
    }
    const bridge = (await entraRes.json()) as { access_token: string };

    // 2. Échange RFC 8693 sur SAP CIS avec JWT-SVID SPIFFE signé en actor_token
    const sapBody = new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      client_assertion_type:
        "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_assertion: await this.gatewayClientAssertionJwt(),
      subject_token: bridge.access_token,
      subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
      actor_token: callerAgentJwtSvid,
      actor_token_type: "urn:ietf:params:oauth:token-type:jwt",
      resource: "urn:sap:s4hana:boreal-prod-ca01",
      scope: requiredSapScopes.join(" ")
    });

    const sapRes = await fetch(this.sapCisTokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: sapBody.toString()
    });
    if (!sapRes.ok) {
      throw new Error("SAP_CIS_PROPAGATION_DENIED:" + String(sapRes.status));
    }

    const data = (await sapRes.json()) as {
      access_token: string;
      expires_in: number;
      scope: string;
      sap_user_alias: string;
    };
    return {
      accessToken: data.access_token,
      expiresAtEpochSec: Math.floor(Date.now() / 1000) + data.expires_in,
      resolvedHumanPrincipal: data.sap_user_alias, // SY-UNAME exact dans S/4HANA
      grantedScopes: data.scope.split(" ")
    };
  }
}
```

### Prévention déterministe des boucles circulaires inter-plateformes

Les boucles distribuées (\(A \to B \to C \to A\)) surgissent lorsque des agents autonomes croisent des webhooks de modification de données (*Change Data Capture*) : `Agentforce` modifie la priorité d'un dossier, ce qui alerte `ServiceNow`, qui demande un recalcul de délai ATP à `SAP Joule` ; `S/4HANA` publie alors l'événement `SalesOrder.Changed`, réveillant à nouveau `Agentforce` dans une nouvelle session où un simple compteur applicatif `hop_count` repartirait à zéro.

Pour éradiquer ces tempêtes d'appels circulaires, `agentgateway` combine trois barrières déterministes :

* **Vecteur d'origine signé (`x-a2a-hop-vector`)** : Chaque nœud traversé est ajouté à un vecteur signé par HMAC-SHA256 avec une clé secrète de la passerelle, vérifié en temps constant après contrôle strict de longueur d'octets. Si la cible demandée figure déjà parmi les ancêtres du vecteur ou si le budget résiduel ne décroît pas strictement, la requête est rejetée en moins d'une milliseconde (`409 LOOP_DETECTED`).
* **Disjoncteur d'oscillation par entité métier (avec déduplication de livraison)** : Comme les bus SaaS (*Salesforce Platform Events*, *SAP Event Mesh*) livrent leurs webhooks selon une sémantique *at-least-once*, la passerelle déduplique d'abord les réessais réseau légitimes par `eventId` avant de comptabiliser les mutations distinctes par identifiant canonique (`urn:boreal:order:SO-99182`) sur une fenêtre glissante de 120 secondes, basculant l'entité en quarantaine `HOTL` au-delà de trois réévaluations rapides.
* **Marquage d'origine dans les champs techniques des *Systems of Record*** : Pour éviter même le premier rebond inutile d'un webhook `CDC`, chaque écriture effectuée par un spécialiste pour le compte d'une saga renseigne un attribut technique dédié (`LastModifiedByAgentSagaId`). Les règles de déclenchement sortant de `Salesforce` (*Platform Events*), `ServiceNow` (*Business Rules*) et `SAP` (*Event Mesh*) filtrent en amont toute mutation portant déjà l'identifiant d'une saga active, coupant à la source 95 % du bruit événementiel parasite.

#### Extrait 15.3 — Garde-fou anti-boucle par vecteur signé et détection d'oscillation (`agentgateway`)

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

export interface HopEntry {
  readonly nodeId: string;
  readonly timestampMs: number;
}

export interface CorrelationVectorHeader {
  readonly sagaId: string;
  readonly canonicalEntityUri: string;
  readonly remainingBudgetCad: number;
  readonly hops: ReadonlyArray<HopEntry>;
  readonly signatureHex: string;
}

export interface HopInspectionResult {
  readonly header: CorrelationVectorHeader;
  readonly deduplicatedReplay: boolean;
}

export class CrossPlatformLoopGuard {
  private readonly seenEventIds = new Map<string, number>();
  private readonly entityTouchWindow = new Map<string, number[]>();

  constructor(
    private readonly gatewaySecret: Buffer,
    private readonly maxHops: number = 6,
    private readonly maxTouchesPerTwoMin: number = 3
  ) {}

  public inspectAndAppendHop(
    hdr: CorrelationVectorHeader,
    eventId: string,
    nextNodeId: string,
    hopCostCad: number
  ): HopInspectionResult {
    const expected = this.sign(
      hdr.sagaId,
      hdr.canonicalEntityUri,
      hdr.remainingBudgetCad,
      hdr.hops
    );
    const provided = Buffer.from(hdr.signatureHex, "hex");
    if (
      provided.byteLength !== expected.byteLength ||
      !timingSafeEqual(provided, expected)
    ) {
      throw new Error("SECURITY_VIOLATION: Invalid x-a2a-hop-vector signature");
    }

    const now = Date.now();
    for (const [id, ts] of this.seenEventIds) {
      if (now - ts >= 120_000) this.seenEventIds.delete(id);
    }
    if (this.seenEventIds.has(eventId)) {
      return { header: hdr, deduplicatedReplay: true };
    }

    if (hdr.hops.length >= this.maxHops) {
      throw new Error("LOOP_GUARD_MAX_HOPS_EXCEEDED:" + hdr.sagaId);
    }
    if (hdr.hops.some((h) => h.nodeId === nextNodeId)) {
      const path = hdr.hops.map((h) => h.nodeId).join("->") + "->" + nextNodeId;
      throw new Error("CIRCULAR_SAAS_LOOP_DETECTED:" + path);
    }

    const nextBudget = Number((hdr.remainingBudgetCad - hopCostCad).toFixed(4));
    if (hopCostCad <= 0 || nextBudget < 0) {
      throw new Error("FINOPS_BUDGET_EXHAUSTED:" + hdr.sagaId);
    }

    const prevTouches = this.entityTouchWindow.get(hdr.canonicalEntityUri) ?? [];
    const recent = prevTouches.filter((t) => now - t < 120_000);
    if (recent.length >= this.maxTouchesPerTwoMin) {
      throw new Error("WEBHOOK_OSCILLATION_CIRCUIT_OPEN:" + hdr.canonicalEntityUri);
    }
    this.seenEventIds.set(eventId, now);
    recent.push(now);
    this.entityTouchWindow.set(hdr.canonicalEntityUri, recent);

    const updatedHops = [...hdr.hops, { nodeId: nextNodeId, timestampMs: now }];
    const nextSig = this.sign(
      hdr.sagaId,
      hdr.canonicalEntityUri,
      nextBudget,
      updatedHops
    ).toString("hex");

    return {
      header: {
        sagaId: hdr.sagaId,
        canonicalEntityUri: hdr.canonicalEntityUri,
        remainingBudgetCad: nextBudget,
        hops: updatedHops,
        signatureHex: nextSig
      },
      deduplicatedReplay: false
    };
  }

  private sign(
    sagaId: string,
    entity: string,
    budget: number,
    hops: ReadonlyArray<HopEntry>
  ): Buffer {
    const hopChain = hops
      .map((h) => h.nodeId + "@" + String(h.timestampMs))
      .join(",");
    const raw = `${sagaId}|${entity}|${budget.toFixed(4)}|${hopChain}`;
    return createHmac("sha256", this.gatewaySecret).update(raw, "utf8").digest();
  }
}
```

---

## 15.4 Éclairages sectoriels : fusions-acquisitions et gouvernance FinOps des licences SaaS

::: {.encadre-sectoriel title="Fusions-Acquisitions Multinationales (M&A) — Fédérer en 90 jours deux empires SaaS hétérogènes"}

Lorsqu'un groupe industriel acquiert un concurrent international, fusionner les instances `SAP S/4HANA` / `Salesforce` de l'acquéreur avec l'`Oracle Fusion ERP` / `Dynamics 365` de la cible exige de vingt-quatre à trente-six mois. Durant cette attente, les synergies commerciales et la mutualisation des stocks restent habituellement gelées.

La fédération `A2A v1.0` sous plan de contrôle neutre débloque un patron d'**intégration M&A « Jour 90 » sans migration préalable des bases** :

1. La filiale acquise conserve ses *Systems of Record* intacts mais publie en six semaines trois spécialistes `A2A` alignés sur les schémas canoniques du groupe (`Stock Filiale`, `Crédit Client`, `Billet SAV`), tout en isolant ses propres règles fiscales et tarifaires historiques derrière cette façade.
2. Une fiducie *Cross-Tenant* (`Entra ID B2B Direct Connect` ou OIDC fédéré) relie les identités sans fusionner brutalement les annuaires Active Directory, ce qui préserve le cloisonnement réglementaire durant les audits post-clôture.
3. Dès le quatre-vingt-dixième jour, le plan neutre interroge en parallèle le spécialiste `SAP` historique et le spécialiste `Oracle` de la nouvelle filiale, livrant une expérience client et logistique unifiée deux ans avant l'éventuelle convergence ERP. Lorsque la migration finale de la filiale vers `SAP S/4HANA` a finalement lieu dix-huit mois plus tard, la bascule s'effectue en mettant simplement à jour l'URL cible de l'`Agent Card` dans le registre `OASF`, sans réécrire une seule ligne dans les agents appelants du reste du groupe.

:::

::: {.encadre-sectoriel title="Gouvernance FinOps & Licences — Déjouer le piège de la triple taxation inter-SaaS"}

Contrairement aux API REST classiques, les studios agentiques SaaS facturent des **unités propriétaires** (*Copilot Credits*, *Flex Credits*, *ServiceNow Assists*, *SAP AI Units*). Si `Copilot Studio` (Taxe 1) délègue l'orchestration à `ServiceNow` (Taxe 2), qui sollicite `Agentforce` (Taxe 3) puis `SAP Joule` (Taxe 4 + exposition *Digital Access*), une simple vérification coûtant 0,03 \$ CAD d'inférence réelle finit facturée **entre 3,80 \$ CAD et 6,50 \$ CAD**.

Trois règles neutralisent cet empilement :

* **Privilégier `MCP` sur API standard pour le déterministe** : Pour lire trois champs ou bloquer un article codifié, le plan neutre invoque un serveur `MCP` adossé à l'API standard incluse au contrat de base, réservant l'appel `A2A` vers `Joule` ou `Agentforce` aux seules tâches exigeant un raisonnement métier complexe.
* **Exiger des tarifs « Headless A2A » décotés** lors des renouvellements contractuels pour les appels machine-à-machine pré-qualifiés, assortis de la portabilité annuelle des crédits non consommés.
* **Surveiller le *SaaS Credit Multiplier*** et déclencher une alerte FinOps dès qu'un flux dépasse 1,25 fois le coût de l'étape principale.

:::

---

## 15.5 Application au fil rouge : pacification des suites SaaS chez Groupe Boréal

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Fédération de Copilot Studio, Agentforce, ServiceNow, SAP Joule et Workday"}

**Impasse politique et technique initiale (T1 2027)** :
Au lancement du lot transversal de la **Fabrique Agentique Boréal** (14 500 employés, 6,8 G\$ CAD), chaque division défend son studio éditeur comme plan maître :

* Les ventes de **Boréal Services Numériques (BSN)** veulent que `Salesforce Agentforce` pilote directement les ordres `ServiceNow`, les garanties `Guidewire` de **Boréal Capital & Assurances (BCA)** et les avoirs dans `SAP S/4HANA`.
* Les opérations terrain de **BSN** veulent ériger `ServiceNow AI Agents` en tour de contrôle unique lisant les dossiers d'habilitation électrique des techniciens dans `Workday`, au mépris de la **Loi 25** et de la ligne directrice **BSIF E-23** applicable à **BCA**.
* La finance de **Boréal Équipements & Logistique (BEL)** refuse tout accès externe hors `SAP Joule` et chiffre à **1,4 M\$ CAD** le risque de redressement *SAP Digital Access* lié aux comptes techniques partagés. Un prototype reliant directement `ServiceNow` et `Salesforce` venait en outre de brûler 18 500 crédits en quarante minutes lors d'une tempête de webhooks croisés.

**Architecture déployée sous `ADR-015` (T2 2027)** :

1. **`Microsoft Copilot Studio`** devient l'unique canal conversationnel interne dans `Teams` (`L1`), sans aucun connecteur direct d'écriture ERP/CRM/SIRH.
2. **Souveraineté par gravité des données** : `Agentforce` gouverne le pipeline commercial, `ServiceNow` la `CMDB` et la répartition `FSM`, `SAP Joule` les écritures complexes `MM/SD/FI`, et `Workday Illuminate` répond par simple booléen `AUTHORIZED/DENIED` sur les habilitations RH (`Loi 25`).
3. **Orchestration neutre et sobriété FinOps** : `Temporal`, `agentgateway` et les connecteurs certifiés `MuleSoft Agent Fabric` coordonnent toute saga touchant au moins deux silos, en privilégiant les serveurs `MCP` déterministes pour les opérations courantes.
4. **Propagation `OBO` intégrale** : `CrossSaasOboBroker` relie `Entra ID` à `Salesforce` et à `SAP CIS` (*Principal Propagation*), inscrivant le `SY-UNAME` exact de chaque gestionnaire dans `S/4HANA`.

**Résultats mesurés après 90 jours** :

* **Coût complet en crédits SaaS et inférence par saga** : réduit de **4,15 \$ CAD** (projection maillage studios) à **0,68 \$ CAD** (**-83,6 %**).
* **Boucles inter-webhooks en production** : **0** (19 cycles transitifs bloqués net par `CrossPlatformLoopGuard`).
* **Auditabilité identité `SAP` et `Loi 25`** : **100 %** d'écritures nominatives tracées, zéro export de fiches RH hors `Workday`.

:::

---

## 15.6 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-015 — Ancrage des agents spécialistes selon la gravité des données et fédération par plan de contrôle neutre"}

* **Statut** : Acceptée | **Périmètre** : Fabrique Agentique d'Entreprise (Tous domaines SaaS) | **Révision** : Annuelle
* **Contexte** : L'exploitation simultanée de `Microsoft 365`, `Salesforce`, `ServiceNow`, `SAP S/4HANA` et `Workday` expose l'entreprise à des guerres de plans de contrôle, des boucles réactives de webhooks, une perte d'identité humaine et une multiplication des coûts de crédits éditeurs.
* **Options évaluées** :
  1. *Élection d'un studio SaaS unique comme orchestrateur universel* : **Rejetée** — verrouillage stratégique fort, perte des invariants métiers tiers et surtaxe systématique de tous les flux.
  2. *Maillage pair-à-pair direct entre studios SaaS* : **Rejetée** — complexité \(O(N^2)\), cécité sécurité et vulnérabilité critique aux boucles circulaires.
  3. *Fédération selon la gravité des données sous plan de contrôle neutre* : **Retenue** — exécution locale intra-silo (\(G \ge 0{,}85\)), orchestration durable neutre (`Temporal` + `agentgateway` + médiation iPaaS) dès deux silos mutés, et propagation `OAuth 2.1 OBO` obligatoire.
* **Décision** : (a) Tout appel inter-SaaS transite obligatoirement par `agentgateway` ; (b) les sagas mutatives multi-domaines sont orchestrées par le moteur durable neutre ; (c) les comptes techniques partagés sont interdits au profit de `RFC 8693` (`Entra ID` → `SAP CIS`, `Salesforce`, `ServiceNow`) ; (d) les lectures/écritures structurées simples utilisent `MCP` sur API standard plutôt qu'une délégation conversationnelle taxée à l'acte.
* **Conséquences** :
  * *Positives* : Maîtrise des coûts FinOps et licences ERP, respect natif des permissions *Row-Level Security* et `ABAP`, immunité contre les boucles circulaires, intégration M&A accélérée.
  * *Négatives / Coûts assumés* : Gouvernance continue du modèle canonique d'échange et maintien de la chaîne cryptographique `Entra ID` ↔ `SAP CIS`.
* **Condition de révision** : Évolution des clauses tarifaires inter-agents `A2A` des grands éditeurs ou refonte majeure du parc SaaS.

:::

### Liste de contrôle de mise en production — Chapitre 15

Avant d'ouvrir en production un flux fédérant plusieurs plateformes SaaS, validez ces huit exigences :

1. **Qualification de gravité** : Le score \(G(t, D_k)\) confirme-t-il formellement le choix entre orchestration locale intra-SaaS et élévation vers le plan neutre ?
2. **Blocage des ponts directs** : Les politiques réseau des tenants SaaS interdisent-elles tout appel `A2A` ou webhook direct d'un studio vers un autre sans passer par `agentgateway` ?
3. **Propagation nominative intégrale** : La chaîne `OAuth 2.1 OBO` (`RFC 8693`) préserve-t-elle l'identité humaine jusqu'au système cible (y compris `SY-UNAME` via `SAP CIS`), sans aucun compte technique partagé ?
4. **Arbitrage contractuel FinOps** : L'impact en crédits éditeurs et *SAP Digital Access* a-t-il été validé, en privilégiant `MCP` sur API standard pour les opérations déterministes ?
5. **Vecteur anti-boucle signé** : L'en-tête `x-a2a-hop-vector` signé par HMAC est-il inspecté à chaque saut pour rejeter immédiatement tout cycle \(A \to B \to C \to A\) ?
6. **Amortisseur de webhooks CDC** : Un disjoncteur par entité canonique empêche-t-il les événements de mise à jour (`SalesOrder.Changed`, etc.) de provoquer l'auto-réveil infini des agents ?
7. **Divulgation minimale RH** : Les appels vers `Workday` retournent-ils uniquement des verdicts qualifiés sans jamais exporter de dossiers personnels bruts (`Loi 25` / `RGPD`) ?
8. **Contrats canoniques découplés** : Les échanges `A2A` utilisent-ils les schémas métiers internes versionnés plutôt que les identifiants propriétaires d'un éditeur ?
