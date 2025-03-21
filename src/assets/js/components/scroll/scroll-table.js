function scrollTable() {
  $('.content-scroll').each(function() {
    const $content = $(this);
    const scrollLeft = $content.scrollLeft();
    
    if (scrollLeft > 0) {
        $content.find('.table').addClass('scrolled');
    } else {
        $content.find('.table').removeClass('scrolled');
    }
  });
}
scrollTable();

$('.content-scroll').on('scroll', function() {
  scrollTable();
});