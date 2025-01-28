import setTdPadding from '../../base/common/set-td-padding';
import setTdPaddingDefault from '../../base/common/set-td-padding-default';

function toggleFilterSort() {
  let button = $('.table th');
  button.on('click', function() {
    button.not(this).removeClass('sorted');
    button.not(this).find('.table__sortbutton').hide();
    $(this).addClass('sorted');
    $(this).find('.table__sortbutton').show();
    setTdPadding();
    setTdPaddingDefault();
  });
}
toggleFilterSort();