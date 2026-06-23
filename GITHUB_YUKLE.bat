@echo off
setlocal
set REPO_URL=https://github.com/kkenar2-alt/etops3601.git

where git >nul 2>nul
if errorlevel 1 (
  echo Git bulunamadi. Once Git for Windows kurun.
  pause
  exit /b 1
)

if not exist .git (
  git init
)

git branch -M main

git remote get-url origin >nul 2>nul
if errorlevel 1 (
  git remote add origin %REPO_URL%
) else (
  git remote set-url origin %REPO_URL%
)

git add .
git commit -m "ilk proje yukleme"
git push -u origin main

pause
