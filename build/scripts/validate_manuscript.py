#!/usr/bin/env python3
"""Validation pré-compilation du manuscrit et des figures SVG du Compendium 2027."""

from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MANUSCRIT = ROOT / "manuscrit"
FIGURES = MANUSCRIT / "figures"

SKELETON_PATTERNS = [
    r"\*Section planifiée",
    r"\*Éclairage vertical planifié",
    r"\*\*Statut\*\*\s*:\s*Planifiée",
    r"TODO\b",
    r"FIXME\b",
]

IMG_RE = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")
DIV_OPEN_RE = re.compile(r"^:::\s*\{[^}]+\}\s*$")
DIV_BARE_OPEN_RE = re.compile(r"^:::\s+[a-zA-Z0-9_-]+\s*$")
DIV_CLOSE_RE = re.compile(r"^:::\s*$")
FENCE_RE = re.compile(r"^(`{3,}|~{3,})")


def strip_code(md: str) -> str:
    """Retire les blocs de code clôturés et les spans de code inline."""
    lines = []
    in_fence = False
    fence_marker = ""
    for line in md.splitlines():
        m = FENCE_RE.match(line.strip())
        if m:
            marker = m.group(1)
            if not in_fence:
                in_fence = True
                fence_marker = marker[0] * len(marker)
            elif line.strip().startswith(fence_marker[0] * len(fence_marker)):
                in_fence = False
                fence_marker = ""
            continue
        if not in_fence:
            lines.append(line)
    text = "\n".join(lines)
    return re.sub(r"`[^`\n]+`", "", text)


def check_fences_and_divs(path: Path, md: str) -> list[str]:
    issues: list[str] = []
    in_fence = False
    fence_char = ""
    fence_len = 0
    div_depth = 0
    div_start_line = 0

    for idx, raw_line in enumerate(md.splitlines(), start=1):
        stripped = raw_line.strip()
        m = FENCE_RE.match(stripped)
        if m:
            marker = m.group(1)
            # Une ligne d'ouverture a souvent un langage après les backticks; une fermeture n'a rien d'autre
            rest = stripped[len(marker):].strip()
            if not in_fence:
                in_fence = True
                fence_char = marker[0]
                fence_len = len(marker)
            elif marker[0] == fence_char and len(marker) >= fence_len and rest == "":
                in_fence = False
                fence_char = ""
                fence_len = 0
            continue

        if in_fence:
            continue

        if DIV_OPEN_RE.match(stripped) or DIV_BARE_OPEN_RE.match(stripped):
            if div_depth > 0:
                issues.append(f"L{idx}: div ':::' imbriquée détectée (ouverte initialement L{div_start_line})")
            div_depth += 1
            div_start_line = idx
        elif DIV_CLOSE_RE.match(stripped):
            if div_depth == 0:
                issues.append(f"L{idx}: fermeture ':::' orpheline")
            else:
                div_depth -= 1

    if in_fence:
        issues.append("Bloc de code ``` non refermé en fin de fichier")
    if div_depth != 0:
        issues.append(f"Div ':::' non refermée en fin de fichier (ouverte L{div_start_line})")
    return issues


def check_svgs() -> tuple[int, list[str]]:
    issues: list[str] = []
    svg_files = sorted(FIGURES.glob("*.svg"))
    for svg in svg_files:
        try:
            tree = ET.parse(svg)
            root = tree.getroot()
            if "viewBox" not in root.attrib:
                issues.append(f"{svg.name}: attribut 'viewBox' manquant")
        except ET.ParseError as exc:
            issues.append(f"{svg.name}: erreur XML SVG — {exc}")
    return len(svg_files), issues


def main() -> int:
    only_existing = "--partial" in sys.argv
    md_files = sorted(MANUSCRIT.rglob("*.md"))

    errors: list[str] = []
    warnings: list[str] = []
    stats: list[dict] = []

    svg_count, svg_issues = check_svgs()
    errors.extend(svg_issues)

    for md_path in md_files:
        rel = md_path.relative_to(ROOT).as_posix()
        content = md_path.read_text(encoding="utf-8")
        prose = strip_code(content)
        words = len(content.split())
        prose_words = len(prose.split())

        is_skeleton = any(re.search(pat, content) for pat in SKELETON_PATTERNS[:3])
        if is_skeleton and not only_existing:
            errors.append(f"{rel}: marqueurs de squelette encore présents")

        for pat in SKELETON_PATTERNS[3:]:
            if re.search(pat, prose):
                warnings.append(f"{rel}: motif '{pat}' trouvé hors code")

        # Vérification des blocs et divs
        for issue in check_fences_and_divs(md_path, content):
            errors.append(f"{rel}: {issue}")

        # Vérification des images référencées (hors code)
        for img_match in IMG_RE.finditer(prose):
            img_ref = img_match.group(1).strip()
            img_target = (ROOT / img_ref).resolve() if not Path(img_ref).is_absolute() else Path(img_ref)
            if not img_target.exists():
                errors.append(f"{rel}: image introuvable -> {img_ref}")

        # Vérification des maths $$...$$ accidentelles hors code
        if "$$" in prose:
            warnings.append(f"{rel}: contient '$$' hors code (utiliser \\[ ... \\] avec -tex_math_dollars)")

        # Seuils de longueur pour chapitres complets
        if md_path.name.startswith("ch") and not is_skeleton:
            if words < 2800:
                warnings.append(f"{rel}: chapitre court ({words} mots)")
            elif words > 6800:
                warnings.append(f"{rel}: chapitre très long ({words} mots)")

        stats.append({
            "file": rel,
            "words": words,
            "prose_words": prose_words,
            "skeleton": is_skeleton,
        })

    total_words = sum(s["words"] for s in stats)
    completed_chapters = sum(
        1 for s in stats if Path(s["file"]).name.startswith("ch") and not s["skeleton"]
    )
    completed_openers = sum(
        1 for s in stats if Path(s["file"]).name.startswith("00-partie-") and not s["skeleton"]
    )

    summary = {
        "markdown_files": len(md_files),
        "svg_files": svg_count,
        "completed_chapters": f"{completed_chapters}/25",
        "completed_part_openers": f"{completed_openers}/8",
        "total_words": total_words,
        "errors_count": len(errors),
        "warnings_count": len(warnings),
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))
    if errors:
        print("\nERREURS:")
        for e in errors:
            print(f"  - {e}")
    if warnings:
        print("\nAVERTISSEMENTS:")
        for w in warnings:
            print(f"  - {w}")

    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
