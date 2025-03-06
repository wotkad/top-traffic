export default function setSubrowPosition() {
  $('tr.subrow .fixed-subrow .button').each(function() {
    let contentWidth = $(this).closest('.content').width();
    $(this).css({
      'position': 'absolute',
      'left': contentWidth - 52
    });
  });
}

requestAnimationFrame(setSubrowPosition);
setTimeout(setSubrowPosition, 400);

$(window).on('resize', setSubrowPosition);
