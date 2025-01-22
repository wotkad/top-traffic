function toggleDropdown() {

  function checkVisibility($parent) {
    const $children = $parent.find('.dropdown__value'); // Находим только дочерние элементы для конкретного родителя
    $children.removeClass('invisible').removeClass('visible');
  
    $children.each(function () {
      const $child = $(this);
      const parentTop = $parent.offset().top;
      const parentBottom = parentTop + $parent.outerHeight();
  
      const childTop = $child.offset().top;
      const childBottom = childTop + $child.outerHeight();
  
      // Проверяем, находится ли элемент в видимой области родителя
      if (childBottom > parentTop && childTop < parentBottom) {
        $child.addClass('visible').removeClass('invisible');
      } else {
        $child.addClass('invisible').removeClass('visible');
      }
    });
  
    // После обновления видимости добавляем блок .dropdown__show-all
    const $visibleChildren = $children.filter('.visible');
    const $hiddenChildren = $children.filter('.invisible');
  
    // Удаляем старый блок .dropdown__show-all, если он существует
    $parent.find('.dropdown__show-all').remove();
  
    if ($hiddenChildren.length) {
      // Добавить новый блок после последнего видимого элемента
      const $lastVisible = $visibleChildren.last();
      $lastVisible.after(`<div class="dropdown__show-all">Ещё ${$hiddenChildren.length}</div>`);
  
      if ($parent.find('.dropdown__show-all').length) {
        const $showAllBlock = $parent.find('.dropdown__show-all');
        const parentBottom = $parent.offset().top + $parent.outerHeight();
        const showAllBottom = $showAllBlock.offset().top + $showAllBlock.outerHeight();
  
        // Проверяем, выходит ли .dropdown__show-all за пределы родителя
        if (showAllBottom > parentBottom) {
          const $previousElement = $showAllBlock.prev('.dropdown__value'); // Предыдущий элемент перед .dropdown__show-all
          if ($previousElement.length) {
            $previousElement.removeClass('visible').addClass('invisible');
          }
        }
      }
    }
  }
  
  // При ресайзе обрабатываем каждый контейнер индивидуально
  $(window).on('resize', function() {
    $('.dropdown__values').each(function () {
      checkVisibility($(this)); // Передаем конкретный контейнер
    });
  });
  
  $('.dropdown__button, .dropdown__sort').on('click', function (e) {
    e.stopPropagation();
    const $dropdown = $(this).closest('.dropdown');
    const $list = $dropdown.find('.dropdown__list');
    
    if ($dropdown.closest('.filter__container').length) {
      const $container = $dropdown.closest('.filter__container');
      const buttonOffset = $(this).offset();
      const containerOffset = $container.offset();
      const buttonHeight = $(this).outerHeight();
      const dropdownTop = buttonOffset.top - containerOffset.top + buttonHeight;

      $list.css({
        top: `${dropdownTop + 4}px`,
      });
    }
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
    const titleStatus = $(this).closest('.dropdown__container').find('.dropdown__button').find('.dropdown__title');

    titleStatus.text(selectedValue);

    if (selectedColor) {
      buttonStatus.attr('class', `dropdown__button ${selectedColor} selected`);
    } else {
      buttonStatus.attr('class', 'dropdown__button');
    }

    const buttonPriority = $(this).closest('.dropdown-priority .dropdown__container').find('.dropdown__inner');

    if (selectedColor) {
      buttonPriority.attr('class', `dropdown__inner ${selectedColor} selected`);
    } else {
      buttonPriority.attr('class', 'dropdown__inner');
    }

    $(this).closest('.dropdown__list').removeClass('active');
    buttonStatus.removeClass('active');
    buttonPriority.removeClass('active');
  });

  $(document).on('click', function () {
    $('.dropdown__list').removeClass('active');
    $('.dropdown__button').removeClass('active');
    $('.dropdown__sort').removeClass('active');

    let selectedValues = $('.dropdown__items .checkbox .input-checkbox-with-label input');
    Array.from(selectedValues).forEach(el => {
      if ($(el).prop('checked')) {
        $(el).parent().parent().addClass('checked');
      } else {
        $(el).parent().parent().removeClass('checked');
      }
    });
  });

  $('.dropdown__list').on('click', function (e) {
    e.stopPropagation();
  });

  $('.dropdown__list .input-checkbox-with-label input').on('change', function () {
    const $dropdown = $(this).closest('.dropdown');
    const $list = $dropdown.find('.dropdown__list');
  
    // Остальная логика обработки чекбоксов
    const $sortBlock = $dropdown.find('.dropdown__sort');
    const $buttonBlock = $dropdown.find('.dropdown__button');
    const $valuesContainer = $dropdown.find('.dropdown__values');
    const $selectedValuesCount = $dropdown.find('.dropdown__selected span');
  
    const $firstCheckbox = $dropdown.find('.input-checkbox-with-label input').first();
  
    if ($(this).is($firstCheckbox)) {
      const allChecked = $firstCheckbox.prop('checked');
      
      $dropdown.find('.dropdown__sort').removeClass('opened');
      $dropdown.find('.dropdown__values').removeClass('opened');

      
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
  
    $selectedValuesCount.text($valuesContainer.children('.dropdown__value').length);
  
    if ($valuesContainer.children('.dropdown__value').length === 0) {
      $sortBlock.hide().removeClass('active');
      $buttonBlock.show();
    }

    const $parent = $valuesContainer;
    const $children = $parent.find('.dropdown__value');

    checkVisibility($parent);

    if ($(this).closest('.filter__container').length) {
      const $container = $(this).closest('.dropdown__container');
      const containerPosition = $container.position();
      const containerHeight = $container.outerHeight(); 
      const dropdownTop = containerPosition.top + containerHeight;
      
      $list.css({
        top: `${dropdownTop + 4}px`,
      });
    }

  });

  $('.dropdown__values').on('click', '.dropdown__show-all', function (e) {
    e.stopPropagation();
    $(this).closest('.dropdown__sort').siblings('.dropdown__list').addClass('active');
  });

  $('.dropdown__values').on('click', '.dropdown__value svg', function (e) {
    e.stopPropagation();
    
    const $valueBlock = $(this).closest('.dropdown__value');
    const id = $valueBlock.data('id');
  
    const $dropdown = $(this).closest('.dropdown'); 
    const $list = $dropdown.find('.dropdown__list'); 
    const $container = $dropdown.find('.dropdown__container');
  
    const $valuesContainer = $dropdown.find('.dropdown__values');
    const $sortBlock = $dropdown.find('.dropdown__sort');
    const $buttonBlock = $dropdown.find('.dropdown__button');
    const $selectedValuesCount = $dropdown.find('.dropdown__selected span');

    const $firstCheckbox = $dropdown.find('.input-checkbox-with-label input').first();
    $firstCheckbox.prop('checked', false);
  
    $(`.input-checkbox-with-label input[id="${id}"]`).prop('checked', false);
  
    $valueBlock.remove();
  
    $selectedValuesCount.text($valuesContainer.children('.dropdown__value').length);
  
    if ($valuesContainer.children('.dropdown__value').length === 0) {
      $sortBlock.hide().removeClass('active');
      $buttonBlock.show().removeClass('active');
    }
  
    const $parent = $valuesContainer;
    const $children = $parent.find('.dropdown__value');

    checkVisibility($parent);

    const containerPosition = $container.position(); 
    const containerHeight = $container.outerHeight();
    const dropdownTop = containerPosition.top + containerHeight;

    $list.css({
      top: `${dropdownTop + 4}px`, 
    });
  });
  

  $('.dropdown__sort').on('click', function (e) {
    e.stopPropagation();

    const $dropdownList = $(this).siblings('.dropdown__list');

    $('.dropdown__list').not($dropdownList).removeClass('active');
    $('.dropdown__sort').not(this).removeClass('active');
    $('.dropdown__button').removeClass('active');

    $(this).toggleClass('active');
  });

}

toggleDropdown();
