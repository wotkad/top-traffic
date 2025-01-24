function setAsidePosition() {
  let aside = $('.content-aside');
  if (aside.length) {
    $('.wrapper').on('scroll', function() {
      let asidePosition = $('.content-aside').offset().top;
      let contentPosition = $('.content').offset().top;
      if (asidePosition <= 84) {
        aside
          .css('top', '84px')
          .css('position', 'fixed');
      }
      if (contentPosition >= 84) {
        aside
          .css('top', '')
          .css('position', '');
      }
    });
  }
}
setAsidePosition();