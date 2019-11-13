import Vue from 'vue'
import { ACCESS_USER } from '@/cache/cache-types'

const TOKEN_EFFECTIVE_DATES = 7 * 24 * 60 * 60 * 1000

export function getUser () {
  Vue.ls.get(ACCESS_USER, null)
}

export function setUser (user) {
  Vue.ls.set(ACCESS_USER, user, TOKEN_EFFECTIVE_DATES)
}

export function removeUser () {
  Vue.ls.remove(ACCESS_USER)
}
