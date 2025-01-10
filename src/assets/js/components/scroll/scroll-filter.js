function scrollFilter() {
  $('.filter__container').each(function () {
    let container = $(this);
    let filter = container.parent();

    // Проверяем, есть ли скролл в блоке
    if (container[0].scrollHeight > container.innerHeight()) {
      // Если скролл есть, добавляем или удаляем классы в зависимости от состояния
      if (container.scrollTop() + container.innerHeight() >= container[0].scrollHeight) {
        filter.removeClass('visible-bottom');
      } else {
        filter.addClass('visible-bottom');
      }
    } else {
      // Если скролла нет, удаляем классы
      filter.removeClass('visible-top visible-bottom');
    }
  });

  $('.filter__container').on('scroll', function () {
    let container = $(this);
    let filter = container.parent();
    let openedDropdownButton = $(this).find('.dropdown__button');
    let openedDropdownList = $(this).find('.dropdown__list');

    openedDropdownButton.removeClass('active');
    openedDropdownList.removeClass('active').css({
      top: '',
      left: '',
      maxWidth: '',
      position: '',
    });

    // Проверяем, есть ли скролл в блоке
    if (container[0].scrollHeight > container.innerHeight()) {
      // Проверяем, прокручен ли блок больше чем на 0
      if (container.scrollTop() > 0) {
        filter.addClass('visible-top');
      } else {
        filter.removeClass('visible-top');
      }

      // Проверяем, прокручен ли блок полностью
      if (container.scrollTop() + container.innerHeight() >= container[0].scrollHeight) {
        filter.removeClass('visible-bottom');
      } else {
        filter.addClass('visible-bottom');
      }
    } else {
      // Если скролла нет, удаляем классы
      filter.removeClass('visible-top visible-bottom');
    }
  });
}

scrollFilter();
