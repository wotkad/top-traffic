function toggleFitlerAsideFeed() {
  let button = $('.content-aside-feed__filter__trigger');
  let checkbox = $('.content-aside-feed__filter__checkbox input');

  button.on('click', function() {
    $(this).toggleClass('active');
    $(this).closest('.content-aside-feed').find('.content-aside-feed__filter').toggle();
  })

  checkbox.on('input', function() {
    $(this)
      .closest('.content-aside-feed')
      .find('.content-aside-feed__post-deleted')
      .toggle(!this.checked);
  });
}
toggleFitlerAsideFeed();