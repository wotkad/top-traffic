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
      "Янв",
      "Фев",
      "Март",
      "Апр",
      "Май",
      "Июнь",
      "Июль",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек"
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

    if (!$this.closest('.filter__container')) {
      $this.css('width', $(this).val().length * 7);
    }

    let $id = Math.random().toString(36).substr(2, 9);

    $this.on('show.daterangepicker', function(ev, picker) {

      $this.attr('data-id', $id);
      picker.container.attr('data-id', $id);

      monthpicker = picker.container;


      $(document).on('click', `.filter__clear[data-filter-name="${$this.closest('.filter').data('filter-name')}"]`, function() {
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
          const singleMonth = capitalize(startMoment.locale('ru').format('MMMM YYYY'));
          result = `${singleMonth}`;
        } else if (startMoment.year() === endMoment.year()) {
          const startMonth = capitalize(startMoment.locale('ru').format('MMMM'));
          const endMonth = capitalize(endMoment.locale('ru').format('MMMM'));
          result = `${startMonth} - ${endMonth} ${startMoment.locale('ru').format('YYYY')}`;
        } else {
          const startDate = capitalize(startMoment.locale('ru').format('MMMM YYYY'));
          const endDate = capitalize(endMoment.locale('ru').format('MMMM YYYY'));
          result = `${startDate} - ${endDate}`;
        }

        $this.val(result);
        $this.parent().attr('data-value', result);
        if (!$this.closest('.filter__container')) {
          $this.css('width', $this.val().length * 7);
        }
      });
    });
  });
}
monthPicker();

window.monthPicker = monthPicker;