module.exports = {
  defaults: {
    buttons: [

    ],
    count: false,
    isCalendar: false,
    isRows: false,
    isSearch: false,
    title: false,
  },
  mergeConfig(data, defaults) {
    return {
      buttons: data.buttons !== undefined && data.buttons.length > 0 ? data.buttons : defaults.buttons,
      count: data.count !== undefined ? data.count : defaults.count,
      isCalendar: data.isCalendar !== undefined ? data.isCalendar : defaults.isCalendar,
      isRows: data.isRows !== undefined ? data.isRows : defaults.isRows,
      isSearch: data.isSearch !== undefined ? data.isSearch : defaults.isSearch,
      title: data.title !== undefined ? data.title : defaults.title,
    }
  },
};