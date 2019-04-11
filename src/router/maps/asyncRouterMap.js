import Layout from '@/views/layout'
import componentsRouterMap from '@/router/maps/modules/components'

/**
* 路由表相关参数
* name:'router-name'
* meta : {                       由于vue-router自定义属性迁移到meta中，所以每一个路由至少定义meta: {}
    title: '',                   路由标题，用于显示在sider、breadcrumb、和pageHeader中的路由名称
    icon: '',                    该路由在sider中显示的图标，值：iconfont中的svg-name
    describe: ''                 路由相关描述，显示在Page组件中的PageHeader
    noCache: false,              禁止缓存该路由，默认false
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
    external: false              是否外部链接，默认false
  }
**/

const asyncRouterMap = [{
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      icon: 'dashboard'
    },
    children: [{
      path: 'index',
      name: 'DashboardIndex',
      component: () =>
        import ('@/views/dashboard'),
      meta: {
        title: '首页',
        icon: 'dashboard',
        noCache: true,
        describe: '监控系统各项功能运作情况以及一些相关统计'
      }
    }]
  },
  /* 模块路由表引入 */
  componentsRouterMap,
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
      },
      {
        path: 'editor',
        name: 'PageEditor',
        component: () =>
          import ('@/views/permission/pageEditor'),
        meta: {
          title: '权限控制页-Editor',
          describe: '权限控制页，该功能只有拥有‘admin’、‘editor’权限的用户能访问',
          roles: ['editor']
        }
      },
      {
        path: 'user',
        name: 'PageUser',
        component: () =>
          import ('@/views/permission/pageUser'),
        meta: {
          title: '权限控制页-User',
          describe: '权限控制页，该功能只有拥有‘admin’、‘user’权限的用户能访问',
          roles: ['user']
        }
      },
      {
        path: 'directive',
        name: 'DirectivePermission',
        component: () =>
          import ('@/views/permission/directive'),
        meta: {
          title: 'DirectivePermission',
          roles: ['editor']
        }
      }
    ]
  },
  {
    path: '/template',
    name: 'Template',
    component: Layout,
    redirect: '/template/index',
    meta: {
      showInBreadcrumb: false
    },
    children: [{
      path: 'index',
      name: 'TemplateIndex',
      component: () =>
        import ('@/views/template'),
      meta: {
        title: 'Template模板',
        icon: 'layout',
        describe: '监控系统各项功能运作情况以及一些相关统计'
      }
    }]
  },
  {
    path: 'https://github.com/xustshinn/x-framework',
    name: 'Github',
    meta: {
      title: 'Github',
      icon: 'github-fill',
      external: true
    }
  },
  {
    path: 'http://183.6.175.42:2001/html/platform_visitor.html',
    name: 'sjq-it-visitor',
    meta: {
      title: '水晶球智能访客管理系统',
      icon: 'http://183.6.175.42:2001/resources/images/frame/index1.png',
      iconType: 'image',
      external: true
    }
  },
  {
    path: 'http://www.baidu.com/',
    name: 'baidu',
    meta: {
      title: '百度一下',
      icon: 'fa fa-paw',
      iconType: 'class',
      external: true
    }
  },
  /* 由于路由是从上到下解析执行，所以404判断必须放最后 */
  {
    path: '*',
    redirect: '/404',
    meta: {
      hidden: true
    }
  }
]

export default asyncRouterMap