function toggleFilterSort() {
  let button = $('.table th .table__sort');
  
  button.on('mouseover', function() {
    $(this).addClass('sorted');
  });
  
  button.on('mouseleave', function() {
    if (!$(this).hasClass('active')) {
      $(this).removeClass('sorted');
    }
  });
  
  button.on('click', function() {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active').find('.table__sortbutton').addClass('active');
    } else {
      $(this).toggleClass('reverse');
    }
  });
}

toggleFilterSort();