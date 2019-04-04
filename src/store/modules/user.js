import * as loginApi from '@/api/login'
import { userTypes } from '@/store/mutation-types'
import * as cache from '@/common/cache/user'

const user = {
  state: {
    token: cache.getToken(),
    userId: cache.getUserId(),
    user: null
  },
  mutations: {
    [userTypes.SET_TOKEN]: (state, token) => {
      state.token = token
    },
    [userTypes.SET_USERID]: (state, userId) => {
      state.userId = userId
    },
    [userTypes.SET_USER]: (state, user) => {
      state.user = user
    }
  },
  actions: {
    login({ commit }, formData) {
      return new Promise((resolve, reject) => {
        loginApi.login(formData).then(response => {
          const data = response.data
          if (!data) {
            reject(new Error({ message: '验证失败，请重新登录' }))
          }
          commit(userTypes.SET_USERID, data.userId)
          commit(userTypes.SET_TOKEN, data.token)
          cache.setToken(data.token)
          cache.setUserId(data.userId)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginApi.getUserInfo(state.token, state.userId).then(response => {
          const data = response.data
          if (!data) {
            reject(new Error({ message: '用户不存在' }))
          }
          commit(userTypes.SET_USER, data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginApi.logout(state.user.token).then(() => {
          commit(userTypes.SET_USERID, '')
          commit(userTypes.SET_TOKEN, '')
          commit(userTypes.SET_USER, null)
          cache.removeToken()
          cache.removeUserId()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    /* 前端登出 */
    fedLogout({ commit }) {
      return new Promise(resolve => {
        commit(userTypes.SET_USERID, '')
        commit(userTypes.SET_TOKEN, '')
        commit(userTypes.SET_USER, null)
        cache.removeToken()
        cache.removeUserId()
        resolve()
      })
    }
  },
  getters: {
    userId: state => state.userId,
    token: state => state.token,
    user: state => state.user,
  }
}

export default user