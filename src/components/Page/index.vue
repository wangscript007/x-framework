<template>
  <div class="x-layout-page">
    <div class="x-layout-page-header"
         v-if="!customHeader && showHeader">
      <page-header></page-header>
    </div>
    <div class="x-layout-page-header"
         v-if="customHeader">
      <slot name="pageHeader"></slot>
    </div>
    <div class="x-layout-page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/Page/PageHeader'

export default {
  name: 'page',
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    customHeader: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PageHeader
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
