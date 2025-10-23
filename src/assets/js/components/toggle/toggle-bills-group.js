import { applyDefaultTablePadding, applyFixedColsPadding } from '../../base/common/set-td-padding';

function toggleBillsGroup() {
  const $toggleAll = $(".heading__toggle");
  const $groups = $(".bills-group");
  const fixedRows = new Map(); // для отслеживания открытых групп

  $('.heading__dropdown-base .dropdown__button').on('click', function() {
    $(this).closest('.bills-group.active').toggleClass('layered')
  });

  // Клик по отдельной галочке
  $(document).on("change", ".bills-group__toggle input[type='checkbox']", function () {
    const $row = $(this).closest(".bills-group");
    const subrow = $row.next(".bills-row").find(".bills-group__table");
    const isChecked = $(this).is(":checked");

    $row.toggleClass("active", isChecked);

    if (isChecked) {
      const rowOffset = $row.offset();
      const rowBottom = rowOffset.top + $row.outerHeight();
      const subrowHeight = subrow.outerHeight();

      // Фиксируем подстроку
      subrow.css({
        position: "fixed",
        top: rowBottom + "px",
        left: $('.content-scroll').left + "px",
        zIndex: 100
      });

      // Увеличиваем высоту основной строки
      $row.css("height", $row.outerHeight() + subrowHeight + "px");
      subrow.css("height", subrowHeight + "px");

      // Сохраняем в список фиксированных строк
      fixedRows.set($row[0], { $row, subrow });
    } else {
      // Сбрасываем всё
      subrow.css({
        position: "",
        top: "",
        left: "",
        zIndex: ""
      });
      $row.css("height", "");

      // Удаляем из списка фиксированных строк
      fixedRows.delete($row[0]);
    }

    // Проверяем состояние всех групп
    if ($groups.length && $groups.find(".bills-group__toggle input:checked").length === $groups.length) {
      $toggleAll.addClass("active");
    } else {
      $toggleAll.removeClass("active");
    }

    applyFixedColsPadding();
    applyDefaultTablePadding();
  });

  // Клик по общей кнопке
  $toggleAll.on("click", function () {
    const allChecked = $groups.find(".bills-group__toggle input:checked").length === $groups.length;

    if (!allChecked) {
      // Открыть все
      $groups.addClass("active").find(".bills-group__toggle input").prop("checked", true);
      $(this).addClass("active");
      $groups.each(function () {
        const $row = $(this);
        const subrow = $row.next(".bills-row").find(".bills-group__table");
        const rowOffset = $row.offset();
        const rowBottom = rowOffset.top + $row.outerHeight();
        const subrowHeight = subrow.outerHeight();

        subrow.css({
          position: "fixed",
          top: rowBottom + "px",
          left: $('.content-scroll').left + "px",
          zIndex: 100
        });
        $row.css("height", $row.outerHeight() + subrowHeight + "px");
        fixedRows.set($row[0], { $row, subrow });
      });
    } else {
      // Закрыть все
      $groups.removeClass("active").find(".bills-group__toggle input").prop("checked", false);
      $(this).removeClass("active");
      fixedRows.forEach(({ $row, subrow }) => {
        subrow.css({ position: "", top: "", left: "", zIndex: "" });
        $row.css("height", "");
      });
      fixedRows.clear();
    }

    applyFixedColsPadding();
    applyDefaultTablePadding();
  });

  // 🔄 Обновление позиции при скролле
  $('.wrapper').on("scroll", function () {
    if (!fixedRows.size) return;

    fixedRows.forEach(({ $row, subrow }) => {
      if (!$row.hasClass("active")) return;
      const rowOffset = $row.offset();
      const rowBottom = rowOffset.top + 47;

      subrow.css("top", rowBottom + "px");
    });
  });

}

toggleBillsGroup();
