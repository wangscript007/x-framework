<template>
  <div class="x-layout layout-default">
    <transition name="animate-sider-toggle">
      <div
        v-if="app.screenSize !== screen.xs.name"
        class="x-layout-sider"
        :class="{collapsed: app.sidebarCollapsed, fixed: app.sidebarFixed}"
      >
        <slot name="sider"></slot>
      </div>
    </transition>
    <div class="x-layout-content">
      <div
        class="x-layout-header"
        :class="{'header-fixed':app.headerFixed}"
      >
        <slot name="header"></slot>
      </div>
      <div class="x-layout-main">
        <slot name="main"></slot>
      </div>
      <footer class="x-layout-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
import layoutMixin from '@/layout/mixin/Layout'

export default {
  name: 'LayoutClassic',
  mixins: [layoutMixin]
}
</script>
