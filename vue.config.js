'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const PORT = 8099
const API_SERVER = `http://localhost:${PORT}/mock`
// const API_SERVER = `https://hxk.nanhuokeji.com/api`

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: PORT,
    open: true,
    hotOnly: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      /* api代理 */
      /* 例：/api/xxx => http://localhost:8099/mock/xxx */
      /* 详情参考: https://cli.vuejs.org/config/#devserver-proxy */
      [process.env.VUE_APP_BASE_API]: {
        target: API_SERVER,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: require('./mock/server.js')
  },
  configureWebpack: {
    name: 'X-FRAMEWORK',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
