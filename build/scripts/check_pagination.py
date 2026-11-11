#!/usr/bin/env python3
"""Vérifie le PDF compilé et affiche le rapport de pagination par chapitre via Typst."""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path


def count_pdf_pages(pdf_path: Path) -> int:
    data = pdf_path.read_bytes()
    matches = re.findall(rb"/Type\s*/Page\b(?!s)", data)
    return len(matches)


def extract_text(body: object) -> str:
    if isinstance(body, dict):
        func = body.get("func")
        if func == "smartquote":
            return "’" if not body.get("double") else "«"
        if func == "space":
            return " "
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

    expr = "query(heading.where(level: 1)).map(h => (page: h.location().page(), outlined: h.outlined, body: h.body))"
    res = subprocess.run(
        ["typst", "eval", expr, "--root", ".", "--in", str(typ_path)],
        capture_output=True,
        text=True,
        encoding="utf-8",
    )

    section_pages = []
    front_matter_pages = 0
    total_arabic_body_pages = total_physical_pages

    if res.returncode == 0 and res.stdout.strip():
        raw_items = [x for x in json.loads(res.stdout) if x.get("outlined", True)]
        if raw_items:
            first_body_phys = raw_items[0]["page"]
            front_matter_pages = first_body_phys - 1
            total_arabic_body_pages = total_physical_pages - front_matter_pages
            for idx, item in enumerate(raw_items):
                title = extract_text(item.get("body", {})).strip()
                phys = item["page"]
                arab = phys - first_body_phys + 1
                nxt_phys = raw_items[idx + 1]["page"] if idx + 1 < len(raw_items) else (total_physical_pages + 1)
                span = nxt_phys - phys
                section_pages.append({
                    "index": idx + 1,
                    "title": title,
                    "arabic_start_page": arab,
                    "arabic_end_page": arab + span - 1,
                    "pages": span,
                })

    pdf_size_kb = round(pdf_path.stat().st_size / 1024, 1)
    print(f"=== RAPPORT DE COMPILATION ({pdf_path.name}) ===")
    print(f"Taille du PDF          : {pdf_size_kb} Ko")
    print(f"Pages physiques totales: {total_physical_pages} pages ({front_matter_pages} liminaires + {total_arabic_body_pages} pages numérotées)")
    print(f"Sections H1 détectées  : {len(section_pages)}")
    for s in section_pages:
        print(f"  [{s['index']:02d}] p.{s['arabic_start_page']:03d}–{s['arabic_end_page']:03d} ({s['pages']:2d} p.) | {s['title']}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
