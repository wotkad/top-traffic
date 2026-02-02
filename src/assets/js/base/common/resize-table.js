function resizeTable() {
  let isResizing = false;
  let startX = 0;
  let startWidth = 0;
  let colIndex = 0;

  let $th;
  let $table;

  $(document).on('mousedown', '.resizable', function (e) {
    e.preventDefault();

    $th = $(this).closest('th');
    $table = $th.closest('table');
    colIndex = $th.index();

    startX = e.pageX;
    startWidth = $th.outerWidth();

    isResizing = true;
    $('body').addClass('no-select');
  });

  $(document).on('mousemove', function (e) {
    if (!isResizing) return;

    const diff = e.pageX - startX;
    const newWidth = Math.max(60, startWidth + diff); // min width

    // th
    $th.css('width', newWidth);

    // все td с тем же индексом
    $table.find('tbody tr').each(function () {
      $(this).children('td').eq(colIndex).css('min-width', newWidth);
    });
  });

  $(document).on('mouseup', function () {
    if (!isResizing) return;

    isResizing = false;
    $('body').removeClass('no-select');
  });
}
resizeTable();