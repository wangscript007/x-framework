import { commonRequest } from './common'

export function validUsername (username) {
  return commonRequest({
    options: {
      url: '/validate/username',
      method: 'get',
      params: {
        username
      }
    },
    message: '用户名已被注册'
  })
}
