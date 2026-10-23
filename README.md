# Zaiyan Zhang (张再筵)

*"Building AI for open-world Earth observation."*

[![Website](https://img.shields.io/badge/Website-zzaiyan.com-orange?style=flat-square&logo=googlechrome&logoColor=white)](https://zzaiyan.com)
[![Google Scholar](https://img.shields.io/badge/Google-Scholar-4285F4?style=flat-square&logo=googlescholar&logoColor=white)](https://scholar.google.com/citations?user=ZpxXejIAAAAJ&hl=en)
[![Email](https://img.shields.io/badge/Email-1%40zzaiyan.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:1@zzaiyan.com)

---

这是我的学术个人主页源码，基于 Jekyll 构建，参考了 [Yi Ren](https://rayeren.github.io/) 等人的开源实现。主站部署于 [zzaiyan.com](https://zzaiyan.com)，[GitHub Pages](https://zzaiyan.github.io) 提供镜像访问。

## ✨ 特性

- **学术展示**：论文、教育与实习经历、荣誉、学术服务及开源项目。
- **阅读体验**：中英文切换、深浅色主题，以及适配桌面和移动端的布局。
- **论文引用**：支持 BibTeX、IEEE、APA、GB/T 7714、RIS 和 CSL-JSON 的展示、复制与下载。
- **统计信息**：展示 Google Scholar 引用量、GitHub stars 和访客统计。
- **内容管理**：通过结构化数据维护论文、新闻和个人经历等内容。
- **自动部署**：通过 GitHub Actions 发布到 GitHub Pages 和 SSH 站点。

## 📖 使用向导

| 语言 | 链接 |
|------|------|
| 中文 | [docs/guide_zh.md](docs/guide_zh.md) |
| English | [docs/guide.md](docs/guide.md) |

## 🛠️ 快速开始

准备 Ruby 3.2 和 Node.js 24：

```bash
# 安装依赖
bundle install
npm ci

# 启动本地预览
npm run serve
```

访问 http://127.0.0.1:4000。内容更新、统计刷新和发布步骤见使用向导。
