import { enablePageScroll, disablePageScroll } from "scroll-lock";

function togglePopup() {
  $('.button[data-popup-name], .popup__bg[data-popup-name]').on('click', function () {
    let popupName = $(this).data('popup-name');
    let currentPopup = $('.popup[data-popup-name="' + popupName + '"]');

    // Если кликнули на уже открытый попап, закрываем его
    if (currentPopup.hasClass('active')) {
      currentPopup.removeClass('active');
      enablePageScroll();
    } else {
      // Закрываем все попапы перед открытием нового
      $('.popup.active').removeClass('active');
      enablePageScroll();

      // Открываем текущий попап
      currentPopup.addClass('active');
      disablePageScroll();
    }
  });
}

togglePopup();
