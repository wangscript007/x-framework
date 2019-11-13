import Vue from 'vue'
import { CACHE_APP_TYPES } from '@/cache/cache-types'
import { MUT_APP_TYPES } from '@/store/mutation-types'

const app = {
  state: {
    app: {
      /* 系统名称 */
      name: '',
      /* logo */
      logo: '',
      /* 登录页壁纸 */
      loginPic: '',
      /* 屏幕大小 */
      screenSize: '',
      /* 布局 */
      layout: '',
      /* 是否固定头部 */
      headerFixed: '',
      /* 是否固定菜单，默认false */
      sidebarFixed: '',
      /* 是否折叠菜单，默认false */
      sidebarCollapsed: false,
      /* 是否打开抽屉式菜单 */
      sidebarOpened: false,
      /* breadcrumb位置 */
      breadcrumbWrapper: '',
      /* 是否显示设置 */
      enableSetting: ''
    }
  },
  mutations: {
    [MUT_APP_TYPES.SET_NAME] (state, name) {
      state.app.name = name
    },
    [MUT_APP_TYPES.SET_LOGO] (state, logo) {
      state.app.logo = logo
    },
    [MUT_APP_TYPES.SET_LOGIN_PIC] (state, loginPic) {
      state.app.loginPic = loginPic
    },
    [MUT_APP_TYPES.SET_SCREEN_SIZE] (state, screenSize = '') {
      state.app.screenSize = screenSize
    },
    [MUT_APP_TYPES.SET_LAYOUT] (state, layout) {
      Vue.ls.set(CACHE_APP_TYPES.LAYOUT, layout)
      state.app.layout = layout
    },
    [MUT_APP_TYPES.SET_HEADER_FIXED] (state, headerFixed) {
      Vue.ls.set(CACHE_APP_TYPES.HEADER_FIXED, headerFixed)
      state.app.headerFixed = headerFixed
    },
    [MUT_APP_TYPES.SET_SIDEBAR_FIXED] (state, sidebarFixed) {
      Vue.ls.set(CACHE_APP_TYPES.SIDEBAR_FIXED, sidebarFixed)
      state.app.sidebarFixed = sidebarFixed
    },
    [MUT_APP_TYPES.SET_SIDEBAR_COLLAPSED] (state, sidebarCollapsed) {
      state.app.sidebarCollapsed = sidebarCollapsed
    },
    [MUT_APP_TYPES.SET_SIDEBAR_OPENED] (state, sidebarOpened) {
      state.app.sidebarOpened = sidebarOpened
    },
    [MUT_APP_TYPES.SET_BREADCRUMB_WRAPPER] (state, breadcrumbWrapper) {
      Vue.ls.set(CACHE_APP_TYPES.BREADCRUMB_WRAPPER, breadcrumbWrapper)
      state.app.breadcrumbWrapper = breadcrumbWrapper
    },
    [MUT_APP_TYPES.SET_ENABLE_SETTING] (state, enableSetting) {
      Vue.ls.set(CACHE_APP_TYPES.ENABLE_SETTING, enableSetting)
      state.app.enableSetting = enableSetting
    }
  },
  getters: {
    app: state => state.app
  }
}

export default app
