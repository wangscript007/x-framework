import Vue from 'vue'
import App from '@/App.vue'

import Element from 'element-ui'
import XIcon from '@/components/Icon'
import router from '@/router'
import store from '@/store'

import 'normalize.css/normalize.css'
import 'animate.css'
import '@/assets/scss/index.scss'
// import '@/assets/scss/element-variables.scss'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/icon/iconfont.css'

import '@/assets/icon/iconfont'
import '@/mock'
import '@/permission'

Vue.config.productionTip = false

Vue.component('x-icon', XIcon)

Vue.use(Element, {
  size: 'medium'
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
