module.exports = {
  defaults: {
    class: '',
  },
  mergeConfig: (data, defaults) => ({
    class: data.class !== undefined ? data.class : defaults.class
  }),
};
