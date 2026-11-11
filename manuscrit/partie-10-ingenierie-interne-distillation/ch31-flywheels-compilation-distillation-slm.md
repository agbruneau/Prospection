# Chapitre 31 — Volants d'inertie cognitifs (Data Flywheels), compilation de consignes et distillation LLM → SLM

::: {.synthese-executive title="Synthèse exécutive — Chapitre 31"}

* **Enjeu stratégique** : Au lancement d'un nouveau processus agentique, recourir à un grand modèle de raisonnement frontière (*Teacher LLM*) constitue un accélérateur rationnel pour franchir rapidement le seuil de fiabilité métier. Mais figer durablement 100 % du trafic répétitif de production sur ce même modèle frontière et sur des consignes artisanales rédigées à la main condamne l'entreprise à une double impasse : une **rente économique structurelle** qui grève le *Cost-per-Outcome*, et une **fragilité extrême des prompts** à chaque changement de modèle. Le véritable avantage compétitif cumulatif de 2027 réside dans la capacité à convertir ses propres traces d'exécution validées en **modèles spécialisés internes frugaux (`SLM`)**.
* **Décisions architecturales structurantes** :
  1. *Irréversible en ingénierie cognitive* : Remplacer le bricolage manuel de chaînes de caractères (*Prompt Craft*) par la **compilation déclarative de programmes cognitifs** (paradigme **`DSPy`** / optimiseurs bayésiens de signatures et d'exemples *few-shot*) évaluée mathématiquement contre la suite \(\tau\)-bench du domaine.
  2. *Structurante pour l'économie d'échelle* : Opérer un **volant d'inertie cognitif (*Data Flywheel*)** gouverné (anonymisation irréversible `Loi 25` et filtrage anti-`ASI06`), distillant périodiquement les trajectoires réussies du modèle enseignant et les corrections contrastives des superviseurs `HOTL` vers des **`SLM` d'entreprise (`4B`–`8B` via `SFT` + `DPO` sur adaptateurs `LoRA`)**.
  3. *Gouvernance du cycle de vie* : N'autoriser la promotion d'un `SLM` distillé sur `agentgateway` que si sa constance \(\text{pass}^5\) sur jeu *Holdout* scellé égale au moins **99 %** de celle du modèle enseignant, tout en maintenant une route d'escalade dynamique en cas d'entrée hors distribution (*Out-of-Distribution*).
* **Indicateurs de gouvernance** : Compression du *Cost-per-Outcome* sur 4 trimestres (cible `-65 %` à `-85 %`), ratio de parité \(\text{pass}^5_{\text{SLM}} / \text{pass}^5_{\text{Teacher}}\) (\(\ge 0{,}99\)), zéro fuite de `PII` mémorisée lors des tests d'extraction canaris sur poids affinés, et réduction de latence `p95` (`-60 %` à `-75 %`).

:::

## 31.1 Construire un volant d'inertie cognitif gouverné : des traces OpenTelemetry et arbitrages HOTL aux jeux d'or exempts de PII

Dans la plupart des organisations en 2025–2026, les millions de traces d'inférence générées en production étaient traitées comme un simple déchet opérationnel expirant au bout de trente jours dans un seau de stockage froid. Dans une entreprise agentique mature en 2027, ces traces — croisées avec le dénouement réel des sagas métiers et les décisions des superviseurs humains — forment **l'actif immatériel le plus précieux du système d'information** : un corpus propriétaire d'expertise opérationnelle qu'aucun concurrent externe ne peut acheter sur étagère.

### Ancrer le signal de vérité dans l'issue métier réelle, jamais dans l'auto-congratulation du modèle

Entraîner ou optimiser un modèle élève sur les sorties brutes non filtrées d'un modèle plus grand conduit rapidement à l'**effondrement de modèle (*Model Collapse*)** et à l'amplification de ses biais subtils. Le secret d'un volant d'inertie cognitif (*Data Flywheel*) sain tient à la **pureté déterministe du signal de sélection** :

1. **Les trajectoires positives certifiées par la saga (`Positive Gold Trajectories`)** : Une trace multi-tours (`OpenTelemetry gen_ai.*`, Chapitre 21) n'entre dans le candidat d'entraînement supervisé (`SFT`) que si la saga durable correspondante a atteint son état terminal d'affaires vérifié **sans déclencher d'action de compensation ultérieure, sans réouverture de billet client dans les quatorze jours et sans violation de garde-fou `Cedar`**.
2. **Les paires préférentielles issues du poste `HOTL` (`Contrastive DPO Pairs`)** : Chaque fois qu'un superviseur humain *Human-on-the-Loop* (Chapitre 25) rejette ou corrige la proposition initiale \(y_{\text{rejeté}}\) d'un agent au profit d'une décision amendée validée \(y_{\text{choisi}}\) sur le même contexte \(x\), le système capture gratuitement un triplet \((x, y_{\text{choisi}}, y_{\text{rejeté}})\) à très haute valeur informative, directement exploitable par **optimisation directe de préférence (`DPO` — *Direct Preference Optimization*)**.

![Architecture du volant d'inertie cognitif (Data Flywheel) : collecte OTel et corrections HOTL, sas d'assainissement Loi 25, compilation déclarative + distillation LoRA et courbe économique trimestrielle.](manuscrit/figures/fig-31-flywheel-compilation-distillation.svg)

### Le sas d'assainissement obligatoire : Loi 25, mémorisation neuronale et anti-empoisonnement (ASI06)

À la différence d'un contexte éphémère de session que l'on peut purger par clé d'entité (Chapitre 10), **un renseignement personnel qui s'imprime dans les poids synaptiques d'un modèle affiné ne peut plus en être effacé chirurgicalement sans réentraînement complet** — créant une violation grave du droit à l'effacement (`RGPD` art. 17, `Loi 25`) et un risque d'exfiltration inter-clients.

Avant qu'une seule trace ne rejoigne l'entrepôt de curation d'or, elle traverse trois filtres bloquants :
* **Vérification de finalité et de consentement** : Exclusion automatique de tout locataire B2B dont le contrat `ODRL` (Chapitre 26) comporte la clause `aiTrainingProhibited`, ainsi que des dossiers ayant fait l'objet d'une opposition au profilage.
* **Désidentification irréversible par substitution synthétique réaliste** : Noms de personnes, numéros d'assurance sociale, coordonnées bancaires, plaques et numéros de contrat sont remplacés de manière irréversible par des entités synthétiques de même distribution linguistique, suivie d'une injection de **secrets canaris synthétiques** permettant de tester après entraînement que le taux d'extraction par mémorisation demeure nul.
* **Tamis anti-empoisonnement (`OWASP ASI06`)** : Toute session ayant déclenché une alerte du détecteur d'injection de prompt ou contenant des instructions anormales dans les entrées externes est écartée afin qu'un attaquant ne puisse jamais « distiller une porte dérobée » dans le futur `SLM` interne.

---

## 31.2 Fin de l'artisanat des prompts : compilation déclarative de programmes cognitifs (paradigme DSPy)

Avant même de modifier un seul poids neuronal par affinage GPU, une première mine d'efficience gît dans l'élimination d'un anti-patron omniprésent entre 2023 et 2025 : **les prompts monolithiques de trois cents lignes cousus à la main** à coups d'injonctions superstitieuses (*« Réfléchis étape par étape, c'est très important pour ma carrière, ne fais jamais d'erreur JSON »*). Dès que l'équipe remplace un modèle frontière par un `SLM` sobre ou migre vers une nouvelle version (`Chapitre 27`), ces incantations fragiles se brisent.

### Séparer la signature logique de son implémentation compilée

L'ingénierie cognitive de 2027 adopte le paradigme popularisé par **`DSPy`** et les compilateurs déclaratifs d'agents : le développeur ne rédige plus le texte final du prompt, il déclare en code typé :
1. **La signature entrée/sortie et les invariants métiers** (ex. `DiagnosticVibratoire(spectre_fft, historique_pannes) -> cause_racine_ossie, urgence_l0_l4, outil_mcp_recommande`).
2. **La topologie modulaire du sous-graphe** (chaîne de raisonnement bornée, vérification d'assertions déterministes).
3. **La fonction objective exacte à maximiser** sur le banc d'évaluation de développement (ex. exactitude sémantique pondérée sous contrainte de budget de jetons).

Un **optimiseur automatique** (tel que **`MIPROv2`** — *Multiprompt Instruction Proposal Optimizer* — ou la recherche évolutionnaire contrainte) explore alors méthodiquement l'espace des instructions concises et sélectionne par *bootstrapping* parmi le jeu d'or les **3 à 5 démonstrations *few-shot*** qui maximisent mathématiquement le score \(\text{pass}^5\) pour le couple précis `(Tâche, Modèle Cible)`. Changer de modèle sous-jacent ne demande plus trois semaines de réécriture artisanale, mais **une recompilation automatisée de deux heures en CI/CD**.

#### Extrait 31.0 — Signature cognitive déclarative et métrique de compilation composite (`declarative_compile_spec.py`)

Plutôt que de figer un long texte fragile, l'ingénieur exprime le contrat typé et la fonction de récompense pénalisant simultanément l'erreur métier et l'inflation de jetons :

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class TriageSignatureSpec:
    input_fields: tuple[str, ...] = (
        "fft_harmonics_json",
        "asset_ossie_class",
        "recent_maintenance_summary",
    )
    output_fields: tuple[str, ...] = (
        "failure_mode_code",
        "autonomy_tier_required",
        "recommended_mcp_tool",
    )
    max_compiled_prefix_tokens: int = 850


def composite_compile_score(
    pred_code: str,
    gold_code: str,
    pred_tool: str,
    gold_tool: str,
    prompt_tokens: int,
    token_budget: int = 850,
) -> float:
    if pred_code != gold_code or pred_tool != gold_tool:
        return 0.0
    over = max(0, prompt_tokens - token_budget)
    brevity_bonus = max(0.0, 1.0 - (over / 500.0))
    return 0.90 + 0.10 * brevity_bonus
```

::: {.encadre-sectoriel title="Propriété Intellectuelle & Contrats Fournisseurs — Sécuriser la titularité juridique des poids LoRA distillés"}

Deux précautions contractuelles conditionnent la légalité d'un volant de distillation en entreprise :
1. **Clauses des conditions d'utilisation des modèles enseignants (*Terms of Service*)** : Certains fournisseurs d'API propriétaires restreignent l'usage de leurs sorties pour entraîner un modèle commercial concurrent généraliste, tandis que les contrats d'entreprise négociés ou les grands modèles *Open-Weights* sous licences permissives (`Apache 2.0`, `MIT`) autorisent explicitement la distillation interne métier. Le Centre d'Excellence vérifie systématiquement la licence du *Teacher* avant d'activer la collecte de traces `SFT`.
2. **Cloisonnement multi-clients dans les offres SaaS B2B** : Un éditeur SaaS (comme la division BSN de Boréal) ne distille un adaptateur partagé inter-clients que sur des grandeurs physiques anonymisées lorsque ses contrats B2B l'y autorisent explicitement ; pour les clients grands comptes à clause de confidentialité stricte, un adaptateur `LoRA` dédié par locataire (`Tenant-Specific LoRA`, 40 Mo chiffrés sous clé client) préserve une étanchéité absolue de la propriété intellectuelle.

:::

---

## 31.3 Industrialisation de la distillation continue LLM → SLM (LoRA / DPO), économie d'échelle et maîtrise du Model Drift

Lorsque le volume d'un flux stabilisé dépasse quelques dizaines de milliers d'exécutions par mois, le second étage de la fusée entre en jeu : **transférer la compétence compilée du grand modèle enseignant (*Teacher*, 70B à > 400B paramètres) vers un petit modèle élève spécialisé (*Student SLM*, 3B à 8B paramètres)** servi à très haute densité sur l'infrastructure de l'entreprise.

### Pourquoi un SLM 8B distillé égale ou surpasse un modèle géant sur une tâche d'entreprise bornée

Un modèle frontière généraliste consacre l'immense majorité de sa capacité paramétrique à savoir simultanément composer de la poésie élisabéthaine, résoudre des olympiades de topologie et converser en cent langues. À l'intérieur d'une cellule agentique d'entreprise bien découpée (Chapitre 2 et Chapitre 5 : maximum douze outils `MCP` cohérents et un domaine ontologique `Apache Ossie` précis), l'entropie fonctionnelle réelle est beaucoup plus basse.

En combinant **affinage supervisé (`SFT`)** sur 2 000 à 15 000 trajectoires d'or compilées et **alignement préférentiel (`DPO`)** sur 500 à 2 000 corrections contrastives `HOTL` au moyen d'**adaptateurs de rang faible (`LoRA` / `QLoRA`, rang \(r \in \{16, 32, 64\}\))**, on obtient une architecture d'inférence mutualisée redoutable (**Multi-LoRA Serving** sur `vLLM` ou `SGLang`) : un **unique modèle de base `8B` chargé une seule fois en mémoire `VRAM`** sert dynamiquement dans le même lot (*batch*) **vingt adaptateurs `LoRA` métiers distincts** de quelques dizaines de mégaoctets chacun, sans coût de commutation!

### L'équation de rentabilité et le routage dynamique conscient de l'incertitude

La distillation comporte un coût fixe d'entraînement et de validation \(C_{\text{distill}}\) amorti sur le volume mensuel d'exécutions \(V\). Si \(c_T\) désigne le coût par exécution du modèle enseignant, \(c_S \ll c_T\) celui du `SLM` élève, et \(\alpha \in [0, 1]\) la fraction du trafic résolue directement par le `SLM` sans escalade vers l'enseignant, le seuil mensuel de rentabilité nette \(V_{\min}\) vérifie :

\[V \cdot \alpha \cdot (c_T - c_S) > \frac{C_{\text{distill}}}{M_{\text{amort}}} \iff V_{\min} = \frac{C_{\text{distill}}}{M_{\text{amort}} \cdot \alpha \cdot (c_T - c_S)}\]

Avec des paramètres industriels typiques en 2027 (\(C_{\text{distill}} = 900\,\$\text{ CAD}\) GPU et CI inclus, durée de vie \(M_{\text{amort}} = 3\text{ mois}\) avant rafraîchissement, \(c_T = 0{,}042\,\$\), \(c_S = 0{,}003\,\$\) et \(\alpha = 0{,}82\)), le point mort est franchi dès **\(V_{\min} \approx 9\,380\) exécutions par mois** — soit à peine trois cents dossiers par jour! Au-delà, chaque million de transactions économise plus de **31 000 \$ CAD** tout en divisant par quatre le `TTFT`.

Pour ne jamais sacrifier la qualité sur les cas inédits (nouveau produit, clause juridique atypique), `agentgateway` maintient une **cascade à rejet d'incertitude** : si l'entropie log-probabiliste des jetons structurels émis par le `SLM` dépasse un seuil \(\tau_H\) étalonné sur le jeu de validation ou si le validateur de préconditions signale un cas hors distribution, la requête est **transparentement rejouée en moins de 300 ms vers le modèle enseignant frontière** — dont la résolution viendra à son tour nourrir le prochain cycle trimestriel de distillation!

| Critère opérationnel | 100 % Modèle Frontière (*Teacher*) | `SLM` générique nu (sans distillation) | Cascade `SLM LoRA` distillé (`85 %`) + *Teacher* (`15 %`) |
|---|---|---|---|
| **Constance \(\text{pass}^5\) (\(\tau\)-bench métier)** | **97,4 %** (Référence) | 71,8 % *(insuffisant en `L3`)* | **97,2 %** (Parité préservée) |
| **Latence `p95` par tour d'outil** | 2 450 ms | **340 ms** | **490 ms** (`-80 %` en médiane) |
| **Coût moyen pour 1 000 résultats** | 42,00 \$ CAD | 3,10 \$ CAD *(mais échecs coûteux)* | **8,95 \$ CAD (`-78,7 %` net)** |
| **Souveraineté & exécution `Edge`** | Dépendante d'API ou gros cluster | Possible mais peu fiable | **Exécutable localement sur 1 GPU / `Edge`** |

#### Extrait 31.1 — Pipeline déclaratif de curation, distillation `LoRA` et porte de promotion \(\text{pass}^5\) (`flywheel_distill_gate.py`)

Ce portier automatisé valide simultanément l'absence de mémorisation `PII`, la parité \(\text{pass}^5\) sur jeu *Holdout* scellé et le gain économique avant d'autoriser l'enregistrement d'un nouvel adaptateur `LoRA` en production :

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class DistillationCandidateMetrics:
    adapter_id: str
    teacher_holdout_pass5: float
    student_holdout_pass5: float
    canary_pii_memorization_hits: int
    asi06_adversarial_bypass_rate: float
    p95_latency_ms: int
    estimated_cost_saving_ratio: float


def evaluate_slm_promotion_gate(
    m: DistillationCandidateMetrics,
) -> tuple[bool, str]:
    if m.canary_pii_memorization_hits > 0:
        return (False, "BLOCK_LAW25_PII_MEMORIZATION_DETECTED")

    if m.asi06_adversarial_bypass_rate > 0.005:
        return (False, "BLOCK_SECURITY_REGRESSION_ASI06")

    if m.teacher_holdout_pass5 <= 0:
        return (False, "INVALID_TEACHER_BASELINE")

    parity = m.student_holdout_pass5 / m.teacher_holdout_pass5
    if parity < 0.99:
        reason = f"BLOCK_PASS5_PARITY_LOW:{parity:.4f}<0.9900"
        return (False, reason)

    low_saving = m.estimated_cost_saving_ratio < 0.40
    if low_saving or m.p95_latency_ms > 900:
        return (False, "BLOCK_INSUFFICIENT_EFFICIENCY_GAIN")

    return (True, f"PROMOTE_CANARY_10PCT:{m.adapter_id}")
```

### Prévenir l'ossification : détection du Model Drift et cycle de décommissionnement

Un `SLM` spécialisé est redoutablement efficace tant que le monde métier ressemble à sa distribution d'entraînement, mais vieillit dès qu'une nouvelle réglementation fiscale ou une nouvelle gamme de machines apparaît. Deux mécanismes empêchent cette ossification silencieuse :
1. **Échantillonnage sentinelle permanent de 2 % sur l'Enseignant** : Même lorsqu'un `SLM` est promu en régime établi, `agentgateway` continue de router aléatoirement en ombre 2 % des requêtes vers le modèle frontière de référence afin de mesurer en continu l'écart de décision en conditions réelles. Dès que le taux d'accord glissant sur sept jours fléchit de plus de 1,5 point, une alerte déclenche une recompilation/redistillation sur les données fraîches et relève temporairement le seuil de repli vers l'enseignant.
2. **Date de péremption obligatoire des adaptateurs (`TTL` 90 à 180 jours)** : Inscrit au Registre d'Agents (`Chapitre 22`), tout adaptateur `LoRA` non ré-homologué sur le jeu *Holdout* actualisé à son échéance semestrielle est automatiquement décommissionné au profit du palier supérieur.

### Protocole d'audit mathématique de non-mémorisation par exposition de canaris (*Canary Exposure Test*)

Pour apporter une preuve opposable au responsable de la protection des renseignements personnels (`Loi 25`) qu'un adaptateur `LoRA` distillé n'a mémorisé aucune séquence nominative résiduelle susceptible d'être régurgitée devant un autre utilisateur, le pipeline d'affinage applique la méthode d'**exposition différentielle de Carlini**. Lors de la constitution du jeu d'entraînement assaini, le sas insère \(K = 200\) chaînes secrètes synthétiques uniques au format exact d'un identifiant sensible (ex. `POLICE-CANARI-9481-7720`).

Une fois l'affinage `SFT + DPO` achevé, le vérificateur compare la perplexité log-vraisemblance assignée par le modèle élève à ces 200 canaris vus pendant l'entraînement face à 10 000 canaris témoins jamais présentés. Si le rang de vraisemblance d'un seul canari d'entraînement se distingue statistiquement des témoins (exposition \(> \tau_{\text{mem}}\)) ou si un décodage glouton préfixé complète un seul chiffre exact, la régularisation (`Dropout LoRA`, écrêtage de norme de gradient type *Differential Privacy SGD* ou dédoublonnage accru) est jugée insuffisante et **l'artefact de poids est détruit automatiquement avant toute copie hors du bac d'entraînement**.

### Ingénierie du service Multi-LoRA haute densité et dimensionnement VRAM

L'économie radicale de la distillation en entreprise ne provient pas uniquement de la petitesse du modèle élève (`8B` contre `400B`), mais de la **mutualisation matérielle des adaptateurs en mémoire GPU**. Déployer vingt conteneurs GPU séparés pour vingt agents spécialisés laisserait 85 % des unités de calcul inactives aux heures creuses de chaque division.

Grâce aux noyaux CUDA/Triton de multiplication matricielle groupée hétérogène (`S-LoRA` / `Punica` intégrés nativement dans `vLLM` et `SGLang`), un seul serveur doté de deux cartes `80 Go` maintient un **unique tronc gelé** \(W_0\) en précision `FP8` (~`8,5 Go`) et applique à la volée, requête par requête au sein du même lot continu (*Continuous Batching*), le couple d'adaptateurs de bas rang \(\Delta W_m = B_m A_m\) propre à la route métier \(m\). L'empreinte mémoire additionnelle totale pour héberger \(M\) adaptateurs actifs simultanés de rang \(r\) sur \(L\) couches de dimension \(d\) demeure dérisoire :

\[M_{\text{VRAM}}^{\text{total}} = M_{\text{tronc}}(W_0) + M_{\text{KV-cache}} + \sum_{m=1}^{M} 2 \, L \, N_{\text{proj}} \, d \, r \, b_{\text{octets}}\]

Pour un modèle `8B` (\(L = 32\), \(d = 4096\), \(r = 32\), `FP16` à \(b = 2\text{ octets}\)), **chaque adaptateur métier complet pèse à peine `67 Mo`** : héberger simultanément en `VRAM` chaude **trente spécialistes métiers distincts** n'occupe que `2,0 Go`, laissant plus de `140 Go` disponibles pour le `KV-cache` partagé et permettant d'absorber des centaines de requêtes concurrentes avec un `TTFT` médian inférieur à `90 ms`.

| Phase trimestrielle du cycle `LoRA` | Volume minimal requis | Action automatisée du pipeline `ADLC` | Garde-fou de sécurité et de réversibilité |
|---|---|---|---|
| **1. Collecte & Assainissement (`J+1` à `J+75`)** | \(\ge 2\,500\) sagas réussies + paires `HOTL` | Filtrage `ODRL`, désidentification `Loi 25` + injection 200 canaris | Rejet de toute session ayant levé une alerte `ASI01`/`ASI06` |
| **2. Compilation & Affinage (`J+76` à `J+80`)** | Jeu partitionné `70 / 15 / 15` | Optimisation `MIPROv2` puis `SFT + DPO` sur rang `r = 32` | Test d'exposition de Carlini (`0` mémorisation tolérée) |
| **3. Recette & `Canary` (`J+81` à `J+90`)** | Suite \(\tau\)-bench *Holdout* scellée | Porte \(\text{pass}^5 \ge 99\,\%\) du *Teacher* puis trafic `10 % → 100 %` | Conservation de l'adaptateur `N-1` en `VRAM` pour rollback `< 5 s` |
| **4. Exploitation & Extinction (`J+91` à `J+180`)** | Trafic nominal en cascade | Sentinelle ombre `2 %` vers *Teacher* ; révocation à `TTL` échu | Repli transparent vers le *Teacher* si entropie `> 0,42` |

#### Extrait 31.2 — Règle de routage en cascade à rejet d'entropie et sentinelle 2 % (`cascade-flywheel-route.yaml`)

Cette configuration d'`agentgateway` orchestre l'exécution nominale sur l'adaptateur `LoRA` distillé, la bascule instantanée sur incertitude et la mesure continue de dérive :

```yaml
apiVersion: gateway.aaif.linuxfoundation.org/v1
kind: CognitiveCascadeRoute
metadata:
  routeId: "boreal-warranty-triage-cascade-v3"
spec:
  studentTier:
    baseModel: "boreal-base-8b-fp8"
    loraAdapter: "warranty-triage-lora-2027q4"
    maxTokenEntropyThreshold: 0.42
    requireValidMcpSchemaDecode: true
  teacherFallbackTier:
    modelAlias: "frontier-reasoning-tier1"
    triggerOnEntropyExceed: true
    triggerOnOodDetectorScoreAbove: 0.78
  continuousDriftSentinel:
    shadowSampleRatioToTeacher: 0.02
    rollingWindowDays: 7
    minAgreementRateBeforeRetrainAlert: 0.985
    adapterHardExpirationUtc: "2028-03-31T23:59:59Z"
```

::: {.encadre-sectoriel title="Secteur Financier (BSIF E-23) & Santé — Gouvernance du risque de modèle sur adaptateurs distillés fréquents"}

Comment concilier un cycle trimestriel ou mensuel d'affinage `LoRA` avec l'exigence de validation indépendante des modèles prévue par **`BSIF E-23`** ou les référentiels cliniques ? L'erreur consiste à traiter chaque rafraîchissement d'adaptateur comme un nouveau système inédit soumis à six mois de comité manuel. Les institutions matures font homologuer une fois par an par la seconde ligne de défense **l'usine de distillation elle-même et ses bornes mathématiques d'acceptation** (*Pre-Approved Change Control Plan*, inspiré du cadre `PCCP` des autorités médicales) : tant que le tronc de base, la taxonomie d'outils `MCP`, le test canari nul et la parité \(\text{pass}^5 \ge 99\,\%\) sur le jeu *Holdout* gouverné par le Risque sont intégralement respectés et consignés dans un registre lignager immuable (`Dataset Hash -> LoRA SHA-256 -> Rapport τ-bench`), la promotion `Canary` s'opère sans gel bureaucratique.

:::

---

## 31.4 Application au fil rouge : distillation des huit flux majeurs et bilan consolidé de la Fabrique Agentique Boréal

Clôturons l'épopée industrielle et financière du **Groupe Boréal Inc.** en mesurant l'effet cumulatif de ce volant d'inertie cognitif à l'échelle des trois divisions.

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Compression de 68 % du Cost-per-Outcome groupe par compilation DSPy et Multi-LoRA"}

**Chantier d'optimisation T2–T4 2027** : Une fois la fiabilité fonctionnelle et réglementaire acquise sur ses 11 sagas transversales, la cellule FinOps IA du *Hub* Boréal (Chapitre 23 et Chapitre 25) a constaté que **8 flux haute fréquence** (triage vibratoire BSN, qualification de garantie BCA, rapprochement documentaire d'expédition BEL, extraction d'avenants, routage multilingue de billets, normalisation nomenclature `Apache Ossie`, pré-diagnostic `SRE` et classification douanière) représentaient **84 % de la consommation totale de jetons** du groupe.

**Mise en œuvre du volant d'inertie** :
1. **Sas d'assainissement certifié `Loi 25`** : 190 000 trajectoires positives validées par `Temporal` et 6 400 arbitrages contrastifs issus des consoles `HOTL` ont été anonymisés avec injection de 500 canaris synthétiques (`0` mémorisation détectée à l'audit).
2. **Compilation déclarative puis Multi-LoRA sur 4 GPU internes** : Une première passe d'optimisation automatique des signatures a réduit de 38 % la taille des préfixes de consignes tout en augmentant la réutilisation du `KV-cache`. Une seconde passe d'affinage `SFT + DPO` a produit **8 adaptateurs `LoRA`** servis simultanément sur le même modèle de base `8B` (qui alimente également en version quantifiée `INT4` les boîtiers `Edge` miniers du Chapitre 28!).

**Impact consolidé vérifié sur l'exercice** :
* **Parité de fiabilité intacte** : Score moyen \(\text{pass}^5\) sur les 8 suites \(\tau\)-bench passé de 97,1 % (modèle frontière initial à prompt manuel) à **97,6 %** avec la cascade `86 % SLM LoRA + 14 % Teacher`.
* **Chute de 68 % du *Cost-per-Outcome* moyen sur ces 8 flux** (ramené de `0,91 $ CAD` en début d'année à **`0,29 $ CAD`** au quatrième trimestre, tirant la moyenne globale du groupe à `0,41 $ CAD`), dégageant **1,45 M\$ CAD** de marge additionnelle autofinançant l'intégralité du Centre d'Excellence Agentique.

:::

---

## 31.5 Décision d'architecture normative, conclusion générale du Compendium 2027 et points de contrôle

La trente et unième et dernière décision `ADR-031` scelle le registre architectural de ce compendium avant notre conclusion générale.

::: {.adr title="ADR-031 — Compilation déclarative des consignes et volant de distillation continue LLM → SLM sous sas anti-PII et porte pass^5"}

* **Statut** : Acceptée | **Périmètre** : Plateforme IA, FinOps & Cycle de Vie des Modèles | **Révision** : Semestrielle
* **Contexte** : Maintenir des consignes artisanales fragiles et exécuter indéfiniment des volumes répétitifs élevés sur des modèles frontières généralistes expose l'entreprise à des coûts unitaires prohibitifs, à une latence élevée et à des régressions lors de chaque changement de modèle.
* **Options évaluées** :
  1. *Statu quo sur modèles frontières externes avec optimisation manuelle ponctuelle des prompts* : **Rejetée** — non compétitive économiquement à grande échelle et dépendante d'un savoir-faire artisanal non reproductible.
  2. *Pré-entraînement maison d'un modèle fondationnel propriétaire à partir de zéro* : **Rejetée** — gouffre financier en capital GPU sans avantage mesurable face à la distillation ciblée sur modèles *Open-Weights* de pointe.
  3. *Compilation programmatique des signatures cognitives (type `DSPy`) couplée à un volant trimestriel de distillation `SFT + DPO` par adaptateurs `LoRA` sur traces assainies, protégé par une porte de parité \(\text{pass}^5 \ge 99\,\%\) et une cascade à rejet d'incertitude*. **Retenue**.
* **Décision** : (a) Versionner les agents sous forme de signatures compilables plutôt que de prompts monolithiques figés ; (b) interdire tout entraînement sur traces brutes non purgées de `PII` (`Loi 25`), de clauses `ODRL` restrictives ou d'alertes `ASI06` ; (c) conditionner la promotion de tout `SLM` distillé à la parité \(\text{pass}^5\) sur jeu *Holdout* scellé, assortie d'un échantillonnage sentinelle continu de 2 % vers l'enseignant et d'une date d'expiration d'adaptateur.
* **Conséquences** : Avantage économique et de latence composé trimestre après trimestre et souveraineté accrue sur les poids spécialisés, en contrepartie de la gouvernance stricte des jeux d'entraînement et du pipeline MLOps/AgentOps d'affinage.

:::

### Conclusion générale du Compendium 2027 — L'architecture comme art de domestiquer et composer l'autonomie

Au terme des dix parties et des trente et un chapitres de ce compendium de six cents pages, une conviction d'ingénierie fédère chaque protocole, chaque théorème de fiabilité et chaque garde-fou explorés : **la performance durable de l'entreprise agentique ne naît jamais de l'abandon des garanties déterministes à l'illusion d'un modèle omniscient, mais de l'encastrement méthodique de l'intelligence probabiliste dans les fondations éprouvées des systèmes distribués, de la cryptographie, du droit positif et de la responsabilité humaine**.

Découpler la cellule de raisonnement d'un moteur d'exécution durable (`Temporal`, `Restate`), séparer l'accès vertical aux outils (`MCP`) de la coopération horizontale entre pairs (`A2A v1.0`, `AGNTCY`), ancrer le sens métier dans des couches sémantiques et bi-temporelles explicites (`Apache Ossie`, `Graphiti`), atténuer cryptographiquement chaque saut d'identité (`SPIFFE`, `OAuth 2.1 OBO`), protéger activement la vigilance critique de l'opérateur humain (`HOTL`), fédérer les partenaires B2B sans livrer ses marges (`EDC` / `ODRL`, `vLEI`, `AP2`), maîtriser sa souveraineté cognitive et ses sites déconnectés (`TEE`, `Cognitive DR`, `CRDT`, `Simplex ROS 2`), puis retourner cette usine gouvernée vers la modernisation de son propre patrimoine et la distillation continue de ses modèles (`Agentic SDLC`, `DataOps`, `Multi-LoRA`) procèdent d'une seule et même discipline architecturale : **rendre toute erreur stochastique inévitable localisée, observable, réversible et économiquement bornée**.

Les organisations qui prendront une avance décisive d'ici 2030 ne seront ni celles qui auront multiplié les démonstrateurs incontrôlables, ni celles qui auront différé l'action par crainte réglementaire, mais celles qui auront bâti ce **tissu conjonctif ouvert, frugal, souverain et humainement gouverné**.

| Partie du Compendium | Invariant architectural non négociable | Standard ou mécanisme pivot |
|---|---|---|
| **I — Fondations** | Séparer le contrôle d'état déterministe du raisonnement stochastique | Maturité `N1–N5`, loi de Lusser |
| **II — Protocoles ouverts** | Découpler outils verticaux, pairs horizontaux et règlement B2B | `MCP`, `A2A v1.0`, `AGNTCY`, `AG-UI`, `AP2` |
| **III — Sémantique & Mémoire** | Unifier le sens métier et la validité bi-temporelle des faits | `Apache Ossie`, graphes `Graphiti` |
| **IV — Orchestration durable** | Exiger idempotence et sagas à compensation sur toute mutation | `Temporal` / `Restate`, `agentgateway` |
| **V — Intégration SI réel** | Fédérer les jardins SaaS et valider l'`OT` sur jumeau numérique | `OPC-UA`, `CUA` transitoire encadré |
| **VI — Identité & Sécurité** | Imposer une `NHI` atténuée à chaque saut et des garde-fous hors LLM | `SPIFFE`, `OAuth 2.1 OBO`, `Cedar`, `OpenSandbox` |
| **VII — AgentOps & FinOps** | Piloter par constance \(\text{pass}^k\) et coût par résultat vérifié | `OTel gen_ai.*`, \(\tau\)-bench, `KV-cache` |
| **VIII — Droit & Modèle `HOTL`** | Préserver le discernement humain actif et l'opposabilité légale | `BSIF E-23`, `Loi 25`, `EU AI Act`, `Hub & Spoke` |
| **IX — B2B, Souveraineté & `Edge`** | Collaborer sans livrer ses secrets et survivre aux coupures réseau | `EDC`/`ODRL`, `vLEI`, `TEE`, `CRDT`, `Simplex` |
| **X — Ingénierie & Distillation** | Prouver le code par l'oracle et distiller les traces vers des `SLM` | `Agentic SDLC`, `ODCS`, `DSPy`, `Multi-LoRA` |

### Liste de contrôle de mise en production — Chapitre 31

1. **Signal d'ancrage métier vérifié** : Le volant d'inertie sélectionne-t-il uniquement les traces issues de sagas terminées avec succès sans compensation ni litige aval, complétées par les paires contrastives `HOTL` ?
2. **Sas d'assainissement `Loi 25` et `ODRL`** : Les traces d'entraînement excluent-elles les partenaires opposés contractuellement et subissent-elles une désidentification irréversible validée par injection de canaris anti-mémorisation ?
3. **Filtrage anti-empoisonnement (`ASI06`)** : Toute trace comportant un soupçon d'injection indirecte ou un rejet de politique `Cedar` est-elle bannie du corpus de distillation ?
4. **Étanchéité du jeu *Holdout* scellé** : Les 15 % de scénarios d'homologation finale sont-ils mathématiquement disjoints des données d'affinage `LoRA` et de sélection d'exemples `DSPy` ?
5. **Signatures cognitives compilables** : Les consignes d'agents critiques sont-elles générées et optimisées programmatiquement contre une métrique explicite plutôt que figées à la main ?
6. **Porte de parité \(\text{pass}^5 \ge 99\,\%\)** : Le pipeline bloque-t-il automatiquement tout modèle élève qui dégrade de plus de 1 % la constance multi-essais du modèle enseignant ?
7. **Cascade à rejet d'entropie sur `agentgateway`** : Les requêtes ambiguës ou hors distribution sont-elles rejouées dynamiquement vers le modèle enseignant sans échec visible pour l'utilisateur ?
8. **Sentinelle 2 % et péremption d'adaptateur** : Un échantillonnage continu en ombre surveille-t-il la dérive réelle du `SLM` avec expiration obligatoire de l'adaptateur à six mois ?
