import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken } from '@/common/cache/user'

NProgress.configure({ showSpinner: false })

/* 拦截白名单 */
const whiteList = ['/login', '/auth-redirect']

/* 判断该即将访问的路由有没有许可 */
function hasPermission(userRoles, toRoles) {
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

router.beforeEach(async(to, from, next) => {
  /* 开启progress */
  NProgress.start()
    /* 判断token是否存在 */
  if (getToken()) {
    /* token存在，则判断用户信息是否存在，store中的user在浏览器刷新时会丢失，所以浏览器刷新时也会重新获取用户信息并重新生成路由表 */
    const userInfo = store.getters.user
      /* 用户信息不存在，则获取用户信息 */
    if (!userInfo) {
      try {
        /* 则获取用户信息、生成路由表、更新router对象、跳转 */
        const res = await store.dispatch('getUserInfo')
        await store.dispatch('createRouterMap', res.data.roles || [])
        router.addRoutes(store.getters.permission.matchedRouters)
        next({...to, replace: true })
      } catch (err) {
        await store.dispatch('fedLogout')
        Message.error(err.message)
        next({ path: '/' })
      }
    } else {
      /* 用户信息存在 */
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        /* 如果是去其他路由，则判断有没有许可，没有许可就去401 */
        hasPermission(userInfo.roles, to.meta && to.meta.roles ? to.meta.roles : null) ? next() : next({ path: '/401', replace: true, query: { noGoBack: true } })
      }
    }
  } else {
    /* token不存在，则判断该路由是否在白名单内 */
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  /* 关闭progress */
  NProgress.done()
})