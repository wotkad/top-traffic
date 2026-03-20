$(document).ready(function () {
    let editingCell = null;
    let enterEditMode = false;
  let $currentTable = null;
  let $startCell = null;
  let isDragging = false;

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
        setCellValue($target, data[0][0]);
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
          let $cellsInRow = $row.children('td');
          for (let j = 0; j < data[i].length; j++) {
            let colIdx = startCol + j;
            let $cell = $cellsInRow.eq(colIdx);
            if (!$cell.length) continue;
            setCellValue($cell, data[i][j]);
          }
        }
      }
      e.preventDefault();
    });

  // ===== КЛИК / SHIFT =====
  $(document).on('click', 'td', function (e) {
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
  $(document).on('mousedown', 'td', function (e) {
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

  $(document).on('mouseover', 'td', function () {
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
    let cellIndex = $active.parent().children('td').index($active);
    let $target;

    switch (e.key) {
      case 'ArrowRight':
        $target = $active.nextAll('td').first();
        break;
      case 'ArrowLeft':
        $target = $active.prevAll('td').first();
        break;
      case 'ArrowDown':
        $target = $row.next().children('td').eq(cellIndex);
        break;
      case 'ArrowUp':
        $target = $row.prev().children('td').eq(cellIndex);
        break;
        case 'Enter':
          // Если редактируем — повторный Enter сохраняет и снимает фокус
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

          // Если выделена одна или несколько ячеек — вход в редактирование первой
          let $editCell = $cells.first();
          let $input = $editCell.find('.could-copy').filter('input,textarea');
          if ($editCell.hasClass('could-copy')) {
            $input = $editCell.filter('input,textarea');
          }
          if ($input.length) {
            $input.focus();
            editingCell = $editCell;
            enterEditMode = true;
            e.preventDefault();
          }
          return;
      default:
        return;
    }

    if ($target && $target.length) {
      resetSelection();
      $target.addClass('cell-selected');
      $startCell = $target;
      e.preventDefault();
    }
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

    const startCol = $start.parent().children('td').index($start);
    const endCol = $end.parent().children('td').index($end);

    const rowMin = Math.min(startRow, endRow);
    const rowMax = Math.max(startRow, endRow);

    const colMin = Math.min(startCol, endCol);
    const colMax = Math.max(startCol, endCol);

    $rows.each(function (rowIndex) {
      if (rowIndex < rowMin || rowIndex > rowMax) return;

      const $cells = $(this).children('td');

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
    return $cell.parent().children('td').index($cell);
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
      } else {
        $copyEl.text(value);
      }
    } else {
      $cell.text(value);
    }
  }
});