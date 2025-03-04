function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function openPopupWithData(parent) {
    let uniqueId = generateId(); // Генерируем новый ID всегда
    parent.attr("data-popup-id", uniqueId);
    $(".popup[data-popup-name='add-link']").attr("data-popup-id", uniqueId);

    // Обновляем ID у кнопки удаления внутри попапа
    $(".popup[data-popup-name='add-link'] .table__attachedlink__delete").attr("data-delete-id", uniqueId);

    let existingLink = parent.find(".table__attachedlink__value a");
    let textInput = $(".popup[data-popup-name='add-link']").find("input[name='text']");
    let urlInput = $(".popup[data-popup-name='add-link']").find("input[name='url']");

    if (existingLink.length) {
        textInput.val(existingLink.text());
        urlInput.val(existingLink.attr("href"));
    } else {
        textInput.val("");
        urlInput.val("");
    }
}

function tableAttachmentLink() {
    // Открытие попапа при клике на "Добавить ссылку"
    $(document).on("click", ".table__attachedlink__container.button[data-popup-name='add-link']", function () {
        let parent = $(this).closest(".table__attachedlink");
        openPopupWithData(parent);
    });

    // Открытие попапа при клике на "Изменить"
    $(document).on("click", ".table__attachedlink__edit", function () {
        let parent = $(this).closest(".table__attachedlink");
        openPopupWithData(parent);
    });

    // Перегенерация ID при клике на "Удалить" (чтобы обновлялся перед открытием попапа)
    $(document).on("click", ".table__attachedlink__remove", function () {
        let parent = $(this).closest(".table__attachedlink");
        let newId = generateId();
        parent.attr("data-popup-id", newId);

        // Обновляем ID у кнопки удаления в попапе
        $(".popup[data-popup-name='delete-attachedlink'] .table__attachedlink__delete").attr("data-delete-id", newId);
    });

    // Удаление данных по клику на "Удалить"
    $(document).on("click", ".popup[data-popup-name='delete-attachedlink'] .table__attachedlink__delete", function () {
        let deleteId = $(this).attr("data-delete-id");
        let linkedParent = $(`.table__attachedlink[data-popup-id='${deleteId}']`);

        if (linkedParent.length) {
            linkedParent.find(".table__attachedlink__value").html("Добавить"); // Очищаем текст
            linkedParent.removeAttr("data-popup-id"); // Удаляем ID
            linkedParent.removeClass("filled"); // Убираем стили заполненного состояния
        }

        $(this).removeAttr("data-delete-id"); // Очищаем ID у кнопки удаления
    });

    // Сохранение данных при отправке формы
    $(".popup[data-popup-name='add-link'] form").on("submit", function (event) {
        event.preventDefault();
        let popup = $(this).closest(".popup");
        let popupId = popup.attr("data-popup-id");
        let linkedParent = $(`.table__attachedlink[data-popup-id='${popupId}']`);

        let textValue = popup.find("input[name='text']").val();
        let urlValue = popup.find("input[name='url']").val();

        if (linkedParent.length) {
            linkedParent.find(".table__attachedlink__value").html(`<a href="${urlValue}" target="_blank">${textValue}</a>`);
            linkedParent.addClass("filled");
        }

        $(this).get(0).reset(); // Очищаем форму
        popup.removeAttr("data-popup-id"); // Убираем ID из попапа
    });
}
tableAttachmentLink();
