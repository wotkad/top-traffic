function setProfilePhoto() {
  const $upload = $('.profile__upload');
  const $input = $upload.find('input[type="file"]');
  const $avatar = $upload.find('.profile__avatar img');
  const $remove = $upload.find('.profile__remove');
  const $initials = $upload.find('.profile__avatar span');

  // Загрузка фото
  $input.on('change', function() {
      const file = this.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              $avatar.attr('src', e.target.result).show();
              $remove.show();
              $initials.hide(); // Скрываем инициалы, когда есть фото
          };
          reader.readAsDataURL(file);
      }
  });

  // Удаление фото
  $remove.on('click', function(e) {
      e.preventDefault();
      $avatar.attr('src', '').hide();
      $input.val(''); // Очищаем input
      $remove.hide();
      $initials.show(); // Показываем инициалы обратно
  });
}

setProfilePhoto();
