function toggleAddChannels() {
  const $popup = $('.popup[data-popup-name="add-channels"]');

  // =============================
  // Обновление счётчиков
  // =============================

  function updateBlockCounter($block) {
    const count = $block.find('.popup__tag').length;
    $block.find('.popup__counter span').text(count);
  }

  function updateTotalCounter() {
    let total = 0;

    $popup.find('.popup__block[data-id]').each(function () {
      const id = $(this).data('id');

      const isChecked = $popup
        .find(`.popup__label input[data-id="${id}"]`)
        .is(':checked');

      if (isChecked) {
        total += $(this).find('.popup__tag').length;
      }
    });

    $popup.find('.popup__subtitle-buffering span').text(total);
    $popup.find('.popup-buffer').prop('disabled', total === 0);
  }

  $(document).on(
    'click',
    '.popup[data-popup-name="add-channels"] .popup-buffer',
    function () {

      const $popup = $(this).closest('.popup[data-popup-name="add-channels"]');

      // блокируем ВСЕ textarea внутри popup
      $popup.find('.popup__textarea')
        .attr('contenteditable', 'false')
        .addClass('disabled');

      $popup.find('.popup__counter, .popup__buttons-default, .popup__subtitle-default').hide();
      $popup.find('.popup__subtitle-buffering').show();
      $popup.find('.popup__icon').show();
      $popup.find('.popup__tag .button-close svg').hide();
      $popup.find('.popup__tag .button-close').css('width', '2px');
      $popup.find('.popup__block-platforms').hide();
      $popup.find('.popup__block.disabled').hide();

      $popup.find('.popup__block[data-id]').each(function () {
        const $block = $(this);
        const hasTags = $block.find('.popup__tag').length > 0;

        if (!hasTags) {
          $block.hide();
        }
      });

      setTimeout(function () {
        $popup.find('.popup__buttons-buffer').show();
        $popup.find('.popup__buttons-buffer').addClass('active');
        $popup.find('.popup__subtitle-buffering').hide();
        $popup.find('.popup__icon').hide();
        $popup.find('.popup__content').hide();
        $popup.find('.popup__status').show();
        $popup.find('.popup__table').show();
        $popup.find('.popup__block').hide();
      }, 2000);
    }
  );

  $(document).on(
    'click',
    '.popup[data-popup-name="add-channels"] .popup-done, .popup[data-popup-name="add-channels"] .popup-hide-buffer',
    function () {

      const $popup = $(this).closest('.popup[data-popup-name="add-channels"]');

      // очищаем ВСЕ textarea
      $popup.find('.popup__textarea')
        .empty()
        .attr('contenteditable', 'true')
        .removeClass('disabled');
      $popup.find('.popup__label input').prop('checked', true);

      setTimeout(function () {
        $popup.find('.popup__placeholder').show();
        $popup.find('.popup__buttons-buffer').removeClass('active');
        $popup.find('.popup__buttons-buffer').hide();
        $popup.find('.popup__content').show();
        $popup.find('.popup__status').hide();
        $popup.find('.popup__counter, .popup__buttons-default, .popup__subtitle-default').show();
        $popup.find('.popup__table').hide();
        $popup.find('.popup__tag .button-close').show();
        $popup.find('.popup__block-platforms').show();
        $popup.find('.popup__block').show();
        $popup.find('.popup__block').removeClass('disabled');
        $popup.find('.popup__textarea').removeClass('disabled');
        $popup.find('.popup__counter span').text('0');
      }, 300);
    }
  );

  function updatePlaceholder($textarea) {
    const $block = $textarea.closest('.popup__block');
    const $placeholder = $block.find('.popup__placeholder');

    const hasTags = $textarea.find('.popup__tag').length > 0;
    const hasText = $.trim($textarea.text()).length > 0;

    $placeholder.toggle(!hasTags && !hasText);
  }

  function setCaretToEnd(el) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function createTag($textarea, text) {
    if (!text) return;

    const $tag = $(`
      <div class="popup__tag">
        <span contenteditable="false">${text}</span>
        <button class="button button-close" type="button">
          <svg viewBox="0 0 9 9" width="9" height="9">
            <use xlink:href="#other-close-icon"></use>
          </svg>
        </button>
      </div>
    `);

    $textarea.append($tag);
    $textarea.append(document.createTextNode('\u00A0'));

    setCaretToEnd($textarea[0]);

    const $block = $textarea.closest('.popup__block');
    updatePlaceholder($textarea);
    updateBlockCounter($block);
    updateTotalCounter();
  }

  function extractText($textarea) {
    const $textNodes = $textarea.contents().filter(function () {
      return this.nodeType === 3 && this.textContent.trim().length > 0;
    });

    if (!$textNodes.length) return '';

    const node = $textNodes.last()[0];
    const text = node.textContent.trim();
    node.remove();

    return text;
  }

  // =============================
  // textarea логика
  // =============================

  $popup.on('keydown', '.popup__textarea', function (e) {
    const $textarea = $(this);
    if ($textarea.attr('contenteditable') === 'false') return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const text = extractText($textarea);
      createTag($textarea, text);
    }
  });

  $popup.on('input', '.popup__textarea', function () {
    updatePlaceholder($(this));
  });

  $popup.on('click', '.popup__tag .button-close', function () {
    const $block = $(this).closest('.popup__block');
    const $textarea = $block.find('.popup__textarea');

    $(this).closest('.popup__tag').remove();

    updatePlaceholder($textarea);
    updateBlockCounter($block);
    updateTotalCounter();
  });

  $popup.on('paste', '.popup__textarea', function (e) {
    const $textarea = $(this);
    if ($textarea.attr('contenteditable') === 'false') return;

    e.preventDefault();

    const clipboardData = (e.originalEvent || e).clipboardData;
    if (!clipboardData) return;

    const values = clipboardData
      .getData('text/plain')
      .split(/[\s,]+/)
      .map(v => v.trim())
      .filter(Boolean);

    values.forEach(value => createTag($textarea, value));
  });

  // =============================
  // чекбоксы платформ
  // =============================

  $popup.on('input', '.popup__label input[type="checkbox"]', function () {
    const id = $(this).data('id');
    const $block = $popup.find(`.popup__block[data-id="${id}"]`);
    const $textarea = $block.find('.popup__textarea');

    const hasTags = $block.find('.popup__tag').length > 0;
    const isChecked = $(this).is(':checked');

    if (!isChecked) {
      if (hasTags) {
        // Если есть теги — НЕ скрываем, а блокируем
        $textarea
          .attr('contenteditable', 'false')
          .addClass('disabled');

        $block.addClass('disabled');
      } else {
        // Если тегов нет — можно скрыть
        $block.hide();
      }
    } else {
      // Включили обратно
      $block.show().removeClass('disabled');

      $textarea
        .attr('contenteditable', 'true')
        .removeClass('disabled');
    }

    updateTotalCounter();
  });

  updateTotalCounter();
}

toggleAddChannels();
