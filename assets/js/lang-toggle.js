(function () {
  /* ── Language toggle ── */
  var LANG_KEY = "preferred-lang";

  function setLang(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    localStorage.setItem(LANG_KEY, lang);
    var btn = document.getElementById("lang-toggle");
    if (btn) btn.textContent = lang === "en" ? "中文" : "EN";
  }

  function getPreferredLang() {
    return (
      localStorage.getItem(LANG_KEY) ||
      (navigator.language.startsWith("zh") ? "zh" : "en")
    );
  }

  if (!document.documentElement.getAttribute("data-lang")) {
    document.documentElement.setAttribute("data-lang", getPreferredLang());
  }

  /* ── Theme toggle ── */
  var THEME_KEY = "preferred-theme";

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.innerHTML =
        theme === "dark"
          ? '<i class="fas fa-sun"></i>'
          : '<i class="fas fa-moon"></i>';
    }
  }

  function getPreferredTheme() {
    return localStorage.getItem(THEME_KEY) || "light";
  }

  if (!document.documentElement.getAttribute("data-theme")) {
    document.documentElement.setAttribute("data-theme", getPreferredTheme());
  }

  /* ── DOMContentLoaded ── */
  document.addEventListener("DOMContentLoaded", function () {
    setLang(getPreferredLang());
    setTheme(getPreferredTheme());

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
        var cur = document.documentElement.getAttribute("data-theme") || "light";
        setTheme(cur === "light" ? "dark" : "light");
      });
    }
  });
})();
