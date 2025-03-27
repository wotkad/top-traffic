function togglePassword() {
  let button = $('.input__toggle');
  let password = $('input[type="password"]');
  button.on('click', function() {
    if (password.attr('type') === 'password') {
      password.attr('type', 'text');
      button.addClass('filled');
    } else {
      password.attr('type', 'password');
      button.removeClass('filled');
    }
  });
}
togglePassword();