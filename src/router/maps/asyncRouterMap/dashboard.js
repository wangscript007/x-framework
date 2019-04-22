import Layout from '@/views/layout'

const dashboard = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Layout,
  redirect: '/dashboard',
  meta: {
    icon: 'dashboard'
  },
  children: [
    /* admin的首页 */
    {
      path: 'admin',
      name: 'Dashboard-Admin',
      component: () =>
        import ('@/views/dashboard/admin'),
      meta: {
        title: '首页',
        icon: 'dashboard',
        describe: '监控系统各项功能运作情况以及一些相关统计',
        roles: ['admin'],
        absolute: true
      }
    },
    /* editor的首页 */
    {
      path: 'editor',
      name: 'Dashboard-Editor',
      component: () =>
        import ('@/views/dashboard/editor'),
      meta: {
        title: '首页',
        icon: 'dashboard',
        describe: '监控系统各项功能运作情况以及一些相关统计',
        roles: ['editor'],
        absolute: true
      }
    },
    /* user的首页 */
    {
      path: 'user',
      name: 'Dashboard-User',
      component: () =>
        import ('@/views/dashboard/user'),
      meta: {
        title: '首页',
        icon: 'dashboard',
        describe: '监控系统各项功能运作情况以及一些相关统计',
        roles: ['user'],
        absolute: true
      }
    }
  ]
}

export default dashboard
