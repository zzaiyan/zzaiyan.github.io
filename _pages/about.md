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

Zaiyan Zhang (张再筵) is currently pursuing an M.E. degree in Photogrammetry and Remote Sensing (摄影测量与遥感) at [Wuhan University (武汉大学)](https://www.whu.edu.cn/). Previously, he obtained a B.E. degree in Data Science and Big Data Technology (数据科学与大数据技术) from [China University of Geosciences (中国地质大学)](https://www.cug.edu.cn/).

His research interests include remote sensing image processing, multimodal data fusion, low-level vision, land-cover change detection, and computer vision.

<!-- My research interest includes image processing, time series analysis, land cover change detection, computer vision, and deep learning. I have published more than 100 papers at the top international AI conferences with total <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'>google scholar citations <strong><span id='total_cit'>260000+</span></strong></a> (You can also use google scholar badge <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>). -->


# 🔥 News
- *2025.05*:&ensp;🎉🎉 Our work ***MS$^2$TAN: Multi-scale Restoration of Missing Data in Optical Time-series Images with Masked Spatial-Temporal Attention Network*** was accepted by **IEEE Transactions on Geoscience and Remote Sensing (TGRS)**.
- *2024.06*:&ensp;🎉🎉 Our work “***Image-text mutual retrieval method based on large-scale pre-training CLIP model fine-tuning***” won the **Grand Prize (Top 0.1%)** in the **12th “Teddy Cup” Data Mining Challenge** [[link]](https://www.tipdm.org/dsej12/2429.jhtml).


# 📖 Experience
- *2025.09 - 20XX.06 (now)*, **M.E.** in [Wuhan University](https://www.whu.edu.cn/), supervised by Prof. [Qiangqiang Yuan](https://scholar.google.com/citations?user=aItnA-sAAAAJ).
- *2021.09 - 2025.06*, **B.E.** in [China University of Geosciences](https://www.cug.edu.cn/), supervised by A.P. [Jining Yan](https://scholar.google.com/citations?user=iYTHxQcAAAAJ). 
<!-- - *2015.09 - 2019.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->


<!-- 备选Emoji：🎖🏅💎🏆 -->
# 🏅 Honors and Awards
- *2025*,&ensp;**Outstanding Undergraduate Graduate of CUG**.
- *2024*,&ensp;**"Teddy Cup" Data Mining Challenge, Grand Prize** (Top 0.1%) [[link]](https://www.tipdm.org/dsej12/2429.jhtml).
- *2024*,&ensp;**National Encouragement Scholarship**.
- *2023*,&ensp;**National Scholarship**.
- *2023*,&ensp;**Huawei Scholarship** (32 candidates annually) [[link]](https://cs.cug.edu.cn/info/1019/6103.htm).
- *2023*,&ensp;**Chow Tai Fook Scholarship** (50 candidates annually).
- *2022, 2023, 2024*,&ensp;**Outstanding Student Model**.
- *2022*,&ensp;**Outstanding Student Scholarship**.


# 📝 Publications 

## Journal Papers

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">IEEE TGRS</div><img src='https://arxiv.org/html/2406.13358v2/x2.png' alt="sym" width="300"></div></div>
<div class='paper-box-text' markdown="1">

***MS$^2$TAN: Multi-scale Restoration of Missing Data in Optical Time-series Images with Masked Spatial-Temporal Attention Network***

**<u>Zaiyan Zhang</u>**, Jining Yan, Yuanqi Liang, Jiaxin Feng, Haixu He, Li Cao

*IEEE Transactions on Geoscience and Remote Sensing* **(IEEE TGRS)**, 2025

中科院一区Top，JCR Q1, IF=7.5. **Multi-Temporal Image Restoration**.

[[Paper]](https://doi.org/10.1109/tgrs.2025.3574799), [[arXiv]](https://arxiv.org/abs/2406.13358), [[Code]](https://github.com/CUG-BEODL/MS2TAN), [[BibTeX]](#bibtex-ms2tan)

<!-- ## Conference Papers -->

<!-- - [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet](https://github.com), A, B, C, **CVPR 2020** -->

<!-- ## Preprints -->

</div>
</div>

<script>
function showBibTeX(paperKey) {
  const bibtexData = {
    'ms2tan': `@article{zhang2024multi,
  author   = {Zhang, Zaiyan and Yan, Jining and Liang, Yuanqi and Feng, Jiaxin and He, Haixu and Cao, Li},
  journal  = {IEEE Transactions on Geoscience and Remote Sensing},
  title    = {Multiscale Restoration of Missing Data in Optical Time-series Images with Masked Spatial-Temporal Attention Network},
  year     = {2025},
  volume   = {63},
  pages    = {1-15},
  keywords = {Remote sensing;Image restoration;Feature extraction;Image reconstruction;Spatiotemporal phenomena;Accuracy;Spatial resolution;Mathematical models;Training;Optimization methods;missing data restoration;time-series remote sensing images;masked spatial-temporal attention;multi-scale restoration;multi-objective joint optimization},
  doi      = {10.1109/TGRS.2025.3574799}
}`
  };
  
  const bibtex = bibtexData[paperKey];
  if (bibtex) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
      background: rgba(0,0,0,0.5); z-index: 1000; display: flex; 
      justify-content: center; align-items: center;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: white; padding: 20px; border-radius: 8px; 
      max-width: 600px; width: 90%; max-height: 80%; overflow-y: auto;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
    
    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0; color: #333;">BibTeX Citation</h3>
        <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">&times;</button>
      </div>
      <textarea readonly style="width: 100%; height: 200px; font-family: monospace; 
                                border: 1px solid #ddd; padding: 10px; border-radius: 4px; 
                                resize: vertical; background: #f9f9f9; cursor: text; 
                                user-select: text; -webkit-user-select: text; -moz-user-select: text;" 
                id="bibtex-content">${bibtex}</textarea>
      <div style="margin-top: 15px; text-align: right;">
        <button onclick="copyBibTeX(event)" 
                style="background: #007cba; color: white; border: none; padding: 8px 16px; 
                       border-radius: 4px; cursor: pointer; margin-right: 10px;">
          Copy to Clipboard
        </button>
        <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                style="background: #6c757d; color: white; border: none; padding: 8px 16px; 
                       border-radius: 4px; cursor: pointer;">
          Close
        </button>
      </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // 自动复制到剪贴板
    navigator.clipboard.writeText(bibtex).then(() => {
      console.log('BibTeX copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
    
    // 点击模态框外部关闭
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
  }
}

function copyBibTeX(event) {
  event.preventDefault();
  event.stopPropagation();
  
  const textarea = document.getElementById('bibtex-content');
  const button = event.target;
  
  // 选中文本内容
  textarea.select();
  textarea.setSelectionRange(0, 99999); // 对移动设备
  
  // 尝试复制
  try {
    // 先尝试现代API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textarea.value).then(() => {
        showCopySuccess(button);
      }).catch(err => {
        console.error('Clipboard API failed: ', err);
        // 降级到document.execCommand
        fallbackCopy(textarea, button);
      });
    } else {
      // 降级到document.execCommand
      fallbackCopy(textarea, button);
    }
  } catch (err) {
    console.error('Copy failed: ', err);
    alert('复制失败，请手动选择文本复制');
  }
}

function fallbackCopy(textarea, button) {
  try {
    textarea.focus();
    textarea.select();
    const successful = document.execCommand('copy');
    if (successful) {
      showCopySuccess(button);
    } else {
      throw new Error('execCommand failed');
    }
  } catch (err) {
    console.error('Fallback copy failed: ', err);
    alert('复制失败，请手动选择文本复制');
  }
}

function showCopySuccess(button) {
  const originalText = button.textContent;
  button.textContent = 'Copied!';
  button.style.background = '#28a745';
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '#007cba';
  }, 2000);
}
</script>

<!-- 添加点击事件处理 -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  // 为 BibTeX 链接添加点击事件
  const bibtexLink = document.querySelector('a[href="#bibtex-ms2tan"]');
  if (bibtexLink) {
    bibtexLink.onclick = function(e) {
      e.preventDefault();
      showBibTeX('ms2tan');
    };
  }
});
</script>

## Patents

- *2025.02*, ZL202410556414.6, **遥感图像序列的修复方法、装置、电子设备及存储介质**, &ensp;阎继宁, **<u>张再筵</u>**, 王力哲, 李军, 韩伟, 王玥玮.

<!-- # 💬 Invited Talks
- *2021.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2021.03*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  \| [\[video\]](https://github.com/)

# 💻 Internships
- *2019.05 - 2020.02*, [Lorem](https://github.com/), China. -->