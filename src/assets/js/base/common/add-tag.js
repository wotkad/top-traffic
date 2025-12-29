function addTag() {
  let $popup = $('.popup[data-popup-name="add-tag"]');
  let $textarea = $popup.find('.popup__textarea');
  let $placeholder = $popup.find('.popup__placeholder');
  let $saveBtn = $popup.find('.popup__buttons button[type="submit"]');

  function placeCursorAtEnd(el) {
    let range = document.createRange();
    let sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  }

  $textarea.on('focus blur input', function() {
    if ($textarea.find('.popup__tag').length > 0 || $textarea.text().trim().length > 0) {
      $placeholder.hide();
    } else {
      $placeholder.show();
    }
  });

  $textarea.on('beforeinput', function(event) {
    if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward') {
      return;
    }

    let textNodes = $textarea.contents().filter(function() {
      return this.nodeType === 3;
    });

    let lastText = textNodes.length > 0 ? textNodes.last()[0].nodeValue : "";

    if (lastText.length === 0 && event.data && event.data !== '#') {
      event.preventDefault();
      $textarea.append('#' + event.data);
      placeCursorAtEnd($textarea[0]);
      return;
    }

    if (lastText.length === 0 && event.data === '#') {
      return;
    }

    let cleanText = lastText.replace(/^#/, '');
    if (cleanText.length >= 30) {
      event.preventDefault();
    }
  });

  $textarea.on('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      let textNodes = $textarea.contents().filter(function() {
        return this.nodeType === 3 && this.nodeValue && this.nodeValue.trim() !== '';
      });

      if (textNodes.length === 0) return;

      let content = textNodes.last()[0].nodeValue.trim();
      if (content === '') return;

      // === всегда добавляем #
      if (content[0] !== '#') {
        content = '#' + content.replace(/^#+/, '');
      }

      $saveBtn.prop('disabled', false);
      addTagToList(content);

      textNodes.remove();

      if ($textarea.find('br').length === 0) {
        $textarea.append('<br>');
      }

      placeCursorAtEnd($textarea[0]);
    }
  });


  function checkItemsCount() {
    let tagsCount = $textarea.find('.popup__tag').length;
    if (tagsCount == 15) {
      $popup.find('.popup__error').addClass('active');
      $textarea
        .addClass('disabled')
        .attr('contenteditable', 'false');
    } else {
      $popup.find('.popup__error').removeClass('active');
      $textarea
        .removeClass('disabled')
        .attr('contenteditable', 'true');
    }
  }

  function addTagToList(text) {
    let existing = $textarea.find('.popup__tag span').map(function() {
      return $(this).text();
    }).get();

    if (existing.includes(text)) return;

    let tagHtml = `
      <div class="popup__tag">
        <span contenteditable="false">${text}</span>
        <button class="button button-close" type="button" aria-label="close">
          <svg viewBox="0 0 9 9" width="9" height="9">
            <use xlink:href="#other-close-icon"></use>
          </svg>
        </button>
      </div>
    `;
    $textarea.append(tagHtml);

    checkItemsCount();
    placeCursorAtEnd($textarea[0]);
  }

  $textarea.on('click', '.popup__tag .button-close', function() {
    $(this).closest('.popup__tag').remove();
    if ($textarea.find('.popup__tag').length === 0) {
      $placeholder.show();
    }
    checkItemsCount();
    placeCursorAtEnd($textarea[0]);
  });

  function toggleShowAllButton() {
      let $list = $('.tag__list');
      let $button = $('.tag__button');
      
      if ($list.height() == 68 && $list.find('.tag__item').length > 4) {
        $button.removeClass('hidden');
      } else {
        $button.addClass('hidden');
      }
  }

  $(document).on('click', '.tag__item .button-close', function() {
      $(this).closest('.tag__item').remove();
      toggleShowAllButton();
      checkItemsCount();
  });
  
  $saveBtn.on('click', function(e) {
    e.preventDefault();
    $('.popup[data-popup-name="add-tag"] .popup__textarea').css('background-color', '#FBFBFB');
    const selectedOption = $('input[name="tag"]:checked');
    const $list = $('.popup[data-popup-name="add-tag"] .tag__list');
    const $textarea = $('.popup[data-popup-name="add-tag"] .popup__textarea');
    const tagValue = $('.popup[data-popup-name="add-tag"] .tag__value span');
    const optionText = selectedOption.closest('.popup__label').find('span').text();
    if (selectedOption.val() === 'none') {
        $('.tag__container:nth-child(2)').addClass('tag__container-hidden');
    }
    $list.empty().removeClass('active');
    let content = $textarea.text().trim();

    $saveBtn.prop('disabled', true);
    tagValue.text(optionText);

    $('input[name="tag"][type="radio"]').prop('checked', false);

    let tags = content.split(/\s+/).map(tag => tag.trim()).filter(t => t.length > 0);

    let existingTags = $list.find('.tag__item').map(function() {
        return $(this).text().replace(/×/, '').trim();
    }).get();

    $list.find('.tag__item').remove();

    tags.forEach(tag => {
        if (existingTags.length == 15) return;
        if (tag.length > 30) tag = tag.substring(0, 30);
        if (!existingTags.includes(tag)) {
            let tagHtml = `
                <div class="tag__item">
                    ${tag}
                </div>
            `;
            $list.append(tagHtml);
            existingTags.push(tag);
        }
    });

    $textarea.empty();

    checkItemsCount();
    setTimeout(toggleShowAllButton, 0);


    if ($list.find('.tag__item').length > 0) {
      $('.tag__container').removeClass('tag__container-hidden');
    } else {
      $('.tag__container:nth-child(2)').addClass('tag__container-hidden');
    }


    $('.popup').removeClass('active');
    $('.popup__bg').removeClass('active');

    $textarea
      .toggleClass('disabled', true)
      .attr('contenteditable', 'false');
        
    $placeholder.show();
  });
}

addTag();