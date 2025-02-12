import setTdPaddingDefault from "../../base/common/set-td-padding-default";
import setTdPadding from "../../base/common/set-td-padding";
import datePicker from "../datepicker";
import toggleDropdown from "./toggle-dropdown";

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function assignAdminIds() {
  $(".selector__container[data-id='administration-history'] table tr").each(function () {
    let uniqueId = generateId();
    $(this).attr("data-admin-id", uniqueId);
    $(this).find(".table__remove").attr("data-admin-id", uniqueId);
  });
}

function toggleTableInput() {
  assignAdminIds();

  $(document).on("change", ".table__checkbox input", function () {
    $(this).closest("tr").find(".table__remove").toggleClass("active", this.checked);
  });

  $(document).on("change", ".table th .table__checkbox input", function () {
    let isChecked = $(this).prop("checked");
    let $table = $(this).closest("table");
    
    $table.find(".table__checkbox input").prop("checked", isChecked);
    $table.find(".table__remove").toggleClass("active", isChecked);
  });

  $(document).on("click", ".table__remove", function () {
    let id = $(this).attr("data-admin-id");
    $(".table__delete").attr("data-admin-id", id);
  });

  $(document).on("click", ".table__delete", function () {
    let id = $(this).attr("data-admin-id");
    let $row = $("tr[data-admin-id='" + id + "']");
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
    let $adminHeading = $(this).closest('.heading').next().find('.subrow-admin');
    if ($adminHeading.length) {
      let $nextSubrow = $adminHeading.nextAll('.subrow:first');
      let newId = generateId();
      let newRow = $(`
        <tr data-admin-id="${newId}">
          <td style="padding: 6.5px 32px 6.5px 12px; min-width: 200px; max-width: 252px;">
            <div class="flex items-center w-full gap-x-3 h-[33px]">
              <div class="checkbox"><label class="input-checkbox md table__checkbox"><input checked type="checkbox" name="checkbox"><span></span></label></div>
              <div class="dropdown dropdown-radios dropdown-select-admin">
                <div class="dropdown__container">
                  <div class="dropdown__button">
                    <div class="dropdown__inner">
                      <div class="dropdown__title">Выберите администратора</div>
                    </div>
                    <button class="button button-icon sm" type="button" aria-label="button">
                      <svg viewBox="0 0 10 6" width="10" height="6">
                        <use xlink:href="#other-angle-down-icon"></use>
                      </svg>
                    </button>
                  </div>
                  <div class="dropdown__list">
                    <div class="search ">
                      <label class="search__label">
                        <input class="search__input " type="search" autocomplete="on" placeholder="Поиск..." name="search">
                        <svg viewBox="0 0 18 18" width="18" height="18">
                          <use xlink:href="#other-search-icon"></use>
                        </svg>
                      </label>
                    </div>
                    <div class="dropdown__items">
                      <label class="dropdown__item" data-href="https://t.me/andreym" data-title="@andreym">
                        <img class="dropdown__image" src="/assets/images/user-image.png" alt="image"><input type="radio" name="radio-dropdown-radios dropdown-select-admin">
                        <p>ООО “ИП”</p>
                      </label>
                      <label class="dropdown__item" data-href="https://t.me/andreym" data-title="@andreym">
                        <img class="dropdown__image" src="/assets/images/avatar.png" alt="image"><input type="radio" name="radio-dropdown-radios dropdown-select-admin">
                        <p>ООО “ИП”</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td class="only-text" style="padding-right: 32px;">
              <label class="button button-with-icon only-input start-day datepicker-trigger">
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
          <td style="padding-right: 32px;">
            <label class="button button-with-icon only-input status__calendar end-day datepicker-trigger">
              <span class="status status-green status__trigger">Активный</span>
              <input class="datepicker datepicker-single opensright" type="text" name="date" placeholder="дд.мм.гггг" readonly="" value="дд.мм.гггг" style="width: 70px;">
              <div class="button button-icon sm calendar-close-icon" type="button" aria-label="button">
                <svg viewBox="0 0 10 6" width="10" height="6">
                  <use xlink:href="#other-angle-down-icon"></use>
                </svg>
              </div>
            </label>
          </td>
          <td style="padding-right: 32px;">
              <div class="grid items-center gap-x-1.5 grid-cols-[30px_1fr]"><img class="rounded object-cover w-[30px] h-[30px]" src="/assets/images/avatar.png" alt="tg-channel"><span>Илья Сорокин</span></div>
          </td>
          <td class="only-text" style="padding-right: 32px;">12.12.2023</td>
          <td class="pr-2.5" style="padding-right: 32px;">
              <button class="button button-icon text-black-200 table__remove active" type="button" aria-label="button" data-popup-name="delete-admin-post" data-admin-id="${newId}">
                  <svg viewBox="0 0 18 18" width="18" height="18">
                    <use xlink:href="#other-trash-icon"></use>
                  </svg>
              </button>
          </td>
        </tr>
      `);

      if ($nextSubrow.length) {
        newRow.insertBefore($nextSubrow);
      } else {
        newRow.insertAfter($adminHeading);
      }
      
      $adminHeading.show();
      let count = $adminHeading.nextUntil('.subrow', 'tr').length;
      $adminHeading.find('span').text(count);

      datePicker();
      toggleDropdown();
    }
  });
}

toggleTableInput();
