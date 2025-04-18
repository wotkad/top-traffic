function toggleChatCategory() {
  let button = $('.chat__category');

  button.on('click', function () {
    if ($(this).hasClass('active')) return; // Если кнопка уже активна, выходим из функции

    let id = $(this).attr('data-id');
    let block = $(this).closest('.chat__categories').next().find('.chat__block[data-id="' + id + '"]');

    $(this).closest('.chat__categories').next().find('.chat__block').hide();

    $(this).siblings('.chat__category').removeClass('active');
    $(this).addClass('active');

    $(this).closest('.chat__categories').next().find('.chat__block').removeClass('active');
    block.show();
  });
}

toggleChatCategory();