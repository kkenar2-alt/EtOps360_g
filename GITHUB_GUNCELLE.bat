@echo off
cd /d C:\Users\mentis\Documents\Codex\EtOps360

echo Eski calisan API/Frontend varsa kapatiliyor...
taskkill /IM EtOps360.Api.exe /F 2>nul
taskkill /IM dotnet.exe /F 2>nul
taskkill /IM node.exe /F 2>nul

echo GitHub guncelleme basliyor...
git init
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/kkenar2-alt/EtOps360_g.git

git add .
git commit -m "EtOps360 sprint guncelleme"
git push -u origin main --force

echo.
echo Bitti.
pause
