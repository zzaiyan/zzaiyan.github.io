# 学术主页模板使用指南

本项目是一个基于 Jekyll + GitHub Pages 的个人学术主页。所有内容数据集中存储在 `_data/` 目录的 JSON 文件中，通过 Liquid 模板在构建时渲染为 HTML，实现零延迟加载。

## 目录结构

```
.
├── _config.yml              # Jekyll 全局配置（站点标题、作者信息、插件等）
├── _data/
│   ├── pubs.json            # 论文与专利数据
│   ├── bibtex.json          # BibTeX 引用数据
│   ├── news.json            # 新闻动态
│   ├── education.json       # 教育经历
│   ├── honors.json          # 荣誉奖项
│   └── navigation.yml       # 导航菜单
├── _layouts/
│   └── default.html         # 页面布局模板
├── _includes/
│   ├── publications.html    # 论文卡片 Liquid 模板
│   ├── news.html            # 新闻列表 Liquid 模板
│   ├── education.html       # 教育经历 Liquid 模板
│   ├── honors.html          # 荣誉奖项 Liquid 模板
│   ├── head.html            # <head> 标签
│   ├── scripts.html         # JS 脚本引入（含内联 BibTeX 数据）
│   ├── footer.html          # 页脚
│   ├── sidebar.html         # 侧边栏
│   ├── author-profile.html  # 作者头像与社交链接
│   ├── masthead.html        # 顶部导航栏
│   ├── seo.html             # SEO meta 标签
│   ├── analytics.html       # Google Analytics
│   └── fetch_google_scholar_stats.html  # Google Scholar 引用统计
├── _pages/
│   └── about.md             # 主页内容（通过 Liquid include 组装各板块）
├── _sass/                   # 样式源文件
│   ├── _page.scss           # 页面主样式 + paper-box 卡片样式
│   ├── _bibtex-citation.scss # BibTeX 模态框样式
│   └── ...
├── assets/
│   ├── css/main.scss        # 样式入口
│   ├── pubs/                # 论文 PDF 文件
│   └── js/
│       ├── bibtex-citation.js # BibTeX 引用弹窗功能
│       └── last-update.js   # 自动获取最后更新时间
├── images/                  # 图片资源
└── google_scholar_crawler/  # Google Scholar 爬虫
```

## 数据驱动架构

所有内容板块均通过 `_data/` 下的 JSON 文件定义，`_includes/` 下的 Liquid 模板读取数据并在 Jekyll 构建时生成静态 HTML。`about.md` 中仅包含固定文本（自我介绍等）和 `{% raw %}{% include xxx.html %}{% endraw %}` 调用。

| 板块 | 数据文件 | 模板文件 |
|------|----------|----------|
| 论文 | `_data/pubs.json` | `_includes/publications.html` |
| BibTeX | `_data/bibtex.json` | 内联至 `_includes/scripts.html` |
| 新闻 | `_data/news.json` | `_includes/news.html` |
| 教育 | `_data/education.json` | `_includes/education.html` |
| 荣誉 | `_data/honors.json` | `_includes/honors.html` |

## 各数据文件格式

### _data/pubs.json — 论文与专利

```json
{
  "journal": [
    {
      "id": "zhang2024multi",
      "title": "论文标题",
      "authors": "<strong><u>第一作者</u></strong>, 其他作者",
      "venue": "期刊全称",
      "venueShort": "缩写",
      "year": 2025,
      "badge": "卡片左上角徽章文字",
      "image": "论文示意图 URL",
      "doi": "DOI 链接（可为 null）",
      "note": "备注信息（分区、IF、关键词等）",
      "scholarId": "Google Scholar Paper ID（用于引用统计）",
      "links": [
        { "name": "PDF", "url": "assets/pubs/xxx.pdf" },
        { "name": "Code", "url": "https://github.com/xxx" }
      ],
      "bibtexKey": "bibtex.json 中对应的 key"
    }
  ],
  "conference": [ ... ],
  "patent": [
    {
      "date": "2025.02",
      "number": "ZL202410556414.6",
      "title": "专利标题",
      "authors": "发明人列表"
    }
  ]
}
```

### _data/bibtex.json — BibTeX 引用

```json
{
  "zhang2024multi": "@article{zhang2024multi,\n  author = {...},\n  ...}",
  "zhang2026task": "@article{zhang2026task,\n  ...}"
}
```

key 必须与 `pubs.json` 中的 `bibtexKey` 一致。

### _data/news.json — 新闻动态

**支持 Markdown 语法**。

```json
[
  {
    "date": "2025.09",
    "emoji": "🎉🎉",
    "content": "Our work \"**_Paper Title_**\" was accepted by **Journal**."
  }
]
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `date` | 是 | 日期 |
| `content` | 是 | 内容（支持 Markdown） |
| `emoji` | 否 | 日期后显示的 emoji |

### _data/education.json — 教育经历

```json
[
  {
    "school": "学校名 | 中文名",
    "url": "学校官网",
    "image": "images/logo.png",
    "degree": "Master",
    "major": "专业名",
    "period": "2025.09 - Present",
    "advisors": "Prof. [Name](scholar_url)"
  }
]
```

`advisors` 字段支持 Markdown 链接语法。

### _data/honors.json — 荣誉奖项

**支持 Markdown 语法**。

```json
[
  { "year": "2023", "content": "**National Scholarship** | **国家奖学金**" },
  { "year": "2023", "content": "**Huawei Scholarship** [[link]](url)" }
]
```

## BibTeX 引用弹窗

`_data/bibtex.json` 在构建时通过 Liquid 内联到页面的 `<script>` 标签中（见 `scripts.html`），`bibtex-citation.js` 在页面加载后自动绑定所有 `#bibtex-*` 链接。点击后弹出模态框，支持：

- 一键复制到剪贴板
- ESC 键关闭
- 点击遮罩区域关闭

## Google Scholar 引用统计

1. 在 GitHub 仓库 Settings → Secrets → Actions 中添加 `GOOGLE_SCHOLAR_ID`
2. `_config.yml` 中设置 `google_scholar_stats_use_cdn: true`
3. `_data/pubs.json` 论文条目中填写 `scholarId` 字段

引用数由 `fetch_google_scholar_stats.html` 在页面加载后异步获取并填充。

## 添加新论文的完整流程

1. 在 `_data/pubs.json` 对应分类中添加论文条目
2. 在 `_data/bibtex.json` 中添加 BibTeX（key 与 `bibtexKey` 一致）
3. 将 PDF 放入 `assets/pubs/` 目录（可选）
4. 推送到 GitHub

## 样式自定义

| 变量 | 位置 | 默认值 | 说明 |
|------|------|--------|------|
| `$paper-box-image-width` | `main.scss` | 360px | 论文图片宽度 |
| `$paper-box-padding` | `main.scss` | 2em | 卡片内边距 |
| `$edu-box-image-width` | `main.scss` | 240px | 学校 logo 宽度 |

BibTeX 弹窗样式在 `_sass/_bibtex-citation.scss` 中。

## 全局配置（_config.yml）

| 配置项 | 说明 |
|--------|------|
| `title` | 站点标题 |
| `description` | 站点描述 |
| `repository` | GitHub 仓库名（`user/repo`） |
| `google_scholar_stats_use_cdn` | CDN 读取引用数据 |
| `google_analytics_id` | Google Analytics ID |
| `author.*` | 作者信息与社交链接 |

## 本地调试

```bash
bundle install
bundle exec jekyll serve
```

访问 http://127.0.0.1:4000 预览。

## 故障排查

| 问题 | 排查方法 |
|------|----------|
| 论文卡片不显示 | 检查 `_data/pubs.json` JSON 语法 |
| BibTeX 弹窗无反应 | 检查 `_data/bibtex.json` 中对应 key 是否存在 |
| 引用数不显示 | 确认 `google-scholar-stats` 分支有数据 |
| Markdown 未渲染 | 确认 JSON 中的引号已正确转义 |
