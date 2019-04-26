import request from '@/common/utils/request'

export function login(formData) {
  return request({
    url: '/user/login',
    method: 'post',
    data: formData
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}
