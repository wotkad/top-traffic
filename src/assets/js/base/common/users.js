import generateId from "./generate-id";

function users() {

  function openDeletePopupUser(parent, popupName) {
    let uniqueId = generateId();
    parent.attr("data-popup-id", uniqueId);

    let popup = $(`.popup[data-popup-name='${popupName}']`);
    popup.find(".button-confirm").attr("data-delete-id", uniqueId);
  }

  // Открытие попапа при клике на "Удалить"
  $(document).on("click", ".users__delete[data-popup-name='delete-user']", function () {
    let parent = $(this).closest(".user");
    openDeletePopupUser(parent, "delete-user");
  });

  // Подтверждение удаления
  $(document).on("click", ".popup[data-popup-name='delete-user'] .button-confirm", function () {
    let deleteId = $(this).attr("data-delete-id");
    let linkedParent = $(`.user[data-popup-id='${deleteId}']`);

    if (linkedParent.length) {
      linkedParent.remove();
    }

    closePopup("delete-user");
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

}

users();
