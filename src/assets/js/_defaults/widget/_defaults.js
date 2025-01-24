module.exports = {
  defaults: {
    title: 'Заголовок',
    values: [
      { 
        value: 'Значение', 
        class: false,  
        progress: {
          enabled: false,
          value: '0',
        },
      },
    ],
    progresses: [
      { 
        title: 'Название',
        value: '0', 
      },
      { 
        title: 'Название',
        value: '0', 
      },
    ],
    buttons: [],
    mainValue: false,
    icon: 'widget-clock-icon',
    tip: {
      enabled: false,
      content: 'Подсказка',
      isHidden: false,
    },
    subtitle: 'Подзаголовок',
    color: false,
    isRows: false,
    isFourValues: false,
    isProgresses: false,
  },
  mergeConfig(data, defaults) {
    return {
      title: data.title !== undefined ? data.title : defaults.title,
      values: data.values !== undefined && data.values.length > 0 ? data.values : defaults.values,
      progresses: data.progresses !== undefined && data.progresses.length > 0 ? data.progresses : defaults.progresses,
      buttons: data.buttons !== undefined && data.buttons.length > 0 ? data.buttons : defaults.buttons,
      mainValue: data.mainValue !== undefined ? data.mainValue : defaults.mainValue,
      icon: data.icon !== undefined ? data.icon : defaults.icon,
      tip: data.tip !== undefined ? data.tip.enabled : defaults.tip.enabled,
      content: data.tip !== undefined ? data.tip.content : defaults.tip.content,
      isHidden: data.tip !== undefined ? data.tip.isHidden : defaults.tip.isHidden,
      subtitle: data.subtitle !== undefined ? data.subtitle : defaults.subtitle,
      color: data.color !== undefined ? data.color : defaults.color,
      isRows: data.isRows !== undefined ? data.isRows : defaults.isRows,
      isFourValues: data.isFourValues !== undefined ? data.isFourValues : defaults.isFourValues,
      isProgresses: data.isProgresses !== undefined ? data.isProgresses : defaults.isProgresses,
    }
  }
}