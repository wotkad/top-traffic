import gsap from "gsap";
import setTdPaddingDefault from "../../base/common/set-td-padding-default";
import setTdPadding from "../../base/common/set-td-padding";

import setFilterPosition from "../../base/common/set-filter-position";
import setAsidePosition from "../../base/common/set-aside-position";

function toggleSelector() {
  let button = $('.selector__button');
  for (let i = 0; i < Array.from(button).length; i++) {
    $(button[i]).on('click', function () {
      let id = button[i].getAttribute('data-id');
      let block = $(this).closest('.selector__buttons').next().find('.selector__container[data-id="' + id + '"]');
      $(this).siblings('.selector__button').removeClass('active');
      $(this).addClass('active');
      gsap.to($(this).closest('.selector__buttons').next().find('.selector__container'), {opacity: 0, duration: 0.3, onComplete: () => {
        gsap.to($(this).closest('.selector__buttons').next().find('.selector__container'), {display: 'none', duration: 0});
        gsap.to($(block).attr('data-id', $(this).attr('data-id')), {display: 'block', duration: 0, onComplete: () => {
          gsap.to($(block).attr('data-id', $(this).attr('data-id')), {opacity: 1, duration: 0.3});
          setTdPadding();
          setTdPaddingDefault();
          setFilterPosition();
          setAsidePosition();
        }});
      }});
    });
  }
}
toggleSelector();