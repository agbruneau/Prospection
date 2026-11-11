# Chapitre 29 — Usine logicielle agentique (Agentic SDLC) et modernisation assistée du patrimoine

::: {.synthese-executive title="Synthèse exécutive — Chapitre 29"}

* **Enjeu stratégique** : En 2027, passer de l'autocomplétion individuelle de code en IDE à des flottes asynchrones d'agents logiciels capables d'ouvrir des demandes de tirage (*Pull Requests*) multiplie par cinq le débit brut d'écriture, mais déplace le goulot d'étranglement vers la **vérification d'exactitude, la sécurité et la cohérence architecturale**. Sur les cœurs patrimoniaux (`IBM i RPG`, `COBOL/CICS`, `PL/SQL`) dépourvus de tests unitaires et où la documentation a vingt ans de retard, une réécriture générative directe (« Big Bang IA ») échoue systématiquement en oubliant les règles fiscales ou actuarielles implicites enfouies dans les cas limites historiques.
* **Décisions architecturales structurantes** :
  1. *Irréversible en gouvernance d'ingénierie* : Structurer l'**`Agentic SDLC`** autour d'une **séparation cryptographique des devoirs** : l'agent qui écrit le code dans un espace de travail isolé (`OpenSandbox` + `git worktree`) n'a jamais le droit de modifier le harnais de tests d'acceptation ni d'approuver sa propre fusion, laquelle exige des portes déterministes non-IA (typage, tests de mutation, `SAST`) et une revue contradictoire multi-familles de modèles.
  2. *Structurante pour l'extinction de la dette `CUA` (Chapitre 16)* : Industrialiser la modernisation patrimoniale par le patron **Strangler Fig neuro-symbolique** combinant graphe d'appel statique exact (`AST` / `SCIP`), génération automatique d'oracles de caractérisation (*Golden Master*) sur transactions historiques réelles et **double exécution en ombre (*Shadow Mirroring*)** pendant trente jours avant bascule.
* **Indicateurs de gouvernance** : Score de mutation minimal exigé sur tout code généré (\(\ge 85\,\%\) de mutants tués), divergence tolérée en *Shadow Mirroring* financier (`0,00 $` sur \(\ge 100\,000\) transactions), taux de régression post-déploiement (`< 0,5 %`) et nombre d'écrans `CUA` décommissionnés au profit de serveurs `MCP` natifs.

:::

## 29.1 Topologie d'une usine logicielle agentique d'entreprise : séparation des devoirs, graphes AST/SCIP et revue contradictoire

L'adoption massive des assistants de programmation entre 2024 et 2026 a mis en lumière une loi empirique implacable dans les grandes équipes d'ingénierie : **accélérer la production de lignes de code sans accélérer symétriquement la preuve mécanique de leur justesse ne fait qu'engorger les ingénieurs seniors sous une montagne de revues de code subtiles et épuisantes**. Pis encore, lorsqu'un même modèle génère à la fois l'implémentation d'une fonction métier et le test unitaire censé la valider, il reproduit exactement la même incompréhension fonctionnelle des deux côtés de l'assertion — produisant une suite de tests 100 % verte mais métier-fausse (*Tautological Testing Antipattern*).

### Ancrer la compréhension du dépôt dans un graphe symbolique exact (`AST` / `SCIP` / `LSP`)

Dans un monoréférentiel ou un parc de microservices totalisant dix millions de lignes de code, la recherche purement vectorielle par similarité lexicale (*Code RAG* naïf) échoue dès qu'il s'agit d'évaluer l'impact réel d'une modification de contrat de données : elle ramène des fonctions au nom ressemblant mais manque un appelant indirect passant par une interface générique ou un déclencheur SQL.

Une usine **`Agentic SDLC`** de calibre production ancre par conséquent toute exploration d'agent sur un **index sémantique déterministe de code**, exposé en lecture via un serveur `MCP` dédié interrogeant l'arbre syntaxique abstrait (**`AST` / `Tree-sitter`**), le protocole **`LSP`** et un graphe d'indexation inter-dépôts de type **`SCIP` (*SCIP Code Intelligence Protocol*)**. Avant d'écrire la moindre ligne, l'agent planificateur extrait la fermeture transitive exacte des appelants, des schémas `Protobuf`/`OpenAPI` impactés et des propriétaires `CODEOWNERS` concernés.

![Architecture de l'usine logicielle Agentic SDLC et modernisation patrimoniale Strangler Fig : extraction AST/SCIP, séparation bâtisseur/oracle/critique et bascule Shadow Mirroring.](manuscrit/figures/fig-29-usine-logicielle-agentic-sdlc.svg)

### Quatre rôles d'agents cloisonnés par droits d'écriture distincts

Pour transposer au génie logiciel le principe de séparation des tâches (*Segregation of Duties* du Chapitre 18), l'orchestrateur durable (`Temporal`) découpe toute tâche d'ingénierie en quatre acteurs dotés de jetons et de systèmes de fichiers distincts :

1. **L'Agent Spécificateur et Auteur d'Oracle (Accès écriture : uniquement `/specs` et `/tests/acceptance`)** : À partir du billet d'exigence et de l'ontologie `Apache Ossie`, il rédige les invariants formels, les tests basés sur les propriétés (*Property-Based Testing* — ex. `Hypothesis`, `proptest`) et les cas limites d'acceptation. Il ne voit jamais le code d'implémentation candidat.
2. **L'Agent Bâtisseur en Bac à Sable Isolé (Accès écriture : uniquement `/src` et `/tests/unit` dans un `git worktree` éphémère sous `OpenSandbox`)** : Dépourvu d'accès réseau Internet libre (dépôt interne de paquets approuvés uniquement pour parer au *Slopsquatting* — l'hallucination d'un nom de bibliothèque piégé par un attaquant, risque `OWASP ASI04`), il itère jusqu'à satisfaire le compilateur et l'oracle en lecture seule.
3. **Le Portier Déterministe Non-IA (Pipeline CI immuable)** : Aucune opinion de modèle ne peut contourner six portes binaires : compilation sans avertissement, typage statique strict, analyse statique de sécurité (`SAST` / détection de secrets), vérification de licence et `SBOM`, exécution de l'oracle d'acceptation, et **tests de mutation (*Mutation Testing*)**. Ce dernier contrôle injecte automatiquement des centaines de micro-altérations syntaxiques dans le code généré (`>` changé en `>=`, négation d'une garde, suppression d'un arrondi) et vérifie que la suite de tests échoue bien sur au moins **85 % des mutants** — prouvant mathématiquement la densité réelle des vérifications.
4. **L'Agent Critique Contradictoire Multi-Familles + Mainteneur Humain** : Pour briser le biais d'auto-complaisance par lequel un modèle juge favorablement son propre style syntaxique, la revue automatisée de sécurité, de concurrence et de maintenabilité est confiée à un modèle issu d'une **famille architecturale distincte** de celle du bâtisseur, avant présentation d'un dossier condensé de preuves à l'ingénieur humain signataire.

| Garde-fou `Agentic SDLC` | Pathologie générative neutralisée | Mécanisme déterministe d'application |
|---|---|---|
| **Cloisonnement Oracle vs Bâtisseur** | Tests tautologiques complaisants codant le même bogue que le code | Droits `ACL` Git refusant à l'identité `NHI` du bâtisseur toute écriture sous `tests/acceptance/` |
| **Miroir interne de paquets scellé** | *Package Hallucination / Slopsquatting* (`OWASP ASI04`) | Zéro egress vers `npm`/`PyPI`/`crates.io` publics ; proxy interne à liste blanche `SBOM` |
| **Seuil de tests de mutation (\(\ge 85\,\%\))** | Couverture de lignes trompeuse sans assertions métiers fortes | Exécution `cargo-mutants` / `Stryker` / `mutmut` bloquante dans le pipeline |
| **Critique hétérogène + signature humaine** | Angles morts partagés d'une même famille de poids et perte de maîtrise | Modèle critique distinct + fusion `main` protégée par signature `GPG`/`SSH` d'un ingénieur |

### Pilotage par métriques DORA adaptées à l'ère agentique : éviter l'illusion du débit brut

Évaluer une usine logicielle agentique au nombre de demandes de tirage ouvertes ou de lignes générées par semaine est un contre-sens managérial majeur : un agent non bridé peut produire dix mille lignes verbeuses en une heure tout en ralentissant le délai réel de mise en production sûre. Les directions d'ingénierie matures pilotent leur `Agentic SDLC` par quatre indicateurs couplés :

1. **Temps de cycle net jusqu'à fusion vérifiée (*Verified Merge Lead Time*)** : Durée totale incluant la revue humaine et les portes de mutation — si ce délai augmente alors que la génération s'accélère, les lots soumis par les agents sont trop volumineux et doivent être bornés à \(\le 250\) lignes modifiées par PR atomique.
2. **Taux d'échec post-changement (*Change Failure Rate*) et survie du code à 30 jours (*Code Churn 30d*)** : Mesure le pourcentage de code généré par agent qui doit être réécrit ou annulé dans le mois suivant sa mise en production (seuil d'alerte fixé à `> 8 %`).
3. **Densité d'invariants formels par millier de lignes** : Ratio entre assertions de propriétés / tests *Golden Master* et volume de code applicatif.
4. **Coût complet d'ingénierie par point fonctionnel modernisé** : Somme des jetons d'analyse, d'exécution `OpenSandbox` de compilation/mutation et du temps d'architecte validateur rapportée au service patrimonial effectivement éteint.

### Spécification algébrique par propriétés (*Property-Based Testing*) scellée contre la triche d'agent

Même séparé de l'agent bâtisseur, un oracle d'acceptation composé uniquement de dix exemples statiques (`input -> output` fixes) demeure vulnérable au sur-apprentissage syntaxique : un agent codeur qui observe les messages d'échec du pipeline peut involontairement spécialiser ses branchements pour satisfaire ces cas ponctuels sans respecter la loi mathématique sous-jacente du domaine.

L'Agent Spécificateur exprime donc systématiquement les invariants métiers sous forme de **propriétés universelles quantifiées** (`Hypothesis` en Python, `proptest` en Rust, `fast-check` en TypeScript). À chaque exécution CI dans le répertoire verrouillé `/tests/acceptance`, le moteur génère des milliers de combinaisons aléatoires et adverses aux frontières (montants nuls, années bissextiles, taux extrêmes) et réduit automatiquement tout contre-exemple au cas minimal reproductible (*Shrinking*).

#### Extrait 29.0 — Harnais d'invariants algébriques en lecture seule pour l'agent bâtisseur (`lease_invariants_test.py`)

Rédigé exclusivement par l'agent d'oracle et protégé par `ACL` Git, ce harnais prouve le déterminisme, la conservation comptable au centime et la monotonie actuarielle sur des milliers de tirages :

```python
from decimal import Decimal
from hypothesis import given, strategies as st

cents = st.decimals(
    min_value=Decimal("100.00"),
    max_value=Decimal("500000.00"),
    places=2,
    allow_nan=False,
    allow_infinity=False,
)
rates = st.decimals(
    min_value=Decimal("0.0000"),
    max_value=Decimal("0.1500"),
    places=4,
    allow_nan=False,
    allow_infinity=False,
)
months = st.integers(min_value=1, max_value=84)


def make_oracle_suite(calc_fn):
    @given(
        principal=cents,
        rem_months=months,
        rebate_rate=rates,
    )
    def test_buyout_algebraic_laws(
        principal: Decimal,
        rem_months: int,
        rebate_rate: Decimal,
    ) -> None:
        q1 = calc_fn(principal, rem_months, rebate_rate)
        q2 = calc_fn(principal, rem_months, rebate_rate)
        # 1. Déterminisme pur et échelle au centime exact
        assert q1 == q2
        assert q1.total_payout.as_tuple().exponent == -2
        # 2. Identité comptable exacte sans perte d'arrondi
        expected = (
            q1.principal_balance
            - q1.actuarial_rebate
            + q1.provincial_tax
        )
        assert q1.total_payout == expected
        # 3. Monotonie temporelle de la remise actuarielle
        if rem_months > 1:
            q_next = calc_fn(
                principal, rem_months - 1, rebate_rate
            )
            assert (
                q1.actuarial_rebate >= q_next.actuarial_rebate
            )

    return test_buyout_algebraic_laws
```

---

## 29.2 Modernisation industrielle du patrimoine (RPG, COBOL, PL/SQL) : extraction neuro-symbolique et patron Strangler Fig

Au Chapitre 16, nous avions formulé une règle d'hygiène architecturale essentielle : recourir à un *Computer-Use Agent* (`CUA`) pilotant un écran vert `5250`/`3270` constitue un **pont tactique transitoire**, jamais une cible pérenne. Or, comment moderniser concrètement en 2027 un cœur patrimonial de 1,5 million de lignes **`RPG ILE` sur `IBM i (AS/400)`** ou **`COBOL/CICS` sur `z/OS`** qui calcule chaque nuit au centime près des amortissements de crédit-bail, des retenues fiscales interprovinciales et des réserves actuarielles, sans risquer le désastre d'une réécriture aveugle ?

### Pourquoi la traduction fichier par fichier par LLM échoue sur les systèmes centraux

Demander directement à un grand modèle de « traduire ce programme `COBOL` de 8 000 lignes en service `Go` ou `Rust` » échoue en production pour trois raisons techniques précises :
* **L'arithmétique décimale fixe et les arrondis bancaires implicites** : Une division intermédiaire en décimal condensé (`COMP-3` / `PACKED(15:4)` en `RPG`) avec troncature à la quatrième décimale ne produit pas le même résultat sur trente-six mensualités qu'un flottant `IEEE 754` (`float64`), générant des écarts d'arrondi rédhibitoires en audit financier.
* **Le couplage par zones mémoire partagées et fichiers physiques** : Les règles métiers réelles sont éclatées entre des structures d'inclusion (`COPYBOOK` / `/COPY`), des indicateurs numériques conditionnels historiques (`*IN01` à `*IN99`), des tables de paramètres `DB2` et des lots nocturnes `CL`/`JCL`.
* **Les bogues historiques devenus fonctionnalités contractuelles** : Certaines exceptions codées en dur en 2004 reflètent des avenants contractuels toujours en vigueur mais absents de tout cahier des charges écrit.

### La méthode en quatre phases : Analyseur Symbolique → Harnais Golden Master → Génération Typée → Shadow Mirroring

L'usine agentique de modernisation patrimoniale combine **analyse statique formelle** et **synthèse cognitive bornée** pour remplacer le système central brique par brique selon le patron du figuier étrangleur (*Strangler Fig*) :

1. **Découpage de domaine par graphe d'accès aux tables (*Bounded Context Slicing*)** : Un parseur grammatical déterministe (`ANTLR` / `Tree-sitter` spécialisé `RPG`/`COBOL`) construit le graphe biparti complet \(\mathcal{G} = (P, T, E)\) reliant chaque programme \(p \in P\) aux tables physiques `DB2` \(t \in T\) lues ou mutées. Un algorithme de partitionnement identifie les sous-graphes à couplage minimal (ex. *Calcul de rachat anticipé de bail*, *Vérification de plafond de garantie*) extractibles sous forme de serveur `MCP` autonome.
2. **Capture d'un oracle *Golden Master* de caractérisation (10 000 à 100 000 cas réels)** : Avant d'écrire une seule ligne du nouveau service, on rejoue ou capture par journalisation non intrusive un large échantillon stratifié d'entrées/sorties historiques réelles de production (anonymisées si nécessaire), enrichi de cas synthétiques aux frontières générés par solveur de contraintes (`Z3`) à partir des conditions de branchement extraites de l'`AST` patrimonial. Ce jeu immuable devient **la définition mathématique de la vérité fonctionnelle**.
3. **Synthèse du service moderne en arithmétique décimale exacte et exposition `MCP`** : L'agent bâtisseur traduit conjointement les règles extraites vers une spécification lisible alignée sur `Apache Ossie` et vers un service moderne à typage fort utilisant exclusivement des types décimaux à précision fixe (`rust_decimal` / `Decimal` exact, zéro flottant binaire), enveloppé dans un serveur `MCP Streamable HTTP` doté de clés d'idempotence.
4. **Validation par double exécution en ombre (*Shadow Mirroring*) avant bascule** : Déployé derrière un réplicateur de trafic en production pendant au moins un cycle mensuel complet (clôture de fin de mois incluse), le nouveau service exécute chaque requête réelle en parallèle du programme `IBM i` toujours maître, sans commettre ses écritures. Un comparateur enregistre le taux de concordance exacte :

\[\Delta_{\text{shadow}} = \sum_{k=1}^{N} \mathbb{I}\!\left(\,\bigl\lVert y_k^{\text{moderne}} - y_k^{\text{legacy}} \bigr\rVert_{\infty} > 0\,\right) = 0 \quad \text{sur } N \ge 100\,000\]

Toute divergence (\(\Delta_{\text{shadow}} > 0\)) renvoie automatiquement le cas discordant dans l'oracle de l'usine agentique pour affinement de la règle avant qu'un seul client réel ne soit affecté. Une fois le zéro défaut maintenu sur un cycle complet, le trafic bascule progressivement (`5 % → 50 % → 100 %`) avec réplication inverse `CDC` de repli, permettant de **désactiver définitivement le fragile robot `CUA` d'écran vert**.

#### Extrait 29.1 — Contrat de pipeline `Agentic SDLC` imposant séparation des devoirs et parité *Golden Master* (`sdlc-modernization-gate.yaml`)

Ce descripteur CI/CD bloque matériellement toute promotion d'un module modernisé tant que les portes déterministes et le miroir de production ne sont pas intégralement validés :

```yaml
apiVersion: sdlc.boreal.ca/v2027.1
kind: AgenticModernizationPipeline
metadata:
  moduleId: "bca-lease-early-buyout-calc"
  legacySource: "QRPGLESRC/LEASBUY400"
  targetLanguage: "rust-2024-decimal-strict"
spec:
  segregationOfDuties:
    specAgentNhi: "spiffe://boreal.ca/sdlc/spec-oracle-writer"
    builderAgentNhi: "spiffe://boreal.ca/sdlc/rust-builder"
    criticModelFamily: "heterogeneous-distinct-from-builder"
    forbidBuilderWritePaths:
      - "specs/**"
      - "tests/golden_master/**"
      - ".github/workflows/**"
  deterministicGates:
    forbidBinaryFloatsInDomain: true
    minMutationKillScore: 0.88
    goldenMasterCorpusSize: 50000
    maxAllowedCentDeviationCad: "0.00"
    networkEgressSandbox: "INTERNAL_ARTIFACTORY_ONLY"
  stranglerCutoverPolicy:
    minShadowMirrorDays: 30
    minShadowTransactions: 100000
    requiredExactMatchRate: 1.000000
    requireHumanPrincipalEngineerSignoff: true
```

---

## 29.3 Sécurité du code synthétisé et comparateur de parité déterministe en ombre

Même encadré par des tests fonctionnels rigoureux, le code produit à grande vitesse par des agents présente deux risques spécifiques que les revues classiques sous-estiment : l'introduction de vulnérabilités subtiles de concurrence ou d'injection (`OWASP ASI05`), et la dérive silencieuse sur des états transitoires de base de données non reflétés dans la seule réponse HTTP.

C'est pourquoi le comparateur de *Shadow Mirroring* ne se contente pas d'égaliser le corps JSON retourné à l'appelant : il compare simultanément **l'intention complète d'écriture transactionnelle** (lignes comptables du grand livre, codes taxes ventilation TPS/TVQ/TVH, événements émis) dans un mode *Dry-Run* isolé, et mesure le différentiel de latence `p99`.

#### Extrait 29.2 — Comparateur déterministe de parité *Shadow Mirroring* entre `IBM i` et service `MCP` moderne (`shadow_parity_judge.py`)

Exécuté de manière asynchrone hors du chemin critique de latence client, ce juge compare champ par champ les résultats décimaux et alimente automatiquement la suite de non-régression en cas d'écart :

```python
from dataclasses import dataclass
from decimal import Decimal


@dataclass(frozen=True)
class BuyoutQuoteResult:
    contract_id: str
    principal_balance: Decimal
    actuarial_rebate: Decimal
    provincial_tax: Decimal
    total_payout: Decimal
    ledger_codes: tuple[str, ...]


def verify_shadow_parity(
    tx_id: str,
    legacy: BuyoutQuoteResult,
    modern: BuyoutQuoteResult,
) -> tuple[bool, list[str]]:
    diffs: list[str] = []
    fields = (
        "principal_balance",
        "actuarial_rebate",
        "provincial_tax",
        "total_payout",
    )
    for fname in fields:
        v_leg = getattr(legacy, fname)
        v_mod = getattr(modern, fname)
        if v_leg != v_mod:
            diffs.append(f"{fname}:leg={v_leg}!=mod={v_mod}")

    if legacy.ledger_codes != modern.ledger_codes:
        diffs.append(
            f"ledger:leg={legacy.ledger_codes}"
            f"!=mod={modern.ledger_codes}"
        )

    is_exact = len(diffs) == 0
    return (is_exact, [f"tx={tx_id} " + d for d in diffs])
```

### Coexistence transactionnelle transitoire : couche d'anti-corruption (ACL) et synchronisation bidirectionnelle CDC

Durant les six à dix-huit mois que dure l'étranglement progressif d'un monolithe patrimonial (`IBM i DB2/400` ou `IMS`/`DB2 z/OS`), l'entreprise traverse une phase hybride délicate : les nouveaux services modernes exposés en `MCP` servent déjà en temps réel les sagas agentiques, tandis que certains lots batch nocturnes non encore migrés (états réglementaires trimestriels, réconciliations fiscales de fin d'exercice) continuent de lire les tables physiques historiques du système central.

Négliger cette coexistence crée un piège d'architecture classique : soit le nouveau service continue d'écrire directement dans les tables `DB2/400` aux noms cryptiques de six caractères (`CSTNBR`, `AMTPD1`), contaminant le code neuf par le modèle de données hérité ; soit les deux bases divergent dès la première écriture moderne. Deux patrons complémentaires résolvent proprement cette transition :

1. **La Couche d'Anti-Corruption bidirectionnelle (*Anti-Corruption Layer*, `ACL`)** : Le service moderne possède son propre schéma relationnel propre, intégralement aligné sur la nomenclature canonique **`Apache Ossie`** (`contract_id`, `principal_balance_cad`). Une passerelle `ACL` déterministe et sans état traduit à la frontière — et uniquement à la frontière — les événements métiers propres en enregistrements compatibles avec le format tabulaire attendu par les anciens lots batch restants.
2. **La réplication transactionnelle par capture de changements (`CDC` + *Outbox Pattern*) avec jeton anti-rebond** : Lorsqu'un module passe du stade *Shadow Mirroring* (lecture/comparaison seule) au stade maître en écriture, chaque transaction commise dans la base moderne écrit atomiquement dans une table `outbox` lue par **`Debezium` / `Kafka Connect`** pour répercuter la mise à jour vers `DB2/400` en moins de 200 ms — garantissant à la fois la continuité des lots batch patrimoniaux et la possibilité d'un **retour arrière instantané sans perte de données (*Zero-Data-Loss Rollback*)** si une anomalie opérationnelle imprévue exigeait de redonner temporairement la main au programme `RPG`. Un marqueur d'origine (`origin_system_id`) empêche mathématiquement toute boucle infinie de réplication croisée entre l'ancien et le nouveau monde.

| Approche face au patrimoine sans API | Délai initial | Latence & Coût à l'exécution | Risque de régression métier | Verdict architectural 2027 |
|---|---|---|---|---|
| **Encapsulation `CUA` permanente** | Rapide (2–4 sem.) | Élevés (`5–15 s`, `> 0,40 $`) | Moyen (fragilité écrans) | **Pont tactique transitoire uniquement** |
| **Réécriture « Big Bang » par LLM** | Trompeur (mois/ans) | Faibles une fois fini | **Extrême (échec > 70 %)** | **À proscrire absolument** |
| **Transpilation syntaxique 1:1 brute** | Moyen (3–6 mois) | Faibles (`Java`/`C#` généré) | Moyen, mais code illisible (« *JOBOL* ») | Acceptable seulement avant refactorisation |
| **`Strangler Fig` + *Golden Master* + `Shadow`** | **Incrémental (6–8 sem./domaine)** | **Optimaux (`< 20 ms`, `< 0,003 $`)** | **Quasi nul (`0,00 $` prouvé sur 30 j)** | **Standard de référence du Compendium** |

::: {.encadre-sectoriel title="Secteur Public, Fiscalité & Retraites — Explicabilité légale des règles extraites du patrimoine"}

Dans les ministères du Revenu, les caisses de retraite publiques et les régies d'assurance maladie opérant de vastes systèmes `COBOL`, la modernisation par l'usine `Agentic SDLC` offre un bénéfice démocratique et juridique supplémentaire : en forçant l'agent spécificateur à extraire chaque branchement obscur de 1995 vers une table de décision **`DMN` / `Apache Ossie`** vérifiée contre le *Golden Master*, l'administration réconcilie enfin son code exécutable avec le texte exact de la loi votée — rendant chaque décision automatisée nativement explicable au citoyen au sens de l'article 12.1 de la **`Loi 25`**.

:::

::: {.encadre-sectoriel title="Secteur Bancaire & Assurances (BSIF E-23) — Gouvernance des outils de génération de code sur systèmes matériels"}

Sous la ligne directrice **`BSIF E-23`** entrée en vigueur le 1er mai 2027, si un modèle génératif réécrit la logique de calcul d'un système financier matériel, comment qualifier le risque de modèle ? L'architecture présentée ici apporte une réponse décisive aux auditeurs : **le service déployé en production est un programme déterministe compilé (`Rust`/`Go`/`Java`), intégralement prouvé par 100 000 cas de parité exacte au centime près et signé par un ingénieur responsable**. L'IA n'intervient qu'à l'étape d'outillage d'atelier hors production, éliminant toute incertitude stochastique au moment de l'exécution financière réelle.

:::

---

## 29.4 Application au fil rouge : décapsulage progressif de 1,4 million de lignes RPG sur IBM i chez Boréal Capital (BCA)

Voyons comment **Boréal Capital & Assurances (BCA)** utilise cette usine logicielle agentique pour résorber méthodiquement sa dette patrimoniale `AS/400` sans interrompre une seule journée ses opérations réglementées.

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Extinction programmée des agents CUA d'écran 5250 par modernisation RPG → Rust/MCP chez BCA"}

**Situation initiale chez BCA** : Au Chapitre 16, BCA avait dû déployer en urgence quatre *Computer-Use Agents* (`CUA`) pilotant des sessions d'écran vert `5250` pour lire les garanties et simuler les rachats de contrats sur son cœur `IBM i` (`1,4 million` de lignes `RPG III` et `RPG ILE` accumulées depuis 1998, maintenues par trois spécialistes seniors à dix-huit mois de la retraite). Bien que sécurisés, ces `CUA` coûtaient **0,62 \$ CAD** par transaction, prenaient **14 secondes** par écran et bloquaient le passage à l'échelle haute fréquence. Une précédente tentative de refonte manuelle par un intégrateur externe en 2023 avait été abandonnée après 4,2 M\$ CAD dépensés sans mise en production.

**Déploiement de l'usine `Agentic SDLC` Boréal** :
1. **Cartographie symbolique complète en trois semaines** : Un parseur `RPG`/`CL`/`DB2` a indexé les 2 140 programmes et isolé **14 domaines fonctionnels faiblement couplés**, en commençant par les trois modules concentrant 78 % des appels `CUA` (*Éligibilité Garantie*, *Calcul Rachat Anticipé*, *Avenant Franchise*).
2. **Capture *Golden Master* et boucle à séparation des devoirs** : Sur chaque module, 60 000 transactions historiques anonymisées de 2024–2026 ont formé l'oracle scellé. Lors du premier cycle de *Shadow Mirroring* du module de rachat anticipé, le comparateur (Extrait 29.2) a intercepté **17 divergences subtiles de 0,01 \$ à 0,04 \$ CAD** sur des contrats bissextiles signés au Nouveau-Brunswick — une règle d'arrondi implicite de 2007 qu'aucun analyste humain ne connaissait plus, immédiatement intégrée et prouvée avant bascule.

**Bilan audité après neuf mois** :
* **5 des 14 domaines cœurs** (`490 000` lignes `RPG` équivalentes) convertis et homologués en services `Rust` décimaux exposés nativement en **`MCP Streamable HTTP`**, avec **zéro écart comptable** en production.
* **Décommissionnement complet des 4 agents `CUA` d'écran 5250** : latence d'interrogation tombée de 14 secondes à **11 millisecondes** et coût marginal divisé par **180**.
* Les trois experts `RPG` seniors, libérés de la maintenance corrective nocturne, agissent désormais comme **architectes validateurs des invariants métiers** aux côtés de l'équipe plateforme.

:::

---

## 29.5 Décision d'architecture normative et points de contrôle

La décision `ADR-029` régit toute utilisation d'agents autonomes pour le développement logiciel et la modernisation du patrimoine applicatif.

::: {.adr title="ADR-029 — Pipeline Agentic SDLC à séparation des devoirs et modernisation patrimoniale par oracle Golden Master et Shadow Mirroring"}

* **Statut** : Acceptée | **Périmètre** : Ingénierie Logicielle, DevSecOps & Patrimoine | **Révision** : Semestrielle
* **Contexte** : Laisser des agents de codage générer simultanément le code métier et ses tests, importer librement des paquets externes ou réécrire d'un bloc des systèmes patrimoniaux non documentés engendre des tests tautologiques, des risques d'empoisonnement `ASI04` et des régressions financières majeures.
* **Options évaluées** :
  1. *Limitation stricte à l'autocomplétion manuelle ligne à ligne en IDE* : **Rejetée** — insuffisante pour résorber à temps la dette patrimoniale critique face aux départs à la retraite.
  2. *Traduction automatisée directe du patrimoine sans double exécution ni séparation des tests* : **Rejetée** — perte garantie des cas limites implicites et d'exactitude d'arrondi décimal.
  3. *Usine Agentic SDLC séparant l'agent d'oracle de l'agent bâtisseur isolé, verrouillée par tests de mutation (\(\ge 85\,\%\)), revue contradictoire hétérogène et bascule Strangler Fig après 30 jours de Shadow Mirroring à zéro écart*. **Retenue**.
* **Décision** : (a) Interdire techniquement à tout agent bâtisseur de modifier les tests d'acceptation ou de fusionner sans portes déterministes et approbation humaine ; (b) confiner la résolution de dépendances à un dépôt interne approuvé ; (c) exiger sur toute modernisation patrimoniale l'arithmétique décimale exacte, un corpus *Golden Master* historique et un cycle complet de *Shadow Mirroring* sans divergence avant bascule.
* **Conséquences** : Modernisation rapide et mathématiquement sûre des systèmes centraux et extinction progressive des `CUA`, moyennant l'investissement initial dans l'indexation `AST`/`SCIP` et l'infrastructure de réplication de trafic en ombre.

:::

### Liste de contrôle de mise en production — Chapitre 29

1. **Séparation des droits Oracle / Bâtisseur** : Les permissions du dépôt interdisent-elles à l'identité `NHI` de l'agent codeur toute modification des répertoires de spécifications, d'oracles *Golden Master* et de pipelines CI ?
2. **Confinement réseau anti-*Slopsquatting*** : Le bac à sable `OpenSandbox` de compilation bloque-t-il tout téléchargement direct sur Internet au profit exclusif du registre interne de paquets vérifiés (`SBOM`) ?
3. **Indexation symbolique `AST` / `SCIP`** : L'analyse d'impact préalable s'appuie-t-elle sur le graphe syntaxique déterministe des appels et des tables plutôt que sur une simple recherche vectorielle approximative ?
4. **Porte de tests de mutation (\(\ge 85\,\%\))** : Le pipeline rejette-t-il automatiquement toute demande de tirage dont les tests échouent à détecter les mutants syntaxiques injectés ?
5. **Revue contradictoire multi-familles** : L'agent critique chargé de l'audit sécurité et concurrence repose-t-il sur une famille de modèles distincte de celle ayant produit le code, suivi d'une validation humaine ?
6. **Arithmétique décimale stricte** : Tout code financier ou comptable modernisé bannit-il par règle de *linter* les types flottants binaires au profit de types décimaux exacts ?
7. **Parité *Shadow Mirroring* sur cycle complet** : Le service modernisé a-t-il tourné au moins 30 jours en double exécution d'ombre sur trafic réel avec `0,00 $` d'écart avant de recevoir du trafic mutatif ?
8. **Plan de retour arrière `CDC` instantané** : Lors de la bascule progressive `Canary`, la synchronisation inverse permet-elle de redonner la maîtrise au module patrimonial en moins d'une minute en cas d'anomalie ?
