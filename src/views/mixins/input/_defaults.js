module.exports = {
  defaults: {
    type: 'text',
    placeholder: 'Введите текст',
    label: 'Наименование',
    disabled: false,
    required: false,
    checked: false,
    max: '',
    min: '',
    value: '',
    name: '',
    class: 'input',  
    autocomplete: 'on',   
  },
  mergeConfig(data) {
    return {
      label: data.label !== undefined ? data.label : false,
      type: data.type !== undefined ? data.type : false,
      placeholder: data.placeholder !== undefined ? data.placeholder : false,
      disabled: data.disabled !== undefined ? data.disabled : false,
      required: data.required !== undefined ? data.required : false,
      checked: data.checked !== undefined ? data.checked : false,
      max: data.max !== undefined ? data.max : false,
      min: data.min !== undefined ? data.min : false,
      value: data.value !== undefined ? data.value : false,
      name: data.name !== undefined ? data.name : false,
      class: data.class !== undefined ? data.class : '',
      autocomplete: data.autocomplete !== undefined ? data.autocomplete : false,
    }
  }
}