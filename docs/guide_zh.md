# 学术主页模板使用指南

本项目是一个基于 Jekyll + GitHub Pages 的个人学术主页。所有内容数据集中存储在 `_data/` 目录的 JSON 文件中，通过 Liquid 模板在构建时渲染为 HTML，实现零延迟加载。支持中英文双语切换与深色/浅色主题切换。

> 📖 [English version](guide.md)

## 目录结构

```
.
├── _config.yml              # Jekyll 全局配置（站点标题、作者信息、双语描述等）
├── _data/
│   ├── pubs.json            # 论文与专利数据
│   ├── bibtex.json          # BibTeX 引用数据
│   ├── news.json            # 新闻动态（含 content_zh 双语字段）
│   ├── education.json       # 教育经历（含 degree_zh/major_zh 等双语字段）
│   ├── honors.json          # 荣誉奖项
│   └── navigation.yml       # 导航菜单（含 title_zh 双语字段）
├── _layouts/
│   └── default.html         # 页面布局模板
├── _includes/
│   ├── publications.html    # 论文卡片 Liquid 模板
│   ├── news.html            # 新闻列表 Liquid 模板（双语）
│   ├── education.html       # 教育经历 Liquid 模板（双语）
│   ├── honors.html          # 荣誉奖项 Liquid 模板
│   ├── head.html            # <head> 标签（含防闪烁内联脚本）
│   ├── scripts.html         # JS 脚本引入（含内联 BibTeX 数据）
│   ├── footer.html          # 页脚
│   ├── sidebar.html         # 侧边栏
│   ├── author-profile.html  # 作者头像与社交链接（双语）
│   ├── masthead.html        # 顶部导航栏（含语言/主题切换按钮）
│   ├── seo.html             # SEO meta 标签
│   ├── analytics.html       # Google Analytics
│   └── fetch_google_scholar_stats.html  # Google Scholar 引用统计
├── _pages/
│   └── about.md             # 主页内容（双语 div 块 + Liquid include）
├── _sass/                   # 样式源文件
│   ├── _masthead.scss       # 导航栏样式
│   ├── _bibtex-citation.scss # BibTeX 模态框样式
│   └── ...
├── assets/
│   ├── css/main.scss        # 样式入口（含深色模式与双语 CSS）
│   ├── pubs/                # 论文 PDF 文件
│   └── js/
│       ├── lang-toggle.js   # 语言切换 + 主题切换逻辑
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

支持 `journal`、`conference`、`preprint`、`patent` 四个分类，任一分类无数据则对应板块自动隐藏。

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
  "preprint": [ ... ],
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

支持 Markdown 语法，支持 `content_zh` 字段提供中文翻译。

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

| 字段 | 必填 | 说明 |
|------|------|------|
| `date` | 是 | 日期 |
| `content` | 是 | 英文内容（支持 Markdown） |
| `content_zh` | 否 | 中文内容，未填则显示英文 |
| `emoji` | 否 | 日期后显示的 emoji |

### _data/education.json — 教育经历

支持 `degree_zh`、`major_zh`、`advisors_zh` 双语字段。

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

### _data/honors.json — 荣誉奖项

支持 Markdown 语法。

```json
[
  { "year": "2023", "content": "**National Scholarship** | **国家奖学金**" },
  { "year": "2023", "content": "**Huawei Scholarship** [[link]](url)" }
]
```

### _data/navigation.yml — 导航菜单

每个导航项支持 `title_zh` 字段，用于中文模式下显示。

```yaml
main:
  - title: "Publications"
    title_zh: "论文"
    url: "/#-publications"
```

## 双语切换

页面右上角提供语言切换按钮（EN / 中文），偏好持久化于 `localStorage`。

### 实现原理

- `<html>` 元素的 `data-lang` 属性在 `"en"` / `"zh"` 间切换
- CSS `html[data-lang="en"] .lang-zh { display: none }` 控制显隐
- `_includes/head.html` 含防闪烁内联脚本，在 CSS 加载前即设置 `data-lang`
- `assets/js/lang-toggle.js` 管理切换逻辑并在切换后重算导航栏宽度

### 在 about.md 中添加双语内容

```html
<div class="lang-en" markdown="1">
English content here.
</div>

<div class="lang-zh" markdown="1">
中文内容写在这里。
</div>
```

章节标题示例：

```markdown
# <span class="lang-en">🔥 News</span><span class="lang-zh">🔥 新闻动态</span>
{: #-news}
```

### 在 _config.yml 中添加双语字段

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

## 深色/浅色主题切换

页面右上角「语言切换」按钮旁提供主题切换按钮（🌙 / ☀），偏好持久化于 `localStorage`。

### 实现原理

- `<html>` 元素的 `data-theme` 属性在 `"light"` / `"dark"` 间切换
- `assets/css/main.scss` 中 `html[data-theme="dark"] { ... }` 覆盖各组件颜色
- `_includes/head.html` 含防闪烁内联脚本，在 CSS 加载前即设置 `data-theme`
- `assets/js/lang-toggle.js` 同时管理语言和主题的切换与持久化

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

1. 在 `_data/pubs.json` 对应分类（`journal` / `conference` / `preprint`）中添加论文条目
2. 在 `_data/bibtex.json` 中添加 BibTeX（key 与 `bibtexKey` 一致）
3. 将 PDF 放入 `assets/pubs/` 目录（可选）
4. 推送到 GitHub

## 样式自定义

| 变量 | 位置 | 默认值 | 说明 |
|------|------|--------|------|
| `$paper-box-image-width` | `main.scss` | 360px | 论文图片宽度 |
| `$paper-box-padding` | `main.scss` | 2em | 卡片内边距 |
| `$edu-box-image-width` | `main.scss` | 240px | 学校 logo 宽度 |

BibTeX 弹窗样式在 `_sass/_bibtex-citation.scss` 中。深色模式样式在 `assets/css/main.scss` 的 `html[data-theme="dark"] { ... }` 块中。

## 全局配置（_config.yml）

| 配置项 | 说明 |
|--------|------|
| `title` | 站点标题 |
| `description` / `description_zh` | 站点描述（双语） |
| `repository` | GitHub 仓库名（`user/repo`） |
| `google_scholar_stats_use_cdn` | CDN 读取引用数据 |
| `google_analytics_id` | Google Analytics ID |
| `author.name` / `author.name_zh` | 作者姓名（双语） |
| `author.bio` / `author.bio_zh` | 作者简介（双语） |
| `author.location` / `author.location_zh` | 所在地（双语） |
| `author.*` | 社交链接（email、github、googlescholar 等） |

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
| 切换语言后导航项消失 | 检查 `jquery.greedy-navigation.js` 是否包含 `resetGreedyNav` 函数 |
| 深色模式闪白 | 确认 `head.html` 中含防闪烁内联脚本 |
