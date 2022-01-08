/*
  Safari doesn't support CSS `scroll-behavior: smooth`,
  so here is a compatible solution for all browser to smooth scrolling

  See: <https://css-tricks.com/snippets/jquery/smooth-scrolling/>

  Warning: It must be called after all `<a>` tags (e.g., the dynamic TOC) are ready.
*/

$(function() {
  const $topbarWrapper = $("#topbar-wrapper");
  const topbarHeight = $topbarWrapper.outerHeight();
  const $topbarTitle = $("#topbar-title");

  const ATTR_SCROLL_UP = "scrolling-up";
  const SCROLL_MARK = "scroll-focus";
  const REM = 16; // in pixels
  let tocScrollUpCount = 0;

  $("a[href*='#']")
    .not("[href='#']")
    .not("[href='#0']")
    .click(function(event) {
      if (this.pathname.replace(/^\//, "") !== location.pathname.replace(/^\//, "")) {
        return;
      }

      if (location.hostname !== this.hostname) {
        return;
      }

      const hash = decodeURI(this.hash);
      let toFootnoteRef = RegExp(/^#fnref:/).test(hash);
      let toFootnote = toFootnoteRef ? false : RegExp(/^#fn:/).test(hash);
      let selector = hash.includes(":") ? hash.replace(/\:/g, "\\:") : hash;
      let $target = $(selector);

      let isMobileViews = $topbarTitle.is(":visible");
      let isPortrait = $(window).width() < $(window).height();

      if (typeof $target === "undefined") {
        return;
      }

      event.preventDefault();

      if (history.pushState) { /* add hash to URL */
        history.pushState(null, null, hash);
      }

      let curOffset = $(window).scrollTop();
      let destOffset = $target.offset().top -= REM / 2;

      if (destOffset < curOffset) { // scroll up
        $topbarWrapper.removeClass("topbar-down").addClass("topbar-up");
        $topbarWrapper.attr(ATTR_SCROLL_UP, true);
        tocScrollUpCount += 1;

        if (isMobileViews && isPortrait) {
          destOffset -= topbarHeight;
        }

      } else { // scroll down
        if (isMobileViews && isPortrait) {
          destOffset -= topbarHeight;
        }
      }

      $("html").animate({
        scrollTop: destOffset
      }, 500, () => {
        $target.focus();

        /* clean up old scroll mark */
        if ($(`[${SCROLL_MARK}=true]`).length) {
          $(`[${SCROLL_MARK}=true]`).attr(SCROLL_MARK, false);
        }

        /* Clean :target links */
        if ($(":target").length) { /* element that visited by the URL with hash */
          $(":target").attr(SCROLL_MARK, false);
        }

        /* set scroll mark to footnotes */
        if (toFootnote || toFootnoteRef) {
          $target.attr(SCROLL_MARK, true);
        }

        if ($target.is(":focus")) { /* Checking if the target was focused */
          return false;
        } else {
          $target.attr("tabindex", "-1"); /* Adding tabindex for elements not focusable */
          $target.focus(); /* Set focus again */
        }

        if (typeof $topbarWrapper.attr(ATTR_SCROLL_UP) !== "undefined") {
          tocScrollUpCount -= 1;

          if (tocScrollUpCount <= 0) {
            $topbarWrapper.attr(ATTR_SCROLL_UP, "false");
          }
        }
      });
    }); /* click() */
});
