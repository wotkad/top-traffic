import setCommentInitials from "./../set-comment-initials";

// Отправка ответа
$(document).on("submit", ".messages__form.replied", function (event) {
  event.preventDefault();
  event.stopPropagation();

  let textarea = $(this).find("textarea[name='comment']");
  let newMessageText = textarea.val().trim();
  if (!newMessageText) return;

  let repliedBlock = $(".messages__reply");
  let repliedUser = repliedBlock.find("h3").text().replace(/^Ответить: /, "").trim();

  // Поиск оригинального сообщения, чтобы проверить текст и файлы
  let originalMessage = $(".messages .message").filter(function () {
    return $(this).find(".message__head h3").text().trim() === repliedUser;
  }).last();

  let repliedText = originalMessage.find(".message__author > p").text().trim();
  let hasText = repliedText.length > 0;
  let fileBlock = originalMessage.find(".message__author .messages__files .messages__file").first();
  let hasFiles = fileBlock.length > 0;
  let displayText = "";

  if (hasText) {
    displayText = repliedText;
  } else if (hasFiles) {
    displayText = fileBlock.find(".messages__file__content p").text().trim();
  }

  let repliedTemplate = "";
  if (displayText) {
    if (hasText) {
      // Если есть текст — выводим с иконкой
      repliedTemplate = `
        <div class="message__answered">
          <h3>${repliedUser}</h3>
          <p>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2928 7.77545L8.16618 13.9021C7.41565 14.6527 6.39766 15.0744 5.33621 15.0744C4.27475 15.0744 3.25677 14.6527 2.50621 13.9021C1.75564 13.1516 1.33398 12.1336 1.33398 11.0721C1.33398 10.0107 1.75564 8.99272 2.50621 8.24212L8.63285 2.11546C9.13325 1.61509 9.81192 1.33398 10.5195 1.33398C11.2272 1.33398 11.9058 1.61509 12.4062 2.11546C12.9066 2.61584 13.1877 3.2945 13.1877 4.00213C13.1877 4.70977 12.9066 5.38842 12.4062 5.8888L6.27288 12.0155C6.02269 12.2657 5.68336 12.4062 5.32954 12.4062C4.97572 12.4062 4.6364 12.2657 4.38621 12.0155C4.13602 11.7653 3.99546 11.426 3.99546 11.0721C3.99546 10.7183 4.13602 10.379 4.38621 10.1288L10.0462 4.47546" 
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ${displayText}
          </p>
        </div>`;
    } else {
      // Если текста нет — выводим только название файла без иконки
      repliedTemplate = `
        <div class="message__answered">
          <h3>${repliedUser}</h3>
          <p>${displayText}</p>
        </div>`;
    }
  }


  let newMessage = `
    <div class="message">
      <div class="message__comment">
        <div class="message__avatar"><span style="background-color: #FCEAE4;"></span></div>
        <div class="message__author">
          <div class="message__head">
            <h3>Ваше Имя</h3>
            <div class="message__time">сейчас</div>
          </div>
          ${repliedTemplate}
          <p>${newMessageText}</p>
        </div>
        <div class="message__buttons">
          <button class="button message__button message__reply" type="button" aria-label="button">
            <svg viewBox="0 0 18 18" width="18" height="18">
              <use xlink:href="#other-reply-icon"></use>
            </svg>
          </button>
          <button class="button message__button message__copy" type="button" aria-label="button">
            <svg viewBox="0 0 18 18" width="18" height="18">
              <use xlink:href="#other-copy-icon"></use>
            </svg>
          </button>
          <button class="button message__button message__edit" type="button" aria-label="button">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <use xlink:href="#other-edit-icon"></use>
            </svg>
          </button>
          <button class="button message__button message__delete" type="button" aria-label="button" data-popup-name="delete-comment">
            <svg viewBox="0 0 18 18" width="18" height="18">
              <use xlink:href="#other-trash-icon"></use>
            </svg>
          </button>
        </div>
        <div class="popup" data-popup-name="delete-comment">
          <div class="popup__wrapper" data-scroll-lock-scrollable="">
            <div class="popup__title">Подтвердить действие</div>
            <div class="popup__subtitle">Удалить комментарий?</div>
            <div class="popup__form">
              <div class="popup__buttons">
                <button class="button button-base" type="button" aria-label="button" data-popup-name="delete-comment"><span>Нет</span></button>
                <button class="button button-confirm message__remove" type="button" aria-label="button" data-popup-name="delete-comment"><span>Да</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Добавляем сообщение в контейнер .messages
  let messagesContainer = $(".messages");
  if (messagesContainer.length) {
    messagesContainer.append(newMessage);
  }

  // Очищаем поле ввода и скрываем блок ответа
  $(".messages__reply").remove();
  $(".messages__files").remove();
  $('.messages__submit').attr('disabled', true);
  textarea.val("");
  $(this).removeClass('replied');
  setCommentInitials();
});
