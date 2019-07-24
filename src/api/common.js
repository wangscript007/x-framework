import awaitTo from 'await-to-js'
import request from '@/common/utils/request'
import CommonException from '@/common/model/exception'

const DEFAULT_ERROR_MESSAGE = 'Request fail'

/*
* options: request的参数
* message：当获取不到data或者data.success = false的时候的提示
* callback：成功后的回调
* */
export async function commonRequest ({ options, message, callback } = { options: {}, message: DEFAULT_ERROR_MESSAGE, callback: null }) {
  const [err, res] = await awaitTo(request(options))
  if (err) {
    return Promise.reject(err)
  }
  const { data } = res
  if (!data || !data.success) {
    return Promise.reject(new CommonException({
      message: data && data.message ? data.message : message
    }))
  }
  if (callback && typeof (callback) === 'function') {
    (callback)(data)
  }
  return Promise.resolve(data)
}
