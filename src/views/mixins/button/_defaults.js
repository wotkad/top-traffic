module.exports = {
  defaults: {
    title: 'Кнопка',         
    class: 'button button-base',               
    icon: '',                
    ariaLabel: 'button',     
    close: false,            
    type: 'button',          
    disabled: false,         
    switchable: false,       
  },
  mergeConfig(data) {
    return {
      switchable: data.switchable !== undefined ? data.switchable : false,
      close: data.close !== undefined ? data.close : false,
      class: data.class !== undefined ? data.class : '',
      ariaLabel: data.ariaLabel !== undefined ? data.ariaLabel : false,
      title: data.title !== undefined ? data.title : false,
      type: data.type !== undefined ? data.type : false,
      icon: data.icon !== undefined ? data.icon : '',
      disabled: data.disabled !== undefined ? data.disabled : false,
    }
  }
}