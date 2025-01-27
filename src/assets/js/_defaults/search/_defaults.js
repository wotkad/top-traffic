module.exports = {
  defaults: {
    class: false,
    containerClass: false,
    isForm: false,
  },
  mergeConfig(data, defaults) {
    return {
      class: data.class !== undefined ? data.class : defaults.class,
      containerClass: data.containerClass !== undefined ? data.containerClass : defaults.containerClass,
      isForm: data.isForm !== undefined ? data.isForm : defaults.isForm,
    }
  },
};