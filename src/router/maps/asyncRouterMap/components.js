import Layout from '@/views/layout'

const componentsRouter = {
  path: '/components',
  name: 'ComponentsDemo',
  component: Layout,
  meta: {
    title: '组件',
    icon: 'copyright',
    alwaysShow: true,
    redirectInBreadcrumb: false
  },
  children: [
    /* 编辑器 */
    {
      path: 'editor',
      name: 'Editor',
      component: () => import('@/views/components/editor'),
      meta: {
        title: '富文本编辑器',
        describe: '富文本编辑器，是后台管理系统的核心功能之一。常用于发布消息，编辑文章等功能。',
        icon: 'fa fa-upload',
        iconType: 'class'
      }
    },
    /* page模板 */
    {
      path: 'page',
      name: 'Page',
      component: () => import('@/views/components/page'),
      meta: {
        title: 'Page模板页',
        describe: 'page组件，是所有功能页的基础模板，page组件通常搭配element栅格和Card组件进行灵活布局。',
        icon: 'layout'
      }
    }
  ]
}

export default componentsRouter
