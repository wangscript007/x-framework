import { commonRequest } from '@/api/common'

export function login (data) {
  return commonRequest({
    options: {
      url: '/user/login',
      method: 'post',
      data
    },
    message: '验证失败，请重试'
  })
}

export function logout () {
  return commonRequest({
    options: {
      url: '/user/logout',
      method: 'post'
    },
    message: '操作失败，请重试'
  })
}

export function getUserInfo () {
  return commonRequest({
    options: {
      url: '/user/info',
      method: 'get'
    },
    message: '获取用户信息失败，请重试'
  })
}

export function getUserRole () {
  return commonRequest({
    options: {
      url: '/user/roles',
      method: 'get'
    },
    message: '获取用户权限失败，请重试'
  })
}
