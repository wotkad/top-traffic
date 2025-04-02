import { enablePageScroll, disablePageScroll } from "scroll-lock";

function togglePopup() {
  $(document).on('click', '.button[data-popup-name]', function (e) {
    e.stopPropagation();

    let popupName = $(this).data('popup-name');
    let currentPopup = $('.popup[data-popup-name="' + popupName + '"]');
    let currentPopupBg = $('.popup__bg[data-popup-name="' + popupName + '"]');
    let currentMessage = $(this).closest('.message');
    let currentUser = $(this).closest('.user');

    $('.message').removeClass('active');
    $('.user').removeClass('active');

    if (popupName == 'share-post') {
      $('.popup').removeClass('active');
      $('.popup__bg').removeClass('active');
    }

    if (currentPopup.hasClass('active')) {
      closePopup(currentPopup, currentPopupBg, currentMessage, currentUser);
    } else {
      currentPopup.addClass('active');
      currentPopupBg.addClass('active');
      currentMessage.addClass('active');
      currentUser.addClass('active');
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
      let currentMessage = $(this).closest('.message');
      let currentUser = $(this).closest('.user');
      let popupWrapper = popup.find('.popup__wrapper');
      if (!popupWrapper.closest('.popup[data-popup-name="add-user"]')) {
        if (!popupWrapper.is(e.target) && !popupWrapper.has(e.target).length) {
          closePopup(popup, popup.prev());
          currentMessage.removeClass('active');
          currentUser.removeClass('active');
        }
      }
    });
  });
}

function closePopup(popup, popupBg, currentMessage, currentUser) {
  popup.removeClass('active');
  popupBg.removeClass('active');
  
  if (currentMessage && currentMessage.length) {
    currentMessage.removeClass('active');
  }

  if (currentUser && currentUser.length) {
    currentUser.removeClass('active');
  }

  if (!$('.popup.active').length) {
    enablePageScroll();
  }
}

togglePopup();
