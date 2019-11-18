// eslint-disable-next-line
import { BasicLayout, BlankLayout, RouteView } from '@/layout'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'Index',
    redirect: '/dashboard/workspace',
    component: BasicLayout,
    meta: { title: '首页' },
    children: [
      /* dashboard */
      {
        path: '/dashboard',
        name: 'Dashboard',
        redirect: '/dashboard/workspace',
        component: RouteView,
        meta: {
          title: '仪表盘',
          icon: 'dashboard',
          keepAlive: true,
          alwaysShow: true
        },
        children: [
          /* 工作台 */
          {
            path: '/dashboard/workspace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workspace'),
            meta: {
              title: '工作台',
              keepAlive: true
            }
          },
          /* 外部链接 */
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: {
              title: '监控页（外部）',
              target: '_blank'
            }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

export const constantRouterMap = [
  /* 登录页 */
  {
    path: '/login',
    name: 'Login',
    meta: { hidden: true },
    component: () => import('@/views/login')
  },
  /* 404 */
  {
    path: '/404',
    name: '404',
    meta: { hidden: true },
    component: () => import('@/views/exception/404')
  },
  /* 401 */
  {
    path: '/401',
    name: '401',
    meta: { hidden: true },
    component: () => import('@/views/exception/401')
  }
]
