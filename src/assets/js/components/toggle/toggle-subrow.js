function toggleSubrow() {
  $('tr.subrow').on('click', function() {
    let nextRows = $(this).nextUntil('tr.subrow');
    if (nextRows.length > 0) {
      nextRows.toggle();
      $(this).toggleClass('active');
    }
  });
}
toggleSubrow();