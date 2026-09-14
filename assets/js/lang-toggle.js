(function () {
  var aboutBalanceFrame = null;

  // Stretch only the naturally shorter About column.
  function balanceAboutSection() {
    var section = document.querySelector(".about-section");
    if (!section) return;

    section.classList.remove(
      "about-section--profile-taller",
      "about-section--content-taller"
    );

    var isWide =
      window.matchMedia && window.matchMedia("(min-width: 925px)").matches;
    if (!isWide) return;

    var profile = section.querySelector(".about-section__profile");
    var content = section.querySelector(".about-section__content");
    if (!profile || !content) return;

    var previousAlignItems = section.style.alignItems;
    var previousProfileDisplay = profile.style.display;
    var previousProfileFlex = profile.style.flex;
    var previousContentDisplay = content.style.display;
    var previousContentFlex = content.style.flex;

    section.style.alignItems = "start";
    profile.style.display = "block";
    profile.style.flex = "none";
    content.style.display = "block";
    content.style.flex = "none";

    var profileHeight = profile.getBoundingClientRect().height;
    var contentHeight = content.getBoundingClientRect().height;

    section.style.alignItems = previousAlignItems;
    profile.style.display = previousProfileDisplay;
    profile.style.flex = previousProfileFlex;
    content.style.display = previousContentDisplay;
    content.style.flex = previousContentFlex;

    if (profileHeight > contentHeight + 1) {
      section.classList.add("about-section--profile-taller");
    } else if (contentHeight > profileHeight + 1) {
      section.classList.add("about-section--content-taller");
    }
  }

  function scheduleAboutBalance() {
    if (aboutBalanceFrame) window.cancelAnimationFrame(aboutBalanceFrame);
    aboutBalanceFrame = window.requestAnimationFrame(function () {
      aboutBalanceFrame = null;
      balanceAboutSection();
    });
  }

  /* ── Language toggle ── */
  function setLang(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    var btn = document.getElementById("lang-toggle");
    // Show target state: when EN is active → button says 中文 (to switch to Chinese), and vice versa
    if (btn) btn.textContent = lang === "en" ? "中文" : "EN";
    // Recalculate greedy-nav after text width changes
    if (window.resetGreedyNav) window.resetGreedyNav();
    scheduleAboutBalance();
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

  /* ── DOMContentLoaded ── */
  document.addEventListener("DOMContentLoaded", function () {
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

    scheduleAboutBalance();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleAboutBalance);
    }

    var avatar = document.querySelector(".about-section .author__avatar img");
    if (avatar && !avatar.complete) {
      avatar.addEventListener("load", scheduleAboutBalance);
    }
  });

  window.addEventListener("load", scheduleAboutBalance);
  window.addEventListener("resize", scheduleAboutBalance);
})();
