function toggleDropdown() {
  $('.dropdown__button').on('click', function () {
    $(this).toggleClass('active');
    $(this).siblings('.dropdown__list').toggleClass('active');
  });

  $('.dropdown__item input[type="radio"]').on('change', function () {
    const selectedValue = $(this).siblings('span').text();
    $(this)
      .closest('.dropdown__container')
      .find('.dropdown__value')
      .text(selectedValue);

    $(this).closest('.dropdown__list').removeClass('active');
    $('.dropdown__button').removeClass('active');
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.dropdown').length) {
      $('.dropdown__list').removeClass('active');
      $('.dropdown__button').removeClass('active');
    }
  });

  $(document).on('click', function(e) {
    $('.dropdown').each(function() {
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