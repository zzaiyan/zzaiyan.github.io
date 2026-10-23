from datetime import datetime
import json
import os
from pathlib import Path
import tempfile


SITE_SNAPSHOT = Path(__file__).resolve().parent.parent / "_data" / "metrics" / "google_scholar.json"


def validate_author(author: dict) -> None:
    if not isinstance(author, dict):
        raise ValueError("Invalid Google Scholar snapshot")
    if not isinstance(author.get("scholar_id"), str) or not author["scholar_id"]:
        raise ValueError("Missing Google Scholar author ID")
    if author.get("citedby_source") != "profile":
        raise ValueError("Snapshot must use the profile citedby total; rerun data:refresh")
    if type(author.get("citedby")) is not int or author["citedby"] < 0:
        raise ValueError("Invalid total citation count")
    if not isinstance(author.get("updated"), str):
        raise ValueError("Missing snapshot update time")
    updated = datetime.fromisoformat(author["updated"])
    if updated.tzinfo is None:
        raise ValueError("Snapshot update time must include a timezone")

    publications = author.get("publications")
    if not isinstance(publications, dict) or not publications:
        raise ValueError("Google Scholar returned no publications")
    for publication_id, publication in publications.items():
        if not isinstance(publication_id, str) or not publication_id:
            raise ValueError("Invalid publication ID")
        if not isinstance(publication, dict):
            raise ValueError(f"Invalid publication record: {publication_id}")
        citation_count = publication.get("num_citations", 0)
        if type(citation_count) is not int or citation_count < 0:
            raise ValueError(f"Invalid publication citation count: {publication_id}")


def write_json_atomically(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    handle = tempfile.NamedTemporaryFile(
        mode="w",
        encoding="utf-8",
        dir=path.parent,
        prefix=f".{path.name}.",
        delete=False,
    )
    temporary_path = Path(handle.name)
    try:
        with handle:
            json.dump(data, handle, ensure_ascii=False, indent=2)
            handle.write("\n")
        os.replace(temporary_path, path)
    finally:
        temporary_path.unlink(missing_ok=True)


def sync_site_snapshot(author: dict, destination: Path = SITE_SNAPSHOT) -> dict:
    validate_author(author)
    snapshot = {
        "scholar_id": author["scholar_id"],
        "citedby": author["citedby"],
        "citedby_source": "profile",
        "updated": author["updated"],
        "publications": {
            publication_id: {"num_citations": publication.get("num_citations", 0)}
            for publication_id, publication in author["publications"].items()
        },
    }
    if destination.exists():
        try:
            current = json.loads(destination.read_text(encoding="utf-8"))
            validate_author(current)
            if current == snapshot:
                return current
            if (
                current["scholar_id"] == snapshot["scholar_id"]
                and datetime.fromisoformat(current["updated"])
                > datetime.fromisoformat(snapshot["updated"])
            ):
                return current
        except (ValueError, KeyError, TypeError):
            pass
    write_json_atomically(destination, snapshot)
    return snapshot
