module.exports = {
  defaults: {
    title: 'Ссылка',
    class: '',
    icon: '',
    ariaLabel: 'button',
    close: false,
    href: '#',
    download: false,
    switchable: false,
  },
  mergeConfig: (data, defaults) => ({
    switchable: data.switchable !== undefined ? data.switchable : defaults.switchable, 
    close: data.close !== undefined ? data.close : defaults.close, 
    class: data.class !== undefined ? data.class : defaults.class, 
    ariaLabel: data.ariaLabel !== undefined ? data.ariaLabel : defaults.ariaLabel, 
    title: data.title !== undefined ? data.title : defaults.title, 
    href: data.href !== undefined ? data.href : defaults.href, 
    icon: data.icon !== undefined ? data.icon : defaults.icon, 
    class: data.class !== undefined ? data.class : defaults.class, 
    download: data.download !== undefined ? data.download : defaults.download
  }),
};