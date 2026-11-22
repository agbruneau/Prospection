# Journal de validation des spécifications — Volume 8 (`v1.0` → `v1.1`, 22 novembre 2026)

Revue indépendante intégrale du dossier [`specs-volume-8/`](README.md) : [`prd.md`](prd.md), [`charte-editoriale.md`](charte-editoriale.md), [`toc.md`](toc.md), [`architecture-trousse-g0.md`](architecture-trousse-g0.md), [`contrat-aq.md`](contrat-aq.md), [`plan-production-aq.md`](plan-production-aq.md) et [`prompt-lancement.md`](prompt-lancement.md). **Régime : Production.**

- **Ouvrage spécifié :** *Ingénierie exécutable de l'entreprise agentique* — *Manuel de spécifications testables, harnais 80/20, médiation MCP/A2A, délégation bornée, politiques OPA hors modèle, sémantique d'effet Saga et suite EvalOps vérifiable (non-avis)*
- **Crédit d'auteur :** **André-Guy Bruneau, M.Sc IT** · **Date de gel des faits :** `2 décembre 2026` (`2026-12-02`) · **Parution visée :** `janvier 2027`
- **Licences :** `CC BY 4.0` (manuel `6,14 × 9,21 po` et figures `Fig-00` à `Fig-08`) · `MIT` (`8 - Trousse/` et outillage `outils/`)
- **Source de vérité arbitrée :** [`../RECOMMANDATION-FINALE.md`](../RECOMMANDATION-FINALE.md) (§ 4, lauréat `A'` MVP strict + `OPA / Rego` unique) et [`../recommandation-finale/propositions-A-B-revisees.md`](../recommandation-finale/propositions-A-B-revisees.md) (§ 1).

---

## 1. Constats bloquants et de cohérence corrigés (passe 1 → passe 2)

En passe 1, `toc.md`, `prd.md`, `contrat-aq.md` et `prompt-lancement.md` présentaient déjà `0` écart structurel ; `6` écarts précis (bloquants ou de cohérence inter-documents) ont été relevés et corrigés par les trois auteurs concernés :

| # | Constat vérifié (passe 1) | Document(s) | Correction appliquée et vérifiée (passe 2) |
|---|---|---|---|
| **V1** | **Constantes canoniques incomplètes** : le sous-titre exact et la parution `janvier 2027` ne figuraient pas dans l'en-tête/préambule de la charte (`janvier 2027` n'y apparaissait qu'à travers l'échéance `12 janvier 2027` en § 1.4) | `charte-editoriale.md` | Préambule complété au caractère près avec le sous-titre canonique et la mention explicite `parution visée : janvier 2027` |
| **V2** | **Portée des extraits au liminaire (`AO-08` / `CA-20`)** : le tableau § 3.4 L107 indiquait `0 bloc libre (≤ 40 L si extrait référencé)`, alors que `prd.md` (`AO-08`) et `architecture-trousse-g0.md` (§ 2.5 et schéma `RapportsG0Output` `"enum": ["ch01", "ch02", "ch03", "ch04"]`) réservent les extraits clôturés aux `Ch. 01`–`04` | `charte-editoriale.md` | Cellule L107 alignée sur `0 bloc (extraits ≤ 40 L réservés aux Ch. 01 à 04)` |
| **V3** | **Regex JSON Schema non bornées (`§ 4.1`)** : les `7` propriétés `"pattern"` (`source_l_plus_id`, `sha256` × 4, `discordance_id`, `lines`) omettaient l'ancre de fin pour éviter tout symbole dollar non échappé, acceptant ainsi des chaînes hexadécimales de `65+` caractères ou des suffixes invalides | `architecture-trousse-g0.md` | Ancre de fin échappée `\$` ajoutée aux `7` regex (`^SRC-\d{3}\$`, `^[0-9a-f]{64}\$`, `^DISC-0[1-5]\$`, `^\d+-\d+\$`) + `"minLength": 64, "maxLength": 64` sur les condensats `SHA-256`, avec explication typographique L120 et L394 |
| **V4** | **Liens d'images cassés potentiels sur livrables (`CA-18`)** : `Prospection/` stocke ses livres consolidés à la racine sans dossier `0 - PDF-MD/`, et `plan-production-aq.md` L350 commite `8 - Livre.md` / `8 - Livre.pdf` à la racine, alors que `architecture-trousse-g0.md` L673 prescrivait `image_prefix = "../8 - Livre 2027/diagrammes/rendus"` (qui pointerait hors du dépôt depuis la racine) | `architecture-trousse-g0.md`, `plan-production-aq.md` | Livrables consolidés fixés sans ambiguïté à la racine du dépôt (`8 - Livre.md`, `8 - Livre.pdf`), et `image_prefix` rectifié à `8 - Livre 2027/diagrammes/rendus` (L672) |
| **V5** | **En-têtes `SPDX MIT` absents de l'outillage source d'`Agentique`** : aucun des `.py` de `Agentique\7 - Livre 2027\outils\` ne porte `# SPDX-License-Identifier: MIT`, alors que `execute_g0.py` impose ce contrôle sur 100 % des `.py` de `8 - Trousse/` et `8 - Livre 2027/outils/` (`G0`) | `architecture-trousse-g0.md`, `plan-production-aq.md` | Ajout explicite de l'apposition de `# SPDX-License-Identifier: MIT` sur les `13` outils adaptés dès la Task 1 (Step 3) et en § 5.1 (`L661`) |
| **V6** | **Signatures Python et visibilité des sigles `G0–G5`** : `plan-production-aq.md` omettait `book_dir: Path | None = None` sur `run_g0` et appelait `fetch_pinned_git_spec` avec `tag=` au lieu de `(repo_url, ref_or_commit, rel_path, expected_sha256)` ; `architecture-trousse-g0.md` § 5.1 ne nommait pas explicitement `G1`/`G3`/`G4` | `plan-production-aq.md`, `architecture-trousse-g0.md`, `prompt-lancement.md` | Signatures alignées entre Task 1/2 et `architecture-trousse-g0.md` ; sigles `G0–G5` explicités en § 5.1 ; `README.md` ajouté à la liste de lecture de `prompt-lancement.md` |

---

## 2. Synthèse des contrôles mécaniques et éditoriaux (passe 2)

Vérification exécutée après les corrections finales par script Python en lecture seule inspiré de `C:\Github\Agentique\7 - Livre 2027\outils\verifie_specs.py` et par inspection directe des fichiers sources de `Prospection` et `Agentique`.

| Axe | Contrôles vérifiés (`[Vérifié par exécution]` & lecture directe) | Résultat |
|---|---| :---: |
| **(1) Intégrité UTF-8 et présence** | `9 / 9` fichiers présents dans `specs-volume-8/` (`prd.md`, `charte-editoriale.md`, `toc.md`, `architecture-trousse-g0.md`, `contrat-aq.md`, `plan-production-aq.md`, `prompt-lancement.md`, `validation-specs.md`, `README.md`) ; UTF-8 strict sans BOM ni `\ufffd` | **PASS** |
| **(2) Constantes canoniques et hygiène `CA-06`** | Reproduction identique du titre, du sous-titre, du crédit **`André-Guy Bruneau, M.Sc IT`**, de la date de gel **`2 décembre 2026`** (`2026-12-02`), de la parution **`janvier 2027`** et des licences **`CC BY 4.0` / `MIT`** dans les `9` fichiers ; **`0`** occurrence de l'ancienne date de gel rejetée par `verifie_specs.py L64` (`fin décembre 2026` hors `2 décembre 2026`) ; **`0`** symbole dollar non échappé (`CA-06`, regex négative) ; délimiteurs `\(...\)` et `\[...\]` équilibrés | **PASS** |
| **(3) Concordance `toc.md` & budgets `± 8 %`** | Budgets exacts (`3 500 + 8 000 + 8 500 + 8 000 + 7 000 = 35 000` narratifs ; `1 500 + 1 500 = 3 000` annexes ; **`38 000`** total) ; plages `ceil`/`floor` (`3 220–3 780`, `7 360–8 640`, `7 820–9 180`, `7 360–8 640`, `6 440–7 560`, `1 380–1 620`, total `34 960–41 040`) ; intitulés concordants des `2` Parties et `7` unités ; `22` sous-sections (`0.1`..`0.6`, `1.1`..`4.4`) ; `5` Questions directrices ; `5` blocs *Propriétaire exclusif* étanches ; `9` figures ordonnées `Fig-00`..`Fig-08` (`7` PlantUML `.svg -failfast2` + `2` Mermaid `.png 300 DPI`, `≤ 14` nœuds) | **PASS** |
| **(4) Contrats `A'` (`8 - Trousse/`, `G0–G5`, vecteurs, outils)** | `AO-01`..`AO-08` et `CA-01`..`CA-20` (dont `CA-19` `G0` et `CA-20` `CA-G0-SYNC ≤ 40 L`) complets ; ordre `G0 -> G1 -> G2 -> G3 (20270801) -> G4 -> G5 lissage -> G3 (20270802) -> G5 rendu/visuel` cohérent ; `4 × 15 = 60` items (`≥ 8`/unité) ; `4` modules Python (`harness-proto/`, `authz-pqc-audit/`, `policy-saga/`, `evalops-prr/`) ; moteur unique `OPA / Rego` (`default allow := false` + `opa test --coverage 100 %`) sans `Rust`/`Go`/`Firecracker`/KVM/`PostgreSQL`/`OpenFGA`/`Cedar` en `G0` ; `4` suites tiers (`RFC 8785`, `NIST FIPS 204/205 ACVP`, `a2aproject/a2a-tck 1.0.0.alpha3`, `OWASP SRC-055 L+`) ; `4` schémas JSON SSOT syntaxiquement valides (`json.loads` après déséchappement `\$`) ; `14` extraits `CA-G0-SYNC` catalogués | **PASS** |
| **(4b) Vérification réelle des repères `Agentique` et `Prospection`** | Décompte vérifié sur disque dans `Agentique\7 - Livre 2027\outils\` : **`13` fichiers / `7 897` lignes** exactes (`_mask_fenced_code_preserving_lines` confirmée en `L117` avec `8` appels en `L154, L350, L494, L583, L731, L862, L908, L1184` de `verifie_manuscrit.py`, signatures `compile_figures`, `echantillon_aq`, `genere_annexes`, `assemble_livre`, `collecte_mlr_ouverte` vérifiées ligne par ligne) ; ancres corpus vérifiées (`24 [BLOQUANT] PRR` `C27 L28464-L28557`, `5 SBB` `CAD26 L1360-L1361`, hash `C.6` `92be4083...` `CAD26 L7310`, `EXIG-ORC-20` `CAD26 L3142-L3146`, étalons `3 - Compendium 2027.md` `0.1`, `0.2`, `48.4`, `48.8`) | **PASS** |
| **(5) Intégrité du dépôt Git antérieur** | `git -C C:\Github\Prospection\Prospection diff --name-only` = sortie vide (`0` fichier antérieur modifié ; seul le nouveau dossier `specs-volume-8/` est ajouté) | **PASS** |

---

## 3. Verdict

`0` écart bloquant ou mineur subsiste sur les `9` fichiers de `specs-volume-8/`. Le dossier de spécifications amont du Volume 8 est prêt pour le lancement de la production dans une nouvelle session via [`prompt-lancement.md`](prompt-lancement.md).
