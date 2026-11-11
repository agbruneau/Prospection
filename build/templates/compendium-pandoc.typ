// Gabarit Pandoc → Typst pour le Compendium 2027
#import "/build/templates/compendium-lib.typ": compendium-box, render-book

#set terms(hanging-indent: 1.5em)
#let horizontalRule = line(start: (0%, 0%), end: (100%, 0%), stroke: 0.5pt + rgb("#cbd5e1"))
#let divider = if "divider" in std { divider } else { horizontalRule }

$if(highlighting-definitions)$
$highlighting-definitions$
$endif$

#show: doc => render-book(
$if(title)$
  title: [$title$],
$endif$
$if(subtitle)$
  subtitle: [$subtitle$],
$endif$
$if(author)$
  authors: (
$for(author)$
$if(author.name)$
    (name: [$author.name$], affiliation: [$author.affiliation$]),
$else$
    (name: [$author$], affiliation: ""),
$endif$
$endfor$
  ),
$endif$
$if(date)$
  date: [$date$],
$endif$
$if(lang)$
  lang: "$lang$",
$endif$
$if(region)$
  region: "$region$",
$endif$
$if(toc-title)$
  toc-title: [$toc-title$],
$endif$
  toc-depth: $if(toc-depth)$$toc-depth$$else$2$endif$,
  doc,
)

$body$
