@echo off
REM Double-click this file to make the Maoz Tzur video.
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed yet. Opening its download page: install the "LTS" version, then double-click this again.
  start "" "https://nodejs.org/en/download"
  pause
  exit /b 1
)
node make-video.mjs %*
pause
