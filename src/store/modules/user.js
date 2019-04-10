import * as loginApi from '@/api/login'
import { userTypes } from '@/store/mutation-types'
import * as cache from '@/common/cache/user'
import CommonException from '@/common/model/exception'

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
    login: async({ commit }, formData) => {
      const res = await loginApi.login(formData)
      if (!res.data) {
        throw new CommonException({ message: '验证失败，请重新登录', code: 1 })
      }
      commit(userTypes.SET_TOKEN, res.data)
      cache.setToken(res.data)
    },
    getUserInfo: async({ commit, state }) => {
      const res = await loginApi.getUserInfo(state.token)
      if (!res.data) {
        throw new CommonException({ message: '用户不存在', code: 1 })
      }
      commit(userTypes.SET_USER, res.data)
      return res
    },
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginApi.logout(state.user.token).then(() => {
          commit(userTypes.SET_TOKEN, '')
          commit(userTypes.SET_USER, null)
          cache.removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    /* 前端登出 */
    fedLogout({ commit }) {
      return new Promise(resolve => {
        commit(userTypes.SET_TOKEN, '')
        commit(userTypes.SET_USER, null)
        cache.removeToken()
        resolve()
      })
    }
  },
  getters: {
    token: state => state.token,
    user: state => state.user,
  }
}

export default user