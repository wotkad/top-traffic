function togglePopupGroup({ popupName, inputName }) {
    let lastChecked = null;

    const $popup = $(`[data-popup-name="${popupName}"]`);

    // Открытие popup
    $(document).on('click', `[data-popup-name="${popupName}"]`, function () {
        const selectedValue = $(`input[name="${inputName}"]:checked`).val();

        if (selectedValue) {
            const $el = $(`input[name="${inputName}"][value="${selectedValue}"]`);
            $el.prop('checked', true);
            lastChecked = $el[0];
        }

        updateFormState();
    });

    // radio click
    $(document).on('click', `input[name="${inputName}"][type="radio"]`, function () {
        if (lastChecked === this) {
            $(this).prop('checked', false);
            lastChecked = null;
            updateFormState();
        } else {
            lastChecked = this;
        }
    });

    // change
    $(document).on('change', `input[name="${inputName}"][type="radio"]`, updateFormState);

    // text input
    $(document).on('input', `input[name="${inputName}"][type="text"]`, validateAndUpdateSaveButton);

    // submit
    $(document).on('click', `[data-popup-name="${popupName}"] .popup__buttons button[type="submit"]`, function (e) {
        e.preventDefault();
        save();
    });

    // cancel
    $(document).on('click', `[data-popup-name="${popupName}"] .popup__buttons button[type="button"]`, function () {
        $(`input[name="${inputName}"][type="text"]`).val('').prop('disabled', true);
        $(`input[name="${inputName}"][type="radio"]`).prop('checked', false);
    });

    function updateFormState() {
        const selectedOption = $(`input[name="${inputName}"]:checked`);
        const textInput = $(`input[name="${inputName}"][type="text"]`);
        const isNoneSelected = selectedOption.val() === 'none';

        textInput.prop('disabled', !selectedOption.length || isNoneSelected);

        if (isNoneSelected) {
            textInput.val('');
            $popup.find('.input__container input').removeClass('filled');
        }

        validateAndUpdateSaveButton();
    }

    function validateAndUpdateSaveButton() {
        const selectedOption = $(`input[name="${inputName}"]:checked`);
        const saveButton = $popup.find('.popup__buttons button[type="submit"]');

        saveButton.prop('disabled', !selectedOption.length);
    }

    function save() {
        const selectedOption = $(`input[name="${inputName}"]:checked`);
        const textInput = $(`input[name="${inputName}"][type="text"]`);

        const valueBlock = $(`.${popupName}__value p`);
        const spanBlock = $(`.${popupName}__value span`);

        if (!selectedOption.length) {
            valueBlock.text('––');
            spanBlock.text('');
            return;
        }

        const optionText = selectedOption.closest('.popup__label').find('span').text();
        const inputValue = textInput.val().trim();

        valueBlock.text(optionText);

        if (selectedOption.val() === 'none') {
            spanBlock.text('');
        } else if (inputValue) {
            spanBlock.text(` (${inputValue}%)`);
        } else {
            spanBlock.text('');
        }
    }

    $(document).ready(updateFormState);
}

togglePopupGroup({
    popupName: 'check-adaptation',
    inputName: 'adaptation'
});

togglePopupGroup({
    popupName: 'check-adaptation-fact',
    inputName: 'adaptation-fact'
});

togglePopupGroup({
    popupName: 'check-adaptation-channels',
    inputName: 'adaptation-channels'
});

togglePopupGroup({
    popupName: 'check-button',
    inputName: 'check-button'
});

togglePopupGroup({
    popupName: 'check-button-fact',
    inputName: 'check-button-fact'
});

togglePopupGroup({
    popupName: 'check-button-channels',
    inputName: 'check-button-channels'
});