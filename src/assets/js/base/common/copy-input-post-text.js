function copyInputPostText() {
  $(document).on('click', '.table__post button', function() {
    const val = $(this).closest('.table__post__wrapper').find('textarea').val();;
    if (val) {
      navigator.clipboard.writeText(val).then(() => {
      });
    }
  });
}
copyInputPostText();