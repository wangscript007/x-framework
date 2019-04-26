<template>
  <div class="x-layout-main">
    <transition name="page-change"
                mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LayoutMain',
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
