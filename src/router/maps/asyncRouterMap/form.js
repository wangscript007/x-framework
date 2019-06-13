import Layout from '@/views/layout'

const formRouter = {
  path: '/form',
  name: 'Form',
  component: Layout,
  meta: {
    title: '表单',
    icon: 'container',
    alwaysShow: true,
    redirectInBreadcrumb: true
  },
  children: [
    /* 基础表单页 */
    {
      path: 'base',
      name: 'BaseForm',
      component: () => import('@/views/form/base'),
      meta: {
        title: '基础表单',
        describe: '基础表单页，一般用于简单的数据信息收集。',
        icon: 'fa fa-file-text-o',
        iconType: 'class'
      }
    },
    /* 分步表单页 */
    {
      path: 'step',
      name: 'StepForm',
      component: () => import('@/views/form/step'),
      meta: {
        title: '分步表单',
        describe: '分步表单页，一般用于复杂的信息分步录入以提高用户体验。',
        icon: 'fa fa-file-text-o',
        iconType: 'class'
      }
    },
    /* 表单验证 */
    {
      path: 'validate',
      name: 'ValidateForm',
      component: () => import('@/views/form/validate'),
      meta: {
        title: '表单验证',
        describe: '表单验证，是所有数据采集页面中的核心功能，用于检测用户输入的信息是否符合要求。',
        icon: 'fa fa-file-text-o',
        iconType: 'class'
      }
    }
  ]
}

export default formRouter
