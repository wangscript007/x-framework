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
