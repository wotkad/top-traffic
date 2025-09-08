import { applyDefaultTablePadding, applyFixedColsPadding } from '../../base/common/set-td-padding';

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

    applyFixedColsPadding();
    applyDefaultTablePadding();
  });

  // Клик по общей кнопке
  $toggleAll.on("click", function () {
    let allChecked = $groups.find(".advertising-group__toggle input:checked").length === $groups.length;

    if (!allChecked) {
      // Открыть все
      $groups.addClass("active").find(".advertising-group__toggle input").prop("checked", true);
      $(this).addClass("active");
    } else {
      // Закрыть все
      $groups.removeClass("active").find(".advertising-group__toggle input").prop("checked", false);
      $(this).removeClass("active");
    }

    applyFixedColsPadding();
    applyDefaultTablePadding();
  });
}

toggleAdvertisingGroup();
