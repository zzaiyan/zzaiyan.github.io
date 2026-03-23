/*
 * Greedy Navigation
 *
 * http://codepen.io/lukejacksonn/pen/PwmwWV
 *
 */

var $nav = $("#site-nav");
var $btn = $nav.find(".greedy-nav__more");
var $vlinks = $nav.find(".visible-links");
var $hlinks = $nav.find(".hidden-links");

var breaks = [];

function updateNav() {
  var btnWidth = $btn.hasClass("hidden") ? 0 : ($btn.outerWidth(true) || 0);
  var availableSpace = $nav.width() - btnWidth;

  // The visible list is overflowing the nav
  if ($vlinks.width() > availableSpace) {
    // Record the width of the list
    breaks.push($vlinks.width());

    // Move item to the hidden list
    $vlinks.children().last().prependTo($hlinks);

    // Show the dropdown btn
    if ($btn.hasClass("hidden")) {
      $btn.removeClass("hidden");
    }

    // The visible list is not overflowing
  } else {
    // There is space for another item in the nav
    if (availableSpace > breaks[breaks.length - 1]) {
      // Move the item to the visible list
      $hlinks.children().first().appendTo($vlinks);
      breaks.pop();
    }

    // Hide the dropdown btn if hidden list is empty
    if (breaks.length < 1) {
      $btn.addClass("hidden").removeClass("open");
      $hlinks.addClass("hidden");
    }
  }

  // Keep counter updated
  $btn.attr("count", breaks.length);

  // Recur if the visible list is still overflowing the nav
  if ($vlinks.width() > availableSpace) {
    updateNav();
  }
}

// Expose reset for external callers (e.g. language toggle)
window.resetGreedyNav = function () {
  while ($hlinks.children().length > 0) {
    $hlinks.children().first().appendTo($vlinks);
  }
  breaks = [];
  $btn.addClass("hidden").removeClass("open");
  $hlinks.addClass("hidden");
  // Force reflow so CSS changes (e.g. lang switch) are reflected in width calculations
  void $nav[0].offsetWidth;
  updateNav();
};

// Window listeners

$(window).resize(function () {
  updateNav();
});

$btn.on("click", function () {
  $hlinks.toggleClass("hidden");
  $(this).toggleClass("open");
});

updateNav();
