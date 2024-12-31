function toggleDropdown() {
  $('.dropdown__button').on('click', function () {
    $(this).toggleClass('active');
    $(this).siblings('.dropdown__list').toggleClass('active');
  });

  $('.dropdown__item input[type="radio"]').on('change', function () {
    const selectedValue = $(this).siblings('p').text();
    const selectedColor = $(this).data('color') || ''; 

    const $button = $(this).closest('.dropdown__container').find('.dropdown__button');

    $button.find('.dropdown__label').text(selectedValue);

    if (selectedColor) {
      $button.attr('class', `dropdown__button ${selectedColor}`);
    } else {
      $button.attr('class', 'dropdown__button');
    }

    $(this).closest('.dropdown__list').removeClass('active');
    $button.removeClass('active');
  });

  $(document).on('click', function (e) {
    $('.dropdown').each(function () {
      const $dropdown = $(this);
      const $button = $dropdown.find('.dropdown__button');
      const $list = $dropdown.find('.dropdown__list');

      if (!$list.is(e.target) && !$button.is(e.target) && $button.has(e.target).length === 0) {
        $list.removeClass('active');
        $button.removeClass('active');
      }
    });
  });
}

toggleDropdown();
