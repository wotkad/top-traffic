function toggleChannels() {
  let button = $('.table__channels-toggle');
  button.on('click', function() {
    $(this).toggleClass('active');
    $(this).closest('.table__channels').toggleClass('active');
  });
}
toggleChannels();