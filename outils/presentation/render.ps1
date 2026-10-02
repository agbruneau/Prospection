param([string]$pptx, [string]$outDir)
New-Item -ItemType Directory -Force $outDir | Out-Null
Get-ChildItem $outDir -Filter *.png | Remove-Item -Force
# PowerPoint n'a qu'une instance : ne jamais quitter celle que l'utilisateur a ouverte.
$dejaOuvert = [bool](Get-Process POWERPNT -ErrorAction SilentlyContinue)
$app = New-Object -ComObject PowerPoint.Application
$p = $app.Presentations.Open($pptx, $true, $false, $false)
foreach ($s in $p.Slides) { $s.Export((Join-Path $outDir ("s{0:D2}.png" -f $s.SlideIndex)), "PNG", 1600, 900) }
$p.Close()
if (-not $dejaOuvert) { $app.Quit() }
# Libérer les références COM, sinon le processus PowerPoint peut survivre à Quit().
[void][Runtime.InteropServices.Marshal]::ReleaseComObject($p)
[void][Runtime.InteropServices.Marshal]::ReleaseComObject($app)
[GC]::Collect(); [GC]::WaitForPendingFinalizers()
