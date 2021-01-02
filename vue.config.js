module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'IR Remote',
    themeColor: '#1976d2',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  },
  publicPath: process.env.BASE_URL ? process.env.BASE_URL : process.env.NODE_ENV === 'production' ? '/ir-remote/ui/': '/'
}
