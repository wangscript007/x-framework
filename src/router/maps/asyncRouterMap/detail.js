import Layout from '@/components/Layout'

const detailRouter = {
  path: '/detail',
  name: 'Detail',
  component: Layout,
  meta: {
    title: '详情',
    icon: 'fa fa-file-text-o',
    iconType: 'class',
    alwaysShow: true,
    redirectInBreadcrumb: true
  },
  children: [
    /* 基础详情页 */
    {
      path: 'base',
      name: 'BaseDetail',
      component: () => import('@/views/detail/base'),
      meta: {
        title: '基础详情页',
        describe: '基础详情页，一般用于展示简单的数据信息。',
        icon: 'fa fa-file-text-o',
        iconType: 'class'
      }
    },
    /* 高级详情页 */
    {
      path: 'senior',
      name: 'SeniorDetail',
      component: () => import('@/views/detail/senior'),
      meta: {
        title: '高级详情页',
        describe: '高级详情页，一般用于展示复杂的数据详细信息（包含流程、嵌套详情或者表格等）。',
        icon: 'fa fa-file-text-o',
        iconType: 'class'
      }
    }
  ]
}

export default detailRouter
