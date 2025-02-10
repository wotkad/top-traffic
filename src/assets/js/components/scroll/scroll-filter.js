function scrollFilter() {
  function checkScrollState() {
    // $('.filter__container').each(function () {
    //   let container = $(this);
    //   let filter = container.closest('.filter');

    //   if (container[0].scrollHeight > container.innerHeight()) {
    //     if (container.scrollTop() + container.innerHeight() >= container[0].scrollHeight) {
    //       filter.removeClass('visible-bottom');
    //     } else {
    //       filter.addClass('visible-bottom');
    //     }
    //   } else {
    //     filter.removeClass('visible-top visible-bottom');
    //   }
    // });
  }

  checkScrollState();

  $('.filter__container').on('scroll', function () {
    let container = $(this);
    // let filter = container.closest('.filter');
    let openedDropdownButton = container.find('.dropdown__button');
    let openedDropdownList = container.find('.dropdown__list');

    openedDropdownButton.removeClass('active');
    openedDropdownList.removeClass('active').css({
      top: '',
      left: '',
      maxWidth: '',
    });

    // if (container[0].scrollHeight > container.innerHeight()) {
    //   if (container.scrollTop() > 0) {
    //     filter.addClass('visible-top');
    //   } else {
    //     filter.removeClass('visible-top');
    //   }

    //   if (container.scrollTop() + container.innerHeight() >= container[0].scrollHeight) {
    //     filter.removeClass('visible-bottom');
    //   } else {
    //     filter.addClass('visible-bottom');
    //   }
    // } else {
    //   filter.removeClass('visible-top visible-bottom');
    // }
  });

  $('.wrapper').on('scroll', function () {
    checkScrollState();
  });
}

scrollFilter();
