@echo off
rem Sets a new password for the live CKB admin panel.
rem See scripts\set-password.js. You type the password; it is never shown or saved.
cd /d "%~dp0"
node scripts\set-password.js
echo.
pause
