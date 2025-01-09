function getHeaderHeight() {
  if ($('.header').length > 0) {
    let height = $('.header').outerHeight();
    document.documentElement.style.setProperty('--header-height', `${height}px`);
  }
}
getHeaderHeight();

$(window).on('resize', function() {
  getHeaderHeight();
});