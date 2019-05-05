const Mock = require('mockjs')

const List = []
const count = 150

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    staffId: '@guid',
    staffName: '@cname',
    staffNo: '2019' + '@increment(1)', /* 员工号 */
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
      const { staffName, cerNo, sex, state, pageNo = 1, pageSize = 10 } = config.query
      const res = {
        success: true,
        message: 'success',
        total: 0,
        pageNo: pageNo,
        pageSize: pageSize,
        data: []
      }

      const mockList = List.filter(item => {
        if (staffName && !item.staffName.includes(staffName)) return false
        if (cerNo && !item.cerNo.includes(cerNo)) return false
        if (sex && item.sex !== sex) return false
        if (state && item.state !== state) return false
        return true
      })

      res.data = mockList.filter((item, index) => {
        return pageSize * (pageNo - 1) <= index && index < pageSize * pageNo
      })
      res.total = mockList.length

      return res
    }
  }
]
