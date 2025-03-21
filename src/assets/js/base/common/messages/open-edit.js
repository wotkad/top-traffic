import generateId from "./../generate-id";

$(document).on("click", ".message__edit", function () {
  let parent = $(this).closest(".message");
  let messageText = parent.find(".message__author > p").text().trim();
  let hasText = messageText.length > 0;
  let hasFiles = parent.find(".message__author .messages__files .messages__file").length > 0;
  let firstFileName = parent.find(".message__author .messages__files .messages__file .messages__file__link p").first().text().trim();

  let messageId = generateId();
  let form = $('.messages__form');
  form.removeClass('replied').addClass('edited');
  $('.messages__submit').prop('disabled', false);
  $(".messages__reply, .messages__edit, .messages__bottom .messages__files").remove();

  parent.attr("data-edit-id", messageId);

  // Выбор текста для отображения в блоке редактирования
  let displayText = '';
  if (hasText && hasFiles) {
    displayText = messageText;
  } else if (!hasText && hasFiles) {
    displayText = firstFileName;
  } else if (hasText) {
    displayText = messageText;
  }

  // Шаблон редактирования
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
          <p>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2928 7.77545L8.16618 13.9021C7.41565 14.6527 6.39766 15.0744 5.33621 15.0744C4.27475 15.0744 3.25677 14.6527 2.50621 13.9021C1.75564 13.1516 1.33398 12.1336 1.33398 11.0721C1.33398 10.0107 1.75564 8.99272 2.50621 8.24212L8.63285 2.11546C9.13325 1.61509 9.81192 1.33398 10.5195 1.33398C11.2272 1.33398 11.9058 1.61509 12.4062 2.11546C12.9066 2.61584 13.1877 3.2945 13.1877 4.00213C13.1877 4.70977 12.9066 5.38842 12.4062 5.8888L6.27288 12.0155C6.02269 12.2657 5.68336 12.4062 5.32954 12.4062C4.97572 12.4062 4.6364 12.2657 4.38621 12.0155C4.13602 11.7653 3.99546 11.426 3.99546 11.0721C3.99546 10.7183 4.13602 10.379 4.38621 10.1288L10.0462 4.47546" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ${displayText}
          </p>
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

  $(".messages__footer .messages__form").before(editTemplate);

  // Заполняем textarea, если был текст
  $(".messages__footer textarea[name='comment']").val(messageText).focus();
});
