function formLogin() {
  let form = $('.login__form');
  form.find('input').on('input', function () {
    let hasError = form.find('input.error').length > 0;
    let emailField = form.find('input[name="email"]');
    let passwordField = form.find('input[name="password"]');
    let isEmailEmpty = emailField.val().trim() === '';
    let isPasswordEmpty = passwordField.val().trim() === '';
    let button = form.find('button');
    if (hasError || isEmailEmpty || isPasswordEmpty) {
      button.attr('disabled', 'disabled');
    } else {
      button.removeAttr('disabled');
    }
  });
}
formLogin();
