function toggleWidget() {
  let button = $('.selector__toggle');

  button.on('click', function() {
    let checkbox = $(this).find('input[type="checkbox"]'); // Находим чекбокс внутри кнопки
    if (!checkbox.length) return; // Если чекбокса нет — выходим

    let isChecked = checkbox.is(':checked');

    $('[data-awaiting-value][data-reality-value]').each(function() {
      let awaitingValue = $(this).attr('data-awaiting-value');
      let realityValue = $(this).attr('data-reality-value');

      if ($(this).is('progress')) {
        $(this).val(isChecked ? realityValue : awaitingValue);
      } else {
        $(this).text(isChecked ? realityValue : awaitingValue);
      }
    });
  });
}

toggleWidget();
``
