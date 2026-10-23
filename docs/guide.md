# Academic Homepage User Guide

[中文](guide_zh.md) · [README](../README.md)

For your first update, follow these six steps through to publication. For routine edits, start with the step you need.

## 1. Start the local preview

Prepare Ruby 3.2 and Node.js 24, then run these commands from the repository root:

```bash
bundle install
npm ci
npm run serve -- --livereload
```

Open http://127.0.0.1:4000. Once the homepage appears, leave this terminal running and continue editing files in your editor.

## 2. Update your profile and homepage content

Open [`_config.yml`](../_config.yml) and fill in the site URL, author details, and social links. Then update the English and Chinese introduction and research interests in [`_pages/about.md`](../_pages/about.md). After changing the configuration, stop and restart the preview command.

To update a section, open its file and add or edit records following the existing entries:

| What to update | File to open |
|----------------|--------------|
| News | [`_data/news.json`](../_data/news.json) |
| Education and internships | [`_data/education.json`](../_data/education.json), [`internship.json`](../_data/internship.json) |
| Honors and services | [`_data/honors.json`](../_data/honors.json), [`services.json`](../_data/services.json) |
| Venue rankings and impact factors | [`_data/venues.json`](../_data/venues.json) |
| Navigation | [`_data/navigation.yml`](../_data/navigation.yml) |

Chinese fields use the `_zh` suffix; homepage prose belongs in the `lang-en` and `lang-zh` blocks. Save and return to the browser to confirm that the content appears in the right section.

For a new open-source project, copy an existing card in `about.md` and update its description, links, and GitHub button's `repo`. Add the same `owner/repo` key to `_data/metrics/github_stars.json` with an initial value of `{"stars": null, "updated_at": null}`.

## 3. Add a paper

Put the paper image in `images/publications/` and its PDF in `assets/pubs/`. Open [`_data/publications.json`](../_data/publications.json) and add a record to the `journal`, `conference`, or `preprint` array.

For a journal paper, replace this example with your paper's details and choose a new, unique `id`:

```json
{
  "id": "zhang2026example",
  "citation": {
    "type": "article-journal",
    "title": "Example paper",
    "author": [
      ["Zhang", "Zaiyan"],
      ["Li", "Jie"]
    ],
    "container-title": "Journal Name",
    "issued": {"date-parts": [[2026]]},
    "URL": "https://example.com/paper"
  },
  "display": {
    "venue_key": "Journal",
    "badge": "Journal",
    "image": "images/publications/example.webp",
    "tags": ["Image Restoration"],
    "author_roles": {"corresponding": [2]},
    "links": [
      {"name": "PDF", "url": "assets/pubs/example.pdf"}
    ]
  }
}
```

Complete these fields:

1. Enter authors as `[family, given]` pairs in publication order. The example's `corresponding: [2]` marks the second author as corresponding; use `equal_contribution` for equal contributions.
2. Replace the example's `URL` field with `"DOI": "10.…"` if available; otherwise, fill in the paper's page URL. Conference papers use `type: "paper-conference"`.
3. Update the image and PDF paths, badge, and tags. To show venue metrics, set `venue_key` to the matching name in `venues.json`.
4. If the paper has a Scholar ID, add `scholar_id: "authorID:paperID"` at the record's top level to display its citation count.

For an imageless card, set `layout: "compact"` in `display`. To keep a paper hidden, set `visible: false`.

Save, then run these commands in another terminal:

```bash
npm run data:build
npm run citations:check
```

Return to the preview. Confirm that the paper appears in the correct category, check author order and corresponding-author markers, and click **Cite** to review the generated citation.

## 4. Refresh statistics when needed

Deployment refreshes Scholar and GitHub stars automatically. To update citations locally first, prepare Python 3.12 and run:

```bash
bash scripts/fetch-google-scholar.sh
```

On Windows, double-click `scripts\fetch-google-scholar.bat`. The first run prepares the Python environment and dependencies.

After the success message, open `_data/metrics/google_scholar.json` and check the total and update time. Include this snapshot in the commit in step 6 so deployment can use it if collection fails. The total comes from the Scholar profile's `citedby`, including papers not displayed on this website.

To also refresh GitHub stars locally, run:

```bash
python -m pip install -r scripts/requirements-scholar.txt
npm run data:refresh
```

You can authenticate GitHub requests with `GITHUB_TOKEN` or `GH_TOKEN`.

## 5. Review the preview

Switch between English and Chinese and between light and dark themes. Check the updated text, images, paper buttons, and **Cite** dialog. After editing papers again during preview, rerun `npm run data:build`.

For layout changes, start with the relevant styles in `_sass/`; edit page structure in `_includes/` and `_layouts/`. Save and confirm the result in the preview.

## 6. Commit and publish

For the first deployment, select **GitHub Actions** as the GitHub Pages build source in the repository settings and configure SSH deployment in the `server-production` environment. If deployment is already configured, proceed to the commit.

| Type | Settings |
|------|----------|
| Secrets | `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, `SSH_KNOWN_HOSTS`; optional `SSH_PORT` (default 22) |
| Variables | `SSH_DEPLOY_PATH`, `SSH_SITE_URL` |

Point the server's web root to `<SSH_DEPLOY_PATH>/current`.

Review and commit your changes:

```bash
git diff
git add .
git commit -m "Update homepage"
git push origin main
```

Open **Actions → Deploy website** on GitHub and wait for the build, GitHub Pages, and SSH deployment jobs to succeed. Visit both sites to confirm the update. The `commit` in `deploy-version.json` should match your new commit.

If a job fails, open the failed step's logs, correct the problem, and push the fix.
