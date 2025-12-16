function setTableHeadTipPosition() {
  const $wrapper = $('.wrapper');

  function syncTipPosition($parent) {
    const $tip = $parent.find('p');
    if ($tip.length === 0) return;

    const parentOffset = $parent.offset();

    const top = parentOffset.top - $(window).scrollTop();
    const left = parentOffset.left - $(window).scrollLeft();

    $tip.css({
      position: 'fixed',
      top: top - 24,
      left: left + 9
    });
  }

  // hover по svg → выставляем те же координаты
  $(document).on(
    'mouseenter',
    '.table__head-tip svg',
    function () {
      const $parent = $(this).closest('.table__head-tip');
      syncTipPosition($parent);
    }
  );

}
setTableHeadTipPosition();