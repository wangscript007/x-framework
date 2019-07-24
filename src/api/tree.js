import { commonRequest } from './common'

export function getDeptTree () {
  return commonRequest({
    options: {
      url: '/tree/deptTree',
      method: 'get'
    },
    message: '部门数据获取失败，请重试'
  })
}
