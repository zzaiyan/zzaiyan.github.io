/**
 * BibTeX Citation Modal Functionality
 * Author: Zaiyan Zhang
 * Description: Provides modal popup functionality for displaying BibTeX citations
 */

(function() {
  'use strict';

  // BibTeX数据管理器
  const BibtexManager = {
    // 获取BibTeX数据（从外部数据库）
    getBibtex: function(key) {
      if (window.BibtexDatabase && typeof window.BibtexDatabase.getBibtex === 'function') {
        return window.BibtexDatabase.getBibtex(key);
      }
      console.warn('BibtexDatabase not loaded or not available');
      return null;
    },

    // 获取所有可用的文章键
    getAvailableKeys: function() {
      if (window.BibtexDatabase && typeof window.BibtexDatabase.getAvailableKeys === 'function') {
        return window.BibtexDatabase.getAvailableKeys();
      }
      return [];
    },

    // 检查数据库是否已加载
    isDatabaseLoaded: function() {
      return window.BibtexDatabase !== undefined;
    }
  };

  // 模态框管理器
  const ModalManager = {
    // 创建模态框
    createModal: function(bibtex) {
      const modal = document.createElement('div');
      modal.className = 'bibtex-modal';
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.5); z-index: 1000; display: flex; 
        justify-content: center; align-items: center;
      `;
      
      const content = document.createElement('div');
      content.className = 'bibtex-modal-content';
      content.style.cssText = `
        background: white; padding: 20px; border-radius: 8px; 
        max-width: 600px; width: 90%; max-height: 80%; overflow-y: auto;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      `;
      
      content.innerHTML = `
        <div class="bibtex-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h3 style="margin: 0; color: #333;">BibTeX Citation</h3>
          <button class="bibtex-close-btn" 
                  style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">&times;</button>
        </div>
        <textarea readonly class="bibtex-content" 
                  style="width: 100%; height: 200px; font-family: monospace; 
                         border: 1px solid #ddd; padding: 10px; border-radius: 4px; 
                         resize: vertical; background: #f9f9f9; cursor: text; 
                         user-select: text; -webkit-user-select: text; -moz-user-select: text;">${bibtex}</textarea>
        <div class="bibtex-actions" style="margin-top: 15px; text-align: right;">
          <button class="bibtex-copy-btn" 
                  style="background: #007cba; color: white; border: none; padding: 8px 16px; 
                         border-radius: 4px; cursor: pointer; margin-right: 10px;">
            Copy to Clipboard
          </button>
          <button class="bibtex-close-btn" 
                  style="background: #6c757d; color: white; border: none; padding: 8px 16px; 
                         border-radius: 4px; cursor: pointer;">
            Close
          </button>
        </div>
      `;
      
      modal.appendChild(content);
      document.body.appendChild(modal);
      
      // 绑定事件
      this.bindEvents(modal, bibtex);
      
      return modal;
    },

    // 绑定事件
    bindEvents: function(modal, bibtex) {
      const closeButtons = modal.querySelectorAll('.bibtex-close-btn');
      const copyButton = modal.querySelector('.bibtex-copy-btn');
      const textarea = modal.querySelector('.bibtex-content');

      // 关闭按钮事件
      closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.closeModal(modal);
        });
      });

      // 点击模态框外部关闭
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal);
        }
      });

      // 复制按钮事件
      copyButton.addEventListener('click', (e) => {
        this.copyToClipboard(textarea, copyButton);
      });

      // ESC键关闭
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          this.closeModal(modal);
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    },

    // 关闭模态框
    closeModal: function(modal) {
      if (modal && modal.parentNode) {
        modal.remove();
      }
    },

    // 复制到剪贴板
    copyToClipboard: function(textarea, button) {
      // 选中文本
      textarea.select();
      textarea.setSelectionRange(0, 99999);
      
      const originalText = button.textContent;
      
      // 尝试复制
      const copyWithFallback = () => {
        // 现代浏览器API
        if (navigator.clipboard && navigator.clipboard.writeText) {
          return navigator.clipboard.writeText(textarea.value)
            .then(() => this.showCopySuccess(button, originalText))
            .catch(() => this.fallbackCopy(textarea, button, originalText));
        } else {
          return this.fallbackCopy(textarea, button, originalText);
        }
      };

      copyWithFallback().catch(() => {
        alert('复制失败，请手动选择文本复制');
      });
    },

    // 降级复制方法
    fallbackCopy: function(textarea, button, originalText) {
      return new Promise((resolve, reject) => {
        try {
          textarea.focus();
          textarea.select();
          const successful = document.execCommand('copy');
          if (successful) {
            this.showCopySuccess(button, originalText);
            resolve();
          } else {
            reject(new Error('execCommand failed'));
          }
        } catch (err) {
          reject(err);
        }
      });
    },

    // 显示复制成功状态
    showCopySuccess: function(button, originalText) {
      button.textContent = 'Copied!';
      button.style.background = '#28a745';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#007cba';
      }, 2000);
    }
  };

  // 主要BibTeX功能类
  const BibtexCitation = {
    // 显示BibTeX引用
    show: function(paperKey) {
      // 检查数据库是否已加载
      if (!BibtexManager.isDatabaseLoaded()) {
        console.error('BibTeX database not loaded. Please check if bibtex-data.js is properly included.');
        alert('BibTeX数据库未加载，请刷新页面重试。');
        return;
      }

      const bibtex = BibtexManager.getBibtex(paperKey);
      if (!bibtex) {
        console.warn(`BibTeX data not found for key: ${paperKey}`);
        console.log('Available keys:', BibtexManager.getAvailableKeys());
        alert(`未找到文章"${paperKey}"的BibTeX数据。`);
        return;
      }

      // 自动复制到剪贴板（静默）
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(bibtex).catch(() => {
          console.log('Silent copy failed, will show manual copy option');
        });
      }

      // 显示模态框
      ModalManager.createModal(bibtex);
    },

    // 初始化BibTeX链接
    init: function() {
      // 如果DOM还在加载中，等待DOMContentLoaded事件
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.bindBibtexLinks();
        });
      } else {
        // DOM已经加载完成，直接绑定
        this.bindBibtexLinks();
      }
    },

    // 绑定BibTeX链接事件
    bindBibtexLinks: function() {
      // 查找所有BibTeX链接
      const bibtexLinks = document.querySelectorAll('a[href^="#bibtex-"]');
      
      bibtexLinks.forEach(link => {
        const href = link.getAttribute('href');
        const paperKey = href.replace('#bibtex-', '');
        
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.show(paperKey);
        });
      });
    }
  };

  // 全局API
  window.BibtexCitation = BibtexCitation;
  window.BibtexManager = BibtexManager;

  // 自动初始化
  BibtexCitation.init();

})();
