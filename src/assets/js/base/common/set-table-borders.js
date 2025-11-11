export default function positionTableBorders() {
  $('.table-outer').each(function() {
    const $outer = $(this);
    const $borders = $outer.find('.table-borders');
    const offset = $outer.offset();
    const marginLeft = parseInt($outer.css('margin-left')) || 0;

    // позиционируем .table-borders
    $borders.css({
      position: 'fixed',
      left: offset.left - marginLeft,
      top: offset.top,
      zIndex: 1000
    });

    // очищаем старые span
    $borders.empty();

    // для каждой строки добавляем span
    $outer.find('table tbody tr').each(function() {
      const $tr = $(this);
      const trOffset = $tr.offset();
      const trHeight = $tr.outerHeight();

      const spanTop = trOffset.top + trHeight / 2;

      const $span = $('<span class="border-line"></span>').css({
        position: 'fixed',
        left: offset.left - marginLeft,
        top: spanTop,
        transform: 'translateY(-50%)',
        display: 'block'
      });

      $borders.append($span);
    });
  });
}

// --- начальный вызов
setTimeout(positionTableBorders, 400);

// --- обработка скролла и ресайза с финальной установкой
let scrollTimer;
$('.wrapper, .popup[data-popup-name="generate-bill"], .popup[data-popup-name="create-bill"]').on('scroll resize', function() {
  // во время прокрутки вызываем быстрое обновление
  positionTableBorders();

  // сбрасываем предыдущий таймер и ставим новый
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(function() {
    // финальная установка позиций после окончания скролла
    positionTableBorders();
  }, 200); // ← можно увеличить, если инерция скролла длинная
});
