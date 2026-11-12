// Bibliothèque de mise en page Typst — Compendium 2027
// Format livre technique Royal (170 mm × 240 mm)

#let palette = (
  navy: rgb("#0f2744"),
  accent: rgb("#1d4ed8"),
  slate: rgb("#334155"),
  muted: rgb("#64748b"),
  border: rgb("#cbd5e1"),
  code-bg: rgb("#f8fafc"),
  table-head: rgb("#eef2f7"),
  table-alt: rgb("#f8fafc"),
)

#let box-styles = (
  executive: (stroke: rgb("#1e3a5f"), bg: rgb("#f0f5fa"), badge: "SYNTHÈSE EXÉCUTIVE"),
  filrouge:  (stroke: rgb("#0f5132"), bg: rgb("#f1f8f5"), badge: "FIL ROUGE • ARCHITECTURE"),
  sectoriel: (stroke: rgb("#9a3412"), bg: rgb("#fff7ed"), badge: "SECTEUR & RÉGLEMENTATION"),
  adr:       (stroke: rgb("#4c1d95"), bg: rgb("#f6f3ff"), badge: "DÉCISION D'ARCHITECTURE"),
  note:      (stroke: rgb("#0369a1"), bg: rgb("#f0f9ff"), badge: "NOTE"),
  important: (stroke: rgb("#1d4ed8"), bg: rgb("#eff6ff"), badge: "IMPORTANT"),
  tip:       (stroke: rgb("#15803d"), bg: rgb("#f0fdf4"), badge: "RECOMMANDATION"),
  warning:   (stroke: rgb("#b45309"), bg: rgb("#fffbeb"), badge: "ATTENTION"),
  caution:   (stroke: rgb("#b91c1c"), bg: rgb("#fef2f2"), badge: "RISQUE CRITIQUE"),
)

#let compendium-box(kind: "note", title: "", body) = {
  let st = box-styles.at(kind, default: box-styles.note)
  v(0.6em)
  block(
    width: 100%,
    breakable: true,
    fill: st.bg,
    stroke: (left: 3.2pt + st.stroke, top: 0.5pt + st.stroke.lighten(65%), right: 0.5pt + st.stroke.lighten(65%), bottom: 0.5pt + st.stroke.lighten(65%)),
    radius: (right: 3pt, left: 0pt),
    inset: (x: 12.5pt, y: 10.5pt),
  )[
    #block(breakable: false, below: 6.5pt)[
      #text(font: ("Segoe UI", "Calibri"), size: 7.5pt, weight: "bold", tracking: 0.6pt, fill: st.stroke)[#st.badge]
      #if title != "" [
        #linebreak()
        #text(font: ("Segoe UI", "Calibri"), size: 10.2pt, weight: "bold", fill: palette.navy)[#title]
      ]
    ]
    #set par(justify: true, leading: 0.72em, spacing: 0.96em)
    #set text(size: 9.9pt)
    #body
  ]
  v(0.6em)
}

#let render-book(
  title: none,
  subtitle: none,
  authors: (),
  date: none,
  lang: "fr",
  region: "CA",
  toc-title: [Table des matières],
  toc-depth: 2,
  doc,
) = {
  set document(
    title: if title != none { title } else { [Compendium 2027] },
  )

  set text(
    font: ("Libertinus Serif", "Georgia", "Cambria"),
    size: 11.10pt,
    fill: rgb("#1a202c"),
    lang: lang,
    region: region,
  )

  set par(
    justify: true,
    leading: 0.78em,
    spacing: 1.14em,
    first-line-indent: 0pt,
  )

  // Mise en forme des titres
  show heading: set text(font: ("Segoe UI", "Calibri"), fill: palette.navy)
  show heading.where(level: 1): it => {
    set par(justify: false, leading: 0.45em)
    v(0.18cm)
    block(breakable: false, below: 0.55cm)[
      #text(size: 18pt, weight: "bold")[#it.body]
      #v(0.22cm)
      #line(length: 38%, stroke: 2pt + palette.accent)
    ]
  }
  show heading.where(level: 2): it => {
    set par(justify: false)
    v(0.45cm)
    block(breakable: false, below: 0.34cm)[
      #text(size: 13.2pt, weight: "bold", fill: palette.navy)[#it.body]
    ]
  }
  show heading.where(level: 3): it => {
    set par(justify: false)
    v(0.3cm)
    block(breakable: false, below: 0.22cm)[
      #text(size: 11pt, weight: "bold", fill: palette.slate)[#it.body]
    ]
  }
  show heading.where(level: 4): it => {
    set par(justify: false)
    v(0.2cm)
    block(breakable: false, below: 0.15cm)[
      #text(size: 10.2pt, weight: "bold", style: "italic", fill: palette.slate)[#it.body]
    ]
  }

  // Code en ligne sécable et blocs de code
  show raw: set text(font: ("Consolas", "Courier New"), size: 8.7pt)
  show raw.where(block: false): it => highlight(
    fill: rgb("#f1f5f9"),
    radius: 2pt,
    extent: 1.2pt,
    text(font: ("Consolas", "Courier New"), size: 8.7pt, fill: rgb("#0f2744"), it.text.replace("_", "_\u{200b}").replace("/", "/\u{200b}")),
  )
  show raw.where(block: true): it => {
    set par(justify: false, leading: 0.58em)
    v(0.42em)
    block(
      width: 100%,
      breakable: true,
      fill: palette.code-bg,
      stroke: 0.6pt + palette.border,
      radius: 3pt,
      inset: (x: 9.5pt, y: 9pt),
    )[#it]
    v(0.42em)
  }

  // Tableaux d'édition technique (cellules alignées à gauche et césure CamelCase / snake_case)
  show figure.where(kind: table): set block(breakable: true)
  set table(
    align: left,
    inset: (x: 6pt, y: 6.2pt),
    stroke: (x, y) => (
      top: if y == 0 { 1.1pt + palette.navy } else if y == 1 { 0.8pt + palette.navy } else { 0.4pt + palette.border },
      bottom: 0.6pt + palette.border,
      left: none,
      right: none,
    ),
    fill: (x, y) => if y == 0 { palette.table-head } else if calc.odd(y) { white } else { palette.table-alt },
  )
  show table.cell: it => {
    set align(left)
    set par(justify: false, leading: 0.56em)
    set text(font: ("Segoe UI", "Calibri"), size: 8.4pt, hyphenate: true)
    show regex("[a-z][A-Z]"): m => m.text.slice(0, 1) + "\u{200b}" + m.text.slice(1)
    show raw.where(block: false): r => text(
      font: ("Consolas", "Courier New"),
      size: 7.8pt,
      fill: palette.navy,
      r.text.replace("_", "_\u{200b}").replace("/", "/\u{200b}").replace(".", ".\u{200b}").replace("-", "-\u{200b}"),
    )
    if it.y == 0 {
      text(weight: "bold", fill: palette.navy)[#it]
    } else {
      it
    }
  }

  // Légendes de figures et tableaux
  show figure.caption: it => {
    set par(justify: false)
    v(0.2cm)
    text(font: ("Segoe UI", "Calibri"), size: 8.7pt, style: "italic", fill: palette.muted)[#it]
  }

  // Liens et équations en bloc
  show link: set text(fill: palette.accent)
  show math.equation.where(block: true): set text(size: 9.7pt)

  // --- PAGES LIMINAIRES (Couverture + Table des matières, hors pagination arabe) ---
  set page(
    width: 170mm,
    height: 240mm,
    margin: (inside: 22.5mm, outside: 19.5mm, top: 22.5mm, bottom: 22.5mm),
    numbering: none,
  )

  // Page de couverture
  block(width: 100%, height: 100%)[
    #rect(width: 100%, height: 7pt, fill: palette.navy)
    #v(1.6cm)
    #text(font: ("Segoe UI", "Calibri"), size: 9.5pt, weight: "bold", tracking: 1.8pt, fill: palette.accent)[
      ARCHITECTURE D'ENTREPRISE • SYSTÈMES MULTI-AGENTS • STANDARDS 2027
    ]
    #v(0.8cm)
    #par(justify: false, leading: 0.42em)[
      #text(font: ("Segoe UI", "Calibri"), size: 23pt, weight: "bold", fill: palette.navy)[
        #title
      ]
    ]
    #if subtitle != none [
      #v(0.45cm)
      #par(justify: false, leading: 0.52em)[
        #text(font: ("Segoe UI", "Calibri"), size: 11.8pt, fill: palette.slate)[
          #subtitle
        ]
      ]
    ]
    #v(1cm)
    #line(length: 100%, stroke: 0.8pt + palette.border)
    #v(0.7cm)
    #block(fill: rgb("#f8fafc"), stroke: 0.6pt + palette.border, radius: 4pt, inset: 12pt, width: 100%)[
      #set text(font: ("Segoe UI", "Calibri"), size: 8.8pt, fill: palette.slate)
      #set par(justify: false, leading: 0.58em)
      *Périmètre de référence (612 pages)* : Pile ouverte Linux Foundation AAIF (`MCP`, `A2A v1.0`, `Agent Skills`, `agentgateway`, `OpenSandbox`, `OpenEnv`) • Réseau `AGNTCY` & maillages B2B (`EDC` / `ODRL`, `vLEI`, `AP2`) • Sémantique `Apache Ossie` & mémoire bi-temporelle • Exécution durable (`Temporal`, `Restate`, `Saga`) • Fédération SaaS, `CUA`, `IT/OT`, `Edge` déconnecté (`CRDT`) & robotique `ROS 2 Simplex` • Identité Zero Trust (`OAuth 2.1 OBO`, `OWASP ASI01–ASI10`), souveraineté (`TEE`, `Cognitive DR`), `Agentic SDLC`/`DataOps`, distillation `LLM → SLM` & Conformité 2027 (`ISO/IEC 42001`, `BSIF E-23`, `Loi 25`, `EU AI Act`).
    ]
    #v(1fr)
    #for a in authors [
      #text(font: ("Segoe UI", "Calibri"), size: 10pt, weight: "bold", fill: palette.navy)[#a.name] \
      #if a.affiliation != "" [
        #text(font: ("Segoe UI", "Calibri"), size: 9pt, fill: palette.muted)[#a.affiliation] \
      ]
    ]
    #if date != none [
      #v(0.25cm)
      #text(font: ("Segoe UI", "Calibri"), size: 9.5pt, weight: "semibold", fill: palette.accent)[#date]
    ]
    #v(0.4cm)
    #rect(width: 100%, height: 3pt, fill: palette.accent)
  ]

  pagebreak()

  // Table des matières paginée en chiffres romains
  set page(
    numbering: "i",
    footer: context [
      #set text(font: ("Segoe UI", "Calibri"), size: 8pt, fill: palette.muted)
      #align(center)[#counter(page).display("i")]
    ],
  )
  counter(page).update(1)

  heading(level: 1, outlined: false)[#toc-title]
  outline(title: none, indent: 1.2em, depth: toc-depth)

  pagebreak()

  // --- CORPS DU LIVRE (Numérotation arabe à partir de p. 1 = budget des 612 pages) ---
  set page(
    numbering: "1",
    header: context {
      let pg = counter(page).get().first()
      set text(font: ("Segoe UI", "Calibri"), size: 7.8pt, fill: palette.muted)
      if pg > 1 [
        #grid(
          columns: (1fr, auto),
          [Interopérabilité et Orchestration en Entreprise Agentique],
          [Compendium 2027],
        )
        #v(-4pt)
        #line(length: 100%, stroke: 0.4pt + palette.border)
      ]
    },
    footer: context [
      #set text(font: ("Segoe UI", "Calibri"), size: 8.5pt, fill: palette.slate)
      #line(length: 100%, stroke: 0.4pt + palette.border)
      #v(3pt)
      #grid(
        columns: (1fr, auto),
        [#text(fill: palette.muted, size: 7.6pt)[Édition de Référence — Architecture & Gouvernance]],
        [*#counter(page).display("1")*],
      )
    ],
  )
  counter(page).update(1)

  doc
}
