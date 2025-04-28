import getFormattedDate from "./get-formatted-date";
import setAsideHeight from "./../set-aside-height";

$(document).on("submit", ".chat__form.edited", function (event) {
  event.preventDefault();
  event.stopPropagation();

  let form = $(this);
  let newMessageText = form.find("textarea[name='comment']").val().trim();
  
  // Находим редактируемое сообщение
  let parentToEdit = $(".chat-message__author[data-edit-id]");
  if (!parentToEdit.length) return;
  
  let editId = parentToEdit.attr("data-edit-id");
  let messageElement = parentToEdit.closest(".chat-message");
  let authorWrapper = parentToEdit.find(".chat-message__author__wrapper");
  let textBlock = authorWrapper.find("> p");
  let hadTextInitially = textBlock.length > 0;
  let timeElement = parentToEdit.find(".chat-message__time");
  let oldTimeText = timeElement.text().trim();
  let newDate = getFormattedDate();

  // Обновляем текст сообщения
  if (newMessageText) {
    if (hadTextInitially) {
      textBlock.text(newMessageText);
    } else {
      authorWrapper.append(`<p>${newMessageText}</p>`);
    }
    
    // Добавляем кнопку "Копировать", если текст появился впервые
    if (!hadTextInitially && newMessageText.length > 0) {
      let buttonsBlock = parentToEdit.find(".dropdown-comment .dropdown__list");
      if (buttonsBlock.length && buttonsBlock.find(".chat-message__copy").length === 0) {
        let copyButton = `
          <button class="button button-with-icon-full sm chat-message__copy" type="button" aria-label="button">
            <svg viewBox="0 0 18 18" width="18" height="18">
              <use xlink:href="#other-copy-icon"></use>
            </svg>
            <span>Копировать</span>
          </button>
        `;
        buttonsBlock.find(".chat-message__reply").after(copyButton);
      }
    }
  } else if (textBlock.length) {
    textBlock.remove();
  }

  // Обновляем время и добавляем отметку "изменено"
  if (!oldTimeText.includes("(изменено)")) {
    // Если это первое изменение
    let timeParts = oldTimeText.split(' ');
    let oldTime = timeParts.pop(); // Извлекаем время (12:03)
    timeElement.html(`(изменено) ${oldTime} <span class="chat-message__changed">${newDate}</span>`);
  } else {
    // Если сообщение уже редактировалось ранее
    let existingChangedSpan = timeElement.find(".chat-message__changed");
    if (existingChangedSpan.length) {
      let oldDate = existingChangedSpan.text().trim();
      existingChangedSpan.text(`${oldDate} (${newDate})`);
    } else {
      timeElement.append(` <span class="chat-message__changed">${newDate}</span>`);
    }
  }

  // Сброс состояния редактирования
  $(".chat__edit").remove();
  $(".chat__bottom .chat__files").remove();
  parentToEdit.removeAttr('data-edit-id');
  form.removeClass('edited').addClass('default');
  form.find("textarea[name='comment']").val("");
  $('.chat__submit').prop('disabled', true);

  setAsideHeight();
  $(".chat__messages").scrollTop($(".chat__messages")[0].scrollHeight);
});