export default function resizeTable() {
  let isResizing = false;
  let startX = 0;
  let startWidth = 0;
  let colIndex = 0;

  let $col;
  let $table;

  $(document).on('mousedown', '.resizable', function (e) {
    e.preventDefault();

    const $th = $(this).closest('th');
    $table = $th.closest('table');
    colIndex = $th.index();

    $col = $table.find('col').eq(colIndex);

    startX = e.pageX;
    startWidth = $col.width() || $th.outerWidth();

    isResizing = true;
    $('body').addClass('no-select');
  });

  $(document).on('mousemove', function (e) {
    if (!isResizing) return;

    const diff = e.pageX - startX;
    const newWidth = Math.max(60, startWidth + diff);

    // меняем только col
    $col.css('width', newWidth);
  });

  $(document).on('mouseup', function () {
    if (!isResizing) return;

    isResizing = false;
    $('body').removeClass('no-select');
  });
}

resizeTable();
