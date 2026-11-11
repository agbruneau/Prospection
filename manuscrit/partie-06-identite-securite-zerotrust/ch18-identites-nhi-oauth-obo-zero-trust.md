# Chapitre 18 — Identités non humaines (NHI) de première classe et délégation cryptographique

::: {.synthese-executive title="Synthèse exécutive — Chapitre 18"}

* **Enjeu d'affaires et de risque** : Dans plus de 70 % des déploiements initiaux audités fin 2026, les agents autonomes s'authentifient encore soit en réutilisant le jeton interactif de l'employé (*impersonation*), soit au moyen d'un compte de service statique sur-privilégié partagé entre plusieurs flux. Ce double raccourci détruit la non-répudiation comptable, maximise le rayon d'impact de toute injection de prompt (`OWASP ASI03`) et place l'organisation en défaut immédiat vis-à-vis des obligations prudentielles de traçabilité nominative (`BSIF E-23`, `SOX`, `Loi 25`).
* **Décisions architecturales structurantes** :
  1. *Irréversible et fondatrice* : Éradiquer toute clé d'API statique au profit d'identités non humaines (`NHI`) de première classe attestées cryptographiquement au démarrage de la charge de travail (`SPIFFE`/`SPIRE`) et gouvernées dans l'annuaire d'entreprise (`Microsoft Entra Agent ID`) avec parrain humain obligatoire (*Human Sponsor*).
  2. *Structurante sur chaque flux* : Imposer à chaque frontière inter-agents (`A2A v1.0`) ou vers un serveur d'outils (`MCP`) un échange de jetons `OAuth 2.1` conforme à la norme `RFC 8693` (*Token Exchange*), préservant le sujet initial (`sub`), empilant la généalogie des acteurs (`act`) et réduisant strictement la portée fonctionnelle et financière (`RFC 9396` RAR).
  3. *Réversible par configuration* : Le mécanisme de liaison cryptographique du jeton à l'émetteur (*Sender-Constrained Token*), modulable entre `mTLS` (`RFC 8705`) sur le maillage interne et `DPoP` (`RFC 9449`) pour les franchissements infonuagiques ou partenaires.
* **Indicateurs de gouvernance associés** : Taux de couverture d'attestation matérielle/logique `NHI` (cible : 100 % des agents `L2+`), durée de vie médiane des justificatifs émis (cible : \(\le 300\text{ s}\) pour les jetons d'accès, \(\le 15\text{ min}\) pour les `SVID`), ratio d'atténuation des permissions par saut de délégation, et délai de révocation globale d'une identité d'agent compromise.

:::

## 18.1 Impasse du badge humain emprunté et du compte de service statique face aux graphes dynamiques

Les architectures classiques de gestion des identités et des accès (`IAM`) reposent sur un postulat binaire hérité du Web transactionnel : soit l'appelant est une **personne physique** présente derrière un écran, authentifiée par fédération `OpenID Connect` (`OIDC`) et authentification multifacteur (`FIDO2`/`WebAuthn`), soit l'appelant est un **démon logiciel déterministe** (lot nocturne, microservice d'intégration) doté d'un identifiant technique fixe (`Service Principal`) dont le graphe d'appels a été codé en dur par un développeur et validé statiquement avant mise en production.

Un système multi-agents de troisième génération brise simultanément ces deux catégories. Contrairement au microservice classique, la séquence exacte d'appels qu'entreprendra un agent orchestrateur n'est pas figée à la compilation : elle émerge dynamiquement de la décomposition d'un objectif métier confronté à un contexte événementiel variable. Contrairement à l'opérateur humain, l'agent exécute des dizaines de requêtes inter-domaines par minute, demeure vulnérable à la confusion entre données et instructions (`OWASP ASI01`), et opère fréquemment de manière asynchrone à 3 heures du matin lorsque l'employé à l'origine du mandat est hors ligne.

Lorsqu'une organisation tente de plaquer ses patrons `IAM` traditionnels sur une flotte agentique sans adaptation structurelle, elle tombe invariablement dans l'un des deux antipatterns mortels observés lors de la vague 2024–2025.

### Antipattern 1 : L'emprunt brut du jeton humain (*Bearer Token Pass-Through*)

Dans ce schéma, l'application cliente capture le jeton d'accès `OAuth` de l'utilisateur connecté et le transmet tel quel dans l'en-tête `Authorization: Bearer` à l'agent d'interface, qui le relaie ensuite à un agent spécialiste, lequel le présente enfin à un serveur `MCP` ou à une API d'entreprise. Cette pratique, désormais explicitement interdite par la spécification de sécurité du *Model Context Protocol*, engendre trois failles systémiques :

1. **Héritage intégral du rayon d'explosion humain** : Un directeur financier ou un ingénieur principal possède légitimement, au cours de sa journée de travail, des droits étendus sur des dizaines de modules (`SAP`, `Workday`, `SharePoint`, `Snowflake`). Si ce directeur demande simplement à un agent de « synthétiser les pénalités de retard du fournisseur X à partir du dossier courriel », le passage brut de son jeton confère momentanément à l'agent la capacité technique d'approuver un virement ou d'extraire la grille salariale de sa division si un document joint contient une charge d'injection indirecte.
2. **Effacement de la distinction cognitive dans les journaux d'audit** : Pour le système d'enregistrement cible, une écriture effectuée directement par Marie Tremblay sur son poste de travail et une écriture hallucinée par un agent ayant reçu son jeton produisent exactement la même trace d'audit. En cas de litige réglementaire ou de fraude interne, la valeur probante des journaux s'effondre.
3. **Rupture sur les régimes asynchrones (`T3` et `T4`)** : Dès que le jeton interactif initial expire après soixante minutes, une saga durable suspendue dans `Temporal` ou `Restate` échoue brutalement, poussant trop souvent les équipes pressées à réclamer la portée `offline_access` et à stocker des jetons de rafraîchissement humains à longue durée de vie dans des bases d'état applicatives — véritable mine d'or pour un attaquant.

### Antipattern 2 : Le compte de service partagé omnipotent (*God-Mode Service Account*)

Pour contourner l'expiration des sessions humaines et permettre le déclenchement par événements (`Kafka`, `OPC-UA`, webhooks), de nombreuses équipes basculent à l'extrême opposé : elles provisionnent un compte de service unique pour l'orchestrateur ou le serveur `MCP`, armé d'un secret client statique (souvent renouvelé tous les douze à vingt-quatre mois) et doté de l'union ensembliste des permissions requises par tous les utilisateurs potentiels.

Ce second raccourci institue à l'échelle de l'entreprise la vulnérabilité classique du **député confus (*Confused Deputy*)**. Le système cible (`Guidewire`, `Salesforce` ou `SAP S/4HANA`) ne voit plus que l'identité générique `svc-boreal-ai-prod` ; ses contrôles natifs de sécurité au niveau des lignes (*Row-Level Security*, `RLS`) deviennent inopérants puisque le compte technique a le droit de lire toutes les filiales. Toute la charge du cloisonnement multi-utilisateurs repose alors sur un filtre `WHERE` construit dynamiquement par l'agent ou son connecteur — c'est-à-dire précisément sur la couche la plus exposée aux manipulations sémantiques.

### La loi mathématique d'atténuation monotone sur un graphe de délégation

Pour sécuriser un graphe d'exécution dynamique comportant \(k\) sauts successifs entre un sujet initiateur \(u\) et une série d'acteurs non humains \(a_1, a_2, \dots, a_k\), le modèle Zero Trust agentique impose que l'ensemble des permissions effectives \(P_i\) détenues au saut \(i\) obéisse à une **loi d'intersection et d'atténuation monotone stricte** :

\[P_i \subseteq P_{i-1} \cap M(a_i) \cap R_i, \quad P_0 = D(u) \cap S_0\]

Dans cette relation fondamentale, \(D(u)\) et \(S_0\) bornent les droits initiaux de la session humaine, \(M(a_i)\) désigne le plafond maximal de permissions statiquement homologué sur le plan directeur (*Blueprint*) de l'agent \(a_i\), et \(R_i\) représente le sous-ensemble minimal d'opérations requis pour la seule sous-tâche déléguée au saut \(i\). Deux corollaires immédiats découlent de cet invariant :

* **Impossibilité structurelle d'amplification de privilèges** : Un agent aval \(a_i\) ne peut jamais exercer un droit absent chez l'initiateur humain \(u\), même si son propre connecteur technique le supporterait ; réciproquement, un utilisateur humain très privilégié ne peut jamais forcer un agent spécialisé de lecture (`L1`) à exécuter une écriture hors de son mandat \(M(a_i)\).
* **Décroissance monotone du rayon d'impact** : Plus l'exécution s'enfonce vers les feuilles spécialisées du graphe (\(P_k \subset \dots \subset P_1 \subset P_0\)), plus le jeton transporté devient étroit, éphémère et lié à un objet métier précis (par exemple un seul numéro de série d'équipement et un plafond monétaire explicite).

Le tableau suivant synthétise l'évaluation architecturale des quatre approches d'identité observables dans l'industrie.

| Critère d'évaluation Zero Trust | Clé d'API / Compte statique partagé | Emprunt brut du jeton humain (*Pass-through*) | Flux `client_credentials` isolé par agent | **Cible 2027 : `NHI` attestée (`SPIFFE`) + `RFC 8693` atténué** |
|---|---|---|---|---|
| **Identité de l'initiateur (`sub`)** | Perdue (écrasée par le compte technique) | Présente mais non distinguée de l'agent | Absente (contexte purement machine) | **Préservée de bout en bout et vérifiable** |
| **Généalogie des agents (`act`)** | Inexistante | Inexistante (usurpation opaque) | Limitée au dernier appelant direct | **Chaîne récursive complète et signée** |
| **Principe du moindre privilège** | Violé (union de tous les cas d'usage) | Violé (hérite de 100 % des droits humains) | Statique par classe d'agent | **Dynamique par tâche (`RFC 9396` RAR)** |
| **Résistance au vol de jeton** | Nulle (secret rejouable partout, long TTL) | Faible (Bearer rejouable jusqu'à expiration) | Moyenne si secret stocké en coffre | **Forte (`mTLS` / `DPoP` + TTL \(\le 5\text{ min}\))** |
| **Compatibilité asynchrone (`T3`/`T4`)** | Oui, mais hors de tout contrôle nominatif | Non (échoue à l'expiration de session) | Oui pour événements purement techniques | **Native (mandats bornés + escalade `CIBA`)** |
| **Homologation `BSIF E-23` / `Loi 25`** | Non conforme (échec d'audit critique) | Non conforme (défaut de non-répudiation) | Partielle (flux techniques sans PII) | **Conforme (auditabilité et SoD prouvables)** |

---

## 18.2 Identité cryptographique et provenance d'agent : SPIFFE/SPIRE, Entra Agent ID et W3C DIDs

Élever les agents au rang d'**identités non humaines (`NHI`) de première classe** exige de séparer proprement trois préoccupations que les architectures historiques confondaient : l'**attestation physique et logique de la charge de travail**, la **gouvernance administrative dans l'annuaire d'entreprise**, et la **fédération de provenance inter-organisations**.

### Couche 1 : Attestation continue sans secret sur disque avec `SPIFFE` et `SPIRE`

Le péché originel des identités machines traditionnelles réside dans le « problème du secret zéro » (*Secret Zero Problem*) : pour récupérer ses clés dans un coffre-fort numérique, un conteneur doit déjà détenir un premier secret d'amorçage injecté par variable d'environnement ou fichier monté — secret susceptible d'être divulgué dans un journal d'erreur, un instantané disque ou une attaque par exécution de code (`ASI05`).

Le standard ouvert **SPIFFE** (*Secure Production Identity Framework for Everyone*, projet gradué de la CNCF) et son implémentation de référence **SPIRE** éliminent intégralement tout secret pré-partagé. Lorsqu'un pod hébergeant un agent spécialiste démarre sur un nœud Kubernetes ou une machine virtuelle :

1. L'agent local `SPIRE` présent sur le nœud (lui-même attesté matériellement via module `TPM 2.0` ou jeton d'instance infonuagique signé) inspecte hors bande le processus appelant via l'API locale Unix (*Workload API*) en interrogeant directement le noyau Linux, le démon de conteneurs (`containerd`) et l'API `kubelet`.
2. Il vérifie un ensemble strict de **sélecteurs d'attestation** : espace de noms Kubernetes, compte de service, signature cryptographique et condensat `SHA-256` exact de l'image OCI de l'agent, voire le condensat de son paquet de configuration immuable.
3. Si et seulement si tous les sélecteurs concordent, `SPIRE` délivre en mémoire vive un **SVID** (*SPIFFE Verifiable Identity Document*) sous double forme : un certificat `X.509-SVID` pour le chiffrement et l'authentification mutuelle `mTLS` de transport, et un `JWT-SVID` à courte durée de vie (typiquement 15 minutes, renouvelé automatiquement à mi-vie) encodant l'identifiant canonique tel que `spiffe://boreal.ca/ns/bca-prod/sa/warranty-adjudicator-v2`.

### Couche 2 : Gouvernance d'annuaire, *Blueprints* et parrainage humain (`Microsoft Entra Agent ID`)

Si `SPIFFE` prouve avec certitude mathématique *quel code s'exécute sur quelle infrastructure*, il n'a pas vocation à gérer les politiques d'entreprise, les revues d'accès trimestrielles ou la responsabilité hiérarchique. C'est le rôle du plan de gouvernance d'annuaire — incarné en 2026–2027 par **Microsoft Entra Agent ID** (ainsi que les extensions `NHI` équivalentes chez Okta, Ping et AWS IAM).

L'apport architectural majeur de cette génération d'annuaires consiste à distinguer formellement les agents IA des simples *Service Principals* applicatifs grâce à trois primitives :

* **Le plan directeur d'identité (*Agent Identity Blueprint*)** : Modèle déclaratif immuable décrivant une classe d'agent (son archétype `L1`–`L4`, les portées maximales \(M(a_i)\) qu'il pourra jamais solliciter en délégation, sa classification de risque `BSIF E-23` et ses justificatifs d'identité fédérés — *Federated Identity Credentials*, `FIC` — pointant directement vers l'émetteur `SPIRE` de l'entreprise).
* **L'instance d'identité d'exécution (*Agent Identity*)** : Entité distincte instanciée à partir du *Blueprint* pour un environnement ou une division donnée, dotée de ses propres journaux de connexion, politiques d'accès conditionnel (*Conditional Access* évaluant l'état de conformité du cluster ou le score de risque en temps réel) et interrupteur de désactivation immédiate.
* **Le parrain humain obligatoire (*Human Sponsor & Owner*)** : Aucune identité d'agent ne peut être créée ni maintenue active sans être rattachée nominativement dans l'annuaire à un responsable métier et à un propriétaire technique actifs dans le SIRH (`Workday`). Si le parrain quitte l'organisation ou change de division, un flux de gouvernance d'identité (`IGA`) transfère la responsabilité sous 72 heures ou suspend automatiquement le renouvellement des jetons de l'agent.

### Couche 3 : Provenance inter-entreprises par `W3C DIDs` et `Verifiable Credentials`

Dès que la Fabrique Agentique franchit les frontières de l'entreprise — par exemple lorsque l'*Agent Approvisionnement* de Boréal négocie automatiquement via `A2A v1.0` des délais et pénalités avec l'*Agent Commercial* d'un aciériste allemand —, ni le domaine de confiance `SPIFFE` interne (`boreal.ca`) ni le locataire `Entra ID` ne sont partagés entre les deux sociétés.

Pour éviter le retour aux clés d'API bilatérales ingérables à l'échelle de 2 000 fournisseurs, l'écosystème inter-entreprises 2027 (notamment sous l'impulsion d'`AGNTCY` et des profils `A2A` B2B) s'appuie sur les standards du **W3C** : les identifiants décentralisés (**`W3C DID v1.0`**, méthodes `did:web` ou `did:webvh` avec historique de clés vérifiable) couplés aux attestations vérifiables (**`W3C Verifiable Credentials Data Model 2.0`**). L'agent externe publie ses clés publiques de signature sous son domaine DNS corporatif durci (`DNSSEC` + transparence des clés) et présente, lors de la poignée de main `A2A`, une *Verifiable Credential* signée par la chambre de commerce, un auditeur externe ou la direction juridique de son entreprise attestant son mandat légal et son plafond d'engagement contractuel.

#### Extrait 18.1 — Attestation locale `SPIRE` et document de provenance externe `W3C DID / VC 2.0`

Le premier bloc YAML ci-dessous illustre l'enregistrement déclaratif `SPIRE` exigeant la correspondance simultanée du compte Kubernetes et du condensat exact de l'image signée de l'agent ; le second bloc JSON présente l'attestation `W3C VC 2.0` exposée lors d'une fédération `A2A` externe :

```yaml
# 18.1a — Enregistrement déclaratif SPIRE (CRD Kubernetes Controller Manager)
apiVersion: spire.spiffe.io/v1alpha1
kind: ClusterSPIFFEID
metadata:
  name: bca-warranty-adjudicator-prod
spec:
  spiffeIDTemplate: "spiffe://boreal.ca/ns/{{ .PodMeta.Namespace }}/sa/{{ .PodSpec.ServiceAccountName }}"
  jwtIssuer: "https://spire-oidc.identity.boreal.ca"
  ttl: "15m"
  podSelector:
    matchLabels:
      app.kubernetes.io/name: "warranty-adjudicator"
      agent.boreal.ca/autonomy-tier: "L3"
      agent.boreal.ca/bsif-e23-class: "tier-2-material"
  namespaceSelector:
    matchLabels:
      environment: "production"
      division: "bca"
  workloadSelectorTemplates:
    - "k8s:sa:warranty-adjudicator-v2"
    - "k8s:container-image-sha256:8f4e2b9c71d03a6e...3c4b901a6d2e5f18"
```

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://schemas.agntcy.org/credentials/agent-mandate/v1"
  ],
  "id": "urn:uuid:7c9e6679-7425-40de-944b-e07fc1f90ae7",
  "type": ["VerifiableCredential", "EnterpriseAgentMandateCredential"],
  "issuer": {
    "id": "did:web:boreal.ca:legal-entity",
    "name": "Groupe Boréal Synergie Inc. (LEI: 549300BOREALCA2027X9)"
  },
  "validFrom": "2027-01-15T00:00:00Z",
  "validUntil": "2027-04-15T00:00:00Z",
  "credentialStatus": {
    "id": "https://trust.boreal.ca/status/2027/mandates#4412",
    "type": "BitstringStatusListEntry",
    "statusPurpose": "revocation",
    "statusListIndex": "4412",
    "statusListCredential": "https://trust.boreal.ca/status/2027/mandates"
  },
  "credentialSubject": {
    "id": "did:web:agents.boreal.ca:bel:procurement-negotiator",
    "spiffeFederationBinding": "spiffe://boreal.ca/ns/bel-prod/sa/procurement-negotiator",
    "agentCardUrl": "https://agents.boreal.ca/bel/proc/agent-card.json",
    "authorizedActions": ["rfq.issue", "delivery.reschedule", "po.propose_amendment"],
    "maxBindingCommitmentCad": 25000,
    "humanSponsorRole": "VP Approvisionnement Industriel BEL"
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2027-01-15T08:30:00Z",
    "verificationMethod": "did:web:boreal.ca:legal-entity#key-ed25519-2027-01",
    "proofPurpose": "assertionMethod",
    "proofValue": "z4oJ8h7R9mKpL2xQvN5tWzY3cBfD6gHjM1nPqRsTuVwXyZ8aBcDe"
  }
}
```

L'inclusion du bloc `BitstringStatusListEntry` (standard W3C de liste de révocation par champ de bits compressé) est capitale : elle permet à un partenaire commercial externe de vérifier en une milliseconde, sans appel téléphonique ni divulgation d'information confidentielle, que le mandat de l'agent négociateur de Boréal n'a pas été révoqué dans l'heure précédente.

---

## 18.3 Délégation multi-sauts OAuth 2.1 OBO, RFC 8693 (`sub`/`act`), atténuation RAR et escalade CIBA

Une fois l'identité propre de chaque agent ancrée dans `SPIFFE` et gouvernée dans l'annuaire, comment propager de manière sécurisée le mandat d'un utilisateur humain (ou d'un événement métier authentifié) à travers une chaîne de plusieurs agents spécialistes jusqu'au serveur `MCP` final ? La réponse architecturale normalisée combine quatre briques de l'IETF et de l'OpenID Foundation : **`OAuth 2.1`**, l'échange de jetons **`RFC 8693`**, les requêtes d'autorisation riches **`RFC 9396` (`RAR`)**, et les preuves de possession **`mTLS` (`RFC 8705`) / `DPoP` (`RFC 9449`)**.

![Délégation cryptographique multi-sauts : attestation SPIFFE, échange RFC 8693 à portée atténuée (RAR), preuve de possession et escalade hors bande OpenID CIBA.](manuscrit/figures/fig-18-chaine-obo-rfc8693.svg)

### Anatomie du flux d'échange `RFC 8693` à délégation explicite

Contrairement au mode *impersonation* qui remplace l'identité et efface l'intermédiaire, le mode **délégation** de la norme `RFC 8693` (*OAuth 2.0 Token Exchange*) distingue rigoureusement le `subject_token` (qui représente la chaîne d'autorité courante remontant jusqu'au sujet initial) et l'`actor_token` (ou l'assertion client `JWT-SVID` prouvant l'identité de l'agent qui demande l'échange).

À chaque saut \(i\), l'agent appelant contacte le *Security Token Service* (`STS` d'entreprise ou `Entra ID`) avant d'invoquer un pair `A2A` ou un serveur `MCP` :

1. **Authentification sans secret de l'agent appelant** : L'agent s'authentifie auprès du point de terminaison `/token` en présentant son `JWT-SVID` `SPIFFE` frais via `client_assertion` (`RFC 7523`).
2. **Présentation du jeton amont et demande de restriction (`RAR`)** : Il fournit le jeton reçu à l'entrée dans `subject_token`, désigne explicitement l'audience (`audience`) unique du prochain destinataire, et précise la restriction granulaire des droits via `authorization_details` (`RFC 9396`). Pourquoi utiliser `RFC 9396` en complément des `scope` textuels classiques ? Parce qu'une chaîne statique comme `sap.spare_parts.reserve` est aveugle aux paramètres métiers : seul un objet structuré `authorization_details` permet d'encoder cryptographiquement dans le jeton que l'agent aval n'est autorisé à réserver **qu'une seule unité de la pièce `ROTOR-KIT-HX9` pour le dossier `SN-WO-773190` sous un plafond de 5 000 \$ CAD**.
3. **Liaison cryptographique à la clé de l'agent (`Sender-Constraining`)** : L'agent joint un en-tête `DPoP` signé avec une clé privée asymétrique générée en mémoire non exportable (ou utilise son certificat `X.509-SVID` en `mTLS`). Le `STS` inscrit l'empreinte `SHA-256` de cette clé publique dans la revendication `cnf` (*Confirmation*) du nouveau jeton émis. Si un attaquant intercepte ce jeton dans un journal mal nettoyé, le jeton est strictement inutilisable sans la clé privée résidant en mémoire de l'agent légitime.

#### Extrait 18.2 — Requête HTTP d'échange `RFC 8693` + `RAR` + `DPoP` et jeton JWT résultant

Voici la requête exacte émise au saut n° 2 par l'*Agent Spécialiste Garantie* de **BCA** lorsqu'il s'apprête à invoquer le serveur `MCP` adossé à `Guidewire` et `IBM i`, suivie de la charge utile décodée du jeton `T2` délivré par le `STS` :

```http
POST /oauth2/v2.1/token HTTP/1.1
Host: sts.identity.boreal.ca
Content-Type: application/x-www-form-urlencoded
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7Imt0...

grant_type=urn:ietf:params:oauth:grant-type:token-exchange
&client_id=agent-bca-warranty-adjudicator-prod
&client_assertion_type=
  urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWI...
&subject_token=eyJhbGciOiJFUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJzdW...
&subject_token_type=urn:ietf:params:oauth:token-type:access_token
&audience=mcp://gateway.boreal.ca/mcp/bca-guidewire-contracts
&scope=bca.warranty.preauthorize
&authorization_details=[{"type": "boreal_warranty_adjudication",
  "actions": ["preauthorize_claim"], "equipmentSerial": "BOR-CMP-90441",
  "maxAmountCad": 4500.00, "sagaId": "saga-inc-2027-088412"}]
```

```json
{
  "iss": "https://sts.identity.boreal.ca",
  "sub": "emp-8841-marc.lavoie@boreal.ca",
  "aud": "mcp://gateway.boreal.ca/mcp/bca-guidewire-contracts",
  "iat": 1773588420,
  "exp": 1773588720,
  "jti": "tok-t2-9f81c3a4-7b2e-4d19-8a50-62e41c90b312",
  "client_id": "agent-bca-warranty-adjudicator-prod",
  "ent_sponsor": "emp-1042-claire.desjardins@boreal.ca",
  "scope": "bca.warranty.preauthorize",
  "act": {
    "sub": "spiffe://boreal.ca/ns/bca-prod/sa/warranty-adjudicator-v2",
    "blueprint_id": "bp-bca-warranty-tier2",
    "act": {
      "sub": "spiffe://boreal.ca/ns/bsn-prod/sa/maint-orchestrator-v4",
      "blueprint_id": "bp-bsn-orchestrator-tier2"
    }
  },
  "authorization_details": [
    {
      "type": "boreal_warranty_adjudication",
      "actions": ["preauthorize_claim"],
      "equipmentSerial": "BOR-CMP-90441",
      "maxAmountCad": 4500.00,
      "sagaId": "saga-inc-2027-088412"
    }
  ],
  "cnf": {
    "jkt": "0ZcOCORZNYy-DWpqq30jZyJGHTN0d2HglBV3uiguA4I",
    "x5t#S256": "bwcK0esc3ACC3DB2Y5_lESsXE8o9ltc05O89jdN-dg2"
  }
}
```

L'élégance structurelle de ce jeton `at+jwt` (`RFC 9068`) saute aux yeux : en un seul bloc signé de moins de deux kilo-octets et valide exactement cinq minutes (`exp - iat = 300`), le serveur `MCP` destinataire vérifie simultanément l'employé initiateur (`sub`), l'intégralité du chemin d'orchestration traversé (`act` imbriqué), le responsable hiérarchique de l'agent (`ent_sponsor`), le plafond financier exact autorisé (`4500.00` CAD sur le seul équipement `BOR-CMP-90441`), et la preuve cryptographique que la connexion provient bien du conteneur attesté (`cnf`).

### Approbation asynchrone hors bande via `OpenID CIBA` pour l'escalade `HOTL`

Que se passe-t-il lorsque le devis estimé de réparation atteint **7 850 \$ CAD**, excédant le plafond autonome `L3` de 5 000 \$ CAD codé dans le *Blueprint* de l'agent ? L'agent s'exécute en arrière-plan dans un travailleur `Temporal` sans aucun navigateur ouvert ; il lui est techniquement impossible d'effectuer une redirection HTTP `302` vers une mire de connexion. Pire encore, envoyer un simple lien cliquable dans un courriel ou un message de clavardage expose l'organisation au hameçonnage interne et à l'approbation inattentive.

Le standard **OpenID Connect CIBA** (*Client-Initiated Backchannel Authentication*) résout nativement ce découplage temporel et de canal :

1. L'agent (ou le moteur d'orchestration agissant en tant que client confidentiel attesté) soumet une requête signée à l'endpoint `/bc-authorize` du fournisseur d'identité en désignant le groupe de souscripteurs habilités, un message de liaison lisible (`binding_message`) et le condensat cryptographique exact de la transaction proposée (`tx_hash`).
2. Le moteur durable met l'activité en veille persistante (`awakeable` ou attente de signal webhook en mode CIBA *Ping*/*Push*, consommant zéro fil CPU pendant les minutes ou les heures d'attente).
3. Sur le téléphone corporatif sécurisé d'un souscripteur admissible, l'application d'authentification affiche les paramètres clés de l'engagement (montant, bénéficiaire, écart détecté) et exige une signature biométrique locale **`FIDO2` / `Passkey`** liée au condensat `tx_hash`.
4. Le fournisseur d'identité vérifie une règle critique de **séparation des tâches (`SoD`)** : l'approbateur `CIBA` ne doit jamais être la même personne que le sujet initiateur `sub` du flux, ni le développeur ayant déployé l'agent. Il notifie alors l'orchestrateur et émet un jeton d'approbation à usage unique verrouillé sur cette seule transaction.

#### Extrait 18.3 — Coordinateur TypeScript d'approbation hors bande `OpenID CIBA` avec contrôle `SoD`

```typescript
import { createHash } from "node:crypto";
import { jwtVerify, createRemoteJWKSet } from "jose";

export interface HighValueClaimIntent {
  readonly sagaId: string;
  readonly initiatingSubjectId: string;
  readonly equipmentSerial: string;
  readonly amountCad: number;
  readonly beneficiaryVendorId: string;
}

export interface VerifiedCibaApproval {
  readonly approvalJti: string;
  readonly approverSubjectId: string;
  readonly transactionHash: string;
  readonly scopedAccessToken: string;
}

const JWKS = createRemoteJWKSet(new URL("https://sts.identity.boreal.ca/.well-known/jwks.json"));

export function computeCanonicalTxHash(intent: HighValueClaimIntent): string {
  const canonical = JSON.stringify({
    amountCad: intent.amountCad.toFixed(2),
    beneficiaryVendorId: intent.beneficiaryVendorId,
    equipmentSerial: intent.equipmentSerial,
    initiatingSubjectId: intent.initiatingSubjectId,
    sagaId: intent.sagaId,
  });
  return createHash("sha256").update(canonical, "utf8").digest("base64url");
}

export async function initiateAndVerifyCibaStepUp(
  intent: HighValueClaimIntent,
  spiffeClientAssertion: string,
  waitForWebhookCallback: (authReqId: string, timeoutMs: number) => Promise<void>
): Promise<VerifiedCibaApproval> {
  const txHash = computeCanonicalTxHash(intent);
  const shortCode = txHash.slice(0, 6).toUpperCase();

  // 1. Initiation hors bande sur l'endpoint CIBA signé avec JWT-SVID
  const initRes = await fetch("https://sts.identity.boreal.ca/openid/ciba/bc-authorize", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: "agent-bca-warranty-adjudicator-prod",
      client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_assertion: spiffeClientAssertion,
      login_hint_token: "role:bca-senior-underwriter-l4",
      scope: "openid bca.warranty.approve_high_value",
      binding_message: `BCA-${shortCode} : Autoriser ${intent.amountCad.toFixed(2)} CAD (${intent.equipmentSerial})`,
      request_context: JSON.stringify({ tx_hash: txHash, saga_id: intent.sagaId }),
      requested_expiry: "14400", // Fenêtre SLA de 4 heures maximum
    }),
  });

  if (!initRes.ok) {
    throw new Error(`Échec d'initiation CIBA : HTTP ${initRes.status}`);
  }
  const { auth_req_id, expires_in } = (await initRes.json()) as {
    auth_req_id: string;
    expires_in: number;
  };

  // 2. Mise en veille durable sans scrutation active (mode CIBA Ping)
  await waitForWebhookCallback(auth_req_id, expires_in * 1000);

  // 3. Récupération du jeton après signature FIDO2 du souscripteur
  const tokenRes = await fetch("https://sts.identity.boreal.ca/oauth2/v2.1/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:openid:params:grant-type:ciba",
      auth_req_id,
      client_id: "agent-bca-warranty-adjudicator-prod",
      client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_assertion: spiffeClientAssertion,
    }),
  });

  if (!tokenRes.ok) {
    throw new Error(`Approbation CIBA refusée ou expirée : HTTP ${tokenRes.status}`);
  }
  const { id_token, access_token } = (await tokenRes.json()) as {
    id_token: string;
    access_token: string;
  };

  // 4. Vérification cryptographique stricte de l'intégrité et de la séparation des tâches (SoD)
  const { payload } = await jwtVerify(id_token, JWKS, {
    issuer: "https://sts.identity.boreal.ca",
    audience: "agent-bca-warranty-adjudicator-prod",
  });

  const approverSub = String(payload.sub ?? "");
  const approvedTxHash = String(payload.tx_hash ?? "");
  const amr = Array.isArray(payload.amr) ? payload.amr : [];

  if (!approverSub || approverSub === intent.initiatingSubjectId) {
    throw new Error("Violation critique SoD : l'approbateur CIBA ne peut être le sujet initiateur.");
  }
  if (!amr.includes("hwk") && !amr.includes("fido")) {
    throw new Error("Niveau d'assurance insuffisant : signature matérielle FIDO2 exigée.");
  }
  if (approvedTxHash !== txHash) {
    throw new Error("Intégrité rompue : le condensat approuvé ne correspond pas à la transaction.");
  }

  return {
    approvalJti: String(payload.jti),
    approverSubjectId: approverSub,
    transactionHash: txHash,
    scopedAccessToken: access_token,
  };
}
```

### Gouvernance du cycle de vie complet des identités `NHI` d'agents

Contrairement aux comptes d'employés rythmés par les processus d'embauche et de départ des ressources humaines, les identités d'agents prolifèrent au rythme des déploiements logiciels CI/CD. Sans gouvernance industrielle du cycle de vie (*NHI Lifecycle Management*), les identités orphelines s'accumulent en quelques trimestres. Le tableau ci-dessous définit la norme opérationnelle en six phases.

| Phase du cycle de vie | Événement déclencheur | Contrôles obligatoires d'ingénierie et `IGA` | Indicateur / SLA de conformité |
|---|---|---|---|
| **1. Conception & Blueprint** | Création d'une nouvelle classe d'agent (`L1`–`L4`) | Définition du plafond \(M(a_i)\), affectation de deux parrains humains (`Workday`), revue `BSIF E-23` | Zéro *Blueprint* sans parrain actif ni cote d'autonomie |
| **2. Amorçage attesté** | Déploiement CI/CD signé (`Sigstore`) en cluster | Vérification du condensat OCI par `SPIRE`, fédération `FIC` sans secret vers `Entra Agent ID` | 0 secret statique stocké en variable ou volume |
| **3. Exécution & Rotation** | Activité opérationnelle nominale | Rotation auto `SVID` aux 15 min, échange `RFC 8693` par saut (TTL \(\le 5\text{ min}\)), liaison `DPoP`/`mTLS` | 100 % d'appels `MCP` mutatifs sous jeton contraint |
| **4. Revue périodique** | Échéance mensuelle ou dérive télémétrique | Analyse d'écart entre portées accordées au *Blueprint* et portées réellement utilisées (*Right-sizing*) | Élagage auto des portées inutilisées après 30 jours |
| **5. Quarantaine d'urgence** | Alerte SOC (`ASI01`/`ASI10`) ou départ du parrain | Révocation instantanée du `ClusterSPIFFEID` + signal `OpenID CAEP` vers `agentgateway` | Blocage effectif multi-régions en \(< 2\text{ secondes}\) |
| **6. Décommissionnement** | Retrait d'une version ou fin de programme | Suppression des `FIC`, révocation des `W3C VC` externes, scellement WORM des journaux sur 7 ans | Zéro identité `NHI` dormante active au-delà de 14 jours |

---

## 18.4 Application au fil rouge et éclairages sectoriels

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Refonte IAM sur Microsoft Entra Agent ID et SPIRE pour tracer chaque chaîne de délégation"}

**Situation de départ (T4 2026)** : Lors de l'audit déclencheur mentionné au Chapitre 1, l'équipe de sécurité du **Groupe Boréal** avait découvert 19 *Shadow Agents* et un incident majeur : un assistant interne utilisait un jeton de compte de service partagé (`svc-copilot-hr-fin`) doté d'un droit de lecture élargi sur `Workday` et `Snowflake`, exposant potentiellement les dossiers médicaux d'invalidité d'employés québécois (risque de sanction sévère sous la **Loi 25**). Par ailleurs, sur le cœur patrimonial `IBM i (AS/400)` de **Boréal Capital & Assurances (BCA)**, toutes les requêtes automatisées arrivaient sous un profil générique unique `QUSERAPI`, rendant impossible toute démonstration de séparation des tâches devant les inspecteurs du **BSIF**.

**Architecture déployée (T1–T2 2027)** :

1. **Éradication des secrets statiques par `SPIRE` hybride** : L'équipe plateforme déploie un plan de contrôle `SPIRE` fédéré couvrant simultanément les clusters Kubernetes infonuagiques (`AKS` Canada Central pour **BSN**) et les nœuds Linux sur site proches des usines **BEL** et du système central **BCA**. Les 28 classes d'agents homologuées reçoivent chacune un `ClusterSPIFFEID` verrouillé sur le condensat `SHA-256` de leur image conteneur signée en CI/CD.
2. **Gouvernance `Microsoft Entra Agent ID`** : Chaque classe d'agent est déclarée comme *Agent Identity Blueprint* rattaché par *Federated Identity Credential* à l'émetteur OIDC de `SPIRE`, avec double parrainage obligatoire (un directeur métier divisionnaire et un architecte responsable). Les 19 *Shadow Agents* non conformes voient leurs clés d'API coupées à la passerelle réseau.
3. **Pont d'audit patrimonial vers `IBM i (DB2 for i)`** : C'était l'obstacle technique le plus redouté chez **BCA** — comment préserver la chaîne `RFC 8693` face à un `AS/400` trentenaire qui ignore tout d'`OAuth 2.1` ? L'équipe encapsule les programmes RPG dans un serveur `MCP` dédié placé derrière `agentgateway`. Ce serveur `MCP` vérifie le jeton `at+jwt` contraint par `mTLS`, puis appelle à l'ouverture de chaque transaction DB2 la procédure système `QSYS2.SET_CLIENT_INFO` en injectant `CLIENT_USERID = sub` (l'employé initiateur), `CLIENT_APPLNAME = act.sub` (l'identifiant `SPIFFE` de l'agent) et `CLIENT_ACCTNG = jti` (l'identifiant unique du jeton et de l'approbation `CIBA`). Les journaux natifs immuables `QAUDJRN` de l'`IBM i` reflètent désormais fidèlement toute la chaîne agentique sans réécrire une seule ligne de COBOL ou de RPG métier.

**Résultats mesurés après 90 jours** :

* **Secrets statiques et clés d'API de comptes d'agents en production** : passage de **64 secrets dispersés à 0**.
* **Réduction de la surface de permissions active par appel** : **-94 %** en moyenne grâce à l'atténuation `RFC 8693` + `RAR` par équipement et par dossier.
* **Latence additionnelle mesurée par saut d'échange `STS` + vérification `DPoP`** : **6,8 ms au 95e centile** (négligeable devant les 400 à 1 800 ms d'inférence modèle), avec validation sans réserve lors du pré-audit `BSIF E-23` d'avril 2027.

:::

::: {.encadre-sectoriel title="Secteur Financier — Piste d'audit nominative exigée par BSIF E-23 et séparation des tâches (SoD) cryptographique"}

Pour les institutions financières fédérales canadiennes soumises à la ligne directrice **BSIF E-23** au **1er mai 2027** (ainsi qu'aux contrôles internes `SOX 404` et `DORA` en Europe), la gouvernance du risque de modèle ne s'arrête pas à la qualité statistique des prédictions : elle exige une preuve opposable d'**attribution des décisions** et d'**inviolabilité des délégations de pouvoirs financiers**.

Dans une chaîne d'indemnisation d'assurance ou de restructuration de prêt outillée par des agents, trois invariants cryptographiques doivent pouvoir être reconstitués a posteriori devant un auditeur externe pour n'importe quelle écriture comptable :

1. **Non-répudiation tripartite** : Le journal immuable (`WORM`, rétention minimale de 7 ans) doit lier dans un même enregistrement signé le sujet initiateur (`sub`), la version exacte du *Blueprint* et du modèle ayant formulé la proposition (`act` + attributs `OpenTelemetry gen_ai.request.model`), et, au-delà du seuil autonome, l'identité humaine distincte ayant apposé sa signature matérielle `FIDO2` via `CIBA`.
2. **Séparation des tâches inter-agents et humain-agent (`Cryptographic SoD`)** : Tout comme un analyste crédit ne peut approuver son propre décaissement, un *Agent Critique* (`Archétype 5`) chargé de contrôler la conformité d'un dossier instruit par un *Agent Spécialiste* (`Archétype 2`) doit posséder un `SPIFFE ID` distinct, un *Blueprint* distinct et ne partager aucun jeton d'état mutable avec l'agent évalué. Le `STS` refuse l'émission d'un jeton de décaissement final si la revendication `act` ne contient pas les deux attestations indépendantes ou un jeton `CIBA` d'un supérieur habilité.
3. **Revalidation de fraîcheur après mise en veille (`T4`)** : Lorsqu'une instruction de sinistre suspendue plusieurs jours se réveille, tout jeton antérieur est échu ; le `STS` réévalue en temps réel le statut actif de l'initiateur et du parrain dans l'annuaire avant d'accorder un nouveau mandat `RFC 8693`.

:::

::: {.encadre-sectoriel title="Santé & Secteur Public (Loi 25 / RGPD) — Finalité déclarée, minimisation des portées et expiration stricte sur données personnelles"}

Dans les réseaux hospitaliers, les organismes publics et toute entreprise traitant des renseignements personnels sensibles au sens de la **Loi 25** québécoise ou de l'article 9 du **RGPD**, l'accès légitime à une donnée est indissociable de sa **finalité déclarée** (*Purpose Limitation*). Un agent administratif mandaté pour planifier un rendez-vous d'imagerie n'a aucun motif légal de lire les notes psychiatriques du dossier patient, même s'il interroge le même serveur `FHIR` encapsulé en `MCP`.

L'utilisation d'objets `authorization_details` (`RFC 9396`) lors de l'échange `RFC 8693` permet d'encoder obligatoirement un attribut normalisé `purposeOfUse` (par exemple `urn:oid:2.16.840.1.113883.5.8#APPT` en santé ou un code du registre de consentement Loi 25). Le serveur `MCP` en aval refuse tout champ hors du périmètre strictement nécessaire à cette finalité, masque dynamiquement les identifiants directs avant retour au contexte du LLM lorsque l'opération ne les requiert pas, et interdit structurellement l'émission de tout jeton de rafraîchissement (`refresh_token`) sur des portées touchant aux renseignements personnels.

:::

---

## 18.5 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-018 — Identité NHI unique par classe d'agent et échange de jetons RFC 8693 à portée atténuée à chaque saut"}

* **Statut** : Acceptée | **Périmètre** : Identité IAM & Zero Trust | **Révision** : Semestrielle
* **Contexte** : L'exécution de processus métiers transversaux par des flottes d'agents autonomes asynchrones rend caducs l'emprunt de jetons interactifs humains (sur-privilégiation, perte d'audit, échec hors ligne) comme les comptes de service partagés (vulnérabilité *Confused Deputy*, secrets statiques exposés).
* **Options évaluées** :
  1. *Clés d'API par agent stockées dans un coffre-fort central* : Améliore l'isolation par rapport à un compte unique, mais conserve des secrets statiques exportables, perd l'identité de l'utilisateur initiateur (`sub`) et n'atténue pas les droits par tâche. **Rejetée**.
  2. *Propagation du jeton utilisateur OAuth initial à travers la chaîne* : Préserve `sub`, mais viole le moindre privilège, empêche l'isolation par audience et échoue dès que la saga dépasse la durée de session interactive. **Rejetée**.
  3. *Attestation de charge de travail `SPIFFE`/`SPIRE` fédérée à l'annuaire `NHI` (`Entra Agent ID`), échange obligatoire `RFC 8693` + `RAR` à chaque saut avec jetons contraints (`DPoP`/`mTLS`), et escalade asynchrone `OpenID CIBA`* : **Retenue**.
* **Décision** : (a) Tout agent de niveau `L1` à `L4` se voit attribuer un *Blueprint* nominatif avec parrain humain actif et s'authentifie exclusivement par `SVID` éphémère (`TTL <= 15 min`), sans aucun secret persistant ; (b) tout franchissement de frontière `A2A` ou `MCP` exige un échange `RFC 8693` produisant un jeton `at+jwt` (`TTL <= 5 min`) d'audience unique, contraint cryptographiquement (`cnf`), préservant `sub`, empilant `act` et restreignant les paramètres sensibles via `RFC 9396` ; (c) toute approbation humaine sur flux asynchrone passe par `OpenID CIBA` avec signature matérielle `FIDO2` liée au condensat `tx_hash`.
* **Conséquences** :
  * *Positives* : Suppression complète des secrets statiques d'agents, confinement mathématique du rayon d'explosion à la sous-tâche courante, conformité native aux audits `BSIF E-23` et `Loi 25`, support transparent des sagas multi-jours.
  * *Négatives / Coûts assumés* : Exploitation d'une infrastructure `SPIRE` haute disponibilité, latence réseau marginale de 4 à 8 ms par saut d'échange `STS`, et mise à niveau des serveurs `MCP` patrimoniaux pour inspecter les revendications `sub`, `act` et `authorization_details`.
* **Condition de révision** : Révision semestrielle alignée sur les travaux du groupe de travail IETF OAuth sur les profils de délégation agentique native.

:::

### Liste de contrôle de mise en production — Chapitre 18

Avant d'autoriser un agent ou un serveur `MCP` à franchir l'étape d'homologation sécurité en production, validez rigoureusement chacun des huit points suivants :

1. **Zéro secret statique** : L'agent démarre-t-il et s'authentifie-t-il auprès du `STS` exclusivement via une identité attestée `SPIFFE` (`JWT-SVID` / `X.509-SVID`), sans aucune clé d'API ni mot de passe stocké en variable d'environnement, fichier de configuration ou image conteneur ?
2. **Parrainage nominatif actif** : L'*Agent Identity Blueprint* possède-t-il un propriétaire métier et un responsable technique actifs dans le SIRH, avec suspension automatique programmée en cas d'orphelinat ?
3. **Interdiction du *Token Pass-Through*** : La passerelle `agentgateway` et chaque serveur `MCP` rejettent-ils systématiquement (`HTTP 401/403`) tout jeton dont la revendication `aud` ne désigne pas explicitement et uniquement leur propre URI canonique ?
4. **Atténuation monotone et `RAR`** : Chaque saut de délégation `RFC 8693` réduit-il effectivement l'ensemble des portées au strict nécessaire et borne-t-il les montants, quantités ou identifiants d'objets critiques dans `authorization_details` (`RFC 9396`) ?
5. **Preuve de possession active (`cnf`)** : Les jetons d'accès émis pour des opérations `L2+` sont-ils liés cryptographiquement à la clé éphémère de l'agent via `mTLS` (`RFC 8705`) ou `DPoP` (`RFC 9449`), avec vérification anti-rejeu du `jti` ?
6. **Traçabilité `sub` + `act` jusqu'au disque** : Les connecteurs vers les *Systems of Record* (y compris patrimoniaux) propagent-ils à la fois le sujet initial (`sub`) et la chaîne d'acteurs (`act`) jusque dans les journaux d'audit applicatifs et bases de données ?
7. **Intégrité transactionnelle `CIBA` et `SoD`** : Pour toute escalade `HOTL`, la signature `FIDO2` porte-t-elle sur le condensat `SHA-256` exact des paramètres de l'action, en interdisant mathématiquement à l'initiateur d'approuver sa propre transaction ?
8. **Fédération B2B révocable** : Si l'agent interagit avec des partenaires externes via `A2A`, ses attestations `W3C DID` / `VC 2.0` comportent-elles une échéance courte et une liste de révocation `BitstringStatusList` vérifiée à chaque session ?
