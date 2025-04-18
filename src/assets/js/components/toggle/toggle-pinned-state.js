function togglePinnedState() {
  const pinBlock = $('.chat__pin');
  let targetConversation = null;

  // Контекстное меню по правому клику
  $('.chat__conversation').on('contextmenu', function (e) {
    e.preventDefault();
    targetConversation = $(this); // сохраняем текущую кнопку

    // Обновляем внешний вид pin-блока
    updatePinBlockContent(targetConversation.hasClass('chat__conversation-pinned'));

    // Позиционируем pin-блок слева от курсора
    const offsetX = 10;
    const pinWidth = pinBlock.outerWidth();

    const left = e.pageX - pinWidth - offsetX;
    const top = e.pageY;

    pinBlock
      .addClass('active')
      .css({
        left: `${left}px`,
        top: `${top}px`
      });
  });

  // Клик по pin-блоку — переключение pinned-состояния
  pinBlock.on('click', function () {
    if (!targetConversation) return;

    const isPinned = targetConversation.hasClass('chat__conversation-pinned');

    // Переключаем класс
    targetConversation.toggleClass('chat__conversation-pinned');

    // Скрываем меню
    pinBlock.removeClass('active');
    targetConversation = null;
  });

  // Клик вне — скрыть меню
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.chat__pin, .chat__conversation').length) {
      pinBlock.removeClass('active');
      targetConversation = null;
    }
  });

  // Обновление иконки и текста в .chat__pin
  function updatePinBlockContent(isPinned) {
    const use = pinBlock.find('use');
    const span = pinBlock.find('span');

    if (isPinned) {
      use.attr('xlink:href', '#other-unpin-icon');
      span.text('Открепить');
    } else {
      use.attr('xlink:href', '#other-pin-icon');
      span.text('Закрепить');
    }
  }
}

togglePinnedState();
