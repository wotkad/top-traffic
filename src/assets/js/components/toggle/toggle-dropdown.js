import setTdPadding from '../../base/common/set-td-padding';
import setTdPaddingDefault from '../../base/common/set-td-padding-default';

export default function toggleDropdown() {

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

      // Пересчитываем скрытые элементы после вставки кнопки
      const newHiddenChildren = $children.filter('.invisible');

      // Обновляем текст кнопки
      $('.dropdown__show-all').text(`Ещё ${newHiddenChildren.length}`);
    }
  }

  function checkVisibilityImages($parent) {
    const $children = $parent.find('.dropdown__value'); 
    
    $children.each(function (index) {
        const $child = $(this);
        if (index >= 4) {
          $child.addClass('invisible').removeClass('visible');
        } else {
          $child.addClass('visible').removeClass('invisible');
        }
    });

    const $visibleChildren = $children.filter('.visible');
    const $hiddenChildren = $children.filter('.invisible');

    $parent.find('.dropdown__show-all').remove();

    if ($hiddenChildren.length) {
        const $lastVisible = $visibleChildren.last();
        $lastVisible.after(`<div class="dropdown__show-all">+${$hiddenChildren.length}</div>`);
    }
  }

  
  // При ресайзе обрабатываем каждый контейнер индивидуально
  $(window).on('resize', function() {
    $('.dropdown__values').not('.dropdown-checkboxes-images .dropdown__values').each(function () {
        checkVisibility($(this)); // Передаем конкретный контейнер
    });
  });
  
  $(document).on('click', '.dropdown__button, .dropdown__sort', function (e) {
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

  $(document).on('change', '.dropdown__item input[type="radio"]', function () {
    if ($(this).closest('.dropdown').hasClass('dropdown-status') || $(this).closest('.dropdown').hasClass('dropdown-priority')) {
      const selectedValue = $(this).siblings('p').text();
      const selectedColor = $(this).data('color') || '';
      const innerStatus = $(this).closest('.dropdown-status .dropdown__container').find('.dropdown__inner');
      const buttonStatus = $(this).closest('.dropdown-status .dropdown__container').find('.dropdown__button');
      const titleStatus = $(this).closest('.dropdown__container').find('.dropdown__button').find('.dropdown__title');
      const buttonPriority = $(this).closest('.dropdown-priority .dropdown__container').find('.dropdown__inner');
      titleStatus.text(selectedValue);
      if (selectedColor) {
        innerStatus.attr('class', `dropdown__inner ${selectedColor} selected`);
        buttonStatus.attr('class', `dropdown__button ${selectedColor} selected`);
      } else {
        innerStatus.attr('class', 'dropdown__inner');
        buttonStatus.attr('class', 'dropdown__button');
      }
      if (selectedColor) {
        buttonPriority.attr('class', `dropdown__inner ${selectedColor} selected`);
      } else {
        buttonPriority.attr('class', 'dropdown__inner');
      }
      $(this).closest('.dropdown__list').removeClass('active');
      innerStatus.removeClass('active');
      buttonStatus.removeClass('active');
      buttonPriority.removeClass('active');

    } else if ($(this).closest('.dropdown-radios').hasClass('dropdown-copy-image')) {
      
      const selectedValue = $(this).siblings('p').text();
      const selectedImg = $(this).siblings('img').prop('src');
      const selectedAlt = $(this).siblings('img').prop('alt');
      const titleStatus = $(this).closest('.dropdown__container').find('.dropdown__button').find('.dropdown__title');
      titleStatus.html(
        selectedImg ? 
        `<img class="dropdown__image" src=${selectedImg} alt=${selectedAlt}>` + selectedValue : 
        selectedValue
      );
      $(this).closest('.dropdown__list').removeClass('active');

    } else if ($(this).closest('.dropdown').hasClass('dropdown-select-admin')) {

      const dropdown = $(this).closest('.dropdown');
      dropdown.addClass('selected');
      const selectedValue = $(this).siblings('p').text();
      const selectedImg = $(this).siblings('img').prop('src');
      const selectedAlt = $(this).siblings('img').prop('alt');
      const selectedLinkHref = $(this).parent().data('href');
      const selectedLinkTitle = $(this).parent().data('title');
      const titleStatus = $(this).closest('.dropdown__container').find('.dropdown__button').find('.dropdown__title');
      titleStatus.html(`
        <div class="flex items-center gap-x-1.5">
          <img class="rounded object-cover w-[30px] h-[30px]" src="${selectedImg}" alt="${selectedAlt}">
          <div class="flex flex-col items-start">
            <h3><a href="#" class="table__channel">${selectedValue}</a></h3>
            <a href=${selectedLinkHref} target="_blank" class="table__link">${selectedLinkTitle}</a>
          </div>
        </div>
      `);

    } else {

      const selectedValue = $(this).siblings('p').text();
      const titleStatus = $(this).closest('.dropdown__container').find('.dropdown__button').find('.dropdown__title');
      titleStatus.text(selectedValue);
      $(this).closest('.dropdown__list').removeClass('active');
    }
    $(this).closest('.dropdown__item').siblings().find('input').prop('checked', false);
    $(this).closest('.dropdown__item').siblings().find('input').removeAttr('checked');
    $(this).attr('checked', true);
  });

  $(document).on('click', function (e) {
    if (!$('.dropdown-multiselect .dropdown__list').is(e.target) && !$('.dropdown-multiselect .dropdown__list').has(e.target).length) {
      $('.dropdown__list').removeClass('active');
    }
    $('.dropdown__button').removeClass('active');
    $('.dropdown__sort').removeClass('active');
    if (
      !$('.datepicker-trigger').is(e.target) && !$('.datepicker-trigger').has(e.target).length &&
      !$('.datetimepicker-trigger').is(e.target) && !$('.datetimepicker-trigger').has(e.target).length &&
      !$('.monthpicker-trigger').is(e.target) && !$('.monthpicker-trigger').has(e.target).length &&
      !$('.datepicker').is(e.target) && !$('.datepicker').has(e.target).length // чтобы календарь не закрывался при клике внутри самого календаря
    ) {
      $('.datepicker').removeClass('active');
    }

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
    if (
      $(this).closest('.dropdown-checkboxes').length ||
      $(this).closest('.dropdown-checkboxes-images').length ||
      $(this).closest('.dropdown-radios').length
    ) {
      e.stopPropagation();
    }
  });

  $('table.table .dropdown__list .input-checkbox-with-label input').on('change', function () {
    setTdPadding();
    setTdPaddingDefault();
  });

  $('.dropdown .dropdown__list .input-checkbox-with-label input').on('change', function () {
    const $dropdown = $(this).closest('.dropdown');
    const $firstCheckbox = $dropdown.find('.input-checkbox-with-label.check-all input');
    const $allCheckboxes = $dropdown.find('.input-checkbox-with-label input').not($firstCheckbox);
    
    if ($(this).is($firstCheckbox)) {
        // Если изменили чекбокс "Выбрать все"
        const allChecked = $firstCheckbox.prop('checked');
        $allCheckboxes.prop('checked', allChecked);
    } else {
        // Если изменили обычный чекбокс
        const allCheckedExceptFirst = $allCheckboxes.length === $allCheckboxes.filter(':checked').length;
        $firstCheckbox.prop('checked', allCheckedExceptFirst);
    }
  });

  $('.dropdown-checkboxes .dropdown__list .input-checkbox-with-label input').on('change', function () {
    const $dropdown = $(this).closest('.dropdown');
    const $list = $dropdown.find('.dropdown__list');
  
    // Логика обработки чекбоксов
    const $sortBlock = $dropdown.find('.dropdown__sort');
    const $buttonBlock = $dropdown.find('.dropdown__button');
    const $valuesContainer = $dropdown.find('.dropdown__values');
    const $selectedValuesCount = $dropdown.find('.dropdown__selected span');
  
    const $firstCheckbox = $dropdown.find('.input-checkbox-with-label.check-all input');
    const $allCheckboxes = $dropdown.find('.input-checkbox-with-label input').not($firstCheckbox);

    if ($(this).is($firstCheckbox)) {
        const allChecked = $firstCheckbox.prop('checked');
        
        $dropdown.find('.dropdown__sort').removeClass('opened');
        $dropdown.find('.dropdown__values').removeClass('opened');

        $allCheckboxes.prop('checked', allChecked);

        if (allChecked) {
            $sortBlock.hide().removeClass('active');
            $buttonBlock.show();
            $valuesContainer.empty();
            //   $dropdown.find('.input-checkbox-with-label input').not($firstCheckbox).each(function () {
      //     const id = $(this).attr('id') || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
      //     $(this).attr('id', id);
  
      //     if ($valuesContainer.find(`.dropdown__value[data-id="${id}"]`).length === 0) {
      //       const value = $(this).siblings('p').text();
      //       const template = `
      //         <div class="dropdown__value" data-id="${id}">
      //           <span>${value}</span>
      //           <svg width="9" height="9" viewBox="0 0 9 9">
      //             <use xlink:href="#other-close-icon"></use>
      //           </svg>
      //         </div>
      //       `;
      //       $valuesContainer.append(template);
      //     }
      //   });
      // } else {
      //   $valuesContainer.empty();
        }
    } else {
        const allCheckedExceptFirst = $allCheckboxes.length === $allCheckboxes.filter(':checked').length;
        $firstCheckbox.prop('checked', allCheckedExceptFirst);

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
            $valuesContainer.empty();
            $sortBlock.css('display', 'flex').addClass('active');
            $buttonBlock.hide();

            $allCheckboxes.filter(':checked').each(function () {
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
            });

            // Обновляем счетчик выбранных элементов
            $selectedValuesCount.text($valuesContainer.children('.dropdown__value').length);

            if ($valuesContainer.children('.dropdown__value').length === 0) {
                $sortBlock.hide().removeClass('active');
                $buttonBlock.show();
            }
        }
    }

    if ($valuesContainer.children('.dropdown__value').length === 0) {
        $sortBlock.hide().removeClass('active');
        $buttonBlock.show();
    }

    $selectedValuesCount.text($allCheckboxes.filter(':checked').length);

    const $parent = $valuesContainer;
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

  $('.dropdown-checkboxes-images .dropdown__list .input-checkbox-with-label input').on('change', function () {
    const $dropdown = $(this).closest('.dropdown');
    const $list = $dropdown.find('.dropdown__list');
  
    // Остальная логика обработки чекбоксов
    const $sortBlock = $dropdown.find('.dropdown__sort');
    const $buttonBlock = $dropdown.find('.dropdown__button');
    const $valuesContainer = $dropdown.find('.dropdown__values');
    const $selectedValuesCount = $dropdown.find('.dropdown__selected span');
  
    const $firstCheckbox = $dropdown.find('.input-checkbox-with-label.check-all input');
    let zIndex = $dropdown.find('.input-checkbox-with-label input:checked').not($firstCheckbox).length;

    const checkedInputs = $dropdown.find('.input-checkbox-with-label input:checked').not($firstCheckbox);
    const isSingle = checkedInputs.length === 1;
  
    // Очистить список и заново добавить все отмеченные элементы
    $valuesContainer.empty();
    $sortBlock.css('display', 'flex').addClass('active');
    $buttonBlock.hide();
  
    checkedInputs.each(function (index) {
      let id = $(this).attr('id') || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
      $(this).attr('id', id);
    
      const value = $(this).siblings('img').prop('src');
    
      const template = `
        <div class="dropdown__value" data-id="${id}" style="z-index:${zIndex--}">
          <img src="${value}">
        </div>
      `;
      const template2 = `
        <div class="dropdown__value" data-id="${id}" style="max-width: 100%;">
          <img style="max-width: 26px;" src="${value}">
          <div class="dropdown__title">${$(this).val()}</div>
        </div>
      `;
    
      // Если выбран один — рендерим template2, иначе — всегда template
      $valuesContainer.append(isSingle ? template2 : template);
    });
  
    // Обновляем счетчик выбранных элементов
    $selectedValuesCount.text($valuesContainer.children('.dropdown__value').length);
  
    // Если больше нет отмеченных элементов, скрываем сортировку и показываем кнопку
    if ($valuesContainer.children('.dropdown__value').length === 0) {
      $sortBlock.hide().removeClass('active');
      $buttonBlock.show();
    }

    $selectedValuesCount.text($dropdown.find('.input-checkbox-with-label input:checked').not($firstCheckbox).length);

    const $parent = $valuesContainer;

    checkVisibilityImages($parent);

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

    const $firstCheckbox = $dropdown.find('.input-checkbox-with-label.check-all input').first();
    $firstCheckbox.prop('checked', false);
  
    $(`.input-checkbox-with-label input[id="${id}"]`).prop('checked', false);
  
    $valueBlock.remove();
  
    $selectedValuesCount.text($valuesContainer.children('.dropdown__value').length);
  
    if ($valuesContainer.children('.dropdown__value').length === 0) {
      $sortBlock.hide().removeClass('active');
      $buttonBlock.show().removeClass('active');
    }
  
    const $parent = $valuesContainer;

    checkVisibility($parent);

    const containerPosition = $container.position(); 
    const containerHeight = $container.outerHeight();
    const dropdownTop = containerPosition.top + containerHeight;

    $list.css({
      top: `${dropdownTop + 4}px`, 
    });
  });
  
  $('.dropdown-base .dropdown__list .button').on('click', function () {
    $(this).closest('.dropdown__list').removeClass('active');
    $(this).closest('.dropdown__button').removeClass('active');
  });

  function isSearchShow() {
    $('.dropdown').each(function() {
      if ($(this).find('.dropdown__items').children().length > 5) {
        $(this).find('.search').show();
      } else {
        $(this).find('.search').hide();
      }
    })
  }
  isSearchShow();

}

toggleDropdown();
