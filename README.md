# Compendium 2027 — Interopérabilité et Orchestration en Entreprise Agentique

Dépôt éditorial et chaîne de compilation du compendium de référence **« Interopérabilité et Orchestration en Entreprise Agentique »** (**500 pages numérotées**, format livre Royal 170 × 240 mm, édition 2027).

## Architecture du dépôt

* [`PLAN_DIRECTEUR.md`](PLAN_DIRECTEUR.md) — Cartographie thématique exhaustive (8 parties, 25 chapitres, 3 annexes) et pagination compilée sur 500 pages.
* [`CHARTE_ET_FIL_ROUGE.md`](CHARTE_ET_FIL_ROUGE.md) — Structure canonique « Hybride exigeant », conventions linguistiques (`fr-CA`) et dossier d'architecture de l'entreprise fil rouge (**Groupe Boréal Inc.**).
* [`metadata.yaml`](metadata.yaml) — Métadonnées éditoriales globales Pandoc.
* [`manuscrit/`](manuscrit/) — Sources Markdown modulaires (37 fichiers) et figures vectorielles SVG (32 diagrammes) dans [`manuscrit/figures/`](manuscrit/figures/).
* [`build/`](build/) — Filtre Lua (`compendium.lua`), gabarit d'édition Typst (`compendium-lib.typ`, `compendium-pandoc.typ`), feuille de style HTML5 (`compendium.css`), validation pré-compilation (`validate_manuscript.py`) et contrôle de pagination (`check_pagination.py`).
* [`dist/`](dist/) — Livrables finaux compilés (`compendium-2027-complet.pdf` et `compendium-2027-complet.html`).

## Validation et compilation (PDF livre & HTML5 autonome)

Prérequis : `pandoc` (≥ 3.x), `typst` (≥ 0.15) et `python` (≥ 3.10).

```powershell
# Valider l'intégrité XML SVG, les blocs Pandoc et le manuscrit complet
python ./build/scripts/validate_manuscript.py

# Compiler l'édition intégrale (nettoie automatiquement les fichiers intermédiaires)
pwsh ./build.ps1
```
