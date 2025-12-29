import { enablePageScroll, disablePageScroll } from "scroll-lock";

function togglePopup() {
  $(document).on('click', '.button[data-popup-name]', function (e) {
    e.stopPropagation();

    let popupName = $(this).data('popup-name');
    let currentPopup = $('.popup[data-popup-name="' + popupName + '"]');
    let currentPopupBg = $('.popup__bg[data-popup-name="' + popupName + '"]');
    let currentMessage = $(this).closest('.message');
    let currentChatMessage = $(this).closest('.chat-message');
    let currentAuthor = $(this).closest('.chat-message__author');
    let currentUser = $(this).closest('.user');

    $('.message').removeClass('active');
    $('.chat-message').removeClass('active');
    $('.user').removeClass('active');

    if (popupName == 'share-post') {
      $('.popup').removeClass('active');
      $('.popup__bg').removeClass('active');
    }

    if (currentPopup.hasClass('active')) {
      closePopup(currentPopup, currentPopupBg, currentMessage, currentChatMessage, currentUser, currentAuthor);
    } else {
      currentPopup.addClass('active');
      currentPopupBg.addClass('active');
      currentChatMessage.addClass('active');
      currentMessage.addClass('active');
      currentAuthor.addClass('active');
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
      let currentMessage = popup.closest('.message');
      let currentChatMessage = popup.closest('.chat-message');
      let currentAuthor = popup.closest('.chat-message__author');
      let currentUser = popup.closest('.user');
      let popupWrapper = popup.find('.popup__wrapper');
  
      let isExcludedPopup =
        popup.is('[data-popup-name="add-user"]') ||
        popup.is('[data-popup-name="edit-mode"]') ||
        popup.is('[data-popup-name="admin-edit-mode"]') ||
        popup.is('[data-popup-name="confirm-changes"]') ||
        popup.is('[data-popup-name="check-adaptation"]') ||
        popup.is('[data-popup-name="add-tag"]') ||
        popup.is('[data-popup-name="generate-bill"]') ||
        popup.is('[data-popup-name="create-bill"]') ||
        popup.is('[data-popup-name="add-channels"]') ||
        popup.is('[data-popup-name="add-channel"]');
  
      if (!isExcludedPopup) {
        if (
          !popupWrapper.is(e.target) && !popupWrapper.has(e.target).length &&
          !$('.daterangepicker').is(e.target) && !$('.daterangepicker').has(e.target).length
        ) {
          closePopup(popup, popup.prev());
          currentMessage.removeClass('active');
          currentChatMessage.removeClass('active');
          currentAuthor.removeClass('active');
          currentUser.removeClass('active');
        }
      }
    });
  });
  
}

function closePopup(popup, popupBg, currentMessage, currentChatMessage, currentUser, currentAuthor) {
  popup.removeClass('active');
  popupBg.removeClass('active');

  if (currentChatMessage && currentChatMessage.length) {
    currentChatMessage.removeClass('active');
  }
  
  if (currentMessage && currentMessage.length) {
    currentMessage.removeClass('active');
  }

  if (currentAuthor && currentAuthor.length) {
    currentAuthor.removeClass('active');
  }

  if (currentUser && currentUser.length) {
    currentUser.removeClass('active');
  }

  if (!$('.popup.active').length) {
    enablePageScroll();
  }
}

togglePopup();
