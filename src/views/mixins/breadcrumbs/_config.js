module.exports = {
  defaults: [
    { title: 'Страница', href: '#' },
    { title: 'Дочерняя страница', href: '' }
  ],
  mergeConfig: (data, defaults) => ({
    data: data !== undefined && data.length > 0 ? data : defaults,
  }),
};
