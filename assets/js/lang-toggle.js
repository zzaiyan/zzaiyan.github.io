(function () {
  /* ── Language toggle ── */
  function setLang(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    var btn = document.getElementById("lang-toggle");
    // Show target state: when EN is active → button says 中文 (to switch to Chinese), and vice versa
    if (btn) btn.textContent = lang === "en" ? "中文" : "EN";
    // Recalculate greedy-nav after text width changes
    if (window.resetGreedyNav) window.resetGreedyNav();
  }

  if (!document.documentElement.getAttribute("data-lang")) {
    document.documentElement.setAttribute("data-lang", "en");
  }

  /* ── Theme toggle ── */
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      // Show target state: when light → show moon (to switch to dark), when dark → show sun (to switch to light)
      btn.innerHTML =
        theme === "dark"
          ? '<i class="fas fa-sun"></i>'
          : '<i class="fas fa-moon"></i>';
    }
  }

  if (!document.documentElement.getAttribute("data-theme")) {
    document.documentElement.setAttribute("data-theme", "light");
  }

  /* ── DOMContentLoaded ── */
  document.addEventListener("DOMContentLoaded", function () {
    setLang("en");
    setTheme("light");

    var langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      langBtn.addEventListener("click", function () {
        var cur = document.documentElement.getAttribute("data-lang") || "en";
        setLang(cur === "en" ? "zh" : "en");
      });
    }

    var themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var cur =
          document.documentElement.getAttribute("data-theme") || "light";
        setTheme(cur === "light" ? "dark" : "light");
      });
    }
  });
})();
