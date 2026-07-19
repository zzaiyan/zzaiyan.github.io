# Zaiyan Zhang (张再筵)

*"Building AI for open-world Earth observation."*

[![GitHub](https://img.shields.io/badge/GitHub-zzaiyan-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/zzaiyan)
[![Google Scholar](https://img.shields.io/badge/Google_Scholar-Publications-4285f4?style=flat-square&logo=googlescholar&logoColor=white)](https://scholar.google.com/citations?user=ZpxXejIAAAAJ&hl=en)
[![Website](https://img.shields.io/badge/Website-zzaiyan.com-0f766e?style=flat-square&logo=googlechrome&logoColor=white)](https://zzaiyan.com)

---

这是我的学术个人主页源码，基于 Jekyll 构建，参考了 [Yi Ren](https://rayeren.github.io/) 等多人的源代码，并加入了一系列新特性。主站部署于 [zzaiyan.com](https://zzaiyan.com)，同时发布至 [GitHub Pages](https://zzaiyan.github.io) 作为镜像。

## ✨ 特性

- **数据驱动**：论文、新闻、教育经历、荣誉等均通过 `_data/` 目录下的 JSON/YAML 文件管理，无需直接编辑 HTML
- **多格式引用**：支持 BibTeX、RIS、CSL-JSON、IEEE、APA 和 GB/T 7714 的展示、复制与下载
- **双语切换**：支持中英文一键切换，首选语言持久化保存
- **深色/浅色主题**：内置主题切换，偏好本地持久化
- **响应式布局**：移动端友好，导航栏自适应折叠
- **Google Scholar 统计**：自动同步引用数等学术统计数据

## 📖 文档

| 语言 | 链接 |
|------|------|
| English | [docs/guide.md](docs/guide.md) |
| 中文 | [docs/guide_zh.md](docs/guide_zh.md) |

## 🛠️ 快速开始

```bash
# 安装依赖
bundle install

# 本地预览
bundle exec jekyll serve
```

编辑 `_config.yml` 填写个人信息，修改 `_data/` 下的 JSON 文件更新内容，即可完成定制。
