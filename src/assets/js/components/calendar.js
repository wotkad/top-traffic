import daterangepicker from 'bootstrap-daterangepicker';
import monthrangepicker from 'bootstrap-monthrangepicker';
import moment from "moment";

function calendar() {
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

  $(".datepicker.opensleft").daterangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    opens: 'left',
    parentEl: '.wrapper',
  });

  $(".datepicker.opensright").daterangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    opens: 'right',
    parentEl: '.wrapper',
  });

  $(".filter .datepicker.opensleft").daterangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    opens: 'left',
    parentEl: '.wrapper',
  });

  $(".filter .datepicker.opensright").daterangepicker({
    autoApply: true,
    locale: locale,
    autoUpdateInput: false,
    opens: 'right',
    parentEl: '.wrapper',
  });

  $('.datepicker.opensright').each(function() {
    let $this = $(this);
    $this.on('show.daterangepicker', function(ev, picker) {
      picker.container.css('top', $this.offset().top + 16);
      picker.container.css('left', $this.offset().left);
    });
  });

  $('.datepicker.opensleft').each(function() {
    let $this = $(this);
    $this.on('show.daterangepicker', function(ev, picker) {
      picker.container.css('top', $this.offset().top + 16);
      picker.container.css('right', $this.offset().right);
    });
  });

  $('.wrapper, .filter__container').on('scroll', function() {
    $('.daterangepicker').hide();
  });

  $(window).on('resize keydown keyup keypress', function() {
    $('.daterangepicker').hide();
  });

  $('.datepicker').each(function() {
    let $this = $(this);
    let datepicker;
    let buttons;

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

      $('.daterangepicker').trigger('click');

      $this.on('apply.daterangepicker', function(ev, picker) {
        $this.val(picker.startDate.format('DD.MM.YYYY') + ' - ' + picker.endDate.format('DD.MM.YYYY'));
        buttons.css('display', 'flex');
      });
    });
  });
}
calendar();