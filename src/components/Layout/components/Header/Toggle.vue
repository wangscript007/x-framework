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
import { debounce } from 'lodash'
import screen from '@/common/constants/screen'

const TOGGLE_BUTTON_CLICK_DELAY = 500

export default {
  name: 'Toggle',
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
    toggle: debounce(function () {
      if (this.app.screenSize === screen.xs.name) {
        this.setSiderOpened(!this.app.siderOpened)
      } else {
        this.setSiderCollapsed(!this.app.siderCollapsed)
      }
    }, TOGGLE_BUTTON_CLICK_DELAY, {
      leading: true,
      trailing: false
    })
  }
}
</script>

