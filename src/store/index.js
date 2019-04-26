import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import app from '@/store/modules/app'
import user from '@/store/modules/user'
import permission from '@/store/modules/permission'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  // strict: debug,
  plugins: debug ? [createLogger()] : []
})
