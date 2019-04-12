import Mock from 'mockjs'
import loginAPI from '@/mock/login'

/* 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题 */
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

/* 登录相关 */
Mock.mock(/\/login/, 'post', loginAPI.login)
Mock.mock(/\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/userinfo\.*/, 'get', loginAPI.getUserInfo)

export default Mock
