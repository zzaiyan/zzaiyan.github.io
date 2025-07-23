/**
 * BibTeX Citations Database
 * Author: Zaiyan Zhang
 * Description: Centralized storage for all BibTeX citations
 */

window.BibtexDatabase = {
  // MS²TAN: Multi-scale Restoration of Missing Data in Optical Time-series Images
  'ms2tan': `@article{zhang2024multi,
  author   = {Zhang, Zaiyan and Yan, Jining and Liang, Yuanqi and Feng, Jiaxin and He, Haixu and Cao, Li},
  journal  = {IEEE Transactions on Geoscience and Remote Sensing},
  title    = {Multiscale Restoration of Missing Data in Optical Time-series Images with Masked Spatial-Temporal Attention Network},
  year     = {2025},
  volume   = {63},
  pages    = {1-15},
  keywords = {Remote sensing;Image restoration;Feature extraction;Image reconstruction;Spatiotemporal phenomena;Accuracy;Spatial resolution;Mathematical models;Training;Optimization methods;missing data restoration;time-series remote sensing images;masked spatial-temporal attention;multi-scale restoration;multi-objective joint optimization},
  doi      = {10.1109/TGRS.2025.3574799}
}`,

  // 示例：添加更多文章时的格式
  // 'paper2_shortname': `@article{author2024title,
  //   author   = {Author, Name and Coauthor, Name},
  //   journal  = {Journal Name},
  //   title    = {Paper Title},
  //   year     = {2024},
  //   volume   = {1},
  //   pages    = {1-10},
  //   doi      = {10.1000/journal.2024.0001}
  // }`,

  // 'conference_paper_shortname': `@inproceedings{author2024conf,
  //   author    = {Author, Name and Coauthor, Name},
  //   title     = {Conference Paper Title},
  //   booktitle = {Proceedings of Conference Name},
  //   year      = {2024},
  //   pages     = {1-8},
  //   address   = {City, Country},
  //   publisher = {Publisher}
  // }`,

  // 获取BibTeX数据的方法
  getBibtex: function(key) {
    return this[key] || null;
  },

  // 获取所有可用的文章键
  getAvailableKeys: function() {
    return Object.keys(this).filter(key => 
      typeof this[key] === 'string' && key !== 'getBibtex' && key !== 'getAvailableKeys'
    );
  }
};
