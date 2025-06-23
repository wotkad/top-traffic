import generateId from "./generate-id";

function tableAttachmentFile() {
// При выборе файла
$(document).on("change", ".table__attachedfile input[type='file']", function () {
    let parent = $(this).closest(".table__attachedfile");
    let uniqueId = parent.attr("data-file-id") || generateId();
    parent.attr("data-file-id", uniqueId);

    let file = this.files[0];
    if (file) {
        parent.addClass("filled");
        parent.append(`
            <a target="_blank" href="${file.name}"></a>
        `)
    }
});

// При клике на "Заменить файл"
// $(document).on("click", ".table__attachedfile__edit", function () {
//     let parent = $(this).closest(".table__attachedfile");
//     parent.find("input[type='file']").trigger("click");
// });

// Перед открытием попапа удаления — присваиваем ID
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
    linkedParent.find("input[type='file']").val(""); // Очищаем файл
    linkedParent.removeAttr("data-file-id"); // Убираем ID
    linkedParent.removeClass("filled"); // Убираем класс
    linkedParent.find('a').remove();
    }

    $(".popup[data-popup-name='delete-attachedfile']").removeAttr("data-delete-id");
});
}

tableAttachmentFile();
