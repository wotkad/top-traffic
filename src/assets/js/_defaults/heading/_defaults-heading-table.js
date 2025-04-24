module.exports = {
  defaults: {
    buttons: [

    ],
    class: '',
    count: false,
    isCalendar: false,
    isCheckboxPosts: false,
    isCheckboxes: false,
    isDatePicker: false,
    isMonthPicker: false,
    isRows: false,
    isSearch: false,
    placeholder: false,
    searchClass: '',
    title: false,
    value: '',
  },
  mergeConfig(data, defaults) {
    return {
      buttons: data.buttons !== undefined && data.buttons.length > 0 ? data.buttons : defaults.buttons,
      class: data.class !== undefined ? data.class : defaults.class,
      count: data.count !== undefined ? data.count : defaults.count,
      isCalendar: data.isCalendar !== undefined ? data.isCalendar : defaults.isCalendar,
      isCheckboxes: data.isCheckboxes !== undefined ? data.isCheckboxes : defaults.isCheckboxes,
      isCheckboxPosts: data.isCheckboxPosts !== undefined ? data.isCheckboxPosts : defaults.isCheckboxPosts,
      isDatePicker: data.isDatePicker !== undefined ? data.isDatePicker : defaults.isDatePicker,
      isMonthPicker: data.isMonthPicker !== undefined ? data.isMonthPicker : defaults.isMonthPicker,
      isRows: data.isRows !== undefined ? data.isRows : defaults.isRows,
      isSearch: data.isSearch !== undefined ? data.isSearch : defaults.isSearch,
      placeholder: data.placeholder !== undefined ? data.placeholder : defaults.placeholder,
      searchClass: data.searchClass !== undefined ? data.searchClass : defaults.searchClass,
      title: data.title !== undefined ? data.title : defaults.title,
      value: data.value !== undefined ? data.value : defaults.value,
    }
  },
};