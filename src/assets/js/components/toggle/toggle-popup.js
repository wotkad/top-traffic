import { enablePageScroll, disablePageScroll } from "scroll-lock";

function togglePopup() {
  $(document).on('click', '.button[data-popup-name]', function (e) {
    e.stopPropagation();

    let popupName = $(this).data('popup-name');
    let currentPopup = $('.popup[data-popup-name="' + popupName + '"]');
    let currentPopupBg = $('.popup__bg[data-popup-name="' + popupName + '"]');
    let currentMessage = $(this).closest('.message');

    $('.message').removeClass('active');

    if (popupName == 'share-post') {
      $('.popup').removeClass('active');
      $('.popup__bg').removeClass('active');
    }

    if (currentPopup.hasClass('active')) {
      closePopup(currentPopup, currentPopupBg, currentMessage);
    } else {
      currentPopup.addClass('active');
      currentPopupBg.addClass('active');
      currentMessage.addClass('active');
      disablePageScroll();
    }
  });

  $(document).on('click', '.popup__hide', function () {
    $('.popup').removeClass('active');
    $('.popup__bg').removeClass('active');
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

function closePopup(popup, popupBg, currentMessage) {
  popup.removeClass('active');
  popupBg.removeClass('active');
  
  // Проверяем наличие currentMessage и удаляем класс, если он есть
  if (currentMessage && currentMessage.length) {
    currentMessage.removeClass('active');
  }

  // Включаем прокрутку, только если все попапы закрыты
  if (!$('.popup.active').length) {
    enablePageScroll();
  }
}

togglePopup();
