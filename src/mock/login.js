import { param2Obj } from '@/common/utils'

const userMap = {
  admin: {
    name: 'Admin',
    avatar: '',
    token: 'admin',
    introduction: '超级管理员',
    roles: ['admin']
  },
  editor: {
    name: 'Editor',
    avatar: '',
    token: 'editor',
    introduction: '网站编辑',
    roles: ['editor']
  },
  user: {
    name: 'User',
    avatar: '',
    token: 'user',
    introduction: '普通用户',
    roles: ['user']
  }
}

export default {
  login: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
