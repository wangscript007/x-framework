const tokens = {
  admin: 'admin',
  user: 'user'
}

const users = {
  'admin': {
    userId: 'u01001001',
    userName: 'admin',
    password: '123456',
    realName: '超级管理员',
    avatar: 'http://183.6.175.42:2001/resources/images/temp/user1.jpg',
    introduction: '超级管理员'
  },
  'user': {
    userId: 'u01001005',
    userName: 'user01',
    password: '123456',
    realName: '王一新',
    avatar: 'http://183.6.175.42:2001/resources/images/temp/student03.jpg',
    introduction: '普通用户',
    role: ['user']
  }
}

const roles = {
  'admin': ['admin'],
  'user': ['user']
}

module.exports = [
  /* 登录 */
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body
      const res = {
        success: true,
        message: '',
        statusCode: 0,
        data: {}
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
      res.data.token = token
      return res
    }
  },
  /* 用户信息 */
  {
    url: '/user/info.*',
    type: 'get',
    response: config => {
      return {
        success: true,
        message: '',
        statusCode: 0,
        data: users['admin']
      }
    }
  },
  /* 用户权限 */
  {
    url: '/user/roles.*',
    type: 'get',
    response: config => {
      return {
        success: true,
        message: '',
        statusCode: 0,
        data: roles['admin']
      }
    }
  },
  /* 登出 */
  {
    url: '/user/logout',
    type: 'post',
    response: () => {
      return {
        success: true,
        message: ''
      }
    }
  }
]
