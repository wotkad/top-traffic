function setPosition(filter, content) {
  let filterPosition = filter.offset().top;
  let contentPosition = content.offset().top;

  let right = content.offset().left + content.outerWidth() + filter.outerWidth() + 72;

  if (filter.closest('.popup').length) {
    if (filterPosition <= 24) {
      filter.css('top', '24px').css('position', 'fixed').css('left', right);
    }
    if (contentPosition >= 24) {
      filter.css('top', '').css('position', '').css('left', '');
    }
  } else {
    if (filterPosition <= 84) {
      filter.css('top', '84px').css('position', 'fixed');
    }
    if (contentPosition >= 84) {
      filter.css('top', '').css('position', '');
    }
  }
}

export default function setFilterPosition() {
  let filters = $('.filter');

  if (filters.length) {
    $('.wrapper').on('scroll', function () {
      filters.each(function () {
        let filter = $(this);
        let content = filter.prev('.content');

        if (content.length) {
          setPosition(filter, content);
        }
      });
    });

    $('.popup').on('scroll', function () {
      let popup = $(this);
      popup.find('.filter').each(function () {
        let filter = $(this);
        let content = filter.prev('.content');
        
        if (content.length) {
          setPosition(filter, content);
        }
      });
    });

    filters.closest('.popup').each(function () {
      let filter = $(this).find('.filter');
      let content =  $(this).find('.content');

      if (content.length) {
        setPosition(filter, content);
      }
      $(window).on('resize', function() {
        setPosition(filter, content);
      });
    });

    filters.each(function () {
      let filter = $(this);
      let content = filter.prev('.content');

      if (content.length) {
        setPosition(filter, content);
      }
    });
  }
}

setFilterPosition();
