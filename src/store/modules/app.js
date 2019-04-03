import { appTypes } from '@/store/mutation-types'

const app = {
  state: {
    app: {
      /* 屏幕大小 */
      screenSize: '',
      /* 是否固定菜单，默认false */
      siderFixed: false,
      /* 是否折叠菜单，默认false */
      siderCollapsed: false,
      /* 是否打开抽屉式菜单 */
      siderOpened: false,
      /* 禁用动画 */
      disableAnimation: false
    }
  },
  mutations: {
    [appTypes.SET_SCREEN_SIZE](state, screenSize = '') {
      state.app.screenSize = screenSize
    },
    [appTypes.SET_SIDER_FIXED](state, siderFixed = false) {
      state.app.siderFixed = siderFixed
    },
    [appTypes.SET_SIDER_COLLAPSED](state, siderCollapsed = false) {
      state.app.siderCollapsed = siderCollapsed
    },
    [appTypes.SET_SIDER_OPENED](state, siderOpened = false) {
      state.app.siderOpened = siderOpened
    },
    [appTypes.SET_DISABLE_ANIMATION](state, disableAnimation = false) {
      state.app.disableAnimation = disableAnimation
    }
  },
  actions: {},
  getters: {
    app: state => state.app
  }
}

export default app