# Academic Homepage Template — User Guide

This project is a personal academic homepage built with Jekyll + GitHub Pages. Structured content and citation snapshots are centrally stored as JSON files in `_data/`, then rendered to static HTML at build time via Liquid templates. Visitor statistics load asynchronously.
It supports **bilingual (EN / ZH) switching** and **dark / light theme toggling**.

> 📖 [中文版文档](guide_zh.md)

## Directory Structure

```
.
├── _config.yml              # Jekyll global config (title, author info, bilingual fields, etc.)
├── _data/
│   ├── pubs.json            # Publications & patents
│   ├── references.json      # Canonical CSL-JSON citation metadata
│   ├── citation_outputs.json # Generated citation formats
│   ├── news.json            # News items (with content_zh bilingual field)
│   ├── education.json       # Education history (with degree_zh / major_zh bilingual fields)
│   ├── internship.json      # Internship history (with bilingual fields)
│   ├── honors.json          # Honors & awards
│   ├── services.json        # Academic service groups and bilingual entries
│   ├── github_stars.json    # Repository star counts and fetch timestamps
│   ├── google_scholar.json  # Scholar profile total and per-paper citations
│   ├── venues.json          # Journal/conference rankings & IF
│   └── navigation.yml       # Nav menu (with title_zh bilingual field)
├── _layouts/
│   └── default.html         # Page layout template
├── _includes/
│   ├── publications.html    # Publications card Liquid template
│   ├── news.html            # News list Liquid template (bilingual)
│   ├── education.html       # Education Liquid template (bilingual)
│   ├── internship.html      # Internship Liquid template (bilingual)
│   ├── honors.html          # Honors Liquid template
│   ├── services.html        # Academic service Liquid template (bilingual)
│   ├── github-repo-button.html # GitHub button with star count
│   ├── head.html            # <head> tag (SEO meta, styles)
│   ├── scripts.html         # JS includes (inlines generated citation data)
│   ├── footer.html          # Footer
│   ├── sidebar.html         # Sidebar
│   ├── author-profile.html  # Author avatar & social links (bilingual)
│   ├── masthead.html        # Top nav bar (includes lang/theme toggle buttons)
│   ├── seo.html             # SEO meta tags
│   ├── analytics.html       # Google Analytics
│   └── google-scholar-badge.html # Build-time Scholar citation badge
├── _pages/
│   └── about.md             # Homepage content (bilingual div blocks + Liquid includes)
├── _sass/                   # SCSS source files
│   ├── _masthead.scss       # Navigation bar styles
│   ├── _citation-dialog.scss # Citation dialog styles
│   ├── _publication-cards.scss # Publication, education, and internship cards
│   ├── _homepage-sections.scss # Anchors, news, timeline, and misc sections
│   ├── _site-controls.scss  # Language visibility and masthead controls
│   ├── _dark-mode.scss      # Site-wide dark theme overrides
│   └── ...
├── assets/
│   ├── css/main.scss        # SCSS entry and ordered partial imports
│   ├── pubs/                # Publication PDF files
│   └── js/
│       ├── lang-toggle.js   # Language toggle + theme toggle logic
│       └── citation-dialog.js # Citation dialog
├── images/                  # Image assets grouped by purpose
│   ├── profile/             # Avatar and profile images
│   ├── institutions/        # Institution logos
│   ├── publications/        # Publication figures
│   └── site/                # Favicons and web app icons
├── scripts/
│   ├── build-citations.mjs  # Offline citation format generator
│   ├── fetch-github-stars.mjs # GitHub star snapshot collector
│   ├── fetch-google-scholar.py # Scholar profile citation collector
│   ├── refresh-site-data.py # Shared local/deployment refresh entry
│   ├── scholar_snapshot.py  # Scholar validation and atomic writes
│   ├── requirements-scholar.txt # Scholar Python dependencies
│   └── csl/                 # Local IEEE and GB/T 7714 styles
└── package.json             # Data refresh commands and citation dependencies
```

## Data-Driven Architecture

All content sections are defined by JSON files in `_data/`. Liquid templates in `_includes/` read the data and produce static HTML at build time. `about.md` contains only static prose (bio, etc.) and `{% raw %}{% include xxx.html %}{% endraw %}` calls.

| Section | Data file | Template |
|---------|-----------|----------|
| Publications | `_data/pubs.json` | `_includes/publications.html` |
| Citations | `_data/references.json` + `_data/citation_outputs.json` | Inlined via `_includes/scripts.html` |
| News | `_data/news.json` | `_includes/news.html` |
| Education | `_data/education.json` | `_includes/education.html` |
| Internship | `_data/internship.json` | `_includes/internship.html` |
| Honors | `_data/honors.json` | `_includes/honors.html` |
| Services | `_data/services.json` | `_includes/services.html` |
| GitHub stars | `_data/github_stars.json` | `_includes/github-repo-button.html` |
| Scholar citations | `_data/google_scholar.json` | `_includes/google-scholar-badge.html`, `_includes/publication-card.html` |
| Venues | `_data/venues.json` | Referenced in `_includes/publications.html` |

## Data File Formats

### _data/pubs.json — Publications & Patents

Supports four categories: `journal`, `conference`, `preprint`, `patent`. A section is automatically hidden if its array is empty.

```json
{
  "journal": [
    {
      "id": "zhang2024multi",
      "title": "Paper Title",
      "venue": "Full Journal Name",
      "venueShort": "Abbrev.",
      "year": 2025,
      "badge": "Badge text shown top-left of card",
      "image": "images/publications/teaser.webp",
      "doi": "DOI URL (or null)",
      "note": "Notes (quartile, IF, keywords, etc.)",
      "scholarId": "Google Scholar Paper ID (for citation count)",
      "links": [
        { "name": "PDF", "url": "assets/pubs/xxx.pdf" },
        { "name": "Code", "url": "https://github.com/xxx" }
      ],
      "referenceKey": "key matching references.json",
      "authorRoles": {
        "equalContribution": [1, 2],
        "corresponding": [2]
      }
    }
  ],
  "conference": [ ... ],
  "preprint": [ ... ],
  "patent": [
    {
      "date": "2025.02",
      "number": "ZL202410556414.6",
      "title": "Patent Title",
      "authors": ["Inventor One", "Inventor Two"]
    }
  ]
}
```

### _data/references.json — Canonical Citation Metadata

```json
{
  "zhang2024multi": {
    "id": "zhang2024multi",
    "type": "article-journal",
    "title": "Paper Title",
    "author": [{ "family": "Zhang", "given": "Zaiyan" }],
    "container-title": "Journal Name",
    "issued": { "date-parts": [[2025]] }
  }
}
```

Each key must match the `referenceKey` field in `pubs.json`. Generated formats must not be edited by hand.

Publication author names and order come from `references.json`. Positions in `authorRoles` are 1-based: `equalContribution` adds `†`, and `corresponding` adds `*`. The author matching `author.citation_name` in `_config.yml` is underlined automatically and does not need a manual marker in `pubs.json`.

Omit `layout` for a full card with a teaser image. Set `"layout": "compact"` for a smaller card without an image.

### Citation Format Generation

Run the local generator after changing `references.json`:

```bash
npm install
npm run citations:build
npm run citations:check
```

The generator writes BibTeX, RIS, CSL-JSON, IEEE, APA, and GB/T 7714 output to `_data/citation_outputs.json`. The browser only reads this generated static file, so no citation library or CDN is required at runtime.

### _data/news.json — News Items

Supports Markdown syntax and an optional `content_zh` field for Chinese translation.

```json
[
  {
    "date": "2025.09",
    "emoji": "🎉🎉",
    "content": "Our work \"**_Paper Title_**\" was accepted by **Journal**.",
    "content_zh": "我们的论文「**_标题_**」被 **期刊** 录用。"
  }
]
```

| Field | Required | Description |
|-------|----------|-------------|
| `date` | Yes | Date string |
| `content` | Yes | English content (Markdown supported) |
| `content_zh` | No | Chinese content; falls back to `content` if omitted |
| `emoji` | No | Emoji displayed after the date |

### _data/education.json — Education History

Supports bilingual fields `degree_zh`, `major_zh`, `advisors_zh`.

```json
[
  {
    "school": "Wuhan University | 武汉大学",
    "url": "https://www.whu.edu.cn/",
    "image": "images/institutions/whu.webp",
    "degree": "Master of Engineering",
    "degree_zh": "工学硕士",
    "major": "Photogrammetry and Remote Sensing",
    "major_zh": "摄影测量与遥感",
    "period": "2025.09 - Present",
    "advisors": "Prof. [Qiangqiang Yuan](...)",
    "advisors_zh": "[袁强强](...)教授"
  }
]
```

### _data/internship.json — Internship History

Internship cards use the same image layout as education cards and support bilingual fields for the department, role, period, and hosts.

```json
[
  {
    "organization": "Shanghai AI Laboratory | 上海人工智能实验室",
    "url": "https://www.shlab.org.cn/",
    "image": "images/institutions/ailab.webp",
    "department": "AI4Science Center",
    "department_zh": "AI4Science 中心",
    "role": "Research Intern",
    "role_zh": "研究实习生",
    "period": "2026.07 - Present",
    "period_zh": "2026.07 - 至今",
    "hosts": "Dr. [Hao Chen](https://justchenhao.github.io)",
    "hosts_zh": "[陈浩](https://justchenhao.github.io) 博士"
  }
]
```

### _data/honors.json — Honors & Awards

Markdown syntax is supported. Use `content_zh` for Chinese text. English and Chinese are joined with ` | ` and wrap naturally. Entries without a translation show only English. An optional `url` adds a single `[link]` source link after both names. Entries are grouped by four-digit year in descending order, sharing one timeline node per year. Awards within each year retain their data-file order.

```json
[
  { "year": "2023", "content": "**National Scholarship**", "content_zh": "**国家奖学金**" },
  { "year": "2023", "content": "**Huawei Scholarship**", "content_zh": "**华为奖学金**", "url": "https://example.com/award" }
]
```

### _data/services.json — Academic Service

Groups and entries follow their data-file order; empty groups are hidden. Use `title` / `title_zh` for group headings and `name` / `name_zh` within `items` for service names. Text follows the site language toggle, with missing Chinese translations falling back to English. Names are plain text without trailing periods; the template adds punctuation.

Like Patents, Services uses native Markdown level-two headings and single-column lists. Bullets, indentation, and spacing inherit the site's base styles.

```json
[
  {
    "title": "Reviewer",
    "title_zh": "审稿人",
    "items": [
      {
        "name": "IEEE Transactions on Industrial Informatics (TII)",
        "name_zh": "IEEE 工业信息学汇刊 (TII)"
      }
    ]
  }
]
```

### _data/venues.json — Journal/Conference Rankings

Each key is the venue abbreviation used in `venueShort` field of `pubs.json`. The rank and IF are displayed inline in journal/conference paper entries.

```json
{
  "ISPRS J PRS": {
    "rank": "中科院一区 Top",
    "IF": 12.2
  },
  "IEEE TGRS": {
    "rank": "中科院一区 Top",
    "IF": 8.6
  }
}
```

### _data/navigation.yml — Navigation Menu

Each entry accepts a `title_zh` field shown in Chinese mode.

```yaml
main:
  - title: "Publications"
    title_zh: "论文"
    url: "/#publications"
```

## Bilingual (EN / ZH) Toggle

A language toggle button (EN / 中文) is displayed in the top-right of the nav bar. Every visit starts from the default English; the choice is not persisted.

### How it works

- The `data-lang` attribute on `<html>` switches between `"en"` and `"zh"`
- CSS rule `html[data-lang="en"] .lang-zh { display: none }` (and vice versa) controls visibility
- `assets/js/lang-toggle.js` handles the toggle logic and recalculates nav bar widths after switching

### Adding bilingual content in about.md

```html
<div class="lang-en" markdown="1">
English content here.
</div>

<div class="lang-zh" markdown="1">
中文内容写在这里。
</div>
```

Section headings example:

```markdown
# <span class="lang-en">🔥 News</span><span class="lang-zh">🔥 新闻动态</span>
{: #news}
```

### Bilingual fields in _config.yml

```yaml
description: "Building AI for open-world Earth observation."
description_zh: "构建面向开放世界地球观测的人工智能。"
seo_title: "Zaiyan Zhang (张再筵) | Intelligent Earth Observation"
seo_description: "Academic homepage of Zaiyan Zhang (张再筵), focusing on remote sensing image processing, open-world interpretation, multimodal foundation models, and AI agents for scientific discovery."

author:
  name: "Zaiyan Zhang"
  name_zh: "张再筵"
  citation_name:
    given: "Zaiyan"
    family: "Zhang"
  bio: "Wuhan University"
  bio_zh: "武汉大学"
  location: "Wuhan, China"
  location_zh: "中国，武汉"
```

## Dark / Light Theme Toggle

A theme toggle button (🌙 / ☀) is displayed next to the language button. Every visit starts from the default light theme; the choice is not persisted.

### How it works

- The `data-theme` attribute on `<html>` switches between `"light"` and `"dark"`
- `_sass/_dark-mode.scss` contains the `html[data-theme="dark"] { ... }` overrides for component colors
- `assets/js/lang-toggle.js` handles both language and theme toggles

## Multi-Format Citation Dialog

`_data/citation_outputs.json` is inlined into a `<script>` tag at build time (via `scripts.html`). `citation-dialog.js` binds all `#citation-*` links on page load. Clicking a `Cite` link opens a dialog supporting:

- BibTeX, RIS, CSL-JSON, IEEE, APA, and GB/T 7714 formats
- One-click copy to clipboard
- Downloads for machine-readable formats
- Close with ESC key or by clicking the backdrop
- Keep the page scrollbar available while the dialog is open
- Restore focus to the originating `Cite` link without changing the current page position

The dialog panel uses a translucent Mica-like material with `backdrop-filter: blur(16px) saturate(2) contrast(0.96)`. Its panel and code-area backgrounds remain semi-transparent so the blurred page structure is visible through the dialog. Scrolling over the citation content scrolls that content first; scrolling over the surrounding backdrop continues to scroll the page.

## Unified Statistics Refresh

Deployment refreshes Google Scholar citations and GitHub stars into `_data/google_scholar.json` and `_data/github_stars.json` before Jekyll renders the page. All snapshots live in `_data/`. The `google-scholar-stats` branch remains as history and is no longer read or written by the refresh or deployment flow.

Use the same entry point locally. Prepare Node.js 24 and Python 3.12, then install dependencies in the active Python environment:

```bash
python -m pip install -r scripts/requirements-scholar.txt
npm run data:refresh
```

`refresh-site-data.py` runs both collectors in sequence. Scholar has a 120-second timeout; star collection has a 75-second timeout. A failed source keeps its existing snapshot while the other source still runs. Both snapshots are validated afterward; the build stops only if valid fallback data is unavailable. A running Jekyll server rebuilds when `_data` changes.

Deployment installs the Python dependencies and uses the built-in Actions `GITHUB_TOKEN` for GitHub requests. Locally, set `GITHUB_TOKEN` or `GH_TOKEN` for authentication if needed. Existing proxy environment variables are honored. Tokens remain in the collectors and never enter snapshots or pages.

Refreshed data ships with the static site artifact. Committed snapshots provide the fallback and can also be refreshed and committed locally.

## Google Scholar Citation Stats

The total comes directly from the Google Scholar author's profile `citedby`, including citations to papers not displayed on this website. It is never calculated by summing individual papers. `citedby_source: "profile"` identifies this contract; legacy summed snapshots are rejected.

`fetch-google-scholar.py` writes only `_data/google_scholar.json`: the Scholar ID, total, fetch timestamp, and citation counts for all returned publications. It creates no separate results or badge-data copies. The author ID defaults to the snapshot's ID and can be overridden with `GOOGLE_SCHOLAR_ID`.

Badges and paper cards read the snapshot at build time. Papers match through `scholarId` in `_data/pubs.json`. Zero or missing paper counts stay hidden. An unavailable total displays `...`, while a genuine zero total displays `0`. Browsers make no statistics JSON, CDN, or GitHub Raw requests.

## GitHub Star Counts

Open-source project buttons display `GitHub ★ count` and link to the repository. Jekyll renders counts from `_data/github_stars.json` at build time, so visitors make no GitHub API requests. The tooltip shows the last successful fetch time in UTC, and the button follows the site's light/dark theme.

Star counts refresh through the shared `npm run data:refresh` entry point described above. The collector reads the repository list from the snapshot and fetches `stargazers_count` from the GitHub REST API.

A genuine zero displays `0`; `stars: null` means no data yet and shows only the GitHub button. Timeouts, invalid responses, and rate limits retain each repository's existing snapshot. Authentication failures and rate limits stop further requests. If every request fails, the file is left untouched.

To add a project, add an entry to `_data/github_stars.json` and use the shared button in its card:

```json
"owner/repo": { "stars": null, "updated_at": null }
```

```liquid
{% raw %}{% include github-repo-button.html repo="owner/repo" %}{% endraw %}
```

## Resource Loading

- Local behavior scripts use `defer` and preserve their document order.
- MathJax is loaded only on pages whose front matter contains `mathjax: true`.
- Google Analytics is emitted only when `google_analytics_id` is configured.
- VisitorTrace is loaded with an asynchronous `map.js` script. The widget is rendered by VisitorTrace; its size and appearance are configured in the VisitorTrace service rather than hard-coded in this repository.
- The footer's last-updated date uses Jekyll's build time and does not call the GitHub API at runtime.

## Adding a New Paper — Full Workflow

1. Add an entry to the appropriate category (`journal` / `conference` / `preprint`) in `_data/pubs.json`
2. Add structured citation metadata to `_data/references.json` (key must match `referenceKey`)
3. Run `npm run citations:build && npm run citations:check`
4. Optionally place the PDF in `assets/pubs/`
5. Push to GitHub

## Style Customization

| Variable | File | Default | Description |
|----------|------|---------|-------------|
| `$card-padding` | `_publication-cards.scss` | 1.1em | Shared card inner padding |
| `$paper-box-image-width` | `_publication-cards.scss` | 360px | Base featured-paper image width |
| `$edu-box-image-width` | `_publication-cards.scss` | 240px | Base education/internship image width |
| `--card-image-share` | `_publication-cards.scss` | 36% / 28% | Responsive image-column share for featured / education cards |

Citation dialog styles, including material transparency, backdrop filtering, and responsive sizing, are in `_sass/_citation-dialog.scss`. Dialog behavior and focus restoration are implemented in `assets/js/citation-dialog.js`.

`assets/css/main.scss` is only the compilation entry. Site-specific partials are imported after the base theme in dependency order: component foundations, homepage sections, site controls, and finally `_dark-mode.scss`. Keep dark-mode rules in the final partial so theme overrides cannot be replaced by later base component rules.

## Global Config (_config.yml)

| Key | Description |
|-----|-------------|
| `title` | Site title |
| `url` / `baseurl` | Canonical origin and optional deployment subpath |
| `description` / `description_zh` | Site description (bilingual) |
| `seo_title` / `seo_description` | Search and social metadata |
| `repository` | GitHub repo (`user/repo`) |
| `google_scholar.id` | Scholar author ID used to match the snapshot to the badge |
| `visitor_trace.base_url` / `visitor_trace.site_id` | VisitorTrace widget endpoint and site identifier |
| `google_analytics_id` | Google Analytics ID |
| `author.name` / `author.name_zh` | Author name (bilingual) |
| `author.citation_name` | Given/family name used to identify and underline the site author's name in publication cards |
| `author.bio` / `author.bio_zh` | Author bio (bilingual) |
| `author.location` / `author.location_zh` | Location (bilingual) |
| `author.*` | Social links (email, github, googlescholar, etc.) |

## Local Development

```bash
bundle install
bundle exec jekyll serve --livereload
```

Open http://127.0.0.1:4000 in your browser. Remove `--livereload` if browser auto-refresh is not needed.

## Deployment

Pushing `main` triggers `.github/workflows/deploy.yml`. The workflow builds `_site` once, then deploys the same artifact to GitHub Pages and an SSH-accessible web server. The custom domain is the canonical URL, while the GitHub Pages URL remains an independently accessible mirror.

The SSH deployment uses the `server-production` environment. Configure `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, and `SSH_KNOWN_HOSTS` as secrets; `SSH_PORT` is optional and defaults to 22. Configure `SSH_DEPLOY_PATH` (for example, `/www/wwwroot/acadhome`) and `SSH_SITE_URL` (for example, `https://example.com`) as environment variables. Releases are uploaded to `<SSH_DEPLOY_PATH>/releases/<commit-sha>` and activated atomically through the `<SSH_DEPLOY_PATH>/current` symlink. Configure the web server's document root to use that `current` symlink.

Each artifact contains `deploy-version.json`. The SSH server job verifies this endpoint after activation. To roll back, point `current` to a previous directory under `releases/`.

## Troubleshooting

| Problem | Check |
|---------|-------|
| Publication cards not showing | Validate `_data/pubs.json` JSON syntax |
| Citation dialog not opening | Verify the key exists in `_data/citation_outputs.json` and run `npm run citations:build` |
| Citation counts missing | Check `_data/google_scholar.json` and the author ID; a successful crawl synchronizes the local snapshot |
| Statistics are stale | Inspect the deployment Refresh site data logs to see whether a fallback snapshot was used |
| Markdown not rendering | Ensure quotes in JSON strings are properly escaped |
| Nav items disappear after language switch | Confirm `jquery.greedy-navigation.js` exposes `resetGreedyNav` |
