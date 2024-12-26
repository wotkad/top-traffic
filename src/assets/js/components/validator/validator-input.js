
function validatorInput() {
  $('input').on('input', function() {
    if ($(this).val() == 0) {
      $(this).removeClass('filled');
    } else {
      $(this).addClass('filled');
    }
  });

}
validatorInput();