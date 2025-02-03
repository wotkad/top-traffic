function copyPopupLink() {
  $('.popup__copy').on('click', function () {
    var text = $(this).text().trim();
    var $temp = $('<textarea>');
    $('body').append($temp);
    $temp.val(text).select();
    document.execCommand('copy');
    $temp.remove();
  });
}
copyPopupLink();