module.exports = {
  defaults: {
    label: 'Наименование',
    type: 'text',
    placeholder: 'Введите текст',
    max: '',
    min: '',
    value: '',
    name: 'input',
    class: 'input',  
    autocomplete: 'on',
    icon: '',
    isLabel: false,
    isDisabled: false,
    isRequired: false,
    isChecked: false,
  },
  mergeConfig(data, defaults) {
    return {
      label: data.label !== undefined ? data.label : defaults.label,
      type: data.type !== undefined ? data.type : defaults.type,
      placeholder: data.placeholder !== undefined ? data.placeholder : defaults.placeholder,
      max: data.max !== undefined ? data.max : defaults.max,
      min: data.min !== undefined ? data.min : defaults.min,
      value: data.value !== undefined ? data.value : defaults.value,
      name: data.name !== undefined ? data.name : defaults.name,
      class: data.class !== undefined ? data.class : defaults.class,
      autocomplete: data.autocomplete !== undefined ? data.autocomplete : defaults.autocomplete,
      icon: data.icon !== undefined ? data.icon : defaults.icon,
      isLabel: data.isLabel !== undefined ? data.isLabel : defaults.isLabel,
      isDisabled: data.isDisabled !== undefined ? data.isDisabled : defaults.isDisabled,
      isRequired: data.isRequired !== undefined ? data.isRequired : defaults.isRequired,
      isChecked: data.isChecked !== undefined ? data.isChecked : defaults.isChecked,
    }
  }
}