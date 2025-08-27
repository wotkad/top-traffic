function toggleTag() {
    let lastChecked = null;

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
    });

    // Обработка изменения radio
    $(document).on('change', 'input[name="tag"][type="radio"]', function() {
        updateFormState();
    });

    // Сохранение
    $(document).on('click', '.popup__buttons button[type="submit"]', function(e) {
        e.preventDefault();
        saveTagSettings();
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

        validateAndUpdateSaveButton();
    }

    function validateAndUpdateSaveButton() {
        const selectedOption = $('input[name="tag"]:checked');
        const saveButton = $('.popup__buttons button[type="submit"]');
        const isNoneSelected = selectedOption.val() === 'none';
        const hasText = $('.popup__textarea').text().trim() !== '';

        const shouldEnable = isNoneSelected || hasText;
        saveButton.prop('disabled', !shouldEnable);
    }

    function saveTagSettings() {
        const selectedOption = $('input[name="tag"]:checked');
        const isNoneSelected = selectedOption.val() === 'none';
        const $list = $('.tag__list');
        const $textarea = $('.popup__textarea');

        if (isNoneSelected) {
            $list.empty();
            toggleShowAllButton();
            return;
        }

        let content = $textarea.text().trim();
        if (!content) {
            return;
        }

        toggleShowAllButton();
    }

    function toggleShowAllButton() {
        let $list = $('.tag__list');
        let $button = $('.tag__button');
        
        if ($list.find('.tag__item').length > 2) {
            $button.removeClass('hidden');
        } else {
            $button.addClass('hidden');
        }
    }

    // обработка "Показать все"
    $(document).on('click', '.tag__button', function() {
        $(this).remove();
    });

    // удаление тегов вручную
    $(document).on('click', '.tag__item .button-close', function() {
        $(this).closest('.tag__item').remove();
        toggleShowAllButton();
    });

}

toggleTag();