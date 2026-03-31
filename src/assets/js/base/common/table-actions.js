$(document).ready(function () {
  let editingCell = null;
  let enterEditMode = false;
  let $currentTable = null;
  let $startCell = null;
  let isDragging = false;
  let skipBlurReset = false;
  let prevSelectedCell = null;

    // ===== PASTE (CTRL + V) =====
    $(document).on('paste', function (e) {
      if (!$currentTable) return;
      const $cells = $('.cell-selected');
      if (!$cells.length) return;

      let clipboardData = e.originalEvent.clipboardData || window.clipboardData;
      if (!clipboardData) return;
      let pastedData = clipboardData.getData('text');
      if (!pastedData) return;

      // Разбиваем на строки и столбцы
      let rows = pastedData.split(/\r?\n/).filter(r => r.length > 0);
      let data = rows.map(row => row.split('\t'));

      // Если вставляется один элемент — заменяем содержимое выделенной ячейки
      if (data.length === 1 && data[0].length === 1) {
        let $target = $cells.last();

        // Проверяем, есть ли input/textarea внутри ячейки
        let $input = $target.find('input, textarea');
        if ($target.hasClass('could-copy') && $target.is('input, textarea')) {
          $input = $target;
        }

        if ($input.length) {
          $input.val(data[0][0]);

          // Если сейчас редактируем эту ячейку — ставим курсор в конец
          if (editingCell && editingCell[0] === $target[0]) {
            let el = $input[0];
            setTimeout(function() {
              if (el && el.setSelectionRange) {
                let len = $input.val().length;
                el.setSelectionRange(len, len);
              }
            }, 0);
          }
        }
      } else {
        // Вставка блока
        // Определяем верхний левый угол выделения
        let $start = $cells.first();
        let startRow = getRowIndex($start);
        let startCol = getColIndex($start);

        const $rows = $currentTable.find('tr').filter(function () {
          return $(this).closest('table')[0] === $currentTable[0];
        });

        for (let i = 0; i < data.length; i++) {
          let rowIdx = startRow + i;
          let $row = $rows.eq(rowIdx);
          if (!$row.length) break;
          let $cellsInRow = $row.children('td.could-selected');
          for (let j = 0; j < data[i].length; j++) {
            let colIdx = startCol + j;
            let $cell = $cellsInRow.eq(colIdx);

            // Проверяем наличие input/textarea
            let $input = $cell.find('input, textarea');
            if ($cell.hasClass('could-copy') && $cell.is('input, textarea')) {
              $input = $cell;
            }

            if ($input.length) {
              $input.val(data[i][j]);
              
              // Если редактируем текущую ячейку — курсор в конец
              if (editingCell && editingCell[0] === $cell[0]) {
                let el = $input[0];
                setTimeout(function() {
                  if (el && el.setSelectionRange) {
                    let len = $input.val().length;
                    el.setSelectionRange(len, len);
                  }
                }, 0);
              }
            }
          }
        }
      }
      e.preventDefault();
    });

  // ===== КЛИК / SHIFT =====
  $(document).on('click', 'td.could-selected', function (e) {
    const $cell = $(this);
    const $table = $cell.closest('table');

    if (!$currentTable || $currentTable[0] !== $table[0]) {
      resetSelection();
      $currentTable = $table;
    }

    if (e.shiftKey && $startCell) {
      selectRange($startCell, $cell);
      return;
    }

    resetSelection();
    $cell.addClass('cell-selected');
    $startCell = $cell;
  });

  // ===== DRAG SELECTION =====
  $(document).on('mousedown', 'td.could-selected', function (e) {
    if (e.shiftKey) return;

    const $cell = $(this);
    const $table = $cell.closest('table');

    if (!$currentTable || $currentTable[0] !== $table[0]) {
      resetSelection();
      $currentTable = $table;
    }

    isDragging = true;
    $startCell = $cell;

    resetSelection();
    $cell.addClass('cell-selected');
  });

  $(document).on('mouseover', 'td.could-selected', function () {
    if (!isDragging || !$startCell) return;

    const $cell = $(this);
    if ($cell.closest('table')[0] !== $currentTable[0]) return;

    selectRange($startCell, $cell);
  });

  $(document).on('mouseup', function () {
    isDragging = false;
  });

  // ===== СТРЕЛКИ =====
  $(document).on('keydown', function (e) {
    if (!$currentTable) return;

    const $cells = $('.cell-selected');
    if (!$cells.length) return;

    let $active = $cells.last();
    let $row = $active.closest('tr');
    let cellIndex = $active.parent().children('td.could-selected').index($active);
    let $target;

    switch (e.key) {
      case 'ArrowRight':
        $target = $active.nextAll('td.could-selected').first();
        e.preventDefault();
        break;
      case 'ArrowLeft':
        $target = $active.prevAll('td.could-selected').first();
        e.preventDefault();
        break;
      case 'ArrowDown': {
        const $rows = $currentTable.find('tr').filter(function () {
          return $(this).closest('table')[0] === $currentTable[0];
        });
        let rowIdx = $rows.index($row);
        const currentCellsCount = $row.children('td.could-selected').length;

        let found = false;
        for (let i = rowIdx + 1; i < $rows.length; i++) {
          const $nextRow = $rows.eq(i);
          const nextCells = $nextRow.children('td.could-selected');

          if (nextCells.length === currentCellsCount) {
            $target = nextCells.eq(cellIndex);
            found = true;
            break;
          }
        }
        // если не нашли подходящую строку — остаёмся на текущей
        if (!found) $target = $active;
        e.preventDefault();
        break;
      }

      case 'ArrowUp': {
        const $rows = $currentTable.find('tr').filter(function () {
          return $(this).closest('table')[0] === $currentTable[0];
        });
        let rowIdx = $rows.index($row);
        const currentCellsCount = $row.children('td.could-selected').length;

        let found = false;
        for (let i = rowIdx - 1; i >= 0; i--) {
          const $prevRow = $rows.eq(i);
          const prevCells = $prevRow.children('td.could-selected');

          if (prevCells.length === currentCellsCount) {
            $target = prevCells.eq(cellIndex);
            found = true;
            break;
          }
        }
        // если не нашли подходящую строку — остаёмся на текущей
        if (!found) $target = $active;
        e.preventDefault();
        break;
      }
      case 'Enter':
        // если редактируем — выходим
        if (editingCell) {
          let $input = editingCell.find('.could-copy').filter('input,textarea');
          if (editingCell.hasClass('could-copy')) {
            $input = editingCell.filter('input,textarea');
          }

          if ($input.length) {
            skipBlurReset = true; // ← ВАЖНО
            $input.blur();
            $('.table-input-new__list.active').removeClass('active');
          }

          // ❗ НЕ трогаем selection
          // просто оставляем текущую ячейку выделенной

          editingCell = null;
          enterEditMode = false;
          e.preventDefault();
          return;
        }

        // вход в редактирование
        let $editCell = $cells.first();

        let $input = $editCell.find('.could-copy').filter('input,textarea');
        if ($editCell.hasClass('could-copy')) {
          $input = $editCell.filter('input,textarea');
        }

        if ($editCell.find('.dropdown')) {
          selectCell($editCell);
        }

        if ($input.length) {
          // ❗ НЕ сбрасываем selection
          // просто гарантируем что ячейка выделена
          selectCell($editCell);

          $input.focus();

          setTimeout(function() {
            let el = $input[0];
            if (el && el.setSelectionRange) {
              let len = $input.val().length;
              el.setSelectionRange(len, len);
            }
          }, 0);

          editingCell = $editCell;
          enterEditMode = true;
          e.preventDefault();
        }

        return;
      case 'Escape':
        // Снять фокус с input/textarea и выйти из режима редактирования
        if (editingCell) {
          let $input = editingCell.find('.could-copy').filter('input,textarea');
          if (editingCell.hasClass('could-copy')) {
            $input = editingCell.filter('input,textarea');
          }
          if ($input.length) {
            $input.blur();
            editingCell = null;
            enterEditMode = false;
            e.preventDefault();
            return;
          }
        }
          // Также снимаем выделение с ячеек
          resetSelection();
          break;
      default:
        return;
    }

      if ($target && $target.length) {
        // 🔥 ВАЖНО: сначала выходим из редактирования
        exitEditMode();

        selectCell($target);
        scrollToCellIfNeeded($target);
      }
  });

  function selectCell($cell) {
    if (!$cell || !$cell.length) return;

    // 🔴 закрываем dropdown у предыдущей ячейки
    if (prevSelectedCell && prevSelectedCell.length) {
      const $prevBtn = prevSelectedCell.find('.dropdown__button');
      const $prevList = prevSelectedCell.find('.dropdown__list');

      if ($prevBtn.length) {
        $prevBtn.removeClass('active');
        $prevList.removeClass('active');
      }
    }

    // снимаем выделение
    resetSelection();

    // ставим новое
    $cell.addClass('cell-selected');
    $startCell = $cell;

    // 🟢 открываем dropdown у новой
    const $dropdownBtn = $cell.find('.dropdown__button');

    if ($dropdownBtn.length) {
      setTimeout(() => {
        $dropdownBtn.first().trigger('click');
      }, 0);
    }

    // сохраняем текущую как предыдущую
    prevSelectedCell = $cell;
  }

  function scrollToCellIfNeeded($cell) {
    if (!$cell || !$cell.length) return;

    const container = $cell.closest('.content-scroll'); // ❗ родитель со скроллом
    if (!container.length) return;

    const containerEl = container[0];
    const cellEl = $cell[0];

    const containerRect = containerEl.getBoundingClientRect();
    const cellRect = cellEl.getBoundingClientRect();

    // 🔽 Проверка вертикали
    if (cellRect.bottom > containerRect.bottom) {
      containerEl.scrollTop += (cellRect.bottom - containerRect.bottom);
    } else if (cellRect.top < containerRect.top) {
      containerEl.scrollTop -= (containerRect.top - cellRect.top);
    }

    // 🔽 Проверка горизонтали
    if (cellRect.right > containerRect.right) {
      containerEl.scrollLeft += (cellRect.right - containerRect.right+1);
    } else if (cellRect.left < containerRect.left) {
      containerEl.scrollLeft -= (containerRect.left - cellRect.left+1);
    }
  }

  function exitEditMode() {
    if (!editingCell) return;

    let $input = editingCell.find('.could-copy').filter('input,textarea');
    if (editingCell.hasClass('could-copy')) {
      $input = editingCell.filter('input,textarea');
    }

    if ($input.length) {
      skipBlurReset = true;
      $input.blur();
    }

    $('.table-input-new__list.active').removeClass('active');

    editingCell = null;
    enterEditMode = false;
  }

  // Снять фокус с input/textarea и убрать active с .table-input-new__list по клику вне таблицы
  $(document).on('mousedown', function(e) {
    const $target = $(e.target);

    // если клик внутри текущей редактируемой ячейки — не трогаем
    if (editingCell && $target.closest(editingCell).length) {
      return;
    }

    // если клик внутри любой таблицы — не сбрасываем фокус
    if ($target.closest('table').length) {
      return;
    }

    // клик вне таблицы — полный сброс
    resetSelection();
    $('.table-input-new__list.active').removeClass('active');

    if (editingCell) {
      let $input = editingCell.find('.could-copy').filter('input,textarea');
      if (editingCell.hasClass('could-copy')) {
        $input = editingCell.filter('input,textarea');
      }

      if ($input.length) {
        $input.blur();
      }

      editingCell = null;
      enterEditMode = false;
    }
  });

  $(document).on('dblclick', 'td.could-selected', function () {
    const $cell = $(this);

    let $input = $cell.find('.could-copy').filter('input,textarea');
    if ($cell.hasClass('could-copy')) {
      $input = $cell.filter('input,textarea');
    }

    if ($cell.find('.dropdown')) {
      selectCell($cell);
    }

    if (!$input.length) return;

    $input.focus();

    setTimeout(() => {
      let el = $input[0];
      if (el && el.setSelectionRange) {
        let len = $input.val().length;
        el.setSelectionRange(len, len);
      }
    }, 0);

    editingCell = $cell;
    enterEditMode = true;
  });

  // При потере фокуса input/textarea — закрываем список только если фокус ушёл вне td
  $(document).on('blur', 'input,textarea', function(e) {
    setTimeout(() => {

      // если это blur из Enter — пропускаем
      if (skipBlurReset) {
        skipBlurReset = false;
        return;
      }

      const related = e.relatedTarget;

      // если фокус ушёл внутрь той же ячейки — ничего не делаем
      if (related && $(related).closest('td.could-selected').length) {
        return;
      }

      // если фокус вообще ушёл в никуда (body) — тоже НЕ трогаем
      // это как раз твой случай с textarea + Enter
      if (!related) {
        return;
      }

      // только реальный уход вне таблицы
      if (!$(related).closest('table').length) {
        $('.table-input-new__list.active').removeClass('active');
        resetSelection();
        editingCell = null;
        enterEditMode = false;
      }

    }, 0);
  });

  // ===== COPY (CTRL + C) =====
  $(document).on('keydown', function (e) {
    if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'c') return;

    const text = buildCopyMatrix();
    if (!text) return;

    copyToClipboard(text);
    e.preventDefault();
  });

  // ===== ВСПОМОГАТЕЛЬНЫЕ =====

  function resetSelection() {
    $('.cell-selected').removeClass('cell-selected');
  }

  function selectRange($start, $end) {
    resetSelection();

    const $rows = $currentTable.find('tr').filter(function () {
      return $(this).closest('table')[0] === $currentTable[0];
    });

    const startRow = $rows.index($start.closest('tr'));
    const endRow = $rows.index($end.closest('tr'));

    const startCol = $start.parent().children('td.could-selected').index($start);
    const endCol = $end.parent().children('td.could-selected').index($end);

    const rowMin = Math.min(startRow, endRow);
    const rowMax = Math.max(startRow, endRow);

    const colMin = Math.min(startCol, endCol);
    const colMax = Math.max(startCol, endCol);

    $rows.each(function (rowIndex) {
      if (rowIndex < rowMin || rowIndex > rowMax) return;

      const $cells = $(this).children('td.could-selected');

      $cells.each(function (colIndex) {
        if (colIndex >= colMin && colIndex <= colMax) {
          $(this).addClass('cell-selected');
        }
      });
    });
  }

  function buildCopyMatrix() {
    if (!$currentTable) return '';

    const $cells = $('.cell-selected');
    if (!$cells.length) return '';

    let minRow = Infinity, maxRow = -Infinity;
    let minCol = Infinity, maxCol = -Infinity;

    const map = {};

    $cells.each(function () {
      const $cell = $(this);

      const rowIndex = getRowIndex($cell);
      const colIndex = getColIndex($cell);

      if (!map[rowIndex]) map[rowIndex] = {};

      let value = '';

      // только .could-copy
      let $copyEl = $cell.find('.could-copy').first();
      if ($cell.hasClass('could-copy')) {
        $copyEl = $cell;
      }

      if ($copyEl.length) {
        if ($copyEl.is('input, textarea')) {
          value = $copyEl.val();
        } else {
          value = $copyEl.text().trim();
        }
      }

      map[rowIndex][colIndex] = value;

      minRow = Math.min(minRow, rowIndex);
      maxRow = Math.max(maxRow, rowIndex);
      minCol = Math.min(minCol, colIndex);
      maxCol = Math.max(maxCol, colIndex);
    });

    let result = [];

    for (let r = minRow; r <= maxRow; r++) {
      let row = [];

      for (let c = minCol; c <= maxCol; c++) {
        row.push(map[r]?.[c] ?? '');
      }

      result.push(row.join('\t'));
    }

    return result.join('\n');
  }

  function getRowIndex($cell) {
    const $rows = $currentTable.find('tr').filter(function () {
      return $(this).closest('table')[0] === $currentTable[0];
    });

    return $rows.index($cell.closest('tr'));
  }

  function getColIndex($cell) {
    return $cell.parent().children('td.could-selected').index($cell);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;

    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  // ====== ВСПОМОГАТЕЛЬНАЯ: Установка значения ячейки ======
  function setCellValue($cell, value) {
    let $copyEl = $cell.find('.could-copy').first();
    if ($cell.hasClass('could-copy')) {
      $copyEl = $cell;
    }
    if ($copyEl.length) {
      if ($copyEl.is('input, textarea')) {
        $copyEl.val(value);
        // Если сейчас в режиме редактирования этой ячейки — ставим курсор в конец
        if (editingCell && editingCell[0] === $cell[0]) {
          let el = $copyEl[0];
          setTimeout(function() {
            if (el && el.setSelectionRange) {
              let len = $copyEl.val().length;
              el.setSelectionRange(len, len);
            }
          }, 0);
        }
      } else {
        $copyEl.text(value);
      }
    } else {
      $cell.text(value);
    }
  }
});