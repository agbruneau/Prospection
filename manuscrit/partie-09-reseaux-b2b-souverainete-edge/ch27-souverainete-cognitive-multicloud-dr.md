# Chapitre 27 — Souveraineté cognitive, portabilité multi-cloud et reprise après sinistre cognitif (Cognitive DR)

::: {.synthese-executive title="Synthèse exécutive — Chapitre 27"}

* **Enjeu stratégique** : Une entreprise qui ancre ses processus vitaux dans un fournisseur unique de modèles frontières infonuagiques concentre un double risque systémique que les plans de continuité TI classiques ignorent : un **risque juridictionnel extraterritorial** (conflit frontal entre le `CLOUD Act` américain, la `Loi 25` québécoise, `BSIF E-23` et les régimes européens de souveraineté sur les états d'agents et les `KV-caches`) et un **risque d'arrêt cognitif brutal** (panne régionale d'hyperscaler, étranglement tarifaire ou retrait unilatéral d'une version de modèle brisant la fidélité d'exécution des outils `MCP`).
* **Décisions architecturales structurantes** :
  1. *Irréversible sur le plan légal* : Géofencer l'intégralité de l'empreinte d'état agentique — journaux durables `Temporal`, graphes bi-temporels `Graphiti`, index vectoriels, traces `OpenTelemetry` et `KV-caches` GPU — par zone juridictionnelle souveraine, et imposer une pseudonymisation réversible à clé détenue localement (**`HYOK`**) avant tout appel à une API frontière externe.
  2. *Structurante pour les charges sensibles* : Déployer l'**inférence confidentielle matérielle (*Confidential Computing*)** sur enclaves GPU attestées (`NVIDIA H100/B200 TEE` + `AMD SEV-SNP` / `Intel TDX`) garantissant que l'opérateur infonuagique lui-même ne peut inspecter ni les consignes, ni les poids affinés, ni les tenseurs en cours de calcul.
  3. *Exigée en résilience prudentielle (`BSIF E-23`)* : Instituer un plan de **reprise après sinistre cognitif (*Cognitive Disaster Recovery*)** testé chaque trimestre, capable de basculer en moins de quinze minutes (`RTO < 15 min`, `RPO = 0`) d'un modèle propriétaire défaillant vers une grappe souveraine à poids ouverts (*Open-Weights*) pré-calibrée sur les mêmes contrats `Open Responses` et `MCP`.
* **Indicateurs de gouvernance** : Couverture d'état résidant dans sa juridiction légale cible (100 %), `RTO` cognitif mesuré en exercice réel (\(< 15\text{ min}\)), maintien du score \(\text{pass}^5\) en mode de secours (\(\ge 94\,\%\) du nominal) et zéro clé maîtresse de déchiffrement exposée hors `HSM` d'entreprise.

:::

## 27.1 Anatomie de la souveraineté agentique : résidence juridictionnelle de l'état complet et conflits de lois extraterritoriaux

Dans une architecture web traditionnelle à trois tiers, la localisation des données se résume essentiellement à l'emplacement géographique de la base relationnelle et des sauvegardes objet. Dans une entreprise agentique de niveau `L3` ou `L4`, cette vision partielle crée un angle mort majeur de conformité : **une requête métier se dissémine instantanément à travers six substrats de persistance distincts**, dont plusieurs échappent aux inventaires classiques des équipes de gouvernance des données.

### Les six couches d'empreinte résidentielle d'une saga agentique

Pour démontrer à un régulateur (Commission d'accès à l'information du Québec sous **Loi 25**, **BSIF** sous ligne directrice **E-23**, ou autorités européennes sous **RGPD** / **EU Data Act**) qu'un renseignement personnel ou un secret industriel réglementé n'a pas quitté indûment sa juridiction, l'architecte doit gouverner simultanément :

1. **Le journal d'événements du moteur d'exécution durable (`Temporal` / `Restate`)** : Chaque argument d'outil et chaque réponse intermédiaire sérialisés dans l'historique de reprise contiennent les données métiers en clair si aucun chiffrement de charge utile côté client (*Payload Codec*) n'est appliqué.
2. **La mémoire épisodique et sémantique (`Graphiti` / `Letta` / index vectoriels)** : Les plongements lexicaux (*embeddings*) ne constituent **pas** une anonymisation opposable ; les attaques par inversion de vecteurs documentées dès 2024–2026 reconstruisent jusqu'à 70 % des entités textuelles d'origine à partir d'un vecteur dense non chiffré.
3. **Le cache clé-valeur d'attention (`KV-cache` GPU / mémoire désagrégée)** : Lorsqu'une passerelle d'inférence conserve en mémoire `VRAM` ou `NVMe` les tenseurs d'attention précalculés pendant trente minutes pour abattre le `TTFT` (Chapitre 14), ces tenseurs matérialisent physiquement le contenu exact du dossier client sur le serveur GPU hôte.
4. **Les files de transit événementiel (`Kafka` / `Solace`) et tampons `A2A`** : Les artefacts échangés entre agents spécialistes persistent sur disque selon la politique de rétention du courtier.
5. **Le plan d'observabilité (`OpenTelemetry gen_ai.*`)** : Un collecteur SaaS d'observabilité hébergé dans une autre juridiction devient un vecteur d'exportation illicite si les attributs d'invite ne sont pas caviardés à la source (Chapitre 21).
6. **Les journaux d'abus et de télémétrie du fournisseur de modèle** : Sans contrat explicite **`Zero-Data-Retention` (`ZDR`)** désactivant toute mise en file d'inspection humaine chez l'éditeur du modèle, un simple appel HTTPS suffirait à conserver trente jours le contenu à l'étranger.

### Arbitrer la tension extraterritoriale : Loi 25, BSIF E-23, EU Sovereign Cloud et CLOUD Act

En 2027, une organisation opérant au Québec, au Canada fédéral et en Union européenne fait face à une équation juridique asymétrique. Même lorsqu'un hyperscaler américain héberge physiquement ses grappes GPU à Montréal, Toronto ou Francfort, le **`U.S. CLOUD Act`** (18 U.S.C. § 2713) maintient une compétence d'injonction judiciaire sur toute société mère de droit américain dès lors que celle-ci détient techniquement la capacité de déchiffrer les données. Parallèlement, l'article 17 de la **`Loi 25`** exige une Évaluation des facteurs relatifs à la vie privée (`ÉFVP`) démontrant une protection adéquate avant toute communication hors Québec, tandis que la ligne directrice **`BSIF E-23`** (en vigueur le **1er mai 2027**) et sa sœur **`BSIF B-10`** (impartition et risque de concentration infonuagique) obligent les institutions financières fédérales à prouver leur maîtrise opérationnelle et leur stratégie de sortie face aux fournisseurs critiques de modèles.

La réponse d'ingénierie ne consiste ni à s'interdire dogmatiquement les meilleurs modèles mondiaux, ni à ignorer le risque légal, mais à instaurer une **partition souveraine à trois zones pilotée par `agentgateway`** :

![Architecture de souveraineté cognitive : routage géofencé, enclaves GPU TEE sous clé HYOK et bascule Cognitive DR vers grappe Open-Weights souveraine.](manuscrit/figures/fig-27-souverainete-cognitive-dr.svg)

| Classe de sensibilité métier | Résidence de l'état (`Temporal`, mémoire, `OTel`) | Régime d'inférence autorisé | Protection cryptographique exigée |
|---|---|---|---|
| **C1 — Public / Industriel non sensible** | Infonuagique régional standard | API frontières mondiales ou `SLM` | `TLS 1.3`, contrat `ZDR` standard |
| **C2 — Confidentiel affaires / PII réglementée (`Loi 25`)** | **Résidence stricte juridictionnelle (QC/CA ou UE)** | API frontières régionales sous pseudonymisation **ou** GPU `TEE` | **Tokenisation `HMAC-FPE` locale (`HYOK`)** + `Payload Codec` `Temporal` |
| **C3 — Secret stratégique / Prudentiel critique (`E-23` élevé, défense, santé)** | **Infrastructure souveraine dédiée (opérateur national ou *on-prem*)** | **Exclusivement modèles *Open-Weights* internes ou enclave `TEE` souveraine** | **Enclave matérielle CPU+GPU attestée**, zéro transit hors juridiction |

---

## 27.2 Inférence confidentielle matérielle (GPU TEE) et pseudonymisation réversible déterministe sous clé HYOK

Deux mécanismes techniques complémentaires permettent de concilier haute capacité cognitive et souveraineté cryptographique vérifiable : la **pseudonymisation réversible déterministe en amont** et l'**exécution dans une enclave matérielle GPU (*Confidential Computing*)**.

### 1. Pseudonymisation réversible déterministe à conservation de structure (`HYOK`)

Lorsqu'une tâche de classe `C2` nécessite la puissance de raisonnement *System-2* d'un modèle frontière externe (ex. l'analyse contradictoire d'une clause d'exclusion complexe dans un contrat d'assurance commerciale), le modèle a besoin de comprendre la **structure logique et relationnelle** du cas, mais n'a nullement besoin de connaître la véritable raison sociale de l'assuré, son numéro de compte bancaire ou l'adresse exacte de son usine.

Avant que la requête ne franchisse la frontière du réseau interne, un filtre déterministe couplé à un `SLM` local de reconnaissance d'entités remplace chaque identifiant direct par un **pseudonyme syntaxiquement réaliste et cohérent sur toute la session** (`Assuré_7F3A`, `Usine_QC_04`, montants mis à l'échelle par un facteur secret si requis), dérivé par chiffrement à préservation de format (**`FF1/FF3-1` ou `HMAC` salé par saga**) dont la clé maîtresse réside exclusivement dans le module matériel de sécurité (**`HSM` — *Hold Your Own Key*, `HYOK`**) de l'entreprise. Afin de parer à la ré-identification indirecte par recoupement (`Loi 25`), ce sas généralise également les **quasi-identifiants structurels rares** (capacité industrielle singulière, municipalité à faible densité, date exacte de sinistre) en plages catégorielles avant l'envoi. À la réception de la sortie structurée du modèle externe, la passerelle réhydrate localement les véritables identifiants avant l'appel d'outil `MCP` interne : l'opérateur infonuagique externe n'a mathématiquement jamais vu la donnée nominative.

### 2. Enclaves matérielles GPU attestées (`Confidential Computing`)

Lorsque la tâche porte sur des données non pseudonymisables (imagerie médicale, plans CAO industriels propriétaires, code source critique ou grands corpus financiers) et s'exécute sur une infrastructure infonuagique louée, l'architecture s'appuie sur le **calcul confidentiel GPU** arrivé à maturité industrielle sur les générations **`NVIDIA Hopper (H100)` et `Blackwell (B200)`** couplées à des processeurs hôtes **`AMD SEV-SNP`** ou **`Intel TDX`**.

Le protocole d'amorçage zéro confiance obéit à une séquence stricte :
1. La machine virtuelle confidentielle (`CVM`) et le pilote GPU établissent un canal PCIe chiffré de bout en bout (`SPDM` / `CMA`) ; la mémoire `VRAM` du GPU est matériellement isolée de l'hyperviseur de l'hébergeur.
2. Le matériel génère un rapport d'attestation signé par sa racine silicium contenant les mesures cryptographiques (`PCR` / *Platform Configuration Registers*) du microcode, du noyau, du moteur d'inférence (`vLLM` / `SGLang`) et de l'empreinte exacte des poids du modèle.
3. Ce rapport est soumis au **service d'attestation souverain** de l'entreprise cliente. **Uniquement si les mesures correspondent au manifeste signé approuvé**, le `HSM` interne libère vers l'intérieur de l'enclave la clé éphémère permettant de déchiffrer les poids affinés et d'ouvrir le tunnel `mTLS` depuis `agentgateway`.

#### Extrait 27.1 — Politique d'attestation matérielle et de routage souverain `HYOK` (`sovereign-gateway.yaml`)

Cette configuration d'`agentgateway` applique automatiquement le géofencing juridictionnel, la pseudonymisation `HYOK` et la vérification d'attestation `TEE` avant routage :

```yaml
apiVersion: gateway.aaif.linuxfoundation.org/v1
kind: SovereignRoutingPolicy
metadata:
  name: boreal-jurisdictional-cognitive-fence
spec:
  keyManagement:
    mode: "HYOK_EXTERNAL_HSM"
    hsmEndpoint: "pkcs11://hsm-mtl-01.internal.boreal.ca:5696"
    sessionTokenTtlSeconds: 300
  jurisdictionRules:
    - matchClassification: "C2_QUEBEC_LAW25_PII"
      allowedStateRegions: ["ca-central-montreal"]
      primaryInferenceTarget:
        provider: "frontier-cloud-ca-east"
        requireZeroDataRetention: true
        preInferenceFilter: "HMAC_FPE_PSEUDONYMIZER_V2"
      fallbackInferenceTarget: "boreal-sovereign-tee-mtl"
    - matchClassification: "C3_OSFI_E23_HIGH_MATERIALITY"
      allowedStateRegions:
        - "ca-central-montreal"
        - "ca-east-toronto"
      forbidPublicApiEndpoints: true
      primaryInferenceTarget:
        clusterId: "boreal-sovereign-tee-mtl"
        confidentialComputing:
          requireCpuTee: "AMD_SEV_SNP"
          requireGpuTee: "NVIDIA_CC_ON"
          attestationUrl: "https://attest.sec.boreal.ca/verify"
          runtimeSha256:
            "23bee86edf807c3dc40afc55e3c56076e409f8405b0cd850413e338ae081918b"
```

### 3. Chiffrement de charge utile dans l'orchestrateur (`Payload Codec`) et étanchéité des `KV-caches`

Sécuriser uniquement l'appel GPU ne suffit pas si le serveur d'orchestration durable conserve en clair les arguments et résultats d'activités dans sa base relationnelle ou Cassandra. Sur `Temporal` comme sur `Restate`, l'architecture souveraine impose un **encodeur cryptographique côté travailleur (*Client-Side Payload Codec*)** : avant qu'un état ne quitte le processus travailleur déployé dans le sous-réseau souverain de l'entreprise, chaque charge utile est chiffrée en **`AES-256-GCM`** au moyen d'une clé d'enveloppe (`DEK`) dérivée par sujet et scellée par le `HSM` local (`KEK` en régime `HYOK`). Ce découplage procure en prime un **effacement crypto-sélectif (*Crypto-Shredding*)** conforme au droit à l'oubli : révoquer la sous-clé d'un client rend ses historiques d'orchestration définitivement indéchiffrables sans altérer l'intégrité séquentielle du journal d'audit. Le plan de contrôle ne manipule que des blocs binaires opaques accompagnés de métadonnées de routage non sensibles (`saga_id`, `jurisdiction_zone`, `step_status`), rendant techniquement caduque toute réquisition adressée à son hébergeur.

Un soin identique s'applique à la mémoire vive des grappes d'inférence mutualisées. Lorsqu'un moteur comme `vLLM` ou `SGLang` met en œuvre le partage de préfixe (`Prefix Caching` / `RadixAttention`, Chapitre 14), **l'espace de hachage des blocs de `KV-cache` doit obligatoirement préfixer chaque clé de bloc par le couple `(tenant_id, jurisdiction_zone)`**. Sans ce salage cryptographique par locataire et juridiction, une attaque par canal auxiliaire temporel (*Timing Side-Channel* sur le `TTFT`) permettrait à un locataire malveillant partageant la même grappe de deviner si un préfixe réglementaire ou contractuel précis vient d'être traité par un autre département, ou provoquerait un recyclage involontaire de tenseurs entre zones juridiques distinctes. À l'extinction d'une session de classe `C3`, les pages `VRAM` et tampons `NVMe` de débordement sont explicitement remis à zéro (*Zeroization*) avant réallocation.

| Modèle de maîtrise cryptographique | Détenteur de la racine (`KEK`) | Visibilité de l'hébergeur Cloud sur le clair | Résistance à une injonction extraterritoriale | Cas d'usage cible dans le Compendium |
|---|---|---|---|---|
| **`Cloud KMS` natif** | Hyperscaler | Totale en mémoire ; accès clé possible | Faible (l'hébergeur peut déchiffrer) | Classe `C1` uniquement (données publiques) |
| **`BYOK`** (*Bring Your Own Key*) | Client (importée dans KMS Cloud) | Totale en mémoire GPU/CPU | Partielle (clé révocable, mais présente en Cloud) | Classe `C1+` / charges internes non PII |
| **`HYOK` + Pseudonymisation amont** | **`HSM` physique exclusif du client** | **Nulle sur les PII** (jetons opaques seuls) | **Forte** (la table de correspondance reste locale) | **Classe `C2` (`Loi 25`, contrats clients)** |
| **`HYOK` + Enclave CPU/GPU `TEE`** | **`HSM` client après attestation silicium** | **Nulle** (`VRAM` et bus PCIe chiffrés) | **Maximale** (isolation matérielle prouvée) | **Classe `C3` (`BSIF E-23` critique, R&D)** |

#### Extrait 27.2 — Encodeur `Payload Codec` `AES-256-GCM` sous clé `HYOK` pour moteur durable (`hyok_payload_codec.py`)

Exécuté exclusivement dans les travailleurs internes de la zone souveraine, ce codec garantit que le serveur d'orchestration ne persiste jamais une donnée métier déchiffrable par un tiers :

```python
import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM


class SovereignHyokPayloadCodec:
    def __init__(self, jurisdiction: str, hsm_client: object):
        self.jurisdiction = jurisdiction
        self._hsm = hsm_client

    def encode_state(
        self, raw_bytes: bytes, key_id: str
    ) -> dict:
        dek = self._hsm.derive_ephemeral_dek(
            key_id=key_id, zone=self.jurisdiction
        )
        nonce = os.urandom(12)
        aad = f"zone:{self.jurisdiction}|kid:{key_id}".encode()
        ciphertext = AESGCM(dek).encrypt(nonce, raw_bytes, aad)
        return {
            "encoding": "binary/aes256gcm-hyok-v1",
            "zone": self.jurisdiction,
            "key_id": key_id,
            "nonce_hex": nonce.hex(),
            "payload_hex": ciphertext.hex(),
        }

    def decode_state(self, envelope: dict) -> bytes:
        if envelope.get("zone") != self.jurisdiction:
            err = "CROSS_JURISDICTION_STATE_DENIED"
            raise PermissionError(err)
        key_id = envelope["key_id"]
        dek = self._hsm.derive_ephemeral_dek(
            key_id=key_id, zone=self.jurisdiction
        )
        nonce = bytes.fromhex(envelope["nonce_hex"])
        data = bytes.fromhex(envelope["payload_hex"])
        aad = f"zone:{self.jurisdiction}|kid:{key_id}".encode()
        return AESGCM(dek).decrypt(nonce, data, aad)
```

### 4. Indépendance des plongements vectoriels (*Sovereign Embeddings*) pour éviter la paralysie du RAG en mode DR

Un piège subtil mais fréquent ruine de nombreux plans `Cognitive DR` pourtant bien conçus sur le papier : l'entreprise prépare un modèle génératif de secours à poids ouverts, **mais ses cinquante millions de fragments documentaires et sa mémoire sémantique (`Graphiti`) ont été indexés à l'aide du modèle propriétaire d'embeddings du fournisseur primaire en panne**. Dès que l'API externe tombe, plus aucune requête utilisateur ne peut être vectorisée dans le même espace géométrique latent, rendant toute la mémoire d'entreprise instantanément aveugle.

La règle d'or de portabilité cognitive est donc formelle : **ne jamais dépendre d'une API propriétaire fermée pour la vectorisation (`Embeddings`) ni pour le reclassement (`Reranking`) des référentiels maîtres**. Les pipelines d'indexation utilisent dès le premier jour un modèle d'embeddings multilingue compact à poids ouverts figé et exécuté en interne (0,5B à 1,5B paramètres, latence `< 8 ms`), complété par la recherche lexicale déterministe `BM25`. Ainsi, lors d'une bascule `Cognitive DR`, 100 % des index vectoriels et des graphes demeurent immédiatement interrogeables sans aucune réindexation d'urgence.

---

## 27.3 Ingénierie du Cognitive Disaster Recovery (Cognitive DR) : survivre à la panne ou au retrait d'un modèle frontière

En gestion classique de la continuité d'activité, basculer une base `PostgreSQL` primaire vers sa réplique synchrone garantit un comportement bit à bit identique. **En ingénierie agentique, cette équivalence bit à bit n'existe pas entre deux familles de modèles** : remplacer dans l'urgence un modèle propriétaire `Fournisseur-A` victime d'une panne mondiale par un modèle à poids ouverts `Famille-B` sans préparation préalable provoque fréquemment une cascade d'échecs — arguments JSON `MCP` légèrement différemment structurés, verbosité modifiée faisant déborder un budget de jetons, ou propension accrue aux faux positifs d'escalade.

C'est pourquoi toute architecture soumise à des exigences de haute disponibilité ou à la supervision prudentielle (`BSIF E-23` / `DORA` en finance européenne) doit concevoir une véritable discipline de **reprise après sinistre cognitif (*Cognitive Disaster Recovery*, `Cognitive DR`)**.

### Les quatre piliers d'une bascule cognitive sans rupture (`RTO < 15 min`, `RPO = 0`)

1. **Normalisation stricte de la couche contrat (`Open Responses` + `MCP`) et purge des états opaques** : Aucun code applicatif de workflow n'appelle jamais le SDK propriétaire d'un vendeur de modèle. Toute requête d'inférence emprunte l'enveloppe normalisée **`Open Responses`** (gouvernée par l'`AAIF`), et toute invocation d'outil respecte les schémas JSON canoniques **`MCP`** validés par un parseur à décodage contraint (*Constrained Structured Decoding* / grammaires `CFG` sur la grappe de secours `vLLM`). Lors d'une bascule à mi-parcours d'une saga multi-tours, l'adaptateur `Open Responses` écarte automatiquement les blocs de délibération chiffrés propres au fournisseur défaillant (*opaque reasoning tokens*) et reconstruit le contexte du modèle de secours à partir du seul journal canonique des faits et sorties d'outils validés. Ainsi, même un modèle secondaire plus sobre demeure **mathématiquement incapable d'émettre un appel d'outil syntaxiquement invalide**.
2. **Double profil de consignes pré-compilé (*Dual-Compiled Prompt Bundles*)** : Chaque agent critique `L3` est homologué en CI/CD (Chapitre 22) sous **deux profils jumeaux versionnés ensemble** : son profil nominal optimisé pour le modèle primaire, et son profil de secours compilé spécifiquement (ex. via `DSPy`, voir Chapitre 31) pour un modèle à poids ouverts souverain audité et figé dans le registre interne d'artefacts de l'entreprise. L'homologation exige un score minimal \(\text{pass}^5_{\text{DR}} \ge 0{,}94 \cdot \text{pass}^5_{\text{nominal}}\) sur la suite \(\tau\)-bench du domaine.
3. **Grappe de secours *Warm-Standby* à montée en charge élastique** : Maintenir 100 % de la capacité GPU de pointe allumée à vide doublerait inutilement la facture FinOps. L'entreprise maintient un noyau minimal *Warm-Standby* hébergeant déjà ses `SLM` quotidiens (couvrant immédiatement les flux vitaux P0), assorti de réservations capacitaires prioritaires d'instances GPU souveraines capables de charger les poids pré-mis en cache local `NVMe` en moins de 180 secondes.
4. **Resserrement prudentiel automatique des seuils `HOTL` pendant le sinistre** : Tant que la fabrique opère sur son moteur cognitif secondaire de secours, le moteur de politique abaisse automatiquement de 15 à 25 % les plafonds financiers d'engagement autonome `L3`, routant temporairement les cas limites les plus subtils vers les superviseurs humains `HOTL` sans interrompre le flux majoritaire des opérations courantes (`RPO = 0` grâce à la mise en file durable `Temporal`).

Le temps de reprise cognitif effectif \(\text{RTO}_{\text{cog}}\) se modélise et se vérifie lors d'exercices trimestriels (*GameDays*) selon :

\[\text{RTO}_{\text{cog}} = t_{\text{détection}} + t_{\text{quiescence}} + \max\bigl(t_{\text{warmup}}^{\text{GPU}},\, t_{\text{switch}}^{\text{gateway}}\bigr) + t_{\text{canary}}^{\text{santé}} \le 15\text{ min}\]

#### Extrait 27.3 — Orchestrateur de bascule `Cognitive DR` sans perte de transaction (`cognitive_dr_switch.py`)

Ce contrôleur coordonne la suspension propre des activités `Temporal` en vol, la commutation vers le profil pré-homologué à poids ouverts et l'ajustement prudentiel des seuils `Cedar` :

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class ModelHealthMetrics:
    error_rate_5m: float
    p95_ttft_ms: int
    consecutive_429_or_5xx: int
    provider_deprecation_flag: bool


@dataclass(frozen=True)
class DrFailoverPlan:
    activate_dr: bool
    target_profile_id: str
    hotl_threshold_multiplier: float
    reason: str


def evaluate_cognitive_dr_trigger(
    metrics: ModelHealthMetrics,
    dr_pass5_score: float,
) -> DrFailoverPlan:
    unhealthy = (
        metrics.provider_deprecation_flag
        or metrics.error_rate_5m >= 0.08
        or metrics.p95_ttft_ms >= 12000
        or metrics.consecutive_429_or_5xx >= 25
    )
    if not unhealthy:
        return DrFailoverPlan(
            activate_dr=False,
            target_profile_id="PRIMARY_FRONTIER_V2027",
            hotl_threshold_multiplier=1.0,
            reason="NOMINAL_HEALTH",
        )

    if dr_pass5_score < 0.90:
        return DrFailoverPlan(
            activate_dr=True,
            target_profile_id="SAFE_HOLD_L2_HUMAN_QUEUE",
            hotl_threshold_multiplier=0.0,
            reason="DR_MODEL_BELOW_SAFETY_FLOOR",
        )

    return DrFailoverPlan(
        activate_dr=True,
        target_profile_id="SOVEREIGN_OPEN_WEIGHTS_70B_INT8",
        hotl_threshold_multiplier=0.80,
        reason="AUTOMATIC_COGNITIVE_DR_FAILOVER",
    )
```

::: {.encadre-sectoriel title="Institutions Financières (BSIF E-23 & B-10 / DORA UE) — Tester le risque de concentration cognitive"}

Depuis mai 2027 au Canada (`BSIF E-23` conjuguée à `B-10`) et sous le règlement `DORA` en Europe, dépendre d'une seule API de modèle externe pour l'octroi de crédit, la gestion des sinistres ou la surveillance anti-fraude constitue un **risque de concentration de tiers critique**. Les inspecteurs exigent désormais la preuve documentée d'au moins **un exercice annuel de débranchement réel (*Live Disconnect Drill*)** prouvant que la coupure franche du fournisseur principal de LLM ne provoque ni corruption comptable, ni violation de délai réglementaire de déclaration, ni fuite de données vers une région de repli hors juridiction.

:::

---

## 27.4 Application au fil rouge : architecture souveraine Québec–Canada–UE et exercice GameDay chez Groupe Boréal

Examinons comment **Groupe Boréal Inc.** a mis à l'épreuve sa souveraineté cognitive et son plan `Cognitive DR` juste avant l'audit prudentiel du printemps 2027.

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Cloisons souveraines Loi 25 / UE et bascule Cognitive DR en 11 minutes"}

**Défi réglementaire et opérationnel** : Chez **Boréal Capital & Assurances (BCA)**, les sagas d'indemnisation manipulent des états financiers non publics et des dossiers personnels québécois (`Loi 25` classe `C2`/`C3`), tandis que les filiales allemande et française de **BSN** sont contractuellement liées à quatre grands industriels européens interdisant tout traitement hors d'un *EU Sovereign Cloud* détenu et opéré sous droit européen. Lors d'un incident réel fin janvier 2027, une panne d'authentification de 3 h 40 chez un fournisseur américain de modèle frontière avait gelé les files d'analyse contractuelle de niveau 3.

**Architecture déployée** :
1. **Trois cellules souveraines d'état et `Payload Codec` `Temporal`** : Boréal a cloisonné ses plans d'état en trois cellules étanches : **Montréal (`QC/CA`)**, **Francfort (`UE souverain`)** et **Chicago (`US`)**. Tous les journaux `Temporal` et graphes `Graphiti` sont chiffrés avec des clés conservées dans deux `HSM` physiques détenus par Boréal à Montréal et Francfort (`HYOK`).
2. **Inférence `TEE` et pseudonymisation `HMAC-FPE`** : Pour les dossiers `C3` de souscription `BSIF E-23`, l'inférence tourne exclusivement sur une grappe d'enclaves `NVIDIA H100 Confidential Computing` hébergée au Québec avec attestation distante vérifiée à chaque démarrage. Pour les cas `C2`, le filtre `HMAC-FPE` sur `agentgateway` pseudonymise 100 % des entités nominatives avant tout appel externe.
3. **Protocole `Cognitive DR` bimodèle** : Chaque saga critique dispose d'un profil jumeau homologué en CI/CD sur un modèle à poids ouverts de 70 milliards de paramètres servi par `SGLang` avec décodage grammatical contraint `MCP`.

**Exercice *GameDay* audité (Avril 2027)** :
En plein mardi ouvrable à 10 h 30, l'équipe SRE a coupé au pare-feu l'accès sortant vers le fournisseur de modèle primaire :
* Détection par `agentgateway` en **28 secondes** ; quiescence sans perte (`RPO = 0`) des 142 sagas en cours sur `Temporal`.
* Montée en charge des nœuds GPU souverains à Montréal et Francfort et commutation des profils en **11 minutes et 14 secondes** (`RTO < 15 min` respecté).
* Maintien de **96,4 %** de réussite bout en bout (`pass^5`), avec resserrement automatique de 20 % des seuils d'escalade vers les souscripteurs `HOTL` pendant les quatre heures de l'exercice, validant sans réserve le volet continuité du dossier `BSIF E-23`.

:::

---

## 27.5 Décision d'architecture normative et points de contrôle

La décision `ADR-027` grave dans le marbre l'indépendance juridictionnelle et fournisseur de la fabrique agentique.

::: {.adr title="ADR-027 — Géofencing de l'état complet, inférence confidentielle HYOK/TEE et reprise après sinistre cognitif bimodèle"}

* **Statut** : Acceptée | **Périmètre** : Infonuagique, Sécurité, Données & Continuité d'Activité | **Révision** : Semestrielle
* **Contexte** : Dépendre d'un seul fournisseur infonuagique de modèles frontières expose l'organisation aux conflits extraterritoriaux (`CLOUD Act` vs `Loi 25` / `RGPD`), à la persistance involontaire de données dans les `KV-caches` et journaux d'orchestration, ainsi qu'à l'arrêt complet des processus métiers lors d'une panne ou dépréciation d'API.
* **Options évaluées** :
  1. *Dépendance mono-fournisseur avec clauses contractuelles standards* : **Rejetée** — insuffisante techniquement face aux pannes régionales et au risque de concentration `BSIF E-23` / `B-10`.
  2. *Interdiction totale des modèles infonuagiques au profit exclusif de petits modèles sur site* : **Rejetée** — pénalise la qualité de raisonnement sur les cas complexes non sensibles ou correctement pseudonymisés.
  3. *Cloisonnement juridictionnel des 6 couches d'état sous clé `HYOK`, enclaves GPU `TEE` pour la classe `C3`, et homologation CI/CD obligatoire d'un profil de secours Open-Weights souverain (`RTO < 15 min`)*. **Retenue**.
* **Décision** : (a) Interdire tout transfert hors juridiction des journaux durables, mémoires vectorielles/graphes et `KV-caches` des classes `C2`/`C3` ; (b) exiger `HYOK` (pseudonymisation `HMAC-FPE` ou enclave `TEE` attestée) ; (c) bloquer en CI/CD toute saga critique `L3`/`L4` dépourvue d'un profil de secours *Open-Weights* atteignant \(\ge 94\,\%\) du \(\text{pass}^5\) nominal et testé trimestriellement.
* **Conséquences** : Conformité souveraine démontrable mathématiquement et résilience totale aux pannes ou hausses tarifaires d'hyperscalers, moyennant le maintien d'une capacité GPU souveraine *Warm-Standby* et une double validation CI/CD.

:::

### Liste de contrôle de mise en production — Chapitre 27

1. **Cartographie des 6 substrats d'état** : Les journaux `Temporal`/`Restate`, graphes mémoire, index vectoriels, `KV-caches`, courtiers d'événements et traces `OTel` résident-ils tous physiquement dans la juridiction légale requise ?
2. **Chiffrement `HYOK` et `Payload Codec`** : Les charges utiles d'orchestration et les index vectoriels sont-ils chiffrés avec des clés détenues dans un `HSM` sous contrôle exclusif de l'entreprise ?
3. **Pseudonymisation déterministe amont** : Les requêtes de classe `C2` routées vers une API externe subissent-elles une tokenisation réversible locale et bénéficient-elles d'un engagement contractuel `Zero-Data-Retention` ?
4. **Attestation matérielle GPU `TEE`** : Pour les charges critiques `C3` en infonuagique, le `HSM` vérifie-t-il automatiquement le rapport d'attestation silicium CPU+GPU avant de libérer les clés de session ?
5. **Abstraction `Open Responses` et décodage contraint** : Le code métier est-il exempt d'appels SDK propriétaires et la grappe de secours impose-t-elle le respect grammatical strict des schémas `MCP` ?
6. **Double homologation CI/CD** : Chaque agent critique possède-t-il un profil de consignes secondaire validé sur un modèle *Open-Weights* souverain avec un score \(\text{pass}^5\) supérieur au seuil minimal ?
7. **Ajustement prudentiel en mode dégradé** : La bascule `Cognitive DR` resserre-t-elle automatiquement les plafonds d'autonomie `L3` au profit d'une supervision `HOTL` accrue ?
8. **Exercice *GameDay* trimestriel** : La déconnexion réelle du fournisseur primaire a-t-elle été testée avec preuve d'un `RTO < 15 min` et d'un `RPO = 0` ?
