import awaitTo from 'await-to-js'
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken } from '@/common/cache/user'

NProgress.configure({ showSpinner: false })

/* 拦截白名单 */
const whiteList = ['/login', '/auth-redirect', '/404', '/401']

/* 判断该即将访问的路由有没有许可 */
function hasPermission (userRoles, toRoles) {
  /* 如果toRoles为空，或者用户拥有‘admin’，则用户有权限 */
  if (!toRoles || !toRoles.length || userRoles.includes('admin')) {
    return true
  }
  /* 如果userRoles和toRoles都不为空，则进行权限比对 */
  if (userRoles && toRoles) {
    return userRoles.some(userRole => toRoles.includes(userRole))
  }
  return false
}

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  /* 判断token是否存在 */
  const tokenObj = getToken()
  /* token不存在，判断该路由是属于白名单*/
  if (!tokenObj.token) {
    if (whiteList.includes(to.path)) {
      next()
      return
    }
    next(`/login?redirect=${to.path}`)
    NProgress.done()
    return
  }
  /* token存在，更新remember状态 */
  store.commit('SET_REMEMBER', tokenObj.isLocal)
  /* 获取用户信息，store中的数据在浏览器刷新时会丢失，所以刷新时必须获取用户并刷新路由表 */
  const userInfo = store.getters.user
  /* 用户信息存在 */
  if (userInfo) {
    /* 如果前往登录，则跳转到/ */
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
      return
    }
    /* 如果前往其他路由，判断有无许可，无许可则跳转401 */
    hasPermission(userInfo.roles, to.meta && to.meta.roles ? to.meta.roles : null) ? next() : next({
      path: '/401',
      replace: true,
      query: { noGoBack: true }
    })
    return
  }
  /* 用户信息不存在，获取用户信息 */
  const [err, res] = await awaitTo(store.dispatch('getUserInfo'))
  /* 获取用户信息失败，重置user并弹出错误信息 */
  if (err) {
    await awaitTo(store.dispatch('resetUser'))
    Message({
      showClose: true,
      type: 'error',
      message: err.message
    })
    next({ path: '/' })
    NProgress.done()
    return
  }
  /* 获取用户信息成功，创建路由表 */
  await awaitTo(store.dispatch('createRouterMap', res.data.roles || []))
  /* 将路由表同步更新到router对象中 */
  router.addRoutes(store.getters.permission.matchedRouters)
  /* 完成跳转 */
  next({ ...to, replace: true })
})

router.afterEach(() => {
  NProgress.done()
})
