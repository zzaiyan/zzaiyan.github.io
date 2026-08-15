# 学术主页模板使用指南

本项目是一个基于 Jekyll + GitHub Pages 的个人学术主页。结构化内容集中存储在 `_data/` 目录的 JSON 文件中，通过 Liquid 模板在构建时渲染为 HTML。论文引用数和访客统计属于可选的异步增强功能。支持中英文双语切换与深色/浅色主题切换。

> 📖 [English version](guide.md)

## 目录结构

```
.
├── _config.yml              # Jekyll 全局配置（站点标题、作者信息、双语描述等）
├── _data/
│   ├── pubs.json            # 论文与专利数据
│   ├── references.json    # CSL-JSON 规范引用元数据
│   ├── citation_outputs.json # 生成的多格式引用
│   ├── news.json            # 新闻动态（含 content_zh 双语字段）
│   ├── education.json       # 教育经历（含 degree_zh/major_zh 等双语字段）
│   ├── internship.json      # 实习经历（含双语字段）
│   ├── honors.json          # 荣誉奖项
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
│   ├── head.html            # <head> 标签（含防闪烁内联脚本）
│   ├── scripts.html         # JS 脚本引入（含内联引用数据）
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
│   └── csl/                 # 本地 IEEE 与 GB/T 7714 样式
├── package.json             # 引用生成开发依赖
└── google_scholar_crawler/  # Google Scholar 爬虫
```

## 数据驱动架构

所有内容板块均通过 `_data/` 下的 JSON 文件定义，`_includes/` 下的 Liquid 模板读取数据并在 Jekyll 构建时生成静态 HTML。`about.md` 中仅包含固定文本（自我介绍等）和 `{% raw %}{% include xxx.html %}{% endraw %}` 调用。

| 板块 | 数据文件 | 模板文件 |
|------|----------|----------|
| 论文 | `_data/pubs.json` | `_includes/publications.html` |
| 多格式引用 | `_data/references.json` + `_data/citation_outputs.json` | 内联至 `_includes/scripts.html` |
| 新闻 | `_data/news.json` | `_includes/news.html` |
| 教育 | `_data/education.json` | `_includes/education.html` |
| 实习 | `_data/internship.json` | `_includes/internship.html` |
| 荣誉 | `_data/honors.json` | `_includes/honors.html` |
| 期刊分区 | `_data/venues.json` | `_includes/publications.html` 中引用 |

## 各数据文件格式

### _data/pubs.json — 论文与专利

支持 `journal`、`conference`、`preprint`、`patent` 四个分类，任一分类无数据则对应板块自动隐藏。

```json
{
  "journal": [
    {
      "id": "zhang2024multi",
      "title": "论文标题",
      "venue": "期刊全称",
      "venueShort": "缩写",
      "year": 2025,
      "badge": "卡片左上角徽章文字",
      "image": "images/publications/teaser.webp",
      "doi": "DOI 链接（可为 null）",
      "note": "备注信息（分区、IF、关键词等）",
      "scholarId": "Google Scholar Paper ID（用于引用统计）",
      "links": [
        { "name": "PDF", "url": "assets/pubs/xxx.pdf" },
        { "name": "Code", "url": "https://github.com/xxx" }
      ],
      "referenceKey": "references.json 中对应的 key",
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
      "title": "专利标题",
      "authors": ["发明人甲", "发明人乙"]
    }
  ]
}
```

### _data/references.json — 规范引用元数据

```json
{
  "zhang2024multi": {
    "id": "zhang2024multi",
    "type": "article-journal",
    "title": "论文标题",
    "author": [{ "family": "Zhang", "given": "Zaiyan" }],
    "container-title": "期刊名称",
    "issued": { "date-parts": [[2025]] }
  }
}
```

key 必须与 `pubs.json` 中的 `referenceKey` 一致。生成后的格式不应手动修改。

论文作者的姓名和顺序来自 `references.json`。`authorRoles` 中的位置从 1 开始计数：`equalContribution` 添加 `†`，`corresponding` 添加 `*`。与 `_config.yml` 中 `author.citation_name` 匹配的作者会自动加下划线，不需要在 `pubs.json` 中手动标记。

省略 `layout` 时显示带插图的完整卡片；设置 `"layout": "compact"` 时显示不含插图的紧凑卡片。

### 引用格式生成

修改 `references.json` 后运行本地生成器：

```bash
npm install
npm run citations:build
npm run citations:check
```

生成器会将 BibTeX、RIS、CSL-JSON、IEEE、APA 和 GB/T 7714 写入 `_data/citation_outputs.json`。浏览器运行时只读取生成后的静态文件，不依赖引用库或 CDN。

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

### _data/honors.json — 荣誉奖项

支持 Markdown 语法。

```json
[
  { "year": "2023", "content": "**National Scholarship** | **国家奖学金**" },
  { "year": "2023", "content": "**Huawei Scholarship** [[link]](url)" }
]
```

### _data/venues.json — 期刊/会议分区

每个 key 为 `pubs.json` 中 `venueShort` 字段对应的缩写，分区和影响因子会显示在期刊/会议论文条目中。

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

页面右上角「语言切换」按钮旁提供主题切换按钮（🌙 / ☀），偏好持久化于 `localStorage`。

### 实现原理

- `<html>` 元素的 `data-theme` 属性在 `"light"` / `"dark"` 间切换
- `_sass/_dark-mode.scss` 中的 `html[data-theme="dark"] { ... }` 负责覆盖各组件颜色
- `_includes/head.html` 含防闪烁内联脚本，在 CSS 加载前即设置 `data-theme`
- `assets/js/lang-toggle.js` 同时管理语言和主题的切换与持久化

## 多格式引用弹窗

`_data/citation_outputs.json` 在构建时通过 Liquid 内联到页面的 `<script>` 标签中（见 `scripts.html`），`citation-dialog.js` 在页面加载后自动绑定所有 `#citation-*` 链接。点击 `Cite` 后弹出窗口，支持：

- BibTeX、RIS、CSL-JSON、IEEE、APA 和 GB/T 7714
- 一键复制到剪贴板
- 机器可读格式下载
- ESC 键或点击遮罩区域关闭
- 弹窗打开期间保留页面滚动条
- 关闭时将焦点还给原始 `Cite` 链接，但不改变当前页面位置

弹窗面板使用半透明云母片风格，滤镜为 `backdrop-filter: blur(16px) saturate(2) contrast(0.96)`。面板与代码区均保留半透明背景，可透出经过模糊处理的主页轮廓。鼠标位于引用内容区域时优先滚动该区域，位于外围遮罩时仍可继续滚动主页。

## Google Scholar 引用统计

1. 在本地安装 `scholarly` 依赖，并准备可访问 GitHub 的 SSH 推送权限。
2. Windows 执行 `google_scholar_crawler/git_update.bat`，WSL 执行 `google_scholar_crawler/git_update.sh`。WSL 脚本固定使用 `google_scholar_crawler/.venv/bin/python`；Windows 批处理使用当前 Windows 环境中的 `python`。
3. 脚本会校验抓取结果、更新本地 `results/` 快照，并仅在数据发生变化时推送到 `google-scholar-stats` 分支。
4. 若已安装 GitHub CLI，脚本会触发 `deploy.yml`。若没有 `gh`，统计分支仍会成功更新，但网站不会立即重新构建；可手动运行 `gh workflow run deploy.yml --repo zzaiyan/zzaiyan.github.io --ref main`，或等待下一次 `main` 推送触发部署。
5. `_data/pubs.json` 论文条目中填写 `scholarId` 字段。

引用数由 `fetch_google_scholar_stats.html` 在 DOM 就绪后异步获取并填充。加载器首先读取带构建版本号的同源快照；本地预览或快照暂时不可用时，再按配置顺序尝试 CDN，最后回退到 GitHub Raw。每个地址最多等待四秒，整个过程不阻塞页面渲染。

Google Scholar 对自动化访问有较严格的限制，因此爬虫保留在本地运行。抓取失败时不会覆盖上一次有效数据；网站仍会继续使用上一次成功部署的快照。

## 静态资源加载

- 本地交互脚本使用 `defer`，并保持文档中的执行顺序。
- 仅当页面 front matter 设置 `mathjax: true` 时加载 MathJax。
- 仅在配置 `google_analytics_id` 后输出 Google Analytics 脚本。
- VisitorTrace 通过异步 `map.js` 脚本加载，组件由 VisitorTrace 服务渲染；尺寸和外观由 VisitorTrace 后台配置，本仓库不再硬编码。
- 页脚最后更新时间使用 Jekyll 构建时间，不再在浏览器中请求 GitHub API。

## 添加新论文的完整流程

1. 在 `_data/pubs.json` 对应分类（`journal` / `conference` / `preprint`）中添加论文条目
2. 在 `_data/references.json` 中添加结构化引用元数据（key 与 `referenceKey` 一致）
3. 运行 `npm run citations:build && npm run citations:check`
4. 将 PDF 放入 `assets/pubs/` 目录（可选）
5. 推送到 GitHub

## 样式自定义

| 变量 | 位置 | 默认值 | 说明 |
|------|------|--------|------|
| `$card-padding` | `_publication-cards.scss` | 1.1em | 卡片通用内边距 |
| `$paper-box-image-width` | `_publication-cards.scss` | 360px | 完整论文卡片的基础图片宽度 |
| `$edu-box-image-width` | `_publication-cards.scss` | 240px | 教育/实习卡片的基础图片宽度 |
| `--card-image-share` | `_publication-cards.scss` | 36% / 28% | 完整论文卡片 / 教育卡片的响应式图片栏比例 |

多格式引用弹窗的材质透明度、背景滤镜、动态光环和响应式尺寸均在 `_sass/_citation-dialog.scss` 中定义；弹窗交互与焦点恢复逻辑位于 `assets/js/citation-dialog.js`。

`assets/css/main.scss` 仅作为编译入口。站点定制 partial 在基础主题之后按依赖顺序导入：组件基础样式、主页区块、站点控件，最后是 `_dark-mode.scss`。深色主题必须保持最后导入，避免主题覆盖被后续基础组件规则反向覆盖。

## 全局配置（_config.yml）

| 配置项 | 说明 |
|--------|------|
| `title` | 站点标题 |
| `url` / `baseurl` | canonical 站点地址与可选部署子路径 |
| `description` / `description_zh` | 站点描述（双语） |
| `seo_title` / `seo_description` | 搜索引擎与社交分享元信息 |
| `repository` | GitHub 仓库名（`user/repo`） |
| `google_scholar_stats_use_cdn` | 同源 Scholar 快照失败后是否启用 CDN 回退 |
| `google_scholar.*` | Scholar ID、统计分支/文件、CDN 列表与 GitHub Raw 回退地址 |
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
bundle exec jekyll serve --livereload
```

访问 http://127.0.0.1:4000 预览；不需要浏览器自动刷新时可以移除 `--livereload`。

## 部署

推送 `main` 后会触发 `.github/workflows/deploy.yml`。工作流只构建一次 `_site`，再将同一份产物部署到 GitHub Pages 和可通过 SSH 访问的 Web 服务器。自定义域名作为 canonical 主站，GitHub Pages 地址继续作为可独立访问的镜像。

SSH 部署使用 `server-production` Environment。需配置 `SSH_HOST`、`SSH_USER`、`SSH_PRIVATE_KEY`、`SSH_KNOWN_HOSTS` 四个 Secrets；`SSH_PORT` 可选，默认使用 22。另需设置 `SSH_DEPLOY_PATH`（例如 `/www/wwwroot/acadhome`）和 `SSH_SITE_URL`（例如 `https://example.com`）两个 Variables。版本文件上传至 `<SSH_DEPLOY_PATH>/releases/<commit-sha>`，随后通过 `<SSH_DEPLOY_PATH>/current` 软链接原子切换；Web 服务器的网站根目录应指向该 `current` 软链接。

每份产物包含 `deploy-version.json`，SSH 服务器任务在切换后会通过公网地址验证版本。需要回滚时，将 `current` 重新指向 `releases/` 下的旧版本目录。

## 故障排查

| 问题 | 排查方法 |
|------|----------|
| 论文卡片不显示 | 检查 `_data/pubs.json` JSON 语法 |
| 引用弹窗无反应 | 检查 `_data/citation_outputs.json` 中对应 key 是否存在，并运行 `npm run citations:build` |
| 引用数不显示 | 确认 `google-scholar-stats` 分支有数据 |
| 统计分支已更新但网页仍显示旧数据 | 手动触发 `deploy.yml`；仅推送统计分支不会触发网站工作流 |
| Markdown 未渲染 | 确认 JSON 中的引号已正确转义 |
| 切换语言后导航项消失 | 检查 `jquery.greedy-navigation.js` 是否包含 `resetGreedyNav` 函数 |
| 深色模式闪白 | 确认 `head.html` 中含防闪烁内联脚本 |
