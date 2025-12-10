export default function setStoplistPosition() {
  $('tr .stoplist-controls').each(function() {
    let contentWidth = $(this).closest('.content').outerWidth()
    $(this).css({
      'position': 'absolute',
      'left': contentWidth - 52
    });
  });
}
setTimeout(setStoplistPosition, 400);

$(window).on('resize load', function() {
  requestAnimationFrame(() => {
    setTimeout(setStoplistPosition, 400);
  });
});