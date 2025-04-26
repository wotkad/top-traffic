import setChatInitials from "./../set-chat-initials";

$(document).on("submit", ".chat__form.replied", function (event) {
  event.preventDefault();
  event.stopPropagation();

  let textarea = $(this).find("textarea[name='comment']");
  let newMessageText = textarea.val().trim();
  if (!newMessageText) return;

  let repliedBlock = $(".chat__reply");
  let repliedUser = repliedBlock.find("h3").text().replace(/^Ответить: /, "").trim();
  let repliedText = repliedBlock.find("p").text().trim();

  // Create the replied message section
  let repliedTemplate = '';
  if (repliedText) {
    repliedTemplate = `
      <div class="chat-message__answered">
        <h3>${repliedUser}</h3>
        <p>${repliedText}</p>
      </div>
    `;
  }

  // Create new message HTML
  let newMessage = `
    <div class="chat-message">
      <div class="chat-message__comment">
        <div class="chat-message__avatar">
          <span style="background-color: #FCEAE4;"></span>
        </div>
        <div class="chat-message__authors">
          <div class="chat-message__author">
            <div class="chat-message__author__wrapper">
              <div class="chat-message__head">
                <h3>Максим Амбиндер</h3>
                <div class="chat-message__time">сейчас</div>
              </div>
              ${repliedTemplate}
              <p>${newMessageText}</p>
            </div>
            <div class="dropdown dropdown-comment">
              <div class="dropdown__container">
                <div class="dropdown__button">
                  <button class="button button-icon sm dropdown__icon" type="button" aria-label="button">
                    <svg viewBox="0 0 10 6" width="10" height="6">
                      <use xlink:href="#other-angle-down-icon"></use>
                    </svg>
                  </button>
                </div>
                <div class="dropdown__list">
                  <button class="button button-with-icon-full sm chat-message__reply" type="button" aria-label="button">
                    <svg viewBox="0 0 18 18" width="18" height="18">
                      <use xlink:href="#other-reply-icon"></use>
                    </svg>
                    <span>Ответить</span>
                  </button>
                  <button class="button button-with-icon-full sm chat-message__copy" type="button" aria-label="button">
                    <svg viewBox="0 0 18 18" width="18" height="18">
                      <use xlink:href="#other-copy-icon"></use>
                    </svg>
                    <span>Копировать</span>
                  </button>
                  <button class="button button-with-icon-full sm chat-message__edit" type="button" aria-label="button">
                    <svg viewBox="0 0 16 16" width="16" height="16">
                      <use xlink:href="#other-edit2-icon"></use>
                    </svg>
                    <span>Редактировать</span>
                  </button>
                  <button class="button button-with-icon-full sm chat-message__delete" type="button" aria-label="button" data-popup-name="delete-comment">
                    <svg viewBox="0 0 18 18" width="18" height="18">
                      <use xlink:href="#other-trash-icon"></use>
                    </svg>
                    <span>Удалить</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="popup" data-popup-name="delete-comment">
              <div class="popup__wrapper" data-scroll-lock-scrollable="">
                <div class="popup__title">Подтвердить действие</div>
                <div class="popup__subtitle">Удалить комментарий?</div>
                <div class="popup__form">
                  <div class="popup__buttons">
                    <button class="button button-base" type="button" aria-label="button" data-popup-name="delete-comment">
                      <span>Нет</span>
                    </button>
                    <button class="button button-confirm chat-message__remove" type="button" aria-label="button" data-popup-name="delete-comment">
                      <span>Да</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add new message to chat
  $(".chat__messages").append(newMessage);

  // Clean up
  $(".chat__reply").remove();
  $(".chat__files").remove();
  $('.chat__submit').attr('disabled', true);
  textarea.val("");
  $(this).removeClass('replied');
  
  // Scroll to the new message
  $(".chat__messages").scrollTop($(".chat__messages")[0].scrollHeight);
  
  setChatInitials();
});