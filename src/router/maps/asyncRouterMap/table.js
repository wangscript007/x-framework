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
    /* 基础数据表格 */
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
            headerTitle: '基础数据表格-员工管理',
            describe: '基础数据表格，是后台管理系统中的核心功能之一，包括了常用的增、删、改、查等操作',
            icon: 'fa fa-user',
            iconType: 'class'
          }
        },
        /* 新增 */
        {
          path: 'add',
          name: 'BaseTableAdd',
          component: () => import('@/views/table/base/update'),
          meta: {
            title: '新增员工',
            headerTitle: '基础数据表格-新增员工',
            describe: '包含了常用的form表单组件的使用及表单验证功能，框架约定新增和编辑使用同一个vue组件'
          }
        },
        /* 编辑 */
        {
          path: 'edit/:staffId',
          name: 'BaseTableEdit',
          component: () => import('@/views/table/base/update'),
          meta: {
            title: '编辑员工',
            headerTitle: '基础数据表格-编辑员工',
            describe: '包含了常用的form表单组件的使用及表单验证功能，框架约定新增和编辑使用同一个vue组件',
            hidden: true,
            activePath: '/table/base/list'
          }
        },
        /* 详情 */
        {
          path: 'detail/:staffId',
          name: 'BaseTableDetail',
          component: () => import('@/views/table/base/detail'),
          meta: {
            title: '员工信息',
            headerTitle: '基础数据表格-员工信息',
            describe: '常用的详情页面',
            hidden: true,
            activePath: '/table/base/list'
          }
        }
      ]
    },
    /* 选择数据表格 */
    {
      path: 'selected',
      name: 'SelectedTable',
      component: () => import('@/views/table/selected/list'),
      meta: {
        title: '选择数据表格',
        headerTitle: '选择数据表格-员工管理',
        describe: '选择数据表格，一般用于有“批量操作”需求的列表类功能中，它可以为用户提供更快捷的操作',
        icon: 'fa fa-user',
        iconType: 'class'
      }
    }
  ]
}

export default tableRouter
