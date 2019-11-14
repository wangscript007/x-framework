import Vue from 'vue'
import store from '@/store'
import config from '@/config/app.config'
import { ACCESS_TOKEN, ACCESS_USER, CACHE_APP_TYPES } from '@/cache/cache-types'
import { MUT_USER_TYPES, MUT_APP_TYPES } from '@/store/mutation-types'

export default function Initializer () {
  store.commit(MUT_USER_TYPES.SET_TOKEN, Vue.ls.get(ACCESS_TOKEN, ''))
  store.commit(MUT_USER_TYPES.SET_USER, Vue.ls.get(ACCESS_USER, null))
  store.commit(MUT_APP_TYPES.SET_NAME, config.name)
  store.commit(MUT_APP_TYPES.SET_LOGO, config.logo)
  store.commit(MUT_APP_TYPES.SET_LOGIN_PIC, config.loginPic)
  store.commit(MUT_APP_TYPES.SET_LAYOUT, Vue.ls.get(CACHE_APP_TYPES.LAYOUT, config.layout))
  store.commit(MUT_APP_TYPES.SET_HEADER_FIXED, Vue.ls.get(CACHE_APP_TYPES.HEADER_FIXED, config.headerFixed))
  store.commit(MUT_APP_TYPES.SET_SIDEBAR_FIXED, Vue.ls.get(CACHE_APP_TYPES.SIDEBAR_FIXED, config.sidebarFixed))
  store.commit(MUT_APP_TYPES.SET_BREADCRUMB_WRAPPER, Vue.ls.get(CACHE_APP_TYPES.BREADCRUMB_WRAPPER, config.breadcrumbWrapper))
  store.commit(MUT_APP_TYPES.SET_ENABLE_SETTING, Vue.ls.get(CACHE_APP_TYPES.ENABLE_SETTING, config.enableSetting))
}
