import 'jquery.easing';

function scrollToTop() {
  let button = $('.scroll-to-top');
  let wrapper = $('.wrapper');
  let scrollTimeout;

  button.on('click', function () {
    wrapper.animate(
      { scrollTop: 0 },
      {
        duration: 1000,
        easing: 'easeInOutCubic',
        complete: function () {
          button.fadeOut(300);
        },
      }
    );
  });

  wrapper.on('scroll', function () {
    clearTimeout(scrollTimeout);

    if (wrapper.scrollTop() > 0) {
      button.fadeIn(300);
    }

    scrollTimeout = setTimeout(function () {
      if (!isPageFullyScrolled()) {
        button.fadeOut(300);
      }
    }, 3000);
  });

  function isPageFullyScrolled() {
    let scrollTop = wrapper.scrollTop();
    let scrollHeight = wrapper.prop('scrollHeight');
    let wrapperHeight = wrapper.innerHeight();

    return scrollTop + wrapperHeight >= scrollHeight;
  }
}

scrollToTop();
