function toggleAutomaticListTextarea() {

  function positionList($textarea) {
    const $wrapper = $textarea.closest('.table-input-automatic');
    const $list = $wrapper.find('.table-input-new__list');

    const offset = $textarea.offset();
    const height = $textarea.outerHeight();

    $list.css({
      top: offset.top + height + 2,
      left: offset.left
    });
  }


  // Фокус
  $(document).on('focus', '.table-input-automatic textarea', function () {

    const $textarea = $(this);
    const $wrapper = $textarea.closest('.table-input-automatic');
    const $list = $wrapper.find('.table-input-new__list');

    setTimeout(function () {
      positionList($textarea);
      $list.addClass('active');
    }, 0);

  });


  // Пересчёт при вводе (когда textarea меняет высоту)
  $(document).on('input', '.table-input-automatic textarea', function () {

    const $textarea = $(this);
    const $list = $textarea
      .closest('.table-input-automatic')
      .find('.table-input-new__list');

    if ($list.hasClass('active')) {
      positionList($textarea);
    }

  });


  // Закрытие при потере фокуса
  $(document).on('blur', '.table-input-automatic textarea', function () {

    const $wrapper = $(this).closest('.table-input-automatic');
    const $list = $wrapper.find('.table-input-new__list');

    // Небольшая задержка чтобы клик по list успел выполниться
    setTimeout(function () {
      $list.removeClass('active');
    }, 150);

  });


  // Клик по кнопке внутри списка
  $(document).on('click', '.table-input-new__list button', function () {

    const $wrapper = $(this).closest('.table-input-automatic');
    $wrapper.find('.table-input-new__list').removeClass('active');

  });


  // Клик вне блока
  $(document).on('mousedown', function (e) {

    $('.table-input-automatic').each(function () {

      const $wrapper = $(this);

      if (
        !$wrapper.is(e.target) &&
        $wrapper.has(e.target).length === 0
      ) {
        $wrapper.find('.table-input-new__list').removeClass('active');
      }

    });

  });

  // Горизонтальный скролл .content-scroll
  $('.content-scroll').on('scroll', function () {
    $('.table-input-new__list').removeClass('active');
  });

  // Скролл .wrapper
  $('.wrapper').on('scroll', function () {
    $('.table-input-new__list').removeClass('active');
  });

}

toggleAutomaticListTextarea();
