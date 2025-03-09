function toggleAccordionItem() {
  $(document).on('change', '.accordion__checkbox', function () {
    let container = $(this).closest('.accordion');
    let accordions = $(this).closest('.accordions');
    let counter = container.siblings('.accordions__counter');
    let checkedItems = accordions.find('.accordion__checkbox:checked').not('.accordions__counter .accordion__checkbox').length;

    $(this).closest('.accordion__item').toggleClass('active', this.checked);

    counter.find('.accordion__value').text(checkedItems);
    counter.toggleClass('active', checkedItems > 0);

    accordions.find('.accordion__item').toggleClass('active', checkedItems > 0);
  });

  $(document).on('change', '.accordions__counter input.accordion__checkbox', function () {
    let isChecked = this.checked;
    let container = $(this).closest('.accordions').find('.accordion');

    container.find('.accordion__checkbox').prop('checked', isChecked).trigger('change');
  });

  $('.accordions__clear').on('click', function () {
    let container = $(this).closest('.accordions');

    container.find('.accordion__checkbox').prop('checked', false).trigger('change');
    container.find('.accordions__counter').removeClass('active');
    container.find('.accordion__value').text(0);
  });

  $(document).on('click', '.accordion__item', function (e) {
    if (!$(e.target).is('input, button.accordion__action, a, button.accordion__action svg, button.accordion__action svg use')) {
      let checkbox = $(this).find('.accordion__checkbox');
      checkbox.prop('checked', !checkbox.prop('checked')).trigger('change');
    }
  });

  $(document).on('click', '.popup[data-popup-name="delete-link"] .button-confirm, .popup[data-popup-name="delete-file"] .button-confirm', function () {
    setTimeout(function () {
      $('.accordions').each(function () {
        let accordions = $(this);
        let counter = accordions.find('.accordions__counter');
        let checkedItems = accordions.find('.accordion__checkbox:checked').not('.accordions__counter .accordion__checkbox').length;
        
        counter.find('.accordion__value').text(checkedItems);
        counter.toggleClass('active', checkedItems > 0);
      });
    }, 0);
  });
}
toggleAccordionItem();
