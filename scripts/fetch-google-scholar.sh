#!/usr/bin/env bash
set -euo pipefail

trap 'printf "Scholar refresh failed. See the error above; the existing snapshot was kept.\n" >&2' ERR

repo_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
venv_dir="$repo_dir/.venv-scholar"
scholar_python="$venv_dir/bin/python"

if [[ ! -x "$scholar_python" ]]; then
  bootstrap_python="${SCHOLAR_PYTHON:-python3}"
  printf 'Creating the local Scholar Python environment...\n'
  "$bootstrap_python" -m venv "$venv_dir"
fi

printf 'Checking Scholar dependencies...\n'
"$scholar_python" -m pip install --disable-pip-version-check --quiet \
  -r "$repo_dir/scripts/requirements-scholar.txt"

printf 'Fetching Google Scholar statistics...\n'
"$scholar_python" -u "$repo_dir/scripts/fetch-google-scholar.py"
printf 'Snapshot ready: %s\n' "$repo_dir/_data/metrics/google_scholar.json"
printf 'Commit and push this file to main to update the deployment fallback.\n'
