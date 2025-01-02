module.exports = {
  defaults: {
    label: 'Выберите фильтр',
    class: '',
    classButton: '',
    status: 'green',
    priority: false,
    icon: {
      enabled: false,
      src: '/assets/images/user-icon.png',
      alt: 'icon',
    },
    buttons: [
      { title: '1/24', priority: false, checked: true },
      { title: '1/48', priority: false },
      { title: '1/72', priority: false },
      { title: 'Нативный', priority: false },
      { title: '1/24', priority: false },
      { title: '1/48', priority: false },
      { title: '1/72', priority: false },
      { title: 'Нативный', priority: false },
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
    checkboxes: [
      { title: 'Все', checked: true },
      { title: 'Банки' },
      { title: 'Банки' },
      { title: 'Автомобили' },  
    ]
  },
  mergeConfig(data) {
    return {
      class: data.class !== undefined ? data.class : '',
      classButton: data.classButton !== undefined ? data.classButton : '',
      priority: data.priority !== undefined ? data.priority : false,
      status: data.status !== undefined ? data.status : false,
      label: data.label !== undefined ? data.label : '',
      icon: data.icon !== undefined ? data.icon.enabled : false,
      src: data.icon !== undefined ? data.icon.src : '',
      alt: data.icon !== undefined ? data.icon.alt : '',
      links: data.links !== undefined && data.links.length > 0 ? data.links : false,
      buttons: data.buttons !== undefined && data.buttons.length > 0 ? data.buttons : false,
      checkboxes: data.checkboxes !== undefined && data.checkboxes.length > 0 ? data.checkboxes : false,
    }
  }
}