const fs = require('fs')

module.exports = {
  assetsDir: 'static',
  devServer: {
    host: '127.0.0.1',
    port: 8099,
    open: true,
    hotOnly: true,
    proxy: null
  },
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync('src/assets/scss/variables.scss', 'utf-8')
      }
    }
  }
}