# Spécifications du Volume 8 — *Ingénierie exécutable de l'entreprise agentique*

- **Ouvrage :** *Ingénierie exécutable de l'entreprise agentique* — *Manuel de spécifications testables, harnais 80/20, médiation MCP/A2A, délégation bornée, politiques OPA hors modèle, sémantique d'effet Saga et suite EvalOps vérifiable (non-avis)*
- **Auteur du cahier des charges :** **André-Guy Bruneau, M.Sc IT** (production et assurance qualité 100 % agentiques en six barrières `G0`–`G5`)
- **Calendrier :** date de gel des faits arrêtée au **2 décembre 2026** (`2026-12-02`) · **parution visée : janvier 2027** (toutes échéances `2027+` formulées au futur)
- **Licences :** **`CC BY 4.0`** (manuel imprimé `6,14 × 9,21 po` et `9` figures `Fig-00` à `Fig-08`) · **`MIT`** (dépôt compagnon exécutable `8 - Trousse/` et outillage `outils/`)
- **Décision d'architecture :** lauréat **`A'` (MVP strict + moteur unique `OPA / Rego`)** issu de [`../RECOMMANDATION-FINALE.md`](../RECOMMANDATION-FINALE.md) (§ 4) et [`../recommandation-finale/propositions-A-B-revisees.md`](../recommandation-finale/propositions-A-B-revisees.md) (§ 1)

---

## Index des 9 fichiers de spécification (`specs-volume-8/`)

| # | Fichier | Rôle normatif dans le pipeline `G0–G5` | Rédaction / Propriété |
| :---: | --- | --- | --- |
| 1 | [`README.md`](README.md) | Index synthétique des `9` documents de spécification et cadrage rapide du Volume 8 | `@verif-specs` |
| 2 | [`prd.md`](prd.md) | Cahier des charges (`8` sections) : thèse falsifiable, `4` segments de lectorat, périmètre `DC-01` / `DC-P12`, `AO-01`..`AO-08`, budgets `38 000` mots `± 8 %`, vigilances et `CA-01`..`CA-20` | `@spec-prd-charte` |
| 3 | [`charte-editoriale.md`](charte-editoriale.md) | Voix en français canadien, `4` registres épistémiques, structure des `5` unités narratives, règle d'extraits `≤ 40` L (`CA-G0-SYNC`), liste noire `CA-02`, plafonds `CA-05` et conventions `CA-06` / `CA-08` | `@spec-prd-charte` |
| 4 | [`toc.md`](toc.md) | Table des matières contractuelle : vue synoptique (`38 000` mots, `7` unités, `9` figures), `5` Questions directrices, `22` sous-sections (`0.1`–`0.6`, `1.1`–`4.4`) et `5` périmètres *Propriétaire exclusif* sans collision | `@spec-toc` |
| 5 | [`architecture-trousse-g0.md`](architecture-trousse-g0.md) | Spécification logicielle de `8 - Trousse/` (`4` modules Python `3.12+`, paquets `OPA / Rego` à `default allow := false` et couverture négative `100 %`), `4` suites tiers, `4` schémas SSOT, `14` extraits `CA-G0-SYNC`, adaptation des `13` outils (`7 897` L) de `Agentique\7 - Livre 2027\outils` et nouveau script `execute_g0.py` | `@spec-trousse` |
| 6 | [`contrat-aq.md`](contrat-aq.md) | Protocole d'assurance qualité étanche en `6` barrières (`G0` → `G1` → `G2` → `G3` `seed=20270801` → `G4` + diff → `G5` lissage + diff → `G3` `seed=20270802` → `G5` annexes/rendu/visuel) couvrant `CA-01`..`CA-20` | `@spec-aq-plan` |
| 7 | [`plan-production-aq.md`](plan-production-aq.md) | Plan d'exécution séquentiel en `7` tâches (`Tasks 1` à `7`), signatures, cas de tests `pytest` initiaux, commandes et jalons Git | `@spec-aq-plan` |
| 8 | [`prompt-lancement.md`](prompt-lancement.md) | Prompt prêt à coller pour lancer la production intégrale sous `/goal` et `invoke_subagent` dans une nouvelle session | `@spec-aq-plan` |
| 9 | [`validation-specs.md`](validation-specs.md) | Journal de validation indépendante attestant `0` écart mécanique et éditorial sur l'ensemble du dossier | `@verif-specs` |

---

## Gabarit synthétique du Volume 8

| Volet | Architecture cible validée |
| --- | --- |
| **Manuel (`8 - Livre 2027/`)** | **`38 000` mots `± 8 %`** (`34 960–41 040` mots) : `00` Liminaire (`3 500`, `3 220–3 780`), Partie I (`Ch. 01` `8 000` [`7 360–8 640`] + `Ch. 02` `8 500` [`7 820–9 180`]), Partie II (`Ch. 03` `8 000` [`7 360–8 640`] + `Ch. 04` `7 000` [`6 440–7 560`]), Annexes SSOT A & B (`1 500` + `1 500`, [`1 380–1 620`] chacune). |
| **Iconographie & code en prose** | **`9` figures** (`Fig-00`..`Fig-08` : `7` `PlantUML .svg -failfast2` + `2` `Mermaid .png 300 DPI` [`Fig-04`, `Fig-08`], `≤ 14` nœuds) ; **`14` extraits `≤ 40` L** prélevés mécaniquement depuis `8 - Trousse/` et scellés par `SHA-256` (`CA-G0-SYNC` / `CA-20`). |
| **Dépôt compagnon (`8 - Trousse/`)** | `4` modules `Python 3.12+` (`harness-proto/`, `authz-pqc-audit/`, `policy-saga/`, `evalops-prr/`) + `OPA / Rego` unique (`default allow := false`, `100 %` couv. négative) + `4` suites tiers (`RFC 8785`, `NIST FIPS 204/205 ACVP`, `a2aproject/a2a-tck 1.0.0.alpha3`, `OWASP SRC-055 L+`), portable Windows/Linux sous `requirements.lock` `SHA-256` et audit `SPDX MIT` (`non-avis` `AO-05` / `DC-P12`). |
| **Livrables finaux** | `8 - Livre.md` et `8 - Livre.pdf` (`Typst 6,14 × 9,21 po`, `10,6 pt`) à la racine du dépôt, `8 - Livre 2027/livrables/8 - Livre 2027.html` autonome (`Pandoc -f markdown-tex_math_dollars+tex_math_single_backslash --embed-resources`) et dépôt compagnon `8 - Trousse/` validé `G0 exit 0`. |

## Lancement de la production

Ouvrir une **nouvelle session** dans `C:\Github\Prospection\Prospection`, activer `/goal`, puis coller le bloc de [`prompt-lancement.md`](prompt-lancement.md).
