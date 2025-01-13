import { easepick } from "@easepick/bundle";
import { RangePlugin } from '@easepick/range-plugin';

export default function calendar() {
  if (document.querySelectorAll('.datepicker').length > 0) {

    const startdays = document.querySelectorAll('.datepicker');
    
    startdays.forEach(startday => {
      new easepick.create({
        element: startday,
        css: [
          '/assets/styles/datepicker.min.css',
          '/assets/styles/datepicker.css',
        ],
        plugins: [
          RangePlugin,
        ],
        format: "DD.MM.YYYY",
        lang: "ru-RU",
        zIndex: 10,
        locale: {
          previousMonth: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59L11.1249 12L15.7049 7.41Z" fill="#7A7A7A"/></svg>',
          nextMonth: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z" fill="#7A7A7A"/></svg>',
        },
        setup(picker) {
          picker.on('select', () => {
            setTimeout(() => {
              $('.order__calendar .order__input').addClass('selected');
              $('.order__calendar').children('.order__input').removeClass('active');
              $('.order__input[name="startday"] ~ .easepick-wrapper').removeClass('active');
            }, 0);
          });
          picker.on('clear', () => {
            setTimeout(() => {
              $('.order__calendar .order__input').removeClass('selected');
              $('.order__calendar').children('.order__input').removeClass('active');
              $('.order__input[name="startday"] ~ .easepick-wrapper').removeClass('active');
              let easepickCalendar = $('.order__input[name="startday"] ~ .easepick-wrapper')[0]?.shadowRoot;
              if (easepickCalendar) {
                let easepickCalendarContainer = $(easepickCalendar).find('.container.amp-plugin');
                easepickCalendarContainer.removeClass('show');
              }
            }, 10);
          });
        },
      });
    });

    // Закрывать календарь при клике вне его области
    $(document).mouseup(function(e) {
      if (!$(e.target).closest('.datepicker').length) {
        $('.easepick-wrapper').removeClass('active');
      }
    });
  }
}

calendar();
