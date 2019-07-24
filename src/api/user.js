import { commonRequest } from '@/api/common'

export function login (formData, callback) {
  return commonRequest({
    options: {
      url: '/user/login',
      method: 'post',
      data: formData
    },
    message: '验证失败，请重试',
    callback
  })
}

export function logout (callback) {
  return commonRequest({
    options: {
      url: '/user/logout',
      method: 'post'
    },
    message: '操作失败，请重试',
    callback
  })
}

export function getUserInfo (token, callback) {
  return commonRequest({
    options: {
      url: '/user/info',
      method: 'get',
      params: {
        token
      }
    },
    message: '获取用户信息失败，请重试',
    callback
  })
}
