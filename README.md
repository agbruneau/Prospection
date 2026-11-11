# Compendium 2027 — Interopérabilité et Orchestration en Entreprise Agentique

Dépôt éditorial et chaîne de compilation du compendium de référence **« Interopérabilité et Orchestration en Entreprise Agentique »** (cible : **500 pages**, format livre Royal 170 × 240 mm, édition 2027).

## Architecture du dépôt

* [`PLAN_DIRECTEUR.md`](PLAN_DIRECTEUR.md) — Cartographie thématique exhaustive (8 parties, 25 chapitres, 3 annexes) et budget de pagination sur 500 pages.
* [`CHARTE_ET_FIL_ROUGE.md`](CHARTE_ET_FIL_ROUGE.md) — Structure canonique « Hybride exigeant », conventions linguistiques (`fr-CA`) et dossier d'architecture de l'entreprise fil rouge (**Groupe Boréal Inc.**).
* [`metadata.yaml`](metadata.yaml) — Métadonnées éditoriales globales Pandoc.
* [`manuscrit/`](manuscrit/) — Sources Markdown modulaires organisées par parties et chapitres, accompagnées des figures vectorielles SVG dans [`manuscrit/figures/`](manuscrit/figures/).
* [`build/`](build/) — Filtre Lua (`compendium.lua`), gabarit d'édition Typst (`compendium-lib.typ`, `compendium-pandoc.typ`), feuille de style HTML5 (`compendium.css`), validation pré-compilation (`validate_manuscript.py`) et contrôle de pagination (`check_pagination.py`).

## Compilation (PDF livre & HTML5 autonome)

Prérequis vérifiés sur le poste : `pandoc` (≥ 3.x), `typst` (≥ 0.15) et `python` (≥ 3.10).

```powershell
# Valider l'intégrité XML SVG, les blocs Pandoc et l'absence de squelettes
python ./build/scripts/validate_manuscript.py

# Compiler le volume étalon (Ouverture + Partie I / Chapitre 1)
pwsh ./build.ps1 -Target Etalon

# Compiler l'édition intégrale (8 parties, 25 chapitres et 3 annexes)
pwsh ./build.ps1 -Target Complet
```

Les livrables sont générés dans `dist/` (`compendium-2027-complet.pdf`, `compendium-2027-complet.html`, `compendium-2027-etalon.pdf`, `compendium-2027-etalon.html` et `build-report.json`).
