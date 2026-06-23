@echo off
cd /d C:\Users\mentis\Documents\Codex\EtOps360\src\web
taskkill /IM node.exe /F 2>nul
npm install
npm run dev
pause
