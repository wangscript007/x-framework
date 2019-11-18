import Vue from 'vue'
import VueStorage from 'vue-ls'

import Element from 'element-ui'
import XIcon from '@/components/Icon'
import XPage from '@/components/Page'

import '@/assets/icon/iconfont'
import 'normalize.css/normalize.css'
import 'animate.css'
import '@/assets/scss/index.scss'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/icon/iconfont.css'

Vue.component('x-icon', XIcon)
Vue.component('x-page', XPage)

Vue.use(Element, { size: 'medium' })
Vue.use(VueStorage, {
  namespace: '', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
})
