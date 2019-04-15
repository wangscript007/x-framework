import storage from 'good-storage'

const TOKEN_KEY = 'X_FRAMEWORK_TOKEN'

export function getToken() {
  let res = {
    token: '',
    isLocal: false
  }
  let token = storage.session.get(TOKEN_KEY, '')
  if (!token) {
    token = storage.get(TOKEN_KEY, '')
    if (token) {
      res.isLocal = true
    }
  }
  res.token = token
  return res
}

export function setToken(token, isLocal = false) {
  return isLocal ?
    storage.set(TOKEN_KEY, token) :
    storage.session.set(TOKEN_KEY, token)
}

export function removeToken(isLocal = false) {
  return isLocal ? storage.remove(TOKEN_KEY) : storage.session.remove(TOKEN_KEY)
}
