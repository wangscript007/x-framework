import dashboardRouterMap from '@/router/maps/asyncRouterMap/dashboard'
import tableRouterMap from '@/router/maps/asyncRouterMap/table'
import componentsRouterMap from '@/router/maps/asyncRouterMap/components'
import permissionRouterMap from '@/router/maps/asyncRouterMap/permission'
import externalRouterMap from '@/router/maps/asyncRouterMap/external'

/**
 * 路由表开发约定：
 * 1、所有业务功能路由统一定义在asyncRouterMap中，且必须设置meta属性
 * 2、外链统一定义在externalRouterMap中，不建议定义在嵌套路由下面
 **/

/**
* 路由表相关参数
* path: '/xxx',
* name:'RouterName',             必须设置route的name值，用于页面跳转传参，且必须保证唯一性，命名方式统一使用pascal命名法，如："BaseTable"
* redirect: null,                路由重定向，可以不必设置，在生成路由表系统会根据权限自动添加
* meta : {                       由于vue-router自定义属性迁移到meta中，所以每一个路由至少定义meta: {}
    title: '',                   路由标题，用于显示在sider、breadcrumb、和pageHeader中的路由名称
    icon: '',                    当前路由在sider中显示的图标，值：iconfont中的svg-name
    describe: ''                 路由相关描述，显示在Page组件中的PageHeader
    hidden: false,               是否在sider中隐藏当前路由
    activePath: '',              强制sider高亮指定的路由，当当前路由处于hidden:true时，sider并不会显示当前路由，所以sider会处于没有高亮路由的状态，
                                 所以需要该属性来指定。一般用于curd中的编辑和详情页面，用来指定sider高亮list路由。
    alwaysShow: null,            在sider中是否一直显示当前路由，用于是否嵌套路由的判断，有3个值：true、false、null
                                 注意：如果是多层路由嵌套，只有当嵌套根路由设置了alwaysShow为true的时候，子路由设置alwaysShow：true才会生效
                                    true:  无论当前路由下有没有子路由或有多少子路由，当前路由在sider中都会以嵌套模式显示
                                    false：无论当前路由下有没有子路由，当前路由在sider中都会隐藏，只显示当前路由下的子路由
                                    null： 如果当前路由有且只有一个子路由，则该子路由会代替当前路由显示在sider
                                           如果当前路由下没有子路由，则当前路由会显示在sider
                                           如果当前路由下有多个子路由（一个以上），则当前路由和子路由会以嵌套方式显示
    showInBreadcrumb: true,      面包屑中是否显示当前路由，默认true
    redirectInBreadcrumb: true   面包屑中当前路由是否可点击重定向，默认true
    roles: null                  路由权限，Array格式，默认null
    absolute: false              是否绝对权限，若设置true，当前路由下的子路由会进行严格筛选，包括admin
    external: false              是否外部链接，默认false
  }
**/

const asyncRouterMap = [
  /* 模块路由表引入 */
  /* 主页 */
  dashboardRouterMap,
  /* 表格 */
  tableRouterMap,
  /* 组件 */
  componentsRouterMap,
  /* 权限控制 */
  permissionRouterMap,
  /* 外链 */
  ...externalRouterMap,
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
