import getFormattedDate from "./get-formatted-date";

$(document).on("submit", ".chat__form.edited", function (event) {
  event.preventDefault();
  let form = $(this);
  let newMessageText = form.find("textarea[name='comment']").val().trim();
  
  // Находим конкретное сообщение для редактирования
  let parentToEdit = $(".chat-message__author[data-edit-id]");
  if (!parentToEdit.length) return;
  
  let editId = parentToEdit.attr("data-edit-id");
  let messageElement = parentToEdit.closest(".chat-message");
  let authorWrapper = parentToEdit.find(".chat-message__author__wrapper");
  
  // Обновляем текст сообщения
  let textBlock = authorWrapper.find("> p");
  if (newMessageText) {
    if (textBlock.length) {
      textBlock.text(newMessageText);
    } else {
      authorWrapper.append(`<p>${newMessageText}</p>`);
    }
    
    // Добавляем или обновляем метку "изменено"
    let changedSpan = authorWrapper.find(".chat-message__changed");
    if (!changedSpan.length) {
      authorWrapper.find("> p").append('<span class="chat-message__changed">изменено</span>');
    }
  } else if (textBlock.length) {
    textBlock.remove();
    authorWrapper.find(".chat-message__changed").remove();
  }
  
  // Обновляем время редактирования только для текущего автора
  let timeElement = parentToEdit.find(".chat-message__time");
  let newDate = getFormattedDate();
  
  if (timeElement.find("span").length) {
    timeElement.find("span").text(`${newDate} (изменено)`);
  } else {
    timeElement.append(`<span>${newDate} (изменено)</span>`);
  }
  
  // Сброс состояния редактирования
  parentToEdit.removeAttr('data-edit-id');
  $(".chat__edit").remove();
  form.removeClass('edited');
  form.find("textarea[name='comment']").val("");
  $('.chat__submit').prop('disabled', true);
});