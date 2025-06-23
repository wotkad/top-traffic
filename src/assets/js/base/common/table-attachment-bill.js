import generateId from "./generate-id";

function clearAttachment($label) {
  let $input = $label.find(".table__attachedbill input[type='file']");

  if ($label.length) {
    // Очищаем input
    $input.val("");

    // Убираем текст
    $label.find(".table__attachedbill__value").text("");

    // Убираем класс filled
    $label.removeClass("filled");

    // Удаляем data-file-id
    $label.removeAttr("data-file-id");
  }
}

function tableAttachmentBill() {
  $(document).on("change", ".table__attachedbill input[type='file']", function () {
    let fileName = this.files[0]?.name || "";
    let $label = $(this).closest("label.table__attachedbill__container");

    if (fileName) {
      // Добавляем класс filled
      $label.addClass("filled");

      // Присваиваем ID, если его нет
      if (!$label.attr("data-file-id")) {
        $label.attr("data-file-id", generateId());
      }

      // Обновляем текст с именем файла
      $label.find(".table__attachedbill__value").text(fileName);
    }

    let timer = 0;

    $('.upload-alert').addClass('active');

    clearTimeout(timer);
    setTimeout(function() {
      $('.upload-alert').removeClass('active');
    }, 8000);

    // Если файл не выбран или имя пустое — очищаем
    if ($label.find(".table__attachedbill__value").text() === "") {
      clearAttachment($label);
    }
  });

  $('.upload-alert__close').on('click', function() {
    $('.upload-alert').removeClass('active');
  });

  // При клике на иконку удаления (открывает попап)
  $(document).on("click", ".table__attachedbill__remove", function () {
    let $label = $(this).closest("label.table__attachedbill__container");
    let fileId = $label.attr("data-file-id");

    if (fileId) {
      // Присваиваем id кнопке подтверждения в попапе
      $(".table__attachedbill__delete").attr("data-file-id", fileId);
    }
  });

  // При подтверждении удаления (нажатие на кнопку в попапе)
  $(document).on("click", ".table__attachedbill__delete", function () {
    let fileId = $(this).attr("data-file-id");

    if (fileId) {
      let $label = $(`label.table__attachedbill__container[data-file-id="${fileId}"]`);
      clearAttachment($label);
      $(this).removeAttr("data-file-id");
    }
  });
}

tableAttachmentBill();
