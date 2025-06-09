function toggleFilterSort() {
  let button = $('.table th .table__sort');
  button.on('mouseover', function() {
    $(this).addClass('sorted');
  });
  button.on('click', function() {
    button.not(this).find('.table__sortbutton').removeClass('active');
    $(this).find('.table__sortbutton').addClass('active');
    $(this).addClass('active');
  });
}
toggleFilterSort();