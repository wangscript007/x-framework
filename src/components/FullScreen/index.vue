<template>
  <a
    class="full-screen-btn"
    href="javascript:void(0)"
    :title="title"
    @click="click"
  >
    <x-icon :icon="iconClass" />
  </a>
</template>

<script>
import screenFull from 'screenfull'

export default {
  name: 'FullScreen',
  data () {
    return {
      isFullScreen: false
    }
  },
  computed: {
    iconClass () {
      return this.isFullScreen ? 'fullscreen-exit' : 'fullscreen'
    },
    title () {
      return this.isFullScreen ? '退出全屏' : '全屏显示'
    }
  },
  mounted () {
    if (!screenFull.enabled) {
      return
    }
    const _this = this
    screenFull.on('change', () => {
      _this.isFullScreen = screenFull.isFullscreen
    })
  },
  methods: {
    click () {
      if (!screenFull.enabled) {
        this.$message({
          message: '抱歉，您的浏览器无法使用该功能',
          type: 'warning'
        })
        return false
      }
      screenFull.toggle()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .full-screen-btn {
    color: rgba(0, 0, 0, 0.65);
    font-size: 20px;
    line-height: 20px;
  }
</style>
