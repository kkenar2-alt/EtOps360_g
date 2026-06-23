@echo off
cd /d C:\Users\mentis\Documents\Codex\EtOps360

echo GitHub guncelleme basliyor...
git status

git add .
git commit -m "EtOps360 guncelleme"
git push

echo.
echo Islem bitti.
pause