import * as loginApi from '@/api/login'
import * as cache from '@/common/cache/user'
import CommonException from '@/common/model/exception'
import {
  userTypes
} from '@/store/mutation-types'

const user = {
  state: {
    token: cache.getToken(),
    user: null
  },
  mutations: {
    [userTypes.SET_TOKEN]: (state, token) => {
      state.token = token
    },
    [userTypes.SET_USER]: (state, user) => {
      state.user = user
    }
  },
  actions: {
    login: async({
      commit
    }, formData) => {
      const res = await loginApi.login(formData)
      if (!res.data) {
        throw new CommonException({
          message: '验证失败，请重新登录'
        })
      }
      commit(userTypes.SET_TOKEN, res.data)
      cache.setToken(res.data)
    },
    getUserInfo: async({
      commit,
      state
    }) => {
      const res = await loginApi.getUserInfo(state.token)
      if (!res.data) {
        throw new CommonException({
          message: '用户不存在'
        })
      }
      commit(userTypes.SET_USER, res.data)
      return res
    },
    logout: async({
      commit,
      state
    }) => {
      await loginApi.logout(state.user.token)
      commit(userTypes.SET_TOKEN, '')
      commit(userTypes.SET_USER, null)
      cache.removeToken()
    },
    fedLogout: async({
      commit
    }) => {
      commit(userTypes.SET_TOKEN, '')
      commit(userTypes.SET_USER, null)
      cache.removeToken()
    }
  },
  getters: {
    token: state => state.token,
    user: state => state.user,
  }
}

export default user
