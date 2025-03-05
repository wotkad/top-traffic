$(document).ready(function() {
  // Обработчик отправки формы
  $('form[action="#"]').submit(function(event) {
    event.preventDefault(); // предотвращаем стандартное поведение формы

    // Получаем родительский попап, из которого отправляется форма
    var popup = $(this).closest('.popup');

    // Получаем значения из полей формы внутри текущего попапа
    var text = popup.find('input[name="text"]').val();
    var url = popup.find('input[name="url"]').val();

    // Получаем название попапа (например, add-link-mediaplan, add-link-creative, add-link-other)
    var popupName = popup.data('popup-name');

    // Получаем идентификатор контейнера, в который нужно добавить ссылку
    var containerId = popupName.replace('add-link-', '');

    // Форматирование даты
    var currentDate = new Date();
    var months = ['янв.', 'фев.', 'март', 'апр.', 'май', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'];
    var day = String(currentDate.getDate()).padStart(2, '0'); // Добавляем ведущий ноль
    var month = months[currentDate.getMonth()];
    var hours = String(currentDate.getHours()).padStart(2, '0'); // Добавляем ведущий ноль
    var minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Добавляем ведущий ноль

    var formattedTime = `${day} ${month} ${hours}:${minutes}`;

    // Формируем HTML для новой ссылки
    var newLink = `
      <div class="accordion__item">
        <div class="accordion__left">
          <div class="checkbox">
            <label class="input-checkbox md accordion__checkbox">
              <input class="md accordion__checkbox" type="checkbox" name="checkbox">
              <span></span>
            </label>
          </div>
          <div class="accordion__left__container">
            <div class="accordion__icon">
              <svg viewBox="0 0 14 14" width="14" height="14">
                <use xlink:href="#other-attachment-icon"></use>
              </svg>
            </div>
            <a href="${url}" target="_blank">${text}</a>
            <time>${formattedTime}</time>
          </div>
        </div>
        <div class="accordion__right">
          <button class="button button-icon accordion__action accordion__copy" type="button" aria-label="button">
            <svg viewBox="0 0 18 18" width="18" height="18">
              <use xlink:href="#other-copy-icon"></use>
            </svg>
          </button>
          <button class="button button-icon accordion__action" type="button" aria-label="button" data-popup-name="delete-link">
            <svg viewBox="0 0 18 18" width="18" height="18">
              <use xlink:href="#other-trash-icon"></use>
            </svg>
          </button>
        </div>
      </div>
    `;

    // Добавляем ссылку в соответствующий контейнер
    $('.accordion__container[data-id="' + containerId + '"]').append(newLink);

    // Закрываем попап
    popup.closest('.popup').hide();
    popup.closest('.popup__bg').hide();
  });
});
