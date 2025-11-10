import { applyDefaultTablePadding, applyFixedColsPadding } from '../../base/common/set-td-padding';

function toggleBillsGroup() {
  const $toggleMain = $(".heading__toggle-main");
  const $toggleSecondary = $(".heading__toggle-secondary");

  const fixedRows = new Map(); // для отслеживания открытых групп

  let lastDropdownClick = 0;

  $('.selector__container[data-id="campaign-bills"] .heading__dropdown-base .dropdown__button').on('click', function(e) {
    lastDropdownClick = Date.now();
    const $groups = $('.selector__container[data-id="campaign-bills"] .heading__dropdown-base .dropdown__button').closest('.bills-group');
    const $current = $(this).closest('.bills-group');
    if ($current.hasClass('layered')) {
      $current.removeClass('layered');
    } else {
      $groups.removeClass('layered');
      $current.addClass('layered');
    }
  });

  $('.popup[data-popup-name="generate-bill"] .bills-group .status').on('mouseenter', function(e) {
    $(this).closest('.bills-group').addClass('layered');
  });

  $('.popup[data-popup-name="generate-bill"] .bills-group .status').on('mouseleave', function(e) {
    $(this).closest('.bills-group').removeClass('layered');
  });

  $('.popup[data-popup-name="generate-bill"] .bills-group .dropdown__button').on('click', function(e) {
    lastDropdownClick = Date.now();
    const $groups = $('.popup[data-popup-name="generate-bill"] .bills-group .dropdown__button').closest('.bills-group');
    const $current = $(this).closest('.bills-group');
    if ($current.hasClass('layered')) {
      $current.removeClass('layered');
    } else {
      $groups.removeClass('layered');
      $current.addClass('layered');
    }
  });

  $('.popup[data-popup-name="create-bill"] .bills-group .dropdown__button').on('click', function(e) {
    lastDropdownClick = Date.now();
    const $groups = $('.popup[data-popup-name="create-bill"] .bills-group .dropdown__button').closest('.bills-group');
    const $current = $(this).closest('.bills-group');
    if ($current.hasClass('layered')) {
      $current.removeClass('layered');
    } else {
      $groups.removeClass('layered');
      $current.addClass('layered');
    }
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

      $row.css("height", "");

      subrow.css({
        position: "fixed",
        top: rowBottom + "px",
        left: $('.content-scroll').left + "px",
        zIndex: 100
      });

      $row.css("height", $row.outerHeight() + subrowHeight + "px");
      subrow.css("height", subrowHeight + "px");

      fixedRows.set($row[0], { $row, subrow });
    } else {
      subrow.css({ position: "", top: "", left: "", zIndex: "" });
      $row.css("height", "");
      fixedRows.delete($row[0]);
    }
    updatePos();

    applyFixedColsPadding();
    applyDefaultTablePadding();

  });

  // 🟢 Клик по главной кнопке — управляет только таблицей вне попапа
  $toggleMain.on("click", function () {
    const $groups = $(".bills-group").not(".popup .bills-group"); // исключаем попап
    const allChecked = $groups.find(".bills-group__toggle input:checked").length === $groups.length;

    if (!allChecked) {
      $groups.addClass("active").find(".bills-group__toggle input").prop("checked", true);
      $(this).addClass("active");

      $groups.each(function () {
        const $row = $(this);
        const subrow = $row.next(".bills-row").find(".bills-group__table");
        const rowOffset = $row.offset();
        const rowBottom = rowOffset.top + $row.outerHeight();
        const subrowHeight = subrow.outerHeight();

        $row.css("height", "");

        subrow.css({
          position: "fixed",
          top: rowBottom + "px",
          left: $('.content-scroll').left + "px",
          zIndex: 100,
          height: subrowHeight + "px",
        });
        $row.css("height", $row.outerHeight() + subrowHeight + "px");
        fixedRows.set($row[0], { $row, subrow });
      });
    } else {
      $groups.removeClass("active").find(".bills-group__toggle input").prop("checked", false);
      $(this).removeClass("active");

      fixedRows.forEach(({ $row, subrow }) => {
        if ($row.closest('.popup').length) return; // не трогаем попап
        subrow.css({ position: "", top: "", left: "", zIndex: "" });
        $row.css("height", "");
      });
      fixedRows.clear();
    }
    updatePos();

    applyFixedColsPadding();
    applyDefaultTablePadding();
  });

  // 🟣 Клик по второстепенной кнопке — управляет только таблицей в попапе
  $toggleSecondary.on("click", function () {
    const $popup = $('.popup[data-popup-name="generate-bill"]');
    const $groups = $popup.find(".bills-group");
    const allChecked = $groups.find(".bills-group__toggle input:checked").length === $groups.length;

    if (!allChecked) {
      // открыть все
      $groups.addClass("active").find(".bills-group__toggle input").prop("checked", true);
      $(this).addClass("active");

      $groups.each(function () {
        const $row = $(this);
        const subrow = $row.next(".bills-row").find(".bills-group__table");
        const rowOffset = $row.offset();
        const subrowHeight = subrow.outerHeight();

        $row.css("height", ""); // сброс старой высоты

        const rowBottom = rowOffset.top + $row.outerHeight();

        subrow.css({
          position: "fixed",
          top: rowBottom + "px",
          left: $('.content-scroll').left + "px",
          zIndex: 100,
          height: subrowHeight + "px",
        });
        $row.css("height", $row.outerHeight() + subrowHeight + "px");

        fixedRows.set($row[0], { $row, subrow });
      });

    } else {
      // скрыть все
      $groups.removeClass("active").find(".bills-group__toggle input").prop("checked", false);
      $(this).removeClass("active");

      $groups.each(function () {
        const $row = $(this);
        const subrow = $row.next(".bills-row").find(".bills-group__table");

        subrow.css({ position: "", top: "", left: "", zIndex: "", height: "" });
        $row.css("height", "");
        fixedRows.delete($row[0]);
      });
    }

    updatePos();

    applyFixedColsPadding();
    applyDefaultTablePadding();
  });


  // 🔄 Обновление позиции при скролле
  $('.wrapper, .popup[data-popup-name="generate-bill"], .popup[data-popup-name="create-bill"]').on("scroll", function () {
    updatePos();
  });

  function updatePos() {
    if (!fixedRows.size) return;

    fixedRows.forEach(({ $row, subrow }) => {
      if (!$row.hasClass("active")) return;
      const rowOffset = $row.offset();
      const rowBottom = rowOffset.top + 47;
      subrow.css("top", rowBottom + "px");
    });
  }

  // 🧩 Управление состоянием кнопок "Создать счёт"
  let inputs = $('.bills-group').find('.checkbox input');

  inputs.on('change', function() {
    const $group = $(this).closest('.bills-group');
    const $groupButton = $group.find('.heading__dropdown-base .bill-generate');
    const $globalButton = $('.bills-action .bill-generate');

    const $groupButtonRestore = $group.find('.heading__dropdown-base .bill-restore');
    const $globalButtonRestore = $('.bills-action .bill-restore');

    const $groupButtonCancel = $group.find('.heading__dropdown-base .bill-cancel');
    const $globalButtonCancel = $('.bills-action .bill-cancel');

    const $groupButtonAnnul = $group.find('.heading__dropdown-base .bill-annul');
    const $globalButtonAnnul = $('.bills-action .bill-annul');

    if ($group.find('.checkbox input:checked').length > 0) {
      $groupButton.removeClass('disabled');
      $groupButtonRestore.removeClass('disabled');
      $groupButtonCancel.removeClass('disabled');
      $groupButtonAnnul.removeClass('disabled');
    } else {
      $groupButton.addClass('disabled');
      $groupButtonRestore.addClass('disabled');
      $groupButtonCancel.addClass('disabled');
      $groupButtonAnnul.addClass('disabled');
    }

    if ($('.bills-group .checkbox input:checked').length > 0) {
      $globalButton.removeClass('disabled');
      $globalButtonRestore.removeClass('disabled');
      $globalButtonCancel.removeClass('disabled');
      $globalButtonAnnul.removeClass('disabled');
    } else {
      $globalButton.addClass('disabled');
      $globalButtonRestore.addClass('disabled');
      $globalButtonCancel.addClass('disabled');
      $globalButtonAnnul.addClass('disabled');
    }
  });

  $('.popup[data-popup-name="generate-bill"] .popup-cancel').on('click', function() {
    $(this).closest('.popup').find('.popup__apply').removeClass('active');
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
    $('.popup[data-popup-name="generate-bill"]').removeClass('active');
    $('.popup__bg[data-popup-name="generate-bill"]').removeClass('active');
    $(".bills-group .checkbox input[type='checkbox'], .bills-group__toggle input[type='checkbox']").prop("checked", false);
    $('.bill-generate').addClass('disabled');
    $('.bill-restore').addClass('disabled');
    $('.bill-cancel').addClass('disabled');
    $('.bill-annul').addClass('disabled');
    $(".bills-group").removeClass('active');
    $('.bills-group, .bills-group__table').css({ position: "", top: "", left: "", zIndex: "", height: "" });
    $('.heading__toggle-main').removeClass('active');
    $('.heading__toggle-secondary').removeClass('active');
  });

  $('.popup[data-popup-name="generate-bill"] .popup-cancel-bottom').on('click', function() {
    $(this).closest('.popup').find('.popup__apply').removeClass('active');
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
    $('.popup[data-popup-name="generate-bill"]').removeClass('active');
    $('.popup__bg[data-popup-name="generate-bill"]').removeClass('active');
    $(".bills-group .checkbox input[type='checkbox'], .bills-group__toggle input[type='checkbox']").prop("checked", false);
    $('.bill-generate').addClass('disabled');
    $(".bills-group").removeClass('active');
    $('.bills-group, .bills-group__table').css({ position: "", top: "", left: "", zIndex: "", height: "" });
    $('.heading__toggle-main').removeClass('active');
    $('.heading__toggle-secondary').removeClass('active');
  });

  $('.popup[data-popup-name="generate-bill"] .popup-save-bottom').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').addClass('active');
    $(this).closest('.popup').find('.popup__apply-bottom').addClass('active');
  });

  $('.popup[data-popup-name="generate-bill"] .popup-save').on('click', function() {
    $(this).closest('.popup').find('.popup__apply').removeClass('active');
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
    $('.popup[data-popup-name="generate-bill"]').removeClass('active');
    $('.popup__bg[data-popup-name="generate-bill"]').removeClass('active');
    $(".bills-group .checkbox input[type='checkbox'], .bills-group__toggle input[type='checkbox']").prop("checked", false);
    $('.bill-generate').addClass('disabled');
    $(".bills-group").removeClass('active');
    $('.bills-group, .bills-group__table').css({ position: "", top: "", left: "", zIndex: "", height: "" });
    $('.heading__toggle-main').removeClass('active');
    $('.heading__toggle-secondary').removeClass('active');
  });


  $('.popup[data-popup-name="create-bill"] .popup-cancel').on('click', function() {
    $(this).closest('.popup').find('.popup__apply').removeClass('active');
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
    $('.popup[data-popup-name="create-bill"]').removeClass('active');
    $('.popup__bg[data-popup-name="create-bill"]').removeClass('active');
    $(".bills-group .checkbox input[type='checkbox'], .bills-group__toggle input[type='checkbox']").prop("checked", false);
    $('.bill-generate').addClass('disabled');
    $(".bills-group").removeClass('active');
    $('.bills-group, .bills-group__table').css({ position: "", top: "", left: "", zIndex: "", height: "" });
    $('.heading__toggle-main').removeClass('active');
    $('.heading__toggle-secondary').removeClass('active');
  });

  $('.popup[data-popup-name="create-bill"] .popup-cancel-bottom').on('click', function() {
    $(this).closest('.popup').find('.popup__apply').removeClass('active');
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
    $('.popup[data-popup-name="create-bill"]').removeClass('active');
    $('.popup__bg[data-popup-name="create-bill"]').removeClass('active');
    $(".bills-group .checkbox input[type='checkbox'], .bills-group__toggle input[type='checkbox']").prop("checked", false);
    $('.bill-generate').addClass('disabled');
    $(".bills-group").removeClass('active');
    $('.bills-group, .bills-group__table').css({ position: "", top: "", left: "", zIndex: "", height: "" });
    $('.heading__toggle-main').removeClass('active');
    $('.heading__toggle-secondary').removeClass('active');
  });

  $('.popup[data-popup-name="create-bill"] .popup-save-bottom').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').addClass('active');
    $(this).closest('.popup').find('.popup__apply-bottom').addClass('active');
  });

  $('.popup[data-popup-name="create-bill"] .popup-save').on('click', function() {
    $(this).closest('.popup').find('.popup__apply').removeClass('active');
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
    $('.popup[data-popup-name="create-bill"]').removeClass('active');
    $('.popup__bg[data-popup-name="create-bill"]').removeClass('active');
    $(".bills-group .checkbox input[type='checkbox'], .bills-group__toggle input[type='checkbox']").prop("checked", false);
    $('.bill-generate').addClass('disabled');
    $(".bills-group").removeClass('active');
    $('.bills-group, .bills-group__table').css({ position: "", top: "", left: "", zIndex: "", height: "" });
    $('.heading__toggle-main').removeClass('active');
    $('.heading__toggle-secondary').removeClass('active');
  });

}

toggleBillsGroup();
