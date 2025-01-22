module.exports = {
  defaults: {
    title: 'Страница',
    tg: '',
    image: {
      enabled: false,
      src: '/assets/images/user-image.png',
      alt: 'image',
    },
    isChannel: false,
    isAdmin: false,
    isRk: false,
  },
  mergeConfig(data, defaults) {
    return {
      title: data.title !== undefined ? data.title : defaults.title,
      tg: data.tg !== undefined ? data.tg : defaults.tg,
      image: data.image !== undefined ? data.image.enabled : defaults.image.enabled,
      src: data.image !== undefined ? data.image.src : defaults.image.src,
      alt: data.image !== undefined ? data.image.alt : defaults.image.alt,
      isChannel: data.isChannel !== undefined ? data.isChannel : defaults.isChannel,
      isAdmin: data.isAdmin !== undefined ? data.isAdmin : defaults.isAdmin,
      isRk: data.isRk !== undefined ? data.isRk : defaults.isRk,
    }
  }
}