/**
 * Publication Renderer
 * Fetches data/pubs.json and data/bibtex.json, renders publication cards,
 * and initializes the BibTeX citation system.
 */
(function () {
  "use strict";

  // Render a paper card (journal / conference)
  function renderPaperCard(pub) {
    // Title link
    var titleHtml;
    if (pub.doi) {
      titleHtml =
        '<a href="' + pub.doi + '"><strong>' + pub.title + "</strong></a>";
    } else if (pub.links && pub.links.length > 0) {
      titleHtml =
        '<a href="' +
        pub.links[0].url +
        '"><strong>' +
        pub.title +
        "</strong></a>";
    } else {
      titleHtml = "<strong>" + pub.title + "</strong>";
    }

    // Links
    var linksArr = pub.links.map(function (l) {
      return '<a href="' + l.url + '">[' + l.name + "]</a>";
    });
    if (pub.bibtexKey) {
      linksArr.push('<a href="#bibtex-' + pub.bibtexKey + '">[BibTeX]</a>');
    }
    var linksHtml = linksArr.join(", ");

    // Scholar citations
    var scholarHtml = pub.scholarId
      ? ' <span class="show_paper_citations" data="' +
        pub.scholarId +
        '"></span>'
      : "";

    return (
      '<div class="paper-box"><div class="paper-box-image"><div>' +
      '<div class="badge">' +
      pub.badge +
      "</div>" +
      '<img src="' +
      pub.image +
      '" alt="sym">' +
      "</div></div>" +
      '<div class="paper-box-text">' +
      "<p>" +
      titleHtml +
      "</p>" +
      "<p>" +
      pub.authors +
      "</p>" +
      "<p><em>" +
      pub.venue +
      "</em> <strong>(" +
      pub.venueShort +
      ")</strong>, " +
      pub.year +
      "</p>" +
      "<p>" +
      pub.note +
      scholarHtml +
      "</p>" +
      "<p>" +
      linksHtml +
      "</p>" +
      "</div></div>"
    );
  }

  // Render a patent entry
  function renderPatent(patent) {
    return (
      "<li><em>" +
      patent.date +
      "</em>, " +
      patent.number +
      ", <strong>" +
      patent.title +
      "</strong>, &ensp;" +
      patent.authors +
      ".</li>"
    );
  }

  // Main initialization
  function init() {
    Promise.all([
      fetch("data/pubs.json").then(function (r) {
        return r.json();
      }),
      fetch("data/bibtex.json").then(function (r) {
        return r.json();
      }),
    ])
      .then(function (results) {
        var pubsData = results[0];
        var bibtexData = results[1];

        // Set up BibtexDatabase from loaded JSON
        window.BibtexDatabase = bibtexData;
        window.BibtexDatabase.getBibtex = function (key) {
          return typeof this[key] === "string" ? this[key] : null;
        };
        window.BibtexDatabase.getAvailableKeys = function () {
          var self = this;
          return Object.keys(this).filter(function (k) {
            return typeof self[k] === "string";
          });
        };

        // Render journal papers
        var journalEl = document.getElementById("pub-journal");
        if (journalEl && pubsData.journal) {
          journalEl.innerHTML = pubsData.journal.map(renderPaperCard).join("");
        }

        // Render conference papers
        var confEl = document.getElementById("pub-conference");
        if (confEl && pubsData.conference) {
          confEl.innerHTML = pubsData.conference.map(renderPaperCard).join("");
        }

        // Render patents
        var patentEl = document.getElementById("pub-patent");
        if (patentEl && pubsData.patent) {
          patentEl.innerHTML =
            "<ul>" + pubsData.patent.map(renderPatent).join("") + "</ul>";
        }

        // Re-bind bibtex links for the newly rendered content
        if (window.BibtexCitation && window.BibtexCitation.bindBibtexLinks) {
          window.BibtexCitation.bindBibtexLinks();
        }

        // Signal completion for Google Scholar stats
        document.dispatchEvent(new Event("publications-rendered"));
      })
      .catch(function (err) {
        console.error("Failed to load publication data:", err);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
