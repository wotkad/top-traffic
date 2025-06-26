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
    // Убираем активные классы у других кнопок
    button.not(this).removeClass('active reverse').find('.table__sortbutton').removeClass('active');
    
    // Для текущей кнопки
    if (!$(this).hasClass('active')) {
      // Первый клик - добавляем active
      $(this).addClass('active').find('.table__sortbutton').addClass('active');
    } else {
      // Последующие клики - toggle reverse
      $(this).toggleClass('reverse');
    }
  });
}

toggleFilterSort();