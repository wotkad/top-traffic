// Открытие формы ответа
$(document).on("click", ".message__reply", function () {
  let parent = $(this).closest(".message");
  $(".chat__edit").remove();
  $(".chat__reply").remove();
  $('.chat__form').find("textarea[name='comment']").val("");
  $(".chat__bottom .chat__files").remove();
  
  let repliedUser = parent.find(".message__head h3").text().trim();
  let repliedText = parent.find(".message__author > p").text().trim();
  let hasText = repliedText.length > 0;
  let hasFiles = parent.find(".message__author .chat__files .chat__file").length > 0;

  let displayedUser = `Ответить: ${repliedUser}`;

  // Если в сообщении только файлы и нет текста — берём название первого файла
  if (!hasText && hasFiles) {
    repliedText = parent.find(".message__author .chat__files .chat__file__content p").first().text().trim();
  }

  let form = $('.chat__form');
  form.addClass('replied').removeClass('edited');
  $('.chat__submit').prop('disabled', false);

  // Формируем контент блока ответа
  let repliedContent = '';
  if (hasText && !hasFiles) {
    repliedContent = `
      <p>
        ${repliedText}
      </p>`;
  } else if (hasFiles && !hasText) {
    repliedContent = `
      <p>
        ${repliedText}
      </p>`;
  } else if (hasFiles && hasText) {
    repliedContent = `
      <p>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.2928 7.77545L8.16618 13.9021C7.41565 14.6527 6.39766 15.0744 5.33621 15.0744C4.27475 15.0744 3.25677 14.6527 2.50621 13.9021C1.75564 13.1516 1.33398 12.1336 1.33398 11.0721C1.33398 10.0107 1.75564 8.99272 2.50621 8.24212L8.63285 2.11546C9.13325 1.61509 9.81192 1.33398 10.5195 1.33398C11.2272 1.33398 11.9058 1.61509 12.4062 2.11546C12.9066 2.61584 13.1877 3.2945 13.1877 4.00213C13.1877 4.70977 12.9066 5.38842 12.4062 5.8888L6.27288 12.0155C6.02269 12.2657 5.68336 12.4062 5.32954 12.4062C4.97572 12.4062 4.6364 12.2657 4.38621 12.0155C4.13602 11.7653 3.99546 11.426 3.99546 11.0721C3.99546 10.7183 4.13602 10.379 4.38621 10.1288L10.0462 4.47546" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ${repliedText}
      </p>`;
  } else {
    repliedContent = `
      <p>
        ${repliedText}
      </p>`;
  }

  // Шаблон для ответа
  let replyTemplate = `
    <div class="chat__reply">
      <div class="chat__footer__container">
        <div class="chat__icon">
          <svg viewBox="0 0 18 18" width="18" height="18">
            <use xlink:href="#other-reply-icon"></use>
          </svg>
        </div>
        <div class="message__answered">
          <h3>${displayedUser}</h3>
          ${repliedContent}
        </div>
      </div>
      <button class="button button-icon-round chat__cancel" type="button" aria-label="button">
        <svg id="other-close-icon" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L8 7.99986" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
          <path d="M1 7.99976L8 0.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
        </svg>
      </button>
    </div>
  `;

  $(".chat__footer .chat__form").before(replyTemplate);
  $(".chat__footer textarea[name='comment']").focus();
});
