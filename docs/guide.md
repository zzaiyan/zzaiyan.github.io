# Academic Homepage Template — User Guide

This project is a personal academic homepage built with Jekyll + GitHub Pages. Structured content is centrally stored as JSON files in `_data/`, then rendered to static HTML at build time via Liquid templates. Citation counts and visitor statistics are optional asynchronous enhancements.
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
│   ├── head.html            # <head> tag (includes flash-prevention inline script)
│   ├── scripts.html         # JS includes (inlines generated citation data)
│   ├── footer.html          # Footer
│   ├── sidebar.html         # Sidebar
│   ├── author-profile.html  # Author avatar & social links (bilingual)
│   ├── masthead.html        # Top nav bar (includes lang/theme toggle buttons)
│   ├── seo.html             # SEO meta tags
│   ├── analytics.html       # Google Analytics
│   └── fetch_google_scholar_stats.html  # Google Scholar citation stats
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
│   └── csl/                 # Local IEEE and GB/T 7714 styles
├── package.json             # Citation generation dev dependencies
└── google_scholar_crawler/  # Google Scholar crawler
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
    "image": "images/institutions/ailab-logo.webp",
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

Markdown syntax supported.

```json
[
  { "year": "2023", "content": "**National Scholarship** | **国家奖学金**" },
  { "year": "2023", "content": "**Huawei Scholarship** [[link]](url)" }
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

A language toggle button (EN / 中文) is displayed in the top-right of the nav bar. The preference is persisted in `localStorage`.

### How it works

- The `data-lang` attribute on `<html>` switches between `"en"` and `"zh"`
- CSS rule `html[data-lang="en"] .lang-zh { display: none }` (and vice versa) controls visibility
- `_includes/head.html` contains a flash-prevention inline script that sets `data-lang` before CSS loads
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

A theme toggle button (🌙 / ☀) is displayed next to the language button. The preference is persisted in `localStorage`.

### How it works

- The `data-theme` attribute on `<html>` switches between `"light"` and `"dark"`
- `_sass/_dark-mode.scss` contains the `html[data-theme="dark"] { ... }` overrides for component colors
- `_includes/head.html` contains a flash-prevention inline script that sets `data-theme` before CSS loads
- `assets/js/lang-toggle.js` handles both language and theme toggles and persistence

## Multi-Format Citation Dialog

`_data/citation_outputs.json` is inlined into a `<script>` tag at build time (via `scripts.html`). `citation-dialog.js` binds all `#citation-*` links on page load. Clicking a `Cite` link opens a dialog supporting:

- BibTeX, RIS, CSL-JSON, IEEE, APA, and GB/T 7714 formats
- One-click copy to clipboard
- Downloads for machine-readable formats
- Close with ESC key or by clicking the backdrop
- Keep the page scrollbar available while the dialog is open
- Restore focus to the originating `Cite` link without changing the current page position

The dialog panel uses a translucent Mica-like material with `backdrop-filter: blur(16px) saturate(2) contrast(0.96)`. Its panel and code-area backgrounds remain semi-transparent so the blurred page structure is visible through the dialog. Scrolling over the citation content scrolls that content first; scrolling over the surrounding backdrop continues to scroll the page.

## Google Scholar Citation Stats

1. Install the local `scholarly` dependencies and configure SSH push access to GitHub.
2. Run `google_scholar_crawler/git_update.bat` on Windows or `google_scholar_crawler/git_update.sh` in WSL. The WSL script expects `google_scholar_crawler/.venv/bin/python`; the Windows batch file uses the `python` available in the active Windows environment.
3. The scripts validate the result, update the local `results/` snapshot, and push it to the `google-scholar-stats` branch only when the data changes.
4. If GitHub CLI is available, the script triggers `deploy.yml`. If it is unavailable, the statistics branch is still updated, but the website is not rebuilt until you manually run `gh workflow run deploy.yml --repo zzaiyan/zzaiyan.github.io --ref main` or push another `main` commit.
5. Fill in the `scholarId` field for each paper entry in `_data/pubs.json`.

Citation counts are fetched asynchronously by `fetch_google_scholar_stats.html` after the DOM is ready. The loader first requests the same-origin snapshot with a build-version query, then tries the configured CDN URLs and raw GitHub source as fallbacks. Each URL has a four-second timeout, so rendering is never blocked.

Google Scholar applies strict limits to automated access, so the crawler intentionally runs locally. Failed crawls never replace the last valid result; the website continues serving the last successfully deployed snapshot.

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

Citation dialog styles, including material transparency, backdrop filtering, the animated halo, and responsive sizing, are in `_sass/_citation-dialog.scss`. Dialog behavior and focus restoration are implemented in `assets/js/citation-dialog.js`.

`assets/css/main.scss` is only the compilation entry. Site-specific partials are imported after the base theme in dependency order: component foundations, homepage sections, site controls, and finally `_dark-mode.scss`. Keep dark-mode rules in the final partial so theme overrides cannot be replaced by later base component rules.

## Global Config (_config.yml)

| Key | Description |
|-----|-------------|
| `title` | Site title |
| `url` / `baseurl` | Canonical origin and optional deployment subpath |
| `description` / `description_zh` | Site description (bilingual) |
| `seo_title` / `seo_description` | Search and social metadata |
| `repository` | GitHub repo (`user/repo`) |
| `google_scholar_stats_use_cdn` | Enable CDN fallbacks after the same-origin Scholar snapshot |
| `google_scholar.*` | Scholar ID, stats branch/file, CDN list, and raw GitHub fallback |
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
| Citation counts missing | Confirm `google-scholar-stats` branch has data |
| Stats branch updated but the website still shows old counts | Trigger `deploy.yml`; pushing the stats branch alone does not run the website workflow |
| Markdown not rendering | Ensure quotes in JSON strings are properly escaped |
| Nav items disappear after language switch | Confirm `jquery.greedy-navigation.js` exposes `resetGreedyNav` |
| Dark mode flash on load | Confirm flash-prevention inline script exists in `head.html` |
