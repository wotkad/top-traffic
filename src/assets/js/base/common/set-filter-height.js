function setFilterHeight() {
  if ($('.filter__container').length > 0) {
    let filterContainer = $('.filter__container');
    let filterOffsetTop = filterContainer.offset().top;
    filterContainer.css('max-height', `calc(100dvh - ${filterOffsetTop}px - 24px)`);
  }
}
setFilterHeight();

$(window).on('resize', function() {
  setFilterHeight();
});

$('.wrapper').on('scroll', function() {
  setFilterHeight();
});