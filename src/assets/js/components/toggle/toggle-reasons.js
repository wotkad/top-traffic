function toggleReasons() {
  $(document).on('input', '.popup[data-popup-name="add-approved-lists"] .dropdown-priority .dropdown__item input', function () {
      const popup = $('.popup[data-popup-name="add-approved-lists"]');
      const greenChecked = popup.find('.dropdown-priority .dropdown__item input[data-color="priority-green"]').is(':checked');
      const redChecked   = popup.find('.dropdown-priority .dropdown__item input[data-color="priority-red"]').is(':checked');

      const reasons = popup.find('.reasons__items');

      if (greenChecked) {
          // Добавляем disabled
          reasons.addClass('disabled');

          // Снимаем ВСЕ чекбоксы внутри reasons__items
          reasons.find('input[type="checkbox"]').prop('checked', false);

      } else if (redChecked) {
          // Убираем disabled
          reasons.removeClass('disabled');
      }
  });
}
toggleReasons();