@echo off
rem Sets a new password for the live CKB admin panel.
rem See scripts\set-password.js. You type the password; it is never shown or saved.
cd /d "%~dp0"
rem --- Find Node.js even if Windows has not picked up its folder yet. ---
if exist "%ProgramFiles%\nodejs\node.exe" set "PATH=%ProgramFiles%\nodejs;%APPDATA%\npm;%PATH%"
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" set "PATH=%LOCALAPPDATA%\Programs\nodejs;%APPDATA%\npm;%PATH%"
where node >nul 2>nul || (
  echo.
  echo   Node.js is not installed. Install it from https://nodejs.org and run this again.
  echo.
  pause
  goto :eof
)
node scripts\set-password.js
echo.
pause
