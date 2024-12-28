function toggleAsideMenu() {
  let switchEl = $('.sidebar__switch');
  let menu = $('.sidebar__menu');
  
  switchEl.on('click', function() {
    if (menu.is(':animated')) {
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
