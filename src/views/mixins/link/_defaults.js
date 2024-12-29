module.exports = {
  defaults: {
    title: 'Ссылка',
    class: 'button button-base',
    icon: '',
    ariaLabel: 'button',
    close: false,
    href: '#',
    download: false,
    switchable: false,
  },
  mergeConfig: (data, defaults) => ({
    switchable: data.switchable !== undefined ? data.switchable : false,
    close: data.close !== undefined ? data.close : false,
    class: data.class !== undefined ? data.class : false,
    ariaLabel: data.ariaLabel !== undefined ? data.ariaLabel : false,
    title: data.title !== undefined ? data.title : false,
    href: data.href !== undefined ? data.href : false,
    icon: data.icon !== undefined ? data.icon : '',
    class: data.class !== undefined ? data.class : '',
    download: data.download !== undefined ? data.download : false,
  }),
}; 