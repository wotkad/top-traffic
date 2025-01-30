import daterangepicker from 'bootstrap-daterangepicker';
import moment from "moment";

export default function datePicker() {
  let locale = {
    "format": "DD.MM.YYYY",
    "applyLabel": "Выбрать",
    "cancelLabel": "Отмена",
    "fromLabel": "с",
    "toLabel": "по",
    "daysOfWeek": [
      "Вс.",
      "Пн.",
      "Вт.",
      "Ср.",
      "Чт.",
      "Пт.",
      "Сб."
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

  $(".datepicker-range.opensleft").daterangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    opens: 'left',
    parentEl: '.wrapper',
    linkedCalendars: false,
  });

  $(".datepicker-single.opensleft").daterangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    singleDatePicker: true,
    opens: 'left',
    parentEl: '.wrapper',
  });

  $(".datepicker-range.opensright").daterangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    opens: 'right',
    parentEl: '.wrapper',
    linkedCalendars: false,
  });

  $(".datepicker-single.opensright").daterangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    singleDatePicker: true,
    "startDate": moment(),
    opens: 'right',
    parentEl: '.wrapper',
  });

  $(".filter .datepicker-range.opensleft").daterangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    opens: 'left',
    parentEl: '.wrapper',
    linkedCalendars: false,
  });

  $(".filter .datepicker-range.opensright").daterangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    opens: 'right',
    parentEl: '.wrapper',
    linkedCalendars: false,
  });

  $('.datepicker-range.opensright').each(function() {
    let $this = $(this);
    $this.on('show.daterangepicker', function(ev, picker) {
      picker.container.css('top', $this.offset().top + 16);
      picker.container.css('left', $this.offset().left);
    });
  });

  $('.datepicker-range.opensleft').each(function() {
    let $this = $(this);
    $this.on('show.daterangepicker', function(ev, picker) {
      // Вычисляем top
      picker.container.css('top', $this.offset().top + 16);
  
      // Вычисляем right
      let right = $(window).width() - ($this.offset().left + $this.outerWidth());
      picker.container.css('right', right);
      picker.container.css('left', 'auto');
    });
  });

  $('.datepicker-single.opensright').each(function() {
    let $this = $(this);
    $this.on('show.daterangepicker', function(ev, picker) {
      picker.container.css('top', $this.offset().top + 8);
      picker.container.css('left', $this.offset().left);
    });
  });

  $('.datepicker-single.opensleft').each(function() {
    let $this = $(this);
    $this.on('show.daterangepicker', function(ev, picker) {
      // Вычисляем top
      picker.container.css('top', $this.offset().top + 8);
  
      // Вычисляем right
      let right = $(window).width() - ($this.offset().left + $this.outerWidth());
      picker.container.css('right', right);
      picker.container.css('left', 'auto');
    });
  });

  $('.wrapper, .filter__container').on('scroll', function() {
    $('.daterangepicker').hide();
  });

  $(window).on('resize keydown keyup keypress', function() {
    $('.daterangepicker').hide();
  });

  $('.datepicker-range').each(function() {
    let $this = $(this);
    let datepicker;
    let buttons;

    $this.css('width', $(this).val().length * 7);

    $this.on('show.daterangepicker', function(ev, picker) {
      datepicker = picker.container;
      buttons = picker.container.find('.drp-buttons').clone();

      picker.container.find('.drp-buttons').remove();
      picker.container.prepend(buttons);

      // Добавляем кнопку закрытия каждый раз, когда календарь открыт
      picker.container.find(buttons).find('.drp-selected').append('<span class="button button-icon calendar-close-icon" type="button" aria-label="button"><svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg></span>');

      // Обработчик клика по кнопке закрытия
      $(document).on('click', '.drp-buttons .calendar-close-icon', function() {
        datepicker.hide();
        $(this).parent().parent().hide();
        $this.val('');
        picker.setStartDate(moment());
        picker.setEndDate(moment());
      });

      $this.on('apply.daterangepicker', function(ev, picker) {
        buttons.css('display', 'flex');

        const startTimestamp = picker.startDate;
        const endTimestamp = picker.endDate;

        const startMoment = moment(startTimestamp);
        const endMoment = moment(endTimestamp);

        let result;

        if (startMoment.day() === endMoment.day()) {
          result = picker.startDate.format('DD.MM.YYYY');
        } else {
          result = picker.startDate.format('DD.MM.YYYY') + ' - ' + picker.endDate.format('DD.MM.YYYY');
        }
        $this.val(result);
        $(this).parent().attr('data-value', result);
        $(this).css('width', $(this).val().length * 7);
      });
    });
  });

  $('.datepicker-single').each(function() {
    let $this = $(this);
    let datepicker;
    let buttons;

    $this.css('width', $(this).val().length * 7);

    $this.on('show.daterangepicker', function(ev, picker) {
      datepicker = picker.container;
      buttons = picker.container.find('.drp-buttons').clone();

      picker.container.find('.drp-buttons').remove();
      picker.container.prepend(buttons);

      // Добавляем кнопку закрытия каждый раз, когда календарь открыт
      picker.container.find(buttons).find('.drp-selected').append('<span class="button button-icon calendar-close-icon" type="button" aria-label="button"><svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg></span>');

      // Обработчик клика по кнопке закрытия
      $(document).on('click', '.drp-buttons .calendar-close-icon', function() {
        datepicker.hide();
        $(this).parent().parent().hide();
        $this.val('');
        picker.setStartDate(moment());
        picker.setEndDate(moment());
      });

      $this.on('apply.daterangepicker', function(ev, picker) {
        buttons.css('display', 'flex');

        let result = picker.startDate.format('DD.MM.YYYY');
        
        $this.val(result);
        $(this).parent().attr('data-value', result);
        $(this).css('width', $(this).val().length * 7);
      });
    });
  });
}
datePicker();