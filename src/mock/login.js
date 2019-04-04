import { param2Obj } from '@/common/utils'

const userList = [{
  userId: 'u01001001',
  userName: 'admin',
  realName: 'Admin',
  avatar: '',
  introduction: '超级管理员',
  roles: ['admin']
}, {
  userId: 'u01001003',
  userName: 'editor',
  realName: '网站编辑',
  avatar: '',
  introduction: '网站编辑',
  roles: ['editor']
}, {
  userId: 'u01001005',
  userName: 'user01',
  realName: '王一新',
  avatar: '',
  introduction: '普通用户'
}]

export default {
  login: config => {
    const { username } = JSON.parse(config.body)
    const matchedUser = userList.find(item => {
      return item.userName === username
    })
    return matchedUser ? { token: matchedUser.userName, userId: matchedUser.userId } : null
  },
  getUserInfo: config => {
    const { userId } = param2Obj(config.url)
    return userList.find(item => {
      return item.userId === userId
    })
  },
  logout: () => 'success'
}