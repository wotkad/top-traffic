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

    button.removeClass('active');
    $(this).closest('.selector__buttons').next().find('.selector__container').hide();

    $(this).siblings('.selector__button').removeClass('active');
    $(this).addClass('active');

    $(this).closest('.selector__buttons').next().find('.selector__container').removeClass('active');
    block.show().addClass('active');
    setTdPadding();
    setTdPaddingDefault();
    setFilterPosition();
    setAsidePosition();
    setFilterHeight();
    setAsideHeight();
  });
}

toggleSelector();