import request from '@/common/utils/request'

export function login (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getUserInfo (token) {
  return request({
    url: '/userinfo',
    method: 'get',
    params: { token }
  })
}
