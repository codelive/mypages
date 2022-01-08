/*
 * Hide Header on scroll down
 */

$(function() {
  const $topbarWrapper = ScrollHelper.getTopbarWrapper();
  const $searchInput = $("#search-input");

  let didScroll;
  let lastScrollTop = 0;
  const delta = ScrollHelper.getTopbarHeight();

  function hasScrolled() {
    let st = $(this).scrollTop();

    /* Make sure they scroll more than delta */
    if (Math.abs(lastScrollTop - st) <= delta) {
      return;
    }

    if (st > lastScrollTop ) { // Scroll Down
      ScrollHelper.hideTopbar();

      if ($searchInput.is(":focus")) {
        $searchInput.blur(); /* remove focus */
      }

    } else  { // Scroll up
      // has not yet scrolled to the bottom of the screen, that is, there is still space for scrolling
      if (st + $(window).height() < $(document).height()) {

        if (ScrollHelper.hasScrollUpTask()) {
          return;
        }

        if (ScrollHelper.topbarLocked()) {
          ScrollHelper.unlockTopbar();
        } else {
          ScrollHelper.showTopbar();
        }
      }
    }

    lastScrollTop = st;
  }

  $(window).on("orientationchange",function() {
    if ($(window).scrollTop() === 0) {
      return;
    }

    if ($(window).width() < $(window).height()) { // before rotating, it is still in portrait mode.
      ScrollHelper.hideTopbar();
    }
  });

  $(window).scroll(function(event) {
    if (didScroll) {
      return;
    }
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

});
