# 学术主页使用向导

[English](guide.md) · [README](../README.md)

首次使用可按以下六步完成一次内容更新和发布；日常维护可从需要的步骤开始。

## 1. 启动本地预览

准备 Ruby 3.2 和 Node.js 24，在仓库根目录执行：

```bash
bundle install
npm ci
npm run serve -- --livereload
```

打开 http://127.0.0.1:4000。看到主页后，保留这个终端，在编辑器中继续修改文件。

## 2. 更新个人信息和主页内容

先打开 [`_config.yml`](../_config.yml)，填写站点地址、作者信息与社交链接；再打开 [`_pages/about.md`](../_pages/about.md)，更新中英文介绍和研究方向。修改配置后，停止并重新运行预览命令。

要更新某个内容区块，打开对应文件，参照现有条目添加或修改：

| 要更新的内容 | 打开的文件 |
|--------------|------------|
| 新闻 | [`_data/news.json`](../_data/news.json) |
| 教育、实习 | [`_data/education.json`](../_data/education.json)、[`internship.json`](../_data/internship.json) |
| 荣誉、学术服务 | [`_data/honors.json`](../_data/honors.json)、[`services.json`](../_data/services.json) |
| 期刊分区与影响因子 | [`_data/venues.json`](../_data/venues.json) |
| 导航菜单 | [`_data/navigation.yml`](../_data/navigation.yml) |

中文字段使用 `_zh` 后缀；主页文字分别放在 `lang-en`、`lang-zh` 区块。保存后回到浏览器，确认新内容出现在对应位置。

新增开源项目时，在 `about.md` 中复制一张现有项目卡片，修改介绍、链接和 GitHub 按钮的 `repo`。随后在 `_data/metrics/github_stars.json` 添加同名 `owner/repo` 条目，初始值使用 `{"stars": null, "updated_at": null}`。

## 3. 添加一篇论文

将论文图片放入 `images/publications/`，PDF 放入 `assets/pubs/`。打开 [`_data/publications.json`](../_data/publications.json)，在 `journal`、`conference` 或 `preprint` 数组中添加记录。

以期刊论文为例，将下面的示例替换成论文信息，并使用新的唯一 `id`：

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

填写时完成以下几项：

1. 按署名顺序填写 `[姓, 名]` 作者二元组。示例中的 `corresponding: [2]` 表示第二位作者为通讯作者；共同贡献使用 `equal_contribution`。
2. 有 DOI 时，将示例中的 `URL` 字段换成 `"DOI": "10.…"`；否则填写论文页面的 `URL`。会议论文的 `type` 使用 `paper-conference`。
3. 修改图片与 PDF 路径、徽章和标签。需要期刊分区时，将 `venue_key` 设为 `venues.json` 中的对应名称。
4. 有 Scholar 论文 ID 时，在记录顶层添加 `scholar_id: "作者ID:论文ID"`，用于显示单篇引用量。

需要无图卡片时，在 `display` 中设置 `layout: "compact"`；暂不展示的论文设置 `visible: false`。

保存后，在另一个终端运行：

```bash
npm run data:build
npm run citations:check
```

回到预览页，确认论文出现在正确分类，作者顺序和通讯标记正确，并点击 **Cite** 检查生成的引用。

## 4. 按需刷新统计快照

部署会自动刷新 Scholar 和 GitHub stars。需要先在本地更新引用量时，准备 Python 3.12，然后运行：

```bash
bash scripts/fetch-google-scholar.sh
```

Windows 用户双击 `scripts\fetch-google-scholar.bat`。首次运行会自动准备 Python 环境和依赖。

看到采集成功提示后，打开 `_data/metrics/google_scholar.json` 核对引用量和更新时间。将这份快照在第 6 步一起提交，供部署采集失败时使用。总数取 Scholar 主页的 `citedby`，包括本站未展示的论文。

如果还需要在本地刷新 GitHub stars，运行：

```bash
python -m pip install -r scripts/requirements-scholar.txt
npm run data:refresh
```

可通过 `GITHUB_TOKEN` 或 `GH_TOKEN` 为 GitHub 请求提供认证。

## 5. 检查预览效果

在浏览器中切换中英文和深浅色主题，检查本次更新的文字、图片、论文按钮和 **Cite** 弹窗。预览期间再次修改论文后，重新运行 `npm run data:build`。

如果要调整排版，从 `_sass/` 中对应的样式文件开始；页面结构在 `_includes/` 和 `_layouts/` 中修改。保存后在预览中确认效果。

## 6. 提交并发布

首次发布时，先在 GitHub 仓库设置中启用 GitHub Pages 的 **GitHub Actions** 构建来源，并为 `server-production` Environment 填写 SSH 部署配置；已有配置可直接提交。

| 类型 | 配置项 |
|------|--------|
| Secrets | `SSH_HOST`、`SSH_USER`、`SSH_PRIVATE_KEY`、`SSH_KNOWN_HOSTS`；可选 `SSH_PORT`（默认 22） |
| Variables | `SSH_DEPLOY_PATH`、`SSH_SITE_URL` |

服务器站点目录应指向 `<SSH_DEPLOY_PATH>/current`。

检查本次改动后提交：

```bash
git diff
git add .
git commit -m "Update homepage"
git push origin main
```

打开 GitHub 的 **Actions → Deploy website**，等待构建、GitHub Pages 和 SSH 部署三个任务成功。最后分别访问两个站点，确认内容已更新；`deploy-version.json` 中的 `commit` 应与本次提交一致。

如果任务失败，打开失败步骤的日志，修正后重新提交。
