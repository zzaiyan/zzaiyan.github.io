# Academic Homepage Template — User Guide

This project is a personal academic homepage built with Jekyll + GitHub Pages. All content is centrally stored as JSON files in `_data/`, rendered to static HTML at build time via Liquid templates — no client-side loading delay.  
It supports **bilingual (EN / ZH) switching** and **dark / light theme toggling**.

> 📖 [中文版文档](guide_zh.md)

## Directory Structure

```
.
├── _config.yml              # Jekyll global config (title, author info, bilingual fields, etc.)
├── _data/
│   ├── pubs.json            # Publications & patents
│   ├── bibtex.json          # BibTeX citation entries
│   ├── news.json            # News items (with content_zh bilingual field)
│   ├── education.json       # Education history (with degree_zh / major_zh bilingual fields)
│   ├── honors.json          # Honors & awards
│   └── navigation.yml       # Nav menu (with title_zh bilingual field)
├── _layouts/
│   └── default.html         # Page layout template
├── _includes/
│   ├── publications.html    # Publications card Liquid template
│   ├── news.html            # News list Liquid template (bilingual)
│   ├── education.html       # Education Liquid template (bilingual)
│   ├── honors.html          # Honors Liquid template
│   ├── head.html            # <head> tag (includes flash-prevention inline script)
│   ├── scripts.html         # JS includes (inlines BibTeX data at build time)
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
│   ├── _bibtex-citation.scss # BibTeX modal styles
│   └── ...
├── assets/
│   ├── css/main.scss        # SCSS entry (includes dark mode & bilingual CSS)
│   ├── pubs/                # Publication PDF files
│   └── js/
│       ├── lang-toggle.js   # Language toggle + theme toggle logic
│       ├── bibtex-citation.js # BibTeX citation modal
│       └── last-update.js   # Auto last-updated timestamp
├── images/                  # Image assets
└── google_scholar_crawler/  # Google Scholar crawler
```

## Data-Driven Architecture

All content sections are defined by JSON files in `_data/`. Liquid templates in `_includes/` read the data and produce static HTML at build time. `about.md` contains only static prose (bio, etc.) and `{% raw %}{% include xxx.html %}{% endraw %}` calls.

| Section | Data file | Template |
|---------|-----------|----------|
| Publications | `_data/pubs.json` | `_includes/publications.html` |
| BibTeX | `_data/bibtex.json` | Inlined via `_includes/scripts.html` |
| News | `_data/news.json` | `_includes/news.html` |
| Education | `_data/education.json` | `_includes/education.html` |
| Honors | `_data/honors.json` | `_includes/honors.html` |

## Data File Formats

### _data/pubs.json — Publications & Patents

Supports four categories: `journal`, `conference`, `preprint`, `patent`. A section is automatically hidden if its array is empty.

```json
{
  "journal": [
    {
      "id": "zhang2024multi",
      "title": "Paper Title",
      "authors": "<strong><u>First Author</u></strong>, Other Authors",
      "venue": "Full Journal Name",
      "venueShort": "Abbrev.",
      "year": 2025,
      "badge": "Badge text shown top-left of card",
      "image": "URL to teaser image",
      "doi": "DOI URL (or null)",
      "note": "Notes (quartile, IF, keywords, etc.)",
      "scholarId": "Google Scholar Paper ID (for citation count)",
      "links": [
        { "name": "PDF", "url": "assets/pubs/xxx.pdf" },
        { "name": "Code", "url": "https://github.com/xxx" }
      ],
      "bibtexKey": "key matching bibtex.json"
    }
  ],
  "conference": [ ... ],
  "preprint": [ ... ],
  "patent": [
    {
      "date": "2025.02",
      "number": "ZL202410556414.6",
      "title": "Patent Title",
      "authors": "Inventor list"
    }
  ]
}
```

### _data/bibtex.json — BibTeX Entries

```json
{
  "zhang2024multi": "@article{zhang2024multi,\n  author = {...},\n  ...}",
  "zhang2026task": "@article{zhang2026task,\n  ...}"
}
```

Each key must match the `bibtexKey` field in `pubs.json`.

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
    "image": "images/whu.png",
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

### _data/honors.json — Honors & Awards

Markdown syntax supported.

```json
[
  { "year": "2023", "content": "**National Scholarship** | **国家奖学金**" },
  { "year": "2023", "content": "**Huawei Scholarship** [[link]](url)" }
]
```

### _data/navigation.yml — Navigation Menu

Each entry accepts a `title_zh` field shown in Chinese mode.

```yaml
main:
  - title: "Publications"
    title_zh: "论文"
    url: "/#-publications"
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
{: #-news}
```

### Bilingual fields in _config.yml

```yaml
description: "A Research Beginner."
description_zh: "一名科研新手。"

author:
  name: "Zaiyan Zhang"
  name_zh: "张再筵"
  bio: "Wuhan University"
  bio_zh: "武汉大学"
  location: "Wuhan, China"
  location_zh: "中国，武汉"
```

## Dark / Light Theme Toggle

A theme toggle button (🌙 / ☀) is displayed next to the language button. The preference is persisted in `localStorage`.

### How it works

- The `data-theme` attribute on `<html>` switches between `"light"` and `"dark"`
- `assets/css/main.scss` contains an `html[data-theme="dark"] { ... }` block that overrides component colors
- `_includes/head.html` contains a flash-prevention inline script that sets `data-theme` before CSS loads
- `assets/js/lang-toggle.js` handles both language and theme toggles and persistence

## BibTeX Citation Modal

`_data/bibtex.json` is inlined into a `<script>` tag at build time (via `scripts.html`). `bibtex-citation.js` binds all `#bibtex-*` links on page load. Clicking a BibTeX link opens a modal supporting:

- One-click copy to clipboard
- Close with ESC key
- Close by clicking the backdrop

## Google Scholar Citation Stats

1. Add `GOOGLE_SCHOLAR_ID` under Settings → Secrets → Actions in your GitHub repo
2. Set `google_scholar_stats_use_cdn: true` in `_config.yml`
3. Fill in the `scholarId` field for each paper entry in `_data/pubs.json`

Citation counts are fetched asynchronously by `fetch_google_scholar_stats.html` after page load.

## Adding a New Paper — Full Workflow

1. Add an entry to the appropriate category (`journal` / `conference` / `preprint`) in `_data/pubs.json`
2. Add the BibTeX entry to `_data/bibtex.json` (key must match `bibtexKey`)
3. Optionally place the PDF in `assets/pubs/`
4. Push to GitHub

## Style Customization

| Variable | File | Default | Description |
|----------|------|---------|-------------|
| `$paper-box-image-width` | `main.scss` | 360px | Paper teaser image width |
| `$paper-box-padding` | `main.scss` | 2em | Card inner padding |
| `$edu-box-image-width` | `main.scss` | 240px | School logo width |

BibTeX modal styles are in `_sass/_bibtex-citation.scss`.  
Dark mode styles are in the `html[data-theme="dark"] { ... }` block in `assets/css/main.scss`.

## Global Config (_config.yml)

| Key | Description |
|-----|-------------|
| `title` | Site title |
| `description` / `description_zh` | Site description (bilingual) |
| `repository` | GitHub repo (`user/repo`) |
| `google_scholar_stats_use_cdn` | Use CDN for citation data |
| `google_analytics_id` | Google Analytics ID |
| `author.name` / `author.name_zh` | Author name (bilingual) |
| `author.bio` / `author.bio_zh` | Author bio (bilingual) |
| `author.location` / `author.location_zh` | Location (bilingual) |
| `author.*` | Social links (email, github, googlescholar, etc.) |

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

Open http://127.0.0.1:4000 in your browser. Live reload is enabled.

## Troubleshooting

| Problem | Check |
|---------|-------|
| Publication cards not showing | Validate `_data/pubs.json` JSON syntax |
| BibTeX modal not opening | Verify the key exists in `_data/bibtex.json` |
| Citation counts missing | Confirm `google-scholar-stats` branch has data |
| Markdown not rendering | Ensure quotes in JSON strings are properly escaped |
| Nav items disappear after language switch | Confirm `jquery.greedy-navigation.js` exposes `resetGreedyNav` |
| Dark mode flash on load | Confirm flash-prevention inline script exists in `head.html` |
