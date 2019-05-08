import Layout from '@/views/layout'

const tableRouter = {
  path: '/table',
  name: 'Table',
  component: Layout,
  meta: {
    title: '表格',
    icon: 'table',
    alwaysShow: true,
    redirectInBreadcrumb: true
  },
  children: [
    /* 基本数据表格 */
    {
      path: 'base',
      name: 'BaseTable',
      component: () => import('@/views/table/base/index'),
      meta: {
        title: '基础数据表格',
        icon: 'fa fa-table',
        iconType: 'class',
        alwaysShow: true,
        redirectInBreadcrumb: true
      },
      children: [
        /* 列表 */
        {
          path: 'list',
          name: 'BaseTableList',
          component: () => import('@/views/table/base/list'),
          meta: {
            title: '员工管理',
            describe: '基本数据表格，是后台管理系统中的核心功能之一，包括了常用的增、删、改、查等操作',
            icon: 'fa fa-user',
            iconType: 'class'
          }
        },
        /* 新增 */
        {
          path: 'add',
          name: 'AddStaff',
          component: () => import('@/views/table/base/update'),
          meta: {
            title: '新增员工',
            describe: ''
          }
        }
      ]
    }
  ]
}

export default tableRouter
