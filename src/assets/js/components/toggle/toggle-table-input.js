import setTdPaddingDefault from "../../base/common/set-td-padding-default";
import setTdPadding from "../../base/common/set-td-padding";
import datePicker from "../datepicker";

function toggleTableInput() {

  $(document).on("change", ".table__checkbox input", function () {
    $(this).closest('tr').find('.table__remove').toggleClass('active', this.checked);
  });

  $(document).on("change", ".table th .table__checkbox input", function () {
    let isChecked = $(this).prop('checked');
    let $table = $(this).closest('table');

    $table.find('.table__checkbox input').prop('checked', isChecked);
    $table.find('.table__remove').toggleClass('active', isChecked);
  });

  $(document).on("click", ".table__remove", function () {
    let $row = $(this).closest("tr");
    let $prevSubrow = $row.prevAll(".subrow:first");

    $row.remove();

    setTdPaddingDefault();
    setTdPadding();

    if ($prevSubrow.length) {
        let count = $prevSubrow.nextUntil(".subrow", "tr").length;

        $prevSubrow.find("span").text(count);

        if (count === 0) {
            $prevSubrow.hide();
        }
    }
  });

  let addButton = $('.button[data-popup-name="add-administration-history-post"]');

  addButton.on('click', function() {
    let $adminHeading = $(this).closest('.heading').next().find('.subrow-admin'); // Находим нужный subrow-admin

    if ($adminHeading.length) {
      // Находим следующий .subrow после $adminHeading
      let $nextSubrow = $adminHeading.nextAll('.subrow:first');

      // Генерируем новую строку
      let newRow = $(`
        <tr>
          <td style="padding-left: 12px; min-width: 200px; max-width: 252px; padding-right: 32px;">
              <div class="flex items-center gap-x-3">
                  <div class="checkbox"><label class="input-checkbox md table__checkbox"><input type="checkbox" name="checkbox"><span></span></label></div>
                  <div class="flex items-center gap-x-1.5">
                      <img class="rounded object-cover w-[30px] h-[30px]" src="/assets/images/avatar.png" alt="tg-channel">
                      <div class="flex flex-col items-start">
                          <h3><a class="table__channel" href="#">Андрей Миронов</a></h3>
                          <a class="table__link" href="https://t.me/andreym" target="_blank">@andreym</a>
                      </div>
                  </div>
              </div>
          </td>
          <td class="only-text" style="padding-right: 32px;">
              <label class="button button-with-icon only-input datepicker-trigger">
                  <svg class="calendar-icon" viewBox="0 0 18 18" width="18" height="18">
                      <use xlink:href="#other-calendar-icon"></use>
                  </svg>
                  <input class="datepicker datepicker-single opensright" type="text" name="date" placeholder="Выберите дату" readonly="" value="дд.мм.гггг" style="width: 70px;">
                  <div class="button button-icon sm calendar-close-icon" type="button" aria-label="button">
                      <svg viewBox="0 0 10 6" width="10" height="6">
                          <use xlink:href="#other-angle-down-icon"></use>
                      </svg>
                  </div>
              </label>
          </td>
          <td style="padding-right: 32px;"><span class="status status-green">Активный</span></td>
          <td style="padding-right: 32px;">
              <div class="grid items-center gap-x-1.5 grid-cols-[30px_1fr]"><img class="rounded object-cover w-[30px] h-[30px]" src="/assets/images/avatar.png" alt="tg-channel"><span>Илья Сорокин</span></div>
          </td>
          <td class="only-text" style="padding-right: 32px;">12.12.2023</td>
          <td class="pr-2.5" style="padding-right: 32px;">
              <button class="button button-icon text-black-200 table__remove" type="button" aria-label="button">
                  <svg viewBox="0 0 18 18" width="18" height="18">
                      <use xlink:href="#other-trash-icon"></use>
                  </svg>
              </button>
          </td>
        </tr>
      `);

      // Вставляем строку после .subrow-admin, но перед следующим .subrow
      if ($nextSubrow.length) {
        newRow.insertBefore($nextSubrow);
      } else {
          newRow.insertAfter($adminHeading);
      }

      // Показываем .subrow-admin (если он был скрыт)
      $adminHeading.show();

      // Обновляем счетчик внутри .subrow-admin
      let count = $adminHeading.nextUntil('.subrow', 'tr').length;
      $adminHeading.find('span').text(count);

      datePicker();
    }
  });
}

toggleTableInput();
