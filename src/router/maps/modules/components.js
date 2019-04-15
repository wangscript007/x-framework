import Layout from '@/views/layout'

const componentsRouter = {
  path: '/components',
  name: 'ComponentsDemo',
  component: Layout,
  redirect: '/components/editor',
  meta: {
    title: '组件',
    icon: 'copyright',
    alwaysShow: true,
    redirectInBreadcrumb: false
  },
  children: [{
    path: 'editor',
    name: 'Editor',
    component: () =>
      import ('@/views/components-demo/editor'),
    meta: {
      title: '富文本编辑器',
      describe: '富文本编辑器，是后台管理系统的核心功能之一。',
      icon: 'fa fa-upload',
      iconType: 'class'
    }
  }, {
    path: 'uploader',
    name: 'Uploader',
    component: () =>
      import ('@/views/components-demo/uploader'),
    meta: {
      title: 'Uploader-上传组件',
      describe: '图片上传、文件上传等',
      icon: 'fa fa-upload',
      iconType: 'class'
    }
  }]
}

export default componentsRouter
