
import setAsideHeight from "../../base/common/set-aside-height";

function toggleChatSearch() {
  let button = $('.chat__trigger-search');
  let search = $('.chat__search');
  let close = $('.chat__trigger-search-close');
  button.on('click', function() {
    search.toggleClass('active');
    setAsideHeight();
  });
  close.on('click', function() {
    search.removeClass('active');
    setAsideHeight();
  });
}
toggleChatSearch();