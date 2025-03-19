// Открытие формы ответа
$(document).on("click", ".message__reply", function () {
  let parent = $(this).closest(".message");
  $(".messages__edit").remove();
  $(".messages__reply").remove();
  $('.messages__form').find("textarea[name='comment']").val("");
  $(".messages__bottom .messages__files").remove();

  let repliedUser = parent.find(".message__head h3").text().trim();
  let repliedText = parent.find(".message__author > p").text().trim();

  let form = $('.messages__form');
  form.addClass('replied');
  form.removeClass('edited');
  $('.messages__submit').prop('disabled', false);

  let replyTemplate = `
    <div class="messages__reply">
      <div class="messages__footer__container">
        <div class="messages__icon">
          <svg viewBox="0 0 18 18" width="18" height="18">
            <use xlink:href="#other-reply-icon"></use>
          </svg>
        </div>
        <div class="message__answered">
          <h3>${repliedUser}</h3>
          <p>${repliedText}</p>
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

  $(".messages__footer .messages__form").before(replyTemplate);
  $(".messages__footer textarea[name='comment']").focus();
});