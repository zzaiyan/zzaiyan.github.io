(function () {
  var STORAGE_KEY = "preferred-lang";

  function setLang(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    localStorage.setItem(STORAGE_KEY, lang);
    var btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.textContent = lang === "en" ? "中文" : "EN";
    }
  }

  function getPreferredLang() {
    return (
      localStorage.getItem(STORAGE_KEY) ||
      (navigator.language.startsWith("zh") ? "zh" : "en")
    );
  }

  // Apply immediately (also called from inline script in <head>)
  if (!document.documentElement.getAttribute("data-lang")) {
    document.documentElement.setAttribute("data-lang", getPreferredLang());
  }

  document.addEventListener("DOMContentLoaded", function () {
    var lang = getPreferredLang();
    setLang(lang);

    var btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var current =
          document.documentElement.getAttribute("data-lang") || "en";
        setLang(current === "en" ? "zh" : "en");
      });
    }
  });
})();
