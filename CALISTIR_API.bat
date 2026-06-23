@echo off
cd /d C:\Users\mentis\Documents\Codex\EtOps360
taskkill /IM EtOps360.Api.exe /F 2>nul
taskkill /IM dotnet.exe /F 2>nul
dotnet restore
dotnet run --project .\src\EtOps360.Api\EtOps360.Api.csproj --launch-profile http
pause
