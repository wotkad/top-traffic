import "jquery-ui/ui/widgets/slider";

function toggleFilterFormatSlider() {
  // Универсальная функция инициализации слайдеров и радиокнопок
  function initFilterSlider(minSelector, maxSelector, inputMin, inputMax, radiosSelector, defaults) {
    const $filter = $(minSelector).closest('.filter');
    const $filterToggle = $('.filter__toggle[data-filter-name="' + $filter.data('filter-name') + '"]');
    const $cleanButton = $filter.find('.filter__clean');

    let minDefault = defaults.min || 0;
    let maxDefault = defaults.max || 0;

    // Слайдер "От"
    $(minSelector).slider({
      range: "min",
      min: 0,
      max: 100,
      value: minDefault,
      slide: function(event, ui) {
        if (ui.value === 0) {
          $(inputMin).val('');
          $('.filter__clean').removeClass('active');
        } else {
          $(inputMin).val(ui.value);
        }

        if (ui.value >= 100) {
          $(inputMin).val('∞');
        }

        autoResizeInput($(inputMin));
        autoResizeInput($(inputMax));
        resetRadios(radiosSelector);
        checkSliderValues();
      }
    });

    // Слайдер "До"
    $(maxSelector).slider({
      range: "min",
      min: 0,
      max: 100,
      value: maxDefault,
      slide: function(event, ui) {
        if (ui.value === 0) {
          $(inputMax).val('');
          $('.filter__clean').removeClass('active');
        } else {
          $(inputMax).val(ui.value);
        }

        if (ui.value >= 100) {
          $(inputMax).val('∞');
        }

        autoResizeInput($(inputMin));
        autoResizeInput($(inputMax));
        resetRadios(radiosSelector);
        checkSliderValues();
      }
    });

    // Изменение значений в input вручную
    $(inputMin + "," + inputMax).on("input", function() {
      let minVal = parseInt($(inputMin).val()) || 0;
      let maxVal = parseInt($(inputMax).val()) || 0;

      $(minSelector).slider("value", minVal);
      $(maxSelector).slider("value", maxVal);

      if (minVal === 0) {
        $(inputMin).val('');
        $('.filter__clean').removeClass('active');
      }

      if (maxVal === 0) {
        $(inputMax).val('');
        $('.filter__clean').removeClass('active');
      }

      if (minVal >= 100) $(inputMin).val('∞');
      if (maxVal >= 100) $(inputMax).val('∞');

      resetRadios(radiosSelector);
      checkSliderValues();
    });

    // Клик по радио сбрасывает слайдеры
    $(radiosSelector).on("change", function() {
      resetSliders(minSelector, maxSelector, inputMin, inputMax, minDefault, maxDefault);
      checkSliderValues();
    });

    // Функция проверки слайдера и активации кнопки
    function checkSliderValues() {
      const minVal = parseInt($(inputMin).val()) || 0;
      const maxVal = parseInt($(inputMax).val()) || 0;
      const hasRadio = $(radiosSelector + ":checked").length > 0; // проверка, есть ли выбранные радио

      // Добавляем или убираем класс sorted для фильтра
      if (minVal !== 0 || maxVal !== 0 || hasRadio || $(inputMin).val() == '∞' || $(inputMax).val() == '∞') {
        $filterToggle.addClass("sorted");
        $cleanButton.addClass("active"); // активируем кнопку очистки
      } else {
        $filterToggle.removeClass("sorted");
        // здесь active не трогаем, он убирается только при глобальном сбросе
      }
    }
  }

  // Сброс радиокнопок (только в пределах группы)
  function resetRadios(radiosSelector) {
    $(radiosSelector).prop("checked", false);
  }

  // Сохраняем состояние до клика
  $(document).on('pointerdown mousedown', '.filter__formats input[type="radio"], .filter__formats input[type="checkbox"], .filter__formats label', function (e) {
    const $input = $(e.currentTarget).is('label')
      ? $(e.currentTarget).find('input[type="radio"], input[type="checkbox"]')
      : $(e.currentTarget);

    $input.data('wasChecked', !!$input.prop('checked'));
  });

  // Обработка click
  $(document).on('click', '.filter__formats input[type="radio"], .filter__formats input[type="checkbox"], .filter__formats label', function (e) {
    const $input = $(e.currentTarget).is('label')
      ? $(e.currentTarget).find('input[type="radio"], input[type="checkbox"]')
      : $(e.currentTarget);

    const wasChecked = !!$input.data('wasChecked');

    // Для радио: если было выбрано — снимаем
    if ($input.attr('type') === 'radio' && wasChecked) {
      e.preventDefault();
      $input.prop('checked', false).trigger('change');
    }

    const $filter = $input.closest('.filter');
    const $filterToggle = $('.filter__toggle[data-filter-name="' + $filter.data('filter-name') + '"]');
    const $cleanButton = $filter.find('.filter__clean');

    // проверяем, есть ли выбранные радио в фильтре
    const anyChecked = $filter.find('.filter__formats input[type="radio"]:checked').length > 0;

    if (anyChecked) {
      $filterToggle.addClass('sorted');
      $cleanButton.addClass('active');
    } else {
      $filterToggle.removeClass('sorted');
      $cleanButton.removeClass('active');
    }

    $input.removeData('wasChecked');
  });

  // Сброс слайдеров (только в пределах группы)
  function resetSliders(minSelector, maxSelector, inputMin, inputMax, minVal, maxVal) {
    $(minSelector).slider("value", minVal);
    $(maxSelector).slider("value", maxVal);

    $(inputMin).val("").removeAttr('style');
    $(inputMax).val("").removeAttr('style');
  }

  // Инициализация для "В топе"
  initFilterSlider(
    "#slider-top-range-min",
    "#slider-top-range-max",
    "#top-range-min",
    "#top-range-max",
    'input[name="format-top"]',
    { min: 0, max: 0 }
  );

  // Инициализация для "Без удаления"
  initFilterSlider(
    "#slider-remove-range-min",
    "#slider-remove-range-max",
    "#remove-range-min",
    "#remove-range-max",
    'input[name="format-remove"]',
    { min: 0, max: 0 }
  );

  // Кнопка очистки (сбрасывает всё сразу)
  function cleanFormatFilter() {
    let clean = $(".filter__clean");
    clean.on("click", function () {
      $('input[name="format-top"]').prop("checked", false);
      $('input[name="format-remove"]').prop("checked", false);

      resetSliders("#slider-top-range-min", "#slider-top-range-max", "#top-range-min", "#top-range-max", 0, 0);
      resetSliders("#slider-remove-range-min", "#slider-remove-range-max", "#remove-range-min", "#remove-range-max", 0, 0);
    });
  }
  cleanFormatFilter();

  function autoResizeInput($input) {
    let val = $input.val();
    if (val.length) {
      // считаем длину + padding
      let padding = parseInt($input.css("padding-left")) + parseInt($input.css("padding-right")) || 0;
      $input.css('width', `calc(${val.length + 1}ch + ${padding}px)`);
    } else {
      $input.removeAttr('style'); // сбрасываем инлайн ширину
    }
  }

  $('.filter__slider__values input[type="text"]').on('input', function() {
    autoResizeInput($(this));
  });

   // Очистка всех слайдеров
  $(".filter__clean, .filter__clear, .filter-clear").on("click", function () {
    $('input[name="format-top"], input[name="format-remove"]').prop("checked", false);

    // Сброс input
    $("#top-range-min, #top-range-max, #remove-range-min, #remove-range-max")
      .val('')
      .removeClass("filled")
      .each(function () { autoResizeInput($(this)); });

    // Сброс слайдеров (ползунки и полоса)
    $("#slider-top-range-min, #slider-top-range-max, #slider-remove-range-min, #slider-remove-range-max").each(function() {
      $(this).slider("value", 0); // двигаем ползунок
      $(this).find(".ui-slider-range").css("width", "0"); // сбрасываем визуальную полосу
    });

    $(".dropdown-filter-format").each(function () {
      const $dropdown = $(this);
      const $radios = $dropdown.find("input[type=radio]");
      const $title = $dropdown.find(".dropdown__title");

      $radios.attr("checked", false);

      // выбираем только первый
      const $first = $dropdown.find(".dropdown__item").first();
      $first.find("input[type=radio]").prop("checked", true);

      // меняем заголовок на дефолтный
      const defaultTitle = $first.find("p").data("title") || "мин";
      $title.text(defaultTitle);

      // убираем класс changed
      $dropdown.find(".dropdown__button").removeClass("changed");
    });

    // обновляем кнопки фильтра
    $('.filter__toggle').removeClass('sorted');
    $('.filter__clean').removeClass('active');
  });

}
toggleFilterFormatSlider();

function initDropdownFilterFormat() {
  // обработка выбора значения
  $(document).on("change", ".dropdown-filter-format .dropdown__item input[type=radio]", function () {
    const $dropdown = $(this).closest(".dropdown-filter-format");
    const $title = $dropdown.find(".dropdown__title");
    const newTitle = $(this).siblings("p").data("title");

    if (newTitle) {
      $title.text(newTitle);
      $dropdown.find(".dropdown__button").addClass("changed");
    }

    // при выборе делаем кнопку очистки активной
    const $filter = $dropdown.closest('.filter');
    const $cleanButton = $filter.find('.filter__clean');
    $cleanButton.addClass("active");
  });
}
initDropdownFilterFormat();
