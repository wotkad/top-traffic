function toggleTag() {
    let lastChecked = null;
    let $popup = $('.popup[data-popup-name="add-tag"]');
    let $saveBtn = $popup.find('.popup__buttons button[type="submit"]'); // кнопка "Сохранить"
    let $placeholder = $popup.find('.popup__placeholder');

    // При открытии попапа
    $(document).on('click', '[data-popup-name="add-tag"]', function() {
        const selectedValue = $('input[name="tag"]:checked').val();
        if (selectedValue) {
            $(`input[name="tag"][value="${selectedValue}"]`).prop('checked', true);
            lastChecked = $(`input[name="tag"][value="${selectedValue}"]`)[0];
        }
    });

    // Отмена
    $(document).on('click', '.popup__buttons button[type="button"]', function() {
        $('input[name="tag"][type="radio"]').prop('checked', false);
        $('.popup[data-popup-name="add-tag"] .popup__textarea').css('background-color', '#FBFBFB').empty();
        $saveBtn.prop('disabled', true);
        lastChecked = '';
        $popup.find('.popup__error').removeClass('active');
        $('.popup[data-popup-name="add-tag"] .popup__textarea').css('background-color', '#FBFBFB');
    });

    $saveBtn.on('click', function() {
        lastChecked = '';
    });

    // Снятие выбора при повторном клике
    $(document).on('click', 'input[name="tag"][type="radio"]', function() {
        if (lastChecked === this) {
            $(this).prop('checked', false);
            lastChecked = null;
            updateFormState();
            $saveBtn.prop('disabled', true);
        } else {
            lastChecked = this;
            $saveBtn.prop('disabled', false);
        }
    });

    // Обработка изменения radio
    $(document).on('change', 'input[name="tag"][type="radio"]', function() {
        updateFormState();
    });

    function updateFormState() {
        const selectedOption = $('input[name="tag"]:checked');
        const isNoneSelected = selectedOption.val() === 'none';
        const $textarea = $('.popup[data-popup-name="add-tag"] .popup__textarea');
        $textarea
            .toggleClass('disabled', isNoneSelected)
            .attr('contenteditable', isNoneSelected ? 'false' : 'true');
        if (isNoneSelected || selectedOption.length == 0) {
            $textarea.text(''); // чистим временные теги
            $placeholder.show();
            $('.popup[data-popup-name="add-tag"] .popup__textarea').css('background-color', '#FBFBFB');
        } else {
            $('.popup[data-popup-name="add-tag"] .popup__textarea').css('background-color', '#FFFFFF');
        }
    }

    // обработка "Показать все"
    let $list = $('.tag__list');
    $(document).on('click', '.tag__button', function() {
        $(this).addClass('hidden');
        $list.addClass('active');
    });

}

toggleTag();