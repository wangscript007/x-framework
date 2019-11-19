// eslint-disable-next-line
import { BasicLayout, BlankLayout, RouteView } from '@/layout'

/**
 * 路由表开发约定：
 * 1、所有业务功能路由统一定义在/的children中，且必须设置meta属性
 * 2、若是嵌套路由，则父路由的component应该设置为RouteView或者BlankLayout
 **/
/**
 * 路由表相关参数
 * path: '/xxx',
 * name:'RouterName',             必须设置route的name值，用于页面跳转传参，且必须保证唯一性，命名方式统一使用pascal命名法，如："BaseTable"
 * redirect: null,                路由重定向，可以不必设置，在生成路由表系统会根据权限自动添加
 * meta : {                       由于vue-router自定义属性迁移到meta中，所以每一个路由至少定义meta: {}
    title: '',                   路由标题，用于显示在sidebar、breadcrumb
    icon: '',                    当前路由在sidebar中显示的图标，值：iconfont中的svg-name
    iconType: ''                 图标的类型['svg', 'class', 'image']
    hidden: false,               是否在sidebar中隐藏当前路由
    activePath: '',              强制sidebar高亮指定的路由，当当前路由处于hidden:true时，sidebar并不会显示当前路由，所以sidebar会处于没有高亮路由的状态，
                                 所以需要该属性来指定。一般用于curd中的编辑和详情页面，用来指定sidebar高亮list路由。
    alwaysShow: null,            在sidebar中是否一直显示当前路由，用于是否嵌套路由的判断，有3个值：true、false、null
                                 注意：如果是多层路由嵌套，只有当嵌套根路由设置了alwaysShow为true的时候，子路由设置alwaysShow：true才会生效
                                    true:  无论当前路由下有没有子路由或有多少子路由，当前路由在sidebar中都会以嵌套模式显示
                                    false：无论当前路由下有没有子路由，当前路由在sidebar中都会隐藏，只显示当前路由下的子路由
                                    null： 如果当前路由有且只有一个子路由，则该子路由会代替当前路由显示在sidebar
                                           如果当前路由下没有子路由，则当前路由会显示在sidebar
                                           如果当前路由下有多个子路由（一个以上），则当前路由和子路由会以嵌套方式显示
    roles: null                  路由权限，Array格式，默认null,
    target: ''                   用于指定外链的跳转方式，当设置该属性，该路由会以外链方式处理['_blank', '_self', ...]
    keepAlive: false             指定该路由是否缓存
  }
 **/
export const asyncRouterMap = [
  {
    path: '/',
    name: 'Index',
    redirect: '/dashboard/workspace',
    component: BasicLayout,
    meta: { title: '首页' },
    children: [
      /* dashboard */
      {
        path: '/dashboard',
        name: 'Dashboard',
        redirect: '/dashboard/workspace',
        component: RouteView,
        meta: {
          title: '仪表盘',
          icon: 'dashboard',
          keepAlive: true,
          alwaysShow: true
        },
        children: [
          /* 工作台 */
          {
            path: '/dashboard/workspace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workspace'),
            meta: {
              title: '工作台',
              keepAlive: true
            }
          },
          /* 外部链接 */
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: {
              title: '监控页（外部）',
              target: '_blank'
            }
          }
        ]
      },
      /* form */
      {
        path: '/form',
        name: 'Form',
        redirect: '/form/base',
        component: RouteView,
        meta: {
          title: '表单',
          icon: 'container',
          alwaysShow: true
        },
        children: [
          /* 基础表单 */
          {
            path: '/form/base',
            name: 'BaseForm',
            component: () => import('@/views/form/BaseForm'),
            meta: {
              title: '基础表单',
              icon: 'fa fa-file-text-o',
              iconType: 'class'
            }
          },
          /* 分步表单页 */
          {
            path: '/form/step',
            name: 'StepForm',
            component: () => import('@/views/form/StepForm'),
            meta: {
              title: '分步表单',
              icon: 'fa fa-file-text-o',
              iconType: 'class'
            }
          },
          /* 表单验证 */
          {
            path: '/form/validate',
            name: 'ValidateForm',
            component: () => import('@/views/form/ValidateForm'),
            meta: {
              title: '表单验证',
              icon: 'fa fa-file-text-o',
              iconType: 'class'
            }
          },
          /* 表单上传 */
          {
            path: '/form/upload',
            name: 'UploadForm',
            component: () => import('@/views/form/UploadForm'),
            meta: {
              title: '文件上传',
              icon: 'fa fa-file-text-o',
              iconType: 'class'
            }
          }
        ]
      },
      /* table */
      {
        path: '/table',
        name: 'Table',
        redirect: '/table/base/list',
        component: RouteView,
        meta: {
          title: '表格',
          icon: 'table',
          alwaysShow: true
        },
        children: [
          /* 基础数据表格 */
          {
            path: '/table/base',
            name: 'BaseTable',
            redirect: '/table/base/list',
            component: RouteView,
            meta: {
              title: '基础数据表格',
              icon: 'fa fa-table',
              iconType: 'class',
              alwaysShow: true
            },
            children: [
              /* 列表 */
              {
                path: '/table/base/list',
                name: 'BaseTableList',
                component: () => import('@/views/table/base/index'),
                meta: {
                  title: '列表',
                  icon: 'fa fa-user',
                  iconType: 'class'
                }
              },
              /* 新增 */
              {
                path: '/table/base/add',
                name: 'BaseTableAdd',
                component: () => import('@/views/table/base/Update'),
                meta: {
                  title: '新增',
                  describe: '包含了常用的form表单组件的使用及表单验证功能，框架约定新增和编辑使用同一个vue组件',
                  hidden: true,
                  activePath: '/table/base/list'
                }
              },
              /* 编辑 */
              {
                path: '/table/base/edit/:staffId',
                name: 'BaseTableEdit',
                component: () => import('@/views/table/base/Update'),
                meta: {
                  title: '编辑',
                  describe: '包含了常用的form表单组件的使用及表单验证功能，框架约定新增和编辑使用同一个vue组件',
                  hidden: true,
                  activePath: '/table/base/list'
                }
              },
              /* 详情 */
              {
                path: '/table/base/detail/:staffId',
                name: 'BaseTableDetail',
                component: () => import('@/views/table/base/Detail'),
                meta: {
                  title: '详情',
                  describe: '常用的详情页面',
                  hidden: true,
                  activePath: '/table/base/list'
                }
              }
            ]
          },
          /* 选择数据表格 */
          {
            path: '/table/selected',
            name: 'SelectedTable',
            redirect: '/table/selected/list',
            component: RouteView,
            meta: {
              title: '选择数据表格',
              icon: 'fa fa-table',
              iconType: 'class',
              alwaysShow: true
            },
            children: [
              {
                path: '/table/selected/list',
                name: 'SelectedTableList',
                component: () => import('@/views/table/selected/index'),
                meta: {
                  title: '列表',
                  icon: 'fa fa-user',
                  iconType: 'class'
                }
              }
            ]
          }
        ]
      },
      /* detail */
      {
        path: '/detail',
        name: 'Detail',
        redirect: '/detail/base',
        component: RouteView,
        meta: {
          title: '详情',
          icon: 'fa fa-file-text-o',
          iconType: 'class',
          alwaysShow: true
        },
        children: [
          /* 基础详情页 */
          {
            path: '/detail/base',
            name: 'BaseDetail',
            component: () => import('@/views/detail/Base'),
            meta: {
              title: '基础详情页',
              icon: 'fa fa-file-text-o',
              iconType: 'class'
            }
          },
          /* 高级详情页 */
          {
            path: '/detail/senior',
            name: 'SeniorDetail',
            component: () => import('@/views/detail/Senior'),
            meta: {
              title: '高级详情页',
              icon: 'fa fa-file-text-o',
              iconType: 'class'
            }
          }
        ]
      },
      /* result */
      {
        path: '/result',
        name: 'Result',
        redirect: '/result/success',
        component: RouteView,
        meta: {
          title: '结果页',
          icon: 'check-circle',
          alwaysShow: true
        },
        children: [
          /* 成功页 */
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import('@/views/result/Success'),
            meta: {
              title: '成功页',
              icon: 'check-circle'
            }
          },
          /* 失败页 */
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import('@/views/result/Fail'),
            meta: {
              title: '失败页',
              icon: 'close-circle'
            }
          }
        ]
      },
      /* components */
      {
        path: '/components',
        name: 'Components',
        redirect: '/components/tree/editTree',
        component: RouteView,
        meta: {
          title: '组件',
          icon: 'copyright',
          alwaysShow: true
        },
        children: [
          /* 树型组件 */
          {
            path: '/components/tree',
            name: 'Tree',
            redirect: '/components/tree/editTree',
            component: RouteView,
            meta: {
              title: '树型组件',
              icon: 'apartment',
              alwaysShow: true
            },
            children: [
              /* 可编辑树 */
              {
                path: '/components/tree/editTree',
                name: 'EditTree',
                component: () => import('@/views/components/tree/EditTree'),
                meta: {
                  title: '可编辑树',
                  icon: 'apartment'
                }
              },
              /* 可选择树（多选）*/
              {
                path: '/components/tree/checkboxTree',
                name: 'CheckboxTree',
                component: () => import('@/views/components/tree/CheckboxTree'),
                meta: {
                  title: '可选择树（多选）',
                  icon: 'apartment'
                }
              },
              /* 可选择树（单选）*/
              {
                path: '/components/tree/radioTree',
                name: 'RadioTree',
                component: () => import('@/views/components/tree/RadioTree'),
                meta: {
                  title: '可选择树（单选）',
                  icon: 'apartment'
                }
              },
              /* 懒加载树 */
              {
                path: '/components/tree/lazyTree',
                name: 'LazyTree',
                component: () => import('@/views/components/tree/LazyTree'),
                meta: {
                  title: '懒加载树',
                  icon: 'apartment'
                }
              }
            ]
          },
          /* 编辑器 */
          {
            path: '/components/editor',
            name: 'Editor',
            component: () => import('@/views/components/Editor'),
            meta: {
              title: '富文本编辑器',
              icon: 'fa fa-upload',
              iconType: 'class'
            }
          },
          /* page模板 */
          {
            path: '/components/page',
            name: 'Page',
            component: () => import('@/views/components/Page'),
            meta: {
              title: 'Page模板页',
              icon: 'layout'
            }
          }
        ]
      },
      /* permission */
      {
        path: '/permission',
        name: 'Permission',
        component: RouteView,
        meta: {
          title: '权限',
          icon: 'lock',
          roles: ['admin', 'user'],
          alwaysShow: true
        },
        children: [
          /* admin */
          {
            path: '/permission/admin',
            name: 'PageAdmin',
            component: () => import('@/views/permission/Admin'),
            meta: {
              title: 'Admin',
              roles: ['admin']
            }
          },
          /* user */
          {
            path: '/permission/user',
            name: 'PageUser',
            component: () => import('@/views/permission/User'),
            meta: {
              title: 'User',
              roles: ['user']
            }
          }
        ]
      },
      /* Github */
      {
        path: 'https://github.com/xustshinn/x-framework',
        name: 'Github',
        meta: {
          title: 'Github',
          icon: 'github-fill',
          target: '_blank'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

export const constantRouterMap = [
  /* 登录页 */
  {
    path: '/login',
    name: 'Login',
    meta: { hidden: true },
    component: () => import('@/views/login')
  },
  /* 404 */
  {
    path: '/404',
    name: '404',
    meta: { hidden: true },
    component: () => import('@/views/exception/404')
  },
  /* 401 */
  {
    path: '/401',
    name: '401',
    meta: { hidden: true },
    component: () => import('@/views/exception/401')
  }
]
