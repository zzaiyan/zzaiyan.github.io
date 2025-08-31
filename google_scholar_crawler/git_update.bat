cd .\results
git init
@REM git config --local user.name zzaiyan
set remote_repo=git@github.com:zzaiyan/zzaiyan.github.io.git
git add *.json
git commit -m "Updated Citation Data"
git push "%remote_repo%" HEAD:google-scholar-stats --force