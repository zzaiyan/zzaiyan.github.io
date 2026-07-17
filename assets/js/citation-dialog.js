/**
 * Accessible multi-format citation dialog.
 */
(function () {
  "use strict";

  const focusableSelector = [
    "button:not([disabled])",
    "a[href]",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  const formats = [
    { id: "bibtex", en: "BibTeX", zh: "BibTeX", extension: "bib", downloadable: true },
    { id: "ris", en: "RIS", zh: "RIS", extension: "ris", downloadable: true },
    { id: "csl-json", en: "CSL-JSON", zh: "CSL-JSON", extension: "json", downloadable: true },
    { id: "ieee", en: "IEEE", zh: "IEEE", extension: "txt", downloadable: false },
    { id: "apa", en: "APA", zh: "APA", extension: "txt", downloadable: false },
    { id: "gb-t-7714", en: "GB/T 7714", zh: "GB/T 7714", extension: "txt", downloadable: false },
  ];

  let activeDialog = null;

  function getEntry(key) {
    return window.CitationDatabase && window.CitationDatabase[key];
  }

  function getFormat(id) {
    return formats.find((format) => format.id === id) || formats[0];
  }

  function setCopyState(button, state) {
    const icon = button.querySelector("i");
    const english = button.querySelector(".lang-en");
    const chinese = button.querySelector(".lang-zh");

    button.classList.toggle("is-copied", state === "copied");
    button.classList.toggle("is-error", state === "error");

    if (state === "copied") {
      icon.className = "fas fa-check";
      english.textContent = "Copied";
      chinese.textContent = "已复制";
    } else if (state === "error") {
      icon.className = "fas fa-exclamation-circle";
      english.textContent = "Copy failed";
      chinese.textContent = "复制失败";
    } else {
      icon.className = "fas fa-copy";
      english.textContent = "Copy";
      chinese.textContent = "复制";
    }
  }

  function selectCode(code) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function createDialog(entry, paperKey, trigger) {
    if (activeDialog) activeDialog.removeImmediately();

    const modal = document.createElement("div");
    modal.className = "citation-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "citation-dialog-title");
    modal.innerHTML = `
      <section class="citation-modal__panel" tabindex="-1">
        <header class="citation-modal__header">
          <div class="citation-modal__heading">
            <h2 class="citation-modal__title" id="citation-dialog-title">
              <span class="lang-en">Citation</span><span class="lang-zh">引用</span>
            </h2>
            <code class="citation-modal__key"></code>
          </div>
          <button class="citation-dismiss-btn" type="button" aria-label="Close citation dialog" title="Close">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
        </header>
        <div class="citation-modal__body">
          <nav class="citation-format-tabs" role="tablist" aria-label="Citation format"></nav>
          <pre class="citation-code" tabindex="0"><code></code></pre>
        </div>
        <footer class="citation-modal__footer">
          <button class="citation-download-btn" type="button" hidden>
            <i class="fas fa-download" aria-hidden="true"></i>
            <span class="lang-en">Download</span><span class="lang-zh">下载</span>
          </button>
          <button class="citation-copy-btn" type="button" aria-live="polite">
            <i class="fas fa-copy" aria-hidden="true"></i>
            <span class="lang-en">Copy</span><span class="lang-zh">复制</span>
          </button>
        </footer>
      </section>`;

    const panel = modal.querySelector(".citation-modal__panel");
    const tabs = modal.querySelector(".citation-format-tabs");
    const codeBlock = modal.querySelector(".citation-code");
    const code = modal.querySelector(".citation-code code");
    const key = modal.querySelector(".citation-modal__key");
    const copyButton = modal.querySelector(".citation-copy-btn");
    const downloadButton = modal.querySelector(".citation-download-btn");
    const closeButton = modal.querySelector(".citation-dismiss-btn");
    const controller = new AbortController();
    const signal = controller.signal;
    let copyResetTimer = null;
    let removed = false;
    let currentFormat = formats[0];

    key.textContent = paperKey;
    formats.forEach((format) => {
      const tab = document.createElement("button");
      tab.className = "citation-format-tab";
      tab.type = "button";
      tab.dataset.format = format.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", "false");
      tab.innerHTML = `<span class="lang-en">${format.en}</span><span class="lang-zh">${format.zh}</span>`;
      tabs.appendChild(tab);
      tab.addEventListener("click", () => setFormat(format.id), { signal });
    });

    const scrollbarWidth = Math.max(
      0,
      window.innerWidth - document.documentElement.clientWidth,
    );
    document.body.style.setProperty(
      "--citation-body-padding-right",
      window.getComputedStyle(document.body).paddingRight,
    );
    document.body.style.setProperty(
      "--citation-scrollbar-compensation",
      `${scrollbarWidth}px`,
    );

    function setFormat(formatId) {
      currentFormat = getFormat(formatId);
      const value = entry.formats[currentFormat.id] || "";
      code.textContent = value;
      codeBlock.dataset.format = currentFormat.id;
      downloadButton.hidden = !currentFormat.downloadable;
      tabs.querySelectorAll("[role='tab']").forEach((tab) => {
        const selected = tab.dataset.format === currentFormat.id;
        tab.setAttribute("aria-selected", String(selected));
      });
      setCopyState(copyButton, "idle");
    }

    function cleanup() {
      if (removed) return;
      removed = true;
      controller.abort();
      window.clearTimeout(copyResetTimer);
      modal.remove();
      document.body.classList.remove("citation-modal-open");
      document.body.style.removeProperty("--citation-body-padding-right");
      document.body.style.removeProperty("--citation-scrollbar-compensation");
      if (activeDialog && activeDialog.modal === modal) activeDialog = null;
      if (trigger && document.contains(trigger)) trigger.focus();
    }

    function close(immediate) {
      if (removed) return;
      if (immediate) {
        cleanup();
        return;
      }
      modal.classList.add("is-closing");
      modal.addEventListener("animationend", cleanup, { once: true });
      window.setTimeout(cleanup, 220);
    }

    async function copyCitation() {
      window.clearTimeout(copyResetTimer);
      try {
        await navigator.clipboard.writeText(code.textContent);
        setCopyState(copyButton, "copied");
      } catch (error) {
        selectCode(code);
        setCopyState(copyButton, "error");
      }
      copyResetTimer = window.setTimeout(
        () => setCopyState(copyButton, "idle"),
        2000,
      );
    }

    function downloadCitation() {
      const blob = new Blob([code.textContent], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${paperKey}.${currentFormat.extension}`;
      link.click();
      URL.revokeObjectURL(url);
    }

    function trapFocus(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        close(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(panel.querySelectorAll(focusableSelector));
      if (!focusable.length) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    closeButton.addEventListener("click", () => close(false), { signal });
    copyButton.addEventListener("click", copyCitation, { signal });
    downloadButton.addEventListener("click", downloadCitation, { signal });
    modal.addEventListener(
      "click",
      (event) => {
        if (event.target === modal) close(false);
      },
      { signal },
    );
    document.addEventListener("keydown", trapFocus, { signal });

    document.body.appendChild(modal);
    document.body.classList.add("citation-modal-open");
    activeDialog = { modal, removeImmediately: () => close(true) };
    setFormat(currentFormat.id);
    window.requestAnimationFrame(() => panel.focus());
  }

  function show(paperKey, trigger) {
    const entry = getEntry(paperKey);
    if (!entry || !entry.formats) {
      console.error(`Citation data not found for key: ${paperKey}`);
      return;
    }
    createDialog(entry, paperKey, trigger || document.activeElement);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#citation-"]');
    if (!link) return;
    event.preventDefault();
    show(link.getAttribute("href").replace("#citation-", ""), link);
  });

  window.CitationDialog = { show };
})();
