function toggleAsideMenu() {
  let button = $('.sidebar__company');
  let menu = $('.sidebar__menu');
  
  button.on('click', function() {
    if (menu.is(':animated')) {
      // Если анимация в процессе, игнорируем клик
      return;
    }
    
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      menu.slideDown();
    } else {
      $(this).addClass('active');
      menu.slideUp();
    }
  });
}

toggleAsideMenu();
