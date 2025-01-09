function toggleDropdown() {
  $('.dropdown__button').on('click', function (e) {
    e.stopPropagation(); // Остановить всплытие, чтобы не срабатывало событие document
    const $dropdown = $(this).closest('.dropdown');
    const $list = $dropdown.find('.dropdown__list');

    // Переключение активного состояния только для текущего dropdown
    $('.dropdown__list').not($list).removeClass('active');
    $('.dropdown__button').not(this).removeClass('active');
    $('.dropdown__sort').removeClass('active');

    $(this).toggleClass('active');
    $list.toggleClass('active');
  });

  $('.dropdown__item input[type="radio"]').on('change', function () {
    const selectedValue = $(this).siblings('p').text();
    const selectedColor = $(this).data('color') || '';

    const buttonStatus = $(this).closest('.dropdown-status .dropdown__container').find('.dropdown__button');
    const titleStatus = $(this).closest('.dropdown-status .dropdown__container').find('.dropdown__button').find('.dropdown__title');

    titleStatus.text(selectedValue);

    if (selectedColor) {
      buttonStatus.attr('class', `dropdown__button ${selectedColor} selected`);
    } else {
      buttonStatus.attr('class', 'dropdown__button');
    }

    const buttonPriority = $(this).closest('.dropdown-priority .dropdown__container').find('.dropdown__inner');
    const titlePriority = $(this).closest('.dropdown-priority .dropdown__container').find('.dropdown__inner').find('.dropdown__title');

    titlePriority.text(selectedValue);

    if (selectedColor) {
      buttonPriority.attr('class', `dropdown__inner ${selectedColor} selected`);
    } else {
      buttonPriority.attr('class', 'dropdown__inner');
    }

    $(this).closest('.dropdown__list').removeClass('active');
    buttonStatus.removeClass('active');
    buttonPriority.removeClass('active');
  });

  $(document).on('click', function (e) {
    $('.dropdown__list').removeClass('active');
    $('.dropdown__button').removeClass('active');
    $('.dropdown__sort').removeClass('active');
  });

  $('.dropdown__list').on('click', function (e) {
    e.stopPropagation(); // Предотвращение закрытия при клике внутри списка
  });

  // Обработка чекбоксов
  $('.input-checkbox-with-label input').on('change', function () {
    const $dropdown = $(this).closest('.dropdown'); // Ограничиваем область действия текущим dropdown
    const $sortBlock = $dropdown.find('.dropdown__sort');
    const $buttonBlock = $dropdown.find('.dropdown__button');
    const $valuesContainer = $dropdown.find('.dropdown__values');

    const $firstCheckbox = $dropdown.find('.input-checkbox-with-label input').first(); // Первый чекбокс (с меткой "Все")

    if ($(this).is($firstCheckbox)) {
      // Если выбран первый чекбокс "Все"
      const allChecked = $firstCheckbox.prop('checked');
      $dropdown.find('.input-checkbox-with-label input').prop('checked', allChecked);

      if (allChecked) {
        $sortBlock.show().addClass('active');
        $buttonBlock.hide();

        $dropdown.find('.input-checkbox-with-label input').not($firstCheckbox).each(function () {
          const id = $(this).attr('id') || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
          $(this).attr('id', id);

          if ($valuesContainer.find(`.dropdown__value[data-id="${id}"]`).length === 0) {
            const value = $(this).siblings('p').text();
            const template = `
              <div class="dropdown__value" data-id="${id}">
                <span>${value}</span>
                <svg width="9" height="9" viewBox="0 0 9 9">
                  <use xlink:href="#other-close-icon"></use>
                </svg>
              </div>
            `;
            $valuesContainer.append(template);
          }
        });
      } else {
        $valuesContainer.empty();
      }
    } else {
      // Если выбран любой другой чекбокс
      $firstCheckbox.prop('checked', false);

      if (this.checked) {
        $sortBlock.css('display', 'flex').addClass('active');
        $buttonBlock.hide();

        let id = $(this).attr('id') || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
        $(this).attr('id', id);

        const value = $(this).siblings('p').text();
        const template = `
          <div class="dropdown__value" data-id="${id}">
            <span>${value}</span>
            <svg width="9" height="9" viewBox="0 0 9 9">
              <use xlink:href="#other-close-icon"></use>
            </svg>
          </div>
        `;
        $valuesContainer.append(template);
      } else {
        const id = $(this).attr('id');
        $valuesContainer.find(`.dropdown__value[data-id="${id}"]`).remove();
      }
    }

    // Проверить, есть ли выбранные элементы
    if ($valuesContainer.children().length === 0) {
      $sortBlock.hide().removeClass('active');
      $buttonBlock.show();
    }
  });


  // Удаление элемента из .dropdown__values
  $('.dropdown__values').on('click', '.dropdown__value svg', function (e) {
    e.stopPropagation(); // Предотвращение всплытия клика
    const $valueBlock = $(this).closest('.dropdown__value');
    const id = $valueBlock.data('id');

    // Убрать checked у соответствующего чекбокса
    $(`.input-checkbox-with-label input[id="${id}"]`).prop('checked', false);

    // Удалить элемент из .dropdown__values
    $valueBlock.remove();

    // Проверить, есть ли выбранные элементы
    const $valuesContainer = $('.dropdown__values');
    const $sortBlock = $('.dropdown__sort');
    const $buttonBlock = $('.dropdown-checkboxes .dropdown__button');

    if ($valuesContainer.children().length === 0) {
      $sortBlock.hide().removeClass('active');
      $buttonBlock.show();
      $('.dropdown__button').removeClass('active');
    }
  });

  // Переключение active для .dropdown__sort и открытие списка
  $('.dropdown__sort').on('click', function (e) {
    e.stopPropagation();

    const $dropdownList = $(this).siblings('.dropdown__list');

    // Закрыть все остальные списки и снять active
    $('.dropdown__list').not($dropdownList).removeClass('active');
    $('.dropdown__sort').not(this).removeClass('active');
    $('.dropdown__button').removeClass('active');

    // Переключить текущий
    $(this).toggleClass('active');
    $dropdownList.toggleClass('active');
  });

}

toggleDropdown();
