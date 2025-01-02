module.exports = {
  defaults: {
    title: 'Страница',
    count: '',
    calendar: false,
    search: false,
    rows: false,
    buttons: [],
  },
  mergeConfig(data) {
    return {
      title: data.title !== undefined ? data.title : '',
      count: data.count !== undefined ? data.count : '',
      calendar: data.calendar !== undefined ? data.calendar : false,
      search: data.search !== undefined ? data.search : false,
      rows: data.rows !== undefined ? data.rows : '',
      buttons: data.buttons !== undefined && data.buttons.length > 0 ? data.buttons : false,
    }
  }
}