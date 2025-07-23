# BibTeX Citation System

这是一个为学术主页设计的BibTeX引用系统，支持弹窗显示和一键复制功能。

## 文件结构

```
assets/
├── data/
│   └── bibtex-data.js          # BibTeX数据存储文件
├── js/
│   └── bibtex-citation.js      # BibTeX功能实现
└── css/
    └── main.scss               # 主样式文件（包含BibTeX样式）
_sass/
└── _bibtex-citation.scss       # BibTeX专用样式
_includes/
└── scripts.html                # 脚本引入文件
```

## 使用方法

### 1. 添加新的BibTeX条目

在 `assets/data/bibtex-data.js` 文件中添加新条目：

```javascript
window.BibtexDatabase = {
  // 现有条目
  'ms2tan': `@article{zhang2024multi,
    // ... BibTeX内容
  }`,
  
  // 添加新条目
  'your_paper_shortname': `@article{your2024paper,
    author   = {Your, Name and Coauthor, Name},
    journal  = {Journal Name},
    title    = {Your Paper Title},
    year     = {2024},
    volume   = {1},
    pages    = {1-10},
    doi      = {10.1000/journal.2024.0001}
  }`,
};
```

### 2. 在Markdown中添加BibTeX链接

在你的文章描述中添加BibTeX链接：

```markdown
[[Paper]](https://doi.org/...), [[Code]](https://github.com/...), [[BibTeX]](#bibtex-your_paper_shortname)
```

注意：链接格式为 `#bibtex-` + 你在数据文件中定义的简写名。

### 3. 文章简写命名规范

建议使用以下命名规范：
- **期刊论文**: `author_year_keyword` (如: `zhang2024ms2tan`)
- **会议论文**: `author_year_conf_keyword` (如: `zhang2024cvpr_restoration`)
- **预印本**: `author_year_arxiv_keyword` (如: `zhang2024arxiv_survey`)

## 功能特性

- ✅ 点击BibTeX链接弹出格式化的引用信息
- ✅ 自动复制到剪贴板
- ✅ 手动复制按钮
- ✅ 响应式设计，支持移动设备
- ✅ 键盘支持（ESC键关闭）
- ✅ 优雅的动画效果
- ✅ 良好的可访问性支持

## 样式定制

BibTeX模态框的样式在 `_sass/_bibtex-citation.scss` 中定义，你可以根据需要修改：

- 模态框颜色和大小
- 按钮样式
- 字体和排版
- 动画效果
- 响应式断点

## 故障排除

### BibTeX链接点击无反应
1. 检查控制台是否有JavaScript错误
2. 确认 `bibtex-data.js` 文件已正确加载
3. 检查文章简写名是否在数据文件中存在

### 复制功能不工作
1. 确保网站通过HTTPS或localhost访问
2. 检查浏览器是否支持Clipboard API
3. 系统会自动降级到传统复制方法

### 样式显示异常
1. 确认 `_bibtex-citation.scss` 已被正确导入到 `main.scss`
2. 重新编译CSS文件
3. 清除浏览器缓存

## 添加新文章的完整流程

1. 在 `assets/data/bibtex-data.js` 中添加BibTeX数据
2. 在对应的Markdown文件中添加BibTeX链接
3. 使用合适的文章简写名
4. 测试链接是否正常工作

## 示例

完整的文章条目示例：

```markdown
<div class='paper-box-text' markdown="1">

***Your Amazing Paper Title***

**<u>Your Name</u>**, Coauthor Name

*Conference/Journal Name*, 2024

[[Paper]](https://doi.org/...), [[Code]](https://github.com/...), [[BibTeX]](#bibtex-your2024amazing)

</div>
```

对应的BibTeX数据：

```javascript
'your2024amazing': `@article{your2024amazing,
  author = {Your, Name and Coauthor, Name},
  title  = {Your Amazing Paper Title},
  // ... 其他字段
}`
```
