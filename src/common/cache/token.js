import Vue from 'vue'
import { ACCESS_TOKEN } from '@/cache/cache-types'

const TOKEN_EFFECTIVE_DATES = 7 * 24 * 60 * 60 * 1000

export function getToken () {
  Vue.ls.get(ACCESS_TOKEN, '')
}

export function setToken (token) {
  Vue.ls.set(ACCESS_TOKEN, token, TOKEN_EFFECTIVE_DATES)
}

export function removeToken () {
  Vue.ls.remove(ACCESS_TOKEN)
}
