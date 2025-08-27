function addTag() {
  let $popup = $('.popup[data-popup-name="add-tag"]');
  let $textarea = $popup.find('.popup__textarea');
  let $placeholder = $popup.find('.popup__placeholder');
  let $saveBtn = $popup.find('.popup__buttons button[type="submit"]'); // кнопка "Сохранить"

  function toggleSaveBtn() {
    $saveBtn.prop('disabled', $textarea.find('.popup__tag').length === 0);
  }

  function placeCursorAtEnd(el) {
    let range = document.createRange();
    let sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  }

  // === placeholder
  $textarea.on('focus blur input', function() {
    if ($textarea.find('.popup__tag').length > 0 || $textarea.text().trim().length > 0) {
      $placeholder.hide();
    } else {
      $placeholder.show();
    }
  });

  // === добавление тега по Enter
  $textarea.on('keydown', function(event) {
    // Enter = добавить
    if (event.key === 'Enter') {
      event.preventDefault();

      let textNodes = $textarea.contents().filter(function() {
        return this.nodeType === 3 && this.nodeValue && this.nodeValue.trim() !== '';
      });

      if (textNodes.length === 0) return;

      let content = textNodes.last()[0].nodeValue.trim();
      if (content === '') return;

      addTagToList(content);
      textNodes.remove();

      if ($textarea.find('br').length === 0) {
        $textarea.append('<br>');
      }

      toggleSaveBtn();
      placeCursorAtEnd($textarea[0]);
    }

  });

  function addTagToList(text) {
    let tagsCount = $textarea.find('.popup__tag').length;
    if (tagsCount >= 15) return;

    if (text.length > 30) {
      text = text.substring(0, 30);
    }

    let existing = $textarea.find('.popup__tag span').map(function() {
      return $(this).text();
    }).get();

    if (existing.includes('#' + text)) return;

    let tagHtml = `
      <div class="popup__tag">
        <span contenteditable="false">#${text}</span>
        <button class="button button-close" type="button" aria-label="close">
          <svg viewBox="0 0 9 9" width="9" height="9">
            <use xlink:href="#other-close-icon"></use>
          </svg>
        </button>
      </div>
    `;
    $textarea.append(tagHtml);

    toggleSaveBtn();
    placeCursorAtEnd($textarea[0]);
  }

  // удаление по крестику
  $textarea.on('click', '.popup__tag .button-close', function() {
    $(this).closest('.popup__tag').remove();
    toggleSaveBtn();
    if ($textarea.find('.popup__tag').length === 0) {
      $placeholder.show();
    }
    placeCursorAtEnd($textarea[0]);
  });

  function toggleShowAllButton() {
      let $list = $('.tag__list');
      let $button = $('.tag__button');
      
      if ($list.find('.tag__item').length > 2) {
          $button.removeClass('hidden');
      } else {
          $button.addClass('hidden');
      }
  }

  // удаление тегов вручную
  $(document).on('click', '.tag__item .button-close', function() {
      $(this).closest('.tag__item').remove();
      toggleShowAllButton();
  });
  
  // сохранить
  $saveBtn.on('click', function(e) {
    e.preventDefault();

    const selectedOption = $('input[name="tag"]:checked');
    const isNoneSelected = selectedOption.val() === 'none';
    const $list = $('.tag__list');
    const $textarea = $('.popup__textarea');
    const tagValue = $('.tag__value span');
    const optionText = selectedOption.closest('.popup__label').find('span').text();
    if (selectedOption.val() === 'none') {
        tagValue.text('––');
        $('.tag__container:nth-child(2)').addClass('tag__container-hidden');
    } else {
        tagValue.text(optionText);
    }


    if (isNoneSelected) {
        $list.empty();
        toggleShowAllButton();
        return;
    }

    let content = $textarea.text().trim();
    if (!content) {
        return;
    }

  
    toggleShowAllButton();

    $saveBtn.prop('disabled', true);

    $('input[name="tag"][type="radio"]').prop('checked', false);

    $('.tag__container').removeClass('tag__container-hidden');

    let tags = content.split(/\s+/).map(tag => tag.replace(/^#/, '').trim()).filter(t => t.length > 0);

    let existingTags = $list.find('.tag__item').map(function() {
        return $(this).text().replace(/×/, '').trim();
    }).get();

    $list.find('.tag__item').remove();

    tags.forEach(tag => {
        if (existingTags.length >= 15) return; // лимит 15
        if (tag.length > 30) tag = tag.substring(0, 30);
        if (!existingTags.includes('#' + tag)) {
            let tagHtml = `
                <div class="tag__item">
                    #${tag}
                </div>
            `;
            $list.prepend(tagHtml);
            existingTags.push('#' + tag);
        }
    });

    $textarea.empty();

    $('.popup').removeClass('active');
    $('.popup__bg').removeClass('active');

    $textarea
      .toggleClass('disabled', true)
      .attr('contenteditable', 'false');
        
    if (tags.length === 0) {
      $placeholder.show();
    }
  });
}

addTag();
