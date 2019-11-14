import awaitTo from 'await-to-js'
import * as userApi from '@/api/user'
import { setToken, removeToken, setUser, removeUser } from '@/cache'
import { MUT_USER_TYPES } from '@/store/mutation-types'

const user = {
  state: {
    token: '',
    user: null,
    roles: null
  },
  mutations: {
    [MUT_USER_TYPES.SET_TOKEN]: (state, token) => {
      state.token = token
    },
    [MUT_USER_TYPES.SET_USER]: (state, user) => {
      state.user = user
    },
    [MUT_USER_TYPES.SET_ROLES]: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    async login ({ commit }, form) {
      const [err, res] = await awaitTo(userApi.login(form))
      if (err) {
        return Promise.reject(err)
      }
      const token = res.data.token
      setToken(token)
      commit(MUT_USER_TYPES.SET_TOKEN, token)
      return Promise.resolve()
    },
    async getUserInfo ({ commit }) {
      const [err, res] = await awaitTo(userApi.getUserInfo())
      if (err) {
        return Promise.reject(err)
      }
      const user = res.data
      setUser(user)
      commit(MUT_USER_TYPES.SET_USER, user)
      return Promise.resolve()
    },
    async getUserRole ({ commit }) {
      const [err, res] = await awaitTo(userApi.getUserRole())
      if (err) {
        return Promise.reject(err)
      }
      const roles = res.data || []
      commit(MUT_USER_TYPES.SET_ROLES, roles)
      return Promise.resolve()
    },
    async logout ({ commit }) {
      const [err] = await awaitTo(userApi.logout())
      if (err) {
        return Promise.reject(err)
      }
      removeToken()
      removeUser()
      commit(MUT_USER_TYPES.SET_TOKEN, '')
      commit(MUT_USER_TYPES.SET_USER, null)
      return Promise.resolve()
    },
    clearUserCache ({ commit }) {
      removeToken()
      removeUser()
      commit(MUT_USER_TYPES.SET_TOKEN, '')
      commit(MUT_USER_TYPES.SET_USER, null)
      return Promise.resolve()
    }
  },
  getters: {
    token: state => state.token,
    user: state => state.user,
    roles: state => state.roles
  }
}

export default user
