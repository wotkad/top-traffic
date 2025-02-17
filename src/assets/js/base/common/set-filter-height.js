let isScrolling = false;

export default function setFilterHeight() {
  $('.filter__container').each(function () {
    let filterContainer = $(this);
    let filterOffsetTop = filterContainer.offset().top;

    let windowHeight = $(window).height();
    let scrollTop = $(window).scrollTop();
    let inner = filterContainer.closest('.inner');
    let innerOffset = inner.offset().top;
    let innerHeight = inner.outerHeight();
    let windowBottom = scrollTop + windowHeight;
    let innerBottom = innerOffset + innerHeight;
    let bottomOffset = innerBottom - windowBottom;

    if (bottomOffset <= 0) {
      filterContainer.css('max-height', `calc(100dvh - ${filterOffsetTop}px - 8px - ${-bottomOffset}px)`);
    } else {
      filterContainer.css('max-height', `calc(100dvh - ${filterOffsetTop}px - 24px)`);
    }

    if (filterContainer.closest('.popup')) {
      if (bottomOffset <= 0) {
        filterContainer.css('max-height', `calc(100dvh - ${filterOffsetTop}px - 102px - ${-bottomOffset}px)`);
      } else {
        filterContainer.css('max-height', `calc(100dvh - ${filterOffsetTop}px - 24px)`);
      }
    }
  });
}
setTimeout(function() {
  setFilterHeight();
}, 300);

function checkScrollEnd() {
  if (!isScrolling) {
    setFilterHeight();
    return;
  }
  isScrolling = false;
  requestAnimationFrame(checkScrollEnd);
}

$('.wrapper, .popup').on('scroll', function() {
  isScrolling = true;
  setFilterHeight();
  requestAnimationFrame(checkScrollEnd);
});
