import gsap from 'gsap';
import setTdPadding from '../../base/common/set-td-padding';
import setTdPaddingDefault from '../../base/common/set-td-padding-default';
import setSubrowPosition from '../../base/common/set-subrow-position';

function toggleAside() {
  let switchEl = $('.sidebar__switch');
  let toggle = $('.sidebar__toggle');
  let sidebar = $('.sidebar');
  let menu = $('.sidebar__menu');
  let header = $('.header');
  let wrapper = $('.wrapper');
  
  toggle.on('click', function() {
    if (toggle.hasClass('active')) {
      gsap.to(sidebar, {maxWidth: '217px', duration: .3, onComplete: () => {
        toggle.removeClass('active');
        sidebar.removeClass('active');
        setTdPadding();
        setTdPaddingDefault();
        setSubrowPosition();
      }});
      header.removeClass('active');
      wrapper.removeClass('active');
      wrapper.addClass('collapsed');
      wrapper.removeClass('expanded');
    } else {
      toggle.addClass('active');
      sidebar.addClass('active');
      header.addClass('active');
      wrapper.addClass('active');
      switchEl.removeClass('active');
      menu.slideDown(0);
      gsap.to(sidebar, {maxWidth: '59px', duration: .3, onComplete: () => {
        wrapper.addClass('expanded');
        wrapper.removeClass('collapsed');
        setTdPadding();
        setTdPaddingDefault();
        setSubrowPosition();
      }});
    }
  });
}
toggleAside();