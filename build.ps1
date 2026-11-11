param(
    [ValidateSet("Etalon", "Complet")]
    [string]$Target = "Etalon"
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

New-Item -ItemType Directory -Path "dist" -Force | Out-Null

if ($Target -eq "Etalon") {
    $sources = @(
        "manuscrit/00-ouverture.md",
        "manuscrit/partie-01-fondations/00-partie-01.md",
        "manuscrit/partie-01-fondations/ch01-main-oeuvre-asynchrone.md"
    )
    $outBase = "dist/compendium-2027-etalon"
} else {
    $sources = @(
        "manuscrit/00-ouverture.md"
    )
    $partDirs = Get-ChildItem -Path "manuscrit" -Directory | Where-Object { $_.Name -like "partie-*" } | Sort-Object Name
    foreach ($pd in $partDirs) {
        $mdFiles = Get-ChildItem -Path $pd.FullName -Filter "*.md" | Sort-Object Name
        foreach ($mf in $mdFiles) {
            $sources += ($mf.FullName | Resolve-Path -Relative).Replace("\", "/")
        }
    }
    $annexFiles = Get-ChildItem -Path "manuscrit/annexes" -Filter "*.md" -ErrorAction SilentlyContinue | Sort-Object Name
    foreach ($af in $annexFiles) {
        $sources += ($af.FullName | Resolve-Path -Relative).Replace("\", "/")
    }
    $outBase = "dist/compendium-2027-complet"
}

Write-Host "[1/4] Génération du source Typst via Pandoc ($Target)..." -ForegroundColor Cyan
$pandocTypArgs = @(
    "--metadata-file=metadata.yaml",
    "-f", "markdown+alerts+fenced_divs+pipe_tables+backtick_code_blocks+lists_without_preceding_blankline+tex_math_single_backslash-tex_math_dollars",
    "-t", "typst",
    "--standalone",
    "--toc",
    "--toc-depth=2",
    "--lua-filter=build/filters/compendium.lua",
    "--template=build/templates/compendium-pandoc.typ",
    "-o", "$outBase.typ"
) + $sources

& pandoc @pandocTypArgs
if ($LASTEXITCODE -ne 0) { throw "Échec de Pandoc (cible Typst)." }

Write-Host "[2/4] Compilation du livre PDF via Typst..." -ForegroundColor Cyan
& typst compile --root . "$outBase.typ" "$outBase.pdf"
if ($LASTEXITCODE -ne 0) { throw "Échec de Typst compile." }

Write-Host "[3/4] Compilation de l'édition HTML5 autonome via Pandoc..." -ForegroundColor Cyan
$pandocHtmlArgs = @(
    "--metadata-file=metadata.yaml",
    "-f", "markdown+alerts+fenced_divs+pipe_tables+backtick_code_blocks+lists_without_preceding_blankline+tex_math_single_backslash-tex_math_dollars",
    "-t", "html5",
    "--standalone",
    "--embed-resources",
    "--toc",
    "--toc-depth=2",
    "--lua-filter=build/filters/compendium.lua",
    "--css=build/templates/compendium.css",
    "-o", "$outBase.html"
) + $sources

& pandoc @pandocHtmlArgs
if ($LASTEXITCODE -ne 0) { throw "Échec de Pandoc (cible HTML5)." }

Write-Host "[4/4] Vérification et rapport de pagination..." -ForegroundColor Cyan
& python build/scripts/check_pagination.py "$outBase.typ" "$outBase.pdf"
if ($LASTEXITCODE -ne 0) { throw "Échec de la vérification du PDF." }

Write-Host "Compilation terminée avec succès : $outBase.pdf et $outBase.html" -ForegroundColor Green
