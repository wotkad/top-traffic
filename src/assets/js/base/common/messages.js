import createFileElement from "./messages/create-file";
import simulateUpload from "./messages/simulate-upload";
import generateId from "./messages/generate-id";

function messages() {

  function openDeletePopupComment(parent, popupName) {
    let uniqueId = generateId();
    parent.attr("data-popup-id", uniqueId);

    let popup = $(`.popup[data-popup-name='${popupName}']`);
    popup.find(".button-confirm").attr("data-delete-id", uniqueId);
  }

  // Открытие попапа при клике на "Удалить"
  $(document).on("click", ".message__delete[data-popup-name='delete-comment']", function () {
    let parent = $(this).closest(".message");
    openDeletePopupComment(parent, "delete-comment");
  });

  // Подтверждение удаления
  $(document).on("click", ".popup[data-popup-name='delete-comment'] .button-confirm", function () {
    let deleteId = $(this).attr("data-delete-id");
    let linkedParent = $(`.message[data-popup-id='${deleteId}']`);

    if (linkedParent.length) {
      linkedParent.remove();
    }

    closePopup("delete-comment");
  });

  // Закрытие попапа по кнопке "Нет"
  $(document).on("click", ".popup .button-base", function () {
    let popupName = $(this).closest(".popup").data("popup-name");
    closePopup(popupName);
  });

  function closePopup(popupName) {
    let popup = $(`.popup[data-popup-name='${popupName}']`);
    popup.find(".button-confirm").removeAttr("data-delete-id");
  }

  $(document).on("click", ".messages__cancel", function () {
    $(".messages__edit").remove();
    $(".messages__reply").remove();
    $('.messages__submit').prop('disabled', true);
    let form = $('.messages__form');
    form.removeClass('edited').removeClass('replied');
    $(this).closest(".message").removeAttr('data-edit-id');
    form.find("textarea[name='comment']").val("");
  });

  $(document).on("input", ".messages__upload input[type='file']", function (event) {
    let files = event.target.files;
    if (!files.length) {
      return;
    }

    let messagesFiles = $('.messages__bottom .messages__files');
    if ($('.messages__bottom .messages__files').length == 0) {
      $(".messages__bottom").prepend('<div class="messages__files"></div>');
      messagesFiles = $(".messages__bottom .messages__files");
    }

    $(".messages__submit").prop("disabled", true);
    
    for (let file of files) {
      let fileElement = createFileElement(file, 88);
      simulateUpload(fileElement);
      messagesFiles.append(fileElement);

      if (files.length) {
        $(".messages__upload textarea[name='comment']").removeAttr("required");
      }
      messagesFiles.append(fileElement);
      handleFileLimit(messagesFiles);
    }
    checkSubmitButtonState();
    $(".messages__footer textarea[name='comment']").focus();
  });

  // Функция проверки состояния кнопки
  function checkSubmitButtonState() {
    const text = $(".messages__form textarea[name='comment']").val().trim();
    const hasText = text.length > 0;
    const hasFiles = $(".messages__bottom .messages__files .messages__file").length > 0;
    const isEdited = $('.messages__form').hasClass('edited');
    const isReplied = $('.messages__form').hasClass('replied');
  
    if (hasText || hasFiles || isEdited || isReplied) {
      $(".messages__submit").attr("disabled", false);
    } else {
      $(".messages__submit").attr("disabled", true);
    }
  }

  $(document).on('click', '.messages__show-all', function () {
    const container = $(this).closest('.messages__files');
    const isExpanded = $(this).text() === 'Скрыть все';
  
    if (isExpanded) {
      // Сворачиваем
      container.find('.messages__file').each(function(index) {
        $(this).toggleClass('hide', index >= 3);
      });
      $(this).text('Показать все');
    } else {
      // Раскрываем
      container.find('.messages__file').removeClass('hide');
      $(this).text('Скрыть все');
    }
  });

  function handleFileLimit(container) {
    const files = container.find('.messages__file');
    const showAllBtnClass = 'messages__show-all';
    let showAllBtn = container.find('.' + showAllBtnClass);
  
    // Проверяем — есть ли кнопка и развернуты ли файлы
    const isExpanded = showAllBtn.length && showAllBtn.text() === 'Скрыть все';
  
    // Удаляем старую кнопку для переотрисовки
    showAllBtn.remove();
  
    if (files.length > 3) {
      if (!isExpanded) {
        // Если НЕ раскрыто — прячем с 4-го
        files.each(function(index) {
          $(this).toggleClass('hide', index >= 3);
        });
      } else {
        // Если раскрыто — показываем все
        files.removeClass('hide');
      }
  
      // Добавляем кнопку в конец контейнера
      const newBtn = $(`<button type="button" class="${showAllBtnClass}">${isExpanded ? 'Скрыть все' : 'Показать все'}</button>`);
      container.append(newBtn);
    } else {
      // Меньше 4 файлов — всегда показываем всё
      files.removeClass('hide');
    }
  }

  // Удаление файла
  $(document).on("click", ".messages__file__remove, .messages__file__icon-close", function () {
    $(this).closest(".messages__file").remove();

    // Если файлов больше нет — удаляем контейнер
    if ($(".messages__bottom .messages__files .messages__file").length === 0) {
      $(".messages__bottom .messages__files").remove();
    }

    checkSubmitButtonState();
    handleFileLimit($('.messages__files'));
  });

  // Отслеживание ввода текста
  $(document).on("input", ".messages__form textarea[name='comment']", function () {
    checkSubmitButtonState();
  });

  $(document).on("click", ".message__copy", function () {
    let text = $(this).closest(".message").find(".message__author > p").text().trim();
    if (text) {
      navigator.clipboard.writeText(text);
    }
  });

}

messages();
