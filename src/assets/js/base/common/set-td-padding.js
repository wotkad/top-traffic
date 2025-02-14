export default function setTdPadding() {
  // Используем requestAnimationFrame для оптимизации
  requestAnimationFrame(() => {
    $('table.table-fixed-cols').each(function () {
      let table = $(this);

      let tds = $(this).find('td, th');
      $(tds).css('padding-right', 32);

      let container = table.closest('.content-scroll');
      let containerWidth = container.width();
      let tableWidth = table.width();
      let widthDifference = containerWidth - tableWidth;

      table.find('tr').each(function () {
        tds = $(this).find('td, th');
        let numOfTds = tds.length;
        let minPadding, extraPadding, defaultExtraPadding, finalPadding;

        if (numOfTds > 2) {
          if (widthDifference > 0 || widthDifference < 0) {
            minPadding = Number($(tds[2]).css('padding-right').slice(0, -2));
          } else {
            minPadding = 32;
          }

          extraPadding = widthDifference / (numOfTds - 2);
          defaultExtraPadding = 0; // Можно добавить логику для вычисления разницы по умолчанию, если нужно

          if (extraPadding < 0) {
            finalPadding = Math.max(minPadding, minPadding + defaultExtraPadding);
          } else {
            finalPadding = Math.max(minPadding, minPadding + extraPadding - 1);
          }
          $(tds.slice(1, -1)).css('padding-right', finalPadding);
        }
      });
    });
  });
}

// Таймер с задержкой перед запуском
setTdPadding();
setTimeout(function() {
  setTdPadding();
}, 200);

// Обработчик события resize для адаптивности
$(window).on('resize', () => {
  setTdPadding();
});
