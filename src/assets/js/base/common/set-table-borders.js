export default function positionTableBorders() {
  $('.table-outer').each(function() {
    const $outer = $(this);
    const $borders = $outer.find('.table-borders');

    // очищаем старые span
    $borders.empty();

    // базовое смещение
    let marginTop = 69;

    // для каждой строки добавляем span
    $outer.find('table tbody tr').each(function(index) {
      const $span = $('<span class="border-line"></span>');

      // назначаем margin-top
      $span.css('margin-top', `${marginTop}px`);

      // увеличиваем для следующего
      if (index === 0) {
        marginTop += 50; // после первого шага начнем добавлять по 46
      } else {
        marginTop += 50;
      }

      $borders.append($span);
    });
  });
}

// --- начальный вызов
setTimeout(positionTableBorders, 400);