import Vue from 'vue'
import { ACCESS_TOKEN, ACCESS_USER } from '@/cache/cache-types'

const TOKEN_EFFECTIVE_DATES = 7 * 24 * 60 * 60 * 1000

export function getToken () {
  return Vue.ls.get(ACCESS_TOKEN, '')
}

export function setToken (token) {
  Vue.ls.set(ACCESS_TOKEN, token, TOKEN_EFFECTIVE_DATES)
}

export function removeToken () {
  Vue.ls.remove(ACCESS_TOKEN)
}

export function getUser () {
  return Vue.ls.get(ACCESS_USER, null)
}

export function setUser (user) {
  Vue.ls.set(ACCESS_USER, user, TOKEN_EFFECTIVE_DATES)
}

export function removeUser () {
  Vue.ls.remove(ACCESS_USER)
}
