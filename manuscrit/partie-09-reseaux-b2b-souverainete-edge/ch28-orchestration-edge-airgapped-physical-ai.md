# Chapitre 28 — Orchestration Edge, opérations déconnectées (Air-Gapped) et passerelles Physical AI

::: {.synthese-executive title="Synthèse exécutive — Chapitre 28"}

* **Enjeu stratégique** : Dans l'extraction minière, la production hydroélectrique, le transport maritime, la défense, l'agroalimentaire ou les entrepôts hautement robotisés, la liaison vers le nuage central est soit inexistante par cloisonnement de sûreté (*Air-Gap*), soit sujette à des coupures de plusieurs heures ou plusieurs jours (météo extrême, perte de faisceau satellite, sectionnement de fibre). Un système agentique dont le moteur d'état, les politiques d'autorisation ou le modèle de raisonnement exigent un aller-retour infonuagique immobilise instantanément l'outil industriel au moment précis où l'autonomie locale est la plus vitale.
* **Décisions architecturales structurantes** :
  1. *Irréversible pour les sites distants* : Concevoir chaque site industriel comme une **cellule autonome à survie locale (*Local-First Autonomous Cell*)** embarquant ses propres `SLM` quantifiés (`3B`–`8B` en `INT4`/`FP8`), son runtime durable léger, son point de décision `Cedar` local et son serveur `SPIRE` adossé à une puce matérielle `TPM 2.0`.
  2. *Structurante pour l'intégrité des données* : Remplacer les verrous synchrones distants par des **types de données répliqués sans conflit (`CRDT`)** assortis d'**enveloppes de quotas pré-allouées (*Bounded Escrow Quotas*)** pour réconcilier mathématiquement les sagas au retour de la connectivité WAN sans double dépense.
  3. *Inviolable en sûreté physique (`ISO 10218` / `IEC 61508`)* : Interdire tout pilotage direct d'actionneurs robotiques par un modèle neuronal ; raccorder l'orchestration d'entreprise à **`ROS 2` (`DDS`)** au travers d'une **architecture matérielle `Simplex`** où un contrôleur temps réel déterministe certifié coupe instantanément la consigne adaptative à la moindre approche de l'enveloppe cinématique de sécurité.
* **Indicateurs de gouvernance** : Autonomie nominale sans liaison WAN garantie (\(\ge 72\text{ h}\)), taux de conflits non résolus automatiquement à la reconnexion (`< 0,2 %`), latence locale de décision d'enveloppe de sécurité (\(\le 1\text{ ms}\) sur microcontrôleur dédié) et 100 % des paquets `Edge` vérifiés par signature `TUF` / `Sigstore`.

:::

## 28.1 Architectures Local-First et Air-Gapped : autonomie sur connectivité intermittente et réconciliation CRDT

Le Chapitre 17 a posé les bases de la convergence `IT/OT` lorsque l'usine demeure reliée au système d'information central à travers les zones de sécurité du modèle Purdue. Franchissons maintenant un cran supplémentaire d'exigence opérationnelle : **que devient l'orchestration multi-agents lorsque le lien WAN tombe pendant quarante-huit heures en plein hiver boréal, ou lorsque la réglementation sectorielle impose un isolement physique quasi permanent (*Air-Gapped* / diode unidirectionnelle) ?**

### Les trois défaillances fatales d'un agent « Cloud-Assumed » projeté en périphérie

Déployer un agent conçu pour l'infonuagique sur un site industriel distant provoque trois blocages immédiats dès la première perte de porteuse satellite ou cellulaire privée :

1. **L'asphyxie d'identité et de politique** : Si le renouvellement des certificats `NHI` (`SVID` de 15 minutes) ou la récupération des politiques `OPA`/`Cedar` dépend d'un serveur central distant, tous les agents locaux basculent en refus d'accès au bout d'un quart d'heure — arrêtant les opérations alors même que le matériel local est intact.
2. **La divergence irréconciliable d'état partagé (*Split-Brain*)** : Pendant la coupure, l'agent local du site minier consomme trois roulements de rechange du magasin local et réaffecte deux techniciens, tandis qu'au siège social, le planificateur central réserve ces mêmes pièces pour une maintenance programmée la semaine suivante. Au retour du réseau, une synchronisation naïve par écrasement (*Last-Write-Wins*) corrompt l'inventaire ERP et fausse la comptabilité matière.
3. **La saturation du lien de retour (*Reconnect Thundering Herd*)** : Lorsque la liaison satellite à bande passante limitée réapparaît enfin, si trente agents locaux tentent simultanément de pousser quarante-huit heures de journaux `OpenTelemetry` verbeux et d'historiques d'inférence, ils saturent le lien et empêchent le passage des ordres prioritaires de sécurité et de réapprovisionnement.

### Cellule cognitive embarquée et synchronisation éventuelle déterministe (`CRDT` + Quotas d'Escrow)

Une architecture **`Local-First` industrielle** inverse la hiérarchie : **le nœud `Edge` est le système maître de sa réalité physique immédiate ; le nuage central agit comme agrégateur asynchrone, curateur de modèles et réconciliateur inter-sites**.

![Architecture d'orchestration Edge déconnectée : cellule locale SLM + CRDT sur coupure WAN 72 h, passerelle MCP vers ROS 2 (DDS) et enveloppe cyber-physique Simplex.](manuscrit/figures/fig-28-edge-airgapped-physical-ai.svg)

Sur une passerelle industrielle durcie (typiquement biprocesseur redondant sans ventilateur doté d'accélérateurs basse consommation `NVIDIA Jetson Thor / IGX` ou `NPU` serveur de 35 à 150 W), la pile autonome réunit quatre briques :

* **Inférence et durabilité embarquées** : Deux modèles spécialisés quantifiés (`SLM 4B` d'extraction/routage et `SLM 8B` de diagnostic technique en `INT4 AWQ`) tournent localement avec une latence déterministe inférieure à 80 ms, pilotés par une instance locale légère de runtime durable (`Restate` mono-binaire Rust ou travailleur `Temporal` sur magasin transactionnel `SQLite WAL` / `RocksDB` répliqué en paire haute disponibilité locale).
* **Racine de confiance matérielle locale (`TPM 2.0` + `SPIRE` imbriqué)** : Une autorité `SPIRE` intermédiaire locale, scellée dans la puce `TPM 2.0` du châssis industriel avec une validité de certificat intermédiaire de 30 jours, continue d'émettre et de faire tourner toutes les dix minutes les jetons courts des agents locaux en totale coupure WAN.
* **État partagé sans conflit par `CRDT` et quotas d'escrow bornés (*Bounded Escrow*)** : Au lieu de manipuler directement un solde entier écrasable, les ressources partagées entre le nuage et les sites périphériques sont modélisées par des **types répliqués convergents (`CRDT` — *Conflict-Free Replicated Data Types*)** associés à des **baux de capacité pré-alloués** :
  * Un compteur **`PN-Counter`** additionne séparément les incréments et décréments signés par chaque nœud \(i\) : la fusion mathématique par maximum composante par composante est commutative, associative et idempotente (\(S_A \sqcup S_B = S_B \sqcup S_A\)).
  * Pour éviter qu'un site isolé n'engage plus de budget ou de stock global qu'il n'en existe réellement, chaque nœud `Edge` détient une **enveloppe d'escrow locale pré-réservée** \(Q_i^{\text{local}}\) telle que \(\sum_{i=1}^{N} Q_i^{\text{local}} \le Q_{\text{global}} - M_{\text{sécurité}}\). Tant que ses décisions locales restent sous \(Q_i^{\text{local}}\), le site opère avec **zéro coordination réseau et zéro risque de violation d'invariant global**.
* **Reprise réseau par file de priorité stricte (*QoS Store-and-Forward*)** : À la reconnexion, un ordonnanceur écoule d'abord les alertes critiques et deltas `CRDT` (quelques kilo-octets en `Protobuf`), puis les résumés de sagas clôturées, et enfin — uniquement aux heures creuses — les lots compressés de télémétrie `OpenTelemetry`.

#### Extrait 28.1 — Magasin d'escrow hors ligne à convergence `CRDT` sans double dépense (`edge_crdt_escrow.py`)

Ce composant permet à un agent `Edge` déconnecté d'autoriser localement des sorties de pièces ou des dépenses d'urgence sans jamais pouvoir violer le plafond global d'entreprise lors de la reconnexion :

```python
from dataclasses import dataclass, field


@dataclass
class BoundedPnCounterEscrow:
    node_id: str
    granted_quota: dict[str, int] = field(default_factory=dict)
    consumed: dict[str, int] = field(default_factory=dict)

    def remaining_local_budget(self, node: str) -> int:
        granted = self.granted_quota.get(node, 0)
        used = self.consumed.get(node, 0)
        return granted - used

    def try_commit_offline(self, units: int) -> tuple[bool, str]:
        if units <= 0:
            return (False, "INVALID_NON_POSITIVE_UNITS")
        avail = self.remaining_local_budget(self.node_id)
        if units > avail:
            msg = f"OFFLINE_ESCROW_EXCEEDED:avail={avail}"
            return (False, msg)
        self.consumed[self.node_id] = (
            self.consumed.get(self.node_id, 0) + units
        )
        return (True, f"COMMITTED_LOCAL:rem={avail - units}")

    def merge_peer_state(
        self, peer: "BoundedPnCounterEscrow"
    ) -> "BoundedPnCounterEscrow":
        merged_grants = dict(self.granted_quota)
        for k, v in peer.granted_quota.items():
            merged_grants[k] = max(merged_grants.get(k, 0), v)

        merged_consumed = dict(self.consumed)
        for k, v in peer.consumed.items():
            prev = merged_consumed.get(k, 0)
            merged_consumed[k] = max(prev, v)

        return BoundedPnCounterEscrow(
            node_id=self.node_id,
            granted_quota=merged_grants,
            consumed=merged_consumed,
        )
```

### Dimensionnement matériel, enveloppe thermique et quantification mixte sur nœuds durcis

Contrairement à une salle informatique climatisée disposant de baies de 40 kW, une sous-station électrique, un quai minier ou un navire impose des contraintes environnementales sévères : refroidissement passif sans ventilateur (*Fanless*, étanchéité `IP65` contre les poussières métalliques conductrices), plage thermique de \(-25\,^\circ\text{C}\) à \(+60\,^\circ\text{C}\), alimentation secourue par batteries `24 V DC` et enveloppe électrique stricte souvent plafonnée sous 75 à 180 watts.

Faire tourner une cellule multi-agents fiable dans un tel budget énergétique repose sur trois arbitrages d'ingénierie matérielle et numérique :

1. **Quantification sensible à l'activation (`AWQ` / `FP8`) validée sur les appels d'outils** : Compresser brutalement tous les poids d'un `SLM` en `INT4` uniforme dégrade fréquemment la précision syntaxique des arguments JSON `MCP` et des identifiants alphanumériques de pièces. L'approche industrielle conserve en précision `FP16`/`FP8` le 1 % de canaux saillants (*Activation-aware Weight Quantization*) ainsi que les têtes de sortie grammaticale, permettant de loger un modèle `8B` complet et un contexte de `16 384` jetons dans moins de **6,8 Go de mémoire unifiée**, sans perte mesurable sur la suite \(\tau\)-bench locale.
2. **Exécution événementielle à mise en veille GPU instantanée (*Burst Inference*)** : Un agent `Edge` ne doit jamais scruter des capteurs en boucle continue par inférence neuronale. Un pré-filtre déterministe léger (seuils spectraux `FFT` en `Rust` consommant moins de 2 W sur CPU) surveille en permanence les flux `OPC-UA` / `MQTT` à 1 kHz et ne réveille l'accélérateur neuronal `SLM` que lorsqu'une anomalie franchit l'enveloppe statistique nominale — maintenant le facteur de marche énergétique moyen sous 8 % et évitant tout étranglement thermique (*Thermal Throttling*).
3. **Protocole de réconciliation post-coupure à deux phases** : Lorsque la liaison satellite ou fibre se rétablit après cinquante heures d'isolement, les nœuds ne rouvrent pas immédiatement les vannes complètes aux commandes centrales. Une phase transitoire de **synchronisation d'horizon (`ANTI_ENTROPY_SYNC`)** fusionne d'abord les compteurs `CRDT`, recalcule dans l'ERP central les réapprovisionnements déclenchés par la consommation des quotas d'escrow locaux, renouvelle les baux d'escrow \(Q_i^{\text{local}}\) pour le cycle suivant et vérifie l'éventuelle révocation d'identités dans la liste centrale avant de repasser le site en mode fédéré nominal.

| Profil de nœud `Edge` industriel | Enveloppe électrique & thermique | Capacité cognitive locale type | Autonomie hors WAN & Usage cible |
|---|---|---|---|
| **Passerelle rail DIN *Fanless* (`IP65`)** | 35–65 W (`-25 °C` à `+60 °C`) | `SLM 3B–4B INT4` + `Cedar` + `SQLite` | **72 h+** — Sous-station électrique, tête de puits, écluse |
| **Serveur `Edge` durci d'atelier / mine** | 150–300 W (redondance `N+1` locale) | Paire `SLM 8B AWQ` + `Restate` + `ROS 2` | **7 à 14 jours** — Mine nordique, usine isolée, navire |
| **Calculateur embarqué sur robot `AMR`** | 25–45 W sur batterie `LiFePO4` | Politique `Nav2`/`VLA` locale + `MCU SIL 3` | **Quart complet 10 h** — Chariot autonome sans Wi-Fi continu |

---

## 28.2 Pont protocolaire vers la Physical AI : intégration MCP / A2A ↔ ROS 2 (DDS) et architecture matérielle Simplex

En 2027, les centres logistiques, les usines d'assemblage et les chantiers d'infrastructure voient converger deux mondes logiciels longtemps étrangers l'un à l'autre : au-dessus, la couche d'orchestration d'entreprise parlant **`A2A v1.0`** et **`MCP`** en JSON-RPC sur HTTP ; au-dessous, la flotte de robots mobiles autonomes (**`AMR`**), de chariots élévateurs automatisés et de cellules robotisées orchestrée sous **`ROS 2` (*Robot Operating System 2*, distributions *Jazzy* / *Kilted*)** communiquant en temps réel sur le bus pub/sub **`OMG DDS` (*Data Distribution Service*)** ou **`Eclipse Zenoh`**.

### La frontière d'abstraction impérative : missions sémantiques vs boucles d'asservissement

L'erreur d'architecture la plus dangereuse en robotique agentique consiste à laisser un modèle de langage émettre directement des consignes continues de bas niveau (vitesses linéaires `cmd_vel`, angles articulaires ou couples moteurs) sur un topique `DDS`. Un `LLM` ou même un `SLM` embarqué présente une gigue temporelle de plusieurs dizaines de millisecondes et reste sujet à des hallucinations spatiales incompatibles avec l'inertie physique d'un chariot de deux tonnes croisant un cariste humain.

Le pont certifiable **`MCP` / `A2A` ↔ `ROS 2`** impose par conséquent un découplage strict en trois couches :

1. **Couche Entreprise (`A2A v1.0` → Gestionnaire de Flotte `Open-RMF`)** : La saga logistique délègue un objectif métier de haut niveau (*« Transférer la palette `PAL-8841` de la travée `B-14` vers le quai d'expédition `Q-03` avant 14 h 20, priorité haute, colis fragile »*).
2. **Passerelle Sémantique `MCP-ROS2` (Validation géométrique et traduction en *ROS 2 Actions*)** : Exposant uniquement des primitives discrètes de haut niveau (`NavigateToNamedWaypoint`, `InspectGaugeAtPose`, `DockAtStation`), la passerelle vérifie d'abord l'existence du point de passage dans le graphe topologique homologué du bâtiment, l'absence de consignation de sécurité (*Lockout/Tagout*) dans le registre `Cedar`, et l'état batterie du robot avant d'instancier un objectif typé **`ROS 2 Action`** (`Goal` → `Feedback` périodique → `Result`) avec profil de qualité de service `DDS` déterministe (`RELIABLE`, `DEADLINE = 50 ms`).
3. **Architecture Matérielle `Simplex` sous norme `ISO 10218` / `IEC 61508`** : Au sein même du robot ou de la cellule physique, lorsque des contrôleurs adaptatifs avancés (planificateurs `Nav2` ou politiques locales **Vision-Langage-Action `VLA`** de manipulation) sont employés pour saisir des pièces irrégulières, leurs commandes traversent obligatoirement un **arbitre matériel déterministe** logé sur un microcontrôleur temps réel séparé (`MCU Safety PLC`, boucle à \(1\text{ ms}\)).

Cet arbitre évalue en continu l'invariant de distance d'arrêt sécuritaire en fonction de la vitesse instantanée \(v(t)\), de la vitesse maximale d'approche humaine \(v_h\), du temps de réaction matériel \(t_r\) et de la décélération minimale garantie \(a_{\min}\) sur sol humide :

\[d_{\text{sécurité}}(t) = \left(v(t) + v_h\right) t_r + \frac{v(t)^2}{2\,a_{\min}} + d_{\text{marge}} \le d_{\text{LiDAR}}(t)\]

Dès que \(d_{\text{LiDAR}}(t)\) s'approche de \(d_{\text{sécurité}}(t)\) ou qu'une commande viole les butées articulaires, l'arbitre coupe physiquement le multiplexeur du contrôleur IA et bascule en moins d'une milliseconde sur le **contrôleur de repli certifié (`SIL 3` / `PL d`)** jusqu'à l'arrêt sûr complet.

#### Extrait 28.2 — Garde-fou déterministe de passerelle `MCP ↔ ROS 2` vérifiant consignation `LOTO` et enveloppe `Simplex` (`mcp_ros2_guard.py`)

Avant de traduire l'appel d'outil d'un agent logistique en objectif `ROS 2 Action` sur le bus `DDS`, la passerelle vérifie de manière synchrone l'absence de cadenassage humain (*Lockout/Tagout*), la validité du point de passage et le battement de cœur matériel du moniteur `Simplex` :

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class PlantSafetyState:
    approved_waypoints: frozenset[str]
    active_loto_zones: frozenset[str]
    simplex_heartbeat_age_ms: int
    battery_soc_pct: float


def validate_ros2_mission_goal(
    waypoint_id: str,
    zone_id: str,
    state: PlantSafetyState,
) -> tuple[bool, str]:
    if state.simplex_heartbeat_age_ms > 5:
        return (False, "ABORT_SIMPLEX_HEARTBEAT_STALE")
    if zone_id in state.active_loto_zones:
        return (False, f"DENY_ZONE_UNDER_HUMAN_LOTO:{zone_id}")
    if waypoint_id not in state.approved_waypoints:
        return (False, f"DENY_UNKNOWN_WAYPOINT:{waypoint_id}")
    if state.battery_soc_pct < 18.0:
        return (False, "REDIRECT_MANDATORY_CHARGER_DOCK")
    return (True, f"DISPATCH_DDS_ACTION:{waypoint_id}")
```

### Gradation temporelle de l'autonomie hors réseau : de 0 à > 72 heures

Même équipée de `SLM` locaux et de compteurs `CRDT`, une cellule industrielle isolée voit l'incertitude sur son environnement global croître avec la durée de coupure (tarifs douaniers obsolètes, certificats `CRL` non rafraîchis, épuisement des quotas d'escrow). L'orchestrateur local applique donc une **courbe d'atténuation progressive d'autonomie** : de `0 à 24 h`, pleine autonomie nominale `L3` sur le périmètre local ; de `24 à 72 h`, gel des engagements externes différés et recentrage sur le maintien en condition opérationnelle et la sécurité ; au-delà de `72 h`, bascule ordonnée en mode consultatif assisté `L1`/`L2` où le chef de quart sur site cosigne localement les sorties majeures de magasin jusqu'au rétablissement des communications.

| Couche du pont cyber-physique | Protocole & Cadence | Nature du composant | Niveau de sûreté & responsabilité |
|---|---|---|---|
| **Saga métier & flotte** | `A2A v1.0` / `MCP` (\(0{,}5\text{–}5\text{ s}\)) | Runtime durable + `SLM` local | Cohérence métier, priorités, quotas |
| **Passerelle `MCP ↔ ROS 2`** | `DDS` / `Zenoh` Actions (\(20\text{–}50\text{ ms}\)) | Traducteur déterministe Rust/C++ | Validation waypoints, consignations LOTO |
| **Planification locale / `VLA`** | Bus interne robot (\(10\text{–}30\text{ ms}\)) | `Nav2` / politique neuronale locale | Efficacité trajectoire et préhension (non-SIL) |
| **Arbitre `Simplex` & Arrêt sûr** | Bus terrain `PROFIsafe` / `FSoE` (\(\le 1\text{ ms}\)) | Microcontrôleur sécurité matériel isolé | **Vie humaine & intégrité machine (`IEC 61508`)** |

---

## 28.3 Gestion de flotte distribuée : déploiement signé hors ligne (TUF / Sigstore) des poids, politiques et Agent Skills

Exploiter cinquante ou cinq cents nœuds `Edge` autonomes répartis dans des usines, des mines ou des sous-stations électriques crée une surface d'attaque redoutable sur la chaîne d'approvisionnement logicielle (`OWASP ASI04`). Si un attaquant parvient à altérer une mise à jour de paquet `Agent Skills`, d'un bundle de règles `Cedar` ou d'un adaptateur de poids `LoRA` sur une clé USB de maintenance (pour les sites *Air-Gapped*) ou lors d'un transfert intermittent, il prend le contrôle simultané d'agents opérant au contact direct d'équipements physiques.

La distribution vers la périphérie applique par conséquent le cadre **`TUF` (*The Update Framework*, CNCF)** combiné aux signatures sans clé éphémère **`Sigstore` / `cosign`** :

* **Manifeste atomique multi-artefacts (*Signed Edge Bundle*)** : Un nœud `Edge` ne met jamais à jour isolément un prompt sans le binaire d'outil `MCP` et le jeu de politiques `Cedar` avec lesquels il a été homologué en CI/CD. L'ensemble forme une archive immuable adressée par contenu (`OCI Artifact`), signée hors ligne par au moins deux rôles distincts (Ingénierie Plateforme et Sécurité `OT`) avec une date d'expiration anti-rejeu (*Freeze Attack Protection*).
* **Transport agnostique (Satellite, `Zenoh` ou support physique *Sneakernet*)** : Parce que la confiance réside dans la chaîne cryptographique `TUF` vérifiée contre les clés racines scellées dans le `TPM 2.0` de la passerelle industrielle — et non dans le tuyau de transport —, le même bundle peut être téléchargé sur une fenêtre satellite nocturne de vingt minutes ou importé via une diode optique sur un site *Air-Gapped* classifié.
* **Activation atomique `A/B` avec *Watchdog* d'auto-retour arrière** : Le bundle s'installe sur la partition passive `B`. Au redémarrage des travailleurs locaux, une sonde locale exécute dix scénarios synthétiques de santé en trente secondes ; au moindre échec d'inférence ou de connexion `DDS`, le *watchdog* matériel rebascule instantanément sur la partition `A` saine précédente.

#### Extrait 28.3 — Manifeste de déploiement `Edge` signé `TUF` et garde-fou `MCP-ROS2` (`edge-fleet-bundle.yaml`)

Ce descripteur scelle conjointement le `SLM` quantifié, l'espace de waypoints autorisés pour la passerelle `ROS 2` et la politique de repli hors ligne :

```yaml
apiVersion: edge.aaif.linuxfoundation.org/v1
kind: SignedEdgeAutonomousBundle
metadata:
  bundleId: "boreal-edge-nordqc-2027.09.2"
  expiresUtc: "2027-12-31T23:59:59Z"
  tufThresholdSignatures: 2
spec:
  artifacts:
    slmWeights:
      modelId: "boreal-diag-slm-8b-awq-int4"
      ociDigest: "sha256:4a91e8c02b77d4198f3a1105c72e904d"
    cedarPolicyBundle:
      version: "2027.09.2"
      ociDigest: "sha256:7d3b20f491a8c65e012b9944e1c833a1"
    offlineSkillsPack:
      skills: ["compressor-vib-triage", "inventory-crdt-reserve"]
      ociDigest: "sha256:1c88f502a3d94e71b60582c3f90412be"
  ros2BridgeConstraints:
    ddsDomainId: 42
    allowedActionTypes: ["NavigateToWaypoint", "DockCharger"]
    waypointsMapSha256: "8e20c41f77a93b10d5228c64a019e773"
    forbidRawVelocityTopics: true
    requireHardwareSimplexHeartbeatMs: 5
  offlineAutonomyPolicy:
    maxDisconnectedHoursBeforeL1Downgrade: 72
    localEmergencySpendCapCad: 5000
```

::: {.encadre-sectoriel title="Mines, Énergie & Infrastructures Isolées — Continuité sous norme NERC CIP et sites nordiques"}

Dans les postes de transport électrique soumis aux normes **`NERC CIP`** en Amérique du Nord ou sur les sites miniers souterrains du Bouclier canadien, aucune connexion entrante initiée depuis l'infonuagique n'est permise vers le réseau d'exploitation. L'architecture décrite ici satisfait intégralement cette exigence : les agents diagnostiquent et coordonnent localement la maintenance en circuit fermé pendant des semaines, n'exportant vers l'entreprise que des résumés signés à travers une passerelle d'extraction contrôlée lors des fenêtres autorisées, sans qu'aucune panne infonuagique ne puisse jamais perturber le site physique.

:::

---

## 28.4 Application au fil rouge : autonomie 72 heures dans le Nord-du-Québec et entrepôt robotisé Montréal-Est

Voyons comment **Groupe Boréal Inc.** déploie cette architecture périphérique conjointement chez **BSN** (sites clients isolés) et **BEL** (entrepôt central robotisé).

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Sites miniers déconnectés au Nunavik et flotte AMR sous ROS 2 à Montréal-Est"}

**Deux terrains critiques** :
1. **Sites miniers clients de BSN au Nord-du-Québec (Nunavik / Côte-Nord)** : Quatorze complexes miniers exploitent des concasseurs et compresseurs lourds Boréal sous contrat de disponibilité garantie à 99,5 %. En février 2027, un blizzard majeur combiné à une coupure de fibre régionale a isolé un site pendant **51 heures** ; l'ancien agent de diagnostic infonuagique étant injoignable, une dérive thermique non arbitrée a entraîné la casse d'un réducteur principal (`380 000 \$ CAD` de pénalité et remplacement).
2. **Centre de distribution robotisé BEL de Montréal-Est** : 38 robots mobiles autonomes (`AMR` sous `ROS 2 Jazzy`) préparent les commandes de pièces urgentes 24/7 aux côtés de 60 techniciens logistiques humains.

**Architecture déployée** :
* **Boîtiers `Edge` durcis sur sites miniers** : BSN a déployé sur chaque site client nordique un serveur industriel biprocesseur redondant exécutant un `SLM 8B INT4` distillé sur l'historique vibratoire Boréal, un magasin d'inventaire consigné en `CRDT` (Extrait 28.1) doté d'une enveloppe d'escrow locale des pièces critiques en dépôt sur place, et un serveur `SPIRE` sur `TPM 2.0`.
* **Passerelle `MCP ↔ ROS 2` et enveloppe `Simplex` à Montréal-Est** : Les sagas de préparation `Temporal` délèguent les missions de transport à `Open-RMF` via la passerelle déterministe interdisant tout accès aux topiques moteurs bruts, tandis que les scrutateurs `LiDAR` de sécurité coupent matériellement le canal de navigation hors du contrôleur `SIL 3` dès qu'un opérateur franchit le rayon dynamique \(d_{\text{sécurité}}(t)\).

**Résultats vérifiés en production** :
* Lors d'une coupure satellite réelle de **64 heures** à l'automne 2027 sur un site minier, la cellule `Edge` locale a détecté une cavitation de pompe hydraulique, réservé hors ligne la garniture mécanique en stock consigné (`CRDT`), généré le bon de travail illustré pour le mécanicien sur place en **42 secondes**, puis resynchronisé l'inventaire `SAP` en **1,8 seconde** au retour du lien sans aucun conflit.
* À Montréal-Est, **410 000 missions `AMR`** ont été orchestrées par les sagas agentiques sur neuf mois avec **zéro incident de sécurité physique**, un débit logistique accru de **31 %** et 100 % des mises à jour déployées par bundles signés `TUF` sans interruption de quart.

:::

---

## 28.5 Décision d'architecture normative et points de contrôle

La décision `ADR-028` encadre tout déploiement d'agents en périphérie industrielle ou au contact de systèmes robotisés.

::: {.adr title="ADR-028 — Architecture Edge Local-First à synchronisation CRDT et pont robotique ROS 2 sous enveloppe matérielle Simplex"}

* **Statut** : Acceptée | **Périmètre** : Sites Industriels, Logistique Robotisée & Edge | **Révision** : Annuelle
* **Contexte** : Déployer des agents sur des sites industriels à connectivité précaire ou au contact de flottes robotiques expose l'entreprise soit à la paralysie opérationnelle sur perte WAN, soit à des corruptions de stocks lors de la reconnexion, soit à des risques graves de sécurité physique si l'IA pilote directement des actionneurs.
* **Options évaluées** :
  1. *Inférence et orchestration centralisées dans le nuage avec simple cache local* : **Rejetée** — inopérante au-delà de quelques minutes de coupure réseau et incompatible avec les sites *Air-Gapped*.
  2. *Synchronisation de bases locales par écrasement (Last-Write-Wins) et pilotage direct des topiques moteurs ROS 2 par modèle embarqué* : **Rejetée** — perte de transactions financières/stocks et non-conformité rédhibitoire aux normes `ISO 10218` / `IEC 61508`.
  3. *Cellule autonome Local-First (`SLM` local, `SPIRE`/`TPM`, état `CRDT` à quotas d'escrow), distribution signée `TUF`/`Sigstore` et passerelle discrète `MCP ↔ ROS 2` doublée d'un arbitre matériel `Simplex`*. **Retenue**.
* **Décision** : (a) Exiger une survie autonome minimale de 72 heures sans WAN pour tout site critique, avec repli automatique en `L1` au-delà ; (b) modéliser tout état mutatif déconnecté par `CRDT` borné par un quota d'escrow pré-alloué ; (c) interdire formellement tout accès d'un modèle probabiliste aux commandes cinématiques continues hors d'une passerelle de missions homologuées et d'un moniteur matériel `Simplex` certifié.
* **Conséquences** : Continuité industrielle ininterrompue hors réseau et sûreté humaine mathématiquement garantie en atelier robotisé, en contrepartie de la gestion matérielle d'un parc de nœuds `Edge` et de la quantification des modèles embarqués.

:::

### Liste de contrôle de mise en production — Chapitre 28

1. **Test de déconnexion prolongée (72 h)** : La cellule `Edge` maintient-elle l'inférence `SLM`, la rotation locale des identités `SPIRE` (`TPM 2.0`) et l'évaluation `Cedar` pendant 72 heures câble WAN débranché ?
2. **Convergence `CRDT` et quotas d'escrow** : Les stocks et budgets manipulables hors ligne sont-ils protégés par des structures `CRDT` et des plafonds d'escrow locaux empêchant toute sur-allocation globale ?
3. **Ordonnanceur de reconnexion (`QoS`)** : Le mécanisme *Store-and-Forward* priorise-t-il les deltas transactionnels et alertes critiques devant l'évacuation différée des journaux `OpenTelemetry` ?
4. **Frontière sémantique `MCP ↔ ROS 2`** : Est-il vérifié que la passerelle robotique n'expose que des actions discrètes sur waypoints homologués et bloque tout accès aux topiques d'asservissement moteur ?
5. **Enveloppe matérielle `Simplex` (`IEC 61508`)** : Un contrôleur de sécurité temps réel indépendant surveille-t-il à la milliseconde la distance d'arrêt et coupe-t-il physiquement le canal adaptatif en cas de risque ?
6. **Intégrité des consignations (`LOTO`)** : La passerelle interroge-t-elle l'état de verrouillage matériel de maintenance avant toute émission d'ordre de mouvement vers un équipement ?
7. **Bundles atomiques signés `TUF` / `Sigstore`** : Les poids `SLM`, politiques `Cedar` et `Agent Skills` sont-ils distribués en archives signées à double clé avec date d'expiration et bascule `A/B` automatique ?
8. **Rétrogradation de sécurité post-échéance** : Si l'isolement réseau dépasse le plafond homologué (ex. 72 h), le nœud rétrograde-t-il proprement ses actions mutatives en mode consultatif `L1` pour l'opérateur sur site ?
