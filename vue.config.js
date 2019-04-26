'use strict'
const path = require('path')
const defaultSetting = require('./src/settings')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const port = 8099

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    hotOnly: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: require('./mock/server.js')
  },
  configureWebpack: {
    name: defaultSetting.name || 'X-FRAMEWORK',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
