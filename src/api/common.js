import to from 'await-to-js'
import CommonException from '@/common/model/exception'

const DEFAULT_ERROR_MESSAGE = 'Request fail'

export async function commonRequest (request, errorMessage = DEFAULT_ERROR_MESSAGE, successCallback) {
  const [err, res] = await to(request)
  if (err) {
    return Promise.reject(err)
  }
  const { data } = res
  if (!data || !data.success) {
    return Promise.reject(new CommonException({
      message: data && data.message ? data.message : errorMessage
    }))
  }
  if (successCallback && typeof (successCallback) === 'function') {
    (successCallback)(data)
  }
  return Promise.resolve(data)
}
