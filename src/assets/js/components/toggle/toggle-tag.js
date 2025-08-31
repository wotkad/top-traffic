function toggleTag() {
    let lastChecked = null;
    let $popup = $('.popup[data-popup-name="add-tag"]');
    let $saveBtn = $popup.find('.popup__buttons button[type="submit"]'); // кнопка "Сохранить"

    // При открытии попапа
    $(document).on('click', '[data-popup-name="add-tag"]', function() {
        const selectedValue = $('input[name="tag"]:checked').val();
        if (selectedValue) {
            $(`input[name="tag"][value="${selectedValue}"]`).prop('checked', true);
            lastChecked = $(`input[name="tag"][value="${selectedValue}"]`)[0];
        }
    });

    // Снятие выбора при повторном клике
    $(document).on('click', 'input[name="tag"][type="radio"]', function() {
        if (lastChecked === this) {
            $(this).prop('checked', false);
            lastChecked = null;
            updateFormState();
        } else {
            lastChecked = this;
        }
        $saveBtn.prop('disabled', false);
    });

    // Обработка изменения radio
    $(document).on('change', 'input[name="tag"][type="radio"]', function() {
        updateFormState();
    });

    function updateFormState() {
        const selectedOption = $('input[name="tag"]:checked');
        const isNoneSelected = selectedOption.val() === 'none';
        const $textarea = $('.popup__textarea');
        $textarea
            .toggleClass('disabled', isNoneSelected)
            .attr('contenteditable', isNoneSelected ? 'false' : 'true');
        if (isNoneSelected) {
            $textarea.text(''); // чистим временные теги
        }
    }

    // обработка "Показать все"
    $(document).on('click', '.tag__button', function() {
        $(this).remove();
    });

}

toggleTag();