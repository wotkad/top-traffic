module.exports = {
  defaults: {
    title: 'Возраст канала',
    value: '2 года 11 месяцев',
    icon: 'widget-clock-icon',
    tip: {
      enabled: false,
      content: 'Подсказка!',
    },
  },
  mergeConfig(data, defaults) {
    return {
      title: data.title !== undefined ? data.title : defaults.title,
      value: data.value !== undefined ? data.value : defaults.value,
      icon: data.icon !== undefined ? data.icon : defaults.icon,
      tip: data.tip !== undefined ? data.tip.enabled : defaults.tip.enabled,
      content: data.tip !== undefined ? data.tip.content : defaults.tip.content,
    }
  }
}