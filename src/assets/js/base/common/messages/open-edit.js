// Открытие редактирования сообщения
$(document).on("click", ".message__edit", function () {
  let parent = $(this).closest(".message");
  let messageText = parent.find(".message__author > p").text(); // Получаем текст сообщения
  let messageId = generateId();
  let form = $('.messages__form');
  form.removeClass('replied');
  form.addClass('edited');
  $('.messages__submit').prop('disabled', false);
  $(".messages__reply").remove();

  // Удаляем предыдущий блок редактирования, если он был
  $(".messages__edit").remove();
  $(".messages__bottom .messages__files").remove();

  // Добавляем ID текущему сообщению
  parent.attr("data-edit-id", messageId);

  // Создаем шаблон редактирования
  let editTemplate = `
    <div class="messages__edit">
      <div class="messages__footer__container">
        <div class="messages__icon">
          <svg viewBox="0 0 18 18" width="18" height="18">
            <use xlink:href="#other-edit-icon"></use>
          </svg>
        </div>
        <div class="message__answered">
          <h3>Редактирование</h3>
          <p>${messageText}</p>
        </div>
      </div>
      <button class="button button-icon-round messages__cancel" type="button" aria-label="button">
        <svg id="other-close-icon" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L8 7.99986" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
          <path d="M1 7.99976L8 0.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
        </svg>
      </button>
    </div>
  `;

  // Вставляем шаблон перед формой
  $(".messages__footer .messages__form").before(editTemplate);

  // Заполняем textarea текстом сообщения
  $(".messages__footer textarea[name='comment']").val(messageText).focus();
});