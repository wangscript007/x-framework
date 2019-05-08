import Layout from '@/views/layout'

const permission = {
  path: '/permission',
  name: 'Permission',
  component: Layout,
  meta: {
    title: '权限',
    icon: 'lock',
    roles: ['admin', 'editor', 'user'],
    alwaysShow: true,
    redirectInBreadcrumb: false
  },
  children: [{
    path: 'admin',
    name: 'PageAdmin',
    component: () => import('@/views/permission/pageAdmin'),
    meta: {
      title: '权限控制页-Admin',
      describe: '权限控制页，该功能只有拥有‘admin’权限的用户能访问',
      roles: ['admin']
    }
  }, {
    path: 'editor',
    name: 'PageEditor',
    component: () => import('@/views/permission/pageEditor'),
    meta: {
      title: '权限控制页-Editor',
      describe: '权限控制页，该功能只有拥有‘admin’、‘editor’权限的用户能访问',
      roles: ['editor']
    }
  }, {
    path: 'user',
    name: 'PageUser',
    component: () => import('@/views/permission/pageUser'),
    meta: {
      title: '权限控制页-User',
      describe: '权限控制页，该功能只有拥有‘admin’、‘user’权限的用户能访问',
      roles: ['user']
    }
  }]
}

export default permission
