(function () {
  "use strict";

  var container = document.querySelector("[data-visitor-map-src]");
  if (!container) return;

  var loaded = false;

  function loadVisitorMap() {
    if (loaded) return;
    loaded = true;

    if (window.jQuery && !("vmap_jq" in window)) {
      window.vmap_jq = window.jQuery;
    }

    var script = document.createElement("script");
    script.id = "mapmyvisitors";
    script.src = container.dataset.visitorMapSrc;
    script.async = true;
    script.addEventListener("error", function () {
      container.dataset.state = "unavailable";
    });
    container.appendChild(script);
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
        observer.disconnect();
        loadVisitorMap();
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(container);
  } else if (document.readyState === "complete") {
    loadVisitorMap();
  } else {
    window.addEventListener("load", loadVisitorMap, { once: true });
  }
})();
