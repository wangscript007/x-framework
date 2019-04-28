<template>
  <el-tooltip
    :content="tipTitle"
    effect="dark"
    placement="bottom"
  >
    <a
      class="full-screen-btn"
      href="javascript:void(0)"
      @click="click"
    >
      <x-icon :icon="iconClass" />
    </a>
  </el-tooltip>
</template>

<script>
import screenfull from 'screenfull'

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
    tipTitle () {
      return this.isFullScreen ? '退出全屏' : '全屏显示'
    }
  },
  mounted () {
    if (!screenfull.enabled) {
      return
    }
    const _this = this
    screenfull.on('change', () => {
      _this.isFullScreen = screenfull.isFullscreen
    })
  },
  methods: {
    click () {
      if (!screenfull.enabled) {
        this.$message({
          message: '抱歉，您的浏览器无法使用改功能',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .full-screen-btn {
    padding: 0 12px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 20px;
    line-height: 20px;
  }
</style>
