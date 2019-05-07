import Layout from '@/views/layout'

const tableRouter = {
  path: '/table',
  name: 'Table',
  component: Layout,
  redirect: '/table/base',
  meta: {
    title: '表格',
    icon: 'table',
    alwaysShow: true,
    redirectInBreadcrumb: false
  },
  children: [
    /* 基本数据表格 */
    {
      path: 'base',
      name: 'BaseTable',
      component: () => import('@/views/table/base'),
      meta: {
        title: '基本数据表格',
        describe: '基本数据表格，是后台管理系统中的核心功能之一，包括了常用的增、删、改、查等操作',
        icon: 'fa fa-table',
        iconType: 'class'
      }
    },
    /* 新增 */
    {
      path: 'add',
      name: 'AddStaff',
      component: () => import('@/views/table/update'),
      meta: {
        title: '新增员工',
        describe: '',
        hidden: true
      }
    }
  ]
}

export default tableRouter
