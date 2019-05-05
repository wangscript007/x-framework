import request from '@/common/utils/request'

export function staffList (query) {
  return request({
    url: '/staff/list',
    method: 'get',
    params: query
  })
}
