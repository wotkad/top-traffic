import setInfoUserPos from '../../base/common/set-info-user-pos';
import { applyDefaultTablePadding, applyFixedColsPadding } from '../../base/common/set-td-padding';

export default function toggleDropdown() {

  function checkVisibility($parent) {
    const $children = $parent.find('.dropdown__value');
    $children.removeClass('invisible').removeClass('visible');
  
    $children.each(function () {
      const $child = $(this);
      const parentTop = $parent.offset().top;
      const parentBottom = parentTop + $parent.outerHeight();
  
      const childTop = $child.offset().top;
      const childBottom = childTop + $child.outerHeight();
  
      if (childBottom > parentTop && childTop < parentBottom) {
        $child.addClass('visible').removeClass('invisible');
      } else {
        $child.addClass('invisible').removeClass('visible');
      }
    });
  
    const $visibleChildren = $children.filter('.visible');
    const $hiddenChildren = $children.filter('.invisible');
  
    $parent.find('.dropdown__show-all').remove();
  
    if ($hiddenChildren.length) {
      const $lastVisible = $visibleChildren.last();
      $lastVisible.after(`<div class="dropdown__show-all">Ещё ${$hiddenChildren.length}</div>`);
  
      if ($parent.find('.dropdown__show-all').length) {
        const $showAllBlock = $parent.find('.dropdown__show-all');
        const parentBottom = $parent.offset().top + $parent.outerHeight();
        const showAllBottom = $showAllBlock.offset().top + $showAllBlock.outerHeight();
  
        if (showAllBottom > parentBottom) {
          const $previousElement = $showAllBlock.prev('.dropdown__value');
          if ($previousElement.length) {
            $previousElement.removeClass('visible').addClass('invisible');
          }
        }
      }

      const newHiddenChildren = $children.filter('.invisible');

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
  
  $(window).on('resize', function() {
    $('.dropdown__values').not('.dropdown-checkboxes-images .dropdown__values').each(function () {
        checkVisibility($(this));
    });
  });
  
  $(document).on('click', '.dropdown__button, .dropdown__sort', function (e) {
    e.stopPropagation();
    if ($(e.target).closest('.info-users__body a').length || $(e.target).closest('.info-users__popup').length) {
        return;
    }
    const $dropdown = $(this).closest('.dropdown');
    const $list = $dropdown.children().children('.dropdown__list');
    $('.info-users__items').remove();

    if ($list.hasClass('active')) {
        $list.removeClass('active').css({ right: '', top: '' });
        $(this).removeClass('active');
        return;
    }

    updateDropdownPosition($dropdown);

    if (!$list.closest('.dropdown-new-format').length) {
      $('.dropdown__list').not($list).removeClass('active').css({ right: '', top: '' });
    }
    if ($(this).closest('.dropdown-new-format')) {
      $('.dropdown__list').not($(this).closest('.dropdown-new-format').find('.dropdown__list')).removeClass('active');
      $('.dropdown__button').not($(this).closest('.dropdown-new-format').find('.dropdown__button')).removeClass('active');
    }
    $('.dropdown__button').not(this).removeClass('active');
    $('.dropdown__sort').removeClass('active');

    $(this).addClass('active');
    $list.addClass('active');
  });

  $('.dropdown__cancel').on('click', function() {
    let $list = $(this).closest('.dropdown__list');
    let $button = $(this).closest('.dropdown__button');
    $list.removeClass('active');
    $button.removeClass('active');
  });

  $('.dropdown__submit').on('click', function() {
    let $list = $(this).closest('.dropdown__list');
    let $button = $(this).closest('.dropdown__button');
    $list.removeClass('active');
    $button.removeClass('active');
  });

  $('.wrapper').on('scroll', function() {
    $('.dropdown__list').removeClass('active').css({ right: '', top: '' });
    $('.dropdown__button').removeClass('active');
    $('.dropdown__sort').removeClass('active');
    $('.info-users__items').remove();
  });

  $('.content-aside__container').on('scroll', function() {
    $('.info-users__items').remove();
  });

  $(window).on('resize', function() {
    $('.dropdown__list').removeClass('active').css({ right: '', top: '' });
    $('.dropdown__button').removeClass('active');
    $('.dropdown__sort').removeClass('active');
  });

  $(document).on('change', '.dropdown__item input[type="radio"]', function () {
    $(this).closest('.dropdown__container').find('.dropdown__button').addClass('changed');
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
      titleStatus.addClass('info-users editable')
      titleStatus.html(
        selectedImg ? 
        `
          <div class="info-users__popup">
            <div class="info-users__header">
              <div class="info-users__avatar"><img src="/assets/images/avatar.png" alt="avatar" class=""></div>
              <div class="info-users__content">
                <h3>Медведева Валерия</h3>
                <div class="info-users__content__info">
                  <div class="info-users__role info-users__role-purple">Сотрудник</div>
                  <span>.</span><a href="#">lera@toptraffic.ru</a>
                </div>
              </div>
            </div>
            <div class="info-users__body"><a href="#"><img src="/assets/images/user.svg" alt="user" class=""><span>Перейти в профиль</span></a></div>
          </div>
          <img class="dropdown__image info-users__image" src=${selectedImg} alt=${selectedAlt}>` + selectedValue : 
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

    } else if ($(this).closest('.dropdown-radios').hasClass('dropdown-roles')) {
      
      const selectedValue = $(this).siblings('p').text();
      const selectedColor = $(this).data('role') || '';
      const buttonStatus = $(this).closest('.dropdown-roles .dropdown__container').find('.dropdown__button');
      const titleStatus = $(this).closest('.dropdown__container').find('.dropdown__button').find('.dropdown__title');
      titleStatus.text(selectedValue);
      if (selectedColor) {
        buttonStatus.attr('class', `dropdown__button ${selectedColor}`);
      } else {
        buttonStatus.attr('class', 'dropdown__button');
      }
      
      $(this).closest('.dropdown__list').removeClass('active');
      buttonStatus.removeClass('active');

    } else {

      const selectedValue = $(this).siblings('p').text();
      const titleStatus = $(this).closest('.dropdown__container').find('.dropdown__button').find('.dropdown__title');
      titleStatus.text(selectedValue);
      $(this).closest('.dropdown__list').removeClass('active');
      $(this).closest('.dropdown__list').prev().removeClass('active');
    }
    $(this).closest('.dropdown__item').siblings().find('input').prop('checked', false);
    $(this).closest('.dropdown__item').siblings().find('input').removeAttr('checked');
    $(this).attr('checked', true);
  });

  $(document).on('click', function (e) {
    if (
      !$('.dropdown-multiselect .dropdown__list').is(e.target) && 
      !$('.dropdown-multiselect .dropdown__list').has(e.target).length &&
      !$('.dropdown-new-format .dropdown__list').is(e.target) && 
      !$('.dropdown-new-format .dropdown__list').has(e.target).length
    ) {
      $('.dropdown__list').removeClass('active');
    }
    $('.dropdown__button').removeClass('active');
    $('.dropdown__sort').removeClass('active');
    if (
      !$('.datepicker-trigger').is(e.target) && !$('.datepicker-trigger').has(e.target).length &&
      !$('.datetimepicker-trigger').is(e.target) && !$('.datetimepicker-trigger').has(e.target).length &&
      !$('.monthpicker-trigger').is(e.target) && !$('.monthpicker-trigger').has(e.target).length &&
      !$('.datepicker').is(e.target) && !$('.datepicker').has(e.target).length
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
    applyFixedColsPadding();
    applyDefaultTablePadding();
  });

  $('.dropdown .dropdown__list .input-checkbox-with-label input').on('change', function () {
    const $dropdown = $(this).closest('.dropdown');
    const $firstCheckbox = $dropdown.find('.input-checkbox-with-label.check-all input');
    const $allCheckboxes = $dropdown.find('.input-checkbox-with-label input').not($firstCheckbox);
    
    if ($(this).is($firstCheckbox)) {
        const allChecked = $firstCheckbox.prop('checked');
        $allCheckboxes.prop('checked', allChecked);
    } else {
        const allCheckedExceptFirst = $allCheckboxes.length === $allCheckboxes.filter(':checked').length;
        $firstCheckbox.prop('checked', allCheckedExceptFirst);
    }
  });

  $('.dropdown-checkboxes .dropdown__list .input-checkbox-with-label input').on('change', function () {
    const $dropdown = $(this).closest('.dropdown');
  
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

    updateDropdownPosition($dropdown);

  });

  $('.dropdown__values, .info-users__list, .dropdown__show-all').on('click', function(e) {
    // Проверяем, не кликнули ли на ссылку внутри .info-users__body
    if ($(e.target).closest('.info-users__body a').length) {
        return;
    }

    if (!$(this).hasClass('single')) {
      e.stopPropagation();
    }

    // Закрываем попап только если клик не на .dropdown__show-all и не на .info-users__list
    if (!$(this).hasClass('info-users__list') && !$(this).hasClass('dropdown__show-all')) {
        $('.info-users__popup').css({ opacity: '0', visibility: 'hidden', zIndex: '-10' });
    }

    const $sortBlock = $(this).parent();
    const clickX = e.pageX;
    const clickY = e.pageY;

    // Проверяем, есть ли класс multiple или это кнопка .dropdown__show-all
    if ($(this).hasClass('multiple') || $(this).hasClass('dropdown__show-all')) {
        $('.info-users__items').remove();

        const template = `
        <div class="info-users__items active" style="position: fixed; top: ${clickY}px; left: ${clickX}px; transform: translateX(-100%);">
            <div class="info-users__inner">
                <div class="info-users__item">
                    <img src="/assets/images/avatar.png" alt="avatar" class="">
                    <p>Ульяна Комиссарова1111111111</p>
                    <a href="#">@andrey123456789</a>
                </div>
                <div class="info-users__item">
                    <img src="/assets/images/avatar.png" alt="avatar" class="">
                    <p>Михаил Соколовский Алекс</p>
                    <a href="#">@andrey1234567890123</a>
                </div>
                <div class="info-users__item">
                    <img src="/assets/images/avatar.png" alt="avatar" class="">
                    <p>Екатерина Никифорова</p>
                    <a href="#">@andreym</a>
                </div>
                <div class="info-users__item">
                    <img src="/assets/images/avatar.png" alt="avatar" class="">
                    <p>Михаил Карпов</p>
                    <a href="#">@andreym</a>
                </div>
                <div class="info-users__item">
                    <img src="/assets/images/avatar.png" alt="avatar" class="">
                    <p>Мария Зорина</p>
                    <a href="#">@andreym</a>
                </div>
                <div class="info-users__item">
                    <img src="/assets/images/avatar.png" alt="avatar" class="">
                    <p>Мария Зорина</p>
                    <a href="#">@andreym</a>
                </div>
                <div class="info-users__item">
                    <img src="/assets/images/avatar.png" alt="avatar" class="">
                    <p>Мария Зорина</p>
                    <a href="#">@andreym</a>
                </div>
            </div>
            <button class="info-users__button" type="button">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2039_11660)">
                        <path d="M8.40332 1.06738C8.66734 1.06738 8.88184 1.28188 8.88184 1.5459C8.88169 1.80979 8.66725 2.02344 8.40332 2.02344H3.15918C2.53167 2.02352 2.02453 2.51439 2.02441 3.13867V12.8203C2.02441 13.4479 2.53484 13.9755 3.15918 13.9756H12.8408C13.4652 13.9756 13.9756 13.448 13.9756 12.8203L13.9746 7.59668L13.9844 7.5C14.0289 7.282 14.222 7.11832 14.4531 7.11816C14.7173 7.11816 14.9316 7.33247 14.9316 7.59668V12.8203C14.9316 13.9722 13.9944 14.9316 12.8398 14.9316H3.15918C2.00471 14.9316 1.06738 13.9729 1.06738 12.8203V3.13965C1.06738 1.98515 2.00662 1.06747 3.15918 1.06738H8.40332Z" fill="#374151" stroke="#374151" stroke-width="0.15"></path>
                        <path d="M13.0654 0.816406C13.6417 0.352146 14.5383 0.385531 15.0684 0.916016L15.1689 1.02539C15.3882 1.29167 15.5068 1.62327 15.5068 1.97266C15.5067 2.3217 15.3875 2.65278 15.1689 2.91895L15.0684 3.0293L10.3066 7.79102C10.2657 7.83197 10.2171 7.86508 10.1631 7.88672L10.1074 7.9043L8.09961 8.40625C8.06454 8.41521 8.02964 8.41895 7.99512 8.41895C7.911 8.41895 7.82828 8.39439 7.75781 8.34766L7.69141 8.29297C7.58501 8.18577 7.54178 8.03095 7.57812 7.88477L8.08008 5.87695C8.0988 5.80178 8.13779 5.73237 8.19238 5.67773L12.9551 0.916016L13.0654 0.816406ZM13.2061 2.77832C12.9892 2.56159 12.6546 2.53481 12.4082 2.69727L12.3086 2.77832L9.00977 6.07715C8.94883 6.13814 8.90094 6.21054 8.86914 6.29004L8.84277 6.37207C8.7267 6.837 9.14834 7.25784 9.61328 7.1416L9.69434 7.11523C9.77398 7.08341 9.84714 7.03567 9.9082 6.97461L13.2061 3.67676L13.2871 3.57715C13.4269 3.36575 13.4269 3.08932 13.2871 2.87793L13.2061 2.77832ZM14.4609 1.52344C14.252 1.31452 13.9038 1.28855 13.6602 1.44531L13.5625 1.52344C13.4536 1.63261 13.4534 1.80988 13.5625 1.91895L14.0654 2.4209L14.1094 2.45703C14.2179 2.52863 14.3654 2.51639 14.4609 2.4209L14.54 2.32422C14.6092 2.22103 14.6464 2.10009 14.6465 1.97266C14.6465 1.84503 14.6093 1.72344 14.54 1.62012L14.4609 1.52344Z" fill="#374151" stroke="#374151" stroke-width="0.15"></path>
                    </g>
                    <defs>
                        <clipPath id="clip0_2039_11660">
                            <rect width="16" height="16" fill="white"></rect>
                        </clipPath>
                    </defs>
                </svg>
                <span>Изменить выбор</span>
            </button>
        </div>`;
        
        $sortBlock.append(template);
    }
  });

  $(document).on('click', function(e) {
      if (!$(e.target).closest('.info-users__items').length && 
          !$(e.target).closest('.dropdown__values').length &&
          !$(e.target).closest('.dropdown-new-format').length) {
          $('.info-users__items').remove();
          $('.dropdown__list, .dropdown__sort, .dropdown__button').removeClass('active');
      }
  });

  $(document).on('click', '.info-users__button', function(e) {
    $('.info-users__items').remove();
    $('.dropdown__list, .dropdown__sort, .dropdown__button').removeClass('active');
  });

  $(document).on('mouseleave', '.info-users__items', function() {
    $('.info-users__items').removeClass('active').remove();
  });

  $('.dropdown-checkboxes-images .dropdown__list .input-checkbox-with-label input').on('change', function () {
    const $dropdown = $(this).closest('.dropdown');
  
    const $sortBlock = $dropdown.find('.dropdown__sort');
    const $buttonBlock = $dropdown.find('.dropdown__button');
    const $valuesContainer = $dropdown.find('.dropdown__values');
    const $selectedValuesCount = $dropdown.find('.dropdown__selected span');
  
    const $firstCheckbox = $dropdown.find('.input-checkbox-with-label.check-all input');
    let zIndex = $dropdown.find('.input-checkbox-with-label input:checked').not($firstCheckbox).length;

    const checkedInputs = $dropdown.find('.input-checkbox-with-label input:checked').not($firstCheckbox);
    const isSingle = checkedInputs.length === 1;
  
    $valuesContainer.empty();
    $sortBlock.css('display', 'flex').addClass('active');
    $buttonBlock.hide();
  
    checkedInputs.each(function (index) {
      let id = $(this).attr('id') || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
      $(this).attr('id', id);
    
      const value = $(this).siblings('img').prop('src');
    
      const template = `
        <div class="dropdown__value info-users" data-id="${id}" style="z-index:${zIndex--}">
          <div class="info-users__popup">
            <div class="info-users__header">
              <div class="info-users__avatar"><img src="/assets/images/avatar.png" alt="avatar" class=""></div>
              <div class="info-users__content">
                <h3>Медведева Валерия</h3>
                <div class="info-users__content__info">
                  <div class="info-users__role info-users__role-purple">Сотрудник</div>
                  <span>.</span><a href="#">lera@toptraffic.ru</a>
                </div>
              </div>
            </div>
            <div class="info-users__body"><a href="#"><img src="/assets/images/user.svg" alt="user" class=""><span>Перейти в профиль</span></a></div>
          </div>
          <img class="info-users__image" src="${value}">
        </div>
      `;
      const template2 = `
        <div class="dropdown__value info-users" data-id="${id}" style="max-width: 100%;">
          <div class="info-users__popup">
            <div class="info-users__header">
              <div class="info-users__avatar"><img src="/assets/images/avatar.png" alt="avatar" class=""></div>
              <div class="info-users__content">
                <h3>Медведева Валерия</h3>
                <div class="info-users__content__info">
                  <div class="info-users__role info-users__role-purple">Сотрудник</div>
                  <span>.</span><a href="#">lera@toptraffic.ru</a>
                </div>
              </div>
            </div>
            <div class="info-users__body"><a href="#"><img src="/assets/images/user.svg" alt="user" class=""><span>Перейти в профиль</span></a></div>
          </div>
          <img class="info-users__image" style="max-width: 26px;" src="${value}">
          <div class="dropdown__title">${$(this).val()}</div>
        </div>
      `;
    
      $valuesContainer.append(isSingle ? template2 : template);
      isSingle ? $valuesContainer.removeClass('multiple').addClass('single') : $valuesContainer.removeClass('single').addClass('multiple');
    });

    setInfoUserPos();
  
    $selectedValuesCount.text($valuesContainer.children('.dropdown__value').length);
  
    if ($valuesContainer.children('.dropdown__value').length === 0) {
      $sortBlock.hide().removeClass('active');
      $buttonBlock.show();
    }

    $selectedValuesCount.text($dropdown.find('.input-checkbox-with-label input:checked').not($firstCheckbox).length);

    const $parent = $valuesContainer;

    checkVisibilityImages($parent);

    updateDropdownPosition($dropdown);

  });

  $('.dropdown-checkboxes-images .dropdown__values').on('click', function (e) {
    if ($(this).hasClass('multiple') || $(this).hasClass('single')) {
      $(this).parent().removeClass('active');
      $(this).parent().siblings('.dropdown__list').removeClass('active');
    } else {
      e.stopPropagation();
    }
  });

  $('.dropdown__values').on('click', '.dropdown__show-all', function (e) {
    e.stopPropagation();
    // $(this).closest('.dropdown__sort').siblings('.dropdown__list').addClass('active'); // должно быть закомментировано

    const $sortBlock = $(this).closest('.dropdown__sort');
    const clickX = e.pageX;
    const clickY = e.pageY;

    $('.info-users__popup').css({ opacity: '0', visibility: 'hidden', zIndex: '-10' });

    $('.info-users__items').remove();

    const template = `
    <div class="info-users__items active" style="position: fixed; top: ${clickY}px; left: ${clickX}px; transform: translateX(-100%);">
        <div class="info-users__inner">
            <div class="info-users__item">
                <img src="/assets/images/avatar.png" alt="avatar" class="">
                <p>Ульяна Комиссарова1111111111</p>
                <a href="#">@andrey123456789</a>
            </div>
            <div class="info-users__item">
                <img src="/assets/images/avatar.png" alt="avatar" class="">
                <p>Михаил Соколовский Алекс</p>
                <a href="#">@andrey1234567890123</a>
            </div>
            <div class="info-users__item">
                <img src="/assets/images/avatar.png" alt="avatar" class="">
                <p>Екатерина Никифорова</p>
                <a href="#">@andreym</a>
            </div>
            <div class="info-users__item">
                <img src="/assets/images/avatar.png" alt="avatar" class="">
                <p>Михаил Карпов</p>
                <a href="#">@andreym</a>
            </div>
            <div class="info-users__item">
                <img src="/assets/images/avatar.png" alt="avatar" class="">
                <p>Мария Зорина</p>
                <a href="#">@andreym</a>
            </div>
            <div class="info-users__item">
                <img src="/assets/images/avatar.png" alt="avatar" class="">
                <p>Мария Зорина</p>
                <a href="#">@andreym</a>
            </div>
            <div class="info-users__item">
                <img src="/assets/images/avatar.png" alt="avatar" class="">
                <p>Мария Зорина</p>
                <a href="#">@andreym</a>
            </div>
        </div>
        <button class="info-users__button" type="button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2039_11660)">
                    <path d="M8.40332 1.06738C8.66734 1.06738 8.88184 1.28188 8.88184 1.5459C8.88169 1.80979 8.66725 2.02344 8.40332 2.02344H3.15918C2.53167 2.02352 2.02453 2.51439 2.02441 3.13867V12.8203C2.02441 13.4479 2.53484 13.9755 3.15918 13.9756H12.8408C13.4652 13.9756 13.9756 13.448 13.9756 12.8203L13.9746 7.59668L13.9844 7.5C14.0289 7.282 14.222 7.11832 14.4531 7.11816C14.7173 7.11816 14.9316 7.33247 14.9316 7.59668V12.8203C14.9316 13.9722 13.9944 14.9316 12.8398 14.9316H3.15918C2.00471 14.9316 1.06738 13.9729 1.06738 12.8203V3.13965C1.06738 1.98515 2.00662 1.06747 3.15918 1.06738H8.40332Z" fill="#374151" stroke="#374151" stroke-width="0.15"></path>
                    <path d="M13.0654 0.816406C13.6417 0.352146 14.5383 0.385531 15.0684 0.916016L15.1689 1.02539C15.3882 1.29167 15.5068 1.62327 15.5068 1.97266C15.5067 2.3217 15.3875 2.65278 15.1689 2.91895L15.0684 3.0293L10.3066 7.79102C10.2657 7.83197 10.2171 7.86508 10.1631 7.88672L10.1074 7.9043L8.09961 8.40625C8.06454 8.41521 8.02964 8.41895 7.99512 8.41895C7.911 8.41895 7.82828 8.39439 7.75781 8.34766L7.69141 8.29297C7.58501 8.18577 7.54178 8.03095 7.57812 7.88477L8.08008 5.87695C8.0988 5.80178 8.13779 5.73237 8.19238 5.67773L12.9551 0.916016L13.0654 0.816406ZM13.2061 2.77832C12.9892 2.56159 12.6546 2.53481 12.4082 2.69727L12.3086 2.77832L9.00977 6.07715C8.94883 6.13814 8.90094 6.21054 8.86914 6.29004L8.84277 6.37207C8.7267 6.837 9.14834 7.25784 9.61328 7.1416L9.69434 7.11523C9.77398 7.08341 9.84714 7.03567 9.9082 6.97461L13.2061 3.67676L13.2871 3.57715C13.4269 3.36575 13.4269 3.08932 13.2871 2.87793L13.2061 2.77832ZM14.4609 1.52344C14.252 1.31452 13.9038 1.28855 13.6602 1.44531L13.5625 1.52344C13.4536 1.63261 13.4534 1.80988 13.5625 1.91895L14.0654 2.4209L14.1094 2.45703C14.2179 2.52863 14.3654 2.51639 14.4609 2.4209L14.54 2.32422C14.6092 2.22103 14.6464 2.10009 14.6465 1.97266C14.6465 1.84503 14.6093 1.72344 14.54 1.62012L14.4609 1.52344Z" fill="#374151" stroke="#374151" stroke-width="0.15"></path>
                </g>
                <defs>
                    <clipPath id="clip0_2039_11660">
                        <rect width="16" height="16" fill="white"></rect>
                    </clipPath>
                </defs>
            </svg>
            <span>Изменить выбор</span>
        </button>
    </div>`;
    
    $sortBlock.append(template);
    
  });

  $('.dropdown__values').on('click', '.dropdown__value svg', function (e) {
    e.stopPropagation();
    
    const $valueBlock = $(this).closest('.dropdown__value');
    const id = $valueBlock.data('id');
  
    const $dropdown = $(this).closest('.dropdown'); 
  
    const $valuesContainer = $dropdown.find('.dropdown__values');
    const $sortBlock = $dropdown.find('.dropdown__sort');
    const $buttonBlock = $dropdown.find('.dropdown__button');
    const $selectedValuesCount = $dropdown.find('.dropdown__selected span');

    const $firstCheckbox = $dropdown.find('.input-checkbox-with-label.check-all input').first();
    $firstCheckbox.prop('checked', false);

    
  
    $(`.input-checkbox-with-label input[id="${id}"]`).prop('checked', false);
  
    $valueBlock.remove();

    updateDropdownPosition($dropdown);
  
    $selectedValuesCount.text($valuesContainer.children('.dropdown__value').length);

    if ($valuesContainer.children('.dropdown__value').length === 0) {
      $sortBlock.hide().removeClass('active');
      $buttonBlock.show().removeClass('active');
    }
  
    const $parent = $valuesContainer;

    checkVisibility($parent);

  });
  
  $('.dropdown-base .dropdown__list .button').on('click', function () {
    $(this).closest('.dropdown__list').removeClass('active');
    $(this).closest('.dropdown__button').removeClass('active');
  });

  function updateDropdownPosition($dropdown) {
    const $list = $dropdown.find('.dropdown__list');

    const buttonOffset = $dropdown.offset();
  
    const containerPosition = $dropdown.offset();
    const containerHeight = $dropdown.outerHeight();
    const dropdownTop = containerPosition.top + containerHeight;
    const buttonWidth = $dropdown.outerWidth();
    const dropdownRight = $(window).width() - (buttonOffset.left + buttonWidth);
    const $clearButtonData = $dropdown.closest('.filter__container').find('.filter__clear').data('filter-name');
    const $valuesContainer = $dropdown.find('.dropdown__values');
    
    const $sortBlock = $dropdown.find('.dropdown__sort');
    const $buttonBlock = $dropdown.find('.dropdown__button');

    const $button = $('.filter__toggle[data-filter-name="' + $clearButtonData + '"]');
  
    if ($valuesContainer.children('.dropdown__value').length === 0) {
      $sortBlock.hide().removeClass('active');
      $buttonBlock.show().removeClass('active');
      $button.removeClass('sorted');
    }

    if ($dropdown.closest('.filter__container').length) {
      const $container = $dropdown.closest('.filter__container');
      const buttonOffset = $dropdown.offset();
      const containerOffset = $container.offset();
      const buttonHeight = $dropdown.outerHeight();
      const dropdownTop = buttonOffset.top - containerOffset.top + buttonHeight;

      $list.css({
        top: `${dropdownTop + 4}px`,
      });
    } else {
      $list.css({
        position: 'fixed',
        top: `${dropdownTop + 4}px`,
        right: `${dropdownRight}px`,
      });
    }
  }

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
