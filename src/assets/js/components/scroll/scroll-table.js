function scrollTable() {
  $('.content-scroll').each(function() {
    const $content = $(this);
    const scrollLeft = $content.scrollLeft();
    
    if (scrollLeft > 0) {
        $content.children('.table').addClass('scrolled');
    } else {
        $content.children('.table').removeClass('scrolled');
    }
  });
}
scrollTable();

function scrollTableOuter() {
  $('.table-outer').each(function() {
    const $content = $(this);
    const scrollLeft = $content.scrollLeft();
    
    if (scrollLeft > 0) {
        $content.children('.table').addClass('scrolled');
    } else {
        $content.children('.table').removeClass('scrolled');
    }
  });
}
scrollTableOuter();

$('.content-scroll').on('scroll', function() {
  scrollTable();
});

$('.table-outer').on('scroll', function() {
  scrollTableOuter();
});