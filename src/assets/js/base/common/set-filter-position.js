function setPosition(filter, content) {
  let filterPosition = filter.offset().top;
  let contentPosition = content.offset().top;

  if (filterPosition <= 84) {
    filter.css('top', '84px').css('position', 'fixed');
  }
  if (contentPosition >= 84) {
    filter.css('top', '').css('position', '');
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
