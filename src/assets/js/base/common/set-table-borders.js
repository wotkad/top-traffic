export default function positionTableBorders() {
  $('.table-outer').each(function() {
    const $outer = $(this);
    const $borders = $outer.find('.table-borders');
    const $rows = $outer.find('table tbody tr');
    const $table = $outer.find('table');

    // очищаем старые span
    $borders.empty();

    // базовое смещение
    let marginTop = 69;

    // добавляем линии
    $rows.each(function(index) {
      const $span = $('<span class="border-line"></span>');
      $span.css('margin-top', `${marginTop}px`);
      marginTop += 50;
      $borders.append($span);
    });

    // === считаем высоту таблицы ===
    let totalHeight = 0;
    $rows.each(function() {
      totalHeight += $(this).outerHeight();
    });

    // === проверка горизонтального скролла у .table-outer ===
    const hasHScroll = $outer[0].scrollWidth > $outer[0].clientWidth;

    // === проверяем, есть ли родитель .popup с data-popup-name="create-bill" ===
    const hasCreateBillParent = $outer.closest('.popup[data-popup-name="create-bill"]').length > 0;

    // === добавляем нужное значение только если есть нужный родитель ===
    totalHeight += 35;
    if (hasCreateBillParent) {
      totalHeight += hasHScroll ? 0 : 5;
    }

    // === сохраняем в data-height ===
    $table.data('height', totalHeight);

    // === передаём в css-переменную ===
    $table[0].style.setProperty('--after-height', totalHeight + 'px');
  });
}

setTimeout(positionTableBorders, 400);


$(function () {

  function updateColspans() {
    const w = $(window).width();

    // === ОБЫЧНЫЕ ЯЧЕЙКИ (НЕ ВНУТРИ POPUP) ===
    const $normalTds = $('td.bills-group__table')
      .not('.popup td.bills-group__table'); // исключаем popup

    if (w >= 1900) {
      $normalTds.attr('colspan', 7);
    } else if (w >= 1800) {
      $normalTds.attr('colspan', 6);
    } else if (w >= 1700) {
      $normalTds.attr('colspan', 5);
    } else if (w >= 1600) {
      $normalTds.attr('colspan', 4);
    } else if (w >= 1470) {
      $normalTds.attr('colspan', 3);
    } else if (w >= 1400) {
      $normalTds.attr('colspan', 2);
    }


    // === POPUP: generate-bill ===
    $('.popup[data-popup-name="generate-bill"] td.bills-group__table')
      .attr('colspan', 5);

    // === POPUP: create-bill ===
    $('.popup[data-popup-name="create-bill"] td.bills-group__table')
      .attr('colspan', 6);
  }

  // запускаем сразу
  updateColspans();

  // и при ресайзе
  $(window).on('resize', updateColspans);

});
