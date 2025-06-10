$(document).ready(function() {
  // Функция для управления отображением textarea
  function manageTextareaDisplay(textarea) {
    if (textarea.hasClass('active')) {
      // Показываем полное содержимое с авто-высотой
      textarea
        .height('auto')
        .css({
          'overflow': 'hidden',
          'text-overflow': 'clip',
          'white-space': 'normal'
        });
      
      // Рассчитываем и устанавливаем высоту (не более 100px)
      const scrollHeight = textarea[0].scrollHeight;
      const newHeight = Math.min(scrollHeight, 100);
      textarea.height(newHeight);
    } else {
      // Скрываем все строки кроме первой
      textarea
        .height(30) // Фиксированная высота одной строки
        .css({
          'overflow': 'hidden',
          'text-overflow': 'ellipsis',
          'white-space': 'nowrap'
        });
    }
  }

  // Обработчики событий для всех textarea внутри .table__post__input
  $('.table__post__input textarea')
    .on('focus', function() {
      $(this).addClass('active');
      $(this).parent().siblings('button').hide();
      manageTextareaDisplay($(this));
    })
    .on('input', function() {
      if ($(this).hasClass('active')) {
        manageTextareaDisplay($(this));
      }
      if ($(this).hasClass('filled')) {
        $(this).closest('.table__post__wrapper').addClass('filled');
      } else {
        $(this).closest('.table__post__wrapper').removeClass('filled');
      }
    })
    .on('blur', function() {
      $(this).parent().siblings('button').show();
      $(this).removeClass('active');
      manageTextareaDisplay($(this));
    });
});