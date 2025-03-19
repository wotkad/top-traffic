import getFormattedDate from "./get-formatted-date";

// Обработчик отправки формы редактирования
$(document).on("submit", ".messages__form.edited", function (event) {
  event.preventDefault();
  event.stopPropagation();

  let newMessageText = $(this).find("textarea[name='comment']").val().trim();
  if (!newMessageText) return; // Если текст пустой, не обновляем

  let editId = $(".message[data-edit-id]").attr("data-edit-id");
  let messageElement = $(`.message[data-edit-id='${editId}']`);
  
  // Обновляем текст в сообщении
  messageElement.find(".message__author > p").text(newMessageText);

  let timeElement = messageElement.find(".message__time");
  let oldText = timeElement.contents().filter(function() {
    return this.nodeType === 3; // Получаем текстовый узел (без <span>)
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
  $(this).closest(".message").removeAttr('data-edit-id');
  // Очищаем и скрываем блок редактирования
  $(".messages__edit").remove();
  $(this).find("textarea[name='comment']").val("");
  $(this).removeClass('edited');
  $('.messages__submit').prop('disabled', true);
});