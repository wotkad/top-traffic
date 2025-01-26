function setAsideHeight() {
  if ($('.content-aside__container').length > 0) {
    let asideContainer = $('.content-aside__container');
    let asideOffsetTop = asideContainer.offset().top;
    asideContainer.css('max-height', `calc(100dvh - ${asideOffsetTop}px - 24px)`);
    asideContainer.css('min-height', `calc(100dvh - ${asideOffsetTop}px - 24px)`);
  }
}
setAsideHeight();

$(window).on('resize', function() {
  setAsideHeight();
});

$('.wrapper').on('scroll', function() {
  setAsideHeight();
});