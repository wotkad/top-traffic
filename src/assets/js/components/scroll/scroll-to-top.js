import 'jquery.easing';

function scrollToTop() {
  let button = $('.scroll-to-top');
  let content = $('.content');

  button.on('click', function () {
    content.animate(
      { scrollTop: 0 },
      {
        duration: 1000,
        easing: 'easeInOutCubic', // Используем кастомное easing
        complete: function () {
          button.fadeOut(300);
        },
      }
    );
  });

  content.on('scroll', function () {
    if (content.scrollTop() > 0) {
      button.fadeIn(300);
    } else {
      button.fadeOut(300);
    }
  });
}
scrollToTop();
