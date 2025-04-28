import setChatInitials from "./../set-chat-initials";
import setAsideHeight from "./../set-aside-height";

$(document).on("submit", "form.chat__form.default", function(event) {
  event.preventDefault();
  event.stopPropagation();

  // Проверяем, что это именно форма чата
  if (!$(this).hasClass('chat__form') || $(this).hasClass('messages__form')) {
    return;
  }

  let form = $(this);
  let messageText = form.find("textarea[name='comment']").val().trim();
  let filesContainer = $(".chat__bottom .chat__files");
  
  // Проверяем, есть ли текст или файлы для отправки
  if (messageText || (filesContainer.length && filesContainer.find(".chat__file").length > 0)) {
    let newMessage = $(`
      <div class="chat-message">
        <div class="chat-message__comment">
          <div class="chat-message__avatar"><span style="background-color: #FCEAE4;"></span></div>
          <div class="chat-message__authors">
            <div class="chat-message__author">
              <div class="chat-message__author__wrapper">
                <div class="chat-message__head">
                  <h3>Ваше Имя</h3>
                  <div class="chat-message__time">сейчас</div>
                </div>
                ${messageText ? `<p>${messageText}</p>` : ''}
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
                    ${messageText ? `
                      <button class="button button-with-icon-full sm chat-message__copy" type="button" aria-label="button">
                        <svg viewBox="0 0 18 18" width="18" height="18">
                          <use xlink:href="#other-copy-icon"></use>
                        </svg>
                        <span>Копировать</span>
                      </button>
                    ` : ''}
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
    `);

    // Переносим файлы в новое сообщение
    if (filesContainer.length && filesContainer.find(".chat__file").length > 0) {
      let filesWrapper = $('<div class="chat__files"></div>');
      
      // Клонируем весь контейнер с файлами, включая кнопку
      filesContainer.find(".chat__file").each(function() {
        filesWrapper.append($(this).clone());
      });

      // Если есть кнопка "Показать все", клонируем и её
      const showAllBtn = filesContainer.find('.chat__show-all');
      if (showAllBtn.length) {
        filesWrapper.append(showAllBtn.clone());
      }

      // Вставляем файлы после текста сообщения
      newMessage.find(".chat-message__author__wrapper").append(filesWrapper);
    }

    // Добавляем новое сообщение в чат
    $(".chat__messages").append(newMessage);
    
    // Очищаем форму
    form.find("textarea[name='comment']").val("");
    $(".chat__bottom .chat__files").remove();
    $(".chat__submit").prop("disabled", true);
    $(this).removeClass('edited replied').addClass('default');
    
    // Обновляем инициалы (если нужно)
    setChatInitials();
    setAsideHeight();
    $(".chat__messages").scrollTop($(".chat__messages")[0].scrollHeight);
  }
});