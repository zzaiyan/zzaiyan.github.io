#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
results="${root}/results"
repository="zzaiyan/zzaiyan.github.io"
python="${root}/.venv/bin/python"

if [[ ! -x "${python}" ]]; then
  printf '%s\n' "Missing ${root}/.venv. Create it and install requirements first." >&2
  exit 1
fi

export GOOGLE_SCHOLAR_ID="${GOOGLE_SCHOLAR_ID:-ZpxXejIAAAAJ}"
"${python}" "${root}/main.py"

git -C "${results}" init --quiet
git -C "${results}" config user.name "Google Scholar Updater"
git -C "${results}" config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git -C "${results}" add gs_data.json gs_data_shieldsio.json

if git -C "${results}" diff --cached --quiet; then
  printf '%s\n' "Google Scholar data is unchanged."
else
  git -C "${results}" commit -m "Update Google Scholar statistics"
  git -C "${results}" push \
    "git@github.com:${repository}.git" HEAD:google-scholar-stats --force
  printf '%s\n' "Google Scholar data pushed successfully."
fi

if command -v gh >/dev/null 2>&1; then
  gh workflow run deploy.yml --repo "${repository}" --ref main
  printf '%s\n' "Website deployment triggered."
else
  printf '%s\n' \
    "GitHub CLI is unavailable. Run: gh workflow run deploy.yml --repo ${repository} --ref main"
fi
