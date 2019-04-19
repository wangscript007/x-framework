import Layout from '@/views/layout'
import componentsRouterMap from '@/router/maps/modules/components'
import tableRouterMap from '@/router/maps/modules/table'

/**
 * 路由表开发约定：
 * 1、所有业务功能路由统一定义在asyncRouterMap中，且必须设置meta属性
 * 2、外部链接不建议定义在嵌套路由下面
 **/

/**
* 路由表相关参数
* name:'router-name'
* meta : {                       由于vue-router自定义属性迁移到meta中，所以每一个路由至少定义meta: {}
    title: '',                   路由标题，用于显示在sider、breadcrumb、和pageHeader中的路由名称
    icon: '',                    该路由在sider中显示的图标，值：iconfont中的svg-name
    describe: ''                 路由相关描述，显示在Page组件中的PageHeader
    hidden: false,               是否在sider中隐藏该路由
    alwaysShow: null,            是否一直显示该节点，用于是否嵌套路由的判断，有3个值：true、false、null
                                    true:  无论该路由下有没有子路由或有多少子路由，该路由在sider中都会显示
                                    false：无论该路由下有没有子路由，该路由在sider中都会隐藏
                                    null： 如果该路由有且只有一个子路由，则该子路由会代替该路由显示在sider
                                           如果该路由下没有子路由，则该路由会显示在sider
                                           如果该路由下有多个子路由（一个以上），则该路由和子路由会以嵌套方式显示
    showInBreadcrumb: true,      面包屑中是否显示该路由，默认true
    redirectInBreadcrumb: true   面包屑中该路由是否可点击重定向，默认true
    roles: null                  路由权限，Array格式，默认null
    absolute: false              是否绝对权限，若设置true，该路由下的子路由会进行严格筛选，包括admin用户
    external: false              是否外部链接，默认false
  }
**/

const asyncRouterMap = [
  /* 主页 */
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      icon: 'dashboard'
    },
    children: [
      /* admin的首页 */
      {
        path: 'admin',
        name: 'Dashboard-Admin',
        component: () =>
          import ('@/views/dashboard/admin'),
        meta: {
          title: '首页',
          icon: 'dashboard',
          describe: '监控系统各项功能运作情况以及一些相关统计',
          roles: ['admin'],
          absolute: true
        }
      },
      /* editor的首页 */
      {
        path: 'editor',
        name: 'Dashboard-Editor',
        component: () =>
          import ('@/views/dashboard/editor'),
        meta: {
          title: '首页',
          icon: 'dashboard',
          describe: '监控系统各项功能运作情况以及一些相关统计',
          roles: ['editor'],
          absolute: true
        }
      },
      /* user的首页 */
      {
        path: 'user',
        name: 'Dashboard-User',
        component: () =>
          import ('@/views/dashboard/user'),
        meta: {
          title: '首页',
          icon: 'dashboard',
          describe: '监控系统各项功能运作情况以及一些相关统计',
          roles: ['user'],
          absolute: true
        }
      }
    ]
  },
  /* 模块路由表引入 */
  tableRouterMap,
  componentsRouterMap,
  /* 权限控制 */
  {
    path: '/permission',
    name: 'Permission',
    component: Layout,
    redirect: '/permission/admin',
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
      component: () =>
        import ('@/views/permission/pageAdmin'),
      meta: {
        title: '权限控制页-Admin',
        describe: '权限控制页，该功能只有拥有‘admin’权限的用户能访问',
        roles: ['admin']
      }
    }, {
      path: 'editor',
      name: 'PageEditor',
      component: () =>
        import ('@/views/permission/pageEditor'),
      meta: {
        title: '权限控制页-Editor',
        describe: '权限控制页，该功能只有拥有‘admin’、‘editor’权限的用户能访问',
        roles: ['editor']
      }
    }, {
      path: 'user',
      name: 'PageUser',
      component: () =>
        import ('@/views/permission/pageUser'),
      meta: {
        title: '权限控制页-User',
        describe: '权限控制页，该功能只有拥有‘admin’、‘user’权限的用户能访问',
        roles: ['user']
      }
    }]
  },
  /* 外链 */
  {
    path: 'https://github.com/xustshinn/x-framework',
    name: 'Github',
    meta: {
      title: 'Github',
      icon: 'github-fill',
      external: true
    }
  },
  /* 404 */
  {
    path: '*',
    redirect: '/404',
    meta: {
      hidden: true
    }
  }
]

export default asyncRouterMap
