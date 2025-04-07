function toggleFavorites() {
  let button = $('.heading__addtofavorites');
  button.on('click', function() {
    $(this).toggleClass('active');
  });
}
toggleFavorites();