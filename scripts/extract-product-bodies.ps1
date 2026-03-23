$ErrorActionPreference = 'Stop'
$pairs = @(
  @{ Src = 'c:\Users\camilo\DEVS\andessh\productos\s21-plus.html'; Out = 'c:\Users\camilo\DEVS\andessolarhash-website\sites\andessolarhash\.tmp-s21-plus-body.html' },
  @{ Src = 'c:\Users\camilo\DEVS\andessh\productos\s21-pro.html'; Out = 'c:\Users\camilo\DEVS\andessolarhash-website\sites\andessolarhash\.tmp-s21-pro-body.html' },
  @{ Src = 'c:\Users\camilo\DEVS\andessh\productos\s21-xp.html'; Out = 'c:\Users\camilo\DEVS\andessolarhash-website\sites\andessolarhash\.tmp-s21-xp-body.html' },
  @{ Src = 'c:\Users\camilo\DEVS\andessh\productos\l9-15000.html'; Out = 'c:\Users\camilo\DEVS\andessolarhash-website\sites\andessolarhash\.tmp-l9-15000-body.html' },
  @{ Src = 'c:\Users\camilo\DEVS\andessh\productos\l9-16000.html'; Out = 'c:\Users\camilo\DEVS\andessolarhash-website\sites\andessolarhash\.tmp-l9-16000-body.html' },
  @{ Src = 'c:\Users\camilo\DEVS\andessh\productos\l9-17000.html'; Out = 'c:\Users\camilo\DEVS\andessolarhash-website\sites\andessolarhash\.tmp-l9-17000-body.html' }
)
foreach ($p in $pairs) {
  $lines = Get-Content -LiteralPath $p.Src -Encoding UTF8
  $start = 0
  $end = 0
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^\s*<section class="product-shell"') { $start = $i + 1; break }
  }
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^\s*<!-- FOOTER -->') { $end = $i + 1; break }
  }
  if ($start -eq 0 -or $end -eq 0) { throw "Markers not found in $($p.Src)" }
  $slice = $lines[($start - 1)..($end - 2)] -join "`n"
  Set-Content -LiteralPath $p.Out -Value $slice -Encoding UTF8
  Write-Host "OK $($p.Src) -> $($p.Out) ($($slice.Length) chars)"
}
