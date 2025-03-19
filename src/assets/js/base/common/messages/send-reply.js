import setCommentInitials from "./../set-comment-initials";

// Отправка ответа
$(document).on("submit", ".messages__form.replied", function (event) {
  event.preventDefault();
  event.stopPropagation();

  let textarea = $(this).find("textarea[name='comment']");
  let newMessageText = textarea.val().trim();
  if (!newMessageText) return;

  let repliedBlock = $(".messages__reply");
  let repliedUser = repliedBlock.find("h3").text();
  let repliedText = repliedBlock.find("p").text();

  let newMessage = `
    <div class="message">
      <div class="message__comment">
        <div class="message__avatar"><span style="background-color: #FCEAE4;"></span></div>
        <div class="message__author">
          <div class="message__head">
            <h3>Ваше Имя</h3>
            <div class="message__time">сейчас</div>
          </div>
          <div class="message__answered">
            <h3>${repliedUser}</h3>
            <p>${repliedText}</p>
          </div>
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
              <div class="popup__buttons"><button class="button button-base" type="button" aria-label="button" data-popup-name="delete-comment"><span>Нет</span></button><button class="button button-confirm message__remove" type="button" aria-label="button" data-popup-name="delete-comment"><span>Да</span></button></div>
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
  $('.messages__submit').attr('disabled', true);
  textarea.val("");
  $(this).removeClass('replied');
  setCommentInitials();
});