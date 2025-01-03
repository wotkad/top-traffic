module.exports = {
  defaults: {
    class: '',
    form: false,
  },
  mergeConfig(data) {
    return {
      class: data.class !== undefined ? data.class : '',
      form: data.form !== undefined ? data.form : false,
    }
  }
}