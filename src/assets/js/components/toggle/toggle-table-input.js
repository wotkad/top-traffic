function toggleTableInput() {
  let $checkbox = $('.table__checkbox input');
  let $checkAll = $('.table th .table__checkbox input');

  $checkbox.on('change', function() {
    $(this).closest('tr').find('.table__remove').toggleClass('active', this.checked);
  });

  $checkAll.on('change', function() {
    let isChecked = $(this).prop('checked');
    let $table = $(this).closest('table');

    $table.find('.table__checkbox input').prop('checked', isChecked);
    $table.find('.table__remove').toggleClass('active', isChecked);
  });
}

toggleTableInput();
