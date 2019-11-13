<template>
  <div class="x-header fix">
    <div
      v-if="app.layout === 'classic'"
      class="x-header-logo"
    >
      <a
        href="/"
        :title="app.name"
      >
        <img
          :src="app.logo"
          :alt="app.name"
        >
        <h1>{{ app.name }}</h1>
      </a>
    </div>
    <div class="x-header-menu-left">
      <toggle
        class="menu-item"
        :title="`${app.sidebarCollapsed ? '展开' : '收起'}导航`"
      ></toggle>
    </div>
    <div class="x-header-menu-breadcrumb">
      <breadcrumb v-if="app.layout === 'default' && app.breadcrumbWrapper === 'appHeader'"></breadcrumb>
    </div>
    <div class="x-header-menu-right">
      <el-dropdown
        class="menu-item menu-item-user"
        trigger="click"
      >
        <div class="menu-item-user-dropdown-btn">
          <img
            v-if="user && user.avatar"
            :src="user.avatar"
            class="user-avatar"
          >
          <span v-if="!xsScreen">{{ user && user.realName ? user.realName : '' }}</span>
        </div>
        <template v-slot:dropdown>
          <el-dropdown-menu class="x-header-avatar-dropdown">
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
        </template>
      </el-dropdown>
      <full-screen
        v-if="!xsScreen"
        class="menu-item"
      />
    </div>
  </div>
</template>

<script>
import awaitTo from 'await-to-js'
import { mapGetters } from 'vuex'
import screen from '@/common/constants/screen'
import Toggle from '@/components/Layout/components/Header/Toggle'
import FullScreen from '@/components/FullScreen'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'XHeader',
  components: {
    Toggle,
    FullScreen,
    Breadcrumb
  },
  computed: {
    ...mapGetters(['app', 'user']),
    xsScreen () {
      return this.app.screenSize === screen.xs.name
    }
  },
  methods: {
    logout: async function () {
      await awaitTo(this.$store.dispatch('logout'))
      location.reload()
    }
  }
}
</script>

