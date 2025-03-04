import setTdPaddingDefault from "../../base/common/set-td-padding-default";
import setTdPadding from "../../base/common/set-td-padding";
import toggleDropdown from "./toggle-dropdown";

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function toggleTableSelected() {
  let button = $('.table__toggle');
  let clear = $('.table__clear');

  button.on('click', function() {
    $(this).closest('.table__selected').next().find('.table-selected').toggleClass('active');
    $(this).toggleClass('active');

    setTdPaddingDefault();
    setTdPadding();
  });

  clear.on('click', function() {
    $(this).closest('.table__selected').next().find('.table-selected').removeClass('active');
    button.removeClass('active');

    // Очищаем все выбранные элементы
    $('.table-selected tbody').empty();
    $('.table-selected').hide();

    // Снимаем галочку со всех чекбоксов в попапе
    $('.table-select input[type="checkbox"]').prop('checked', false);
    updateSelectedCount();
  });

  let checkboxes = $('.table-select tbody input[type="checkbox"]');

  checkboxes.each(function() {
    let selectedRow = $(this).closest('tr');
    if (!selectedRow.attr('id')) {
      selectedRow.attr('id', generateId());
    }
  });

  checkboxes.on('change', function() {
    let selectedRow = $(this).closest('tr');
    let rowId = selectedRow.attr('id');

    if ($(this).prop('checked')) {
      $('.table-selected tbody').append(`
        <tr id="${rowId}">
          <td class="fixed-td fixed-td-border" style="z-index: 10; padding: 6.5px 32px 6.5px 12px; min-width: 280px; max-width: 280px;">
            <div class="flex items-center w-full gap-x-3 h-[33px]">
              <button class="button button-icon text-black-200 table-remove-row" type="button" aria-label="button">
                <svg viewBox="0 0 18 18" width="18" height="18">
                  <use xlink:href="#other-trash-icon"></use>
                </svg>
              </button>
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
            <div class="dropdown dropdown-base">
              <div class="dropdown__container">
                <div class="dropdown__button">
                  <div class="dropdown__inner">
                    <div class="dropdown__title">1/24</div>
                  </div>
                  <button class="button button-icon sm" type="button" aria-label="button">
                    <svg viewBox="0 0 10 6" width="10" height="6">
                      <use xlink:href="#other-angle-down-icon"></use>
                    </svg>
                  </button>
                </div>
                <div class="dropdown__list">
                  <label class="dropdown__item">
                    <input type="radio" name="radio-add-channel-radio">
                    <p>Все</p>
                  </label>
                  <label class="dropdown__item">
                    <input class="filled" type="radio" name="radio-add-channel-radio" checked="">
                    <p>1/24</p>
                  </label>
                  <label class="dropdown__item">
                    <input type="radio" name="radio-add-channel-radio">
                    <p>1/48</p>
                  </label>
                  <label class="dropdown__item">
                    <input type="radio" name="radio-add-channel-radio">
                    <p>1/72</p>
                  </label>
                  <label class="dropdown__item">
                    <input type="radio" name="radio-add-channel-radio">
                    <p>Нативный</p>
                  </label>
                </div>
              </div>
            </div>
          </td>
          <td class="only-text" style="padding-right: 32px;">1/24</td>
          <td class="only-text" style="padding-right: 32px;">Интернет технологии</td>
          <td class="only-text" style="padding-right: 32px;">Андрей Миронов</td>
          <td class="only-text text-right" style="padding-right: 32px;">999 999</td>
          <td class="only-text text-right" style="padding-right: 32px;">152 564</td>
          <td class="only-text text-right" style="padding-right: 32px;">999 999</td>
          <td class="only-text text-right" style="padding-right: 32px;">999 999</td>
          <td class="only-text text-right" style="padding-right: 32px;">0,16</td>
          <td class="only-text text-right" style="padding-right: 32px;">152 564</td>
          <td class="only-text text-right" style="padding-right: 32px;">152 564</td>
          <td class="only-text text-right" style="padding-right: 32px;">152 564</td>
          <td class="only-text text-right" style="padding-right: 32px;">16</td>
          <td class="only-text text-right" style="padding-right: 32px;">25,5%</td>
          <td class="only-text text-right" style="padding-right: 32px;">25,5%</td>
          <td class="only-text text-right" style="padding-right: 32px;">25,5%</td>
          <td class="only-text text-right" style="padding-right: 32px;">25,5%</td>
          <td class="only-text" style="padding-right: 32px;"><a href="https://t.me/futuread" target="_blank">https://t.me/futuread</a></td>
          <td class="only-text" style="padding-right: 32px;">да</td>
          <td class="only-text" style="padding-right: 32px;">возможно</td>
          <td class="only-text" style="padding-right: 32px;">да</td>
          <td class="only-text" style="padding-right: 32px;">возможно</td>
          <td class="only-text" style="padding-right: 32px;">да</td>
          <td class="only-text" style="padding-right: 32px;">возможно</td>
          <td class="only-text" style="padding-right: 32px;">да</td>
          <td class="only-text audience" style="padding-right: 32px;">
            <div class="flex justify-center gap-x-5"><span class="table__category male">0,25%</span><span class="table__category female">0,54%</span></div>
          </td>
          <td class="only-text adult" style="padding-right: 32px;">
            <div class="flex justify-center gap-x-5"><span class="table__category posts">0,25%</span><span class="table__category words">0,54%</span></div>
          </td>
          <td class="only-text policy" style="padding-right: 32px;">
            <div class="flex justify-center gap-x-5"><span class="table__category posts">0,25%</span><span class="table__category words">0,54%</span></div>
          </td>
          <td class="only-text horror" style="padding-right: 32px;">
            <div class="flex justify-center gap-x-5"><span class="table__category posts">0,25%</span><span class="table__category words">0,54%</span></div>
          </td>
          <td class="only-text text-right" style="padding-right: 32px;">152 564</td>
          <td class="only-text" style="padding-right: 32px;">24.01.2025</td>
        </tr>
      `);

      if ($('.table-selected tbody tr').length > 0) {
        $('.table__selected').addClass('active');
        $('.table-selected').show();
      }
      toggleDropdown();
      
    } else {
      $('.table-selected tbody tr').each(function() {
        if ($(this).attr('id') === rowId) {
          $(this).remove();
        }
      });
    }

    if ($('.table-selected tbody tr').length == 0) {
      $('.table__selected').removeClass('active');
      $('.table__toggle').removeClass('active');
      $('.table-selected').removeClass('active');
    }
    updateSelectedCount();
  });

  $('.table-selected tbody').on('change', 'input[type="checkbox"]', function() {
    let rowId = $(this).closest('tr').attr('id');

    // Снимаем галочку в основном списке
    $('.table-select input[type="checkbox"]').each(function() {
      if ($(this).closest('tr').attr('id') === rowId) {
        $(this).prop('checked', false);
      }
    });

    $(this).closest('tr').remove();

    updateSelectedCount();
  });

  $(document).on('click', '.table-selected tbody .table-remove-row', function() {
    let rowToRemove = $(this).closest('tr');
    let rowId = rowToRemove.attr('id');
  
    let rowInTableSelect = $('.table-select tbody tr').filter(function() {
      return $(this).attr('id') === rowId;
    });
  
    rowToRemove.remove();
    rowInTableSelect.find('input[type="checkbox"]').prop('checked', false);
  
    if ($('.table-selected tbody tr').length == 0) {
      $('.table__selected').removeClass('active');
      $('.table__toggle').removeClass('active');
      $('.table-selected').removeClass('active');
    }
    updateSelectedCount();
  });

  $(document).on('click', '.table-selected thead .table-remove-row', function() {
    // Очищаем все строки в .table-selected tbody
    $('.table-selected tbody').empty();

    $('.table-select input[type="checkbox"]').prop('checked', false);
  

    if ($('.table-selected tbody tr').length == 0) {
      $('.table__selected').removeClass('active');
      $('.table__toggle').removeClass('active');
      $('.table-selected').removeClass('active');
    }
    updateSelectedCount();
  });

  $(document).on('change', '.table-select thead input', function() {
    let isChecked = $(this).prop('checked');  // Состояние чекбокса в заголовке
  
    // Отмечаем или снимаем галочки со всех чекбоксов в tbody
    $('.table-select tbody input[type="checkbox"]').each(function() {
      $(this).prop('checked', isChecked);  // Устанавливаем состояние всех чекбоксов
    });
  
    // Обновляем строки в .table-selected tbody
    if (isChecked) {
      // Добавляем все выбранные строки в .table-selected tbody
      $('.table-select tbody input[type="checkbox"]:checked').each(function() {
        let selectedRow = $(this).closest('tr');
        let rowId = selectedRow.attr('id');
  
        // Проверяем, если строка еще не была добавлена в .table-selected tbody
        if ($('.table-selected tbody tr#' + rowId).length === 0) {
          $('.table-selected tbody').append(`
            <tr id="${rowId}">
              <td class="fixed-td" style="padding: 6.5px 32px 6.5px 12px; min-width: 180px; max-width: 252px;">
                <div class="flex items-center w-full gap-x-3 h-[33px]">
                  <button class="button button-icon text-black-200 table-remove-row" type="button" aria-label="button">
                    <svg viewBox="0 0 18 18" width="18" height="18">
                      <use xlink:href="#other-trash-icon"></use>
                    </svg>
                  </button>
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
                <div class="dropdown dropdown-base">
                  <div class="dropdown__container">
                    <div class="dropdown__button">
                      <div class="dropdown__inner">
                        <div class="dropdown__title">1/24</div>
                      </div>
                      <button class="button button-icon sm" type="button" aria-label="button">
                        <svg viewBox="0 0 10 6" width="10" height="6">
                          <use xlink:href="#other-angle-down-icon"></use>
                        </svg>
                      </button>
                    </div>
                    <div class="dropdown__list">
                      <label class="dropdown__item">
                        <input type="radio" name="radio-add-channel-radio">
                        <p>Все</p>
                      </label>
                      <label class="dropdown__item">
                        <input class="filled" type="radio" name="radio-add-channel-radio" checked="">
                        <p>1/24</p>
                      </label>
                      <label class="dropdown__item">
                        <input type="radio" name="radio-add-channel-radio">
                        <p>1/48</p>
                      </label>
                      <label class="dropdown__item">
                        <input type="radio" name="radio-add-channel-radio">
                        <p>1/72</p>
                      </label>
                      <label class="dropdown__item">
                        <input type="radio" name="radio-add-channel-radio">
                        <p>Нативный</p>
                      </label>
                    </div>
                  </div>
                </div>
              </td>
              <td class="only-text" style="padding-right: 32px;">1/24</td>
              <td class="only-text" style="padding-right: 32px;">Интернет технологии</td>
              <td class="only-text" style="padding-right: 32px;">Андрей Миронов</td>
              <td class="only-text text-right" style="padding-right: 32px;">999 999</td>
              <td class="only-text text-right" style="padding-right: 32px;">152 564</td>
              <td class="only-text text-right" style="padding-right: 32px;">999 999</td>
              <td class="only-text text-right" style="padding-right: 32px;">999 999</td>
              <td class="only-text text-right" style="padding-right: 32px;">0,16</td>
              <td class="only-text text-right" style="padding-right: 32px;">152 564</td>
              <td class="only-text text-right" style="padding-right: 32px;">152 564</td>
              <td class="only-text text-right" style="padding-right: 32px;">152 564</td>
              <td class="only-text text-right" style="padding-right: 32px;">16</td>
              <td class="only-text text-right" style="padding-right: 32px;">25,5%</td>
              <td class="only-text text-right" style="padding-right: 32px;">25,5%</td>
              <td class="only-text text-right" style="padding-right: 32px;">25,5%</td>
              <td class="only-text text-right" style="padding-right: 32px;">25,5%</td>
              <td class="only-text" style="padding-right: 32px;"><a href="https://t.me/futuread" target="_blank">https://t.me/futuread</a></td>
              <td class="only-text" style="padding-right: 32px;">да</td>
              <td class="only-text" style="padding-right: 32px;">возможно</td>
              <td class="only-text" style="padding-right: 32px;">да</td>
              <td class="only-text" style="padding-right: 32px;">возможно</td>
              <td class="only-text" style="padding-right: 32px;">да</td>
              <td class="only-text" style="padding-right: 32px;">возможно</td>
              <td class="only-text" style="padding-right: 32px;">да</td>
              <td class="only-text audience" style="padding-right: 32px;">
                <div class="flex justify-center gap-x-5"><span class="table__category male">0,25%</span><span class="table__category female">0,54%</span></div>
              </td>
              <td class="only-text adult" style="padding-right: 32px;">
                <div class="flex justify-center gap-x-5"><span class="table__category posts">0,25%</span><span class="table__category words">0,54%</span></div>
              </td>
              <td class="only-text policy" style="padding-right: 32px;">
                <div class="flex justify-center gap-x-5"><span class="table__category posts">0,25%</span><span class="table__category words">0,54%</span></div>
              </td>
              <td class="only-text horror" style="padding-right: 32px;">
                <div class="flex justify-center gap-x-5"><span class="table__category posts">0,25%</span><span class="table__category words">0,54%</span></div>
              </td>
              <td class="only-text text-right" style="padding-right: 32px;">152 564</td>
              <td class="only-text" style="padding-right: 32px;">24.01.2025</td>
            </tr>
          `);
        }
      });
  
      // Показываем .table-selected и добавляем класс active
      if ($('.table-selected tbody tr').length > 0) {
        $('.table__selected').addClass('active');
        $('.table-selected').show();
      }
    } else {
      // Убираем все строки из .table-selected tbody
      $('.table-selected tbody').empty();
      $('.table__selected').removeClass('active');
      $('.table-selected').hide();
    }
  
    // Обновляем количество выбранных строк
    updateSelectedCount();
  });

  function updateSelectedCount() {
    let count = $('.table-selected tbody tr').length;
    $('.table__selected').find('span').text(count);

    if (count == 0) {
      $('.table__selected').removeClass('active');
      $('.table-selected').hide();
    }
  }
  
  $('.popup-cancel').on('click', function() {
    $('.table-selected tbody').empty();
    $('.table__selected').removeClass('active');
    $('.table-selected').hide();
    $('.table-select input[type="checkbox"]').prop('checked', false);
    updateSelectedCount();
    $(this).closest('.popup__apply').removeClass('active');
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
  });

  $('.popup-cancel-bottom').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').addClass('active');
    $(this).closest('.popup').find('.popup__apply-cancel').addClass('active');
  });

  $('.popup-save-top').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').addClass('active');
    $(this).closest('.popup').find('.popup__apply-top').addClass('active');
  });

  $('.popup-save-bottom').on('click', function() {
    $(this).closest('.popup').find('.popup__apply__bg').addClass('active');
    $(this).closest('.popup').find('.popup__apply-bottom').addClass('active');
  });

  $('.popup-save').on('click', function() {
    $('.table-selected tbody').empty();
    $('.table__selected').removeClass('active');
    $('.table-selected').hide();
    $('.table-select input[type="checkbox"]').prop('checked', false);
    updateSelectedCount();
    $(this).closest('.popup').find('.popup__apply').removeClass('active');
    $(this).closest('.popup').find('.popup__apply__bg').removeClass('active');
  });
}

toggleTableSelected();
