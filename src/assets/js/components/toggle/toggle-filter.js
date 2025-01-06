import gsap from 'gsap';

function toggleFilter() {
  let toggle = $('.filter__toggle');
  let filter = $('.filter');
  let content = $('.content');
  toggle.on('click', function() {
    if (toggle.hasClass('active')) {
      gsap.to(filter, {x: '0', duration: .3});
      toggle.removeClass('active');
      filter.removeClass('active');
      content.removeClass('active');
    } else {
      gsap.to(filter, {x: '-304px', duration: .3})
      toggle.addClass('active');
      filter.addClass('active');
      content.addClass('active');
    }
  });
  

  const toggleClearButton = function () {
    $('.filter').each(function () {
      const $filterContainer = $(this);
      const hasCheckedCheckboxes = $filterContainer.find('input[type="checkbox"]:checked').length > 0;
      if (hasCheckedCheckboxes) {
        $('.filter-clear').show();
      } else {
        $('.filter-clear').hide();
      }
    });
  };

  // Отслеживаем изменение состояния чекбоксов
  $('.filter').on('change', 'input[type="checkbox"]', function () {
    toggleClearButton();
  });

  $('.dropdown__values').on('click', '.dropdown__value svg', function (e) {
    e.stopPropagation();
    toggleClearButton();
  });

  // Сбрасываем все фильтры и скрываем кнопку при клике на .filter__clear
  $('.filter__clear, .filter-clear').on('click', function () {
    const $filterContainer = $('.filter');

    // Снимаем выделение всех чекбоксов
    $filterContainer.find('input[type="checkbox"]').prop('checked', false);

    // Очищаем текстовые поля
    $filterContainer.find('input[type="text"], input[type="number"], input[type="search"]').val('');

    // Удаляем значения из .dropdown__values
    $filterContainer.find('.dropdown__values').empty();

    // Сбрасываем состояние кнопок
    $filterContainer.find('.dropdown__sort').hide().removeClass('active');
    $filterContainer.find('.dropdown__button').show().removeClass('active');
    $filterContainer.find('.dropdown__label').removeClass('selected').text('Выберите фильтр');

    // Скрываем кнопку .filter-clear
    $('.filter-clear').hide();
  });

  // Инициализируем состояние кнопок при загрузке
  toggleClearButton();

}

toggleFilter();