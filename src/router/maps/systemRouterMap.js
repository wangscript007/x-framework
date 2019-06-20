import Layout from '@/components/Layout'

const systemRouterMap = [
  /* 根路由 */
  {
    path: '',
    name: 'BasePath',
    redirect: '/index',
    meta: {
      hidden: true
    }
  },
  /* 入口页 */
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/index'),
    meta: {
      hidden: true
    }
  },
  /* 登录页 */
  {
    path: '/login',
    name: 'Login',
    meta: {
      hidden: true
    },
    component: () => import('@/views/login')
  },
  /* 404 */
  {
    path: '/404',
    name: '404',
    meta: {
      hidden: true
    },
    component: () => import('@/views/error/404')
  },
  /* 401 */
  {
    path: '/401',
    name: '401',
    meta: {
      hidden: true
    },
    component: () => import('@/views/error/401')
  },
  /* 重定向 */
  {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    meta: {
      hidden: true
    },
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/components/Redirect')
    }]
  }
]

export default systemRouterMap
