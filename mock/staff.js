const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    staffId: '@guid',
    staffName: '@cname',
    staffNo: '2019000' + '@increment(1)', /* 员工号 */
    cerNo: '@id', /* 身份证 */
    'sex|1': ['1', '2'], /* 1：男，2：女 */
    native: '@county(true)', /* 籍贯 */
    entryTime: '@date', /* 入职时间 */
    address: '广州市天河区', /* 联系地址 */
    'state|1': ['1', '2'], /* 1：在职，2：离职 */
    remark: '@cparagraph' /* 备注 */
  }))
}

module.exports = [
  {
    url: '/staff/list',
    type: 'get',
    response: config => {
      const { key, sex, state, page = 1, limit = 10 } = config.query
      const res = {
        success: true,
        message: 'success',
        total: 0,
        page,
        limit,
        data: []
      }

      const mockList = List.filter(item => {
        if (key && !item.staffName.includes(key) && !item.staffNo.includes(key) && !item.cerNo.includes(key)) return false
        if (sex && item.sex !== sex) return false
        if (state && item.state !== state) return false
        return true
      })

      res.data = mockList.filter((item, index) => {
        return limit * (page - 1) <= index && index < limit * page
      })
      res.total = mockList.length

      return res
    }
  },
  {
    url: '/staff/delete',
    type: 'post',
    response: config => {
      const { staffId } = config.body
      const res = {
        success: true,
        message: 'success',
        data: null
      }

      const matchedIndex = List.findIndex(item => {
        return staffId === item.staffId
      })

      if (matchedIndex > -1) {
        List.splice(matchedIndex, 1)
      } else {
        res.success = false
        res.message = '员工不存在，无法删除'
      }

      return res
    }
  }
]
