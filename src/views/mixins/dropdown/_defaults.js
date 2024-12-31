module.exports = {
  defaults: {
    label: 'Значение',
    class: '',
    color: 'green',
    icon: {
      enabled: false,
      src: '/assets/images/user-icon.png',
      alt: 'icon',
    },
    buttons: [
      { title: '1/24', color: false, checked: true },
      { title: '1/48', color: false },
      { title: '1/72', color: false },
      { title: 'Нативный', color: false },
      { title: '1/24', color: false },
      { title: '1/48', color: false },
      { title: '1/72', color: false },
      { title: 'Нативный', color: false },
    ],
    links: [
      { title: '1/24', href: "#" },
      { title: '1/48', href: "#" },
      { title: '1/72', href: "#" },
      { title: 'Нативный', href: "#" },
      { title: '1/24', href: "#" },
      { title: '1/48', href: "#" },
      { title: '1/72', href: "#" },
      { title: 'Нативный', href: "#" },
    ],
  },
  mergeConfig(data) {
    return {
      class: data.class !== undefined ? data.class : '',
      color: data.color !== undefined ? data.color : false,
      label: data.label !== undefined ? data.label : '',
      icon: data.icon !== undefined ? data.icon.enabled : false,
      src: data.icon !== undefined ? data.icon.src : '',
      alt: data.icon !== undefined ? data.icon.alt : '',
      links: data.links !== undefined && data.links.length > 0 ? data.links : false,
      buttons: data.buttons !== undefined && data.buttons.length > 0 ? data.buttons : false,
    }
  }
}