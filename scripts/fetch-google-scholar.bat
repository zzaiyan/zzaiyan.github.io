@echo off
setlocal EnableExtensions DisableDelayedExpansion
pushd "%~dp0.." || exit /b 1

set "scholar_venv=%CD%\.venv-scholar"
set "scholar_python=%scholar_venv%\Scripts\python.exe"
if exist "%scholar_python%" goto install

set "scholar_bootstrap=%SCHOLAR_PYTHON%"
set "scholar_version="
if defined SCHOLAR_PYTHON goto create_venv

set "scholar_bootstrap=py"
set "scholar_version=-3.12"
py -3.12 -V >nul 2>&1
if not errorlevel 1 goto create_venv
set "scholar_version=-3"
py -3 -V >nul 2>&1
if not errorlevel 1 goto create_venv
set "scholar_bootstrap=python"
set "scholar_version="

:create_venv
echo Creating the local Scholar Python environment...
"%scholar_bootstrap%" %scholar_version% -m venv "%scholar_venv%"
if errorlevel 1 goto failed

:install
echo Checking Scholar dependencies...
"%scholar_python%" -m pip install --disable-pip-version-check --quiet -r "scripts\requirements-scholar.txt"
if errorlevel 1 goto failed

echo Fetching Google Scholar statistics...
"%scholar_python%" -u "scripts\fetch-google-scholar.py"
if errorlevel 1 goto failed
echo Snapshot ready: "%CD%\_data\metrics\google_scholar.json"
echo Commit and push this file to main to update the deployment fallback.
set "scholar_status=0"
goto finish

:failed
set "scholar_status=%errorlevel%"
echo Scholar refresh failed. See the error above; the existing snapshot was kept.

:finish
popd
if /I not "%~1"=="--no-pause" pause
exit /b %scholar_status%
