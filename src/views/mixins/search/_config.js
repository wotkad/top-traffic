const defaults = {
  class: '',
};

function mergeConfig(data, defaults) {
  return {
    class: data.class !== undefined ? data.class : defaults.class,
  };
}

module.exports = {
  defaults,
  mergeConfig,
};
