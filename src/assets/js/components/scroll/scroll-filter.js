function scrollFilter() {
  $('.filter__container').on('scroll', function () {
    let container = $(this);
    let filter = $(this).parent();;
    if (container.scrollTop() > 0) {
      filter.addClass('visible-top');
    } else {
      filter.removeClass('visible-top');
    }
    if (container.scrollTop() + container.innerHeight() >= container[0].scrollHeight) {
      
      filter.removeClass('visible-bottom');
    } else {
      filter.addClass('visible-bottom');
    }
  });
}
scrollFilter();