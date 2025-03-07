export default function setSubrowPosition() {
  $('tr.subrow .fixed-subrow .button').each(function() {
    let contentWidth = $(this).closest('.content').outerWidth(); // Лучше использовать outerWidth()
    $(this).css({
      'position': 'absolute',
      'left': contentWidth - 52
    });
  });
}

setTimeout(setSubrowPosition, 400);

$(window).on('resize load', function() {
  requestAnimationFrame(() => {
    setTimeout(setSubrowPosition, 50);
  });
});