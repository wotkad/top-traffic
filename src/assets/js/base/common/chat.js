import setAsideHeight from "./set-aside-height";
import createFileElement from "./chat/create-file";
import simulateUpload from "./chat/simulate-upload";

function chat() {
  let openMessages = $('.chat__conversation');
  let closeMessages = $('.chat__close');
  let pin = $('.chat__pin');
  let container = $('.chat__container');
  let messages = $('.chat__messages');

  closeMessages.on('click', function() {
    container.removeClass('active');
    setAsideHeight();
  });

  openMessages.on('click', function() {
    container.addClass('active');
    pin.removeClass('active');
    setAsideHeight();
    messages.scrollTop(messages[0].scrollHeight);
  });

  // Открытие попапа при клике на "Удалить"
  $(document).on("click", ".chat-message__delete[data-popup-name='delete-comment']", function (e) {
    e.stopPropagation();
    let parent = $(this).closest(".chat-message__author");
    let popup = parent.find(".popup[data-popup-name='delete-comment']");
    
    // Сохраняем ссылку на родительский элемент для удаления
    popup.data('parent-to-remove', parent);
  });

  // Подтверждение удаления
  $(document).on("click", ".popup[data-popup-name='delete-comment'] .button-confirm", function () {
    let popup = $(this).closest(".popup[data-popup-name='delete-comment']");
    let parentToRemove = popup.data('parent-to-remove');

    if (parentToRemove && parentToRemove.length) {
      let authorsContainer = parentToRemove.closest('.chat-message__authors');
      parentToRemove.remove();

      // Если в контейнере больше нет авторов, удаляем всю карточку сообщения
      if (authorsContainer.find('.chat-message__author').length === 0) {
        authorsContainer.closest('.chat-message').remove();
      }

      checkSubmitButtonState();
    }
  });

  // Закрытие попапа при клике вне его
  $(document).on("click", function(e) {
    if (!$(e.target).closest('.popup[data-popup-name="delete-comment"]').length && 
        !$(e.target).closest('.chat-message__delete[data-popup-name="delete-comment"]').length) {
      $(".popup[data-popup-name='delete-comment']").removeClass('active');
    }
  });

  // Остальной код остается без изменений
  $(document).on("click", ".chat__cancel", function () {
    $(".chat__footer .chat__edit").remove();
    $(".chat__footer .chat__reply").remove();
    $(".chat__footer .chat__files").remove();
    $('.chat__submit').prop('disabled', true);
    let form = $('.chat__form');
    form.removeClass('edited').removeClass('replied');
    $(this).closest(".chat-message").removeAttr('data-edit-id');
    form.find("textarea[name='comment']").val("");
    setAsideHeight();
    $(".chat__messages").scrollTop($(".chat__messages")[0].scrollHeight);
  });

  $(document).on("input", ".chat__upload input[type='file']", function (event) {
    let files = event.target.files;
    if (!files.length) {
      return;
    }
  
    let messagesFiles = $('.chat__bottom .chat__files');
    if ($('.chat__bottom .chat__files').length == 0) {
      $(".chat__bottom").prepend('<div class="chat__files"></div>');
      messagesFiles = $(".chat__bottom .chat__files");
    }
  
    $(".chat__submit").prop("disabled", true);
    
    for (let file of files) {
      let fileElement = createFileElement(file, 88);
      simulateUpload(fileElement);
      messagesFiles.append(fileElement);
  
      if (files.length) {
        $(".chat__upload textarea[name='comment']").removeAttr("required");
      }
      handleFileLimit(messagesFiles); // Перенесли вызов после добавления файла
    }
    setAsideHeight();
    messages.scrollTop(messages[0].scrollHeight);
    checkSubmitButtonState();
    $(".chat__footer textarea[name='comment']").focus();
  });

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
      container.find('.chat__file').each(function(index) {
        $(this).toggleClass('hide', index >= 3);
      });
      $(this).text('Показать все');
    } else {
      container.find('.chat__file').removeClass('hide');
      $(this).text('Скрыть все');
    }
    setAsideHeight();
  });

  function handleFileLimit(container) {
    const files = container.find('.chat__file:not(.hide)');
    const showAllBtnClass = 'chat__show-all';
    let showAllBtn = container.find('.' + showAllBtnClass);
  
    // Сохраняем текущее состояние кнопки
    const isExpanded = showAllBtn.length && showAllBtn.text() === 'Скрыть все';
  
    showAllBtn.remove();
  
    if (files.length > 3) {
      if (!isExpanded) {
        files.each(function(index) {
          $(this).toggleClass('hide', index >= 3);
        });
      }
  
      const btnText = isExpanded ? 'Скрыть все' : 'Показать все';
      const newBtn = $(`<button type="button" class="${showAllBtnClass}">${btnText}</button>`);
      container.append(newBtn);
    }
  }

  $(document).on("click", ".chat__file__remove, .chat__file__icon-close", function () {
    let fileContainer = $(this).closest(".chat__files");
    $(this).closest(".chat__file").remove();

    if ($(".chat__bottom .chat__files .chat__file").length === 0) {
      $(".chat__bottom .chat__files").remove();
    }
    setAsideHeight();
    messages.scrollTop(messages[0].scrollHeight);
    checkSubmitButtonState();

    if (fileContainer.closest(".chat__bottom").length) {
      handleFileLimit(fileContainer);
    }
  });

  $(document).on("input", ".chat__form textarea[name='comment']", function () {
    checkSubmitButtonState();
  });

  $(document).on("click", ".chat-message__copy", function () {
    let text = $(this).closest(".chat-message").find(".chat-message__author__wrapper > p").contents()
      .filter(function() { 
        return this.nodeType === 3; // Только текстовые узлы
      }).text().trim();
    if (text) {
      navigator.clipboard.writeText(text);
    }
  });
}

chat();