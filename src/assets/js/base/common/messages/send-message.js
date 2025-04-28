import setCommentInitials from "./../set-comment-initials";

$(document).on("submit", "form.messages__form.default", function(event) {
  event.preventDefault();
  event.stopPropagation();

  // Проверяем, что это именно форма messages
  if (!$(this).hasClass('messages__form') || $(this).hasClass('chat__form')) {
    return;
  }
  
  if ($("textarea[name='comment']").length > 0) {
    let messageText = $("textarea[name='comment']").val().trim();
    let filesContainer = $(".messages__bottom .messages__files");
    
    let newMessage = $('<div class="message"></div>');

    // Добавляем текст комментария, если он есть
    newMessage.append(`
    <div class="message__comment">
      <div class="message__avatar"><span style="background-color: #FCEAE4;"></span></div>
      <div class="message__author">
        <div class="message__head">
          <h3>Ваше Имя</h3>
          <div class="message__time">сейчас</div>
        </div>
        ${messageText ? `<p>${messageText}</p>` : ''}
      </div>
      <div class="message__buttons">
        <button class="button message__button message__reply" type="button" aria-label="button">
          <svg viewBox="0 0 18 18" width="18" height="18">
            <use xlink:href="#other-reply-icon"></use>
          </svg>
        </button>
        ${messageText ? `
          <button class="button message__button message__copy" type="button" aria-label="button">
            <svg viewBox="0 0 18 18" width="18" height="18">
              <use xlink:href="#other-copy-icon"></use>
            </svg>
          </button>
        ` : ``}
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
    `);

    // Переносим файлы в новое сообщение
    if (filesContainer.length) {
      let clonedFiles = $('<div class="messages__files"></div>');

      filesContainer.find(".messages__file").each(function () {
        let fileClone = $(this).clone();
        let img = $(this).find("img");
        if (img.length) {
          let src = img.attr("src");
          fileClone.find("img").attr("src", src);
        }
        clonedFiles.append(fileClone);
      });

      // Клонируем кнопку "Показать все", если она есть
      let showAllBtn = filesContainer.find('.messages__show-all');
      if (showAllBtn.length) {
        clonedFiles.append(showAllBtn.clone());
      }

      newMessage.find(".message__head").after(clonedFiles);
      filesContainer.remove();
    }

    $(".messages").append(newMessage);
    $(".messages__upload textarea[name='comment']").val(""); // Очищаем поле ввода
    $(".messages__upload textarea[name='comment']").attr("required", true);
    $(this).removeClass('edited replied').addClass('default');
    setCommentInitials();
    $(".messages__submit").prop("disabled", true);
  }
});