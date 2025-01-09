module.exports = {
  defaults: {
    values: [
      { title: 'Страница', href: '#' },
      { title: 'Дочерняя страница', href: '' },
    ],
  },
  mergeConfig(data, defaults) {
    return {
      values: data.values !== undefined && data.values.length > 0 ? data.values : defaults.values,
    }
  }
}