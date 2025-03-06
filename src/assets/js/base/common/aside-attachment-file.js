function asideAttachmentFile() {
  $('[data-id-file]').on('change', 'input[type="file"]', function (event) {
    $(this).closest('.dropdown__list').removeClass('active');
    var fileInput = $(this)[0];
    var file = fileInput.files[0];

    if (!file) return;

    // Получаем data-id-file
    var fileContainerId = $(this).closest('[data-id-file]').data('id-file').replace('add-upload-', '');

    // Форматирование даты
    var currentDate = new Date();
    var months = ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'];
    var day = String(currentDate.getDate()).padStart(2, '0');
    var month = months[currentDate.getMonth()];
    var hours = String(currentDate.getHours()).padStart(2, '0');
    var minutes = String(currentDate.getMinutes()).padStart(2, '0');
    var formattedTime = `${day} ${month} ${hours}:${minutes}`;

    // Формат размера файла
    var fileSize = (file.size / 1024).toFixed(0) + ' KB';

    // Формируем HTML для файла
    var newFile = `
      <div class="accordion__item">
        <div class="accordion__left">
          <div class="checkbox">
            <label class="input-checkbox md accordion__checkbox">
              <input class="md accordion__checkbox" type="checkbox" name="checkbox">
              <span></span>
            </label>
          </div>
          <div class="accordion__left__container">
            <div class="accordion__icon accordion__icon-sm">
              <svg viewBox="0 0 10 12" width="10" height="12">
                <use xlink:href="#other-file-icon"></use>
              </svg>
            </div>
            <a href="${file.name}" download>${file.name}</a>
            <time>${fileSize} • ${formattedTime}</time>
          </div>
        </div>
        <div class="accordion__right">
          <a class="button button-icon accordion__action" href="#" download="${file.name}" aria-label="button">
            <svg viewBox="0 0 18 18" width="18" height="18">
              <use xlink:href="#other-download-icon"></use>
            </svg>
          </a>
          <button class="button button-icon accordion__action" type="button" aria-label="button" data-popup-name="delete-file">
            <svg viewBox="0 0 18 18" width="18" height="18">
              <use xlink:href="#other-trash-icon"></use>
            </svg>
          </button>
        </div>
      </div>
    `;

    // Добавляем файл в контейнер
    var container = $('.accordion__container[data-id="' + fileContainerId + '"]');
    container.append(newFile);

    // Обновляем количество элементов
    var count = container.find('.accordion__item').length;
    $('.accordion__button[data-id="' + fileContainerId + '"]').find('.accordion__count').text(count);

    // Очищаем input после добавления файла
    $(this).val('');
  });
}
asideAttachmentFile();
