param([string]$pptx, [string]$outDir)
New-Item -ItemType Directory -Force $outDir | Out-Null
Get-ChildItem $outDir -Filter *.png | Remove-Item -Force
$app = New-Object -ComObject PowerPoint.Application
$p = $app.Presentations.Open($pptx, $true, $false, $false)
foreach ($s in $p.Slides) { $s.Export((Join-Path $outDir ("s{0:D2}.png" -f $s.SlideIndex)), "PNG", 1600, 900) }
$p.Close(); $app.Quit()
