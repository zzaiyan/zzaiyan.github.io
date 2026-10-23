# 学术主页模板使用指南

本项目是一个基于 Jekyll + GitHub Pages 的个人学术主页。结构化内容和引用量快照集中存储在 `_data/` 目录的 JSON 文件中，通过 Liquid 模板在构建时渲染为 HTML。访客统计通过异步脚本加载。支持中英文双语切换与深色/浅色主题切换。

> 📖 [English version](guide.md)

## 目录结构

```
.
├── _config.yml              # Jekyll 全局配置（站点标题、作者信息、双语描述等）
├── _data/
│   ├── publications.json    # 论文：CSL 元数据、展示信息与 Scholar 映射
│   ├── generated/
│   │   └── citations.json   # 自动生成的多格式引用
│   ├── metrics/
│   │   ├── github_stars.json # star 快照
│   │   └── google_scholar.json # Scholar 总引用量与单篇计数
│   ├── news.json            # 新闻动态（含 content_zh 双语字段）
│   ├── education.json       # 教育经历（含 degree_zh/major_zh 等双语字段）
│   ├── internship.json      # 实习经历（含双语字段）
│   ├── honors.json          # 荣誉奖项
│   ├── services.json        # 学术服务分组与双语名单
│   ├── venues.json          # 期刊/会议分区与影响因子
│   └── navigation.yml       # 导航菜单（含 title_zh 双语字段）
├── _layouts/
│   └── default.html         # 页面布局模板
├── _includes/
│   ├── publications.html    # 论文卡片 Liquid 模板
│   ├── news.html            # 新闻列表 Liquid 模板（双语）
│   ├── education.html       # 教育经历 Liquid 模板（双语）
│   ├── internship.html      # 实习经历 Liquid 模板（双语）
│   ├── honors.html          # 荣誉奖项 Liquid 模板
│   ├── services.html        # 学术服务 Liquid 模板（双语）
│   ├── github-repo-button.html # 带 star 数量的 GitHub 按钮
│   ├── head.html            # <head> 标签（SEO 元信息与样式）
│   ├── scripts.html         # JS 脚本引入（含内联引用数据）
│   ├── footer.html          # 页脚
│   ├── sidebar.html         # 侧边栏
│   ├── author-profile.html  # 作者头像与社交链接（双语）
│   ├── masthead.html        # 顶部导航栏（含语言/主题切换按钮）
│   ├── seo.html             # SEO meta 标签
│   ├── analytics.html       # Google Analytics
│   └── google-scholar-badge.html # 构建时渲染 Scholar 总引用量
├── _pages/
│   └── about.md             # 主页内容（双语 div 块 + Liquid include）
├── _sass/                   # 样式源文件
│   ├── _masthead.scss       # 导航栏样式
│   ├── _citation-dialog.scss # 多格式引用弹窗样式
│   ├── _publication-cards.scss # 论文、教育与实习卡片
│   ├── _homepage-sections.scss # 锚点、新闻、时间线与 Misc
│   ├── _site-controls.scss  # 语言可见性与导航栏控件
│   ├── _dark-mode.scss      # 全站深色主题覆盖
│   └── ...
├── assets/
│   ├── css/main.scss        # SCSS 编译入口与有序 partial 导入
│   ├── pubs/                # 论文 PDF 文件
│   └── js/
│       ├── lang-toggle.js   # 语言切换 + 主题切换逻辑
│       └── citation-dialog.js # 多格式引用弹窗功能
├── images/                  # 按用途分类的图片资源
│   ├── profile/             # 头像与个人图片
│   ├── institutions/        # 单位 Logo
│   ├── publications/        # 论文插图
│   └── site/                # Favicon 与 Web App 图标
├── scripts/
│   ├── build-citations.mjs  # 离线引用格式生成器
│   ├── fetch-github-stars.mjs # GitHub star 快照采集器
│   ├── fetch-google-scholar.py # Scholar 官方引用量采集器
│   ├── fetch-google-scholar.sh # Linux/macOS 本地一键采集
│   ├── fetch-google-scholar.bat # Windows 本地一键采集
│   ├── refresh-site-data.py # 本地和部署共用的统计刷新入口
│   ├── scholar_snapshot.py  # Scholar 数据校验与原子写入
│   ├── requirements-scholar.txt # Scholar Python 依赖
│   └── csl/                 # 本地 IEEE 与 GB/T 7714 样式
└── package.json             # 数据刷新命令与引用生成开发依赖
```

## 数据驱动架构

所有内容板块均通过 `_data/` 下的 JSON 文件定义，`_includes/` 下的 Liquid 模板读取数据并在 Jekyll 构建时生成静态 HTML。`about.md` 中仅包含固定文本（自我介绍等）和 `{% raw %}{% include xxx.html %}{% endraw %}` 调用。

| 板块 | 数据文件 | 模板文件 |
|------|----------|----------|
| 论文 | `_data/publications.json` | `_includes/publications.html` |
| 多格式引用 | `_data/publications.json` → `_data/generated/citations.json` | 内联至 `_includes/scripts.html` |
| 新闻 | `_data/news.json` | `_includes/news.html` |
| 教育 | `_data/education.json` | `_includes/education.html` |
| 实习 | `_data/internship.json` | `_includes/internship.html` |
| 荣誉 | `_data/honors.json` | `_includes/honors.html` |
| 学术服务 | `_data/services.json` | `_includes/services.html` |
| GitHub stars | `_data/metrics/github_stars.json` | `_includes/github-repo-button.html` |
| Scholar 引用统计 | `_data/metrics/google_scholar.json` | `_includes/google-scholar-badge.html`、`_includes/publication-card.html` |
| 期刊分区 | `_data/venues.json` | `_includes/publications.html` 中引用 |

## 各数据文件格式

### _data/publications.json — 论文的唯一人工数据源

按 `journal`、`conference`、`preprint` 分组。每篇记录只包含稳定的 `id`、采用 CSL 字段的 `citation`（作者使用二元数组简写）、网站专用 `display`，以及可选的 `scholar_id`。不要重复保存标题、作者、年份或 DOI，不需要维护独立的引用 key。

```json
{
  "journal": [
    {
      "id": "zhang2025example",
      "citation": {
        "type": "article-journal",
        "title": "Example paper",
        "author": [
          ["Zhang", "Zaiyan"],
          ["Li", "Jie"]
        ],
        "container-title": "Journal Name",
        "issued": {"date-parts": [[2025]]},
        "URL": "https://example.com/paper"
      },
      "display": {
        "venue_key": "Journal",
        "badge": "Journal",
        "image": "images/publications/teaser.webp",
        "tags": ["Image Restoration"],
        "author_roles": {"corresponding": [2]},
        "links": [
          {"name": "PDF", "url": "assets/pubs/example.pdf"}
        ]
      }
    }
  ],
  "conference": [],
  "preprint": []
}
```

网页和引用生成器共用 `citation`。标题、作者顺序、年份分别来自 `title`、`author`、`issued.date-parts`；标题链接优先使用 `DOI`，否则使用 `URL`。DOI 保存为 `10.…`，不包含 `https://doi.org/`；同一 DOI 的跳转 URL 自动派生，不必重复填写 `URL`。`citation` 不保存 `id`，生成器从论文顶层注入。

`display.venue` 仅在需要与正式文献名称不同的展示名时填写，默认使用 `citation.container-title`。`venue_key` 用于查询分区/IF，`tags` 为标签数组，`links` 为按钮列表。

作者必须写成 `[姓, 名]` 二元数组，例如 `["Zhang", "Zaiyan"]`、`["de la Cruz", "Juan Carlos"]`。每项恰好包含两个非空字符串，只去除首尾空白，保留内部空格、连字符、大小写和署名顺序。不要把姓名拼为一个字符串，也不要混入 `*`、`†`。网页按“名 姓”展示；生成器将二元组转换为标准 `{ "family": "Zhang", "given": "Zaiyan" }`，所有引用导出仍为标准 CSL 作者结构。格式不合法时直接报错，不猜测姓和名。

`display.author_roles` 使用从 1 开始的作者位置：`equal_contribution` 添加 `†`，`corresponding` 添加 `*`。与 `_config.yml` 中 `author.citation_name` 匹配的作者自动加下划线。`display.layout: "compact"` 显示无图紧凑卡片，省略时为带图卡片；`display.visible: false` 隐藏论文，但保留分类、元数据和生成的引用。

可选的 `scholar_id` 保存完整的 `作者ID:论文ID`，用于关联 `_data/metrics/google_scholar.json`，不要求 Scholar 已收录该论文。网站自定义字段使用 `snake_case`，CSL 字段保留其标准命名。JSON 使用两空格缩进；作者二元组、短数组、链接小对象及 `issued`、`author_roles` 保持单行，方便手工维护。


### 引用格式生成

仅编辑 `publications.json`，随后运行：

```bash
npm ci
npm run data:build
npm run citations:check
```

生成器校验分类、唯一 ID、必要文献字段、作者二元组、作者角色位置和 Scholar ID 格式/唯一性，将 BibTeX、RIS、CSL-JSON、IEEE、APA、GB/T 7714 写入 `_data/generated/citations.json`。该文件是可重建快照，不应手工编辑；`npm run citations:build` 是 `data:build` 的兼容别名。

部署会在 Jekyll 构建前自动重新生成。`npm run serve` 在启动本地预览前执行相同生成步骤；预览期间修改论文后，可再运行 `npm run data:build` 刷新引用弹窗。生成过程完全离线，浏览器无需引用库或 CDN。

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

### _data/internship.json — 实习经历

实习卡片使用与教育卡片相同的图片布局，并支持单位、岗位、部门、时间和合作导师等双语字段。

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

### _data/honors.json — 荣誉奖项

支持 Markdown 语法，使用 `content_zh` 提供中文名称。中英文以 ` | ` 拼接并自然换行，缺少中文时仅显示英文。可选的 `url` 用于在中英文名称之后显示一份 `[link]` 来源链接。荣誉按四位年份倒序分组，同一年共用一个时间线节点；组内保留数据文件中的顺序。

```json
[
  { "year": "2023", "content": "**National Scholarship**", "content_zh": "**国家奖学金**" },
  { "year": "2023", "content": "**Huawei Scholarship**", "content_zh": "**华为奖学金**", "url": "https://example.com/award" }
]
```

### _data/services.json — 学术服务

按数据文件中的顺序显示分组及条目，空分组自动隐藏。`title` / `title_zh` 定义分组标题，`items` 中的 `name` / `name_zh` 定义服务名称。中英文跟随全站语言切换，中文缺失时回退到英文。名称填写纯文本，不带末尾句号，模板统一添加标点。

使用原生 Markdown 二级标题和单列列表，圆点、缩进和行距统一继承站点基础样式。

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

### _data/venues.json — 期刊/会议分区

每个 key 为 `publications.json` 中 `display.venue_key` 对应的缩写，分区和影响因子会显示在期刊/会议论文条目中。

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

### _data/navigation.yml — 导航菜单

每个导航项支持 `title_zh` 字段，用于中文模式下显示。

```yaml
main:
  - title: "Publications"
    title_zh: "论文"
    url: "/#publications"
```

## 双语切换

页面右上角提供语言切换按钮（EN / 中文）。每次访问默认英文，切换不做持久化。

### 实现原理

- `<html>` 元素的 `data-lang` 属性在 `"en"` / `"zh"` 间切换
- CSS `html[data-lang="en"] .lang-zh { display: none }` 控制显隐
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
{: #news}
```

### 在 _config.yml 中添加双语字段

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

## 深色/浅色主题切换

页面右上角「语言切换」按钮旁提供主题切换按钮（🌙 / ☀）。每次访问默认浅色主题，切换不做持久化。

### 实现原理

- `<html>` 元素的 `data-theme` 属性在 `"light"` / `"dark"` 间切换
- `_sass/_dark-mode.scss` 中的 `html[data-theme="dark"] { ... }` 负责覆盖各组件颜色
- `assets/js/lang-toggle.js` 同时管理语言和主题切换

## 多格式引用弹窗

`_data/generated/citations.json` 在构建时通过 Liquid 内联到页面的 `<script>` 标签中（见 `scripts.html`），`citation-dialog.js` 在页面加载后自动绑定所有 `#citation-*` 链接。点击 `Cite` 后弹出窗口，支持：

- BibTeX、RIS、CSL-JSON、IEEE、APA 和 GB/T 7714
- 一键复制到剪贴板
- 机器可读格式下载
- ESC 键或点击遮罩区域关闭
- 弹窗打开期间保留页面滚动条
- 关闭时将焦点还给原始 `Cite` 链接，但不改变当前页面位置

弹窗面板使用半透明云母片风格，滤镜为 `backdrop-filter: blur(16px) saturate(2) contrast(0.96)`。面板与代码区均保留半透明背景，可透出经过模糊处理的主页轮廓。鼠标位于引用内容区域时优先滚动该区域，位于外围遮罩时仍可继续滚动主页。

## 统计数据统一刷新

部署流程统一刷新 Google Scholar 引用量与 GitHub stars，分别写入 `_data/metrics/google_scholar.json` 和 `_data/metrics/github_stars.json`，再由 Jekyll 渲染页面。所有快照保存在 `_data/`，`google-scholar-stats` 分支仅作为历史保留，已退出读写和部署链路。

本地使用与部署相同的入口。准备 Node.js 24 和 Python 3.12，并在当前 Python 环境安装依赖：

```bash
python -m pip install -r scripts/requirements-scholar.txt
npm run data:refresh
```

`refresh-site-data.py` 依次调用两个采集器。Scholar 抓取最多等待 120 秒，star 采集最多等待 75 秒；单个数据源失败时保留已有快照，并继续处理另一个数据源。刷新结束后校验两份快照，缺少有效回退数据时才中断构建。运行中的 Jekyll 会随 `_data` 变化自动重建。

部署自动准备 Python 依赖，并通过 Actions 内置 `GITHUB_TOKEN` 获取 star 数据。本地可通过环境变量 `GITHUB_TOKEN` 或 `GH_TOKEN` 提供 GitHub 认证，命令遵循现有代理环境变量。Token 仅用于采集，不写入快照或网页。

部署时刷新后的数据随静态站点产物发布；仓库中的快照用于失败回退，本地刷新后也可提交更新。

### 本地更新 Scholar 兜底快照

安装 Python 3（推荐 3.12）后，即可使用一键脚本，不需要 Node.js、Ruby 或 GitHub Token。

Linux/macOS：

```bash
bash scripts/fetch-google-scholar.sh
```

Windows：双击 `scripts\fetch-google-scholar.bat`，或在项目目录的终端运行：

```bat
scripts\fetch-google-scholar.bat
```

两个脚本均从自身位置定位项目，支持从任意工作目录调用。首次运行自动创建项目内的 `.venv-scholar/` 并安装 `scripts/requirements-scholar.txt` 中的依赖；后续复用该环境并检查依赖。环境已被 Git 忽略，不影响系统或其他 Python 环境。Windows 默认优先使用 `py -3.12`，其次为其他 Python 3 或 `python`；脚本完成后等待按键，终端自动化可加 `--no-pause`。

首次创建环境时可通过 `SCHOLAR_PYTHON` 指定 Python 可执行文件路径，例如 Linux/macOS 的 `SCHOLAR_PYTHON=/path/to/python bash scripts/fetch-google-scholar.sh`，或 Windows 先执行 `set "SCHOLAR_PYTHON=C:\Python312\python.exe"`。已有依赖环境也可继续使用 `npm run scholar:fetch`。

采集成功后，快照位于 `_data/metrics/google_scholar.json`。检查数据并将该文件提交到远程，即可更新 Actions 的失败兜底：

```bash
git add _data/metrics/google_scholar.json
git commit -m "Update Scholar citation snapshot"
git push origin main
```

只有采集与校验成功后才原子替换快照；失败时命令返回非零并保留原文件。脚本不操作 Git，也不访问历史 stats 分支。上述提交把本地成功采集的数据保存到 `main`；Actions 刷新失败时直接使用 checkout 中的这份快照，不将引用量重置为零，也不伪造更新时间。


## Google Scholar 引用统计

总引用量直接使用 Google Scholar 作者主页返回的 `citedby`，包含当前网站未展示论文的引用，不对论文引用量求和。`citedby_source: "profile"` 标识这一口径，旧版求和快照会被拒绝。

`fetch-google-scholar.py` 只写入 `_data/metrics/google_scholar.json`，保存 Scholar ID、总引用量、采集时间和全部返回论文的引用明细，不再产生独立的 results 或徽章数据副本。作者 ID 默认取自这份快照，也可通过 `GOOGLE_SCHOLAR_ID` 环境变量指定。

徽章和论文卡片在构建时直接读取数据，单篇通过 `_data/publications.json` 的 `scholar_id` 匹配。零引用或缺失的单篇计数保持隐藏；缺少可用总数时显示 `...`，真实的零总引用量显示 `0`。浏览器无需请求统计 JSON、CDN 或 GitHub Raw。

## GitHub Star 统计

开源项目的 GitHub 按钮使用 `GitHub ★ 数量` 样式，点击仍跳转仓库。数字在 Jekyll 构建时从 `_data/metrics/github_stars.json` 渲染，页面无需请求 GitHub API。按钮悬停提示最近成功采集的 UTC 时间，颜色跟随浅色/深色主题。

star 数据由上述 `npm run data:refresh` 统一刷新。采集器读取快照中的仓库列表，并从 GitHub REST API 获取 `stargazers_count`。

真实的零星标显示 `0`，`stars: null` 表示尚无数据，仅显示 GitHub 按钮。超时、无效响应或 API 限流均保留对应仓库已有快照；认证失败或限流时停止后续请求。所有请求失败时不会改写文件。

新增项目时，在 `_data/metrics/github_stars.json` 增加以下条目，并在项目卡片内使用共享按钮：

```json
"owner/repo": { "stars": null, "updated_at": null }
```

```liquid
{% raw %}{% include github-repo-button.html repo="owner/repo" %}{% endraw %}
```

## 静态资源加载

- 本地交互脚本使用 `defer`，并保持文档中的执行顺序。
- 仅当页面 front matter 设置 `mathjax: true` 时加载 MathJax。
- 仅在配置 `google_analytics_id` 后输出 Google Analytics 脚本。
- VisitorTrace 通过异步 `map.js` 脚本加载，组件由 VisitorTrace 服务渲染；尺寸和外观由 VisitorTrace 后台配置，本仓库不再硬编码。
- 页脚最后更新时间使用 Jekyll 构建时间，不再在浏览器中请求 GitHub API。

## 添加新论文的完整流程

1. 在 `_data/publications.json` 对应分类中添加一条记录，填写 `id`、`citation`、`display`，按需填写 `scholar_id`
2. 将 PDF 放入 `assets/pubs/` 目录（可选）
3. 运行 `npm run data:build`，检查页面与生成的引用
4. 提交并推送；部署会自动重新生成引用和刷新在线统计

## 样式自定义

| 变量 | 位置 | 默认值 | 说明 |
|------|------|--------|------|
| `$card-padding` | `_publication-cards.scss` | 1.1em | 卡片通用内边距 |
| `$paper-box-image-width` | `_publication-cards.scss` | 360px | 完整论文卡片的基础图片宽度 |
| `$edu-box-image-width` | `_publication-cards.scss` | 240px | 教育/实习卡片的基础图片宽度 |
| `--card-image-share` | `_publication-cards.scss` | 36% / 28% | 完整论文卡片 / 教育卡片的响应式图片栏比例 |

多格式引用弹窗的材质透明度、背景滤镜和响应式尺寸均在 `_sass/_citation-dialog.scss` 中定义；弹窗交互与焦点恢复逻辑位于 `assets/js/citation-dialog.js`。

`assets/css/main.scss` 仅作为编译入口。站点定制 partial 在基础主题之后按依赖顺序导入：组件基础样式、主页区块、站点控件，最后是 `_dark-mode.scss`。深色主题必须保持最后导入，避免主题覆盖被后续基础组件规则反向覆盖。

## 全局配置（_config.yml）

| 配置项 | 说明 |
|--------|------|
| `title` | 站点标题 |
| `url` / `baseurl` | canonical 站点地址与可选部署子路径 |
| `description` / `description_zh` | 站点描述（双语） |
| `seo_title` / `seo_description` | 搜索引擎与社交分享元信息 |
| `repository` | GitHub 仓库名（`user/repo`） |
| `google_scholar.id` | Scholar 作者 ID，用于验证引用量快照与徽章匹配 |
| `visitor_trace.base_url` / `visitor_trace.site_id` | VisitorTrace 组件地址与站点标识 |
| `google_analytics_id` | Google Analytics ID |
| `author.name` / `author.name_zh` | 作者姓名（双语） |
| `author.citation_name` | 用于在论文卡片中识别并加下划线标记作者的 given/family 姓名 |
| `author.bio` / `author.bio_zh` | 作者简介（双语） |
| `author.location` / `author.location_zh` | 所在地（双语） |
| `author.*` | 社交链接（email、github、googlescholar 等） |

## 本地调试

```bash
bundle install
npm ci
npm run serve -- --livereload
```

访问 http://127.0.0.1:4000 预览；不需要浏览器自动刷新时可以移除 `--livereload`。

## 部署

推送 `main` 后会触发 `.github/workflows/deploy.yml`。工作流只构建一次 `_site`，再将同一份产物部署到 GitHub Pages 和可通过 SSH 访问的 Web 服务器。自定义域名作为 canonical 主站，GitHub Pages 地址继续作为可独立访问的镜像。

SSH 部署使用 `server-production` Environment。需配置 `SSH_HOST`、`SSH_USER`、`SSH_PRIVATE_KEY`、`SSH_KNOWN_HOSTS` 四个 Secrets；`SSH_PORT` 可选，默认使用 22。另需设置 `SSH_DEPLOY_PATH`（例如 `/www/wwwroot/acadhome`）和 `SSH_SITE_URL`（例如 `https://example.com`）两个 Variables。版本文件上传至 `<SSH_DEPLOY_PATH>/releases/<commit-sha>`，随后通过 `<SSH_DEPLOY_PATH>/current` 软链接原子切换；Web 服务器的网站根目录应指向该 `current` 软链接。

每份产物包含 `deploy-version.json`，SSH 服务器任务在切换后会通过公网地址验证版本。需要回滚时，将 `current` 重新指向 `releases/` 下的旧版本目录。

## 故障排查

| 问题 | 排查方法 |
|------|----------|
| 论文卡片不显示 | 检查 `_data/publications.json` JSON 语法 |
| 引用弹窗无反应 | 检查 `_data/generated/citations.json` 中对应 key 是否存在，并运行 `npm run data:build` |
| 引用数不显示 | 检查 `_data/metrics/google_scholar.json` 与作者 ID；重新采集后会自动同步本地快照 |
| 网页统计未更新 | 查看部署中的 Refresh site data 日志，确认是否使用了失败回退快照 |
| Markdown 未渲染 | 确认 JSON 中的引号已正确转义 |
| 切换语言后导航项消失 | 检查 `jquery.greedy-navigation.js` 是否包含 `resetGreedyNav` 函数 |
