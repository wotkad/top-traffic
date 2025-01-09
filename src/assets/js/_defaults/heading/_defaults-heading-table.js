module.exports = {
  defaults: {
    title: 'Страница',
    count: '',
    buttons: [],
    isCalendar: false,
    isSearch: false,
    isRows: false,
  },
  mergeConfig(data, defaults) {
    return {
      title: data.title !== undefined ? data.title : defaults.title,
      count: data.count !== undefined ? data.count : defaults.count,
      buttons: data.buttons !== undefined && data.buttons.length > 0 ? data.buttons : defaults.buttons,
      isCalendar: data.isCalendar !== undefined ? data.isCalendar : defaults.isCalendar,
      isSearch: data.isSearch !== undefined ? data.isSearch : defaults.isSearch,
      isRows: data.isRows !== undefined ? data.isRows : defaults.isRows,
    }
  }
}