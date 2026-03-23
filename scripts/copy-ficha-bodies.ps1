$ErrorActionPreference = 'Stop'
$base = Split-Path -Parent $PSScriptRoot
$dst = Join-Path $base 'src\ficha-bodies'
New-Item -ItemType Directory -Force -Path $dst | Out-Null
$map = @{
  '.tmp-s21-plus-body.html'  = 's21-plus.html'
  '.tmp-s21-pro-body.html'   = 's21-pro.html'
  '.tmp-s21-xp-body.html'    = 's21-xp.html'
  '.tmp-l9-15000-body.html'  = 'l9-15000.html'
  '.tmp-l9-16000-body.html'  = 'l9-16000.html'
  '.tmp-l9-17000-body.html'  = 'l9-17000.html'
}
foreach ($kv in $map.GetEnumerator()) {
  $src = Join-Path $base $kv.Key
  if (-not (Test-Path -LiteralPath $src)) { throw "Missing $src" }
  Copy-Item -LiteralPath $src -Destination (Join-Path $dst $kv.Value) -Force
}
Get-ChildItem -Path $base -Filter '.tmp-*-body.html' -File | Remove-Item -Force
Write-Host "Copied to $dst"
