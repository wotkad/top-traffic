function toggleTableConcept() {
  $(document).on('click', '.create-new-concept', function() {
    var newConcept = $(this).clone();
    $(this).after(newConcept);
    $(this).removeClass('create-new-concept').addClass('concept');
  });
  $(document).on('click', '.delete-concept', function() {
    $(this).closest('.concept').remove();
  });
}
toggleTableConcept();