function toggleAdminPopupTip() {
  $('.popup__contact__button').on('click', function (e) {
    e.preventDefault();

    $('.popup__contact__button')
      .removeClass('active')
      .find('i')
      .text('Выбрать приоритетным контактом');

    $(this)
      .addClass('active')
      .find('i')
      .text('Приоритетный контакт');
  });
}
toggleAdminPopupTip();