function getHeaderHeight() {
  let height = $('.header').outerHeight();
  document.documentElement.style.setProperty('--header-height', `${height}px`);
}
getHeaderHeight();

$(window).on('resize', function() {
  getHeaderHeight();
});