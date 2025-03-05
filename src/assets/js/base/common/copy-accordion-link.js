function copyAccordionLink() {
  $(document).on('click', '.accordion__copy', function() {
    const linkHref = $(this).closest('.accordion__item').find('a').attr('href');
    if (linkHref) {
      navigator.clipboard.writeText(linkHref).then(() => {
      });
    }
  });
}
copyAccordionLink();