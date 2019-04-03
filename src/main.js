import Vue from 'vue'
import App from '@/App.vue'

import Element from 'element-ui'
import Cookies from 'js-cookie'
import SvgIcon from '@/components/SvgIcon'
import router from '@/router'
import store from '@/store'

import 'normalize.css/normalize.css'
import '@/assets/scss/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icon/iconfont.css'
import '@/icon/iconfont'
import '@/mock'
import '@/permission'

Vue.config.productionTip = false

Vue.component('svg-icon', SvgIcon)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')