module.exports = {
  defaults: {
    class: '',
  },
  mergeConfig(data) {
    return {
      class: data.class !== undefined ? data.class : '',
    }
  }
}