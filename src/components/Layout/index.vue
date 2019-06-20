<template>
  <div
    class="screen"
    :class="app.screenSize"
  >
    <layout-default v-if="app.layout === 'default'">
      <template v-slot:sider>
        <content-sider
          :collapsed="app.siderCollapsed"
          :fixed="app.siderFixed"
        ></content-sider>
      </template>
      <template v-slot:header>
        <content-header></content-header>
      </template>
      <template v-slot:main>
        <content-main></content-main>
      </template>
      <template v-slot:footer>
        <content-footer></content-footer>
      </template>
    </layout-default>
    <layout-classic v-else></layout-classic>
    <layout-drawer
      v-if="xsScreen"
      ref="siderDrawer"
      :opened="app.siderOpened"
      @maskClick="closeSiderDrawer"
    >
      <div class="x-layout-sider fixed">
        <content-sider
          :collapsed="false"
          :fixed="true"
        ></content-sider>
      </div>
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
import LayoutDefault from '@/components/Layout/LayoutDefault'
import LayoutClassic from '@/components/Layout/LayoutClassic'
import ContentSider from '@/components/Layout/components/Sider'
import ContentHeader from '@/components/Layout/components/Header'
import ContentMain from '@/components/Layout/components/Main'
import ContentFooter from '@/components/Layout/components/Footer'
import LayoutDrawer from '@/components/Drawer'
import BackToTop from '@/components/BackToTop'

export default {
  name: 'Layout',
  components: {
    LayoutDefault,
    LayoutClassic,
    ContentSider,
    ContentHeader,
    ContentMain,
    ContentFooter,
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
    ...mapGetters(['app']),
    xsScreen () {
      return this.app.screenSize === screen.xs.name
    }
  },
  watch: {
    $route () {
      if (this.xsScreen) {
        this.closeSiderDrawer()
      }
    },
    'app.screenSize' (size) {
      this.$nextTick(() => {
        this.closeSiderDrawer()
        this.setSiderCollapsed(size === screen.md.name || size === screen.sm.name || size === screen.xs.name)
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
