function toggleTableSelected() {
  let button = $('.table__toggle');
  button.on('click', function() {
    $(this).closest('.table__selected').next().find('.table-selected').toggleClass('active');
    $(this).toggleClass('active');
  });
}
toggleTableSelected();