<template>
  <span class="x-badge x-badge-status">
    <span
      class="x-badge-status-dot"
      :class="statusClass"
    ></span>
    <span class="x-badge-status-text">
      <slot></slot>
    </span>
  </span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    status: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    statusClass () {
      return `status-${this.status}`
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
