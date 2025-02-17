import gsap from 'gsap';
import setFilterHeight from '../../base/common/set-filter-height';
import setAsideHeight from '../../base/common/set-aside-height';

function toggleFilter() {
  $(document).on('click', '.filter__toggle[data-filter-name]', function() {
    let toggle = $(this);
    let filterName = $(this).data('filter-name');
    let filter = $('.filter[data-filter-name="' + filterName + '"]');
    let content = filter.prev('.content');

    let x;

    if (filter.hasClass('filter-sm')) {
      x = '-390px';
    } else if (filter.hasClass('filter-popup')) {
      x = '-320px';
    } else {
      x = '-304px';
    }

    if (toggle.hasClass('active')) {
      gsap.to(filter, {x: '0', duration: .3});
      toggle.removeClass('active');
      filter.removeClass('active');
      content.removeClass('active');
    } else {
      gsap.to(filter, {x: x, duration: .3});
      toggle.addClass('active');
      filter.addClass('active');
      content.addClass('active');
    }
    setFilterHeight();
    setAsideHeight();
  });

  const toggleClearButton = function () {
    $('.filter').each(function () {
      const $filter = $(this);
      const filterName = $filter.data('filter-name');
      const $filterToggle = $('.filter__toggle[data-filter-name="' + filterName + '"]');
  
      const $checkedInputs = $filter.find('input[type="checkbox"]:checked, input[type="radio"]:checked');
      const $checkedCheckAll = $filter.find('input.check-all:checked');
  
      const hasDate = ($filter.find('input[name="date"]').val() > 0 || $filter.find('input[name="date"]').val() !== 'Все') 
        && $filter.find('input[name="date"]').val() !== undefined;
  
      // Проверяем, выбраны ли только check-all
      const onlyCheckAllSelected = $checkedInputs.length > 0 && $checkedInputs.length === $checkedCheckAll.length;
  
      if ((hasDate || (!onlyCheckAllSelected && $checkedInputs.length > 0))) {
        $filterToggle.addClass('sorted');
      } else {
        $filterToggle.removeClass('sorted');
      }
    });
  };

  function observeDataValueChanges() {
    $('.monthpicker-trigger, .datepicker-trigger').each(function () {
      let targetNode = this;
      let $filter = $(targetNode).closest('.filter');
      const filterName = $filter.data('filter-name');
      const $filterToggle = $('.filter__toggle[data-filter-name="' + filterName + '"]');

      let observer = new MutationObserver(function (mutationsList) {
        mutationsList.forEach(mutation => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-value') {
            $filterToggle.addClass('sorted');
          }
        });
      });
  
      observer.observe(targetNode, { attributes: true, attributeFilter: ['data-value'] });
    });
  }
  
  // Запускаем отслеживание
  observeDataValueChanges();
  

  $('.filter').on('change', 'input[type="checkbox"], input[type="radio"]', function () {
    toggleClearButton();
  });

  $('.dropdown__values').on('click', '.dropdown__value svg', function (e) {
    e.stopPropagation();
    toggleClearButton();
  });

  $('.filter__clear, .filter-clear').on('click', function (e) {
    const $clearButton = $(this);
    let filterName = $clearButton.hasClass('filter-clear') 
      ? $clearButton.parent().data('filter-name') 
      : $clearButton.data('filter-name');

    let $button = $('.filter__toggle[data-filter-name="' + filterName + '"]');
    const $filterContainer = $('.filter[data-filter-name="' + filterName + '"]');

    $filterContainer.find('input[type="checkbox"], input[type="radio"]').prop('checked', false);
    $filterContainer.find('.dropdown__values').empty();
    $filterContainer.find('.dropdown__sort').hide().removeClass('active');
    $filterContainer.find('.dropdown__button').show().removeClass('active');
    $filterContainer.find('.dropdown__label').removeClass('selected');
    $filterContainer.find('.dropdown__inner').removeAttr('class').addClass('dropdown__inner status-transparent');
    $filterContainer.find('.dropdown__title').text('Все');
    $filterContainer.find('.dropdown__list').removeClass('active');
    $filterContainer.find('.dropdown__item input').prop('checked', false);
    $filterContainer.find('.dropdown__item').first().find('input').prop('checked', true);
    $filterContainer.find('.dropdown__selected span').text('0');

    $filterContainer.find('input[type="text"].monthpicker, input[type="text"].datepicker').attr('placeholder', 'Все').val('Все');

    $button.removeClass('sorted');
  });

}

toggleFilter();
