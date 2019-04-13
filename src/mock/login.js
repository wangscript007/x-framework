import lodash from 'lodash'
import {
  param2Obj
} from '@/common/utils'

const userList = [{
  userId: 'u01001001',
  userName: 'admin',
  password: '123456',
  realName: '超级管理员',
  avatar: 'http://183.6.175.42:2001/resources/images/temp/user1.jpg',
  introduction: '超级管理员',
  roles: ['admin'],
  token: 'admin'
}, {
  userId: 'u01001003',
  userName: 'editor',
  password: '123456',
  realName: '总编',
  avatar: 'http://183.6.175.42:2001/resources/images/temp/teacher01.jpg',
  introduction: '网站编辑',
  roles: ['editor'],
  token: 'editor'
}, {
  userId: 'u01001005',
  userName: 'user',
  password: '123456',
  realName: '王一新',
  avatar: 'http://183.6.175.42:2001/resources/images/temp/student03.jpg',
  introduction: '普通用户',
  roles: ['user'],
  token: 'user'
}]

export default {
  login: config => {
    const {
      username,
      password
    } = JSON.parse(config.body)

    let res = {
      success: true,
      message: 'success',
      data: ''
    }

    const matchedUser = userList.find(item => {
      return item.userName === username
    })

    if (!matchedUser) {
      res.success = false
      res.message = '用户不存在'
      return res
    }

    if (matchedUser.password !== password) {
      res.success = false
      res.message = '密码错误'
      return res
    }

    res.data = matchedUser.token

    return res
  },
  getUserInfo: config => {
    const {
      token
    } = param2Obj(config.url)

    let res = {
      success: true,
      message: 'success',
      data: null
    }

    const matchedUser = userList.find(item => {
      return item.token === token
    })

    if (!matchedUser) {
      res.success = false
      res.message = '用户不存在'
      return res
    }

    let userData = lodash.cloneDeep(matchedUser)
    delete userData.password
    res.data = userData

    return res
  },
  logout: () => 'success'
}
