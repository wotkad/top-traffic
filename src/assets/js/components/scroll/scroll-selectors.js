$(function() {

  $('.selector__buttons').each(function() {

    const $buttons = $(this);
    const $scroll = $buttons.find('.selector__scroll');
    const $prev = $buttons.find('.selector__prev');
    const $next = $buttons.find('.selector__next');

    function checkScrollable() {
      const el = $scroll[0];
      if (!el) return;

      const scrollWidth = el.scrollWidth;
      const clientWidth = el.clientWidth;
      const scrollLeft = el.scrollLeft;
      const maxScroll = scrollWidth - clientWidth;

      // есть ли горизонтальный скролл?
      if (scrollWidth > clientWidth + 1) {
        $buttons.addClass('scrollable');
      } else {
        $buttons.removeClass('scrollable scrolled scrolled-full');
        $prev.removeClass('active');
        $next.removeClass('active');
        return;
      }

      // возможность скролла ВЛЕВО
      if (scrollLeft > 0) {
        $prev.addClass('active');
        $buttons.addClass('scrolled');
      } else {
        $prev.removeClass('active');
        $buttons.removeClass('scrolled');
      }

      // возможность скролла ВПРАВО
      if (scrollLeft < maxScroll - 1) {
        $next.addClass('active');
        $buttons.removeClass('scrolled-full');
      } else {
        $next.removeClass('active');
        $buttons.addClass('scrolled-full');
      }
    }

    // === ПРОКРУТКА К АКТИВНОЙ КНОПКЕ ===
    function scrollToActiveButton() {
      const $activeBtn = $scroll.find('.selector__button.active');
      if (!$activeBtn.length) return;

      const el = $scroll[0];
      const btn = $activeBtn[0];

      const scrollLeft = el.scrollLeft;
      const scrollRight = scrollLeft + el.clientWidth;

      const btnLeft = btn.offsetLeft;
      const btnRight = btnLeft + btn.offsetWidth;

      const offset = 8; // добавляем 8px

      // Если кнопка частично или полностью справа вне видимой области
      if (btnRight > scrollRight) {
        const targetScroll = btnRight - el.clientWidth + offset; // сдвигаем на 8px
        $scroll.scrollLeft(targetScroll);
      }

      // Если кнопка частично или полностью слева вне видимой области
      if (btnLeft < scrollLeft) {
        const targetScroll = btnLeft - offset; // сдвигаем на 8px
        $scroll.scrollLeft(targetScroll);
      }
    }

    // init
    checkScrollable();

    // Прокручиваем к активной кнопке после рендера
    setTimeout(() => {
      scrollToActiveButton();
      checkScrollable();
    }, 500);

    $(window).on('load resize', function() {
      checkScrollable();
      setTimeout(() => {
        scrollToActiveButton();
        checkScrollable();
      }, 500);
    });

    $scroll.on('scroll', checkScrollable);

    // prev
    $prev.on('click', function() {
      $scroll.stop().animate({ scrollLeft: 0 }, 300, function() {
        checkScrollable();
      });
    });

    // next
    $next.on('click', function() {
      const el = $scroll[0];
      const maxScroll = el.scrollWidth - el.clientWidth;
      $scroll.stop().animate({ scrollLeft: maxScroll }, 300, function() {
        checkScrollable();
      });
    });

  });

});
