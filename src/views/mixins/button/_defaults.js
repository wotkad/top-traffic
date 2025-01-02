module.exports = {
  defaults: {
    view: '',
    title: 'Кнопка',
    class: 'button button-base',
    icon: '',
    calendar: false,
    ariaLabel: 'button',
    close: false,
    type: 'button',
    disabled: false,
    href: '#',
    download: false,
    switchable: false,
  },
  mergeConfig(data) {
    return {
      view: data.view !== undefined ? data.view : false,
      switchable: data.switchable !== undefined ? data.switchable : false,
      close: data.close !== undefined ? data.close : false,
      class: data.class !== undefined ? data.class : '',
      calendar: data.calendar !== undefined ? data.calendar : false,
      ariaLabel: data.ariaLabel !== undefined ? data.ariaLabel : false,
      title: data.title !== undefined ? data.title : false,
      type: data.type !== undefined ? data.type : false,
      icon: data.icon !== undefined ? data.icon : '',
      disabled: data.disabled !== undefined ? data.disabled : false,
      href: data.href !== undefined ? data.href : false,
      download: data.download !== undefined ? data.download : false,
    }
  }
}