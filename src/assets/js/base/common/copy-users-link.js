function copyUsersLink() {
  $(document).on('click', '.users__link button', function() {
    const linkText = $(this).parent().find('.table__link').text();
    if (linkText) {
      navigator.clipboard.writeText(linkText).then(() => {
      });
    }
  });
}
copyUsersLink();