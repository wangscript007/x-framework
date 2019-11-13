import awaitTo from 'await-to-js'
import request from '@/common/utils/request'
import CommonException from '@/common/model/exception'

const DEFAULT_ERROR_MESSAGE = 'Request fail'

/*
* options: request的参数
* message：当获取不到data或者data.success = false的时候的提示
* callback：成功后的回调
* */
export async function commonRequest ({ options, message } = { options: {}, message: DEFAULT_ERROR_MESSAGE }) {
  const [err, data] = await awaitTo(request(options))
  if (err) {
    return Promise.reject(err)
  }
  if (!data || !data.success) {
    return Promise.reject(new CommonException({
      message: data && data.message ? data.message : message
    }))
  }
  return Promise.resolve(data)
}
