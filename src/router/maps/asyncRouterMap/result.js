import Layout from '@/components/Layout'

const resultRouter = {
  path: '/result',
  name: 'Result',
  component: Layout,
  meta: {
    title: '结果',
    icon: 'check-circle',
    alwaysShow: true,
    redirectInBreadcrumb: true
  },
  children: [
    /* 成功页 */
    {
      path: 'success',
      name: 'ResultSuccess',
      component: () => import('@/views/result/success'),
      meta: {
        title: '成功页',
        describe: '一般用于有需要展示操作成功后的部分处理流程或者结果的页面。',
        icon: 'check-circle'
      }
    },
    /* 失败页 */
    {
      path: 'fail',
      name: 'ResultFail',
      component: () => import('@/views/result/fail'),
      meta: {
        title: '失败页',
        describe: '一般用于有需要展示操作失败后显示部分原因的页面。',
        icon: 'close-circle'
      }
    }
  ]
}

export default resultRouter
