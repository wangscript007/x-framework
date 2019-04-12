import storage from 'good-storage'

const TOKEN_KEY = 'TOKEN'

export function getToken() {
  return storage.session.get(TOKEN_KEY)
}

export function setToken(token) {
  return storage.session.set(TOKEN_KEY, token)
}

export function removeToken() {
  return storage.session.remove(TOKEN_KEY)
}
