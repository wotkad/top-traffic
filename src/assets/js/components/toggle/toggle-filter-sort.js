function toggleFilterSort() {
  let button = $('.table th');
  button.on('click', function() {
    button.not(this).removeClass('sorted');
    button.not(this).find('.table__sortbutton').hide();
    $(this).addClass('sorted');
    $(this).find('.table__sortbutton').show();
  });
}
toggleFilterSort();