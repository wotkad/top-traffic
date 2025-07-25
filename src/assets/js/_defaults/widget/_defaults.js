module.exports = {
  defaults: {
    buttons: [

    ],
    color: false,
    icon: 'widget-clock-icon',
    isFourValues: false,
    isProgresses: false,
    isRows: false,
    mainValue: {
      awaiting: '',
      reality: '',
      value: '',
    },
    position: '',
    progresses: [
      {
        awaiting: '0',
        content: 'Подсказка',
        reality: '100',
        title: 'Название',
        value: '0',
      },
      {
        awaiting: '0',
        content: 'Подсказка',
        reality: '100',
        title: 'Название',
        value: '0',
      },
    ],
    subtitle: 'Подзаголовок',
    tip: {
      content: 'Подсказка',
      enabled: false,
      isHidden: false,
    },
    title: 'Заголовок',
    titleClass: '',
    values: [
      {
        class: false,
        progress: {
          awaiting: '0',
          content: 'Подсказка',
          enabled: false,
          reality: '100',
          value: '0',
        },
        value: 'Значение',
      },
    ],
  },
  mergeConfig(data, defaults) {
    return {
      buttons: data.buttons !== undefined && data.buttons.length > 0 ? data.buttons : defaults.buttons,
      color: data.color !== undefined ? data.color : defaults.color,
      content: data.tip !== undefined ? data.tip.content : defaults.tip.content,
      icon: data.icon !== undefined ? data.icon : defaults.icon,
      isFourValues: data.isFourValues !== undefined ? data.isFourValues : defaults.isFourValues,
      isHidden: data.tip !== undefined ? data.tip.isHidden : defaults.tip.isHidden,
      isProgresses: data.isProgresses !== undefined ? data.isProgresses : defaults.isProgresses,
      isRows: data.isRows !== undefined ? data.isRows : defaults.isRows,
      mainValue: data.mainValue !== undefined ? data.mainValue : defaults.mainValue,
      position: data.position !== undefined ? data.position : defaults.position,
      progresses: data.progresses !== undefined && data.progresses.length > 0 ? data.progresses : defaults.progresses,
      subtitle: data.subtitle !== undefined ? data.subtitle : defaults.subtitle,
      tip: data.tip !== undefined ? data.tip.enabled : defaults.tip.enabled,
      title: data.title !== undefined ? data.title : defaults.title,
      titleClass: data.titleClass !== undefined ? data.titleClass : defaults.titleClass,
      values: data.values !== undefined && data.values.length > 0 ? data.values : defaults.values,
    }
  },
};