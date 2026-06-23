$ErrorActionPreference = "Stop"
$ProjectRoot = "C:\Users\mentis\Documents\Codex\EtOps360"
$RepoUrl = "https://github.com/kkenar2-alt/EtOps360_g.git"

if (!(Test-Path "C:\Users\mentis\Documents\Codex")) {
    New-Item -ItemType Directory -Path "C:\Users\mentis\Documents\Codex" | Out-Null
}

if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git yok. Kurulum: winget install --id Git.Git -e" -ForegroundColor Yellow
    exit 1
}
if (!(Get-Command dotnet -ErrorAction SilentlyContinue)) {
    Write-Host ".NET SDK yok. Kurulum: winget install --id Microsoft.DotNet.SDK.10 -e" -ForegroundColor Yellow
    exit 1
}
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js LTS yok. Kurulum: winget install --id OpenJS.NodeJS.LTS -e" -ForegroundColor Yellow
    exit 1
}

if (!(Test-Path $ProjectRoot)) {
    git clone $RepoUrl $ProjectRoot
}

Set-Location $ProjectRoot
git pull
dotnet restore
Set-Location "$ProjectRoot\src\web"
npm install
npm run build
Write-Host "EtOps360 kurulum kontrolu tamamlandi." -ForegroundColor Green
