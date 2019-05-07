import request from '@/common/utils/request'
import CommonException from '@/common/model/exception'

export async function staffList (query) {
  const { data } = await request({
    url: '/staff/list',
    method: 'get',
    params: query
  })
  if (!data || !data.success) {
    throw new CommonException({
      message: data && data.message ? data.message : '员工数据获取失败，请重试'
    })
  }
  return data
}

export async function deleteStaff (staffId) {
  const { data } = await request({
    url: '/staff/delete',
    method: 'post',
    data: {
      staffId
    }
  })
  if (!data || !data.success) {
    throw new CommonException({
      message: data && data.message ? data.message : '操作失败，请重试'
    })
  }
  return data
}
