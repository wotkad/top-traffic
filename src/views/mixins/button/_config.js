module.exports = {
  defaults: {
    title: 'Кнопка',
    class: '',
    icon: '',
    ariaLabel: 'button',
    close: false,
    type: 'button',
    disabled: false,
    switchable: false,
  },
  mergeConfig: (data, defaults) => ({
    switchable: data.switchable !== undefined ? data.switchable : defaults.switchable,
    close: data.close !== undefined ? data.close : defaults.close,
    class: data.class !== undefined ? data.class : defaults.class,
    ariaLabel: data.ariaLabel !== undefined ? data.ariaLabel : defaults.ariaLabel,
    title: data.title !== undefined ? data.title : defaults.title,
    type: data.type !== undefined ? data.type : defaults.type,
    icon: data.icon !== undefined ? data.icon : defaults.icon,
    disabled: data.disabled !== undefined ? data.disabled : defaults.disabled,
  }),
};
