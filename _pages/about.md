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

<div class="lang-en" markdown="1">

👋 Hi there! I am Zaiyan Zhang (张再筵), currently pursuing an M.E. degree in Photogrammetry and Remote Sensing (摄影测量与遥感) at [Wuhan University (武汉大学)](https://www.whu.edu.cn/) under the direction of Prof. [Qiangqiang Yuan](https://scholar.google.com/citations?user=aItnA-sAAAAJ), [Jie Li](https://scholar.google.com/citations?user=W4VvnDMAAAAJ) and [Liangpei Zhang](https://scholar.google.com/citations?user=yFEl8hcAAAAJ). Prior to this, I obtained a B.E. degree in Data Science and Big Data Technology (数据科学与大数据技术) at [China University of Geosciences (中国地质大学)](https://www.cug.edu.cn/) in 2025 <a href='https://scholar.google.com/citations?user=ZpxXejIAAAAJ'><img src="https://img.shields.io/endpoint?logo=Google%20Scholar&url={{ url | url_encode }}&labelColor=f6f6f6&color=9cf&style=flat&label=citations" style="vertical-align:middle;margin-left:8px;"></a>.

🔬 My research focuses on Computer Vision in Remote Sensing:

- **<span style="color: #915fddff;">Low-level Vision in Remote Sensing</span>**: Cloud Removal, Dehazing, Deblurring, All-in-One Image Restoration.
- **<span style="color: #4874dbff;">Remote Sensing Foundation Models</span>**: Multimodal Foundation Models, Low-level and High-level Task Collaboration.
- **<span style="color: #2bab8bff;">Representation Learning</span>**: Contrastive Learning, Domain Adaptation, Knowledge Distillation.

🤝 I welcome collaboration and networking opportunities. Feel free to contact me via email {[1@zzaiyan.com](mailto:1@zzaiyan.com), [zzaiyan@whu.edu.cn](mailto:zzaiyan@whu.edu.cn)}!

</div>

<div class="lang-zh" markdown="1">

👋 大家好！我是张再筵，目前在[武汉大学](https://www.whu.edu.cn/)攻读摄影测量与遥感专业硕士学位，导师为[袁强强](https://scholar.google.com/citations?user=aItnA-sAAAAJ)、[李杰](https://scholar.google.com/citations?user=W4VvnDMAAAAJ)与[张良培](https://scholar.google.com/citations?user=yFEl8hcAAAAJ)教授。此前，我于2025年在[中国地质大学（武汉）](https://www.cug.edu.cn/)获得数据科学与大数据技术专业学士学位 <a href='https://scholar.google.com/citations?user=ZpxXejIAAAAJ'><img src="https://img.shields.io/endpoint?logo=Google%20Scholar&url={{ url | url_encode }}&labelColor=f6f6f6&color=9cf&style=flat&label=citations" style="vertical-align:middle;margin-left:8px;"></a>。

🔬 我的研究聚焦于遥感中的计算机视觉：

- **<span style="color: #915fddff;">遥感底层视觉</span>**：去云、去雾、去模糊、通用图像复原。
- **<span style="color: #4874dbff;">遥感基础模型</span>**：多模态基础模型、底层与高层任务协同。
- **<span style="color: #2bab8bff;">表征学习</span>**：对比学习、域适应、知识蒸馏。

🤝 欢迎合作与交流！您可以通过邮箱 {[1@zzaiyan.com](mailto:1@zzaiyan.com), [zzaiyan@whu.edu.cn](mailto:zzaiyan@whu.edu.cn)} 联系我。

</div>

# <span class="lang-en">🔥 News</span><span class="lang-zh">🔥 新闻动态</span>
{: #news}

<div class="news-scroll" markdown="1">

{% include news.html %}

</div>

# <span class="lang-en">📝 Publications</span><span class="lang-zh">📝 论文发表</span>
{: #publications}

{% include publications.html %}

# <span class="lang-en">📖 Education</span><span class="lang-zh">📖 教育经历</span>
{: #education}

{% include education.html %}

<!-- 备选Emoji：🎖🏅💎🏆 -->

# <span class="lang-en">🏅 Honors and Awards</span><span class="lang-zh">🏅 荣誉奖项</span>
{: #honors-and-awards}

{% include honors.html %}

# <span class="lang-en">🔍 Services</span><span class="lang-zh">🔍 学术服务</span>
{: #services}

<!-- ## Academic  -->

<div class="lang-en" markdown="1">

- **Program Committee** of AAAI Conference on Artificial Intelligence.

</div>

<div class="lang-zh" markdown="1">

- AAAI 人工智能大会 **程序委员会** 成员。

</div>

<!-- # 💬 Invited Talks
- *2021.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.
- *2021.03*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  \| [\[video\]](https://github.com/)

# 💻 Internships
- *2019.05 - 2020.02*, [Lorem](https://github.com/), China. -->

# <span class="lang-en">📚 Misc</span><span class="lang-zh">📚 其他</span>
{: #misc}

<details class="misc-collapse" markdown="1">
<summary><span class="collapse-icon">▶</span> <span class="lang-en">Click to expand</span><span class="lang-zh">点击展开</span></summary>

## <span class="lang-en">Open Source Tools</span><span class="lang-zh">开源工具</span>

<!-- In my spare time, I develop and maintain several open-source tools to facilitate research and development: -->

<div class="lang-en" markdown="1">

Perhaps your research field differs from mine, but may the open-source tools I've developed prove useful to your studies:

</div>

<div class="lang-zh" markdown="1">

也许你的研究领域与我不同，但希望我开发的这些开源工具能对你的研究有所帮助：

</div>

- **TorchHook - 管理 PyTorch 钩子函数**: <span class="pub-links"><a class="pub-btn" href="https://github.com/zzaiyan/TorchHook"><i class="fab fa-github"></i> Repo</a> <a class="pub-btn" href="https://github.com/zzaiyan/TorchHook/blob/main/BLOG.md"><i class="fas fa-book"></i> Tutorial</a> <a class="pub-btn" href="https://github.com/zzaiyan/TorchHook/blob/main/BLOG_CN.md"><i class="fas fa-book"></i> 教程</a></span>

  <span class="lang-en">A PyTorch hooks manager, providing convenient interfaces to capture feature maps and debug models.</span><span class="lang-zh">一个 PyTorch 钩子管理器，提供便捷的接口来捕获特征图和调试模型。</span>

- **AnyCapture - 提取任意局部变量**: <span class="pub-links"><a class="pub-btn" href="https://github.com/zzaiyan/AnyCapture"><i class="fab fa-github"></i> Repo</a> <a class="pub-btn" href="https://github.com/zzaiyan/AnyCapture/blob/main/README.md"><i class="fas fa-book"></i> 教程</a></span>

  <span class="lang-en">A tool to capture local variables from any function, especially useful for visualizing attention maps in deep learning models.</span><span class="lang-zh">一个从任意函数中提取局部变量的工具，特别适用于深度学习模型中注意力图的可视化。</span>

- **netcut - 网络剪切板**: <span class="pub-links"><a class="pub-btn" href="https://github.com/zzaiyan/netcut"><i class="fab fa-github"></i> Repo</a> <a class="pub-btn" href="https://zzaiyan.github.io/netcut/"><i class="fas fa-desktop"></i> Demo</a></span>

  <span class="lang-en">A simple network clipboard application. Perfect for quickly sharing text between different devices.</span><span class="lang-zh">一个简洁的网络剪贴板应用，适合在不同设备间快速分享文本。</span>

<span class="lang-en">Feel free to visit my <a href="https://github.com/zzaiyan">GitHub</a> for more interesting projects.</span><span class="lang-zh">欢迎访问我的 <a href="https://github.com/zzaiyan">GitHub</a> 查看更多有趣的项目。</span>

<!-- ## Websites

During my studies of Computer Technologies, I operated several websites:

- **Technical Blog (技术博客)**: [b.zzaiyan.com](http://b.zzaiyan.com) - Sharing technical insights and learning experiences.
- **Personal Cloud Storage (个人网盘)**: [pan.zzaiyan.com](https://pan.zzaiyan.com/) - A personal cloud storage service (temporarily suspended due to network storage costs).
- **URL Shortner (短链接生成器, 正在开发)**: [s.zzaiyan.com](https://s.zzaiyan.com/) - A simple and efficient short URL generator to quickly create and manage short links for easy sharing. -->

</details>
