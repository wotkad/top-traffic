function toggleTagGroup({ popupName, inputName, listClass, buttonClass }) {
    let lastChecked = null;

    const $popup = $(`.popup[data-popup-name="${popupName}"]`);
    const $saveBtn = $popup.find('.popup__buttons button[type="submit"]');
    const $textarea = $popup.find('.popup__textarea');
    const $placeholder = $popup.find('.popup__placeholder');

    // открытие popup
    $(document).on('click', `[data-popup-name="${popupName}"]`, function () {
        const selectedValue = $(`input[name="${inputName}"]:checked`).val();

        if (selectedValue) {
            const $el = $(`input[name="${inputName}"][value="${selectedValue}"]`);
            $el.prop('checked', true);
            lastChecked = $el[0];
        }
    });

    // cancel
    $(document).on('click', `[data-popup-name="${popupName}"] .popup__buttons button[type="button"]`, function () {
        $(`input[name="${inputName}"][type="radio"]`).prop('checked', false);

        $textarea
            .css('background-color', '#FBFBFB')
            .empty();

        $saveBtn.prop('disabled', true);
        lastChecked = null;

        $popup.find('.popup__error').removeClass('active');
    });

    // submit
    $saveBtn.on('click', function () {
        lastChecked = null;
    });

    // radio click (toggle)
    $(document).on('click', `input[name="${inputName}"][type="radio"]`, function () {
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

    // change
    $(document).on('change', `input[name="${inputName}"][type="radio"]`, updateFormState);

    function updateFormState() {
        const selectedOption = $(`input[name="${inputName}"]:checked`);
        const isNoneSelected = selectedOption.val() === 'none';

        $textarea
            .toggleClass('disabled', isNoneSelected)
            .attr('contenteditable', isNoneSelected ? 'false' : 'true');

        if (isNoneSelected || selectedOption.length === 0) {
            $textarea.text('');
            $placeholder.show();
            $textarea.css('background-color', '#FBFBFB');
        } else {
            $textarea.css('background-color', '#FFFFFF');
        }
    }

    // "показать все"
    const $list = $(`.${listClass}`);

    $(document).on('click', `.${buttonClass}`, function () {
        $(this).addClass('hidden');
        $list.addClass('active');
    });
}

toggleTagGroup({
    popupName: 'add-tag',
    inputName: 'tag',
    listClass: 'tag__list',
    buttonClass: 'tag__button'
});

toggleTagGroup({
    popupName: 'add-tag-fact',
    inputName: 'add-tag-fact',
    listClass: 'tag__list',
    buttonClass: 'tag__button'
});