import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  Message
} from 'element-ui'
import {
  getToken
} from '@/common/cache/user'

NProgress.configure({
  showSpinner: false
})

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
  NProgress.start()
    /* 判断token是否存在 */
  const tokenObj = getToken()
  if (tokenObj.token) {
    /* token存在，先更新remember状态，则判断用户信息是否存在，store中的user在浏览器刷新时会丢失，所以浏览器刷新时也会重新获取用户信息并重新生成路由表 */
    /* 更新remember状态 */
    store.commit('SET_REMEMBER', tokenObj.isLocal)
      /* 获取用户信息 */
    const userInfo = store.getters.user
    if (!userInfo) {
      /* 用户信息不存在*/
      try {
        /* 获取用户信息 */
        const res = await store.dispatch('getUserInfo')
          /* 根据获取到的用户的权限创建路由表 */
        await store.dispatch('createRouterMap', res.data.roles || [])
          /* 将路由表同步更新到router对象中 */
        router.addRoutes(store.getters.permission.matchedRouters)
          /* 跳转 */
        next({...to,
          replace: true
        })
      } catch (err) {
        /* 当用户信息获取失败时，前端登出并弹出错误信息 */
        await store.dispatch('fedLogout')
        Message({
          showClose: true,
          type: 'error',
          message: err.message
        })
        next({
          path: '/'
        })
      }
    } else {
      /* 用户信息存在 */
      if (to.path === '/login') {
        /* 如果前往登录，则跳转到/ */
        next({
          path: '/'
        })
        NProgress.done()
      } else {
        /* 如果是去其他路由，则判断有没有许可，无许可则跳转401 */
        hasPermission(userInfo.roles, to.meta && to.meta.roles ? to.meta.roles : null) ? next() : next({
          path: '/401',
          replace: true,
          query: {
            noGoBack: true
          }
        })
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
  NProgress.done()
})
