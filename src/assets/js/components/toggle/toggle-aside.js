import gsap from 'gsap';

function toggleAside() {
  let switchEl = $('.sidebar__switch');
  let toggle = $('.sidebar__toggle');
  let sidebar = $('.sidebar');
  let menu = $('.sidebar__menu');
  let header = $('.header');
  let content = $('.content');
  
  toggle.on('click', function() {
    if (toggle.hasClass('active')) {
      gsap.to(sidebar, {maxWidth: '217px', duration: .3, onComplete: () => {
        toggle.removeClass('active');
        sidebar.removeClass('active');
      }});
      header.removeClass('active');
      content.removeClass('active');
    } else {
      toggle.addClass('active');
      sidebar.addClass('active');
      header.addClass('active');
      content.addClass('active');
      switchEl.removeClass('active');
      menu.slideDown(0);
      gsap.to(sidebar, {maxWidth: '59px', duration: .3});
    }
  });
}

toggleAside();
