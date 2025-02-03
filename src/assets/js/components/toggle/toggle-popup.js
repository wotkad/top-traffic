import { enablePageScroll, disablePageScroll } from "scroll-lock";

function togglePopup() {
  $('.button[data-popup-name], .popup__bg[data-popup-name]').on('click', function() {
    let popupName = $(this).data('popup-name');
    if ($('.popup[data-popup-name="' + popupName + '"]').hasClass('active')) {
      $('.popup[data-popup-name="' + popupName + '"]').removeClass('active');
      enablePageScroll();
    } else {
      $('.popup[data-popup-name="' + popupName + '"]').addClass('active');
      disablePageScroll();
    }
  });
}
togglePopup();