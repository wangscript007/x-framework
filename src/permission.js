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

router.beforeEach((to, from, next) => {
  /* 开启progress */
  NProgress.start()
    /* 判断token是否存在 */
  if (getToken()) {
    /* token存在，则判断用户信息是否存在，store中的user在浏览器刷新时会丢失，所以浏览器刷新时也会重新获取用户信息并重新生成路由表 */
    const userInfo = store.getters.user
    if (!userInfo) {
      /* 用户信息不存在，则获取用户信息 */
      store.dispatch('getUserInfo').then(response => {
        /* 获取用户信息成功时，则根据用户权限生成相应的路由表 */
        const userRoles = response.data.roles || []
        store.dispatch('createRouterMap', userRoles).then(() => {
          /* 将经过权限筛选后的路由表添加到router */
          router.addRoutes(store.getters.permission.matchedRouters)
          next({...to, replace: true })
        })
      }).catch(error => {
        /* 获取用户信息失败时，直接登出 */
        store.dispatch('fedLogout').then(() => {
          Message({ message: error.message, type: 'error' })
          next({ path: '/' })
        })
      })
    } else {
      /* 用户信息存在 */
      if (to.path === '/login') {
        /* 如果是去登录页，则跳转到'/' */
        next({ path: '/' })
        NProgress.done()
      } else {
        /* 如果是去其他路由，则判断有没有许可，没有许可就去401 */
        if (hasPermission(userInfo.roles, to.meta && to.meta.roles ? to.meta.roles : null)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } })
        }
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