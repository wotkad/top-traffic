module.exports = {
  defaults: {
    containerClass: false,
    class: false,
    isForm: false,
  },
  mergeConfig(data, defaults) {
    return {
      containerClass: data.containerClass !== undefined ? data.containerClass : defaults.containerClass,
      class: data.class !== undefined ? data.class : defaults.class,
      isForm: data.isForm !== undefined ? data.isForm : defaults.isForm,
    }
  }
}