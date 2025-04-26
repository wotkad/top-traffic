export default function setCommentInitials() {
  $('.chat-message__comment').each(function() {
    const $title = $(this).find('.chat-message__head h3').first();
    let fullName = $title.text().trim();

    fullName = fullName.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');

    const initials = fullName
      .split(' ')
      .map(word => word[0])
      .join('');

      $(this).find('.chat-message__avatar span').text(initials);
  });
  
}
setCommentInitials();