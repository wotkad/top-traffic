import 'jquery.easing';

function scrollToTop() {
  let button = $('.scroll-to-top');
  let wrapper = $('.wrapper');

  button.on('click', function () {
    wrapper.animate(
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

  wrapper.on('scroll', function () {
    if (wrapper.scrollTop() > 0) {
      button.fadeIn(300);
    } else {
      button.fadeOut(300);
    }
  });
}
scrollToTop();
