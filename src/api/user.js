import { commonRequest } from '@/api/common'
import apiPath from '@/api/path'

export function login (data) {
  return commonRequest({
    options: {
      url: apiPath.auth.login,
      method: 'post',
      data
    },
    message: '验证失败，请重试'
  })
}

export function getUserInfo () {
  return commonRequest({
    options: {
      url: apiPath.auth.getUserInfo,
      method: 'get'
    },
    message: '获取用户信息失败，请重试'
  })
}

export function getUserRole () {
  return commonRequest({
    options: {
      url: apiPath.auth.getUserRole,
      method: 'get'
    },
    message: '获取用户权限失败，请重试'
  })
}

export function logout () {
  return commonRequest({
    options: {
      url: apiPath.auth.logout,
      method: 'post'
    },
    message: '操作失败，请重试'
  })
}
