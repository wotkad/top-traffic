function toggleAdminPopupTip() {
  $('.popup__contact__button').on('click', function (e) {
    e.preventDefault();

    const $btn = $(this);

    // если уже активен — снимаем
    if ($btn.hasClass('active')) {
      $btn
        .removeClass('active')
        .find('i')
        .text('Выбрать приоритетным контактом');
      return;
    }

    // иначе — делаем активным (и убираем у остальных)
    $('.popup__contact__button')
      .removeClass('active')
      .find('i')
      .text('Выбрать приоритетным контактом');

    $btn
      .addClass('active')
      .find('i')
      .text('Приоритетный контакт');
  });
}
toggleAdminPopupTip();