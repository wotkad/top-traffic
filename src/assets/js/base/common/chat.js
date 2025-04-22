function chat() {
  let openMessages = $('.chat__conversation');
  let closeMessages = $('.chat__close');
  let pin = $('.chat__pin');
  let container = $('.chat__container');
  closeMessages.on('click', function() {
    container.removeClass('active');
  })
  openMessages.on('click', function() {
    container.addClass('active');
    pin.removeClass('active');
  })
}
chat();