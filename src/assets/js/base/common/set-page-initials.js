function setPageInitials() {
  const $title = $('h1.heading__title');
  let fullName = $title.text().trim();

  fullName = fullName.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');

  const initials = fullName
    .split(' ')
    .map(word => word[0])
    .join('');

  $('.heading__avatar span').text(initials);
}
setPageInitials();