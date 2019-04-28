<template>
  <div
    class="screen"
    :class="app.screenSize"
  >
    <div class="x-layout">
      <transition name="sider-toggle">
        <layout-sider
          v-if="!smallScreen"
          :routers="permission.routers"
          :collapsed="app.siderCollapsed"
          :fixed="app.siderFixed"
        ></layout-sider>
      </transition>
      <div
        class="x-layout-content"
        :class="{'have-no-sider': smallScreen}"
      >
        <layout-header :fixed="app.headerFixed"></layout-header>
        <layout-main></layout-main>
        <layout-footer></layout-footer>
      </div>
    </div>
    <layout-drawer
      v-if="smallScreen"
      ref="siderDrawer"
      :opened="app.siderOpened"
      @maskClick="closeSiderDrawer"
    >
      <layout-sider
        :routers="permission.routers"
        :collapsed="false"
        :fixed="true"
      ></layout-sider>
    </layout-drawer>
    <el-tooltip
      placement="top"
      content="回到顶部"
    >
      <back-to-top />
    </el-tooltip>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getScreenSize } from '@/common/utils'
import screen from '@/common/constants/screen'
import LayoutHeader from '@/views/layout/components/Header'
import LayoutSider from '@/views/layout/components/Sider'
import LayoutMain from '@/views/layout/components/Main'
import LayoutFooter from '@/views/layout/components/Footer'
import LayoutDrawer from '@/components/Drawer'
import BackToTop from '@/components/BackToTop'

export default {
  name: 'Layout',
  components: {
    LayoutSider,
    LayoutHeader,
    LayoutMain,
    LayoutFooter,
    LayoutDrawer,
    BackToTop
  },
  data () {
    return {
      refreshReady: true,
      refreshDelay: 300
    }
  },
  computed: {
    ...mapGetters(['app', 'permission']),
    smallScreen () {
      return this.app.screenSize === screen.xs.name
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
  beforeMount () {
    window.addEventListener('resize', this._resizeHandler)
  },
  mounted () {
    this._resizeHandler()
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
      const _this = this
      const timer = setTimeout(() => {
        _this.setScreenSize(getScreenSize())
        _this.refreshReady = true
        clearTimeout(timer)
      }, this.refreshDelay)
    },
    closeSiderDrawer () {
      this.setSiderOpened(false)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
