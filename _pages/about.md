---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

👋 Hi there! I am Zaiyan Zhang (张再筵), currently pursuing an M.E. degree in Photogrammetry and Remote Sensing (摄影测量与遥感) at [Wuhan University (武汉大学)](https://www.whu.edu.cn/) under the direction of Prof. [Qiangqiang Yuan](https://scholar.google.com/citations?user=aItnA-sAAAAJ) and A.P. [Jie Li](https://scholar.google.com/citations?user=W4VvnDMAAAAJ). Prior to this, I obtained a B.E. degree in Data Science and Big Data Technology (数据科学与大数据技术) at [China University of Geosciences (中国地质大学)](https://www.cug.edu.cn/) in 2025 <a href='https://scholar.google.com/citations?user=ZpxXejIAAAAJ'><img src="https://img.shields.io/endpoint?logo=Google%20Scholar&url={{ url | url_encode }}&labelColor=f6f6f6&color=9cf&style=flat&label=citations" style="vertical-align:middle;margin-left:8px;"></a>.

🔬 My research focuses on Computer Vision in Remote Sensing:

- **<span style="color: #915fddff;">Low-level Vision in Remote Sensing</span>**: Cloud Removal, Dehazing, Deblurring, All-in-One Image Restoration.
- **<span style="color: #4874dbff;">Remote Sensing Foundation Models</span>**: Multimodal Foundation Models, Low-level and High-level Task Collaboration.
- **<span style="color: #2bab8bff;">Representation Learning</span>**: Contrastive Learning, Domain Adaptation, Knowledge Distillation.

🤝 I welcome collaboration and networking opportunities. Feel free to contact me via email {[1@zzaiyan.com](mailto:1@zzaiyan.com), [zzaiyan@whu.edu.cn](mailto:zzaiyan@whu.edu.cn)}!

# 🔥 News

<div class="news-scroll" markdown="1">

{% include news.html %}

</div>

# 📝 Publications

{% include publications.html %}

# 📖 Education

{% include education.html %}

<!-- 备选Emoji：🎖🏅💎🏆 -->

# 🏅 Honors and Awards

{% include honors.html %}

# 🔍 Services

<!-- ## Academic  -->

- **Program Committee** of AAAI Conference on Artificial Intelligence.

<!-- # 💬 Invited Talks
- *2021.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.
- *2021.03*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  \| [\[video\]](https://github.com/)

# 💻 Internships
- *2019.05 - 2020.02*, [Lorem](https://github.com/), China. -->

# 📚 Misc

<details class="misc-collapse" markdown="1">
<summary><span class="collapse-icon">▶</span> Click to expand</summary>

## Open Source Tools

<!-- In my spare time, I develop and maintain several open-source tools to facilitate research and development: -->

Perhaps your research field differs from mine, but may the open-source tools I've developed prove useful to your studies:

- **TorchHook - 管理 PyTorch 钩子函数**: <span class="pub-links"><a class="pub-btn" href="https://github.com/zzaiyan/TorchHook"><i class="fab fa-github"></i> Repo</a> <a class="pub-btn" href="https://github.com/zzaiyan/TorchHook/blob/main/BLOG.md"><i class="fas fa-book"></i> Tutorial</a> <a class="pub-btn" href="https://github.com/zzaiyan/TorchHook/blob/main/BLOG_CN.md"><i class="fas fa-book"></i> 教程</a></span>

  A PyTorch hooks manager, providing convenient interfaces to capture feature maps and debug models.

- **AnyCapture - 提取任意局部变量**: <span class="pub-links"><a class="pub-btn" href="https://github.com/zzaiyan/AnyCapture"><i class="fab fa-github"></i> Repo</a> <a class="pub-btn" href="https://github.com/zzaiyan/AnyCapture/blob/main/README.md"><i class="fas fa-book"></i> 教程</a></span>

  A tool to capture local variables from any function, especially useful for visualizing attention maps in deep learning models.

- **netcut - 网络剪切板**: <span class="pub-links"><a class="pub-btn" href="https://github.com/zzaiyan/netcut"><i class="fab fa-github"></i> Repo</a> <a class="pub-btn" href="https://zzaiyan.github.io/netcut/"><i class="fas fa-desktop"></i> Demo</a></span>

  A simple network clipboard application. Perfect for quickly sharing text between different devices.

Feel free to visit my [GitHub](https://github.com/zzaiyan) for more interesting projects.

<!-- ## Websites

During my studies of Computer Technologies, I operated several websites:

- **Technical Blog (技术博客)**: [b.zzaiyan.com](http://b.zzaiyan.com) - Sharing technical insights and learning experiences.
- **Personal Cloud Storage (个人网盘)**: [pan.zzaiyan.com](https://pan.zzaiyan.com/) - A personal cloud storage service (temporarily suspended due to network storage costs).
- **URL Shortner (短链接生成器, 正在开发)**: [s.zzaiyan.com](https://s.zzaiyan.com/) - A simple and efficient short URL generator to quickly create and manage short links for easy sharing. -->

</details>
