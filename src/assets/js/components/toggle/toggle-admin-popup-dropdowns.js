function toggleAdminPopupDropdowns() {
  $('.popup__label input[type="checkbox"]').on('change', function () {
    const $checkbox = $(this);
    const id = $checkbox.data('id');

    const $allCheckboxes = $('.popup[data-popup-name="add-admin"] .popup__label input[type="checkbox"]');
    const checkedCount = $allCheckboxes.filter(':checked').length;

    if (!$checkbox.is(':checked') && checkedCount === 0) { $checkbox.prop('checked', true); return; }

    // показываем / скрываем блок
    const $target = $('.popup__col__dropdown[data-id="' + id + '"]');

    if ($checkbox.is(':checked')) {
      $target.show();
    } else {
      $target.hide();
    }
  });
}
toggleAdminPopupDropdowns();