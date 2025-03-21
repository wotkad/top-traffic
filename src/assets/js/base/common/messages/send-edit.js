import getFormattedDate from "./get-formatted-date";

// Обработчик отправки формы редактирования
$(document).on("submit", ".messages__form.edited", function (event) {
  event.preventDefault();
  event.stopPropagation();

  let newMessageText = $(this).find("textarea[name='comment']").val().trim();
  if (!newMessageText) return; // Если текст пустой, не обновляем

  let editId = $(".message[data-edit-id]").attr("data-edit-id");
  let messageElement = $(`.message[data-edit-id='${editId}']`);

  let authorBlock = messageElement.find(".message__author");
  let textBlock = authorBlock.children("p").last();
  let hadTextInitially = textBlock.length > 0;

  // Обновляем или создаём текстовый блок
  if (hadTextInitially) {
    textBlock.text(newMessageText);
  } else {
    authorBlock.append(`<p>${newMessageText}</p>`);
  }

  // === Проверка на появление текста впервые ===
  if (!hadTextInitially && newMessageText.length > 0) {
    let buttonsBlock = messageElement.find(".message__buttons");
    // Проверим, есть ли уже кнопка "Копировать", чтобы не дублировать
    if (buttonsBlock.length && buttonsBlock.find(".message__copy").length === 0) {
      // Создаём кнопку "Копировать"
      let copyButton = `
        <button class="button message__button message__copy" type="button" aria-label="button">
          <svg viewBox="0 0 18 18" width="18" height="18">
            <use xlink:href="#other-copy-icon"></use>
          </svg>
        </button>
      `;
      // Вставляем кнопку сразу после "Ответить"
      buttonsBlock.find(".message__reply").after(copyButton);
    }
  }

  // Работаем с датой и пометкой "изменено"
  let timeElement = messageElement.find(".message__time");
  let oldText = timeElement.contents().filter(function () {
    return this.nodeType === 3;
  }).text().trim();

  let timeSpan = timeElement.find("span");
  let oldDate = timeSpan.text().trim();
  let newDate = getFormattedDate();

  if (!oldText.includes("(изменено)")) {
    timeElement.html(`${oldText} (изменено) <span>${oldDate} (${newDate})</span>`);
  } else {
    let updatedText = oldDate.replace(/\(\d{2}\.\d{2}\.\d{4} в \d{2}:\d{2}\)$/, `(${newDate})`);
    timeSpan.text(updatedText);
  }

  // Сброс редактирования
  $(this).closest(".message").removeAttr('data-edit-id');
  $(".messages__edit").remove();
  $(this).find("textarea[name='comment']").val("");
  $(this).removeClass('edited');
  $('.messages__submit').prop('disabled', true);
});
