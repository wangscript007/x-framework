import Layout from '@/views/layout'

const componentsRouter = {
  path: '/components',
  name: 'ComponentsDemo',
  component: Layout,
  redirect: '/components/uploader',
  meta: {
    title: '组件',
    icon: 'copyright',
    alwaysShow: true,
    redirectInBreadcrumb: false
  },
  children: [{
    path: 'uploader',
    name: 'Uploader',
    component: () =>
      import('@/views/components-demo/uploader'),
    meta: {
      title: 'Uploader-上传组件',
      describe: '图片上传、文件上传等'
    }
  }]
}

export default componentsRouter
