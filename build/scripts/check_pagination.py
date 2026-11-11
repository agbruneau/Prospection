#!/usr/bin/env python3
"""Vérifie le PDF compilé et produit un rapport de pagination par chapitre via Typst."""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path


def count_pdf_pages(pdf_path: Path) -> int:
    data = pdf_path.read_bytes()
    # Recherche les objets /Type /Page (en excluant /Type /Pages)
    matches = re.findall(rb"/Type\s*/Page\b(?!s)", data)
    return len(matches)


def extract_text(body: object) -> str:
    if isinstance(body, dict):
        if "text" in body and isinstance(body["text"], str):
            return body["text"]
        if "children" in body and isinstance(body["children"], list):
            return "".join(extract_text(c) for c in body["children"])
        if "child" in body:
            return extract_text(body["child"])
    return ""


def main() -> int:
    if len(sys.argv) < 3:
        print("Usage: python check_pagination.py <typ_file> <pdf_file>", file=sys.stderr)
        return 2

    typ_path = Path(sys.argv[1])
    pdf_path = Path(sys.argv[2])

    if not pdf_path.exists() or pdf_path.stat().st_size == 0:
        print(f"ERREUR: PDF introuvable ou vide: {pdf_path}", file=sys.stderr)
        return 1

    total_physical_pages = count_pdf_pages(pdf_path)

    # Ajoute une sonde temporaire en fin de fichier .typ pour connaître la dernière page logique arabe
    probe_typ = typ_path.with_name(typ_path.stem + "-probe.typ")
    typ_content = typ_path.read_text(encoding="utf-8")
    probe_snippet = (
        '\n#context [#metadata((total_body_pages: counter(page).get().first())) <book-end-meta>]\n'
        '#show heading.where(level: 1): it => context [\n'
        '  #metadata((title: it.body, body_page: counter(page).get().first(), outlined: it.outlined)) <h1-meta>\n'
        '  #it\n'
        ']\n'
    )
    # Place le show rule juste avant le tout dernier doc ou interroge simplement heading
    res = subprocess.run(
        ["typst", "query", "--root", ".", str(typ_path), "heading.where(level: 1)"],
        capture_output=True,
        text=True,
        encoding="utf-8",
    )

    headings_info = []
    if res.returncode == 0 and res.stdout.strip():
        raw_items = json.loads(res.stdout)
        for item in raw_items:
            if not item.get("outlined", True):
                continue
            title = extract_text(item.get("body", {})).strip()
            headings_info.append(title)

    report = {
        "pdf_file": str(pdf_path),
        "pdf_size_kb": round(pdf_path.stat().st_size / 1024, 1),
        "total_physical_pages": total_physical_pages,
        "level1_sections_count": len(headings_info),
        "level1_sections": headings_info,
    }

    report_path = pdf_path.with_name("build-report.json")
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"=== RAPPORT DE COMPILATION ({pdf_path.name}) ===")
    print(f"Taille du PDF          : {report['pdf_size_kb']} Ko")
    print(f"Pages physiques totales: {total_physical_pages} pages (incluant couverture et TDM)")
    print(f"Sections H1 détectées  : {len(headings_info)}")
    for idx, h in enumerate(headings_info, 1):
        print(f"  [{idx:02d}] {h}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
