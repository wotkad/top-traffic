function validatorPassword() {
  let passwordField = $('input[name="password"]');
  passwordField.on('input', function () {
    let isPasswordEmpty = passwordField.val().trim() === '';
    let toggle = $('.input__toggle');

    if (isPasswordEmpty) {
      toggle.hide();
    } else {
      toggle.show();
    }
  });
}
validatorPassword();