import monthrangepicker from 'bootstrap-monthrangepicker';
import moment from "moment";

function monthPicker() {
  let locale = {
    "format": "MMM.YYYY",
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

  $(".monthpicker.opensleft").monthrangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    opens: 'left',
    parentEl: '.wrapper',
    linkedCalendars: false,
  });

  $(".monthpicker.opensright").monthrangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    opens: 'right',
    parentEl: '.wrapper',
    linkedCalendars: false,
  });

  $(".filter .monthpicker.opensleft").monthrangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    opens: 'left',
    parentEl: '.wrapper',
    linkedCalendars: false,
  });

  $(".filter .monthpicker.opensright").monthrangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    opens: 'right',
    parentEl: '.wrapper',
    linkedCalendars: false,
  });

  $('.monthpicker.opensright').each(function() {
    let $this = $(this);
    $this.on('show.daterangepicker', function(ev, picker) {

      if (picker.parentEl[0].localName == 'body') {
        picker.parentEl = $(".monthpicker.opensright");
      }

      picker.container.addClass('monthrangepicker');
      picker.container.css('top', $this.offset().top + 16);
      picker.container.css('left', $this.offset().left);
    });
  });

  $('.monthpicker.opensleft').each(function() {
    let $this = $(this);
    $this.on('show.daterangepicker', function(ev, picker) {
      picker.container.addClass('monthrangepicker');
      picker.container.css('top', $this.offset().top + 16);
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

  $('.monthpicker').each(function() {
    let $this = $(this);
    let monthpicker;

    $this.on('show.daterangepicker', function(ev, picker) {
      monthpicker = picker.container;

      // Обработчик клика по кнопке закрытия
      $(document).on('click', '.filter__clear', function() {
        monthpicker.hide();
        $this.val('');
        picker.setStartDate(moment());
        picker.setEndDate(moment());
      });

      $this.on('apply.daterangepicker', function(ev, picker) {
        
        const startTimestamp = picker.startDate;
        const endTimestamp = picker.endDate;

        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
        const startMoment = moment(startTimestamp);
        const endMoment = moment(endTimestamp);

        let result;

        if (startMoment.year() === endMoment.year() && startMoment.month() === endMoment.month()) {
          // Если год и месяц совпадают
          const singleMonth = capitalize(startMoment.locale('ru').format('MMMM YYYY')); // "Апр. 2025"
          result = `${singleMonth}`;
        } else if (startMoment.year() === endMoment.year()) {
          // Если только год совпадает
          const startMonth = capitalize(startMoment.locale('ru').format('MMM')); // "Апр"
          const endMonth = capitalize(endMoment.locale('ru').format('MMM'));     // "Ноя"
          result = `${startMonth} - ${endMonth} ${startMoment.locale('ru').format('YYYY')}`; // "Апр - Ноя 2025"
        } else {
          // Если год отличается
          const startDate = capitalize(startMoment.locale('ru').format('MMM YYYY')); // "Апр 2025"
          const endDate = capitalize(endMoment.locale('ru').format('MMM YYYY'));     // "Ноя 2026"
          result = `${startDate} - ${endDate}`;
        }

        $this.val(result);
      });
    });
  });
}
monthPicker();