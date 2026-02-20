function toggleAutomaticListNumber() {

  // Фокус на input
  $(document).on('focus', '.table-input-automatic input', function () {

    const $input = $(this);
    const $wrapper = $input.closest('.table-input-automatic');
    const $list = $wrapper.find('.table-input-new__list');

    const offset = $input.offset();
    const height = $input.outerHeight();

    $list.css({
      top: offset.top + height + 2,
      left: offset.left
    }).addClass('active');

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

  $('.table-input-new__list button').on('click', function () {

    const $wrapper = $(this).closest('.table-input-automatic');
    $wrapper.find('.table-input-new__list').removeClass('active');

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

toggleAutomaticListNumber();
