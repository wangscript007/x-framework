import Layout from '@/views/layout'

const tableRouter = {
  path: '/table',
  name: 'Table',
  component: Layout,
  redirect: '/table/complex',
  meta: {
    title: '表格',
    icon: 'table',
    alwaysShow: true,
    redirectInBreadcrumb: false
  },
  children: [{
    path: 'complex',
    name: 'ComplexTable',
    component: () => import('@/views/table/complex'),
    meta: {
      title: '综合表格-员工管理',
      describe: '综合数据表格，是后台管理核心功能之一，包括了常用的增删查改操作。',
      icon: 'fa fa-table',
      iconType: 'class'
    }
  }]
}

export default tableRouter
