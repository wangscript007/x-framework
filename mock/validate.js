module.exports = [
  {
    url: '/validate/username',
    type: 'get',
    response: config => {
      const { username } = config.query
      /* 30%的概率返回true */
      const random = Math.ceil(Math.random() * 100) < 30
      return {
        success: random,
        message: random ? '' : `用户名${username}已被注册`,
        data: null
      }
    }
  }
]
