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
      const { data } = await userApi.login(formData)
      if (!data || !data.success) {
        throw new CommonException({
          message: data && data.message ? data.message : '验证失败，请重试'
        })
      }
      commit(userTypes.SET_TOKEN, data.data)
      cache.setToken(data.data, state.remember)
    },
    getUserInfo: async ({ commit, state }) => {
      const { data } = await userApi.getUserInfo(state.token)
      if (!data || !data.success) {
        throw new CommonException({
          message: data && data.message ? data.message : '获取用户信息失败，请刷新重试'
        })
      }
      commit(userTypes.SET_USER, data.data)
      return data.data
    },
    logout: async ({ commit, state }) => {
      const { data } = await userApi.logout(state.user.token)
      if (!data || !data.success) {
        throw new CommonException({
          message: data && data.message ? data.message : '操作失败，请重试'
        })
      }
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
