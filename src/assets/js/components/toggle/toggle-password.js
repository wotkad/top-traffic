function togglePassword() {
  let button = $('.input__toggle');
  let password = $('input[type="password"]');
  button.on('click', function() {
    if (password.attr('type') === 'password') {
      password.attr('type', 'text');
      $(this).addClass('showed');
    } else {
      password.attr('type', 'password');
      $(this).removeClass('showed');
    }
  });
}
togglePassword();