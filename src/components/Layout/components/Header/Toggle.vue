<template>
  <a
    class="menu-item-toggle-button"
    href="javascript:void(0);"
    @click.stop="toggle"
  >
    <x-icon :icon="icon" />
  </a>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import screen from '@/common/constants/screen'

export default {
  name: 'Toggle',
  data () {
    return {
      clickReady: true,
      clickDelay: 500
    }
  },
  computed: {
    ...mapGetters(['app']),
    icon () {
      return this.app.siderCollapsed ? 'indent' : 'outdent'
    }
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
      const _this = this
      const timer = setTimeout(() => {
        _this.clickReady = true
        clearTimeout(timer)
      }, this.clickDelay)
    }
  }
}
</script>

