function toggleFilterSort() {
  let button = $('.table th .table__sort');
  button.on('mouseover', function() {
    $(this).addClass('sorted');
  });
  button.on('mouseleave', function() {
    $(this).removeClass('sorted');
  });
  button.on('click', function() {
    button.not(this).find('.table__sortbutton').removeClass('active');
    $(this).find('.table__sortbutton').toggleClass('active');
    $(this).toggleClass('active');
  });
}
toggleFilterSort();