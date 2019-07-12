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
          <x-sider
            :collapsed="app.siderCollapsed"
            :fixed="app.siderFixed"
          ></x-sider>
        </template>
        <template v-slot:header>
          <x-header></x-header>
        </template>
        <template v-slot:main>
          <x-main></x-main>
        </template>
        <template v-slot:footer>
          <x-footer></x-footer>
        </template>
      </layout-default>
      <layout-classic
        v-if="app.layout === 'classic'"
        key="layout-classic"
      >
        <template v-slot:sider>
          <x-sider
            :collapsed="app.siderCollapsed"
            :fixed="app.siderFixed"
            :show-header="false"
          ></x-sider>
        </template>
        <template v-slot:header>
          <x-header></x-header>
        </template>
        <template v-slot:main>
          <x-main></x-main>
        </template>
        <template v-slot:footer>
          <x-footer></x-footer>
        </template>
      </layout-classic>
    </transition>
    <drawer
      v-if="xsScreen"
      :opened="app.siderOpened"
      @maskClick="closeSiderDrawer"
    >
      <template v-slot:default>
        <div class="x-layout-sider fixed">
          <x-sider
            :collapsed="false"
            :fixed="true"
          ></x-sider>
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
      v-if="app.showSettings"
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
        <layout-setting></layout-setting>
      </template>
    </drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getScreenSize } from '@/common/utils'
import { debounce } from 'lodash'
import screen from '@/common/constants/screen'
import { LayoutDefault, LayoutClassic, XSider, XHeader, XMain, XFooter, LayoutSetting } from '@/components/Layout/components'
import Drawer from '@/components/Drawer'
import BackToTop from '@/components/BackToTop'

const WINDOW_RESIZE_HANDLER_DELAY = 300
const SETTING_DRAWER_TOGGLE_DELAY = 300

export default {
  name: 'Layout',
  components: {
    LayoutDefault,
    LayoutClassic,
    XSider,
    XHeader,
    XMain,
    XFooter,
    LayoutSetting,
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
    window.addEventListener('resize', this.windowResizeHandler)
  },
  mounted () {
    this.windowResizeHandler()
  },
  methods: {
    ...mapMutations({
      setScreenSize: 'SET_SCREEN_SIZE',
      setSiderCollapsed: 'SET_SIDER_COLLAPSED',
      setSiderOpened: 'SET_SIDER_OPENED'
    }),
    windowResizeHandler: debounce(function () {
      this.setScreenSize(getScreenSize())
    }, WINDOW_RESIZE_HANDLER_DELAY),
    closeSiderDrawer () {
      this.setSiderOpened(false)
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
