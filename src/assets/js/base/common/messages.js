import setCommentInitials from "./set-comment-initials";

function messages() {
  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

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

  // Функция получения текущей даты и времени
  function getFormattedDate() {
    let now = new Date();
    let day = now.getDate().toString().padStart(2, "0");
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let year = now.getFullYear();
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");

    return `${day}.${month}.${year} в ${hours}:${minutes}`;
  }

  // Открытие редактирования сообщения
  $(document).on("click", ".message__edit", function () {
    let parent = $(this).closest(".message");
    let messageText = parent.find(".message__author > p").text(); // Получаем текст сообщения
    let messageId = generateId();
    let form = $('.messages__form');
    form.addClass('edited');

    // Удаляем предыдущий блок редактирования, если он был
    $(".messages__edit").remove();

    // Добавляем ID текущему сообщению
    parent.attr("data-edit-id", messageId);

    // Создаем шаблон редактирования
    let editTemplate = `
      <div class="messages__edit">
        <div class="messages__icon">
          <svg viewBox="0 0 18 18" width="18" height="18">
            <use xlink:href="#other-edit-icon"></use>
          </svg>
        </div>
        <div class="message__answered">
          <h3>Редактирование</h3>
          <p>${messageText}</p>
        </div>
      </div>
    `;

    // Вставляем шаблон перед формой
    $(".messages__footer .messages__form").before(editTemplate);

    // Заполняем textarea текстом сообщения
    $(".messages__footer textarea[name='comment']").val(messageText).focus();
  });

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
  });

  // Открытие формы ответа
  $(document).on("click", ".message__reply", function () {
    let parent = $(this).closest(".message");

    let repliedUser = parent.find(".message__head h3").text().trim();
    let repliedText = parent.find(".message__author > p").text().trim();

    let form = $('.messages__form');
    form.addClass('replied');

    let replyTemplate = `
      <div class="messages__reply">
        <div class="messages__icon">
          <svg viewBox="0 0 18 18" width="18" height="18">
            <use xlink:href="#other-reply-icon"></use>
          </svg>
        </div>
        <div class="message__answered">
          <h3>${repliedUser}</h3>
          <p>${repliedText}</p>
        </div>
      </div>
    `;

    $(".messages__footer .messages__form").before(replyTemplate);
    $(".messages__footer textarea[name='comment']").focus();
  });

  // Отправка ответа
  $(document).on("submit", ".messages__form.replied", function (event) {
    event.preventDefault();
    event.stopPropagation();
  
    let textarea = $(this).find("textarea[name='comment']");
    let newMessageText = textarea.val().trim();
    if (!newMessageText) return;
  
    let repliedBlock = $(".messages__reply");
    let repliedUser = repliedBlock.find("h3").text();
    let repliedText = repliedBlock.find("p").text();
  
    let newMessage = `
      <div class="message">
        <div class="message__comment">
          <div class="message__avatar"><span style="background-color: #FCEAE4;"></span></div>
          <div class="message__author">
            <div class="message__head">
              <h3>Ваше Имя</h3>
              <div class="message__time">сейчас</div>
            </div>
            <div class="message__answered">
              <h3>${repliedUser}</h3>
              <p>${repliedText}</p>
            </div>
            <p>${newMessageText}</p>
          </div>
          <div class="dropdown dropdown-comment">
            <div class="dropdown__container">
              <div class="dropdown__button">
                <button class="button button-icon sm dropdown__icon" type="button">
                  <svg viewBox="0 0 10 6" width="10" height="6">
                    <use xlink:href="#other-angle-down-icon"></use>
                  </svg>
                </button>
              </div>
              <div class="dropdown__list">
                <button class="button button-with-icon-full sm message__reply" type="button">
                  <svg viewBox="0 0 18 18" width="18" height="18">
                    <use xlink:href="#other-reply-icon"></use>
                  </svg>
                  <span>Ответить</span>
                </button>
                <button class="button button-with-icon-full sm message__edit" type="button">
                  <svg viewBox="0 0 16 16" width="16" height="16">
                    <use xlink:href="#other-edit-icon"></use>
                  </svg>
                  <span>Редактировать</span>
                </button>
                <button class="button button-with-icon-full sm message__delete" type="button">
                  <svg viewBox="0 0 18 18" width="18" height="18">
                    <use xlink:href="#other-trash-icon"></use>
                  </svg>
                  <span>Удалить</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  
    // Добавляем сообщение в контейнер .messages
    let messagesContainer = $(".messages");
    if (messagesContainer.length) {
      messagesContainer.append(newMessage);
    }
  
    // Очищаем поле ввода и скрываем блок ответа
    $(".messages__reply").remove();
    textarea.val("");
    $(this).removeClass('replied');
    setCommentInitials();
  });

  // Обработчик отмены редактирования
  $(document).on("click", ".messages__cancel", function () {
    $(".messages__edit").remove();
    $(".messages__reply").remove();
    let form = $('.messages__form');
    form.removeClass('edited');
    form.removeClass('replied');
    $(this).closest(".message").removeAttr('data-edit-id');
    $(this).closest(".messages__form").find("textarea[name='comment']").val("");
  });

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  }

  function getVideoDuration(file, callback) {
    let video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = function () {
      let minutes = Math.floor(video.duration / 60);
      let seconds = Math.floor(video.duration % 60);
      callback(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    };
    video.src = URL.createObjectURL(file);
  }

  function generateThumbnail(file, callback) {
    let video = document.createElement("video");
    video.preload = "metadata";
    video.src = URL.createObjectURL(file);
    video.muted = true; // Отключаем звук (важно для работы в браузерах)
    video.playsInline = true;

    video.onloadedmetadata = function () {
        video.currentTime = 1; // Берем кадр на 1-й секунде
    };

    video.onseeked = function () {
        let canvas = document.createElement("canvas");
        canvas.width = video.videoWidth / 2;
        canvas.height = video.videoHeight / 2;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        callback(canvas.toDataURL("image/png")); // Возвращаем data URL
    };
  }

  function createFileElement(file, progress) {
    let fileType = file.type.split("/")[0];
    let fileSize = formatFileSize(file.size);
    let fileName = file.name;

    let fileTemplate = $(`
      <div class="messages__file ${fileType === "image" || fileType === "video" ? "messages__file-image" : "messages__file-file"}">
        <a href="${fileName}" download></a>
        ${fileType === "image" || fileType === "video" ? `
        <img src="" alt="file">
        <button type="button" class="messages__file__icon messages__file__icon-close">
          <svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg>
          <svg class="file-loading" width="48" height="48" viewBox="-6 -6 60 60">
            <circle r="14" cx="24" cy="24" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                    stroke-dashoffset="${progress}" stroke-dasharray="87.92px" fill="transparent"></circle>
          </svg>
        </button>
        <button type="button" class="messages__file__remove">
          <svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg>
        </button>
        ` : `
        <div class="messages__file__content">
          <div class="messages__file-left">
            <button type="button" class="messages__file__icon messages__file__icon-close">
              <svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg>
              <svg class="file-loading" width="48" height="48" viewBox="-6 -6 60 60">
                <circle r="14" cx="24" cy="24" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-dashoffset="${progress}" stroke-dasharray="87.92px" fill="transparent"></circle>
              </svg>
            </button>
            <button type="button" class="messages__file__icon messages__file__icon-file">
              <svg class="messages__file__icon-file" viewBox="0 0 10 12" width="10" height="12"><use xlink:href="#other-file-icon"></use></svg>
            </button>
          </div>
          <div class="messages__file-right">
            <h3>${fileName}</h3>
            <span>${fileSize}</span>
          </div>
          <button type="button" class="messages__file__remove">
            <svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg>
          </button>
        </div>
        `}
        ${fileType === "video" ? `<div class="messages__file__duration"></div>` : ""}
      </div>
    `);

    if (fileType === "image") {
      let reader = new FileReader();
      reader.onload = function (e) {
        fileTemplate.find("img").attr("src", e.target.result);
      };
      reader.readAsDataURL(file);
    } else if (fileType === "video") {
      generateThumbnail(file, function (thumbnail) {
        fileTemplate.find("img").attr("src", thumbnail);
      });
      getVideoDuration(file, function (duration) {
        fileTemplate.find(".messages__file__duration").text(duration);
      });
    }

    return fileTemplate;
  }

  function simulateUpload(fileElement) {
    let startTime = performance.now();
    
    function update() {
        let elapsed = performance.now() - startTime;
        let percentage = Math.min(elapsed / 300, 1); // Ограничиваем максимум 100%
        let newProgress = 88 * (1 - percentage); // Прогресс от 88 до 0
        
        fileElement.find("circle").attr("stroke-dashoffset", newProgress);
        
        if (percentage < 1) {
            requestAnimationFrame(update);
        } else {
            fileElement.addClass("loaded");
            checkAllFilesLoaded();
        }
    }
    
    requestAnimationFrame(update);
  }

  $(document).on("input", "input[type='file']", function (event) {
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
    }
  });

  // Проверяем, загружены ли все файлы
  function checkAllFilesLoaded() {
    let allLoaded = $(".messages__file").length === $(".messages__file.loaded").length;
    $(".messages__submit").prop("disabled", !allLoaded);
  }

  $(document).on("click", ".messages__file__remove, .messages__file__icon-close", function () {
    $(this).closest(".messages__file").remove();
    $(".messages__bottom .messages__files").remove();
  });

  $(document).on("submit", $(".messages__form"), function (event) {
    event.preventDefault();
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
      <div class="dropdown dropdown-comment">
        <div class="dropdown__container">
          <div class="dropdown__button">
            <button class="button button-icon sm dropdown__icon" type="button">
              <svg viewBox="0 0 10 6" width="10" height="6">
                <use xlink:href="#other-angle-down-icon"></use>
              </svg>
            </button>
          </div>
          <div class="dropdown__list">
            <button class="button button-with-icon-full sm message__reply" type="button">
              <svg viewBox="0 0 18 18" width="18" height="18">
                <use xlink:href="#other-reply-icon"></use>
              </svg>
              <span>Ответить</span>
            </button>
            <button class="button button-with-icon-full sm message__copy" type="button">
              <svg viewBox="0 0 18 18" width="18" height="18">
                <use xlink:href="#other-copy-icon"></use>
              </svg>
              <span>Копировать</span>
            </button>
            <button class="button button-with-icon-full sm message__edit" type="button">
              <svg viewBox="0 0 16 16" width="16" height="16">
                <use xlink:href="#other-edit-icon"></use>
              </svg>
              <span>Редактировать</span>
            </button>
            <button class="button button-with-icon-full sm message__delete" type="button" data-popup-name="delete-comment">
              <svg viewBox="0 0 18 18" width="18" height="18">
                <use xlink:href="#other-trash-icon"></use>
              </svg>
              <span>Удалить</span>
            </button>
          </div>
        </div>
      </div>
    `);

    // Переносим файлы в новое сообщение
    if (filesContainer.length) {
        let clonedFiles = $('<div class="messages__files"></div>');
        
        filesContainer.find(".messages__file").each(function () {
            let fileClone = $(this).clone();
            
            // Восстанавливаем src изображений
            let img = $(this).find("img");
            if (img.length) {
                let src = img.attr("src");
                fileClone.find("img").attr("src", src);
            }

            clonedFiles.append(fileClone);
        });

        newMessage.append(clonedFiles);
        
        // Удаляем старый контейнер с файлами
        filesContainer.remove();
    }

    $(".messages").append(newMessage);
    $(".messages__upload textarea[name='comment']").val(""); // Очищаем поле ввода
    $(".messages__upload textarea[name='comment']").attr("required", true);
    setCommentInitials();
  });

  $(document).on("click", ".message__copy", function () {
    let text = $(this).closest(".message").find(".message__author > p").text().trim();
    if (text) {
      navigator.clipboard.writeText(text);
    }
  });

}

messages();
