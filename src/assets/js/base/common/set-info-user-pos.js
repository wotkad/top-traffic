export default function setInfoUserPos() {
  $(document).on('mouseenter', '.info-users', function(e) {
    // Останавливаем всплытие, чтобы не срабатывало для родительских элементов
    e.stopPropagation();
    
    const $currentBlock = $(this);
    const $popup = $currentBlock.find('> .info-users__popup'); // Используем > для прямых потомков
    const $img = $currentBlock.find('> .info-users__image'); // Только непосредственные изображения

    if (!$popup.length || !$img.length) return;

    const imgRect = $img[0].getBoundingClientRect();
    const viewportWidth = $(window).width();
    
    // Рассчитываем позицию
    let leftPosition = imgRect.right - $popup.outerWidth();
    
    // Корректировка, если попап выходит за экран
    if (leftPosition + $popup.outerWidth() > viewportWidth) {
      leftPosition = viewportWidth - $popup.outerWidth() - 10;
    }

    // Показываем только текущий попап
    $popup.css({
      'opacity': '1', 
      'visibility': 'visible',
      'zIndex': '50',
      'top': imgRect.bottom + 4 + 'px',
      'left': leftPosition + 'px'
    });
  });

  $(document).on('mouseleave', '.info-users', function(e) {
    const $currentBlock = $(this);

    setTimeout(() => {
      // Если курсор всё ещё внутри этого блока или его потомков — не скрываем
      if ($currentBlock.is(':hover') || $currentBlock.find(':hover').length > 0) return;

      // Закрываем только текущий попап
      const $popup = $currentBlock.find('> .info-users__popup');
      if ($popup.length) {
        $popup.css({
          'opacity': '0',
          'visibility': 'hidden',
          'zIndex': '-10'
        });
      }
    }, 100);
  });

  $('.content-aside__container, .wrapper').on('scroll', function() {
    $('.info-users__popup').css({ 
      opacity: '0', 
      visibility: 'hidden', 
      zIndex: '-10' 
    });
  });
}
setInfoUserPos();