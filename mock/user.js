const lodash = require('lodash')

const tokens = {
  admin: 'admin-token',
  editor: 'editor-token',
  user01: 'user01-token'
}

const users = {
  'admin-token': {
    userId: 'u01001001',
    userName: 'admin',
    password: '123456',
    realName: '超级管理员',
    avatar: 'http://183.6.175.42:2001/resources/images/temp/user1.jpg',
    introduction: '超级管理员',
    roles: ['admin']
  },
  'editor-token': {
    userId: 'u01001003',
    userName: 'editor',
    password: '123456',
    realName: '总编',
    avatar: 'http://183.6.175.42:2001/resources/images/temp/teacher01.jpg',
    introduction: '网站编辑',
    roles: ['editor']
  },
  'user01-token': {
    userId: 'u01001005',
    userName: 'user01',
    password: '123456',
    realName: '王一新',
    avatar: 'http://183.6.175.42:2001/resources/images/temp/student03.jpg',
    introduction: '普通用户',
    roles: ['user']
  }
}

module.exports = [
  /* 登录 */
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const {
        username,
        password
      } = config.body
      let res = {
        success: true,
        message: 'success',
        data: ''
      }
      const token = tokens[username]

      if (!token) {
        res.success = false
        res.message = '用户不存在'
        return res
      }

      if (users[token].password !== password) {
        res.success = false
        res.message = '密码错误'
        return res
      }

      res.data = token

      return res
    }
  },
  /* 用户信息 */
  {
    url: '/user/info.*',
    type: 'get',
    response: config => {
      const {
        token
      } = config.query
      let res = {
        success: true,
        message: 'success',
        data: null
      }
      const data = users[token]

      if (!data) {
        res.success = false
        res.message = '用户信息获取失败'
        return res
      }

      let user = lodash.cloneDeep(data)
      delete user.password
      res.data = user

      return res
    }
  },
  /* 登出 */
  {
    url: '/user/logout',
    type: 'post',
    response: () => {
      return {
        success: true,
        message: 'success'
      }
    }
  }
]
