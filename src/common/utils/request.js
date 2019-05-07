import axios from 'axios'
import store from '@/store'
import {
  Message
} from 'element-ui'
import {
  getToken
} from '@/common/cache/user'

const SERVER_TOKEN_KEY = 'X-FRAMEWORK-TOKEN'

/* 创建axios对象 */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

/* request拦截器 */
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers[SERVER_TOKEN_KEY] = getToken().token
    }
    return config
  },
  error => {
    Message({
      showClose: true,
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

/* response拦截器 */
service.interceptors.response.use(
  response => response,
  error => {
    Message({
      showClose: true,
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service

