import request from '@/common/utils/request'
import { commonRequest } from './common'

export function staffList (query) {
  return commonRequest(request({
    url: '/staff/list',
    method: 'get',
    params: query
  }), '员工数据获取失败，请重试')
}

export function getStaff (staffId) {
  return commonRequest(request({
    url: '/staff/info',
    method: 'get',
    params: {
      staffId
    }
  }), `员工Id为‘${staffId}’的员工不存在`)
}

export function deleteStaff (staffId) {
  return commonRequest(request({
    url: '/staff/delete',
    method: 'post',
    data: {
      staffId
    }
  }), '操作失败，请重试')
}

export function batchDeleteStaff (ids) {
  return commonRequest(request({
    url: '/staff/batchDelete',
    method: 'post',
    data: {
      ids
    }
  }), '操作失败，请重试')
}

export function updateStaff (form) {
  return commonRequest(request({
    url: '/staff/update',
    method: 'post',
    data: form
  }), '操作失败，请重试')
}
