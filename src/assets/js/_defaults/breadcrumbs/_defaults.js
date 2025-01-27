module.exports = {
  defaults: {
    values: [
      {
        href: '#',
        title: 'Страница',
      },
      {
        href: '',
        title: 'Дочерняя страница',
      },
    ],
  },
  mergeConfig(data, defaults) {
    return {
      values: data.values !== undefined && data.values.length > 0 ? data.values : defaults.values,
    }
  },
};