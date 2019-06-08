<template>
  <div
    class="x-layout-header"
    :class="{'header-fixed':fixed}"
  >
    <toggle></toggle>
    <breadcrumb v-if="app.breadcrumbPosition === 'appHeader'"></breadcrumb>
    <div
      v-if="!isXsScreen"
      class="right-menu"
    >
      <el-dropdown
        class="user-wrapper right-menu-item"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            v-if="user && user.avatar"
            :src="user.avatar"
            class="user-avatar"
          >
          <span>{{ user && user.realName ? user.realName : '' }}</span>
        </div>
        <el-dropdown-menu
          slot="dropdown"
          class="avatar-dropdown"
        >
          <el-dropdown-item>
            <a
              target="_blank"
              href="javascript:void(0)"
            >
              <x-icon icon="user" /><span>个人中心</span>
            </a>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/">
              <x-icon icon="setting" /><span>系统设置</span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <a
              href="javascript:void(0)"
              @click="logout"
            >
              <x-icon icon="logout" /><span>退出登录</span>
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <full-screen class="right-menu-item" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import screen from '@/common/constants/screen'
import Toggle from '@/views/layout/components/Header/Toggle'
import FullScreen from '@/components/FullScreen'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'LayoutHeader',
  components: {
    Toggle,
    FullScreen,
    Breadcrumb
  },
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['app', 'user']),
    isXsScreen () {
      return this.app.screenSize === screen.xs.name
    }
  },
  methods: {
    logout: async function () {
      await this.$store.dispatch('logout')
      location.reload()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
