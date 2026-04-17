import daterangepicker from 'bootstrap-daterangepicker';
import moment from "moment";

export default function datePicker() {

  let localeTimeRange = {
    "format": "DD.MM.YYYY HH:mm - DD.MM.YYYY HH:mm",
    "applyLabel": "Выбрать",
    "cancelLabel": "Отмена",
    "fromLabel": "с",
    "toLabel": "по",
    "daysOfWeek": [
      "Вс",
      "Пн",
      "Вт",
      "Ср",
      "Чт",
      "Пт",
      "Сб"
    ],
    "monthNames": [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ],
    "firstDay": 1
  };

  function initCalendars() {
    $(".datetimepicker-range.opensleft").daterangepicker({
      locale: localeTimeRange,
      autoUpdateInput: false,
      timePicker: true,
      timePicker24Hour: true,
      startDate: moment(),
      opens: 'left',
      parentEl: 'main.page',
    });

    $(".datetimepicker-range.opensright").daterangepicker({
      locale: localeTimeRange,
      autoUpdateInput: false,
      timePicker: true,
      timePicker24Hour: true,
      startDate: moment(),
      opens: 'right',
      parentEl: 'main.page',
    });

    $('.datetimepicker-range.opensright').each(function() {
      let $this = $(this);
      $this.on('show.daterangepicker', function(ev, picker) {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          picker.container.hide();
        } else {
          $(this).addClass('active');
          picker.container.addClass('datetimepicker');
          picker.container.css('top', $this.offset().top + 14.5);
        }
      });
    });

    $('.datetimepicker-range.opensleft').each(function() {
      let $this = $(this);
      $this.on('show.daterangepicker', function(ev, picker) {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          picker.container.hide();
        } else {
          $(this).addClass('active');
          picker.container.addClass('datetimepicker');
          picker.container.css('top', $this.offset().top + 14.5);
        }
      });
    });
  }
  initCalendars();

  $('.datetimepicker-range').each(function() {
    let $this = $(this);
    let $id = Math.random().toString(36).substr(2, 9);
    $this.css('width', $(this).val().length * 6.5);

    $this.on('show.daterangepicker', function(ev, picker) {

      setTimeout(() => {
        const $container = picker.container;
        
        // Удаляем стандартные селекты
        $container.find('.hourselect, .minuteselect, .ampmselect').hide();

        // Если уже добавляли — не дублируем
        if ($container.find('.custom-time').length) return;

        // Создаём кастомные инпуты
        const startTime = picker.startDate.format('HH:mm');
        const endTime = picker.endDate.format('HH:mm');

        const html = `
          <div class="custom-time">
            <div class="custom-time__start">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 1.875C5.51667 1.875 1.875 5.51667 1.875 10C1.875 14.4833 5.51667 18.125 10 18.125C14.4833 18.125 18.125 14.4833 18.125 10C18.125 5.51667 14.4833 1.875 10 1.875ZM10 16.875C6.20833 16.875 3.125 13.7917 3.125 10C3.125 6.20833 6.20833 3.125 10 3.125C13.7917 3.125 16.875 6.20833 16.875 10C16.875 13.7917 13.7917 16.875 10 16.875Z" fill="#959BA4"/>
              <path d="M10.625 9.66699V6.66699C10.625 6.32533 10.3417 6.04199 10 6.04199C9.65833 6.04199 9.375 6.32533 9.375 6.66699V10.0003C9.375 10.2087 9.475 10.4003 9.65 10.517L12.15 12.1837C12.2583 12.2587 12.375 12.292 12.5 12.292C12.7 12.292 12.9 12.192 13.0167 12.017C13.2083 11.7337 13.1333 11.342 12.8417 11.1503L10.6167 9.66699H10.625Z" fill="#959BA4"/>
              </svg>
              <input type="text" class="time-start" value="${startTime}" placeholder="чч:мм">
            </div>
            <div class="custom-time__end">
              <input type="text" class="time-end" value="${endTime}" placeholder="чч:мм">
              <button class="custom-time__clear">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16.0005" height="16.0005" rx="8.00024" fill="#E3E5EB"/>
                <rect width="4.86957" height="4.86957" transform="translate(5.56445 5.56543)" fill="#E3E5EB"/>
                <path d="M5.56445 5.56543L10.434 10.4349" stroke="#959BA4" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M5.56445 10.4346L10.434 5.56511" stroke="#959BA4" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            <button class="custom-time__toggle">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4.375C13.1066 4.375 15.625 6.8934 15.625 10C15.625 10.3452 15.3451 10.625 15 10.625H10C9.65483 10.625 9.375 10.3452 9.375 10V5C9.375 4.65483 9.65483 4.375 10 4.375Z" fill="#959BA4"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.125 10C18.125 5.51269 14.4874 1.875 10 1.875C5.51269 1.875 1.875 5.51269 1.875 10C1.875 14.4874 5.51269 18.125 10 18.125C14.4874 18.125 18.125 14.4874 18.125 10ZM10 3.125C13.797 3.125 16.875 6.20304 16.875 10C16.875 13.797 13.797 16.875 10 16.875C6.20304 16.875 3.125 13.797 3.125 10C3.125 6.20304 6.20304 3.125 10 3.125Z" fill="#959BA4"/>
              </svg>
              <span>Интервал</span>
            </button>
          </div>
        `;

        $container.find('.drp-buttons').before(html);

        // ===== СИНХРОНИЗАЦИЯ =====

        $container.on('input', '.time-start', function() {
          const val = $(this).val();
          const [h, m] = val.split(':');

          if (h !== undefined && m !== undefined) {
            picker.startDate.set({
              hour: +h || 0,
              minute: +m || 0
            });
          }
        });

        $container.on('input', '.time-end', function() {
          const val = $(this).val();
          const [h, m] = val.split(':');

          if (h !== undefined && m !== undefined) {
            picker.endDate.set({
              hour: +h || 0,
              minute: +m || 0
            });
          }
        });

      }, 0);
      
      $this.attr('data-id', $id);
      picker.container.attr('data-id', $id);

      $(document).on('click', picker.container.find('.prev, .next'), function() {
        picker.container.css('top', $this.offset().top + 14.5);
      });

      $this.off('apply.daterangepicker').on('apply.daterangepicker', function(ev, picker) {

        const onlyStartSelected =
          !picker.endDate ||
          picker.startDate.isSame(picker.endDate, 'minute');

        if (onlyStartSelected) {
          picker.endDate = picker.startDate.clone();
        }

        const isSameDay = picker.startDate.isSame(picker.endDate, 'day');
        const isCustomTimeActive = picker.container.find('.custom-time').hasClass('active');

        let result;

        if (isSameDay && isCustomTimeActive) {
          result =
            picker.startDate.format('DD.MM.YYYY HH:mm') +
            ' - ' +
            picker.endDate.format('HH:mm');

          picker.container.find('.custom-time__clear').addClass('active');

        } else {
          if (picker.startDate.isSame(picker.endDate, 'day')) {
            result = picker.startDate.format('DD.MM.YYYY HH:mm');
          } else {
            result =
              picker.startDate.format('DD.MM.YYYY HH:mm') +
              ' - ' +
              picker.endDate.format('DD.MM.YYYY HH:mm');
          }

          picker.container.find('.custom-time__clear').removeClass('active');
        }

        $this.removeClass('active');
        $this.val(result);
        $this.parent().attr('data-value', result);
        $this.css('width', $this.val().length * 6.5);
        if (isSameDay) {
          $this.css('width', $this.val().length * 7);
        }
        $this.parent().find('.calendar-clear').addClass('active');
      });

    });
  });

  $(document).on('click', '.calendar-clear', function () {
    const $btn = $(this);
    const $wrapper = $btn.parent();
    const $input = $wrapper.find('.datetimepicker-range');

    const picker = $input.data('daterangepicker');

    if (!picker) return;

    // сброс дат
    picker.setStartDate(moment());
    picker.setEndDate(moment());

    // очистка input
    $input.val('');
    $input.parent().attr('data-value', '');
    $input.css('width', 0);

    // убираем классы
    $btn.removeClass('active');
    $input.removeClass('active');

    // если нужно — скрываем календарь
    picker.hide();
  });

  $('.wrapper, .filter__container').on('scroll', function() {
    $('.daterangepicker').hide();
    $('.datepicker').removeClass('active');
  });

  $(document).on('click', '.custom-time__toggle', function () {
    const $container = $(this).closest('.daterangepicker');
    $('.custom-time__clear').addClass('active');
    $container.find('.custom-time').toggleClass('active');
  });

  $(document).on('click', '.custom-time__clear', function () {
    const $container = $(this).closest('.daterangepicker');
    $('.custom-time__clear').removeClass('active');
    $container.find('.custom-time').removeClass('active');
  });

}
datePicker();

window.datePicker = datePicker;