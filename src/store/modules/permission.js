import path from 'path'
import { permissionTypes } from '@/store/mutation-types'
import systemRouterMap from '@/router/maps/systemRouterMap'
import asyncRouterMap from '@/router/maps/asyncRouterMap'

/* 判断用户权限是否与路由权限匹配 */
function hasPermission (route, userRoles) {
  if (!route.meta || !route.meta.roles) {
    return true
  }
  if (!userRoles.includes('admin') || route.meta.absolute) {
    return userRoles.some(role => route.meta.roles.includes(role))
  }
  return true
}

/* 根据用户权限过滤路由表 */
function routerFilter (routerMap, userRoles, parentPath = '') {
  return routerMap.filter(route => {
    if (!hasPermission(route, userRoles)) {
      return false
    }
    if (route.children && route.children.length) {
      const matchedChildren = routerFilter(route.children, userRoles)
      if (matchedChildren && matchedChildren.length) {
        const firstChild = matchedChildren.find(item => {
          return item.meta && !item.meta.external
        })
        if (firstChild) {
          route.redirect = path.resolve(parentPath, route.path, firstChild.path)
        }
      }
      route.children = matchedChildren
    }
    return true
  })
}

/* 查找默认路由 */
function findDefaultPath (routerMap, res = '') {
  routerMap.find(route => {
    if (!route.meta || route.meta.hidden || route.meta.external) {
      return false
    }
    res = path.resolve(res, route.path)
    if (route.children && route.children.length > 0) {
      res = path.resolve(res, findDefaultPath(route.children, res))
    }
    return true
  })
  return res
}

const permission = {
  state: {
    permission: {
      /* 最终路由表 */
      routers: [],
      /* 通过权限匹配到的动态路由表 */
      matchedRouters: [],
      /* 默认首页，经过权限筛选过后的路由表的第一个非系统级别的path */
      defaultPath: ''
    }
  },
  mutations: {
    [permissionTypes.SET_ROUTERS]: (state, {
      matchedRouters,
      defaultPath
    }) => {
      state.permission.matchedRouters = matchedRouters
      state.permission.routers = systemRouterMap.concat(matchedRouters)
      state.permission.defaultPath = defaultPath
    }
  },
  actions: {
    /* 创建路由表 */
    createRouterMap: async ({ commit }, userRoles) => {
      const matchedRouters = routerFilter(asyncRouterMap, userRoles)
      const defaultPath = findDefaultPath(matchedRouters)
      commit(permissionTypes.SET_ROUTERS, {
        matchedRouters,
        defaultPath
      })
    }
  },
  getters: {
    permission: state => state.permission
  }
}

export default permission
