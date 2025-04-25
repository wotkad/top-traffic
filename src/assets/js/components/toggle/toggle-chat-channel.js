
import setAsideHeight from "../../base/common/set-aside-height";

function toggleChatChannel() {
  let button = $('.chat__trigger-channel');
  let channel = $('.chat__channel');
  let close = $('.chat__trigger-channel-close');
  button.on('click', function() {
    channel.toggleClass('active');
    setAsideHeight();
  });
  close.on('click', function() {
    channel.removeClass('active');
    setAsideHeight();
  });
}
toggleChatChannel();