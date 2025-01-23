module.exports = {
  defaults: {
    title: 'Возраст канала',
    values: [
      { value: '2 года 11 месяцев', class: false },
    ],
    icon: 'widget-clock-icon',
    tip: {
      enabled: false,
      content: 'Подсказка!',
    },
  },
  mergeConfig(data, defaults) {
    return {
      title: data.title !== undefined ? data.title : defaults.title,
      values: data.values !== undefined && data.values.length > 0 ? data.values : defaults.values,
      icon: data.icon !== undefined ? data.icon : defaults.icon,
      tip: data.tip !== undefined ? data.tip.enabled : defaults.tip.enabled,
      content: data.tip !== undefined ? data.tip.content : defaults.tip.content,
    }
  }
}