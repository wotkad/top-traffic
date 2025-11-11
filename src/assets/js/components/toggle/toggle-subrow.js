function toggleSubrow() {
  $('tr.subrow').on('click', function() {
    // если элемент находится внутри .table-bills — прерываем выполнение
    if ($(this).closest('.table-bills').length) return;

    let nextRows = $(this).nextUntil('tr.subrow');
    if (nextRows.length > 0) {
      nextRows.toggle();
      $(this).toggleClass('active');
    }
  });
}

toggleSubrow();
