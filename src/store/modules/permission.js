// import lodash from 'lodash'
import { permissionTypes } from '@/store/mutation-types'
import { asyncRouterMap, constantRouterMap } from '@/router'

/*
 * 通过meta.role判断是否与当前用户权限匹配
 */
function hasPermission(route, roles) {
  return route.meta && route.meta.roles ? roles.some(role => route.meta.roles.includes(role)) : true
}

/*
 * 过滤异步路由表，返回符合用户角色权限的路由表
 */
function filterAsyncRouter(routerMap, roles) {
  return routerMap.filter(route => {
    return hasPermission(route, roles) ? (() => {
      if (route.children && route.children.length) {
        const matchedChildren = filterAsyncRouter(route.children, roles)
        route.children = matchedChildren
          /* 更新路由重定向 */
        if (route.redirect && matchedChildren.length > 0) {
          route.redirect = `${route.path}/${matchedChildren[0].path}`
        }
      }
      return true
    })() : false
  })
}

const permission = {
  state: {
    permission: {
      /* 最终路由表 */
      routers: [],
      /* 通过权限匹配到的动态路由表 */
      matchedRouters: []
    }
  },
  mutations: {
    [permissionTypes.SET_ROUTERS]: (state, routers) => {
      state.permission.matchedRouters = routers
      state.permission.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    createRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        commit(permissionTypes.SET_ROUTERS, roles.includes('admin') ? asyncRouterMap : filterAsyncRouter(asyncRouterMap, roles))
        resolve()
      })
    }
  },
  getters: {
    permission: state => state.permission
  }
}

export default permission