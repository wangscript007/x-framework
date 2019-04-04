import storage from 'good-storage'

const TOKEN_KEY = 'X-FRAMEWORK-TOKEN'
const USERID_KEY = 'X-FRAMEWORK-USERID'

export function getToken() {
  return storage.session.get(TOKEN_KEY)
}

export function setToken(token) {
  return storage.session.set(TOKEN_KEY, token)
}

export function removeToken() {
  return storage.session.remove(TOKEN_KEY)
}

export function getUserId() {
  return storage.session.get(USERID_KEY)
}

export function setUserId(userId) {
  return storage.session.set(USERID_KEY, userId)
}

export function removeUserId() {
  return storage.session.remove(USERID_KEY)
}