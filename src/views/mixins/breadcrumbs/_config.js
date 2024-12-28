const defaults = [
  { title: 'Страница', href: '#' },
  { title: 'Дочерняя страница', href: '' }
];

function mergeConfig(data, defaults) {
  return {
    data: data !== undefined && data.length > 0 ? data : defaults,
  }
}

module.exports = {
  defaults,
  mergeConfig
};
