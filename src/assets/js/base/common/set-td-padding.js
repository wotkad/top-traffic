function setTdPaddingUniversal(tableClass, sliceStart, sliceEndOffset) {
  requestAnimationFrame(() => {
    $(`table.${tableClass}`).each(function () {
      let table = $(this);
      let tds = table.find('td, th');
      tds.css('padding-right', 32);

      let container = table.closest('.content-scroll, .table-outer');
      let containerWidth = container.width();
      let tableWidth = table.width();
      let widthDifference = containerWidth - tableWidth;

      table.find('tr').each(function () {
        let tds = $(this).find('td, th');
        let numOfTds = tds.length;
        let minPadding, extraPadding, defaultExtraPadding = 0, finalPadding;

        if (numOfTds > 2) {
          minPadding = (widthDifference !== 0)
            ? Number($(tds[2]).css('padding-right').slice(0, -2))
            : 32;

          let adjustableTdsCount = numOfTds - sliceEndOffset;
          extraPadding = widthDifference / (adjustableTdsCount - sliceStart);

          if (extraPadding < 0) {
            finalPadding = Math.max(minPadding, minPadding + defaultExtraPadding);
          } else {
            finalPadding = Math.max(minPadding, minPadding + extraPadding - 1);
          }

          $(tds.slice(sliceStart, -sliceEndOffset)).css('padding-right', finalPadding);
        }

        if (table.hasClass('table-can-remove')) {
          $(tds.eq(-2)).css('padding-right', 16);
          $(tds.eq(-1)).css('padding-right', 16);
        }
      });
    });
    $('.table-outer').css('max-width', $('.table-outer').closest('.content-scroll').outerWidth() - 82 + 'px');
    $('.table-outer').css('min-width', $('.table-outer').closest('.content-scroll').outerWidth() - 82 + 'px');
    $('.popup .table-outer').css('max-width', $('.popup .table-outer').closest('.content-scroll').outerWidth() - 25 + 'px');
    $('.popup .bills-row .bills-group__table').css('max-width', $('.popup .table-outer').closest('.content-scroll').outerWidth() - 25 + 'px');
  });
}

// Для .table-fixed-cols
export function applyFixedColsPadding() {
  setTdPaddingUniversal('table-fixed-cols', 1, 1);
}

// Для .table-default
export function applyDefaultTablePadding() {
  setTdPaddingUniversal('table-default', 0, 1);
}

// Запуск с таймером
applyFixedColsPadding();
applyDefaultTablePadding();
setTimeout(() => {
  applyFixedColsPadding();
  applyDefaultTablePadding();
}, 400);

// Адаптивность при изменении окна
$(window).on('resize', () => {
  applyFixedColsPadding();
  applyDefaultTablePadding();
});
