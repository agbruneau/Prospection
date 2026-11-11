# Chapitre 17 — Orchestration cyber-physique : Convergence IT/OT, OPC-UA et Jumeaux numériques

::: {.synthese-executive title="Synthèse exécutive — Chapitre 17"}

* **Enjeu stratégique** : Relier la fabrique agentique aux usines, aux réseaux énergétiques ou aux sites miniers génère des gains décisifs (maintenance prédictive couplée aux stocks ERP, rééquilibrage dynamique de lignes, sobriété énergétique). Mais contrairement au tertiaire où une erreur se corrige par une écriture comptable inverse, une hallucination transmise à une machine-outil détruit un actif industriel coûteux, paralyse la production ou met en péril la sécurité physique des opérateurs.
* **Décisions architecturales structurantes** :
  1. *Irréversible et non négociable* : **Asymétrie absolue entre lecture et écriture `IT/OT`**. Aucun modèle probabiliste (`LLM` ou `SLM`) ne dispose jamais d'un accès direct en écriture sur un automate programmable (`PLC`), une commande numérique (`CNC`) ou un système instrumenté de sécurité (`SIS`).
  2. *Structurante dès le jour 1* : Respecter la segmentation en zones et conduits de la norme **`IEC 62443`** (modèle Purdue avec zone démilitarisée industrielle `IDMZ` au Niveau 3.5) en exposant `OPC-UA` et `MQTT Sparkplug B` via des réplicas en lecture seule protégeant les bus de terrain.
  3. *Sas obligatoire d'action corrective* : Toute modification opérationnelle proposée par un agent doit traverser un **jumeau numérique déterministe** qui valide les contraintes physiques et signe cryptographiquement un certificat éphémère avant traduction en recette homologuée (`ISA-88` / `ISA-95`) vers le `MES` ou le `SCADA`.
* **Indicateurs de gouvernance associés** : Zéro paquet IP direct `IT → Niveau 1/0`, taux d'interception préventive des propositions hors enveloppe par le jumeau numérique, fraîcheur garantie d'état capteur à l'application (\(\Delta t \le 5\,\text{s}\)), et gain de taux de rendement synthétique (`OEE`).

:::

## 17.1 Contraintes temps réel, sûreté fonctionnelle et segmentation réseau (`Modèle Purdue` / `IEC 62443`)

La friction historique entre technologies de l'information (`IT`) et technologies d'exploitation industrielle (`OT`) découle d'une inversion de la triade de sécurité et des constantes de temps. En `IT`, la **Confidentialité** prime et une latence variable de deux secondes est bénigne. En `OT`, **la Sûreté humaine (*Safety*) et la Disponibilité déterministe priment absolument** : une boucle d'asservissement sur automate (`PLC`) s'exécute à cycle fixe entre **1 et 10 millisecondes**. Perturber ce cycle par des requêtes réseau non bornées suffit à provoquer un arrêt de sécurité brutal de la ligne.

Intégrer des agents cognitifs — dont l'inférence dure plusieurs secondes et demeure probabiliste — impose donc un découplage spatio-temporel strict fondé sur le **modèle Purdue (`ISA-95`)** et la norme **`IEC 62443`**.

![Architecture de convergence IT/OT conforme IEC 62443 (modèle Purdue) : télémétrie OPC-UA / MQTT Sparkplug en lecture seule et sas obligatoire par Jumeau numérique déterministe.](manuscrit/figures/fig-17-purdue-it-ot-twin.svg)

### Règles d'urbanisation par niveau Purdue et conduits `IEC 62443`

La norme `IEC 62443-3-2` cloisonne l'usine en **zones** dotées d'un niveau de sécurité cible (`SL-1` à `SL-4`) reliées par des **conduits** filtrés. L'invariant cardinal est sans appel : **aucune session réseau initiée dans le nuage ou le réseau `IT` (Niveau 4/5) ne franchit jamais directement le réseau d'usine (Niveau 3 et inférieurs)**. Toute communication subit une rupture protocolaire dans la **DMZ Industrielle (`IDMZ`, Niveau 3.5)**.

| Strate Purdue & Zone `IEC 62443` | Constante de temps | Cible `SL-T` | Prérogatives autorisées aux composants agentiques | Interdictions architecturales absolues |
|---|---|---|---|---|
| **Niveaux 4 & 5 — Entreprise `IT`** (`ERP`, Fabrique Agentique, Nuage) | Secondes à heures | `SL-2` / `SL-3` | Sagas logistiques, corrélation carnets `SAP` / alertes `OT`, planification prédictive | Aucun routage IP direct vers l'atelier ; aucune clé privée de signature `OT` dans le nuage |
| **Niveau 3.5 — DMZ Industrielle (`IDMZ`)** | 100 ms à secondes | **`SL-3` strict** | Hébergement du **serveur `MCP` `OT` en lecture seule** (sur miroir `OPC-UA`/`MQTT`) et sas d'inspection des demandes | Interdiction de relayer des explorations `Browse` non bornées vers les automates de terrain |
| **Niveau 3 — Opérations Site (`MES`, Historien, Jumeau Numérique)** | 100 ms à minutes | `SL-3` | Exécution du **Jumeau numérique déterministe** (`FMI 3.0`) ; réception par le `MES` de recettes signées `Ed25519` | Aucune mutation d'ordre de fabrication sans certificat valide du jumeau et contrôle d'échéance |
| **Niveau 2 — Supervision Cellule (`SCADA` / `HMI`)** | 50 ms à 1 s | `SL-3` | Restitution diagnostique à l'opérateur (`A2UI`) ; acquittement local `HOTL` / `HITL` | Interdiction de contourner les barrières d'occupation ou le mode « Manuel / Maintenance » |
| **Niveau 1 — Contrôle Temps Réel (`PLC`, `CNC`, `RTU`)** | **0,5 à 10 ms** (dur) | `SL-3` / `SL-4` | **Zéro agent LLM**. Réception exclusive de recettes homologuées chargées par `MES`/`SCADA` entre deux cycles | **Interdiction absolue** d'écriture directe d'un registre `PLC` par un outil `MCP` ou un agent |
| **Zone Sanctuarisée — `SIS` (`IEC 61511` `SIL 2/3`)** | `< 5 ms` matériel | **`SL-4` isolé** | Lecture unidirectionnelle post-événement (diode matérielle) pour analyse de cause racine | **Isolation physique et logique totale** : aucun canal entrant pouvant altérer un seuil d'arrêt d'urgence |

### Conception de la `IDMZ` (Niveau 3.5) : diodes logiques, courtiers miroirs et identités `SPIFFE`

La zone démilitarisée industrielle (`IDMZ`) ne se résume jamais à un simple sous-réseau traversé par des règles `NAT`. Pour atteindre le niveau `IEC 62443-3-3 SL-3`, elle opère une **terminaison complète de session TCP et applicative** sur les deux sens de circulation :

* **Dans le sens montant (`OT → IT`)**, l'initiation de connexion provient exclusivement du Niveau 3 (ou transite par une passerelle unidirectionnelle à isolation optique pour les sites classés critiques) vers un courtier réplica `MQTT Sparkplug B` et un serveur d'agrégation `OPC-UA` situés en `IDMZ`. Ainsi, le pare-feu interne entre `IDMZ` et Niveau 3 peut bloquer **100 % des paquets `SYN` entrants** vers l'atelier sur la voie de télémétrie. Le serveur `MCP` interrogé par les agents de diagnostic de Niveau 4 ne voit que cette copie synchronisée à la milliseconde près ; même en cas de compromission totale d'un agent dans le nuage ou d'une tempête accidentelle de 5 000 appels `MCP` simultanés, seul le réplica de l'`IDMZ` encaisse la charge, laissant les automates de Niveau 1 totalement intacts.
* **Dans le sens descendant (`IT → OT`)**, le conduit inverse n'expose qu'un unique point de terminaison HTTPS mutuellement authentifié par certificats courts `SPIFFE` (`mTLS`), protégé par un validateur matériel de schéma JSON qui rejette tout paquet excédant 16 Ko ou contenant des champs non déclarés, avant même de soumettre l'intention au sas du jumeau numérique de Niveau 3.

---

## 17.2 Exploration sémantique et diagnostic autonome sur `OPC-UA`, `MQTT Sparkplug` et historiens

Face à un automate ancien exposant un registre brut tel que `HR40012 = 18432`, un modèle de langage dépourvu de métadonnées devine l'unité physique — au risque de confondre des dixièmes de degré Celsius, des kilopascals ou des tours par minute. Deux standards industriels éliminent en 2027 cette ambiguïté sémantique pour les agents de diagnostic (`L1`) :

1. **`OPC-UA` (`IEC 62541`) et ses *Companion Specifications*** (`OPC 40001 Machinery`, `OPC 40501 Machine Tools`, `PackML`) : Le serveur expose un graphe d'objets typé (*AddressSpace*) où chaque variable porte nativement ses **unités d'ingénierie UNECE (`EngineeringUnits`, ex. `°C`, `mm/s`, `kW`)**, sa plage nominale (`EURange`), son horodatage source (`SourceTimestamp`) et son **code de qualité (`StatusCode` : `Good`, `Uncertain`, `Bad_SensorFailure`)**.
2. **`MQTT Sparkplug B` et l'*Unified Namespace* (`UNS`)** : Sur des milliers de capteurs, `Sparkplug B` impose une arborescence `ISA-95` normalisée, une charge `Protobuf` typée et la gestion d'état de vie (`NBIRTH`/`NDEATH`), alimentant en *Report-by-Exception* le courtier miroir de la `IDMZ` sans jamais solliciter les automates en scrutation active (*polling*).

| Source industrielle | Richesse sémantique native | Acquisition vers `IDMZ` | Risque `OT` en cas d'exposition brute | Patron d'exposition `MCP` recommandé |
|---|---|---|---|---|
| **Agrégateur `OPC-UA`** (*Companion Specs*) | **Maximale** : graphe typé, unités `UNECE`, `EURange`, états `PackML` | Abonnement *MonitoredItems* vers réplica en `IDMZ` | Saturation CPU d'un petit `PLC` en cas de parcours récursif direct | Serveur `MCP` connecté **uniquement au réplica `IDMZ`** avec certificat `X.509` lecture seule |
| **Courtier `MQTT Sparkplug B`** | **Élevée** : hiérarchie `ISA-95`, cycle `NBIRTH`/`NDEATH` | Pont TLS unidirectionnel sortant du Niveau 3 vers `IDMZ` | Très faible (découplage publication/abonnement) | Ressources `MCP` temps réel et déclencheurs sur franchissement de seuil |
| **Historien** (`AVEVA PI` / `Timescale`) | **Moyenne à élevée** (avec modèle d'actifs) | Réplica de lecture agrégé en `IDMZ` | Saturation mémoire si extraction brute à 1 kHz sur 30 jours | Outils `MCP` imposant un **calcul statistique côté serveur** (`rms`, `kurtosis`, centiles) |
| **API `MES` (`ISA-95` / `B2MML`)** | **Métier manufacturier** : ordres, lots, généalogie, `OEE` | Passerelle HTTPS mTLS en `IDMZ` | Modéré (système informatique de Niveau 3) | Outils `MCP` de corrélation production et guichet unique des recettes signées |

Un garde-fou critique concerne la **défaillance capteur** : lorsqu'une sonde coupée renvoie une valeur figée assortie de `StatusCode = Bad_SensorFailure`, un outil `MCP` qui transmettrait le chiffre nu induirait l'agent en erreur grave. Le serveur `MCP` doit systématiquement masquer toute valeur non `Good` ou périmée.

#### Extrait 17.1 — Serveur `MCP` Python en lecture seule stricte mappant l'espace sémantique `OPC-UA` (Réplica `IDMZ`)

```python
from datetime import datetime, timezone
from typing import Any
from asyncua import Client, ua

class ReadOnlyOpcUaMcpServer:
    """
    Serveur MCP déployé en IDMZ (Niveau 3.5) sur le réplica OPC-UA.
    Aucune méthode Write/Call n'est exposée ; certificat X.509 'ObserverOnly'.
    """

    def __init__(self, idmz_replica_url: str, max_staleness_sec: float = 10.0) -> None:
        self._endpoint = idmz_replica_url
        self._max_staleness_sec = max_staleness_sec

    async def read_machinery_telemetry_snapshot(
        self,
        asset_node_id: str,
        parameter_browse_names: list[str],
    ) -> dict[str, Any]:
        if len(parameter_browse_names) > 25:
            raise ValueError("MCP_OT_GUARD: Maximum 25 noeuds par lecture")

        async with Client(url=self._endpoint, timeout=3.0) as client:
            asset_node = client.get_node(asset_node_id)
            asset_name = await asset_node.read_display_name()
            readings: dict[str, Any] = {}
            now_utc = datetime.now(timezone.utc)

            for name in parameter_browse_names:
                var_node = await asset_node.get_child(name)
                dv: ua.DataValue = await var_node.read_data_value()
                status_ok = dv.StatusCode.is_good()
                age_sec = (now_utc - (dv.SourceTimestamp or now_utc)).total_seconds()

                unit_str = "dimensionless"
                eu_bounds = None
                for prop in await var_node.get_properties():
                    pname = (await prop.read_browse_name()).Name
                    if pname == "EngineeringUnits":
                        eu = await prop.read_value()
                        unit_str = getattr(eu, "DisplayName", ua.LocalizedText("")).Text or "raw"
                    elif pname == "EURange":
                        r = await prop.read_value()
                        eu_bounds = {"low": float(r.Low), "high": float(r.High)}

                if not status_ok or age_sec > self._max_staleness_sec:
                    readings[name] = {
                        "usableForDecision": False,
                        "opcStatusCode": dv.StatusCode.name,
                        "stalenessSeconds": round(age_sec, 2),
                        "value": None,
                        "unit": unit_str,
                    }
                else:
                    readings[name] = {
                        "usableForDecision": True,
                        "opcStatusCode": dv.StatusCode.name,
                        "stalenessSeconds": round(age_sec, 2),
                        "value": round(float(dv.Value.Value), 4),
                        "unit": unit_str,
                        "physicalRange": eu_bounds,
                    }

            return {
                "assetNodeId": asset_node_id,
                "assetDisplayName": asset_name.Text,
                "capturedAtUtc": now_utc.isoformat(),
                "telemetry": readings,
            }
```

### Agrégation fréquentielle en périphérie : pourquoi les agents ne lisent pas des flux bruts à 10 kHz

Une erreur classique des équipes logicielles découvrant le monde manufacturier consiste à vouloir injecter directement des séries temporelles haute fréquence (accéléromètres piézoélectriques échantillonnés à 10 kHz ou courants moteurs à 2 kHz) dans la fenêtre de contexte d'un modèle de langage. Outre l'absurdité financière en jetons, les architectures à transformeurs traitent médiocrement des dizaines de milliers de flottants bruts bruités.

Le patron d'ingénierie industrielle sépare clairement le **traitement numérique du signal déterministe (`DSP` / `SLM` spécialisé séries temporelles)** du **raisonnement contextuel de l'agent** : un module de pré-calcul en périphérie calcule en continu la transformée de Fourier rapide (`FFT`), l'énergie par bande harmonique caractéristique des bagues interne et externe du roulement (*BPFI* / *BPFO*), la valeur efficace (`RMS`) et l'aplatissement (*Kurtosis*). Le serveur `MCP` livre alors à l'agent une vingtaine d'indicateurs physiques interprétables et dimensionnés, lui permettant de croiser instantanément la signature mécanique exacte avec l'historique des lots d'acier usinés dans `Siemens Opcenter MES` et la nomenclature des pièces de rechange dans `SAP`.

---

## 17.3 Validation pré-exécution obligatoire sur Jumeau numérique et passage de consigne signée vers `MES`/`SCADA`

Passer du diagnostic (`L1`) à l'action corrective (`L2`/`L3`) — par exemple moduler la cadence d'un centre d'usinage dont le roulement chauffe afin de terminer un lot urgent avant l'arrêt programmé — confronte l'agent aux non-linéarités de la physique. Sur un acier réfractaire ou un alliage de titane, réduire excessivement l'avance par dent sans adapter la vitesse de coupe provoque un écrouissage thermique qui **accroît** l'échauffement et brise l'outil! Là où un LLM raisonne par analogie qualitative (« ralentir chauffe moins »), seul un solveur physique déterministe maîtrise les équations thermomécaniques exactes.

### Architecture du Sas par Jumeau Numérique Déterministe (*Deterministic Digital Twin Gate*)

Toute consigne descendante franchit obligatoirement trois barrières déterministes :

1. **Proposition paramétrique sur gabarit homologué** : L'*Agent Planificateur d'Atelier* ne cible aucun registre automate ; il propose la sélection d'une recette pré-cataloguée `ISA-88` (ex. `DERATED_THERMAL_86`) et une éventuelle répartition de lot.
2. **Simulation déterministe pré-exécution (Niveau 3 — Solveur `FMI 3.0 / FMU`)** : Le jumeau numérique simule sur l'horizon \(H\) la trajectoire physique à partir de l'état réel \(x(t_0)\) et vérifie formellement :

\[\forall t \in [t_0, t_0+H], \; \Phi(x(t), u) \le 0 \;\land\; C(u) = 1\]

où \(\Phi\) regroupe les plafonds physiques (température palier \(\le 78\,^\circ\text{C}\), charge broche \(\le 88\,\%\), épaisseur minimale de copeau anti-écrouissage) et \(C(u)\) valide la qualité géométrique. En cas de succès, le jumeau signe en matériel (`Ed25519` sur `TPM`/`HSM` de Niveau 3) un jeton d'attestation à validité courte ; sinon, il oppose un rejet *fail-closed* motivé.

#### Extrait 17.2 — Sas TypeScript de validation pré-exécution auprès du Jumeau numérique déterministe (`FMI 3.0`)

```typescript
export interface MachiningRegimeProposal {
  readonly sagaId: string;
  readonly workOrderId: string;
  readonly targetCellId: string;
  readonly catalogRecipeTemplateId: string;
  readonly spindleRpm: number;
  readonly feedRateMmPerMin: number;
  readonly splitLotQtyToTwinCell?: number;
}

export interface TwinSimulationVerdict {
  readonly approved: boolean;
  readonly simulationRunId: string;
  readonly predictedPeakBearingTempC: number;
  readonly predictedSpindleLoadPct: number;
  readonly chipLoadMinSatisfied: boolean;
  readonly violationReasons: ReadonlyArray<string>;
  readonly baselineStateHash: string;
  readonly expiresAtEpochMs: number;
  readonly ed25519AttestationSignature?: string;
}

export class DeterministicDigitalTwinGate {
  constructor(
    private readonly twinSolverEndpoint: string,
    private readonly maxBearingTempC: number = 78.0,
    private readonly maxSpindleLoadPct: number = 88.0
  ) {}

  public async validateBeforeShopfloorDispatch(
    proposal: MachiningRegimeProposal,
    currentTelemetry: Record<string, number>
  ): Promise<TwinSimulationVerdict> {
    if (proposal.spindleRpm < 800 || proposal.spindleRpm > 12000) {
      throw new Error("TWIN_STATIC_BOUND_VIOLATION: RPM hors domaine physique");
    }

    const res = await fetch(this.twinSolverEndpoint + "/v3/fmu/simulate-regime", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proposal, initialState: currentTelemetry, horizonMinutes: 90 })
    });
    if (!res.ok) {
      throw new Error("TWIN_SOLVER_UNAVAILABLE_FAIL_CLOSED:" + String(res.status));
    }

    const v = (await res.json()) as TwinSimulationVerdict;
    if (
      !v.approved ||
      !v.chipLoadMinSatisfied ||
      v.predictedPeakBearingTempC > this.maxBearingTempC ||
      v.predictedSpindleLoadPct > this.maxSpindleLoadPct ||
      !v.ed25519AttestationSignature
    ) {
      return { ...v, approved: false, ed25519AttestationSignature: undefined };
    }
    return v;
  }
}
```

### Protocole de passage de consigne signée vers `MES`/`SCADA` et contrôle de non-dérive (\(\Delta t\))

Entre la capture \(t_0\) ayant servi à la simulation et la réception au Niveau 3/2 (`Siemens Opcenter MES` / `SCADA`), l'atelier physique a évolué. Avant de charger la recette, le récepteur déterministe vérifie quatre conditions atomiques :

* **Signature cryptographique `Ed25519`** du jumeau numérique valide sur les paramètres exacts de la recette (impossible à forger par un agent compromis en zone `IT`).
* **Fraîcheur temporelle et non-dérive physique** : certificat non expiré, âge capteur local \(\Delta t \le 5\,\text{s}\), et écart thermique depuis \(t_0\) inférieur à \(\delta_{\max} = 1{,}5\,^\circ\text{C}\).
* **Interverrouillage de sécurité humaine** : barrières immatérielles dégagées et sélecteur physique sur `AUTO` (hors cadenassage maintenance `LOTO`).
* **Frontière de cycle `PackML`** : application différée proprement à la fin de la pièce en cours (`COMPLETE` ou `IDLE`), jamais au milieu d'une passe d'usinage.

#### Extrait 17.3 — Récepteur déterministe côté `MES`/`SCADA` contrôlant signature, fraîcheur et interverrouillages

```typescript
import { verify } from "node:crypto";

export interface SignedShopfloorDispatch {
  readonly dispatchId: string;
  readonly proposal: {
    readonly workOrderId: string;
    readonly targetCellId: string;
    readonly catalogRecipeTemplateId: string;
    readonly spindleRpm: number;
    readonly feedRateMmPerMin: number;
  };
  readonly twinAttestation: {
    readonly simulationRunId: string;
    readonly baselineBearingTempC: number;
    readonly expiresAtEpochMs: number;
    readonly ed25519SignatureHex: string;
  };
}

export interface LiveCellInterlockState {
  readonly sensorAgeMs: number;
  readonly currentBearingTempC: number;
  readonly safetyLightCurtainClear: boolean;
  readonly selectorMode: "AUTO" | "MANUAL_JOG" | "MAINTENANCE_LOCKOUT";
  readonly packMlState: "IDLE" | "EXECUTE" | "HOLD" | "COMPLETE" | "ABORTED";
}

export function verifyAndStageMesRecipe(
  dispatch: SignedShopfloorDispatch,
  liveCell: LiveCellInterlockState,
  twinPublicKeyPem: string
): { staged: true; applyOnPackMlBoundary: string } {
  const canonical = Buffer.from(JSON.stringify({
    runId: dispatch.twinAttestation.simulationRunId,
    cell: dispatch.proposal.targetCellId,
    recipe: dispatch.proposal.catalogRecipeTemplateId,
    rpm: dispatch.proposal.spindleRpm,
    feed: dispatch.proposal.feedRateMmPerMin,
    baseTemp: dispatch.twinAttestation.baselineBearingTempC,
    exp: dispatch.twinAttestation.expiresAtEpochMs
  }), "utf8");

  const valid = verify(
    null,
    canonical,
    twinPublicKeyPem,
    Buffer.from(dispatch.twinAttestation.ed25519SignatureHex, "hex")
  );
  if (!valid) throw new Error("OT_SECURITY_REJECT: Signature Ed25519 invalide");
  if (Date.now() > dispatch.twinAttestation.expiresAtEpochMs) {
    throw new Error("OT_STALE_SIMULATION_REJECT: Certificat expire");
  }
  if (liveCell.sensorAgeMs > 5_000) {
    throw new Error("OT_SENSOR_STALE_REJECT: Telemetrie > 5000 ms");
  }

  const drift = Math.abs(liveCell.currentBearingTempC - dispatch.twinAttestation.baselineBearingTempC);
  if (drift > 1.5) {
    throw new Error("OT_STATE_DRIFT_REJECT: Derive thermique " + drift.toFixed(2) + " C");
  }
  if (!liveCell.safetyLightCurtainClear || liveCell.selectorMode !== "AUTO") {
    throw new Error("OT_HUMAN_SAFETY_INTERLOCK_ACTIVE: Cellule occupee ou hors mode AUTO");
  }
  if (liveCell.packMlState === "ABORTED") {
    throw new Error("OT_CELL_ABORTED: Acquittement HMI requis");
  }

  return {
    staged: true,
    applyOnPackMlBoundary: liveCell.packMlState === "IDLE" ? "IMMEDIATE_AT_IDLE" : "NEXT_PART_COMPLETE"
  };
}
```

### Gouvernance de l'écart simulation-réalité (*Sim-to-Real Gap*) et repli automatique post-application

La sûreté d'un sas par jumeau numérique ne vaut que par la fidélité du modèle physique sous-jacent (`Functional Mock-up Unit`, norme ouverte `FMI 3.0`). Or, une machine industrielle vieillit : un échangeur de liquide de refroidissement qui s'encrasse en été ou un lot de brut de fonderie plus dur que la norme dégrade progressivement la précision prédictive des équations initiales.

Deux mécanismes bouclent la gouvernance du jumeau en exploitation continue :

* **Surveillance post-application et retour automatique au profil sûr (*Post-Dispatch Watchdog*)** : Dès qu'une nouvelle recette homologuée entre en vigueur sur la cellule, un chien de garde déterministe local compare toutes les dix secondes la courbe thermique réellement mesurée \(T_{\text{réel}}(t)\) à la trajectoire prédite \(T_{\text{sim}}(t)\) lors de l'attestation. Si l'écart résiduel dépasse \(2{,}0\,^\circ\text{C}\) pendant trois cycles consécutifs, le `SCADA` révoque automatiquement la recette active sans attendre d'ordre `IT`, rebascule la cellule en repli conservateur pré-programmé et notifie l'orchestrateur `Temporal`.
* **Réétalonnage hors ligne gouverné (*Shadow Calibration*)** : Les résidus d'observation sont accumulés dans l'historien pour recalibrer périodiquement les coefficients de transfert thermique de la `FMU`. Conformément aux principes de gestion du changement industriel (`Management of Change`), aucune mise à jour des paramètres internes du jumeau numérique n'est déployée de manière autonome en ligne : chaque nouvelle version de `FMU` passe une batterie de tests de validation sur incidents historiques rejoués et reçoit le visa d'un ingénieur procédés avant signature et mise en service au Niveau 3.

### Coordination intralogistique multi-constructeurs (`VDA 5050`) et horizon `OPC-UA FX` sur `TSN`

Dans les usines et centres de distribution automatisés de 2027, le rééquilibrage d'une cadence d'usinage répercute immédiatement ses effets sur la logistique interne d'atelier : chariots filoguidés (`AGV`) et robots mobiles autonomes (`AMR`) chargés d'amener les bruts de fonderie et d'évacuer les palettes usinées. Lorsqu'un site combine des robots mobiles de trois fabricants différents, le même piège d'enfermement propriétaire qu'en SaaS menace le Niveau 2/3.

L'architecture cyber-physique étend donc le principe du sas déterministe à l'intralogistique grâce au standard ouvert **`VDA 5050`** sur `MQTT` : lorsqu'un délestage de lot est validé par le jumeau d'atelier (par exemple réorienter 35 % des pièces de `CNC02` vers `CNC04`), le `MES` n'envoie aucune trajectoire libre calculée par un LLM aux robots mobiles. Il publie une mission haut niveau au **gestionnaire de flotte maître (*Master Control*) `VDA 5050`**, lequel calcule de manière déterministe les réservations de nœuds topologiques d'allées, l'évitement d'embouteillages aux intersections et le respect des zones de croisement piétons surveillées par scrutateurs laser de sécurité (`PL d` selon `ISO 13849-1`).

Parallèlement, le déploiement progressif en 2026–2027 d'**`OPC-UA FX` (*Field eXchange*)** sur Ethernet déterministe **`TSN` (*Time-Sensitive Networking*, `IEEE 802.1Qbv`)** converge la couche de transport physique des ateliers neufs (*greenfield*) sans jamais abolir la frontière logique de gouvernance : grâce au partitionnement temporel strict des trames `TSN`, les flux d'asservissement isochrones de Niveau 1 disposent d'une bande passante réservée à la microseconde près que le trafic de télémétrie `OPC-UA PubSub` montant vers l'`IDMZ` ne peut matériellement jamais retarder.

---

## 17.4 Éclairages sectoriels : sûreté fonctionnelle (`SIL`) et périphérie industrielle déconnectée

::: {.encadre-sectoriel title="Énergie, Mines & Sûreté fonctionnelle — Sanctuarisation des systèmes SIS (IEC 61511 SIL 2/3) et NERC CIP"}

Dans une centrale électrique soumise à **`NERC CIP`** ou un procédé lourd régi par **`IEC 61508` / `IEC 61511`**, le contrôle de procédé courant (`BPCS` : `SCADA`/`PLC`) est doublé d'un **Système Instrumenté de Sécurité (`SIS`)** certifié **`SIL 2` ou `SIL 3`**, chargé de mettre physiquement l'installation en repli sûr avant tout emballement critique.

La doctrine cyber-physique est absolue : **la fabrique agentique ne possède aucun lien logique ou électrique d'écriture vers le `SIS`**.

* Toute modification dynamique d'un seuil `SIS` par un agent invaliderait l'homologation légale d'exploitation et engagerait la responsabilité pénale de la direction.
* Même dans l'hypothèse extrême d'un défaut simultané de l'agent et du jumeau numérique sur une consigne `MES`, le `SIS` câblé indépendamment conserve son autorité matérielle intacte pour couper l'énergie avant tout dommage humain ou structurel.

:::

::: {.encadre-sectoriel title="Sites miniers éloignés & Résilience WAN — Inférence locale SLM sur Industrial Edge"}

Une mine souterraine nordique ou une usine forestière éloignée subit régulièrement des coupures de liaison satellite ou fibre (`WAN`). Dépendre d'un modèle infonuagique distant pour interpréter les alarmes critiques d'aérage ou de concassage est inacceptable.

Le patron éprouvé déploie au **Niveau 3 local du site** un serveur durci **`Industrial Edge`** exécutant :

1. Le serveur `MCP` `OPC-UA` local, le jumeau numérique `FMU` et un travailleur d'orchestration durable autonome.
2. Un **`SLM` quantifié (7 à 14B paramètres)** spécialisé sur les manuels techniques et codes défauts des équipements du site. En mode isolé (*Island Mode*), le diagnostic prédictif, la validation par jumeau numérique et le guidage des électromécaniciens demeurent opérationnels à 100 %, puis resynchronisent leurs journaux `A2A` au retour du lien `WAN`.

:::

---

## 17.5 Application au fil rouge : orchestration cyber-physique à l'usine Boréal de Trois-Rivières

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Maintenance prédictive et rééquilibrage de cadence à l'usine de Trois-Rivières"}

**Problème industriel initial (T2 2027)** :
L'usine **BEL** de Trois-Rivières usine des corps de compresseurs sur six cellules robotisées 5 axes (`Siemens Sinumerik` `OPC-UA`), pilotées par **`Siemens Opcenter MES`** et **`SAP S/4HANA`**. Faute de pont entre maintenance et planning, une dégradation de roulement de broche entraînait soit une casse en cours d'usinage (38 000 \$ CAD de rebut de fonte nodulaire et 18 heures d'arrêt), soit un arrêt préventif abrupt déclenchant des pénalités de retard client.

**Architecture déployée sous `IEC 62443-3-3 SL-3` (T3 2027)** :
Une **`IDMZ` (Niveau 3.5)** isole strictement l'atelier du nuage corporatif via un réplica `OPC-UA` (`OPC 40501`) et un pont `MQTT Sparkplug B` :

1. **Diagnostic lecture seule (`L1`)** : Via `ReadOnlyOpcUaMcpServer` (Extrait 17.1), l'agent vibratoire détecte sur `TRV-CELL-CNC02` une élévation spectrale et thermique (`69,4 °C`, `StatusCode = Good`) limitant la vie résiduelle (`RUL`) à **11 heures** à pleine charge.
2. **Corrélation `IT/OT`** : `Temporal` croise `Opcenter MES` (14 heures restantes sur la commande urgente `SO-77410`) et `SAP Joule` (roulement céramique en stock local et créneau maintenance libre à 22 h 00).
3. **Sas du Jumeau numérique (`DeterministicDigitalTwinGate`)** : Une première suggestion de l'agent (`-22 %` d'avance) est **rejetée par le solveur `FMU`** pour risque d'écrouissage thermique ; la seconde itération (`DERATED_THERMAL_86` à `-14 %` plafonnant le palier à `72,1 °C` + délestage de 35 % du lot vers la cellule jumelle `CNC04`) est homologuée et signée `Ed25519`.
4. **Exécution `HOTL` sécurisée et intralogistique `VDA 5050`** : Après acquittement sur pupitre `HMI` par le chef d'îlot, le `MES` vérifie la signature, la fraîcheur capteur (`420 ms`) et les barrières immatérielles (Extrait 17.3), bascule la recette à l'état `PackML COMPLETE`, puis notifie le gestionnaire de flotte `VDA 5050` afin que deux chariots autonomes `AMR` réacheminent automatiquement les palettes d'ébauches vers `CNC04` sans croiser l'allée piétonne principale.

**Résultats vérifiés sur deux trimestres à Trois-Rivières** :

* **Arrêts non planifiés sur bris de broche** : baisse de **-78 %** (zéro rebut thermique de corps de compresseur).
* **Disponibilité globale (`OEE`) sur les 6 cellules** : hausse de **+4,6 points**, générant **1,9 M\$ CAD** de marge industrielle annualisée.
* **Conformité cyber `IEC 62443`** : homologation `SL-3` validée, **0 paquet `IT` sous le Niveau 3.5**, et **34 propositions hors enveloppe bloquées net** par le jumeau numérique.

:::

---

## 17.6 Décision d'architecture normative et points de contrôle

::: {.adr title="ADR-017 — Architecture en sas par Jumeau numérique et validation déterministe pour toute consigne IT→OT"}

* **Statut** : Acceptée (Norme critique de sûreté industrielle) | **Périmètre** : Usines, entrepôts automatisés et réseaux `OT` | **Révision** : Annuelle (`CISO` & Direction Ingénierie Industrielle)
* **Contexte** : Connecter les agents de planification aux équipements industriels améliore fortement l'`OEE`, mais expose l'outil de production et le personnel aux risques d'hallucinations physiques, de perturbation des bus temps réel et de mouvements latéraux `IT → OT`.
* **Options évaluées** :
  1. *Isolement complet sans passerelle agentique* : **Rejetée** — maintient des délais manuels de plusieurs jours entre alerte capteur, stock ERP et ordonnancement.
  2. *Serveurs `MCP` en lecture/écriture directe sur automates `OPC-UA` / `Modbus`* : **Rejetée formellement** — danger physique et violation `IEC 62443`.
  3. *Segmentation `IDMZ` avec lecture sur réplica et sas obligatoire par Jumeau numérique déterministe avant recette signée `MES`/`SCADA`* : **Retenue**.
* **Décision** : (a) Toute lecture `OT` s'effectue sur un réplica en `IDMZ` (Niveau 3.5) avec validation du `StatusCode` et de l'âge du signal ; (b) tout accès direct d'un agent aux automates de Niveau 1 ou au `SIS` est interdit ; (c) toute consigne descendante doit cibler un gabarit de recette pré-homologué, obtenir une signature `Ed25519` *fail-closed* du jumeau numérique, et franchir les contrôles de fraîcheur (\(\Delta t \le 5\,\text{s}\)), d'interverrouillage humain et d'état `PackML` au niveau `MES`/`SCADA`.
* **Conséquences** :
  * *Positives* : Sûreté physique démontrable, déterminisme `< 10 ms` préservé, certification `IEC 62443 SL-3` et adhésion des équipes d'automaticiens.
  * *Négatives / Coûts assumés* : Étalonnage continu des modèles physiques `FMU` du jumeau et exploitation de la zone `IDMZ`.
* **Condition de révision** : Déploiement sur de nouvelles usines ou évolution des standards `OPC-UA FX` et `IEC 62443`.

:::

### Liste de contrôle de mise en production — Chapitre 17

Avant tout raccordement d'un flux agentique à une installation industrielle, exigez la validation conjointe `IT` et `OT` sur ces huit points :

1. **Rupture protocolaire en `IDMZ`** : Aucun flux IP initié depuis le réseau `IT` ou le nuage ne traverse-t-il directement sous le Niveau 3.5 ?
2. **Sanctuarisation du `SIS`** : Est-il matériellement prouvé qu'aucun composant logiciel ou jumeau ne possède de canal d'écriture vers les automates de sécurité (`IEC 61511 SIL 2/3`) ?
3. **Protection anti-saturation** : Le serveur `MCP` interroge-t-il uniquement un réplica `OPC-UA`, un pont `MQTT Sparkplug` ou un historien en `IDMZ` sans jamais scruter directement les `PLC` ?
4. **Unités et `StatusCode` vérifiés** : Toute mesure `Bad`, `Uncertain` ou périmée est-elle automatiquement neutralisée avant transmission à l'agent, avec ses unités `UNECE` explicites ?
5. **Jumeau numérique *Fail-Closed*** : Toute indisponibilité du solveur `FMU` ou tout dépassement d'enveloppe physique entraîne-t-il le rejet par défaut de la consigne ?
6. **Signature `Ed25519` obligatoire** : Le `MES`/`SCADA` rejette-t-il toute recette dépourvue d'une signature cryptographique valide et non expirée du jumeau numérique ?
7. **Contrôle de non-dérive et sécurité humaine** : L'automate de supervision vérifie-t-il la fraîcheur capteur (\(\Delta t \le 5\,\text{s}\)), l'absence de dérive thermique, le mode `AUTO` et l'intégrité des barrières immatérielles ?
8. **Synchronisation `PackML`** : Le changement de recette s'applique-t-il exclusivement sur une frontière d'état machine sécuritaire (`IDLE` ou `COMPLETE`) ?
