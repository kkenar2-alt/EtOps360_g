$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\mentis\Documents\Codex\EtOps360"
$RepoUrl = "https://github.com/kkenar2-alt/EtOps360_g.git"

Write-Host "EtOps360 Windows bootstrap basliyor..." -ForegroundColor Green

if (!(Test-Path "C:\Users\mentis\Documents\Codex")) {
    New-Item -ItemType Directory -Path "C:\Users\mentis\Documents\Codex" | Out-Null
}

if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git bulunamadi. Git for Windows kurun." -ForegroundColor Yellow
    Write-Host "winget install --id Git.Git -e"
    exit 1
}

if (!(Get-Command dotnet -ErrorAction SilentlyContinue)) {
    Write-Host ".NET SDK bulunamadi. .NET SDK kurun." -ForegroundColor Yellow
    Write-Host "winget install --id Microsoft.DotNet.SDK.10 -e"
    exit 1
}

if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js bulunamadi. Node.js LTS kurun." -ForegroundColor Yellow
    Write-Host "winget install --id OpenJS.NodeJS.LTS -e"
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

Write-Host "Kurulum kontrolu tamamlandi." -ForegroundColor Green
Write-Host "Backend: dotnet run --project C:\Users\mentis\Documents\Codex\EtOps360\src\EtOps360.Api\EtOps360.Api.csproj --launch-profile http"
Write-Host "Frontend: cd C:\Users\mentis\Documents\Codex\EtOps360\src\web; npm run dev"
