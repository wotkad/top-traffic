import { enablePageScroll, disablePageScroll } from "scroll-lock";

function togglePopup() {
  $(document).on('click', '.button[data-popup-name]', function() {
      let popupName = $(this).data('popup-name');
      $('.popup[data-popup-name="' + popupName + '"]').addClass('active');
      disablePageScroll();
  });

  $(document).on('click', '.popup__close[data-popup-name], .popup__bg[data-popup-name]', function() {
      let popupName = $(this).data('popup-name'); 
      $('.popup[data-popup-name="' + popupName + '"]').removeClass('active');
      enablePageScroll();
  });
}
togglePopup();