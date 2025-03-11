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

  // Открытие редактирования сообщения
  $(document).on("click", ".message__edit", function () {
    let parent = $(this).closest(".message");
    let messageText = parent.find("p").text(); // Получаем текст сообщения
    let messageId = generateId();

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
  $(document).on("submit", ".messages__footer .messages__form", function (event) {
    event.preventDefault();

    let newMessageText = $(this).find("textarea[name='comment']").val().trim();
    if (!newMessageText) return; // Если текст пустой, не обновляем

    let editId = $(".message[data-edit-id]").attr("data-edit-id");

    // Обновляем текст в сообщении
    $(`.message[data-edit-id='${editId}'] p`).text(newMessageText);

    // Очищаем и скрываем блок редактирования
    $(".messages__edit").remove();
    $(this).find("textarea[name='comment']").val("");
  });

  // Обработчик отправки формы редактирования
  $(document).on("click", ".messages__cancel", function (event) {
    $(".messages__edit").remove();
    $(this).closest('.messages__form').find("textarea[name='comment']").val("");
  });
}

messages();
