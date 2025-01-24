function toggleAccordion() {
  let button = $('.accordion__button');
  button.on('click', function() {
    if ($(this).next().is(':animated')) {
      return;
    }
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).next().slideDown();
    } else {
      $(this).addClass('active');
      $(this).next().slideUp();
    }
  });
}
toggleAccordion();