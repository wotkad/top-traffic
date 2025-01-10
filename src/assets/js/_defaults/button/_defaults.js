module.exports = {
  defaults: {
    view: 'button',
    title: 'Кнопка',
    class: 'button button-base',
    icon: '',
    iconPos: 'before',
    ariaLabel: 'button',
    href: '#',
    type: 'button',
    dataPopupName: false,
    isCalendar: false,
    isClose: false,
    isDisabled: false,
    isDownload: false,
    isSwitchable: false,
    isOnlyIcon: false,
  },
  mergeConfig(data, defaults) {
    return {
      view: data.view !== undefined ? data.view : defaults.view,
      title: data.title !== undefined ? data.title : defaults.title,
      class: data.class !== undefined ? data.class : defaults.class,
      icon: data.icon !== undefined ? data.icon : defaults.icon,
      iconPos: data.iconPos !== undefined ? data.iconPos : defaults.iconPos,
      ariaLabel: data.ariaLabel !== undefined ? data.ariaLabel : defaults.ariaLabel,
      href: data.href !== undefined ? data.href : defaults.href,
      type: data.type !== undefined ? data.type : defaults.type,
      dataPopupName: data.dataPopupName !== undefined ? data.dataPopupName : defaults.dataPopupName,
      isCalendar: data.isCalendar !== undefined ? data.isCalendar : defaults.isCalendar,
      isClose: data.isClose !== undefined ? data.isClose : defaults.isClose,
      isDisabled: data.isDisabled !== undefined ? data.isDisabled : defaults.isDisabled,
      isDownload: data.isDownload !== undefined ? data.isDownload : defaults.isDownload,
      isSwitchable: data.isSwitchable !== undefined ? data.isSwitchable : defaults.isSwitchable,
      isOnlyIcon: data.isOnlyIcon !== undefined ? data.isOnlyIcon : defaults.isOnlyIcon,
    }
  }
}