<template>
  <div class="x-sider-header">
    <a
      href="javascript:void(0)"
      :title="app.name"
    >
      <img
        :src="app.logo"
        :alt="app.name"
      >
      <transition name="animate-sider-header-title">
        <h1
          v-if="!collapsed"
        >{{ app.name }}</h1>
      </transition>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarHeader',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['app'])
  }
}
</script>

