import { enablePageScroll, disablePageScroll } from "scroll-lock";

function togglePopup() {
  $(document).on('click', '.button[data-popup-name]', function (e) {
    e.stopPropagation();

    let popupName = $(this).data('popup-name');
    let currentPopup = $('.popup[data-popup-name="' + popupName + '"]');
    let currentPopupBg = $('.popup__bg[data-popup-name="' + popupName + '"]');

    if (currentPopup.hasClass('active')) {
      closePopup(currentPopup, currentPopupBg);
    } else {
      $('.popup.active, .popup__bg.active').removeClass('active');
      enablePageScroll();

      currentPopup.addClass('active');
      currentPopupBg.addClass('active');
      disablePageScroll();
    }
  });

  $(document).on('mouseup', function(e) {
    $('.popup.active').each(function() {
      let popup = $(this);
      let popupWrapper = popup.find('.popup__wrapper');
      if (!popupWrapper.is(e.target) && !popupWrapper.has(e.target).length) {
        closePopup(popup, popup.prev());
      }
    });
  });
}

function closePopup(popup, popupBg) {
  popup.removeClass('active');
  popupBg.removeClass('active');
  enablePageScroll();
}

togglePopup();
