function scrollToTop() {
  let button = $('.scroll-to-top');
  let content = $('.content');
  button.on('click', function() {
    content.animate({scrollTop: 0}, 1000);
  });
}
scrollToTop();