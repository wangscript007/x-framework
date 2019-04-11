<template>
  <div class="x-layout-header">
    <toggle></toggle>
    <div v-if="!isXsScreen"
         class="right-menu">
      <el-tooltip :content="'全屏显示'"
                  effect="dark"
                  placement="bottom">
        <full-screen class="right-menu-item" />
      </el-tooltip>
      <el-dropdown class="user-wrapper right-menu-item"
                   trigger="click">
        <div class="avatar-wrapper">
          <img src="http://183.6.175.42:2001/resources/images/temp/user1.jpg"
               class="user-avatar">
          <span>Admin</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <a target="_blank"
             href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              Github
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import screen from '@/common/constants/screen'
import Toggle from '@/views/layout/components/Header/Toggle'
import FullScreen from '@/components/FullScreen'

export default {
  name: 'LayoutHeader',
  computed: {
    ...mapGetters(['app']),
    isXsScreen() {
      return this.app.screenSize === screen.xs.name
    }
  },
  components: {
    Toggle,
    FullScreen
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
