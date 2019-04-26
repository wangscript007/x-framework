import * as userApi from '@/api/user'
import * as cache from '@/common/cache/user'
import CommonException from '@/common/model/exception'
import { userTypes } from '@/store/mutation-types'

const user = {
  state: {
    token: cache.getToken().token,
    remember: false,
    user: null
  },
  mutations: {
    [userTypes.SET_TOKEN]: (state, token) => {
      state.token = token
    },
    [userTypes.SET_REMEMBER]: (state, remember) => {
      state.remember = remember
    },
    [userTypes.SET_USER]: (state, user) => {
      state.user = user
    }
  },
  actions: {
    login: async ({ commit, state }, formData) => {
      const res = await userApi.login(formData)
      if (!res.data || !res.data.success) {
        throw new CommonException({
          message: res.data && res.data.message
            ? res.data.message
            : '验证失败，请重新登录'
        })
      }
      commit(userTypes.SET_TOKEN, res.data.data)
      cache.setToken(res.data.data, state.remember)
    },
    getUserInfo: async ({ commit, state }) => {
      const res = await userApi.getUserInfo(state.token)
      if (!res.data || !res.data.success) {
        throw new CommonException({
          message: res.data && res.data.message ? res.data.message : '无法获取用户信息'
        })
      }
      commit(userTypes.SET_USER, res.data.data)
      return res.data
    },
    logout: async ({ commit, state }) => {
      await userApi.logout(state.user.token)
      commit(userTypes.SET_TOKEN, '')
      commit(userTypes.SET_USER, null)
      cache.removeToken(state.remember)
    },
    resetUser: async ({ commit, state }) => {
      commit(userTypes.SET_TOKEN, '')
      commit(userTypes.SET_USER, null)
      cache.removeToken(state.remember)
    }
  },
  getters: {
    token: state => state.token,
    user: state => state.user
  }
}

export default user
