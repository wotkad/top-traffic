function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function handleFileUpload() {
  // При выборе файла
  $(document).on("change", ".table__attachedfile input[type='file']", function () {
      let parent = $(this).closest(".table__attachedfile");
      let uniqueId = parent.attr("data-file-id") || generateId();
      parent.attr("data-file-id", uniqueId);

      let file = this.files[0];
      if (file) {
          parent.find(".table__attachedfile__value").text(file.name);
          parent.addClass("filled");
      }
  });

  // При клике на "Заменить файл"
  $(document).on("click", ".table__attachedfile__edit", function () {
      let parent = $(this).closest(".table__attachedfile");
      parent.find("input[type='file']").trigger("click");
  });

  // Перед открытием попапа удаления - обновляем ID
  $(document).on("click", ".table__attachedfile__remove", function () {
      let parent = $(this).closest(".table__attachedfile");
      let fileId = parent.attr("data-file-id");
      
      $(".popup[data-popup-name='delete-attachedfile']").attr("data-delete-id", fileId);
  });

  // Удаление файла при подтверждении
  $(document).on("click", ".popup[data-popup-name='delete-attachedfile'] .table__attachedfile__delete", function () {
      let deleteId = $(".popup[data-popup-name='delete-attachedfile']").attr("data-delete-id");
      let linkedParent = $(`.table__attachedfile[data-file-id='${deleteId}']`);

      if (linkedParent.length) {
          linkedParent.find(".table__attachedfile__value").text("Прикрепить"); // Восстанавливаем текст
          linkedParent.find("input[type='file']").val(""); // Очищаем input file
          linkedParent.removeAttr("data-file-id"); // Убираем ID
          linkedParent.removeClass("filled"); // Убираем класс, если использовался
      }

      $(".popup[data-popup-name='delete-attachedfile']").removeAttr("data-delete-id"); // Очищаем ID из попапа
  });
}

handleFileUpload();
