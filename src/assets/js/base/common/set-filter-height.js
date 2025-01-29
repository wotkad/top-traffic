let isScrolling = false;

export default function setFilterHeights() {
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
  });
}
setFilterHeights();

function checkScrollEnd() {
  if (!isScrolling) {
    setFilterHeights();
    return;
  }
  isScrolling = false;
  requestAnimationFrame(checkScrollEnd);
}

$('.wrapper').on('scroll', function() {
  isScrolling = true;
  setFilterHeights();
  requestAnimationFrame(checkScrollEnd);
});
