function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function tableInputFile() {
  $(document).on("change", "input[type='file']", function () {
    let fileName = this.files[0]?.name || "";
    let $label = $(this).closest("label.table__file");

    // Добавляем класс "filled"
    $label.addClass("filled");

    // Присваиваем ID, если его нет
    if (!$label.attr("data-file-id")) {
      $label.attr("data-file-id", generateId());
    }

    // Обновляем текст с именем файла
    $label.find(".table__file__value").text(fileName);
  });

  // При клике на иконку удаления (открывает попап)
  $(document).on("click", ".table__file__remove", function () {
    let $label = $(this).closest("label.table__file");
    let fileId = $label.attr("data-file-id");

    if (fileId) {
      // Присваиваем id кнопке подтверждения в попапе
      $(".table__file__delete").attr("data-file-id", fileId);
    }
  });

  // При подтверждении удаления (нажатие на кнопку в попапе)
  $(document).on("click", ".table__file__delete", function () {
    let fileId = $(this).attr("data-file-id");

    if (fileId) {
      // Находим нужный label
      let $label = $(`label.table__file[data-file-id="${fileId}"]`);
      let $input = $label.find("input[type='file']");

      if ($label.length) {
        // Очищаем input
        $input.val("");

        // Убираем текст
        $label.find(".table__file__value").text("");

        // Убираем класс filled
        $label.removeClass("filled");

        // Удаляем data-file-id у label и кнопки
        $label.removeAttr("data-file-id");
        $(this).removeAttr("data-file-id");
      }
    }
  });
}

tableInputFile();
