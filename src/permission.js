import awaitTo from 'await-to-js'
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken, getUser } from '@/cache'

NProgress.configure({ showSpinner: false })

/* 拦截白名单 */
const whiteList = ['/login', '/404', '/401', '/error']

/* 拦截器 */
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  /* token不存在 */
  if (!getToken()) {
    /* 前往白名单内的路由允许访问 */
    if (whiteList.includes(to.path)) {
      next()
      return
    }
    /* 非白名单，则跳转登录 */
    next({ path: '/login', query: { redirect: to.fullPath } })
    NProgress.done()
    return
  }
  /* 用户信息不存在 */
  if (!getUser()) {
    /* 则获取用户信息 */
    const [err] = await awaitTo(store.dispatch('getUserInfo'))
    /* 获取用户信息失败，清空缓存并弹出错误信息 */
    if (err) {
      Message({ showClose: true, type: 'error', message: err.message })
      await awaitTo(store.dispatch('clearUserCache'))
      next({ path: '/login', query: { redirect: to.fullPath } })
      NProgress.done()
      return
    }
  }
  /* 判断浏览器是否刷新 */
  let refreshed = false
  /* 权限信息不存在 */
  if (!store.getters.roles) {
    /* 获取权限信息 */
    const [err] = await awaitTo(store.dispatch('getUserRole'))
    if (err) {
      Message({ showClose: true, type: 'error', message: err.message })
      await awaitTo(store.dispatch('clearUserCache'))
      next({ path: '/login', query: { redirect: to.fullPath } })
      NProgress.done()
      return
    }
    /* 权限信息获取完毕后，重新创建路由表，并更新到router中 */
    await awaitTo(store.dispatch('createRouterMap', store.getters.roles))
    /* 将路由表同步更新到router对象中 */
    router.addRoutes(store.getters.addRouters)
    /* 更新完路由之后，变更刷新状态 */
    refreshed = true
  }
  /* 用户信息和权限信息存在，前往登录页则跳转主页 */
  if (to.path === '/login') {
    refreshed ? next({ path: '/', replace: true }) : next()
    NProgress.done()
    return
  }
  /* 完成跳转*/
  refreshed ? next({ ...to, replace: true }) : next()
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})
