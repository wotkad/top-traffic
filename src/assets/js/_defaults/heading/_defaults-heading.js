module.exports = {
  defaults: {
    image: {
      alt: 'image',
      enabled: false,
      src: '/assets/images/user-image.png',
    },
    isAdmin: false,
    isChannel: false,
    isRk: false,
    tg: '',
    title: false,
  },
  mergeConfig(data, defaults) {
    return {
      alt: data.image !== undefined ? data.image.alt : defaults.image.alt,
      image: data.image !== undefined ? data.image.enabled : defaults.image.enabled,
      isAdmin: data.isAdmin !== undefined ? data.isAdmin : defaults.isAdmin,
      isChannel: data.isChannel !== undefined ? data.isChannel : defaults.isChannel,
      isRk: data.isRk !== undefined ? data.isRk : defaults.isRk,
      src: data.image !== undefined ? data.image.src : defaults.image.src,
      tg: data.tg !== undefined ? data.tg : defaults.tg,
      title: data.title !== undefined ? data.title : defaults.title,
    }
  },
};