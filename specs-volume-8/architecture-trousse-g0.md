# Architecture logicielle de « 8 - Trousse/ », barrière `G0` et adaptation de l'outillage — Volume 8

- **Régime et langue :** **Production** · Français canadien (termes techniques, noms de commandes et identifiants de code en anglais).
- **Ouvrage de référence :** *Ingénierie exécutable de l'entreprise agentique* — *Manuel de spécifications testables, harnais 80/20, médiation MCP/A2A, délégation bornée, politiques OPA hors modèle, sémantique d'effet Saga et suite EvalOps vérifiable (non-avis)* (`André-Guy Bruneau, M.Sc IT`).
- **Calendrier et licences :** Date de gel des faits arrêtée au **2 décembre 2026** (`2026-12-02`) ; parution visée en **janvier 2027** (toutes échéances 2027 et ultérieures formulées au futur). Manuel imprimé `6,14 × 9,21 po` (`38 000` mots ± 8 %, soit `34 960`–`41 040` mots) et `9` figures (`Fig-00` à `Fig-08`) sous licence **CC BY 4.0** ; dépôt compagnon exécutable **`8 - Trousse/`** et outillage **`outils/`** sous licence **MIT**.
- **Socle décisionnel :** [`RECOMMANDATION-FINALE.md`](../RECOMMANDATION-FINALE.md) § 4 (lauréat **`A'` MVP strict** + moteur unique **`OPA / Rego`**) et [`propositions-A-B-revisees.md`](../recommandation-finale/propositions-A-B-revisees.md) § 1.
- **Portée probatoire (`AO-05` + `DC-P12`) :** `8 - Trousse/` est publié comme **référence figée et vérifiée à la date de gel (`2026-12-02`)** sur doublures hors modèle hermétiques. Son exécution conforme (`G0 exit 0`) ne constitue **ni un avis juridique, ni une certification d'audit ou actuarielle, ni une homologation `BSIF E-23`, `AMF`, `ISO/IEC 42001` ou `Loi 25` sur un `SoR` réel** (`non-avis`).

---

## 1. Arborescence normative du Volume 8 et de `8 - Trousse/`

### 1.1 Séparation stricte entre le manuel (`8 - Livre 2027/`) et le dépôt exécutable (`8 - Trousse/`)

Conformément au resserrement `P0` (`AO-08`), le code exécutable et la prose narrative vivent dans deux arbres matériellement distincts. Aucun bloc de code rédigé à la main n'est toléré dans `manuscrit/` : tout extrait affiché dans les chapitres `01` à `04` (`≤ 40` lignes) est prélevé mécaniquement depuis `8 - Trousse/` et verrouillé octet pour octet par empreinte `SHA-256` sous `CA-G0-SYNC` (`CA-20`).

```text
Prospection/ (ou Agentique/)
├── 8 - Livre.md                              # [Généré] Markdown consolidé à la racine (assemble_livre.py, G5)
├── 8 - Livre.pdf                             # [Généré] PDF Typst 6,14×9,21 po à la racine (assemble_livre.py, G5)
│
├── 8 - Livre 2027/                           # Manuel & usine AQ (prose/figures CC BY 4.0 · outils MIT)
│   ├── .gitignore                            # Exclut sources-locales/* (sauf README.md)
│   ├── specs/                                # Spécifications normatives amont (présent dossier)
│   │   ├── prd.md
│   │   ├── toc.md
│   │   ├── charte-editoriale.md
│   │   ├── architecture-trousse-g0.md        # Présente spécification
│   │   ├── contrat-aq.md
│   │   ├── plan-production-aq.md
│   │   ├── prompt-lancement.md
│   │   ├── manifest.json
│   │   └── protocole-mlr-2027.json
│   ├── manuscrit/                            # 38 000 mots ± 8 % (34 960–41 040 mots, CC BY 4.0)
│   │   ├── 00 - Liminaire.md                 # 3 500 mots [3 220–3 780], 0.1–0.6, Fig-00
│   │   ├── 01 - Partie I/
│   │   │   ├── Chapitre 01 - Harnais deterministe et mediation protocolaire.md   # 8 000 mots [7 360–8 640], Fig-01..02
│   │   │   └── Chapitre 02 - Identite non humaine, PQC et double couloir.md      # 8 500 mots [7 820–9 180], Fig-03..04
│   │   ├── 02 - Partie II/
│   │   │   ├── Chapitre 03 - Politiques OPA hors modele et Sagas.md              # 8 000 mots [7 360–8 640], Fig-05..06
│   │   │   └── Chapitre 04 - Banc EvalOps hermetique et 24 portes PRR.md         # 7 000 mots [6 440–7 560], Fig-07..08
│   │   └── 03 - Annexes/                     # 100 % générées depuis registre/ et aq/ (CA-17)
│   │       ├── Annexe A - Socle L-plus, statut F et journal Wyvern.md            # 1 500 mots [1 380–1 620]
│   │       └── Annexe B - Tracabilite, vecteurs tiers et bilan AQ.md             # 1 500 mots [1 380–1 620]
│   ├── diagrammes/                           # 7 PlantUML (.svg -failfast2) + 2 Mermaid (.png 300 DPI), ≤ 14 nœuds
│   │   ├── Fig-00.puml .. Fig-08.mmd
│   │   └── rendus/                           # Fig-00.svg .. Fig-08.png
│   ├── registre/                             # Sources uniques de vérité JSON (SSOT)
│   │   ├── specifications-lplus.json         # [Nouveau Vol. 8] Specs ouvertes L+ & maturité
│   │   ├── matrice-exig-prr-c40.json         # [Nouveau Vol. 8] Traçabilité EXIG/PRR/C01-C40/5 SBB <-> G0
│   │   ├── concordance-taxonomies.json       # [Nouveau Vol. 8] 5 discordances inter-volumes
│   │   ├── ancres-chronologiques.json        # [Hérité] Jalons datés L+
│   │   ├── faits-empiriques.json             # [Hérité] Repères chiffrés L+
│   │   └── glossaire-termes.json             # [Hérité] Terminologie bilingue FR-CA / EN
│   ├── recherche/                            # Collecte ouverte AO-01 (0 % METADATA_ONLY)
│   │   ├── catalogue_mlr_2027.json
│   │   ├── manifeste-sources-sha256.json
│   │   ├── registre-statut-f.json            # URLs bloquées (AMF, LégisQuébec, ISO 42001, genai.owasp.org 403)
│   │   ├── journal-collecte-mlr.json
│   │   └── corpus_l_plus/                    # Textes intégraux UTF-8 hachés SHA-256 (SRC-NNN.txt)
│   ├── sources/                              # 5 bases fermées ch00-sources.md .. ch04-sources.md
│   ├── ancrage/                              # 5 journaux Wyvern G2 ch00-ancrage.md .. ch04-ancrage.md
│   ├── aq/                                   # Rapports d'assurance qualité G0–G5
│   │   ├── rapports-g0.json                  # [Nouveau Vol. 8] Sortie vérifiée de execute_g0.py
│   │   ├── recollation-seed-20270801.{json,md}
│   │   ├── recollation-seed-20270802.{json,md}
│   │   ├── gauntlet-log.md
│   │   └── rapport-lissage-et-visuel.md
│   ├── outils/                               # 13 fichiers adaptés de Vol. 7 + execute_g0.py (MIT)
│   ├── livrables/                            # Contient UNIQUEMENT 8 - Livre 2027.html autonome (CA-18)
│   └── sources-locales/                      # Non versionné (README.md uniquement)
│
└── 8 - Trousse/                              # Dépôt compagnon exécutable autonome (licence MIT)
    ├── LICENSE                               # Texte intégral licence MIT
    ├── NOTICE                                # Attribution CC BY 4.0 (manuel/figures) et Apache-2.0 (OPA)
    ├── README.md                             # Bandeau non-avis AO-05 + mention archive figée 2026-12-02
    ├── pyproject.toml                        # Python >= 3.12, métadonnées MIT, config pytest
    ├── requirements.lock                     # Dépendances exactes == avec --hash=sha256:...
    ├── spdx-allowlist.json                   # Politique SPDX compatible MIT
    ├── tools-lock.json                       # Empreintes SHA-256 du binaire CLI OPA (Win64 / Linux64)
    ├── harness_proto/                        # Module Python Ch. 01 (correspond à harness-proto/)
    ├── authz_pqc_audit/                      # Module Python Ch. 02 (correspond à authz-pqc-audit/)
    ├── policy_saga/                          # Module Python Ch. 03 (correspond à policy-saga/)
    ├── evalops_prr/                          # Module Python Ch. 04 (correspond à evalops-prr/)
    ├── policies_opa/                         # Paquets .rego (default allow := false) + *_test.rego
    ├── schemas/                              # Schémas JSON Schema Draft 2020-12 (strict: true)
    ├── vectors/                              # 4 suites de vecteurs officiels tiers + vectors-manifest.json
    └── tests/                                # Harnais pytest découplé (tests unitaires, négatifs, vecteurs)
```

> **Correspondance de nommage :** Dans la prose éditoriale et `toc.md`, les quatre modules sont nommés avec tirets (`harness-proto/`, `authz-pqc-audit/`, `policy-saga/`, `evalops-prr/`). Dans `8 - Trousse/`, leurs paquets Python importables portent le trait de soulignement conforme à PEP 8 (`harness_proto/`, `authz_pqc_audit/`, `policy_saga/`, `evalops_prr/`).

### 1.2 Contrôle `requirements.lock` `SHA-256` et hygiène `SPDX MIT`

Pour garantir la reproductibilité hors ligne et la compatibilité stricte de licence sous `MIT` :

1. **Verrouillage cryptographique `requirements.lock` :** généré au format `pip --require-hashes` (`paquet==x.y.z --hash=sha256:...`) incluant toutes les dépendances directes et transitives. Toute installation en CI utilise `python -m pip install --require-hashes --no-deps -r "8 - Trousse/requirements.lock"`.
2. **Périmètre minimal portable Windows/Linux (zéro compilateur C/Rust/Go requis) :**

| Composant | Rôle dans `8 - Trousse/` | Licence SPDX vérifiée | Statut `SPDX MIT` |
| --- | --- | --- | :---: |
| `jsonschema` (+ `attrs`, `referencing`, `rpds-py`, `jsonschema-specifications`) | Validation `Draft 2020-12` `strict: true` | `MIT` | **Admis** |
| `PyYAML` | Lecture/validation des fiches ADR `2027-B001` | `MIT` | **Admis** |
| `cbor2` | Encodage/décodage déterministe `CBOR-COSE` (*Transaction Tokens*) | `MIT` | **Admis** |
| `cryptography` | Signatures `ES256` (`JWS`), `HMAC-SHA256`, empreintes | `Apache-2.0 OR BSD-3-Clause` | **Admis** |
| `dilithium-py` | Vérification Python pur `FIPS 204 ML-DSA-65/87` (sans C) | `MIT OR Apache-2.0` | **Admis** |
| `pytest` (+ `iniconfig`, `packaging`, `pluggy`, `colorama`) | Exécution hermétique des suites unitaires et vecteurs | `MIT` | **Admis** |
| `authz_pqc_audit/slh_dsa_fips205.py` *(interne)* | Vérification Python pur `FIPS 205 SLH-DSA-SHA2-128s/128f` via `hashlib` stdlib | `MIT` | **Admis** |
| Binaire CLI autonome **`opa`** *(épinglé dans `tools-lock.json`)* | Évaluation et couverture `100 %` des politiques `.rego` (`shell=False`) | `Apache-2.0` | **Admis** |
| *Paquet PyPI `slh-dsa`* *(exclusion documentée)* | — | `LGPL-3.0-or-later` | **Rejeté (`G0 FAIL`)** |

3. **Contrôle automatisé `SPDX` exécuté en `G0` (`execute_g0.py`) :**
   - Vérifie la présence de l'en-tête `# SPDX-License-Identifier: MIT` sur 100 % des fichiers `.py` et `.rego` de `8 - Trousse/` et `8 - Livre 2027/outils/`, ainsi que la propriété `"x-license": "MIT"` dans `schemas/*.schema.json`.
   - Inspecte les métadonnées `importlib.metadata` de chaque paquet installé contre `spdx-allowlist.json` (`allowed`: `["MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "PSF-2.0", "MPL-2.0", "CC0-1.0"]` ; `forbidden_substrings`: `["GPL", "AGPL", "LGPL", "SSPL", "Proprietary"]`). Tout paquet absent de la liste blanche ou portant un motif interdit fait échouer `G0` (`exit 1`).

---

## 2. Spécification technique des 4 modules Python 3.12+ et du moteur `OPA / Rego`

> **Convention typographique (`CA-06`) :** Conformément à la règle interdisant tout symbole dollar non échappé dans `specs/`, `\$` note le symbole dollar dans le présent fichier Markdown tant en préfixe de mot-clé JSON Schema (`\$schema`, `\$id`, `\$ref`, `\$defs`) qu'en ancre de fin d'expression régulière JSON Schema (`^SRC-\d{3}\$`, `^[0-9a-f]{64}\$`, `^DISC-0[1-5]\$`, `^\d+-\d+\$`) ; les fichiers `.schema.json` réels dans `8 - Trousse/schemas/` utilisent bien entendu le caractère dollar non échappé.

Tous les modules exigent **Python 3.12+**, utilisent `from __future__ import annotations`, des structures typées immuables (`@dataclass(frozen=True, slots=True)` ou `TypedDict`), l'arithmétique `Decimal` pour tout montant monétaire et des horodatages `UTC` normalisés en `ISO 8601`.

### 2.1 Module 1 : `harness_proto/` (`Ch. 01 — harness-proto/`)

Comble la quasi-absence de code exécutable du Corpus (`6 - Livre Blanc.md L1041` unique bloc JSON Schema, `C26 L10850` harnais sans chapitre dédié, `EXIG-MCP-15/16/18/19/20/22`, `40,58 %` de dérive silencieuse `C27 L4000`). **Exclusion explicite du doublon `AIBOM` :** la lacune des champs d'invite et de politique dans `CycloneDX 1.7` / `SPDX 3.0` (`1 - Compendium 2026.md L10786` Tableau 47.3) et le statut *Informational* de `RFC 9334` (`L10802`) sont simplement cités en renvoi sans ré-épreuve redondante.

#### Fichiers, classes et signatures publiques

1. **`harness_proto/jcs.py`** (canonisation partagée `RFC 8785`) :
   - `class JcsError(ValueError)` — levée sur `NaN`, `Infinity`, entier hors plage IEEE-754 ou clé non-chaîne.
   - `canonicalize_jcs(value: Any) -> bytes` — sérialisation ECMAScript des nombres, échappement minimal des chaînes et tri lexicographique strict des clés par unités de code UTF-16 (`key.encode("utf-16-be")`).
   - `jcs_sha256_hex(value: Any) -> str` — condensat hexadécimal minuscules (64 caractères) de `canonicalize_jcs(value)`.

2. **`harness_proto/pipeline.py`** (harnais déterministe `80/20` à 8 étapes) :
   - `class StepStatus(StrEnum)` : `"OK"`, `"AMBIGU_ESCALADE"`, `"DONNEES_INSUFFISANTES"`, `"VALIDATION_FAILED"`, `"ESCALADED"`.
   - `@dataclass(frozen=True) class HarnessConfig` : `schema_path: Path`, `max_repair_retries: int = 2`, `max_payload_bytes: int = 65536`, `allowed_grounding_ids: frozenset[str] = frozenset()`.
   - `@dataclass(frozen=True) class HarnessOutcome` : `status: StepStatus`, `validated_payload: dict[str, Any] | None`, `escalade_reason: str | None`, `repair_attempts: int`, `step_trace: tuple[str, ...]`, `output_sha256: str`.
   - `validate_strict_schema(schema: dict[str, Any], instance: dict[str, Any]) -> list[str]` — vérifie la conformité `JSON Schema Draft 2020-12` (`Draft202012Validator`), impose le profil `strict: true` (`additionalProperties: false`, tous les champs listés dans `required`, zéro `allOf` / `if-then-else` à la racine, zéro `\$ref` réseau `http://` ou `https://` conformément à `EXIG-MCP-19`).
   - `class DeterministicHarness` :
     - `__init__(self, config: HarnessConfig, model_adapter: Callable[[dict[str, Any], list[str]], dict[str, Any]])`
     - `run(self, raw_input: dict[str, Any], grounding_records: dict[str, Any]) -> HarnessOutcome` — exécute dans l'ordre les **8 étapes déterministes** : `(1)` contrôle taille/UTF-8, `(2)` validation schéma d'entrée, `(3)` préparation contexte borné, `(4)` invocation adaptateur modèle, `(5)` validation schéma `Draft 2020-12 strict: true`, `(6)` invariants relationnels et d'ancrage (*grounding* sur `grounding_records`), `(7)` boucle de réparation bornée (`<= max_repair_retries`) ou bascule explicite sur porte `AMBIGU_ESCALADE`, `(8)` scellement de trace et condensat `SHA-256`.

3. **`harness_proto/mcp_pinning.py`** (médiation `MCP 2026-07-28`) :
   - `class HeaderMismatchError(Exception)` : attributs `http_status: int = 400`, `jsonrpc_code: int = -32020`, `detail: str`.
   - `@dataclass(frozen=True) class McpCatalogEntry` : `ref: str`, `server_id: str`, `tool_name: str`, `contract_version: str`, `definition_digest: str`, `mcp_revision: str` (`"2026-07-28"`), `tier: Literal["P0", "P1", "P2", "P3"]`, `allowed_header_projections: frozenset[str]`, `volatile_meta_keys: frozenset[str]`.
   - `compute_tool_definition_digest(tool_def: dict[str, Any], volatile_meta_keys: Iterable[str] = ()) -> str` — calcule `"sha256:" + jcs_sha256_hex(cleaned)` conformément à `EXIG-MCP-20` et `C.2`.
   - `verify_tools_list_against_catalog(tools: list[dict[str, Any]], catalog: Mapping[str, McpCatalogEntry], server_id: str, max_drift_before_suspend: int = 1) -> McpSyncResult` — trie de façon déterministe (`EXIG-MCP-03`), compare les condensats `SHA-256`, retire et suspend tout outil modifié (*rug pull* / dérive silencieuse) ou absent du catalogue, suspend le serveur entier au-delà du seuil, et préfixe les noms valides (`f"{server_id}.{tool_name}"`) en refusant toute collision (`EXIG-MCP-20`).
   - `validate_mcp_headers(headers: Mapping[str, str], jsonrpc_body: dict[str, Any], catalog_entry: McpCatalogEntry | None = None) -> dict[str, Any]` — impose `MCP-Protocol-Version == _meta["io.modelcontextprotocol/protocolVersion"]`, concordance `Mcp-Method` et `Mcp-Name`, cohérence `Mcp-Param-{nom}` ; lève `HeaderMismatchError` (`400`, `-32020`) sur tout écart (`EXIG-MCP-15`). Purge de `_meta` toute clé non réservée hors liste blanche et interdit de fonder le routage sur `clientInfo` / `serverInfo` (`EXIG-MCP-16`). Rejette tout outil dont une propriété `x-mcp-header` contient un secret ou renseignement personnel (`EXIG-MCP-18`).
   - `class McpTransportAdapter(Protocol)` : interface isolée (`send_jsonrpc(method: str, params: dict[str, Any], headers: dict[str, str]) -> dict[str, Any]`, `capabilities() -> dict[str, Any]`) avec implémentation `StreamableHttpAdapter` (2026-07-28) et refus explicite du transport déprécié `HTTP+SSE` (`SEP-2596`).

4. **`harness_proto/a2a_card.py`** (validation `AgentCard A2A v1.0.1`) :
   - `@dataclass(frozen=True) class AgentCardVerdict` : `valid: bool`, `card_etag: str`, `signer_kid: str`, `errors: tuple[str, ...]`.
   - `validate_agent_card(card: dict[str, Any], jwks: dict[str, Any], pinned_jku: str, approved_extensions: set[str], schema: dict[str, Any]) -> AgentCardVerdict` — valide le schéma `A2A v1.0.1`, vérifie que `jku` concorde exactement avec `pinned_jku` (`RFC 8725 § 3.10`, zéro récupération réseau libre), résout `kid` dans `jwks`, vérifie la signature `JWS RFC 7515` (`ES256`) calculée sur `canonicalize_jcs(card_without_signatures)` (`C.3`, `EXIG-A2A-03`), vérifie que toute extension (`capabilities.extensions[].uri`) figure dans `approved_extensions`, et rejette tout schéma `password` ou `implicit` dans `securitySchemes`.

#### Schémas `JSON Schema Draft 2020-12` (`strict: true`) et invariants `pytest`

- `schemas/harness_extraction.schema.json` : objet fermé (`additionalProperties: false`), `required` exhaustif (`statut_analyse`, `categorie_sinistre`, `montant_reclame_cents`, `reference_dossier`, `motif_escalade`), `montant_reclame_cents` entier ou `null` (`["integer", "null"]`), `statut_analyse` énuméré `["EXTRAIT", "AMBIGU_ESCALADE", "DONNEES_INSUFFISANTES"]`.
- `schemas/mcp_tool_catalog.schema.json` : contrat strict de `C.2` (`ref`, `tool_name`, `contract_version`, `definition_digest`, `server`, `tier`, `idempotency`, `compensation`, `additionalProperties: false`).
- `schemas/a2a_agent_card.schema.json` : contrat strict `A2A v1.0.1` (`name`, `description`, `supportedInterfaces`, `version`, `capabilities`, `securitySchemes`, `securityRequirements`, `defaultInputModes`, `defaultOutputModes`, `skills`, `signatures`).
- **Invariants `pytest` (`tests/test_harness_proto.py`) :**
  - *Positifs :* exécution nominale 8 étapes `EXTRAIT`, bascule propre `AMBIGU_ESCALADE`, concordance `SHA-256` `tools/list`, en-têtes `2026-07-28` valides, `AgentCard` signée `ES256` acceptée.
  - *Négatifs :* rejet `additionalProperties`, rejet `\$ref` réseau externe (`EXIG-MCP-19`), suspension sur modification d'un seul caractère de description MCP (*rug pull*), rejet `HeaderMismatch` (`400`, `-32020`) sur divergence `Mcp-Name`, rejet `x-mcp-header` sur champ `token`/`nas`, rejet `jku` non épinglé ou signature `JWS` altérée, arrêt après `max_repair_retries = 2`.

---

### 2.2 Module 2 : `authz_pqc_audit/` (`Ch. 02 — authz-pqc-audit/`)

Reprend localement les objets `C.5`/`C.6`/`C.8` vérifiés en CI en `2 - Cadre de Référence.md L7012`, résout le choc `ML-DSA` `HTTP 431` (`4 - Plan Directeur.md L1085-L1104`, `3 - Compendium 2027.md L26887-L26901`), comble la `lacune 21` (`trace ↔ mandat`, `1 - Compendium 2026.md L9162`), épingle `OTel v1.41.0 ↔ semantic-conventions-genai` (`85` attr. `Development`, `cache_write`) et implémente la chaîne probatoire `JCS` + `SCITT RFC 9943` + `SLH-DSA FIPS 205` + `FOCUS v1.4` (`CAP-046`).

#### Fichiers, classes et signatures publiques

1. **`authz_pqc_audit/obo_dpop.py`** (`OAuth 2.0 OBO` `RFC 8693` / `RFC 8707` / `DPoP RFC 9449`) :
   - `@dataclass(frozen=True) class OboValidationResult` : `accepted: bool`, `principal_sub: str`, `actor_chain: tuple[str, ...]`, `hop_count: int`, `rejection_code: str | None`.
   - `extract_act_chain(claims: dict[str, Any]) -> tuple[str, ...]` — déroule de manière itérative les objets imbriqués `act` (`RFC 8693`) sans récursion non bornée.
   - `validate_obo_delegation(token_claims: dict[str, Any], expected_audience: str, parent_exp: int | None, dpop_proof: dict[str, Any] | None, http_method: str, http_uri: str, now_ts: int, max_hops: int = 2) -> OboValidationResult` — applique **4 portes bloquantes** : `(a)` rejet *token passthrough* si `token_claims["aud"] != expected_audience` (`EXIG-MCP-11`) ; `(b)` rejet si `len(actor_chain) > max_hops` (plafond à 2 sauts) ; `(c)` rejet si `parent_exp is not None and token_claims["exp"] > parent_exp` (interdiction de prolonger l'expiration lors d'un échange) ; `(d)` validation stricte `DPoP` (`typ == "dpop+jwt"`, `htm == http_method`, `htu == http_uri`, `ath` égal au `SHA-256` Base64url du jeton d'accès, `jti` anti-rejeu) et vérification `cnf` (`jkt` ou `x5t#S256`).

2. **`authz_pqc_audit/revocation_fsm.py`** (`SSF / CAEP` + `draft-chen-oauth-agent-revocation-01`) :
   - `class AgentAuthState(StrEnum)` : `"ACTIVE"`, `"SUSPENDED"`, `"REVOKED"`.
   - `@dataclass(frozen=True) class CaepRevocationEvent` : `event_id: str`, `spec_source: Literal["SSF_CAEP_FINAL", "IETF_INDIVIDUAL_DRAFT_AGENT_REVOCATION_01"]`, `subject_spiffe: str`, `jti: str | None`, `issued_at: int`, `reason: str`.
   - `class RevocationStateMachine` : automate déterministe transitions `ACTIVE -> SUSPENDED -> REVOKED` (et `SUSPENDED -> ACTIVE` sur réhabilitation explicite ; `REVOKED` terminal sans retour), avec propagation `apply_event(event: CaepRevocationEvent) -> AgentAuthState` et `assert_active(subject_spiffe: str, jti: str, now_ts: int) -> bool`. Le marqueur `spec_source` consigne explicitement que `draft-chen-oauth-agent-revocation-01` est un **brouillon individuel non ratifié** (`CAD26 L8679`).

3. **`authz_pqc_audit/ciba_approval.py`** (`CIBA Core 1.0` / `I-JSON RFC 7493` / `RFC 9396` / `C.6`) :
   - `validate_ijson_strict(payload: Any) -> None` — vérifie la conformité `I-JSON RFC 7493` (types JSON sûrs, pas de `NaN`/`Infinity`, chaînes UTF-8 sans surrogates isolés, montants entiers en cents sans flottant).
   - `compute_action_hash_h(outil: str, version: str, definition_digest: str, agent_id: str, task_id: str, arguments: dict[str, Any]) -> str` — valide `I-JSON` puis retourne `jcs_sha256_hex({"outil": outil, "version": version, "definition": definition_digest, "agent_id": agent_id, "task_id": task_id, "arguments": arguments})` (reproduisant à l'octet près `h = 92be40835a73023d117ebb4965da82dfa05e2e6d647d0919d53461289bbc6e81` sur l'objet `C.6` de `2 - Cadre de Référence.md L7300-L7310`).
   - `verify_ciba_approval_tokens(tokens: list[dict[str, Any]], expected_h: str, expected_task_id: str, expected_agent_id: str, principal_sub: str, required_approvers: int, now_ts: int) -> ApprovalVerdict` — vérifie `typ == "approbation+jwt"` (distinct de `"at+jwt"`), `action_sha256 == expected_h`, `task_id`, `agent_id`, `exp > now_ts`, unicité des approbateurs `sub` tous distincts de `principal_sub`, et consommation à usage unique (`jti`).

4. **`authz_pqc_audit/pqc_http431.py`** (calcul exact `HTTP 431` `O(sauts)` vs *Transaction Tokens* `O(1)` sous `ML-DSA-65/87`) :
   - `class PqcProfile(StrEnum)` : `"JWT_EMBEDDED_JWK"`, `"JWT_X5C_CHAIN"`, `"JWT_KID_REF"`, `"CBOR_COSE_CWT"`, `"TRANSACTION_TOKEN_JWT"`, `"TRANSACTION_TOKEN_CBOR"`.
   - `ML_DSA_SPECS` : table exacte `FIPS 204` (`"ML-DSA-65"`: signature `3309` octets, clé publique `1952` octets ; `"ML-DSA-87"`: signature `4627` octets, clé publique `2592` octets).
   - `build_signed_delegation_frame(alg: Literal["ML-DSA-65", "ML-DSA-87"], profile: PqcProfile, hops: int, claims: dict[str, Any], keypair: tuple[bytes, bytes] | None = None) -> bytes` — construit et signe réellement la trame `JWT` (`RFC 9964` `Base64url`) ou `CBOR-COSE` (`cbor2`) sur `1` à `5` sauts (en intégrant réellement l'empreinte ou la chaîne de signatures `ML-DSA` via `dilithium-py` et des charges `x5c` / `jwk` / `Transaction Token -11` conformes).
   - `evaluate_http_431(alg: Literal["ML-DSA-65", "ML-DSA-87"], profile: PqcProfile, hops: int, header_limit_bytes: int = 8192) -> Http431Measurement` — mesure la longueur exacte en octets de l'en-tête `Authorization: Bearer <token>` (ou `Txn-Token: <token>`) sans proxy externe et vérifie `exceeds_limit = (header_bytes > header_limit_bytes)` (reproduisant le comportement exact : `JWT_EMBEDDED_JWK` dépasse `8 192 o` dès le saut 1, `JWT_KID_REF` et `CBOR_COSE_CWT` dépassent `8 192 o` dès le saut 2, tandis que `TRANSACTION_TOKEN_CBOR` demeure constant `O(1)` de `1` à `5` sauts sous `8 192 o`).

5. **`authz_pqc_audit/otel_pii_mapper.py`** (`OTel v1.41.0 ↔ semantic-conventions-genai` + caviardage PII `FR/EN` + jointure `lacune 21`) :
   - `OTEL_V141_TO_GENAI_DEV_MAP` : table de correspondance épinglée entre `v1.41.0` et les `85` attributs `Development` de `semantic-conventions-genai` (incluant `gen_ai.usage.cache_creation.input_tokens` → `gen_ai.usage.cache_write.input_tokens`, `gen_ai.client.token.usage` → `gen_ai.client.inference.usage.*`, `gen_ai.system` → `gen_ai.provider.name`).
   - `map_span_attributes(raw_attrs: Mapping[str, Any], target_dialect: Literal["v1.41.0", "genai_dev"] = "genai_dev", allowlist: frozenset[str] = DEFAULT_ALLOWED_ATTRS) -> dict[str, Any]` — applique la liste d'autorisation fermée (`EXIG-OBS-09`), supprime tout contenu brut (`gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`, `gen_ai.tool.call.arguments`, `gen_ai.tool.call.result` `EXIG-OBS-07`), interdit les préfixes `enterprise.*` / `otel.*` (`EXIG-OBS-06`), exige les clés de jointure trace ↔ mandat (`ca.entreprise.task_id`, `ca.entreprise.autonomy_level`, `ca.entreprise.approval.jti`, `ca.entreprise.cost_center`) et exclut l'identité de l'approbateur de la télémétrie.
   - `redact_pii_bilingual(text: str, hmac_key: bytes) -> tuple[str, list[str]]` — caviarde en français et en anglais (NAS/SIN canadien 9 chiffres, numéro d'assurance maladie RAMQ, courriel, téléphone nord-américain/UE, IBAN, carte de paiement, secret/JWT `Bearer`), remplace les identifiants à faible entropie par jeton `HMAC-SHA256` tronqué et retourne les catégories masquées.

6. **`authz_pqc_audit/slh_dsa_fips205.py`** (Python pur `MIT`) :
   - `verify_slh_dsa_sha2_128s(pk: bytes, msg: bytes, sig: bytes) -> bool` et `verify_slh_dsa_sha2_128f(pk: bytes, msg: bytes, sig: bytes) -> bool` (et variante pure/hedged selon `FIPS 205` § 9–10 sur `hashlib.sha256` / `sha512`).
   - `sign_slh_dsa_sha2_128s(sk: bytes, msg: bytes, addr_rnd: bytes | None = None) -> bytes` (pour scellement déterministe local des racines Merkle `SCITT`).

7. **`authz_pqc_audit/audit_scitt_focus.py`** (chaîne `JCS` + `SCITT RFC 9943` + `FOCUS v1.4` + carbone `CAP-046`) :
   - `class AuditChainLedger` : `append_record(payload: dict[str, Any]) -> dict[str, Any]` (ajoute `sequence`, `precedent_sha256`, `empreinte` = `"sha256:" + jcs_sha256_hex(enregistrement)` selon `C.8`), `verify_chain(records: list[dict[str, Any]]) -> ChainVerdict`.
   - `build_scitt_merkle_tree(leaf_hashes: list[bytes]) -> ScittTree` (`RFC 9943` sur `SHA-256`/`SHA-384`), `generate_inclusion_proof(tree: ScittTree, index: int) -> list[bytes]`, `verify_inclusion_proof(leaf_hash: bytes, proof: list[bytes], root_hash: bytes, index: int, total: int) -> bool`, `seal_merkle_root(root_hash: bytes, sk_slh_dsa: bytes) -> dict[str, Any]`.
   - `compute_cpo_and_focus(records: list[dict[str, Any]], compliant_outcomes: int) -> FocusCpoSummary` — calcule en `Decimal` exact le coût complet par résultat conforme (`CPO`), agrège les colonnes `FOCUS v1.4` (`BilledCost`, `EffectiveCost`, `ConsumedQuantity`, `ChargePeriodStart`, `x_carbon_gco2e`, `x_energy_kwh` pour `CAP-046`).

#### Schémas `JSON Schema Draft 2020-12` (`strict: true`) et invariants `pytest`

- `schemas/delegated_token_claims.schema.json` (`C.5` strict), `schemas/approval_token_c6.schema.json` (`C.6` strict), `schemas/audit_record_c8.schema.json` (`C.8` strict à 5 éléments + `precedent_sha256`), `schemas/focus_carbon_record.schema.json` (`FOCUS v1.4` + `x_carbon_gco2e` / `x_energy_kwh`, `strict: true`).
- **Invariants `pytest` (`tests/test_authz_pqc_audit.py`) :**
  - *Positifs :* chaîne `OBO` ≤ 2 sauts avec `DPoP`, calcul exact de `h` sur `C.6` (`92be4083...`), `Transaction Token CBOR-COSE ML-DSA-65/87` `O(1)` sous `8 192 o` sur `1..5` sauts, mappage `OTel v1.41.0 ↔ cache_write`, caviardage PII `FR/EN`, preuve Merkle `SCITT` + signature `SLH-DSA` FIPS 205 ACVP, `CPO` `Decimal`.
  - *Négatifs :* rejet *token passthrough*, rejet 3e saut `act`, rejet prolongation d'`exp`, rejet flottant non `I-JSON`, rejet auto-approbation par le mandant, dépassement `8 192 o` dès le saut 1 en `JWT_EMBEDDED_JWK` `ML-DSA-65`, rejet contenu brut dans télémétrie `EXIG-OBS-07`, détection d'altération d'un maillon `precedent_sha256`.

---

### 2.3 Module 3 : `policy_saga/` & `policies_opa/` (`Ch. 03 — policy-saga/`)

Comble les `5 SBB` (`CAD26 L1360-L1361`), le résidu `5/15 trifecta` sous `CaMeL` (`5 - Memoire.md L1127`), le ch. `48` `C26` et les `10` fautes `EXIG-ORC-20` (`CAD26 L3142-L3146`). **Moteur unique `OPA / Rego` (`Apache 2.0`), sans `Cedar`, sans `Firecracker`/KVM et sans `PostgreSQL` en `G0`.**

#### Fichiers, classes et signatures publiques

1. **`policy_saga/opa_runner.py`** (interface sécurisée `OPA CLI`) :
   - `class OpaStaticCheckError(ValueError)` — levée si un `.rego` omet `default allow := false` (ou `default decision := "deny"`).
   - `verify_rego_default_deny(rego_path: Path) -> None` — analyse syntaxique stricte imposant la déclaration `default allow := false` (ou `default decision := "deny"`) en tête de paquet après la ligne `package ...`.
   - `class OpaPolicyEngine` :
     - `__init__(self, policies_dir: Path, opa_bin: Path | None = None)`
     - `evaluate(self, query: str, input_data: dict[str, Any]) -> bool` — exécute `opa eval --fail-defined --format=json` (`shell=False`), retourne `bool` ; toute erreur ou résultat non booléen retourne `False` (échec fermé).
     - `run_coverage(self) -> OpaCoverageReport` — exécute `opa test <policies_dir> --coverage --format=json` (`shell=False`) et vérifie `coverage == 100.0` et `failed == 0`.

2. **`policy_saga/taint_camel.py`** (propagation contamination `CaMeL` / *Can CaMeLs Talk?*) :
   - `class TaintLevel(StrEnum)` : `"TRUSTED"`, `"UNTRUSTED_EXTERNAL"`, `"PII_RESTRICTED"`.
   - `@dataclass class SessionTaintTracker` : suit `consumed_untrusted: bool`, `tainted_sources: list[str]`, `provenance_hops: list[str]`.
   - `record_tool_output(tracker: SessionTaintTracker, source_id: str, taint: TaintLevel) -> SessionTaintTracker`
   - `delegate_taint_envelope(parent: SessionTaintTracker, child_agent_id: str) -> SessionTaintTracker` — propage obligatoirement `consumed_untrusted` à tout agent aval (empêchant la faille de contamination inter-agents *Can CaMeLs Talk?*).

3. **`policy_saga/sandbox_manifest.py`** (validation manifestes d'isolation sans KVM) :
   - `validate_sandbox_manifest(manifest: dict[str, Any], schema: dict[str, Any]) -> list[str]` — valide `schema`, vérifie `network.mode == "none"` ou liste d'autorisation nominative sans joker `*`, vérifie le blocage explicite de `169.254.169.254` (`IMDSv2` bloqué `EXIG-SEC-13`) et de toutes les plages IANA spéciales (`127.0.0.0/8`, `10.0.0.0/8`, `100.64.0.0/10`, `169.254.0.0/16`, `172.16.0.0/12`, `192.168.0.0/16`, `::1`, `fc00::/7`, `fe80::/10`, `::ffff:0:0/96`, `64:ff9b::/96` `EXIG-SEC-12`), `env_secrets == []` (`EXIG-SEC-14`), `read_only_root == True` et délais à 3 niveaux (`tool_timeout_s <= 30`, `loop_timeout_s <= 1200`, `lifetime_s <= 3600` `EXIG-SEC-15`).

4. **`policy_saga/decimal_money.py`** (exactitude financière `Decimal` vs `IEEE-754`) :
   - `@dataclass(frozen=True) class MoneyAmount` : `cents: int`, `currency: str` (`"CAD"`, `"USD"`, `"EUR"`).
   - `from_decimal_str(raw: str | Decimal | int, currency: str = "CAD") -> MoneyAmount` — rejette explicitement `isinstance(raw, float)` par `TypeError("IEEE-754 float interdit pour les montants financiers")`, convertit à `2` décimales en centièmes entiers exacts (`ROUND_HALF_EVEN`).

5. **`policy_saga/saga_orchestrator.py`** (orchestrateur Saga durable léger + `idem-v1` + `Outbox` + canal isolé `EXIG-ORC-28`) :
   - `compute_idempotency_key(task_id: str, step_id: str) -> str` — retourne `jcs_sha256_hex(["idem-v1", task_id, step_id])` (`2 - Cadre de Référence.md L3168, L7009`).
   - `class SagaStatus(StrEnum)` : `"PENDING"`, `"RUNNING"`, `"PIVOT_REACHED"`, `"COMPENSATING"`, `"COMPLETED"`, `"COMPENSATED"`, `"HUMAN_ESCALATION"`.
   - `class CompensationChannel` : canal d'exécution dédié portant son identité propre (`"spiffe://ent.ca/saga-compensator"`), sa réserve budgétaire indépendante et son immunisation explicite contre la suspension, la révocation ou l'épuisement d'enveloppe de l'agent métier (`EXIG-ORC-28`).
   - `class SagaOrchestrator` : persiste `Transactional Outbox` et journaux dans un magasin SQLite/mémoire transactionnel local, garantit `HTTP 409` (en cours) / `HTTP 422` (même clé, charge différente), bloque toute compensation arrière après passage du point pivot, et escalade vers la file humaine prioritaire après 2 échecs de compensation (`EXIG-ORC-18`).

#### Règles `.rego` obligatoires (`policies_opa/`)

Toutes les règles `.rego` utilisent `import rego.v1`, déclarent **`default allow := false`** immédiatement après `package ...`, et sont testées par `opa test --coverage` à **`100 %`** :

1. **`policies_opa/rule_of_two.rego`** (`package trousse.policy.rule_of_two`) :
   - `default allow := false`
   - Autorise uniquement si :
     - soit `input.tool.tier in {"P0", "P1"}` et `not input.tool.exfiltration_capable` et `not input.session.consumed_untrusted` ;
     - soit `input.session.consumed_untrusted == false` et `input.tool.tier in {"P0", "P1", "P2"}` et `not input.tool.exfiltration_capable` ;
     - soit (`input.session.consumed_untrusted == true` ou `input.tool.tier == "P3"` ou `input.tool.exfiltration_capable == true`) ET `input.human_approval.verified == true` ET `input.human_approval.action_sha256 == input.computed_action_sha256` ET `input.human_approval.approver_sub != input.principal_sub`.
   - Refuse systématiquement si la destination sortante manque à `input.egress_allowlist` ou si un champ requis est absent/mal typé.

2. **`policies_opa/camel_taint.rego`** (`package trousse.policy.camel_taint`) :
   - `default allow := false`
   - Vérifie l'isolation flot de contrôle / flot de données (`CaMeL`) : autorise un appel d'outil initié après réception de données inter-agents uniquement si `input.control_flow_source == "TRUSTED_PLAN"` et (`not input.args_derived_from_untrusted` ou `input.sensitive_args_grounded_against_sor == true`), et propage l'état `consumed_untrusted` à travers toute délégation `A2A`.

3. **`policies_opa/sandbox_confinement.rego`** (`package trousse.policy.sandbox`) :
   - `default allow := false`
   - Autorise le manifeste de bac à sable uniquement si `input.network.imds_blocked == true`, `input.network.special_iana_blocked == true`, `count(input.env_secrets) == 0`, `input.read_only_root == true`, `input.timeouts.tool_s <= 30`, `input.timeouts.loop_s <= 1200`, `input.timeouts.lifetime_s <= 3600`, et aucune entrée générique `"*"` dans `input.network.allowlist`.

#### Schémas `JSON Schema Draft 2020-12` (`strict: true`) et invariants `pytest` / `opa test`

- `schemas/opa_authz_input.schema.json`, `schemas/sandbox_manifest.schema.json`, `schemas/saga_state.schema.json` (tous `additionalProperties: false`, `required` exhaustif).
- **Invariants négatifs et positifs `opa test --coverage 100 %` (`policies_opa/*_test.rego`) :** chaque branche et condition de déni est couverte à 100 % (payloads vides, champs `null` ou chaînes à la place de booléens, approbation avec `action_sha256` discordant, `consumed_untrusted == true` + exfiltration, `env_secrets` non vide, `imds_blocked == false`).
- **Suite dédiée des `10` scénarios déterministes d'injection de fautes `EXIG-ORC-20` (`tests/test_saga_10_faults.py`) :**
  1. Échec forcé à l'étape `T2` → compensation `C1` exécutée en ordre inverse ;
  2. Crash simulé entre écriture `Outbox` et appel externe → reprise sans perte ni doublon ;
  3. Effet réalisé au service aval mais réponse perdue → réessai avec même `idem-v1` retournant le résultat mémorisé sans second effet ;
  4. Réponse tardive de l'original arrivant après bascule en compensation → rejet de l'écriture tardive / cohérence préservée ;
  5. Deux sagas concurrentes sur la même ressource → sérialisation par verrou sémantique borné (ou rejet conflit) ;
  6. Échec après franchissement du point pivot `T3` → interdiction de compenser `T1..T3` en arrière, routage réconciliation ;
  7. Double exécution forcée de chaque compensation `C_k` → résultat strictement idempotent ;
  8. Double échec consécutif d'une compensation `C_k` → arrêt de relance et placement en file humaine prioritaire (`EXIG-ORC-18`) ;
  9. Crash en milieu de compensation → reprise durable jusqu'à complétude ;
  10. Compensation exécutée alors que l'agent métier est frappé d'un coupe-circuit, révoqué ou en panne transitoire de passerelle → succès via `CompensationChannel` isolé (`EXIG-ORC-28`).

---

### 2.4 Module 4 : `evalops_prr/` (`Ch. 04 — evalops-prr/`)

Résout le problème d'oracle (`C26 L10854-L10856`), encode `EXIG-EVA-03` (`>= 3/p` essais indépendants sans échec pour borne supérieure de Wilson à `95 % < p`), les relations métamorphiques sans oracle (`DOI:10.1145/3143561`) et la validation mécanique des **`24 [BLOQUANT] PRR`**, du gabarit ADR **`2027-B001`**, des **`5 SBB`** et des **`3 blueprints`** / **`C01–C40`** sans grappe Kubernetes en `G0`.

#### Fichiers, classes et signatures publiques

1. **`evalops_prr/mock_mcp_harness.py`** (banc hermétique à doublures `mock MCP servers` et `pass^k`) :
   - `class MockMcpServer` : serveur simulé déterministe sans réseau répondant aux appels `tools/list` et `tools/call` selon un scénario seedé, enregistrant la trajectoire exacte `(tool_name, args, result, cost_cad)`.
   - `compute_pass_k(trial_outcomes: Sequence[bool], k: int) -> float` — calcule la constance empirique `pass^k` (`(successes / n)^k` ou taux de réussite sur fenêtres disjointes de `k` essais indépendants, `k >= 3` minimal et `k >= 5` critique ; rejette `pass@k` comme métrique bloquante).
   - `evaluate_trajectory(expected_tools: list[str], observed_calls: list[dict[str, Any]], max_cost_cad: Decimal) -> TrajectoryVerdict` — vérifie l'ordre, les arguments ancrés et le plafond budgétaire.

2. **`evalops_prr/wilson_bounds.py`** (intervalle de confiance de Wilson `EXIG-EVA-03`) :
   - `@dataclass(frozen=True) class WilsonVerdict` : `successes: int`, `n_independent: int`, `target_max_failure_p: float`, `wilson_failure_upper_95: float`, `min_required_trials: int`, `passes_gate: bool`, `reason: str`.
   - `wilson_failure_upper_bound(failures: int, n: int, z: float = 1.959963984540054) -> float` — calcule la borne supérieure de Wilson à `95 %` du taux d'échec `f/n` :
     \[
     p_{\text{sup}} = \frac{\hat{p} + \frac{z^2}{2n} + z\sqrt{\frac{\hat{p}(1-\hat{p})}{n} + \frac{z^2}{4n^2}}}{1 + \frac{z^2}{n}}, \quad \hat{p} = \frac{\text{échecs}}{n}.
     \]
   - `evaluate_wilson_gate(independent_outcomes: Sequence[bool], scenario_ids: Sequence[str], target_max_failure_p: float) -> WilsonVerdict` — vérifie que `len(set(scenario_ids)) == len(independent_outcomes)` (**indépendance stricte** : les répétitions d'un même scénario sont rejetées comme non indépendantes conformément à `2 - Cadre de Référence.md L5041`), exige `n >= math.ceil(3.0 / target_max_failure_p)` lorsque `failures == 0`, et contrôle `wilson_failure_upper_95 < target_max_failure_p`.

3. **`evalops_prr/metamorphic.py`** (tests métamorphiques sans oracle) :
   - `class MetamorphicRelation(StrEnum)` : `"PERMUTATION_INDEPENDENT_TOOLS"`, `"BILINGUAL_FR_EN_INJECTION_INVARIANCE"`, `"BUDGET_CEILING_MONOTONICITY"`, `"BENIGN_PARAPHRASE_INVARIANCE"`.
   - `verify_metamorphic_pair(relation: MetamorphicRelation, baseline: TrajectoryResult, transformed: TrajectoryResult) -> MetamorphicCheck` — vérifie la relation attendue sans nécessiter de réponse d'oracle absolue sur ≥ `100` scénarios paramétriques (`E1–E2`, couvrant français et anglais `EXIG-SEC-24`).

4. **`evalops_prr/prr_validators.py`** (validateurs `24 [BLOQUANT] PRR`, `2027-B001`, `5 SBB`, `3 blueprints` `C01–C40`) :
   - `BLOCKING_PRR_IDS: tuple[str, ...]` (les `24` points exacts de `3 - Compendium 2027.md L28464-L28558` : `S-01, S-03, S-06, S-08, S-09, S-11, S-14, S-15, R-01, R-03, R-06, R-07, R-14, O-02, O-09, G-01, G-03, G-05, G-06, G-07, G-10, G-15, F-04, F-14`).
   - `REQUIRED_5_SBB_SLOTS: tuple[str, ...]` (`"secrets_vault"`, `"guardrails_engine"`, `"signed_human_approval_service"`, `"immutable_audit_ledger"`, `"finops_budget_quota_controller"` — `2 - Cadre de Référence.md L1360-L1361`).
   - `validate_adr_2027_b001(adr_yaml_or_dict: str | dict[str, Any], schema: dict[str, Any]) -> list[str]` — valide les rubriques complètes de `2027-B001` (`C27 L28423-L28448`).
   - `validate_prr_24_blocking(evidence: dict[str, Any], schema: dict[str, Any]) -> PrrReport` — vérifie la présence, l'état `"PASS"` et l'empreinte d'artefact pour chacun des `24` identifiants bloquants.
   - `validate_blueprints_and_c40(blueprints: list[dict[str, Any]]) -> list[str]` — contrôle que chacun des `3` blueprints (`bp1_assistant_interne`, `bp2_rag_entreprise_acl`, `bp3_orchestration_multi_agents_b2b`) renseigne les `5` SBB obligatoires et couvre les `40` critères `C01–C40` (`6 - Livre Blanc.md L5007-L5046`).

#### Schémas `JSON Schema Draft 2020-12` (`strict: true`) et invariants `pytest`

- `schemas/adr_2027_b001.schema.json`, `schemas/prr_24_evidence.schema.json`, `schemas/evalops_wilson_report.schema.json` (`additionalProperties: false`, `required` exhaustif).
- **Invariants `pytest` (`tests/test_evalops_prr.py`) :**
  - *Positifs :* `p = 0.01`, `n = 300` essais indépendants distincts sans échec (`passes_gate == True`, `wilson_failure_upper_95 < 0.01`), `pass^5` sur trajectoires doublures, `100` cas métamorphiques `FR/EN`, `24/24` PRR bloquants + `2027-B001` + `5 SBB` + `3 blueprints` `C01–C40` valides.
  - *Négatifs :* `n = 299` pour `p = 0.01` (`wilson_failure_upper_95 >= 0.01`) rejeté ; `300` répétitions d'un même `scenario_id` rejetées pour défaut d'indépendance ; divergence `FR` vs `EN` sur attaque d'injection détectée en métamorphique ; omission de `soc_killswitch_id` dans `2027-B001`, d'un seul des `24` PRR ou d'un des `5` SBB bloquée.

---

### 2.5 Catalogue exact des `14` extraits courts (`≤ 40` L) exposés en `Ch. 01`–`Ch. 04` (`CA-G0-SYNC`)

Chaque bloc de code clôturé dans `manuscrit/` doit être immédiatement précédé d'une balise HTML de liaison :
`<!-- CA-G0-SYNC id="<ANCHOR_ID>" path="8 - Trousse/<chemin_relatif>" lines="<debut>-<fin>" sha256="<64_hex>" -->`
Dans les fichiers `.py` et `.rego`, les tranches sont encadrées par `# CA-G0-SYNC-BEGIN:<ANCHOR_ID>` et `# CA-G0-SYNC-END:<ANCHOR_ID>` ; dans les fichiers `.schema.json` (dépourvus de commentaires JSON), la tranche `1-N` couvre le fichier complet (`≤ 40` L). Chaque ligne d'un extrait exposé vise une largeur maximale de `78–80` caractères afin de ne pas déborder dans la colonne `4,46 po` de `gabarit-livre.typ`.

| Ancre `CA-G0-SYNC` | Unité | Fichier source dans `8 - Trousse/` | Lignes max | Contrat exposé dans le manuel |
| --- | :---: | --- | :---: | --- |
| `G0-EX-CH01-01` | `Ch. 01` | `schemas/harness_extraction.schema.json` | `24` L | Schéma `Draft 2020-12 strict: true` avec porte `AMBIGU_ESCALADE` |
| `G0-EX-CH01-02` | `Ch. 01` | `harness_proto/pipeline.py` | `32` L | Boucle 8 étapes de `DeterministicHarness.run` et validation sémantique |
| `G0-EX-CH01-03` | `Ch. 01` | `harness_proto/mcp_pinning.py` | `34` L | Épinglage `JCS SHA-256` `tools/list` et rejet `HeaderMismatch` (`-32020`) |
| `G0-EX-CH01-04` | `Ch. 01` | `harness_proto/a2a_card.py` | `28` L | Vérification `JWS` + `JCS` sur `AgentCard` et épinglage `jku`/`kid` |
| `G0-EX-CH02-01` | `Ch. 02` | `authz_pqc_audit/obo_dpop.py` | `30` L | Validation `OBO` `≤ 2` sauts, rejet *passthrough* et liaison `DPoP` |
| `G0-EX-CH02-02` | `Ch. 02` | `authz_pqc_audit/ciba_approval.py` | `24` L | Calcul exact `h = SHA-256(JCS(...))` sur payload `I-JSON` (`C.6`) |
| `G0-EX-CH02-03` | `Ch. 02` | `authz_pqc_audit/pqc_http431.py` | `30` L | Mesure exacte en octets `ML-DSA-65/87` (`O(sauts)` vs *Transaction Token* `O(1)`) |
| `G0-EX-CH02-04` | `Ch. 02` | `authz_pqc_audit/otel_pii_mapper.py` | `32` L | Mappage `OTel v1.41.0 ↔ genai_dev` (`cache_write`) et liste fermée PII |
| `G0-EX-CH03-01` | `Ch. 03` | `policies_opa/rule_of_two.rego` | `28` L | Politique `Rego` Règle de deux (`default allow := false`, `EXIG-SEC-06`) |
| `G0-EX-CH03-02` | `Ch. 03` | `policies_opa/camel_taint.rego` | `24` L | Propagation d'étiquettes de contamination `CaMeL` inter-agents |
| `G0-EX-CH03-03` | `Ch. 03` | `policy_saga/saga_orchestrator.py` | `34` L | Dérivation `idem-v1`, `Outbox` et `CompensationChannel` isolé (`EXIG-ORC-28`) |
| `G0-EX-CH04-01` | `Ch. 04` | `evalops_prr/wilson_bounds.py` | `28` L | Borne supérieure de Wilson à `95 % < p` exigeant `>= 3/p` essais indépendants |
| `G0-EX-CH04-02` | `Ch. 04` | `evalops_prr/metamorphic.py` | `26` L | Vérificateur de relations métamorphiques sans oracle (`FR/EN`) |
| `G0-EX-CH04-03` | `Ch. 04` | `schemas/adr_2027_b001.schema.json` | `32` L | Schéma `Draft 2020-12 strict: true` de la fiche ADR bloquante `2027-B001` |

---

## 3. Intégration des `4` suites de vecteurs officiels tiers en `G0` et séparation étanche

### 3.1 Protocole d'intégration des `4` suites officielles dans `8 - Trousse/vectors/`

Afin de briser la circularité des tests auto-écrits par une même famille de modèles (`P1`), `G0` exige l'exécution hors ligne et sans exception des **4 suites de vecteurs publics officiels** épinglées à la collecte `MLR` (`AO-01` `L+`, `SHA-256` vérifié dans `vectors/vectors-manifest.json`) :

| Suite officielle | Dépôt / Référence épinglée (`L+`) | Répertoire `8 - Trousse/vectors/` | Objets testés et critère de réussite `G0` |
| --- | --- | --- | --- |
| **1. `RFC 8785` (`JCS`)** | Appendices A & B de `RFC 8785` + `cyberphone/json-canonicalization` (vecteurs de référence `testdata/`) | `vectors/rfc8785/` | Sérialisation IEEE-754 ECMAScript, tri UTF-16 (`\uFF00` vs surrogates), unicode/échappements : **100 % concordance octet pour octet** avec `harness_proto/jcs.py`. |
| **2. `NIST FIPS 204 / 205` (`ACVP`)** | `usnistgov/ACVP-Server` (`ML-DSA-*-FIPS204` et `SLH-DSA-*-FIPS205` : `prompt.json` / `expectedResults.json`) | `vectors/nist_acvp/` | Échantillons officiels `keyGen` / `sigGen` / `sigVer` pour `ML-DSA-65`, `ML-DSA-87` (`dilithium-py`) et `SLH-DSA-SHA2-128s/128f` (`slh_dsa_fips205.py`) : **100 % concordance** avec `expectedResults.json`. |
| **3. `a2aproject/a2a-tck`** | `a2aproject/a2a-tck` épinglé au tag **`v1.0.0.alpha3`** (`2 - Cadre de Référence.md L8674` ; inclut `conformance-vectors/a2a-jcs-v01`) | `vectors/a2a_tck/` | Validation `AgentCard`, signatures `JWS` sur `JCS` (`a2a-jcs-v01`) et conformité des cas obligatoires de niveau `MUST` pour `A2A v1.0.1` : **100 % `MUST` passants** (`statut alpha3` consigné). |
| **4. `OWASP SRC-055` (`L+`)** | `https://genai-security-project.github.io/crosswalk/agentic-ai-top10/` (`SRC-055`, `7 - Livre.md L2084`, complété par `github.com/genai-security-project/GenAI-Security-Corpus` `CC BY-SA 4.0`). **Exclusion stricte de `genai.owasp.org` (`HTTP 403`, `statut F` `7 - Livre.md L2110`).** | `vectors/owasp_src055/` | Cartographie des 10 menaces agentiques (`ASI01`–`ASI10`) vers les jeux d'attaques `evalops_prr/metamorphic.py`, les règles `policies_opa/` (`rule_of_two.rego`, `camel_taint.rego`) et les garde-fous `2027-B001` : **100 % couverture `ASI01`–`ASI10`**. |

**Règles d'exécution hermétique des vecteurs :**
- Aucun téléchargement dynamique n'est permis pendant `execute_g0.py` : tous les fichiers JSON/vecteurs sont archivés localement sous `8 - Trousse/vectors/`, indexés dans `vectors/vectors-manifest.json` avec `upstream_url`, `pinned_ref`, `license_spdx`, `sha256` et `byte_length`.
- En cas de divergence entre un fichier sur disque et `vectors-manifest.json`, `execute_g0.py` échoue immédiatement (`exit 1`) avant même de lancer `pytest`.

### 3.2 Séparation étanche `auteur-tests-oracle` ≠ `batisseur-code`

Pour éliminer le biais corrélé entre spécification des tests et écriture du code applicatif, le développement de `8 - Trousse/` (Task 3 de `plan-production-aq.md`) impose un cloisonnement strict en deux contextes isolés :

1. **Rôle `auteur-tests-oracle` (étape TDD Rouge) :**
   - *Entrées autorisées :* `specs-volume-8/architecture-trousse-g0.md`, `registre/*.json`, `vectors/*`.
   - *Propriété exclusive :* `8 - Trousse/schemas/*.schema.json`, `8 - Trousse/tests/*.py`, `8 - Trousse/policies_opa/*_test.rego`, et les stubs de signatures typées (sans logique métier).
   - *Livrable :* suite complète d'assertions positives, négatives et de vecteurs tiers échouant légitimement (`pytest` et `opa test` en échec rouge initial).
2. **Rôle `batisseur-code` (étape TDD Vert) :**
   - *Entrées autorisées :* les stubs, schémas et tests écrits par `auteur-tests-oracle` + `architecture-trousse-g0.md`.
   - *Propriété exclusive :* `harness_proto/*.py`, `authz_pqc_audit/*.py`, `policy_saga/*.py`, `evalops_prr/*.py`, `policies_opa/*.rego` (hors `*_test.rego`).
   - *Interdiction formelle :* `batisseur-code` **ne modifie jamais** `tests/`, `schemas/`, `vectors/` ni `*_test.rego`. Si un test révèle un défaut ou une ambiguïté de contrat, un rapport d'écart remonte vers l'arbitre technique avant toute révision d'oracle.
3. **Vérification mécanique en fin de Task 3 :** contrôle par empreinte `SHA-256` des dossiers `tests/`, `vectors/` et `*_test.rego` avant et après le passage de `batisseur-code` (diff nul exigé) + exécution intégrale de `execute_g0.py` (`exit 0`, `0` test ignoré, `opa test --coverage == 100 %`).

---

## 4. Spécification des `4` registres JSON SSOT (+ registres hérités) et leurs schémas JSON

### 4.1 Les `4` nouveaux registres SSOT du Volume 8

1. **`registre/specifications-lplus.json`** : source unique de vérité de toutes les normes, RFC, FIPS, protocoles, brouillons IETF et textes légaux `L+` cités au manuel et implémentés dans `8 - Trousse/`. Distingue explicitement le statut normatif (`FINAL_STANDARD`, `FIPS_STANDARD`, `IETF_WORKING_GROUP_DRAFT`, `IETF_INDIVIDUAL_DRAFT`, `SPEC_DEVELOPMENT`, `RC_OR_ALPHA`, `REGULATION_IN_FORCE`, `REGULATION_ADOPTED_FUTURE`).
2. **`registre/matrice-exig-prr-c40.json`** : table de traçabilité exhaustive reliant chaque identifiant technique (`EXIG-*`, `CAP-046`, `2027-B001`, `5 SBB`, `24 [BLOQUANT] PRR`, `C01–C40`) au module `8 - Trousse/`, au symbole Python ou à la règle `.rego`, au nœud de test `pytest`, à la suite de vecteurs tiers et au chapitre propriétaire (`ch01..ch04`). Consommé par `genere_annexes.py` pour produire l'**Annexe B**.
3. **`registre/concordance-taxonomies.json`** : table canonique des **`5` discordances inter-volumes** relevées dans `analyse-essaim/audit-aval.md L49` (`L0–L4`, `N0–N4`/`P0–P3`/`R1–R4`/`Classes 1–6`, homonymie des « `4 plans` », `ArchiMate 3.2 ↔ 4.0`, `MCP 2025-11-25 ↔ 2026-07-28`) fixant la convention retenue par le Volume 8 (`Liminaire 0.2`) et empêchant toute divergence entre chapitres.
4. **`aq/rapports-g0.json`** : journal mécanique généré de façon atomique par `outils/execute_g0.py`, contenant le verdict global `G0`, le contrôle `SPDX MIT`, le hash du `requirements.lock`, les statuts `opa test --coverage 100 %` et `pytest`, les résultats des `4` suites tiers et la table `synced_excerpts` consommée par `CA-G0-SYNC` (`verifie_manuscrit.py`) et `genere_annexes.py` (`Annexe B`).

#### Schémas JSON des `4` nouveaux registres SSOT (notation `\$` conforme `CA-06` en préfixe de mot-clé et en fin de `"pattern"` regex)

```json
{
  "\$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "SpecificationsLPlusRegistry",
  "type": "object",
  "additionalProperties": false,
  "required": ["registry_version", "freeze_date", "specs"],
  "properties": {
    "registry_version": { "type": "string" },
    "freeze_date": { "type": "string", "const": "2026-12-02" },
    "specs": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "spec_id", "title", "version_or_tag", "maturity_status",
          "license_spdx", "source_l_plus_id", "sha256", "statut_preuve",
          "modules_trousse", "adapter_boundary"
        ],
        "properties": {
          "spec_id": { "type": "string" },
          "title": { "type": "string" },
          "version_or_tag": { "type": "string" },
          "maturity_status": {
            "type": "string",
            "enum": [
              "FINAL_STANDARD", "FIPS_STANDARD", "IETF_WORKING_GROUP_DRAFT",
              "IETF_INDIVIDUAL_DRAFT", "SPEC_DEVELOPMENT", "RC_OR_ALPHA",
              "REGULATION_IN_FORCE", "REGULATION_ADOPTED_FUTURE"
            ]
          },
          "license_spdx": { "type": "string" },
          "source_l_plus_id": { "type": "string", "pattern": "^SRC-\\d{3}\$" },
          "sha256": { "type": "string", "minLength": 64, "maxLength": 64, "pattern": "^[0-9a-f]{64}\$" },
          "statut_preuve": { "type": "string", "const": "l_plus" },
          "modules_trousse": { "type": "array", "items": { "type": "string" } },
          "adapter_boundary": { "type": ["string", "null"] }
        }
      }
    }
  }
}
```

```json
{
  "\$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "MatriceExigPrrC40Registry",
  "type": "object",
  "additionalProperties": false,
  "required": ["registry_version", "freeze_date", "mappings"],
  "properties": {
    "registry_version": { "type": "string" },
    "freeze_date": { "type": "string", "const": "2026-12-02" },
    "mappings": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id", "family", "criticality", "owner_chapter", "trousse_module",
          "implementation_symbol", "rego_rule", "pytest_nodeid",
          "third_party_vector_suite", "corpus_anchor"
        ],
        "properties": {
          "id": { "type": "string" },
          "family": {
            "type": "string",
            "enum": ["EXIG", "PRR_BLOCKING", "C40", "SBB", "ADR_TEMPLATE", "CAP"]
          },
          "criticality": { "type": "string", "enum": ["BLOQUANT", "OBLIGATOIRE", "RECOMMANDE"] },
          "owner_chapter": { "type": "string", "enum": ["ch01", "ch02", "ch03", "ch04"] },
          "trousse_module": { "type": "string", "enum": ["harness_proto", "authz_pqc_audit", "policy_saga", "evalops_prr", "policies_opa"] },
          "implementation_symbol": { "type": "string" },
          "rego_rule": { "type": ["string", "null"] },
          "pytest_nodeid": { "type": "string" },
          "third_party_vector_suite": { "type": ["string", "null"] },
          "corpus_anchor": { "type": "string" }
        }
      }
    }
  }
}
```

```json
{
  "\$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ConcordanceTaxonomiesRegistry",
  "type": "object",
  "additionalProperties": false,
  "required": ["registry_version", "freeze_date", "concordances"],
  "properties": {
    "registry_version": { "type": "string" },
    "freeze_date": { "type": "string", "const": "2026-12-02" },
    "concordances": {
      "type": "array",
      "minItems": 5,
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "discordance_id", "topic", "volume_variants",
          "canonical_vol8_choice", "liminaire_section", "rationale"
        ],
        "properties": {
          "discordance_id": { "type": "string", "pattern": "^DISC-0[1-5]\$" },
          "topic": { "type": "string" },
          "volume_variants": {
            "type": "array",
            "minItems": 2,
            "items": {
              "type": "object",
              "additionalProperties": false,
              "required": ["volume", "definition", "corpus_ref"],
              "properties": {
                "volume": { "type": "string" },
                "definition": { "type": "string" },
                "corpus_ref": { "type": "string" }
              }
            }
          },
          "canonical_vol8_choice": { "type": "string" },
          "liminaire_section": { "type": "string", "const": "0.2" },
          "rationale": { "type": "string" }
        }
      }
    }
  }
}
```

```json
{
  "\$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "RapportsG0Output",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "schema_version", "executed_at", "freeze_date", "platform",
    "overall_status", "exit_code", "spdx_check", "lockfile_check",
    "schema_validation", "opa_check", "pytest_check",
    "third_party_vectors", "synced_excerpts"
  ],
  "properties": {
    "schema_version": { "type": "string" },
    "executed_at": { "type": "string" },
    "freeze_date": { "type": "string", "const": "2026-12-02" },
    "platform": {
      "type": "object",
      "additionalProperties": false,
      "required": ["os", "python_version", "opa_version", "opa_sha256"],
      "properties": {
        "os": { "type": "string" },
        "python_version": { "type": "string" },
        "opa_version": { "type": "string" },
        "opa_sha256": { "type": "string", "minLength": 64, "maxLength": 64, "pattern": "^[0-9a-f]{64}\$" }
      }
    },
    "overall_status": { "type": "string", "enum": ["PASS", "FAIL"] },
    "exit_code": { "type": "integer", "minimum": 0 },
    "spdx_check": {
      "type": "object",
      "additionalProperties": false,
      "required": ["license_target", "checked_files", "checked_packages", "violations", "passed"],
      "properties": {
        "license_target": { "type": "string", "const": "MIT" },
        "checked_files": { "type": "integer", "minimum": 1 },
        "checked_packages": { "type": "integer", "minimum": 1 },
        "violations": { "type": "array", "items": { "type": "string" } },
        "passed": { "type": "boolean" }
      }
    },
    "lockfile_check": {
      "type": "object",
      "additionalProperties": false,
      "required": ["path", "sha256", "all_hashes_pinned", "passed"],
      "properties": {
        "path": { "type": "string" },
        "sha256": { "type": "string", "minLength": 64, "maxLength": 64, "pattern": "^[0-9a-f]{64}\$" },
        "all_hashes_pinned": { "type": "boolean" },
        "passed": { "type": "boolean" }
      }
    },
    "schema_validation": {
      "type": "object",
      "additionalProperties": false,
      "required": ["schemas_checked", "strict_violations", "passed"],
      "properties": {
        "schemas_checked": { "type": "integer", "minimum": 1 },
        "strict_violations": { "type": "array", "items": { "type": "string" } },
        "passed": { "type": "boolean" }
      }
    },
    "opa_check": {
      "type": "object",
      "additionalProperties": false,
      "required": ["files_checked", "missing_default_deny", "coverage_pct", "tests_passed", "tests_failed"],
      "properties": {
        "files_checked": { "type": "integer", "minimum": 1 },
        "missing_default_deny": { "type": "array", "items": { "type": "string" } },
        "coverage_pct": { "type": "number", "minimum": 0.0, "maximum": 100.0 },
        "tests_passed": { "type": "integer", "minimum": 0 },
        "tests_failed": { "type": "integer", "minimum": 0 }
      }
    },
    "pytest_check": {
      "type": "object",
      "additionalProperties": false,
      "required": ["passed", "failed", "skipped", "modules"],
      "properties": {
        "passed": { "type": "integer", "minimum": 0 },
        "failed": { "type": "integer", "minimum": 0 },
        "skipped": { "type": "integer", "minimum": 0 },
        "modules": { "type": "object", "additionalProperties": { "type": "integer", "minimum": 0 } }
      }
    },
    "third_party_vectors": {
      "type": "object",
      "additionalProperties": false,
      "required": ["rfc8785", "nist_acvp", "a2a_tck", "owasp_src055"],
      "properties": {
        "rfc8785": { "type": "object" },
        "nist_acvp": { "type": "object" },
        "a2a_tck": { "type": "object" },
        "owasp_src055": { "type": "object" }
      }
    },
    "synced_excerpts": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "additionalProperties": false,
        "required": ["unit", "source_path", "lines", "line_count", "sha256"],
        "properties": {
          "unit": { "type": "string", "enum": ["ch01", "ch02", "ch03", "ch04"] },
          "source_path": { "type": "string" },
          "lines": { "type": "string", "pattern": "^\\d+-\\d+\$" },
          "line_count": { "type": "integer", "minimum": 1, "maximum": 40 },
          "sha256": { "type": "string", "minLength": 64, "maxLength": 64, "pattern": "^[0-9a-f]{64}\$" }
        }
      }
    }
  }
}
```

### 4.2 Registres hérités du Volume 7 maintenus et adaptés au Volume 8

Les quatre registres hérités conservent la compatibilité structurelle avec `verifie_specs.py`, `verifie_manuscrit.py` et `genere_annexes.py`, en bornant leurs références chapitres à `00-liminaire` / `ch01..ch04` et leur `freeze_date` à `"2026-12-02"` :

| Registre hérité | Clés principales conservées | Adaptation Volume 8 |
| --- | --- | --- |
| **`registre/ancres-chronologiques.json`** | `registry_version`, `freeze_date`, `anchors[]` (`key`, `date`, `nature`, `jurisdiction`, `label`, `chapters`, `statut_preuve`, `source_l_plus_id`, `commentaire_annexe`) | `chapters` restreint à `ch01..ch04` ; ajout des jalons techniques T1–T2 2027 (`MCP SEP-3398` `2027-03-30`, `TLS 100 j` `2027-03-15`, `BSIF E-23` `2027-05-01`, `EU AI Act Annexe III` `2027-12-02`, `G7 PQC` `2030-2035`). |
| **`registre/faits-empiriques.json`** | `registry_version`, `freeze_date`, `facts[]` (`id`, `metric`, `value`, `source`, `owner_chapter`, `statut_preuve`, `source_l_plus_id`, `commentaire_annexe`) | `owner_chapter` dans `ch01..ch04` ; inclut notamment `FACT-MCP-DRIFT-4058` (`40,58 %` `C27 L4000`), `FACT-PQC-SIGNATURE-SIZE` (`ML-DSA-65` `3 309 o`, `ML-DSA-87` `4 627 o`), `FACT-CAMEL-RESIDUAL` (`77 %` vs `84 %`, résidu `5/15` *trifecta*), `FACT-MAST-FAILURES` (`41 %` à `86,7 %`). |
| **`registre/glossaire-termes.json`** | `registry_version`, `freeze_date`, `terms[]` (`fr`, `en`, `definition`, `chapitre_proprietaire`) | Minimum `12` termes (cible `20–30`), `chapitre_proprietaire` dans `00-liminaire` et `ch01..ch04`, vérifiés par `CA-07` (`L1168-L1176`). |
| **`recherche/registre-statut-f.json`** | `protocol_id`, `freeze_date`, `ao_01_policy`, `blocked[]` (`url`, `status: "F"`, `included_in_evidence: false`, `http_status`, `block_reason`, `reason`, `note`, `checked_at`) | Consigne tous les refus serveur `AO-01` (`genai.owasp.org` `403`, `lautorite.qc.ca` `403`, `legisquebec.gouv.qc.ca` `403`, `ISO/IEC 42001` paywall) et alimente l'**Annexe A**. |

---

## 5. Plan d'adaptation ligne par ligne des `13` fichiers / `7 897` L de `C:\Github\Agentique\7 - Livre 2027\outils` + `execute_g0.py`

> **Constat d'intégrité vérifié sur disque (`Agentique\7 - Livre 2027\outils`) :** le commit `2f129b4` pur (`HEAD`) compte `12` fichiers / `6 001` lignes ; l'arbre de travail non commité sur base `2f129b4` compte **`13` fichiers totalisant `7 897` lignes** (`6 185` L d'outillage + `1 712` L dans `4` suites `pytest`), contre `6 588` L (`5 297` + `1 291`) citées en Phase 1 (`REVUE-PROPOSITIONS.md L60`). Toute réécriture de zéro ou référence aux anciens scripts de `Vol. 4/5` est interdite ; chaque script adapté depuis `Agentique` reçoit dès sa copie l'en-tête `# SPDX-License-Identifier: MIT` requis par `execute_g0.py` (`G0`).

### 5.1 Tableau directeur d'adaptation des `13` fichiers existants + création unique

| # | Fichier source (`7 - Livre 2027\outils`) | Lignes vérifiées (disque / *Ph. 1*) | Décision | Lignes / symboles ciblés et modifications exactes pour le Volume 8 |
| :---: | --- | :---: | :---: | --- |
| 1 | `_communs.py` | `190` / *190* | **Réutiliser** | Conserver tel quel (`DEFAULT_FREEZE_DATE = "2026-12-02"` `L11`, `get_freeze_date` `L95-L122`, `escape_dollars` `L155-L168`, `split_sentences` `L171-L179`, `is_markdown_table_block` `L182-L190`). |
| 2 | `compile_figures.py` | `650` / *650* | **Réutiliser** *(paramétrer)* | Remplacer `EXPECTED_FIGURE_COUNT = 23` (`L25`, `L467`, `L606`, `L643`) par lecture dynamique de `len(manifest["figures"])` (`9` figures : `7` `.svg` PlantUML `-failfast2` + `2` `.png` Mermaid 300 DPI `Fig-00..Fig-08`), tout en gardant `MIN_NODES_PER_FIGURE = 10` et `MAX_NODES_PER_FIGURE = 14` (`L23-L24`). |
| 3 | `test_compile_figures.py` | `241` / *203* | **Réutiliser** *(adapter quota)* | Aligner l'assertion sur `9` figures (`7` PlantUML `.svg` + `2` Mermaid `.png`) au lieu de `23` (`test_all_23_declared_figures...`). |
| 4 | `collecte_mlr_ouverte.py` | `911` / *911* | **Étendre** | Conserver intactes les gardes `AO-01` (`L40-L68`, `L261-L389`) et la vérification `SHA-256` (`L407-L521`). Ajouter `fetch_pinned_git_spec(repo_url, ref_or_commit, rel_path, expected_sha256)` pour moissonner en `L+` les dépôts Git techniques épinglés (`MCP`, `A2A`, `a2a-tck`, `OTel semantic-conventions-genai`, `OPA`, `OWASP SRC-055`). |
| 5 | `test_collecte_mlr.py` | `308` / *209* | **Étendre** | Conserver les `11` tests `AO-01`/`WAF`/`SHA-256` et ajouter les tests unitaires du connecteur Git épinglé (acceptation sur tag/commit exact `SHA-256`, rejet sur dérive de hash ou HTTP `403`/`429`). |
| 6 | `assemble_livre.py` | `759` / *582* | **Ajuster** *(G5)* | Externaliser `_PART_TITLES` (`L25-L30` → Parties `I` et `II` du Vol. 8), fixer l'`image_prefix` du Markdown consolidé à `8 - Livre 2027/diagrammes/rendus` (`L148, L186, L258` — et `--resource-path` / `--embed-resources` pour l'HTML dans `livrables/`) et placer les livrables consolidés directement à la racine du dépôt (`L262, L272, L668, L707` → `8 - Livre.md`, `8 - Livre.pdf`, comme `1..7 - Livre.md`, plus `8 - Livre 2027/livrables/8 - Livre 2027.html`) en barrière **`G5`** (`CA-18`). |
| 7 | `gabarit-livre.typ` | `369` / *369* | **Ajuster** | Conserver `6.14in × 9.21in`, `10.6pt` (`L73-L86`) et la note `AO-05` (`L171-L182`). Ajuster `#show raw.where(block: true)` (`L324-L330`) : ajouter `breakable: false` (pour préserver la lisibilité des extraits `≤ 40` L sur une seule page) et régler la taille à `7.6pt` / interligne serré sur `4,46 po` utiles. |
| 8 | `verifie_specs.py` | `559` / *559* | **Adapter** | Paramétrer `_validate_toc_concordance` (`L93-L253`) et `validate_specs` (`L256-L539`) sur `manifest.json` Vol. 8 : `5` unités narratives (`00-liminaire` + `ch01..ch04`), `2` Annexes (`A` et `B`), `22` sous-sections (`0.1..0.6`, `1.1..4.4`), `9` figures (`Fig-00..Fig-08`), budget `38 000` mots `[34 960, 41 040]`, `AO-01..AO-08`, `CA-01..CA-20`, barrières `G0..G5`, nouveaux registres (`specifications-lplus.json`, `matrice-exig-prr-c40.json`, `concordance-taxonomies.json`), `architecture-trousse-g0.md`, existence de `8 - Trousse/`, et contrôle regex dollar sur les `9` fichiers `specs/`. |
| 9 | `test_verifie_specs.py` | `170` / *122* | **Adapter** | Mettre à jour les fixtures de test (`7` unités, `9` figures, `AO-01..08`, `CA-01..20`, `3` nouveaux registres SSOT, règle dollar globale en `specs/`). |
| 10 | `echantillon_aq.py` | `421` / *421* | **Adapter** *(G3)* | Outillage officiel de la barrière **`G3`** (passes 1 et 2 à froid, graines `20270801` / `20270802`). Remplacer `CATEGORY_QUOTAS` (`L31-L35`) par **`4` strates × `15` items = `60`** (`"empirique"`, `"juridique"`, `"spec_technique"`, **`"assertions_g0"`**). Porter le plancher par unité narrative (`L344`) de `2` à **`>= 8` items/unité** (`5 × 8 = 40` planchers). Charger `_UNIT_CATEGORY_PRIOR` (`L177-L191`) et `_VIGILANCE_MATCHERS` (`L193-L199`) depuis `manifest.json` (vigilances Vol. 8). Extraire aussi les assertions de la `4e` strate `G0` liées aux balises `CA-G0-SYNC` et seuils `G0`. |
| 11 | `genere_annexes.py` | `632` / *632* | **Adapter** *(G5)* | Conserver `_parse_ancrage_claims` (`L274-L299`, journaux **`G2`** Wyvern), `_parse_g3_scores` (`L302-L327`, bilans **`G3`**), `_collect_qa_metrics` (`L330-L398`, synthétisant `G0`–`G5` et **`G4`** `gauntlet-loop`), `_fit_word_budget` (`L52-L75`) et le bloc `BIBLIOGRAPHIE_BRUTE` (`L556-L589`). Remplacer les 3 renderers (`L78-L271`, `L405-L590`) par les **2 renderers `annexe-a` et `annexe-b`** (`1 500` mots `[1 380–1 620]` chacun, barrière **`G5`**) consommant les `4` registres SSOT + `rapports-g0.json` + `ancrage/*.md` + `aq/*`. |
| 12 | `verifie_manuscrit.py` | `1 694` / *983* | **Adapter impérativement** *(G1)* | Outillage de la barrière **`G1`** (et rejeu obligatoire avec **`G0`** + **`G2` différentiel** après **`G4`** [`gauntlet-loop`] et **`G5`** [lissage]). **(1) `CA-02` (`_check_ca02_unit L491-L520`, `manifest.json L30-L57`) :** retirer `\bEXIG-[A-Z]+-\d{2}\b`, `\bCAP-\d{3}\b`, `\bADR-\d{3}\b`, `\bPOR-\d{3}\b` et `\bPRR\b` de `forbidden_prose_regexes` ; conserver l'interdiction des marqueurs `[S]`, `[D]`, `[A]`, `[M]`, `[N]`, `[L+]`, `Classe/Stade/Palier`, `ANC-*`, `INI-*`, `PEX-*`, `SIG-*`, `DIV-*` et formules creuses. **(2) `CA-G0-SYNC` (`CA-20`) :** conserver `_mask_fenced_code_preserving_lines` (`L117-L137`) sur ses `8` appels (`L154` décompte mots, `L350` 12-grammes, `L494` `CA-02`, `L583` `CA-04`, `L731` `CA-05`, `L862` `CA-06`, `L908` `CA-10`, `L1184` `CA-07`) et ajouter `_check_ca_g0_sync()` **qui lève ce masquage** pour contrôler chaque bloc clôturé (`≤ 40` L, balise `<!-- CA-G0-SYNC ... -->` valide, chemin résolu dans `8 - Trousse/`, concordance octet pour octet et `SHA-256` contre `aq/rapports-g0.json`). **(3) `CA-04`/`CA-05` (`L575-L819`) :** encadrés `> **Cinq critères permanents d'évaluation et de preuve exécutable**` (`L613`) et `> **Trois invariants exécutables — Chapitre X**` (`L626`), `max_tables_per_chapter = 3` (`L740`), `max_bullet_line_ratio = 0.25` (`L752`). **(4) `CA-13/14/18/19` (`L1420-L1581`) :** graines `20270801`/`20270802`, `8 - Livre 2027.html` / `8 - Livre.md` / `8 - Livre.pdf`, `9` figures, `Annexes A–B`, et validation de `aq/rapports-g0.json` (`exit_code == 0`). |
| 13 | `test_outillage_aq.py` | `993` / *757* | **Adapter** | Adapter les fixtures au Volume 8 (`5` unités narratives, `9` figures, `2` Annexes) et ajouter les tests critiques : `CA-G0-SYNC` (bloc `> 40` L bloqué, bloc sans ancre bloqué, 1 octet divergent bloqué), `CA-02` (`EXIG-*`/`PRR` autorisés, `[S]`/`[L+]` bloqués), `CA-05` (`3` tableaux / `25 %` puces), `4e` strate `G0` (`15×4 = 60`, `>= 8`/unité, graines `20270801`/`20270802` disjointes). |
| **14** | **`execute_g0.py` *(création unique + `test_execute_g0.py`)*** | *Nouveau (~380–450 L)* | **Créer** | Orchestrateur unique de la barrière **`G0` (`CA-19`)** et sa suite `pytest` dédiée `test_execute_g0.py`, décrits ci-dessous (`§ 5.2`). |

### 5.2 Spécification complète du nouveau script unique `outils/execute_g0.py`

**Interface CLI et point d'entrée Python :**
- CLI : `python "8 - Livre 2027/outils/execute_g0.py" [--book-dir <dir>] [--trousse-dir <dir>] [--output <aq/rapports-g0.json>] [--verify-sync-manifest]`
- Signature publique importable : `run_g0(trousse_dir: Path, out_report: Path, book_dir: Path | None = None) -> int` (retourne `0` uniquement si 100 % des 7 étapes ci-dessous réussissent).

**Pipeline séquentiel bloquant en `7` étapes (`exit 0` uniquement si 100 % des étapes réussissent) :**

1. **Résolution portable de l'environnement :** vérifie Python `>= 3.12`, localise l'exécutable `opa` (`opa.exe` sous Windows, `opa` sous Linux via `PATH` ou chemin configuré dans `tools-lock.json`), vérifie son condensat `SHA-256` contre `8 - Trousse/tools-lock.json` et capture `opa version`. Échec immédiat (`exit 1`) si absent ou modifié.
2. **Contrôle `requirements.lock` `SHA-256` et hygiène `SPDX MIT` :**
   - Analyse `8 - Trousse/requirements.lock` : vérifie qu'aucune dépendance n'est flottante et que chaque paquet porte `--hash=sha256:...`.
   - Vérifie via `importlib.metadata` toutes les licences installées contre `spdx-allowlist.json` (`MIT`, `Apache-2.0`, `BSD-*`, `ISC`, `PSF-2.0`, `MPL-2.0`, `CC0-1.0` admis ; `GPL`/`AGPL`/`LGPL` rejetés).
   - Scanne 100 % des fichiers `.py` et `.rego` de `8 - Trousse/` et `8 - Livre 2027/outils/` pour confirmer l'en-tête `# SPDX-License-Identifier: MIT` et `schemas/*.schema.json` pour `"x-license": "MIT"`.
3. **Validation `JSON Schema Draft 2020-12 strict: true` et registres SSOT :**
   - Vérifie la validité méta-schéma (`Draft202012Validator.check_schema`) sur tous les fichiers `8 - Trousse/schemas/*.schema.json` et impose statiquement `additionalProperties: false`, présence de tous les champs de `properties` dans `required`, absence d'`allOf`/`if-then-else` racine et absence de `\$ref` HTTP/HTTPS.
   - Valide les `4` nouveaux registres SSOT + `4` registres hérités de `8 - Livre 2027/registre/` et `recherche/`.
4. **Contrôle statique et couverture `OPA / Rego` (`100 %`) :**
   - Inspecte chaque fichier `policies_opa/*.rego` (hors `*_test.rego`) et échoue si `default allow := false` (ou `default decision := "deny"`) ne figure pas explicitement en tête de paquet après `package ...`.
   - Exécute `[opa_bin, "test", str(policies_dir), "--coverage", "--format=json"]` (`shell=False`), parse le JSON de couverture et exige `coverage == 100.0` et `0` échec.
5. **Intégrité hors ligne des `4` suites de vecteurs officiels tiers :** vérifie l'empreinte `SHA-256` et la taille en octets de chaque fichier déclaré dans `8 - Trousse/vectors/vectors-manifest.json` (`rfc8785`, `nist_acvp`, `a2a_tck` `1.0.0.alpha3`, `owasp_src055`).
6. **Exécution `pytest` complète :** exécute `[sys.executable, "-m", "pytest", str(trousse_tests_dir), "-q", "--tb=short"]` (`shell=False`) avec capture structurée des compteurs par module et par suite de vecteurs ; exige `failed == 0`, `errors == 0` et `skipped == 0`.
7. **Calcul des empreintes `CA-G0-SYNC` et écriture atomique de `aq/rapports-g0.json` :**
   - Lit le catalogue des `14` extraits `G0-EX-CH01-01` .. `G0-EX-CH04-03` (`§ 2.5`), extrait les tranches normalisées LF (`\n`) depuis `8 - Trousse/`, vérifie `1 <= line_count <= 40` et calcule leur `SHA-256`.
   - Écrit `aq/rapports-g0.json` (atomiquement via fichier temporaire + `replace`) conforme au schéma `RapportsG0Output` (`§ 4.1`) et retourne `0` si `overall_status == "PASS"`, sinon `1`.

---

## 6. Politique de gel, adaptateurs de dérive T1–T2 2027 et portabilité CI Windows/Linux

### 6.1 Politique de gel et clause d'archive figée (`P2`)

1. **Date de gel canonique (`2026-12-02`) :** toutes les versions de protocoles, normes, dépôts Git, vecteurs tiers et dépendances Python de `8 - Trousse/` sont figées au plus tard le **2 décembre 2026** (`verifie_specs.py L64` rejette toute ancienne date ou dérive de gel).
2. **Mention d'archive figée :** le `README.md` de `8 - Trousse/`, la page de titre du manuel et l'Annexe A affichent explicitement que `8 - Trousse/` constitue une **« référence figée et vérifiée à la date de gel (`2026-12-02`) — archive pédagogique non maintenue en production sans équipe d'exploitation dédiée »** et relève du régime consultatif `non-avis` (`AO-05` + `DC-P12`).
3. **Observatoire post-gel dissocié :** les évolutions survenues après le 2 décembre 2026 (dès T1 2027) relèvent exclusivement du service compagnon périodique **`E'`**, sans altération rétroactive de l'archive figée du Volume 8.

### 6.2 Adaptateurs versionnés contre les dérives T1–T2 2027

Trois points d'instabilité documentés à la date de gel (`2 - Cadre de Référence.md L8667-8680`) sont isolés derrière des interfaces dédiées dans `8 - Trousse/` :

| Évolution attendue T1–T2 2027 | Risque sur le code épinglé au `2026-12-02` | Interface d'isolation dans `8 - Trousse/` | Contrat de migration sans refonte |
| --- | --- | --- | --- |
| **`MCP SEP-3398`** *(révision attendue le `30 mars 2027`)* & **`SEP-2596`** *(finale 3 juin 2026, retrait possible de `HTTP+SSE`)* | Changement d'en-têtes de routage, promotion `Tasks` (`Beta` → cœur), suppression définitive de `HTTP+SSE` | `McpTransportAdapter` + `expected_revision` dans `harness_proto/mcp_pinning.py` | Nouvel adaptateur pour la révision `2027-03-30` ; les calculs `JCS SHA-256`, les schémas `2020-12` et `Streamable HTTP` restent inchangés ; `HTTP+SSE` déjà interdit par défaut. |
| **`A2A v1.1.0-rc`** *(tag du 29 oct. 2026)* & **`a2a-tck`** *(`v1.0.0.alpha3`)* | Nouveaux champs mineurs dans `AgentCard` ou réorganisation de `a2a-tck` à la sortie `1.0.0` / `1.1.0` finale | `AgentCardAdapter` + sélecteur `protocolVersion` dans `harness_proto/a2a_card.py` | Projection des nouveaux champs optionnels vers le schéma `v1.0.1` validé ; conservation stricte du mécanisme `JWS` sur `JCS RFC 8785` et épinglage `jku`/`kid`. |
| **`OpenTelemetry semantic-conventions-genai`** *(branche `Development`, `0` étiquette, `85` attributs)* | Renommages d'attributs et métriques (ex. `cache_creation` → `cache_write`, `gen_ai.client.token.usage` → `gen_ai.client.inference.usage.*`) | `OtelGenAiMapper` + table déclarative `OTEL_V141_TO_GENAI_DEV_MAP` dans `authz_pqc_audit/otel_pii_mapper.py` | Mise à jour de la seule table de correspondance vers les attributs `Stable`, avec fenêtre de transition de `60 jours` (`5 - Memoire.md L1197`) sans modifier le filtrage PII ni les champs `ca.entreprise.*`. |

### 6.3 Portabilité CI Windows / Linux sans infrastructure lourde

La barrière **`G0`** s'exécute à l'identique sur poste développeur Windows 11, conteneur Linux et runners CI standards (`windows-latest` et `ubuntu-latest`) :

1. **Zéro infrastructure lourde en `G0` :** aucune dépendance à `Rust`, `Go`, `Docker`, `Firecracker` (`/dev/kvm`), `PostgreSQL RLS`, `OpenFGA`, grappe `Kubernetes` ni écouteur `Nginx`/`Envoy` actif.
2. **Invariance fins de ligne (`LF` vs `CRLF`) :** toutes les lectures pour calcul `SHA-256` (`CA-G0-SYNC`, `JCS`, `vectors-manifest.json`, `corpus_l_plus/*.txt`) normalisent explicitement `\r\n` → `\n` avant hachage, et `.gitattributes` force `eol=lf` sur `*.py`, `*.rego`, `*.json` et `*.md`.
3. **Sûreté d'exécution multiplateforme :** `shell=False` systématique dans `subprocess.run`, chemins résolus par `pathlib.Path` et sérialisés au format POSIX (`/`) dans tous les registres et balises `CA-G0-SYNC`, `pytest` invoqué via `sys.executable -m pytest`, et binaire `opa` résolu sans hypothèse de `PATH` Unix.
4. **Extension optionnelle hors chemin critique `G0` :** un unique banc TCP local optionnel sur boucle locale (`127.0.0.1`) peut être ajouté hors `execute_g0.py` si un test de bout en bout sur écouteur HTTP réel est requis ultérieurement, sans jamais bloquer `G0`.
