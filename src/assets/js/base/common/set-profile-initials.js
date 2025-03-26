function setProfileInitials() {
  const $title = $('.header__dropdown .dropdown__title');
  let fullName = $title.text().trim();

  fullName = fullName.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');

  const initials = fullName
    .split(' ')
    .map(word => word[0])
    .join('');

  $('.profile__avatar span').text(initials);
}
setProfileInitials();