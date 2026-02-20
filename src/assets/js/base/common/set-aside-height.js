let isScrolling = false;

export default function setAsideHeight() {
  $('.content-aside__container, .chat__conversations').each(function () {
    let asideContainer = $(this);
    let asideOffsetTop = asideContainer.offset().top;
    
    let windowHeight = $(window).height();
    let scrollTop = $(window).scrollTop();
    let inner = asideContainer.closest('.inner');
    let innerOffset = inner.offset().top;
    let innerHeight = inner.outerHeight();
    let windowBottom = scrollTop + windowHeight;
    let innerBottom = innerOffset + innerHeight;
    let bottomOffset = innerBottom - windowBottom;

    if (bottomOffset <= -24) {
      asideContainer.css('max-height', `calc(100dvh - ${asideOffsetTop}px - ${-bottomOffset}px)`);
      asideContainer.css('height', `calc(100dvh - ${asideOffsetTop}px - ${-bottomOffset}px)`);
    } else {
      asideContainer.css('max-height', `calc(100dvh - ${asideOffsetTop}px - 24px)`);
      asideContainer.css('height', `calc(100dvh - ${asideOffsetTop}px - 24px)`);
    }
  });
  $('.chat__messages').each(function () {
    let asideContainer = $(this);
    let asideOffsetTop = asideContainer.offset().top;

    let windowHeight = $(window).height();
    let scrollTop = $(window).scrollTop();
    let inner = asideContainer.closest('.inner');
    let innerOffset = inner.offset().top;
    let innerHeight = inner.outerHeight();
    let windowBottom = scrollTop + windowHeight;
    let innerBottom = innerOffset + innerHeight;
    let bottomOffset = innerBottom - windowBottom;

    if (bottomOffset <= -24) {
      asideContainer.css('max-height', `calc(100dvh - ${asideOffsetTop}px - ${$(this).next().outerHeight()}px - 16px - ${-bottomOffset}px)`);
      asideContainer.css('height', `calc(100dvh - ${asideOffsetTop}px - ${$(this).next().outerHeight()}px - 16px - ${-bottomOffset}px)`);
    } else {
      asideContainer.css('max-height', `calc(100dvh - ${asideOffsetTop}px - 24px - ${$(this).next().outerHeight()}px - 16px)`);
      asideContainer.css('height', `calc(100dvh - ${asideOffsetTop}px - 24px - ${$(this).next().outerHeight()}px - 16px)`);
    }
  });
  $('.kp-popup__container').each(function () {
    let asideContainer = $(this);
    let asideOffsetTop = asideContainer.offset().top;
    
    let windowHeight = $(window).height();
    let scrollTop = $(window).scrollTop();
    let inner = asideContainer.closest('.inner');
    let innerOffset = inner.offset().top;
    let innerHeight = inner.outerHeight();
    let windowBottom = scrollTop + windowHeight;
    let innerBottom = innerOffset + innerHeight;
    let bottomOffset = innerBottom - windowBottom;

    if (bottomOffset <= -24) {
      asideContainer.css('max-height', `calc(100dvh - ${asideOffsetTop}px - ${-bottomOffset}px)`);
    } else {
      asideContainer.css('max-height', `calc(100dvh - ${asideOffsetTop}px - 36px)`);
    }
  });
}

function checkScrollEnd() {
  if (!isScrolling) {
    setAsideHeight();
    return;
  }
  isScrolling = false;
  requestAnimationFrame(checkScrollEnd);
}

$('.wrapper').on('scroll', function() {
  isScrolling = true;
  setAsideHeight();
  requestAnimationFrame(checkScrollEnd);
});

let popupTimer = null;

function startCloseTimer() {
  clearTimeout(popupTimer);
  popupTimer = setTimeout(function () {
    $('.kp-popup').removeClass('hover');
  }, 2000);
}

function clearCloseTimer() {
  clearTimeout(popupTimer);
}

$('.kp-trigger').on('mouseenter', function () {
  clearCloseTimer();
  $('.kp-popup').addClass('hover');
});

$('.kp-trigger').on('mouseleave', function () {
  startCloseTimer();
});

$('.kp-popup').on('mouseenter', function () {
  clearCloseTimer(); // если мышь на попапе — не закрываем
});

$('.kp-popup').on('mouseleave', function () {
  $('.kp-popup').removeClass('hover');
});

$(document).on('mousedown', function (e) {
  if (
    $(e.target).closest('.kp-popup').length === 0 &&
    $(e.target).closest('.kp-trigger').length === 0
  ) {
    clearCloseTimer();
    $('.kp-popup').removeClass('hover');
  }
});

function setFixedTableHeight() {
  $('.fixed-height-table').each(function () {
    const rect = this.getBoundingClientRect();
    const availableHeight = window.innerHeight - rect.top - 20;

    $(this).css('max-height', availableHeight + 'px');
  });
}

$(window).on('load resize', function () {
  setFixedTableHeight();
});
