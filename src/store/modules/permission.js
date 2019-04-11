import path from 'path'
import { permissionTypes } from '@/store/mutation-types'
import systemRouterMap from '@/router/maps/systemRouterMap'
import asyncRouterMap from '@/router/maps/asyncRouterMap'

/* 通过meta.role判断是否与当前用户权限匹配 */
function hasPermission(route, userRoles) {
  if (route.meta && route.meta.roles) {
    return userRoles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/* 过滤异步路由表，返回符合用户角色权限的路由表 */
function routerFilter(routerMap, userRoles) {
  return routerMap.filter(route => {
    if (hasPermission(route, userRoles)) {
      if (route.children && route.children.length > 0) {
        const matchedChildren = routerFilter(route.children, userRoles)
        if (route.redirect && matchedChildren.length > 0) {
          route.redirect = path.resolve(route.path, matchedChildren[0].path)
        }
        route.children = matchedChildren
      }
      return true
    } else {
      return false
    }
  })
}

/* 查找默认路由 */
function findDefaultPath(res, routerMap) {
  routerMap.find(route => {
    if (route.meta && !route.meta.hidden) {
      res = path.resolve(res, route.path)
      if (route.children && route.children.length > 0) {
        res = path.resolve(res, findDefaultPath(res, route.children))
      }
      return true
    } else {
      return false
    }
  })
  return res
}

const permission = {
  state: {
    permission: {
      /* 默认首页，经过权限筛选过后的路由表的第一个非系统级别的path */
      defaultPath: '',
      /* 最终路由表 */
      routers: [],
      /* 通过权限匹配到的动态路由表 */
      matchedRouters: []
    }
  },
  mutations: {
    [permissionTypes.SET_ROUTERS]: (state, { matchedRouters, defaultPath }) => {
      state.permission.defaultPath = defaultPath
      state.permission.matchedRouters = matchedRouters
      state.permission.routers = systemRouterMap.concat(matchedRouters)
    }
  },
  actions: {
    /* 创建路由表 */
    createRouterMap: async({ commit }, userRoles) => {
      const matchedRouters = userRoles.includes('admin') ? asyncRouterMap : routerFilter(asyncRouterMap, userRoles)
      const defaultPath = findDefaultPath('', matchedRouters)
      commit(permissionTypes.SET_ROUTERS, { matchedRouters, defaultPath })
    }
  },
  getters: {
    permission: state => state.permission
  }
}

export default permission