const deptTree = [{
  deptId: 'X01',
  deptName: '机构X-FRAMEWORK',
  addable: true,
  editable: false,
  removable: false,
  draggable: false,
  children: [
    {
      deptId: 'X0101',
      deptName: '总经办',
      draggable: false
    },
    {
      deptId: 'X0102',
      deptName: '财务部',
      children: [
        {
          deptId: 'X010201',
          deptName: '会计'
        },
        {
          deptId: 'X010202',
          deptName: '出纳'
        }
      ]
    },
    {
      deptId: 'X0103',
      deptName: '行政部',
      children: [
        {
          deptId: 'X010301',
          deptName: '人力资源'
        },
        {
          deptId: 'X010302',
          deptName: '综合管理'
        }
      ]
    },
    {
      deptId: 'X0104',
      deptName: '市场部',
      children: [
        {
          deptId: 'X010401',
          deptName: '市场营销'
        },
        {
          deptId: 'X010402',
          deptName: '市场调研'
        },
        {
          deptId: 'X010403',
          deptName: '投标组'
        }
      ]
    },
    {
      deptId: 'X0105',
      deptName: '资质管理部'
    },
    {
      deptId: 'X0106',
      deptName: '软件技术部',
      children: [
        {
          deptId: 'X010601',
          deptName: '设计组'
        },
        {
          deptId: 'X010602',
          deptName: '产品组'
        },
        {
          deptId: 'X010603',
          deptName: '数据中心'
        },
        {
          deptId: 'X010604',
          deptName: '研发组'
        },
        {
          deptId: 'X010605',
          deptName: '测试组'
        }
      ]
    }
  ]
}]

module.exports = [
  {
    url: '/tree/deptTree',
    type: 'get',
    response: () => {
      return {
        success: true,
        message: 'success',
        data: deptTree
      }
    }
  }
]
