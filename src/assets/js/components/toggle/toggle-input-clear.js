function toggleInputClear() {
  let button = $('.input__clear');
  button.on('click', function(e) {
    e.stopPropagation();
    $(this).siblings('input').val('').removeClass('filled error');
  });
}
toggleInputClear();