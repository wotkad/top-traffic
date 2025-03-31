function addUser() {
  let $textarea = $('.popup__textarea');
  let $placeholder = $('.popup__placeholder');
  let $popupButton = $('.popup[data-popup-name="add-user"] .popup__buttons button');
    
  function togglePopupButton() {
      if ($('.popup__email').length > 0) {
        $popupButton.removeAttr('disabled');
      } else {
        $popupButton.attr('disabled', 'disabled');
      }
  }
  
  $textarea.on('focus', function() {
      $placeholder.hide();
  });
  
  $textarea.on('input', function() {
      $placeholder.hide();
      
      let $paragraph = $textarea.find('p.popup__paragraph');
      let content = $paragraph.text().trim();
      let emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      let matches = content.match(emailPattern);
      
      if (matches) {
          matches.forEach(email => {
              if ($paragraph.find(`.popup__email:contains('${email}')`).length === 0) {
                  let emailHtml = `<div class="popup__email" contenteditable="true"><span>${email}</span>
                      <button class="button button-close" type="button" aria-label="close">
                          <svg viewBox="0 0 9 9" width="9" height="9">
                              <use xlink:href="#other-close-icon"></use>
                          </svg>
                      </button>
                  </div> `;
                  
                  let newHtml = $paragraph.html().replace(email, emailHtml);
                  $paragraph.html(newHtml);
                  placeCursorAtEnd($paragraph[0]);
                  togglePopupButton();
              }
          });
      }
      
      if (content === '') {
          $paragraph.html('<br class="popup__trailing-break">');
          $placeholder.show();
      }
      togglePopupButton();
  });
  
  $textarea.on('keydown', function(e) {
      if (e.key === ' ' || e.key === 'Enter') {
          let $paragraph = $textarea.find('p.popup__paragraph');
          let content = $paragraph.text().trim();
          let emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
          let matches = content.match(emailPattern);
          
          if (matches) {
              matches.forEach(email => {
                  if ($paragraph.find(`.popup__email:contains('${email}')`).length === 0) {
                      let emailHtml = `<div class="popup__email" contenteditable="true"><span>${email}</span>
                          <button class="button button-close" type="button" aria-label="close">
                              <svg viewBox="0 0 9 9" width="9" height="9">
                                  <use xlink:href="#other-close-icon"></use>
                              </svg>
                          </button>
                      </div> `;
                      
                      let newHtml = $paragraph.html().replace(email, emailHtml);
                      $paragraph.html(newHtml);
                      placeCursorAtEnd($paragraph[0]);
                      togglePopupButton();
                  }
              });
              e.preventDefault();
          }
      }
  });
  
  $(document).on('click', '.button-close', function() {
      $(this).parent('.popup__email').remove();
      togglePopupButton();
  });
  
  function placeCursorAtEnd(el) {
      let range = document.createRange();
      let sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
  }
}
addUser();