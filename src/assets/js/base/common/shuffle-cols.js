function updateZIndex() {
  const $ths = $('table thead tr th');
  const maxZ = $ths.length; // максимальный z-index
  $ths.each(function (i) {
    $(this).css('z-index', maxZ - i);
  });
}

function shuffleCols() {
  const $table = $('table');
  const $theadRow = $table.find('thead tr');
  const $colgroup = $table.find('colgroup');

  $theadRow.sortable({
    items: 'th',
    cancel: '.fixed-th, .resizable',
    axis: 'x',
    helper: 'clone',
    placeholder: 'th-placeholder',
    tolerance: 'pointer',

    start: function (event, ui) {
      ui.helper.addClass('dragging');
      ui.helper.width(ui.item.outerWidth());
      ui.item.data('start-index', ui.item.index());
    },

    update: function (event, ui) {
      const oldIndex = ui.item.data('start-index');
      const newIndex = ui.item.index();
      if (oldIndex === newIndex) return;

      // === TD ===
      $table.find('tbody tr').each(function () {
        const $cells = $(this).children();
        const $movedCell = $cells.eq(oldIndex);
        if (newIndex < oldIndex) {
          $movedCell.insertBefore($cells.eq(newIndex));
        } else {
          $movedCell.insertAfter($cells.eq(newIndex));
        }
      });

      // === COLGROUP ===
      if ($colgroup.length) {
        const $cols = $colgroup.children('col');
        const $movedCol = $cols.eq(oldIndex);
        if (newIndex < oldIndex) {
          $movedCol.insertBefore($cols.eq(newIndex));
        } else {
          $movedCol.insertAfter($cols.eq(newIndex));
        }
      }

      // обновляем индексы
      $theadRow.find('th').each(function (index) {
        $(this).data('start-index', index);
      });

      // обновляем z-index
      updateZIndex();
    }
  });

  // выставляем начальные z-index
  updateZIndex();
}

shuffleCols();
