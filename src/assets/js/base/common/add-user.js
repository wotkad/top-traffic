function addUser() {
  let $textarea = $('.popup__textarea');
  let $placeholder = $('.popup__placeholder');
  let $popupButton = $('.popup[data-popup-name="add-user"] .popup__buttons button');
  let typingTimeout;

  function togglePopupButton() {
    if ($('.popup__email').length > 0) {
      $popupButton.removeAttr('disabled');
    } else {
      $popupButton.attr('disabled', 'disabled');
    }
  }

  $textarea.on('focus', function() {
    if ($('.popup__email').length > 0 || $textarea.text().length > 0) {
      $placeholder.hide();
    } else {
      $placeholder.show();;
    }
  });

  $textarea.on('input', function() {
    if ($('.popup__email').length > 0 && $textarea.text().length > 0) {
      $popupButton.removeAttr('disabled');
    } else {
      $popupButton.attr('disabled', 'disabled');
    }

    let content = $textarea.text().trim();
    
    // Ожидание окончания ввода почты с задержкой
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(function() {
      processEmails($textarea);
    }, 500);

    if (content === '') {
      $placeholder.show();
    } else {
      $placeholder.hide();
    }
    removeEmptyEmails($textarea);
  });

  function removeEmptyEmails($textarea) {
    $textarea.find('.popup__email').each(function() {
      let $emailSpan = $(this).find('span');
      if ($emailSpan.html().trim() === '<br>') {
        $(this).remove();
      }
    });
  }

  function processEmails($textarea) {
    let content = $textarea.text().trim();
    let emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(?=\s|$)/g;
    let matches = content.match(emailPattern);

    if (matches) {
      matches.forEach(email => {
        if ($textarea.find(`.popup__email:contains('${email}')`).length === 0) {
          let emailHtml = `<div class="popup__email"><span contenteditable="true">${email}</span>
            <button class="button button-close" type="button" aria-label="close">
                <svg viewBox="0 0 9 9" width="9" height="9">
                    <use xlink:href="#other-close-icon"></use>
                </svg>
            </button>
          </div> `;
          
          let newHtml = $textarea.html().replace(email, emailHtml);
          $textarea.html(newHtml);
          placeCursorAtEnd($textarea[0]);
          togglePopupButton();
        }
      });
    }
  }

  $(document).on('click', '.button-close', function() {
    let $email = $(this).parent('.popup__email');
    $email.remove();

    // Убираем пустые элементы после удаления почты
    if ($textarea.find('.popup__email').length === 0) {
      $textarea.html('');
    }

    placeCursorAtEnd($textarea[0]);
    togglePopupButton();
  });

  // Остановим переход на новую строку
  $textarea.on('keydown', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault(); // Останавливаем создание новой строки
    }
  });

  function placeCursorAtEnd(el) {
      let range = document.createRange();
      let sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
  }

  $('.popup[data-popup-name="add-user"] .popup__wrapper .popup__close .button').on('click', function() {
    let $email = $('.popup__email');
    $email.remove();

    togglePopupButton();
  });
}

addUser();
