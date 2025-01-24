function scrollContentAside() {
  $('.content-aside__container').on('scroll', function () {
    let openedDropdownButton = $(this).find('.dropdown__button');
    let openedDropdownList = $(this).find('.dropdown__list');

    openedDropdownButton.removeClass('active');
    openedDropdownList.removeClass('active').css({
      top: '',
      left: '',
      maxWidth: '',
    });
  });
}

scrollContentAside();
