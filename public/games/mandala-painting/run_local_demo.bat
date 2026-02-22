@echo off
REM Convenience launcher for the gesture painting demo.
REM Double-click this file in Windows Explorer to start the local server and open the browser.

cd /d "%~dp0"

python run_local_demo.py

REM If there's an error, pause so the user can see the error message
if errorlevel 1 pause
