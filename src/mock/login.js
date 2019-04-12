import {
  param2Obj
} from '@/common/utils'

const userList = [{
  userId: 'u01001001',
  userName: 'admin',
  realName: '超级管理员',
  avatar: 'http://183.6.175.42:2001/resources/images/temp/user1.jpg',
  introduction: '超级管理员',
  roles: ['admin'],
  token: 'admin'
}, {
  userId: 'u01001003',
  userName: 'editor',
  realName: '总编',
  avatar: 'http://183.6.175.42:2001/resources/images/temp/teacher01.jpg',
  introduction: '网站编辑',
  roles: ['editor'],
  token: 'editor'
}, {
  userId: 'u01001005',
  userName: 'user',
  realName: '王一新',
  avatar: 'http://183.6.175.42:2001/resources/images/temp/student03.jpg',
  introduction: '普通用户',
  roles: ['user'],
  token: 'user'
}]

export default {
  login: config => {
    const {
      username
    } = JSON.parse(config.body)
    const matchedUser = userList.find(item => {
      return item.userName === username
    })
    return matchedUser ? matchedUser.token : null
  },
  getUserInfo: config => {
    const {
      token
    } = param2Obj(config.url)
    return userList.find(item => {
      return item.token === token
    })
  },
  logout: () => 'success'
}
