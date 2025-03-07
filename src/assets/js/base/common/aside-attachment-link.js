function asideAttachmentLink() {
  // Обработчик отправки формы
  $('form[action="#"]').on('submit', function(event) {
    event.preventDefault(); // предотвращаем стандартное поведение формы

    // Получаем родительский попап, из которого отправляется форма
    var popup = $(this).closest('.popup');

    // Получаем значения из полей формы внутри текущего попапа
    var text = popup.find('input[name="text"]').val();
    var url = popup.find('input[name="url"]').val();

    if (!text || !url) {
      return; // Прекращаем выполнение, если поля пустые
    }

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
    var container = $('.accordion__container[data-id="' + containerId + '"]');
    container.append(newLink);

    // Обновляем количество элементов
    var count = container.find('.accordion__item').length;
    $('.accordion__button[data-id="' + containerId + '"]').find('.accordion__count').text(count);

    // Закрываем попап
    popup.removeClass('active');
    popup.closest('.popup__bg').removeClass('active');

    // Очищаем поля формы после добавления
    popup.find('input[name="text"], input[name="url"]').val('');
  });

  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function openDeletePopup(parent, popupName) {
      let uniqueId = generateId();
      parent.attr("data-popup-id", uniqueId);
      let popup = $(`.popup[data-popup-name='${popupName}']`);
      popup.attr("data-popup-id", uniqueId);

      // Привязываем ID к кнопке удаления в попапе
      popup.find(".button-confirm").attr("data-delete-id", uniqueId);
  }

  // Функция для обновления счетчика
  function updateAccordionCount(containerId) {
    let container = $(`.accordion__container[data-id='${containerId}']`);
    let button = $(`.accordion__button[data-id='${containerId}']`);
    let count = container.find(".accordion__item").length;

    if (count === 0) {
        container.hide(); // Скрываем контейнер
        button.removeClass("active"); // Убираем активный класс
    }

    button.find(".accordion__count").text(count);
  }

  // Открытие попапа при клике на "Удалить ссылку"
  $(document).on("click", ".accordion__right .button[data-popup-name='delete-link']", function () {
      let parent = $(this).closest(".accordion__item");
      openDeletePopup(parent, "delete-link");
  });

  // Открытие попапа при клике на "Удалить файл"
  $(document).on("click", ".accordion__right .button[data-popup-name='delete-file']", function () {
      let parent = $(this).closest(".accordion__item");
      openDeletePopup(parent, "delete-file");
  });

  // Подтверждение удаления ссылки
  $(document).on("click", ".popup[data-popup-name='delete-link'] .button-confirm", function () {
      let deleteId = $(this).attr("data-delete-id");
      let linkedParent = $(`.accordion__item[data-popup-id='${deleteId}']`);

      if (linkedParent.length) {
          let container = linkedParent.closest(".accordion__container");
          linkedParent.remove();
          updateAccordionCount(container.data("id"));
      }

      closePopup("delete-link");
  });

  // Подтверждение удаления файла
  $(document).on("click", ".popup[data-popup-name='delete-file'] .button-confirm", function () {
      let deleteId = $(this).attr("data-delete-id");
      let linkedParent = $(`.accordion__item[data-popup-id='${deleteId}']`);

      if (linkedParent.length) {
          let container = linkedParent.closest(".accordion__container");
          linkedParent.remove();
          updateAccordionCount(container.data("id"));
      }

      closePopup("delete-file");
  });

  // Закрытие попапа по кнопке "Нет"
  $(document).on("click", ".popup .button-base", function () {
      let popupName = $(this).closest(".popup").data("popup-name");
      closePopup(popupName);
  });

  function closePopup(popupName) {
      let popup = $(`.popup[data-popup-name='${popupName}']`);

      // Очищаем привязанный ID
      popup.removeAttr("data-popup-id");
      popup.find(".button-confirm").removeAttr("data-delete-id");
  }

}
asideAttachmentLink();
