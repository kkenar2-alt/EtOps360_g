@echo off
cd /d %~dp0
git status
git add .
git commit -m "EtOps360 sprint 01 baslangic"
git push
pause
