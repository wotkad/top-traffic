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
    startDate: moment(),
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
      picker.container.css('top', $this.offset().top + 16);
      picker.container.css('left', $this.offset().left);
    });
  });

  $('.datepicker-single.opensleft').each(function() {
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

    if (!$this.closest('.filter__container')) {
      $this.css('width', $(this).val().length * 7);
    }

    $this.on('show.daterangepicker', function(ev, picker) {
      datepicker = picker.container;
      buttons = picker.container.find('.drp-buttons').clone();

      picker.container.find('.drp-buttons').remove();
      picker.container.prepend(buttons);

      let result;

      if (picker.startDate.isSame(picker.endDate, 'day')) {
        result = picker.startDate.format('DD.MM.YYYY');
      } else {
        result = picker.startDate.format('DD.MM.YYYY') + ' - ' + picker.endDate.format('DD.MM.YYYY');
      }

      $(buttons).find('.drp-selected').html(result).append('<span class="button button-icon calendar-close-icon" type="button" aria-label="button"><svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg></span>');

      // Обработчик клика по кнопке закрытия
      buttons.on('click', '.calendar-close-icon', function() {
        picker.hide();
        buttons.hide();
        $this.val('Все');
        picker.setStartDate(moment());
        picker.setEndDate(moment());
      });

      $this.off('apply.daterangepicker').on('apply.daterangepicker', function(ev, picker) {
        buttons.css('display', 'flex');

        if (picker.startDate.isSame(picker.endDate, 'day')) {
          result = picker.startDate.format('DD.MM.YYYY');
        } else {
          result = picker.startDate.format('DD.MM.YYYY') + ' - ' + picker.endDate.format('DD.MM.YYYY');
        }
        $this.val(result);
        $this.parent().attr('data-value', result);
        if (!$this.closest('.filter__container')) {
          $this.css('width', $this.val().length * 7);
        }
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

        let result = picker.startDate.format('DD.MM.YYYY');

        $(buttons).find('.drp-selected').html(result).append('<span class="button button-icon calendar-close-icon" type="button" aria-label="button"><svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg></span>');

        // Убираем глобальный обработчик, используем делегирование через picker.container
        buttons.on('click', '.calendar-close-icon', function() {
            picker.hide();
            buttons.hide();
            if ($this.closest('.table').length) {
              $this.val('дд.мм.гггг');
            } else {
              $this.val('Все');
            }
            picker.setStartDate(moment());
            picker.setEndDate(moment());
        });

        $this.off('apply.daterangepicker').on('apply.daterangepicker', function(ev, picker) {
            buttons.css('display', 'flex');
            $this.closest('.status__calendar').addClass('selected');
            $this.closest('td').addClass('only-text');

            result = picker.startDate.format('DD.MM.YYYY');

            $this.val(result);
            $this.parent().attr('data-value', result);
            $this.css('width', $this.val().length * 7);
        });
    });
  });

}
datePicker();