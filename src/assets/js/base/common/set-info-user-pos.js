export default function setInfoUserPos() {
  $('.info-users').each(function() {
    const $currentBlock = $(this);
    const $popup = $currentBlock.find('.info-users__popup');
    // Выбираем только непосредственный img (не вложенные)
    const $img = $currentBlock.find('.info-users__image'); 

    if (!$popup.length || !$img.length) return;

    $currentBlock.on('mouseenter', function() {
      const imgRect = $img[0].getBoundingClientRect();
      const viewportWidth = $(window).width();
      
      // Рассчитываем позицию
      let leftPosition = imgRect.right - $popup.outerWidth();
      
      // Корректировка, если попап выходит за экран
      if (leftPosition + $popup.outerWidth() > viewportWidth) {
        leftPosition = viewportWidth - $popup.outerWidth() - 10;
      }

      $popup.css({
        'opacity': '1', 
        'visibility': 'visible',
        'zIndex': '50',
        'top': imgRect.bottom + 4 + 'px',
        'left': leftPosition + 'px',
      });
    });

    $currentBlock.on('mouseleave', function() {

      $popup.css({
        'opacity': '0', 
        'visibility': 'hidden',
        'zIndex': '-10',
      });
    });
  });

  $('.content-aside__container, .wrapper').on('scroll', function() {
    $('.info-users__popup').css({ opacity: '0', visibility: 'hidden', zIndex: '-10' });
  });
}
setInfoUserPos();