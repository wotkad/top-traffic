function toggleReasons() {
  $(document).on('input', '.popup[data-popup-name="add-approved-lists"], .popup[data-popup-name="edit-approved-lists"] .dropdown-priority .dropdown__item input', function () {

      const popup = $(this).closest('.popup'); // нужный попап

      const greenChecked = popup
          .find('.dropdown-priority .dropdown__item input[data-color="priority-green"]')
          .is(':checked');

      const redChecked = popup
          .find('.dropdown-priority .dropdown__item input[data-color="priority-red"]')
          .is(':checked');

      const reasons = popup.find('.reasons__items');

      if (greenChecked) {
          reasons.addClass('disabled');
          reasons.find('input[type="checkbox"]').prop('checked', false);
      } else if (redChecked) {
          reasons.removeClass('disabled');
      }
  });
}

toggleReasons();
