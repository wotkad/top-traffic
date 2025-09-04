let isScrolling = false;

export default function setAsideHeight() {
  $('.content-aside__container, .chat__conversations').each(function () {
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

    if (bottomOffset <= -24) {
      asideContainer.css('max-height', `calc(100dvh - ${asideOffsetTop}px - ${-bottomOffset}px)`);
      asideContainer.css('height', `calc(100dvh - ${asideOffsetTop}px - ${-bottomOffset}px)`);
    } else {
      asideContainer.css('max-height', `calc(100dvh - ${asideOffsetTop}px - 24px)`);
      asideContainer.css('height', `calc(100dvh - ${asideOffsetTop}px - 24px)`);
    }
  });
  $('.chat__messages').each(function () {
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

    if (bottomOffset <= -24) {
      asideContainer.css('max-height', `calc(100dvh - ${asideOffsetTop}px - ${$(this).next().outerHeight()}px - 16px - ${-bottomOffset}px)`);
      asideContainer.css('height', `calc(100dvh - ${asideOffsetTop}px - ${$(this).next().outerHeight()}px - 16px - ${-bottomOffset}px)`);
    } else {
      asideContainer.css('max-height', `calc(100dvh - ${asideOffsetTop}px - 24px - ${$(this).next().outerHeight()}px - 16px)`);
      asideContainer.css('height', `calc(100dvh - ${asideOffsetTop}px - 24px - ${$(this).next().outerHeight()}px - 16px)`);
    }
  });
}

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