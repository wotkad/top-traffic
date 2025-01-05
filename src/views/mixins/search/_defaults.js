module.exports = {
  defaults: {
    class: '',
    isForm: false,
  },
  mergeConfig(data, defaults) {
    return {
      class: data.class !== undefined ? data.class : defaults.class,
      isForm: data.isForm !== undefined ? data.isForm : defaults.isForm,
    }
  }
}