import * as userApi from '@/api/user'
import * as cache from '@/common/cache/user'
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
    login ({ commit, state }, formData) {
      return userApi.login(formData, data => {
        commit(userTypes.SET_TOKEN, data.data)
        cache.setToken(data.data, state.remember)
      })
    },
    getUserInfo ({ commit, state }) {
      return userApi.getUserInfo(state.token, data => {
        commit(userTypes.SET_USER, data.data)
      })
    },
    logout ({ commit, state }) {
      return userApi.logout(() => {
        commit(userTypes.SET_TOKEN, '')
        commit(userTypes.SET_USER, null)
        cache.removeToken(state.remember)
      })
    },
    resetUser ({ commit, state }) {
      return new Promise(resolve => {
        commit(userTypes.SET_TOKEN, '')
        commit(userTypes.SET_USER, null)
        cache.removeToken(state.remember)
        resolve()
      })
    }
  },
  getters: {
    token: state => state.token,
    user: state => state.user
  }
}

export default user
