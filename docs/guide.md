# 学术主页模板使用指南

本项目是一个基于 Jekyll + GitHub Pages 的个人学术主页，支持论文列表自动渲染、BibTeX 引用弹窗、Google Scholar 引用统计等功能。

## 目录结构

```
.
├── _config.yml              # Jekyll 全局配置（站点标题、作者信息、插件等）
├── _layouts/
│   └── default.html         # 页面布局模板
├── _includes/
│   ├── head.html            # <head> 标签（CSS、meta）
│   ├── scripts.html         # 页面底部 JS 脚本引入
│   ├── footer.html          # 页脚（访客地图、版权信息、最后更新时间）
│   ├── sidebar.html         # 侧边栏（作者信息）
│   ├── author-profile.html  # 作者头像与社交链接
│   ├── masthead.html        # 顶部导航栏
│   ├── seo.html             # SEO meta 标签
│   ├── analytics.html       # Google Analytics
│   └── fetch_google_scholar_stats.html  # Google Scholar 引用统计
├── _pages/
│   └── about.md             # 主页内容（Markdown）
├── _sass/                   # 样式源文件
│   ├── _page.scss           # 页面主样式 + paper-box 卡片样式
│   ├── _bibtex-citation.scss # BibTeX 模态框样式
│   └── ...
├── assets/
│   ├── css/main.scss        # 样式入口，导入所有 _sass 文件
│   └── js/
│       ├── pub-renderer.js  # 论文卡片渲染器（读取 JSON 数据并生成 HTML）
│       ├── bibtex-citation.js # BibTeX 引用弹窗功能
│       └── last-update.js   # 自动获取最后更新时间
├── data/
│   ├── pubs.json            # 论文与专利数据
│   └── bibtex.json          # BibTeX 引用数据
├── pubs/                    # 论文 PDF 文件
├── images/                  # 图片资源
├── google_scholar_crawler/  # Google Scholar 爬虫
└── docs/                    # 文档
```

## 核心功能

### 1. 论文列表自动渲染

论文信息集中存储在 `data/pubs.json` 中，页面加载后由 `pub-renderer.js` 读取数据并自动生成论文卡片。

**数据格式**（`data/pubs.json`）:

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
      "scholarId": "Google Scholar ID（用于引用统计）",
      "links": [
        { "name": "PDF", "url": "pubs/xxx.pdf" },
        { "name": "arXiv", "url": "https://arxiv.org/abs/xxx" },
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

**在 about.md 中只需放置容器标签**:

```markdown
## Journal Papers
<div id="pub-journal"></div>

## Conference Papers
<div id="pub-conference"></div>

## Patents
<div id="pub-patent"></div>
```

渲染器会自动填充这些容器。

### 2. BibTeX 引用弹窗

BibTeX 数据集中存储在 `data/bibtex.json` 中：

```json
{
  "zhang2024multi": "@article{zhang2024multi,\n  author = {...},\n  ...}",
  "zhang2026task": "@article{zhang2026task,\n  ...}"
}
```

**工作流程**:
1. `pub-renderer.js` 加载 `data/bibtex.json` 并将其注册为 `window.BibtexDatabase`
2. 渲染论文卡片时，为每篇有 `bibtexKey` 的论文自动生成 `[BibTeX]` 链接（`#bibtex-key`）
3. `bibtex-citation.js` 监听这些链接的点击事件，弹出模态框显示引用信息
4. 支持一键复制、ESC 关闭、点击遮罩关闭

### 3. Google Scholar 引用统计

利用 Google Scholar 爬虫（`google_scholar_crawler/`）定期抓取引用数据到 `google-scholar-stats` 分支。

**配置方法**:
1. 在 GitHub 仓库的 Settings → Secrets → Actions 中添加 `GOOGLE_SCHOLAR_ID`
2. 在 `_config.yml` 中配置 `google_scholar_stats_use_cdn: true`

**在论文数据中使用**: 在 `data/pubs.json` 的论文条目中填写 `scholarId` 字段，渲染器会自动生成引用统计占位元素，页面加载后由 `fetch_google_scholar_stats.html` 脚本填充实际引用数。

### 4. 最后更新时间

`last-update.js` 通过 GitHub API 获取仓库最后一次提交的时间，并显示在页脚。无需手动维护。

### 5. 访客统计

页脚中嵌入了 ClustrMaps 访客地图，在 `_includes/footer.html` 中配置。

## 添加新论文的完整流程

1. **添加论文数据**: 在 `data/pubs.json` 对应的分类（`journal`/`conference`/`patent`）中新增条目
2. **添加 BibTeX**: 在 `data/bibtex.json` 中添加对应的 BibTeX 条目，key 与 `pubs.json` 中的 `bibtexKey` 一致
3. **上传 PDF**（可选）: 将 PDF 文件放入 `pubs/` 目录，并在 links 中引用
4. **推送到 GitHub**: 修改会自动部署

## 样式自定义

- **论文卡片样式**: [assets/css/main.scss](../assets/css/main.scss) 中的 `.paper-box` 相关变量
  - `$paper-box-image-width`: 论文图片宽度（默认 360px）
  - `$paper-box-padding`: 卡片内边距（默认 2em）
- **教育卡片样式**: `.edu-box` 相关变量
  - `$edu-box-image-width`: 学校 logo 宽度（默认 240px）
- **徽章样式**: `.badge` 类控制论文图片上的分类标签
- **BibTeX 弹窗**: [_sass/_bibtex-citation.scss](../_sass/_bibtex-citation.scss)

## 全局配置（_config.yml）

| 配置项 | 说明 |
|--------|------|
| `title` | 站点标题 |
| `description` | 站点描述（SEO） |
| `repository` | GitHub 仓库名（格式：`user/repo`） |
| `google_scholar_stats_use_cdn` | 是否使用 CDN 读取引用数据 |
| `google_analytics_id` | Google Analytics 跟踪 ID |
| `author.*` | 作者信息（头像、社交链接等） |

## 本地调试

```bash
# 安装依赖
bundle install

# 启动开发服务器
bash run_server.sh
# 或
bundle exec jekyll serve
```

访问 http://127.0.0.1:4000 预览。修改文件后服务器会自动重新编译（`_config.yml` 除外）。

## 故障排查

| 问题 | 排查方法 |
|------|----------|
| 论文卡片不显示 | 打开浏览器控制台，检查 `data/pubs.json` 是否加载成功 |
| BibTeX 弹窗无反应 | 检查 `data/bibtex.json` 中是否存在对应的 key |
| 引用数不显示 | 确认 `google-scholar-stats` 分支中有最新数据；确认 `scholarId` 字段正确 |
| 样式异常 | 清除浏览器缓存，确认 `main.scss` 正确导入所有样式文件 |
