export default function setCommentInitials() {
  $('.message__comment').each(function() {
    const $title = $(this).find('.message__head h3').first();
    let fullName = $title.text().trim();

    fullName = fullName.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');

    const initials = fullName
      .split(' ')
      .map(word => word[0])
      .join('');

      $(this).find('.message__avatar span').text(initials);
  });
  
}
setCommentInitials();