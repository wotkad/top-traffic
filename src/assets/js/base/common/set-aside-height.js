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

function initTableProxyScroll() {

  const $proxy = $('.table-scroll-proxy');
  const $proxyInner = $('.table-scroll-proxy__inner');
  const $wrapper = $('.wrapper');
  const $contentScroll = $('.content-scroll');

  function updateProxy() {

    if (!$wrapper.length) return false;

    const $table = $('.table:visible').first();

    if (!$table.length) return false;

    if (!$table.length) {
      $proxy.hide();
      $contentScroll.removeClass('content-visible');
      return;
    }

    const rect = $table[0].getBoundingClientRect();

    const tableTopVisible = rect.top < window.innerHeight;
    const tableBottomVisible = rect.bottom > 0 && rect.bottom <= window.innerHeight;

    if (!tableTopVisible) {
      $proxy.hide();
      $contentScroll.removeClass('content-visible');
      return;
    }

    const wrapperOffset = $wrapper.offset();
    const wrapperWidth = $wrapper.outerWidth();

    $proxy.css({
      left: wrapperOffset.left + 28,
      width: wrapperWidth - 52
    });

    const tableWidth = $table[0].scrollWidth;
    $proxyInner.width(tableWidth);

    const $scrollContainer = $table.parent();

    if (tableBottomVisible) {
      $proxy.hide();
    } else {
      $proxy.show();
    }

    $proxy.off('scroll').on('scroll', function () {
      $scrollContainer.scrollLeft($(this).scrollLeft());
    });

    $scrollContainer.off('scroll.proxy').on('scroll.proxy', function () {
      $proxy.scrollLeft($(this).scrollLeft());
    });

    /* -------- Проверка visibility content-scroll -------- */

    const contentBottom = $contentScroll.offset().top + $contentScroll.outerHeight();
    const wrapperScrollTop = $wrapper.scrollTop();
    const wrapperBottom = wrapperScrollTop + $wrapper.innerHeight();

    if (contentBottom <= wrapperBottom) {
      $contentScroll.addClass('content-visible');
    } else {
      $contentScroll.removeClass('content-visible');
    }

  }

  $wrapper.on('scroll', updateProxy);
  $(window).on('resize', updateProxy);

  updateProxy();
}

initTableProxyScroll();