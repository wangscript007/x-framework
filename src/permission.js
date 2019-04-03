import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken } from '@/common/utils/auth' // getToken from cookie
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

function hasPermission (roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

/* 拦截白名单 */
const whiteList = ['/login', '/auth-redirect']

router.beforeEach((to, from, next) => {
  /* 开启progress */
  NProgress.start()
  if (getToken()) {
    /* token存在，则进行下一步验证 */
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.user.roles.length === 0) {
        store.dispatch('getUserInfo').then(res => {
          const roles = res.data.roles
          store.dispatch('generateRoutes', { roles }).then(() => {
            /* 将经过权限筛选后的路由表添加到router */
            router.addRoutes(store.getters.permission.matchedRouters)
            next({
              ...to,
              replace: true
            })
          })
        }).catch((err) => {
          store.dispatch('fedLogout').then(() => {
            Message.error(err)
            next({ path: '/' })
          })
        })
      } else {
        /* 没有动态改变权限的需求可直接next() 删除下方判断 */
        if (hasPermission(store.getters.user.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } })
        }
        /* 可删除部分 */
      }
    }
  } else {
    /* token不存在，则判断该路由是否在白名单内 */
    if (whiteList.indexOf(to.path) !== -1) {
      /* 在免登录白名单，直接进入 */
      next()
    } else {
      /* 否则全部重定向到登录页 */
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  /* 关闭progress */
  NProgress.done()
})
