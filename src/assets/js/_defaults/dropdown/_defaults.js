module.exports = {
  defaults: {
    buttons: [
      {
        isChecked: true,
        title: '1/24',
      },
      {
        title: '1/48',
      },
      {
        title: '1/72',
      },
      {
        title: 'Нативный',
      },
      {
        title: '1/24',
      },
      {
        title: '1/48',
      },
      {
        title: '1/72',
      },
      {
        title: 'Нативный',
      },
    ],
    checkboxes: [
      {
        isChecked: true,
        title: 'Все',
      },
      {
        title: 'Банки',
      },
      {
        title: 'Банки',
      },
      {
        title: 'Автомобили',
      },
    ],
    class: 'dropdown-base',
    classButton: '',
    color: 'status-transparent',
    image: {
      alt: 'image',
      enabled: false,
      src: '/assets/images/user-image.png',
    },
    isAll: false,
    isButtons: false,
    isCheckboxes: false,
    isLinks: false,
    isPriority: false,
    isRequired: false,
    isSelected: false,
    isStatus: false,
    label: '',
    links: [
      {
        href: '#',
        title: '1/24',
      },
      {
        href: '#',
        title: '1/48',
      },
      {
        href: '#',
        title: '1/72',
      },
      {
        href: '#',
        title: 'Нативный',
      },
      {
        href: '#',
        title: '1/24',
      },
      {
        href: '#',
        title: '1/48',
      },
      {
        href: '#',
        title: '1/72',
      },
      {
        href: '#',
        title: 'Нативный',
      },
    ],
    title: 'Выберите фильтр',
  },
  mergeConfig(data, defaults) {
    return {
      alt: data.image !== undefined ? data.image.alt : defaults.image.alt,
      buttons: data.buttons !== undefined && data.buttons.length > 0 ? data.buttons : defaults.buttons,
      checkboxes: data.checkboxes !== undefined && data.checkboxes.length > 0 ? data.checkboxes : defaults.checkboxes,
      class: data.class !== undefined ? data.class : defaults.class,
      classButton: data.classButton !== undefined ? data.classButton : defaults.classButton,
      color: data.color !== undefined ? data.color : defaults.color,
      image: data.image !== undefined ? data.image.enabled : defaults.image.enabled,
      isAll: data.isAll !== undefined ? data.isAll : defaults.isAll,
      isButtons: data.isButtons !== undefined ? data.isButtons : defaults.isButtons,
      isCheckboxes: data.isCheckboxes !== undefined ? data.isCheckboxes : defaults.isCheckboxes,
      isLinks: data.isLinks !== undefined ? data.isLinks : defaults.isLinks,
      isPriority: data.isPriority !== undefined ? data.isPriority : defaults.isPriority,
      isRequired: data.isRequired !== undefined ? data.isRequired : defaults.isRequired,
      isSelected: data.isSelected !== undefined ? data.isSelected : defaults.isSelected,
      isStatus: data.isStatus !== undefined ? data.isStatus : defaults.isStatus,
      label: data.label !== undefined ? data.label : defaults.label,
      links: data.links !== undefined && data.links.length > 0 ? data.links : defaults.links,
      src: data.image !== undefined ? data.image.src : defaults.image.src,
      title: data.title !== undefined ? data.title : defaults.title,
    }
  },
};