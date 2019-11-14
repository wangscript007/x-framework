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
import { debounce } from 'lodash'
import { mapGetters, mapMutations } from 'vuex'
import { MUT_APP_TYPES } from '@/store/mutation-types'
import screen from '@/common/constants/screen'

const TOGGLE_BUTTON_CLICK_DELAY = 500

export default {
  name: 'Toggle',
  computed: {
    ...mapGetters(['app']),
    icon () {
      return this.app.sidebarCollapsed ? 'indent' : 'outdent'
    }
  },
  methods: {
    ...mapMutations({
      setSidebarCollapsed: MUT_APP_TYPES.SET_SIDEBAR_COLLAPSED,
      setSidebarOpened: MUT_APP_TYPES.SET_SIDEBAR_OPENED
    }),
    toggle: debounce(function () {
      if (this.app.screenSize === screen.xs.name) {
        this.setSidebarOpened(!this.app.sidebarOpened)
      } else {
        this.setSidebarCollapsed(!this.app.sidebarCollapsed)
      }
    }, TOGGLE_BUTTON_CLICK_DELAY, {
      leading: true,
      trailing: false
    })
  }
}
</script>

