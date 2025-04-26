function chatSearch() {
  let currentMatchIndex = -1;
  let matches = [];
  const $searchInput = $('.chat__search .search__input');
  const $searchCounter = $('.search__counter');
  const $nextBtn = $('.next-search-el');
  const $prevBtn = $('.prev-search-el');
  const $messagesContainer = $('.chat__messages');
  const $closeSearchBtn = $('.chat__trigger-search-close');

  // Функция очистки поиска
  const clearSearch = () => {
    // Восстанавливаем оригинальный текст всех сообщений
    $messagesContainer.find('.chat-message__author__wrapper > p').each(function() {
      const $p = $(this);
      if ($p.data('original-html')) {
        $p.html($p.data('original-html'));
      }
    });

    // Сбрасываем состояние поиска
    $searchInput.val('');
    matches = [];
    currentMatchIndex = -1;
    $searchCounter.hide();
    
    // Удаляем все классы подсветки
    $('.highlight').removeClass('active');
    $('.highlight').contents().unwrap(); // Удаляем span.highlight, сохраняя текст
  };

  // Обработчик закрытия поиска
  $closeSearchBtn.on('click', clearSearch);

  // Обновление счетчика
  const updateCounter = () => {
    if (matches.length > 0) {
      $searchCounter.text(`${currentMatchIndex + 1} из ${matches.length}`).show();
    } else {
      $searchCounter.hide();
    }
  };

  // Подсветка текущего активного совпадения
  const highlightCurrentMatch = () => {
    $('.highlight.active').removeClass('active');
    if (matches.length > 0 && currentMatchIndex >= 0) {
      $(matches[currentMatchIndex].highlight).addClass('active');
    }
  };

  // Скролл к указанному совпадению
  const scrollToMatch = (index) => {
    if (matches.length === 0 || index < 0 || index >= matches.length) return;
    
    currentMatchIndex = index;
    updateCounter();
    highlightCurrentMatch();
    
    const $match = $(matches[index].element);
    const container = $messagesContainer[0];
    
    if (!$match.length || !container) return;
    
    const matchOffset = $match.offset().top;
    const containerOffset = $messagesContainer.offset().top;
    const relativePosition = matchOffset - containerOffset;
    const scrollTo = relativePosition - (container.clientHeight / 3) + $messagesContainer.scrollTop();
    
    $messagesContainer.stop().animate({ scrollTop: scrollTo }, 300);
  };

  // Навигация по результатам
  $nextBtn.on('click', () => {
    if (matches.length === 0) return;
    const prevIndex = Math.min(currentMatchIndex + 1, matches.length - 1);
    scrollToMatch(prevIndex);
  });

  $prevBtn.on('click', () => {
    if (matches.length === 0) return;
    const nextIndex = Math.max(currentMatchIndex - 1, 0);
    scrollToMatch(nextIndex);
  });

  // Обработчик поиска
  $searchInput.on('input', function() {
    const searchText = $(this).val().toLowerCase().trim();
    const $allMessages = $messagesContainer.find('.chat-message__author__wrapper > p');
    
    // Восстановление оригинального текста
    $allMessages.each(function() {
      const $p = $(this);
      if ($p.data('original-html')) {
        $p.html($p.data('original-html'));
      }
    });

    // Сброс состояния поиска
    matches = [];
    currentMatchIndex = -1;
    $('.highlight').removeClass('active');
    
    if (!searchText) {
      $searchCounter.hide();
      return;
    }

    // Поиск совпадений
    const messagesArray = $allMessages.get();
    
    for (let i = messagesArray.length - 1; i >= 0; i--) {
      const $p = $(messagesArray[i]);
      
      if (!$p.data('original-html')) {
        $p.data('original-html', $p.html());
      }

      const textNodes = [];
      let fullText = '';
      
      $p.contents().each(function() {
        if (this.nodeType === 3) {
          const text = this.nodeValue;
          if (text.trim()) {
            fullText += text;
            textNodes.push(this);
          }
        }
      });

      if (fullText.toLowerCase().includes(searchText)) {
        const newContent = document.createDocumentFragment();
        let lastPos = 0;
        
        textNodes.forEach(node => {
          const nodeText = node.nodeValue;
          const lowerText = nodeText.toLowerCase();
          let startPos = 0;
          
          while ((startPos = lowerText.indexOf(searchText, lastPos)) >= 0) {
            if (startPos > lastPos) {
              newContent.appendChild(document.createTextNode(
                nodeText.substring(lastPos, startPos)
              ));
            }
            
            const highlight = document.createElement('span');
            highlight.className = 'highlight';
            highlight.textContent = nodeText.substring(
              startPos, 
              startPos + searchText.length
            );
            newContent.appendChild(highlight);
            
            matches.push({
              element: $p.closest('.chat-message__author'),
              highlight: highlight
            });
            
            lastPos = startPos + searchText.length;
          }
          
          if (lastPos < nodeText.length) {
            newContent.appendChild(document.createTextNode(
              nodeText.substring(lastPos)
            ));
          }
        });
        
        $p.contents().filter(function() {
          return this.nodeType === 3;
        }).remove();
        
        $p.prepend(newContent);
      }
    }
    
    if (matches.length > 0) {
      scrollToMatch(0);
    } else {
      $searchCounter.hide();
    }
  });
}

// Инициализация
chatSearch();