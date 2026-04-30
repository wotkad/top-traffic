function addTag() {
  let $popup = $('.popup[data-popup-name="add-tag-fact"]');
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
  
  $saveBtn.on('click', function(e) {
    e.preventDefault();
    $('.popup[data-popup-name="add-tag-fact"] .popup__textarea').css('background-color', '#FBFBFB');

    let tags = [];

    $textarea.find('.popup__tag span').each(function() {
      let tagText = $(this).text().trim();
      if (tagText) tags.push(tagText);
    });

    tags = [...new Set(tags)];

    $('input[name="add-tag-fact"][type="radio"]').prop('checked', false);

    console.log('Сохранённые теги:', tags);

    $textarea.empty();
    $placeholder.show();
    $saveBtn.prop('disabled', true);

    $popup.removeClass('active');
    $('.popup__bg').removeClass('active');
    
    $textarea
        .toggleClass('disabled', true)
        .attr('contenteditable', 'false');
        
    $placeholder.show();
  });
}

addTag();