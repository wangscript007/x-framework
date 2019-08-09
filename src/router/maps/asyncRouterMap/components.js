import Layout from '@/components/Layout'

const componentsRouter = {
  path: '/components',
  name: 'Components',
  component: Layout,
  meta: {
    title: '组件',
    icon: 'copyright',
    alwaysShow: true,
    redirectInBreadcrumb: true
  },
  children: [
    /* 树型组件 */
    {
      path: 'tree',
      name: 'Tree',
      component: () => import('@/views/components/tree/index'),
      meta: {
        title: '树型组件',
        icon: 'apartment',
        alwaysShow: true,
        showInBreadcrumb: true,
        redirectInBreadcrumb: true
      },
      children: [
        /* 可编辑树 */
        {
          path: 'editTree',
          name: 'EditTree',
          component: () => import('@/views/components/tree/editTree'),
          meta: {
            title: '可编辑树',
            headerTitle: '树型组件-可编辑树',
            describe: '可编辑树，通常包含了“增”、“删”、“改”、“拖拽”等功能，一般应用于树形结构数据的管理和应用，例如“机构管理”，“权限管理”等。',
            icon: 'apartment'
          }
        },
        /* 可选择树（多选）*/
        {
          path: 'checkboxTree',
          name: 'CheckboxTree',
          component: () => import('@/views/components/tree/checkboxTree'),
          meta: {
            title: '可选择树（多选）',
            headerTitle: '树型组件-可选择树（多选）',
            describe: '可选择树（多选）',
            icon: 'apartment'
          }
        },
        /* 可选择树（单选）*/
        {
          path: 'radioTree',
          name: 'RadioTree',
          component: () => import('@/views/components/tree/radioTree'),
          meta: {
            title: '可选择树（单选）',
            headerTitle: '树型组件-可选择树（单选）',
            describe: '可选择树（单选）',
            icon: 'apartment'
          }
        },
        /* 懒加载树 */
        {
          path: 'lazyTree',
          name: 'LazyTree',
          component: () => import('@/views/components/tree/lazyTree'),
          meta: {
            title: '懒加载树',
            headerTitle: '树型组件-懒加载树',
            describe: '懒加载树',
            icon: 'apartment'
          }
        }
      ]
    },
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
    /* 手写板 */
    {
      path: 'signature',
      name: 'Signature',
      component: () => import('@/views/components/signature'),
      meta: {
        title: '手写板',
        describe: '手写板，常用于一些在线签名操作。',
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
