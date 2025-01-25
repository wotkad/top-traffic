function copyAccordionLink() {
  $('.accordion__copy').on('click', function() {
    const linkHref = $(this).closest('.accordion__item').find('a').attr('href');
    if (linkHref) {
      navigator.clipboard.writeText(linkHref).then(() => {
      });
    }
  });
}
copyAccordionLink();