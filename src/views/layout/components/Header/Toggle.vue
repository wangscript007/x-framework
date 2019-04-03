<template>
  <a @click.stop="toggle"
     class="sider-toggle-button"
     href="javascript:void(0);">
    <svg-icon :icon-class="icon" />
  </a>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import screen from '@/common/constants/screen'

export default {
  name: 'Toggle',
  created () {
    this.clickReady = true
    this.clickDelay = 500
  },
  methods: {
    ...mapMutations({
      setSiderCollapsed: 'SET_SIDER_COLLAPSED',
      setSiderOpened: 'SET_SIDER_OPENED'
    }),
    toggle () {
      if (!this.clickReady) {
        return
      }
      this.clickReady = false
      if (this.app.screenSize === screen.xs.name) {
        this.setSiderOpened(!this.app.siderOpened)
      } else {
        this.setSiderCollapsed(!this.app.siderCollapsed)
      }
      let _this = this
      let timer = setTimeout(() => {
        _this.clickReady = true
        clearTimeout(timer)
      }, this.clickDelay)
    }
  },
  computed: {
    ...mapGetters(['app']),
    icon () {
      return this.app.siderCollapsed ? 'indent' : 'outdent'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.btn-enter-active,
.btn-leave-active {
  transition: all 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);
}

.btn-enter,
.btn-leave-to {
  opacity: 0;
}
</style>
