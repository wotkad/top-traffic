function shuffleCols() {
  const $table = $('table');
  const $theadRow = $table.find('thead tr');

  $theadRow.sortable({
    items: 'th',
    axis: 'x',
    helper: 'clone',
    placeholder: 'th-placeholder',
    tolerance: 'pointer',

    start: function (event, ui) {
      ui.helper.addClass('dragging');

      ui.helper.width(ui.item.width());
    },

    update: function (event, ui) {
      const oldIndex = ui.item.data('start-index');
      const newIndex = ui.item.index();

      if (oldIndex === newIndex) return;

      $table.find('tbody tr').each(function () {
        const $cells = $(this).children();
        const $movedCell = $cells.eq(oldIndex);

        if (newIndex < oldIndex) {
          $movedCell.insertBefore($cells.eq(newIndex));
        } else {
          $movedCell.insertAfter($cells.eq(newIndex));
        }
      });
    },

    create: function () {
      $theadRow.find('th').each(function (index) {
        $(this).attr('data-start-index', index);
      });
    },

    sort: function (event, ui) {
      ui.item.data('start-index', ui.item.index());
    }
  });
}
shuffleCols();