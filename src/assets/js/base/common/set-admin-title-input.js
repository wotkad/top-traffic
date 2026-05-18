import setPageInitials from "./set-page-initials";

$(function () {
    const $input = $('.heading__title input');
    const $error = $('.heading__title .error-admin');

    const MIN_WIDTH = 208;
    const MAX_WIDTH = 389;
    const MAX_LENGTH = 60;

    // Изначальное значение input
    const initialValue = $input.val();

    // Элемент для измерения ширины текста
    const $measure = $('<span>')
        .css({
            position: 'absolute',
            visibility: 'hidden',
            whiteSpace: 'pre',
            font: $input.css('font'),
            fontSize: $input.css('font-size'),
            fontWeight: $input.css('font-weight'),
            letterSpacing: $input.css('letter-spacing'),
        })
        .appendTo('body');

    function updateInput() {
        const value = $input.val() || '';
        const hasError = value.length > MAX_LENGTH;

        // Ширина input
        $measure.text(value || $input.attr('placeholder') || '');

        let width = $measure.outerWidth() + 10;

        width = Math.max(MIN_WIDTH, width);
        width = Math.min(MAX_WIDTH, width);

        $input.css('width', width + 'px');

        // Ошибка
        $error.toggleClass('active', hasError);
        $input.toggleClass('error', hasError);
        setPageInitials();
    }

    // Инициализация
    updateInput();

    // При вводе
    $input.on('input', updateInput);

    // При потере фокуса откатываем к начальному значению
    $input.on('blur', function () {
        if ($input.val().length > MAX_LENGTH) {
            $input.val(initialValue);
            updateInput();
        }
    });
});