(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function initNavigation() {
    var nav = document.getElementById("site-nav");
    if (!nav) return;
    var masthead = nav.closest(".masthead");
    var more = nav.querySelector(".greedy-nav__more");
    var hidden = nav.querySelector(".hidden-links");
    var sectionsById = new Map();
    var links = Array.from(nav.querySelectorAll("a[href]"));
    var frame = 0;
    var announce = false;
    var lastSection = null;
    var menuWasOpen = false;
    var hintLink = null;
    var hintTimer = null;
    var hintDuration = 1800;

    function hideHint() {
      if (hintLink) hintLink.classList.remove("is-nav-hint");
      hintLink = null;
      clearTimeout(hintTimer);
    }

    function showHint(link) {
      if (!link) return;
      if (hintLink !== link) {
        hideHint();
        hintLink = link;
        hintLink.classList.add("is-nav-hint");
      }
      clearTimeout(hintTimer);
      hintTimer = setTimeout(hideHint, hintDuration);
    }

    links.forEach(function (link) {
      var url = new URL(link.href, document.baseURI);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      var target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      var section = sectionsById.get(target.id);
      if (!section) {
        section = { target: target, link: link, links: [] };
        sectionsById.set(target.id, section);
      }
      section.links.push(link);
      // Homepage branding and About point to the same section; highlight About.
      if (!link.closest(".masthead__menu-home-item")) section.link = link;
    });
    var sections = Array.from(sectionsById.values()).sort(function (a, b) {
      return a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
    if (!sections.length) return;
    var navigationTarget = sectionsById.get(decodeURIComponent(location.hash.slice(1))) || null;

    function closeMenu() {
      hidden.classList.add("hidden");
      more.classList.remove("open");
      more.setAttribute("aria-expanded", "false");
    }

    function update() {
      frame = 0;
      var threshold = Math.max.apply(null, [masthead.getBoundingClientRect().bottom + 24].concat(
        sections.map(function (section) { return parseFloat(getComputedStyle(section.target).scrollMarginTop) || 0; })
      )) + 2;
      var current = sections[0];
      sections.forEach(function (section) {
        if (section.target.getBoundingClientRect().top <= threshold) current = section;
      });
      if (window.scrollY > 0 && window.scrollY + innerHeight >= document.documentElement.scrollHeight - 3) {
        current = sections[sections.length - 1];
      }
      if (navigationTarget) {
        current = navigationTarget;
        var margin = parseFloat(getComputedStyle(current.target).scrollMarginTop) || 0;
        var desired = Math.max(0, current.target.getBoundingClientRect().top + scrollY - margin);
        var limit = Math.max(0, document.documentElement.scrollHeight - innerHeight);
        // Keep an explicitly chosen short end section selected when scrolling is clamped.
        if (desired < limit - 2 && Math.abs(scrollY - desired) < 2) navigationTarget = null;
      }
      links.forEach(function (link) {
        if (link === current.link) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      var chinese = document.documentElement.dataset.lang === "zh";
      var label = current.link.querySelector(chinese ? ".lang-zh" : ".lang-en");
      var inMenu = hidden.contains(current.link);
      if (inMenu) more.dataset.currentSection = current.target.id;
      else delete more.dataset.currentSection;
      more.setAttribute("aria-label", (chinese ? "更多导航" : "More links") +
        (inMenu ? (chinese ? "，当前章节：" : "; current section: ") + label.textContent.trim() : ""));
      var menuOpen = more.classList.contains("open");
      more.setAttribute("aria-expanded", String(menuOpen));
      if (announce || lastSection !== current.target.id || (menuOpen && !menuWasOpen)) showHint(current.link);
      announce = false;
      lastSection = current.target.id;
      menuWasOpen = menuOpen;
    }

    function schedule(reveal) {
      if (reveal === true) announce = true;
      if (!frame) frame = requestAnimationFrame(update);
    }

    function pointHint(event) {
      if (event.pointerType !== "touch") showHint(event.target.closest("a[href]"));
    }
    nav.addEventListener("pointerover", pointHint);
    nav.addEventListener("pointermove", pointHint);
    nav.addEventListener("focusin", function (event) {
      showHint(event.target.closest("a[href]"));
    });

    nav.addEventListener("click", function (event) {
      if (event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var link = event.target.closest("a[href]");
      var section = sections.find(function (entry) { return entry.links.includes(link); });
      if (!section) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      closeMenu();
      navigationTarget = section;
      var hash = new URL(link.href, document.baseURI).hash;
      if (location.hash !== hash) history.pushState(null, "", hash);
      if (event.detail === 0) {
        section.target.setAttribute("tabindex", "-1");
        section.target.focus({ preventScroll: true });
      }
      section.target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
      showHint(link);
      schedule(true);
    }, true);
    nav.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && more.classList.contains("open")) {
        closeMenu();
        more.focus();
      }
    });
    window.addEventListener("scroll", function () { schedule(true); }, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", function () {
      navigationTarget = sectionsById.get(decodeURIComponent(location.hash.slice(1))) || null;
      schedule(true);
    });
    function followScroll() {
      navigationTarget = null;
      schedule();
    }
    window.addEventListener("wheel", followScroll, { passive: true });
    window.addEventListener("touchstart", followScroll, { passive: true });
    window.addEventListener("pointerdown", function (event) {
      if (event.target === document.documentElement) followScroll();
    });
    window.addEventListener("keydown", function (event) {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key) &&
          !event.target.closest("input, textarea, select, [contenteditable='true']")) followScroll();
    });
    window.addEventListener("load", schedule);
    new MutationObserver(schedule).observe(nav, {
      childList: true, subtree: true, attributes: true, attributeFilter: ["class"]
    });
    new MutationObserver(function () { schedule(true); }).observe(document.documentElement, {
      attributes: true, attributeFilter: ["data-lang", "data-theme"]
    });
    if (window.ResizeObserver) new ResizeObserver(schedule).observe(document.getElementById("main"));
    document.fonts.ready.then(function () {
      if (window.resetGreedyNav) window.resetGreedyNav();
      schedule();
    });
    schedule();
  }

  initNavigation();
})();
