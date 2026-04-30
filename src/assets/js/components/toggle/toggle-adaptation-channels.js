function toggleAdaptationChannels() {
    let lastChecked = null; // Храним последнюю выбранную радиокнопку

    // Обработка открытия popup
    $(document).on('click', '[data-popup-name="check-adaptation-channels"]', function() {
        const selectedValue = $('input[name="adaptation-channels"]:checked').val();
        if (selectedValue) {
            $(`input[name="adaptation-channels"][value="${selectedValue}"]`).prop('checked', true);
            lastChecked = $(`input[name="adaptation-channels"][value="${selectedValue}"]`)[0];
        }
        updateFormState();
    });

    // Обработка клика по radio
    $(document).on('click', 'input[name="adaptation-channels"][type="radio"]', function(e) {
        if (lastChecked === this) {
            $(this).prop('checked', false); // Снимаем выбор
            lastChecked = null;
            updateFormState(); // обновляем форму
        } else {
            lastChecked = this;
        }
    });

    // Обработка изменения radio
    $(document).on('change', 'input[name="adaptation-channels"][type="radio"]', function() {
        updateFormState();
    });

    // Обработка ввода текста
    $(document).on('input', 'input[name="adaptation-channels"][type="text"]', function() {
        validateAndUpdateSaveButton();
    });

    // Сохранение
    $(document).on('click', '.popup__buttons button[type="submit"]', function(e) {
        e.preventDefault();
    });

    // Отмена
    $(document).on('click', '.popup__buttons button[type="button"]', function() {
        $('input[name="adaptation-channels"][type="text"]').val('').prop('disabled', true);
        $('input[name="adaptation-channels"][type="radio"]').prop('checked', false);
    });

    function updateFormState() {
        const selectedOption = $('input[name="adaptation-channels"]:checked');
        const isNoneSelected = selectedOption.val() === 'none';
        const textInput = $('input[name="adaptation-channels"][type="text"]');
        
        textInput.prop('disabled', !selectedOption.length || isNoneSelected);
        
        if (isNoneSelected) {
            textInput.val('');
        }
        
        validateAndUpdateSaveButton();
    }

    function validateAndUpdateSaveButton() {
        const selectedOption = $('input[name="adaptation-channels"]:checked');
        const saveButton = $('[data-popup-name="check-adaptation-channels"] .popup__buttons button[type="submit"]');
        
        
        const isNoneSelected = selectedOption.val() === 'none';

        const shouldEnable = isNoneSelected || (selectedOption.length == 0);
        if (shouldEnable) {
            $('input[name="adaptation-channels"]').css('background-color', '#FBFBFB');
        } else {
            $('input[name="adaptation-channels"]').css('background-color', '#FFFFFF');
        }

        saveButton.prop('disabled', !selectedOption.length);
    }

    $(document).ready(function() {
        updateFormState();
    });
}

toggleAdaptationChannels();
