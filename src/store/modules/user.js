import { login, logout, getUserInfo } from '@/api/login'
import { userTypes } from '@/store/mutation-types'
import { getToken, setToken, removeToken } from '@/common/utils/auth'

const user = {
  state: {
    user: {
      name: '',
      avatar: '',
      status: '',
      token: getToken(),
      introduction: '',
      roles: []
    }
  },
  mutations: {
    [userTypes.SET_NAME]: (state, name) => {
      state.user.name = name
    },
    [userTypes.SET_AVATAR]: (state, avatar) => {
      state.user.avatar = avatar
    },
    [userTypes.SET_STATUS]: (state, status) => {
      state.user.status = status
    },
    [userTypes.SET_TOKEN]: (state, token) => {
      state.user.token = token
    },
    [userTypes.SET_INTRODUCTION]: (state, introduction) => {
      state.user.introduction = introduction
    },
    [userTypes.SET_ROLES]: (state, roles) => {
      state.user.roles = roles
    }
  },
  actions: {
    login({ commit }, user) {
      const username = user.username.trim()
      return new Promise((resolve, reject) => {
        login(username, user.password).then(response => {
          const data = response.data
          console.log(data)
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.user.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.user.token).then(response => {
          if (!response.data) {
            reject(new Error('验证失败，请重新登录'))
          }
          /* 验证权限 */
          const data = response.data
          if (data.roles && data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
          } else {
            reject(new Error('该用户没有任何权限！'))
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    /* 前端登出 */
    fedLogout({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    /* 动态修改权限 */
    changeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  },
  getters: {
    user: state => state.user
  }
}

export default user