import { commonRequest } from './common'

export function staffList (query) {
  return commonRequest({
    options: {
      url: '/staff/list',
      method: 'get',
      params: query
    },
    message: '员工数据获取失败，请重试'
  })
}

export function getStaff (staffId) {
  return commonRequest({
    options: {
      url: '/staff/info',
      method: 'get',
      params: {
        staffId
      }
    },
    message: `员工Id为‘${staffId}’的员工不存在`
  })
}

export function deleteStaff (staffId) {
  return commonRequest({
    options: {
      url: '/staff/delete',
      method: 'post',
      data: {
        staffId
      }
    },
    message: '操作失败，请重试'
  })
}

export function batchDeleteStaff (ids) {
  return commonRequest({
    options: {
      url: '/staff/batchDelete',
      method: 'post',
      data: {
        ids
      }
    },
    message: '操作失败，请重试'
  })
}

export function updateStaff (form) {
  return commonRequest({
    options: {
      url: '/staff/update',
      method: 'post',
      data: form
    },
    message: '操作失败，请重试'
  })
}
