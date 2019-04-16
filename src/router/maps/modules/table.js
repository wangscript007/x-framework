import Layout from '@/views/layout'

const tableRouter = {
  path: '/table',
  name: 'Table',
  component: Layout,
  redirect: '/table/index',
  meta: {
    title: '表格',
    icon: 'table',
    alwaysShow: true,
    redirectInBreadcrumb: false
  },
  children: [{
    path: 'index',
    name: 'TableIndex',
    component: () =>
      import ('@/views/table/index'),
    meta: {
      title: '基础数据表格',
      describe: '基础数据表格，是后台管理核心功能之一，包括了常用的增删查改操作。',
      icon: 'fa fa-table',
      iconType: 'class'
    }
  }]
}

export default tableRouter
