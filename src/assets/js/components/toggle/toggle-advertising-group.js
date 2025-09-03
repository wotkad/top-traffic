function toggleAdvertisingGroup() {
  const $toggleAll = $(".heading__toggle");
  const $groups = $(".advertising-group");

  // Клик по отдельной галочке
  $(document).on("change", ".advertising-group__toggle input[type='checkbox']", function () {
    let $row = $(this).closest(".advertising-group");
    $row.toggleClass("active", $(this).is(":checked"));

    // Проверяем состояние всех групп
    if ($groups.length && $groups.find(".advertising-group__toggle input:checked").length === $groups.length) {
      $toggleAll.addClass("active");
    } else {
      $toggleAll.removeClass("active");
    }
  });

  // Клик по общей кнопке
  $toggleAll.on("click", function () {
    let allChecked = $groups.find(".advertising-group__toggle input:checked").length === $groups.length;

    if (!allChecked) {
      // Открыть все
      $groups.addClass("active").find(".advertising-group__toggle input").prop("checked", true);
      $(this).addClass("active");
    } else {
      // Нужно дважды нажать, чтобы закрыть все
      if ($(this).data("closing")) {
        $groups.removeClass("active").find(".advertising-group__toggle input").prop("checked", false);
        $(this).removeClass("active").removeData("closing");
      } else {
        // Первый клик — ставим флаг
        $(this).data("closing", true);
        setTimeout(() => {
          $(this).removeData("closing");
        }, 800); // в течение 800 мс второй клик закроет все
      }
    }
  });
}
toggleAdvertisingGroup();