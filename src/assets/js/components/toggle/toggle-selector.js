import gsap from "gsap";
import setTdPaddingDefault from "../../base/common/set-td-padding-default";
import setTdPadding from "../../base/common/set-td-padding";

import setFilterPosition from "../../base/common/set-filter-position";
import setAsidePosition from "../../base/common/set-aside-position";

import setFilterHeight from "../../base/common/set-filter-height";
import setAsideHeight from "../../base/common/set-aside-height";

function toggleSelector() {
  let button = $('.selector__button');

  button.on('click', function () {
    if ($(this).hasClass('active')) return; // Если кнопка уже активна, выходим из функции

    let id = $(this).attr('data-id');
    let block = $(this).closest('.selector__buttons').next().find('.selector__container[data-id="' + id + '"]');

    $(this).siblings('.selector__button').removeClass('active');
    $(this).addClass('active');

    gsap.to($(this).closest('.selector__buttons').next().find('.selector__container'), {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.set($(this).closest('.selector__buttons').next().find('.selector__container'), { display: 'none' });
        gsap.set(block, { display: 'block' });
        gsap.to(block, {
          opacity: 1,
          duration: 0.3,
          onComplete: () => {
            setTdPadding();
            setTdPaddingDefault();
            setFilterPosition();
            setAsidePosition();
            setFilterHeight();
            setAsideHeight();
          }
        });
      }
    });
  });
}

toggleSelector();