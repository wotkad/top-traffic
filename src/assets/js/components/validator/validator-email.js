
function validatorEmail() {

  const pattern = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validatedEmail = () => {
    const email = $('input[name="email"]').val();

    if (pattern(email)) {
      $('input[name="email"]').removeClass('error').addClass('valid');
    } else {
      $('input[name="email"]').addClass('error').removeClass('valid');
    }
    if (email == 0) {
      $('input[name="email"]').removeClass('error').removeClass('valid');
    }
    return false;
  }

  $('input[name="email"]').on('input', validatedEmail);

}
validatorEmail();