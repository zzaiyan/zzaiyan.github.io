from datetime import datetime
import json
import os
from pathlib import Path
import tempfile

from scholarly import scholarly


ROOT = Path(__file__).resolve().parent
RESULTS = ROOT / "results"
SCHOLAR_ID = os.environ.get("GOOGLE_SCHOLAR_ID", "ZpxXejIAAAAJ")


def validate_author(author: dict) -> None:
    publications = author.get("publications")
    citedby = author.get("citedby")
    if not isinstance(publications, dict) or not publications:
        raise ValueError("Google Scholar returned no publications")
    if type(citedby) is not int or citedby < 0:
        raise ValueError("Invalid total citation count")

    for publication_id, publication in publications.items():
        citation_count = publication.get("num_citations", 0)
        if not publication_id or type(citation_count) is not int or citation_count < 0:
            raise ValueError(f"Invalid publication record: {publication_id}")


def without_timestamp(data: dict) -> dict:
    comparable = dict(data)
    comparable.pop("updated", None)
    return comparable


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
            json.dump(data, handle, ensure_ascii=False)
        os.replace(temporary_path, path)
    finally:
        temporary_path.unlink(missing_ok=True)


author: dict = scholarly.search_author_id(SCHOLAR_ID)
scholarly.fill(author, sections=["basics", "indices", "counts", "publications"])
author = json.loads(json.dumps(author, ensure_ascii=False))
author["citedby"] = sum(
    publication.get("num_citations", 0) for publication in author["publications"]
)
author["publications"] = {
    publication["author_pub_id"]: publication
    for publication in author["publications"]
}
validate_author(author)
author["updated"] = datetime.now().astimezone().isoformat()

stats_path = RESULTS / "gs_data.json"
previous = None
if stats_path.exists():
    try:
        previous = json.loads(stats_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        print("Existing Scholar data is invalid; replacing it.")

if previous is not None and without_timestamp(previous) == without_timestamp(author):
    print(f"No Google Scholar data changes for {SCHOLAR_ID}.")
else:
    write_json_atomically(stats_path, author)
    print(json.dumps(author, ensure_ascii=False))

shieldio_data = {
    "schemaVersion": 1,
    "label": "citations",
    "message": str(author["citedby"]),
}
write_json_atomically(RESULTS / "gs_data_shieldsio.json", shieldio_data)
