module.exports = {
  pwa: {
    themeColor: '#51004f',
    msTileColor: '#603cba',
    iconPaths: {
      favicon32: 'favicon/favicon-32x32.png',
      favicon16: 'favicon/favicon-16x16.png',
      appleTouchIcon: 'favicon/apple-touch-icon.png',
      maskIcon: 'favicon/safari-pinned-tab.svg',
      msTileImage: 'favicon/mstile-150x150.png'
    },
  },
  publicPath: process.env.DEPLOY_ENV === 'GH_PAGES' ?
    '/admin-one-vue-bulma-dashboard/' :
    '/',

  // Remove moment.js from chart.js
  // https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc
  configureWebpack: config => {
    return {
      externals: {
        moment: 'moment'
      }
    }
  },
  lintOnSave: false
}
