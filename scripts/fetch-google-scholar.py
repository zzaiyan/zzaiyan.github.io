from datetime import datetime, timezone
import json
import os
import sys

from scholar_snapshot import SITE_SNAPSHOT, sync_site_snapshot


def main() -> None:
    from scholarly import scholarly

    current = json.loads(SITE_SNAPSHOT.read_text(encoding="utf-8"))
    scholar_id = os.environ.get("GOOGLE_SCHOLAR_ID") or current["scholar_id"]
    author = scholarly.search_author_id(scholar_id)
    scholarly.fill(author, sections=["basics", "indices", "counts", "publications"])
    author["publications"] = {
        publication["author_pub_id"]: publication
        for publication in author["publications"]
    }
    author["citedby_source"] = "profile"
    author["updated"] = datetime.now(timezone.utc).isoformat()
    snapshot = sync_site_snapshot(author)
    print(f"Google Scholar profile citations: {snapshot['citedby']}.")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"Scholar refresh failed: {error}", file=sys.stderr)
        sys.exit(1)
