function setPosition(aside, content) {
  let asidePosition = aside.offset().top;
  let contentPosition = content.offset().top;

  if (asidePosition <= 84) {
    aside.css('top', '84px').css('position', 'fixed');
  }
  if (contentPosition >= 84) {
    aside.css('top', '').css('position', '');
  }
}

export default function setAsidePosition() {
  let asides = $('.content-aside');

  if (asides.length) {
    $('.wrapper').on('scroll', function () {
      asides.each(function () {
        let aside = $(this);
        let content = aside.prev('.content');

        if (content.length) {
          setPosition(aside, content);
        }
      });
    });

    asides.each(function () {
      let aside = $(this);
      let content = aside.prev('.content');

      if (content.length) {
        setPosition(aside, content);
      }
    });
  }
}

setAsidePosition();
