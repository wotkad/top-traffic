function toggleAdaptation() {
    let lastChecked = null; // Храним последнюю выбранную радиокнопку

    // Обработка открытия popup
    $(document).on('click', '[data-popup-name="check-adaptation"]', function() {
        const selectedValue = $('input[name="adaptation"]:checked').val();
        if (selectedValue) {
            $(`input[name="adaptation"][value="${selectedValue}"]`).prop('checked', true);
            lastChecked = $(`input[name="adaptation"][value="${selectedValue}"]`)[0];
        }
        updateFormState();
    });

    // Обработка клика по radio
    $(document).on('click', 'input[name="adaptation"][type="radio"]', function(e) {
        if (lastChecked === this) {
            $(this).prop('checked', false); // Снимаем выбор
            lastChecked = null;
            updateFormState(); // обновляем форму
        } else {
            lastChecked = this;
        }
    });

    // Обработка изменения radio
    $(document).on('change', 'input[name="adaptation"][type="radio"]', function() {
        updateFormState();
    });

    // Обработка ввода текста
    $(document).on('input', 'input[name="adaptation"][type="text"]', function() {
        validateAndUpdateSaveButton();
    });

    // Сохранение
    $(document).on('click', '.popup__buttons button[type="submit"]', function(e) {
        e.preventDefault();
        saveAdaptationSettings();
    });

    // Отмена
    $(document).on('click', '.popup__buttons button[type="button"]', function() {
        $('input[name="adaptation"][type="text"]').val('').prop('disabled', true);
        $('input[name="adaptation"][type="radio"]').prop('checked', false);
    });

    function updateFormState() {
        const selectedOption = $('input[name="adaptation"]:checked');
        const isNoneSelected = selectedOption.val() === 'none';
        const textInput = $('input[name="adaptation"][type="text"]');
        
        textInput.prop('disabled', !selectedOption.length || isNoneSelected);
        
        if (isNoneSelected) {
            textInput.val('');
        }
        
        validateAndUpdateSaveButton();
    }

    function validateAndUpdateSaveButton() {
        const selectedOption = $('input[name="adaptation"]:checked');
        const saveButton = $('.popup__buttons button[type="submit"]');
        
        const isNoneSelected = selectedOption.val() === 'none';

        const shouldEnable = isNoneSelected || (selectedOption.length);
        if (!isNoneSelected) {
            $('input[name="adaptation"]').css('background-color', '#FFFFFF');
        } else {
            $('input[name="adaptation"]').css('background-color', '#FBFBFB');
        }

        saveButton.prop('disabled', !shouldEnable);
    }

    function saveAdaptationSettings() {
        const selectedOption = $('input[name="adaptation"]:checked');
        const textInput = $('input[name="adaptation"][type="text"]');
        const adaptationValue = $('.adaptation__value p');
        const adaptationSpan = $('.adaptation__value span');
        
        if (!selectedOption.length) {
            adaptationValue.text('––');
            adaptationSpan.text('');
            return;
        }
        
        const optionText = selectedOption.closest('.popup__label').find('span').text();
        const paymentText = textInput.val().trim();
        
        if (selectedOption.val() === 'none') {
            adaptationValue.text(optionText);
            adaptationSpan.text('');
        } else if (paymentText) {
            adaptationValue.text(optionText);
            adaptationSpan.text(` (${paymentText}%)`);
        } else {
            adaptationValue.text(optionText);
            adaptationSpan.text('');
        }
        
    }


    $(document).ready(function() {
        updateFormState();
    });
}

toggleAdaptation();
