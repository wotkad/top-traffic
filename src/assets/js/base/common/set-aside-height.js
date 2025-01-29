let isScrolling = false;

export default function setAsideHeight() {
  $('.content-aside__container').each(function () {
    let asideContainer = $(this);
    let asideOffsetTop = asideContainer.offset().top;

    let windowHeight = $(window).height();
    let scrollTop = $(window).scrollTop();
    let inner = asideContainer.closest('.inner');
    let innerOffset = inner.offset().top;
    let innerHeight = inner.outerHeight();
    let windowBottom = scrollTop + windowHeight;
    let innerBottom = innerOffset + innerHeight;
    let bottomOffset = innerBottom - windowBottom;

    if (bottomOffset <= 0) {
      asideContainer.css('max-height', `calc(100dvh - ${asideOffsetTop}px - 16px - ${-bottomOffset}px)`);
    } else {
      asideContainer.css('max-height', `calc(100dvh - ${asideOffsetTop}px - 24px)`);
    }
  });
}
setAsideHeight();

function checkScrollEnd() {
  if (!isScrolling) {
    setAsideHeight();
    return;
  }
  isScrolling = false;
  requestAnimationFrame(checkScrollEnd);
}

$('.wrapper').on('scroll', function() {
  isScrolling = true;
  setAsideHeight();
  requestAnimationFrame(checkScrollEnd);
});