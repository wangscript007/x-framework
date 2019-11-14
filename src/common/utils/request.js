import axios from 'axios'
import { ACCESS_TOKEN } from '@/cache/cache-types'
import { getToken } from '@/cache'
import { Message } from 'element-ui'

/* 创建axios对象 */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

/* 错误处理 */
const err = (error) => {
  if (error.response) {
    const { data } = error.response
    if (error.response.status === 401) {
      Message({
        showClose: true,
        type: 'error',
        message: 'Unauthorized: Authorization verification failed'
      })
    }
    if (error.response.status === 403) {
      Message({
        showClose: true,
        type: 'error',
        message: `Forbidden: ${data.message}`
      })
    }
  }
  return Promise.reject(error)
}

/* request拦截器 */
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers[ACCESS_TOKEN] = token
    }
    return config
  },
  err
)

/* response拦截器 */
/*
* {
*	  message: "",
*	  success: true,
*	  statusCode: -1,  成功是0，失败是-1
*	  data: {} 或 []
* }
* */
service.interceptors.response.use(
  response => response.data,
  err
)

export default service

