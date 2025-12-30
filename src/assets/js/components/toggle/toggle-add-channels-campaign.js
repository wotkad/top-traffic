function toggleAddChannelsCampaign() {
  const $popup = $('.popup[data-popup-name="add-channels-campaign"]');
  const $textarea = $popup.find('.popup__textarea');
  const $placeholder = $popup.find('.popup__placeholder');
  const $counter = $popup.find('.popup__counter span, .popup__subtitle-buffering span');
  const $buffer = $popup.find('.popup-buffer');

  function updateUI() {
    const tagsCount = $textarea.find('.popup__tag').length;
    const hasText = $.trim($textarea.text()).length > 0;

    $placeholder.toggle(!hasText && tagsCount === 0);
    $counter.text(tagsCount);
    $buffer.prop('disabled', tagsCount === 0);

    $counter.text(tagsCount);
  }

  function setCaretToEnd(el) {
    const range = document.createRange();
    const sel = window.getSelection();

    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function createTag(text) {
    if (!text) return;

    const $tag = $(`
      <div class="popup__tag">
        <span contenteditable="false">${text}</span>
        <button class="button button-close" type="button" aria-label="close">
          <svg viewBox="0 0 9 9" width="9" height="9">
            <use xlink:href="#other-close-icon"></use>
          </svg>
        </button>
      </div>
    `);

    $textarea.append($tag);
    $textarea.append(document.createTextNode('\u00A0')); // место для следующего ввода
    setCaretToEnd($textarea[0]);
    updateUI();
  }

  function extractText() {
    const $textNodes = $textarea.contents().filter(function () {
      return this.nodeType === 3 && this.textContent.trim().length > 0;
    });

    if (!$textNodes.length) {
      return '';
    }

    const node = $textNodes.last()[0];
    const text = node.textContent.trim();

    node.remove();

    return text;
  }

  // Создание тега по пробелу или Enter
  $textarea.on('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();

      const text = extractText();
      if (!text) return;

      createTag(text);
    }
  });

  $textarea.on('input', updateUI);

  // Удаление тега
  $textarea.on('click', '.popup__tag .button-close', function () {
    $(this).closest('.popup__tag').remove();
    updateUI();
  });

  $(document).on(
    'click',
    '.popup[data-popup-name="add-channels-campaign"] .popup-buffer',
    function () {
      const $popup = $(this).closest('.popup[data-popup-name="add-channels-campaign"]');
      
      $textarea.attr('contenteditable', 'false');
      
      $popup.find('.popup__counter, .popup__buttons-default, .popup__subtitle-default').hide();
      $popup.find('.popup__subtitle-buffering').show();
      $popup.find('.popup__icon').show();
      $popup.find('.popup__textarea').addClass('disabled');
      setTimeout(function() {
        $popup.find('.popup__buttons-buffer').addClass('active');
        $popup.find('.popup__subtitle-buffering').hide();
        $popup.find('.popup__icon').hide();
        $popup.find('.popup__content').hide();
        $popup.find('.popup__status').show();
        $popup.find('.popup__table').show();
      }, 2000);
    }
  );

  $(document).on(
    'click',
    '.popup[data-popup-name="add-channels-campaign"] .popup-done, .popup[data-popup-name="add-channels-campaign"] .popup-hide-buffer',
    function () {
      $textarea.empty();
      updateUI();
      setTimeout(function() {
        $popup.find('.popup__buttons-buffer').removeClass('active');
        $popup.find('.popup__content').show();
        $popup.find('.popup__status').hide();
        $popup.find('.popup__counter, .popup__buttons-default, .popup__subtitle-default').show();
        $popup.find('.popup__textarea').removeClass('disabled');
        $textarea.attr('contenteditable', 'true');
        $popup.find('.popup__table').hide();
      }, 300);
    }
  );

  $textarea.on('paste', function (e) {
    e.preventDefault();

    const clipboardData = (e.originalEvent || e).clipboardData;
    if (!clipboardData) return;

    const pastedText = clipboardData.getData('text/plain');
    if (!pastedText) return;

    const values = pastedText
      .split(/[\s,]+/)
      .map(v => v.trim())
      .filter(Boolean);

    if (!values.length) return;

    // 🔥 Удаляем все текстовые узлы (пробелы)
    $textarea.contents().filter(function () {
      return this.nodeType === 3;
    }).remove();

    // Создаём теги без добавления пробелов между ними
    values.forEach(value => {
      const $tag = $(`
        <div class="popup__tag">
          <span contenteditable="false">${value}</span>
          <button class="button button-close" type="button" aria-label="close">
            <svg viewBox="0 0 9 9" width="9" height="9">
              <use xlink:href="#other-close-icon"></use>
            </svg>
          </button>
        </div>
      `);

      $textarea.append($tag);
    });

    // ✅ Один пробел для продолжения ввода
    $textarea.append(document.createTextNode('\u00A0'));
    setCaretToEnd($textarea[0]);
    updateUI();
  });


  updateUI();
}

toggleAddChannelsCampaign();
