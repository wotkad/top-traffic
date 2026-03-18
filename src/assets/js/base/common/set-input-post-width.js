function showChangePopup() {
  $('.popup[data-popup-name="change-link"]').addClass('active');
  $('.popup__bg[data-popup-name="change-link"]').addClass('active');
}

function setInputPostWidth() {
  // Функция для управления отображением textarea
  function manageTextareaDisplay(textarea) {
    if (textarea.hasClass('active')) {
      // Показываем полное содержимое с авто-высотой
      textarea
        .height('auto')
        .css({
          'overflow': 'hidden',
          'text-overflow': 'clip',
          'white-space': 'normal'
        });
      
      // Рассчитываем и устанавливаем высоту (не более 100px)
      const scrollHeight = textarea[0].scrollHeight;
      const newHeight = Math.min(scrollHeight, 100);
      textarea.height(newHeight);
    } else {
      // Скрываем все строки кроме первой
      textarea
        .height(30) // Фиксированная высота одной строки
        .css({
          'overflow': 'hidden',
          'text-overflow': 'ellipsis',
          'white-space': 'nowrap'
        });
    }
  }

  // Обработчики событий для всех textarea внутри .table__post__input
  $('.table__post__input textarea')
    .on('focus', function() {
      const $textarea = $(this);

      $textarea.addClass('active');
      $textarea.data('oldValue', $textarea.val());

      $textarea.parent().siblings('button').hide();
      manageTextareaDisplay($textarea);
    })

    .on('input', function() {
      const $textarea = $(this);

      if ($textarea.hasClass('active')) {
        manageTextareaDisplay($textarea);
      }

      if ($textarea.hasClass('filled')) {
        $textarea.closest('.table__post__wrapper').addClass('filled');
      } else {
        $textarea.closest('.table__post__wrapper').removeClass('filled');
      }
    })

    // ENTER = подтверждение
    .on('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();

        const $textarea = $(this);
        const oldValue = $textarea.data('oldValue');
        const newValue = $textarea.val();

        if (oldValue.trim() !== newValue.trim()) {
          showChangePopup();
        }

        $textarea.blur();
      }
    })

    .on('blur', function() {
      const $textarea = $(this);

      $textarea.parent().siblings('button').show();
      $textarea.removeClass('active');
      manageTextareaDisplay($textarea);

      const oldValue = $textarea.data('oldValue');
      const newValue = $textarea.val();

      if (oldValue.trim() !== newValue.trim()) {
        showChangePopup();
      }
    });
}
setInputPostWidth();