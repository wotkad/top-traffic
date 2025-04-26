module.exports = {
  defaults: {
    class: false,
    containerClass: false,
    isCounter: false,
    isForm: false,
  },
  mergeConfig(data, defaults) {
    return {
      class: data.class !== undefined ? data.class : defaults.class,
      containerClass: data.containerClass !== undefined ? data.containerClass : defaults.containerClass,
      isCounter: data.isCounter !== undefined ? data.isCounter : defaults.isCounter,
      isForm: data.isForm !== undefined ? data.isForm : defaults.isForm,
    }
  },
};