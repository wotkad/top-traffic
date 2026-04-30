function toggleCheckButton() {
    let lastChecked = null; // Храним последнюю выбранную радиокнопку

    // Обработка открытия popup
    $(document).on('click', '[data-popup-name="check-button"]', function() {
        const selectedValue = $('input[name="check-button"]:checked').val();
        if (selectedValue) {
            $(`input[name="check-button"][value="${selectedValue}"]`).prop('checked', true);
            lastChecked = $(`input[name="check-button"][value="${selectedValue}"]`)[0];
        }
        updateFormState();
    });

    // Обработка клика по radio
    $(document).on('click', 'input[name="check-button"][type="radio"]', function(e) {
        if (lastChecked === this) {
            $(this).prop('checked', false); // Снимаем выбор
            lastChecked = null;
            updateFormState(); // обновляем форму
        } else {
            lastChecked = this;
        }
    });

    // Обработка изменения radio
    $(document).on('change', 'input[name="check-button"][type="radio"]', function() {
        updateFormState();
    });

    // Обработка ввода текста
    $(document).on('input', 'input[name="check-button"][type="text"]', function() {
        validateAndUpdateSaveButton();
    });

    // Сохранение
    $(document).on('click', '.popup__buttons button[type="submit"]', function(e) {
        e.preventDefault();
        saveButtonSettings();
    });

    // Отмена
    $(document).on('click', '.popup__buttons button[type="button"]', function() {
        $('input[name="check-button"][type="text"]').val('').prop('disabled', true);
        $('input[name="check-button"][type="radio"]').prop('checked', false);
    });

    function updateFormState() {
        const selectedOption = $('input[name="check-button"]:checked');
        const isNoneSelected = selectedOption.val() === 'none';
        const textInput = $('input[name="check-button"][type="text"]');
        
        textInput.prop('disabled', !selectedOption.length || isNoneSelected);
        
        if (isNoneSelected) {
            textInput.val('');
        }
        
        validateAndUpdateSaveButton();
    }

    function validateAndUpdateSaveButton() {
        const selectedOption = $('input[name="check-button"]:checked');
        const saveButton = $('[data-popup-name="check-button"] .popup__buttons button[type="submit"]');
        
        
        const isNoneSelected = selectedOption.val() === 'none';

        const shouldEnable = isNoneSelected || (selectedOption.length == 0);
        if (shouldEnable) {
            $('input[name="check-button"]').css('background-color', '#FBFBFB');
        } else {
            $('input[name="check-button"]').css('background-color', '#FFFFFF');
        }

        saveButton.prop('disabled', !selectedOption.length);
    }

    function saveButtonSettings() {
        const selectedOption = $('input[name="check-button"]:checked');
        const textInput = $('input[name="check-button"][type="text"]');
        const adaptationValue = $('.check-button__value p');
        const adaptationSpan = $('.check-button__value span');
        
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

toggleCheckButton();
