# Plan de production et d'AQ du Volume 8 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task **uniquement lorsque l'utilisateur donnera le feu vert de lancement après validation de `specs-volume-8/`**. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produire, coder, tester en double aveugle, illustrer, vérifier par six barrières indépendantes (`G0` à `G5`) et assembler en triple édition (`.md`, `.html` autonome, `.pdf` Typst `6,14 × 9,21 po`) l'ouvrage complet *Ingénierie exécutable de l'entreprise agentique* — *Manuel de spécifications testables, harnais 80/20, médiation MCP/A2A, délégation bornée, politiques OPA hors modèle, sémantique d'effet Saga et suite EvalOps vérifiable (non-avis)* (`38 000` mots ± 8 % = `34 960–41 040` mots : liminaire `3 500` mots + `4` chapitres `31 500` mots + Annexes `A`–`B` `3 000` mots, `9` figures `Fig-00` à `Fig-08`) ainsi que son dépôt logiciel compagnon exécutable `8 - Trousse/` (`MIT`, `4` modules `Python 3.12+` et paquets `OPA / Rego`) à partir du dossier normatif `specs-volume-8/`.

**Architecture:** Pipeline séquentiel en sept tâches découplées par fichiers versionnés et journaux cryptographiques `SHA-256` : (1) adaptation ciblée des `13` fichiers d'outillage existants de `C:\Github\Agentique\7 - Livre 2027\outils` (`7 897` lignes sur base `2f129b4`) + création unique de `execute_g0.py` et instanciation de `manifest.json`/`protocole-mlr-2027.json`, (2) collecte scientifique et technique ouverte `L+` hachée `SHA-256` (specs Git épinglées, RFC, NIST, arXiv, `4` suites de vecteurs tiers) et constitution des `4` registres JSON SSOT + `5` bases fermées `sources/ch00..ch04-sources.md`, (3) développement TDD en double aveugle (`auteur-tests-oracle` puis `batisseur-code`) des `4` modules Python et règles `OPA/Rego` dans `8 - Trousse/` avec validation `G0` (`exit 0`), (4) génération et compilation stricte des `9` figures (`7` `PlantUML .svg -failfast2` + `2` `Mermaid .png 300 DPI`, `≤ 14` nœuds), (5) rédaction cloisonnée des `5` unités narratives avec injection mécanique des extraits `≤ 40` L depuis `8 - Trousse/` et passage `G0` + `G1` (`CA-G0-SYNC`), (6) exécution étanche de `G2` (`5` auditeurs Wyvern neufs), `G3` passe 1 (`seed=20270801`) et `G4` (`gauntlet-loop` A/B + rejeu `G0`+`G1`+`G2` différentiel), puis (7) lissage `G5`, recollation à froid `G3` passe 2 (`seed=20270802`), régénération déterministe des Annexes `A`–`B`, compilation triple et inspection visuelle de `100 %` des pages.

**Tech Stack:** Python 3.12+ (`pytest`, `jsonschema`, `pymupdf`, `hashlib`, `decimal`, `json`, `re`), `OPA` CLI (`opa test --coverage`, `Apache 2.0`), `PlantUML` (`.svg` `-failfast2`), `Mermaid CLI` (`.png` `300 DPI`), `Pandoc` (`-f markdown-tex_math_dollars+tex_math_single_backslash`), `Typst` (`6,14 × 9,21 po`), orchestration multi-agents isolée via `invoke_subagent`.

**Spec:** `specs-volume-8/prd.md`, `specs-volume-8/toc.md`, `specs-volume-8/charte-editoriale.md`, `specs-volume-8/architecture-trousse-g0.md`, `specs-volume-8/contrat-aq.md`, `specs-volume-8/plan-production-aq.md`, `specs-volume-8/prompt-lancement.md`, `specs-volume-8/validation-specs.md`, `RECOMMANDATION-FINALE.md` (§ 4) et `recommandation-finale/propositions-A-B-revisees.md` (§ 1).

## Global Constraints

- Zéro contournement d'accès (`AO-01`) : tout `HTTP 401`, `403`, `429`, `451`, WAF, CAPTCHA, Turnstile, Anubis ou mur payant stoppe net la requête après `1` tentative et classe l'URL en `statut F` (exclue de toute preuve, `0,0 %` de `METADATA_ONLY` ; notamment `lautorite.qc.ca`, `legisquebec.gouv.qc.ca`, `genai.owasp.org` et `ISO/IEC 42001` payante).
- Plage stricte de volume (`CA-01`) : `34 960` à `41 040` mots au total (`38 000 ± 8 %`), dont `35 000` mots narratifs (`00-liminaire` `3 500` [`3 220–3 780`], `ch01` `8 000` [`7 360–8 640`], `ch02` `8 500` [`7 820–9 180`], `ch03` `8 000` [`7 360–8 640`], `ch04` `7 000` [`6 440–7 560`]) et `3 000` mots d'annexes (`annexe-a` `1 500` [`1 380–1 620`], `annexe-b` `1 500` [`1 380–1 620`]).
- Propreté lexicale adaptée (`AO-03` / `CA-02`) et anti-auto-plagiat (`AO-04` / `CA-03`) : identifiants techniques (`EXIG-*`, `CAP-*`, `ADR-*`, `POR-*`, `PRR`, `C01–C40`, `SBB`) autorisés ; marqueurs bruts (`[S]`, `[D]`, `[A]`, `[M]`, `[N]`, `[L+]`), classifications internes non définies (`Classe`, `Stade`, `Palier`), codes hors périmètre `A'` (`ANC-*`, `INI-*`, `PEX-*`, `SIG-*`, `DIV-*`) et formules creuses bannis ; `0` collision `12-grammes` face aux `7` volumes consolidés (`1 - Compendium 2026.md` à `7 - Livre.md`), hors citations courtes `≤ 40` mots entre guillemets français `« … » [n]` et extraits validés `CA-G0-SYNC`.
- Sûreté typographique (`CA-06`) : aucun caractère dollar non échappé dans aucun fichier `.md` ; montants échappés en `\$`, formules écrites uniquement en `\(...\)` ou `\[...\]`, `Pandoc` invoqué avec `-f markdown-tex_math_dollars+tex_math_single_backslash`.
- Zéro preuve circulaire (`AO-02`) : les `7` volumes consolidés du dépôt (`1 - Compendium 2026.md`..`7 - Livre.md`) demeurent en lecture seule absolue et servent uniquement de carte de repérage ; tout fait issu de ces volumes est réancré sur sa source primaire `L+` hachée `SHA-256`.
- Portée `non-avis` (`AO-05` & `DC-P12`) et séparation livre / code (`AO-08` & `CA-G0-SYNC`) : bandeau explicite `non-avis` (hors modèle, sans avis juridique, certification ni homologation `SoR` réel), licences `CC BY 4.0` (manuel) / `MIT` (`8 - Trousse/`), aucun bloc de code écrit à la main en prose (extraits `≤ 40` L injectés mécaniquement et scellés par `SHA-256`), et exclusion en `G0` de `Cedar`, `Rust`, `Go`, `Firecracker`/KVM, `PostgreSQL RLS`, `OpenFGA` et `Nginx`/`Envoy` live.
- Ordre chronologique des barrières (`contrat-aq.md`) : `G0` → `G1` → `G2` → `G3` passe 1 (`seed=20270801`) → `G4` (`gauntlet-loop` + `G0`+`G1`+`G2` diff) → `G5` lissage (+ `G0`+`G1`+`G2` diff) → `G3` passe 2 à froid (`seed=20270802`) → `G5` Annexes `A`–`B`, rendu triple et inspection visuelle `100 %` des pages.
- Calendrier et étanchéité : date de gel des faits arrêtée par l'auteur (**André-Guy Bruneau, M.Sc IT**) au **2 décembre 2026** (`2026-12-02`), parution visée en **janvier 2027** (toutes les échéances `2027+` rédigées au futur comme échéances à venir). Double aveugle `auteur-tests-oracle` ≠ `batisseur-code` en `G0`, et aucun sous-agent rédacteur n'exécute `G2`, `G3`, `G4` ou `G5` sur son propre texte ; `gauntlet-loop` utilise exclusivement `invoke_subagent`, jamais `swarm`.

## Review Focus

- Risque d'auto-validation corrélée intra-essaim entre `auteur-tests-oracle` et `batisseur-code` en `G0` : exiger l'exécution des `4` suites de vecteurs officiels tiers (`RFC 8785`, `NIST FIPS 204/205 ACVP`, `a2aproject/a2a-tck 1.0.0.alpha3`, `OWASP SRC-055 L+`) et verrouiller par `SHA-256` les oracles avant implémentation.
- Risque d'absence de refus par défaut dans `OPA / Rego` (qui évalue à *indéfini* sans clause par défaut) : imposer en `execute_g0.py` le contrôle syntaxique `default allow := false` (ou `default decision := "deny"`) en tête de paquet et `opa test --coverage 100 %` sur vecteurs négatifs et mal typés.
- Dérive entre le code exécuté dans `8 - Trousse/` et les extraits affichés dans le manuel : lever le masquage `_mask_fenced_code_preserving_lines` (`verifie_manuscrit.py` `L117-L137`, `8` appels `L154, L350, L494, L583, L731, L862, L908, L1184`) pour valider chaque bloc clôturé sous `CA-G0-SYNC` (`≤ 40` L, chemin source valide, concordance octet et `SHA-256` contre `aq/rapports-g0.json`).
- Blocage de `CA-02` sur les identifiants d'ingénierie du Volume 8 : retirer `EXIG-*`, `CAP-*`, `ADR-*`, `POR-*`, `PRR` de `forbidden_prose_regexes` (`manifest.json` et `_check_ca02_unit`) tout en maintenant bannis `[S]`, `[D]`, `[A]`, `[M]`, `[N]`, `[L+]`, `Classe`/`Stade`/`Palier` et les formules creuses.
- Régression factuelle, altération de `\$` ou désynchronisation de `CA-G0-SYNC` lors de `G4` (`gauntlet-loop`) et `G5` (`lisseur-editorial`) : imposer le rejeu complet de `execute_g0.py`, `verifie_manuscrit.py --strict` et d'une passe Wyvern `G2` différentielle sur le `git diff`.

---

### Task 1: Adaptation des `13` outils existants de `7 - Livre 2027\outils` (`7 897` L) + création de `execute_g0.py`

**Files:**
- Create: `8 - Livre 2027/specs/manifest.json`, `8 - Livre 2027/specs/protocole-mlr-2027.json` (instanciés depuis `specs-volume-8/*.md`)
- Copy & Adapt (depuis `C:\Github\Agentique\7 - Livre 2027\outils`, `13` fichiers / `7 897` L sur base `2f129b4`):
  - `8 - Livre 2027/outils/_communs.py` (`190` L — réutiliser, `DEFAULT_FREEZE_DATE = "2026-12-02"` paramétrable)
  - `8 - Livre 2027/outils/compile_figures.py` (`650` L) + `test_compile_figures.py` (`241` L) (paramétrer `9` figures `Fig-00`..`Fig-08`)
  - `8 - Livre 2027/outils/collecte_mlr_ouverte.py` (`911` L) + `test_collecte_mlr.py` (`308` L) (étendre avec connecteur de specs Git épinglées par commit/tag `SHA-256` et garde `AO-01`)
  - `8 - Livre 2027/outils/assemble_livre.py` (`759` L) + `gabarit-livre.typ` (`369` L) (externaliser `_PART_TITLES` `L25-L30` et sorties `8 - Livre.md/.pdf` & `8 - Livre 2027.html` via `manifest.json` ; styler `raw(block: true)` `L324-L330` pour extraits `≤ 40` L)
  - `8 - Livre 2027/outils/verifie_specs.py` (`559` L) + `test_verifie_specs.py` (`170` L) (valider `7` unités = `38 000` mots, `22` sous-sections, `9` figures, `AO-01`..`AO-08`, `CA-01`..`CA-20`, cibles `G0`)
  - `8 - Livre 2027/outils/echantillon_aq.py` (`421` L) (ajouter `4e` strate `assertions_g0` = `4 × 15` items, `≥ 8` par unité narrative, `_VIGILANCE_MATCHERS` `L193-L199` depuis `manifest.json`)
  - `8 - Livre 2027/outils/genere_annexes.py` (`632` L) (produire **Annexes `A` et `B`** depuis les `4` registres JSON SSOT, `ancrage/` et `aq/`)
  - `8 - Livre 2027/outils/verifie_manuscrit.py` (`1 694` L) + `test_outillage_aq.py` (`993` L) (adapter `CA-02` `L491-L520`, ajouter `CA-G0-SYNC` en levant `_mask_fenced_code_preserving_lines` `L117-L137` sur ses `8` appels `L154, L350, L494, L583, L731, L862, L908, L1184`, ajuster `CA-04`/`CA-05` `L575-L819`)
- Create: `8 - Livre 2027/outils/execute_g0.py` et `8 - Livre 2027/outils/test_execute_g0.py`

**Interfaces:**
- Consumes: `specs-volume-8/*.md`, `8 - Livre 2027/specs/{manifest.json, protocole-mlr-2027.json}`, `8 - Livre 2027/registre/*.json`, `8 - Trousse/**`
- Produces:
  - `execute_g0.run_g0(trousse_dir: Path, out_report: Path, book_dir: Path | None = None) -> int` (exécute `pytest`, `opa test --coverage`, contrôle syntaxique `default allow := false`, `jsonschema`, contrôle `requirements.lock` `SHA-256` et audit `SPDX MIT`, écrit `aq/rapports-g0.json`)
  - `verifie_manuscrit.check_manuscrit(root: Path, strict: bool = True) -> list[str]` (retourne `[]` si `CA-01`..`CA-11`, `CA-17`, `CA-20` `CA-G0-SYNC` passent)
  - `echantillon_aq.draw_stratified_sample(root: Path, seed: int, exclude_ids: set[str]) -> list[dict]` (`60` items : `4 × 15` strates dont `assertions_g0` ; `≥ 8` par unité narrative)
  - `genere_annexes.build_annexes(root: Path) -> dict[Path, str]` (écrit `Annexes A et B`)

- [ ] **Step 1: Écrire les tests unitaires échouants couvrant les adaptations Vol. 8 et `execute_g0.py`**

```python
def test_ca02_allows_tech_ids_and_rejects_raw_audit_markers(tmp_vol8):
    errors = check_manuscrit(tmp_vol8, strict=True)
    assert not any("EXIG-SEC-06" in e for e in errors)
    assert any("CA-02" in e and "[L+]" in e for e in errors)

def test_ca_g0_sync_rejects_drift_and_over_40_lines(tmp_vol8):
    errors = check_manuscrit(tmp_vol8, strict=True)
    assert any("CA-G0-SYNC" in e and ("40" in e or "SHA-256" in e) for e in errors)

def test_two_seeds_produce_disjoint_60_items_across_4_strata(populated_vol8):
    s1 = draw_stratified_sample(populated_vol8, seed=20270801, exclude_ids=set())
    s2 = draw_stratified_sample(populated_vol8, seed=20270802, exclude_ids={x["claim_loc"] for x in s1})
    assert len(s1) == 60 and len(s2) == 60
    assert {x["claim_loc"] for x in s1}.isdisjoint({x["claim_loc"] for x in s2})
    assert all(sum(1 for x in s1 if x["category"] == c) == 15 for c in ("empirique", "juridique", "spec_technique", "assertions_g0"))
    assert all(sum(1 for x in s1 if x["unit"] == u) >= 8 for u in ("00-liminaire", "ch01", "ch02", "ch03", "ch04"))

def test_execute_g0_rejects_rego_without_default_deny(tmp_trousse):
    rc = run_g0(tmp_trousse, tmp_trousse / "rapports-g0.json")
    assert rc != 0

def test_dollar_math_rejected_and_backslash_math_accepted(tmp_vol8):
    # Injecte chr(36) + "0{,}94" + chr(36) sans litteral non echappe dans le plan
    errors = check_manuscrit(tmp_vol8, strict=True)
    assert any("CA-06" in e for e in errors)
```

- [ ] **Step 2: Exécuter `pytest` pour vérifier l'échec initial**

Run: `pytest "8 - Livre 2027/outils/test_outillage_aq.py" "8 - Livre 2027/outils/test_execute_g0.py" -v`
Expected: FAIL (`ModuleNotFoundError` / échec des nouvelles assertions `CA-G0-SYNC`, `4` strates et `execute_g0`)

- [ ] **Step 3: Instancier `manifest.json` + `protocole-mlr-2027.json`, adapter les `13` outils et créer `execute_g0.py`**

Appliquer sans réécriture les adaptations exactes documentées dans `specs-volume-8/architecture-trousse-g0.md` (§ 5) sur les `13` fichiers copiés de `C:\Github\Agentique\7 - Livre 2027\outils\`, ajouter impérativement l'en-tête `# SPDX-License-Identifier: MIT` en tête de chacun de ces `13` scripts (absent des fichiers sources d'`Agentique` et exigé par l'étape 2 de `execute_g0.py`), créer `execute_g0.py` (signature `run_g0(trousse_dir: Path, out_report: Path, book_dir: Path | None = None) -> int`) et configurer `.gitignore` pour exclure toute source locale propriétaire non libre.

- [ ] **Step 4: Exécuter l'ensemble des suites `pytest` de l'outillage et `verifie_specs.py`**

Run: `pytest "8 - Livre 2027/outils" -v; python "8 - Livre 2027/outils/verifie_specs.py"`
Expected: PASS (`0` erreur)

- [ ] **Step 5: Commit du jalon Task 1**

```powershell
git add "8 - Livre 2027/specs" "8 - Livre 2027/outils" .gitignore
git commit -m "Adapter les 13 outils AQ de Vol. 7 et creer execute_g0.py pour le Volume 8"
```

---

### Task 2: Collecte ouverte `L+` `SHA-256`, import des `4` vecteurs tiers et constitution des `4` registres JSON SSOT + `5` bases fermées

**Files:**
- Create: `8 - Livre 2027/recherche/corpus_l_plus/*.txt`
- Create: `8 - Livre 2027/recherche/manifeste-sources-sha256.json`
- Create: `8 - Livre 2027/recherche/registre-statut-f.json`
- Create: `8 - Trousse/vectors/{rfc8785,nist_acvp,a2a_tck,owasp_src055}/` (vecteurs épinglés et condensats `SHA-256`)
- Create: `8 - Livre 2027/registre/{specifications-lplus.json, matrice-exig-prr-c40.json, concordance-taxonomies.json, ancres-chronologiques.json, faits-empiriques.json, glossaire-termes.json}`
- Create: `8 - Livre 2027/sources/ch00-sources.md` .. `ch04-sources.md`

**Interfaces:**
- Consumes: `8 - Livre 2027/specs/protocole-mlr-2027.json`, dépôts Git épinglés, API ouvertes `RFC`/`NIST`/`arXiv`/`EUR-Lex Cellar`/`OWASP SRC-055`, volumes `1`–`7` du dépôt (en lecture seule comme carte de repérage uniquement)
- Produces: textes bruts `.txt` UTF-8 hachés `SHA-256`, `4` registres JSON SSOT, registres hérités réancrés `statut_preuve: "l_plus"`, et `5` bases fermées `sources/ch00..ch04-sources.md` portant la date de gel `2 décembre 2026` (`2026-12-02`)

- [ ] **Step 1: Écrire les tests vérifiant l'arrêt `AO-01` sur `403`/`429`, l'épinglage Git `SHA-256` et l'exclusion de `genai.owasp.org`**

```python
def test_blocked_response_and_pinned_git_spec_sha256(mock_http_403, mock_git_raw, expected_sha256):
    blocked = fetch_open_source("https://genai.owasp.org/restricted", client=mock_http_403)
    assert blocked["status"] == "F" and blocked["included_in_evidence"] is False
    # Signature alignee sur architecture-trousse-g0.md : (repo_url, ref_or_commit, rel_path, expected_sha256, client=None)
    spec = fetch_pinned_git_spec(
        "https://github.com/modelcontextprotocol/specification",
        "2026-07-28",
        "schema/2026-07-28/schema.ts",
        expected_sha256,
        client=mock_git_raw,
    )
    assert spec["status"] == "L+" and len(spec["sha256"]) == 64
```

- [ ] **Step 2: Exécuter `pytest` sur le test de collecte pour vérifier l'échec initial avant complétion des connecteurs**

Run: `pytest "8 - Livre 2027/outils/test_collecte_mlr.py" -v`
Expected: FAIL sur les nouveaux cas d'épinglage Git si non encore alimentés, puis PASS après implémentation/paramétrage.

- [ ] **Step 3: Exécuter la collecte ouverte `L+`, importer les `4` suites de vecteurs tiers et bâtir les `4` registres JSON SSOT + `5` bases `sources/`**

1. Collecter et hacher `SHA-256` les sources ouvertes `L+` antérieures ou égales au `2 décembre 2026` : spécifications Git épinglées (`MCP 2026-07-28`, `SEP-2596`/`SEP-3398`, `A2A v1.0.1`, `OPA`, `OTel v1.41.0` & `semantic-conventions-genai` `85` attr. `Development`, `FOCUS v1.4`), `RFC` (`7493`, `7515`, `8693`, `8707`, `8785`, `9449`, `9943`, `9964` et *Internet-Drafts* qualifiés comme tels : `draft-ietf-oauth-transaction-tokens-11`, `draft-chen-oauth-agent-revocation-01`), `NIST` (`FIPS 204`, `FIPS 205`, `IR 8547 Final`), `arXiv` (`2503.18813v2` `CaMeL`, `Can CaMeLs Talk?`, `2606.12683`, études `pass^k`, `tests métamorphiques`), textes juridiques ouverts (`BSIF E-23`, `EU AI Act`, `LQ-2021-C25`, `QC-AMF-NOTE-2026.txt`), et `OWASP SRC-055 L+`. Consigner tout blocage (`lautorite.qc.ca`, `legisquebec.gouv.qc.ca`, `genai.owasp.org`, `ISO/IEC 42001`) dans `registre-statut-f.json`.
2. Importer les `4` jeux tiers officiels dans `8 - Trousse/vectors/` : `RFC 8785` Appendices A/B & `cyberphone/json-canonicalization`, `NIST FIPS 204/205 ACVP` (`usnistgov/ACVP-Server`), `a2aproject/a2a-tck` (`1.0.0.alpha3`) et `OWASP SRC-055`.
3. Constituer les `4` registres JSON SSOT (`specifications-lplus.json`, `matrice-exig-prr-c40.json`, `concordance-taxonomies.json`, structure initiale pour `aq/rapports-g0.json`) et les `5` dossiers fermés `sources/ch00-sources.md` à `sources/ch04-sources.md`.

- [ ] **Step 4: Valider `CA-09`, `CA-10` et `CA-11`**

Run: `pytest "8 - Livre 2027/outils/test_collecte_mlr.py" -v; python "8 - Livre 2027/outils/verifie_manuscrit.py" --sources-only`
Expected: PASS (`0 %` de `METADATA_ONLY`, `0` entrée `a_reancrer`, `100 %` `SHA-256` et seuils `RQ1`–`RQ6` atteints)

- [ ] **Step 5: Commit de la base documentaire `L+` et des vecteurs tiers**

```powershell
git add "8 - Livre 2027/recherche" "8 - Livre 2027/registre" "8 - Livre 2027/sources" "8 - Trousse/vectors"
git commit -m "Constituer le socle L+ SHA-256, les 4 registres JSON SSOT, les 5 bases sources et les 4 vecteurs tiers"
```

---

### Task 3: Développement TDD en double aveugle (`auteur-tests-oracle` puis `batisseur-code`) des `4` modules Python + `OPA/Rego` et validation `G0`

**Files:**
- Create (par `auteur-tests-oracle`, via `invoke_subagent`):
  - `8 - Trousse/schemas/*.schema.json` (`JSON Schema Draft 2020-12`, `strict: true`)
  - `8 - Trousse/tests/test_harness_proto.py`, `test_authz_pqc_audit.py`, `test_policy_saga.py`, `test_evalops_prr.py`, `test_third_party_vectors.py`, `policies_opa/*_test.rego`
- Create (par `batisseur-code` distinct, via `invoke_subagent`):
  - `8 - Trousse/pyproject.toml`, `8 - Trousse/requirements.lock` (empreintes `SHA-256`), `8 - Trousse/LICENSE` (`MIT`), `8 - Trousse/README.md` (avec bandeau `non-avis` & politique de gel)
  - `8 - Trousse/harness_proto/` (module `harness-proto/`)
  - `8 - Trousse/authz_pqc_audit/` (module `authz-pqc-audit/`)
  - `8 - Trousse/policy_saga/` (module `policy-saga/`)
  - `8 - Trousse/evalops_prr/` (module `evalops-prr/`)
  - `8 - Trousse/policies_opa/*.rego` (paquets `OPA/Rego` avec `default allow := false`)
- Create (sortie `G0`): `8 - Livre 2027/aq/rapports-g0.json`

**Interfaces:**
- Consumes: `specs-volume-8/architecture-trousse-g0.md`, `8 - Livre 2027/registre/*.json`, `8 - Trousse/vectors/**`
- Produces: trousse `8 - Trousse/` exécutable à `exit 0` sous Windows/Linux et rapport scellé `8 - Livre 2027/aq/rapports-g0.json` (incluant les condensats `SHA-256` des extraits `≤ 40` L exposables au manuel)

- [ ] **Step 1: Dépêcher l'agent isolé `auteur-tests-oracle` pour rédiger les schémas, tests `pytest` et tests `.rego` négatifs**

Couvrir obligatoirement :
1. `harness_proto` (`Ch. 01`) : pipeline harnais `80/20` en `8` étapes (`strict: true`, `AMBIGU_ESCALADE`), épinglage `JCS SHA-256` `MCP 2026-07-28`, rejet `HeaderMismatch`, adaptateurs `SEP-2596`/`SEP-3398`, validation `AgentCard A2A v1.0.1` (`JWS RFC 7515` / `a2a-tck`).
2. `authz_pqc_audit` (`Ch. 02`) : `OAuth 2.0 OBO RFC 8693/8707`, `DPoP RFC 9449`, rejet *token passthrough*, `SSF/CAEP` + `agent-revocation-01`, `CIBA I-JSON/JCS` (`EXIG-SEC-25`), calculateur exact d'en-têtes `HTTP 431` `O(sauts)` vs `O(1)` (`ML-DSA-65/87` `RFC 9964` et *Transaction Tokens -11*), mappage `OTel v1.41.0 ↔ semantic-conventions-genai` (`85` attr., `cache_write`) + PII `FR/EN`, chaîne `JCS`/`SCITT RFC 9943`/`SLH-DSA FIPS 205`, extension carbone `FOCUS v1.4` (`CAP-046`).
3. `policy_saga` (`Ch. 03`) : paquets `OPA/Rego` avec `default allow := false` et `100 %` de couverture négative (Règle de deux `EXIG-SEC-06`, contamination `CaMeL`), manifestes d'isolation sans KVM (`network: none`, blocage `IMDS`), arithmétique `Decimal` vs `IEEE-754`, Saga `idem-v1` + `Transactional Outbox` + `EXIG-ORC-28` + `10` scénarios déterministes d'injection de fautes (`EXIG-ORC-20`).
4. `evalops_prr` (`Ch. 04`) : banc hermétique `mock MCP servers` (`pass^k`), borne de Wilson `95 % < p` vérifiant `≥ 3/p` essais indépendants sans échec (`EXIG-EVA-03`), relations métamorphiques sans oracle sur `≥ 100` scénarios bilingues, validateurs des `24 [BLOQUANT] PRR` + `2027-B001` + `5 SBB` + `C01–C40`.
Sceller les empreintes `SHA-256` des fichiers d'oracle avant la phase de construction.

- [ ] **Step 2: Exécuter `execute_g0.py` avant implémentation pour confirmer l'échec TDD initial**

Run: `python "8 - Livre 2027/outils/execute_g0.py"`
Expected: FAIL (`exit != 0`, tests rouges sur les `4` modules et paquets `.rego`)

- [ ] **Step 3: Dépêcher l'agent isolé `batisseur-code` pour implémenter les `4` modules Python, les règles `OPA/Rego` et `requirements.lock`**

L'agent `batisseur-code` travaille en lecture seule sur `8 - Trousse/tests/` et `8 - Trousse/vectors/`, implémente les `4` modules et les paquets `.rego` avec `default allow := false`, fige les dépendances dans `requirements.lock` avec `SHA-256` et vérifie la compatibilité `SPDX MIT`.

- [ ] **Step 4: Valider la barrière `G0` complète (`CA-19`)**

Run: `python "8 - Livre 2027/outils/execute_g0.py"`
Expected: PASS (`exit 0`, `100 %` `pytest`, `opa test --coverage 100 %`, `default allow := false`, `4/4` suites tiers, `SPDX MIT` sain, `8 - Livre 2027/aq/rapports-g0.json` généré)

- [ ] **Step 5: Commit du jalon `G0`**

```powershell
git add "8 - Trousse" "8 - Livre 2027/aq/rapports-g0.json"
git commit -m "Livrer 8 - Trousse/ (4 modules Python, OPA/Rego, 4 vecteurs tiers) valide G0"
```

---

### Task 4: Génération et compilation stricte des `9` figures (`Fig-00` à `Fig-08`)

**Files:**
- Create: `8 - Livre 2027/diagrammes/Fig-00.puml` .. `Fig-08.puml` / `.mmd` (`7` `.puml` : `Fig-00`, `Fig-01`, `Fig-02`, `Fig-03`, `Fig-05`, `Fig-06`, `Fig-07` ; `2` `.mmd` : `Fig-04`, `Fig-08`)
- Create: `8 - Livre 2027/diagrammes/rendus/Fig-00.svg` .. `Fig-08.png`

**Interfaces:**
- Consumes: `8 - Livre 2027/specs/manifest.json` (`figures`), `specs-volume-8/charte-editoriale.md` (`10–14` nœuds max, trait plein déterministe vs pointillé probabiliste, libellés en français canadien)
- Produces: `9` rendus vectoriels et matriciels haute résolution (`7` `.svg` et `2` `.png 300 DPI`)

- [ ] **Step 1: Écrire un test unitaire vérifiant que le compilateur rejette toute figure à `> 14` nœuds ou sans rendu `300 DPI`**

```python
def test_compile_figures_rejects_over_14_nodes_in_vol8(tmp_vol8_figs):
    errors = compile_figures(tmp_vol8_figs, strict=True, check_only=True)
    assert any("14" in e or "noeuds" in e.lower() for e in errors)
```

- [ ] **Step 2: Rédiger les `9` sources (`Fig-00` à `Fig-08`) et exécuter `compile_figures.py --strict`**

Appliquer `-failfast2` pour les `7` schémas `PlantUML` (`.svg`) et `300 DPI` pour les `2` diagrammes `Mermaid` (`Fig-04.mmd` au Ch. 02 et `Fig-08.mmd` au Ch. 04, `.png`).

Run: `pytest "8 - Livre 2027/outils/test_compile_figures.py" -v; python "8 - Livre 2027/outils/compile_figures.py" --strict`
Expected: PASS (`9/9` figures générées sans avertissement, chacune `≤ 14` nœuds, `CA-08` conforme)

- [ ] **Step 3: Commit des figures**

```powershell
git add "8 - Livre 2027/diagrammes"
git commit -m "Produire et compiler les 9 figures vectorielles et Mermaid 300 DPI du Volume 8"
```

---

### Task 5: Rédaction cloisonnée des `5` unités narratives (`00-liminaire` + `Ch. 01` à `04`), injection `≤ 40` L et passage `G0` + `G1`

**Files:**
- Create: `8 - Livre 2027/manuscrit/00 - Liminaire.md` (`3 500` mots ± 8 %)
- Create: `8 - Livre 2027/manuscrit/01 - Partie I/Chapitre 01 - Harnais deterministe et mediation protocolaire.md` (`8 000` mots ± 8 %)
- Create: `8 - Livre 2027/manuscrit/01 - Partie I/Chapitre 02 - Identite non humaine, PQC et double couloir.md` (`8 500` mots ± 8 %)
- Create: `8 - Livre 2027/manuscrit/02 - Partie II/Chapitre 03 - Politiques OPA hors modele et Sagas.md` (`8 000` mots ± 8 %)
- Create: `8 - Livre 2027/manuscrit/02 - Partie II/Chapitre 04 - Banc EvalOps hermetique et 24 portes PRR.md` (`7 000` mots ± 8 %)
- Create (jet initial): `8 - Livre 2027/manuscrit/03 - Annexes/Annexe A ... .md`, `Annexe B ... .md` (chemins exacts de `manifest.json`)

**Interfaces:**
- Consumes: `specs-volume-8/{prd.md, toc.md, charte-editoriale.md}`, `8 - Livre 2027/specs/manifest.json`, `registre/*.json`, `sources/ch00..ch04-sources.md`, `diagrammes/rendus/*`, `8 - Trousse/**`, `aq/rapports-g0.json`
- Produces: `5` fichiers Markdown narratifs totalisant `35 000` mots ± 8 % (avec extraits de contrats `≤ 40` L injectés mécaniquement depuis `8 - Trousse/`) + premier jet des Annexes `A`–`B` (`3 000` mots ± 8 %)

- [ ] **Step 1: Rédiger les `5` unités narratives en parallèle via `invoke_subagent` (fichiers disjoints)**

Chaque agent rédacteur reçoit exclusivement : son contrat d'unité dans `toc.md` et `manifest.json` (`owned_concepts` vs renvois), `charte-editoriale.md`, `registre/*.json`, sa base fermée `sources/chNN-sources.md`, ses figures assignées et les extraits scellés `≤ 40` L de `8 - Trousse/` issus de `aq/rapports-g0.json`. Interdiction absolue d'écrire un bloc de code à la main ; bandeau `non-avis` (`AO-05`) et gel `2 décembre 2026` respectés ; aucun symbole dollar non échappé (`CA-06`).

- [ ] **Step 2: Générer une première version des Annexes `A`–`B` et valider `G0` + `G1` (`CA-G0-SYNC`)**

Run: `python "8 - Livre 2027/outils/execute_g0.py"; python "8 - Livre 2027/outils/genere_annexes.py"; python "8 - Livre 2027/outils/verifie_manuscrit.py" --strict`
Expected: PASS (`exit 0` sur `CA-01` à `CA-11`, `CA-17`, `CA-19`, `CA-20` `CA-G0-SYNC`)

- [ ] **Step 3: Commit du premier jet conforme `G0` + `G1`**

```powershell
git add "8 - Livre 2027/manuscrit"
git commit -m "Livrer le premier jet complet du Volume 8 (Liminaire, Ch. 01-04, Annexes A-B) conforme G0 et G1"
```

---

### Task 6: Exécution étanche de `G2` (`5` auditeurs Wyvern), `G3` passe 1 (`seed=20270801`) et `G4` (`gauntlet-loop`)

**Files:**
- Create: `8 - Livre 2027/ancrage/ch00-ancrage.md` .. `ch04-ancrage.md`
- Create: `8 - Livre 2027/aq/recollation-seed-20270801.json` et `aq/recollation-seed-20270801.md`
- Create: `8 - Livre 2027/aq/gauntlet-log.md`
- Modify: `8 - Livre 2027/manuscrit/**` (rectifications d'ancrage, de recollation et d'écriture, en conservant `CA-G0-SYNC`)

**Interfaces:**
- Consumes: `specs-volume-8/contrat-aq.md`, `manuscrit/**`, `sources/**`, `recherche/corpus_l_plus/**`, `aq/rapports-g0.json`
- Produces: journaux `ancrage/` et `aq/` validant `CA-12`, `CA-13` (`60/60`) et `CA-15`

- [ ] **Step 1: Exécuter `G2` — Ancrage atomique Wyvern par `5` sous-agents `auditeur-wyvern` neufs (`invoke_subagent`)**

Chaque auditeur décompose chaque paragraphe en *claims* atomiques, vérifie contre `sources/ch00..ch04-sources.md`, `corpus_l_plus/*.txt` et `rapports-g0.json`, rectifie tout énoncé `imprécis`, supprime ou réancre tout énoncé `non supporté`, et consigne l'intégralité du journal dans `ancrage/ch00..ch04-ancrage.md` (publié ensuite en **Annexe A**).

- [ ] **Step 2: Exécuter `G3` passe 1 (`seed=20270801`, `4` strates × `15` items, `≥ 8`/unité narrative)**

Run: `python "8 - Livre 2027/outils/echantillon_aq.py" --seed 20270801 -o "8 - Livre 2027/aq/recollation-seed-20270801.json"`
Dépêcher un agent `recollateur-1` neuf sur les `.txt` bruts `L+` et `aq/rapports-g0.json` ; rectifier tout écart et revérifier jusqu'à `60/60` (`CA-13`).

- [ ] **Step 3: Exécuter `G4` — Boucle `gauntlet-loop` A/B à l'aveugle sur les `5` unités narratives (`invoke_subagent`, jamais `swarm`)**

Présenter en aveugle (`Texte A` / `Texte B`, ordre alterné) chaque unité face aux extraits étalons français de `3 - Compendium 2027.md` (`0.1`–`0.2`, `48.4`, `48.8`) à des sous-agents `critique` neufs jusqu'à victoire A/B, gains marginaux sur `2` tours consécutifs ou plafond budgétaire (`15 %` de la session). Consigner chaque tour dans `aq/gauntlet-log.md` et **rejouer obligatoirement `execute_g0.py` + `verifie_manuscrit.py --strict` + `G2` différentiel** sur tout passage retouché.

- [ ] **Step 4: Revalider `G0` et `G1` intégralement puis commiter les preuves `G2`, `G3` passe 1 et `G4`**

Run: `python "8 - Livre 2027/outils/execute_g0.py"; python "8 - Livre 2027/outils/verifie_manuscrit.py" --strict`
Expected: PASS (`0` erreur)

```powershell
git add "8 - Livre 2027/manuscrit" "8 - Livre 2027/ancrage" "8 - Livre 2027/aq"
git commit -m "Valider les barrieres G2 (Wyvern), G3 passe 1 (seed 20270801) et G4 (gauntlet-loop)"
```

---

### Task 7: Lissage `G5`, recollation à froid `G3` passe 2 (`seed=20270802`), régénération Annexes `A`–`B`, compilation triple et inspection visuelle `100 %`

**Files:**
- Create: `8 - Livre 2027/aq/recollation-seed-20270802.json` et `aq/recollation-seed-20270802.md`
- Create: `8 - Livre 2027/aq/rapport-lissage-et-visuel.md`
- Update (régénération SSOT): `8 - Livre 2027/manuscrit/03 - Annexes/Annexe A ... .md`, `Annexe B ... .md`
- Create: `8 - Livre.md`, `8 - Livre.pdf` (à la racine du dépôt), `8 - Livre 2027/livrables/8 - Livre 2027.html`

**Interfaces:**
- Consumes: `manuscrit/**`, `registre/**`, `ancrage/**`, `aq/**`, `diagrammes/rendus/**`, `8 - Trousse/**`
- Produces: éditions intégrales `.md`, `.html` autonome et `.pdf` (`Typst 6,14 × 9,21 po`) inspectées visuellement à `100 %` (`CA-14`, `CA-16` à `CA-18`)

- [ ] **Step 1: Exécuter le lissage transversal `G5` par un agent `lisseur-editorial` neuf (`CA-16`)**

Harmoniser les transitions inter-unités et éliminer toute redite en violation d'`owned_concepts`, puis exécuter le contrôle obligatoire **`execute_g0.py` + `verifie_manuscrit.py --strict` + `G2` différentiel** sur le `git diff`.

- [ ] **Step 2: Exécuter `G3` passe 2 à froid sur le texte et le code finaux (`seed=20270802`, `CA-14`)**

Run: `python "8 - Livre 2027/outils/echantillon_aq.py" --seed 20270802 --exclude "8 - Livre 2027/aq/recollation-seed-20270801.json" -o "8 - Livre 2027/aq/recollation-seed-20270802.json"`
Dépêcher un agent `recollateur-2` neuf (distinct de `recollateur-1`).
Expected: `≥ 57/60` (`95 %`) avant correction et `60/60` (`100 %`) après ; sinon retour des unités fautives en `G2` (et `G0` si erreur logicielle), suivi d'un retirage disjoint à graine `20270803`.

- [ ] **Step 3: Régénérer les Annexes `A`–`B` (`3 000` mots, `CA-17`) et compiler les éditions `.md`, `.html` et `.pdf` (`CA-18`)**

Run: `python "8 - Livre 2027/outils/genere_annexes.py"; python "8 - Livre 2027/outils/assemble_livre.py" --all`
Expected: Génération sans erreur de `8 - Livre.md`, `8 - Livre 2027/livrables/8 - Livre 2027.html` (`Pandoc -f markdown-tex_math_dollars+tex_math_single_backslash --embed-resources`) et `8 - Livre.pdf` (`Typst 6,14 × 9,21 po`, `10,6 pt`, extraits `≤ 40` L stylés).

- [ ] **Step 4: Inspecter visuellement `100 %` des pages rendues et exécuter la validation finale bloquante (`CA-18`)**

Convertir le PDF en captures PNG page par page, inspecter chaque page (`100 %`) dans `8 - Livre 2027/aq/rapport-lissage-et-visuel.md` (tableaux, figures, blocs de code `≤ 40` L, formules `\(...\)`, montants `\$`, coupures, liens cliquables), corriger tout défaut de mise en page, puis relancer l'intégralité de `G0` et `G1` :

Run: `python "8 - Livre 2027/outils/execute_g0.py"; python "8 - Livre 2027/outils/verifie_manuscrit.py" --strict --check-deliverables`
Expected: PASS (`CA-01` à `CA-20` validés à `100 %`, `0` erreur)

- [ ] **Step 5: Commit final et livraison**

```powershell
git add "8 - Livre 2027" "8 - Livre.md" "8 - Livre.pdf"
git commit -m "Livrer le Volume 8 (MD, HTML autonome, PDF Typst) et 8 - Trousse/ valides G0-G5"
```
