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

  let localeTime = {
    "format": "DD.MM.YYYY HH:mm",
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

  function initCalendars(startDate = 0, endDate = 0) {
    $(".datepicker-range.opensleft").daterangepicker({
      autoApply: true,
      locale: locale,
      autoUpdateInput: false,
      opens: 'left',
      parentEl: '.wrapper',
      linkedCalendars: false,
    });
    
    $(".datepicker-range.opensright").daterangepicker({
      autoApply: true,
      locale: locale,
      autoUpdateInput: false,
      opens: 'right',
      parentEl: '.wrapper',
      linkedCalendars: false,
    });

    $(".datepicker-single.opensleft").daterangepicker({
      autoApply: true,
      locale: locale,
      autoUpdateInput: false,
      singleDatePicker: true,
      startDate: moment(),
      opens: 'left',
      parentEl: '.wrapper',
      minDate: startDate,
      maxDate: endDate,
    });

    $(".datepicker-single.opensright").daterangepicker({
      autoApply: true,
      locale: locale,
      autoUpdateInput: false,
      singleDatePicker: true,
      startDate: moment(),
      opens: 'right',
      parentEl: '.wrapper',
      minDate: startDate,
      maxDate: endDate,
    });

    $(".datetimepicker-single.opensleft").daterangepicker({
      locale: localeTime,
      autoUpdateInput: false,
      timePicker: true,
      timePicker24Hour: true,
      singleDatePicker: true,
      startDate: moment(),
      opens: 'left',
      parentEl: '.wrapper',
    });

    $(".datetimepicker-single.opensright").daterangepicker({
      locale: localeTime,
      autoUpdateInput: false,
      timePicker: true,
      timePicker24Hour: true,
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
        let right = $(window).width() - ($this.offset().left + $this.parent().width() - 24);
        picker.container.css('right', right);
        picker.container.css('left', 'auto');
      });
    });

    $('.datetimepicker-single.opensright').each(function() {
      let $this = $(this);
      $this.on('show.daterangepicker', function(ev, picker) {
        picker.container.addClass('datetimepicker');
        picker.container.css('top', $this.offset().top + 16);
        picker.container.css('left', $this.offset().left);
      });
    });

    $('.datetimepicker-single.opensleft').each(function() {
      let $this = $(this);
      $this.on('show.daterangepicker', function(ev, picker) {
        // Вычисляем top
        picker.container.addClass('datetimepicker');
        picker.container.css('top', $this.offset().top + 16);
    
        // Вычисляем right
        let right = $(window).width() - ($this.offset().left + $this.outerWidth());
        picker.container.css('right', right);
        picker.container.css('left', 'auto');
      });
    });
  }
  initCalendars();

  $('.wrapper, .filter__container').on('scroll', function() {
    $('.daterangepicker').hide();
  });

  $(window).on('resize keydown keyup keypress', function() {
    $('.daterangepicker').hide();
  });

  $('.datepicker-range').each(function() {
    let $this = $(this);
    let buttons;

    if (!$this.closest('.filter__container')) {
      $this.css('width', $(this).val().length * 7);
    }

    $this.on('show.daterangepicker', function(ev, picker) {
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
        // $this.parent().removeAttr('data-value');
        // $this.css('width', $this.val().length * 7);
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
    let buttons;

    $this.css('width', $(this).val().length * 7);

    let $id = Math.random().toString(36).substr(2, 9);

    $this.on('show.daterangepicker', function(ev, picker) {

        $this.attr('data-id', $id);
        picker.container.attr('data-id', $id);

        buttons = picker.container.find('.drp-buttons').clone();
        picker.container.find('.drp-buttons').remove();
        picker.container.prepend(buttons);

        let result = picker.startDate.format('DD.MM.YYYY');

        $(buttons).find('.drp-selected').html(result).append('<span class="button button-icon calendar-close-icon" type="button" aria-label="button"><svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg></span>');

        buttons.on('click', '.calendar-close-icon', function() {
            picker.hide();
            buttons.hide();
            if ($this.closest('.table').length) {
                $this.val('дд.мм.гггг');
                if ($this.closest('.status__calendar').hasClass('selected')) {
                    buttons.hide();
                    $this.closest('.status__calendar').removeClass('selected');
                    $this.closest('td').removeClass('only-text');
                    $this.val('');
                    $this.parent().removeAttr('data-value');
                    $this.css('width', $this.val().length * 7);
                }
            } else {
                $this.val('Все');
                $this.parent().removeAttr('data-value');
                $this.css('width', $this.val().length * 7);
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

            let $row = $this.closest('tr'); // Получаем строку, в которой находятся оба календаря

            if ($this.closest('.datepicker-trigger').hasClass('start-day')) {
                let startDate = picker.startDate.clone(); // Устанавливаем startDate

                // Найдём календарь конца в той же строке и установим minDate
                let $endPicker = $row.find('.datepicker-trigger.end-day .datepicker-single');
                if ($endPicker.length && $endPicker.data('daterangepicker')) {
                    $endPicker.data('daterangepicker').minDate = startDate;
                    $endPicker.data('daterangepicker').updateView();
                }
            }

            if ($this.closest('.datepicker-trigger').hasClass('end-day')) {
                let endDate = picker.startDate.clone(); // Устанавливаем endDate

                // Найдём календарь начала в той же строке и установим maxDate
                let $startPicker = $row.find('.datepicker-trigger.start-day .datepicker-single');
                if ($startPicker.length && $startPicker.data('daterangepicker')) {
                    $startPicker.data('daterangepicker').maxDate = endDate;
                    $startPicker.data('daterangepicker').updateView();
                }
            }
        });
    });  
  });

  $('.datetimepicker-single').each(function() {
    let $this = $(this);
    let buttons;
    let apply;

    $this.css('width', $(this).val().length * 7);

    $this.on('show.daterangepicker', function(ev, picker) {
      buttons = picker.container.find('.drp-buttons').clone(true);
      apply = picker.container.find('.applyBtn').clone(true);
      picker.container.find('.drp-buttons').remove();
      picker.container.prepend(buttons);

      let result = picker.startDate.format('DD.MM.YYYY HH:mm');

      $(buttons).find('.drp-selected').html(result).append('<span class="button button-icon calendar-close-icon" type="button" aria-label="button"><svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg></span>');

      buttons.on('click', '.calendar-close-icon', function() {
          picker.hide();
          buttons.find('.drp-selected').hide();
          $this.val('Все');
          $this.parent().removeAttr('data-value');
          $this.css('width', $this.val().length * 7);
          picker.setStartDate(moment());
          picker.setEndDate(moment());
      });

      $this.off('apply.daterangepicker').on('apply.daterangepicker', function(ev, picker) {
          buttons.find('.drp-selected').css('display', 'inline-flex');
          result = picker.startDate.format('DD.MM.YYYY HH:mm');
          $this.val(result);
          $this.parent().attr('data-value', result);
          $this.css('width', $this.val().length * 7);
          observer.observe(picker.container.find('.drp-selected')[0], { childList: true, characterData: true, subtree: true });
      });

      $(document).on("pointerdown", ".daterangepicker td", function() {
        observer.observe(picker.container.find('.drp-selected')[0], { childList: true, characterData: true, subtree: true });
      });

      let observer = new MutationObserver(function(mutationsList) {
        mutationsList.forEach(function(mutation) {
            if (mutation.type === "childList" || mutation.type === "characterData") {
              picker.container.find('.drp-selected').remove();
              picker.container.find(buttons).append(`<div class="drp-selected">${picker.startDate.format('DD.MM.YYYY HH:mm')}<span class="button button-icon calendar-close-icon" type="button" aria-label="button"><svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg></span></div>`);
              picker.container.find('.drp-selected').css('display', 'inline-flex');
              picker.container.find('.applyBtn').remove();
              picker.container.find(buttons).append(apply)
            }
        });
      });

      $(document).on('input', '.daterangepicker .hourselect', function() {
        let picker = $('.datetimepicker-single').data('daterangepicker');
        
        picker.container.find('.drp-selected').remove();
        picker.container.find(buttons).append(`<div class="drp-selected">${picker.startDate.format(`DD.MM.YYYY ${$(this).val()}:mm`)}<span class="button button-icon calendar-close-icon" type="button" aria-label="button"><svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg></span></div>`);
        picker.container.find('.drp-selected').css('display', 'inline-flex');
        picker.container.find('.applyBtn').remove();
        picker.container.find(buttons).append(apply);
      });
      
      $(document).on('input', '.daterangepicker .minuteselect', function() {
          let picker = $('.datetimepicker-single').data('daterangepicker');
      
          picker.container.find('.drp-selected').remove();
          picker.container.find(buttons).append(`<div class="drp-selected">${picker.startDate.format(`DD.MM.YYYY HH:${$(this).val()}`)}<span class="button button-icon calendar-close-icon" type="button" aria-label="button"><svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg></span></div>`);
          picker.container.find('.drp-selected').css('display', 'inline-flex');
          picker.container.find('.applyBtn').remove();
          picker.container.find(buttons).append(apply);
      });

    });
  });
  

}
datePicker();