import { commonRequest } from './common'
import request from '@/common/utils/request'

export function getDeptTree () {
  return commonRequest(request({
    url: '/tree/deptTree',
    method: 'get'
  }), '部门数据获取失败，请重试')
}
