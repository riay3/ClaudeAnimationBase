@echo off
setlocal
REM Double-click this file to make the Maoz Tzur video.
cd /d "%~dp0"

REM Find node.exe: on the PATH first, then where the Node.js installer puts it. (A window opened by double-clicking
REM may not see a Node.js installed moments ago on the PATH until you sign out and back in, so look for it directly.)
set "NODE="
for /f "delims=" %%i in ('where node.exe 2^>nul') do if not defined NODE set "NODE=%%i"
if not defined NODE if exist "%ProgramFiles%\nodejs\node.exe" set "NODE=%ProgramFiles%\nodejs\node.exe"
if not defined NODE if exist "%ProgramW6432%\nodejs\node.exe" set "NODE=%ProgramW6432%\nodejs\node.exe"
if not defined NODE if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "NODE=%ProgramFiles(x86)%\nodejs\node.exe"
if not defined NODE if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" set "NODE=%LOCALAPPDATA%\Programs\nodejs\node.exe"
if not defined NODE if defined NVM_SYMLINK if exist "%NVM_SYMLINK%\node.exe" set "NODE=%NVM_SYMLINK%\node.exe"
if not defined NODE goto nonode

for %%d in ("%NODE%") do set "PATH=%%~dpd;%PATH%"
"%NODE%" make-video.mjs %*
echo.
pause
exit /b

:nonode
echo Node.js was not found on this computer.
echo Opening its download page: install the "LTS" version, then double-click this file again.
start "" "https://nodejs.org/en/download"
pause
exit /b 1
