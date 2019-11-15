<template>
  <div
    class="screen"
    :class="app.screenSize"
  >
    <transition
      name="animate-layout"
      mode="out-in"
    >
      <layout-default
        v-if="app.layout === 'default'"
        key="layout-default"
      >
        <template v-slot:sider>
          <sidebar
            :collapsed="app.sidebarCollapsed"
            :fixed="app.sidebarFixed"
          />
        </template>
        <template v-slot:header>
          <global-header />
        </template>
        <template v-slot:main>
          <transition
            name="animate-layout-main"
            mode="out-in"
          >
            <route-view />
          </transition>
        </template>
        <template v-slot:footer>
          <global-footer />
        </template>
      </layout-default>
      <layout-classic
        v-if="app.layout === 'classic'"
        key="layout-classic"
      >
        <template v-slot:sider>
          <sidebar
            :collapsed="app.sidebarCollapsed"
            :fixed="app.sidebarFixed"
            :show-header="false"
          />
        </template>
        <template v-slot:header>
          <global-header />
        </template>
        <template v-slot:main>
          <transition
            name="animate-layout-main"
            mode="out-in"
          >
            <route-view />
          </transition>
        </template>
        <template v-slot:footer>
          <global-footer />
        </template>
      </layout-classic>
    </transition>
    <drawer
      v-if="xsScreen"
      :opened="app.sidebarOpened"
      @maskClick="closeSidebarDrawer"
    >
      <template v-slot:default>
        <div class="x-layout-sider fixed">
          <sidebar
            :collapsed="false"
            :fixed="true"
          />
        </div>
      </template>
    </drawer>
    <el-tooltip
      placement="top"
      content="回到顶部"
    >
      <back-to-top />
    </el-tooltip>
    <drawer
      v-if="app.enableSetting"
      type="right"
      handler-top="20%"
      class-name="x-settings"
      :opened="settingDrawerOpened"
      @maskClick="toggleSettingDrawer"
    >
      <template v-slot:handler>
        <a
          class="x-settings-toggle-btn"
          href="javascript:void(0)"
          title="系统设置"
          @click.stop="toggleSettingDrawer"
        >
          <x-icon
            :icon="`iconfont icon-${settingDrawerOpened ? 'close' : 'setting'}`"
            type="class"
          />
        </a>
      </template>
      <template v-slot:default>
        <global-setting />
      </template>
    </drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { MUT_APP_TYPES } from '@/store/mutation-types'
import { getScreenSize } from '@/common/utils'
import { debounce } from 'lodash'
import screen from '@/common/constants/screen'
import RouteView from './RouteView'
import { LayoutDefault, LayoutClassic, Sidebar, GlobalHeader, GlobalFooter, GlobalSetting } from '@/layout/components'
import Drawer from '@/components/Drawer'
import BackToTop from '@/components/BackToTop'

const WINDOW_RESIZE_HANDLER_DELAY = 300
const SETTING_DRAWER_TOGGLE_DELAY = 300

export default {
  name: 'BasicLayout',
  components: {
    RouteView,
    LayoutDefault,
    LayoutClassic,
    Sidebar,
    GlobalHeader,
    GlobalFooter,
    GlobalSetting,
    Drawer,
    BackToTop
  },
  data () {
    return {
      settingDrawerOpened: false
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
        this.closeSidebarDrawer()
      }
    },
    'app.screenSize' (size) {
      this.$nextTick(() => {
        this.closeSidebarDrawer()
        this.setSidebarCollapsed(size === screen.md.name || size === screen.sm.name || size === screen.xs.name)
      })
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.windowResizeHandler)
  },
  mounted () {
    this.windowResizeHandler()
  },
  methods: {
    ...mapMutations({
      setScreenSize: MUT_APP_TYPES.SET_SCREEN_SIZE,
      setSidebarCollapsed: MUT_APP_TYPES.SET_SIDEBAR_COLLAPSED,
      setSidebarOpened: MUT_APP_TYPES.SET_SIDEBAR_OPENED
    }),
    windowResizeHandler: debounce(function () {
      this.setScreenSize(getScreenSize())
    }, WINDOW_RESIZE_HANDLER_DELAY),
    closeSidebarDrawer () {
      this.setSidebarOpened(false)
    },
    toggleSettingDrawer: debounce(function () {
      this.settingDrawerOpened = !this.settingDrawerOpened
    }, SETTING_DRAWER_TOGGLE_DELAY, {
      leading: true,
      trailing: false
    })
  }
}
</script>
