export default function setPageInitials() {
  let fullName = '';

  $('.heading:not(.heading-admin) h1.heading__title span, .heading-admin .heading__title input')
    .each(function () {
      if ($(this).is('input')) {
        fullName = $(this).val().trim();
      } else {
        fullName = $(this).text().trim();
      }
    });

  fullName = fullName.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map(word => word[0])
    .join('');

  $('.heading__avatar span').text(initials);
}

setPageInitials();