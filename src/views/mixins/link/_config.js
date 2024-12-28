const defaults = {
  title: 'Ссылка',
  class: '',
  icon: '',
  ariaLabel: 'button',
  close: false,
  href: '#',
  download: false,
  switchable: false,
};

function mergeConfig(data, defaults) {
  return {
    switchable: data.switchable !== undefined && data.hasData ? data.switchable : defaults.switchable,
    close: data.close !== undefined ? data.close : defaults.close,
    class: data.class !== undefined ? data.class : defaults.class,
    ariaLabel: data.ariaLabel !== undefined ? data.ariaLabel : defaults.ariaLabel,
    title: data.title !== undefined ? data.title : defaults.title,
    href: data.href !== undefined ? data.href : defaults.href,
    icon: data.icon !== undefined ? data.icon : defaults.icon,
    download: data.download !== undefined ? data.download : defaults.download,
  };
}

module.exports = {
  defaults,
  mergeConfig
};
