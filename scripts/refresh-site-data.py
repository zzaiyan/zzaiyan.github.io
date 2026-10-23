import json
from pathlib import Path
import re
import subprocess
import sys

from scholar_snapshot import SITE_SNAPSHOT, validate_author


ROOT = Path(__file__).resolve().parent.parent


def refresh(label: str, command: list[str], timeout: int) -> None:
    print(f"Refreshing {label}...", flush=True)
    try:
        subprocess.run(command, cwd=ROOT, check=True, timeout=timeout)
    except (OSError, subprocess.SubprocessError) as error:
        print(
            f"Warning: {label} refresh failed ({error}); keeping the _data snapshot.",
            file=sys.stderr,
            flush=True,
        )


def main() -> None:
    refresh(
        "Google Scholar",
        [sys.executable, str(ROOT / "scripts" / "fetch-google-scholar.py")],
        timeout=120,
    )
    refresh(
        "GitHub stars",
        ["node", "--use-env-proxy", str(ROOT / "scripts" / "fetch-github-stars.mjs")],
        timeout=75,
    )

    scholar = json.loads(SITE_SNAPSHOT.read_text(encoding="utf-8"))
    validate_author(scholar)
    stars = json.loads((ROOT / "_data" / "github_stars.json").read_text(encoding="utf-8"))
    if not isinstance(stars, dict) or not stars:
        raise ValueError("Missing GitHub stars snapshot")
    for repo, entry in stars.items():
        if (
            not re.fullmatch(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", repo)
            or not isinstance(entry, dict)
            or "stars" not in entry
            or (
                entry.get("stars") is not None
                and (type(entry["stars"]) is not int or entry["stars"] < 0)
            )
        ):
            raise ValueError(f"Invalid GitHub stars snapshot entry: {repo}")
    print(f"Site data ready: {scholar['citedby']} profile citations, {len(stars)} repositories.")


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(f"Site data validation failed: {error}", file=sys.stderr)
        sys.exit(1)
