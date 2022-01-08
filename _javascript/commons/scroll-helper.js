/**
 * A tool for smooth scrolling and topbar switcher
 */
const ScrollHelper = (function () {
  const $topbarWrapper = $("#topbar-wrapper");
  const $topbarTitle = $("#topbar-title");
  const $body = $("body");
  const ATTR_TOPBAR_VISIBLE = "topbar-visible";

  let scrollUpCount = 0; // the number of times the scroll up was triggered by ToC or anchor
  let topbarLocked = false;

  return {
    getTopbarWrapper: () => $topbarWrapper,
    getTopbarTitle: () => $topbarTitle,
    getTopbarHeight: () => $topbarWrapper.outerHeight(),
    hideTopbar: () => $body.attr(ATTR_TOPBAR_VISIBLE, false),
    showTopbar: () => $body.attr(ATTR_TOPBAR_VISIBLE, true),
    addScrollUpTask: () => {
      scrollUpCount += 1;
      if (!topbarLocked) { topbarLocked = true; }
    },
    popScrollUpTask: () => scrollUpCount -= 1,
    hasScrollUpTask: () => scrollUpCount > 0,
    topbarLocked: () => topbarLocked === true,
    unlockTopbar: () => topbarLocked = false
  };

}());
