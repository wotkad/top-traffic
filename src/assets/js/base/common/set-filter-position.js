function setFilterPosition() {
  let filter = $('.filter');
  $('.wrapper').on('scroll', function() {
    let filterPosition = $('.filter').offset().top;
    let contentPosition = $('.content').offset().top;
    if (filterPosition <= 84) {
      filter
        .css('top', '84px')
        .css('position', 'fixed');
    }
    if (contentPosition >= 84) {
      filter
        .css('top', '')
        .css('position', '');
    }
  });
}
setFilterPosition();