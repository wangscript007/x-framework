<template>
  <div class="screen"
       :class="app.screenSize">
    <div class="x-layout">
      <transition name="sider-toggle">
        <layout-sider v-if="!smallScreen"
                      :routers="permission.routers"
                      :collapsed="app.siderCollapsed"
                      :fixed="app.siderFixed"></layout-sider>
      </transition>
      <div class="x-layout-content">
        <layout-header></layout-header>
        <layout-main></layout-main>
      </div>
    </div>
    <layout-drawer v-if="smallScreen"
                   :opened="app.siderOpened"
                   @maskClick="closeSiderDrawer"
                   ref="siderDrawer">
      <layout-sider :routers="permission.routers"
                    :collapsed="false"
                    :fixed="true"></layout-sider>
    </layout-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getScreenSize } from '@/common/utils'
import screen from '@/common/constants/screen'
import LayoutHeader from '@/views/layout/components/Header'
import LayoutSider from '@/views/layout/components/Sider'
import LayoutMain from '@/views/layout/components/Main'
import LayoutDrawer from '@/components/Drawer'

export default {
  name: 'layout',
  created () {
    this.refreshReady = true
    this.refreshDelay = 300
  },
  beforeMount () {
    window.addEventListener('resize', this._resizeHandler)
  },
  mounted () {
    this._resizeHandler()
  },
  computed: {
    ...mapGetters(['app', 'permission']),
    smallScreen () {
      return this.app.screenSize === screen.xs.name
    }
  },
  methods: {
    ...mapMutations({
      setScreenSize: 'SET_SCREEN_SIZE',
      setSiderCollapsed: 'SET_SIDER_COLLAPSED',
      setSiderOpened: 'SET_SIDER_OPENED'
    }),
    _resizeHandler () {
      if (!this.refreshReady) {
        return
      }
      this.refreshReady = false
      let _this = this
      let timer = setTimeout(() => {
        _this.setScreenSize(getScreenSize())
        _this.refreshReady = true
        clearTimeout(timer)
      }, this.refreshDelay)
    },
    closeSiderDrawer () {
      this.setSiderOpened(false)
    }
  },
  watch: {
    $route () {
      if (this.smallScreen) {
        this.closeSiderDrawer()
      }
    },
    'app.screenSize' (size) {
      this.$nextTick(() => {
        this.closeSiderDrawer()
        this.setSiderCollapsed(
          size === screen.md.name || size === screen.sm.name || size === screen.xs.name
        )
      })
    }
  },
  components: {
    LayoutSider,
    LayoutHeader,
    LayoutMain,
    LayoutDrawer
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
