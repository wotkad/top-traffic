import { enablePageScroll } from "scroll-lock";

function toggleConfirmAdmin() {
  // Убираем класс error при вводе в инпуты
  $('.popup[data-popup-name="admin-edit-mode"] input').on('input', function() {
    if ($(this).val().trim() !== '') {
      $(this).removeClass('error');
    }
  });

  $('.admin-edit-mode-save').on('click', function() {
    const popup = $(this).closest('.popup[data-popup-name="admin-edit-mode"]');
    const inputs = popup.find('input');
    let hasEmptyFields = false;
    
    // Проверяем все инпуты на заполненность
    inputs.each(function() {
      if ($(this).val().trim() === '') {
        $(this).addClass('error');
        hasEmptyFields = true;
      }
    });
    
    // Если есть пустые поля - не показываем попап подтверждения
    if (hasEmptyFields) {
      return false;
    }
    
    popup.find('.popup__save').addClass('active');

    let timer = 0;
    timer = setTimeout(function() {
      clearTimeout(timer);
        popup.find('.popup__save').removeClass('active');
    }, 3000);
  });

  $('.admin-edit-mode-cancel').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').addClass('active');
    $(this).closest('.popup').find('.popup__apply-nosave').addClass('active');
  });

  $('.popup-admin-edit-mode-cancel').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
    $(this).closest('.popup').find('.popup__apply-nosave').removeClass('active');
    $(this).closest('.popup').find('.popup__apply-confirm').removeClass('active');
  });

  $('.popup-admin-edit-mode-nosave').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
    $(this).closest('.popup').find('.popup__apply-nosave').removeClass('active');
    $('.popup[data-popup-name="admin-edit-mode"]').removeClass('active');
    $('.popup__bg[data-popup-name="admin-edit-mode"]').removeClass('active');
    enablePageScroll();
  });

  $('.popup-admin-edit-mode-save').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
    $(this).closest('.popup').find('.popup__apply-nosave').removeClass('active');
    $('.popup[data-popup-name="admin-edit-mode"]').removeClass('active');
    $('.popup__bg[data-popup-name="admin-edit-mode"]').removeClass('active');
    enablePageScroll();
  });
}
toggleConfirmAdmin();