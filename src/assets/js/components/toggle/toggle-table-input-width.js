function toggleTableInputWidth() {
  let inputCurrency = $('.input__el.currency');
  let inputPercent = $('.input__el.percent');

  inputCurrency.on('input', function () {
    let rawValue = $(this).val().replace(/\s/g, ''); // Убираем пробелы перед обработкой

    if (!isNaN(rawValue) && rawValue !== '') {
      $(this).css('padding-right', 21);

      // Проверяем, есть ли уже знак рубля, если нет — добавляем
      if ($(this).siblings('.symbol').length === 0) {
        $(this).parent().append('<div class="symbol">₽</div>');
      }

      let formattedValue = Number(rawValue).toLocaleString('ru-RU'); // Добавляем пробелы
      $(this).val(formattedValue);

      // Корректно рассчитываем ширину с учетом пробелов
      let tempSpan = $('<span>').text(formattedValue).css({
        'visibility': 'hidden',
        'white-space': 'nowrap',
        'position': 'absolute',
        'font': $(this).css('font') // Наследуем шрифт, чтобы расчет был точным
      }).appendTo('body');

      let newWidth
      
      newWidth = tempSpan.width() + 16 + 21; // Берем ширину span + padding
      tempSpan.remove(); // Удаляем временный элемент

      $(this).css('width', newWidth + 'px');
    } else {
      $(this).parent().find('.symbol').remove();
      $(this).parent().removeAttr('data-value');
      $(this).css('padding-right', 8);
    }

    $(this).parent().attr('data-value', rawValue);
  });

  inputPercent.on('input', function () {
    let rawValue = $(this).val().replace(/\s/g, ''); // Убираем пробелы перед обработкой

    // Заменяем запятую на точку для правильной обработки
    rawValue = rawValue.replace(',', '.');

    if (!isNaN(rawValue) && rawValue !== '') {
      $(this).css('padding-right', 21);

      // Проверяем, есть ли уже знак процента, если нет — добавляем
      if ($(this).siblings('.symbol').length === 0) {
        $(this).parent().append('<div class="symbol">%</div>');
      }

      // Корректно рассчитываем ширину с учетом пробелов
      let tempSpan = $('<span>').text(rawValue).css({
        'visibility': 'hidden',
        'white-space': 'nowrap',
        'position': 'absolute',
        'font': $(this).css('font') // Наследуем шрифт, чтобы расчет был точным
      }).appendTo('body');

      let newWidth = tempSpan.width() + 16 + 21; // Берем ширину span + padding
      tempSpan.remove(); // Удаляем временный элемент

      $(this).css('width', newWidth + 'px');
    } else {
      $(this).parent().find('.symbol').remove();
      $(this).parent().removeAttr('data-value');
      $(this).css('padding-right', 8);
    }

    $(this).parent().attr('data-value', rawValue);
  });
}

toggleTableInputWidth();
