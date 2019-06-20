<template>
  <div class="x-sider-header">
    <a
      href="/"
      :title="app.name"
    >
      <img
        :src="app.logo"
        :alt="app.name"
      >
      <transition name="animate-sider-header-title">
        <h1
          v-if="!collapsed"
          key="0"
        >{{ app.name }}</h1>
      </transition>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SiderHeader',
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

