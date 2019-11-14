import { permissionTypes } from '@/store/mutation-types'
import { constantRouterMap, asyncRouterMap } from '@/router/router.config'

/* 判断用户权限是否与路由权限匹配 */
function hasPermission (route, roles) {
  if (!route.meta || !route.meta.roles) {
    return true
  }
  return roles.some(role => route.meta.roles.includes(role))
}

/* 根据用户权限过滤路由表 */
function filterAsyncRouter (routerMap, roles) {
  return routerMap.filter(route => {
    if (!hasPermission(route, roles)) {
      return false
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, roles)
    }
    return true
  })
}

const permission = {
  state: {
    /* 最终路由表 */
    routers: constantRouterMap,
    /* 通过权限匹配到的动态路由表 */
    addRouters: []
  },
  mutations: {
    [permissionTypes.SET_ROUTERS]: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    /* 创建路由表 */
    createRouterMap ({ commit }, roles) {
      return new Promise(resolve => {
        console.log(asyncRouterMap)
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        console.log(accessedRouters)
        commit(permissionTypes.SET_ROUTERS, accessedRouters)
        resolve()
      })
    }
  },
  getters: {
    routers: state => state.routers,
    addRouters: state => state.addRouters
  }
}

export default permission
