import Layout from '@/views/layout'

const systemRouterMap = [{
  path: '',
  name: 'base',
  redirect: '/index'
}, {
  path: '/index',
  name: 'index',
  component: () =>
    import ('@/views/index'),
  meta: {
    hidden: true
  }
}, {
  path: '/redirect',
  component: Layout,
  meta: {
    hidden: true
  },
  children: [{
    path: '/redirect/:path*',
    component: () =>
      import ('@/views/redirect')
  }]
}, {
  path: '/login',
  meta: {
    hidden: true
  },
  component: () =>
    import ('@/views/login')
}, {
  path: '/404',
  meta: {
    hidden: true
  },
  component: () =>
    import ('@/views/error/404')
}, {
  path: '/401',
  meta: {
    hidden: true
  },
  component: () =>
    import ('@/views/error/401')
}]

export default systemRouterMap
