function toggleAddChannels() {
  const $popup = $('.popup[data-popup-name="add-channels"]');
  const $textarea = $popup.find('.popup__textarea');
  const $placeholder = $popup.find('.popup__placeholder');
  const $counter = $popup.find('.popup__counter span');
  const $submit = $popup.find('button[type="submit"]');

  function updateUI() {
    const tagsCount = $textarea.find('.popup__tag').length;
    const hasText = $.trim($textarea.text()).length > 0;

    $placeholder.toggle(!hasText && tagsCount === 0);
    $counter.text(tagsCount);
    $submit.prop('disabled', tagsCount === 0);
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

  // Submit → очистка textarea
  $(document).on(
    'click',
    '.popup[data-popup-name="add-channels"] button',
    function () {
      $textarea.empty();
      updateUI();
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

toggleAddChannels();
