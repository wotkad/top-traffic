import { enablePageScroll } from "scroll-lock";

function toggleConfirm() {
  $('.popup-confirm-changes-reset').on('click', function() {
    $('.popup[data-popup-name="edit-mode"]').addClass('active');
    $('.popup__bg[data-popup-name="edit-mode"]').addClass('active');
    $('.popup[data-popup-name="confirm-changes"]').removeClass('active');
    $('.popup__bg[data-popup-name="confirm-changes"]').removeClass('active');
  });
  $('.popup-confirm-changes-cancel').on('click', function() {
    $('.popup[data-popup-name="edit-mode"]').addClass('active');
    $('.popup__bg[data-popup-name="edit-mode"]').addClass('active');
    $('.popup[data-popup-name="confirm-changes"]').removeClass('active');
    $('.popup__bg[data-popup-name="confirm-changes"]').removeClass('active');
  });

  $('.edit-mode-save').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').addClass('active');
    $(this).closest('.popup').find('.popup__apply-confirm').addClass('active');
  });

  $('.edit-mode-cancel').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').addClass('active');
    $(this).closest('.popup').find('.popup__apply-nosave').addClass('active');
  });

  $('.popup-edit-mode-cancel').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
    $(this).closest('.popup').find('.popup__apply-nosave').removeClass('active');
    $(this).closest('.popup').find('.popup__apply-confirm').removeClass('active');
  });

  $('.popup-edit-mode-nosave').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
    $(this).closest('.popup').find('.popup__apply-nosave').removeClass('active');
    $('.popup[data-popup-name="edit-mode"]').removeClass('active');
    $('.popup__bg[data-popup-name="edit-mode"]').removeClass('active');
    enablePageScroll();
  });

  $('.popup-edit-mode-save').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
    $(this).closest('.popup').find('.popup__apply-nosave').removeClass('active');
    $('.popup[data-popup-name="edit-mode"]').removeClass('active');
    $('.popup__bg[data-popup-name="edit-mode"]').removeClass('active');
    enablePageScroll();
  });
}
toggleConfirm();