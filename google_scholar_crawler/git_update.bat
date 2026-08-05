@echo off
setlocal
cd /d "%~dp0"

if not defined GOOGLE_SCHOLAR_ID set "GOOGLE_SCHOLAR_ID=ZpxXejIAAAAJ"
python main.py
if errorlevel 1 exit /b 1

git -C results init
git -C results config user.name "Google Scholar Updater"
git -C results config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git -C results add gs_data.json gs_data_shieldsio.json
git -C results diff --cached --quiet
if errorlevel 2 exit /b 1
if errorlevel 1 goto push_stats

echo Google Scholar data is unchanged.
goto trigger_deploy

:push_stats
git -C results commit -m "Update Google Scholar statistics"
if errorlevel 1 exit /b 1
git -C results push "git@github.com:zzaiyan/zzaiyan.github.io.git" HEAD:google-scholar-stats --force
if errorlevel 1 exit /b 1
echo Google Scholar data pushed successfully.

:trigger_deploy
where gh >nul 2>&1
if errorlevel 1 (
  echo GitHub CLI is unavailable. Run: gh workflow run deploy.yml --repo zzaiyan/zzaiyan.github.io --ref main
  exit /b 0
)

gh workflow run deploy.yml --repo zzaiyan/zzaiyan.github.io --ref main
if errorlevel 1 exit /b 1
echo Website deployment triggered.
