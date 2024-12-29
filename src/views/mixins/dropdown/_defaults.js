module.exports = {
  defaults: {
    label: 'Значение',
    class: '', 
    icon: {
      enabled: false,
      src: '/assets/images/user-icon.png',
      alt: 'icon',
    },
    value: '1/24',
    values: [
      { value: '1/24', checked: true },
      { value: '1/48' },
      { value: '1/72' },
      { value: 'Нативный' },
      { value: '1/24' },
      { value: '1/48' },
      { value: '1/72' },
      { value: 'Нативный' },
    ],
  },
  mergeConfig(data) {
    return {
      type: data.type !== undefined ? data.type : false,
      label: data.label !== undefined ? data.label : false,
      class: data.class !== undefined ? data.class : '',
      value: data.value !== undefined ? data.value : '',
      icon: data.icon !== undefined ? data.icon.enabled : false,
      src: data.icon !== undefined ? data.icon.src : '',
      alt: data.icon !== undefined ? data.icon.alt : '',
      values: data.values !== undefined && data.values.length > 0 ? data.values : false,
    }
  }
}