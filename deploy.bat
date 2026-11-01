@echo off
rem =====================================================================
rem  CKB  -  publish to the live website (Vercel)
rem
rem  Double-click this AFTER you have made your changes with the local
rem  copy (py server.py 8000) and checked they look right at
rem  http://localhost:8000
rem
rem  It uploads the whole site to Vercel. Takes about a minute.
rem  Wait for the green "Done" message, then you can close the window.
rem =====================================================================
title CKB - publishing to the live site...
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

rem --- Always use the current Vercel tool. An older one installed on this ---
rem --- computer (v59) does not accept new sign-ins and says "Not authorized". ---
set "VC=npx --yes vercel@latest"

rem --- Self-heal: if a previous run was closed mid-publish, put .git back. ---
if exist ".git-during-publish" if not exist ".git" ren ".git-during-publish" ".git"

rem --- Hide the Git folder for the upload. Vercel would otherwise refuse the ---
rem --- publish ("commit author doesn't have permission") because the Git    ---
rem --- author isn't the Vercel account. This project isn't linked to a Git  ---
rem --- repo, so publishing the folder without Git metadata is fine.         ---
if exist ".git" ren ".git" ".git-during-publish"

echo.
echo   Publishing the CKB website...  (leave this window alone)
echo.
call %VC% deploy --prod --yes
if not errorlevel 1 goto :ok

echo.
echo   First try didn't go through - waiting 10 seconds and trying once more...
timeout /t 10 /nobreak >nul
echo.
call %VC% deploy --prod --yes
if not errorlevel 1 goto :ok

rem --- both tries failed ---
if exist ".git-during-publish" ren ".git-during-publish" ".git"
echo.
echo   ---------------------------------------------------------------
echo   It didn't publish. The live site was NOT changed.
echo   Check your internet, or send the messages above to your helper.
echo   ---------------------------------------------------------------
echo.
pause
goto :eof

:ok
if exist ".git-during-publish" ren ".git-during-publish" ".git"
echo.
echo   ===============================================================
echo    DONE - the live site is now updated.
echo    Open the website and press Ctrl+F5 to see the changes.
echo   ===============================================================
echo.
pause
