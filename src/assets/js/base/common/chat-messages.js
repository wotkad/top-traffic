import createFileElement from "./chat/create-file";
import simulateUpload from "./chat/simulate-upload";
import generateId from "./generate-id";

function chatMessages() {

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
      $(".chat__footer .chat__edit").remove();
      $(".chat__footer .chat__reply").remove();
      $(".chat__footer .chat__files").remove();
      $('.chat__submit').prop('disabled', true);
      let form = $('.chat__form');
      form.removeClass('edited').removeClass('replied');
      $(this).closest(".message").removeAttr('data-edit-id');
      form.find("textarea[name='comment']").val("");
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

  $(document).on("click", ".chat__cancel", function () {
    $(".chat__footer .chat__edit").remove();
    $(".chat__footer .chat__reply").remove();
    $(".chat__footer .chat__files").remove();
    $('.chat__submit').prop('disabled', true);
    let form = $('.chat__form');
    form.removeClass('edited').removeClass('replied');
    $(this).closest(".message").removeAttr('data-edit-id');
    form.find("textarea[name='comment']").val("");
  });

  $(document).on("input", ".chat__upload input[type='file']", function (event) {
    let files = event.target.files;
    if (!files.length) {
      return;
    }

    let chatFiles = $('.chat__bottom .chat__files');
    if ($('.chat__bottom .chat__files').length == 0) {
      $(".chat__bottom").prepend('<div class="chat__files"></div>');
      chatFiles = $(".chat__bottom .chat__files");
    }

    $(".chat__submit").prop("disabled", true);
    
    for (let file of files) {
      let fileElement = createFileElement(file, 88);
      simulateUpload(fileElement);
      chatFiles.append(fileElement);

      if (files.length) {
        $(".chat__upload textarea[name='comment']").removeAttr("required");
      }
      chatFiles.append(fileElement);
      handleFileLimit(chatFiles);
    }
    checkSubmitButtonState();
    $(".chat__footer textarea[name='comment']").focus();
  });

  // Функция проверки состояния кнопки
  function checkSubmitButtonState() {
    const text = $(".chat__form textarea[name='comment']").val().trim();
    const hasText = text.length > 0;
    const hasFiles = $(".chat__bottom .chat__files .chat__file").length > 0;
    const isEdited = $('.chat__form').hasClass('edited');
    const isReplied = $('.chat__form').hasClass('replied');
  
    if (hasText || hasFiles || isEdited || isReplied) {
      $(".chat__submit").attr("disabled", false);
    } else {
      $(".chat__submit").attr("disabled", true);
    }
  }

  $(document).on('click', '.chat__show-all', function () {
    const container = $(this).closest('.chat__files');
    const isExpanded = $(this).text() === 'Скрыть все';
  
    if (isExpanded) {
      // Сворачиваем
      container.find('.chat__file').each(function(index) {
        $(this).toggleClass('hide', index >= 3);
      });
      $(this).text('Показать все');
    } else {
      // Раскрываем
      container.find('.chat__file').removeClass('hide');
      $(this).text('Скрыть все');
    }
  });

  function handleFileLimit(container) {
    const files = container.find('.chat__file');
    const showAllBtnClass = 'chat__show-all';
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
  $(document).on("click", ".chat__file__remove, .chat__file__icon-close", function () {
    let fileContainer = $(this).closest(".chat__files");
    $(this).closest(".chat__file").remove();

    // Если файлов больше нет — удаляем контейнер (только в .chat__bottom)
    if ($(".chat__bottom .chat__files .chat__file").length === 0) {
      $(".chat__bottom .chat__files").remove();
    }

    checkSubmitButtonState();

    // Ограничиваем действие только на .chat__bottom .chat__files
    if (fileContainer.closest(".chat__bottom").length) {
      handleFileLimit(fileContainer);
    }
  });


  // Отслеживание ввода текста
  $(document).on("input", ".chat__form textarea[name='comment']", function () {
    checkSubmitButtonState();
  });

  $(document).on("click", ".message__copy", function () {
    let text = $(this).closest(".message").find(".message__author > p").text().trim();
    if (text) {
      navigator.clipboard.writeText(text);
    }
  });

}

chatMessages();
