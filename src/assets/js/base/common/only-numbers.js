function onlyNumbers() {
  $(document).on('input', '.only-numbers', function() {
    this.value = this.value.replace(/\D/g, '');
  });

  $(document).on('keypress', '.only-numbers', function(e) {
      let charCode = e.which ? e.which : e.keyCode;
      if (charCode < 48 || charCode > 57) {
          e.preventDefault();
      }
  });
}
onlyNumbers();